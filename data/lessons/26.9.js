/* Chuqur dars: 26.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.9", {
  "lesson": [
    "### Laravel bilan Pest",
    "Laravel 11+ da `laravel new` Pest'ni tanlash imkonini beradi. Mavjud loyihaga: `composer require pestphp/pest pestphp/pest-plugin-laravel --dev --with-all-dependencies` va `./vendor/bin/pest --init`. `tests/Pest.php` yaratiladi va `Feature` papkasi `Tests\\TestCase` bilan bog'lanadi.",
    "",
    "### pest-plugin-laravel nima beradi",
    "1. **Funksional yordamchilar** — `$this->` siz: `get('/')`, `post()`, `actingAs($user)`, `getJson()`, `assertDatabaseHas()`. `use function Pest\\Laravel\\{get, actingAs};` bilan import qilinadi. `$this->get()` ham ishlaydi — bu uslub tanlovi.",
    "2. **Artisan buyruqlari:** `php artisan pest:test UserTest` (yoki `--unit`), `pest:dataset`.",
    "3. **`php artisan test`** — Pest o'rnatilgan bo'lsa, u orqali ishlaydi, `--parallel` bilan.",
    "",
    "### Laravel test imkoniyatlari to'liq ishlaydi",
    "Pest testi Laravel `TestCase` ga bog'langani uchun barcha Laravel test yordamchilari mavjud:",
    "- HTTP: `$this->postJson()->assertCreated()->assertJsonPath()`.",
    "- Auth: `actingAs()`, `Sanctum::actingAs()`.",
    "- DB: `RefreshDatabase`, factory'lar, `assertDatabaseHas`, `assertModelExists`.",
    "- Fake'lar: `Queue::fake()`, `Mail::fake()`, `Event::fake()`, `Http::fake()`, `Storage::fake()`, `Notification::fake()`.",
    "- Vaqt: `$this->travel()`, `travelTo()`, `freezeTime()`.",
    "- Konsol: `$this->artisan('orders:expire')->assertSuccessful()->expectsOutput('...')`.",
    "",
    "### Trait'larni ulash",
    "`RefreshDatabase`, `WithFaker` kabi trait'lar `tests/Pest.php` da papka darajasida yoki fayl boshida `uses(RefreshDatabase::class);` bilan.",
    "",
    "### Unit testlar",
    "`tests/Unit` odatda Laravel `TestCase` siz (25.11): tez, framework'siz. Agar unit testda `config()` yoki facade kerak bo'lsa, u feature testga ko'chirilishi yoki kod qayta tuzilishi kerak.",
    "",
    "### Uslub tanlovi",
    "`$this->get()` va funksional `get()` — ikkalasi ham to'g'ri. Funksional uslub qisqaroq, `$this` esa PHPUnit'dan o'tgan jamoaga tanishroq. Loyihada bittasini tanlang."
  ],
  "examples": [
    {
      "title": "Funksional uslubdagi feature test",
      "lang": "php",
      "code": [
        "use App\\Models\\User;",
        "use function Pest\\Laravel\\{actingAs, postJson, assertDatabaseHas};",
        "",
        "it('creates an address for the authenticated customer', function () {",
        "    $user = User::factory()->create();",
        "",
        "    actingAs($user)",
        "        ->postJson('/api/v1/addresses', ['city' => 'Toshkent', 'line' => 'Amir Temur 1'])",
        "        ->assertCreated()",
        "        ->assertJsonPath('data.city', 'Toshkent');",
        "",
        "    assertDatabaseHas('addresses', ['user_id' => $user->id, 'city' => 'Toshkent']);",
        "});"
      ]
    },
    {
      "title": "Artisan buyrug'i testi",
      "lang": "php",
      "code": [
        "it('expires stale pending orders', function () {",
        "    $this->travelTo('2025-06-10 12:00');",
        "    $stale = Order::factory()->create(['status' => 'pending', 'created_at' => now()->subDays(2)]);",
        "    $fresh = Order::factory()->create(['status' => 'pending']);",
        "",
        "    $this->artisan('orders:expire')",
        "        ->expectsOutput('1 ta buyurtma muddati tugadi')",
        "        ->assertSuccessful();",
        "",
        "    expect($stale->fresh()->status->value)->toBe('expired')",
        "        ->and($fresh->fresh()->status->value)->toBe('pending');",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "`tests/Pest.php` da Feature papkani `Tests\\TestCase` bilan bog'lamaslik: Laravel yordamchilari ishlamaydi.",
    "Funksional va `$this->` uslubini bir faylda aralashtirish.",
    "Unit testlarni ham Laravel `TestCase` ga ulab, test to'plamini sekinlashtirish.",
    "Pest va pest-plugin-laravel versiyalari mos kelmasligi."
  ]
});
