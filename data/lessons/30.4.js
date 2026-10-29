/* Chuqur dars: 30.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.4", {
  "lesson": [
    "### Xavfsiz refactoring",
    "Refactoring — tashqi xatti-harakatni o'zgartirmasdan ichki tuzilmani yaxshilash. TDD'da u faqat **yashil** holatda qilinadi: testlar o'tayotgan paytda har kichik o'zgartirishdan keyin ularni yurgizasiz. Qizil bo'lsa, oxirgi qadamni qaytarasiz.",
    "",
    "### Testlar xavfsizlik to'ri",
    "Testlar xatti-harakatni qotirib qo'ygan, shuning uchun tuzilmani dadil o'zgartirishingiz mumkin. Test yashil qolsa, xatti-harakat saqlangan. Bu ishonchsiz kodni o'zgartirishdan qo'rqishni yo'qotadi.",
    "",
    "### Nimani refactor qilish",
    "- **Takrorlanish**: kod va testdagi bir xil qismlar. Test va kod o'rtasidagi takror (ikkalasida bir xil qattiq kodlangan qiymat) ham signal.",
    "- **Nomlar**: o'zgaruvchi, metod, sinf nomlari aniq niyatni ifodalasin.",
    "- **Uzun metodlar**: Extract Method bilan bo'lish.",
    "- **Ma'lumot tuzilmasi**: massiv o'rniga value object.",
    "- **Testlarning o'zi**: o'qiluvchanlik, takroriy setup'ni yordamchiga olish.",
    "",
    "### Qoida: refactoring paytida yangi xatti-harakat yo'q",
    "Refactoring va yangi funksiya qo'shishni **aralashtirmang**. Yangi xatti-harakat kerak bo'lsa, yangi Red kerak. Aralashtirilganda yiqilgan testning sababi tushunarsiz bo'ladi.",
    "",
    "### Kichik qadamlar va commit",
    "Har yashil refactoring qadamidan keyin commit qiling. Xato qilsangiz, oxirgi yashil holatga oson qaytasiz. IDE'ning avtomatik refactoring vositalari (Extract Method, Rename) xavfsizroq, chunki ular xatti-harakatni saqlashga mo'ljallangan.",
    "",
    "### Test refactoring'i",
    "Testlarni ham tozalang, lekin ehtiyot bo'ling: test refactoring paytida kodni o'zgartirmang. Aks holda test va kod bir vaqtda o'zgarib, tekshirish ma'nosini yo'qotadi."
  ],
  "examples": [
    {
      "title": "Refactoring zanjiri",
      "lang": "text",
      "code": [
        "yashil",
        "  -> Extract Method  (shippingFee)   -> testlar yashil",
        "  -> Rename          ($s -> $subtotal) -> yashil",
        "  -> Introduce Value Object (Money)  -> yashil",
        "  -> commit"
      ],
      "note": "Har qadamdan keyin testlar yuritiladi."
    },
    {
      "title": "Refactoring oldin va keyin",
      "lang": "php",
      "code": [
        "// Oldin",
        "public function costFor(Money $s): Money",
        "{",
        "    return $s->gte(Money::uzs(100_000)) ? Money::uzs(0) : Money::uzs(15_000);",
        "}",
        "",
        "// Keyin (xatti-harakat o'zgarmagan, testlar yashil)",
        "private const FREE_FROM = 100_000;",
        "private const FEE = 15_000;",
        "",
        "public function costFor(Money $subtotal): Money",
        "{",
        "    return $this->qualifiesForFreeShipping($subtotal) ? Money::uzs(0) : Money::uzs(self::FEE);",
        "}",
        "",
        "private function qualifiesForFreeShipping(Money $subtotal): bool",
        "{",
        "    return $subtotal->gte(Money::uzs(self::FREE_FROM));",
        "}"
      ],
      "note": "Nom va konstantalar niyatni ochiq ko'rsatadi."
    }
  ],
  "pitfalls": [
    "Qizil testlar bilan refactoring: nima buzilgani va nima refactoring ekani aralashib ketadi.",
    "Refactoring bilan birga yangi funksiya qo'shish: yiqilgan testning sababi noaniq bo'ladi.",
    "Katta refactoring'ni bir qadamda qilish: xato qilsangiz, qaytish qiyin. Kichik qadam va tez-tez commit.",
    "Testni va kodni bir vaqtda o'zgartirish: test xatti-harakatni qotirish vazifasini yo'qotadi."
  ]
});
