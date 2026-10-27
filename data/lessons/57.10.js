/* Chuqur dars: 57.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.10", {
  "lesson": [
    "### Code Coverage",
    "**Kod qamrovi** — testlar kodning qancha qismini bajarganini o'lchaydi: qator (line), tarmoq (branch), yo'l (path) bo'yicha. Xdebug `mode=coverage` bilan bu ma'lumotni yig'adi, PHPUnit/Pest esa hisobot beradi.",
    "",
    "### Yoqish",
    "```ini",
    "xdebug.mode=coverage",
    "```",
    "yoki muhit o'zgaruvchisi: `XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html coverage`.",
    "",
    "### Hisobot turlari",
    "- `--coverage-html dir` — HTML (qaysi qatorlar bajarilmadi).",
    "- `--coverage-text` — terminal jadvali.",
    "- `--coverage-clover file.xml` — CI (Codecov, SonarQube).",
    "- Pest: `pest --coverage --min=80`.",
    "",
    "### Qamrov turlari",
    "- **Line:** qator bajarildimi.",
    "- **Branch:** `if` ning ikkala tarmog'i.",
    "- **Path:** tarmoqlar kombinatsiyalari (Xdebug 3 qo'llaydi; PCOV — yo'q).",
    "",
    "### PCOV alternativasi",
    "**PCOV** — faqat coverage uchun yengil kengaytma: Xdebug'dan **ancha tez** (CI uchun mos). Xdebug esa branch/path va debug bilan birga.",
    "",
    "### Haqiqat",
    "Yuqori qamrov ≠ yaxshi testlar: kod bajarilgani natija tekshirilganini bildirmaydi. **Mutation testing** (Infection) testlar sifatini tekshiradi.",
    "",
    "### Amaliyot",
    "- Maqsad: muhim biznes mantiq uchun yuqori; 100% ga intilmang.",
    "- CI'da minimal chegara va PRda pasayishni rad etish.",
    "- Qamrovdan chiqarish: `<exclude>`/`@codeCoverageIgnore` (kamdan-kam).",
    "- Tezlik: coverage testlarni sekinlashtiradi: faqat kerak joyda (CI, nightly)."
  ],
  "examples": [
    {
      "title": "Coverage buyruqlari",
      "lang": "bash",
      "code": [
        "XDEBUG_MODE=coverage vendor/bin/pest --coverage --min=80",
        "XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html build/coverage --coverage-clover build/clover.xml",
        "# PCOV (tezroq)",
        "php -d pcov.enabled=1 vendor/bin/phpunit --coverage-text"
      ]
    }
  ],
  "pitfalls": [
    "Yuqori qamrov sifatli testlarni kafolatlamaydi: natijani tekshiring, mutation testing.",
    "Xdebug coverage sekin: CI uchun PCOV tezroq.",
    "Xdebug `mode` ichida `coverage` bo'lmasa coverage bo'sh chiqadi.",
    "100% maqsadi ma'nosiz testlarga olib keladi: muhim mantiqqa e'tibor."
  ]
});
