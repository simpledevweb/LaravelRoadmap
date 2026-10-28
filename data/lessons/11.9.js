/* Chuqur dars: 11.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.9", {
  "lesson": [
    "### Planner nima qiladi",
    "SQL deklarativ: siz *nima* kerakligini yozasiz, *qanday* olishni planner hal qiladi. U mumkin bo'lgan rejalarni ko'rib chiqadi: qaysi indeks, qaysi join tartibi, Nested Loop/Hash/Merge, parallel ishlash. Har biriga **xarajat** hisoblab, eng arzonini tanlaydi.",
    "",
    "### Xarajat modeli",
    "Xarajat ikki narsadan iborat: qancha sahifa o'qiladi va qancha qator qayta ishlanadi. Parametrlar:",
    "- `seq_page_cost` (1.0) va `random_page_cost` (default 4.0). SSD'da tasodifiy o'qish arzon, ~1.1 qo'yish indeks rejalarini to'g'ri baholashga yordam beradi.",
    "- `cpu_tuple_cost`, `cpu_index_tuple_cost`, `cpu_operator_cost`.",
    "- `effective_cache_size`: OS va `shared_buffers` keshi qancha ekanini bildiradi. Xotira ajratmaydi, faqat planner'ga ishora.",
    "- `work_mem`: Hash Join yoki sort xotiraga sig'adimi.",
    "",
    "### Statistika — asosiy kirish ma'lumoti",
    "Xarajat taxmini **qatorlar soni taxminiga** bog'liq. Uni `ANALYZE` yig'gan statistika beradi (`pg_stats` view): `null_frac`, `n_distinct`, `most_common_vals` va ularning chastotasi, histogramma, `correlation` (fizik tartib bilan bog'liqlik).",
    "",
    "Planner default holatda ustunlarni **mustaqil** deb hisoblaydi. `city = 'Toshkent' AND region = 'Toshkent'` uchun ikki ehtimollikni ko'paytiradi va qatorlar sonini juda kam baholaydi. Natijada Nested Loop tanlanadi va so'rov sekinlashadi. Yechim — **extended statistics**: `CREATE STATISTICS ... (dependencies, ndistinct, mcv) ON city, region FROM ...`.",
    "",
    "### Noto'g'ri reja sabablari",
    "1. Eskirgan statistika: katta importdan keyin `ANALYZE` qilinmagan.",
    "2. Korrelyatsiyali ustunlar (yuqorida).",
    "3. Funksiya ichidagi ustun, tip mos kelmasligi (`varchar` ustunni `int` bilan taqqoslash), implicit cast.",
    "4. **Generic plan:** prepared statement 5 marta bajarilgandan keyin PostgreSQL parametrdan mustaqil umumiy reja tanlashi mumkin. Notekis taqsimlangan qiymatlarda bu yomon. `plan_cache_mode = force_custom_plan` yordam beradi.",
    "5. Juda ko'p jadvalli JOIN: `join_collapse_limit` (8) dan oshsa, tartib to'liq ko'rib chiqilmaydi. `geqo_threshold` (12) dan oshsa, genetik algoritm ishlaydi.",
    "",
    "### Hint yo'q",
    "PostgreSQL'da Oracle yoki MySQL kabi `USE INDEX` hint'lari yo'q (`pg_hint_plan` tashqi kengaytma). Falsafa: planner'ga to'g'ri ma'lumot bering (statistika, indeks, to'g'ri cost parametrlari). Debug uchun sessiyada `SET enable_seqscan = off` qilib, planner nima uchun indeksni rad etganini ko'rish mumkin. Lekin bu production yechimi emas."
  ],
  "examples": [
    {
      "title": "Korrelyatsiyali ustunlar uchun extended statistics",
      "lang": "sql",
      "code": [
        "EXPLAIN ANALYZE SELECT * FROM addresses WHERE city = 'Samarqand' AND region = 'Samarqand';",
        "-- rows=120 (taxmin)  actual rows=48000",
        "",
        "CREATE STATISTICS addresses_city_region (dependencies, mcv) ON city, region FROM addresses;",
        "ANALYZE addresses;",
        "",
        "EXPLAIN ANALYZE SELECT * FROM addresses WHERE city = 'Samarqand' AND region = 'Samarqand';",
        "-- rows=47500  actual rows=48000"
      ]
    },
    {
      "title": "Planner'ni diagnostika qilish",
      "lang": "sql",
      "code": [
        "SELECT attname, n_distinct, most_common_vals, correlation",
        "FROM pg_stats WHERE tablename = 'orders' AND attname IN ('status', 'customer_id');",
        "",
        "BEGIN;",
        "SET LOCAL enable_seqscan = off;",
        "EXPLAIN SELECT * FROM orders WHERE status = 'paid';",
        "ROLLBACK;",
        "",
        "ALTER DATABASE app SET random_page_cost = 1.1;"
      ],
      "note": "Indeksli reja `cost` i Seq Scan'dan katta bo'lsa, planner haq bo'lishi mumkin: shartga juda ko'p qator mos keladi."
    }
  ],
  "pitfalls": [
    "Indeks ishlatilmasa darhol \"planner xato\" deb o'ylash: ko'p qator qaytsa, Seq Scan haqiqatan arzonroq.",
    "SSD serverda `random_page_cost = 4` ni qoldirish: planner indeks rejalaridan keraksiz qochadi.",
    "Production'da global `enable_seqscan = off` qilish: boshqa so'rovlar halokatli sekinlashadi.",
    "Massiv import yoki katta `DELETE` dan keyin `ANALYZE` qilmaslik: autovacuum yetib kelguncha rejalar noto'g'ri bo'ladi."
  ]
});
