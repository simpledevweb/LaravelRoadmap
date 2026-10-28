/* Chuqur dars: 26.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.17", {
  "lesson": [
    "### Ikki vosita, bitta maqsad: sifat",
    "Oddiy testlar \"kod to'g'ri ishlaydimi\" ni tekshiradi. Bu darsdagi ikki vosita boshqa savollarga javob beradi:",
    "- **Arxitektura testlari** (26.8): kod **tuzilmasi** jamoa kelishuvlariga mosmi?",
    "- **Mutation testing**: testlar haqiqatan **xatolarni ushlaydimi**?",
    "",
    "### Mutation testing qanday ishlaydi",
    "Vosita production kodga kichik o'zgarishlar (**mutatsiya**) kiritadi va har biri uchun testlarni ishga tushiradi:",
    "- `>` → `>=`, `===` → `!==`, `&&` → `||`,",
    "- `return true` → `return false`, `+` → `-`,",
    "- metod chaqiruvini olib tashlash, massiv elementini olib tashlash va hokazo.",
    "",
    "Natija:",
    "- Testlar yiqildi — mutant **o'ldirildi** (yaxshi: testlar bu xatoni sezadi).",
    "- Testlar o'tdi — mutant **tirik qoldi** (yomon: bu xatoni hech qaysi test ushlamaydi).",
    "",
    "**Mutation score** = o'ldirilganlar / jami mutantlar. 100% coverage bo'lsa ham score past bo'lishi mumkin: kod ishga tushirilgan, lekin natija tekshirilmagan (25.10).",
    "",
    "### Pest'da (Pest 3+)",
    "- Test faylida yoki testda qaysi kod qamralishini ko'rsatish: `covers(Discount::class);` yoki `mutates(Discount::class);`. Pest faqat shu klasslarni mutatsiya qiladi va faqat tegishli testlarni ishga tushiradi. Bu tezlikning kaliti.",
    "- `./vendor/bin/pest --mutate` — mutatsiyalarni ishga tushirish.",
    "- `--mutate --min=80` — chegaradan past bo'lsa, yiqiladi.",
    "- `--parallel` bilan birga, `--covered-only`.",
    "- Natijada tirik mutantlar fayl va qator bo'yicha ko'rsatiladi.",
    "",
    "Muqobil: **Infection** (`infection/infection`) — PHPUnit va Pest bilan ishlaydi, ko'proq mutator va sozlamalar.",
    "",
    "### Amaliy qo'llash",
    "- Mutation testing qimmat (har mutant uchun testlar). Butun loyihada har PR'da emas. Muhim domen kodida (narxlash, to'lov, ruxsatlar), kechki job yoki o'zgargan fayllar uchun.",
    "- Tirik mutantni ko'rib, yetishmayotgan testni yozing (ko'pincha chegara qiymati: `>=` va `>` farqi). Ba'zi mutantlar \"ekvivalent\" — kod xulq-atvorini o'zgartirmaydi. Ularni e'tiborsiz qoldirish mumkin.",
    "",
    "### Arxitektura testlari bilan birga",
    "Arch testlari tez (soniyalar) va har PR'da. Mutation testing sekin va tanlab. Ikkalasi: tuzilma intizomi + testlar sifati."
  ],
  "examples": [
    {
      "title": "mutates va tirik mutant",
      "lang": "php",
      "code": [
        "// app/Pricing/Discount.php",
        "public function apply(int $total): int",
        "{",
        "    return $total > 1_000_000 ? (int) round($total * 0.9) : $total;",
        "}",
        "",
        "// tests/Unit/DiscountTest.php",
        "mutates(Discount::class);",
        "",
        "it('discounts large orders', fn () => expect((new Discount())->apply(2_000_000))->toBe(1_800_000));",
        "it('does not discount small orders', fn () => expect((new Discount())->apply(500_000))->toBe(500_000));",
        "",
        "// ./vendor/bin/pest --mutate",
        "// ✗ Mutant survived: Discount.php:9  '>' -> '>='",
        "// Yechim: chegara testi",
        "it('does not discount exactly at threshold', fn () => expect((new Discount())->apply(1_000_000))->toBe(1_000_000));"
      ]
    },
    {
      "title": "CI'da tanlab ishga tushirish",
      "lang": "bash",
      "code": [
        "# Har PR: arch testlari",
        "./vendor/bin/pest tests/ArchTest.php",
        "",
        "# Kechki job: muhim modullar uchun mutation",
        "./vendor/bin/pest --mutate --parallel --min=80 tests/Unit/Pricing tests/Unit/Payments"
      ]
    }
  ],
  "pitfalls": [
    "Butun loyihada har PR'da mutation testing: pipeline soatlab davom etadi.",
    "`mutates()`/`covers()` siz ishga tushirish: Pest qaysi testlar qaysi kodni tekshirishini bilmay, sekin ishlaydi.",
    "Mutation score'ni 100% ga majburlash: ekvivalent mutantlar uchun sun'iy testlar.",
    "Coverage yuqori bo'lgani uchun mutation testing kerak emas deb hisoblash."
  ]
});
