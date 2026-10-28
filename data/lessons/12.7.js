/* Chuqur dars: 12.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.7", {
  "lesson": [
    "### Distributed lock",
    "Bir nechta jarayon/server orasida **bitta resursga bir vaqtda bitta** ishlovchi bo'lishini ta'minlaydi (masalan, bitta cron vazifa, bitta to'lov).",
    "",
    "### Oddiy usul (bitta Redis)",
    "```",
    "SET lock:order:5 <token> NX PX 30000",
    "```",
    "`NX` — faqat yo'q bo'lsa; `PX` — avtomatik tugash (egasi o'lsa lock abadiy qolmasin); `token` — tasodifiy qiymat (egasi).",
    "**Bo'shatish faqat egasi:** Lua orqali \"qiymat mening tokenimga teng bo'lsa `DEL`\" (aks holda boshqaning lock'ini o'chirasiz):",
    "```lua",
    "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
    "```",
    "",
    "### Laravel",
    "```php",
    "Cache::lock('order:5', 10)->get(function () { /* kritik qism */ });   // 10 s",
    "$lock = Cache::lock('report', 30); if ($lock->get()) { try { ... } finally { $lock->release(); } }",
    "Cache::lock('x', 10)->block(5, fn () => ...);   // 5 s gacha kutadi",
    "Cache::restoreLock('x', $owner)->release();      // boshqa jarayondan",
    "```",
    "Redis/Memcached/DynamoDB/DB/file drayverlarida.",
    "",
    "### Xavflar",
    "- **Lock tugab ketishi:** ish TTL'dan uzoq davom etsa boshqasi lock oladi (ikki egasi). Yechim: TTL'ni ish vaqtiga mos, uzaytirish (watchdog), **fencing token**.",
    "- **Redis failover:** asinxron replikatsiyada lock yo'qolishi; **Redlock** (ko'p mustaqil Redis) bahsli (M. Kleppmann tanqidi).",
    "- Soat siljishi.",
    "- Deadlock: har doim TTL.",
    "",
    "### Muqobillar",
    "DB qulfi (`FOR UPDATE`, advisory lock), `unique` constraint, idempotent operatsiya (lock kerak bo'lmasligi uchun dizayn).",
    "",
    "### Qoida",
    "Lock — oxirgi chora; to'g'rilik uchun DB constraint/idempotentlik asosiy, lock — samaradorlik/dublikatdan saqlanish uchun."
  ],
  "examples": [
    {
      "title": "Lock",
      "lang": "php",
      "code": [
        "$result = Cache::lock(\"invoice:{$id}:generate\", 60)->block(5, function () use ($id) {",
        "    return Invoice::generate($id);          // bir vaqtda faqat bitta jarayon",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Ish lock TTL'idan uzoq davom etsa boshqasi lock oladi: TTL'ni to'g'ri qo'ying/fencing.",
    "Lock'ni egasi bo'lmagan jarayon o'chirmasin (token tekshiruvi).",
    "Asinxron replikatsiya failover'da lock yo'qolishi mumkin.",
    "Lock to'g'rilikning yagona himoyasi bo'lmasin: DB constraint/idempotentlik."
  ]
});
