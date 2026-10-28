/* Chuqur dars: 53.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.1", {
  "lesson": [
    "### Profiling",
    "Ilovaning **qayerda vaqt va resurs sarflayotganini** o'lchash. \"Taxmin emas, o'lchov\": optimizatsiyaning birinchi qadami.",
    "",
    "### Qatlamlar",
    "1. **Brauzer/tarmoq:** Lighthouse, WebPageTest, DevTools (TTFB, assetlar).",
    "2. **Server/ilova:** so'rov vaqti, PHP kod, framework.",
    "3. **DB:** so'rovlar (EXPLAIN, slow log).",
    "4. **Tashqi chaqiruvlar:** HTTP API, Redis.",
    "5. **Infratuzilma:** CPU, RAM, I/O.",
    "",
    "### PHP vositalari",
    "- **Xdebug profiler** (cachegrind, dev; sekin).",
    "- **Blackfire** (production-xavfsiz, taqqoslash, timeline).",
    "- **Tideways, New Relic, Datadog APM, Sentry Performance** (sampling).",
    "- **SPX** (yengil profiler kengaytma).",
    "- **Laravel Telescope / Debugbar / Clockwork / Pulse** (so'rovlar, hodisalar, vaqt).",
    "- `Benchmark::measure()`, `hrtime(true)`, `memory_get_peak_usage()`.",
    "",
    "### Nimani qidirish",
    "Eng ko'p **inclusive/self time** funksiyalar, chaqiruvlar soni (tsikl ichida qimmat funksiya), **so'rovlar soni/vaqti** (N+1), tashqi chaqiruv, serializatsiya, autoload/bootstrapping.",
    "",
    "### Jarayon",
    "1. **Baseline** (hozirgi raqam).",
    "2. Eng katta hissani toping (Pareto: 80/20).",
    "3. **Bitta** o'zgartirish.",
    "4. Qayta o'lchang.",
    "5. Regressiya nazorati (53.19).",
    "",
    "### Ehtiyot",
    "Profil o'zi sekinlashtiradi (Xdebug 2–10×): mutlaq vaqtga emas, **ulushga** qarang; dev ma'lumoti kichik; kesh holati (sovuq/issiq); production'da sampling.",
    "",
    "### Laravel",
    "Telescope (dev) so'rov/vaqt/N+1; Pulse (production sekin so'rovlar, sekin job'lar); `DB::listen`."
  ],
  "examples": [
    {
      "title": "Qisman o'lchash",
      "lang": "php",
      "code": [
        "use Illuminate\\Support\\Benchmark;",
        "",
        "[$ms, $result] = Benchmark::value(fn () => Report::build($id));          // ms va natija",
        "Benchmark::dd(['eloquent' => fn () => User::all(), 'toBase' => fn () => User::query()->toBase()->get()], 10);"
      ]
    }
  ],
  "pitfalls": [
    "Profilsiz (taxmin bilan) optimizatsiya vaqtni yo'qotadi.",
    "Xdebug profili dasturni sekinlashtiradi: mutlaq vaqtga emas, ulushlarga qarang.",
    "Dev ma'lumoti kichik: production hajmida o'lchang.",
    "Bir vaqtda ko'p narsani o'zgartirish foyda manbasini yashiradi."
  ]
});
