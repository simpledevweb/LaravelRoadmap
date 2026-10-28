/* Chuqur dars: 19.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.13", {
  "lesson": [
    "### Rate limit — ommaviy siyosat",
    "Texnik amalga oshirish 18.15 va 18.21 da. Dizayn nuqtai nazaridan rate limit — mijozlar bilan **oshkora kelishuv**: ular qancha so'rov yubora olishini oldindan bilishi va integratsiyasini shunga moslab qurishi kerak.",
    "",
    "### Siyosat elementlari",
    "1. **Kalit:** API key, foydalanuvchi, OAuth klient yoki IP. Ommaviy API'da odatda API key yoki klient.",
    "2. **Oyna va hajm:** `1000 so'rov / daqiqa`. Bir nechta oyna birga: daqiqalik va soatlik.",
    "3. **Endpoint guruhlari:** o'qish yumshoqroq, yozish qat'iyroq, og'ir endpoint'lar (qidiruv, eksport) alohida, autentifikatsiya juda qat'iy.",
    "4. **Tarif rejalari:** free, pro, enterprise. Enterprise uchun individual limitlar.",
    "5. **Concurrency limit:** bir vaqtda nechta parallel so'rov. Og'ir endpoint'lar uchun foydali.",
    "6. **Javob header'lari** va `429` formati.",
    "",
    "### Header'lar",
    "Har javobda (faqat 429 da emas):",
    "- `RateLimit-Limit` / `X-RateLimit-Limit`: oyna limiti.",
    "- `RateLimit-Remaining` / `X-RateLimit-Remaining`: qolgan so'rovlar.",
    "- `RateLimit-Reset` / `X-RateLimit-Reset`: oyna qachon yangilanadi.",
    "- 429 da `Retry-After`.",
    "",
    "IETF `RateLimit` header'lari draft holatida. Ko'p API'lar `X-` prefiksli versiyani ishlatadi. Laravel default'da `X-RateLimit-Limit` va `X-RateLimit-Remaining` qo'shadi. Bittasini tanlang va hujjatlang.",
    "",
    "### Mijozga tavsiyalar (hujjatda)",
    "- `RateLimit-Remaining` ni kuzatib, limitga yaqinlashganda sekinlashish.",
    "- 429 da `Retry-After` ga rioya qilish.",
    "- Eksponensial backoff + jitter (17.13).",
    "- Ko'p kichik so'rov o'rniga bulk endpoint'lar (19.16) va webhook'lar (polling o'rniga).",
    "",
    "### Maxsus iste'molchilar",
    "- **Ichki servislar:** alohida, yuqoriroq limit yoki tarmoq darajasida ruxsat.",
    "- **Webhook qabul qiluvchilar** (siz qabul qilsangiz): provayder bir vaqtda ko'p yuborishi mumkin. Yengil limit va tez `200` bilan javob, keyin navbatda qayta ishlash.",
    "- **Monitoring va health check:** limitdan tashqarida.",
    "",
    "### Monitoring",
    "Kim qancha 429 olayotganini kuzating:",
    "- Ko'p mijozlar limitga urilsa — limit juda past yoki API \"chatty\" (bulk endpoint kerak).",
    "- Bitta mijoz doimiy urilsa — integratsiya xatosi (cheksiz sikl) yoki suiiste'mol. Bog'laning yoki bloklang.",
    "- Limitni o'zgartirish ham shartnoma o'zgarishi: pasaytirishni oldindan e'lon qiling."
  ],
  "examples": [
    {
      "title": "Hujjatdagi limitlar jadvali",
      "lang": "text",
      "code": [
        "Rate limitlar (API key bo'yicha)",
        "",
        "Guruh               Free        Pro          Enterprise",
        "O'qish (GET)        60/daq      1000/daq     kelishuv bo'yicha",
        "Yozish              20/daq      300/daq      kelishuv bo'yicha",
        "Qidiruv, eksport    5/daq       60/daq       kelishuv bo'yicha",
        "",
        "Har javobda: X-RateLimit-Limit, X-RateLimit-Remaining",
        "429 da: Retry-After (soniya), body code=rate_limited"
      ]
    },
    {
      "title": "Guruh va tarif bo'yicha limitlar",
      "lang": "php",
      "code": [
        "RateLimiter::for('api-read', fn (Request $r) => Limit::perMinute(",
        "    $r->user()?->plan->readLimit() ?? 60",
        ")->by('read:' . ($r->user()?->id ?? $r->ip())));",
        "",
        "RateLimiter::for('api-write', fn (Request $r) => Limit::perMinute(",
        "    $r->user()?->plan->writeLimit() ?? 20",
        ")->by('write:' . $r->user()?->id)->response(fn (Request $r, array $headers) => response()->json([",
        "    'code' => 'rate_limited',",
        "    'message' => 'So\\'rovlar limiti tugadi',",
        "], 429, $headers)));",
        "",
        "Route::middleware(['auth:sanctum', 'throttle:api-read'])->get('orders', ...);",
        "Route::middleware(['auth:sanctum', 'throttle:api-write'])->post('orders', ...);"
      ]
    }
  ],
  "pitfalls": [
    "Limitlarni hujjatlashtirmaslik: mijozlar faqat 429 orqali bilib oladi.",
    "Limit header'larini faqat 429 javobida berish: mijoz oldindan sekinlasha olmaydi.",
    "Barcha endpoint'larga bitta umumiy limit: og'ir eksport oddiy o'qishni bloklaydi.",
    "Limitni ogohlantirmasdan pasaytirish."
  ]
});
