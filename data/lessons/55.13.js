/* Chuqur dars: 55.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.13", {
  "lesson": [
    "### Index-only scan",
    "So'rov natijasi uchun kerak hamma ustun indeksda bo'lsa, **jadvalga (heap/clustered) umuman murojaat qilinmaydi**: faqat indeksdan o'qiladi.",
    "",
    "### MySQL",
    "Covering index → `EXPLAIN` `Extra: Using index`. InnoDB'da secondary indeks PK'ni o'z ichiga oladi (shuning uchun `SELECT id` ham covering).",
    "",
    "### PostgreSQL",
    "`Index Only Scan`. Qo'shimcha shart: **visibility map** — sahifadagi barcha qatorlar \"ko'rinadigan\" (all-visible) belgilanishi kerak, aks holda heap tekshiriladi (`Heap Fetches`). Buni `VACUUM` yangilaydi: yozish ko'p jadvalda index-only scan foydasi kamayadi (autovacuum sozlash).",
    "`INCLUDE` ustunlar bilan.",
    "",
    "### Qanday erishish",
    "- So'rovdagi ustunlar (SELECT, WHERE, ORDER) indeksda.",
    "- `SELECT *` emas.",
    "- Mos composite/covering indeks.",
    "",
    "### Foydasi",
    "Kam I/O, tez, indeks xotirada; ayniqsa katta jadvalda.",
    "",
    "### Tekshirish",
    "MySQL: `Using index`; PG: `EXPLAIN (ANALYZE, BUFFERS)` → `Heap Fetches: 0` yaqin.",
    "",
    "### Cheklov",
    "`TEXT/BLOB`, ifodalar (functional index bo'lmasa), indeks hajmi, yozish narxi.",
    "",
    "### Laravel",
    "`->select('id', 'status')` + mos indeks; `->count()` ham covering indeksdan foydalanishi mumkin."
  ],
  "examples": [
    {
      "title": "Index-only",
      "lang": "sql",
      "code": [
        "-- MySQL",
        "EXPLAIN SELECT user_id, status FROM orders WHERE user_id = 5;       -- Extra: Using index",
        "-- PostgreSQL",
        "EXPLAIN (ANALYZE, BUFFERS) SELECT user_id, status FROM orders WHERE user_id = 5;   -- Index Only Scan, Heap Fetches kam",
        "VACUUM (ANALYZE) orders;                                                              -- visibility map"
      ]
    }
  ],
  "pitfalls": [
    "PostgreSQL'da VACUUM bo'lmasa index-only scan baribir heap'ga boradi (`Heap Fetches`).",
    "`SELECT *` index-only scan'ni yo'q qiladi.",
    "`TEXT/BLOB` ustun index-only bo'la olmaydi.",
    "Foydani `EXPLAIN` bilan tekshirmasdan taxmin qilmang."
  ]
});
