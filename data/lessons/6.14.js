/* Chuqur dars: 6.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.14", {
  "lesson": [
    "### Maintainability",
    "**Maintainability (qo'llab-quvvatlash qulayligi)** — kodni tushunish, o'zgartirish, test qilish va xatoni tuzatish **qanchalik oson** ekanligi. Dasturiy ta'minot umrining ko'p qismi qo'llab-quvvatlashga ketadi.",
    "",
    "### Tarkibiy qismlari (ISO 25010)",
    "- **Modullilik:** bir qism o'zgarsa boshqasi kam ta'sirlanadi.",
    "- **Qayta ishlatish.**",
    "- **Tahlil qilinish (analysability):** muammo sababini topish oson.",
    "- **O'zgartirilish (modifiability).**",
    "- **Testlanuvchanlik.**",
    "",
    "### Omillar",
    "Past coupling, yuqori cohesion; kichik funksiyalar; aniq nomlar; testlar (regressiyadan himoya); hujjat va izohlar (\"nima uchun\"); izchil uslub; tiplar va statik tahlil; zamonaviy bog'liqliklar.",
    "",
    "### Metrikalar",
    "- **Sikllomatik murakkablik** (mantiq tarmoqlari soni; funksiya uchun ~10 dan oshmasin).",
    "- **Cognitive complexity.**",
    "- Klass/metod hajmi, bog'liqliklar soni.",
    "- Test qamrovi va mutation score (Infection).",
    "- **Churn + murakkablik** (hotspot).",
    "Vositalar: PHPMetrics, PHPMD, PHPStan, SonarQube, Infection.",
    "",
    "### Amaliyotlar",
    "Code review, CI (test, statik tahlil, format), ADR (qarorlar yozuvi), README va arxitektura hujjati, versiyalarni yangilab turish, monitoring va log (muammoni tez topish).",
    "",
    "### Yo'q qiluvchilar",
    "God class, global holat, hujjatsiz \"tribal knowledge\", test yo'qligi, eskirgan bog'liqlik.",
    "",
    "### Maqsad",
    "Yangi odam bir kunda sodda vazifani bajara olsin, o'zgarish kichik xavf bilan chiqsin."
  ],
  "examples": [
    {
      "title": "CI tekshiruvlari",
      "lang": "bash",
      "code": [
        "vendor/bin/pint --test          # format",
        "vendor/bin/phpstan analyse      # statik tahlil",
        "vendor/bin/pest --coverage      # testlar va qamrov",
        "vendor/bin/infection --min-msi=70   # mutation testing"
      ]
    }
  ],
  "pitfalls": [
    "Metrikaga maqsad sifatida qarash (faqat raqamni yaxshilash) ma'noni yo'qotadi.",
    "Test qamrovi yuqori bo'lsa ham testlar sifatsiz bo'lishi mumkin: mutation testing.",
    "Hujjat va ADR'siz qarorlarning sababi yo'qoladi.",
    "Bog'liqliklarni yangilamaslik qo'llab-quvvatlashni vaqt o'tgan sari qimmatlashtiradi."
  ]
});
