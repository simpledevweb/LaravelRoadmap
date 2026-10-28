/* Chuqur dars: 11.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.5", {
  "lesson": [
    "### Nega bir nechta indeks turi bor",
    "Indeks — ma'lumotni ma'lum turdagi so'rov uchun qulay tuzilmada qayta saqlash. Har xil ma'lumot (skalyar qiymat, hujjat, geometriya, vaqt seriyasi) har xil tuzilma talab qiladi. PostgreSQL'da indeks turi `USING` bilan tanlanadi, operator class (`gin_trgm_ops`, `jsonb_path_ops`) esa qaysi operatorlar qo'llanishini belgilaydi.",
    "",
    "### B-tree (default)",
    "Muvozanatlangan daraxt, qiymatlar tartiblangan. Qo'llaydi: `=`, `<`, `>`, `BETWEEN`, `IN`, `IS NULL`, `ORDER BY` (sort'siz), prefiks `LIKE 'abc%'`. Oxirgisi faqat `C` collation'da yoki `text_pattern_ops` bilan ishlaydi. 90% holatda kerakli indeks shu.",
    "",
    "### GIN (Generalized Inverted Index)",
    "Teskari indeks: har bir element (leksema, massiv elementi, jsonb kaliti, trigram) qaysi qatorlarda borligini saqlaydi. Mos keladi: `jsonb @>`, massiv `@>`/`&&`, full-text `@@`, `pg_trgm` bilan `LIKE '%x%'`/`ILIKE`/o'xshashlik.",
    "",
    "GIN o'qishda juda tez, lekin yozish qimmat. Bitta qator ko'p indeks yozuvi hosil qiladi. `fastupdate` (default yoqilgan) yangi yozuvlarni pending list'da yig'ib, keyin birlashtiradi. Ko'p yoziladigan jadvalda shuni hisobga oling.",
    "",
    "### GiST (Generalized Search Tree)",
    "\"Ustma-ust tushadimi, yaqinmi\" turidagi savollar uchun. Mos keladi: geometriya va PostGIS, range tiplari (`&&`), `EXCLUDE` constraint, KNN qidiruv (`ORDER BY location <-> point`). Lossy bo'lishi mumkin, ya'ni topilgan qatorlar qayta tekshiriladi.",
    "",
    "### BRIN (Block Range Index)",
    "Har bir blok diapazoni (default 128 sahifa) uchun faqat min/max saqlaydi. Juda kichik: millionlab qatorli jadvalga bir necha KB. Faqat ustun qiymati fizik joylashuv bilan korrelyatsiyada bo'lsa samarali. Masalan, faqat qo'shiladigan log yoki event jadvalidagi `created_at`. Tasodifiy taqsimlangan ustunda foydasiz.",
    "",
    "### Hash",
    "Faqat `=`. PostgreSQL 10+ da WAL'ga yoziladi va xavfsiz. B-tree'dan ustunligi kam: juda uzun qiymatlarda indeks kichikroq bo'ladi.",
    "",
    "### Tanlash qoidasi",
    "1. So'rov qaysi operatorni ishlatadi? (`=`, diapazon, `@>`, `&&`, `@@`, `%x%`)",
    "2. Ma'lumot skalyarmi yoki ko'p qiymatlimi?",
    "3. Jadval ko'proq o'qiladimi yoki yoziladimi?",
    "4. `EXPLAIN ANALYZE` bilan indeks haqiqatan ishlatilganini tasdiqlang (11.8).",
    "",
    "Laravel migratsiyasida: `$table->index('col')` B-tree yaratadi. Boshqa turlar uchun Laravel 9+ da `->algorithm('gin')` yoki raw `DB::statement`. `CONCURRENTLY` uchun raw SQL kerak."
  ],
  "examples": [
    {
      "title": "Har xil turdagi indekslar",
      "lang": "sql",
      "code": [
        "-- B-tree: diapazon va sort",
        "CREATE INDEX orders_created ON orders (created_at);",
        "",
        "-- GIN + trigram: ILIKE '%ali%'",
        "CREATE EXTENSION IF NOT EXISTS pg_trgm;",
        "CREATE INDEX users_name_trgm ON users USING gin (name gin_trgm_ops);",
        "",
        "-- GIN: massiv teglari",
        "CREATE INDEX posts_tags ON posts USING gin (tags);",
        "SELECT id FROM posts WHERE tags @> ARRAY['laravel'];",
        "",
        "-- BRIN: faqat qo'shiladigan katta log",
        "CREATE INDEX events_created_brin ON events USING brin (created_at);"
      ]
    },
    {
      "title": "Laravel migratsiyada GIN",
      "lang": "php",
      "code": [
        "Schema::table('products', function (Blueprint $table) {",
        "    $table->index('attrs', 'products_attrs_gin')->algorithm('gin');",
        "});",
        "",
        "// Katta jadvalda lock'siz yaratish uchun raw SQL",
        "public $withinTransaction = false;",
        "",
        "public function up(): void",
        "{",
        "    DB::statement('CREATE INDEX CONCURRENTLY IF NOT EXISTS users_name_trgm ON users USING gin (name gin_trgm_ops)');",
        "}"
      ],
      "note": "`CONCURRENTLY` tranzaksiya ichida ishlamaydi, shuning uchun `$withinTransaction = false`."
    }
  ],
  "pitfalls": [
    "`LIKE '%x%'` uchun oddiy B-tree yaratib, ishlaydi deb kutish: faqat `pg_trgm` bilan GIN yoki GiST yordam beradi.",
    "BRIN'ni tasodifiy taqsimlangan ustunga qo'yish: har blok diapazoni butun qiymatlar oralig'ini qamraydi va indeks hech narsani filtrlamaydi.",
    "Ko'p yoziladigan jadvalga keraksiz GIN indekslar qo'shish: INSERT/UPDATE sezilarli sekinlashadi.",
    "Indeks yaratib, `EXPLAIN` bilan tekshirmaslik: operator yoki collation mos kelmasa, planner indeksni umuman ishlatmaydi."
  ]
});
