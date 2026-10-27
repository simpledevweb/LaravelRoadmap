/* Chuqur dars: 10.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.9", {
  "lesson": [
    "### Tamoyil",
    "Avval **o'lchang** (slow log, `EXPLAIN`), keyin optimallang. Ko'pincha sabab: indeks yo'qligi, ortiqcha ma'lumot, N+1.",
    "",
    "### Texnikalar",
    "1. **Sargable shartlar:** ustunda funksiya/hisob yo'q (`WHERE created_at >= ...`, `WHERE price > 100 / 1.2` emas `price*1.2 > 100`).",
    "2. `SELECT *` o'rniga kerakli ustunlar (covering, kam trafik).",
    "3. **To'g'ri indeks:** WHERE, JOIN, ORDER BY ustunlari uchun composite (6-mavzu).",
    "4. **JOIN ustunlariga indeks**, to'g'ri turdagi ustunlar (collation/tur bir xil).",
    "5. `LIMIT` + keyset pagination: katta `OFFSET` o'rniga `WHERE id < :last`.",
    "6. `EXISTS` `IN (subquery)` o'rniga (ko'p hollarda; 8.0 optimizer ikkalasini yaxshilagan).",
    "7. `OR` o'rniga `UNION ALL` (turli ustunlarda).",
    "8. **Batch:** ko'p `INSERT` o'rniga bitta ko'p qatorli; `chunk`.",
    "9. **N+1 ni yo'qoting:** eager loading, `JOIN`/`IN`.",
    "10. **Aggregatsiyani DB'da** (ilovada emas), natijani keshlang.",
    "",
    "### Anti-pattern'lar",
    "`ORDER BY RAND()`, `LIKE '%x%'`, tsiklda so'rov, `COUNT(*)` har sahifada katta jadvalda, `SELECT DISTINCT` bilan muammoni yashirish.",
    "",
    "### Statistika",
    "`ANALYZE TABLE`, histogramma (`ANALYZE TABLE ... UPDATE HISTOGRAM ON col`, 8.0).",
    "",
    "### Optimizer hint",
    "`USE INDEX`, `FORCE INDEX`, `/*+ ... */` — oxirgi chora; ma'lumot o'zgarsa eskirishi mumkin.",
    "",
    "### Laravel",
    "`->select()`, `->with()`, `chunkById`, `cursorPaginate`, `DB::listen`/Telescope'da so'rovlarni kuzatish."
  ],
  "examples": [
    {
      "title": "Keyset pagination",
      "lang": "sql",
      "code": [
        "-- sekin: OFFSET ming qatorni o'qib tashlaydi",
        "SELECT id, title FROM posts ORDER BY id DESC LIMIT 20 OFFSET 100000;",
        "",
        "-- tez: oxirgi ko'rilgan id dan",
        "SELECT id, title FROM posts WHERE id < 98765 ORDER BY id DESC LIMIT 20;"
      ]
    }
  ],
  "pitfalls": [
    "Katta `OFFSET` ming qatorni o'qib tashlaydi: keyset (cursor) pagination.",
    "`ORDER BY RAND()` butun jadvalni saralaydi.",
    "Tsikl ichida so'rov (N+1) har qanday indeksdan ko'ra ko'proq zarar beradi.",
    "`FORCE INDEX` ma'lumot o'zgarganda eskirib sekinlashtirishi mumkin."
  ]
});
