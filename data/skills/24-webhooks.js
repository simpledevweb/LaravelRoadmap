/* 24 · Webhooks
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 24,
  slug: "webhooks",
  title: "Webhooks",
  group: "api",
  description: "Webhook'lar — tizimlar o'rtasida hodisa asosidagi integratsiya: to'lov provayderi to'lov tugaganini, CRM yangi lid kelganini HTTP so'rov orqali xabar qiladi. Webhook'lar oddiy ko'rinadi, lekin ishonchli ishlatish uchun imzo tekshiruvi, idempotentlik, qayta urinish, navbat orqali qayta ishlash va SSRF himoyasi kerak. Senior dasturchi ham qabul qiluvchi, ham yuboruvchi tomonni to'g'ri loyihalaydi.",
  subskills: [
    {
      id: "24.1",
      title: "Webhook Architecture",
      description: [
        "Webhook — \"teskari API\": hodisa sodir bo'lganda yuboruvchi oldindan ro'yxatdan o'tgan URL'ga HTTP POST yuboradi. Polling'ga nisbatan tez va tejamkor. Komponentlar: obuna (URL, hodisa turlari, sir), hodisa yaratish, yetkazish (navbat + retry), qabul qiluvchi endpoint (tekshirish, tez javob, asinxron qayta ishlash), monitoring.",
        "",
        "Asosiy tamoyillar: qabul qiluvchi tez `2xx` qaytaradi va ishni navbatga qo'yadi; yetkazish at-least-once — dublikatlar bo'ladi; tartib kafolatlanmaydi; har bir so'rov imzolangan.",
        "",
        "```text",
        "Provayder ──POST /webhooks/payme──▶ [Imzo ✓] → [Saqlash] → 200 OK",
        "                                         └──▶ Queue → ProcessWebhook job",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Qabul qiluvchi va yuboruvchi tomonlar uchun webhook arxitekturasini diagramma bilan loyihalang.",
      acceptanceCriteria: [
        "Webhook'ning polling'dan farqini biladi",
        "At-least-once va tartibsizlik oqibatlarini tushunadi"
      ],
      prerequisites: [
        "48.1"
      ]
    },
    {
      id: "24.2",
      title: "Webhook Endpoint Design",
      description: [
        "Qabul qiluvchi endpoint: alohida route (`/webhooks/{provider}`), CSRF'dan ozod, autentifikatsiya — sessiya emas, imzo orqali; so'rovni darhol tekshirib, xom payload'ni saqlab, `200` qaytarish (provayder timeout'idan ancha tez); og'ir ish — navbatda.",
        "",
        "Javob kodlari: muvaffaqiyat — `2xx`; noto'g'ri imzo — `401/403` (provayder qayta urinmasin); vaqtinchalik xato — `5xx` (provayder qayta uradi). `spatie/laravel-webhook-client` bu pattern'ni tayyor beradi.",
        "",
        "```php",
        "Route::post('/webhooks/payme', PaymeWebhookController::class)",
        "    ->withoutMiddleware([VerifyCsrfToken::class])",
        "    ->middleware('throttle:webhooks');",
        "",
        "public function __invoke(Request $request)",
        "{",
        "    $this->verifier->verify($request);                        // imzo",
        "    $call = WebhookCall::create(['provider' => 'payme', 'payload' => $request->getContent()]);",
        "    ProcessPaymeWebhook::dispatch($call);",
        "    return response()->noContent();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "To'lov provayderi uchun \"tekshir → saqla → navbat → 204\" endpoint'ini yozing.",
      acceptanceCriteria: [
        "Endpoint'ni tez javob beradigan qilib loyihalaydi",
        "Javob kodlari provayder xatti-harakatiga ta'sirini biladi"
      ],
      prerequisites: [
        "24.1"
      ]
    },
    {
      id: "24.3",
      title: "Signature Verification",
      description: [
        "Imzo tekshiruvi — so'rov haqiqatan provayderdan kelgani va o'zgartirilmaganini isbotlaydi. Odatda HMAC (umumiy sir bilan) yoki asimmetrik imzo (provayder public kaliti bilan). Imzo header'da keladi (`X-Signature`, `Stripe-Signature`).",
        "",
        "Muhim: imzo **xom body** ustidan hisoblanadi — JSON'ni parse qilib qayta kodlash baytlarni o'zgartiradi (`$request->getContent()`); solishtirish doimiy vaqtli (`hash_equals`); sir env/secret manager'da; imzo yo'q yoki noto'g'ri — rad etish va log. IP whitelist — qo'shimcha qatlam, imzo o'rnini bosmaydi.",
        "",
        "```php",
        "$expected = hash_hmac('sha256', $request->getContent(), config('services.payme.webhook_secret'));",
        "if (! hash_equals($expected, (string) $request->header('X-Signature'))) {",
        "    abort(401, 'Invalid signature');",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Imzo tekshiruvini middleware sifatida yozing va noto'g'ri/o'zgartirilgan payload uchun testlar qo'shing.",
      acceptanceCriteria: [
        "Imzoni xom body ustidan tekshiradi",
        "Doimiy vaqtli solishtirishni ishlatadi"
      ],
      prerequisites: [
        "24.4"
      ]
    },
    {
      id: "24.4",
      title: "HMAC",
      description: [
        "HMAC (Hash-based Message Authentication Code) — xabar va maxfiy kalitdan hosil qilinadigan kod: `HMAC-SHA256(secret, message)`. Kalitni bilmagan hech kim to'g'ri kod yarata olmaydi, xabar o'zgarsa kod o'zgaradi. Shifrlash emas — faqat yaxlitlik va manba tasdig'i.",
        "",
        "Nima uchun oddiy `sha256(secret . message)` emas: length extension hujumlari. PHP: `hash_hmac('sha256', $data, $key)`, natija hex yoki base64 (provayder formatiga qarang). Sir uzun va tasodifiy (32+ bayt), har bir obuna uchun alohida.",
        "",
        "```php",
        "$secret = random_bytes(32);",
        "$mac = hash_hmac('sha256', $payload, $secret);          // hex",
        "$mac64 = base64_encode(hash_hmac('sha256', $payload, $secret, true)); // base64",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "HMAC imzo yaratuvchi va tekshiruvchi kichik class yozing, hex va base64 formatlarini qo'llab-quvvatlasin.",
      acceptanceCriteria: [
        "HMAC'ning vazifasini va oddiy hash'dan farqini biladi",
        "Sirni to'g'ri yaratadi va saqlaydi"
      ],
      prerequisites: [
        "51.15"
      ]
    },
    {
      id: "24.5",
      title: "Timestamp Validation",
      description: [
        "Imzolangan so'rovni hujumchi ushlab, keyinroq qayta yuborishi mumkin (replay) — imzo baribir to'g'ri. Himoya: provayder so'rov vaqtini (`timestamp`) yuboradi va uni imzoga **kiritadi** (`timestamp.body`); qabul qiluvchi vaqt farqini tekshiradi (masalan, ±5 daqiqa) va eski so'rovlarni rad etadi.",
        "",
        "Server soatlari NTP bilan sinxron bo'lishi kerak. Tolerantlik oynasi juda tor bo'lsa, qonuniy qayta urinishlar ham rad etiladi — provayder qoidalariga qarang.",
        "",
        "```php",
        "$ts = (int) $request->header('X-Timestamp');",
        "abort_if(abs(time() - $ts) > 300, 401, 'Stale webhook');",
        "$expected = hash_hmac('sha256', $ts.'.'.$request->getContent(), $secret);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Imzoga timestamp'ni qo'shing va 5 daqiqadan eski so'rovlarni rad etishni testlang.",
      acceptanceCriteria: [
        "Timestamp imzoga kiritilishi kerakligini tushunadi",
        "Tolerantlik oynasini asoslab tanlaydi"
      ],
      prerequisites: [
        "24.3"
      ]
    },
    {
      id: "24.6",
      title: "Replay Attack Prevention",
      description: [
        "Replay — haqiqiy so'rovni takror yuborish. Qatlamli himoya: (1) imzolangan timestamp va qisqa oyna; (2) unikal hodisa ID'sini (`event_id`) saqlab, takrorlanganini rad etish yoki e'tiborsiz qoldirish; (3) idempotent qayta ishlash — takror kelsa ham natija bir xil.",
        "",
        "Event ID'lar uchun unique constraint'li jadval yoki TTL'li Redis kalit (oyna muddatidan uzunroq). Qonuniy qayta urinishlar ham bir xil ID bilan keladi — ular \"allaqachon qayta ishlangan\" deb `200` qaytarilishi kerak, xato emas.",
        "",
        "```php",
        "$fresh = Redis::set(\"webhook:payme:{$eventId}\", 1, 'EX', 86400, 'NX');",
        "if (! $fresh) {",
        "    return response()->noContent(); // takroriy — jim qabul",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Event ID asosidagi replay himoyasini qo'shing va bir xil so'rovni ikki marta yuborib natijani tekshiring.",
      acceptanceCriteria: [
        "Replay himoyasining qatlamlarini biladi",
        "Takroriy so'rovga to'g'ri javob qaytaradi"
      ],
      prerequisites: [
        "24.5"
      ]
    },
    {
      id: "24.7",
      title: "Idempotency",
      description: [
        "Webhook'lar at-least-once yetkaziladi — bir hodisa bir necha marta kelishi muqarrar (timeout, retry, provayder xatosi). Qayta ishlash idempotent bo'lishi kerak: \"to'lov qabul qilindi\" ikki marta kelsa, buyurtma ikki marta to'langan bo'lmasligi.",
        "",
        "Usullar: `event_id` ni unique constraint bilan saqlash (bir tranzaksiyada qayta ishlash bilan), holat tekshiruvi (`if ($order->isPaid()) return;`), holat mashinasi (faqat ruxsat etilgan o'tishlar), upsert. Lock'lar parallel bir xil hodisalar uchun.",
        "",
        "```php",
        "DB::transaction(function () use ($event) {",
        "    ProcessedEvent::create(['provider' => 'payme', 'event_id' => $event->id]); // unique — dublikatda exception",
        "    $order = Order::lockForUpdate()->findOrFail($event->orderId);",
        "    if ($order->status !== OrderStatus::Paid) {",
        "        $order->markAsPaid($event->amount);",
        "    }",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Webhook qayta ishlovchi job'ni bir hodisa 3 marta parallel kelganda ham bir marta ta'sir qiladigan qiling.",
      acceptanceCriteria: [
        "Webhook'lar nega takrorlanishini biladi",
        "Idempotentlikni constraint va holat tekshiruvi bilan ta'minlaydi"
      ],
      prerequisites: [
        "17.17"
      ]
    },
    {
      id: "24.8",
      title: "Duplicate Event Handling",
      description: [
        "Dublikat hodisalar manbalari: provayder retry'lari, tarmoq timeout'lari (provayder javobni olmagan), bir nechta obuna, qo'lda qayta yuborish. Qabul qiluvchi ularni aniqlashi va xavfsiz e'tiborsiz qoldirishi kerak.",
        "",
        "Strategiya: deduplikatsiya kaliti (provayder `event_id`, yo'q bo'lsa — payload hash + muhim maydonlar), deduplikatsiya jadvali saqlash muddati (provayder retry oynasidan uzun), dublikatni log/metrikaga yozish (ko'p dublikat — bizning endpoint sekin ekanining belgisi).",
        "",
        "```php",
        "$key = $payload['event_id'] ?? hash('sha256', $request->getContent());",
        "$created = WebhookCall::firstOrCreate(['provider' => 'click', 'dedup_key' => $key], ['payload' => $payload]);",
        "if (! $created->wasRecentlyCreated) {",
        "    Log::info('Duplicate webhook', ['key' => $key]);",
        "    return response()->noContent();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Deduplikatsiya kaliti va saqlash muddatini belgilab, dublikatlar metrikasini qo'shing.",
      acceptanceCriteria: [
        "Dublikat manbalarini biladi",
        "Event ID bo'lmasa deduplikatsiya kalitini to'g'ri tanlaydi"
      ],
      prerequisites: [
        "24.7"
      ]
    },
    {
      id: "24.9",
      title: "Retry Policies",
      description: [
        "Yuboruvchi tomonda: `2xx` bo'lmagan javob yoki timeout'da qayta urinish; `4xx` (ayniqsa `400`, `401`, `410`) — odatda qayta urinmaslik (`410 Gone` — obunani o'chirish); maksimal urinishlar soni va umumiy muddat (masalan, 3 kun ichida 15 urinish).",
        "",
        "Qabul qiluvchi tomonda: provayder siyosatini bilish — qancha vaqt va necha marta qayta uradi, nima \"muvaffaqiyat\" hisoblanadi. Bizning tomondagi vaqtinchalik xatoda `5xx` qaytarish provayder retry'idan foydalanish; doimiy xatoda — `2xx` qaytarib, muammoni o'zimiz hal qilish (aks holda cheksiz retry).",
        "",
        "```php",
        "final class DeliverWebhook implements ShouldQueue",
        "{",
        "    public int $tries = 15;",
        "    public function backoff(): array { return [10, 30, 60, 300, 900, 1800, 3600]; }",
        "    public function retryUntil(): DateTime { return now()->addDays(3); }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Webhook yuboruvchi job uchun status kodga qarab retry qiladigan siyosatni yozing.",
      acceptanceCriteria: [
        "Qaysi javoblarda qayta urinish kerakligini biladi",
        "Provayder retry siyosatini hisobga oladi"
      ],
      prerequisites: [
        "46.6"
      ]
    },
    {
      id: "24.10",
      title: "Exponential Backoff",
      description: [
        "Eksponensial backoff — har bir qayta urinish orasidagi kutish ortib boradi: 10s, 20s, 40s, 80s... Bu vaqtincha ishlamay qolgan qabul qiluvchini \"bombardimon\" qilmaydi va tiklanishiga vaqt beradi. **Jitter** (tasodifiy qo'shimcha) — ko'p yuboruvchilar bir vaqtda qayta urinmasligi uchun (thundering herd).",
        "",
        "Maksimal kutish chegarasi (cap) va umumiy muddat bo'lishi kerak. Laravel job'larida `backoff()` massiv yoki son qaytaradi; HTTP client'da `Http::retry()`.",
        "",
        "```php",
        "public function backoff(): array",
        "{",
        "    return collect(range(1, 10))",
        "        ->map(fn ($n) => min(3600, (2 ** $n) * 5) + random_int(0, 30))",
        "        ->all();",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Jitter'li eksponensial backoff'ni job'ga qo'shing va urinishlar jadvalini chiqarib tekshiring.",
      acceptanceCriteria: [
        "Backoff va jitter maqsadini tushuntira oladi",
        "Cap va umumiy muddatni belgilaydi"
      ],
      prerequisites: [
        "24.9"
      ]
    },
    {
      id: "24.11",
      title: "Event Delivery Guarantees",
      description: [
        "Yetkazish kafolatlari: **at-most-once** (bir martadan ko'p emas — yo'qolishi mumkin), **at-least-once** (kamida bir marta — dublikatlar bo'ladi; webhook'lar uchun standart), **exactly-once** (taqsimlangan tizimlarda amalda erishib bo'lmaydi — at-least-once + idempotent qayta ishlash bilan \"effectively once\").",
        "",
        "Tartib: webhook'lar tartibsiz kelishi mumkin (`payment.refunded` `payment.succeeded` dan oldin). Yechim: hodisada versiya yoki vaqt, holat mashinasi, kerak bo'lsa provayder API'sidan joriy holatni so'rab olish (\"webhook — signal, API — haqiqat manbai\").",
        "",
        "```php",
        "// Tartibsizlikka chidamli: eski hodisani e'tiborsiz qoldirish",
        "if ($event->occurredAt <= $order->last_event_at) {",
        "    return;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tartibsiz kelgan hodisalarni to'g'ri qayta ishlovchi mantiqni holat mashinasi va vaqt tekshiruvi bilan yozing.",
      acceptanceCriteria: [
        "Uch kafolat turini farqlaydi",
        "Tartibsizlikka chidamli qayta ishlashni loyihalaydi"
      ],
      prerequisites: [
        "48.11"
      ]
    },
    {
      id: "24.12",
      title: "Webhook Logging",
      description: [
        "Har bir kiruvchi va chiquvchi webhook loglanadi: vaqt, provayder/obuna, hodisa turi va ID, xom payload (sezgir maydonlar niqoblangan), header'lar (imzo emas), imzo tekshiruvi natijasi, javob kodi, qayta ishlash holati va xato.",
        "",
        "Bu debugging (\"provayder yubordim deyapti\"), audit va qayta ishga tushirish uchun zarur. Saqlash muddati va hajm (payload'lar katta bo'lishi mumkin) — partitioning yoki muddatli tozalash. Sezgir ma'lumot (karta, shaxsiy) saqlanmasligi yoki shifrlanishi kerak.",
        "",
        "```php",
        "WebhookCall::create([",
        "    'provider' => 'payme', 'event_type' => $payload['method'] ?? null,",
        "    'payload' => $this->mask($payload), 'signature_valid' => true, 'status' => 'received',",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Webhook chaqiruvlari jadvali va admin ko'rinishini yarating: holat, payload (niqoblangan), qayta ishga tushirish tugmasi.",
      acceptanceCriteria: [
        "Webhook log'ida nimalar bo'lishi kerakligini biladi",
        "Sezgir ma'lumotlarni niqoblaydi"
      ],
      prerequisites: [
        "58.7"
      ]
    },
    {
      id: "24.13",
      title: "Delivery Status Tracking",
      description: [
        "Yuboruvchi tomonda har bir yetkazish urinishi kuzatiladi: holat (`pending`, `delivered`, `failed`, `retrying`), urinishlar soni, oxirgi javob kodi va qisqa body, kechikish, keyingi urinish vaqti. Obuna darajasida: muvaffaqiyat foizi, ketma-ket xatolar.",
        "",
        "Foydalanuvchi (integrator) uchun: yetkazish tarixi paneli, qo'lda qayta yuborish, test hodisasi yuborish. Ko'p muvaffaqiyatsizlikdan keyin obunani avtomatik to'xtatish va egasiga xabar.",
        "",
        "```php",
        "WebhookDelivery::create([",
        "    'subscription_id' => $sub->id, 'event_id' => $event->id, 'attempt' => $this->attempts(),",
        "    'status' => $response->successful() ? 'delivered' : 'failed',",
        "    'response_code' => $response->status(), 'duration_ms' => $elapsed,",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yuborilgan webhook'lar uchun yetkazish holati jadvali va integrator paneli (tarix, qayta yuborish) yarating.",
      acceptanceCriteria: [
        "Yetkazish holatini urinish darajasida kuzatadi",
        "Muvaffaqiyatsiz obunalarni avtomatik boshqaradi"
      ],
      prerequisites: [
        "24.9"
      ]
    },
    {
      id: "24.14",
      title: "Queue-Based Processing",
      description: [
        "Qabul qilingan webhook'ni sinxron qayta ishlash — provayder timeout'i, sekin endpoint, xatoda butun so'rov yiqilishi. To'g'ri pattern: endpoint faqat tekshiradi va saqlaydi → job navbatga → worker qayta ishlaydi (retry, timeout, failed jobs bilan).",
        "",
        "Yuboruvchi tomonda ham: har yetkazish alohida job (bir qabul qiluvchining sekinligi boshqalarga ta'sir qilmasligi uchun), alohida navbat (`webhooks`), qabul qiluvchi bo'yicha parallellik cheklovi (`WithoutOverlapping`/`RateLimited` middleware).",
        "",
        "```php",
        "final class ProcessPaymeWebhook implements ShouldQueue",
        "{",
        "    public $queue = 'webhooks';",
        "    public int $tries = 5;",
        "",
        "    public function __construct(public WebhookCall $call) {}",
        "    public function handle(PaymeEventHandler $handler): void { $handler->handle($this->call); }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sinxron webhook qayta ishlashni navbatga ko'chiring va provayderga javob vaqtini o'lchang.",
      acceptanceCriteria: [
        "Nega webhook navbat orqali qayta ishlanishini tushuntira oladi",
        "Alohida navbat va parallellik cheklovini qo'llaydi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "24.15",
      title: "Timeout Management",
      description: [
        "Yuboruvchi: qabul qiluvchiga qisqa timeout (masalan, ulanish 3s, javob 10s) — sekin qabul qiluvchi worker'larni band qilmasligi uchun; timeout — muvaffaqiyatsiz urinish sifatida retry. Qabul qiluvchi: provayder timeout'idan (ko'pincha 5–30s) ancha tez javob berish, shuning uchun og'ir ish navbatda.",
        "",
        "Timeout'da noaniqlik: qabul qiluvchi so'rovni qayta ishlagan bo'lishi mumkin — shuning uchun idempotentlik majburiy. Job darajasida `timeout` va navbat `retry_after` mosligi.",
        "",
        "```php",
        "$response = Http::connectTimeout(3)->timeout(10)",
        "    ->withHeaders(['X-Signature' => $signature])",
        "    ->post($subscription->url, $payload);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yuboruvchi HTTP so'rovlariga timeout qo'shing va sekin qabul qiluvchi boshqa yetkazishlarga ta'sir qilmasligini sinang.",
      acceptanceCriteria: [
        "Ikkala tomondagi timeout'larni to'g'ri belgilaydi",
        "Timeout noaniqligini idempotentlik bilan hal qiladi"
      ],
      prerequisites: [
        "24.14"
      ]
    },
    {
      id: "24.16",
      title: "Dead Letter Handling",
      description: [
        "Barcha urinishlardan keyin ham muvaffaqiyatsiz bo'lgan hodisalar \"dead letter\"ga tushadi: Laravel `failed_jobs` jadvali yoki alohida jadval. Ular yo'qolmasligi, tahlil qilinishi va tuzatilgandan keyin qayta ishga tushirilishi kerak.",
        "",
        "Jarayon: alert (failed soni o'ssa), sabab tahlili (kod xatosi, noto'g'ri ma'lumot, tashqi tizim), tuzatish, `queue:retry` yoki maxsus qayta ishlash buyrug'i, muntazam tozalash. `failed()` metodida kontekstli log va kerak bo'lsa kompensatsiya.",
        "",
        "```php",
        "public function failed(Throwable $e): void",
        "{",
        "    Log::error('Webhook processing failed', ['call_id' => $this->call->id, 'error' => $e->getMessage()]);",
        "    $this->call->update(['status' => 'failed', 'error' => $e->getMessage()]);",
        "}",
        "// php artisan queue:retry --queue=webhooks",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Muvaffaqiyatsiz webhook'lar uchun alert, admin ro'yxati va qayta ishga tushirish oqimini amalga oshiring.",
      acceptanceCriteria: [
        "Dead letter'larni yo'qotmasdan boshqaradi",
        "Qayta ishga tushirish jarayonini tashkil qiladi"
      ],
      prerequisites: [
        "46.19"
      ]
    },
    {
      id: "24.17",
      title: "Webhook Testing",
      description: [
        "Qabul qiluvchi testlari: haqiqiy provayder payload namunalari (fixture), to'g'ri/noto'g'ri imzo, eskirgan timestamp, dublikat hodisa, tartibsiz hodisalar, noma'lum hodisa turi (jim qabul), navbat job'i dispatch qilinishi (`Queue::fake()`).",
        "",
        "Yuboruvchi testlari: `Http::fake()` bilan imzo va payload'ni tekshirish, retry xatti-harakati, timeout. Lokal ishlab chiqish: ngrok/Expose bilan haqiqiy provayder webhook'larini qabul qilish, provayder CLI'lari (`stripe listen`), webhook.site.",
        "",
        "```php",
        "it('rejects invalid signature', function () {",
        "    $this->postJson('/webhooks/payme', fixture('payme/paid.json'), ['X-Signature' => 'bad'])",
        "        ->assertUnauthorized();",
        "    Queue::assertNothingPushed();",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Webhook endpoint'i uchun fixture'larga asoslangan to'liq test to'plamini yozing.",
      acceptanceCriteria: [
        "Xavfsizlik va idempotentlik holatlarini testlaydi",
        "Lokal muhitda haqiqiy webhook'larni sinash usullarini biladi"
      ],
      prerequisites: [
        "29.11"
      ]
    },
    {
      id: "24.18",
      title: "Outbound Webhook Security",
      description: [
        "Yuboruvchi sifatida xavfsizlik: har bir obuna uchun alohida sir, so'rovlarni imzolash (HMAC + timestamp), faqat HTTPS URL'lar, sirni aylantirish (ikki sir bir vaqtda), payload'da minimal ma'lumot (\"thin event\" — faqat ID, mijoz API orqali to'liq ma'lumotni oladi), ichki tarmoqqa so'rovlarning oldini olish (SSRF — 24.19).",
        "",
        "Qo'shimcha: yuborish manzil IP'larini e'lon qilish (mijozlar whitelist qilishi uchun), obuna URL'ini tasdiqlash (challenge), rate limit, redirect'larga ergashmaslik.",
        "",
        "```php",
        "$ts = time();",
        "$signature = hash_hmac('sha256', \"{$ts}.{$body}\", $subscription->secret);",
        "Http::withHeaders(['X-Webhook-Timestamp' => $ts, 'X-Webhook-Signature' => \"v1={$signature}\"])",
        "    ->withOptions(['allow_redirects' => false])",
        "    ->post($subscription->url, $payload);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Webhook yuborish tizimiga imzo, sir aylantirish va \"thin event\" payload'larni joriy qiling.",
      acceptanceCriteria: [
        "Yuboruvchi tomondagi xavfsizlik choralarini biladi",
        "Thin va fat event farqini tushunadi"
      ],
      prerequisites: [
        "24.3"
      ]
    },
    {
      id: "24.19",
      title: "SSRF Risk Prevention",
      description: [
        "Foydalanuvchi webhook URL'ini kiritadigan bo'lsa, server o'sha manzilga so'rov yuboradi — hujumchi ichki manzillarni ko'rsatishi mumkin: `http://169.254.169.254/` (bulut metadata — IAM kalitlari!), `http://localhost:6379`, `http://10.0.0.5/admin`. Bu SSRF.",
        "",
        "Himoya: faqat `https`; DNS'ni hal qilib, IP ichki/rezervlangan diapazonda emasligini tekshirish (127.0.0.0/8, 10/8, 172.16/12, 192.168/16, 169.254/16, ::1, fc00::/7); tekshirilgan IP'ga ulanish (DNS rebinding'ga qarshi); redirect'larga ergashmaslik; chiquvchi so'rovlarni alohida egress proxy orqali; bulutda IMDSv2.",
        "",
        "```php",
        "$ip = gethostbyname(parse_url($url, PHP_URL_HOST));",
        "abort_unless(filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE), 422, 'Ruxsat etilmagan manzil');",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Webhook URL validatori yozing: ichki IP'lar, metadata manzili va redirect'larni rad etsin; testlar bilan.",
      acceptanceCriteria: [
        "SSRF xavfini va oqibatlarini tushuntira oladi",
        "DNS rebinding'ni hisobga oluvchi himoyani biladi"
      ],
      prerequisites: [
        "51.8"
      ]
    }
  ]
});
