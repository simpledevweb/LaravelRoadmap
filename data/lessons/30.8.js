/* Chuqur dars: 30.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.8", {
  "lesson": [
    "### Inside-Out TDD",
    "Inside-Out (Detroit yoki klassik maktab) eng **ichki**, mustaqil domen bloklaridan boshlaydi: value object, entity, sof mantiq. Ularni tayyor qilib, birlashtirib tashqariga chiqadi. Haqiqiy hamkorlar ishlatiladi, mock kam.",
    "",
    "### Qanday ishlaydi",
    "1. Eng kichik mustaqil birlikdan boshlang: `Money`.",
    "2. Unga tayanadigan keyingisini quring: `LineItem` (haqiqiy `Money` bilan).",
    "3. Undan `Cart`, keyin `CheckoutService`, oxirida controller.",
    "",
    "Har qatlam allaqachon sinalgan, haqiqiy blokdan quriladi.",
    "",
    "### Afzalliklari",
    "- **Barqaror testlar**: ular implementatsiyaga emas, xatti-harakatga bog'liq. Refactoring paytida kamroq sinadi.",
    "- **Puxta domen modeli**: asosiy tushunchalar yaxshi o'ylangan va sinalgan.",
    "- Mock kam, shuning uchun testlar haqiqiy integratsiyani ham qamraydi.",
    "",
    "### Xavflari",
    "- **Keraksiz kod**: tashqi talab hali aniq emasligi uchun ichki qismda kerak bo'lmagan imkoniyat yozib yuborish mumkin.",
    "- **Integratsiya kech sinaladi**: qismlar alohida to'g'ri bo'lib, birlashganda mos kelmasligi oxirida ma'lum bo'ladi.",
    "- Noto'g'ri tushunilgan domen modeli ustiga quriladi.",
    "",
    "### Aralash yondashuv",
    "Tajribali dasturchilar ikkalasini vaziyatga qarab ishlatadi:",
    "- **Noaniq tashqi xatti-harakat**: outside-in, interfeyslar ehtiyojdan chiqadi.",
    "- **Murakkab, aniq algoritm yoki domen qoidasi**: inside-out, avval to'g'ri mantiq.",
    "",
    "Uslub tanlovi dogma emas, vosita. Ikkalasida ham asosiy sikl (Red, Green, Refactor) o'zgarmaydi."
  ],
  "examples": [
    {
      "title": "Inside-out ketma-ketligi",
      "lang": "text",
      "code": [
        "Money -> LineItem -> Cart   (haqiqiy hamkorlar, mock yo'q)",
        "     -> CheckoutService -> Controller",
        "Har bosqich avvalgisiga tayanadi va sinalgan."
      ],
      "note": "Quyi qatlamlar mustahkam bo'lgach yuqoriga ko'tariladi."
    },
    {
      "title": "Haqiqiy hamkor bilan test",
      "lang": "php",
      "code": [
        "it('sums line totals using real money objects', function () {",
        "    $cart = new Cart();",
        "    $cart->add(LineItem::of('A1', qty: 2, unitPrice: Money::uzs(15_000)));",
        "    $cart->add(LineItem::of('B2', qty: 1, unitPrice: Money::uzs(40_000)));",
        "",
        "    expect($cart->total())->toEqual(Money::uzs(70_000));",
        "});"
      ],
      "note": "Mock yo'q: Cart haqiqiy LineItem va Money bilan ishlaydi."
    }
  ],
  "pitfalls": [
    "Tashqi talab aniq bo'lmasdan ichki qismga imkoniyatlarni ko'p qo'shish: keraksiz kod yig'iladi.",
    "Integratsiyani oxirgacha kechiktirish: qismlar mos kelmasligi kech aniqlanadi.",
    "Bir uslubni dogma qilish: murakkab algoritm uchun inside-out, noaniq talab uchun outside-in samaraliroq.",
    "Domen modelini tekshirmasdan qurish: noto'g'ri tushuncha ustiga barcha qatlamlar quriladi."
  ]
});
