/* Chuqur dars: 25.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.10", {
  "lesson": [
    "### Code coverage nima",
    "Coverage — testlar bajarilganda kodning qaysi qismlari ishga tushganini o'lchaydi. Turlari:",
    "- **Line coverage:** qatorlar foizi. Eng keng tarqalgan.",
    "- **Branch coverage:** har `if` ning ikkala tomoni ham bajarildimi.",
    "- **Path coverage:** barcha mumkin bo'lgan yo'llar. Eng to'liq, lekin qimmat.",
    "- Function/method coverage.",
    "",
    "### Driver kerak",
    "PHP coverage uchun kengaytma talab qiladi:",
    "- **PCOV** — faqat line coverage, lekin juda tez. CI uchun tavsiya etiladi.",
    "- **Xdebug** — line, branch va path coverage, lekin sekinroq. `XDEBUG_MODE=coverage`.",
    "",
    "Ishga tushirish: `php artisan test --coverage`, `--coverage --min=80` (foizdan kam bo'lsa yiqiladi), `vendor/bin/phpunit --coverage-html=coverage/` (brauzerda ko'riladigan hisobot), `--coverage-clover=coverage.xml` (CI va SonarQube uchun), `--coverage-text`.",
    "",
    "### Coverage nimani aytadi va nimani aytmaydi",
    "**Aytadi:** qaysi kod **umuman** test qilinmagan. 0% qamralgan modul — aniq xavf. Bu coverage'ning asosiy qiymati: test qilinmagan joylarni topish.",
    "",
    "**Aytmaydi:** testlar **yaxshi** ekanini. Assertion'siz test 100% coverage berishi mumkin. Kod ishga tushgan, lekin natija tekshirilmagan. Coverage — zaruriy, lekin yetarli emas.",
    "",
    "### Maqsad foizlari",
    "- 100% maqsad — odatda samarasiz: oxirgi 10–20% (oddiy getter'lar, framework kodi, xato holatlari) uchun ko'p vaqt, kam foyda va sun'iy testlar.",
    "- Mantiqiy maqsad: **muhim domen kodi** uchun yuqori (80–90%+), umumiy uchun 70–80%.",
    "- Muhimi — **trend**: coverage pasaymasin. CI'da \"yangi kod uchun coverage\" (diff coverage) umumiy foizdan foydaliroq: har PR o'z kodini test qilsin.",
    "",
    "### Sifatni o'lchash: mutation testing",
    "Testlar haqiqatan xatolarni ushlaydimi? **Mutation testing** (Infection) kodga kichik o'zgarishlar (mutatsiyalar) kiritadi: `>` ni `>=` ga, `+` ni `-` ga, `return true` ni `return false` ga. Keyin testlarni ishga tushiradi. Testlar yiqilsa — mutant \"o'ldirildi\" (yaxshi). O'tsa — testlar bu xatoni sezmaydi. **MSI** (Mutation Score Indicator) — coverage'dan ancha halol ko'rsatkich.",
    "",
    "### Coverage'dan chiqarish",
    "`phpunit.xml` dagi `<source>` bo'limida `<exclude>`: migratsiyalar, konfiguratsiya, generatsiya qilingan kod. `#[CoversNothing]` yoki `#[CodeCoverageIgnore]` ehtiyotkorlik bilan."
  ],
  "examples": [
    {
      "title": "phpunit.xml source va CI'da minimal foiz",
      "lang": "xml",
      "code": [
        "<source>",
        "    <include>",
        "        <directory>app</directory>",
        "    </include>",
        "    <exclude>",
        "        <directory>app/Console/Commands/Dev</directory>",
        "        <file>app/Providers/TelescopeServiceProvider.php</file>",
        "    </exclude>",
        "</source>",
        "",
        "<!-- CI: php artisan test --coverage --min=75 -->"
      ]
    },
    {
      "title": "Coverage 100%, lekin test foydasiz",
      "lang": "php",
      "code": [
        "// Kod",
        "public function isEligible(int $age): bool",
        "{",
        "    return $age >= 18;",
        "}",
        "",
        "// 100% line coverage, lekin hech narsani tekshirmaydi",
        "public function test_eligibility(): void",
        "{",
        "    (new Policy())->isEligible(20);",
        "    $this->assertTrue(true);",
        "}",
        "",
        "// Infection '>=' ni '>' ga o'zgartiradi -> test baribir o'tadi -> mutant tirik",
        "// To'g'ri test: chegara",
        "public function test_eighteen_is_eligible(): void",
        "{",
        "    $this->assertTrue((new Policy())->isEligible(18));",
        "    $this->assertFalse((new Policy())->isEligible(17));",
        "}"
      ]
    },
    {
      "title": "Infection",
      "lang": "bash",
      "code": [
        "composer require --dev infection/infection",
        "vendor/bin/infection --threads=4 --min-msi=70 --only-covered --filter=app/Pricing"
      ]
    }
  ],
  "pitfalls": [
    "Coverage foizini test sifati o'lchovi deb hisoblash.",
    "100% coverage'ga majburlash: sun'iy, assertion'siz testlar paydo bo'ladi.",
    "CI'da Xdebug bilan coverage: testlar bir necha baravar sekin. PCOV ishlating.",
    "Coverage hisobotiga hech qachon qaramaslik: muhim modullar 0% bo'lib qolishi."
  ]
});
