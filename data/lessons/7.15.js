/* Chuqur dars: 7.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.15", {
  "lesson": [
    "### Production bog'liqliklari",
    "Production'ga **faqat kerakli** paketlar tushishi kerak: `composer install --no-dev`. Dev vositalar (test, linter, Faker, Debugbar) production'da bo'lmaydi.",
    "",
    "### Nima uchun",
    "- **Xavfsizlik:** kamroq kod = kichikroq hujum yuzasi (dev paketlarda zaiflik).",
    "- **Tezlik:** kichikroq `vendor`, tezroq autoload, kam xotira.",
    "- **Hajm:** image va deploy artefakti kichik.",
    "- **Toza:** debug vositalari (Telescope, Debugbar) tasodifan ochiq qolmaydi.",
    "",
    "### Production buyruqlari",
    "```bash",
    "composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader",
    "# yoki eng tez (runtime'da yaratilgan klass yo'q bo'lsa)",
    "composer install --no-dev -a",
    "```",
    "Laravel keyin: `php artisan optimize` (config, route, view, event cache).",
    "",
    "### Tekshirish",
    "`composer show --no-dev`, `composer install --no-dev --dry-run`. CI'da `--no-dev` o'rnatilgan holda ilova smoke-test (artisan about, health endpoint).",
    "",
    "### Xatolar",
    "- Production kodi `require-dev` paketga bog'liq → `Class not found`. Hal: paketni `require` ga ko'chiring yoki bog'liqlikni olib tashlang.",
    "- Faker'ni seeder'da production'da ishlatish.",
    "- `--no-dev` o'rnatilgach `artisan` dev provider'lar (`APP_ENV`) bilan to'qnashuvi: provider'lar `if (app()->environment('local'))` yoki `dont-discover` (`extra.laravel.dont-discover`).",
    "",
    "### Dev provider'lar",
    "`laravel/telescope`, `barryvdh/laravel-debugbar`: `require-dev` + faqat local'da ro'yxatga olish (`$this->app->register()` shart ostida).",
    "",
    "### Qoida",
    "Production = `--no-dev` + optimize + cache; dev vositalar faqat dev/test image'da."
  ],
  "examples": [
    {
      "title": "Shartli provider",
      "lang": "php",
      "code": [
        "// AppServiceProvider::register",
        "if ($this->app->environment('local') && class_exists(\\Laravel\\Telescope\\TelescopeServiceProvider::class)) {",
        "    $this->app->register(\\Laravel\\Telescope\\TelescopeServiceProvider::class);",
        "    $this->app->register(TelescopeServiceProvider::class);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Production kodi `require-dev` paketga bog'liq bo'lsa `--no-dev` da 'Class not found'.",
    "Dev provider'ni auto-discovery orqali production'da ham yuklash xatolikka olib keladi: `dont-discover` yoki shartli.",
    "`--no-dev` o'rnatilgan holda test qilmaslik deploy'da kutilmagan xato beradi.",
    "Debugbar/Telescope production'da ochiq qolsa ichki ma'lumot sizadi."
  ]
});
