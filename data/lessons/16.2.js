/* Chuqur dars: 16.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.2", {
  "lesson": [
    "### EXPLAIN va EXPLAIN ANALYZE farqi",
    "`EXPLAIN` faqat reja va taxmin. `EXPLAIN ANALYZE` so'rovni **haqiqatan bajaradi** va har bosqich uchun real o'lchovlarni qo'shadi: vaqt, qaytgan qatorlar soni va bosqich necha marta (loops) bajarilgani. MySQL 8.0.18+ va PostgreSQL ikkalasi ham qo'llaydi.",
    "",
    "### Eng muhim signal: taxmin va reallik farqi",
    "Optimizer reja tanlashda qatorlar sonini taxmin qiladi. Agar u 10 qator kutib, aslida 1 000 000 qator chiqsa, tanlangan reja (masalan, Nested Loop) noto'g'ri bo'ladi. Farq 10x dan katta bo'lsa, sababini qidiring:",
    "- Eskirgan statistika: `ANALYZE TABLE` (MySQL), `ANALYZE` (PostgreSQL).",
    "- Korrelyatsiyali ustunlar: optimizer ularni mustaqil deb hisoblaydi. PostgreSQL'da `CREATE STATISTICS`, MySQL 8 da histogrammalar (`ANALYZE TABLE ... UPDATE HISTOGRAM ON col`).",
    "- Notekis taqsimot: bitta mijozning 50% buyurtmalari.",
    "",
    "### O'qish",
    "MySQL: `-> Index lookup on orders using idx (customer_id=42) (cost=... rows=1840) (actual time=0.05..2.1 rows=1840 loops=1)`.",
    "PostgreSQL: `(actual time=0.04..2.10 rows=1840 loops=1)` va `BUFFERS` bilan `shared hit/read`.",
    "",
    "Vaqt va qatorlar **bitta loop uchun**. Jami vaqt = vaqt × loops. Nested Loop ichidagi tugun 0.02 ms × 50 000 loop = 1 sekund.",
    "",
    "### Xavfsizlik",
    "So'rov haqiqatan bajariladi:",
    "- `UPDATE`/`DELETE`/`INSERT` ni faqat `BEGIN ... ROLLBACK` ichida tahlil qiling. MySQL'da `EXPLAIN ANALYZE` faqat `SELECT` (va ba'zi DML) uchun ishlaydi.",
    "- Og'ir so'rov production'ni yuklaydi. Replikada yoki kam yuk paytida ishga tushiring.",
    "- `statement_timeout` (PostgreSQL) yoki `MAX_EXECUTION_TIME` hint (MySQL) bilan cheklang.",
    "",
    "### Sovuq va issiq kesh",
    "Birinchi ishga tushirishda ma'lumot diskdan o'qiladi (sovuq), keyingisida xotiradan (issiq). Vaqtlar 10x farq qilishi mumkin. Bir necha marta o'lchang. PostgreSQL'da `BUFFERS` (`read` diskdan, `hit` keshdan) vaqtdan ko'ra barqarorroq ko'rsatkich.",
    "",
    "### Amaliy tartib",
    "1. `EXPLAIN ANALYZE` bilan eng ko'p vaqt olgan tugunni toping.",
    "2. Shu tugunda taxmin va haqiqatni solishtiring.",
    "3. `Rows Removed by Filter` (PostgreSQL) yoki `filtered` past (MySQL) bo'lsa, indeks shartni qamramayapti.",
    "4. Tuzatish → qayta o'lchash → natijani PR'da raqamlar bilan yozish (16.18)."
  ],
  "examples": [
    {
      "title": "Yozuvchi so'rovni xavfsiz tahlil qilish (PostgreSQL)",
      "lang": "sql",
      "code": [
        "BEGIN;",
        "SET LOCAL statement_timeout = '30s';",
        "EXPLAIN (ANALYZE, BUFFERS)",
        "UPDATE orders SET status = 'expired'",
        "WHERE status = 'pending' AND created_at < now() - interval '30 days';",
        "ROLLBACK;"
      ]
    },
    {
      "title": "MySQL 8 EXPLAIN ANALYZE",
      "lang": "sql",
      "code": [
        "EXPLAIN ANALYZE",
        "SELECT c.id, c.name, COUNT(o.id)",
        "FROM customers c JOIN orders o ON o.customer_id = c.id",
        "WHERE o.created_at >= '2025-01-01'",
        "GROUP BY c.id;",
        "",
        "-- -> Nested loop inner join (actual time=0.1..980 rows=420000 loops=1)",
        "--     -> Table scan on o (actual time=0.05..310 rows=1000000 loops=1)",
        "",
        "ANALYZE TABLE orders UPDATE HISTOGRAM ON created_at WITH 64 BUCKETS;"
      ],
      "note": "`created_at` da indeks yo'q, shuning uchun `orders` to'liq skan qilinmoqda."
    }
  ],
  "pitfalls": [
    "`EXPLAIN ANALYZE DELETE` ni tranzaksiyasiz ishga tushirish: ma'lumot haqiqatan o'chadi.",
    "`loops` ni hisobga olmaslik va ichki tugun vaqtini kichik deb o'ylash.",
    "Bir martalik o'lchovga tayanish: sovuq va issiq kesh natijani keskin o'zgartiradi.",
    "Production'da og'ir so'rovni timeout'siz tahlil qilish: tahlilning o'zi saytni sekinlashtiradi."
  ]
});
