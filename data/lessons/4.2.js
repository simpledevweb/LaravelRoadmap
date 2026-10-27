/* Chuqur dars: 4.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.2", {
  "lesson": [
    "### Tamoyil",
    "**Open/Closed Principle (OCP):** klasslar **kengayishga ochiq**, **o'zgarishga yopiq** bo'lsin. Yangi xulq-atvor qo'shganda mavjud ishlayotgan kodni o'zgartirmasdan, yangi klass yozib qo'shish kerak.",
    "",
    "### Buzilish belgisi",
    "Yangi tur qo'shganda bir necha joyda `switch`/`if-elseif` ni tahrirlayapsiz. Har tahrir regressiya xavfi.",
    "",
    "### Qanday amalga oshadi",
    "- **Polimorfizm:** umumiy interface, har tur alohida implementatsiya (Strategy).",
    "- **Dekorator** orqali qo'shimcha funksiya.",
    "- **Hodisalar (events)** va listener'lar.",
    "- **Konfiguratsiya/registry:** yangi implementatsiyani ro'yxatga qo'shish.",
    "",
    "### Laravel'da",
    "`Notification` kanallari, `Filesystem` drayverlari, `Cache` store'lari, middleware zanjiri, `Pipeline`: yangi element qo'shish eski kodga tegmaydi. `Manager::extend('custom', fn...)` — kengaytirish nuqtasi.",
    "",
    "### Ehtiyot",
    "Hamma narsani oldindan kengaytiriladigan qilish — over-engineering. Birinchi marta oddiy yozing; xuddi shu joy ikkinchi marta o'zgarsa, abstraksiya qo'shing (\"uch marta qoidasi\")."
  ],
  "examples": [
    {
      "title": "switch'dan polimorfizmga",
      "lang": "php",
      "code": [
        "// YOMON: har yangi to'lov uchun shu funksiyani o'zgartirasiz",
        "function fee(string $t, int $a): int { return match ($t) { 'card' => (int)($a*0.02), 'cash' => 0 }; }",
        "",
        "// YAXSHI",
        "interface FeePolicy { public function fee(int $amount): int; }",
        "final class CardFee implements FeePolicy { public function fee(int $a): int { return (int) ($a * 0.02); } }",
        "final class CashFee implements FeePolicy { public function fee(int $a): int { return 0; } }",
        "final class Checkout { public function __construct(private FeePolicy $p) {} public function total(int $a): int { return $a + $this->p->fee($a); } }"
      ]
    }
  ],
  "pitfalls": [
    "Har ehtimol uchun oldindan abstraksiya yaratish ortiqcha: haqiqiy takrorlanish ko'ringach.",
    "`match`/`switch` har doim yomon emas: tur kam va o'zgarmasa oddiy `match` yetarli.",
    "Interface'ni tez-tez o'zgartirsangiz barcha implementatsiyalar buziladi (OCP o'zi sinadi).",
    "Kengaytirish nuqtasi hujjatlanmasa, boshqalar uni topa olmaydi."
  ]
});
