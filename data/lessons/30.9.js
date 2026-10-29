/* Chuqur dars: 30.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.9", {
  "lesson": [
    "### Qabul mezonlari",
    "Qabul mezonlari (acceptance criteria) — user story \"tayyor\" hisoblanishi uchun bajarilishi kerak bo'lgan **aniq va tekshiriladigan** shartlar. Ular biznes, QA va dasturchi o'rtasida umumiy tushunchani yaratadi va \"nima qilsak tugaydi\" degan savolga javob beradi.",
    "",
    "### Given, When, Then",
    "Eng keng tarqalgan shakl:",
    "- **Given** (berilgan): boshlang'ich holat.",
    "- **When** (qachon): harakat.",
    "- **Then** (unda): kutilgan natija.",
    "",
    "Bu shakl to'g'ridan-to'g'ri testga aylanadi (ATDD, BDD). Pest'da `it()` bloki shu uchta qismni (arrange, act, assert) aks ettiradi.",
    "",
    "### Yaxshi mezon xususiyatlari",
    "- **Kuzatiladigan natija**: ichki tafsilot emas, foydalanuvchi ko'radigan narsa.",
    "- **Chekka holatlar**: bo'sh qiymat, chegara, takroriy harakat.",
    "- **Xato holatlari**: noto'g'ri kirish, ruxsatsizlik, tashqi servis yiqilishi.",
    "- **Ruxsatlar**: kim bajara oladi.",
    "- **Aniq va o'lchanadigan**: \"tez ishlashi kerak\" emas, \"p95 < 300 ms\".",
    "",
    "### Mezonlardan testga",
    "Har mezon kamida bitta testga aylanadi. Mezonlar ro'yxati — test rejasi. Agar mezon testga aylanmasa, u noaniq: uni aniqlashtiring.",
    "",
    "### Uch amigos",
    "Mezonlarni biznes tahlilchi, dasturchi va tester birgalikda yozsa, noaniqliklar ish boshlanishidan oldin ochiladi. Bu keyingi qayta ishlashdan arzonroq.",
    "",
    "### Ortiqcha rasmiyatchilik",
    "Kichik vazifa uchun uzun mezonlar kerak emas. Lekin har vazifaning \"tayyor\" ta'rifi aniq bo'lsin."
  ],
  "examples": [
    {
      "title": "Gherkin ko'rinishida mezon",
      "lang": "gherkin",
      "code": [
        "Scenario: Bepul yetkazib berish",
        "  Given foydalanuvchi savatida 120 000 so'mlik mahsulot bor",
        "  When u yetkazib berishni tanlaydi",
        "  Then yetkazish narxi 0 so'm bo'ladi",
        "",
        "Scenario: Pullik yetkazib berish",
        "  Given foydalanuvchi savatida 50 000 so'mlik mahsulot bor",
        "  When u yetkazib berishni tanlaydi",
        "  Then yetkazish narxi 15 000 so'm bo'ladi"
      ],
      "note": "Har senariy bitta xatti-harakat va bitta natija."
    },
    {
      "title": "Mezondan Pest testiga",
      "lang": "php",
      "code": [
        "it('gives free shipping from 100 000 sum', function () {",
        "    // Given",
        "    $cart = Cart::factory()->withItems(120_000)->for($customer)->create();",
        "",
        "    // When",
        "    $this->actingAs($customer->user)->postJson('/api/cart/shipping', ['method' => 'courier'])",
        "",
        "    // Then",
        "        ->assertOk()",
        "        ->assertJsonPath('data.shipping', 0);",
        "});"
      ],
      "note": "Given, When, Then izohlari testning tuzilishini ko'rsatadi."
    }
  ],
  "pitfalls": [
    "Noaniq mezon (\"tez va qulay bo'lsin\"): tekshirib bo'lmaydi va ixtilof chiqaradi. O'lchanadigan qiling.",
    "Faqat baxtli yo'l mezoni: xato va chekka holatlar yozilmay qoladi.",
    "Mezonlarni testga aylantirmaslik: ular hujjatda qolib, kod bilan sinxron emas.",
    "Mezonlarni dasturchi yolg'iz yozishi: biznes tushunchasi va QA nuqtai nazari yetishmaydi."
  ]
});
