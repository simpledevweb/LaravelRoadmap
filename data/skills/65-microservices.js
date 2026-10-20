/* 65 · Microservices
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 65,
  slug: "microservices",
  title: "Microservices",
  group: "architecture",
  description: "Mikroservislar — tizimni mustaqil deploy qilinadigan, o'z ma'lumotiga ega kichik servislarga bo'lish arxitekturasi. U katta tashkilotlarga jamoalar mustaqilligi va masshtablashni beradi, lekin taqsimlangan tizimlarning barcha murakkabliklarini olib keladi. Senior dasturchi mikroservislarning foydasi va narxini biladi, servis chegaralarini to'g'ri belgilaydi va chidamli integratsiyalar quradi.",
  subskills: [
    {
      id: "65.1",
      title: "Service Boundaries",
      description: [
        "Servis chegarasi — eng muhim va eng qimmat qaror: noto'g'ri chegara \"taqsimlangan monolit\"ga olib keladi (har o'zgarish bir nechta servisni o'zgartirishni talab qiladi, ular doim birga deploy qilinadi). Yaxshi chegara: biznes qobiliyati bo'yicha (ordering, billing, shipping — texnik qatlam bo'yicha emas), yuqori ichki cohesion, past tashqi coupling, mustaqil o'zgarish.",
        "",
        "Chegaralarni topish: bounded context'lar (DDD), birga o'zgaradigan narsalar, jamoa tuzilmasi (Conway qonuni). Modulli monolitda chegaralarni sinab ko'rib, keyin ajratish — eng xavfsiz yo'l.",
        "",
        "```text",
        "❌ Texnik bo'lish: UserService, DatabaseService, EmailService",
        "✅ Biznes qobiliyati: Ordering, Billing, Catalog, Shipping, Identity",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Monolitdagi modullarni potentsial servis chegaralari sifatida baholab, birga o'zgarish chastotasini tahlil qiling.",
      acceptanceCriteria: [
        "Servis chegarasini biznes qobiliyati bo'yicha belgilaydi",
        "Taqsimlangan monolit xavfini biladi"
      ],
      prerequisites: [
        "63.11"
      ]
    },
    {
      id: "65.2",
      title: "Bounded Contexts",
      description: [
        "Mikroservislar uchun bounded context — tabiiy chegara: har kontekst o'z modeli, tili va ma'lumotiga ega; bir servis odatda bitta kontekstni (yoki uning bir qismini) amalga oshiradi. Kontekstlar o'rtasidagi integratsiya — aniq shartnomalar (API, event'lar) va tarjima (ACL).",
        "",
        "Bir xil \"Mijoz\" turli servislarda turli modelga ega — umumiy \"Customer servisi\"ni hamma ishlatishi — kuchli coupling. Context map servislararo munosabatlar va jamoalar o'zaro bog'liqligini ko'rsatadi.",
        "",
        "```text",
        "Ordering servisi: Customer(id, shipping_addresses)",
        "Billing servisi:  Payer(id, billing_details, payment_methods)",
        "Marketing:        Contact(id, segments, preferences)",
        "Identity:         User(id, credentials) — yagona manba faqat autentifikatsiya uchun",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Rejalashtirilgan servislar uchun bounded context'lar va ular orasidagi integratsiya turlarini xaritalang.",
      acceptanceCriteria: [
        "Bounded context'ni servis chegarasi sifatida qo'llaydi",
        "Umumiy model coupling'ining oldini oladi"
      ],
      prerequisites: [
        "65.1"
      ]
    },
    {
      id: "65.3",
      title: "Independent Deployment",
      description: [
        "Mustaqil deploy — mikroservislarning asosiy foydasi: har servis boshqalarni kutmasdan, ularni sindirmasdan chiqariladi. Shartlar: orqaga mos API va event shartnomalari (versiyalash, faqat qo'shimcha o'zgarishlar), har servisning o'z CI/CD pipeline'i, servisga xos DB (umumiy DB — mustaqil deploy imkonsiz), feature flag'lar, contract testlar.",
        "",
        "Agar servislarni har doim birga deploy qilish kerak bo'lsa — bu chegara noto'g'ri ekanining belgisi (taqsimlangan monolit).",
        "",
        "```text",
        "Billing v2.3 deploy → Ordering (v1.8) hali eski event formatini kutadi",
        "→ Billing ikkala formatni ham chiqaradi (v1 va v2) → Ordering yangilangach v1 to'xtatiladi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki servis o'rtasidagi API o'zgarishini ularni birga deploy qilmasdan, orqaga mos tarzda amalga oshiring.",
      acceptanceCriteria: [
        "Mustaqil deploy shartlarini biladi",
        "Birga deploy zaruratini noto'g'ri chegara belgisi deb taniydi"
      ],
      prerequisites: [
        "18.18"
      ]
    },
    {
      id: "65.4",
      title: "Service-to-Service Communication",
      description: [
        "Servislararo aloqa: **sinxron** (HTTP/REST, gRPC — so'rov-javob; oddiy, darhol javob, lekin vaqt bo'yicha coupling — biri ishlamasa ikkinchisi ham ta'sirlanadi, kaskad kechikishlar) va **asinxron** (xabarlar/event'lar broker orqali — mustaqil, chidamli, lekin eventual consistency va murakkab debug).",
        "",
        "Qoida: so'rov yo'lidagi sinxron chaqiruvlar zanjirini qisqa saqlash (A→B→C→D — mavjudlik ko'paytmasi kamayadi); holat o'zgarishlarini event'lar bilan tarqatish; o'qish uchun kerakli ma'lumotni lokal nusxada saqlash (event-carried state).",
        "",
        "```text",
        "Sinxron: Checkout → GET /inventory/stock (javob kerak hozir)",
        "Asinxron: Ordering → OrderPlaced event → Billing, Shipping, Notifications (har biri o'zi)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta oqimdagi servislararo chaqiruvlarni sinxron va asinxronga ajratib, sinxron zanjir uzunligini kamaytiring.",
      acceptanceCriteria: [
        "Sinxron va asinxron aloqa murosasini biladi",
        "Sinxron chaqiruvlar zanjirini qisqa saqlaydi"
      ],
      prerequisites: [
        "48.4"
      ]
    },
    {
      id: "65.5",
      title: "REST and Messaging",
      description: [
        "**REST/HTTP** — so'rovlar (query) va darhol natija kerak bo'lgan buyruqlar uchun; standart, oson debug, keng qo'llab-quvvatlanadi; timeout, retry va circuit breaker majburiy. **gRPC** — ichki servislar uchun samarali binar protokol, qat'iy shartnoma (protobuf). **Messaging** (RabbitMQ, Kafka, SQS) — event'lar va asinxron buyruqlar; yetkazish kafolatlari, idempotent iste'molchilar.",
        "",
        "Shartnomalar: OpenAPI (REST), protobuf (gRPC), AsyncAPI yoki JSON Schema (event'lar) — versiyalangan va contract testlar bilan.",
        "",
        "```php",
        "// Sinxron so'rov — himoyalar bilan",
        "$stock = Http::baseUrl(config('services.inventory.url'))",
        "    ->withToken($this->serviceToken())",
        "    ->connectTimeout(1)->timeout(2)",
        "    ->retry(2, 100, fn ($e) => $e instanceof ConnectionException)",
        "    ->get(\"/v1/stock/{$sku}\")->throw()->json('available');",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Servislararo REST chaqiruviga timeout, retry va autentifikatsiya qo'shing va bitta oqimni event'ga o'tkazing.",
      acceptanceCriteria: [
        "REST, gRPC va messaging qo'llanishini biladi",
        "Har aloqa turi uchun shartnoma vositasini tanlaydi"
      ],
      prerequisites: [
        "49.20"
      ]
    },
    {
      id: "65.6",
      title: "API Gateway",
      description: [
        "API Gateway — tashqi mijozlar uchun yagona kirish nuqtasi: marshrutlash (so'rovni tegishli servisga), autentifikatsiya va token tekshiruvi, rate limiting, TLS, so'rovlarni agregatsiya qilish (bitta mijoz so'rovi → bir nechta servis), protokol tarjimasi, kuzatuvchanlik (log, metrika, tracing). Vositalar: Kong, Traefik, Envoy, AWS API Gateway, Nginx.",
        "",
        "**BFF** (Backend for Frontend) — har mijoz turi (web, mobil) uchun alohida gateway/agregator. Xavf: gateway'ga biznes mantiq qo'shish (u yupqa bo'lishi kerak) va yagona nosozlik nuqtasi (HA kerak).",
        "",
        "```text",
        "Mobil ilova → API Gateway (auth, rate limit) → /orders → Ordering",
        "                                            → /payments → Billing",
        "                                            → /me (agregatsiya) → Identity + Ordering",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Ikki servis oldiga Traefik yoki Nginx asosidagi gateway qo'yib, umumiy autentifikatsiya va rate limit'ni sozlang.",
      acceptanceCriteria: [
        "API Gateway vazifalarini biladi",
        "Gateway'ni yupqa saqlash va BFF naqshini tushunadi"
      ],
      prerequisites: [
        "41.2"
      ]
    },
    {
      id: "65.7",
      title: "Service Discovery",
      description: [
        "Service discovery — servislar bir-birining manzilini qanday topadi (IP'lar dinamik — konteynerlar qayta ishga tushadi, masshtablanadi). **Client-side** (servis registry'dan — Consul, Eureka — manzillarni olib, o'zi tanlaydi) va **server-side** (load balancer/DNS orqali — Kubernetes Service, AWS ALB). Kubernetes'da DNS asosidagi discovery o'rnatilgan (`http://billing.default.svc.cluster.local`).",
        "",
        "Health check'lar bilan birga — faqat sog'lom instance'larga yo'naltirish. Laravel ilovasi uchun odatda platformaning discovery'si (K8s Service, Docker Compose DNS) yetarli.",
        "",
        "```env",
        "BILLING_SERVICE_URL=http://billing:8080       # Compose/K8s DNS",
        "INVENTORY_SERVICE_URL=http://inventory.prod.svc.cluster.local",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Docker Compose yoki Kubernetes'da ikki servisning DNS asosidagi discovery'sini sozlab, replikalar orasida yuklama taqsimlanishini tekshiring.",
      acceptanceCriteria: [
        "Client-side va server-side discovery farqini biladi",
        "Platformaning discovery mexanizmidan foydalanadi"
      ],
      prerequisites: [
        "37.14"
      ]
    },
    {
      id: "65.8",
      title: "Data Ownership",
      description: [
        "Har ma'lumot bitta servisga tegishli — u yagona \"haqiqat manbai\" va yagona yozuvchi. Boshqa servislar unga faqat egasining API'si yoki event'lari orqali kiradi; boshqa servis jadvallariga to'g'ridan-to'g'ri SQL so'rov — eng og'ir coupling (sxema o'zgarishi boshqa servislarni sindiradi).",
        "",
        "Boshqa servisga ma'lumot kerak bo'lsa: API so'rovi (sinxron, yangi), event'lar orqali lokal nusxa/proyeksiya (asinxron, tez, eventual) — qaysi biri tanlanishi kechikish va yangilik talablariga bog'liq.",
        "",
        "```text",
        "Billing — Invoice egasi. Ordering hisob-faktura holatini bilishi kerak:",
        "❌ SELECT status FROM billing.invoices WHERE ...",
        "✅ GET /billing/v1/invoices/{id}  yoki  InvoiceSettled event → Ordering'da lokal flag",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Servislararo to'g'ridan-to'g'ri DB murojaatlarini topib, API yoki event asosidagi integratsiyaga almashtiring.",
      acceptanceCriteria: [
        "Ma'lumot egaligi tamoyilini biladi",
        "Umumiy DB coupling'idan qochadi"
      ],
      prerequisites: [
        "61.14"
      ]
    },
    {
      id: "65.9",
      title: "Database per Service",
      description: [
        "Har servisning o'z DB'si (yoki hech bo'lmaganda o'z sxemasi va kirish huquqlari): sxemani mustaqil o'zgartirish, mustaqil masshtablash, servisga mos DB turi (polyglot persistence — PostgreSQL, Redis, Elasticsearch). Bu mustaqil deploy'ning sharti.",
        "",
        "Narxi: servislararo JOIN yo'q (API kompozitsiyasi yoki CQRS proyeksiyalari), distributed tranzaksiyalar yo'q (saga), ma'lumot takrorlanishi (event'lar orqali nusxalar), ko'proq DB boshqaruvi. Boshlanishda bitta DB server'da alohida sxemalar va foydalanuvchilar — pragmatik kelishuv.",
        "",
        "```sql",
        "CREATE SCHEMA billing;  CREATE USER billing_svc ...; GRANT ALL ON SCHEMA billing TO billing_svc;",
        "CREATE SCHEMA ordering; CREATE USER ordering_svc ...; GRANT ALL ON SCHEMA ordering TO ordering_svc;",
        "-- billing_svc ordering sxemasiga kira olmaydi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki servis uchun alohida sxema va DB foydalanuvchilarini yaratib, kesishuvchi kirishni taqiqlang.",
      acceptanceCriteria: [
        "Database per service foydasi va narxini biladi",
        "Pragmatik bosqichma-bosqich ajratishni qo'llaydi"
      ],
      prerequisites: [
        "65.8"
      ]
    },
    {
      id: "65.10",
      title: "Eventual Consistency",
      description: [
        "Mikroservislarda servislar o'rtasida darhol izchillik yo'q — ma'lumot vaqt o'tib izchil bo'ladi (event'lar tarqalguncha). Biznes bilan kelishish: qaysi oqimlar eventual bo'la oladi (\"buyurtma statistikasi 5 soniya kechiksa normal\"), qaysilari darhol izchillik talab qiladi (ular bitta servis/aggregate ichida bo'lishi kerak).",
        "",
        "UX: oraliq holatlar (\"To'lov qayta ishlanmoqda\"), read-your-writes (o'z o'zgarishini darhol ko'rsatish). Texnik: idempotent iste'molchilar, tartibga chidamlilik, reconciliation job'lari, kechikish monitoringi.",
        "",
        "```text",
        "POST /orders → 201 {status: \"pending\"}",
        "Ordering → OrderPlaced → Billing (to'lov) → PaymentCaptured → Ordering: status \"confirmed\"",
        "UI: \"Buyurtma qabul qilindi, to'lov tasdiqlanmoqda…\" → push/polling bilan yangilanadi",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Bitta oqimdagi eventual consistency oraliq holatlarini UX va reconciliation bilan loyihalang.",
      acceptanceCriteria: [
        "Eventual consistency'ni biznes bilan kelishadi",
        "Oraliq holatlar va reconciliation'ni rejalashtiradi"
      ],
      prerequisites: [
        "48.10"
      ]
    },
    {
      id: "65.11",
      title: "Distributed Transactions",
      description: [
        "Bir nechta servis/DB bo'ylab atomik tranzaksiya: **2PC** (two-phase commit — koordinator barcha ishtirokchilardan \"tayyor\"ni oladi, keyin commit; kuchli izchillik, lekin sekin, bloklovchi, koordinator nosozligi muammo, ko'p zamonaviy tizimlar qo'llab-quvvatlamaydi) — mikroservislarda deyarli ishlatilmaydi.",
        "",
        "Muqobillar: saga (lokal tranzaksiyalar + kompensatsiya), transactional outbox (lokal yozuv + ishonchli xabar), idempotent operatsiyalar, tranzaksiyani bitta servis chegarasida saqlash (chegaralarni qayta ko'rib chiqish).",
        "",
        "```text",
        "❌ BEGIN DISTRIBUTED: Ordering.insert + Billing.charge + Inventory.reserve; COMMIT",
        "✅ Saga: Ordering(lokal) → event → Inventory(lokal) → event → Billing(lokal)",
        "         xato → kompensatsiyalar teskari tartibda",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Distributed tranzaksiya talab qilayotgan oqimni saga yoki chegara o'zgarishi bilan qayta loyihalang.",
      acceptanceCriteria: [
        "2PC muammolarini biladi",
        "Distributed tranzaksiya muqobillarini qo'llaydi"
      ],
      prerequisites: [
        "17.19"
      ]
    },
    {
      id: "65.12",
      title: "Saga Pattern",
      description: [
        "Saga — ko'p servisli biznes jarayonni lokal tranzaksiyalar ketma-ketligi sifatida bajarish; biror qadam muvaffaqiyatsiz bo'lsa — oldingi qadamlar **kompensatsiya** amallari bilan bekor qilinadi (refund, release stock, cancel order). Ikki uslub: **xoreografiya** (har servis event'larga reaksiya qiladi — oddiy, lekin oqim tarqoq) va **orkestratsiya** (markaziy orkestrator qadamlarni boshqaradi — aniq oqim, holat bir joyda).",
        "",
        "Saga holati saqlanadi (qaysi qadam, nima kompensatsiya qilinishi kerak); qadamlar va kompensatsiyalar idempotent; \"pivot\" qadamdan keyin orqaga qaytish o'rniga oldinga davom etish.",
        "",
        "```php",
        "final class PlaceOrderSaga",
        "{",
        "    public function steps(): array",
        "    {",
        "        return [",
        "            [ReserveStock::class,   ReleaseStock::class],",
        "            [ChargePayment::class,  RefundPayment::class],",
        "            [ConfirmOrder::class,   null],   // pivot",
        "            [ScheduleShipping::class, null],",
        "        ];",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Buyurtma oqimi uchun orkestratsiya asosidagi saga'ni kompensatsiyalar va holat saqlash bilan amalga oshiring.",
      acceptanceCriteria: [
        "Xoreografiya va orkestratsiya farqini biladi",
        "Kompensatsiya va idempotentlikni loyihalaydi"
      ],
      prerequisites: [
        "65.11"
      ]
    },
    {
      id: "65.13",
      title: "Circuit Breakers",
      description: [
        "Circuit breaker — ishlamay qolgan servisga so'rovlarni to'xtatib, kaskad nosozlikning oldini oladi: **closed** (normal), xatolar chegaradan oshsa **open** (so'rovlar darhol rad etiladi yoki fallback — servisni \"dam oldiradi\" va chaqiruvchi resurslarini (FPM worker'lar) band qilmaydi), vaqt o'tib **half-open** (sinov so'rovlari — muvaffaqiyatli bo'lsa closed).",
        "",
        "Laravel'da: holat Redis'da (barcha worker'lar uchun umumiy), job middleware `ThrottlesExceptions` (job'lar uchun o'xshash g'oya), paketlar. Fallback: keshdagi eski ma'lumot, default qiymat, funksiyani vaqtincha o'chirish.",
        "",
        "```php",
        "if (Cache::get('cb:inventory') === 'open') {",
        "    return $this->cachedStock($sku);   // fallback",
        "}",
        "try {",
        "    return $this->inventory->stock($sku);",
        "} catch (ConnectionException $e) {",
        "    if (RateLimiter::hit('cb:inventory:fails', 30) > 5) {",
        "        Cache::put('cb:inventory', 'open', 30);",
        "    }",
        "    return $this->cachedStock($sku);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tashqi servis chaqiruviga Redis asosidagi circuit breaker va fallback qo'shib, servis o'chirilganda xatti-harakatni sinang.",
      acceptanceCriteria: [
        "Circuit breaker holatlarini biladi",
        "Fallback strategiyasini loyihalaydi"
      ],
      prerequisites: [
        "50.13"
      ]
    },
    {
      id: "65.14",
      title: "Retries and Timeouts",
      description: [
        "Har servislararo chaqiruvda: **timeout** (connect qisqa, read — servis SLO'siga mos; timeout'siz chaqiruv — butun tizimni qotiradi), **retry** (faqat vaqtinchalik xatolar va idempotent operatsiyalar uchun, eksponensial backoff + jitter, cheklangan son), **retry budget** (retry'lar yuklamani ko'paytirmasligi uchun umumiy chegara — \"retry storm\"ning oldini olish).",
        "",
        "Timeout'lar zanjiri: chaqiruvchi timeout'i chaqiriluvchinikidan katta (aks holda chaqiriluvchi ishni tugatadi, lekin javob tashlab yuboriladi). Deadline propagation — qolgan vaqtni keyingi chaqiruvga uzatish.",
        "",
        "```php",
        "Http::connectTimeout(1)->timeout(3)",
        "    ->retry([100, 300], when: fn ($e) => $e instanceof ConnectionException || $e->response?->serverError(), throw: true)",
        "    ->withHeaders(['Idempotency-Key' => $key])",
        "    ->post($url, $payload);",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Servislararo HTTP client uchun yagona timeout/retry siyosatini yozib, barcha chaqiruvlarga qo'llang.",
      acceptanceCriteria: [
        "Timeout, retry va retry budget'ni biladi",
        "Retry'ni faqat idempotent operatsiyalarga qo'llaydi"
      ],
      prerequisites: [
        "24.10"
      ]
    },
    {
      id: "65.15",
      title: "Idempotency",
      description: [
        "Mikroservislarda idempotentlik majburiy: tarmoq xatolari va retry'lar, at-least-once xabar yetkazish, saga qadamlari va kompensatsiyalarini qayta bajarish — barchasi takroriy operatsiyalarga olib keladi. Har servis o'z endpoint'lari va iste'molchilarini idempotent qiladi.",
        "",
        "Usullar: idempotency key (HTTP POST uchun), event/xabar ID bo'yicha deduplikatsiya, tabiiy idempotent operatsiyalar (`SET` vs `INCREMENT`), holat tekshiruvi, unique constraint'lar. Kalitlar va natijalar bitta tranzaksiyada saqlanadi.",
        "",
        "```php",
        "// Iste'molchi: event_id bo'yicha deduplikatsiya",
        "DB::transaction(function () use ($event) {",
        "    if (ProcessedMessage::insertOrIgnore(['id' => $event->id, 'consumer' => 'shipping']) === 0) {",
        "        return;",
        "    }",
        "    $this->scheduleShipment($event->orderId);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Servisning barcha yozuvchi endpoint'lari va iste'molchilarini idempotentlik bo'yicha audit qilib, yetishmayotganlarini tuzating.",
      acceptanceCriteria: [
        "Mikroservislarda takrorlanish manbalarini biladi",
        "Idempotentlikni barcha kirish nuqtalarida ta'minlaydi"
      ],
      prerequisites: [
        "17.17"
      ]
    },
    {
      id: "65.16",
      title: "Distributed Tracing",
      description: [
        "Distributed tracing — bitta so'rovning barcha servislar, job'lar va DB chaqiruvlari bo'ylab yo'lini ko'rish: **trace** (butun so'rov) va **span**'lar (har operatsiya — davomiylik, atributlar, xatolar). Trace konteksti header'lar (W3C `traceparent`) va xabar metadata'si orqali uzatiladi.",
        "",
        "Standart — **OpenTelemetry** (SDK, avtomatik instrumentatsiya, eksport): backend'lar Jaeger, Tempo, Zipkin, Datadog, Sentry. Mikroservislarda tracing'siz \"qaysi servis sekin/xato?\" savoliga javob topish juda qiyin. Log'larga `trace_id` qo'shish — log va trace'larni bog'laydi.",
        "",
        "```text",
        "trace 7f3a…  POST /checkout  820 ms",
        " ├─ ordering: create order          45 ms",
        " ├─ inventory: GET /stock          120 ms",
        " ├─ billing: POST /charges         610 ms  ← tor joy",
        " │   └─ payme API                  580 ms",
        " └─ publish OrderPlaced              8 ms",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki servis va navbat bo'ylab OpenTelemetry tracing'ni sozlab, bitta so'rov trace'ini Jaeger yoki Tempo'da ko'ring.",
      acceptanceCriteria: [
        "Trace, span va kontekst uzatilishini biladi",
        "OpenTelemetry'dan foydalanadi"
      ],
      prerequisites: [
        "58.4"
      ]
    },
    {
      id: "65.17",
      title: "Service Authentication",
      description: [
        "Servislararo autentifikatsiya: **mTLS** (o'zaro sertifikatlar — service mesh avtomatlashtiradi), **JWT/OAuth2 client credentials** (servis token oladi, qabul qiluvchi imzo, `aud` va scope'ni tekshiradi), **API key'lar** (oddiyroq, aylantirish kerak), tarmoq siyosatlari (faqat ruxsat etilgan servislar ulanadi). Zero trust: ichki tarmoqqa ham avtomatik ishonilmaydi.",
        "",
        "Avtorizatsiya: qaysi servis qaysi amalni bajara oladi (scope'lar), foydalanuvchi kontekstini uzatish (asl foydalanuvchi ID'si ishonchli tarzda — token ichida).",
        "",
        "```php",
        "// Billing servisi: kiruvchi token tekshiruvi",
        "$claims = JWT::decode($request->bearerToken(), $this->jwks);",
        "abort_unless(in_array('billing-api', (array) $claims->aud, true) && in_array('charges:write', explode(' ', $claims->scope), true), 403);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki servis o'rtasida client credentials asosidagi JWT autentifikatsiyasini audience va scope tekshiruvi bilan sozlang.",
      acceptanceCriteria: [
        "Servislararo autentifikatsiya usullarini biladi",
        "Zero trust tamoyilini qo'llaydi"
      ],
      prerequisites: [
        "21.4"
      ]
    },
    {
      id: "65.18",
      title: "Resilience",
      description: [
        "Chidamlilik — qismlar ishdan chiqqanda tizim ishlashda davom etishi: timeout'lar, retry'lar (backoff bilan), circuit breaker'lar, bulkhead (resurslarni izolyatsiya qilish — bir servisga chaqiruvlar uchun alohida pool/navbat, biri qotib qolsa boshqalarga ta'sir qilmasin), fallback'lar va graceful degradation (tavsiyalar servisi ishlamasa — mahsulot sahifasi tavsiyalarsiz ochiladi), rate limiting va load shedding, asinxron aloqa.",
        "",
        "Sinash: chaos engineering (servislarni ataylab o'chirish, kechikish kiritish — Toxiproxy), game day'lar.",
        "",
        "```text",
        "Mahsulot sahifasi:",
        "  Catalog (kritik)        → yo'q bo'lsa 503",
        "  Pricing (kritik)        → keshdagi narx (≤ 5 daq)",
        "  Reviews (ixtiyoriy)     → bo'limsiz ko'rsatish",
        "  Recommendations (ixt.)  → bo'limsiz ko'rsatish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Sahifa bog'liqliklarini kritik va ixtiyoriyga ajratib, ixtiyoriylari uchun graceful degradation'ni amalga oshiring va Toxiproxy bilan sinang.",
      acceptanceCriteria: [
        "Chidamlilik naqshlarini biladi",
        "Graceful degradation va bulkhead'ni qo'llaydi"
      ],
      prerequisites: [
        "65.13"
      ]
    },
    {
      id: "65.19",
      title: "Deployment Complexity",
      description: [
        "Mikroservislar operatsion murakkabligi: ko'p pipeline'lar, konteyner orkestratsiyasi (Kubernetes), konfiguratsiya va sirlar boshqaruvi, servis discovery, versiyalar mosligi, monitoring/log/tracing har servisda, lokal ishlab chiqish muhiti (o'nlab servisni ko'tarish), integratsion testlash, insidentlarda ko'p jamoa koordinatsiyasi.",
        "",
        "Bu narx platforma jamoasi, standart shablonlar (servis skeleti, CI shablonlari), IaC va kuzatuvchanlik yetukligini talab qiladi. Ularsiz mikroservislar tezlikni oshirish o'rniga pasaytiradi.",
        "",
        "```text",
        "Monolit: 1 pipeline, 1 deploy, 1 log manbai, lokal: docker compose up",
        "10 servis: 10 pipeline, versiya matritsasi, tracing majburiy, lokal: ?",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Hozirgi tizimni 5 servisga bo'lish uchun kerakli operatsion infratuzilma ro'yxatini va narxini baholang.",
      acceptanceCriteria: [
        "Mikroservislarning operatsion narxini biladi",
        "Platforma yetukligi talablarini tushunadi"
      ],
      prerequisites: [
        "43.3"
      ]
    },
    {
      id: "65.20",
      title: "Monolith vs Microservices Trade-offs",
      description: [
        "**Monolit** (ayniqsa modulli): oddiy deploy va debug, tranzaksiyalar, past latency (funksiya chaqiruvlari), kichik jamoa uchun tezroq, refactoring oson; kamchiliklari — butun ilova birga masshtablanadi va deploy qilinadi, katta jamoalarda koordinatsiya qiyin. **Mikroservislar**: mustaqil jamoalar va deploy, selektiv masshtablash, nosozlik izolyatsiyasi, texnologik erkinlik; kamchiliklari — taqsimlangan tizim murakkabligi, operatsion narx, eventual consistency, tarmoq.",
        "",
        "Amaliy yo'l: modulli monolit → aniq zarurat (masshtab, jamoa mustaqilligi, xavfsizlik izolyatsiyasi) bo'lganda alohida modulni servisga ajratish (strangler fig).",
        "",
        "```text",
        "Jamoa < 20, domen hali o'zgaruvchan        → modulli monolit",
        "Bir modul 50x ko'proq yuklama / alohida SLA → shu modulni ajratish",
        "Ko'p mustaqil jamoa, aniq kontekstlar       → mikroservislar (platforma bilan)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangiz uchun monolit va mikroservislar variantlarini mezonlar jadvali bilan solishtirib, ADR yozing.",
      acceptanceCriteria: [
        "Ikki yondashuvning murosalarini biladi",
        "Ajratish qarorini aniq zarurat bilan asoslaydi"
      ],
      prerequisites: [
        "61.3"
      ]
    }
  ]
});
