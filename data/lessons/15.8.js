/* Chuqur dars: 15.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.8", {
  "lesson": [
    "### N+1 muammosi",
    "1 ta so'rov ro'yxatni oladi, so'ng **har element uchun** yana so'rov: jami `1 + N`. Bazaga yuzlab/minglab so'rov.",
    "```php",
    "$posts = Post::all();                       // 1 so'rov",
    "foreach ($posts as $p) { echo $p->author->name; }   // +N so'rov (lazy loading)",
    "```",
    "",
    "### Yechim: eager loading",
    "`Post::with('author')->get()` — 2 ta so'rov (`posts` va `users WHERE id IN (...)`). Ichma-ich: `with('author.profile')`. Cheklash: `with('comments:id,post_id,body')`, `with(['comments' => fn ($q) => $q->latest()->limit(5)])`.",
    "Hisoblagich: `withCount('comments')`, `withExists`, `withSum`.",
    "Mavjud kolleksiya uchun: `$posts->load('author')`, `loadMissing`.",
    "",
    "### Aniqlash",
    "- `Model::preventLazyLoading(! app()->isProduction())` — dev'da lazy loading istisno tashlaydi (AppServiceProvider).",
    "- **Telescope/Debugbar** — so'rovlar soni va takroriy so'rovlar.",
    "- `DB::listen` bilan hisoblash; testda `assertQueryCount` (paketlar), `DB::enableQueryLog`.",
    "- Slow log: bir xil shablon minglab marta.",
    "- Larastan/`beyondcode/laravel-query-detector`.",
    "",
    "### Boshqa shakllar",
    "- Resource ichida munosabat (`whenLoaded` siz).",
    "- Blade'da `$user->orders->count()` (har user uchun so'rov) → `withCount`.",
    "- Accessor ichida so'rov.",
    "- API Resource kolleksiyasi.",
    "",
    "### Muvozanat",
    "Eager loading ortiqcha ma'lumot olishi mumkin; kerakli ustun/munosabatlarni yuklang. Juda katta `IN (...)` — `chunk`.",
    "",
    "### Qoida",
    "Ro'yxat chiqarilganda munosabatlarni doim oldindan yuklang."
  ],
  "examples": [
    {
      "title": "Eager loading va prevent",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot",
        "Model::preventLazyLoading(! $this->app->isProduction());",
        "",
        "$posts = Post::with(['author:id,name', 'tags'])->withCount('comments')->latest()->paginate(20);",
        "foreach ($posts as $p) { echo $p->author->name, $p->comments_count; }      // qo'shimcha so'rov yo'q"
      ]
    }
  ],
  "pitfalls": [
    "Blade/Resource ichida munosabatga murojaat har element uchun so'rov beradi.",
    "`preventLazyLoading` faqat dev/test'da yoqing (production'da istisno xavfli).",
    "Eager loading ortiqcha ma'lumot yuklashi mumkin: kerakli ustun/munosabat.",
    "`$user->orders->count()` o'rniga `withCount('orders')`."
  ]
});
