/* Chuqur dars: 54.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.6", {
  "lesson": [
    "### TTL (Time To Live)",
    "Kesh yozuvining **yashash muddati**: tugagach o'chadi/yaroqsiz bo'ladi. Eskirishning **xavfsizlik to'ri**.",
    "",
    "### Tanlash",
    "- **Qisqa TTL:** yangi ma'lumot, ko'p miss (DB yuki yuqori).",
    "- **Uzun TTL:** kamroq DB yuki, eskirgan ma'lumot xavfi.",
    "- Ma'lumot turiga qarab: sozlamalar/katalog — soatlar/kunlar; feed/hisoblagich — soniya/daqiqa; foydalanuvchi sessiyasi/token — amal qilish muddati; \"hech qachon o'zgarmaydi\" — uzun (+ versiya).",
    "- **Biznes talab:** \"ma'lumot necha daqiqagacha eski bo'lishi mumkin?\" (SLA).",
    "",
    "### Jitter",
    "Bir vaqtda ko'p kalit tugamasligi (avalanche, 54.11) uchun TTL'ga tasodifiy qo'shimcha: `ttl + random_int(0, 60)`.",
    "",
    "### TTL strategiyalari",
    "- **Absolute:** yozilgandan N soniya.",
    "- **Sliding:** har o'qishda uzayadi (sessiya uchun; kesh uchun xavfli: eskirish cheksiz cho'zilishi).",
    "- **Stale-while-revalidate:** TTL tugagach eskisini berib fonda yangilash (`Cache::flexible([60, 300], ...)`).",
    "- **Aniq vaqtga:** kun oxirigacha (`now()->endOfDay()`).",
    "",
    "### Laravel",
    "`Cache::put('k', $v, 600)`, `now()->addMinutes(10)`, `Cache::remember`, `rememberForever` (ehtiyot: invalidatsiya shart), `Cache::flexible`.",
    "",
    "### Xatolar",
    "TTL'siz kalit (xotira to'lishi), juda uzun TTL + invalidatsiya yo'q, bir xil TTL (avalanche), TTL'ni \"optimizatsiya\" deb cheksiz qilish."
  ],
  "examples": [
    {
      "title": "Jitter va flexible",
      "lang": "php",
      "code": [
        "$ttl = 600 + random_int(0, 60);                              // jitter",
        "Cache::put(\"cat:{$id}\", $category, $ttl);",
        "",
        "$stats = Cache::flexible('stats', [60, 300], fn () => Stats::compute());   // 60 s yangi, 300 s gacha eski + fonda yangilash"
      ]
    }
  ],
  "pitfalls": [
    "Hamma kalitga bir xil TTL bir vaqtda tugab avalanche beradi: jitter.",
    "Sliding TTL kesh uchun ma'lumotni cheksiz eskirtirishi mumkin.",
    "`rememberForever` invalidatsiyasiz eskirgan ma'lumot qoldiradi.",
    "TTL qiymatini biznes talabsiz (taxminan) tanlash."
  ]
});
