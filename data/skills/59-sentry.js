/* 59 · Sentry
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 59,
  slug: "sentry",
  title: "Sentry",
  group: "observability",
  description: "Sentry — xatolarni kuzatish va performance monitoring platformasi: exception'larni stack trace, kontekst va breadcrumb'lar bilan yig'adi, ularni guruhlaydi, relizlarga bog'laydi va alert'lar yuboradi. Laravel bilan rasmiy SDK orqali oson integratsiya qilinadi. Senior dasturchi Sentry'ni shovqinsiz, xavfsiz (PII'siz) va relizlar bilan bog'langan holda sozlaydi.",
  subskills: [
    {
      id: "59.1",
      title: "Error Tracking",
      description: [
        "Sentry har bir xatoni \"issue\"ga guruhlaydi: necha marta yuz bergan, nechta foydalanuvchiga ta'sir qilgan, birinchi va oxirgi ko'rinish, qaysi relizda paydo bo'lgan. Bu log'lardan farqli — xatolar boshqariladigan vazifalar ro'yxatiga aylanadi: assign, resolve, ignore, \"resolved in next release\".",
        "",
        "Laravel'da o'rnatish: `composer require sentry/sentry-laravel`, `php artisan sentry:publish --dsn=...`, `bootstrap/app.php` da `Integration::handles($exceptions)`. Test: `php artisan sentry:test`.",
        "",
        "```php",
        "// bootstrap/app.php",
        "->withExceptions(function (Exceptions $exceptions) {",
        "    Integration::handles($exceptions);",
        "})",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel ilovasiga Sentry'ni ulab, sun'iy xato yuborib issue'ni tahlil qiling.",
      acceptanceCriteria: [
        "Sentry issue modeli va hayot davrini biladi",
        "Laravel integratsiyasini sozlaydi"
      ],
      prerequisites: [
        "2.16"
      ]
    },
    {
      id: "59.2",
      title: "Exception Capture",
      description: [
        "Avtomatik ushlanadi: handler orqali o'tgan barcha report qilinadigan exception'lar (HTTP, job, artisan). Qo'lda: `report($e)` (Laravel — Sentry'ga ham ketadi), `\\Sentry\\captureException($e)`, `\\Sentry\\captureMessage('...')` (exception bo'lmagan muhim holatlar uchun).",
        "",
        "Filtrlash: Laravel `dontReport` (kutilgan biznes exception'lari Sentry'ga ham ketmaydi), `ignore_exceptions` konfiguratsiyasi, `before_send` callback (dinamik filtrlash, masalan, bot'lardan kelgan 404'lar). Ushlangan va qayta ishlangan, lekin kuzatish kerak bo'lgan xatolar — `report()`.",
        "",
        "```php",
        "try {",
        "    $this->gateway->refund($payment);",
        "} catch (GatewayException $e) {",
        "    report($e);                       // Sentry'ga, lekin oqim davom etadi",
        "    $payment->markRefundPending();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ushlanib yutilayotgan muhim xatolarni topib, `report()` bilan Sentry'ga yuboring va kutilganlarini filtrlang.",
      acceptanceCriteria: [
        "Avtomatik va qo'lda capture'ni biladi",
        "Kutilgan xatolarni shovqindan filtrlaydi"
      ],
      prerequisites: [
        "59.1"
      ]
    },
    {
      id: "59.3",
      title: "Stack Traces",
      description: [
        "Sentry stack trace'i: har kadrda fayl, qator, funksiya va kod konteksti (atrofdagi qatorlar), \"in app\" (sizning kodingiz) va vendor kadrlari farqlanadi, lokal o'zgaruvchilar (ixtiyoriy). Chained exception'lar (`previous`) alohida ko'rsatiladi — asl sabab ko'pincha eng ichkarida.",
        "",
        "Sozlash: `in_app_include`/`in_app_exclude` (qaysi yo'llar sizning kodingiz), `context_lines`. Source code integratsiyasi (GitHub/GitLab) — trace'dan to'g'ridan-to'g'ri koddagi qatorga va suspect commit'larga (kim oxirgi o'zgartirgan).",
        "",
        "```php",
        "// config/sentry.php",
        "'in_app_include' => [base_path('app')],",
        "'in_app_exclude' => [base_path('vendor')],",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Sentry'da in-app sozlamalarini va kod repozitoriyasi integratsiyasini yoqib, suspect commit'larni ko'ring.",
      acceptanceCriteria: [
        "Sentry stack trace elementlarini biladi",
        "In-app va repozitoriya integratsiyasini sozlaydi"
      ],
      prerequisites: [
        "56.3"
      ]
    },
    {
      id: "59.4",
      title: "Release Tracking",
      description: [
        "Release — ilova versiyasi (commit SHA yoki semver): har xato qaysi relizda yuz berganini ko'rsatadi, \"bu relizda yangi paydo bo'lgan xatolar\", \"resolved in next release\" (keyingi relizda qayta paydo bo'lsa — regressiya bildirishnomasi), release health (crash-free sessiyalar), commit'lar va deploy'lar bog'lanishi.",
        "",
        "Sozlash: `SENTRY_RELEASE` env (deploy paytida commit SHA), CI'da `sentry-cli releases new`, `set-commits --auto`, `deploys new -e production`.",
        "",
        "```bash",
        "export SENTRY_RELEASE=$(git rev-parse HEAD)",
        "sentry-cli releases new \"$SENTRY_RELEASE\"",
        "sentry-cli releases set-commits \"$SENTRY_RELEASE\" --auto",
        "sentry-cli releases finalize \"$SENTRY_RELEASE\"",
        "sentry-cli releases deploys \"$SENTRY_RELEASE\" new -e production",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Deploy pipeline'iga Sentry release yaratish va commit'larni bog'lashni qo'shing.",
      acceptanceCriteria: [
        "Release tracking foydalarini biladi",
        "Relizlarni CI orqali avtomatik yaratadi"
      ],
      prerequisites: [
        "43.17"
      ]
    },
    {
      id: "59.5",
      title: "Environment Configuration",
      description: [
        "Environment — xatolarni muhit bo'yicha ajratish: `production`, `staging`, `local`. Sentry'da filtrlash, alert'lar faqat production uchun, turli sampling. `SENTRY_ENVIRONMENT` yoki default `APP_ENV`.",
        "",
        "Qoidalar: lokal muhitdan Sentry'ga yubormaslik (DSN bo'sh — shovqin va kvota isrofi), staging'da yoqiq (relizdan oldin xatolarni ko'rish), turli loyihalar yoki muhitlar uchun DSN va sampling sozlamalari. Testlarda Sentry o'chiq.",
        "",
        "```env",
        "# .env.production",
        "SENTRY_LARAVEL_DSN=https://...@o123.ingest.sentry.io/456",
        "SENTRY_ENVIRONMENT=production",
        "SENTRY_TRACES_SAMPLE_RATE=0.1",
        "# .env.local",
        "SENTRY_LARAVEL_DSN=",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Muhitlar bo'yicha Sentry konfiguratsiyasini sozlang va alert'larni faqat production'ga cheklang.",
      acceptanceCriteria: [
        "Environment ajratishning ahamiyatini biladi",
        "Lokal va test muhitlarida Sentry'ni o'chiradi"
      ],
      prerequisites: [
        "59.1"
      ]
    },
    {
      id: "59.6",
      title: "Performance Monitoring",
      description: [
        "Sentry Performance — tranzaksiyalar (HTTP so'rov, job, buyruq) va ularning span'lari (DB so'rovlari, kesh, HTTP chaqiruvlari, view rendering) vaqtlari. Ko'rsatkichlar: p50/p75/p95 route bo'yicha, throughput, failure rate, eng sekin tranzaksiyalar, N+1 aniqlash (performance issues — avtomatik \"N+1 Query\", \"Slow DB Query\" muammolari).",
        "",
        "Laravel SDK avtomatik span'lar: SQL so'rovlari, kesh, Redis, HTTP client, queue, view'lar. `traces_sample_rate` — qancha tranzaksiya yig'iladi (overhead va narx).",
        "",
        "```php",
        "// config/sentry.php",
        "'traces_sample_rate' => (float) env('SENTRY_TRACES_SAMPLE_RATE', 0.1),",
        "'breadcrumbs' => ['sql_queries' => true, 'sql_bindings' => false],",
        "'tracing' => ['queue_jobs' => true, 'sql_queries' => true, 'http_client_requests' => true],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sentry Performance'ni yoqib, eng sekin 5 ta tranzaksiyani va avtomatik topilgan N+1 muammolarini tahlil qiling.",
      acceptanceCriteria: [
        "Sentry Performance imkoniyatlarini biladi",
        "Avtomatik performance issue'lardan foydalanadi"
      ],
      prerequisites: [
        "53.1"
      ]
    },
    {
      id: "59.7",
      title: "Transaction Tracing",
      description: [
        "Distributed tracing — bitta so'rovning servislar va job'lar bo'ylab yo'lini kuzatish: trace ID tashqi HTTP so'rovlar (`sentry-trace`, `baggage` header'lari) va queue job'lar orqali uzatiladi; Sentry ularni bitta trace sifatida ko'rsatadi (frontend → API → job → boshqa servis).",
        "",
        "Custom span'lar — muhim biznes bosqichlarini o'lchash uchun (`\\Sentry\\startSpan` yoki `Integration::...`). Trace'lar log'lar bilan trace_id orqali bog'lanadi.",
        "",
        "```php",
        "$result = \\Sentry\\trace(",
        "    fn () => $this->pricing->calculate($cart),",
        "    SpanContext::make()->setOp('pricing.calculate')->setDescription('Cart pricing'),",
        ");",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Muhim biznes jarayoniga custom span'lar qo'shib, trace'da har bosqich vaqtini ko'ring.",
      acceptanceCriteria: [
        "Distributed tracing va header uzatilishini biladi",
        "Custom span'lar qo'shadi"
      ],
      prerequisites: [
        "59.6"
      ]
    },
    {
      id: "59.8",
      title: "User Context",
      description: [
        "User context — xato qaysi foydalanuvchida yuz berganini ko'rsatadi: ta'sirlangan foydalanuvchilar soni (ustuvorlik uchun muhim), support so'rovi bilan bog'lash. Laravel SDK autentifikatsiyalangan foydalanuvchi ID'sini avtomatik qo'shishi mumkin (`send_default_pii` ga bog'liq).",
        "",
        "Maxfiylik: faqat ID (email, ism, IP — kerak bo'lmasa yubormang yoki `send_default_pii => false`). Tenant, rol, tarif kabi biznes kontekst — tag'lar sifatida (filtrlash uchun).",
        "",
        "```php",
        "\\Sentry\\configureScope(function (Scope $scope) use ($user): void {",
        "    $scope->setUser(['id' => (string) $user->id]);        // email/IP'siz",
        "    $scope->setTag('tenant_id', (string) $user->tenant_id);",
        "    $scope->setTag('plan', $user->plan->value);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Middleware'da Sentry'ga foydalanuvchi ID va tenant tag'ini qo'shing, PII yuborilmasligini tekshiring.",
      acceptanceCriteria: [
        "User context'ning foydasini biladi",
        "Maxfiylikni saqlagan holda kontekst qo'shadi"
      ],
      prerequisites: [
        "59.14"
      ]
    },
    {
      id: "59.9",
      title: "Breadcrumbs",
      description: [
        "Breadcrumb'lar — xatodan oldingi hodisalar izi: log yozuvlari, SQL so'rovlari, kesh operatsiyalari, HTTP so'rovlar, queue job'lar, foydalanuvchi harakatlari (frontend). Xato \"qanday sodir bo'ldi\"ni tushunishga yordam beradi.",
        "",
        "Laravel SDK avtomatik: log'lar, SQL (bindings bilan yoki ularsiz — maxfiylik!), queue, kesh, HTTP client. Custom breadcrumb'lar — muhim biznes qadamlari uchun. Ko'p breadcrumb — shovqin va hajm; `max_breadcrumbs` va `before_breadcrumb` filtri.",
        "",
        "```php",
        "\\Sentry\\addBreadcrumb(new Breadcrumb(",
        "    Breadcrumb::LEVEL_INFO, Breadcrumb::TYPE_DEFAULT, 'checkout',",
        "    'Coupon applied', ['coupon' => $code, 'discount' => $discount],",
        "));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Checkout jarayoniga custom breadcrumb'lar qo'shing va SQL bindings'ni maxfiylik uchun o'chiring.",
      acceptanceCriteria: [
        "Breadcrumb'lar vazifasini biladi",
        "Avtomatik breadcrumb'larni maxfiylikka moslab sozlaydi"
      ],
      prerequisites: [
        "59.2"
      ]
    },
    {
      id: "59.10",
      title: "Source Maps where applicable",
      description: [
        "Source map'lar — frontend (Vue, React, Inertia, Livewire bilan JS) uchun: production JS siqilgan va birlashtirilgan, stack trace o'qib bo'lmaydi; source map'lar Sentry'ga yuklanadi va trace asl fayl va qatorga qaytariladi. Backend PHP uchun kerak emas.",
        "",
        "Vite: `build.sourcemap: 'hidden'` (map'lar yaratiladi, lekin brauzerga e'lon qilinmaydi — ommaga ochilmaydi), `@sentry/vite-plugin` bilan yuklash va keyin serverdan o'chirish. Release backend bilan bir xil bo'lishi kerak.",
        "",
        "```js",
        "// vite.config.js",
        "import { sentryVitePlugin } from '@sentry/vite-plugin';",
        "export default defineConfig({",
        "  build: { sourcemap: 'hidden' },",
        "  plugins: [laravel({ input: ['resources/js/app.js'] }), sentryVitePlugin({ org: 'acme', project: 'web', authToken: process.env.SENTRY_AUTH_TOKEN, sourcemaps: { filesToDeleteAfterUpload: ['public/build/**/*.map'] } })],",
        "});",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Frontend uchun Sentry source map yuklashni sozlab, siqilgan JS xatosining asl qatorini ko'ring.",
      acceptanceCriteria: [
        "Source map'lar qachon kerakligini biladi",
        "Map'larni ommaga ochmasdan yuklaydi"
      ],
      prerequisites: [
        "59.4"
      ]
    },
    {
      id: "59.11",
      title: "Issue Grouping",
      description: [
        "Sentry xatolarni fingerprint bo'yicha issue'larga guruhlaydi (default — stack trace va exception turi asosida). Muammolar: bir xil sabab — ko'p issue (xabarda dinamik ID'lar), turli sabablar — bitta issue (umumiy wrapper exception). Yechimlar: xabarlarni o'zgarmas qilish (ID'larni kontekstga), custom fingerprint (`setFingerprint`), server tomonida fingerprint qoidalari, issue'larni qo'lda birlashtirish.",
        "",
        "To'g'ri guruhlash — issue'lar sonini boshqariladigan va ma'noli qiladi.",
        "",
        "```php",
        "\\Sentry\\withScope(function (Scope $scope) use ($e, $provider): void {",
        "    $scope->setFingerprint(['payment-gateway-timeout', $provider]);   // provayder bo'yicha bitta issue",
        "    \\Sentry\\captureException($e);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Noto'g'ri guruhlanayotgan issue'larni aniqlab, fingerprint yoki xabar o'zgarishi bilan tuzating.",
      acceptanceCriteria: [
        "Guruhlash mexanizmini biladi",
        "Custom fingerprint'ni o'rinli ishlatadi"
      ],
      prerequisites: [
        "59.1"
      ]
    },
    {
      id: "59.12",
      title: "Alert Rules",
      description: [
        "Sentry alert'lari: **issue alert'lari** (yangi issue paydo bo'ldi, regressiya, issue N marta/soatda, ko'p foydalanuvchiga ta'sir), **metric alert'lari** (xatolar soni, failure rate, p95 kechikish, crash-free rate chegaradan oshdi). Kanallar: email, Slack, Telegram (webhook/integratsiya), PagerDuty.",
        "",
        "Shovqinni kamaytirish: faqat production, yangi va regressiya issue'lari uchun darhol, chastota chegaralari, mas'ul jamoaga yo'naltirish (ownership rules — fayl yo'li bo'yicha), \"ignore until N\" kutilgan muammolar uchun.",
        "",
        "```text",
        "Alert 1: Yangi issue (production, level ≥ error) → #backend-alerts",
        "Alert 2: Issue 1 soatda > 100 hodisa YOKI > 50 foydalanuvchi → PagerDuty",
        "Alert 3: /api/checkout failure rate > 2% (5 daq) → PagerDuty",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yangi issue, regressiya va failure rate uchun alert qoidalarini shovqinsiz sozlang.",
      acceptanceCriteria: [
        "Issue va metric alert'lari farqini biladi",
        "Ownership va chegaralar bilan shovqinni kamaytiradi"
      ],
      prerequisites: [
        "58.14"
      ]
    },
    {
      id: "59.13",
      title: "Sampling",
      description: [
        "Sampling — qancha hodisani yuborish: **error sampling** (`sample_rate` — odatda 1.0, barcha xatolar; juda yuqori hajmda kamaytirish), **traces sampling** (`traces_sample_rate` — 0.05–0.2 odatiy; yoki `traces_sampler` — dinamik: health check'lar 0, checkout 1.0, qolganlari 0.1). Sampling overhead va kvota/narxni nazorat qiladi.",
        "",
        "Dinamik sampler muhim endpoint'larni to'liq kuzatish va shovqinli endpoint'larni o'tkazib yuborish imkonini beradi. Distributed trace'da sampling qarori boshdan oxirigacha uzatiladi.",
        "",
        "```php",
        "'traces_sampler' => function (SamplingContext $ctx): float {",
        "    $path = $ctx->getTransactionContext()?->getName() ?? '';",
        "    return match (true) {",
        "        str_contains($path, '/up') => 0.0,",
        "        str_contains($path, '/checkout') => 1.0,",
        "        default => 0.1,",
        "    };",
        "},",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Dinamik traces sampler yozing: health check'larni o'tkazib yuborsin, checkout'ni to'liq kuzatsin.",
      acceptanceCriteria: [
        "Error va trace sampling farqini biladi",
        "Dinamik sampler bilan narx va foydani muvozanatlaydi"
      ],
      prerequisites: [
        "59.6"
      ]
    },
    {
      id: "59.14",
      title: "PII Scrubbing",
      description: [
        "PII (shaxsiy ma'lumot) Sentry'ga tushmasligi kerak: email, telefon, ism, IP, manzil, pasport, so'rov tanalari, cookie'lar. `send_default_pii => false` (default — IP, cookie, foydalanuvchi ma'lumotlarini yubormaydi), server tomonidagi Data Scrubber (parol, token, karta raqamlarini avtomatik niqoblash), \"Sensitive fields\" ro'yxati, IP saqlashni o'chirish.",
        "",
        "Maxfiylik qonunlari (GDPR va mahalliy qonunlar) va mijoz shartnomalari talab qilishi mumkin; Sentry — uchinchi tomon (ma'lumotlar qayerda saqlanishi — region tanlash, self-hosted variant).",
        "",
        "```php",
        "// config/sentry.php",
        "'send_default_pii' => false,",
        "'before_send' => function (Event $event): ?Event {",
        "    $request = $event->getRequest();",
        "    unset($request['cookies'], $request['data']['password'], $request['data']['phone']);",
        "    $event->setRequest($request);",
        "    return $event;",
        "},",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sentry'ga yuborilayotgan hodisalarni PII bo'yicha tekshirib, scrubbing va `before_send` filtrlarini sozlang.",
      acceptanceCriteria: [
        "PII turlari va Sentry scrubbing vositalarini biladi",
        "Maxfiylik talablarini hisobga oladi"
      ],
      prerequisites: [
        "58.7"
      ]
    },
    {
      id: "59.15",
      title: "Sensitive Data Filtering",
      description: [
        "Sezgir ma'lumotni filtrlash qatlamlari: SDK tomonida (`before_send`, `before_breadcrumb`, `sql_bindings => false`, `#[\\SensitiveParameter]` — stack trace argumentlarida yashiriladi), Laravel tomonida (model `$hidden`, so'rov ma'lumotlarini yubormaslik), Sentry server tomonida (Data Scrubbing, Advanced Data Scrubbing qoidalari — regex bilan, masalan, karta raqami naqshi).",
        "",
        "Muntazam audit: real hodisalarni ko'rib chiqib, yangi sezgir maydonlar paydo bo'lmaganini tekshirish (yangi funksiyalar yangi maydonlar keltiradi).",
        "",
        "```php",
        "'before_breadcrumb' => function (Breadcrumb $b): ?Breadcrumb {",
        "    if ($b->getCategory() === 'http' && str_contains((string) ($b->getMetadata()['url'] ?? ''), 'token=')) {",
        "        return null;   // token'li URL'lar breadcrumb'ga tushmasin",
        "    }",
        "    return $b;",
        "},",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Breadcrumb va stack trace argumentlarida sezgir ma'lumot sizib chiqishini filtrlab, real hodisalar bo'yicha audit qiling.",
      acceptanceCriteria: [
        "Filtrlash qatlamlarini biladi",
        "Muntazam audit o'tkazadi"
      ],
      prerequisites: [
        "59.14"
      ]
    },
    {
      id: "59.16",
      title: "Laravel Integration",
      description: [
        "`sentry/sentry-laravel` imkoniyatlari: exception handler integratsiyasi, avtomatik breadcrumb'lar (log, SQL, queue, kesh, HTTP), performance tracing (so'rovlar, job'lar, buyruqlar, scheduler), user context, `sentry:test` buyrug'i, log kanali (`sentry_logs` — Log'dan Sentry'ga), queue job'lar xatolari, scheduler monitoring (Cron Monitors — `->sentryMonitor()`).",
        "",
        "Laravel 11+ da `bootstrap/app.php` da `Integration::handles($exceptions)`. Konfiguratsiya `config/sentry.php` (publish qilingan).",
        "",
        "```php",
        "Schedule::command('reports:daily')->dailyAt('02:00')->sentryMonitor();   // cron monitoring",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Scheduler vazifalari uchun Sentry Cron Monitors'ni yoqib, o'tkazib yuborilgan ishga tushishni sinang.",
      acceptanceCriteria: [
        "Laravel SDK imkoniyatlarini biladi",
        "Cron monitoring'dan foydalanadi"
      ],
      prerequisites: [
        "59.1"
      ]
    },
    {
      id: "59.17",
      title: "Performance Overhead",
      description: [
        "Sentry SDK overhead: xato capture — kichik (faqat xatolarda); tracing — har tranzaksiyada span'lar yig'iladi (sampling bilan nazorat); yuborish — default holatda so'rov oxirida sinxron HTTP (javobdan keyin — `terminate` bosqichida, lekin FPM worker'ni band qiladi). Katta trafikda: Relay yoki lokal agent, `traces_sample_rate` past, SQL breadcrumb'larini cheklash, `max_breadcrumbs`.",
        "",
        "O'lchash: Sentry yoqilgan va o'chirilgan holatda load test — p95 va CPU farqi. Sentry ishlamay qolsa ham ilova sekinlashmasligi uchun HTTP timeout'lar (`http_timeout`, `http_connect_timeout`).",
        "",
        "```php",
        "'http_timeout' => 2,",
        "'http_connect_timeout' => 1,",
        "'max_breadcrumbs' => 50,",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sentry yoqilgan va o'chirilgan holatda load test o'tkazib, overhead'ni o'lchang va timeout'larni sozlang.",
      acceptanceCriteria: [
        "SDK overhead manbalarini biladi",
        "Sentry nosozligi ilovaga ta'sir qilmasligini ta'minlaydi"
      ],
      prerequisites: [
        "59.13"
      ]
    },
    {
      id: "59.18",
      title: "Production Configuration",
      description: [
        "Production Sentry checklist: to'g'ri DSN va environment; release (commit SHA) har deploy'da; `send_default_pii=false` va scrubbing; `sample_rate=1.0` (xatolar), `traces_sample_rate` yoki dinamik sampler; kutilgan exception'lar filtrlangan; alert qoidalari va ownership; HTTP timeout'lar; source map'lar (frontend); cron monitorlar; kvota va rate limit'lar (spike protection); jamoa a'zolari va ruxsatlar; ma'lumot saqlash regioni.",
        "",
        "Konfiguratsiyani kodda (config fayl + env) saqlang va staging'da sinang.",
        "",
        "```env",
        "SENTRY_LARAVEL_DSN=${SENTRY_DSN}",
        "SENTRY_ENVIRONMENT=production",
        "SENTRY_RELEASE=${GIT_SHA}",
        "SENTRY_SEND_DEFAULT_PII=false",
        "SENTRY_TRACES_SAMPLE_RATE=0.1",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production Sentry konfiguratsiyasini checklist bo'yicha audit qilib, yetishmayotgan sozlamalarni qo'shing.",
      acceptanceCriteria: [
        "Production Sentry sozlamalarini to'liq biladi",
        "Konfiguratsiyani kodda va staging'da sinab boshqaradi"
      ],
      prerequisites: [
        "59.4",
        "59.14"
      ]
    }
  ]
});
