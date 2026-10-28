/* Chuqur dars: 26.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.7", {
  "lesson": [
    "### Plugin tizimi",
    "Pest yadrosi kichik va ko'p imkoniyatlar **plugin**lar orqali qo'shiladi. Plugin — Composer paketi. U yangi funksiyalar (`livewire()`, `arch()`), expectation'lar, CLI opsiyalar yoki hook'lar qo'shadi. Ko'pchilik plugin'lar o'rnatilishi bilan avtomatik ro'yxatdan o'tadi.",
    "",
    "### Rasmiy plugin'lar",
    "- **`pestphp/pest-plugin-laravel`** (26.9) — `get()`, `actingAs()` kabi funksional yordamchilar, `pest:test` artisan buyrug'i va boshqalar.",
    "- **`pestphp/pest-plugin-arch`** — arxitektura testlari (26.8). Pest 3 da yadroga kiritilgan.",
    "- **`pestphp/pest-plugin-faker`** — `fake()` funksiyasi (Laravel'da allaqachon bor).",
    "- **`pestphp/pest-plugin-livewire`** — `livewire(Counter::class)->call('increment')->assertSee(1)`.",
    "- **`pestphp/pest-plugin-type-coverage`** — `--type-coverage`: kodda tur e'lonlari (parametr, qaytish qiymati, xususiyat) qancha foizni qamrashi. PHPStan'ga qo'shimcha sifatida foydali.",
    "- **`pestphp/pest-plugin-stressless`** — `stress('https://...')` bilan oddiy yuk testlari (k6 asosida).",
    "- **`pestphp/pest-plugin-watch`** — `--watch`: fayl o'zgarganda testlarni avtomatik qayta ishga tushirish (TDD sikli uchun qulay).",
    "- **Mutation testing** — Pest 3 da `--mutate` yadroda (26.17).",
    "- **Browser testing** (Pest 4) — Playwright asosida `visit('/')->click(...)->assertSee(...)`.",
    "",
    "### Uchinchi tomon plugin'lar",
    "Ekotizim: snapshot testlar (`spatie/pest-plugin-snapshots`), test vaqtini profillash, maxsus expectation to'plamlari. Har biri dev-bog'liqlik sifatida o'rnatiladi.",
    "",
    "### O'z plugin'ingiz",
    "Loyiha ichida takrorlanadigan test yordamchilari ko'paysa, avval `tests/Pest.php` dagi funksiyalar va custom expectation'lar (26.6) yetarli. Kompaniya bo'ylab bir nechta loyihada ishlatiladigan bo'lsa, alohida Composer paketi sifatida plugin. Pest plugin API'si: trait'lar orqali test klassiga metod qo'shish (`Pest\\Plugin::uses()`), yoki `HandlesArguments` kabi interfeyslar bilan CLI opsiyalari.",
    "",
    "### Versiya mosligi",
    "Pest major versiyalari (2 → 3 → 4) bilan plugin'lar ham yangilanadi. Plugin versiyalarini Pest versiyasiga mos tanlang va `composer why-not pestphp/pest ^3.0` (iq-265) bilan ziddiyatlarni tekshiring."
  ],
  "examples": [
    {
      "title": "Plugin'larni o'rnatish va ishlatish",
      "lang": "bash",
      "code": [
        "composer require --dev pestphp/pest-plugin-laravel pestphp/pest-plugin-livewire pestphp/pest-plugin-type-coverage",
        "",
        "./vendor/bin/pest --type-coverage --min=95",
        "./vendor/bin/pest --watch tests/Unit"
      ]
    },
    {
      "title": "Livewire plugin bilan test",
      "lang": "php",
      "code": [
        "use function Pest\\Livewire\\livewire;",
        "",
        "it('adds product to cart', function () {",
        "    $product = Product::factory()->create(['price' => 50_000]);",
        "",
        "    livewire(CartButton::class, ['product' => $product])",
        "        ->call('add')",
        "        ->assertDispatched('cart-updated')",
        "        ->assertSee('Savatchada: 1');",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Pest major versiyasini yangilab, plugin'larni yangilamaslik: Composer ziddiyatlari yoki runtime xatolari.",
    "Har kichik ehtiyoj uchun yangi plugin o'rnatish: dev-bog'liqliklar va yangilash yuki o'sadi.",
    "Type coverage foizini statik tahlil o'rnini bosadi deb hisoblash.",
    "Plugin'larni `require` (dev'siz) bo'limiga qo'shish: production'ga ham o'rnatiladi."
  ]
});
