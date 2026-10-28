/* Chuqur dars: 16.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.8", {
  "lesson": [
    "### Afsona: \"JOIN doim tezroq\"",
    "Eski MySQL versiyalarida (5.5 va undan oldin) `IN (subquery)` haqiqatan yomon bajarilardi. Shundan \"subquery'dan qoching\" qoidasi qolgan. Zamonaviy optimizatorlar (MySQL 8, PostgreSQL) ko'p subquery'larni ichki JOIN yoki **semi-join**ga aylantiradi va natija bir xil rejaga tushadi. Shuning uchun asosiy mezon — **semantika**, keyin `EXPLAIN`.",
    "",
    "### Subquery turlari",
    "- **EXISTS / IN (semi-join):** \"mos yozuv bormi?\". Har tashqi qator uchun birinchi moslik topilganda to'xtaydi va dublikat yaratmaydi.",
    "- **NOT EXISTS (anti-join):** \"mos yozuv yo'qmi?\". Masalan, buyurtmasi yo'q mijozlar.",
    "- **Skalyar subquery `SELECT` ichida:** har qator uchun bitta qiymat (`(SELECT COUNT(*) FROM orders WHERE customer_id = c.id)`). Korrelyatsiyali, har qator uchun bajarilishi mumkin. Indeks bilan tez, indekssiz halokatli.",
    "- **Derived table (FROM ichida):** oldindan agregatsiya (16.7) yoki murakkab filtr.",
    "",
    "### JOIN bilan solishtirish",
    "| Vazifa | Yaxshi tanlov |",
    "|---|---|",
    "| Mavjudlikni tekshirish | `EXISTS` |",
    "| Yo'qlikni tekshirish | `NOT EXISTS` yoki `LEFT JOIN ... IS NULL` |",
    "| Bog'liq jadvaldan ustun olish | `JOIN` |",
    "| Bog'liq jadvaldan agregat | derived table + JOIN yoki skalyar subquery |",
    "",
    "Mavjudlik uchun `JOIN` ishlatilsa, 1:N bo'lganda qatorlar ko'payadi va `DISTINCT` kerak bo'ladi. Bu ortiqcha saralash yoki hash.",
    "",
    "### NOT IN tuzog'i",
    "`WHERE id NOT IN (SELECT customer_id FROM orders)` — agar subquery natijasida bitta `NULL` bo'lsa, shart hech qachon rost bo'lmaydi va **bo'sh natija** qaytadi (uch qiymatli mantiq). `NOT EXISTS` bu muammodan xoli. Doim `NOT EXISTS` ni afzal ko'ring.",
    "",
    "### Eloquent'da",
    "- `whereHas('orders', ...)` → `WHERE EXISTS (SELECT * FROM orders WHERE ...)`.",
    "- `doesntHave('orders')` → `NOT EXISTS`.",
    "- `withCount('orders')` → skalyar korrelyatsiyali subquery.",
    "- `whereIn('id', Order::select('customer_id')->where(...))` → `IN (subquery)`.",
    "",
    "MySQL'da juda katta jadvallarda `whereHas` ba'zan sekin bo'ladi, chunki korrelyatsiyali `EXISTS` har tashqi qator uchun bajariladi. Ichki shart juda selektiv bo'lsa, `whereIn` + subquery tezroq bo'lishi mumkin: avval ichki natija, keyin tashqi jadvalda PK qidiruvi. Ikkala variantni `EXPLAIN ANALYZE` bilan solishtiring (16.15)."
  ],
  "examples": [
    {
      "title": "EXISTS, NOT EXISTS va NOT IN tuzog'i",
      "lang": "sql",
      "code": [
        "-- Buyurtmasi bor mijozlar: dublikatsiz",
        "SELECT c.* FROM customers c",
        "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
        "",
        "-- Buyurtmasi yo'q mijozlar: xavfsiz",
        "SELECT c.* FROM customers c",
        "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
        "",
        "-- XAVFLI: orders.customer_id da NULL bo'lsa, natija bo'sh",
        "SELECT * FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);"
      ]
    },
    {
      "title": "Eloquent: whereHas va whereIn",
      "lang": "php",
      "code": [
        "// EXISTS",
        "$vip = Customer::whereHas('orders', fn ($q) => $q->where('total', '>', 50_000_000))->get();",
        "",
        "// IN (subquery): ichki shart juda selektiv bo'lsa tezroq bo'lishi mumkin",
        "$vip = Customer::whereIn('id',",
        "    Order::select('customer_id')->where('total', '>', 50_000_000)",
        ")->get();",
        "",
        "// NOT EXISTS",
        "$inactive = Customer::doesntHave('orders')->get();"
      ],
      "note": "Ikkala variantni ham real ma'lumotda `EXPLAIN ANALYZE` bilan solishtiring."
    }
  ],
  "pitfalls": [
    "`NOT IN (subquery)` ishlatish: bitta NULL butun natijani bo'shatadi.",
    "Mavjudlik uchun JOIN + `DISTINCT`: ortiqcha ish va o'qilishi qiyin.",
    "`SELECT` ichidagi korrelyatsiyali subquery'ni indekssiz ishlatish: har qator uchun full scan.",
    "\"Subquery sekin\" degan eski qoida bilan aniq va o'qiladigan `EXISTS` ni murakkab JOIN'ga almashtirish."
  ]
});
