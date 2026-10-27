/* Chuqur dars: 5.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.15", {
  "lesson": [
    "### State",
    "**State** — obyektning xulq-atvori uning **ichki holatiga** qarab o'zgaradi; har holat alohida klass, holat almashganda obyekt \"klassini o'zgartirgandek\" ko'rinadi. Katta `if/switch ($status)` o'rniga.",
    "",
    "### Tuzilma",
    "`Context` (masalan `Order`) joriy `State` obyektini saqlaydi va amallarni unga topshiradi. `State` interface: `pay()`, `ship()`, `cancel()`. Konkret holatlar (`Pending`, `Paid`, `Shipped`) ruxsat etilgan o'tishlarni belgilaydi.",
    "",
    "### Qachon",
    "- Holat mashinasi: buyurtma, to'lov, hujjat tasdiqlash, ticket.",
    "- Metodlar holatga qarab turlicha ishlaydi (yoki taqiqlanadi).",
    "- Ko'p `if ($this->status === ...)` tekshiruvlari.",
    "",
    "### Strategy bilan farq",
    "Strategy'ni klient tanlaydi; State'da obyektning o'zi holat o'zgartiradi va holatlar bir-birini biladi.",
    "",
    "### Laravel/PHP",
    "- Enum + `match` — oddiy holatlar uchun yengil variant: `OrderStatus::Pending->canTransitionTo($to)`.",
    "- **spatie/laravel-model-states** — Eloquent uchun.",
    "- Eloquent `casts` bilan enum.",
    "",
    "### Ruxsat etilgan o'tishlar",
    "O'tishlar jadvali aniq bo'lsin; noto'g'ri o'tish exception tashlasin (`Paid → Pending` mumkin emas). O'tish hodisa (event) chiqarishi mumkin.",
    "",
    "### Ehtiyot",
    "2–3 oddiy holat uchun enum + `match` yetarli; State klasslari holat soni va xulq ko'p bo'lganda foydali."
  ],
  "examples": [
    {
      "title": "Enum bilan holat mashinasi",
      "lang": "php",
      "code": [
        "enum OrderStatus: string",
        "{",
        "    case Pending = 'pending'; case Paid = 'paid'; case Shipped = 'shipped'; case Cancelled = 'cancelled';",
        "",
        "    public function canTransitionTo(self $to): bool",
        "    {",
        "        return match ($this) {",
        "            self::Pending => in_array($to, [self::Paid, self::Cancelled], true),",
        "            self::Paid    => in_array($to, [self::Shipped, self::Cancelled], true),",
        "            self::Shipped, self::Cancelled => false,",
        "        };",
        "    }",
        "}",
        "final class Order",
        "{",
        "    public function __construct(private OrderStatus $status) {}",
        "    public function moveTo(OrderStatus $to): void { $this->status->canTransitionTo($to) or throw new DomainException(\"{$this->status->value} → {$to->value} mumkin emas\"); $this->status = $to; }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Oddiy 2–3 holat uchun State klasslari ortiqcha: enum + `match`.",
    "O'tishlar jadvali aniq bo'lmasa noto'g'ri holatga o'tish mumkin.",
    "Holat o'zgarishida yon ta'sir (email) ni tranzaksiyadan keyin yuboring.",
    "Holat DB'da va xotirada nomuvofiq bo'lsa (parallel so'rov): optimistik qulf/versiya."
  ]
});
