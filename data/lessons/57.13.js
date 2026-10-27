/* Chuqur dars: 57.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.13", {
  "lesson": [
    "### CLI Debugging",
    "Artisan buyruqlari, skriptlar, queue worker va testlarni terminalda ishga tushirib tuzatish. Brauzer cookie'si yo'q, shuning uchun **muhit o'zgaruvchilari** ishlatiladi.",
    "",
    "### Ishga tushirish",
    "```bash",
    "XDEBUG_SESSION=1 php artisan app:import",
    "XDEBUG_MODE=debug XDEBUG_SESSION=1 php script.php",
    "```",
    "`xdebug.start_with_request=trigger` bo'lsa `XDEBUG_SESSION` (yoki `XDEBUG_TRIGGER`) env kerak. Yoki `php -dxdebug.mode=debug -dxdebug.start_with_request=yes script.php`.",
    "",
    "### IDE tomoni",
    "Tinglash yoqilgan bo'lsin (port 9003). PhpStorm: CLI uchun \"PHP Remote Debug\" yoki \"PHP Script\" konfiguratsiyasidan debug.",
    "",
    "### Testlarni tuzatish",
    "```bash",
    "XDEBUG_SESSION=1 vendor/bin/phpunit --filter test_payment_fails",
    "XDEBUG_SESSION=1 vendor/bin/pest tests/Feature/CheckoutTest.php",
    "```",
    "",
    "### Queue worker",
    "`XDEBUG_SESSION=1 php artisan queue:work --once` (bitta job'ni qadam-baqadam). Uzoq yashovchi worker'da xotira/holat kuzatiladi.",
    "",
    "### Docker ichida",
    "`docker compose exec -e XDEBUG_SESSION=1 app php artisan ...`; `client_host=host.docker.internal`.",
    "",
    "### Nuance",
    "CLI php.ini boshqa bo'lishi mumkin: `php --ini` bilan tekshiring; Xdebug CLI uchun yoqilganini (`php -v`) ko'ring.",
    "",
    "### Maslahat",
    "Skript tez tugasa, sessiya darhol yopilishi mumkin: avval breakpoint, keyin ishga tushiring; kerak bo'lsa `xdebug_break()` ni vaqtincha qo'ying."
  ],
  "examples": [
    {
      "title": "Artisan va test",
      "lang": "bash",
      "code": [
        "XDEBUG_SESSION=1 php artisan queue:work --once",
        "XDEBUG_SESSION=1 vendor/bin/pest --filter=\"calculates tax\"",
        "docker compose exec -e XDEBUG_SESSION=1 app php artisan app:import"
      ]
    }
  ],
  "pitfalls": [
    "CLI php.ini boshqa bo'lishi mumkin: Xdebug CLI uchun yoqilganini tekshiring.",
    "`XDEBUG_SESSION` env berilmasa `trigger` rejimida sessiya boshlanmaydi.",
    "IDE tinglamasa skript oddiy ishlab ketadi (debug yo'q).",
    "Docker'da `client_host` noto'g'ri bo'lsa ulanish bo'lmaydi."
  ]
});
