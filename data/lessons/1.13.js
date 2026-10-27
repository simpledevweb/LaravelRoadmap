/* Chuqur dars: 1.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.13", {
  "lesson": [
    "### Inheritance",
    "`class Child extends Parent` — voris ota klassning public/protected a'zolarini oladi va override qila oladi. PHP **bitta** ota klassni qo'llab-quvvatlaydi (ko'p merosga interface va trait orqali erishiladi).",
    "",
    "### Override qoidalari",
    "- Metod imzosi mos bo'lishi shart: parametrlar kengayishi (contravariance), return toraymasi (covariance).",
    "- Ko'rinish torayishi mumkin emas (public → protected xato).",
    "- `parent::method()` ota implementatsiyani chaqiradi; konstruktorda `parent::__construct()` ni unutmang.",
    "- `#[\\Override]` (8.3): ota metod yo'q bo'lsa kompilyatsiyada xato: imlo xatolarini ushlaydi.",
    "- `final` metod/klass override'ni taqiqlaydi.",
    "",
    "### Polimorfizm",
    "Bir interface orqali turli xatti-harakat: kod `PaymentGateway` ga yozilgan, haqiqiy implementatsiya runtime'da tanlanadi (`StripeGateway`, `PaymeGateway`). `instanceof` zanjirlari va `switch ($type)` ko'pincha polimorfizm yetishmasligining belgisi.",
    "",
    "### Liskov Substitution (LSP)",
    "Voris ota o'rniga qo'yilganda dastur to'g'ri ishlashi kerak. LSP buzilishi: voris kutilmagan exception tashlaydi, shartlarni kuchaytiradi, bo'sh implementatsiya qiladi. \"Kvadrat — to'rtburchak\" klassik namuna.",
    "",
    "### Composition afzalligi",
    "Meros — kuchli bog'lanish. \"Has-a\" munosabati uchun kompozitsiya: `Order` ichida `PricingStrategy`. Meros faqat haqiqiy \"is-a\" va barqaror ierarxiyada.",
    "",
    "### Late static binding",
    "`static::` runtime'dagi klassga ishora qiladi (1.14).",
    "",
    "### Ierarxiya va super-chaqiruvlar",
    "- **Method resolution:** PHP metodni obyektning klassidan boshlab ota klasslarga qarab qidiradi; trait'lar ota'dan oldin keladi.",
    "- `parent::__construct()`, `parent::method()` — ota implementatsiyani chaqirish.",
    "- **Abstract/final** (1.11, 1.12).",
    "- Voris `public` ni `protected` ga torayta olmaydi; kengaytirishi mumkin.",
    "- `self::`, `static::`, `parent::` (1.14).",
    "",
    "### Polimorfizm turlari",
    "- **Subtype (OOP):** interface/ota klass orqali turli implementatsiya.",
    "- **Parametrik:** generics (PHP'da yo'q; PHPDoc `@template T`).",
    "- **Ad-hoc:** union/overload: PHP overload'ni qo'llamaydi, `match` + tip tekshiruv yoki turli nomli metodlar.",
    "- **Duck typing:** `callable`, `iterable`, `Stringable`, `Countable` — interfeys orqali tekshiriladi.",
    "",
    "### Strategy va boshqa patternlar",
    "Strategy: xulq-atvor interface'ga chiqariladi, runtime'da almashtiriladi (to'lov usullari, narx hisoblash). Decorator: bir xil interface'ni o'rab qo'shimcha ish qiladi (kesh, log). Factory/Abstract Factory: yaratishni yashiradi. Bularning hammasi meros emas, **kompozitsiya + interface**.",
    "",
    "### Meros muammolari",
    "- **Fragile base class:** ota klass o'zgarishi voris'ni buzadi.",
    "- **Gorilla/banana muammosi:** bitta metod uchun butun ierarxiya tortiladi.",
    "- **Diamond yo'q:** PHP ko'p merosga ega emas; interface + trait bilan modellashtiriladi.",
    "- **Chuqur ierarxiya:** nima qayerda override qilingani yo'qoladi; 2–3 darajadan oshirmang.",
    "- Kodni qayta ishlatish uchun meros emas, kompozitsiya (\"has-a\").",
    "",
    "### LSP ni tekshirish",
    "Voris: oldingi shartni (precondition) kuchaytirmaydi, keyingi shartni (postcondition) susaytirmaydi, invariantni saqlaydi, yangi exception turi tashlamaydi. Test: ota klassning barcha testlari voris'da ham o'tishi kerak (contract testing).",
    "",
    "### final va ochiq kengaytirish",
    "Kutubxona klasslari `final` bo'lsa, foydalanuvchi meros qila olmaydi: bu API barqarorligini beradi. Laravel/Doctrine ichida ko'p klasslar kengaytirishga ochiq (Model), shuning uchun overrideda ehtiyot bo'ling. `@internal`, `@api` PHPDoc teglari.",
    "",
    "### Instanceof va type switch",
    "`instanceof` zanjirlari yomon belgi; polimorfizm yoki `match(true)` bilan. Visitor pattern PHP'da ko'pincha enum + `match` bilan almashtiriladi."
  ],
  "examples": [
    {
      "title": "Override + parent + #[Override]",
      "lang": "php",
      "code": [
        "class Model { public function save(): bool { return true; } }",
        "",
        "final class Post extends Model",
        "{",
        "    #[\\Override]",
        "    public function save(): bool",
        "    {",
        "        $this->slug = slugify($this->title);",
        "        return parent::save();",
        "    }",
        "}"
      ]
    },
    {
      "title": "Polimorfizm",
      "lang": "php",
      "code": [
        "interface Gateway { public function charge(int $amount): string; }",
        "",
        "final class Checkout",
        "{",
        "    public function __construct(private Gateway $gateway) {}",
        "",
        "    public function pay(int $amount): string",
        "    {",
        "        return $this->gateway->charge($amount);  // qaysi gateway — bilmaydi",
        "    }",
        "}"
      ]
    },
    {
      "title": "LSP buzilishi",
      "lang": "php",
      "code": [
        "class Bird { public function fly(): void { /* uchadi */ } }",
        "class Penguin extends Bird",
        "{",
        "    public function fly(): void { throw new LogicException('Uchmaydi'); }  // LSP buzildi",
        "}",
        "// Yechim: Bird dan fly() ni olib tashlab, FlyingBird interface kiriting"
      ]
    },
    {
      "title": "Strategy",
      "lang": "php",
      "code": [
        "interface Pricing { public function price(Cart $c): int; }",
        "final class Regular implements Pricing { public function price(Cart $c): int { return $c->sum(); } }",
        "final class BlackFriday implements Pricing { public function price(Cart $c): int { return (int) ($c->sum() * 0.7); } }",
        "",
        "final class Checkout { public function __construct(private Pricing $p) {} public function total(Cart $c): int { return $this->p->price($c); } }"
      ]
    },
    {
      "title": "Decorator",
      "lang": "php",
      "code": [
        "final class CachedRepo implements UserRepo",
        "{",
        "    public function __construct(private UserRepo $inner, private CacheInterface $cache) {}",
        "    public function find(int $id): ?User",
        "    {",
        "        return $this->cache->remember(\"u:$id\", 300, fn () => $this->inner->find($id));",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Voris konstruktorida `parent::__construct()` ni chaqirmasangiz, ota initsializatsiyasi bajarilmaydi.",
    "Ota metodni override qilib xato tashlash yoki bo'sh qoldirish — LSP buzilishi: ierarxiyani qayta ko'ring.",
    "Chuqur meros zanjiri o'zgarishlarni qiyinlashtiradi (fragile base class); 2–3 darajadan oshmasin.",
    "`#[\\Override]` siz ota metod nomi o'zgarsa override jimgina oddiy yangi metodga aylanadi.",
    "`instanceof` zanjirlari ko'p bo'lsa polimorfizm yetishmaydi.",
    "Meros orqali kodni qayta ishlatish bog'lanishni kuchaytiradi: kompozitsiya afzal.",
    "Voris yangi exception tashlasa (ota tashlamagan) LSP buzilgan.",
    "`final` bo'lmagan kutubxona klassini override qilish keyingi versiyada sinishi mumkin."
  ]
});
