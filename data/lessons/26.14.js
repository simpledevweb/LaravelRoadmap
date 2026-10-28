/* Chuqur dars: 26.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.14", {
  "lesson": [
    "### Pest — PHPUnit ustida",
    "Pest test fayllari ichida yashirin PHPUnit test klasslarini yaratadi va PHPUnit runner'i bilan ishga tushiradi. Shuning uchun:",
    "- **PHPUnit klassli testlar Pest bilan ishlaydi.** `./vendor/bin/pest` `tests/` dagi PHPUnit `...Test` klasslarini ham topadi va ishga tushiradi.",
    "- `phpunit.xml` — Pest ham uni o'qiydi: suite'lar, `<php>` env, `<source>` coverage.",
    "- PHPUnit assertion'lari (`$this->assertSame`) Pest testlarida ishlaydi.",
    "- Laravel `TestCase`, trait'lar va yordamchilar ikkalasida bir xil.",
    "",
    "### Bosqichma-bosqich o'tish",
    "Mavjud PHPUnit loyihasini Pest'ga birdaniga qayta yozish shart emas:",
    "1. Pest'ni o'rnatish (`composer require pestphp/pest --dev -W`, `pest --init`).",
    "2. Barcha mavjud testlar o'zgarishsiz ishlashini tekshirish: `./vendor/bin/pest`.",
    "3. Yangi testlarni Pest uslubida yozish.",
    "4. Ixtiyoriy: eski testlarni avtomatik konvertatsiya — **Pest Drift** (`pestphp/pest-plugin-drift`, `./vendor/bin/pest --drift`). Natijani ko'zdan kechirish kerak.",
    "",
    "### Atributlar va annotatsiyalar",
    "PHPUnit atributlarining Pest ekvivalentlari:",
    "- `#[DataProvider]` → `->with()` / `dataset()`.",
    "- `#[Group('slow')]` → `->group('slow')`.",
    "- `setUp` → `beforeEach`.",
    "- `#[Depends]` → `->depends()`.",
    "- `#[CoversClass]` → `->covers()`.",
    "- `expectException` → `->throws()` yoki `expect(fn)->toThrow()`.",
    "",
    "### Versiya bog'liqligi",
    "Har Pest major versiyasi aniq PHPUnit versiyasiga bog'langan (Pest 2 → PHPUnit 10, Pest 3 → PHPUnit 11, Pest 4 → PHPUnit 12). PHPUnit'ni alohida boshqa versiyaga majburlamang: Composer ziddiyati bo'ladi. PHPUnit major yangilanishidagi o'zgarishlar (masalan, docblock annotatsiyalarining olib tashlanishi) PHPUnit klassli testlarga Pest orqali ham ta'sir qiladi.",
    "",
    "### Vositalar",
    "IDE (PhpStorm Pest plugin'i), coverage, CI hisobotlari (`--log-junit`), Infection (Pest 3 o'zining `--mutate` i ham bor) — ikkala uslub bilan ishlaydi.",
    "",
    "### Jamoa qarori",
    "Aralash holat vaqtinchalik bo'lishi mumkin, lekin uzoq muddatda bitta uslub (yangi testlar uchun) va kod review'da qoida kerak."
  ],
  "examples": [
    {
      "title": "Bitta loyihada ikkala uslub",
      "lang": "php",
      "code": [
        "// tests/Unit/Legacy/TaxCalculatorTest.php — PHPUnit klassi, o'zgarishsiz ishlaydi",
        "final class TaxCalculatorTest extends TestCase",
        "{",
        "    #[DataProvider('rates')]",
        "    public function test_calculates_vat(int $amount, int $expected): void",
        "    {",
        "        $this->assertSame($expected, (new TaxCalculator())->vat($amount));",
        "    }",
        "",
        "    public static function rates(): array { return [[100_000, 12_000], [0, 0]]; }",
        "}",
        "",
        "// tests/Unit/DiscountTest.php — yangi Pest testi",
        "it('applies discount', fn () => expect((new Discount())->apply(1_100_000))->toBe(990_000));"
      ]
    },
    {
      "title": "Drift bilan konvertatsiya",
      "lang": "bash",
      "code": [
        "composer require pestphp/pest-plugin-drift --dev",
        "./vendor/bin/pest --drift tests/Unit/Legacy",
        "git diff tests/Unit/Legacy   # natijani ko'rib chiqish",
        "./vendor/bin/pest"
      ]
    }
  ],
  "pitfalls": [
    "Pest'ga o'tish uchun barcha testlarni birdaniga qayta yozish.",
    "PHPUnit'ni Pest talab qilgan versiyadan boshqasiga majburlash.",
    "Drift natijasini ko'rib chiqmasdan commit qilish.",
    "Aralash uslubni doimiy holatga aylantirish va yangi testlar uchun qoida belgilamaslik."
  ]
});
