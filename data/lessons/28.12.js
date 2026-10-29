/* Chuqur dars: 28.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.12", {
  "lesson": [
    "### Test muhiti konfiguratsiyasi",
    "Testlar o'z sozlamalari bilan ishlashi kerak: alohida DB, soxta yoki yengil servislar, tez driver'lar. Laravel bu uchun bir necha mexanizm beradi.",
    "",
    "### Manbalar va ustunlik",
    "- `.env.testing`: `APP_ENV=testing` bo'lganda Laravel `.env` o'rniga shu faylni yuklaydi (mavjud bo'lsa). Testga xos qiymatlar shu yerda.",
    "- `phpunit.xml` dagi `<env>`: testlar ishga tushganda muhit o'zgaruvchilarini belgilaydi. Odatda eng yuqori ustunlikka ega, shuning uchun majburiy sozlamalar (`APP_ENV=testing`, `DB_DATABASE`) shu yerda yoziladi.",
    "- **CI muhit o'zgaruvchilari**: CI'da DB host, port va maxfiy kalitlar shu orqali beriladi.",
    "- Test ichida `config([...])`: faqat shu test uchun qiymatni vaqtincha o'zgartiradi.",
    "",
    "### Odatiy test sozlamalari",
    "- `DB_DATABASE=app_test`: alohida test DB.",
    "- `CACHE_STORE=array`: tez va izolyatsiyalangan cache (Redis'ni sinaydigan testlarda `redis`).",
    "- `QUEUE_CONNECTION=sync`: job'lar darhol bajariladi.",
    "- `MAIL_MAILER=array`: xatlar yuborilmaydi, saqlanadi.",
    "- `SESSION_DRIVER=array`, `BCRYPT_ROUNDS=4`: parol heshlash tezlashadi.",
    "- `TELESCOPE_ENABLED=false`, `PULSE_ENABLED=false`: keraksiz kuzatuv o'chiriladi.",
    "- Tashqi servislar uchun **sandbox URL va soxta kalitlar**, hech qachon haqiqiy.",
    "",
    "### Integratsion testlar uchun alohida konfiguratsiya",
    "Integratsion testlar ko'pincha haqiqiy Redis yoki haqiqiy navbat talab qiladi, unit testlar esa yengil driver bilan ishlaydi. Buni `phpunit.xml` da alohida test to'plami (`Integration`) va test ichida `config([...])` yoki guruhga xos `setUp` bilan boshqaring.",
    "",
    "### Xavfsizlik",
    "`.env.testing` ni repozitoriyga qo'shsangiz, unda haqiqiy maxfiy kalit bo'lmasin. Faqat test uchun xavfsiz qiymatlar yozing. Haqiqiy sandbox kalitlari CI secret'larida turadi.",
    "",
    "### Konfiguratsiya keshi",
    "`config:cache` qolib ketgan bo'lsa, yuqoridagi sozlamalarning hech biri o'qilmaydi. Testlardan oldin `php artisan config:clear` qiling yoki CI'da kesh yaratmang."
  ],
  "examples": [
    {
      "title": "phpunit.xml dagi muhit",
      "lang": "xml",
      "code": [
        "<php>",
        "    <env name=\"APP_ENV\" value=\"testing\"/>",
        "    <env name=\"DB_DATABASE\" value=\"app_test\"/>",
        "    <env name=\"CACHE_STORE\" value=\"array\"/>",
        "    <env name=\"QUEUE_CONNECTION\" value=\"sync\"/>",
        "    <env name=\"MAIL_MAILER\" value=\"array\"/>",
        "    <env name=\"SESSION_DRIVER\" value=\"array\"/>",
        "    <env name=\"BCRYPT_ROUNDS\" value=\"4\"/>",
        "    <env name=\"TELESCOPE_ENABLED\" value=\"false\"/>",
        "</php>"
      ],
      "note": "Tez va izolyatsiyalangan driver'lar testlarni sezilarli tezlashtiradi."
    },
    {
      "title": "Integratsion test uchun konfiguratsiyani almashtirish",
      "lang": "php",
      "code": [
        "// tests/Integration/RedisRateLimiterTest.php",
        "beforeEach(function () {",
        "    config([",
        "        'cache.default' => 'redis',",
        "        'database.redis.default.database' => 15,",
        "    ]);",
        "    Redis::connection('default')->flushdb();",
        "});",
        "",
        "it('blocks after the limit', function () {",
        "    $limiter = app(LoginRateLimiter::class);",
        "",
        "    foreach (range(1, 5) as $_) {",
        "        $limiter->hit('user@ex.uz');",
        "    }",
        "",
        "    expect($limiter->tooManyAttempts('user@ex.uz'))->toBeTrue();",
        "})->group('redis');"
      ],
      "note": "Odatiy array cache o'rniga bu testlar haqiqiy Redis bilan ishlaydi."
    }
  ],
  "pitfalls": [
    "`.env.testing` ga haqiqiy maxfiy kalitlarni yozish: fayl repozitoriyga tushib ketadi.",
    "Test paytida haqiqiy to'lov yoki SMS kalitlari bilan ishlash: haqiqiy pul yechiladi yoki xabar yuboriladi.",
    "`config:cache` qolib ketishi: testlar yangi sozlamalarni ko'rmaydi.",
    "Unit va integratsion testlar uchun bir xil konfiguratsiya: yo yengil driver integratsion testni yolg'on yashil qiladi, yo haqiqiy servis unit testlarni sekinlashtiradi."
  ]
});
