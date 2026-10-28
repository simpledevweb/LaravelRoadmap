/* Chuqur dars: 18.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.21", {
  "lesson": [
    "### Ikki muammo, bitta sabab: bir nechta server",
    "Bitta serverda ishlaydigan ilovada \"bu so'rov avval kelganmi\" yoki \"bu mijoz bir daqiqada nechta so'rov yubordi\" savollariga lokal xotira javob beradi. Load balancer ortida 5 ta app server bo'lsa, ketma-ket so'rovlar turli serverlarga tushadi. Holat **umumiy markazlashgan joyda** saqlanishi kerak: odatda Redis.",
    "",
    "### Taqsimlangan idempotentlik",
    "18.14 dagi Idempotency-Key mexanizmi klasterda ishlashi uchun:",
    "1. **Lock umumiy:** `Cache::lock(\"idem:{$scope}\", 30)` Redis driver bilan. `SET NX PX` atomik buyrug'iga asoslanadi va barcha serverlar bitta lock'ni ko'radi. Parallel ikkinchi so'rov lock ololmaydi va `409 Conflict` oladi.",
    "2. **Natija umumiy va chidamli:** javob Redis'da TTL bilan yoki DB jadvalida saqlanadi. Muhim amallar (to'lov) uchun DB afzal: Redis qayta ishga tushsa yoki eviction bo'lsa, kalit yo'qolmaydi. DB'da `scope` ga unique indeks ikkinchi himoya chizig'i.",
    "3. **Lock muddati:** amal vaqtidan uzunroq bo'lsin. Aks holda lock muddati tugab, ikkinchi so'rov parallel bajariladi. Uzoq amallar uchun lock'ni uzaytirish yoki DB'dagi \"processing\" holatiga tayanish.",
    "4. **Holatlar:** `processing` → `completed` (javob saqlandi). Server amal o'rtasida qulasa, `processing` yozuvi muddati bilan qoladi va keyin qayta urinishga ruxsat beriladi.",
    "",
    "### Taqsimlangan rate limiting",
    "Har server o'z xotirasida hisoblasa, 5 server bilan \"60/daqiqa\" limit amalda 300/daqiqa bo'ladi. Laravel `RateLimiter` default cache store'dan foydalanadi. Klasterda u **Redis** bo'lishi kerak (`CACHE_STORE=redis` yoki `config/cache.php` dagi `limiter` sozlamasi).",
    "",
    "Redis'da hisoblagich atomik `INCR` + `EXPIRE` bilan yangilanadi. Laravel'ning `ThrottleRequestsWithRedis` middleware'i (`throttle` alias'ini shunga almashtirish mumkin) Redis Lua skriptlari bilan aniqroq va tezroq ishlaydi.",
    "",
    "### Algoritmlar",
    "- **Fixed window:** `INCR rate:{key}:{minute}`. Sodda, oyna chegarasida portlash mumkin.",
    "- **Sliding window log:** har so'rov vaqtini Redis sorted set'ga (`ZADD`) yozish va eskilarini `ZREMRANGEBYSCORE` bilan o'chirish. Aniq, lekin har so'rov uchun xotira.",
    "- **Sliding window counter:** joriy va oldingi oyna hisoblagichlarining vaznli yig'indisi. Aniqlik va xotira o'rtasidagi muvozanat.",
    "- **Token bucket / GCRA:** silliq oqim va qisqa portlashlarga ruxsat (`redis-cell` moduli).",
    "",
    "### Mijoz uchun javob",
    "`429` + `Retry-After` + `X-RateLimit-Limit`, `X-RateLimit-Remaining`. Mijozlar `Retry-After` ga rioya qilishi va eksponensial backoff qo'llashi kerak (17.13).",
    "",
    "### Redis ishlamay qolsa",
    "Rate limiter va lock Redis'ga bog'liq. U ishlamasa nima bo'lishini oldindan hal qiling: **fail-open** (limitsiz o'tkazish — mavjudlik ustun) yoki **fail-closed** (rad etish — xavfsizlik ustun). Login va to'lov uchun odatda fail-closed, oddiy o'qish uchun fail-open."
  ],
  "examples": [
    {
      "title": "Klaster uchun sozlash",
      "lang": "php",
      "code": [
        "// .env",
        "// CACHE_STORE=redis",
        "// REDIS_CLIENT=phpredis",
        "",
        "// config/cache.php (Laravel 11+): rate limiter uchun alohida store",
        "'limiter' => env('CACHE_LIMITER', 'redis'),",
        "",
        "// bootstrap/app.php: Redis'ga optimallashtirilgan throttle",
        "->withMiddleware(function (Middleware $middleware) {",
        "    $middleware->throttleWithRedis();",
        "})"
      ]
    },
    {
      "title": "Sliding window log (Redis sorted set)",
      "lang": "php",
      "code": [
        "function allow(string $key, int $limit, int $windowSec): bool",
        "{",
        "    $now = (int) (microtime(true) * 1000);",
        "    $redisKey = \"rl:{$key}\";",
        "",
        "    $results = Redis::transaction(function ($tx) use ($redisKey, $now, $windowSec) {",
        "        $tx->zremrangebyscore($redisKey, 0, $now - $windowSec * 1000);",
        "        $tx->zadd($redisKey, $now, $now . ':' . Str::random(6));",
        "        $tx->zcard($redisKey);",
        "        $tx->pexpire($redisKey, $windowSec * 1000);",
        "    });",
        "",
        "    return $results[2] <= $limit;",
        "}",
        "",
        "abort_unless(allow('user:' . $user->id, 100, 60), 429);"
      ],
      "note": "Rad etilgan so'rovlar ham sorted set'ga yoziladi va oynani to'ldiradi. Bu \"qat'iy\" variant. Kerak bo'lsa, `ZCARD` ni avval tekshirib, keyin `ZADD` qiling (Lua skript bilan atomik)."
    }
  ],
  "pitfalls": [
    "Klasterda `file` yoki `array` cache bilan rate limiting va lock: har server alohida hisoblaydi.",
    "Lock muddatini amal vaqtidan qisqa qilish: lock tugab, ikkinchi so'rov parallel bajariladi.",
    "Muhim idempotentlik natijalarini faqat eviction yoqilgan Redis'da saqlash: kalit yo'qolib, amal takrorlanadi.",
    "Redis ishlamay qolgandagi xatti-harakatni (fail-open yoki fail-closed) oldindan hal qilmaslik."
  ]
});
