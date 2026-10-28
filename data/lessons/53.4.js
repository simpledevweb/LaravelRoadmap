/* Chuqur dars: 53.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.4", {
  "lesson": [
    "### CPU profiling",
    "Qaysi funksiyalar **CPU vaqtini** ko'p olayotgani. Vositalar: **Blackfire**, **Xdebug profiler** (cachegrind + QCachegrind/Webgrind), **SPX**, Tideways, `perf`/flamegraph (tizim darajasi).",
    "**Flame graph:** stack'lar bo'yicha vaqt (kenglik = vaqt ulushi).",
    "",
    "### Memory profiling",
    "- `memory_get_usage()` / `memory_get_peak_usage(true)`; `memory_reset_peak_usage()` (8.2).",
    "- **Blackfire memory**, **php-meminfo** (heap dump), Xdebug.",
    "- Laravel Telescope (xotira), `Debugbar`.",
    "- Qaysi obyektlar/massivlar ko'p xotira oladi.",
    "",
    "### CPU-bound vs I/O-bound",
    "Veb-ilova odatda **I/O-bound** (DB, tarmoq): CPU past, kutish ko'p → DB/kesh/parallellik. CPU-bound: katta hisob, serializatsiya, regex, shablon, rasm: kod/algoritm/keshlash.",
    "",
    "### Odatiy CPU yeyuvchilar",
    "Katta kolleksiyalar ustida PHP tsikllari (`array_*`, Collection zanjirlari), Eloquent hydration (minglab model), `json_encode` katta, `serialize`, regex, shablon kompilyatsiyasi (view kesh yo'q), autoload (OPcache/optimize yo'q), `Carbon` ko'p obyekt.",
    "",
    "### Xotira muammolari",
    "Katta natija to'plami (`->get()` ming qator), Collection zanjirlari (har bosqich nusxa), tsiklik havolalar, `Model::all()`, katta fayl. Yechim: `chunkById`, `lazy()`, `cursor()`, generator, `select`, `toBase()`.",
    "",
    "### Uzoq jarayonlar (queue/Octane)",
    "Xotira sizishi (static, listener'lar, query log): `--max-jobs`, `--memory`, `DB::disableQueryLog()`.",
    "",
    "### PHP sozlamalari",
    "`memory_limit`, OPcache + JIT (CPU-bound uchun; veb-ilovada kam foyda).",
    "",
    "### Qoida",
    "Eng katta hissani toping; mikrooptimizatsiya o'rniga algoritm/so'rov/keshlash."
  ],
  "examples": [
    {
      "title": "Xotira va generator",
      "lang": "php",
      "code": [
        "$before = memory_get_peak_usage(true);",
        "foreach (User::query()->lazyById(1000) as $user) { /* qayta ishlash */ }       // xotira O(1)",
        "printf(\"Peak: %.1f MB\\n\", (memory_get_peak_usage(true) - $before) / 1048576);"
      ]
    }
  ],
  "pitfalls": [
    "Profil o'zi dasturni sekinlashtiradi: nisbiy ulushga qarang.",
    "`Model::all()`/`->get()` ming qatorda xotirani to'ldiradi: `lazy`/`chunkById`.",
    "Veb-ilova ko'pincha I/O-bound: CPU profili foydasiz bo'lishi mumkin (DB/kesh)ni ko'ring.",
    "Uzoq jarayonlarda query log va static kesh xotirani oshiradi."
  ]
});
