/* Chuqur dars: 10.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.10", {
  "lesson": [
    "### Tranzaksiya",
    "Bir nechta SQL amalini **bitta butun** sifatida bajarish: **ACID** — Atomicity (hammasi yoki hech narsa), Consistency, Isolation, Durability.",
    "`START TRANSACTION; ... COMMIT;` yoki `ROLLBACK;`. Default `autocommit=1`: har bayonot o'zi commit.",
    "",
    "### Izolyatsiya darajalari",
    "| Daraja | Dirty read | Non-repeatable | Phantom |",
    "|---|---|---|---|",
    "| READ UNCOMMITTED | bor | bor | bor |",
    "| READ COMMITTED | yo'q | bor | bor |",
    "| **REPEATABLE READ** (InnoDB default) | yo'q | yo'q | (consistent read'da yo'q; locking read'da next-key lock bilan oldi olinadi) |",
    "| SERIALIZABLE | yo'q | yo'q | yo'q (hamma o'qish `FOR SHARE`ga aylanadi) |",
    "",
    "### Hodisalar",
    "- **Dirty read:** boshqa tranzaksiyaning commit qilinmagan ma'lumotini o'qish.",
    "- **Non-repeatable read:** bir tranzaksiyada ikki o'qishda qiymat o'zgargan.",
    "- **Phantom:** ikki o'qishda yangi qatorlar paydo bo'lgan.",
    "",
    "### InnoDB xususiyatlari",
    "REPEATABLE READ'da snapshot birinchi o'qishda olinadi (MVCC). READ COMMITTED har bayonotda yangi snapshot (kamroq gap lock; ko'p tizimlar shuni tanlaydi).",
    "",
    "### Sozlash",
    "`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;` yoki `transaction-isolation` konfiguratsiyada.",
    "",
    "### Laravel",
    "`DB::transaction(function () { ... }, 3)` — xatoda rollback va deadlock'da qayta urinish. `DB::beginTransaction()/commit()/rollBack()`. `afterCommit` hodisalar.",
    "",
    "### Qoidalar",
    "Tranzaksiyani **qisqa** tuting (tashqi HTTP/email yo'q), bir xil tartibda qulflang, xatoni boshqaring, katta tranzaksiyadan qoching."
  ],
  "examples": [
    {
      "title": "Tranzaksiya",
      "lang": "sql",
      "code": [
        "SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;",
        "START TRANSACTION;",
        "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
        "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
        "COMMIT;"
      ]
    }
  ],
  "pitfalls": [
    "Tranzaksiya ichida sekin tashqi chaqiruv (HTTP/email) qulflarni uzoq ushlab turadi.",
    "REPEATABLE READ'da uzoq tranzaksiya eski snapshot ko'radi: kutilmagan natija.",
    "`autocommit=1` da bir necha bayonotni `START TRANSACTION`siz yozish atomik emas.",
    "DDL (`ALTER`, `CREATE TABLE`) MySQL'da implicit commit qiladi."
  ]
});
