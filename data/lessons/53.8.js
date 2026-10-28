/* Chuqur dars: 53.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.8", {
  "lesson": [
    "### Eloquent samaradorligi",
    "Eloquent qulay, lekin har qator uchun **model obyekti** (hydration) yaratadi: ko'p qatorda CPU va xotira.",
    "",
    "### Texnikalar",
    "1. **Kerakli ustunlar:** `select('id', 'name')` (`SELECT *` o'rniga).",
    "2. **Eager loading** (N+1 yo'q): `with()`, `withCount`, `withExists`, `withSum`.",
    "3. **Katta ma'lumot:** `chunkById(1000)`, `lazyById()`, `cursor()` — xotira O(1). `all()`/`get()` ming+ qatorda emas.",
    "4. `pluck`, `value()`, `exists()` (`count() > 0` o'rniga).",
    "5. `toBase()`/`DB::table()` — model hydration'siz oddiy obyektlar (faqat o'qish uchun juda tez).",
    "6. **Ommaviy yozish:** `insert`, `upsert`, `update` (where bilan) — tsiklda `save()` emas.",
    "7. **Indekslar** (WHERE/ORDER/JOIN), `explain()`.",
    "8. `whereIn` ID'lar (JOIN o'rniga) / `whereHas` ehtiyotkorlik (subquery narxi): `join` yoki `whereIn(subquery)`.",
    "9. **Accessor/mutator va cast** narxi (ko'p qatorda).",
    "10. **Keshlash** (natija/hisoblagich).",
    "11. `increment()` atomar (o'qib-yozish emas).",
    "12. **Observer/hodisalar** ommaviy amalda sekin: `withoutEvents`, `updateQuietly`.",
    "",
    "### Murakkab hisobot",
    "Xom SQL/Query Builder, agregatsiyani DB'da, jamlama jadval.",
    "",
    "### Nazorat",
    "`Model::preventLazyLoading()`, `preventAccessingMissingAttributes()`, `Telescope`, so'rovlar soni testi.",
    "",
    "### Misol",
    "Ro'yxat: `Post::select('id','title','user_id')->with('author:id,name')->latest()->cursorPaginate(20)`."
  ],
  "examples": [
    {
      "title": "Optimal so'rovlar",
      "lang": "php",
      "code": [
        "$posts = Post::query()->select('id', 'title', 'user_id')->with('author:id,name')->withCount('comments')->latest('id')->cursorPaginate(20);",
        "",
        "Post::query()->where('status', 'draft')->chunkById(1000, fn ($c) => $c->each->publish());",
        "$ids = Order::where('user_id', $id)->pluck('id');",
        "$exists = Order::where('user_id', $id)->exists();"
      ]
    }
  ],
  "pitfalls": [
    "`SELECT *` + minglab model hydration xotira va CPU yeydi: `select`, `toBase`, `lazy`.",
    "`whereHas` katta jadvalda sekin subquery: `join`/`whereIn` ni ko'rib chiqing.",
    "Tsiklda `save()`/`create()` har qator uchun so'rov: `insert/upsert/update`.",
    "Accessor ichida so'rov/og'ir hisob ko'p qatorda sekinlashtiradi."
  ]
});
