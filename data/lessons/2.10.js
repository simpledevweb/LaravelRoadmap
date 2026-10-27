/* Chuqur dars: 2.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.10", {
  "lesson": [
    "### Konfiguratsiya",
    "`config/*.php` fayllari massiv qaytaradi. O'qish: `config('app.name')`, `config('database.default')`, standart: `config('x.y', 'default')`. Runtime'da `config(['x.y' => 1])` (faqat joriy so'rov).",
    "",
    "### .env va env()",
    "`.env` — muhitga xos qiymatlar (parollar, kalitlar, `APP_ENV`, `APP_DEBUG`). `.env.example` shablon (Git'da), `.env` Git'da **yo'q**.",
    "- `env()` faqat `config/` fayllari ichida chaqiriladi. `php artisan config:cache` dan keyin `.env` o'qilmaydi, `env()` kodda `null` qaytaradi.",
    "- Kodda faqat `config('...')`.",
    "",
    "### Muhim kalitlar",
    "`APP_ENV` (local/staging/production), `APP_DEBUG` (**productionda false**), `APP_KEY` (shifrlash kaliti, `key:generate`), `APP_URL`, `DB_*`, `CACHE_STORE`, `QUEUE_CONNECTION`, `SESSION_DRIVER`, `MAIL_*`.",
    "",
    "### Kesh",
    "`php artisan config:cache` (tezlik, productionda), `config:clear`, `optimize`/`optimize:clear`. O'zgarishdan keyin keshni yangilang.",
    "",
    "### Muhitga qarab",
    "`app()->environment('production')`, `App::isProduction()`. `.env.testing`, `phpunit.xml` env'lari.",
    "",
    "### Sirlar",
    "Shifrlangan env: `php artisan env:encrypt` / `env:decrypt` (CI/deploy uchun). Kalitni repo'da saqlamang.",
    "",
    "### Xavfsizlik",
    "`APP_DEBUG=true` productionda stack trace va env'ni oshkor qiladi."
  ],
  "examples": [
    {
      "title": "config va env",
      "lang": "php",
      "code": [
        "// config/services.php",
        "return ['stripe' => ['secret' => env('STRIPE_SECRET')]];",
        "",
        "// kodda",
        "$key = config('services.stripe.secret');          // to'g'ri",
        "// $key = env('STRIPE_SECRET');                    // config:cache dan keyin null!"
      ]
    }
  ],
  "pitfalls": [
    "`env()` ni config tashqarisida ishlatish `config:cache` dan keyin `null` beradi.",
    "`APP_DEBUG=true` productionda xatolar orqali sirlarni oshkor qiladi.",
    "`.env` ni Git'ga yuborish sirlarni oshkor qiladi.",
    "Config o'zgargach keshni tozalamasangiz eski qiymat ishlaydi."
  ]
});
