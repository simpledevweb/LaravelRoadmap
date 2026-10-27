/* Chuqur dars: 3.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.10", {
  "lesson": [
    "### Hayot davri bosqichlari",
    "1. **Yaratish:** `new Foo()`, factory/named constructor, DI container, `clone`, `unserialize`.",
    "2. **Initsializatsiya:** konstruktor ishlaydi; yaroqli holatga keladi.",
    "3. **Ishlatish:** metodlar chaqiriladi, holat o'zgaradi.",
    "4. **Yo'q qilinish:** hech kim obyektga ishora qilmay qolganda (refcount 0) `__destruct` chaqiriladi va xotira bo'shaydi.",
    "",
    "### Yaratish usullari",
    "- **Konstruktor:** to'liq yaroqli holat kafolati.",
    "- **Named constructor:** `Money::fromTiyin()`, `User::register()` — niyatni ifodalaydi.",
    "- **Factory:** murakkab yaratish mantiqi alohida klassda.",
    "- **Container:** servislarni Laravel yaratadi (singleton/scoped/bind).",
    "- **Lazy (8.4):** `ReflectionClass::newLazyGhost/newLazyProxy` — og'ir obyekt birinchi murojaatgacha initsializatsiya qilinmaydi.",
    "",
    "### Yo'q qilinish",
    "Refcount va GC (aylana bog'lanishlar uchun) xotirani bo'shatadi. `__destruct` ni resurslarni yopish uchun **yagona** vosita deb bilmang: chaqirilish vaqti aniq emas (tsikl bo'lsa GC kutadi, uzoq yashovchi jarayonda kech). Resurslarni `try/finally` bilan aniq yoping.",
    "",
    "### Servis hayot davri (Laravel)",
    "- `bind`: har safar yangi nusxa.",
    "- `singleton`: butun jarayon uchun bitta.",
    "- `scoped`: bitta so'rov/job uchun bitta (Octane uchun muhim).",
    "Uzoq yashovchi jarayonlarda singleton ichida so'rovga xos holat saqlamang.",
    "",
    "### Yaroqsiz holat",
    "Konstruktor tugaganda obyekt to'liq yaroqli bo'lishi kerak. \"Ikki bosqichli\" yaratish (`new` + `init()`) xato manbai: `init()` chaqirilmasa obyekt yaroqsiz qoladi.",
    "",
    "### Klonlash va serializatsiya",
    "`clone` sayoz nusxa (chuqur kerak bo'lsa `__clone`); `unserialize` konstruktorni chaqirmaydi, shuning uchun invariantlarni `__unserialize`/`__wakeup` da tekshiring.",
    "",
    "### Kuzatish",
    "`memory_get_usage()`, `spl_object_id`, `WeakReference` bilan obyekt hayotini kuzatish mumkin."
  ],
  "examples": [
    {
      "title": "Named constructor",
      "lang": "php",
      "code": [
        "final class User",
        "{",
        "    private function __construct(private string $email, private string $hash, private DateTimeImmutable $createdAt) {}",
        "",
        "    public static function register(string $email, string $password): self",
        "    {",
        "        filter_var($email, FILTER_VALIDATE_EMAIL) or throw new InvalidArgumentException('Email noto\\'g\\'ri');",
        "        return new self(strtolower($email), password_hash($password, PASSWORD_ARGON2ID), new DateTimeImmutable());",
        "    }",
        "}"
      ]
    },
    {
      "title": "Resursni finally bilan yopish",
      "lang": "php",
      "code": [
        "final class Report",
        "{",
        "    public function save(string $path, string $data): void",
        "    {",
        "        $h = fopen($path, 'w') ?: throw new RuntimeException(\"Ochilmadi: $path\");",
        "        try { fwrite($h, $data); }",
        "        finally { fclose($h); }          // destruct'ga tayanmaymiz",
        "    }",
        "}"
      ]
    },
    {
      "title": "Scoped binding",
      "lang": "php",
      "code": [
        "$this->app->scoped(TenantContext::class);          // har so'rovda yangi",
        "$this->app->singleton(Clock::class, fn () => new SystemClock());   // butun jarayon uchun"
      ]
    }
  ],
  "pitfalls": [
    "`__destruct` chaqirilish vaqti kafolatlanmaydi: resurslarni `try/finally` bilan aniq yoping.",
    "Ikki bosqichli yaratish (`new` + `init()`) yaroqsiz obyektga yo'l ochadi: konstruktorda to'liq initsializatsiya qiling.",
    "Octane/worker'da singleton ichida so'rovga xos holat saqlash ma'lumot sizishiga olib keladi: `scoped`.",
    "`unserialize` konstruktorni chaqirmaydi: invariantlar buzilgan obyekt hosil bo'lishi mumkin."
  ]
});
