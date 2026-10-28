/* Chuqur dars: 26.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.1", {
  "lesson": [
    "### Pest nima",
    "Pest — PHPUnit **ustiga qurilgan** test freymvorki. U PHPUnit'ning ishga tushirish mexanizmi, assertion'lari va ekotizimini ishlatadi, lekin test yozish uchun qisqaroq, funksional sintaksis beradi. Laravel 11+ yangi loyihalarda Pest'ni default sifatida taklif qiladi.",
    "",
    "### Klasslarsiz testlar",
    "PHPUnit'da test — klass ichidagi metod. Pest'da test — fayldagi funksiya chaqiruvi:",
    "- `test('description', function () { ... });`",
    "- `it('does something', function () { ... });` (26.2).",
    "",
    "Fayl ichida klass, `extends TestCase`, `public function`, `void` yo'q. Pest har fayl uchun yashirin test klassini o'zi yaratadi.",
    "",
    "### Yopilma ichida `$this`",
    "Test yopilmasi test klassiga bog'langan, shuning uchun `$this` ishlaydi: `$this->get('/')`, `$this->actingAs($user)`, `$this->assertDatabaseHas()`. Qaysi bazaviy klass ishlatilishi `tests/Pest.php` da belgilanadi: `pest()->extend(Tests\\TestCase::class)->in('Feature');`.",
    "",
    "### Expectation API",
    "PHPUnit `$this->assertSame(10, $x)` o'rniga Pest `expect($x)->toBe(10)` (26.3). Zanjirlash mumkin: `expect($user)->toBeInstanceOf(User::class)->name->toBe('Ali')`.",
    "",
    "### tests/Pest.php",
    "Global konfiguratsiya fayli:",
    "- qaysi papkalarda qaysi bazaviy klass va trait'lar (`RefreshDatabase`);",
    "- umumiy hook'lar (26.5);",
    "- custom expectation'lar (26.6);",
    "- global yordamchi funksiyalar (`function actingAsAdmin() { ... }`).",
    "",
    "### Ishga tushirish",
    "`./vendor/bin/pest`, `php artisan test` (Pest o'rnatilgan bo'lsa, u orqali), `--filter`, `--parallel`, `--coverage`, `--profile` (eng sekin testlar), `--bail`, `--dirty` (faqat Git'da o'zgargan fayllar testlari).",
    "",
    "### Qachon Pest",
    "Qisqa sintaksis kamroq \"boilerplate\" va o'qilishi oson testlar beradi. Lekin Pest — majburiyat emas: PHPUnit klasslari Pest bilan birga ishlaydi (26.14). Jamoa uchun muhimi — bitta uslubni tanlab, izchil qo'llash."
  ],
  "examples": [
    {
      "title": "PHPUnit va Pest yonma-yon",
      "lang": "php",
      "code": [
        "// PHPUnit",
        "final class DiscountTest extends TestCase",
        "{",
        "    public function test_applies_ten_percent_above_threshold(): void",
        "    {",
        "        $this->assertSame(990_000, (new Discount())->apply(1_100_000));",
        "    }",
        "}",
        "",
        "// Pest: tests/Unit/DiscountTest.php",
        "it('applies ten percent above threshold', function () {",
        "    expect((new Discount())->apply(1_100_000))->toBe(990_000);",
        "});"
      ]
    },
    {
      "title": "tests/Pest.php",
      "lang": "php",
      "code": [
        "pest()->extend(Tests\\TestCase::class)",
        "    ->use(Illuminate\\Foundation\\Testing\\RefreshDatabase::class)",
        "    ->in('Feature');",
        "",
        "function actingAsAdmin(): Tests\\TestCase",
        "{",
        "    return test()->actingAs(User::factory()->admin()->create());",
        "}"
      ],
      "note": "`pest()->extend()` Pest 3 sintaksisi. Pest 2 da `uses(Tests\\TestCase::class, RefreshDatabase::class)->in('Feature');`."
    }
  ],
  "pitfalls": [
    "`tests/Pest.php` da `extend(TestCase)` ni sozlamay, Feature testlarda `$this->get()` ishlatish: `Call to undefined method`.",
    "Pest'ni PHPUnit'dan butunlay boshqa freymvork deb hisoblash: ostida baribir PHPUnit.",
    "Global yordamchi funksiyalarni `Pest.php` ga to'plab, nomlar to'qnashuviga yo'l qo'yish.",
    "Bitta loyihada uslublarni tasodifiy aralashtirish: jamoa uchun izchil qoida yo'q."
  ]
});
