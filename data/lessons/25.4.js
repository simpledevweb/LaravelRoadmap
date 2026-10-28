/* Chuqur dars: 25.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.4", {
  "lesson": [
    "### Data provider nima",
    "Data provider — bitta test metodini **turli kirish ma'lumotlari** bilan bir necha marta ishga tushirish mexanizmi. Bir xil mantiqni 10 ta deyarli bir xil test metodi bilan yozish o'rniga — bitta test va ma'lumotlar jadvali.",
    "",
    "### Sintaksis (PHPUnit 10+)",
    "- Provider — **public static** metod, `iterable` (massiv yoki generator) qaytaradi.",
    "- Har element — test metodiga uzatiladigan argumentlar massivi.",
    "- Test metodida `#[DataProvider('providerName')]` atributi.",
    "- Eski `@dataProvider` docblock'i PHPUnit 11 da deprecated, 12 da olib tashlangan. Non-static provider'lar PHPUnit 10 dan beri qo'llanmaydi.",
    "",
    "### Nomlangan holatlar",
    "Massiv kalitlari holat nomi bo'ladi: `'zero quantity' => [0, false]`. Test yiqilganda PHPUnit `with data set \"zero quantity\"` deb ko'rsatadi, `#3` emas. Doim nom bering.",
    "",
    "Generator bilan: `yield 'zero quantity' => [0, false];` — katta yoki hisoblanadigan ma'lumotlar uchun qulay.",
    "",
    "### Qachon foydali",
    "- Validatsiya qoidalari: to'g'ri va noto'g'ri qiymatlar ro'yxati.",
    "- Hisob-kitob: kirish va kutilgan natija jadvali (soliq, chegirma, konvertatsiya).",
    "- Chegara qiymatlar (boundary values): 0, 1, max, max+1, manfiy.",
    "- Ruxsatlar matritsasi: rol × amal → kutilgan natija (19.15).",
    "- Formatlash va parsing: telefon raqamlari, sanalar.",
    "",
    "### Qachon emas",
    "Har holat **boshqacha** Arrange yoki Assert talab qilsa (har birida `if` lar), alohida testlar aniqroq. Data provider faqat **bir xil mantiq**, turli ma'lumot uchun.",
    "",
    "### Cheklovlar",
    "- Provider'lar `setUp()` dan **oldin** va framework yuklanishidan oldin ishlaydi. Unda Laravel servislari, factory'lar va DB ishlamaydi. Provider faqat oddiy qiymatlarni qaytarsin, modellarni test ichida yarating. Yopilma (closure) qaytarish mumkin, u test ichida chaqiriladi.",
    "- Har data set — alohida test: `setUp`/`tearDown` har biri uchun.",
    "",
    "### TestWith",
    "Qisqa holatlar uchun provider metodisiz: `#[TestWith([0, false])]`, `#[TestWith([1, true])]` to'g'ridan-to'g'ri test ustida.",
    "",
    "### Pest'da",
    "`->with([...])` va `dataset()` (26.x) — xuddi shu g'oya qisqaroq sintaksisda."
  ],
  "examples": [
    {
      "title": "Nomlangan holatlar bilan provider",
      "lang": "php",
      "code": [
        "use PHPUnit\\Framework\\Attributes\\DataProvider;",
        "use PHPUnit\\Framework\\Attributes\\Test;",
        "",
        "final class PhoneNormalizerTest extends TestCase",
        "{",
        "    public static function phones(): iterable",
        "    {",
        "        yield 'already normalized' => ['+998901234567', '+998901234567'];",
        "        yield 'without plus' => ['998901234567', '+998901234567'];",
        "        yield 'local 9 digits' => ['901234567', '+998901234567'];",
        "        yield 'with spaces and dashes' => ['+998 90 123-45-67', '+998901234567'];",
        "        yield 'with brackets' => ['+998 (90) 123 45 67', '+998901234567'];",
        "    }",
        "",
        "    #[Test]",
        "    #[DataProvider('phones')]",
        "    public function normalizes_uzbek_numbers(string $input, string $expected): void",
        "    {",
        "        $this->assertSame($expected, PhoneNormalizer::normalize($input));",
        "    }",
        "}"
      ]
    },
    {
      "title": "Chegara qiymatlar va TestWith",
      "lang": "php",
      "code": [
        "#[Test]",
        "#[TestWith([0, false])]",
        "#[TestWith([1, true])]",
        "#[TestWith([999, true])]",
        "#[TestWith([1000, false])]",
        "#[TestWith([-1, false])]",
        "public function validates_quantity(int $qty, bool $valid): void",
        "{",
        "    $this->assertSame($valid, Quantity::isValid($qty));",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Provider'da factory yoki DB ishlatish: framework hali yuklanmagan, xato beradi.",
    "Nomsiz data set'lar: yiqilganda qaysi holat ekani noaniq.",
    "Har holat uchun turli mantiqni provider'ga majburlab sig'dirish: test `if` lar bilan to'ladi.",
    "Non-static provider: PHPUnit 10+ da ishlamaydi."
  ]
});
