/* Chuqur dars: 57.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.14", {
  "lesson": [
    "### PHP-FPM bilan tuzatish",
    "Veb so'rovlar PHP-FPM worker'lari orqali ishlaydi; Xdebug shu worker ichida IDE'ga ulanadi.",
    "",
    "### Sozlash",
    "FPM uchun alohida ini (`/etc/php/8.4/fpm/conf.d/20-xdebug.ini`):",
    "```ini",
    "xdebug.mode=debug",
    "xdebug.start_with_request=trigger",
    "xdebug.client_host=127.0.0.1",
    "xdebug.client_port=9003",
    "```",
    "O'zgargach `sudo systemctl reload php8.4-fpm`.",
    "",
    "### Trigger",
    "Brauzerda \"Xdebug helper\" yoki `?XDEBUG_SESSION_START=PHPSTORM`; Postman/curl: `Cookie: XDEBUG_SESSION=PHPSTORM`. API so'rovida `curl -b \"XDEBUG_SESSION=1\" https://app.test/api/orders`.",
    "",
    "### Timeout'lar",
    "Tuzatish paytida so'rov to'xtab turadi:",
    "- `request_terminate_timeout` (FPM pool) va `max_execution_time` ni oshiring yoki 0 qiling (faqat dev).",
    "- Nginx `fastcgi_read_timeout` (504 xatosining sababi).",
    "- Brauzer so'rov kutish vaqti.",
    "",
    "### Worker bandligi",
    "Bir worker debug sessiyada band; `pm.max_children` kichik bo'lsa boshqa so'rovlar kutadi. Devda 1–2 worker yetarli; sessiya tugasa worker bo'shaydi.",
    "",
    "### Xdebug va OPcache",
    "Kod o'zgarsa OPcache eski kodni ishlatishi mumkin: devda `opcache.validate_timestamps=1`.",
    "",
    "### Laravel Octane",
    "Uzoq yashovchi worker'da Xdebug cheklangan (Swoole bilan to'liq ishlamasligi mumkin); debug uchun oddiy FPM/`artisan serve` ishlating.",
    "",
    "### Xavfsizlik",
    "Productionda FPM'da Xdebug yoqmang; `trigger` rejimi ham ochiq so'rovda xavfli bo'lishi mumkin."
  ],
  "examples": [
    {
      "title": "FPM va timeout",
      "lang": "ini",
      "code": [
        "; pool.d/www.conf (faqat dev)",
        "request_terminate_timeout = 0",
        "; php.ini (dev)",
        "max_execution_time = 0",
        "; nginx",
        "; fastcgi_read_timeout 3600s;"
      ]
    }
  ],
  "pitfalls": [
    "Tuzatish paytida timeout'lar so'rovni uzib qo'yadi (504): dev uchun oshiring.",
    "FPM'da ini o'zgargach reload qilmasangiz eski sozlama ishlaydi.",
    "Octane/Swoole'da Xdebug to'liq ishlamasligi mumkin: oddiy FPM'da tuzating.",
    "Productionda FPM'da Xdebug yoqish xavfli va sekin."
  ]
});
