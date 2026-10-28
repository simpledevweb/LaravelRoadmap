/* Chuqur dars: 12.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.8", {
  "lesson": [
    "### Atomarlik",
    "Redis buyruqlari **bitta thread**da ketma-ket bajariladi: har buyruq **atomar** (bo'linmas). Shu sabab hisoblagich va bayroqlar poygasiz.",
    "",
    "### Atomar buyruqlar",
    "- **Sonlar:** `INCR`, `DECR`, `INCRBY`, `INCRBYFLOAT`, `HINCRBY`, `ZINCRBY`.",
    "- **Shartli yozish:** `SET key v NX` (faqat yo'q), `XX` (faqat bor), `SETNX`.",
    "- **O'qib-o'chirish:** `GETDEL` (6.2), `LPOP/RPOP`, `SPOP`.",
    "- **O'qib-yozish:** `GETSET` (eskirgan) → `SET ... GET` (6.2), `GETEX`.",
    "- **Kolleksiya:** `SADD` (qo'shildimi 0/1), `LMOVE`, `RPOPLPUSH`.",
    "",
    "### Poyga: o'qib-keyin-yozish",
    "```php",
    "$n = Redis::get('stock'); Redis::set('stock', $n - 1);   // XATO: parallelda yo'qotish",
    "```",
    "To'g'ri: `Redis::decr('stock')` (atomar) yoki Lua/transaction.",
    "",
    "### Murakkab shartli mantiq",
    "Bir nechta buyruqni atomar qilish: `MULTI/EXEC` + `WATCH` yoki **Lua** (12.9).",
    "",
    "### Pipelining bilan farq",
    "Pipeline — tarmoq optimizatsiyasi (ko'p buyruqni birdan yuborish), **atomar emas**.",
    "",
    "### Foydalanish",
    "Hisoblagichlar (ko'rishlar, like), zaxira, bir martalik bayroq (`SET NX EX`), rate limit (`INCR + EXPIRE`: ikkalasi atomar emas → Lua yoki `SET NX` + `INCR`).",
    "",
    "### Laravel",
    "`Cache::increment('k')`, `Cache::add('k', $v, $ttl)` (NX), `Redis::incr()`, `Redis::set($k, $v, 'EX', 60, 'NX')`."
  ],
  "examples": [
    {
      "title": "Atomar va xato",
      "lang": "php",
      "code": [
        "// XATO (poyga)",
        "$n = (int) Redis::get('stock:7'); if ($n > 0) { Redis::set('stock:7', $n - 1); }",
        "",
        "// TO'G'RI: atomar",
        "$left = Redis::decr('stock:7');",
        "if ($left < 0) { Redis::incr('stock:7'); throw new OutOfStock(); }",
        "",
        "// bir martalik bayroq",
        "$first = Redis::set(\"sent:{$userId}\", 1, 'EX', 86400, 'NX');   // true faqat birinchi marta"
      ]
    }
  ],
  "pitfalls": [
    "`GET` keyin `SET` poygaga ochiq: atomar buyruq yoki Lua.",
    "`INCR` va `EXPIRE` ikki alohida buyruq: orasida xato bo'lsa TTL'siz qoladi (Lua/`SET NX EX`).",
    "Pipeline atomar emas (faqat tarmoq tejaydi).",
    "`GETSET` eskirgan: `SET ... GET`."
  ]
});
