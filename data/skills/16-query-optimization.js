/* 16 · Query Optimization
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 16,
  slug: "query-optimization",
  title: "Query Optimization",
  group: "database",
  description: "Query Optimization — alohida SQL so'rovlarni tezlashtirish san'ati: rejani o'qish, to'g'ri indeksni loyihalash, so'rovni sargable shaklga keltirish va natijani o'lchov bilan isbotlash. Bu ko'nikma ORM ortida yashiringan sekin so'rovlarni topish va tuzatish uchun Senior dasturchining kundalik vositasidir.",
  subskills: [
    {
      id: "16.1",
      title: "`EXPLAIN`",
      description: [
        "`EXPLAIN` so'rovni bajarmasdan optimizer tanlagan rejani ko'rsatadi: jadvallarga kirish usuli, ishlatiladigan indeks, JOIN tartibi, taxminiy qatorlar soni. Bu xavfsiz (ma'lumotni o'zgartirmaydi) va tez — production'da ham ishlatish mumkin.",
        "",
        "Laravel'da: `Order::where(...)->explain()->dd()` yoki `->toRawSql()` bilan SQL'ni olib, DB klientida `EXPLAIN` qilish. Asosiy savollar: indeks ishlatildimi? Nechta qator skanerlanadi? Saralash yoki vaqtinchalik jadval kerakmi?",
        "",
        "```php",
        "Order::where('customer_id', 42)->orderByDesc('created_at')->limit(20)->explain()->dd();",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "5 ta muhim Eloquent so'rovi uchun `explain()` natijasini yig'ib, har birida indeks ishlatilishini tekshiring.",
      acceptanceCriteria: [
        "`EXPLAIN` chiqishidagi asosiy maydonlarni o'qiy oladi",
        "Laravel'dan to'g'ridan-to'g'ri explain qila oladi"
      ],
      prerequisites: [
        "9.19"
      ]
    },
    {
      id: "16.2",
      title: "`EXPLAIN ANALYZE`",
      description: [
        "`EXPLAIN ANALYZE` so'rovni **haqiqatan bajaradi** va har bosqich uchun haqiqiy vaqt, qatorlar soni va loop'larni ko'rsatadi. Taxmin va reallik farqi muammo manbasini ochadi: optimizer 10 qator kutgan, aslida 1 mln — statistika eskirgan yoki korrelyatsiya hisobga olinmagan.",
        "",
        "Ehtiyot: `UPDATE`/`DELETE` uchun tranzaksiya ichida bajarib `ROLLBACK` qiling. PostgreSQL'da `BUFFERS` opsiyasi cache va diskdan o'qishlarni ko'rsatadi; birinchi va keyingi ishga tushirishlar (sovuq/issiq cache) farq qiladi.",
        "",
        "```sql",
        "BEGIN;",
        "EXPLAIN (ANALYZE, BUFFERS) UPDATE orders SET status = 'expired' WHERE created_at < now() - interval '30 days';",
        "ROLLBACK;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Taxminiy va haqiqiy qatorlar soni keskin farq qiladigan so'rovni toping va sababini aniqlang.",
      acceptanceCriteria: [
        "`EXPLAIN` va `EXPLAIN ANALYZE` farqini biladi",
        "Yozuvchi so'rovlarni xavfsiz tahlil qiladi"
      ],
      prerequisites: [
        "16.1"
      ]
    },
    {
      id: "16.3",
      title: "Execution Plan Interpretation",
      description: [
        "Rejani o'qish: tugunlar daraxti ichkaridan tashqariga bajariladi. Kirish usullari (yaxshidan yomonga taxminan): PK/unique lookup → index range scan → index-only scan → bitmap scan → full scan. JOIN algoritmlari: nested loop (kichik tashqi to'plam + indeks), hash join (katta to'plamlar, tenglik), merge join (tartiblangan kirishlar).",
        "",
        "Qizil bayroqlar: katta jadvalda full scan, `filesort`/`Sort` diskda, `Using temporary`, loop'lar soni ko'p bo'lgan nested loop, taxmin va haqiqat farqi 10x dan ortiq. Eng ko'p vaqt olgan tugunga e'tibor qarating.",
        "",
        "```text",
        "Limit (actual time=0.05..0.12 rows=20)",
        "  -> Index Scan Backward using orders_customer_created on orders",
        "       Index Cond: (customer_id = 42)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Murakkab JOIN'li so'rov rejasini bosqichma-bosqich izohlab yozing va eng qimmat tugunni optimallashtiring.",
      acceptanceCriteria: [
        "JOIN algoritmlarini va qachon tanlanishini biladi",
        "Rejadagi qizil bayroqlarni taniydi"
      ],
      prerequisites: [
        "16.2"
      ]
    },
    {
      id: "16.4",
      title: "Index Selection",
      description: [
        "Optimizer indeksni xarajat bo'yicha tanlaydi: selektivlik, indeks hajmi, kerakli qatorlarni olish narxi, tartib talabi. Ba'zan indeks borligiga qaramay full scan tanlanadi — chunki jadvalning katta qismi kerak (bu to'g'ri qaror bo'lishi mumkin).",
        "",
        "Noto'g'ri tanlov sabablari: eskirgan statistika, korrelyatsiyali ustunlar, parametr qiymatiga qarab o'zgaruvchi taqsimot, bir nechta raqobatchi indeks. Yechim tartibi: `ANALYZE`, yaxshiroq composite indeks, so'rovni qayta yozish; oxirgi chora — MySQL `FORCE INDEX` (ma'lumot o'zgarsa zarar berishi mumkin).",
        "",
        "```sql",
        "ANALYZE TABLE orders;           -- MySQL",
        "SELECT * FROM orders FORCE INDEX (orders_customer_created) WHERE ...;  -- oxirgi chora",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Optimizer noto'g'ri indeks tanlagan holatni toping va hint'siz (statistika yoki indeks orqali) tuzating.",
      acceptanceCriteria: [
        "Optimizer indeksni nega tanlamasligi sabablarini biladi",
        "Hint'larni faqat oxirgi chora sifatida ishlatadi"
      ],
      prerequisites: [
        "16.3"
      ]
    },
    {
      id: "16.5",
      title: "Composite Index Design",
      description: [
        "Composite indeks dizayni so'rovdan boshlanadi: `WHERE` dagi tenglik ustunlari → diapazon yoki `ORDER BY` ustuni → (ixtiyoriy) `SELECT` dagi ustunlar (covering uchun). Bitta indeks bir nechta so'rovga xizmat qilishi uchun umumiy prefiks topiladi.",
        "",
        "Misol: `WHERE user_id = ? AND status IN (...) ORDER BY created_at DESC` uchun `(user_id, status, created_at)` — lekin `IN` ko'p qiymatli bo'lsa tartib uchun ishlamasligi mumkin; ba'zan `(user_id, created_at)` + filtr yaxshiroq. Har doim `EXPLAIN` bilan tasdiqlang.",
        "",
        "```sql",
        "-- So'rov: WHERE tenant_id = ? AND customer_id = ? ORDER BY created_at DESC LIMIT 20",
        "CREATE INDEX orders_t_c_created ON orders (tenant_id, customer_id, created_at DESC);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bir jadvaldagi 4 ta tez-tez so'rov uchun minimal sondagi composite indekslar to'plamini loyihalang.",
      acceptanceCriteria: [
        "So'rovdan kelib chiqib ustun tartibini belgilaydi",
        "Bitta indeksni bir nechta so'rovga moslay oladi"
      ],
      prerequisites: [
        "15.5"
      ]
    },
    {
      id: "16.6",
      title: "Sargable Queries",
      description: [
        "Sargable (Search ARGument ABLE) — indeksdan foydalana oladigan shart. Sargable emas: ustunga funksiya (`YEAR(date)`, `LOWER(email)`), ustun ustida arifmetika (`price * 1.12 > 100`), boshida wildcard (`LIKE '%abc'`), implicit tip konversiyasi, ba'zan `OR` va `NOT IN`.",
        "",
        "Qayta yozish: funksiyani qiymat tomoniga o'tkazish, diapazon ishlatish, expression indeks yoki generated column, full-text qidiruv. Laravel'da `whereDate()`, `whereYear()` sargable emas SQL yaratadi — katta jadvalda diapazon bilan almashtiring.",
        "",
        "```php",
        "// ❌ WHERE YEAR(created_at) = 2025",
        "Order::whereYear('created_at', 2025);",
        "// ✅",
        "Order::whereBetween('created_at', ['2025-01-01', '2025-12-31 23:59:59']);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Loyihadagi `whereDate`/`whereYear`/`whereMonth` chaqiruvlarini topib, sargable diapazonlarga almashtiring.",
      acceptanceCriteria: [
        "Sargable bo'lmagan 5 xil shaklni taniydi",
        "Laravel helper'lari yaratadigan SQL'ni biladi"
      ],
      prerequisites: [
        "16.1"
      ]
    },
    {
      id: "16.7",
      title: "JOIN Optimization",
      description: [
        "JOIN'ni tezlashtirish: JOIN ustunlarida indeks (ayniqsa FK tomonida), mos tiplar va collation (aks holda indeks ishlamaydi), filtrlarni JOIN'dan oldin qo'llash imkonini beruvchi shartlar, faqat kerakli jadvallarni ulash, katta `JOIN` + `GROUP BY` o'rniga oldindan agregatsiya (subquery yoki CTE).",
        "",
        "JOIN natijasining \"portlashi\": bir nechta 1:N relation'ni birga JOIN qilish dekart ko'paytma beradi (`orders × items × payments`) — noto'g'ri summalar va ortiqcha qatorlar. Eloquent'ning eager loading'i alohida so'rovlar bilan bu muammodan qochadi.",
        "",
        "```sql",
        "-- Oldindan agregatsiya — qator portlashisiz",
        "SELECT o.id, i.items_total, p.paid_total",
        "FROM orders o",
        "JOIN (SELECT order_id, SUM(qty * price) items_total FROM order_items GROUP BY order_id) i ON i.order_id = o.id",
        "JOIN (SELECT order_id, SUM(amount) paid_total FROM payments GROUP BY order_id) p ON p.order_id = o.id;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ikki 1:N relation'ni JOIN qilganda noto'g'ri summa chiqishini ko'rsating va oldindan agregatsiya bilan tuzating.",
      acceptanceCriteria: [
        "JOIN ustunlarida indeks va tip mosligining ahamiyatini biladi",
        "Qator portlashi muammosini taniydi"
      ],
      prerequisites: [
        "9.3"
      ]
    },
    {
      id: "16.8",
      title: "Subquery vs JOIN",
      description: [
        "Zamonaviy optimizatorlar ko'p subquery'larni ichki JOIN yoki semi-join'ga aylantiradi, shuning uchun \"JOIN doim tezroq\" degan qoida yo'q. Farqlar: `EXISTS`/`IN` (semi-join) — dublikat qator yaratmaydi va birinchi mos yozuvda to'xtaydi; JOIN — dublikat yaratishi mumkin, `DISTINCT` kerak bo'ladi; korrelyatsiyali skalyar subquery `SELECT` ichida — har qator uchun bajarilishi mumkin.",
        "",
        "Qaror qoidasi: semantik jihatdan aniqrog'ini yozing, keyin `EXPLAIN` bilan tekshiring. MySQL'ning eski versiyalarida `IN (subquery)` yomon bajarilardi — 8.0 da ancha yaxshilangan.",
        "",
        "```sql",
        "-- Mavjudlik: EXISTS (dublikatsiz)",
        "SELECT c.* FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
        "-- JOIN varianti DISTINCT talab qiladi",
        "SELECT DISTINCT c.* FROM customers c JOIN orders o ON o.customer_id = c.id;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir masalani subquery va JOIN bilan yozib, ikkala rejani solishtiring va xulosa yozing.",
      acceptanceCriteria: [
        "Semi-join va JOIN farqini tushuntira oladi",
        "Tanlovni EXPLAIN bilan asoslaydi"
      ],
      prerequisites: [
        "9.4"
      ]
    },
    {
      id: "16.9",
      title: "Avoiding Unnecessary Columns",
      description: [
        "`SELECT *` — keraksiz ma'lumotni o'qish, tarmoqdan uzatish va PHP'da hydration qilish; covering indeksdan foydalanishga to'sqinlik; katta `TEXT`/`JSON` ustunlari bo'lsa juda qimmat; jadval tuzilmasi o'zgarsa kutilmagan natija.",
        "",
        "Laravel'da: `select(['id', 'name'])`, eager loading'da `with('author:id,name')` (FK ustunlarini qo'shishni unutmang!), `pluck()` faqat bitta-ikki ustun kerak bo'lsa, `value()` bitta qiymat uchun. Katta matnli ustunlarni ro'yxatlarda yuklamang.",
        "",
        "```php",
        "Post::select(['id', 'title', 'author_id', 'published_at'])",
        "    ->with('author:id,name')",
        "    ->latest('published_at')",
        "    ->paginate(20);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Ro'yxat sahifasida `SELECT *` ni kerakli ustunlarga qisqartiring va xotira/javob hajmini solishtiring.",
      acceptanceCriteria: [
        "`SELECT *` ning yashirin narxlarini biladi",
        "Eager loading'da ustun tanlashda FK'ni unutmaydi"
      ],
      prerequisites: [
        "13.11"
      ]
    },
    {
      id: "16.10",
      title: "Avoiding Functions on Indexed Columns",
      description: [
        "Indekslangan ustunga funksiya qo'llash (`WHERE LOWER(email) = ?`, `WHERE DATE(created_at) = ?`, `WHERE SUBSTRING(phone, 1, 5) = ?`) indeksni yaroqsiz qiladi — DB har qatorda funksiyani hisoblashi kerak.",
        "",
        "Yechimlar: (1) qiymatni normallashtirib saqlash (email'ni kichik harfda yozish — mutator); (2) shartni qayta yozish (diapazon); (3) expression/funksional indeks (PostgreSQL, MySQL 8.0.13+); (4) generated column + indeks; (5) case-insensitive collation.",
        "",
        "```sql",
        "-- MySQL 8: funksional indeks",
        "CREATE INDEX users_email_lower ON users ((LOWER(email)));",
        "-- yoki ma'lumotni normallashtirib saqlash va oddiy indeks",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Funksiya sababli indeks ishlatmayotgan so'rovni uch xil usulda tuzatib, eng yaxshisini tanlang.",
      acceptanceCriteria: [
        "Funksiya indeksni nega o'chirishini tushuntira oladi",
        "Expression indeks va normallashtirish o'rtasida tanlaydi"
      ],
      prerequisites: [
        "16.6"
      ]
    },
    {
      id: "16.11",
      title: "Pagination: Offset vs Cursor",
      description: [
        "Offset (`LIMIT n OFFSET m`) — DB `m + n` qatorni o'qib, `m` tasini tashlaydi: sahifa raqami oshgan sari sekinlashadi; ma'lumot qo'shilsa/o'chsa — dublikat yoki yo'qolgan qatorlar. Cursor/keyset (`WHERE (sort_key, id) < (?, ?) ORDER BY ... LIMIT n`) — indeks bo'yicha to'g'ridan-to'g'ri pozitsiyaga o'tadi: har sahifa bir xil tez va barqaror.",
        "",
        "Cursor cheklovlari: ixtiyoriy sahifaga o'tib bo'lmaydi, unikal va indekslangan tartib kaliti kerak, murakkab saralashlar qiyin. Laravel: `paginate()`, `simplePaginate()`, `cursorPaginate()`.",
        "",
        "```php",
        "$page = Order::orderByDesc('created_at')->orderByDesc('id')->cursorPaginate(50);",
        "// Javobda next_cursor — keyingi so'rovda ?cursor=...",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API endpoint'ini `cursorPaginate` ga o'tkazing va chuqur sahifalarda tezlik barqarorligini o'lchang.",
      acceptanceCriteria: [
        "Offset'ning tezlik va izchillik muammolarini biladi",
        "Cursor uchun to'g'ri indeks va tartibni loyihalaydi"
      ],
      prerequisites: [
        "9.23"
      ]
    },
    {
      id: "16.12",
      title: "Query Batching",
      description: [
        "Ko'p kichik so'rovni kamroq kattaroq so'rovga birlashtirish: `WHERE id IN (...)` bilan bir yo'la olish (DataLoader pattern), multi-row insert, bitta `UPDATE ... CASE` bilan bir nechta qatorni turli qiymatga yangilash, katta to'plamni o'rtacha bo'laklarga bo'lib qayta ishlash (`chunkById`).",
        "",
        "Muvozanat: juda katta `IN` ro'yxati (o'n minglab) yoki bitta ulkan so'rov ham muammo — parser yuki, lock'lar, `max_allowed_packet`. Odatiy bo'lak — 500–1000.",
        "",
        "```php",
        "$ids->chunk(1000)->each(function ($chunk) {",
        "    $users = User::whereIn('id', $chunk)->get()->keyBy('id');",
        "    // ...",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sikl ichida bittalab so'rov qilayotgan kodni batch'larga o'tkazing va so'rovlar soni va vaqtni solishtiring.",
      acceptanceCriteria: [
        "Batching foydasini round-trip nuqtai nazaridan tushuntira oladi",
        "Batch hajmini asosli tanlaydi"
      ],
      prerequisites: [
        "15.10"
      ]
    },
    {
      id: "16.13",
      title: "Aggregation Optimization",
      description: [
        "Agregatsiyani tezlashtirish: `WHERE` bilan avval qatorlar sonini kamaytirish, `GROUP BY` ustunlarida indeks (indeks tartibida guruhlash — saralashsiz), covering indeks bilan faqat indeksdan o'qish, agregatni kichik subquery'da qilib keyin JOIN.",
        "",
        "Katta hajmda real-vaqt agregatsiya qimmat: oldindan hisoblangan summary jadvallar (kunlik statistika job orqali), materialized view, hisoblagich ustunlar, OLAP tizimlar (ClickHouse) analitika uchun. `COUNT(*)` katta jadvalda — taxminiy son yoki kesh.",
        "",
        "```php",
        "// Kunlik summary — har tunda hisoblanadi",
        "DailySales::upsert(",
        "    Order::selectRaw('DATE(created_at) d, SUM(total) revenue, COUNT(*) orders')",
        "        ->whereDate('created_at', today()->subDay())->groupBy('d')->get()->toArray(),",
        "    ['d'], ['revenue', 'orders'],",
        ");",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Og'ir dashboard agregatini kunlik summary jadvaliga o'tkazib, javob vaqtini solishtiring.",
      acceptanceCriteria: [
        "Agregatsiyani indeks bilan tezlashtirish usullarini biladi",
        "Oldindan hisoblash qachon kerakligini aniqlaydi"
      ],
      prerequisites: [
        "9.7"
      ]
    },
    {
      id: "16.14",
      title: "Sorting Optimization",
      description: [
        "`ORDER BY` indeks tartibiga mos kelsa, DB saralamaydi — natijani indeksdan tartibli o'qiydi va `LIMIT` da to'xtaydi. Aks holda butun natija saralanadi (`Using filesort`, `Sort`), katta hajmda diskda.",
        "",
        "Shartlar: tartib ustunlari composite indeksning tenglik ustunlaridan keyin keladi; yo'nalishlar mos (aralash `ASC/DESC` uchun mos indeks — MySQL 8 descending indexes); `ORDER BY RAND()` — katta jadvalda juda sekin (muqobil: tasodifiy id diapazoni). Tasodifiy bo'lmagan barqaror tartib uchun ikkinchi kalit (`id`).",
        "",
        "```sql",
        "CREATE INDEX posts_published ON posts (status, published_at DESC, id DESC);",
        "SELECT id, title FROM posts WHERE status = 'published' ORDER BY published_at DESC, id DESC LIMIT 20;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`filesort` qilayotgan ro'yxat so'rovini indeks bo'yicha tartiblanadigan qiling va EXPLAIN bilan tasdiqlang.",
      acceptanceCriteria: [
        "Indeks orqali saralashsiz o'qish shartlarini biladi",
        "`ORDER BY RAND()` muqobillarini biladi"
      ],
      prerequisites: [
        "16.5"
      ]
    },
    {
      id: "16.15",
      title: "ORM-generated SQL Analysis",
      description: [
        "Eloquent qanday SQL yaratayotganini ko'rish: `->toSql()`, `->toRawSql()` (Laravel 10.15+), `->dd()`/`->dump()`, `DB::listen`, Telescope, Debugbar. Tipik ORM muammolari: N+1, `SELECT *`, `whereHas` ning sekin `EXISTS` subquery'lari (katta jadvallarda `whereIn` + subquery yoki JOIN tezroq bo'lishi mumkin), `whereDate` kabi sargable bo'lmagan helper'lar, `count()` ni kolleksiyada chaqirish.",
        "",
        "Har yangi murakkab Eloquent so'rovini yozganda uning SQL'ini va rejasini bir marta ko'rish odati katta muammolarning oldini oladi.",
        "",
        "```php",
        "echo Order::whereHas('items', fn ($q) => $q->where('qty', '>', 5))->toRawSql();",
        "// select * from orders where exists (select * from order_items where orders.id = order_items.order_id and qty > 5)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "5 ta murakkab Eloquent so'rovining SQL'ini chiqarib, `whereHas` ni samaraliroq muqobil bilan solishtiring.",
      acceptanceCriteria: [
        "Eloquent SQL'ini ko'rishning bir necha usulini biladi",
        "`whereHas` ning narxini tushunadi"
      ],
      prerequisites: [
        "13.23"
      ]
    },
    {
      id: "16.16",
      title: "Prepared Statements",
      description: [
        "Prepared statement: so'rov shabloni (`?` joylari bilan) va qiymatlar alohida yuboriladi. Ikki foyda: **xavfsizlik** (SQL injection imkonsiz) va potensial **tezlik** (reja qayta ishlatiladi). PDO default'da Laravel'da emulatsiya qilinishi mumkin (`PDO::ATTR_EMULATE_PREPARES`).",
        "",
        "Nozikliklar: PostgreSQL'da prepared statement'lar generic plan'ga o'tishi va notekis taqsimotda yomon reja berishi mumkin; PgBouncer transaction rejimi bilan moslik; ustun/jadval nomlarini bog'lab bo'lmaydi (whitelist).",
        "",
        "```php",
        "DB::select('SELECT * FROM users WHERE email = ? AND tenant_id = ?', [$email, $tenantId]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Raw so'rovlardagi barcha string birlashtirishlarni bog'langan parametrlarga o'tkazing.",
      acceptanceCriteria: [
        "Prepared statement'ning ikki foydasini biladi",
        "Generic plan muammosidan xabardor"
      ],
      prerequisites: [
        "9.22"
      ]
    },
    {
      id: "16.17",
      title: "Query Caching Considerations",
      description: [
        "MySQL 8 da ichki query cache olib tashlangan (invalidatsiya muammolari sabab). Keshlash ilova darajasida: `Cache::remember()` natijalarni, Redis. Qachon keshlash kerak: og'ir, tez-tez o'qiladigan, kam o'zgaradigan natijalar (ma'lumotnomalar, dashboard statistikasi, mashhur sahifalar).",
        "",
        "Muammolar: invalidatsiya (ma'lumot o'zgarganda eskirgan natija), kesh kalitida barcha parametrlar (tenant, til, filtr, sahifa), stampede, haddan ortiq keshlash xotirani to'ldiradi va xatolarni yashiradi. Avval so'rovni optimallashtiring, keshlash — keyingi qadam.",
        "",
        "```php",
        "$key = \"reports:sales:{$tenantId}:{$from->toDateString()}:{$to->toDateString()}\";",
        "$data = Cache::remember($key, now()->addMinutes(15), fn () => $this->salesReport($tenantId, $from, $to));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Og'ir hisobotni keshlang: to'g'ri kalit, TTL va ma'lumot o'zgarganda invalidatsiya bilan.",
      acceptanceCriteria: [
        "Keshlash optimallashtirish o'rnini bosmasligini tushunadi",
        "Kesh kalitiga barcha kontekstni kiritadi"
      ],
      prerequisites: [
        "12.4"
      ]
    },
    {
      id: "16.18",
      title: "Measuring Before and After Optimization",
      description: [
        "Optimallashtirish — gipoteza; uni faqat o'lchov tasdiqlaydi. Jarayon: (1) bazaviy o'lchov (vaqt, qatorlar, so'rovlar soni, p95), (2) bitta o'zgarish, (3) bir xil sharoitda qayta o'lchash, (4) natijani hujjatlashtirish (PR tavsifida raqamlar), (5) production'da monitoring bilan tasdiqlash.",
        "",
        "Tuzoqlar: cache isishi (birinchi ishga tushirish sekinroq), kichik dev ma'lumot, bir martalik o'lchov, yon ta'sirlarni (yozish tezligi, xotira) hisobga olmaslik.",
        "",
        "```text",
        "Oldin:  /orders p95 = 1840 ms, 63 so'rov",
        "Keyin:  /orders p95 =  210 ms,  6 so'rov (eager loading + composite indeks)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta optimallashtirishni oldin/keyin raqamlari bilan PR tavsifida hujjatlashtiring.",
      acceptanceCriteria: [
        "O'lchovsiz optimallashtirishni qabul qilmaydi",
        "Ishonchli o'lchov sharoitlarini biladi"
      ],
      prerequisites: [
        "15.18"
      ]
    }
  ]
});
