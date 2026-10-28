/* Chuqur dars: 54.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.17", {
  "lesson": [
    "### DB query caching haqida",
    "Natijani keshlashning o'zi emas, **qachon va qanday** — muhim.",
    "",
    "### MySQL Query Cache — yo'q",
    "MySQL 5.7'gacha mavjud edi, **8.0'da olib tashlangan** (invalidatsiya va parallellik muammosi). Eski maslahatlarga (`query_cache_size`) tayanmang.",
    "",
    "### Ilova darajasida keshlash",
    "`Cache::remember` bilan **natija**ni keshlash — eng yaxshi nazorat. Nimani keshlash:",
    "- **Qimmat** (agregat, murakkab join) va **ko'p o'qiladigan**.",
    "- **Kam o'zgaradigan** ma'lumot.",
    "- **Keshlamaslik:** tez-tez o'zgaradigan, foydalanuvchiga xos va xilma-xil, moliyaviy (qat'iy to'g'ri).",
    "",
    "### Nimani saqlash",
    "- Natijaning **minimal** shakli (ID ro'yxati yoki DTO), butun Eloquent kolleksiyasi emas (serializatsiya hajmi, eskirgan model).",
    "- Ro'yxatda faqat ID'lar + obyektlar alohida keshda (obyekt o'zgarsa ro'yxat yangilanmaydi).",
    "",
    "### DB'ning o'z keshlari",
    "- **InnoDB buffer pool** — sahifalar keshi (asosiy; `innodb_buffer_pool_size`).",
    "- PostgreSQL `shared_buffers` + OS page cache.",
    "- Natija keshi yo'q: so'rov har safar bajariladi (lekin sahifalar xotirada).",
    "",
    "### Prepared statement keshi",
    "Parse/rejani qayta ishlatish (ilova/driver darajasida), natija keshi emas.",
    "",
    "### Materialized view / jamlama jadval",
    "Murakkab agregatni **oldindan hisoblab saqlash** (PostgreSQL materialized view; MySQL'da jadval + yangilash jobi) — kesh o'rniga ishonchli muqobil.",
    "",
    "### Laravel",
    "`Cache::remember`, `cacheFor()` (paketlar: `rennokki/laravel-eloquent-query-cache`), `remember()` query builder'da yo'q (paket). Pagination keshi: sahifa + filtr kalitda.",
    "",
    "### Xavf",
    "Eskirgan ma'lumot, invalidatsiya, kalit xilma-xilligi (filtr kombinatsiyalari: kesh to'lishi, past hit ratio)."
  ],
  "examples": [
    {
      "title": "Natijani keshlash",
      "lang": "php",
      "code": [
        "$ids = Cache::remember(\"top:products:ids\", 300, fn () => Product::orderByDesc('sold')->limit(20)->pluck('id')->all());",
        "$products = Product::whereIn('id', $ids)->get()->sortBy(fn ($p) => array_search($p->id, $ids))->values();"
      ]
    }
  ],
  "pitfalls": [
    "MySQL 8.0'da Query Cache yo'q: eski maslahatlar yaroqsiz.",
    "Butun Eloquent kolleksiyasini keshlash serializatsiya hajmi va eskirishni oshiradi.",
    "Filtr kombinatsiyalari ko'p bo'lsa kalitlar xilma-xil, hit ratio past va xotira to'ladi.",
    "Qat'iy to'g'ri bo'lishi kerak ma'lumotni (balans) keshlash noto'g'ri qiymat beradi."
  ]
});
