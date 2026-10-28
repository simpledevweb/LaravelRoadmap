/* Chuqur dars: 25.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.15", {
  "lesson": [
    "### Test suite nima",
    "Test suite — testlarning nomlangan guruhi. `phpunit.xml` da `<testsuites>` bo'limida e'lon qilinadi va papka yoki fayllar bo'yicha belgilanadi. Laravel default'da ikkita: **Unit** (`tests/Unit`) va **Feature** (`tests/Feature`).",
    "",
    "Ishga tushirish: `php artisan test --testsuite=Unit` yoki `vendor/bin/phpunit --testsuite=Feature`.",
    "",
    "### Nega bo'lish kerak",
    "Turli testlar turli tezlik va bog'liqliklarga ega:",
    "- **Unit:** soniyalar, bog'liqliksiz. Har saqlashda yoki pre-commit hook'da.",
    "- **Integration / Feature:** daqiqalar, DB kerak. Har push'da CI'da.",
    "- **Contract (19.19):** OpenAPI'ga qarshi.",
    "- **External (tashqi sandbox'larga qarshi):** sekin va beqaror, kecha yoki qo'lda.",
    "- **Browser (Dusk) / E2E:** eng sekin, alohida pipeline bosqichi.",
    "- **Arch (Pest arch testlari):** arxitektura qoidalari.",
    "",
    "Tez fikr-mulohaza sikli: dasturchi tez testlarni tez-tez, sekinlarini kamroq ishga tushiradi.",
    "",
    "### Guruhlar (#[Group])",
    "Suite'lardan tashqari, testlarni kesib o'tuvchi teglar bilan belgilash:",
    "- `#[Group('slow')]`, `#[Group('external')]`, `#[Group('payments')]`.",
    "- `--group=payments` — faqat to'lov bilan bog'liq testlar (to'lov modulini o'zgartirganda).",
    "- `--exclude-group=external,slow` — CI'ning asosiy bosqichida.",
    "- `phpunit.xml` da `<groups><exclude><group>external</group></exclude></groups>` — default'da chiqarib tashlash.",
    "",
    "### Test turlari bo'yicha papka tuzilmasi",
    "Katta loyihada `tests/` ni modullar bo'yicha ham tashkil qilish mumkin: `tests/Feature/Orders`, `tests/Feature/Payments`, `tests/Unit/Domain/Pricing`. Production kod tuzilmasini aks ettirish testni topishni osonlashtiradi.",
    "",
    "### Tezlik bo'yicha strategiya",
    "- **Test piramidasi:** ko'p unit (tez), kamroq integratsiya, kam E2E (sekin).",
    "- CI'da birinchi bo'lib tez suite'lar (`--stop-on-failure` bilan): tez xato, resurs tejash.",
    "- Sekin suite'larni parallel (`--parallel`) va bir nechta CI job'ga bo'lish (sharding).",
    "- Eng sekin testlarni aniqlash: `--log-junit` hisobotidan yoki Pest `--profile`.",
    "",
    "### Har suite uchun sozlamalar",
    "Bitta `phpunit.xml` barcha suite'lar uchun bir xil `<php>` env qiymatlari beradi. Turli konfiguratsiya kerak bo'lsa (masalan, external testlar uchun haqiqiy sandbox kalitlari), alohida fayl: `phpunit.external.xml` va `--configuration=phpunit.external.xml`."
  ],
  "examples": [
    {
      "title": "phpunit.xml suite'lar va guruhlar",
      "lang": "xml",
      "code": [
        "<testsuites>",
        "    <testsuite name=\"Unit\">",
        "        <directory>tests/Unit</directory>",
        "    </testsuite>",
        "    <testsuite name=\"Feature\">",
        "        <directory>tests/Feature</directory>",
        "    </testsuite>",
        "    <testsuite name=\"Contract\">",
        "        <directory>tests/Contract</directory>",
        "    </testsuite>",
        "</testsuites>",
        "",
        "<groups>",
        "    <exclude>",
        "        <group>external</group>",
        "    </exclude>",
        "</groups>"
      ]
    },
    {
      "title": "Guruh bilan belgilash va ishga tushirish",
      "lang": "php",
      "code": [
        "use PHPUnit\\Framework\\Attributes\\Group;",
        "",
        "#[Group('external')]",
        "#[Group('payments')]",
        "final class ClickSandboxTest extends TestCase",
        "{",
        "    public function test_prepare_and_complete_in_sandbox(): void { /* ... */ }",
        "}",
        "",
        "// php artisan test --testsuite=Unit                    # tez, lokal",
        "// php artisan test --exclude-group=external --parallel # CI asosiy",
        "// php artisan test --group=external                    # kechki job"
      ]
    }
  ],
  "pitfalls": [
    "Barcha testlarni bitta suite'da ishga tushirish: dasturchi sekin to'plamni kam ishga tushiradi.",
    "Tashqi sandbox testlarini asosiy CI'ga qo'shish: tarmoq muammolari PR'larni bloklaydi.",
    "Unit suite'ga DB talab qiluvchi testlarni qo'yish: tez to'plam sekinlashadi.",
    "Sekin testlarni o'lchamasdan, CI vaqti o'sib borishiga yo'l qo'yish."
  ]
});
