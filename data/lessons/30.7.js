/* Chuqur dars: 30.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.7", {
  "lesson": [
    "### Outside-In TDD",
    "Outside-In (London maktabi yoki \"mockist\" uslub) tashqi qatlamdan, ya'ni acceptance yoki feature testdan boshlab, ichkariga qarab boradi. Har qatlamda hali mavjud bo'lmagan hamkorlar **mock** qilinadi va shu orqali ularning interfeysi \"kashf qilinadi\".",
    "",
    "### Qanday ishlaydi",
    "1. **Acceptance test** yozing (qizil): foydalanuvchi nuqtai nazaridan xatti-harakat.",
    "2. Eng tashqi sinf (controller) yozing. U hali yo'q `PlaceOrder` ga murojaat qiladi. `PlaceOrder`ni mock qiling va controller xatti-harakatini testlang. Shu bilan `PlaceOrder`ning interfeysi aniqlandi.",
    "3. Endi `PlaceOrder` ni TDD bilan quring. U hali yo'q `Inventory` ga muhtoj. Uni mock qiling.",
    "4. Har hamkor navbat bilan amalga oshiriladi, oxirida tashqi acceptance test yashil bo'ladi.",
    "",
    "### Double loop",
    "Ikki sikl bir vaqtda ishlaydi: **tashqi** acceptance sikli (uzoq, qizil turadi) va **ichki** unit sikllari (qisqa). Ichki sikllar tashqi testni yashilga olib boradi.",
    "",
    "### Afzalliklari",
    "- Faqat **kerakli** kod yoziladi: har sinf haqiqiy iste'molchi ehtiyojidan kelib chiqadi.",
    "- Interfeyslar iste'molchi nuqtai nazaridan loyihalanadi, shuning uchun qulay bo'ladi.",
    "- Mas'uliyatlar tabiiy ajraladi.",
    "",
    "### Xavflari",
    "- **Ko'p mock**: testlar implementatsiyaga bog'lanadi (qaysi hamkor qaysi tartibda chaqirilishi).",
    "- Refactoring paytida ichki tuzilma o'zgarsa, ko'p testlar sinadi, garchi xatti-harakat o'zgarmagan bo'lsa ham.",
    "- Mock'lar haqiqiy hamkor bilan integratsiyani yashiradi: integratsion testlar bilan to'ldirish kerak.",
    "",
    "### Qachon tanlash",
    "Talab noaniq, ichki tuzilma hali ma'lum bo'lmagan yangi xususiyat uchun foydali. Mock'larni minimal saqlang va ularni **o'zingiz boshqaradigan interfeyslarga** qo'llang."
  ],
  "examples": [
    {
      "title": "Outside-in oqimi",
      "lang": "text",
      "code": [
        "Acceptance test (qizil)",
        "  -> Controller  (mock: PlaceOrder)          interfeys kashf qilindi",
        "  -> PlaceOrder  (mock: Inventory)           interfeys kashf qilindi",
        "  -> Inventory   (haqiqiy implementatsiya)",
        "  -> ... -> Acceptance test yashil"
      ],
      "note": "Har qatlam o'z hamkorining interfeysini aniqlaydi."
    },
    {
      "title": "Controller testi, hamkor mock",
      "lang": "php",
      "code": [
        "it('delegates order placement to the PlaceOrder action', function () {",
        "    $action = Mockery::mock(PlaceOrder::class);",
        "    $action->shouldReceive('handle')->once()",
        "        ->with(Mockery::on(fn ($c) => $c->is($customer)), [['sku' => 'A1', 'qty' => 2]])",
        "        ->andReturn(Order::factory()->make(['id' => 42]));",
        "    $this->app->instance(PlaceOrder::class, $action);",
        "",
        "    $this->actingAs($customer->user)",
        "        ->postJson('/api/orders', ['items' => [['sku' => 'A1', 'qty' => 2]]])",
        "        ->assertCreated()",
        "        ->assertJsonPath('data.id', 42);",
        "});"
      ],
      "note": "Controller PlaceOrder'ning interfeysini belgilab berdi, PlaceOrder keyingi sikl."
    }
  ],
  "pitfalls": [
    "Hamma hamkorni mock qilish: testlar implementatsiyaga bog'lanib, refactoring'da keraksiz sinadi.",
    "Faqat mock'lar bilan ishonch hosil qilish: haqiqiy hamkorlar bilan integratsiya sinalmay qoladi.",
    "Tashqi acceptance testni yashilga o'tkazmasdan unit sikllarda cho'kish: tashqi maqsad unutiladi.",
    "Uchinchi tomon kutubxona klasslarini mock qilish: ular emas, o'zingizning interfeysingiz mock qilinadi."
  ]
});
