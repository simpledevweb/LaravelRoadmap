/* Chuqur dars: 24.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.2", {
  "lesson": [
    "### Endpoint talablari",
    "Yaxshi webhook endpoint'i (qabul qiluvchi) quyidagilarni bajaradi:",
    "1. **Tez javob:** imkon qadar 1 soniyadan kam, provayder timeout'idan (5–30 s) ancha kam. Og'ir ish navbatda (24.14).",
    "2. **To'g'ri status:** `2xx` — qabul qilindi, qayta yubormang. `4xx` — so'rov noto'g'ri (imzo xato), ko'p provayderlar qayta yubormaydi yoki keyinroq to'xtatadi. `5xx` va timeout — vaqtinchalik muammo, qayta yuborish. Shuning uchun **dublikat** hodisaga ham `200` qaytaring.",
    "3. **Haqiqiylikni tekshirish:** imzo (24.3), vaqt (24.5).",
    "4. **Idempotent qabul:** event ID bo'yicha (24.7).",
    "5. **Xom body'ni saqlash:** imzo tekshiruvi xom bayt'lar ustida.",
    "",
    "### URL dizayni",
    "- Har provayder uchun alohida: `/webhooks/payme`, `/webhooks/click`, `/webhooks/github`. Har birida o'z imzo usuli va secret'i.",
    "- Taxmin qilinmaydigan qism qo'shish mumkin (`/webhooks/payme/{random}`), lekin u imzo o'rnini **bosmaydi**: URL log'larga tushadi.",
    "- Versiya kerak bo'lsa, provayder tomonida (payload'dagi `api_version`), URL'da emas.",
    "",
    "### Middleware va Laravel xususiyatlari",
    "- **CSRF'dan istisno:** tashqi so'rovda CSRF token yo'q. Laravel 11+: `$middleware->validateCsrfTokens(except: ['webhooks/*'])`. `api.php` route'larida CSRF default'da yo'q.",
    "- **Session va auth kerak emas:** `api` guruhi yoki minimal guruh.",
    "- **Rate limit:** yengil (provayder bir vaqtda ko'p hodisa yuborishi mumkin), lekin cheksiz emas.",
    "- **IP allowlist** (ixtiyoriy, qo'shimcha qatlam): ba'zi provayderlar IP diapazonlarini e'lon qiladi. Proxy ortida haqiqiy IP'ni to'g'ri aniqlang (`TrustProxies`). Yagona himoya sifatida emas.",
    "- **Body hajmi chegarasi.**",
    "",
    "### Provayderga xos protokollar",
    "Ba'zi O'zbekiston to'lov tizimlari (Payme Merchant API) klassik webhook emas, balki JSON-RPC: provayder sizning endpoint'ingizda **metodlarni chaqiradi** (`CheckPerformTransaction`, `CreateTransaction`, `PerformTransaction`) va siz sinxron javob qaytarishingiz kerak. Autentifikatsiya Basic Auth orqali, xato kodlari provayder spetsifikatsiyasida. Bunday hollarda \"tez javob, keyin navbat\" naqshi to'g'ridan-to'g'ri qo'llanmaydi: javob tranzaksiya holatini o'z ichiga oladi. Hujjatga qat'iy rioya qiling.",
    "",
    "### Hujjatlashtirish",
    "Har provayder uchun: URL, imzo usuli, secret qayerda, qaysi hodisalar qabul qilinadi, retry siyosati, test muhiti va qayta yuborish (replay) imkoniyati."
  ],
  "examples": [
    {
      "title": "Route'lar va middleware",
      "lang": "php",
      "code": [
        "// routes/webhooks.php (bootstrap/app.php da alohida yuklangan)",
        "Route::prefix('webhooks')",
        "    ->middleware(['throttle:webhooks'])",
        "    ->group(function () {",
        "        Route::post('click', ClickWebhookController::class)->middleware('webhook.signature:click');",
        "        Route::post('github', GithubWebhookController::class)->middleware('webhook.signature:github');",
        "        Route::post('telegram/{secret}', TelegramWebhookController::class)->whereAlphaNumeric('secret');",
        "    });",
        "",
        "// bootstrap/app.php",
        "->withRouting(",
        "    web: __DIR__.'/../routes/web.php',",
        "    api: __DIR__.'/../routes/api.php',",
        "    then: fn () => Route::middleware('api')->group(base_path('routes/webhooks.php')),",
        ")",
        "",
        "RateLimiter::for('webhooks', fn (Request $r) => Limit::perMinute(600)->by($r->ip()));"
      ]
    },
    {
      "title": "Controller: faqat qabul qilish",
      "lang": "php",
      "code": [
        "final class GithubWebhookController",
        "{",
        "    public function __invoke(Request $request): Response",
        "    {",
        "        $event = WebhookEvent::firstOrCreate(",
        "            ['provider' => 'github', 'external_id' => $request->header('X-GitHub-Delivery')],",
        "            ['type' => $request->header('X-GitHub-Event'), 'payload' => $request->getContent(), 'status' => 'pending'],",
        "        );",
        "",
        "        if ($event->wasRecentlyCreated) {",
        "            ProcessGithubEvent::dispatch($event);",
        "        }",
        "",
        "        return response()->noContent();",
        "    }",
        "}"
      ],
      "note": "Telegram Bot API imzo bermaydi, lekin `setWebhook` da `secret_token` berilsa, har so'rovda `X-Telegram-Bot-Api-Secret-Token` header'ini yuboradi. Uni tekshiring."
    }
  ],
  "pitfalls": [
    "Dublikat hodisaga `4xx` yoki `5xx` qaytarish: provayder cheksiz qayta yuboradi yoki webhook'ni o'chirib qo'yadi.",
    "Webhook route'larini `web` guruhida qoldirib, CSRF `419` olish.",
    "URL'dagi \"sir\" qismni imzo o'rniga yagona himoya qilish.",
    "Sinxron RPC uslubidagi provayder (Payme) uchun \"darhol 200, keyin navbat\" naqshini qo'llash."
  ]
});
