/* Chuqur dars: 9.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.18", {
  "lesson": [
    "### Qulflar",
    "Parallel tranzaksiyalar bir ma'lumotga kirishini boshqaradi.",
    "- **Shared (S)** — o'qish; **Exclusive (X)** — yozish.",
    "- **Row-level** (InnoDB), table-level (MyISAM, DDL `METADATA LOCK`).",
    "- **Gap/next-key** (REPEATABLE READ).",
    "- Aniq: `SELECT ... FOR UPDATE`, `FOR SHARE`, `NOWAIT`, `SKIP LOCKED`; `LOCK TABLES` (kamdan-kam).",
    "",
    "### Kutish va timeout",
    "`innodb_lock_wait_timeout` (50 s): oshsa `Lock wait timeout exceeded` (1205).",
    "",
    "### Deadlock",
    "Ikki tranzaksiya bir-birini kutadi; DB bittasini rollback qiladi (1213). Sabab: turli tartibda qulflash, uzun tranzaksiya, indeks yo'qligi.",
    "",
    "### Oldini olish",
    "1. **Bir xil tartib:** ID o'sish tartibida qulflash.",
    "2. **Qisqa** tranzaksiya.",
    "3. Mos **indeks** (kam qator qulflanadi).",
    "4. Kerak bo'lganda **READ COMMITTED**.",
    "5. **Qayta urinish** (deadlock normal hodisa).",
    "6. Optimistik qulf (versiya ustuni): kam raqobatda.",
    "",
    "### Metadata lock",
    "Uzoq tranzaksiya `ALTER TABLE`ni bloklaydi va u keyingi so'rovlarni bloklaydi (\"Waiting for table metadata lock\"): production'da DDL'ni ehtiyot bilan.",
    "",
    "### Diagnostika",
    "`SHOW ENGINE INNODB STATUS`, `performance_schema.data_locks`/`data_lock_waits`, `sys.innodb_lock_waits`, `SHOW PROCESSLIST`.",
    "",
    "### Laravel",
    "`lockForUpdate()`, `sharedLock()`, `DB::transaction($cb, 3)`."
  ],
  "examples": [
    {
      "title": "Qulf kutishini topish",
      "lang": "sql",
      "code": [
        "SELECT * FROM sys.innodb_lock_waits\\G",
        "SELECT * FROM performance_schema.data_lock_waits;",
        "SHOW PROCESSLIST;"
      ]
    }
  ],
  "pitfalls": [
    "`ALTER TABLE` uzoq tranzaksiya sababli metadata lock'da osilib, keyingi so'rovlarni to'sadi.",
    "Qulf tartibi turlicha bo'lsa deadlock: bir xil tartib.",
    "Indeks yo'q bo'lsa `FOR UPDATE` ko'p qatorni qulflaydi.",
    "Deadlock/timeout xatolarini ushlamaslik foydalanuvchiga 500 ko'rsatadi: retry."
  ]
});
