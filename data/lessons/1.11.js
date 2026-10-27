/* Chuqur dars: 1.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.11", {
  "lesson": [
    "### Klass va obyekt",
    "Klass — shablon, obyekt — uning nusxasi. `new Foo()` konstruktorni chaqiradi. Property — holat, metod — xatti-harakat. Zamonaviy PHP'da hamma narsa tipli bo'lishi kerak.",
    "",
    "### Visibility",
    "- `public` — hamma joydan.",
    "- `protected` — klass va uning vorislari.",
    "- `private` — faqat shu klass (voris ko'rmaydi).",
    "Property'ni odatda `private` qiling, kerak bo'lsa metod yoki 8.4 hook orqali oching (**incapsulation**).",
    "",
    "### Constructor promotion (8.0)",
    "Konstruktor parametrini bevosita property sifatida e'lon qiladi: bir xil kodni uch marta yozmaysiz.",
    "",
    "### Muhim kalit so'zlar",
    "- `final` klass: voris yo'q; `final` metod: override yo'q.",
    "- `abstract`: to'g'ridan-to'g'ri yaratib bo'lmaydi.",
    "- `static`: obyektsiz ishlaydi (1.14).",
    "- `readonly` (8.1): bir marta yoziladi (1.33).",
    "- `const`: klass konstantasi (`self::X`, `static::X`).",
    "",
    "### $this, self, static, parent",
    "`$this` — joriy obyekt, `self` — shu klass, `static` — chaqirilgan klass (late static binding), `parent` — ota klass.",
    "",
    "### Obyekt taqqoslash",
    "`==` — bir klass va property'lar teng; `===` — aynan bir obyekt. `clone` — sayoz nusxa (1.20).",
    "",
    "### Dizayn tamoyillari",
    "Kichik klasslar, bitta mas'uliyat (SRP), konstruktorda to'liq yaroqli holat, **composition over inheritance**. Magic metodlar va statik holatdan ehtiyotkorlik bilan foydalaning.",
    "",
    "### Autoload va fayl",
    "Bir faylda bitta klass, fayl nomi = klass nomi (PSR-4).",
    "",
    "### Obyekt hayot tsikli",
    "1. `new Foo(...)` — xotira ajratiladi, property'lar default qiymat oladi, `__construct` chaqiriladi.",
    "2. Obyekt ishlatiladi (handle bilan uzatiladi).",
    "3. Hech kim ishora qilmay qolganda (refcount 0) `__destruct` chaqiriladi va xotira bo'shaydi; tsiklik bog'lanish bo'lsa GC (1.23). Skript tugaganda qolgan obyektlar destruct qilinadi.",
    "",
    "### Konstruktor qoidalari",
    "- Konstruktor `private` bo'lishi mumkin (singleton, named constructor); `__construct` return tipi yo'q.",
    "- Ota konstruktorni chaqirish majburiy emas, lekin unutish xato (`parent::__construct()`).",
    "- Constructor promotion: parametr tipi va visibility → property; default qiymat bilan, `readonly` bilan birga.",
    "- Konstruktor ichida og'ir ish (DB, HTTP) qilmang: test qilish va DI qiyin.",
    "- Konstruktor argumentlari soni 4–5 dan oshsa — DTO yoki builder.",
    "",
    "### Property va metod",
    "- Property: tipli, default, `static`, `readonly`, hooks (1.34). Dinamik property 8.2 dan deprecated (9.0 da xato).",
    "- Metodlar: `public/protected/private`, `static`, `final`, `abstract`. Metod nomlari katta-kichik harfga sezgir emas (property esa sezgir).",
    "- `__toString()` va `Stringable` avtomatik.",
    "- `$this` faqat instance kontekstida; statik metodda ishlatsangiz Error.",
    "",
    "### Klass tuzilmalari",
    "- **Konstantalar:** `const X = 1`, `final const`, typed (8.3), interface'da ham.",
    "- **Nested class yo'q**; anonymous class bor (1.19).",
    "- **Klasslararo ko'rinish:** `private` — faqat e'lon qilingan klass (voris ko'rmaydi), lekin **bir klassning boshqa nusxasi** bir-birining private'ini ko'ra oladi (`$other->secret`). Bu klass-darajali, obyekt-darajali emas.",
    "- **Obyekt identifikatori:** `spl_object_id`, `spl_object_hash`.",
    "",
    "### Obyektlarni solishtirish va nusxalash",
    "`==` bir klass, property'lar `==`; `===` bir xil nusxa; `clone` sayoz nusxa (1.20); `instanceof` voris va interface uchun ham `true`.",
    "",
    "### Obyekt va massiv",
    "`(array)$obj` — property'lar (private/protected nomlar maxsus prefiks bilan), `(object)$arr` → `stdClass`. `get_object_vars`, `property_exists`, `method_exists`, `get_class`, `$obj::class` (8.0).",
    "",
    "### SOLID qisqacha",
    "- **S**ingle responsibility: klassni o'zgartirish uchun bitta sabab.",
    "- **O**pen/closed: kengayishga ochiq, o'zgarishga yopiq (interface + yangi klass).",
    "- **L**iskov: voris ota o'rnini bosa oladi.",
    "- **I**nterface segregation: kichik interface.",
    "- **D**ependency inversion: abstraksiyaga bog'lanish.",
    "Laravel container (DI) shu g'oyalarga tayanadi."
  ],
  "examples": [
    {
      "title": "Constructor promotion",
      "lang": "php",
      "code": [
        "final class Invoice",
        "{",
        "    public function __construct(",
        "        private int $id,",
        "        private Money $total,",
        "        private ?DateTimeImmutable $paidAt = null,",
        "    ) {}",
        "",
        "    public function markPaid(DateTimeImmutable $at): void",
        "    {",
        "        $this->paidAt = $at;",
        "    }",
        "",
        "    public function isPaid(): bool { return $this->paidAt !== null; }",
        "}"
      ]
    },
    {
      "title": "Visibility",
      "lang": "php",
      "code": [
        "class A { private function secret() {} protected function hook() {} }",
        "class B extends A",
        "{",
        "    public function test() { $this->hook(); /* OK */ $this->secret(); /* Error */ }",
        "}"
      ]
    },
    {
      "title": "== va ===",
      "lang": "php",
      "code": [
        "$a = new Invoice(1, $m); $b = new Invoice(1, $m);",
        "var_dump($a == $b);    // true: bir klass, teng property",
        "var_dump($a === $b);   // false: har xil obyekt",
        "$c = $a;",
        "var_dump($a === $c);   // true: bitta handle"
      ]
    },
    {
      "title": "Private klass-darajali",
      "lang": "php",
      "code": [
        "class Account",
        "{",
        "    private int $balance = 0;",
        "    public function equals(self $o): bool { return $this->balance === $o->balance; } // boshqa nusxaning private'i ochiq",
        "}"
      ]
    },
    {
      "title": "Named constructors",
      "lang": "php",
      "code": [
        "final class Money",
        "{",
        "    private function __construct(private int $tiyin, private string $cur) {}",
        "    public static function uzs(int $som): self { return new self($som * 100, 'UZS'); }",
        "    public static function fromTiyin(int $t, string $c): self { return new self($t, $c); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Public property'ni to'g'ridan-to'g'ri ochish invariantlarni buzadi (manfiy narx). Private + metod yoki readonly/`private(set)` ishlating.",
    "Konstruktorda qisman initsializatsiya qilingan obyekt yaroqsiz holatda qoladi; konstruktor yoki named constructor to'liq holatni kafolatlasin.",
    "Merosga haddan tashqari tayanish mo'rt kod beradi (fragile base class). Odatda composition va interface.",
    "Static holat va singleton testlashni qiyinlashtiradi va Octane'da so'rovlar orasida sizadi.",
    "Dinamik property (`$o->yangi = 1`) 8.2 dan deprecated: klassda e'lon qiling.",
    "Konstruktorda og'ir I/O testni va DI'ni qiyinlashtiradi.",
    "`private` voris klassga ko'rinmaydi: override o'rniga `protected` yoki composition.",
    "`__destruct` chaqirilish vaqtiga tayanmang; resurslarni aniq yoping."
  ]
});
