/* Chuqur dars: 24.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.14", {
  "lesson": [
    "### Nega navbat",
    "Inbound webhook'ni so'rov ichida sinxron qayta ishlash (DB yozuvlari, email, tashqi API chaqiruvlari, PDF yaratish) muammolar beradi:",
    "- **Timeout:** provayder 5–30 soniya kutadi. Ishingiz uzoqroq bo'lsa, provayder xato deb hisoblaydi va qayta yuboradi, siz esa ishni ikki marta bajarasiz.",
    "- **Portlashlar:** provayder bir vaqtda minglab hodisa yuborsa (ommaviy import, kun oxiri), barcha FPM worker'lar band va sayt to'xtaydi.",
    "- **Xatolar:** qayta ishlashda xato bo'lsa, `500` qaytadi va provayder retry'iga tayanasiz, ular esa sizning nazoratingizda emas.",
    "",
    "### Naqsh: \"qabul qil, saqla, navbatga qo'y, javob ber\"",
    "1. **Endpoint** (tez, bir necha ms): imzo va vaqt tekshiruvi → hodisani DB'ga yozish (unique event ID bilan) → job dispatch → `200`.",
    "2. **Worker** (o'z tezligida): job hodisani DB'dan oladi va qayta ishlaydi. Idempotent (24.7), o'z retry siyosati bilan (backoff), xatolar log va dead letter'ga (24.16).",
    "",
    "Muhim: hodisa **avval DB'ga** yoziladi, keyin navbatga. Navbat (Redis) yo'qolsa ham, hodisa DB'da `pending` holatida qoladi va uni qayta navbatga qo'yish mumkin. Faqat payload'ni job'ga qo'yib, DB'ga yozmaslik — Redis muammosida hodisa yo'qoladi va provayder uni qayta yubormaydi (siz `200` bergansiz).",
    "",
    "### Navbat sozlamalari",
    "- **Alohida navbat:** `webhooks` yoki provayder bo'yicha (`webhooks-payments`). Boshqa job'lar (email, eksport) ularni sekinlashtirmasin.",
    "- **Worker soni:** portlashlarni yutish uchun yetarli, lekin DB va tashqi API'ni bo'g'maslik uchun cheklangan.",
    "- **Ustuvorlik:** to'lov webhook'lari — yuqori, analitika — past (`--queue=webhooks-high,webhooks-low`).",
    "- **`$tries`, `$backoff`, `retryUntil()`** (24.9, 24.10).",
    "- **`$timeout`** va queue `retry_after` (19.17).",
    "- Bir resurs bo'yicha tartib kerak bo'lsa: `WithoutOverlapping` middleware'i resurs ID bilan yoki `ShouldBeUnique`.",
    "",
    "### Kuzatish",
    "Laravel Horizon (47.x): navbat uzunligi, kutish vaqti, muvaffaqiyatsiz job'lar. Alert: `webhooks` navbatida kutish vaqti N daqiqadan oshsa.",
    "",
    "### Istisno: sinxron javob kerak bo'lganda",
    "Ba'zi protokollar (Payme Merchant API, 24.2) javobda qaror talab qiladi: \"tranzaksiya yaratildi, holat X\". U holda kerakli minimal DB amallarini sinxron va tez bajaring (indekslangan so'rovlar, qisqa tranzaksiya), qolganini (email, bildirishnomalar, analitika) navbatga."
  ],
  "examples": [
    {
      "title": "Endpoint va job",
      "lang": "php",
      "code": [
        "// Endpoint",
        "public function __invoke(Request $request): Response",
        "{",
        "    $event = WebhookEvent::firstOrCreate(",
        "        ['provider' => 'payments', 'external_id' => $request->input('id')],",
        "        ['type' => $request->input('type'), 'payload' => $request->all(), 'status' => 'pending'],",
        "    );",
        "",
        "    if ($event->wasRecentlyCreated) {",
        "        ProcessPaymentWebhook::dispatch($event)->onQueue('webhooks-high');",
        "    }",
        "",
        "    return response()->noContent();",
        "}",
        "",
        "// Navbatga tushmay qolganlarni qayta yuborish (Redis muammosidan keyin)",
        "Schedule::call(fn () => WebhookEvent::where('status', 'pending')",
        "    ->where('created_at', '<', now()->subMinutes(10))",
        "    ->limit(200)->get()",
        "    ->each(fn ($e) => ProcessPaymentWebhook::dispatch($e)->onQueue('webhooks-high'))",
        ")->everyFiveMinutes();"
      ],
      "note": "Qayta yuborilgan job idempotent bo'lgani uchun (24.7) ikki marta navbatga tushsa ham xavfsiz."
    },
    {
      "title": "Worker va Horizon sozlamalari",
      "lang": "php",
      "code": [
        "// config/horizon.php",
        "'environments' => [",
        "    'production' => [",
        "        'webhooks' => [",
        "            'connection' => 'redis',",
        "            'queue' => ['webhooks-high', 'webhooks-low'],",
        "            'balance' => 'auto',",
        "            'minProcesses' => 2,",
        "            'maxProcesses' => 10,",
        "            'tries' => 5,",
        "            'timeout' => 60,",
        "        ],",
        "    ],",
        "],",
        "",
        "'waits' => ['redis:webhooks-high' => 60],   // 60 s dan ko'p kutish — alert"
      ]
    }
  ],
  "pitfalls": [
    "Og'ir qayta ishlashni webhook so'rovi ichida bajarish.",
    "Hodisani faqat navbatga qo'yib, DB'ga yozmaslik: Redis muammosida yo'qoladi.",
    "Webhook job'larini umumiy navbatda qoldirish: boshqa job'lar ularni kechiktiradi.",
    "Job `$timeout` va queue `retry_after` nomuvofiqligi: bir hodisa parallel ikki marta qayta ishlanadi."
  ]
});
