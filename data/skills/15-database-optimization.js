/* 15 · Database Optimization
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 15,
  slug: "database-optimization",
  title: "Database Optimization",
  group: "database",
  description: "Ma'lumotlar bazasini optimallashtirish — tizim darajasidagi yondashuv: alohida so'rovlarni emas, butun DB yuklamasini tahlil qilish, tor joylarni topish va ularni o'lchov asosida bartaraf etish. Ko'p Laravel ilovalarida performance muammolarining asosiy manbai aynan DB bo'ladi, shuning uchun bu ko'nikma Senior uchun markaziy hisoblanadi.",
  subskills: [
    {
      id: "15.1",
      title: "Query Profiling",
      description: [
        "Profiling — har bir so'rov qancha vaqt va resurs olishini o'lchash. Ilova darajasida: Laravel Telescope (so'rovlar, vaqt, joy), Debugbar/Clockwork (sahifa bo'yicha so'rovlar soni), `DB::listen` (sekin so'rovlarni log'ga), APM (New Relic, Datadog, Sentry Performance). DB darajasida: `pg_stat_statements`, MySQL `performance_schema`, slow log.",
        "",
        "Muhim: so'rovni manbasi bilan bog'lash (qaysi endpoint/job), har so'rovning chastotasini hisobga olish va production'ga yaqin ma'lumot hajmida profiling qilish.",
        "",
        "```php",
        "DB::listen(function (QueryExecuted $q) {",
        "    if ($q->time > 200) {",
        "        Log::warning('Slow query', ['sql' => $q->sql, 'ms' => $q->time, 'url' => request()->fullUrl()]);",
        "    }",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "200 ms dan sekin so'rovlarni endpoint bilan birga log'ga yozuvchi listener qo'shing va bir hafta kuzating.",
      acceptanceCriteria: [
        "Ilova va DB darajasidagi profiling vositalarini biladi",
        "So'rovni manbasi bilan bog'laydi"
      ],
      prerequisites: [
        "9.21"
      ]
    },
    {
      id: "15.2",
      title: "Slow Query Analysis",
      description: [
        "Sekin so'rovlar tahlili: slow log yoki `pg_stat_statements` dan so'rovlarni normallashtirilgan shaklda (parametrlarsiz) guruhlash, **umumiy vaqt** (chastota × o'rtacha vaqt) bo'yicha saralash, top so'rovlar uchun `EXPLAIN ANALYZE`, sabab gipotezasi (indeks yo'q, noto'g'ri reja, lock kutish, katta natija) va tuzatish.",
        "",
        "Bitta 5 soniyalik kunlik hisobot emas, 1 soniyada 200 marta chaqiriladigan 30 ms li so'rov ko'pincha muhimroq. Tuzatishdan keyin natijani qayta o'lchang.",
        "",
        "```bash",
        "pt-query-digest --limit 10 /var/log/mysql/slow.log",
        "```",
        "```sql",
        "SELECT query, calls, round(total_exec_time) AS total_ms, round(mean_exec_time, 1) AS avg_ms",
        "FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Top-10 so'rovni umumiy vaqt bo'yicha aniqlab, birinchi uchtasi uchun sabab va yechimni yozing.",
      acceptanceCriteria: [
        "Umumiy vaqt bo'yicha prioritetlaydi",
        "Sekinlik sabablarini tizimli tasniflaydi"
      ],
      prerequisites: [
        "10.17",
        "11.18"
      ]
    },
    {
      id: "15.3",
      title: "Execution Plans",
      description: [
        "Execution plan — optimizatsiyaning asosiy diagnostika vositasi. Tahlil qilinadigan narsalar: qaysi indeks tanlandi (yoki nega tanlanmadi), skanerlash turi, JOIN tartibi va algoritmi, taxminiy va haqiqiy qatorlar, saralash va vaqtinchalik jadvallar, eng ko'p vaqt olgan tugun.",
        "",
        "Reja ma'lumot hajmi va statistikaga bog'liq — dev'dagi reja production'dagidan farq qilishi mumkin. Shu sabab rejani production'ga o'xshash ma'lumotda (anonimlashtirilgan nusxa) tekshiring va o'zgarishdan keyin rejani qayta ko'ring.",
        "",
        "```sql",
        "EXPLAIN (ANALYZE, BUFFERS) SELECT ...;   -- PostgreSQL",
        "EXPLAIN ANALYZE SELECT ...;              -- MySQL 8",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bir so'rovning dev va production-o'xshash ma'lumotdagi rejalarini solishtirib, farq sababini tushuntiring.",
      acceptanceCriteria: [
        "Reja ma'lumot hajmiga bog'liqligini tushunadi",
        "Rejadan eng qimmat bosqichni topadi"
      ],
      prerequisites: [
        "10.8",
        "11.8"
      ]
    },
    {
      id: "15.4",
      title: "Index Strategy",
      description: [
        "Indeks strategiyasi — real so'rov naqshlaridan kelib chiqish: eng ko'p va eng sekin so'rovlarning `WHERE`, `JOIN`, `ORDER BY` ustunlari. Bir nechta so'rovga xizmat qiladigan composite indekslar, kerakli joyda covering indeks, ortiqcha (dublikat, prefiksi bor) va ishlatilmagan indekslarni o'chirish.",
        "",
        "Har indeks: yozishni sekinlashtiradi, xotira va diskni egallaydi, optimizer tanlovini murakkablashtiradi. Indekslar migratsiyada, sabab izohi bilan qo'shiladi; vaqti-vaqti bilan ishlatilish statistikasi tekshiriladi.",
        "",
        "```sql",
        "-- PostgreSQL: ishlatilmagan indekslar",
        "SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid))",
        "FROM pg_stat_user_indexes WHERE idx_scan = 0 ORDER BY pg_relation_size(indexrelid) DESC;",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Asosiy jadval uchun indeks auditi o'tkazing: ishlatilmagan va dublikat indekslarni o'chiring, yetishmaydiganlarni qo'shing.",
      acceptanceCriteria: [
        "Indekslarni so'rov naqshlaridan kelib chiqib loyihalaydi",
        "Indeksning yozishga narxini hisobga oladi"
      ],
      prerequisites: [
        "database-indexing"
      ]
    },
    {
      id: "15.5",
      title: "Composite Index Order",
      description: [
        "Composite indeksda ustunlar tartibi hal qiluvchi. Qoidalar: (1) tenglik shartidagi ustunlar birinchi, (2) keyin diapazon yoki `ORDER BY` ustuni, (3) diapazondan keyingi ustunlar faqat filtr/covering uchun ishlaydi. Tenglik ustunlari orasida — eng ko'p so'rovlarda ishlatiladigan va (ba'zan) selektivroq birinchi.",
        "",
        "Multi-tenant tizimlarda deyarli har indeks `tenant_id` bilan boshlanadi. Bitta yaxshi composite indeks bir nechta bir ustunli indeksdan samaraliroq.",
        "",
        "```sql",
        "-- WHERE tenant_id = ? AND status = ? AND created_at > ? ORDER BY created_at",
        "CREATE INDEX ON orders (tenant_id, status, created_at);   -- ✅",
        "CREATE INDEX ON orders (created_at, tenant_id, status);   -- ❌ diapazon birinchi",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bir xil so'rov uchun ikki xil tartibli composite indeksni EXPLAIN va vaqt bo'yicha solishtiring.",
      acceptanceCriteria: [
        "Tenglik → diapazon qoidasini qo'llaydi",
        "Leftmost prefix'ni indeks dizaynida hisobga oladi"
      ],
      prerequisites: [
        "10.6"
      ]
    },
    {
      id: "15.6",
      title: "Index Selectivity",
      description: [
        "Selektivlik — unikal qiymatlar soni / jami qatorlar. Yuqori selektivlik (email, id) — indeks juda samarali; past (boolean, kam turli status) — indeks ko'p qatorni qaytaradi va optimizer full scan'ni afzal ko'radi.",
        "",
        "Past selektivli ustun foydali bo'ladigan holatlar: composite indeksning bir qismi sifatida, notekis taqsimot (99% `done`, 1% `pending` — `pending` uchun partial indeks juda samarali), covering indeks. Statistika (histogrammalar) optimizer'ga notekislikni bildiradi.",
        "",
        "```sql",
        "SELECT COUNT(DISTINCT status)::float / COUNT(*) AS selectivity FROM orders;",
        "SELECT status, COUNT(*) FROM orders GROUP BY status;  -- taqsimot",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Jadval ustunlari selektivligini hisoblab, qaysi biri uchun oddiy, composite yoki partial indeks mosligini asoslang.",
      acceptanceCriteria: [
        "Selektivlikni hisoblay oladi",
        "Notekis taqsimot uchun partial indeks qo'llaydi"
      ],
      prerequisites: [
        "15.4"
      ]
    },
    {
      id: "15.7",
      title: "Avoiding Full Table Scans",
      description: [
        "Katta jadvalda full scan — sekin va I/O'ni band qiladi. Sabablari: indeks yo'q; so'rov sargable emas (`WHERE DATE(created_at) = ...`, `LOWER(email) = ...` expression indekssiz, `LIKE '%x'`); implicit tip konversiyasi; `OR` turli ustunlarda; past selektivlik; eskirgan statistika.",
        "",
        "Kichik jadvallarda (ma'lumotnomalar) full scan normal va ko'pincha indeksdan tez. Maqsad — barcha scan'larni emas, katta jadvallardagi tez-tez bajariladigan scan'larni yo'qotish.",
        "",
        "```sql",
        "-- ❌ indeks ishlamaydi",
        "SELECT * FROM orders WHERE DATE(created_at) = '2025-06-01';",
        "-- ✅ sargable",
        "SELECT * FROM orders WHERE created_at >= '2025-06-01' AND created_at < '2025-06-02';",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Full scan qilayotgan 3 ta so'rovni topib, sargable shaklga keltiring yoki indeks qo'shing.",
      acceptanceCriteria: [
        "Sargable bo'lmagan shartlarni taniydi",
        "Kichik jadvalda full scan normal ekanini tushunadi"
      ],
      prerequisites: [
        "16.6"
      ]
    },
    {
      id: "15.8",
      title: "N+1 Query Detection",
      description: [
        "N+1 ni avtomatik aniqlash: dev'da `Model::preventLazyLoading()` (exception), `Model::handleLazyLoadingViolationUsing()` (production'da log'ga yozish), Debugbar/Telescope'da takrorlanuvchi so'rovlar, testlarda so'rovlar sonini cheklash, APM'da bir so'rovning takrorlanish soni.",
        "",
        "N+1 ba'zan yashirin: API Resource ichidagi relation, accessor, policy (`$post->author->...`), Blade komponenti, notification `toMail()`. Tuzatish — eager loading, `whenLoaded`, `withCount`, ma'lumotni oldindan tayyorlash.",
        "",
        "```php",
        "Model::handleLazyLoadingViolationUsing(function (Model $model, string $relation) {",
        "    Log::warning('Lazy loading', ['model' => $model::class, 'relation' => $relation]);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Production'da lazy loading holatlarini log'ga yozishni yoqing va bir hafta ichida topilganlarini tuzating.",
      acceptanceCriteria: [
        "N+1 ni dev va production'da aniqlash usullarini biladi",
        "Yashirin N+1 manbalarini taniydi"
      ],
      prerequisites: [
        "13.12"
      ]
    },
    {
      id: "15.9",
      title: "Connection Pooling",
      description: [
        "Har DB ulanishi qimmat (handshake, autentifikatsiya, server resurslari). PHP-FPM'da har worker o'z ulanishiga ega — workerlar ko'paysa DB'ning ulanish limiti tugaydi. Pooler (PgBouncer, ProxySQL, RDS Proxy) ko'p mijoz ulanishlarini kam sonli server ulanishlariga multiplekslaydi.",
        "",
        "Hisoblash: `(FPM max_children × serverlar) + queue worker'lar + cron + boshqa servislar` ≤ DB limiti (zaxira bilan). Octane'da ulanishlar uzoq yashaydi — pool o'lchamini moslash kerak. Belgilari: \"too many connections\", ulanishni kutish vaqti o'sishi.",
        "",
        "```text",
        "FPM: 4 server × 50 children = 200",
        "Queue: 20 worker, Cron: 5",
        "Jami ≈ 225  →  PgBouncer default_pool_size = 40, max_client_conn = 500",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Infratuzilmangiz uchun ulanishlar byudjetini hisoblang va pooler konfiguratsiyasini taklif qiling.",
      acceptanceCriteria: [
        "Ulanishlar sonini tizim bo'yicha hisoblay oladi",
        "Pooler rejimlari cheklovlarini biladi"
      ],
      prerequisites: [
        "11.23",
        "10.18"
      ]
    },
    {
      id: "15.10",
      title: "Query Count Reduction",
      description: [
        "Har so'rov — tarmoq aylanishi (round-trip) + parse + bajarish. Bitta sahifada 100+ so'rov, hatto har biri tez bo'lsa ham, sezilarli kechikish beradi. Kamaytirish usullari: eager loading, `withCount`/`withSum`, `whereIn` bilan bitta so'rov, bulk insert/update, subquery select, `exists()`, ma'lumotnomalarni keshlash, `once()` yoki so'rov ichida memoizatsiya.",
        "",
        "Maqsadli ko'rsatkich: odatiy sahifa yoki API endpoint uchun so'rovlar soni barqaror (ro'yxat uzunligiga bog'liq emas) va kichik (masalan, < 15).",
        "",
        "```php",
        "// Har bir mahsulot uchun alohida so'rov o'rniga",
        "$stock = Stock::whereIn('product_id', $products->pluck('id'))->pluck('qty', 'product_id');",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Eng ko'p so'rov qiladigan 3 ta endpoint'da so'rovlar sonini kamida 50% kamaytiring.",
      acceptanceCriteria: [
        "So'rovlar soni va kechikish bog'liqligini tushunadi",
        "Kamida 5 ta kamaytirish usulini qo'llay oladi"
      ],
      prerequisites: [
        "15.8"
      ]
    },
    {
      id: "15.11",
      title: "Pagination Optimization",
      description: [
        "Katta jadvallarda pagination muammolari: chuqur `OFFSET` (o'tkazib yuborilgan qatorlar ham o'qiladi), har sahifada `COUNT(*)` (katta jadvalda sekundlar), noaniq tartib (dublikat/yo'qolgan qatorlar).",
        "",
        "Yechimlar: keyset/cursor pagination (`cursorPaginate`), deferred join (avval id'lar covering indeks bilan, keyin to'liq qatorlar), `simplePaginate` (umumiy sonsiz), taxminiy son (PostgreSQL `reltuples`, keshlangan son), unikal tartib kaliti (`ORDER BY created_at DESC, id DESC`), chuqur sahifalarni cheklash.",
        "",
        "```php",
        "// Deferred join",
        "$ids = Order::where('status', 'paid')->orderByDesc('id')->offset(100000)->limit(20)->pluck('id');",
        "$orders = Order::whereIn('id', $ids)->orderByDesc('id')->get();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Katta jadvaldagi admin ro'yxatini deferred join yoki cursor pagination bilan tezlashtiring va natijani o'lchang.",
      acceptanceCriteria: [
        "Pagination'ning uch muammosini biladi",
        "Holatga mos yechimni tanlaydi"
      ],
      prerequisites: [
        "9.23"
      ]
    },
    {
      id: "15.12",
      title: "Bulk Operations",
      description: [
        "Ommaviy operatsiyalar optimallashtirish nuqtai nazaridan: so'rovlar sonini keskin kamaytiradi, lekin uzun tranzaksiya va katta lock'lar xavfi bor. Qoidalar: 500–5000 qatorli bo'laklar, har bo'lak alohida tranzaksiyada, bo'laklar orasida qisqa pauza (replica lag va boshqa so'rovlar uchun), `chunkById` bilan barqaror iteratsiya, og'ir import uchun `LOAD DATA`/`COPY`.",
        "",
        "Katta `DELETE`/`UPDATE` (millionlab qator) — bitta so'rovda emas, bo'laklab (`DELETE ... LIMIT 5000` siklda) yoki partition'ni o'chirish orqali.",
        "",
        "```php",
        "do {",
        "    $deleted = DB::table('logs')->where('created_at', '<', now()->subDays(90))->limit(5000)->delete();",
        "    usleep(100_000);",
        "} while ($deleted > 0);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "10 mln qatorli jadvaldan eski yozuvlarni production'ni to'xtatmasdan bo'laklab o'chiruvchi buyruq yozing.",
      acceptanceCriteria: [
        "Bulk amallarda lock va replica lag xavfini boshqaradi",
        "Batch hajmini asoslab tanlaydi"
      ],
      prerequisites: [
        "9.24"
      ]
    },
    {
      id: "15.13",
      title: "Database Load Analysis",
      description: [
        "DB yuklamasini tushunish: CPU, I/O (o'qish/yozish IOPS), xotira (buffer pool/shared_buffers hit ratio), ulanishlar, faol so'rovlar (`Threads_running`, `pg_stat_activity`), lock kutishlar, tranzaksiyalar soni, replikatsiya kechikishi.",
        "",
        "Tahlil savollari: yuklama o'qishmi yoki yozish? Qaysi so'rovlar resursni ko'proq yeydi? Vaqt bo'yicha naqshlar (cron, kun o'rtasi)? Yuklama o'sishi foydalanuvchilar o'sishiga proporsionalmi? Javobga ko'ra: so'rov optimallashtirish, keshlash, replica'ga o'qishni ko'chirish, vertikal masshtablash yoki arxitektura o'zgarishi.",
        "",
        "```sql",
        "SELECT state, wait_event_type, COUNT(*) FROM pg_stat_activity GROUP BY 1, 2;",
        "SHOW GLOBAL STATUS LIKE 'Threads_running';",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bir haftalik DB metrikalarini tahlil qilib, yuklamaning asosiy manbalari va o'sish trendi bo'yicha hisobot tayyorlang.",
      acceptanceCriteria: [
        "DB yuklamasining asosiy ko'rsatkichlarini o'qiy oladi",
        "Yuklama turiga mos yechim strategiyasini tanlaydi"
      ],
      prerequisites: [
        "15.2"
      ]
    },
    {
      id: "15.14",
      title: "Lock Contention",
      description: [
        "Lock raqobati — ko'p tranzaksiya bir xil qatorlar/resurslar uchun navbatda turadi: \"issiq\" qatorlar (umumiy hisoblagich, mashhur mahsulot zaxirasi, bitta balans), uzun tranzaksiyalar, indekssiz `UPDATE`, katta batch'lar, DDL.",
        "",
        "Yechimlar: tranzaksiyani qisqartirish, hisoblagichni bo'laklarga ajratish (sharded counter) yoki Redis'da hisoblab vaqti-vaqti bilan DB'ga yozish, atomik `UPDATE ... SET x = x - 1 WHERE x > 0`, navbat orqali ketma-ketlashtirish, `SKIP LOCKED`, optimistic locking.",
        "",
        "```sql",
        "-- PostgreSQL: kim kimni bloklayapti",
        "SELECT pid, pg_blocking_pids(pid) AS blocked_by, wait_event, left(query, 80)",
        "FROM pg_stat_activity WHERE cardinality(pg_blocking_pids(pid)) > 0;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "\"Issiq\" hisoblagich (masalan, ko'rishlar soni) uchun lock raqobatini load test bilan ko'rsating va Redis + periodik flush bilan hal qiling.",
      acceptanceCriteria: [
        "Lock raqobati manbalarini aniqlaydi",
        "Issiq qator muammosiga kamida 3 yechimni biladi"
      ],
      prerequisites: [
        "9.18"
      ]
    },
    {
      id: "15.15",
      title: "Read/Write Separation",
      description: [
        "O'qish so'rovlarini replica'larga, yozishni primary'ga yo'naltirish — o'qish ko'p bo'lgan ilovalarda primary yukini kamaytiradi. Laravel: `read`/`write` konfiguratsiyasi, `sticky => true`, majburiy primary: `DB::connection()->useWriteConnectionWhenReading()` yoki `->useWritePdo()`.",
        "",
        "Asosiy muammo — replication lag: foydalanuvchi o'zgartirgan ma'lumotni darhol ko'rmaydi. Yechimlar: sticky ulanish, muhim o'qishlarni primary'dan, foydalanuvchi sessiyasida \"yaqinda yozgan\" belgisi, lag monitoring va lag katta bo'lsa replica'ni o'chirish.",
        "",
        "```php",
        "$order = Order::query()->useWritePdo()->findOrFail($id); // darhol yozilgandan keyin o'qish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Read/write ajratishni yoqing va \"yozib bo'lib darhol o'qish\" stsenariylarini aniqlab, ularni primary'ga yo'naltiring.",
      acceptanceCriteria: [
        "Replication lag oqibatlarini biladi",
        "Laravel'da sticky va majburiy write ulanishni ishlatadi"
      ],
      prerequisites: [
        "10.16"
      ]
    },
    {
      id: "15.16",
      title: "Replicas",
      description: [
        "Replica'lar uchun qo'llanishlar: o'qishni masshtablash, og'ir hisobot/analitika so'rovlarini ajratish (asosiy yuklamaga ta'sir qilmasligi uchun), backup'ni replica'dan olish, failover uchun zaxira, geografik yaqinlik.",
        "",
        "Boshqaruv: lag monitoring (alert chegarasi), replica'lar soni va o'lchami, uzun analitik so'rovlarning replikatsiyani sekinlashtirishi (PostgreSQL `hot_standby_feedback`/so'rov bekor qilinishi), failover'dan keyin eski primary'ni qayta ulash. Boshqariladigan servislarda read replica'lar oson qo'shiladi.",
        "",
        "```php",
        "// Hisobotlar uchun alohida ulanish",
        "'mysql_reports' => [...config('database.connections.mysql'), 'host' => env('DB_REPORTS_HOST')],",
        "",
        "DB::connection('mysql_reports')->table('orders')->...;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Og'ir hisobotlarni alohida replica ulanishiga ko'chiring va primary yuklamasining kamayishini o'lchang.",
      acceptanceCriteria: [
        "Replica'larning turli qo'llanishlarini biladi",
        "Analitik so'rovlarning replikatsiyaga ta'sirini tushunadi"
      ],
      prerequisites: [
        "15.15"
      ]
    },
    {
      id: "15.17",
      title: "Partitioning",
      description: [
        "DB optimallashtirish vositasi sifatida partitioning: juda katta jadvallarda (yuz millionlab qator) so'rovlarni partition pruning orqali tezlashtirish, eski ma'lumotni bir zumda o'chirish, indekslarni kichik saqlash, VACUUM/maintenance'ni yengillashtirish.",
        "",
        "Qachon kerak: vaqt bo'yicha o'sadigan log/event jadvallari, aniq partition kaliti bo'yicha filtrlanadigan so'rovlar. Qachon kerak emas: partition kalitisiz so'rovlar ko'p bo'lsa (barcha bo'laklar skanerlanadi), jadval o'rtacha hajmda (indeks yetarli). Partitioning va sharding farqi: birinchisi bitta server ichida.",
        "",
        "```sql",
        "-- MySQL",
        "ALTER TABLE events PARTITION BY RANGE (TO_DAYS(created_at)) (",
        "  PARTITION p2025_05 VALUES LESS THAN (TO_DAYS('2025-06-01')),",
        "  PARTITION p2025_06 VALUES LESS THAN (TO_DAYS('2025-07-01'))",
        ");",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Katta log jadvali uchun partitioning'ning foyda va narxini baholab, qaror hujjatini (ADR) yozing.",
      acceptanceCriteria: [
        "Partitioning qachon foydali ekanini aniq mezon bilan ayta oladi",
        "Partitioning va sharding farqini biladi"
      ],
      prerequisites: [
        "11.16"
      ]
    },
    {
      id: "15.18",
      title: "Benchmarking",
      description: [
        "Benchmark — o'zgarish ta'sirini raqam bilan isbotlash. Qoidalar: production'ga o'xshash ma'lumot hajmi va taqsimoti, isitilgan cache (yoki aniq \"sovuq\" o'lchov), bir necha marta o'lchash va o'rtacha/percentil, bitta o'zgaruvchini o'zgartirish, natijalarni saqlash.",
        "",
        "Vositalar: `pgbench`, `sysbench`, `mysqlslap`, ilova darajasida k6/JMeter/wrk (end-to-end), PHP'da `hrtime()` va PHPBench, Laravel `Benchmark::measure()`.",
        "",
        "```php",
        "use Illuminate\\Support\\Benchmark;",
        "",
        "Benchmark::dd([",
        "    'eloquent' => fn () => Order::where('status', 'paid')->get(),",
        "    'builder'  => fn () => DB::table('orders')->where('status', 'paid')->get(),",
        "], iterations: 20);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Indeks qo'shishdan oldin va keyin endpoint'ni k6 bilan benchmark qiling (p50, p95) va natijani hujjatlashtiring.",
      acceptanceCriteria: [
        "Ishonchli benchmark shartlarini biladi",
        "Natijani percentillar bilan taqdim etadi"
      ],
      prerequisites: [
        "53.17"
      ]
    },
    {
      id: "15.19",
      title: "Monitoring Database Metrics",
      description: [
        "Doimiy kuzatiladigan DB metrikalari: so'rovlar soni va kechikish (p95/p99), sekin so'rovlar soni, ulanishlar (faol/maksimal), cache hit ratio, lock kutishlar va deadlock'lar, replikatsiya lag, disk hajmi va o'sish sur'ati, CPU/I/O, bloat (PostgreSQL), tranzaksiya uzunligi.",
        "",
        "Vositalar: Prometheus exporter'lar (`mysqld_exporter`, `postgres_exporter`) + Grafana, PMM, Datadog, bulut monitoringi (CloudWatch RDS). Alert'lar simptomga asoslangan bo'lsin (kechikish, xatolar, lag, disk to'lishi), har bir alert uchun runbook.",
        "",
        "```yaml",
        "# Prometheus alert misoli",
        "- alert: PostgresReplicationLagHigh",
        "  expr: pg_replication_lag_seconds > 30",
        "  for: 5m",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "DB uchun Grafana dashboard va 5 ta asosiy alert (lag, ulanishlar, disk, sekin so'rovlar, deadlock) sozlang.",
      acceptanceCriteria: [
        "Kuzatilishi kerak bo'lgan asosiy metrikalarni biladi",
        "Alert'larni runbook bilan bog'laydi"
      ],
      prerequisites: [
        "logging-and-monitoring"
      ]
    },
    {
      id: "15.20",
      title: "Zero-Downtime Migrations va Read/Write Splitting",
      description: [
        "Millionlab yozuvlarga ega production jadvallarida oddiy `ALTER TABLE` butun jadvalni qulflab (table lock), so'rovlar tiqilishi va downtime'ga sabab bo'ladi.",
        "",
        "**Zero-Downtime Migratsiya strategiyalari**:",
        "- **MySQL Online DDL**: `ALGORITHM=INPLACE, LOCK=NONE` orqali jadvalni qulflamasdan yangi indeks va null bo'ladigan ustunlar qo'shish.",
        "- **Expand and Contract Pattern**: Ustun nomini to'g'ridan-to'g'ri o'zgartirmasdan, yangi ustun qo'shish → ikkalasiga parallel yozish → eski ma'lumotlarni migratsiya qilish → yangi ustunga o'tish → eski ustunni o'chirish.",
        "- **Vositalar**: `gh-ost` yoki `pt-online-schema-change` trigger yoki binlog asosida yangi jadval nusxasini fonda to'ldirib, so'nggi daqiqada atomik almashtiradi.",
        "",
        "**Read/Write Connection Splitting (Laravel)**:",
        "O'qish so'rovlarini (SELECT) replica serverlarga, yozishlarni (INSERT/UPDATE) master serverga yo'naltirish. Muhim jihat: replikatsiya kechikishi (replication lag) sababli yangi yozilgan ma'lumot darhol ko'rinmay qolmasligi uchun Laravel'dagi `sticky: true` konfiguratsiyasi o'sha so'rov doirasida masterdan o'qishni kafolatlaydi.",
        "",
        "```php",
        "// config/database.php (Read / Write ajratish)",
        "'mysql' => [",
        "    'read' => ['host' => ['192.168.1.2', '192.168.1.3']],",
        "    'write' => ['host' => ['192.168.1.1']],",
        "    'sticky' => true, // sessiya davomida yozilgandan keyin masterdan o'qish",
        "    'database' => 'app_db',",
        "],",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Katta jadval ustunini xizmatni to'xtatmasdan o'zgartirish bo'yicha Expand & Contract rejasini yozing; Laravel'da read/write ulanishini va `sticky` parametrini sozlang.",
      acceptanceCriteria: [
        "Nima uchun `ALTER TABLE` katta jadvallarda xavfli ekanini va lock turlarini biladi",
        "Expand & Contract arxitektura modelini amalda tushuntira oladi",
        "Replication lag muammosi va Laravel `sticky` mexanizmining ishlashini tushunadi"
      ],
      prerequisites: [
        "15.3",
        "17.1",
        "55.1"
      ]
    }
  ]
});
