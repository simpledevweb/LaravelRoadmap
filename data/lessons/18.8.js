/* Chuqur dars: 18.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.8", {
  "lesson": [
    "### Content negotiation nima",
    "Bir xil resurs bir nechta ko'rinishda bo'lishi mumkin: JSON, CSV, PDF, XML, turli tillar. Mijoz qaysi ko'rinishni xohlashini **so'rov header'lari** orqali bildiradi, server esa eng mosini tanlaydi. URL bir xil qoladi: `/reports/sales`, `/reports/sales.csv` emas.",
    "",
    "### Header'lar",
    "- `Accept`: javob formati. `application/json`, `text/csv`, `application/pdf`, `*/*`. Sifat qiymati bilan afzallik: `Accept: application/json, text/csv;q=0.5`.",
    "- `Accept-Language`: til. `uz, ru;q=0.8, en;q=0.5`.",
    "- `Accept-Encoding`: siqish. `gzip, br`.",
    "- `Content-Type`: **so'rov** body'sining formati. Server uni parse qilishi uchun.",
    "",
    "### Server javoblari",
    "- Mos format bor: shu formatda javob va `Content-Type` header'ida qaysi biri tanlangani.",
    "- Mos format yo'q: `406 Not Acceptable`. Amalda ko'p API'lar default format (JSON) bilan javob beradi.",
    "- So'rov `Content-Type` qo'llanmaydi: `415 Unsupported Media Type`.",
    "- Javob negotiation natijasiga bog'liq bo'lsa, `Vary: Accept` header'i keshlarga buni bildiradi.",
    "",
    "### Laravel'dagi muhim nuance",
    "Laravel'ning ko'p komponentlari **javob turini `Accept` ga qarab tanlaydi**:",
    "- Validatsiya xatosi: `Accept: application/json` bo'lsa — `422` JSON. Bo'lmasa — **`302` redirect** orqaga, sessiyaga xatolar bilan.",
    "- Autentifikatsiya xatosi: JSON so'rovda `401`, aks holda `/login` ga redirect.",
    "- Exception'lar: JSON yoki HTML sahifa.",
    "",
    "Natija: mobil dasturchi `Accept` header'ini yubormasa, `422` o'rniga `302` va HTML login sahifasini oladi. Bu juda keng tarqalgan muammo. Yechim: API route'lari uchun JSON'ni majburlovchi middleware yoki Laravel 11+ da `bootstrap/app.php` ichida `$exceptions->shouldRenderJsonWhen(fn ($request) => $request->is('api/*'))`.",
    "",
    "Laravel metodlari:",
    "- `$request->expectsJson()`: AJAX yoki JSON so'ralgan.",
    "- `$request->wantsJson()`: `Accept` da JSON bor.",
    "- `$request->accepts(['text/csv'])`, `$request->prefers(['application/json', 'text/csv'])`: eng mos variant.",
    "- `$request->isJson()`: so'rov body'si JSON (`Content-Type`).",
    "",
    "### Til bo'yicha negotiation",
    "`Accept-Language` bo'yicha `App::setLocale()` middleware'da. Validatsiya xabarlari va API'dagi matnlar tanlangan tilda chiqadi. Qo'llanadigan tillar ro'yxatini cheklang va default tilni belgilang."
  ],
  "examples": [
    {
      "title": "Bir endpoint, bir nechta format",
      "lang": "php",
      "code": [
        "public function __invoke(Request $request, SalesReport $report)",
        "{",
        "    $rows = $report->rows($request->date('from'), $request->date('to'));",
        "",
        "    return match ($request->prefers(['application/json', 'text/csv'])) {",
        "        'text/csv' => response()->streamDownload(",
        "            fn () => $report->writeCsv($rows, fopen('php://output', 'w')),",
        "            'sales.csv',",
        "            ['Content-Type' => 'text/csv'],",
        "        ),",
        "        default => SalesRowResource::collection($rows),",
        "    };",
        "}"
      ]
    },
    {
      "title": "API uchun JSON'ni majburlash (Laravel 11+)",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "->withExceptions(function (Exceptions $exceptions) {",
        "    $exceptions->shouldRenderJsonWhen(",
        "        fn (Request $request, Throwable $e) => $request->is('api/*') || $request->expectsJson()",
        "    );",
        "})",
        "",
        "// Yoki middleware",
        "final class ForceJson",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        $request->headers->set('Accept', 'application/json');",
        "        return $next($request);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "API mijozlari `Accept: application/json` yubormaganda validatsiya xatosi `302` redirect bo'lishi.",
    "Formatni URL kengaytmasi bilan (`/report.csv`) va header bilan aralash qo'llash: kesh va route'lar chalkashadi.",
    "Javob `Accept` ga bog'liq bo'lsa-yu, `Vary: Accept` qo'ymaslik.",
    "`Content-Type` siz kelgan body'ni JSON deb parse qilishga urinish: `$request->input()` bo'sh qaytadi."
  ]
});
