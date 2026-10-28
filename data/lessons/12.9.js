/* Chuqur dars: 12.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.9", {
  "lesson": [
    "### MULTI / EXEC",
    "Buyruqlarni **navbatga** qo'yib (`MULTI`), keyin **birdan bajarish** (`EXEC`): hech kim orasiga kira olmaydi. **Rollback yo'q:** bitta buyruq xato qilsa qolganlari baribir bajariladi (sintaksis xatosi bo'lsa butun tranzaksiya rad).",
    "```",
    "MULTI",
    "DECRBY balance:1 100",
    "INCRBY balance:2 100",
    "EXEC",
    "```",
    "",
    "### WATCH (optimistik qulf)",
    "`WATCH key` — `EXEC` gacha kalit boshqa tomonidan o'zgarsa, tranzaksiya **bekor** (`nil`): o'qib → hisoblab → shartli yozish uchun qayta urinish tsikli.",
    "",
    "### Lua skriptlar",
    "`EVAL \"script\" numkeys key... arg...` — skript **butunlay atomar** (server band, boshqa buyruq kutadi). O'qib-shart-yozishni bitta atomar qadamda (rate limiter, lock release, zaxira). `EVALSHA` (keshlangan), Redis 7.0 **Functions**.",
    "Qoidalar: qisqa (uzoq skript serverni bloklaydi), kalitlar `KEYS` orqali (cluster uchun), deterministik.",
    "",
    "### Pipeline vs Transaction",
    "- **Pipeline:** tarmoq round-trip'ini kamaytiradi, atomar emas.",
    "- **Transaction/Lua:** atomar.",
    "",
    "### Cluster",
    "Ko'p kalitli tranzaksiya/skript — barcha kalit **bir slot**da (hash tag `{user:5}`).",
    "",
    "### Laravel",
    "`Redis::transaction(fn ($r) => ...)`, `Redis::pipeline(fn ($p) => ...)`, `Redis::eval($lua, $numKeys, ...$args)`, `Cache::lock` Lua ishlatadi. `Redis::throttle()` ham Lua.",
    "",
    "### Qachon",
    "Oddiy atomar buyruq (`INCR`) yetarli bo'lsa shuni; murakkab mantiq — Lua; DB tranzaksiyasi ehtiyoji bo'lsa Redis o'rniga DB."
  ],
  "examples": [
    {
      "title": "Lua: zaxirani atomar yechish",
      "lang": "php",
      "code": [
        "$lua = <<<'LUA'",
        "local n = tonumber(redis.call('get', KEYS[1]) or '0')",
        "if n >= tonumber(ARGV[1]) then return redis.call('decrby', KEYS[1], ARGV[1]) else return -1 end",
        "LUA;",
        "$left = Redis::eval($lua, 1, 'stock:7', 1);     // -1 = yetmaydi"
      ]
    }
  ],
  "pitfalls": [
    "Redis tranzaksiyasida rollback yo'q: bitta buyruq xato bo'lsa qolganlari bajariladi.",
    "Uzoq Lua skript serverni bloklaydi: qisqa va tez.",
    "Cluster'da ko'p kalitli skript bir slotda bo'lishi shart (hash tag).",
    "Pipeline'ni atomar deb o'ylash noto'g'ri."
  ]
});
