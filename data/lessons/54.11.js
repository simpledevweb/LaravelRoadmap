/* Chuqur dars: 54.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.11", {
  "lesson": [
    "### Cache avalanche",
    "**Ko'p kesh kaliti bir vaqtda tugashi** (yoki kesh serveri yiqilishi) natijasida bazaga **katta to'lqin** so'rov keladi va u ishdan chiqadi.",
    "",
    "### Sabablar",
    "- Ko'p kalit **bir xil TTL** bilan bir vaqtda yaratilgan (deploy, isitish, import).",
    "- **Kesh serveri yiqilishi/restart** (sovuq kesh).",
    "- Ommaviy `flush()`/`cache:clear`.",
    "- Eviction ommaviy.",
    "",
    "### Yechimlar",
    "1. **TTL jitter:** `ttl + random_int(0, 300)`.",
    "2. **Ko'p turli TTL** (ma'lumot turiga qarab).",
    "3. **Kesh HA:** Sentinel/Cluster/replika, yiqilsa avtomatik failover.",
    "4. **Isitish (warm-up):** deploy/restartdan keyin muhim kalitlarni oldindan to'ldirish.",
    "5. **Lock/stale-while-revalidate** (stampede himoyasi, 54.9).",
    "6. **Circuit breaker / yuk cheklash:** DB'ga so'rovlarni cheklash, kerak bo'lsa degraded rejim (oddiy javob).",
    "7. **Ko'p qatlamli kesh:** local (APCu) + Redis.",
    "8. **Rate limiting** va navbat.",
    "9. `cache:clear` ni ehtiyot: ommaviy tozalash o'rniga versiyalash/tag.",
    "",
    "### Monitoring",
    "Hit ratio keskin tushishi, DB QPS va CPU sakrashi, kesh server holati.",
    "",
    "### Laravel",
    "`Cache::put($k, $v, $ttl + random_int(0, 120))`, `Cache::flexible`, `php artisan cache:clear` ehtiyotkorlik bilan, schedule bilan isitish.",
    "",
    "### Rejalash",
    "\"Kesh butunlay yo'q bo'lsa DB bardosh beradimi?\" — yuklama testi (kesh o'chiq)."
  ],
  "examples": [
    {
      "title": "Jitter va warm-up",
      "lang": "php",
      "code": [
        "foreach ($categories as $c) {",
        "    Cache::put(\"cat:{$c->id}\", $c, 3600 + random_int(0, 600));     // jitter",
        "}",
        "// deploydan keyin muhim kalitlarni isitish",
        "Artisan::command('cache:warm', fn () => Product::topSelling() && Category::tree());"
      ]
    }
  ],
  "pitfalls": [
    "Ko'p kalit bir xil TTL bilan bir vaqtda tugab DB'ni to'ldiradi: jitter.",
    "Kesh serveri yiqilganda sovuq kesh DB'ni bosadi: HA va warm-up.",
    "`cache:clear` ommaviy tozalash avalanche beradi: versiyalash/tag.",
    "Kesh yo'q holatda DB bardoshini sinamaslik."
  ]
});
