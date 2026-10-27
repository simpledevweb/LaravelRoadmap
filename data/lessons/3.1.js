/* Chuqur dars: 3.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.1", {
  "lesson": [
    "### Encapsulation nima",
    "Encapsulation (inkapsulyatsiya) — obyektning ichki holatini yashirib, unga faqat o'zi belgilagan metodlar orqali kirishga ruxsat berish. Maqsad: obyekt har doim **to'g'ri (valid) holatda** bo'lishi, ya'ni uning **invariantlari** (doim to'g'ri bo'lishi shart bo'lgan qoidalar) buzilmasligi. Masalan: hisob balansi manfiy bo'lmasligi, buyurtma summasi uning qatorlari yig'indisiga teng bo'lishi.",
    "",
    "### PHP'da vositalari",
    "- **Visibility:** `private` (faqat shu klass), `protected` (klass va vorislari), `public` (hamma). Property'ni odatda `private` qiling.",
    "- **Metodlar orqali kirish:** o'zgartirish `deposit()`, `withdraw()` kabi **xatti-harakat** nomlari bilan, `setBalance()` bilan emas.",
    "- `readonly` (8.1) va **asymmetric visibility** `public private(set)` (8.4): tashqaridan o'qish, ichkaridan yozish.",
    "- **Konstruktor:** obyekt faqat to'liq va yaroqli holatda yaratilsin.",
    "",
    "### Getter/setter tuzog'i",
    "Har property uchun mexanik `getX()/setX()` yozish encapsulation emas: u faqat sintaksis o'zgarishi. Haqiqiy encapsulation — \"ma'lumotni so'ramang, ishni so'rang\" (*Tell, Don't Ask*): `$order->total()` hisoblab beradi, siz `$order->items` ni tortib hisoblamaysiz.",
    "",
    "### Invariant misoli",
    "`Account` klassida balans `private`, `withdraw()` ichida qoldiq tekshiriladi. Tashqaridan balansni to'g'ridan-to'g'ri o'zgartirib bo'lmaydi, shuning uchun \"manfiy balans\" holati mumkin emas.",
    "",
    "### Law of Demeter",
    "Obyekt faqat o'zining to'g'ridan-to'g'ri hamkorlari bilan gaplashsin: `$a->getB()->getC()->doIt()` zanjiri ichki tuzilmani ochib beradi. Buning o'rniga `$a->doIt()` yozib, ichkarida delegatsiya qiling.",
    "",
    "### Laravel kontekstida",
    "Eloquent modellar standart holda \"ochiq\" (atributlar `__get` orqali); `$fillable`, accessor/mutator, cast va metodlar (`$order->markPaid()`) bilan encapsulation'ni ongli kuchaytirish kerak.",
    "",
    "### Qachon yumshatiladi",
    "DTO va oddiy ma'lumot tashuvchilar (public readonly property) uchun qat'iy encapsulation shart emas: ularda invariant yo'q."
  ],
  "examples": [
    {
      "title": "Invariantni himoya qilish",
      "lang": "php",
      "code": [
        "final class Account",
        "{",
        "    private int $balance = 0;          // tiyin",
        "",
        "    public function deposit(int $amount): void",
        "    {",
        "        if ($amount <= 0) { throw new InvalidArgumentException('Summa musbat bo\\'lsin'); }",
        "        $this->balance += $amount;",
        "    }",
        "",
        "    public function withdraw(int $amount): void",
        "    {",
        "        if ($amount > $this->balance) { throw new DomainException('Mablag\\' yetarli emas'); }",
        "        $this->balance -= $amount;",
        "    }",
        "",
        "    public function balance(): int { return $this->balance; }",
        "}"
      ]
    },
    {
      "title": "Tell, Don't Ask",
      "lang": "php",
      "code": [
        "// YOMON: ichki ma'lumotni tortib, tashqarida hisoblash",
        "$total = 0;",
        "foreach ($order->items as $i) { $total += $i->price * $i->qty; }",
        "",
        "// YAXSHI: obyektning o'zi biladi",
        "$total = $order->total();"
      ]
    },
    {
      "title": "Asymmetric visibility (8.4)",
      "lang": "php",
      "code": [
        "final class Post",
        "{",
        "    public private(set) string $status = 'draft';",
        "    public function publish(): void { $this->status = 'published'; }",
        "}",
        "$p = new Post(); $p->publish();",
        "echo $p->status;       // o'qish ochiq",
        "// $p->status = 'x';   // Error: yozish yopiq"
      ]
    }
  ],
  "pitfalls": [
    "Har property uchun avtomatik getter/setter yozish encapsulation'ni ta'minlamaydi: u faqat sintaksis o'zgarishi.",
    "`setStatus('paid')` o'rniga `markPaid()` kabi niyatni ifodalovchi metod yozing: biznes qoida shu yerda tekshiriladi.",
    "Metod ichkaridagi massiv/obyektni to'g'ridan qaytarsa (`return $this->items;`) tashqi kod uni o'zgartira oladi: nusxa yoki immutable qaytaring.",
    "Hamma narsani `public` qilib qo'yish keyinchalik ichki tuzilmani o'zgartirishni imkonsiz qiladi."
  ]
});
