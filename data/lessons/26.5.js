/* Chuqur dars: 26.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.5", {
  "lesson": [
    "### Hook'lar",
    "PHPUnit'ning `setUp`/`tearDown` metodlari (25.5) Pest'da funksiyalar:",
    "- `beforeEach(fn)` — har testdan oldin (`setUp`).",
    "- `afterEach(fn)` — har testdan keyin (`tearDown`).",
    "- `beforeAll(fn)` — fayldagi birinchi testdan oldin bir marta (`setUpBeforeClass`). Laravel ilovasi hali yo'q.",
    "- `afterAll(fn)` — oxirgi testdan keyin bir marta.",
    "",
    "### Doira",
    "- **Fayl darajasida:** fayl boshida yozilsa, fayldagi barcha testlarga.",
    "- **`describe` ichida:** faqat shu blok testlariga (26.2). Tashqi `beforeEach` avval, ichkisi keyin ishlaydi.",
    "- **Global (`tests/Pest.php`):** `pest()->beforeEach(fn () => ...)->in('Feature')` yoki `uses()->beforeEach()` — ko'rsatilgan papkadagi barcha testlarga.",
    "",
    "### $this orqali holat",
    "`beforeEach` yopilmasi ham test klassiga bog'langan: `$this->user = User::factory()->create();` va keyin testda `$this->user`. Bu PHPUnit'dagi `private User $user` xususiyatiga teng. Har test yangi nusxa, shuning uchun holat testlar orasida oqib ketmaydi.",
    "",
    "Pest 3: IDE va statik tahlil uchun `$this` turi `tests/Pest.php` dagi `extend()` klassidan aniqlanadi. Dinamik xususiyatlar o'rniga ko'pincha mahalliy o'zgaruvchilar yoki yordamchi funksiyalar aniqroq.",
    "",
    "### Laravel bilan",
    "`beforeEach` Laravel `setUp()` dan **keyin** ishlaydi, shuning uchun factory, fake va konfiguratsiya mavjud. `parent::setUp()` ni chaqirish shart emas: Pest buni o'zi boshqaradi.",
    "",
    "Odatiy foydalanish:",
    "- `Queue::fake()`, `Http::preventStrayRequests()`, `Storage::fake('s3')`;",
    "- `$this->travelTo(...)` (vaqtni qotirish);",
    "- umumiy foydalanuvchi va tenant.",
    "",
    "### Ehtiyot",
    "Hook'lar testning nimaga bog'liqligini yashiradi (25.5). `beforeEach` da faqat ko'pchilik testlarga taalluqli va testning mohiyatiga ta'sir qilmaydigan narsalar. Test natijasini belgilovchi ma'lumotlar (\"buyurtma to'langan\", \"stock = 0\") testning o'zida.",
    "",
    "`beforeAll` da DB yoki factory — xato: ilova va tranzaksiya hali yo'q va ma'lumot `RefreshDatabase` doirasidan tashqarida qoladi."
  ],
  "examples": [
    {
      "title": "Fayl va describe darajasidagi hook'lar",
      "lang": "php",
      "code": [
        "beforeEach(function () {",
        "    Queue::fake();",
        "    $this->travelTo('2025-06-10 12:00:00');",
        "    $this->customer = Customer::factory()->create();",
        "});",
        "",
        "describe('paid orders', function () {",
        "    beforeEach(fn () => $this->order = Order::factory()->for($this->customer)->paid()->create());",
        "",
        "    it('can be refunded within 14 days', function () {",
        "        $this->travel(13)->days();",
        "        expect($this->order->canBeRefunded())->toBeTrue();",
        "    });",
        "",
        "    it('cannot be refunded after 14 days', function () {",
        "        $this->travel(15)->days();",
        "        expect($this->order->canBeRefunded())->toBeFalse();",
        "    });",
        "});"
      ]
    },
    {
      "title": "Global hook (tests/Pest.php)",
      "lang": "php",
      "code": [
        "pest()->extend(Tests\\TestCase::class)",
        "    ->use(RefreshDatabase::class)",
        "    ->beforeEach(function () {",
        "        Http::preventStrayRequests();",
        "    })",
        "    ->in('Feature');"
      ]
    }
  ],
  "pitfalls": [
    "`beforeAll` da factory yoki DB ishlatish.",
    "Test natijasini belgilovchi ma'lumotlarni `beforeEach` ga yashirish.",
    "Global hook'lar ko'payib, har test nima qilishini tushunish qiyinlashishi.",
    "`afterEach` da global holatni (statik xususiyatlar, timezone) tiklashni unutish."
  ]
});
