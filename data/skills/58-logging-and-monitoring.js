/* 58 · Logging & Monitoring
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 58,
  slug: "logging-and-monitoring",
  title: "Logging & Monitoring",
  group: "observability",
  description: "Loglash va monitoring — production tizimning \"ko'z va quloqlari\": nima bo'layotganini bilish, muammoni foydalanuvchidan oldin sezish va tez tashxislash. Kuzatuvchanlikning uch ustuni — log'lar, metrikalar va trace'lar. Senior dasturchi strukturali log'lar, mazmunli metrikalar, ishonchli alert'lar va SLO'lar bilan tizimni boshqariladigan qiladi.",
  subskills: [
    {
      id: "58.1",
      title: "Log Levels",
      description: [
        "PSR-3 darajalari (jiddiylik bo'yicha): `debug` (batafsil diagnostika — production'da odatda o'chiq), `info` (muhim biznes hodisalari — buyurtma yaratildi), `notice` (g'ayrioddiy, lekin normal), `warning` (potentsial muammo — retry, eskirgan API), `error` (amal muvaffaqiyatsiz, lekin ilova ishlaydi), `critical` (komponent ishlamayapti), `alert` (zudlik bilan chora kerak), `emergency` (tizim yaroqsiz).",
        "",
        "To'g'ri daraja — alert'lar va filtrlarning asosi: hamma narsani `error` qilish — shovqin, muhimini `info` qilish — yo'qolish. `LOG_LEVEL` muhit bo'yicha.",
        "",
        "```php",
        "Log::info('Order placed', ['order_id' => $order->id, 'total' => $order->total]);",
        "Log::warning('Payment gateway slow', ['ms' => $elapsed]);",
        "Log::error('Invoice generation failed', ['order_id' => $order->id, 'exception' => $e]);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihadagi log yozuvlarini darajalar bo'yicha ko'rib chiqing va noto'g'ri darajadagilarni tuzating.",
      acceptanceCriteria: [
        "Har bir darajaning ma'nosini biladi",
        "Darajani alert'lar bilan bog'laydi"
      ],
      prerequisites: [
        "8.2"
      ]
    },
    {
      id: "58.2",
      title: "Structured Logging",
      description: [
        "Strukturali log — matn emas, maydonli yozuv (JSON): `{\"timestamp\", \"level\", \"message\", \"context\": {...}, \"request_id\", \"user_id\"}`. Afzalligi: mashina tahlili, aniq filtr va agregatsiya (Loki, Elasticsearch, CloudWatch Insights), maydonlar bo'yicha qidiruv (`order_id=42`).",
        "",
        "Qoidalar: xabar o'zgarmas (`\"Order placed\"`), o'zgaruvchilar kontekstda (xabarga string interpolatsiya qilmaslik — guruhlash buziladi); izchil maydon nomlari; Laravel'da JSON formatter (`Monolog\\Formatter\\JsonFormatter`) yoki `stderr` + JSON konteynerlarda.",
        "",
        "```php",
        "// config/logging.php",
        "'stderr' => [",
        "    'driver' => 'monolog',",
        "    'handler' => StreamHandler::class,",
        "    'with' => ['stream' => 'php://stderr'],",
        "    'formatter' => Monolog\\Formatter\\JsonFormatter::class,",
        "],",
        "// ❌ Log::info(\"Order {$id} placed\");  ✅",
        "Log::info('Order placed', ['order_id' => $id]);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Log kanalini JSON formatga o'tkazib, xabarlardagi interpolatsiyalarni kontekst maydonlariga ko'chiring.",
      acceptanceCriteria: [
        "Strukturali log afzalliklarini biladi",
        "O'zgarmas xabar + kontekst qoidasiga amal qiladi"
      ],
      prerequisites: [
        "58.1"
      ]
    },
    {
      id: "58.3",
      title: "Contextual Logging",
      description: [
        "Kontekst — log yozuvini tushunish uchun zarur ma'lumot: kim (user_id, tenant_id), qaysi so'rov (request_id, route), qaysi obyekt (order_id), muhit (app versiyasi, server). Laravel: `Log::withContext([...])` (so'rov davomida barcha yozuvlarga), `Log::shareContext()` (barcha kanallarga, job'larga ham), `Context` facade (Laravel 11+ — job'larga avtomatik uzatiladi), Monolog processor'lar.",
        "",
        "Middleware'da umumiy kontekstni bir marta qo'shish — har log chaqiruvida takrorlamaslik uchun.",
        "",
        "```php",
        "final class AddLogContext",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        Context::add('request_id', $request->header('X-Request-Id', (string) Str::uuid()));",
        "        Context::add('user_id', $request->user()?->id);",
        "        return $next($request);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Har so'rov log'lariga request_id, user_id va tenant_id qo'shuvchi middleware yozing va job'larga uzatilishini tekshiring.",
      acceptanceCriteria: [
        "Kontekst qo'shish usullarini biladi",
        "`Context` facade'ning job'larga uzatilishini tushunadi"
      ],
      prerequisites: [
        "58.2"
      ]
    },
    {
      id: "58.4",
      title: "Correlation IDs",
      description: [
        "Correlation ID — bitta biznes oqimiga tegishli barcha hodisalarni (bir nechta so'rov, job'lar, event'lar, servislar) bog'lovchi identifikator. Kirishda yaratiladi (yoki mijozdan/gateway'dan qabul qilinadi), barcha ichki chaqiruvlar (HTTP header'lar, job payload, xabar metadata) orqali uzatiladi va har log yozuvida bo'ladi.",
        "",
        "Natija: \"buyurtma #42 bilan nima bo'ldi?\" savoliga barcha servislar log'laridan bitta so'rov bilan javob. OpenTelemetry'da `trace_id` shu vazifani standart tarzda bajaradi.",
        "",
        "```php",
        "$correlationId = Context::get('correlation_id');",
        "Http::withHeaders(['X-Correlation-Id' => $correlationId])->post($url, $payload);   // tashqi servisga",
        "// Job'larda Context avtomatik tiklanadi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Correlation ID'ni HTTP so'rov → job → tashqi servis zanjiri bo'ylab uzatib, log'larda butun oqimni kuzating.",
      acceptanceCriteria: [
        "Correlation ID maqsadini biladi",
        "Uni servislar va job'lar orqali uzatadi"
      ],
      prerequisites: [
        "58.3"
      ]
    },
    {
      id: "58.5",
      title: "Request IDs",
      description: [
        "Request ID — har HTTP so'rov uchun noyob ID: load balancer/Nginx yaratishi (`$request_id`) yoki ilova; javob header'ida qaytariladi (`X-Request-Id`) — foydalanuvchi/support xato haqida xabar berganda aynan shu so'rov log'larini topish mumkin. Xato sahifalarida va API xato javoblarida ham ko'rsatiladi.",
        "",
        "Nginx va ilova bir xil ID'ni ishlatishi kerak (Nginx header'ni uzatadi, ilova uni olib Context'ga qo'yadi) — shunda access log, ilova log'i va Sentry bog'lanadi.",
        "",
        "```nginx",
        "add_header X-Request-Id $request_id always;",
        "fastcgi_param HTTP_X_REQUEST_ID $request_id;",
        "```",
        "```php",
        "Context::add('request_id', $request->header('X-Request-Id'));",
        "// Xato javobida",
        "return response()->json(['message' => 'Server xatosi', 'request_id' => Context::get('request_id')], 500);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Nginx va Laravel'da yagona request ID'ni sozlab, xato javobida qaytaring va log'lar bo'yicha qidiring.",
      acceptanceCriteria: [
        "Request ID oqimini Nginx'dan ilovagacha biladi",
        "Uni support jarayoniga bog'laydi"
      ],
      prerequisites: [
        "58.3"
      ]
    },
    {
      id: "58.6",
      title: "Exception Logging",
      description: [
        "Exception'lar to'liq kontekst bilan loglanishi kerak: turi, xabari, stack trace, `previous` zanjiri, so'rov/job konteksti. Laravel handler `report()` orqali avtomatik loglaydi; qo'lda: `report($e)` (ushlangan, lekin muhim xatolar), `Log::error('...', ['exception' => $e])`.",
        "",
        "Qoidalar: exception'ni yutib yubormaslik (bo'sh catch); bir xatoni bir necha marta loglamaslik (har qatlamda log + throw — shovqin); kutilgan biznes exception'larini (`dontReport`) error darajasida loglamaslik; `context()` metodi exception'ga qo'shimcha ma'lumot beradi.",
        "",
        "```php",
        "final class PaymentFailed extends RuntimeException",
        "{",
        "    public function __construct(private int $orderId, string $message, ?Throwable $previous = null)",
        "    {",
        "        parent::__construct($message, previous: $previous);",
        "    }",
        "    public function context(): array { return ['order_id' => $this->orderId]; }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Domen exception'lariga `context()` qo'shing va ikki marta loglanayotgan joylarni tozalang.",
      acceptanceCriteria: [
        "Exception'ni to'liq kontekst bilan loglaydi",
        "Takroriy va yutib yuborilgan xatolardan qochadi"
      ],
      prerequisites: [
        "2.16"
      ]
    },
    {
      id: "58.7",
      title: "Sensitive Data Redaction",
      description: [
        "Log'larga tushmasligi kerak: parollar, token'lar va API kalitlari, karta ma'lumotlari (PCI DSS), pasport va shaxsiy ma'lumotlar (GDPR/mahalliy qonunlar), session ID'lar, to'liq so'rov tanalari. Log'lar ko'p joyga tarqaladi (markaziy tizim, vendor'lar, xodimlar) — sizib chiqish xavfi yuqori.",
        "",
        "Himoya: so'rovni to'liq loglamaslik (`$request->all()` o'rniga kerakli maydonlar), Monolog processor bilan avtomatik niqoblash, `#[\\SensitiveParameter]`, model `$hidden`, Sentry `before_send` filtrlari, kod review'da tekshirish.",
        "",
        "```php",
        "final class RedactSensitive implements ProcessorInterface",
        "{",
        "    private const KEYS = ['password', 'token', 'card_number', 'cvv', 'authorization', 'passport'];",
        "    public function __invoke(LogRecord $record): LogRecord",
        "    {",
        "        return $record->with(context: $this->redact($record->context));",
        "    }",
        "    private function redact(array $data): array",
        "    {",
        "        foreach ($data as $k => $v) {",
        "            $data[$k] = in_array(strtolower((string) $k), self::KEYS, true) ? '[REDACTED]' : (is_array($v) ? $this->redact($v) : $v);",
        "        }",
        "        return $data;",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Monolog processor bilan sezgir maydonlarni avtomatik niqoblang va log'larni sizib chiqish bo'yicha audit qiling.",
      acceptanceCriteria: [
        "Log'da bo'lmasligi kerak bo'lgan ma'lumotlarni biladi",
        "Avtomatik niqoblashni joriy qiladi"
      ],
      prerequisites: [
        "58.2"
      ]
    },
    {
      id: "58.8",
      title: "Centralized Logging",
      description: [
        "Markaziy loglash — barcha serverlar, konteynerlar va servislar log'larini bir joyda yig'ish: qidiruv, korrelyatsiya, saqlash, kirish nazorati, alert'lar. Stack'lar: **ELK/OpenSearch** (Elasticsearch + Logstash/Fluent Bit + Kibana), **Grafana Loki** (arzonroq, label asosida), bulut (CloudWatch Logs, Google Cloud Logging), SaaS (Datadog, Better Stack, Papertrail).",
        "",
        "Yig'ish: konteynerlarda stdout → agent (Fluent Bit, Promtail, Vector) → markaziy tizim; serverlarda fayllar → agent. Strukturali JSON log'lar markaziy tizimda eng foydali.",
        "",
        "```yaml",
        "# Promtail → Loki (Docker log'lari)",
        "scrape_configs:",
        "  - job_name: docker",
        "    docker_sd_configs: [{ host: unix:///var/run/docker.sock }]",
        "    pipeline_stages: [{ json: { expressions: { level: level_name, request_id: context.request_id } } }]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilova va Nginx log'larini Loki (yoki ELK) ga yig'ib, request_id bo'yicha so'rov yozing.",
      acceptanceCriteria: [
        "Markaziy loglash arxitekturasini biladi",
        "Agent orqali log yig'ishni sozlaydi"
      ],
      prerequisites: [
        "58.2"
      ]
    },
    {
      id: "58.9",
      title: "Log Rotation",
      description: [
        "Log rotatsiyasi — log fayllari diskni to'ldirmasligi uchun: kunlik/hajm bo'yicha yangi fayl, eskilarni siqish va o'chirish. Laravel: `daily` kanal (`days` — saqlash kunlari), lekin ko'p jarayonli muhitda `logrotate` ishonchliroq. Serverda `logrotate` (`/etc/logrotate.d/`) — Nginx, PHP-FPM, ilova log'lari; `copytruncate` yoki jarayonga signal (`postrotate`).",
        "",
        "Konteynerlarda — log driver rotatsiyasi (`max-size`, `max-file`) va markaziy tizim. Ruxsatlar: rotatsiyadan keyin yangi fayl to'g'ri egasi bilan (`create 0640 www-data www-data`).",
        "",
        "```text",
        "# /etc/logrotate.d/laravel",
        "/var/www/shared/storage/logs/*.log {",
        "    daily",
        "    rotate 14",
        "    compress",
        "    missingok",
        "    notifempty",
        "    create 0640 www-data www-data",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Ilova log'lari uchun logrotate sozlang va `logrotate -d` bilan sinab ko'ring.",
      acceptanceCriteria: [
        "Log rotatsiyasi usullarini biladi",
        "Ruxsatlar va jarayonlar bilan muammolarni oldini oladi"
      ],
      prerequisites: [
        "38.11"
      ]
    },
    {
      id: "58.10",
      title: "Log Retention",
      description: [
        "Saqlash muddati — log'lar qancha vaqt saqlanadi: operatsion log'lar (debug/info) — qisqa (7–30 kun), xatolar — uzunroq, xavfsizlik va audit log'lari — talab bo'yicha uzoq (1+ yil; regulyator talablari), shaxsiy ma'lumotli log'lar — minimal (maxfiylik qonunlari \"keragidan uzoq saqlamaslik\"ni talab qiladi).",
        "",
        "Narx: markaziy tizimlarda saqlash qimmat — issiq (tez qidiruv, qisqa) va sovuq (arzon, S3/Glacier arxiv) qatlamlar. Siyosatni hujjatlashtirish va avtomatlashtirish (ILM, Loki retention).",
        "",
        "```text",
        "debug/info  → 14 kun (issiq)",
        "warning+    → 90 kun (issiq) → 1 yil (arxiv)",
        "security/audit → 1 yil (issiq) → 5 yil (arxiv, o'zgartirib bo'lmaydigan)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Log turlari bo'yicha saqlash siyosatini yozing va markaziy tizimda avtomatik qo'llang.",
      acceptanceCriteria: [
        "Log turlari bo'yicha saqlash talablarini biladi",
        "Narx va maxfiylik talablarini muvozanatlaydi"
      ],
      prerequisites: [
        "58.8"
      ]
    },
    {
      id: "58.11",
      title: "Metrics",
      description: [
        "Metrikalar — vaqt bo'yicha raqamli o'lchovlar: arzon saqlanadi, tez agregatsiya qilinadi, alert va trendlar uchun ideal. Turlari: **counter** (faqat o'sadi — so'rovlar soni, xatolar), **gauge** (ixtiyoriy qiymat — navbat uzunligi, xotira), **histogram** (taqsimot — kechikish percentillari uchun). Label'lar (route, status, method) — o'lchovlar, lekin yuqori kardinallik (user_id label sifatida) — xavfli.",
        "",
        "Asosiy metodlar: **RED** (Rate, Errors, Duration — servislar uchun), **USE** (Utilization, Saturation, Errors — resurslar uchun), biznes metrikalari (buyurtmalar, to'lovlar, ro'yxatdan o'tishlar). Laravel'da: Prometheus exporter paketlari, StatsD, OpenTelemetry metrics.",
        "",
        "```php",
        "$histogram->observe($duration, ['route' => $request->route()?->getName(), 'status' => (string) $response->getStatusCode()]);",
        "$counter->inc(['type' => 'order_placed']);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilovaga RED metrikalari (so'rovlar, xatolar, kechikish histogrammasi) va 2 ta biznes metrikasini qo'shing.",
      acceptanceCriteria: [
        "Metrika turlarini va RED/USE metodlarini biladi",
        "Label kardinalligi xavfini tushunadi"
      ],
      prerequisites: [
        "58.1"
      ]
    },
    {
      id: "58.12",
      title: "Application Health Checks",
      description: [
        "Health check — ilova ishlayotganini tekshiruvchi endpoint: **liveness** (jarayon tirikmi — `/up`, Laravel 11+ da o'rnatilgan, tashqi bog'liqliksiz), **readiness** (trafik qabul qilishga tayyormi — DB, Redis, navbat ulanishlari). Load balancer, orkestrator (K8s probe'lar) va uptime monitoring ishlatadi.",
        "",
        "Qoidalar: liveness yengil (DB yiqilsa barcha pod'lar qayta ishga tushmasligi uchun); readiness bog'liqliklarni qisqa timeout bilan tekshiradi; batafsil holat sahifasi himoyalangan; `spatie/laravel-health` — keng tekshiruvlar (disk, navbat, scheduler, kesh) va bildirishnomalar.",
        "",
        "```php",
        "// bootstrap/app.php — /up liveness",
        "->withRouting(health: '/up')",
        "",
        "Route::get('/ready', function () {",
        "    DB::select('select 1');",
        "    Redis::ping();",
        "    return response()->json(['status' => 'ok']);",
        "})->middleware('throttle:60,1');",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Liveness va readiness endpoint'larini yarating va load balancer/Compose health check'ga ulang.",
      acceptanceCriteria: [
        "Liveness va readiness farqini biladi",
        "Health check'larni yengil va xavfsiz qiladi"
      ],
      prerequisites: [
        "36.10"
      ]
    },
    {
      id: "58.13",
      title: "Infrastructure Monitoring",
      description: [
        "Infratuzilma monitoringi: serverlar (CPU, xotira, disk, tarmoq, load — `node_exporter`), konteynerlar (cAdvisor), DB (mysqld/postgres exporter), Redis, Nginx (stub_status), PHP-FPM (status), navbatlar, sertifikat muddatlari, DNS va tashqi uptime (blackbox monitoring — tashqaridan tekshirish).",
        "",
        "Stack: Prometheus + Grafana (ochiq), bulut (CloudWatch, Azure Monitor), SaaS (Datadog, New Relic). Dashboard'lar USE metodi bo'yicha; ilova metrikalari bilan bir joyda — korrelyatsiya uchun.",
        "",
        "```yaml",
        "scrape_configs:",
        "  - job_name: node",
        "    static_configs: [{ targets: ['app-1:9100', 'app-2:9100'] }]",
        "  - job_name: php-fpm",
        "    static_configs: [{ targets: ['app-1:9253'] }]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Prometheus + Grafana bilan server, FPM, DB va Redis monitoringini sozlang.",
      acceptanceCriteria: [
        "Infratuzilma monitoringi komponentlarini biladi",
        "Exporter'lar bilan metrikalarni yig'adi"
      ],
      prerequisites: [
        "58.11"
      ]
    },
    {
      id: "58.14",
      title: "Alerting",
      description: [
        "Alert — inson e'tiborini talab qiladigan holat haqida xabar. Yaxshi alert: **simptomga** asoslangan (foydalanuvchiga ta'sir — xatolar ulushi, kechikish, mavjudlik), sababga emas (CPU 80% — ko'pincha normal); harakatga undaydi (nima qilish kerak — runbook havolasi); aniq jiddiylik (darhol uyg'otish vs ish vaqtida ko'rish); kam shovqin (alert charchog'i — muhim alert'lar e'tiborsiz qoladi).",
        "",
        "Vositalar: Prometheus Alertmanager (guruhlash, jim qilish, marshrutlash), Grafana alerting, PagerDuty/Opsgenie (navbatchilik), Telegram/Slack kanallari. `for:` — qisqa portlashlarda signal bermaslik.",
        "",
        "```yaml",
        "- alert: HighErrorRate",
        "  expr: sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) > 0.02",
        "  for: 5m",
        "  labels: { severity: page }",
        "  annotations:",
        "    summary: \"5xx ulushi 2% dan yuqori\"",
        "    runbook: \"https://wiki.example.uz/runbooks/high-error-rate\"",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Simptomga asoslangan 3 ta alert (xatolar, kechikish, mavjudlik) runbook havolalari bilan sozlang.",
      acceptanceCriteria: [
        "Simptom va sabab alert'larini farqlaydi",
        "Alert charchog'ining oldini oladi"
      ],
      prerequisites: [
        "58.11"
      ]
    },
    {
      id: "58.15",
      title: "Queue Monitoring",
      description: [
        "Navbat monitoringi: navbat uzunligi (backlog), eng eski job yoshi / kutish vaqti, throughput, muvaffaqiyatsiz job'lar soni va o'sishi, job davomiyligi, worker'lar soni va holati, failed_jobs jadvali hajmi. Horizon dashboard va bildirishnomalari, `queue:monitor` buyrug'i, Prometheus metrikalari.",
        "",
        "Alert'lar: backlog chegaradan oshdi yoki doimiy o'sib bormoqda, kutish vaqti SLO'dan oshdi, failure rate oshdi, worker'lar yo'q (scheduler/supervisor ishlamay qolgan), scheduler heartbeat yo'q.",
        "",
        "```php",
        "Schedule::command('queue:monitor redis:default,redis:emails --max=500')->everyMinute();",
        "Schedule::call(fn () => Http::get(config('services.healthchecks.scheduler')))->everyFiveMinutes();   // heartbeat",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Navbatlar uchun backlog, kutish vaqti va failure alert'larini hamda scheduler heartbeat'ini sozlang.",
      acceptanceCriteria: [
        "Navbat uchun muhim metrikalarni biladi",
        "Scheduler va worker'lar ishlamay qolishini aniqlaydi"
      ],
      prerequisites: [
        "46.20"
      ]
    },
    {
      id: "58.16",
      title: "Database Monitoring",
      description: [
        "DB monitoringi: so'rovlar soni va kechikish, sekin so'rovlar (slow log, `pg_stat_statements`), ulanishlar (faol/maksimal), replikatsiya lag, lock kutishlar va deadlock'lar, buffer/cache hit ratio, disk hajmi va o'sish, uzoq tranzaksiyalar, PostgreSQL'da bloat va autovacuum, backup muvaffaqiyati.",
        "",
        "Ilova tomonida: so'rov vaqtlari (APM, Telescope), N+1 holatlari, DB xatolari. Alert'lar: lag, ulanishlar limiti, disk, deadlock portlashi, backup muvaffaqiyatsizligi.",
        "",
        "```yaml",
        "- alert: MySQLReplicationLag",
        "  expr: mysql_slave_status_seconds_behind_master > 30",
        "  for: 2m",
        "- alert: DBConnectionsHigh",
        "  expr: mysql_global_status_threads_connected / mysql_global_variables_max_connections > 0.8",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "DB uchun asosiy metrikalar dashboard'i va lag, ulanishlar, disk alert'larini sozlang.",
      acceptanceCriteria: [
        "DB monitoringining asosiy metrikalarini biladi",
        "Ilova va DB tomonidagi monitoringni bog'laydi"
      ],
      prerequisites: [
        "15.19"
      ]
    },
    {
      id: "58.17",
      title: "Error Rate Monitoring",
      description: [
        "Xatolar ulushi — servis sog'lig'ining asosiy ko'rsatkichlaridan: 5xx / jami so'rovlar (route bo'yicha ham), job failure rate, tashqi API xatolari, ilova exception'lari (Sentry — yangi xato turlari, xato chastotasi o'sishi, ta'sirlangan foydalanuvchilar).",
        "",
        "Muhim: absolyut son emas, ulush (trafik o'zgarishini hisobga olish); 4xx alohida (ko'pincha mijoz xatosi, lekin keskin o'sish — buzilgan frontend yoki hujum); deploy bilan korrelyatsiya (yangi relizdan keyin xatolar o'sdimi — avtomatik rollback signali).",
        "",
        "```promql",
        "sum(rate(http_requests_total{status=~\"5..\"}[5m])) by (route)",
        "  / sum(rate(http_requests_total[5m])) by (route)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Route bo'yicha xatolar ulushi dashboard'ini yarating va deploy annotatsiyalarini qo'shing.",
      acceptanceCriteria: [
        "Xatolar ulushini to'g'ri hisoblaydi",
        "Xatolarni deploy'lar bilan korrelyatsiya qiladi"
      ],
      prerequisites: [
        "58.11"
      ]
    },
    {
      id: "58.18",
      title: "Latency Monitoring",
      description: [
        "Kechikish monitoringi: percentillar (p50, p95, p99) route bo'yicha — o'rtacha emas; histogrammalar (Prometheus) asosida; DB, kesh, tashqi API kechikishlari alohida (qaysi qism sekinlashdi). Apdex — foydalanuvchi qoniqishi indeksi (ixtiyoriy).",
        "",
        "Alert: p95/p99 SLO chegarasidan oshdi (masalan, 5 daqiqa davomida); trend: sekin o'sish (ma'lumot hajmi o'sishi bilan sekinlashayotgan so'rovlar). Real foydalanuvchi monitoringi (RUM) frontend kechikishini ham ko'rsatadi.",
        "",
        "```promql",
        "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Route bo'yicha p95/p99 kechikish dashboard'i va SLO asosidagi alert sozlang.",
      acceptanceCriteria: [
        "Kechikishni percentillar bilan kuzatadi",
        "Kechikishni komponentlarga ajratadi"
      ],
      prerequisites: [
        "53.20"
      ]
    },
    {
      id: "58.19",
      title: "Dashboards",
      description: [
        "Yaxshi dashboard — savolga javob beradi: \"servis sog'lommi?\" (RED — tepada), \"qaysi komponent muammoli?\" (USE — pastda), \"biznes qanday?\" (buyurtmalar, to'lovlar). Tuzilma: eng muhimi yuqorida, vaqt oralig'i sinxron, deploy annotatsiyalari, birliklar va chegaralar ko'rsatilgan, havolalar batafsil dashboard'larga va log'larga.",
        "",
        "Ko'p panel — chalg'itadi; har servis uchun bitta \"overview\" dashboard + kerak bo'lganda batafsillari. Dashboard'larni kod sifatida saqlash (Grafana provisioning, JSON git'da).",
        "",
        "```text",
        "Overview: Ilova API",
        "┌ So'rovlar/s ┐ ┌ 5xx % ┐ ┌ p95 ms ┐ ┌ Navbat backlog ┐",
        "┌ Route bo'yicha p95 (top 10) ─────────────────────┐",
        "┌ DB so'rov vaqti ┐ ┌ Redis hit ratio ┐ ┌ FPM band worker'lar ┐",
        "┌ Buyurtmalar/soat ┐ ┌ To'lov muvaffaqiyati % ┐",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Servis uchun \"overview\" dashboard'ini RED, USE va biznes metrikalari bilan yarating va git'da saqlang.",
      acceptanceCriteria: [
        "Dashboard dizayni tamoyillarini biladi",
        "Dashboard'larni kod sifatida boshqaradi"
      ],
      prerequisites: [
        "58.11"
      ]
    },
    {
      id: "58.20",
      title: "Incident Correlation",
      description: [
        "Insident paytida turli signallarni bog'lash: alert vaqti ↔ deploy'lar ↔ metrikalar o'zgarishi ↔ log'lardagi xatolar ↔ trace'lar ↔ infratuzilma hodisalari ↔ tashqi servislar holati. Tez savol: \"bu nima bilan bir vaqtda boshlandi?\"",
        "",
        "Bunga yordam beradi: umumiy vaqt (UTC, NTP), umumiy identifikatorlar (request_id, trace_id), deploy va konfiguratsiya o'zgarishlari annotatsiyalari, dashboard'dan log va trace'larga havolalar (Grafana — Loki va Tempo), Sentry'da release va trace bog'lanishi. Insident vaqt chizig'i (timeline) — post-mortem uchun asos.",
        "",
        "```text",
        "14:02 Deploy v2.4.0 (annotatsiya)",
        "14:05 p95 /api/checkout 250 → 2400 ms",
        "14:05 Sentry: QueryException lock wait timeout (yangi)",
        "14:06 Alert: HighLatency",
        "→ Gipoteza: yangi migratsiya/so'rov lock keltirib chiqardi → rollback",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "O'tgan insident uchun barcha signallarni bog'lab vaqt chizig'ini tiklang va qaysi bog'lanish yetishmaganini aniqlang.",
      acceptanceCriteria: [
        "Signallarni vaqt va ID'lar bo'yicha korrelyatsiya qiladi",
        "Deploy annotatsiyalari va havolalarning ahamiyatini biladi"
      ],
      prerequisites: [
        "58.4",
        "43.17"
      ]
    },
    {
      id: "58.21",
      title: "SLI, SLO va SLA",
      description: [
        "**SLI** (Service Level Indicator) — o'lchanadigan ko'rsatkich: muvaffaqiyatli so'rovlar ulushi, p95 kechikish, job kutish vaqti. **SLO** (Objective) — SLI uchun maqsad: \"30 kunda so'rovlarning 99.9% i muvaffaqiyatli\", \"p95 < 300 ms\". **SLA** (Agreement) — mijoz bilan shartnoma (odatda SLO'dan yumshoqroq), buzilganda jarima/kompensatsiya.",
        "",
        "**Error budget** = 100% − SLO (99.9% → oyiga ~43 daqiqa): byudjet bo'lsa — tezroq relizlar; tugasa — barqarorlikka e'tibor. Alert'lar burn rate asosida (byudjet qanchalik tez yonmoqda). 100% SLO — noreal va zararli.",
        "",
        "```text",
        "SLI: muvaffaqiyatli (non-5xx, < 1 s) /api so'rovlari ulushi",
        "SLO: 99.5% (30 kunlik oyna)",
        "Error budget: 0.5% ≈ 3.6 soat/oy",
        "Alert: 1 soatda byudjetning 2% i yondi (14.4x burn rate)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Asosiy servis uchun SLI, SLO va error budget'ni belgilab, burn rate alert'ini sozlang.",
      acceptanceCriteria: [
        "SLI, SLO va SLA farqini biladi",
        "Error budget va burn rate tushunchalarini qo'llaydi"
      ],
      prerequisites: [
        "58.14"
      ]
    }
  ]
});
