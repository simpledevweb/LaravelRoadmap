/* Chuqur dars: 53.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.10", {
  "lesson": [
    "### Redis bilan keshlash",
    "(Asos: Redis 12.x, Caching 54.x.) Redis — Laravel'da asosiy kesh drayveri (`CACHE_STORE=redis`): tez, taqsimlangan, TTL, atomar.",
    "",
    "### Nimani keshlash",
    "- Qimmat so'rov/hisob natijasi (agregat, reyting, katalog).",
    "- Tashqi API javoblari.",
    "- Konfiguratsiya/sozlamalar (kam o'zgaradigan).",
    "- Hisoblagichlar.",
    "- Render qilingan fragment (view/HTML).",
    "",
    "### Namunalar",
    "`Cache::remember($key, $ttl, fn)`, `Cache::flexible()` (stale-while-revalidate), `Cache::lock` (stampede), `Cache::tags()`, `rememberForever` + invalidatsiya.",
    "",
    "### Boshqa Redis vazifalari",
    "Sessiya, queue, rate limiting, lock, broadcasting — alohida ulanish/DB (kesh `flush` boshqalarni o'chirmasin).",
    "",
    "### Samaradorlik",
    "- Pipeline/`many`: ko'p kalitni bitta round-trip'da (`Cache::many`, `Redis::pipeline`).",
    "- **Serializatsiya:** `phpredis` + `igbinary`/`msgpack` (tezroq, kichik); kichik qiymat.",
    "- **Persistent ulanish** (phpredis `persistent`), Unix socket (bir mashinada).",
    "- Katta kalit/qiymatdan qoching.",
    "- Kalit nomlari qisqa va izchil.",
    "",
    "### Mijoz",
    "**phpredis** (C kengaytma, tez) > Predis (sof PHP).",
    "",
    "### Eviction",
    "Kesh uchun `maxmemory-policy allkeys-lru/lfu`, `maxmemory`.",
    "",
    "### Monitoring",
    "Hit ratio, latency, xotira, eviction (12.19, 54.20).",
    "",
    "### Ehtiyot",
    "Kesh yiqilsa ilova ishlashi kerak (fallback), eskirish/invalidatsiya, stampede."
  ],
  "examples": [
    {
      "title": "Fragment va many",
      "lang": "php",
      "code": [
        "$html = Cache::remember(\"sidebar:v1:{$locale}\", 600, fn () => view('partials.sidebar')->render());",
        "$values = Cache::many(['a', 'b', 'c']);            // bitta round-trip",
        "Cache::putMany(['a' => 1, 'b' => 2], 600);"
      ]
    }
  ],
  "pitfalls": [
    "Kesh va navbat/sessiya bitta Redis'da bo'lsa `flush` boshqalarini o'chiradi.",
    "Predis o'rniga phpredis (C) tezroq.",
    "Ko'p alohida `get` har biri round-trip: `many`/pipeline.",
    "Stampede va invalidatsiyani o'ylamasdan keshlash eskirgan/sekin natija beradi."
  ]
});
