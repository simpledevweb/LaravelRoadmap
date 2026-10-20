/* 47 · Laravel Horizon
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 47,
  slug: "laravel-horizon",
  title: "Laravel Horizon",
  group: "async",
  description: "Laravel Horizon — Redis navbatlari uchun dashboard va konfiguratsiya tizimi: worker'larni kod orqali boshqarish, avtomatik balanslash, real-vaqt metrikalari (throughput, wait time, runtime), muvaffaqiyatsiz job'lar va bildirishnomalar. Senior dasturchi Horizon'ni production'ga tayyorlaydi: supervisor'lar, limitlar, xavfsizlik va deploy jarayoni.",
  subskills: [
    {
      id: "47.1",
      title: "Horizon Architecture",
      description: [
        "Horizon tuzilmasi: `php artisan horizon` — master jarayon; u `config/horizon.php` dagi muhitga mos **supervisor**'larni ishga tushiradi; har supervisor o'z navbatlari uchun worker jarayonlarini (`queue:work` analogi) boshqaradi va balanslaydi. Metrikalar va job holatlari Redis'da saqlanadi; dashboard (`/horizon`) ularni ko'rsatadi.",
        "",
        "Horizon faqat Redis queue driver bilan ishlaydi. Bitta serverda bitta Horizon master; ko'p serverda har birida o'z master'i (bir xil konfiguratsiya). Master jarayonni Supervisor/systemd boshqaradi.",
        "",
        "```bash",
        "composer require laravel/horizon",
        "php artisan horizon:install",
        "php artisan horizon",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Horizon'ni o'rnatib, master → supervisor → worker jarayonlar daraxtini kuzating.",
      acceptanceCriteria: [
        "Horizon komponentlarini biladi",
        "Faqat Redis bilan ishlashini tushunadi"
      ],
      prerequisites: [
        "46.16"
      ]
    },
    {
      id: "47.2",
      title: "Redis Queue Configuration",
      description: [
        "Horizon uchun Redis sozlamalari: alohida Redis connection (`queue`) va ideal holda alohida instance yoki DB (cache bilan aralashmasin — `noeviction` siyosati!), `retry_after` > eng uzun `timeout`, `block_for` (BLPOP kutish — resurs tejash), prefiks (`horizon.prefix`) — bir Redis'da bir nechta ilova.",
        "",
        "Redis persistence (AOF) — restart'da navbatdagi job'lar yo'qolmasligi uchun. Cluster'da hash tag'lar bilan prefiks.",
        "",
        "```php",
        "// config/queue.php",
        "'redis' => [",
        "    'driver' => 'redis',",
        "    'connection' => 'queue',",
        "    'queue' => 'default',",
        "    'retry_after' => 190,",
        "    'block_for' => 5,",
        "],",
        "// config/database.php → 'redis' → 'queue' => [... 'database' => 2]",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Horizon uchun alohida Redis connection, `noeviction` va AOF bilan sozlang.",
      acceptanceCriteria: [
        "Horizon uchun Redis talablarini biladi",
        "`retry_after` va timeout qoidasini qo'llaydi"
      ],
      prerequisites: [
        "12.11",
        "12.15"
      ]
    },
    {
      id: "47.3",
      title: "Supervisors",
      description: [
        "Supervisor — navbatlar guruhi uchun worker'lar to'plami: `connection`, `queue` (ro'yxat — tartib prioritetni bildiradi), `balance`, `minProcesses`/`maxProcesses`, `tries`, `timeout`, `memory`, `nice`. Muhit bo'yicha (`environments.production`, `local`) turli sozlamalar.",
        "",
        "Odatiy amaliyot: navbatlarni xususiyatiga qarab supervisor'larga ajratish — tez va muhim (`critical`, `default`), sekin og'ir (`imports`, `reports` — kattaroq timeout va memory), tashqi API (`webhooks` — ko'p parallel, kichik xotira). Shunda og'ir job'lar tezlarini bloklamaydi.",
        "",
        "```php",
        "'environments' => [",
        "    'production' => [",
        "        'supervisor-fast' => ['queue' => ['critical', 'default'], 'balance' => 'auto', 'minProcesses' => 2, 'maxProcesses' => 20, 'timeout' => 60],",
        "        'supervisor-heavy' => ['queue' => ['imports', 'reports'], 'balance' => 'simple', 'maxProcesses' => 4, 'timeout' => 900, 'memory' => 512],",
        "    ],",
        "],",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Navbatlarni tez va og'ir supervisor'larga ajratib, har biriga mos timeout va xotira bering.",
      acceptanceCriteria: [
        "Supervisor parametrlarini biladi",
        "Navbatlarni xususiyatga qarab guruhlaydi"
      ],
      prerequisites: [
        "47.1"
      ]
    },
    {
      id: "47.4",
      title: "Worker Balancing Strategies",
      description: [
        "Balans strategiyalari: **`auto`** — worker'lar navbatlar orasida yuklamaga (backlog va wait time) qarab dinamik taqsimlanadi (`autoScalingStrategy`: `time` yoki `size`), `minProcesses`–`maxProcesses` oralig'ida, `balanceMaxShift` va `balanceCooldown` bilan tezlikni boshqarish; **`simple`** — worker'lar navbatlar o'rtasida teng bo'linadi; **`false`** — navbatlar ro'yxat tartibida qayta ishlanadi (barcha worker'lar avval birinchi navbatni).",
        "",
        "`auto` ko'p hollarda eng yaxshi; qat'iy prioritet kerak bo'lsa `false`.",
        "",
        "```php",
        "'supervisor-fast' => [",
        "    'balance' => 'auto',",
        "    'autoScalingStrategy' => 'time',",
        "    'minProcesses' => 2,",
        "    'maxProcesses' => 30,",
        "    'balanceMaxShift' => 3,",
        "    'balanceCooldown' => 3,",
        "],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir xil yuklamada `auto`, `simple` va `false` strategiyalarini sinab, wait time'ni solishtiring.",
      acceptanceCriteria: [
        "Uch strategiyaning farqini biladi",
        "Auto-scaling parametrlarini sozlaydi"
      ],
      prerequisites: [
        "47.3"
      ]
    },
    {
      id: "47.5",
      title: "Queue Priorities",
      description: [
        "Horizon'da prioritet: supervisor `queue` ro'yxati tartibi (`['critical', 'default', 'low']`) va `balance: false` — qat'iy tartib; `auto` balansda esa og'irlik yuklamaga qarab. Kafolatlangan resurs kerak bo'lsa — muhim navbat uchun alohida supervisor (minimal worker'lar soni bilan) — boshqa navbatlar yuklamasi unga ta'sir qilmaydi.",
        "",
        "Muhim job'lar (OTP, to'lov tasdig'i) uchun past wait time — Horizon \"long wait\" chegarasi (`waits`) bilan nazorat.",
        "",
        "```php",
        "'supervisor-critical' => ['queue' => ['critical'], 'balance' => 'simple', 'processes' => 3],",
        "'waits' => ['redis:critical' => 10, 'redis:default' => 60],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kritik navbat uchun kafolatlangan worker'li alohida supervisor va wait chegarasini sozlang.",
      acceptanceCriteria: [
        "Horizon'da prioritetni ta'minlash usullarini biladi",
        "Kritik navbatlarni izolyatsiya qiladi"
      ],
      prerequisites: [
        "46.15"
      ]
    },
    {
      id: "47.6",
      title: "Process Limits",
      description: [
        "`maxProcesses` — supervisor'ning maksimal worker'lari; jami barcha supervisor'lar bo'yicha server resurslariga (xotira: worker'lar × `memory`, CPU, DB ulanishlari) sig'ishi kerak. `minProcesses` — har navbat uchun minimal (auto'da). Ko'p serverda — har server uchun alohida hisoblanadi.",
        "",
        "Juda ko'p worker — DB ulanishlari tugaydi, tashqi API rate limit'iga uriladi, xotira yetmaydi. Tashqi API cheklovlari uchun worker sonini emas, job middleware'idagi `RateLimited`/`ThrottlesExceptions` ni ham ishlating.",
        "",
        "```text",
        "Server: 8 GB, worker ~80 MB",
        "supervisor-fast  maxProcesses 30 → 2.4 GB",
        "supervisor-heavy maxProcesses 4 × 512 MB → 2 GB",
        "Jami ≈ 4.4 GB + FPM + OS ✅  ·  DB ulanishlari: 34 + FPM",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Server resurslari va DB ulanish limitiga asoslanib, supervisor'lar uchun `maxProcesses` byudjetini hisoblang.",
      acceptanceCriteria: [
        "Worker sonini resurslarga moslab hisoblaydi",
        "DB ulanishlari va tashqi limitlarni hisobga oladi"
      ],
      prerequisites: [
        "47.3"
      ]
    },
    {
      id: "47.7",
      title: "Memory Limits",
      description: [
        "Supervisor `memory` (MB) — worker shu xotiradan oshsa, joriy job'ni tugatib qayta ishga tushadi (leak'larga qarshi). Horizon master'ning o'z xotira limiti (`memory_limit` konfiguratsiyada). Og'ir job'lar uchun alohida supervisor'da kattaroq limit.",
        "",
        "PHP `memory_limit` (CLI) worker limitidan katta bo'lishi kerak, aks holda job fatal error bilan yiqiladi. Xotira o'sishini Horizon metrikalari va server monitoringi bilan kuzating.",
        "",
        "```php",
        "'supervisor-fast'  => ['memory' => 128],",
        "'supervisor-heavy' => ['memory' => 512],",
        "// config/horizon.php",
        "'memory_limit' => 64,   // master",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Supervisor'lar uchun xotira limitlarini job turiga qarab sozlang va leak'li job bilan qayta ishga tushishni kuzating.",
      acceptanceCriteria: [
        "Worker va master xotira limitlarini biladi",
        "PHP memory_limit bilan muvofiqlashtiradi"
      ],
      prerequisites: [
        "46.17"
      ]
    },
    {
      id: "47.8",
      title: "Timeouts",
      description: [
        "Horizon'da timeout'lar: supervisor `timeout` (worker job'ni shu soniyadan keyin o'ldiradi), job `$timeout` (ustunlik qiladi), connection `retry_after`. Qoida: `retry_after` > eng katta timeout. Horizon `horizon:terminate` dagi kutish — supervisor timeout'lariga bog'liq.",
        "",
        "Turli timeout'li job'lar — turli supervisor'larda (uzun job'lar tez navbatni egallab qolmasligi va `retry_after` qoidasi buzilmasligi uchun alohida connection bilan).",
        "",
        "```php",
        "'connections' => [",
        "    'redis'      => [..., 'retry_after' => 90],",
        "    'redis-long' => [..., 'retry_after' => 960],",
        "],",
        "'supervisor-heavy' => ['connection' => 'redis-long', 'queue' => ['imports'], 'timeout' => 900],",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Qisqa va uzun job'lar uchun alohida connection va supervisor bilan timeout'larni to'g'ri sozlang.",
      acceptanceCriteria: [
        "Horizon timeout ierarxiyasini biladi",
        "Uzun job'lar uchun alohida connection ishlatadi"
      ],
      prerequisites: [
        "46.7"
      ]
    },
    {
      id: "47.9",
      title: "Retry Configuration",
      description: [
        "Retry sozlamalari: supervisor `tries` (default), job `$tries`/`retryUntil()` va `backoff()` (ustunlik qiladi), `$maxExceptions`. Horizon dashboard'da qayta urinishlar ko'rinadi; muvaffaqiyatsiz job'larni dashboard'dan qayta ishga tushirish mumkin.",
        "",
        "Job darajasida aniq sozlash tavsiya etiladi (har job o'z tabiatiga ko'ra), supervisor default'i esa xavfsiz qiymat (masalan, 3). `tries = 0` — cheksiz (faqat `retryUntil` bilan birga).",
        "",
        "```php",
        "'supervisor-fast' => ['tries' => 3, 'backoff' => [10, 60]],",
        "",
        "final class SyncCrm implements ShouldQueue",
        "{",
        "    public function retryUntil(): DateTime { return now()->addHours(2); }",
        "    public function backoff(): array { return [30, 120, 600]; }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Supervisor default'larini va kritik job'larning o'z retry sozlamalarini muvofiqlashtiring.",
      acceptanceCriteria: [
        "Retry sozlamalari ustuvorligini biladi",
        "Job tabiatiga mos retry beradi"
      ],
      prerequisites: [
        "46.6"
      ]
    },
    {
      id: "47.10",
      title: "Failed Jobs",
      description: [
        "Horizon dashboard'i muvaffaqiyatsiz job'larni ko'rsatadi: exception, stack trace, payload, urinishlar, qayta ishga tushirish tugmasi. Saqlash muddati `trim.failed` (daqiqalarda). Laravel `failed_jobs` jadvali bilan parallel — `queue:retry` ham ishlaydi.",
        "",
        "Tag'lar (Eloquent model'lar avtomatik tag'lanadi — `App\\Models\\Order:42`) — muayyan buyurtma bo'yicha barcha job'larni topish; custom `tags()` metodi. Silenced job'lar (`silenced` konfiguratsiya yoki `ShouldBeSilenced`) — shovqinli muvaffaqiyatli job'larni ro'yxatdan yashirish.",
        "",
        "```php",
        "public function tags(): array",
        "{",
        "    return ['order:'.$this->order->id, 'tenant:'.$this->order->tenant_id];",
        "}",
        "// config/horizon.php",
        "'trim' => ['recent' => 60, 'completed' => 60, 'failed' => 10080],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Job'larga biznes tag'larini qo'shing va dashboard'da muayyan buyurtma bo'yicha job'larni toping.",
      acceptanceCriteria: [
        "Horizon failed job'lar va tag'lar imkoniyatlarini biladi",
        "Saqlash muddatlarini sozlaydi"
      ],
      prerequisites: [
        "46.8"
      ]
    },
    {
      id: "47.11",
      title: "Job Metrics",
      description: [
        "Horizon metrikalari: har job class va navbat uchun throughput (daqiqada), o'rtacha runtime, muvaffaqiyatsizliklar; tarixiy grafiklar. `horizon:snapshot` buyrug'i (scheduler'da har 5 daqiqada) metrikalar tarixini yig'adi — usiz grafiklar bo'sh bo'ladi.",
        "",
        "Qo'llanishi: qaysi job sekinlashdi (deploy'dan keyin?), qaysi navbat eng ko'p yuklangan, worker'lar soni yetarlimi. Uzoq muddatli tahlil uchun Prometheus exporter yoki APM.",
        "",
        "```php",
        "Schedule::command('horizon:snapshot')->everyFiveMinutes();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`horizon:snapshot` ni sozlang va bir hafta davomida eng sekin 5 ta job'ni metrikalardan aniqlang.",
      acceptanceCriteria: [
        "Horizon metrikalari va snapshot zaruratini biladi",
        "Metrikalardan optimallashtirish nomzodlarini topadi"
      ],
      prerequisites: [
        "47.1"
      ]
    },
    {
      id: "47.12",
      title: "Queue Wait Times",
      description: [
        "Wait time — job navbatga qo'yilgandan bajarila boshlaguncha o'tgan vaqt; foydalanuvchi tajribasiga eng ta'sirli metrika (masalan, OTP SMS 2 daqiqa kechiksa). Horizon har navbat uchun wait time'ni hisoblaydi va `waits` chegarasi oshganda `LongWaitDetected` event va bildirishnoma.",
        "",
        "Wait time oshishi sabablari: worker'lar yetishmaydi (maxProcesses), sekin job'lar navbatni egallagan, tashqi servis sekin, Redis muammosi. Yechim — sababga qarab: auto-scaling, navbatlarni ajratish, job optimallashtirish.",
        "",
        "```php",
        "'waits' => [",
        "    'redis:critical' => 15,",
        "    'redis:default'  => 60,",
        "    'redis:imports'  => 600,",
        "],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Har navbat uchun biznes talabiga mos wait chegaralarini sozlab, oshganda alert kelishini sinang.",
      acceptanceCriteria: [
        "Wait time ahamiyatini biladi",
        "Navbat bo'yicha chegaralarni belgilaydi"
      ],
      prerequisites: [
        "47.4"
      ]
    },
    {
      id: "47.13",
      title: "Throughput Monitoring",
      description: [
        "Throughput — vaqt birligida bajarilgan job'lar; backlog bilan birga tizim sog'lig'ini ko'rsatadi: backlog o'smoqda va throughput o'zgarmas — worker'lar yetmaydi; throughput keskin tushdi — job'lar sekinlashgan yoki xatolar. Horizon bildirishnomalari: `Horizon::routeMailNotificationsTo()`, `routeSlackNotificationsTo()` (long wait uchun).",
        "",
        "Markaziy monitoring: Prometheus (`horizon` exporter yoki o'z metrikalaringiz), Grafana dashboard: navbat uzunligi, wait time, throughput, failure rate — deploy annotatsiyalari bilan.",
        "",
        "```php",
        "// AppServiceProvider / HorizonServiceProvider",
        "Horizon::routeSlackNotificationsTo(config('services.slack.ops_webhook'), '#ops-alerts');",
        "Horizon::routeMailNotificationsTo('ops@example.uz');",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Horizon bildirishnomalarini sozlang va Grafana'da navbatlar dashboard'ini yarating.",
      acceptanceCriteria: [
        "Throughput va backlog'ni birga talqin qiladi",
        "Horizon bildirishnomalarini sozlaydi"
      ],
      prerequisites: [
        "47.11"
      ]
    },
    {
      id: "47.14",
      title: "Dashboard Access Control",
      description: [
        "Horizon dashboard'i job payload'larini (shaxsiy ma'lumot bo'lishi mumkin), xatolarni ko'rsatadi va job'larni qayta ishga tushirishga imkon beradi — production'da qat'iy himoya kerak. `HorizonServiceProvider::gate()` — `viewHorizon` gate'i (default: faqat `local` muhitda ochiq).",
        "",
        "Qo'shimcha: dashboard yo'lini o'zgartirish (`path`), middleware (`auth`, IP cheklovi, VPN), admin rollar, sezgir job'larni `ShouldBeEncrypted` bilan shifrlash (payload dashboard'da shifrlangan ko'rinadi).",
        "",
        "```php",
        "protected function gate(): void",
        "{",
        "    Gate::define('viewHorizon', fn (User $user) => $user->hasRole('devops') || $user->hasRole('admin'));",
        "}",
        "// config/horizon.php",
        "'middleware' => ['web', 'auth', 'verified'],",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Horizon'ga kirishni faqat devops/admin roliga cheklang va boshqa foydalanuvchi bilan 403 olishini testlang.",
      acceptanceCriteria: [
        "Horizon gate mexanizmini biladi",
        "Dashboard'dagi sezgir ma'lumot xavfini tushunadi"
      ],
      prerequisites: [
        "2.15"
      ]
    },
    {
      id: "47.15",
      title: "Production Deployment",
      description: [
        "Production'da Horizon: Supervisor/systemd ostida `php artisan horizon` (bitta jarayon — u o'zi supervisor'larni boshqaradi), `stopwaitsecs` eng uzun job timeout'idan katta, `horizon:snapshot` scheduler'da, Redis alohida va persistent, `HORIZON_PREFIX` muhitlar bo'yicha, log'lar.",
        "",
        "Deploy'da: `php artisan horizon:terminate` — master joriy job'lar tugagach chiqadi, jarayon menejeri yangi kod bilan qayta ishga tushiradi. Ko'p serverda — har birida.",
        "",
        "```ini",
        "[program:horizon]",
        "process_name=%(program_name)s",
        "command=php /var/www/current/artisan horizon",
        "user=www-data",
        "autostart=true",
        "autorestart=true",
        "stopwaitsecs=960",
        "redirect_stderr=true",
        "stdout_logfile=/var/www/shared/storage/logs/horizon.log",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Horizon'ni Supervisor ostida production uchun sozlang va deploy skriptiga `horizon:terminate` qo'shing.",
      acceptanceCriteria: [
        "Horizon production sozlamalarini biladi",
        "`stopwaitsecs` va uzun job'lar bog'liqligini tushunadi"
      ],
      prerequisites: [
        "38.17"
      ]
    },
    {
      id: "47.16",
      title: "Graceful Restarts",
      description: [
        "`horizon:terminate` — graceful: yangi job'larni olishni to'xtatadi, joriy job'larni tugatadi, keyin chiqadi. `horizon:pause` / `horizon:continue` — vaqtincha to'xtatish (masalan, DB texnik xizmati paytida); `horizon:pause-supervisor` — faqat bitta supervisor. `horizon:status`.",
        "",
        "SIGTERM (graceful) va SIGKILL (darhol) farqi: jarayon menejeri `stopwaitsecs` kutib, keyin SIGKILL yuboradi — shuning uchun bu qiymat yetarli bo'lishi kerak, aks holda uzun job yarim qoladi (idempotentlik muhimligi yana bir bor).",
        "",
        "```bash",
        "php artisan horizon:pause          # texnik xizmatdan oldin",
        "php artisan horizon:continue",
        "php artisan horizon:terminate      # deploy",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Texnik xizmat uchun pause/continue va deploy uchun terminate oqimlarini sinab, runbook yozing.",
      acceptanceCriteria: [
        "Horizon boshqaruv buyruqlarini biladi",
        "Graceful to'xtatish shartlarini ta'minlaydi"
      ],
      prerequisites: [
        "46.18"
      ]
    },
    {
      id: "47.17",
      title: "Troubleshooting Queue Backlogs",
      description: [
        "Backlog tashxisi: (1) Horizon'da qaysi navbat o'smoqda va wait time; (2) worker'lar soni maksimumdami (auto-scaling chegarasi); (3) qaysi job'lar sekin (runtime metrikasi) yoki xato beryapti; (4) tashqi bog'liqliklar (API, DB lock, Redis kechikishi); (5) yaqinda deploy yoki trafik o'zgarishi.",
        "",
        "Choralar: vaqtincha `maxProcesses` oshirish (resurs imkon bersa), sekin job'ni alohida navbat/supervisor'ga, timeout va tashqi API sekinligiga qarshi `ThrottlesExceptions`, muhim bo'lmagan job'larni vaqtincha pause qilish, job'ni optimallashtirish. Backlog'ni tez tozalash uchun qo'shimcha vaqtinchalik worker'lar.",
        "",
        "```bash",
        "php artisan horizon:status",
        "redis-cli -n 2 LLEN \"horizon:queues:default\"      # navbat uzunligi (prefiksga qarab)",
        "php artisan queue:monitor redis:default,redis:emails --max=100",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Sun'iy backlog (sekin tashqi API) yaratib, tashxis qadamlarini bajaring va runbook yozing.",
      acceptanceCriteria: [
        "Backlog sabablarini tizimli aniqlaydi",
        "Vaziyatga mos tezkor va uzoq muddatli choralarni biladi"
      ],
      prerequisites: [
        "47.12",
        "46.20"
      ]
    }
  ]
});
