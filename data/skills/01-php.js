/* 01 · PHP
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 1,
  slug: "php",
  title: "PHP",
  group: "php-laravel",
  description: "PHP — Laravel ilovalarining poydevori. Senior darajada tilni faqat \"yozish\" emas, balki uning **tiplar tizimi**, xotira modeli, xatolarni boshqarish va runtime (PHP-FPM, OPcache) xatti-harakatini chuqur tushunish talab qilinadi. Framework'dagi ko'p \"sehr\" aslida PHP'ning Reflection, magic method va closure imkoniyatlariga tayanadi.",
  subskills: [
    {
      id: "1.1",
      title: "Syntax va language fundamentals",
      description: [
        "PHP fayli `<?php` tegi bilan boshlanadi; faqat PHP kod bo'lgan faylda yopuvchi `?>` yozilmaydi — aks holda tasodifiy bo'sh joy \"headers already sent\" xatosiga olib keladi. Ifodalar `;` bilan tugaydi, bloklar `{}` bilan ajratiladi.",
        "",
        "Asosiy konstruksiyalar: `if/elseif/else`, `match`, `switch`, `for`, `foreach`, `while`, operatorlar (`??`, `?->`, `<=>`, `**`), string interpolatsiya (`\"Salom, {$name}\"`) va heredoc/nowdoc.",
        "",
        "```php",
        "<?php",
        "$status = match (true) {",
        "    $score >= 90 => 'a\\'lo',",
        "    $score >= 60 => 'yaxshi',",
        "    default      => 'qoniqarsiz',",
        "};",
        "$city = $user?->address?->city ?? 'Noma\\'lum';",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "`match`, null-safe operator va heredoc ishlatilgan, CLI argumentlarini o'qib natija chiqaradigan skript yozing.",
      acceptanceCriteria: [
        "`switch` o'rniga `match` qayerda xavfsizroq ekanini tushuntira oladi",
        "`==` va `===` farqini misol bilan ko'rsata oladi"
      ],
      prerequisites: []
    },
    {
      id: "1.2",
      title: "Variables, Constants va Data Types",
      description: [
        "O'zgaruvchilar `$` bilan boshlanadi va dinamik tipga ega. Skalyar tiplar: `int`, `float`, `string`, `bool`; murakkab: `array`, `object`, `callable`, `iterable`; maxsus: `null`, `resource`.",
        "",
        "Konstantalar `const` (compile-time, class ichida ham) yoki `define()` (runtime) bilan e'lon qilinadi. PHP 8.3 dan class konstantalariga tip berish mumkin: `const string VERSION = '1.0';`.",
        "",
        "Muhim nozikliklar: `int` 64-bit platformada `PHP_INT_MAX` gacha, oshib ketsa `float` ga aylanadi; `float` aniq emas — pul uchun integer (tiyin) yoki `bcmath`/`brick/money` ishlatiladi.",
        "",
        "```php",
        "var_dump(0.1 + 0.2 === 0.3); // false",
        "$priceInTiyin = 1999;        // pulni float'da saqlamang",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Pul summalarini float o'rniga integer (tiyin) bilan hisoblaydigan kichik `Money` value object yozing.",
      acceptanceCriteria: [
        "Float aniqlik muammosini misol bilan tushuntira oladi",
        "`const` va `define()` farqini biladi"
      ],
      prerequisites: [
        "1.1"
      ]
    },
    {
      id: "1.3",
      title: "Type Declarations",
      description: [
        "Type declaration — funksiya parametrlari, qaytish qiymati va property'lar uchun tip ko'rsatish. U xatolarni erta ushlaydi, IDE va statik tahlil (PHPStan) uchun asos bo'ladi.",
        "",
        "Qo'llab-quvvatlanadigan tiplar: skalyar, `array`, `callable`, `iterable`, `object`, `mixed`, class/interface nomlari, `self`, `static`, `void`, `never`, `null`, `false`, `true` (8.2+).",
        "",
        "```php",
        "final class OrderService",
        "{",
        "    public function __construct(private readonly OrderRepository $orders) {}",
        "",
        "    public function total(int $orderId): int",
        "    {",
        "        return $this->orders->find($orderId)->totalInTiyin();",
        "    }",
        "",
        "    public function fail(string $msg): never",
        "    {",
        "        throw new DomainException($msg);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud tipsiz service class'ga to'liq type declaration qo'shing va PHPStan level 6 dan o'tkazing.",
      acceptanceCriteria: [
        "`void`, `never`, `static` qaytish tiplarining farqini biladi",
        "Typed property'ning uninitialized holatini tushuntira oladi"
      ],
      prerequisites: [
        "1.2"
      ]
    },
    {
      id: "1.4",
      title: "Type Juggling va Type Coercion",
      description: [
        "PHP kontekstga qarab qiymat tipini avtomatik o'zgartiradi (juggling). Bu qulay, lekin xatolar manbai: `\"10\" == \"1e1\"` — `true`, `0 == \"abc\"` PHP 8 dan beri `false` (oldin `true` edi).",
        "",
        "Coercive rejimda (`strict_types` yo'q) `int` parametrga `\"5\"` berilsa, u `5` ga aylanadi. Taqqoslashda doimo `===` ishlating; `in_array()` va `array_search()` uchun uchinchi parametr `true` bering.",
        "",
        "```php",
        "in_array('1e1', ['10']);        // true — xavfli",
        "in_array('1e1', ['10'], true);  // false",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Loyihadagi `==` va strict bo'lmagan `in_array` chaqiruvlarini topib, xavflilarini tuzating.",
      acceptanceCriteria: [
        "PHP 8 dagi string-number taqqoslash o'zgarishini biladi",
        "Juggling sabab bo'lgan real bug misolini keltira oladi"
      ],
      prerequisites: [
        "1.2",
        "1.3"
      ]
    },
    {
      id: "1.5",
      title: "Strict Typing (`strict_types`)",
      description: [
        "`declare(strict_types=1);` fayl boshida yoziladi va o'sha fayldan qilingan **chaqiruvlar** uchun skalyar tiplarni qat'iy tekshiradi: `int` kutilgan joyga `\"5\"` berilsa `TypeError` otiladi. Yagona istisno — `int` qiymatni `float` parametrga berish.",
        "",
        "E'tibor bering: qoida chaqiruvchi faylga bog'liq, funksiya e'lon qilingan faylga emas. Shu sabab barcha fayllarda bir xil yoqish (PHP-CS-Fixer `declare_strict_types` qoidasi) tavsiya etiladi.",
        "",
        "```php",
        "<?php",
        "declare(strict_types=1);",
        "",
        "function add(int $a, int $b): int { return $a + $b; }",
        "add('1', 2); // TypeError",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Kichik modulga `strict_types` yoqing va chiqqan `TypeError`larni to'g'ri casting/validatsiya bilan tuzating.",
      acceptanceCriteria: [
        "strict_types qaysi faylga ta'sir qilishini aniq tushuntira oladi",
        "Request'dan kelgan string qiymatlarni xavfsiz cast qiladi"
      ],
      prerequisites: [
        "1.3",
        "1.4"
      ]
    },
    {
      id: "1.6",
      title: "Nullable, Union va Intersection Types",
      description: [
        "- **Nullable**: `?string` — `string|null` ning qisqartmasi.",
        "- **Union** (8.0): `int|string` — qiymat biror tipga mos bo'lishi kerak.",
        "- **Intersection** (8.1): `Countable&Iterator` — barcha interfeyslarni bajarishi kerak.",
        "- **DNF** (8.2): `(Countable&Iterator)|null`.",
        "",
        "Union tiplar ko'paysa, bu dizayn signalidir — ko'pincha alohida metodlar yoki interfeys yaxshiroq.",
        "",
        "```php",
        "function findUser(int|string $id): ?User { /* ... */ }",
        "function count_all((Countable&Traversable)|array $items): int { /* ... */ }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`mixed` ishlatilgan 3 ta metodni aniq union/nullable tiplarga o'tkazing.",
      acceptanceCriteria: [
        "Intersection type qachon kerakligini misol bilan tushuntira oladi",
        "`?T` va `T|null` ekvivalentligini biladi"
      ],
      prerequisites: [
        "1.3"
      ]
    },
    {
      id: "1.7",
      title: "Enums",
      description: [
        "PHP 8.1 enum'lari — cheklangan qiymatlar to'plami uchun birinchi darajali tip. **Pure enum** faqat case'lardan iborat, **backed enum** `string` yoki `int` qiymatga ega va DB/JSON bilan ishlash uchun qulay.",
        "",
        "Enum metod, interfeys va konstanta saqlashi mumkin. Laravel'da Eloquent cast (`'status' => OrderStatus::class`), validatsiya (`Rule::enum()`) va route binding bilan to'g'ridan-to'g'ri ishlaydi.",
        "",
        "```php",
        "enum OrderStatus: string",
        "{",
        "    case Pending = 'pending';",
        "    case Paid = 'paid';",
        "",
        "    public function label(): string",
        "    {",
        "        return match ($this) {",
        "            self::Pending => 'Kutilmoqda',",
        "            self::Paid    => \"To'langan\",",
        "        };",
        "    }",
        "}",
        "OrderStatus::from('paid');      // ValueError agar yo'q bo'lsa",
        "OrderStatus::tryFrom('x');      // null",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Modeldagi string status ustunini backed enum + Eloquent cast'ga o'tkazing.",
      acceptanceCriteria: [
        "`from()` va `tryFrom()` farqini biladi",
        "Enum'ni magic string'lar o'rniga ishlatish foydasini tushuntira oladi"
      ],
      prerequisites: [
        "1.3"
      ]
    },
    {
      id: "1.8",
      title: "Functions va Closures",
      description: [
        "Funksiyalar — qayta ishlatiladigan mantiq birligi: default qiymatlar, named arguments (8.0), variadic (`...$args`) va by-reference parametrlar. **Closure** — `Closure` obyekti bo'lgan anonim funksiya; tashqi o'zgaruvchilarni `use` orqali qamrab oladi (default holatda qiymat bo'yicha).",
        "",
        "Laravel'da closure'lar hamma joyda: route'lar, `Collection::map()`, query builder `where(fn ($q) => ...)`, container binding.",
        "",
        "```php",
        "$tax = 0.12;",
        "$withTax = function (int $price) use ($tax): int {",
        "    return (int) round($price * (1 + $tax));",
        "};",
        "$first = Closure::fromCallable('strtoupper'); // yoki strtoupper(...)",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Named arguments va variadic parametrdan foydalangan holda `formatMoney()` helper yozing.",
      acceptanceCriteria: [
        "`use ($x)` va `use (&$x)` farqini tushuntira oladi",
        "First-class callable syntax (`foo(...)`) ni biladi"
      ],
      prerequisites: [
        "1.1"
      ]
    },
    {
      id: "1.9",
      title: "Anonymous Functions va Arrow Functions",
      description: [
        "Arrow function (`fn`, PHP 7.4) — bitta ifodali qisqa closure. U tashqi scope'dagi o'zgaruvchilarni **avtomatik qiymat bo'yicha** qamrab oladi, `use` kerak emas, lekin tashqi o'zgaruvchini o'zgartira olmaydi.",
        "",
        "Anonymous function ko'p qatorli mantiq va by-reference qamrash kerak bo'lganda; arrow function — `map`, `filter`, `sortBy` kabi qisqa callback'lar uchun.",
        "",
        "```php",
        "$ids = collect($orders)",
        "    ->filter(fn (Order $o) => $o->isPaid())",
        "    ->map(fn (Order $o) => $o->id);",
        "",
        "$total = 0;",
        "array_walk($items, function ($i) use (&$total) { $total += $i->price; });",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bir xil vazifani `function () use` va `fn` bilan yozib, scope farqini test bilan ko'rsating.",
      acceptanceCriteria: [
        "Arrow function tashqi o'zgaruvchini o'zgartira olmasligini biladi",
        "`static fn` nima uchun kerakligini (bound `$this` yo'q) tushuntira oladi"
      ],
      prerequisites: [
        "1.8"
      ]
    },
    {
      id: "1.10",
      title: "Namespaces va Autoloading",
      description: [
        "Namespace — nomlar to'qnashuvining oldini oluvchi mantiqiy guruhlash (`App\\Services\\Billing`). `use` importi, alias (`as`) va funksiya/konstanta importi (`use function`) mavjud.",
        "",
        "**Autoloading** — class birinchi ishlatilganda faylni avtomatik yuklash. Composer PSR-4 standarti bo'yicha namespace prefiksini katalogga bog'laydi: `App\\` → `app/`. Production'da `composer dump-autoload -o` (classmap) tezroq ishlaydi.",
        "",
        "```json",
        "\"autoload\": {",
        "    \"psr-4\": { \"App\\\\\": \"app/\", \"Domain\\\\\": \"src/Domain/\" }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Yangi `Domain\\` namespace qo'shing, PSR-4 sozlang va `dump-autoload` bilan tekshiring.",
      acceptanceCriteria: [
        "PSR-4 da namespace → fayl yo'li qanday aniqlanishini tushuntira oladi",
        "Optimized classmap va authoritative autoloader farqini biladi"
      ],
      prerequisites: [
        "7.6"
      ]
    },
    {
      id: "1.11",
      title: "OOP",
      description: [
        "PHP'da OOP: class, object, property, method, constructor, visibility (`public`, `protected`, `private`), `readonly` property (8.1) va `readonly` class (8.2). Constructor property promotion kodni qisqartiradi.",
        "",
        "Senior uchun asosiy savol \"class yozish\" emas, balki **mas'uliyatni to'g'ri taqsimlash**: kichik, aniq vazifali class'lar, immutable value object'lar va aniq dependency'lar.",
        "",
        "```php",
        "final readonly class Email",
        "{",
        "    public function __construct(public string $value)",
        "    {",
        "        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {",
        "            throw new InvalidArgumentException('Email noto\\'g\\'ri');",
        "        }",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Massiv sifatida uzatilayotgan ma'lumotni (masalan, manzil) readonly value object'ga aylantiring.",
      acceptanceCriteria: [
        "Constructor promotion va readonly property'ni to'g'ri ishlatadi",
        "`final` class'ni qachon ishlatish kerakligini asoslay oladi"
      ],
      prerequisites: [
        "object-oriented-programming-oop"
      ]
    },
    {
      id: "1.12",
      title: "Traits, Interfaces va Abstract Classes",
      description: [
        "- **Interface** — shartnoma: faqat metod signaturalari va konstantalar. Bir class bir nechta interfeysni amalga oshira oladi.",
        "- **Abstract class** — umumiy holat va qisman implementatsiya; meros bitta.",
        "- **Trait** — gorizontal kod qayta ishlatish (copy-paste'ni compile vaqtida qo'shish). Konfliktlar `insteadof`/`as` bilan hal qilinadi.",
        "",
        "Qoida: tip sifatida interfeysga tayaning, umumiy kodni composition yoki trait bilan bering. Trait'da holat va yashirin bog'liqlik ko'payib ketsa, u \"yashirin meros\"ga aylanadi.",
        "",
        "```php",
        "interface PaymentGateway { public function charge(Money $amount): Receipt; }",
        "trait HasUuid { protected static function bootHasUuid(): void { /* ... */ } }",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ikki to'lov provayderi uchun umumiy interfeys va abstract base class yozing, farqlarini izohlang.",
      acceptanceCriteria: [
        "Interface, abstract class va trait'ni qachon tanlashni asoslay oladi",
        "Laravel'dagi `HasFactory`, `SoftDeletes` trait'lari qanday ishlashini tushuntira oladi"
      ],
      prerequisites: [
        "1.11"
      ]
    },
    {
      id: "1.13",
      title: "Inheritance va Polymorphism",
      description: [
        "**Inheritance** (`extends`) — bola class ota class'ning public/protected a'zolarini oladi va metodlarni override qilishi mumkin. **Polymorphism** — bir xil interfeys orqali turli implementatsiyalarni ishlatish: chaqiruvchi kod aniq class'ni bilmaydi.",
        "",
        "Chuqur meros zanjirlari mo'rt bo'ladi (fragile base class). Override'da Liskov qoidasini saqlang: parametr tiplari kengroq (contravariant), qaytish tipi torroq (covariant) bo'lishi mumkin. PHP 8.3 `#[\\Override]` atributi xato override'ni ushlaydi.",
        "",
        "```php",
        "foreach ($notifiers as $notifier) {   // SmsNotifier, EmailNotifier ...",
        "    $notifier->send($message);         // polymorphism",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "`if ($type === 'sms') ... elseif ...` zanjirini polymorphism bilan almashtiring.",
      acceptanceCriteria: [
        "Covariance/contravariance qoidalarini biladi",
        "Meros o'rniga composition qachon yaxshiroq ekanini tushuntira oladi"
      ],
      prerequisites: [
        "1.11",
        "4.3"
      ]
    },
    {
      id: "1.14",
      title: "Static Properties va Methods",
      description: [
        "Static a'zolar obyektga emas, class'ga tegishli. `self::` — e'lon qilingan class'ga, `static::` — **late static binding** orqali chaqirilgan class'ga ishora qiladi (Eloquent'dagi `User::query()` shunga asoslanadi).",
        "",
        "Static holat (static property) aslida global holat: testlarda izolyatsiyani buzadi va long-running jarayonlarda (Octane, queue worker) so'rovlar orasida \"oqib\" o'tadi. Static metodlar sof, holatsiz yordamchi funksiyalar va named constructor'lar uchun mos.",
        "",
        "```php",
        "final class Money",
        "{",
        "    public static function fromTiyin(int $v): static { return new static($v); }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Static cache ishlatgan class'ni Octane'da muammo tug'diradigan holatda ko'rsating va DI bilan tuzating.",
      acceptanceCriteria: [
        "`self` va `static` farqini misolda ko'rsata oladi",
        "Static holatning long-running worker'dagi xavfini biladi"
      ],
      prerequisites: [
        "1.11"
      ]
    },
    {
      id: "1.15",
      title: "Exceptions va Error Handling",
      description: [
        "PHP 7+ da `Throwable` ierarxiyasi: `Exception` (biznes/kutilgan xatolar) va `Error` (`TypeError`, `ValueError`, `DivisionByZeroError` — dasturchi xatolari). `try/catch/finally`, bir nechta tipni ushlash (`catch (A|B $e)`) va `previous` orqali zanjir.",
        "",
        "Yaxshi amaliyot: domen uchun maxsus exception class'lari, ularni to'g'ri qatlamda ushlash, kontekstni yo'qotmaslik (`throw new X(..., previous: $e)`) va hech qachon bo'sh `catch` qilmaslik.",
        "",
        "```php",
        "try {",
        "    $gateway->charge($amount);",
        "} catch (GatewayTimeout $e) {",
        "    throw new PaymentFailed('To\\'lov amalga oshmadi', previous: $e);",
        "} finally {",
        "    $lock->release();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Domen uchun exception ierarxiyasi yarating va Laravel handler'da ularni tegishli HTTP javobga map qiling.",
      acceptanceCriteria: [
        "`Exception` va `Error` farqini tushuntira oladi",
        "Exception'ni yutib yubormaslik va kontekstni saqlashni biladi"
      ],
      prerequisites: [
        "1.11"
      ]
    },
    {
      id: "1.16",
      title: "Attributes",
      description: [
        "Attributes (PHP 8.0) — kodga strukturalangan metadata qo'shish: `#[Route('/users')]`. Ular docblock annotatsiyalarining o'rnini bosadi va Reflection API orqali o'qiladi.",
        "",
        "O'rnatilgan atributlar: `#[\\Override]`, `#[\\SensitiveParameter]` (stack trace'da parolni yashiradi), `#[\\Deprecated]` (8.4), `#[\\ReturnTypeWillChange]`. Laravel 11+ da `#[ObservedBy]`, `#[ScopedBy]`, container uchun `#[Config]`, `#[Tag]` kabi atributlar bor.",
        "",
        "```php",
        "#[Attribute(Attribute::TARGET_METHOD)]",
        "final class RateLimited { public function __construct(public int $perMinute) {} }",
        "",
        "$attrs = (new ReflectionMethod($obj, 'handle'))->getAttributes(RateLimited::class);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "O'z atributingizni yarating va uni Reflection orqali o'qib, middleware'da ishlating.",
      acceptanceCriteria: [
        "Atribut faqat Reflection orqali o'qilganda \"ishlashini\" tushunadi",
        "`#[\\SensitiveParameter]` ning xavfsizlikdagi rolini biladi"
      ],
      prerequisites: [
        "1.18"
      ]
    },
    {
      id: "1.17",
      title: "Generators va Iterators",
      description: [
        "**Generator** (`yield`) — qiymatlarni bittadan, talab bo'yicha qaytaradigan funksiya. Butun natijani xotiraga yuklamasdan katta ma'lumot (CSV, million qatorli jadval) bilan ishlash imkonini beradi. `yield from` boshqa generator'ga delegatsiya qiladi.",
        "",
        "**Iterator**/`IteratorAggregate` — o'z kolleksiya class'ingizni `foreach` bilan ishlatish. Laravel'da `LazyCollection` va `Model::lazy()`/`cursor()` generator'larga asoslangan.",
        "",
        "```php",
        "function readCsv(string $path): Generator",
        "{",
        "    $h = fopen($path, 'r');",
        "    try {",
        "        while (($row = fgetcsv($h)) !== false) {",
        "            yield $row;",
        "        }",
        "    } finally {",
        "        fclose($h);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "1 GB CSV faylni 50 MB dan kam xotira bilan import qiling va xotira sarfini o'lchang.",
      acceptanceCriteria: [
        "Generator xotira tejashini `memory_get_peak_usage()` bilan isbotlay oladi",
        "`cursor()`, `lazy()` va `chunk()` farqini biladi"
      ],
      prerequisites: [
        "1.8"
      ]
    },
    {
      id: "1.18",
      title: "Reflection API",
      description: [
        "Reflection — runtime'da class, metod, property, parametr va atributlarni o'rganish va boshqarish API'si (`ReflectionClass`, `ReflectionMethod`, `ReflectionNamedType`).",
        "",
        "Laravel service container constructor parametrlarini Reflection orqali o'qib, dependency'larni avtomatik inject qiladi (autowiring). Route model binding, event discovery va validatsiya ham shunga tayanadi. Reflection nisbatan sekin — natijani keshlash odatiy amaliyot.",
        "",
        "```php",
        "$params = (new ReflectionClass(OrderService::class))",
        "    ->getConstructor()",
        "    ->getParameters();",
        "foreach ($params as $p) {",
        "    echo $p->getName(), ': ', $p->getType(), PHP_EOL;",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Constructor dependency'larini Reflection orqali avtomatik yaratadigan mini-container yozing.",
      acceptanceCriteria: [
        "Laravel container autowiring'ni Reflection darajasida tushuntira oladi",
        "Reflection'ni production hot-path'da keshlamay ishlatish narxini biladi"
      ],
      prerequisites: [
        "1.11",
        "2.6"
      ]
    },
    {
      id: "1.19",
      title: "Anonymous Classes",
      description: [
        "`new class(...) extends Base implements I { ... }` — nomsiz, bir martalik class. Testlarda interfeysning soxta implementatsiyasi, kichik adapterlar va Laravel migratsiyalarida (`return new class extends Migration`) ishlatiladi.",
        "",
        "Ular to'liq class imkoniyatlariga ega (constructor, property, trait), lekin qayta ishlatilmaydi va nomi yo'q — shuning uchun murakkab mantiq uchun oddiy class afzal.",
        "",
        "```php",
        "$clock = new class implements ClockInterface {",
        "    public function now(): DateTimeImmutable",
        "    {",
        "        return new DateTimeImmutable('2025-01-01 10:00');",
        "    }",
        "};",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Testda tashqi API client interfeysini anonymous class bilan stub qiling.",
      acceptanceCriteria: [
        "Laravel migratsiyalari nima uchun anonymous class qaytarishini (nom to'qnashuvi) biladi",
        "Anonymous class va mock kutubxonasi o'rtasida tanlay oladi"
      ],
      prerequisites: [
        "1.12"
      ]
    },
    {
      id: "1.20",
      title: "Magic Methods, Cloning va Serialization",
      description: [
        "Magic method'lar `__` bilan boshlanadi va maxsus runtime hodisalarida chaqiriladi: `__construct`, `__get`/`__set`/`__isset`/`__unset`, `__call`/`__callStatic`, `__toString`, `__invoke`, `__serialize`/`__unserialize`, `__clone`, `__destruct`.",
        "",
        "**Cloning (Shallow vs Deep)**: `$b = clone $a;` faqat *shallow copy* qiladi — agar obyekt ichida boshqa obyekt bo'lsa, ularning havolasi umumiy qoladi. Chuqur nusxa uchun `__clone()` ichida ichki obyektlarni ham `clone $this->nested` qilish shart.",
        "",
        "**Serialization**: Laravel Queue joblari va kesh obyektlari `serialize()` orqali satrga o'girilib bazaga saqlanadi. `__serialize()` va `__unserialize()` qaysi property'lar saqlanishini qat'iy nazorat qilish, maxfiy kalitlarni (password, connection) chiqarib tashlash va circular dependency xatolarining oldini olish uchun xizmat qiladi. API javoblari uchun esa `JsonSerializable` interfeysi ishlatiladi.",
        "",
        "```php",
        "final class Invoice implements JsonSerializable",
        "{",
        "    public function __construct(public Money $amount, private PDO $db) {}",
        "",
        "    public function __clone(): void",
        "    {",
        "        $this->amount = clone $this->amount; // deep clone",
        "    }",
        "",
        "    public function __serialize(): array",
        "    {",
        "        return ['amount' => $this->amount]; // PDO saqlanmaydi",
        "    }",
        "",
        "    public function jsonSerialize(): array",
        "    {",
        "        return ['amount' => $this->amount->formatted()];",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ichki bog'liq obyektlari bor class yarating: `__clone` orqali deep copy va `__serialize` orqali keraksiz resource'larni tashlab ketadigan to'liq mexanizm yozing.",
      acceptanceCriteria: [
        "Shallow copy va deep copy farqini, nima uchun oddiy `clone` ichki obyektni nusxalamasligini tushuntira oladi",
        "`__serialize` va `__unserialize` nima uchun Laravel Queue joblarida muhimligini biladi",
        "Eloquent'dagi `$user->name` va Facade'lar qanday magic method'lar orqali ishlashini tushuntira oladi"
      ],
      prerequisites: [
        "1.11"
      ]
    },
    {
      id: "1.21",
      title: "References",
      description: [
        "`&` — ikki o'zgaruvchi bir xil qiymatga ishora qiladi. Obyektlar PHP'da allaqachon \"handle\" orqali uzatiladi, shuning uchun reference asosan massivlar va skalyarlar uchun kerak bo'ladi.",
        "",
        "Klassik tuzoq: `foreach ($arr as &$v)` dan keyin `unset($v)` qilinmasa, keyingi tsikl oxirgi elementni buzadi. Ko'p hollarda reference o'rniga yangi qiymat qaytarish toza va xavfsizroq. PHP copy-on-write ishlatadi — massiv nusxasi faqat o'zgartirilganda yaratiladi, shuning uchun \"tezlik uchun reference\" odatda keraksiz.",
        "",
        "```php",
        "foreach ($items as &$item) { $item['price'] *= 2; }",
        "unset($item); // shart!",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Reference ishlatilgan funksiyani immutable uslubga (qiymat qaytaradigan) qayta yozing.",
      acceptanceCriteria: [
        "foreach-by-reference tuzog'ini tushuntira oladi",
        "Copy-on-write'ni biladi va reference'ni \"optimallashtirish\" deb ishlatmaydi"
      ],
      prerequisites: [
        "1.2"
      ]
    },
    {
      id: "1.22",
      title: "Memory Management, Streams va Weak References",
      description: [
        "PHP qiymatlarni `zval` strukturasida saqlaydi va **reference counting** bilan boshqaradi: hisob 0 ga tushganda xotira darhol bo'shaydi. So'rov tugagach butun xotira tozalanadi — shuning uchun klassik PHP-FPM'da leak kam seziladi.",
        "",
        "**Streams & I/O**: Katta fayllar (1GB+ CSV, video eksport) `file_get_contents()` orqali o'qilsa, OOM (Out Of Memory) xatosi yuz beradi. Buning o'rniga PHP **Streams** (`fopen()`, `stream_copy_to_stream()`, `php://temp`, `php://memory`) ishlatiladi. `php://temp` ma'lumot 2MB dan oshgunga qadar RAM'da, oshgach avtomatik diskdagi vaqtinchalik faylda saqlaydi — xotira sarfi doim O(1) bo'lib qoladi.",
        "",
        "**Weak References & WeakMap (PHP 8.0+)**: Obyektlarga kesh yoki metama'lumot bog'laganda refcount oshirmaslik uchun xizmat qiladi. Obyekt o'chirilganda `WeakMap` ichidagi bog'langan ma'lumot ham avtomatik xotiradan tozalanadi — bu Laravel Octane va uzoq yashovchi daemon worker'larda memory leak'ning oldini oluvchi eng muhim vositadir.",
        "",
        "```php",
        "// Streams orqali gigabaytlab faylni xotiraga og'irlik solmay ko'chirish",
        "$src = fopen('https://example.com/huge.csv', 'rb');",
        "$dest = fopen('php://temp/maxmemory:2097152', 'w+b'); // 2MB gacha RAM, keyin disk",
        "stream_copy_to_stream($src, $dest);",
        "",
        "// WeakMap orqali leak'siz kesh",
        "$cache = new WeakMap();",
        "$cache[$user] = ['computed_hash' => 'xyz'];",
        "// unset($user) bo'lganda $cache dagi yozuv ham xotiradan to'liq o'chadi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "100MB+ faylni xotira limitini oshirmasdan (`ini_set('memory_limit', '16M')`) Streams va Generatorlar yordamida qayta ishlab chiquvchi artisan buyruq yozing.",
      acceptanceCriteria: [
        "Streams (`php://temp`) va `file_get_contents` o'rtasidagi xotira sarfi farqini amalda ko'rsata oladi",
        "`WeakMap` nima ekanini va long-running jarayonlarda memory leak'ni qanday bartaraf etishini tushuntira oladi",
        "Refcount, peak memory va worker'larni `--max-jobs`/`--memory` bilan boshqarishni biladi"
      ],
      prerequisites: [
        "1.17"
      ]
    },
    {
      id: "1.23",
      title: "Garbage Collection",
      description: [
        "Reference counting **sikllik havolalarni** (A → B → A) tozalay olmaydi. Buning uchun PHP'da cycle collector bor: \"root buffer\" 10 000 ta potensial root'ga yetganda ishga tushadi va yetib bo'lmaydigan sikllarni topadi.",
        "",
        "`gc_collect_cycles()` majburiy tozalaydi, `gc_status()` statistikani beradi. Ko'p obyekt yaratadigan batch jarayonlarda GC pauzalari sezilarli bo'lishi mumkin; ba'zan GC'ni vaqtincha o'chirish (`gc_disable()`) va qo'lda chaqirish tezlikni oshiradi — lekin faqat o'lchovdan keyin.",
        "",
        "```php",
        "$before = gc_status()['collected'];",
        "gc_collect_cycles();",
        "echo gc_status()['collected'] - $before, \" ta sikl tozalandi\\n\";",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Sikllik havolali obyektlar yaratib, `gc_status()` bilan GC xatti-harakatini kuzating.",
      acceptanceCriteria: [
        "Refcount va cycle collector farqini tushuntira oladi",
        "GC sozlamalarini faqat profiling natijasiga ko'ra o'zgartiradi"
      ],
      prerequisites: [
        "1.22"
      ]
    },
    {
      id: "1.24",
      title: "PHP Configuration (`php.ini`)",
      description: [
        "`php.ini` PHP xatti-harakatini boshqaradi; CLI va FPM uchun odatda alohida fayllar bo'ladi (`php --ini` bilan tekshiriladi). Muhim direktivalar: `memory_limit`, `max_execution_time`, `upload_max_filesize`, `post_max_size`, `display_errors` (production'da `Off`), `log_errors`, `error_reporting`, `date.timezone`, `expose_php = Off`, `opcache.*`.",
        "",
        "Production sozlamalari: xatolarni ekranga chiqarmaslik, faqat log'ga yozish, keraksiz funksiyalarni `disable_functions` bilan o'chirish. FPM pool darajasida `php_admin_value` orqali qayta yozish mumkin.",
        "",
        "```ini",
        "display_errors = Off",
        "log_errors = On",
        "memory_limit = 256M",
        "upload_max_filesize = 20M",
        "post_max_size = 25M",
        "expose_php = Off",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Dev va production uchun alohida php.ini sozlamalarini tayyorlang va farqlarini hujjatlashtiring.",
      acceptanceCriteria: [
        "CLI va FPM turli ini fayldan foydalanishini biladi",
        "`post_max_size` va `upload_max_filesize` bog'liqligini tushuntira oladi"
      ],
      prerequisites: [
        "1.1"
      ]
    },
    {
      id: "1.25",
      title: "PHP-FPM, OPcache, Preloading va JIT",
      description: [
        "**PHP-FPM** — FastCGI process manager: Nginx so'rovni FPM'ga uzatadi, FPM esa worker jarayonlar pulidan biriga beradi. Har bir worker bir vaqtda bitta so'rovni bajaradi — shuning uchun `pm.max_children` parallellikning yuqori chegarasi bo'lib, formula orqali hisoblanadi: `(Bo'sh RAM) / (Bitta worker xotirasi, masalan 40-70MB)`.",
        "",
        "**OPcache & Preloading**: OPcache kompilyatsiya qilingan opcode'larni shared memory'da saqlaydi. `opcache.preload` orqali esa server start bo'lganda Laravel framework classlari bir marta xotiraga yuklanadi va keyingi so'rovlarda ularni fayldan izlash va yuklash umuman talab qilinmaydi.",
        "",
        "**JIT (Just-In-Time)**: PHP 8 da kiritilgan JIT opcode'larni CPU mashina kodiga (machine code) aylantiradi. CPU-bound (matematik hisob-kitoblar, ML, ma'lumotlar qayta ishlash) vazifalarda katta tezlik beradi; I/O-bound web so'rovlarda esa OPcache bilan birgalikda barqaror latency ta'minlaydi (`opcache.jit=tracing`).",
        "",
        "```ini",
        "; Production OPcache va Preloading",
        "opcache.enable=1",
        "opcache.memory_consumption=256",
        "opcache.max_accelerated_files=20000",
        "opcache.validate_timestamps=0",
        "opcache.preload=/var/www/app/preload.php",
        "opcache.preload_user=www-data",
        "",
        "; JIT konfiguratsiyasi",
        "opcache.jit_buffer_size=100M",
        "opcache.jit=tracing",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM `pm.max_children` parametrini serveringiz RAM hajmiga qarab hisoblab chiqing va `opcache.preload` orqali Laravel framework classlarini preloading qiling.",
      acceptanceCriteria: [
        "FPM worker modeli (`static`, `dynamic`, `ondemand`) parallellikni qanday cheklashini tushuntira oladi",
        "`opcache.validate_timestamps=0` va `preload` bilan deploy jarayonini (FPM reload) to'g'ri tashkil qiladi",
        "JIT (tracing) ning an'anaviy OPcache'dan farqi va qachon foyda berishini biladi"
      ],
      prerequisites: [
        "42.1",
        "1.24"
      ]
    },
    {
      id: "1.26",
      title: "PHP 8.x imkoniyatlari, Fibers va PHP 8.4",
      description: [
        "PHP 8.x seriyasi tilni zamonaviy, qat'iy tiplangan va yuqori unumdor darajaga olib chiqdi: **8.0** (attributes, match, constructor promotion, JIT), **8.1** (enums, readonly, first-class callable, fibers), **8.2** (readonly classes, DNF types), **8.3** (typed class constants, json_validate).",
        "",
        "**PHP 8.4 Yangiliklari**:",
        "- **Property Hooks**: getter va setter'lar uchun class ichida qisqa, toza sintaksis (`get => ...`, `set => ...`).",
        "- **Asymmetric Visibility**: property'ni o'qish uchun `public`, o'zgartirish uchun faqat class ichidan `private(set)` ruxsatini berish — ortiqcha getter yozish zaruratini yo'qotadi.",
        "- **Qavssiz zanjir chaqiruvi**: `new UserService()->handle();` (oldingi versiyalardagi `(new UserService())->handle()` qavsisiz).",
        "- Yangi array funksiyalari: `array_find()`, `array_find_key()`, `array_any()`, `array_all()`.",
        "",
        "**Fibers (Asinxron PHP)**: `Fiber` — to'xtatilishi va qayta davom ettirilishi mumkin bo'lgan yengil vaznli korutin (coroutine). Laravel Octane, Revolt va Amp kabi asinxron frameworklar Fibers yordamida non-blocking I/O amallarini an'anaviy sinxron kod ko'rinishida yozish imkonini beradi.",
        "",
        "```php",
        "// PHP 8.4: Property Hooks va Asymmetric Visibility",
        "final class UserProfile",
        "{",
        "    public private(set) string $slug; // faqat o'qish ochiq, o'zgartirish private",
        "",
        "    public string $name {",
        "        set {",
        "            $this->name = trim($value);",
        "            $this->slug = strtolower(str_replace(' ', '-', $this->name));",
        "        }",
        "    }",
        "}",
        "",
        "// PHP 8.1+ Fibers korutini",
        "$fiber = new Fiber(function (): void {",
        "    echo \"Boshlanish\\n\";",
        "    Fiber::suspend('kutilmoqda'); // to'xtatib turish",
        "    echo \"Yakun\\n\";",
        "});",
        "$status = $fiber->start();",
        "$fiber->resume();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "PHP 8.4 Property Hooks va Asymmetric Visibility yordamida DTO yozing; kichik `Fiber` orqali asinxron simulyatsiyani sinab ko'ring.",
      acceptanceCriteria: [
        "PHP 8.4 Property Hooks va Asymmetric Visibility (`public private(set)`) ning getter/setter o'rnini qanday bosishini tushuntira oladi",
        "`Fiber`larning an'anaviy thread'lardan farqi va asinxron PHP (Revolt/Octane) dagi o'rnini biladi",
        "Rector va deprecation monitoring orqali versiyalararo xavfsiz upgrade rejasini tuza oladi"
      ],
      prerequisites: [
        "1.3",
        "7.16"
      ]
    }
  ]
});
