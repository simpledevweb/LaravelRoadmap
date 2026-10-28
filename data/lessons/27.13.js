/* Chuqur dars: 27.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.13", {
  "lesson": [
    "### Nega tezlik muhim",
    "Unit testlarning qiymati — **tez fikr-mulohaza**. Agar ular 2 soniyada ishlasa, dasturchi har o'zgarishdan keyin ishga tushiradi (yoki `--watch` bilan avtomatik). 5 daqiqa bo'lsa — kuniga bir marta, va xatolar kech topiladi. TDD (30.x) faqat tez testlar bilan ishlaydi.",
    "",
    "Maqsad: minglab unit test — bir necha soniya. Har biri millisekundlar.",
    "",
    "### Sekinlik sabablari",
    "1. **Framework yuklash.** Laravel `Tests\\TestCase` har test uchun ilovani yaratadi (o'nlab millisekund). Unit testlar `PHPUnit\\Framework\\TestCase` dan (27.4).",
    "2. **DB.** Unit testda DB bo'lmasligi kerak. Agar kerak bo'lsa — bu integratsiya testi.",
    "3. **Tarmoq va disk.** Fake'lar.",
    "4. **`sleep()` va kutishlar.** `Sleep::fake()` (27.10) yoki vaqtni boshqarish.",
    "5. **Og'ir fixture'lar.** Katta JSON fayllarni har testda o'qish, katta obyekt grafiklari. Kichik va maqsadli fixture'lar.",
    "6. **Parol hash'lash.** `bcrypt` qasddan sekin. Testlarda `BCRYPT_ROUNDS=4` (25.16) yoki hash'ni oldindan hisoblash.",
    "7. **Coverage driver.** Xdebug yoqilgan bo'lsa, hamma testlar sekin. Lokal ishda Xdebug'ni faqat kerak bo'lganda yoqing (`XDEBUG_MODE=off`), coverage uchun PCOV.",
    "",
    "### O'lchash",
    "- `./vendor/bin/pest --profile` — eng sekin testlar.",
    "- PHPUnit `--log-junit` dan vaqtlar.",
    "- Unit suite umumiy vaqtini CI'da kuzatish va chegaradan oshsa ogohlantirish.",
    "",
    "### Tuzilma",
    "Tez va sekin testlarni ajratish (25.15): `tests/Unit` (tez, har saqlashda) va `tests/Feature` (sekinroq, push oldidan va CI'da). Unit suite'ga sekin test kirib qolsa, butun to'plamning qiymati pasayadi.",
    "",
    "### Arxitektura bilan bog'liqlik",
    "Tez unit testlar — toza arxitekturaning natijasi: domen mantiqi framework, DB va tashqi servislardan ajratilgan bo'lsa (61.x, 64.x), uni tez test qilish tabiiy."
  ],
  "examples": [
    {
      "title": "Tez unit suite'ni ta'minlash",
      "lang": "bash",
      "code": [
        "# Eng sekin 10 test",
        "./vendor/bin/pest --testsuite=Unit --profile",
        "",
        "# Xdebug'siz tez ishga tushirish",
        "XDEBUG_MODE=off ./vendor/bin/pest --testsuite=Unit",
        "",
        "# Har saqlashda avtomatik (pest-plugin-watch)",
        "./vendor/bin/pest --testsuite=Unit --watch"
      ]
    },
    {
      "title": "Arch test: unit testlar framework'ga ulanmasin",
      "lang": "php",
      "code": [
        "arch('unit tests do not boot Laravel')",
        "    ->expect('Tests\\Unit')",
        "    ->not->toExtend('Tests\\TestCase')",
        "    ->not->toUse(['Illuminate\\Support\\Facades', 'Illuminate\\Foundation\\Testing\\RefreshDatabase']);"
      ],
      "note": "Pest funksional testlarida klass yo'q, shuning uchun bu qoida faqat PHPUnit klassli unit testlar uchun to'liq ishlaydi. Pest'da `tests/Pest.php` dagi `->in('Feature')` chegarasi asosiy himoya."
    }
  ],
  "pitfalls": [
    "Unit testlarni Laravel `TestCase` ga ulab, framework yuklash bilan sekinlashtirish.",
    "Lokal ishda Xdebug'ni doim yoqiq qoldirish.",
    "Unit suite'ga DB yoki tarmoqqa murojaat qiluvchi testlarni qo'shish.",
    "Test vaqtini o'lchamasdan, sekinlik sezilarli bo'lguncha kutish."
  ]
});
