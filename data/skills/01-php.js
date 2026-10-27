/* 01 · PHP
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  "id": 1,
  "slug": "php",
  "title": "PHP",
  "group": "php-laravel",
  "description": "PHP — Laravel poydevori. Senior darajada tilni faqat \"yozish\" emas, balki **tiplar tizimi**, xotira modeli (zval, refcount, GC), xatolarni boshqarish, xavfsizlik va runtime (PHP-FPM, OPcache, Octane) xatti-harakatini chuqur tushunish talab qilinadi. Framework'dagi ko'p \"sehr\" aslida Reflection, magic method va closure imkoniyatlariga tayanadi. Bo'lim PHP 8.5 gacha yangilangan.",
  "subskills": [
    {
      "id": "1.42",
      "title": "PHP nima (Home)",
      "description": [
        "PHP — server tomonida ishlaydigan, ochiq manbali skript tili: brauzer so'raydi, server kodni bajaradi va tayyor HTML/JSON qaytaradi. 1994 yilda Rasmus Lerdorf yaratgan, nomi **PHP: Hypertext Preprocessor**."
      ],
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "PHP'ning so'rov-javob modelini o'z so'zingiz bilan chizma ko'rinishida tushuntiring va `index.php` yarating.",
      "acceptanceCriteria": [
        "PHP server tomonida ishlashini tushuntira oladi",
        "PHP qayerlarda ishlatilishini sanay oladi",
        "So'rov qanday yurishini (brauzer, server, PHP, javob) aytib bera oladi"
      ],
      "prerequisites": []
    },
    {
      "id": "1.43",
      "title": "PHP Intro: nimalar qila oladi",
      "description": [
        "PHP dinamik sahifa yaratadi, fayllar, forma, cookie, sessiya va ma'lumotlar bazasi bilan ishlaydi, kirishni nazorat qiladi, HTML/JSON chiqaradi va CLI'da ham ishlaydi."
      ],
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "Forma qabul qilib, natijani faylga yozadigan va JSON qaytaradigan 3 ta kichik skript yozing.",
      "acceptanceCriteria": [
        "PHP imkoniyatlarini sanay oladi",
        "Forma, fayl va JSON bilan oddiy skript yoza oladi",
        "Web va CLI rejimlarini farqlay oladi"
      ],
      "prerequisites": [
        "1.42"
      ]
    },
    {
      "id": "1.44",
      "title": "PHP Install: o'rnatish va muhit",
      "description": [
        "PHP'ni XAMPP/Laragon/Herd, Linux paketi yoki Docker orqali o'rnatish; `php -v`, `php --ini`, `php -S` dev-server va Composer."
      ],
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "Docker yoki lokal PHP bilan `php -S` serverini ishga tushiring va `phpinfo()` sahifasini oching.",
      "acceptanceCriteria": [
        "PHP versiyasi va kengaytmalarini tekshira oladi",
        "Dev-server ishga tushira oladi",
        "php.ini joyini topa oladi"
      ],
      "prerequisites": [
        "1.42"
      ]
    },
    {
      "id": "1.45",
      "title": "PHP Syntax",
      "description": [
        "PHP skripti `<?php` bilan boshlanadi, ifodalar `;` bilan tugaydi; o'zgaruvchilar harfga sezgir, kalit so'z va funksiya nomlari esa sezgir emas."
      ],
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "HTML ichiga PHP bloklarini joylashtirib, ro'yxatni `foreach` bilan chiqaradigan sahifa yozing.",
      "acceptanceCriteria": [
        "PHP teglari va `;` qoidasini biladi",
        "Case sensitivity qoidalarini biladi",
        "Parse xatosini qator raqami bo'yicha topa oladi"
      ],
      "prerequisites": [
        "1.44"
      ]
    },
    {
      "id": "1.46",
      "title": "PHP Comments",
      "description": [
        "Bir qatorli izohlar `//` va `#`, ularning ahamiyati va yaxshi izoh yozish qoidalari; `#[` — attribute, izoh emas."
      ],
      "priority": "important",
      "level": "Foundation",
      "practicalTask": "Berilgan koddagi foydasiz izohlarni 'nima uchun' izohlariga almashtiring.",
      "acceptanceCriteria": [
        "Izoh turlarini biladi",
        "`#[` va `#` farqini biladi",
        "Yaxshi izoh qoidalarini qo'llay oladi"
      ],
      "prerequisites": [
        "1.45"
      ]
    },
    {
      "id": "1.47",
      "title": "PHP Multiline Comments",
      "description": [
        "Ko'p qatorli `/* */` izohlar, ichma-ich izoh yo'qligi va hujjat izohlari (`/** */` docblock) bilan `@param`/`@return`."
      ],
      "priority": "important",
      "level": "Foundation",
      "practicalTask": "Funksiyaga to'liq docblock yozing va PHPStan bilan tekshiring.",
      "acceptanceCriteria": [
        "`/* */` cheklovini biladi",
        "DocBlock teglarini ishlata oladi",
        "Docblock va tip e'loni o'rtasidagi farqni biladi"
      ],
      "prerequisites": [
        "1.46"
      ]
    },
    {
      "id": "1.1",
      "title": "Syntax va language fundamentals",
      "description": [
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
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "`match`, null-safe operator va heredoc ishlatilgan, CLI argumentlarini o'qib natija chiqaradigan skript yozing.",
      "acceptanceCriteria": [
        "`switch` o'rniga `match` qayerda xavfsizroq ekanini tushuntira oladi",
        "`==` va `===` farqini misol bilan ko'rsata oladi"
      ],
      "prerequisites": []
    },
    {
      "id": "1.2",
      "title": "Variables, Constants va Data Types",
      "description": [
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
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "Pul summalarini float o'rniga integer (tiyin) bilan hisoblaydigan kichik `Money` value object yozing.",
      "acceptanceCriteria": [
        "Float aniqlik muammosini misol bilan tushuntira oladi",
        "`const` va `define()` farqini biladi"
      ],
      "prerequisites": [
        "1.1"
      ]
    },
    {
      "id": "1.27",
      "title": "Strings, Unicode va mbstring",
      "description": [
        "PHP'da string — **baytlar ketma-ketligi**, belgilar emas. `strlen()` bayt sanaydi: UTF-8 da `oʻ` yoki `gʻ` kabi belgilar bir necha bayt egallaydi, shuning uchun o'zbek lotin matni bilan `strlen`, `substr`, `strtoupper` noto'g'ri ishlaydi. Unicode uchun `mb_*` funksiyalar (mbstring kengaytmasi) ishlatiladi: `mb_strlen`, `mb_substr`, `mb_strtoupper`; 8.4 da `mb_trim`, `mb_ucfirst` qo'shildi.",
        "",
        "Qulay vositalar: `str_contains/str_starts_with/str_ends_with` (8.0), `sprintf`, heredoc/nowdoc, `Stringable` interfeysi. Foydalanuvchi matnini HTML ga chiqarishda doim `htmlspecialchars($s, ENT_QUOTES, 'UTF-8')` ishlating.",
        "",
        "```php",
        "$s = 'Oʻzbekiston';",
        "var_dump(strlen($s));     // int(13): bayt",
        "var_dump(mb_strlen($s));  // int(11): belgi",
        "echo mb_strtoupper($s);   // OʻZBEKISTON",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "O'zbek lotin matni (`oʻ`, `gʻ`) uchun slug yaratuvchi va matnni belgilar bo'yicha qisqartiruvchi funksiya yozing; `strlen` va `mb_strlen` farqini testda ko'rsating.",
      "acceptanceCriteria": [
        "Bayt va belgi farqini misol bilan ko'rsata oladi",
        "Foydalanuvchi matnini HTML ga xavfsiz chiqaradi (`htmlspecialchars`, UTF-8)",
        "`mb_*` funksiyalarni qachon ishlatish kerakligini biladi"
      ],
      "prerequisites": [
        "1.2"
      ]
    },
    {
      "id": "1.28",
      "title": "Arrays va array funksiyalari",
      "description": [
        "PHP massivi — tartiblangan **hash-map**: bitta tuzilma ham list, ham dictionary bo'lib xizmat qiladi. Kundalik ishda funksional uslub keng qo'llanadi: `array_map`, `array_filter`, `array_reduce`, `array_column`, `array_combine`; spread (`...$arr`) va destructuring (`['id' => $id] = $row`). `usort` 8.0 dan boshlab **barqaror** (teng elementlar tartibi saqlanadi).",
        "",
        "Yangi yordamchilar: `array_is_list()` (8.1), `array_find/array_find_key/array_any/array_all` (8.4), `array_first/array_last` (8.5).",
        "",
        "Samaradorlik: `in_array()` O(n); ko'p qidirishda kalitga aylantiring va `isset($map[$k])` (O(1)) ishlating.",
        "",
        "```php",
        "$ids = [3, 7, 9];",
        "$allowed = array_flip($ids);          // [3 => 0, 7 => 1, 9 => 2]",
        "isset($allowed[7]);                   // true, O(1)",
        "",
        "$active = array_filter($users, fn($u) => $u['active']);",
        "$emails = array_column($active, 'email', 'id');",
        "```"
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "1000 ta foydalanuvchi va 100 000 ta ruxsat etilgan ID bilan ishlaydigan filterni `in_array` va `array_flip` + `isset` bilan yozib, vaqtini solishtiring.",
      "acceptanceCriteria": [
        "`in_array` va `isset` murakkabligi farqini tushuntira oladi",
        "`array_map/filter/reduce` dan to'g'ri foydalanadi",
        "Massiv funksiyalarining 8.4/8.5 dagi yangilarini biladi"
      ],
      "prerequisites": [
        "1.2"
      ]
    },
    {
      "id": "1.29",
      "title": "Sonlar, Float aniqligi va BCMath",
      "description": [
        "`0.1 + 0.2 === 0.3` PHP'da `false`: float'lar IEEE 754 formatida ikkilik kasr sifatida saqlanadi va ko'p o'nlik kasrlar aniq ifodalanmaydi. Shuning uchun **pul uchun `float` ishlatilmaydi**: summa eng kichik birlikda (tiyin) `int` sifatida yoki aniq arifmetika (`BCMath`, `brick/money`) bilan saqlanadi.",
        "",
        "Boshqa tuzoqlar: `PHP_INT_MAX` dan oshganda integer jimgina `float` ga aylanadi; `intdiv()` va `%` ishorali sonlarda ehtiyotkorlik talab qiladi; `round()` yarim qiymatlarda (\"round half up\") 8.4 dagi `RoundingMode` enum orqali aniq boshqariladi.",
        "",
        "```php",
        "var_dump(0.1 + 0.2 == 0.3);                // false",
        "var_dump(abs((0.1 + 0.2) - 0.3) < PHP_FLOAT_EPSILON); // true",
        "",
        "$price = 1999;                              // tiyin, int",
        "echo bcadd('0.10', '0.20', 2);              // \"0.30\"",
        "var_dump(PHP_INT_MAX + 1);                  // float(9.2233720368547758E+18)",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Savatcha jami summasini hisoblaydigan `Money` value object yozing (tiyin `int`), chegirma va soliqni yaxlitlash qoidalarini testlar bilan tasdiqlang.",
      "acceptanceCriteria": [
        "Float aniq emasligining sababini tushuntira oladi",
        "Pul qiymatini xavfsiz saqlash usullarini (int, BCMath) biladi",
        "Integer overflow xatti-harakatini biladi"
      ],
      "prerequisites": [
        "1.2"
      ]
    },
    {
      "id": "1.3",
      "title": "Type Declarations",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Mavjud tipsiz service class'ga to'liq type declaration qo'shing va PHPStan level 6 dan o'tkazing.",
      "acceptanceCriteria": [
        "`void`, `never`, `static` qaytish tiplarining farqini biladi",
        "Typed property'ning uninitialized holatini tushuntira oladi"
      ],
      "prerequisites": [
        "1.2"
      ]
    },
    {
      "id": "1.4",
      "title": "Type Juggling va Type Coercion",
      "description": [
        "PHP kontekstga qarab qiymat tipini avtomatik o'zgartiradi (juggling). Bu qulay, lekin xatolar manbai: `\"10\" == \"1e1\"` — `true`, `0 == \"abc\"` PHP 8 dan beri `false` (oldin `true` edi).",
        "",
        "Coercive rejimda (`strict_types` yo'q) `int` parametrga `\"5\"` berilsa, u `5` ga aylanadi. Taqqoslashda doimo `===` ishlating; `in_array()` va `array_search()` uchun uchinchi parametr `true` bering.",
        "",
        "```php",
        "in_array('1e1', ['10']);        // true — xavfli",
        "in_array('1e1', ['10'], true);  // false",
        "```"
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Loyihadagi `==` va strict bo'lmagan `in_array` chaqiruvlarini topib, xavflilarini tuzating.",
      "acceptanceCriteria": [
        "PHP 8 dagi string-number taqqoslash o'zgarishini biladi",
        "Juggling sabab bo'lgan real bug misolini keltira oladi"
      ],
      "prerequisites": [
        "1.2",
        "1.3"
      ]
    },
    {
      "id": "1.5",
      "title": "Strict Typing (`strict_types`)",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Kichik modulga `strict_types` yoqing va chiqqan `TypeError`larni to'g'ri casting/validatsiya bilan tuzating.",
      "acceptanceCriteria": [
        "strict_types qaysi faylga ta'sir qilishini aniq tushuntira oladi",
        "Request'dan kelgan string qiymatlarni xavfsiz cast qiladi"
      ],
      "prerequisites": [
        "1.3",
        "1.4"
      ]
    },
    {
      "id": "1.6",
      "title": "Nullable, Union va Intersection Types",
      "description": [
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
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`mixed` ishlatilgan 3 ta metodni aniq union/nullable tiplarga o'tkazing.",
      "acceptanceCriteria": [
        "Intersection type qachon kerakligini misol bilan tushuntira oladi",
        "`?T` va `T|null` ekvivalentligini biladi"
      ],
      "prerequisites": [
        "1.3"
      ]
    },
    {
      "id": "1.7",
      "title": "Enums",
      "description": [
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
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Modeldagi string status ustunini backed enum + Eloquent cast'ga o'tkazing.",
      "acceptanceCriteria": [
        "`from()` va `tryFrom()` farqini biladi",
        "Enum'ni magic string'lar o'rniga ishlatish foydasini tushuntira oladi"
      ],
      "prerequisites": [
        "1.3"
      ]
    },
    {
      "id": "1.8",
      "title": "Functions va Closures",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Named arguments va variadic parametrdan foydalangan holda `formatMoney()` helper yozing.",
      "acceptanceCriteria": [
        "`use ($x)` va `use (&$x)` farqini tushuntira oladi",
        "First-class callable syntax (`foo(...)`) ni biladi"
      ],
      "prerequisites": [
        "1.1"
      ]
    },
    {
      "id": "1.9",
      "title": "Anonymous Functions va Arrow Functions",
      "description": [
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
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Bir xil vazifani `function () use` va `fn` bilan yozib, scope farqini test bilan ko'rsating.",
      "acceptanceCriteria": [
        "Arrow function tashqi o'zgaruvchini o'zgartira olmasligini biladi",
        "`static fn` nima uchun kerakligini (bound `$this` yo'q) tushuntira oladi"
      ],
      "prerequisites": [
        "1.8"
      ]
    },
    {
      "id": "1.32",
      "title": "Modern sintaksis: match, Named Arguments, Nullsafe va Spread",
      "description": [
        "PHP 8 sintaksisi kodni qisqartirdi va xavfsizroq qildi. **`match`** — ifoda: qiymat qaytaradi, **qat'iy (`===`)** solishtiradi, fallthrough yo'q va mos kelmasa `UnhandledMatchError` tashlaydi. **Named arguments** — default parametrlarni tashlab ketib, kerakligini nomi bilan berish (parametr nomlari endi kutubxona API'siga aylanadi, nomni o'zgartirish BC break). **Nullsafe `?->`** zanjirda `null` uchrasa to'xtaydi. **Spread** `...$args` massivni argumentga yoyadi (8.1 dan string kalitlar bilan ham).",
        "",
        "Yana: `throw` ifoda sifatida (`$x ?? throw new E()`), initializer'da `new` (8.1), oxirgi vergul.",
        "",
        "```php",
        "$label = match ($status) {",
        "    'paid', 'shipped' => 'Faol',",
        "    'new'             => 'Yangi',",
        "    default           => throw new DomainException(\"Noma'lum: $status\"),",
        "};",
        "",
        "$city = $order?->customer?->address?->city;",
        "",
        "createUser(name: 'Ali', active: true);   // email default qoladi",
        "```"
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Eski `switch` va `isset` zanjirlari bor funksiyani `match`, nullsafe va named arguments bilan qayta yozing; har bir o'zgarishning xatti-harakatdagi farqini izohlang.",
      "acceptanceCriteria": [
        "`match` va `switch` farqini (strict, expression, xato) aytib bera oladi",
        "Named arguments xavfini (parametr nomi API) biladi",
        "Nullsafe operatorining qisqa tutashuvini tushuntira oladi"
      ],
      "prerequisites": [
        "1.8"
      ]
    },
    {
      "id": "1.10",
      "title": "Namespaces va Autoloading",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Yangi `Domain\\` namespace qo'shing, PSR-4 sozlang va `dump-autoload` bilan tekshiring.",
      "acceptanceCriteria": [
        "PSR-4 da namespace → fayl yo'li qanday aniqlanishini tushuntira oladi",
        "Optimized classmap va authoritative autoloader farqini biladi"
      ],
      "prerequisites": [
        "7.6"
      ]
    },
    {
      "id": "1.48",
      "title": "PHP Date and Time",
      "description": [
        "`date()`, `time()`, `mktime()`, `strtotime()`, `checkdate()`, format harflari va timezone sozlash; `DateTime` ga kirish."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Kishining yoshini va keyingi tug'ilgan kunigacha qolgan kunlarni hisoblaydigan funksiya yozing.",
      "acceptanceCriteria": [
        "Format harflarini to'g'ri ishlata oladi",
        "Timezone sozlay oladi",
        "`strtotime` xatosini (`false`) tekshiradi"
      ],
      "prerequisites": [
        "1.45"
      ]
    },
    {
      "id": "1.49",
      "title": "PHP Include",
      "description": [
        "`include`, `require`, `_once` shakllari, `__DIR__` bilan yo'l, qiymat qaytaruvchi fayllar va LFI xavfi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Header/footer bo'laklari va `config.php` bilan oddiy shablon tuzing.",
      "acceptanceCriteria": [
        "include va require farqini biladi",
        "`__DIR__` bilan yo'l bera oladi",
        "LFI xavfini va oq ro'yxatni biladi"
      ],
      "prerequisites": [
        "1.45"
      ]
    },
    {
      "id": "1.50",
      "title": "PHP File Handling",
      "description": [
        "Fayl funksiyalari (`file_exists`, `filesize`, `readfile`, `unlink`), `fopen` rejimlari, ruxsatlar va path traversal xavfi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Berilgan papkadagi fayllar ro'yxatini xavfsiz ko'rsatadigan skript yozing.",
      "acceptanceCriteria": [
        "fopen rejimlarini biladi",
        "Ruxsat va path traversal xavfini biladi",
        "Fayl mavjudligini tekshirib ishlaydi"
      ],
      "prerequisites": [
        "1.49"
      ]
    },
    {
      "id": "1.51",
      "title": "PHP File Open/Read",
      "description": [
        "`fopen`, `fgets`, `fread`, `feof`, `file_get_contents`, `file()`, `fgetcsv`; katta faylni qator-qator o'qish."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "CSV fayldan foydalanuvchilarni o'qib, massivga yig'adigan skript yozing.",
      "acceptanceCriteria": [
        "Katta faylni stream bilan o'qiy oladi",
        "fclose'ni unutmaydi",
        "CSV'ni `fgetcsv` bilan o'qiy oladi"
      ],
      "prerequisites": [
        "1.50"
      ]
    },
    {
      "id": "1.52",
      "title": "PHP File Create/Write",
      "description": [
        "`fopen` `w/a/x/c` rejimlari, `fwrite`, `file_put_contents` (`FILE_APPEND`, `LOCK_EX`), atomik yozish va log yozish."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Qulf bilan ishlaydigan oddiy log yozuvchi funksiya tuzing.",
      "acceptanceCriteria": [
        "Rejimlar farqini biladi",
        "LOCK_EX ni ishlata oladi",
        "Atomik yozish g'oyasini tushuntira oladi"
      ],
      "prerequisites": [
        "1.51"
      ]
    },
    {
      "id": "1.53",
      "title": "PHP File Upload",
      "description": [
        "HTML forma `multipart/form-data`, `$_FILES`, `move_uploaded_file`, xato kodlari, hajm/MIME/kengaytma tekshiruvi va xavfsiz saqlash."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Rasm yuklash formasi yozing: hajm, MIME va noyob nom tekshiruvi bilan.",
      "acceptanceCriteria": [
        "`$_FILES` tuzilishini biladi",
        "Haqiqiy MIME (`finfo`) tekshira oladi",
        "Yuklash xavfsizligini biladi"
      ],
      "prerequisites": [
        "1.52",
        "1.49"
      ]
    },
    {
      "id": "1.54",
      "title": "PHP Cookies",
      "description": [
        "`setcookie` (expires, path, secure, httponly, samesite), `$_COOKIE`, cookie o'chirish va xavfsizlik qoidalari."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Til tanlovini cookie'da saqlaydigan kichik funksiya yozing.",
      "acceptanceCriteria": [
        "Cookie atributlarini biladi",
        "Cookie keyingi so'rovda ko'rinishini biladi",
        "Cookie'ga maxfiy ma'lumot yozmaydi"
      ],
      "prerequisites": [
        "1.45"
      ]
    },
    {
      "id": "1.55",
      "title": "PHP Sessions",
      "description": [
        "`session_start`, `$_SESSION`, sessiya ID cookie'si, `session_regenerate_id`, logout, xavfsizlik sozlamalari va qulflash."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Login/logout va himoyalangan sahifa bilan sessiya asosidagi oddiy autentifikatsiya yozing.",
      "acceptanceCriteria": [
        "Session va cookie farqini biladi",
        "Session fixation himoyasini qo'llaydi",
        "Logout'ni to'g'ri bajaradi"
      ],
      "prerequisites": [
        "1.54"
      ]
    },
    {
      "id": "1.56",
      "title": "PHP Filters",
      "description": [
        "`filter_var`, `filter_input`, `FILTER_VALIDATE_*` va `FILTER_SANITIZE_*`; validatsiya va sanitizatsiya farqi."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Email, yosh va URL ni filtrlar bilan tekshiradigan forma yozing.",
      "acceptanceCriteria": [
        "Validatsiya va sanitizatsiya farqini biladi",
        "`false` va `0` ni adashtirmaydi",
        "FILTER_SANITIZE_STRING eskirganini biladi"
      ],
      "prerequisites": [
        "1.45"
      ]
    },
    {
      "id": "1.57",
      "title": "PHP Filters Advanced",
      "description": [
        "Filter `options` va `flags`, `FILTER_CALLBACK`, `filter_var_array`, `filter_input_array`, IP oralig'i flaglari."
      ],
      "priority": "optional",
      "level": "Junior",
      "practicalTask": "Forma maydonlarini `filter_var_array` bilan bir chaqiruvda tekshiring.",
      "acceptanceCriteria": [
        "Options va flags'ni ishlata oladi",
        "filter_var_array'ni qo'llay oladi",
        "FILTER_FLAG_NO_PRIV_RANGE ni biladi"
      ],
      "prerequisites": [
        "1.56"
      ]
    },
    {
      "id": "1.58",
      "title": "PHP Callback Functions",
      "description": [
        "Callable turlari (satr, massiv, closure, first-class callable), `array_map/filter/usort`, `call_user_func`, `is_callable`."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "`callable` qabul qiluvchi o'z `transform()` funksiyangizni yozing va 4 turdagi callable bilan sinang.",
      "acceptanceCriteria": [
        "Callable turlarini sanay oladi",
        "Ichki funksiyalarda callback ishlata oladi",
        "`callable` tipini to'g'ri qo'llaydi"
      ],
      "prerequisites": [
        "1.8"
      ]
    },
    {
      "id": "1.59",
      "title": "PHP JSON",
      "description": [
        "`json_encode`, `json_decode`, bayroqlar (`JSON_PRETTY_PRINT`, `JSON_UNESCAPED_UNICODE`, `JSON_THROW_ON_ERROR`), `JsonSerializable` va API javobi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "JSON qabul qilib, JSON javob qaytaradigan oddiy endpoint yozing.",
      "acceptanceCriteria": [
        "Encode/decode'ni xatolar bilan ishlata oladi",
        "JsonSerializable'ni biladi",
        "JSON cheklovlarini (katta son, UTF-8) biladi"
      ],
      "prerequisites": [
        "1.28"
      ]
    },
    {
      "id": "1.60",
      "title": "PHP Exceptions",
      "description": [
        "`try/catch/finally`, `throw`, exception metodlari, o'z istisnolari, ko'p turni ushlash, `previous` va `set_exception_handler`."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Fayl import qiluvchi funksiyada o'z istisnolari bilan xatolarni boshqaring.",
      "acceptanceCriteria": [
        "try/catch/finally'ni to'g'ri ishlatadi",
        "O'z istisnolarini yaratadi",
        "Error va Exception farqini biladi"
      ],
      "prerequisites": [
        "1.45"
      ]
    },
    {
      "id": "1.11",
      "title": "OOP asoslari: Classes, Objects va Visibility",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Massiv sifatida uzatilayotgan ma'lumotni (masalan, manzil) readonly value object'ga aylantiring.",
      "acceptanceCriteria": [
        "Constructor promotion va readonly property'ni to'g'ri ishlatadi",
        "`final` class'ni qachon ishlatish kerakligini asoslay oladi"
      ],
      "prerequisites": [
        "1.8"
      ]
    },
    {
      "id": "1.14",
      "title": "Static Properties va Methods",
      "description": [
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
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Static cache ishlatgan class'ni Octane'da muammo tug'diradigan holatda ko'rsating va DI bilan tuzating.",
      "acceptanceCriteria": [
        "`self` va `static` farqini misolda ko'rsata oladi",
        "Static holatning long-running worker'dagi xavfini biladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.13",
      "title": "Inheritance va Polymorphism",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`if ($type === 'sms') ... elseif ...` zanjirini polymorphism bilan almashtiring.",
      "acceptanceCriteria": [
        "Covariance/contravariance qoidalarini biladi",
        "Meros o'rniga composition qachon yaxshiroq ekanini tushuntira oladi"
      ],
      "prerequisites": [
        "1.11",
        "4.3"
      ]
    },
    {
      "id": "1.12",
      "title": "Traits, Interfaces va Abstract Classes",
      "description": [
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
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Ikki to'lov provayderi uchun umumiy interfeys va abstract base class yozing, farqlarini izohlang.",
      "acceptanceCriteria": [
        "Interface, abstract class va trait'ni qachon tanlashni asoslay oladi",
        "Laravel'dagi `HasFactory`, `SoftDeletes` trait'lari qanday ishlashini tushuntira oladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.19",
      "title": "Anonymous Classes",
      "description": [
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
      "priority": "optional",
      "level": "Middle",
      "practicalTask": "Testda tashqi API client interfeysini anonymous class bilan stub qiling.",
      "acceptanceCriteria": [
        "Laravel migratsiyalari nima uchun anonymous class qaytarishini (nom to'qnashuvi) biladi",
        "Anonymous class va mock kutubxonasi o'rtasida tanlay oladi"
      ],
      "prerequisites": [
        "1.12"
      ]
    },
    {
      "id": "1.33",
      "title": "Readonly, Immutability va Value Objects",
      "description": [
        "`readonly` property (8.1) faqat **bir marta** va faqat o'z klassi doirasida qiymat oladi, tipli bo'lishi shart. `readonly class` (8.2) hamma property'ni readonly qiladi va dinamik property'ni taqiqlaydi. Muhim cheklov: readonly **sayoz (shallow)** immutability beradi: ichidagi obyekt yoki massiv elementini baribir o'zgartirish mumkin (massiv uchun to'g'ridan-to'g'ri emas, obyekt uchun ha).",
        "",
        "**Value Object:** qiymati bo'yicha taqqoslanadi, o'zgarmaydi, o'zgartirish `withX()` metodlari yangi nusxa qaytaradi. PHP 8.5 da `clone($obj, ['prop' => $v])` bu \"with-er\" patternni soddalashtirdi.",
        "",
        "```php",
        "final readonly class Money",
        "{",
        "    public function __construct(public int $amount, public string $currency) {}",
        "",
        "    public function add(self $o): self",
        "    {",
        "        return new self($this->amount + $o->amount, $this->currency);",
        "    }",
        "}",
        "",
        "$m = new Money(1000, 'UZS');",
        "$m->amount = 5;   // Error: Cannot modify readonly property",
        "```"
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Manzil, Email va Money uchun `final readonly class` value object'lar yozing; teng qiymatli obyektlarni taqqoslash testini qo'shing.",
      "acceptanceCriteria": [
        "Readonly ning sayoz (shallow) ekanini misol bilan ko'rsata oladi",
        "Value Object va DTO farqini tushuntira oladi",
        "`with`-er patternini biladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.34",
      "title": "Property Hooks va Asymmetric Visibility (PHP 8.4)",
      "description": [
        "**Property hooks** (8.4): property o'qilganda (`get`) va yozilganda (`set`) ishlaydigan mantiqni to'g'ridan-to'g'ri property'ga bog'laydi; alohida getter/setter metodlari kerak emas. Property **backed** (hook ichida `$this->prop` ga murojaat bor, qiymat saqlanadi) yoki **virtual** (saqlanmaydi, hisoblanadi) bo'ladi.",
        "",
        "**Asymmetric visibility**: o'qish va yozish ruxsati alohida: `public private(set) string $slug`. Hooks `readonly` bilan **mos kelmaydi**; cheklov kerak bo'lsa asymmetric visibility ishlating.",
        "",
        "```php",
        "final class User",
        "{",
        "    public private(set) string $slug;",
        "",
        "    public string $name {",
        "        set {",
        "            $this->name = trim($value);",
        "            $this->slug = strtolower(str_replace(' ', '-', $this->name));",
        "        }",
        "    }",
        "",
        "    public string $initials {          // virtual: xotira olmaydi",
        "        get => mb_strtoupper(mb_substr($this->name, 0, 1));",
        "    }",
        "}",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Eski getter/setter bilan yozilgan DTO'ni property hooks va asymmetric visibility ga o'tkazing; virtual property orqali hisoblanuvchi maydon qo'shing.",
      "acceptanceCriteria": [
        "Backed va virtual property farqini biladi",
        "`private(set)` va `readonly` o'rtasidagi farqni tushuntira oladi",
        "Hooks ning `var_dump`/`serialize` bilan o'zaro ta'sirini biladi"
      ],
      "prerequisites": [
        "1.11",
        "1.33"
      ]
    },
    {
      "id": "1.20",
      "title": "Magic Methods, Cloning va Serialization",
      "description": [
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
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Ichki bog'liq obyektlari bor class yarating: `__clone` orqali deep copy va `__serialize` orqali keraksiz resource'larni tashlab ketadigan to'liq mexanizm yozing.",
      "acceptanceCriteria": [
        "Shallow copy va deep copy farqini, nima uchun oddiy `clone` ichki obyektni nusxalamasligini tushuntira oladi",
        "`__serialize` va `__unserialize` nima uchun Laravel Queue joblarida muhimligini biladi",
        "Eloquent'dagi `$user->name` va Facade'lar qanday magic method'lar orqali ishlashini tushuntira oladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.15",
      "title": "Exceptions va Error Handling",
      "description": [
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
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Domen uchun exception ierarxiyasi yarating va Laravel handler'da ularni tegishli HTTP javobga map qiling.",
      "acceptanceCriteria": [
        "`Exception` va `Error` farqini tushuntira oladi",
        "Exception'ni yutib yubormaslik va kontekstni saqlashni biladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.17",
      "title": "Generators va Iterators",
      "description": [
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
      "priority": "important",
      "level": "Middle",
      "practicalTask": "1 GB CSV faylni 50 MB dan kam xotira bilan import qiling va xotira sarfini o'lchang.",
      "acceptanceCriteria": [
        "Generator xotira tejashini `memory_get_peak_usage()` bilan isbotlay oladi",
        "`cursor()`, `lazy()` va `chunk()` farqini biladi"
      ],
      "prerequisites": [
        "1.8"
      ]
    },
    {
      "id": "1.35",
      "title": "SPL: ma'lumot tuzilmalari va interfeyslar",
      "description": [
        "SPL (Standard PHP Library) — tilning standart ma'lumot tuzilmalari va interfeyslar to'plami. **Interfeyslar** obyektni til konstruksiyalariga ulaydi: `Countable` (`count($o)`), `ArrayAccess` (`$o['k']`), `IteratorAggregate`/`Iterator` (`foreach`), `Stringable`, `JsonSerializable`. **Tuzilmalar:** `SplStack`, `SplQueue`, `SplObjectStorage`, `SplMinHeap/SplMaxHeap`, `SplPriorityQueue`, `SplFixedArray` (massivdan kam xotira, faqat butun indeks).",
        "",
        "Laravel `Collection` aynan shu interfeyslarni (`ArrayAccess`, `IteratorAggregate`, `Countable`, `JsonSerializable`) amalga oshiradi. `WeakMap` (8.0) esa kalit obyekt o'chganda yozuvni avtomatik olib tashlaydi.",
        "",
        "```php",
        "final class Cart implements Countable, IteratorAggregate",
        "{",
        "    private array $items = [];",
        "",
        "    public function count(): int { return count($this->items); }",
        "",
        "    public function getIterator(): Generator { yield from $this->items; }",
        "}",
        "",
        "$q = new SplPriorityQueue();",
        "$q->insert('email', 1);",
        "$q->insert('payment', 10);",
        "echo $q->extract(); // payment",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`Countable`, `ArrayAccess` va `IteratorAggregate` ni amalga oshiruvchi oddiy Collection yozing va `SplPriorityQueue` bilan vazifalar navbatini quring.",
      "acceptanceCriteria": [
        "Asosiy SPL interfeyslarini va ularning til bilan bog'liqligini biladi",
        "`SplFixedArray` va oddiy massiv farqini tushuntira oladi",
        "`WeakMap` va `SplObjectStorage` farqini biladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.18",
      "title": "Reflection API",
      "description": [
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
      "priority": "optional",
      "level": "Senior",
      "practicalTask": "Constructor dependency'larini Reflection orqali avtomatik yaratadigan mini-container yozing.",
      "acceptanceCriteria": [
        "Laravel container autowiring'ni Reflection darajasida tushuntira oladi",
        "Reflection'ni production hot-path'da keshlamay ishlatish narxini biladi"
      ],
      "prerequisites": [
        "1.11",
        "2.6"
      ]
    },
    {
      "id": "1.16",
      "title": "Attributes",
      "description": [
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
      "priority": "important",
      "level": "Middle",
      "practicalTask": "O'z atributingizni yarating va uni Reflection orqali o'qib, middleware'da ishlating.",
      "acceptanceCriteria": [
        "Atribut faqat Reflection orqali o'qilganda \"ishlashini\" tushunadi",
        "`#[\\SensitiveParameter]` ning xavfsizlikdagi rolini biladi"
      ],
      "prerequisites": [
        "1.18"
      ]
    },
    {
      "id": "1.21",
      "title": "References",
      "description": [
        "`&` — ikki o'zgaruvchi bir xil qiymatga ishora qiladi. Obyektlar PHP'da allaqachon \"handle\" orqali uzatiladi, shuning uchun reference asosan massivlar va skalyarlar uchun kerak bo'ladi.",
        "",
        "Klassik tuzoq: `foreach ($arr as &$v)` dan keyin `unset($v)` qilinmasa, keyingi tsikl oxirgi elementni buzadi. Ko'p hollarda reference o'rniga yangi qiymat qaytarish toza va xavfsizroq. PHP copy-on-write ishlatadi — massiv nusxasi faqat o'zgartirilganda yaratiladi, shuning uchun \"tezlik uchun reference\" odatda keraksiz.",
        "",
        "```php",
        "foreach ($items as &$item) { $item['price'] *= 2; }",
        "unset($item); // shart!",
        "```"
      ],
      "priority": "optional",
      "level": "Middle",
      "practicalTask": "Reference ishlatilgan funksiyani immutable uslubga (qiymat qaytaradigan) qayta yozing.",
      "acceptanceCriteria": [
        "foreach-by-reference tuzog'ini tushuntira oladi",
        "Copy-on-write'ni biladi va reference'ni \"optimallashtirish\" deb ishlatmaydi"
      ],
      "prerequisites": [
        "1.2"
      ]
    },
    {
      "id": "1.30",
      "title": "Date va Time (DateTimeImmutable, timezone)",
      "description": [
        "Vaqt bilan ishlashda eng ko'p xato manbalari: timezone, o'zgaruvchan obyektlar va DST. Qoidalar: bazada va ichki mantiqda **UTC** saqlang, foydalanuvchiga ko'rsatishda lokal timezone ga o'giring; **`DateTimeImmutable`** ishlating (`DateTime` har `modify()` da obyektni o'zgartirib yuboradi va kutilmagan xatolar keltiradi).",
        "",
        "`strtotime('+1 month')` oy oxirida kutilmagan natija beradi (31 yanvar + 1 oy = mart boshi). `DateTimeImmutable::createFromFormat()` xato bo'lsa `false` qaytaradi, `getLastErrors()` ni tekshiring. Laravel'dagi `Carbon` `DateTime` ustiga qurilgan; testda `Carbon::setTestNow()` vaqtni muzlatadi.",
        "",
        "```php",
        "$utc = new DateTimeImmutable('2025-03-30 00:30', new DateTimeZone('UTC'));",
        "$local = $utc->setTimezone(new DateTimeZone('Asia/Tashkent'));",
        "",
        "$a = new DateTimeImmutable('2025-01-31');",
        "$b = $a->modify('+1 month');   // $a o'zgarmaydi",
        "echo $b->format('Y-m-d');      // 2025-03-03",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Hodisa boshlanish vaqtini UTC da saqlab, foydalanuvchi timezone'ida ko'rsatadigan va DST o'tish kunini to'g'ri hisoblaydigan servis yozing.",
      "acceptanceCriteria": [
        "`DateTime` va `DateTimeImmutable` farqini biladi",
        "UTC saqlash va lokal ko'rsatish qoidasini tushuntira oladi",
        "Oy oxiri va DST bilan bog'liq tuzoqlarni biladi"
      ],
      "prerequisites": [
        "1.11"
      ]
    },
    {
      "id": "1.31",
      "title": "Regular Expressions (PCRE)",
      "description": [
        "PHP regex uchun PCRE ishlatadi: `preg_match`, `preg_match_all`, `preg_replace`, `preg_replace_callback`, `preg_split`. Muhim detallar: Unicode matn uchun `u` flag, nomlangan guruhlar (`(?<year>\\d{4})`), greedy va lazy kvantifikatorlar, `preg_last_error()`.",
        "",
        "**Catastrophic backtracking (ReDoS):** `(a+)+$` kabi ichma-ich kvantifikatorli andoza noqulay kiritma bilan CPU ni bir necha soniya band qiladi; foydalanuvchi kiritmasiga qo'llanadigan murakkab regex xavfli. Oddiy vazifalar uchun regex shart emas: `str_contains`, `filter_var`, `explode` tezroq va o'qishli.",
        "",
        "```php",
        "if (preg_match('/^(?<y>\\d{4})-(?<m>\\d{2})$/', '2025-03', $m)) {",
        "    echo $m['y'], '/', $m['m'];",
        "}",
        "",
        "$slug = preg_replace('/[^\\p{L}\\p{N}]+/u', '-', 'Salom, Dunyo!');",
        "```"
      ],
      "priority": "optional",
      "level": "Middle",
      "practicalTask": "Foydalanuvchi kiritgan telefon raqamini normallashtiradigan regex yozing va ReDoS ga moyil andozani topib tuzating.",
      "acceptanceCriteria": [
        "`u` flag va Unicode xossalarini biladi",
        "Catastrophic backtracking nima ekanini tushuntira oladi",
        "Regex o'rniga oddiyroq funksiyani tanlay oladi"
      ],
      "prerequisites": [
        "1.27"
      ]
    },
    {
      "id": "1.37",
      "title": "Files, Streams va I/O",
      "description": [
        "Fayl bilan ishlashning asosiy qoidalari: katta fayl uchun `file_get_contents` emas, **stream** (`fopen`, `fgets`, `fgetcsv`, `SplFileObject`) ishlating; shunda xotira sarfi fayl hajmiga bog'liq bo'lmaydi. Maxsus oqimlar: `php://stdin`, `php://stdout`, `php://memory`, `php://temp`.",
        "",
        "Ishonchlilik: bir vaqtda yozish buzilishining oldini olish uchun `flock()` yoki **atomik yozish**: vaqtinchalik faylga yozib, `rename()` bilan almashtirish (bir fayl tizimida rename atomik). Xavfsizlik: foydalanuvchi bergan yo'lni `basename`/`realpath` bilan tekshiring (path traversal). Laravel'da `Storage` (Flysystem) shu farqlarni abstraksiyalaydi.",
        "",
        "```php",
        "$h = fopen('big.csv', 'rb');",
        "while (($row = fgetcsv($h)) !== false) {",
        "    process($row);               // xotira doim O(1)",
        "}",
        "fclose($h);",
        "",
        "$tmp = tempnam(dirname($path), 'cfg');",
        "file_put_contents($tmp, json_encode($config));",
        "rename($tmp, $path);             // atomik almashtirish",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Konfiguratsiya faylini ikki jarayon bir vaqtda yozganda buzilmaydigan qilib (atomik yozish) saqlovchi klass yozing va uni parallel testlar bilan sinang.",
      "acceptanceCriteria": [
        "Stream va `file_get_contents` xotira farqini biladi",
        "Atomik yozish usulini (`tmp` + `rename`) tushuntira oladi",
        "Path traversal xavfini biladi"
      ],
      "prerequisites": [
        "1.8"
      ]
    },
    {
      "id": "1.36",
      "title": "Zval, Refcount va Copy-on-Write",
      "description": [
        "PHP 7+ da har bir qiymat `zval` (16 bayt: qiymat + tip) sifatida saqlanadi; massiv, string va obyektlar esa **refcount** (nechta o'zgaruvchi ishora qilayotgani) bilan boshqariladigan alohida strukturalar. `$b = $a` massivni **nusxalamaydi**: ikkalasi bitta xotiraga ishora qiladi, nusxa faqat biri **o'zgartirilganda** olinadi (**Copy-on-Write**). Shuning uchun katta massivni funksiyaga qiymat bo'yicha uzatish arzon, yozish esa qimmat.",
        "",
        "Obyektlar boshqacha: o'zgaruvchi obyektning o'zini emas, **handle** (identifikator) ni saqlaydi, shu sabab obyekt funksiyaga uzatilganda ichidagi holat o'zgaradi (uni `&` reference bilan adashtirmang).",
        "",
        "```php",
        "$a = range(1, 1_000_000);",
        "$m1 = memory_get_usage();",
        "$b = $a;                       // nusxa yo'q",
        "echo memory_get_usage() - $m1; // ~0",
        "$b[] = 1;                      // shu yerda nusxa olinadi",
        "echo memory_get_usage() - $m1; // ~katta",
        "",
        "function touch(stdClass $o): void { $o->x = 1; }  // tashqarida ham ko'rinadi",
        "```"
      ],
      "priority": "important",
      "level": "Senior",
      "practicalTask": "`memory_get_usage()` bilan massivning Copy-on-Write xatti-harakatini va obyektning handle semantikasini ko'rsatuvchi kichik eksperiment yozing.",
      "acceptanceCriteria": [
        "Copy-on-Write qachon nusxa olishini tushuntira oladi",
        "Obyekt handle va `&` reference farqini biladi",
        "`memory_get_usage` bilan xotira o'lchay oladi"
      ],
      "prerequisites": [
        "1.21"
      ]
    },
    {
      "id": "1.22",
      "title": "Memory Management, Streams va WeakMap",
      "description": [
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
      "priority": "important",
      "level": "Senior",
      "practicalTask": "100MB+ faylni xotira limitini oshirmasdan (`ini_set('memory_limit', '16M')`) Streams va Generatorlar yordamida qayta ishlab chiquvchi artisan buyruq yozing.",
      "acceptanceCriteria": [
        "Streams (`php://temp`) va `file_get_contents` o'rtasidagi xotira sarfi farqini amalda ko'rsata oladi",
        "`WeakMap` nima ekanini va long-running jarayonlarda memory leak'ni qanday bartaraf etishini tushuntira oladi",
        "Refcount, peak memory va worker'larni `--max-jobs`/`--memory` bilan boshqarishni biladi"
      ],
      "prerequisites": [
        "1.17"
      ]
    },
    {
      "id": "1.23",
      "title": "Garbage Collection",
      "description": [
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
      "priority": "optional",
      "level": "Senior",
      "practicalTask": "Sikllik havolali obyektlar yaratib, `gc_status()` bilan GC xatti-harakatini kuzating.",
      "acceptanceCriteria": [
        "Refcount va cycle collector farqini tushuntira oladi",
        "GC sozlamalarini faqat profiling natijasiga ko'ra o'zgartiradi"
      ],
      "prerequisites": [
        "1.22"
      ]
    },
    {
      "id": "1.40",
      "title": "Fibers va PHP da concurrency",
      "description": [
        "`Fiber` (8.1) — to'xtatib (`Fiber::suspend()`) va qayta davom ettirish (`resume()`) mumkin bo'lgan **stackful** korutin: ichma-ich chaqiruvlarning istalgan joyida to'xtay oladi (generator esa faqat o'z funksiyasida `yield` qiladi). Fiber o'zi parallellik bermaydi: bitta oqim, kooperativ almashinuv. Uni **event loop** (Revolt, Amp, ReactPHP) bilan birga ishlatib, non-blocking I/O ni sinxron ko'rinishda yozish mumkin.",
        "",
        "Haqiqiy parallellik boshqa yo'llar bilan: **jarayonlar** (queue worker'lar, `pcntl_fork`, Symfony Process), Swoole/OpenSwoole, `ext-parallel`. Oddiy web so'rovda Fibers kam kerak; ular kutubxona va framework (Octane) ichida ishlaydi.",
        "",
        "```php",
        "$fiber = new Fiber(function (): string {",
        "    $x = Fiber::suspend('birinchi');",
        "    return \"olindi: $x\";",
        "});",
        "",
        "$v = $fiber->start();      // 'birinchi'",
        "$fiber->resume('salom');",
        "echo $fiber->getReturn();  // olindi: salom",
        "```"
      ],
      "priority": "optional",
      "level": "Senior",
      "practicalTask": "Ikkita taskni `Fiber` bilan navbatma-navbat bajaradigan oddiy scheduler yozing va uni Generator asosidagi yechim bilan solishtiring.",
      "acceptanceCriteria": [
        "Fiber va Generator farqini (stackful/stackless) biladi",
        "Fiber parallellik bermasligini tushuntira oladi",
        "PHP da haqiqiy parallellik usullarini sanay oladi"
      ],
      "prerequisites": [
        "1.17"
      ]
    },
    {
      "id": "1.24",
      "title": "PHP Configuration (`php.ini`)",
      "description": [
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
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Dev va production uchun alohida php.ini sozlamalarini tayyorlang va farqlarini hujjatlashtiring.",
      "acceptanceCriteria": [
        "CLI va FPM turli ini fayldan foydalanishini biladi",
        "`post_max_size` va `upload_max_filesize` bog'liqligini tushuntira oladi"
      ],
      "prerequisites": [
        "1.1"
      ]
    },
    {
      "id": "1.38",
      "title": "PHP runtime: SAPI, Request Lifecycle va Shared-Nothing",
      "description": [
        "PHP turli **SAPI** (Server API) orqali ishga tushadi: CLI, PHP-FPM, Apache moduli. Klassik modelda har bir HTTP so'rov uchun holat noldan quriladi va so'rov oxirida tozalanadi (**shared-nothing**): global o'zgaruvchilar, static'lar, ulanishlar so'rovdan so'rovga o'tmaydi. Bu xatolarni lokal qiladi va xotira sizishini yashiradi.",
        "",
        "**Uzoq yashovchi jarayonlar** (Laravel Octane/Swoole/RoadRunner, queue worker, `artisan` daemon) bu kafolatni **buzadi**: static property, singleton va keshlangan state so'rovlar orasida saqlanib qoladi: foydalanuvchi ma'lumotlari aralashishi va memory leak xavfi paydo bo'ladi.",
        "",
        "```php",
        "final class CurrentUser",
        "{",
        "    private static ?User $user = null;      // FPM da xavfsiz, Octane da xavfli!",
        "",
        "    public static function set(User $u): void { self::$user = $u; }",
        "}",
        "",
        "register_shutdown_function(fn () => flush_metrics());",
        "// fastcgi_finish_request(): javobni yuborib, davomini fonda bajarish (FPM)",
        "```"
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Static property'da state saqlaydigan kichik kodni Octane/Swoole'da ishga tushirib, so'rovlar orasida ma'lumot sizishini qayta yarating va tuzating.",
      "acceptanceCriteria": [
        "Shared-nothing modelini tushuntira oladi",
        "Octane/worker da static state xavfini biladi",
        "SAPI turlarini va farqini biladi"
      ],
      "prerequisites": [
        "1.24"
      ]
    },
    {
      "id": "1.25",
      "title": "PHP-FPM, OPcache, Preloading va JIT",
      "description": [
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
      "priority": "important",
      "level": "Middle",
      "practicalTask": "FPM `pm.max_children` parametrini serveringiz RAM hajmiga qarab hisoblab chiqing va `opcache.preload` orqali Laravel framework classlarini preloading qiling.",
      "acceptanceCriteria": [
        "FPM worker modeli (`static`, `dynamic`, `ondemand`) parallellikni qanday cheklashini tushuntira oladi",
        "`opcache.validate_timestamps=0` va `preload` bilan deploy jarayonini (FPM reload) to'g'ri tashkil qiladi",
        "JIT (tracing) ning an'anaviy OPcache'dan farqi va qachon foyda berishini biladi"
      ],
      "prerequisites": [
        "42.1",
        "1.24"
      ]
    },
    {
      "id": "1.39",
      "title": "PHP xavfsizlik asoslari",
      "description": [
        "Til darajasidagi xavfsizlik asoslari: parol uchun `password_hash()` (Argon2id yoki bcrypt) + `password_verify()` + `password_needs_rehash()`; **`md5/sha1` parol uchun yaroqsiz** (tez va tuzsiz). Kriptografik tasodifiylik uchun `random_bytes()`/`random_int()`; `rand()`/`mt_rand()` bashorat qilinadi. Sirlarni solishtirishda `hash_equals()` (timing-safe).",
        "",
        "Kiritma/chiqish: HTML ga `htmlspecialchars`, SQL ga faqat **prepared statements** (PDO), `filter_var` bilan validatsiya. **`unserialize()`** ni ishonchsiz ma'lumotga qo'llamang (object injection): JSON ishlating yoki `allowed_classes` bering. Foydalanuvchi bergan yo'lni `include/require` qilmang (LFI), `eval` dan qoching. `#[\\SensitiveParameter]` (8.2) stack trace da parolni yashiradi.",
        "",
        "```php",
        "$hash = password_hash($password, PASSWORD_ARGON2ID);",
        "if (password_verify($input, $hash) && !password_needs_rehash($hash, PASSWORD_ARGON2ID)) { /* ok */ }",
        "",
        "$token = bin2hex(random_bytes(32));",
        "hash_equals($expected, $given);",
        "$data = unserialize($raw, ['allowed_classes' => false]);",
        "```"
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Ro'yxatdan o'tish va parol tiklash oqimi uchun token generatsiya, parol xeshlash va timing-safe tekshiruvni xavfsiz amalga oshiring.",
      "acceptanceCriteria": [
        "Parol xeshlash va `md5` farqini tushuntira oladi",
        "`unserialize` xavfini biladi",
        "`random_int` va `mt_rand` farqini biladi"
      ],
      "prerequisites": [
        "1.3"
      ]
    },
    {
      "id": "1.26",
      "title": "PHP 8.0–8.3 imkoniyatlari",
      "description": [
        "**PHP 8.0** (2020): named arguments, attributes, constructor promotion, union types, `match`, nullsafe `?->`, JIT.",
        "**8.1**: enums, `readonly` property, first-class callable syntax (`strlen(...)`), `never` return type, pure intersection types, Fibers, `new` initializer'larda.",
        "**8.2**: `readonly class`, DNF types (`(A&B)|null`), standalone `null`/`false`/`true` tiplar, `#[\\SensitiveParameter]`, dynamic property deprecation.",
        "**8.3**: typed class constants, `#[\\Override]`, `json_validate()`, dynamic class constant fetch, `Randomizer::getBytesFromString`.",
        "",
        "Qo'llab-quvvatlash: faqat faol versiyalarda xavfsizlik tuzatishlari chiqadi (8.1 allaqachon EOL). Upgrade rejasi: PHPStan/Rector, `composer why-not php 8.x`, CI matritsasi. 8.4 va 8.5 yangiliklari alohida (1.41), Fibers alohida (1.40).",
        "",
        "```php",
        "enum Status: string { case Draft = 'draft'; case Live = 'live'; }",
        "",
        "final readonly class Post",
        "{",
        "    public function __construct(public string $title, public Status $status = Status::Draft) {}",
        "}",
        "",
        "$fn = strtoupper(...);                       // first-class callable (8.1)",
        "echo match ($post->status) { Status::Live => 'ok', default => 'kutilmoqda' };",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Eski PHP 7.4 uslubidagi klassni constructor promotion, enum, readonly va match bilan zamonaviylashtiring; Rector bilan avtomatik o'zgarishlarni solishtiring.",
      "acceptanceCriteria": [
        "8.0–8.3 ning har bir versiyasidan 2–3 ta xususiyatni sanay oladi",
        "Qaysi versiya hali qo'llab-quvvatlanishini biladi",
        "Rector/PHPStan bilan upgrade rejasini tuza oladi"
      ],
      "prerequisites": [
        "1.3",
        "7.16"
      ]
    },
    {
      "id": "1.41",
      "title": "PHP 8.4 va 8.5 yangiliklari",
      "description": [
        "**PHP 8.4** (2024-11): property hooks, asymmetric visibility, `new Foo()->bar()` (qavssiz), `array_find/array_find_key/array_any/array_all`, lazy objects (`ReflectionClass::newLazyProxy/newLazyGhost`), `#[\\Deprecated]`, HTML5 DOM (`Dom\\HTMLDocument`), `BcMath\\Number`, `mb_trim/mb_ucfirst`; **implicit nullable parametr (`Foo $x = null`) deprecated**.",
        "",
        "**PHP 8.5** (2025-11): pipe operatori `|>`, URI kengaytmasi, `clone($obj, [...])` (clone with), `#[\\NoDiscard]` va `(void)` cast, `array_first/array_last`, konstanta ifodalarda closure, persistent cURL share handles; backtick operatori, `__sleep/__wakeup` va `(boolean)` kabi cast nomlari deprecated.",
        "",
        "```php",
        "// 8.5: pipe va array_last",
        "$slug = ' PHP 8.5 '",
        "    |> trim(...)",
        "    |> strtolower(...)",
        "    |> (fn($s) => str_replace(' ', '-', $s));",
        "",
        "$last = array_last($events);",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Loyihangizni PHPStan va Rector bilan 8.4 deprecation'lariga tekshirib, implicit nullable parametrlarni to'g'rilang.",
      "acceptanceCriteria": [
        "8.4 va 8.5 ning asosiy xususiyatlarini sanay oladi",
        "Deprecation'larni (implicit nullable, backtick) biladi",
        "Qaysi versiya qachongacha qo'llab-quvvatlanishini biladi"
      ],
      "prerequisites": [
        "1.34",
        "1.33"
      ]
    }
  ]
});
