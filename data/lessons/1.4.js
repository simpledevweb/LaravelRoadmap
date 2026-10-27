/* Chuqur dars: 1.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.4", {
  "lesson": [
    "### == nima qiladi",
    "PHP'da `==` (loose) solishtirish avval ikki qiymatni **umumiy tipga** keltiradi, keyin taqqoslaydi. `===` (strict) esa tip va qiymat ikkalasini tekshiradi, hech narsa o'girmaydi. Bu tafovut xavfsizlik va mantiq xatolarining eng keng tarqalgan manbalaridan biri.",
    "",
    "### PHP 8 da nima o'zgardi",
    "PHP 8.0 dan oldin `0 == \"admin\"` natijasi `true` edi: satr songa o'girilib, `\"admin\"` nolga aylanardi. PHP 8 dan boshlab son va satr solishtirilganda satr **faqat son bo'lsa** songa o'giriladi, aks holda son satrga o'giriladi. Shuning uchun `0 == \"admin\"` endi `false`. Lekin eski tuzoqlar to'liq yo'qolgani yo'q:",
    "- `\"1e3\" == \"1000\"` hamon `true` (ikkalasi ham sonli satr).",
    "- `\"0e12345\" == \"0e99999\"` `true`: ikkalasi nol darajasidagi eksponentsial son. Bu **magic hash** zaifligi: ba'zi parollarning md5 xeshi `0e...` ko'rinishida chiqadi.",
    "- `null == false == 0 == \"\"` zanjirida ko'p qiymatlar bir-biriga teng.",
    "",
    "### Falsy qiymatlar va bo'sh tekshiruvlar",
    "`if ($x)` ning `false` deb hisoblaydigan qiymatlari: `false`, `0`, `0.0`, `\"\"`, `\"0\"`, `[]`, `null`. Diqqat: `\"0\"` falsy, lekin `\"0.0\"` va `\" \"` truthy.",
    "",
    "- `isset($x)`: o'zgaruvchi mavjud va `null` emas.",
    "- `empty($x)`: `!isset($x) || !$x`, ya'ni `\"0\"` ham bo'sh hisoblanadi.",
    "- `is_null($x)`: faqat `null` ni tekshiradi, mavjud bo'lmagan o'zgaruvchida Warning beradi.",
    "- `$x ?? 'default'`: `isset` mantiqi bilan ishlaydi, ogohlantirishsiz.",
    "",
    "### Qoidalar",
    "1. Doim `===` / `!==` ishlating, `==` ni faqat ongli ravishda.",
    "2. `in_array($v, $arr, true)` va `array_search(..., true)`: uchinchi parametr strict rejim.",
    "3. Sirlarni (token, parol xeshi) `hash_equals()` bilan solishtiring: u tip aralashmasligini ham, timing hujumini ham oldini oladi.",
    "4. `switch` loose solishtiradi, `match` esa strict. Qiymat tipi noaniq bo'lsa `match` ni afzal ko'ring.",
    "5. `declare(strict_types=1)` argument tiplarini qat'iylashtiradi, lekin `==` ni o'zgartirmaydi.",
    "",
    "### Type juggling qanday ishlaydi",
    "PHP operator yoki funksiya kutayotgan tipga **avtomatik** o'giradi (juggling). Bu qoidalar PHP 8.0 da \"Saner string to number comparisons\" va \"Saner numeric strings\" RFC'lar bilan o'zgargan; eski kod (PHP 5/7) bilan farq katta.",
    "",
    "**Arifmetika va konkatenatsiya**",
    "- `\"5\" + \"5\"` → 10 (int), `\"5\" . \"5\"` → \"55\", `\"1.5\" + 1` → 2.5.",
    "- Sonli satr: `\"123\"`, `\"1.5\"`, `\"1e3\"`, bosh/oxirgi bo'shliq (`\" 12\"`, `\"12 \"`).",
    "- **Leading-numeric** (`\"12abc\"`): arifmetikada 12 + `Warning: A non-numeric value`. Sonsiz (`\"abc\"`) → `TypeError: Unsupported operand types` (8.0+).",
    "- `null + 1` → 1, `true + 1` → 2, `[] + 1` → TypeError. `[1] + [2]` → massiv birlashtirish (chap ustun).",
    "",
    "**Solishtirish jadvali (PHP 8)**",
    "| a | b | `==` |",
    "|---|---|---|",
    "| `0` | `\"a\"` | false (7.x da true) |",
    "| `\"1\"` | `\"01\"` | true (ikkalasi son) |",
    "| `\"10\"` | `\"1e1\"` | true |",
    "| `100` | `\"1e2\"` | true |",
    "| `null` | `false` | true |",
    "| `[]` | `false` | true |",
    "| `\"abc\"` | `0` | false |",
    "| `null` | `0` | true |",
    "| `\"0\"` | `false` | true |",
    "| `\"\"` | `null` | true |",
    "Qoida (8.0): son ↔ satr solishtirishda satr **son bo'lsa** songa o'giriladi, aks holda son satrga o'giriladi va satr sifatida solishtiriladi.",
    "",
    "**Boolean va bo'sh**",
    "`if`, `&&`, `!`, `?:` ichida falsy: `false`, `0`, `-0`, `0.0`, `\"\"`, `\"0\"`, `[]`, `null`, `SimpleXMLElement` (bo'sh). `\"0.0\"`, `\" \"`, `\"false\"`, `[0]` truthy. Obyekt doim truthy (poʻsh `SimpleXML` dan tashqari).",
    "",
    "**Switch va in_array**",
    "`switch` loose: `switch (\"a\") { case 0: ... }` PHP 8 da mos kelmaydi, ammo `switch (\"1\") { case 1: }` mos keladi. `in_array`, `array_search`, `array_keys($a, $v)`, `array_unique`, `sort` default flag'lari ham loose.",
    "",
    "**Sort va juggling**",
    "`sort(['10', '9', '2', 'a'])` aralash tipda tartib noaniq; `SORT_STRING`, `SORT_NUMERIC`, `SORT_NATURAL` ni aniq bering. Spaceship `<=>` ham juggling qoidalariga amal qiladi.",
    "",
    "**Xavfsizlik kontekstida**",
    "- **Magic hash:** `\"0e...\"` satrlar sonli (nol) deb o'qiladi: `\"0e123\" == \"0e999\"`. Parol/token xeshini `==` bilan solishtirmang.",
    "- **Loose type bypass:** `if ($_GET['id'] == 0)` ga `\"abc\"` PHP 7 da o'tardi; JSON'dan `true` kelsa `\"x\" == true` → true.",
    "- `strcmp($a, $b) == 0` massiv uchun `null` qaytarib (7.x) autentifikatsiyani aylanib o'tgan; 8.0 dan `TypeError`.",
    "- `intval` / `(int)` yaroqsiz kiritmada 0 qaytaradi: `filter_var($v, FILTER_VALIDATE_INT)` bilan tekshiring.",
    "",
    "### Himoya",
    "`declare(strict_types=1)`, tipli parametrlar, `===`, validator (Laravel `integer`, `numeric`, `boolean` qoidalari qat'iy qabul qiladi), PHPStan `strict-comparison` qoidalari."
  ],
  "examples": [
    {
      "title": "Loose va strict farqi",
      "lang": "php",
      "code": [
        "var_dump(0 == \"admin\");        // false (PHP 8), true (PHP 7)",
        "var_dump(\"1e3\" == \"1000\");     // true: ikkalasi ham sonli satr",
        "var_dump(\"abc\" == 0);          // false (PHP 8)",
        "var_dump(null == false);       // true",
        "var_dump(null === false);      // false",
        "var_dump(\"0\" == false);        // true",
        "",
        "var_dump(in_array(\"1e1\", [\"10\"]));        // true",
        "var_dump(in_array(\"1e1\", [\"10\"], true));  // false"
      ],
      "note": "PHP 8 natijalari. Loose solishtirish hali ham kutilmagan natijalar beradi."
    },
    {
      "title": "Magic hash zaifligi",
      "lang": "php",
      "code": [
        "// Foydalanuvchi kiritgan token va saqlangan xesh",
        "$expected = md5('240610708');   // \"0e462097431906509019562988736854\"",
        "$given    = md5('QNKCDZO');     // \"0e830400451993494058024219903391\"",
        "",
        "var_dump($expected == $given);              // true!  (0 == 0)",
        "var_dump($expected === $given);             // false",
        "var_dump(hash_equals($expected, $given));   // false: to'g'ri usul"
      ],
      "note": "Ikkala xesh ham `0e` + raqamlar bo'lgani uchun `==` ularni nol deb qabul qiladi."
    },
    {
      "title": "isset, empty, null-coalescing",
      "lang": "php",
      "code": [
        "$data = ['count' => 0, 'name' => null];",
        "",
        "var_dump(isset($data['count']));   // true",
        "var_dump(isset($data['name']));    // false: null",
        "var_dump(empty($data['count']));   // true: 0 falsy",
        "var_dump(array_key_exists('name', $data)); // true",
        "",
        "$page = $_GET['page'] ?? 1;   // Notice yo'q"
      ]
    },
    {
      "title": "Saner solishtirish",
      "lang": "php",
      "code": [
        "var_dump(0 == \"abc\", \"1\" == \"01\", \"10\" == \"1e1\", 100 == \"1e2\");",
        "// false, true, true, true",
        "var_dump(\"abc\" <=> 0, null <=> false, [] == false);",
        "var_dump(in_array(\"0e1\", [\"0e2\"]), in_array(\"0e1\", [\"0e2\"], true));  // true, false"
      ]
    },
    {
      "title": "Xavfsiz validatsiya",
      "lang": "php",
      "code": [
        "$id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);",
        "if ($id === false || $id === null) { abort(422); }",
        "",
        "$flag = filter_var('yes', FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);  // true"
      ]
    }
  ],
  "pitfalls": [
    "`empty($qty)` qiymati `0` yoki `\"0\"` bo'lganda ham `true` beradi. Miqdor, narx kabi maydonlarda haqiqiy `0` ni xato deb o'qib yuborasiz: `$qty === null` yoki `isset` ishlating.",
    "`in_array` va `array_search` strict parametrsiz loose ishlaydi: `in_array('abc', [0])` PHP 7 da `true` edi, `in_array('1e1', ['10'])` hozir ham `true`. Doim uchinchi argument `true`.",
    "Parol yoki tokenni `==` bilan solishtirish magic hash zaifligiga yo'l ochadi; `password_verify()` yoki `hash_equals()` ishlating.",
    "`switch` loose solishtiradi: `switch ('0e1') { case '0e2': ... }` mos keladi. Qiymat tipiga ishonmasangiz `match` ishlating.",
    "`filter_var` bilan `FILTER_VALIDATE_INT` qaytargan `0` ni `if (!$id)` bilan tekshirmang: `0` falsy; `=== false` ishlating.",
    "JSON `true`/`1`/`\"1\"` loose solishtirishda teng bo'lib, kutilmagan shartga o'tib ketadi.",
    "`switch` loose: tip aralash bo'lsa `match` yoki aniq cast.",
    "`sort` aralash tipda barqaror emas: flag'ni aniq bering."
  ]
});
