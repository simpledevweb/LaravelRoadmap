/* Chuqur dars: 10.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.7", {
  "lesson": [
    "### Covering index",
    "So'rov uchun kerak **hamma ustunlar** indeksning o'zida bo'lsa, MySQL jadval qatoriga (clustered index) **bormaydi**: faqat indeksdan o'qiydi. `EXPLAIN` da `Extra: Using index`.",
    "",
    "### Nega tez",
    "Back lookup (secondary → PK → qator) yo'q: kam I/O, indeks xotirada ixcham.",
    "",
    "### InnoDB xususiyati",
    "Secondary indeks PK'ni avtomatik o'z ichiga oladi, shuning uchun `SELECT id FROM t WHERE email = ?` `(email)` indeksi bilan covering bo'ladi.",
    "",
    "### Qanday yaratish",
    "Kerakli ustunlarni indeks oxiriga qo'shing:",
    "`INDEX (user_id, status, total)` → `SELECT status, total FROM orders WHERE user_id = ?`.",
    "MySQL'da PostgreSQL'dagi `INCLUDE` yo'q: qo'shimcha ustun indeks kalitiga kiradi.",
    "",
    "### Qachon foydali",
    "- Tez-tez bajariladigan, kam ustunli o'qish so'rovlari (ro'yxat, hisoblagich).",
    "- `SELECT *` o'rniga kerakli ustunlar.",
    "- Katta jadvalda back lookup qimmat.",
    "",
    "### Narx",
    "Indeks kattalashadi, yozish sekinlashadi; juda ko'p ustun qo'shmang. `TEXT/BLOB` ustunlar covering bo'la olmaydi (prefiks).",
    "",
    "### Tekshirish",
    "`EXPLAIN SELECT ...` → `Extra: Using index`; `rows`, `key_len`. `SELECT *` covering'ni buzadi.",
    "",
    "### Laravel",
    "`->select('id', 'status')` bilan: faqat kerakli ustunlarni tanlash covering imkonini beradi."
  ],
  "examples": [
    {
      "title": "Covering",
      "lang": "sql",
      "code": [
        "CREATE INDEX idx_orders_user_status_total ON orders (user_id, status, total);",
        "",
        "EXPLAIN SELECT status, total FROM orders WHERE user_id = 5;",
        "-- Extra: Using index  (jadvalga bormaydi)"
      ]
    }
  ],
  "pitfalls": [
    "`SELECT *` covering'ni buzadi: kerakli ustunlarni tanlang.",
    "Juda ko'p ustun qo'shish indeksni kattalashtiradi va yozishni sekinlashtiradi.",
    "`TEXT/BLOB` ustunlar to'liq covering bo'la olmaydi.",
    "Covering foydasini `EXPLAIN` da `Using index` bilan tasdiqlang, taxmin qilmang."
  ]
});
