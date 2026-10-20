/* 80 · Technical Documentation
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 80,
  slug: "technical-documentation",
  title: "Technical Documentation",
  group: "process",
  description: "Texnik hujjatlashtirish — dasturiy tizimning uzoq umr ko'rishi, yangi dasturchilarning tezkor integratsiyasi (onboarding) va favqulodda vaziyatlarda to'g'ri qaror qabul qilishning asosi hisoblanadi. Senior Laravel dasturchi tushunarli README, mustahkam Architecture Decision Records (ADR), vizual arxitektura diagrammalari (C4, Mermaid), ishga tushirish (Runbooks) va nosozliklarni bartaraf etish (Troubleshooting) qo'llanmalarini yozadi. Hujjatni 'kod kabi' (Docs-as-Code) qabul qilib, uni doimiy yangi holatda saqlaydi.",
  subskills: [
    {
      id: "80.1",
      title: "README",
      description: [
        "README.md — har qanday loyihaning yuzi va birinchi kirish nuqtasi.",
        "",
        "Professional README da nimalar bo'lishi shart: Loyihaning qisqa va aniq maqsadi, talab qilinadigan muhit versiyalari (PHP 8.3, PostgreSQL 16, Redis), loyihani 3 ta buyruq bilan lokal ishga tushirish yo'riqnomasi, testlarni yurgizish buyrug'i, asosiy muhit o'zgaruvchilari haqida havola va loyiha litsenziyasi.",
        "",
        "Eski yoki noto'g'ri README yangi kelgan dasturchining ilk ish kunini kabusga aylantiradi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud Laravel loyihasi uchun mukammal strukturali, barcha o'rnatish qadamlari keltirilgan README.md faylini yozing.",
      acceptanceCriteria: [
        "Yangi dasturchi 15 daqiqada faqat README bo'yicha loyihani ko'tara oladi",
        "Test va linter buyruqlarini aniq ko'rsatadi"
      ],
      prerequisites: ["33.1"]
    },
    {
      id: "80.2",
      title: "Setup Instructions",
      description: [
        "O'rnatish va ishga tushirish yo'riqnomasi — loyihani noldan lokal kompyuterda (Docker yoki mahalliy muhitda) ishga tushirishning qadamma-qadam qo'llanmasi.",
        "",
        "Qadamlar: repozitoriyni klonlash, `.env.example` dan `.env` yaratish, `composer install`, `php artisan key:generate`, Docker konteynerlarini ko'tarish (`docker compose up -d`), migratsiya va seederlarni yurgizish (`php artisan migrate --seed`) va frontend aktivlarini yig'ish (`npm run dev`)."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Docker Compose va Laravel Sail yordamida bitta buyruq bilan to'liq ishga tushuvchi o'rnatish skripti va qo'llanmasini yozing.",
      acceptanceCriteria: [
        "Hech qanday yashirin yoki og'zaki aytiladigan qadamlarsiz to'liq yozilgan",
        "Konteynerlar va ma'lumotlar bazasi urug'lantirilishini (seeding) to'liq avtomatlashtiradi"
      ],
      prerequisites: ["37.13", "80.1"]
    },
    {
      id: "80.3",
      title: "Architecture Documentation",
      description: [
        "Arxitektura hujjatlari — tizim qanday qismlardan iborat ekanligi, modullar chegaralari va ular o'rtasidagi ma'lumotlar oqimining yuqori darajadagi tavsifi.",
        "",
        "C4 modeli (Context, Containers, Components, Code) yondashuvi qo'llaniladi. Nega aynan ushbu arxitekturaviy uslub (masalan, Modul monolit yoki Event-driven) tanlangani, asosiy komponentlarning javobgarlik sohasi va tizimning masshtablash strategiyasi yoritiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Loyihangiz uchun C4 modelining Context va Container darajasidagi arxitektura ta'rifini va diagrammasini tuzing.",
      acceptanceCriteria: [
        "Tizimning barcha tashqi va ichki komponentlarini xaritalaydi",
        "Qatlamlar va ma'lumotlar oqimini aniq asoslaydi"
      ],
      prerequisites: ["61.1"]
    },
    {
      id: "80.4",
      title: "Architecture Decision Records",
      description: [
        "Arxitektura qarorlari jurnali (ADR) — loyihada qabul qilingan muhim arxitektura qarorlarini, ularning sabablari, ko'rib chiqilgan muqobillari va oqibatlarini qisqa hujjatlashtirish formati.",
        "",
        "ADR tuzilishi: Sarlavha (Title), Status (Proposed, Accepted, Deprecated), Kontekst (Context — nima muammo bor edi?), Qaror (Decision — nima tanlandi va nega?), Oqibatlar (Consequences — qanday ijobiy va salbiy tomonlari bor?). Masalan: 'ADR-004: MySQL dan PostgreSQL ga o'tish'."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Loyihada Redis o'rniga RabbitMQ ni xabarlar brokeri sifatida tanlash bo'yicha to'liq bitta ADR hujjati yozing.",
      acceptanceCriteria: [
        "ADR formatiga (Status, Context, Decision, Consequences) qat'iy amal qiladi",
        "Qarorning nafaqat yutuqlarini, balki keltirib chiqaradigan cheklovlarini ham halol yozadi"
      ],
      prerequisites: ["82.12"]
    },
    {
      id: "80.5",
      title: "API Documentation",
      description: [
        "API hujjatlashtirish — barcha tashqi va ichki HTTP interfeyslarining rasmiy ta'rifi.",
        "",
        "OpenAPI / Swagger standarti bo'yicha yuritiladi. Endpointlar, autentifikatsiya usullari, so'rov va javob sxemalari, HTTP status kodlari va xatoliklar misollari to'liq qamrab olinadi. Hujjat avtomatik tarzda kod bilan birga yangilanib borishi ta'minlanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ichki to'lov API si uchun barcha endpointlar va xatolik javoblari keltirilgan OpenAPI spetsifikatsiyasini tayyorlang.",
      acceptanceCriteria: [
        "OpenAPI standarti bo'yicha to'liq hujjat taqdim etadi",
        "Frontend va uchinchi tomon integratsiyasi uchun barcha ma'lumotlarni o'z ichiga oladi"
      ],
      prerequisites: ["75.1", "76.1"]
    },
    {
      id: "80.6",
      title: "Database Schema Documentation",
      description: [
        "Ma'lumotlar bazasi sxemasi hujjatlari — jadvallar, ustunlar, cheklovlar (constraints) va jadvallararo bog'liqliklar (Foreign Keys) tavsifi.",
        "",
        "Entity-Relationship (ER) diagrammalari (PlantUML, Mermaid yoki dbdocs.io) orqali vizuallashtiriladi. Har bir noaniq ustunning biznes ma'nosi, statuslar (enum qiymatlari nima anglatishi) va indekslarning nima maqsadda qo'yilgani hujjatda izohlanadi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihaning 10 ta asosiy jadvali uchun Mermaid formatida ER diagrammasi va ustunlar tavsifini yozing.",
      acceptanceCriteria: [
        "Jadvallararo bog'liqliklar (1:1, 1:N, N:M) to'g'ri aks etadi",
        "Murakkab statuslar va hisob-kitob ustunlarining biznes ma'nosini tushuntiradi"
      ],
      prerequisites: ["14.1"]
    },
    {
      id: "80.7",
      title: "Deployment Instructions",
      description: [
        "Deploy qilish yo'riqnomasi — yangi kod versiyasini Staging va Production serverlariga xavfsiz va nol uzilish bilan chiqarish bosqichlari.",
        "",
        "CI/CD quvuri qanday ishlashi, qanday buyruqlar avtomatik bajarilishi (`config:cache`, `route:cache`, `migrate --force`, `queue:restart`) va nosozlik yuz berganda orqaga qaytarish (Rollback) qanday amalga oshirilishi qadamma-qadam yoziladi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Production muhitida zero-downtime deploy qilish va xatolik bo'lsa 2 daqiqada rollback qilish bo'yicha qo'llanma yozing.",
      acceptanceCriteria: [
        "Barcha ishlab chiqarish buyruqlarini xavfsiz ketma-ketlikda ko'rsatadi",
        "Rollback qilish bo'yicha aniq va sinovdan o'tgan qadamlarni taqdim etadi"
      ],
      prerequisites: ["43.12", "70.25"]
    },
    {
      id: "80.8",
      title: "Environment Variables",
      description: [
        "Muhit o'zgaruvchilari hujjatlari — `.env.example` faylidagi har bir parametrning nima vazifa bajarishini to'liq yoritish.",
        "",
        "Ko'p uchraydigan xato: `.env.example` ga yangi kalit qo'shiladi, lekin uning ma'nosi, standart qiymati va qayerdan olinishi yozilmaydi. Har bir maxfiy kalit (API tokenlar, shlyuzlar) qayerdan olinishi va development muhitida qanday test qiymati qo'yilishi hujjatda aks etishi lozim."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihaning `.env.example` faylidagi har bir o'zgaruvchi uchun uning turi, maqsadi va namunaviy qiymatini tushuntiruvchi jadval tuzing.",
      acceptanceCriteria: [
        "Hech qanday 'sirli' yoki hujjatsiz o'zgaruvchi qolmasligini ta'minlaydi",
        "Ishlab chiqish va ishlab chiqarish qiymatlari farqini tushuntiradi"
      ],
      prerequisites: ["2.10"]
    },
    {
      id: "80.9",
      title: "Operational Runbooks",
      description: [
        "Operatsion runbuklar (Runbooks) — serverlar, navbatlar va ma'lumotlar bazasida muntazam yoki favqulodda takrorlanadigan amallarni bajarish bo'yicha aniq ko'rsatmalar.",
        "",
        "Masalan: 'Bazadan zaxira nusxani qayta tiklash runbuki', 'Tiqilib qolgan SQS navbatini tozalash runbuki', 'SSL sertifikatini qo'lda yangilash', 'Keshni xavfsiz tozalash'. Tungi navbatchilikdagi muhandis o'ylanib o'tirmasdan, runbukdagi buyruqlarni ketma-ket bajaradi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Production bazasida kutilmagan holda CPU 100% ga chiqqanda qilinadigan amallarni o'z ichiga olgan Runbook yozing.",
      acceptanceCriteria: [
        "Favqulodda vaziyatda tezkor harakat qilish uchun aniq buyruqlarni taqdim etadi",
        "Xatolikka o'rin qoldirmaydigan aniq qadamlarni belgilaydi"
      ],
      prerequisites: ["39.15", "58.12"]
    },
    {
      id: "80.10",
      title: "Troubleshooting Guides",
      description: [
        "Nosozliklarni aniqlash va bartaraf etish qo'llanmasi — loyihada eng ko'p uchraydigan xatoliklar va ularning yechimlari to'plami.",
        "",
        "'Nginx 502 Bad Gateway kelsa nima qilish kerak?', 'Redis ulanishida timeout bo'lsa nimani tekshirish lozim?', 'Vazifalar navbatda bajarilmay qolsa qaysi logni ochish kerak?'. Bu qo'llanma muammolarni bartaraf etish vaqtini (MTTR) bir necha soatdan bir necha daqiqaga qisqartiradi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel da eng ko'p uchraydigan 5 ta nosozlik (502, Queue worker hung, DB too many connections, S3 403, CORS) uchun Troubleshooting qo'llanmasi yozing.",
      acceptanceCriteria: [
        "Alomat (symptom), sabab (cause) va yechim (resolution) tuzilmasida yozadi",
        "Muammoni tezkor tashxis qilish uchun diagnostika buyruqlarini ko'rsatadi"
      ],
      prerequisites: ["41.21", "56.1"]
    },
    {
      id: "80.11",
      title: "Sequence Diagrams",
      description: [
        "Ketma-ketlik diagrammalari (Sequence Diagrams) — turli obyektlar, servislar va tashqi tizimlar o'rtasidagi xabarlar almashinuvining vaqt bo'yicha ketma-ketligini ko'rsatuvchi vizual sxema.",
        "",
        "Mermaid yoki PlantUML yordamida to'g'ridan-to'g'ri Markdown ichida yoziladi. Ayniqsa murakkab to'lov jarayonlari (Frontend → Backend → To'lov tizimi → Webhook → Backend → Foydalanuvchi) kabi asinxron oqimlarni tushuntirishda tengi yo'q vositadir."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Uchinchi tomon to'lov tizimi bilan integratsiya jarayonini (redirect, webhook, to'lovni tasdiqlash) Mermaid Sequence Diagram shaklida chizing.",
      acceptanceCriteria: [
        "Ishtirokchilar (Actors, Services, Databases) va xabarlar oqimini aniq ko'rsatadi",
        "Sinxron va asinxron murojaatlarni to'g'ri ifodalaydi"
      ],
      prerequisites: ["24.1", "50.1"]
    },
    {
      id: "80.12",
      title: "Data Flow Diagrams",
      description: [
        "Ma'lumotlar oqimi diagrammalari (Data Flow Diagrams - DFD) — ma'lumotlar tizimga qayerdan kirishi, qaysi jarayonlar orqali qayta ishlanishi, qayerda saqlanishi va qayerga chiqib ketishini ko'rsatuvchi xarita.",
        "",
        "GDPR va xavfsizlik auditi uchun juda muhim: foydalanuvchining shaxsiy ma'lumotlari (PII) qaysi jadvallarga yoziladi, qaysi loglarga tushadi, qaysi tashqi servislarga (Google Analytics, SMS shlyuz) uzatiladi — barchasi ochiq ko'rinadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Foydalanuvchi ro'yxatdan o'tganda ma'lumotlarning DB, Kesh, Navbat va tashqi servislar bo'ylab harakatlanish oqimi diagrammasini chizing.",
      acceptanceCriteria: [
        "Ma'lumotlar omborlari va qayta ishlash jarayonlarini to'g'ri belgilaydi",
        "Nozik ma'lumotlarning xavfsiz harakatlanishini nazorat qiladi"
      ],
      prerequisites: ["51.19"]
    },
    {
      id: "80.13",
      title: "Onboarding Documentation",
      description: [
        "Yangi dasturchilarni ishga kiritish qo'llanmasi — jamoaga yangi qo'shilgan muhandisning birinchi haftasini rejalashtirish.",
        "",
        "Kerakli dasturlar ro'yxati, ruxsatnomalar olish (GitHub, AWS, Jira), loyiha arxitekturasi bilan tanishish, birinchi PR ni yuborish tartibi va jamoaviy kelishuvlar (Code style, branch nomlash). Maqsad: yangi dasturchi 3-kuni o'zining ilk kodini productionga xavfsiz chiqara olishi kerak."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Yangi Middle/Senior dasturchining birinchi 3 kunlik Onboarding rejasini va kerakli havolalar ro'yxatini tuzing.",
      acceptanceCriteria: [
        "Yangi xodimning moslashuv davrini qisqartiradi",
        "Barcha kerakli kirish huquqlari va standartlarni bitta joyda jamlaydi"
      ],
      prerequisites: ["80.1", "83.2"]
    },
    {
      id: "80.14",
      title: "Change Logs",
      description: [
        "O'zgarishlar jurnali (CHANGELOG.md) — har bir yangi relizda nimalar o'zgarganligini inson tushunadigan tilda xronologik tartibda qayd etish.",
        "",
        "Keep a Changelog standarti bo'yicha bo'limlar: `Added` (yangi imkoniyatlar), `Changed` (o'zgartirishlar), `Deprecated` (eskirgan narsalar), `Removed` (o'chirilganlar), `Fixed` (tuzatilgan xatolar), `Security` (xavfsizlik yamoqlari). SemVer (Semantic Versioning) versiyalari bilan bog'lanadi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Oxirgi reliz uchun 'Keep a Changelog' standarti asosida to'liq CHANGELOG.md bo'limini yozing.",
      acceptanceCriteria: [
        "Git commitlarining quruq ro'yxati emas, mazmunli o'zgarishlar jurnalini tuzadi",
        "Standart toifalar (Added, Changed, Fixed, Security) bo'yicha guruhlaydi"
      ],
      prerequisites: ["7.4"]
    },
    {
      id: "80.15",
      title: "Versioning",
      description: [
        "Hujjatlarni versiyalash — dasturiy ta'minotning eski va yangi versiyalari uchun hujjatlarning alohida saqlanishi.",
        "",
        "Agar mijoz API ning 1.2 versiyasida ishlayotgan bo'lsa, u 2.0 versiyaning hujjatini o'qib adashmasligi kerak. Git branchlar yoki Docusaurus/VitePress kabi zamonaviy hujjatlashtirish platformalari orqali ko'p versiyali (multi-version) hujjatlar sayti yuritiladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "VitePress yoki Docusaurus yordamida V1 va V2 versiyalari o'rtasida o'tish imkoniga ega bo'lgan statik hujjat sayti strukturasini sozlang.",
      acceptanceCriteria: [
        "Ko'p versiyali hujjatlar arxitekturasini tushunadi",
        "Mijozlarning o'z versiyasiga mos aniq ma'lumot olishini ta'minlaydi"
      ],
      prerequisites: ["75.10"]
    },
    {
      id: "80.16",
      title: "Documentation Maintenance",
      description: [
        "Hujjatlarni doimiy yangilab borish va eskirishining oldini olish.",
        "",
        "Eski va yolg'on hujjat — hujjatning umuman yo'qligidan ham xavflidir, chunki u odamlarni noto'g'ri yo'ldan ketishiga sabab bo'ladi. Hujjatlarni kod bilan birga bitta repozitoriyda saqlash (Docs-as-Code) va har qanday PR review da 'Hujjat yangilanganmi?' savolini majburiy qo'yish orqali yangilik ta'minlanadi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Jamoada har bir PR bilan birga hujjatni yangilashni rag'batlantiruvchi Code Review shablonini (PR Template) joriy qiling.",
      acceptanceCriteria: [
        "Docs-as-Code tamoyilini amalda qo'llaydi",
        "Hujjatlar eskirib, yolg'on ma'lumotga aylanishining oldini oladi"
      ],
      prerequisites: ["72.1", "75.16"]
    },
    {
      id: "80.17",
      title: "Clear Technical Writing",
      description: [
        "Aniq va ravon texnik yozish mahorati — murakkab texnik g'oyalarni ortiqcha so'zbozliksiz, lo'nda, tushunarli va professional bayon etish.",
        "",
        "Qisqa jumlalar, faol fe'llar (active voice), aniq jadvallar, kod bloklari va vizual diagrammalardan foydalanish. Noaniq so'zlar ('tezda', 'ba'zida', 'yaxshi') o'rniga aniq raqamlar ('50 ms ichida', '99.9% ehtimol bilan') bilan yozish."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Chalkash va uzun yozilgan texnik ko'rsatmani ixcham, punktlarga ajratilgan va professional texnik matnga aylantiring.",
      acceptanceCriteria: [
        "Kognitiv yuklamani kamaytiruvchi o'qilishi oson tuzilma yaratadi",
        "Noaniq jumlalardan qochib, aniq faktlar va ko'rsatmalar beradi"
      ],
      prerequisites: ["80.1"]
    }
  ]
});
