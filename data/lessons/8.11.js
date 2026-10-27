/* Chuqur dars: 8.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.11", {
  "lesson": [
    "### PSR va Laravel",
    "Laravel PSR standartlarini **qisman** va o'z yo'lida qo'llaydi: ko'p joyda PSR interface'ni amalga oshiradi, lekin o'z (kengroq) API'sini ham beradi, ba'zida PSR o'rniga Symfony komponentlarini ishlatadi.",
    "",
    "### Taqqoslash",
    "| PSR | Laravel holati |",
    "|---|---|",
    "| **PSR-1/12** (uslub) | Mos; Pint (PSR-12 ga yaqin, `laravel` preset) |",
    "| **PSR-3** (Logger) | Mos: Monolog ustida, `LoggerInterface` ni so'rash mumkin |",
    "| **PSR-4** (Autoload) | Mos: Composer `App\\` → `app/` |",
    "| **PSR-7** (HTTP message) | Yo'q: Symfony HttpFoundation (`Illuminate\\Http\\Request`). Bridge bilan konvertatsiya |",
    "| **PSR-11** (Container) | Mos: `Container` `ContainerInterface` ni amalga oshiradi |",
    "| **PSR-15** (Middleware) | Yo'q: o'z middleware shakli (`handle($request, Closure $next)`) |",
    "| **PSR-16** (Simple Cache) | Mos: `Cache\\Repository` `CacheInterface` ni kengaytiradi |",
    "| **PSR-18** (HTTP Client) | Yo'q to'g'ridan: `Http` fasadi (Guzzle, o'z API) |",
    "| **PSR-20** (Clock) | Yo'q: Carbon `now()`/`setTestNow`; PSR-20 qo'lda bog'lanadi |",
    "",
    "### Nima uchun farq",
    "Laravel Symfony HttpFoundation, o'z Pipeline, Guzzle ustiga quriladi va qulay API (fasadlar, helperlar) beradi. Bu **ishlab chiqish tezligi** uchun; PSR esa **framework mustaqilligi** uchun.",
    "",
    "### Amaliy oqibatlar",
    "- **Framework-mustaqil paket** yozayotgan bo'lsangiz: PSR interface'lariga (`LoggerInterface`, `CacheInterface`, `ClientInterface`, `ClockInterface`) bog'laning.",
    "- **Laravel ilovasida:** fasad/helper qulay, lekin domen/servislarda PSR interface'ini konstruktor orqali so'rash kodni portativ va testlanadigan qiladi.",
    "- PSR-7/15 kutubxonasini Laravel'da ishlatish uchun bridge (`symfony/psr-http-message-bridge`, `nyholm/psr7`).",
    "",
    "### Qoida",
    "Interface'ga bog'lanish (PSR) — portativlik; Laravel API — qulaylik. Ongli tanlang: infratuzilma chetida Laravel, domen yadrosida PSR/o'z interface'lari."
  ],
  "examples": [
    {
      "title": "PSR interface'ni Laravel'da so'rash",
      "lang": "php",
      "code": [
        "use Psr\\Log\\LoggerInterface;",
        "use Psr\\SimpleCache\\CacheInterface;",
        "use Psr\\Container\\ContainerInterface;",
        "",
        "final class ReportService",
        "{",
        "    public function __construct(private LoggerInterface $log, private CacheInterface $cache) {}   // Laravel container hal qiladi",
        "}",
        "// app() ham PSR-11",
        "$svc = app(ContainerInterface::class)->get(ReportService::class);"
      ]
    }
  ],
  "pitfalls": [
    "Laravel Request PSR-7 emas: PSR-7 kutubxonasi uchun bridge kerak.",
    "Laravel middleware'ni PSR-15 deb o'ylab boshqa framework'ga ko'chirib bo'lmaydi.",
    "Domen kodida Facade ishlatish PSR interface'ning portativligini yo'qotadi.",
    "Carbon `setTestNow` global holat; PSR-20 clock aniq bog'liqlik beradi."
  ]
});
