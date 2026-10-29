/* Chuqur dars: 28.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.5", {
  "lesson": [
    "### Tashqi API testlashning to'rt qatlami",
    "Tashqi API (to'lov, SMS, xarita, CRM) sizning boshqaruvingizda emas: sekin, pullik, beqaror yoki cheklangan bo'lishi mumkin. Shuning uchun testlash qatlamlarga bo'linadi:",
    "1. **Fake bilan unit/feature test** (`Http::fake()`): so'rov formati, sarlavhalar, javobni qayta ishlash. Tez, har commit'da ishlaydi.",
    "2. **Sandbox bilan integratsion test**: provayderning test muhitiga haqiqiy so'rov. Kam sonli, alohida guruhda, rejali ishga tushiriladi.",
    "3. **Contract test**: provayder javob formati o'zgarmaganini tekshiradi (maydonlar, tiplar). Pact kabi vositalar yoki oddiy schema tekshiruvi.",
    "4. **Record/replay (VCR)**: haqiqiy javoblar bir marta yoziladi va keyin qayta ijro qilinadi. Tez, lekin yozuv eskirib qolishi mumkin.",
    "",
    "### Xato holatlarini fake qiling",
    "Baxtli yo'l kamdan-kam muammo beradi. Haqiqiy hodisalar: timeout, 500, 503, 429 (rate limit), noto'g'ri yoki bo'sh JSON, kutilmagan maydon, juda sekin javob. `Http::fake()` bilan bularni osongina simulyatsiya qilasiz, `Http::sequence()` esa \"avval 503, keyin 200\" kabi retry stsenariylariga imkon beradi. Adapter har holatda aniq xatti-harakat qilishi kerak: qayta urinish, yumshoq xato, log, domen exception.",
    "",
    "### Adapter chegarasi",
    "Tashqi API bilan faqat bitta adapter klassi gaplashsin. Boshqa kod uning domen tilidagi interfeysini ishlatadi (`PaymentGateway::charge()`), HTTP tafsilotlarini bilmaydi. Shunda fake qilish va almashtirish oson.",
    "",
    "### Sandbox testlarini boshqarish",
    "Sandbox testlari sekin va tarmoqqa bog'liq, shuning uchun ularni `->group('sandbox')` bilan belgilab, har commit'da emas, kechasi yoki qo'lda ishga tushiring. Kalitlar CI secret'larida saqlanadi. Ular yiqilsa, ko'pincha provayder tomonida o'zgarish bor, shuning uchun bu signalni jiddiy oling.",
    "",
    "### Idempotentlik",
    "To'lov kabi operatsiyalarda qayta urinish ikki marta yechishga olib kelmasligi kerak. Adapter idempotency key yuborayotganini va retry'da bir xil key ishlatilishini testlang."
  ],
  "examples": [
    {
      "title": "Retry stsenariysi",
      "lang": "php",
      "code": [
        "it('retries once after a 503 and succeeds', function () {",
        "    Http::fake([",
        "        'api.provider.uz/*' => Http::sequence()",
        "            ->push(status: 503)",
        "            ->push(['status' => 'ok'], 200),",
        "    ]);",
        "",
        "    expect(app(ProviderClient::class)->ping())->toBeTrue();",
        "",
        "    Http::assertSentCount(2);",
        "});"
      ],
      "note": "Adapter `Http::retry(...)` ishlatsa, ikkinchi urinish muvaffaqiyatli bo'ladi."
    },
    {
      "title": "Xato javobini domen xatosiga aylantirish",
      "lang": "php",
      "code": [
        "it('maps a 429 response to a rate limit exception', function () {",
        "    Http::fake([",
        "        'api.provider.uz/*' => Http::response(['error' => 'too_many'], 429, ['Retry-After' => '30']),",
        "    ]);",
        "",
        "    expect(fn () => app(ProviderClient::class)->send($message))",
        "        ->toThrow(ProviderRateLimited::class);",
        "});",
        "",
        "it('sends the idempotency key on every attempt', function () {",
        "    Http::fake(['*' => Http::response(['id' => 'p1'], 200)]);",
        "",
        "    app(PaymeGateway::class)->charge($order);",
        "",
        "    Http::assertSent(fn ($r) => $r->hasHeader('X-Idempotency-Key', $order->idempotencyKey()));",
        "});"
      ],
      "note": "HTTP xatosi domen exception'ga tarjima qilinsa, qolgan kod provayderga bog'liq bo'lmaydi."
    }
  ],
  "pitfalls": [
    "Faqat baxtli yo'lni fake qilish: timeout va 5xx productionda birinchi marta ko'rinadi.",
    "Har commit'da haqiqiy sandbox'ga so'rov yuborish: testlar sekin va beqaror bo'lib, sandbox ham cheklovga tushadi.",
    "Eskirgan VCR yozuvlari: provayder formatini o'zgartirgan, test esa eski yozuv bilan yashil qolaveradi. Yozuvlarni muntazam yangilang yoki contract test qo'shing.",
    "HTTP chaqiruvlarini kod bo'ylab sochib yuborish: fake qilish va retry siyosatini o'zgartirish qiyinlashadi."
  ]
});
