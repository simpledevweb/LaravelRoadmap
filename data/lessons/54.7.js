/* Chuqur dars: 54.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.7", {
  "lesson": [
    "### Invalidatsiya strategiyalari",
    "(Asos: 12.5.) Kesh ma'lumotini manba o'zgarganda yangilash/o'chirish.",
    "",
    "### Usullar",
    "1. **TTL (vaqtga asoslangan):** eng sodda; eskirish oynasi TTL'ga teng.",
    "2. **Hodisaga asoslangan (explicit):** yozishda `forget`/`delete` (observer, event). Tez, lekin unutilishi mumkin.",
    "3. **Tag/guruh:** `Cache::tags(['posts'])->flush()` (Redis/Memcached).",
    "4. **Versiyalangan/namespace kalit:** `posts:v{N}`; N oshirilganda eski kalitlar \"yo'qoladi\" (TTL bilan tozalanadi).",
    "5. **Write-through:** yozishda kesh yangilanadi.",
    "6. **CDC** (binlog/Debezium): DB o'zgarishidan keshni tozalash — ilovadan mustaqil.",
    "7. **Purge (CDN):** URL/tag bo'yicha (54.16).",
    "",
    "### Qaysi kalitlar ta'sirlanadi",
    "Bitta yozuv: obyekt keshi, ro'yxatlar, hisoblagichlar, qidiruv natijalari. Bog'liqlik xaritasi (yoki tag) yo'q bo'lsa eskirgan ro'yxat qoladi.",
    "",
    "### Delete yoki update",
    "Odatda **delete** (poyga kam); update — qimmat qayta hisoblashni oldini olish uchun.",
    "",
    "### Poyga",
    "Commit'dan keyin invalidatsiya (`afterCommit`), delayed double delete, qisqa TTL (12.20).",
    "",
    "### Oddiylashtirish",
    "Murakkab invalidatsiya o'rniga qisqa TTL + oddiy delete; ro'yxat/agregatlarni qisqa TTL bilan.",
    "",
    "### Laravel",
    "Observer + `Cache::forget`, `Cache::tags`, `afterCommit`, model `touches`."
  ],
  "examples": [
    {
      "title": "Versiyalangan kalit",
      "lang": "php",
      "code": [
        "$v = Cache::get('posts:ver', 1);",
        "$posts = Cache::remember(\"posts:list:v{$v}:p1\", 600, fn () => Post::latest()->limit(20)->get());",
        "// yozishda: butun ro'yxat kalitlarini bir zumda \"eskirtirish\"",
        "Cache::increment('posts:ver');"
      ]
    }
  ],
  "pitfalls": [
    "Bitta yozuv ta'sir qiladigan hamma kalitlarni (ro'yxat, hisoblagich) unutish eskirgan ma'lumot qoldiradi.",
    "Invalidatsiya commit'dan oldin bajarilsa poyga beradi.",
    "Tag `file`/`database` driver'da ishlamaydi.",
    "Versiyalangan kalitlarning eskisi TTL'siz xotirada qoladi: TTL bering."
  ]
});
