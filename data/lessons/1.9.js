/* Chuqur dars: 1.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.9", {
  "lesson": [
    "### Closure va arrow function",
    "Anonymous function (closure) — nomsiz funksiya qiymat sifatida: o'zgaruvchiga yoziladi, argument sifatida uzatiladi. **Arrow function** (`fn`, 7.4) — bitta ifodali qisqa closure: tashqi o'zgaruvchilarni **avtomatik, qiymat bo'yicha** oladi.",
    "",
    "### Farqlar",
    "| | `function () use ()` | `fn` |",
    "|---|---|---|",
    "| Tana | ko'p ifoda, `return` | bitta ifoda |",
    "| Tashqi o'zgaruvchi | `use` bilan | avtomatik (qiymat) |",
    "| Reference | `use (&$x)` | yo'q |",
    "| Ichki o'zgartirish | tashqiga ta'sir qilmaydi | tashqiga ta'sir qilmaydi |",
    "",
    "Arrow funksiya faqat o'qish uchun qulay: ichida tashqi o'zgaruvchini yozsangiz tashqi o'zgarmaydi. Ichma-ich `fn` ham tashqi qiymatlarni ushlab oladi.",
    "",
    "### $this va static",
    "Metod ichida yaratilgan closure `$this` ni avtomatik bog'laydi. `static fn` / `static function` bog'lamaydi: xotira sizishining oldini oladi (obyekt ushlanib qolmaydi).",
    "",
    "### Closure manipulyatsiyasi",
    "- `Closure::bind($fn, $obj, Scope::class)` va `bindTo` — kontekstni o'zgartiradi (private'ga kirish mumkin; frameworkdagi \"sehr\" shundan).",
    "- `$fn->call($obj)` bir martalik bog'laydi.",
    "- `Closure::fromCallable()` va `(...)` sintaksisi callable'ni Closure'ga aylantiradi.",
    "",
    "### Qayerda ishlatiladi",
    "`array_map/filter/usort`, Collection pipeline'lari, route closure'lari, event listener'lar, `DB::transaction(fn ...)`, lazy qiymatlar (`$value instanceof Closure ? $value() : $value`).",
    "",
    "### Serializatsiya",
    "Closure oddiy PHP'da `serialize` qilinmaydi. Laravel queue'da `SerializableClosure` ishlatadi, lekin job class yozish ishonchliroq.",
    "",
    "### Closure ichki tuzilma",
    "Har bir closure `Closure` klassi obyekti: `$this` (bog'langan obyekt), `scope` (klass doirasi), `static` o'zgaruvchilar va `use` qiymatlari bor. `function() use ($x)` qiymatni **yaratilish paytida** nusxalaydi; keyingi o'zgarish ko'rinmaydi.",
    "",
    "**use, static va this**",
    "- `static function`/`static fn` — `$this` bog'lanmaydi, obyekt hayotiga ta'sir qilmaydi.",
    "- Metod ichidagi closure `$this` ni avtomatik oladi; `$this` ga ishlatilmasa ham xotirada ushlab turadi (leak manbai).",
    "- `use (&$x)` reference orqali tashqini o'zgartiradi.",
    "- Closure ichida closure: `fn` ichidagi `fn` tashqi `fn` ning o'zgaruvchilarini ham ko'radi.",
    "",
    "**Closure yaratish usullari**",
    "`function() {}`, `fn() =>`, `Closure::fromCallable('strlen')`, `strlen(...)` (8.1), `$obj->method(...)`, `Foo::bar(...)`, `new ReflectionFunction`.",
    "",
    "**bind / bindTo / call / bindTo scope**",
    "`Closure::bind($fn, $newThis, $scope)` closure'ni boshqa obyekt va klass doirasiga bog'laydi: private/protected'ga kirish mumkin. Laravel Macroable, testing helperlari, Collection `macro()` shunga tayanadi. `$fn->call($obj, ...$args)` bir martalik `bindTo` + chaqirish. Statik closure'ni bog'lab bo'lmaydi (Warning).",
    "",
    "**Currying va composition**",
    "```php",
    "$add = fn($a) => fn($b) => $a + $b;",
    "$compose = fn(callable ...$f) => fn($x) => array_reduce($f, fn($c, $fn) => $fn($c), $x);",
    "```",
    "PHP 8.5 da `|>` pipe operatori shunga qulay (1.41).",
    "",
    "**Memoization va lazy**",
    "```php",
    "$once = function () { static $v; return $v ??= expensive(); };",
    "```",
    "`static` closure ichida, har closure obyekti o'z static nusxasini oladi.",
    "",
    "**Callback joylari**",
    "`array_map/filter/reduce/walk/usort`, `preg_replace_callback`, `register_shutdown_function`, `set_error_handler`, `spl_autoload_register`, event listener'lar, middleware zanjiri (Laravel pipeline: `array_reduce` + closure).",
    "",
    "**Performance**",
    "Closure yaratish arzon, lekin tsiklda har safar yaratsangiz GC yuki oshadi: tsikldan tashqarida yarating. Arrow function sintaksis qulayligi uchun, tezlik farqi yo'q.",
    "",
    "**Debug**",
    "`var_dump($closure)` `use` o'zgaruvchilari va parametrlarni ko'rsatadi. Closure `serialize` qilinmaydi."
  ],
  "examples": [
    {
      "title": "map/filter/usort",
      "lang": "php",
      "code": [
        "$users = [['n' => 'Ali', 'age' => 30], ['n' => 'Vali', 'age' => 17]];",
        "",
        "$adults = array_filter($users, fn($u) => $u['age'] >= 18);",
        "$names  = array_map(fn($u) => $u['n'], $adults);",
        "usort($users, fn($a, $b) => $a['age'] <=> $b['age']);"
      ]
    },
    {
      "title": "use bilan reference",
      "lang": "php",
      "code": [
        "$total = 0;",
        "array_walk($prices, function ($p) use (&$total) { $total += $p; });",
        "",
        "$bad = fn($p) => $total += $p;   // tashqi $total o'zgarmaydi!"
      ],
      "note": "`fn` ichida yozish faqat lokal nusxaga ta'sir qiladi."
    },
    {
      "title": "bind va static",
      "lang": "php",
      "code": [
        "class Secret { private string $code = 'xyz'; }",
        "",
        "$peek = fn() => $this->code;",
        "echo Closure::bind($peek, new Secret(), Secret::class)();  // xyz",
        "",
        "$noThis = static fn(int $x) => $x * 2;   // $this ushlanmaydi"
      ]
    },
    {
      "title": "Pipeline (middleware)",
      "lang": "php",
      "code": [
        "$pipes = [",
        "    fn($req, $next) => $next(strtolower($req)),",
        "    fn($req, $next) => $next(trim($req)),",
        "];",
        "$run = array_reduce(",
        "    array_reverse($pipes),",
        "    fn($next, $pipe) => fn($req) => $pipe($req, $next),",
        "    fn($req) => $req",
        ");",
        "echo $run('  HELLO ');   // hello"
      ]
    },
    {
      "title": "bind va call",
      "lang": "php",
      "code": [
        "class Counter { private int $n = 0; }",
        "$inc = function () { return ++$this->n; };",
        "$c = new Counter();",
        "echo $inc->call($c);                       // 1",
        "echo Closure::bind($inc, $c, Counter::class)();   // 2"
      ]
    },
    {
      "title": "Currying",
      "lang": "php",
      "code": [
        "$mul = fn(int $a) => fn(int $b) => $a * $b;",
        "$double = $mul(2);",
        "print_r(array_map($double, [1, 2, 3]));   // [2, 4, 6]"
      ]
    }
  ],
  "pitfalls": [
    "`fn` ichida tashqi o'zgaruvchiga yozish natija bermaydi (qiymat nusxasi). Akkumulyatsiya uchun `array_reduce` yoki `use (&$x)`.",
    "Closure `$this` ni ushlab oladi: uzoq yashovchi closure obyektni xotirada ushlab turadi. Kerak bo'lmasa `static fn`.",
    "Closure'ni `serialize`/cache'ga yozib bo'lmaydi (`Serialization of 'Closure' is not allowed`).",
    "`usort` comparator qaytishi: `bool` emas, `int` (`<=>`). `fn($a,$b) => $a > $b` PHP 8 da ogohlantirish beradi.",
    "Metod ichida closure `$this` ni ushlaydi va obyektni xotirada uzoq saqlab qolishi mumkin: kerak bo'lmasa `static fn`.",
    "`use ($x)` yaratilish paytidagi qiymatni oladi; loop ichida closure'lar yaratsangiz har biri o'z qiymatini ushlaydi (reference emas).",
    "Statik closure'ni `bind` qilish Warning beradi va ishlamaydi.",
    "Callback ichida exception tashlansa u `array_map` chaqirgan joydan chiqadi: stack trace'da ichki chaqiruv ko'rinadi."
  ]
});
