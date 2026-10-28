/* Chuqur dars: 25.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.1", {
  "lesson": [
    "### Test klassi",
    "PHPUnit'da test — `PHPUnit\\Framework\\TestCase` (Laravel'da `Tests\\TestCase`, u framework'ni yuklaydi) dan meros olgan klassdagi metod. Konvensiyalar:",
    "- Fayl va klass nomi `...Test` bilan tugaydi: `OrderTotalCalculatorTest.php`.",
    "- Test metodlari `test` prefiksi bilan (`testAppliesDiscount`) yoki `#[Test]` atributi bilan (PHPUnit 10+). Eski `@test` docblock annotatsiyasi PHPUnit 11 da deprecated, 12 da olib tashlangan.",
    "- Test metodi `public` va `void` qaytaradi.",
    "- Papkalar: `tests/Unit` (framework'siz, tez) va `tests/Feature` (Laravel ilovasi bilan).",
    "",
    "### Arrange — Act — Assert",
    "Har test uchta aniq qismdan iborat (AAA, yoki Given–When–Then):",
    "1. **Arrange:** kerakli holatni tayyorlash (obyektlar, ma'lumotlar, soxta bog'liqliklar).",
    "2. **Act:** **bitta** tekshirilayotgan amalni bajarish.",
    "3. **Assert:** natijani tekshirish.",
    "",
    "Bo'sh qatorlar bilan ajratish o'qishni osonlashtiradi. Act qismi bitta qator bo'lishi ideal.",
    "",
    "### Yaxshi test xususiyatlari",
    "- **Bitta xulq-atvor:** bitta test bitta narsani tekshiradi. Bir nechta assert mumkin, lekin ular bitta natija haqida. Test yiqilganda nomi nima buzilganini aytsin.",
    "- **Tavsifiy nom:** `testCalculate` emas, `test_applies_ten_percent_discount_for_orders_above_one_million`. snake_case nomlar uzun gaplarni o'qishni osonlashtiradi (PHPUnit ikkalasini ham qabul qiladi).",
    "- **Mustaqil:** boshqa testlarga va ishga tushirish tartibiga bog'liq emas (25.14).",
    "- **Deterministik:** har safar bir xil natija. Vaqt, tasodifiy sonlar, tarmoq nazorat ostida (25.18).",
    "- **Tez:** unit test millisekundlar.",
    "- **Xulq-atvorni tekshiradi, ichki tuzilmani emas:** private metodlarni to'g'ridan-to'g'ri test qilmang, ularni public API orqali tekshiring. Aks holda har refactoring testlarni sindiradi.",
    "",
    "### Ishga tushirish",
    "- `vendor/bin/phpunit` yoki Laravel'da `php artisan test` (chiroyli chiqish, `--parallel`).",
    "- Filtr: `--filter=OrderTotal`, `--filter='test_applies_discount'`.",
    "- Guruh: `#[Group('slow')]` va `--group=slow`, `--exclude-group=slow`.",
    "- Bitta fayl: `php artisan test tests/Unit/OrderTotalCalculatorTest.php`."
  ],
  "examples": [
    {
      "title": "AAA tuzilmasidagi unit test",
      "lang": "php",
      "code": [
        "namespace Tests\\Unit;",
        "",
        "use App\\Pricing\\OrderTotalCalculator;",
        "use PHPUnit\\Framework\\Attributes\\Test;",
        "use PHPUnit\\Framework\\TestCase;",
        "",
        "final class OrderTotalCalculatorTest extends TestCase",
        "{",
        "    #[Test]",
        "    public function applies_ten_percent_discount_above_one_million(): void",
        "    {",
        "        // Arrange",
        "        $calculator = new OrderTotalCalculator(discountThreshold: 1_000_000, discountPercent: 10);",
        "",
        "        // Act",
        "        $total = $calculator->total([600_000, 500_000]);",
        "",
        "        // Assert",
        "        $this->assertSame(990_000, $total);",
        "    }",
        "",
        "    #[Test]",
        "    public function does_not_discount_below_threshold(): void",
        "    {",
        "        $calculator = new OrderTotalCalculator(discountThreshold: 1_000_000, discountPercent: 10);",
        "",
        "        $this->assertSame(900_000, $calculator->total([400_000, 500_000]));",
        "    }",
        "}"
      ]
    },
    {
      "title": "Ishga tushirish",
      "lang": "bash",
      "code": [
        "php artisan test",
        "php artisan test --filter=OrderTotalCalculator",
        "php artisan test tests/Unit --stop-on-failure",
        "vendor/bin/phpunit --testdox     # testlar nomini gap sifatida chiqaradi"
      ]
    }
  ],
  "pitfalls": [
    "Bitta testda bir nechta mustaqil xulq-atvorni tekshirish: yiqilganda nima buzilgani noaniq.",
    "`testCalculate` kabi ma'nosiz nomlar.",
    "Private metodlarni reflection bilan test qilish: refactoring testlarni sindiradi.",
    "Unit testni Laravel `TestCase` dan meros qilib, keraksiz framework yuklash bilan sekinlashtirish."
  ]
});
