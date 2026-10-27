/* Chuqur dars: 1.34. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.34", {
  "lesson": [
    "### Muammo: getter/setter shovqini",
    "Klassik PHP'da bitta tekshiruvli property uchun `private $name`, `getName()`, `setName()` yoziladi. PHP 8.4 **property hooks** bu mantiqni propertyning o'ziga biriktiradi: o'qish `get`, yozish `set` hook orqali.",
    "",
    "### Hook turlari",
    "- **Backed property**: qiymat saqlanadi; hook ichida `$this->prop` ga murojaat bor. `set` hook ichida `$this->name = ...` hookni chaqirmaydi, to'g'ridan-to'g'ri saqlaydi.",
    "- **Virtual property**: `$this->prop` ga hech qachon murojaat qilinmaydi; xotira olmaydi, faqat hisoblanadi (masalan `fullName`).",
    "- Qisqa yozuv: `get => expr;` va `set => expr;`, ikkinchisi qiymatni o'zgartirib saqlaydi.",
    "- Hookni interface va abstract klassda ham e'lon qilish mumkin (`public string $name { get; }`).",
    "",
    "### Asymmetric visibility",
    "O'qish va yozish ruxsati alohida: `public private(set) string $slug;` ya'ni hamma o'qiydi, yozish faqat klass ichidan. Qoida: yozish ko'rinishi o'qishdan **kengroq bo'la olmaydi**. Property tipli bo'lishi shart. `readonly` property esa avtomatik `protected(set)` ga teng.",
    "",
    "### Cheklovlar",
    "1. `readonly` bilan hooklar birga ishlamaydi. Cheklovli yozish kerak bo'lsa asymmetric visibility ishlating.",
    "2. Hookli property `static` bo'la olmaydi.",
    "3. Virtual property'ga faqat `get` bo'lsa yozish xato; `set` ham bo'lsa, o'zingiz qiymatni saqlashingiz kerak.",
    "4. Hooklar ichida murakkab mantiq (DB so'rovi) yozmang: property oddiy ko'rinadi, lekin sekin ishlashi kutilmagan bo'ladi.",
    "",
    "### Laravel bilan",
    "Eloquent attribute'lari `__get` orqali ishlaydi va hooklarga to'g'ridan-to'g'ri bog'lanmaydi. Hooklar eng ko'p DTO, value object va domain obyektlarida foydali.",
    "",
    "### Hooks chuqurroq",
    "- `get` hook: qiymat o'qilganda; backed propertyda `$this->prop` xom saqlangan qiymatni beradi (hook chaqirilmaydi — recursion yo'q).",
    "- `set` hook: qiymat yozilganda; parametr nomi `$value` yoki aniq `set(string $v)`; tip kengroq bo'lishi mumkin (`string|Stringable` qabul qilib, `string` saqlash).",
    "- Qisqa yozuv: `get => expr;`, `set => expr;` (ifoda saqlanadigan qiymat).",
    "- **Virtual property:** `get` bor, `$this->prop` ga hech qachon murojaat yo'q → xotira olmaydi, `set` bo'lsa o'zingiz boshqa propertyga yozasiz.",
    "- **Interface'da:** `public string $name { get; }` — implementatsiya oddiy property yoki hook bilan.",
    "- **Abstract property:** abstract klassda hook bilan; vorislar amalga oshiradi.",
    "- **Voris override:** `parent::$prop::get()` sintaksisi bilan ota hook chaqiriladi.",
    "- Cheklovlar: `static` hook yo'q, `readonly` + hook yo'q, hookda `__get`/`__set` bilan bog'liq: hook mavjud bo'lsa magic ishlamaydi, `unset()` hookli propertyga cheklangan.",
    "- **Reflection:** `ReflectionProperty::getHooks()`, `hasHooks()`, `isVirtual()`.",
    "- **Serialize / var_dump / foreach / get_object_vars / (array):** backed propertyning xom qiymati ishtirok etadi, virtual esa chiqmaydi.",
    "",
    "### Asymmetric visibility chuqurroq",
    "- Sintaksis: `public private(set) T $x`, `public protected(set) T $x`, `protected private(set)`.",
    "- Qoida: `set` ko'rinishi `get` ko'rinishidan kengroq bo'lmaydi.",
    "- Tipli property talab qilinadi; `readonly` ≈ `protected(set)` + bir marta yozish.",
    "- Konstruktor promotion bilan: `public function __construct(public private(set) string $slug) {}`.",
    "- Voris: `protected(set)` ni `public(set)` ga kengaytirish mumkin emas (override qilganda toraytirish mumkin).",
    "- Reflection: `ReflectionProperty::isPrivateSet()`, `isProtectedSet()`.",
    "- Massiv property: `$o->items[] = 1` ham `set` ruxsatini talab qiladi.",
    "",
    "### Qachon qaysi",
    "- Mantiqsiz oddiy ma'lumot → public property yoki readonly.",
    "- Tashqaridan o'qish, ichkaridan yozish → `private(set)`.",
    "- Yozishda normalizatsiya/validatsiya → `set` hook.",
    "- Hisoblanadigan qiymat → virtual `get`.",
    "- Immutable VO → readonly klass.",
    "",
    "### Laravel va ORM",
    "Eloquent hali hooklarni to'g'ridan-to'g'ri qo'llab-quvvatlamaydi (atributlar `__get` va `attributes` massividan). Hooklar DTO, command, value object, Livewire form obyektlarida foydali; Livewire properties bilan sinab ko'ring. Doctrine ORM hooklarni bosqichma-bosqich qo'llab-quvvatlamoqda."
  ],
  "examples": [
    {
      "title": "Set hook va asymmetric visibility",
      "lang": "php",
      "code": [
        "final class Article",
        "{",
        "    public private(set) string $slug;",
        "",
        "    public string $title {",
        "        set {",
        "            $this->title = trim($value);",
        "            $this->slug  = strtolower(str_replace(' ', '-', $this->title));",
        "        }",
        "    }",
        "}",
        "",
        "$a = new Article();",
        "$a->title = '  Salom Dunyo ';",
        "echo $a->slug;         // salom-dunyo",
        "$a->slug = 'x';        // Error: Cannot modify private(set) property"
      ]
    },
    {
      "title": "Virtual property",
      "lang": "php",
      "code": [
        "final class Price",
        "{",
        "    public function __construct(",
        "        public int $amount,          // tiyin",
        "        public int $vatPercent = 12,",
        "    ) {}",
        "",
        "    public int $total {",
        "        get => intdiv($this->amount * (100 + $this->vatPercent), 100);",
        "    }",
        "}",
        "",
        "echo (new Price(10_000))->total; // 11200"
      ],
      "note": "`total` xotirada saqlanmaydi, har o'qilganda hisoblanadi."
    },
    {
      "title": "Interface'da hook",
      "lang": "php",
      "code": [
        "interface HasLabel",
        "{",
        "    public string $label { get; }",
        "}",
        "",
        "final class Tag implements HasLabel",
        "{",
        "    public function __construct(public readonly string $label) {}",
        "}"
      ],
      "note": "Interface faqat o'qishni talab qiladi; implementatsiya oddiy property bo'lishi mumkin."
    },
    {
      "title": "Voris va parent hook",
      "lang": "php",
      "code": [
        "class User { public string $name { set => ucfirst(trim($value)); } }",
        "class Admin extends User",
        "{",
        "    public string $name {",
        "        set { parent::$name::set(strtoupper($value)); }",
        "    }",
        "}"
      ]
    },
    {
      "title": "Promotion + private(set)",
      "lang": "php",
      "code": [
        "final class Order",
        "{",
        "    public function __construct(",
        "        public private(set) int $id,",
        "        public protected(set) string $status = 'new',",
        "    ) {}",
        "    public function ship(): void { $this->status = 'shipped'; }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Hook ichida `$this->name = $value` yozish backed propertyda rekursiya emas: PHP uni to'g'ridan-to'g'ri saqlash deb biladi. Lekin boshqa propertyni yozsangiz uning hooki ishlaydi.",
    "`readonly` bilan hook yoki `private(set)` ni aralashtirmang: readonly kerak bo'lsa hook yo'q, hook kerak bo'lsa `private(set)`.",
    "Hook ichiga og'ir ish (DB, HTTP) joylashtirish oddiy property o'qish kutilmagan sekin bo'lishiga olib keladi.",
    "Eski PHP versiyada (8.3 va past) sintaksis parse error beradi: kutubxona yozayotgan bo'lsangiz `composer.json` da `php: ^8.4` ni qo'ying.",
    "Hookli propertyni `unset()` qilish cheklangan; hook ichida side-effect (log, DB) yozmang.",
    "Virtual property `set` siz yozilsa Error.",
    "`private(set)` ni voris klass o'zgartira olmaydi: kerak bo'lsa `protected(set)`.",
    "Hooklar eski PHP'da parse error: `composer.json` talabi."
  ]
});
