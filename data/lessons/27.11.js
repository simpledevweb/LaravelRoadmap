/* Chuqur dars: 27.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.11", {
  "lesson": [
    "### Over-mocking belgilari",
    "- Test asosan `shouldReceive` va `expects` qatorlaridan iborat, haqiqiy natija kam tekshiriladi.",
    "- Har hamkor klass mock qilingan, jumladan qiymat obyektlari va oddiy domen klasslari.",
    "- Mock mock qaytaradi (`$repo->find()->getCustomer()->getAddress()`).",
    "- **Refactoring** (xulq-atvor o'zgarmagan, faqat ichki tuzilma) ko'p testni sindiradi.",
    "- Test aslida kodni qatorma-qator takrorlaydi: \"avval A chaqiriladi, keyin B, keyin C\".",
    "- Testlar yashil, lekin production'da integratsiya buziladi: mock'lar haqiqiy xulq-atvorni noto'g'ri simulyatsiya qilgan.",
    "",
    "### Nega bu zararli",
    "Mock bilan test \"bu kod qanday **yozilgan**\" ni tekshiradi, \"nima **qiladi**\" ni emas. Natijada:",
    "- refactoring qimmat va xavfli (testlar yordam bermaydi, to'sqinlik qiladi),",
    "- yolg'on ishonch (mock noto'g'ri bo'lsa, xato ko'rinmaydi),",
    "- testlarni o'qish va saqlash qiyin.",
    "",
    "### Qoidalar",
    "1. **Faqat chegaralarni almashtiring** (27.6): tashqi servislar, vaqt, tasodifiylik, sekin I/O.",
    "2. **Domen obyektlari haqiqiy:** `Money`, `Order`, `Coupon`, policy'lar.",
    "3. **So'rovlar (queries) uchun stub, buyruqlar (commands) uchun mock/spy** (25.6). Kurs olish — stub va chaqiruvlar soni muhim emas. Email yuborish — tekshirish kerak.",
    "4. **Holatni tekshiring, o'zaro ta'sirni emas** (state vs behavior verification), iloji bo'lsa.",
    "5. **Fake'lar** (xotiradagi repository, `FakePaymentGateway`) ko'pincha mock'lardan yaxshiroq: qayta ishlatiladi va haqiqiy xulq-atvorga yaqin.",
    "6. Mock qilish qiyin bo'lsa — dizayn signali: bog'liqliklar juda ko'p yoki interfeys noqulay.",
    "",
    "### Integratsiya testi muqobil",
    "Ko'p komponentli oqimni (servis + repository + DB) mock'lar bilan unit test qilish o'rniga, haqiqiy DB bilan integratsiya testi (25.12) ko'pincha soddaroq va ishonchliroq (27.15)."
  ],
  "examples": [
    {
      "title": "Over-mocked va yaxshiroq versiya",
      "lang": "php",
      "code": [
        "// OVER-MOCKED: implementatsiyani takrorlaydi",
        "it('places order', function () {",
        "    $repo = Mockery::mock(OrderRepository::class);",
        "    $pricing = Mockery::mock(PricingService::class);",
        "    $money = Mockery::mock(Money::class);",
        "    $pricing->expects('total')->andReturn($money);",
        "    $money->expects('isPositive')->andReturn(true);",
        "    $repo->expects('save')->once();",
        "",
        "    (new PlaceOrder($repo, $pricing))->handle($cart);",
        "});",
        "",
        "// YAXSHIROQ: haqiqiy domen, fake repository, natija tekshiriladi",
        "it('places order with calculated total', function () {",
        "    $repo = new InMemoryOrderRepository();",
        "    $cart = Carts::with(['A-1' => [2, 50_000]]);",
        "",
        "    $order = (new PlaceOrder($repo, new PricingService()))->handle($cart);",
        "",
        "    expect($order->total())->toEqual(Money::uzs(100_000))",
        "        ->and($repo->find($order->id))->not->toBeNull();",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Qiymat obyektlarini mock qilish.",
    "So'rov metodlari uchun aniq chaqiruvlar sonini talab qilish.",
    "Test faqat mock kutishlaridan iborat va natija tekshirilmaydi.",
    "Refactoring testlarni sindirganda, testlarni emas, dizaynni ayblash."
  ]
});
