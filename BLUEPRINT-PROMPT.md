# BLUEPRINT-PROMPT: Stack Map'ni boshqa mavzu uchun noldan, birga bir qilib qayta qurish

Bu fayl to'liq prompt to'plami. Uni kodlash modeliga (Claude Code yoki shunga o'xshash agentga) bering. Model bo'sh papkada Stack Map bilan **bir xil** dizayn, tuzilma va ishlash tartibiga ega yangi loyiha quradi. Faqat mavzu va ma'lumotlar almashadi.

## 0. Qanday ishlatiladi

1. Yangi bo'sh papka oching va shu faylni papkaga `BLUEPRINT-PROMPT.md` nomi bilan qo'ying.
2. 1-bo'limdagi **almashtiriladigan qiymatlar** jadvalini o'z mavzuingiz uchun to'ldiring.
3. Modelga avval **P0** ni bering (u shu faylni o'qib chiqadi), keyin P1, P2, ... ni ketma-ket bering. Har bosqich oxirida "qabul tekshiruvi" bor: o'tmasa, keyingisiga o'tmang.
4. Dizayn va kod (P1–P3) **ko'chirib yoziladi**, ijod qilinmaydi. Ijod faqat mavzuga oid ma'lumotlarda (P4–P8).

### Muhim qoida: nima o'zgarmaydi, nima o'zgaradi

| O'zgarmaydi (1:1 ko'chiriladi) | Mavzuga qarab almashadi |
|---|---|
| Butun `assets/css/app.css` (ranglar, shriftlar, komponentlar, breakpoint'lar) | Loyiha nomi, tagline, landing matnlari, FAQ |
| `index.html` tuzilishi va ikonka sprite'i | `TECH_LOGOS` (stacklar), `TECH_PATHS` (logo SVG'lari) |
| `assets/js/app.js` mantig'i: yuklash, router, render, SRS, test oqimi, hisoblar, qidiruv | `CAREER_LEVELS` tavsiflari, admin email, kod highlighter kalit so'zlari |
| Marshrutlar, klaviatura tugmalari, saqlash kalitlari | `data/manifest.js`, `data/skills/*`, `data/lessons/*`, savollar, testlar |
| Ma'lumot fayllarining formati | Hammasi: guruhlar, skillar, subskill'lar, mazmun |

Agar spetsifikatsiya (7-bo'lim) va ilovalar (8-bo'lim) bir-biriga zid bo'lsa, **ilovadagi kod g'olib**.

## 1. Almashtiriladigan qiymatlar (to'ldiring)

| Kalit | Ma'nosi | Hozirgi loyihada | Sizniki |
|---|---|---|---|
| `{{APP_NAME}}` | Sayt nomi (topbar, sarlavha, footer) | Stack Map | |
| `{{APP_TAGLINE}}` | Bir jumlalik tavsif (meta description va footer) | Senior PHP / Laravel dasturchi uchun texnologiyalar xaritasi | |
| `{{TOPIC}}` | Mavzu/kasb | PHP / Laravel backend | |
| `{{LEARNER}}` | O'quvchi kim | Middle Strong PHP dasturchi, Senior'ga o'sayapti | |
| `{{GOAL}}` | Maqsad | Senior Laravel intervyusiga tayyorlanish | |
| `{{LANG}}` | Interfeys va kontent tili | O'zbek (lotin), texnik atamalar inglizcha | |
| `{{CODE_LANGS}}` | Kod misollari tillari (highlighter uchun) | php, sql, bash | |
| `{{ADMIN_EMAIL}}` | Profillar bo'limini ko'radigan hisob emaili | (egasining emaili) | |
| `{{STORAGE_PREFIX}}` | localStorage/IndexedDB prefiksi | `lsm` (`lsm:progress`, `lsm_accounts`) | |
| `{{ACCENT}}` | Aksent rangi (faqat o'zgartirmoqchi bo'lsangiz) | `#22C55E` yashil | o'zgartirmaslik tavsiya etiladi |

Hajm bo'yicha mo'ljal (hozirgi loyiha): 16 guruh, 85 skill, ~1600 subskill, 24 stack, ~300 savol, ~190 test. Yangi mavzuda kamroq bo'lishi mumkin, lekin tuzilma bir xil: **guruh → skill → subskill → dars**, **stack → skillar**.

---

## 2. Prompt ketma-ketligi

Har prompt alohida va o'zi yetarli. `<<...>>` ichidagilarni almashtiring.

### P0. Kontekst va shartnoma

```
Sen yangi loyiha quryapsan: "{{APP_NAME}}". Bu fayl (BLUEPRINT-PROMPT.md) — to'liq texnik topshiriq.
Avval faylni boshidan oxirigacha o'qi. Quyidagi qoidalarga bo'ysun:

1. Loyiha oddiy HTML + CSS + JavaScript. Framework, npm, build, server YO'Q.
   index.html brauzerda file:// orqali ochilganda ishlashi shart.
2. 8-bo'limdagi (Ilovalar) index.html, app.css va app.js — ETALON. Ularni ko'chirib yoz,
   o'zingcha "yaxshilama", qisqartirma, qayta nomlama, formatlashni o'zgartirma.
   Faqat 3-bo'limdagi almashtirish jadvalida ko'rsatilgan joylarni o'zgartir.
3. Mavzuga oid hamma ma'lumot (guruhlar, skillar, subskill'lar, darslar, savollar, testlar) yangi
   mavzu uchun noldan yoziladi. Shu fayldagi Laravel/PHP mazmunini NAMUNA deb bil, ko'chirma.
4. Til: {{LANG}}. Texnik atamalar inglizcha qoladi.
5. Bilmagan narsani to'qima. Versiyaga bog'liq narsani versiyasi bilan yoz.
6. Har bosqich oxirida "qabul tekshiruvi"ni bajar va natijasini ayt. O'tmasa, tuzat.

Tayyor bo'lsang, "tayyor" deb yoz va P1 ni kut.
```

### P1. Papka tuzilmasi va `index.html`

```
Quyidagi tuzilmani yarat:

  index.html
  assets/css/app.css
  assets/js/app.js
  data/manifest.js
  data/skills/            (bo'sh papka)
  data/lessons/           (bo'sh papka)
  data/interview-questions.js
  data/interview-tests.js
  validate.js             (5-bo'limdagi skript)

index.html ni 8.A ilovadan AYNAN ko'chir. Faqat 3-bo'limdagi "index.html" qatorlarini almashtir:
<title>, meta description, .brand-name, palette input placeholder.
Ikonka sprite'i (<symbol id="i-...">) va barcha id/class/aria atributlari o'zgarmasin.

Qabul tekshiruvi:
- Fayl 8.A bilan qator-qatorigacha mos (almashtirilgan 4 joydan tashqari).
- <script> tartibi: manifest.js, interview-questions.js, interview-tests.js, app.js.
- Sprite ichidagi symbol id'lari ro'yxati 7-bo'limdagi S7.7 (Ikonkalar) bilan bir xil.
```

### P2. `assets/css/app.css`

```
assets/css/app.css ni 8.B ilovadan AYNAN ko'chir (2078 qator). Faqat 1-qatorlardagi
sarlavha izohidagi loyiha nomini {{APP_NAME}} ga almashtir. Boshqa hech narsani o'zgartirma:
ranglar, o'lchamlar, selektorlar, media query'lar, @keyframes — hammasi birga bir.

Fayl katta bo'lgani uchun bir necha qismda yozsang bo'ladi (har qismni oldingisining oxiriga
qo'sh), lekin yakuniy fayl ilovadan bitta belgi ham farq qilmasin.

Qabul tekshiruvi:
- node -e "const c=require('fs').readFileSync('assets/css/app.css','utf8');console.log((c.match(/{/g)||[]).length,(c.match(/}/g)||[]).length)"
  ikkala son teng bo'lsin (etalonda 1252 va 1252).
- Qator soni aynan 2078.
- :root da --bg #0B1120, --accent #22C55E, --font "IBM Plex Sans", --mono "JetBrains Mono" bor.
```

### P3. `assets/js/app.js`

```
assets/js/app.js ni 8.C ilovadan AYNAN ko'chir (taxminan 3400 qator). Faqat 3-bo'limdagi
"app.js" qatorlarini almashtir. Mantiqni, funksiya nomlarini, tartibini, klaviatura
tugmalarini, saqlash kalitlarini o'zgartirma.

Fayl katta: bir necha qismda yoz, oxirida node --check assets/js/app.js xatosiz o'tsin.

TECH_LOGOS va TECH_PATHS hozircha bo'sh qoldir:  const TECH_LOGOS = [];  const TECH_PATHS = {};
(ularni P4 da mavzuga qarab to'ldirasan).

Qabul tekshiruvi:
- node --check assets/js/app.js xatosiz.
- Faylda {{STORAGE_PREFIX}}: kalitlari izchil (KEYS obyekti va index.html dagi theme skripti bir xil prefiks).
- 3-bo'limdagi grep buyrug'i chiqargan qatorlarning hammasi mavzuga moslangan.
```

### P4. Taksonomiya: guruhlar, skillar, stacklar

```
Mavzu: {{TOPIC}}. O'quvchi: {{LEARNER}}. Maqsad: {{GOAL}}.

Quyidagini loyiha tuzilmasiga mos qilib loyihala va yoz:

1) data/manifest.js — window.SKILL_GROUPS (10–16 guruh), window.SKILL_FILES, window.LESSON_FILES = [].
   Guruh: { id: "kebab-case", title, icon, skills: [skillId, ...] }.
   icon sprite'dagi nomlardan biri bo'lsin: code layers database plug key flask branch server
   rocket queue shield gauge bug boxes cloud users.
   Guruhlar mantiqiy ketma-ketlikda: asosdan murakkabga.

2) Skillar ro'yxati (hali fayl emas): har skill uchun id (butun son, noyob), slug (kebab-case,
   noyob), title, group. 50–90 ta skill. Har skillda 12–25 subskill bo'ladi (keyingi bosqichda).

3) app.js dagi TECH_LOGOS (stacklar): 15–25 ta. Har stack:
   { n, v, g, k?, ic?, c, s, id, cat?, d, sk: [skill slug'lari TARTIB BILAN] }
   - id: URL'da ishlatiladi (kebab-case, noyob).
   - c: brend rangi (hex).
   - Logo: k (TECH_PATHS kaliti) YOKI ic (sprite ikonka nomi) YOKI g (1–4 harfli belgi). Faqat bittasi.
     Agar rasmiy brend SVG path'ini aniq bilmasang, k ishlatma: g yoki ic ishlat.
   - cat: true — bu texnologiya emas, yo'nalish (masalan "Xavfsizlik"); karuselda ko'rsatilmaydi.
   - sk: bu stackka tegishli skill slug'lari. Har skill AYNAN BITTA stackda bo'lsin.
     Tartib muhim: skill raqami stack ichidagi o'rniga teng (1, 2, 3...).
   - Texnologiya stacklarini birinchi, yo'nalish (cat) stacklarini oxirgi qo'y.

4) TECH_PATHS: faqat ishlatilgan k kalitlari uchun { kalit: "SVG path d" } (24x24 viewBox).

5) CAREER_LEVELS (app.js boshida): id/label/subLevels/badge/color/icon'ni O'ZGARTIRMA.
   Faqat `name` va `desc` matnlarini mavzuga moslab qayta yoz (4 ta daraja: junior, middle, senior, lead).

6) Kod highlighter: app.js dagi KW to'plamini {{CODE_LANGS}} uchun kalit so'zlar bilan to'ldir
   (mavjud PHP/SQL so'zlarini saqlab, yangilarini qo'sh). Izoh regex'i (// # -- /* */) umumiy, tegma.

Qabul tekshiruvi:
- node --check data/manifest.js va node --check assets/js/app.js
- Har skill slug'i aynan bitta stackning sk massivida (validate.js shuni tekshiradi, P9).
- Guruhlardagi skill id'lari ro'yxati va skillar ro'yxati to'liq mos.
```

### P5. Skill fayllari

```
P4 dagi skillarning har biri uchun data/skills/NN-slug.js yoz (NN — id, 2 xonali: 01, 02, ..., 85).
Faylni ALOHIDA yoz, bir vaqtda bitta skill. Format (aynan shu):

/* <id> · <title>
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. */
registerSkill({
  id: <son>,
  slug: "<slug>",
  title: "<title>",
  group: "<guruh id>",
  description: "Skill haqida 2–4 gap: nima, nega {{LEARNER}} uchun muhim.",
  subskills: [
    {
      id: "<skillId>.<tartib>",            // masalan "13.1"
      title: "...",
      description: ["Markdown qatorlari", "", "```<til>", "kod", "```"],   // 80–250 so'z
      priority: "core" | "important" | "optional",
      level: "Foundation" | "Junior" | "Middle" | "Strong Middle" | "Senior" | "Lead",
      practicalTask: "Bilimni amalda tekshiradigan bitta aniq topshiriq.",
      acceptanceCriteria: ["2–4 ta tekshiriladigan mezon"],
      prerequisites: ["<mavjud subskill id yoki skill slug>"]
    }
  ]
});

Qoidalar:
- Subskill id'lari ketma-ket: <skillId>.1, <skillId>.2, ... (tartib va son keyin o'zgarmaydi).
- 12–25 subskill. Oddiydan murakkabga. Level'lar progressiya bilan o'sib borsin.
- prerequisites faqat MAVJUD id/slug'larga. Yo'qlarini o'ylab topma.
- Har string JS qoidalariga mos: " -> \", \ -> \\, qatorlar massivi qulay.
- Bilmagan narsani yozma. Versiyaga bog'liq xususiyatni belgila.
- Bu skill nomini yangi stackka moslab TECH_LOGOS'da sk massivida borligini tekshir.

Har fayldan keyin: node --check data/skills/<fayl>.js. Hammasi tugagach manifest.js dagi
SKILL_FILES ro'yxatini fayllar bilan to'ldir (sorted by id).

Qabul tekshiruvi: node validate.js . (P9) da "skill/subskill" xatolari yo'q.
```

### P6. Chuqur darslar

```
Har subskill uchun data/lessons/<subId>.js yoz (masalan data/lessons/13.12.js). Bir vaqtda bitta
skillning darslarini yoz. Format (aynan shu):

/* Chuqur dars: <subId>. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("<subId>", {
  "lesson": [ "### Sarlavha", "Matn (Markdown)...", "", "- ro'yxat", "1. raqamli" ],
  "examples": [ { "title": "Misol nomi", "lang": "<til>", "code": ["// kod"], "note": "izoh (ixtiyoriy)" } ],
  "pitfalls": [ "Odatiy xato va nima uchun xato ekani." ]
});

Talablar:
- lesson: 350–600 so'z, ### bo'limlar: nima, nega kerak, qanday ishlaydi, qachon ishlatiladi va
  qachon ishlatilmaydi, mavzudagi o'rni.
- examples: 2–3 ta qisqa, ishlaydigan kod: muammo/yechim, odatiy ishlatilish, test.
- pitfalls: 3–4 ta.
- **qalin** ichida `kod` ISHLATMA. Faqat aniq bilgan narsani yoz.
- Dars subskill description'ini takrorlamasin, chuqurlashtirsin.

Har fayldan keyin node --check. Yangi fayl nomini manifest.js dagi LESSON_FILES ga qo'sh.
Darslar ixtiyoriy tartibda yozilishi mumkin: darsi yo'q subskill sahifasida "yozilmagan" degan joy chiqadi.

Qabul tekshiruvi: validate.js "dars subskillga mos emas" xatosini bermasin.
```

### P7. Intervyu savollari

```
data/interview-questions.js ni yoz. Format:

/* {{APP_NAME}} — Intervyu savol-javoblari bazasi */
window.INTERVIEW_QUESTIONS = [
  {
    id: "iq-1",                       // noyob, ketma-ket
    title: "Savol matni?",
    level: "junior" | "middle" | "senior" | "lead",
    category: "<stack id>",           // keyin app avtomatik qayta yozadi, baribir to'g'ri yoz
    categoryLabel: "<stack nomi>",
    skillSlug: "<skill slug>",        // MAJBURIY va mavjud
    subskillId: "<subskill id>",      // MAJBURIY va mavjud, skillSlug'ga tegishli
    answer: ["Markdown qatorlari: aniq, professional javob"],
    tip: "Intervyuda nimaga e'tibor berishadi (1–2 gap)",
    type: "bug" | "scenario" | "behavioral",   // ixtiyoriy
    code: "ixtiyoriy kod"               // ixtiyoriy
  }
];

Qoidalar:
- Har stackda kamida 5 ta savol; jami 150–300 ta. Darajalar bo'yicha: junior ~20%, middle ~30%,
  senior ~35%, lead ~15%.
- Savol subskill mazmuniga HAQIQATAN mos bo'lsin (N+1 savoli N+1 subskill'iga, boshqasiga emas).
- Javob "nima" bilan cheklanmay, "nega" va "qachon" ni ham aytsin; tip esa nimani baholashini.
- Real intervyu uslubi, ba'zilari stsenariy/xato topish.

Qabul tekshiruvi: validate.js savol xatolarini bermasin (skillSlug, subskillId, level, answer, tip).
```

### P8. Texnik testlar

```
data/interview-tests.js ni yoz. Format:

window.INTERVIEW_TESTS = [
  {
    id: "t-<stack>-<n>",
    category: "<stack id>", categoryLabel: "<stack nomi>",
    skillSlug: "<skill slug>", subskillId: "<subskill id>",
    level: "junior" | "middle" | "senior",
    question: "Savol (kod bo'lsa `inline code` bilan)",
    options: [ {key:"A",text:"..."}, {key:"B",text:"..."}, {key:"C",text:"..."}, {key:"D",text:"..."} ],
    correct: "A" | "B" | "C" | "D",
    explanation: "Nega to'g'ri va boshqalari nega noto'g'ri."
  }
];

Qoidalar:
- Har stackda kamida 4 ta test; jami 100–200 ta.
- To'g'ri javob harflari TENG taqsimlansin (A/B/C/D ~25% dan). Ketma-ket bir xil harf takrorlanmasin.
- Noto'g'ri variantlar ishonarli bo'lsin (haqiqiy xato tushunchalar), ochiq-oydin bema'ni emas.
- To'g'ri variant eng uzun bo'lib qolmasin.
- Har testning subskillId'si mavjud va mavzuga mos.

Qabul tekshiruvi: validate.js test xatolarini bermasin va "to'g'ri javob taqsimoti" tekis chiqsin.
```

### P9. Yakuniy tekshiruv

```
1) node validate.js .   -> "OK: xato yo'q" bo'lishi shart. Chiqqan har bir XATO ni tuzat.
   OGOHLANTIRISH larni ham ko'rib chiq.
2) Brauzer tekshiruvi (qo'lda yoki headless Chrome):
   a) index.html ni file:// orqali och. Landing chiqadi: hero, karusel, raqamlar, "Qanday ishlaydi",
      yo'l xaritasi, dars namunasi, savol-javob, footer. Raqamlar (stack, skill, mavzu, savol, test)
      validate.js chiqargan sonlarga teng.
   b) "Kirish" -> "Hisob yaratish" bilan hisob och. Endi quyidagi marshrutlar ishlashi shart:
      #/stacks, #/stacks/<id>, #/s/<slug>, #/s/<slug>/<subId>, #/interview, #/interview?stack=<id>,
      #/interview/play (savoldan boshlab), #/quiz, #/quiz?stack=<id>, #/quiz/play, #/profile.
   c) Subskill holatini o'zgartir (Boshlanmagan -> O'rganilmoqda -> Ishonchli): stack va skill
      progressi yangilanadi. Sahifani yangilasang saqlanib qoladi.
   d) Intervyuda savolni och: Space — javob, 1/2/3 — baho (keyingi savolga o'tadi), B — saqlash,
      Esc — chiqish. Testda A–D tanlash, Enter — keyingi, natija sahifasi, "Xatolarim" rejimi.
   e) Tema tugmasi: qorong'i <-> yorug'. Ikkalasida ham matn o'qiladi, yorug' mavzuda ranglar buzilmaydi.
   f) 720px dan tor oynada pastki navigatsiya paydo bo'ladi; gorizontal scroll yo'q.
   g) Brauzer konsolida xato yo'q.
3) Hisobotda aytib ber: nechta skill, subskill, dars, savol, test; qaysi qabul tekshiruvlari o'tdi.
```

---

## 3. Almashtirish jadvali (faqat shu joylar o'zgaradi)

Mavzuga bog'liq joylarni topish uchun loyiha ildizida shu buyruqni ishga tushiring va chiqqan **hamma** qatorni ko'rib chiqing:

```bash
grep -n "PHP\|Laravel\|Senior\|Stack Map\|Skill Map\|N+1\|Sanctum\|EXPLAIN\|Horizon\|idempotency\|@gmail\|ibraymov" index.html assets/js/app.js assets/css/app.css
```

### index.html

| Joy | Hozirgi matn | Almashtirish |
|---|---|---|
| `<title>` | `Stack Map` | `{{APP_NAME}}` |
| `meta name="description"` | `Stack Map: Senior PHP / Laravel dasturchi uchun texnologiyalar xaritasi, skillar, intervyu savollari va progress tracker.` | `{{APP_NAME}}: {{APP_TAGLINE}}, skillar, intervyu savollari va progress tracker.` |
| `.brand-name` | `Stack Map` | `{{APP_NAME}}` |
| `#palette-input placeholder` | `Masalan: N+1, Sanctum, EXPLAIN, idempotency…` | mavzudan 3–4 ta xarakterli atama |
| `localStorage.getItem("lsm:theme")` | `lsm:` | `{{STORAGE_PREFIX}}:` (app.js dagi `KEYS.theme` bilan bir xil) |

O'zgartirilmaydi: `theme-color`, favicon, shrift havolalari, sprite, `lang="uz"` (til boshqa bo'lsa, faqat `lang` ni o'zgartiring).

### assets/css/app.css

Faqat 2-qatordagi izoh: `Laravel Skill Map — design tokens` -> `{{APP_NAME}} — design tokens`. Boshqa hech narsa.

### assets/js/app.js

| Joy (qidirish uchun matn) | Nima qilinadi |
|---|---|
| 1-qator `/* Stack Map — vanilla JS ...` | `{{APP_NAME}}` |
| `const KEYS = { progress: "lsm:progress", ...` va `indexedDB.open("lsm_accounts", 1)`, `localStorage.getItem("lsm:quiz_scores")` | prefiksni `{{STORAGE_PREFIX}}` ga izchil almashtir (yoki o'zgartirma) |
| `const CAREER_LEVELS` ichidagi `name` va `desc` | 4 daraja uchun mavzuga mos matn. `id`, `label`, `subLevels`, `badge`, `color`, `bg`, `icon` o'zgarmaydi |
| `const TECH_LOGOS = [...]` | P4: yangi stacklar |
| `const TECH_PATHS = {...}` | P4: faqat ishlatilgan `k` kalitlari |
| `const KW = new Set(...)` (highlighter) | `{{CODE_LANGS}}` kalit so'zlarini qo'sh |
| `renderHome()` ichidagi `<h1><span>Stack Map</span></h1>` | `{{APP_NAME}}` |
| `renderHome()` hero `<p>Har bir texnologiya bitta stack: ...</p>` | mavzuga mos 1–2 gap |
| `renderHome()` "Qanday ishlaydi" 3 ta `<li class="lp-step-n">` (sarlavha + matn) | mavzuga mos; ma'no: 1 tanlang, 2 o'rganing, 3 sinang |
| `renderHome()` `.lp-mock` namunasi (`Stack Map / PHP / 1.4 Type Juggling`, matn, kod, `pitfalls`) | yangi mavzudan bitta haqiqiy subskill namunasi: yo'l, sarlavha, 1 gap, 2 qator kod, 1 xato |
| `renderHome()` FAQ 6 ta `<details>` | mavzuga mos 6 ta; "Barcha darslar to'liqmi?" javobini haqiqiy holatga moslang |
| `renderHome()` footer `<b>Stack Map</b><span>Senior PHP / Laravel ...</span>` va `© ... Stack Map` | `{{APP_NAME}}`, `{{APP_TAGLINE}}` |
| barcha `document.title = ...` qiymatlari (login, skill, dars, intervyu, mashq, stack, stacklar, profil, test, testlar, bosh sahifa), har birining oxiridagi `· Stack Map` | `{{APP_NAME}}` |
| `"Senior Maslahati: "` (nusxalash matni), `"Senior siri"` (mock modal), `"Senior darajasidagi natija"` (test natijasi) | maqsad darajasi nomiga (`{{GOAL}}`) moslang |
| `const ADMIN_EMAIL = "..."` | `{{ADMIN_EMAIL}}` |
| `placeholder="nom@gmail.com"` va xato matni `(masalan: nom@gmail.com)` | ixtiyoriy, o'zgartirish shart emas |
| Qidiruv placeholder'lari: `Qidirish: N+1, lock, Horizon`, `Barcha savollardan qidirish: N+1, idempotency, lock, Horizon...`, `Skill yoki mavzu qidiring…` | mavzudan atamalar bilan |
| `renderHome()` "Intervyuga tayyorlanish", sidebar va stack sahifasi matnlari | o'zgarmaydi (mavzudan mustaqil) |

Interfeys tili o'zbekcha (lotin) qolsa, qolgan barcha UI matnlari (tugmalar, yorliqlar, bo'sh holatlar) o'zgarmaydi. Boshqa til kerak bo'lsa, `{{LANG}}` ga ko'ra **barcha** satr literallarini tarjima qiling: ma'lumot maydonlari (`STATUSES`, `PRIORITY`, `FILTERS`, `IQ_STATUS` va boshqalar) va shablonlardagi matnlar. Klass nomlari, `data-*` atributlari va saqlash kalitlariga tegmang.

---

## 4. Saqlanadigan va o'zgarmas shartnomalar (modelga eslatma)

- `level` qiymatlari: `Foundation`, `Junior`, `Middle`, `Strong Middle`, `Senior`, `Lead` (aynan shunday yozilishi shart). `levelOf()` shularga tayanadi.
- Savol va test `level`: kichik harf (`junior`, `middle`, `senior`, `lead`).
- Subskill id: `"<skillId>.<tartib>"`. Dars fayl nomi: `<subId>.js`. Skill fayl nomi: `NN-slug.js`.
- Stackning `sk` massividagi **tartib** skill raqamini belgilaydi: `s.num = indexOf + 1`, subskill raqami `"<s.num>.<j>"`.
- Savol/test `category` va `categoryLabel` ishga tushganda `skillSlug` orqali stackdan avtomatik yoziladi. Ularning to'g'ri bo'lishi uchun skill har doim bitta stackda turishi kerak.
- Progress kalitlari asl subskill id (`"13.12"`) bo'yicha saqlanadi, ko'rinadigan raqam (`2.5`) bo'yicha emas.
- Darslar `window.LESSON_FILES` orqali, birinchi render'dan KEYIN fonda yuklanadi (`loadLessons()`). `loadData()` faqat skill fayllarini kutadi.

---

## 5. `validate.js` (loyiha ildiziga saqlang)

Ishlatish: `node validate.js .` Chiqish kodi 1 bo'lsa, xato bor.

```js
// Ishlatish: node validate.js <loyiha-ildizi>
// Manifest, skill, dars, savol va testlarning o'zaro bog'liqligini tekshiradi.
const fs = require("fs"), vm = require("vm"), path = require("path");
const root = path.resolve(process.argv[2] || ".");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const errors = [], warn = [];
const err = (m) => errors.push(m);

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(read("data/manifest.js"), ctx);
const W = ctx.window;

const skills = [];
ctx.registerSkill = (s) => skills.push(s);
for (const f of W.SKILL_FILES || []) {
  try { vm.runInContext(read("data/skills/" + f), ctx, { filename: f }); }
  catch (e) { err(`skill fayl xato: ${f}: ${e.message}`); }
}
const lessons = {};
ctx.registerLesson = (id, d) => { lessons[id] = d; };
for (const f of W.LESSON_FILES || []) {
  try { vm.runInContext(read("data/lessons/" + f), ctx, { filename: f }); }
  catch (e) { err(`dars fayl xato: ${f}: ${e.message}`); }
}
try { vm.runInContext(read("data/interview-questions.js"), ctx); } catch (e) { err("interview-questions.js: " + e.message); }
try { vm.runInContext(read("data/interview-tests.js"), ctx); } catch (e) { err("interview-tests.js: " + e.message); }

const PRI = ["core", "important", "optional"];
const LVL = ["Foundation", "Junior", "Middle", "Strong Middle", "Senior", "Lead"];
const ids = new Set(), slugs = new Set(), subIds = new Set();
for (const s of skills) {
  if (ids.has(s.id)) err(`skill id takror: ${s.id}`); ids.add(s.id);
  if (slugs.has(s.slug)) err(`skill slug takror: ${s.slug}`); slugs.add(s.slug);
  if (!(W.SKILL_GROUPS || []).some((g) => g.skills.includes(s.id))) err(`skill guruhga kiritilmagan: ${s.id} ${s.slug}`);
  (s.subskills || []).forEach((x, i) => {
    if (subIds.has(x.id)) err(`subskill id takror: ${x.id}`); subIds.add(x.id);
    if (!String(x.id).startsWith(s.id + ".")) err(`subskill id skill id bilan boshlanmaydi: ${x.id} (skill ${s.id})`);
    if (!PRI.includes(x.priority)) warn.push(`priority noto'g'ri: ${x.id} = ${x.priority}`);
    if (!LVL.includes(x.level)) warn.push(`level noto'g'ri: ${x.id} = ${x.level}`);
  });
}
for (const s of skills) for (const x of s.subskills || [])
  for (const p of x.prerequisites || []) if (!subIds.has(p) && !slugs.has(p)) err(`prerequisite topilmadi: ${x.id} -> ${p}`);
for (const g of W.SKILL_GROUPS || []) for (const id of g.skills) if (!ids.has(id)) err(`guruhda yo'q skill: ${g.id} -> ${id}`);
for (const id of Object.keys(lessons)) if (!subIds.has(id)) err(`dars subskillga mos emas: ${id}`);
for (const f of fs.readdirSync(path.join(root, "data/lessons"))) if (!(W.LESSON_FILES || []).includes(f)) warn.push(`dars manifestda yo'q: ${f}`);

// TECH_LOGOS app.js dan olinadi
const js = read("assets/js/app.js");
const m = js.match(/const TECH_LOGOS = \[([\s\S]*?)\n  \];/);
const stackSlugs = new Set();
if (!m) err("TECH_LOGOS topilmadi"); else {
  const stacks = vm.runInNewContext("[" + m[1] + "]");
  const seen = new Set();
  for (const st of stacks) {
    if (seen.has(st.id)) err(`stack id takror: ${st.id}`); seen.add(st.id);
    for (const sl of st.sk) { if (!slugs.has(sl)) err(`stackda yo'q skill: ${st.id} -> ${sl}`); if (stackSlugs.has(sl)) err(`skill ikki stackda: ${sl}`); stackSlugs.add(sl); }
  }
  for (const sl of slugs) if (!stackSlugs.has(sl)) warn.push(`skill hech bir stackda yo'q: ${sl}`);
}

const iq = W.INTERVIEW_QUESTIONS || [], tests = W.INTERVIEW_TESTS || [];
const qids = new Set();
for (const q of iq) {
  if (qids.has(q.id)) err(`savol id takror: ${q.id}`); qids.add(q.id);
  if (!slugs.has(q.skillSlug)) err(`savol skillSlug noto'g'ri: ${q.id} ${q.skillSlug}`);
  if (!subIds.has(q.subskillId)) err(`savol subskillId noto'g'ri: ${q.id} ${q.subskillId}`);
  else if (q.skillSlug && skills.find((s) => s.slug === q.skillSlug) && !String(q.subskillId).startsWith(skills.find((s) => s.slug === q.skillSlug).id + ".")) err(`savol skill va subskill mos emas: ${q.id}`);
  if (!["junior", "middle", "senior", "lead"].includes(q.level)) err(`savol level: ${q.id} ${q.level}`);
  if (!q.answer || !q.tip) err(`savolda answer/tip yo'q: ${q.id}`);
}
const tids = new Set();
for (const t of tests) {
  if (tids.has(t.id)) err(`test id takror: ${t.id}`); tids.add(t.id);
  if (!slugs.has(t.skillSlug)) err(`test skillSlug noto'g'ri: ${t.id}`);
  if (!subIds.has(t.subskillId)) err(`test subskillId noto'g'ri: ${t.id} ${t.subskillId}`);
  const keys = (t.options || []).map((o) => o.key).join("");
  if (keys !== "ABCD") err(`test variantlari ABCD emas: ${t.id}`);
  if (!"ABCD".includes(t.correct || "?")) err(`test correct noto'g'ri: ${t.id}`);
  if (!t.explanation) err(`testda explanation yo'q: ${t.id}`);
}
const dist = { A: 0, B: 0, C: 0, D: 0 }; tests.forEach((t) => dist[t.correct]++);
console.log(`skill ${skills.length}, subskill ${subIds.size}, dars ${Object.keys(lessons).length}, savol ${iq.length}, test ${tests.length}`);
console.log("to'g'ri javob taqsimoti:", JSON.stringify(dist));
warn.slice(0, 20).forEach((w) => console.log("OGOHLANTIRISH:", w));
if (warn.length > 20) console.log(`... yana ${warn.length - 20} ta ogohlantirish`);
if (errors.length) { errors.slice(0, 50).forEach((e) => console.log("XATO:", e)); console.log(`JAMI XATO: ${errors.length}`); process.exit(1); }
console.log("OK: xato yo'q");
```

---

## 6. Qabul tekshiruvi (umumiy ro'yxat)

1. `node --check assets/js/app.js` va `node validate.js .` xatosiz.
2. `app.css` da qavslar soni teng, qator soni etalon bilan mos.
3. Landing'dagi raqamlar ma'lumot fayllaridagi sonlarga teng.
4. Hamma marshrut (9.d bandi) ishlaydi, konsolda xato yo'q.
5. Qorong'i va yorug' mavzuda ko'rinish bir xil tuzilmada.
6. 720px dan tor oynada pastki navigatsiya, gorizontal scroll yo'q.
7. Mehmon (kirmagan) holatda landing'da faqat tepadagi "Kirish" tugmasi login'ga olib boradi.
8. Birinchi render ~1 soniyadan kam (darslar fonda yuklanadi).

Headless Chrome (ixtiyoriy, mehmon sahifalari uchun):

```bash
chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1800 \
  --virtual-time-budget=15000 --allow-file-access-from-files \
  --screenshot=landing.png "file:///<yo'l>/index.html#/"
```

Ichki sahifalar (login talab qiladi) uchun brauzerda hisob oching va marshrutlarni qo'lda aylanib chiqing.

---

# 7. SPETSIFIKATSIYA: dizayn tizimi va tuzilma

Quyida etalon loyihaning to'liq tavsifi. Uning ichki bo'limlari `S1`–`S11` deb raqamlangan (blueprint bo'limlari bilan chalkashmasligi uchun). U Laravel/PHP mavzusida yozilgan. **Mazmun jadvallari (skill va stacklar ro'yxati) NAMUNA**: ularni ko'chirmang, tuzilmasini oling. Dizayn tokenlari, komponentlar, marshrutlar, ma'lumot formatlari va saqlash tuzilmasi esa aynan shunday qoladi.

## Stack Map — dizayn tizimi va loyiha tuzilishi

Bu hujjat "Middle Strong PHP Laravel" loyihasi (sayt nomi: **Stack Map**, mahsulot nomi: **Laravel Skill Map**) haqida to'liq ma'lumot beradi:

- frontend dizayn tizimi: ranglar, shriftlar, o'lchamlar va komponentlar;
- sahifalar va ularning tuzilishi;
- kontent qanday joylashgani: stack → skill → subskill → chuqur dars;
- ma'lumot fayllarining formatlari, saqlash va hisoblar;
- yangi kontent qo'shish tartibi.

Hujjatdagi raqamlar 2026-10-29 holatiga ko'ra. Boshqa mavzu uchun loyihani 1:1 qayta qurish promptlari: `BLUEPRINT-PROMPT.md`.

---

### S1. Loyiha haqida qisqacha

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

### S2. Fayllar tuzilishi

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

### S3. Kontent ierarxiyasi

```
Guruh (16)  →  Skill (85)  →  Subskill (1597)  →  Chuqur dars (623 yozilgan)
                  ↑
Stack (24)  ──────┘  (stack — foydalanuvchiga ko'rinadigan asosiy kirish nuqtasi; bir nechta skillni jamlaydi)

Intervyu savoli (294)  ──→  subskillId orqali subskillga
Texnik test (187)      ──→  subskillId orqali subskillga
```

#### S3.1. Guruh (sidebar bo'limi)

`data/manifest.js` → `window.SKILL_GROUPS`. Har guruhda `id`, `title`, `icon` (sprite nomi) va `skills` (skill id'lari tartibda) bor.

#### S3.2. Skill

`data/skills/NN-slug.js` faylida `registerSkill({...})`. Maydonlari: `id` (raqam), `slug`, `title`, `group`, `description`, `subskills[]`.

#### S3.3. Subskill

Skill ichidagi mavzu. Maydonlari: `id` (`"13.12"`), `title`, `description` (Markdown), `priority`, `level`, `practicalTask`, `acceptanceCriteria[]`, `prerequisites[]`.

- `priority`: `core` (702), `important` (796), `optional` (99).
- `level`: `Foundation` (26), `Junior` (368), `Middle` (780), `Strong Middle` (56), `Senior` (348), `Lead` (19).
- UI'da `level` 4 ta martaba darajasiga keltiriladi (`levelOf()`): Foundation/Junior → **junior**, Middle/Strong Middle → **middle**, Senior → **senior**, Lead → **lead**.

#### S3.4. Chuqur dars

`data/lessons/<subId>.js` faylida `registerLesson("<subId>", { lesson, examples, pitfalls })`. Subskill sahifasida "Chuqur tushuntirish", "Kod misollari" va "Odatiy xatolar" bo'limlarini to'ldiradi. Fayl bo'lmasa, sahifada "Chuqur dars hali yozilmagan" degan joy qoladi.

#### S3.5. Stack

`app.js` dagi `TECH_LOGOS` massivida. Stack — texnologiya (PHP, Redis, Docker...) yoki yo'nalish (API, Arxitektura...). U bir nechta skill slug'ini jamlaydi (`sk`).

Muhim qoida: **skill raqami stack ichidagi o'rni bo'yicha** ko'rsatiladi (`s.num = stk.sk.indexOf(s.slug) + 1`). Subskill raqami `"<skill.num>.<tartib>"`. Masalan, Laravel stackidagi Eloquent ORM — `2`, uning subskill'lari `2.1`, `2.2`... Ma'lumotdagi asl `id` (`13`, `"13.1"`) o'zgarmaydi: progress, fayl nomlari va `prerequisites` asl id bilan ishlaydi.

---

### S4. To'liq xarita: guruhlar, skillar va darslar holati

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

### S5. Stacklar (`TECH_LOGOS`)

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

### S6. Sahifalar va marshrutlar (router)

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

#### S6.1. Dars sahifasi (`#/s/<slug>/<subId>`) tuzilishi

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

#### S6.2. Intervyu (mashq ish joyi)

- **Chap panel (`.px-rail`, 244px, yopishqoq):** "Bugungi mashq" tugmasi; rejimlar (Bugungi navbat, Takrorlash, Barcha savollar, Saqlangan); 24 ta stack (son, o'zlashtirish chizig'i).
- **O'ng (`.px-main`):** sarlavha va harakatlar (Mashqni boshlash, Mock, Yana 5 ta, Darslar), progress chizig'i (o'zlashtirilgan / o'rganilmoqda / yangi), asboblar paneli (qidiruv, daraja, holat), savollar ro'yxati.
- **Fokus sessiya (`.px-play`, 820px markazda):** segmentli progress, savol kartasi, qoralama maydoni, javob, intervyu maslahati, baho (Bilmadim / Qisman / Bildim + keyingi takrorlash sanasi), saqlash, nusxalash, dars havolasi.
- **Klaviatura:** `Space` — javobni ochish; `1` `2` `3` — baho; `←` `→` — oldingi/keyingi savol; `B` — saqlash; `Esc` — chiqish.
- **Yakun:** baholar soni, "Qayta ko'rish kerak" ro'yxati (dars havolalari bilan), "Qiyinlarini qayta".

#### S6.3. Texnik testlar

- **Chap panel:** "Tez test 10", Aralash, Xatolarim, stacklar (son + eng yaxshi natija chizig'i).
- **O'ng:** sarlavha, KPI (Testlar, Eng yaxshi natija, Urinishlar, Xato qilinganlar), "Testni sozlang" (daraja, savollar soni 5/10/15/Barchasi), "Oxirgi urinishlar".
- **Sessiya:** segmentlar yashil/qizil, `A`–`D` yoki `1`–`4` bilan tanlash, `Enter` — keyingi, tushuntirish va dars havolasi.
- **Natija:** foiz (rangli: 90+ / 70+ / 50+ / past), baho matni, statistika, har savol bo'yicha sharh (sizning javobingiz, to'g'ri javob, dars), "Xatolarni qayta ishlash".

#### S6.4. Landing (mehmon uchun)

Login'ga faqat tepadagi **Kirish** tugmasi olib boradi. Hero'da CTA tugmalar yo'q. Karusel va yo'l xaritasi elementlari mehmon uchun bosilmaydi (`<span>`). Footer'da faqat "Savol-javob". Kirgan foydalanuvchi uchun hero'da "Stacklarni ko'rish" va "Intervyuga tayyorlanish" chiqadi, karusel va xarita havolaga aylanadi.

---

### S7. Dizayn tizimi

#### S7.1. Yo'nalish

Operate rejimidagi o'quv ilovasi: qorong'i (default) va yorug' mavzu, yashil aksent, IBM Plex Sans + JetBrains Mono. Ifoda emas, aniqlik: zich ro'yxatlar, aniq holat ranglari, klaviatura bilan ishlash. Brend faqat aniq detallarda: yashil aksent, monospace raqamlar va rangli stack logolari.

#### S7.2. Rang tokenlari (`:root` — qorong'i mavzu)

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

#### S7.3. Daraja ranglari (bir xil hamma joyda)

| Daraja | Rang |
|---|---|
| Junior | `--accent-text` (yashil) |
| Middle | `--st-1` (ko'k) |
| Senior | `--st-4` (binafsha) |
| Lead | `--st-2` (sariq) |

#### S7.4. Tipografiya

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

#### S7.5. O'lchamlar

| Token | Qiymat |
|---|---|
| Bo'shliq | `--sp-1 4px`, `--sp-2 8px`, `--sp-3 12px`, `--sp-4 16px`, `--sp-5 24px`, `--sp-6 32px`, `--sp-7 48px`, `--sp-8 64px` |
| Radius | `--r-sm 6px`, `--r 10px`, `--r-lg 14px`, `--r-xl 20px` |
| Topbar | `--topbar-h 60px` |
| Sidebar | `--sidebar-w 300px` |
| Kontent kengligi | `.view` — `max-width 1240px`, padding 48px (≤1024px da 32/24, ≤720px da 24/16) |
| Animatsiya | `--ease cubic-bezier(.2,.7,.2,1)`, `--t-fast 140ms`, `--t 220ms` |
| Ikonka | `.ic` 18px, `.ic-sm` 15px, `.ic-lg` 22px; stroke 1.8, currentColor |

#### S7.6. Breakpoint'lar

Ko'p ishlatiladiganlari: **1024px** (planshet), **960px** (mashq paneli tepaga chiqadi), **720px** (mobil: pastki navigatsiya, kichik padding), **640px** (mashq kartalari ixchamlashadi), **560px**. Boshqalari: 1366, 1280, 1240, 1100, 900, 860, 768, 620, 600. Bundan tashqari `prefers-reduced-motion` (animatsiyalar o'chadi) va `print`.

#### S7.7. Ikonkalar

`index.html` dagi SVG sprite (Lucide uslubi, 24px to'r). Chaqirish: `icon("name", "ic ic-sm")` → `<svg class="ic"><use href="#i-name"/></svg>`.

Mavjud ikonkalar: `logo search sun moon menu more chev-down chev-right arrow-left arrow-right check link download upload trash file info alert home eye eye-off enter target list-checks sparkles help expand collapse code layers database plug key flask branch server rocket queue shield gauge bug boxes cloud users bookmark copy close reset play`.

Stack logolari — `TECH_PATHS` dagi SVG path'lar, `.stk-logo` ichida brend rangi fonida (`--bc`).

#### S7.8. Komponentlar

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

#### S7.9. Holat va qulaylik qoidalari

- Fokus: `:focus-visible` — 2px `--accent-ring` halqa.
- `.skip-link` — "Asosiy kontentga o'tish".
- Tanlangan holat `aria-pressed`, `aria-current`, `aria-selected`, `aria-checked` atributlari bilan beriladi va CSS shu atributlarga bog'langan.
- Yon tomonga qalin rangli chiziq (side-tab), dekorativ gradient matn va bounce animatsiya yangi kodda ishlatilmaydi (impeccable qoidalari).
- Kontrast: matn `--text`/`--text-2` surface ustida; `--text-3` faqat izohlar uchun.

---

### S8. Ma'lumot formatlari

#### S8.1. `data/manifest.js`

```js
window.SKILL_GROUPS = [
  { "id": "php-laravel", "title": "PHP va Laravel", "icon": "code", "skills": [1, 2, 13, 7, 8] },
  // ... 16 ta guruh
];
window.SKILL_FILES = ["01-php.js", "02-laravel.js", /* ... 85 ta */];
window.LESSON_FILES = ["1.1.js", "1.2.js", /* ... 623 ta */];
```

#### S8.2. Skill fayli (`data/skills/13-eloquent-orm.js`)

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

#### S8.3. Dars fayli (`data/lessons/1.4.js`)

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

#### S8.4. Intervyu savoli (`data/interview-questions.js`)

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

#### S8.5. Texnik test (`data/interview-tests.js`)

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

#### S8.6. Qo'llab-quvvatlanadigan Markdown

- Paragraflar (bo'sh qator), `###` va `####` sarlavhalar.
- `- ro'yxat`, `1. raqamli ro'yxat` (raqam kod blokdan keyin ham davom etadi: `<ol start>`), `> eslatma`.
- `**qalin**` (ichida `` `kod` `` bo'lishi mumkin), `*kursiv*`, `` `inline code` ``, `[havola](https://...)` va `[havola](#/...)`.
- Kod bloklari: ` ```php `, ` ```sql `, ` ```bash ` (PHP/SQL kalit so'zlari rangli).
- Oddiy jadvallar: `| a | b |` + `|---|---|`.

JS string qoidalari: yangi qator `\n`, qo'shtirnoq `\"`, backslash `\\` (`App\\Models\\User`). Uzun matnni qatorlar massivi qilib yozish mumkin.

---

### S9. Holat, progress va saqlash

#### S9.1. Subskill holati

3 holat (`STATUSES`): **0 Boshlanmagan**, **1 O'rganilmoqda** (og'irligi 0.5), **2 Ishonchli** (1.0). Progress = og'irliklar yig'indisi / subskill soni. Eski 5 holatli format (v1) avtomatik v2 ga o'tkaziladi.

#### S9.2. Takrorlash (SRS, Leitner)

Intervyu bahosi (`rateIq`):

| Baho | Natija |
|---|---|
| Bilmadim (0) | box = 1, ertaga qaytadi; "o'zlashtirilgan"dan chiqadi |
| Qisman (1) | box saqlanadi (≥1), interval yarmiga |
| Bildim (2) | box +1 (kamida 2); box ≥ 3 bo'lsa — "o'zlashtirilgan" |

Intervallar (`SRS_DAYS`): `[0, 1, 3, 7, 14, 30]` kun. Bog'liq subskill holati avtomatik yangilanadi: biror savol baholansa → "O'rganilmoqda"; barcha savollari box ≥ 3 bo'lsa → "Ishonchli".

"Bugungi navbat" (`iqPickToday`): avval sanasi kelgan savollar, keyin yangilari. Yangilar orasida avval o'rganilayotgan subskill'larniki va past darajadagilar keladi. Standart — 5 ta, "Yana 5 ta" bilan ko'payadi.

#### S9.3. `localStorage` kalitlari (`KEYS`)

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

#### S9.4. Lokal hisoblar

- IndexedDB bazasi `lsm_accounts`: `users` (email, salt, hash, iterations, createdAt) va `data` (har hisobning progress, savollar, saqlanganlar, test natijalari, SRS, tarix).
- Parol: PBKDF2-SHA256, 150 000 iteratsiya, tasodifiy salt.
- Foydalanuvchi kalitlari (`USER_KEYS`) o'zgarganda 300 ms kechikish bilan hisobga yoziladi. Sahifa yopilganda yoki yashirilganda ham yoziladi.
- Admin (`ADMIN_EMAIL`) profilda "Profillar" bo'limini ko'radi: boshqa lokal hisoblar ro'yxati va o'chirish.
- Hisobsiz faqat landing va login ochiladi.

---

### S10. Yangi kontent qo'shish

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

### S11. Ishlash va unumdorlik

| Bosqich | Vaqt (`file://`, Chrome) |
|---|---|
| Landing'ning birinchi chizilishi | ~0.5 s (faqat 85 ta skill fayli kutiladi) |
| 623 ta dars fonda yuklanishi | birinchi chizilishdan keyin, foydalanuvchini kutdirmaydi |

- Darslar kechiktirib yuklanadi (`loadLessons()`): boshlanishdan ~3.6 MB chiqarilgan (avval render ~3.1 s edi).
- Yo'l xaritasidagi oqim (`buildRoadmapFlow`) bekat masofalarini yo'l chizilayotganda formula bilan hisoblaydi (avval `getPointAtLength` bilan ~4 s ketardi).
- CSS'dan ishlatilmaydigan `qz-*`/`iq-*` stillari va `@keyframes`'lar olib tashlangan (3629 → 2079 qator).

---

# 8. ILOVALAR: etalon fayllar (aynan ko'chiriladi)

Quyidagi uch fayl etalon loyihadan **bitta belgisigacha** olingan. Ular `~~~~~~~~` bilan o'ralgan: shu chiziqlar fayl tarkibiga kirmaydi. Fayl ichidagi ``` belgilari kodning o'zi.

## 8.A. `index.html` (140 qator)

~~~~~~~~html
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stack Map</title>
  <meta name="description" content="Stack Map: Senior PHP / Laravel dasturchi uchun texnologiyalar xaritasi, skillar, intervyu savollari va progress tracker." />
  <meta name="theme-color" content="#0B1120" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%2322C55E'/%3E%3Cg fill='none' stroke='%23052E16' stroke-width='2.4' stroke-linecap='round'%3E%3Ccircle cx='10' cy='22' r='3'/%3E%3Ccircle cx='22' cy='10' r='3'/%3E%3Cpath d='M13 22h6.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H19'/%3E%3C/g%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/app.css" />
  <script>
    /* Apply theme before first paint to avoid a flash. */
    (function () {
      var t = null;
      try { t = localStorage.getItem("lsm:theme"); } catch (e) {}
      if (!t) t = window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      document.documentElement.dataset.theme = t;
    })();
  </script>
</head>
<body>
  <a class="skip-link" href="#view">Asosiy kontentga o'tish</a>

  <!-- Icon sprite (Lucide-style, 24px grid) -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <symbol id="i-logo" viewBox="0 0 24 24"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></symbol>
      <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></symbol>
      <symbol id="i-moon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
      <symbol id="i-more" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></symbol>
      <symbol id="i-chev-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
      <symbol id="i-chev-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
      <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7M19 12H5"/></symbol>
      <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
      <symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></symbol>
      <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/></symbol>
      <symbol id="i-upload" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/></symbol>
      <symbol id="i-trash" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></symbol>
      <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></symbol>
      <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></symbol>
      <symbol id="i-alert" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/></symbol>
      <symbol id="i-home" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></symbol>
      <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
      <symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M10.7 5.1A10.5 10.5 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-2.6 3.4M6.6 6.6A16.6 16.6 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20"/></symbol>
      <symbol id="i-enter" viewBox="0 0 24 24"><path d="M9 10 4 15l5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></symbol>
      <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></symbol>
      <symbol id="i-list-checks" viewBox="0 0 24 24"><path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8"/></symbol>
      <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/><path d="M19 3v4M17 5h4"/></symbol>
      <symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></symbol>
      <symbol id="i-expand" viewBox="0 0 24 24"><path d="m7 15 5 5 5-5M7 9l5-5 5 5"/></symbol>
      <symbol id="i-collapse" viewBox="0 0 24 24"><path d="m7 20 5-5 5 5M7 4l5 5 5-5"/></symbol>
      <!-- group icons -->
      <symbol id="i-code" viewBox="0 0 24 24"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></symbol>
      <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></symbol>
      <symbol id="i-database" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></symbol>
      <symbol id="i-plug" viewBox="0 0 24 24"><path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/></symbol>
      <symbol id="i-key" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/></symbol>
      <symbol id="i-flask" viewBox="0 0 24 24"><path d="M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M5.52 16h12.96"/></symbol>
      <symbol id="i-branch" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M6 9v6M18 9a9 9 0 0 1-9 9"/></symbol>
      <symbol id="i-server" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></symbol>
      <symbol id="i-rocket" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></symbol>
      <symbol id="i-queue" viewBox="0 0 24 24"><path d="M3 5h18M3 12h12M3 19h8"/><path d="m16 16 3 3-3 3M19 12v7"/></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
      <symbol id="i-gauge" viewBox="0 0 24 24"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></symbol>
      <symbol id="i-bug" viewBox="0 0 24 24"><path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/></symbol>
      <symbol id="i-boxes" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></symbol>
      <symbol id="i-cloud" viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
      <symbol id="i-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></symbol>
      <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
      <symbol id="i-reset" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></symbol>
    </defs>
  </svg>

  <header class="topbar">
    <button class="icon-btn menu-btn" id="menu-btn" aria-label="Menyuni ochish" aria-controls="sidebar" aria-expanded="false">
      <svg class="ic"><use href="#i-menu"/></svg>
    </button>
    <a class="brand" href="#/" aria-label="Bosh sahifa">
      <span class="brand-mark"><svg class="ic"><use href="#i-logo"/></svg></span>
      <span class="brand-name">Stack Map</span>
    </a>
    <nav class="primary-nav" aria-label="Asosiy bo'limlar">
      <a href="#/stacks" data-nav="stacks"><svg class="ic"><use href="#i-boxes"/></svg><span class="pn-full">Stacklar</span><span class="pn-short">Stacklar</span></a>
      <a href="#/interview" data-nav="interview"><svg class="ic"><use href="#i-help"/></svg><span class="pn-full">Intervyu savollari</span><span class="pn-short">Intervyu</span></a>
      <a href="#/quiz" data-nav="quiz"><svg class="ic"><use href="#i-sparkles"/></svg><span class="pn-full">Texnik testlar</span><span class="pn-short">Testlar</span></a>
    </nav>
    <div class="topbar-spacer"></div>
    <a class="btn btn-primary btn-sm top-login" href="#/login">Kirish</a>
    <button class="icon-btn theme-btn" id="theme-btn" aria-label="Mavzuni almashtirish">
      <svg class="ic ic-sun"><use href="#i-sun"/></svg>
      <svg class="ic ic-moon"><use href="#i-moon"/></svg>
    </button>
    <a class="profile-btn" id="profile-btn" href="#/profile" aria-label="Profil" title="Profil"><span id="profile-initial">?</span></a>
  </header>

  <div class="shell">
    <nav class="sidebar" id="sidebar" aria-label="Skill'lar"></nav>
    <div class="scrim" id="scrim"></div>
    <main class="main">
      <div class="view" id="view" tabindex="-1">
        <div class="loading"><div class="spinner"></div>Ma'lumotlar yuklanmoqda…</div>
      </div>
    </main>
  </div>

  <!-- Command palette -->
  <div class="palette" id="palette" role="dialog" aria-modal="true" aria-label="Qidiruv">
    <div class="palette-box">
      <div class="palette-input">
        <svg class="ic ic-lg"><use href="#i-search"/></svg>
        <input id="palette-input" type="search" placeholder="Masalan: N+1, Sanctum, EXPLAIN, idempotency…" autocomplete="off" spellcheck="false"
               role="combobox" aria-expanded="true" aria-controls="palette-results" aria-autocomplete="list" />
        <kbd>Esc</kbd>
      </div>
      <div class="palette-results" id="palette-results" role="listbox"></div>
      <div class="palette-foot">
        <span><kbd>↑</kbd><kbd>↓</kbd> tanlash</span>
        <span><kbd>Enter</kbd> ochish</span>
        <span><kbd>Esc</kbd> yopish</span>
      </div>
    </div>
  </div>

  <div class="toast" id="toast" role="status" aria-live="polite"><svg class="ic"><use href="#i-check"/></svg><span></span></div>

  <script src="data/manifest.js"></script>
  <script src="data/interview-questions.js"></script>
  <script src="data/interview-tests.js"></script>
  <script src="assets/js/app.js"></script>
</body>
</html>
~~~~~~~~

## 8.B. `assets/css/app.css` (2078 qator)

~~~~~~~~css
/* ==========================================================================
   Laravel Skill Map — design tokens
   Dark (default) + light. Semantic tokens only; components never use raw hex.
   ========================================================================== */
:root {
  --bg:            #0B1120;
  --bg-elev:       #0E1628;
  --surface:       #111A2E;
  --surface-2:     #17223A;
  --surface-3:     #1E2A45;
  --border:        #22304C;
  --border-strong: #3A4A6B;
  --text:          #F1F5F9;
  --text-2:        #A9B6CA;
  --text-3:        #7E8EA8;
  --accent:        #22C55E;
  --accent-text:   #4ADE80;
  --accent-soft:   rgba(34, 197, 94, .12);
  --accent-ring:   rgba(74, 222, 128, .55);
  --on-accent:     #052E16;
  --danger:        #F87171;
  --danger-soft:   rgba(248, 113, 113, .12);
  --code-bg:       #0A1222;
  --overlay:       rgba(2, 6, 18, .66);
  --shadow-lg:     0 24px 60px -12px rgba(0, 0, 0, .6), 0 0 0 1px var(--border);
  --glow:          radial-gradient(60% 80% at 20% 0%, rgba(34, 197, 94, .14), transparent 70%),
                   radial-gradient(50% 70% at 90% 10%, rgba(96, 165, 250, .10), transparent 70%);
  --grid-line:     rgba(148, 163, 184, .055);
  --grid-major:    rgba(148, 163, 184, .11);
  --glass:         rgba(17, 26, 46, .78);
  --glass-2:       rgba(23, 34, 58, .72);

  /* status scale */
  --st-0: #64748B;  --st-0-soft: rgba(100, 116, 139, .16);
  --st-1: #60A5FA;  --st-1-soft: rgba(96, 165, 250, .14);
  --st-2: #FBBF24;  --st-2-soft: rgba(251, 191, 36, .14);
  --st-3: #4ADE80;  --st-3-soft: rgba(74, 222, 128, .14);
  --st-4: #C084FC;  --st-4-soft: rgba(192, 132, 252, .16);

  --font:  "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono:  "JetBrains Mono", ui-monospace, "SFMono-Regular", Consolas, monospace;

  --r-sm: 6px; --r: 10px; --r-lg: 14px; --r-xl: 20px;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px;

  --topbar-h: 60px;
  --sidebar-w: 300px;
  --ease: cubic-bezier(.2, .7, .2, 1);
  --t-fast: 140ms; --t: 220ms;

  color-scheme: dark;
}

:root[data-theme="light"] {
  --bg:            #F7F9FC;
  --bg-elev:       #FFFFFF;
  --surface:       #FFFFFF;
  --surface-2:     #F1F5F9;
  --surface-3:     #E7EDF5;
  --border:        #E2E8F0;
  --border-strong: #CBD5E1;
  --text:          #0F172A;
  --text-2:        #334155;
  --text-3:        #5B6B82;
  --accent:        #15803D;
  --accent-text:   #166534;
  --accent-soft:   rgba(22, 163, 74, .10);
  --accent-ring:   rgba(22, 163, 74, .45);
  --on-accent:     #FFFFFF;
  --danger:        #DC2626;
  --danger-soft:   rgba(220, 38, 38, .08);
  --code-bg:       #F1F5F9;
  --overlay:       rgba(15, 23, 42, .38);
  --shadow-lg:     0 24px 60px -16px rgba(15, 23, 42, .25), 0 0 0 1px var(--border);
  --glow:          radial-gradient(60% 80% at 20% 0%, rgba(22, 163, 74, .10), transparent 70%),
                   radial-gradient(50% 70% at 90% 10%, rgba(37, 99, 235, .07), transparent 70%);
  --grid-line:     rgba(15, 23, 42, .045);
  --grid-major:    rgba(15, 23, 42, .09);
  --glass:         rgba(255, 255, 255, .84);
  --glass-2:       rgba(241, 245, 249, .8);

  --st-0: #94A3B8;  --st-0-soft: rgba(100, 116, 139, .12);
  --st-1: #2563EB;  --st-1-soft: rgba(37, 99, 235, .10);
  --st-2: #B45309;  --st-2-soft: rgba(217, 119, 6, .12);
  --st-3: #15803D;  --st-3-soft: rgba(22, 163, 74, .11);
  --st-4: #7E22CE;  --st-4-soft: rgba(147, 51, 234, .10);

  color-scheme: light;
}

/* ==========================================================================
   Base
   ========================================================================== */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scroll-padding-top: calc(var(--topbar-h) + 16px); }
body {
  margin: 0;
  font: 400 16px/1.6 var(--font);
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
h1, h2, h3, h4 { margin: 0; line-height: 1.2; letter-spacing: -.015em; text-wrap: balance; }
p { margin: 0; text-wrap: pretty; }
a { color: inherit; text-decoration: none; }
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; background: none; border: 0; padding: 0; }
svg { flex-shrink: 0; }
code, kbd, pre { font-family: var(--mono); }
::selection { background: var(--accent-soft); color: var(--text); }

:focus-visible { outline: 2px solid var(--accent-ring); outline-offset: 2px; border-radius: var(--r-sm); }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
.skip-link {
  position: fixed; left: 16px; top: -60px; z-index: 200;
  padding: 10px 14px; border-radius: var(--r); background: var(--accent); color: var(--on-accent); font-weight: 600;
}
.skip-link:focus { top: 12px; }

.ic { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ic-sm { width: 15px; height: 15px; }
.ic-lg { width: 22px; height: 22px; }

kbd {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 6px;
  font-size: 12px; font-weight: 500; color: var(--text-2);
  background: var(--surface-2); border: 1px solid var(--border); border-bottom-width: 2px; border-radius: 5px;
}

/* ==========================================================================
   Top bar
   ========================================================================== */
.topbar {
  position: sticky; top: 0; z-index: 50;
  height: var(--topbar-h);
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 0 var(--sp-5);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  border-bottom: 1px solid var(--border);
}
.brand { display: flex; align-items: center; gap: 10px; font-weight: 600; white-space: nowrap; min-width: 0; }
.brand-mark {
  display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px;
  color: var(--on-accent); background: linear-gradient(135deg, var(--accent), #10B981);
  box-shadow: 0 0 0 1px rgba(255,255,255,.08) inset, 0 6px 18px -6px var(--accent);
}
.brand-mark svg { width: 18px; height: 18px; }
.brand-name { font-size: 15px; letter-spacing: -.01em; }
.brand-name small { display: block; font: 500 12px/1.2 var(--mono); color: var(--text-3); letter-spacing: 0; }

.topbar-spacer { flex: 1; }

/* Asosiy navigatsiya: desktop'da topbar ichida tab, tor ekranda pastki tab bar */
.primary-nav { display: flex; flex-shrink: 0; align-self: stretch; gap: 2px; margin-left: var(--sp-4); }
.topbar .search-trigger { min-width: 0; flex-shrink: 1; }
.topbar .search-trigger span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.primary-nav a {
  position: relative;
  display: flex; align-items: center; gap: 8px; padding: 0 12px;
  font-size: 14px; font-weight: 500; color: var(--text-2); white-space: nowrap;
  transition: color var(--t-fast);
}
.primary-nav a .ic { color: var(--text-3); transition: color var(--t-fast); }
.primary-nav a::after {
  content: ""; position: absolute; left: 12px; right: 12px; bottom: -1px; height: 2px;
  border-radius: 2px 2px 0 0; background: transparent; transition: background var(--t-fast);
}
.primary-nav a:hover { color: var(--text); }
.primary-nav a:hover::after { background: var(--border-strong); }
.primary-nav a[aria-current="page"] { color: var(--text); }
.primary-nav a[aria-current="page"] .ic { color: var(--accent-text); }
.primary-nav a[aria-current="page"]::after { background: var(--accent); }
.primary-nav a:focus-visible { outline-offset: -8px; }
.primary-nav .pn-short { display: none; }

@media (max-width: 1366px) {
  .primary-nav a .ic { display: none; }
  .topbar .search-trigger { width: clamp(200px, 20vw, 320px); }
}
@media (max-width: 1240px) {
  .topbar .search-trigger { width: 40px; padding: 0; justify-content: center; border-color: transparent; background: transparent; }
  .topbar .search-trigger span, .topbar .search-trigger .kbds { display: none; }
}
@media (max-width: 1100px) {
  body { padding-bottom: calc(64px + env(safe-area-inset-bottom)); }
  /* backdrop-filter fixed bolalar uchun containing block yaratadi — pastki bar topbar'ga qamalib qolmasin */
  .topbar { backdrop-filter: none; -webkit-backdrop-filter: none; background: color-mix(in srgb, var(--bg) 96%, transparent); }
  .primary-nav {
    position: fixed; z-index: 60; left: 0; right: 0; bottom: 0; margin: 0; gap: 0;
    height: calc(64px + env(safe-area-inset-bottom)); padding: 0 var(--sp-2) env(safe-area-inset-bottom);
    background: color-mix(in srgb, var(--bg-elev) 88%, transparent);
    backdrop-filter: saturate(1.4) blur(14px);
    -webkit-backdrop-filter: saturate(1.4) blur(14px);
    border-top: 1px solid var(--border);
  }
  .primary-nav a { flex: 1; flex-direction: column; justify-content: center; gap: 4px; padding: 0 4px; font-size: 12px; min-width: 0; }
  .primary-nav a .ic { display: block; }
  .primary-nav a::after { top: -1px; bottom: auto; left: 30%; right: 30%; border-radius: 0 0 2px 2px; }
  .primary-nav a:hover::after { background: transparent; }
  .primary-nav a[aria-current="page"] { color: var(--accent-text); }
  .primary-nav a[aria-current="page"]::after { background: var(--accent); }
  .primary-nav .pn-full { display: none; }
  .primary-nav .pn-short { display: block; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  body .toast { bottom: calc(88px + env(safe-area-inset-bottom)); }
}

.search-trigger {
  display: flex; align-items: center; gap: 10px;
  width: min(420px, 40vw); height: 40px; padding: 0 8px 0 12px;
  color: var(--text-3); background: var(--surface); border: 1px solid var(--border); border-radius: var(--r);
  transition: border-color var(--t-fast), background var(--t-fast);
}
.search-trigger:hover { border-color: var(--border-strong); color: var(--text-2); }
.search-trigger span { flex: 1; text-align: left; font-size: 14px; }
.search-trigger .kbds { display: flex; gap: 4px; }

.icon-btn {
  display: inline-grid; place-items: center; width: 40px; height: 40px;
  color: var(--text-2); border-radius: var(--r); border: 1px solid transparent;
  transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
}
.icon-btn:hover { background: var(--surface-2); color: var(--text); }
.icon-btn[aria-expanded="true"] { background: var(--surface-2); color: var(--text); border-color: var(--border); }
.menu-btn { display: none; }

.theme-btn .ic-moon { display: none; }
:root[data-theme="light"] .theme-btn .ic-sun { display: none; }
:root[data-theme="light"] .theme-btn .ic-moon { display: block; }

/* dropdown */
.menu-wrap { position: relative; }
.dropdown {
  position: absolute; right: 0; top: calc(100% + 8px); z-index: 60;
  min-width: 240px; padding: 6px;
  background: var(--bg-elev); border-radius: var(--r-lg); box-shadow: var(--shadow-lg);
  opacity: 0; transform: translateY(-4px) scale(.98); transform-origin: top right;
  pointer-events: none; visibility: hidden;
  transition: opacity var(--t-fast) var(--ease), transform var(--t-fast) var(--ease), visibility var(--t-fast);
}
.dropdown.open { opacity: 1; transform: none; pointer-events: auto; visibility: visible; }
.dropdown button, .dropdown label {
  display: flex; align-items: center; gap: 10px; width: 100%;
  min-height: 40px; padding: 8px 10px; border-radius: 8px; font-size: 14px; color: var(--text-2); cursor: pointer;
}
.dropdown button:hover, .dropdown label:hover { background: var(--surface-2); color: var(--text); }
.dropdown .danger { color: var(--danger); }
.dropdown .danger:hover { background: var(--danger-soft); color: var(--danger); }
.dropdown hr { border: 0; border-top: 1px solid var(--border); margin: 6px 4px; }

/* ==========================================================================
   Shell
   ========================================================================== */
.shell { display: grid; grid-template-columns: var(--sidebar-w) minmax(0, 1fr); min-height: calc(100vh - var(--topbar-h)); }

.sidebar {
  position: sticky; top: var(--topbar-h);
  height: calc(100vh - var(--topbar-h));
  overflow-y: auto; overscroll-behavior: contain;
  padding: var(--sp-4) var(--sp-3) var(--sp-7);
  border-right: 1px solid var(--border);
  background: var(--bg);
  scrollbar-width: thin; scrollbar-color: var(--border) transparent;
}
.sidebar::-webkit-scrollbar { width: 8px; }
.sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; border: 2px solid var(--bg); }

/* Sidebar faqat "Skillar" bo'limida */
body:not([data-section="skills"]) .shell { grid-template-columns: minmax(0, 1fr); }
body:not([data-section="skills"]) .sidebar,
body:not([data-section="skills"]) .scrim { display: none; }

.side-group { margin-top: var(--sp-2); }
.side-group:first-child { margin-top: 0; }
.side-group-btn {
  display: flex; align-items: center; gap: 8px; width: 100%;
  min-height: 36px; padding: 6px 10px; border-radius: 8px;
  font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--text-3);
}
.side-group-btn:hover { color: var(--text); }
.side-group-btn .ic { width: 15px; height: 15px; }
.side-group-btn .chev { margin-left: auto; transition: transform var(--t) var(--ease); }
.side-group[data-collapsed="true"] .chev { transform: rotate(-90deg); }
.side-group[data-collapsed="true"] .side-list { display: none; }
.side-group-btn .count { font: 500 12px var(--mono); letter-spacing: 0; color: var(--text-3); }

.side-list { list-style: none; margin: 2px 0 0; padding: 0 0 0 6px; }
.side-link {
  position: relative;
  display: grid; grid-template-columns: 26px minmax(0, 1fr) auto; align-items: center; gap: 6px;
  min-height: 34px; padding: 5px 8px 5px 10px; border-radius: 8px;
  font-size: 14px; color: var(--text-2);
  transition: background var(--t-fast), color var(--t-fast);
}
.side-link::before {
  content: ""; position: absolute; left: -2px; top: 8px; bottom: 8px; width: 2px; border-radius: 2px; background: transparent;
}
.side-link:hover { background: var(--surface-2); color: var(--text); }
.side-link[aria-current="page"] { background: var(--surface-2); color: var(--text); font-weight: 500; }
.side-link[aria-current="page"]::before { background: var(--accent); }
.side-link .num { font: 500 12px var(--mono); color: var(--text-3); }
.side-link .t { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.side-link .pct { font: 500 12px var(--mono); color: var(--text-3); }
.side-link .pct.done { color: var(--accent-text); }

.scrim { display: none; }

.main { min-width: 0; position: relative; }
.main::before {
  content: ""; position: absolute; inset: 0 0 auto; height: 520px; pointer-events: none; z-index: 0;
  background: var(--glow);
}
.main::after {
  content: ""; position: absolute; inset: 0 0 auto; height: 520px; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
}
.view { position: relative; z-index: 1; padding: var(--sp-7) var(--sp-7) var(--sp-8); max-width: 1240px; margin: 0 auto; }
.view:focus { outline: none; }

/* ==========================================================================
   Shared pieces
   ========================================================================== */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 0 18px; border-radius: var(--r);
  font-size: 15px; font-weight: 500;
  border: 1px solid var(--border); background: var(--surface); color: var(--text);
  transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
}
.btn:hover { border-color: var(--border-strong); background: var(--surface-2); }
.btn:active { transform: translateY(1px); }
.btn-primary { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 600; }
.btn-primary:hover { background: color-mix(in srgb, var(--accent) 88%, #fff); border-color: transparent; }
.btn-sm { min-height: 36px; padding: 0 12px; font-size: 14px; }

.bar { position: relative; height: 6px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
.bar > i {
  position: absolute; inset: 0 auto 0 0; border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), #34D399);
  transition: width 600ms var(--ease);
}
.bar.stacked { display: flex; }
.bar.stacked > i { position: static; border-radius: 0; transition: flex-basis 600ms var(--ease); }

.chip {
  display: inline-flex; align-items: center; gap: 6px;
  height: 24px; padding: 0 9px; border-radius: 99px;
  font: 500 12px/1 var(--font); white-space: nowrap;
  color: var(--text-2); background: var(--surface-2); border: 1px solid var(--border);
}
.chip.mono { font-family: var(--mono); font-size: 12px; }
.chip.core      { color: var(--accent-text); background: var(--accent-soft); border-color: transparent; }
.chip.important { color: var(--st-2); background: var(--st-2-soft); border-color: transparent; }
.chip.optional  { color: var(--text-3); }
.chip.level     { color: var(--st-1); background: var(--st-1-soft); border-color: transparent; }
.chip.missing   { color: var(--text-3); background: transparent; border-style: dashed; }

.st-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c, var(--st-0)); }
[data-st="0"] { --c: var(--st-0); --cs: var(--st-0-soft); }
[data-st="1"] { --c: var(--st-1); --cs: var(--st-1-soft); }
[data-st="2"] { --c: var(--st-3); --cs: var(--st-3-soft); }

.section-head { display: flex; align-items: end; justify-content: space-between; gap: var(--sp-4); margin: var(--sp-8) 0 var(--sp-5); }
.section-head h2 { font-size: 22px; font-weight: 600; }
.section-head p { color: var(--text-3); font-size: 14px; margin-top: 4px; }

.reveal { animation: reveal 420ms var(--ease) both; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

/* ==========================================================================
   Home
   ========================================================================== */
.hero { padding: var(--sp-5) 0 var(--sp-2); max-width: 860px; }
.hero h1 {
  margin-top: var(--sp-5);
  font-size: clamp(34px, 5vw, 56px); font-weight: 700; letter-spacing: -.035em; line-height: 1.04;
}.hero .lead { margin-top: var(--sp-4); font-size: 18px; color: var(--text-2); max-width: 640px; }
.status-legend { display: flex; flex-wrap: wrap; gap: var(--sp-2) var(--sp-4); margin-top: var(--sp-4); font-size: 13px; color: var(--text-3); }
.status-legend span { display: inline-flex; align-items: center; gap: 8px; }
.status-legend b { font: 500 12px var(--mono); color: var(--text-2); }.group-icon {
  display: grid; place-items: center; width: 40px; height: 40px; border-radius: 11px;
  color: var(--accent-text); background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
}
.focus-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--sp-3); }
.focus-item {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 14px 16px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface);
}
.focus-item:hover { border-color: var(--border-strong); }
.focus-item .st-dot { margin-top: 7px; }
.focus-item .t { font-size: 14px; font-weight: 500; }
.focus-item .s { font-size: 12px; color: var(--text-3); margin-top: 2px; }

.note {
  display: flex; gap: var(--sp-4); margin-top: var(--sp-8);
  padding: var(--sp-5); border-radius: var(--r-lg);
  background: linear-gradient(135deg, var(--accent-soft), transparent 60%), var(--surface);
  border: 1px solid var(--border);
}
.note .group-icon { flex-shrink: 0; }
.note h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
.note p { color: var(--text-2); font-size: 15px; }

/* ==========================================================================
   Skill page
   ========================================================================== */
.crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 13px; color: var(--text-3); }
.crumbs a:hover { color: var(--text); }
.crumbs .sep { opacity: .5; }

.skill-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: var(--sp-7); align-items: start; }

.skill-head { margin-top: var(--sp-4); }
.skill-head .idx { font: 600 13px var(--mono); color: var(--accent-text); letter-spacing: .04em; }
.skill-head h1 { margin-top: 8px; font-size: clamp(30px, 4vw, 44px); font-weight: 700; letter-spacing: -.03em; }
.skill-head .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--sp-4); }

.desc-block { margin-top: var(--sp-5); }

/* the reserved, visible slot for not-yet-written descriptions */
.placeholder {
  display: flex; gap: 14px; align-items: flex-start;
  padding: 16px 18px; border-radius: var(--r);
  border: 1px dashed var(--border-strong);
  background: repeating-linear-gradient(-45deg, transparent 0 10px, color-mix(in srgb, var(--surface-2) 55%, transparent) 10px 20px);
  color: var(--text-3); font-size: 14px;
}
.placeholder .ic { margin-top: 2px; color: var(--text-3); }
.placeholder b { display: block; color: var(--text-2); font-weight: 500; margin-bottom: 2px; }
.placeholder code { font-size: 12px; color: var(--text-2); background: var(--surface-2); padding: 1px 6px; border-radius: 4px; word-break: break-all; }

/* markdown */
.md { color: var(--text-2); font-size: 16px; line-height: 1.7; }
.md > * + * { margin-top: 14px; }
.md h3, .md h4 { color: var(--text); font-size: 17px; font-weight: 600; margin-top: 22px; }
.md h4 { font-size: 15px; }
.md strong { color: var(--text); font-weight: 600; }
.md a { color: var(--accent-text); text-decoration: underline; text-underline-offset: 3px; }
.md ul, .md ol { padding-left: 22px; margin-bottom: 0; }
.md li + li { margin-top: 6px; }
.md li::marker { color: var(--text-3); }
.md blockquote { margin: 0; padding: 10px 16px; border-left: 3px solid var(--accent); background: var(--accent-soft); border-radius: 0 var(--r-sm) var(--r-sm) 0; color: var(--text); }
.md :not(pre) > code, .inline-code {
  font-size: .88em; padding: 2px 6px; border-radius: 5px;
  color: var(--text); background: var(--surface-3); border: 1px solid var(--border);
}
.md pre {
  position: relative; margin: 16px 0 0; padding: 16px 18px; overflow-x: auto;
  font-size: 13.5px; line-height: 1.65; color: var(--text);
  background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--r);
  tab-size: 4;
}
.md pre[data-lang]::before {
  content: attr(data-lang); position: absolute; top: 8px; right: 12px;
  font: 500 12px var(--mono); color: var(--text-3); text-transform: uppercase; letter-spacing: .06em;
}
.md table { width: 100%; border-collapse: collapse; font-size: 14px; display: block; overflow-x: auto; }
.md th, .md td { text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--border); }
.md th { color: var(--text); font-weight: 600; }
.tok-k { color: #C084FC; } .tok-s { color: #4ADE80; } .tok-c { color: var(--text-3); font-style: italic; } .tok-v { color: #60A5FA; } .tok-n { color: #FBBF24; }
:root[data-theme="light"] .tok-k { color: #7E22CE; }
:root[data-theme="light"] .tok-s { color: #15803D; }
:root[data-theme="light"] .tok-v { color: #1D4ED8; }
:root[data-theme="light"] .tok-n { color: #B45309; }

/* toolbar above the subskill list */
.toolbar {
  position: sticky; top: var(--topbar-h); z-index: 5;
  display: flex; flex-wrap: wrap; align-items: center; gap: var(--sp-2);
  margin: var(--sp-7) 0 var(--sp-3); padding: 10px 0;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.toolbar h2 { font-size: 18px; font-weight: 600; margin-right: auto; display: flex; align-items: center; gap: 10px; }
.toolbar h2 .chip { font-family: var(--mono); }
.seg { display: inline-flex; padding: 3px; border-radius: 10px; background: var(--surface); border: 1px solid var(--border); }
.seg button {
  display: inline-flex; align-items: center; gap: 6px;
  min-height: 32px; padding: 0 10px; border-radius: 7px; font-size: 13px; color: var(--text-3);
  transition: background var(--t-fast), color var(--t-fast);
}
.seg button:hover { color: var(--text); }
.seg button[aria-pressed="true"] { background: var(--surface-3); color: var(--text); }

/* subskill list */
.subs { list-style: none; margin: 0; padding: 0; border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--surface); overflow: hidden; }
.sub { border-top: 1px solid var(--border); scroll-margin-top: calc(var(--topbar-h) + 72px); }
.sub:first-child { border-top: 0; }
.sub[hidden] { display: none; }
.sub-row {
  display: grid; grid-template-columns: 44px minmax(0, 1fr) auto; align-items: center;
  min-height: 56px; padding: 0 12px 0 6px;
  transition: background var(--t-fast);
}
.sub-row:hover { background: color-mix(in srgb, var(--surface-2) 70%, transparent); }
.sub.open .sub-row { background: var(--surface-2); }

.st-toggle {
  display: grid; place-items: center; width: 44px; height: 44px; border-radius: 10px;
}
.st-toggle:hover .ring { transform: scale(1.12); }
.ring {
  display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid var(--c); background: var(--cs);
  transition: transform var(--t-fast) var(--ease), background var(--t-fast), border-color var(--t-fast);
}
.ring svg { width: 12px; height: 12px; stroke: var(--c); stroke-width: 3; fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transition: opacity var(--t-fast); }
[data-st="2"] .ring { background: var(--c); }
[data-st="2"] .ring svg { stroke: var(--bg); opacity: 1; }
[data-st="1"] .ring { background: conic-gradient(var(--c) 0 50%, var(--cs) 0); }

.sub-main {
  display: flex; align-items: center; gap: 12px; min-width: 0; min-height: 56px; padding: 8px 4px; text-align: left;
}
.sub-main .sid { font: 500 12px var(--mono); color: var(--text-3); min-width: 38px; }
.sub-main .t { font-size: 15px; font-weight: 500; color: var(--text); min-width: 0; }
.sub-main .t code { font-size: .86em; padding: 1px 5px; border-radius: 4px; background: var(--surface-3); border: 1px solid var(--border); }
.sub-side { display: flex; align-items: center; gap: 8px; }
.sub-side .st-name { font-size: 12px; font-weight: 500; color: var(--c); min-width: 76px; text-align: right; }
.sub-side .chev { color: var(--text-3); transition: transform var(--t) var(--ease); }
.sub.open .sub-side .chev { transform: rotate(180deg); }
.sub-side .chips { display: flex; gap: 6px; }

.sub-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--t) var(--ease); }
.sub.open .sub-panel { grid-template-rows: 1fr; }
.sub-panel > div { overflow: hidden; }
.sub-body { padding: 6px 24px 24px 56px; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--sp-5); }
.sub-body > *, .desc-block, .skill-layout > * { min-width: 0; }

.field-label { font: 600 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--text-3); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }

.status-picker { display: flex; flex-wrap: wrap; gap: 6px; }
.status-picker button {
  display: inline-flex; align-items: center; gap: 8px;
  min-height: 36px; padding: 0 12px; border-radius: 99px;
  font-size: 13px; font-weight: 500; color: var(--text-2);
  border: 1px solid var(--border); background: var(--surface);
  transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
}
.status-picker button:hover { border-color: var(--c); color: var(--text); }
.status-picker button[aria-checked="true"] { background: var(--cs); border-color: var(--c); color: var(--c); }

.task {
  padding: 14px 16px; border-radius: var(--r); background: var(--surface); border: 1px solid var(--border);
}
.checklist { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.checklist li { display: flex; gap: 10px; align-items: flex-start; font-size: 15px; color: var(--text-2); }
.checklist li .ic { color: var(--accent-text); margin-top: 3px; width: 16px; height: 16px; }
.prereq { display: flex; flex-wrap: wrap; gap: 6px; }
.prereq a.chip:hover { border-color: var(--border-strong); color: var(--text); }

.sub-foot { display: flex; flex-wrap: wrap; gap: 8px; }

.empty {
  padding: var(--sp-7) var(--sp-5); text-align: center; color: var(--text-3);
}
.empty .ic { width: 28px; height: 28px; margin-bottom: 8px; }

/* right rail */
.rail { position: sticky; top: calc(var(--topbar-h) + 24px); display: grid; gap: var(--sp-4); margin-top: 52px; }
.card { padding: var(--sp-5); border-radius: var(--r-lg); background: var(--surface); border: 1px solid var(--border); }
.card h3 { font-size: 13px; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: .06em; font-family: var(--mono); }
.ring-chart { display: flex; align-items: center; gap: var(--sp-4); margin-top: var(--sp-4); }
.ring-chart svg { width: 84px; height: 84px; transform: rotate(-90deg); }
.ring-chart circle { fill: none; stroke-width: 9; }
.ring-chart .track { stroke: var(--surface-3); }
.ring-chart .val { stroke: var(--accent); stroke-linecap: round; transition: stroke-dashoffset 700ms var(--ease); }
.ring-chart .big { font: 700 28px/1 var(--mono); letter-spacing: -.03em; }
.ring-chart .small { font-size: 13px; color: var(--text-3); margin-top: 4px; }
.breakdown { list-style: none; margin: var(--sp-4) 0 0; padding: 0; display: grid; gap: 8px; }
.breakdown li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-2); }
.breakdown li b { margin-left: auto; font: 500 13px var(--mono); color: var(--text); }
.card .bar { margin-top: var(--sp-4); }

.pager { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); margin-top: var(--sp-7); }
.pager a {
  display: flex; flex-direction: column; gap: 4px; padding: 16px 18px; border-radius: var(--r-lg);
  border: 1px solid var(--border); background: var(--surface);
  transition: border-color var(--t-fast);
}
.pager a:hover { border-color: var(--accent); }
.pager .dir { font: 500 12px var(--mono); color: var(--text-3); display: flex; align-items: center; gap: 6px; }
.pager .t { font-weight: 600; }
.pager .next { text-align: right; align-items: flex-end; grid-column: 2; }

/* ==========================================================================
   Command palette
   ========================================================================== */
.palette {
  position: fixed; inset: 0; z-index: 100; display: none;
  align-items: flex-start; justify-content: center; padding: 12vh 16px 16px;
  background: var(--overlay); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
}
.palette.open { display: flex; animation: fade 160ms var(--ease); }
@keyframes fade { from { opacity: 0; } }
.palette-box {
  width: min(680px, 100%); max-height: 70vh; display: flex; flex-direction: column;
  background: var(--bg-elev); border-radius: var(--r-xl); box-shadow: var(--shadow-lg); overflow: hidden;
  animation: pop 200ms var(--ease);
}
@keyframes pop { from { opacity: 0; transform: translateY(-8px) scale(.985); } }
.palette-input { display: flex; align-items: center; gap: 12px; padding: 0 16px; border-bottom: 1px solid var(--border); }
.palette-input .ic { color: var(--text-3); }
.palette-input input { flex: 1; height: 60px; border: 0; outline: 0; background: transparent; font-size: 17px; }
.palette-input input::placeholder { color: var(--text-3); }
.palette-results { overflow-y: auto; padding: 8px; }
.palette-group { font: 600 12px var(--mono); text-transform: uppercase; letter-spacing: .08em; color: var(--text-3); padding: 10px 10px 6px; }
.palette-item {
  display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; gap: 10px; align-items: center;
  width: 100%; min-height: 48px; padding: 8px 10px; border-radius: 10px; text-align: left;
}
.palette-item .num { font: 500 12px var(--mono); color: var(--text-3); }
.palette-item .t { font-size: 15px; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.palette-item .s { font-size: 12px; color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.palette-item .go { color: var(--text-3); opacity: 0; }
.palette-item[aria-selected="true"] { background: var(--surface-2); }
.palette-item[aria-selected="true"] .go { opacity: 1; }
.palette-item mark { background: var(--accent-soft); color: var(--accent-text); border-radius: 3px; padding: 0 1px; }
.palette-foot { display: flex; gap: var(--sp-4); padding: 10px 16px; border-top: 1px solid var(--border); font-size: 12px; color: var(--text-3); }
.palette-foot span { display: inline-flex; align-items: center; gap: 6px; }

/* ==========================================================================
   Toast + load error
   ========================================================================== */
.toast {
  position: fixed; left: 50%; bottom: 24px; z-index: 120;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-radius: var(--r); font-size: 14px;
  background: var(--bg-elev); box-shadow: var(--shadow-lg);
  transform: translate(-50%, 20px); opacity: 0; pointer-events: none;
  transition: transform var(--t) var(--ease), opacity var(--t);
}
.toast.show { transform: translate(-50%, 0); opacity: 1; }
.toast .ic { color: var(--accent-text); }

.load-error {
  margin: var(--sp-5) 0; padding: var(--sp-4) var(--sp-5); border-radius: var(--r-lg);
  border: 1px solid color-mix(in srgb, var(--danger) 40%, transparent); background: var(--danger-soft);
  color: var(--text); font-size: 14px;
}
.load-error h3 { font-size: 15px; color: var(--danger); margin-bottom: 6px; display: flex; gap: 8px; align-items: center; }
.load-error ul { margin: 8px 0 0; padding-left: 20px; font-family: var(--mono); font-size: 13px; }

.loading { display: grid; place-items: center; min-height: 50vh; color: var(--text-3); gap: 12px; font-size: 14px; }
.spinner { width: 28px; height: 28px; border-radius: 50%; border: 3px solid var(--surface-3); border-top-color: var(--accent); animation: spin 800ms linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ==========================================================================
   Responsive
   ========================================================================== */
@media (max-width: 1280px) {
  .skill-layout { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .rail { position: static; margin-top: var(--sp-6); grid-template-columns: 1fr 1fr; order: -1; }
  .rail { order: 0; }
}
@media (max-width: 1024px) {
  :root { --sidebar-w: 300px; }
  .shell { grid-template-columns: minmax(0, 1fr); }
  .menu-btn { display: inline-grid; }
  body:not([data-section="skills"]) .menu-btn { display: none; }
  .sidebar {
    position: fixed; z-index: 70; left: 0; top: 0; height: 100dvh; width: min(var(--sidebar-w), 86vw);
    background: var(--bg-elev); padding-top: var(--sp-5);
    transform: translateX(-102%); transition: transform var(--t) var(--ease);
    box-shadow: var(--shadow-lg);
  }
  body.nav-open .sidebar { transform: none; }
  .scrim {
    display: block; position: fixed; inset: 0; z-index: 65; background: var(--overlay);
    opacity: 0; pointer-events: none; transition: opacity var(--t);
  }
  body.nav-open .scrim { opacity: 1; pointer-events: auto; }
  .view { padding: var(--sp-6) var(--sp-5) var(--sp-8); }
  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stat:nth-child(3) { border-left: 0; }
  .stat:nth-child(n+3) { border-top: 1px solid var(--border); }
}
@media (max-width: 720px) {
  .topbar { padding: 0 var(--sp-2) 0 var(--sp-2); gap: 4px; }
  .brand-name small { display: none; }
  .search-trigger { width: 40px; padding: 0; justify-content: center; border-color: transparent; background: transparent; }
  .search-trigger span, .search-trigger .kbds { display: none; }
  .view { padding: var(--sp-5) var(--sp-4) var(--sp-8); }
  .hero .lead { font-size: 16px; }
  .groups { grid-template-columns: minmax(0, 1fr); }
  .stat { padding: var(--sp-4); }
  .stat .value { font-size: 24px; }
  .rail { grid-template-columns: minmax(0, 1fr); }
  .sub-row { padding-right: 8px; }
  .sub-main { flex-direction: column; align-items: flex-start; justify-content: center; gap: 0; }
  .sub-side .chips, .sub-side .st-name { display: none; }
  .sub-body { padding: 4px 16px 20px 16px; }
  .toolbar .seg { width: 100%; flex-wrap: wrap; }
  .pager { grid-template-columns: minmax(0, 1fr); }
  .pager .next { grid-column: 1; }
  .note { flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; scroll-behavior: auto !important; }
}

@media print {
  .topbar, .sidebar, .primary-nav, .toolbar, .rail, .pager, .st-toggle, .sub-foot, .status-picker-wrap { display: none !important; }
  body { padding-bottom: 0; }
  .shell { display: block; }
  .sub-panel { grid-template-rows: 1fr !important; }
  body { background: #fff; color: #000; }
}

/* ==========================================================================
   Redesign v2 — katakli fon ustida "chizma" uslubidagi shisha panellar
   ========================================================================== */
.stats, .group-card, .card, .subs, .note, .focus-item, .pager a,
.hero-search, .task, .seg, .placeholder, .panel {
  background-color: var(--glass);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.panel { position: relative; border: 1px solid var(--border); border-radius: 8px; }
/* burchak belgilar (chizmadagi kabi) */
.panel::before {
  content: ""; position: absolute; inset: -1px; pointer-events: none; border-radius: inherit;
  background:
    linear-gradient(var(--accent), var(--accent)) left top / 16px 2px no-repeat,
    linear-gradient(var(--accent), var(--accent)) left top / 2px 16px no-repeat,
    linear-gradient(var(--accent), var(--accent)) right bottom / 16px 2px no-repeat,
    linear-gradient(var(--accent), var(--accent)) right bottom / 2px 16px no-repeat;
  opacity: .9;
}
.kicker { display: block; font: 600 12px/1 var(--mono); letter-spacing: .08em; color: var(--accent-text); margin-bottom: 8px; }
.mono-dim { font: 500 12px var(--mono); color: var(--text-3); }

/* hero */
.hero-grid {
  display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(300px, .65fr);
  gap: var(--sp-7); align-items: center; padding-top: var(--sp-3);
}
.hero-grid .hero { padding: 0; max-width: none; }
.hero-grid .hero h1 { font-size: clamp(34px, 4.6vw, 60px); }.hero-panel { padding: var(--sp-5); }
.panel-head { display: flex; align-items: baseline; justify-content: space-between; }
.panel-head .kicker { margin: 0; }
.hero-ring { position: relative; width: 168px; height: 168px; margin: var(--sp-5) auto var(--sp-4); }
.hero-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hero-ring circle { fill: none; stroke-width: 10; }
.hero-ring .track { stroke: var(--surface-3); }
.hero-ring .val { stroke: var(--accent); stroke-linecap: round; transition: stroke-dashoffset 900ms var(--ease); filter: drop-shadow(0 0 6px var(--accent-soft)); }
.hero-ring-label { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
.hero-ring-label b { font: 700 40px/1 var(--mono); letter-spacing: -.04em; }
.hero-ring-label b small { font-size: 18px; color: var(--text-3); }
.hero-ring-label span { font-size: 12px; color: var(--text-3); margin-top: 6px; }.mini-bar { grid-column: 1 / -1; height: 4px; background: var(--surface-3); border-radius: 99px; overflow: hidden; }
.mini-bar i { display: block; height: 100%; background: var(--c); border-radius: inherit; transition: width 600ms var(--ease); }

/* stats */
/* bo'limlar */
.section-head h2 { font-size: 24px; letter-spacing: -.02em; }
/* skill sahifasi va boshqa kartalar */
.subs, .card, .note, .pager a, .focus-item { border-radius: 8px; }
.skill-head h1 { font-size: clamp(32px, 4.4vw, 52px); }
.toolbar { background: color-mix(in srgb, var(--bg) 80%, transparent); }

@media (max-width: 1024px) {
  .hero-grid { grid-template-columns: minmax(0, 1fr); gap: var(--sp-6); }
  .hero-panel { max-width: 460px; }
}

code, kbd, pre { font-variant-ligatures: none; }
.hero-ring.is-zero .val { opacity: 0; }

/* ==========================================================================
   Career Levels (Junior, Middle, Senior, Lead)
   ========================================================================== */

.levels-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--sp-4); margin-bottom: var(--sp-6);
}
/* Level filter on skill page */
.level-filter-wrap {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: var(--sp-4);
  padding: 10px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r);
}
.level-filter-label { font: 500 12px/1 var(--mono); color: var(--text-3); text-transform: uppercase; letter-spacing: .04em; margin-right: 4px; }
.level-seg {
  display: inline-flex; gap: 4px; padding: 3px; background: var(--surface-2);
  border: 1px solid var(--border); border-radius: var(--r-sm);
}
.level-seg button {
  min-height: 28px; padding: 0 10px; border: none; border-radius: calc(var(--r-sm) - 2px);
  background: transparent; color: var(--text-2); font: 500 12px var(--font); cursor: pointer;
  transition: background var(--t-fast), color var(--t-fast);
}
.level-seg button:hover { color: var(--text); }
.level-seg button[aria-pressed="true"] { background: var(--surface); color: var(--text); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,.2); }

/* Roadmap view */
@media (max-width: 768px) {
  }

/* Filter & Control bar */
.iq-controls {
  display: flex; flex-direction: column; gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-5); background: var(--surface);
  border: 1px solid var(--border); border-radius: var(--r-lg);
  margin-bottom: var(--sp-6);
  box-shadow: 0 4px 20px -10px rgba(0,0,0,.3);
}

/* Haqiqiy bosiladigan, .iq-pill {
  display: inline-flex; align-items: center; gap: 7px;
  min-height: 34px; padding: 6px 13px; border-radius: 99px;
  background: var(--surface-2); border: 1px solid var(--border);
  color: var(--text-2); font: 500 12.5px/1 var(--font); cursor: pointer;
  user-select: none; outline: none;
  transition: all var(--t-fast) var(--ease);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.iq-pill:hover {
  background: var(--surface-3); border-color: var(--border-strong);
  color: var(--text); transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
}

.iq-pill:active {
  transform: translateY(0) scale(0.97);
}

.iq-pill:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.iq-pill[aria-pressed="true"] {
  background: var(--accent-soft); color: var(--accent-text);
  border-color: var(--accent); font-weight: 600;
  box-shadow: 0 0 0 1px var(--accent), 0 3px 10px color-mix(in srgb, var(--accent) 22%, transparent);
}

.iq-pill .count-chip {
  display: inline-flex; align-items: center; justify-content: center;
  font: 600 12px/1 var(--mono); min-width: 18px; padding: 2px 6px; border-radius: 99px;
  background: var(--surface); color: var(--text-3);
  border: 1px solid var(--border);
  transition: all var(--t-fast);
}

.iq-pill:hover .count-chip {
  color: var(--text); border-color: var(--border-strong);
}

.iq-pill[aria-pressed="true"] .count-chip {
  background: var(--accent); color: var(--on-accent);
  border-color: transparent; font-weight: 700;
}

.iq-card {
  border: 1px solid var(--border); background: var(--surface); border-radius: var(--r-lg);
  overflow: hidden; transition: border-color var(--t-fast), box-shadow var(--t-fast), transform var(--t-fast);
  position: relative;
}
.iq-card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 10px 28px -12px rgba(0,0,0,.5);
}
.iq-card:hover::before { width: 6px; }
.iq-card.open {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}

.iq-card[data-level="junior"] { --level-color: var(--accent); }
.iq-card[data-level="middle"] { --level-color: var(--st-1); }
.iq-card[data-level="senior"] { --level-color: var(--st-4); }
.iq-card[data-level="lead"]   { --level-color: var(--st-2); }

.iq-badge {
  font: 700 12px/1 var(--mono); letter-spacing: .06em; text-transform: uppercase;
  padding: 4px 8px; border-radius: 6px; flex-shrink: 0; margin-top: 2px;
}
.iq-badge.junior { background: var(--accent-soft); color: var(--accent-text); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); }
.iq-badge.middle { background: var(--st-1-soft); color: var(--st-1); border: 1px solid color-mix(in srgb, var(--st-1) 30%, transparent); }
.iq-badge.senior { background: var(--st-4-soft); color: var(--st-4); border: 1px solid color-mix(in srgb, var(--st-4) 30%, transparent); }
.iq-badge.lead   { background: var(--st-2-soft); color: var(--st-2); border: 1px solid color-mix(in srgb, var(--st-2) 30%, transparent); }

.iq-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-3); flex-wrap: wrap; }
.iq-meta .tag-cat { font: 500 12px var(--mono); color: var(--text-2); background: var(--surface-2); padding: 2px 7px; border-radius: 4px; }

.iq-answer-label {
  font: 700 12px/1 var(--mono); text-transform: uppercase; letter-spacing: .08em;
  color: var(--text-3); margin: 18px 0 10px; display: flex; align-items: center; gap: 6px;
}
.iq-tip-box {
  margin-top: 16px; padding: 16px 18px; border-radius: var(--r);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, var(--surface)), var(--surface));
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
}
.iq-tip-box h4 {
  font: 700 12px/1 var(--mono); text-transform: uppercase; letter-spacing: .06em;
  color: var(--accent-text); margin: 0 0 8px; display: flex; align-items: center; gap: 6px;
}
.iq-tip-box p { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--text-2); }

/* ==========================================================================
   Tech Stack Section (Home page)
   ========================================================================== */
/* ==========================================================================
   Bookmarks, Cheatsheet & Mock Interview Simulator
   ========================================================================== */

/* Bookmark Button */
.iq-bookmark-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 99px;
  background: transparent; border: 1px solid var(--border);
  color: var(--text-3); cursor: pointer; transition: all var(--t-fast);
  padding: 0;
}
.iq-bookmark-btn:hover {
  color: var(--st-2); border-color: var(--st-2); background: color-mix(in srgb, var(--st-2) 12%, transparent);
}
.iq-bookmark-btn.active {
  color: var(--st-2); border-color: var(--st-2); background: color-mix(in srgb, var(--st-2) 18%, transparent);
}
.iq-bookmark-btn.active svg { fill: var(--st-2); }

/* Mock Interview Simulator Modal */
.mock-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: var(--sp-4); animation: reveal 200ms ease;
}
.mock-modal {
  width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-xl); padding: var(--sp-6);
  box-shadow: 0 24px 60px -12px rgba(0,0,0,.6); position: relative;
}
.mock-head {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding-bottom: var(--sp-4); border-bottom: 1px solid var(--border);
  margin-bottom: var(--sp-5);
}
.mock-head h2 { font-size: 18px; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 8px; }
.mock-close-btn {
  background: transparent; border: none; color: var(--text-3);
  cursor: pointer; padding: 6px; border-radius: 99px; font-size: 18px;
}
.mock-close-btn:hover { color: var(--text); background: var(--surface-2); }

.mock-timer-wrap {
  margin-bottom: var(--sp-4);
}
.mock-timer-head {
  display: flex; align-items: center; justify-content: space-between;
  font: 600 12px var(--mono); color: var(--text-2); margin-bottom: 6px;
}
.mock-timer-track {
  height: 6px; border-radius: 99px; background: var(--surface-2); overflow: hidden;
}
.mock-timer-fill {
  height: 100%; width: 100%; background: var(--accent); transition: width 1s linear;
}
.mock-timer-fill.warn { background: var(--st-2); }
.mock-timer-fill.danger { background: var(--danger); }

.mock-q-box {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--r-lg); padding: 20px; margin-bottom: var(--sp-5);
}
.mock-q-meta {
  display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 12px;
}
.mock-q-title {
  font-size: 17px; font-weight: 600; line-height: 1.45; color: var(--text); margin: 0;
}

.mock-self-test-prompt {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px dashed var(--accent); border-radius: var(--r);
  padding: 16px; text-align: center; margin-bottom: var(--sp-4);
}
.mock-self-test-prompt p { margin: 0 0 12px; font-size: 13.5px; color: var(--text-2); }

.mock-eval-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: var(--sp-4);
}
.mock-eval-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  padding: 12px; border-radius: var(--r); border: 1px solid var(--border);
  background: var(--surface-2); cursor: pointer; transition: all var(--t-fast);
  font: 600 12.5px var(--font); color: var(--text);
}
.mock-eval-btn.good:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent-text); }
.mock-eval-btn.mid:hover { background: color-mix(in srgb, var(--st-2) 15%, transparent); border-color: var(--st-2); color: var(--st-2); }
.mock-eval-btn.bad:hover { background: color-mix(in srgb, var(--danger) 15%, transparent); border-color: var(--danger); color: var(--danger); }

/* Mock Result Scorecard */
.mock-scorecard {
  text-align: center; padding: var(--sp-4) 0;
}
.mock-score-ring {
  width: 120px; height: 120px; margin: 0 auto 16px; border-radius: 50%;
  display: grid; place-items: center; background: var(--surface-2);
  border: 4px solid var(--accent); font: 700 32px var(--mono); color: var(--accent-text);
}
.mock-scorecard h3 { font-size: 22px; margin: 0 0 8px; color: var(--text); }
.mock-scorecard p { font-size: 14px; color: var(--text-2); max-width: 440px; margin: 0 auto 20px; }
.mock-review-list {
  text-align: left; margin: 20px 0; max-height: 220px; overflow-y: auto;
  border-top: 1px solid var(--border); padding-top: 12px;
}
.mock-review-item {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 8px 10px; border-radius: var(--r-sm); font-size: 13px;
}
.mock-review-item:nth-child(even) { background: var(--surface-2); }

/* Print mode (Cheatsheet export) */
@media print {
  .topbar, .sidebar, .iq-hero, .iq-stats-grid, .iq-controls, .iq-card-foot, .iq-chev { display: none !important; }
  .main, .view, .shell { margin: 0 !important; padding: 0 !important; width: 100% !important; }
  .iq-card { page-break-inside: avoid; border: 1px solid #ccc !important; color: #000 !important; margin-bottom: 12px !important; }
  .iq-card-body { display: block !important; color: #111 !important; }
}

/* ==========================================================================
   INTERVIEW QUIZ & TESTS SECTION (A, B, C, D)
   ========================================================================== */
.iq-quiz-section {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 2px dashed var(--border);
  position: relative;
}

/* Category Filter Pills */
.iq-quiz-cats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

/* ==========================================================================
   QUIZ ENHANCEMENTS: LOBBY SETUP {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 22px 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

/* Micro-animations */

.level-badge-senior { background: color-mix(in srgb, var(--st-4) 15%, transparent); color: var(--st-4); border: 1px solid rgba(168,85,247,0.3); }
.level-badge-middle { background: color-mix(in srgb, var(--st-1) 15%, transparent); color: var(--st-1); border: 1px solid rgba(59,130,246,0.3); }
.level-badge-junior { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); border: 1px solid rgba(34,197,94,0.3); }

/* Animations for quiz options */

/* ==========================================================================
   Home — "bugun" ekrani
   ========================================================================== */
.today {
  display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(280px, .5fr);
  gap: var(--sp-7); align-items: start;
}
.today h1 { font-size: clamp(30px, 3.6vw, 44px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin-bottom: var(--sp-5); }
.btn-lg { min-height: 52px; padding: 0 22px; font-size: 16px; }
.today .section-head { margin: var(--sp-7) 0 var(--sp-4); }
.today .section-head h2 { font-size: 20px; }
.today .section-head .seg { flex-shrink: 0; }

.next-list { display: grid; gap: var(--sp-2); }
.next-item {
  display: grid; grid-template-columns: 44px minmax(0, 1fr) auto; align-items: center; gap: var(--sp-3);
  min-height: 56px; padding: 10px 16px; border-radius: var(--r);
  background: var(--glass); border: 1px solid var(--border);
  transition: border-color var(--t-fast), background var(--t-fast);
}
.next-item:hover { border-color: var(--border-strong); background: var(--surface-2); }
.next-item .sid { font: 500 12px var(--mono); color: var(--text-3); font-variant-numeric: tabular-nums; }
.next-item .nt { min-width: 0; }
.next-item .t { display: block; font-size: 15px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.next-item .s { display: block; font-size: 13px; color: var(--text-3); margin-top: 2px; }
.prio { font: 500 12px var(--mono); padding: 3px 8px; border-radius: 99px; background: var(--surface-2); color: var(--text-2); }
.prio[data-prio="core"] { background: var(--accent-soft); color: var(--accent-text); }
.prio[data-prio="optional"] { color: var(--text-3); }
.prio:empty { display: none; }
.next-empty { color: var(--text-2); padding: var(--sp-4) 0; }

.panel-title { font-size: 14px; font-weight: 600; }
.today .hero-panel { position: sticky; top: calc(var(--topbar-h) + var(--sp-5)); }
.level-bars { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.level-bars a, .level-bars .lvl-row {
  display: grid; grid-template-columns: 1fr auto; gap: 6px 8px; align-items: center;
  margin: 0 -10px; padding: 8px 10px; border-radius: 8px; font-size: 14px; color: var(--text-2);
}
.level-bars a:hover { background: var(--surface-2); color: var(--text); }
.level-bars b { font: 600 13px var(--mono); color: var(--text); font-variant-numeric: tabular-nums; }
.level-bars .mini-bar i { background: var(--lvl-color); }

@media (max-width: 1024px) {
  .today { grid-template-columns: minmax(0, 1fr); gap: var(--sp-6); }
  .today .hero-panel { position: static; max-width: none; }
  .today .hero-ring { width: 128px; height: 128px; margin: var(--sp-3) auto; }
}
@media (max-width: 720px) {
  .next-item { grid-template-columns: 36px minmax(0, 1fr); }
  .next-item .prio { display: none; }
  .today .section-head { flex-wrap: wrap; align-items: flex-start; }
  .today .section-head .seg { width: 100%; overflow-x: auto; }
}

/* ==========================================================================
   Sahifa sarlavhasi (Intervyu, Testlar) va kichik yordamchilar
   ========================================================================== */
.page-head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--sp-6); margin: var(--sp-4) 0 var(--sp-6); }
.page-head h1 { font-size: clamp(28px, 3.2vw, 38px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; }
.page-sub { margin-top: var(--sp-2); color: var(--text-2); font-size: 15px; max-width: 60ch; }
.page-progress { min-width: min(260px, 100%); }
.page-progress-num { display: flex; align-items: baseline; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-2); font-size: 13px; color: var(--text-3); }
.page-progress-num b { font: 600 22px/1 var(--mono); color: var(--text); font-variant-numeric: tabular-nums; }
.page-progress-num b small { font-size: 14px; color: var(--text-3); font-weight: 500; }
.eval-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 8px; background: var(--text-3); }
.eval-dot.ok { background: var(--accent); }
.eval-dot.mid { background: var(--st-2); }
.eval-dot.bad { background: var(--danger); }
@media (max-width: 720px) {
  .page-head { flex-direction: column; align-items: stretch; gap: var(--sp-4); }
}

.mini-st { display: inline-flex; align-items: center; gap: 6px; color: var(--c, var(--text-3)); font-weight: 500; }

.status-hints { margin-top: var(--sp-3); font-size: 13px; color: var(--text-3); line-height: 1.5; }
.status-hints b { color: var(--text-2); font-weight: 600; }

/* ==========================================================================
   Home — dashboard
   ========================================================================== */
.dash-head { margin: var(--sp-2) 0 var(--sp-6); }
.dash-head h1 { font-size: clamp(30px, 3.4vw, 42px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; }
.dash-head p { margin-top: var(--sp-3); max-width: 64ch; color: var(--text-2); font-size: 16px; }

.dash { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--sp-4); }
.dash-card { padding: var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); min-width: 0; }
.dash-progress { grid-column: span 7; }
.dash-continue { grid-column: span 5; display: flex; flex-direction: column; }
.dash-map { grid-column: span 12; }
.dash-label { font: 600 12px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--text-3); }

.dash-big { display: flex; align-items: baseline; gap: var(--sp-4); margin: var(--sp-3) 0 var(--sp-4); }
.dash-big b { font: 700 64px/1 var(--mono); letter-spacing: -.05em; font-variant-numeric: tabular-nums; }
.dash-big b small { font-size: 28px; color: var(--text-3); letter-spacing: 0; }
.dash-big span { color: var(--text-2); font-size: 14px; }

.stack-bar { display: flex; height: 10px; border-radius: var(--r-sm); overflow: hidden; background: var(--surface-3); }
.stack-bar i { display: block; height: 100%; background: var(--c); }
.stack-bar i + i { box-shadow: -2px 0 0 var(--bg); }
.stack-legend { list-style: none; margin: var(--sp-3) 0 var(--sp-5); padding: 0; display: flex; flex-wrap: wrap; gap: var(--sp-2) var(--sp-5); font-size: 13px; color: var(--text-2); }
.stack-legend li { display: inline-flex; align-items: center; gap: 8px; }
.stack-legend b { font: 600 13px var(--mono); color: var(--text); }
.dash-progress .level-bars { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--sp-4); }
.dash-progress .level-bars a, .level-bars .lvl-row { margin: 0; padding: 0; }
.dash-progress .level-bars a:hover { background: none; }

.dash-continue h2 { margin-top: var(--sp-3); font-size: 26px; font-weight: 700; letter-spacing: -.02em; }
.dash-sub { margin: 6px 0 var(--sp-4); font-size: 14px; color: var(--text-3); }
.dash-continue .btn { align-self: flex-start; margin-top: var(--sp-4); }
.dash-practice { margin-top: auto; padding-top: var(--sp-5); display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
.dash-practice a { display: grid; gap: 4px; padding: var(--sp-3) var(--sp-4); border: 1px solid var(--border); border-radius: var(--r); transition: border-color var(--t-fast), background var(--t-fast); }
.dash-practice a:hover { border-color: var(--border-strong); background: var(--surface-2); }
.dash-practice span { font-size: 13px; color: var(--text-3); }
.dash-practice b { font: 600 22px var(--mono); letter-spacing: -.02em; }
.dash-practice b small { font-size: 12px; color: var(--text-3); font-weight: 500; letter-spacing: 0; }

.dash-map-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4); margin-bottom: var(--sp-5); }
.map-legend { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-3); }
.map-scale { display: block; width: 96px; height: 8px; border-radius: var(--r-sm); background: linear-gradient(90deg, var(--surface-3), var(--accent)); }
.skill-map { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: var(--sp-5) var(--sp-5); }
.map-group-title { font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.map-cells { display: flex; flex-wrap: wrap; gap: 5px; }
.map-cell {
  width: 26px; height: 26px; border-radius: 6px;
  background: color-mix(in srgb, var(--accent) var(--p), var(--surface-3));
  border: 1px solid color-mix(in srgb, var(--accent) calc(var(--p) * .6), var(--border));
  transition: transform var(--t-fast) var(--ease), border-color var(--t-fast);
}
.map-cell:hover { transform: translateY(-2px); border-color: var(--text); }
.map-cell span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

@media (max-width: 1024px) {
  .dash-progress, .dash-continue,   .dash-progress .level-bars { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px) {
  .dash-card { padding: var(--sp-4); }
  .dash-big b { font-size: 48px; }
  .dash-practice { grid-template-columns: 1fr; }
}
.dash-progress { display: flex; flex-direction: column; }
.dash-progress .level-bars { margin-top: auto; padding-top: var(--sp-4); border-top: 1px solid var(--border); }

.dash-tiles { grid-column: span 12; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--sp-4); }
.tile {
  position: relative; display: grid; grid-template-columns: 1fr auto; align-content: start; gap: 4px var(--sp-3);
  padding: var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border);
  transition: border-color var(--t-fast), transform var(--t) var(--ease);
}
.tile:hover { border-color: var(--accent); transform: translateY(-2px); }
.tile-ic { grid-column: 1; grid-row: 1; display: grid; place-items: center; width: 36px; height: 36px; border-radius: var(--r); color: var(--accent-text); background: var(--accent-soft); }
.tile b { grid-column: 2; grid-row: 1; font: 700 36px/1 var(--mono); letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.tile h3 { grid-column: 1 / -1; margin-top: var(--sp-3); font-size: 16px; font-weight: 600; }
.tile p { grid-column: 1 / -1; font-size: 13px; color: var(--text-3); }
.dash-tip { margin-top: var(--sp-5); font-size: 13px; color: var(--text-3); display: flex; flex-wrap: wrap; align-items: center; gap: 4px; }
.dash-tip kbd { margin: 0; }
@media (max-width: 1024px) { .dash-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .dash-tiles { grid-template-columns: minmax(0, 1fr); } }

.side-search {
  display: flex; align-items: center; gap: 10px; width: 100%; height: 40px; padding: 0 8px 0 12px; margin-bottom: var(--sp-3);
  color: var(--text-3); background: var(--surface); border: 1px solid var(--border); border-radius: var(--r);
  transition: border-color var(--t-fast), color var(--t-fast);
}
.side-search:hover { border-color: var(--border-strong); color: var(--text-2); }
.side-search span { flex: 1; min-width: 0; text-align: left; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.side-search kbd { margin: 0; }

/* ==========================================================================
   Kirish / ro'yxatdan o'tish
   ========================================================================== */
body[data-auth="out"] .primary-nav { display: none; }
body[data-auth="out"] { padding-bottom: 0; }
.menu-user { padding: 8px 10px; display: grid; gap: 2px; }
.menu-user-label { font: 600 12px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--text-3); }
.menu-user b { font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }

.auth-card { width: min(440px, 100%); display: grid; gap: var(--sp-3); padding: var(--sp-6); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); }
.auth-card .brand-mark { width: 44px; height: 44px; }
.auth-card h1 { font-size: 28px; font-weight: 700; letter-spacing: -.02em; margin-top: var(--sp-2); }
.auth-tabs { display: grid; grid-template-columns: 1fr 1fr; padding: 3px; margin-top: var(--sp-2); border-radius: var(--r); background: var(--surface); border: 1px solid var(--border); }
.auth-tabs button { min-height: 38px; border-radius: var(--r-sm); font-size: 14px; font-weight: 500; color: var(--text-3); }
.auth-tabs button:hover { color: var(--text); }
.auth-tabs button[aria-selected="true"] { background: var(--surface-3); color: var(--text); }
#auth-form { display: grid; gap: var(--sp-4); margin-top: var(--sp-2); }
.field { display: grid; gap: 6px; font-size: 13px; font-weight: 500; color: var(--text-2); }
.field input {
  height: 46px; padding: 0 14px; font-size: 16px; color: var(--text);
  background: var(--surface); border: 1px solid var(--border-strong); border-radius: var(--r);
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}
.field input::placeholder { color: var(--text-3); }
.field input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.auth-error { min-height: 20px; margin: -4px 0 0; font-size: 14px; color: var(--danger); }
.auth-submit { width: 100%; justify-content: center; }
.auth-submit:disabled { opacity: .6; cursor: progress; }

/* kirish sahifasi: chapda forma, o'ngda sayt haqida roadmap */
.auth-split { display: grid; grid-template-columns: minmax(340px, 440px) minmax(0, 1fr); gap: var(--sp-8); align-items: start; padding: var(--sp-5) 0; }
.auth-left { position: sticky; top: calc(var(--topbar-h) + var(--sp-5)); }
.auth-left .auth-card { width: 100%; }

.auth-info h2 { font-size: clamp(26px, 2.6vw, 34px); font-weight: 700; letter-spacing: -.025em; line-height: 1.15; }
.auth-info-lead { margin-top: var(--sp-3); max-width: 56ch; color: var(--text-2); font-size: 16px; }
.auth-stats { list-style: none; margin: var(--sp-5) 0 var(--sp-7); padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--glass); overflow: hidden; }
.auth-stats li { padding: var(--sp-4); display: grid; gap: 2px; border-left: 1px solid var(--border); }
.auth-stats li:first-child { border-left: 0; }
.auth-stats b { font: 700 26px/1.1 var(--mono); letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.auth-stats span { font-size: 13px; color: var(--text-3); }

.roadmap { --rm-gap: 44px; --T: 16s; position: relative; display: grid; gap: var(--rm-gap); }
.rm-row { position: relative; list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.rm-row[data-dir="rtl"] { direction: rtl; }
.rm-row[data-dir="rtl"] > * { direction: ltr; }

.rm-node { position: relative; z-index: 1; animation: rm-in 480ms var(--ease) both; animation-delay: calc(var(--i) * 45ms); }
.rm-link { display: grid; justify-items: center; gap: 4px; text-align: center; padding: 0 4px; border-radius: var(--r); color: inherit; }
.rm-link:focus-visible { outline: 2px solid var(--accent-ring); outline-offset: 4px; }
.rm-ic {
  position: relative; display: grid; place-items: center; width: 60px; height: 60px; border-radius: 50%;
  color: var(--accent-text); background: var(--bg); border: 2px solid var(--accent);
  transition: transform var(--t) var(--ease), background var(--t-fast), color var(--t-fast);
}
.rm-ic .ic { width: 24px; height: 24px; }
.rm-ic em { position: absolute; right: -4px; top: -4px; min-width: 20px; height: 20px; padding: 0 4px; border-radius: 10px; display: grid; place-items: center; font: 600 12px var(--mono); font-style: normal; color: var(--text-2); background: var(--surface-2); border: 1px solid var(--border-strong); }
.rm-node:not(.rm-static):hover .rm-ic { transform: translateY(-3px); background: var(--accent); color: var(--on-accent); }
.rm-node b { margin-top: 6px; font-size: 13px; font-weight: 600; line-height: 1.25; }
.rm-node small { font-size: 12px; color: var(--text-3); }
.rm-tag { position: absolute; top: -22px; font: 600 12px var(--mono); font-style: normal; color: var(--accent-text); white-space: nowrap; }
@keyframes rm-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

@media (max-width: 960px) {
  .auth-split { grid-template-columns: minmax(0, 1fr); gap: var(--sp-7); }
  .auth-left { position: static; }
  .auth-left .auth-card { margin: 0 auto; max-width: 480px; }
}
@media (max-width: 560px) {
  .auth-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .auth-stats li:nth-child(3) { border-left: 0; }
  .auth-stats li:nth-child(n+3) { border-top: 1px solid var(--border); }
  .rm-ic { width: 46px; height: 46px; }
  .rm-ic .ic { width: 20px; height: 20px; }
  .rm-row::before,   .rm-node b { font-size: 12px; }
}

.pw-wrap { position: relative; display: block; }
.pw-wrap input { width: 100%; padding-right: 48px; }
.pw-toggle { position: absolute; top: 0; right: 0; width: 46px; height: 46px; display: grid; place-items: center; color: var(--text-3); border-radius: var(--r); transition: color var(--t-fast); }
.pw-toggle:hover, .pw-toggle[aria-pressed="true"] { color: var(--accent-text); }
.pw-toggle:focus-visible { outline: 2px solid var(--accent-ring); outline-offset: -2px; }

/* ==========================================================================
   Yuqori panel: kirish tugmalari va profil
   ========================================================================== */
.top-login, .profile-btn { display: none; }
body[data-auth="out"] .top-login { display: inline-flex; }
body[data-auth="in"] .profile-btn { display: inline-grid; }
.top-login { margin-left: 2px; }
.profile-btn {
  place-items: center; width: 38px; height: 38px; border-radius: 50%; margin-left: 4px;
  font: 700 15px var(--font); color: var(--on-accent); background: var(--accent); border: 2px solid transparent;
  transition: box-shadow var(--t-fast), border-color var(--t-fast);
}
.profile-btn:hover { box-shadow: 0 0 0 3px var(--accent-soft); }
.profile-btn[aria-current="page"] { border-color: var(--text); }

/* kirish: markazda karta */
.auth { display: grid; place-items: center; min-height: calc(100vh - var(--topbar-h) - 140px); padding: var(--sp-6) 0; }
.auth-card { position: relative; }
.auth-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-3); width: fit-content; }
.auth-back:hover { color: var(--text); }

/* ==========================================================================
   Bosh sahifa (landing)
   ========================================================================== */
.lp-hero { padding: var(--sp-7) 0 var(--sp-5); max-width: 880px; }
.lp-hero h1 { font-size: clamp(36px, 5.4vw, 66px); font-weight: 800; letter-spacing: -.04em; line-height: 1.04; text-wrap: balance; }
.lp-hero h1 span { color: var(--accent-text); }
.lp-hero p { margin-top: var(--sp-5); max-width: 60ch; font-size: 18px; color: var(--text-2); line-height: 1.6; }
.lp-section { margin-top: var(--sp-8); }
.lp-head { max-width: 640px; margin-bottom: var(--sp-6); }
.lp-head h2 { font-size: clamp(24px, 2.6vw, 32px); font-weight: 700; letter-spacing: -.025em; }
.lp-head p { margin-top: var(--sp-2); color: var(--text-2); font-size: 16px; }
.lp-section .roadmap { max-width: 980px; }
.lp-hero + .dash { margin-top: var(--sp-6); }
.lp-final { margin-top: var(--sp-8); padding: var(--sp-7) var(--sp-6); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); text-align: center; display: grid; justify-items: center; gap: var(--sp-3); }
.lp-final h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 700; letter-spacing: -.025em; }
.lp-final p { color: var(--text-2); max-width: 46ch; margin-bottom: var(--sp-3); }

/* ==========================================================================
   Profil
   ========================================================================== */
.profile { max-width: 1040px; margin: 0 auto; }
.pf-head { display: flex; align-items: center; gap: var(--sp-5); padding: var(--sp-5) 0 var(--sp-6); }
.pf-avatar { display: grid; place-items: center; flex: none; width: 76px; height: 76px; border-radius: 50%; font: 800 32px var(--font); color: var(--on-accent); background: var(--accent); box-shadow: 0 0 0 6px var(--accent-soft); }
.pf-id { flex: 1; min-width: 0; }
.pf-id h1 { font-size: clamp(22px, 2.6vw, 30px); font-weight: 700; letter-spacing: -.02em; overflow-wrap: anywhere; }
.pf-id p { margin-top: 4px; font-size: 14px; color: var(--text-3); }
.pf-stats { list-style: none; margin: 0 0 var(--sp-6); padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--glass); overflow: hidden; }
.pf-stats li { padding: var(--sp-5); display: grid; gap: 4px; border-left: 1px solid var(--border); }
.pf-stats li:first-child { border-left: 0; }
.pf-stats b { font: 700 30px/1.1 var(--mono); letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.pf-stats b small { font-size: 15px; color: var(--text-3); font-weight: 500; letter-spacing: 0; }
.pf-stats span { font-size: 13px; color: var(--text-3); }
.pf-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--sp-4); align-items: start; }
.pf-card { padding: var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); display: grid; gap: var(--sp-4); }
.pf-card h2 { font-size: 18px; font-weight: 700; }
.pf-card form { display: grid; gap: var(--sp-4); }
.pf-card form .btn { justify-self: start; }
.pf-msg { margin: -4px 0 0; }
.pf-danger { border-color: color-mix(in srgb, var(--danger) 40%, var(--border)); }
.pf-danger h2 { color: var(--danger); }
.pf-danger p { color: var(--text-2); font-size: 15px; max-width: 60ch; }
.pf-danger form { max-width: 420px; }
.pf-del-btn { justify-self: start; color: var(--danger); border-color: color-mix(in srgb, var(--danger) 50%, var(--border)); }
.pf-del-btn:hover { background: var(--danger-soft); border-color: var(--danger); }
.pf-del-confirm { background: var(--danger); border-color: var(--danger); color: #fff; }
.pf-del-confirm:hover { background: color-mix(in srgb, var(--danger) 85%, #000); }
.pf-del-row { display: flex; flex-wrap: wrap; gap: var(--sp-3); }
[hidden] { display: none !important; }

@media (max-width: 860px) {
  .pf-grid { grid-template-columns: minmax(0, 1fr); }
  .pf-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .pf-stats li:nth-child(3) { border-left: 0; }
  .pf-stats li:nth-child(n+3) { border-top: 1px solid var(--border); }
}
@media (max-width: 560px) {
  .pf-head { flex-wrap: wrap; gap: var(--sp-4); }
  .pf-head .btn { width: 100%; justify-content: center; }
}

/* Roadmap: suv yo'li va yuguruvchi puls */
.rm-flow { position: absolute; left: 0; top: 0; z-index: 0; overflow: visible; pointer-events: none; }
.rm-flow path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.rm-bed { stroke: color-mix(in srgb, var(--accent) 9%, transparent); stroke-width: 14; }
.rm-track { stroke: var(--border-strong); stroke-width: 2; stroke-dasharray: 3 9; animation: rm-water 1.4s linear infinite; }
.rm-pulse {
  stroke: var(--accent-text); stroke-width: 3.5;
  filter: drop-shadow(0 0 6px var(--accent)) drop-shadow(0 0 14px color-mix(in srgb, var(--accent) 60%, transparent));
  stroke-dashoffset: var(--len); animation: rm-run var(--T) linear infinite;
}
.rm-ic { animation: rm-lit var(--T) linear infinite; animation-delay: calc(var(--t, 0) * var(--T) * .85); }
@keyframes rm-water { to { stroke-dashoffset: -12; } }
@keyframes rm-run {
  from { stroke-dashoffset: var(--len); }
  85%, to { stroke-dashoffset: calc(var(--L) * -1); }
}
@keyframes rm-lit {
  0% { background: var(--accent); color: var(--on-accent); transform: translateY(-3px) scale(1.06); box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent); }
  2.5% { background: var(--accent); color: var(--on-accent); transform: translateY(-3px) scale(1.06); box-shadow: 0 0 0 10px transparent, 0 0 22px color-mix(in srgb, var(--accent) 55%, transparent); }
  9% { background: var(--accent); color: var(--on-accent); transform: translateY(-3px) scale(1.06); box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 40%, transparent); }
  16% { background: var(--bg); color: var(--accent-text); transform: none; box-shadow: none; }
  100% { background: var(--bg); color: var(--accent-text); transform: none; box-shadow: none; }
}
.rm-node b { transition: color var(--t-fast); }
.rm-node:not(.rm-static):hover b { color: var(--accent-text); }
@media (prefers-reduced-motion: reduce) {
  .rm-pulse { display: none; }
  .rm-track { animation: none; }
  .rm-ic { animation: none; }
}

/* Texnologiyalar steki (minimal) */

/* Karusel */
.stk-marquee { display: grid; gap: var(--sp-3); margin: 0 calc(var(--sp-7) * -1); }
.stk-row {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}
.stk-track { list-style: none; margin: 0; padding: 0; display: flex; gap: var(--sp-3); width: max-content; animation: stk-slide 70s linear infinite; }
.stk-row:hover .stk-track, .stk-row:focus-within .stk-track { animation-play-state: paused; }
.stk-track > li { flex: none; }
@keyframes stk-slide { to { transform: translateX(calc(-50% - 6px)); } }
@media (max-width: 1024px) { .stk-marquee { margin: 0 calc(var(--sp-5) * -1); } }
@media (max-width: 720px) { .stk-marquee { margin: 0 calc(var(--sp-4) * -1); } }
@media (prefers-reduced-motion: reduce) {
  .stk-row { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .stk-track { animation: none; }
  .stk-clone { display: none; }
}

.stk { height: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: var(--sp-4); padding: var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); transition: border-color var(--t-fast), transform var(--t) var(--ease); }
.stk:hover { border-color: var(--accent); transform: translateY(-2px); }
.stk-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-4); }
.stk-ic { display: grid; place-items: center; width: 36px; height: 36px; border-radius: var(--r); color: var(--accent-text); background: var(--accent-soft); }
.stk-head em { font: 600 12px var(--mono); font-style: normal; padding: 3px 8px; border-radius: var(--r-sm); color: var(--accent-text); background: var(--accent-soft); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); white-space: nowrap; }
.stk h3 { font-size: 17px; font-weight: 600; }
.stk p { margin-top: 6px; font-size: 13px; line-height: 1.5; color: var(--text-3); }
.stk-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: var(--sp-4); }
.stk-tags span { font: 500 12px var(--mono); padding: 2px 8px; border-radius: var(--r-sm); color: var(--text-2); background: var(--surface-2); border: 1px solid var(--border); }
.stk-foot { display: flex; align-items: center; justify-content: space-between; padding-top: var(--sp-3); border-top: 1px solid var(--border); font-size: 13px; color: var(--text-3); }
.stk-foot b { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--accent-text); }

/* Global daraja filtri (sidebar) */
.side-levels { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; margin-bottom: var(--sp-3); }
.side-levels button { min-height: 32px; padding: 0 4px; border-radius: var(--r-sm); font-size: 12px; font-weight: 600; color: var(--text-3); background: var(--surface); border: 1px solid var(--border); transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast); }
.side-levels button:hover { color: var(--text); border-color: var(--border-strong); }
.side-levels button[aria-pressed="true"] { color: var(--on-accent); background: var(--lvl-color, var(--accent)); border-color: var(--lvl-color, var(--accent)); }
.level-seg button:disabled { cursor: not-allowed; }
.level-seg.is-global button:disabled { opacity: .55; }
.level-seg.is-global button[aria-pressed="true"]:disabled { opacity: .85; }

.iq-today-bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--sp-2) var(--sp-5); margin-bottom: var(--sp-4); padding: var(--sp-3) var(--sp-4); border: 1px solid var(--border); border-radius: var(--r); background: var(--glass); font-size: 14px; color: var(--text-2); }
.iq-today-bar b { font: 700 16px var(--mono); color: var(--text); margin-right: 4px; }
.iq-today-bar .btn { margin-left: auto; }

.iq-rate-wrap { display: flex; flex-wrap: wrap; align-items: center; gap: var(--sp-2) var(--sp-3); }
.iq-rate-label { font-size: 13px; color: var(--text-3); }
.iq-rate { display: inline-flex; padding: 3px; gap: 2px; border: 1px solid var(--border); border-radius: var(--r); background: var(--surface); }
.iq-rate button { min-height: 32px; padding: 0 12px; border-radius: var(--r-sm); font-size: 13px; font-weight: 600; color: var(--text-2); transition: background var(--t-fast), color var(--t-fast); }
.iq-rate button:hover { background: var(--surface-2); color: var(--text); }
.iq-rate button[data-r="0"][aria-pressed="true"] { background: var(--danger-soft); color: var(--danger); }
.iq-rate button[data-r="1"][aria-pressed="true"] { background: var(--st-2-soft); color: var(--st-2); }
.iq-rate button[data-r="2"][aria-pressed="true"] { background: var(--accent-soft); color: var(--accent-text); }
.iq-next { font-size: 12px; color: var(--text-3); }
@media (max-width: 720px) { .iq-today-bar .btn { margin-left: 0; width: 100%; justify-content: center; } }

/* Mock hisobot */
.mock-cats { list-style: none; margin: var(--sp-4) 0; padding: 0; display: grid; gap: 10px; text-align: left; }
.mock-cats li { display: grid; grid-template-columns: minmax(120px, 1.3fr) 2fr 44px; align-items: center; gap: var(--sp-3); font-size: 13px; color: var(--text-2); }
.mock-cats small { color: var(--text-3); margin-left: 4px; }
.mc-bar { height: 6px; border-radius: var(--r-sm); background: var(--surface-3); overflow: hidden; }
.mc-bar i { display: block; height: 100%; background: var(--accent); }
.mock-cats li.weak .mc-bar i { background: var(--st-2); }
.mock-cats li.weak b { color: var(--st-2); }
.mock-cats b { font: 600 13px var(--mono); text-align: right; color: var(--text); }
.mock-weak { max-width: none;  margin: var(--sp-3) 0; font-size: 14px; color: var(--text-2); text-align: left; }
.mock-study { display: inline-flex; align-items: center; gap: 4px; flex: none; font-size: 12px; font-weight: 600; color: var(--accent-text); padding: 4px 8px; border-radius: var(--r-sm); border: 1px solid var(--border); }
.mock-study:hover { border-color: var(--accent); }

.tag-type { font: 600 12px var(--font); padding: 2px 8px; border-radius: var(--r-sm); border: 1px solid var(--border-strong); color: var(--text-2); }
.tag-type[data-type="bug"] { color: var(--danger); border-color: color-mix(in srgb, var(--danger) 45%, var(--border)); }
.tag-type[data-type="scenario"] { color: var(--st-2); border-color: color-mix(in srgb, var(--st-2) 45%, var(--border)); }
.tag-type[data-type="behavioral"] { color: var(--st-4); border-color: color-mix(in srgb, var(--st-4) 45%, var(--border)); }

/* ==========================================================================
   Subskill sahifasi (dars)
   ========================================================================== */
.lesson-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: var(--sp-7); align-items: start; }
.lesson { min-width: 0; max-width: 780px; }
.lesson-head { margin: var(--sp-4) 0 var(--sp-5); }
.lesson-head .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: var(--sp-4); }
.lesson-head h1 { font-size: clamp(28px, 3.6vw, 42px); font-weight: 700; letter-spacing: -.03em; line-height: 1.12; }
.lesson-sec { margin-top: var(--sp-7); }
.lesson-sec > h2 { font-size: 22px; font-weight: 700; letter-spacing: -.02em; margin-bottom: var(--sp-4); padding-bottom: var(--sp-3); border-bottom: 1px solid var(--border); }
.lesson .md { font-size: 16.5px; line-height: 1.75; }
.lesson .md p { margin: 0 0 1em; }
.lesson-md h3, .lesson-md h4 { margin: 1.8em 0 .6em; font-size: 19px; letter-spacing: -.01em; }
.lesson-md h4 { font-size: 16px; }
.lesson-md ul, .lesson-md ol { margin: 0 0 1em; padding-left: 1.3em; }
.lesson-md li { margin: .35em 0; }

.code-card { margin: 0 0 var(--sp-5); border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--code-bg); overflow: hidden; }
.code-card figcaption { display: flex; align-items: center; gap: var(--sp-3); padding: 6px 8px 6px 16px; border-bottom: 1px solid var(--border); background: var(--surface); }
.code-card figcaption b { font-size: 14px; font-weight: 600; flex: 1; min-width: 0; }
.code-card .lang { font: 600 12px var(--mono); text-transform: uppercase; letter-spacing: .08em; color: var(--text-3); }
.code-card pre { margin: 0; border: 0; border-radius: 0; background: transparent; padding: 16px; overflow-x: auto; font-size: 14px; line-height: 1.65; }
.code-note { margin: 0; padding: 12px 16px; border-top: 1px solid var(--border); font-size: 14px; color: var(--text-2); background: var(--surface); }
.pitfalls { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--sp-3); }
.pitfalls li { padding: 12px 16px 12px 44px; position: relative; border: 1px solid color-mix(in srgb, var(--danger) 30%, var(--border)); border-radius: var(--r); background: var(--danger-soft); font-size: 15px; line-height: 1.6; }
.pitfalls li::before { content: "!"; position: absolute; left: 14px; top: 12px; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font: 700 13px var(--font); color: var(--on-accent); background: var(--danger); }
.lesson-qs { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.lesson-qs a { display: flex; align-items: center; gap: var(--sp-3); padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--r); font-size: 15px; }
.lesson-qs a:hover { border-color: var(--accent); background: var(--surface-2); }

.lesson-rail { position: sticky; top: calc(var(--topbar-h) + var(--sp-4)); display: grid; gap: var(--sp-4); max-height: calc(100vh - var(--topbar-h) - var(--sp-5)); overflow-y: auto; scrollbar-width: thin; }
.lesson-rail .rail-card { padding: var(--sp-4); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); }
.lesson-status { display: grid; gap: 6px; margin-top: var(--sp-3); }
.lesson-status button { justify-content: flex-start; }
.lesson-toc { list-style: none; margin: var(--sp-3) 0 0; padding: 0; display: grid; gap: 1px; max-height: 46vh; overflow-y: auto; scrollbar-width: thin; }
.lesson-toc a { display: grid; grid-template-columns: 10px 34px minmax(0, 1fr) auto; align-items: center; gap: 8px; padding: 6px 8px; border-radius: var(--r-sm); font-size: 13.5px; color: var(--text-2); }
.lesson-toc a:hover { background: var(--surface-2); color: var(--text); }
.lesson-toc li[aria-current="page"] a { background: var(--surface-2); color: var(--text); font-weight: 600; box-shadow: inset 2px 0 0 var(--accent); }
.lesson-toc .num { font: 500 12px var(--mono); color: var(--text-3); }
.lesson-toc .t { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lesson-toc .st-dot { background: var(--c, var(--st-0)); }
.has-lesson { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

@media (max-width: 1100px) {
  .lesson-layout { grid-template-columns: minmax(0, 1fr); gap: var(--sp-6); }
  .lesson-rail { position: static; max-height: none; overflow: visible; }
  .lesson-toc { max-height: 280px; }
}

/* Skill sahifasi: mavzu qatori to'liq sahifaga havola */
.sub-row { position: relative; min-height: 68px; }
.sub-row .st-toggle { position: relative; z-index: 2; }
.sub-main { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.sub-main::after { content: ""; position: absolute; inset: 0; z-index: 1; }
.sub-text { display: grid; gap: 3px; min-width: 0; }
.sub-excerpt { font-size: 13px; line-height: 1.4; color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sub-side { position: relative; z-index: 0; }
.sub-side .chev { color: var(--text-3); transition: transform var(--t) var(--ease), color var(--t-fast); }
.sub-row:hover .sub-side .chev { color: var(--accent-text); transform: translateX(3px); }
.sub-row:hover .sub-main .t { color: var(--accent-text); }
.chip.lesson { color: var(--accent-text); background: var(--accent-soft); border-color: transparent; }
@media (max-width: 900px) { .sub-excerpt { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } }

/* Stek: ikonka chiplari + 3xN kartalar */
.stk-chip { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px 8px 8px; border-radius: 999px; background: var(--glass); border: 1px solid var(--border); font-weight: 600; font-size: 14px; color: var(--text); white-space: nowrap; transition: border-color .15s, transform .15s; }
a.stk-chip:hover { border-color: var(--accent); transform: translateY(-2px); }
.stk-grid { list-style: none; margin: var(--sp-6) 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--sp-3); }
.stk-grid > li { display: flex; }
.stk-grid .stk { width: 100%; }
@media (max-width: 960px) { .stk-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 620px) { .stk-grid { grid-template-columns: 1fr; } }

.stk-chip { padding: 10px 18px 10px 10px; gap: 12px; }
.stk-logo { display: grid; place-items: center; min-width: 40px; height: 40px; padding: 0 8px; border-radius: 12px; background: var(--bc); color: #fff; font: 700 14px var(--mono); letter-spacing: -.02em; }
.stk-chip b { font-weight: 600; }
.stk-chip em { font: 500 12px var(--mono); font-style: normal; color: var(--text-3); }
.stk-logo svg { width: 24px; height: 24px; display: block; }

/* Stacklar bo'limi */
.st-grid, .st-skills { list-style: none; margin: var(--sp-5) 0 0; padding: 0; display: grid; gap: var(--sp-3); }
.st-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
.st-card { display: flex; flex-direction: column; gap: var(--sp-3); height: 100%; padding: var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); transition: border-color .15s, transform .15s; }
.st-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.st-top { display: flex; align-items: center; gap: var(--sp-3); }
.st-top h3 { font-size: 17px; font-weight: 600; }
.st-top em, .st-hero em { font: 500 12px var(--mono); font-style: normal; color: var(--text-3); }
.st-card p { font-size: 13px; line-height: 1.5; color: var(--text-3); flex: 1; }
.st-foot { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-3); }
.st-foot b { font: 600 13px var(--mono); color: var(--accent-text); }
.st-back { display: inline-flex; align-items: center; gap: 6px; margin-bottom: var(--sp-4); font-size: 14px; color: var(--text-3); }
.st-back:hover { color: var(--text); }
.st-hero { display: flex; align-items: center; gap: var(--sp-5); flex-wrap: wrap; }
.st-hero .stk-logo { width: 64px; height: 64px; border-radius: 18px; }
.st-hero .stk-logo svg { width: 34px; height: 34px; }
.st-hero h1 { font-size: clamp(26px, 3vw, 36px); font-weight: 700; letter-spacing: -.03em; }
.st-prog { margin-left: auto; min-width: 220px; display: grid; gap: 6px; }
.st-prog b { font: 600 28px/1 var(--mono); }
.st-prog span { font-size: 13px; color: var(--text-3); }
.st-sub { margin: var(--sp-6) 0 0; font-size: 18px; font-weight: 600; }
.st-skill { display: flex; align-items: center; gap: var(--sp-4); padding: var(--sp-4) var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); transition: border-color .15s; }
.st-skill:hover { border-color: var(--accent); }
.st-skill .num { font: 600 13px var(--mono); color: var(--text-3); }
.st-skill-main { flex: 1; display: grid; gap: 6px; min-width: 0; }
.st-skill-main h3 { font-size: 16px; font-weight: 600; }
.st-skill-main > span { font-size: 13px; color: var(--text-3); }
.st-skill > b { font: 600 14px var(--mono); color: var(--accent-text); }
@media (max-width: 720px) { .st-prog { margin-left: 0; width: 100%; } }

/* Skill sahifasidagi stack belgisi */
.chip .stk-logo { min-width: 20px; height: 20px; padding: 0; border-radius: 6px; margin: -2px 6px -2px -6px; }
.chip .stk-logo svg { width: 12px; height: 12px; }

/* Stack Map: bekat belgilari */
.rm-ic svg { width: 26px; height: 26px; }
.rm-ic strong { font: 700 13px var(--mono); }

/* Stack karuseli: kattaroq belgilar */
.stk-chip { padding: 14px 28px 14px 14px; gap: 16px; font-size: 18px; }
.stk-logo { min-width: 64px; height: 64px; border-radius: 18px; font-size: 20px; }
.stk-logo svg { width: 36px; height: 36px; }
.stk-chip em { font-size: 14px; }
.stk-track { gap: var(--sp-4); }

/* Yo'l xaritasi markaziy yorlig'i */
.rm-label { display: flex; align-items: center; gap: var(--sp-4); margin: 0 auto var(--sp-6); max-width: 720px; }
.rm-label::before, .rm-label::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--border-strong)); }
.rm-label::after { background: linear-gradient(270deg, transparent, var(--border-strong)); }
.rm-label span { padding: 10px 22px; border-radius: 999px; font: 600 15px var(--mono); letter-spacing: .04em; text-transform: uppercase; color: var(--accent-text); background: var(--accent-soft); border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 18%, transparent); }

/* ==========================================================================
   Landing: hero, raqamlar, qadamlar, imkoniyatlar, mock, FAQ, footer
   ========================================================================== */

.lp-hero-c { position: relative; max-width: none; text-align: center; padding: var(--sp-8) 0 var(--sp-6); isolation: isolate; }
.lp-hero-c h1 { font-size: clamp(48px, 9vw, 112px); line-height: 1; }
.lp-hero-c p { margin-inline: auto; text-wrap: balance; }
.lp-glow { position: absolute; inset: -20% 10% auto; height: 420px; z-index: -1; pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%),
              linear-gradient(var(--border) 1px, transparent 1px) 0 0 / 48px 48px, linear-gradient(90deg, var(--border) 1px, transparent 1px) 0 0 / 48px 48px;
  -webkit-mask-image: radial-gradient(closest-side, #000 30%, transparent 100%); mask-image: radial-gradient(closest-side, #000 30%, transparent 100%); opacity: .7; }
.lp-cta { display: flex; justify-content: center; flex-wrap: wrap; gap: var(--sp-3); margin-top: var(--sp-6); }
.lp-logos { margin-top: var(--sp-6); }

.lp-stats { list-style: none; margin: 0; padding: var(--sp-5) 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--sp-3); border-block: 1px solid var(--border); }
.lp-stats li { text-align: center; display: grid; gap: 4px; }
.lp-stats b { font: 700 clamp(28px, 4vw, 44px)/1 var(--mono); letter-spacing: -.04em; color: var(--text); font-variant-numeric: tabular-nums; }
.lp-stats span { font-size: 13px; color: var(--text-3); }

.lp-head-c { margin-inline: auto; text-align: center; }
.lp-steps, .lp-feats { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--sp-3); }
.lp-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); counter-reset: s; }
.lp-feats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.lp-steps li, .lp-feats li { position: relative; display: grid; gap: var(--sp-2); align-content: start; padding: var(--sp-5); border-radius: var(--r-lg); background: var(--glass); border: 1px solid var(--border); transition: border-color .15s, transform .15s; }
.lp-steps li:hover, .lp-feats li:hover { border-color: var(--accent); transform: translateY(-2px); }
.lp-steps h3, .lp-feats h3 { margin-top: var(--sp-2); font-size: 17px; font-weight: 600; }
.lp-steps p, .lp-feats p { font-size: 14px; line-height: 1.55; color: var(--text-3); }
.lp-step-n { position: absolute; top: var(--sp-4); right: var(--sp-5); font: 800 44px/1 var(--mono); color: var(--accent-soft); -webkit-text-stroke: 1px color-mix(in srgb, var(--accent) 40%, transparent); }

.lp-mock { max-width: 920px; margin: 0 auto; border-radius: var(--r-lg); border: 1px solid var(--border-strong); background: var(--surface); overflow: hidden; box-shadow: 0 30px 80px -30px color-mix(in srgb, var(--accent) 35%, transparent); }
.lp-mock-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
.lp-mock-bar i { width: 10px; height: 10px; border-radius: 50%; background: var(--surface-3); }
.lp-mock-bar span { margin-left: 10px; font: 500 12px var(--mono); color: var(--text-3); }
.lp-mock-body { display: grid; grid-template-columns: minmax(0, 1fr) 190px; gap: var(--sp-5); padding: var(--sp-5); }
.lp-mock-main { display: grid; gap: var(--sp-3); }
.lp-mock-main h3 { font-size: 22px; font-weight: 700; letter-spacing: -.02em; }
.lp-mock-main p { font-size: 14px; color: var(--text-2); }
.lp-mock-code { margin: 0; padding: var(--sp-4); border-radius: var(--r); background: var(--bg); border: 1px solid var(--border); font: 13px/1.6 var(--mono); overflow-x: auto; color: var(--text-2); }
.lp-mock-code .k { color: var(--accent-text); } .lp-mock-code .s { color: #FBBF24; } .lp-mock-code .c { color: var(--text-3); }
.lp-mock-rail { display: grid; gap: 8px; align-content: start; padding: var(--sp-3); border-radius: var(--r); border: 1px solid var(--border); font-size: 12px; }
.lp-mock-rail b { color: var(--text-3); text-transform: uppercase; letter-spacing: .06em; font-size: 11px; }
.st-pill { padding: 6px 10px; border-radius: var(--r-sm); border: 1px solid var(--border); color: var(--text-3); }
.st-pill.on { color: var(--accent-text); border-color: var(--accent); background: var(--accent-soft); }

.lp-faq { max-width: 760px; margin: 0 auto; display: grid; gap: var(--sp-2); }
.lp-faq details { border-radius: var(--r); background: var(--glass); border: 1px solid var(--border); }
.lp-faq summary { cursor: pointer; list-style: none; padding: var(--sp-4) var(--sp-5); font-weight: 600; display: flex; justify-content: space-between; gap: var(--sp-3); }
.lp-faq summary::-webkit-details-marker { display: none; }
.lp-faq summary::after { content: "+"; font: 400 22px/1 var(--mono); color: var(--accent-text); transition: transform .2s; }
.lp-faq details[open] summary::after { transform: rotate(45deg); }
.lp-faq details[open] { border-color: var(--accent); }
.lp-faq p { padding: 0 var(--sp-5) var(--sp-4); color: var(--text-2); font-size: 15px; line-height: 1.6; }

.lp-footer { margin-top: var(--sp-8); padding: var(--sp-6) 0 var(--sp-5); border-top: 1px solid var(--border); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--sp-4); }
.lp-foot-brand { display: grid; gap: 2px; }
.lp-foot-brand span, .lp-footer small { font-size: 13px; color: var(--text-3); }
.lp-footer nav { display: flex; flex-wrap: wrap; gap: var(--sp-4); font-size: 14px; }
.lp-footer nav a { color: var(--text-2); } .lp-footer nav a:hover { color: var(--accent-text); }

@media (max-width: 900px) { .lp-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); } .lp-steps, .lp-feats { grid-template-columns: 1fr 1fr; } }
@media (max-width: 620px) { .lp-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } .lp-steps, .lp-feats { grid-template-columns: 1fr; } .lp-mock-body { grid-template-columns: 1fr; } }

.lp-section .roadmap { max-width: 1040px; margin-inline: auto; }

/* Profil: real mahsulotlardagi kabi (cover, yon tablar, panellar) */
.pf-hero { border-radius: var(--r-lg); border: 1px solid var(--border); background: var(--glass); overflow: hidden; margin-bottom: var(--sp-5); }
.pf-cover { height: 120px; background: radial-gradient(60% 140% at 20% 0, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%), linear-gradient(135deg, var(--surface-2), var(--surface)); border-bottom: 1px solid var(--border); }
.pf-hero-row { display: flex; align-items: flex-end; gap: var(--sp-5); flex-wrap: wrap; padding: 0 var(--sp-6) var(--sp-5); margin-top: -38px; }
.pf-hero .pf-avatar { width: 88px; height: 88px; border: 4px solid var(--surface); box-shadow: 0 0 0 1px var(--border); font-size: 34px; }
.pf-hero .pf-id { flex: 1; min-width: 200px; padding-bottom: 4px; }
.pf-hero-actions { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.pf-layout { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: var(--sp-5); align-items: start; }
.pf-tabs { position: sticky; top: calc(var(--topbar-h, 60px) + 16px); display: grid; gap: 4px; }
.pf-tabs button { display: flex; align-items: center; gap: 10px; min-height: 42px; padding: 0 14px; border-radius: var(--r); font-size: 14px; font-weight: 600; color: var(--text-2); text-align: left; border: 1px solid transparent; transition: background .15s, color .15s; }
.pf-tabs button:hover { background: var(--surface-2); color: var(--text); }
.pf-tabs button[aria-selected="true"] { background: var(--accent-soft); color: var(--accent-text); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }
.pf-tabs button:last-child[aria-selected="true"] { background: var(--danger-soft); color: var(--danger); border-color: color-mix(in srgb, var(--danger) 35%, transparent); }
.pf-panels { min-width: 0; }
.pf-panel { display: grid; gap: var(--sp-4); }
.pf-panel[hidden] { display: none; }
.pf-panel .pf-stats { margin: 0; }
.pf-two { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--sp-4); align-items: start; }
.pf-card { display: grid; gap: var(--sp-4); align-content: start; }
.pf-note, .pf-empty { font-size: 14px; color: var(--text-3); }
.pf-stack-list, .pf-links { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--sp-2); }
.pf-stack { display: flex; align-items: center; gap: var(--sp-3); padding: 10px; border-radius: var(--r); border: 1px solid transparent; transition: background .15s, border-color .15s; }
.pf-stack:hover { background: var(--surface-2); border-color: var(--border); }
.pf-stack .stk-logo { min-width: 40px; height: 40px; border-radius: 12px; }
.pf-stack .stk-logo svg { width: 22px; height: 22px; }
.pf-stack-main { flex: 1; min-width: 0; display: grid; gap: 6px; }
.pf-stack-top { display: flex; justify-content: space-between; gap: var(--sp-3); font-size: 14px; }
.pf-stack-top span { font: 600 13px var(--mono); color: var(--accent-text); }
.pf-stack-main small { font-size: 12px; color: var(--text-3); }
.pf-ring { width: 120px; height: 120px; border-radius: 50%; margin: 0 auto; display: grid; place-items: center; background: conic-gradient(var(--accent) calc(var(--p) * 1%), var(--surface-3) 0); position: relative; }
.pf-ring::before { content: ""; position: absolute; inset: 12px; border-radius: 50%; background: var(--surface); }
.pf-ring span { position: relative; font: 700 24px var(--mono); }
.pf-links a { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-4) var(--sp-5); border-radius: var(--r-lg); border: 1px solid var(--border); background: var(--glass); transition: border-color .15s; }
.pf-links a:hover { border-color: var(--accent); }
.pf-links span { flex: 1; font-weight: 600; }
.pf-links b { font: 600 13px var(--mono); color: var(--accent-text); }
.pf-dl { display: grid; grid-template-columns: 140px 1fr; gap: var(--sp-3) var(--sp-4); margin: 0; font-size: 14px; }
.pf-dl dt { color: var(--text-3); } .pf-dl dd { margin: 0; overflow-wrap: anywhere; }
@media (max-width: 860px) {
  .pf-layout { grid-template-columns: minmax(0, 1fr); }
  .pf-tabs { position: static; display: flex; overflow-x: auto; gap: 6px; padding-bottom: 4px; }
  .pf-tabs button { flex: none; }
  .pf-two { grid-template-columns: minmax(0, 1fr); }
  .pf-hero-row { padding-inline: var(--sp-4); }
}

/* Profillar (admin) */
.pr-search { width: 100%; min-height: 42px; padding: 0 14px; border-radius: var(--r); border: 1px solid var(--border-strong); background: var(--surface); color: var(--text); font: inherit; }
.pr-search:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.pr-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--sp-2); }
.pr-row { display: grid; grid-template-columns: auto minmax(0, 1fr) 150px auto; align-items: center; gap: var(--sp-4); padding: var(--sp-3) var(--sp-4); border-radius: var(--r); border: 1px solid var(--border); background: var(--surface); }
.pr-av { width: 40px; height: 40px; font-size: 16px; }
.pr-main { min-width: 0; display: grid; gap: 2px; }
.pr-main b { overflow-wrap: anywhere; font-size: 14px; }
.pr-main small, .pr-prog small { font-size: 12px; color: var(--text-3); }
.pr-prog { display: grid; gap: 4px; }
.pr-prog span { font: 600 13px var(--mono); color: var(--accent-text); }
.pr-self { font-size: 12px; color: var(--text-3); }
.pr-actions { display: flex; }
.pr-confirm { display: flex; gap: 6px; }
@media (max-width: 720px) { .pr-row { grid-template-columns: auto minmax(0, 1fr); } .pr-prog, .pr-actions, .pr-self { grid-column: 1 / -1; } }

/* ------------------------------------------------------------------ *
 * Mashq ish joyi: intervyu va testlar (chap panel + ro'yxat, fokus sessiya)
 * ------------------------------------------------------------------ */
.px { display: grid; grid-template-columns: 244px minmax(0, 1fr); gap: 40px; align-items: start; }
.px :not(pre) > code, .px-play :not(pre) > code {
  font-size: .86em; padding: 1px 5px; border-radius: 5px;
  color: var(--text); background: var(--surface-3); border: 1px solid var(--border);
}
.px-main { min-width: 0; }

.px-rail {
  position: sticky; top: calc(var(--topbar-h) + 24px);
  max-height: calc(100vh - var(--topbar-h) - 48px); overflow-y: auto;
  display: flex; flex-direction: column; gap: 14px; padding: 2px 4px 8px 2px; scrollbar-width: thin;
}
.px-go { width: 100%; justify-content: flex-start; gap: 10px; }
.px-go b { margin-left: auto; min-width: 26px; padding: 2px 8px; border-radius: 99px; background: rgba(5, 46, 22, .18); font: 600 13px var(--mono); text-align: center; }
.px-go:disabled { opacity: .5; cursor: not-allowed; }
.px-nav { display: flex; flex-direction: column; gap: 2px; }
.px-nav-i {
  position: relative; display: flex; align-items: center; gap: 10px; min-height: 38px; padding: 6px 10px;
  border-radius: 8px; color: var(--text-2); font-size: 14px; transition: background var(--t-fast), color var(--t-fast);
}
.px-nav-i:hover { background: var(--surface); color: var(--text); }
.px-nav-i[aria-current="page"] { background: var(--surface-2); color: var(--text); box-shadow: inset 0 0 0 1px var(--border); }
.px-nav-i[aria-current="page"] > .ic { color: var(--accent-text); }
.px-nav-i > .ic { color: var(--text-3); flex: none; }
.px-nav-i > span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.px-nav-i > b { font: 500 12px var(--mono); color: var(--text-3); }
.px-nav-i .stk-logo { width: 22px; min-width: 22px; height: 22px; padding: 0; border-radius: 6px; font-size: 9px; flex: none; }
.px-nav-i .stk-logo svg { width: 13px; height: 13px; }
.px-nav-bar { position: absolute; left: 42px; right: 10px; bottom: 3px; height: 2px; border-radius: 2px; background: var(--surface-3); overflow: hidden; }
.px-nav-bar::after { content: ""; position: absolute; inset: 0 auto 0 0; width: var(--p); background: var(--accent); }
.px-rail-h { margin: 6px 10px -6px; font-size: 13px; font-weight: 600; color: var(--text-3); }

.px-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px 24px; flex-wrap: wrap; margin-bottom: 20px; }
.px-head-t { display: flex; align-items: center; gap: 16px; min-width: 0; flex: 1 1 340px; }
.px-head-t .stk-logo { width: 52px; min-width: 52px; height: 52px; padding: 0; border-radius: 14px; font-size: 16px; }
.px-head-t .stk-logo svg { width: 28px; height: 28px; }
.px-head h1 { font-size: clamp(26px, 3vw, 34px); line-height: 1.15; letter-spacing: -.02em; }
.px-head p { margin-top: 6px; max-width: 64ch; font-size: 15px; color: var(--text-2); }
.px-head-act { display: flex; gap: 8px; flex-wrap: wrap; }
.px-head-act .btn:disabled { opacity: .5; cursor: not-allowed; }

.px-meter { margin-bottom: 20px; }
.px-meter .bar { height: 8px; }
.px-legend { display: flex; flex-wrap: wrap; gap: 6px 20px; margin: 10px 0 0; padding: 0; list-style: none; font-size: 13px; color: var(--text-3); }
.px-legend li { display: inline-flex; align-items: center; gap: 6px; }
.px-legend li::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--surface-3); box-shadow: inset 0 0 0 1px var(--border-strong); }
.px-legend li[data-k="done"]::before { background: var(--accent); box-shadow: none; }
.px-legend li[data-k="learn"]::before { background: var(--st-1); box-shadow: none; }
.px-legend b { font: 600 13px var(--mono); color: var(--text); }

.px-tools {
  position: sticky; top: calc(var(--topbar-h) + 8px); z-index: 3;
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; padding: 8px;
  border-radius: var(--r-lg); background: var(--surface); border: 1px solid var(--border);
}
.px-search {
  flex: 1 1 200px; display: flex; align-items: center; gap: 8px; min-height: 38px; padding: 0 12px;
  border-radius: 8px; background: var(--bg); border: 1px solid var(--border); color: var(--text-3);
  transition: border-color var(--t-fast);
}
.px-search:focus-within { border-color: var(--accent); }
.px-search input { flex: 1; min-width: 0; height: 36px; padding: 0; border: 0; background: transparent; color: var(--text); font: inherit; font-size: 14px; outline: none; }
.px-search input::placeholder { color: var(--text-3); }
.px-tools .seg { flex-wrap: wrap; }
.seg button:disabled { opacity: .4; cursor: not-allowed; }
.seg .count-chip { margin-left: 4px; font: 500 12px var(--mono); color: var(--text-3); }
.px-count { display: flex; justify-content: space-between; gap: 12px; margin: 12px 4px 10px; font-size: 13px; color: var(--text-3); }
.px-link { padding: 0; border: 0; background: none; color: var(--accent-text); font: inherit; font-size: 13px; cursor: pointer; }
.px-link:hover { text-decoration: underline; text-underline-offset: 3px; }

.px-group + .px-group { margin-top: 28px; }
.px-group-h { display: flex; align-items: center; gap: 10px; margin: 0 0 8px; padding: 0 4px; font-size: 15px; font-weight: 600; }
.px-group-h a { display: inline-flex; align-items: center; gap: 10px; color: var(--text); }
.px-group-h a:hover { color: var(--accent-text); }
.px-group-h > span { font: 500 12px var(--mono); color: var(--text-3); }
.px-group-h .stk-logo { width: 24px; min-width: 24px; height: 24px; padding: 0; border-radius: 7px; font-size: 9px; }
.px-group-h .stk-logo svg { width: 14px; height: 14px; }
.px-rows { margin: 0; padding: 0; list-style: none; border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--surface); overflow: hidden; }
.px-rows li + li { border-top: 1px solid var(--border); }
.px-row {
  display: grid; grid-template-columns: 62px minmax(0, 1fr) 22px; gap: 14px; align-items: start;
  width: 100%; padding: 14px 16px; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer;
  transition: background var(--t-fast);
}
.px-row:hover { background: var(--surface-2); }
.px-row:focus-visible { outline: 2px solid var(--accent-ring); outline-offset: -2px; }
.px-row .px-lvl { padding-top: 4px; }
.px-row-q { display: block; font-size: 15px; font-weight: 500; line-height: 1.45; color: var(--text); text-wrap: pretty; }
.px-row-m { display: flex; flex-wrap: wrap; gap: 2px 12px; margin-top: 4px; font-size: 12.5px; color: var(--text-3); }
.px-row-m i { font-style: normal; }
.px-row-m i.saved { display: inline-flex; align-items: center; gap: 4px; color: var(--st-2); }

.px-lvl { font: 600 11px/1.2 var(--mono); letter-spacing: .04em; text-transform: uppercase; color: var(--text-3); }
.px-lvl[data-l="junior"] { color: var(--accent-text); }
.px-lvl[data-l="middle"] { color: var(--st-1); }
.px-lvl[data-l="senior"] { color: var(--st-4); }
.px-lvl[data-l="lead"] { color: var(--st-2); }

.px-mark { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; }
.px-mark::before { content: ""; width: 10px; height: 10px; border-radius: 50%; }
.px-mark[data-m="new"]::before { box-shadow: inset 0 0 0 1.5px var(--border-strong); }
.px-mark[data-m="r0"]::before { background: var(--danger); }
.px-mark[data-m="r1"]::before { background: var(--st-2); }
.px-mark[data-m="r2"]::before { background: var(--st-1); }
.px-mark[data-m="done"], .px-mark[data-m="due"] { width: 24px; height: 24px; }
.px-mark[data-m="done"]::before, .px-mark[data-m="due"]::before { display: none; }
.px-mark[data-m="done"] { color: var(--accent-text); background: var(--accent-soft); }
.px-mark[data-m="due"] { color: var(--st-2); background: var(--st-2-soft); }

.px-empty { padding: 48px 24px; border: 1px dashed var(--border-strong); border-radius: var(--r-lg); text-align: center; }
.px-empty h2 { font-size: 18px; }
.px-empty p { margin: 6px auto 16px; max-width: 48ch; color: var(--text-2); }

/* Fokus sessiya */
.px-play { max-width: 820px; margin: 0 auto; }
.px-play-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
.px-play-r { display: flex; align-items: center; gap: 18px; }
.px-back { display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 0; border: 0; background: none; color: var(--text-2); font: inherit; font-size: 14px; cursor: pointer; }
.px-back:hover { color: var(--text); }
.px-pos { font: 600 14px var(--mono); color: var(--text-2); }
.px-score { display: flex; gap: 12px; font: 600 14px var(--mono); }
.px-score > span { display: inline-flex; align-items: center; gap: 4px; }
.px-score [data-ok="true"] { color: var(--accent-text); }
.px-score [data-ok="false"] { color: var(--danger); }

.px-ticks { display: flex; gap: 3px; margin: 0 0 24px; padding: 0; list-style: none; }
.px-ticks li { position: relative; flex: 1; min-width: 3px; height: 6px; border-radius: 3px; background: var(--surface-3); transition: background var(--t-fast), transform var(--t-fast); }
.px-ticks li button { position: absolute; inset: -8px 0; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; }
.px-ticks li[data-s="seen"] { background: var(--border-strong); }
.px-ticks li[data-s="r0"] { background: var(--danger); }
.px-ticks li[data-s="r1"] { background: var(--st-2); }
.px-ticks li[data-s="r2"] { background: var(--accent); }
.px-ticks li[aria-current="step"] { transform: scaleY(1.7); box-shadow: 0 0 0 1px var(--text-2); }
.px-ticks-bar { margin-bottom: 24px; }

.px-card { padding: 28px 32px; border-radius: var(--r-xl); background: var(--surface); border: 1px solid var(--border); }
.px-card-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; margin-bottom: 14px; font-size: 13px; color: var(--text-3); }
.px-stk { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; color: var(--text-2); }
.px-stk .stk-logo { width: 22px; min-width: 22px; height: 22px; padding: 0; border-radius: 6px; font-size: 9px; }
.px-stk .stk-logo svg { width: 13px; height: 13px; }
.px-type { color: var(--st-2); }
.px-flag { display: inline-flex; align-items: center; gap: 4px; }
.px-flag[data-f="done"] { color: var(--accent-text); }
.px-flag[data-f="streak"] { color: var(--st-2); font-weight: 600; }
.px-q { font-size: clamp(20px, 2.4vw, 25px); font-weight: 600; line-height: 1.38; letter-spacing: -.01em; color: var(--text); text-wrap: pretty; }
.px-code { position: relative; margin: 18px 0 0; padding: 16px 18px; overflow-x: auto; font-size: 13.5px; line-height: 1.65; color: var(--text); background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--r); }

.px-recall { display: grid; gap: 10px; margin-top: 24px; }
.px-recall label { font-size: 14px; color: var(--text-2); }
.px-recall textarea {
  width: 100%; min-height: 104px; padding: 12px 14px; resize: vertical;
  border-radius: var(--r); background: var(--bg); border: 1px solid var(--border); color: var(--text);
  font: 15px/1.55 var(--font); outline: none; transition: border-color var(--t-fast), box-shadow var(--t-fast);
}
.px-recall textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.px-recall .btn { justify-self: start; }
.px-recall .btn kbd, .px-setup-go .btn kbd { margin-left: 4px; background: rgba(5, 46, 22, .18); border-color: transparent; color: inherit; }
.px-note { margin-top: 24px; padding: 14px 16px; border-radius: var(--r); background: var(--bg); border: 1px dashed var(--border-strong); }
.px-note h2 { margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--text-3); }
.px-note p { font-size: 14px; color: var(--text-2); white-space: pre-wrap; }
.px-answer { margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }
.px-answer:focus { outline: none; }
.px-tip { margin-top: 20px; padding: 14px 16px; border-radius: var(--r); background: var(--accent-soft); }
.px-tip h2 { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--accent-text); }
.px-tip p { font-size: 14.5px; line-height: 1.6; color: var(--text); }

.px-grade { display: grid; grid-template-columns: auto repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 24px; }
#px-grade-l { align-self: center; padding-right: 6px; font-size: 14px; color: var(--text-2); }
.px-grade button {
  display: grid; grid-template-columns: auto 1fr; column-gap: 10px; align-items: center; padding: 10px 14px;
  border-radius: var(--r); background: var(--surface-2); border: 1px solid var(--border); color: var(--text);
  font: inherit; text-align: left; cursor: pointer; transition: border-color var(--t-fast), background var(--t-fast);
}
.px-grade button kbd { grid-row: span 2; }
.px-grade button span { font-size: 15px; font-weight: 600; }
.px-grade button small { font-size: 12px; color: var(--text-3); }
.px-grade [data-r="0"]:hover, .px-grade [data-r="0"][aria-pressed="true"] { border-color: var(--danger); background: var(--danger-soft); }
.px-grade [data-r="1"]:hover, .px-grade [data-r="1"][aria-pressed="true"] { border-color: var(--st-2); background: var(--st-2-soft); }
.px-grade [data-r="2"]:hover, .px-grade [data-r="2"][aria-pressed="true"] { border-color: var(--accent); background: var(--accent-soft); }

.px-play-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; }
.px-foot-l { display: flex; flex-wrap: wrap; gap: 8px; }
.px-foot-l .btn:disabled { opacity: .45; cursor: not-allowed; }
.px-foot-l .btn[aria-pressed="true"] { color: var(--st-2); border-color: color-mix(in srgb, var(--st-2) 40%, transparent); }
.px-lesson { display: inline-flex; align-items: center; gap: 6px; min-width: 0; max-width: 100%; font-size: 14px; font-weight: 500; color: var(--accent-text); }
.px-lesson > span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.px-lesson:hover > span { text-decoration: underline; text-underline-offset: 3px; }
.px-keys { display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 20px; font-size: 12.5px; color: var(--text-3); }
.px-keys > span { display: inline-flex; align-items: center; gap: 4px; }
.px-play-foot .px-keys { margin-top: 0; }

.px-opts { display: grid; gap: 10px; margin-top: 24px; }
.px-opt {
  display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 14px; align-items: start; width: 100%; padding: 14px 16px;
  border-radius: var(--r); background: var(--surface-2); border: 1px solid var(--border); color: var(--text);
  font: 15px/1.5 var(--font); text-align: left; cursor: pointer; transition: border-color var(--t-fast), background var(--t-fast), opacity var(--t-fast);
}
.px-opt:hover:not(:disabled) { border-color: var(--border-strong); background: var(--surface-3); }
.px-opt:disabled { cursor: default; }
.px-opt > .ic { margin-top: 3px; }
.px-opt[data-s="ok"] { border-color: var(--accent); background: var(--accent-soft); }
.px-opt[data-s="ok"] > .ic { color: var(--accent-text); }
.px-opt[data-s="bad"] { border-color: var(--danger); background: var(--danger-soft); }
.px-opt[data-s="bad"] > .ic { color: var(--danger); }
.px-opt[data-s="dim"] { opacity: .55; }
.px-explain { margin-top: 20px; padding: 16px 18px; border-radius: var(--r); background: var(--surface-2); }
.px-explain h2 { font-size: 15px; font-weight: 600; }
.px-explain[data-ok="true"] h2 { color: var(--accent-text); }
.px-explain[data-ok="false"] h2 { color: var(--danger); }
.px-explain p { margin: 6px 0 12px; font-size: 15px; line-height: 1.6; color: var(--text-2); }

/* Test sozlagichi */
.px-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; margin: 0 0 24px; overflow: hidden; background: var(--border); border: 1px solid var(--border); border-radius: var(--r-lg); }
.px-kpis > div { padding: 14px 18px; background: var(--surface); }
.px-kpis dt { font-size: 13px; color: var(--text-3); }
.px-kpis dd { margin: 4px 0 0; font: 600 26px/1.1 var(--mono); color: var(--text); }
.px-kpis dd small { font-size: 14px; color: var(--text-3); }
.px-setup { display: grid; gap: 18px; padding: 24px; border-radius: var(--r-xl); background: var(--surface); border: 1px solid var(--border); }
.px-sec-h { font-size: 17px; font-weight: 600; }
.px-field { display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 16px; align-items: center; }
.px-field .seg { flex-wrap: wrap; justify-self: start; }
.px-label { font-size: 14px; color: var(--text-2); }
.px-setup-go { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding-top: 18px; border-top: 1px solid var(--border); }
.px-setup-go p { font-size: 14px; color: var(--text-2); }
.px-hist { margin-top: 32px; }
.px-hist-list { margin: 12px 0 0; padding: 0; list-style: none; overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-lg); }
.px-hist-list li { display: grid; grid-template-columns: 96px minmax(0, 1fr) 64px 168px; gap: 16px; align-items: center; padding: 12px 16px; font-size: 14px; }
.px-hist-list li + li { border-top: 1px solid var(--border); }
.px-hist-d { font: 13px var(--mono); color: var(--text-3); }
.px-hist-s { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text); }
.px-hist-n { font: 13px var(--mono); color: var(--text-2); text-align: right; }
.px-hist-p { display: flex; align-items: center; gap: 10px; }
.px-hist-p i { position: relative; flex: 1; height: 6px; overflow: hidden; border-radius: 3px; background: var(--surface-3); }
.px-hist-p i::after { content: ""; position: absolute; inset: 0 auto 0 0; width: var(--p); background: var(--c); }
.px-hist-p b { width: 40px; font: 600 13px var(--mono); text-align: right; }
[data-band="top"], [data-band="good"] { --c: var(--accent); }
[data-band="mid"] { --c: var(--st-2); }
[data-band="low"] { --c: var(--danger); }
.px-muted { margin-top: 10px; font-size: 14px; color: var(--text-3); }

/* Yakun */
.px-sum { padding: 32px; border-radius: var(--r-xl); background: var(--surface); border: 1px solid var(--border); }
.px-sum h1 { font-size: 28px; letter-spacing: -.02em; }
.px-sum-sub { margin-top: 8px; max-width: 62ch; color: var(--text-2); }
.px-bigscore { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px 14px; margin-bottom: 12px; }
.px-bigscore b { font: 700 64px/1 var(--mono); letter-spacing: -.04em; color: var(--c); }
.px-bigscore b small { font-size: 28px; }
.px-bigscore span { font-size: 15px; color: var(--text-2); }
.px-sum-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 24px 0 0; }
.px-sum-stats > div { padding: 14px 16px; border-radius: var(--r); background: var(--surface-2); }
.px-sum-stats dt { font-size: 13px; color: var(--text-3); }
.px-sum-stats dd { margin: 4px 0 0; font: 600 28px/1.1 var(--mono); color: var(--text); }
.px-sum-stats [data-r="2"] dd { color: var(--accent-text); }
.px-sum-stats [data-r="1"] dd { color: var(--st-2); }
.px-sum-stats [data-r="0"] dd { color: var(--danger); }
.px-sum-h2 { margin: 28px 0 4px; font-size: 16px; font-weight: 600; }
.px-review { margin: 0; padding: 0; list-style: none; }
.px-review li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 14px; align-items: start; padding: 14px 0; border-bottom: 1px solid var(--border); }
.px-review-i { display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 8px; border-radius: 99px; font-size: 12px; font-weight: 600; }
.px-review [data-r="0"] .px-review-i { color: var(--danger); background: var(--danger-soft); }
.px-review [data-r="1"] .px-review-i { color: var(--st-2); background: var(--st-2-soft); }
.px-review [data-r="2"] .px-review-i { padding: 0; color: var(--accent-text); background: var(--accent-soft); }
.px-review [data-r="0"] .px-review-i:has(svg) { padding: 0; }
.px-review-q { font-size: 15px; line-height: 1.5; color: var(--text); }
.px-review-a { margin-top: 6px; font-size: 14px; color: var(--text-2); }
.px-review-a b { color: var(--danger); }
.px-review-a[data-ok="true"] b { color: var(--accent-text); }
.px-review-l { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; font-size: 13.5px; color: var(--accent-text); }
.px-review-l:hover { text-decoration: underline; text-underline-offset: 3px; }
.px-sum-act { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }

@media (max-width: 960px) {
  .px { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .px-rail { position: static; max-height: none; overflow: visible; gap: 10px; padding: 0; }
  .px-go { width: auto; align-self: flex-start; }
  .px-rail-h { display: none; }
  .px-nav { flex-direction: row; gap: 6px; margin: 0 -16px; padding: 2px 16px; overflow-x: auto; scrollbar-width: none; }
  .px-nav::-webkit-scrollbar { display: none; }
  .px-nav-i { flex: none; min-height: 36px; background: var(--surface); border: 1px solid var(--border); }
  .px-nav-i > span { overflow: visible; }
  .px-nav-bar { display: none; }
  .px-tools { position: static; }
}
@media (max-width: 640px) {
  .px-head-act { width: 100%; }
  .px-head-act .btn-primary { flex: 1 1 100%; justify-content: center; }
  .px-row { grid-template-columns: minmax(0, 1fr) 24px; gap: 6px 12px; padding: 12px 14px; }
  .px-row .px-lvl { grid-column: 1; grid-row: 1; padding: 0; }
  .px-row .px-row-t { grid-column: 1; grid-row: 2; }
  .px-row .px-mark { grid-column: 2; grid-row: 1 / span 2; align-self: center; }
  .px-card { padding: 20px 18px; }
  .px-grade { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  #px-grade-l { grid-column: 1 / -1; }
  .px-grade button { grid-template-columns: 1fr; justify-items: center; text-align: center; padding: 10px 6px; }
  .px-grade button kbd { display: none; }
  .px-keys { display: none; }
  .px-play-foot .px-keys { display: none; }
  .px-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .px-field { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .px-setup { padding: 18px; }
  .px-hist-list li { grid-template-columns: minmax(0, 1fr) 132px; gap: 6px 12px; }
  .px-hist-s { grid-area: 1 / 1; }
  .px-hist-n { grid-area: 1 / 2; }
  .px-hist-d { grid-area: 2 / 1; }
  .px-hist-p { grid-area: 2 / 2; }
  .px-sum { padding: 22px 18px; }
  .px-bigscore b { font-size: 52px; }
  .px-sum-stats dd { font-size: 22px; }
}
~~~~~~~~

## 8.C. `assets/js/app.js` (3397 qator)

~~~~~~~~js
/* Stack Map — vanilla JS, works from file:// (no build, no server). */
(() => {
  "use strict";

  /* ------------------------------------------------------------------ *
   * Constants
   * ------------------------------------------------------------------ */
  const STATUSES = [
    { label: "Boshlanmagan",  hint: "Hali boshlanmagan" },
    { label: "O'rganilmoqda", hint: "Hozir o'rganyapman" },
    { label: "Ishonchli",     hint: "Intervyuda ishonch bilan javob bera olaman" },
  ];
  const WEIGHT = [0, 0.5, 1];
  /* v1 (5 holat) -> v2 (3 holat): Practicing -> O'rganilmoqda, Proficient/Expert -> Ishonchli */
  const STATUS_V1_TO_V2 = [0, 1, 1, 2, 2];
  const PROGRESS_VERSION = 2;
  const PRIORITY = { core: "Core", important: "Important", optional: "Optional" };
  const KEYS = { progress: "lsm:progress", theme: "lsm:theme", collapsed: "lsm:collapsed", last: "lsm:last", srs: "lsm:srs", levels: "lsm:levels", quiz: "lsm:quiz_scores", session: "lsm:session", progressV: "lsm:progress-v", questions: "lsm:questions", bookmarks: "lsm:bookmarks", quizHist: "lsm:quiz_hist", quizWrong: "lsm:quiz_wrong" };

  const CAREER_LEVELS = [
    { id: "junior", label: "Junior", name: "Junior Developer", subLevels: ["foundation", "junior"], badge: "Junior", color: "var(--accent-text)", bg: "var(--accent-soft)", icon: "code", desc: "PHP sintaksisi, OOP asoslari, MVC, sodda CRUD va bazaviy vositalar" },
    { id: "middle", label: "Middle", name: "Middle Developer", subLevels: ["middle", "strong middle"], badge: "Middle", color: "var(--st-1)", bg: "var(--st-1-soft)", icon: "layers", desc: "Ishlab chiqarish amaliyoti, Eloquent, REST API, testlash, Docker va DB optimizatsiyasi" },
    { id: "senior", label: "Senior", name: "Senior Developer", subLevels: ["senior"], badge: "Senior", color: "var(--st-4)", bg: "var(--st-4-soft)", icon: "shield", desc: "Tizim arxitekturasi, yuqori yuklama, xavfsizlik, AWS bulut va murakkab refactoring" },
    { id: "lead",   label: "Lead",   name: "Tech / Team Lead",  subLevels: ["lead"], badge: "Lead", color: "var(--st-2)", bg: "var(--st-2-soft)", icon: "users", desc: "Texnik yo'nalish, jamoa murabbiyligi, arxitektura review va qarorlar qabul qilish" }
  ];

  function levelOf(sub) {
    const l = String(sub.level || "").toLowerCase().trim();
    if (l === "foundation" || l === "junior") return "junior";
    if (l === "middle" || l === "strong middle") return "middle";
    if (l === "senior") return "senior";
    if (l === "lead") return "lead";
    return "middle";
  }


  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const icon = (name, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const pad = (n) => String(n).padStart(2, "0");
  const pct = (x) => Math.round(x * 100);

  let currentUser = null;
  let userSaveTimer = 0;

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode: keep in memory only */ }
      if (typeof onUserKeyChanged === "function") onUserKeyChanged(key);
    },
  };

  /* ------------------------------------------------------------------ *
   * Data loading — each data/skills/*.js calls registerSkill({...})
   * ------------------------------------------------------------------ */
  const registered = [];
  const fileErrors = {};

  window.registerSkill = (skill) => {
    const src = document.currentScript && document.currentScript.src;
    registered.push({ ...skill, _file: src ? decodeURIComponent(src.split("/").pop()) : "" });
  };

  /* Chuqur darslar: data/lessons/<subId>.js -> registerLesson("13.12", { lesson, examples, pitfalls }) */
  const LESSONS = {};
  window.registerLesson = (id, data) => { LESSONS[String(id)] = data || {}; };

  window.addEventListener("error", (e) => {
    if (e.filename && e.filename.includes("/data/skills/")) {
      fileErrors[decodeURIComponent(e.filename.split("/").pop())] = `${e.message} (qator ${e.lineno})`;
    }
  });

  function loadScripts(dir, files, onError) {
    return new Promise((resolve) => {
      if (!files.length) return resolve();
      let left = files.length;
      const done = () => { if (--left === 0) resolve(); };
      files.forEach((f) => {
        const s = document.createElement("script");
        s.src = `${dir}/${f}`;
        s.async = false;
        s.onload = done;
        s.onerror = () => { if (onError) onError(f); done(); };
        document.body.appendChild(s);
      });
    });
  }

  function loadData() {
    return loadScripts("data/skills", window.SKILL_FILES || [], (f) => { fileErrors[f] = fileErrors[f] || "Fayl topilmadi"; });
  }

  // Chuqur darslar faqat skill va dars sahifalarida kerak: birinchi render'dan keyin fonda yuklanadi.
  let lessonsLoaded = false;
  function loadLessons() {
    return loadScripts("data/lessons", window.LESSON_FILES || []).then(() => {
      lessonsLoaded = true;
      if (/^#\/s\//.test(decodeURIComponent(location.hash))) {
        const y = window.scrollY;
        route();
        window.scrollTo(0, y);
      }
    });
  }

  const text = (v) => (Array.isArray(v) ? v.join("\n") : typeof v === "string" ? v : "").trim();
  const list = (v) => (Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : text(v) ? [text(v)] : []);

  let SKILLS = [], BY_SLUG = {}, BY_ID = {}, SUB_BY_ID = {}, GROUPS = [], GROUP_BY_ID = {}, LOAD_ISSUES = [];

  function buildModel() {
    SKILLS = registered
      .map((s) => ({
        id: Number(s.id),
        slug: String(s.slug),
        title: String(s.title),
        group: String(s.group || ""),
        description: text(s.description),
        file: s._file,
        subskills: (s.subskills || []).map((x, i) => ({
          id: String(x.id || `${s.id}.${i + 1}`),
          title: String(x.title || ""),
          description: text(x.description),
          priority: String(x.priority || "").toLowerCase().trim(),
          level: String(x.level || "").trim(),
          practicalTask: text(x.practicalTask),
          acceptanceCriteria: list(x.acceptanceCriteria),
          prerequisites: list(x.prerequisites),
        })),
      }))
      .sort((a, b) => a.id - b.id);

    SKILLS.forEach((s, i) => {
      s.index = i;
      BY_SLUG[s.slug] = s;
      BY_ID[s.id] = s;
      s.subskills.forEach((x) => { x.skill = s; SUB_BY_ID[x.id] = x; });
    });

    GROUPS = (window.SKILL_GROUPS || []).map((g) => ({
      ...g, items: g.skills.map((id) => BY_ID[id]).filter(Boolean),
    }));
    const grouped = new Set(GROUPS.flatMap((g) => g.items.map((s) => s.id)));
    const orphans = SKILLS.filter((s) => !grouped.has(s.id));
    if (orphans.length) GROUPS.push({ id: "other", title: "Boshqa", icon: "layers", items: orphans });
    GROUPS.forEach((g) => { GROUP_BY_ID[g.id] = g; g.items.forEach((s) => { s.groupRef = g; }); });

    // Ko'rsatiladigan raqamlash sidebar (bo'limlar) tartibiga mos: 1..N ketma-ket.
    // Ma'lumotdagi id'lar (progress kalitlari, prerequisites) o'zgarmaydi.
    SKILLS = GROUPS.flatMap((g) => g.items);
    // Stack'ga tegishli skill raqami — stack ichidagi o'rni (1..n); stacksiz skill global tartibni saqlaydi.
    SKILLS.forEach((s, i) => {
      s.index = i;
      const stk = TECH_LOGOS.find((x) => x.sk.includes(s.slug));
      s.num = stk ? stk.sk.indexOf(s.slug) + 1 : i + 1;
      s.subskills.forEach((x, j) => { x.num = `${s.num}.${j + 1}`; });
    });

    const loaded = new Set(registered.map((r) => r._file));
    LOAD_ISSUES = (window.SKILL_FILES || [])
      .filter((f) => !loaded.has(f) || fileErrors[f])
      .map((f) => ({ file: f, msg: fileErrors[f] || "registerSkill() chaqirilmadi — sintaksis xatosi bo'lishi mumkin" }));
  }

  /* ------------------------------------------------------------------ *
   * Progress state & Local File System Sync
   * ------------------------------------------------------------------ */
  let progress = store.get(KEYS.progress, {});
  if (typeof progress !== "object" || progress === null) progress = {};

  /* src: {subId: holat}; version: manba formati (yo'q yoki 1 = eski 5 holat). SUB_BY_ID tekshiruvi chaqiruvchida. */
  function cleanProgress(src, version) {
    const map = (version || 1) < 2 ? STATUS_V1_TO_V2 : null;
    const out = {};
    Object.entries(src || {}).forEach(([k, v]) => {
      if (!Number.isInteger(v) || v <= 0 || v > 4) return;
      const n = map ? map[v] : v;
      if (n > 0 && n < STATUSES.length) out[k] = n;
    });
    return out;
  }
  if (store.get(KEYS.progressV, 1) < PROGRESS_VERSION) {
    progress = cleanProgress(progress, 1);
    store.set(KEYS.progress, progress);
    store.set(KEYS.progressV, PROGRESS_VERSION);
  }
  let masteredIq = new Set(store.get(KEYS.questions, []));
  let bookmarkedIq = new Set(store.get(KEYS.bookmarks, []));
  /* Intervyu savollari: Leitner takrorlash. iqSrs[id] = { box 1..5, due: "yyyy-mm-dd", last, r: 0|1|2 } */
  let iqSrs = store.get(KEYS.srs, {}) || {};
  let iqMode = "today";
  let iqTodayIds = [];
  const SRS_DAYS = [0, 1, 3, 7, 14, 30];
  const dayStr = (add = 0) => { const d = new Date(); d.setDate(d.getDate() + add); return d.toLocaleDateString("sv"); };

  const statusOf = (subId) => {
    const v = progress[subId];
    return Number.isInteger(v) && v >= 0 && v < STATUSES.length ? v : 0;
  };
  function setStatus(subId, st) {
    if (st === 0) delete progress[subId]; else progress[subId] = st;
    store.set(KEYS.progress, progress);
  }
  function statsFor(subs) {
    const counts = STATUSES.map(() => 0);
    let w = 0, described = 0;
    subs.forEach((x) => {
      const st = statusOf(x.id);
      counts[st]++; w += WEIGHT[st];
      if (x.description) described++;
    });
    const n = subs.length || 1;
    return { counts, total: subs.length, progress: w / n, done: counts[2], described };
  }
  const allSubs = () => SKILLS.flatMap((s) => s.subskills);

  /* ------------------------------------------------------------------ *
   * Markdown (small, safe subset) + tiny PHP/SQL highlighter
   * ------------------------------------------------------------------ */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function inline(src) {
    const codes = [];
    let h = esc(String(src).replace(/`([^`]+)`/g, (m, c) => "\u0000" + (codes.push(c) - 1) + "\u0000"));
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    h = h.replace(/\[([^\]]+)\]\(((?:https?:\/\/|#)[^)\s]+)\)/g, (m, t, u) =>
      `<a href="${u}"${u.startsWith("#") ? "" : ' target="_blank" rel="noopener noreferrer"'}>${t}</a>`);
    return h.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${esc(codes[i])}</code>`);
  }

  const KW = new Set(("abstract and array as break callable case catch class clone const continue declare default do echo else elseif " +
    "empty enddeclare endfor endforeach endif endswitch endwhile enum extends final finally fn for foreach function global goto if " +
    "implements include instanceof insteadof interface isset list match namespace new or print private protected public readonly " +
    "require return static switch throw trait try unset use var while yield null true false self parent mixed void never int string " +
    "float bool iterable object " +
    "select from where join left right inner outer on group by order having limit offset insert into values update set delete create " +
    "table index primary key foreign references unique not null default begin commit rollback transaction with as union all distinct " +
    "case when then end explain analyze count sum avg min max over partition alter add drop exists in is like between asc desc lock for share").split(" "));

  function highlight(code) {
    const re = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*|--[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$[A-Za-z_]\w*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
    let out = "", last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [tok, c, s, v, n, w] = m;
      if (c) out += `<span class="tok-c">${esc(tok)}</span>`;
      else if (s) out += `<span class="tok-s">${esc(tok)}</span>`;
      else if (v) out += `<span class="tok-v">${esc(tok)}</span>`;
      else if (n) out += `<span class="tok-n">${esc(tok)}</span>`;
      else if (w && KW.has(w.toLowerCase())) out += `<span class="tok-k">${esc(tok)}</span>`;
      else out += esc(tok);
      last = m.index + tok.length;
    }
    return out + esc(code.slice(last));
  }

  function markdown(src) {
    const lines = (Array.isArray(src) ? src.join("\n") : String(src)).replace(/\r\n?/g, "\n").split("\n");
    const out = [];
    let i = 0;
    const isBlockStart = (l) => /^(```|#{1,6}\s|>\s?|\s*[-*]\s+|\s*\d+[.)]\s+|\|)/.test(l);

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      const fence = line.match(/^```\s*([\w+-]*)/);
      if (fence) {
        const buf = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++;
        const lang = fence[1] || "";
        out.push(`<pre${lang ? ` data-lang="${esc(lang)}"` : ""}><code>${highlight(buf.join("\n"))}</code></pre>`);
        continue;
      }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { const lvl = h[1].length >= 4 ? 4 : 3; out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); i++; continue; }

      if (/^>\s?/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
        out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
        continue;
      }
      if (/^\s*([-*]|\d+[.)])\s+/.test(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const start = ordered ? parseInt(line.trim(), 10) : 1;
        const items = [];
        while (i < lines.length && /^\s*([-*]|\d+[.)])\s+/.test(lines[i])) {
          let item = lines[i++].replace(/^\s*([-*]|\d+[.)])\s+/, "");
          while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i])) item += " " + lines[i++].trim();
          items.push(`<li>${inline(item)}</li>`);
        }
        out.push(ordered ? `<ol${start > 1 ? ` start="${start}"` : ""}>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`);
        continue;
      }
      if (/^\|/.test(line) && i + 1 < lines.length && /^\|?\s*:?-{3,}/.test(lines[i + 1])) {
        const cells = (l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        const head = cells(line); i += 2;
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
        out.push(`<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${
          rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
        continue;
      }
      const buf = [line]; i++;
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) buf.push(lines[i++]);
      out.push(`<p>${inline(buf.join(" "))}</p>`);
    }
    return `<div class="md">${out.join("")}</div>`;
  }

  /* ------------------------------------------------------------------ *
   * Sidebar
   * ------------------------------------------------------------------ */
  let collapsed = store.get(KEYS.collapsed, {});

  function renderSidebar() {
    const nav = $("#sidebar");
    nav.innerHTML = `
      <button class="side-search" data-open-palette aria-label="Skill yoki mavzu qidirish">${icon("search")}<span>Skill yoki mavzu qidiring…</span><kbd>/</kbd></button>
      <div class="side-levels" role="group" aria-label="Global daraja filtri">${CAREER_LEVELS.map((l) => `<button type="button" data-glevel="${l.id}" aria-pressed="${globalLevels.has(l.id)}" style="--lvl-color:${l.color}">${l.label}</button>`).join("")}</div>
      ${GROUPS.map((g) => `
        <div class="side-group" data-group="${g.id}" data-collapsed="${!!collapsed[g.id]}">
          <button class="side-group-btn" aria-expanded="${!collapsed[g.id]}" aria-controls="sg-${g.id}">
            ${icon(g.icon)}<span>${esc(g.title)}</span><span class="count">${g.items.length}</span>${icon("chev-down", "ic ic-sm chev")}
          </button>
          <ul class="side-list" id="sg-${g.id}">
            ${g.items.map((s) => `
              <li><a class="side-link" href="#/s/${s.slug}" data-slug="${s.slug}">
                <span class="num">${pad(s.num)}</span><span class="t">${esc(s.title)}</span><span class="pct" data-pct="${s.slug}"></span>
              </a></li>`).join("")}
          </ul>
        </div>`).join("")}`;
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".side-group-btn");
      if (!btn) return;
      const grp = btn.parentElement;
      const now = grp.dataset.collapsed !== "true";
      grp.dataset.collapsed = String(now);
      btn.setAttribute("aria-expanded", String(!now));
      collapsed[grp.dataset.group] = now;
      store.set(KEYS.collapsed, collapsed);
    });
    updateSidebarProgress();
  }

  function updateSidebarProgress(onlySlug) {
    (onlySlug ? [BY_SLUG[onlySlug]] : SKILLS).forEach((s) => {
      const el = $(`[data-pct="${s.slug}"]`);
      if (!el) return;
      const p = pct(statsFor(s.subskills).progress);
      el.textContent = p ? `${p}%` : "";
      el.classList.toggle("done", p === 100);
    });
  }

  // section: home | skills | levels | interview | quiz — sidebar faqat "skills" bo'limida ko'rinadi
  function markActive(section, slug = null) {
    document.body.dataset.section = section;
    const pb = $("#profile-btn");
    if (pb) { if (section === "profile") pb.setAttribute("aria-current", "page"); else pb.removeAttribute("aria-current"); }
    $$(".primary-nav a").forEach((a) => {
      if (a.dataset.nav === (section === "skills" ? "stacks" : section)) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    $$(".side-link").forEach((a) => {
      if (a.dataset.slug === slug) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (slug) {
      const link = $(`.side-link[data-slug="${slug}"]`);
      const grp = link && link.closest(".side-group");
      if (grp && grp.dataset.collapsed === "true") grp.querySelector(".side-group-btn").click();
      if (link) {
        const nav = $("#sidebar"), r = link.getBoundingClientRect(), nr = nav.getBoundingClientRect();
        if (r.top < nr.top + 40 || r.bottom > nr.bottom - 40) link.scrollIntoView({ block: "center" });
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Views
   * ------------------------------------------------------------------ */
  const view = () => $("#view");

  function loadErrorBlock() {
    if (!LOAD_ISSUES.length) return "";
    return `<div class="load-error" role="alert">
      <h3>${icon("alert")}${LOAD_ISSUES.length} ta ma'lumot fayli yuklanmadi</h3>
      Odatda bu fayldagi sintaksis xatosi (yopilmagan qo'shtirnoq, ortiqcha vergul va h.k.) sababli bo'ladi.
      <ul>${LOAD_ISSUES.map((x) => `<li>data/skills/${esc(x.file)} — ${esc(x.msg)}</li>`).join("")}</ul>
    </div>`;
  }

  function statusLegend(counts) {
    return `<div class="status-legend">${STATUSES.map((s, i) =>
      `<span data-st="${i}"><i class="st-dot"></i>${s.label} <b>${counts[i]}</b></span>`).join("")}</div>`;
  }

  const TECH_STACK = [
    { title: "PHP", ver: "7.4+ → 8.4", desc: "Tipizatsiya, Attributes, Enums, Fibers, JIT, OPcache va Property Hooks.", tags: ["PHP 8.3/8.4", "OOP", "OPcache", "JIT"], slug: "php", icon: "code" },
    { title: "Laravel Framework", ver: "10+ / 11+", desc: "Service Container, Eloquent ORM, Pipeline, Octane, Reverb va Artisan ekotizimi.", tags: ["Laravel 11", "Eloquent", "Octane", "Artisan"], slug: "laravel", icon: "rocket" },
    { title: "MySQL & PostgreSQL", ver: "MySQL 8.0+ / PG 15+", desc: "InnoDB, ACID, B-Tree indekslar, EXPLAIN, Partitioning va Tranzaksiyalar.", tags: ["MySQL 8", "PostgreSQL", "ACID", "Indexes"], slug: "mysql", icon: "database" },
    { title: "Redis In-Memory", ver: "Redis 7.0+", desc: "Cache-Aside, Distributed Lock (Redlock), Streams, Pub/Sub va Eviction siyosatlari.", tags: ["Redis 7", "Cache-Aside", "Redlock", "Streams"], slug: "redis", icon: "gauge" },
    { title: "Docker & Compose", ver: "Docker 24+ / Compose v2", desc: "Multi-stage Dockerfile, Alpine, konteynerlar izolyatsiyasi, volume va tarmoqlar.", tags: ["Multi-stage", "Alpine", "Compose", "Linux"], slug: "docker", icon: "boxes" },
    { title: "Nginx & PHP-FPM / Octane", ver: "Nginx 1.24+ / FastCGI", desc: "pm.max_children tuning, Reverse Proxy, FrankenPHP, Swoole va HTTP/2 / HTTPS.", tags: ["PHP-FPM", "Nginx", "FrankenPHP", "FastCGI"], slug: "php-fpm", icon: "server" },
    { title: "Laravel Horizon & Queues", ver: "Horizon 5+ / Queues", desc: "Asinxron ishlov, Idempotent job'lar, auto-balancing, batching, chaining va Supervisor.", tags: ["Horizon", "Queues", "Supervisor", "Workers"], slug: "queues-and-background-jobs", icon: "queue" },
    { title: "RabbitMQ & Apache Kafka", ver: "RabbitMQ 3.12+ / Kafka 3+", desc: "Event-Driven arxitektura, xabarlar brokiri, stream processing va consumer groups.", tags: ["RabbitMQ", "Kafka", "EDA", "Events"], slug: "rabbitmq", icon: "branch" },
    { title: "Sanctum & API Security", ver: "Sanctum / OAuth 2.0", desc: "SPA Cookie-based sessiyalar, Bearer API Tokenlar, HMAC webhooks, CSRF va OWASP himoyasi.", tags: ["Sanctum", "OAuth 2.0", "HMAC", "OWASP Top 10"], slug: "laravel-sanctum", icon: "shield" },
    { title: "Pest & PHPUnit", ver: "Pest v2/v3 · PHPUnit 10+", desc: "Unit, Feature va Architecture testing (`arch()`), Mocking, Fake va TDD metodologiyasi.", tags: ["Pest PHP", "PHPUnit 10", "Arch Testing", "TDD"], slug: "pest", icon: "flask" },
    { title: "PHPStan & Larastan", ver: "Level 8 / Max", desc: "Statik kod tahlili, qat'iy tiplar nazorati, yashirin buglarni CI bosqichidayoq aniqlash.", tags: ["Larastan", "Level 8+", "Strict Types", "CI/CD"], slug: "phpstan", icon: "check" },
    { title: "DDD & Clean Architecture", ver: "Hexagonal / DDD", desc: "Entities, Value Objects, Aggregate Roots, Dependency Inversion va Bounded Contexts.", tags: ["DDD", "Clean Arch", "SOLID", "Patterns"], slug: "domain-driven-design-ddd", icon: "layers" },
  ];


  /* Texnologiyalar steki: ikonkalar karuseli (hover'da to'xtaydi) + 3 ustunli kartalar */
  function stkCard(x) {
    return `<li><a class="stk" href="#/s/${x.slug}">
      <div>
        <div class="stk-head"><span class="stk-ic">${icon(x.icon)}</span><em>${esc(x.ver)}</em></div>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.desc)}</p>
        <div class="stk-tags">${x.tags.map((g) => `<span>${esc(g)}</span>`).join("")}</div>
      </div>
      <div class="stk-foot"><span>Xaritada o'rganish</span><b>Ko'rish ${icon("arrow-right", "ic ic-sm")}</b></div>
    </a></li>`;
  }
  /* Brend logolari: simple-icons (CC0) SVG yo'llari, offline ishlashi uchun ichiga joylangan */
  const TECH_PATHS = {"php": "M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z", "laravel": "M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z", "composer": "M16.66 0c-.07 0-.114.034-.164.095a.416.416 0 00-.07.43c.19.41.363.83.528 1.25.01.02.022.04.039.068-.04-.002-.05-.022-.063-.043-.297-.31-.648-.557-.998-.804-.473-.337-.99-.603-1.503-.872a.578.578 0 00-.214-.065l-.384-.04c-.202-.025-.355.09-.355.292 0 .108-.046.132-.135.14-.08.004-.187.115-.196.192a.694.694 0 00.228.619c.444.415.873.845 1.303 1.275l.015.007a.1.1 0 01.028.038c-.007.003-.014.003-.02.003a.057.057 0 01-.035-.022c-.002-.002-.005-.005-.005-.007-.062-.036-.127-.07-.187-.11-.3-.2-.595-.404-.895-.598a.943.943 0 00-.461-.17.453.453 0 00-.392.143.28.28 0 00-.088.253c.016.146.115.237.223.312.502.338.95.734 1.366 1.174.036.038.074.079.115.112.118.096.19.224.262.356.033.06.02.074-.043.074-.428 0-.836.118-1.246.204-.168.036-.334.094-.394.28-.065.21-.096.328.16.392a9.57 9.57 0 011.49.516.55.55 0 01.117.077c.12.104.23.219.362.303.38.247.77.478 1.22.583.053.012.1.039.15.05.05.015.085.044.095.094.029.178.139.279.305.33.02.006.038.02.06.028.052.017.076.055.093.108.067.24.137.478.212.715.026.08.002.1-.07.123-.372.108-.742.22-1.112.334-.132.04-.134.043-.067.163l.908 1.635c.127.23.132.23.365.11.024-.012.057-.053.079-.014.02.036.06.089.024.13-.113.129-.19.28-.286.42-.031.045-.031.074-.005.117.1.166.202.334.3.502.012.019.034.043.03.058l-.123.367a2.538 2.538 0 00-.317-.716c-.18-.288-.41-.542-.62-.811-.033-.04-.072-.077-.11-.115-.2-.207-.456-.332-.7-.478a1.026 1.026 0 00-.34-.127c-.374-.08-.746-.11-1.12.004-.075.024-.116.005-.161-.06-.092-.127-.166-.273-.29-.372-.3-.24-.616-.458-.985-.583a2.95 2.95 0 00-.865-.168 4.267 4.267 0 00-.463.017c-.396.03-.79.074-1.14.293-.07.043-.15.067-.221.108-.36.194-.716.386-1.016.679a13.1 13.1 0 00-.897.944c-.322.384-.565.818-.783 1.267-.015.03-.022.07-.07.096l-.12-.744c-.007-.046.022-.043.053-.038.089.01.175.014.264.026.067.01.103-.005.12-.08.022-.102.046-.206.067-.311.082-.397.2-.78.303-1.17.02-.074.007-.1-.07-.12-.381-.09-.763-.192-1.145-.283-.072-.017-.106-.043-.084-.12.087-.298.125-.61.242-.9a.178.178 0 01.056-.087c.098-.076.17-.165.16-.302-.007-.103.041-.168.14-.214.182-.086.358-.187.53-.288a.84.84 0 00.327-.333c.322-.605.59-1.242.98-1.81.033-.051.06-.106.1-.15.252-.264.488-.544.771-.78.089-.074.113-.175.115-.285 0-.128-.074-.217-.151-.305-.075-.087-.151-.161-.279-.147-.028.003-.057-.01-.088-.014.019-.04.05-.048.076-.065.339-.218.677-.437 1.016-.658.41-.264.819-.53 1.232-.794.052-.034.076-.06.019-.11-.015-.013-.024-.03-.036-.044-.084-.099-.084-.099-.2-.03L8.084 3.693c-.101.062-.101.062-.152-.05-.112-.263-.177-.54-.261-.81-.02-.062-.003-.098.045-.137.289-.23.553-.49.82-.742a.604.604 0 00.186-.37c.022-.17-.09-.259-.244-.196a1.707 1.707 0 00-.221.105c-.68.375-1.405.632-2.149.848-.043.012-.082.026-.118-.02-.074-.09-.185-.14-.278-.208a.073.073 0 00-.063-.015c-.1.027-.204.056-.266.147-.159.233-.358.44-.507.682-.17.28-.333.562-.525.828-.036.05-.05.058-.084-.002L3.63 2.635a2.837 2.837 0 00-.223-.338c-.094-.118-.209-.176-.358-.16-.026.004-.06-.004-.07.037-.02.11-.07.226-.057.332.034.27.082.542.15.806.114.459.244.912.38 1.364.133.444.282.88.426 1.323.012.038.033.072-.02.103-.067.038-.175.058-.187.125-.012.07.05.15.08.225l.007.017c.024.058.036.144.08.166.057.029.11-.05.162-.082.048-.03.065-.021.087.029.124.293.252.583.38.876a.18.18 0 01.006.137 4.138 4.138 0 00-.192.72c-.012.07-.038.07-.09.055a107.637 107.637 0 00-.834-.21c-.123-.032-.123-.032-.137.093v.01c-.06.665-.12 1.33-.183 1.994-.004.06.003.085.068.092.194.024.386.055.578.084.036.005.067.007.058.06-.043.225-.077.453-.125.677a.178.178 0 00.034.163l.2.264c.045.063.08.144.037.209a.201.201 0 00-.033.118c.007.415.007.83.026 1.246.01.2.007.403.012.605.01.535.04 1.068.06 1.603.01.262-.036.52-.024.783.002.065.017.1.084.122.16.05.312.116.473.166a.28.28 0 01.185.156.436.436 0 01.038.219c-.002.072.024.115.082.156.247.177.492.36.74.542.65.48 1.3.963 1.954 1.44.06.045.074.081.038.146-.034.062-.055.135-.089.197-.029.058-.024.094.031.134.082.058.161.123.236.188.065.055.067.141.048.208-.015.05-.087.005-.132 0-.032-.002-.063-.01-.094-.014-.31-.05-.617-.13-.932-.156-.5-.04-1.003-.084-1.51-.07-.026 0-.067-.024-.074.03-.007.042-.017.088.031.117.024.014.05.026.077.036.283.098.547.24.807.39.168.095.333.203.518.268.034.012.068.038.108.002-.278-.22-.554-.442-.833-.665.04-.029.07-.017.1-.014.332.026.664.072.988.15.713.17 1.421.361 2.122.572.23.07.475.104.682.243.05.033.08.067.074.13.012.014.027.033.01.045-.02.012-.036-.012-.05-.024-.164-.014-.327-.026-.488-.043-.463-.046-.924-.11-1.392-.096-.35.01-.701-.015-1.05.01-.494.033-.989.098-1.48.15-.025.003-.063-.002-.063.027 0 .036.014.077.06.087a.58.58 0 00.113.012c.25.01.497.007.746.011.62.015 1.242-.012 1.86.041.224.02.45.01.668.05 1.03.193 2.055.394 3.078.618.12.026.243.045.36.103-.055.05-.127.065-.158.137-.22.506-.363 1.04-.53 1.563-.03.09.03.192.12.216a.278.278 0 00.352-.22c.02-.109.039-.217.053-.328.005-.036.017-.055.053-.067.132-.053.26-.108.393-.16a1.63 1.63 0 00.529-.325c.134-.127.247-.274.25-.47 0-.06.014-.099.062-.135.22-.17.418-.365.61-.564a6.03 6.03 0 01.6-.533c.024-.02.043-.048.08-.034l.56.221c-.374.228-.73.447-1.082.66-.017.01-.036.015-.053.02a.813.813 0 00-.338.201c-.375.372-.567.814-.545 1.35.014.36.22.53.57.45.616-.145 1.14-.734 1.233-1.38.024-.18.052-.357-.077-.513a2.25 2.25 0 00-.178-.195c.02-.012.029-.019.039-.026.777-.463 1.625-.778 2.475-1.07 1.04-.359 2.1-.644 3.164-.918l-.075-.017c-.07.007-.136.015-.206.02a5.097 5.097 0 00-.872.134l-.016.007a.226.226 0 01-.094.015c-.014 0-.03 0-.048.002.065-.062.252-.264.303-.25l.002-.005h.005c0-.007.019-.02.019-.02.017-.03.04-.049.074-.05a.694.694 0 01.197-.189c.05-.03.103-.062.16-.086h-.001c.16 0 .319-.194.486-.262-.001-.006-.01-.01-.013-.017-.24.034-.476.072-.706.16-.492.181-1.001.323-1.481.534-.742.324-1.482.648-2.195 1.035a.818.818 0 01-.077.036l-.055-.504c-.005-.034.012-.048.04-.063.632-.334 1.266-.665 1.926-.938.543-.226 1.08-.47 1.626-.691.002-.005.005-.01.01-.01h.004c.003 0 .003.003.005.003.007.012.002.02-.005.026-.002.003-.005.003-.01.005h-.002a3.358 3.358 0 00-.372.66c.038.01.053-.003.067-.018.113-.12.226-.237.336-.357.214-.234.44-.458.704-.64.017-.012.045-.022.033-.048-.014-.03-.045-.015-.067-.01-.247.05-.494.096-.74.154-.081.019-.076-.01-.08-.067-.001-.197.028-.39.035-.586a.63.63 0 01.058-.247c.098-.226.197-.45.297-.675.05-.113.08-.233.099-.353.03-.192.055-.386.074-.58.03-.3.137-.58.187-.875.065-.374.118-.751.257-1.11.125-.316.245-.633.372-.947.176-.428.399-.833.505-1.29.036-.158.076-.302.004-.458-.04-.084-.052-.18-.081-.271a.392.392 0 01-.012-.204c.048-.245.07-.488-.063-.716-.036-.062.008-.1.044-.14.088-.09.093-.131.016-.23-.088-.11-.175-.223-.27-.326-.08-.084-.154-.175-.234-.262-.055-.033-.05-.055.012-.076.14-.048.276-.108.418-.152.08-.024.1-.07.106-.141.045-.605.09-1.213.139-1.818.007-.084-.007-.1-.094-.074-.454.144-.907.28-1.363.422-.14.044-.142.044-.204-.093-.231-.52-.411-1.057-.6-1.59a.392.392 0 01.007-.316c.067-.188.024-.377.019-.567a.104.104 0 01-.005-.03 9.16 9.16 0 00-.254-1.547 6.02 6.02 0 00-.5-1.27c-.228-.432-.473-.86-.737-1.275-.113-.178-.233-.339-.434-.427A.702.702 0 0016.66 0zm-2.642.26a.364.364 0 01.2.051 19.041 19.041 0 011.469.805c.247.158.482.338.715.52.11.087.192.217.284.33.038.047.012.09-.024.124-.024.024-.058.039-.087.055-.031.022-.072.04-.06.087.01.04.055.05.09.058a.27.27 0 00.16-.015c.168-.07.31.048.418.166.028.03.04.093.093.074.055-.021.063-.081.058-.137-.012-.15-.05-.297-.084-.444-.09-.377-.27-.718-.418-1.073-.053-.127-.11-.254-.163-.382-.03-.07.01-.132.048-.182.03-.04.08-.005.122.014.152.068.238.19.312.332.08.15.178.29.262.436.144.255.322.495.437.762.168.388.382.758.483 1.176.086.37.208.732.252 1.114.016.144-.01.283.007.422.033.279-.008.543-.123.798-.03.07-.021.136.012.208.252.533.46 1.083.67 1.635.027.072.015.1-.06.123-.482.14-.965.288-1.447.434-.07.022-.092.003-.113-.06-.123-.326-.24-.646-.353-.967-.024-.068-.053-.104-.128-.087-.088.022-.136-.017-.175-.096-.062-.127-.113-.28-.216-.36-.103-.08-.266-.082-.403-.115-.103-.027-.207-.058-.312-.075a1.428 1.428 0 01-.612-.273c-.303-.224-.615-.43-.934-.627-.104-.007-.202-.036-.303-.06-.278-.057-.554-.117-.833-.17-.067-.012-.08-.063-.084-.108-.007-.056.007-.11.065-.144.089-.053.19-.063.29-.08a9.69 9.69 0 011.345-.13c.11-.002.209.04.312.066a.18.18 0 00.166-.03c.216-.143.434-.28.65-.422.034-.021.096-.036.07-.093a.083.083 0 00-.015-.022c-.012-.01-.026-.012-.043-.012l-.05.002h-.007a1.159 1.159 0 00-.668.2c-.08.05-.26.019-.31-.056-.34-.516-.823-.888-1.282-1.29-.204-.176-.403-.361-.62-.525-.054-.04-.08-.144-.042-.196.048-.072.11-.041.168-.015.185.082.362.175.528.293.564.403 1.17.744 1.772 1.085a.51.51 0 00.05.027c.092.03.14-.01.125-.106a.267.267 0 00-.062-.134c-.488-.574-1.001-1.124-1.506-1.683-.105-.116-.23-.216-.348-.32a.854.854 0 01-.22-.278.16.16 0 01.023-.19c.04-.045.077-.055.137-.024.17.082.332.178.483.293.266.202.535.403.804.605l.807.603c.02.017.043.033.062.05.05.046.094.094.142.142l.029.029c.019.019.036.045.06.06.055.033.112.062.17.004.02-.02.029-.036.03-.055 0-.007.004-.014 0-.021l-.001-.01a.171.171 0 00-.043-.072l-.18-.187a4.537 4.537 0 00-.312-.298c-.35-.29-.706-.571-1.066-.845-.183-.14-.397-.233-.596-.348-.072-.041-.12-.101-.173-.159a.144.144 0 01-.024-.15c.022-.054.075-.051.12-.056zM8.252 1.649a.045.045 0 01.029.005c.048.027.03.077.03.135.013.06-.026.11-.08.16-.346.322-.707.627-1.076.922-.147.118-.327.173-.49.262-.034.017-.053 0-.072-.024-.12-.154-.238-.31-.358-.463-.045-.055.017-.053.046-.065.254-.091.504-.195.756-.295.365-.144.696-.35 1.04-.533.036-.02.07-.043.105-.063.024-.01.044-.037.07-.041zm-2.619.83a.223.223 0 01.134.064c.072.067.13.144.18.228.173.28.413.506.646.737.163.163.33.32.502.47.057.05.067.127.098.192.012.024.002.043-.02.055-.011.008-.023.013-.03.02-.142.12-.276.103-.442.019a3.182 3.182 0 01-.864-.646c-.01-.01-.02-.017-.03-.024-.114-.086-.12-.082-.17.05-.052.135-.086.274-.146.404-.022.045.012.094.046.127.038.039.064.099.134.089.031-.005.048-.022.055-.055.017-.08.04-.16.06-.257.262.22.553.39.84.583l-.278.159c-.713.4-1.428.8-2.139 1.205-.058.03-.082.038-.106-.034-.273-.847-.56-1.69-.79-2.552-.052-.2-.074-.408-.112-.612-.012-.06.028-.091.067-.113.053-.026.055.036.074.06.377.52.634 1.11.941 1.669.092.168.195.33.293.497.02.03.034.057.082.04.053-.02.043-.052.034-.09-.039-.174-.128-.33-.193-.493a.18.18 0 01.003-.16c.137-.284.33-.531.48-.803.14-.247.317-.468.451-.717a.205.205 0 01.2-.111zm1.774.492c.014.003.024.016.036.042.12.27.201.555.302.83.01.027.012.049-.017.066l-.256.158c-.008.005-.017.007-.046.02-.007-.013-.017-.034-.031-.051l-.54-.62c-.024-.028-.048-.055 0-.081.177-.101.312-.264.499-.35.024-.011.04-.017.053-.014zm1.929.486a.204.204 0 01.14.046.21.21 0 01.08.218.556.556 0 01-.161.29 5.528 5.528 0 00-.882 1.093c-.228.36-.453.718-.624 1.11a.768.768 0 01-.146.206c-.24.273-.526.485-.855.638a.17.17 0 00-.108.159c-.005.06-.024.118-.029.178a.48.48 0 01-.19.38c-.04.032-.045.083-.06.126l-.273.915c0 .007 0 .014-.002.019 0 .014.002.03-.017.038-.04.01-.077-.002-.113-.021a41.397 41.397 0 01-1.33-.334c-.055-.012-.108-.03-.166-.036-.088-.012-.096-.053-.055-.12.058-.281.125-.56.298-.797.038-.053.036-.096.002-.154-.19-.317-.334-.658-.492-.99-.026-.054-.017-.08.034-.11A574.255 574.255 0 006.97 4.706c.045-.03.089-.012.132-.022.151-.034.298-.08.43-.163.01-.007.026-.012.03-.022.097-.213.31-.286.49-.37.411-.187.826-.36 1.189-.633a.18.18 0 01.095-.04zm11.443 3.772v.005l.002-.001c-.021.256-.043.498-.062.74l-.043.535c-.005.065-.024.106-.094.13a561.275 561.275 0 00-3.37 1.17l-.04.009c-.035.005-.054-.012-.08-.055-.217-.394-.438-.785-.661-1.177-.03-.05-.038-.077.034-.096l4.254-1.246c.014-.005.03-.007.06-.014zm-.41.386c-.154.003-.293.147-.286.293.007.137.124.257.254.252.137-.002.27-.153.267-.302-.005-.166-.082-.245-.236-.243zm-16.83.87c.01 0 .024.002.04.007L5.512 9l1.937.51c.062.017.082.036.06.1l-.278.913c-.01.036-.017.074-.058.074a.06.06 0 01-.02-.002l-1.036-.142c-.226-.03-.45-.062-.675-.093a254.996 254.996 0 00-2.055-.286c-.043-.012-.058-.038-.05-.098.052-.476.103-.951.153-1.43.003-.011.002-.02.005-.03a.035.035 0 00.005-.015c.007-.014.021-.02.038-.02zm8.136.103l.113.002c.197.01.389.086.569.166.08.036.159.07.238.108l.057.029c.058.028.118.057.173.09l.113.065c.036.025.075.046.108.073.072.05.142.105.207.165.218.202.372.44.463.72.065.202.113.409.13.617.016.202-.044.399-.096.593-.008.03-.02.036-.03.034-.014-.005-.021-.022-.033-.036l-.216-.25a2.105 2.105 0 00-1.042-.684 4.159 4.159 0 00-.994-.154 3.799 3.799 0 00-.804.092c-.211.04-.423.074-.631.113-.137.024-.262.086-.387.14-.06.028-.12.054-.18.077l-.02.004c-.376.132-.695.36-1.024.57-.09.06-.165.14-.243.218l-.01.008-.064.065c-.152.147-.3.296-.464.43-.074.103-.175.175-.268.266.024-.17.07-.328.146-.472a4.6 4.6 0 01.262-.435c.048-.07.096-.14.146-.206a7.17 7.17 0 01.315-.396c.081-.097.163-.193.247-.29l.25-.284a.917.917 0 01.115-.1l.026-.03c.078-.066.147-.136.238-.21l.012-.01.067-.061c.24-.228.519-.406.797-.583.028-.02.057-.035.086-.051l.111-.048c.01-.004.02-.01.029-.012a2.78 2.78 0 01.173-.065l.117-.036c.14-.04.279-.074.416-.117a2.45 2.45 0 01.782-.115zm-7.57.449c-.07.004-.153-.003-.215.057a.462.462 0 00.012.665.286.286 0 00.38 0c.145-.127.182-.314.095-.535-.053-.137-.125-.187-.27-.187zm15.846.062c.087-.001.163.053.23.146.014.01.029.02.043.032.022.019.03.04.053.064.099.113.207.224.31.334a.064.064 0 01.014.024.023.023 0 01-.002.022.04.04 0 01-.015.014l-.01.015-.002.002c-.002.002-.002.005-.004.01 0 .002-.003.004-.003.004h.003v.008c-.145.146-.106.283.01.415.006.012.014.024.014.036.096.127.016.254 0 .382-.003.012-.005.016-.015.02l-.007.004a.116.116 0 01-.03-.005l-.01-.003a9.772 9.772 0 01-.251-.077c-.007 0-.012-.004-.02-.007-.006 0-.011-.007-.018-.007a.284.284 0 01-.118-.02.252.252 0 00-.292.05.054.054 0 01-.005.02c.04.06.108.075.168.094.245.08.453.23.68.348.052.03.062.092.057.152-.003.033-.012.067-.02.103l-.072.31a.127.127 0 01-.02.076c.004.168-.114.293-.17.437-.006.012-.011.017-.02.04a3.223 3.223 0 01-.128.299c0 .007-.01.017-.012.024v-.005c0 .002-.002.002-.002.005l-.005.01c-.003.002-.003.004-.005.007-.012.045-.02.093-.058.132a1.913 1.913 0 01-.187.432c-.007.012-.012.012-.017.036-.062.144-.127.317-.19.475-.014.058-.026.115-.04.17l-.008.015c0 .002-.002.002-.002.005 0 .005-.005.01-.007.014a.45.45 0 01-.036.192c-.012.039-.022.082-.034.12a.074.074 0 01-.005.02l-.201.912c-.055.25-.077.504-.118.754-.038.235-.048.477-.106.708-.04.168-.136.324-.213.48-.072.146-.118.302-.207.444l-.007.015a.169.169 0 00-.012.03c-.002.006-.002.013-.005.018l-.007.033a.182.182 0 00-.002.036c0 .012 0 .024-.003.036v.036a.71.71 0 01-.002.072c-.02.257-.053.514-.041.773.002.048-.012.075-.058.09l-.057.023a1.598 1.598 0 00-.113.048l-.06.024c-.031.012-.05.022-.1.034v-.005s-.006.005-.01.005l-.133.055-.093.038a.635.635 0 01-.211.092l-.036.02a25.181 25.181 0 00-.474.212c-.081.024-.165.072-.247.11-.09.04-.175.075-.264.114-.14.062-.278.12-.418.181-.004.002-.012 0-.016 0-.128.048-.26.118-.38.173-.048.026-.117.053-.177.077-.11.043-.135.038-.16-.075-.071-.052-.078-.14-.104-.216-.027-.072-.048-.15-.072-.222-.005-.024-.017-.02-.017-.034-.024-.033-.024-.064-.036-.098l-.003-.017c-.007-.005-.007-.012-.01-.02l-.006-.016h.004c-.033-.1-.07-.2-.093-.3-.024-.067-.067-.132-.08-.202a.17.17 0 010-.07l.008-.033.004-.017c.02-.047.05-.093.075-.14.017-.037.03-.076.048-.114.017-.038.03-.067.048-.115.038-.072.062-.156.11-.24 0-.02.015-.04.02-.058.043-.146.09-.295.149-.437 0-.005-.005-.012-.003-.017.017-.086.098-.117.146-.168v.003c.024-.008.037-.022.049-.022.014-.024.028-.034.043-.048a1.518 1.518 0 00.108-.15c.045-.066.086-.136.137-.203.016-.021.03-.055.057-.055.005 0 .007 0 .012.002.039.01.027.055.022.084a.88.88 0 000 .327c.012.084.026.168.033.252l-.002.038a.578.578 0 01.036.19c.02.082.036.16.06.242.072.15.125.3.173.454l.005-.002c.08.12.163.26.245.39.024.032.05.066.074.09h.005v.02c.024 0 .036.052.072.004-.007-.024-.012-.024-.02-.024a.448.448 0 01-.03-.08c-.005-.016-.013-.035-.015-.05a.387.387 0 01-.012-.05c-.002-.007-.002-.017-.005-.024a.282.282 0 00-.01-.048l-.011-.075-.013-.074c-.007-.007-.007-.017-.007-.026-.002-.01-.004-.02-.01-.03-.002-.028-.007-.057-.011-.086l-.022-.172c-.002-.03-.012-.058-.014-.087a3.634 3.634 0 01.036-.941h.014c.029-.144.058-.31.086-.466.008 0 .015.003.024.003-.01.26.017.52.075.775.002.005.002.012.002.017.036.098.075.197.106.298.007.02.014.043.022.062a.338.338 0 00.055.094c.007.012.02.024.02.036.025.019.037.04.057.06.014.016.026.036.04.053.05.048.104.093.166.156a3.667 3.667 0 01-.017-.14c-.004-.043-.012-.086-.016-.134 0 0-.013-.007-.013-.012a.82.82 0 00-.01-.108l-.04-.33c0-.01 0-.016.002-.025 0-.01.003-.027.003-.027a2.705 2.705 0 01-.02-.415l-.002-.017a1.122 1.122 0 01-.002-.37c.005-.033.002-.07.005-.103 0-.007-.003-.012-.003-.02 0-.158.007-.32.055-.472l.003-.017c.012-.072.024-.158.036-.238.012-.08.024-.16.033-.24.005-.033.015-.05.034-.05.01 0 .024.005.04.017l.05.03.076.049c.024.017.048.033.07.055.002.002.004.005.009.007a.116.116 0 00.017.012h.005v-.002c.168.084.26.226.374.358a.31.31 0 01.11.15c.075.099.13.205.169.323.002.01.007.02.01.03.002.01.007.006.009.03.02.024.03.055.043.084l.034.084.019.04c.005.01.01.017.017.024a.07.07 0 00.04.024c.027-.088-.035-.172-.011-.256h.007c0-.024-.007-.025-.007-.037-.024-.156-.044-.31-.11-.453l-.001-.04c-.058-.143-.086-.29-.17-.416a.103.103 0 01-.037-.063c-.026-.024-.04-.053-.055-.081a4.135 4.135 0 01-.038-.063v.017c0-.002-.005-.005-.005-.007v-.003a2.828 2.828 0 00-.22-.278l-.01-.01c-.01-.01-.02-.01-.03-.033-.057-.024-.112-.096-.17-.147-.007-.007-.014-.01-.02-.017-.004-.004 0-.01-.023-.016-.12-.082-.21-.183-.314-.255-.02-.024-.044-.01-.053-.048.31-.02.61.017.922.036v-.012h.002c.154.024.298.053.437.113.005 0 .01.007.017.007v.005c.096.022.187.065.278.108.02.01.044.04.065.012.017-.024-.01-.046-.024-.065-.036-.05-.07-.1-.108-.151-.007-.012-.02-.024-.02-.036-.071-.07-.126-.15-.19-.22a.953.953 0 01-.06-.063 1.162 1.162 0 01-.208-.17c-.012-.008-.024-.022-.036-.022-.03 0-.064-.034-.096-.056-.03-.021-.064-.04-.096-.062-.012-.007-.024-.012-.036-.02-.146-.055-.293-.105-.44-.16-.004 0-.013-.003-.013-.005 0 0-.013 0-.017-.002a.11.11 0 01-.072-.03.079.079 0 01-.027-.035l-.005-.012c-.007-.02-.01-.041-.007-.063a.968.968 0 00-.012-.22c-.002-.022-.007-.041-.012-.063a2.158 2.158 0 00-.014-.06l-.015-.062a2.29 2.29 0 00-.024-.09s-.01-.002-.01-.01c-.023-.145-.08-.292-.124-.436l-.017-.057a.369.369 0 01-.057-.168c0-.02 0-.036.002-.056l.002-.026c.005-.027.01-.055.02-.082l.033-.108c0-.005 0-.017.003-.017h-.003c.03-.17.099-.314.147-.468 0-.002.005-.002.005-.005l.01-.01c.002-.002.004-.002.004-.004a.265.265 0 00.053-.185.326.326 0 00-.027-.103c-.016-.043-.038-.084-.06-.127-.002-.005-.01-.01-.014-.012-.002-.003-.005-.005-.005-.008a1.196 1.196 0 01-.21-.355l-.015-.038c-.005-.005-.005-.01-.008-.017l-.002-.007a.12.12 0 01-.007-.017l.002.002-.002-.005a.276.276 0 01.012-.043c.004-.01.01-.017.014-.026.005-.007.012-.014.02-.022l.009-.007c.065-.094.125-.192.197-.283a.26.26 0 00.05-.252c-.04-.137-.036-.14.1-.19.025-.01.316-.12.433-.156l.075-.03.019-.006a41.644 41.644 0 01.509-.19c.005-.002.012-.002.017-.002.14-.072.293-.118.44-.168.02-.007.037-.015.06-.02.025-.02.097-.035.12-.055.12-.038.217-.093.325-.117a.287.287 0 01.167-.067zm-5.432.603a.82.82 0 01.23.036l.014.004c.259.08.523.142.77.26.04.019.084.038.113.077.16.115.307.247.43.405.19.245.38.492.557.773-.011-.003-.022-.008-.034-.013v-.001a1.018 1.018 0 01-.185-.103 6.452 6.452 0 00-.674-.356 1.467 1.467 0 00-.331-.1 3.307 3.307 0 00-.91-.041c-.084.007-.17 0-.255 0-.062 0-.091-.03-.091-.092 0-.235.012-.472-.06-.7-.015-.048.014-.068.055-.082a1.12 1.12 0 01.372-.067zm-2.75.773c.423-.015.812.105 1.167.324.132.08.253.176.363.284l.014.013c.122.123.23.26.32.41.08.13.059.272.032.414-.072.406-.316.706-.592.987-.265.269-.596.444-.903.648-.435.29-.932.403-1.438.478-.632.093-1.273.103-1.906.187-.23.029-.464.048-.694.089a1.07 1.07 0 00-.68.41c-.062.084-.1.187-.16.303a.527.527 0 01.026-.394 1.12 1.12 0 01.533-.54c.415-.22.879-.262 1.323-.375.36-.091.73-.144 1.087-.242a7.234 7.234 0 001.426-.55c.24-.125.49-.252.656-.485a.73.73 0 00.12-.557c-.005-.034-.015-.05-.027-.053-.012-.002-.03.007-.05.027-.18.16-.367.314-.571.449-.32.206-.673.33-1.038.42-.58.144-1.166.266-1.764.31a4.84 4.84 0 00-1.239.242c-.34.118-.687.235-.96.49-.034.03-.075.057-.13.098l.007-.038-.026.019v-.005c.01-.006.016-.013.024-.017a.599.599 0 01.084-.2l.646-1.022a.285.285 0 01.041-.053c.334-.33.653-.677 1.023-.965.614-.48 1.284-.855 2.055-1.02.187-.041.377-.07.57-.07.22-.002.443-.01.66-.017zm-7.632.022c.013 0 .03.002.048.009.03.01.062.007.094.01.127.028.26.03.386.062.012 0 .017.002.034.01a2.174 2.174 0 01.4.057c.145.02.29.036.433.06.033 0 .062-.002.093.017.005 0 .012-.002.012 0 .168.02.3.03.445.055h-.015v.005c.096.012.16.024.233.036.077.012.156.03.23.03h.003c.007 0 .012.004.017.004l.021.005c.048.002.067.028.075.07.038.227.07.455.117.683 0 .017.01.032.008.046l.02.11.061.332c0 .01 0 .03.003.036v.01c.024.143.05.273.074.41v.046a1.717 1.717 0 00-.3.46c-.03.075-.07.152-.1.226l-.006.003c-.024.076-.062.15-.098.223-.003 0-.005.005-.007.01-.005.009-.008.024-.012.03v.003a2.478 2.478 0 01-.192.415c-.008.02-.024.039-.024.056-.024.09-.046.182-.092.266a.757.757 0 01-.074.226 2.102 2.102 0 01-.13.394c-.007.019-.019.036-.019.055l-.002.007c-.003.007-.005.02-.01.029a.106.106 0 01-.01.03l-.002.01-.038.742.021.008.094-.185c.031-.06.055-.123.09-.185.018-.043.05-.086.05-.13.071-.12.136-.24.21-.35.008-.012.022-.02.03-.043.062-.097.134-.224.208-.334.026-.043.054-.08.078-.123.016-.048.042-.055.064-.076.021-.022.033-.044.081-.065 0 .019.005.036.003.053l-.003.01c0 .009-.004.018-.007.028l-.002.01c-.003.007-.003.012-.005.019a.054.054 0 00-.002.02c0 .006-.005.01-.003.018l-.003.015h.003c-.022.144-.02.307-.024.458 0 .007-.005.02-.005.024l.005-.002c.02.144.043.288.062.432h-.002c.003 0 .005.03.005.043.024.144.055.29.072.437l.002.017c.003.01.005.017.005.026.024.116.11.195.163.296.039.055.08.12.116.168h.002v.002c.12.106.22.214.355.31.02 0 .039.024.058.024h-.002v.012c.048.005.088.043.139.029a.087.087 0 00.026-.012c.007-.005.017-.01.02-.017.011-.022-.01-.034-.027-.041-.197-.125-.166-.33-.19-.521h.008v-.003c.048.046.081.09.122.14a.1.1 0 00.024.026l.05.055c.034.036.07.07.108.1.039.032.08.066.125.09.02.007.039.024.056.024h-.005c.144.07.269.137.4.206a.15.15 0 01.08.036c.048.144.105.288.091.456.005 0 .01.017.012.03a.066.066 0 01-.002.03c.017.14.017.28-.003.42a.044.044 0 01-.002.039c-.003.005 0 .007-.002.012h.002c0 .14-.002.278-.038.415-.003.137-.046.27-.06.406 0 .005-.003.01-.005.017-.008.026-.02.057.038.05v-.002c.13-.136.26-.267.38-.418v.01c.002-.048.03-.073.057-.096.05-.05.1-.13.151-.2.05-.07.101-.137.152-.206l.002-.012c.007-.024.017-.04.029-.046.005-.002.01-.005.014-.005H9.3a.133.133 0 01.05.02.835.835 0 01.077.048c.144.079.307.132.415.269.012.012.026.014.038.038.05.024.096.08.133.132l.038.036c.002.002.005.002.007.005.19.16.204.246.067.46-.004.007-.012.014-.016.014a.236.236 0 01-.024.055.216.216 0 01-.02.036l-.01.017c-.035.058-.074.118-.088.185a.443.443 0 00-.012.168c.026.094.05.19.07.286.012.057.024.115.028.175.02.142-.048.228-.168.288v-.002c-.024.002-.026.017-.038.024a.078.078 0 01-.02.014.362.362 0 01-.038.026.192.192 0 00-.077.087c0 .007 0 .005-.002.01-.002.004 0 .014-.002.014h.007v.014c-.024.07-.036.12-.048.156-.003.01-.007.017-.01.024-.002.008-.007.012-.01.017-.002.005-.007.01-.009.012a.045.045 0 01-.024.012h-.007a.165.165 0 01-.05-.012c-.034-.012-.078-.029-.138-.048-.004-.002-.009-.002-.011-.005a.025.025 0 00-.012-.004l-.027-.012h-.01v-.01h-.002c-.072-.024-.14-.038-.204-.065-.038-.014-.08-.026-.12-.043-.05-.012-.1-.036-.151-.036-.14-.048-.281-.072-.416-.12-.011 0-.019.002-.043 0v.002c-.096-.019-.173-.043-.264-.06-.089-.014-.122-.06-.113-.148.005-.037.003-.08.003-.116 0-.012-.003-.017-.003-.04-.014-.025-.036-.053-.055-.085a.11.11 0 01-.014-.026c-.012-.012-.036-.024-.036-.038-.024-.005-.015-.01-.022-.015-.074-.07-.053-.163-.043-.252l.002-.029.008-.055c.002-.01.002-.02.004-.026.039-.15.048-.29-.113-.38-.019-.012-.03-.024-.055-.04v.004a2.869 2.869 0 00-.225-.165c-.012-.024-.015-.029-.039-.039a1.418 1.418 0 01-.31-.227l-.074-.04h.01c-.015-.025-.032-.022-.044-.034-.019-.014-.036-.024-.06-.04-.12-.102-.283-.198-.413-.315-.045-.015-.074-.05-.11-.08v-.004c-.127-.09-.252-.176-.377-.272h.003c-.015 0-.015-.012-.039-.024-.072-.036-.144-.096-.206-.144-.02-.024-.039-.024-.058-.024-.058-.048-.108-.07-.156-.113-.02-.012-.036-.026-.06-.04a2.178 2.178 0 01-.396-.29l-.012-.011-.022-.024a.188.188 0 01-.038-.081v.019c-.087-.094-.144-.202-.216-.3l-.007-.015a.027.027 0 01-.005-.014.107.107 0 01-.003-.026.118.118 0 01.024-.053c0-.005.003-.012.003-.02.024-.153.108-.292.168-.436v-.037s0-.022-.003-.032l-.004-.014-.005-.005a.038.038 0 00-.017-.01h-.007a.122.122 0 00-.058.022.312.312 0 00-.055.043l-.02.015a.13.13 0 00-.014.019l-.007.01c0 .002-.002 0-.002 0 0 .002-.003 0-.003 0v.002c-.048.055-.12.103-.182.154-.012.012-.034.026-.034.038v-.002h-.007c-.02.024-.045.024-.072.012l-.31-.137c-.024-.012-.036-.038-.04-.062a.64.64 0 01-.008-.032l-.007-.026v.005c-.036-.168.022-.293.053-.437.002-.012.005-.024.005-.036.024-.14.033-.288.074-.423v-.062c-.02-.154-.022-.305-.033-.46l.002-.078c-.014-.286-.033-.571-.043-.857-.022-.598-.07-1.193-.053-1.79a.636.636 0 00-.074-.315 1.968 1.968 0 00-.099-.164.264.264 0 01-.048-.237c.036-.14.063-.284.09-.425.008-.05.021-.084.06-.086zm-.166.38l.005.015c.005.032-.007.065-.02.113a.117.117 0 010-.086.295.295 0 01.015-.041zm10.715.003c.13-.002.257.005.38.024.22.017.42.058.55.164.095.04.189.09.28.144.22.132.44.269.662.403a.389.389 0 01.118.108l.223.315c.012.016.03.036.015.057a.038.038 0 01-.02.014c-.018.004-.034-.002-.05-.011-.098-.056-.2-.108-.298-.164a4.76 4.76 0 00-1.184-.46c-.107-.03-.208-.06-.323-.075l-.152-.034c-.004.003.005.012.017.024.005.005.01.01.012.015a.138.138 0 00.04.033l.02.01c.228.115.613.187.893.317l.058.029c.156.08.298.182.44.29l.268.207c.404.293.65.689.77 1.169.003.014.008.029.01.043l.01.014c.02.03.024.065.017.096.002.008.002.015.005.022-.005.07-.06.04-.092.04a2.504 2.504 0 01-.61-.11h-.006c-.051-.016-.118-.04-.165-.054-.211-.075-.41-.163-.615-.238-.252-.09-.45-.261-.662-.413a7.777 7.777 0 01-1.001-.816.34.34 0 01-.08-.106 4.11 4.11 0 01-.062-.153l-.036-.094a1.088 1.088 0 00-.024-.06l-.002-.005c-.003-.002-.003-.007-.003-.01v-.002l-.002-.01a.168.168 0 01.007-.122c.002-.005.002-.01.005-.014l.005-.017.004-.014c.003-.005.003-.013.005-.017l.003-.015.002-.017.003-.014.002-.017.002-.014.003-.017.002-.014.003-.017c0-.005 0-.01.002-.015 0-.004 0-.012.003-.016v-.266c-.003-.082.026-.114.108-.111.08.002.162-.001.243-.005l.075.004c.04-.002.08-.005.122-.005zm.284.532a.12.12 0 00.028.008H15c-.012.008-.028.005-.033.02-.004-.02-.002-.027.003-.028zm.88.342a.206.206 0 00.012.006h.003zm-1.908.177l.002.003c.007.003.014.01.022.024.076.154.182.28.3.399.124.12.259.23.389.348.268.242.542.48.818.713.178.15.392.228.62.288.518.132 1.049.182 1.575.254.139.02.264.065.374.156h-.007c.01.008.017.012.024.02-.296-.043-.59-.04-.886-.046-.324-.007-.641.03-.96.067a.986.986 0 01-.336-.026c-.308-.07-.598-.195-.89-.317-.328-.14-.601-.353-.861-.588l-.057-.055a1.002 1.002 0 01-.205-.285l-.002-.006c-.09-.212-.085-.448-.016-.708.019-.07.04-.14.062-.21.007-.022.02-.034.034-.031zm-.248 1.18c.065.233.233.396.375.573l.029.039.028.038a.57.57 0 00.106.094c.017.012.03.02.046.033l.02.017a10.088 10.088 0 00.539.396l.329.229c.149.103.305.19.468.266.04.02.082.036.123.055.124.053.25.099.379.14l.02.007c.08.02.167.028.25.038.032.002.064.007.092.01a.195.195 0 01.06.024.411.411 0 01.068.05c.074.067.144.163.148.22 0 .01 0 .018-.002.025-.002.005-.002.007-.005.01-.01.016-.024.03-.033.048-.03.05-.06.1-.085.153l-.011.027a.311.311 0 00.002.26c.115-.114.218-.236.293-.376a1.139 1.139 0 00.086-.201c.01-.027.003-.058.01-.084.01-.03-.024-.07-.01-.09 0-.001.003-.001.005-.004a.04.04 0 01.014-.007c.01-.002.02-.005.027-.005.019-.002.036-.005.055-.005.048 0 .094.008.14.022.028.01.019.045.016.072v.005c-.005.086-.04.165-.072.242a.554.554 0 01-.024.055 1.68 1.68 0 01-.192.375c-.118.156-.254.302-.475.31h-.063c-.038 0-.077.01-.115.012a.085.085 0 00-.086.057c-.017.039-.04.072-.058.11l-.007.017a1.534 1.534 0 01-.408.57c-.08.07-.164.139-.25.203a1.95 1.95 0 01-.468.224l-.036.014-.034.015-.02.007c-.01.002-.021.007-.03.01-.036.014-.065.035-.046.09.02.06.063.077.118.08.012 0 .026 0 .04-.003a.613.613 0 00.15-.033c.048-.017.096-.04.146-.06.034-.015.067-.03.103-.041-.03.122-.045.235-.084.34l-.021.054a6.794 6.794 0 01-.09.192c-.018.043-.04.084-.062.125-.115.23-.245.45-.405.655a1.682 1.682 0 01-.356.34 3.954 3.954 0 01-.103.073 2.788 2.788 0 01-.38.205l-.064.03-.053.02-.043.018c-.04.016-.082.03-.123.045a2.674 2.674 0 01-.168.053 4.848 4.848 0 01-.57.134c-.008 0-.013.003-.02.003-.055.01-.108.017-.163.026-.058.008-.116.017-.176.024a2.156 2.156 0 01-.605-.02l-.028-.008a.68.68 0 01-.145-.06c-.062-.034-.12-.07-.182-.1a1.728 1.728 0 01-.13-.073 1.868 1.868 0 01-.16-.106.632.632 0 01-.233-.278 1.794 1.794 0 00-.092-.194c-.01-.02-.021-.036-.03-.053a2.718 2.718 0 00-.277-.367 2.76 2.76 0 00-.125-.142c-.021-.024-.04-.048-.062-.07a7.07 7.07 0 00-.26-.276l-.067-.067a2.787 2.787 0 00-.364-.302 2.784 2.784 0 00-.303-.192l-.06-.04a1.58 1.58 0 01-.63-.761c-.043-.093-.107-.122-.22-.124a.63.63 0 01-.252-.048l-.002-.002a.457.457 0 01-.132-.084l-.026-.016c-.022-.026-.038-.058-.058-.09a5.295 5.295 0 01-.386-.658c0 .003.002.005.003.008l-.006-.013.003.005a3.772 3.772 0 00-.073-.196l-.036-.086a.382.382 0 01-.014-.154l.007-.031c.002-.005.002-.01.005-.015a.145.145 0 01.012-.03.46.46 0 01.127-.14.898.898 0 01.067-.05c.046-.034.094-.063.14-.094.071-.044.143-.084.218-.123.271-.14.56-.238.857-.314.017-.005.033-.008.053-.012.033-.008.07-.01.105-.015.036-.002.072-.005.106-.005l.106-.002c.016 0 .036 0 .052-.002a17.864 17.864 0 00.9-.063c.18-.017.36-.036.54-.055a3.504 3.504 0 001.127-.324c.036-.02.074-.036.11-.055l.063-.034c.144-.077.288-.151.427-.233.014-.02.03-.026.055-.033l.01-.003v.012a.06.06 0 01-.02.034l-.021.014c-.14.178-.331.3-.497.45a.415.415 0 00-.05.045c-.053.043-.106.089-.166.137.209 0 .41-.024.598-.08a1.654 1.654 0 00.869-.6c.103-.137.197-.297.278-.482zm-3.265.016a1.244 1.244 0 01-.343.109c-.56.139-1.13.22-1.697.326a2.603 2.603 0 00-1.105.487c-.019.015-.04.032-.062.043-.026.017-.039.013-.043-.01-.003-.004-.003-.011-.003-.018-.01-.144.034-.214.166-.274.18-.082.36-.168.54-.252.235-.108.487-.142.742-.168.396-.043.792-.094 1.19-.14l.524-.086zm2.386 1.245h-.026c-.038.01-.036.05-.036.08.003.1.007.202.02.303.01.11.047.219.112.307a.842.842 0 00.51.334c.155.036.155.038.17.2.007.069.016.13.08.17.114.067.227.137.364.146.084.007.17.012.242.068a.583.583 0 00.32.098c.084.007.17.01.254.024.067.012.113-.01.16-.05.239-.197.474-.397.697-.617-.026-.03-.065-.04-.118-.012a6.25 6.25 0 00-.415.223.315.315 0 01-.113.048 4.032 4.032 0 01-.722.074.68.68 0 01-.368-.13c-.067-.043-.134-.105-.146-.201.036-.012.07.002.103.007.127.017.252.063.382.055.312-.02.605-.113.898-.213l.283-.103c.043-.015.055-.03.017-.07-.046-.05-.096-.04-.147-.034a5.625 5.625 0 01-1.87-.045c-.18-.034-.372-.046-.442-.27-.02-.06-.038-.12-.05-.182a.37.37 0 00-.094-.17.094.094 0 00-.065-.04zm-.573.065c-.048 0-.08.05-.103.093-.06.103-.137.196-.207.292-.108.147-.26.178-.418.154a17.985 17.985 0 00-1.718-.18c-.03-.002-.058-.01-.082.01-.183.134-.367.264-.483.468.007.002.015.007.02.007.019-.002.035-.007.055-.01.297-.074.607-.098.922-.072.398.034.792.113 1.188.168.053.008.106.01.156.036.12.063.18.173.226.29.07.18.09.373.103.565.01.15-.022.278-.144.38a.556.556 0 00-.2.278c.154 0 .286.026.387.156.063.08.144.149.223.218a.379.379 0 00.586-.081c.058-.094.113-.19.175-.281.087-.127.17-.264.325-.32.093-.03.052-.076.02-.115-.061-.08-.177-.081-.28-.02-.16.097-.266.239-.381.376-.034.04-.068.08-.113.115-.058.04-.108.043-.16-.01-.056-.057-.114-.117-.176-.168-.053-.043-.063-.082-.032-.144a.728.728 0 00.082-.413c-.03-.312-.08-.62-.3-.867-.024-.026-.024-.04.01-.064a.94.94 0 00.408-.701c.007-.075-.007-.135-.067-.156a.075.075 0 00-.022-.004zm4.46.035c.206 0 .388.08.567.182-.005 0-.007 0-.012.003l.03.017c-.27.04-.54.06-.81.03-.084-.01-.168-.026-.255-.023-.17.005-.307-.084-.451-.161h.017c-.012-.007-.024-.012-.036-.02.024.003.05.003.074.005.029.003.055.01.084.015.238.05.468-.02.704-.043a.8.8 0 01.089-.005zm-8.689.714a.045.045 0 00-.016.004c-.05.019-.098.048-.112.115-.048.223.055.437.278.552.1.053.178.127.226.23.016.037.019.106.072.094.052-.012.01-.077.021-.103.008-.135-.019-.25-.127-.32-.08-.05-.11-.12-.14-.201-.038-.106-.047-.223-.134-.307-.02-.021-.036-.064-.069-.064zm1.843.354c-.11.027-.236.053-.353.106-.082.038-.087.084-.015.139.043.034.087.05.14.03a.466.466 0 01.494.097.509.509 0 00.523.087c.106-.036.197-.096.293-.15a.319.319 0 01.113-.04c.144-.014.288-.033.43-.053.038-.005.098.01.108-.036.01-.048-.046-.077-.08-.108-.016-.017-.045-.02-.07-.026a.82.82 0 00-.436-.015 2.092 2.092 0 01-.888 0c-.08-.02-.163-.02-.26-.03zm6.903.889c.006 0 .01.003.015.007a.05.05 0 01.012.014l.008.005c.043.034-.007.11-.02.168-.03.168-.057.334-.086.502-.007.048-.012.098-.048.165l-.007-.043-.012.024a5.307 5.307 0 01-.075-.706c-.002-.053.034-.065.068-.077.048-.016.107-.066.145-.06zm-3.22.902a.08.08 0 00-.022.01c-.19.105-.404.11-.613.137-.088.012-.2-.015-.264.05-.158.156-.293.09-.432-.02-.007-.004-.014-.011-.024-.014-.206-.11-.413-.15-.624-.005a.338.338 0 01-.267.068c-.074-.02-.131-.015-.19.038-.028.027-.066.048-.1.07-.094.062-.094.072-.007.14.02.018.043.025.067.033.2.06.387.016.562-.08.182-.098.353-.093.518.032.152.112.312.115.48.045a2.97 2.97 0 01.653-.213c.034-.005.068-.017.099.01.096.088.187.026.279-.01.036-.015.04-.044.038-.08-.007-.076-.065-.12-.098-.18-.015-.025-.032-.035-.054-.03zm-4.717.07c.009 0 .02.006.032.017.039.036.075.074.113.11l.015.014c.019.017.021.039.012.06l-.224.45-.024-.008c0-.005.003-.007.003-.012.048-.197.029-.4.055-.6.002-.02.009-.03.018-.03zm3.9.588c-.238.007-.48.046-.703.122-.185.063-.392.106-.488.32-.055.124-.048.256-.086.38.017.1.017.197.074.281.017.024.024.063.065.06.043-.002.058-.038.07-.067.043-.09.053-.194.08-.29.047-.156.119-.28.282-.35.17-.072.343-.14.516-.206a.184.184 0 01.1-.012c.215.03.438.02.628.146a.079.079 0 00.062.012c.072-.017.08-.04.036-.098a.723.723 0 00-.636-.298zm-2.218.741l.014.017c.094.117.187.218.25.336.15.29.374.501.662.655.135.072.256.172.414.19l.003.001h.018c.017 0 .04-.004.036.023-.003.014-.017.014-.031.012h-.007c-.005 0-.01 0-.015-.003-.167.005-.33.033-.493.067-.085.018-.17.038-.255.058a7.838 7.838 0 01-.243.055h-.003c-.033.008-.048.024-.043.058.005.04.02.062.067.072a1.305 1.305 0 00.274.017c.118-.003.235-.015.353-.034a2.602 2.602 0 01.778-.002c-.43.07-.785.312-1.174.475-.202.084-.358.245-.55.348-.014.017-.022.044-.036.06-.031.04-.036.118-.087.11h-.004c-.005 0-.01.003-.015 0a.623.623 0 01-.266-.086c-.03-.019-.022-.055-.022-.089v-.453c0-.032.012-.067-.019-.09-.106-.066-.08-.182-.106-.278-.01-.038.017-.057.039-.08l.278-.31c.063-.068.089-.143.043-.224-.086-.163-.072-.32-.002-.485.055-.13.091-.267.142-.42zm4.585.177c.005.003.01.005.012.008l.007-.008c.039.022.04.05.05.075.102.247.2.497.3.744.025.055.03.103-.006.15a.502.502 0 00-.077.49c.067.205.019.347-.183.448a.229.229 0 01-.12.036.124.124 0 01-.088-.03c-.375-.259-.821-.345-1.242-.494-.06-.02-.117-.043-.18-.057-.072-.017-.067-.065-.057-.116.007-.036.026-.04.045-.038.02-.005.046.01.063.014.48.12.965.216 1.428.396.017.008.03.01.043.013.034-.005.044-.037.039-.082-.01-.108-.02-.214-.144-.27a2.8 2.8 0 00-.975-.234c-.05-.005-.098-.007-.15-.01.239-.144.5-.22.714-.406a.999.999 0 00.075-.067l.398-.482zm-1.882 1.133h.02c.03-.002.054.005.057.053 0 .044.01.082-.06.092a1.752 1.752 0 01-.274.021c-.094 0-.185-.01-.278-.03-.05-.013-.07-.047-.065-.087.002-.027.02-.027.04-.027a.103.103 0 01.039.003h.18a1.143 1.143 0 00.34-.024zm.036.396c.006 0 .012.002.02.005l.844.35c-.132.11-.254.207-.374.303-.221.178-.44.358-.646.553-.05.048-.09.05-.147.014a9.33 9.33 0 00-1.097-.545c-.165-.07-.34-.098-.511-.158.02-.036.055-.036.084-.046.367-.137.742-.26 1.102-.42.094-.043.187-.007.278.005.137.02.27.021.394-.046a.092.092 0 01.053-.015zm-2.161.698a.27.27 0 01.082.018c.197.077.38.185.569.274a.04.04 0 01.029.01c.004.002.005.004.005.011v.005c0 .003-.003.003-.003.005-.002.003-.005.003-.007.003l-.01-.003a.03.03 0 01-.012-.012l-.862-.214c.074-.059.133-.1.209-.097zm8.17.535c-.142-.004-.26.062-.372.15-.03.022-.046.048-.094.017-.105-.072-.206-.053-.295.04a.402.402 0 00-.103.186c-.125.504-.252 1.006-.372 1.512-.041.17.048.255.223.23.158-.026.238-.117.264-.32.026-.198.053-.392.11-.596.15.187.29.362.433.538.139.17.29.321.494.412.144.065.269.027.382-.074a.186.186 0 00.055-.206.157.157 0 00-.158-.125.246.246 0 01-.152-.07 2.27 2.27 0 01-.362-.396c-.09-.12-.094-.12.026-.202.252-.173.34-.417.322-.71-.014-.219-.132-.346-.34-.38a.454.454 0 00-.061-.006zm-10.733.03c-.04 0-.077.02-.097.075-.019.05-.053.043-.091.038a.751.751 0 00-.665.22c-.38.37-.574.813-.552 1.353.014.358.22.53.569.451.689-.16 1.224-.835 1.253-1.582.007-.192-.168-.47-.34-.538a.214.214 0 00-.077-.016zm-1.93.058a.943.943 0 00-.613.238c-.346.302-.547.693-.646 1.138a.642.642 0 00.075.482c.07.118.158.161.292.135a3.12 3.12 0 00.87-.305.867.867 0 00.225-.168.291.291 0 00.084-.204c0-.075-.033-.1-.103-.104-.07-.002-.13.024-.192.046-.207.075-.408.166-.622.22-.105.027-.14.003-.163-.105a.301.301 0 01.005-.122c.04-.168.098-.33.187-.483a.82.82 0 01.245-.283c.14-.089.283-.137.442-.04.052.03.103.016.15-.013a.352.352 0 00.15-.2c.016-.05.002-.09-.044-.117a.773.773 0 00-.343-.115zm9.2.07a.692.692 0 00-.517.206c-.156.161-.183.324-.084.526.074.151.177.28.278.415.072.094.149.187.216.286.048.07.024.125-.058.151a.199.199 0 01-.14-.005 1.076 1.076 0 01-.373-.23.243.243 0 01-.082-.125c-.012-.074-.053-.108-.125-.115-.081-.007-.156-.007-.204.08-.08.138-.057.263.087.393.276.245.605.353.933.38.3.004.485-.267.387-.522-.043-.115-.118-.216-.19-.314-.12-.159-.245-.313-.357-.476-.09-.125-.048-.216.098-.264.135-.043.25-.005.36.08.13.1.24.047.269-.116.017-.086-.03-.144-.09-.194a.68.68 0 00-.41-.157zm1.905.06c-.137-.003-.274 0-.41.016-.164.02-.32.065-.38.248-.002.01-.014.024-.024.026-.187.048-.252.202-.302.358-.106.346-.2.696-.298 1.042-.024.084.01.14.08.182.054.034.11.032.172.015.324-.08.648-.166.987-.142a.26.26 0 00.127-.029.242.242 0 00.117-.24c-.014-.09-.086-.117-.163-.13a1.484 1.484 0 00-.177-.016 3.855 3.855 0 00-.62.052c.03-.228.048-.242.264-.242.16 0 .322-.01.473-.072.1-.043.166-.113.176-.226.007-.076-.025-.122-.104-.124a1.65 1.65 0 00-.19.002l-.453.04c.024-.052.036-.1.062-.136.044-.062-.007-.178.084-.209.075-.024.164-.007.245-.01.214-.004.427-.007.634-.074a.347.347 0 00.192-.13c.07-.108.043-.18-.082-.185-.136-.006-.273-.014-.41-.017zm-6.664.008c-.071-.003-.13.042-.185.093a3.95 3.95 0 00-.392.434l-.367.456c-.02.024-.04.07-.08.05-.03-.014-.018-.055-.014-.086.01-.11.024-.218.036-.329.015-.144.034-.288.01-.432-.031-.173-.156-.22-.295-.113a.836.836 0 00-.094.091 3.168 3.168 0 00-.298.414c-.225.348-.432.71-.703 1.027-.05.06-.103.118-.149.182-.048.072-.067.154-.022.23.041.068.11.092.188.087.081-.004.125-.064.168-.122l.626-.852c.012-.015.017-.044.053-.034a1.37 1.37 0 00-.012.11c-.01.137-.038.274-.01.413.034.16.16.224.306.152a.902.902 0 00.204-.152c.117-.112.228-.233.33-.362.114-.144.229-.29.349-.447.036.12.022.228.017.336-.012.188-.048.375-.012.565.024.117.091.187.187.194a.44.44 0 00.278-.07c.125-.079.137-.237.02-.343a.19.19 0 01-.063-.113c-.026-.13-.004-.257.017-.384.039-.245.115-.485.103-.737-.004-.098-.02-.19-.12-.237a.19.19 0 00-.076-.02zm8.04.19c.117-.01.175.063.14.176a.387.387 0 01-.07.132c-.128.161-.291.27-.495.353a1.56 1.56 0 01.11-.425c.062-.134.163-.223.315-.237zm-6.651.02a.292.292 0 01.15.034c.076.043.098.146.045.233a.676.676 0 01-.185.184 1.47 1.47 0 01-.483.243c.07-.216.128-.415.245-.586a.286.286 0 01.228-.108zm1.6.091a.509.509 0 01.213.034c.113.046.15.1.149.27a1.257 1.257 0 01-.425.818.562.562 0 01-.324.136c-.147.012-.262-.08-.247-.228.028-.32.115-.624.33-.876a.436.436 0 01.304-.154zm-5.882.003a.501.501 0 01.218.036c.11.043.149.098.144.262a1.243 1.243 0 01-.422.818.581.581 0 01-.325.14c-.15.011-.266-.082-.252-.233.03-.315.116-.613.325-.86a.442.442 0 01.312-.163z", "mysql": "M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z", "postgresql": "M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z", "redis": "M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z", "git": "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187", "gitlab": "m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z", "github": "M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z", "docker": "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z", "nginx": "M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm6 16.59c0 .705-.646 1.29-1.529 1.29-.631 0-1.351-.255-1.801-.81l-6-7.141v6.66c0 .721-.57 1.29-1.274 1.29H7.32c-.721 0-1.29-.6-1.29-1.29V7.41c0-.705.63-1.29 1.5-1.29.646 0 1.38.255 1.83.81l5.97 7.141V7.41c0-.721.6-1.29 1.29-1.29h.075c.72 0 1.29.6 1.29 1.29v9.18H18z", "linux": "M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z", "rabbitmq": "M23.035 9.601h-7.677a.956.956 0 01-.962-.962V.962a.956.956 0 00-.962-.956H10.56a.956.956 0 00-.962.956V8.64a.956.956 0 01-.962.962H5.762a.956.956 0 01-.961-.962V.962A.956.956 0 003.839 0H.959a.956.956 0 00-.956.962v22.076A.956.956 0 00.965 24h22.07a.956.956 0 00.962-.962V10.58a.956.956 0 00-.962-.98zm-3.86 8.152a1.437 1.437 0 01-1.437 1.443h-1.924a1.437 1.437 0 01-1.436-1.443v-1.917a1.437 1.437 0 011.436-1.443h1.924a1.437 1.437 0 011.437 1.443z", "horizon": "M20.486 3.516C15.8-1.171 8.202-1.172 3.516 3.513A11.963 11.963 0 0 0 0 11.998a11.975 11.975 0 0 0 4.2 9.13h.01a12 12 0 0 0 16.274-.642c4.687-4.685 4.688-12.283.002-16.97zM16 13.998c-4 0-4-4-8-4-2.5 0-3.44 1.565-4.765 2.74H3.23a8.801 8.801 0 0 1 17.54-1.48c-1.33 1.175-2.27 2.74-4.77 2.74z", "sentry": "M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.904 7.92a15.478 15.478 0 0 1 8.53 12.811h-2.221A13.301 13.301 0 0 0 5.784 9.814l-2.926 5.06a7.65 7.65 0 0 1 4.435 5.848H2.194a.365.365 0 0 1-.298-.534l1.413-2.402a5.16 5.16 0 0 0-1.614-.913L.296 19.275a2.182 2.182 0 0 0 .812 2.999 2.24 2.24 0 0 0 1.086.288h6.983a9.322 9.322 0 0 0-3.845-8.318l1.11-1.922a11.47 11.47 0 0 1 4.95 10.24h5.915a17.242 17.242 0 0 0-7.885-15.28l2.244-3.845a.37.37 0 0 1 .504-.13c.255.14 9.75 16.708 9.928 16.9a.365.365 0 0 1-.327.543h-2.287c.029.612.029 1.223 0 1.831h2.297a2.206 2.206 0 0 0 1.922-3.31z", "aws": "M20.913 13.147l.12-.895c.947.576 1.258.922 1.354 1.071-.16.031-.562.046-1.474-.176zm-2.174 7.988a.547.547 0 0 0-.005.073c0 .084-.207.405-1.124.768a10.28 10.28 0 0 1-1.438.432c-1.405.325-3.128.504-4.853.504-4.612 0-7.412-1.184-7.412-1.704a.547.547 0 0 0-.005-.073L1.81 5.602c.135.078.28.154.432.227.042.02.086.038.128.057.134.062.272.122.417.18l.179.069c.154.058.314.114.478.168.043.013.084.029.13.043.207.065.423.127.646.187l.176.044c.175.044.353.087.534.127a23.414 23.414 0 0 0 .843.17l.121.023c.252.045.508.085.768.122.071.011.144.02.216.03.2.027.4.053.604.077l.24.027c.245.026.49.05.74.07l.081.009c.275.022.552.04.83.056l.233.012c.21.01.422.018.633.025a33.088 33.088 0 0 0 2.795-.026l.232-.011c.278-.016.555-.034.83-.056l.08-.008c.25-.02.497-.045.742-.072l.238-.026c.205-.024.408-.05.609-.077.07-.01.141-.019.211-.03.261-.037.519-.078.772-.122l.111-.02c.215-.04.427-.082.634-.125l.212-.047c.186-.041.368-.085.546-.13l.166-.042c.225-.06.444-.122.654-.189.04-.012.077-.026.115-.038a10.6 10.6 0 0 0 .493-.173c.058-.021.114-.044.17-.066.15-.06.293-.12.43-.185.038-.017.079-.034.116-.052.153-.073.3-.15.436-.228l-.976 7.245c-2.488-.78-5.805-2.292-7.311-3a1.09 1.09 0 0 0-1.088-1.085c-.6 0-1.088.489-1.088 1.088 0 .6.488 1.089 1.088 1.089.196 0 .378-.056.537-.148 1.72.812 5.144 2.367 7.715 3.15zm-7.42-20.047c5.677 0 9.676 1.759 9.75 2.736l-.014.113c-.01.033-.031.067-.048.101-.015.028-.026.057-.047.087-.024.033-.058.068-.09.102-.028.03-.051.06-.084.09-.038.035-.087.07-.133.105-.04.03-.074.06-.119.091-.053.036-.116.071-.177.107-.05.03-.095.06-.15.09-.068.036-.147.073-.222.11-.059.028-.114.057-.177.085-.084.038-.177.074-.268.111-.068.027-.13.054-.203.082-.097.036-.205.072-.31.107-.075.026-.148.053-.228.079-.111.035-.233.069-.35.103-.085.024-.165.05-.253.073-.124.034-.258.065-.389.098-.093.022-.181.046-.278.068-.139.032-.287.061-.433.091-.098.02-.191.041-.293.06-.155.03-.32.057-.482.084-.1.018-.198.036-.302.052-.166.026-.342.048-.515.072-.11.014-.213.03-.325.044-.181.023-.372.041-.56.06-.11.012-.218.025-.332.036-.188.016-.386.029-.58.043-.122.009-.24.02-.364.028-.207.012-.422.02-.635.028-.12.005-.234.012-.354.016a35.605 35.605 0 0 1-2.069 0c-.12-.004-.234-.011-.352-.016-.214-.008-.43-.016-.637-.028-.122-.008-.238-.02-.36-.027-.195-.015-.394-.028-.584-.044-.11-.01-.215-.024-.324-.035-.19-.02-.384-.038-.568-.06l-.315-.044c-.176-.024-.355-.046-.525-.073-.1-.015-.192-.033-.29-.05-.167-.028-.335-.055-.494-.086-.096-.018-.183-.038-.276-.056-.151-.032-.305-.062-.45-.095-.09-.02-.173-.043-.26-.064-.138-.034-.277-.067-.407-.102-.082-.022-.157-.046-.235-.069a11.75 11.75 0 0 1-.368-.108c-.075-.024-.141-.049-.213-.073-.11-.037-.223-.075-.325-.113-.067-.025-.125-.051-.188-.077-.096-.038-.195-.076-.282-.115-.06-.027-.11-.054-.166-.08-.08-.039-.162-.077-.233-.116-.052-.028-.094-.055-.142-.084-.063-.038-.13-.075-.185-.113-.043-.029-.075-.058-.113-.086-.048-.037-.098-.073-.139-.11-.032-.029-.054-.057-.08-.087-.033-.035-.069-.07-.093-.104-.02-.03-.031-.058-.046-.086-.018-.035-.039-.068-.049-.102l-.015-.113c.076-.977 4.074-2.736 9.748-2.736zm12.182 12.124c-.118-.628-.84-1.291-2.31-2.128l.963-7.16a.531.531 0 0 0 .005-.073C22.16 1.581 16.447 0 11.32 0 6.194 0 .482 1.581.482 3.851a.58.58 0 0 0 .005.072L2.819 21.25c.071 2.002 5.236 2.75 8.5 2.75 1.805 0 3.615-.188 5.098-.531.598-.138 1.133-.3 1.592-.48 1.18-.467 1.789-1.053 1.813-1.739l.945-7.018c.557.131 1.016.197 1.389.197.54 0 .902-.137 1.134-.413a.956.956 0 0 0 .21-.804Z"};
  const TECH_LOGOS = [
    { n: "PHP", v: "8.4+", g: "php", k: "php", c: "#777BB4", s: "php", id: "php", d: "PHP tili: tiplar, OOP, xotira, runtime va zamonaviy 8.4/8.5 imkoniyatlari.", sk: ["php", "object-oriented-programming-oop", "solid-principles", "design-patterns", "clean-code", "psr-standards", "xdebug"] },
    { n: "Laravel", v: "12", g: "L", k: "laravel", c: "#FF2D20", s: "laravel", id: "laravel", d: "Laravel framework: container, Eloquent, autentifikatsiya, navbat va ekotizim.", sk: ["laravel", "eloquent-orm", "mvc-architecture", "laravel-telescope"] },
    { n: "Composer", v: "2", g: "Co", k: "composer", c: "#885630", s: "composer", id: "composer", d: "Paket menejeri va autoload: PSR-4, versiyalash, production optimizatsiya.", sk: ["composer"] },
    { n: "MySQL", v: "8", g: "My", k: "mysql", c: "#00758F", s: "mysql", id: "mysql", d: "MySQL: InnoDB, indekslar, EXPLAIN, tranzaksiyalar.", sk: ["mysql", "sql", "database-design", "database-indexing", "database-optimization"] },
    { n: "PostgreSQL", v: "16", g: "Pg", k: "postgresql", c: "#336791", s: "postgresql", id: "postgresql", d: "PostgreSQL: SQL, indekslar, tranzaksiyalar va so'rovlarni optimallashtirish.", sk: ["postgresql", "query-optimization", "database-transactions"] },
    { n: "Redis", v: "7", g: "Re", k: "redis", c: "#DC382D", s: "redis", id: "redis", d: "Redis: kesh, navbat, lock va tezlikni oshirish strategiyalari.", sk: ["redis", "caching-strategies", "application-performance-optimization"] },
    { n: "Git", v: "", g: "Git", k: "git", c: "#F05032", s: "git", id: "git", d: "Git: branch, merge, rebase va jamoaviy ishlash.", sk: ["git", "code-review"] },
    { n: "GitLab", v: "CI/CD", g: "GL", k: "gitlab", c: "#FC6D26", s: "gitlab", id: "gitlab", d: "GitLab: repository, merge request va CI/CD pipeline.", sk: ["gitlab", "gitlab-ci-cd", "ci-cd"] },
    { n: "GitHub", v: "Actions", g: "GH", k: "github", c: "#6E5494", s: "github-actions", id: "github-actions", d: "GitHub va Actions: workflow va avtomatik deploy.", sk: ["github", "github-actions"] },
    { n: "Docker", v: "Compose", g: "Dk", k: "docker", c: "#2496ED", s: "docker", id: "docker", d: "Docker va Compose: konteynerlar, image, volume va tarmoq.", sk: ["docker", "docker-compose"] },
    { n: "Nginx", v: "", g: "N", k: "nginx", c: "#009639", s: "nginx", id: "nginx", d: "Nginx: reverse proxy, FastCGI, HTTP/HTTPS va xavfsizlik.", sk: ["nginx", "http-https"] },
    { n: "PHP-FPM", v: "", g: "FPM", c: "#5C6BC0", s: "php-fpm", id: "php-fpm", d: "PHP-FPM: worker sozlash, OPcache va unumdorlik.", sk: ["php-fpm"] },
    { n: "Linux", v: "Ubuntu", g: "Lx", k: "linux", c: "#E95420", s: "linux", id: "linux", d: "Linux/Ubuntu server: buyruqlar, bash va server boshqaruvi.", sk: ["linux", "ubuntu-server", "bash"] },
    { n: "RabbitMQ", v: "3", g: "Rb", k: "rabbitmq", c: "#FF6600", s: "rabbitmq", id: "rabbitmq", d: "RabbitMQ: xabarlar brokeri va event-driven arxitektura.", sk: ["rabbitmq", "event-driven-architecture", "microservices"] },
    { n: "Horizon", v: "Queues", g: "Hz", k: "horizon", c: "#4F46E5", s: "laravel-horizon", id: "laravel-horizon", d: "Laravel Horizon: navbatlarni boshqarish va monitoring.", sk: ["laravel-horizon", "queues-and-background-jobs", "logging-and-monitoring"] },
    { n: "Pest", v: "3", g: "Pe", c: "#F28D1A", s: "pest", id: "pest", d: "Pest: zamonaviy testlash va TDD.", sk: ["pest", "test-driven-development-tdd", "feature-testing"] },
    { n: "PHPUnit", v: "11", g: "PU", c: "#366488", s: "phpunit", id: "phpunit", d: "PHPUnit: unit va integration testlar.", sk: ["phpunit", "unit-testing", "integration-testing", "automated-testing"] },
    { n: "PHPStan", v: "", g: "St", c: "#4F5B93", s: "phpstan", id: "phpstan", d: "PHPStan/Larastan: statik tahlil va kod sifati.", sk: ["phpstan", "larastan", "refactoring"] },
    { n: "Sentry", v: "", g: "Se", k: "sentry", c: "#362D59", s: "sentry", id: "sentry", d: "Sentry: xatolarni kuzatish, log va monitoring.", sk: ["sentry", "debugging"] },
    { n: "AWS", v: "S3", g: "AWS", k: "aws", c: "#FF9900", s: "aws", id: "aws", d: "AWS: bulut xizmatlari, S3, masshtablash va barqarorlik.", sk: ["aws", "amazon-s3", "cloud-computing", "scalability", "high-availability"] },
    { n: "API", v: "REST · OpenAPI", g: "API", ic: "plug", c: "#0EA5E9", id: "api", cat: true, d: "API dizayni, REST, webhooks va hujjatlashtirish (OpenAPI/Swagger).", sk: ["api-design","rest-api","webhooks","api-documentation","openapi","swagger"] },
    { n: "Auth & Xavfsizlik", v: "OAuth 2.0 · JWT", g: "Sec", ic: "shield", c: "#EF4444", id: "security", cat: true, d: "Autentifikatsiya, avtorizatsiya, Sanctum, OAuth, JWT va OWASP himoyasi.", sk: ["api-authentication-and-authorization","oauth-2-0","jwt","laravel-sanctum","owasp-top-10","web-application-security"] },
    { n: "Arxitektura", v: "DDD · Clean", g: "Arc", ic: "layers", c: "#8B5CF6", id: "architecture", cat: true, d: "Dasturiy arxitektura, DDD, Clean Architecture va tizim dizayni.", sk: ["software-architecture","domain-driven-design-ddd","clean-architecture","system-design","architecture-review"] },
    { n: "Jamoa va jarayon", v: "Agile · Scrum", g: "Team", ic: "users", c: "#14B8A6", id: "team", cat: true, d: "Agile, hujjatlashtirish, muammo yechish, qaror qabul qilish va yetakchilik.", sk: ["agile","scrum","technical-documentation","problem-solving","technical-decision-making","mentoring","technical-leadership"] },
  ];
  const stackLogo = (x) => `<span class="stk-logo" style="--bc:${x.c}">${x.k ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${TECH_PATHS[x.k]}"/></svg>` : x.ic ? icon(x.ic) : esc(x.g)}</span>`;
  const stackSkills = (x) => x.sk.map((s) => BY_SLUG[s]).filter(Boolean);
  const stackStats = (x) => statsFor(stackSkills(x).flatMap((s) => s.subskills));
  function renderStacks() {
    view().innerHTML = `
      <section class="reveal">
        <header class="page-head"><div><h1>Stacklar</h1><p class="page-sub">Texnologiyani tanlang: unga bog'liq skillar va sizning progressingiz shu yerda.</p></div></header>
        <ul class="st-grid">${TECH_LOGOS.map((x) => {
          const n = stackSkills(x).length, p = pct(stackStats(x).progress);
          return `<li><a class="st-card" href="#/stacks/${x.id}">
            <div class="st-top">${stackLogo(x)}<div><h3>${esc(x.n)}</h3>${x.v ? `<em>${esc(x.v)}</em>` : ""}</div></div>
            <p>${esc(x.d)}</p>
            <div class="st-foot"><span>${n} skill</span><b>${p}%</b></div>
            <div class="bar"><i style="width:${p}%"></i></div>
          </a></li>`;
        }).join("")}</ul>
      </section>`;
  }
  function renderStack(x) {
    const skills = stackSkills(x), st = stackStats(x);
    const iqN = (window.INTERVIEW_QUESTIONS || []).filter((q) => q.category === x.id).length;
    const qzN = (window.INTERVIEW_TESTS || []).filter((t) => t.category === x.id).length;
    const prep = iqN || qzN ? `
        <h2 class="st-sub">Intervyuga tayyorgarlik</h2>
        <ul class="st-skills">
          ${iqN ? `<li><a class="st-skill" href="#/interview?stack=${x.id}">${icon("help", "ic")}<div class="st-skill-main"><h3>Intervyu savollari</h3><span>${iqN} ta savol-javob</span></div>${icon("arrow-right", "ic ic-sm")}</a></li>` : ""}
          ${qzN ? `<li><a class="st-skill" href="#/quiz?stack=${x.id}">${icon("flask", "ic")}<div class="st-skill-main"><h3>Texnik testlar</h3><span>${qzN} ta test</span></div>${icon("arrow-right", "ic ic-sm")}</a></li>` : ""}
        </ul>` : "";
    view().innerHTML = `
      <section class="reveal">
        <a class="st-back" href="#/stacks">${icon("arrow-left", "ic ic-sm")} Barcha stacklar</a>
        <header class="st-hero">
          ${stackLogo(x)}
          <div><h1>${esc(x.n)}${x.v ? ` <em>${esc(x.v)}</em>` : ""}</h1><p class="page-sub">${esc(x.d)}</p></div>
          <div class="st-prog"><b>${pct(st.progress)}<small>%</small></b><span>${st.done} / ${st.total} mavzu ishonchli</span><div class="bar"><i style="width:${pct(st.progress)}%"></i></div></div>
        </header>
        <h2 class="st-sub">Bog'liq skillar · ${skills.length}</h2>
        <ul class="st-skills">${skills.map((s) => {
          const ss = statsFor(s.subskills), p = pct(ss.progress);
          return `<li><a class="st-skill" href="#/s/${s.slug}">
            <span class="num">${pad(s.num)}</span>
            <div class="st-skill-main"><h3>${esc(s.title)}</h3><span>${s.subskills.length} subskill · ${ss.done} ishonchli</span><div class="bar"><i style="width:${p}%"></i></div></div>
            <b>${p}%</b>${icon("arrow-right", "ic ic-sm")}
          </a></li>`;
        }).join("")}</ul>
        ${prep}
      </section>`;
  }

  const skillStack = (s) => TECH_LOGOS.find((x) => x.sk.includes(s.slug));
  const stackCrumb = (s) => { const k = skillStack(s); return k ? `<a href="#/stacks/${k.id}">${esc(k.n)}</a>` : ""; };
  function stkChip(x, clone) {
    // Mehmon uchun bosilmaydi: havola baribir login sahifasiga olib boradi.
    const tag = currentUser ? "a" : "span";
    const href = currentUser ? ` href="#/stacks/${x.id}"${clone ? ' tabindex="-1"' : ""}` : "";
    return `<li${clone ? ' class="stk-clone" aria-hidden="true"' : ""}><${tag} class="stk-chip"${href} style="--bc:${x.c}">${stackLogo(x)}<b>${esc(x.n)}</b>${x.v ? `<em>${esc(x.v)}</em>` : ""}</${tag}></li>`;
  }
  function stkRow(items) {
    return `<div class="stk-row"><ul class="stk-track">${items.filter((x) => !x.cat).map((x) => stkChip(x, false)).join("")}${items.filter((x) => !x.cat).map((x) => stkChip(x, true)).join("")}</ul></div>`;
  }

  /* Roadmap (16 bo'lim, ilon izi) */
  const stackGlyph = (x) => x.k ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${TECH_PATHS[x.k]}"/></svg>` : x.ic ? icon(x.ic) : `<strong>${esc(x.g)}</strong>`;
  function roadmapHtml() {
    const rows = [];
    for (let i = 0; i < TECH_LOGOS.length; i += 5) rows.push(TECH_LOGOS.slice(i, i + 5));
    let n = 0;
    return `
      <div class="roadmap" role="list">
        ${rows.map((row, r) => `
          <ol class="rm-row" data-dir="${r % 2 ? "rtl" : "ltr"}">
            ${row.map((x) => {
              n++;
              const sk = stackSkills(x), names = sk.slice(0, 6).map((s) => s.title).join(", ");
              const tag = n === 1 ? `<i class="rm-tag">Boshlanish</i>` : (n === TECH_LOGOS.length ? `<i class="rm-tag">Maqsad</i>` : "");
              const el = currentUser ? "a" : "span";
              return `<li class="rm-node${currentUser ? "" : " rm-static"}" style="--i:${n}" role="listitem">
                <${el} class="rm-link"${currentUser ? ` href="#/stacks/${x.id}"` : ""} title="${esc(x.n)}: ${esc(names)}">
                  ${tag}<span class="rm-ic" style="--bc:${x.c}">${stackGlyph(x)}<em>${n}</em></span>
                  <b>${esc(x.n)}</b><small>${sk.length} skill</small>
                </${el}>
              </li>`;
            }).join("")}
          </ol>`).join("")}
      </div>`;
  }

  /* Roadmap: bekatlar bo'ylab oqadigan "suv yo'li" va yuguruvchi puls */
  let rmObserver = null;
  function buildRoadmapFlow() {
    const root = $(".roadmap");
    if (!root) return;
    const nodes = $$(".rm-node", root);
    if (nodes.length < 2) return;
    const draw = () => {
      const W = root.offsetWidth, H = root.offsetHeight;
      const pts = nodes.map((n) => {
        const ic = $(".rm-ic", n);
        let x = ic.offsetWidth / 2, y = ic.offsetHeight / 2, el = ic;
        while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
        return { x, y };
      });
      const rows = []; // ketma-ket bir xil y dagi nuqtalar = qator
      pts.forEach((p) => {
        const row = rows[rows.length - 1];
        if (row && Math.abs(row[0].y - p.y) < 6) row.push(p); else rows.push([p]);
      });
      // Bekatlar qator chiziqlarida yotadi: yo'l bo'ylab masofani yo'lni chizish bilan birga hisoblaymiz.
      let d = `M ${pts[0].x} ${pts[0].y}`, acc = 0;
      const at = new Map();
      rows.forEach((row, r) => {
        const last = row[row.length - 1];
        row.forEach((p) => at.set(p, acc + Math.abs(p.x - row[0].x)));
        acc += Math.abs(last.x - row[0].x);
        d += ` L ${last.x} ${last.y}`;
        const next = rows[r + 1];
        if (!next) return;
        const toRight = last.x >= row[0].x;
        const y2 = next[0].y, dy = y2 - last.y;
        const room = toRight ? W - last.x : last.x;
        const out = Math.max(14, Math.min(46, room - 6));
        const rad = Math.min(out, dy / 2);
        const xt = toRight ? last.x + out : last.x - out;
        const sx = toRight ? 1 : -1, sw = toRight ? 1 : 0;
        d += ` L ${xt - sx * rad} ${last.y} A ${rad} ${rad} 0 0 ${sw} ${xt} ${last.y + rad}`
          + ` L ${xt} ${y2 - rad} A ${rad} ${rad} 0 0 ${sw} ${xt - sx * rad} ${y2}`
          + ` L ${next[0].x} ${y2}`;
        acc += Math.abs(xt - sx * rad - last.x) + Math.PI * rad + Math.max(0, dy - 2 * rad) + Math.abs(next[0].x - (xt - sx * rad));
      });
      let svg = $(".rm-flow", root);
      if (!svg) {
        root.insertAdjacentHTML("afterbegin", `<svg class="rm-flow" aria-hidden="true"><path class="rm-bed"/><path class="rm-track"/><path class="rm-pulse"/></svg>`);
        svg = $(".rm-flow", root);
      }
      svg.setAttribute("width", W); svg.setAttribute("height", H);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const bed = $(".rm-bed", svg), track = $(".rm-track", svg), pulse = $(".rm-pulse", svg);
      [bed, track, pulse].forEach((el) => el.setAttribute("d", d));
      const L = pulse.getTotalLength();
      const len = Math.max(60, Math.min(120, L / 28));
      pulse.style.setProperty("--len", `${len}px`);
      pulse.style.setProperty("--L", `${L}px`);
      pulse.style.strokeDasharray = `${len} ${L + len}`;
      // har bir bekat pulsga qachon yetishi: yo'l bo'ylab masofa / umumiy uzunlik
      pts.forEach((p, i) => {
        $(".rm-ic", nodes[i]).style.setProperty("--t", (Math.min(at.get(p), L) / (L + len)).toFixed(4));
      });
    };
    draw();
    if (rmObserver) rmObserver.disconnect();
    if (window.ResizeObserver) {
      let raf = 0, lastW = root.offsetWidth;
      rmObserver = new ResizeObserver(() => {
        if (root.offsetWidth === lastW) return;
        lastW = root.offsetWidth;
        cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
      });
      rmObserver.observe(root);
    }
  }

  function renderHome() {
    const subs = allSubs();
    const iqAll = window.INTERVIEW_QUESTIONS || [];
    const testsAll = (window.INTERVIEW_TESTS || []).length;
    const authed = !!currentUser;
    const last = BY_SLUG[store.get(KEYS.last, "")];
    const cont = last || SKILLS[0];
    const st = statsFor(subs);
    const contStats = cont ? statsFor(cont.subskills) : null;
    const scores = Object.values(quizScores || {}).filter((v) => Number.isFinite(v));
    const scoreAvg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const iqDone = iqAll.filter((q) => masteredIq.has(q.id)).length;
    const seg = (n) => `${(n / (st.total || 1)) * 100}%`;

    view().innerHTML = `
      ${loadErrorBlock()}
      <section class="lp-hero lp-hero-c reveal">
        <span class="lp-glow" aria-hidden="true"></span>
        <h1><span>Stack Map</span></h1>
        <p>Har bir texnologiya bitta stack: darslar, amaliy topshiriqlar, intervyu savollari va testlar bir joyda. Stackni tanlang va mavzularni belgilab boring.</p>
        ${authed ? `<div class="lp-cta"><a class="btn btn-primary btn-lg" href="#/stacks">Stacklarni ko'rish ${icon("arrow-right")}</a><a class="btn btn-lg" href="#/interview">Intervyuga tayyorlanish</a></div>` : ""}
      </section>

      <section class="lp-section lp-logos" aria-label="Texnologiyalar">
        <div class="stk-marquee">${stkRow(TECH_LOGOS)}</div>
      </section>

      <section class="lp-section" aria-label="Raqamlar">
        <ul class="lp-stats">
          <li><b data-count="${TECH_LOGOS.length}">0</b><span>stack</span></li>
          <li><b data-count="${SKILLS.length}">0</b><span>skill</span></li>
          <li><b data-count="${subs.length}">0</b><span>mavzu</span></li>
          <li><b data-count="${iqAll.length}">0</b><span>intervyu savoli</span></li>
          <li><b data-count="${testsAll}">0</b><span>texnik test</span></li>
        </ul>
      </section>

      <section class="lp-section" id="lp-how" aria-label="Qanday ishlaydi">
        <div class="lp-head lp-head-c"><h2>Qanday ishlaydi</h2><p>Uch qadam: tanlang, o'rganing, sinang.</p></div>
        <ol class="lp-steps">
          <li><span class="lp-step-n">1</span><span class="tile-ic">${icon("boxes")}</span><h3>Stackni tanlang</h3><p>PHP, Laravel, Redis, Docker yoki boshqa texnologiya. Har stack unga bog'liq skillarni jamlaydi.</p></li>
          <li><span class="lp-step-n">2</span><span class="tile-ic">${icon("file")}</span><h3>Darsni o'rganing</h3><p>Chuqur tushuntirish, kod misollari, odatiy xatolar va amaliy topshiriq. Holatni belgilab boring.</p></li>
          <li><span class="lp-step-n">3</span><span class="tile-ic">${icon("target")}</span><h3>Intervyu bilan sinang</h3><p>Savollar, testlar va takrorlash jadvali bilimni mustahkamlaydi.</p></li>
        </ol>
      </section>

      <section class="lp-section" aria-label="Yo'l xaritasi">
        ${roadmapHtml()}
      </section>

      <section class="lp-section" aria-label="Dars namunasi">
        <div class="lp-head lp-head-c"><h2>Dars ichida nima bor</h2><p>Tushuntirish, kod, tuzoqlar va holat paneli bir sahifada.</p></div>
        <div class="lp-mock" aria-hidden="true">
          <div class="lp-mock-bar"><i></i><i></i><i></i><span>Stack Map / PHP / 1.4 Type Juggling</span></div>
          <div class="lp-mock-body">
            <div class="lp-mock-main">
              <div class="chips"><span class="chip mono">1.4</span><span class="chip important">Muhim</span><span class="chip level">Junior</span></div>
              <h3>Type Juggling va Type Coercion</h3>
              <p>PHP <code class="inline-code">==</code> solishtirishda qiymatlarni umumiy tipga keltiradi. PHP 8 da bu qoidalar o'zgargan...</p>
              <pre class="lp-mock-code"><span class="k">var_dump</span>(0 == <span class="s">"admin"</span>);  <span class="c">// false (PHP 8)</span>
<span class="k">var_dump</span>(<span class="s">"1e3"</span> == <span class="s">"1000"</span>); <span class="c">// true</span></pre>
              <ul class="pitfalls"><li><code class="inline-code">in_array</code> strict parametrsiz loose ishlaydi.</li></ul>
            </div>
            <div class="lp-mock-rail"><b>Holat</b><span class="st-pill">Boshlanmagan</span><span class="st-pill on">O'rganilmoqda</span><span class="st-pill">Ishonchli</span></div>
          </div>
        </div>
      </section>

      <section class="lp-section" id="lp-faq" aria-label="Savol-javob">
        <div class="lp-head lp-head-c"><h2>Savol-javob</h2></div>
        <div class="lp-faq">
          <details><summary>Sayt internetsiz ishlaydimi?</summary><p>Ha. Sayt oddiy fayllardan iborat va brauzerda to'g'ridan-to'g'ri ochiladi: server yoki build kerak emas.</p></details>
          <details><summary>Progress qayerda saqlanadi?</summary><p>Faqat sizning brauzeringizda, lokal hisob bilan. Hech narsa serverga yuborilmaydi.</p></details>
          <details><summary>Qaysi darajalar bor?</summary><p>Mavzu va savollar Junior, Middle, Senior (va intervyuda Lead) darajalari bo'yicha belgilangan, filtrlash mumkin.</p></details>
          <details><summary>Darslar qaysi tilda?</summary><p>O'zbek tilida (lotin), texnik atamalar inglizcha qoldirilgan.</p></details>
          <details><summary>Savollar qanday takrorlanadi?</summary><p>Leitner tizimi: to'g'ri bilgan savol keyinroq (1, 3, 7, 14, 30 kun), qiyin bo'lgani tezroq qaytadi.</p></details>
          <details><summary>Barcha darslar to'liqmi?</summary><p>PHP stacki chuqur darslar bilan to'ldirilgan; qolganlari bosqichma-bosqich to'ldirilmoqda.</p></details>
        </div>
      </section>

      <footer class="lp-footer">
        <div class="lp-foot-brand"><b>Stack Map</b><span>Senior PHP / Laravel dasturchi uchun texnologiyalar xaritasi</span></div>
        <nav aria-label="Pastki havolalar">${authed ? `<a href="#/stacks">Stacklar</a><a href="#/" data-scroll="lp-faq">Savol-javob</a><a href="#/interview">Intervyu</a><a href="#/quiz">Testlar</a><a href="#/profile">Profil</a>` : `<a href="#/" data-scroll="lp-faq">Savol-javob</a>`}</nav>
        <small>© ${new Date().getFullYear()} Stack Map</small>
      </footer>`;
    buildRoadmapFlow();
    initLanding();
  }

  function initLanding() {
    const els = $$(".lp-stats [data-count]");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (el) => {
      const to = Number(el.dataset.count) || 0;
      if (reduce || !to) { el.textContent = to.toLocaleString("en-US").replace(/,/g, " "); return; }
      const t0 = performance.now(), dur = 900;
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
        el.textContent = v.toLocaleString("en-US").replace(/,/g, " ");
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .4 });
    els.forEach((el) => io.observe(el));
  }

  function placeholder(title, path) {
    return `<div class="placeholder">${icon("file")}<div><b>${title}</b>Bu joy tavsif uchun ajratilgan. To'ldirish: <code>${esc(path)}</code></div></div>`;
  }

  let IQ_BY_SUB = null;
  function iqCountFor(subId) {
    if (!IQ_BY_SUB) {
      IQ_BY_SUB = {};
      (window.INTERVIEW_QUESTIONS || []).forEach((q) => { if (q.subskillId) IQ_BY_SUB[q.subskillId] = (IQ_BY_SUB[q.subskillId] || 0) + 1; });
    }
    return IQ_BY_SUB[subId] || 0;
  }

  /* Qisqa mazmun: tavsifning birinchi gapi (markdown belgilarisiz) */
  function subExcerpt(desc) {
    const first = String(desc || "").split(/\n\s*\n|```/)[0].replace(/[`*_#>]/g, "").replace(/\s+/g, " ").trim();
    if (!first) return "";
    if (first.length <= 130) return first;
    const cut = first.slice(0, 130);
    return cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : 130) + "…";
  }

  function subItem(x) {
    const st = statusOf(x.id);
    const domId = `sub-${x.id.replace(/\./g, "-")}`;
    const chips = [
      x.priority && PRIORITY[x.priority] ? `<span class="chip ${x.priority}">${PRIORITY[x.priority]}</span>` : "",
      x.level ? `<span class="chip level">${esc(x.level)}</span>` : "",
      LESSONS[x.id] ? `<span class="chip lesson" title="Chuqur dars bor">Dars</span>` : "",
      !x.description ? `<span class="chip missing" title="Tavsif hali yozilmagan">tavsif yo'q</span>` : "",
    ].join("");
    const ex = subExcerpt(x.description);

    return `<li class="sub" id="${domId}" data-sub="${x.id}" data-st="${st}" data-level="${levelOf(x)}">
      <div class="sub-row">
        <button class="st-toggle" data-cycle aria-label="Status: ${STATUSES[st].label}. Keyingisiga o'tkazish">
          <span class="ring"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>
        </button>
        <a class="sub-main" href="#/s/${x.skill.slug}/${x.id}">
          <span class="sid">${x.num}</span>
          <span class="sub-text"><span class="t">${inline(x.title)}</span>${ex ? `<span class="sub-excerpt">${esc(ex)}</span>` : ""}</span>
        </a>
        <div class="sub-side">
          <span class="chips">${chips}</span>
          <span class="st-name">${st ? STATUSES[st].label : ""}</span>
          ${icon("chev-right", "ic chev")}
        </div>
      </div>
    </li>`;
  }

  let filter = "all";
  let levelFilter = "all";
  /* Global daraja filtri (sidebar): tanlansa subskill ro'yxatlarida mahalliy daraja tugmalari bloklanadi */
  const globalLevels = new Set(); // global daraja filtri sidebar bilan olib tashlangan; lokal filtr ishlaydi
  const FILTERS = [
    ["all", "Barchasi"], ["todo", "Boshlanmagan"], ["wip", "O'rganilmoqda"], ["done", "Ishonchli"],
  ];
  const passes = (st, lvl) => {
    const stOk = filter === "all" || (filter === "todo" && st === 0) || (filter === "wip" && st === 1) || (filter === "done" && st === 2);
    const lvlOk = globalLevels.size ? globalLevels.has(lvl) : (levelFilter === "all" || levelFilter === lvl);
    return stOk && lvlOk;
  };

  function railHtml(s) {
    const st = statsFor(s.subskills);
    const C = 2 * Math.PI * 36;
    return `
      <section class="card" aria-label="Progress">
        <h3>Progress</h3>
        <div class="ring-chart">
          <svg viewBox="0 0 84 84" aria-hidden="true"><circle class="track" cx="42" cy="42" r="36"/>
            <circle class="val" cx="42" cy="42" r="36" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - st.progress)}"/></svg>
          <div><div class="big">${pct(st.progress)}%</div><div class="small">${st.done} / ${st.total} o'zlashtirilgan</div></div>
        </div>
        <ul class="breakdown">${STATUSES.map((x, i) => `<li data-st="${i}"><i class="st-dot"></i>${x.label}<b>${st.counts[i]}</b></li>`).join("")}</ul>
      </section>
      <section class="card" aria-label="Tavsiflar">
        <h3>Tavsiflar</h3>
        <div class="ring-chart" style="margin-top:12px"><div><div class="big">${st.described}<span style="font-size:15px;color:var(--text-3)"> / ${st.total}</span></div>
          <div class="small">subskill tavsifi yozilgan</div></div></div>
        <div class="bar"><i style="width:${(st.described / (st.total || 1)) * 100}%"></i></div>
        <p style="margin-top:14px;font-size:13px;color:var(--text-3)">Manba fayl:<br><code class="inline-code" style="word-break:break-all">data/skills/${esc(s.file)}</code></p>
      </section>`;
  }

  /* ---------------- Subskill sahifasi (dars) ---------------- */
  function codeCardHtml(ex) {
    const code = text(ex.code);
    return `<figure class="code-card">
      <figcaption><b>${esc(ex.title || "Misol")}</b><span class="lang">${esc(ex.lang || "php")}</span>
        <button type="button" class="icon-btn" data-copy-code aria-label="Kodni nusxalash" title="Nusxalash">${icon("copy", "ic ic-sm")}</button></figcaption>
      <pre data-lang="${esc(ex.lang || "php")}"><code>${highlight(code)}</code></pre>
      ${ex.note ? `<p class="code-note">${inline(ex.note)}</p>` : ""}
    </figure>`;
  }

  function renderSubskill(x) {
    const s = x.skill;
    store.set(KEYS.last, s.slug);
    const L = LESSONS[x.id] || null;
    const st = statusOf(x.id);
    const idx = s.subskills.indexOf(x);
    const prev = s.subskills[idx - 1] || null, next = s.subskills[idx + 1] || null;
    const prevSkill = !prev ? SKILLS[s.index - 1] : null, nextSkill = !next ? SKILLS[s.index + 1] : null;
    const qs = (window.INTERVIEW_QUESTIONS || []).filter((q) => q.subskillId === x.id);
    const g = s.groupRef;
    const prereq = x.prerequisites.map((p) => {
      const target = SUB_BY_ID[p] || BY_SLUG[p];
      if (!target) return `<span class="chip">${inline(p)}</span>`;
      const href = target.skill ? `#/s/${target.skill.slug}/${target.id}` : `#/s/${target.slug}`;
      return `<a class="chip" href="${href}">${inline(target.title)}</a>`;
    }).join("");
    const lvlLabel = x.level || "";
    const pager = (sub, skill, dir) => {
      if (sub) return `<a ${dir === "next" ? 'class="next"' : ""} href="#/s/${s.slug}/${sub.id}"><span class="dir">${dir === "next" ? `Keyingi${icon("arrow-right", "ic ic-sm")}` : `${icon("arrow-left", "ic ic-sm")}Oldingi`}</span><span class="t">${sub.num} · ${inline(sub.title)}</span></a>`;
      if (skill) return `<a ${dir === "next" ? 'class="next"' : ""} href="#/s/${skill.slug}"><span class="dir">${dir === "next" ? `Keyingi skill${icon("arrow-right", "ic ic-sm")}` : `${icon("arrow-left", "ic ic-sm")}Oldingi skill`}</span><span class="t">${pad(skill.num)} · ${esc(skill.title)}</span></a>`;
      return "";
    };

    view().innerHTML = `
      ${loadErrorBlock()}
      <div class="lesson-layout">
        <article class="lesson">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="#/stacks">Stacklar</a><span class="sep">/</span>${stackCrumb(s)}<span class="sep">/</span><a href="#/s/${s.slug}">${esc(s.title)}</a><span class="sep">/</span><span aria-current="page">${x.num}</span></nav>
          <header class="lesson-head reveal">
            <div class="chips">
              <span class="chip mono">${x.num}</span>
              ${x.priority ? `<span class="chip ${x.priority}">${esc(PRIORITY[x.priority] || x.priority)}</span>` : ""}
              ${lvlLabel ? `<span class="chip level">${esc(lvlLabel)}</span>` : ""}
              ${qs.length ? `<a class="chip" href="#/interview?sub=${esc(x.id)}">Intervyu savollari: ${qs.length}</a>` : ""}
            </div>
            <h1>${inline(x.title)}</h1>
          </header>

          <section class="lesson-sec"><h2>Qisqacha</h2><div class="md">${markdown(x.description)}</div></section>

          ${L && L.lesson ? `<section class="lesson-sec"><h2>Chuqur tushuntirish</h2><div class="md lesson-md">${markdown(L.lesson)}</div></section>`
            : `<section class="lesson-sec">${lessonsLoaded ? placeholder("Chuqur dars hali yozilmagan", `data/lessons/${x.id}.js`)
              : `<div class="loading"><div class="spinner"></div>Chuqur dars yuklanmoqda…</div>`}</section>`}

          ${L && L.examples && L.examples.length ? `<section class="lesson-sec"><h2>Kod misollari</h2>${L.examples.map(codeCardHtml).join("")}</section>` : ""}

          ${L && L.pitfalls && L.pitfalls.length ? `<section class="lesson-sec"><h2>Odatiy xatolar</h2><ul class="pitfalls">${list(L.pitfalls).map((p) => `<li>${inline(p)}</li>`).join("")}</ul></section>` : ""}

          ${x.practicalTask ? `<section class="lesson-sec"><h2>Amaliy topshiriq</h2><div class="task">${markdown(x.practicalTask)}</div></section>` : ""}

          ${x.acceptanceCriteria.length ? `<section class="lesson-sec"><h2>Qabul mezonlari</h2><ul class="checklist">${x.acceptanceCriteria.map((c) => `<li>${icon("check")}<span>${inline(c)}</span></li>`).join("")}</ul></section>` : ""}

          ${prereq ? `<section class="lesson-sec"><h2>Oldindan bilish kerak</h2><div class="prereq">${prereq}</div></section>` : ""}

          ${qs.length ? `<section class="lesson-sec"><h2>Shu mavzudagi intervyu savollari</h2>
            <ul class="lesson-qs">${qs.map((q) => `<li><a href="#/interview?sub=${esc(x.id)}"><span class="iq-badge ${q.level}">${q.level}</span><span>${esc(q.title)}</span></a></li>`).join("")}</ul></section>` : ""}

        </article>

        <aside class="lesson-rail" aria-label="Mavzu paneli">
          <section class="rail-card">
            <h3 class="panel-title">Holat</h3>
            <div class="status-picker lesson-status" role="radiogroup" aria-label="Mavzu holati">
              ${STATUSES.map((v, i) => `<button type="button" role="radio" data-lesson-set="${i}" data-st="${i}" aria-checked="${i === st}" title="${v.hint}"><i class="st-dot"></i>${v.label}</button>`).join("")}
            </div>
          </section>
          <section class="rail-card">
            <h3 class="panel-title">${esc(s.title)}</h3>
            <ol class="lesson-toc">${s.subskills.map((y) => `<li${y === x ? ' aria-current="page"' : ""} data-st="${statusOf(y.id)}"><a href="#/s/${s.slug}/${y.id}"><i class="st-dot"></i><span class="num">${y.num}</span><span class="t">${inline(y.title)}</span>${LESSONS[y.id] ? `<span class="has-lesson" title="Chuqur dars bor"></span>` : ""}</a></li>`).join("")}</ol>
          </section>
        </aside>
      </div>`;
    const cur = $('.lesson-toc [aria-current="page"]');
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }

  function renderSkill(s, subId) {
    store.set(KEYS.last, s.slug);
    const stk = skillStack(s), stkSkills = stk ? stackSkills(stk) : SKILLS;
    const prev = stkSkills[stkSkills.indexOf(s) - 1], next = stkSkills[stkSkills.indexOf(s) + 1];
    const st = statsFor(s.subskills);

    view().innerHTML = `
      ${loadErrorBlock()}
      <div class="skill-layout">
        <article>
          <nav class="crumbs" aria-label="Breadcrumb"><a href="#/stacks">Stacklar</a><span class="sep">/</span>${stackCrumb(s)}<span class="sep">/</span><span aria-current="page">${esc(s.title)}</span></nav>
          <header class="skill-head reveal">
            <div class="idx">${stk ? esc(stk.n.toUpperCase()) + " · " : ""}SKILL ${stkSkills.indexOf(s) + 1} / ${stkSkills.length}</div>
            <h1>${esc(s.title)}</h1>
            <div class="chips">
              ${stk ? `<a class="chip" href="#/stacks/${stk.id}">${stackLogo(stk)}${esc(stk.n)}</a>` : ""}
              <span class="chip mono">${s.subskills.length} subskill</span>
              <span class="chip mono" data-desc-chip>tavsif ${st.described}/${st.total}</span>
            </div>
          </header>
          <div class="desc-block">${s.description ? markdown(s.description)
            : placeholder("Skill tavsifi hali yozilmagan", `data/skills/${s.file} → description`)}</div>

          <div class="toolbar">
            <h2>Subskill'lar <span class="chip">${s.subskills.length}</span></h2>
            <div class="seg" role="group" aria-label="Status bo'yicha filtr">
              ${FILTERS.map(([k, l]) => `<button data-filter="${k}" aria-pressed="${filter === k}">${l}</button>`).join("")}
            </div>
            <div class="level-seg${globalLevels.size ? " is-global" : ""}" role="group" aria-label="Daraja bo'yicha filtr"${globalLevels.size ? ` title="Global daraja filtri yoqilgan (chapdagi tugmalar)"` : ""}>
              <button data-level-filter="all" aria-pressed="${!globalLevels.size && levelFilter === "all"}"${globalLevels.size ? " disabled" : ""}>Barchasi</button>
              ${CAREER_LEVELS.map((lvl) => `<button data-level-filter="${lvl.id}" aria-pressed="${globalLevels.size ? globalLevels.has(lvl.id) : levelFilter === lvl.id}"${globalLevels.size ? " disabled" : ""}>${lvl.label}</button>`).join("")}
            </div>
          </div>
          <ul class="subs" id="subs">${s.subskills.map(subItem).join("")}</ul>
          <div class="empty" id="subs-empty" hidden>${icon("search")}<div>Bu filtr bo'yicha mavzu yo'q.</div></div>

          <nav class="pager" aria-label="Skill'lar orasida">
            ${prev ? `<a href="#/s/${prev.slug}"><span class="dir">${icon("arrow-left", "ic ic-sm")}Oldingi</span><span class="t">${pad(prev.num)} · ${esc(prev.title)}</span></a>` : ""}
            ${next ? `<a class="next" href="#/s/${next.slug}"><span class="dir">Keyingi${icon("arrow-right", "ic ic-sm")}</span><span class="t">${pad(next.num)} · ${esc(next.title)}</span></a>` : ""}
          </nav>
        </article>
        <aside class="rail" id="rail">${railHtml(s)}</aside>
      </div>`;

    applyFilter();
    if (subId && SUB_BY_ID[subId] && SUB_BY_ID[subId].skill === s) {
      const li = $(`[data-sub="${CSS.escape(subId)}"]`);
      if (li) {
        if (li.hidden) {
          filter = "all";
          levelFilter = "all";
          if (globalLevels.size) { globalLevels.clear(); store.set(KEYS.levels, []); syncLevelUI(); }
          $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === "all")));
          $$("[data-level-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.levelFilter === "all")));
          applyFilter();
        }
        toggleSub(li, true);
        requestAnimationFrame(() => li.scrollIntoView({ block: "start" }));
      }
    }
  }

  function syncLevelUI() {
    const on = globalLevels.size > 0;
    $$("[data-glevel]").forEach((b) => b.setAttribute("aria-pressed", String(globalLevels.has(b.dataset.glevel))));
    const seg = $(".level-seg");
    if (seg) {
      seg.classList.toggle("is-global", on);
      if (on) seg.title = "Global daraja filtri yoqilgan (chapdagi tugmalar)"; else seg.removeAttribute("title");
    }
    $$("[data-level-filter]").forEach((b) => {
      const id = b.dataset.levelFilter;
      b.disabled = on;
      b.setAttribute("aria-pressed", String(on ? globalLevels.has(id) : levelFilter === id));
    });
  }

  function applyFilter() {
    let visible = 0;
    $$("#subs .sub").forEach((li) => {
      const ok = passes(Number(li.dataset.st), li.dataset.level);
      li.hidden = !ok; if (ok) visible++;
    });
    const empty = $("#subs-empty");
    if (empty) empty.hidden = visible > 0;
  }

  function toggleSub(li, force) {
    const open = force ?? !li.classList.contains("open");
    li.classList.toggle("open", open);
    li.querySelector(".sub-main").setAttribute("aria-expanded", String(open));
  }

  function refreshSkillStats(s) {
    const rail = $("#rail");
    if (rail) rail.innerHTML = railHtml(s);
    updateSidebarProgress(s.slug);
  }

  function changeStatus(li, st) {
    const id = li.dataset.sub;
    setStatus(id, st);
    li.dataset.st = String(st);
    li.querySelector(".st-name").textContent = st ? STATUSES[st].label : "";
    li.querySelector("[data-cycle]").setAttribute("aria-label", `Status: ${STATUSES[st].label}. Keyingisiga o'tkazish`);
    $$(".status-picker [data-set]", li).forEach((b) => b.setAttribute("aria-checked", String(Number(b.dataset.set) === st)));
    refreshSkillStats(SUB_BY_ID[id].skill);
  }

  /* view-level event delegation (skill page) */
  document.addEventListener("click", (e) => {
    const sc = e.target.closest("[data-scroll]");
    if (sc) {
      e.preventDefault();
      const go = () => { const el = document.getElementById(sc.dataset.scroll); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
      if (document.body.dataset.section === "home") go(); else { location.hash = "#/"; setTimeout(go, 150); }
      return;
    }
    const t = e.target;
    if (t.closest("[data-open-palette]")) { openPalette(); return; }

    const li = t.closest(".sub");
    if (li) {
      if (t.closest("[data-cycle]")) { changeStatus(li, (Number(li.dataset.st) + 1) % STATUSES.length); return; }
      const set = t.closest("[data-set]");
      if (set) { changeStatus(li, Number(set.dataset.set)); return; }
      if (t.closest("[data-toggle]")) { toggleSub(li); return; }
      if (t.closest("[data-copy]")) {
        const s = SUB_BY_ID[li.dataset.sub].skill;
        copyText(`${location.href.split("#")[0]}#/s/${s.slug}/${li.dataset.sub}`);
        return;
      }
    }
    const gl = t.closest("[data-glevel]");
    if (gl) {
      const id = gl.dataset.glevel;
      if (globalLevels.has(id)) globalLevels.delete(id); else globalLevels.add(id);
      store.set(KEYS.levels, Array.from(globalLevels));
      syncLevelUI();
      applyFilter();
      return;
    }
    const lf = t.closest("[data-level-filter]");
    if (lf && !lf.disabled) {
      levelFilter = lf.dataset.levelFilter;
      $$("[data-level-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === lf)));
      applyFilter();
      return;
    }
    const f = t.closest("[data-filter]");
    if (f) {
      filter = f.dataset.filter;
      $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === f)));
      applyFilter();
      return;
    }
    if (t.closest("[data-expand-all]")) {
      const items = $$(".subs .sub:not([hidden])");
      const anyClosed = items.some((x) => !x.classList.contains("open"));
      items.forEach((x) => toggleSub(x, anyClosed));
      return;
    }
    const iqToggle = t.closest("[data-iq-toggle]");
    if (iqToggle) {
      const card = iqToggle.closest(".iq-card");
      if (card) {
        const nowOpen = card.classList.toggle("open");
        iqToggle.setAttribute("aria-expanded", String(nowOpen));
      }
      return;
    }
    const copyCode = t.closest("[data-copy-code]");
    if (copyCode) { const pre = copyCode.closest(".code-card").querySelector("pre"); copyText(pre.innerText); return; }
    const lset = t.closest("[data-lesson-set]");
    if (lset) {
      const m2 = location.hash.match(/^#\/s\/[^/]+\/(.+)$/); const id = m2 && decodeURIComponent(m2[1]);
      if (id && SUB_BY_ID[id]) {
        const v = Number(lset.dataset.lessonSet);
        setStatus(id, v);
        $$("[data-lesson-set]").forEach((b) => b.setAttribute("aria-checked", String(b === lset)));
        const li = $(".lesson-toc [aria-current]"); if (li) li.dataset.st = String(v);
        updateSidebarProgress(SUB_BY_ID[id].skill.slug);
      }
      return;
    }
    const iqRate = t.closest("[data-iq-rate]");
    if (iqRate) { rateIq(iqRate.dataset.iqRate, Number(iqRate.dataset.r)); return; }
    const iqModeBtn = t.closest("[data-iq-mode]");
    if (iqModeBtn) {
      iqMode = iqModeBtn.dataset.iqMode;
      if (iqMode === "today" && !iqTodayIds.length) iqPickToday(5);
      $$("[data-iq-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqMode === iqMode)));
      const ctrl = $("#iq-controls"); if (ctrl) ctrl.hidden = iqMode !== "all";
      const bar = $("#iq-today-bar"); if (bar) { bar.hidden = iqMode !== "today"; bar.innerHTML = iqMode === "today" ? iqTodayBarHtml() : ""; }
      filterInterviewList();
      return;
    }
    const iqMore = t.closest("[data-iq-more]");
    if (iqMore) {
      iqPickToday(5);
      if ($("#iq-items")) renderIqBrowse();
      return;
    }
    const iqBookmark = t.closest("[data-iq-bookmark]");
    if (iqBookmark) {
      toggleBookmarkIq(iqBookmark.dataset.iqBookmark);
      return;
    }
    const iqScrollQuiz = t.closest("[data-iq-scroll-quiz]");
    if (iqScrollQuiz) {
      const qSection = document.getElementById("iq-quiz-section");
      if (qSection) qSection.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const quizCatBtn = t.closest("[data-quiz-cat]");
    if (quizCatBtn) {
      handleQuizChangeCat(quizCatBtn.dataset.quizCat);
      return;
    }
    const quizLevelBtn = t.closest("[data-quiz-level]");
    if (quizLevelBtn) {
      handleQuizChangeLevel(quizLevelBtn.dataset.quizLevel);
      return;
    }
    const quizCountBtn = t.closest("[data-quiz-count]");
    if (quizCountBtn) {
      handleQuizSetCount(quizCountBtn.dataset.quizCount);
      return;
    }
    const quizStartBtn = t.closest("[data-quiz-start]");
    if (quizStartBtn) {
      handleQuizStart();
      return;
    }
    const quizOptBtn = t.closest("[data-quiz-opt]");
    if (quizOptBtn && !quizOptBtn.disabled) {
      handleQuizSelect(quizOptBtn.dataset.quizOpt);
      return;
    }
    const quizNextBtn = t.closest("[data-quiz-next]");
    if (quizNextBtn) {
      handleQuizNext();
      return;
    }
    const quizRestartBtn = t.closest("[data-quiz-restart]");
    if (quizRestartBtn) {
      handleQuizRestart();
      return;
    }
    const quizToLobbyBtn = t.closest("[data-quiz-to-lobby]");
    if (quizToLobbyBtn) {
      handleQuizBackToLobby();
      return;
    }
    const quizReviewWrongsBtn = t.closest("[data-quiz-review-wrongs]");
    if (quizReviewWrongsBtn) {
      handleQuizReviewWrongs();
      return;
    }
    const quizChooseCatBtn = t.closest("[data-quiz-choose-cat]");
    if (quizChooseCatBtn) {
      const catsEl = document.querySelector(".iq-quiz-cats");
      if (catsEl) catsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      handleQuizChangeCat("all");
      return;
    }
    const quizScrollTopBtn = t.closest("[data-quiz-scroll-top]");
    if (quizScrollTopBtn) {
      const topEl = document.querySelector(".page-head");
      if (topEl) topEl.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const iqStartMock = t.closest("[data-iq-start-mock]");
    if (iqStartMock) {
      openMockModal("setup");
      return;
    }
    const mockCountBtn = t.closest("[data-mock-count]");
    if (mockCountBtn) {
      mockSelectedCount = Number(mockCountBtn.dataset.mockCount);
      $$("[data-mock-count]").forEach(b => b.setAttribute("aria-pressed", String(b === mockCountBtn)));
      return;
    }
    if (t.closest("[data-mock-start]")) {
      startMockTest(mockSelectedCount);
      return;
    }
    if (t.closest("[data-mock-close]")) {
      closeMockModal();
      return;
    }
    if (t.closest("[data-mock-reveal]")) {
      revealMockAnswer();
      return;
    }
    const mockEvalBtn = t.closest("[data-mock-eval]");
    if (mockEvalBtn) {
      recordMockEval(mockEvalBtn.dataset.mockEval);
      return;
    }
    if (t.closest("[data-mock-restart]")) {
      openMockModal("setup");
      return;
    }
    const iqCopy = t.closest("[data-iq-copy]");
    if (iqCopy) {
      const qId = iqCopy.dataset.iqCopy;
      const q = (window.INTERVIEW_QUESTIONS || []).find((x) => x.id === qId);
      if (q) {
        const ans = Array.isArray(q.answer) ? q.answer.join("\n") : q.answer;
        const full = `Savol: ${q.title}\n\n${q.code ? q.code + "\n\n" : ""}Javob:\n${ans}\n\n${q.tip ? "Senior Maslahati: " + q.tip : ""}`;
        copyText(full);
        toast("Savol va javob nusxalandi");
      }
      return;
    }
    const pxOpen = t.closest("[data-px-open]");
    if (pxOpen) {
      const ids = iqOrderedIds();
      iqStartSession(ids, Math.max(0, ids.indexOf(pxOpen.dataset.pxOpen)));
      return;
    }
    if (t.closest("[data-px-play]")) {
      const ids = iqOrderedIds(), fresh = ids.filter((id) => !masteredIq.has(id));
      iqStartSession(fresh.length ? fresh : ids);
      return;
    }
    if (t.closest("[data-iq-play-today]")) {
      const left = iqTodayIds.filter((id) => !(iqSrs[id] && iqSrs[id].last === dayStr()));
      iqStartSession(left.length ? left : iqTodayIds.slice(), 0, "Bugungi navbat");
      return;
    }
    if (t.closest("[data-px-reveal]")) { iqRevealSess(); return; }
    const pxRate = t.closest("[data-px-rate]");
    if (pxRate) { iqRateSess(Number(pxRate.dataset.pxRate)); return; }
    const pxStep = t.closest("[data-px-step]");
    if (pxStep) { iqStepSess(Number(pxStep.dataset.pxStep)); return; }
    const pxGo = t.closest("[data-px-go]");
    if (pxGo && iqSess) { iqSess.idx = Number(pxGo.dataset.pxGo); renderIqPlay(); return; }
    if (t.closest("[data-px-retry]") && iqSess) {
      const weak = iqSess.ids.filter((id) => iqSess.rated[id] !== undefined && iqSess.rated[id] < 2);
      iqStartSession(weak);
      return;
    }
    if (t.closest("[data-quiz-quick]")) {
      quizActiveCat = "all"; quizActiveLevel = "all"; quizSelectedCount = 10;
      handleQuizStart();
      return;
    }
    const lvlBtn = t.closest("[data-iq-lvl]");
    if (lvlBtn) {
      iqFilterLevel = lvlBtn.dataset.iqLvl;
      $$("[data-iq-lvl]").forEach((b) => b.setAttribute("aria-pressed", String(b === lvlBtn)));
      filterInterviewList();
      return;
    }
    const catBtn = t.closest("[data-iq-cat]");
    if (catBtn) {
      iqFilterCat = catBtn.dataset.iqCat;
      $$("[data-iq-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b === catBtn)));
      filterInterviewList();
      return;
    }
    const statusBtn = t.closest("[data-iq-status]");
    if (statusBtn) {
      iqFilterStatus = statusBtn.dataset.iqStatus;
      $$("[data-iq-status]").forEach((b) => b.setAttribute("aria-pressed", String(b === statusBtn)));
      filterInterviewList();
      return;
    }
    const practiceBtn = t.closest("[data-iq-practice]");
    if (practiceBtn) {
      iqPracticeMode = !iqPracticeMode;
      practiceBtn.classList.toggle("active", iqPracticeMode);
      practiceBtn.setAttribute("aria-pressed", String(iqPracticeMode));
      filterInterviewList();
      toast(iqPracticeMode ? "Sinov rejimi yoqildi! Model javoblar yashirildi." : "Sinov rejimi o'chirildi.");
      return;
    }
    const clearBtn = t.closest("[data-iq-clear-search]");
    if (clearBtn) {
      const inp = $("#iq-search-input");
      if (inp) { inp.value = ""; iqSearchQuery = ""; filterInterviewList(); }
      return;
    }
    const resetBtn = t.closest("[data-iq-reset-filters]");
    if (resetBtn) {
      iqFilterLevel = "all";
      iqFilterCat = "all";
      iqFilterStatus = "all";
      iqSearchQuery = "";
      iqSubFilter = "";
      const inp = $("#iq-search-input");
      if (inp) inp.value = "";
      $$("[data-iq-lvl]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqLvl === "all")));
      $$("[data-iq-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqCat === "all")));
      $$("[data-iq-status]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqStatus === "all")));
      filterInterviewList();
      return;
    }
  });

  /* keyboard support for status picker (arrow keys inside radiogroup) */
  document.addEventListener("keydown", (e) => {
    const radio = e.target.closest && e.target.closest(".status-picker [role=radio]");
    if (!radio || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const li = radio.closest(".sub");
    const dir = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
    const st = (Number(li.dataset.st) + dir + STATUSES.length) % STATUSES.length;
    changeStatus(li, st);
    $(`.status-picker [data-set="${st}"]`, li).focus();
  });

  /* ------------------------------------------------------------------ *
   * Interview Questions & Answers View
   * ------------------------------------------------------------------ */
  let iqFilterLevel = "all";
  let iqFilterCat = "all";
  let iqFilterStatus = "all";
  let iqPracticeMode = false;
  let iqSearchQuery = "";
  let iqSubFilter = "";

  // Yo'nalishlar stacklardan hosil qilinadi (buildInterviewTaxonomy).
  let IQ_CATEGORIES = [{ id: "all", label: "Barchasi" }];

  const IQ_TYPES = { bug: "Kod xatosi", scenario: "Production holati", behavioral: "Behavioral" };
  function iqById(id) { return (window.INTERVIEW_QUESTIONS || []).find((q) => q.id === id); }

  function iqPickToday(n) {
    const qs = window.INTERVIEW_QUESTIONS || [];
    const today = dayStr();
    const taken = new Set(iqTodayIds);
    const due = qs.filter((q) => !taken.has(q.id) && iqSrs[q.id] && iqSrs[q.id].due <= today)
      .sort((a, b) => iqSrs[a.id].due.localeCompare(iqSrs[b.id].due));
    const LV = { junior: 0, middle: 1, senior: 2, lead: 3 };
    const fresh = qs.map((q, i) => ({ q, i })).filter(({ q }) => !taken.has(q.id) && !iqSrs[q.id] && !masteredIq.has(q.id))
      .sort((a, b) => (statusOf(a.q.subskillId) === 1 ? 0 : 1) - (statusOf(b.q.subskillId) === 1 ? 0 : 1)
        || (LV[a.q.level] ?? 1) - (LV[b.q.level] ?? 1) || a.i - b.i)
      .map(({ q }) => q);
    iqTodayIds.push(...[...due, ...fresh].slice(0, n).map((q) => q.id));
  }

  function iqTodayBarHtml() {
    const today = dayStr();
    const items = iqTodayIds.map(iqById).filter(Boolean);
    const dueN = items.filter((q) => iqSrs[q.id] && iqSrs[q.id].due <= today).length;
    const doneN = items.filter((q) => iqSrs[q.id] && iqSrs[q.id].last === today).length;
    return `<span><b>${items.length}</b> savol</span><span><b>${dueN}</b> takrorlash</span><span><b>${items.length - dueN}</b> yangi</span><span><b>${doneN}</b> bugun baholandi</span>
      <button class="btn btn-sm" data-iq-more>${icon("sparkles", "ic ic-sm")} Yana 5 ta</button>`;
  }

  function iqRateHtml(q) {
    const s = iqSrs[q.id];
    const btn = (r, label) => `<button type="button" data-iq-rate="${q.id}" data-r="${r}" aria-pressed="${!!s && s.r === r}">${label}</button>`;
    return `<span class="iq-rate-label">Qanchalik bildingiz?</span>
      <div class="iq-rate" role="group" aria-label="Javobni baholang">${btn(0, "Bilmadim")}${btn(1, "Qisman")}${btn(2, "Bildim")}</div>
      <span class="iq-next">${s ? `Keyingi takrorlash: ${s.due}` : ""}</span>`;
  }

  function syncSubFromQuestions(subId) {
    if (!subId || !SUB_BY_ID[subId]) return;
    const qs = (window.INTERVIEW_QUESTIONS || []).filter((q) => q.subskillId === subId);
    if (!qs.length) return;
    const st = statusOf(subId);
    const allMastered = qs.every((q) => iqSrs[q.id] && iqSrs[q.id].box >= 3);
    const anyRated = qs.some((q) => iqSrs[q.id]);
    if (allMastered && st < 2) setStatus(subId, 2);
    else if (anyRated && st === 0) setStatus(subId, 1);
    updateSidebarProgress(SUB_BY_ID[subId].skill.slug);
  }

  function rateIq(id, r) {
    const q = iqById(id); if (!q) return;
    const cur = iqSrs[id] || { box: 0 };
    let box, days;
    if (r === 2) { box = Math.min(5, Math.max(2, (cur.box || 0) + 1)); days = SRS_DAYS[box]; }
    else if (r === 1) { box = Math.max(1, cur.box || 1); days = Math.max(1, Math.round(SRS_DAYS[box] / 2)); }
    else { box = 1; days = 1; }
    iqSrs[id] = { box, due: dayStr(days), last: dayStr(), r };
    store.set(KEYS.srs, iqSrs);
    if (r === 2 && box >= 3) masteredIq.add(id); else if (r === 0) masteredIq.delete(id);
    store.set(KEYS.questions, Array.from(masteredIq));
    syncSubFromQuestions(q.subskillId);
    refreshIqCard(id);
    updateIqStats();
    const bar = $("#iq-today-bar"); if (bar && iqMode === "today") bar.innerHTML = iqTodayBarHtml();
  }

  function refreshIqCard(id) {
    const card = $(`#${CSS.escape(id)}`); const q = iqById(id);
    if (!card || !q) return;
    const wrap = $(".iq-rate-wrap", card); if (wrap) wrap.innerHTML = iqRateHtml(q);
    const isDone = masteredIq.has(id);
    let doneTag = card.querySelector(".tag-done");
    if (isDone && !doneTag) {
      const meta = card.querySelector(".iq-meta");
      if (meta) meta.insertAdjacentHTML("beforeend", `<span class="tag-done" style="color:var(--accent-text);font-weight:600;display:inline-flex;align-items:center;gap:3px">${icon("check", "ic ic-sm")} O'zlashtirildi</span>`);
    } else if (!isDone && doneTag) doneTag.remove();
    $$(`.iq-card[data-sub="${q.subskillId}"] .mini-st`).forEach((el) => {
      const s = statusOf(q.subskillId); el.dataset.st = String(s);
      el.innerHTML = `<i class="st-dot"></i>${STATUSES[s].label}`;
    });
  }

  function toggleMasteredIq(id) {
    if (masteredIq.has(id)) {
      masteredIq.delete(id);
    } else {
      masteredIq.add(id);
    }
    store.set(KEYS.questions, Array.from(masteredIq));
    const btn = $(`[data-iq-check="${id}"]`);
    if (btn) {
      const isDone = masteredIq.has(id);
      btn.classList.toggle("done", isDone);
      btn.innerHTML = `${icon(isDone ? "check" : "target", "ic ic-sm")} ${isDone ? "O'zlashtirildi" : "O'zlashtirish"}`;
    }
    const card = $(`#${CSS.escape(id)}`);
    if (card) {
      const isDone = masteredIq.has(id);
      let doneTag = card.querySelector(".tag-done");
      if (isDone && !doneTag) {
        const meta = card.querySelector(".iq-meta");
        if (meta) {
          const span = document.createElement("span");
          span.className = "tag-done";
          span.style.cssText = "color:var(--accent-text);font-weight:600;display:inline-flex;align-items:center;gap:3px";
          span.innerHTML = `${icon("check", "ic ic-sm")} O'zlashtirildi`;
          meta.appendChild(span);
        }
      } else if (!isDone && doneTag) {
        doneTag.remove();
      }
    }
    updateIqStats();
  }


  function toggleBookmarkIq(id) {
    if (bookmarkedIq.has(id)) {
      bookmarkedIq.delete(id);
      toast("Saqlanganlardan olib tashlandi");
    } else {
      bookmarkedIq.add(id);
      toast("Saqlanganlarga qo'shildi");
    }
    store.set(KEYS.bookmarks, Array.from(bookmarkedIq));
    if (location.hash === "#/interview/play" && iqSess) renderIqPlay();
    else filterInterviewList();
  }

  function getIqFilteredList() {
    const base = iqScope === "today" ? iqTodayIds.map(iqById).filter(Boolean) : (window.INTERVIEW_QUESTIONS || []);
    return base.filter((q) =>
      (iqFilterCat === "all" || q.category === iqFilterCat) &&
      (iqScope !== "due" || iqDueToday(q)) &&
      (iqScope !== "saved" || bookmarkedIq.has(q.id)) &&
      (iqFilterLevel === "all" || q.level === iqFilterLevel) &&
      (iqFilterStatus === "all" || (iqFilterStatus === "mastered") === masteredIq.has(q.id)) &&
      (!iqSubFilter || q.subskillId === iqSubFilter) &&
      (!iqSearchQuery || [q.title, Array.isArray(q.answer) ? q.answer.join(" ") : q.answer, q.tip || "", q.categoryLabel || "", q.subskillId || ""]
        .some((t) => String(t).toLowerCase().includes(iqSearchQuery))));
  }

  function updateIqStats() {
    const questions = window.INTERVIEW_QUESTIONS || [];
    const total = questions.length || 1;
    const doneCount = Array.from(masteredIq).filter((id) => questions.some((q) => q.id === id)).length;
    const remainingCount = Math.max(0, questions.length - doneCount);
    const progressPct = pct(doneCount / total);

    const statDoneEl = $("#iq-stat-done");
    const statRemEl = $("#iq-stat-remaining");
    const statPctEl = $("#iq-stat-pct");
    const statBarEl = $("#iq-stat-bar");
    const ringPctEl = $("#iq-ring-pct");
    const ringCircleEl = $("#iq-ring-circle");
    const countEl = $("#iq-result-count");

    if (statDoneEl) statDoneEl.innerHTML = `${doneCount} <small>/ ${questions.length}</small>`;
    if (statRemEl) statRemEl.textContent = `${remainingCount} ta`;
    if (statPctEl) statPctEl.textContent = `${progressPct}%`;
    if (statBarEl) statBarEl.style.width = `${progressPct}%`;
    if (ringPctEl) ringPctEl.textContent = `${progressPct}%`;

    if (ringCircleEl) {
      const circumference = 251.3;
      const offset = circumference - (circumference * (doneCount / total));
      ringCircleEl.style.strokeDashoffset = String(offset);
    }

    if (countEl) {
      const filtered = getIqFilteredList();
      countEl.textContent = `${filtered.length} ta savol`;
    }

    // Holat pilla tugmalari ichidagi sonlarni yangilash
    const allBtn = $('[data-iq-status="all"] .count-chip');
    const bBtn = $('[data-iq-status="bookmarked"] .count-chip');
    const mBtn = $('[data-iq-status="mastered"] .count-chip');
    const uBtn = $('[data-iq-status="unmastered"] .count-chip');
    if (allBtn) allBtn.textContent = String(questions.length);
    if (bBtn) bBtn.textContent = String(bookmarkedIq.size);
    if (mBtn) mBtn.textContent = String(doneCount);
    if (uBtn) uBtn.textContent = String(remainingCount);
  }

  // Mashq ish joyi: chapda rejim va stacklar, o'ngda ixcham ro'yxat; savol fokus sessiyada ochiladi.
  let iqScope = "all"; // "all" | "today" | "due" | "saved"
  let iqSess = null; // { ids, idx, title, back, rated: {}, notes: {}, shown: Set }
  const IQ_LEVELS = [["junior", "Junior"], ["middle", "Middle"], ["senior", "Senior"], ["lead", "Lead"]];
  const IQ_STATUS = [["all", "Barchasi"], ["unmastered", "O'rganilmagan"], ["mastered", "O'zlashtirilgan"]];
  const IQ_SCOPE_TITLES = { all: "Barcha savollar", today: "Bugungi navbat", due: "Takrorlash navbati", saved: "Saqlangan savollar" };

  function iqDueToday(q) { return !!iqSrs[q.id] && iqSrs[q.id].due <= dayStr(); }

  function iqStackStats(x) {
    const qs = (window.INTERVIEW_QUESTIONS || []).filter((q) => q.category === x.id);
    return { qs, total: qs.length, mastered: qs.filter((q) => masteredIq.has(q.id)).length, due: qs.filter(iqDueToday).length };
  }

  function iqIsFiltered() { return iqFilterLevel !== "all" || iqFilterStatus !== "all" || !!iqSearchQuery; }

  function iqScopeTitle() {
    const sub = iqSubFilter && SUB_BY_ID[iqSubFilter];
    if (sub) return sub.title.replace(/`/g, "");
    const stk = iqFilterCat !== "all" && TECH_LOGOS.find((x) => x.id === iqFilterCat);
    return stk ? stk.n : IQ_SCOPE_TITLES[iqScope];
  }

  // Ro'yxat guruhlari: stack ichida skill tartibi, umumiy ro'yxatda stack tartibi.
  function iqGroups(list) {
    if (iqScope === "today" || iqSubFilter) return [{ key: "flat", items: list }];
    if (iqFilterCat !== "all") {
      const stk = TECH_LOGOS.find((x) => x.id === iqFilterCat);
      return (stk ? stk.sk : []).map((slug) => ({ key: slug, skill: BY_SLUG[slug], items: list.filter((q) => q.skillSlug === slug) })).filter((g) => g.items.length);
    }
    return TECH_LOGOS.map((x) => ({ key: x.id, stack: x, items: list.filter((q) => q.category === x.id) })).filter((g) => g.items.length);
  }
  function iqOrderedIds() { return iqGroups(getIqFilteredList()).flatMap((g) => g.items.map((q) => q.id)); }

  function iqMarkHtml(q) {
    if (masteredIq.has(q.id)) return `<span class="px-mark" data-m="done" title="O'zlashtirilgan">${icon("check", "ic ic-sm")}</span>`;
    if (iqDueToday(q)) return `<span class="px-mark" data-m="due" title="Bugun takrorlash">${icon("reset", "ic ic-sm")}</span>`;
    const s = iqSrs[q.id];
    return `<span class="px-mark" data-m="${s ? "r" + s.r : "new"}" title="${s ? `Keyingi takrorlash: ${s.due}` : "Hali ko'rilmagan"}"></span>`;
  }

  function iqRowHtml(q) {
    const sub = SUB_BY_ID[q.subskillId];
    return `<li><button type="button" class="px-row" data-px-open="${q.id}">
      <span class="px-lvl" data-l="${q.level}">${esc(q.level)}</span>
      <span class="px-row-t">
        <span class="px-row-q">${inline(q.title)}</span>
        <span class="px-row-m">${sub ? `<span>${esc(sub.num)} ${inline(sub.title)}</span>` : ""}${q.type && IQ_TYPES[q.type] ? `<i>${IQ_TYPES[q.type]}</i>` : ""}${bookmarkedIq.has(q.id) ? `<i class="saved">${icon("bookmark", "ic ic-sm")} Saqlangan</i>` : ""}</span>
      </span>
      ${iqMarkHtml(q)}
    </button></li>`;
  }

  function iqListHtml() {
    const list = getIqFilteredList();
    if (!list.length) {
      if (iqScope === "today") return `<div class="px-empty"><h2>Bugungi navbat bo'sh</h2><p>Takrorlanadigan va yangi savollar qolmadi.</p><button type="button" class="btn btn-sm" data-iq-more>Yana 5 ta savol olish</button></div>`;
      if (iqScope === "due" && !iqIsFiltered()) return `<div class="px-empty"><h2>Takrorlash navbati bo'sh</h2><p>Baholangan savollar sanasi kelganda shu yerga tushadi.</p></div>`;
      if (iqScope === "saved" && !iqIsFiltered()) return `<div class="px-empty"><h2>Saqlangan savol yo'q</h2><p>Mashq paytida <kbd>B</kbd> tugmasi yoki «Saqlash» bilan savolni shu ro'yxatga qo'shing.</p></div>`;
      return `<div class="px-empty"><h2>Bu filtr bo'yicha savol yo'q</h2><p>Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang.</p><button type="button" class="btn btn-sm" data-iq-reset-filters>${icon("reset", "ic ic-sm")} Filtrlarni tozalash</button></div>`;
    }
    return iqGroups(list).map((g) => `
      <section class="px-group">
        ${g.key === "flat" ? "" : `<h2 class="px-group-h">${g.stack
          ? `<a href="#/interview?stack=${g.stack.id}">${stackLogo(g.stack)}${esc(g.stack.n)}</a>`
          : `<a href="#/s/${g.key}">${esc(g.skill ? g.skill.title : g.key)}</a>`}<span>${g.items.length}</span></h2>`}
        <ul class="px-rows">${g.items.map(iqRowHtml).join("")}</ul>
      </section>`).join("");
  }

  function iqRailHtml() {
    const qs = window.INTERVIEW_QUESTIONS || [];
    const cur = (scope, cat) => (iqScope === scope && iqFilterCat === cat && !iqSubFilter ? ' aria-current="page"' : "");
    const modes = [
      ["today", "Bugungi navbat", "target", iqTodayIds.length, "#/interview?view=today"],
      ["due", "Takrorlash", "reset", qs.filter(iqDueToday).length, "#/interview?view=due"],
      ["all", "Barcha savollar", "list-checks", qs.length, "#/interview"],
      ["saved", "Saqlangan", "bookmark", bookmarkedIq.size, "#/interview?view=saved"],
    ];
    const stacks = TECH_LOGOS.map((x) => ({ x, ...iqStackStats(x) })).filter((s) => s.total);
    const left = iqTodayIds.filter((id) => !(iqSrs[id] && iqSrs[id].last === dayStr())).length;
    return `
      <aside class="px-rail" aria-label="Intervyu bo'limlari">
        <button type="button" class="btn btn-primary px-go" data-iq-play-today ${iqTodayIds.length ? "" : "disabled"}>${icon("play", "ic ic-sm")}<span>Bugungi mashq</span><b>${left || iqTodayIds.length}</b></button>
        <nav class="px-nav" aria-label="Rejim">
          ${modes.map(([id, l, ic, n, href]) => `<a class="px-nav-i" href="${href}"${cur(id, "all")}>${icon(ic, "ic ic-sm")}<span>${l}</span><b>${n}</b></a>`).join("")}
        </nav>
        <h2 class="px-rail-h">Stacklar</h2>
        <nav class="px-nav px-stacks" aria-label="Stacklar">
          ${stacks.map(({ x, total, mastered }) => `<a class="px-nav-i" href="#/interview?stack=${x.id}"${cur("all", x.id)} title="${mastered} / ${total} o'zlashtirilgan">${stackLogo(x)}<span>${esc(x.n)}</span><b>${total}</b>${mastered ? `<i class="px-nav-bar" style="--p:${pct(mastered / total)}%"></i>` : ""}</a>`).join("")}
        </nav>
      </aside>`;
  }

  function iqHeadHtml(list) {
    const qs = window.INTERVIEW_QUESTIONS || [];
    const stk = iqFilterCat !== "all" ? TECH_LOGOS.find((x) => x.id === iqFilterCat) : null;
    const sub = iqSubFilter && SUB_BY_ID[iqSubFilter];
    const scopeList = sub ? qs.filter((q) => q.subskillId === sub.id)
      : stk ? qs.filter((q) => q.category === stk.id)
      : iqScope === "today" ? iqTodayIds.map(iqById).filter(Boolean)
      : iqScope === "due" ? qs.filter(iqDueToday)
      : iqScope === "saved" ? qs.filter((q) => bookmarkedIq.has(q.id)) : qs;
    const done = scopeList.filter((q) => masteredIq.has(q.id)).length;
    const learning = scopeList.filter((q) => !masteredIq.has(q.id) && iqSrs[q.id]).length;
    const fresh = scopeList.length - done - learning;
    const share = (n) => (scopeList.length ? (n / scopeList.length) * 100 : 0);
    const desc = sub ? `${esc(sub.num)} · ${esc(sub.skill.title)} mavzusiga oid savollar.`
      : stk ? `${stk.n} bo'yicha ${scopeList.length} ta savol, skill tartibida.`
      : {
        today: "Takrorlash vaqti kelgan va hali ko'rilmagan savollar. Har bahoyingiz keyingi takrorlash sanasini belgilaydi.",
        due: "Sanasi kelgan savollar. Avval shularni takrorlang.",
        saved: "Keyinroq qaytish uchun belgilagan savollaringiz.",
        all: `${scopeList.length} ta savol, stacklar bo'yicha. Savolni bosing: fokus rejimida ochiladi.`,
      }[iqScope];
    return `
      <header class="px-head">
        <div class="px-head-t">${stk ? stackLogo(stk) : ""}<div><h1>${sub ? inline(sub.title) : esc(iqScopeTitle())}</h1><p>${desc}</p></div></div>
        <div class="px-head-act">
          <button type="button" class="btn btn-primary" data-px-play ${list.length ? "" : "disabled"}>${icon("play", "ic ic-sm")} Mashqni boshlash</button>
          <button type="button" class="btn" data-iq-start-mock ${list.length ? "" : "disabled"}>${icon("rocket", "ic ic-sm")} Mock</button>
          ${iqScope === "today" ? `<button type="button" class="btn" data-iq-more>Yana 5 ta</button>` : ""}
          ${stk ? `<a class="btn" href="#/stacks/${stk.id}">Darslar ${icon("arrow-right", "ic ic-sm")}</a>` : ""}
        </div>
      </header>
      ${scopeList.length ? `<div class="px-meter">
        <div class="bar stacked" aria-hidden="true"><i style="flex-basis:${share(done)}%;background:var(--accent)"></i><i style="flex-basis:${share(learning)}%;background:var(--st-1)"></i></div>
        <ul class="px-legend"><li data-k="done"><b>${done}</b> o'zlashtirilgan</li><li data-k="learn"><b>${learning}</b> o'rganilmoqda</li><li data-k="new"><b>${fresh}</b> yangi</li></ul>
      </div>` : ""}`;
  }

  function iqToolbarHtml() {
    const segBtn = (attr, cur, id, label) => `<button type="button" ${attr}="${id}" aria-pressed="${cur === id}">${label}</button>`;
    return `
      <div class="px-tools" id="iq-controls">
        <label class="px-search">
          ${icon("search", "ic ic-sm")}
          <span class="sr-only">Savollarni qidirish</span>
          <input type="search" id="iq-search-input" placeholder="Qidirish: N+1, lock, Horizon" value="${esc(iqSearchQuery)}" autocomplete="off" />
        </label>
        <div class="seg" role="group" aria-label="Daraja">
          ${segBtn("data-iq-lvl", iqFilterLevel, "all", "Barchasi")}${IQ_LEVELS.map(([id, l]) => segBtn("data-iq-lvl", iqFilterLevel, id, l)).join("")}
        </div>
        <div class="seg" role="group" aria-label="Holat">
          ${IQ_STATUS.map(([id, l]) => segBtn("data-iq-status", iqFilterStatus, id, l)).join("")}
        </div>
      </div>
      <p class="px-count" aria-live="polite"><span id="iq-result-count">${getIqFilteredList().length} ta savol</span><span id="iq-reset-wrap">${iqIsFiltered() ? `<button type="button" class="px-link" data-iq-reset-filters>Filtrlarni tozalash</button>` : ""}</span></p>`;
  }

  function filterInterviewList() {
    const listEl = $("#iq-items");
    if (!listEl) return;
    const n = getIqFilteredList().length;
    listEl.innerHTML = iqListHtml();
    $("#iq-result-count").textContent = `${n} ta savol`;
    $("#iq-reset-wrap").innerHTML = iqIsFiltered() ? `<button type="button" class="px-link" data-iq-reset-filters>Filtrlarni tozalash</button>` : "";
    $$("[data-px-play], .px-head [data-iq-start-mock]").forEach((b) => { b.disabled = !n; });
  }

  function renderIqBrowse() {
    const list = getIqFilteredList();
    view().innerHTML = `
      ${loadErrorBlock()}
      <div class="px">
        ${iqRailHtml()}
        <section class="px-main">
          ${iqHeadHtml(list)}
          ${iqToolbarHtml()}
          <div id="iq-items">${iqListHtml()}</div>
        </section>
      </div>`;
    const inp = $("#iq-search-input");
    inp.addEventListener("input", () => { iqSearchQuery = inp.value.toLowerCase().trim(); filterInterviewList(); });
  }

  /* Fokus sessiya: bitta savol, avval o'zi javob beradi, keyin javob va baho */
  function iqStartSession(ids, idx = 0, title) {
    if (!ids.length) return;
    const onPlay = location.hash === "#/interview/play";
    const back = onPlay && iqSess ? iqSess.back
      : (location.hash || "#/interview").replace(/([?&])open=[^&]*&?/, "$1").replace(/[?&]$/, "");
    iqSess = { ids, idx, title: title || (onPlay && iqSess ? iqSess.title : iqScopeTitle()), back, rated: {}, notes: {}, shown: new Set() };
    if (onPlay) { renderIqPlay(); window.scrollTo(0, 0); } else location.hash = "#/interview/play";
  }

  function iqNextLabel(id, r) {
    const cur = iqSrs[id] || { box: 0 };
    let days = 1;
    if (r === 2) days = SRS_DAYS[Math.min(5, Math.max(2, (cur.box || 0) + 1))];
    else if (r === 1) days = Math.max(1, Math.round(SRS_DAYS[Math.max(1, cur.box || 1)] / 2));
    return days === 1 ? "ertaga" : `${days} kundan keyin`;
  }

  // Sessiya progressi: har savolga bitta segment (ko'p bo'lsa oddiy chiziq).
  function pxTicksHtml(n, idx, stateOf, goAttr) {
    if (n > 60) return `<div class="bar px-ticks-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${idx}"><i style="width:${pct(idx / n)}%"></i></div>`;
    return `<ol class="px-ticks" aria-label="Sessiya holati">${Array.from({ length: n }, (_, i) =>
      `<li data-s="${stateOf(i)}"${i === idx ? ' aria-current="step"' : ""}>${goAttr ? `<button type="button" ${goAttr}="${i}" aria-label="${i + 1}-savol"></button>` : ""}</li>`).join("")}</ol>`;
  }

  function pxTopHtml(backHtml, right = "") {
    return `<div class="px-play-top">${backHtml}<div class="px-play-r">${right}</div></div>`;
  }

  function renderIqPlay() {
    const S = iqSess;
    if (S.idx >= S.ids.length) { renderIqSummary(); return; }
    const q = iqById(S.ids[S.idx]);
    const stk = TECH_LOGOS.find((x) => x.id === q.category);
    const sub = SUB_BY_ID[q.subskillId];
    const shown = S.shown.has(q.id);
    const note = S.notes[q.id] || "";
    const saved = bookmarkedIq.has(q.id);
    const s = iqSrs[q.id];
    const state = (i) => { const r = S.rated[S.ids[i]]; return r === undefined ? (S.shown.has(S.ids[i]) ? "seen" : "") : "r" + r; };
    view().innerHTML = `
      <div class="px-play">
        ${pxTopHtml(`<a class="px-back" href="${esc(S.back)}">${icon("arrow-left", "ic ic-sm")} ${esc(S.title)}</a>`, `<span class="px-pos">${S.idx + 1} / ${S.ids.length}</span>`)}
        ${pxTicksHtml(S.ids.length, S.idx, state, "data-px-go")}
        <article class="px-card" aria-labelledby="px-q">
          <div class="px-card-meta">
            ${stk ? `<span class="px-stk">${stackLogo(stk)}${esc(stk.n)}</span>` : ""}
            <span class="px-lvl" data-l="${q.level}">${esc(q.level)}</span>
            ${q.type && IQ_TYPES[q.type] ? `<span class="px-type">${IQ_TYPES[q.type]}</span>` : ""}
            ${masteredIq.has(q.id) ? `<span class="px-flag" data-f="done">${icon("check", "ic ic-sm")} O'zlashtirilgan</span>` : s ? `<span class="px-flag">Keyingi takrorlash: ${s.due}</span>` : ""}
          </div>
          <h1 class="px-q" id="px-q">${inline(q.title)}</h1>
          ${q.code ? `<pre class="px-code" data-lang="php"><code>${highlight(q.code)}</code></pre>` : ""}
          ${shown ? `
            ${note.trim() ? `<div class="px-note"><h2>Sizning qoralamangiz</h2><p>${esc(note)}</p></div>` : ""}
            <div class="px-answer" id="px-answer" tabindex="-1">${markdown(q.answer)}</div>
            ${q.tip ? `<aside class="px-tip"><h2>${icon("sparkles", "ic ic-sm")} Intervyuda nimaga e'tibor berishadi</h2><p>${inline(q.tip)}</p></aside>` : ""}
            <div class="px-grade" role="group" aria-labelledby="px-grade-l">
              <span id="px-grade-l">Qanchalik bildingiz?</span>
              ${[[0, "Bilmadim"], [1, "Qisman"], [2, "Bildim"]].map(([r, l]) => `<button type="button" data-px-rate="${r}" data-r="${r}" aria-pressed="${S.rated[q.id] === r}"><kbd>${r + 1}</kbd><span>${l}</span><small>${iqNextLabel(q.id, r)}</small></button>`).join("")}
            </div>` : `
            <div class="px-recall">
              <label for="px-note">Avval o'zingiz javob bering: ovoz chiqarib yoki qisqa yozib.</label>
              <textarea id="px-note" rows="4" placeholder="Asosiy fikr, misol, trade-off (ixtiyoriy)">${esc(note)}</textarea>
              <button type="button" class="btn btn-primary" data-px-reveal>${icon("eye", "ic ic-sm")} Javobni ko'rsatish <kbd>Space</kbd></button>
            </div>`}
        </article>
        <div class="px-play-foot">
          <div class="px-foot-l">
            <button type="button" class="btn btn-sm" data-px-step="-1" ${S.idx ? "" : "disabled"} aria-label="Oldingi savol">${icon("arrow-left", "ic ic-sm")}</button>
            <button type="button" class="btn btn-sm" data-px-step="1" aria-label="Keyingi savol">${icon("arrow-right", "ic ic-sm")}</button>
            <button type="button" class="btn btn-sm" data-iq-bookmark="${q.id}" aria-pressed="${saved}">${icon("bookmark", "ic ic-sm")} ${saved ? "Saqlangan" : "Saqlash"}</button>
            ${shown ? `<button type="button" class="btn btn-sm" data-iq-copy="${q.id}">${icon("copy", "ic ic-sm")} Nusxalash</button>` : ""}
          </div>
          ${sub ? `<a class="px-lesson" href="#/s/${sub.skill.slug}/${sub.id}"><span>Dars: ${esc(sub.num)} ${inline(sub.title)}</span>${icon("arrow-right", "ic ic-sm")}</a>` : ""}
        </div>
        <p class="px-keys" aria-hidden="true"><span><kbd>Space</kbd> javob</span><span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> baho</span><span><kbd>←</kbd><kbd>→</kbd> o'tish</span><span><kbd>B</kbd> saqlash</span><span><kbd>Esc</kbd> chiqish</span></p>
      </div>`;
    const ta = $("#px-note");
    if (ta) ta.addEventListener("input", () => { S.notes[q.id] = ta.value; });
  }

  function renderIqSummary() {
    const S = iqSess;
    const rated = S.ids.filter((id) => S.rated[id] !== undefined);
    const c = [0, 1, 2].map((r) => rated.filter((id) => S.rated[id] === r).length);
    const weak = rated.filter((id) => S.rated[id] < 2).map(iqById).filter(Boolean);
    view().innerHTML = `
      <div class="px-play">
        ${pxTopHtml(`<a class="px-back" href="${esc(S.back)}">${icon("arrow-left", "ic ic-sm")} ${esc(S.title)}</a>`)}
        <section class="px-sum" aria-labelledby="px-sum-h">
          <h1 id="px-sum-h">Sessiya yakunlandi</h1>
          <p class="px-sum-sub">${S.ids.length} ta savoldan ${rated.length} tasini baholadingiz. Baholar takrorlash jadvaliga yozildi.</p>
          <dl class="px-sum-stats">
            <div data-r="2"><dt>Bildim</dt><dd>${c[2]}</dd></div>
            <div data-r="1"><dt>Qisman</dt><dd>${c[1]}</dd></div>
            <div data-r="0"><dt>Bilmadim</dt><dd>${c[0]}</dd></div>
          </dl>
          ${weak.length ? `<h2 class="px-sum-h2">Qayta ko'rish kerak</h2>
          <ul class="px-review">${weak.map((q) => {
            const sub = SUB_BY_ID[q.subskillId];
            return `<li data-r="${S.rated[q.id]}"><span class="px-review-i">${S.rated[q.id] ? "Qisman" : "Bilmadim"}</span><div><p class="px-review-q">${inline(q.title)}</p>${sub ? `<a class="px-review-l" href="#/s/${sub.skill.slug}/${sub.id}">Dars: ${esc(sub.num)} ${inline(sub.title)} ${icon("arrow-right", "ic ic-sm")}</a>` : ""}</div></li>`;
          }).join("")}</ul>` : ""}
          <div class="px-sum-act">
            ${weak.length ? `<button type="button" class="btn btn-primary" data-px-retry>${icon("reset", "ic ic-sm")} Qiyinlarini qayta (${weak.length})</button>` : ""}
            <a class="btn${weak.length ? "" : " btn-primary"}" href="${esc(S.back)}">Ro'yxatga qaytish</a>
          </div>
        </section>
      </div>`;
  }

  function iqRevealSess() {
    const S = iqSess, id = S && S.ids[S.idx];
    if (!id) return;
    S.shown.add(id);
    renderIqPlay();
    const a = $("#px-answer"); if (a) a.focus({ preventScroll: true });
  }
  function iqRateSess(r) {
    const S = iqSess, id = S && S.ids[S.idx];
    if (!id || !S.shown.has(id)) return;
    rateIq(id, r);
    S.rated[id] = r;
    S.idx++;
    renderIqPlay();
    window.scrollTo(0, 0);
  }
  function iqStepSess(d) {
    const S = iqSess; if (!S) return;
    S.idx = Math.max(0, Math.min(S.ids.length, S.idx + d));
    renderIqPlay();
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------ *
   * Interactive Quiz & Assessment Engine (A, B, C, D Tests)
   * ------------------------------------------------------------------ */
  let QUIZ_CATEGORIES = [{ id: "all", label: "Barchasi", icon: "layers" }];

  // Savol va testlarning yo'nalishi skillSlug orqali stackdan olinadi: filtrlar stacklar bilan bir xil.
  function buildInterviewTaxonomy() {
    const stackOf = (slug) => TECH_LOGOS.find((x) => x.sk.includes(slug));
    const tag = (item) => {
      const stk = stackOf(item.skillSlug);
      if (!stk) return;
      item.category = stk.id;
      item.categoryLabel = stk.n;
    };
    const iq = window.INTERVIEW_QUESTIONS || [], tests = window.INTERVIEW_TESTS || [];
    iq.forEach(tag);
    tests.forEach(tag);
    const used = (list) => TECH_LOGOS.filter((x) => list.some((q) => q.category === x.id));
    IQ_CATEGORIES = [{ id: "all", label: "Barchasi" }, ...used(iq).map((x) => ({ id: x.id, label: x.n, stack: x }))];
    QUIZ_CATEGORIES = [{ id: "all", label: "Barchasi", icon: "layers" }, ...used(tests).map((x) => ({ id: x.id, label: x.n, stack: x }))];
  }

  const QUIZ_LEVELS = [
    { id: "all", label: "Barcha darajalar" },
    { id: "junior", label: "Junior" },
    { id: "middle", label: "Middle" },
    { id: "senior", label: "Senior" }
  ];

  let quizActiveCat = "all";
  let quizActiveLevel = "all";
  let quizSelectedCount = 10;
  let quizState = "lobby"; // "lobby" | "running" | "finished"
  let quizIdx = 0;
  let quizQuestions = [];
  let quizAnswers = {};
  let quizScores = {};
  let quizCurrentStreak = 0;
  let quizMaxStreak = 0;

  try {
    const raw = localStorage.getItem("lsm:quiz_scores");
    if (raw) quizScores = JSON.parse(raw);
  } catch (e) {}

  function getQuizLevelCounts(catId = quizActiveCat) {
    const scope = getQuizPool(catId, "all");
    const counts = {};
    QUIZ_LEVELS.forEach((l) => { counts[l.id] = l.id === "all" ? scope.length : scope.filter((t) => (t.level || "middle") === l.id).length; });
    return counts;
  }

  function getQuizPool(catId = quizActiveCat, levelId = quizActiveLevel) {
    return (window.INTERVIEW_TESTS || []).filter((t) =>
      (catId === "all" || (catId === "wrong" ? quizWrong.has(t.id) : t.category === catId)) &&
      (levelId === "all" || (t.level || "middle") === levelId));
  }

  function handleQuizChangeCat(catId) {
    quizActiveCat = catId;
    quizState = "lobby";

    // 1-filtr o'zgarganda 2-filtrdagi sonlarni tekshiramiz: agar hozirgi darajada savol bo'lmasa, 'all' ga qaytaramiz
    const lvlCounts = getQuizLevelCounts(quizActiveCat);
    if (quizActiveLevel !== "all" && (!lvlCounts[quizActiveLevel] || lvlCounts[quizActiveLevel] === 0)) {
      quizActiveLevel = "all";
    }

    updateQuizView();
  }

  function handleQuizChangeLevel(levelId) {
    quizActiveLevel = levelId;
    quizState = "lobby";
    updateQuizView();
  }

  function handleQuizSetCount(count) {
    quizSelectedCount = Number(count);
    updateQuizView();
  }

  function playSfx(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === "check") {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "streak") {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(1046.50, now + 0.16);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === "celebrate") {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }

  // Urinishlar tarixi va xato qilingan testlar (keyingi "Xatolarim" sessiyasi uchun).
  let quizHist = store.get(KEYS.quizHist, []) || [];
  let quizWrong = new Set(store.get(KEYS.quizWrong, []));

  function quizScopeName(cat = quizActiveCat) {
    if (cat === "wrong") return "Xatolarim";
    const c = QUIZ_CATEGORIES.find((x) => x.id === cat);
    return c && c.stack ? c.label : "Aralash test";
  }
  function quizLobbyHash() {
    return quizActiveCat === "all" ? "#/quiz" : quizActiveCat === "wrong" ? "#/quiz?mode=wrong" : `#/quiz?stack=${quizActiveCat}`;
  }
  function quizBand(p) { return p >= 90 ? "top" : p >= 70 ? "good" : p >= 50 ? "mid" : "low"; }

  function handleQuizStart() {
    const pool = getQuizPool();
    if (!pool.length) return;
    const shuffled = pool.slice().sort(() => 0.5 - Math.random());
    const count = (quizSelectedCount > 0 && quizSelectedCount < shuffled.length) ? quizSelectedCount : shuffled.length;
    quizQuestions = shuffled.slice(0, count);
    quizIdx = 0;
    quizAnswers = {};
    quizCurrentStreak = 0;
    quizMaxStreak = 0;
    quizState = "running";
    playSfx("toggle");
    if (location.hash === "#/quiz/play") { renderQuizPlay(); window.scrollTo(0, 0); } else location.hash = "#/quiz/play";
  }

  function handleQuizSelect(optKey) {
    if (quizState !== "running" || !quizQuestions.length) return;
    const q = quizQuestions[quizIdx];
    if (quizAnswers[q.id]) return;
    const isRight = optKey === q.correct;
    quizAnswers[q.id] = { selected: optKey, correct: q.correct, isRight };
    if (isRight) quizWrong.delete(q.id); else quizWrong.add(q.id);
    store.set(KEYS.quizWrong, Array.from(quizWrong));
    if (isRight) {
      quizCurrentStreak++;
      if (quizCurrentStreak > quizMaxStreak) quizMaxStreak = quizCurrentStreak;
      playSfx(quizCurrentStreak >= 3 ? "streak" : "check");
    } else {
      quizCurrentStreak = 0;
      playSfx("toggle");
    }
    renderQuizPlay();
    const next = $("[data-quiz-next]"); if (next) next.focus({ preventScroll: true });
  }

  function quizFinish() {
    const total = quizQuestions.length;
    const right = Object.values(quizAnswers).filter((a) => a.isRight).length;
    const p = total ? Math.round((right / total) * 100) : 0;
    if (quizActiveCat !== "wrong" && p > (quizScores[quizActiveCat] || 0)) {
      quizScores[quizActiveCat] = p;
      store.set(KEYS.quiz, quizScores);
    }
    quizHist.unshift({ d: dayStr(), cat: quizActiveCat, lvl: quizActiveLevel, n: total, right });
    quizHist = quizHist.slice(0, 30);
    store.set(KEYS.quizHist, quizHist);
    quizState = "finished";
    playSfx("celebrate");
  }

  function handleQuizNext() {
    if (quizState !== "running") return;
    if (quizIdx + 1 < quizQuestions.length) quizIdx++;
    else quizFinish();
    renderQuizPlay();
    window.scrollTo(0, 0);
  }

  function handleQuizRestart() { handleQuizStart(); }

  function handleQuizBackToLobby() {
    quizState = "lobby";
    location.hash = quizLobbyHash();
  }

  function handleQuizReviewWrongs() {
    const wrongQs = quizQuestions.filter((q) => quizAnswers[q.id] && !quizAnswers[q.id].isRight);
    if (!wrongQs.length) return;
    quizQuestions = wrongQs.slice().sort(() => 0.5 - Math.random());
    quizIdx = 0;
    quizAnswers = {};
    quizCurrentStreak = 0;
    quizMaxStreak = 0;
    quizState = "running";
    playSfx("toggle");
    renderQuizPlay();
    window.scrollTo(0, 0);
  }

  function updateQuizView() {
    if (location.hash === "#/quiz/play") renderQuizPlay(); else renderQuizPage();
  }

  function quizRailHtml() {
    const tests = window.INTERVIEW_TESTS || [];
    const cur = (c) => (quizActiveCat === c ? ' aria-current="page"' : "");
    return `
      <aside class="px-rail" aria-label="Test bo'limlari">
        <button type="button" class="btn btn-primary px-go" data-quiz-quick>${icon("play", "ic ic-sm")}<span>Tez test</span><b>10</b></button>
        <nav class="px-nav" aria-label="Rejim">
          <a class="px-nav-i" href="#/quiz"${cur("all")}>${icon("layers", "ic ic-sm")}<span>Aralash</span><b>${tests.length}</b></a>
          <a class="px-nav-i" href="#/quiz?mode=wrong"${cur("wrong")}>${icon("bug", "ic ic-sm")}<span>Xatolarim</span><b>${quizWrong.size}</b></a>
        </nav>
        <h2 class="px-rail-h">Stacklar</h2>
        <nav class="px-nav px-stacks" aria-label="Stacklar">
          ${QUIZ_CATEGORIES.filter((c) => c.stack).map((c) => {
            const n = tests.filter((t) => t.category === c.id).length;
            const best = quizScores[c.id];
            return `<a class="px-nav-i" href="#/quiz?stack=${c.id}"${cur(c.id)}${best !== undefined ? ` title="Eng yaxshi natija: ${best}%"` : ""}>${stackLogo(c.stack)}<span>${esc(c.label)}</span><b>${n}</b>${best !== undefined ? `<i class="px-nav-bar" style="--p:${best}%"></i>` : ""}</a>`;
          }).join("")}
        </nav>
      </aside>`;
  }

  function quizHistRowHtml(h) {
    const p = h.n ? Math.round((h.right / h.n) * 100) : 0;
    const lvl = QUIZ_LEVELS.find((l) => l.id === h.lvl);
    return `<li>
      <span class="px-hist-d">${esc(h.d)}</span>
      <span class="px-hist-s">${esc(quizScopeName(h.cat))}${h.lvl && h.lvl !== "all" && lvl ? ` · ${lvl.label}` : ""}</span>
      <span class="px-hist-n">${h.right} / ${h.n}</span>
      <span class="px-hist-p" data-band="${quizBand(p)}"><i style="--p:${p}%"></i><b>${p}%</b></span>
    </li>`;
  }

  function renderQuizPage() {
    const scopeAll = getQuizPool(quizActiveCat, "all");
    const pool = getQuizPool();
    const lc = getQuizLevelCounts();
    const cat = QUIZ_CATEGORIES.find((c) => c.id === quizActiveCat);
    const stk = cat && cat.stack;
    const wrongMode = quizActiveCat === "wrong";
    const hist = quizHist.filter((h) => quizActiveCat === "all" || h.cat === quizActiveCat);
    const best = quizScores[quizActiveCat];
    const wrongInScope = wrongMode ? quizWrong.size : scopeAll.filter((t) => quizWrong.has(t.id)).length;
    if (quizActiveLevel !== "all" && !lc[quizActiveLevel]) quizActiveLevel = "all";
    if (quizSelectedCount !== 0 && quizSelectedCount >= pool.length) quizSelectedCount = 0;
    const counts = [5, 10, 15].filter((c) => c < pool.length).concat(0);
    const n = quizSelectedCount || pool.length;
    const title = wrongMode ? "Xatolar ustida ishlash" : stk ? `${stk.n} testlari` : "Aralash test";
    const desc = wrongMode ? "Oxirgi marta noto'g'ri javob bergan testlaringiz. To'g'ri javob bersangiz, ro'yxatdan chiqadi."
      : stk ? `${stk.n} bo'yicha ${scopeAll.length} ta test. Har javobdan keyin tushuntirish va dars havolasi chiqadi.`
      : `Barcha stacklardan ${scopeAll.length} ta test aralash tartibda.`;

    view().innerHTML = `
      ${loadErrorBlock()}
      <div class="px">
        ${quizRailHtml()}
        <section class="px-main">
          <header class="px-head">
            <div class="px-head-t">${stk ? stackLogo(stk) : ""}<div><h1>${esc(title)}</h1><p>${desc}</p></div></div>
            ${stk ? `<div class="px-head-act"><a class="btn" href="#/interview?stack=${stk.id}">Intervyu savollari</a><a class="btn" href="#/stacks/${stk.id}">Darslar ${icon("arrow-right", "ic ic-sm")}</a></div>` : ""}
          </header>
          <dl class="px-kpis">
            <div><dt>Testlar</dt><dd>${scopeAll.length}</dd></div>
            <div><dt>Eng yaxshi natija</dt><dd>${wrongMode || best === undefined ? "—" : `${best}<small>%</small>`}</dd></div>
            <div><dt>Urinishlar</dt><dd>${hist.length}</dd></div>
            <div><dt>Xato qilinganlar</dt><dd>${wrongInScope}</dd></div>
          </dl>
          ${pool.length ? `
          <section class="px-setup" aria-labelledby="px-setup-h">
            <h2 class="px-sec-h" id="px-setup-h">Testni sozlang</h2>
            <div class="px-field">
              <span class="px-label" id="px-lbl-lvl">Daraja</span>
              <div class="seg" role="group" aria-labelledby="px-lbl-lvl">
                ${QUIZ_LEVELS.map((l) => `<button type="button" data-quiz-level="${l.id}" aria-pressed="${quizActiveLevel === l.id}" ${lc[l.id] ? "" : "disabled"}>${l.id === "all" ? "Barchasi" : l.label} <span class="count-chip">${lc[l.id] || 0}</span></button>`).join("")}
              </div>
            </div>
            <div class="px-field">
              <span class="px-label" id="px-lbl-n">Savollar soni</span>
              <div class="seg" role="group" aria-labelledby="px-lbl-n">
                ${counts.map((c) => `<button type="button" data-quiz-count="${c}" aria-pressed="${quizSelectedCount === c}">${c ? `${c} ta` : `Barchasi · ${pool.length}`}</button>`).join("")}
              </div>
            </div>
            <div class="px-setup-go">
              <p>${n} ta savol tasodifiy tartibda. Javob: <kbd>A</kbd>–<kbd>D</kbd>, keyingisi: <kbd>Enter</kbd>.</p>
              <button type="button" class="btn btn-primary" data-quiz-start>${icon("play", "ic ic-sm")} Testni boshlash <kbd>Enter</kbd></button>
            </div>
          </section>` : `
          <div class="px-empty">${wrongMode
            ? `<h2>Xato qilingan test yo'q</h2><p>Testda noto'g'ri javob bersangiz, savol shu yerga tushadi va to'g'ri javob bergach chiqadi.</p><a class="btn btn-sm" href="#/quiz">Aralash testga o'tish</a>`
            : `<h2>Bu bo'limda test yo'q</h2><p>Boshqa stack yoki aralash testni tanlang.</p><a class="btn btn-sm" href="#/quiz">Aralash test</a>`}</div>`}
          <section class="px-hist" aria-labelledby="px-hist-h">
            <h2 class="px-sec-h" id="px-hist-h">Oxirgi urinishlar</h2>
            ${hist.length ? `<ol class="px-hist-list">${hist.slice(0, 8).map(quizHistRowHtml).join("")}</ol>`
              : `<p class="px-muted">Hali urinish yo'q. Birinchi testdan keyin natija shu yerda chiqadi.</p>`}
          </section>
        </section>
      </div>`;
  }

  function quizBackHtml() {
    return `<button type="button" class="px-back" data-quiz-to-lobby>${icon("arrow-left", "ic ic-sm")} ${esc(quizScopeName())}</button>`;
  }

  function renderQuizPlay() {
    if (quizState === "finished") { renderQuizResult(); return; }
    const q = quizQuestions[quizIdx];
    const total = quizQuestions.length;
    const ans = quizAnswers[q.id];
    const right = Object.values(quizAnswers).filter((a) => a.isRight).length;
    const wrong = Object.keys(quizAnswers).length - right;
    const stk = TECH_LOGOS.find((x) => x.id === q.category);
    const sub = SUB_BY_ID[q.subskillId];
    const state = (i) => { const a = quizAnswers[quizQuestions[i].id]; return a ? (a.isRight ? "r2" : "r0") : ""; };
    view().innerHTML = `
      <div class="px-play">
        ${pxTopHtml(quizBackHtml(), `<span class="px-score"><span data-ok="true">${icon("check", "ic ic-sm")} ${right}</span><span data-ok="false">${icon("close", "ic ic-sm")} ${wrong}</span></span><span class="px-pos">${quizIdx + 1} / ${total}</span>`)}
        ${pxTicksHtml(total, quizIdx, state)}
        <article class="px-card" aria-labelledby="px-q">
          <div class="px-card-meta">
            ${stk ? `<span class="px-stk">${stackLogo(stk)}${esc(stk.n)}</span>` : ""}
            <span class="px-lvl" data-l="${q.level || "middle"}">${esc(q.level || "middle")}</span>
            ${quizCurrentStreak >= 3 ? `<span class="px-flag" data-f="streak">${quizCurrentStreak} ta ketma-ket to'g'ri</span>` : ""}
          </div>
          <h1 class="px-q" id="px-q">${inline(q.question)}</h1>
          <div class="px-opts" role="group" aria-label="Javob variantlari">
            ${q.options.map((o) => {
              const s = !ans ? "" : o.key === q.correct ? "ok" : o.key === ans.selected ? "bad" : "dim";
              return `<button type="button" class="px-opt" data-quiz-opt="${o.key}" data-s="${s}" ${ans ? "disabled" : ""}><kbd>${o.key}</kbd><span>${inline(o.text)}</span>${s === "ok" ? icon("check", "ic ic-sm") : s === "bad" ? icon("close", "ic ic-sm") : ""}</button>`;
            }).join("")}
          </div>
          ${ans ? `
            <div class="px-explain" data-ok="${ans.isRight}" role="status">
              <h2>${ans.isRight ? "To'g'ri" : `Noto'g'ri. To'g'ri javob: ${q.correct}`}</h2>
              <p>${inline(q.explanation)}</p>
              ${sub ? `<a class="px-lesson" href="#/s/${sub.skill.slug}/${sub.id}"><span>Dars: ${esc(sub.num)} ${inline(sub.title)}</span>${icon("arrow-right", "ic ic-sm")}</a>` : ""}
            </div>` : ""}
        </article>
        <div class="px-play-foot">
          <p class="px-keys" aria-hidden="true">${ans ? `<span><kbd>Enter</kbd> davom etish</span>` : `<span><kbd>A</kbd>–<kbd>D</kbd> yoki <kbd>1</kbd>–<kbd>4</kbd> tanlash</span>`}<span><kbd>Esc</kbd> chiqish</span></p>
          ${ans ? `<button type="button" class="btn btn-primary" data-quiz-next>${quizIdx + 1 < total ? "Keyingi savol" : "Natijani ko'rish"} ${icon("arrow-right", "ic ic-sm")}</button>` : ""}
        </div>
      </div>`;
  }

  function renderQuizResult() {
    const total = quizQuestions.length;
    const right = Object.values(quizAnswers).filter((a) => a.isRight).length;
    const wrong = total - right;
    const p = total ? Math.round((right / total) * 100) : 0;
    const band = quizBand(p);
    const verdict = {
      top: ["Senior darajasidagi natija", "Mavzuning nozik joylarini ham bilasiz. Xato bo'lsa, faqat shularni ko'zdan kechiring."],
      good: ["Mustahkam natija", "Asosiy amaliyot joyida. Quyidagi xatolar ortidagi darslarni o'qib chiqing."],
      mid: ["Asos bor, bo'shliqlar ham", "Xato qilingan savollarning darslarini o'qing va testni qayta ishlang."],
      low: ["Mavzuni qaytadan o'rganing", "Avval darslarni o'qing, keyin shu testga qayting."],
    }[band];
    const optText = (q, k) => (q.options.find((o) => o.key === k) || {}).text || "";
    view().innerHTML = `
      <div class="px-play">
        ${pxTopHtml(quizBackHtml())}
        <section class="px-sum" aria-labelledby="px-sum-h">
          <div class="px-bigscore" data-band="${band}"><b>${p}<small>%</small></b><span>${right} / ${total} to'g'ri</span></div>
          <h1 id="px-sum-h">${verdict[0]}</h1>
          <p class="px-sum-sub">${verdict[1]}</p>
          <dl class="px-sum-stats">
            <div data-r="2"><dt>To'g'ri</dt><dd>${right}</dd></div>
            <div data-r="0"><dt>Xato</dt><dd>${wrong}</dd></div>
            <div><dt>Eng uzun ketma-ketlik</dt><dd>${quizMaxStreak}</dd></div>
          </dl>
          <h2 class="px-sum-h2">Savollar bo'yicha</h2>
          <ol class="px-review">${quizQuestions.map((q) => {
            const a = quizAnswers[q.id], ok = !!(a && a.isRight), sub = SUB_BY_ID[q.subskillId];
            return `<li data-r="${ok ? 2 : 0}">
              <span class="px-review-i">${icon(ok ? "check" : "close", "ic ic-sm")}<span class="sr-only">${ok ? "To'g'ri" : "Xato"}</span></span>
              <div>
                <p class="px-review-q">${inline(q.question)}</p>
                ${ok ? "" : `
                  <p class="px-review-a">Sizning javobingiz: <b>${a ? a.selected : "—"}</b> ${a ? inline(optText(q, a.selected)) : ""}</p>
                  <p class="px-review-a" data-ok="true">To'g'ri javob: <b>${q.correct}</b> ${inline(optText(q, q.correct))}</p>
                  ${sub ? `<a class="px-review-l" href="#/s/${sub.skill.slug}/${sub.id}">Dars: ${esc(sub.num)} ${inline(sub.title)} ${icon("arrow-right", "ic ic-sm")}</a>` : ""}`}
              </div>
            </li>`;
          }).join("")}</ol>
          <div class="px-sum-act">
            ${wrong ? `<button type="button" class="btn btn-primary" data-quiz-review-wrongs>${icon("reset", "ic ic-sm")} Xatolarni qayta ishlash (${wrong})</button>` : ""}
            <button type="button" class="btn${wrong ? "" : " btn-primary"}" data-quiz-restart>Yangi to'plam bilan qayta</button>
            <button type="button" class="btn" data-quiz-to-lobby>Sozlamalarga qaytish</button>
          </div>
        </section>
      </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Mock Interview Simulator
   * ------------------------------------------------------------------ */
  let mockTimer = null;
  let mockQuestions = [];
  let mockIdx = 0;
  let mockScores = [];
  let mockSecondsLeft = 120;
  let mockSelectedCount = 10;

  function openMockModal(step = "setup") {
    let overlay = $("#mock-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "mock-overlay";
      overlay.className = "mock-overlay";
      document.body.appendChild(overlay);
    }
    if (step === "setup") {
      const pool = getIqFilteredList();
      if (!pool.length) {
        overlay.innerHTML = `
          <div class="mock-modal">
            <div class="mock-head">
              <h2>${icon("rocket", "ic")} Mock Imtihon</h2>
              <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
            </div>
            <p style="color:var(--text-2);font-size:14px;line-height:1.5;margin-bottom:18px">
              Hozirgi tanlangan filtrlar bo'yicha savol mavjud emas. Avval filtrlarni o'zgartiring yoki qidiruvni tozalang.
            </p>
            <div style="display:flex;justify-content:flex-end">
              <button class="btn" data-mock-close>Yopish</button>
            </div>
          </div>
        `;
        return;
      }

      // Filtr nomini aniqlash
      let filterDesc = [];
      if (iqFilterStatus === "bookmarked") filterDesc.push("Saqlanganlar");
      else if (iqFilterStatus === "mastered") filterDesc.push("O'zlashtirilgan");
      else if (iqFilterStatus === "unmastered") filterDesc.push("O'rganish kerak");

      if (iqFilterLevel !== "all") filterDesc.push(iqFilterLevel.toUpperCase());
      if (iqFilterCat !== "all") {
        const catObj = IQ_CATEGORIES.find(c => c.id === iqFilterCat);
        if (catObj) filterDesc.push(catObj.label);
      }
      if (iqSearchQuery) filterDesc.push(`“${iqSearchQuery}”`);

      const filterSummary = filterDesc.length ? filterDesc.join(" · ") : "Barcha savollar bazasi";

      // Savollar soni variantlari
      const countOptions = [];
      if (pool.length <= 5) {
        countOptions.push({ count: pool.length, label: `Barchasi (${pool.length} ta)` });
      } else {
        countOptions.push({ count: 5, label: "5 ta (Tezkor)" });
        if (pool.length >= 10) countOptions.push({ count: 10, label: "10 ta (Standart)" });
        if (pool.length >= 20) countOptions.push({ count: 20, label: "20 ta (Katta)" });
        countOptions.push({ count: pool.length, label: `Barchasi (${pool.length} ta)` });
      }

      mockSelectedCount = countOptions.some(o => o.count === 10) ? 10 : countOptions[0].count;

      overlay.innerHTML = `
        <div class="mock-modal">
          <div class="mock-head">
            <h2>${icon("rocket", "ic")} Texnik Intervyu Simulyatori (Mock)</h2>
            <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
          </div>

          <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;margin-bottom:18px">
            <div style="font:600 11px var(--mono);text-transform:uppercase;color:var(--text-3);margin-bottom:4px">Joriy tanlangan filtr:</div>
            <div style="font-size:15px;font-weight:600;color:var(--text);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
              <span>${esc(filterSummary)}</span>
              <span class="iq-pill" style="min-height:26px;padding:2px 10px;font-size:12px;background:var(--accent-soft);color:var(--accent-text);border-color:var(--accent)">
                Filtrda: ${pool.length} ta savol
              </span>
            </div>
          </div>

          <p style="color:var(--text-2);font-size:13.5px;line-height:1.55;margin-bottom:18px">
            Simulyator aynan <strong>ushbu tanlangan filtrdagi savollardan</strong> tasodifiy oladi. Har bir savolga <strong>2 daqiqa</strong> vaqt beriladi. Yakunda tayyorgarlik darajangiz va tavsiyalar hisoblanadi.
          </p>

          <div style="margin-bottom:22px">
            <label style="font:600 12px var(--mono);text-transform:uppercase;color:var(--text-3);display:block;margin-bottom:10px">
              Imtihon uchun savollar sonini tanlang:
            </label>
            <div style="display:flex;gap:8px;flex-wrap:wrap" id="mock-count-options">
              ${countOptions.map(opt => `
                <button type="button" class="iq-pill" data-mock-count="${opt.count}" aria-pressed="${opt.count === mockSelectedCount}">
                  ${esc(opt.label)}
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:10px">
            <button class="btn" data-mock-close>Bekor qilish</button>
            <button class="btn btn-primary" data-mock-start>Imtihonni boshlash</button>
          </div>
        </div>
      `;
    }
  }

  function startMockTest(count = 10) {
    const pool = getIqFilteredList();
    if (!pool.length) {
      toast("Filtr bo'yicha savollar topilmadi");
      return;
    }
    const realCount = Math.min(count, pool.length);
    const shuffled = pool.slice().sort(() => 0.5 - Math.random());
    mockQuestions = shuffled.slice(0, realCount);
    mockIdx = 0;
    mockScores = [];
    renderMockQuestion();
  }

  function renderMockQuestion() {
    const overlay = $("#mock-overlay");
    if (!overlay || mockIdx >= mockQuestions.length) {
      finishMockTest();
      return;
    }
    const q = mockQuestions[mockIdx];
    mockSecondsLeft = 120;
    clearInterval(mockTimer);

    overlay.innerHTML = `
      <div class="mock-modal">
        <div class="mock-head">
          <h2>${icon("rocket", "ic")} Savol ${mockIdx + 1} / ${mockQuestions.length}</h2>
          <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
        </div>

        <div class="mock-timer-wrap">
          <div class="mock-timer-head">
            <span>Ajratilgan vaqt</span>
            <span id="mock-timer-text">02:00</span>
          </div>
          <div class="mock-timer-track">
            <div class="mock-timer-fill" id="mock-timer-bar" style="width:100%"></div>
          </div>
        </div>

        <div class="mock-q-box">
          <div class="mock-q-meta">
            <span class="iq-badge ${q.level}">${q.level}</span>
            <span class="tag-cat">${esc(q.categoryLabel)}</span>
          </div>
          <h3 class="mock-q-title">${esc(q.title)}</h3>
        </div>

        <div id="mock-interaction-area">
          <div class="mock-self-test-prompt">
            <p>Javobni o'zingizcha ovoz chiqarib tushuntirib bering. Tayyor bo'lgach, model javobni oching.</p>
            <button class="btn btn-primary" data-mock-reveal>Model javobni ko'rish →</button>
          </div>
        </div>
      </div>
    `;

    mockTimer = setInterval(() => {
      mockSecondsLeft--;
      const textEl = $("#mock-timer-text");
      const barEl = $("#mock-timer-bar");
      if (textEl && barEl) {
        const mins = Math.floor(mockSecondsLeft / 60);
        const secs = mockSecondsLeft % 60;
        textEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        const pct = (mockSecondsLeft / 120) * 100;
        barEl.style.width = `${pct}%`;
        if (mockSecondsLeft < 30) barEl.className = "mock-timer-fill danger";
        else if (mockSecondsLeft < 60) barEl.className = "mock-timer-fill warn";
      }
      if (mockSecondsLeft <= 0) {
        clearInterval(mockTimer);
        toast("Vaqt tugadi! O'zingizni baholang.");
        const revBtn = $("[data-mock-reveal]");
        if (revBtn) revBtn.click();
      }
    }, 1000);
  }

  function revealMockAnswer() {
    const q = mockQuestions[mockIdx];
    const area = $("#mock-interaction-area");
    if (!area) return;
    area.innerHTML = `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:16px;max-height:260px;overflow-y:auto">
        <div class="iq-answer-label">${icon("target", "ic ic-sm")} Kutiladigan model javob:</div>
        <div style="font-size:13.5px;line-height:1.6">${markdown(q.answer)}</div>
        ${q.tip ? `<div class="iq-tip-box" style="margin-top:12px"><h4>${icon("sparkles", "ic ic-sm")} Senior siri</h4><p>${inline(q.tip)}</p></div>` : ""}
      </div>

      <div style="text-align:center;font:600 12px var(--mono);color:var(--text-3);text-transform:uppercase">O'z javobingizni xolisona baholang:</div>
      <div class="mock-eval-grid">
        <button class="mock-eval-btn good" data-mock-eval="10">
          <span><i class="eval-dot ok"></i>To'liq bildim</span>
          <small>+10 ball</small>
        </button>
        <button class="mock-eval-btn mid" data-mock-eval="5">
          <span><i class="eval-dot mid"></i>Qisman bildim</span>
          <small>+5 ball</small>
        </button>
        <button class="mock-eval-btn bad" data-mock-eval="0">
          <span><i class="eval-dot bad"></i>Bilmadim</span>
          <small>0 ball</small>
        </button>
      </div>
    `;
  }

  function recordMockEval(points) {
    clearInterval(mockTimer);
    const q = mockQuestions[mockIdx];
    mockScores.push({ q, score: Number(points) });
    rateIq(q.id, Number(points) >= 10 ? 2 : Number(points) >= 5 ? 1 : 0);
    mockIdx++;
    renderMockQuestion();
  }

  function finishMockTest() {
    clearInterval(mockTimer);
    const overlay = $("#mock-overlay");
    if (!overlay) return;
    const totalScore = mockScores.reduce((acc, x) => acc + x.score, 0);
    const maxScore = mockScores.length * 10 || 1;
    const pctScore = Math.round((totalScore / maxScore) * 100);

    let verdict = "Ajoyib natija! Texnik intervyulardan muvaffaqiyatli o'tish imkoniyatingiz juda yuqori.";
    if (pctScore < 50) verdict = "Asosiy mavzularni ko'proq takrorlash va bilmagan savollarni yodda saqlash tavsiya etiladi.";
    else if (pctScore < 80) verdict = "Yaxshi natija! Ayrim arxitektura va baza savollarini takrorlab oling.";

    const weakQuestions = mockScores.filter(x => x.score < 10).map(x => x.q);
    const byCat = {};
    mockScores.forEach((x) => { const k = x.q.categoryLabel || x.q.category; (byCat[k] = byCat[k] || { s: 0, n: 0 }); byCat[k].s += x.score; byCat[k].n++; });
    const cats = Object.entries(byCat).map(([k, v]) => ({ k, n: v.n, p: Math.round((v.s / (v.n * 10)) * 100) })).sort((a, b) => a.p - b.p);
    const weakCats = cats.filter((c) => c.p < 70).slice(0, 3).map((c) => c.k);

    overlay.innerHTML = `
      <div class="mock-modal">
        <div class="mock-head">
          <h2>${icon("target", "ic")} Imtihon Natijalari (Scorecard)</h2>
          <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
        </div>

        <div class="mock-scorecard">
          <div class="mock-score-ring">${pctScore}%</div>
          <h3>${totalScore} / ${maxScore} ball</h3>
          <p>${verdict}</p>

          <ul class="mock-cats" aria-label="Bo'limlar bo'yicha natija">${cats.map((c) => `
            <li class="${c.p < 70 ? "weak" : ""}"><span class="mc-name">${esc(c.k)} <small>${c.n} savol</small></span>
              <span class="mc-bar"><i style="width:${c.p}%"></i></span><b>${c.p}%</b></li>`).join("")}
          </ul>
          ${weakCats.length ? `<p class="mock-weak">Zaif joylar: <b>${weakCats.map(esc).join(", ")}</b>. Quyidagi savollarning mavzu havolalari orqali xaritada o'rganing; ular avtomatik takrorlash rejasiga ham tushdi.</p>` : ""}

          ${weakQuestions.length ? `
            <div style="font:600 12px var(--mono);text-transform:uppercase;color:var(--text-3);text-align:left;margin-bottom:8px">
              Takrorlash tavsiya etiladigan savollar (${weakQuestions.length} ta):
            </div>
            <div class="mock-review-list">
              ${weakQuestions.map(wq => {
                const isBookmarked = bookmarkedIq.has(wq.id);
                return `
                  <div class="mock-review-item">
                    <span style="flex:1;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap">${esc(wq.title)}</span>
                    ${wq.skillSlug ? `<a class="mock-study" href="#/s/${wq.skillSlug}/${wq.subskillId || ""}" data-mock-close>Mavzu ${icon("arrow-right", "ic ic-sm")}</a>` : ""}
                    <button class="iq-bookmark-btn ${isBookmarked ? "active" : ""}" data-iq-bookmark="${wq.id}" title="Sevimlilarga saqlash">
                      ${icon("sparkles", "ic ic-sm")}
                    </button>
                  </div>
                `;
              }).join("")}
            </div>
          ` : `<p style="color:var(--accent-text);font-weight:600">Barcha savollarga a'lo darajada javob berdingiz!</p>`}

          <div style="display:flex;justify-content:center;gap:12px;margin-top:20px">
            <button class="btn btn-primary" data-mock-restart>Qayta topshirish</button>
            <button class="btn" data-mock-close>Yopish</button>
          </div>
        </div>
      </div>
    `;
  }

  function closeMockModal() {
    clearInterval(mockTimer);
    const overlay = $("#mock-overlay");
    if (overlay) overlay.remove();
  }

  /* ------------------------------------------------------------------ *
   * Router
   * ------------------------------------------------------------------ */
  function route() {
    const hash = decodeURIComponent(location.hash || "#/");
    const m = hash.match(/^#\/s\/([^/]+)(?:\/(.+))?$/);
    const mInterview = hash.match(/^#\/interview(?:\?(.*))?$/);
    const mQuiz = hash.match(/^#\/quiz(?:\?(.*))?$/);
    document.body.classList.remove("nav-open");
    $("#menu-btn").setAttribute("aria-expanded", "false");

    document.body.dataset.auth = currentUser ? "in" : "out";
    const mLogin = hash.match(/^#\/login(?:\?(.*))?$/);
    const isHome = hash === "#/" || hash === "#" || hash === "";
    if (mLogin) {
      if (currentUser) { location.replace("#/"); return; }
      authMode = /(?:^|&)signup\b/.test(mLogin[1] || "") ? "signup" : "login";
      document.body.dataset.section = "auth";
      document.title = "Kirish · Stack Map";
      renderAuth();
      window.scrollTo(0, 0);
      return;
    }
    if (!currentUser && !isHome) { location.replace("#/login"); return; }

    if (hash === "#/skills") {
      // "Skillar" bo'limi oxirgi ochilgan (yoki birinchi) skill'dan boshlanadi
      location.replace("#/stacks"); return;
    }

    if (m && BY_SLUG[m[1]]) {
      const s = BY_SLUG[m[1]];
      document.title = `${s.title} · Stack Map`;
      const sub = m[2] && SUB_BY_ID[m[2]] && SUB_BY_ID[m[2]].skill === s ? SUB_BY_ID[m[2]] : null;
      if (sub) { document.title = `${sub.title.replace(/`/g, "")} · ${s.title} · Stack Map`; renderSubskill(sub); window.scrollTo(0, 0); }
      else { renderSkill(s, m[2]); if (!m[2]) window.scrollTo(0, 0); }
      markActive("stacks", s.slug);
    } else if (hash === "#/interview/play") {
      if (!iqSess) { location.replace("#/interview"); return; }
      document.title = "Mashq · Intervyu · Stack Map";
      renderIqPlay();
      markActive("interview");
      window.scrollTo(0, 0);
    } else if (mInterview) {
      document.title = "Intervyu savollari · Stack Map";
      const qp = new URLSearchParams(mInterview[1] || "");
      const st = qp.get("stack"), v = qp.get("view");
      iqSubFilter = /^[\d.]+$/.test(qp.get("sub") || "") ? qp.get("sub") : "";
      const nextCat = st && IQ_CATEGORIES.some((c) => c.id === st) ? st : "all";
      const nextScope = ["today", "due", "saved"].includes(v) ? v : qp.get("status") === "bookmarked" ? "saved" : "all";
      if (nextCat !== iqFilterCat || nextScope !== iqScope) { iqFilterLevel = "all"; iqFilterStatus = "all"; iqSearchQuery = ""; }
      iqFilterCat = nextCat;
      iqScope = nextScope;
      iqMode = iqScope === "today" ? "today" : "all";
      if (qp.has("q")) iqSearchQuery = qp.get("q").toLowerCase().trim();
      if (["mastered", "unmastered"].includes(qp.get("status"))) iqFilterStatus = qp.get("status");
      if (!iqTodayIds.length) iqPickToday(5);
      const open = qp.get("open");
      if (open && iqById(open)) {
        history.replaceState(null, "", location.hash.replace(/([?&])open=[^&]*&?/, "$1").replace(/[?&]$/, ""));
        const ids = iqOrderedIds(), i = ids.indexOf(open);
        iqStartSession(i >= 0 ? ids : [open], Math.max(0, i));
        return;
      }
      renderIqBrowse();
      markActive("interview");
      window.scrollTo(0, 0);
    } else if (hash.match(/^#\/stacks(?:\/([^/]+))?$/)) {
      const sid = hash.match(/^#\/stacks(?:\/([^/]+))?$/)[1], stk = TECH_LOGOS.find((y) => y.id === sid);
      if (stk) { document.title = `${stk.n} · Stacklar · Stack Map`; renderStack(stk); }
      else { document.title = "Stacklar · Stack Map"; renderStacks(); }
      markActive("stacks");
      window.scrollTo(0, 0);
    } else if (hash === "#/profile") {
      document.title = "Profil · Stack Map";
      renderProfile();
      markActive("profile");
      window.scrollTo(0, 0);
    } else if (hash === "#/quiz/play") {
      if (quizState === "lobby" || !quizQuestions.length) { location.replace(quizLobbyHash()); return; }
      document.title = "Test · Stack Map";
      renderQuizPlay();
      markActive("quiz");
      window.scrollTo(0, 0);
    } else if (mQuiz) {
      document.title = "Texnik testlar · Stack Map";
      const qp = new URLSearchParams(mQuiz[1] || "");
      const st = qp.get("stack");
      const next = st && QUIZ_CATEGORIES.some((c) => c.id === st) ? st : qp.get("mode") === "wrong" ? "wrong" : "all";
      if (next !== quizActiveCat) { quizActiveCat = next; quizActiveLevel = "all"; }
      quizState = "lobby";
      renderQuizPage();
      markActive("quiz");
      window.scrollTo(0, 0);
    } else {
      document.title = "Stack Map";
      renderHome();
      markActive("home");
      window.scrollTo(0, 0);
    }
    view().focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------ *
   * Command palette (search)
   * ------------------------------------------------------------------ */
  const norm = (s) => String(s).toLowerCase().replace(/[`*_]/g, "").replace(/[‘’ʻʼ`]/g, "'");
  let INDEX = [];
  function buildIndex() {
    INDEX = [];
    SKILLS.forEach((s) => {
      INDEX.push({ kind: "skill", s, title: s.title, nt: norm(s.title), nd: norm(s.description) });
      s.subskills.forEach((x) => INDEX.push({ kind: "sub", s, x, title: x.title, nt: norm(x.title), nd: norm(x.description) }));
    });
  }

  function searchIndex(q) {
    const nq = norm(q).trim();
    if (!nq) return [];
    const terms = nq.split(/\s+/);
    const res = [];
    for (const it of INDEX) {
      let score = 0;
      if (it.nt === nq) score = 100;
      else if (it.nt.startsWith(nq)) score = 80;
      else if (it.nt.includes(nq)) score = 60;
      else if (terms.every((t) => it.nt.includes(t))) score = 45;
      else if (it.nd && it.nd.includes(nq)) score = 20;
      else if (it.nd && terms.every((t) => it.nt.includes(t) || it.nd.includes(t))) score = 10;
      if (score) res.push({ ...it, score: score + (it.kind === "skill" ? 5 : 0) });
    }
    return res.sort((a, b) => b.score - a.score || a.s.index - b.s.index).slice(0, 60);
  }

  function mark(title, q) {
    const plain = title.replace(/`/g, "");
    const nq = norm(q).trim();
    const i = norm(plain).indexOf(nq);
    if (!nq || i < 0) return esc(plain);
    return esc(plain.slice(0, i)) + `<mark>${esc(plain.slice(i, i + nq.length))}</mark>` + esc(plain.slice(i + nq.length));
  }

  let palSel = 0, palItems = [], lastFocus = null;
  const pal = () => $("#palette"), palInput = () => $("#palette-input"), palList = () => $("#palette-results");

  function renderPalette() {
    const q = palInput().value;
    let rows;
    if (!q.trim()) {
      const recent = BY_SLUG[store.get(KEYS.last, "")];
      rows = (recent ? [recent] : []).concat(SKILLS.filter((s) => s !== recent).slice(0, 7))
        .map((s) => ({ kind: "skill", s, title: s.title }));
    } else rows = searchIndex(q);
    palItems = rows;
    palSel = 0;
    if (!rows.length) {
      palList().innerHTML = `<div class="empty">${icon("search")}<div>“${esc(q)}” bo'yicha hech narsa topilmadi.</div></div>`;
      return;
    }
    const skills = rows.filter((r) => r.kind === "skill"), subs = rows.filter((r) => r.kind === "sub");
    palItems = skills.concat(subs);
    let n = 0;
    const item = (r) => {
      const idx = n++;
      const href = r.kind === "skill" ? `#/s/${r.s.slug}` : `#/s/${r.s.slug}/${r.x.id}`;
      return `<a class="palette-item" role="option" id="po-${idx}" data-idx="${idx}" href="${href}" aria-selected="${idx === 0}">
        <span class="num">${r.kind === "skill" ? pad(r.s.num) : r.x.num}</span>
        <span style="min-width:0"><span class="t" style="display:block">${mark(r.title, q)}</span>
          ${r.kind === "sub" ? `<span class="s" style="display:block">${esc(r.s.title)}${r.x.description ? "" : " · tavsif yo'q"}</span>`
                             : `<span class="s" style="display:block">${r.s.subskills.length} subskill · ${esc(r.s.groupRef ? r.s.groupRef.title : "")}</span>`}</span>
        ${icon("enter", "ic ic-sm go")}
      </a>`;
    };
    palList().innerHTML =
      (skills.length ? `<div class="palette-group">${q.trim() ? "Skill'lar" : "Tezkor o'tish"}</div>${skills.map(item).join("")}` : "") +
      (subs.length ? `<div class="palette-group">Subskill'lar · ${subs.length}</div>${subs.map(item).join("")}` : "");
    palInput().setAttribute("aria-activedescendant", "po-0");
  }

  function moveSel(d) {
    if (!palItems.length) return;
    palSel = (palSel + d + palItems.length) % palItems.length;
    $$(".palette-item", palList()).forEach((el) => el.setAttribute("aria-selected", String(Number(el.dataset.idx) === palSel)));
    const el = $(`#po-${palSel}`);
    if (el) { el.scrollIntoView({ block: "nearest" }); palInput().setAttribute("aria-activedescendant", el.id); }
  }

  function openPalette() {
    lastFocus = document.activeElement;
    pal().classList.add("open");
    palInput().value = "";
    renderPalette();
    setTimeout(() => palInput().focus(), 0);
  }
  function closePalette() {
    pal().classList.remove("open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function bindPalette() {
    palInput().addEventListener("input", renderPalette);
    palInput().addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); moveSel(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveSel(-1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const el = $(`#po-${palSel}`);
        if (el) { closePalette(); location.hash = el.getAttribute("href"); }
      }
    });
    pal().addEventListener("click", (e) => {
      if (e.target === pal()) closePalette();
      if (e.target.closest(".palette-item")) closePalette();
    });
    pal().addEventListener("mousemove", (e) => {
      const el = e.target.closest(".palette-item");
      if (el && Number(el.dataset.idx) !== palSel) { palSel = Number(el.dataset.idx); moveSel(0); }
    });
  }

  /* ------------------------------------------------------------------ *
   * Chrome: theme, menu, drawer, shortcuts, import/export
   * ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    $("span", t).textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function copyText(str) {
    const ok = () => toast("Havola nusxalandi");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(str).then(ok, () => fallbackCopy(str, ok));
    else fallbackCopy(str, ok);
  }
  function fallbackCopy(str, ok) {
    const ta = document.createElement("textarea");
    ta.value = str; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); ok(); } catch { toast("Nusxalab bo'lmadi"); }
    ta.remove();
  }

  function setMenu() { /* ⋯ menyu olib tashlandi: amallar profil sahifasida */ }

  function bindChrome() {
    $("#theme-btn").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      $('meta[name="theme-color"]').setAttribute("content", next === "light" ? "#F7F9FC" : "#0B1120");
      try { localStorage.setItem(KEYS.theme, next); } catch { /* ignore */ }
    });

    $("#menu-btn").addEventListener("click", () => {
      const open = !document.body.classList.contains("nav-open");
      document.body.classList.toggle("nav-open", open);
      $("#menu-btn").setAttribute("aria-expanded", String(open));
    });
    $("#scrim").addEventListener("click", () => { document.body.classList.remove("nav-open"); $("#menu-btn").setAttribute("aria-expanded", "false"); });

    document.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="logout"]')) logout();
    });

    document.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;

      const mod = e.ctrlKey || e.metaKey || e.altKey;
      const onControl = e.target.closest && e.target.closest("a, button, summary");
      // Intervyu fokus sessiyasi
      if (location.hash === "#/interview/play" && iqSess && !mod && !pal().classList.contains("open") && !$("#mock-overlay")) {
        if (typing) { if (e.key === "Escape") document.activeElement.blur(); }
        else {
          const S = iqSess, id = S.ids[S.idx];
          if (e.key === "Escape") { e.preventDefault(); location.hash = S.back; return; }
          if (id) {
            if ((e.key === " " || e.key === "Enter") && !S.shown.has(id) && !onControl) { e.preventDefault(); iqRevealSess(); return; }
            if (S.shown.has(id) && ["1", "2", "3"].includes(e.key)) { e.preventDefault(); iqRateSess(Number(e.key) - 1); return; }
            if (e.key === "b" || e.key === "B") { e.preventDefault(); toggleBookmarkIq(id); return; }
          }
          if (e.key === "ArrowRight") { e.preventDefault(); iqStepSess(1); return; }
          if (e.key === "ArrowLeft") { e.preventDefault(); iqStepSess(-1); return; }
        }
      }

      // Keyboard navigation for Quiz page
      if (!typing && !mod && window.location.hash.startsWith("#/quiz") && !pal().classList.contains("open") && !$("#mock-overlay")) {
        if (e.key === "Escape" && location.hash === "#/quiz/play") { e.preventDefault(); handleQuizBackToLobby(); return; }
        if (quizState === "lobby") {
          if (e.key === "Enter" && !onControl) {
            e.preventDefault();
            handleQuizStart();
            return;
          }
        } else if (quizState === "running" && quizQuestions.length) {
          const curQ = quizQuestions[quizIdx];
          const isAnswered = Boolean(curQ && quizAnswers[curQ.id]);

          if (!isAnswered) {
            const k = e.key.toUpperCase();
            if (["A", "B", "C", "D"].includes(k)) {
              e.preventDefault();
              handleQuizSelect(k);
              return;
            } else if (["1", "2", "3", "4"].includes(e.key)) {
              e.preventDefault();
              const numMap = { "1": "A", "2": "B", "3": "C", "4": "D" };
              handleQuizSelect(numMap[e.key]);
              return;
            }
          } else {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleQuizNext();
              return;
            }
          }
        } else if (quizState === "finished") {
          if (e.key === "Enter" && !onControl) {
            e.preventDefault();
            handleQuizRestart();
            return;
          }
        }
      }

      if (e.key === "/" && !typing && currentUser) { e.preventDefault(); openPalette(); return; }
      if (e.key === "Escape") {
        if ($("#mock-overlay")) { closeMockModal(); return; }
        if (pal().classList.contains("open")) closePalette();
        else if (document.body.classList.contains("nav-open")) { document.body.classList.remove("nav-open"); $("#menu-btn").setAttribute("aria-expanded", "false"); }
      }
      if (e.key === "Tab" && pal().classList.contains("open")) {
        e.preventDefault(); palInput().focus();
      }
    });

    window.addEventListener("hashchange", route);
    window.addEventListener("storage", (e) => {
      if (e.key === KEYS.progress) { progress = store.get(KEYS.progress, {}); route(); updateSidebarProgress(); }
    });
  }

  /* ------------------------------------------------------------------ *
   * Accounts: mahalliy baza (IndexedDB). Email + parol (PBKDF2), har bir hisobga
   * alohida progress, intervyu, saqlanganlar va test natijalari.
   * ------------------------------------------------------------------ */
  const USER_KEYS = { progress: KEYS.progress, questions: KEYS.questions, bookmarks: KEYS.bookmarks, quiz: KEYS.quiz, last: KEYS.last, srs: KEYS.srs, quizHist: KEYS.quizHist, quizWrong: KEYS.quizWrong };
  const USER_KEY_SET = new Set(Object.values(USER_KEYS));
  let authMode = "login";

  const udb = {
    open() {
      return new Promise((res, rej) => {
        const req = indexedDB.open("lsm_accounts", 1);
        req.onupgradeneeded = () => {
          req.result.createObjectStore("users", { keyPath: "email" });
          req.result.createObjectStore("data", { keyPath: "email" });
        };
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
      });
    },
    async get(storeName, key) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const req = db.transaction(storeName, "readonly").objectStore(storeName).get(key);
        req.onsuccess = () => res(req.result || null);
        req.onerror = () => rej(req.error);
      });
    },
    async all(storeName) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const req = db.transaction(storeName, "readonly").objectStore(storeName).getAll();
        req.onsuccess = () => res(req.result || []);
        req.onerror = () => rej(req.error);
      });
    },
    async del(storeName, key) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const tx = db.transaction(storeName, "readwrite");
        tx.objectStore(storeName).delete(key);
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    },
    async put(storeName, value) {
      const db = await this.open();
      return new Promise((res, rej) => {
        const tx = db.transaction(storeName, "readwrite");
        tx.objectStore(storeName).put(value);
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    },
  };

  const b64 = (bytes) => btoa(String.fromCharCode(...bytes));
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const normEmail = (e) => String(e || "").trim().toLowerCase();
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  async function hashPassword(password, salt) {
    if (!window.crypto || !crypto.subtle) throw new Error("Brauzer parolni xavfsiz hash qila olmaydi (crypto.subtle yo'q).");
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: 150000 }, key, 256);
    return b64(new Uint8Array(bits));
  }

  function userSnapshot() {
    return {
      progress: store.get(KEYS.progress, {}),
      questions: store.get(KEYS.questions, []),
      bookmarks: store.get(KEYS.bookmarks, []),
      quiz: store.get(KEYS.quiz, {}),
      last: store.get(KEYS.last, ""),
      srs: store.get(KEYS.srs, {}),
      quizHist: store.get(KEYS.quizHist, []),
      quizWrong: store.get(KEYS.quizWrong, []),
    };
  }
  async function saveUserData() {
    if (!currentUser) return;
    clearTimeout(userSaveTimer); userSaveTimer = 0;
    try { await udb.put("data", { email: currentUser, ...userSnapshot(), updatedAt: Date.now() }); } catch (e) { console.warn("Hisob ma'lumotini saqlashda xato:", e); }
  }
  function onUserKeyChanged(key) {
    if (!currentUser || !USER_KEY_SET.has(key)) return;
    clearTimeout(userSaveTimer);
    userSaveTimer = setTimeout(saveUserData, 300);
  }
  function loadUserDataIntoStore(data) {
    const d = data || {};
    localStorage.setItem(KEYS.progress, JSON.stringify(d.progress || {}));
    localStorage.setItem(KEYS.questions, JSON.stringify(d.questions || []));
    localStorage.setItem(KEYS.bookmarks, JSON.stringify(d.bookmarks || []));
    localStorage.setItem(KEYS.quiz, JSON.stringify(d.quiz || {}));
    localStorage.setItem(KEYS.last, JSON.stringify(d.last || ""));
    localStorage.setItem(KEYS.srs, JSON.stringify(d.srs || {}));
    localStorage.setItem(KEYS.quizHist, JSON.stringify(d.quizHist || []));
    localStorage.setItem(KEYS.quizWrong, JSON.stringify(d.quizWrong || []));
    localStorage.setItem(KEYS.progressV, JSON.stringify(PROGRESS_VERSION));
  }
  function reloadState() {
    progress = store.get(KEYS.progress, {});
    if (typeof progress !== "object" || progress === null) progress = {};
    masteredIq = new Set(store.get(KEYS.questions, []));
    bookmarkedIq = new Set(store.get(KEYS.bookmarks, []));
    quizScores = store.get(KEYS.quiz, {}) || {};
    iqSrs = store.get(KEYS.srs, {}) || {};
    iqTodayIds = [];
    quizHist = store.get(KEYS.quizHist, []) || [];
    quizWrong = new Set(store.get(KEYS.quizWrong, []));
    iqSess = null;
  }
  function updateUserUI() {
    document.body.dataset.auth = currentUser ? "in" : "out";
    const ini = $("#profile-initial");
    if (ini) ini.textContent = currentUser ? currentUser[0].toUpperCase() : "?";
    const pb = $("#profile-btn");
    if (pb) pb.title = currentUser ? `Profil: ${currentUser}` : "Profil";
  }

  async function startSession(email, data) {
    currentUser = email;
    try { localStorage.setItem(KEYS.session, JSON.stringify(email)); } catch (e) {}
    loadUserDataIntoStore(data);
    reloadState();
    updateUserUI();
    updateSidebarProgress();
  }

  async function restoreSession() {
    let email = null;
    try { email = JSON.parse(localStorage.getItem(KEYS.session) || "null"); } catch (e) {}
    if (!email) { updateUserUI(); return; }
    try {
      const user = await udb.get("users", email);
      if (!user) throw new Error("hisob topilmadi");
      currentUser = email;
      loadUserDataIntoStore(await udb.get("data", email));
      reloadState();
    } catch (e) {
      currentUser = null;
      try { localStorage.removeItem(KEYS.session); } catch (err) {}
    }
    updateUserUI();
  }

  async function signup(email, password) {
    email = normEmail(email);
    if (await udb.get("users", email)) throw new Error("Bu email allaqachon ro'yxatdan o'tgan. Kirish bo'limidan foydalaning.");
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await hashPassword(password, salt);
    await udb.put("users", { email, salt: b64(salt), hash, iterations: 150000, createdAt: Date.now() });
    // mavjud (mehmon) progress yangi hisobga ko'chiriladi
    const adopt = { email, ...userSnapshot(), updatedAt: Date.now() };
    await udb.put("data", adopt);
    await startSession(email, adopt);
  }

  async function login(email, password) {
    email = normEmail(email);
    const user = await udb.get("users", email);
    const fail = () => new Error("Email yoki parol noto'g'ri.");
    if (!user) { await new Promise((r) => setTimeout(r, 400)); throw fail(); }
    if (!(await verifyPassword(user, password))) { await new Promise((r) => setTimeout(r, 400)); throw fail(); }
    await startSession(email, await udb.get("data", email));
  }

  async function verifyPassword(user, password) {
    const hash = await hashPassword(password, unb64(user.salt));
    let diff = hash.length ^ user.hash.length;
    for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ (user.hash.charCodeAt(i) || 0);
    return diff === 0;
  }

  async function changePassword(current, next) {
    const user = await udb.get("users", currentUser);
    if (!user || !(await verifyPassword(user, current))) { await new Promise((r) => setTimeout(r, 400)); throw new Error("Joriy parol noto'g'ri."); }
    const salt = crypto.getRandomValues(new Uint8Array(16));
    await udb.put("users", { ...user, salt: b64(salt), hash: await hashPassword(next, salt), updatedAt: Date.now() });
  }

  async function deleteAccount(password) {
    const email = currentUser;
    const user = await udb.get("users", email);
    if (!user || !(await verifyPassword(user, password))) { await new Promise((r) => setTimeout(r, 400)); throw new Error("Parol noto'g'ri."); }
    clearTimeout(userSaveTimer); userSaveTimer = 0;
    currentUser = null;
    await udb.del("users", email);
    await udb.del("data", email);
    try { localStorage.removeItem(KEYS.session); } catch (e) {}
    Object.values(USER_KEYS).forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
    reloadState();
    updateUserUI();
  }

  async function logout() {
    await saveUserData();
    currentUser = null;
    try { localStorage.removeItem(KEYS.session); } catch (e) {}
    Object.values(USER_KEYS).forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
    reloadState();
    setMenu(false);
    updateUserUI();
    location.hash = "#/";
    route();
  }

  const pwInput = (name, autocomplete, placeholder = "") =>
    `<span class="pw-wrap"><input type="password" name="${name}" autocomplete="${autocomplete}" ${placeholder ? `placeholder="${placeholder}" ` : ""}required /><button type="button" class="pw-toggle" data-pw-toggle aria-label="Parolni ko'rsatish" aria-pressed="false">${icon("eye")}</button></span>`;

  function renderAuth() {
    const signupMode = authMode === "signup";
    view().innerHTML = `
      <section class="auth reveal">
        <div class="auth-card">
          <a class="auth-back" href="#/">${icon("arrow-left", "ic ic-sm")} Bosh sahifa</a>
          <span class="brand-mark">${icon("logo")}</span>
          <h1>${signupMode ? "Hisob yaratish" : "Kirish"}</h1>
          <div class="auth-tabs" role="tablist">
            <button type="button" role="tab" data-auth-tab="login" aria-selected="${!signupMode}">Kirish</button>
            <button type="button" role="tab" data-auth-tab="signup" aria-selected="${signupMode}">Ro'yxatdan o'tish</button>
          </div>
          <form id="auth-form" novalidate>
            <label class="field"><span>Email</span>
              <input type="email" name="email" autocomplete="email" placeholder="nom@gmail.com" required />
            </label>
            <label class="field"><span>Parol</span>
              ${pwInput("password", signupMode ? "new-password" : "current-password", signupMode ? "Kamida 8 ta belgi" : "Parol")}
            </label>
            ${signupMode ? `<label class="field"><span>Parolni takrorlang</span>${pwInput("confirm", "new-password")}</label>` : ""}
            <p class="auth-error" id="auth-error" role="alert"></p>
            <button class="btn btn-primary btn-lg auth-submit" type="submit">${signupMode ? "Hisob yaratish" : "Kirish"}</button>
          </form>
        </div>
      </section>`;
    const first = $("#auth-form input"); if (first) first.focus({ preventScroll: true });
  }

  /* ---------------- Profil ---------------- */
  const ADMIN_EMAIL = "ibraymovalpamis81@gmail.com";
  let prRows = [];
  async function loadProfiles() {
    try {
      const [users, datas] = await Promise.all([udb.all("users"), udb.all("data")]);
      const byEmail = Object.fromEntries(datas.map((d) => [d.email, d]));
      const total = allSubs().length || 1;
      prRows = users.map((u) => {
        const pr = (byEmail[u.email] && byEmail[u.email].progress) || {};
        const w = Object.values(pr).reduce((a, st) => a + (WEIGHT[st] || 0), 0);
        const done = Object.values(pr).filter((st) => st === 2).length;
        return { email: u.email, createdAt: u.createdAt, updatedAt: (byEmail[u.email] || {}).updatedAt, p: pct(w / total), done };
      }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      renderProfileList();
    } catch (e) {
      const l = $("#pr-list"); if (l) l.innerHTML = `<li class="pf-note">Ro'yxatni o'qib bo'lmadi.</li>`;
    }
  }
  function renderProfileList() {
    const list = $("#pr-list"); if (!list) return;
    const q = (($("#pr-search") || {}).value || "").trim().toLowerCase();
    const rows = prRows.filter((r) => r.email.toLowerCase().includes(q));
    const cnt = $("#pr-count"); if (cnt) cnt.textContent = String(prRows.length);
    const day = (ms) => ms ? new Date(ms).toISOString().slice(0, 10) : "—";
    list.innerHTML = rows.length ? rows.map((r) => {
      const me = r.email === currentUser;
      return `<li class="pr-row" data-email="${esc(r.email)}">
        <span class="pf-avatar pr-av" aria-hidden="true">${esc(r.email[0].toUpperCase())}</span>
        <div class="pr-main"><b>${esc(r.email)}${me ? ` <span class="chip">Siz</span>` : ""}</b>
          <small>Yaratilgan: ${day(r.createdAt)} · Oxirgi faollik: ${day(r.updatedAt)}</small></div>
        <div class="pr-prog"><span>${r.p}%</span><div class="bar"><i style="width:${r.p}%"></i></div><small>${r.done} ishonchli</small></div>
        ${me ? `<span class="pr-self">Hozirgi hisob</span>` : `<div class="pr-actions">
          <button class="btn pf-del-btn" type="button" data-pr-del>${icon("trash", "ic ic-sm")} O'chirish</button>
          <span class="pr-confirm" hidden><button class="btn pf-del-btn pf-del-confirm" type="button" data-pr-yes>Ha, o'chirish</button><button class="btn" type="button" data-pr-no>Yo'q</button></span>
        </div>`}
      </li>`;
    }).join("") : `<li class="pf-note">Hisob topilmadi.</li>`;
  }

  function renderProfile() {
    const subs = allSubs();
    const st = statsFor(subs);
    const iqAll = window.INTERVIEW_QUESTIONS || [];
    const iqDone = iqAll.filter((q) => masteredIq.has(q.id)).length;
    const testsAll = (window.INTERVIEW_TESTS || []).length;
    const scores = Object.values(quizScores || {}).filter((v) => Number.isFinite(v));
    const scoreAvg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const handle = currentUser.split("@")[0];
    const rows = TECH_LOGOS.map((x) => ({ x, s: stackStats(x), n: stackSkills(x).length }));
    const active = rows.filter((r) => r.s.progress > 0).sort((a, b) => b.s.progress - a.s.progress);
    const last = BY_SLUG[store.get(KEYS.last, "")];
    const learning = st.counts[1], p = pct(st.progress);
    const stackRow = (r) => `<li><a class="pf-stack" href="#/stacks/${r.x.id}">${stackLogo(r.x)}<div class="pf-stack-main"><div class="pf-stack-top"><b>${esc(r.x.n)}</b><span>${pct(r.s.progress)}%</span></div><div class="bar"><i style="width:${pct(r.s.progress)}%"></i></div><small>${r.s.done} / ${r.s.total} mavzu · ${r.n} skill</small></div></a></li>`;
    const isAdmin = currentUser.trim().toLowerCase() === ADMIN_EMAIL;
    const tab = (id, label, ic) => `<button type="button" role="tab" data-pf-tab="${id}" aria-selected="${id === "overview"}">${icon(ic, "ic ic-sm")}<span>${label}</span></button>`;

    view().innerHTML = `
      <section class="profile reveal">
        <header class="pf-hero">
          <div class="pf-cover" aria-hidden="true"></div>
          <div class="pf-hero-row">
            <span class="pf-avatar" aria-hidden="true">${esc(currentUser[0].toUpperCase())}</span>
            <div class="pf-id"><h1>${esc(handle)}</h1><p>${esc(currentUser)} · <span id="pf-since"> </span></p></div>
            <div class="pf-hero-actions">
              <a class="btn btn-primary" href="${last ? `#/s/${last.slug}` : "#/stacks"}">${last ? "Davom ettirish" : "Boshlash"} ${icon("arrow-right", "ic ic-sm")}</a>
              <button class="btn" data-action="logout">${icon("enter", "ic ic-sm")} Chiqish</button>
            </div>
          </div>
        </header>

        <div class="pf-layout">
          <nav class="pf-tabs" role="tablist" aria-label="Profil bo'limlari">
            ${tab("overview", "Umumiy ko'rinish", "home")}
            ${tab("progress", "Progress", "list-checks")}
            ${tab("account", "Hisob", "key")}
            ${isAdmin ? tab("profiles", "Profillar", "users") : ""}
            ${tab("danger", "Xavfli zona", "alert")}
          </nav>

          <div class="pf-panels">
            <div class="pf-panel" role="tabpanel" data-pf-panel="overview">
              <ul class="pf-stats">
                <li><b>${p}<small>%</small></b><span>umumiy progress</span></li>
                <li><b>${st.done}<small> / ${st.total}</small></b><span>ishonchli mavzu</span></li>
                <li><b>${iqDone}<small> / ${iqAll.length}</small></b><span>o'zlashtirilgan savol</span></li>
                <li><b>${scoreAvg === null ? "—" : scoreAvg + "%"}</b><span>o'rtacha test natijasi</span></li>
              </ul>
              <div class="pf-two">
                <section class="pf-card">
                  <h2>Faol stacklar</h2>
                  ${active.length ? `<ul class="pf-stack-list">${active.slice(0, 5).map(stackRow).join("")}</ul>`
                    : `<p class="pf-empty">Hali hech narsa boshlanmagan. Birinchi stackni tanlang.</p><a class="btn btn-primary" href="#/stacks">Stacklarga o'tish</a>`}
                </section>
                <section class="pf-card">
                  <h2>Holatlar</h2>
                  <div class="pf-ring" style="--p:${p}"><span>${p}%</span></div>
                  <ul class="breakdown">${STATUSES.map((x, i) => `<li data-st="${i}"><i class="st-dot"></i>${x.label}<b>${st.counts[i]}</b></li>`).join("")}</ul>
                </section>
              </div>
              <ul class="pf-links">
                <li><a href="#/interview"><span>Intervyu savollari</span><b>${iqDone} / ${iqAll.length}</b>${icon("arrow-right", "ic ic-sm")}</a></li>
                <li><a href="#/quiz"><span>Texnik testlar</span><b>${scoreAvg === null ? "—" : scoreAvg + "%"} · ${testsAll} ta</b>${icon("arrow-right", "ic ic-sm")}</a></li>
              </ul>
            </div>

            <div class="pf-panel" role="tabpanel" data-pf-panel="progress" hidden>
              <section class="pf-card">
                <h2>Barcha stacklar</h2>
                <p class="pf-note">${learning} mavzu o'rganilmoqda, ${st.done} ta ishonchli.</p>
                <ul class="pf-stack-list">${rows.map(stackRow).join("")}</ul>
              </section>
            </div>

            <div class="pf-panel" role="tabpanel" data-pf-panel="account" hidden>
              <section class="pf-card">
                <h2>Hisob ma'lumotlari</h2>
                <dl class="pf-dl"><dt>Email</dt><dd>${esc(currentUser)}</dd><dt>Saqlash joyi</dt><dd>Faqat shu brauzer (lokal baza)</dd></dl>
              </section>
              <section class="pf-card">
                <h2>Parolni o'zgartirish</h2>
                <form id="pw-form" novalidate>
                  <label class="field"><span>Joriy parol</span>${pwInput("current", "current-password")}</label>
                  <label class="field"><span>Yangi parol</span>${pwInput("next", "new-password", "Kamida 8 ta belgi")}</label>
                  <label class="field"><span>Yangi parolni takrorlang</span>${pwInput("confirm", "new-password")}</label>
                  <p class="auth-error pf-msg" role="alert"></p>
                  <button class="btn btn-primary" type="submit">Parolni yangilash</button>
                </form>
              </section>
            </div>

            ${isAdmin ? `<div class="pf-panel" role="tabpanel" data-pf-panel="profiles" hidden>
              <section class="pf-card">
                <h2>Profillar <span class="chip mono" id="pr-count">…</span></h2>
                <p class="pf-note">Shu brauzerda ro'yxatdan o'tgan barcha hisoblar. Hisob o'chirilsa, uning progressi ham o'chadi.</p>
                <input class="pr-search" id="pr-search" type="search" placeholder="Email bo'yicha qidirish" autocomplete="off" />
                <ul class="pr-list" id="pr-list"><li class="pf-note">Yuklanmoqda…</li></ul>
              </section>
            </div>` : ""}

            <div class="pf-panel" role="tabpanel" data-pf-panel="danger" hidden>
              <section class="pf-card pf-danger">
                <h2>Hisobni o'chirish</h2>
                <p>Hisob, progress, intervyu belgilari va test natijalari butunlay o'chadi. Qaytarib bo'lmaydi.</p>
                <button class="btn pf-del-btn" type="button" data-del-toggle>${icon("trash", "ic ic-sm")} Hisobni o'chirish</button>
                <form id="del-form" novalidate hidden>
                  <label class="field"><span>Tasdiqlash uchun parolni kiriting</span>${pwInput("password", "current-password")}</label>
                  <p class="auth-error pf-msg" role="alert"></p>
                  <div class="pf-del-row">
                    <button class="btn pf-del-btn pf-del-confirm" type="submit">Ha, butunlay o'chirish</button>
                    <button class="btn" type="button" data-del-toggle>Bekor qilish</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>`;
    if (isAdmin) loadProfiles();
    udb.get("users", currentUser).then((u) => {
      const el = $("#pf-since");
      if (el && u) el.textContent = `a'zo bo'lgan: ${new Date(u.createdAt).toISOString().slice(0, 10)}`;
    }).catch(() => {});
  }

  document.addEventListener("click", (e) => {
    const prDel = e.target.closest("[data-pr-del]");
    if (prDel) { prDel.hidden = true; prDel.nextElementSibling.hidden = false; return; }
    const prNo = e.target.closest("[data-pr-no]");
    if (prNo) { const box = prNo.parentElement; box.hidden = true; box.previousElementSibling.hidden = false; return; }
    const prYes = e.target.closest("[data-pr-yes]");
    if (prYes) {
      const email = prYes.closest(".pr-row").dataset.email;
      if (email === currentUser || currentUser.trim().toLowerCase() !== ADMIN_EMAIL) return;
      prYes.disabled = true;
      Promise.all([udb.del("users", email), udb.del("data", email)]).then(() => {
        prRows = prRows.filter((r) => r.email !== email);
        renderProfileList();
        toast("Hisob o'chirildi");
      }).catch(() => { prYes.disabled = false; toast("O'chirib bo'lmadi"); });
      return;
    }
    const pft = e.target.closest("[data-pf-tab]");
    if (pft) {
      $$("[data-pf-tab]").forEach((b) => b.setAttribute("aria-selected", String(b === pft)));
      $$("[data-pf-panel]").forEach((pn) => { pn.hidden = pn.dataset.pfPanel !== pft.dataset.pfTab; });
      return;
    }
    const eye = e.target.closest("[data-pw-toggle]");
    if (eye) {
      const input = eye.parentElement.querySelector("input");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      eye.setAttribute("aria-pressed", String(show));
      eye.setAttribute("aria-label", show ? "Parolni yashirish" : "Parolni ko'rsatish");
      eye.innerHTML = icon(show ? "eye-off" : "eye");
      input.focus({ preventScroll: true });
      return;
    }
    const del = e.target.closest("[data-del-toggle]");
    if (del) {
      const f = $("#del-form");
      f.hidden = !f.hidden;
      $(".pf-del-btn[data-del-toggle]").hidden = !f.hidden;
      if (!f.hidden) f.password.focus({ preventScroll: true });
      return;
    }
    const tab = e.target.closest("[data-auth-tab]");
    if (tab && !currentUser) { authMode = tab.dataset.authTab; renderAuth(); }
  });
  document.addEventListener("input", (e) => { if (e.target.id === "pr-search") renderProfileList(); });
  document.addEventListener("submit", async (e) => {
    if (e.target.id !== "auth-form") return;
    e.preventDefault();
    const f = e.target, err = $("#auth-error"), btn = $(".auth-submit", f);
    const email = f.email.value, password = f.password.value;
    const show = (msg) => { err.textContent = msg; };
    show("");
    if (!EMAIL_RE.test(normEmail(email))) return show("To'g'ri email kiriting (masalan: nom@gmail.com).");
    if (authMode === "signup") {
      if (password.length < 8) return show("Parol kamida 8 ta belgidan iborat bo'lsin.");
      if (password !== f.confirm.value) return show("Parollar bir xil emas.");
    } else if (!password) return show("Parolni kiriting.");
    btn.disabled = true; btn.textContent = "Kuting…";
    try {
      await (authMode === "signup" ? signup(email, password) : login(email, password));
      location.hash = "#/";
      route();
      toast(authMode === "signup" ? "Hisob yaratildi" : "Xush kelibsiz");
    } catch (ex) {
      show(ex.message || "Xatolik yuz berdi.");
      btn.disabled = false; btn.textContent = authMode === "signup" ? "Hisob yaratish" : "Kirish";
    }
  });
  document.addEventListener("submit", async (e) => {
    const id = e.target.id;
    if (id !== "pw-form" && id !== "del-form") return;
    e.preventDefault();
    const f = e.target, msg = $(".pf-msg", f), btn = $("button[type=submit]", f);
    const show = (m) => { msg.textContent = m; };
    show("");
    if (id === "pw-form") {
      if (!f.current.value) return show("Joriy parolni kiriting.");
      if (f.next.value.length < 8) return show("Yangi parol kamida 8 ta belgidan iborat bo'lsin.");
      if (f.next.value !== f.confirm.value) return show("Yangi parollar bir xil emas.");
      if (f.next.value === f.current.value) return show("Yangi parol joriy paroldan farq qilsin.");
    } else if (!f.password.value) return show("Parolni kiriting.");
    btn.disabled = true;
    try {
      if (id === "pw-form") {
        await changePassword(f.current.value, f.next.value);
        f.reset();
        $$(".pw-toggle[aria-pressed=true]", f).forEach((b) => b.click());
        toast("Parol yangilandi");
      } else {
        await deleteAccount(f.password.value);
        location.hash = "#/";
        route();
        toast("Hisob o'chirildi");
        return;
      }
    } catch (ex) { show(ex.message || "Xatolik yuz berdi."); }
    btn.disabled = false;
  });
  window.addEventListener("pagehide", () => { if (currentUser) saveUserData(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden && currentUser) saveUserData(); });

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */
  bindChrome();
  bindPalette();
  Promise.all([loadData(), restoreSession()]).then(() => {
    buildModel();
    buildInterviewTaxonomy();
    buildIndex();
    renderSidebar();
    route();
    requestAnimationFrame(() => setTimeout(loadLessons, 0));
  });
})();
~~~~~~~~
