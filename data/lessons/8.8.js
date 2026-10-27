/* Chuqur dars: 8.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.8", {
  "lesson": [
    "### PSR-16: Simple Cache",
    "Soddalashtirilgan kesh interface'i: `Psr\\SimpleCache\\CacheInterface`:",
    "- `get($key, $default = null)`, `set($key, $value, $ttl = null)`, `delete($key)`, `clear()`, `has($key)`.",
    "- Ommaviy: `getMultiple()`, `setMultiple()`, `deleteMultiple()`.",
    "Istisno: `InvalidArgumentException` (noto'g'ri kalit).",
    "",
    "### Kalitlar",
    "Satr, `A-Za-z0-9_.` belgilari kafolatlanadi (kamida 64 belgi). **Zaxiralangan belgilar:** `{}()/\\@:` ishlatilmaydi. Kalit tuzishda prefiks/versiya (`user:5:v2` o'rniga `user.5.v2`).",
    "",
    "### TTL",
    "`null` (implementatsiya default), `int` (soniya) yoki `DateInterval`. `0` yoki manfiy — darrov yaroqsiz.",
    "",
    "### Qiymatlar",
    "Serializatsiya qilinadigan har qanday tur. `get` qiymat `null` bo'lsa `has()` bilan farqlang, yoki `default` sentinel ishlating.",
    "",
    "### PSR-6 bilan farq",
    "PSR-6 (Cache Pool/Item) kengroq va murakkabroq (deferred save, item); PSR-16 oddiy `get/set`.",
    "",
    "### Laravel'da",
    "`Illuminate\\Contracts\\Cache\\Repository` PSR-16 ning `CacheInterface` ini kengaytiradi: `Cache::get/set/delete` mos. Laravel qo'shimcha: `remember`, `rememberForever`, `tags`, `lock`, `increment`.",
    "",
    "### Qoidalar",
    "- Kesh yolg'on bo'lishi mumkin (eskirgan): invalidatsiyani rejalashtiring.",
    "- Kesh ochirilganda ilova ishlashi kerak (graceful).",
    "- Stampede (ommaviy bir vaqtda qayta hisoblash) uchun `lock`.",
    "- Kalitni namespace/versiya bilan."
  ],
  "examples": [
    {
      "title": "PSR-16 bilan kesh",
      "lang": "php",
      "code": [
        "use Psr\\SimpleCache\\CacheInterface;",
        "",
        "final class CachedRates",
        "{",
        "    public function __construct(private CacheInterface $cache, private RatesApi $api) {}",
        "    public function usd(): float",
        "    {",
        "        $v = $this->cache->get('rates.usd');",
        "        if ($v === null) {",
        "            $v = $this->api->usd();",
        "            $this->cache->set('rates.usd', $v, new DateInterval('PT10M'));",
        "        }",
        "        return $v;",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Kalitda `{}()/\\@:` belgilari ishlatilmaydi (PSR-16 zaxira).",
    "`null` qiymat va 'topilmadi' farqlanmaydi: `has()` yoki sentinel.",
    "Kesh stampede: ko'p so'rov bir vaqtda qayta hisoblaydi: lock.",
    "TTL'siz kesh abadiy eskirishi mumkin: invalidatsiya strategiyasi."
  ]
});
