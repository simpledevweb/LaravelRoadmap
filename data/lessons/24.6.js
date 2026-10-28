/* Chuqur dars: 24.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.6", {
  "lesson": [
    "### Replay hujumi",
    "Hujumchi haqiqiy, to'g'ri imzolangan webhook so'rovini qo'lga kiritib, uni **qayta yuboradi**. Imzo to'g'ri bo'lgani uchun tekshiruvdan o'tadi. Oqibat hodisa turiga bog'liq:",
    "- `payment.succeeded` takrorlansa — buyurtma ikki marta to'langan deb belgilanadi, bonus ikki marta hisoblanadi, mahsulot ikki marta jo'natiladi.",
    "- `balance.topped_up` — hisob ikki marta to'ldiriladi.",
    "- `subscription.renewed` — obuna muddati ikki marta uzaytiriladi.",
    "",
    "### Himoya qatlamlari",
    "**1. Imzolangan vaqt belgisi** (24.5): replay oynasini bir necha daqiqaga toraytiradi.",
    "",
    "**2. Noyob event ID va \"ko'rilgan\" ro'yxat.** Har webhook noyob ID bilan keladi (`X-Webhook-Id`, payload'dagi `id`, GitHub `X-GitHub-Delivery`). Qabul qiluvchi qayta ishlangan ID'larni saqlaydi va takrorini rad etadi (lekin `200` bilan javob beradi, 24.2).",
    "- **DB'da** `UNIQUE (provider, event_id)` — eng ishonchli: parallel ikki so'rov ham bittadan ko'p yozuv yarata olmaydi.",
    "- **Redis'da** `SET NX` bilan TTL (vaqt belgisi tolerance'idan biroz ko'proq). Tez, lekin Redis qayta ishga tushsa, ro'yxat yo'qoladi.",
    "",
    "ID imzolangan qismda bo'lishi kerak (body ichida yoki imzolanadigan satrda), aks holda hujumchi ID'ni o'zgartirib, \"yangi\" hodisa sifatida yuboradi.",
    "",
    "**3. Biznes darajasidagi idempotentlik** (24.7): hatto yangi event ID bilan kelgan bo'lsa ham, \"bu to'lov allaqachon qayd etilgan\" tekshiruvi (to'lovning o'z tashqi ID'si bo'yicha unique). Bu provayderning o'zi bir hodisani turli event ID bilan ikki marta yuborgan holatlarni ham qamraydi.",
    "",
    "**4. Holat mashinasi:** buyurtma `pending → paid` faqat bir marta. `paid` holatidagi buyurtmaga yana `payment.succeeded` kelsa, hech narsa qilinmaydi.",
    "",
    "**5. Joriy holatni API'dan tekshirish** (thin payload, 24.1): muhim amallarda webhook'dagi ma'lumotga emas, provayder API'sidan olingan joriy holatga tayaning.",
    "",
    "### HTTPS",
    "Replay'ning birinchi sharti — so'rovni qo'lga kiritish. Faqat HTTPS endpoint'lar va sertifikatni tekshiruvchi provayderlar bu xavfni sezilarli kamaytiradi. Lekin log'lar, debug vositalari va ichki proxy'lar baribir xavf manbai."
  ],
  "examples": [
    {
      "title": "Unique constraint bilan qabul",
      "lang": "php",
      "code": [
        "// Migratsiya",
        "Schema::create('webhook_events', function (Blueprint $table) {",
        "    $table->id();",
        "    $table->string('provider', 32);",
        "    $table->string('external_id');",
        "    $table->string('type');",
        "    $table->json('payload');",
        "    $table->string('status', 16)->default('pending');",
        "    $table->timestamp('processed_at')->nullable();",
        "    $table->timestamps();",
        "    $table->unique(['provider', 'external_id']);",
        "});",
        "",
        "// Controller",
        "try {",
        "    $event = WebhookEvent::create([",
        "        'provider' => 'click', 'external_id' => $request->input('click_trans_id'),",
        "        'type' => $request->input('action'), 'payload' => $request->all(),",
        "    ]);",
        "    ProcessClickWebhook::dispatch($event);",
        "} catch (UniqueConstraintViolationException) {",
        "    // replay yoki provayder retry'i: qayta ishlamaymiz",
        "}",
        "",
        "return response()->json(['ok' => true]);"
      ],
      "note": "Click kabi provayderlarda javob formati spetsifikatsiyada qat'iy belgilangan. Bu soddalashtirilgan namuna."
    },
    {
      "title": "Redis bilan qisqa muddatli ro'yxat",
      "lang": "php",
      "code": [
        "$key = \"webhook:seen:{$provider}:{$eventId}\";",
        "",
        "// 10 daqiqa: vaqt tolerance'i (5 daq) dan uzunroq",
        "if (! Redis::set($key, 1, 'EX', 600, 'NX')) {",
        "    return response()->noContent();   // takroriy",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Faqat imzo bilan cheklanish: to'g'ri imzolangan eski so'rov qayta qabul qilinadi.",
    "Event ID'ni imzolanmagan header'dan olish: hujumchi uni o'zgartiradi.",
    "Dublikat tekshiruvini \"avval SELECT, keyin INSERT\" bilan qilish: parallel so'rovlarda race condition. Unique constraint ishlating.",
    "Biznes darajasida idempotentlik yo'qligi: provayder o'zi turli ID bilan qayta yuborganda ikki marta qayta ishlanadi."
  ]
});
