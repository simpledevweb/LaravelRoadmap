/* Chuqur dars: 1.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.6", {
  "lesson": [
    "### Nullable tip",
    "`?string` — `string|null` ning qisqa yozuvi. Qiymat bo'lmasligi mumkin bo'lgan joyda aniq ifodalash `null` bilan bog'liq xatolarni (`Call to a member function on null`) kamaytiradi. Natijani ishlatishdan oldin tekshiring: `if ($u === null)`, `$u?->name`, `$u->name ?? 'Mehmon'`.",
    "",
    "### Union types (8.0)",
    "`int|string`, `array|Traversable|null`. Qoidalar: `void` union'da bo'lmaydi; `null` faqat union tarkibida mumkin (alohida standalone 8.2 dan); ortiqcha (`bool|false`) xato. Union ichida skalyar o'girish tartibi bor (`int` → `float` → `string` → `bool`), shuning uchun noaniq tiplar kutilmagan o'girishga olib kelishi mumkin.",
    "",
    "### Intersection types (8.1)",
    "`Countable&Iterator`: qiymat **ikkala** shartni qanoatlantirishi kerak. Faqat klass/interface nomlari bilan; `int&string` mumkin emas. 8.2 dan **DNF**: `(A&B)|null`.",
    "",
    "### Qachon qaysi biri",
    "- Qiymat ixtiyoriy → `?T`.",
    "- Bir necha bir-biriga bog'liq bo'lmagan tip → union, lekin ko'p bo'lsa dizaynni qayta ko'ring (polimorfizm yoki yagona interface yaxshiroq).",
    "- Obyektdan bir nechta imkoniyat talab qilinsa → intersection.",
    "",
    "### null va PHP 8 dagi qoida",
    "Skalyar tipli parametrga `null` uzatish ichki funksiyada 8.1 dan deprecated (`strlen(null)`). Kiritmani avval `?? ''` bilan to'ldiring.",
    "",
    "### Statik tahlil",
    "PHPStan/Psalm nullable'ni kuzatadi: `if ($x !== null)` dan keyin tipni toraytiradi. Bu \"narrowing\" deyiladi va guard clause uslubi bilan juda mos.",
    "",
    "### Nullable tafsiloti",
    "- `?T` ≡ `T|null`. Default qiymat `null` bo'lishi shart emas: `?int $x` majburiy parametr, faqat `null` qabul qiladi.",
    "- **Nullsafe** `?->` va `??`, `??=`; `$x?->y` faqat `$x` `null` bo'lsa to'xtaydi (`false` uchun emas).",
    "- **Null object pattern:** `null` o'rniga \"bo'sh\" obyekt qaytarish (masalan `GuestUser`) null-tekshiruvlarni yo'qotadi.",
    "- **Optional** o'rniga domen xatosi: topilmasa exception (`findOrFail`), topilmasligi normal bo'lsa `null`.",
    "",
    "### Union tafsiloti",
    "- Ruxsat etilmaganlar: `void`, `never` (standalone), `mixed|T` (mixed allaqachon hammasi), ortiqcha takrorlar (`int|INT`), `bool|false`, bir-biriga ichki tiplar (`object|stdClass` ortiqcha), `iterable|array`.",
    "- `false` pseudo-tip union'da ruxsat (`string|false`), 8.2 dan alohida ham.",
    "- Skalyar o'girish (coercive): tip ro'yxatidan qiymat aynan mos kelsa o'giriladi; bo'lmasa tartib: `int`, `float`, `string`, `bool`. `5.5` → `int|string` ga `\"5.5\"` bo'ladi (kasr yo'qolmasligi uchun).",
    "- Reflection: `ReflectionUnionType::getTypes()`.",
    "",
    "### Intersection tafsiloti",
    "- Faqat klass/interface nomlari; `A&B` hamma shartni qanoatlantiruvchi obyekt.",
    "- Default qiymat faqat `null` mumkin emas (8.1 da `A&B $x = null` ruxsat yo'q).",
    "- Foydali: `Iterator&Countable`, `Stringable&JsonSerializable`.",
    "- DNF (8.2): `(A&B)|null` — qavs shart.",
    "",
    "### Narrowing (statik tahlil)",
    "```php",
    "function f(int|string|null $v) {",
    "    if ($v === null) return;",
    "    if (is_int($v)) { /* int */ } else { /* string */ }",
    "}",
    "```",
    "PHPStan `is_*`, `instanceof`, `===`, `isset` va `assert()` orqali tipni toraytiradi. `assert($x instanceof Foo)` runtime'da yoqilgan bo'lsagina ishlaydi (productionda `zend.assertions=-1`), shuning uchun statik maqsadda ishlating.",
    "",
    "### Dizayn",
    "Union tiplar ko'paysa — dizayn muammosi: umumiy interface yoki alohida metodlar (`findById(int)`, `findBySlug(string)`) aniqroq. Return tipida `int|false` o'rniga exception yoki `null` yaxshiroq (xato holatini aniq)."
  ],
  "examples": [
    {
      "title": "Nullable va nullsafe",
      "lang": "php",
      "code": [
        "function city(?User $user): string",
        "{",
        "    return $user?->profile?->city ?? 'Noma\\'lum';",
        "}",
        "",
        "$name = $request->input('name') ?? throw new InvalidArgumentException('name kerak');"
      ]
    },
    {
      "title": "Union va intersection",
      "lang": "php",
      "code": [
        "function idOf(int|string|Stringable $v): string",
        "{",
        "    return (string) $v;",
        "}",
        "",
        "function countAll(Countable&Traversable $c): int   // 8.1",
        "{",
        "    $n = 0;",
        "    foreach ($c as $_) { $n++; }",
        "    return $n;",
        "}",
        "",
        "function maybe((Countable&Traversable)|null $c) {}  // DNF 8.2"
      ]
    },
    {
      "title": "Type narrowing",
      "lang": "php",
      "code": [
        "function render(string|array|null $v): string",
        "{",
        "    if ($v === null) return '';",
        "    if (is_array($v)) return implode(', ', $v);",
        "    return $v;               // bu yerda tip aniq: string",
        "}"
      ]
    },
    {
      "title": "Null object",
      "lang": "php",
      "code": [
        "interface Mailer { public function send(string $to, string $body): void; }",
        "final class NullMailer implements Mailer { public function send(string $to, string $body): void {} }",
        "",
        "$mailer = $config['mail'] ? new SmtpMailer() : new NullMailer();   // if (!== null) kerak emas"
      ]
    },
    {
      "title": "Coercive union tartibi",
      "lang": "php",
      "code": [
        "function f(int|string $x) { var_dump($x); }",
        "f(5.0);       // int(5)",
        "f(5.5);       // string(3) \"5.5\"",
        "f(true);      // int(1)",
        "f(null);      // TypeError"
      ]
    }
  ],
  "pitfalls": [
    "Union tipda skalyar o'girish tartibi noaniq: `int|string` ga `\"5\"` qanday o'tishini bilmasdan ishlatmang; `strict_types=1` bunda yordam beradi.",
    "`int $x = null` — implicit nullable, 8.4 da deprecated. `?int $x = null` yoki `int|null $x = null` yozing.",
    "Intersection faqat klass/interface bilan ishlaydi; skalyar bilan aralashtirib bo'lmaydi.",
    "Union tarkibi 4–5 tadan oshsa, odatda yaxshi abstraksiya yo'q degani: umumiy interface kiriting.",
    "`?T $x` majburiy parametr (default'siz); `null` qabul qilishi uni ixtiyoriy qilmaydi.",
    "`assert()` productionda o'chiq bo'ladi: tekshiruv sifatida emas, faqat statik tahlil uchun.",
    "`bool|false` kabi ortiqcha tiplar compile xatosi.",
    "Natijani `int|false` qaytarish o'rniga `?int` yoki exception; chaqiruvchi `false` ni `0` bilan adashtiradi."
  ]
});
