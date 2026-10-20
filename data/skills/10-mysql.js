/* 10 · MySQL
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 10,
  slug: "mysql",
  title: "MySQL",
  group: "database",
  description: "MySQL — Laravel loyihalarida eng ko'p ishlatiladigan relyatsion DB. Senior dasturchi InnoDB ichki tuzilishini (clustered indeks, MVCC, lock'lar), so'rov rejalarini, replikatsiya va backup asoslarini biladi — bu bilimlar yuqori yuklama ostida barqaror ishlash va muammolarni tez topish uchun zarur.",
  subskills: [
    {
      id: "10.1",
      title: "MySQL Architecture asoslari",
      description: [
        "MySQL ikki qatlamdan iborat: **server qatlami** (ulanishlarni boshqarish, parser, optimizer, cache'lar, replikatsiya) va **storage engine** qatlami (InnoDB, MyISAM, Memory). Har bir ulanish alohida thread'da ishlaydi.",
        "",
        "So'rov yo'li: ulanish → parse → optimizer reja tanlaydi → engine ma'lumotni o'qiydi/yozadi. MySQL 8 da query cache olib tashlangan. Asosiy xotira — InnoDB buffer pool (ma'lumot va indeks sahifalari keshi). Diskda: tablespace fayllari (`.ibd`), redo log (crash recovery), undo log (MVCC va rollback), binary log (replikatsiya, PITR).",
        "",
        "```sql",
        "SHOW VARIABLES LIKE 'innodb_buffer_pool_size';",
        "SHOW ENGINE INNODB STATUS\\G",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "MySQL arxitekturasini (server, engine, log'lar) diagramma qilib chizing va har bir log turining vazifasini yozing.",
      acceptanceCriteria: [
        "Redo, undo va binary log farqini tushuntira oladi",
        "Buffer pool rolini biladi"
      ],
      prerequisites: [
        "9.1"
      ]
    },
    {
      id: "10.2",
      title: "InnoDB",
      description: [
        "InnoDB — MySQL'ning standart engine'i: ACID tranzaksiyalar, row-level lock, MVCC, foreign key, crash recovery. Ma'lumot **clustered index** (PK) tartibida saqlanadi; secondary indekslar PK qiymatiga ishora qiladi — shuning uchun PK qisqa va monoton o'suvchi bo'lishi kerak (tasodifiy UUID v4 sahifa bo'linishlari va fragmentatsiyaga olib keladi; ULID/UUIDv7 yaxshiroq).",
        "",
        "Muhim sozlamalar: `innodb_buffer_pool_size` (RAM'ning ~60–75% maxsus serverda), `innodb_flush_log_at_trx_commit` (1 — to'liq durability), `innodb_log_file_size`/`innodb_redo_log_capacity`.",
        "",
        "```php",
        "// Laravel: ULID PK — monoton, indeks uchun qulay",
        "$table->ulid('id')->primary();",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "UUID v4 va auto-increment PK'li jadvallarga 1 mln qator yozib, insert tezligi va indeks hajmini solishtiring.",
      acceptanceCriteria: [
        "Clustered indeks va secondary indeks bog'liqligini tushuntira oladi",
        "Tasodifiy UUID PK muammosini biladi"
      ],
      prerequisites: [
        "10.1"
      ]
    },
    {
      id: "10.3",
      title: "Tables, Columns va Data Types",
      description: [
        "To'g'ri tip — kam joy, tez indeks, to'g'ri ma'lumot. Butun sonlar: `TINYINT`…`BIGINT` (`UNSIGNED` bilan); pul — `DECIMAL(15,2)` yoki tiyinda `BIGINT` (hech qachon `FLOAT`); matn — `VARCHAR(n)` (indekslanadigan), `TEXT` (uzun); vaqt — `DATETIME` (vaqt zonasisiz) yoki `TIMESTAMP` (UTC'ga aylantiradi, 2038 chegarasi); `JSON`; `ENUM` (o'zgartirish ALTER talab qiladi — ko'pincha string + PHP enum afzal).",
        "",
        "`utf8mb4` charset (emoji va to'liq Unicode). `VARCHAR(255)` ni avtomatik tanlamang — real chegarani o'ylang.",
        "",
        "```php",
        "$table->decimal('amount', 15, 2);",
        "$table->string('phone', 20);",
        "$table->timestamp('paid_at')->nullable();",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud jadval tiplarini audit qiling: float pullar, ortiqcha katta tiplar va noto'g'ri charset'larni tuzating.",
      acceptanceCriteria: [
        "`DATETIME` va `TIMESTAMP` farqini biladi",
        "Pul uchun to'g'ri tipni tanlaydi"
      ],
      prerequisites: [
        "10.2"
      ]
    },
    {
      id: "10.4",
      title: "Primary, Unique va Foreign Keys",
      description: [
        "MySQL'da: PK — clustered indeks (har jadvalda bo'lishi shart; bo'lmasa InnoDB yashirin 6 baytli PK yaratadi). `UNIQUE` — indeks + takrorlanmaslik (`NULL` lar takrorlanishi mumkin). FK — InnoDB'da qo'llab-quvvatlanadi, ustunga avtomatik indeks yaratiladi, tiplar aniq mos bo'lishi kerak (`BIGINT UNSIGNED` ↔ `BIGINT UNSIGNED`).",
        "",
        "Katta jadvallarda FK tekshiruvi yozishni sekinlashtiradi va lock'larni kengaytiradi — ba'zi yuqori yuklamali tizimlar FK'ni ilova darajasiga ko'chiradi (ongli murosa). Import paytida `SET FOREIGN_KEY_CHECKS=0` — ehtiyotkorlik bilan.",
        "",
        "```sql",
        "ALTER TABLE order_items",
        "  ADD CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Jadvallarda PK'siz, tipi mos kelmaydigan FK'li yoki dublikat unique indeksli joylarni topib tuzating.",
      acceptanceCriteria: [
        "InnoDB'da PK yo'qligining oqibatini biladi",
        "FK'ning performance narxini tushuntira oladi"
      ],
      prerequisites: [
        "9.12"
      ]
    },
    {
      id: "10.5",
      title: "B-tree Indexes",
      description: [
        "InnoDB indekslari B+tree: barcha qiymatlar barg sahifalarida tartiblangan va bir-biriga bog'langan — shuning uchun teng (`=`), diapazon (`>`, `BETWEEN`), prefiks (`LIKE 'abc%'`) va `ORDER BY` uchun samarali. Daraxt balandligi odatda 3–4 — million qatorda ham bir necha sahifa o'qish.",
        "",
        "Secondary indeks bargida indekslangan ustun + PK saqlanadi; to'liq qatorni olish uchun PK bo'yicha qo'shimcha qidiruv kerak. Kam selektivli ustunlarda (masalan, `is_active`) indeks ko'pincha foydasiz — optimizer full scan tanlaydi.",
        "",
        "```sql",
        "CREATE INDEX users_email ON users (email);",
        "EXPLAIN SELECT id FROM users WHERE email LIKE 'ali%';",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "B+tree tuzilmasini chizing va 3 xil so'rov (=, diapazon, `%x`) uchun indeks qanday ishlatilishini tushuntiring.",
      acceptanceCriteria: [
        "B+tree nega diapazon va tartiblashda samarali ekanini biladi",
        "Selektivlik tushunchasini qo'llaydi"
      ],
      prerequisites: [
        "10.2"
      ]
    },
    {
      id: "10.6",
      title: "Composite Indexes",
      description: [
        "Ko'p ustunli indeks `(a, b, c)` avval `a`, keyin `b`, keyin `c` bo'yicha tartiblangan. Leftmost prefix: `a`, `a+b`, `a+b+c` bo'yicha ishlaydi; `a` diapazon bilan ishlatilsa, keyingi ustunlar tartib uchun ishlamaydi.",
        "",
        "Ustun tartibi qoidasi: avval tenglik (`=`) shartlari, keyin diapazon yoki `ORDER BY` ustuni. Ko'p bitta ustunli indekslar o'rniga to'g'ri composite indeks odatda ancha samarali (MySQL \"index merge\" kamdan-kam optimal).",
        "",
        "```sql",
        "-- So'rov: WHERE tenant_id = ? AND status = ? ORDER BY created_at DESC",
        "CREATE INDEX orders_tenant_status_created ON orders (tenant_id, status, created_at);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ko'p ishlatiladigan 3 ta so'rov uchun bitta yoki ikkita composite indeks loyihalang va ortiqcha indekslarni olib tashlang.",
      acceptanceCriteria: [
        "Tenglik → diapazon/tartib qoidasini qo'llaydi",
        "Index merge va composite indeks farqini biladi"
      ],
      prerequisites: [
        "10.5"
      ]
    },
    {
      id: "10.7",
      title: "Covering Indexes",
      description: [
        "Covering indeks — so'rovga kerak bo'lgan barcha ustunlar indeksning o'zida bor, jadvalga (clustered indeksga) murojaat kerak emas. `EXPLAIN` da `Using index` ko'rinadi. Secondary indeks PK'ni ham o'z ichiga olgani uchun PK ustuni \"bepul\" qo'shilgan.",
        "",
        "Ayniqsa hisobot, `COUNT` va pagination so'rovlarida katta tezlik beradi. Narxi — kattaroq indeks va sekinroq yozish. \"Deferred join\" usuli: avval covering indeks bilan faqat id'larni olish, keyin ular bo'yicha to'liq qatorlarni.",
        "",
        "```sql",
        "CREATE INDEX orders_cust_status_total ON orders (customer_id, status, total);",
        "EXPLAIN SELECT status, SUM(total) FROM orders WHERE customer_id = 42 GROUP BY status;",
        "-- Extra: Using index",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Deferred join usuli bilan chuqur offset pagination'ni tezlashtiring va natijani o'lchang.",
      acceptanceCriteria: [
        "`Using index` belgisini taniydi",
        "Covering indeksning yozishga narxini baholaydi"
      ],
      prerequisites: [
        "10.6"
      ]
    },
    {
      id: "10.8",
      title: "`EXPLAIN` va `EXPLAIN ANALYZE` mavjud versiyalarda",
      description: [
        "`EXPLAIN` ustunlari: `type` (yaxshidan yomonga: `const`, `eq_ref`, `ref`, `range`, `index`, `ALL`), `key` (tanlangan indeks), `rows` (taxminiy qatorlar), `filtered`, `Extra` (`Using index`, `Using where`, `Using filesort`, `Using temporary`). `EXPLAIN FORMAT=TREE` — o'qish oson daraxt.",
        "",
        "`EXPLAIN ANALYZE` (MySQL 8.0.18+) so'rovni haqiqatan bajaradi va har bosqichning haqiqiy vaqti va qatorlar sonini ko'rsatadi — taxmin va reallik farqini topish uchun. `UPDATE/DELETE` uchun ehtiyot bo'ling.",
        "",
        "```sql",
        "EXPLAIN FORMAT=TREE",
        "SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 10;",
        "EXPLAIN ANALYZE SELECT ...;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "5 ta so'rovning EXPLAIN chiqishini tahlil qilib, har biri uchun `type` va `Extra` ning ma'nosini yozing.",
      acceptanceCriteria: [
        "`type` qiymatlarini yaxshidan yomonga tartiblay oladi",
        "`Using filesort` va `Using temporary` ni bartaraf etish yo'llarini biladi"
      ],
      prerequisites: [
        "9.19"
      ]
    },
    {
      id: "10.9",
      title: "Query Optimization",
      description: [
        "MySQL'ga xos optimallashtirish: to'g'ri composite/covering indekslar, `ORDER BY ... LIMIT` uchun indeks, `OR` o'rniga `UNION ALL` yoki `IN`, implicit tip konversiyasidan qochish (`varchar` ustunni son bilan taqqoslash indeksni o'chiradi), `COUNT(*)` ni katta jadvallarda keshlash, `LIMIT` bilan deferred join.",
        "",
        "Optimizer'ga yordam: `ANALYZE TABLE` (statistika yangilash), histogrammalar (8.0), kerak bo'lsa `FORCE INDEX` (oxirgi chora). Laravel'da Telescope va `DB::listen` orqali sekin so'rovlarni topish.",
        "",
        "```sql",
        "-- Yomon: phone VARCHAR, son bilan taqqoslash → indeks ishlamaydi",
        "SELECT * FROM users WHERE phone = 998901234567;",
        "-- Yaxshi",
        "SELECT * FROM users WHERE phone = '998901234567';",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Implicit konversiya tufayli indeks ishlatmayotgan so'rovni toping va tuzating.",
      acceptanceCriteria: [
        "Implicit tip konversiyasi muammosini biladi",
        "`ANALYZE TABLE` va histogramma rolini tushuntira oladi"
      ],
      prerequisites: [
        "10.8"
      ]
    },
    {
      id: "10.10",
      title: "Transactions va Isolation Levels",
      description: [
        "InnoDB default izolyatsiyasi — `REPEATABLE READ`: tranzaksiya ichidagi oddiy `SELECT` lar bir xil snapshot'ni ko'radi; locking o'qishlar (`FOR UPDATE`, `UPDATE`) esa eng so'nggi commit qilingan ma'lumot bilan ishlaydi va next-key lock'lar orqali phantom'larni oldini oladi.",
        "",
        "Ko'p yuqori yuklamali tizimlar `READ COMMITTED` ga o'tadi — kamroq gap lock, kamroq deadlock. `autocommit=1` default; Laravel `DB::transaction` `START TRANSACTION`/`COMMIT` ni boshqaradi. DDL implicit commit qiladi.",
        "",
        "```sql",
        "SELECT @@transaction_isolation;",
        "SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "`REPEATABLE READ` va `READ COMMITTED` da bir xil parallel stsenariyni bajarib, lock va natija farqini hujjatlashtiring.",
      acceptanceCriteria: [
        "REPEATABLE READ'da snapshot va locking read farqini biladi",
        "Izolyatsiyani o'zgartirish oqibatlarini baholaydi"
      ],
      prerequisites: [
        "9.17"
      ]
    },
    {
      id: "10.11",
      title: "Row-level Locking",
      description: [
        "InnoDB lock turlari: record lock (indeks yozuvi), gap lock (yozuvlar orasidagi bo'shliq — phantom'larga qarshi), next-key lock (record + gap), insert intention lock. Shared (S) va exclusive (X) rejimlar, jadval darajasida intention lock'lar (IS/IX).",
        "",
        "Muhim: lock'lar **indeks yozuvlariga** qo'yiladi — `WHERE` sharti indeksdan foydalanmasa, InnoDB ko'p (hatto barcha) qatorlarni lock qiladi. `performance_schema.data_locks` va `sys.innodb_lock_waits` lock kutishlarini ko'rsatadi.",
        "",
        "```sql",
        "SELECT * FROM performance_schema.data_locks\\G",
        "SELECT * FROM sys.innodb_lock_waits\\G",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Indekssiz `UPDATE ... WHERE` jadvalni qanday bloklashini ko'rsating va indeks qo'shib tuzating.",
      acceptanceCriteria: [
        "Gap va next-key lock'larni tushuntira oladi",
        "Lock kutishlarini `performance_schema` orqali tahlil qiladi"
      ],
      prerequisites: [
        "9.18",
        "10.10"
      ]
    },
    {
      id: "10.12",
      title: "Deadlocks",
      description: [
        "InnoDB deadlock'ni darhol aniqlaydi (wait-for graph) va \"arzonroq\" tranzaksiyani rollback qiladi (xato 1213). `SHOW ENGINE INNODB STATUS` ning `LATEST DETECTED DEADLOCK` bo'limi oxirgi deadlock'ni ko'rsatadi; `innodb_print_all_deadlocks=ON` hammasini log'ga yozadi.",
        "",
        "Kamaytirish: bir xil tartibda lock olish, qisqa tranzaksiyalar, to'g'ri indekslar (kamroq qator lock'lanadi), `READ COMMITTED` (gap lock kamroq), katta batch'larni bo'lish. Deadlock'ni butunlay yo'qotib bo'lmaydi — ilova qayta urinishga tayyor bo'lishi kerak (`DB::transaction(..., attempts: 3)`).",
        "",
        "```sql",
        "SET GLOBAL innodb_print_all_deadlocks = ON;",
        "SHOW ENGINE INNODB STATUS\\G",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Deadlock log'ini tahlil qilib, ikki tranzaksiyaning lock tartibini aniqlang va kodni tuzating.",
      acceptanceCriteria: [
        "Deadlock log'ini o'qiy oladi",
        "Qayta urinish strategiyasini joriy qiladi"
      ],
      prerequisites: [
        "10.11"
      ]
    },
    {
      id: "10.13",
      title: "MVCC",
      description: [
        "Multi-Version Concurrency Control — o'quvchilar yozuvchilarni bloklamaydi. InnoDB har bir qatorda yashirin `DB_TRX_ID` va `DB_ROLL_PTR` saqlaydi; eski versiyalar undo log'da. Tranzaksiya \"read view\" orqali o'ziga ko'rinadigan versiyani tanlaydi.",
        "",
        "Oqibatlar: uzoq ochiq tranzaksiya undo log'ni o'stiradi (purge to'xtaydi — \"history list length\" ko'tariladi) va butun tizimni sekinlashtiradi. Shu sabab uzoq tranzaksiyalar va \"unutilgan\" ochiq ulanishlar xavfli.",
        "",
        "```sql",
        "SHOW ENGINE INNODB STATUS\\G   -- History list length",
        "SELECT * FROM information_schema.innodb_trx ORDER BY trx_started LIMIT 5;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Uzoq ochiq tranzaksiya history list length'ga ta'sirini kuzating va monitoring alert'ini sozlang.",
      acceptanceCriteria: [
        "MVCC qanday qilib o'qish va yozishni ajratishini tushuntira oladi",
        "Uzoq tranzaksiyalarning MVCC'ga ta'sirini biladi"
      ],
      prerequisites: [
        "10.10"
      ]
    },
    {
      id: "10.14",
      title: "JSON Columns",
      description: [
        "MySQL `JSON` tipi binar formatda saqlanadi va validatsiya qilinadi. Funksiyalar: `JSON_EXTRACT` (`->`, `->>`), `JSON_SET`, `JSON_CONTAINS`, `JSON_TABLE`. JSON ichidagi qiymatni indekslash — generated column + indeks yoki multi-valued index (8.0.17+).",
        "",
        "Laravel: `$casts = ['settings' => 'array']`/`AsArrayObject`, `where('settings->theme', 'dark')`, `whereJsonContains`. Qoida: tez-tez filtrlanadigan, relyatsion ma'lumotni JSON'ga qo'ymang — ustun va jadval sifatida modellashtiring. JSON — moslashuvchan atributlar va tashqi payload'lar uchun.",
        "",
        "```sql",
        "ALTER TABLE users ADD theme VARCHAR(20)",
        "  GENERATED ALWAYS AS (settings->>'$.theme') STORED, ADD INDEX (theme);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "JSON ichidagi maydon bo'yicha sekin filtrni generated column + indeks bilan tezlashtiring.",
      acceptanceCriteria: [
        "JSON va relyatsion ustun o'rtasida asosli tanlov qiladi",
        "JSON qiymatni indekslash usullarini biladi"
      ],
      prerequisites: [
        "10.3"
      ]
    },
    {
      id: "10.15",
      title: "Full-Text Indexes",
      description: [
        "InnoDB `FULLTEXT` indeks so'zlar bo'yicha qidiruvni beradi: `MATCH(title, body) AGAINST('so\\'z' IN NATURAL LANGUAGE MODE)` yoki `BOOLEAN MODE` (`+laravel -php`). Sozlamalar: minimal so'z uzunligi (`innodb_ft_min_token_size`), stopword'lar, CJK uchun `ngram` parser.",
        "",
        "Cheklovlar: morfologiya va o'zbek tili qo'llab-quvvatlanmaydi, relevance sodda, katta yuklamada sekin. Jiddiy qidiruv uchun Meilisearch, Typesense, Elasticsearch/OpenSearch — Laravel Scout orqali. `LIKE '%x%'` — indekssiz full scan, katta jadvalda yaroqsiz.",
        "",
        "```php",
        "Post::whereFullText(['title', 'body'], 'laravel queue')->get();",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Mahsulot qidiruvini `LIKE` dan FULLTEXT'ga, so'ng Scout + Meilisearch'ga o'tkazib, natija va tezlikni solishtiring.",
      acceptanceCriteria: [
        "FULLTEXT rejimlari va cheklovlarini biladi",
        "Tashqi qidiruv tizimiga o'tish mezonini ayta oladi"
      ],
      prerequisites: [
        "10.5"
      ]
    },
    {
      id: "10.16",
      title: "Replication asoslari",
      description: [
        "MySQL replikatsiyasi: primary binary log'ga yozadi, replica'lar uni o'qib qayta bajaradi. Formatlar: `ROW` (tavsiya etiladi), `STATEMENT`, `MIXED`. Default asinxron — replica orqada qolishi mumkin (replication lag); semi-sync kamida bitta replica tasdig'ini kutadi. GTID failover'ni soddalashtiradi; Group Replication/InnoDB Cluster — avtomatik failover.",
        "",
        "Laravel'da read/write ajratish: `read`/`write` host'lar va `sticky => true` (yozgandan keyin shu so'rovda primary'dan o'qish) — lag tufayli \"yozdim, lekin ko'rinmayapti\" muammosiga qarshi.",
        "",
        "```php",
        "'mysql' => [",
        "    'read'  => ['host' => ['10.0.0.11', '10.0.0.12']],",
        "    'write' => ['host' => ['10.0.0.10']],",
        "    'sticky' => true,",
        "],",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Docker'da primary + replica sozlang, Laravel read/write ajratishini ulang va lag'ni kuzating.",
      acceptanceCriteria: [
        "Asinxron replikatsiya va lag oqibatlarini tushuntira oladi",
        "`sticky` opsiyasining maqsadini biladi"
      ],
      prerequisites: [
        "10.1"
      ]
    },
    {
      id: "10.17",
      title: "Slow Query Log",
      description: [
        "Slow query log `long_query_time` dan uzoq bajarilgan so'rovlarni yozadi; `log_queries_not_using_indexes` indekssiz so'rovlarni ham. Tahlil: `mysqldumpslow` yoki Percona `pt-query-digest` — so'rovlarni normallashtirib, umumiy vaqt bo'yicha guruhlaydi.",
        "",
        "Muhim: eng uzun bitta so'rov emas, **umumiy vaqt** (chastota × davomiylik) eng ko'p bo'lgan so'rovlarni birinchi optimallashtiring. `performance_schema.events_statements_summary_by_digest` ham shu ma'lumotni beradi.",
        "",
        "```sql",
        "SET GLOBAL slow_query_log = 1;",
        "SET GLOBAL long_query_time = 0.5;",
        "```",
        "```bash",
        "pt-query-digest /var/log/mysql/slow.log | head -60",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Slow log'ni bir kun yoqib, `pt-query-digest` bilan top-5 so'rovni aniqlang va optimallashtirish rejasini tuzing.",
      acceptanceCriteria: [
        "Slow log'ni xavfsiz sozlay oladi",
        "Umumiy vaqt bo'yicha prioritetlashni tushunadi"
      ],
      prerequisites: [
        "10.8"
      ]
    },
    {
      id: "10.18",
      title: "Connection Management",
      description: [
        "Har bir MySQL ulanishi thread va xotira sarflaydi; `max_connections` oshib ketsa — \"Too many connections\". PHP-FPM'da har bir worker o'z ulanishini ochadi: `max_children × serverlar soni` ≤ `max_connections` bo'lishi kerak; queue worker'lar va cron'larni ham hisoblang.",
        "",
        "Persistent ulanishlar (`PDO::ATTR_PERSISTENT`) ehtiyotkorlik talab qiladi. Katta tizimlarda ProxySQL — connection pooling, read/write routing. `wait_timeout` va long-running worker'larda \"MySQL server has gone away\" — Laravel avtomatik qayta ulanadi, lekin tranzaksiya ichida emas.",
        "",
        "```sql",
        "SHOW STATUS LIKE 'Threads_connected';",
        "SHOW VARIABLES LIKE 'max_connections';",
        "SHOW PROCESSLIST;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM, queue va cron jarayonlari uchun maksimal ulanishlar sonini hisoblab, `max_connections` ni asoslang.",
      acceptanceCriteria: [
        "Ulanishlar sonini infratuzilma bo'yicha hisoblay oladi",
        "\"Server has gone away\" sabablarini biladi"
      ],
      prerequisites: [
        "42.4"
      ]
    },
    {
      id: "10.19",
      title: "Backup va Restore",
      description: [
        "Backup turlari: **logical** (`mysqldump`, `mysqlpump`, MyDumper — SQL fayl, sekin restore, kichik/o'rta DB uchun) va **physical** (Percona XtraBackup, snapshot — tez, katta DB uchun). InnoDB uchun `mysqldump --single-transaction` lock'siz izchil nusxa beradi.",
        "",
        "Point-in-time recovery: to'liq backup + binary log'larni kerakli vaqtgacha qayta ijro etish. Eng muhim qoida: **restore qilinmagan backup — backup emas**. Muntazam restore testi, shifrlash, boshqa joyda (off-site) saqlash, RPO/RTO ga mos jadval.",
        "",
        "```bash",
        "mysqldump --single-transaction --routines --triggers --set-gtid-purged=OFF app > app.sql",
        "mysql app_restore < app.sql",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Kunlik backup + binlog bilan PITR stsenariysini sinab ko'ring: ma'lumotni \"o'chirib\", 1 daqiqa oldingi holatga qaytaring.",
      acceptanceCriteria: [
        "Logical va physical backup farqini biladi",
        "Restore testini jarayonga kiritadi"
      ],
      prerequisites: [
        "68.14"
      ]
    },
    {
      id: "10.20",
      title: "Charset va Collation",
      description: [
        "**Charset** — belgilar qanday kodlanadi; **collation** — qanday taqqoslanadi va tartiblanadi. Har doim `utf8mb4` (MySQL'dagi `utf8` = `utf8mb3`, emoji va ba'zi belgilarni saqlay olmaydi). MySQL 8 default: `utf8mb4_0900_ai_ci` (accent- va case-insensitive).",
        "",
        "Oqibatlar: `_ci` collation'da `'Ali' = 'ali'` — unique indeksga ta'sir qiladi; turli collation'li ustunlarni JOIN qilish indeksni o'chirishi yoki xato berishi mumkin. Parol hash'lari va tokenlar uchun binar collation (`_bin`).",
        "",
        "```sql",
        "ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;",
        "SELECT 'Ali' = 'ali' COLLATE utf8mb4_0900_ai_ci;  -- 1",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Eski `utf8`/`latin1` jadvallarini `utf8mb4` ga xavfsiz ko'chirish rejasini tuzing va sinab ko'ring.",
      acceptanceCriteria: [
        "`utf8` va `utf8mb4` farqini biladi",
        "Collation'ning unique va JOIN'ga ta'sirini tushuntira oladi"
      ],
      prerequisites: [
        "10.3"
      ]
    },
    {
      id: "10.21",
      title: "MySQL Performance Tuning",
      description: [
        "Tuning tartibi: avval so'rovlar va indekslar (eng katta foyda), keyin konfiguratsiya, keyin apparat. Asosiy parametrlar: `innodb_buffer_pool_size`, `innodb_redo_log_capacity`, `innodb_flush_log_at_trx_commit` (1 vs 2 — durability/tezlik murosasi), `innodb_io_capacity` (SSD uchun), `max_connections`, `table_open_cache`, `tmp_table_size`/`max_heap_table_size`.",
        "",
        "Kuzatish: buffer pool hit ratio, `Threads_running`, lock kutishlar, disk I/O, replication lag. Vositalar: Percona Monitoring and Management (PMM), `sys` schema, MySQLTuner (tavsiyalarni tanqidiy baholang). Har bir o'zgarishni benchmark bilan tasdiqlang.",
        "",
        "```sql",
        "SELECT * FROM sys.schema_unused_indexes;",
        "SELECT * FROM sys.statements_with_full_table_scans LIMIT 10;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "`sys` schema yordamida ishlatilmagan indekslar va full scan'li so'rovlarni toping, natijaga ko'ra tuning rejasi tuzing.",
      acceptanceCriteria: [
        "Tuning'ni so'rovlardan boshlaydi",
        "Asosiy InnoDB parametrlarining ta'sirini biladi"
      ],
      prerequisites: [
        "10.17",
        "10.2"
      ]
    }
  ]
});
