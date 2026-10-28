/* Chuqur dars: 54.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.20", {
  "lesson": [
    "### Kesh monitoringi",
    "Keshning **sog'lig'i va foydasi**ni doimiy kuzatish.",
    "",
    "### Metrikalar",
    "- **Hit/miss ratio** (54.19), kalit guruhlari bo'yicha.",
    "- **Latency:** `get/set` vaqti (p95/p99), tarmoq.",
    "- **Xotira:** `used_memory`, `maxmemory`, fragmentatsiya, **eviction** (`evicted_keys`), `expired_keys`.",
    "- **Kalitlar soni** (`DBSIZE`), big key'lar, TTL'siz kalitlar ulushi.",
    "- **Ulanishlar:** `connected_clients`, rad etilganlar.",
    "- **Replikatsiya/HA:** replika lag, failover.",
    "- **Xatolar:** timeout, ulanish xatolari, serializatsiya xatolari.",
    "- **Foyda:** DB QPS va javob vaqti (kesh bilan/siz).",
    "- **Stampede belgilari:** kalit tugash vaqtida DB so'rovlar sakrashi, `lock wait`.",
    "",
    "### Vositalar",
    "RedisInsight, Prometheus + redis_exporter + Grafana, Datadog, New Relic, Laravel **Pulse** (kesh hit/miss), Telescope (dev: `cache` yozuvlari), `redis-cli INFO/SLOWLOG/--bigkeys`.",
    "",
    "### Alertlar",
    "Hit ratio chegaradan past, xotira >80%, eviction o'sishi, latency p99 yuqori, Redis mavjud emas, DB QPS sakrashi.",
    "",
    "### Tahlil jarayoni",
    "1. Dashboard: ratio, eviction, latency.",
    "2. Anomaliya → qaysi kalit/endpoint (log/Pulse).",
    "3. Sabab (TTL, kalit, hajm, hodisa).",
    "4. Tuzatish va qayta o'lchash.",
    "",
    "### Laravel",
    "`Cache::` hodisalari: `CacheHit`, `CacheMissed`, `KeyWritten`, `KeyForgotten` — listener bilan hisoblash (`Event::listen(CacheHit::class, ...)`); Pulse `CacheInteractions`.",
    "",
    "### Loglash",
    "Faqat kerakli (har `get` ni loglamang): namunalash."
  ],
  "examples": [
    {
      "title": "Hit/miss hodisalari",
      "lang": "php",
      "code": [
        "use Illuminate\\Cache\\Events\\{CacheHit, CacheMissed};",
        "Event::listen(CacheHit::class, fn ($e) => Redis::hincrby('stat:cache', 'hit', 1));",
        "Event::listen(CacheMissed::class, fn ($e) => Redis::hincrby('stat:cache', 'miss', 1));"
      ]
    }
  ],
  "pitfalls": [
    "Har `get`ni loglash kesh o'zini sekinlashtiradi: namunalash.",
    "Faqat umumiy ko'rsatkichga qarash muammoli endpoint'ni yashiradi.",
    "Kesh monitoringisiz stampede/avalanche faqat DB yiqilganda ma'lum bo'ladi.",
    "Telescope'ni production'da yoqish kesh hodisalarini ortiqcha yozadi."
  ]
});
