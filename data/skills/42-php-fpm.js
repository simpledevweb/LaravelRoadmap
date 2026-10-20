/* 42 · PHP-FPM
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 42,
  slug: "php-fpm",
  title: "PHP-FPM",
  group: "infra",
  description: "PHP-FPM (FastCGI Process Manager) — PHP kodini production'da bajaruvchi jarayon menejeri. Uning sozlamalari ilovaning parallellik qobiliyati, xotira sarfi va barqarorligini bevosita belgilaydi. Senior dasturchi FPM pool'larini server resurslariga moslab sozlaydi, slow log va status sahifasi orqali muammolarni topadi va worker'lar tugashini oldini oladi.",
  subskills: [
    {
      id: "42.1",
      title: "PHP-FPM Architecture",
      description: [
        "FPM: bitta **master** jarayon (konfiguratsiya o'qish, worker'larni yaratish va boshqarish, signallar) va bir yoki bir nechta **pool** (har biri o'z foydalanuvchisi, socket'i, sozlamalari), har pool'da **worker** jarayonlar. Har worker bir vaqtda faqat **bitta** so'rovni bajaradi va so'rov tugagach keyingisini oladi.",
        "",
        "Shu sabab parallellik = band bo'lmagan worker'lar soni. Barcha worker band bo'lsa, so'rovlar socket navbatida (`listen.backlog`) kutadi → kechikish → 504. Worker'lar `pm.max_requests` dan keyin qayta yaratiladi (memory leak'larga qarshi).",
        "",
        "```bash",
        "ps -ef --forest | grep php-fpm",
        "# root   php-fpm: master process (/etc/php/8.3/fpm/php-fpm.conf)",
        "# www-data  \\_ php-fpm: pool www",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM jarayonlar daraxtini kuzatib, bir vaqtda ko'p sekin so'rov yuborganda worker'lar tugashini kuzating.",
      acceptanceCriteria: [
        "Master/pool/worker modelini biladi",
        "\"Bir worker — bir so'rov\" oqibatini tushunadi"
      ],
      prerequisites: [
        "1.25"
      ]
    },
    {
      id: "42.2",
      title: "Worker Processes",
      description: [
        "Worker — PHP interpretatori bilan to'liq jarayon: har biri o'z xotirasiga ega (odatda 30–100+ MB Laravel uchun — kod, OPcache umumiy, lekin har so'rov ma'lumotlari alohida). Worker so'rovlar orasida holatni saqlamaydi (Octane'dan farqli) — har so'rov toza boshlanadi.",
        "",
        "Worker xotirasini o'lchash: `ps -o rss`, FPM status (`full`), `memory_get_peak_usage()`. Xotira oqishi bo'lsa — `pm.max_requests` bilan davriy qayta yaratish. Worker CPU'ni ko'p vaqt I/O kutishda (DB, Redis, HTTP) bo'sh turadi — shuning uchun worker'lar soni CPU yadrolaridan ko'p bo'lishi mumkin.",
        "",
        "```bash",
        "ps -o pid,rss,cmd -C php-fpm8.3 | awk 'NR>1 {s+=$2; n++} END {print n \" worker, o'rtacha \" s/n/1024 \" MB\"}'",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production yuklamasida worker'ning o'rtacha va maksimal xotirasini o'lchang.",
      acceptanceCriteria: [
        "Worker xotira modelini biladi",
        "Worker xotirasini o'lchay oladi"
      ],
      prerequisites: [
        "42.1"
      ]
    },
    {
      id: "42.3",
      title: "Process Manager Modes",
      description: [
        "`pm` rejimlari: **static** — doimiy `pm.max_children` worker (bashorat qilinadigan, tez; maxsus serverlar uchun eng yaxshi), **dynamic** — `start_servers`, `min/max_spare_servers` oralig'ida o'zgaradi (umumiy serverlar uchun), **ondemand** — so'rov kelganda yaratiladi, `pm.process_idle_timeout` dan keyin o'chadi (kam trafikli, ko'p pool'li serverlar uchun; birinchi so'rov sekinroq).",
        "",
        "Yuqori yuklamali maxsus app server — odatda `static` (worker yaratish xarajati yo'q). Konteynerlarda ham `static` keng tarqalgan (resurslar limit bilan aniq).",
        "",
        "```ini",
        "; /etc/php/8.3/fpm/pool.d/www.conf",
        "pm = static",
        "pm.max_children = 40",
        "pm.max_requests = 1000",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir xil yuklamada static va dynamic rejimlarni solishtirib, server uchun mosini tanlang.",
      acceptanceCriteria: [
        "Uch rejimning farqi va qo'llanishini biladi",
        "Server turiga mos rejimni tanlaydi"
      ],
      prerequisites: [
        "42.1"
      ]
    },
    {
      id: "42.4",
      title: "`pm.max_children`",
      description: [
        "`pm.max_children` — pool'dagi maksimal worker soni = maksimal parallel PHP so'rovlar. Hisoblash: `(Umumiy RAM − boshqa servislar (MySQL, Redis, OS) − zaxira) / o'rtacha worker xotirasi`. Masalan: 8 GB, boshqalar 2 GB, zaxira 1 GB, worker 70 MB → ~70.",
        "",
        "Juda kichik — so'rovlar navbatda kutadi (504, \"max_children reached\" log'da); juda katta — xotira tugaydi, swap, OOM killer. DB ulanishlari ham shu songa bog'liq (har worker o'z ulanishi).",
        "",
        "```ini",
        "pm.max_children = 70",
        "```",
        "```bash",
        "grep \"max_children\" /var/log/php8.3-fpm.log    # \"server reached pm.max_children setting\"",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Server RAM va worker xotirasiga asoslanib `pm.max_children` ni hisoblang va load test bilan tasdiqlang.",
      acceptanceCriteria: [
        "`max_children` formulasini qo'llaydi",
        "Juda kichik va katta qiymat oqibatlarini biladi"
      ],
      prerequisites: [
        "42.2"
      ]
    },
    {
      id: "42.5",
      title: "`pm.start_servers`",
      description: [
        "`pm.start_servers` (faqat `dynamic` rejimda) — FPM ishga tushganda yaratiladigan worker'lar soni. Default formula: `min_spare_servers + (max_spare_servers − min_spare_servers) / 2`. Juda kichik — restart'dan keyin birinchi trafik to'lqinida worker yaratish kechikishi; juda katta — keraksiz xotira.",
        "",
        "Odatiy trafikka yaqin qiymat tanlanadi. Deploy'dagi reload paytida ham shu qiymat qo'llanadi — reload'dan keyingi \"sovuq start\" kechikishiga ta'sir qiladi.",
        "",
        "```ini",
        "pm = dynamic",
        "pm.max_children = 50",
        "pm.start_servers = 10",
        "pm.min_spare_servers = 5",
        "pm.max_spare_servers = 15",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Restart'dan keyingi birinchi daqiqadagi kechikishni o'lchab, `start_servers` ni moslang.",
      acceptanceCriteria: [
        "`start_servers` vazifasini biladi",
        "Uni odatiy yuklamaga moslaydi"
      ],
      prerequisites: [
        "42.3"
      ]
    },
    {
      id: "42.6",
      title: "`pm.min_spare_servers`",
      description: [
        "`pm.min_spare_servers` (dynamic) — kamida shuncha bo'sh (idle) worker bo'lishi kerak; kam bo'lsa, master yangilarini yaratadi (sekundiga eksponensial ko'paytirib — 1, 2, 4, 8... `pm.max_spawn_rate` gacha). Bu to'satdan kelgan trafik uchun \"zaxira\".",
        "",
        "Juda kichik — trafik portlashida worker yaratish kechikadi; juda katta — doimiy keraksiz xotira. Odatda trafik portlashlarining tipik hajmiga mos.",
        "",
        "```ini",
        "pm.min_spare_servers = 8",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Trafik portlashi stsenariysini load test bilan simulyatsiya qilib, `min_spare_servers` ta'sirini kuzating.",
      acceptanceCriteria: [
        "Bo'sh worker zaxirasi tushunchasini biladi",
        "Portlashlar uchun zaxirani sozlaydi"
      ],
      prerequisites: [
        "42.5"
      ]
    },
    {
      id: "42.7",
      title: "`pm.max_spare_servers`",
      description: [
        "`pm.max_spare_servers` (dynamic) — bo'sh worker'lar ko'pi bilan shuncha; ortiqchasini master o'ldiradi (xotirani bo'shatadi). `min_spare` < `max_spare` < `max_children`.",
        "",
        "Juda kichik `max_spare` — trafik tebranganda worker'lar tez-tez yaratilib o'ldiriladi (churn — CPU va kechikish). Juda katta — `static` ga yaqinlashadi. Agar server faqat shu ilova uchun bo'lsa, `static` rejim bu sozlamalarni keraksiz qiladi.",
        "",
        "```ini",
        "pm.max_spare_servers = 20",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "FPM status sahifasida worker yaratish/o'chirish chastotasini kuzatib, spare sozlamalarini optimallashtiring.",
      acceptanceCriteria: [
        "Spare chegaralari o'rtasidagi muvozanatni tushunadi",
        "Worker churn'ni aniqlaydi"
      ],
      prerequisites: [
        "42.6"
      ]
    },
    {
      id: "42.8",
      title: "Request Timeouts",
      description: [
        "FPM `request_terminate_timeout` — so'rov shu vaqtdan uzoq bajarilsa, worker majburan o'ldiriladi (PHP `max_execution_time` CLI va ba'zi holatlarda — masalan, I/O kutishda — ishlamasligi mumkin, FPM timeout esa ishonchli). Nginx `fastcgi_read_timeout` bilan muvofiq bo'lishi kerak (taxminan teng yoki Nginx biroz katta).",
        "",
        "Uzoq ishlar so'rovda emas, navbatda. Timeout tufayli o'ldirilgan so'rov tranzaksiyani yarim qoldirishi mumkin — DB tranzaksiyalari baribir rollback bo'ladi, lekin tashqi yon ta'sirlar qolishi mumkin.",
        "",
        "```ini",
        "request_terminate_timeout = 60s",
        "```",
        "```php",
        "// php.ini",
        "max_execution_time = 60",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM, PHP va Nginx timeout'larini muvofiqlashtiring va uzoq so'rov qanday to'xtatilishini sinang.",
      acceptanceCriteria: [
        "`request_terminate_timeout` va `max_execution_time` farqini biladi",
        "Timeout'larni qatlamlar bo'yicha moslaydi"
      ],
      prerequisites: [
        "41.12"
      ]
    },
    {
      id: "42.9",
      title: "Slow Logs",
      description: [
        "FPM slow log — `request_slowlog_timeout` dan uzoq davom etgan so'rovlar uchun PHP stack trace'ni yozadi: qaysi funksiya, qaysi qatorda \"qotib qolgan\" (DB so'rovi, `curl_exec`, `sleep`, fayl I/O). Production'da sekinlik sabablarini topishning eng arzon vositasi.",
        "",
        "Odatiy qiymat 2–5 soniya. Log'ni muntazam tahlil qiling: eng ko'p uchraydigan stack'lar — optimallashtirish nomzodlari. APM (Sentry, New Relic) bilan birga to'liqroq rasm.",
        "",
        "```ini",
        "request_slowlog_timeout = 3s",
        "slowlog = /var/log/php8.3-fpm-slow.log",
        "```",
        "```bash",
        "grep -A3 \"script_filename\" /var/log/php8.3-fpm-slow.log | grep -oE \"\\w+\\(\\) /var/www[^:]+:[0-9]+\" | sort | uniq -c | sort -rn | head",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Slow log'ni yoqib, bir kunlik ma'lumotdan eng ko'p uchragan sekin joylarni aniqlang.",
      acceptanceCriteria: [
        "Slow log sozlamalarini biladi",
        "Stack trace'lardan sekinlik sababini topadi"
      ],
      prerequisites: [
        "42.1"
      ]
    },
    {
      id: "42.10",
      title: "Status Page",
      description: [
        "FPM status sahifasi (`pm.status_path = /fpm-status`) — real-vaqt holat: `accepted conn`, `listen queue` (navbatdagi so'rovlar — 0 dan katta bo'lsa worker'lar yetishmaydi!), `max listen queue`, `idle processes`, `active processes`, `max active processes`, `max children reached` (counter), `slow requests`. `?full` — har worker: holat, joriy so'rov, davomiylik, xotira. `ping.path` — liveness tekshiruvi.",
        "",
        "Faqat ichki manzillarga ochish (Nginx `allow 127.0.0.1`). Prometheus `php-fpm_exporter` bilan monitoring va alert'lar.",
        "",
        "```bash",
        "curl -s \"http://127.0.0.1/fpm-status?json\" | jq '{active: .\"active processes\", idle: .\"idle processes\", queue: .\"listen queue\", maxed: .\"max children reached\"}'",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM status'ni yoqing, Prometheus exporter bilan `listen queue` va `max children reached` uchun alert sozlang.",
      acceptanceCriteria: [
        "Status metrikalarini talqin qiladi",
        "`listen queue` ning ahamiyatini biladi"
      ],
      prerequisites: [
        "41.7"
      ]
    },
    {
      id: "42.11",
      title: "Unix Sockets vs TCP",
      description: [
        "**Unix socket** (`listen = /run/php/php8.3-fpm.sock`) — bitta xostda Nginx va FPM uchun tezroq (tarmoq stekisiz), port band qilmaydi; ruxsatlar kerak. **TCP** (`listen = 127.0.0.1:9000` yoki `0.0.0.0:9000`) — turli xost/konteynerlar orasida; tashqariga ochiq bo'lmasligi kerak (`listen.allowed_clients`, firewall) — ochiq FPM porti masofadan kod bajarish xavfi!",
        "",
        "Juda yuqori yuklamada socket'ning `listen.backlog` limiti va `somaxconn` yadro parametri muhim bo'ladi.",
        "",
        "```ini",
        "; bitta xost",
        "listen = /run/php/php8.3-fpm.sock",
        "; konteynerlar",
        "listen = 9000",
        "listen.allowed_clients = 127.0.0.1,10.0.1.10",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bitta xostda socket va TCP ulanishni benchmark bilan solishtiring va FPM porti tashqaridan yopiqligini tekshiring.",
      acceptanceCriteria: [
        "Socket va TCP afzalliklarini biladi",
        "Ochiq FPM portining xavfini tushunadi"
      ],
      prerequisites: [
        "41.7"
      ]
    },
    {
      id: "42.12",
      title: "Socket Permissions",
      description: [
        "Unix socket ruxsatlari: `listen.owner`, `listen.group`, `listen.mode` (odatda `0660`) — Nginx worker foydalanuvchisi (`www-data` yoki `nginx`) socket'ga yoza olishi kerak. Noto'g'ri sozlama — Nginx error log'da `connect() to unix:/run/php/... failed (13: Permission denied)` va 502.",
        "",
        "`0666` qo'yish \"ishlaydi\", lekin har qanday lokal foydalanuvchi FPM'ga so'rov yubora oladi — xavfsiz emas. Bir nechta pool turli foydalanuvchilar bilan — alohida socket va mos guruh.",
        "",
        "```ini",
        "listen = /run/php/php8.3-fpm.sock",
        "listen.owner = www-data",
        "listen.group = www-data",
        "listen.mode = 0660",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Socket ruxsatini ataylab buzib 502 ni yarating, log'dan sababni toping va xavfsiz tuzating.",
      acceptanceCriteria: [
        "Socket ruxsat parametrlarini biladi",
        "`0666` ning xavfini tushunadi"
      ],
      prerequisites: [
        "42.11"
      ]
    },
    {
      id: "42.13",
      title: "PHP Configuration Pools",
      description: [
        "Pool'lar — bitta FPM'da izolyatsiyalangan guruhlar: har biri o'z foydalanuvchisi (fayl tizimi izolyatsiyasi), socket'i, `pm` sozlamalari va `php_admin_value` lari bilan. Qo'llanish: bir serverda bir nechta ilova; bir ilovada turli yuklamalar (masalan, og'ir admin hisobotlari alohida pool'da — asosiy API'ni bo'g'masligi uchun).",
        "",
        "`php_admin_value` (ilova o'zgartira olmaydi) va `php_value` (`ini_set` bilan o'zgartirish mumkin) farqi. `env[]` — pool muhit o'zgaruvchilari.",
        "",
        "```ini",
        "; /etc/php/8.3/fpm/pool.d/admin.conf",
        "[admin]",
        "user = www-data",
        "listen = /run/php/admin.sock",
        "pm = ondemand",
        "pm.max_children = 5",
        "php_admin_value[memory_limit] = 512M",
        "php_admin_value[max_execution_time] = 300",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Og'ir admin hisobotlari uchun alohida pool yarating va Nginx'da `/admin` yo'lini unga yo'naltiring.",
      acceptanceCriteria: [
        "Pool'lar izolyatsiyasining foydasini biladi",
        "`php_admin_value` va `php_value` farqini tushunadi"
      ],
      prerequisites: [
        "42.1"
      ]
    },
    {
      id: "42.14",
      title: "Resource Consumption",
      description: [
        "FPM resurs sarfi: xotira (`max_children × worker RSS`), CPU (PHP bajarish — OPcache va JIT ta'siri), ulanishlar (har worker DB/Redis ulanishi), fayl deskriptorlari. Monitoring: worker RSS trendi (o'sib borsa — leak), CPU per request, ochiq ulanishlar.",
        "",
        "Optimallashtirish: OPcache (kompilyatsiya yo'q), `pm.max_requests` (leak'larni tozalash), `memory_limit` ni realistik qilish (juda katta — bitta noto'g'ri so'rov serverni to'ldiradi), og'ir ishlarni navbatga, Laravel optimallashtirishlari (`config:cache`, `route:cache`).",
        "",
        "```ini",
        "pm.max_requests = 1000",
        "php_admin_value[memory_limit] = 256M",
        "```",
        "```bash",
        "watch -n 2 'ps -o rss= -C php-fpm8.3 | awk \"{s+=\\$1} END {print s/1024 \\\" MB\\\"}\"'",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM pool'ining umumiy xotira sarfini bir soat kuzatib, leak bor-yo'qligini va `max_requests` ta'sirini aniqlang.",
      acceptanceCriteria: [
        "FPM resurs sarfi omillarini biladi",
        "Leak'larni `max_requests` bilan nazorat qiladi"
      ],
      prerequisites: [
        "42.2"
      ]
    },
    {
      id: "42.15",
      title: "OPcache",
      description: [
        "OPcache FPM uchun eng muhim performance sozlamasi: kompilyatsiya qilingan opcode'lar shared memory'da barcha worker'lar uchun umumiy. Production: `opcache.enable=1`, `opcache.memory_consumption` (Laravel uchun 128–256 MB), `opcache.max_accelerated_files` (fayllar sonidan katta — `vendor` bilan 20000+), `opcache.interned_strings_buffer` (16–32), `opcache.validate_timestamps=0` (fayl o'zgarishini tekshirmaslik — deploy'dan keyin FPM reload shart!).",
        "",
        "`opcache.preload` — framework class'larini oldindan yuklash (kichik qo'shimcha foyda). OPcache to'lganini status orqali kuzating (`opcache_get_status()` — `cache_full`, hit rate).",
        "",
        "```ini",
        "opcache.enable=1",
        "opcache.memory_consumption=256",
        "opcache.interned_strings_buffer=32",
        "opcache.max_accelerated_files=30000",
        "opcache.validate_timestamps=0",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "OPcache'ni production uchun sozlang, hit rate va to'lganlikni monitoring qiling, deploy'da reload qo'shing.",
      acceptanceCriteria: [
        "Asosiy OPcache parametrlarini biladi",
        "`validate_timestamps=0` va deploy bog'liqligini tushunadi"
      ],
      prerequisites: [
        "1.25"
      ]
    },
    {
      id: "42.16",
      title: "Nginx Integration",
      description: [
        "Nginx ↔ FPM integratsiya checklist'i: `fastcgi_pass` socket/port FPM `listen` bilan mos, socket ruxsatlari, `SCRIPT_FILENAME` = `$realpath_root$fastcgi_script_name`, faqat `index.php` bajariladi, timeout'lar muvofiq (Nginx `fastcgi_read_timeout` ≈ FPM `request_terminate_timeout`), bufferlar yetarli, status sahifasi faqat ichki.",
        "",
        "Symlink deploy'da: `$realpath_root` + OPcache reload — aks holda eski reliz kodi bajarilishi mumkin. Konteynerlarda: Nginx va FPM bir xil kod yo'liga ega bo'lishi (yoki faqat FPM'da kod, Nginx'da statik fayllar).",
        "",
        "```nginx",
        "location = /index.php {",
        "    fastcgi_pass unix:/run/php/php8.3-fpm.sock;",
        "    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;",
        "    include fastcgi_params;",
        "    fastcgi_read_timeout 60s;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Nginx va FPM konfiguratsiyalarini checklist bo'yicha audit qilib, nomuvofiqliklarni tuzating.",
      acceptanceCriteria: [
        "Integratsiya nuqtalarini to'liq biladi",
        "Symlink deploy bilan bog'liq tuzoqlarni oldini oladi"
      ],
      prerequisites: [
        "41.6"
      ]
    },
    {
      id: "42.17",
      title: "Worker Saturation Diagnosis",
      description: [
        "Worker'lar to'yinishi — barcha worker band, yangi so'rovlar navbatda: belgilari — kechikish keskin oshadi, 504'lar, FPM log'da \"server reached pm.max_children\", status'da `listen queue` > 0, `active processes` = `max_children`.",
        "",
        "Sabablar: sekin tashqi chaqiruvlar (API timeout'siz), DB lock yoki sekin so'rovlar, to'satdan trafik, bitta og'ir endpoint barcha worker'larni band qilgan, `max_children` juda kichik. Yechim — avval sababni topish (slow log, status `?full` da qaysi URL'lar band), keyin: timeout'lar, keshlash, navbatga ko'chirish, alohida pool, va faqat oxirida `max_children` ni oshirish (xotira imkon bersa).",
        "",
        "```bash",
        "curl -s \"http://127.0.0.1/fpm-status?full&json\" | jq -r '.processes[] | select(.state==\"Running\") | \"\\(.[\"request duration\"]/1000000|floor)s \\(.[\"request uri\"])\"' | sort -rn | head",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tashqi API sekinlashganda worker'lar to'yinishini simulyatsiya qiling, `?full` status bilan sababni toping va timeout bilan tuzating.",
      acceptanceCriteria: [
        "To'yinish belgilarini taniydi",
        "`max_children` ni oshirishdan oldin sababni topadi"
      ],
      prerequisites: [
        "42.10",
        "42.9"
      ]
    },
    {
      id: "42.18",
      title: "Performance Tuning",
      description: [
        "FPM tuning jarayoni: (1) bazaviy o'lchov (p50/p95, RPS, xotira, CPU) load test bilan; (2) OPcache to'g'ri sozlangan; (3) worker xotirasini o'lchab `max_children` ni hisoblash; (4) `pm` rejimini tanlash (maxsus server — static); (5) `max_requests` (leak'lar); (6) timeout'lar va slow log; (7) qayta o'lchash.",
        "",
        "FPM sozlamalari ilova muammolarini hal qilmaydi — N+1, keshsiz og'ir so'rovlar, sinxron tashqi chaqiruvlar birinchi navbatda. Juda yuqori throughput kerak bo'lsa — Laravel Octane (Swoole/RoadRunner/FrankenPHP) — har so'rovda bootstrap yo'q, lekin holat oqishi xavfi.",
        "",
        "```bash",
        "k6 run --vus 100 --duration 2m load.js     # oldin/keyin solishtirish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "FPM sozlamalarini bosqichma-bosqich optimallashtirib, har qadamdan keyin load test natijalarini jadvalga yozing.",
      acceptanceCriteria: [
        "Tuning'ni o'lchovlar bilan bosqichma-bosqich bajaradi",
        "FPM va ilova darajasidagi optimallashtirishni ajratadi"
      ],
      prerequisites: [
        "42.17",
        "53.17"
      ]
    }
  ]
});
