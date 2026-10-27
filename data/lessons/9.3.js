/* Chuqur dars: 9.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.3", {
  "lesson": [
    "### JOIN",
    "Bir nechta jadvalni **bog'lovchi ustun** bo'yicha birlashtiradi.",
    "",
    "### Turlari",
    "- **INNER JOIN:** ikkala jadvalda mos kelganlar.",
    "- **LEFT (OUTER) JOIN:** chapdagi hamma qator + o'ngdan mosi (yo'q bo'lsa `NULL`).",
    "- **RIGHT JOIN:** teskarisi (kam ishlatiladi; LEFT'ga o'giring).",
    "- **CROSS JOIN:** barcha kombinatsiyalar (Dekart ko'paytma).",
    "- **FULL OUTER JOIN:** MySQL'da **yo'q** (LEFT + RIGHT `UNION` bilan).",
    "- **SELF JOIN:** jadvalni o'zi bilan (ierarxiya).",
    "",
    "### Sintaksis",
    "```sql",
    "SELECT o.id, u.name FROM orders o",
    "INNER JOIN users u ON u.id = o.user_id",
    "LEFT JOIN payments p ON p.order_id = o.id;",
    "```",
    "",
    "### Muhim nuanslar",
    "- **LEFT JOIN + WHERE o'ngdagi ustunda shart** uni INNER JOIN'ga aylantiradi: shartni `ON`ga qo'ying.",
    "- **Dublikat qatorlar:** 1-N bog'lanishda chap qator ko'payadi (`COUNT` xato bo'ladi: `COUNT(DISTINCT ...)`).",
    "- `USING (col)` — bir xil nomli ustun uchun qisqa yozuv.",
    "- Join ustunlariga **indeks** (FK), turlari va collation bir xil.",
    "- Anti-join: `LEFT JOIN ... WHERE r.id IS NULL` (\"bog'lanmaganlar\").",
    "",
    "### Samaradorlik",
    "Optimizer join tartibini tanlaydi; `EXPLAIN` bilan tekshiring. Juda ko'p join (6+) murakkab; ba'zan alohida so'rov + ilovada birlashtirish.",
    "",
    "### Laravel",
    "`join`, `leftJoin`, Eloquent munosabatlari (`with()` — ikki so'rov, eager loading)."
  ],
  "examples": [
    {
      "title": "INNER, LEFT, anti-join",
      "lang": "sql",
      "code": [
        "SELECT u.id, u.name, COUNT(o.id) AS orders",
        "FROM users u",
        "LEFT JOIN orders o ON o.user_id = u.id AND o.status = 'paid'   -- shart ON'da",
        "GROUP BY u.id, u.name;",
        "",
        "-- buyurtmasi yo'q foydalanuvchilar",
        "SELECT u.id FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL;"
      ]
    }
  ],
  "pitfalls": [
    "LEFT JOIN'da o'ng jadval ustuniga `WHERE` sharti uni INNER JOIN'ga aylantiradi: shartni `ON`ga qo'ying.",
    "1-N join'da qatorlar ko'payib `COUNT/SUM` ni buzadi.",
    "Join ustunlarida indeks yo'q bo'lsa to'liq skan (sekin).",
    "MySQL'da FULL OUTER JOIN yo'q: LEFT va RIGHT'ni UNION qiling."
  ]
});
