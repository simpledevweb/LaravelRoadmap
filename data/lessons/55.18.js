/* Chuqur dars: 55.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.18", {
  "lesson": [
    "### EXPLAIN ANALYZE",
    "So'rovni **haqiqatan bajarib**, rejadagi har tugun uchun **real vaqt, qatorlar soni va takrorlar**ni ko'rsatadi: taxmin va haqiqat farqini topadi.",
    "",
    "### MySQL (8.0.18+)",
    "`EXPLAIN ANALYZE SELECT ...` — daraxt: `actual time=0.05..1.2 rows=100 loops=1` va taxminiy `cost`, `rows`. `EXPLAIN FORMAT=TREE` — bajarmasdan.",
    "",
    "### PostgreSQL",
    "`EXPLAIN (ANALYZE, BUFFERS, VERBOSE) SELECT ...`: `Seq Scan`, `Index Scan`, `Index Only Scan`, `Bitmap Heap Scan`, `Nested Loop/Hash Join/Merge Join`, `Buffers: shared hit/read` (kesh/disk), `Planning/Execution Time`.",
    "",
    "### Nimaga qarash",
    "1. **Taxmin vs real qatorlar:** katta farq — statistika eskirgan (`ANALYZE`) yoki noto'g'ri taxmin.",
    "2. **Seq Scan / type=ALL** katta jadvalda.",
    "3. **Eng sekin tugun** (actual time).",
    "4. **loops** (ichki so'rov ko'p marta).",
    "5. **Sort/filesort**, vaqtinchalik jadval, disk'ga to'kilish.",
    "6. **Buffers read** (diskdan) ko'p — kesh yetmaydi.",
    "",
    "### Ehtiyot",
    "`ANALYZE` so'rovni **bajaradi**: `INSERT/UPDATE/DELETE` ma'lumotni **o'zgartiradi** (PostgreSQL) — tranzaksiyada `BEGIN; EXPLAIN ANALYZE ...; ROLLBACK;`. Og'ir so'rov productionda yuk beradi.",
    "",
    "### Sinash",
    "Production hajmidagi ma'lumotda; \"issiq\" kesh bilan ikkinchi marta ham ishga tushiring.",
    "",
    "### Vositalar",
    "`explain.dalibo.com`, `explain.depesz.com`, pgMustard, MySQL Workbench."
  ],
  "examples": [
    {
      "title": "PostgreSQL xavfsiz",
      "lang": "sql",
      "code": [
        "BEGIN;",
        "EXPLAIN (ANALYZE, BUFFERS) UPDATE orders SET status = 'x' WHERE user_id = 5;   -- haqiqatan o'zgartiradi!",
        "ROLLBACK;",
        "",
        "-- MySQL",
        "EXPLAIN ANALYZE SELECT o.id FROM orders o JOIN users u ON u.id = o.user_id WHERE u.email = 'a@b.uz';"
      ]
    }
  ],
  "pitfalls": [
    "PostgreSQL'da `EXPLAIN ANALYZE` DML'ni haqiqatan bajaradi: tranzaksiya + ROLLBACK.",
    "Taxmin va real qatorlar farqi katta bo'lsa `ANALYZE` (statistika).",
    "Kichik test ma'lumotida reja production'dagidan farq qiladi.",
    "Birinchi (sovuq kesh) va ikkinchi (issiq) ishga tushirish natijasi farq qiladi."
  ]
});
