/* Chuqur dars: 3.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.9", {
  "lesson": [
    "### Immutability nima",
    "Immutable obyekt yaratilgandan keyin **o'zgarmaydi**. \"O'zgartirish\" yangi obyekt qaytaradi (`withX()` metodlari). Misol: `DateTimeImmutable::modify()` eski obyektni saqlab, yangisini qaytaradi.",
    "",
    "### Nega foydali",
    "- **Oldindan aytib bo'ladigan:** obyekt hech kim tomonidan kutilmaganda o'zgarmaydi (yashirin yon ta'sir yo'q).",
    "- **Xavfsiz uzatish:** funksiyaga berganda nusxa olish shart emas.",
    "- **Parallel xavfsizlik:** Octane/worker'da umumiy holat sizish xavfi yo'q.",
    "- **Tenglik va kesh:** qiymat bo'yicha solishtirish va keshlash oson.",
    "- **Invariant:** konstruktorda bir marta tekshiriladi, keyin buzilmaydi.",
    "",
    "### PHP'da vositalari",
    "- `readonly` property (8.1): bir marta yoziladi.",
    "- `readonly class` (8.2): hamma property readonly.",
    "- Konstruktor promotion bilan qisqa yozuv.",
    "- `with*` metodlari: `new static(...)` yoki `clone` qaytaradi.",
    "- PHP 8.5: `clone($obj, ['prop' => $v])`.",
    "- `DateTimeImmutable`, `CarbonImmutable`.",
    "",
    "### Sayoz (shallow) immutability",
    "`readonly` property qiymati o'zgarmaydi, lekin ichidagi **obyektning** holati o'zgarishi mumkin (`$this->items->add()`). To'liq immutabilite uchun ichki obyektlar ham immutable bo'lsin yoki massiv (qiymat) ishlatilsin.",
    "",
    "### Qaysi obyektlar immutable bo'lishi kerak",
    "**Value Object**lar (Money, Email, DateRange, Coordinates), DTO'lar, hodisa (event) ma'lumotlari, konfiguratsiya. **Entity** (User, Order) odatda mutable, chunki ular holat o'zgaradigan hayot davriga ega.",
    "",
    "### Qiymat",
    "Immutability — tenglik \"qiymat bo'yicha\" (`equals()`), identifikator emas. Ikki `Money(100, 'UZS')` teng.",
    "",
    "### Narxi",
    "Har o'zgarishda yangi obyekt: kichik obyektlar uchun ahamiyatsiz, juda katta kolleksiyalar uchun persistent tuzilmalar yoki mutable bufer ko'riladi."
  ],
  "examples": [
    {
      "title": "Value Object (with-er)",
      "lang": "php",
      "code": [
        "final readonly class Money",
        "{",
        "    public function __construct(public int $amount, public string $currency)",
        "    {",
        "        $amount >= 0 or throw new InvalidArgumentException('Summa manfiy bo\\'lmasin');",
        "    }",
        "    public function add(self $o): self",
        "    {",
        "        $this->currency === $o->currency or throw new DomainException('Valyuta farq qiladi');",
        "        return new self($this->amount + $o->amount, $this->currency);",
        "    }",
        "    public function equals(self $o): bool { return $this->amount === $o->amount && $this->currency === $o->currency; }",
        "}"
      ]
    },
    {
      "title": "Mutable vs Immutable",
      "lang": "php",
      "code": [
        "$a = new DateTime('2025-01-01');   $b = $a->modify('+1 day');   // $a ham o'zgardi!",
        "$c = new DateTimeImmutable('2025-01-01'); $d = $c->modify('+1 day'); // $c o'zgarmadi"
      ]
    }
  ],
  "pitfalls": [
    "`readonly` sayoz: ichki mutable obyektni baribir o'zgartirish mumkin.",
    "`with*` metodlarida validatsiyani qayta bajarmasangiz, yaroqsiz obyekt yaratish mumkin.",
    "Entity'ni majburan immutable qilish hayot davri o'zgarishlarini murakkablashtiradi: Value Object'larga qo'llang.",
    "Mutable `DateTime` ni uzatish yashirin yon ta'sir beradi: `DateTimeImmutable` ishlating."
  ]
});
