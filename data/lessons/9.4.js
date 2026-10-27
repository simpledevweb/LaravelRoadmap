/* Chuqur dars: 9.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.4", {
  "lesson": [
    "### Subquery",
    "Boshqa so'rov **ichidagi** so'rov (qavs ichida).",
    "",
    "### Joylashuvi",
    "- **WHERE da:** `WHERE price > (SELECT AVG(price) FROM products)`; `IN (SELECT ...)`; `EXISTS (SELECT 1 ...)`.",
    "- **FROM da (derived table):** `FROM (SELECT user_id, SUM(total) s FROM orders GROUP BY user_id) t` (alias majburiy).",
    "- **SELECT da (scalar):** `SELECT name, (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS n FROM users u`.",
    "",
    "### Turlari",
    "- **Scalar:** bitta qiymat.",
    "- **Row/Table:** ko'p qator/ustun.",
    "- **Correlated (bog'langan):** tashqi so'rovga bog'liq, **har qator uchun** qayta bajariladi (sekin bo'lishi mumkin).",
    "",
    "### IN vs EXISTS vs JOIN",
    "- `EXISTS` — mavjudlikni tekshiradi, birinchi mosda to'xtaydi.",
    "- `IN (subquery)` — NULL bilan ehtiyot (`NOT IN` va NULL: natija bo'sh!).",
    "- `JOIN` ko'pincha tezroq/aniqroq; MySQL 8.0 semi-join optimizatsiyasi ko'p hollarda tenglashtiradi.",
    "- `NOT IN` o'rniga `NOT EXISTS` (NULL xavfi yo'q).",
    "",
    "### ANY / ALL",
    "`> ALL (SELECT ...)`, `= ANY (...)`.",
    "",
    "### Qoidalar",
    "- Murakkab bo'lsa **CTE** (`WITH`) o'qilish uchun.",
    "- Correlated subquery'ni JOIN/window'ga almashtiring (katta jadvalda).",
    "- Subquery natijasi nechta qator — `LIMIT 1` yoki aggregat.",
    "",
    "### Laravel",
    "`whereIn('id', fn ($q) => $q->select('user_id')->from('orders'))`, `whereExists`, `selectSub`, `fromSub`."
  ],
  "examples": [
    {
      "title": "EXISTS va NOT EXISTS",
      "lang": "sql",
      "code": [
        "SELECT u.id, u.name FROM users u",
        "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.total > 1000000);",
        "",
        "SELECT u.id FROM users u",
        "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);   -- NOT IN dan xavfsiz"
      ]
    }
  ],
  "pitfalls": [
    "`NOT IN` ichida `NULL` bo'lsa natija bo'sh bo'ladi: `NOT EXISTS`.",
    "Correlated subquery har qator uchun bajariladi: katta jadvalda JOIN/window.",
    "Scalar subquery bir nechta qator qaytarsa xato.",
    "Derived table'ga alias berishni unutish sintaksis xatosi."
  ]
});
