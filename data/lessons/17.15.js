/* Chuqur dars: 17.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.15", {
  "lesson": [
    "### Nega uzoq tranzaksiya xavfli",
    "Tranzaksiya qancha uzoq ochiq tursa, shuncha ko'p resursni band qiladi:",
    "1. **Lock'lar.** Olingan barcha qator lock'lari commit'gacha saqlanadi. Boshqa so'rovlar navbatga turadi, FPM worker'lar band bo'ladi va sayt sekinlashadi. DDL migratsiya bunday tranzaksiyani kutsa, lock navbati butun jadvalni to'xtatadi (11.12).",
    "2. **MVCC tozalash bloklanadi.** PostgreSQL VACUUM eng eski ochiq snapshot'dan yangi o'lik tuple'larni o'chira olmaydi. Natijada bloat va sekinlashuv (11.10). MySQL InnoDB'da **history list length** o'sadi: purge eski undo yozuvlarini tozalay olmaydi va o'qishlar sekinlashadi.",
    "3. **Replikatsiya.** Katta tranzaksiya replikaga commit'dan keyin bir butun bo'lib boradi va replication lag keskin oshadi.",
    "4. **Rollback ham uzoq.** 10 daqiqalik `UPDATE` ni bekor qilish ham shuncha yoki undan ko'p vaqt oladi.",
    "5. **Yo'qotish xavfi.** Ulanish 59-daqiqada uzilsa, butun ish yo'qoladi.",
    "",
    "### Sabablari",
    "- Tranzaksiya ichida **tashqi chaqiruv** (HTTP, SMTP, S3) (17.16).",
    "- Tranzaksiya ichida **foydalanuvchini kutish** (interaktiv jarayon).",
    "- **Katta batch:** millionlab qatorni bitta `UPDATE` yoki bitta `DB::transaction` ichidagi sikl.",
    "- **Unutilgan tranzaksiya:** `beginTransaction()` dan keyin xato yo'lida `rollBack()` yo'q. Queue worker yoki Octane'da ulanish ochiq qoladi va PostgreSQL'da `idle in transaction` holati ko'rinadi.",
    "- Interaktiv DB klientida (DBeaver, psql) `BEGIN` qilib, unutib qo'yish.",
    "- Hisobot uchun REPEATABLE READ'da soatlab ishlaydigan so'rov.",
    "",
    "### Yechimlar",
    "- **Bo'laklarga bo'lish:** har bo'lak (500–5000 qator) alohida qisqa tranzaksiya. `chunkById()` + har bo'lakka `DB::transaction`. Jarayon idempotent bo'lsin, shunda uzilishdan keyin davom ettirish mumkin.",
    "- **Tashqi ishlarni chiqarish:** 17.14 va 17.16.",
    "- **Timeout'lar:** PostgreSQL `idle_in_transaction_session_timeout` (ochiq, lekin harakatsiz tranzaksiyani uzadi), `statement_timeout`, `transaction_timeout` (PG 17+). MySQL `wait_timeout`, `innodb_lock_wait_timeout`, `MAX_EXECUTION_TIME`.",
    "- **Og'ir hisobotlarni replikada** ishga tushirish.",
    "- **Monitoring va alert:** 5 daqiqadan uzoq ochiq tranzaksiya haqida xabar.",
    "",
    "### Qanday aniqlanadi",
    "PostgreSQL: `pg_stat_activity` dagi `xact_start` va `state`. MySQL: `information_schema.INNODB_TRX` dagi `trx_started` va `SHOW ENGINE INNODB STATUS` dagi history list length."
  ],
  "examples": [
    {
      "title": "Uzoq tranzaksiyalarni topish",
      "lang": "sql",
      "code": [
        "-- PostgreSQL",
        "SELECT pid, usename, state, now() - xact_start AS duration, left(query, 80) AS query",
        "FROM pg_stat_activity",
        "WHERE xact_start IS NOT NULL",
        "ORDER BY duration DESC LIMIT 10;",
        "",
        "ALTER DATABASE app SET idle_in_transaction_session_timeout = '60s';",
        "",
        "-- MySQL",
        "SELECT trx_id, trx_started, TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS seconds,",
        "       trx_rows_locked, trx_query",
        "FROM information_schema.INNODB_TRX",
        "ORDER BY trx_started LIMIT 10;"
      ]
    },
    {
      "title": "Katta yangilashni bo'laklash",
      "lang": "php",
      "code": [
        "// YOMON: bitta ulkan tranzaksiya",
        "DB::transaction(fn () => Order::where('created_at', '<', now()->subYear())",
        "    ->update(['archived' => true]));",
        "",
        "// YAXSHI: qisqa tranzaksiyalar, idempotent",
        "Order::where('created_at', '<', now()->subYear())",
        "    ->where('archived', false)",
        "    ->select('id')",
        "    ->chunkById(2000, function ($orders) {",
        "        DB::transaction(fn () => Order::whereIn('id', $orders->pluck('id'))",
        "            ->update(['archived' => true]));",
        "        usleep(50_000);  // replika va boshqa so'rovlarga nafas",
        "    });"
      ]
    }
  ],
  "pitfalls": [
    "Millionlab qatorni bitta `UPDATE` bilan yangilash: lock'lar, undo/WAL va replication lag.",
    "Queue worker'da qo'lda tranzaksiya ochib, xato yo'lida yopmaslik: `idle in transaction` soatlab qoladi.",
    "DB klientida `BEGIN` qilib, tahlilni tugatib, `COMMIT`/`ROLLBACK` ni unutish.",
    "`idle_in_transaction_session_timeout` kabi himoya chegaralarini o'rnatmaslik."
  ]
});
