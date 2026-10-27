/* Chuqur dars: 9.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.20", {
  "lesson": [
    "### Indeks qachon ishlaydi",
    "Indeks **WHERE, JOIN, ORDER BY, GROUP BY** ustunlarida va **sargable** (indeks ishlatishga yaroqli) shartlarda foydali.",
    "",
    "### Sargable shartlar",
    "- ✓ `col = ?`, `col IN (...)`, `col > ? AND col < ?`, `col LIKE 'abc%'`.",
    "- ✗ Ustunda **funksiya/hisob**: `WHERE YEAR(created_at) = 2025`, `WHERE price * 1.2 > 100`, `WHERE LOWER(email) = ...` (functional index bo'lmasa).",
    "- ✗ **Turni o'girish**: `WHERE varchar_col = 123`.",
    "- ✗ `LIKE '%abc'`, `!=`/`NOT IN`, turli ustunlarda `OR`.",
    "",
    "### Composite",
    "Chap prefiks qoidasi, tenglik → diapazon → tartib (10.6). `(a, b, c)` `b` yolg'iz uchun emas.",
    "",
    "### Covering",
    "Kerakli ustunlar indeksda: jadvalga bormaydi (`Using index`).",
    "",
    "### JOIN",
    "Join ustunlariga (FK) indeks; turlari/collation bir xil.",
    "",
    "### ORDER BY + LIMIT",
    "Indeks tartibida bo'lsa filesort yo'q va birinchi N qator tez: `WHERE user_id = ? ORDER BY created_at DESC LIMIT 20` → `(user_id, created_at)`.",
    "",
    "### Selektivlik",
    "Past selektivlik (kam xil qiymat: `status` 2–3 ta, `boolean`) indeks foydasi kam; optimizer skanni afzal ko'rishi mumkin. Composite bilan birga foydali.",
    "",
    "### Nazorat",
    "`EXPLAIN` → `key`, `type`; foydalanilmayotgan indekslar (`sys.schema_unused_indexes`) va dublikatlar o'chiriladi: har indeks yozishni sekinlashtiradi.",
    "",
    "### Laravel",
    "Migratsiyada `index()`, `unique()`, `index(['user_id', 'created_at'])`; `foreignId` indeks yaratadi."
  ],
  "examples": [
    {
      "title": "Sargable qilish",
      "lang": "sql",
      "code": [
        "-- indeks ishlamaydi",
        "SELECT * FROM orders WHERE YEAR(created_at) = 2025;",
        "-- ishlaydi",
        "SELECT * FROM orders WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';",
        "",
        "CREATE INDEX idx_orders_created ON orders (created_at);"
      ]
    }
  ],
  "pitfalls": [
    "Ustunda funksiya (`YEAR(col)`) indeksni o'chiradi: diapazonga o'giring.",
    "VARCHAR ustunni son bilan solishtirish implicit cast bilan indeksni ishlatmaydi.",
    "Past selektivli ustun (`boolean`) yolg'iz indeksdan kam foyda.",
    "Ortiqcha indekslar yozishni sekinlashtiradi: foydalanilmayotganlarini o'chiring."
  ]
});
