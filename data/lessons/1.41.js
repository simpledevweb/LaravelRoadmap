/* Chuqur dars: 1.41. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.41", {
  "lesson": [
    "### PHP 8.4 (2024-11)",
    "- **Property hooks** va **asymmetric visibility** (1.34).",
    "- `new Foo()->bar()` qavssiz zanjir.",
    "- **Lazy objects**: `ReflectionClass::newLazyGhost/newLazyProxy`.",
    "- `array_find`, `array_find_key`, `array_any`, `array_all`.",
    "- `#[\\Deprecated]` atributi, `mb_trim`, `mb_ucfirst`, `mb_lcfirst`.",
    "- Yangi **DOM** (HTML5 `Dom\\HTMLDocument`), `BcMath\\Number` obyekti.",
    "- `round()` uchun `RoundingMode` enum.",
    "- **Deprecated**: implicit nullable parametr (`Foo $x = null`), `E_STRICT` konstantasi.",
    "",
    "### PHP 8.5 (2025-11-20)",
    "- **Pipe operatori** `|>`: `$x |> f(...) |> g(...)`.",
    "- **URI kengaytmasi** (`Uri\\Rfc3986\\Uri`).",
    "- `clone($obj, ['prop' => $v])`: readonly obyekt uchun with-er.",
    "- `#[\\NoDiscard]` va `(void)` cast.",
    "- `array_first()` / `array_last()`.",
    "- Konstanta ifodalarida closure va first-class callable.",
    "- Persistent cURL share handle'lar.",
    "- **Deprecated**: backtick operatori, `__sleep/__wakeup` (o'rniga `__serialize`), `(boolean)/(integer)/(double)/(binary)` cast nomlari.",
    "",
    "### Versiyalarni qo'llab-quvvatlash",
    "8.4 — xavfsizlik 2028-12-31 gacha, 8.3 — 2027-12-31, 8.2 — 2026-12-31; 8.1 EOL. Production uchun odatda eng yangi yoki bitta orqada (8.4 hozirgi eng ishonchli tanlov).",
    "",
    "### Upgrade",
    "1. `composer why-not php 8.4`.",
    "2. CI matritsasi.",
    "3. Rector: `->withPhpSets(php84: true)`.",
    "4. PHPStan + log'dagi deprecation'larni yo'q qiling.",
    "5. Implicit nullable'larni aniq `?T` ga o'tkazing.",
    "",
    "### Laravel",
    "Framework qaysi PHP versiyasini qo'llab-quvvatlashi Laravel hujjatidagi 'Support Policy' jadvalida; yangi loyiha uchun 8.4+ afzal.",
    "",
    "### PHP 8.4 batafsil",
    "- **Property hooks, asymmetric visibility** (1.34).",
    "- **Lazy objects:** `ReflectionClass::newLazyGhost/newLazyProxy`, `isUninitializedLazyObject`, `initializeLazyObject` — ORM, DI container (Symfony/Laravel keyingi versiyalarda foydalanadi).",
    "- `new` qavssiz zanjir: `new Foo()->bar()`.",
    "- **Yangi array funksiyalar:** `array_find`, `array_find_key`, `array_any`, `array_all`.",
    "- `#[\\Deprecated]` atributi: o'z funksiyalaringizni deprecated qilish.",
    "- **Yangi DOM:** `Dom\\HTMLDocument::createFromString()`, CSS selector (`querySelector`), HTML5 parser.",
    "- **BCMath:** `BcMath\\Number` obyekti, `bcfloor/bcceil/bcround/bcdivmod`.",
    "- **mbstring:** `mb_trim`, `mb_ltrim/rtrim`, `mb_ucfirst/lcfirst`.",
    "- `round()` `RoundingMode` enum, `intdiv` o'zgarmagan; `fpow`.",
    "- **PDO driver-spetsifik subclasses:** `Pdo\\Mysql`, `Pdo\\Pgsql`, `Pdo\\Sqlite`.",
    "- **Deprecated:** implicit nullable, `E_STRICT`, `session.sid_*`, GET/POST sessiya parametrlari, `lcg_value`, `_` nomli klass;",
    "- **OPcache:** JIT yangi IR-asosli arxitektura; `opcache.jit` default `disable`.",
    "",
    "### PHP 8.5 batafsil",
    "- **Pipe operatori:** `$x |> f(...) |> g(...)` — chap qiymat o'ng callable'ning birinchi argumenti; callable bir argumentli bo'lishi shart.",
    "- **URI kengaytmasi:** `Uri\\Rfc3986\\Uri`, `Uri\\WhatWg\\Url` — URL parse/normalize/resolve.",
    "- `clone($obj, ['prop' => $v])`.",
    "- `#[\\NoDiscard]`: qaytarilgan qiymat e'tiborsiz qolsa ogohlantirish; `(void)` cast bilan ataylab tashlash.",
    "- `array_first/array_last`.",
    "- **Closure/first-class callable konstanta ifodalarda**, attribute'larda ham.",
    "- `Persistent cURL share handles`, `error_get_last` bilan fatal'larda trace (stack trace in fatal errors: `fatal_error_backtraces`).",
    "- **Deprecated:** backtick operatori, `__sleep/__wakeup` (`__serialize` ni ishlating), cast nomlari (`(boolean)`, `(integer)`, `(double)`, `(binary)`), `null` massiv kaliti sifatida (qismi), `disable_classes` ini va boshqalar.",
    "",
    "### Versiya tanlash",
    "- **Yangi loyiha:** eng yangi barqaror (8.4/8.5), `composer.json`: `\"php\": \"^8.4\"`.",
    "- **Mavjud:** faol qo'llab-quvvatlanayotganga ko'chish (8.2 dan kam bo'lmagan).",
    "- **EOL:** 8.1 va past: xavfsizlik tuzatishi yo'q.",
    "",
    "### Ekosistema mosligi",
    "Laravel (versiya → PHP diapazoni), Symfony, PHPUnit, Pest, PHPStan, Composer paketlari: `composer why-not php 8.5`; CI matritsasida `8.3`, `8.4`, `8.5-rc`. Rector: `->withPhpSets()`.",
    "",
    "### Foydali havolalar",
    "php.net/releases/8.4/en.php, php.net/releases/8.5/en.php, php.net/migration84, php.net/supported-versions, wiki.php.net/rfc."
  ],
  "examples": [
    {
      "title": "8.4 yangiliklar",
      "lang": "php",
      "code": [
        "$user = new User()->activate();                 // qavs kerak emas",
        "$admin = array_find($users, fn($u) => $u->isAdmin());",
        "",
        "echo mb_trim(\"  Oʻzbek  \");                     // \"Oʻzbek\"",
        "echo round(2.5, 0, RoundingMode::HalfEven);     // 2",
        "",
        "final class Legacy",
        "{",
        "    #[\\Deprecated('newMethod() ishlating', since: '2.0')]",
        "    public function old(): void {}",
        "}"
      ]
    },
    {
      "title": "8.5: pipe va clone with",
      "lang": "php",
      "code": [
        "$slug = ' PHP 8.5 '",
        "    |> trim(...)",
        "    |> strtolower(...)",
        "    |> (fn($s) => str_replace(' ', '-', $s));   // \"php-8.5\"",
        "",
        "final readonly class Point { public function __construct(public int $x, public int $y) {} }",
        "$p2 = clone($p, ['x' => 10]);                    // with-er",
        "",
        "$last = array_last($events);"
      ]
    },
    {
      "title": "Implicit nullable tuzatish",
      "lang": "php",
      "code": [
        "// 8.4 da deprecated",
        "function f(string $x = null) {}",
        "",
        "// to'g'ri",
        "function f(?string $x = null) {}"
      ]
    },
    {
      "title": "Lazy ghost va #[Deprecated]",
      "lang": "php",
      "code": [
        "final class Heavy { public function __construct(public array $data) { sleep(1); } }",
        "",
        "$ghost = (new ReflectionClass(Heavy::class))->newLazyGhost(function (Heavy $h) {",
        "    $h->__construct(loadData());",
        "});",
        "// birinchi $ghost->data murojaatida ishga tushadi",
        "",
        "#[\\Deprecated(message: 'newApi() dan foydalaning', since: '3.0')]",
        "function oldApi(): void {}"
      ]
    },
    {
      "title": "array_first, array_last, pipe",
      "lang": "php",
      "code": [
        "$words = ['php', 'laravel', 'vue'];",
        "echo array_first($words), array_last($words);       // php vue",
        "$r = 'Salom Dunyo' |> strtolower(...) |> (fn($s) => str_replace(' ', '-', $s));"
      ]
    }
  ],
  "pitfalls": [
    "Yangi sintaksis (hooks, pipe) eski PHP'da parse error beradi: kutubxonada `composer.json` `php` talabini ko'taring.",
    "Implicit nullable deprecation'lari ko'p paketlarda chiqadi; ularni PHPStan/Rector bilan tuzating.",
    "`|>` oddiy funksiya zanjirini soddalashtiradi, lekin chuqur mantiqni o'qib bo'lmas qiladi; ortiqcha ishlatmang.",
    "Beta/RC versiyani productionda ishlatmang; faqat 'Active support'dagi versiyalar xavfsizlik tuzatishini oladi.",
    "Pipe `|>` bir argumentli callable talab qiladi; ko'p argumentli uchun closure/partial.",
    "`#[\\NoDiscard]` qiymatni tashlasangiz ogohlantiradi: `(void) f();` bilan ataylab tashlang.",
    "Production'da RC/beta versiyani ishlatmang.",
    "Yangi sintaksis (hooks, pipe) eski PHP'da parse error: CI matritsasi."
  ]
});
