/* Chuqur dars: 25.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.18", {
  "lesson": [
    "### Flaky test nima",
    "Flaky (beqaror) test — kod o'zgarmasa ham ba'zan o'tadi, ba'zan yiqiladi. Uning zarari faqat vaqt yo'qotish emas: jamoa testlarga **ishonmay qo'yadi**. \"Qizil pipeline\" odatiy holga aylanadi va haqiqiy xatolar ham \"yana flaky\" deb e'tiborsiz qoldiriladi.",
    "",
    "### Odatiy sabablar va yechimlar",
    "**1. Vaqt.** `now()` ga bog'liq testlar: yarim tunda, oy oxirida, kabisa yilida, yoz vaqtiga o'tishda yiqiladi. \"Bugun yaratilgan\" testi 23:59:59 da ishga tushib, 00:00:01 da tekshiradi. **Yechim:** `$this->travelTo('2025-06-10 12:00:00')` yoki `Carbon::setTestNow()`, vaqtni parametr qilish (25.11).",
    "",
    "**2. Tasodifiylik.** Faker qiymatlari: `fake()->numberBetween(1, 100)` ba'zan chegarani buzadi, `unique()` to'qnashadi, tasodifiy email allaqachon mavjud. **Yechim:** testga muhim qiymatlarni aniq bering, `fake()->seed(1234)`.",
    "",
    "**3. Tartib va izolyatsiya** (25.14). Test boshqa test qoldirgan holatga bog'liq. **Yechim:** `--order-by=random` bilan aniqlash.",
    "",
    "**4. Tartiblanmagan natijalar.** `orderBy` siz so'rov natijasini `assertSame([1, 2, 3], ...)` bilan solishtirish: DB tartibni kafolatlamaydi. **Yechim:** `orderBy` yoki `assertEqualsCanonicalizing`.",
    "",
    "**5. Asinxronlik.** Queue, event yoki brauzer (Dusk) testlarida \"hali tugamagan\" amal. **Yechim:** testlarda `QUEUE_CONNECTION=sync` yoki `Queue::fake()`, Dusk'da `waitFor()`, `sleep()` emas.",
    "",
    "**6. Tashqi bog'liqliklar.** Haqiqiy tarmoq, DNS, uchinchi tomon API, vaqtincha mavjud bo'lmagan servis. **Yechim:** `Http::fake()`, `Http::preventStrayRequests()`.",
    "",
    "**7. Parallel testlar.** Umumiy resurslar: bir xil fayl yo'li, bir xil Redis kaliti, bir xil port. **Yechim:** `ParallelTesting::token()` bilan noyob nomlar, `Storage::fake()`.",
    "",
    "**8. Float va sana formatlari.** Lokal muhitga bog'liq natijalar (timezone, locale). **Yechim:** testlarda aniq timezone va locale.",
    "",
    "**9. Resurs chegaralari.** CI'da kamroq xotira yoki CPU: timeout'lar. **Yechim:** testlarda qisqa, lekin real vaqtga bog'liq bo'lmagan mantiq.",
    "",
    "### Diagnostika jarayoni",
    "1. **Takrorlash:** `--repeat=50` (PHPUnit 10.x+ / Pest), `--order-by=random --random-order-seed=X` (CI log'idagi seed bilan), `--parallel`.",
    "2. **Ma'lumot yig'ish:** yiqilganda qo'shimcha kontekst (vaqt, tasodifiy qiymatlar, DB holati) log'ga.",
    "3. **Ildiz sababni tuzatish**, retry qo'shish emas.",
    "4. Darhol tuzatib bo'lmasa: **karantin** — `#[Group('quarantine')]` va asosiy CI'dan chiqarish, lekin issue bilan va muddat bilan. Karantin \"o'chirib qo'yish\" emas.",
    "",
    "### Metrika",
    "CI tizimlari (GitLab test reports) qaysi testlar tez-tez yiqilishini ko'rsatadi. Flaky testlar ro'yxatini kuzating va nolga intiling."
  ],
  "examples": [
    {
      "title": "Vaqt va tartib bilan bog'liq flaky testni tuzatish",
      "lang": "php",
      "code": [
        "// FLAKY: yarim tun atrofida va tartib bo'yicha yiqiladi",
        "public function test_lists_todays_orders(): void",
        "{",
        "    Order::factory()->count(3)->create();",
        "    $ids = $this->getJson('/api/v1/orders/today')->json('data.*.id');",
        "    $this->assertSame(Order::pluck('id')->all(), $ids);",
        "}",
        "",
        "// BARQAROR",
        "public function test_lists_todays_orders(): void",
        "{",
        "    $this->travelTo('2025-06-10 12:00:00');",
        "",
        "    $today = Order::factory()->count(3)->create(['created_at' => now()]);",
        "    Order::factory()->create(['created_at' => now()->subDay()]);",
        "",
        "    $ids = $this->getJson('/api/v1/orders/today')->json('data.*.id');",
        "",
        "    $this->assertEqualsCanonicalizing($today->pluck('id')->all(), $ids);",
        "}"
      ]
    },
    {
      "title": "Takrorlash va parallel uchun noyob resurslar",
      "lang": "bash",
      "code": [
        "php artisan test --filter=test_lists_todays_orders --repeat=100",
        "php artisan test --order-by=random --random-order-seed=1749553200",
        "",
        "# Parallel testda noyob fayl nomi (PHP):",
        "# $path = storage_path('app/tmp/export-' . ParallelTesting::token() . '.csv');"
      ]
    }
  ],
  "pitfalls": [
    "Flaky testni CI'da avtomatik retry bilan \"tuzatish\": ildiz sabab qoladi va haqiqiy xatolar yashirinadi.",
    "`sleep()` bilan asinxronlik muammosini hal qilish.",
    "Karantindagi testlarni unutib qo'yish.",
    "`orderBy` siz natijalarni aniq tartib bilan solishtirish."
  ]
});
