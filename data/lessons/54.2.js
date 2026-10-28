/* Chuqur dars: 54.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.2", {
  "lesson": [
    "### Read-Through",
    "Kesh **o'zi** (kesh qatlami yoki kutubxona) miss bo'lganda manbadan yuklaydi: ilova faqat keshdan so'raydi. Yuklash mantig'i kesh provayderida (loader funksiya).",
    "",
    "### Cache-aside bilan farq",
    "- **Cache-aside:** ilova miss'ni tekshiradi va DB'dan oladi.",
    "- **Read-through:** ilova \"keshdan ber\" deydi, kesh o'zi DB'ga boradi.",
    "",
    "### Foydasi",
    "Ilova kodi sodda (kesh mantig'i bir joyda), bir xil yuklash mantig'i, stampede himoyasini kesh qatlami o'z ichiga olishi mumkin (bitta yuklovchi).",
    "",
    "### Kamchiligi",
    "Kesh provayderi manba (DB) bilan integratsiyani bilishi kerak; Redis o'zi bunday qilmaydi (kutubxona/proksi kerak).",
    "",
    "### Laravel'da",
    "`Cache::remember()` — aslida ilova darajasidagi read-through ko'rinishi: loader closure berasiz. Repository/dekorator bilan formal read-through:",
    "```php",
    "final class CachedUserRepo implements UserRepo {",
    "    public function find(int $id): ?User { return $this->cache->remember(\"u:$id\", 600, fn () => $this->inner->find($id)); }",
    "}",
    "```",
    "(Decorator pattern: 5.6.)",
    "",
    "### Tashqi vositalar",
    "Hazelcast, Coherence, AWS DAX (DynamoDB), Redis Gears/modullar read-through qo'llaydi.",
    "",
    "### Qachon",
    "Ko'p joyda bir xil keshlash mantig'i; kesh qatlamini abstraksiyalash kerak.",
    "",
    "### Muammolar",
    "Eskirish, miss paytida kechikish, kesh va manba sxemasi bog'liqligi."
  ],
  "examples": [
    {
      "title": "Decorator bilan read-through",
      "lang": "php",
      "code": [
        "final class CachedUserRepo implements UserRepo",
        "{",
        "    public function __construct(private UserRepo $inner, private CacheInterface $cache) {}",
        "    public function find(int $id): ?User",
        "    {",
        "        return $this->cache->remember(\"user:$id\", 600, fn () => $this->inner->find($id));",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Redis o'zi read-through qilmaydi: loader mantig'ini kutubxona/dekorator qatlamida yozing.",
    "Read-through ham eskirish va stampede muammosidan holi emas.",
    "Kesh qatlami va manba sxemasi bir-biriga qattiq bog'lanishi mumkin.",
    "Oddiy holatda `Cache::remember` yetarli: ortiqcha abstraksiya qilmang."
  ]
});
