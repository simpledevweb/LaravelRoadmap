/* Chuqur dars: 2.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.2", {
  "lesson": [
    "### Papkalar",
    "- `app/` — ilova kodi (Models, Http/Controllers, Providers, Console, Policies...).",
    "- `bootstrap/` — ishga tushirish (`app.php`, `providers.php`, `cache/`).",
    "- `config/` — konfiguratsiya fayllari (`app.php`, `database.php`, `cache.php`...).",
    "- `database/` — migrations, seeders, factories (SQLite fayl ham shu yerda bo'lishi mumkin).",
    "- `public/` — veb-ildiz: `index.php`, assetlar. Faqat shu papka serverga ochiladi.",
    "- `resources/` — Blade view, `lang/`, css/js manbalari (Vite).",
    "- `routes/` — `web.php`, `api.php`, `console.php`, `channels.php`.",
    "- `storage/` — loglar, kesh, sessiyalar, yuklangan fayllar (`app/public`). Yozish ruxsati kerak.",
    "- `tests/` — Feature va Unit testlar.",
    "- `vendor/` — Composer paketlari (Git'ga kirmaydi).",
    "",
    "### Muhim fayllar",
    "`.env` (muhit, Git'ga kirmaydi), `.env.example`, `composer.json`, `artisan`, `vite.config.js`, `phpunit.xml`.",
    "",
    "### Laravel 11+ yengillashgan skelet",
    "`app/Http/Kernel.php`, `app/Console/Kernel.php`, `Exceptions/Handler.php`, ko'p provider'lar olib tashlangan. `config/` fayllarini `php artisan config:publish` bilan kerak bo'lganda chiqarasiz.",
    "",
    "### Modulli tuzilma",
    "Katta loyihada `app/Modules/Billing/...` yoki domen bo'yicha papkalash: standart tuzilma qoidasi emas, jamoa kelishuvi. PSR-4 autoload'ni moslang.",
    "",
    "### Xavfsizlik",
    "Veb-server ildizi faqat `public/`: `.env`, `storage`, `vendor` tashqaridan ochilmasin."
  ],
  "examples": [
    {
      "title": "Papka bo'yicha ruxsat",
      "lang": "bash",
      "code": [
        "chmod -R ug+rwx storage bootstrap/cache",
        "php artisan storage:link        # public/storage -> storage/app/public",
        "php artisan config:publish      # kerakli config'ni chiqarish (L11+)"
      ]
    }
  ],
  "pitfalls": [
    "Veb-server ildizini loyiha ildiziga qo'yish `.env` va kodni oshkor qiladi: ildiz faqat `public/`.",
    "`storage/` va `bootstrap/cache` ga yozish ruxsati bo'lmasa 500 xatosi.",
    "`.env` ni Git'ga kiritish sirlarni oshkor qiladi.",
    "Standart tuzilmani o'zboshimchalik bilan buzish jamoaga yangi a'zoni qo'shishni qiyinlashtiradi."
  ]
});
