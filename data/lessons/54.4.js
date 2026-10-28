/* Chuqur dars: 54.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.4", {
  "lesson": [
    "### Write-Behind (Write-Back)",
    "Yozish **faqat keshga** (tez), manbaga (DB) esa **keyinroq, asinxron** (batch/queue) yoziladi. Yozish juda tez, DB yuki kamayadi.",
    "",
    "### Oqim",
    "```",
    "write: cache.set → (javob) ... fonda: queue/timer → DB.write (bo'laklab)",
    "```",
    "",
    "### Afzalliklari",
    "- Yozish latency juda past.",
    "- DB'ga **batch** (kam so'rov, birlashtirish: bir qatorga ko'p yangilanish bitta yozuvga).",
    "- DB vaqtincha ishlamasa ham yozish qabul qilinadi.",
    "- Yuqori yozish yuklamasi (hisoblagich, telemetriya, log).",
    "",
    "### Kamchiliklari (jiddiy)",
    "- **Ma'lumot yo'qotish xavfi:** kesh yiqilsa DB'ga yetmagan yozuvlar **yo'qoladi** (Redis persistence/AOF, replikatsiya kerak).",
    "- **Eventual consistency:** DB hozircha eski; boshqa tizim DB'dan o'qisa eskirgan ma'lumot.",
    "- Murakkab: tartib, xatolar, qayta urinish, dublikatlar.",
    "- Keshdan o'qib bo'lmaydigan (evicted) yozilmagan ma'lumot — yo'qotish.",
    "",
    "### Qachon mos",
    "Yo'qotilishi xavfsiz yoki qayta tiklanadigan ma'lumot: ko'rishlar soni, like, sessiya faoliyati, metrikalar. **Moliya/buyurtma** uchun emas.",
    "",
    "### Laravel'da",
    "- Hisoblagich: `Redis::incr(\"views:{$id}\")` → har daqiqa `schedule` jobi bo'laklab DB'ga `UPDATE ... SET views = views + n`.",
    "- Hodisalarni queue orqali DB'ga yozish.",
    "- `eviction`: `noeviction` bu kalitlarda (yozilmagan ma'lumot o'chmasin).",
    "",
    "### Xavfsizlik chorasi",
    "AOF `everysec`, replikatsiya, \"dirty\" kalitlar ro'yxati, davriy flush, idempotent yozish."
  ],
  "examples": [
    {
      "title": "Hisoblagich: write-behind",
      "lang": "php",
      "code": [
        "// so'rovda: faqat Redis",
        "Redis::incr(\"views:post:{$id}\");",
        "",
        "// schedule: har daqiqa DB'ga yozish",
        "Schedule::call(function () {",
        "    foreach (Redis::keys('views:post:*') as $key) {",
        "        $n = (int) Redis::getdel($key);",
        "        if ($n) { Post::whereKey((int) Str::afterLast($key, ':'))->increment('views', $n); }",
        "    }",
        "})->everyMinute();"
      ]
    }
  ],
  "pitfalls": [
    "Kesh yiqilsa DB'ga yetmagan yozuvlar yo'qoladi: persistence/replikatsiya.",
    "Moliyaviy/buyurtma ma'lumoti uchun write-behind yaroqsiz (yo'qotish xavfi).",
    "Eviction yozilmagan kalitlarni o'chirib yuborishi mumkin: `noeviction`/alohida instance.",
    "Flush xatosi bo'lsa qayta urinish va dublikat (idempotentlik) hisobga olinsin."
  ]
});
