/* Chuqur dars: 54.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.12", {
  "lesson": [
    "### Distributed cache",
    "Kesh **bir necha serverga taqsimlangan**, hamma ilova instansiyalari ular bilan **umumiy** ishlaydi: Redis (Cluster/Sentinel), Memcached (client-side sharding), Hazelcast.",
    "",
    "### Nega",
    "- Ilova ko'p serverda: har serverning lokal keshi **nomuvofiq**; umumiy kesh bitta haqiqat manbai.",
    "- Hajm bitta server RAM'idan katta.",
    "- Yuqori mavjudlik (HA).",
    "",
    "### Taqsimlash",
    "- **Client-side sharding:** mijoz kalit xeshi bo'yicha serverni tanlaydi (Memcached): **consistent hashing** (server qo'shish/o'chirishda kam kalit ko'chadi).",
    "- **Server-side:** Redis Cluster (hash slot).",
    "- Replikatsiya (nusxalar).",
    "",
    "### Masalalar",
    "- **Tarmoq kechikishi** (lokal xotiradan sekinroq, ~0.2–1 ms).",
    "- **Izchillik:** replika lag, ko'p tugun.",
    "- **Failover**, tarmoq bo'linishi.",
    "- **Hot key:** bitta kalitga ko'p so'rov bitta tugunni yuklaydi (nusxalash, lokal keshlash).",
    "- **Sérializatsiya** narxi (PHP serialize/igbinary/msgpack).",
    "- Xavfsizlik: tarmoq cheklovi, parol, TLS.",
    "",
    "### Laravel",
    "`CACHE_STORE=redis`, `redis.clusters`; `memcached` `servers` ro'yxati (`weight`); `Cache::store('redis')`. Bir nechta store: sessiya, kesh, navbat uchun alohida.",
    "",
    "### Amaliyot",
    "Ajratilgan kesh klasteri (ilova serverlaridan alohida), monitoring, ulanish pool, serializatsiya formatini tanlash, hot key'larni aniqlash.",
    "",
    "### Local + distributed",
    "Eng issiq kalitlar uchun lokal (APCu) + umumiy (Redis) qatlam (54.13)."
  ],
  "examples": [
    {
      "title": "Store sozlash",
      "lang": "php",
      "code": [
        "// config/cache.php",
        "'stores' => [",
        "  'redis' => ['driver' => 'redis', 'connection' => 'cache', 'lock_connection' => 'default'],",
        "  'memcached' => ['driver' => 'memcached', 'servers' => [['host' => '10.0.0.5', 'port' => 11211, 'weight' => 50], ['host' => '10.0.0.6', 'port' => 11211, 'weight' => 50]]],",
        "],",
        "Cache::store('redis')->get('k');"
      ]
    }
  ],
  "pitfalls": [
    "Hot key bitta tugunni yuklaydi: nusxalash yoki lokal keshlash.",
    "Consistent hashing'siz serverni qo'shish/olib tashlash ko'p kalitni yo'qotadi.",
    "Tarmoq kechikishi lokal keshdan ko'p: har so'rovda ko'p `get` o'rniga `many`/pipeline.",
    "Himoyasiz (parol/firewall yo'q) kesh ma'lumot oshkor bo'lishiga olib keladi."
  ]
});
