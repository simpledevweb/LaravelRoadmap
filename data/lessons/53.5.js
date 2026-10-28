/* Chuqur dars: 53.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.5", {
  "lesson": [
    "### PHP-FPM sozlash",
    "(Asos: 1.25.) Worker soni va modeli RAM, CPU va yuklamaga mos bo'lishi shart.",
    "",
    "### pm rejimi",
    "- `dynamic` (keng tarqalgan): `pm.max_children`, `pm.start_servers`, `pm.min_spare_servers`, `pm.max_spare_servers`.",
    "- `static`: doim `max_children` ta (barqaror, yuqori yuklama, ko'p RAM).",
    "- `ondemand`: kerak bo'lganda (kam trafik).",
    "- `pm.max_requests` (500–1000): worker'ni qayta ishga tushirish (xotira sizishidan himoya).",
    "",
    "### max_children hisobi",
    "`max_children ≈ (RAM − OS − DB/Redis − boshqa) / o'rtacha worker RSS`. O'rtacha: `ps --no-headers -o rss -C php-fpm | awk '{s+=$1} END {print s/NR/1024 \" MB\"}'`. CPU: I/O-bound bo'lsa worker core'dan ko'p (2–4×).",
    "",
    "### Signal'lar",
    "- Log: `server reached pm.max_children setting` — worker yetmaydi.",
    "- `pm.status_path` (`/fpm-status`): `listen queue` > 0, `max children reached`, `slow requests`.",
    "- `request_slowlog_timeout=3s` + `slowlog` — sekin so'rovlar stack trace.",
    "- Nginx 502/504.",
    "",
    "### Boshqa parametrlar",
    "`request_terminate_timeout`, `listen.backlog`, `catch_workers_output`, `emergency_restart_threshold`. Nginx: `fastcgi_read_timeout`, `fastcgi_buffers`.",
    "",
    "### Optimallash tartibi",
    "1. So'rovlarni tezlashtiring (worker tez bo'shaydi): eng katta foyda.",
    "2. Keyin worker sonini RAM ruxsat berganicha oshiring.",
    "3. OPcache (53.6), Octane (53.21).",
    "4. Gorizontal masshtab (yana server).",
    "",
    "### Ehtiyot",
    "Worker'ni RAM'dan ko'p qilish swap → qulash; DB `max_connections` (worker × server) dan oshmasin.",
    "",
    "### Monitoring",
    "FPM status, RAM, CPU, so'rov navbati, p95."
  ],
  "examples": [
    {
      "title": "Pool",
      "lang": "ini",
      "code": [
        "; www.conf",
        "pm = dynamic",
        "pm.max_children = 60",
        "pm.start_servers = 15",
        "pm.min_spare_servers = 10",
        "pm.max_spare_servers = 25",
        "pm.max_requests = 800",
        "pm.status_path = /fpm-status",
        "request_slowlog_timeout = 3s",
        "slowlog = /var/log/php-fpm/slow.log"
      ]
    }
  ],
  "pitfalls": [
    "`max_children`ni RAM hisobisiz oshirish swap va OOM beradi.",
    "Worker × server soni DB `max_connections`dan oshib ketishi mumkin.",
    "Sekin so'rovlar worker'ni band qilib navbat hosil qiladi: avval so'rovni tezlashtiring.",
    "`pm.max_requests` bo'lmasa xotira sizishi worker'larni shishiradi."
  ]
});
