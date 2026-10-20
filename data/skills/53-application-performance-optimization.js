/* 53 · Application Performance Optimization
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 53,
  slug: "application-performance-optimization",
  title: "Application Performance Optimization",
  group: "performance",
  description: "Ilova performance'ini optimallashtirish — tizimli jarayon: o'lchash, tor joyni topish, uni bartaraf etish va natijani tasdiqlash. Laravel ilovalarida asosiy tor joylar odatda DB so'rovlari, keshning yo'qligi, sinxron tashqi chaqiruvlar va bootstrap. Senior dasturchi taxmin bilan emas, ma'lumot bilan optimallashtiradi va percentillar tilida gapiradi.",
  subskills: [
    {
      id: "53.1",
      title: "Performance Profiling",
      description: [
        "Profiling — kod qayerda vaqt va resurs sarflashini o'lchash. Darajalar: **APM** (production'da so'rovlar, tranzaksiyalar, DB va tashqi chaqiruvlar — Sentry Performance, New Relic, Datadog, Inspector), **profilerlar** (funksiya darajasida — Blackfire, Xdebug profiler, SPX, Tideways), **Laravel vositalari** (Debugbar, Telescope, Clockwork — so'rovlar va vaqt).",
        "",
        "Qoida: optimallashtirishdan oldin profiling — intuitsiya ko'pincha xato qiladi. Production'ga yaqin ma'lumot va yuklama bilan; flame graph'lar eng ko'p vaqt olgan yo'llarni ko'rsatadi.",
        "",
        "```bash",
        "# SPX (yengil profiler) bilan",
        "SPX_ENABLED=1 SPX_REPORT=full php artisan app:heavy-report",
        "# Blackfire",
        "blackfire curl https://staging.example.uz/api/orders",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Eng sekin endpoint'ni profiler bilan tahlil qilib, flame graph'dan vaqtning 80% ini olgan joylarni aniqlang.",
      acceptanceCriteria: [
        "Profiling vositalari darajalarini biladi",
        "Optimallashtirishni profiling'dan boshlaydi"
      ],
      prerequisites: [
        "6.16"
      ]
    },
    {
      id: "53.2",
      title: "Response Time Analysis",
      description: [
        "Javob vaqtini tahlil qilish: umumiy vaqtni qismlarga ajratish — tarmoq/TLS, Nginx kutish, PHP bootstrap, ilova mantiqi, DB so'rovlari (soni va vaqti), kesh, tashqi API'lar, serializatsiya, view rendering. Har qismning ulushi optimallashtirish yo'nalishini ko'rsatadi.",
        "",
        "O'rtacha emas, percentillar (p50, p95, p99) — foydalanuvchilarning eng yomon tajribasini ko'rsatadi. Server-Timing header'i brauzer DevTools'da backend bosqichlarini ko'rsatadi.",
        "",
        "```php",
        "$start = hrtime(true);",
        "$orders = $this->orders->forUser($user);",
        "$dbMs = (hrtime(true) - $start) / 1e6;",
        "return response()->json($data)->header('Server-Timing', \"db;dur={$dbMs}, app;dur=\".round((microtime(true) - LARAVEL_START) * 1000));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Endpoint javobiga Server-Timing header qo'shib, vaqtni DB, kesh va ilova qismlariga ajrating.",
      acceptanceCriteria: [
        "Javob vaqtini komponentlarga ajratadi",
        "Percentillar bilan tahlil qiladi"
      ],
      prerequisites: [
        "53.20"
      ]
    },
    {
      id: "53.3",
      title: "Throughput",
      description: [
        "Throughput — vaqt birligida qayta ishlangan so'rovlar (RPS) yoki job'lar. Kechikish bilan bog'liq (Little qonuni: parallel so'rovlar = throughput × o'rtacha kechikish). PHP-FPM'da throughput chegarasi ≈ `max_children / o'rtacha javob vaqti` — har so'rovni tezlashtirish throughput'ni ham oshiradi.",
        "",
        "Throughput'ni oshirish: so'rovlarni tezlashtirish, worker'lar sonini oshirish (resurs imkon bersa), gorizontal masshtablash, keshlash (PHP'ga yetmasdan javob), og'ir ishlarni navbatga, Octane (bootstrap yo'q).",
        "",
        "```text",
        "max_children = 50, o'rtacha javob = 100 ms → ~500 RPS maksimal",
        "o'rtacha javob 50 ms gacha tushsa → ~1000 RPS (bir xil server)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Server throughput chegarasini nazariy hisoblab, load test bilan tasdiqlang.",
      acceptanceCriteria: [
        "Throughput va kechikish bog'liqligini biladi",
        "FPM throughput chegarasini hisoblay oladi"
      ],
      prerequisites: [
        "42.4"
      ]
    },
    {
      id: "53.4",
      title: "CPU va Memory Profiling",
      description: [
        "CPU profiling — qaysi funksiyalar protsessor vaqtini oladi (hisob-kitob, serializatsiya, regex, katta kolleksiya operatsiyalari, hydration). Xotira profiling — qayerda xotira ajratiladi va qaytarilmaydi (katta massivlar, `get()` o'rniga `lazy()` kerak bo'lgan joylar, leak'lar long-running jarayonlarda).",
        "",
        "Vositalar: Blackfire (CPU va xotira, taqqoslash), SPX, Xdebug profiler + KCachegrind, `memory_get_peak_usage()`, `Benchmark::measure()`. Xotira va CPU ko'pincha murosa: keshlash xotira evaziga CPU tejaydi.",
        "",
        "```php",
        "Benchmark::dd([",
        "    'get+map'  => fn () => Order::all()->map->total->sum(),",
        "    'db sum'   => fn () => Order::sum('total'),",
        "]);",
        "echo round(memory_get_peak_usage(true) / 1048576).' MB';",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Og'ir hisobotni CPU va xotira bo'yicha profiling qilib, eng qimmat 3 ta operatsiyani optimallashtiring.",
      acceptanceCriteria: [
        "CPU va xotira profiling farqini biladi",
        "Profiler natijalaridan optimallashtirish nomzodlarini topadi"
      ],
      prerequisites: [
        "53.1"
      ]
    },
    {
      id: "53.5",
      title: "PHP-FPM Worker Tuning",
      description: [
        "FPM sozlamalari throughput va barqarorlikni belgilaydi: `pm` rejimi (maxsus server — static), `pm.max_children` (xotiraga qarab), `pm.max_requests` (leak'larga qarshi), timeout'lar, slow log. Worker'lar yetishmasa — navbat va 504; ortiqcha — xotira tugashi.",
        "",
        "Tuning — ilova optimallashtirishdan keyin: sekin so'rovlarni tuzatish worker'lar sonini oshirishdan samaraliroq. Monitoring: `listen queue`, `max children reached`, worker xotirasi.",
        "",
        "```ini",
        "pm = static",
        "pm.max_children = 60",
        "pm.max_requests = 1000",
        "request_slowlog_timeout = 3s",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM'ni server resurslariga moslab sozlab, load test bilan oldin/keyin p95 va xatolarni solishtiring.",
      acceptanceCriteria: [
        "Asosiy FPM tuning parametrlarini biladi",
        "Tuning'ni ilova optimallashtirishdan keyin qiladi"
      ],
      prerequisites: [
        "42.18"
      ]
    },
    {
      id: "53.6",
      title: "OPcache",
      description: [
        "OPcache — PHP performance'ining eng katta \"bepul\" yutug'i: kompilyatsiya qilingan opcode'larni shared memory'da saqlaydi, har so'rovda parse va kompilyatsiyani yo'q qiladi (2–3x tezlik). Production sozlamalari: yetarli xotira va fayllar soni, `validate_timestamps=0` + deploy'da reload, preloading (ixtiyoriy).",
        "",
        "JIT (PHP 8) — CPU-og'ir kod (matematik hisob, rasm qayta ishlash) uchun foyda beradi; odatiy I/O-og'ir web ilovada kam ta'sir. OPcache holatini kuzatish: hit rate (~99%+), xotira to'lishi, restart'lar.",
        "",
        "```php",
        "$s = opcache_get_status(false);",
        "printf(\"hit rate: %.2f%%, used: %d MB, full: %s\\n\",",
        "    $s['opcache_statistics']['opcache_hit_rate'],",
        "    $s['memory_usage']['used_memory'] / 1048576,",
        "    $s['cache_full'] ? 'ha' : 'yo\\'q');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "OPcache holatini tekshiruvchi buyruq yozing va production'da hit rate va xotira to'lishini monitoring qiling.",
      acceptanceCriteria: [
        "OPcache sozlamalari va ta'sirini biladi",
        "JIT qachon foydali ekanini tushunadi"
      ],
      prerequisites: [
        "42.15"
      ]
    },
    {
      id: "53.7",
      title: "Laravel Bootstrapping Optimization",
      description: [
        "Har so'rovda Laravel bootstrap qilinadi (FPM'da): konfiguratsiya, route'lar, provider'lar, view'lar. Optimallashtirish: `php artisan optimize` (= `config:cache`, `route:cache`, `view:cache`, `event:cache`), `composer dump-autoload --classmap-authoritative`, deferred service provider'lar, keraksiz provider va paketlarni olib tashlash, og'ir ishlarni provider `boot()` dan olib tashlash.",
        "",
        "Octane (Swoole, RoadRunner, FrankenPHP) — ilova bir marta yuklanadi va xotirada qoladi: bootstrap xarajati yo'q, juda yuqori throughput; lekin holat oqishi (singleton, static) xavfi — kodni moslashtirish kerak.",
        "",
        "```bash",
        "php artisan optimize",
        "composer dump-autoload --optimize --classmap-authoritative --no-dev",
        "php artisan about --only=cache    # keshlar holati",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production deploy'ga optimize buyruqlarini qo'shing va bootstrap vaqtini oldin/keyin o'lchang.",
      acceptanceCriteria: [
        "Laravel kesh buyruqlarini biladi",
        "Octane afzalliklari va xavflarini tushunadi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "53.8",
      title: "Eloquent Query Optimization",
      description: [
        "Eloquent so'rovlarini tezlashtirish: faqat kerakli ustunlar (`select`), eager loading (`with`, `withCount`), agregatlar DB'da (`sum`, `count`), katta hajm — `lazy()`/`chunkById()`, ommaviy amallar (`upsert`, query update), subquery select'lar, `exists()`, indekslar so'rovlarga mos, hydration'dan qochish (hisobotlar uchun `toBase()`/query builder).",
        "",
        "Har murakkab so'rovning SQL'ini va rejasini tekshirish; so'rovlar sonini test bilan cheklash.",
        "",
        "```php",
        "$customers = Customer::query()",
        "    ->select(['id', 'name'])",
        "    ->withCount(['orders as paid_orders_count' => fn ($q) => $q->where('status', 'paid')])",
        "    ->withSum(['orders as revenue' => fn ($q) => $q->where('status', 'paid')], 'total')",
        "    ->orderByDesc('revenue')",
        "    ->limit(20)",
        "    ->get();",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Dashboard'dagi Eloquent so'rovlarini optimallashtirib, so'rovlar soni va vaqtini kamida 50% kamaytiring.",
      acceptanceCriteria: [
        "Eloquent optimallashtirish usullarini biladi",
        "Natijani o'lchov bilan tasdiqlaydi"
      ],
      prerequisites: [
        "13.23"
      ]
    },
    {
      id: "53.9",
      title: "N+1 Query Prevention",
      description: [
        "N+1 — eng keng tarqalgan Laravel performance muammosi. Oldini olish: ro'yxatlar uchun eager loading, `withCount`/`withExists`, Resource'larda `whenLoaded`, dev'da `Model::preventLazyLoading()`, production'da lazy loading holatlarini loglash, so'rovlar sonini cheklovchi testlar, code review checklist'i.",
        "",
        "Yashirin manbalar: Blade komponentlari, accessor'lar ichidagi relation'lar, policy'lar ro'yxat elementlari uchun, notification `toArray()`, observer'lar.",
        "",
        "```php",
        "Model::preventLazyLoading(! app()->isProduction());",
        "Model::handleLazyLoadingViolationUsing(fn ($model, $relation) =>",
        "    Log::warning('N+1', ['model' => $model::class, 'relation' => $relation]));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Lazy loading himoyasini yoqing va topilgan barcha N+1 holatlarini tuzating.",
      acceptanceCriteria: [
        "N+1 manbalarini biladi",
        "Uning oldini olishni avtomatlashtiradi"
      ],
      prerequisites: [
        "13.12"
      ]
    },
    {
      id: "53.10",
      title: "Redis Caching",
      description: [
        "Redis keshlash — qimmat hisob-kitob va so'rovlar natijasini xotirada saqlash: `Cache::remember()`, tag'lar (`Cache::tags()` — guruhli invalidatsiya), `Cache::flexible()` (stale-while-revalidate), `Cache::memo()` (so'rov ichidagi takroriy o'qishlar uchun), atomik lock'lar.",
        "",
        "Nimani keshlash: ma'lumotnomalar, konfiguratsiyalar, og'ir agregatlar, tashqi API javoblari, hisoblangan sahifa bloklari. Kesh kalitlari aniq va versiyalangan, TTL va invalidatsiya rejasi bilan, hit ratio kuzatiladi.",
        "",
        "```php",
        "$categories = Cache::tags(['catalog'])->remember('categories:tree', now()->addHour(),",
        "    fn () => Category::with('children')->whereNull('parent_id')->get());",
        "// Kategoriya o'zgarganda",
        "Cache::tags(['catalog'])->flush();",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Eng ko'p takrorlanadigan og'ir so'rovlarni Redis'da tag'lar bilan keshlang va hit ratio'ni o'lchang.",
      acceptanceCriteria: [
        "Laravel kesh imkoniyatlarini biladi",
        "Keshlash nomzodlarini to'g'ri tanlaydi"
      ],
      prerequisites: [
        "12.4"
      ]
    },
    {
      id: "53.11",
      title: "Queue Offloading",
      description: [
        "So'rovdan og'ir yoki sekin ishlarni navbatga ko'chirish: email va bildirishnomalar, PDF/Excel generatsiya, rasm qayta ishlash, tashqi API sinxronizatsiyasi, statistika yangilash, webhook yuborish. So'rov tez javob beradi (`202 Accepted` yoki darhol natija), ish fonda.",
        "",
        "Laravel: `ShouldQueue` (job, listener, mail, notification), `dispatch()->afterResponse()` (javob yuborilgandan keyin shu jarayonda — yengil ishlar uchun, navbatsiz), `defer()` (Laravel 11+ — javobdan keyin bajarish).",
        "",
        "```php",
        "// Yengil ish — javobdan keyin, navbatsiz",
        "defer(fn () => Metrics::increment('orders.created'));",
        "// Og'ir ish — navbatda",
        "GenerateInvoicePdf::dispatch($invoice)->onQueue('documents');",
        "return response()->json(['status' => 'queued'], 202);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Endpoint'dagi sekin ishlarni `defer` va navbatga ajratib, javob vaqtini oldin/keyin o'lchang.",
      acceptanceCriteria: [
        "Navbat va `defer`/`afterResponse` farqini biladi",
        "Ko'chiriladigan ishlarni to'g'ri tanlaydi"
      ],
      prerequisites: [
        "46.1"
      ]
    },
    {
      id: "53.12",
      title: "Lazy vs Eager Loading",
      description: [
        "**Eager loading** — relation'larni oldindan, bir yo'la yuklash: ro'yxatlarda (N+1'ga qarshi) va relation albatta kerak bo'lganda. **Lazy loading** — kerak bo'lganda yuklash: bitta obyekt bilan ishlashda va relation faqat ba'zi holatlarda kerak bo'lganda — keraksiz ma'lumotni yuklamaslik.",
        "",
        "Ortiqcha eager loading ham zarar: kerak bo'lmagan relation'lar (`$with` model'da hamma joyda), juda chuqur ichma-ich yuklash — xotira va vaqt isrofi. `loadMissing()` — allaqachon yuklanmaganlarini; shartli eager loading — faqat kerakli holatda.",
        "",
        "```php",
        "// Ro'yxat: eager",
        "$orders = Order::with('customer:id,name')->latest()->paginate();",
        "// Bitta obyekt: kerak bo'lsa yuklash",
        "if ($request->boolean('with_items')) {",
        "    $order->loadMissing('items.product');",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Model'lardagi `$with` va keraksiz eager loading'larni toping, lazy yoki shartli yuklashga o'tkazing.",
      acceptanceCriteria: [
        "Eager va lazy loading'ni vaziyatga qarab tanlaydi",
        "Ortiqcha eager loading zararini tushunadi"
      ],
      prerequisites: [
        "13.11"
      ]
    },
    {
      id: "53.13",
      title: "Pagination Optimization",
      description: [
        "Katta ro'yxatlar performance'i: chuqur `OFFSET` sekin, har sahifada `COUNT(*)` qimmat. Yechimlar: cursor pagination (cheksiz lenta, API), `simplePaginate` (umumiy sonsiz), deferred join (covering indeks bilan id'lar, keyin to'liq qatorlar), umumiy sonni keshlash yoki taxminiy ko'rsatish, sahifa hajmiga chegara, tartib ustunida indeks.",
        "",
        "Admin panellarda ham — millionlab yozuvli jadvallar uchun filtrsiz \"barcha sahifalar\" ko'rinishidan qochish.",
        "",
        "```php",
        "// Cheksiz lenta",
        "Post::where('published', true)->orderByDesc('id')->cursorPaginate(30);",
        "// Admin: umumiy son keshlanadi",
        "$total = Cache::remember('orders:count', 300, fn () => Order::count());",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Katta jadval ro'yxatini cursor yoki deferred join bilan tezlashtirib, 1000-sahifa vaqtini solishtiring.",
      acceptanceCriteria: [
        "Pagination tor joylarini biladi",
        "Holatga mos yechimni qo'llaydi"
      ],
      prerequisites: [
        "15.11"
      ]
    },
    {
      id: "53.14",
      title: "HTTP Compression",
      description: [
        "HTTP siqish — JSON va HTML javoblar hajmini 70–90% kamaytiradi: sekin tarmoqlarda (mobil) yuklanish vaqtiga katta ta'sir. Gzip yoki Brotli Nginx/CDN darajasida (PHP'da emas — CPU va murakkablik). Faqat matnli turlar uchun, kichik javoblar (< 1 KB) uchun emas.",
        "",
        "Javob hajmini kamaytirishning boshqa yo'llari: faqat kerakli maydonlar (Resource'lar), pagination, `fields` parametri, takroriy ma'lumotni kamaytirish.",
        "",
        "```nginx",
        "gzip on;",
        "gzip_types application/json text/css application/javascript;",
        "gzip_min_length 1024;",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "API javoblari uchun siqishni yoqib, mobil tarmoq simulyatsiyasida yuklanish vaqtini solishtiring.",
      acceptanceCriteria: [
        "Siqishning ta'sirini biladi",
        "Siqishni to'g'ri qatlamda yoqadi"
      ],
      prerequisites: [
        "50.16"
      ]
    },
    {
      id: "53.15",
      title: "CDN",
      description: [
        "CDN — statik (va ba'zan dinamik) kontentni foydalanuvchiga yaqin edge serverlardan berish: kechikish kamayadi, origin yuklamasi tushadi, DDoS himoyasi, TLS va siqish edge'da. Statik asset'lar (Vite build, rasmlar, yuklangan fayllar S3 + CloudFront), keshlanadigan ommaviy sahifalar va API javoblari (`s-maxage`).",
        "",
        "Laravel: `ASSET_URL` (asset'lar CDN orqali), S3 fayllari uchun CDN domeni, kesh header'lari to'g'ri sozlanishi, invalidatsiya (hash'li fayl nomlari — invalidatsiya kerak emas), shaxsiy kontentni keshlamaslik (`private`).",
        "",
        "```env",
        "ASSET_URL=https://cdn.example.uz",
        "AWS_URL=https://media.example.uz",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Statik asset'lar va yuklangan rasmlarni CDN orqali bering va TTFB'ni turli hududlardan solishtiring.",
      acceptanceCriteria: [
        "CDN foydalari va qo'llanish sohalarini biladi",
        "Shaxsiy kontentni CDN keshidan himoyalaydi"
      ],
      prerequisites: [
        "54.16"
      ]
    },
    {
      id: "53.16",
      title: "Database Connection Management",
      description: [
        "DB ulanishlari performance'ga ta'sir: har yangi ulanish — TCP + TLS + autentifikatsiya (ms'lar); FPM worker'lari × serverlar = ulanishlar soni; DB limiti tugasa — xatolar. Laravel har so'rovda (FPM) bir ulanish ochadi va qayta ishlatadi; Octane va queue worker'larda ulanish uzoq yashaydi (uzilishlarga chidamlilik — avtomatik qayta ulanish).",
        "",
        "Optimallashtirish: pooler (PgBouncer, ProxySQL, RDS Proxy), read replica'lar, ulanishlar sonini hisoblash, `persistent` ulanishlardan ehtiyotkorlik, keraksiz ulanishlarni ochmaslik (kesh hit bo'lsa DB'ga tegmaslik).",
        "",
        "```php",
        "'pgsql' => [",
        "    'host' => env('DB_HOST', 'pgbouncer'),",
        "    'port' => 6432,",
        "    'options' => [PDO::ATTR_EMULATE_PREPARES => true],   // transaction pooling bilan",
        "],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilovaning DB ulanishlar byudjetini hisoblab, kerak bo'lsa pooler qo'shing va load testda ulanishlar sonini kuzating.",
      acceptanceCriteria: [
        "Ulanish narxini va limitlarini biladi",
        "Pooler va replica'lardan foydalanadi"
      ],
      prerequisites: [
        "15.9"
      ]
    },
    {
      id: "53.17",
      title: "Load Testing",
      description: [
        "Load testing — tizimni real yoki kutilgan yuklama ostida sinash: maksimal throughput, kechikish percentillari yuklama bilan qanday o'zgaradi, qaysi nuqtada xatolar boshlanadi, qaysi komponent birinchi tor joy (FPM, DB, Redis, tashqi API). Turlari: load (kutilgan), stress (chegaradan oshiq), spike (keskin portlash), soak (uzoq vaqt — leak'lar).",
        "",
        "Vositalar: k6 (JavaScript stsenariylari, CI'ga qulay), JMeter, Locust, wrk/hey (oddiy). Production'ga o'xshash muhitda, real stsenariylar (login → ro'yxat → buyurtma), monitoring bilan birga.",
        "",
        "```js",
        "import http from 'k6/http';",
        "import { check } from 'k6';",
        "export const options = { stages: [{ duration: '2m', target: 100 }, { duration: '5m', target: 100 }], thresholds: { http_req_duration: ['p(95)<300'] } };",
        "export default function () {",
        "  const r = http.get('https://staging.example.uz/api/products');",
        "  check(r, { 'status 200': (res) => res.status === 200 });",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy foydalanuvchi oqimi uchun k6 stsenariysini yozib, staging'da p95 chegarasi bilan load test o'tkazing.",
      acceptanceCriteria: [
        "Load test turlarini biladi",
        "Real stsenariy va chegaralar bilan test o'tkazadi"
      ],
      prerequisites: [
        "53.2"
      ]
    },
    {
      id: "53.18",
      title: "Bottleneck Identification",
      description: [
        "Tor joyni topish — tizim eng sekin komponentining tezligida ishlaydi; boshqa joyni optimallashtirish foydasiz. Usul: load test paytida barcha qatlamlar metrikalari (CPU, xotira, I/O har serverda; FPM `listen queue`; DB faol so'rovlar va lock'lar; Redis kechikishi; tashqi API vaqtlari) — qaysi resurs birinchi to'yinadi (USE metodi).",
        "",
        "Tipik tor joylar Laravel'da: DB (sekin so'rovlar, lock'lar, ulanishlar), FPM worker'lari tugashi (ko'pincha sekin tashqi chaqiruvlar sabab), sinxron tashqi API'lar, keshsiz og'ir hisoblar, bitta \"issiq\" qator/kalit.",
        "",
        "```text",
        "Yuklama ↑ → p95 ↑, CPU 30%, DB CPU 95%, FPM queue 0  → tor joy: DB",
        "Yuklama ↑ → p95 ↑, CPU 20%, DB 20%, FPM queue > 0    → tor joy: worker'lar (sekin I/O kutish)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Load test paytida barcha qatlamlar metrikalarini yig'ib, birinchi to'yingan resursni aniqlang va tuzating.",
      acceptanceCriteria: [
        "Tor joyni tizimli aniqlaydi",
        "Tor joy bo'lmagan joyni optimallashtirmaydi"
      ],
      prerequisites: [
        "53.17",
        "38.18"
      ]
    },
    {
      id: "53.19",
      title: "Performance Regression Testing",
      description: [
        "Performance regressiyasi — yangi kod tizimni sekinlashtiradi (yangi N+1, indekssiz so'rov, katta payload). Himoya: so'rovlar sonini cheklovchi testlar (eng arzon va samarali), benchmark testlari muhim kod uchun (PHPBench — chegaralar bilan), CI'da kichik load test (k6 thresholds) staging'ga, production'da deploy'dan keyin p95 monitoringi va deploy annotatsiyalari.",
        "",
        "Har performance optimallashtirishdan keyin uni test bilan qotirish — keyingi o'zgarish uni buzmasligi uchun.",
        "",
        "```php",
        "it('lists orders with a bounded number of queries', function () {",
        "    Order::factory()->count(30)->hasItems(3)->create();",
        "    DB::enableQueryLog();",
        "    $this->actingAs($admin)->getJson('/api/orders')->assertOk();",
        "    expect(DB::getQueryLog())->toHaveCount(4);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Eng muhim 5 ta endpoint uchun so'rovlar soni testlarini va CI'da k6 threshold testini qo'shing.",
      acceptanceCriteria: [
        "Regressiyaga qarshi testlash usullarini biladi",
        "Optimallashtirishlarni test bilan qotiradi"
      ],
      prerequisites: [
        "53.17"
      ]
    },
    {
      id: "53.20",
      title: "Latency Percentiles: p50, p95, p99",
      description: [
        "O'rtacha qiymat chalg'itadi: 99 ta 50 ms va bitta 5 s so'rov — o'rtacha 100 ms, lekin har 100-foydalanuvchi 5 s kutadi. Percentillar: **p50** (median — odatiy tajriba), **p95** (20 tadan 1 tasi bundan sekin), **p99** (100 tadan 1 tasi — \"dum\" kechikish), p99.9. Bir sahifa ko'p so'rov qilsa, foydalanuvchi p99'ga tez-tez duch keladi.",
        "",
        "SLO'lar percentil bilan ifodalanadi (\"p95 < 300 ms\"). Percentillarni o'rtachalash mumkin emas — histogrammalardan hisoblang (Prometheus `histogram_quantile`).",
        "",
        "```promql",
        "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{route=\"/api/orders\"}[5m])) by (le))",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Asosiy endpoint'lar uchun p50/p95/p99 dashboard'ini yarating va p95 bo'yicha SLO belgilang.",
      acceptanceCriteria: [
        "Percentillarning ma'nosini va o'rtachadan afzalligini biladi",
        "SLO'larni percentil bilan ifodalaydi"
      ],
      prerequisites: [
        "58.21"
      ]
    },
    {
      id: "53.21",
      title: "Laravel Octane va Stateful PHP Runtime",
      description: [
        "**Laravel Octane** ilovani an'anaviy PHP-FPM kabi har bir HTTP so'rovda noldan yuklamaydi, balki yuqori unumdor serverlar (**FrankenPHP**, **Swoole** yoki **RoadRunner**) yordamida ilovani **xotirada (RAM)** ushlab turadi. Bu orqali bootstrap vaqti yo'qoladi va sekundiga minglab so'rovlarni (10x tezlik bilan) bajarish mumkin bo'ladi.",
        "",
        "**Eng katta xavf — State Leak (Holat sizib ketishi)**: Ilova xotirada doimiy yashagani uchun, Singleton, Static property yoki Service Provider ichida saqlangan ma'lumotlar keyingi foydalanuvchining so'roviga o'tib ketishi mumkin. Octane'da har bir requestdan keyin xotirani tozalash (`config('octane.listeners')`), `$app` container'ni qayta bog'lash va kerak bo'lganda Octane Warmers ishlatiladi.",
        "",
        "**Octane Tables & Concurrency**: Swoole/OpenSwoole jadvallari orqali Redis'siz ham to'g'ridan-to'g'ri operativ xotirada atomik ma'lumot almashish va `Octane::concurrently()` yordamida bir nechta amalni parallel bajarish mumkin.",
        "",
        "```bash",
        "# FrankenPHP bilan Octane'ni ishga tushirish",
        "composer require laravel/octane",
        "php artisan octane:install --server=frankenphp",
        "php artisan octane:start --port=8000 --workers=auto",
        "```",
        "",
        "```php",
        "// Static holat sizishini oldini olish",
        "Octane::prepareApplicationForNextOperation();",
        "Octane::prepareApplicationForNextRequest();",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Mavjud Laravel ilovangizni Laravel Octane (FrankenPHP) ga o'tkazing, k6 bilan yuklama test qiling va static memory leak mavjud emasligini tekshiring.",
      acceptanceCriteria: [
        "PHP-FPM va Octane (stateful) o'rtasidagi farqni hamda nima hisobiga tezlik oshishini tushuntira oladi",
        "State leak (holat sizib ketishi) xavfini va uni bartaraf qilish usullarini biladi",
        "Octane'da workerlar soni va memory limit'larni to'g'ri sozlashi mumkin"
      ],
      prerequisites: [
        "1.25",
        "2.1",
        "53.1"
      ]
    }
  ]
});
