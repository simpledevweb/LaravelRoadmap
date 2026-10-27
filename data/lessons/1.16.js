/* Chuqur dars: 1.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.16", {
  "lesson": [
    "### Attribute nima",
    "PHP 8.0 attribute — klass, metod, property, parametr, konstanta yoki funksiyaga biriktiriladigan **tuzilmaviy metama'lumot**: `#[Route('/posts')]`. Docblock izohi matn bo'lib, uni parser'lar qo'lda tahlil qilardi; attribute esa tilning o'zi qismi, nomlari `use` va autoload bilan ishlaydi, argumentlari tekshiriladi.",
    "",
    "### O'z attribute'ingizni yaratish",
    "Oddiy klass, ustiga `#[Attribute]`. `Attribute::TARGET_*` bilan qayerga qo'yilishi, `IS_REPEATABLE` bilan takrorlanishi cheklanadi. Attribute klassining o'zi **avtomatik instansiya qilinmaydi**: faqat Reflection orqali o'qiganingizda `newInstance()` chaqirilganda.",
    "",
    "### O'qish",
    "`new ReflectionClass(Foo::class)` → `getAttributes(Route::class)` → `->getArguments()` yoki `->newInstance()`. Metod, property va parametr uchun ham xuddi shunday.",
    "",
    "### Ichki attribute'lar",
    "`#[\\Override]` (8.3), `#[\\SensitiveParameter]` (8.2), `#[\\ReturnTypeWillChange]`, `#[\\AllowDynamicProperties]` (8.2), `#[\\Deprecated]` (8.4), `#[\\NoDiscard]` (8.5).",
    "",
    "### Qayerda ishlatiladi",
    "Laravel: `#[Scope]` (Eloquent local scope), `#[ObservedBy]`; routing paketlari, serializer; Symfony `#[Route]`, Doctrine `#[ORM\\Entity]`, PHPUnit `#[Test]`, `#[DataProvider]`.",
    "",
    "### Narx",
    "Reflection ishlatilgani uchun sekin; production'da natijani keshlang (route cache, config cache). Reflection API tafsilotlari 1.18.",
    "",
    "### Attribute sintaksisi tafsiloti",
    "- Bir nechta: `#[A, B(1)]` yoki alohida `#[A] #[B(1)]`. Argumentlar: pozitsion va nomli (`#[Route('/x', methods: ['GET'])]`).",
    "- Joylashuvi: klass, interface, trait, enum, funksiya, closure, metod, property, klass konstantasi, enum case, parametr, anonymous class.",
    "- Nomlar namespace qoidalari bo'yicha hal qilinadi (`use` ishlaydi); mavjud bo'lmagan klass nomi attribute o'qiguncha xato bermaydi.",
    "- Argument: konstanta ifoda, massiv, enum case, `new` (8.1), `Foo::class`.",
    "",
    "### Attribute klass yaratish",
    "`#[Attribute]` bayrog'i: `Attribute::TARGET_CLASS | TARGET_METHOD | TARGET_PROPERTY | TARGET_PARAMETER | TARGET_FUNCTION | TARGET_CLASS_CONSTANT | TARGET_ALL` va `IS_REPEATABLE`. Bayroq bilan mos bo'lmagan joyda `newInstance()` `Error` beradi (kompilyator emas!). Shuning uchun validatsiyani o'qish kodi qiladi.",
    "",
    "### Reflection orqali o'qish",
    "`getAttributes(?string $name = null, int $flags = 0)`: `ReflectionAttribute::IS_INSTANCEOF` bilan voris/implementatsiyalar ham olinadi. `->getName()`, `->getArguments()` (instansiyasiz), `->newInstance()`, `->getTarget()`, `->isRepeated()`.",
    "",
    "### Ichki (built-in) attribute'lar",
    "- `#[\\Attribute]` — attribute klassni belgilaydi.",
    "- `#[\\ReturnTypeWillChange]` — ichki interface return tipi o'zgarish haqidagi deprecation'ni o'chiradi.",
    "- `#[\\AllowDynamicProperties]` (8.2), `#[\\SensitiveParameter]` (8.2), `#[\\Override]` (8.3), `#[\\Deprecated]` (8.4), `#[\\NoDiscard]` (8.5).",
    "- `#[\\Override]`: ota yoki interface'da yo'q metodni override qilmoqchi bo'lsangiz kompilyatsiyada xato.",
    "",
    "### Docblock annotation bilan farq",
    "Doctrine annotations (`@ORM\\Column`) — docblock matnini maxsus parser tahlil qiladi: sekin, tilga tegishli emas, IDE qo'llab-quvvatlashi qo'shimcha. Attribute — til darajasida: tez, tiplangan, statik tahlilga ko'rinadi. PHPUnit `@test`/`@dataProvider` → `#[Test]`/`#[DataProvider]` ga ko'chdi.",
    "",
    "### Laravel va ekosistemada",
    "Laravel: `#[Scope]`, `#[ObservedBy]`, `#[ScopedBy]`, kontekstual injection atributlari (`#[Config]`, `#[Auth]`); route atributlari uchun alohida paketlar (Spatie). Symfony: `#[Route]`, `#[Autowire]`, `#[AsCommand]`. Doctrine ORM: `#[ORM\\Entity]`.",
    "",
    "### Dizayn",
    "Attribute — **deklarativ metadata**, mantiq emas. Reflection o'qish kodi centralized (compile/cache bosqichida) bo'lsin, har so'rovda emas. Unit test: o'qish funksiyasini tekshiring."
  ],
  "examples": [
    {
      "title": "O'z attribute'ingiz",
      "lang": "php",
      "code": [
        "#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]",
        "final class Route",
        "{",
        "    public function __construct(public string $path, public string $method = 'GET') {}",
        "}",
        "",
        "final class PostController",
        "{",
        "    #[Route('/posts')]",
        "    #[Route('/articles', method: 'POST')]",
        "    public function index() {}",
        "}"
      ]
    },
    {
      "title": "Attribute'ni o'qish",
      "lang": "php",
      "code": [
        "$m = new ReflectionMethod(PostController::class, 'index');",
        "foreach ($m->getAttributes(Route::class) as $attr) {",
        "    $route = $attr->newInstance();       // konstruktor shu yerda chaqiriladi",
        "    echo $route->method, ' ', $route->path, \"\\n\";",
        "}"
      ]
    },
    {
      "title": "Ichki attribute'lar",
      "lang": "php",
      "code": [
        "final class Login",
        "{",
        "    public function check(string $user, #[\\SensitiveParameter] string $password): bool",
        "    {",
        "        throw new Exception('trace da parol ko\\'rinmaydi');",
        "    }",
        "}"
      ]
    },
    {
      "title": "Validatsiya atributi",
      "lang": "php",
      "code": [
        "#[Attribute(Attribute::TARGET_PROPERTY)]",
        "final class Length { public function __construct(public int $min = 0, public int $max = PHP_INT_MAX) {} }",
        "",
        "final class Dto { #[Length(min: 3, max: 20)] public string $name = ''; }",
        "",
        "function validate(object $o): array",
        "{",
        "    $errors = [];",
        "    foreach ((new ReflectionObject($o))->getProperties() as $p) {",
        "        foreach ($p->getAttributes(Length::class) as $a) {",
        "            $r = $a->newInstance(); $len = mb_strlen($p->getValue($o));",
        "            if ($len < $r->min || $len > $r->max) $errors[$p->getName()] = 'uzunlik';",
        "        }",
        "    }",
        "    return $errors;",
        "}"
      ]
    },
    {
      "title": "IS_INSTANCEOF",
      "lang": "php",
      "code": [
        "interface Middleware {}",
        "#[Attribute] final class Auth implements Middleware {}",
        "",
        "$attrs = (new ReflectionMethod($ctrl, 'edit'))->getAttributes(Middleware::class, ReflectionAttribute::IS_INSTANCEOF);"
      ]
    }
  ],
  "pitfalls": [
    "Attribute argumentlari konstanta ifoda bo'lishi shart (8.1 dan `new` ham ruxsat); o'zgaruvchi yoki oddiy funksiya chaqiruvi mumkin emas.",
    "`#[Attribute]` yozilmagan klassni attribute sifatida ishlatsangiz, `newInstance()` da xato; faqat o'qiganda ma'lum bo'ladi.",
    "Reflection har so'rovda sekin: natijani keshlang.",
    "Attribute noto'g'ri yozilsa (mavjud bo'lmagan klass) PHP o'zi xato bermaydi, faqat `newInstance()` paytida.",
    "Attribute klassi `#[Attribute]` siz bo'lsa `newInstance()` da xato; `getArguments()` esa ishlayveradi.",
    "TARGET cheklovi faqat `newInstance()` paytida tekshiriladi.",
    "Attribute'larni har so'rovda Reflection bilan o'qish sekin: route/config cache.",
    "Attribute ichida mantiq yozmang: u faqat metadata."
  ]
});
