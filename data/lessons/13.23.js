/* Chuqur dars: 13.23. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.23", {
  "lesson": [
    "### Avval o'lchash",
    "Optimizatsiyani taxmin bilan emas, o'lchov bilan boshlang: Laravel Debugbar yoki Telescope (so'rovlar soni va vaqti), `DB::listen()`, production'da APM (Sentry, New Relic) yoki `pg_stat_statements`. Bir sahifada 100+ so'rov yoki bitta so'rov 100+ ms bo'lsa, tekshiring.",
    "",
    "### 1. So'rovlar soni (N+1)",
    "- `with()` va ichma-ich `with('items.product')` (13.11, 13.12).",
    "- Kerakli ustunlar bilan: `with('author:id,name')`.",
    "- `withCount`, `withSum`, `withExists`: munosabat yuklamasdan agregat.",
    "- Mavjud to'plam uchun: `$orders->load()`, `loadMissing()`.",
    "- Dev'da `Model::preventLazyLoading()`.",
    "",
    "### 2. Kerakli ustunlar",
    "`select('id', 'name', 'price')`: katta `text`/`jsonb` ustunlarni o'qimaslik tarmoq va xotirani tejaydi. Munosabat uchun FK ustunlarni (`customer_id`) `select` ga qo'shishni unutmang. Aks holda eager loading bo'sh natija beradi.",
    "",
    "### 3. DB'da hisoblash",
    "`count()`, `sum()`, `exists()` ni SQL'da: `$user->posts()->count()`, `->exists()` (`count() > 0` o'rniga). Kolleksiyada filtrlash o'rniga `where` (13.15).",
    "",
    "### 4. Katta to'plamlar",
    "| Usul | Xotira | Eslatma |",
    "|---|---|---|",
    "| `get()` | hammasi | kichik to'plamlar |",
    "| `chunk(1000)` | 1000 ta | OFFSET bilan, iteratsiyada o'zgartirsangiz qatorlar tushib qoladi |",
    "| `chunkById(1000)` | 1000 ta | `WHERE id > ?`, iteratsiyada yangilash uchun xavfsiz |",
    "| `lazy()` / `lazyById()` | 1000 ta | LazyCollection interfeysi |",
    "| `cursor()` | 1 ta model | bitta so'rov. Eager loading ishlamaydi, PDO buferi ishlatiladi |",
    "",
    "### 5. Paginatsiya",
    "`paginate()` qo'shimcha `COUNT(*)` so'rovini bajaradi. Katta jadvalda u sekin. `simplePaginate()` (keyingi sahifa bormi, xolos) yoki `cursorPaginate()` (keyset, `WHERE id < ?`). OFFSET katta bo'lsa, `LIMIT 20 OFFSET 200000` 200 000 qatorni o'qib tashlaydi. Cheksiz lenta uchun cursor paginatsiya to'g'ri yo'l.",
    "",
    "### 6. Indekslar",
    "Eloquent so'rovlari ham SQL. `where`, `orderBy`, `whereHas` va FK ustunlari indekslangan bo'lsin. `$query->explain()` yoki `toRawSql()` bilan rejani tekshiring (11.8).",
    "",
    "### 7. Hydration xarajati",
    "Har bir Eloquent model obyekti yaratish, cast va accessor'lar CPU va xotira oladi. 50 000 qatorli eksport yoki hisobot uchun `DB::table()` yoki `toBase()` (stdClass) yoki `pluck()` model'siz ancha tez.",
    "",
    "### 8. Keshlash",
    "Kam o'zgaradigan og'ir natijalar: `Cache::remember('top-products', 600, fn () => ...)`. Invalidatsiyani observer yoki event'da. Tez-tez o'zgaradigan va foydalanuvchiga xos ma'lumotni keshlash ko'pincha murakkablik qo'shadi, xolos."
  ],
  "examples": [
    {
      "title": "Ro'yxat sahifasini optimallashtirish",
      "lang": "php",
      "code": [
        "// OLDIN: 1 + 20 + 20 so'rov, barcha ustunlar",
        "$posts = Post::latest()->paginate(20);",
        "// view: $post->author->name, $post->comments->count()",
        "",
        "// KEYIN: 3 so'rov, kerakli ustunlar",
        "$posts = Post::query()",
        "    ->select('id', 'title', 'author_id', 'published_at')",
        "    ->with('author:id,name')",
        "    ->withCount('comments')",
        "    ->latest('published_at')",
        "    ->cursorPaginate(20);",
        "// view: $post->author->name, $post->comments_count"
      ]
    },
    {
      "title": "Katta to'plamni qayta ishlash",
      "lang": "php",
      "code": [
        "// Iteratsiya davomida yangilash: chunkById",
        "Order::where('status', 'pending')",
        "    ->where('created_at', '<', now()->subDay())",
        "    ->chunkById(1000, function ($orders) {",
        "        $orders->toQuery()->update(['status' => 'expired']);",
        "    });",
        "",
        "// Eksport: model'siz, oqim bilan",
        "DB::table('orders')",
        "    ->select('id', 'number', 'total', 'created_at')",
        "    ->orderBy('id')",
        "    ->lazyById(2000)",
        "    ->each(fn ($row) => fputcsv($out, (array) $row));"
      ]
    }
  ],
  "pitfalls": [
    "`select()` bilan FK ustunini tashlab yuborish: `with('author')` hamma joyda `null` qaytaradi.",
    "Iteratsiyada filtr ustunini o'zgartirib, `chunk()` ishlatish: OFFSET siljiydi va qatorlarning yarmi o'tkazib yuboriladi. `chunkById()` ishlating.",
    "`cursor()` bilan eager loading ishlaydi deb kutish: har model uchun lazy load qilinadi.",
    "O'lchovsiz \"optimizatsiya\": kod murakkablashadi, haqiqiy tor joy esa boshqa yerda qoladi."
  ]
});
