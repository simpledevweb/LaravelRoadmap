/* Chuqur dars: 9.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.1", {
  "lesson": [
    "### CRUD",
    "- **SELECT** — o'qish: `SELECT id, name FROM users WHERE active = 1;`",
    "- **INSERT** — qo'shish: `INSERT INTO users (name, email) VALUES ('Ali', 'a@b.uz'), ('Vali', 'v@b.uz');` (ko'p qatorli — tezroq). `INSERT ... SELECT`. `INSERT ... ON DUPLICATE KEY UPDATE` (upsert), `INSERT IGNORE` (xatoni o'tkazadi), `REPLACE` (o'chirib qayta yozadi: ehtiyot).",
    "- **UPDATE** — o'zgartirish: `UPDATE users SET active = 0 WHERE last_login < '2024-01-01';`",
    "- **DELETE** — o'chirish: `DELETE FROM sessions WHERE expires_at < NOW();` `TRUNCATE TABLE` — butun jadvalni tezkor tozalash (DDL, rollback yo'q, AUTO_INCREMENT qayta).",
    "",
    "### Muhim qoidalar",
    "1. `UPDATE`/`DELETE` da `WHERE` doim: yo'q bo'lsa hamma qator o'zgaradi. Avval shu shart bilan `SELECT` qilib tekshiring; tranzaksiyada bajaring.",
    "2. `SELECT *` o'rniga kerakli ustunlar.",
    "3. `INSERT` da ustunlarni aniq yozing (jadval o'zgarsa buzilmaydi).",
    "4. `LIMIT` — `UPDATE/DELETE ... LIMIT n` (MySQL'da), katta o'chirishni bo'laklab.",
    "5. Natija: `ROW_COUNT()`, `LAST_INSERT_ID()`.",
    "",
    "### SELECT tartibi (yozilishi vs bajarilishi)",
    "Yoziladi: `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT`. Bajariladi: `FROM/JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`.",
    "",
    "### Laravel",
    "Eloquent/Query Builder: `User::create`, `where()->update()`, `delete()`, `upsert()`, `insert([...])` (ommaviy), `DB::statement()`."
  ],
  "examples": [
    {
      "title": "CRUD",
      "lang": "sql",
      "code": [
        "INSERT INTO users (name, email) VALUES ('Ali', 'ali@b.uz')",
        "ON DUPLICATE KEY UPDATE name = VALUES(name);",
        "",
        "SELECT id, name FROM users WHERE email = 'ali@b.uz';",
        "UPDATE users SET name = 'Ali K.' WHERE id = 1;",
        "DELETE FROM sessions WHERE expires_at < NOW() LIMIT 1000;"
      ]
    }
  ],
  "pitfalls": [
    "`UPDATE`/`DELETE` da `WHERE` yo'qligi butun jadvalni o'zgartiradi: avval `SELECT` bilan tekshiring.",
    "`REPLACE` qatorni o'chirib qayta yozadi (FK/trigger'lar ta'sirlanadi): `ON DUPLICATE KEY UPDATE`.",
    "`TRUNCATE` rollback qilinmaydi (DDL).",
    "`INSERT IGNORE` boshqa xatolarni ham yashiradi."
  ]
});
