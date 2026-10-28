/* Chuqur dars: 26.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.11", {
  "lesson": [
    "### DB holati",
    "Pest'da DB testlari PHPUnit bilan bir xil Laravel mexanizmlariga tayanadi (25.13):",
    "- `RefreshDatabase` — migratsiyalar bir marta, har test tranzaksiyada va rollback. Odatda `tests/Pest.php` da `->use(RefreshDatabase::class)->in('Feature')`.",
    "- `DatabaseTruncation` — brauzer testlari uchun.",
    "- `LazilyRefreshDatabase` — baza faqat test haqiqatan DB'ga murojaat qilsa yangilanadi. DB'siz feature testlar tezlashadi.",
    "",
    "### Factory'lar",
    "`User::factory()->create()`, state'lar (`->admin()`), munosabatlar (`->has(Order::factory()->count(3))`, `->for($tenant)`, magic `hasOrders(3)`), `sequence()`, `recycle()` (13.18). Testga muhim qiymatlarni aniq yozing.",
    "",
    "### DB assertion'lari",
    "- `assertDatabaseHas('orders', ['id' => $id, 'status' => 'paid'])`.",
    "- `assertDatabaseMissing()`, `assertDatabaseCount('orders', 3)`, `assertDatabaseEmpty()`.",
    "- `assertModelExists($order)`, `assertModelMissing($order)`, `assertSoftDeleted($order)`, `assertNotSoftDeleted()`.",
    "- JSON ustun: `assertDatabaseHas('orders', ['meta->source' => 'mobile'])`.",
    "",
    "Pest funksional uslubida: `use function Pest\\Laravel\\assertDatabaseHas;`.",
    "",
    "### Model holatini expect bilan",
    "Ko'pincha DB assertion'idan ko'ra aniqroq: `expect($order->fresh())->status->toBe(OrderStatus::Paid)->paid_at->not->toBeNull()`. `fresh()` — DB'dan qayta o'qish (xotiradagi obyekt eskirgan bo'lishi mumkin).",
    "",
    "### So'rovlar sonini tekshirish",
    "N+1 regressiyalariga qarshi (16.15): `DB::enableQueryLog()` va `expect(DB::getQueryLog())->toHaveCount(...)`, yoki Laravel 11+ da `$this->expectsDatabaseQueryCount(5)`.",
    "",
    "### Production DB turi",
    "SQLite va MySQL/PostgreSQL dialekt farqlari (25.13): raw SQL, JSON funksiyalari yoki DB'ga xos imkoniyatlar ishlatilsa, testlarni production bilan bir xil DB'da ishga tushiring. `config:cache` qilingan muhitda testlar dev bazaga urilishi mumkin — `php artisan config:clear`.",
    "",
    "### Seed",
    "Reference ma'lumot (rollar) uchun `->seed(RolesSeeder::class)` yoki `$this->seed()` `beforeEach` da. Butun demo bazani har testga yuklamang."
  ],
  "examples": [
    {
      "title": "DB holatini tekshirish",
      "lang": "php",
      "code": [
        "it('soft deletes an order and keeps its items', function () {",
        "    $order = Order::factory()->hasItems(2)->create();",
        "    Sanctum::actingAs($order->customer->user, ['orders:write']);",
        "",
        "    $this->deleteJson(\"/api/v1/orders/{$order->id}\")->assertNoContent();",
        "",
        "    $this->assertSoftDeleted($order);",
        "    $this->assertDatabaseCount('order_items', 2);",
        "    expect(Order::count())->toBe(0)",
        "        ->and(Order::withTrashed()->count())->toBe(1);",
        "});"
      ]
    },
    {
      "title": "So'rovlar soni (Laravel 11+)",
      "lang": "php",
      "code": [
        "it('loads order list without N+1', function () {",
        "    Order::factory()->count(20)->hasItems(3)->create();",
        "    $this->actingAs(User::factory()->admin()->create());",
        "",
        "    $this->expectsDatabaseQueryCount(6);",
        "",
        "    $this->getJson('/api/v1/admin/orders')->assertOk();",
        "});"
      ],
      "note": "Aniq son o'rniga yuqori chegara kerak bo'lsa, `DB::getQueryLog()` bilan `toBeLessThanOrEqual()`."
    }
  ],
  "pitfalls": [
    "`fresh()` siz xotiradagi eskirgan model bilan tekshirish.",
    "Testlar SQLite'da, production PostgreSQL'da: dialekt farqlari yashirinadi.",
    "Har test uchun butun seed: to'plam sekin va testlar mo'rt.",
    "`config:cache` qilingan muhitda testlarni ishga tushirib, dev bazani tozalab yuborish."
  ]
});
