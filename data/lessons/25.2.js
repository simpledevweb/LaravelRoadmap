/* Chuqur dars: 25.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.2", {
  "lesson": [
    "### Assertion nima",
    "Assertion — kutilgan va haqiqiy natijani solishtiruvchi tekshiruv. Mos kelmasa, test yiqiladi va PHPUnit farqni (diff) ko'rsatadi. Yaxshi tanlangan assertion yiqilganda **aniq va tushunarli** xabar beradi.",
    "",
    "### Eng ko'p ishlatiladiganlar",
    "**Tenglik:**",
    "- `assertSame($expected, $actual)` — qiymat **va tur** bir xil (`===`). Default tanlov.",
    "- `assertEquals()` — `==` bilan, tur o'girishli. `assertEquals(1, '1')` o'tadi. Obyektlarni xususiyatlari bo'yicha solishtiradi. Faqat ongli ravishda.",
    "- `assertEqualsCanonicalizing()` — massivlar tartibsiz.",
    "- `assertEqualsWithDelta(0.3, $x, 0.0001)` — float'lar uchun.",
    "",
    "**Boolean va null:** `assertTrue`, `assertFalse`, `assertNull`, `assertNotNull`. `assertTrue($a == $b)` o'rniga `assertSame` — yiqilganda qiymatlarni ko'rsatadi.",
    "",
    "**Massivlar va kolleksiyalar:** `assertCount`, `assertContains`, `assertArrayHasKey`, `assertEmpty`, `assertContainsOnlyInstancesOf`.",
    "",
    "**Satrlar:** `assertStringContainsString`, `assertStringStartsWith`, `assertMatchesRegularExpression`, `assertJsonStringEqualsJsonString`.",
    "",
    "**Turlar:** `assertInstanceOf`, `assertIsArray`, `assertIsInt`.",
    "",
    "**Exception'lar:** `expectException`, `expectExceptionMessage` (25.8).",
    "",
    "### Laravel assertion'lari",
    "- HTTP: `assertOk()`, `assertCreated()`, `assertStatus()`, `assertJson()`, `assertJsonPath()`, `assertJsonValidationErrors()`, `assertRedirect()`, `assertSee()`.",
    "- DB: `assertDatabaseHas()`, `assertDatabaseMissing()`, `assertDatabaseCount()`, `assertSoftDeleted()`, `assertModelExists()`.",
    "- Fake'lar: `Queue::assertPushed()`, `Mail::assertSent()`, `Event::assertDispatched()`, `Http::assertSent()`, `Notification::assertSentTo()`.",
    "- Auth: `assertAuthenticated()`, `assertGuest()`.",
    "",
    "### Xabar parametri",
    "Har assertion'ning oxirgi ixtiyoriy argumenti — xato xabari: `assertTrue($user->isActive(), 'Ro\\'yxatdan o\\'tgan foydalanuvchi faol bo\\'lishi kerak')`. Assertion o'zi tushunarli xabar bermasa (masalan, `assertTrue`) foydali.",
    "",
    "### Assertion'lar soni",
    "Test kamida bitta assertion'ga ega bo'lishi kerak. Assertion'siz test PHPUnit'da \"risky\" deb belgilanadi (`beStrictAboutTestsThatDoNotTestAnything`). Ko'p assertion'lar bitta natijaning turli tomonlarini tekshirsa, normal."
  ],
  "examples": [
    {
      "title": "assertSame va assertEquals farqi",
      "lang": "php",
      "code": [
        "$this->assertEquals(100, '100');      // o'tadi: tur o'giriladi",
        "$this->assertSame(100, '100');        // yiqiladi: int !== string",
        "",
        "$this->assertEquals(0.3, 0.1 + 0.2);  // yiqiladi: 0.30000000000000004",
        "$this->assertEqualsWithDelta(0.3, 0.1 + 0.2, 1e-9);   // o'tadi",
        "",
        "// Yomon: yiqilganda faqat \"Failed asserting that false is true\"",
        "$this->assertTrue($order->total === 150000);",
        "// Yaxshi: \"Failed asserting that 140000 is identical to 150000\"",
        "$this->assertSame(150000, $order->total);"
      ]
    },
    {
      "title": "Laravel feature test assertion'lari",
      "lang": "php",
      "code": [
        "public function test_customer_can_place_order(): void",
        "{",
        "    Queue::fake();",
        "    $product = Product::factory()->create(['price' => 50_000, 'stock' => 10]);",
        "",
        "    $response = $this->actingAs(User::factory()->create())",
        "        ->postJson('/api/v1/orders', ['items' => [['product_id' => $product->id, 'qty' => 3]]]);",
        "",
        "    $response->assertCreated()",
        "        ->assertJsonPath('data.total.amount', 150_000)",
        "        ->assertJsonPath('data.status', 'pending');",
        "",
        "    $this->assertDatabaseHas('products', ['id' => $product->id, 'stock' => 7]);",
        "    Queue::assertPushed(SendOrderConfirmation::class);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Hamma joyda `assertEquals` ishlatish: tur farqlari yashirinadi.",
    "`assertTrue($a === $b)` yozish: yiqilganda qiymatlar ko'rinmaydi.",
    "Float'larni `assertSame` bilan solishtirish.",
    "Assertion'siz test: hech narsani tekshirmaydi, lekin yashil ko'rinadi."
  ]
});
