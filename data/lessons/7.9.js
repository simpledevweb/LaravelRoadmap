/* Chuqur dars: 7.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.9", {
  "lesson": [
    "### Composer Scripts",
    "`composer.json` → `scripts`: buyruqlar va **hooklar**.",
    "",
    "### Hooklar (event)",
    "`pre-install-cmd`, `post-install-cmd`, `pre-update-cmd`, `post-update-cmd`, `post-autoload-dump`, `post-create-project-cmd`, `pre-package-install` va h.k. Laravel: `post-autoload-dump` → `php artisan package:discover`.",
    "",
    "### Maxsus skriptlar",
    "```json",
    "\"scripts\": {",
    "  \"test\": \"pest\",",
    "  \"lint\": [\"pint --test\", \"phpstan analyse\"],",
    "  \"check\": [\"@lint\", \"@test\"],",
    "  \"post-root-package-install\": [\"@php -r \\\"file_exists('.env') || copy('.env.example', '.env');\\\"\"]",
    "}",
    "```",
    "Ishga tushirish: `composer test`, `composer run lint`.",
    "",
    "### Sintaksis",
    "- `@php artisan ...` — joriy PHP bilan.",
    "- `@composer ...`, `@other-script` (ichida chaqirish), `@putenv`.",
    "- Massiv — ketma-ket bajariladi, xato bo'lsa to'xtaydi.",
    "- `scripts-descriptions` — `composer list` da tavsif.",
    "- `config.process-timeout` (default 300 s), `Composer\\Config::disableProcessTimeout`.",
    "",
    "### Foydasi",
    "Jamoada yagona buyruqlar (`composer test`), CI soddalashadi.",
    "",
    "### Xavfsizlik",
    "Paket o'rnatilganda **uning** scripts'i ham ishga tushishi mumkin (root paketniki — doim; bog'liqlikniki — faqat plugin orqali). Ishonchsiz kodni o'rnatmang; `--no-scripts` kerak bo'lganda.",
    "",
    "### Qoidalar",
    "- Skriptlar tez va idempotent.",
    "- Production deploy'da `--no-scripts` ehtiyotkorlik bilan (Laravel `package:discover` talab qilinadi)."
  ],
  "examples": [
    {
      "title": "scripts",
      "lang": "json",
      "code": [
        "{",
        "  \"scripts\": {",
        "    \"post-autoload-dump\": [\"Illuminate\\\\Foundation\\\\ComposerScripts::postAutoloadDump\", \"@php artisan package:discover --ansi\"],",
        "    \"test\": \"pest\",",
        "    \"stan\": \"phpstan analyse --memory-limit=1G\",",
        "    \"ci\": [\"@stan\", \"@test\"]",
        "  },",
        "  \"scripts-descriptions\": { \"ci\": \"Statik tahlil va testlarni ishga tushiradi\" }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Production'da `--no-scripts` Laravel'da `package:discover`ni o'tkazib yuboradi: paketlar ro'yxatdan o'tmaydi.",
    "Uzoq skript `process-timeout` (300s) dan oshsa to'xtaydi.",
    "Ishonchsiz paket skriptlari kod bajarishi mumkin: ehtiyot bo'ling.",
    "Skriptlarda mutlaq yo'llar jamoa muhitida ishlamaydi."
  ]
});
