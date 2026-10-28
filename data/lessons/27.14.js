/* Chuqur dars: 27.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.14", {
  "lesson": [
    "### Raqam emas, xarita",
    "Coverage (25.10) — qaysi kod **ishga tushganini** ko'rsatadi, qaysi kod **to'g'ri tekshirilganini** emas. Uni umumiy foiz sifatida emas, **qayerda test yo'qligini** ko'rsatuvchi xarita sifatida o'qing.",
    "",
    "### Hisobotni o'qish",
    "HTML hisoboti (`--coverage-html`) har faylni qatorlar bo'yicha bo'yaydi:",
    "- **Qizil qatorlar** — hech qanday test ishga tushirmagan. Ular muhim kodda bo'lsa (narx, ruxsatlar, to'lov) — xavf.",
    "- **Branch coverage** (Xdebug): `if` ning faqat bitta tomoni bajarilgan bo'lsa, ikkinchi tomon test qilinmagan. Line coverage buni ko'rsatmaydi: `return $a > 0 ? x : y;` bitta qator va 100% line coverage, lekin ikki shoxdan biri test qilinmagan.",
    "- **Fayl darajasidagi foizlar** — qaysi modul e'tibordan chetda qolgan.",
    "",
    "### Savollar",
    "1. Muhim domen kodining coverage'i qancha? (Umumiy foizdan muhimroq.)",
    "2. Qamralmagan qatorlar nima: xato yo'llari, chegara holatlar, o'lik kod?",
    "3. O'lik kod bo'lsa — test yozish emas, **o'chirish** kerak.",
    "4. Yangi PR o'z kodini qamraydimi (diff coverage)?",
    "",
    "### Yolg'on ishonch",
    "- Assertion'siz testlar coverage'ni oshiradi, lekin hech narsani tekshirmaydi.",
    "- Bitta katta feature test ko'p kodni \"qamraydi\", lekin uning har shoxini tekshirmaydi.",
    "- Coverage foizini maqsad qilsangiz (Goodhart qonuni: \"o'lchov maqsadga aylansa, yaxshi o'lchov bo'lmay qoladi\"), sun'iy testlar paydo bo'ladi.",
    "",
    "Haqiqiy sifat ko'rsatkichi — **mutation score** (26.17): testlar kod o'zgarishlarini sezadimi.",
    "",
    "### Amaliy siyosat",
    "- Muhim modullar uchun yuqori maqsad, umumiy uchun o'rtacha (25.10).",
    "- CI'da coverage pasaymasin (ratchet) va yangi kod qamralsin.",
    "- Coverage hisobotini code review'da ko'rish: MR'da qatorlar bo'yicha qamrov (GitLab Cobertura, 25.17).",
    "- Vaqti-vaqti bilan muhim modullarda mutation testing."
  ],
  "examples": [
    {
      "title": "100% line coverage, lekin shox test qilinmagan",
      "lang": "php",
      "code": [
        "public function fee(int $amount): int",
        "{",
        "    return $amount >= 1_000_000 ? 0 : 5_000;   // bitta qator",
        "}",
        "",
        "it('charges fee for small payments', fn () => expect((new Fees())->fee(100))->toBe(5_000));",
        "",
        "// Line coverage: 100%",
        "// Branch coverage: 50% (>= 1 000 000 shoxi test qilinmagan)",
        "// Infection: '>=' -> '>' mutanti tirik"
      ]
    },
    {
      "title": "Branch coverage va hisobot",
      "lang": "bash",
      "code": [
        "XDEBUG_MODE=coverage ./vendor/bin/pest --coverage-html=coverage --path-coverage",
        "# coverage/index.html — fayllar, qatorlar va shoxlar"
      ],
      "note": "`--path-coverage` branch va path coverage uchun Xdebug talab qiladi va sekin ishlaydi. PCOV faqat line coverage beradi."
    }
  ],
  "pitfalls": [
    "Umumiy foizga qarab, muhim modulning past qamrovini sezmaslik.",
    "Line coverage 100% ni barcha shoxlar test qilingan deb tushunish.",
    "O'lik kod uchun test yozish, uni o'chirish o'rniga.",
    "Coverage foizini jamoa KPI'siga aylantirish."
  ]
});
