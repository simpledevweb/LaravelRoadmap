/* 11 · PostgreSQL
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 11,
  slug: "postgresql",
  title: "PostgreSQL",
  group: "database",
  description: "PostgreSQL — imkoniyatlarga boy, standartlarga qat'iy amal qiluvchi ochiq relyatsion DB. JSONB, kuchli indeks turlari (GIN, GiST, BRIN), partial va expression indekslar, CTE, window funksiyalar, full-text search va kengaytmalar uni murakkab tizimlar uchun mashhur tanlovga aylantiradi. Senior uchun MVCC, VACUUM va query planner'ni tushunish ayniqsa muhim.",
  subskills: [
    {
      id: "11.1",
      title: "PostgreSQL Architecture asoslari",
      description: [
        "PostgreSQL **jarayonga asoslangan**: har bir ulanish uchun alohida backend process (shuning uchun ulanish qimmat va pooling muhim). Umumiy xotira: `shared_buffers` (sahifa keshi), WAL buffers. Fon jarayonlari: checkpointer, background writer, WAL writer, autovacuum launcher/worker'lar, stats collector.",
        "",
        "WAL (Write-Ahead Log) — barcha o'zgarishlar avval WAL'ga yoziladi: crash recovery, replikatsiya va PITR asosi. Ma'lumot jadval fayllarida \"heap\" sifatida (clustered emas) saqlanadi; indekslar heap'dagi qator manziliga (TID) ishora qiladi.",
        "",
        "```sql",
        "SELECT pid, usename, state, query FROM pg_stat_activity;",
        "SHOW shared_buffers;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "PostgreSQL jarayon modelini MySQL thread modeli bilan solishtirib, connection pooling zaruratini asoslang.",
      acceptanceCriteria: [
        "Process-per-connection modelining oqibatini biladi",
        "WAL rolini tushuntira oladi"
      ],
      prerequisites: [
        "9.1"
      ]
    },
    {
      id: "11.2",
      title: "Schemas",
      description: [
        "Schema — DB ichidagi namespace: jadvallar, view'lar, funksiyalar guruhlanadi (`public` — default). `search_path` qaysi schema'lar qidirilishini belgilaydi. Huquqlarni schema darajasida boshqarish mumkin.",
        "",
        "Qo'llanishi: modullarni ajratish (`billing.invoices`, `auth.users`), multi-tenancy (har tenant uchun schema — izolyatsiya yaxshi, lekin minglab schema'da migratsiya va katalog og'irlashadi), kengaytmalarni alohida schema'ga qo'yish. Laravel'da `search_path` config'da yoki jadval nomida `schema.table`.",
        "",
        "```sql",
        "CREATE SCHEMA billing;",
        "CREATE TABLE billing.invoices (id bigserial PRIMARY KEY, total numeric(15,2));",
        "SET search_path TO billing, public;",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Schema-per-tenant va umumiy jadval (tenant_id) yondashuvlarini 1000 tenant uchun solishtirib, tanlovni asoslang.",
      acceptanceCriteria: [
        "`search_path` xatti-harakatini biladi",
        "Schema-per-tenant'ning narx va foydasini ayta oladi"
      ],
      prerequisites: [
        "14.15"
      ]
    },
    {
      id: "11.3",
      title: "Data Types",
      description: [
        "PostgreSQL boy tiplarga ega: `integer`/`bigint`, `numeric(p,s)` (aniq pul), `text` (uzunlik cheklovsiz, `varchar` bilan bir xil tezlik), `boolean`, `timestamptz` (doim shuni ishlating — UTC'da saqlaydi), `date`, `interval`, `uuid` (native), `jsonb`, massivlar (`int[]`), `inet`/`cidr`, range tiplari (`tstzrange`), enum, `bytea`.",
        "",
        "`timestamp` (zonasiz) ko'p xatolar manbai. `serial` o'rniga zamonaviy `GENERATED ALWAYS AS IDENTITY`. Domain tiplar qayta ishlatiladigan constraint beradi.",
        "",
        "```sql",
        "CREATE TABLE bookings (",
        "  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,",
        "  room_id bigint NOT NULL,",
        "  period tstzrange NOT NULL,",
        "  EXCLUDE USING gist (room_id WITH =, period WITH &&)  -- ustma-ust bron yo'q",
        ");",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bron tizimi uchun `tstzrange` va `EXCLUDE` constraint bilan ustma-ust bronlarni DB darajasida taqiqlang.",
      acceptanceCriteria: [
        "`timestamp` va `timestamptz` farqini biladi",
        "Range tiplari va EXCLUDE constraint'ni ishlata oladi"
      ],
      prerequisites: [
        "9.11"
      ]
    },
    {
      id: "11.4",
      title: "JSON va JSONB",
      description: [
        "`json` — matn sifatida saqlanadi (format va kalit tartibi saqlanadi); `jsonb` — binar, dublikat kalitlarsiz, indekslanadi va tezroq so'raladi. Deyarli doim `jsonb`.",
        "",
        "Operatorlar: `->`, `->>`, `#>`, `@>` (o'z ichiga oladi), `?` (kalit bormi), `jsonb_path_query`. Indekslash: butun ustunga GIN (`jsonb_ops` yoki `jsonb_path_ops` — `@>` uchun ixchamroq), yoki aniq maydonga expression indeks. Laravel: `where('meta->color', 'red')`, `whereJsonContains`.",
        "",
        "```sql",
        "CREATE INDEX products_attrs_gin ON products USING gin (attributes jsonb_path_ops);",
        "SELECT * FROM products WHERE attributes @> '{\"color\": \"red\"}';",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mahsulot atributlari bo'yicha filtrni JSONB + GIN indeks bilan amalga oshiring va EXPLAIN bilan tekshiring.",
      acceptanceCriteria: [
        "`json` va `jsonb` farqini biladi",
        "JSONB uchun to'g'ri indeks turini tanlaydi"
      ],
      prerequisites: [
        "11.3"
      ]
    },
    {
      id: "11.5",
      title: "B-tree, GIN, GiST va BRIN Indexes",
      description: [
        "- **B-tree** — default: `=`, diapazon, `ORDER BY`, `LIKE 'x%'` (`text_pattern_ops` bilan).",
        "- **GIN** — \"ko'p qiymatli\" ma'lumot: JSONB, massivlar, full-text (`tsvector`), `pg_trgm` (`LIKE '%x%'`). O'qish tez, yozish sekinroq.",
        "- **GiST** — geometrik, range, yaqinlik (PostGIS, `EXCLUDE`, KNN).",
        "- **BRIN** — juda katta, tabiiy tartiblangan jadvallar (log, vaqt seriyalari): juda kichik, blok diapazonlari min/max.",
        "- **Hash** — faqat `=`.",
        "",
        "To'g'ri tanlov ma'lumot va so'rov turiga bog'liq.",
        "",
        "```sql",
        "CREATE EXTENSION IF NOT EXISTS pg_trgm;",
        "CREATE INDEX users_name_trgm ON users USING gin (name gin_trgm_ops);  -- ILIKE '%ali%'",
        "CREATE INDEX events_created_brin ON events USING brin (created_at);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "50 mln qatorli log jadvalda B-tree va BRIN indekslarining hajmi va so'rov tezligini solishtiring.",
      acceptanceCriteria: [
        "Har bir indeks turi qaysi masala uchun ekanini biladi",
        "`pg_trgm` bilan `%x%` qidiruvni tezlashtira oladi"
      ],
      prerequisites: [
        "10.5"
      ]
    },
    {
      id: "11.6",
      title: "Composite va Partial Indexes",
      description: [
        "Composite indeks — MySQL'dagidek leftmost prefix qoidasi (lekin PostgreSQL ba'zan \"skip scan\"siz ham bitmap orqali bir nechta indeksni birlashtira oladi). **Partial indeks** — faqat shartga mos qatorlarni indekslaydi: kichik, tez va maqsadli.",
        "",
        "Partial indeks klassik qo'llanishlari: faqat faol yozuvlar (`WHERE deleted_at IS NULL`), navbatdagi ishlar (`WHERE status = 'pending'`), soft delete bilan unique. So'rov sharti indeks shartiga mos kelishi kerak.",
        "",
        "```sql",
        "CREATE INDEX jobs_pending ON jobs (available_at) WHERE status = 'pending';",
        "CREATE UNIQUE INDEX users_email_alive ON users (lower(email)) WHERE deleted_at IS NULL;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Katta jadvaldagi kam uchraydigan holat (pending) uchun partial indeks yarating va to'liq indeks bilan hajmini solishtiring.",
      acceptanceCriteria: [
        "Partial indeks qachon ishlatilishini (so'rov sharti mosligi) biladi",
        "Soft delete + unique muammosini partial indeks bilan hal qiladi"
      ],
      prerequisites: [
        "11.5"
      ]
    },
    {
      id: "11.7",
      title: "Expression Indexes",
      description: [
        "Expression (funksional) indeks ustun emas, ifoda natijasini indekslaydi: `lower(email)`, `date(created_at)`, `(data->>'sku')`. So'rov aynan shu ifodani ishlatsa, indeks qo'llanadi.",
        "",
        "Case-insensitive qidiruv uchun `lower()` indeks yoki `citext` tipi. Funksiya `IMMUTABLE` bo'lishi shart (masalan, vaqt zonasiga bog'liq funksiyalar emas). Laravel'da raw migratsiya bilan yaratiladi.",
        "",
        "```sql",
        "CREATE INDEX users_lower_email ON users (lower(email));",
        "SELECT * FROM users WHERE lower(email) = lower('Ali@Example.uz');",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Case-insensitive login uchun expression indeks qo'shing va Eloquent so'rovini unga moslang.",
      acceptanceCriteria: [
        "So'rov ifodasi indeks ifodasiga aniq mos kelishi kerakligini biladi",
        "`IMMUTABLE` talabini tushuntira oladi"
      ],
      prerequisites: [
        "11.6"
      ]
    },
    {
      id: "11.8",
      title: "`EXPLAIN ANALYZE`",
      description: [
        "`EXPLAIN (ANALYZE, BUFFERS)` so'rovni bajaradi va har bir tugun uchun haqiqiy vaqt, qatorlar soni, loop'lar va sahifa o'qishlarini ko'rsatadi. Tugunlar: `Seq Scan`, `Index Scan`, `Index Only Scan`, `Bitmap Heap Scan`, `Nested Loop`, `Hash Join`, `Merge Join`, `Sort`, `HashAggregate`.",
        "",
        "O'qish: ichkaridan tashqariga; `rows` taxmini va `actual rows` orasidagi katta farq — eskirgan statistika yoki korrelyatsiya muammosi; `Sort Method: external merge Disk` — `work_mem` yetishmaydi. explain.depesz.com va explain.dalibo.com vizualizatsiya qiladi.",
        "",
        "```sql",
        "EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)",
        "SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sekin so'rov rejasini dalibo vizualizatorida tahlil qilib, eng qimmat tugunni aniqlang va tuzating.",
      acceptanceCriteria: [
        "Asosiy plan tugunlarini taniydi",
        "Taxmin va haqiqat farqidan xulosa chiqaradi"
      ],
      prerequisites: [
        "9.19"
      ]
    },
    {
      id: "11.9",
      title: "Query Planner",
      description: [
        "Planner xarajat modeli asosida reja tanlaydi: statistika (`pg_statistic` — histogramma, eng ko'p qiymatlar, `n_distinct`), `random_page_cost`, `seq_page_cost`, `effective_cache_size`, `work_mem`. SSD'da `random_page_cost` ni ~1.1 ga tushirish indeks rejalarini afzal qiladi.",
        "",
        "Noto'g'ri reja sabablari: eskirgan statistika (`ANALYZE`), korrelyatsiyali ustunlar (`CREATE STATISTICS` — extended statistics), juda ko'p jadvalli JOIN (genetic optimizer), generic vs custom plan (prepared statements). PostgreSQL'da optimizer hint'lari yo'q (`pg_hint_plan` kengaytmasi bor) — muammoni statistika va indeks bilan hal qilish afzal.",
        "",
        "```sql",
        "CREATE STATISTICS orders_city_region (dependencies) ON city, region FROM orders;",
        "ANALYZE orders;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Korrelyatsiyali ustunlar tufayli noto'g'ri taxmin qilingan so'rovni extended statistics bilan tuzating.",
      acceptanceCriteria: [
        "Planner'ning xarajat parametrlarini biladi",
        "Noto'g'ri reja sabablarini tizimli tahlil qiladi"
      ],
      prerequisites: [
        "11.8"
      ]
    },
    {
      id: "11.10",
      title: "MVCC",
      description: [
        "PostgreSQL MVCC'da `UPDATE` qatorni joyida o'zgartirmaydi: yangi versiya (tuple) yoziladi, eskisi \"o'lik\" bo'lib qoladi. Har bir tuple'da `xmin`/`xmax` tranzaksiya id'lari; snapshot qaysi versiya ko'rinishini belgilaydi.",
        "",
        "Oqibatlar: o'lik tuple'lar jadval va indekslarni shishiradi (bloat) — VACUUM tozalaydi; uzoq ochiq tranzaksiya VACUUM'ni bloklaydi; ko'p `UPDATE` li jadvallarda `fillfactor` va HOT update'lar muhim. Transaction ID wraparound — VACUUM ishlamasa DB himoya uchun yozishni to'xtatadi.",
        "",
        "```sql",
        "SELECT relname, n_live_tup, n_dead_tup, last_autovacuum",
        "FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ko'p yangilanadigan jadvalda dead tuple o'sishini kuzating va autovacuum sozlamalari bilan nazorat qiling.",
      acceptanceCriteria: [
        "PostgreSQL va InnoDB MVCC implementatsiyasi farqini biladi",
        "Bloat va wraparound xavfini tushuntira oladi"
      ],
      prerequisites: [
        "10.13"
      ]
    },
    {
      id: "11.11",
      title: "Transactions va Isolation Levels",
      description: [
        "PostgreSQL default — `READ COMMITTED`: har bir buyruq yangi snapshot oladi. `REPEATABLE READ` — tranzaksiya boshidagi snapshot (phantom'larsiz), parallel o'zgarishda `could not serialize access` xatosi. `SERIALIZABLE` — SSI (Serializable Snapshot Isolation): to'liq izolyatsiya, serializatsiya xatolarida qayta urinish shart. `READ UNCOMMITTED` amalda `READ COMMITTED` kabi ishlaydi.",
        "",
        "DDL tranzaksiyaviy — migratsiya muvaffaqiyatsiz bo'lsa to'liq rollback (MySQL'dan katta afzallik). Savepoint'lar: Laravel ichma-ich `DB::transaction` ularni avtomatik ishlatadi.",
        "",
        "```sql",
        "BEGIN ISOLATION LEVEL SERIALIZABLE;",
        "-- ...",
        "COMMIT;  -- SQLSTATE 40001 bo'lsa, butun tranzaksiyani qayta urinish",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Write skew anomaliyasini `REPEATABLE READ` da qayta yarating va `SERIALIZABLE` + retry bilan tuzating.",
      acceptanceCriteria: [
        "Uchala izolyatsiya darajasining PostgreSQL'dagi xatti-harakatini biladi",
        "Serializatsiya xatosida retry zarurligini tushunadi"
      ],
      prerequisites: [
        "9.17"
      ]
    },
    {
      id: "11.12",
      title: "Locks va Deadlocks",
      description: [
        "Qator lock'lari: `FOR UPDATE`, `FOR NO KEY UPDATE`, `FOR SHARE`, `FOR KEY SHARE`; `NOWAIT`, `SKIP LOCKED` (navbat jadvallari — Laravel database queue ham ishlatadi). Jadval lock'lari 8 rejimda; DDL ko'pincha `ACCESS EXCLUSIVE` oladi — katta jadvalda `ALTER TABLE` barcha so'rovlarni to'xtatib qo'yishi mumkin.",
        "",
        "Xavfsiz migratsiya: `lock_timeout` o'rnatish, indeksni `CREATE INDEX CONCURRENTLY`, `NOT NULL` ni `CHECK ... NOT VALID` + `VALIDATE` orqali. Deadlock'ni PostgreSQL `deadlock_timeout` dan keyin aniqlaydi va bir tranzaksiyani bekor qiladi; `pg_locks` + `pg_blocking_pids()` tahlil uchun.",
        "",
        "```sql",
        "SET lock_timeout = '3s';",
        "CREATE INDEX CONCURRENTLY orders_status ON orders (status);",
        "SELECT pid, pg_blocking_pids(pid), query FROM pg_stat_activity WHERE wait_event_type = 'Lock';",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Katta jadvalga ustun va indeks qo'shishni production'ni bloklamaydigan migratsiya sifatida yozing.",
      acceptanceCriteria: [
        "`SKIP LOCKED` bilan navbat qayta ishlashni biladi",
        "DDL lock'lari va `CONCURRENTLY` ni tushunadi"
      ],
      prerequisites: [
        "9.18"
      ]
    },
    {
      id: "11.13",
      title: "Common Table Expressions",
      description: [
        "PostgreSQL CTE'lari: oddiy, `RECURSIVE` va **data-modifying** CTE — `WITH deleted AS (DELETE ... RETURNING *) INSERT INTO archive SELECT * FROM deleted` — bir so'rovda bir nechta o'zgarish atomik bajariladi.",
        "",
        "PostgreSQL 12+ da yon ta'sirsiz CTE'lar asosiy so'rovga inline qilinadi; `MATERIALIZED` majburan bir marta hisoblaydi (optimallashtirish to'sig'i), `NOT MATERIALIZED` — aksincha. Recursive CTE'da `CYCLE` va `SEARCH` (14+) sikl va tartibni boshqaradi.",
        "",
        "```sql",
        "WITH moved AS (",
        "  DELETE FROM sessions WHERE last_seen < now() - interval '30 days' RETURNING *",
        ")",
        "INSERT INTO sessions_archive SELECT * FROM moved;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Eski yozuvlarni bitta atomik so'rovda arxiv jadvaliga ko'chiring (data-modifying CTE).",
      acceptanceCriteria: [
        "`MATERIALIZED` va inline CTE farqini biladi",
        "Data-modifying CTE va `RETURNING` ni ishlata oladi"
      ],
      prerequisites: [
        "9.5"
      ]
    },
    {
      id: "11.14",
      title: "Window Functions",
      description: [
        "PostgreSQL window imkoniyatlari to'liq: `ROW_NUMBER`, `RANK`, `NTILE`, `LAG/LEAD`, `FIRST_VALUE/LAST_VALUE`, `PERCENT_RANK`, agregatlar `OVER`, nomlangan oynalar (`WINDOW w AS (...)`), ramka turlari `ROWS`/`RANGE`/`GROUPS` va `EXCLUDE`. Agregatlarda `FILTER (WHERE ...)`.",
        "",
        "Qo'shimcha: `DISTINCT ON (col)` — har guruhdan birinchi qatorni olishning PostgreSQL'ga xos qisqa usuli (top-1-per-group).",
        "",
        "```sql",
        "SELECT DISTINCT ON (customer_id) customer_id, id, created_at",
        "FROM orders ORDER BY customer_id, created_at DESC;",
        "",
        "SELECT day, revenue,",
        "       AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS avg_7d",
        "FROM daily_revenue;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "7 kunlik sirg'aluvchi o'rtacha va oldingi hafta bilan solishtirishni bitta so'rovda hisoblang.",
      acceptanceCriteria: [
        "`DISTINCT ON` va `ROW_NUMBER` yondashuvlarini solishtira oladi",
        "Ramka (`ROWS BETWEEN`) sintaksisini biladi"
      ],
      prerequisites: [
        "9.6"
      ]
    },
    {
      id: "11.15",
      title: "Full-Text Search",
      description: [
        "PostgreSQL ichki FTS: `tsvector` (normallashtirilgan leksemalar), `tsquery` (`websearch_to_tsquery('laravel -php')`), `ts_rank` (relevance), `setweight` (sarlavha muhimroq), til konfiguratsiyalari (stemming). Tezlik uchun generated `tsvector` ustun + GIN indeks.",
        "",
        "O'rta hajmdagi qidiruv uchun alohida tizimsiz yetarli; typo-tolerance uchun `pg_trgm` bilan birlashtirish. O'zbek tili uchun tayyor stemmer yo'q — `simple` konfiguratsiya yoki tashqi qidiruv tizimi. Laravel'da `whereFullText` PostgreSQL'da ham ishlaydi.",
        "",
        "```sql",
        "ALTER TABLE posts ADD search tsvector GENERATED ALWAYS AS (",
        "  setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||",
        "  setweight(to_tsvector('simple', coalesce(body, '')), 'B')) STORED;",
        "CREATE INDEX posts_search ON posts USING gin (search);",
        "SELECT id, ts_rank(search, q) FROM posts, websearch_to_tsquery('simple', 'laravel queue') q",
        "WHERE search @@ q ORDER BY 2 DESC LIMIT 20;",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Blog uchun og'irlikli FTS qidiruvini generated ustun va GIN indeks bilan yarating.",
      acceptanceCriteria: [
        "`tsvector`, `tsquery` va rank'ni tushuntira oladi",
        "Ichki FTS va tashqi qidiruv tizimi o'rtasida tanlay oladi"
      ],
      prerequisites: [
        "11.5"
      ]
    },
    {
      id: "11.16",
      title: "Partitioning",
      description: [
        "Declarative partitioning katta jadvalni kichik bo'laklarga bo'ladi: `RANGE` (sana bo'yicha — eng keng tarqalgan), `LIST`, `HASH`. Foydalari: partition pruning (so'rov faqat kerakli bo'laklarni o'qiydi), eski ma'lumotni `DROP`/`DETACH PARTITION` bilan bir zumda o'chirish (katta `DELETE` o'rniga), kichikroq indekslar va VACUUM.",
        "",
        "Cheklovlar: PK/unique partition kalitini o'z ichiga olishi shart, partition kalitisiz so'rovlar barcha bo'laklarni ko'radi, juda ko'p partition planner'ni sekinlashtiradi. `pg_partman` yangi bo'laklarni avtomatik yaratadi.",
        "",
        "```sql",
        "CREATE TABLE events (id bigint, created_at timestamptz NOT NULL, payload jsonb)",
        "  PARTITION BY RANGE (created_at);",
        "CREATE TABLE events_2025_06 PARTITION OF events",
        "  FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Log jadvalini oylik partition'larga ko'chiring va 12 oydan eski bo'laklarni avtomatik o'chirishni sozlang.",
      acceptanceCriteria: [
        "Partition pruning shartlarini biladi",
        "Partitioning'ning cheklovlarini (PK, so'rovlar) tushuntira oladi"
      ],
      prerequisites: [
        "11.8"
      ]
    },
    {
      id: "11.17",
      title: "Materialized Views",
      description: [
        "Materialized view so'rov natijasini fizik saqlaydi — og'ir hisobotlar va dashboard'lar uchun. `REFRESH MATERIALIZED VIEW` qayta hisoblaydi; `CONCURRENTLY` (unique indeks talab qiladi) o'qishni bloklamasdan yangilaydi.",
        "",
        "Kamchilik: ma'lumot refresh vaqtigacha eskirgan; refresh butun so'rovni qayta bajaradi (inkremental emas). Yangilashni scheduler orqali (Laravel `Schedule`) yoki voqealar bo'yicha. Real-vaqt kerak bo'lsa — summary jadval + trigger/job.",
        "",
        "```sql",
        "CREATE MATERIALIZED VIEW sales_daily AS",
        "SELECT date_trunc('day', created_at) AS day, SUM(total) AS revenue FROM orders GROUP BY 1;",
        "CREATE UNIQUE INDEX ON sales_daily (day);",
        "REFRESH MATERIALIZED VIEW CONCURRENTLY sales_daily;",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Og'ir dashboard so'rovini materialized view'ga o'tkazib, Laravel scheduler orqali har 10 daqiqada yangilang.",
      acceptanceCriteria: [
        "`CONCURRENTLY` refresh talablarini biladi",
        "Ma'lumot eskirishini biznes bilan kelishadi"
      ],
      prerequisites: [
        "9.14"
      ]
    },
    {
      id: "11.18",
      title: "Extensions",
      description: [
        "Kengaytmalar PostgreSQL'ni kuchaytiradi: `pg_stat_statements` (so'rov statistikasi — production'da shart), `pg_trgm` (o'xshashlik qidiruvi), `uuid-ossp`/`pgcrypto`, `citext`, `hstore`, `PostGIS` (geo), `pgvector` (embedding/vektor qidiruvi), `pg_partman`, `timescaledb`, `postgres_fdw` (tashqi DB).",
        "",
        "Boshqariladigan bulut DB'larida (RDS, Cloud SQL) faqat ruxsat etilgan ro'yxat mavjud. Kengaytmalarni migratsiya orqali yoqing (`CREATE EXTENSION IF NOT EXISTS`) — muhitlar bir xil bo'lsin.",
        "",
        "```sql",
        "CREATE EXTENSION IF NOT EXISTS pg_stat_statements;",
        "SELECT query, calls, mean_exec_time, total_exec_time",
        "FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "`pg_stat_statements` ni yoqing va umumiy vaqt bo'yicha top-10 so'rovni tahlil qiling.",
      acceptanceCriteria: [
        "Asosiy kengaytmalar va ularning vazifasini biladi",
        "Kengaytmalarni migratsiya orqali boshqaradi"
      ],
      prerequisites: [
        "11.1"
      ]
    },
    {
      id: "11.19",
      title: "Autovacuum va `VACUUM`",
      description: [
        "`VACUUM` o'lik tuple'lar egallagan joyni qayta foydalanishga bo'shatadi (faylni kichraytirmaydi), visibility map'ni yangilaydi (index-only scan uchun muhim) va transaction ID wraparound'dan himoya qiladi. `VACUUM FULL` jadvalni qayta yozadi va kichraytiradi, lekin `ACCESS EXCLUSIVE` lock oladi — production'da `pg_repack` afzal.",
        "",
        "Autovacuum avtomatik ishlaydi; katta va tez o'zgaruvchan jadvallar uchun jadval darajasida sozlash kerak (`autovacuum_vacuum_scale_factor` ni kamaytirish). Uzoq ochiq tranzaksiyalar va unutilgan replication slot'lar vacuum'ni bloklaydi.",
        "",
        "```sql",
        "ALTER TABLE orders SET (autovacuum_vacuum_scale_factor = 0.02, autovacuum_analyze_scale_factor = 0.01);",
        "SELECT relname, n_dead_tup, last_autovacuum FROM pg_stat_user_tables ORDER BY n_dead_tup DESC;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Eng ko'p dead tuple'li jadvallar uchun autovacuum'ni sozlang va bloat'ni oldin/keyin o'lchang.",
      acceptanceCriteria: [
        "`VACUUM` va `VACUUM FULL` farqini biladi",
        "Vacuum'ni bloklovchi omillarni aniqlaydi"
      ],
      prerequisites: [
        "11.10"
      ]
    },
    {
      id: "11.20",
      title: "`ANALYZE`",
      description: [
        "`ANALYZE` jadvaldan namuna olib, planner uchun statistika yig'adi: eng ko'p uchraydigan qiymatlar, histogramma, `NULL` ulushi, `n_distinct`, korrelyatsiya. Autovacuum `ANALYZE` ni ham avtomatik bajaradi.",
        "",
        "Katta import yoki ma'lumot taqsimoti keskin o'zgarganidan keyin qo'lda `ANALYZE` qiling — aks holda planner eskirgan statistika bilan yomon reja tanlaydi. Notekis taqsimlangan ustunlar uchun `ALTER TABLE ... ALTER COLUMN ... SET STATISTICS 1000` aniqlikni oshiradi.",
        "",
        "```sql",
        "ANALYZE VERBOSE orders;",
        "SELECT attname, n_distinct, most_common_vals FROM pg_stats WHERE tablename = 'orders';",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Katta importdan keyin `ANALYZE` qilinmagan va qilingan holatda bir so'rov rejasini solishtiring.",
      acceptanceCriteria: [
        "Statistika planner tanloviga qanday ta'sir qilishini biladi",
        "Import jarayoniga `ANALYZE` ni qo'shadi"
      ],
      prerequisites: [
        "11.9"
      ]
    },
    {
      id: "11.21",
      title: "Replication asoslari",
      description: [
        "**Streaming replication** (fizik): standby WAL oqimini qabul qilib, primary'ning aniq nusxasini saqlaydi; hot standby o'qish so'rovlariga xizmat qiladi. Asinxron yoki sinxron (`synchronous_commit`, `synchronous_standby_names`). **Logical replication** (publication/subscription) — tanlangan jadvallarni, turli versiyalar o'rtasida ham (upgrade va migratsiya uchun qulay).",
        "",
        "Failover avtomatlashtirish: Patroni, repmgr yoki boshqariladigan servislar. Replication slot'lar WAL'ni saqlab qoladi — standby uzoq vaqt uzilsa disk to'lishi mumkin; monitoring shart.",
        "",
        "```sql",
        "SELECT client_addr, state, replay_lag FROM pg_stat_replication;",
        "SELECT slot_name, active, pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) FROM pg_replication_slots;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Primary + streaming standby sozlang, lag'ni kuzating va Laravel'da read/write ajratishni ulang.",
      acceptanceCriteria: [
        "Fizik va logical replikatsiya farqini biladi",
        "Replication slot xavfini tushuntira oladi"
      ],
      prerequisites: [
        "11.1"
      ]
    },
    {
      id: "11.22",
      title: "Backup va Point-in-Time Recovery",
      description: [
        "Logical backup: `pg_dump` (bitta DB, `-Fc` custom format — parallel restore `pg_restore -j`), `pg_dumpall` (rollar va global ob'ektlar). Fizik backup: `pg_basebackup` yoki pgBackRest/Barman — katta DB uchun tez, inkremental.",
        "",
        "PITR: bazaviy fizik backup + uzluksiz WAL arxivi (`archive_command`) → istalgan vaqtga tiklash (`recovery_target_time`). Masalan, xato `DELETE` dan 1 daqiqa oldingi holatga qaytish. Restore jarayonini muntazam sinang va vaqtini (RTO) o'lchang.",
        "",
        "```bash",
        "pg_dump -Fc -d app -f app.dump",
        "pg_restore -j 4 -d app_restore app.dump",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "pgBackRest bilan to'liq + WAL arxiv sozlab, PITR orqali tasodifan o'chirilgan ma'lumotni tiklang.",
      acceptanceCriteria: [
        "`pg_dump` va fizik backup farqini biladi",
        "PITR mexanizmini tushuntira oladi"
      ],
      prerequisites: [
        "10.19"
      ]
    },
    {
      id: "11.23",
      title: "Connection Pooling",
      description: [
        "Har PostgreSQL ulanishi alohida process (bir necha MB xotira) — yuzlab ulanish serverni bo'g'adi. Ko'p FPM worker'li Laravel ilovalari uchun **PgBouncer** odatiy: `transaction` pooling rejimida bir nechta server ulanishi minglab mijozga xizmat qiladi.",
        "",
        "Transaction pooling cheklovlari: sessiya holati (`SET`, advisory lock'lar sessiya darajasida, `LISTEN`) ishlamaydi; prepared statement'lar PgBouncer 1.21+ da qo'llab-quvvatlanadi. Laravel'da odatda emulated prepares yoki to'g'ri sozlangan PgBouncer bilan muammosiz ishlaydi.",
        "",
        "```ini",
        "[pgbouncer]",
        "pool_mode = transaction",
        "max_client_conn = 2000",
        "default_pool_size = 40",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "PgBouncer'ni transaction rejimida sozlab, Laravel bilan load test o'tkazing va ulanishlar sonini kuzating.",
      acceptanceCriteria: [
        "Session va transaction pooling farqini biladi",
        "Transaction pooling cheklovlarini ayta oladi"
      ],
      prerequisites: [
        "11.1"
      ]
    },
    {
      id: "11.24",
      title: "PostgreSQL Performance Tuning",
      description: [
        "Asosiy parametrlar: `shared_buffers` (~25% RAM), `effective_cache_size` (~50–75% RAM — planner uchun ishora), `work_mem` (har sort/hash operatsiyasi uchun — ehtiyot bo'ling, ulanishlar soniga ko'payadi), `maintenance_work_mem`, `random_page_cost` (SSD ~1.1), `max_wal_size`, `checkpoint_completion_target`, autovacuum sozlamalari.",
        "",
        "Jarayon: `pg_stat_statements` bilan og'ir so'rovlarni topish → indeks/so'rov tuzatish → konfiguratsiya (PGTune boshlang'ich nuqta sifatida) → monitoring (cache hit ratio, bloat, lock kutish, checkpoint chastotasi). Har bir o'zgarishni benchmark (`pgbench`) bilan tasdiqlang.",
        "",
        "```sql",
        "SELECT sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read), 0) AS cache_hit",
        "FROM pg_statio_user_tables;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Server RAM'iga mos asosiy parametrlarni sozlab, `pgbench` bilan oldin/keyin TPS'ni o'lchang.",
      acceptanceCriteria: [
        "`work_mem` ning ulanishlar soni bilan ko'payishini tushunadi",
        "Tuning'ni o'lchov bilan tasdiqlaydi"
      ],
      prerequisites: [
        "11.18",
        "11.9"
      ]
    }
  ]
});
