/* Chuqur dars: 26.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.4", {
  "lesson": [
    "### Dataset — Pest'dagi data provider",
    "Bir xil mantiqni turli ma'lumotlar bilan sinash uchun (25.4, 25.9). Ikki yo'l:",
    "",
    "**1. Inline `->with()`:**",
    "`it('validates quantity', function (int $qty, bool $valid) { ... })->with([[0, false], [1, true], [1000, false]]);`",
    "",
    "**2. Nomlangan `dataset()`** — qayta ishlatiladigan, odatda `tests/Datasets/` papkasida yoki `Pest.php` da:",
    "`dataset('invalid emails', ['', 'abc', 'a@', '@x.uz']);` va `->with('invalid emails')`.",
    "",
    "### Kalitli holatlar",
    "Massiv kalitlari holat nomi bo'ladi va natijada ko'rinadi: `->with(['zero' => [0, false], 'max' => [999, true]])` → `✓ validates quantity with dataset \"zero\"`. Doim nom bering.",
    "",
    "### Lazy (yopilma) qiymatlar",
    "PHPUnit provider'lari kabi dataset ham testdan **oldin** hisoblanadi va o'sha paytda Laravel ilovasi hali yo'q. Factory yoki DB kerak bo'lsa, qiymatni **yopilma** sifatida bering: `->with([fn () => User::factory()->admin()->create()])`. Pest yopilmani test ichida, `setUp` dan keyin chaqiradi va natijani argument sifatida uzatadi.",
    "",
    "### Kombinatsiyalar (cartesian product)",
    "Bir nechta dataset: `->with(['admin', 'manager'])->with(['GET', 'POST'])` — 2 × 2 = 4 holat. Ruxsatlar matritsasi (19.15) uchun qulay, lekin kombinatsiyalar tez ko'payadi.",
    "",
    "### Generator",
    "Katta yoki hisoblanadigan ma'lumotlar: `dataset('tariffs', function () { yield 'tashkent 1kg' => ['tashkent', 1, 15000]; ... });`.",
    "",
    "### Bound datasets",
    "Pest dataset elementiga `$this` bog'langan yopilma berish imkonini beradi: `->with([fn () => $this->user])` — `beforeEach` da yaratilgan holatdan foydalanish.",
    "",
    "### Qachon dataset emas",
    "Har holat turli Arrange yoki turli Assert talab qilsa, alohida `it()` lar aniqroq (25.4)."
  ],
  "examples": [
    {
      "title": "Nomlangan dataset va inline",
      "lang": "php",
      "code": [
        "// tests/Datasets/Phones.php",
        "dataset('uzbek phones', [",
        "    'normalized' => ['+998901234567', '+998901234567'],",
        "    'without plus' => ['998901234567', '+998901234567'],",
        "    'local' => ['901234567', '+998901234567'],",
        "    'with spaces' => ['+998 90 123-45-67', '+998901234567'],",
        "]);",
        "",
        "// tests/Unit/PhoneNormalizerTest.php",
        "it('normalizes uzbek phones', function (string $input, string $expected) {",
        "    expect(PhoneNormalizer::normalize($input))->toBe($expected);",
        "})->with('uzbek phones');"
      ]
    },
    {
      "title": "Lazy qiymatlar va kombinatsiya",
      "lang": "php",
      "code": [
        "it('forbids non-owners from editing an order', function (User $user, string $method) {",
        "    $order = Order::factory()->create();",
        "    $this->actingAs($user);",
        "",
        "    $this->json($method, \"/api/v1/orders/{$order->id}\", ['note' => 'x'])->assertForbidden();",
        "})->with([",
        "    'viewer' => fn () => User::factory()->withRole('viewer')->create(),",
        "    'other tenant manager' => fn () => User::factory()->withRole('manager')->create(),",
        "])->with(['PATCH', 'DELETE']);"
      ],
      "note": "Yopilma test ichida, ilova yuklangandan keyin chaqiriladi va natijasi `User $user` argumenti sifatida uzatiladi."
    }
  ],
  "pitfalls": [
    "Dataset'da to'g'ridan-to'g'ri `User::factory()->create()` chaqirish: ilova hali yuklanmagan va xato beradi.",
    "Nomsiz holatlar: yiqilganda qaysi biri ekani `#3` bo'lib ko'rinadi.",
    "Bir nechta `->with()` kombinatsiyalarining sonini hisobga olmaslik: o'nlab sekin feature testlar.",
    "Har holat uchun alohida mantiqni dataset'ga `if` bilan sig'dirish."
  ]
});
