/* Chuqur dars: 25.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.16", {
  "lesson": [
    "### phpunit.xml",
    "PHPUnit konfiguratsiyasi loyiha ildizidagi `phpunit.xml` (yoki `phpunit.xml.dist` — repozitoriyga qo'shiladigan default, `phpunit.xml` esa lokal override va `.gitignore` da). Laravel tayyor `phpunit.xml` bilan keladi.",
    "",
    "### Asosiy bo'limlar",
    "**`<phpunit>` atributlari:**",
    "- `bootstrap=\"vendor/autoload.php\"`.",
    "- `colors=\"true\"`.",
    "- `cacheDirectory=\".phpunit.cache\"` (PHPUnit 10+): natijalar keshi, `--order-by=defects` uchun.",
    "- **Qat'iylik sozlamalari:** `failOnRisky=\"true\"`, `failOnWarning=\"true\"`, `failOnDeprecation`, `failOnNotice`, `beStrictAboutOutputDuringTests=\"true\"` (testda `echo` yoki `dd()` qoldirilsa, yiqiladi), `beStrictAboutTestsThatDoNotTestAnything` (assertion'siz test).",
    "- `displayDetailsOnTestsThatTriggerDeprecations=\"true\"` — PHP va kutubxona deprecation'larini ko'rsatish (versiya yangilashga tayyorgarlik).",
    "- `executionOrder=\"random\"` (25.14).",
    "",
    "**`<testsuites>`** (25.15).",
    "",
    "**`<source>`** (PHPUnit 10+): coverage va deprecation hisobotlari qaysi kod uchun (25.10). Eski `<coverage><include>` o'rniga.",
    "",
    "**`<php>`:** test muhiti uchun env va ini qiymatlari:",
    "- `<env name=\"APP_ENV\" value=\"testing\"/>`.",
    "- Tez va izolyatsiyalangan driver'lar: `CACHE_STORE=array`, `SESSION_DRIVER=array`, `QUEUE_CONNECTION=sync`, `MAIL_MAILER=array`.",
    "- `BCRYPT_ROUNDS=4` — parol hash'lash testlarda tez (production'da 12).",
    "- Alohida test bazasi (25.13).",
    "- `<ini name=\"memory_limit\" value=\"512M\"/>`.",
    "- `force=\"true\"` atributi — `.env` dagi qiymatni ham ustidan yozish.",
    "",
    "**`<extensions>`:** PHPUnit kengaytmalari (masalan, sekin testlar hisoboti).",
    "",
    "### .env.testing",
    "Laravel `APP_ENV=testing` bo'lsa, `.env.testing` faylini yuklaydi (mavjud bo'lsa). Ko'p sozlamalar uchun `phpunit.xml` dan qulayroq, lekin maxfiy qiymatlarni Git'ga qo'shmang.",
    "",
    "### config:cache tuzog'i",
    "`php artisan config:cache` dan keyin Laravel `.env` va `phpunit.xml` dagi env qiymatlarini **o'qimaydi**: keshlangan konfiguratsiyani ishlatadi. Testlar dev yoki production konfiguratsiyasi bilan ishlashi mumkin (25.13). `php artisan test` buni ba'zi holatlarda ogohlantiradi, lekin ishonmang: testlardan oldin `php artisan config:clear` va lokal muhitda config keshlamang.",
    "",
    "### Versiya yangilash",
    "PHPUnit major versiyalarida konfiguratsiya formati o'zgaradi. `vendor/bin/phpunit --migrate-configuration` eski faylni yangi formatga o'tkazadi."
  ],
  "examples": [
    {
      "title": "Qat'iy phpunit.xml (Laravel 11, PHPUnit 11)",
      "lang": "xml",
      "code": [
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
        "<phpunit xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"",
        "         xsi:noNamespaceSchemaLocation=\"vendor/phpunit/phpunit/phpunit.xsd\"",
        "         bootstrap=\"vendor/autoload.php\"",
        "         colors=\"true\"",
        "         cacheDirectory=\".phpunit.cache\"",
        "         executionOrder=\"random\"",
        "         failOnRisky=\"true\"",
        "         failOnWarning=\"true\"",
        "         beStrictAboutOutputDuringTests=\"true\"",
        "         displayDetailsOnTestsThatTriggerDeprecations=\"true\">",
        "    <testsuites>",
        "        <testsuite name=\"Unit\"><directory>tests/Unit</directory></testsuite>",
        "        <testsuite name=\"Feature\"><directory>tests/Feature</directory></testsuite>",
        "    </testsuites>",
        "    <source>",
        "        <include><directory>app</directory></include>",
        "    </source>",
        "    <php>",
        "        <env name=\"APP_ENV\" value=\"testing\" force=\"true\"/>",
        "        <env name=\"BCRYPT_ROUNDS\" value=\"4\"/>",
        "        <env name=\"CACHE_STORE\" value=\"array\"/>",
        "        <env name=\"DB_DATABASE\" value=\"app_testing\"/>",
        "        <env name=\"MAIL_MAILER\" value=\"array\"/>",
        "        <env name=\"QUEUE_CONNECTION\" value=\"sync\"/>",
        "        <env name=\"SESSION_DRIVER\" value=\"array\"/>",
        "        <env name=\"TELESCOPE_ENABLED\" value=\"false\"/>",
        "    </php>",
        "</phpunit>"
      ]
    },
    {
      "title": "Konfiguratsiyani yangilash va tekshirish",
      "lang": "bash",
      "code": [
        "vendor/bin/phpunit --migrate-configuration",
        "vendor/bin/phpunit --validate-configuration   # PHPUnit 11+",
        "php artisan config:clear && php artisan test"
      ]
    }
  ],
  "pitfalls": [
    "`config:cache` qilingan muhitda testlarni ishga tushirish: `phpunit.xml` env qiymatlari e'tiborsiz qoladi.",
    "Testlarda `BCRYPT_ROUNDS` ni pasaytirmaslik: parolli har factory sekin.",
    "`beStrictAboutOutputDuringTests` siz `dd()` yoki `dump()` qoldirilgan testlar.",
    "Deprecation'larni ko'rsatmaslik: PHP yoki Laravel yangilanganda kutilmagan xatolar."
  ]
});
