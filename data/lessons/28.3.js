/* Chuqur dars: 28.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.3", {
  "lesson": [
    "### Redis kodi nega alohida test talab qiladi",
    "Redis ishlatadigan kod ko'p: cache, lock, rate limiter, navbat, sessiya, Lua skriptlar. Testlarda `CACHE_STORE=array` qulay, lekin `array` driver Redis'ning xatti-harakatini to'liq takrorlamaydi: Lua skriptlar ishlamaydi, bir nechta jarayon orasidagi raqobat yo'q, Redis'ga xos buyruqlar (`SET NX`, `ZADD`, `INCRBY`) tekshirilmaydi, kalitlar prefiksi va serializatsiya ko'rinmaydi.",
    "",
    "### Nimani haqiqiy Redis bilan sinash kerak",
    "- **Lock va raqobat**: ikkinchi egasi lock olmasligi, lock avtomatik tugashi (TTL), `release()` dan keyin qayta olinishi.",
    "- **TTL**: kalit muddatidan keyin yo'qolishi. Haqiqiy kutish o'rniga qisqa TTL (1–2 soniya) yoki vaqtni boshqarish ishlatiladi.",
    "- **Atomiklik**: `SET NX`, `INCR`, Lua skript natijasi to'g'ri bo'lishi.",
    "- **Rate limiter**: oyna ichida limitdan oshganda rad etilishi.",
    "- **Serializatsiya**: obyekt cache'ga yozilib, qayta o'qilganda to'g'ri tiklanishi.",
    "",
    "### Izolyatsiya",
    "Test Redis'i dev ma'lumotlariga tegmasligi shart. Usullar: alohida DB raqami (masalan, 15), alohida kalit prefiksi, parallel testlarda jarayon token'ini prefiksga qo'shish. Har testdan oldin yoki keyin faqat shu test DB'sini `flushdb` bilan tozalang. Hech qachon `flushall` ishlatmang: u barcha DB'larni o'chiradi.",
    "",
    "### CI'da",
    "CI'da Redis service container ko'taring va ulanish tayyorligini kuting (health check). Lokal ishlab chiquvchi uchun `docker compose` bilan bitta komanda yetarli bo'lsin.",
    "",
    "### Qachon array driver yetarli",
    "Cache'ning mantiqiy qatlami (masalan, \"cache'da bor bo'lsa DB'ga bormaslik\") uchun array driver tez va qulay. Faqat Redis'ga xos xatti-harakatni tekshiradigan kam sonli testlarni alohida guruhga (`->group('redis')`) ajrating va ularni CI'da doim ishga tushiring."
  ],
  "examples": [
    {
      "title": "Lock raqobati",
      "lang": "php",
      "code": [
        "it('allows only one holder of the lock', function () {",
        "    $a = Cache::store('redis')->lock('report', 10);",
        "    $b = Cache::store('redis')->lock('report', 10);",
        "",
        "    expect($a->get())->toBeTrue()",
        "        ->and($b->get())->toBeFalse();",
        "",
        "    $a->release();",
        "",
        "    expect($b->get())->toBeTrue();",
        "    $b->release();",
        "})->group('redis');"
      ],
      "note": "Ikkinchi lock birinchisi bo'shamaguncha olinmaydi."
    },
    {
      "title": "Test Redis'ini tozalash",
      "lang": "php",
      "code": [
        "// phpunit.xml: <env name=\"REDIS_DB\" value=\"15\"/> <env name=\"REDIS_PREFIX\" value=\"test_\"/>",
        "",
        "beforeEach(function () {",
        "    Redis::connection('default')->flushdb(); // faqat test DB'si",
        "});",
        "",
        "it('expires the cached token after its ttl', function () {",
        "    Cache::store('redis')->put('token', 'abc', 1);",
        "    expect(Cache::store('redis')->get('token'))->toBe('abc');",
        "",
        "    sleep(2);",
        "    expect(Cache::store('redis')->get('token'))->toBeNull();",
        "})->group('redis');"
      ],
      "note": "Qisqa TTL va sleep testni sekinlashtiradi, shuning uchun bunday testlar kam bo'lsin."
    }
  ],
  "pitfalls": [
    "Lock mantig'ini faqat `array` driver bilan tekshirish: bir jarayonli test haqiqiy raqobatni ko'rsatmaydi.",
    "Test paytida dev yoki production Redis'iga ulanib qolish va `flushdb` qilish: DB raqami va prefiksni testda majburan tekshiring.",
    "`flushall` ishlatish: u boshqa DB'lardagi ma'lumotlarni ham o'chiradi.",
    "Parallel testlarda umumiy kalitlar: jarayonlar bir-birining kalitini o'zgartirib, tasodifiy yiqiladigan testlar paydo bo'ladi."
  ]
});
