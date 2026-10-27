/* Chuqur dars: 1.32. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.32", {
  "lesson": [
    "### match",
    "Ifoda (qiymat qaytaradi), strict (`===`) solishtiradi, fallthrough yo'q, birlashtirilgan shartlar vergul bilan, mos kelmasa `UnhandledMatchError`. `switch` dan farqi: loose, `break` kerak, qiymat qaytarmaydi. `match (true) { $x > 5 => ... }` shartli tanlov.",
    "",
    "### Named arguments",
    "`createUser(email: 'a@b.uz', active: true)`: tartib ahamiyatsiz, default parametrlarni o'tkazib yuborasiz, o'qilish yaxshi. **Diqqat**: parametr nomi endi ommaviy API: kutubxonada nomni o'zgartirish BC break. Positional bilan aralashganda positional avval. `...$array` string kalitlar bilan named argument sifatida yoyiladi.",
    "",
    "### Nullsafe",
    "`$a?->b?->c()`: zanjirdagi `null` uchrasa butun ifoda `null` (qisqa tutashuv; keyingi argumentlar hisoblanmaydi). Faqat o'qish: `$a?->b = 1` mumkin emas.",
    "",
    "### Spread va boshqa",
    "- `...` argumentlarni yoyadi / yig'adi, massivda 8.1 dan string kalitlar bilan.",
    "- `throw` ifoda: `$x ?? throw new E()`.",
    "- `??`, `??=` (null-coalescing assign), `?:` Elvis.",
    "- First-class callable `f(...)`.",
    "- `new` initializer'da, `new Foo()->bar()` qavssiz (8.4).",
    "- Raqam ajratgich `1_000`, `0o17` (8.1).",
    "",
    "### Qachon qaysi",
    "- Qiymat tanlash → `match`.",
    "- Bir necha qator mantiq / fallthrough kerak → `switch` yoki `if`.",
    "- Ixtiyoriy zanjir → `?->`; lekin `null` ni yashirish xatolarni yutib yubormasin.",
    "",
    "### Statik tahlil",
    "PHPStan `match` to'liqligini (enum bilan) tekshiradi: enum'ga yangi case qo'shsangiz, `match` xato beradi. Bu `default` yozmaslikning foydasi.",
    "",
    "### Qo'shimcha sintaksis imkoniyatlari",
    "- **Null coalescing:** `$a ?? $b`, `$a ??= $b` (faqat `null`/mavjud emas bo'lsa); Elvis `$a ?: $b` (falsy uchun) — farqli!",
    "- **Spaceship:** `$a <=> $b` (-1,0,1), massivlar elementma-element solishtiriladi.",
    "- **Ternary:** ichma-ich qavssiz `a ? b : c ? d : e` PHP 8 da xato; `(a ? b : c) ? ... ` qavs bilan.",
    "- **First-class callable:** `strlen(...)`, `$obj->m(...)`, `Foo::s(...)`, `new Foo(...)` yo'q.",
    "- **Static closures/arrow functions**, `never`, `new` in initializer, `enum` const expression.",
    "- **Nuance:** `match` arm'ida bir nechta shart vergul bilan, `default` bitta. Arm'da tugash `,`.",
    "- **Spread:** `[...$a, ...$b]` (string kalit 8.1), `f(...$args, ...$more)`, `f(...['a' => 1])`.",
    "- **Destructuring:** `[, $b] = ...`, ichma-ich, reference `[&$a]`, `list()` bilan.",
    "",
    "### match chuqurroq",
    "- `UnhandledMatchError` xabari: `Unhandled match case 5` (qiymat turi bilan).",
    "- Arm natijasi faqat bitta ifoda (blok `{}` yo'q); murakkab mantiq uchun closure/metod.",
    "- `match(true)` bilan shart zanjiri: birinchi `true` arm ishlaydi.",
    "- Enum bilan to'liq tekshiruv (statik tahlil).",
    "- `switch` dan farqi: qiymat qaytaradi, strict, `break` yo'q, fallthrough yo'q, mos kelmasa xato.",
    "",
    "### Named arguments chuqurroq",
    "- Reflection orqali ham ishlaydi; ichki funksiyalarda nomlar PHP hujjatidagi bilan bir xil (`array_slice(array: $a, offset: 1, length: 2, preserve_keys: true)`).",
    "- Variadic bilan: qolgan nomli argumentlar `...$rest` ga kalit bilan tushadi.",
    "- Kutubxona API: parametr nomini o'zgartirish BC break (PHPStan/Rector buni tekshirishi mumkin).",
    "- Bir parametrga ikki marta qiymat berish — `Error`.",
    "",
    "### Operatorlar",
    "`**`, `**=`, `<=>`, `??`, `??=`, `?->`, `instanceof`, `clone`, `new`, `print`, `@`, backtick (shell: xavfli, 8.5 da deprecated), `xor`. Ustuvorlik jadvali php.net \"Operator Precedence\": `!` > `instanceof` > ... > `??` > `?:` > `=` > `and` > `xor` > `or`.",
    "",
    "### Xavfsiz sintaksis qoidalari",
    "1. `==` o'rniga `===`.",
    "2. Ichma-ich ternary o'rniga `match`.",
    "3. `?->` xatoni yashirmasin: majburiy qiymat uchun tekshiruv.",
    "4. Katta `match` o'rniga polimorfizm yoki lookup massiv.",
    "5. `list` / destructuring bilan ma'lumotni ochishda kalitlar mavjudligini tekshiring."
  ],
  "examples": [
    {
      "title": "match",
      "lang": "php",
      "code": [
        "$label = match (true) {",
        "    $score >= 90 => 'A',",
        "    $score >= 75 => 'B',",
        "    default      => 'C',",
        "};",
        "",
        "echo match ($status) {",
        "    'paid', 'shipped' => 'faol',",
        "    'new'             => 'yangi',",
        "};  // boshqa qiymat -> UnhandledMatchError"
      ]
    },
    {
      "title": "Named args va spread",
      "lang": "php",
      "code": [
        "function notify(string $to, string $msg = '', bool $sms = false, int $retries = 3) {}",
        "",
        "notify('+99890...', sms: true);",
        "notify(...['to' => 'a@b.uz', 'retries' => 5]);",
        "$city = $order?->customer?->address?->city ?? 'nomalum';",
        "$cache['k'] ??= expensive();"
      ]
    },
    {
      "title": "Enum bilan to'liq match",
      "lang": "php",
      "code": [
        "enum Level { case Low; case High; }",
        "",
        "function color(Level $l): string",
        "{",
        "    return match ($l) {                // default yo'q: yangi case qo'shilsa xato",
        "        Level::Low  => 'green',",
        "        Level::High => 'red',",
        "    };",
        "}"
      ]
    },
    {
      "title": "Null coalescing vs Elvis",
      "lang": "php",
      "code": [
        "$a = 0; $b = null;",
        "var_dump($a ?? 5);     // 0   (null emas)",
        "var_dump($a ?: 5);     // 5   (falsy)",
        "var_dump($b ?? 'x');   // x",
        "$cfg['k'] ??= 'default';"
      ]
    },
    {
      "title": "Ichki funksiya nomli args",
      "lang": "php",
      "code": [
        "print_r(array_slice(array: [1,2,3,4], offset: 1, length: 2, preserve_keys: true));",
        "echo str_pad(string: '7', length: 3, pad_string: '0', pad_type: STR_PAD_LEFT);   // 007"
      ]
    }
  ],
  "pitfalls": [
    "`match` strict: `match ('1') { 1 => ... }` mos kelmaydi va `UnhandledMatchError`. Tiplarni oldindan keltiring.",
    "Parametr nomini o'zgartirish named argument ishlatayotgan chaqiruvlarni sindiradi: kutubxona yozayotgan bo'lsangiz API sifatida qarang.",
    "`?->` null'ni jimgina yutadi: majburiy bog'liqlik uchun xatoni yashiradi; bu yerda aniq tekshiruv yoki `throw`.",
    "`match` arm'larida side-effect va uzun mantiq o'qilishni buzadi; metodga chiqaring.",
    "`$a ?: $b` va `$a ?? $b` farqli: `0`, `''`, `'0'` uchun Elvis boshqa qiymatni tanlaydi.",
    "Ichma-ich qavssiz ternary PHP 8 da fatal xato.",
    "Nomli argument ichki funksiyada noto'g'ri nom bersangiz `Unknown named parameter`.",
    "`match` bitta ifodani qabul qiladi: ko'p qatorli mantiq uchun alohida metod."
  ]
});
