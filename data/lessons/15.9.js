/* Chuqur dars: 15.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.9", {
  "lesson": [
    "### Connection pooling",
    "Har so'rovda yangi ulanish ochish **qimmat** (TCP, auth, thread). **Pool** — ochiq ulanishlarni saqlab qayta ishlatadi va ularning **sonini cheklaydi**.",
    "",
    "### PHP'ning o'ziga xosligi",
    "Klassik PHP-FPM: har so'rovda ulanish ochiladi va yopiladi (pool yo'q); har worker o'z ulanishiga ega: `max_children × serverlar` DB `max_connections` dan oshib ketishi mumkin.",
    "",
    "### Yechimlar",
    "- **ProxySQL** / MySQL Router (MySQL): ulanish multiplekslash, read/write split, failover.",
    "- **PgBouncer / Pgpool-II** (PostgreSQL): transaction/session pooling.",
    "- **Cloud:** AWS RDS Proxy, Cloud SQL proxy.",
    "- **Persistent ulanish** (`PDO::ATTR_PERSISTENT`) — tavsiya etilmaydi (holat/tranzaksiya sizishi).",
    "- **Octane/Swoole:** jarayon ichida ulanish qayta ishlatiladi (to'g'ri boshqarilsa).",
    "- Queue worker/Horizon: ulanish uzoq yashaydi (qayta ulanish mantig'i).",
    "",
    "### Hisoblash",
    "Ulanishlar ≈ FPM worker'lar + queue worker'lar + scheduler + Horizon + boshqa ilovalar. `max_connections` ni oshirish emas, avval poolga murojaat qiling (har ulanish xotira oladi).",
    "",
    "### PgBouncer nuansi",
    "Transaction pooling'da session'ga bog'liq narsalar (prepared statements `PDO::ATTR_EMULATE_PREPARES`, `SET`, advisory lock) ishlamasligi mumkin; Laravel sozlamasi.",
    "",
    "### Muammolar",
    "\"Too many connections\", \"server has gone away\", ulanish sizishi, pool to'lishi (kutish).",
    "",
    "### Monitoring",
    "`Threads_connected`, `Max_used_connections`, pool statistikasi, so'rov kutish vaqti."
  ],
  "examples": [
    {
      "title": "Hisoblash",
      "lang": "text",
      "code": [
        "FPM:    pm.max_children = 80  x 3 server        = 240 ulanish",
        "Queue:  50 worker                                =  50",
        "Horizon/scheduler/boshqa                         =  20",
        "-----------------------------------------------------",
        "Jami ~310  >  MySQL max_connections = 151  ->  ProxySQL/PgBouncer yoki worker kamaytirish"
      ]
    }
  ],
  "pitfalls": [
    "`max_connections`ni oshirish xotirani to'ldiradi: avval poolga murojaat qiling.",
    "Persistent ulanish holat va tranzaksiya sizishiga olib keladi.",
    "PgBouncer transaction pooling'da session-level narsalar (SET, advisory lock) ishlamaydi.",
    "Uzoq queue worker'da ulanish uzilishini (`gone away`) hisobga olmaslik."
  ]
});
