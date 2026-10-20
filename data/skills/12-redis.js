/* 12 · Redis
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 12,
  slug: "redis",
  title: "Redis",
  group: "performance",
  description: "Redis — xotirada ishlaydigan, juda tez key-value ma'lumotlar tuzilmasi serveri. Laravel'da cache, session, queue (Horizon), rate limiting, lock'lar va broadcasting uchun keng ishlatiladi. Senior dasturchi Redis ma'lumot tiplarini to'g'ri tanlaydi, xotira va persistence murosalarini tushunadi hamda distributed lock va cache izchilligi muammolarini hal qila oladi.",
  subskills: [
    {
      id: "12.1",
      title: "Redis Data Types: Strings, Hashes, Lists, Sets, Sorted Sets",
      description: [
        "- **String** — eng oddiy qiymat (matn, son, binar, 512 MB gacha): cache, hisoblagich (`INCR`).",
        "- **Hash** — maydon-qiymat juftliklari: obyekt (`HSET user:1 name Ali`).",
        "- **List** — tartiblangan ro'yxat: navbat (`LPUSH`/`BRPOP`), oxirgi N ta yozuv.",
        "- **Set** — unikal elementlar: teglar, \"kim ko'rdi\", kesishma/birlashma.",
        "- **Sorted Set** — ball bo'yicha tartiblangan unikal elementlar: reyting, vaqt bo'yicha indeks, sliding window rate limit.",
        "",
        "Kalit nomlash konvensiyasi: `app:entity:id:field`. Har bir tip uchun buyruqlar murakkabligini (O(1), O(log N), O(N)) biling — `KEYS *` va katta `SMEMBERS` production'ni to'xtatishi mumkin (`SCAN` ishlating).",
        "",
        "```bash",
        "ZADD leaderboard 1500 user:7 1200 user:3",
        "ZREVRANGE leaderboard 0 9 WITHSCORES",
        "HINCRBY stats:2025-06-01 orders 1",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "O'yin reytingi (top-10, foydalanuvchi o'rni) ni Sorted Set bilan amalga oshiring.",
      acceptanceCriteria: [
        "Har bir tipning tipik qo'llanishini ayta oladi",
        "O(N) buyruqlar xavfini biladi va `SCAN` ishlatadi"
      ],
      prerequisites: []
    },
    {
      id: "12.2",
      title: "Streams",
      description: [
        "Redis Streams — faqat qo'shiladigan log tuzilmasi (Kafka'ning yengil analogi): `XADD`, `XRANGE`, `XREAD`. **Consumer group**'lar xabarlarni iste'molchilar o'rtasida taqsimlaydi, `XACK` bilan tasdiqlanadi, tasdiqlanmaganlar Pending Entries List'da qoladi va `XCLAIM`/`XAUTOCLAIM` bilan qayta olinadi.",
        "",
        "Pub/Sub'dan farqi — xabarlar saqlanadi va qayta o'qiladi. Laravel queue'lari List'ga asoslangan; Streams event sourcing, audit oqimi va xizmatlar o'rtasidagi yengil xabar almashinuvi uchun qulay. `MAXLEN` bilan hajmni cheklang.",
        "",
        "```bash",
        "XADD orders:events MAXLEN ~ 100000 * type paid order_id 42",
        "XGROUP CREATE orders:events billing $ MKSTREAM",
        "XREADGROUP GROUP billing worker-1 COUNT 10 BLOCK 5000 STREAMS orders:events >",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Consumer group bilan ikki worker'li stream iste'molchisini yozing va tasdiqlanmagan xabarlarni qayta ishlashni ko'rsating.",
      acceptanceCriteria: [
        "Streams va Pub/Sub farqini biladi",
        "Consumer group va ACK mexanizmini tushuntira oladi"
      ],
      prerequisites: [
        "12.1"
      ]
    },
    {
      id: "12.3",
      title: "Key Expiration va TTL",
      description: [
        "`EXPIRE`/`SET key val EX 60` kalitga yashash muddati beradi; `TTL` qolgan vaqtni ko'rsatadi (-1 — muddatsiz, -2 — yo'q). Redis eskirgan kalitlarni ikki usulda o'chiradi: murojaat paytida (lazy) va fon rejimida tasodifiy namunalar bilan (active).",
        "",
        "Cache kalitlariga doim TTL bering — aks holda xotira to'ladi. Bir vaqtda ko'p kalit bir xil TTL bilan yaratilsa, ular birga eskiradi (cache avalanche) — TTL'ga tasodifiy \"jitter\" qo'shing. `SET` qayta yozilganda TTL o'chadi (`KEEPTTL` bilan saqlanadi).",
        "",
        "```php",
        "Cache::put(\"product:{$id}\", $data, now()->addMinutes(10 + random_int(0, 3)));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Cache yozuvlariga jitter'li TTL qo'shing va TTL'siz kalitlarni `SCAN` bilan topadigan buyruq yozing.",
      acceptanceCriteria: [
        "Lazy va active expiration'ni biladi",
        "TTL jitter'ning maqsadini tushuntira oladi"
      ],
      prerequisites: [
        "12.1"
      ]
    },
    {
      id: "12.4",
      title: "Cache-Aside Pattern",
      description: [
        "Cache-aside (lazy loading): ilova avval cache'dan o'qiydi; topilmasa — DB'dan olib, cache'ga yozadi. Yozishda DB yangilanadi va cache kaliti **o'chiriladi** (yangilanmaydi — race condition'lar kamroq).",
        "",
        "Laravel'da `Cache::remember()` aynan shu pattern. Afzalliklari: sodda, faqat kerakli ma'lumot keshlanadi, cache ishlamasa tizim DB bilan davom etadi. Kamchiliklari: birinchi so'rov sekin, cache va DB qisqa vaqt nomuvofiq bo'lishi mumkin.",
        "",
        "```php",
        "$product = Cache::remember(\"product:{$id}\", 600, fn () => Product::with('images')->findOrFail($id));",
        "",
        "// Yangilashda",
        "$product->update($data);",
        "Cache::forget(\"product:{$id}\");",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mahsulot sahifasi uchun cache-aside'ni amalga oshiring va yangilashda invalidatsiyani testlang.",
      acceptanceCriteria: [
        "Nega yozishda cache o'chiriladi, yangilanmasligini tushuntira oladi",
        "`remember` ning cache-aside ekanini biladi"
      ],
      prerequisites: [
        "54.1"
      ]
    },
    {
      id: "12.5",
      title: "Cache Invalidation",
      description: [
        "\"Kompyuter fanidagi ikki qiyin muammodan biri.\" Strategiyalar: TTL (eng sodda — ma'lum eskirishga rozilik), yozishda aniq o'chirish (event/observer orqali), versiyalangan kalitlar (`product:42:v7` — versiyani oshirish eski kalitni amalda bekor qiladi), cache tag'lari (guruhni birga o'chirish).",
        "",
        "Muammolar: bir ma'lumot ko'p kalitda (ro'yxat, detal, qidiruv) — hammasini topish qiyin; tranzaksiya commit'idan oldin invalidatsiya — eski ma'lumot qayta keshlanadi (`afterCommit`). Redis'da `KEYS pattern` bilan o'chirish — xavfli.",
        "",
        "```php",
        "// Commit'dan keyin invalidatsiya",
        "DB::afterCommit(fn () => Cache::forget(\"product:{$product->id}\"));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Model observer + `afterCommit` bilan bog'liq barcha cache kalitlarini invalidatsiya qiluvchi tizim yozing.",
      acceptanceCriteria: [
        "Invalidatsiya strategiyalarini solishtira oladi",
        "Commit'dan oldingi invalidatsiya race condition'ini biladi"
      ],
      prerequisites: [
        "12.4"
      ]
    },
    {
      id: "12.6",
      title: "Cache Stampede Prevention",
      description: [
        "Stampede (dogpile) — mashhur kalit eskirganda yuzlab so'rov bir vaqtda DB'ga tushib, uni yiqitadi. Yechimlar:",
        "- **Lock**: faqat bitta jarayon qayta hisoblaydi, qolganlar kutadi yoki eski qiymatni oladi.",
        "- **Stale-while-revalidate**: eski qiymat beriladi, fon rejimida yangilanadi (Laravel 11 `Cache::flexible()`).",
        "- **Probabilistic early expiration** (XFetch): muddat tugashidan oldin tasodifiy ravishda yangilash.",
        "- **Jitter** — kalitlar bir vaqtda eskirmasligi uchun.",
        "",
        "```php",
        "// 5 daqiqa yangi, 10 daqiqagacha eskisi beriladi va fonda yangilanadi",
        "$stats = Cache::flexible('dashboard:stats', [300, 600], fn () => $this->computeStats());",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Load test bilan stampede'ni qayta yarating va `Cache::flexible` yoki lock bilan bartaraf eting.",
      acceptanceCriteria: [
        "Stampede'ni oldini olishning 3 usulini biladi",
        "`Cache::flexible` ishlash prinsipini tushuntira oladi"
      ],
      prerequisites: [
        "12.5"
      ]
    },
    {
      id: "12.7",
      title: "Distributed Locks",
      description: [
        "Bir nechta server/worker o'rtasida eksklyuziv bajarishni ta'minlash: `SET lock:key token NX PX 30000` (atomik \"agar yo'q bo'lsa, muddat bilan yoz\"), o'chirishda faqat o'z token'ini tekshirib (Lua bilan atomik) bo'shatish.",
        "",
        "Laravel: `Cache::lock('report', 30)->block(5, fn () => ...)`, `->owner()`, `restoreLock()`. Nozikliklar: lock muddati ish davomidan uzun bo'lishi kerak (aks holda ikki jarayon birga ishlaydi), GC pauzasi va tarmoq kechikishi xavfi; to'liq kafolat uchun fencing token yoki DB lock. Redlock algoritmi munozarali — muhim moliyaviy operatsiyalarda DB tranzaksiyasi/unique constraint ishonchliroq.",
        "",
        "```php",
        "Cache::lock(\"invoice:{$order->id}\", 30)->block(5, function () use ($order) {",
        "    $this->issueInvoice($order);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ikki parallel worker bir buyurtmaga ikki marta hisob-faktura chiqarmasligini lock bilan ta'minlang va testlang.",
      acceptanceCriteria: [
        "`SET NX PX` + token bilan xavfsiz bo'shatishni tushuntira oladi",
        "Lock muddati va fencing muammosini biladi"
      ],
      prerequisites: [
        "12.8"
      ]
    },
    {
      id: "12.8",
      title: "Atomic Operations",
      description: [
        "Redis bitta thread'da buyruqlarni ketma-ket bajaradi — har bir buyruq atomik. `INCR`, `DECRBY`, `HINCRBY`, `SETNX`, `GETDEL`, `LPOP` kabi buyruqlar \"o'qi-o'zgartir-yoz\" race condition'larsiz ishlaydi.",
        "",
        "Klassik xato: PHP'da `$v = Redis::get('x'); Redis::set('x', $v + 1);` — ikki parallel so'rovda yo'qolgan yangilanish. To'g'risi — `Redis::incr('x')`. Bir nechta buyruqni atomik qilish uchun `MULTI`/`EXEC` yoki Lua skript.",
        "",
        "```php",
        "$views = Redis::incr(\"post:{$id}:views\");",
        "if (Redis::setnx(\"welcome-sent:{$userId}\", 1)) {",
        "    Redis::expire(\"welcome-sent:{$userId}\", 86400);",
        "    // faqat bir marta yuboriladi",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Get+set bilan yozilgan hisoblagichda race condition'ni load test bilan ko'rsating va `INCR` bilan tuzating.",
      acceptanceCriteria: [
        "Redis bitta thread modelining atomiklikka ta'sirini biladi",
        "Lost update'ni atomik buyruq bilan hal qiladi"
      ],
      prerequisites: [
        "12.1"
      ]
    },
    {
      id: "12.9",
      title: "Transactions va Lua Scripts",
      description: [
        "`MULTI`/`EXEC` buyruqlarni navbatga qo'yib, birga bajaradi (boshqa mijozlar orasiga kira olmaydi), lekin rollback yo'q va oraliq natijaga qarab qaror qabul qilib bo'lmaydi. `WATCH` — optimistik lock: kuzatilgan kalit o'zgarsa, `EXEC` bekor bo'ladi.",
        "",
        "**Lua skript** (`EVAL`) — server tomonida atomik bajariladigan mantiq: shartlar, bir nechta kalit, natijaga qarab amal. Rate limiter, lock bo'shatish, murakkab hisoblagichlar uchun ideal. Skriptlar qisqa bo'lishi kerak — bajarilish davomida Redis boshqa hech narsa qilmaydi.",
        "",
        "```php",
        "$script = <<<'LUA'",
        "if redis.call('get', KEYS[1]) == ARGV[1] then",
        "  return redis.call('del', KEYS[1])",
        "end",
        "return 0",
        "LUA;",
        "Redis::eval($script, 1, 'lock:report', $token);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "\"Agar zaxira yetarli bo'lsa, kamaytir\" amalini Lua skript bilan atomik yozing.",
      acceptanceCriteria: [
        "`MULTI/EXEC`, `WATCH` va Lua farqini biladi",
        "Uzun Lua skriptning xavfini tushunadi"
      ],
      prerequisites: [
        "12.8"
      ]
    },
    {
      id: "12.10",
      title: "Pub/Sub",
      description: [
        "Pub/Sub — `PUBLISH` kanalga xabar yuboradi, `SUBSCRIBE` qilgan barcha mijozlar uni oladi. **Fire-and-forget**: obunachi o'sha paytda ulanmagan bo'lsa, xabar yo'qoladi; saqlash va tasdiqlash yo'q.",
        "",
        "Qo'llanishi: real-vaqt bildirishnomalari, cache invalidatsiya signallarini serverlar o'rtasida tarqatish, Laravel broadcasting (Reverb/Echo server'lar bilan). Kafolatlangan yetkazish kerak bo'lsa — Streams yoki haqiqiy message broker.",
        "",
        "```php",
        "Redis::publish('cache-invalidate', json_encode(['key' => \"product:{$id}\"]));",
        "",
        "Redis::subscribe(['cache-invalidate'], function (string $message) {",
        "    // lokal (APCu) cache'ni tozalash",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ko'p serverli muhitda lokal APCu cache'ni Pub/Sub signali orqali sinxron tozalashni amalga oshiring.",
      acceptanceCriteria: [
        "Pub/Sub'ning yetkazish kafolati yo'qligini biladi",
        "Pub/Sub va Streams o'rtasida tanlay oladi"
      ],
      prerequisites: [
        "12.1"
      ]
    },
    {
      id: "12.11",
      title: "Redis Queues",
      description: [
        "Laravel Redis queue driver'i List'lar (`queues:default`) va Sorted Set'lardan (`:delayed`, `:reserved` — muddat bilan) foydalanadi. Worker job'ni olganda u reserved to'plamga o'tadi; `retry_after` ichida tugallanmasa — qayta navbatga qaytadi.",
        "",
        "Muhim sozlama: `retry_after` har doim eng uzun job timeout'idan katta bo'lishi kerak, aks holda job ikki marta bajariladi. Redis'ning persistence sozlamasi job yo'qolishiga ta'sir qiladi. Horizon Redis queue'larni boshqaradi va monitoring beradi.",
        "",
        "```php",
        "// config/queue.php",
        "'redis' => [",
        "    'driver' => 'redis',",
        "    'queue' => 'default',",
        "    'retry_after' => 190,   // eng uzun job timeout (180) + zaxira",
        "    'block_for' => 5,",
        "],",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`retry_after` < timeout bo'lganda job dublikatlanishini qayta yarating va to'g'ri sozlang.",
      acceptanceCriteria: [
        "Redis queue'ning ichki tuzilmasini (list, reserved, delayed) biladi",
        "`retry_after` va `timeout` bog'liqligini tushuntira oladi"
      ],
      prerequisites: [
        "46.2"
      ]
    },
    {
      id: "12.12",
      title: "Session Storage",
      description: [
        "Ko'p serverli (load balancer ortidagi) ilovada fayl session'lar ishlamaydi — umumiy saqlash kerak: Redis (tez, TTL avtomatik), DB yoki cookie. Laravel: `SESSION_DRIVER=redis`, alohida Redis connection/DB (cache tozalanganda session'lar o'chmasligi uchun).",
        "",
        "Session'larni cache bilan bir joyda saqlash va `Cache::flush()` — barcha foydalanuvchilarni tizimdan chiqaradi. Eviction siyosati `allkeys-lru` bo'lsa, xotira to'lganda session'lar o'chirilishi mumkin — session uchun alohida instance yoki `volatile-*` siyosati.",
        "",
        "```php",
        "// config/database.php",
        "'redis' => [",
        "    'cache'   => ['database' => 1, /* ... */],",
        "    'session' => ['database' => 2, /* ... */],",
        "],",
        "// .env",
        "SESSION_DRIVER=redis",
        "SESSION_CONNECTION=session",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Session va cache'ni alohida Redis DB'larga ajrating va `cache:clear` session'larga ta'sir qilmasligini tekshiring.",
      acceptanceCriteria: [
        "Nega session alohida saqlanishi kerakligini tushuntira oladi",
        "Eviction siyosatining session'larga ta'sirini biladi"
      ],
      prerequisites: [
        "12.15"
      ]
    },
    {
      id: "12.13",
      title: "Rate Limiting",
      description: [
        "Redis tez atomik hisoblagichlari tufayli rate limiting uchun ideal. Algoritmlar: **fixed window** (`INCR` + `EXPIRE` — sodda, chegarada portlash), **sliding window log** (Sorted Set — aniq, xotira ko'p), **sliding window counter**, **token bucket** (Lua bilan).",
        "",
        "Laravel: `RateLimiter::for('api', fn ($r) => Limit::perMinute(60)->by($r->user()?->id ?: $r->ip()))` va `throttle:api` middleware; `RateLimiter::attempt()` ixtiyoriy amallar uchun. Javobda `429` va `Retry-After` header.",
        "",
        "```php",
        "RateLimiter::for('login', fn (Request $r) => [",
        "    Limit::perMinute(5)->by($r->input('email').'|'.$r->ip()),",
        "    Limit::perMinute(100)->by($r->ip()),",
        "]);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Login uchun email+IP va IP bo'yicha ikki darajali rate limit yozing va 429 javobini testlang.",
      acceptanceCriteria: [
        "Fixed va sliding window farqini biladi",
        "Kalitni (user, IP, email) to'g'ri tanlaydi"
      ],
      prerequisites: [
        "12.8"
      ]
    },
    {
      id: "12.14",
      title: "Redis Persistence: RDB va AOF",
      description: [
        "**RDB** — vaqti-vaqti bilan butun ma'lumotning snapshot'i (`BGSAVE`, fork orqali): ixcham, tez restart, lekin oxirgi snapshot'dan keyingi ma'lumot yo'qolishi mumkin. **AOF** — har bir yozish buyrug'i log'ga: `appendfsync everysec` (1 soniyagacha yo'qotish, muvozanat), `always` (sekin), `no`. AOF qayta yoziladi (rewrite) va kattalashadi.",
        "",
        "Tanlov: sof cache — persistence o'chiq bo'lishi mumkin; queue/session — AOF `everysec` (+ RDB). Fork katta xotirada kechikish va copy-on-write xotira o'sishiga olib keladi — serverda zaxira RAM qoldiring.",
        "",
        "```conf",
        "save 900 1",
        "appendonly yes",
        "appendfsync everysec",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Queue uchun ishlatiladigan Redis'ni restart qilib, persistence sozlamalari job yo'qolishiga ta'sirini sinang.",
      acceptanceCriteria: [
        "RDB va AOF ning ishonchlilik/tezlik murosasini biladi",
        "Ishlatilishiga qarab persistence tanlaydi"
      ],
      prerequisites: [
        "12.1"
      ]
    },
    {
      id: "12.15",
      title: "Eviction Policies",
      description: [
        "`maxmemory` ga yetganda Redis siyosatga ko'ra kalitlarni o'chiradi: `noeviction` (yozish xato beradi — queue uchun to'g'ri), `allkeys-lru`/`allkeys-lfu` (sof cache uchun), `volatile-lru`/`volatile-lfu`/`volatile-ttl` (faqat TTL'li kalitlar), `allkeys-random`.",
        "",
        "Queue va cache'ni bir instance'da noto'g'ri siyosat bilan ishlatish — job'lar jim o'chib ketishiga olib keladi. Tavsiya: cache uchun alohida instance (`allkeys-lfu`), queue/session uchun alohida (`noeviction`). `evicted_keys` metrikasini kuzating.",
        "",
        "```conf",
        "maxmemory 2gb",
        "maxmemory-policy allkeys-lfu",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Cache va queue uchun alohida Redis instance'lar sozlab, har biriga mos eviction siyosatini asoslang.",
      acceptanceCriteria: [
        "LRU va LFU farqini biladi",
        "Queue Redis'ida `noeviction` zarurligini tushuntira oladi"
      ],
      prerequisites: [
        "12.14"
      ]
    },
    {
      id: "12.16",
      title: "Memory Management",
      description: [
        "Xotirani tejash: qisqa kalit nomlari (millionlab kalitda sezilarli), kichik hash/list/set'lar uchun ixcham kodlashlar (listpack, intset — `hash-max-listpack-entries`), ko'p mayda kalit o'rniga hash'larga guruhlash, katta qiymatlarni siqish (Laravel `serializer`/`compression` opsiyalari: igbinary, lz4).",
        "",
        "Tahlil: `INFO memory` (`used_memory`, `mem_fragmentation_ratio`), `MEMORY USAGE key`, `redis-cli --bigkeys`/`--memkeys`. Katta kalitlarni (big keys) o'chirish bloklashi mumkin — `UNLINK` (asinxron) ishlating. Fragmentatsiya yuqori bo'lsa `activedefrag`.",
        "",
        "```bash",
        "redis-cli INFO memory | grep -E 'used_memory_human|fragmentation_ratio'",
        "redis-cli --bigkeys",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "`--bigkeys` bilan eng katta kalitlarni toping va ularni hash'ga bo'lish yoki siqish orqali kichraytiring.",
      acceptanceCriteria: [
        "Xotira metrikalarini o'qiy oladi",
        "`DEL` va `UNLINK` farqini biladi"
      ],
      prerequisites: [
        "12.15"
      ]
    },
    {
      id: "12.17",
      title: "Redis Replication",
      description: [
        "Replikatsiya asinxron: replica `REPLICAOF host port` bilan primary'ga ulanadi, avval to'liq sinxronlash (RDB), keyin buyruqlar oqimi. Qisqa uzilishdan keyin qisman resinxronlash (replication backlog). Replica'lar default read-only.",
        "",
        "Asinxron bo'lgani uchun primary yiqilsa, oxirgi yozuvlar yo'qolishi mumkin (`WAIT` buyrug'i ma'lum sondagi replica tasdig'ini kutadi, lekin to'liq kafolat emas). Replica'dan o'qish — eskirgan ma'lumot ehtimoli. Avtomatik failover uchun Sentinel yoki Cluster kerak.",
        "",
        "```bash",
        "redis-cli INFO replication",
        "# role:master, connected_slaves:2, master_repl_offset:...",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Primary + 2 replica sozlab, primary'ni to'xtatganda ma'lumot yo'qolishi va o'qish xatti-harakatini kuzating.",
      acceptanceCriteria: [
        "Redis replikatsiyasi asinxron ekanini va oqibatlarini biladi",
        "`WAIT` buyrug'ining cheklovlarini tushunadi"
      ],
      prerequisites: [
        "12.14"
      ]
    },
    {
      id: "12.18",
      title: "Sentinel va Cluster",
      description: [
        "**Sentinel** — yuqori mavjudlik: primary'ni kuzatadi, yiqilganda replica'ni primary qilib saylaydi (kvorum orqali) va mijozlarga yangi manzilni beradi. Ma'lumot bitta primary'da — masshtablash yo'q.",
        "",
        "**Cluster** — sharding + HA: 16384 hash slot tugunlar o'rtasida taqsimlanadi, har primary'ning replica'si bor. Cheklov: bir nechta kalitli buyruqlar (MULTI, Lua, `MGET`) faqat bitta slot'dagi kalitlar bilan — hash tag'lar (`{user:1}:cart`). Laravel ikkalasini ham `config/database.php` orqali qo'llab-quvvatlaydi; Horizon cluster'da hash tag'lar bilan ishlaydi. Boshqariladigan servislar (ElastiCache, Memorystore) operatsion yukni kamaytiradi.",
        "",
        "```php",
        "'options' => ['cluster' => 'redis', 'prefix' => '{app}:'],",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Docker'da 3 tugunli Sentinel sozlab, failover paytida Laravel ilovasining xatti-harakatini kuzating.",
      acceptanceCriteria: [
        "Sentinel va Cluster vazifalarini farqlay oladi",
        "Cluster'da hash tag zaruratini tushuntira oladi"
      ],
      prerequisites: [
        "12.17"
      ]
    },
    {
      id: "12.19",
      title: "Redis Monitoring va Troubleshooting",
      description: [
        "Asosiy metrikalar: `used_memory` va `maxmemory` nisbati, `evicted_keys`, `keyspace_hits/misses` (hit ratio), `connected_clients`, `instantaneous_ops_per_sec`, `blocked_clients`, replication lag, `rejected_connections`.",
        "",
        "Diagnostika: `SLOWLOG GET` (sekin buyruqlar), `LATENCY DOCTOR`, `CLIENT LIST`, `redis-cli --latency`, `MONITOR` (production'da juda qisqa vaqt — og'ir!). Tipik muammolar: `KEYS *`, katta kalitlar, uzun Lua skriptlar, fork kechikishi, tarmoq. Prometheus `redis_exporter` + Grafana.",
        "",
        "```bash",
        "redis-cli SLOWLOG GET 10",
        "redis-cli INFO stats | grep -E 'keyspace_(hits|misses)|evicted_keys'",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Redis uchun monitoring dashboard va alert'lar (xotira, hit ratio, eviction) sozlang.",
      acceptanceCriteria: [
        "Asosiy Redis metrikalarini izohlay oladi",
        "`SLOWLOG` va latency vositalari bilan muammo topadi"
      ],
      prerequisites: [
        "12.16"
      ]
    },
    {
      id: "12.20",
      title: "Cache Consistency",
      description: [
        "Cache va DB o'rtasida izchillik muammolari: yozish va invalidatsiya orasidagi race (eski qiymat qayta yoziladi), tranzaksiya rollback'dan keyin yangilangan cache, replica lag tufayli eski ma'lumotni keshlash, bir nechta cache qatlami (lokal + Redis).",
        "",
        "Yondashuvlar: commit'dan keyin invalidatsiya, qisqa TTL \"xavfsizlik to'ri\" sifatida, versiyalangan kalitlar, ikki marta o'chirish (delayed double delete), CDC (binlog/WAL asosida invalidatsiya), kritik ma'lumot (balans, zaxira) uchun cache'dan umuman foydalanmaslik. Biznes bilan qabul qilinadigan eskirish darajasini kelishish.",
        "",
        "```php",
        "DB::transaction(function () use ($product, $data) {",
        "    $product->update($data);",
        "    DB::afterCommit(fn () => Cache::forget(\"product:{$product->id}\"));",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Cache va DB nomuvofiqligi yuzaga keladigan race'ni testda qayta yarating va yechimni joriy qiling.",
      acceptanceCriteria: [
        "Asosiy nomuvofiqlik stsenariylarini biladi",
        "Ma'lumot turiga qarab izchillik darajasini tanlaydi"
      ],
      prerequisites: [
        "12.5"
      ]
    }
  ]
});
