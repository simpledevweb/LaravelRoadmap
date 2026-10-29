/* Chuqur dars: 29.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.7", {
  "lesson": [
    "### Nima uchun DB tekshiruvi kerak",
    "Yozuvchi endpoint'da (POST, PUT, DELETE) javob to'g'ri bo'lishi ma'lumot to'g'ri saqlanganini anglatmaydi. Controller `201` qaytarib, lekin noto'g'ri qiymat yozgan, ba'zi maydonni yozmagan yoki ikki marta yozgan bo'lishi mumkin. Shuning uchun feature testdan keyin DB holatini tekshirish majburiy.",
    "",
    "### Asosiy assertion'lar",
    "- `assertDatabaseHas('orders', [...])`: berilgan maydonlarga mos qator bor.",
    "- `assertDatabaseMissing('orders', [...])`: bunday qator yo'q (o'chirish testlari uchun).",
    "- `assertDatabaseCount('order_items', 2)`: jadvaldagi qatorlar soni.",
    "- `assertModelExists($model)`, `assertModelMissing($model)`: model bo'yicha.",
    "- `assertSoftDeleted($model)`, `assertNotSoftDeleted($model)`: soft delete holati.",
    "- Muqobil: `expect($order->fresh()->status)->toBe('paid')`: model orqali tekshirish.",
    "",
    "### Cast qilingan qiymatlar",
    "`assertDatabaseHas` DB'dagi **xom** qiymatni tekshiradi. Agar maydon enum, JSON yoki shifrlangan bo'lsa, xom qiymatni bering yoki testni model orqali yozing. Aks holda test noto'g'ri sabab bilan yiqiladi.",
    "",
    "### Ortiqcha yozuvlar",
    "Faqat \"kerakli qator bor\" ni emas, \"ortiqcha qator yo'q\" ni ham tekshiring (`assertDatabaseCount`). Ikki marta bosilgan tugma ikki buyurtma yaratib qo'ygan bo'lsa, `assertDatabaseHas` buni sezmaydi.",
    "",
    "### Yon ta'sirlar",
    "Yozuvchi endpoint ko'pincha bir nechta jadvalga yozadi: buyurtma, uning qatorlari, audit log, outbox. Hammasini tekshirmaslik shart emas, lekin biznes uchun muhimlarini tekshiring. Tranzaksiya ichida xato bo'lsa, **hech narsa** saqlanmaganini ham sinang."
  ],
  "examples": [
    {
      "title": "Yozuv va ortiqcha yozuv",
      "lang": "php",
      "code": [
        "it('creates the order with its items', function () {",
        "    $this->actingAs($user)->postJson('/api/orders', $payload)->assertCreated();",
        "",
        "    $this->assertDatabaseHas('orders', ['customer_id' => $customer->id, 'status' => 'pending']);",
        "    $this->assertDatabaseCount('orders', 1);",
        "    $this->assertDatabaseCount('order_items', 2);",
        "});"
      ],
      "note": "Soni ham tekshirilgani uchun takroriy yozuv ushlanadi."
    },
    {
      "title": "Xatoda hech narsa saqlanmaydi",
      "lang": "php",
      "code": [
        "it('rolls back everything when stock is insufficient', function () {",
        "    $product = Product::factory()->create(['stock' => 1]);",
        "",
        "    $this->actingAs($user)",
        "        ->postJson('/api/orders', ['items' => [['product_id' => $product->id, 'qty' => 5]]])",
        "        ->assertUnprocessable();",
        "",
        "    $this->assertDatabaseCount('orders', 0);",
        "    $this->assertDatabaseHas('products', ['id' => $product->id, 'stock' => 1]);",
        "});"
      ],
      "note": "Xato yo'lida tranzaksiya to'liq bekor qilinishi tekshiriladi."
    }
  ],
  "pitfalls": [
    "Faqat javobni tekshirib, DB'ni tekshirmaslik: noto'g'ri saqlangan ma'lumot sezilmaydi.",
    "Cast qilingan maydonni xom qiymat bilan solishtirmaslik: enum yoki JSON bilan test noto'g'ri yiqiladi.",
    "Ortiqcha qator yo'qligini tekshirmaslik: takroriy yozuv xatosi o'tib ketadi.",
    "Xato yo'lida DB holatini tekshirmaslik: yarim saqlangan ma'lumot qolishi mumkin."
  ]
});
