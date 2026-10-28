/* Chuqur dars: 24.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.18", {
  "lesson": [
    "### Siz provayder bo'lganingizda",
    "Mijozlaringizga webhook yuborish — sizning tizimingiz ma'lumotni **tashqariga** chiqaradi va **siz tanlamagan** URL'larga so'rov yuboradi. Ikki yo'nalishda xavf: mijozni himoya qilish (soxta webhook'lar, ma'lumot sizishi) va o'zingizni himoya qilish (SSRF, resurslarni isrof qilish).",
    "",
    "### Mijozni himoya qilish",
    "**1. Imzo** (24.3, 24.4): har webhook HMAC-SHA256 bilan, **har endpoint uchun alohida** secret. Imzolanadigan satr: `{event_id}.{timestamp}.{body}`. Mijozlarga tekshiruv kodi namunalari (PHP, Node, Python).",
    "",
    "**2. Vaqt belgisi va event ID** (24.5, 24.6): replay himoyasi uchun.",
    "",
    "**3. Faqat HTTPS endpoint'lar.** `http://` URL'larni ro'yxatdan o'tkazishga ruxsat bermang (lokal test uchun alohida sandbox rejimidan tashqari). Sertifikatni tekshiring (`verify => true`, default).",
    "",
    "**4. Minimal payload.** Mijozga kerak bo'lgan minimal ma'lumot. Shaxsiy ma'lumot va maxfiy maydonlar emas. Thin payload (24.1) + API orqali to'liq ma'lumot — xavfsizroq: webhook URL'i noto'g'ri sozlansa ham, faqat ID'lar sizadi.",
    "",
    "**5. Secret boshqaruvi:** mijoz dashboard'da secret'ni ko'radi, almashtiradi. Rotatsiya davrida ikkala secret bilan imzolash (`v1=sig1,v1=sig2`).",
    "",
    "**6. Endpoint egaligini tasdiqlash** (ixtiyoriy): ro'yxatdan o'tkazishda challenge so'rovi (mijoz endpoint'i tasodifiy qiymatni qaytarishi kerak). Boshqa birovning URL'ini ro'yxatdan o'tkazib, unga trafik yo'naltirishni oldini oladi.",
    "",
    "### O'zingizni himoya qilish",
    "**1. SSRF** (24.19) — eng muhim: mijoz URL sifatida `http://169.254.169.254/` yoki `http://localhost:6379` kiritsa, sizning serveringiz ichki resurslarga so'rov yuboradi.",
    "",
    "**2. Resurslar:** timeout'lar (24.15), javob hajmi chegarasi, redirect'larni kuzatmaslik, endpoint bo'yicha rate limit, circuit breaker va ishlamaydigan endpoint'larni o'chirish (24.13).",
    "",
    "**3. Izolyatsiya:** webhook yuborish alohida worker'larda va alohida navbatda. Ideal holda alohida tarmoq segmentida yoki egress proxy orqali (masalan, Smokescreen): faqat ommaviy internetga chiqish, ichki tarmoqqa emas.",
    "",
    "**4. Header'lar:** `User-Agent: YourApp-Webhooks/1.0` — mijoz sizning so'rovlaringizni tanishi va firewall'da ruxsat berishi uchun. Chiquvchi IP'larni e'lon qilish (mijoz allowlist qila olishi uchun).",
    "",
    "### Standard Webhooks",
    "standardwebhooks.com spetsifikatsiyasi: `webhook-id`, `webhook-timestamp`, `webhook-signature` header'lari va imzo formati. Unga rioya qilish mijozlarga tayyor kutubxonalardan foydalanish imkonini beradi."
  ],
  "examples": [
    {
      "title": "Endpoint ro'yxatdan o'tkazish validatsiyasi",
      "lang": "php",
      "code": [
        "public function store(Request $request, UrlSafetyChecker $checker)",
        "{",
        "    $data = $request->validate([",
        "        'url' => ['required', 'url:https', 'max:2048'],",
        "        'events' => ['required', 'array', 'min:1'],",
        "        'events.*' => [Rule::in(WebhookEventType::values())],",
        "    ]);",
        "",
        "    abort_unless($checker->isPublic($data['url']), 422, 'URL ommaviy internet manzili bo\\'lishi kerak');   // 24.19",
        "",
        "    $endpoint = $request->user()->tenant->webhookEndpoints()->create([",
        "        ...$data,",
        "        'secret' => 'whsec_' . Str::random(40),",
        "    ]);",
        "",
        "    return WebhookEndpointResource::make($endpoint)->additional(['secret' => $endpoint->secret]);   // bir marta",
        "}"
      ],
      "note": "`url:https` qoidasi Laravel 10.x+ da. Endpoint modelida `secret` uchun `encrypted` cast."
    },
    {
      "title": "Mijozlarga beriladigan tekshiruv namunasi",
      "lang": "php",
      "code": [
        "// Mijoz kodi (PHP)",
        "$id = $_SERVER['HTTP_WEBHOOK_ID'];",
        "$ts = (int) $_SERVER['HTTP_WEBHOOK_TIMESTAMP'];",
        "$body = file_get_contents('php://input');",
        "",
        "if (abs(time() - $ts) > 300) {",
        "    http_response_code(401); exit;",
        "}",
        "",
        "$expected = 'v1,' . base64_encode(hash_hmac('sha256', \"{$id}.{$ts}.{$body}\", base64_decode(substr($secret, 6)), true));",
        "",
        "$valid = false;",
        "foreach (explode(' ', $_SERVER['HTTP_WEBHOOK_SIGNATURE']) as $sig) {",
        "    $valid = $valid || hash_equals($expected, $sig);",
        "}",
        "",
        "http_response_code($valid ? 200 : 401);"
      ],
      "note": "Bu Standard Webhooks formatiga yaqin namuna (`whsec_` prefiksli base64 secret, `v1,` bilan boshlanuvchi imzolar bo'shliq bilan ajratilgan)."
    }
  ],
  "pitfalls": [
    "Barcha mijozlar uchun bitta umumiy imzo secret'i.",
    "`http://` endpoint'larga yuborish.",
    "Webhook payload'iga to'liq shaxsiy ma'lumot qo'yish.",
    "Mijoz kiritgan URL'ni tekshirmasdan so'rov yuborish (SSRF)."
  ]
});
