/* Chuqur dars: 26.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.12", {
  "lesson": [
    "### Pest'da mocking",
    "Pest o'zining mocking kutubxonasini majburlamaydi: Laravel testlarida odatiy vosita — **Mockery** va Laravel'ning container yordamchilari (25.7). Ular Pest testida xuddi shunday ishlaydi.",
    "",
    "### Variantlar (afzalidan boshlab)",
    "**1. Laravel fake'lari** (25.6) — tizim chegaralari uchun eng toza: `Http::fake()`, `Queue::fake()`, `Mail::fake()`, `Notification::fake()`, `Event::fake()`, `Storage::fake()`, `Bus::fake()`, `Process::fake()`, `Exceptions::fake()` (11+). Ular natijani tekshirish uchun qulay assertion'lar beradi.",
    "",
    "**2. O'z fake implementatsiyangiz** — interfeys ortidagi tashqi servislar uchun: `FakeSmsSender`, `InMemoryPaymentGateway`. `$this->instance(SmsSender::class, $fake)` yoki `$this->swap()`.",
    "",
    "**3. Container mock'lari:**",
    "- `$this->mock(Gateway::class, fn (MockInterface $m) => $m->expects('charge')->andReturn($result))`.",
    "- `$this->partialMock()`, `$this->spy()`.",
    "",
    "**4. To'g'ridan-to'g'ri Mockery:** `$gateway = Mockery::mock(Gateway::class);` va konstruktorga uzatish (unit testlarda).",
    "",
    "### Pest'ning `mock()` funksiyasi",
    "`pestphp/pest-plugin-mock` (eski) yoki Pest 1–2 dagi `mock(Gateway::class)->expect(charge: fn ($amount) => ...)` sintaksisi. Pest 3 da yadroga kirmagan va ko'pchilik loyihalar Mockery yoki Laravel `$this->mock()` ishlatadi.",
    "",
    "### Expectation'lar va tekshiruv",
    "- `->expects('charge')` — aynan bir marta chaqirilishi kerak (Mockery 1.6+ sintaksisi).",
    "- `->shouldReceive('charge')->twice()->with(150_000, Mockery::type('string'))`.",
    "- `->allows('rate')->andReturn(12650)` — stub (chaqirilmasa ham bo'ladi).",
    "- Spy: `$spy->shouldHaveReceived('send')->once()`.",
    "",
    "Mockery kutishlari test oxirida avtomatik tekshiriladi (Laravel `TestCase` `Mockery::close()` ni chaqiradi). Kutish bajarilmasa, test yiqiladi.",
    "",
    "### Qachon mock qilmaslik",
    "Domen klasslari, qiymat obyektlari va Eloquent modellar — haqiqiy obyektlar bilan. Faqat chegaralarni almashtiring (25.6). Ortiqcha mock — testlar implementatsiyaga mixlanadi va refactoring'da sinadi."
  ],
  "examples": [
    {
      "title": "Container mock va Http::fake",
      "lang": "php",
      "code": [
        "use Mockery\\MockInterface;",
        "",
        "it('marks order paid when gateway succeeds', function () {",
        "    $this->mock(PaymentGateway::class, function (MockInterface $mock) {",
        "        $mock->expects('charge')",
        "            ->with(150_000, Mockery::type('string'))",
        "            ->andReturn(new ChargeResult('ch_1', 'succeeded'));",
        "    });",
        "",
        "    $order = Order::factory()->create(['total' => 150_000]);",
        "",
        "    app(PayOrder::class)->handle($order);",
        "",
        "    expect($order->fresh()->status)->toBe(OrderStatus::Paid);",
        "});",
        "",
        "it('sends sms through provider api', function () {",
        "    Http::fake(['notify.eskiz.uz/*' => Http::response(['status' => 'waiting'])]);",
        "",
        "    app(SmsSender::class)->send('+998901234567', 'Kod: 1234');",
        "",
        "    Http::assertSent(fn ($r) => $r['mobile_phone'] === '998901234567');",
        "});"
      ],
      "note": "SMS provayderi URL va maydon nomlari namunaviy. Haqiqiy provayder hujjatiga moslang."
    }
  ],
  "pitfalls": [
    "Laravel'ning tayyor fake'lari bor joyda Mockery bilan facade'larni mock qilish.",
    "Eloquent modellarni mock qilish: haqiqiy factory va test bazasi soddaroq va ishonchliroq.",
    "`shouldReceive` bilan stub kerak bo'lgan joyda chaqiruvlar sonini qat'iy belgilash: testlar mo'rt.",
    "Eski Pest `mock()` sintaksisini Pest 3 da kutish."
  ]
});
