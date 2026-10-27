/* Chuqur dars: 15.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.7", {
  "lesson": [
    "### Full table scan nima",
    "Jadvalning **barcha qatorlarini** o'qish: MySQL `type=ALL`, PostgreSQL `Seq Scan`. Katta jadvalda sekin va I/O ni to'ldiradi.",
    "",
    "### Sabablar",
    "- WHERE ustunida **indeks yo'q**.",
    "- **Indeks ishlatilmaydi:** ustunda funksiya (`WHERE YEAR(col)`), turni o'girish, `LIKE '%x'`, `OR`, `!=`/`NOT IN`.",
    "- Past selektivlik (optimizer tanlagan).",
    "- `SELECT` ... ORDER BY indekssiz (filesort).",
    "- Eskirgan statistika.",
    "- `JOIN` ustunlarida indeks yo'q.",
    "",
    "### Tuzatish",
    "1. **Indeks qo'shing** (so'rovga mos, composite).",
    "2. **Sargable** qilib qayta yozing (ustunda funksiya yo'q; diapazon).",
    "3. Turlarni mos qiling (VARCHAR ↔ son emas).",
    "4. `LIKE '%x%'` → full-text/trigram/qidiruv dvigateli.",
    "5. `OR` → `UNION ALL`.",
    "6. `ANALYZE TABLE`.",
    "7. `LIMIT`, filtr qo'shish.",
    "",
    "### Qachon full scan normal",
    "Kichik jadval; so'rov qatorlarning katta qismini oladi (hisobot); bir martalik admin skript.",
    "",
    "### Aniqlash",
    "`EXPLAIN` (`type=ALL`, katta `rows`), slow log (`Rows_examined` katta), `Handler_read_rnd_next` o'sishi, `log_queries_not_using_indexes`.",
    "",
    "### Laravel",
    "`->explain()` bilan tekshirish; migratsiyada indeks; `whereDate()` o'rniga diapazon: `whereBetween('created_at', [$start, $end])`."
  ],
  "examples": [
    {
      "title": "Sargable qilish",
      "lang": "sql",
      "code": [
        "-- full scan",
        "SELECT * FROM orders WHERE DATE(created_at) = '2025-06-01';",
        "SELECT * FROM users WHERE phone = 998901234567;          -- phone VARCHAR: implicit cast",
        "-- indeksli",
        "SELECT * FROM orders WHERE created_at >= '2025-06-01' AND created_at < '2025-06-02';",
        "SELECT * FROM users WHERE phone = '998901234567';"
      ]
    }
  ],
  "pitfalls": [
    "Ustunda funksiya (`DATE(col)`) indeksni o'chirib to'liq skan beradi: diapazon.",
    "VARCHAR ustunni son bilan solishtirish implicit cast: to'liq skan.",
    "Kichik jadvalda to'liq skan normal (optimizer tanlovi).",
    "`LIKE '%x%'` uchun B-tree yetarli emas: full-text/trigram."
  ]
});
