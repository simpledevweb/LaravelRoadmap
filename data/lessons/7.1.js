/* Chuqur dars: 7.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.1", {
  "lesson": [
    "### composer.json",
    "Loyihaning **bog'liqliklari va sozlamalari** tavsifi. `composer init` bilan yaratiladi.",
    "",
    "### Asosiy maydonlar",
    "- `name` (`vendor/paket`), `description`, `type` (`project`/`library`), `license`.",
    "- `require` — production bog'liqliklar; `require-dev` — faqat dev (test, statik tahlil).",
    "- `autoload` / `autoload-dev` — PSR-4, `classmap`, `files`.",
    "- `scripts` — buyruqlar va hooklar (`post-install-cmd`...).",
    "- `config` — `optimize-autoloader`, `sort-packages`, `platform` (`php: 8.3`), `allow-plugins`, `preferred-install`.",
    "- `repositories` — qo'shimcha manbalar (private, VCS, path).",
    "- `minimum-stability` (`stable`) va `prefer-stable`.",
    "- `extra` — paketga xos ma'lumot (Laravel `extra.laravel.providers`).",
    "- `bin`, `require` ichida `php` va `ext-*` (platforma talablari).",
    "",
    "### Platforma talablari",
    "`\"php\": \"^8.2\"`, `\"ext-mbstring\": \"*\"` — mos kelmagan muhitda o'rnatish to'xtaydi.",
    "",
    "### Validatsiya",
    "`composer validate`, `composer diagnose`, `composer show -s`.",
    "",
    "### Qoidalar",
    "- `composer.json` ni qo'lda tahrirlagach `composer update` (yoki `composer require` ishlating).",
    "- `sort-packages: true` — tartibli, merge konfliktsiz.",
    "- `composer.json` va `composer.lock` ikkalasi Git'da (ilova uchun)."
  ],
  "examples": [
    {
      "title": "Namuna",
      "lang": "json",
      "code": [
        "{",
        "  \"name\": \"acme/shop\",",
        "  \"type\": \"project\",",
        "  \"require\": { \"php\": \"^8.2\", \"laravel/framework\": \"^12.0\", \"ext-mbstring\": \"*\" },",
        "  \"require-dev\": { \"pestphp/pest\": \"^3.0\", \"larastan/larastan\": \"^3.0\" },",
        "  \"autoload\": { \"psr-4\": { \"App\\\\\": \"app/\" } },",
        "  \"config\": { \"optimize-autoloader\": true, \"sort-packages\": true, \"platform\": { \"php\": \"8.3.0\" } },",
        "  \"scripts\": { \"test\": \"pest\", \"post-autoload-dump\": [\"@php artisan package:discover --ansi\"] },",
        "  \"minimum-stability\": \"stable\", \"prefer-stable\": true",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`composer.json` ni qo'lda o'zgartirib `update` qilmaslik `composer.lock` bilan nomuvofiqlik beradi.",
    "`config.platform` ni noto'g'ri qo'yish ishlab turgan muhitda versiyaga mos bo'lmagan paketlarni tanlatadi.",
    "`allow-plugins` bo'lmasa Composer 2.2+ plugin'larni so'raydi/to'xtatadi.",
    "`minimum-stability: dev` barqaror bo'lmagan paketlarni tortadi."
  ]
});
