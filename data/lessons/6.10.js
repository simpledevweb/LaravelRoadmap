/* Chuqur dars: 6.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.10", {
  "lesson": [
    "### Tushuncha",
    "**Explicit Dependencies:** klass kerakli bog'liqliklarini **aniq e'lon qilsin** (konstruktor/metod parametri), yashirin manbadan (global, static, `app()`, Facade ichkarida) olmasin.",
    "",
    "### Yashirin bog'liqlik belgilari",
    "- Metod ichida `app(Foo::class)`, `Auth::user()`, `Config::get()`, `Cache::get()`.",
    "- `global $x`, `$_SESSION` to'g'ridan-to'g'ri servis ichida.",
    "- `new Konkret()` ichkarida.",
    "- `static` holat.",
    "",
    "### Nima uchun yomon",
    "- Klass nimaga muhtojligi imzodan ko'rinmaydi.",
    "- Test uchun fake berish qiyin (Facade mock, global holat).",
    "- Octane'da holat sizishi.",
    "- Qayta ishlatish qiyin.",
    "",
    "### Qanday tuzatish",
    "Konstruktor orqali bering (Dependency Injection):",
    "- `__construct(private Mailer $mailer, private ClockInterface $clock)`.",
    "- Vaqt (`now()`), tasodifiylik (`random_int`), joriy foydalanuvchi — aniq parametr sifatida (test uchun).",
    "",
    "### Konstruktor ko'payishi",
    "6–7 dan ortiq bog'liqlik: klass ko'p ish qilmoqda (SRP), ajrating.",
    "",
    "### Laravel kontekstida",
    "Facade qulay, lekin servis/domen klasslarida konstruktor DI afzal. Controller va provider (composition root) da `app()`/Facade qabul qilinadi.",
    "",
    "### Funksiya darajasida",
    "Aniq kirish: funksiya natijasi faqat parametrlarga bog'liq bo'lsin (pure). `now()` o'rniga `DateTimeImmutable $now` parametri."
  ],
  "examples": [
    {
      "title": "Yashirin → aniq",
      "lang": "php",
      "code": [
        "// YASHIRIN",
        "final class Invoice { public function isOverdue(): bool { return $this->due < now() && Auth::user()->isActive(); } }",
        "",
        "// ANIQ",
        "final class Invoice",
        "{",
        "    public function isOverdue(DateTimeImmutable $now): bool { return $this->due < $now; }",
        "}",
        "final class OverdueCheck { public function __construct(private ClockInterface $clock) {} public function __invoke(Invoice $i): bool { return $i->isOverdue($this->clock->now()); } }"
      ]
    }
  ],
  "pitfalls": [
    "Servis ichida `app()`/Facade yashirin bog'liqlik: testda fake berish qiyin.",
    "`now()`/`random_int` ni ichkarida chaqirish testni deterministik emas qiladi: parametr/Clock kiriting.",
    "7+ konstruktor bog'liqligi klass ko'p ish qilayotganini bildiradi.",
    "Singleton/static ichida holat saqlash Octane'da sizib ketadi."
  ]
});
