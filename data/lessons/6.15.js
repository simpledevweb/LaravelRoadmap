/* Chuqur dars: 6.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.15", {
  "lesson": [
    "### Refaktoring xavfsizligi",
    "**Refaktoring** — xatti-harakatni o'zgartirmasdan ichki tuzilmani yaxshilash. Xavfsizlik shart: \"xatti-harakat o'zgarmadi\" degan kafolat kerak.",
    "",
    "### Xavfsizlik to'ri",
    "1. **Testlar:** unit, feature, **characterization** (mavjud xatti-harakatni qotiruvchi) testlar.",
    "2. **Statik tahlil:** PHPStan, Rector (avtomatik xavfsiz o'zgartirishlar).",
    "3. **Tip tizimi:** `strict_types`, aniq tiplar.",
    "4. **Version control:** kichik commitlar, tez qaytarish (revert).",
    "5. **CI:** har o'zgarishda avtomatik tekshiruv.",
    "6. **IDE refaktoring vositalari:** rename, extract, move — qo'lda emas.",
    "",
    "### Qadamlar qoidalari",
    "- Bir vaqtda bitta o'zgarish; har qadamdan keyin testlar yashil.",
    "- Refaktoring va funksiya qo'shishni **alohida commit**larda.",
    "- Katta o'zgarish: **Branch by Abstraction**, **Strangler Fig**, **feature flag** bilan bosqichma-bosqich.",
    "- Legacy: avval test (seam), keyin o'zgartirish (\"Working Effectively with Legacy Code\").",
    "",
    "### Xavfli joylar",
    "Testsiz kod, dinamik chaqiruvlar (`$obj->$method()`, string klass nomlari, Reflection), magic metodlar, global holat, reflection asosidagi framework \"sehri\" (Eloquent atributlari): statik tahlil ko'rmaydi.",
    "",
    "### Ehtiyot choralari",
    "- Xatolik monitoringi (Sentry) deploydan keyin.",
    "- Canary/blue-green deploy.",
    "- Ma'lumotlar bazasi migratsiyalarini ikki bosqichda (expand → contract).",
    "",
    "### Mutation testing",
    "Infection testlar haqiqatan xatti-harakatni himoya qilayotganini tekshiradi."
  ],
  "examples": [
    {
      "title": "Characterization test",
      "lang": "php",
      "code": [
        "public function test_legacy_price_rules_are_preserved(): void",
        "{",
        "    $calc = new LegacyPriceCalculator();",
        "    $this->assertSame(1200, $calc->price(1000, 'vip'));     // hozirgi xatti-harakatni qotiramiz",
        "    $this->assertSame(1000, $calc->price(1000, 'regular'));",
        "    $this->assertSame(0,    $calc->price(0, 'vip'));",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Testsiz refaktoring regressiyani sezdirmay kiritadi.",
    "Dinamik chaqiruvlar va Reflection statik tahlilga ko'rinmaydi: qo'shimcha test.",
    "Refaktoring va yangi funksiyani bitta commitga aralashtirmang.",
    "Katta o'zgarishni birdan qilish xavfli: Strangler Fig, feature flag."
  ]
});
