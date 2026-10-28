/* Chuqur dars: 12.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.13", {
  "lesson": [
    "### Rate limiting",
    "Foydalanuvchi/IP **belgilangan vaqtda** nechta so'rov qila olishini cheklash: suiiste'mol, brute-force, DoS himoyasi, adolatli foydalanish. Redis — tez va atomar hisoblagich.",
    "",
    "### Algoritmlar",
    "1. **Fixed window:** `INCR key` + `EXPIRE` (oynada hisob). Sodda; oyna chegarasida 2× portlash.",
    "2. **Sliding window log:** ZSET'da so'rov vaqtlari (`ZADD`, `ZREMRANGEBYSCORE`, `ZCARD`): aniq, ko'p xotira.",
    "3. **Sliding window counter:** ikki oynani vaznli aralashtirish.",
    "4. **Token bucket / leaky bucket:** zaxira token, qayta to'ladi; burst'ga ruxsat.",
    "",
    "### Atomarlik",
    "`INCR` + `EXPIRE` ikki buyruq (orasida uzilsa TTL'siz kalit): **Lua** yoki `SET key 0 NX EX 60` + `INCR`.",
    "",
    "### Laravel",
    "```php",
    "RateLimiter::for('api', fn (Request $r) => Limit::perMinute(60)->by($r->user()?->id ?: $r->ip()));",
    "Route::middleware('throttle:api')->group(...);",
    "if (RateLimiter::tooManyAttempts($key, 5)) { ... } RateLimiter::hit($key, 60);",
    "Redis::throttle('mail')->allow(10)->every(60)->then(fn () => ..., fn () => $job->release(10));",
    "```",
    "`throttle` kesh store'dan (Redis tavsiya) foydalanadi. Headerlar: `X-RateLimit-Limit/Remaining`, `Retry-After`, **429 Too Many Requests**.",
    "",
    "### Kalit tanlash",
    "Foydalanuvchi ID, IP (NAT/proksi ortida ehtiyot: `trustProxies`), API token, endpoint bo'yicha alohida.",
    "",
    "### Qoidalar",
    "- Login/parol tiklash uchun qat'iy (5/daqiqa).",
    "- Redis uzilsa ilova nima qiladi (fail-open yoki closed) — qaror.",
    "- Taqsimlangan (ko'p server) holatda umumiy Redis.",
    "- Maxsus limitlar (admin/premium)."
  ],
  "examples": [
    {
      "title": "Fixed window Lua",
      "lang": "php",
      "code": [
        "$lua = <<<'LUA'",
        "local c = redis.call('incr', KEYS[1])",
        "if c == 1 then redis.call('expire', KEYS[1], ARGV[1]) end",
        "return c",
        "LUA;",
        "$count = Redis::eval($lua, 1, \"rl:login:{$ip}\", 60);",
        "if ($count > 5) { abort(429); }"
      ]
    }
  ],
  "pitfalls": [
    "`INCR` va `EXPIRE` alohida buyruq: orasida uzilsa TTL'siz kalit qoladi (Lua).",
    "Fixed window oyna chegarasida 2× portlashga yo'l qo'yadi: sliding window/token bucket.",
    "Proksi/NAT ortida IP bo'yicha limit noto'g'ri foydalanuvchilarni bloklaydi (`trustProxies`).",
    "Redis uzilganda limiter fail-open/closed qarori bo'lmasa kutilmagan xatti-harakat."
  ]
});
