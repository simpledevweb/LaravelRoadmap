/* Chuqur dars: 27.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.2", {
  "lesson": [
    "### Uch qism",
    "Har test uch aniq bosqichdan iborat (25.1):",
    "1. **Arrange** — holatni tayyorlash: SUT va uning bog'liqliklari, kirish ma'lumotlari.",
    "2. **Act** — tekshirilayotgan **bitta** amalni bajarish.",
    "3. **Assert** — natijani tekshirish.",
    "",
    "BDD'da xuddi shu: **Given** (berilgan) — **When** (qachonki) — **Then** (unda).",
    "",
    "### Qoidalar",
    "- **Bitta Act.** Testda ikki amal bo'lsa (\"buyurtma yarat, keyin bekor qil va tekshir\"), ehtimol ikki test kerak. Istisno: oldingi amal Arrange'ning bir qismi bo'lsa.",
    "- **Act qisqa** — ideal holda bitta qator. Uzun bo'lsa, SUT API'si noqulay bo'lishi mumkin.",
    "- **Assert'da mantiq yo'q:** `if`, sikl yoki hisob-kitob kutilgan qiymatni hisoblash uchun emas. Kutilgan qiymat aniq yozilsin (`990_000`, `$total * 0.9` emas — aks holda test kodni takrorlaydi va xatosini ham).",
    "- **Arrange katta bo'lsa** — yordamchilar, factory, builder (25.3). Lekin testga muhim qiymatlar ko'rinib tursin.",
    "- **Bo'sh qatorlar** bilan qismlarni ajrating. Izohlar (`// Arrange`) faqat murakkab testlarda.",
    "",
    "### Bir nechta assert",
    "Bitta natijaning turli tomonlari (yangi buyurtmaning statusi, summasi va itemlari soni) bitta testda normal. Mustaqil xulq-atvorlar (\"chegirma qo'llanadi\" va \"email yuboriladi\") — alohida testlar.",
    "",
    "### Assert'siz test",
    "Hech narsa tekshirmaydigan test (faqat exception yo'qligi) kamdan-kam foydali. Agar maqsad shu bo'lsa, aniq yozing: `expect(fn () => $sut->run())->not->toThrow(Exception::class)`."
  ],
  "examples": [
    {
      "title": "Toza AAA va xato: Assert'da mantiq",
      "lang": "php",
      "code": [
        "// TO'G'RI",
        "it('applies 12% VAT', function () {",
        "    $calculator = new VatCalculator(rate: 12);",
        "",
        "    $vat = $calculator->for(150_000);",
        "",
        "    expect($vat)->toBe(18_000);",
        "});",
        "",
        "// XATO: kutilgan qiymat kodni takrorlaydi va xatosini ham",
        "it('applies VAT', function () {",
        "    $calculator = new VatCalculator(rate: 12);",
        "    expect($calculator->for(150_000))->toBe((int) (150_000 * 12 / 100));",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Bitta testda bir nechta Act: yiqilganda qaysi amal buzilgani noaniq.",
    "Kutilgan qiymatni production formulasi bilan hisoblash.",
    "Arrange qismida testga muhim qiymatlarni yordamchi ichiga yashirish.",
    "Assert qismida `if` yoki sikl."
  ]
});
