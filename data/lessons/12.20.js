/* Chuqur dars: 12.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.20", {
  "lesson": [
    "### Cache consistency",
    "Kesh va manba (DB) **mos kelishi**. Aslida ko'pincha **eventual consistency**: qisqa vaqt eskirgan ma'lumot qabul qilinadi.",
    "",
    "### Poyga holatlari",
    "1. **O'qish-yozish poygasi:** A keshni to'ldirish uchun DB'dan eski qiymatni o'qidi → B DB'ni yangiladi va keshni o'chirdi → A eski qiymatni keshga yozdi (eskirgan kesh qoldi).",
    "2. **Update vs delete:** keshni **yangilash** (set) poyga ehtimolini oshiradi; **o'chirish** (delete) xavfsizroq.",
    "3. **Tranzaksiya:** keshni commit'dan **oldin** o'chirsangiz, boshqa so'rov hali yangilanmagan DB'dan eski qiymatni keshlaydi.",
    "",
    "### Yechimlar",
    "- **Delete-after-write** (DB yozildi → commit → kesh o'chirildi): `afterCommit`.",
    "- **Delayed double delete:** o'chirish → qisqa kutish → yana o'chirish.",
    "- **TTL xavfsizlik to'ri:** noto'g'ri holat TTL gacha.",
    "- **Versiya/timestamp:** keshga versiya bilan yozish (eski versiya bilan ustiga yozishni rad etish: Lua).",
    "- **Lock** qayta to'ldirishda (`Cache::lock`): bitta jarayon DB'ga boradi.",
    "- **CDC/hodisa oqimi** (binlog → keshni tozalash): manbaga bog'liq.",
    "- Ma'lumot hujjati: qaysi kesh qancha eskirishi mumkin (SLA).",
    "",
    "### O'qish-o'z yozuvini ko'rish (read-your-writes)",
    "Foydalanuvchi o'z o'zgarishini darrov ko'rishi kerak: yozgandan keyin kesh/replika o'rniga manbadan o'qing (qisqa vaqt).",
    "",
    "### Trade-off",
    "Qat'iy izchillik = ko'p murakkablik/kechikish; ko'p holatda qisqa TTL + delete yetarli. Moliyaviy/zaxira ma'lumotini keshlamang yoki qat'iy invalidatsiya.",
    "",
    "### Laravel",
    "`afterCommit` (observer/event/job), `DB::afterCommit(fn () => Cache::forget(...))`, `Cache::lock`, `Cache::flexible`."
  ],
  "examples": [
    {
      "title": "Commit'dan keyin invalidatsiya",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($post, $data) {",
        "    $post->update($data);",
        "    DB::afterCommit(fn () => Cache::forget(\"post:{$post->id}\"));   // commit'dan keyin",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Keshni commit'dan oldin o'chirish eski qiymatni qayta keshlashga olib keladi.",
    "Keshni yangilash (set) o'chirishdan ko'ra poygaga moyil.",
    "Qat'iy izchillikni kutish keraksiz murakkablik beradi: eventual consistency + TTL.",
    "Zaxira/balans kabi muhim ma'lumotni keshlash noto'g'ri qiymatga olib keladi."
  ]
});
