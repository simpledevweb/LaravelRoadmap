/* Chuqur dars: 55.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.14", {
  "lesson": [
    "### Indeks texnik xizmati",
    "Indekslar vaqt o'tishi bilan **fragmentatsiya**ga uchraydi, statistika eskiradi, hajm o'sadi. Muntazam xizmat kerak.",
    "",
    "### MySQL",
    "- `ANALYZE TABLE t;` — statistikani yangilaydi (optimizer uchun muhim).",
    "- `OPTIMIZE TABLE t;` — jadvalni/indekslarni qayta quradi, joyni qaytaradi (InnoDB'da `ALTER TABLE ... ENGINE=InnoDB`, qulf/vaqt: katta jadvalda online yoki gh-ost/pt-osc).",
    "- Online DDL: `ALTER TABLE t ADD INDEX ..., ALGORITHM=INPLACE, LOCK=NONE`.",
    "- Ko'p DELETE/UPDATE'dan keyin bo'sh joy.",
    "",
    "### PostgreSQL",
    "- `VACUUM`/autovacuum — o'lik qatorlarni tozalaydi (bloat), visibility map.",
    "- `ANALYZE` — statistika.",
    "- `REINDEX [CONCURRENTLY]` — indeksni qayta qurish (bloat).",
    "- `CREATE INDEX CONCURRENTLY` — yozishni bloklamasdan.",
    "",
    "### Production'da indeks qo'shish",
    "Katta jadvalda oddiy `CREATE INDEX` yozishni bloklashi mumkin: MySQL online DDL, PG `CONCURRENTLY`. Navbatli yuklama past vaqtda; disk joyi yetarli; replica lag.",
    "",
    "### Kuzatish",
    "Indeks hajmi (`information_schema.TABLES.index_length`, `pg_relation_size`), bloat, `Handler_*`, ishlatilmagan indekslar (55.17).",
    "",
    "### Jarayon",
    "Muntazam (jadval): ANALYZE; zarur bo'lsa OPTIMIZE/REINDEX; ishlatilmagan indeksni o'chirish; hajmni monitoring.",
    "",
    "### Laravel",
    "Migratsiyada katta jadvalga indeks: xom `ALTER ... ALGORITHM=INPLACE` yoki `CONCURRENTLY` (PG; `$withinTransaction = false`)."
  ],
  "examples": [
    {
      "title": "Xizmat buyruqlari",
      "lang": "sql",
      "code": [
        "ANALYZE TABLE orders;",
        "ALTER TABLE orders ADD INDEX idx_user_created (user_id, created_at), ALGORITHM=INPLACE, LOCK=NONE;   -- MySQL online",
        "-- PostgreSQL",
        "-- CREATE INDEX CONCURRENTLY idx_user_created ON orders (user_id, created_at);",
        "-- REINDEX INDEX CONCURRENTLY idx_user_created;"
      ]
    }
  ],
  "pitfalls": [
    "Katta jadvalda oddiy `CREATE INDEX` yozishni bloklashi mumkin: online DDL/CONCURRENTLY.",
    "Eskirgan statistika noto'g'ri reja beradi: muntazam ANALYZE.",
    "`OPTIMIZE TABLE` katta jadvalda uzoq/qulf: rejalashtiring yoki gh-ost.",
    "Disk joyi yetmasa indeks yaratish yarim yo'lda to'xtaydi."
  ]
});
