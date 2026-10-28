/* Chuqur dars: 25.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.7", {
  "lesson": [
    "### PHPUnit'ning ichki vositalari",
    "- **`createStub(Class::class)`** — barcha metodlar default qiymat qaytaradigan stub. `->method('x')->willReturn($v)`, `willReturnMap([...])`, `willReturnCallback(fn)`, `willThrowException($e)`, `willReturnOnConsecutiveCalls(...)`.",
    "- **`createMock(Class::class)`** — kutilgan chaqiruvlar bilan: `->expects($this->once())->method('send')->with('ali@x.uz', $this->isInstanceOf(Receipt::class))`. `once()`, `never()`, `exactly(2)`, `atLeastOnce()`.",
    "- `createConfiguredStub(Class::class, ['method' => 'value'])`.",
    "- PHPUnit 10+ da stub'da `expects()` deprecated: stub — faqat javob qaytarish uchun, tekshiruv uchun mock.",
    "",
    "### Mockery (Laravel'da default)",
    "Laravel testlari Mockery bilan keladi va uning sintaksisi ko'pchilikka qulayroq:",
    "- `Mockery::mock(Gateway::class)->shouldReceive('charge')->once()->with(150000)->andReturn($result)`.",
    "- `->allows('rate')->andReturn(12650)` — stub (chaqirilishi shart emas).",
    "- `->expects('charge')->with(...)` — mock (bir marta chaqirilishi shart).",
    "- `Mockery::spy()` va keyin `->shouldHaveReceived('send')->once()`.",
    "- Argument matcher'lar: `Mockery::on(fn ($x) => $x->amount === 150000)`, `Mockery::type('array')`, `Mockery::any()`.",
    "",
    "Laravel'ning `TestCase` har testdan keyin `Mockery::close()` ni chaqiradi va kutilgan chaqiruvlar bajarilganini tekshiradi.",
    "",
    "### Laravel container yordamchilari",
    "- `$this->mock(Gateway::class, fn (MockInterface $m) => $m->expects('charge')->andReturn(...))` — mock yaratib, container'ga bog'laydi. Endi `app(Gateway::class)` va constructor injection mock'ni oladi.",
    "- `$this->partialMock(Service::class, fn ($m) => $m->expects('heavyMethod'))` — faqat ba'zi metodlar almashtiriladi.",
    "- `$this->spy(Service::class)` va keyin `->shouldHaveReceived()`.",
    "- Facade'lar uchun: `Cache::shouldReceive('get')->once()->andReturn(...)`. Lekin ko'p facade'lar uchun tayyor `::fake()` yaxshiroq (25.6).",
    "",
    "### Final klasslar",
    "PHPUnit va Mockery `final` klasslarni default'da mock qila olmaydi. Yechimlar (afzalidan boshlab):",
    "1. Klass **interfeys** orqali ishlatilsin va interfeys mock qilinsin. Eng toza dizayn.",
    "2. Haqiqiy obyektni ishlatish (agar u qiymat obyekti yoki toza mantiq bo'lsa).",
    "3. `dg/bypass-finals` paketi testlarda `final` ni olib tashlaydi. Oxirgi chora.",
    "",
    "### Ortiqcha mock'lash belgilari",
    "- Test asosan `shouldReceive` qatorlaridan iborat va haqiqiy natija tekshirilmaydi.",
    "- Refactoring (xulq-atvor o'zgarmagan) testlarni sindiradi.",
    "- Mock mock qaytaradi va u ham mock qaytaradi (\"train wreck\").",
    "",
    "Bularni ko'rsangiz, chegaralarni qayta ko'rib chiqing: fake, haqiqiy obyekt yoki integratsiya testi (25.12) yaxshiroq bo'lishi mumkin."
  ],
  "examples": [
    {
      "title": "PHPUnit stub va mock",
      "lang": "php",
      "code": [
        "public function test_charges_order_total_and_marks_paid(): void",
        "{",
        "    $gateway = $this->createMock(PaymentGateway::class);",
        "    $gateway->expects($this->once())",
        "        ->method('charge')",
        "        ->with(150_000, $this->stringStartsWith('order-'))",
        "        ->willReturn(new ChargeResult(id: 'ch_1', status: 'succeeded'));",
        "",
        "    $order = new Order(id: 42, total: 150_000);",
        "",
        "    (new PayOrder($gateway))->handle($order);",
        "",
        "    $this->assertTrue($order->isPaid());",
        "}"
      ]
    },
    {
      "title": "Laravel: $this->mock va Mockery",
      "lang": "php",
      "code": [
        "public function test_failed_charge_keeps_order_pending(): void",
        "{",
        "    $this->mock(PaymentGateway::class, function (MockInterface $mock) {",
        "        $mock->expects('charge')",
        "            ->with(150_000, Mockery::type('string'))",
        "            ->andThrow(new PaymentDeclined('insufficient_funds'));",
        "    });",
        "",
        "    $order = Order::factory()->create(['total' => 150_000, 'status' => 'pending']);",
        "",
        "    $this->actingAs($order->customer->user)",
        "        ->postJson(\"/api/v1/orders/{$order->id}/pay\")",
        "        ->assertUnprocessable()",
        "        ->assertJsonPath('code', 'payment_declined');",
        "",
        "    $this->assertSame('pending', $order->fresh()->status->value);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Stub'da `expects()` bilan chaqiruvlar sonini tekshirish (PHPUnit 10+ da deprecated).",
    "`final` klasslarni mock qilish uchun ularni `final` dan chiqarish: interfeys yaxshiroq.",
    "Test faqat mock kutishlaridan iborat va natija tekshirilmaydi.",
    "Facade'larni `shouldReceive` bilan mock qilish, tayyor `fake()` bor bo'lsa."
  ]
});
