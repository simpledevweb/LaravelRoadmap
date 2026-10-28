/* Chuqur dars: 16.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.3", {
  "lesson": [
    "### Reja daraxti",
    "Ijro rejasi — operatsiyalar daraxti. Barg tugunlar jadvallardan ma'lumot o'qiydi, yuqoridagi tugunlar uni birlashtiradi, filtrlaydi, saralaydi va cheklaydi. Bajarilish **ichkaridan tashqariga** (eng chuqur surilgan qatordan yuqoriga) ketadi. `Limit` tugun ichki tugunlarni erta to'xtatishi mumkin.",
    "",
    "### Kirish usullari",
    "Taxminan yaxshidan yomonga (lekin kontekstga bog'liq):",
    "1. **PK yoki unique lookup** (`const`, `eq_ref`, Index Scan bitta qator).",
    "2. **Index range scan**: diapazon yoki tenglik bo'yicha indeks qismi.",
    "3. **Index-only scan** (covering): faqat indeks, jadvalga murojaat yo'q. Ko'p qatorli o'qishda eng tez.",
    "4. **Bitmap scan** (PostgreSQL): indeksdan sahifalar ro'yxati, keyin jadvaldan ketma-ket o'qish. O'rta selektivlik.",
    "5. **Full table scan** (`ALL`, Seq Scan).",
    "",
    "Full scan har doim yomon emas. Kichik jadvalda yoki qatorlarning katta qismi kerak bo'lsa, u indeksdan tezroq. Muammo katta jadvalda kam qator uchun full scan bo'lganda.",
    "",
    "### JOIN algoritmlari",
    "- **Nested Loop:** tashqi har qator uchun ichki jadvaldan qidiruv. Tashqi to'plam kichik va ichki tomonda indeks bo'lsa, zo'r. Aks holda O(N×M).",
    "- **Hash Join:** kichikroq tomondan xotirada hash jadval, kattasi u bo'yicha tekshiriladi. Faqat tenglik sharti. MySQL 8.0.18+ va PostgreSQL. Xotira yetmasa, diskka tushadi.",
    "- **Merge Join:** ikkala kirish kalit bo'yicha tartiblangan bo'lsa. Katta tartiblangan to'plamlar uchun.",
    "",
    "### Qizil bayroqlar",
    "- Katta jadvalda full scan va kam natija.",
    "- `Using filesort` yoki `Sort` katta hajmda, ayniqsa `external merge Disk`.",
    "- `Using temporary` (MySQL): `GROUP BY` yoki `DISTINCT` uchun vaqtinchalik jadval.",
    "- Ko'p `loops` li Nested Loop: N+1 ning DB ichidagi shakli.",
    "- Taxmin va haqiqat farqi 10x dan ortiq.",
    "- `Rows Removed by Filter` qaytgan qatorlardan ancha ko'p.",
    "",
    "### Strategiya",
    "Butun rejani bir vaqtda tushunishga urinmang. **Eng ko'p vaqt olgan tugun**ni toping (PostgreSQL'da `actual time` ning yuqori chegarasi × loops, MySQL TREE'da ham shunday). Odatda muammo bitta-ikkita joyda. Uzun PostgreSQL rejalari uchun explain.dalibo.com yoki explain.depesz.com vizualizatsiyasi tor joyni rang bilan ko'rsatadi.",
    "",
    "### Laravel bilan bog'lash",
    "Rejadagi har bir jadval va shart Eloquent kodidagi biror qismga mos keladi: `whereHas` → `EXISTS` subquery, `with()` → alohida `WHERE IN` so'rov, `orderBy` → Sort yoki indeks tartibi. Rejani o'qib, kodning qaysi qismini o'zgartirish kerakligini aniqlang."
  ],
  "examples": [
    {
      "title": "Rejani o'qish (PostgreSQL)",
      "lang": "text",
      "code": [
        "Limit (actual time=152.3..152.4 rows=20 loops=1)",
        "  -> Sort (actual time=152.3..152.3 rows=20 loops=1)",
        "       Sort Key: o.created_at DESC",
        "       Sort Method: top-N heapsort",
        "       -> Hash Join (actual time=12.1..140.8 rows=48211 loops=1)",
        "            Hash Cond: (o.customer_id = c.id)",
        "            -> Seq Scan on orders o (actual time=0.01..95.2 rows=1000000 loops=1)",
        "                 Filter: (status = 'paid')",
        "                 Rows Removed by Filter: 951789",
        "            -> Hash (rows=2000)",
        "                 -> Seq Scan on customers c (Filter: city = 'Toshkent')"
      ],
      "note": "Tor joy: `orders` da Seq Scan va 951 789 qator tashlangan. `(status, created_at)` indeksi va qayta yozish kerak."
    },
    {
      "title": "Tuzatishdan keyin",
      "lang": "sql",
      "code": [
        "CREATE INDEX orders_status_created ON orders (status, created_at DESC);",
        "",
        "-- Limit (actual time=0.08..0.9 rows=20 loops=1)",
        "--   -> Nested Loop (rows=20)",
        "--        -> Index Scan using orders_status_created on orders o (rows=31 loops=1)",
        "--        -> Index Scan using customers_pkey on customers c (rows=1 loops=31)",
        "--             Filter: city = 'Toshkent'"
      ]
    }
  ],
  "pitfalls": [
    "Har qanday full scan'ni xato deb hisoblash: kichik jadval yoki ko'p qator kerak bo'lsa, u to'g'ri tanlov.",
    "Rejani yuqoridan pastga o'qish: ijro ichki tugunlardan boshlanadi.",
    "Faqat umumiy vaqtga qarab, qaysi tugun tor joy ekanini aniqlamaslik.",
    "Hash Join diskka tushganini (`Batches > 1`) e'tiborsiz qoldirish: `work_mem` yoki so'rov hajmini ko'rib chiqing."
  ]
});
