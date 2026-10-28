/* Chuqur dars: 54.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.18", {
  "lesson": [
    "### Cache consistency (strategiyalar nuqtai nazaridan)",
    "(Chuqur: 12.20.) Kesh va manba mos kelishi — strategiyaga bog'liq:",
    "",
    "| Strategiya | Izchillik | Izoh |",
    "|---|---|---|",
    "| Cache-aside + TTL | eventual (TTL gacha eski) | sodda |",
    "| Cache-aside + delete | yaxshi (poyga ehtimoli) | keng tarqalgan |",
    "| Write-through | kuchli (kesh yangi) | yozish sekin |",
    "| Write-behind | zaif (DB orqada) | tez, yo'qotish xavfi |",
    "",
    "### Poyga holatlari",
    "Eski qiymatni qayta keshlash (o'qish-yozish poygasi), commit'dan oldin invalidatsiya, ikki parallel yozuv tartibi buzilishi.",
    "",
    "### Choralar",
    "- **Delete-after-commit** (`afterCommit`).",
    "- **Delayed double delete.**",
    "- **Versiya/timestamp** bilan shartli yozish.",
    "- **Lock** qayta to'ldirishda.",
    "- **TTL** xavfsizlik to'ri.",
    "- **CDC** orqali invalidatsiya.",
    "",
    "### Izchillik talabini baholash",
    "Har ma'lumot uchun: \"eskirgan qiymat qanchalik yomon?\" (sozlama — yaxshi; balans/zaxira — yomon). Kritik ma'lumot — keshlamaslik yoki qat'iy invalidatsiya.",
    "",
    "### Read-your-writes",
    "Foydalanuvchi o'z o'zgarishini darrov ko'rishi uchun: yozgandan keyin qisqa vaqt manbadan o'qish yoki keshni darrov yangilash.",
    "",
    "### Tarqalgan tizimda",
    "Ko'p kesh qatlami (local + Redis + CDN): har birini invalidatsiya qilish; CAP: izchillik ↔ mavjudlik kompromissi.",
    "",
    "### Laravel",
    "`DB::afterCommit`, observer `$afterCommit`, `Cache::lock`, `Cache::flexible`.",
    "",
    "### Qoida",
    "Oddiyroq tanlang: qisqa TTL + delete; murakkab izchillik — alohida ehtiyoj bo'lsagina."
  ],
  "examples": [
    {
      "title": "Versiya bilan shartli yozish",
      "lang": "php",
      "code": [
        "// eski ma'lumot yangisini bosmasin",
        "$lua = <<<'LUA'",
        "local cur = tonumber(redis.call('hget', KEYS[1], 'v') or '0')",
        "if tonumber(ARGV[1]) > cur then redis.call('hmset', KEYS[1], 'v', ARGV[1], 'data', ARGV[2]); return 1 else return 0 end",
        "LUA;",
        "Redis::eval($lua, 1, \"user:{$id}\", $user->version, json_encode($user));"
      ]
    }
  ],
  "pitfalls": [
    "Strategiyaning izchillik darajasini bilmay tanlash noto'g'ri kutilmalarga olib keladi.",
    "Ko'p qatlamli keshda (local, Redis, CDN) har birini invalidatsiya qilishni unutish.",
    "Kritik ma'lumotni (balans) cache-aside + uzun TTL bilan saqlash xavfli.",
    "Qat'iy izchillik ko'pincha ortiqcha: ehtiyoj baholang."
  ]
});
