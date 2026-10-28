/* Chuqur dars: 53.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.21", {
  "lesson": [
    "### Laravel Octane",
    "Ilovani **bir marta yuklab**, **xotirada ushlab turib**, har so'rovda bootstrapping qilmasdan ishlatadi. Serverlar: **FrankenPHP**, **Swoole/OpenSwoole**, **RoadRunner**. Odatda 2–10× RPS oshishi (bootstrapping narxi yo'qoladi).",
    "",
    "### O'rnatish",
    "```bash",
    "composer require laravel/octane",
    "php artisan octane:install --server=frankenphp",
    "php artisan octane:start --workers=4 --max-requests=500 --watch",
    "```",
    "`--workers` (CPU yadroga mos), `--max-requests` (worker'ni davriy qayta ishga tushirish: sizishdan himoya).",
    "",
    "### Stateful runtime: yangi qoidalar",
    "Worker so'rovlar orasida **xotirada qoladi**:",
    "- `static` va singleton so'rovlar orasida saqlanadi → foydalanuvchi ma'lumoti **sizishi**. So'rovga xos holat uchun `scoped()` binding.",
    "- Container'ga `Request`/`Auth`/`config` snapshot'ini inject qilmang (singleton).",
    "- **Xotira sizishi:** `static` massivlar, listener to'planishi, query log.",
    "- Ulanishlar (DB/Redis) qayta ishlatiladi: uzilishni boshqarish.",
    "- Kod o'zgarsa worker qayta yuklanadi (`--watch` dev, deploy'da `octane:reload`).",
    "- `exit/die` worker'ni o'ldiradi.",
    "- Global holat (`$GLOBALS`, `setlocale`, `date_default_timezone_set`) so'rovga ta'siri.",
    "",
    "### Octane vositalari",
    "`Octane::concurrently([...])` (Swoole), `Octane::tick()` (davriy), Swoole Tables (umumiy xotira), `octane` kesh store, `Octane::route()` (tezkor marshrut).",
    "",
    "### Muvofiqlik",
    "Paketlar Octane-xavfsiz bo'lishi kerak (holat saqlamasin). Test qiling (parallel so'rovlar bilan).",
    "",
    "### Qachon foydali",
    "Yuqori RPS, bootstrapping ulushi katta (kichik so'rovlar), CPU qimmat. I/O-bound og'ir so'rovlarda yutuq kam.",
    "",
    "### Deploy",
    "Supervisor, Nginx reverse proxy, `--max-requests`, monitoring (xotira), graceful reload.",
    "",
    "### Alternativa",
    "Klassik PHP-FPM + OPcache + `optimize` (ko'p holatda yetarli)."
  ],
  "examples": [
    {
      "title": "Octane xavfsizligi",
      "lang": "php",
      "code": [
        "// XAVFLI: singleton ichida so'rovga xos holat",
        "$this->app->singleton(TenantContext::class);               // butun worker uchun bitta!",
        "",
        "// XAVFSIZ",
        "$this->app->scoped(TenantContext::class);                  // har so'rovda yangi",
        "",
        "// `static` kesh o'rniga Octane store",
        "Cache::store('octane')->put('rates', $rates, 60);"
      ]
    }
  ],
  "pitfalls": [
    "Singleton/static ichida foydalanuvchi ma'lumoti saqlash so'rovlar orasida sizib ketadi: `scoped`.",
    "`--max-requests`siz xotira sizishi worker'ni shishiradi.",
    "Octane-xavfsiz bo'lmagan paketlar holatni saqlab xatoga olib keladi: sinab ko'ring.",
    "I/O-bound og'ir so'rovlarda Octane foydasi kam: avval o'lchang."
  ]
});
