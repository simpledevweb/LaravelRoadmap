/* Chuqur dars: 28.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.11", {
  "lesson": [
    "### Integratsion testlar uchun ma'lumot",
    "Integratsion testlar haqiqiy DB bilan ishlaydi, shuning uchun ma'lumotni qanday tayyorlash katta ahamiyatga ega. Yomon yondashuv testlarni bir-biriga bog'laydi va ularni tushunish qiyin qiladi.",
    "",
    "### Uch xil ma'lumot",
    "1. **Ma'lumotnoma (reference) ma'lumotlari**: mamlakatlar, valyutalar, rollar, ruxsatlar. Ular kam o'zgaradi va hamma testga kerak. Seeder bilan bir marta yuklanadi (`$this->seed(CurrencySeeder::class)`).",
    "2. **Test ma'lumoti**: har test o'zi uchun kerak bo'lgan minimal holatni **factory** bilan yaratadi. Test ichida ko'rinib turadi: nimaga tayanayotgani aniq.",
    "3. **Hajmli ma'lumot**: pagination, qidiruv, performance testlari uchun ko'p yozuv kerak. Buni maxsus seeder bilan, alohida guruhda (sekin testlar) yarating.",
    "",
    "### Qoidalar",
    "- **Umumiy katta fixture'ga tayanmang.** Bitta o'zgartirish o'nlab testni sindiradi va nima uchun yiqilganini topish qiyin.",
    "- **Minimal ma'lumot.** Test faqat kerakli maydonlarni belgilaydi, qolganini factory to'ldiradi. Muhim qiymat testda ochiq ko'rinsin.",
    "- **Id va tartibga tayanmang.** `id = 1` ni qattiq yozish yoki tartib `orderBy`siz saqlanadi deb o'ylash flaky testga olib keladi.",
    "- **Faker unikalligi.** `fake()->unique()` ko'p yozuv yaratilganda tugab qolishi mumkin. Unikal maydonlar uchun ketma-ketlik (`sequence`) yoki aniq qiymat afzal.",
    "- **Sezgir ma'lumot.** Production'dan nusxalangan haqiqiy ma'lumotni testda ishlatmang. Anonimlashtirilgan yoki sintetik ma'lumot yarating.",
    "",
    "### Factory holatlari",
    "Factory'da nomlangan holatlar (`unpaid()`, `overdue()`, `suspended()`) testni o'qiladigan qiladi: `Invoice::factory()->overdue()->create()`. Murakkab bog'lanishlar uchun `for()`, `has()`, `recycle()` kabi metodlar qo'l keladi."
  ],
  "examples": [
    {
      "title": "Seeder va factory aralashmasi",
      "lang": "php",
      "code": [
        "beforeEach(fn () => $this->seed(CurrencySeeder::class));",
        "",
        "it('converts using the latest rate', function () {",
        "    ExchangeRate::factory()->create(['pair' => 'USD/UZS', 'rate' => 12_700, 'date' => today()]);",
        "    ExchangeRate::factory()->create(['pair' => 'USD/UZS', 'rate' => 12_000, 'date' => today()->subDay()]);",
        "",
        "    expect(app(Converter::class)->toUzs(Money::usd(10)))->toEqual(Money::uzs(127_000));",
        "});"
      ],
      "note": "Muhim qiymatlar (kurs, sana) testning o'zida ko'rinib turadi."
    },
    {
      "title": "Nomlangan holat va bog'lanish",
      "lang": "php",
      "code": [
        "// database/factories/InvoiceFactory.php",
        "public function overdue(): static",
        "{",
        "    return $this->state(fn () => [",
        "        'status' => 'unpaid',",
        "        'due_at' => now()->subDays(5),",
        "    ]);",
        "}",
        "",
        "// testda",
        "$customer = Customer::factory()->has(Invoice::factory()->overdue()->count(3))->create();",
        "",
        "expect($customer->invoices)->toHaveCount(3);"
      ],
      "note": "Holat nomi niyatni ifodalaydi, `has()` bog'liq yozuvlarni yaratadi."
    }
  ],
  "pitfalls": [
    "Hamma testlar tayanadigan bitta katta fixture: bir o'zgarish ko'plab testni sindiradi.",
    "Qattiq yozilgan id va tartibga tayanish: testlar boshqa tartibda yoki parallel ishlaganda yiqiladi.",
    "`fake()->unique()` bilan ko'p yozuv yaratish: unikal qiymatlar tugab, `OverflowException` chiqadi.",
    "Production ma'lumotini testda ishlatish: shaxsiy ma'lumot sizib chiqishi va xavfsizlik muammosi paydo bo'ladi."
  ]
});
