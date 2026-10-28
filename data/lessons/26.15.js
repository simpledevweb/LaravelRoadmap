/* Chuqur dars: 26.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.15", {
  "lesson": [
    "### Papka tuzilmasi",
    "Laravel + Pest uchun odatiy:",
    "- `tests/Unit/` — framework'siz, tez testlar (domen, qiymat obyektlari, hisob-kitob).",
    "- `tests/Feature/` — HTTP, DB, job'lar, buyruqlar.",
    "- `tests/Arch/` yoki `tests/ArchTest.php` — arxitektura qoidalari (26.8).",
    "- `tests/Datasets/` — umumiy dataset'lar (26.4).",
    "- `tests/Fixtures/` — JSON, CSV va boshqa fayl namunalari (25.3).",
    "- `tests/Pest.php` — global konfiguratsiya, `tests/Helpers.php` yoki `tests/Expectations.php` — yordamchilar.",
    "",
    "Katta loyihada Feature ichida domen yoki modul bo'yicha: `tests/Feature/Orders/`, `tests/Feature/Payments/`. Production kod tuzilmasini aks ettirish testni topishni osonlashtiradi.",
    "",
    "### Fayl ichida",
    "- Bitta fayl — bitta tushuncha (endpoint, klass, use case): `tests/Feature/Orders/PlaceOrderTest.php`.",
    "- `describe()` — holatlar guruhi (`describe('validation')`, `describe('authorization')`).",
    "- Muvaffaqiyatli yo'l avval, keyin chegara va xato holatlari.",
    "- Tavsiflar xulq-atvor tilida (26.2).",
    "",
    "### Yordamchi funksiyalar",
    "Takrorlanuvchi Arrange qismlarini yordamchilarga chiqaring, lekin testning muhim tafsilotlarini yashirmang:",
    "- Global: `tests/Pest.php` da `function loginAsAdmin(): User { ... }`.",
    "- Fayl ichida: oddiy funksiya yoki `beforeEach`.",
    "- Factory state'lari ko'pincha eng toza: `Order::factory()->paid()->withItems(3)`.",
    "",
    "### Guruhlar",
    "`->group('payments', 'slow')` yoki fayl darajasida `uses()->group('payments');`. Keyin `--group=payments` (25.15).",
    "",
    "### Nomlash qoidalari",
    "- Fayl nomi `...Test.php` (Pest default'da shu suffiks bilan qidiradi).",
    "- Tavsif: \"it [nima qiladi] [qaysi sharoitda]\".",
    "- Bir xil tavsifli ikki test bitta faylda bo'lmasin.",
    "",
    "### Hajm",
    "Juda katta test fayllari (1000+ qator) — kod ham bo'linishi kerakligi belgisi bo'lishi mumkin. Test fayllarini ham production kod kabi refactoring qiling: takrorlanishni olib tashlang, yordamchilarni ajrating, lekin har test o'zi o'qilishi mumkin bo'lsin."
  ],
  "examples": [
    {
      "title": "Tuzilma",
      "lang": "text",
      "code": [
        "tests/",
        "├── Pest.php",
        "├── Helpers.php",
        "├── ArchTest.php",
        "├── Datasets/",
        "│   └── Phones.php",
        "├── Fixtures/",
        "│   └── webhooks/payment_succeeded.json",
        "├── Unit/",
        "│   └── Domain/MoneyTest.php",
        "└── Feature/",
        "    ├── Orders/",
        "    │   ├── PlaceOrderTest.php",
        "    │   └── CancelOrderTest.php",
        "    └── Payments/",
        "        └── PaymeWebhookTest.php"
      ]
    },
    {
      "title": "Fayl ichida describe bilan",
      "lang": "php",
      "code": [
        "// tests/Feature/Orders/CancelOrderTest.php",
        "uses()->group('orders');",
        "",
        "it('cancels a pending order', function () { /* ... */ });",
        "",
        "describe('authorization', function () {",
        "    it('forbids cancelling another customer order', function () { /* ... */ });",
        "    it('allows support staff to cancel any order', function () { /* ... */ });",
        "});",
        "",
        "describe('state rules', function () {",
        "    it('refuses to cancel a shipped order', function () { /* ... */ });",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Barcha testlarni bitta katta faylda saqlash.",
    "Yordamchilar orqali testning muhim tafsilotlarini yashirish.",
    "Fayl nomida `Test` suffiksini unutish: Pest testni topmaydi.",
    "Unit va Feature testlarni aralashtirib, tez to'plamni sekinlashtirish."
  ]
});
