/* Chuqur dars: 5.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.7", {
  "lesson": [
    "### Strategy",
    "**Strategy** — algoritm oilasini alohida klasslarga ajratib, ularni **bir xil interface** ostida almashtiriladigan qiladi. Klient (context) strategiyani konstruktor yoki metod orqali oladi va runtime'da almashtirish mumkin.",
    "",
    "### Belgilar",
    "- Katta `switch`/`if` turli algoritmlar uchun.",
    "- Bir amalning bir nechta variantlari (narx hisoblash, to'lov, eksport formati, saralash).",
    "- Algoritmni testda alohida tekshirish kerak.",
    "",
    "### Tuzilma",
    "`Strategy` interface; `ConcreteStrategyA/B`; `Context` strategiyani saqlaydi va `strategy->execute()` ni chaqiradi.",
    "",
    "### Foydasi",
    "OCP (yangi strategiya = yangi klass), `switch` yo'qoladi, alohida test, runtime almashtirish.",
    "",
    "### PHP'da yengil variant",
    "Oddiy algoritm uchun `callable`/closure strategiya bo'la oladi: `usort($a, $comparator)`.",
    "",
    "### Laravel'da",
    "Cache/Queue/Filesystem drayverlari, `Notification` kanallari, validatsiya qoidalari (`Rule` obyektlari), `Hash` drayverlari — hammasi strategiya.",
    "",
    "### State bilan farq",
    "Struktura bir xil, maqsad farq qiladi: **Strategy** — klient tanlaydi, strategiyalar bir-biridan bexabar; **State** — obyekt holati o'zgarganda xulq-atvor o'zi almashadi (5.15).",
    "",
    "### Ehtiyot",
    "Ikki-uch variant va o'zgarmasa oddiy `match` yetarli."
  ],
  "examples": [
    {
      "title": "Narx strategiyasi",
      "lang": "php",
      "code": [
        "interface PricingStrategy { public function total(int $subtotal): int; }",
        "final class RegularPricing implements PricingStrategy { public function total(int $s): int { return $s; } }",
        "final class BlackFridayPricing implements PricingStrategy { public function total(int $s): int { return (int) round($s * 0.7); } }",
        "",
        "final class Cart",
        "{",
        "    public function __construct(private PricingStrategy $pricing) {}",
        "    public function total(int $subtotal): int { return $this->pricing->total($subtotal); }",
        "}",
        "echo (new Cart(new BlackFridayPricing()))->total(100_000);"
      ]
    }
  ],
  "pitfalls": [
    "Ikki-uch o'zgarmas variant uchun strategiya ortiqcha: `match` yetarli.",
    "Strategiyalar umumiy holatni bo'lishsa bog'lanish paydo bo'ladi: mustaqil saqlang.",
    "Strategiya tanlashni klient kodida `switch` bilan qilish patternning foydasini yo'qotadi: factory/container.",
    "Strategiya interface'i juda keng bo'lsa implementatsiyalar keraksiz metodlarni yozadi."
  ]
});
