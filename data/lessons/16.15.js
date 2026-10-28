/* Chuqur dars: 16.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.15", {
  "lesson": [
    "### ORM SQL'ni yashiradi",
    "Eloquent qulay, lekin har bir metod qaysi SQL'ga aylanishini ko'rmaysiz. Chiroyli PHP kodi sekin so'rov yashirishi mumkin. Senior dasturchi odati: **har yangi murakkab so'rovni yozganda uning SQL'ini va rejasini bir marta ko'rish.**",
    "",
    "### SQL'ni ko'rish vositalari",
    "- `->toSql()`: `?` belgilari bilan SQL.",
    "- `->toRawSql()` (Laravel 10.15+): binding'lar qo'yilgan, DB klientiga ko'chirsa bo'ladigan SQL.",
    "- `->dump()`, `->dd()`, `->ddRawSql()`: debug.",
    "- `->explain()`: reja (16.1).",
    "- `DB::listen(fn (QueryExecuted $q) => ...)`: barcha so'rovlarni vaqti bilan log qilish.",
    "- `DB::enableQueryLog()` va `DB::getQueryLog()`: testlarda.",
    "- **Laravel Debugbar:** sahifa bo'yicha so'rovlar soni, vaqti, dublikatlar.",
    "- **Telescope:** so'rovlar, sekin so'rovlar (`slow` belgisi), qaysi kod qatoridan chaqirilgani.",
    "- Production: APM (Sentry Performance, New Relic) va DB slow log.",
    "",
    "### Tipik ORM muammolari",
    "1. **N+1:** `foreach` ichida munosabatga murojaat (13.12). Debugbar'da bir xil so'rov 50 marta.",
    "2. **SELECT *:** barcha ustunlar (16.9).",
    "3. **whereHas'ning EXISTS subquery'si:** katta jadvalda ichki shart selektiv bo'lsa, `whereIn` + subquery yoki JOIN tezroq bo'lishi mumkin (16.8).",
    "4. **Sargable bo'lmagan helper'lar:** `whereDate`, `whereYear` (16.6).",
    "5. **Kolleksiyada hisoblash:** `$user->posts->count()` (barchasini yuklaydi) va `$user->posts()->count()` (SQL `COUNT`).",
    "6. **Takroriy so'rovlar:** bir sahifada `auth()->user()->roles` 10 marta. Natijani o'zgaruvchida saqlang yoki `once()` (Laravel 11+).",
    "7. **`withCount` + `having`** murakkab subquery'lar yaratadi.",
    "8. **Global scope'lar** qo'shgan kutilmagan shartlar va JOIN'lar.",
    "",
    "### Testlarda so'rovlar sonini cheklash",
    "Regressiyani avtomatik ushlash uchun muhim sahifalar testida so'rovlar sonini tekshiring. Biror kishi `with()` ni olib tashlasa, test yiqiladi. Laravel 11+ da `DB::listen` asosida o'zingiz assertion yozishingiz yoki `expectsDatabaseQueryCount()` (Laravel 11.x) ishlatishingiz mumkin.",
    "",
    "### Sekin so'rovlarni production'da ushlash",
    "`DB::whenQueryingForLongerThan(500, fn ($connection, $event) => Log::warning(...))` (Laravel 9.18+): bitta so'rov yoki so'rov davomida jami DB vaqti chegaradan oshsa, xabar beradi."
  ],
  "examples": [
    {
      "title": "Eloquent qanday SQL yaratadi",
      "lang": "php",
      "code": [
        "echo Order::whereHas('items', fn ($q) => $q->where('qty', '>', 5))->toRawSql();",
        "// select * from \"orders\" where exists (select * from \"order_items\"",
        "//   where \"orders\".\"id\" = \"order_items\".\"order_id\" and \"qty\" > 5)",
        "",
        "echo Order::whereYear('created_at', 2025)->toRawSql();",
        "// select * from \"orders\" where extract(year from \"created_at\") = '2025'",
        "",
        "echo Customer::withCount('orders')->toRawSql();",
        "// select \"customers\".*, (select count(*) from \"orders\"",
        "//   where \"customers\".\"id\" = \"orders\".\"customer_id\") as \"orders_count\" from \"customers\""
      ],
      "note": "Natija PostgreSQL grammatikasida. MySQL'da qo'shtirnoq o'rniga backtick va `year(created_at)` bo'ladi."
    },
    {
      "title": "Sekin so'rovlarni log qilish va testda cheklash",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot()",
        "DB::listen(function (QueryExecuted $q) {",
        "    if ($q->time > 200) {",
        "        Log::warning('Slow query', ['sql' => $q->toRawSql(), 'ms' => $q->time]);",
        "    }",
        "});",
        "",
        "// Feature test",
        "it('loads orders page with constant number of queries', function () {",
        "    Order::factory()->count(30)->hasItems(3)->create();",
        "",
        "    DB::enableQueryLog();",
        "    $this->actingAs(User::factory()->admin()->create())->get('/admin/orders')->assertOk();",
        "",
        "    expect(count(DB::getQueryLog()))->toBeLessThanOrEqual(6);",
        "});"
      ],
      "note": "`QueryExecuted::toRawSql()` Laravel 11+ da mavjud. Eski versiyada `$q->sql` va `$q->bindings` ni log qiling."
    }
  ],
  "pitfalls": [
    "Eloquent kodini \"chiroyli\" deb SQL'ini hech qachon ko'rmaslik.",
    "Faqat lokal kichik ma'lumotda tekshirish: N+1 20 qatorda sezilmaydi, 2000 qatorda sayt yiqiladi.",
    "Production'da `DB::enableQueryLog()` ni yoqiq qoldirish: xotira cheksiz o'sadi.",
    "Debugbar'ni production'da ochiq qoldirish: SQL va maxfiy ma'lumotlar oshkor bo'ladi."
  ]
});
