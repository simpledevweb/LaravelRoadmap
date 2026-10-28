/* Chuqur dars: 12.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.15", {
  "lesson": [
    "### maxmemory va eviction",
    "`maxmemory 2gb` — Redis ishlatadigan xotira chegarasi. Chegaraga yetganda `maxmemory-policy` nima qilishni hal qiladi.",
    "",
    "### Siyosatlar",
    "- `noeviction` (default): yangi yozishni **rad etadi** (`OOM command not allowed`); o'qish ishlaydi.",
    "- `allkeys-lru`: hamma kalitdan eng kam ishlatilganini (LRU) o'chiradi — **kesh uchun tavsiya**.",
    "- `allkeys-lfu`: eng kam **chastotali** (LFU, 4.0+) — kesh uchun ko'pincha yaxshiroq.",
    "- `volatile-lru` / `volatile-lfu` / `volatile-ttl` / `volatile-random`: faqat **TTL'li** kalitlardan.",
    "- `allkeys-random`, `volatile-random`.",
    "",
    "### Tanlash",
    "- **Sof kesh:** `allkeys-lru`/`allkeys-lfu`.",
    "- **Aralash (kesh + sessiya/navbat):** `volatile-lru` (faqat TTL'li kesh kalitlari o'chadi) — muhim kalitlarga TTL **qo'ymang**; ammo ajratilgan Redis yaxshiroq.",
    "- **Navbat/sessiya/asosiy ombor:** `noeviction` (ma'lumot yo'qolmasin), xotirani yetarli qiling.",
    "",
    "### Approximate LRU",
    "Redis aniq LRU emas: tasodifiy `maxmemory-samples` (default 5) kalit ichidan eng eskisini tanlaydi.",
    "",
    "### Monitoring",
    "`INFO stats` → `evicted_keys` o'sishi (kesh kichik/ko'p ma'lumot), `INFO memory`. Eviction ko'p = hit ratio past.",
    "",
    "### Laravel",
    "Navbat/Horizon va kesh bitta Redis'da `allkeys-lru` — navbat job'lari o'chib ketishi mumkin: alohida instance.",
    "",
    "### Xato",
    "`noeviction` bilan kesh — yozishlar to'xtaydi (OOM); eviction bilan navbat — ma'lumot yo'qoladi."
  ],
  "examples": [
    {
      "title": "Sozlash",
      "lang": "bash",
      "code": [
        "CONFIG SET maxmemory 2gb",
        "CONFIG SET maxmemory-policy allkeys-lfu",
        "INFO stats | grep evicted_keys"
      ]
    }
  ],
  "pitfalls": [
    "Kesh uchun `noeviction` xotira to'lganda yozishlarni rad etadi (OOM).",
    "Navbat/sessiya bilan bitta Redis'da `allkeys-lru` job/sessiyalarni o'chiradi.",
    "`volatile-*` siyosatda TTL'siz kalitlar hech qachon o'chmaydi (xotira to'lishi).",
    "Eviction ko'p bo'lsa xotira kichik yoki keraksiz ma'lumot keshlanmoqda."
  ]
});
