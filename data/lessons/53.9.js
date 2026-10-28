/* Chuqur dars: 53.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.9", {
  "lesson": [
    "### N+1 oldini olish",
    "(Asos: 15.8.) 1 ta ro'yxat so'rovi + har element uchun qo'shimcha so'rov = `1 + N`.",
    "",
    "### Oldini olish usullari",
    "- **Eager loading:** `with('author', 'tags')`, ichma-ich `with('comments.user')`, cheklangan `with('author:id,name')`.",
    "- `withCount`/`withExists`/`withSum` hisoblagichlar uchun.",
    "- `load`/`loadMissing` mavjud kolleksiyaga.",
    "- **API Resource:** `whenLoaded('author')`.",
    "- **Blade:** `$post->author->name` oldidan `with`.",
    "- `Model::automaticallyEagerLoadRelationships()` (Laravel 12.8+) — avtomatik eager loading (yangi, o'rganing).",
    "",
    "### Aniqlash",
    "- `Model::preventLazyLoading(! app()->isProduction())` — dev/test'da lazy loading istisno tashlaydi.",
    "- **Telescope/Debugbar** — so'rovlar soni, takroriy so'rovlar.",
    "- `beyondcode/laravel-query-detector`, `nunomaduro/larastan` (qisman).",
    "- **Testda:** so'rovlar sonini cheklash (`DB::enableQueryLog()`; `assertQueryCount` paketlar).",
    "- **APM/Pulse:** bir xil so'rov ko'p marta.",
    "",
    "### Tuzoqlar",
    "- Munosabat **accessor ichida**.",
    "- `$user->orders->count()` (ro'yxatda) → `withCount`.",
    "- **Polimorf** munosabatlar (`morphTo` eager loading `morphWith`).",
    "- Eager loading ortiqcha ma'lumot (kerak bo'lmagan munosabatlar): faqat kerakli.",
    "- Katta `IN (...)` — `chunk`.",
    "",
    "### Qoida",
    "Ro'yxat chiqarishda munosabatlarni **doim oldindan yuklang**; dev'da lazy loading'ni taqiqlang."
  ],
  "examples": [
    {
      "title": "preventLazyLoading va test",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot",
        "Model::preventLazyLoading(! $this->app->isProduction());",
        "",
        "// test: so'rovlar soni",
        "DB::enableQueryLog();",
        "$this->getJson('/api/posts')->assertOk();",
        "$this->assertLessThanOrEqual(5, count(DB::getQueryLog()));"
      ]
    }
  ],
  "pitfalls": [
    "`preventLazyLoading` production'da istisno xavfli: faqat dev/test.",
    "Accessor/Resource ichidagi munosabat N+1 yashiradi: `whenLoaded`.",
    "Polimorf munosabatlar uchun `morphWith` kerak.",
    "Eager loading ortiqcha munosabatlarni yuklab xotirani oshirishi mumkin."
  ]
});
