/* Chuqur dars: 2.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.17", {
  "lesson": [
    "### Logging",
    "Laravel Monolog ustida: `config/logging.php` da **kanallar** (channels). `Log::info('xabar', ['kontekst' => $v])`.",
    "",
    "### Kanallar",
    "`single` (bitta fayl), `daily` (kunlik, `days`), `stack` (bir nechtasini birlashtiradi), `slack`, `papertrail`, `syslog`, `errorlog`, `stderr` (Docker/K8s), `null`, `custom`. Default: `LOG_CHANNEL` / `LOG_STACK`.",
    "",
    "### Darajalar (PSR-3)",
    "`emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`. Kanal `level` minimal darajani belgilaydi.",
    "",
    "### Kontekst",
    "`Log::withContext(['request_id' => $id])` — keyingi hamma yozuvga qo'shiladi. Laravel 11+ **Context** (`Context::add('trace_id', ...)`) loglarga va queue job'larga avtomatik tushadi.",
    "",
    "### Maxsus kanal",
    "`Log::channel('payments')->info(...)`, `Log::stack(['slack', 'daily'])`. Monolog handler/formatter (`JsonFormatter`) bilan tuzilmaviy log.",
    "",
    "### Qoidalar",
    "1. To'g'ri daraja (har narsa `error` emas).",
    "2. Parol, token, karta, shaxsiy ma'lumotni yozmang.",
    "3. Tuzilmaviy (JSON) log: qidirish/agregatsiya oson.",
    "4. Production: markazlashgan log (ELK, Loki, Papertrail), `daily` + saqlash muddati.",
    "5. Docker'da `stderr` kanali.",
    "",
    "### Xatolar monitoringi",
    "Log o'zi yetmaydi: Sentry/Flare bilan xatolarni guruhlang va xabardor qiling."
  ],
  "examples": [
    {
      "title": "Kontekst va kanal",
      "lang": "php",
      "code": [
        "Log::withContext(['request_id' => (string) Str::uuid()]);",
        "Log::info('Buyurtma yaratildi', ['order_id' => $order->id, 'user_id' => $user->id]);",
        "Log::channel('payments')->error('To\\'lov rad etildi', ['order_id' => $order->id, 'reason' => $e->getMessage()]);"
      ]
    }
  ],
  "pitfalls": [
    "Parol/token/karta ma'lumotini logga yozish xavfsizlik buzilishi.",
    "`single` kanal cheksiz o'sadi: `daily` va saqlash muddati.",
    "Docker'da faylga yozish o'rniga `stderr` ishlating.",
    "Hamma narsani `debug` darajasida productionda yozish diskni va monitoringni to'ldiradi."
  ]
});
