/* Chuqur dars: 1.58. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.58", {
  "lesson": [
    "### Callback nima",
    "Callback — boshqa funksiyaga **argument sifatida** beriladigan funksiya, u shu funksiya tomonidan keyin chaqiriladi. PHP'da `callable` tipi shunday qiymatlarni bildiradi.",
    "",
    "### Callable turlari",
    "1. **Funksiya nomi satr sifatida:** `'strtoupper'`.",
    "2. **Obyekt metodi:** `[$obj, 'metod']`.",
    "3. **Statik metod:** `['Klass', 'metod']` yoki `'Klass::metod'`.",
    "4. **Closure / anonim funksiya:** `function ($x) { ... }`, `fn($x) => ...`.",
    "5. **First-class callable (8.1):** `strlen(...)`, `$obj->metod(...)`.",
    "6. `__invoke` bor obyekt.",
    "",
    "### Ichki funksiyalarda",
    "`array_map`, `array_filter`, `array_reduce`, `usort`, `array_walk`, `preg_replace_callback`, `call_user_func`, `call_user_func_array`. Misol: `array_map('strtoupper', $arr)`.",
    "",
    "### O'z funksiyangizda callback qabul qilish",
    "```php",
    "function qayta(array $items, callable $fn): array { ... }",
    "```",
    "`callable` tipi parametrda qo'llaniladi (property tipi sifatida emas).",
    "",
    "### Tekshirish",
    "`is_callable($x)`. Chaqirish: `$x(...)`, `call_user_func($x, $arg)`.",
    "",
    "### Qachon foydali",
    "Filtrlash/transformatsiya, saralash tartibi, hodisa tinglovchilari, kutubxonadagi hook'lar. Zamonaviy kodda closure/arrow function ko'proq ishlatiladi, satr nomlari kamroq.",
    "",
    "### Callback'ni qanday chaqirish",
    "- To'g'ridan: `$fn($a, $b)` (closure, invokable, satr nomi).",
    "- `call_user_func($fn, $a, $b)`, `call_user_func_array($fn, [$a, $b])` (nomli argumentlar ham: `...$args`).",
    "- Metod uchun: `[$obj, 'metod']($x)`; statik: `'Klass::metod'($x)`.",
    "- 8.1 dan: `$f = strlen(...)`, `$f = $obj->metod(...)`, `$f = Klass::stat(...)`.",
    "",
    "### Funksiyalar callback bilan",
    "- `array_map($fn, $arr, ...$more)` — har elementga qo'llaydi, yangi massiv.",
    "- `array_filter($arr, $fn, $mode)` — shartga mos elementlar; `ARRAY_FILTER_USE_KEY`/`USE_BOTH`.",
    "- `array_reduce($arr, $fn, $init)` — bitta qiymatga yig'adi.",
    "- `array_walk($arr, $fn)` — joyida o'zgartiradi (qiymat `&`).",
    "- `usort/uasort/uksort` — o'z tartibingiz bilan saralash.",
    "- `preg_replace_callback`, `array_udiff`, `iterator_apply`.",
    "",
    "### Closure va kontekst",
    "Closure `use ($x)` bilan tashqi qiymatni oladi (nusxa), `&$x` bilan reference. Arrow function tashqi qiymatni avtomatik oladi. Metod ichidagi closure `$this` ni ham oladi.",
    "",
    "### Callback o'z funksiyangizda",
    "```php",
    "function retry(callable $fn, int $times): mixed { /* ... */ }",
    "```",
    "Tip `callable` yoki aniqroq `Closure`. `Closure::fromCallable()` har qanday callable'ni Closure'ga aylantiradi.",
    "",
    "### Hodisalar va hook'lar",
    "Callback'lar hodisa tinglovchilari (`on('saved', fn)`), middleware zanjirlari, Laravel `Collection::map` va `tap` uchun asos.",
    "",
    "### Xatolar",
    "- Mavjud bo'lmagan funksiya nomi: `is_callable` bilan tekshiring.",
    "- `array_map` bir nechta massiv bilan: qisqa massiv `null` bilan to'ldiriladi.",
    "- Callback ichida exception butun `array_map` dan chiqadi."
  ],
  "examples": [
    {
      "title": "Ichki funksiyalar",
      "lang": "php",
      "code": [
        "<?php",
        "$names = ['ali', 'vali'];",
        "print_r(array_map('ucfirst', $names));                 // satr nomi",
        "print_r(array_filter([1, 2, 3, 4], fn($n) => $n % 2 === 0));",
        "usort($users, fn($a, $b) => $a['age'] <=> $b['age']);"
      ]
    },
    {
      "title": "O'z funksiyamiz",
      "lang": "php",
      "code": [
        "<?php",
        "function transform(array $items, callable $fn): array",
        "{",
        "    $out = [];",
        "    foreach ($items as $k => $v) { $out[$k] = $fn($v); }",
        "    return $out;",
        "}",
        "class Fmt { public static function money(int $v): string { return number_format($v, 0, '', ' '); } }",
        "",
        "print_r(transform([1000, 25000], 'Fmt::money'));",
        "print_r(transform([1, 2], fn($n) => $n * 10));"
      ]
    },
    {
      "title": "array_reduce va filter rejimi",
      "lang": "php",
      "code": [
        "<?php",
        "$orders = [['id' => 1, 'sum' => 100], ['id' => 2, 'sum' => 250]];",
        "echo array_reduce($orders, fn($c, $o) => $c + $o['sum'], 0);         // 350",
        "",
        "$data = ['a' => 1, 'b' => 2, 'c' => 3];",
        "print_r(array_filter($data, fn($k) => $k !== 'b', ARRAY_FILTER_USE_KEY));"
      ]
    }
  ],
  "pitfalls": [
    "Satr bilan callback (`'Klass::metod'`) statik tahlilga ko'rinmaydi: closure yoki `Klass::metod(...)` yaxshiroq.",
    "`array_filter` callback'siz `false`/`0`/`''` qiymatlarni olib tashlaydi.",
    "`usort` comparator `int` qaytarishi kerak, `bool` emas (`<=>` ishlating).",
    "`callable` property tipi bo'la olmaydi: `Closure` yoki interface ishlating."
  ]
});
