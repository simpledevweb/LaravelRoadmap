/* Chuqur dars: 25.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.8", {
  "lesson": [
    "### Nega exception'larni test qilish",
    "Xato yo'llari — ko'pincha eng kam test qilingan va eng ko'p muammoli qism. \"Balans yetarli bo'lmasa nima bo'ladi?\", \"Noto'g'ri formatdagi fayl yuklansa?\", \"Tashqi API ishlamasa?\" — bu stsenariylar foydalanuvchi uchun muvaffaqiyatli yo'l kabi muhim.",
    "",
    "### PHPUnit usullari",
    "- `$this->expectException(InsufficientBalance::class)` — **Act qismidan oldin** chaqiriladi. Keyingi kod shu exception'ni tashlashi kerak, aks holda test yiqiladi.",
    "- `$this->expectExceptionMessage('yetarli emas')` — xabar shu satrni **o'z ichiga oladi**.",
    "- `$this->expectExceptionMessageMatches('/^Balans .* yetarli emas$/')`.",
    "- `$this->expectExceptionCode(422)`.",
    "- `$this->expectExceptionObject($exception)` — klass, xabar va kod birga.",
    "",
    "Muhim: `expectException` dan keyingi kod exception tashlangan joyda **to'xtaydi**. Undan keyingi assertion'lar bajarilmaydi. Exception'dan keyingi holatni tekshirish kerak bo'lsa (masalan, \"DB'da hech narsa o'zgarmadi\"), `try/catch` ishlating.",
    "",
    "### try/catch naqshi",
    "Exception obyektining xususiyatlarini (domen ma'lumotlari) yoki keyingi holatni tekshirish uchun:",
    "`try { ...; $this->fail('Exception kutilgan edi'); } catch (InsufficientBalance $e) { $this->assertSame(50_000, $e->shortfall); }`. `$this->fail()` exception tashlanmasa, testni yiqitadi.",
    "",
    "### Aniq exception turlari",
    "Test qilish oson bo'lishi uchun kodda **aniq domen exception'lari** ishlating: `InsufficientBalance`, `OutOfStock`, `OrderNotCancellable`. Umumiy `Exception` yoki `RuntimeException` ni test qilish — boshqa joydan kelgan kutilmagan xato ham testni o'tkazib yuboradi.",
    "",
    "### Laravel'da HTTP darajasida",
    "Feature testlarda exception'lar HTTP javobiga aylanadi. Odatda status va xato formatini tekshirasiz: `->assertUnprocessable()->assertJsonPath('code', 'insufficient_balance')`.",
    "",
    "- `$this->withoutExceptionHandling()` — exception javobga aylantirilmay, to'g'ridan-to'g'ri testga chiqadi. Debug uchun foydali (500 javobining haqiqiy sababini ko'rish), shuningdek `expectException` bilan controller ichidagi exception'ni tekshirish uchun.",
    "- Laravel 11+: `Exceptions::fake()` va `Exceptions::assertReported(InsufficientBalance::class)` — exception **report** qilinganini (Sentry'ga ketganini) tekshirish.",
    "",
    "### Validatsiya exception'lari",
    "`ValidationException` uchun: HTTP'da `assertJsonValidationErrors(['email'])`, kodda `try/catch` va `$e->errors()`."
  ],
  "examples": [
    {
      "title": "expectException va try/catch",
      "lang": "php",
      "code": [
        "public function test_rejects_withdrawal_above_balance(): void",
        "{",
        "    $wallet = new Wallet(balance: 100_000);",
        "",
        "    $this->expectException(InsufficientBalance::class);",
        "    $this->expectExceptionMessage('yetarli emas');",
        "",
        "    $wallet->withdraw(150_000);",
        "}",
        "",
        "public function test_failed_withdrawal_keeps_balance_and_reports_shortfall(): void",
        "{",
        "    $wallet = new Wallet(balance: 100_000);",
        "",
        "    try {",
        "        $wallet->withdraw(150_000);",
        "        $this->fail('InsufficientBalance kutilgan edi');",
        "    } catch (InsufficientBalance $e) {",
        "        $this->assertSame(50_000, $e->shortfall);",
        "    }",
        "",
        "    $this->assertSame(100_000, $wallet->balance());   // holat o'zgarmagan",
        "}"
      ]
    },
    {
      "title": "Laravel: HTTP va report qilish",
      "lang": "php",
      "code": [
        "public function test_gateway_outage_returns_503_and_reports(): void",
        "{",
        "    Exceptions::fake();",
        "    Http::fake(['gateway.example.uz/*' => Http::response(null, 503)]);",
        "",
        "    $order = Order::factory()->create();",
        "",
        "    $this->actingAs($order->customer->user)",
        "        ->postJson(\"/api/v1/orders/{$order->id}/pay\")",
        "        ->assertServiceUnavailable();",
        "",
        "    Exceptions::assertReported(GatewayUnavailable::class);",
        "}"
      ],
      "note": "`Exceptions::fake()` Laravel 11.x da qo'shilgan."
    }
  ],
  "pitfalls": [
    "`expectException` ni Act'dan keyin chaqirish: exception allaqachon tashlangan va test yiqiladi.",
    "`expectException` dan keyin holatni tekshiruvchi assertion'lar yozish: ular hech qachon bajarilmaydi.",
    "Umumiy `Exception::class` ni kutish: kutilmagan xatolar ham testni o'tkazadi.",
    "Faqat muvaffaqiyatli yo'lni test qilish."
  ]
});
