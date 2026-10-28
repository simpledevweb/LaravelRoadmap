/* Chuqur dars: 53.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.16", {
  "lesson": [
    "### DB ulanishlarini boshqarish",
    "(Asos: 10.18, 15.9.) Ulanish ochish qimmat va **cheklangan resurs**.",
    "",
    "### PHP'ning o'ziga xosligi",
    "FPM: har so'rovda ulanish ochiladi va yopiladi (yoki worker'da qoladi); **ulanishlar ≈ FPM worker × server + queue worker'lar + scheduler**. `max_connections` (MySQL 151, PG 100) dan oshib ketish — \"Too many connections\".",
    "",
    "### Boshqarish",
    "- **Lazy ulanish:** Laravel DB'ga faqat birinchi so'rovda ulanadi (kerak bo'lmasa ulanmaydi).",
    "- **Keraksiz ulanishlarni oldini olish:** kesh/CDN, so'rovsiz sahifa.",
    "- **Pool:** **ProxySQL** (MySQL), **PgBouncer** (PostgreSQL), RDS Proxy.",
    "- **Ulanishni yopish:** uzoq job/queue'da `DB::disconnect()` va qayta ulanish (`gone away`).",
    "- **Persistent ulanish** (`PDO::ATTR_PERSISTENT`) — holat sizishi: tavsiya etilmaydi.",
    "- **Octane:** jarayonda ulanish qayta ishlatiladi (stale ulanishni tozalash).",
    "- **Read/write ajratish:** replika (15.15), alohida connection'lar.",
    "- **Timeout:** `wait_timeout`, ulanish `timeout`, so'rov timeout (`max_execution_time` MySQL, `statement_timeout` PG).",
    "",
    "### Hisoblash",
    "Worker × server + queue + Horizon + cron + boshqalar < `max_connections` (zaxira bilan).",
    "",
    "### Muammolar",
    "- Ulanish sizishi (uzoq tranzaksiya yopilmadi).",
    "- \"Too many connections\", \"server has gone away\".",
    "- Pool'da transaction rejimi (PgBouncer) bilan session-level narsalar.",
    "- Replika'ga yozish.",
    "",
    "### Monitoring",
    "`Threads_connected`, `Max_used_connections`, pool navbati/kutish, ulanish xatolari.",
    "",
    "### Laravel",
    "`config/database.php` (`options`, `timeout`), `DB::reconnect()`, `Schema::disableForeignKeyConstraints` emas; Horizon `--max-time` bilan worker'ni yangilash."
  ],
  "examples": [
    {
      "title": "Hisoblash",
      "lang": "text",
      "code": [
        "FPM:  60 worker x 3 server = 180",
        "Queue: 40",
        "Horizon/cron: 10",
        "Jami ~230  ->  max_connections=151 yetmaydi: ProxySQL yoki worker kamaytirish"
      ]
    }
  ],
  "pitfalls": [
    "`max_connections`ni oshirish xotirani to'ldiradi: avval pool.",
    "Uzoq queue worker'da ulanish uziladi (`gone away`): qayta ulanish.",
    "Persistent ulanish holat/tranzaksiya sizishiga olib keladi.",
    "PgBouncer transaction pooling'da session-level narsalar ishlamaydi."
  ]
});
