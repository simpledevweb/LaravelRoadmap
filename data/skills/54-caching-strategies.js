/* 54 · Caching Strategies
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 54,
  slug: "caching-strategies",
  title: "Caching Strategies",
  group: "performance",
  description: "Keshlash strategiyalari — tez-tez kerak bo'ladigan ma'lumotni tezroq qatlamda saqlash orqali tezlik va masshtabni oshirish. Lekin kesh murakkablik ham qo'shadi: invalidatsiya, izchillik, stampede va yangi nosozlik turlari. Senior dasturchi to'g'ri pattern'ni tanlaydi, kesh kalitlari va TTL'larni loyihalaydi va keshni o'lchanadigan holda boshqaradi.",
  subskills: [
    {
      id: "54.1",
      title: "Cache-Aside",
      description: [
        "Cache-aside (lazy loading) — eng keng tarqalgan pattern: ilova avval keshdan o'qiydi; yo'q bo'lsa (miss) — manbadan (DB) olib keshga yozadi; yozishda DB yangilanadi va kesh kaliti o'chiriladi. Laravel `Cache::remember()` — aynan shu.",
        "",
        "Afzalliklari: faqat so'ralgan ma'lumot keshlanadi, kesh ishlamasa tizim DB bilan ishlaydi (sekinroq). Kamchiliklari: birinchi so'rov sekin (sovuq kesh), qisqa nomuvofiqlik oynasi, stampede xavfi.",
        "",
        "```php",
        "public function find(int $id): Product",
        "{",
        "    return Cache::remember(\"product:{$id}:v2\", now()->addMinutes(30),",
        "        fn () => Product::with('media')->findOrFail($id));",
        "}",
        "public function update(Product $p, array $data): void",
        "{",
        "    $p->update($data);",
        "    DB::afterCommit(fn () => Cache::forget(\"product:{$p->id}:v2\"));",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mahsulot repository'siga cache-aside'ni commit'dan keyingi invalidatsiya bilan qo'shing va testlang.",
      acceptanceCriteria: [
        "Cache-aside oqimini biladi",
        "Uning afzallik va kamchiliklarini tushunadi"
      ],
      prerequisites: [
        "12.4"
      ]
    },
    {
      id: "54.2",
      title: "Read-Through",
      description: [
        "Read-through — ilova faqat kesh bilan gaplashadi; miss bo'lganda keshning o'zi (yoki kesh qatlami/kutubxona) manbadan yuklaydi. Ilova kodi soddalashadi: yuklash mantiqi markazlashgan. Cache-aside'dan farqi — kim yuklash mas'uliyatini oladi.",
        "",
        "Laravel'da toza read-through yo'q, lekin decorator repository (`CachedProductRepository` — ichki repository'ni o'rab, miss'da undan oladi) amalda shu pattern'ni beradi va chaqiruvchi kod keshdan bexabar.",
        "",
        "```php",
        "final class CachedProductRepository implements ProductRepository",
        "{",
        "    public function __construct(private ProductRepository $inner, private Repository $cache) {}",
        "    public function find(int $id): Product",
        "    {",
        "        return $this->cache->remember(\"product:{$id}\", 1800, fn () => $this->inner->find($id));",
        "    }",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Repository'ni keshlovchi decorator bilan o'rab, chaqiruvchi kodni o'zgartirmasdan read-through xatti-harakatini oling.",
      acceptanceCriteria: [
        "Read-through va cache-aside farqini biladi",
        "Decorator orqali keshlashni amalga oshiradi"
      ],
      prerequisites: [
        "5.6"
      ]
    },
    {
      id: "54.3",
      title: "Write-Through",
      description: [
        "Write-through — yozish bir vaqtda (sinxron) ham keshga, ham DB'ga: kesh doim yangi, o'qishlar darhol hit. Narxi — har yozish sekinroq (ikki yozuv), hech qachon o'qilmaydigan ma'lumot ham keshlanadi; DB va kesh yozuvi atomik emas (biri muvaffaqiyatsiz bo'lsa nomuvofiqlik).",
        "",
        "Qo'llanishi: tez-tez o'qiladigan va yozilgandan keyin darhol o'qiladigan ma'lumot (foydalanuvchi sozlamalari, sessiyaga yaqin ma'lumot). Ko'pincha cache-aside + yozishda invalidatsiya soddaroq va xavfsizroq.",
        "",
        "```php",
        "public function updateSettings(User $user, array $settings): void",
        "{",
        "    DB::transaction(fn () => $user->settings()->update($settings));",
        "    Cache::put(\"user:{$user->id}:settings\", $user->settings()->first()->toArray(), now()->addDay());",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Foydalanuvchi sozlamalari uchun write-through va cache-aside variantlarini yozib, murosalarini solishtiring.",
      acceptanceCriteria: [
        "Write-through xususiyatlarini biladi",
        "Atomiklik muammosini tushunadi"
      ],
      prerequisites: [
        "54.1"
      ]
    },
    {
      id: "54.4",
      title: "Write-Behind",
      description: [
        "Write-behind (write-back) — yozish avval keshga, DB'ga esa keyinroq, asinxron va ko'pincha guruhlab yoziladi. Juda tez yozish va DB yuklamasining keskin kamayishi (ko'rishlar soni, like'lar, onlayn holat, hisoblagichlar). Xavf: kesh qulasa yoki o'chsa, hali DB'ga yozilmagan ma'lumot yo'qoladi; izchillik murakkab.",
        "",
        "Laravel'da: Redis'da `INCR`/hash'da to'plash + scheduler orqali davriy flush (`Redis::getdel` + bulk upsert). Faqat yo'qotilishi qabul qilinadigan yoki qayta tiklanadigan ma'lumot uchun.",
        "",
        "```php",
        "Redis::hincrby('post_views:buffer', $post->id, 1);",
        "",
        "// Schedule::everyMinute()",
        "$views = Redis::eval(\"local v = redis.call('HGETALL', KEYS[1]); redis.call('DEL', KEYS[1]); return v\", 1, 'post_views:buffer');",
        "foreach (array_chunk($views, 2) as [$id, $count]) {",
        "    Post::whereKey($id)->increment('views', (int) $count);",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Ko'rishlar hisoblagichini write-behind bilan amalga oshirib, DB yozuvlari sonining kamayishini o'lchang.",
      acceptanceCriteria: [
        "Write-behind foyda va xavflarini biladi",
        "Uni faqat mos ma'lumot uchun qo'llaydi"
      ],
      prerequisites: [
        "15.14"
      ]
    },
    {
      id: "54.5",
      title: "Cache Keys",
      description: [
        "Kesh kaliti dizayni: noyob va bashorat qilinadigan (`app:product:42:v3`), barcha natijaga ta'sir qiluvchi parametrlarni o'z ichiga oladi (tenant, til, valyuta, filtrlar, sahifa, foydalanuvchi ruxsati — aks holda boshqa foydalanuvchiga noto'g'ri ma'lumot!), versiya prefiksi (format o'zgarganda eski keshni bekor qilish uchun), ilova/muhit prefiksi (bir Redis'da bir nechta ilova).",
        "",
        "Uzun parametr to'plamlari uchun hash (`md5(json_encode($filters))`); kalitlarni bir joyda generatsiya qiluvchi helper/class — tarqoq string'lar xatoga moyil.",
        "",
        "```php",
        "final class CacheKeys",
        "{",
        "    public static function productList(int $tenantId, string $locale, array $filters, int $page): string",
        "    {",
        "        ksort($filters);",
        "        return sprintf('catalog:v3:t%d:%s:%s:p%d', $tenantId, $locale, md5(json_encode($filters)), $page);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Kesh kalitlarini markazlashgan class'ga yig'ib, tenant va til yetishmagan kalitlarni tuzating.",
      acceptanceCriteria: [
        "Kalitga barcha kontekstni kiritadi",
        "Versiyalash va prefikslarni qo'llaydi"
      ],
      prerequisites: [
        "54.1"
      ]
    },
    {
      id: "54.6",
      title: "TTL",
      description: [
        "TTL — kesh yozuvining yashash muddati; xavfsizlik to'ri: invalidatsiya unutilsa ham ma'lumot cheksiz eskirmaydi. Tanlov — ma'lumot o'zgarish chastotasi va eskirishga chidamlilik: valyuta kurslari — daqiqalar, kategoriyalar — soatlar, statik ma'lumotnomalar — kun; tez o'zgaruvchan va kritik (balans) — keshlanmaydi.",
        "",
        "Jitter — bir vaqtda yaratilgan kalitlar bir vaqtda eskirmasligi uchun (avalanche'ga qarshi). Abadiy kesh (`forever`) — faqat aniq invalidatsiya bilan.",
        "",
        "```php",
        "$ttl = now()->addMinutes(60)->addSeconds(random_int(0, 300));   // jitter",
        "Cache::put(\"rates:usd_uzs\", $rate, $ttl);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Barcha kesh yozuvlari TTL'larini ma'lumot turi bo'yicha asoslab, jitter qo'shing.",
      acceptanceCriteria: [
        "TTL'ni ma'lumot tabiatiga qarab tanlaydi",
        "Jitter maqsadini biladi"
      ],
      prerequisites: [
        "12.3"
      ]
    },
    {
      id: "54.7",
      title: "Cache Invalidation",
      description: [
        "Invalidatsiya strategiyalari: TTL (passiv), aniq o'chirish (yozishda — observer, event, `afterCommit`), versiyalangan kalitlar (versiyani oshirish — eskisi amalda yo'q), tag'lar (guruhni birga), event asosidagi (ma'lumot o'zgarishi haqidagi event → kesh tozalash, ko'p serverda Pub/Sub orqali lokal keshlarni ham).",
        "",
        "Qiyinliklar: bir ma'lumot ko'p kalitda (detal, ro'yxat, qidiruv, agregat) — bog'liqliklarni xaritalash; tranzaksiya commit'idan oldin invalidatsiya → eski ma'lumot qayta keshlanadi; replica lag → eski ma'lumot keshlanadi.",
        "",
        "```php",
        "#[ObservedBy(ProductCacheObserver::class)]",
        "final class Product extends Model {}",
        "",
        "final class ProductCacheObserver implements ShouldHandleEventsAfterCommit",
        "{",
        "    public function saved(Product $p): void",
        "    {",
        "        Cache::forget(\"product:{$p->id}:v2\");",
        "        Cache::tags([\"category:{$p->category_id}\"])->flush();",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mahsulot o'zgarganda barcha bog'liq kesh kalitlarini (detal, ro'yxat, kategoriya) commit'dan keyin tozalovchi observer yozing.",
      acceptanceCriteria: [
        "Invalidatsiya strategiyalarini biladi",
        "Commit va replica lag bilan bog'liq race'larni oldini oladi"
      ],
      prerequisites: [
        "12.5"
      ]
    },
    {
      id: "54.8",
      title: "Cache Tags",
      description: [
        "Cache tag'lari — yozuvlarni guruhlab, guruhni birga tozalash: `Cache::tags(['catalog', 'tenant:7'])->remember(...)`, `Cache::tags('tenant:7')->flush()`. Faqat tag'larni qo'llab-quvvatlovchi driver'lar (Redis, Memcached; `file`/`database` emas).",
        "",
        "Qo'llanishi: tenant bo'yicha barcha keshni tozalash, katalog o'zgarganda barcha katalog sahifalari, foydalanuvchi ruxsatlari o'zgarganda uning barcha keshlari. Eslatma: tag bilan yozilgan yozuvni o'qishda ham bir xil tag'lar kerak; katta tag to'plamlari Redis'da xotira sarflaydi.",
        "",
        "```php",
        "Cache::tags(['tenant:'.$tenantId, 'reports'])->remember(\"dashboard:{$tenantId}\", 600, fn () => $this->build($tenantId));",
        "// Tenant ma'lumoti import qilinganda",
        "Cache::tags('tenant:'.$tenantId)->flush();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tenant va modul tag'lari bilan keshlashni joriy qilib, guruhli invalidatsiyani sinang.",
      acceptanceCriteria: [
        "Tag'lar mexanizmi va cheklovlarini biladi",
        "Guruhli invalidatsiya uchun tag'lardan foydalanadi"
      ],
      prerequisites: [
        "54.7"
      ]
    },
    {
      id: "54.9",
      title: "Cache Stampede",
      description: [
        "Stampede (thundering herd / dogpile) — mashhur kalit eskirgan paytda ko'p so'rov bir vaqtda miss oladi va hammasi qimmat manbaga (DB) murojaat qiladi — DB yiqilishi mumkin. Ayniqsa yuqori trafikli og'ir hisoblarda.",
        "",
        "Yechimlar: lock bilan bitta qayta hisoblash (`Cache::lock()` + qolganlar kutadi yoki eski qiymatni oladi), stale-while-revalidate (`Cache::flexible()` — eski qiymat beriladi, fonda yangilanadi), probabilistic early refresh (XFetch), oldindan isitish (scheduler muddati tugashidan oldin yangilaydi), TTL jitter.",
        "",
        "```php",
        "$stats = Cache::flexible('dashboard:global', [300, 900], fn () => $this->expensiveStats());",
        "// 0–5 daq: yangi; 5–15 daq: eski qiymat + fonda yangilash; 15+ daq: sinxron hisoblash",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Og'ir dashboard keshini `Cache::flexible` ga o'tkazib, stampede'ni load test bilan oldin/keyin solishtiring.",
      acceptanceCriteria: [
        "Stampede sabablari va yechimlarini biladi",
        "Stale-while-revalidate'ni qo'llaydi"
      ],
      prerequisites: [
        "12.6"
      ]
    },
    {
      id: "54.10",
      title: "Cache Penetration",
      description: [
        "Cache penetration — mavjud bo'lmagan kalitlar uchun so'rovlar: har biri miss → DB'ga tushadi (natija yo'q, keshlanmaydi) → takrorlanadi. Hujum yoki xato tufayli (tasodifiy ID'lar bilan bot'lar) DB'ni bo'g'ishi mumkin.",
        "",
        "Yechimlar: **negative caching** — \"topilmadi\" natijasini ham qisqa TTL bilan keshlash; **Bloom filter** — mavjud ID'lar to'plami (Redis Bloom) — aniq yo'q bo'lsa DB'ga bormaslik; validatsiya (noto'g'ri formatdagi ID'larni darhol rad etish); rate limiting.",
        "",
        "```php",
        "$product = Cache::remember(\"product:{$id}\", 600, function () use ($id) {",
        "    return Product::find($id) ?? false;     // false — \"yo'q\" ham keshlanadi",
        "});",
        "abort_if($product === false, 404);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Mavjud bo'lmagan ID'lar bilan hujum simulyatsiyasida DB yuklamasini o'lchang va negative caching bilan himoyalang.",
      acceptanceCriteria: [
        "Penetration muammosini biladi",
        "Negative caching va Bloom filter'ni qo'llaydi"
      ],
      prerequisites: [
        "54.9"
      ]
    },
    {
      id: "54.11",
      title: "Cache Avalanche",
      description: [
        "Cache avalanche — ko'p kalit bir vaqtda eskiradi (bir xil TTL bilan yaratilgan — masalan, deploy yoki kesh tozalashdan keyin) yoki kesh serveri butunlay ishdan chiqadi → barcha so'rovlar DB'ga tushadi va uni yiqitadi.",
        "",
        "Himoya: TTL jitter, oldindan isitish (deploy'dan keyin muhim kalitlarni yaratish), `cache:clear` ni production'da ehtiyotkorlik bilan (yoki umuman emas), kesh yuqori mavjudligi (Redis replica, Sentinel), circuit breaker va rate limiting DB oldida, graceful degradation (kesh yo'q bo'lsa og'ir funksiyalarni vaqtincha o'chirish).",
        "",
        "```php",
        "Schedule::command('cache:warm-catalog')->hourly();   // muhim kalitlarni oldindan yangilash",
        "$ttl = 3600 + random_int(0, 600);                    // jitter",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Deploy'dan keyin kesh isitish buyrug'ini yozing va barcha kalitlarga jitter qo'shing.",
      acceptanceCriteria: [
        "Avalanche sabablari va himoyasini biladi",
        "Kesh isitish va jitter'ni qo'llaydi"
      ],
      prerequisites: [
        "54.6"
      ]
    },
    {
      id: "54.12",
      title: "Distributed Caching",
      description: [
        "Taqsimlangan kesh (Redis, Memcached) — bir nechta app server uchun umumiy: bir serverda yozilgan kesh boshqasida ham ko'rinadi, invalidatsiya bir joyda. Ko'p serverli Laravel ilovalari uchun majburiy (file cache har serverda alohida!).",
        "",
        "Masalalar: tarmoq kechikishi (lokal xotiradan sekinroq — ~0.2–1 ms), kesh serveri mavjudligi (HA), xotira chegarasi va eviction, serializatsiya narxi (katta obyektlar — igbinary/siqish), klaster va sharding (consistent hashing).",
        "",
        "```php",
        "// config/cache.php",
        "'default' => env('CACHE_STORE', 'redis'),",
        "'stores' => [",
        "    'redis' => ['driver' => 'redis', 'connection' => 'cache', 'lock_connection' => 'default'],",
        "],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "File cache'dan Redis'ga o'ting va ikki app serverda kesh izchilligini sinang.",
      acceptanceCriteria: [
        "Taqsimlangan keshning zarurligini biladi",
        "Uning tarmoq va mavjudlik masalalarini tushunadi"
      ],
      prerequisites: [
        "12.17"
      ]
    },
    {
      id: "54.13",
      title: "Local vs Shared Cache",
      description: [
        "**Lokal kesh** (jarayon xotirasi — PHP static/array, APCu, Octane'da xotira): eng tez (tarmoqsiz), lekin har server/jarayonda alohida — invalidatsiya qiyin, nusxalar nomuvofiq. **Umumiy kesh** (Redis): izchil, lekin tarmoq kechikishi.",
        "",
        "Ikki darajali (L1 lokal + L2 Redis): juda tez-tez o'qiladigan, kam o'zgaradigan ma'lumot (konfiguratsiya, feature flag'lar, ma'lumotnomalar) uchun lokal qisqa TTL bilan; invalidatsiya Pub/Sub orqali barcha serverlarga. Laravel `Cache::memo()` — bitta so'rov/jarayon ichidagi takroriy o'qishlarni xotirada saqlaydi.",
        "",
        "```php",
        "// Bitta so'rov ichida bir xil kalit 50 marta o'qilsa — Redis'ga bir marta",
        "$settings = Cache::memo()->remember('tenant:7:settings', 600, fn () => Settings::forTenant(7));",
        "// APCu — server darajasidagi lokal kesh (qisqa TTL)",
        "$flags = apcu_entry('feature_flags', fn () => Cache::get('feature_flags'), 30);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Juda tez-tez o'qiladigan sozlamalar uchun `Cache::memo()` yoki APCu qatlamini qo'shib, Redis so'rovlari sonini o'lchang.",
      acceptanceCriteria: [
        "Lokal va umumiy kesh murosasini biladi",
        "Ikki darajali keshlashni qo'llay oladi"
      ],
      prerequisites: [
        "54.12"
      ]
    },
    {
      id: "54.14",
      title: "Negative Caching",
      description: [
        "Negative caching — \"natija yo'q\" (topilmadi, bo'sh ro'yxat, tashqi API 404) natijasini ham keshlash. Maqsad: mavjud bo'lmagan ma'lumot uchun takroriy qimmat so'rovlarning oldini olish (penetration'ga qarshi, tashqi API limitlarini tejash).",
        "",
        "Qoidalar: qisqa TTL (ma'lumot paydo bo'lishi mumkin — masalan, 1–5 daqiqa), \"yo'q\" ni maxsus qiymat bilan belgilash (`null` keshlanmasligi mumkin — Laravel'da `remember` `null` ni keshlaydi, lekin aniqlik uchun sentinel qiymat yaxshi), ma'lumot yaratilganda negative keshni tozalash.",
        "",
        "```php",
        "$user = Cache::remember(\"user:by-phone:{$phone}\", 120, fn () => User::where('phone', $phone)->first() ?? '__none__');",
        "if ($user === '__none__') {",
        "    $user = null;",
        "}",
        "// Ro'yxatdan o'tganda",
        "Cache::forget(\"user:by-phone:{$phone}\");",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Tashqi API'dan \"topilmadi\" javoblarini qisqa TTL bilan keshlab, API chaqiruvlari sonining kamayishini o'lchang.",
      acceptanceCriteria: [
        "Negative caching maqsadini biladi",
        "Qisqa TTL va tozalash bilan to'g'ri qo'llaydi"
      ],
      prerequisites: [
        "54.10"
      ]
    },
    {
      id: "54.15",
      title: "HTTP Caching",
      description: [
        "HTTP keshlash — javoblarni brauzer, proxy va CDN'da keshlash; PHP'ga umuman yetmasdan javob berish (eng tez kesh). Mexanizmlar: `Cache-Control` (`max-age`, `s-maxage`, `public`/`private`, `no-store`, `stale-while-revalidate`), ETag/Last-Modified + shartli so'rovlar (304), `Vary` (kesh kaliti qaysi header'larga bog'liq — `Accept-Encoding`, `Accept-Language`).",
        "",
        "Laravel: `cache.headers` middleware (`public;max_age=300;etag`), Nginx `fastcgi_cache`. Eng katta xavf — shaxsiy javobni ommaviy keshlash (`public` + cookie'li javob).",
        "",
        "```php",
        "Route::middleware('cache.headers:public;max_age=600;s_maxage=3600;etag')",
        "    ->get('/api/catalog/categories', CategoryIndexController::class);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ommaviy katalog endpoint'lari uchun HTTP kesh header'larini sozlab, 304 va CDN hit'larini tekshiring.",
      acceptanceCriteria: [
        "HTTP keshlash mexanizmlarini biladi",
        "Shaxsiy kontentni ommaviy keshdan himoyalaydi"
      ],
      prerequisites: [
        "50.17"
      ]
    },
    {
      id: "54.16",
      title: "CDN Caching",
      description: [
        "CDN keshlash — edge serverlarda: statik asset'lar (uzoq TTL, hash'li nomlar — invalidatsiya kerak emas), rasmlar (on-the-fly o'lchamlash bilan), ommaviy HTML/API (`s-maxage`, `stale-while-revalidate`, `stale-if-error` — origin yiqilganda ham javob). Kesh kaliti: URL + tanlangan header/cookie'lar — ortiqcha `Vary` hit ratio'ni tushiradi.",
        "",
        "Invalidatsiya: purge API (deploy'da yoki kontent o'zgarganda), surrogate key'lar/cache tag'lar (Fastly, Cloudflare Enterprise) — guruhli purge. Shaxsiy sahifalar — `private`/`no-store` yoki CDN'da bypass.",
        "",
        "```http",
        "Cache-Control: public, max-age=60, s-maxage=600, stale-while-revalidate=60, stale-if-error=86400",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ommaviy sahifalar uchun CDN kesh siyosatini sozlab, kontent o'zgarganda purge'ni avtomatlashtiring.",
      acceptanceCriteria: [
        "CDN kesh direktivalari va kalitini biladi",
        "Purge va stale-if-error'dan foydalanadi"
      ],
      prerequisites: [
        "53.15"
      ]
    },
    {
      id: "54.17",
      title: "Database Query Caching Considerations",
      description: [
        "So'rov natijalarini keshlash masalalari: MySQL 8 da ichki query cache yo'q (invalidatsiya muammolari tufayli olib tashlangan) — keshlash ilova darajasida. Nimani keshlash: og'ir agregatlar, kam o'zgaradigan ma'lumotnomalar, ko'p o'qiladigan ro'yxatlar. Nimani keshlamaslik: tez o'zgaradigan va kritik ma'lumot (balans, zaxira, to'lov holati), har foydalanuvchi uchun noyob va kam qayta o'qiladigan natijalar.",
        "",
        "Avval so'rovni optimallashtiring (indeks, N+1) — kesh sekin so'rovni yashirmasin. Eloquent model'larini keshlashda serializatsiya hajmi va relation'lar; toza massiv/DTO keshlash ko'pincha yaxshiroq.",
        "",
        "```php",
        "// Og'ir agregat — keshlashga arziydi",
        "$topProducts = Cache::remember('reports:top-products:'.today()->toDateString(), 3600,",
        "    fn () => DB::table('order_items')->select('product_id', DB::raw('SUM(qty) qty'))->groupBy('product_id')->orderByDesc('qty')->limit(10)->get()->toArray());",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Keshlanayotgan so'rovlar ro'yxatini ko'rib chiqib, keshlanmasligi kerak bo'lganlarini va avval optimallashtirilishi kerak bo'lganlarini aniqlang.",
      acceptanceCriteria: [
        "Keshlashga mos va mos bo'lmagan ma'lumotni farqlaydi",
        "Keshni optimallashtirish o'rniga ishlatmaydi"
      ],
      prerequisites: [
        "16.17"
      ]
    },
    {
      id: "54.18",
      title: "Cache Consistency",
      description: [
        "Kesh va manba o'rtasida izchillik — kesh doim qandaydir darajada eskirgan bo'lishi mumkin. Biznes bilan kelishish: qaysi ma'lumot qancha eskirishi mumkin (narx — 1 daqiqa, sharh soni — 1 soat, balans — 0 → keshlanmaydi). Texnik choralar: commit'dan keyin invalidatsiya, versiyalangan kalitlar, qisqa TTL, write-through kritik joylarda, CDC asosida invalidatsiya, delayed double delete (race'larga qarshi).",
        "",
        "Race misoli: A o'qiydi (miss) → DB'dan eski qiymat → B yozadi va keshni o'chiradi → A eski qiymatni keshga yozadi → kesh uzoq vaqt eski. Yechim — qisqa TTL, versiya tekshiruvi yoki lock.",
        "",
        "```php",
        "DB::afterCommit(function () use ($key) {",
        "    Cache::forget($key);",
        "    dispatch(fn () => Cache::forget($key))->delay(now()->addSeconds(2));   // delayed double delete",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Kesh nomuvofiqligi race'ini parallel testda qayta yarating va tanlangan yechim bilan bartaraf eting.",
      acceptanceCriteria: [
        "Kesh nomuvofiqligi stsenariylarini biladi",
        "Ma'lumot turiga qarab izchillik darajasini tanlaydi"
      ],
      prerequisites: [
        "12.20"
      ]
    },
    {
      id: "54.19",
      title: "Cache Hit Ratio",
      description: [
        "Hit ratio = hit / (hit + miss) — keshning samaradorligi. Past ratio: kalitlar juda xilma-xil (har foydalanuvchi uchun noyob), TTL juda qisqa, kesh hajmi kichik (eviction), noto'g'ri kalit dizayni (keraksiz parametrlar), tez-tez invalidatsiya. Juda yuqori ratio + eskirgan ma'lumot shikoyatlari — TTL juda uzun.",
        "",
        "O'lchash: Redis `keyspace_hits/misses` (umumiy), ilova darajasida kalit guruhlari bo'yicha (`CacheHit`/`CacheMissed` event'lari Laravel'da), CDN analitikasi. Maqsadli qiymat ma'lumot turiga bog'liq (ma'lumotnomalar 99%+, shaxsiy 60–80%).",
        "",
        "```php",
        "Event::listen(CacheMissed::class, fn (CacheMissed $e) => Metrics::increment('cache.miss', ['group' => Str::before($e->key, ':')]));",
        "Event::listen(CacheHit::class, fn (CacheHit $e) => Metrics::increment('cache.hit', ['group' => Str::before($e->key, ':')]));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kalit guruhlari bo'yicha hit ratio metrikasini yig'ib, eng past ratio'li guruhni tahlil qilib yaxshilang.",
      acceptanceCriteria: [
        "Hit ratio'ni hisoblash va talqin qilishni biladi",
        "Past ratio sabablarini aniqlaydi"
      ],
      prerequisites: [
        "12.19"
      ]
    },
    {
      id: "54.20",
      title: "Cache Monitoring",
      description: [
        "Kesh monitoringi: hit ratio (umumiy va guruhlar bo'yicha), kechikish (Redis `latency`, ilova tomonida kesh operatsiya vaqti), xotira ishlatilishi va eviction'lar (`evicted_keys` o'sishi — kesh kichik), ulanishlar, xatolar (kesh mavjud emasligi — ilova graceful ishlashi kerak), katta kalitlar, kalitlar soni trendi.",
        "",
        "Alert'lar: hit ratio keskin tushishi (deploy'da kalit formati o'zgargan?), eviction'lar, xotira > 80%, kesh serveri mavjud emas. Dashboard: Redis exporter + ilova metrikalari + CDN analitikasi.",
        "",
        "```bash",
        "redis-cli INFO stats | grep -E \"keyspace_hits|keyspace_misses|evicted_keys\"",
        "redis-cli INFO memory | grep -E \"used_memory_human|maxmemory_human\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kesh uchun Grafana dashboard (hit ratio, xotira, eviction, kechikish) va 3 ta alert sozlang.",
      acceptanceCriteria: [
        "Kesh uchun muhim metrikalarni biladi",
        "Kesh nosozligi ilovaga ta'sirini rejalashtiradi"
      ],
      prerequisites: [
        "12.19"
      ]
    }
  ]
});
