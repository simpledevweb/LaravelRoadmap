/* 31 · PHPStan
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 31,
  slug: "phpstan",
  title: "PHPStan",
  group: "testing",
  description: "PHPStan — PHP uchun statik tahlil vositasi: kodni ishga tushirmasdan tip xatolari, mavjud bo'lmagan metodlar, `null` bilan ishlash xatolari va mantiqiy nomuvofiqliklarni topadi. U testlardan oldin ishlaydigan arzon xavfsizlik to'ri. Senior dasturchi PHPStan'ni CI'ga joriy qiladi, darajani bosqichma-bosqich oshiradi va generics hamda PHPDoc tiplari orqali kodni aniqroq qiladi.",
  subskills: [
    {
      id: "31.1",
      title: "Static Analysis Fundamentals",
      description: [
        "Statik tahlil — kodni bajarmasdan tekshirish: tiplar oqimi, chaqiruvlar, mavjud bo'lmagan class/metod/property, yetib bo'lmaydigan kod, noto'g'ri argument soni. Testlardan farqi: barcha kod yo'llarini ko'radi (testlar faqat bajarilganlarini), lekin runtime xatti-harakatini emas.",
        "",
        "PHPStan qatlamlari: PHP tiplari + PHPDoc + o'z inference'i. Vositalar oilasi: PHPStan, Psalm (o'xshash, taint analysis bilan), Rector (avtomatik refactoring), PHP_CodeSniffer/Pint (uslub — statik tahlil emas).",
        "",
        "```bash",
        "composer require --dev phpstan/phpstan",
        "vendor/bin/phpstan analyse app --level=5",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihada PHPStan'ni 0-darajada ishga tushiring va topilgan xatolar toifalarini tahlil qiling.",
      acceptanceCriteria: [
        "Statik tahlil va testlar farqini biladi",
        "PHPStan, Psalm va Rector vazifalarini farqlaydi"
      ],
      prerequisites: [
        "1.3"
      ]
    },
    {
      id: "31.2",
      title: "Analysis Levels",
      description: [
        "PHPStan darajalari 0 dan 10 gacha (har biri oldingilarini o'z ichiga oladi): 0 — asosiy (noma'lum class/funksiya), 1–2 — noma'lum metod/property, 3 — qaytish tiplari, 4 — o'lik kod, 5 — argument tiplari, 6 — yo'q tip deklaratsiyalari, 7 — union tiplar qisman, 8 — nullable tekshiruvlar, 9 — `mixed` bilan qat'iylik, 10 — yashirin `mixed` ham.",
        "",
        "Yangi loyiha — imkon qadar yuqori (8+); mavjud loyiha — past darajadan baseline bilan boshlab, bosqichma-bosqich oshirish. 5–6-darajalar odatda eng ko'p real bug topadi.",
        "",
        "```neon",
        "# phpstan.neon",
        "parameters:",
        "    level: 6",
        "    paths: [app, src]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihani har bir darajada sinab, xatolar sonini jadvalga yozing va maqsadli darajani tanlang.",
      acceptanceCriteria: [
        "Har daraja nimani qo'shishini taxminan biladi",
        "Darajani bosqichma-bosqich oshirish strategiyasini qo'llaydi"
      ],
      prerequisites: [
        "31.1"
      ]
    },
    {
      id: "31.3",
      title: "Type Inference",
      description: [
        "PHPStan tiplarni kontekstdan chiqaradi: `if ($x instanceof User)` dan keyin `$x` — `User`; `is_string`, `assert()`, `=== null` tekshiruvlaridan keyin tip toraytiriladi (narrowing); `array_map` natijasi, `match` tarmoqlari va konstanta qiymatlari ham hisoblanadi. `\\PHPStan\\dumpType($x)` — tahlilchi qanday tip ko'rayotganini ko'rsatadi.",
        "",
        "Inference'ni tushunish — \"nega PHPStan bunday deyapti\" savolini hal qiladi va keraksiz `@var` annotatsiyalaridan qochishga yordam beradi (ular xatolarni yashirishi mumkin).",
        "",
        "```php",
        "$user = User::find($id);         // User|null",
        "if ($user === null) {",
        "    throw new NotFound();",
        "}",
        "\\PHPStan\\dumpType($user);        // User",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`dumpType()` bilan murakkab funksiyadagi tiplar oqimini kuzating va keraksiz `@var` larni olib tashlang.",
      acceptanceCriteria: [
        "Type narrowing mexanizmini tushunadi",
        "`dumpType` bilan diagnostika qiladi"
      ],
      prerequisites: [
        "31.1"
      ]
    },
    {
      id: "31.4",
      title: "Generics",
      description: [
        "PHP'da native generics yo'q, lekin PHPDoc orqali: `@template T`, `@param T $item`, `@return Collection<int, T>`, `@extends`, `@implements`, kovariantlik (`@template-covariant`), `class-string<T>`. PHPStan ularni tekshiradi — kolleksiyalar, repository'lar va factory'lar tiplari aniq bo'ladi.",
        "",
        "Laravel'da: `Collection<int, User>`, `Builder<Order>`, `HasMany<OrderItem, $this>` (Larastan bilan). Generic repository yoki DTO kolleksiyasi yozganda kod tiplari IDE va tahlilchi uchun to'liq aniq.",
        "",
        "```php",
        "/**",
        " * @template T of object",
        " * @param class-string<T> $class",
        " * @return T",
        " */",
        "public function make(string $class): object { return new $class(); }",
        "",
        "$svc = $container->make(Mailer::class); // PHPStan: Mailer",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Generic `TypedCollection<T>` yoki repository yozib, PHPStan noto'g'ri tipdagi element qo'shilishini ushlashini ko'rsating.",
      acceptanceCriteria: [
        "`@template`, `@extends`, `class-string<T>` ni ishlatadi",
        "Generics orqali kolleksiya tiplarini aniqlaydi"
      ],
      prerequisites: [
        "31.5"
      ]
    },
    {
      id: "31.5",
      title: "PHPDoc Types",
      description: [
        "PHPDoc PHP tiplaridan boyroq tiplarni ifodalaydi: `list<int>`, `array<string, User>`, `non-empty-string`, `positive-int`, `int<1, 100>`, `literal-string`, `callable(int): string`, `array{id: int, name?: string}` (shape), `value-of<Enum>`, `key-of`, `numeric-string`, `non-empty-array`.",
        "",
        "Qoidalar: native tip bo'lsa — PHPDoc faqat aniqlashtirish uchun (`array` → `list<Order>`); PHPDoc va native tip zid bo'lmasin; `@var` bilan tipni \"majburlash\" — oxirgi chora. Bu tiplar hujjat vazifasini ham bajaradi.",
        "",
        "```php",
        "/**",
        " * @param list<positive-int> $ids",
        " * @return array<int, Order>  id => Order",
        " */",
        "public function findMany(array $ids): array { /* ... */ }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Massiv qaytaruvchi 10 ta metodga aniq PHPDoc tiplarini qo'shing va PHPStan topgan xatolarni tuzating.",
      acceptanceCriteria: [
        "PHPStan PHPDoc tiplarini biladi",
        "Native va PHPDoc tiplarini to'g'ri birlashtiradi"
      ],
      prerequisites: [
        "1.3"
      ]
    },
    {
      id: "31.6",
      title: "Array Shapes",
      description: [
        "Array shape — massiv tuzilmasini aniq tasvirlash: `array{id: int, email: string, roles?: list<string>}` (`?` — ixtiyoriy kalit). PHPStan noto'g'ri kalit, yo'q kalitga murojaat va tip xatolarini topadi. `@phpstan-type` bilan qayta ishlatiladigan tip alias, `@phpstan-import-type` boshqa class'dan import.",
        "",
        "Ko'p shape kerak bo'lsa — bu DTO/value object kerakligi belgisi: massivlar o'rniga typed class'lar xavfsizroq va o'qiladigan. Shape'lar tashqi API javoblari va konfiguratsiya massivlari uchun foydali.",
        "",
        "```php",
        "/** @phpstan-type OrderRow array{id: int, total: int, status: 'pending'|'paid'} */",
        "final class OrderReport",
        "{",
        "    /** @return list<OrderRow> */",
        "    public function rows(): array { /* ... */ }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tashqi API javobini array shape bilan tasvirlang, so'ng uni DTO'ga aylantirish foydasini baholang.",
      acceptanceCriteria: [
        "Array shape sintaksisini biladi",
        "Shape va DTO o'rtasida asosli tanlaydi"
      ],
      prerequisites: [
        "31.5"
      ]
    },
    {
      id: "31.7",
      title: "Union Types",
      description: [
        "PHPStan union tiplarni (`int|string`, `User|null`, `'pending'|'paid'` — literal union) kuzatadi va har bir tarmoqni tekshiradi: union'dagi har bir tip uchun metod mavjudmi, barcha holatlar qayta ishlanganmi (`match` exhaustiveness — yo'q holat uchun xato).",
        "",
        "Literal union'lar va enum'lar bilan `match` — kompilyatsiya darajasidagi \"barcha holatlar ko'rib chiqilgan\" kafolatiga yaqin. Keng union'lar — dizayn signali; ko'pincha polymorphism yoki alohida metodlar yaxshiroq.",
        "",
        "```php",
        "/** @param 'card'|'cash'|'transfer' $method */",
        "function fee(string $method): int",
        "{",
        "    return match ($method) {",
        "        'card' => 1_000,",
        "        'cash' => 0,",
        "        // 'transfer' unutildi → PHPStan: Match expression does not handle remaining value",
        "    };",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Enum yoki literal union bilan `match` ishlatib, PHPStan qoplanmagan holatni topishini ko'rsating.",
      acceptanceCriteria: [
        "Union tiplarni PHPStan qanday tekshirishini biladi",
        "Match exhaustiveness'dan foydalanadi"
      ],
      prerequisites: [
        "1.6"
      ]
    },
    {
      id: "31.8",
      title: "Nullability Analysis",
      description: [
        "`null` bilan bog'liq xatolar — eng ko'p uchraydigan runtime xatolardan (\"Call to a member function on null\"). PHPStan (8+ daraja) nullable qiymatda metod chaqirish, nullable'ni non-nullable parametrga uzatishni ushlaydi.",
        "",
        "Yechimlar: guard clause (`if ($x === null) throw/return`), `?->` nullsafe (agar `null` natija maqbul bo'lsa), `findOrFail`/`firstOrFail` (Eloquent), `??` default. `@var User $u` bilan `null` ni \"yashirish\" — xatoni ko'chiradi, tuzatmaydi.",
        "",
        "```php",
        "$order = Order::find($id);",
        "$order->markPaid();          // ❌ level 8: Cannot call method markPaid() on Order|null",
        "",
        "$order = Order::findOrFail($id);",
        "$order->markPaid();          // ✅",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "PHPStan 8-darajada chiqqan nullability xatolarini guard clause va `OrFail` metodlari bilan tuzating.",
      acceptanceCriteria: [
        "Nullable tiplar bilan xavfsiz ishlaydi",
        "`@var` bilan null'ni yashirmaydi"
      ],
      prerequisites: [
        "31.2"
      ]
    },
    {
      id: "31.9",
      title: "Baseline Management",
      description: [
        "Baseline — mavjud xatolarni vaqtincha \"muzlatish\": `phpstan analyse --generate-baseline` ularni `phpstan-baseline.neon` ga yozadi, keyingi tahlillar faqat **yangi** xatolarni ko'rsatadi. Bu legacy loyihada yuqori darajani darhol yoqish va yangi kodni toza saqlash imkonini beradi.",
        "",
        "Qoidalar: baseline'ni kamaytirib borish (har sprintda bir qismini tuzatish), yangi xatolarni baseline'ga qo'shmaslik (faqat ongli qaror bilan), `reportUnmatchedIgnoredErrors` — tuzatilgan xatolar baseline'dan olib tashlanishi uchun. Baseline hajmini metrika sifatida kuzatish.",
        "",
        "```bash",
        "vendor/bin/phpstan analyse --level=8 --generate-baseline",
        "```",
        "```neon",
        "includes:",
        "    - phpstan-baseline.neon",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Legacy loyihada 8-daraja + baseline joriy qiling va baseline'ni kamaytirish rejasini tuzing.",
      acceptanceCriteria: [
        "Baseline'ning maqsadi va xavfini biladi",
        "Baseline'ni muntazam kamaytiradi"
      ],
      prerequisites: [
        "31.2"
      ]
    },
    {
      id: "31.10",
      title: "Custom Rules",
      description: [
        "PHPStan custom qoidalari — jamoa yoki arxitektura kelishuvlarini avtomatik tekshirish: \"Controller'da `DB::` ishlatilmasin\", \"`env()` faqat config fayllarida\", \"Domen qatlami `Illuminate` ga bog'liq bo'lmasin\", \"pul uchun float ishlatilmasin\". `Rule` interfeysi: `getNodeType()` (AST tuguni turi) va `processNode()` (xatolar ro'yxati).",
        "",
        "Oddiyroq alternativlar: `phpstan/phpstan-strict-rules`, `disallowed-calls` paketi (`spaze/phpstan-disallowed-calls`), Deptrac (qatlam bog'liqliklari), Pest arch testlari.",
        "",
        "```neon",
        "# spaze/phpstan-disallowed-calls",
        "parameters:",
        "    disallowedFunctionCalls:",
        "        - function: 'env()'",
        "          message: 'config() ishlating'",
        "          allowIn: ['config/*']",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "`env()` ni config'dan tashqarida va `dd()`/`dump()` ni taqiqlovchi qoidalarni sozlang.",
      acceptanceCriteria: [
        "Custom qoida yoki disallowed-calls bilan kelishuvlarni avtomatlashtiradi",
        "AST asosidagi qoida tuzilmasini tushunadi"
      ],
      prerequisites: [
        "31.1"
      ]
    },
    {
      id: "31.11",
      title: "False Positive Management",
      description: [
        "False positive — aslida to'g'ri kodga xato. Sabablari: dinamik kod (magic method'lar, container), noto'g'ri PHPDoc, tahlilchi bilmaydigan kengaytma yoki kutubxona. Yechim tartibi: (1) kodni yoki tiplarni tuzatish (ko'pincha \"false positive\" aslida haqiqiy muammo), (2) extension o'rnatish (Larastan, phpstan-doctrine), (3) stub fayllar, (4) aniq `ignoreErrors` (identifikator va yo'l bilan), (5) `@phpstan-ignore identifier (sabab)` inline — oxirgi chora.",
        "",
        "Keng ignore'lar (`#.*#` regex) haqiqiy xatolarni yashiradi.",
        "",
        "```php",
        "// @phpstan-ignore method.notFound (Macro orqali qo'shilgan, stub yozilmagan)",
        "$collection->toCsv();",
        "```",
        "```neon",
        "ignoreErrors:",
        "    - identifier: property.notFound",
        "      path: app/Legacy/OldReport.php",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihadagi barcha ignore'larni ko'rib chiqing: keraksizlarini olib tashlang, qolganlarini identifikator va sabab bilan aniqlashtiring.",
      acceptanceCriteria: [
        "False positive'ni haqiqiy muammodan ajrata oladi",
        "Ignore'larni tor va izohli qiladi"
      ],
      prerequisites: [
        "31.9"
      ]
    },
    {
      id: "31.12",
      title: "CI Integration",
      description: [
        "PHPStan CI'da har PR'da ishlaydi va xato bo'lsa merge'ni bloklaydi. Tezlik: natija keshi (`tmpDir` ni CI keshida saqlash), parallel tahlil (default yoqiq), `--memory-limit`. Hisobot formatlari: `--error-format=github` (PR'da annotatsiya), `gitlab` (Code Quality), `checkstyle`, `json`.",
        "",
        "Lokal: pre-commit hook yoki IDE plagini (PhpStorm, VS Code) — xatolarni CI'gacha ko'rish. Composer skripti `composer analyse` — yagona buyruq.",
        "",
        "```yaml",
        "- uses: actions/cache@v4",
        "  with: { path: /tmp/phpstan, key: phpstan-${{ github.sha }}, restore-keys: phpstan- }",
        "- run: vendor/bin/phpstan analyse --error-format=github --memory-limit=1G",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "CI'ga keshlangan PHPStan bosqichini PR annotatsiyalari bilan qo'shing.",
      acceptanceCriteria: [
        "PHPStan'ni CI'da tez va ko'rinadigan qiladi",
        "Lokal va CI tahlilini birxillashtiradi"
      ],
      prerequisites: [
        "43.6"
      ]
    },
    {
      id: "31.13",
      title: "Incremental Adoption",
      description: [
        "Mavjud loyihaga PHPStan joriy qilish strategiyasi: (1) past darajada boshlash va o'tkazish; (2) yoki maqsadli daraja + baseline; (3) yangi kod uchun qat'iy qoida (baseline'ga yangi xato qo'shilmaydi); (4) har sprint baseline'ning bir qismini tuzatish; (5) darajani oshirish; (6) strict-rules va qo'shimcha extension'lar.",
        "",
        "Modul bo'yicha ham bosqichma-bosqich: yangi modullar (masalan, `src/Domain`) yuqori darajada, legacy — pastroq (alohida konfiguratsiya). Rector bilan avtomatik tip qo'shish jarayonni tezlashtiradi.",
        "",
        "```bash",
        "vendor/bin/rector process app --dry-run   # TypeDeclaration qoidalari bilan tiplar qo'shish",
        "vendor/bin/phpstan analyse --level=6",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyiha uchun PHPStan joriy qilish yo'l xaritasini (darajalar, baseline, muddatlar) tuzing va birinchi bosqichni bajaring.",
      acceptanceCriteria: [
        "Bosqichma-bosqich joriy qilish strategiyasini biladi",
        "Rector bilan jarayonni tezlashtiradi"
      ],
      prerequisites: [
        "31.9"
      ]
    },
    {
      id: "31.14",
      title: "PHPStan with Laravel",
      description: [
        "Laravel'ning dinamik tabiati (facade'lar, magic Eloquent atributlari, container, macro'lar, `config()` qaytish tiplari) oddiy PHPStan uchun ko'p false positive beradi. Yechim — **Larastan** extension'i: Laravel'ni tushunadi va Eloquent, facade, container tiplarini to'g'ri chiqaradi.",
        "",
        "Qo'shimcha: model'larga `@property` PHPDoc'lar (yoki `ide-helper:models`), relation metodlariga qaytish tiplari, `casts()` aniq, collection generic'lari. Laravel loyihasida PHPStan = Larastan.",
        "",
        "```neon",
        "includes:",
        "    - vendor/larastan/larastan/extension.neon",
        "parameters:",
        "    level: 6",
        "    paths: [app]",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel loyihasiga Larastan o'rnating va oddiy PHPStan bilan xatolar sonini solishtiring.",
      acceptanceCriteria: [
        "Laravel'da nega Larastan kerakligini tushuntira oladi",
        "Modellarni statik tahlilga mos qiladi"
      ],
      prerequisites: [
        "larastan"
      ]
    },
    {
      id: "31.15",
      title: "Third-Party Extension Compatibility",
      description: [
        "PHPStan extension'lari ekotizimi: `phpstan-strict-rules`, `phpstan-deprecation-rules` (deprecated API ishlatilishini topadi — upgrade uchun juda foydali), `phpstan-phpunit`, `phpstan-mockery`, `phpstan-doctrine`, `larastan`, `phpstan-webmozart-assert`. `phpstan/extension-installer` ularni avtomatik ulaydi.",
        "",
        "Moslik: PHPStan major versiyasi o'zgarganda (1.x → 2.x) extension'lar ham yangilanishi kerak; versiyalarni birga yangilash, CHANGELOG'larni o'qish. Uchinchi tomon kutubxonalar tiplari noto'g'ri bo'lsa — stub fayllar (`stubFiles`).",
        "",
        "```bash",
        "composer require --dev phpstan/extension-installer phpstan/phpstan-deprecation-rules phpstan/phpstan-strict-rules",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Deprecation-rules extension'ini qo'shib, keyingi Laravel/PHP upgrade uchun deprecated chaqiruvlar ro'yxatini tayyorlang.",
      acceptanceCriteria: [
        "Asosiy extension'lar va ularning vazifasini biladi",
        "Versiya mosligini va stub'larni boshqaradi"
      ],
      prerequisites: [
        "31.14"
      ]
    }
  ]
});
