/* Chuqur dars: 1.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.8", {
  "lesson": [
    "### Funksiya asoslari",
    "`function name(Type $a, Type $b = default): Return`. Parametrlar: default qiymat, **variadic** (`...$args`), **named arguments** (8.0), **nullable** (`?T`). Default qiymatli parametr oxirida bo'lishi kerak (aks holda ular deprecated).",
    "",
    "### Scope",
    "Funksiya ichida global o'zgaruvchi ko'rinmaydi (`global $x` va `$GLOBALS` dan qoching). `static $n = 0;` — funksiya chaqiruvlari orasida saqlanadigan lokal qiymat. Uzoq yashovchi jarayonlarda bu holat qolib ketishi mumkin (1.38).",
    "",
    "### Uzatish usullari",
    "Odatda **qiymat bo'yicha** (CoW sabab arzon). Reference (`&$x`) tashqi o'zgaruvchini o'zgartiradi; ko'p holatda o'rniga qiymat qaytaring. Obyekt handle sifatida uzatiladi.",
    "",
    "### Return",
    "Bir nechta qiymat uchun massiv yoki obyekt qaytariladi; destructuring qulay: `[$a, $b] = f();`. `yield` bo'lsa funksiya generator bo'ladi (1.17).",
    "",
    "### Closure",
    "`function () use ($x) {...}` tashqi o'zgaruvchini **qiymat bo'yicha** oladi (`&$x` bilan reference). `$this` avtomatik bog'lanadi (metod ichida), `static function` esa bog'lamaydi. Closure — `Closure` klassi obyekti: `bind`, `call`, `fromCallable`.",
    "",
    "### First-class callable (8.1)",
    "`strlen(...)`, `$obj->method(...)`, `Foo::bar(...)` — callable'ni string/massiv o'rniga bevosita yaratadi, statik tahlilga ko'rinadi.",
    "",
    "### Rekursiya va chuqurlik",
    "PHP'da tail-call optimizatsiya yo'q. Chuqur rekursiya xotirani to'ldiradi; tsikl yoki stack bilan almashtiring.",
    "",
    "### Yaxshi amaliyot",
    "Funksiya bitta ish qilsin, 3–4 dan ko'p parametr bo'lsa obyekt (DTO) yoki named args ishlating, side-effect'larni nomda ko'rsating.",
    "",
    "### Funksiya e'lonining batafsil qoidalari",
    "",
    "**Parametrlar**",
    "- **Majburiy, default, variadic:** `function f(int $a, int $b = 2, int ...$rest)`. Variadic oxirgi bo'ladi va tipga ega bo'lishi mumkin.",
    "- **Default qiymat** konstanta ifoda bo'lishi shart (8.1 dan `new Foo()` ham ruxsat): `function f(Logger $l = new NullLogger())`.",
    "- **Nomli argumentlar:** tartib ahamiyatsiz; bir parametrga ikki marta qiymat berish `Error`. Variadic bilan aralashganda ortiqcha nomli argumentlar `$rest` ga kalit bilan tushadi.",
    "- **Qaytarish tipi:** `: int`, `: ?string`, `: static`, `: void`, `: never`. `return;` faqat `void`/nullable'da.",
    "- **Funksiya ichida funksiya** e'lon qilish mumkin, lekin tashqi funksiya chaqirilgandan keyin global bo'ladi (kamdan-kam kerak).",
    "",
    "**Funksiya e'lon qilish va chaqirish vaqti**",
    "Fayl darajasidagi funksiya kompilyatsiya paytida **hoisting** bilan e'lon qilinadi, shuning uchun fayl ichida e'londan oldin chaqirish mumkin. Shartli (`if`) yoki funksiya ichidagi e'lon esa bajarilgandan keyingina mavjud bo'ladi.",
    "",
    "**Scope**",
    "- Lokal, global (`global $x`, `$GLOBALS`), static (`static $n`).",
    "- Closure faqat `use` bilan tashqini ko'radi; arrow function avtomatik (qiymat).",
    "- Klass metodlarida `$this`.",
    "- Rekursiv funksiyalar uchun PHP'da stack chegarasi yo'q (xotira tugaguncha); chuqur rekursiya (10 000+) `memory_limit` yoki segfault beradi. `xdebug.max_nesting_level` Xdebug yoqilganda.",
    "",
    "**Callable turlari**",
    "1. Satr: `'strtoupper'`, `'Foo::bar'`",
    "2. Massiv: `[$obj, 'method']`, `['Foo', 'staticMethod']`",
    "3. `Closure`: `fn`, `function`, `strlen(...)`",
    "4. `__invoke` bor obyekt",
    "Tekshirish: `is_callable`, chaqirish: `$f()`, `call_user_func($f, ...$args)`, `call_user_func_array`.",
    "",
    "**Ichki yordamchilar**",
    "`func_get_args()`, `func_num_args()` (eski; variadic afzal), `function_exists`, `array_map` bilan callable, `usleep`, `register_shutdown_function`.",
    "",
    "**Qaytarish va generator**",
    "Funksiya `yield` ishlatsa, u har doim `Generator` qaytaradi, `return` esa `getReturn()` ga tushadi (1.17).",
    "",
    "**Pure function**",
    "Bir xil kirishga bir xil natija, side-effect yo'q: test qilish va keshlash oson. Laravel helperlari (`now()`, `auth()`) pure emas.",
    "",
    "**Samaradorlik**",
    "Funksiya chaqiruvi arzon, lekin tsikl ichida minglab marta chaqiruv sezilishi mumkin (OPcache + JIT yengillashtiradi). Mikrooptimizatsiyadan oldin profil (Xdebug, Blackfire)."
  ],
  "examples": [
    {
      "title": "Variadic, named, default",
      "lang": "php",
      "code": [
        "function sum(int ...$nums): int { return array_sum($nums); }",
        "echo sum(1, 2, 3);              // 6",
        "echo sum(...[4, 5]);            // 9",
        "",
        "function mail(string $to, string $subject = '(mavzusiz)', bool $html = false) {}",
        "mail('a@b.uz', html: true);     // subject default qoladi"
      ]
    },
    {
      "title": "Closure va use",
      "lang": "php",
      "code": [
        "$rate = 0.12;",
        "$withVat = fn(int $p) => (int) round($p * (1 + $rate));  // arrow: avtomatik, qiymat bo'yicha",
        "$counter = function () use (&$total) { $total++; };       // reference",
        "",
        "$upper = strtoupper(...);                                 // first-class callable",
        "echo implode(',', array_map($upper, ['a', 'b']));"
      ]
    },
    {
      "title": "Static o'zgaruvchi",
      "lang": "php",
      "code": [
        "function nextId(): int",
        "{",
        "    static $id = 0;",
        "    return ++$id;",
        "}",
        "echo nextId(), nextId(), nextId(); // 123"
      ]
    },
    {
      "title": "Variadic + named",
      "lang": "php",
      "code": [
        "function tag(string $name, string ...$classes): string",
        "{",
        "    return sprintf('<%s class=\"%s\">', $name, implode(' ', $classes));",
        "}",
        "echo tag('div', 'a', 'b');                    // <div class=\"a b\">",
        "echo tag(...['name' => 'p']);                  // spread: nomli argument",
        "function opts(string $a, string ...$rest) { var_dump($rest); }",
        "opts('x', foo: '1', bar: '2');                 // $rest = ['foo' => '1', 'bar' => '2']"
      ]
    },
    {
      "title": "Hoisting va shartli e'lon",
      "lang": "php",
      "code": [
        "echo hello();                  // ishlaydi: fayl darajasidagi funksiya hoisting qilingan",
        "function hello() { return 'salom'; }",
        "",
        "if (!function_exists('str_x')) {",
        "    function str_x(string $s): string { return $s; }   // faqat shartdan keyin mavjud",
        "}"
      ]
    },
    {
      "title": "Callable turlari",
      "lang": "php",
      "code": [
        "class Math { public static function sq(int $x) { return $x * $x; } public function __invoke($x) { return $x + 1; } }",
        "print_r(array_map('Math::sq', [1, 2]));",
        "print_r(array_map([new Math, '__invoke'], [1, 2]));",
        "print_r(array_map(new Math, [1, 2]));",
        "print_r(array_map(Math::sq(...), [1, 2]));"
      ]
    }
  ],
  "pitfalls": [
    "`use ($x)` qiymatni closure yaratilgan paytda nusxalaydi: keyingi o'zgarish ko'rinmaydi. Kerak bo'lsa `&$x`, lekin bu yashirin holat.",
    "Default parametrni oxirga qo'ymasangiz (`f($a = 1, $b)`) deprecation; majburiy parametrdan keyin default.",
    "Funksiya ichidagi `static` o'zgaruvchi Octane/worker'da so'rovlar orasida qoladi: ma'lumot sizishi.",
    "Reference bilan uzatish o'qilishni yomonlashtiradi va CoW'ni buzadi; qiymat qaytaring.",
    "`global $x` va `$GLOBALS` yashirin bog'liqlik hosil qiladi: parametr orqali bering.",
    "`func_get_args()` tipsiz: variadic (`...$args`) yaxshiroq.",
    "Chuqur rekursiya xotirani to'ldiradi; tsikl yoki aniq stack ishlating.",
    "`is_callable('Class::method')` metod instance bo'lsa statik chaqiruvda xato berishi mumkin: aniq closure yoki first-class callable ishlating."
  ]
});
