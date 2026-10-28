/* Chuqur dars: 53.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.7", {
  "lesson": [
    "### Bootstrapping",
    "Har so'rovda Laravel ishga tushadi: autoload, `.env`, config, provider'lar (`register`/`boot`), route, middleware. Bu **~10–40 ms** (FPM'da har so'rovda), kichik so'rovlarda eng katta ulush.",
    "",
    "### Production'da majburiy kesh",
    "```bash",
    "composer install --no-dev --optimize-autoloader --classmap-authoritative",
    "php artisan optimize          # config:cache + route:cache + view:cache + event:cache",
    "```",
    "- `config:cache`: barcha config bitta faylga (`.env` o'qilmaydi: kodda `env()` ishlatmang, faqat config ichida).",
    "- `route:cache`: marshrutlar tezkor (closure route'lar keshlanmaydi: controller).",
    "- `view:cache` (`view:cache`): Blade oldindan kompilyatsiya.",
    "- `event:cache`: event/listener auto-discovery.",
    "- `php artisan icons:cache` (paketlar), `filament:cache-components` va h.k.",
    "Deployda har safar; `optimize:clear` dev'da.",
    "",
    "### Provider optimallash",
    "- `boot()`da og'ir ish yo'q (DB so'rov, HTTP, katta fayl o'qish).",
    "- **Deferred provider** (`DeferrableProvider` + `provides()`): faqat kerak bo'lganda.",
    "- Keraksiz provider/paketlarni olib tashlang; `dont-discover`.",
    "- Middleware ro'yxatini qisqartiring (global middleware har so'rovda).",
    "",
    "### Autoload",
    "`--classmap-authoritative`, PSR-4 optimize, `files` autoload kam.",
    "",
    "### OPcache + preload",
    "(53.6.)",
    "",
    "### Octane",
    "Bootstrapping **bir marta** (53.21): eng katta yutuq.",
    "",
    "### O'lchash",
    "Bo'sh route (`/up`) javob vaqti = bootstrapping narxi. `php artisan about`, Telescope, Blackfire (bootstrapping timeline).",
    "",
    "### Dev/test",
    "Kesh faqat production: dev'da `optimize:clear`."
  ],
  "examples": [
    {
      "title": "Deploy skripti",
      "lang": "bash",
      "code": [
        "composer install --no-dev --prefer-dist --optimize-autoloader --classmap-authoritative --no-interaction",
        "php artisan migrate --force",
        "php artisan optimize",
        "sudo systemctl reload php8.4-fpm       # OPcache reset"
      ]
    }
  ],
  "pitfalls": [
    "`config:cache` dan keyin kodda `env()` `null` qaytaradi: faqat config fayllarida.",
    "Closure route'lar bilan `route:cache` ishlamaydi.",
    "`boot()`da DB/HTTP chaqiruvi har so'rovda ishlaydi.",
    "Deploydan keyin `optimize`ni unutish sekin start beradi."
  ]
});
