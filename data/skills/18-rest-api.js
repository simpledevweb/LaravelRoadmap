/* 18 · REST API
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 18,
  slug: "rest-api",
  title: "REST API",
  group: "api",
  description: "REST — HTTP ustiga qurilgan resursga yo'naltirilgan API uslubi. Laravel backend'larining ko'pchiligi mobil ilova, SPA va boshqa servislar uchun REST API taqdim etadi. Senior dasturchi to'g'ri resurs modellashtirish, HTTP semantikasi, xatolar formati, versiyalash, idempotentlik va orqaga moslikni ta'minlay oladi.",
  subskills: [
    {
      id: "18.1",
      title: "REST Principles",
      description: [
        "REST (Roy Fielding, 2000) cheklovlari: **client-server** ajratish, **stateless** (har so'rov o'zi uchun yetarli ma'lumotga ega — server session holatiga tayanmaydi), **cacheable** (javoblar keshlanishi mumkinligini bildiradi), **uniform interface** (resurslar URI orqali, standart metodlar, o'z-o'zini tasvirlovchi xabarlar, HATEOAS), **layered system**, ixtiyoriy code-on-demand.",
        "",
        "Amalda ko'p \"REST\" API'lar Richardson Maturity Model'ning 2-darajasida: resurslar + HTTP metodlari + status kodlar. HATEOAS (3-daraja) kam qo'llanadi. Muhimi — izchillik va HTTP semantikasiga hurmat.",
        "",
        "```text",
        "GET    /orders          ro'yxat",
        "POST   /orders          yaratish",
        "GET    /orders/42       bitta",
        "PATCH  /orders/42       qisman yangilash",
        "DELETE /orders/42       o'chirish",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud API'ni Richardson Maturity Model bo'yicha baholang va 2-darajaga keltirish rejasini tuzing.",
      acceptanceCriteria: [
        "REST cheklovlarini ayta oladi",
        "Stateless tamoyilining masshtablashga ta'sirini tushuntira oladi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "18.2",
      title: "Resources va Resource-Oriented Design",
      description: [
        "Resurs — nom bilan ataladigan biznes tushunchasi (ot, fe'l emas): `/orders`, `/customers/7/addresses`. Harakatlar HTTP metodlari orqali ifodalanadi, URL'da emas (`POST /createOrder` ❌).",
        "",
        "Qiyin holatlar: CRUD'ga to'g'ri kelmaydigan amallar — ularni resurs sifatida modellashtirish (`POST /orders/42/cancellation`, `POST /payments`) yoki controller-uslub sub-resurs (`POST /orders/42/cancel`) — izchil tanlang. Ichma-ichlikni 1–2 daraja bilan cheklang; resurs DB jadvaliga 1:1 bo'lishi shart emas.",
        "",
        "```php",
        "Route::apiResource('orders', OrderController::class);",
        "Route::apiResource('orders.items', OrderItemController::class)->shallow();",
        "Route::post('orders/{order}/cancellation', CancelOrderController::class);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Kichik domen uchun resurslar ro'yxatini va URI daraxtini loyihalang (CRUD bo'lmagan amallar bilan).",
      acceptanceCriteria: [
        "Resurslarni otlar sifatida modellashtiradi",
        "CRUD bo'lmagan amallarni izchil ifodalaydi"
      ],
      prerequisites: [
        "18.1"
      ]
    },
    {
      id: "18.3",
      title: "HTTP Methods",
      description: [
        "- **GET** — o'qish; xavfsiz (holatni o'zgartirmaydi) va idempotent, keshlanadi.",
        "- **POST** — yaratish yoki ixtiyoriy amal; idempotent emas.",
        "- **PUT** — resursni to'liq almashtirish; idempotent.",
        "- **PATCH** — qisman yangilash; idempotent bo'lishi shart emas.",
        "- **DELETE** — o'chirish; idempotent (ikkinchi chaqiruv ham \"yo'q\" holatiga olib keladi).",
        "- **HEAD**, **OPTIONS** — metadata va CORS preflight.",
        "",
        "GET bilan holat o'zgartirish xavfli: crawler'lar, prefetch, kesh — kutilmagan amallar. Laravel'da HTML formalar `_method` bilan PUT/PATCH/DELETE yuboradi.",
        "",
        "```http",
        "PATCH /api/orders/42",
        "Content-Type: application/json",
        "",
        "{\"shipping_address\": \"Toshkent, Chilonzor 5\"}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API'dagi metod ishlatilishini audit qiling: holat o'zgartiradigan GET'lar va noto'g'ri PUT/PATCH'larni tuzating.",
      acceptanceCriteria: [
        "Xavfsiz va idempotent metodlarni ajrata oladi",
        "PUT va PATCH farqini biladi"
      ],
      prerequisites: [
        "18.1"
      ]
    },
    {
      id: "18.4",
      title: "HTTP Status Codes",
      description: [
        "Asosiy kodlar: **2xx** — `200 OK`, `201 Created` (+`Location`), `202 Accepted` (asinxron), `204 No Content`; **3xx** — `301/308` yo'naltirish, `304 Not Modified`; **4xx** — `400` (noto'g'ri so'rov), `401` (autentifikatsiya yo'q), `403` (ruxsat yo'q), `404`, `405`, `409 Conflict`, `410 Gone`, `412 Precondition Failed`, `415`, `422` (validatsiya — Laravel default), `429 Too Many Requests`; **5xx** — `500`, `502`, `503` (+`Retry-After`), `504`.",
        "",
        "Qoida: mijoz kod bo'yicha harakat qila olishi kerak — hamma narsaga `200` va `{\"success\": false}` qaytarish anti-pattern.",
        "",
        "```php",
        "return (new OrderResource($order))->response()->setStatusCode(201)",
        "    ->header('Location', route('orders.show', $order));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Har bir endpoint uchun mumkin bo'lgan status kodlar jadvalini tuzing va noto'g'rilarini tuzating.",
      acceptanceCriteria: [
        "401 va 403, 400 va 422 farqini biladi",
        "Asinxron amallar uchun 202 ishlatadi"
      ],
      prerequisites: [
        "50.3"
      ]
    },
    {
      id: "18.5",
      title: "Request va Response Structure",
      description: [
        "Izchil tuzilma mijoz kodini soddalashtiradi. So'rov: JSON body, aniq maydon nomlari (`snake_case` yoki `camelCase` — bittasini tanlang), sanalar ISO 8601 (UTC), pul — integer yoki string decimal, enum'lar — string qiymatlar.",
        "",
        "Javob: resurs `data` ichida, kolleksiya uchun `data` + `meta` (pagination) + `links`; xatolar alohida standart formatda. Bo'sh qiymatlar: `null` maydon qaytarish yoki umuman qaytarmaslik — izchil. Laravel API Resource'lari bu tuzilmani avtomatik beradi.",
        "",
        "```json",
        "{",
        "  \"data\": { \"id\": 42, \"status\": \"paid\", \"total\": \"150000.00\", \"created_at\": \"2025-06-01T09:30:00Z\" },",
        "  \"meta\": { \"request_id\": \"c1f2...\" }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API uchun so'rov/javob uslub qo'llanmasini yozing (nomlash, sana, pul, null, envelope).",
      acceptanceCriteria: [
        "Javob tuzilmasini barcha endpoint'larda izchil saqlaydi",
        "Sana va pul formatlarini to'g'ri tanlaydi"
      ],
      prerequisites: [
        "18.6"
      ]
    },
    {
      id: "18.6",
      title: "JSON",
      description: [
        "JSON — API'larning standart formati: obyekt, massiv, string, son, boolean, `null`. PHP'da `json_encode`/`json_decode`; `JSON_THROW_ON_ERROR` (xatoni yutib yubormaslik), `JSON_UNESCAPED_UNICODE` (kirill/o'zbek harflari), `JSON_PRESERVE_ZERO_FRACTION`.",
        "",
        "Nozikliklar: katta butun sonlar (JavaScript'da 2^53 dan katta — string sifatida yuboring), float aniqlik (pul — string yoki integer), bo'sh obyekt vs bo'sh massiv (`{}` va `[]` — PHP'da `(object) []`), sana formati yo'q (ISO 8601 string). Laravel `response()->json()` va Resource'lar kodlashni boshqaradi.",
        "",
        "```php",
        "$data = json_decode($payload, associative: true, flags: JSON_THROW_ON_ERROR);",
        "return response()->json($data, 200, [], JSON_UNESCAPED_UNICODE);",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Katta id va pul qiymatlarini JavaScript mijozida aniqlik yo'qolmaydigan qilib qaytaring.",
      acceptanceCriteria: [
        "`JSON_THROW_ON_ERROR` dan foydalanadi",
        "Katta sonlar va float muammosini biladi"
      ],
      prerequisites: []
    },
    {
      id: "18.7",
      title: "Headers",
      description: [
        "Header'lar — so'rov/javob metadata'si: `Content-Type`, `Accept`, `Authorization: Bearer ...`, `Location` (yaratilgan resurs), `Cache-Control`, `ETag`/`If-None-Match`, `If-Match` (optimistik lock), `Retry-After`, `X-RateLimit-*`/`RateLimit-*`, `Idempotency-Key`, `X-Request-Id` (kuzatuv), `Deprecation`/`Sunset`, CORS header'lari.",
        "",
        "Qoidalar: maxfiy ma'lumotni (token) URL'da emas, header'da yuboring; custom header'lar uchun `X-` prefiksi eskirgan, lekin keng tarqalgan; header'lar katta-kichik harfga sezgir emas.",
        "",
        "```php",
        "return response()->json($data)",
        "    ->header('X-Request-Id', $requestId)",
        "    ->header('Cache-Control', 'private, max-age=60');",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Har bir javobga `X-Request-Id` qo'shuvchi va so'rovdagi ID'ni log kontekstiga bog'lovchi middleware yozing.",
      acceptanceCriteria: [
        "Asosiy header'larning vazifasini biladi",
        "Token'ni URL'da yubormaslik qoidasiga amal qiladi"
      ],
      prerequisites: [
        "50.4"
      ]
    },
    {
      id: "18.8",
      title: "Content Negotiation",
      description: [
        "Content negotiation — mijoz `Accept` header orqali qaysi formatni xohlashini bildiradi (`application/json`, `text/csv`, `application/pdf`), server mosini qaytaradi yoki `406 Not Acceptable`. `Content-Type` — yuborilgan body formati; noto'g'ri bo'lsa `415 Unsupported Media Type`. `Accept-Language` — til.",
        "",
        "Laravel: `$request->wantsJson()`, `expectsJson()`, `accepts([...])`, `prefers()`. Muhim nozik joy: API so'rovlarida `Accept: application/json` yuborilmasa, validatsiya xatosi redirect qaytarishi mumkin — API route'lari uchun JSON javobni majburlash middleware'i.",
        "",
        "```php",
        "return match ($request->prefers(['application/json', 'text/csv'])) {",
        "    'text/csv' => response()->streamDownload(fn () => $this->csv($rows), 'report.csv'),",
        "    default    => ReportResource::collection($rows),",
        "};",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Hisobot endpoint'ini `Accept` header'ga qarab JSON yoki CSV qaytaradigan qiling.",
      acceptanceCriteria: [
        "`Accept` va `Content-Type` farqini biladi",
        "API'da JSON javobni majburlashni biladi"
      ],
      prerequisites: [
        "18.7"
      ]
    },
    {
      id: "18.9",
      title: "Route Parameters va Query Parameters",
      description: [
        "**Route (path) parametrlari** — resurs identifikatsiyasi: `/orders/{order}`. **Query parametrlari** — ixtiyoriy modifikatorlar: filtrlash, saralash, sahifalash, maydon tanlash (`?status=paid&sort=-created_at&page[size]=20`).",
        "",
        "Qoidalar: majburiy identifikator — path'da; ixtiyoriy — query'da; maxfiy ma'lumot hech qayerda URL'da emas (log'larga tushadi); query parametrlarini ham validatsiya qiling (Form Request); massiv parametrlar uchun izchil sintaksis (`filter[status]=paid`).",
        "",
        "```php",
        "// GET /api/customers/7/orders?filter[status]=paid&sort=-created_at",
        "public function index(Customer $customer, OrderIndexRequest $request) { /* ... */ }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ro'yxat endpoint'ining barcha query parametrlarini Form Request bilan validatsiya qiling.",
      acceptanceCriteria: [
        "Path va query parametr vazifasini farqlaydi",
        "Query parametrlarni ham validatsiya qiladi"
      ],
      prerequisites: [
        "2.3"
      ]
    },
    {
      id: "18.10",
      title: "Filtering, Sorting va Pagination",
      description: [
        "Ro'yxat endpoint'lari uchun izchil shartnoma: filtrlash (`filter[status]=paid`, `filter[created_after]=...`), saralash (`sort=-created_at,name` — minus kamayish), sahifalash (`page`/`per_page` yoki cursor), maydon tanlash (`fields[orders]=id,total`), bog'liq resurslar (`include=customer`).",
        "",
        "Xavfsizlik: ruxsat etilgan filtr va saralash maydonlari whitelist (aks holda injection yoki indekssiz sekin so'rovlar), `per_page` maksimal chegarasi. `spatie/laravel-query-builder` bu shartnomani tayyor beradi.",
        "",
        "```php",
        "$orders = QueryBuilder::for(Order::class)",
        "    ->allowedFilters(['status', AllowedFilter::exact('customer_id')])",
        "    ->allowedSorts(['created_at', 'total'])",
        "    ->allowedIncludes(['customer'])",
        "    ->paginate(min($request->integer('per_page', 20), 100));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ro'yxat endpoint'iga whitelist asosidagi filtr, saralash va include qo'shing.",
      acceptanceCriteria: [
        "Filtr va saralash maydonlarini whitelist qiladi",
        "`per_page` ga chegara qo'yadi"
      ],
      prerequisites: [
        "18.9"
      ]
    },
    {
      id: "18.11",
      title: "Cursor Pagination",
      description: [
        "API'da cursor pagination: javobda shaffof bo'lmagan `next_cursor` (oxirgi elementning tartib kaliti kodlangan), mijoz uni keyingi so'rovda yuboradi. Afzalliklari: katta ma'lumotda doim tez, yangi yozuvlar qo'shilganda dublikat/yo'qolish yo'q — cheksiz lenta, sinxronizatsiya, eksport uchun ideal.",
        "",
        "Kamchiliklari: sahifa raqami va umumiy son yo'q, tartib kaliti unikal va indekslangan bo'lishi kerak, cursor'ni o'zgartirib bo'lmaydigan (shaffof bo'lmagan) qiling. Laravel `cursorPaginate()` — `meta.next_cursor`, `links.next`.",
        "",
        "```json",
        "{",
        "  \"data\": [ ... ],",
        "  \"meta\": { \"path\": \"/api/orders\", \"per_page\": 50, \"next_cursor\": \"eyJjcmVhdGVkX2F0Ijo...\", \"prev_cursor\": null }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Mobil ilova lentasi uchun cursor pagination'li endpoint yozing va yangi yozuvlar qo'shilganda barqarorligini testlang.",
      acceptanceCriteria: [
        "Cursor pagination qachon mos ekanini biladi",
        "Cursor'ni shaffof bo'lmagan token sifatida taqdim etadi"
      ],
      prerequisites: [
        "16.11"
      ]
    },
    {
      id: "18.12",
      title: "API Versioning",
      description: [
        "Versiyalash — buzuvchi o'zgarishlarni mavjud mijozlarni sindirmasdan kiritish. Usullar: URI (`/api/v1/...` — sodda, ko'rinadigan, eng keng tarqalgan), header (`Accept: application/vnd.app.v2+json`), query (`?version=2`). Mobil ilovalar uchun versiyalash ayniqsa muhim — eski versiyalar yillab ishlaydi.",
        "",
        "Qoidalar: faqat buzuvchi o'zgarishda yangi major versiya; qo'shimcha maydonlar — buzuvchi emas; eski versiyani deprecation siyosati bilan ma'lum muddat qo'llab-quvvatlash. Laravel'da alohida route fayllari/guruhlari, controller namespace'lari, versiyalangan Resource'lar.",
        "",
        "```php",
        "Route::prefix('v1')->name('v1.')->group(base_path('routes/api_v1.php'));",
        "Route::prefix('v2')->name('v2.')->group(base_path('routes/api_v2.php'));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API'ga v2 qo'shing: faqat o'zgargan endpoint'lar yangi controller/resource'ga ega bo'lsin, qolganlari qayta ishlatilsin.",
      acceptanceCriteria: [
        "Versiyalash usullarining afzallik va kamchiliklarini biladi",
        "Nima buzuvchi o'zgarish ekanini aniqlay oladi"
      ],
      prerequisites: [
        "18.18"
      ]
    },
    {
      id: "18.13",
      title: "Error Response Standards",
      description: [
        "Xatolar barcha endpoint'larda bir xil formatda bo'lishi kerak. Standart: **RFC 9457 Problem Details** (`application/problem+json`: `type`, `title`, `status`, `detail`, `instance` + kengaytmalar). Laravel default validatsiya formati: `{\"message\": ..., \"errors\": {\"field\": [\"...\"]}}` — u ham keng tarqalgan.",
        "",
        "Qoidalar: mashina o'qiy oladigan xato kodi (`\"code\": \"insufficient_balance\"`), inson uchun xabar, maydon darajasidagi xatolar, `request_id` (support uchun), production'da stack trace yo'q, 5xx da ichki tafsilotlar oshkor qilinmaydi.",
        "",
        "```json",
        "{",
        "  \"type\": \"https://api.example.uz/errors/insufficient-balance\",",
        "  \"title\": \"Balans yetarli emas\",",
        "  \"status\": 422,",
        "  \"detail\": \"Hisobingizda 50 000 so'm yetishmaydi\",",
        "  \"code\": \"insufficient_balance\",",
        "  \"request_id\": \"c1f2a9\"",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Exception handler orqali barcha API xatolarini Problem Details formatiga keltiring va testlar bilan qotiring.",
      acceptanceCriteria: [
        "Izchil xato formatini joriy qiladi",
        "Ichki ma'lumot sizib chiqmasligini ta'minlaydi"
      ],
      prerequisites: [
        "2.16"
      ]
    },
    {
      id: "18.14",
      title: "Idempotent Requests",
      description: [
        "Tarmoq ishonchsiz: mijoz timeout oladi va so'rov bajarildimi-yo'qmi bilmaydi. GET, PUT, DELETE tabiatan idempotent — qayta yuborish xavfsiz. POST va PATCH uchun **Idempotency-Key** header: mijoz har bir mantiqiy amal uchun unikal kalit yuboradi; server birinchi natijani kalit bilan saqlaydi va takroriy so'rovga aynan o'sha javobni qaytaradi.",
        "",
        "Implementatsiya: kalit + so'rov hash'i + javob saqlanadi (TTL, masalan 24 soat); bir xil kalit bilan parallel so'rov — lock yoki `409`; bir xil kalit, boshqa body — `422`. To'lovlar, buyurtmalar, pul o'tkazmalari uchun majburiy.",
        "",
        "```php",
        "Route::post('payments', StorePaymentController::class)->middleware('idempotent');",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "`Idempotency-Key` middleware'ini (saqlash, parallel lock, body mosligi) yozing va testlang.",
      acceptanceCriteria: [
        "Qaysi metodlar tabiatan idempotent ekanini biladi",
        "Idempotency key'ning chekka holatlarini hal qiladi"
      ],
      prerequisites: [
        "17.17"
      ]
    },
    {
      id: "18.15",
      title: "Rate Limiting",
      description: [
        "Rate limiting API'ni suiiste'mol, brute-force va tasodifiy yuklamadan himoya qiladi hamda mijozlar o'rtasida adolatli taqsimotni ta'minlaydi. Kalit: autentifikatsiyalangan foydalanuvchi/token, aks holda IP; turli endpoint'lar uchun turli limitlar (login qat'iyroq).",
        "",
        "Javob: `429 Too Many Requests` + `Retry-After`, ixtiyoriy `X-RateLimit-Limit`/`Remaining`/`Reset` header'lari. Laravel: `RateLimiter::for()` va `throttle:` middleware (Redis bilan klasterda ishlaydi). Tarif rejalariga qarab dinamik limitlar.",
        "",
        "```php",
        "RateLimiter::for('api', function (Request $request) {",
        "    return $request->user()?->isPremium()",
        "        ? Limit::perMinute(1000)->by($request->user()->id)",
        "        : Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tarif rejasiga qarab dinamik rate limit qo'shing va 429 javobidagi header'larni testlang.",
      acceptanceCriteria: [
        "Limit kalitini to'g'ri tanlaydi",
        "429 javobini to'g'ri header'lar bilan qaytaradi"
      ],
      prerequisites: [
        "12.13"
      ]
    },
    {
      id: "18.16",
      title: "Authentication va Authorization",
      description: [
        "API autentifikatsiyasi: token (Laravel Sanctum personal access token, OAuth2/Passport), SPA uchun cookie session (Sanctum stateful), servislar o'rtasida API key yoki client credentials, mTLS. Token faqat HTTPS orqali, `Authorization: Bearer` header'da.",
        "",
        "Avtorizatsiya har endpoint'da: policy'lar, token abilities/scopes (`tokenCan('orders:write')`), obyekt darajasidagi tekshiruv (IDOR'ga qarshi — `/orders/42` foydalanuvchiga tegishlimi?). Ro'yxatlarda ham filtrlash. 401 — kim ekanligi noma'lum, 403 — ruxsat yo'q, ba'zan 404 — mavjudlikni yashirish uchun.",
        "",
        "```php",
        "Route::middleware(['auth:sanctum', 'abilities:orders:write'])",
        "    ->post('orders', StoreOrderController::class);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API endpoint'larida obyekt darajasidagi avtorizatsiya yo'qligini topuvchi testlar to'plamini yozing.",
      acceptanceCriteria: [
        "Autentifikatsiya usullarini kontekstga qarab tanlaydi",
        "IDOR'ga qarshi obyekt darajasida tekshiradi"
      ],
      prerequisites: [
        "api-authentication-and-authorization"
      ]
    },
    {
      id: "18.17",
      title: "API Resource Transformation",
      description: [
        "Transformatsiya qatlami ichki model va tashqi shartnomani ajratadi: ustun nomlarini o'zgartirish, hisoblangan maydonlar, sezgir maydonlarni yashirish, formatlash (sana, pul), shartli maydonlar (ruxsatga qarab), ichma-ich resurslar.",
        "",
        "Laravel API Resource'lari: `toArray()`, `when()`, `whenLoaded()`, `mergeWhen()`, `additional()`, `$wrap`. Muqobillar: Fractal, `spatie/laravel-data` (DTO + transformatsiya). Resource — faqat formatlash; ma'lumot yuklash (eager loading) va avtorizatsiya controller/policy'da.",
        "",
        "```php",
        "'email' => $this->when($request->user()?->can('viewContact', $this->resource), $this->email),",
        "'total' => ['amount' => $this->total, 'currency' => 'UZS', 'formatted' => money($this->total)],",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ruxsatga qarab maydonlarni ko'rsatuvchi va pulni strukturali qaytaruvchi Resource yozing.",
      acceptanceCriteria: [
        "Transformatsiya qatlamining maqsadini tushuntira oladi",
        "Resource ichida so'rov qilmaydi"
      ],
      prerequisites: [
        "2.25"
      ]
    },
    {
      id: "18.18",
      title: "Backward Compatibility",
      description: [
        "Orqaga moslik — mavjud mijozlar o'zgarishsiz ishlashda davom etadi. **Buzuvchi bo'lmagan**: yangi ixtiyoriy maydon/parametr, yangi endpoint, yangi enum qiymati (agar mijozlar noma'lumni to'g'ri qayta ishlasa). **Buzuvchi**: maydonni o'chirish/qayta nomlash, tipni o'zgartirish, majburiy parametr qo'shish, status kodni o'zgartirish, validatsiyani kuchaytirish, xato formatini o'zgartirish.",
        "",
        "Amaliyot: kontrakt testlari (OpenAPI'ga qarshi), \"Tolerant Reader\" (mijozlar noma'lum maydonlarni e'tiborsiz qoldiradi), eski maydonni yangisi bilan birga qaytarish (deprecation davri), `Deprecation`/`Sunset` header'lari, mijoz versiyalari analitikasi.",
        "",
        "```http",
        "Deprecation: true",
        "Sunset: Wed, 31 Dec 2025 23:59:59 GMT",
        "Link: <https://docs.example.uz/migrate-v2>; rel=\"deprecation\"",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Maydonni qayta nomlashni orqaga mos tarzda bajaring: ikkala nom, deprecation header va muddat bilan.",
      acceptanceCriteria: [
        "Buzuvchi va buzuvchi bo'lmagan o'zgarishlarni ajrata oladi",
        "Deprecation jarayonini boshqaradi"
      ],
      prerequisites: [
        "18.12"
      ]
    },
    {
      id: "18.19",
      title: "API Performance",
      description: [
        "API tezligi omillari: DB so'rovlari (N+1, indekslar), javob hajmi (keraksiz maydonlar, katta ro'yxatlar — pagination, `fields`), siqish (gzip/brotli), keshlash (HTTP cache header'lari, ETag/304, server tomoni cache), og'ir ishlarni navbatga (`202 Accepted`), framework bootstrap (`config:cache`, `route:cache`, OPcache, Octane).",
        "",
        "O'lchov: p50/p95/p99 kechikish endpoint bo'yicha, javob hajmi, so'rovlar soni. Mobil mijozlar uchun \"chatty\" API (bitta ekran uchun 10 so'rov) — agregatsiya endpoint'i yoki `include`.",
        "",
        "```php",
        "return OrderResource::collection($orders)->response()",
        "    ->setEtag(md5($orders->max('updated_at')))",
        "    ->setPublic()->setMaxAge(30);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Eng sekin 3 ta endpoint'ni profiling qilib, p95 ni kamida 2 baravar kamaytiring.",
      acceptanceCriteria: [
        "API kechikishining asosiy manbalarini biladi",
        "HTTP keshlash va ETag'dan foydalanadi"
      ],
      prerequisites: [
        "53.2",
        "50.18"
      ]
    },
    {
      id: "18.20",
      title: "REST API Testing",
      description: [
        "API testlari: Laravel feature testlari (`getJson`, `postJson`, `assertStatus`, `assertJson`, `assertJsonPath`, `assertJsonStructure`, `assertJsonValidationErrors`), autentifikatsiya (`Sanctum::actingAs`), avtorizatsiya chegaralari (boshqa foydalanuvchi resursi — 403/404), validatsiya holatlari, pagination va filtrlar.",
        "",
        "Qo'shimcha qatlamlar: OpenAPI spetsifikatsiyasiga qarshi kontrakt testlari, tashqi API'lar uchun `Http::fake()`, smoke testlar deploy'dan keyin, Postman/Bruno kolleksiyalari qo'lda tekshiruv uchun.",
        "",
        "```php",
        "it('rejects access to another user order', function () {",
        "    $order = Order::factory()->create();",
        "    Sanctum::actingAs(User::factory()->create());",
        "",
        "    $this->getJson(\"/api/orders/{$order->id}\")->assertNotFound();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta resurs uchun to'liq test to'plamini yozing: CRUD, validatsiya, avtorizatsiya, pagination.",
      acceptanceCriteria: [
        "Laravel JSON assertion'larini ishlata oladi",
        "Avtorizatsiya chegaralarini testlaydi"
      ],
      prerequisites: [
        "feature-testing"
      ]
    },
    {
      id: "18.21",
      title: "API Idempotency va Distributed Rate Limiting",
      description: [
        "**API Idempotency (Bir xillik)**: Tarmoq uzilishi, timeout yoki mijozning tugmani 2 marta bosishi natijasida bir xil POST so'rov (masalan: to'lov, buyurtma yaratish) qayta kelganda, hisobdan 2 marta pul yechilmasligi yoki 2 ta buyurtma ochilmasligini kafolatlovchi mexanizm.",
        "",
        "**Amalga oshirish usuli (`Idempotency-Key` header)**:",
        "1. Mijoz so'rov sarlavhasida `Idempotency-Key: <UUID>` yuboradi.",
        "2. Middleware Redis atomik lock (`Cache::lock`) oladi. Agar kalit bo'yicha allaqachon bajarilgan javob keshda bo'lsa, kod qayta bajarilmasdan o'sha javob (HTTP status va body) darhol qaytariladi.",
        "3. Agar so'rov hozir ayni daqiqada bajarilayotgan bo'lsa, parallel ikkinchi so'rovga `409 Conflict` qaytariladi.",
        "",
        "**Distributed Rate Limiting**:",
        "Katta loyihalarda bir nechta API serverlari umumiy Redis cluster orqali Rate Limit hisoblaydi. Laravel'ning `RateLimiter::for()` vositasi Sliding Window algoritmi orqali DDoS va brute-force hujumlardan himoya qiladi hamda mijozga `Retry-After` va `X-RateLimit-*` sarlavhalarini qaytaradi.",
        "",
        "```php",
        "// Idempotency Middleware misoli",
        "$key = $request->header('Idempotency-Key');",
        "$lock = Cache::lock(\"idempotency_lock:{$key}\", 10);",
        "",
        "if (!$lock->get()) {",
        "    return response()->json(['error' => 'So\\'rov ayni paytda bajarilmoqda'], 409);",
        "}",
        "",
        "if ($cachedResponse = Cache::get(\"idempotency_res:{$key}\")) {",
        "    return response()->json($cachedResponse['data'], $cachedResponse['status']);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "To'lov qabul qilish endpoint'i uchun Redis Lock va `Idempotency-Key` header'iga asoslangan to'liq xavfsiz Idempotency Middleware yozing va testlang.",
      acceptanceCriteria: [
        "`Idempotency-Key` nima uchun moliyaviy API'larda shart ekanini tushuntira oladi",
        "Race condition va bir vaqtda parallel kelgan bir xil so'rovlarni (409 Conflict) to'g'ri qaytaradi",
        "Distributed Rate Limiting'da Redis drayveri va Sliding Window mexanizmini tushunadi"
      ],
      prerequisites: [
        "18.1",
        "12.1",
        "17.1"
      ]
    }
  ]
});
