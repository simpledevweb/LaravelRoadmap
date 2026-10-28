/* Chuqur dars: 19.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.14", {
  "lesson": [
    "### Iste'molchidan boshlang",
    "Autentifikatsiya usulini \"qaysi texnologiya yaxshi\" degan savoldan emas, **\"API'ni kim chaqiradi\"** degan savoldan tanlang. Har iste'molchi turi uchun xavf modeli va qulaylik talablari farq qiladi.",
    "",
    "| Iste'molchi | Tavsiya | Sabab |",
    "|---|---|---|",
    "| O'z SPA'ngiz (bir domen) | Sanctum stateful: session cookie + CSRF | Token JS'da saqlanmaydi, XSS'da o'g'irlanmaydi |",
    "| O'z mobil ilovangiz | Sanctum PAT yoki OAuth2 + PKCE | Cookie noqulay. Token qurilmaning xavfsiz xotirasida |",
    "| Uchinchi tomon ilovalari (foydalanuvchi nomidan) | OAuth2 Authorization Code + PKCE | Foydalanuvchi parolini bermaydi, scope'lar va bekor qilish |",
    "| Server-server (sizning boshqa servisingiz) | OAuth2 Client Credentials, mTLS yoki imzolangan JWT | Foydalanuvchi yo'q, mashina identifikatsiyasi |",
    "| Oddiy B2B integratsiya | API key (hash bilan saqlangan, rotatsiya) | Sodda, lekin scope va muddat bilan |",
    "| Webhook'lar (siz qabul qilasiz) | HMAC imzo | Har so'rovni tekshirish (24.x) |",
    "",
    "### Hal qilinadigan savollar",
    "1. **Token muddati:** qisqa muddatli access token (15 daqiqa – 1 soat) + refresh token, yoki uzoq muddatli PAT (30–90 kun)? Qisqa muddat — o'g'irlangan token zarari kichik.",
    "2. **Yangilash:** refresh token rotatsiyasi (har ishlatilganda yangisi, eskisi bekor). Qayta ishlatilgan refresh token — o'g'irlik belgisi va butun oilani bekor qilish.",
    "3. **Bekor qilish:** logout, parol o'zgarishi, qurilmani o'chirish. Stateful token (Sanctum, DB'da) oson bekor qilinadi. Stateless JWT uchun denylist yoki qisqa muddat kerak (22.x).",
    "4. **Saqlash:** mobilda Keychain/Keystore, brauzerda HttpOnly cookie. `localStorage` da token XSS uchun ochiq.",
    "5. **Ko'p qurilma:** har qurilma o'z tokeni, \"faol sessiyalar\" ro'yxati va alohida bekor qilish.",
    "6. **MFA:** muhim amallar uchun qo'shimcha tasdiq (step-up).",
    "",
    "### Bitta API, bir nechta usul",
    "Laravel guard'lari bitta ilovada bir nechta autentifikatsiya usulini birga qo'llaydi. `auth:sanctum` o'zi ham session cookie, ham Bearer token'ni qabul qiladi. Server-server endpoint'lari uchun alohida guard yoki Passport `client` middleware.",
    "",
    "### Har holda",
    "- Faqat HTTPS.",
    "- Token faqat `Authorization` header'ida yoki HttpOnly cookie'da.",
    "- Token DB'da hash sifatida (Sanctum avtomatik).",
    "- Login va token berish endpoint'lariga qat'iy rate limit (18.15)."
  ],
  "examples": [
    {
      "title": "Turli iste'molchilar uchun guard'lar",
      "lang": "php",
      "code": [
        "// SPA va mobil: Sanctum (cookie yoki Bearer)",
        "Route::middleware('auth:sanctum')->prefix('v1')->group(function () {",
        "    Route::apiResource('orders', OrderController::class);",
        "});",
        "",
        "// Server-server: Passport client credentials",
        "Route::middleware('client:inventory.sync')->prefix('internal')->group(function () {",
        "    Route::post('stock-updates', StockUpdateController::class);",
        "});",
        "",
        "// Webhook: imzo tekshiruvi",
        "Route::post('webhooks/payme', PaymeWebhookController::class)->middleware('verify.payme.signature');"
      ],
      "note": "`client` middleware'i Passport'ning `CheckClientCredentials` klassi. Laravel 11+ da uni `bootstrap/app.php` ichida alias sifatida ro'yxatdan o'tkazing."
    },
    {
      "title": "Mobil token: muddat va qurilma",
      "lang": "php",
      "code": [
        "public function store(LoginRequest $request)",
        "{",
        "    $user = $request->authenticate();",
        "",
        "    $token = $user->createToken(",
        "        name: $request->string('device_name'),",
        "        abilities: ['orders:read', 'orders:write'],",
        "        expiresAt: now()->addDays(30),",
        "    );",
        "",
        "    return response()->json(['token' => $token->plainTextToken, 'expires_at' => $token->accessToken->expires_at]);",
        "}",
        "",
        "// Faol qurilmalar va bekor qilish",
        "$request->user()->tokens()->whereKey($tokenId)->delete();"
      ]
    }
  ],
  "pitfalls": [
    "SPA uchun token'ni `localStorage` da saqlash: XSS orqali o'g'irlanadi.",
    "Muddatsiz token'lar: o'g'irlangan token abadiy ishlaydi.",
    "Stateless JWT tanlab, bekor qilish mexanizmini o'ylamaslik.",
    "Server-server integratsiya uchun foydalanuvchi parolini ishlatish."
  ]
});
