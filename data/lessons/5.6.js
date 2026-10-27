/* Chuqur dars: 5.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.6", {
  "lesson": [
    "### Decorator",
    "**Decorator** — obyektni bir xil interface'ni saqlab **o'rab**, unga xulq-atvor qo'shadi (kesh, log, retry, transaction). Meros o'rniga kompozitsiya orqali runtime'da kengaytirish.",
    "",
    "### Tuzilma",
    "`Component` interface; `ConcreteComponent`; `Decorator implements Component` ichida boshqa `Component` ni saqlaydi va chaqiruvni delegatsiya qiladi, oldin/keyin o'z ishini qo'shadi. Decoratorlarni zanjirga ulash mumkin.",
    "",
    "### Qachon",
    "- Xulq-atvorni qo'shish/olib tashlash runtime'da.",
    "- Kombinatsiyalar ko'p (kesh + log + retry): meros bilan klass portlashi.",
    "- Mavjud klassni o'zgartirmasdan kengaytirish (OCP).",
    "",
    "### Laravel'da",
    "- **Middleware** zanjiri (so'rovni o'rash).",
    "- `Cache::remember` o'rniga repository decorator.",
    "- `$this->app->extend(Service::class, fn ($s) => new Decorated($s))`.",
    "- Queue job middleware (`RateLimited`, `WithoutOverlapping`).",
    "",
    "### Tartib muhim",
    "`Logged(Cached(Db))` va `Cached(Logged(Db))` turli natija: tashqi qatlam birinchi ishlaydi.",
    "",
    "### Adapter bilan farq",
    "Decorator interface'ni **saqlaydi**, Adapter **o'zgartiradi**.",
    "",
    "### Ehtiyot",
    "Interface kengaysa barcha decoratorlar o'zgaradi; juda uzun zanjir debug'ni qiyinlashtiradi."
  ],
  "examples": [
    {
      "title": "Kesh decorator",
      "lang": "php",
      "code": [
        "interface PriceProvider { public function price(string $sku): int; }",
        "",
        "final class DbPriceProvider implements PriceProvider { public function price(string $sku): int { return Product::where('sku', $sku)->value('price'); } }",
        "",
        "final class CachedPriceProvider implements PriceProvider",
        "{",
        "    public function __construct(private PriceProvider $inner, private \\Psr\\SimpleCache\\CacheInterface $cache) {}",
        "    public function price(string $sku): int",
        "    {",
        "        return $this->cache->get(\"price:$sku\") ?? tap($this->inner->price($sku), fn ($p) => $this->cache->set(\"price:$sku\", $p, 300));",
        "    }",
        "}",
        "$this->app->extend(PriceProvider::class, fn ($p, $app) => new CachedPriceProvider($p, $app->make('cache.store')));"
      ]
    }
  ],
  "pitfalls": [
    "Interface kengayganda barcha decoratorlarni yangilash kerak: interface kichik bo'lsin.",
    "Decorator tartibi natijaga ta'sir qiladi (log/kesh): ongli tanlang.",
    "Juda uzun zanjir debug'ni qiyinlashtiradi.",
    "Decorator ichida o'rab olgan obyektning ichki holatiga murojaat qilmang."
  ]
});
