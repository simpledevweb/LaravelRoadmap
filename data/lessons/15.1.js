/* Chuqur dars: 15.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.1", {
  "lesson": [
    "### Profiling",
    "So'rov va ilova vaqtini **o'lchash**: qaerda vaqt ketayotganini aniqlash. \"Taxmin emas, o'lchov\".",
    "",
    "### DB darajasida",
    "- `EXPLAIN` / `EXPLAIN ANALYZE` — reja va real vaqt.",
    "- **performance_schema / sys** (MySQL): `sys.statement_analysis`, `events_statements_summary_by_digest`, `events_stages_*`.",
    "- `SHOW PROFILE` — eskirgan (deprecated), performance_schema'ga o'ting.",
    "- PostgreSQL: `pg_stat_statements`, `auto_explain`.",
    "- **Slow query log** (15.2).",
    "",
    "### Ilova darajasida (Laravel)",
    "- **Laravel Telescope** — so'rovlar, vaqt, N+1.",
    "- **Debugbar / Clockwork** (dev).",
    "- `DB::listen()`, `DB::enableQueryLog()` (dev).",
    "- **Blackfire, Tideways, Xdebug profiler** (kod darajasi).",
    "- **APM:** Datadog, New Relic, Sentry Performance.",
    "- `DB::whenQueryingForLongerThan(500, ...)`.",
    "",
    "### Nimani o'lchash",
    "So'rovlar **soni** (N+1), **eng sekin** so'rovlar, **jami vaqt** (tezlik × soni), qator soni (`Rows_examined` vs `Rows_sent`), xotira, I/O.",
    "",
    "### Tartib",
    "1. O'lchang (baseline).",
    "2. Eng katta hissani toping (Pareto).",
    "3. O'zgartiring (bitta narsa).",
    "4. Qayta o'lchang.",
    "",
    "### Ehtiyot",
    "Profil o'zi yuk beradi (production'da sampling); dev ma'lumoti kichik: production hajmida sinang; kesh (issiq/sovuq) ni hisobga oling."
  ],
  "examples": [
    {
      "title": "Laravel so'rovlarni kuzatish",
      "lang": "php",
      "code": [
        "DB::listen(function ($q) {",
        "    if ($q->time > 100) { Log::warning('Sekin so\\'rov', ['sql' => $q->sql, 'bindings' => $q->bindings, 'ms' => $q->time]); }",
        "});",
        "DB::whenQueryingForLongerThan(500, fn ($c, $q) => report(new Exception('Uzoq so\\'rov: '.$q->sql)));"
      ]
    }
  ],
  "pitfalls": [
    "Profilsiz (taxmin bilan) optimizatsiya vaqtni yo'qotadi.",
    "Dev ma'lumoti kichik: production hajmida sinang.",
    "Profilning o'zi yuk beradi: production'da sampling.",
    "Faqat sekin so'rovga qarash, juda ko'p chaqiriladigan tez so'rovni (N+1) o'tkazib yuboradi."
  ]
});
