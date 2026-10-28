/* Chuqur dars: 54.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.14", {
  "lesson": [
    "### Negative caching",
    "\"**Topilmadi**\" natijasini ham keshlash: mavjud bo'lmagan ma'lumotga takroriy so'rovlar DB'ga bormasin (cache penetration, 54.10).",
    "",
    "### Qanday",
    "Maxsus qiymat (**sentinel**) saqlanadi: `false`, `'__null__'`, bo'sh massiv. Laravel `Cache::remember` `null`ni keshlamaydi (miss deb hisoblaydi), shuning uchun `false`/sentinel ishlatiladi.",
    "",
    "### TTL",
    "**Qisqa** (30–120 s): ma'lumot keyin paydo bo'lishi mumkin (yangi foydalanuvchi, yangi mahsulot). Yaratishda keshni o'chiring (`forget`).",
    "",
    "### Qayerda",
    "- ID bo'yicha qidiruv (\"yo'q\").",
    "- Bo'sh natijali qidiruv/filtr.",
    "- Mavjud bo'lmagan subdomen/slug.",
    "- Tashqi API 404 (qayta so'ramaslik).",
    "- HTTP 404/410 CDN keshi.",
    "",
    "### Misol",
    "```php",
    "$p = Cache::remember(\"product:{$id}\", 60, fn () => Product::find($id) ?? false);",
    "abort_if($p === false, 404);",
    "```",
    "",
    "### Xatolar",
    "- Uzun TTL: yangi yaratilgan yozuv ko'rinmaydi.",
    "- `null`ni keshlashga urinish (ishlamaydi).",
    "- Yaratishda negative kalitni o'chirmaslik.",
    "- Cheksiz xilma-xil mavjud bo'lmagan kalitlar xotirani to'ldiradi (hujum): TTL qisqa + rate limit + validatsiya.",
    "",
    "### Boshqa",
    "Bo'sh natija ro'yxatini (`[]`) keshlash ham negative caching; `Cache::has()` `null` qiymatda `false` qaytaradi — shuning uchun sentinel."
  ],
  "examples": [
    {
      "title": "Sentinel",
      "lang": "php",
      "code": [
        "const NOT_FOUND = '__none__';",
        "$val = Cache::remember(\"slug:{$slug}\", 60, fn () => Post::where('slug', $slug)->first() ?? NOT_FOUND);",
        "abort_if($val === NOT_FOUND, 404);",
        "",
        "// yaratilganda",
        "Cache::forget(\"slug:{$post->slug}\");"
      ]
    }
  ],
  "pitfalls": [
    "Uzun TTL bilan negative cache yangi yaratilgan yozuvni ko'rsatmaydi: qisqa TTL va yaratishda `forget`.",
    "`Cache::remember` `null`ni keshlamaydi: sentinel/`false`.",
    "Cheksiz xilma-xil mavjud bo'lmagan kalitlar xotirani to'ldiradi: rate limit va validatsiya.",
    "Sentinel qiymatni oddiy ma'lumot sifatida qaytarib yuborish xatosi."
  ]
});
