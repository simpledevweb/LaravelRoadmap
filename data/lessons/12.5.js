/* Chuqur dars: 12.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.5", {
  "lesson": [
    "### Invalidatsiya",
    "Kesh ma'lumoti eskirganda uni **o'chirish/yangilash**. \"Kompyuter fanidagi ikki qiyin narsadan biri\".",
    "",
    "### Strategiyalar",
    "1. **TTL:** muddat tugagach (eng sodda, vaqtincha eski ma'lumot).",
    "2. **Aniq o'chirish (event-based):** yozishda `Cache::forget($key)` (model observer, hodisa).",
    "3. **Tag'lar (Laravel):** `Cache::tags(['posts'])->put(...)`, `flush()` — guruhni birdan (faqat Redis/Memcached; `file/database` yo'q).",
    "4. **Versiyalangan kalit:** `post:5:v3` (versiya bumpi eski kalitlarni \"yo'q\" qiladi, TTL bilan tozalanadi).",
    "5. **Namespace token:** `posts:ns` qiymati kalitga kiradi; o'zgarsa hamma eski kalit yaroqsiz.",
    "6. **Write-through:** yozishda keshni ham yangilash.",
    "7. **CDC/hodisa oqimi:** DB o'zgarishidan (binlog, Debezium) keshni tozalash.",
    "",
    "### Qaysi kalitlar o'zgaradi",
    "Bitta yozuv ko'p kalitga ta'sir qiladi (obyekt, ro'yxat, hisoblagich, qidiruv natijasi): bog'liqliklarni xaritalash (yoki tag).",
    "",
    "### Poyga holatlari",
    "Delete va parallel o'qish: eski ma'lumot qayta keshlanishi mumkin: tranzaksiya `afterCommit`, delete'ni commit'dan keyin, \"delayed double delete\", qisqa TTL.",
    "",
    "### Laravel",
    "Observer: `saved`/`deleted` da `Cache::forget`; `Cache::tags()`; `Model::booted()`; `afterCommit` (`public $afterCommit = true`).",
    "",
    "### Qoida",
    "Qiyin invalidatsiya o'rniga **qisqa TTL** + oddiy invalidatsiya; ayniqsa ro'yxat/agregat keshlarda."
  ],
  "examples": [
    {
      "title": "Tag va observer",
      "lang": "php",
      "code": [
        "Cache::tags(['posts', \"user:{$uid}\"])->remember(\"posts:feed:{$uid}\", 300, fn () => Post::feed($uid));",
        "",
        "class PostObserver",
        "{",
        "    public bool $afterCommit = true;                       // commit'dan keyin",
        "    public function saved(Post $p): void { Cache::tags(['posts'])->flush(); Cache::forget(\"post:{$p->id}\"); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`Cache::tags` `file`/`database` driver'da ishlamaydi.",
    "Tranzaksiya commit'dan oldin keshni o'chirish eski ma'lumotni qayta keshlashga olib keladi.",
    "Bitta yozuv ko'p kalitga (ro'yxat, agregat) ta'sir qiladi: bog'liqliklarni unutmang.",
    "`flush()` butun keshni (hamma tag emas) tozalashi mumkin: faqat tag bilan."
  ]
});
