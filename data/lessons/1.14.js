/* Chuqur dars: 1.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.14", {
  "lesson": [
    "### Static a'zolar",
    "`static` property va metodlar obyektsiz, klassga tegishli. Murojaat: `Foo::bar()`, `self::$count`, `static::create()`. Static metod ichida `$this` yo'q.",
    "",
    "### Qaysi vaqtda mantiqli",
    "- **Named constructor / factory**: `Money::fromTiyin(100)`, `User::fromArray($d)`.",
    "- Sof yordamchi funksiyalar (holatsiz).",
    "- Konstantalar va enum o'rniga ishlatiladigan yordamchilar.",
    "",
    "### Qaysi vaqtda yomon",
    "Static holat (global o'zgaruvchining niqobi): testlarni bog'laydi, dependency'ni yashiradi, uzoq yashovchi jarayonlarda (Octane, queue worker) so'rovlar orasida **qoladi**. `Cache::get` kabi Laravel facade'lari statik ko'rinadi, lekin ichida container resolve qilinadi va mock qilinadi.",
    "",
    "### self vs static (Late Static Binding)",
    "- `self::` — metod **e'lon qilingan** klass.",
    "- `static::` — metod **chaqirilgan** klass (runtime).",
    "`new static()` voris klassni yaratadi, `new self()` doim ota klassni. Fluent API va `Model::create()` shu sababli `static` qaytaradi.",
    "",
    "### parent va forwarding",
    "`parent::`, `self::` va `static::` chaqiruvlari LSB ma'lumotini oldinga uzatadi (forwarding), `Foo::method()` esa uzatmaydi.",
    "",
    "### Static va testlash",
    "Statik chaqiruvni mock qilib bo'lmaydi (kutubxonasiz). Shuning uchun biznes mantiqni instance servislarga chiqarib, DI orqali bering.",
    "",
    "### Static tafsiloti",
    "",
    "**Qayerda uchraydi**",
    "- `static` metod/property, `static` o'zgaruvchi (funksiya ichida), `static` closure, `static` return tipi, `static::` (LSB), `new static`.",
    "- Hammasi nomi o'xshash, ma'nosi har xil — chalkashmang.",
    "",
    "**Static property**",
    "Klass darajasida bitta nusxa (voris'lar ota'ning statik property'sini **bo'lishadi**, agar voris qayta e'lon qilmasa). Trait'dagi statik property har ishlatuvchi klassda alohida (1.12). Tipli statik property mumkin.",
    "",
    "**Late Static Binding batafsil**",
    "- `self::` e'lon qilingan klass: kompilyatsiya vaqtida bog'lanadi.",
    "- `static::` chaqirilgan (runtime) klass: LSB.",
    "- `parent::foo()`, `self::foo()` LSB ma'lumotini **oldinga uzatadi**; `Foo::foo()` esa uzatmaydi (yangi LSB boshlanadi).",
    "- Klass konstantasi uchun ham: `static::TABLE`, `self::TABLE`.",
    "- `static` return tipi: fluent builder va `Model::query()` kabilar uchun.",
    "",
    "**Singleton va Service Locator**",
    "`static $instance` bilan singleton: global holat, test qiyin, Octane'da xavfli. O'rniga DI container'da `singleton` binding. Service Locator (`app(Foo::class)` hamma joyda) bog'liqlikni yashiradi.",
    "",
    "**Laravel Facade**",
    "`Cache::get()` aslida `Facade::__callStatic` → container'dan servis → metodni chaqirish. Shuning uchun `Cache::shouldReceive()` (Mockery) bilan mock qilinadi. Real-time facade: `Facades\\App\\Services\\X`.",
    "",
    "**Statik analiz va test**",
    "Statik metodlar PHPStan'da oson tahlil qilinadi, ammo mock qilish qiyin; mantiq statik emas, instance'da bo'lsin.",
    "",
    "**Qachon static yaxshi**",
    "Pure yordamchi funksiyalar (`Arr::get`), named constructor, enum, factory; doimiy konstantalar."
  ],
  "examples": [
    {
      "title": "self vs static",
      "lang": "php",
      "code": [
        "class Model",
        "{",
        "    public static function make(): static { return new static(); }",
        "    public static function makeSelf(): self { return new self(); }",
        "}",
        "class Post extends Model {}",
        "",
        "get_class(Post::make());      // Post",
        "get_class(Post::makeSelf());  // Model"
      ]
    },
    {
      "title": "Named constructor",
      "lang": "php",
      "code": [
        "final class Money",
        "{",
        "    private function __construct(public readonly int $tiyin) {}",
        "",
        "    public static function fromSom(float $som): self",
        "    {",
        "        return new self((int) round($som * 100));",
        "    }",
        "}",
        "$m = Money::fromSom(12.5);"
      ]
    },
    {
      "title": "Static holat tuzog'i",
      "lang": "php",
      "code": [
        "final class Context",
        "{",
        "    public static ?User $user = null;   // Octane/worker da keyingi so'rovga o'tib ketadi!",
        "}"
      ]
    },
    {
      "title": "LSB forwarding",
      "lang": "php",
      "code": [
        "class A",
        "{",
        "    public static function create(): static { return new static(); }",
        "    public static function who() { return static::class; }",
        "    public static function test() { return self::who(); }      // LSB uzatiladi",
        "    public static function test2() { return A::who(); }        // uzatilmaydi",
        "}",
        "class B extends A {}",
        "echo B::test(), B::test2();   // B A"
      ]
    },
    {
      "title": "Statik property bo'lishish",
      "lang": "php",
      "code": [
        "class P { public static int $n = 0; }",
        "class C extends P {}",
        "C::$n = 5;",
        "echo P::$n;                   // 5: bitta nusxa",
        "class D extends P { public static int $n = 0; }   // qayta e'lon: alohida"
      ]
    }
  ],
  "pitfalls": [
    "`static` property so'rovlar orasida uzoq yashovchi jarayonlarda saqlanib qoladi: foydalanuvchi ma'lumoti aralashishi.",
    "`new self()` o'rniga `new static()` kerak bo'lganda voris klass yaratilmaydi; fluent/factory metodlarda `static`.",
    "Statik metodlar testda mock qilinmaydi; bog'liqlikni instance orqali bering.",
    "Static metodni `$obj->method()` bilan chaqirish ishlaydi, lekin chalkashtiradi; doim `Class::method()`.",
    "`self::who()` va `A::who()` LSB uchun farq qiladi (forwarding): framework metodlarini chaqirganda natija kutilmagan bo'lishi mumkin.",
    "Voris statik property'ni qayta e'lon qilmasa, ota bilan umumiy qoladi.",
    "Singleton + Octane = foydalanuvchilar o'rtasida ma'lumot sizishi.",
    "Facade statik ko'rinsa ham test uchun `fake()`/`shouldReceive()` kerak."
  ]
});
