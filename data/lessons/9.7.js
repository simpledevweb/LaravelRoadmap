/* Chuqur dars: 9.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.7", {
  "lesson": [
    "### Aggregat funksiyalar",
    "Qatorlar to'plamini **bitta qiymatga** aylantiradi:",
    "- `COUNT(*)` — barcha qatorlar; `COUNT(col)` — `NULL` bo'lmaganlar; `COUNT(DISTINCT col)` — noyoblar.",
    "- `SUM`, `AVG`, `MIN`, `MAX` — `NULL`larni e'tiborsiz qoldiradi.",
    "- `GROUP_CONCAT(col SEPARATOR ',')` — matnga yig'ish (`group_concat_max_len`, default 1024!).",
    "- `JSON_ARRAYAGG`, `JSON_OBJECTAGG` — JSON'ga yig'ish.",
    "- `STD`, `VAR_POP`, `BIT_AND`...",
    "",
    "### NULL nuansi",
    "`AVG(col)` NULL'larni qo'shmaydi (bo'luvchi ham kamayadi). Hamma qiymat NULL bo'lsa `SUM` = `NULL` (nol emas): `COALESCE(SUM(x), 0)`.",
    "",
    "### GROUP BY bilan",
    "`SELECT status, COUNT(*), SUM(total) FROM orders GROUP BY status;` Guruhsiz aggregat — bitta qator qaytaradi.",
    "",
    "### Shartli aggregat",
    "`SUM(CASE WHEN status='paid' THEN total ELSE 0 END)`, `COUNT(IF(status='paid', 1, NULL))`.",
    "",
    "### Pul va aniqlik",
    "`SUM` `DECIMAL` ustunda aniq; `FLOAT` da yig'indi xato to'planadi.",
    "",
    "### Samaradorlik",
    "- `COUNT(*)` InnoDB'da jadvalni skan qiladi (MyISAM'dan farqli): katta jadvalda sekin; taxminiy yoki alohida hisoblagich.",
    "- Aggregat uchun covering indeks.",
    "",
    "### Laravel",
    "`count()`, `sum()`, `avg()`, `max()`, `selectRaw('status, COUNT(*) c')`, `groupBy`."
  ],
  "examples": [
    {
      "title": "Shartli aggregat",
      "lang": "sql",
      "code": [
        "SELECT",
        "  COUNT(*)                                      AS all_orders,",
        "  COUNT(DISTINCT user_id)                       AS buyers,",
        "  COALESCE(SUM(total), 0)                       AS revenue,",
        "  SUM(CASE WHEN status = 'paid' THEN total END) AS paid_revenue,",
        "  GROUP_CONCAT(DISTINCT status ORDER BY status SEPARATOR ',') AS statuses",
        "FROM orders;"
      ]
    }
  ],
  "pitfalls": [
    "`GROUP_CONCAT` default 1024 belgida kesadi: `group_concat_max_len`.",
    "`SUM` bo'sh/NULL'da `NULL` qaytaradi: `COALESCE(SUM(x), 0)`.",
    "`COUNT(col)` NULL'larni sanamaydi, `COUNT(*)` sanaydi.",
    "InnoDB'da katta jadvalda `COUNT(*)` sekin: kesh/hisoblagich."
  ]
});
