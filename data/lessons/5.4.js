/* Chuqur dars: 5.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.4", {
  "lesson": [
    "### Singleton",
    "**Singleton** — klassning **faqat bitta nusxasi** bo'lishini va unga global kirishni ta'minlaydi (`getInstance()`).",
    "",
    "### Nega ko'pincha anti-pattern",
    "- **Global holat:** yashirin bog'liqlik, testlar bir-biriga ta'sir qiladi.",
    "- **Testlash qiyin:** fake bilan almashtirib bo'lmaydi.",
    "- **SRP buzilishi:** klass ham ishini, ham o'z hayotini boshqaradi.",
    "- **Octane/Swoole/worker:** nusxa so'rovlar orasida saqlanadi: ma'lumot sizishi.",
    "- Parallel muhitda murakkab.",
    "",
    "### PHP xususiyati",
    "Klassik PHP'da har so'rov alohida jarayon: singleton faqat bir so'rov doirasida. Uzoq yashovchi jarayonlarda esa butun jarayon uchun.",
    "",
    "### To'g'ri yo'l",
    "**Container singleton:** klass oddiy yoziladi (`new` mumkin), \"bitta nusxa\" qarori container'da: `$this->app->singleton(Foo::class)`. Bog'liqlik DI orqali keladi, test uchun almashtiriladi. So'rovga xos bo'lsa `scoped`.",
    "",
    "### Qachon singleton mantiqli",
    "Ilova darajasidagi qimmat resurs (konfiguratsiya, ulanish puli, logger) — lekin container orqali.",
    "",
    "### Laravel",
    "`app()->singleton()`, `Cache`, `Log`, `DB` manager'lari container singleton. Klassik `getInstance()` singleton yozmang.",
    "",
    "### Alternativa",
    "Statik klass emas, instance + DI; yoki `readonly` konfiguratsiya obyekti."
  ],
  "examples": [
    {
      "title": "Klassik (yomon) va container",
      "lang": "php",
      "code": [
        "// YOMON: klassik singleton",
        "final class Config { private static ?self $i = null; public static function get(): self { return self::$i ??= new self(); } }",
        "",
        "// YAXSHI: oddiy klass + container singleton",
        "final class Config { public function __construct(private array $items) {} public function get(string $k): mixed { return $this->items[$k] ?? null; } }",
        "$this->app->singleton(Config::class, fn () => new Config(require base_path('config.php')));"
      ]
    }
  ],
  "pitfalls": [
    "Klassik `getInstance()` singleton global holat va test muammolarini yaratadi.",
    "Octane'da singleton ichidagi so'rovga xos holat foydalanuvchilar o'rtasida sizadi: `scoped`.",
    "`new` ni `private` qilish klassni testda almashtirishni imkonsiz qiladi.",
    "Singleton'ni 'global o'zgaruvchi o'rniga' ishlatish bog'liqlikni yashiradi."
  ]
});
