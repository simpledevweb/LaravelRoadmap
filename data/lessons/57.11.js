/* Chuqur dars: 57.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.11", {
  "lesson": [
    "### Profiling",
    "**Profiling** — kod qayerda **vaqt va xotira** sarflayotganini o'lchash. Taxminsiz, haqiqiy hotspot'ni topish uchun.",
    "",
    "### Xdebug profiler",
    "```ini",
    "xdebug.mode=profile",
    "xdebug.start_with_request=trigger          ; XDEBUG_PROFILE cookie/GET/env",
    "xdebug.output_dir=/tmp/xdebug",
    "```",
    "So'rov yoki skript **cachegrind** formatidagi fayl yaratadi (`cachegrind.out.<pid>`).",
    "",
    "### Tahlil vositalari",
    "- **QCachegrind / KCachegrind** (desktop), **Webgrind** (web), PhpStorm \"Analyze Xdebug Profiler Snapshot\".",
    "- Ko'rsatadi: funksiya bo'yicha **self time** (o'zi), **inclusive time** (ichkilari bilan), chaqiruvlar soni, call graph.",
    "",
    "### Nimaga qarash",
    "1. **Eng yuqori inclusive time** — katta zanjir.",
    "2. **Eng yuqori self time** — haqiqiy sekin joy.",
    "3. **Chaqiruvlar soni** — tsiklda ko'p chaqiriladigan (N+1: `PDOStatement::execute` ming marta).",
    "4. I/O (DB, HTTP, fayl) vs CPU.",
    "",
    "### Laravel'da odatiy topilmalar",
    "N+1 so'rovlar, `route:cache`/`config:cache` yo'qligi, og'ir `Collection` zanjirlari, katta serializatsiya, view kompilyatsiyasi, autoload.",
    "",
    "### Xdebug cheklovlari",
    "Profil o'zi sekinlashtiradi (nisbatan haqiqiy vaqt buziladi); relativ ulushga qarang. Production uchun **Blackfire**, **Tideways**, **SPX**, **Sentry Profiling** yengilroq (sampling).",
    "",
    "### Qoida",
    "Avval o'lchang, keyin optimizatsiya; o'zgartirishdan keyin qayta o'lchang."
  ],
  "examples": [
    {
      "title": "Profil yoqish",
      "lang": "bash",
      "code": [
        "# trigger bilan (faqat kerak so'rovda)",
        "XDEBUG_MODE=profile XDEBUG_TRIGGER=1 php artisan app:heavy",
        "curl -b 'XDEBUG_PROFILE=1' https://app.test/slow-page",
        "ls /tmp/xdebug/cachegrind.out.*"
      ]
    }
  ],
  "pitfalls": [
    "Profil o'zi dasturni sekinlashtiradi: mutlaq vaqtga emas, ulushlarga qarang.",
    "`start_with_request=yes` bilan har so'rov katta fayl yozadi: `trigger`.",
    "Production'da Xdebug profil emas, sampling profiler (Blackfire/SPX).",
    "Optimizatsiyadan keyin qayta o'lchamasangiz foyda aniq emas."
  ]
});
