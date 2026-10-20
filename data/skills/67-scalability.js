/* 67 · Scalability
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 67,
  slug: "scalability",
  title: "Scalability",
  group: "architecture",
  description: "Masshtablanuvchanlik — yuklama o'sganda tizim performance'ini saqlab qolish qobiliyati, resurs qo'shish orqali. Senior dasturchi tizimni stateless qilib, tor joylarni aniqlab, kesh, navbat, replika va partitioning yordamida bosqichma-bosqich masshtablaydi — va masshtablashni o'lchov va real ehtiyojga asoslaydi, \"Google masshtabi\" uchun oldindan emas.",
  subskills: [
    {
      id: "67.1",
      title: "Vertical Scaling",
      description: [
        "Vertikal masshtablash — mavjud serverga ko'proq resurs (CPU, RAM, tezroq disk) qo'shish. Afzalliklari: kod va arxitektura o'zgarmaydi, tez, bitta DB uchun ko'pincha eng oddiy yechim. Kamchiliklari: apparat chegarasi, narx eksponensial o'sadi, yagona nosozlik nuqtasi qoladi, ko'pincha qayta yuklash (downtime) talab qiladi.",
        "",
        "Laravel uchun: DB serverini kuchaytirish (RAM — buffer pool uchun), FPM worker'lari sonini oshirish uchun RAM. Ko'p hollarda birinchi qadam — lekin oxirgisi emas.",
        "",
        "```text",
        "DB: 4 vCPU/16 GB → 16 vCPU/64 GB: buffer pool butun ishchi to'plamni sig'diradi → p95 3x tushdi",
        "Chegara: eng katta instance ham yetmasa → replika, partitioning",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "DB serverini vertikal masshtablashning foydasini (buffer pool, hit ratio) o'lchov bilan baholang.",
      acceptanceCriteria: [
        "Vertikal masshtablash afzallik va chegaralarini biladi",
        "Uni birinchi oddiy qadam sifatida qo'llaydi"
      ],
      prerequisites: [
        "66.10"
      ]
    },
    {
      id: "67.2",
      title: "Horizontal Scaling",
      description: [
        "Gorizontal masshtablash — bir xil serverlar sonini oshirish va yuklamani ular o'rtasida taqsimlash. Laravel app qatlami uchun asosiy usul: N ta bir xil app server load balancer ortida. Shartlar: stateless ilova (67.3), umumiy session/kesh (Redis), umumiy fayl saqlash (S3), bitta scheduler (`onOneServer`), umumiy navbat.",
        "",
        "Afzalliklari: deyarli chiziqli o'sish, chidamlilik (bir server ishdan chiqsa boshqalari ishlaydi), autoscaling. DB va holatli komponentlarni gorizontal masshtablash ancha murakkab.",
        "",
        "```text",
        "LB → [app-1] [app-2] [app-3] ... [app-N]   (bir xil image, stateless)",
        "          ↘        ↓        ↙",
        "       Redis (session, cache, queue)   PostgreSQL   S3",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilovani ikki app server'da ishlashga tayyorlang va bittasini o'chirganda xizmat davom etishini sinang.",
      acceptanceCriteria: [
        "Gorizontal masshtablash shartlarini biladi",
        "Laravel ilovasini ko'p serverga tayyorlaydi"
      ],
      prerequisites: [
        "67.3"
      ]
    },
    {
      id: "67.3",
      title: "Stateless Applications",
      description: [
        "Stateless ilova — server so'rovlar orasida lokal holat saqlamaydi: har so'rovni istalgan server bajarishi mumkin. Laravel'da holat manbalari va yechimlar: session (`file` → `redis`/`database`), kesh (`file` → `redis`), yuklangan fayllar (lokal disk → S3), navbat (`sync` → `redis`), lock'lar (Redis), scheduler (`onOneServer`), Octane'da — static/singleton holat.",
        "",
        "Stateless — gorizontal masshtablash, autoscaling, rolling deploy va konteynerlarning asosi.",
        "",
        "```env",
        "SESSION_DRIVER=redis",
        "CACHE_STORE=redis",
        "QUEUE_CONNECTION=redis",
        "FILESYSTEM_DISK=s3",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilovadagi barcha lokal holat manbalarini toping va ularni umumiy saqlashga ko'chiring.",
      acceptanceCriteria: [
        "Laravel'dagi holat manbalarini biladi",
        "Ilovani to'liq stateless qiladi"
      ],
      prerequisites: [
        "54.12"
      ]
    },
    {
      id: "67.4",
      title: "Load Balancing",
      description: [
        "Load balancer — so'rovlarni stateless serverlar o'rtasida taqsimlash: algoritm (round-robin, least connections), health check'lar (nosoz serverni chiqarish), TLS terminatsiya, connection draining (deploy paytida joriy so'rovlarni tugatish), sticky session — stateless ilovada kerak emas (va kerak bo'lmasligi kerak).",
        "",
        "Laravel uchun: `TrustProxies` (haqiqiy IP va HTTPS), health endpoint (`/up`), graceful deploy (serverni LB'dan chiqarish → deploy → qaytarish yoki rolling update).",
        "",
        "```nginx",
        "upstream app { least_conn; server 10.0.1.11:80 max_fails=3 fail_timeout=10s; server 10.0.1.12:80 max_fails=3 fail_timeout=10s; }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Load balancer orqali rolling deploy qilib, connection draining bilan uzilishsiz o'tishni tekshiring.",
      acceptanceCriteria: [
        "LB'ning masshtablashdagi rolini biladi",
        "Health check va draining'ni sozlaydi"
      ],
      prerequisites: [
        "41.14"
      ]
    },
    {
      id: "67.5",
      title: "Database Read Replicas",
      description: [
        "O'qish og'ir ilovalarda DB yuklamasining katta qismi o'qish — read replika'lar uni taqsimlaydi: Laravel `read`/`write` konfiguratsiyasi, `sticky` (yozgandan keyin shu so'rovda primary'dan o'qish), og'ir hisobotlar uchun alohida replika ulanishi.",
        "",
        "Cheklovlar: yozishni masshtablamaydi (primary bitta), replication lag — eskirgan o'qishlar (muhim o'qishlar primary'dan), replika'lar soni bilan primary'ga yuklama (replikatsiya oqimi). Lag monitoringi va alert'lar majburiy.",
        "",
        "```php",
        "'pgsql' => [",
        "    'read' => ['host' => [env('DB_READ_HOST_1'), env('DB_READ_HOST_2')]],",
        "    'write' => ['host' => [env('DB_WRITE_HOST')]],",
        "    'sticky' => true,",
        "],",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Read replika'larni ulab, o'qish yuklamasining primary'dan replika'larga o'tganini metrikalar bilan tasdiqlang.",
      acceptanceCriteria: [
        "Replika'larning foydasi va cheklovlarini biladi",
        "Lag'ga sezgir o'qishlarni primary'ga yo'naltiradi"
      ],
      prerequisites: [
        "15.15"
      ]
    },
    {
      id: "67.6",
      title: "Database Partitioning",
      description: [
        "Bitta DB ichida partitioning — katta jadvalni (log'lar, event'lar, tranzaksiyalar) kichik qismlarga bo'lish: so'rovlar faqat kerakli partitsiyani o'qiydi (pruning), eski ma'lumotni tez o'chirish (`DROP PARTITION`), indekslar kichik, maintenance oson. Odatda vaqt bo'yicha (oylik) yoki ro'yxat bo'yicha (region).",
        "",
        "Masshtablash nuqtai nazaridan — sharding'dan oldingi qadam: bir server ichida katta hajmni boshqarish. So'rovlar partition kalitini ishlatishi kerak, aks holda foydasiz.",
        "",
        "```sql",
        "CREATE TABLE events (id bigint, created_at timestamptz NOT NULL, payload jsonb) PARTITION BY RANGE (created_at);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Eng katta o'suvchi jadvalni vaqt bo'yicha partitsiyalash rejasini va migratsiyasini tayyorlang.",
      acceptanceCriteria: [
        "Partitioning'ning masshtablashdagi rolini biladi",
        "Partitioning va sharding farqini tushunadi"
      ],
      prerequisites: [
        "11.16"
      ]
    },
    {
      id: "67.7",
      title: "Sharding",
      description: [
        "Sharding — ma'lumotni bir nechta mustaqil DB serverlariga bo'lish (gorizontal partitioning serverlar bo'ylab): yozishni ham masshtablaydi. Shard kaliti (tenant_id, user_id hash) — eng muhim qaror: asosiy so'rovlar bitta shard'ga tushishi, yuklama teng taqsimlanishi kerak.",
        "",
        "Narxi juda yuqori: shard'lararo so'rovlar va JOIN'lar, tranzaksiyalar faqat shard ichida, resharding (consistent hashing yoki directory), operatsion murakkablik. Multi-tenant SaaS'da tenant bo'yicha sharding — tabiiy variant. Avval: optimallashtirish, kesh, replika, vertikal, partitioning; yoki taqsimlangan DB (Vitess, Citus, CockroachDB).",
        "",
        "```text",
        "tenant_id → shard xaritasi (directory jadvali): katta tenantlar alohida shard'da",
        "Laravel: tenant aniqlangach DB ulanishi dinamik tanlanadi (stancl/tenancy kabi)",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Multi-tenant ilova uchun tenant asosidagi sharding dizaynini va uning cheklovlarini hujjatlashtiring.",
      acceptanceCriteria: [
        "Sharding narxi va shard kaliti tanlovini biladi",
        "Sharding'ni oxirgi chora sifatida ko'radi"
      ],
      prerequisites: [
        "66.13"
      ]
    },
    {
      id: "67.8",
      title: "Caching",
      description: [
        "Masshtablash uchun kesh — eng samarali va arzon vosita: o'qish yuklamasini DB'dan olib tashlaydi (hit ratio 90%+ — DB yuklamasi 10x kamayadi). Qatlamlar: CDN (statik va ommaviy sahifalar), HTTP kesh, ilova keshi (Redis — so'rov natijalari, hisoblangan qiymatlar), lokal (so'rov ichida memo).",
        "",
        "Masshtabda kesh muammolari: stampede (lock, stale-while-revalidate), avalanche (jitter), kesh nosozligi (DB bardosh bera oladimi?), invalidatsiya. Kesh — tizimning muhim qismi, uni monitoring qilish shart.",
        "",
        "```php",
        "$product = Cache::flexible(\"product:{$id}\", [300, 3600], fn () => Product::with('media')->findOrFail($id));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Eng ko'p o'qiladigan 3 ta endpoint'ni keshlab, DB yuklamasi va throughput o'zgarishini o'lchang.",
      acceptanceCriteria: [
        "Keshning masshtablashdagi rolini biladi",
        "Masshtabdagi kesh muammolarini boshqaradi"
      ],
      prerequisites: [
        "54.9"
      ]
    },
    {
      id: "67.9",
      title: "Queue-Based Workloads",
      description: [
        "Navbatlar masshtablashda: og'ir ishlarni so'rovdan olib tashlash (app serverlar tez javob beradi), yuklama cho'qqilarini tekislash (navbat buffer vazifasini bajaradi), worker'larni app serverlardan mustaqil masshtablash (backlog bo'yicha autoscaling), turli ish turlari uchun alohida navbatlar va worker pool'lar.",
        "",
        "Worker'larni masshtablash chegaralari: DB ulanishlari, tashqi API limitlari, lock raqobati. Backlog va kutish vaqti — masshtablash signallari.",
        "",
        "```text",
        "Navbat backlog > 1000 yoki wait time > 60 s → worker'lar 4 → 12 (autoscaling)",
        "Backlog < 100 (10 daq) → 4 ga qaytarish",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Worker'larni backlog asosida avtomatik masshtablash qoidalarini (Horizon auto-balance yoki konteyner autoscaling) sozlang.",
      acceptanceCriteria: [
        "Navbatlarning masshtablashdagi rolini biladi",
        "Worker masshtablash chegaralarini hisobga oladi"
      ],
      prerequisites: [
        "47.4"
      ]
    },
    {
      id: "67.10",
      title: "Async Processing",
      description: [
        "Asinxron qayta ishlash — foydalanuvchi kutishi shart bo'lmagan barcha ishlarni fonga: email, bildirishnomalar, indekslash, statistika, integratsiyalar, fayl qayta ishlash. Natija: so'rov vaqti qisqaradi → har app server ko'proq so'rovga xizmat qiladi → kamroq server kerak.",
        "",
        "Masshtabda: batch'lash (1000 ta alohida job o'rniga bitta batch), debounce (tez-tez o'zgaradigan narsalar uchun bitta yangilash), event-driven fan-out, eventual consistency bilan ishlashni o'rganish.",
        "",
        "```php",
        "// So'rovda: faqat zarur yozuv",
        "$order = $placeOrder->handle($data);",
        "// Qolgani asinxron (listener'lar ShouldQueue)",
        "OrderPlaced::dispatch($order);   // email, CRM sync, analytics, search index",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Endpoint'dagi barcha \"kutish shart emas\" ishlarni asinxronga ko'chirib, RPS sig'imining o'sishini o'lchang.",
      acceptanceCriteria: [
        "Asinxronlikning sig'imga ta'sirini biladi",
        "Batch va debounce usullarini qo'llaydi"
      ],
      prerequisites: [
        "53.11"
      ]
    },
    {
      id: "67.11",
      title: "Connection Pooling",
      description: [
        "Masshtablashda ulanishlar tez-tez tor joy bo'ladi: app serverlar va worker'lar soni oshgan sari DB/Redis ulanishlari ko'payadi va DB limitiga (va xotirasiga) yetadi. Yechim: pooler (PgBouncer, ProxySQL, RDS Proxy), ulanishlar byudjetini hisoblash va boshqarish, Octane'da ulanishlarni qayta ishlatish.",
        "",
        "Hisob har masshtablash qadamida qayta ko'rib chiqiladi: \"app serverlarni 2x qilsak, DB ulanishlari ham 2x bo'ladimi?\"",
        "",
        "```text",
        "Hozir: 4 server × 50 FPM + 20 worker = 220 ulanish (limit 300)",
        "Rejada: 10 server → 520 ulanish ❌ → PgBouncer (transaction pooling, 60 server ulanish) ✅",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Masshtablash rejasiga ko'ra ulanishlar sonini prognoz qilib, kerak bo'lsa pooler qo'shing.",
      acceptanceCriteria: [
        "Ulanishlarning masshtablash tor joyi ekanini biladi",
        "Pooler bilan muammoni hal qiladi"
      ],
      prerequisites: [
        "15.9"
      ]
    },
    {
      id: "67.12",
      title: "Bottleneck Analysis",
      description: [
        "Masshtablash — tor joylarni ketma-ket yo'qotish: yuklama oshganda qaysi resurs birinchi to'yinadi (app CPU, FPM worker'lari, DB CPU/IO, lock'lar, Redis, tarmoq, tashqi API)? Uni hal qilish keyingi tor joyni ochadi. Amdahl qonuni: ketma-ket (parallellashtirib bo'lmaydigan) qism umumiy tezlanishni cheklaydi — masalan, bitta \"issiq\" qator yoki global lock.",
        "",
        "Usul: load test + barcha qatlam metrikalari, tor joyni tuzatish, qayta test. Har iteratsiyada raqamlarni hujjatlashtirish.",
        "",
        "```text",
        "Iteratsiya 1: 500 RPS → DB CPU 100% → indekslar + kesh → 2000 RPS",
        "Iteratsiya 2: 2000 RPS → FPM worker'lar band (tashqi API) → navbatga → 4000 RPS",
        "Iteratsiya 3: 4000 RPS → Redis bitta thread → klaster/sharding",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Load test iteratsiyalari bilan tizimning ketma-ket tor joylarini topib, har birini hal qilish natijasini hujjatlashtiring.",
      acceptanceCriteria: [
        "Tor joylarni iterativ aniqlaydi",
        "Amdahl qonunining ta'sirini tushunadi"
      ],
      prerequisites: [
        "53.18"
      ]
    },
    {
      id: "67.13",
      title: "Throughput Planning",
      description: [
        "Throughput rejalashtirish — kutilgan yuklamani qondirish uchun kerakli sig'imni hisoblash: cho'qqi RPS (o'sish prognozi bilan), har komponentning sig'imi (o'lchangan — load test bilan), zaxira (headroom — odatda 30–50%, bir server/AZ yo'qolishiga ham). Little qonuni: parallel so'rovlar = throughput × kechikish → kerakli worker'lar soni.",
        "",
        "Natija: har qatlam uchun instance'lar soni, autoscaling chegaralari, DB o'lchami, cho'qqi tadbirlariga tayyorgarlik (aksiyalar, kampaniyalar).",
        "",
        "```text",
        "Cho'qqi 3000 RPS, o'rtacha javob 80 ms → parallel ~240 so'rov",
        "Har server 40 FPM worker → 6 server + 50% zaxira = 9 server",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Kelgusi 12 oy uchun throughput prognozini qilib, har qatlam uchun kerakli sig'imni hisoblang.",
      acceptanceCriteria: [
        "Little qonuni bilan sig'imni hisoblaydi",
        "Headroom va prognozni hisobga oladi"
      ],
      prerequisites: [
        "66.4"
      ]
    },
    {
      id: "67.14",
      title: "Load Testing",
      description: [
        "Masshtablanuvchanlikni tasdiqlash — load test: yuklamani bosqichma-bosqich oshirib, throughput va kechikish egri chizig'ini kuzatish (chiziqli o'sish qayerda to'xtaydi — \"tizza nuqtasi\"), serverlar qo'shilganda sig'im proporsional o'sadimi (masshtablash koeffitsienti), cho'qqi va uzoq muddatli (soak) testlar.",
        "",
        "Real stsenariylar, production'ga o'xshash ma'lumot va infratuzilma, monitoring bilan. Natijalar — sig'im rejalashtirish va SLO'lar uchun asos.",
        "",
        "```js",
        "export const options = {",
        "  stages: [",
        "    { duration: '5m', target: 500 }, { duration: '5m', target: 1500 },",
        "    { duration: '5m', target: 3000 }, { duration: '5m', target: 0 },",
        "  ],",
        "  thresholds: { http_req_duration: ['p(95)<400'], http_req_failed: ['rate<0.01'] },",
        "};",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bosqichma-bosqich oshib boruvchi load test bilan tizimning \"tizza nuqtasi\"ni va masshtablash koeffitsientini aniqlang.",
      acceptanceCriteria: [
        "Masshtablanuvchanlikni load test bilan o'lchaydi",
        "Tizza nuqtasini topadi"
      ],
      prerequisites: [
        "53.17"
      ]
    },
    {
      id: "67.15",
      title: "Autoscaling",
      description: [
        "Autoscaling — yuklamaga qarab instance'lar sonini avtomatik o'zgartirish: metrikalar (CPU, so'rovlar soni, navbat backlog'i, custom), minimal va maksimal chegaralar, cooldown (tebranishning oldini olish), oldindan rejalashtirilgan masshtablash (ma'lum cho'qqilar uchun). Platformalar: AWS ASG, ECS/K8s HPA, KEDA (navbat asosida), Laravel Vapor/Cloud.",
        "",
        "Shartlar: stateless, tez ishga tushish (image tayyor, bootstrap tez — `optimize`), health check'lar, DB va boshqa umumiy resurslar yangi instance'lar yuklamasiga bardosh berishi.",
        "",
        "```yaml",
        "# Kubernetes HPA",
        "spec:",
        "  minReplicas: 3",
        "  maxReplicas: 20",
        "  metrics:",
        "    - type: Resource",
        "      resource: { name: cpu, target: { type: Utilization, averageUtilization: 60 } }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "App va worker qatlamlari uchun autoscaling qoidalarini sozlab, yuklama testida masshtablanishini kuzating.",
      acceptanceCriteria: [
        "Autoscaling metrikalari va chegaralarini biladi",
        "Umumiy resurslar ta'sirini hisobga oladi"
      ],
      prerequisites: [
        "67.3"
      ]
    },
    {
      id: "67.16",
      title: "Backpressure",
      description: [
        "Backpressure — tizim o'z sig'imidan ortiq yuklamani qabul qilmasdan, uni chegaralash va yuqoriga \"bosim\" sifatida qaytarish: navbat uzunligi limiti, rate limiting, `429`/`503` + `Retry-After`, load shedding (past ustuvorlikli so'rovlarni rad etish), iste'molchilar tezligiga moslashuvchi ishlab chiqaruvchilar.",
        "",
        "Backpressure'siz: navbatlar cheksiz o'sadi, kechikish oshadi, xotira tugaydi, oxiri butun tizim qulaydi. Bilan — tizim chegarada barqaror ishlaydi va qisman xizmat ko'rsatadi.",
        "",
        "```php",
        "if (Queue::size('exports') > 5000) {",
        "    return response()->json(['message' => 'Tizim band, keyinroq urinib ko\\'ring'], 503)->header('Retry-After', 60);",
        "}",
        "ExportReport::dispatch($request->user()->id)->onQueue('exports');",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Og'ir asinxron endpoint'ga navbat uzunligi asosidagi backpressure qo'shib, yuklama testida barqarorlikni tekshiring.",
      acceptanceCriteria: [
        "Backpressure tushunchasini biladi",
        "Load shedding va limitlarni qo'llaydi"
      ],
      prerequisites: [
        "67.9"
      ]
    },
    {
      id: "67.17",
      title: "Resource Limits",
      description: [
        "Resurs limitlari — bitta komponent yoki mijoz butun tizimni egallab olmasligi uchun: konteyner CPU/xotira limitlari, FPM `max_children`, `memory_limit`, so'rov hajmi va vaqti limitlari, pagination maksimal hajmi, so'rovlar (`LIMIT`, timeout — `statement_timeout`), rate limit'lar mijoz bo'yicha, navbat uzunligi.",
        "",
        "Limitlar barqarorlik va bashorat qilinuvchanlik beradi: ortiqcha yuklamada tizim nazorat ostida degradatsiyaga uchraydi, qulamaydi. \"Noisy neighbor\" muammosiga qarshi (multi-tenant).",
        "",
        "```sql",
        "ALTER ROLE app SET statement_timeout = '5s';   -- PostgreSQL: qotib qolgan so'rovlar uchun",
        "```",
        "```php",
        "'per_page' => ['integer', 'max:100'],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilovaning barcha qatlamlarida yetishmayotgan resurs limitlarini aniqlab qo'shing.",
      acceptanceCriteria: [
        "Turli qatlamlardagi limitlarni biladi",
        "Noisy neighbor muammosiga qarshi limitlar qo'yadi"
      ],
      prerequisites: [
        "36.12"
      ]
    },
    {
      id: "67.18",
      title: "Capacity Planning",
      description: [
        "Sig'imni rejalashtirish — kelajakdagi talabga oldindan tayyorlanish: biznes o'sish prognozi (foydalanuvchilar, buyurtmalar, ma'lumot), joriy foydalanish trendlari (metrikalardan), har komponent sig'im chegaralari (load testdan), tayyorgarlik vaqti (yangi apparat, DB migratsiyasi — haftalar), narx.",
        "",
        "Muntazam jarayon (har chorak): trendlarni ko'rib chiqish, \"qachon tugaydi\" prognozi (disk, DB CPU, ulanishlar), harakatlar rejasi. Katta tadbirlar (aksiya, TV reklama) uchun alohida tayyorgarlik va load test.",
        "",
        "```text",
        "DB disk: 1.2 TB / 2 TB, o'sish 60 GB/oy → ~13 oyda to'ladi → 9 oyda arxivlash yoki kengaytirish",
        "DB CPU cho'qqida 55%, trafik +8%/oy → ~6 oyda 80% → read replika yoki instance oshirish rejasi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Asosiy resurslar uchun \"qachon tugaydi\" prognozini tuzib, choraklik sig'im rejasini yozing.",
      acceptanceCriteria: [
        "Sig'im rejalashtirish jarayonini biladi",
        "Trend va chegaralardan prognoz qiladi"
      ],
      prerequisites: [
        "67.13"
      ]
    },
    {
      id: "67.19",
      title: "Scalability Trade-offs",
      description: [
        "Masshtablash murosalari: murakkablik (har yangi komponent — ekspluatatsiya va xato manbai), izchillik (replika'lar va kesh — eskirgan ma'lumot), narx (ko'proq resurs, boshqariladigan servislar), dasturchilar tezligi (taqsimlangan tizimda ishlash sekinroq), ekspluatatsiya yuki.",
        "",
        "Tamoyil: hozirgi va yaqin kelajak (6–12 oy) ehtiyoji uchun masshtablash, \"kelajakdagi 100x\" uchun emas; eng oddiy yechimdan boshlash (optimallashtirish → kesh → vertikal → replika → navbat → partitioning → sharding); har qadamni o'lchov bilan asoslash.",
        "",
        "```text",
        "Masshtablash zinapoyasi (oddiydan murakkabga):",
        "1. So'rov va indeks optimallashtirish  2. Kesh  3. Vertikal  4. Gorizontal app + navbat",
        "5. Read replika  6. Partitioning  7. Servis ajratish  8. Sharding",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimingiz hozir masshtablash zinapoyasining qaysi pog'onasida ekanini va keyingi qadam qachon kerakligini asoslang.",
      acceptanceCriteria: [
        "Masshtablash murosalarini biladi",
        "Oddiydan murakkabga bosqichma-bosqich yondashuvni qo'llaydi"
      ],
      prerequisites: [
        "61.17"
      ]
    }
  ]
});
