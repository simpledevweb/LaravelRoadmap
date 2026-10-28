/* Chuqur dars: 54.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.19", {
  "lesson": [
    "### Cache hit ratio",
    "Keshdan **muvaffaqiyatli** berilgan so'rovlar ulushi: `hit ratio = hits / (hits + misses)`. Kesh samaradorligining asosiy ko'rsatkichi.",
    "",
    "### Hisoblash",
    "Redis: `INFO stats` → `keyspace_hits`, `keyspace_misses`. Ratio = hits/(hits+misses). Laravel: o'z hisoblagichlar (`Cache::remember` ichida hit/miss `Redis::incr`).",
    "",
    "### Nima yaxshi",
    "Sohaga qarab: **>90%** odatda yaxshi; ko'p tizim 95–99%. Past hit ratio — kesh kam foyda beradi yoki yomon sozlangan.",
    "",
    "### Past hit ratio sabablari",
    "- **TTL juda qisqa.**",
    "- **Kesh kaliti juda xilma-xil** (parametrlar kombinatsiyasi, foydalanuvchiga xos).",
    "- **Hajm yetmaydi** → eviction (`evicted_keys` o'sadi).",
    "- **Noto'g'ri narsa keshlangan** (bir martalik so'rovlar).",
    "- **Ko'p invalidatsiya.**",
    "- **Cold cache** (yangi ishga tushish/restart).",
    "- Penetration (mavjud bo'lmagan kalitlar, 54.10).",
    "",
    "### Yaxshilash",
    "TTL oshirish (xavfsizlik bilan), kalitni soddalashtirish/normallashtirish (`ksort`, keraksiz parametrlarni chiqarish), xotirani oshirish/eviction siyosatini sozlash (`allkeys-lfu`), warm-up, negative caching, faqat issiq ma'lumotni keshlash.",
    "",
    "### Yolg'on yaxshi ratio",
    "Juda ko'p arzon so'rovni keshlash ratio'ni oshiradi, lekin foyda bermaydi. **Foyda = tejalgan vaqt** (hit × (DB vaqti − kesh vaqti)). Ratio'ni **kalit guruhlari/endpoint** bo'yicha ajratib o'lchang.",
    "",
    "### Metrikalar bilan birga",
    "Kesh latency, DB QPS (kesh qo'shilgach kamaydimi?), evicted_keys, xotira.",
    "",
    "### Laravel",
    "```php",
    "Cache::remember($key, $ttl, function () use ($key) { Redis::incr('stat:cache:miss'); return ...; });  // miss sanash",
    "```",
    "yoki APM/Pulse (kesh hit/miss kartasi)."
  ],
  "examples": [
    {
      "title": "Redis'dan hit ratio",
      "lang": "bash",
      "code": [
        "redis-cli INFO stats | awk -F: '/keyspace_hits/{h=$2} /keyspace_misses/{m=$2} END{printf \"hit ratio: %.1f%%\\n\", h*100/(h+m)}'",
        "redis-cli INFO stats | grep -E \"evicted_keys|expired_keys\""
      ]
    }
  ],
  "pitfalls": [
    "Umumiy ratio'ga qarash muammoli kalit guruhlarini yashiradi: endpoint/kalit turi bo'yicha o'lchang.",
    "Arzon so'rovlarni keshlab ratio'ni sun'iy oshirish foyda bermaydi.",
    "Eviction ko'p bo'lsa hajm yetmayapti (hit ratio tushadi).",
    "Restartdan keyingi sovuq keshni yomon ratio deb noto'g'ri baholash."
  ]
});
