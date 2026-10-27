/* Chuqur dars: 5.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.18", {
  "lesson": [
    "### Dependency Injection (pattern sifatida)",
    "DI — obyekt o'z bog'liqliklarini **tashqaridan** oladi. Bu **Inversion of Control** ning shakli: obyektni kim yaratishini nazorat qiluvchi tashqi kod (container). (Chuqur tahlil: OOP bo'limidagi \"Dependency Injection\" mavzusida.)",
    "",
    "### Usullar",
    "- **Constructor injection** (asosiy).",
    "- **Setter injection** (ixtiyoriy bog'liqlik).",
    "- **Method/parameter injection** (bitta metodga kerak).",
    "- **Interface injection** (kam ishlatiladi).",
    "",
    "### Pattern'lar bilan aloqa",
    "DI boshqa pattern'larni ishlatish imkonini beradi: Strategy (strategiyani berish), Decorator (zanjirni container'da yig'ish), Repository (interface orqali), Factory (yaratishni container'ga topshirish).",
    "",
    "### Container (IoC)",
    "Reflection orqali konstruktor tiplarini o'qib, bog'liqliklarni avtomatik yaratadi (autowiring). Laravel: `bind`, `singleton`, `scoped`, `when()->needs()->give()`, `tag`, `extend`.",
    "",
    "### Service Locator bilan farq",
    "- **DI:** bog'liqlik tashqaridan **beriladi** (aniq).",
    "- **Service Locator:** obyekt o'zi `app(X::class)` bilan **so'raydi** (yashirin).",
    "Locator test va tushunishni qiyinlashtiradi.",
    "",
    "### Composition root",
    "Obyekt grafi yig'iladigan **bitta joy** (service provider, `bootstrap`). Qolgan kod container'ni bilmaydi.",
    "",
    "### Qoidalar",
    "Konstruktorda ish qilmang, 7+ bog'liqlik bo'lsa ajrating, singleton'da so'rovga xos holat saqlamang."
  ],
  "examples": [
    {
      "title": "Qo'lda va container",
      "lang": "php",
      "code": [
        "// Qo'lda yig'ish (composition root)",
        "$checkout = new CheckoutService(new StripeGateway($key), new EloquentOrderRepository(), new SmtpMailer());",
        "",
        "// Laravel: avtomatik",
        "final class CheckoutController { public function store(Request $r, CheckoutService $svc) { return $svc->run($r->all()); } }"
      ]
    }
  ],
  "pitfalls": [
    "Servis ichida `app()` yashirin bog'liqlik: konstruktor injection afzal.",
    "Circular dependency (A→B→A) container'da xato beradi: dizaynni qayta ko'ring.",
    "Konstruktorda og'ir ish (HTTP, DB) DI'ni qiyinlashtiradi.",
    "Singleton'da so'rovga xos holat Octane'da sizib ketadi."
  ]
});
