/* Chuqur dars: 24.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.11", {
  "lesson": [
    "### Uchta kafolat darajasi",
    "1. **At-most-once (ko'pi bilan bir marta):** yuboriladi va qayta urinilmaydi. Yo'qolishi mumkin, lekin dublikat yo'q. \"Fire and forget\". Muhim bo'lmagan bildirishnomalar uchun.",
    "2. **At-least-once (kamida bir marta):** muvaffaqiyat tasdiqlanmaguncha qayta urinish. Yo'qolmaydi (cheklangan vaqt ichida), lekin **dublikatlar bo'lishi mumkin**. Webhook'lar uchun amaldagi standart.",
    "3. **Exactly-once (aynan bir marta):** taqsimlangan tizimda tarmoq orqali **kafolatlab bo'lmaydi**. Yuboruvchi javob olmasa, so'rov yetib bordimi yoki yo'qmi, bila olmaydi (Ikki general muammosi). Amalda \"exactly-once **qayta ishlash**\" = at-least-once yetkazish + idempotent iste'molchi (24.7).",
    "",
    "### At-least-once'ning yashirin sharti",
    "\"Kamida bir marta\" faqat yuboruvchi hodisani **yo'qotmasa** ishlaydi. Klassik xato:",
    "1. Buyurtma DB'ga yozildi va commit qilindi.",
    "2. Webhook yuborish job'i dispatch qilinmoqda — jarayon qulaydi.",
    "3. Webhook hech qachon yuborilmaydi.",
    "",
    "Yoki aksincha: job dispatch qilindi, keyin tranzaksiya rollback — mavjud bo'lmagan buyurtma haqida webhook.",
    "",
    "Yechim — **transactional outbox** (17.18): webhook yozuvi (`webhook_deliveries`) asosiy o'zgarish bilan **bir tranzaksiyada** saqlanadi, keyin relay yoki scheduler ularni yuboradi. Laravel'da `afterCommit()` ikkinchi muammoni hal qiladi, lekin commit va dispatch orasidagi qulashni emas.",
    "",
    "### Tartib kafolati",
    "Ko'p webhook tizimlari **tartibni kafolatlamaydi**: parallel worker'lar, turli retry jadvallari va tarmoq tufayli `order.updated` (v2) v1 dan oldin kelishi mumkin. Variantlar:",
    "- Kafolat bermaslik va buni hujjatda aytish. Iste'molchi versiya yoki vaqt bo'yicha boshqaradi (24.8). Eng keng tarqalgan.",
    "- Bitta resurs uchun ketma-ket yetkazish (agregat ID bo'yicha bitta navbat yoki lock). Bitta muvaffaqiyatsiz webhook o'sha resursning keyingilarini bloklaydi.",
    "",
    "### Iste'molchiga hujjat",
    "Aniq yozing:",
    "- Yetkazish: at-least-once, N soat davomida.",
    "- Dublikatlar bo'lishi mumkin: `X-Webhook-Id` bo'yicha deduplikatsiya qiling.",
    "- Tartib kafolatlanmaydi: `data.version` yoki `occurred_at` dan foydalaning.",
    "- Muhim holatlar uchun API orqali joriy holatni tekshiring.",
    "- Muvaffaqiyatsiz yetkazishlarni dashboard'da ko'rish va qayta yuborish mumkin.",
    "",
    "### Reconciliation",
    "Webhook'larga to'liq tayanmang: ular yo'qolishi (ikkala tomondagi xatolar) mumkin. Muhim integratsiyalarda davriy **moslashtirish** job'i: provayder API'sidan oxirgi davrdagi o'zgarishlarni olib, lokal holat bilan solishtiradi. Masalan, har soatda oxirgi 2 soatdagi to'lovlarni tekshirish."
  ],
  "examples": [
    {
      "title": "Outbox bilan at-least-once",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($order) {",
        "    $order->update(['status' => OrderStatus::Shipped]);",
        "",
        "    foreach ($order->tenant->webhookEndpoints()->subscribedTo('order.shipped')->get() as $endpoint) {",
        "        WebhookDelivery::create([",
        "            'endpoint_id' => $endpoint->id,",
        "            'event_id' => (string) Str::ulid(),",
        "            'type' => 'order.shipped',",
        "            'payload' => ['order_id' => $order->public_id, 'version' => $order->version],",
        "            'status' => 'pending',",
        "        ]);",
        "    }",
        "});",
        "",
        "// Relay: har daqiqada, pending'larni navbatga",
        "Schedule::call(function () {",
        "    WebhookDelivery::where('status', 'pending')->whereNull('queued_at')",
        "        ->limit(500)->get()",
        "        ->each(function (WebhookDelivery $d) {",
        "            $d->update(['queued_at' => now()]);",
        "            DeliverWebhook::dispatch($d);",
        "        });",
        "})->everyMinute()->withoutOverlapping();"
      ],
      "note": "Relay va job orasida ham qulash bo'lishi mumkin: `queued_at` qo'yilgan, lekin job yo'qolgan yozuvlarni (masalan, 10 daqiqadan eski va hali `pending`) qayta navbatga qo'yuvchi tekshiruv qo'shing."
    },
    {
      "title": "Reconciliation job",
      "lang": "php",
      "code": [
        "Schedule::call(function (PaymentGateway $gateway) {",
        "    foreach ($gateway->listPayments(since: now()->subHours(2)) as $remote) {",
        "        $local = Payment::where('external_id', $remote->id)->first();",
        "",
        "        if (! $local || $local->status !== $remote->status) {",
        "            Log::warning('Payment drift', ['id' => $remote->id]);",
        "            app(PaymentSync::class)->apply($remote);",
        "        }",
        "    }",
        "})->hourly();"
      ]
    }
  ],
  "pitfalls": [
    "Exactly-once yetkazishni va'da qilish yoki kutish.",
    "Webhook yuborishni tranzaksiyadan keyin oddiy dispatch bilan qilish: qulashda yo'qoladi.",
    "Tartib kafolatlanmasligini hujjatda aytmaslik.",
    "Muhim integratsiyalarda reconciliation'siz faqat webhook'larga tayanish."
  ]
});
