/* 19 · API Design
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 19,
  slug: "api-design",
  title: "API Design",
  group: "api",
  description: "API Design — API'ni mahsulot sifatida loyihalash: u bir marta e'lon qilingach, uni o'zgartirish qimmat, chunki boshqalar unga tayanadi. Yaxshi API izchil, oldindan bashorat qilinadigan, hujjatlangan va kengaytiriladigan bo'ladi. Senior dasturchi shartnomalarni (contract) aniq belgilaydi va API'ni iste'molchi nuqtai nazaridan loyihalaydi.",
  subskills: [
    {
      id: "19.1",
      title: "Resource Naming",
      description: [
        "Resurs nomlari — otlar, ko'plikda, kichik harf, so'zlar defis bilan: `/orders`, `/order-items`, `/customers/{id}/addresses`. Fe'llardan qoching (`/getOrders`), fayl kengaytmalaridan (`.json`) va texnik detallardan (`/tbl_orders`).",
        "",
        "Domen tilini ishlating (biznes nima deydi — \"invoice\" yoki \"bill\"?), API bo'ylab bitta tushuncha uchun bitta nom. JSON maydonlari uchun ham yagona konvensiya (`snake_case` Laravel uchun tabiiy).",
        "",
        "```text",
        "✅ GET /api/v1/customers/7/invoices",
        "❌ GET /api/v1/getCustomerInvoiceList?custId=7",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API'dagi barcha resurs nomlarini konvensiya bo'yicha tekshirib, nomuvofiqlarni ro'yxatlang.",
      acceptanceCriteria: [
        "Resurslarni ko'plikdagi otlar bilan nomlaydi",
        "Domen tilidan izchil foydalanadi"
      ],
      prerequisites: [
        "18.2"
      ]
    },
    {
      id: "19.2",
      title: "URI Design",
      description: [
        "Yaxshi URI ierarxiyani ifodalaydi, qisqa va barqaror. Qoidalar: identifikator path'da, filtr/saralash query'da; ichma-ichlik 2 darajadan oshmasin (`/customers/7/orders` ✅, `/customers/7/orders/42/items/3/discounts` ❌ — `/order-items/3/discounts`); trailing slash'ga izchil munosabat; versiya prefiksi (`/v1`).",
        "",
        "URI'lar resursning \"manzili\" — u o'zgarmasligi kerak; ichki id'lar o'rniga barqaror identifikatorlar (ULID, slug) ommaviy API uchun yaxshiroq.",
        "",
        "```text",
        "/v1/orders/{order}/items          bola resurs (to'liq kontekst)",
        "/v1/order-items/{item}            to'g'ridan-to'g'ri murojaat (shallow)",
        "/v1/orders?customer_id=7          filtr sifatida",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API URI daraxtini chizing va 2 darajadan chuqur ichma-ichliklarni soddalashtiring.",
      acceptanceCriteria: [
        "Ichma-ichlik chuqurligini cheklaydi",
        "Path va query vazifalarini to'g'ri ajratadi"
      ],
      prerequisites: [
        "19.1"
      ]
    },
    {
      id: "19.3",
      title: "HTTP Method Semantics",
      description: [
        "Har bir metodning semantikasi mijoz va infratuzilma (proxy, kesh, retry kutubxonalari) uchun va'da: GET — xavfsiz va keshlanadigan; PUT/DELETE — idempotent (avtomatik retry mumkin); POST — idempotent emas (retry uchun idempotency key); PATCH — qisman o'zgarish (JSON Merge Patch yoki JSON Patch formati).",
        "",
        "Semantikani buzish (GET bilan o'chirish, POST bilan o'qish) keshlash, xavfsizlik va retry xatti-harakatini buzadi. Murakkab qidiruv uchun POST `/orders/search` — qabul qilinadigan istisno.",
        "",
        "```http",
        "PATCH /v1/customers/7",
        "Content-Type: application/merge-patch+json",
        "",
        "{\"phone\": \"+998901234567\", \"middle_name\": null}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API'dagi har bir endpoint metodini semantika bo'yicha tekshirib, retry xavfsizligini hujjatlashtiring.",
      acceptanceCriteria: [
        "Metod semantikasining infratuzilma uchun ahamiyatini tushunadi",
        "JSON Merge Patch formatini biladi"
      ],
      prerequisites: [
        "18.3"
      ]
    },
    {
      id: "19.4",
      title: "Status Code Selection",
      description: [
        "Status kod tanlash mezoni — mijoz nima qilishi kerak? `2xx` — muvaffaqiyat; `4xx` — mijoz so'rovini o'zgartirishi kerak (qayta yuborish foydasiz); `5xx` — server muammosi (keyinroq qayta urinish mumkin). Aniq kod: `201` (yaratildi), `202` (qabul qilindi, keyin bajariladi), `204` (body yo'q), `409` (holat konflikti — masalan, to'langan buyurtmani bekor qilish), `422` (semantik validatsiya), `429` (limit).",
        "",
        "Kodlar sonini haddan oshirmang — izchil kichik to'plam tanlang va hujjatlashtiring.",
        "",
        "```text",
        "POST /orders           → 201 + Location",
        "POST /reports          → 202 + Location: /reports/jobs/91",
        "DELETE /orders/42      → 204",
        "POST /orders/42/cancel → 409 (allaqachon jo'natilgan)",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API uchun status kodlar siyosatini yozing: qaysi holatda qaysi kod va mijoz nima qilishi kerak.",
      acceptanceCriteria: [
        "4xx va 5xx ning mijoz uchun ma'nosini tushuntira oladi",
        "409 va 422 ni to'g'ri ajratadi"
      ],
      prerequisites: [
        "18.4"
      ]
    },
    {
      id: "19.5",
      title: "Request Validation",
      description: [
        "Har bir kiruvchi ma'lumot server tomonida validatsiya qilinadi: tip, format, chegaralar, majburiylik, biznes qoidalar (mavjud va ruxsat etilgan resursga havola). Xatolar maydon bo'yicha, mashina o'qiy oladigan formatda, `422` bilan.",
        "",
        "Qo'shimcha: noma'lum maydonlar siyosati (e'tiborsiz qoldirish yoki rad etish), massiv va ichma-ich ob'ektlar uchun chegaralar (DoS'ga qarshi — `items` max 100), so'rov hajmi limiti, query parametrlarini ham validatsiya qilish. Laravel Form Request'lari va `Rule::exists()->where(tenant)`.",
        "",
        "```php",
        "'items'              => ['required', 'array', 'min:1', 'max:100'],",
        "'items.*.product_id' => ['required', Rule::exists('products', 'id')->where('tenant_id', $tenantId)],",
        "'items.*.qty'        => ['required', 'integer', 'between:1,999'],",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Murakkab so'rov uchun validatsiyani ichma-ich massiv chegaralari va tenant'ga bog'langan `exists` bilan yozing.",
      acceptanceCriteria: [
        "Massiv o'lchamlariga chegara qo'yadi",
        "`exists` qoidasini tenant doirasida cheklaydi"
      ],
      prerequisites: [
        "2.13"
      ]
    },
    {
      id: "19.6",
      title: "Consistent Response Format",
      description: [
        "Barcha endpoint'lar bir xil \"shakl\"da javob beradi: resurs `data` ichida (yoki bevosita — lekin izchil), kolleksiyalar uchun `data` + `meta` + `links`, sana/pul/enum formatlari bir xil, `null` va bo'sh qiymatlarga yagona munosabat, maydon nomlash konvensiyasi bir xil.",
        "",
        "Izchillik mijozda umumiy kod (SDK, interceptor) yozish imkonini beradi. Laravel'da barcha javoblarni API Resource orqali qaytarish va base resource class bilan umumiy formatlash.",
        "",
        "```json",
        "{",
        "  \"data\": [{ \"id\": \"01J...\", \"type\": \"order\", \"status\": \"paid\" }],",
        "  \"links\": { \"next\": \"https://api.example.uz/v1/orders?cursor=...\" },",
        "  \"meta\": { \"per_page\": 20 }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Turli formatda javob qaytaradigan endpoint'larni yagona Resource asosidagi formatga keltiring.",
      acceptanceCriteria: [
        "Javob shaklini API bo'ylab izchil saqlaydi",
        "Formatni markazlashtirilgan joyda boshqaradi"
      ],
      prerequisites: [
        "18.5"
      ]
    },
    {
      id: "19.7",
      title: "Error Format",
      description: [
        "Xato formati shartnomaning bir qismi: barqaror mashina kodi (`code: \"card_declined\"`), inson uchun xabar (lokalizatsiya qilinishi mumkin), HTTP status, maydon xatolari, `request_id`, ixtiyoriy hujjat havolasi. RFC 9457 Problem Details — tayyor standart.",
        "",
        "Xato kodlari ro'yxatini hujjatlashtiring va ularni o'zgartirmang — mijozlar ular bo'yicha logika yozadi. Xabarlar matni o'zgarishi mumkin, kodlar emas. 5xx da ichki tafsilot yo'q, faqat `request_id`.",
        "",
        "```json",
        "{",
        "  \"status\": 422,",
        "  \"code\": \"validation_failed\",",
        "  \"message\": \"Ma'lumotlar noto'g'ri\",",
        "  \"errors\": { \"items.0.qty\": [{ \"code\": \"max\", \"message\": \"999 dan oshmasligi kerak\" }] },",
        "  \"request_id\": \"01J2...\"",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API xato kodlari katalogini yarating va handler'da ularni barqaror formatda qaytaring.",
      acceptanceCriteria: [
        "Mashina kodi va inson xabarini ajratadi",
        "Xato kodlarini shartnoma sifatida barqaror saqlaydi"
      ],
      prerequisites: [
        "18.13"
      ]
    },
    {
      id: "19.8",
      title: "Pagination Contracts",
      description: [
        "Pagination shartnomasi: qaysi tur (offset/page yoki cursor), parametr nomlari (`page`, `per_page`, `cursor`), default va maksimal sahifa hajmi, javobdagi metadata (`next`, `prev`, ixtiyoriy `total`), tartib kafolati (barqaror tartib — unikal kalit bilan).",
        "",
        "Bir marta tanlangan shartnomani butun API bo'ylab qo'llang. Umumiy son (`total`) qimmat bo'lishi mumkin — ixtiyoriy qilish (`?include_total=1`) yoki taxminiy. Havolalarni to'liq URL sifatida berish mijozni soddalashtiradi.",
        "",
        "```text",
        "GET /v1/orders?per_page=50&cursor=eyJpZCI6...",
        "→ links.next, links.prev; per_page max 100; tartib: created_at desc, id desc",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "API uchun pagination shartnomasini hujjatlashtiring va barcha ro'yxat endpoint'larini unga moslang.",
      acceptanceCriteria: [
        "Pagination parametrlari va metadata'sini izchil belgilaydi",
        "Barqaror tartibni kafolatlaydi"
      ],
      prerequisites: [
        "18.10"
      ]
    },
    {
      id: "19.9",
      title: "Filtering va Sorting Contracts",
      description: [
        "Filtr va saralash sintaksisi butun API'da bir xil: masalan `filter[status]=paid,shipped` (IN), `filter[created_at][gte]=2025-01-01` (operatorlar), `sort=-created_at,id`. Har bir endpoint uchun ruxsat etilgan maydonlar va operatorlar hujjatlashtiriladi; ruxsat etilmagan filtr — `400` (jimgina e'tiborsiz qoldirish xatolarni yashiradi).",
        "",
        "Performance: har bir ruxsat etilgan filtr/saralash indeks bilan qo'llab-quvvatlanishi kerak — aks holda bitta parametr DB'ni yiqitishi mumkin. Murakkab qidiruv uchun alohida qidiruv endpoint'i yoki search engine.",
        "",
        "```text",
        "GET /v1/orders?filter[status]=paid,shipped&filter[total][gte]=100000&sort=-created_at",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Filtr operatorlari sintaksisini belgilang va har bir ruxsat etilgan filtrning indeks bilan qoplanganini tekshiring.",
      acceptanceCriteria: [
        "Yagona filtr sintaksisini loyihalaydi",
        "Filtrlarni indekslar bilan muvofiqlashtiradi"
      ],
      prerequisites: [
        "18.10"
      ]
    },
    {
      id: "19.10",
      title: "API Versioning Strategy",
      description: [
        "Versiyalash strategiyasi: qaysi usul (URI — eng keng tarqalgan), nima buzuvchi o'zgarish hisoblanadi, nechta versiya bir vaqtda qo'llab-quvvatlanadi, deprecation muddati (masalan, 12 oy), iste'molchilarni xabardor qilish yo'li.",
        "",
        "Alternativ — \"versiyasiz evolyutsiya\": faqat qo'shimcha o'zgarishlar, eskilarni deprecation bilan saqlash (Stripe uslubidagi sana-asosli versiyalar ham variant). Ichki API'lar uchun ko'pincha versiyalashdan ko'ra iste'molchilar bilan muvofiqlashtirish arzonroq.",
        "",
        "```text",
        "v1 — joriy (2024-01 dan)",
        "v2 — chiqarildi 2025-06; v1 sunset: 2026-06-30",
        "Buzuvchi o'zgarish = faqat yangi major versiyada",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API versiyalash siyosati hujjatini yozing: usul, buzuvchi o'zgarish ta'rifi, muddatlar, aloqa kanali.",
      acceptanceCriteria: [
        "Versiyalash usullaridan asosli tanlaydi",
        "Deprecation siyosatini belgilaydi"
      ],
      prerequisites: [
        "18.12"
      ]
    },
    {
      id: "19.11",
      title: "Backward Compatibility",
      description: [
        "API dizaynida orqaga moslikni boshidan ta'minlash: kengaytiriladigan tuzilmalar (pul — `{amount, currency}` obyekti, keyin qo'shimcha maydon oson), enum'lar uchun \"noma'lum qiymat\" holati, ixtiyoriy yangi parametrlar default bilan, javobdagi maydonlar faqat qo'shiladi.",
        "",
        "Mijozlar \"tolerant reader\" bo'lishi kerak — noma'lum maydon va enum qiymatlarini e'tiborsiz qoldirish; buni hujjatda talab qiling. Har bir o'zgarishni kontrakt testlari va iste'molchilar ro'yxati bilan tekshiring.",
        "",
        "```json",
        "// Kengaytiriladigan: keyinchalik \"formatted\", \"precision\" qo'shish buzmaydi",
        "\"total\": { \"amount\": \"150000.00\", \"currency\": \"UZS\" }",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "API javoblarida kelajakda buzuvchi o'zgarishni talab qilishi mumkin bo'lgan 3 ta dizayn qarorini toping va tuzating.",
      acceptanceCriteria: [
        "Kengaytiriladigan tuzilmalarni loyihalaydi",
        "Tolerant reader tamoyilini hujjatlashtiradi"
      ],
      prerequisites: [
        "18.18"
      ]
    },
    {
      id: "19.12",
      title: "Idempotency Keys",
      description: [
        "Idempotency key dizayni: header nomi (`Idempotency-Key`), format (UUID), qaysi endpoint'lar qo'llab-quvvatlaydi (barcha \"pul\" va yaratish POST'lari), saqlash muddati (24–72 soat), qayta ishlash qoidalari: bir xil kalit + bir xil body → saqlangan javob; bir xil kalit + boshqa body → `422`; birinchi so'rov hali bajarilmoqda → `409`.",
        "",
        "Mijozga qo'llanma: har bir mantiqiy amal uchun yangi kalit, retry'larda o'sha kalit. Server tomonida kalit + natija atomik saqlanishi kerak.",
        "",
        "```http",
        "POST /v1/payments",
        "Idempotency-Key: 7b9e1c2a-4d5f-4e8b-9a1c-2f3e4d5c6b7a",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Idempotency key shartnomasini hujjatlashtiring: muddatlar, xato holatlari, mijoz uchun qo'llanma.",
      acceptanceCriteria: [
        "Idempotency key'ning chekka holatlarini belgilaydi",
        "Mijozga retry qo'llanmasini beradi"
      ],
      prerequisites: [
        "18.14"
      ]
    },
    {
      id: "19.13",
      title: "Rate Limits",
      description: [
        "Rate limit dizayni: limit kaliti (API key, foydalanuvchi, IP), oyna va hajm, endpoint guruhlari bo'yicha turli limitlar, tarif rejalariga bog'liqlik, javob header'lari (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` yoki `X-RateLimit-*`), `429` + `Retry-After`.",
        "",
        "Hujjatda limitlarni oshkora ko'rsatish va mijozlarga eksponensial backoff tavsiya qilish. Ichki servislar va webhook qabul qiluvchilar uchun alohida siyosat. Limitlar monitoring qilinadi — ko'p 429 limit juda past ekanini yoki suiiste'molni bildiradi.",
        "",
        "```http",
        "HTTP/1.1 429 Too Many Requests",
        "Retry-After: 30",
        "RateLimit-Limit: 60",
        "RateLimit-Remaining: 0",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "API uchun rate limit siyosatini hujjatlashtiring va javob header'larini barcha endpoint'larda joriy qiling.",
      acceptanceCriteria: [
        "Limit kaliti va guruhlarini loyihalaydi",
        "Mijozga limit holatini header'lar orqali bildiradi"
      ],
      prerequisites: [
        "18.15"
      ]
    },
    {
      id: "19.14",
      title: "Authentication Strategy",
      description: [
        "Autentifikatsiya strategiyasi iste'molchiga qarab: birinchi tomon SPA — cookie session (Sanctum stateful, CSRF bilan); mobil ilova — token (Sanctum PAT yoki OAuth2 + PKCE); uchinchi tomon ilovalar — OAuth2 authorization code; server-server — client credentials yoki API key; ichki mikroservislar — mTLS yoki JWT.",
        "",
        "Qarorlar: token muddati va yangilash, bekor qilish, saqlash joyi, ko'p qurilmali sessiyalar, MFA. Bitta API turli usullarni qo'llab-quvvatlashi mumkin — guard'lar orqali.",
        "",
        "```php",
        "Route::middleware('auth:sanctum')->group(...);        // SPA + mobil",
        "Route::middleware('client')->group(...);              // Passport client credentials",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API iste'molchilari ro'yxatini tuzib, har biri uchun autentifikatsiya usulini asoslang.",
      acceptanceCriteria: [
        "Iste'molchi turiga mos usulni tanlaydi",
        "Token hayot davrini rejalashtiradi"
      ],
      prerequisites: [
        "20.1"
      ]
    },
    {
      id: "19.15",
      title: "Authorization Model",
      description: [
        "Avtorizatsiya modeli: **RBAC** (rollar → ruxsatlar), **ABAC** (atributlar: egasi, bo'lim, vaqt), **ReBAC** (munosabatlar: \"hujjat jamoasining a'zosi\"), token scope'lari (ilova nimaga ruxsat olgan). Ko'pincha kombinatsiya: rol + egalik + scope.",
        "",
        "Dizayn qoidalari: deny by default, obyekt darajasida tekshirish har endpoint'da, ro'yxatlarni ham filtrlash, ruxsatlarni kodda markazlashtirish (policy'lar), ruxsat matritsasini hujjatlashtirish. Laravel: policy'lar, `spatie/laravel-permission`, Sanctum abilities.",
        "",
        "```text",
        "Ruxsat = (foydalanuvchi roli ∋ \"orders.update\") ∧ (order.tenant_id = user.tenant_id) ∧ (token ∋ \"orders:write\")",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API uchun ruxsatlar matritsasini (rol × resurs × amal) tuzing va policy'lar bilan amalga oshiring.",
      acceptanceCriteria: [
        "RBAC, ABAC va scope'larni farqlaydi",
        "Deny by default tamoyilini qo'llaydi"
      ],
      prerequisites: [
        "20.10"
      ]
    },
    {
      id: "19.16",
      title: "Bulk Operations",
      description: [
        "Ommaviy endpoint'lar ko'p so'rovni bittaga birlashtiradi: `POST /v1/products/batch` (yaratish/yangilash), `DELETE /v1/notifications?ids=...`. Dizayn savollari: atomik (hammasi yoki hech biri) yoki qisman muvaffaqiyat (har element uchun alohida natija — `207 Multi-Status` yoki `200` + natijalar massivi), maksimal hajm, idempotentlik, katta hajm uchun asinxron (`202` + job holati).",
        "",
        "Qisman muvaffaqiyatda javob har bir elementning holati va xatosini indeks bilan qaytarishi kerak.",
        "",
        "```json",
        "{",
        "  \"results\": [",
        "    { \"index\": 0, \"status\": 201, \"id\": \"01J...\" },",
        "    { \"index\": 1, \"status\": 422, \"errors\": { \"sku\": [\"band\"] } }",
        "  ]",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Mahsulotlarni ommaviy import qiluvchi endpoint yozing: 500 tagacha element, har biri uchun natija.",
      acceptanceCriteria: [
        "Atomik va qisman muvaffaqiyat modellarini tanlaydi",
        "Ommaviy so'rov hajmini cheklaydi"
      ],
      prerequisites: [
        "9.24"
      ]
    },
    {
      id: "19.17",
      title: "Long-Running Operations",
      description: [
        "Uzoq amallar (hisobot, eksport, video ishlash) sinxron so'rovda bajarilmaydi — timeout va resurs bandligi. Pattern: `POST /v1/reports` → `202 Accepted` + `Location: /v1/report-jobs/91`; mijoz holatni so'raydi (`GET` → `pending`/`processing`/`completed`/`failed`, `progress`) yoki webhook/push orqali xabar oladi; tayyor natija havolasi (vaqtinchalik URL).",
        "",
        "Laravel: job + holat jadvali, `Bus::batch()` progress uchun, natija S3'da temporary URL. Bekor qilish (`DELETE /report-jobs/91`) va idempotentlik.",
        "",
        "```json",
        "{ \"id\": 91, \"status\": \"processing\", \"progress\": 64, \"result_url\": null, \"created_at\": \"2025-06-01T10:00:00Z\" }",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Katta eksportni 202 + holat endpoint'i + tayyor bo'lganda webhook bilan amalga oshiring.",
      acceptanceCriteria: [
        "Asinxron amal pattern'ini loyihalaydi",
        "Polling va webhook o'rtasida tanlaydi"
      ],
      prerequisites: [
        "46.9"
      ]
    },
    {
      id: "19.18",
      title: "Deprecation Policy",
      description: [
        "Deprecation siyosati: qanday e'lon qilinadi (changelog, email, `Deprecation`/`Sunset` header'lari, hujjatda belgi), qancha muddat qo'llab-quvvatlanadi (ommaviy API — 6–12+ oy), iste'molchilar monitoringi (kim hali eski endpoint'ni ishlatyapti — log/metrika), migratsiya qo'llanmasi, muddat oxirida \"brownout\" (vaqtincha o'chirib ko'rish) va keyin olib tashlash.",
        "",
        "Siyosat oldindan e'lon qilingan va izchil bo'lsa, iste'molchilar ishonchi oshadi va eski kodni olib tashlash osonlashadi.",
        "",
        "```php",
        "Route::get('v1/orders/{order}/summary', ...)->middleware('deprecated:2026-06-30,/docs/migrate-summary');",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Deprecated endpoint'larga header qo'shuvchi va ularning ishlatilishini metrikaga yozuvchi middleware yarating.",
      acceptanceCriteria: [
        "Deprecation jarayonining bosqichlarini biladi",
        "Eski endpoint iste'molchilarini kuzatadi"
      ],
      prerequisites: [
        "18.18"
      ]
    },
    {
      id: "19.19",
      title: "API Contract Testing",
      description: [
        "Kontrakt testlari API haqiqiy xatti-harakati hujjatlangan shartnomaga (OpenAPI) mos kelishini tekshiradi: so'rov va javob sxemalari, status kodlar, majburiy maydonlar. Ikki yo'nalish: provider testlari (server spetsifikatsiyaga mos) va consumer-driven contract'lar (Pact — iste'molchilar kutgan narsani provider buzmaganini tekshirish).",
        "",
        "Laravel'da: feature testlarda javobni OpenAPI sxemasiga qarshi validatsiya qilish (`league/openapi-psr7-validator`, `spectator`), CI'da spetsifikatsiya o'zgarishlarini breaking-change detektori bilan tekshirish (`oasdiff`).",
        "",
        "```php",
        "it('matches the OpenAPI contract', function () {",
        "    Spectator::using('openapi.yaml');",
        "    $this->getJson('/api/v1/orders/1')->assertValidRequest()->assertValidResponse(200);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Muhim endpoint'lar uchun OpenAPI sxemasiga qarshi kontrakt testlarini va CI'da `oasdiff` tekshiruvini qo'shing.",
      acceptanceCriteria: [
        "Provider va consumer-driven kontrakt testlarini farqlaydi",
        "Spetsifikatsiyadagi buzuvchi o'zgarishlarni avtomatik aniqlaydi"
      ],
      prerequisites: [
        "76.16"
      ]
    },
    {
      id: "19.20",
      title: "Developer Experience",
      description: [
        "API'ning DX'i — iste'molchi dasturchining API bilan qanchalik tez va oson ishlay olishi: aniq hujjat (OpenAPI + misollar + qo'llanmalar), \"5 daqiqada birinchi so'rov\" (quickstart), sandbox muhit va test kalitlari, tushunarli xato xabarlari (nima noto'g'ri va qanday tuzatish), izchil dizayn, SDK'lar, changelog, Postman/Bruno kolleksiyasi, status sahifasi.",
        "",
        "DX'ni o'lchash: birinchi muvaffaqiyatli so'rovgacha vaqt, support so'rovlari mavzulari, hujjatdagi qidiruvlar. Yaxshi DX — kamroq support va tezroq integratsiya.",
        "",
        "```text",
        "Xato: \"Invalid request\"                          ❌",
        "Xato: \"items.0.qty 999 dan oshmasligi kerak (berildi: 1500)\"  ✅",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "API uchun quickstart qo'llanma va Postman kolleksiyasi tayyorlab, yangi dasturchi bilan sinab ko'ring.",
      acceptanceCriteria: [
        "DX omillarini sanab bera oladi",
        "Xato xabarlarini harakatga yo'naltiruvchi qilib yozadi"
      ],
      prerequisites: [
        "api-documentation"
      ]
    }
  ]
});
