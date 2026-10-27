/* Chuqur dars: 3.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.4", {
  "lesson": [
    "### Polymorphism nima",
    "Polymorphism (\"ko'p shakllilik\") — bir xil interfeys orqali turli obyektlar turlicha xatti-harakat qilishi. Chaqiruvchi konkret turni bilmaydi: `$shape->area()` aylana uchun bitta, to'rtburchak uchun boshqa formula bilan ishlaydi.",
    "",
    "### Turlari",
    "1. **Subtype polymorphism (OOP):** umumiy ota klass yoki interface; runtime'da konkret implementatsiya tanlanadi. PHP'da asosiy shakl.",
    "2. **Parametrik (generics):** PHP'da to'g'ridan-to'g'ri yo'q; PHPDoc `@template T` bilan statik tahlil uchun.",
    "3. **Ad-hoc (overload):** PHP overload'ni qo'llamaydi; o'rniga union tiplar, `match`, nomli argumentlar.",
    "4. **Duck typing:** `callable`, `iterable`, `Countable`, `Stringable` kabi interfeyslar orqali.",
    "",
    "### Dynamic dispatch",
    "PHP metodni **obyektning haqiqiy klassidan** boshlab qidiradi (runtime). Shuning uchun override qilingan metod chaqiriladi, hatto o'zgaruvchi ota tip bilan e'lon qilingan bo'lsa ham.",
    "",
    "### Instanceof zanjirlari — signal",
    "`if ($x instanceof A) ... elseif ($x instanceof B) ...` ko'p bo'lsa, polimorfizm yetishmayapti. Yechim: xulq-atvorni obyektlarga ko'chirish (Strategy, State) yoki enum + `match`.",
    "",
    "### Foydasi",
    "- Yangi tur qo'shish mavjud kodni o'zgartirmaydi (**Open/Closed**).",
    "- Test: fake implementatsiyani berish oson.",
    "- Shartli mantiq (`switch ($type)`) yo'qoladi.",
    "",
    "### Qoida",
    "Polimorfizm shartnomaga tayanadi: barcha implementatsiyalar bir xil kafolatni bersin (LSP). Aks holda chaqiruvchi tur tekshirishga majbur bo'ladi.",
    "",
    "### Laravel",
    "`Notification` kanallari, `Mailable`, `Filesystem` drayverlari, `Cache` store'lari, `Collection` va `LazyCollection` bir xil interfeysni qo'llaydi."
  ],
  "examples": [
    {
      "title": "Shakllar",
      "lang": "php",
      "code": [
        "interface Shape { public function area(): float; }",
        "final class Circle implements Shape { public function __construct(private float $r) {} public function area(): float { return M_PI * $this->r ** 2; } }",
        "final class Rect implements Shape { public function __construct(private float $w, private float $h) {} public function area(): float { return $this->w * $this->h; } }",
        "",
        "function totalArea(Shape ...$shapes): float { return array_sum(array_map(fn(Shape $s) => $s->area(), $shapes)); }",
        "echo totalArea(new Circle(1), new Rect(2, 3));"
      ]
    },
    {
      "title": "instanceof zanjiridan polimorfizmga",
      "lang": "php",
      "code": [
        "// YOMON",
        "function fee($p) { if ($p instanceof Card) return 0.02; if ($p instanceof Cash) return 0; }",
        "",
        "// YAXSHI",
        "interface Payment { public function fee(): float; }",
        "final class Card implements Payment { public function fee(): float { return 0.02; } }",
        "final class Cash implements Payment { public function fee(): float { return 0.0; } }"
      ]
    }
  ],
  "pitfalls": [
    "`instanceof` zanjirlari ko'paysa yangi tur qo'shganda hamma joyni o'zgartirasiz: xulq-atvorni obyektlarga ko'chiring.",
    "Implementatsiyalar shartnomani buzsa (kutilmagan exception), polimorfizm ishonchsiz bo'ladi (LSP).",
    "PHP'da method overload yo'q: bir xil nomli ikki metod e'lon qilib bo'lmaydi; union tiplar yoki alohida nomlar.",
    "Haddan tashqari polimorfizm (har if uchun klass) kodni murakkablashtiradi: oddiy `match` yetarli bo'lsa ishlating."
  ]
});
