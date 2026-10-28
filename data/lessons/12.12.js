/* Chuqur dars: 12.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.12", {
  "lesson": [
    "### Redis'da sessiya",
    "`SESSION_DRIVER=redis`: sessiya ma'lumoti Redis'da (kalit `laravel_session:{id}`, TTL = `SESSION_LIFETIME`). Ko'p serverda **umumiy** sessiya (load balancer ortida sticky session shart emas).",
    "",
    "### Foydasi",
    "- **Tez** (xotira), TTL avtomatik tozalaydi (fayl GC'siz).",
    "- Bir nechta server/konteyner orasida bo'lishiladi.",
    "- Deploy'da sessiya saqlanadi.",
    "- Fayl tizimiga bog'liq emas (Docker/K8s).",
    "",
    "### Konfiguratsiya",
    "`.env`: `SESSION_DRIVER=redis`, `SESSION_CONNECTION=session` (alohida Redis ulanishi/DB), `SESSION_LIFETIME=120`. `config/database.php` → `redis.session`.",
    "",
    "### Xavf: yo'qotish",
    "Redis o'chsa/`FLUSHALL`/eviction/restartda (persistence yo'q) **hamma foydalanuvchi chiqib ketadi**. Yechim:",
    "- Sessiya uchun **alohida** Redis (yoki DB raqami): kesh `FLUSH` sessiyani o'chirmasin.",
    "- `noeviction` (yoki volatile-lru), `maxmemory` yetarli.",
    "- AOF/replikatsiya (muhim bo'lsa).",
    "- Eviction'dan himoya.",
    "",
    "### Xavfsizlik",
    "Redis'ga tarmoq cheklovi (parol, TLS, firewall), sessiya ID — xavfsiz cookie.",
    "",
    "### Hajm",
    "Sessiyada katta ma'lumot (savat, obyekt) saqlamang: kichik; Redis xotirasi = foydalanuvchilar × sessiya hajmi.",
    "",
    "### Alternativlar",
    "`database` (default L11, sodda), `cookie`, `memcached`, `dynamodb`.",
    "",
    "### Laravel",
    "`session()->put()`, `Session::`; redis `predis`/`phpredis`; Horizon bilan bir Redis'da bo'lmasin."
  ],
  "examples": [
    {
      "title": "Alohida ulanish",
      "lang": "php",
      "code": [
        "// config/database.php",
        "'redis' => [",
        "    'default' => ['host' => env('REDIS_HOST'), 'database' => 0],",
        "    'cache'   => ['host' => env('REDIS_HOST'), 'database' => 1],",
        "    'session' => ['host' => env('REDIS_HOST'), 'database' => 2],",
        "],",
        "// .env: SESSION_DRIVER=redis, SESSION_CONNECTION=session, CACHE_STORE=redis"
      ]
    }
  ],
  "pitfalls": [
    "Sessiya va kesh bitta Redis/DB'da bo'lsa `cache:clear`/FLUSH sessiyani o'chiradi.",
    "Eviction yoqilgan Redis sessiyani istalgan vaqt o'chirib yuborishi mumkin.",
    "Sessiyada katta ma'lumot saqlash Redis xotirasini to'ldiradi.",
    "Himoyasiz Redis (parol/firewall yo'q) sessiya o'g'irlanishiga olib keladi."
  ]
});
