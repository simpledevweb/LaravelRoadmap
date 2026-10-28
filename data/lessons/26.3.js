/* Chuqur dars: 26.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.3", {
  "lesson": [
    "### expect()",
    "`expect($value)` qiymatni o'raydi va unga \"kutishlar\" zanjirini qo'llash imkonini beradi. Har kutish bajarilmasa, test yiqiladi va PHPUnit kabi tushunarli diff ko'rsatiladi.",
    "",
    "### Asosiy expectation'lar",
    "**Tenglik:**",
    "- `toBe($v)` — qat'iy `===` (PHPUnit `assertSame`).",
    "- `toEqual($v)` — `==`, obyekt va massivlarni qiymat bo'yicha.",
    "- `toEqualCanonicalizing()` — tartibsiz massivlar.",
    "",
    "**Tur va holat:** `toBeTrue()`, `toBeFalse()`, `toBeNull()`, `toBeEmpty()`, `toBeInt()`, `toBeString()`, `toBeArray()`, `toBeInstanceOf(X::class)`, `toBeBetween(1, 10)`, `toBeGreaterThan()`.",
    "",
    "**Kolleksiya va satrlar:** `toHaveCount(3)`, `toContain('x')`, `toHaveKey('id')`, `toHaveKeys([...])`, `toMatchArray([...])` (qisman moslik), `toStartWith()`, `toMatch('/regex/')`, `toBeJson()`.",
    "",
    "**Exception:** `expect(fn () => $wallet->withdraw(1))->toThrow(InsufficientBalance::class)`.",
    "",
    "### Inkor: not",
    "`expect($x)->not->toBeNull()`, `->not->toContain('admin')`.",
    "",
    "### Zanjirlash va kalit bo'yicha o'tish",
    "- Bir qiymatga bir nechta kutish: `expect($user)->toBeInstanceOf(User::class)->email->toBe('ali@x.uz')`.",
    "- Xususiyatga o'tish: `->email`, massiv kaliti `->data->status`.",
    "- `and()` — boshqa qiymatga o'tish: `expect($a)->toBe(1)->and($b)->toBe(2)`.",
    "- `each` — har element: `expect($orders)->each->toBeInstanceOf(Order::class)`.",
    "- `sequence()` — elementlar ketma-ketligi: `expect([1, 2])->sequence(fn ($e) => $e->toBe(1), fn ($e) => $e->toBe(2))`.",
    "- `json()` — JSON satrni massivga: `expect($response->getContent())->json()->data->id->toBe(5)`.",
    "",
    "### Laravel bilan",
    "HTTP javobi uchun ko'pincha `$response->assertOk()->assertJsonPath(...)` (Laravel assertion'lari) qulayroq. `expect` esa domen qiymatlari uchun: `expect($order->fresh()->status)->toBe(OrderStatus::Paid)`.",
    "",
    "### PHPUnit assertion'lari ham ishlaydi",
    "Pest testida `$this->assertSame()` ham to'g'ri. Lekin bir faylda ikkala uslubni aralashtirish o'qishni qiyinlashtiradi."
  ],
  "examples": [
    {
      "title": "Zanjirli kutishlar",
      "lang": "php",
      "code": [
        "it('creates paid order with items', function () {",
        "    $order = app(PlaceOrder::class)->handle($customer = Customer::factory()->create(), [",
        "        ['sku' => 'A-1', 'qty' => 2],",
        "    ]);",
        "",
        "    expect($order)",
        "        ->toBeInstanceOf(Order::class)",
        "        ->status->toBe(OrderStatus::Pending)",
        "        ->customer_id->toBe($customer->id)",
        "        ->and($order->items)",
        "        ->toHaveCount(1)",
        "        ->each->toBeInstanceOf(OrderItem::class);",
        "});"
      ]
    },
    {
      "title": "Exception va inkor",
      "lang": "php",
      "code": [
        "it('does not allow withdrawing above balance', function () {",
        "    $wallet = new Wallet(balance: 100);",
        "",
        "    expect(fn () => $wallet->withdraw(150))",
        "        ->toThrow(InsufficientBalance::class, 'yetarli emas');",
        "",
        "    expect($wallet->balance())->toBe(100)->not->toBeLessThan(100);",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "`toBe` va `toEqual` ni adashtirish: `expect('1')->toBe(1)` yiqiladi, `toEqual` o'tadi.",
    "Exception kutishda yopilma o'rniga natijani berish: `expect($wallet->withdraw(150))->toThrow()` — exception `expect` dan oldin tashlanadi.",
    "`and()` dan keyin qiymat almashganini unutib, oldingi qiymat haqida kutish yozish.",
    "Float'lar uchun `toBe` ishlatish: `toEqualWithDelta()` kerak."
  ]
});
