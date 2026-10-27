/* Chuqur dars: 1.57. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.57", {
  "lesson": [
    "### Options va flags",
    "`filter_var($v, $filter, $params)` — `$params` massivi `options` (sozlamalar) va `flags` (bayroqlar) ni oladi:",
    "```php",
    "['options' => ['min_range' => 1, 'max_range' => 100, 'default' => 1],",
    " 'flags'   => FILTER_NULL_ON_FAILURE]",
    "```",
    "",
    "### Foydali options",
    "- `min_range`, `max_range` (`FILTER_VALIDATE_INT`, `FILTER_VALIDATE_FLOAT`)",
    "- `default` — xatoda qaytariladigan qiymat",
    "- `regexp` (`FILTER_VALIDATE_REGEXP`)",
    "- `decimal` (float uchun)",
    "",
    "### Foydali flags",
    "`FILTER_NULL_ON_FAILURE`, `FILTER_REQUIRE_ARRAY` (massiv kutiladi), `FILTER_FORCE_ARRAY`, `FILTER_FLAG_ALLOW_OCTAL/HEX`, `FILTER_FLAG_IPV4`/`IPV6`, `FILTER_FLAG_NO_PRIV_RANGE`, `FILTER_FLAG_NO_RES_RANGE` (ichki IP'larni rad etish: SSRF himoyasi), `FILTER_FLAG_ALLOW_FRACTION`.",
    "",
    "### Callback filtri",
    "`FILTER_CALLBACK` o'zingizning funksiyangizni filtr sifatida ishlatadi:",
    "`filter_var($v, FILTER_CALLBACK, ['options' => 'trim'])`.",
    "",
    "### Ko'p maydon: filter_var_array / filter_input_array",
    "Bir nechta kiritmani bir chaqiruvda tekshiradi: har kalit uchun filtr va sozlamalar massivi beriladi. Forma validatsiyasi uchun qulay.",
    "",
    "### Regexp",
    "`FILTER_VALIDATE_REGEXP` bilan `['options' => ['regexp' => '/^\\+998\\d{9}$/']]`.",
    "",
    "### Cheklov",
    "Filtrlar oddiy kiritmalar uchun yaxshi. Murakkab qoidalar uchun framework validatori (Laravel) yoki alohida kutubxona qulayroq.",
    "",
    "### Options ro'yxati",
    "- **INT:** `min_range`, `max_range`, `default`.",
    "- **FLOAT:** `min_range`, `max_range`, `decimal` (kasr ajratgich).",
    "- **REGEXP:** `regexp`.",
    "- Hammasi uchun `default`: xato bo'lsa shu qiymat qaytadi.",
    "",
    "### Flags ro'yxati",
    "- `FILTER_NULL_ON_FAILURE` — `false` o'rniga `null`.",
    "- `FILTER_REQUIRE_ARRAY`, `FILTER_FORCE_ARRAY`, `FILTER_REQUIRE_SCALAR`.",
    "- IP: `FILTER_FLAG_IPV4`, `FILTER_FLAG_IPV6`, `FILTER_FLAG_NO_PRIV_RANGE`, `FILTER_FLAG_NO_RES_RANGE`.",
    "- URL: `FILTER_FLAG_PATH_REQUIRED`, `FILTER_FLAG_QUERY_REQUIRED`.",
    "- Sonlar: `FILTER_FLAG_ALLOW_HEX`, `FILTER_FLAG_ALLOW_OCTAL`, `FILTER_FLAG_ALLOW_THOUSAND`, `FILTER_FLAG_ALLOW_FRACTION`.",
    "",
    "### filter_input_array",
    "`filter_input_array(INPUT_POST, $spec)` bitta chaqiruvda butun forma kiritmasini tekshiradi. `$spec` ichida har maydon uchun filtr yoki `['filter' => ..., 'options' => ..., 'flags' => ...]`. Yo'q maydon uchun `null`, xato uchun `false`; `add_empty=false` bilan yo'q maydonni tashlab yuborish mumkin.",
    "",
    "### Callback filtr",
    "`filter_var($v, FILTER_CALLBACK, ['options' => fn($s) => mb_strtolower(trim($s))])` — o'z funksiyangiz bilan tozalash.",
    "",
    "### SSRF himoyasi",
    "Foydalanuvchi bergan URL'ga server so'rov yuborayotgan bo'lsa (`file_get_contents($url)`), hostni hal qilib, IP'ni `FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE` bilan tekshiring: ichki tarmoq manzillariga so'rov yuborishning oldini oladi (DNS rebinding'ni alohida ko'ring).",
    "",
    "### Cheklov",
    "`filter_var_array` ichki qoidalar murakkablashsa o'qilishi qiyin: Laravel `FormRequest`/Validator ga o'ting."
  ],
  "examples": [
    {
      "title": "Oraliq va default",
      "lang": "php",
      "code": [
        "<?php",
        "$page = filter_var($_GET['page'] ?? null, FILTER_VALIDATE_INT, [",
        "    'options' => ['min_range' => 1, 'max_range' => 1000, 'default' => 1],",
        "]);",
        "echo $page;"
      ]
    },
    {
      "title": "Ko'p maydon",
      "lang": "php",
      "code": [
        "<?php",
        "$clean = filter_var_array($_POST, [",
        "    'email' => FILTER_VALIDATE_EMAIL,",
        "    'age'   => ['filter' => FILTER_VALIDATE_INT, 'options' => ['min_range' => 18, 'max_range' => 100]],",
        "    'tags'  => ['filter' => FILTER_DEFAULT, 'flags' => FILTER_REQUIRE_ARRAY],",
        "]);",
        "if (in_array(false, $clean, true) || in_array(null, $clean, true)) { exit('Noto\\'g\\'ri'); }"
      ]
    },
    {
      "title": "Tashqi IP'ni rad etish",
      "lang": "php",
      "code": [
        "<?php",
        "$ok = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);",
        "var_dump($ok !== false);   // 10.x, 192.168.x, 127.x ichki: false"
      ]
    },
    {
      "title": "Telefon (regexp)",
      "lang": "php",
      "code": [
        "<?php",
        "$phone = filter_var($_POST['phone'] ?? '', FILTER_VALIDATE_REGEXP, [",
        "    'options' => ['regexp' => '/^\\+998\\d{9}$/'],",
        "]);",
        "if ($phone === false) { exit('Telefon +998XXXXXXXXX ko\\'rinishida bo\\'lsin'); }"
      ]
    }
  ],
  "pitfalls": [
    "`default` option qiymat xato bo'lsa jimgina `default` qaytaradi: rad etish kerak bo'lsa ishlatmang.",
    "`filter_var_array` natijasida noto'g'ri maydon `false`, yo'q maydon `null`: ikkalasini tekshiring.",
    "`FILTER_VALIDATE_REGEXP` murakkab andozada ReDoS xavfi bor.",
    "Massiv kutganingizda `FILTER_REQUIRE_ARRAY` bermasangiz massiv `false` bo'ladi."
  ]
});
