/* Chuqur dars: 12.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.18", {
  "lesson": [
    "### Sentinel",
    "**Redis Sentinel** — master/replica tizimi uchun **monitoring + avtomatik failover + konfiguratsiya xizmati**.",
    "- Kamida **3 ta Sentinel** (quorum, ko'pchilik qaror).",
    "- Master ishdan chiqsa Sentinel'lar ovoz berib replikani **master'ga ko'taradi** va mijozlarga yangi manzilni beradi.",
    "- Mijoz Sentinel'dan master manzilini so'raydi (`SENTINEL get-master-addr-by-name mymaster`).",
    "- Sharding **yo'q** (bitta master hajmi cheklangan).",
    "",
    "### Cluster",
    "**Redis Cluster** — ma'lumotni **sharding** (taqsimlash) + replikatsiya + failover.",
    "- **16384 hash slot**: `slot = CRC16(key) mod 16384`; slotlar master'lar orasida bo'lingan.",
    "- Kamida **3 master** (har biriga replika tavsiya).",
    "- **Hash tag:** `{user:5}:profile`, `{user:5}:cart` — `{}` ichi bo'yicha slot: bir slotga tushib, ko'p kalitli amallar (MGET, tranzaksiya, Lua) mumkin.",
    "- Mijoz `MOVED`/`ASK` yo'naltirishlarini kuzatadi (smart client).",
    "- **Cheklovlar:** faqat `db 0`; ko'p kalitli buyruq bir slotda; ba'zi buyruqlar (`KEYS`) tugun bo'yicha.",
    "",
    "### Tanlash",
    "- Bitta tugunga sig'adi, HA kerak → **Sentinel** (yoki managed).",
    "- Hajm/yozish bitta tugundan oshadi → **Cluster**.",
    "- Managed: AWS ElastiCache, Azure Cache, Upstash, Redis Cloud (boshqaruvni olib tashlaydi).",
    "",
    "### Laravel",
    "```php",
    "'redis' => ['client' => 'phpredis', 'options' => ['cluster' => 'redis'],",
    "  'clusters' => ['default' => [['host' => '10.0.0.1', 'port' => 6379], ['host' => '10.0.0.2', 'port' => 6379]]]],",
    "```",
    "Sentinel — `predis` `replication => sentinel` opsiyalari. Cluster'da `Cache::tags`, `Redis::eval` bir slot talabi.",
    "",
    "### Ehtiyot",
    "Split-brain, tarmoq ajralishi, quorum, failover vaqti (sekundlar), mijoz kutubxonasi qo'llab-quvvatlashi."
  ],
  "examples": [
    {
      "title": "Cluster kalitlari",
      "lang": "bash",
      "code": [
        "redis-cli -c -h 10.0.0.1 -p 6379",
        "SET {user:5}:profile \"...\"",
        "SET {user:5}:cart \"...\"",
        "MGET {user:5}:profile {user:5}:cart       # bir slot: ishlaydi",
        "CLUSTER KEYSLOT {user:5}"
      ]
    }
  ],
  "pitfalls": [
    "Cluster'da ko'p kalitli buyruq turli slotdagi kalitlarda xato beradi: hash tag `{...}`.",
    "Sentinel kamida 3 ta bo'lishi kerak (2 tada quorum buziladi).",
    "Cluster faqat `db 0`: Laravel'da bir nechta DB (cache/session) ishlamaydi.",
    "Mijoz kutubxonasi cluster/Sentinel'ni qo'llamasa failover'da uzilishlar."
  ]
});
