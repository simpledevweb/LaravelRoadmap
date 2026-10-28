/* Chuqur dars: 53.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.12", {
  "lesson": [
    "### Lazy vs eager loading",
    "- **Lazy loading:** munosabat **kerak bo'lganda** (birinchi murojaatda) alohida so'rov bilan yuklanadi: `$post->author`. Oddiy, lekin ro'yxatda **N+1**.",
    "- **Eager loading:** munosabat **oldindan** (bitta qo'shimcha so'rov bilan hammasiga): `with('author')`.",
    "",
    "### Qachon qaysi",
    "- **Eager:** ro'yxat/kolleksiyada munosabat kerak bo'lsa (deyarli doim).",
    "- **Lazy:** bitta obyekt, munosabat shartli va kam kerak bo'lsa.",
    "- **Conditional eager:** `load()`, `loadMissing()`, `when($cond, fn ($q) => $q->with(...))`.",
    "",
    "### Eager loading nuanslari",
    "- **Ichma-ich:** `with('comments.user')`.",
    "- **Cheklash:** `with('comments:id,post_id,body')` (ustunlar; FK majburiy), `with(['comments' => fn ($q) => $q->latest()->limit(5)])` (limit har ota uchun emas — butun to'plamga! Laravel 11+ `limit` per-parent uchun paket/yechim kerak).",
    "- **Default:** modelda `protected $with = ['author']` (har doim yuklaydi: ehtiyot, ortiqcha).",
    "- `withCount`, `withExists` (to'liq yuklamasdan).",
    "- **Munosabat tanlash:** `hasManyThrough`, polimorf (`morphWith`).",
    "",
    "### Lazy collections (boshqa ma'no)",
    "`LazyCollection`/`cursor()`/`lazy()` — katta ma'lumotni bo'laklab (xotira) — \"lazy loading\" bilan chalkashtirmang.",
    "",
    "### Lazy loading'ni taqiqlash",
    "`Model::preventLazyLoading()` (dev); L12.8+: `automaticallyEagerLoadRelationships()`.",
    "",
    "### Ortiqcha eager loading",
    "Kerak bo'lmagan munosabatlarni yuklash xotira/vaqt: faqat ishlatiladiganini.",
    "",
    "### Muvozanat",
    "Eager loading bitta `IN (...)` so'rovi (katta ID ro'yxatida `chunk`); juda keng munosabatlar zanjiri — alohida so'rov/JOIN."
  ],
  "examples": [
    {
      "title": "Eager va shartli",
      "lang": "php",
      "code": [
        "$posts = Post::with(['author:id,name', 'tags:id,name'])",
        "    ->when($request->boolean('with_comments'), fn ($q) => $q->withCount('comments'))",
        "    ->latest()->paginate(20);",
        "",
        "$post->loadMissing('comments.user');       // faqat yuklanmaganini"
      ]
    }
  ],
  "pitfalls": [
    "Ro'yxatda lazy loading N+1 beradi: eager loading.",
    "`protected $with` har doim yuklaydi (ortiqcha ma'lumot): kerak joyda `with()`.",
    "`with()` ichidagi `limit` har ota uchun emas, butun to'plamga qo'llanadi.",
    "`lazy()` (kolleksiya) va 'lazy loading' (munosabat) turli narsalar."
  ]
});
