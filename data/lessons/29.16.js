/* Chuqur dars: 29.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.16", {
  "lesson": [
    "### Biznes stsenariy testi",
    "Alohida endpoint testlari har bir qismni sinaydi, lekin ular **orasidagi** bog'lanishni ko'rmaydi. Biznes stsenariy testi bir nechta endpoint va jarayonni bitta oqimda birlashtiradi: ro'yxatdan o'tish, savatga qo'shish, buyurtma, to'lov webhook'i, hisob-faktura, xat. Bunday test \"tizim biznes uchun ishlaydimi\" savoliga javob beradi.",
    "",
    "### Nima uchun kerak",
    "Har bir qism alohida yashil bo'lib, birgalikda ishlamasligi mumkin: bitta endpoint boshqasi kutadigan formatni o'zgartirgan, holat mashinasi noto'g'ri o'tadi, webhook buyurtmani topmaydi. Faqat butun oqim buni ko'rsatadi.",
    "",
    "### Qanday yozish kerak",
    "- **Kam sonli**: eng muhim \"happy path\"lar (sotuv, ro'yxatdan o'tish) va asosiy muvaffaqiyatsizlik yo'llari (to'lov rad etildi). Hammasini bu daraja bilan qoplamang: u sekin va qimmat.",
    "- **O'qiladigan**: biznes tilidagi yordamchi qadamlar (`registerCustomer()`, `placeOrder()`, `receivePaymentWebhook()`). Test hikoya kabi o'qilsin.",
    "- **Barqaror**: vaqtni, tashqi servislarni (`Http::fake`), navbatni (`Queue::fake` yoki sync) nazorat qiling. Tasodifiy yiqilish bunday testlarga ishonchni tez yo'qotadi.",
    "- **Biznes natijasiga qarasin**: oraliq texnik tafsilotga emas, \"buyurtma to'landi, mijozga xat ketdi, ombor kamaydi\" kabi natijaga.",
    "",
    "### Yordamchi qadamlar",
    "Stsenariy yordamchilarini umumiy joyga (`tests/Support`) ko'chiring: ular bir nechta testda qayta ishlatiladi. Har yordamchi o'z ichida kerakli assertion'ni (masalan, `201`) bajarsin, shunda test oqimi yiqilgan joyni aniq ko'rsatadi.",
    "",
    "### Brauzer E2E bilan farqi",
    "Bu testlar HTTP darajasida ishlaydi va brauzersiz tez. Interfeys bilan to'liq tekshirish (JS, formalar) kerak bo'lsa, Laravel Dusk yoki Playwright ishlatiladi. U sekinroq, shuning uchun faqat eng muhim foydalanuvchi yo'llari uchun."
  ],
  "examples": [
    {
      "title": "To'liq xarid oqimi",
      "lang": "php",
      "code": [
        "it('completes the purchase flow', function () {",
        "    Mail::fake();",
        "",
        "    $customer = registerCustomer();",
        "    $order = placeOrder($customer, items: [['sku' => 'A1', 'qty' => 2]]);",
        "",
        "    receivePaymentWebhook($order, amount: $order->total);",
        "",
        "    expect($order->fresh()->status)->toBe(OrderStatus::Paid);",
        "    expect(Product::whereSku('A1')->first()->stock)->toBe(8);",
        "    Mail::assertQueued(InvoiceMail::class, fn ($m) => $m->hasTo($customer->email));",
        "});"
      ],
      "note": "Oqim biznes tilida o'qiladi va natijaga qaraydi."
    },
    {
      "title": "Stsenariy yordamchilari",
      "lang": "php",
      "code": [
        "// tests/Support/Scenarios.php",
        "function registerCustomer(): User",
        "{",
        "    test()->postJson('/api/register', ['email' => fake()->safeEmail(), 'password' => 'secret-pass'])->assertCreated();",
        "    return User::latest('id')->first();",
        "}",
        "",
        "function placeOrder(User $customer, array $items): Order",
        "{",
        "    test()->actingAs($customer)->postJson('/api/orders', ['items' => $items])->assertCreated();",
        "    return Order::latest('id')->first();",
        "}"
      ],
      "note": "Har qadam o'z assertion'ini bajaradi, shuning uchun yiqilgan joy aniq ko'rinadi."
    }
  ],
  "pitfalls": [
    "Har narsani stsenariy testi bilan qoplash: to'plam sekin va mo'rt bo'lib qoladi. Faqat muhim yo'llar uchun.",
    "Yordamchi qadamlarda assertion yo'qligi: oqim o'rtada buzilsa, yiqilish keyingi qadamda va tushunarsiz xabar bilan chiqadi.",
    "Tashqi servis va vaqtni nazorat qilmaslik: testlar tasodifan yiqiladi va ishonch yo'qoladi.",
    "Texnik tafsilotga bog'lanish: oraliq qadamlarning ichki tuzilmasiga tayanish testni refaktoringda mo'rt qiladi."
  ]
});
