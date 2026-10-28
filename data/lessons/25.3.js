/* Chuqur dars: 25.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.3", {
  "lesson": [
    "### Fixture nima",
    "**Test fixture** — test bajarilishi uchun kerak bo'lgan ma'lum, barqaror boshlang'ich holat: obyektlar, DB yozuvlari, fayllar, konfiguratsiya. Uning maqsadi — test har safar **bir xil sharoitda** ishlashini ta'minlash.",
    "",
    "### Fixture turlari",
    "**1. Inline (test ichida).** Kerakli obyektlar testning Arrange qismida yaratiladi. Eng aniq: test o'qiganda nima tayyorlangani darhol ko'rinadi. Default tanlov.",
    "",
    "**2. Umumiy setUp (25.5).** Bir nechta testda bir xil holat bo'lsa. Ehtiyot: juda ko'p narsa `setUp` ga ko'chsa, har test aslida nimaga bog'liqligi yashirinadi (\"mystery guest\").",
    "",
    "**3. Factory'lar** (Laravel, 13.18). DB yozuvlari uchun eng qulay: `User::factory()->admin()->create()`. Har test faqat o'ziga muhim atributlarni ko'rsatadi, qolganlari default. Test o'qilishi oson va ortiqcha tafsilotlarsiz.",
    "",
    "**4. Builder va Object Mother naqshlari.** Murakkab domen obyektlari uchun: `OrderBuilder::anOrder()->withItems(3)->paid()->build()`. Factory'ga o'xshash, lekin DB'siz obyektlar uchun.",
    "",
    "**5. Fayl fixture'lari.** `tests/Fixtures/` papkasida: tashqi API javoblari (JSON), webhook payload'lari (24.17), import uchun CSV, test rasmlari. Haqiqiy ma'lumot namunalari, o'ylab topilganlari emas.",
    "",
    "**6. Seeder'lar.** Reference ma'lumotlar (rollar, valyutalar) uchun `$this->seed(RoleSeeder::class)` yoki `$seed = true`. Butun demo bazani har testga yuklash — sekin va mo'rt.",
    "",
    "### Shared vs fresh fixture",
    "- **Fresh:** har test uchun yangidan. Izolyatsiya kafolatlangan. Default.",
    "- **Shared:** bir nechta test bitta fixture'ni ishlatadi (`setUpBeforeClass`, statik). Tezroq, lekin bir test uni o'zgartirsa, boshqasi ta'sirlanadi. Faqat o'zgarmas (read-only) va qimmat resurslar uchun.",
    "",
    "### Yaxshi fixture qoidalari",
    "- **Minimal:** test uchun kerak bo'lganidan ko'p emas. 100 ta foydalanuvchi kerak bo'lmasa, yaratmang.",
    "- **Tegishli qiymatlar aniq:** testga muhim qiymatni (`'stock' => 0`) aniq yozing, default'ga tayanmang. Factory default'i keyin o'zgarsa, test jim buziladi.",
    "- **Tasodifiylik nazorat ostida:** Faker qiymatlari test natijasiga ta'sir qilmasin. Ta'sir qilsa, aniq qiymat bering.",
    "- **Fayllar vaqtinchalik:** test yaratgan fayllarni tozalang yoki `Storage::fake()`."
  ],
  "examples": [
    {
      "title": "Factory bilan aniq fixture",
      "lang": "php",
      "code": [
        "public function test_out_of_stock_product_cannot_be_ordered(): void",
        "{",
        "    // Testga muhim qiymat aniq: stock = 0",
        "    $product = Product::factory()->create(['stock' => 0]);",
        "    $user = User::factory()->create();",
        "",
        "    $this->actingAs($user)",
        "        ->postJson('/api/v1/orders', ['items' => [['product_id' => $product->id, 'qty' => 1]]])",
        "        ->assertUnprocessable()",
        "        ->assertJsonPath('code', 'out_of_stock');",
        "}"
      ]
    },
    {
      "title": "Fayl fixture va Object Mother",
      "lang": "php",
      "code": [
        "// tests/Fixtures/click/prepare_request.json — haqiqiy so'rov namunasi",
        "protected function fixture(string $path): array",
        "{",
        "    return json_decode(file_get_contents(base_path(\"tests/Fixtures/{$path}\")), true, flags: JSON_THROW_ON_ERROR);",
        "}",
        "",
        "// Object Mother: DB'siz domen obyektlari",
        "final class Orders",
        "{",
        "    public static function paidWithItems(int $count = 2): Order",
        "    {",
        "        $order = new Order(id: OrderId::generate(), status: OrderStatus::Paid);",
        "        foreach (range(1, $count) as $i) {",
        "            $order->addItem(new OrderItem(sku: \"SKU-{$i}\", qty: 1, price: Money::uzs(50_000)));",
        "        }",
        "        return $order;",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Barcha testlar uchun bitta katta umumiy fixture: har test nimaga bog'liqligi noaniq va o'zgarishlar ko'p testni sindiradi.",
    "Testga muhim qiymatlarni factory default'iga qoldirish.",
    "Shared (statik) fixture'ni o'zgartiruvchi testlar: tartibga bog'liq yiqilishlar.",
    "O'ylab topilgan tashqi API javoblari bilan test: haqiqiy formatga mos kelmaydi."
  ]
});
