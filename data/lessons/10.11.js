/* Chuqur dars: 10.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.11", {
  "lesson": [
    "### Row-level lock",
    "InnoDB **qator darajasida** qulflaydi (aniqrog'i: **indeks yozuvlarini**), shuning uchun parallel yozish yaxshi masshtablanadi.",
    "",
    "### Qulf turlari",
    "- **Shared (S):** o'qish uchun; boshqalar ham S oladi, X yo'q.",
    "- **Exclusive (X):** yozish uchun; boshqa S/X yo'q.",
    "- **Intention (IS/IX):** jadval darajasida niyat.",
    "- **Record lock:** bitta indeks yozuvi. **Gap lock:** yozuvlar orasidagi bo'shliq (REPEATABLE READ'da, phantom oldi). **Next-key lock:** record + oldingi gap.",
    "",
    "### Locking read",
    "`SELECT ... FOR UPDATE` (X), `SELECT ... FOR SHARE` (S; eski `LOCK IN SHARE MODE`). Tranzaksiya tugaguncha ushlab turadi. 8.0: `NOWAIT` (kutmasdan xato), `SKIP LOCKED` (qulflanganlarni o'tkazish: queue/job olish uchun).",
    "",
    "### Indeks muhim",
    "Shart indeks bo'lmasa InnoDB **ko'p qatorni (hatto butun jadvalni)** qulflaydi. WHERE'ga mos indeks — qulfni kamaytiradi.",
    "",
    "### Ishlatish stsenariylari",
    "- Hisobdan yechish: `FOR UPDATE` bilan balansni o'qib, yozish.",
    "- Inventar zaxirasi.",
    "- Job queue: `FOR UPDATE SKIP LOCKED`.",
    "",
    "### Laravel",
    "`->lockForUpdate()`, `->sharedLock()`:",
    "`DB::transaction(fn () => Account::lockForUpdate()->find($id)->decrement('balance', 100));`",
    "",
    "### Timeout",
    "`innodb_lock_wait_timeout` (50 s): kutish oshsa `Lock wait timeout exceeded`.",
    "",
    "### Qoidalar",
    "Qulflarni qisqa ushlang, bir xil tartibda oling, optimistik qulf (versiya ustuni) kam raqobatda yaxshi muqobil."
  ],
  "examples": [
    {
      "title": "FOR UPDATE va SKIP LOCKED",
      "lang": "sql",
      "code": [
        "START TRANSACTION;",
        "SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;",
        "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
        "COMMIT;",
        "",
        "-- queue",
        "SELECT id FROM jobs WHERE status = 'new' ORDER BY id LIMIT 10 FOR UPDATE SKIP LOCKED;"
      ]
    }
  ],
  "pitfalls": [
    "Indekssiz shart bilan `FOR UPDATE` ko'p qatorni qulflaydi va boshqa so'rovlarni to'sadi.",
    "Qulf tranzaksiya oxirigacha ushlanadi: tashqi chaqiruvlarni tranzaksiya ichiga qo'ymang.",
    "Gap lock REPEATABLE READ'da kutilmagan bloklashga olib kelishi mumkin: READ COMMITTED ni ko'ring.",
    "`NOWAIT`/`SKIP LOCKED` bilan natija to'liq bo'lmasligini hisobga oling."
  ]
});
