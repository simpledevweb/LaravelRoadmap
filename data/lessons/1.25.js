/* Chuqur dars: 1.25. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.25", {
  "lesson": [
    "### Arxitektura",
    "Nginx/Apache → PHP-FPM (FastCGI) → worker jarayonlari. Master jarayon pool'lardagi worker'larni boshqaradi. Har worker bir vaqtda bitta so'rovga xizmat qiladi.",
    "",
    "### pm rejimlari",
    "- `static`: `pm.max_children` ta doim tayyor: barqaror, ko'p RAM.",
    "- `dynamic`: `min_spare/max_spare` oralig'ida o'zgaradi (eng keng tarqalgan).",
    "- `ondemand`: so'rov kelganda yaratiladi: kam trafik uchun, birinchi so'rov sekinroq.",
    "",
    "### pm.max_children hisobi",
    "`max_children ≈ (RAM - tizim - DB va boshqa servislar) / o'rtacha worker xotirasi`. Worker xotirasini real so'rovlar bo'yicha o'lchang (`ps -ylC php-fpm --sort:rss`). Juda katta qiymat swap va OOM beradi, juda kichigi `server reached pm.max_children` xatosi va navbat beradi. `pm.max_requests` sizib chiqayotgan xotirani qayta ishga tushirish bilan yengillatadi. Slowlog: `request_slowlog_timeout`.",
    "",
    "### OPcache",
    "Kompilyatsiya qilingan opcode'larni shared memory'da saqlaydi. Asosiy sozlamalar: `opcache.enable`, `memory_consumption` (default 128 MB), `interned_strings_buffer`, `max_accelerated_files`, `validate_timestamps` (prod'da 0 + deploydan keyin reset), `revalidate_freq`. Status: `opcache_get_status()`; to'lib qolsa (`oom_restarts`) hajm oshiriladi.",
    "",
    "### Preloading",
    "`opcache.preload` server start'da ko'rsatilgan fayllarni xotiraga bir marta yuklaydi va ular har so'rovda tayyor turadi. Foyda bor, lekin fayl o'zgarsa FPM qayta ishga tushirilishi kerak; ko'pchilik ilovada foyda kichik.",
    "",
    "### JIT",
    "`opcache.jit` (8.0+; default `disable`), tracing rejimi. JIT CPU-bound kod (matematika, tasvir) uchun foydali; I/O ga bog'liq oddiy web ilovada (DB, tarmoq kutish) deyarli foyda bermaydi va nosozlik xavfini oshiradi. Laravel uchun odatda o'chiq qoldiriladi.",
    "",
    "### Diagnostika",
    "`php-fpm -t`, `systemctl status php8.x-fpm`, `/status` sahifasi (`pm.status_path`), loglar.",
    "",
    "### PHP-FPM tafsiloti",
    "- **Master + worker'lar**, pool'lar (`/etc/php/8.4/fpm/pool.d/*.conf`). Har pool: o'z foydalanuvchi (`user`/`group`), socket (`listen = /run/php/php8.4-fpm.sock` yoki `127.0.0.1:9000`), `pm.*`, ini override (`php_admin_value`).",
    "- **Nginx** `fastcgi_pass unix:...; fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;` (symlink deploy uchun `$realpath_root` OPcache bilan mos).",
    "- Statuslar: `pm.status_path`, `ping.path`; `systemctl reload php8.4-fpm` (graceful) va `restart`.",
    "- `request_terminate_timeout`, `max_execution_time` bilan farqi: ikkinchisi PHP, birinchisi FPM tomonidan.",
    "- `catch_workers_output = yes`, `slowlog`, `access.log`, `clear_env = no` (env o'zgaruvchilar uchun).",
    "- `listen.backlog` va Nginx `fastcgi_read_timeout`: 502/504 manbalari.",
    "",
    "### Worker sonini hisoblash",
    "`max_children = (jami RAM − OS − DB/Redis − boshqa) / o'rtacha worker RSS`. CPU bo'yicha ham: I/O ko'p bo'lsa worker soni core'dan ko'p; CPU-bound bo'lsa core'ga yaqin. `pm = dynamic` qiymatlari: `start_servers`, `min_spare`, `max_spare` ~ `max_children` 1/4–1/2. Navbat `listen queue` > 0 va \"reached max_children\" logda — signal.",
    "",
    "### OPcache tafsiloti",
    "- Compile natijasini (opcode) shared memory'da saqlaydi; birinchi so'rov kompilyatsiya qiladi, keyingilari kesh.",
    "- Asosiy INI: `opcache.enable`, `enable_cli`, `memory_consumption` (128), `interned_strings_buffer` (8), `max_accelerated_files` (10000, haqiqiy fayl sonidan katta), `validate_timestamps`, `revalidate_freq` (2s), `save_comments` (Doctrine annotations va ba'zi vositalar uchun 1), `file_cache`, `optimization_level`.",
    "- Deploy: `validate_timestamps=0` + FPM reload yoki `opcache_reset()`/`opcache_invalidate($f)`. Symlink-based deploy'da `realpath_cache_ttl` va `$realpath_root`.",
    "- Xotira to'lsa: `opcache_get_status()` → `cache_full`, `oom_restarts`, `hash_restarts`.",
    "- `opcache.preload`: boshlanishda skriptdagi `opcache_compile_file()` / `require_once` klasslarni xotirada tayyor tutadi; foyda kichik (~5–10%), faylni o'zgartirsangiz FPM restart; Laravel'da odatda ishlatilmaydi.",
    "",
    "### JIT",
    "- INI: `opcache.jit_buffer_size` (masalan `100M`) va `opcache.jit`: default `disable` (8.4), yoqish uchun `tracing` yoki `function`.",
    "- CPU-bound (matematika, tasvir, parser) 2–3x tez; I/O ga bog'liq web ilovada deyarli farq yo'q (Laravel, DB kutish).",
    "- Xatolar/crash xavfi kamayib bormoqda, lekin production'da benchmark qiling.",
    "",
    "### Boshqa tezlatish",
    "`realpath_cache`, `composer dump-autoload -o`, `php artisan optimize` (config/route/view/event cache), APCu, Redis kesh, queue, N+1 so'rovlarni yo'q qilish — odatda JIT dan ko'proq foyda.",
    "",
    "### Diagnostika",
    "`php-fpm -tt`, `php-fpm8.4 -t`, loglar (`/var/log/php8.4-fpm.log`), `ss -lx`, `htop`, `opcache-gui`, `fpm-status`, `strace -p`, `Blackfire/Tideways/Xdebug` profilerlari."
  ],
  "examples": [
    {
      "title": "FPM pool",
      "lang": "ini",
      "code": [
        "; www.conf",
        "pm = dynamic",
        "pm.max_children = 40",
        "pm.start_servers = 8",
        "pm.min_spare_servers = 4",
        "pm.max_spare_servers = 12",
        "pm.max_requests = 500",
        "pm.status_path = /fpm-status",
        "request_slowlog_timeout = 5s"
      ]
    },
    {
      "title": "OPcache production",
      "lang": "ini",
      "code": [
        "opcache.enable=1",
        "opcache.memory_consumption=256",
        "opcache.interned_strings_buffer=16",
        "opcache.max_accelerated_files=20000",
        "opcache.validate_timestamps=0",
        "opcache.jit=disable"
      ],
      "note": "`validate_timestamps=0` bilan deployda `opcache_reset()` yoki FPM reload shart."
    },
    {
      "title": "Hisoblash namunasi",
      "lang": "bash",
      "code": [
        "# o'rtacha worker ~ 60 MB, serverda 8 GB, 3 GB tizim+DB ga",
        "echo $(( (8192 - 3072) / 60 ))   # ~85 -> max_children 70-80",
        "ps --no-headers -o rss -C php-fpm8.4 | awk '{s+=$1} END {print s/NR/1024 \" MB\"}'"
      ]
    },
    {
      "title": "Nginx -> FPM",
      "lang": "nginx",
      "code": [
        "location ~ \\.php$ {",
        "    include fastcgi_params;",
        "    fastcgi_pass unix:/run/php/php8.4-fpm.sock;",
        "    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;",
        "    fastcgi_read_timeout 60s;",
        "}"
      ]
    },
    {
      "title": "OPcache status",
      "lang": "php",
      "code": [
        "$s = opcache_get_status(false);",
        "printf(\"hit=%.2f%% mem=%dMB free=%dMB cache_full=%s\\n\",",
        "  $s['opcache_statistics']['opcache_hit_rate'],",
        "  $s['memory_usage']['used_memory'] / 1048576,",
        "  $s['memory_usage']['free_memory'] / 1048576,",
        "  var_export($s['cache_full'], true));"
      ]
    }
  ],
  "pitfalls": [
    "`validate_timestamps=0` bo'lsa deploydan keyin kod eskicha ishlayveradi: reload yoki `opcache_reset()`ni unutmang.",
    "`pm.max_children` ni RAM hisobsiz oshirish swap/OOM killer'ga olib keladi.",
    "JIT ni 'tezlashtiradi' deb yoqish: I/O-ga bog'liq Laravel'da foyda yo'q, xatar bor.",
    "CLI uchun OPcache default o'chiq (`opcache.enable_cli=0`): artisan tezligini web bilan taqqoslamang.",
    "`$document_root$fastcgi_script_name` symlink deployda eski release OPcache'ini ishlatishi mumkin: `$realpath_root`.",
    "`max_accelerated_files` fayl sonidan kichik bo'lsa OPcache ba'zi fayllarni keshlamaydi.",
    "JIT yoqilgan, lekin `opcache.jit_buffer_size=0` bo'lsa ishlamaydi.",
    "`pm.max_children` ni CPU sonidan emas, RAM dan hisoblang."
  ]
});
