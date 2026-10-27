/* Chuqur dars: 9.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.2", {
  "lesson": [
    "### WHERE",
    "Qatorlarni **guruhlashdan oldin** filtrlaydi: `=`, `<>`/`!=`, `<`, `>`, `BETWEEN a AND b`, `IN (...)`, `LIKE 'a%'`, `IS NULL`, `AND/OR/NOT` (qavs bilan!). `AND` `OR` dan ustun.",
    "",
    "### ORDER BY",
    "`ORDER BY created_at DESC, id DESC`. Tartib berilmasa natija tartibi **kafolatlanmaydi**. Indeks tartibida bo'lsa filesort bo'lmaydi.",
    "",
    "### GROUP BY",
    "Qatorlarni guruhlab, aggregat funksiyalar (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) qo'llaydi:",
    "`SELECT user_id, COUNT(*) AS n, SUM(total) FROM orders GROUP BY user_id;`",
    "`ONLY_FULL_GROUP_BY` (8.0 default): SELECT ichidagi guruhlanmagan ustun xato beradi (to'g'ri xatti-harakat).",
    "",
    "### HAVING",
    "**Guruhlashdan keyin** filtrlaydi (aggregat natijasida): `HAVING COUNT(*) > 5`. Aggregatsiz shartni `WHERE`ga qo'ying (tezroq).",
    "",
    "### Farq",
    "`WHERE` — qatorlar, `HAVING` — guruhlar. `WHERE` indeksdan foydalana oladi.",
    "",
    "### LIKE va qidirish",
    "`LIKE 'abc%'` indeks ishlatadi, `'%abc'` — yo'q. `_` bitta belgi. Katta-kichik harf collation'ga bog'liq.",
    "",
    "### Misol",
    "Eng yaxshi mijozlar: `WHERE status = 'paid' GROUP BY user_id HAVING SUM(total) > 1000000 ORDER BY SUM(total) DESC LIMIT 10`.",
    "",
    "### Laravel",
    "`where`, `orWhere` (guruhlash: `where(fn ($q) => ...)`), `groupBy`, `having`, `orderBy`, `selectRaw`."
  ],
  "examples": [
    {
      "title": "Guruhlash",
      "lang": "sql",
      "code": [
        "SELECT user_id, COUNT(*) AS orders_count, SUM(total) AS spent",
        "FROM orders",
        "WHERE status = 'paid' AND created_at >= '2025-01-01'",
        "GROUP BY user_id",
        "HAVING SUM(total) > 1000000",
        "ORDER BY spent DESC",
        "LIMIT 10;"
      ]
    }
  ],
  "pitfalls": [
    "`OR` va `AND` aralashganda qavs qo'ymasangiz mantiq kutilganidan boshqacha ishlaydi.",
    "Aggregatsiz shartni `HAVING`ga yozish indeksdan foydalanishni yo'qotadi: `WHERE`.",
    "`ORDER BY` siz natija tartibi kafolatlanmaydi.",
    "`ONLY_FULL_GROUP_BY` o'chirib qo'yilsa tasodifiy qiymatlar qaytadi."
  ]
});
