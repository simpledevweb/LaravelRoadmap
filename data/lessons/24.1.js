/* Chuqur dars: 24.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.1", {
  "lesson": [
    "### Webhook nima",
    "Webhook — \"teskari API\": biror hodisa yuz berganda **provayder** (to'lov tizimi, GitHub, Telegram, sizning servisingiz) oldindan ro'yxatdan o'tkazilgan URL'ga HTTP POST so'rovi yuboradi. Iste'molchi so'rov kutmasdan, hodisa haqida darhol xabar oladi.",
    "",
    "Muqobili — **polling**: iste'molchi har N soniyada \"yangilik bormi?\" deb so'raydi. Ko'p keraksiz so'rovlar, kechikish va rate limit muammolari. Webhook'lar real vaqtga yaqin va samarali, lekin o'z murakkabliklari bor.",
    "",
    "### Ikki tomon",
    "1. **Inbound (qabul qilish):** siz tashqi provayderdan webhook olasiz (Payme, Click, Stripe, Telegram Bot API, GitHub). Asosiy vazifalar: haqiqiyligini tekshirish (24.3), tez javob berish, takrorlanishlarni boshqarish (24.7) va ishonchli qayta ishlash (24.14).",
    "2. **Outbound (yuborish):** sizning tizimingiz mijozlarga webhook yuboradi (\"buyurtma jo'natildi\"). Vazifalar: imzolash, retry (24.9), yetkazish holatini kuzatish (24.13), SSRF'dan himoya (24.19).",
    "",
    "### Arxitekturaviy xususiyatlar",
    "- **Asinxron va ishonchsiz tarmoq:** so'rov yo'qolishi, kechikishi, **takrorlanishi** va **tartibsiz** kelishi mumkin.",
    "- **At-least-once yetkazish** (24.11): ko'p provayderlar javob olmaguncha qayta yuboradi. Natijada bir hodisa bir necha marta kelishi mumkin.",
    "- **Ochiq endpoint:** URL'ni internetdagi har kim chaqira oladi. Autentifikatsiya cookie yoki token orqali emas, **imzo** orqali.",
    "- **Vaqt chegarasi:** provayder odatda 5–30 soniya kutadi. Javob kechiksa, xato deb hisoblab, qayta yuboradi.",
    "",
    "### Payload turlari",
    "- **Fat (to'liq) payload:** hodisa va barcha kerakli ma'lumot body'da. Qulay, lekin ma'lumot eskirgan bo'lishi mumkin.",
    "- **Thin (yupqa) payload:** faqat hodisa turi va resurs ID'si. Iste'molchi API orqali joriy holatni o'zi oladi. Xavfsizroq (imzo buzilgan bo'lsa ham, haqiqiy ma'lumot API'dan) va tartib muammolarini kamaytiradi, lekin qo'shimcha so'rov.",
    "",
    "### Tipik oqim (inbound)",
    "1. Provayder POST yuboradi.",
    "2. Endpoint imzoni va vaqtni tekshiradi.",
    "3. Hodisani DB'ga yozadi (event ID bilan, unique).",
    "4. Job'ni navbatga qo'yadi.",
    "5. Darhol `200` qaytaradi (bir necha millisekund).",
    "6. Worker job'ni qayta ishlaydi: idempotent, retry bilan."
  ],
  "examples": [
    {
      "title": "Webhook so'rovi namunasi",
      "lang": "http",
      "code": [
        "POST /webhooks/payments HTTP/1.1",
        "Host: api.example.uz",
        "Content-Type: application/json",
        "X-Webhook-Id: evt_01J2K8...",
        "X-Webhook-Timestamp: 1749553200",
        "X-Webhook-Signature: v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd",
        "",
        "{",
        "  \"id\": \"evt_01J2K8...\",",
        "  \"type\": \"payment.succeeded\",",
        "  \"created_at\": \"2025-06-10T09:00:00Z\",",
        "  \"data\": { \"payment_id\": \"pay_01J2...\", \"order_id\": \"ord_01J0...\", \"amount\": 150000, \"currency\": \"UZS\" }",
        "}"
      ]
    },
    {
      "title": "Qabul qilish: tez javob, keyin qayta ishlash",
      "lang": "php",
      "code": [
        "Route::post('webhooks/payments', function (Request $request) {",
        "    // 1-2: imzo va vaqt (middleware'da, 24.3)",
        "",
        "    // 3: saqlash, dublikat bo'lsa ham 200",
        "    $event = WebhookEvent::firstOrCreate(",
        "        ['provider' => 'payments', 'external_id' => $request->input('id')],",
        "        ['type' => $request->input('type'), 'payload' => $request->all(), 'status' => 'pending'],",
        "    );",
        "",
        "    // 4: navbatga",
        "    if ($event->wasRecentlyCreated) {",
        "        ProcessPaymentWebhook::dispatch($event);",
        "    }",
        "",
        "    // 5: darhol",
        "    return response()->noContent();",
        "})->middleware('webhook.signature:payments');"
      ]
    }
  ],
  "pitfalls": [
    "Webhook'ni bir marta va tartib bilan keladi deb hisoblash.",
    "Butun biznes mantiqni so'rov ichida sinxron bajarish: timeout va qayta yuborishlar.",
    "Endpoint'ni imzo tekshiruvisiz ochiq qoldirish.",
    "Fat payload'dagi ma'lumotga joriy holat sifatida ishonish, muhim holatlarda API orqali tekshirmaslik."
  ]
});
