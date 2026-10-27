/* Chuqur dars: 57.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.17", {
  "lesson": [
    "### Asosiy qoida",
    "**Productionda Xdebug yoqilmaydi.** Sabablari: sezilarli sekinlashish, xotira, va **xavfsizlik** (debug sessiya/trace orqali kod va ma'lumotni ochib berish, masofaviy ulanish).",
    "",
    "### Agar baribir kerak bo'lsa (kamdan-kam)",
    "Faqat vaqtincha, cheklangan: ",
    "- `xdebug.mode=off` default, kerak bo'lganda env orqali.",
    "- `start_with_request=trigger`.",
    "- `xdebug.client_host` ni **qat'iy** ishonchli IP'ga (SSH tunnel `127.0.0.1`), `discover_client_host=0`.",
    "- Faqat bitta worker/instansiya, trafikdan ajratilgan (canary), qisqa muddat.",
    "- Port 9003 tashqariga ochilmasin.",
    "",
    "### Xavfsiz konfiguratsiya",
    "```ini",
    "xdebug.mode=off",
    "xdebug.start_with_request=no",
    "xdebug.discover_client_host=0",
    "```",
    "(Yoki umuman `zend_extension=xdebug` yuklamang.)",
    "",
    "### Tavsiya etilgan yondashuv",
    "- **Image'lar:** dev image'da Xdebug, production image'da yo'q (multi-stage Dockerfile, `--no-dev`).",
    "- **Profiling/trace production'da:** Blackfire, Tideways, SPX, Sentry Profiling (sampling, kam yuk).",
    "- **Loglar va APM** bilan muammoni diagnostika qiling.",
    "- Muammoni **staging**da qayta ishlab chiqaring va Xdebug'ni o'sha yerda ishlating.",
    "",
    "### Fayllar xavfsizligi",
    "Profil/trace fayllari (`cachegrind`, `.xt`) maxfiy ma'lumot saqlashi mumkin: web-ildizdan tashqarida, ruxsat cheklangan, ishlatgach o'chiriladi, Git'ga kirmaydi.",
    "",
    "### Tekshiruv ro'yxati",
    "`php -m | grep xdebug` production'da bo'sh; `phpinfo()` o'chiq; CI deploy skripti Xdebug yo'qligini tekshiradi."
  ],
  "examples": [
    {
      "title": "Production Dockerfile (Xdebug yo'q)",
      "lang": "dockerfile",
      "code": [
        "FROM php:8.4-fpm AS base",
        "RUN docker-php-ext-install pdo_mysql opcache",
        "",
        "FROM base AS dev",
        "RUN pecl install xdebug && docker-php-ext-enable xdebug     # faqat dev stage",
        "",
        "FROM base AS prod",
        "COPY --from=composer:2 /usr/bin/composer /usr/bin/composer",
        "# prod'da xdebug yo'q"
      ]
    }
  ],
  "pitfalls": [
    "Production image'ga Xdebug kirib qolishi sekinlashtiradi va xavfsizlik teshigi.",
    "`discover_client_host=1` ochiq tarmoqda begona ulanishga ruxsat berishi mumkin.",
    "Profil/trace fayllarini web-ildizda qoldirish maxfiy ma'lumotni oshkor qiladi.",
    "Production diagnostikasi uchun Xdebug emas, sampling profiler va APM ishlating."
  ]
});
