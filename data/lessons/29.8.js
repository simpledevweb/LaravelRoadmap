/* Chuqur dars: 29.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.8", {
  "lesson": [
    "### JSON javobni tekshirish",
    "API endpoint'larida asosiy tekshiruv — JSON mazmuni. Laravel buning uchun bir necha daraja beradi: qisman moslikdan to'liq moslikkacha.",
    "",
    "### Asosiy metodlar",
    "- `assertJson([...])`: berilgan qismlar mavjud (qolgan maydonlar bo'lishi mumkin). Eng ko'p ishlatiladigan.",
    "- `assertExactJson([...])`: javob **aynan** shunday. Mo'rt, kam ishlating.",
    "- `assertJsonPath('data.items.0.qty', 2)`: aniq yo'ldagi qiymat.",
    "- `assertJsonStructure([...])`: tuzilma (kalitlar) tekshiriladi, qiymat emas. `'*'` massiv elementlari uchun.",
    "- `assertJsonCount(3, 'data')`: massiv uzunligi.",
    "- `assertJsonMissing([...])`, `assertJsonMissingPath('data.password')`: ma'lum maydon **yo'q**.",
    "",
    "### Fluent API",
    "`assertJson(fn (AssertableJson $json) => ...)` ichida `where`, `has`, `missing`, `count`, `etc()` ishlatiladi. Bu yondashuv qat'iyroq: standart holatda tekshirilmagan maydon qolsa test yiqiladi (agar oxirida `->etc()` chaqirilmasa). Bu javobga tasodifan qo'shilgan maydonni ushlaydi.",
    "",
    "### Sezgir maydonlar",
    "API ko'pincha ortiqcha maydon oshkor qiladi: parol xeshi, ichki flag, boshqa foydalanuvchi email'i, `deleted_at`. `assertJsonMissingPath` yoki fluent `missing()` bilan sezgir maydonlar **yo'qligini** alohida tekshiring. Bu API Resource ishlatilishining ham yaxshi nazorati.",
    "",
    "### Shartnoma va qiymat",
    "Tuzilmani (`assertJsonStructure`) shartnoma sifatida, muhim qiymatlarni esa (`assertJsonPath`) alohida tekshiring. Har bir kichik maydonni qattiq yozish testni mo'rt qiladi. Ortiqcha maydonlar qo'shilganda (orqaga mos o'zgarish) test yiqilmasligi kerak."
  ],
  "examples": [
    {
      "title": "Fluent API bilan",
      "lang": "php",
      "code": [
        "it('returns a paid order without internal fields', function () {",
        "    $order = Order::factory()->paid()->create();",
        "",
        "    $this->actingAs($order->customer->user)",
        "        ->getJson(\"/api/orders/{$order->id}\")",
        "        ->assertOk()",
        "        ->assertJson(fn (AssertableJson $json) => $json",
        "            ->has('data', fn ($d) => $d",
        "                ->where('id', $order->id)",
        "                ->where('status', 'paid')",
        "                ->missing('internal_note')",
        "                ->etc())",
        "            ->has('meta'));",
        "});"
      ],
      "note": "internal_note chiqmasligi alohida tasdiqlanadi."
    },
    {
      "title": "Tuzilma va massiv",
      "lang": "php",
      "code": [
        "$this->getJson('/api/orders')",
        "    ->assertOk()",
        "    ->assertJsonStructure([",
        "        'data' => ['*' => ['id', 'status', 'items' => ['*' => ['sku', 'qty']]]],",
        "        'meta' => ['current_page', 'total'],",
        "    ])",
        "    ->assertJsonMissingPath('data.0.customer.password');"
      ],
      "note": "Tuzilma shartnoma sifatida, sezgir maydon esa yo'qligi bilan tekshiriladi."
    }
  ],
  "pitfalls": [
    "`assertExactJson` ni ko'p ishlatish: javobga yangi maydon qo'shilishi bilan ko'plab testlar sinadi.",
    "Sezgir maydonlar yo'qligini tekshirmaslik: parol xeshi yoki ichki ma'lumot tasodifan oshkor bo'ladi.",
    "Faqat tuzilmani tekshirish: kalitlar bor, lekin qiymatlar noto'g'ri bo'lishi mumkin.",
    "Fluent API'da `etc()` ni unutish yoki keraksiz qo'yish: birinchisida testlar mo'rt, ikkinchisida ortiqcha maydon aniqlanmaydi."
  ]
});
