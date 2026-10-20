/* 55 · Database Indexing
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 55,
  slug: "database-indexing",
  title: "Database Indexing",
  group: "database",
  description: "Indekslar — DB performance'ining asosiy vositasi: to'g'ri indeks so'rovni minglab marta tezlashtiradi, noto'g'risi yoki ortiqchasi esa yozishni sekinlashtiradi va xotirani egallaydi. Senior dasturchi indeks turlarini, ularning ichki tuzilmasini va so'rov naqshlariga mos indeks strategiyasini biladi, ishlatilmagan indekslarni topib tozalaydi.",
  subskills: [
    {
      id: "55.1",
      title: "Primary Indexes",
      description: [
        "Primary key indeksi — har jadvalda bitta, unikal va `NOT NULL`. InnoDB'da u **clustered**: qatorlar fizik ravishda PK tartibida saqlanadi, barcha secondary indekslar PK qiymatini o'z ichiga oladi. PostgreSQL'da PK — oddiy unikal B-tree indeks (jadval heap'da, clustered emas).",
        "",
        "Oqibatlar: InnoDB'da PK qisqa (`BIGINT` 8 bayt) va monoton o'suvchi bo'lishi kerak — tasodifiy UUIDv4 sahifa bo'linishlari va katta secondary indekslar beradi (ULID/UUIDv7 yaxshiroq). PK bo'yicha diapazon so'rovlari (`WHERE id BETWEEN`) juda tez.",
        "",
        "```php",
        "$table->id();                    // BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY",
        "$table->ulid('id')->primary();   // vaqt bo'yicha tartiblangan — InnoDB uchun qulay",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bir xil ma'lumotni auto-increment va UUIDv4 PK'li jadvallarga yozib, indeks hajmi va insert tezligini solishtiring.",
      acceptanceCriteria: [
        "Clustered va non-clustered PK farqini biladi",
        "PK turi tanlovining ta'sirini tushunadi"
      ],
      prerequisites: [
        "10.2"
      ]
    },
    {
      id: "55.2",
      title: "Unique Indexes",
      description: [
        "Unique indeks — takrorlanmaslikni kafolatlaydi va qidiruvni tezlashtiradi: `email`, `(tenant_id, email)`, `sku`, tashqi tizim ID'si (`external_id` — idempotentlik uchun). Race condition'larga qarshi yagona ishonchli himoya (ilova tekshiruvi ikki parallel so'rovda buziladi).",
        "",
        "Nozikliklar: `NULL` qiymatlar odatda takrorlanishi mumkin (ko'p NULL — ruxsat); soft delete bilan — partial unique (PostgreSQL) yoki `deleted_at` ni kalitga qo'shish; case-insensitive unikallik — collation yoki `lower()` expression indeks. Buzilish — `UniqueConstraintViolationException`.",
        "",
        "```php",
        "$table->unique(['tenant_id', 'email']);",
        "$table->unique('external_id');   // webhook/import idempotentligi",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Biznes qoidalaridagi barcha unikallik talablarini unique indekslar bilan ta'minlang.",
      acceptanceCriteria: [
        "Unique indeksni race himoyasi sifatida ishlatadi",
        "NULL va soft delete bilan nozikliklarni biladi"
      ],
      prerequisites: [
        "9.13"
      ]
    },
    {
      id: "55.3",
      title: "Composite Indexes",
      description: [
        "Composite indeks bir nechta ustunni tartib bilan o'z ichiga oladi: `(tenant_id, status, created_at)`. Leftmost prefix: `tenant_id`, `tenant_id+status`, `tenant_id+status+created_at` uchun ishlaydi; `status` yolg'iz uchun — yo'q (MySQL 8 skip scan'i cheklangan holatlarda).",
        "",
        "Bitta yaxshi composite indeks bir nechta bir ustunli indeksdan samaraliroq: optimizer odatda bitta indeks tanlaydi (index merge kamdan-kam optimal). Mavjud `(a, b)` indeks `(a)` indeksni keraksiz qiladi (dublikat).",
        "",
        "```php",
        "$table->index(['tenant_id', 'status', 'created_at']);",
        "// Xizmat qiladi: WHERE tenant_id=? | WHERE tenant_id=? AND status=? | ... ORDER BY created_at",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Jadvaldagi bir ustunli indekslarni so'rov naqshlari asosida kamroq composite indekslar bilan almashtiring.",
      acceptanceCriteria: [
        "Leftmost prefix qoidasini biladi",
        "Composite va bir ustunli indekslar o'rtasida asosli tanlaydi"
      ],
      prerequisites: [
        "10.6"
      ]
    },
    {
      id: "55.4",
      title: "Covering Indexes",
      description: [
        "Covering indeks — so'rovga kerak barcha ustunlar indeksda: jadvalga (heap/clustered) murojaat yo'q — \"index-only\". MySQL `EXPLAIN` da `Using index`; PostgreSQL'da `Index Only Scan` (visibility map yangilangan bo'lsa — VACUUM). PostgreSQL 11+ `INCLUDE` — qidiruvga emas, faqat qaytarish uchun qo'shimcha ustunlar.",
        "",
        "Qo'llanishi: tez-tez bajariladigan ro'yxat va hisobot so'rovlari, `COUNT`, pagination (deferred join). Narxi — kattaroq indeks va sekinroq yozish; faqat haqiqatan issiq so'rovlar uchun.",
        "",
        "```sql",
        "-- PostgreSQL",
        "CREATE INDEX orders_customer_cover ON orders (customer_id, created_at DESC) INCLUDE (status, total);",
        "SELECT created_at, status, total FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Eng issiq ro'yxat so'rovi uchun covering indeks yaratib, EXPLAIN'da index-only scan'ni tasdiqlang.",
      acceptanceCriteria: [
        "Covering indeks shartlarini biladi",
        "PostgreSQL `INCLUDE` va visibility map'ni tushunadi"
      ],
      prerequisites: [
        "10.7"
      ]
    },
    {
      id: "55.5",
      title: "Partial Indexes",
      description: [
        "Partial indeks (PostgreSQL; MySQL'da yo'q — muqobil: generated column) — faqat shartga mos qatorlarni indekslaydi: `WHERE status = 'pending'`, `WHERE deleted_at IS NULL`. Kichik, tez yangilanadi va maqsadli so'rovlarga juda samarali (masalan, 100 mln qatorning 0.1% i pending).",
        "",
        "So'rov sharti indeks shartini mantiqan qamrab olishi kerak. Klassik qo'llanishlar: navbat jadvallari, faol yozuvlar, soft delete bilan unique.",
        "",
        "```sql",
        "CREATE INDEX jobs_pending_available ON jobs (available_at) WHERE reserved_at IS NULL;",
        "CREATE UNIQUE INDEX users_email_active ON users (email) WHERE deleted_at IS NULL;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Notekis taqsimlangan holat ustuni uchun partial indeks yaratib, hajmini to'liq indeks bilan solishtiring.",
      acceptanceCriteria: [
        "Partial indeks qo'llanishini biladi",
        "MySQL'dagi muqobilini tushunadi"
      ],
      prerequisites: [
        "11.6"
      ]
    },
    {
      id: "55.6",
      title: "Functional/Expression Indexes",
      description: [
        "Funksional indeks — ifoda natijasini indekslaydi: `lower(email)`, `date(created_at)`, `(data->>'sku')`, `(price * qty)`. So'rovda aynan shu ifoda ishlatilsa — indeks qo'llanadi. MySQL 8.0.13+ (`((LOWER(email)))`) va PostgreSQL qo'llab-quvvatlaydi; MySQL'da generated column + indeks ham variant.",
        "",
        "Funksiya deterministik (IMMUTABLE) bo'lishi kerak. Ko'pincha muqobil — ma'lumotni normallashtirib saqlash (email'ni kichik harfda yozish) — sodda va har qanday so'rovda ishlaydi.",
        "",
        "```sql",
        "CREATE INDEX users_email_lower ON users ((lower(email)));                         -- PostgreSQL",
        "ALTER TABLE products ADD sku VARCHAR(64) AS (attributes->>'$.sku') STORED, ADD INDEX (sku);  -- MySQL",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "JSON ichidagi maydon bo'yicha qidiruvni funksional yoki generated column indeks bilan tezlashtiring.",
      acceptanceCriteria: [
        "Funksional indeks ishlash shartini biladi",
        "Normallashtirib saqlash muqobilini ko'rib chiqadi"
      ],
      prerequisites: [
        "11.7"
      ]
    },
    {
      id: "55.7",
      title: "Full-Text Indexes",
      description: [
        "Full-text indeks — so'zlar bo'yicha qidiruv (`LIKE '%so'z%'` indekssiz full scan o'rniga). MySQL `FULLTEXT` + `MATCH ... AGAINST`; PostgreSQL `tsvector` + GIN. Imkoniyatlar: relevance, boolean operatorlar, stop-so'zlar, stemming (til bo'yicha; o'zbek tili uchun cheklangan).",
        "",
        "O'rta murakkablikdagi qidiruv uchun yetarli; typo-tolerance, facet'lar, sinonimlar, ko'p tilli qidiruv kerak bo'lsa — Meilisearch/Typesense/Elasticsearch (Laravel Scout). `pg_trgm` — o'xshashlik va `ILIKE '%x%'` uchun.",
        "",
        "```php",
        "$table->fullText(['title', 'description']);",
        "Product::whereFullText(['title', 'description'], 'simsiz quloqchin')->get();",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Mahsulot qidiruvini full-text indeksga o'tkazib, `LIKE` bilan tezlik va natija sifatini solishtiring.",
      acceptanceCriteria: [
        "Full-text indeks imkoniyatlari va cheklovlarini biladi",
        "Tashqi qidiruv tizimiga o'tish mezonini biladi"
      ],
      prerequisites: [
        "10.15"
      ]
    },
    {
      id: "55.8",
      title: "B-tree Indexes",
      description: [
        "B-tree (B+tree) — default va eng universal indeks: tartiblangan, muvozanatlangan daraxt; barglar bog'langan ro'yxat. Qo'llab-quvvatlaydi: tenglik, diapazon (`<`, `>`, `BETWEEN`), prefiks `LIKE 'abc%'`, `ORDER BY` va `MIN/MAX`, `IS NULL`. Qidiruv O(log n) — daraxt balandligi 3–4 sahifa millionlab qatorda.",
        "",
        "Qo'llab-quvvatlamaydi: `LIKE '%abc'`, indekslangan ustunga funksiya (expression indekssiz), ba'zi `OR` va `!=` holatlari samarasiz.",
        "",
        "```sql",
        "CREATE INDEX orders_created_at ON orders (created_at);",
        "-- Ishlaydi: WHERE created_at >= '2025-06-01' ORDER BY created_at",
        "-- Ishlamaydi: WHERE DATE(created_at) = '2025-06-01'",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "B-tree indeks ishlaydigan va ishlamaydigan 5 ta so'rov shaklini EXPLAIN bilan ko'rsating.",
      acceptanceCriteria: [
        "B-tree imkoniyatlari va cheklovlarini biladi",
        "Sargable so'rovlar bilan bog'laydi"
      ],
      prerequisites: [
        "10.5"
      ]
    },
    {
      id: "55.9",
      title: "Hash Indexes",
      description: [
        "Hash indeks — faqat tenglik (`=`) uchun: kalit hash'i bo'yicha to'g'ridan-to'g'ri joylashuv; diapazon, tartiblash, prefiks qidiruv — yo'q. PostgreSQL'da `USING hash` (10+ dan WAL bilan xavfsiz) — juda uzun qiymatlar (URL, token) bo'yicha tenglik qidiruvida B-tree'dan kichikroq bo'lishi mumkin. MySQL InnoDB'da foydalanuvchi hash indeks yarata olmaydi (adaptive hash index — avtomatik ichki mexanizm); Memory engine'da bor.",
        "",
        "Amalda kamdan-kam kerak — B-tree ko'p holatda yetarli va universal.",
        "",
        "```sql",
        "CREATE INDEX sessions_token_hash ON sessions USING hash (token);   -- PostgreSQL",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "PostgreSQL'da uzun token ustuni uchun hash va B-tree indekslarining hajmi va tezligini solishtiring.",
      acceptanceCriteria: [
        "Hash indeks cheklovlarini biladi",
        "Qachon foydali ekanini tushunadi"
      ],
      prerequisites: [
        "55.8"
      ]
    },
    {
      id: "55.10",
      title: "GIN va GiST Indexes",
      description: [
        "PostgreSQL'ning maxsus indekslari. **GIN** (Generalized Inverted Index) — bir qatorda ko'p kalit bo'lgan ma'lumot: JSONB (`@>`, `?`), massivlar (`&&`, `@>`), full-text (`tsvector @@`), trigramlar (`pg_trgm` — `ILIKE '%x%'`, o'xshashlik). O'qish tez, yozish va hajm qimmatroq (`fastupdate`).",
        "",
        "**GiST** — geometrik va diapazon ma'lumotlar: PostGIS, `tstzrange` (ustma-ust tushish `&&`), EXCLUDE constraint'lar, KNN (eng yaqin — `<->`). **SP-GiST**, **BRIN** — maxsus holatlar.",
        "",
        "```sql",
        "CREATE INDEX products_attrs ON products USING gin (attributes jsonb_path_ops);",
        "CREATE INDEX users_name_trgm ON users USING gin (name gin_trgm_ops);",
        "CREATE INDEX bookings_period ON bookings USING gist (room_id, period);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "JSONB filtri va `ILIKE '%x%'` qidiruv uchun GIN indekslarini yaratib, EXPLAIN bilan tasdiqlang.",
      acceptanceCriteria: [
        "GIN va GiST qaysi ma'lumot uchun ekanini biladi",
        "Operator class'larni (`jsonb_path_ops`, `gin_trgm_ops`) to'g'ri tanlaydi"
      ],
      prerequisites: [
        "11.5"
      ]
    },
    {
      id: "55.11",
      title: "Index Selectivity",
      description: [
        "Selektivlik — indeks qatorlarni qanchalik yaxshi \"ajratadi\": unikal qiymatlar / jami qatorlar (1 ga yaqin — juda selektiv). Yuqori selektivlik (email, telefon) — indeks juda foydali; past (boolean, 3 ta status) — optimizer full scan'ni afzal ko'radi, chunki indeks orqali ko'p qatorni olish qimmat.",
        "",
        "Lekin taqsimot muhim: `status` ustunida 99% `done` va 1% `pending` — `pending` bo'yicha qidiruv uchun indeks (yoki partial indeks) juda samarali. Statistika (histogrammalar) optimizer'ga notekislikni bildiradi.",
        "",
        "```sql",
        "SELECT COUNT(DISTINCT status) / COUNT(*) AS selectivity FROM orders;",
        "SELECT status, COUNT(*) FROM orders GROUP BY status;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy jadval ustunlarining selektivligi va taqsimotini hisoblab, indeks qarorlarini asoslang.",
      acceptanceCriteria: [
        "Selektivlikni hisoblaydi va talqin qiladi",
        "Notekis taqsimotni hisobga oladi"
      ],
      prerequisites: [
        "15.6"
      ]
    },
    {
      id: "55.12",
      title: "Column Order in Composite Indexes",
      description: [
        "Composite indeksda ustun tartibi: (1) tenglik (`=`, `IN` kichik ro'yxat) ustunlari birinchi; (2) keyin diapazon yoki `ORDER BY` ustuni; (3) diapazondan keyingi ustunlar qidiruv uchun ishlamaydi (faqat filtr/covering). Tenglik ustunlari orasida — eng ko'p so'rovlarda ishtirok etuvchi birinchi (indeksni qayta ishlatish uchun).",
        "",
        "`ORDER BY` yo'nalishi: MySQL 8 va PostgreSQL descending indekslarni qo'llab-quvvatlaydi — aralash `ASC/DESC` tartib uchun mos indeks.",
        "",
        "```sql",
        "-- WHERE tenant_id = ? AND status = ? AND created_at >= ? ORDER BY created_at DESC",
        "CREATE INDEX ix ON orders (tenant_id, status, created_at DESC);   -- ✅",
        "-- (created_at, tenant_id, status) — diapazon birinchi ❌",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bir so'rov uchun ustun tartibi turlicha bo'lgan 3 ta indeksni EXPLAIN va vaqt bo'yicha solishtiring.",
      acceptanceCriteria: [
        "Tenglik → diapazon/tartib qoidasini qo'llaydi",
        "Descending indekslarni biladi"
      ],
      prerequisites: [
        "55.3"
      ]
    },
    {
      id: "55.13",
      title: "Index-Only Scans",
      description: [
        "Index-only scan — natija faqat indeksdan olinadi, jadvalga murojaat yo'q: covering indeks + (PostgreSQL'da) visibility map — VACUUM yangilagan sahifalar uchun heap tekshiruvi kerak emas. `EXPLAIN ANALYZE` da `Heap Fetches: 0` ideal; ko'p heap fetch — VACUUM yetishmaydi.",
        "",
        "MySQL'da covering indeks bilan `Using index`. Katta jadvallarda katta tezlik — I/O keskin kamayadi. Agressiv autovacuum ko'p o'zgaradigan jadvallarda index-only scan samaradorligini saqlaydi.",
        "",
        "```sql",
        "EXPLAIN (ANALYZE, BUFFERS) SELECT customer_id, created_at FROM orders WHERE customer_id = 42;",
        "-- Index Only Scan using orders_customer_created ... Heap Fetches: 0",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Index-only scan'ga erishing va VACUUM'dan oldin/keyin heap fetches sonini solishtiring.",
      acceptanceCriteria: [
        "Index-only scan shartlarini biladi",
        "Visibility map va VACUUM rolini tushunadi"
      ],
      prerequisites: [
        "55.4"
      ]
    },
    {
      id: "55.14",
      title: "Index Maintenance",
      description: [
        "Indekslar vaqt o'tib \"shishadi\" (bloat — o'chirilgan va yangilangan qatorlar izlari, sahifa bo'linishlari) va samaradorligi tushadi. PostgreSQL: `REINDEX INDEX CONCURRENTLY` (bloklamasdan qayta qurish), `pg_repack`, bloat monitoringi (`pgstattuple`). MySQL: `OPTIMIZE TABLE` / `ALTER TABLE ... ENGINE=InnoDB` (jadval va indekslarni qayta quradi — katta jadvalda pt-online-schema-change/gh-ost bilan).",
        "",
        "Statistikani yangilash (`ANALYZE`) — optimizer to'g'ri reja tanlashi uchun. Katta jadvalga yangi indeks — `CREATE INDEX CONCURRENTLY` (PG) yoki `ALGORITHM=INPLACE, LOCK=NONE` (MySQL) — production'ni bloklamasdan.",
        "",
        "```sql",
        "CREATE INDEX CONCURRENTLY orders_status ON orders (status);   -- PostgreSQL",
        "ALTER TABLE orders ADD INDEX ix_status (status), ALGORITHM=INPLACE, LOCK=NONE;   -- MySQL",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Katta jadvalga production'ni bloklamasdan indeks qo'shuvchi migratsiya yozing va bloat'ni tekshiring.",
      acceptanceCriteria: [
        "Indeks bloat va qayta qurish usullarini biladi",
        "Onlayn indeks yaratishni qo'llaydi"
      ],
      prerequisites: [
        "11.12"
      ]
    },
    {
      id: "55.15",
      title: "Write Performance Trade-offs",
      description: [
        "Har indeks — har `INSERT`, `UPDATE` (indekslangan ustun o'zgarsa), `DELETE` da qo'shimcha ish: indeks daraxtini yangilash, ko'proq I/O va WAL/redo, lock'lar, disk va xotira (buffer pool'da raqobat). Yozish ko'p jadvallarda (log'lar, event'lar, hisoblagichlar) ortiqcha indekslar throughput'ni keskin tushiradi.",
        "",
        "Muvozanat: faqat haqiqiy so'rovlarga xizmat qiluvchi indekslar; ommaviy importda indekslarni vaqtincha o'chirib keyin qayta yaratish (katta yuklashlar uchun); PostgreSQL HOT update'lari indekslanmagan ustunlar o'zgarganda tezroq.",
        "",
        "```text",
        "Jadval: events (sekundiga 2000 insert)",
        "5 ta indeks → insert p95 = 12 ms",
        "2 ta indeks → insert p95 = 4 ms   (3 tasi ishlatilmayotgan edi)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yozish og'ir jadvalda indekslar sonining insert tezligiga ta'sirini benchmark bilan o'lchang.",
      acceptanceCriteria: [
        "Indeksning yozishga narxini biladi",
        "O'qish va yozish ehtiyojlarini muvozanatlaydi"
      ],
      prerequisites: [
        "55.16"
      ]
    },
    {
      id: "55.16",
      title: "Index Usage Analysis",
      description: [
        "Indekslar haqiqatan ishlatiladimi: PostgreSQL `pg_stat_user_indexes` (`idx_scan`), MySQL `sys.schema_unused_indexes` va `sys.schema_index_statistics`, `performance_schema`. Statistikani yetarli vaqt (to'liq biznes sikli — oy oxiri hisobotlari ham) yig'ing va replica'larni ham tekshiring (u yerda ishlatilishi mumkin).",
        "",
        "Qaysi so'rov qaysi indeksni ishlatadi — `EXPLAIN` va `pg_stat_statements`/slow log bilan. Ishlatilmagan indeks — o'chirish nomzodi (lekin unique va FK indekslari constraint vazifasini bajaradi!).",
        "",
        "```sql",
        "-- PostgreSQL",
        "SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid)) size",
        "FROM pg_stat_user_indexes ORDER BY idx_scan, pg_relation_size(indexrelid) DESC LIMIT 20;",
        "-- MySQL",
        "SELECT * FROM sys.schema_unused_indexes;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir oylik statistika asosida ishlatilmagan indekslar ro'yxatini tuzing va o'chirish rejasini tayyorlang.",
      acceptanceCriteria: [
        "Indeks ishlatilish statistikasini o'qiy oladi",
        "Constraint indekslarini o'chirmaslikka e'tibor beradi"
      ],
      prerequisites: [
        "15.4"
      ]
    },
    {
      id: "55.17",
      title: "Duplicate va Unused Indexes",
      description: [
        "Dublikat indekslar: bir xil ustunlar bir xil tartibda (`idx_a` va `idx_a_2`), prefiksi qoplangan (`(a)` va `(a, b)` — birinchisi ko'pincha keraksiz), Laravel migratsiyalarida tasodifan ikki marta yaratilgan, FK uchun avtomatik yaratilgan va qo'lda qo'shilgan bir xil indeks. Ishlatilmagan — hech qaysi so'rov foydalanmaydigan.",
        "",
        "Ular yozishni sekinlashtiradi, xotira va diskni egallaydi, backup'ni kattalashtiradi. Vositalar: `pt-duplicate-key-checker` (MySQL), PostgreSQL so'rovlari, `sys.schema_redundant_indexes`. O'chirishdan oldin: staging'da sinash, yoki MySQL 8 `INVISIBLE` indeks bilan vaqtincha yashirib kuzatish.",
        "",
        "```sql",
        "ALTER TABLE orders ALTER INDEX idx_old_status INVISIBLE;   -- MySQL 8: o'chirishdan oldin sinash",
        "SELECT * FROM sys.schema_redundant_indexes;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Dublikat va ortiqcha indekslarni toping, INVISIBLE bilan sinab, keyin migratsiya orqali o'chiring.",
      acceptanceCriteria: [
        "Dublikat va ortiqcha indeks turlarini biladi",
        "O'chirishni xavfsiz bajaradi (invisible)"
      ],
      prerequisites: [
        "55.16"
      ]
    },
    {
      id: "55.18",
      title: "`EXPLAIN ANALYZE`",
      description: [
        "Indekslash ishining asosiy vositasi: indeks qo'shishdan oldin va keyin `EXPLAIN ANALYZE` — haqiqatan ishlatildimi, qatorlar soni va vaqt qanchalik kamaydi. Belgilar: `Seq Scan`/`type: ALL` → `Index Scan`/`ref`/`range`; `Rows Removed by Filter` katta — indeks yetarli selektiv emas yoki noto'g'ri tartib; `Sort` yo'qoldi — indeks tartibni ham beradi; `Heap Fetches` — covering emas.",
        "",
        "Har yangi indeks migratsiyasi PR'ida — oldin/keyin EXPLAIN natijasi bilan asoslash yaxshi amaliyot.",
        "",
        "```sql",
        "EXPLAIN ANALYZE SELECT * FROM orders WHERE tenant_id = 7 AND status = 'paid' ORDER BY created_at DESC LIMIT 20;",
        "-- Oldin:  Seq Scan ... Sort ... (actual time=812 ms)",
        "-- Keyin:  Index Scan using ix_tenant_status_created ... (actual time=0.4 ms)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Yangi indeks migratsiyasi uchun PR tavsifida oldin/keyin EXPLAIN ANALYZE natijalarini taqdim eting.",
      acceptanceCriteria: [
        "EXPLAIN ANALYZE orqali indeks samaradorligini tasdiqlaydi",
        "Rejadagi indeks bilan bog'liq belgilarni o'qiydi"
      ],
      prerequisites: [
        "16.2"
      ]
    }
  ]
});
