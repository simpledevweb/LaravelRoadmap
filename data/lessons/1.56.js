/* Chuqur dars: 1.56. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.56", {
  "lesson": [
    "### Filter nima",
    "PHP filtrlari tashqaridan kelgan ma'lumotni (forma, URL, cookie) **tekshirish (validate)** va **tozalash (sanitize)** uchun standart usul.",
    "",
    "### Asosiy funksiyalar",
    "- `filter_var($qiymat, $filter, $options)` — o'zgaruvchini filtrlaydi.",
    "- `filter_input(INPUT_POST, 'nom', $filter)` — superglobaldan to'g'ridan-to'g'ri oladi (`INPUT_GET`, `INPUT_POST`, `INPUT_COOKIE`, `INPUT_SERVER`).",
    "Muvaffaqiyatsizlikda `false` qaytaradi (yoki `null`, `FILTER_NULL_ON_FAILURE` bayrog'i bilan).",
    "",
    "### Validatsiya filtrlari",
    "`FILTER_VALIDATE_INT`, `FILTER_VALIDATE_FLOAT`, `FILTER_VALIDATE_BOOLEAN`, `FILTER_VALIDATE_EMAIL`, `FILTER_VALIDATE_URL`, `FILTER_VALIDATE_IP`, `FILTER_VALIDATE_REGEXP`, `FILTER_VALIDATE_DOMAIN`. Ular qiymatni tekshiradi va o'zgartirmaydi (sonlarni tipga keltiradi).",
    "",
    "### Sanitizatsiya filtrlari",
    "`FILTER_SANITIZE_NUMBER_INT`, `FILTER_SANITIZE_EMAIL`, `FILTER_SANITIZE_URL`, `FILTER_SANITIZE_SPECIAL_CHARS`, `FILTER_SANITIZE_FULL_SPECIAL_CHARS`. Eslatma: `FILTER_SANITIZE_STRING` PHP 8.1 dan **deprecated**: HTML chiqarish uchun `htmlspecialchars()` ishlating.",
    "",
    "### Validatsiya va sanitizatsiya farqi",
    "- **Validatsiya:** to'g'ri/noto'g'ri deb hal qiladi (rad etish).",
    "- **Sanitizatsiya:** keraksiz belgilarni olib tashlaydi (tuzatish).",
    "Ko'pincha avval validatsiya qilib, noto'g'ri bo'lsa rad etish to'g'ri.",
    "",
    "### Muhim",
    "`0` ham to'g'ri qiymat: `if (!$id)` bilan tekshirmang, `=== false` ishlating.",
    "",
    "### Filter turlari jadvali",
    "| Filter | Tekshiradi | Natija |",
    "|---|---|---|",
    "| `FILTER_VALIDATE_INT` | butun son | int yoki false |",
    "| `FILTER_VALIDATE_FLOAT` | kasr son | float yoki false |",
    "| `FILTER_VALIDATE_BOOLEAN` | true/false, yes/no, 1/0, on/off | bool |",
    "| `FILTER_VALIDATE_EMAIL` | email sintaksisi | satr yoki false |",
    "| `FILTER_VALIDATE_URL` | URL sintaksisi | satr yoki false |",
    "| `FILTER_VALIDATE_IP` | IPv4/IPv6 | satr yoki false |",
    "| `FILTER_VALIDATE_DOMAIN` | domen nomi | satr yoki false |",
    "| `FILTER_DEFAULT` | (hech narsa) | satr |",
    "",
    "### Boolean nuansi",
    "`FILTER_VALIDATE_BOOLEAN` noto'g'ri qiymatda `false` qaytaradi, lekin `\"no\"` ham `false`: farqlash uchun `FILTER_NULL_ON_FAILURE` (noto'g'ri qiymat `null`, \"no\" esa `false`).",
    "",
    "### Sonlar",
    "`filter_var('1e3', FILTER_VALIDATE_INT)` → `false`; `FILTER_VALIDATE_FLOAT` → `1000.0`. Bo'shliqlar `trim` qilinadi. Manfiy son `-5` to'g'ri.",
    "",
    "### Email va URL haqida",
    "Email tekshiruvi RFC bo'yicha sintaksisni tekshiradi, lekin manzil haqiqiy bo'lishini kafolatlamaydi: tasdiqlash xati yuboring. `FILTER_VALIDATE_URL` sxemani talab qiladi (`https://`). Xavfli sxemalar (`javascript:`) ni alohida cheklang.",
    "",
    "### filter_input va superglobal",
    "`filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT)` — kiritma yo'q bo'lsa `null`, noto'g'ri bo'lsa `false`. Ba'zi muhitlarda (CLI) `filter_input` ishlamaydi: testda `filter_var($_GET[...])` qulayroq.",
    "",
    "### Qaysi vaqtda yetarli emas",
    "Murakkab biznes qoidalar (parolning murakkabligi, unikal email) uchun framework validatori (Laravel `Validator`, Symfony Validator) ishlating. Filtrlar past darajadagi tezkor tekshiruv."
  ],
  "examples": [
    {
      "title": "Validatsiya",
      "lang": "php",
      "code": [
        "<?php",
        "var_dump(filter_var('ali@gmail.com', FILTER_VALIDATE_EMAIL));   // string",
        "var_dump(filter_var('123', FILTER_VALIDATE_INT));               // int(123)",
        "var_dump(filter_var('12abc', FILTER_VALIDATE_INT));             // false",
        "var_dump(filter_var('https://php.net', FILTER_VALIDATE_URL));",
        "var_dump(filter_var('yes', FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)); // true"
      ]
    },
    {
      "title": "filter_input",
      "lang": "php",
      "code": [
        "<?php",
        "$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);",
        "if ($email === false || $email === null) {",
        "    exit('Email noto\\'g\\'ri');",
        "}"
      ]
    },
    {
      "title": "Boolean va null",
      "lang": "php",
      "code": [
        "<?php",
        "var_dump(filter_var('yes', FILTER_VALIDATE_BOOLEAN));                         // true",
        "var_dump(filter_var('no', FILTER_VALIDATE_BOOLEAN));                          // false",
        "var_dump(filter_var('hmm', FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)); // null",
        "var_dump(filter_var('-5', FILTER_VALIDATE_INT), filter_var(' 7 ', FILTER_VALIDATE_INT));"
      ]
    }
  ],
  "pitfalls": [
    "`FILTER_VALIDATE_INT` `0` ni to'g'ri qaytaradi: `if (!$v)` emas, `$v === false` bilan tekshiring.",
    "`FILTER_SANITIZE_STRING` 8.1 da deprecated: HTML chiqarishda `htmlspecialchars`.",
    "Sanitizatsiya validatsiya o'rnini bosmaydi: noto'g'ri kiritmani tuzatib emas, rad eting.",
    "`filter_var` email tekshiruvi sintaksisni tekshiradi, manzil mavjudligini emas."
  ]
});
