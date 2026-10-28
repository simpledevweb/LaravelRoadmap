/* Chuqur dars: 54.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.8", {
  "lesson": [
    "### Cache tags",
    "Bir nechta kesh yozuvini **guruh (teg)** bilan belgilab, guruhni **birdan o'chirish**. Laravel: `Cache::tags(['posts', 'user:5'])->put(...)`, `->flush()`.",
    "",
    "### Qanday ishlaydi",
    "Kalitlar teglar bo'yicha namespace'ga ega bo'ladi; teg \"flush\" qilinganda uning identifikatori o'zgaradi va eski kalitlar o'qilmaydi (haqiqiy o'chirish keyin TTL/eviction bilan).",
    "",
    "### Foydasi",
    "- Bog'liq kalitlarni (ro'yxat, obyekt, qidiruv) bitta amal bilan invalidatsiya.",
    "- Kod soddalashadi (har kalitni sanab chiqish shart emas).",
    "",
    "### Cheklovlar",
    "- Faqat `redis`, `memcached` (va `array`) driver'lar: `file`, `database`, `dynamodb` yo'q.",
    "- `Cache::tags(['a','b'])->get('k')` o'qishda ham **aynan shu teglar** bilan.",
    "- `flush()` faqat o'sha teg(lar) yozuvlarini (butun keshni emas — `Cache::flush()` esa hammasini).",
    "- Tegli kalitlar qo'shimcha xotira/overhead (teg ro'yxatlari), Redis Cluster'da qiyinroq.",
    "- Eski (flush qilingan) kalitlar TTL/eviction gacha xotirada.",
    "",
    "### Amaliyot",
    "Kam sonli mantiqiy guruh: `posts`, `user:{id}`, `tenant:{id}`. Ko'p teg (minglab) — samarasiz.",
    "",
    "### Muqobil",
    "Versiyalangan namespace kalit (`posts:v{N}`), aniq `forget` ro'yxati.",
    "",
    "### Laravel",
    "```php",
    "Cache::tags(['posts', \"user:{$uid}\"])->remember(\"feed:{$uid}\", 300, fn () => Post::feed($uid));",
    "Cache::tags(['posts'])->flush();       // hamma post keshlari",
    "```"
  ],
  "examples": [
    {
      "title": "Tag",
      "lang": "php",
      "code": [
        "Cache::tags(['posts', \"author:{$authorId}\"])->put(\"post:{$id}\", $post, 600);",
        "Cache::tags(['posts', \"author:{$authorId}\"])->get(\"post:{$id}\");     // o'qishda ham teglar",
        "Cache::tags([\"author:{$authorId}\"])->flush();                        // faqat shu muallif"
      ]
    }
  ],
  "pitfalls": [
    "`Cache::tags` `file`/`database` driver'larda ishlamaydi.",
    "Tegli kalitni o'qishda teglarni berishni unutish `null` qaytaradi.",
    "Minglab teg samarasiz va xotira talab qiladi.",
    "`Cache::flush()` barcha keshni o'chiradi (teg emas): ehtiyot."
  ]
});
