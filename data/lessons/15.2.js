/* Chuqur dars: 15.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.2", {
  "lesson": [
    "### Sekin so'rovlarni tahlil qilish",
    "**Slow query log** (10.17) + shablon bo'yicha guruhlash → eng ko'p **jami vaqt** olayotgan so'rovlar.",
    "",
    "### Yig'ish",
    "- MySQL: `slow_query_log=1`, `long_query_time=0.5–1`, `min_examined_row_limit`.",
    "- PostgreSQL: `log_min_duration_statement`, `pg_stat_statements`.",
    "- APM va Telescope.",
    "",
    "### Tahlil",
    "- `mysqldumpslow`, `pt-query-digest`, `sys.statement_analysis`.",
    "- Guruhlash: normallashtirilgan shablon (`WHERE id = ?`).",
    "- Saralash: **jami vaqt** (soni × o'rtacha), keyin o'rtacha/p95, `Rows_examined`.",
    "",
    "### Ko'rsatkichlar",
    "- `Rows_examined / Rows_sent` nisbati katta — indeks kerak.",
    "- `Lock_time` katta — qulf bahsi.",
    "- `tmp_disk_tables`, `filesort`.",
    "- Chaqiruvlar soni.",
    "",
    "### Sabablar (odatda)",
    "Indeks yo'q yoki ishlatilmayapti, N+1, katta natija (`SELECT *`, `LIMIT`siz), katta `OFFSET`, `ORDER BY` indekssiz, `LIKE '%x%'`, sekin join, qulf.",
    "",
    "### Jarayon",
    "1. Eng og'ir 5–10 shablonni tanlang.",
    "2. Har biriga `EXPLAIN (ANALYZE)`.",
    "3. Tuzating (indeks/qayta yozish/kesh).",
    "4. Qayta o'lchang; regressiyani CI/monitoring bilan kuzating.",
    "",
    "### Namuna",
    "`pt-query-digest slow.log` → \"Rank 1: 40% jami vaqt, 120k chaqiruv, `SELECT ... WHERE user_id = ?`, Rows_examined 50k\" → `(user_id, created_at)` indeksi.",
    "",
    "### Tuzoq",
    "Bitta juda sekin so'rovga emas, ming marta chaqiriladigan o'rtacha so'rovga e'tibor (jami vaqt)."
  ],
  "examples": [
    {
      "title": "Tahlil",
      "lang": "bash",
      "code": [
        "pt-query-digest /var/log/mysql/slow.log --limit 10 | head -80",
        "mysqldumpslow -s t -t 10 /var/log/mysql/slow.log"
      ]
    }
  ],
  "pitfalls": [
    "Faqat eng sekin bitta so'rovga qarash: ming marta chaqiriladigan o'rtacha so'rov jami vaqtda ustun bo'lishi mumkin.",
    "`long_query_time` juda katta bo'lsa muammolar sezilmaydi.",
    "Shablonlarga ajratmay (parametrlar bilan) tahlil qilish naqshni yashiradi.",
    "Tuzatgandan keyin qayta o'lchamaslik foyda tasdiqlanmaydi."
  ]
});
