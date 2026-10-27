/* Chuqur dars: 55.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.4", {
  "lesson": [
    "### Covering index",
    "So'rov uchun kerak **barcha ustunlar** indeksning o'zida: jadval qatoriga bormaydi. MySQL `EXPLAIN` → `Using index`. (Batafsil: 10.7.)",
    "",
    "### MySQL",
    "Secondary indeks PK'ni o'z ichiga oladi: `SELECT id FROM t WHERE email = ?` `(email)` bilan covering. Qo'shimcha ustunlarni indeks **oxiriga** qo'shing: `(user_id, status, total)`.",
    "",
    "### PostgreSQL",
    "`CREATE INDEX ... ON orders (user_id) INCLUDE (status, total);` — `INCLUDE` kalitga kirmaydigan, faqat covering uchun ustunlar (indeks tartibi buzilmaydi). **Index-only scan** (55.13) uchun.",
    "",
    "### Foydasi",
    "Back lookup yo'q: kam I/O, ixcham indeks xotirada.",
    "",
    "### Narxi",
    "Indeks kattalashadi, yozish sekinlashadi; `TEXT/BLOB` ustunlar covering bo'la olmaydi; `SELECT *` covering'ni buzadi.",
    "",
    "### Qachon",
    "Tez-tez bajariladigan, bir nechta ustunli o'qish so'rovlari (ro'yxat, hisoblagich, lookup).",
    "",
    "### Tekshirish",
    "`EXPLAIN` da `Using index` (MySQL), `Index Only Scan` (PostgreSQL); `Heap Fetches` (PG) kam bo'lsin (VACUUM kerak).",
    "",
    "### Laravel",
    "`->select('status', 'total')` — faqat kerakli ustunlar."
  ],
  "examples": [
    {
      "title": "Covering",
      "lang": "sql",
      "code": [
        "-- MySQL: kerakli ustunlar indeks oxirida",
        "CREATE INDEX idx_orders_cover ON orders (user_id, status, total);",
        "EXPLAIN SELECT status, total FROM orders WHERE user_id = 5;   -- Using index",
        "",
        "-- PostgreSQL",
        "-- CREATE INDEX idx_orders_cover ON orders (user_id) INCLUDE (status, total);"
      ]
    }
  ],
  "pitfalls": [
    "`SELECT *` covering'ni buzadi.",
    "Ko'p ustunni indeksga qo'shish uni kattalashtiradi va yozishni sekinlashtiradi.",
    "`TEXT/BLOB` ustunlar covering bo'la olmaydi.",
    "Foydani `EXPLAIN` bilan tasdiqlang, taxmin qilmang."
  ]
});
