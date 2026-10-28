/* Chuqur dars: 21.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.4", {
  "lesson": [
    "### Foydalanuvchisiz kirish",
    "Client Credentials grant — **machine-to-machine** (M2M) kirish uchun. Foydalanuvchi, brauzer va rozilik ekrani yo'q. Client **o'z nomidan** ishlaydi: ombor servisi buyurtma servisidan ma'lumot oladi, cron job hisobot API'siga yozadi, hamkor tizimi sizning API'ngizga sinxronizatsiya qiladi.",
    "",
    "### Oqim",
    "1. Client o'zini tasdiqlab, token so'raydi:",
    "   `POST /oauth/token` + `grant_type=client_credentials&scope=inventory:write`",
    "   + client autentifikatsiyasi (quyida).",
    "2. AS client'ni tekshiradi va ruxsat etilgan scope'lar bilan access token beradi. **Refresh token berilmaydi**: client har doim qayta so'ray oladi.",
    "3. Client token'ni keshlaydi va muddati tugashidan oldin yangisini oladi.",
    "4. API chaqiruvlari `Bearer` bilan.",
    "",
    "### Client autentifikatsiyasi usullari",
    "- **`client_secret_basic`:** `Authorization: Basic base64(client_id:client_secret)`. Eng keng tarqalgan.",
    "- **`client_secret_post`:** body'da `client_id` va `client_secret`.",
    "- **`private_key_jwt`** (RFC 7523): client o'z shaxsiy kaliti bilan imzolangan qisqa JWT yuboradi. AS faqat ochiq kalitni biladi va umumiy sir yo'q. Kuchliroq.",
    "- **mTLS** (RFC 8705): client TLS sertifikati bilan tasdiqlanadi. Bank va hukumat integratsiyalari.",
    "",
    "### Token'da kim bor",
    "Token `sub` sifatida client'ning o'zini ko'rsatadi (foydalanuvchi emas). Resource server buni farqlashi kerak: `$request->user()` `null` bo'ladi. Passport'da `client` middleware (`CheckClientCredentials`) va `$request->attributes` yoki token'dagi `client_id` orqali client'ni aniqlash.",
    "",
    "Avtorizatsiya client darajasida: qaysi client qaysi scope'larni ola oladi. Uni AS'da cheklang (client'ga ruxsat etilgan scope'lar ro'yxati). Aks holda har client o'zi xohlagan scope'ni so'raydi.",
    "",
    "### Xavfsizlik",
    "- `client_secret` — kuchli parol kabi: secret manager'da, rotatsiya bilan (20.20).",
    "- Har servis va integratsiya **alohida** client: alohida scope, alohida audit, bittasini bekor qilish boshqasiga ta'sir qilmaydi.",
    "- Qisqa muddatli access token (5–60 daqiqa) va keshlash: har so'rovda yangi token so'ramang (AS'ga yuk), lekin muddatini kuzating.",
    "- Iloji bo'lsa, umumiy sir o'rniga `private_key_jwt` yoki mTLS.",
    "",
    "### API key bilan farqi",
    "API key (20.4) ham M2M uchun. Client credentials afzalligi: standart, qisqa muddatli token'lar (sizib chiqqan token tez eskiradi), scope'lar, markazlashgan AS va bekor qilish. Kamchiligi: qo'shimcha infratuzilma va token olish qadami."
  ],
  "examples": [
    {
      "title": "Client tomonida: token olish va keshlash",
      "lang": "php",
      "code": [
        "final class InventoryApi",
        "{",
        "    private function token(): string",
        "    {",
        "        return Cache::remember('oauth:inventory:token', now()->addMinutes(50), function () {",
        "            return Http::asForm()",
        "                ->withBasicAuth(config('services.inventory.client_id'), config('services.inventory.client_secret'))",
        "                ->post('https://auth.example.uz/oauth/token', [",
        "                    'grant_type' => 'client_credentials',",
        "                    'scope' => 'inventory:write',",
        "                ])",
        "                ->throw()",
        "                ->json('access_token');",
        "        });",
        "    }",
        "",
        "    public function push(array $stock): void",
        "    {",
        "        $res = Http::withToken($this->token())->post('https://api.example.uz/internal/stock', $stock);",
        "",
        "        if ($res->status() === 401) {          // token muddatidan oldin bekor qilingan",
        "            Cache::forget('oauth:inventory:token');",
        "            $res = Http::withToken($this->token())->post('https://api.example.uz/internal/stock', $stock);",
        "        }",
        "",
        "        $res->throw();",
        "    }",
        "}"
      ],
      "note": "Kesh muddati token muddatidan (`expires_in`, bu yerda 60 daqiqa deb faraz qilingan) biroz qisqa bo'lsin. 401 bo'lsa, kesh tozalanadi va bir marta yangi token bilan qayta urinadi."
    },
    {
      "title": "Resource server tomonida (Passport)",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "$middleware->alias(['client' => \\Laravel\\Passport\\Http\\Middleware\\CheckClientCredentials::class]);",
        "",
        "// routes/api.php",
        "Route::middleware('client:inventory:write')",
        "    ->post('internal/stock', StockUpdateController::class);"
      ],
      "note": "Passport 12+ da middleware nomlari o'zgargan bo'lishi mumkin (`EnsureClientIsResourceOwner`). O'rnatilgan versiya hujjatini tekshiring."
    }
  ],
  "pitfalls": [
    "Barcha servislar uchun bitta umumiy client: biri sizsa, hammasi xavf ostida.",
    "Har API so'rovidan oldin yangi token so'rash: AS'ga ortiqcha yuk.",
    "Client'ga ruxsat etilgan scope'larni AS'da cheklamaslik.",
    "M2M endpoint'larida `$request->user()` mavjud deb kod yozish."
  ]
});
