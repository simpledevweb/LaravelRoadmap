/* Chuqur dars: 30.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.12", {
  "lesson": [
    "### TDD'ni haddan tashqari qo'llash",
    "TDD foydali vosita, lekin noto'g'ri qo'llansa zarar keltiradi. Ortiqcha dogmatizm o'rniga qiymat bermaydigan ish va ortiqcha murakkablik paydo bo'ladi.",
    "",
    "### Overengineering belgilari",
    "- **Har sinf uchun interfeys va mock**, faqat testlash uchun. Haqiqiy ehtiyoj bo'lmagan abstraksiya kodni murakkablashtiradi.",
    "- **Private metodlarni test qilish uchun public qilish**: ichki tafsilot testga bog'lanadi. Private metod public xatti-harakat orqali sinalishi kerak.",
    "- **Trivial kodga test**: getter, setter, oddiy konfiguratsiya. Qiymat bermaydi, faqat qo'llab-quvvatlash yukini oshiradi.",
    "- **Qamrov uchun testlar**: foizni oshirish uchun yozilgan, hech narsani tekshirmaydigan testlar.",
    "- **Mock'larga bog'langan testlar**: har refactoring'da sinadi, garchi xatti-harakat o'zgarmasa ham.",
    "",
    "### Muvozanat",
    "TDD vosita, dogma emas. Qaerda juda foydali va qaerda kamroq:",
    "- **Juda foydali**: murakkab biznes mantiq, hisob-kitoblar, algoritmlar, holat mashinalari, parserlar, bug tuzatish (avval test).",
    "- **Kamroq foydali**: prototip va tajriba (talab o'zgaradi), UI tajribalari, oddiy CRUD, konfiguratsiya.",
    "",
    "Oxirgilarida testni keyin yozish yoki bitta feature test yetarli bo'lishi mumkin.",
    "",
    "### Abstraksiya qachon",
    "Abstraksiyani **test** emas, **real o'zgarish o'qi** talab qilsin. Agar biror narsa kelajakda almashtirilishi aniq bo'lsa (to'lov provayderi), interfeys kiriting. \"Testlash uchun kerak\" bo'lsa, ko'pincha dizayn yoki test usuli noto'g'ri tanlangan.",
    "",
    "### Sifat o'lchovi",
    "Testlar sifati ularning soni yoki qamrovida emas, **xatoni ushlash qobiliyati** va **refactoringga chidamliligida**. Yaxshi savol: \"bu test qaysi real xatoni ushlaydi?\" Javob topilmasa, testni qayta ko'rib chiqing.",
    "",
    "### Jamoa kelishuvi",
    "Qaerda TDD majburiy va qaerda tavsiya ekanini jamoa belgilasin. Dogmatik talab (\"hamma narsa TDD\") ko'pincha formal bajarilib, qiymat bermaydi."
  ],
  "examples": [
    {
      "title": "Qaerda foydali, qaerda ortiqcha",
      "lang": "text",
      "code": [
        "TDD foydali:  narx hisoblash, chegirma qoidalari, holat mashinasi,",
        "              parser, bug tuzatish (avval test)",
        "TDD ortiqcha: prototip, oddiy CRUD, konfiguratsiya, getter/setter,",
        "              hali talabi noaniq UI tajribasi"
      ],
      "note": "Murakkab mantiqda foyda katta, trivial kodda kam."
    },
    {
      "title": "Ortiqcha abstraksiya",
      "lang": "php",
      "code": [
        "// ❌ Faqat testlash uchun interfeys, boshqa implementatsiyasi hech qachon bo'lmaydi",
        "interface GreetingFormatterInterface { public function format(string $name): string; }",
        "final class GreetingFormatter implements GreetingFormatterInterface { /* ... */ }",
        "",
        "// ✅ Oddiy sinf, xatti-harakat orqali test",
        "final class GreetingFormatter",
        "{",
        "    public function format(string $name): string",
        "    {",
        "        return \"Salom, {$name}!\";",
        "    }",
        "}",
        "it('greets by name', fn () => expect((new GreetingFormatter())->format('Ali'))->toBe('Salom, Ali!'));"
      ],
      "note": "Interfeys haqiqiy almashtirish ehtiyoji paydo bo'lganda kiritiladi."
    }
  ],
  "pitfalls": [
    "Har sinf uchun interfeys va mock yozish: kod murakkablashadi, qiymat oshmaydi.",
    "Private metodni testlash uchun public qilish: ichki tafsilot testga bog'lanib, refactoring qiyinlashadi.",
    "Qamrov foizini maqsad qilish: hech narsani tekshirmaydigan testlar yig'iladi.",
    "TDD'ni hamma joyda majburlash: tajriba va oddiy CRUD uchun vaqt behuda ketadi."
  ]
});
