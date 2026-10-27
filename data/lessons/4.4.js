/* Chuqur dars: 4.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.4", {
  "lesson": [
    "### Tamoyil",
    "**Interface Segregation Principle (ISP):** klient o'ziga **keraksiz metodlarga** bog'lanishga majbur bo'lmasin. Katta \"semiz\" interface o'rniga bir nechta kichik, maqsadli interface'lar.",
    "",
    "### Belgilar",
    "- Interface'da 10+ metod.",
    "- Implementator ba'zi metodlarni bo'sh qoldiradi yoki `throw` qiladi.",
    "- Klient interface'ning faqat bir qismini ishlatadi.",
    "",
    "### Yechim",
    "Rollar bo'yicha bo'ling: `Readable`, `Writable`, `Deletable`. Klass kerakli interface'larni birlashtirib implement qiladi; klient faqat kerakli kichik interface'ni so'raydi (`function show(Readable $r)`).",
    "",
    "### Foydasi",
    "- Past coupling: klient faqat o'zi ishlatadigan narsaga bog'liq.",
    "- Fake/mock yozish oson.",
    "- LSP buzilishining oldi olinadi.",
    "",
    "### Laravel'da",
    "`Illuminate\\Contracts`: `Arrayable`, `Jsonable`, `Htmlable`, `Responsable` — har biri bitta kichik imkoniyat. `Cache\\Repository` esa katta; faqat kerak bo'lganini (`Store`) so'rash mumkin.",
    "",
    "### Chegara",
    "Har metodga alohida interface (`Saver`, `Loader`) ham ortiqcha. Birgalikda o'zgaradigan metodlar bir interface'da qolsin."
  ],
  "examples": [
    {
      "title": "Semiz interface bo'linishi",
      "lang": "php",
      "code": [
        "// YOMON",
        "interface Worker { public function work(): void; public function eat(): void; public function sleep(): void; }",
        "final class Robot implements Worker { public function work(): void {} public function eat(): void {} public function sleep(): void {} } // keraksiz",
        "",
        "// YAXSHI",
        "interface Workable { public function work(): void; }",
        "interface Eatable { public function eat(): void; }",
        "final class Robot implements Workable { public function work(): void {} }",
        "final class Human implements Workable, Eatable { public function work(): void {} public function eat(): void {} }"
      ]
    }
  ],
  "pitfalls": [
    "Implementator metodni bo'sh yoki `throw` bilan yozsa interface semiz.",
    "Juda maydalash (har metodga interface) navigatsiyani qiyinlashtiradi.",
    "Klient tipini keng interface bilan e'lon qilish (`Repository`) keraksiz bog'liqlik beradi: kerakli kichik interface.",
    "Interface'ga keyin metod qo'shish barcha implementatsiyalarni buzadi: kichik va barqaror saqlang."
  ]
});
