# Stack Map — dizayn tizimi va loyiha tuzilishi

Bu hujjat "Middle Strong PHP Laravel" loyihasi (sayt nomi: **Stack Map**, mahsulot nomi: **Laravel Skill Map**) haqida to'liq ma'lumot beradi:

- frontend dizayn tizimi: ranglar, shriftlar, o'lchamlar va komponentlar;
- sahifalar va ularning tuzilishi;
- kontent qanday joylashgani: stack → skill → subskill → chuqur dars;
- ma'lumot fayllarining formatlari, saqlash va hisoblar;
- yangi kontent qo'shish tartibi.

Hujjatdagi raqamlar 2026-10-29 holatiga ko'ra. Boshqa mavzu uchun loyihani 1:1 qayta qurish promptlari: `BLUEPRINT-PROMPT.md`.

---

## 1. Loyiha haqida qisqacha

| Narsa | Qiymat |
|---|---|
| Maqsad | PHP/Laravel dasturchini Middle Strong darajasidan Senior'ga olib boruvchi shaxsiy o'quv xaritasi va intervyu trenajori |
| Foydalanuvchi | Bitta odam (egasi), o'z kompyuterida |
| Til | O'zbek (lotin). Texnik atamalar inglizcha qoladi |
| Texnologiya | Oddiy HTML + CSS + JavaScript. Framework, build va server yo'q |
| Ishga tushirish | `index.html` ni brauzerda to'g'ridan-to'g'ri ochish (`file://`) |
| Ma'lumot saqlash | Brauzer: `localStorage` + IndexedDB (lokal hisoblar). Serverga hech narsa ketmaydi |

### Asosiy tamoyillar (PRODUCT.md dan)

1. **Offline va sozlashsiz:** `index.html` ni ochish har doim yetarli bo'lishi kerak.
2. **Kontent formati — shartnoma:** UI o'zgarishi skill fayllarini tahrirlashni talab qilmasligi kerak.
3. **Xarita va mashq bitta taksonomiyada:** intervyu savollari va testlar subskill'larga bog'langan.
4. **Bitta diqqatli o'quvchi uchun:** tez ko'z yugurtirish va aniq progress ko'rgazmadan muhimroq.

---

## 2. Fayllar tuzilishi

```
Middle Strong PHP Laravel/
├── index.html                  # Yagona sahifa: topbar, sidebar, view, palette, toast, ikonkalar sprite'i
├── assets/
│   ├── css/app.css             # Barcha stillar (~3600 qator): tokenlar, komponentlar, sahifalar
│   └── js/app.js               # Butun ilova (~3500 qator): yuklash, router, render, saqlash, hisoblar
├── data/
│   ├── manifest.js             # SKILL_GROUPS, SKILL_FILES, LESSON_FILES
│   ├── skills/NN-slug.js       # 85 ta skill fayli (har biri registerSkill({...}))
│   ├── lessons/<subId>.js      # Chuqur darslar (har biri registerLesson("id", {...}))
│   ├── interview-questions.js  # window.INTERVIEW_QUESTIONS (294 ta savol)
│   ├── interview-tests.js      # window.INTERVIEW_TESTS (187 ta test)
│   └── progress.json           # Ixtiyoriy progress fayli (eksport/import uchun)
├── PRODUCT.md                  # Mahsulot konteksti (kim uchun, nima uchun)
├── FLASH.md                    # Kontent to'ldirish yo'riqnomasi (LLM uchun)
├── DESIGN-SYSTEM.md            # Shu hujjat
├── tz.txt                      # Taksonomiyaning asl manbasi (texnik topshiriq)
└── scratch_analysis_result.txt # Tuzilma xulosasi (guruh/skill/subskill sonlari)
```

### Skriptlar yuklanish tartibi

`index.html` oxirida:

1. `data/manifest.js` — guruhlar va fayllar ro'yxati.
2. `data/interview-questions.js`
3. `data/interview-tests.js`
4. `assets/js/app.js` — ilova.

`app.js` ishga tushgach `loadData()` faqat `SKILL_FILES` dagi skill fayllarini alohida `<script>` qilib qo'shadi (`async = false`, tartib saqlanadi). Ular yuklangach:

```
buildModel() → buildInterviewTaxonomy() → buildIndex() → renderSidebar() → route()
```

Chuqur darslar (`LESSON_FILES`) birinchi render'dan KEYIN, fonda `loadLessons()` bilan yuklanadi. Yuklanib bo'lgach, agar ochiq sahifa `#/s/...` bo'lsa, u qayta chiziladi va scroll joyida qoladi. Shu vaqtgacha dars sahifasida "Chuqur dars yuklanmoqda…" ko'rinadi (`lessonsLoaded` bayrog'i). Landing va boshqa sahifalar darslarni kutmaydi.

---

## 3. Kontent ierarxiyasi

```
Guruh (16)  →  Skill (85)  →  Subskill (1597)  →  Chuqur dars (623 yozilgan)
                  ↑
Stack (24)  ──────┘  (stack — foydalanuvchiga ko'rinadigan asosiy kirish nuqtasi; bir nechta skillni jamlaydi)

Intervyu savoli (294)  ──→  subskillId orqali subskillga
Texnik test (187)      ──→  subskillId orqali subskillga
```

### 3.1. Guruh (sidebar bo'limi)

`data/manifest.js` → `window.SKILL_GROUPS`. Har guruhda `id`, `title`, `icon` (sprite nomi) va `skills` (skill id'lari tartibda) bor.

### 3.2. Skill

`data/skills/NN-slug.js` faylida `registerSkill({...})`. Maydonlari: `id` (raqam), `slug`, `title`, `group`, `description`, `subskills[]`.

### 3.3. Subskill

Skill ichidagi mavzu. Maydonlari: `id` (`"13.12"`), `title`, `description` (Markdown), `priority`, `level`, `practicalTask`, `acceptanceCriteria[]`, `prerequisites[]`.

- `priority`: `core` (702), `important` (796), `optional` (99).
- `level`: `Foundation` (26), `Junior` (368), `Middle` (780), `Strong Middle` (56), `Senior` (348), `Lead` (19).
- UI'da `level` 4 ta martaba darajasiga keltiriladi (`levelOf()`): Foundation/Junior → **junior**, Middle/Strong Middle → **middle**, Senior → **senior**, Lead → **lead**.

### 3.4. Chuqur dars

`data/lessons/<subId>.js` faylida `registerLesson("<subId>", { lesson, examples, pitfalls })`. Subskill sahifasida "Chuqur tushuntirish", "Kod misollari" va "Odatiy xatolar" bo'limlarini to'ldiradi. Fayl bo'lmasa, sahifada "Chuqur dars hali yozilmagan" degan joy qoladi.

### 3.5. Stack

`app.js` dagi `TECH_LOGOS` massivida. Stack — texnologiya (PHP, Redis, Docker...) yoki yo'nalish (API, Arxitektura...). U bir nechta skill slug'ini jamlaydi (`sk`).

Muhim qoida: **skill raqami stack ichidagi o'rni bo'yicha** ko'rsatiladi (`s.num = stk.sk.indexOf(s.slug) + 1`). Subskill raqami `"<skill.num>.<tartib>"`. Masalan, Laravel stackidagi Eloquent ORM — `2`, uning subskill'lari `2.1`, `2.2`... Ma'lumotdagi asl `id` (`13`, `"13.1"`) o'zgarmaydi: progress, fayl nomlari va `prerequisites` asl id bilan ishlaydi.

---

## 4. To'liq xarita: guruhlar, skillar va darslar holati

Ustunlar: skill `id` · `slug` · subskill soni · yozilgan chuqur darslar soni.

### PHP va Laravel (`php-laravel`, ikonka `code`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 1 | php | PHP | 60 | 60 |
| 2 | laravel | Laravel | 32 | 32 |
| 13 | eloquent-orm | Eloquent ORM | 24 | 24 |
| 7 | composer | Composer | 16 | 16 |
| 8 | psr-standards | PSR Standards | 11 | 11 |

### Dizayn va kod sifati (`code-quality`, `layers`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 3 | object-oriented-programming-oop | Object-Oriented Programming (OOP) | 14 | 14 |
| 4 | solid-principles | SOLID Principles | 8 | 8 |
| 5 | design-patterns | Design Patterns | 20 | 20 |
| 6 | clean-code | Clean Code | 16 | 16 |
| 72 | code-review | Code Review | 20 | 0 |
| 73 | refactoring | Refactoring | 18 | 0 |

### Ma'lumotlar bazasi (`database`, `database`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 9 | sql | SQL | 24 | 24 |
| 10 | mysql | MySQL | 21 | 21 |
| 11 | postgresql | PostgreSQL | 24 | 24 |
| 14 | database-design | Database Design | 19 | 19 |
| 15 | database-optimization | Database Optimization | 20 | 20 |
| 16 | query-optimization | Query Optimization | 18 | 18 |
| 17 | database-transactions | Database Transactions | 19 | 19 |
| 55 | database-indexing | Database Indexing | 18 | 18 |

### API va integratsiya (`api`, `plug`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 18 | rest-api | REST API | 21 | 21 |
| 19 | api-design | API Design | 20 | 20 |
| 24 | webhooks | Webhooks | 19 | 19 |
| 75 | api-documentation | API Documentation | 16 | 0 |
| 76 | openapi | OpenAPI | 17 | 0 |
| 77 | swagger | Swagger | 13 | 0 |

### Autentifikatsiya (`auth`, `key`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 20 | api-authentication-and-authorization | API Authentication & Authorization | 22 | 22 |
| 21 | oauth-2-0 | OAuth 2.0 | 16 | 16 |
| 22 | jwt | JWT | 16 | 16 |
| 23 | laravel-sanctum | Laravel Sanctum | 16 | 16 |

### Testlash va statik tahlil (`testing`, `flask`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 25 | phpunit | PHPUnit | 18 | 18 |
| 26 | pest | Pest | 17 | 17 |
| 27 | unit-testing | Unit Testing | 15 | 15 |
| 28 | integration-testing | Integration Testing | 15 | 0 |
| 29 | feature-testing | Feature Testing | 16 | 0 |
| 30 | test-driven-development-tdd | Test-Driven Development (TDD) | 12 | 0 |
| 74 | automated-testing | Automated Testing | 20 | 0 |
| 31 | phpstan | PHPStan | 15 | 0 |
| 32 | larastan | Larastan | 14 | 0 |

### Git va kod platformalari (`vcs`, `branch`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 33 | git | Git | 21 | 0 |
| 34 | github | GitHub | 18 | 0 |
| 35 | gitlab | GitLab | 16 | 0 |

### Server va infratuzilma (`infra`, `server`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 36 | docker | Docker | 19 | 0 |
| 37 | docker-compose | Docker Compose | 17 | 0 |
| 38 | linux | Linux | 19 | 0 |
| 39 | ubuntu-server | Ubuntu Server | 15 | 0 |
| 40 | bash | Bash | 19 | 0 |
| 41 | nginx | Nginx | 21 | 0 |
| 42 | php-fpm | PHP-FPM | 18 | 0 |

### CI/CD (`cicd`, `rocket`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 43 | ci-cd | CI/CD | 17 | 0 |
| 44 | gitlab-ci-cd | GitLab CI/CD | 17 | 0 |
| 45 | github-actions | GitHub Actions | 17 | 0 |

### Navbatlar va hodisalar (`async`, `queue`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 46 | queues-and-background-jobs | Queues & Background Jobs | 22 | 1 |
| 47 | laravel-horizon | Laravel Horizon | 17 | 0 |
| 48 | event-driven-architecture | Event-Driven Architecture | 17 | 0 |
| 49 | rabbitmq | RabbitMQ | 20 | 0 |

### Xavfsizlik (`security`, `shield`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 50 | http-https | HTTP/HTTPS | 22 | 0 |
| 51 | web-application-security | Web Application Security | 23 | 0 |
| 52 | owasp-top-10 | OWASP Top 10 | 15 | 0 |

### Performance va kesh (`performance`, `gauge`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 53 | application-performance-optimization | Application Performance Optimization | 21 | 21 |
| 54 | caching-strategies | Caching Strategies | 20 | 20 |
| 12 | redis | Redis | 20 | 20 |

### Debugging va monitoring (`observability`, `bug`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 56 | debugging | Debugging | 17 | 0 |
| 57 | xdebug | Xdebug | 17 | 17 |
| 58 | logging-and-monitoring | Logging & Monitoring | 21 | 0 |
| 59 | sentry | Sentry | 18 | 0 |
| 60 | laravel-telescope | Laravel Telescope | 19 | 0 |

### Arxitektura va tizim dizayni (`architecture`, `boxes`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 61 | software-architecture | Software Architecture | 20 | 0 |
| 62 | mvc-architecture | MVC Architecture | 17 | 0 |
| 63 | domain-driven-design-ddd | Domain-Driven Design (DDD) | 19 | 0 |
| 64 | clean-architecture | Clean Architecture | 18 | 0 |
| 65 | microservices | Microservices | 20 | 0 |
| 66 | system-design | System Design | 23 | 0 |
| 67 | scalability | Scalability | 19 | 0 |
| 68 | high-availability | High Availability | 18 | 0 |
| 85 | architecture-review | Architecture Review | 20 | 0 |

### Bulut texnologiyalari (`cloud`, `cloud`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 69 | cloud-computing | Cloud Computing | 20 | 0 |
| 70 | aws | AWS | 25 | 0 |
| 71 | amazon-s3 | Amazon S3 | 20 | 0 |

### Jarayon va liderlik (`process`, `users`)
| id | slug | Nomi | Sub | Dars |
|---|---|---|---|---|
| 78 | agile | Agile | 16 | 0 |
| 79 | scrum | Scrum | 18 | 0 |
| 80 | technical-documentation | Technical Documentation | 17 | 0 |
| 81 | problem-solving | Problem Solving | 16 | 0 |
| 82 | technical-decision-making | Technical Decision-Making | 16 | 0 |
| 83 | mentoring | Mentoring | 14 | 0 |
| 84 | technical-leadership | Technical Leadership | 18 | 0 |

**Jami:** 85 skill, 1597 subskill, 623 chuqur dars (39%). Darslar 1–27-skillar, 53, 54, 55, 57 va 46.6 uchun yozilgan. Navbatdagisi: 28 Integration Testing (28.1–28.15).

---

## 5. Stacklar (`TECH_LOGOS`)

Har stack obyekti:

| Maydon | Ma'nosi |
|---|---|
| `id` | URL'dagi id: `#/stacks/<id>`, `#/interview?stack=<id>`, `#/quiz?stack=<id>` |
| `n` | Ko'rinadigan nom |
| `v` | Versiya yoki qo'shimcha yorliq (`"12"`, `"CI/CD"`) |
| `c` | Brend rangi (logo foni, `--bc`) |
| `k` | SVG logo kaliti (`TECH_PATHS[k]`); bo'lmasa `ic` (sprite ikonka) yoki `g` (matnli belgi) ishlatiladi |
| `cat` | `true` — texnologiya emas, yo'nalish (karuselda ko'rsatilmaydi) |
| `d` | Qisqa tavsif |
| `sk` | Bog'liq skill slug'lari, **tartib muhim** (stack ichidagi raqamlash shundan) |

| # | id | Nomi | Skillar (`sk`) |
|---|---|---|---|
| 1 | php | PHP 8.4+ | php, object-oriented-programming-oop, solid-principles, design-patterns, clean-code, psr-standards, xdebug |
| 2 | laravel | Laravel 12 | laravel, eloquent-orm, mvc-architecture, laravel-telescope |
| 3 | composer | Composer 2 | composer |
| 4 | mysql | MySQL 8 | mysql, sql, database-design, database-indexing, database-optimization |
| 5 | postgresql | PostgreSQL 16 | postgresql, query-optimization, database-transactions |
| 6 | redis | Redis 7 | redis, caching-strategies, application-performance-optimization |
| 7 | git | Git | git, code-review |
| 8 | gitlab | GitLab CI/CD | gitlab, gitlab-ci-cd, ci-cd |
| 9 | github-actions | GitHub Actions | github, github-actions |
| 10 | docker | Docker Compose | docker, docker-compose |
| 11 | nginx | Nginx | nginx, http-https |
| 12 | php-fpm | PHP-FPM | php-fpm |
| 13 | linux | Linux Ubuntu | linux, ubuntu-server, bash |
| 14 | rabbitmq | RabbitMQ 3 | rabbitmq, event-driven-architecture, microservices |
| 15 | laravel-horizon | Horizon | laravel-horizon, queues-and-background-jobs, logging-and-monitoring |
| 16 | pest | Pest 3 | pest, test-driven-development-tdd, feature-testing |
| 17 | phpunit | PHPUnit 11 | phpunit, unit-testing, integration-testing, automated-testing |
| 18 | phpstan | PHPStan | phpstan, larastan, refactoring |
| 19 | sentry | Sentry | sentry, debugging |
| 20 | aws | AWS S3 | aws, amazon-s3, cloud-computing, scalability, high-availability |
| 21 | api | API (yo'nalish) | api-design, rest-api, webhooks, api-documentation, openapi, swagger |
| 22 | security | Auth & Xavfsizlik (yo'nalish) | api-authentication-and-authorization, oauth-2-0, jwt, laravel-sanctum, owasp-top-10, web-application-security |
| 23 | architecture | Arxitektura (yo'nalish) | software-architecture, domain-driven-design-ddd, clean-architecture, system-design, architecture-review |
| 24 | team | Jamoa va jarayon (yo'nalish) | agile, scrum, technical-documentation, problem-solving, technical-decision-making, mentoring, technical-leadership |

Intervyu savollari va testlarning `category` maydoni `skillSlug` orqali stackdan **avtomatik** olinadi (`buildInterviewTaxonomy()`). Shuning uchun savol faylida faqat `skillSlug` va `subskillId` to'g'ri bo'lsa yetarli.

---

## 6. Sahifalar va marshrutlar (router)

Hash-router (`route()`), `hashchange` hodisasida ishlaydi. Hisobga kirmagan foydalanuvchi faqat landing (`#/`) va login'ni ko'radi. Qolgan barcha manzillar `#/login` ga yo'naltiriladi.

| Manzil | Render funksiyasi | Nima ko'rsatadi |
|---|---|---|
| `#/` | `renderHome()` | Landing: hero, stack karuseli, raqamlar, "Qanday ishlaydi", yo'l xaritasi, dars namunasi, savol-javob, footer |
| `#/login`, `#/login?signup` | `renderAuth()` | Kirish / ro'yxatdan o'tish (chapda forma, o'ngda sayt haqida) |
| `#/stacks` | `renderStacks()` | 24 ta stack kartasi (logo, tavsif, skill soni, progress) |
| `#/stacks/<id>` | `renderStack(x)` | Stack sahifasi: hero + progress, bog'liq skillar ro'yxati, "Intervyuga tayyorgarlik" (savollar, testlar) |
| `#/s/<slug>` | `renderSkill(s)` | Skill sahifasi: tavsif, filtrlar, subskill'lar ro'yxati (ochiladigan), oldingi/keyingi skill, o'ng panel |
| `#/s/<slug>/<subId>` | `renderSubskill(x)` | Dars sahifasi (pastda batafsil) |
| `#/interview` | `renderIqBrowse()` | Intervyu: barcha savollar |
| `#/interview?view=today\|due\|saved` | `renderIqBrowse()` | Bugungi navbat / takrorlash / saqlanganlar |
| `#/interview?stack=<id>` | `renderIqBrowse()` | Bitta stack savollari, skill bo'yicha guruhlangan |
| `#/interview?sub=<subId>` | `renderIqBrowse()` | Bitta subskill savollari |
| `#/interview?q=...&status=...` | `renderIqBrowse()` | Qidiruv va holat filtri |
| `#/interview?...&open=<iqId>` | → sessiya | Savolni darhol fokus sessiyada ochadi |
| `#/interview/play` | `renderIqPlay()` / `renderIqSummary()` | Intervyu fokus sessiyasi va yakun |
| `#/quiz`, `#/quiz?stack=<id>`, `#/quiz?mode=wrong` | `renderQuizPage()` | Test sozlagichi: aralash / stack / xatolarim |
| `#/quiz/play` | `renderQuizPlay()` / `renderQuizResult()` | Test sessiyasi va natija |
| `#/profile` | `renderProfile()` | Profil: Umumiy ko'rinish, Progress, Hisob, Profillar (faqat admin), Xavfli zona |
| `#/skills` | — | `#/stacks` ga yo'naltiradi |

`markActive(section)` `body[data-section]` ni o'rnatadi va topbar'dagi faol havolani belgilaydi. Sidebar faqat `data-section="skills"` bo'lganda ko'rinadi. Hozir skill sahifalari `stacks` bo'limida ochiladi, shuning uchun sidebar amalda yashirin.

### 6.1. Dars sahifasi (`#/s/<slug>/<subId>`) tuzilishi

Ikki ustun (`.lesson-layout`: `1fr` + `300px`).

**Chap (`article.lesson`):**
1. Breadcrumb: Stacklar / Stack / Skill / Subskill.
2. Sarlavha: chiplar (raqam, priority, level, "Intervyu savollari: N") + `h1`.
3. **Qisqacha** — subskill `description`.
4. **Chuqur tushuntirish** — `lesson` (yoki "Chuqur dars hali yozilmagan" degan joy).
5. **Kod misollari** — `examples` (kod kartalari, nusxalash tugmasi bilan).
6. **Odatiy xatolar** — `pitfalls`.
7. **Amaliy topshiriq** — `practicalTask`.
8. **Qabul mezonlari** — `acceptanceCriteria` (belgili ro'yxat).
9. **Oldindan bilish kerak** — `prerequisites` (havola chiplar).
10. **Shu mavzudagi intervyu savollari**.
11. Pastda: oldingi / keyingi mavzu (skill oxirida — keyingi skill).

**O'ng (`aside.lesson-rail`):**
- **Holat** tanlagich: Boshlanmagan / O'rganilmoqda / Ishonchli.
- Skill mundarijasi: barcha subskill'lar, har birida holat nuqtasi; joriy mavzu belgilangan.

### 6.2. Intervyu (mashq ish joyi)

- **Chap panel (`.px-rail`, 244px, yopishqoq):** "Bugungi mashq" tugmasi; rejimlar (Bugungi navbat, Takrorlash, Barcha savollar, Saqlangan); 24 ta stack (son, o'zlashtirish chizig'i).
- **O'ng (`.px-main`):** sarlavha va harakatlar (Mashqni boshlash, Mock, Yana 5 ta, Darslar), progress chizig'i (o'zlashtirilgan / o'rganilmoqda / yangi), asboblar paneli (qidiruv, daraja, holat), savollar ro'yxati.
- **Fokus sessiya (`.px-play`, 820px markazda):** segmentli progress, savol kartasi, qoralama maydoni, javob, intervyu maslahati, baho (Bilmadim / Qisman / Bildim + keyingi takrorlash sanasi), saqlash, nusxalash, dars havolasi.
- **Klaviatura:** `Space` — javobni ochish; `1` `2` `3` — baho; `←` `→` — oldingi/keyingi savol; `B` — saqlash; `Esc` — chiqish.
- **Yakun:** baholar soni, "Qayta ko'rish kerak" ro'yxati (dars havolalari bilan), "Qiyinlarini qayta".

### 6.3. Texnik testlar

- **Chap panel:** "Tez test 10", Aralash, Xatolarim, stacklar (son + eng yaxshi natija chizig'i).
- **O'ng:** sarlavha, KPI (Testlar, Eng yaxshi natija, Urinishlar, Xato qilinganlar), "Testni sozlang" (daraja, savollar soni 5/10/15/Barchasi), "Oxirgi urinishlar".
- **Sessiya:** segmentlar yashil/qizil, `A`–`D` yoki `1`–`4` bilan tanlash, `Enter` — keyingi, tushuntirish va dars havolasi.
- **Natija:** foiz (rangli: 90+ / 70+ / 50+ / past), baho matni, statistika, har savol bo'yicha sharh (sizning javobingiz, to'g'ri javob, dars), "Xatolarni qayta ishlash".

### 6.4. Landing (mehmon uchun)

Login'ga faqat tepadagi **Kirish** tugmasi olib boradi. Hero'da CTA tugmalar yo'q. Karusel va yo'l xaritasi elementlari mehmon uchun bosilmaydi (`<span>`). Footer'da faqat "Savol-javob". Kirgan foydalanuvchi uchun hero'da "Stacklarni ko'rish" va "Intervyuga tayyorlanish" chiqadi, karusel va xarita havolaga aylanadi.

---

## 7. Dizayn tizimi

### 7.1. Yo'nalish

Operate rejimidagi o'quv ilovasi: qorong'i (default) va yorug' mavzu, yashil aksent, IBM Plex Sans + JetBrains Mono. Ifoda emas, aniqlik: zich ro'yxatlar, aniq holat ranglari, klaviatura bilan ishlash. Brend faqat aniq detallarda: yashil aksent, monospace raqamlar va rangli stack logolari.

### 7.2. Rang tokenlari (`:root` — qorong'i mavzu)

| Token | Qiymat | Vazifa |
|---|---|---|
| `--bg` | `#0B1120` | Sahifa foni |
| `--bg-elev` | `#0E1628` | Ko'tarilgan fon |
| `--surface` | `#111A2E` | Karta, panel |
| `--surface-2` | `#17223A` | Ichki karta, variant, hover |
| `--surface-3` | `#1E2A45` | Faol segment, progress izi |
| `--border` | `#22304C` | Oddiy chegara |
| `--border-strong` | `#3A4A6B` | Hover/kuchli chegara |
| `--text` | `#F1F5F9` | Asosiy matn |
| `--text-2` | `#A9B6CA` | Ikkinchi darajali matn |
| `--text-3` | `#7E8EA8` | Izoh, yorliq |
| `--accent` | `#22C55E` | Asosiy tugma, progress |
| `--accent-text` | `#4ADE80` | Aksent matn/havola |
| `--accent-soft` | `rgba(34,197,94,.12)` | Aksent fon |
| `--accent-ring` | `rgba(74,222,128,.55)` | Fokus halqasi |
| `--on-accent` | `#052E16` | Aksent ustidagi matn |
| `--danger` | `#F87171` | Xato, o'chirish |
| `--danger-soft` | `rgba(248,113,113,.12)` | Xato foni |
| `--code-bg` | `#0A1222` | Kod bloki foni |
| `--overlay` | `rgba(2,6,18,.66)` | Modal orqa foni |
| `--glass`, `--glass-2` | `rgba(17,26,46,.78)`, `rgba(23,34,58,.72)` | Shaffof kartalar (profil, landing) |
| `--grid-line`, `--grid-major` | `rgba(148,163,184,.055)`, `.11` | Fon to'ri |
| `--glow` | radial-gradient | Sahifa tepasidagi yashil nur |
| `--shadow-lg` | `0 24px 60px -12px rgba(0,0,0,.6), 0 0 0 1px var(--border)` | Modal/palette soyasi |

**Holat ranglari** (progress, daraja, baho):

| Token | Qorong'i | Yorug' | Ishlatilishi |
|---|---|---|---|
| `--st-0` | `#64748B` | `#94A3B8` | Boshlanmagan |
| `--st-1` | `#60A5FA` | `#2563EB` | O'rganilmoqda; Middle darajasi; "o'rganilmoqda" |
| `--st-2` | `#FBBF24` | `#B45309` | Important; Lead; "Qisman"; takrorlash vaqti |
| `--st-3` | `#4ADE80` | `#15803D` | Ishonchli |
| `--st-4` | `#C084FC` | `#7E22CE` | Senior darajasi |

Har biri `-soft` juftiga ega (fon uchun).

**Yorug' mavzu** (`[data-theme="light"]`): `--bg #F7F9FC`, `--surface #FFFFFF`, `--surface-2 #F1F5F9`, `--surface-3 #E7EDF5`, `--border #E2E8F0`, `--border-strong #CBD5E1`, `--text #0F172A`, `--text-2 #334155`, `--text-3 #5B6B82`, `--accent #15803D`, `--accent-text #166534`, `--on-accent #FFFFFF`, `--danger #DC2626`, `--code-bg #F1F5F9`.

Mavzu `lsm:theme` kalitida saqlanadi. U birinchi chizishdan oldin `<head>` dagi skript bilan qo'yiladi (miltillamasligi uchun). Saqlanmagan bo'lsa, tizim sozlamasi (`prefers-color-scheme`) olinadi.

### 7.3. Daraja ranglari (bir xil hamma joyda)

| Daraja | Rang |
|---|---|
| Junior | `--accent-text` (yashil) |
| Middle | `--st-1` (ko'k) |
| Senior | `--st-4` (binafsha) |
| Lead | `--st-2` (sariq) |

### 7.4. Tipografiya

| Rol | Qiymat |
|---|---|
| Asosiy shrift | `--font: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif` (400/500/600/700) |
| Monospace | `--mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Consolas, monospace` (kod, raqamlar, kbd, daraja yorliqlari) |
| Body | `400 16px/1.6` |
| Sarlavhalar | `line-height 1.2`, `letter-spacing -.015em`, `text-wrap: balance` |
| Landing h1 | `clamp(36px, 5.4vw, 66px)`, 800, `-.04em` |
| Sahifa h1 (`.page-head`) | `clamp(28px, 3.2vw, 38px)`, 700, `-.03em` |
| Dars h1 | `clamp(28px, 3.6vw, 42px)`, 700 |
| Mashq sarlavhasi (`.px-head h1`) | `clamp(26px, 3vw, 34px)` |
| Savol matni (`.px-q`) | `clamp(20px, 2.4vw, 25px)`, 600 |
| Bo'lim h2 (dars) | 22px, 700 |
| Markdown matn (`.md`) | 16px / 1.7, `--text-2` |
| Kod bloki | 13.5px / 1.65 |
| Yorliq/izoh | 12–14px, `--text-3` |
| Raqamlar (KPI) | `--mono`, 600–700, `tabular-nums` |

Shriftlar Google Fonts'dan yuklanadi. Internet bo'lmasa, tizim shriftlari ishlatiladi.

### 7.5. O'lchamlar

| Token | Qiymat |
|---|---|
| Bo'shliq | `--sp-1 4px`, `--sp-2 8px`, `--sp-3 12px`, `--sp-4 16px`, `--sp-5 24px`, `--sp-6 32px`, `--sp-7 48px`, `--sp-8 64px` |
| Radius | `--r-sm 6px`, `--r 10px`, `--r-lg 14px`, `--r-xl 20px` |
| Topbar | `--topbar-h 60px` |
| Sidebar | `--sidebar-w 300px` |
| Kontent kengligi | `.view` — `max-width 1240px`, padding 48px (≤1024px da 32/24, ≤720px da 24/16) |
| Animatsiya | `--ease cubic-bezier(.2,.7,.2,1)`, `--t-fast 140ms`, `--t 220ms` |
| Ikonka | `.ic` 18px, `.ic-sm` 15px, `.ic-lg` 22px; stroke 1.8, currentColor |

### 7.6. Breakpoint'lar

Ko'p ishlatiladiganlari: **1024px** (planshet), **960px** (mashq paneli tepaga chiqadi), **720px** (mobil: pastki navigatsiya, kichik padding), **640px** (mashq kartalari ixchamlashadi), **560px**. Boshqalari: 1366, 1280, 1240, 1100, 900, 860, 768, 620, 600. Bundan tashqari `prefers-reduced-motion` (animatsiyalar o'chadi) va `print`.

### 7.7. Ikonkalar

`index.html` dagi SVG sprite (Lucide uslubi, 24px to'r). Chaqirish: `icon("name", "ic ic-sm")` → `<svg class="ic"><use href="#i-name"/></svg>`.

Mavjud ikonkalar: `logo search sun moon menu more chev-down chev-right arrow-left arrow-right check link download upload trash file info alert home eye eye-off enter target list-checks sparkles help expand collapse code layers database plug key flask branch server rocket queue shield gauge bug boxes cloud users bookmark copy close reset play`.

Stack logolari — `TECH_PATHS` dagi SVG path'lar, `.stk-logo` ichida brend rangi fonida (`--bc`).

### 7.8. Komponentlar

| Komponent | Klass | Tavsif |
|---|---|---|
| Tugma | `.btn`, `.btn-primary`, `.btn-sm` (36px), `.btn-lg` (52px) | Oddiy: surface + border; primary: aksent fon, `--on-accent` matn |
| Ikonka tugma | `.icon-btn` | Topbar (menyu, mavzu) |
| Segment | `.seg` + `button[aria-pressed]` | Filtrlar (daraja, holat, son); `.count-chip` — son |
| Chip | `.chip`, `.chip.mono`, `.chip.core/important/optional/level/missing` | Teglar va havola-chiplar |
| Progress | `.bar > i` (6px), `.bar.stacked` | Oddiy va bo'lakli chiziq |
| Karta (stack) | `.st-card` (`.st-top`, `.st-foot`, `.bar`) | Stacklar to'ri `.st-grid` |
| Stack hero | `.st-hero` | 64px logo, sarlavha, progress |
| Skill qatori | `.st-skill` | Raqam, nom, progress, strelka |
| Breadcrumb | `.crumbs` | 13px, `--text-3` |
| Sahifa sarlavhasi | `.page-head`, `.page-sub` | h1 + izoh (60ch) |
| Markdown | `.md` | `h3/h4`, ro'yxat, `blockquote` (aksent chap chiziq), inline code, `pre[data-lang]` |
| Kod kartasi | `.code-card` + `[data-copy-code]` | Dars misollari, nusxalash |
| Holat tanlagich | `.status-picker [role=radio]` | 3 holat, strelkalar bilan |
| Toast | `#toast` | Pastda qisqa xabar |
| Qidiruv paleti | `#palette` | `/` yoki Ctrl+K; ↑↓ Enter Esc |
| Mock modal | `#mock-overlay .mock-modal` | Vaqtli mock intervyu |
| Kirish kartasi | `.auth-card`, `.auth-tabs`, `.auth-error` | Login/signup |
| Profil | `.pf-head`, `.pf-stats`, `.pf-tabs`, `.pf-card`, `.pf-danger` | Profil bo'limlari |
| Landing | `.lp-hero`, `.lp-section`, `.lp-stats`, `.lp-steps`, `.roadmap`, `.lp-mock`, `.lp-faq`, `.lp-footer` | Bosh sahifa bloklari |
| Mashq qobig'i | `.px`, `.px-rail`, `.px-nav-i`, `.px-main`, `.px-head`, `.px-meter`, `.px-tools`, `.px-search` | Intervyu va testlar uchun umumiy |
| Savol qatori | `.px-rows`, `.px-row`, `.px-lvl[data-l]`, `.px-mark[data-m]` | `data-m`: `new`, `r0`, `r1`, `r2`, `due`, `done` |
| Sessiya | `.px-play`, `.px-play-top`, `.px-ticks li[data-s]`, `.px-card`, `.px-q`, `.px-recall`, `.px-answer`, `.px-tip`, `.px-grade` | `data-s`: `seen`, `r0`, `r1`, `r2`; joriy — `aria-current="step"` |
| Test variantlari | `.px-opts`, `.px-opt[data-s=ok\|bad\|dim]`, `.px-explain[data-ok]` | Javob holatlari |
| Sozlagich | `.px-kpis`, `.px-setup`, `.px-field`, `.px-setup-go`, `.px-hist-list` | Test sahifasi |
| Yakun | `.px-sum`, `.px-bigscore[data-band]`, `.px-sum-stats`, `.px-review` | `data-band`: `top`, `good`, `mid`, `low` |
| Bo'sh holat | `.px-empty`, `.placeholder`, `.empty` | Ma'lumot yo'q / yozilmagan |

### 7.9. Holat va qulaylik qoidalari

- Fokus: `:focus-visible` — 2px `--accent-ring` halqa.
- `.skip-link` — "Asosiy kontentga o'tish".
- Tanlangan holat `aria-pressed`, `aria-current`, `aria-selected`, `aria-checked` atributlari bilan beriladi va CSS shu atributlarga bog'langan.
- Yon tomonga qalin rangli chiziq (side-tab), dekorativ gradient matn va bounce animatsiya yangi kodda ishlatilmaydi (impeccable qoidalari).
- Kontrast: matn `--text`/`--text-2` surface ustida; `--text-3` faqat izohlar uchun.

---

## 8. Ma'lumot formatlari

### 8.1. `data/manifest.js`

```js
window.SKILL_GROUPS = [
  { "id": "php-laravel", "title": "PHP va Laravel", "icon": "code", "skills": [1, 2, 13, 7, 8] },
  // ... 16 ta guruh
];
window.SKILL_FILES = ["01-php.js", "02-laravel.js", /* ... 85 ta */];
window.LESSON_FILES = ["1.1.js", "1.2.js", /* ... 623 ta */];
```

### 8.2. Skill fayli (`data/skills/13-eloquent-orm.js`)

```js
/* 13 · Eloquent ORM
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 13,
  slug: "eloquent-orm",
  title: "Eloquent ORM",
  group: "php-laravel",
  description: "Skill haqida 2–4 gap.",
  subskills: [
    {
      id: "13.1",
      title: "Models va Model Configuration",
      description: ["Markdown qatorlari", "", "```php", "// kod", "```"],
      priority: "core",              // core | important | optional
      level: "Junior",               // Foundation | Junior | Middle | Strong Middle | Senior | Lead
      practicalTask: "Bitta aniq topshiriq.",
      acceptanceCriteria: ["2–4 ta tekshiriladigan mezon"],
      prerequisites: ["2.2"]         // subskill id yoki skill slug
    }
  ]
});
```

**O'zgartirilmaydi:** `id`, `slug`, `title`, `group`, subskill'lar tartibi va soni.

### 8.3. Dars fayli (`data/lessons/1.4.js`)

```js
/* Chuqur dars: 1.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.4", {
  "lesson": [
    "### == nima qiladi",
    "Tushuntirish (Markdown)...",
    "",
    "### Qoidalar",
    "1. ...",
    "2. ..."
  ],
  "examples": [
    { "title": "Misol nomi", "lang": "php", "code": ["$x = 1;"], "note": "Izoh (ixtiyoriy)" }
  ],
  "pitfalls": [
    "Odatiy xato va nima uchun xato ekani."
  ]
});
```

| Maydon | Talab |
|---|---|
| `lesson` | 350–600 so'z, `###` bo'limlar: nima, nega kerak, qanday ishlaydi, qachon ishlatiladi/ishlatilmaydi, Laravel'dagi o'rni |
| `examples` | 2–3 ta ishlaydigan kod misoli (`title`, `lang`, `code`; `note` ixtiyoriy) |
| `pitfalls` | 3–4 ta odatiy xato |

### 8.4. Intervyu savoli (`data/interview-questions.js`)

```js
window.INTERVIEW_QUESTIONS = [
  {
    id: "iq-1",
    title: "PHP'da == va === ning farqi nima?",
    level: "junior",            // junior | middle | senior | lead
    category: "php",            // stackdan avtomatik qayta yoziladi
    categoryLabel: "PHP tili",  // avtomatik qayta yoziladi
    skillSlug: "php",           // MUHIM: stack shu orqali topiladi
    subskillId: "1.4",          // MUHIM: dars havolasi va filtr
    answer: ["Markdown qatorlari..."],
    tip: "Intervyuda nimaga e'tibor berishadi",
    type: "bug",                // ixtiyoriy: bug | scenario | behavioral
    code: "<?php ..."           // ixtiyoriy: savolga ilova kod
  }
];
```

Hozir 294 ta: junior 65, middle 93, senior 105, lead 31. `type` bor savollar: bug 4, scenario 4, behavioral 3.

### 8.5. Texnik test (`data/interview-tests.js`)

```js
window.INTERVIEW_TESTS = [
  {
    id: "t-php-1",
    category: "php", categoryLabel: "PHP tili",   // avtomatik
    skillSlug: "php",
    subskillId: "1.4",
    level: "middle",                               // junior | middle | senior
    question: "PHP 8 da `var_dump(0 == 'admin');` natijasi?",
    options: [{ key: "A", text: "..." }, { key: "B", text: "..." }, { key: "C", text: "..." }, { key: "D", text: "..." }],
    correct: "A",
    explanation: "Nega to'g'ri ekani."
  }
];
```

Hozir 187 ta. Har stack bo'yicha kamida 5 ta savol va 4 ta test bor.

### 8.6. Qo'llab-quvvatlanadigan Markdown

- Paragraflar (bo'sh qator), `###` va `####` sarlavhalar.
- `- ro'yxat`, `1. raqamli ro'yxat` (raqam kod blokdan keyin ham davom etadi: `<ol start>`), `> eslatma`.
- `**qalin**` (ichida `` `kod` `` bo'lishi mumkin), `*kursiv*`, `` `inline code` ``, `[havola](https://...)` va `[havola](#/...)`.
- Kod bloklari: ` ```php `, ` ```sql `, ` ```bash ` (PHP/SQL kalit so'zlari rangli).
- Oddiy jadvallar: `| a | b |` + `|---|---|`.

JS string qoidalari: yangi qator `\n`, qo'shtirnoq `\"`, backslash `\\` (`App\\Models\\User`). Uzun matnni qatorlar massivi qilib yozish mumkin.

---

## 9. Holat, progress va saqlash

### 9.1. Subskill holati

3 holat (`STATUSES`): **0 Boshlanmagan**, **1 O'rganilmoqda** (og'irligi 0.5), **2 Ishonchli** (1.0). Progress = og'irliklar yig'indisi / subskill soni. Eski 5 holatli format (v1) avtomatik v2 ga o'tkaziladi.

### 9.2. Takrorlash (SRS, Leitner)

Intervyu bahosi (`rateIq`):

| Baho | Natija |
|---|---|
| Bilmadim (0) | box = 1, ertaga qaytadi; "o'zlashtirilgan"dan chiqadi |
| Qisman (1) | box saqlanadi (≥1), interval yarmiga |
| Bildim (2) | box +1 (kamida 2); box ≥ 3 bo'lsa — "o'zlashtirilgan" |

Intervallar (`SRS_DAYS`): `[0, 1, 3, 7, 14, 30]` kun. Bog'liq subskill holati avtomatik yangilanadi: biror savol baholansa → "O'rganilmoqda"; barcha savollari box ≥ 3 bo'lsa → "Ishonchli".

"Bugungi navbat" (`iqPickToday`): avval sanasi kelgan savollar, keyin yangilari. Yangilar orasida avval o'rganilayotgan subskill'larniki va past darajadagilar keladi. Standart — 5 ta, "Yana 5 ta" bilan ko'payadi.

### 9.3. `localStorage` kalitlari (`KEYS`)

| Kalit | Mazmuni |
|---|---|
| `lsm:progress` | `{ subId: holat }` |
| `lsm:progress-v` | Progress formati versiyasi (2) |
| `lsm:theme` | `dark` / `light` |
| `lsm:collapsed` | Sidebar guruhlarining yopiq holati |
| `lsm:last` | Oxirgi ochilgan skill slug'i |
| `lsm:levels` | Global daraja filtri |
| `lsm:srs` | `{ iqId: { box, due, last, r } }` |
| `lsm:questions` | O'zlashtirilgan savollar id'lari |
| `lsm:bookmarks` | Saqlangan savollar id'lari |
| `lsm:quiz_scores` | `{ stackId|all: eng yaxshi % }` |
| `lsm:quiz_hist` | Oxirgi 30 ta test urinishi `{ d, cat, lvl, n, right }` |
| `lsm:quiz_wrong` | Noto'g'ri javob berilgan test id'lari |
| `lsm:session` | Joriy kirgan hisob |

### 9.4. Lokal hisoblar

- IndexedDB bazasi `lsm_accounts`: `users` (email, salt, hash, iterations, createdAt) va `data` (har hisobning progress, savollar, saqlanganlar, test natijalari, SRS, tarix).
- Parol: PBKDF2-SHA256, 150 000 iteratsiya, tasodifiy salt.
- Foydalanuvchi kalitlari (`USER_KEYS`) o'zgarganda 300 ms kechikish bilan hisobga yoziladi. Sahifa yopilganda yoki yashirilganda ham yoziladi.
- Admin (`ADMIN_EMAIL`) profilda "Profillar" bo'limini ko'radi: boshqa lokal hisoblar ro'yxati va o'chirish.
- Hisobsiz faqat landing va login ochiladi.

---

## 10. Yangi kontent qo'shish

### Chuqur dars qo'shish
1. `data/lessons/<subId>.js` yarating (8.3 formatida).
2. `node --check data/lessons/<subId>.js`.
3. Fayl nomini `data/manifest.js` → `window.LESSON_FILES` ga qo'shing.

### Skill qo'shish
1. `data/skills/86-yangi-skill.js` yarating (8.2 formatida).
2. `data/manifest.js`: `SKILL_FILES` ga fayl nomini, `SKILL_GROUPS` dagi kerakli guruhga `86` ni qo'shing.
3. Stackka bog'lash uchun `app.js` → `TECH_LOGOS` dagi kerakli stackning `sk` massiviga slug qo'shing (tartib = raqamlash).

### Intervyu savoli / test qo'shish
1. `data/interview-questions.js` yoki `data/interview-tests.js` oxiriga obyekt qo'shing.
2. Yangi va takrorlanmaydigan `id` bering (`iq-295`, `t-<stack>-N`).
3. `skillSlug` va `subskillId` to'g'ri bo'lsin. `category` avtomatik olinadi.

### Yangi stack qo'shish
`TECH_LOGOS` ga obyekt qo'shing (5-bo'limdagi maydonlar). Logo uchun `TECH_PATHS` ga SVG path qo'shing yoki `ic`/`g` dan foydalaning. Yo'nalish bo'lsa `cat: true` qo'ying.

### Xatolar
Skill fayli buzilsa, bosh sahifada qizil ogohlantirish chiqadi: fayl nomi va qator (`LOAD_ISSUES`). Tekshirish: `node --check <fayl>`.

---

## 11. Ishlash va unumdorlik

| Bosqich | Vaqt (`file://`, Chrome) |
|---|---|
| Landing'ning birinchi chizilishi | ~0.5 s (faqat 85 ta skill fayli kutiladi) |
| 623 ta dars fonda yuklanishi | birinchi chizilishdan keyin, foydalanuvchini kutdirmaydi |

- Darslar kechiktirib yuklanadi (`loadLessons()`): boshlanishdan ~3.6 MB chiqarilgan (avval render ~3.1 s edi).
- Yo'l xaritasidagi oqim (`buildRoadmapFlow`) bekat masofalarini yo'l chizilayotganda formula bilan hisoblaydi (avval `getPointAtLength` bilan ~4 s ketardi).
- CSS'dan ishlatilmaydigan `qz-*`/`iq-*` stillari va `@keyframes`'lar olib tashlangan (3629 → 2079 qator).
