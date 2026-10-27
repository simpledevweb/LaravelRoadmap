/* Chuqur dars: 15.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.14", {
  "lesson": [
    "### Lock contention",
    "Ko'p tranzaksiya **bir xil qatorlar/jadvalga** yozmoqchi bo'lib, bir-birini **kutadi**: so'rovlar navbati, latency o'sishi, timeout, deadlock.",
    "",
    "### Belgilar",
    "- `Lock wait timeout exceeded` (1205), deadlock (1213).",
    "- `Threads_running` yuqori, CPU past (kutish).",
    "- `sys.innodb_lock_waits`, `performance_schema.data_lock_waits` da kutayotganlar.",
    "- \"Issiq qator\" (hot row): bitta hisoblagich/balans qatoriga hamma yozadi.",
    "- `Waiting for table metadata lock` (DDL).",
    "",
    "### Sabablar",
    "- **Uzun tranzaksiyalar** (qulfni uzoq ushlab turadi; ichida tashqi chaqiruv).",
    "- Indeks yo'q → ko'p qator qulflanadi.",
    "- **Issiq qator:** `UPDATE counters SET n = n + 1 WHERE id = 1`.",
    "- Turli tartibda qulflash (deadlock).",
    "- Gap lock (REPEATABLE READ).",
    "- Katta batch UPDATE/DELETE.",
    "- DDL va uzoq tranzaksiya (metadata lock).",
    "",
    "### Kamaytirish",
    "1. **Qisqa tranzaksiyalar**, tashqi chaqiruvsiz.",
    "2. **Mos indeks** (kam qator qulf).",
    "3. **Issiq qatorni tarqatish:** sharded hisoblagich (`counter_id, slot`), Redis `INCR` + davriy yozish, append-only log.",
    "4. **Bir xil tartib** (deadlock).",
    "5. **READ COMMITTED** (gap lock kam).",
    "6. **Batch'larni kichik bo'laklarga** (`LIMIT 1000`).",
    "7. **Optimistik qulf** (versiya) va qayta urinish.",
    "8. `SKIP LOCKED` (queue), `NOWAIT`.",
    "9. DDL'ni past yuklama vaqtida, online DDL.",
    "",
    "### Diagnostika",
    "`SHOW ENGINE INNODB STATUS`, `sys.innodb_lock_waits`, `SHOW PROCESSLIST`, uzun tranzaksiyalar (`INNODB_TRX`).",
    "",
    "### Laravel",
    "`DB::transaction(..., 3)` (deadlock retry), `lockForUpdate()` ehtiyotkorlik bilan, hisoblagichni Redis'da."
  ],
  "examples": [
    {
      "title": "Issiq qator",
      "lang": "php",
      "code": [
        "// yomon: har ko'rish bitta qatorni yangilaydi (qulf)",
        "DB::table('stats')->where('id', 1)->increment('views');",
        "",
        "// yaxshi: Redis'da to'plab, davriy yozish",
        "Redis::incr(\"views:post:{$id}\");",
        "// schedule: Redis'dagi hisoblagichlarni bo'laklab DB'ga yozish"
      ]
    }
  ],
  "pitfalls": [
    "Issiq qator (bitta hisoblagichga hamma yozadi) qulf bahsi beradi: Redis/sharded counter.",
    "Uzun tranzaksiya qulflarni uzoq ushlab, boshqalarni kutdiradi.",
    "Indekssiz `UPDATE/DELETE` ko'p qatorni qulflaydi.",
    "Uzoq tranzaksiya `ALTER TABLE`ni bloklaydi (metadata lock)."
  ]
});
