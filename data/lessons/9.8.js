/* Chuqur dars: 9.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.8", {
  "lesson": [
    "### CASE",
    "SQL'dagi shartli ifoda (if/else).",
    "",
    "### Ikki shakl",
    "```sql",
    "-- qidiruv (searched)",
    "CASE WHEN total >= 1000000 THEN 'VIP' WHEN total >= 100000 THEN 'oddiy' ELSE 'kichik' END",
    "-- oddiy (simple)",
    "CASE status WHEN 'paid' THEN 1 WHEN 'new' THEN 0 ELSE -1 END",
    "```",
    "Birinchi mos `WHEN` ishlaydi; `ELSE` bo'lmasa va hech biri mos kelmasa `NULL`.",
    "",
    "### Qayerda ishlatiladi",
    "- `SELECT` (yorliqlar, kategoriyalar).",
    "- `ORDER BY` (maxsus tartib): `ORDER BY CASE status WHEN 'urgent' THEN 0 ELSE 1 END, id`.",
    "- `GROUP BY`, aggregat ichida (shartli yig'indi): `SUM(CASE WHEN ... THEN total END)`.",
    "- `UPDATE ... SET col = CASE ... END` (bir so'rovda turli qiymat).",
    "- Pivot (qatorni ustunga).",
    "",
    "### Boshqa shartli funksiyalar",
    "`IF(cond, a, b)` (MySQL), `IFNULL(x, d)`, `COALESCE(a, b, c)`, `NULLIF(a, b)` (tenglikda NULL: nolga bo'lishdan saqlanish `x / NULLIF(y, 0)`).",
    "",
    "### Nuanslar",
    "- Barcha shoxlar bir xil turda bo'lsin (aralash tur kutilmagan o'girish).",
    "- `CASE` ichidagi `NULL` solishtirish: `WHEN col = NULL` ishlamaydi → `WHEN col IS NULL`.",
    "- Indeksga ta'sir: `ORDER BY CASE` indeksdan foydalanmaydi (filesort).",
    "",
    "### Laravel",
    "`selectRaw('CASE WHEN ... END as label')`, `orderByRaw()`."
  ],
  "examples": [
    {
      "title": "Segmentatsiya va tartib",
      "lang": "sql",
      "code": [
        "SELECT id, total,",
        "  CASE WHEN total >= 1000000 THEN 'VIP' WHEN total >= 100000 THEN 'oddiy' ELSE 'kichik' END AS segment",
        "FROM orders",
        "ORDER BY CASE status WHEN 'urgent' THEN 0 WHEN 'new' THEN 1 ELSE 2 END, id;",
        "",
        "SELECT revenue / NULLIF(orders, 0) AS avg_check FROM stats;     -- nolga bo'lishdan saqlanish"
      ]
    }
  ],
  "pitfalls": [
    "`WHEN col = NULL` ishlamaydi: `IS NULL`.",
    "`ORDER BY CASE` indeksdan foydalanmaydi (filesort).",
    "Shoxlarda aralash tur kutilmagan o'girish beradi.",
    "`ELSE` yozilmasa mos kelmagan holat `NULL` qaytaradi."
  ]
});
