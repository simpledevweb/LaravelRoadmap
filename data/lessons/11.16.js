/* Chuqur dars: 11.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.16", {
  "lesson": [
    "### Partitioning nima",
    "Bitta mantiqiy jadval bir nechta jismoniy jadvalga (partition) bo'linadi. Ilova ota jadval bilan ishlaydi. PostgreSQL qatorni kalit bo'yicha kerakli bo'lakka yo'naltiradi va so'rovda keraksiz bo'laklarni o'tkazib yuboradi. PG 10+ da **declarative partitioning** mavjud, 11–14 versiyalarda ancha yaxshilangan.",
    "",
    "### Turlari",
    "- **RANGE:** qiymat oralig'i. Eng keng tarqalgani — vaqt bo'yicha (oylik `events`, `logs`, `orders`).",
    "- **LIST:** aniq qiymatlar (`region IN ('tashkent', 'samarkand')`, tenant guruhlari).",
    "- **HASH:** `MODULUS 8, REMAINDER n`. Yukni teng taqsimlash uchun, tabiiy kalit bo'lmaganda.",
    "",
    "Sub-partitioning ham mumkin (oy, keyin hash). `DEFAULT` partition hech qaysi bo'lakka tushmagan qatorlarni oladi.",
    "",
    "### Foydalari",
    "1. **Partition pruning:** `WHERE created_at >= '2025-06-01'` faqat kerakli bo'laklarni o'qiydi. Rejalashtirishda ham, bajarishda ham ishlaydi.",
    "2. **Ma'lumotni arzon o'chirish:** 100 mln qatorli `DELETE` soatlab ishlaydi, WAL va bloat hosil qiladi. `DROP TABLE events_2023_01` yoki `DETACH PARTITION ... CONCURRENTLY` (PG 14+) bir zumda.",
    "3. **Kichik indekslar** va har bo'lakda alohida VACUUM.",
    "4. Eski bo'laklarni arzon tablespace'ga ko'chirish yoki arxivlash.",
    "",
    "### Cheklovlar",
    "- PK va unique indekslar **partition kalitini o'z ichiga olishi shart**: `PRIMARY KEY (id, created_at)`. Faqat `id` bo'yicha global unique'lik kafolatlanmaydi.",
    "- Partition kalitisiz so'rov **barcha** bo'laklarni ko'radi. Bitta kichik jadvaldan sekinroq bo'lishi mumkin.",
    "- Juda ko'p partition (minglab) planner va xotirani og'irlashtiradi. Oylik yoki haftalik bo'laklar odatda yetarli.",
    "- Kalitni o'zgartiruvchi `UPDATE` qatorni boshqa bo'lakka ko'chiradi (PG 11+). Bu `DELETE + INSERT` ga teng.",
    "- Boshqa jadvallardan partitioned jadvalga FK PG 12+ da qo'llanadi.",
    "",
    "### Qachon kerak",
    "Jadval yuzlab GB va o'n millionlab qatorga yetganda, ma'lumot vaqt bo'yicha \"sovib\" borsa va eski qismni muntazam o'chirish kerak bo'lsa. Kichik jadvalda partitioning faqat murakkablik qo'shadi. Avval indekslarni to'g'rilang.",
    "",
    "### Avtomatlashtirish va Laravel",
    "Yangi bo'laklarni oldindan yaratish shart, aks holda `INSERT` xato beradi (yoki `DEFAULT` ga tushadi). `pg_partman` kengaytmasi yoki Laravel scheduler'dagi artisan buyrug'i yordam beradi. Eloquent model ota jadvalga ishora qiladi, Laravel uchun hammasi shaffof. Migratsiyalar raw SQL bilan yoziladi."
  ],
  "examples": [
    {
      "title": "Oylik RANGE partitioning",
      "lang": "sql",
      "code": [
        "CREATE TABLE events (",
        "  id bigint GENERATED ALWAYS AS IDENTITY,",
        "  created_at timestamptz NOT NULL,",
        "  user_id bigint,",
        "  payload jsonb,",
        "  PRIMARY KEY (id, created_at)",
        ") PARTITION BY RANGE (created_at);",
        "",
        "CREATE TABLE events_2025_06 PARTITION OF events",
        "  FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');",
        "CREATE TABLE events_default PARTITION OF events DEFAULT;",
        "CREATE INDEX ON events (user_id, created_at);",
        "",
        "-- Faqat bitta bo'lak o'qiladi",
        "EXPLAIN SELECT count(*) FROM events WHERE created_at >= '2025-06-10' AND created_at < '2025-06-11';",
        "",
        "-- Eski ma'lumotni bir zumda olib tashlash",
        "ALTER TABLE events DETACH PARTITION events_2024_01 CONCURRENTLY;",
        "DROP TABLE events_2024_01;"
      ],
      "note": "Ota jadvaldagi indeks barcha bo'laklarda avtomatik yaratiladi."
    },
    {
      "title": "Kelasi oy bo'lagini yaratuvchi buyruq",
      "lang": "php",
      "code": [
        "// app/Console/Commands/CreateEventPartitions.php",
        "public function handle(): void",
        "{",
        "    foreach ([0, 1, 2] as $offset) {",
        "        $from = now()->startOfMonth()->addMonths($offset);",
        "        $to = $from->copy()->addMonth();",
        "        $name = 'events_' . $from->format('Y_m');",
        "",
        "        DB::statement(sprintf(",
        "            \"CREATE TABLE IF NOT EXISTS %s PARTITION OF events FOR VALUES FROM ('%s') TO ('%s')\",",
        "            $name, $from->toDateString(), $to->toDateString()",
        "        ));",
        "    }",
        "}",
        "",
        "// routes/console.php",
        "Schedule::command('partitions:events')->monthlyOn(20, '03:00');"
      ]
    }
  ],
  "pitfalls": [
    "Kichik jadvalni \"kelajak uchun\" bo'lish: pruning foydasi yo'q, faqat murakkablik.",
    "Bo'laklarni oldindan yaratmaslik: oy boshida `no partition of relation found for row` xatosi va yo'qolgan yozuvlar.",
    "So'rovlarda partition kalitini filtrlamaslik: har so'rov barcha bo'laklarni skan qiladi.",
    "`id` global unique deb hisoblash: PK `(id, created_at)` bo'lgani uchun faqat juftlik unique."
  ]
});
