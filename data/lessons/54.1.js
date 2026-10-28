/* Chuqur dars: 54.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.1", {
  "lesson": [
    "### Cache-Aside",
    "Ilova keshni **o'zi boshqaradi**: avval keshdan o'qiydi; miss bo'lsa manbadan (DB) oladi va keshga yozadi. Yozishda manbani yangilab, keshni **o'chiradi**. (Redis bilan: 12.4.)",
    "",
    "### Oqim",
    "```",
    "read:  cache.get(k) → hit? qaytar : db.read → cache.set(k, v, ttl) → qaytar",
    "write: db.write → cache.delete(k)",
    "```",
    "",
    "### Afzalliklari",
    "Faqat so'ralgan ma'lumot keshlanadi; kesh yiqilsa tizim ishlaydi; sodda; ilova to'liq nazorat qiladi.",
    "",
    "### Kamchiliklari",
    "Cold miss (birinchi so'rov sekin), eskirgan ma'lumot, stampede (54.9), poyga (54.18), kesh mantig'i ilovada tarqaladi (har joyda).",
    "",
    "### Laravel",
    "`Cache::remember($key, $ttl, fn () => ...)`; yozishda `Cache::forget`. `Cache::flexible()` (stale-while-revalidate).",
    "",
    "### Qachon",
    "O'qish ko'p, yozish kam, eskirish bir oz qabul qilinadigan ma'lumot: profil, katalog, sozlamalar. Eng keng tarqalgan strategiya.",
    "",
    "### Yaxshi amaliyot",
    "TTL har doim, `null`ni ham keshlash, kalit versiyalash, stampede himoyasi, DB commit'dan keyin invalidatsiya."
  ],
  "examples": [
    {
      "title": "Cache-aside",
      "lang": "php",
      "code": [
        "$user = Cache::remember(\"user:{$id}\", 600, fn () => User::with('profile')->findOrFail($id));",
        "// yozish",
        "$user->update($data);",
        "Cache::forget(\"user:{$id}\");"
      ]
    }
  ],
  "pitfalls": [
    "TTL'siz kesh abadiy eskiradi.",
    "Kesh mantig'i ilovaning ko'p joyida tarqalsa invalidatsiya unutiladi: repository/servisda markazlashtiring.",
    "Stampede: kalit tugaganda ko'p so'rov bazaga uriladi.",
    "Commit'dan oldin keshni o'chirish eski ma'lumotni qayta keshlaydi."
  ]
});
