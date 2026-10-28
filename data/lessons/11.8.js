/* Chuqur dars: 11.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.8", {
  "lesson": [
    "### EXPLAIN va EXPLAIN ANALYZE",
    "`EXPLAIN` planner tanlagan rejani va **taxminiy** xarajatlarni ko'rsatadi, so'rovni bajarmaydi. `EXPLAIN ANALYZE` so'rovni **haqiqatan bajaradi** va har bir tugun uchun real vaqt va qatorlar sonini qo'shadi. `BUFFERS` opsiyasi qancha sahifa keshdan (`shared hit`) va qanchasi diskdan (`read`) o'qilganini ko'rsatadi. Bu vaqtdan ham ishonchliroq ko'rsatkich.",
    "",
    "`EXPLAIN ANALYZE` `UPDATE`/`DELETE` ni ham bajaradi. Ularni `BEGIN; EXPLAIN ANALYZE ...; ROLLBACK;` ichida tekshiring.",
    "",
    "### Qanday o'qiladi",
    "Reja daraxt ko'rinishida. Eng ichki (o'ngga surilgan) tugunlar birinchi ishlaydi, natija yuqoriga uzatiladi. Har bir tugunda:",
    "- `cost=0.43..8.45`: boshlang'ich va umumiy xarajat (shartli birlik).",
    "- `rows=1`: planner taxmini. `actual rows=1`: haqiqiy.",
    "- `loops=N`: tugun necha marta bajarilgan. Real vaqt va qatorlar **bir loop uchun**, jami = qiymat × loops.",
    "",
    "### Asosiy tugunlar",
    "- **Seq Scan:** butun jadval. Kichik jadvalda yoki ko'p qator kerak bo'lganda normal.",
    "- **Index Scan:** indeks + heap. **Index Only Scan:** faqat indeks (`Heap Fetches` past bo'lishi kerak).",
    "- **Bitmap Index/Heap Scan:** o'rtacha selektivlik, bir nechta indeksni birlashtirish.",
    "- **Nested Loop:** tashqi har qator uchun ichki qidiruv. Kichik tashqi to'plamda zo'r.",
    "- **Hash Join:** bir tomondan hash jadval quriladi. Katta to'plamlar uchun.",
    "- **Merge Join:** ikkala tomon tartiblangan bo'lsa.",
    "- **Sort, HashAggregate, Limit, Gather** (parallel).",
    "",
    "### Nimaga qarash kerak",
    "1. **Taxmin va haqiqat farqi.** `rows=10`, `actual rows=50000` bo'lsa, planner noto'g'ri join turini tanlagan bo'lishi mumkin. Sabab: eskirgan statistika (`ANALYZE`) yoki korrelyatsiyali ustunlar (11.9).",
    "2. **Rows Removed by Filter** katta bo'lsa, indeks yo'q yoki noto'g'ri.",
    "3. **Sort Method: external merge Disk.** `work_mem` yetmagan.",
    "4. **Nested Loop** ichida katta `loops`. N+1 ning DB darajasidagi ko'rinishi.",
    "5. **Buffers read** katta bo'lsa, ma'lumot keshda emas, disk og'ir ishlayapti.",
    "",
    "Uzun rejalarni explain.depesz.com yoki explain.dalibo.com ga qo'yib vizual ko'ring.",
    "",
    "### Laravel'dan",
    "`$query->explain()` (Laravel 8.12+) oddiy `EXPLAIN` qaytaradi. `ANALYZE` uchun SQL va bindinglarni olib (`toRawSql()`, Laravel 10.15+) psql'da ishga tushiring. Production'da sekin so'rovlarni avtomatik yozib olish uchun `auto_explain` kengaytmasi bor."
  ],
  "examples": [
    {
      "title": "Indeks yo'q va bor holat",
      "lang": "sql",
      "code": [
        "EXPLAIN (ANALYZE, BUFFERS)",
        "SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "",
        "-- Limit (actual time=85.2..85.3 rows=20 loops=1)",
        "--   -> Sort (Sort Method: top-N heapsort)",
        "--      -> Seq Scan on orders (rows=1840) Rows Removed by Filter: 998160",
        "--         Buffers: shared hit=2100 read=10400",
        "",
        "CREATE INDEX orders_customer_recent ON orders (customer_id, created_at DESC);",
        "",
        "-- Limit (actual time=0.04..0.09 rows=20 loops=1)",
        "--   -> Index Scan using orders_customer_recent on orders",
        "--      Buffers: shared hit=24"
      ],
      "note": "Sort yo'qoldi, o'qilgan sahifalar 12500 dan 24 ga tushdi."
    },
    {
      "title": "Laravel'da explain",
      "lang": "php",
      "code": [
        "$q = Order::where('customer_id', 42)->latest()->limit(20);",
        "",
        "dump($q->explain()->pluck('QUERY PLAN'));",
        "",
        "// psql uchun to'liq SQL (Laravel 10.15+)",
        "dump($q->toRawSql());"
      ]
    }
  ],
  "pitfalls": [
    "`EXPLAIN ANALYZE DELETE ...` ni tranzaksiyasiz ishga tushirish: ma'lumot haqiqatan o'chadi.",
    "`actual time` ni `loops` ga ko'paytirmaslik: Nested Loop ichidagi 0.05 ms × 100000 loop = 5 sekund.",
    "Faqat `cost` ga qarash: bu shartli birlik, haqiqiy vaqt emas. Taxmin va haqiqatni solishtiring.",
    "Kichik dev bazasida reja olib, production'da ham shunday deb o'ylash: planner ma'lumot hajmi va statistikaga qarab boshqa reja tanlaydi."
  ]
});
