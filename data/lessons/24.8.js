/* Chuqur dars: 24.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.8", {
  "lesson": [
    "### Dublikatlarni aniqlash",
    "Dublikat hodisa — bir xil voqea haqida ikkinchi (yoki undan ko'p) yetkazish. Uni aniqlash kaliti:",
    "1. **Provayder event ID'si** (`id`, `X-Webhook-Id`, `X-GitHub-Delivery`) — eng ishonchli, agar provayder retry'da bir xil ID ishlatsa (ko'pchilik shunday qiladi).",
    "2. **Biznes kaliti:** to'lov ID'si + hodisa turi (`pay_123:succeeded`). Event ID bo'lmasa yoki provayder har retry'da yangisini bersa.",
    "3. **Payload hash'i** — oxirgi chora: `sha256(body)`. Body'da vaqt belgisi kabi o'zgaruvchan maydon bo'lsa, ishlamaydi.",
    "",
    "### Qayerda deduplikatsiya qilish",
    "**Qabul qilishda (endpoint):** `webhook_events` jadvalida `UNIQUE (provider, external_id)`. Ikkinchi so'rov INSERT'da rad etiladi, job dispatch qilinmaydi va `200` qaytariladi. Tez va arzon.",
    "",
    "**Qayta ishlashda (job):** `processed_at` va lock bilan tekshiruv (24.7). Queue o'zi job'ni takrorlasa ham himoya.",
    "",
    "**Biznes darajasida:** unique kalitlar va holat mashinasi. Oxirgi va eng muhim himoya chizig'i.",
    "",
    "Uchalasi birga — \"defense in depth\".",
    "",
    "### Parallel dublikatlar",
    "Provayder bir hodisani bir vaqtda ikki marta yuborishi mumkin (ikki so'rov millisekund farq bilan). \"Avval `exists()` tekshir, keyin `create()`\" ikkalasini ham o'tkazib yuboradi (race condition, 17.8). Yechim: **unique constraint** va `UniqueConstraintViolationException` ni ushlash, yoki `insertOrIgnore`, yoki `Cache::lock`.",
    "",
    "### Tartibsiz hodisalar",
    "Hodisalar yuborilgan tartibda kelmasligi mumkin: `order.updated` (v2) `order.updated` (v1) dan oldin kelishi, `payment.refunded` `payment.succeeded` dan oldin kelishi. Strategiyalar:",
    "- **Versiya yoki vaqt bo'yicha:** payload'dagi `version` yoki `updated_at` bilan solishtirish. Eskisi kelsa — e'tiborsiz qoldirish (\"last write wins\" versiya bo'yicha).",
    "- **Holat mashinasi:** noto'g'ri tartibdagi o'tish (`refunded` → `succeeded`) rad etiladi yoki job keyinroq qayta uriniladi (`release(30)`).",
    "- **Thin payload + API:** hodisa faqat \"o'zgarish bo'ldi\" signali. Har safar provayder API'sidan **joriy** holatni olish. Tartib muammosi yo'qoladi.",
    "",
    "### Saqlash muddati",
    "Event ID'larni qancha saqlash kerak: provayder retry qiladigan maksimal muddatdan uzoqroq (masalan, provayder 3 kun qayta yuborsa, 7–30 kun). Undan keyin `Prunable` bilan tozalash. Lekin biznes darajasidagi unique kalitlar (to'lov ID) doimiy."
  ],
  "examples": [
    {
      "title": "Versiya bo'yicha eski hodisani e'tiborsiz qoldirish",
      "lang": "php",
      "code": [
        "public function handle(): void",
        "{",
        "    $data = $this->event->payload['data'];",
        "",
        "    DB::transaction(function () use ($data) {",
        "        $shipment = Shipment::where('external_id', $data['shipment_id'])->lockForUpdate()->first();",
        "",
        "        if ($shipment && $shipment->remote_version >= $data['version']) {",
        "            return;   // eski yoki takroriy hodisa",
        "        }",
        "",
        "        Shipment::updateOrCreate(",
        "            ['external_id' => $data['shipment_id']],",
        "            ['status' => $data['status'], 'remote_version' => $data['version']],",
        "        );",
        "    });",
        "}"
      ]
    },
    {
      "title": "Noto'g'ri tartib: keyinroq qayta urinish",
      "lang": "php",
      "code": [
        "public function handle(): void",
        "{",
        "    $payment = Payment::where('external_id', $this->data['payment_id'])->first();",
        "",
        "    if (! $payment) {",
        "        // refund keldi, lekin succeeded hali kelmagan",
        "        if ($this->attempts() < 5) {",
        "            $this->release(60);",
        "            return;",
        "        }",
        "        // 5 urinishdan keyin: provayder API'sidan holatni olish",
        "        $payment = app(PaymentSync::class)->fetchAndStore($this->data['payment_id']);",
        "    }",
        "",
        "    $payment->markRefunded($this->data['refund_id']);",
        "}"
      ]
    },
    {
      "title": "Eski event'larni tozalash",
      "lang": "php",
      "code": [
        "class WebhookEvent extends Model",
        "{",
        "    use Prunable;",
        "",
        "    public function prunable(): Builder",
        "    {",
        "        return static::where('status', 'processed')->where('created_at', '<', now()->subDays(30));",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "\"Avval exists, keyin create\" bilan deduplikatsiya: parallel dublikatlar o'tib ketadi.",
    "Hodisalar tartib bilan keladi deb hisoblash va eski hodisa bilan yangi holatni bosib yozish.",
    "Event ID'larni provayder retry muddatidan qisqaroq saqlash.",
    "Payload hash'ini o'zgaruvchan maydonlar bilan deduplikatsiya kaliti qilish."
  ]
});
