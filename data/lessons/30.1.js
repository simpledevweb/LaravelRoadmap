/* Chuqur dars: 30.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.1", {
  "lesson": [
    "### TDD sikli",
    "TDD (Test-Driven Development) uch qadamdan iborat qisqa sikl bilan ishlaydi:",
    "1. **Red**: kutilgan xatti-harakatni ifodalovchi test yozing va uning yiqilishini ko'ring.",
    "2. **Green**: testni o'tkazadigan eng sodda kodni yozing. Hatto \"aldov\" bo'lsa ham (qattiq kodlangan qiymat).",
    "3. **Refactor**: testlar yashil bo'lganda kodni va testni tozalang: takrorlanish, nomlar, tuzilma.",
    "",
    "Keyin sikl keyingi xatti-harakat uchun yana boshlanadi.",
    "",
    "### Nima uchun uch qadam",
    "Har qadamning o'z maqsadi bor:",
    "- **Red** talabni aniqlaydi va **testning o'zi ishlashini isbotlaydi**. Hech qachon yiqilmagan test hech narsani tekshirmayotgan bo'lishi mumkin.",
    "- **Green** tez fikr-mulohaza beradi: bir necha daqiqada ishlaydigan holatga yetasiz.",
    "- **Refactor** dizayn sifatini ta'minlaydi. Testlar xavfsizlik to'ri bo'lgani uchun kodni dadil o'zgartirish mumkin.",
    "",
    "### Sikl qisqa bo'lishi kerak",
    "Bir sikl odatda daqiqalar davom etadi. Agar Red holatida yarim soat o'tsa, qadam juda katta: uni kichikroq xatti-harakatlarga bo'ling. Kichik qadamlar xatoni topishni osonlashtiradi, chunki yiqilgan test aynan oxirgi o'zgarishga ishora qiladi.",
    "",
    "### Eng ko'p uchraydigan xato",
    "Refactor bosqichini o'tkazib yuborish. Jamoa Red va Green bilan cheklansa, kod tez ishlaydi, lekin takrorlanish va noaniq nomlar yig'iladi. TDD'ning dizayn foydasi aynan Refactor'dan keladi.",
    "",
    "### Laravel'da",
    "Pest yoki PHPUnit bilan `php artisan test --filter=...` orqali faqat kerakli testni ishga tushiring; Pest'ning watch plagini (`pest-plugin-watch`) fayl o'zgarganda testlarni avtomatik yuritadi. Test fayli bir ekranda, kod ikkinchisida turishi qulay."
  ],
  "examples": [
    {
      "title": "Sikl bosqichlari",
      "lang": "text",
      "code": [
        "RED       it('charges 15 000 shipping under 100 000')  -> yiqildi (sinf yo'q)",
        "GREEN     return Money::uzs(15_000);                  -> o'tdi (qattiq kodlangan)",
        "REFACTOR  konstanta, nom, tuzilma                     -> hali yashil",
        "RED       it('is free from 100 000')                  -> keyingi sikl"
      ],
      "note": "Har qadam kichik va tekshiriladigan."
    },
    {
      "title": "Birinchi sikl koddagi ko'rinishi",
      "lang": "php",
      "code": [
        "// RED",
        "it('charges 15 000 shipping under 100 000', function () {",
        "    $cost = (new ShippingCalculator())->costFor(Money::uzs(50_000));",
        "    expect($cost)->toEqual(Money::uzs(15_000));",
        "});",
        "",
        "// GREEN (eng sodda)",
        "final class ShippingCalculator",
        "{",
        "    public function costFor(Money $subtotal): Money",
        "    {",
        "        return Money::uzs(15_000);",
        "    }",
        "}",
        "",
        "// REFACTOR: konstantaga ajratish",
        "private const STANDARD_FEE = 15_000;"
      ],
      "note": "Qattiq kodlangan qiymat ham to'g'ri Green, keyingi test uni umumlashtirishga majbur qiladi."
    }
  ],
  "pitfalls": [
    "Refactor bosqichini o'tkazib yuborish: kod ishlaydi, lekin takrorlanish va yomon nomlar to'planib boradi.",
    "Katta qadamlar: Red holatida uzoq qolish va nima buzilganini topa olmaslik.",
    "Testning yiqilishini ko'rmaslik: test noto'g'ri sababga ko'ra yashil bo'lishi mumkin.",
    "Refactor paytida yangi xatti-harakat qo'shish: buning uchun yangi Red kerak."
  ]
});
