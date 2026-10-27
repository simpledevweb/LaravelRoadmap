/* Chuqur dars: 1.27. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.27", {
  "lesson": [
    "### Bayt va belgi",
    "PHP string — **baytlar** ketma-ketligi. UTF-8 da lotin harfi 1 bayt, kirill 2 bayt, `oʻ` (U+02BB) 2 bayt. `strlen()` bayt sanaydi, `mb_strlen()` — belgi. O'zbek matnida `strlen`, `substr`, `strtoupper`, `ucfirst`, `str_pad` noto'g'ri ishlaydi: harfni o'rtadan bo'lib, buzuq belgi hosil qiladi.",
    "",
    "### mbstring",
    "`mb_strlen`, `mb_substr`, `mb_strtoupper/lower`, `mb_str_split`, `mb_strpos`, `mb_str_pad` (8.3), `mb_trim`, `mb_ucfirst` (8.4). Kodlash aniq beriladi yoki `mb_internal_encoding('UTF-8')`. `default_charset=UTF-8`.",
    "",
    "### Normalizatsiya va solishtirish",
    "Bir xil ko'rinadigan belgi turli kodlanishi mumkin (é = 1 yoki 2 code point). `Normalizer::normalize($s, Normalizer::FORM_C)` (intl) solishtirishdan oldin. Tartiblash va registr: `Collator`, `mb_strtolower`. `strcmp`/`==` baytlarni solishtiradi.",
    "",
    "### Slug va translit",
    "`Str::slug()` (Laravel) o'zbek `oʻ`, `gʻ` bilan ishlash uchun maxsus qoida talab qilishi mumkin; `Transliterator` (intl) bor.",
    "",
    "### Xavfsizlik",
    "HTML chiqishda `htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')` (Blade `{{ }}` buni avtomatik qiladi). Yaroqsiz UTF-8 ni `mb_check_encoding` bilan tekshiring, `mb_scrub` bilan tozalang. `iconv`/`mb_convert_encoding` kodlash o'tkazadi.",
    "",
    "### Foydali funksiyalar",
    "`sprintf/number_format`, `str_contains/starts_with/ends_with` (8.0), `strtr`, `wordwrap`, `similar_text/levenshtein` (faqat bayt!), Heredoc/Nowdoc, `Stringable`.",
    "",
    "### Kodlash (encoding) asoslari",
    "- **Code point:** Unicode'dagi belgi raqami (U+0041 `A`, U+02BB `ʻ`, U+1F600 😀).",
    "- **UTF-8:** code point'ni 1–4 baytda kodlaydi: ASCII → 1 bayt, lotin kengaytmalari va kirill → 2 bayt, ko'p CJK → 3 bayt, emoji → 4 bayt. Boshqa kodlashlar: UTF-16, Windows-1251, ISO-8859-1.",
    "- PHP stringi kodlashni bilmaydi, u shunchaki baytlar. Kodlashni siz belgilaysiz (`default_charset`, `mb_internal_encoding`, DB connection `utf8mb4`).",
    "- **Grapheme cluster:** foydalanuvchi ko'radigan \"bitta belgi\" bir necha code point bo'lishi mumkin (🇺🇿 = 2 code point, 👨‍👩‍👧 = 5). Uni `grapheme_strlen`, `grapheme_substr` (intl) sanaydi; `mb_strlen` code point sanaydi.",
    "",
    "### mbstring funksiyalari",
    "- Uzunlik/kesish: `mb_strlen`, `mb_substr`, `mb_strpos`, `mb_str_split`, `mb_strimwidth`, `mb_substr_count`, `mb_strwidth` (CJK kengligi 2).",
    "- Registr: `mb_strtoupper/lower`, `mb_convert_case($s, MB_CASE_TITLE)`, `mb_ucfirst/lcfirst` (8.4).",
    "- Bo'shliq: `mb_trim/ltrim/rtrim` (8.4), `mb_str_pad` (8.3).",
    "- Tekshirish/aylantirish: `mb_check_encoding`, `mb_convert_encoding`, `mb_detect_encoding` (ishonchsiz, strict rejim bilan), `mb_scrub`.",
    "- `mb_substr` va boshqalar UTF-8 da **O(n)** (boshidan sanaydi): tsiklda indeks bilan ishlatish O(n²); `mb_str_split` yoki `preg_split('//u')`.",
    "- `mbstring.func_overload` olib tashlangan; `strlen` o'zi bayt bo'lib qoladi.",
    "",
    "### Oddiy string funksiyalar (ASCII/bayt)",
    "- Qidirish: `strpos` (va `stripos`), `strrpos`, `str_contains`, `strstr`, `strrchr`, `substr_count`. `strpos` 0 qaytarsa `false` bilan adashtirmang: `!== false`.",
    "- Kesish/qirqish: `substr`, `trim` (ikkinchi argument belgi ro'yxati/diapazon `'a..z'`), `rtrim`, `ltrim`, `chunk_split`.",
    "- Almashtirish: `str_replace` (massiv bilan), `str_ireplace`, `substr_replace`, `strtr` (juftliklar bilan tez va xavfsiz).",
    "- Bo'lish/yig'ish: `explode($d, $s, $limit)`, `implode`, `str_split`, `preg_split`.",
    "- Hizalash: `str_pad`, `wordwrap`, `nl2br`, `strrev`, `ucwords($s, $delims)`.",
    "- Solishtirish: `strcmp`, `strnatcmp`, `similar_text`, `levenshtein`, `soundex`, `metaphone` (inglizcha).",
    "- Tekshirish: `ctype_digit/alpha/alnum` (bo'sh satr uchun false), `is_numeric`.",
    "",
    "### sprintf formatlari",
    "`%s` satr, `%d` butun, `%f` float, `%05.1f` (kenglik 5, nol bilan to'ldir, 1 kasr), `%'*10s` (ixtiyoriy to'ldiruvchi), `%-10s` (chapga), `%x` hex, `%b` ikkilik, `%e`, `%%`, `%1$s` (pozitsion argument, tarjimalarda foydali). `number_format(1234567.891, 2, '.', ' ')` → `1 234 567.89`.",
    "",
    "### Tartiblash va solishtirish (Collator)",
    "O'zbek lotin alifbosi (`o`, `oʻ`, `g`, `gʻ`, `sh`, `ch`) standart `sort()` bilan to'g'ri tartiblanmaydi (bayt tartibi). `Collator` (intl) lokalga mos tartib beradi: `$c = new Collator('uz'); $c->sort($arr);`. Ma'lumotlar bazasida ham collation (`utf8mb4_unicode_ci`) muhim.",
    "",
    "### Normalizatsiya",
    "Bir xil ko'rinadigan belgi turlicha kodlanadi (NFC vs NFD). Foydalanuvchi kiritmasini saqlashdan oldin `Normalizer::normalize($s, Normalizer::FORM_C)`; qidiruv va unikal indeks uchun muhim.",
    "",
    "### Laravel",
    "`Str::` yordamchilari mbstring ishlatadi: `Str::slug`, `Str::limit`, `Str::title`, `Str::of($s)->squish()`, `Str::ascii`. Blade `{{ }}` chiqishni `htmlspecialchars` bilan o'raydi, `{!! !!}` esa xom chiqaradi."
  ],
  "examples": [
    {
      "title": "Bayt va belgi",
      "lang": "php",
      "code": [
        "$s = \"Oʻzbekiston\";",
        "var_dump(strlen($s));            // 13 (bayt)",
        "var_dump(mb_strlen($s));         // 11 (belgi)",
        "var_dump(strtoupper('ўзбек'));   // 'ўзбек': kirill o'zgarmaydi (faqat ASCII)",
        "echo mb_strtoupper('ўзбек');     // ЎЗБЕК",
        "echo mb_substr($s, 0, 3);        // Oʻz"
      ]
    },
    {
      "title": "Xavfsiz qisqartirish",
      "lang": "php",
      "code": [
        "function excerpt(string $s, int $n = 80): string",
        "{",
        "    $s = mb_trim(strip_tags($s));",
        "    return mb_strlen($s) <= $n ? $s : mb_substr($s, 0, $n - 1) . '…';",
        "}",
        "echo htmlspecialchars(excerpt($text), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');"
      ]
    },
    {
      "title": "Normalizatsiya",
      "lang": "php",
      "code": [
        "$a = \"e\\u{0301}\";           // e + birlashtiruvchi belgi",
        "$b = \"\\u{00E9}\";            // é",
        "var_dump($a === $b);        // false",
        "var_dump(Normalizer::normalize($a, Normalizer::FORM_C) === $b); // true"
      ]
    },
    {
      "title": "sprintf va number_format",
      "lang": "php",
      "code": [
        "printf(\"%05.1f|%-8s|%'*8s|%x|%b|%1\\$s\\n\", 3.14159, 'ali', 'vali', 255, 5);",
        "// 003.1|ali     |****vali|ff|101|3.14159  (%1\\$s -> birinchi argument)",
        "echo number_format(1234567.891, 2, '.', ' ');   // 1 234 567.89"
      ]
    },
    {
      "title": "Grapheme vs code point",
      "lang": "php",
      "code": [
        "$flag = \"🇺🇿\";",
        "var_dump(strlen($flag));            // 8 (bayt)",
        "var_dump(mb_strlen($flag));         // 2 (code point)",
        "var_dump(grapheme_strlen($flag));   // 1 (ko'rinadigan belgi, intl)"
      ]
    },
    {
      "title": "strpos tuzog'i va strtr",
      "lang": "php",
      "code": [
        "if (strpos($s, 'ab') !== false) {}          // 0 pozitsiya ham topildi degani",
        "if (str_contains($s, 'ab')) {}              // 8.0, aniqroq",
        "echo strtr('Salom {n}', ['{n}' => 'Ali']);  // Salom Ali"
      ]
    }
  ],
  "pitfalls": [
    "`substr/strlen` UTF-8 belgini o'rtasidan kesishi mumkin: bazaga yoki JSON'ga yaroqsiz UTF-8 ketadi (`Malformed UTF-8`).",
    "`strtoupper/ucfirst` 8.2 dan lokalga bog'liq emas va faqat ASCII harflarni o'zgartiradi; o'zbek va kirill uchun `mb_*`.",
    "Foydalanuvchi matnini `htmlspecialchars` siz chiqarish XSS ga olib keladi.",
    "`similar_text`/`levenshtein` bayt bo'yicha ishlaydi: Unicode uchun natija noto'g'ri.",
    "`if (strpos($s, 'x'))` — 0-pozitsiyadagi moslik `false` bo'lib o'qiladi; `!== false` yoki `str_contains`.",
    "`mb_substr` tsikl ichida indeks bilan chaqirilsa O(n²): `mb_str_split` yoki `preg_split('//u')`.",
    "`mb_detect_encoding` taxminiy: kodlash ma'lum bo'lsa aniq bering va `strict=true` ishlating.",
    "DB ulanishi `utf8mb4` bo'lmasa emoji va ba'zi belgilar `?` bo'lib saqlanadi; ulanish va jadval kodlashi mos bo'lsin."
  ]
});
