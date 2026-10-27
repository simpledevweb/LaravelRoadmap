/* Chuqur dars: 10.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.18", {
  "lesson": [
    "### Ulanishlar",
    "Har mijoz ulanishi — server **thread**i va xotira (buffers). Ulanish ko'p bo'lsa xotira va context-switch yuki oshadi.",
    "",
    "### Asosiy sozlamalar",
    "- `max_connections` (default 151): oshsa `ERROR 1040: Too many connections`.",
    "- `max_user_connections`, `wait_timeout` (28800 s, uzoq bo'sh ulanish), `interactive_timeout`.",
    "- `thread_cache_size` (thread qayta ishlatish).",
    "- Kuzatish: `SHOW STATUS LIKE 'Threads_connected'`, `Max_used_connections`, `Aborted_connects`; `SHOW PROCESSLIST` / `performance_schema.threads`.",
    "",
    "### Ulanish hisobi (PHP)",
    "Ulanishlar ≈ **PHP-FPM worker soni** (har worker ulanadi) + **queue worker'lar** + scheduler + Horizon + tashqi ilovalar. `pm.max_children=100` × bir nechta server → 151 dan oshib ketadi.",
    "",
    "### Pooling",
    "PHP klassik rejimda har so'rovda ulanadi (qayta ishlatish yo'q). Yechimlar:",
    "- **ProxySQL**/MySQL Router — ulanish pool va multiplexing.",
    "- Persistent ulanish (`PDO::ATTR_PERSISTENT`) — tavsiya etilmaydi (holat/tranzaksiya sizishi).",
    "- Octane — jarayon ichida ulanish qayta ishlatiladi.",
    "",
    "### Xatolar",
    "- \"Too many connections\" — `max_connections`ni emas, avval sababni (worker soni, ulanish sizishi) ko'ring.",
    "- \"MySQL server has gone away\" — `wait_timeout`, `max_allowed_packet`, uzoq queue worker (`DB::reconnect()`).",
    "",
    "### Laravel",
    "`config/database.php`: `options`, `timeout`; queue worker `--max-time`; `DB::disconnect()`; ulanishni uzoq jarayonda qayta tiklash.",
    "",
    "### Qoidalar",
    "`max_connections` ni xotiraga mos oshiring (har ulanish buffer'lar); har so'rovda ulanishni ochib-yopishdan qoching; monitoring."
  ],
  "examples": [
    {
      "title": "Ulanishni kuzatish",
      "lang": "sql",
      "code": [
        "SHOW VARIABLES LIKE 'max_connections';",
        "SHOW GLOBAL STATUS LIKE 'Threads_connected';",
        "SHOW GLOBAL STATUS LIKE 'Max_used_connections';",
        "SELECT user, host, db, command, time, state FROM information_schema.PROCESSLIST ORDER BY time DESC LIMIT 10;"
      ]
    }
  ],
  "pitfalls": [
    "`max_connections` ni xotira hisobsiz oshirish OOM'ga olib keladi.",
    "PHP-FPM worker × server soni `max_connections` dan oshib ketishi mumkin: hisoblang.",
    "`PDO::ATTR_PERSISTENT` holat va tranzaksiya sizishiga olib keladi.",
    "Uzoq queue worker'da ulanish uzilsa 'gone away': qayta ulanish mantig'i."
  ]
});
