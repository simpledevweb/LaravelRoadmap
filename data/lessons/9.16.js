/* Chuqur dars: 9.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.16", {
  "lesson": [
    "### Tranzaksiya (SQL darajasi)",
    "`START TRANSACTION` (yoki `BEGIN`) → amallar → `COMMIT` (saqlash) yoki `ROLLBACK` (bekor). **ACID:** Atomicity, Consistency, Isolation, Durability. (MySQL/InnoDB tafsilotlari: 10.10.)",
    "",
    "### Autocommit",
    "Default `autocommit=1`: har bayonot o'zi tranzaksiya. Bir nechta bayonotni birga atomik qilish uchun aniq `START TRANSACTION`.",
    "",
    "### Savepoint",
    "`SAVEPOINT sp1; ... ROLLBACK TO sp1;` — qisman bekor qilish (ichma-ich mantiq).",
    "",
    "### Implicit commit",
    "DDL (`CREATE/ALTER/DROP TABLE`) va ba'zi bayonotlar MySQL'da tranzaksiyani **avtomatik commit** qiladi (rollback qilib bo'lmaydi).",
    "",
    "### Qoidalar",
    "1. **Qisqa** tuting.",
    "2. Ichida tashqi chaqiruv (HTTP, email) yo'q.",
    "3. Xatoda `ROLLBACK`.",
    "4. Bir xil tartibda qulflang (deadlock).",
    "5. Kerakli minimal ma'lumotni qulflang.",
    "",
    "### Misol",
    "Pul o'tkazish: hisobdan yechish + qo'shish + tarix — hammasi yoki hech narsa.",
    "",
    "### Laravel",
    "`DB::transaction(fn () => ..., attempts: 3)`, `DB::beginTransaction()/commit()/rollBack()`, `afterCommit` (hodisa/job tranzaksiyadan keyin), `DB::transactionLevel()`.",
    "",
    "### Test",
    "`RefreshDatabase`/`DatabaseTransactions` trait: har test tranzaksiyada va rollback."
  ],
  "examples": [
    {
      "title": "Pul o'tkazish",
      "lang": "sql",
      "code": [
        "START TRANSACTION;",
        "UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;",
        "-- ROW_COUNT() = 0 bo'lsa ROLLBACK",
        "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
        "INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 100);",
        "COMMIT;"
      ]
    }
  ],
  "pitfalls": [
    "DDL implicit commit qiladi: tranzaksiya ichidagi `ALTER` oldingi ishni saqlab qo'yadi.",
    "Uzoq tranzaksiya qulflarni va undo'ni ushlab turadi.",
    "Xatoda `ROLLBACK` qilmasdan ulanishni qoldirish ochiq tranzaksiya muammosi.",
    "Tranzaksiya ichida email/HTTP yuborish rollback bo'lsa ham yuborilib bo'lgan."
  ]
});
