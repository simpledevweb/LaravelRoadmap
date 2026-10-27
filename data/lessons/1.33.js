/* Chuqur dars: 1.33. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.33", {
  "lesson": [
    "### Readonly property",
    "PHP 8.1: `public readonly string $name;` — qiymat **bir marta**, faqat klass ichidan beriladi, keyin o'zgarmaydi (o'zgartirish `Error`). Tipli bo'lishi shart, default qiymat bo'lishi mumkin emas. Konstruktor promotion bilan juda qulay.",
    "",
    "### Readonly class",
    "8.2: `readonly class` hamma property'ni readonly qiladi va dinamik property'ni taqiqlaydi. Faqat tipli property'lar bo'lishi mumkin va static property bo'lmaydi.",
    "",
    "### Sayoz immutability",
    "`readonly` property'ning o'zi o'zgarmaydi, ammo ichidagi **obyekt** o'zgarishi mumkin (`$this->items->add()`). Massiv elementiga yozish ham mumkin emas, chunki massivning o'zi qiymat. To'liq immutable uchun ichki obyektlar ham immutable bo'lsin yoki klonlansin.",
    "",
    "### Value Object",
    "- Qiymati bilan taqqoslanadi (identifikator emas).",
    "- O'zgarmas; o'zgartirish yangi nusxa qaytaradi (`withX()`).",
    "- Konstruktorda validatsiya qiladi: yaroqsiz obyekt yaratilmaydi.",
    "Misol: `Money`, `Email`, `DateRange`, `Coordinates`.",
    "",
    "### DTO bilan farq",
    "DTO — ma'lumot tashuvchi (validatsiya shart emas); Value Object — domen qiymati va qoidalari bor.",
    "",
    "### clone-with",
    "8.5 da `clone($obj, ['prop' => $v])` readonly obyektdan o'zgartirilgan nusxa yaratishni sodda qiladi. Undan oldin `new static(...)` yoki `clone` + reflection hiylalari kerak edi (readonly bo'lsa `__clone` ichida qayta yozish 8.3 dan ruxsat).",
    "",
    "### Laravel",
    "Request/DTO, event payload, queue job parametrlari uchun readonly foydali. Eloquent modellar mutable bo'lib qoladi.",
    "",
    "### Readonly chuqurroq",
    "- Property tipli bo'lishi shart (`mixed` ham); tipsiz yoki default qiymatli bo'lmaydi.",
    "- Faqat **e'lon qilingan klass doirasidan** initsializatsiya qilinadi (8.4 da `protected(set)` implicit). Voris klass ota readonly'ni yozolmaydi (8.4 dan `private(set)` bilan farq).",
    "- `unset()` faqat initsializatsiyadan oldin klass ichidan; clone `__clone` ichida (8.3).",
    "- Static property readonly bo'la olmaydi.",
    "- Reference olish: `$r = &$obj->readonlyProp` — xato.",
    "- Massiv readonly property: `$this->items[] = 1` xato (o'zgartirish); yangi massiv bilan almashtirish ham xato (bir marta).",
    "- Reflection: `ReflectionProperty::isReadOnly()`, `ReflectionClass::isReadOnly()` (8.2).",
    "",
    "### Immutable obyekt dizayni",
    "1. Konstruktorda to'liq initsializatsiya va validatsiya.",
    "2. `with*` metodlari `clone` yoki `new static` orqali yangi nusxa.",
    "3. Ichki kolleksiyalar: massiv (qiymat, xavfsiz) yoki immutable collection; mutable obyektlarni defensiv nusxalash.",
    "4. Tenglik: `equals()` metodi (`==` property solishtiradi, lekin ichki obyektlar farq qilishi mumkin).",
    "5. `__toString`, `jsonSerialize` aniq.",
    "",
    "### Value Object vs Entity vs DTO",
    "- **Entity:** identifikator (id) bilan aniqlanadi, vaqt davomida o'zgaradi (User, Order).",
    "- **Value Object:** qiymat bilan aniqlanadi, immutable (Money, Email, DateRange).",
    "- **DTO:** ma'lumot tashuvchi (qatlamlar orasida), mantiq kam.",
    "- **Aggregate:** entity+VO guruhi, bitta ildiz orqali o'zgaradi (DDD).",
    "",
    "### Eloquent va VO",
    "Custom cast: `class Money implements CastsAttributes { get(...) { return new Money(...); } set(...) }` — modelda VO sifatida ishlatish. Model o'zi mutable; VO — property qiymatlari uchun. Spatie Laravel Data, DTO paketlari.",
    "",
    "### Immutability afzalliklari",
    "Thread-safety (Octane/Swoole), side-effect yo'q, kesh va tenglik oson, bug izlash oson. Xarajat: har o'zgarishda yangi obyekt (kichik obyektlar uchun ahamiyatsiz).",
    "",
    "### PHP 8.5 clone with",
    "`clone($point, ['x' => 5])`: readonly property'larni o'zgartirilgan nusxa yaratadi (property `__clone` kerak emas); property ko'rinishi shu doiraga mos bo'lishi kerak."
  ],
  "examples": [
    {
      "title": "Value Object + validatsiya",
      "lang": "php",
      "code": [
        "final readonly class Email",
        "{",
        "    public string $value;",
        "",
        "    public function __construct(string $value)",
        "    {",
        "        $value = strtolower(trim($value));",
        "        filter_var($value, FILTER_VALIDATE_EMAIL) or throw new InvalidArgumentException(\"Email noto'g'ri: $value\");",
        "        $this->value = $value;",
        "    }",
        "",
        "    public function equals(self $o): bool { return $this->value === $o->value; }",
        "}"
      ]
    },
    {
      "title": "With-er pattern",
      "lang": "php",
      "code": [
        "final readonly class DateRange",
        "{",
        "    public function __construct(public DateTimeImmutable $from, public DateTimeImmutable $to)",
        "    {",
        "        $from <= $to or throw new DomainException('from <= to');",
        "    }",
        "",
        "    public function withTo(DateTimeImmutable $to): static",
        "    {",
        "        return new static($this->from, $to);",
        "    }",
        "}"
      ]
    },
    {
      "title": "Sayoz tuzoq",
      "lang": "php",
      "code": [
        "final class Cart",
        "{",
        "    public function __construct(public readonly ArrayObject $items) {}",
        "}",
        "$c = new Cart(new ArrayObject());",
        "$c->items[] = 'olma';        // OK: obyektning ichi o'zgardi",
        "$c->items = new ArrayObject; // Error: readonly"
      ]
    },
    {
      "title": "Custom cast (Value Object)",
      "lang": "php",
      "code": [
        "class MoneyCast implements CastsAttributes",
        "{",
        "    public function get($model, string $key, $value, array $attrs): Money",
        "    {",
        "        return new Money((int) $value, $attrs['currency'] ?? 'UZS');",
        "    }",
        "    public function set($model, string $key, $value, array $attrs): array",
        "    {",
        "        return [$key => $value->amount, 'currency' => $value->currency];",
        "    }",
        "}"
      ]
    },
    {
      "title": "Defensiv nusxalash",
      "lang": "php",
      "code": [
        "final readonly class Team",
        "{",
        "    /** @param list<User> $members */",
        "    public array $members;",
        "    public function __construct(array $members) { $this->members = array_values($members); }",
        "    public function with(User $u): static { return new static([...$this->members, $u]); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`readonly` sayoz: ichki obyektni baribir o'zgartirish mumkin; chuqur immutabilitet uchun ichki tiplarni ham immutable qiling.",
    "Readonly property default qiymat olmaydi va klass tashqarisidan initsializatsiya qilinmaydi (`Cannot initialize readonly property from global scope`).",
    "Readonly class ota klassi ham readonly bo'lishi kerak; oddiy klassdan readonly klass yaratib bo'lmaydi.",
    "Hook (8.4) va `readonly` birga ishlamaydi: cheklov kerak bo'lsa `private(set)`.",
    "Readonly sayoz: ichidagi mutable obyektni baribir o'zgartirish mumkin.",
    "`readonly` property default qiymat bera olmaydi: konstruktorda o'rnating.",
    "`with*` metodlarida validatsiyani qayta chaqiring, aks holda yaroqsiz obyekt yaratish mumkin.",
    "Eloquent model readonly bo'lmaydi; VO ni cast orqali ishlating."
  ]
});
