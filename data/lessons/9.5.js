/* Chuqur dars: 9.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.5", {
  "lesson": [
    "### CTE (Common Table Expression)",
    "`WITH` bilan **nomlangan vaqtinchalik natija to'plami**; so'rovni bo'laklarga ajratib o'qilishni yaxshilaydi. MySQL 8.0+.",
    "```sql",
    "WITH paid AS (SELECT user_id, SUM(total) s FROM orders WHERE status='paid' GROUP BY user_id)",
    "SELECT u.name, p.s FROM users u JOIN paid p ON p.user_id = u.id;",
    "```",
    "",
    "### Foydasi",
    "- O'qilish: ichma-ich subquery o'rniga nomlangan qadamlar.",
    "- Bir nechta marta qayta ishlatish (bir so'rov ichida).",
    "- Bir nechta CTE: `WITH a AS (...), b AS (SELECT ... FROM a)`.",
    "",
    "### Rekursiv CTE",
    "Ierarxiya (kategoriya daraxti, tashkilot, yo'l):",
    "```sql",
    "WITH RECURSIVE tree AS (",
    "  SELECT id, parent_id, name, 0 AS depth FROM categories WHERE parent_id IS NULL",
    "  UNION ALL",
    "  SELECT c.id, c.parent_id, c.name, t.depth + 1 FROM categories c JOIN tree t ON c.parent_id = t.id",
    ")",
    "SELECT * FROM tree;",
    "```",
    "Cheklov: `cte_max_recursion_depth` (default 1000); tsikl (cycle) bo'lsa to'xtatish sharti kerak.",
    "",
    "### Nuanslar",
    "- MySQL CTE'ni **materialize** qilishi yoki inline qilishi mumkin (optimizer); PostgreSQL 12+ kabi `MATERIALIZED` bayroq yo'q.",
    "- CTE indeks yaratmaydi; katta natijada vaqtinchalik jadval.",
    "- CTE `UPDATE/DELETE` bilan ham ishlatiladi.",
    "",
    "### Qachon ishlating",
    "Murakkab so'rovlarni tushunarli qilish, ierarxiya (rekursiv), bir hisobni qayta ishlatish.",
    "",
    "### Laravel",
    "`DB::select('WITH ...')` (xom SQL) yoki `staudenmeir/laravel-cte` paketi."
  ],
  "examples": [
    {
      "title": "Rekursiv",
      "lang": "sql",
      "code": [
        "WITH RECURSIVE tree AS (",
        "  SELECT id, parent_id, name, 0 AS depth FROM categories WHERE parent_id IS NULL",
        "  UNION ALL",
        "  SELECT c.id, c.parent_id, c.name, t.depth + 1",
        "  FROM categories c JOIN tree t ON c.parent_id = t.id",
        ")",
        "SELECT CONCAT(REPEAT('  ', depth), name) AS label FROM tree ORDER BY depth, name;"
      ]
    }
  ],
  "pitfalls": [
    "Rekursiv CTE'da tsikl bo'lsa cheksiz ishlaydi: `cte_max_recursion_depth` va to'xtatish sharti.",
    "CTE avtomatik tezlashtirmaydi: baribir indekslar va `EXPLAIN`.",
    "MySQL'ning 8.0 dan eskisida CTE yo'q.",
    "CTE ichida katta natija vaqtinchalik jadvalga yoziladi (xotira/disk)."
  ]
});
