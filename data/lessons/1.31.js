/* Chuqur dars: 1.31. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.31", {
  "lesson": [
    "### PCRE funksiyalari",
    "`preg_match` (birinchi moslik), `preg_match_all`, `preg_replace`, `preg_replace_callback`, `preg_split`, `preg_quote`, `preg_grep`. Andoza delimiter ichida: `/.../`, flag oxirida. Xatoda `false` yoki `null`, sababi `preg_last_error()` / `preg_last_error_msg()`.",
    "",
    "### Flag'lar",
    "`i` (registr), `m` (ko'p qator), `s` (nuqta `\\n` ni ham), `x` (izohli), `u` (UTF-8 va Unicode xossalari). Unicode matnda `u` siz `.` va `\\w` bayt bo'yicha ishlaydi.",
    "",
    "### Foydali konstruksiyalar",
    "Guruhlar `( )`, nomlangan `(?<year>\\d{4})`, ushlamaydigan `(?: )`, lookahead `(?=...)`, lookbehind `(?<=...)`, Unicode: `\\p{L}` (harf), `\\p{N}`, `\\p{Cyrillic}`. Greedy `.*` va lazy `.*?`, possessive `*+` va atomik guruh `(?>...)` backtracking'ni cheklaydi.",
    "",
    "### ReDoS",
    "`(a+)+$`, `(.*)*` kabi ichma-ich kvantifikatorlar va ustma-ust alternativalar noqulay kiritmada eksponensial backtracking beradi: bitta so'rov CPU ni band qiladi. PHP `pcre.backtrack_limit` (default 1 000 000) ga yetsa `preg_last_error() === PREG_BACKTRACK_LIMIT_ERROR`; PCRE JIT yoqilgan bo'lsa esa `PREG_JIT_STACKLIMIT_ERROR` chiqishi mumkin.",
    "Himoya: oddiy andoza, ichma-ich kvantifikatorsiz, possessive/atomik, kiritma uzunligini cheklash.",
    "",
    "### Regex kerak emas bo'lganda",
    "`str_contains`, `explode`, `filter_var` (email/URL/IP), `ctype_*`, `sscanf` — tezroq va o'qishli. Email validatsiyasi uchun murakkab regex yozmang: `FILTER_VALIDATE_EMAIL` yoki tasdiqlash xati.",
    "",
    "### Laravel",
    "`Str::of()->match()`, `Str::replaceMatches()`, `Rule::regex` yoki `regex:` qoidasi (pipe `|` ishlatilsa massiv shaklida yozing).",
    "",
    "### PCRE sintaksisi tafsiloti",
    "- **Delimiter:** `/.../`, `#...#`, `~...~`, `{...}`; ichida delimiter belgisi escape (`\\/`).",
    "- **Klasslar:** `\\d \\D \\w \\W \\s \\S \\b \\B`, `[a-z]`, `[^...]`, POSIX `[[:alpha:]]`, Unicode `\\p{L}`, `\\p{Lu}`, `\\p{Cyrillic}`, `\\p{Han}`, `\\X` (grapheme).",
    "- **Kvantifikatorlar:** `* + ? {n} {n,} {n,m}`; lazy `*?`; possessive `*+`.",
    "- **Anchor:** `^ $` (m flag bilan qator), `\\A \\z \\Z`, `\\G`.",
    "- **Guruhlar:** `(...)`, `(?:...)`, `(?<name>...)`, backreference `\\1`, `\\k<name>`; `(?i)` inline flag; `(?|...)` branch reset.",
    "- **Lookaround:** `(?=)`, `(?!)`, `(?<=)`, `(?<!)` (lookbehind uzunligi cheklangan).",
    "- **Flaglar:** `i m s x u U A D X n(8.2: nomlanmagan guruhlarni ushlamaydi) S`.",
    "",
    "### Funksiyalar tafsiloti",
    "- `preg_match($p, $s, $m, PREG_OFFSET_CAPTURE|PREG_UNMATCHED_AS_NULL, $offset)`",
    "- `preg_match_all(..., PREG_SET_ORDER | PREG_PATTERN_ORDER)`",
    "- `preg_replace($p, $r, $s, $limit, $count)`: almashtirishda `$1`, `${1}`, `\\1`, nomli guruh faqat callback bilan.",
    "- `preg_replace_callback_array` bir nechta andoza.",
    "- `preg_split($p, $s, $limit, PREG_SPLIT_NO_EMPTY|DELIM_CAPTURE)`",
    "- `preg_quote($s, '/')`: foydalanuvchi matnini andozaga xavfsiz qo'yish.",
    "- `preg_grep`, `preg_last_error_msg`.",
    "",
    "### Ishlash va xavfsizlik",
    "- PCRE2 JIT (`pcre.jit=1`) tezlashtiradi; limitlar: `pcre.backtrack_limit`, `pcre.recursion_limit`.",
    "- Andoza kesh: PHP har andozani compile qiladi va keshlaydi (4096 gacha); dinamik andozalar keshni to'ldiradi.",
    "- ReDoS: ichma-ich kvantifikatorlar, alternativalar ustma-ust, `.*` ketma-ket. Kiritma uzunligini cheklash, regex o'rniga parser, `(?>...)`.",
    "- Foydalanuvchi bergan **andozani** bajarish — xavfli (CPU, `/e` modifikator eski RCE).",
    "",
    "### Qachon regex ishlatilmaydi",
    "- Email/URL/IP: `filter_var`.",
    "- Sana: `DateTimeImmutable::createFromFormat`.",
    "- HTML/XML: DOM/XPath, regex bilan HTML parse qilinmaydi.",
    "- JSON/CSV: `json_decode`, `fgetcsv`.",
    "- Oddiy qidirish: `str_contains`, `strpos`.",
    "",
    "### Laravel",
    "`Str::match/matchAll/isMatch/replaceMatches`, validatsiya `regex:/^...$/` (pipe `|` bo'lsa massiv shakl), `Rule::when`, `not_regex`."
  ],
  "examples": [
    {
      "title": "Nomlangan guruh",
      "lang": "php",
      "code": [
        "if (preg_match('/^(?<y>\\d{4})-(?<m>0[1-9]|1[0-2])$/', $input, $m)) {",
        "    [$y, $mm] = [(int) $m['y'], (int) $m['m']];",
        "}",
        "$slug = trim(preg_replace('/[^\\p{L}\\p{N}]+/u', '-', mb_strtolower($title)), '-');"
      ]
    },
    {
      "title": "Callback bilan almashtirish",
      "lang": "php",
      "code": [
        "$out = preg_replace_callback('/\\{(\\w+)\\}/', fn($m) => $vars[$m[1]] ?? $m[0], $template);"
      ]
    },
    {
      "title": "ReDoS",
      "lang": "php",
      "code": [
        "// YOMON: ichma-ich kvantifikator",
        "preg_match('/^(a+)+$/', str_repeat('a', 30) . '!');",
        "",
        "if (preg_last_error() !== PREG_NO_ERROR) {",
        "    error_log(preg_last_error_msg());",
        "}",
        "// YAXSHI: possessive",
        "preg_match('/^a++$/', $input);"
      ]
    },
    {
      "title": "preg_replace_callback_array",
      "lang": "php",
      "code": [
        "$out = preg_replace_callback_array([",
        "    '/\\bphp\\b/i'      => fn($m) => strtoupper($m[0]),",
        "    '/\\d{2}-\\d{2}/'   => fn($m) => str_replace('-', '.', $m[0]),",
        "], 'php 12-05 laravel PHP');",
        "echo $out;    // PHP 12.05 laravel PHP"
      ]
    },
    {
      "title": "Offset va unmatched",
      "lang": "php",
      "code": [
        "preg_match('/(a)(b)?(c)/', 'ac', $m, PREG_UNMATCHED_AS_NULL);",
        "var_dump($m);                // [0 => 'ac', 1 => 'a', 2 => null, 3 => 'c']",
        "preg_match('/\\d+/', 'ab12', $m, PREG_OFFSET_CAPTURE);   // [['12', 2]]"
      ]
    }
  ],
  "pitfalls": [
    "`u` flag'siz Unicode matnda `.`, `\\w`, `strlen` kabi bayt bo'yicha ishlaydi: o'zbek/kirill matn buziladi.",
    "`preg_match` xato bo'lsa `false`, mos kelmasa `0` qaytaradi: `if (preg_match(...))` xatoni yashiradi; `=== 1` bilan tekshiring.",
    "Foydalanuvchi regexini (`preg_match($userInput, ...)`) bevosita ishlatish ReDoS va xavfsizlik xavfi: `preg_quote` yoki oldindan tekshirilgan andoza.",
    "Murakkab regex o'qilmaydi; `x` flag va izoh yoki bir nechta oddiy qadamga bo'ling.",
    "`preg_match` bilan HTML/JSON parse qilish ishonchsiz: DOM/`json_decode`.",
    "Foydalanuvchi matnini andozaga `preg_quote` siz qo'yish — regex injection.",
    "Lookbehind o'zgaruvchan uzunlikni qo'llamaydi (PCRE cheklovi).",
    "Ko'p dinamik andoza PCRE keshini to'ldiradi va sekinlashtiradi."
  ]
});
