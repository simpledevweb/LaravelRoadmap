/* 08 · PSR Standards
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 8,
  slug: "psr-standards",
  title: "PSR Standards",
  group: "php-laravel",
  description: "PSR (PHP Standards Recommendations) — PHP-FIG tomonidan qabul qilingan standartlar: kod uslubi, autoload va umumiy interfeyslar (logger, cache, HTTP, container). Ular kutubxonalarning o'zaro mosligini ta'minlaydi: PSR interfeysiga tayangan kod istalgan mos implementatsiya bilan ishlaydi. Laravel ko'p PSR'larni amalga oshiradi, lekin o'z qulay API'larini ham taqdim etadi.",
  subskills: [
    {
      id: "8.1",
      title: "PSR-1: Basic Coding Standard",
      description: [
        "PSR-1 asosiy qoidalar: fayllar faqat `<?php` va `<?=` teglaridan foydalanadi, UTF-8 (BOM siz), fayl yo \"e'lon\" (class, funksiya) qiladi yoki \"yon ta'sir\" (echo, ini o'zgartirish) — ikkalasini emas. Class nomlari `StudlyCaps`, metodlar `camelCase`, konstantalar `UPPER_CASE`. Namespace va class'lar autoload PSR'ga mos.",
        "",
        "\"Bir fayl — e'lon yoki yon ta'sir\" qoidasi autoload xavfsizligini ta'minlaydi: class faylini yuklash kutilmagan amal bajarmasligi kerak.",
        "",
        "```php",
        "<?php",
        "namespace App\\Billing;",
        "",
        "final class InvoiceNumber",
        "{",
        "    public const PREFIX = 'INV';",
        "    public function nextFor(int $year): string { /* ... */ }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Loyihadagi fayllarni PSR-1 bo'yicha tekshiring (yon ta'sirli class fayllari, BOM, nomlash).",
      acceptanceCriteria: [
        "Nomlash qoidalarini biladi",
        "\"E'lon yoki yon ta'sir\" qoidasining maqsadini tushuntira oladi"
      ],
      prerequisites: []
    },
    {
      id: "8.2",
      title: "PSR-3: Logger Interface",
      description: [
        "PSR-3 `Psr\\Log\\LoggerInterface` ni belgilaydi: 8 ta daraja (`emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`) va `log($level, $message, $context)`. Xabarda `{placeholder}` interpolatsiyasi, kontekstda `exception` kaliti exception obyekti uchun ajratilgan.",
        "",
        "Laravel `Log` facade'i PSR-3 ga mos (Monolog asosida). Kutubxona yozganda `LoggerInterface` ga tayaning — foydalanuvchi o'z logger'ini beradi.",
        "",
        "```php",
        "public function __construct(private LoggerInterface $logger) {}",
        "",
        "$this->logger->error('To\\'lov {id} rad etildi', ['id' => $paymentId, 'exception' => $e]);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Kutubxona class'ini Laravel `Log` o'rniga `LoggerInterface` ga bog'lang va testda `NullLogger` ishlating.",
      acceptanceCriteria: [
        "8 ta darajani va ularning ishlatilishini biladi",
        "Kontekst va placeholder'dan to'g'ri foydalanadi"
      ],
      prerequisites: [
        "8.5"
      ]
    },
    {
      id: "8.3",
      title: "PSR-4: Autoloading",
      description: [
        "PSR-4 — fayl yo'lidan class'ni avtomatik yuklash standarti: to'liq class nomi `\\<Namespace prefiks>\\<Sub-namespace>\\<ClassName>` bo'lib, prefiks bazaviy katalogga, sub-namespace'lar papkalarga, class nomi `.php` fayliga mos keladi. Autoloader exception otmasligi va qiymat qaytarmasligi kerak.",
        "",
        "Eski PSR-0 o'rnini bosgan (u `_` ni katalog ajratuvchi deb hisoblardi). Composer PSR-4 ni `autoload.psr-4` orqali amalga oshiradi.",
        "",
        "```text",
        "App\\Domain\\Billing\\Invoice  →  app/Domain/Billing/Invoice.php",
        "(prefiks \"App\\\" → \"app/\")",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Composer'siz oddiy PSR-4 autoloader'ni `spl_autoload_register` bilan yozing.",
      acceptanceCriteria: [
        "Namespace prefiksi va katalog xaritasini tushuntira oladi",
        "PSR-0 va PSR-4 farqini biladi"
      ],
      prerequisites: [
        "7.6"
      ]
    },
    {
      id: "8.4",
      title: "PSR-7: HTTP Message Interfaces",
      description: [
        "PSR-7 HTTP so'rov va javoblarni **immutable** interfeyslar sifatida belgilaydi: `RequestInterface`, `ServerRequestInterface`, `ResponseInterface`, `UriInterface`, `StreamInterface`, `UploadedFileInterface`. O'zgartirish `with*()` metodlari orqali yangi obyekt qaytaradi.",
        "",
        "Laravel o'z (Symfony asosidagi, mutable) Request'idan foydalanadi, lekin `symfony/psr-http-message-bridge` + `nyholm/psr7` o'rnatilsa, controller'da `ServerRequestInterface` type-hint qilish mumkin. PSR-7 Guzzle, Slim, Mezzio kabi kutubxonalarda keng tarqalgan.",
        "",
        "```php",
        "$response = $response",
        "    ->withStatus(201)",
        "    ->withHeader('Content-Type', 'application/json');",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "PSR-7 obyektlari bilan ishlovchi kichik handler yozing va immutability'ni test bilan ko'rsating.",
      acceptanceCriteria: [
        "PSR-7 immutable ekanini va uning oqibatlarini tushuntira oladi",
        "Laravel Request va PSR-7 farqini biladi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "8.5",
      title: "PSR-11: Container Interface",
      description: [
        "PSR-11 DI container uchun minimal interfeys: `get(string $id)` va `has(string $id)`, hamda `NotFoundExceptionInterface`, `ContainerExceptionInterface`. Maqsad — framework'lar va kutubxonalar o'rtasida container mosligi.",
        "",
        "Laravel `Illuminate\\Container\\Container` PSR-11 ni amalga oshiradi. Muhim ogohlantirish: `ContainerInterface` ni biznes kodga inject qilib, ichida `get()` chaqirish — service locator anti-pattern. PSR-11 asosan framework integratsiyasi va factory'lar uchun.",
        "",
        "```php",
        "use Psr\\Container\\ContainerInterface;",
        "",
        "$logger = app(ContainerInterface::class)->get(LoggerInterface::class);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "PSR-11 interfeysini qo'llovchi minimal container yozing (`get`, `has`, closure binding).",
      acceptanceCriteria: [
        "PSR-11 ning minimal ekanini va nega shunday ekanini tushuntira oladi",
        "Container'ni service locator sifatida ishlatmaydi"
      ],
      prerequisites: [
        "2.6"
      ]
    },
    {
      id: "8.6",
      title: "PSR-12: Extended Coding Style",
      description: [
        "PSR-12 (PSR-2 o'rnini bosgan) kod uslubi: 4 bo'shliq indentatsiya, qator uzunligi tavsiyasi 120, class/metod qavslari yangi qatorda, boshqaruv tuzilmalarida qavs bir qatorda, `use` bloklari tartibi, visibility majburiy va h.k. Hozirda PER Coding Style (PSR-12 ning davomi) yangilangan versiya hisoblanadi.",
        "",
        "Qo'lda emas, vosita bilan: Laravel Pint (preset `laravel` yoki `psr12`), PHP-CS-Fixer, PHP_CodeSniffer. CI'da tekshiruv va pre-commit hook uslub bahslarini yo'q qiladi.",
        "",
        "```bash",
        "./vendor/bin/pint --test        # CI",
        "./vendor/bin/pint --dirty       # faqat o'zgargan fayllar",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Pint konfiguratsiyasini yarating, butun loyihani formatlang va CI'da `--test` qo'shing.",
      acceptanceCriteria: [
        "Asosiy PSR-12 qoidalarini biladi",
        "Uslubni avtomatik vositalar bilan ta'minlaydi"
      ],
      prerequisites: [
        "8.1"
      ]
    },
    {
      id: "8.7",
      title: "PSR-15: HTTP Handlers and Middleware",
      description: [
        "PSR-15 PSR-7 asosidagi server tomonidagi handler va middleware interfeyslari: `RequestHandlerInterface::handle(ServerRequestInterface): ResponseInterface` va `MiddlewareInterface::process($request, $handler)`.",
        "",
        "Laravel middleware'lari PSR-15 ga mos emas (o'z `handle($request, Closure $next)` imzosi), lekin konsepsiya bir xil. PSR-15 Mezzio, Slim kabi framework'larda ishlatiladi; framework'dan mustaqil middleware kutubxonalari yozishga imkon beradi.",
        "",
        "```php",
        "final class TimingMiddleware implements MiddlewareInterface",
        "{",
        "    public function process(ServerRequestInterface $r, RequestHandlerInterface $h): ResponseInterface",
        "    {",
        "        $start = hrtime(true);",
        "        $res = $h->handle($r);",
        "        return $res->withHeader('X-Time-Ms', (string) ((hrtime(true) - $start) / 1e6));",
        "    }",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "PSR-15 middleware yozing va uni Laravel middleware'iga adapter orqali ulang.",
      acceptanceCriteria: [
        "PSR-15 va Laravel middleware imzolari farqini biladi",
        "Middleware pipeline konsepsiyasini framework'dan mustaqil tushuntira oladi"
      ],
      prerequisites: [
        "8.4",
        "2.4"
      ]
    },
    {
      id: "8.8",
      title: "PSR-16: Simple Cache",
      description: [
        "PSR-16 oddiy cache interfeysi: `get`, `set` (TTL bilan), `delete`, `clear`, `has`, `getMultiple`, `setMultiple`, `deleteMultiple`. PSR-6 (pool/item asosidagi murakkabroq API) ga soddaroq muqobil.",
        "",
        "Laravel `Illuminate\\Cache\\Repository` PSR-16 ni amalga oshiradi. Kutubxona yozganda `Psr\\SimpleCache\\CacheInterface` ga tayanish — foydalanuvchiga Redis, Memcached yoki file cache tanlash erkinligini beradi. Laravel'ga xos `remember`, `tags`, `lock` PSR-16 da yo'q.",
        "",
        "```php",
        "public function __construct(private CacheInterface $cache) {}",
        "",
        "$rate = $this->cache->get('usd_uzs') ?? $this->fetchAndStore();",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Kutubxona class'ini Laravel `Cache` o'rniga PSR-16 interfeysiga o'tkazing.",
      acceptanceCriteria: [
        "PSR-6 va PSR-16 farqini biladi",
        "Laravel cache'ning PSR-16 dan tashqari imkoniyatlarini ayta oladi"
      ],
      prerequisites: [
        "caching-strategies"
      ]
    },
    {
      id: "8.9",
      title: "PSR-18: HTTP Client",
      description: [
        "PSR-18 — HTTP client interfeysi: `sendRequest(RequestInterface): ResponseInterface`. PSR-7 obyektlari va PSR-17 (factory) bilan birga ishlatiladi. Tarmoq xatolari `NetworkExceptionInterface`, so'rov xatolari `RequestExceptionInterface` orqali; 4xx/5xx javoblar exception emas.",
        "",
        "Guzzle 7 PSR-18 ni qo'llaydi. SDK yozganda PSR-18 ga tayaning — foydalanuvchi o'z client'ini beradi. Ilova kodida Laravel `Http` facade'i (Guzzle ustida) qulayroq: retry, timeout, fake.",
        "",
        "```php",
        "$request = $requestFactory->createRequest('GET', 'https://api.example.uz/rates');",
        "$response = $client->sendRequest($request);",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Tashqi API uchun PSR-18 ga tayangan kichik SDK yozing va Guzzle bilan ulang.",
      acceptanceCriteria: [
        "PSR-18 4xx/5xx ni exception deb hisoblamasligini biladi",
        "PSR-17 factory'larning rolini tushuntira oladi"
      ],
      prerequisites: [
        "8.4"
      ]
    },
    {
      id: "8.10",
      title: "PSR-20: Clock",
      description: [
        "PSR-20 — vaqtni olish uchun yagona interfeys: `ClockInterface::now(): DateTimeImmutable`. Maqsad — vaqtga bog'liq kodni testlanadigan qilish: testda \"muzlatilgan\" soat beriladi.",
        "",
        "Laravel'da `now()` va `Carbon::setTestNow()`/`$this->travelTo()` bilan ham testlash mumkin, lekin framework'dan mustaqil domen kodi uchun `ClockInterface` inject qilish toza yechim. `symfony/clock` tayyor implementatsiya beradi (`MockClock`).",
        "",
        "```php",
        "final class SubscriptionService",
        "{",
        "    public function __construct(private ClockInterface $clock) {}",
        "    public function isExpired(Subscription $s): bool { return $s->endsAt < $this->clock->now(); }",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Vaqtga bog'liq biznes qoidani `ClockInterface` bilan qayta yozing va muzlatilgan soat bilan testlang.",
      acceptanceCriteria: [
        "Global vaqt funksiyalari testni qanday beqaror qilishini tushuntira oladi",
        "Laravel `travelTo` va PSR-20 yondashuvlarini solishtira oladi"
      ],
      prerequisites: [
        "6.10"
      ]
    },
    {
      id: "8.11",
      title: "PSR standartlari va Laravel implementatsiyalari orasidagi farq",
      description: [
        "Laravel PSR'larni tanlab qo'llaydi: **PSR-3** (Log), **PSR-4** (autoload), **PSR-11** (Container), **PSR-16** (Cache Repository) — to'liq mos; **PSR-7/15** — o'z Request/middleware modeli, faqat bridge orqali; **PSR-12** — Pint `laravel` preset'i PSR-12 ga yaqin, lekin o'z farqlari bor; **PSR-18** — `Http` facade Guzzle ustida.",
        "",
        "Amaliy xulosa: ilova kodida Laravel API'lari qulayroq; qayta ishlatiladigan paket/domen qatlamida PSR interfeyslariga tayanish framework'dan mustaqillik beradi.",
        "",
        "```text",
        "Paket/Domen  →  Psr\\Log, Psr\\SimpleCache, Psr\\Clock",
        "Ilova        →  Log::, Cache::, now()",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "O'z kodingizdagi qaysi qatlam PSR'ga, qaysi biri Laravel API'siga tayanishi kerakligi bo'yicha qoida yozing.",
      acceptanceCriteria: [
        "Har bir PSR uchun Laravel'dagi holatni ayta oladi",
        "Framework'dan mustaqillik va qulaylik o'rtasida asosli tanlov qiladi"
      ],
      prerequisites: [
        "8.2",
        "8.5",
        "8.8"
      ]
    }
  ]
});
