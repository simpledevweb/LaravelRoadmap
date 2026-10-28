/* Chuqur dars: 11.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.18", {
  "lesson": [
    "### Kengaytma nima",
    "Extension — PostgreSQL'ga yangi tiplar, funksiyalar, operatorlar, indeks turlari yoki fon jarayonlarini qo'shadigan paket. `CREATE EXTENSION name` bilan yoqiladi va **database darajasida** ishlaydi. Har bir DB'da alohida yoqiladi. Mavjudlari: `SELECT * FROM pg_available_extensions`.",
    "",
    "Ba'zi kengaytmalar server sozlamasini ham talab qiladi: `shared_preload_libraries = 'pg_stat_statements'` va serverni qayta ishga tushirish.",
    "",
    "### Eng foydali kengaytmalar",
    "**Monitoring va diagnostika**",
    "- `pg_stat_statements`: har bir so'rov shabloni bo'yicha chaqiruvlar soni, umumiy va o'rtacha vaqt, o'qilgan bloklar. Production'da **majburiy**. Optimizatsiya shundan boshlanadi.",
    "- `auto_explain`: sekin so'rovlar rejasini logga yozadi.",
    "- `pgstattuple`: bloat'ni aniq o'lchash.",
    "",
    "**Qidiruv va matn**",
    "- `pg_trgm`: trigram o'xshashligi, `LIKE '%x%'` va `ILIKE` uchun GIN/GiST indeks, imlo xatosiga chidamli qidiruv.",
    "- `unaccent`: diakritik belgilarni olib tashlash.",
    "- `citext`: case-insensitive matn tipi.",
    "- `fuzzystrmatch`: `levenshtein()`, `soundex()`.",
    "",
    "**Tiplar**",
    "- `pgcrypto`: `crypt()`, `digest()`. PG 13+ da `gen_random_uuid()` ichki, unga kengaytma kerak emas.",
    "- `uuid-ossp`: eski UUID funksiyalari.",
    "- `hstore`: kalit-qiymat. Ko'pincha `jsonb` bilan almashtiriladi.",
    "- `btree_gist`/`btree_gin`: oddiy tiplarni GiST/GIN indeksda ishlatish (`EXCLUDE` uchun).",
    "",
    "**Maxsus imkoniyatlar**",
    "- `PostGIS`: geografik ma'lumotlar, masofa, poligonlar. Yetkazib berish va xarita servislari uchun standart.",
    "- `pgvector`: embedding vektorlari va o'xshashlik qidiruvi (`<->`, `<=>`), HNSW/IVFFlat indekslari. RAG va semantik qidiruv uchun.",
    "- `pg_partman`: partition'larni avtomatik boshqarish.",
    "- `timescaledb`: vaqt seriyalari uchun hypertable'lar va siqish.",
    "- `postgres_fdw`: boshqa PostgreSQL serverdagi jadvallarni lokal jadval kabi so'rash.",
    "- `pg_cron`: DB ichida cron vazifalar.",
    "",
    "### Boshqariladigan bulutlarda",
    "AWS RDS, Cloud SQL va Azure faqat ruxsat etilgan ro'yxatni qo'llaydi. Arxitektura tanlashdan oldin kerakli kengaytma va uning versiyasi mavjudligini tekshiring.",
    "",
    "### Laravel bilan",
    "Kengaytmani migratsiyada yoqing: `DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm')`. Shunda lokal, CI va production bir xil bo'ladi. Ruxsat yetmasa (`permission denied to create extension`), kengaytmani DBA yoki superuser yoqishi kerak. Migratsiya esa `IF NOT EXISTS` bilan zararsiz qoladi. Docker test muhitida kerakli kengaytmali image ishlating (`postgis/postgis`, `pgvector/pgvector`)."
  ],
  "examples": [
    {
      "title": "pg_stat_statements bilan og'ir so'rovlar",
      "lang": "sql",
      "code": [
        "-- postgresql.conf: shared_preload_libraries = 'pg_stat_statements'",
        "CREATE EXTENSION IF NOT EXISTS pg_stat_statements;",
        "",
        "SELECT calls,",
        "       round(total_exec_time::numeric / 1000, 1) AS total_s,",
        "       round(mean_exec_time::numeric, 2) AS mean_ms,",
        "       left(query, 80) AS query",
        "FROM pg_stat_statements",
        "ORDER BY total_exec_time DESC",
        "LIMIT 10;",
        "",
        "SELECT pg_stat_statements_reset();"
      ],
      "note": "PG 13 dan oldin ustunlar `total_time` va `mean_time` deb nomlangan."
    },
    {
      "title": "Migratsiyada kengaytmalar",
      "lang": "php",
      "code": [
        "public function up(): void",
        "{",
        "    DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm');",
        "    DB::statement('CREATE EXTENSION IF NOT EXISTS citext');",
        "",
        "    Schema::table('users', function (Blueprint $table) {",
        "        $table->rawIndex('name gin_trgm_ops', 'users_name_trgm')->algorithm('gin');",
        "    });",
        "}",
        "",
        "// Qidiruv",
        "User::where('name', 'ilike', \"%{$q}%\")->limit(20)->get();"
      ],
      "note": "`rawIndex()` Laravel 9+ da mavjud."
    }
  ],
  "pitfalls": [
    "Kengaytmani faqat lokal bazada qo'lda yoqish: CI yoki production'da `function similarity does not exist` xatosi.",
    "`pg_stat_statements` ni `shared_preload_libraries` siz yoqish: `must be loaded via shared_preload_libraries` xatosi.",
    "Bulut provayderida kerakli kengaytma (masalan, `timescaledb`) yo'qligini arxitektura tanlangandan keyin bilish.",
    "Major upgrade'dan oldin kengaytma versiyalari mosligini tekshirmaslik: `pg_upgrade` yoki restore yiqilishi mumkin."
  ]
});
