/* Chuqur dars: 2.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.8", {
  "lesson": [
    "### Laravel'da DI",
    "Dependency Injection — klass kerakli bog'liqliklarni **tashqaridan** oladi. Laravel container buni avtomatik bajaradi: konstruktor/metod tiplarini ko'rib, kerakli obyektlarni yaratadi.",
    "",
    "### Qayerda ishlaydi",
    "- **Controller konstruktori va metodi.**",
    "- **Middleware** konstruktori.",
    "- Job `handle()` metodi, Listener `handle()`, Command `handle()`.",
    "- **Event listener, Policy, FormRequest.**",
    "- Route closure parametrlari.",
    "",
    "### Usullar",
    "1. **Constructor injection** (asosiy): `public function __construct(private Mailer $mailer)`.",
    "2. **Method injection:** `store(Request $r, CreatePost $create)`.",
    "3. Route parametr + DI aralash: `show(Request $r, Post $post)` (model binding).",
    "",
    "### Interface bog'lash",
    "`bind(Gateway::class, Stripe::class)` provider'da. Kontekstual `when()->needs()->give()`.",
    "",
    "### Primitiv parametrlar",
    "`when(X::class)->needs('$apiKey')->give(config('x.key'))` yoki `giveConfig('x.key')`.",
    "",
    "### Anti-pattern: Service Locator",
    "`app(Foo::class)`/Facade servis ichida: testni qiyinlashtiradi. Faqat composition root (provider, controller) da.",
    "",
    "### Test",
    "`new Service(new FakeMailer())` yoki container orqali fake bog'lash.",
    "",
    "### Cheklash",
    "7+ konstruktor bog'liqligi — klass ko'p ish qiladi (SRP): ajrating."
  ],
  "examples": [
    {
      "title": "Primitiv va interface",
      "lang": "php",
      "code": [
        "$this->app->when(StripeGateway::class)->needs('$secret')->giveConfig('services.stripe.secret');",
        "$this->app->bind(PaymentGateway::class, StripeGateway::class);",
        "",
        "final class Checkout { public function __construct(private PaymentGateway $gateway, private Mailer $mailer) {} }"
      ]
    }
  ],
  "pitfalls": [
    "Servis ichida `app()`/Facade: yashirin bog'liqlik, testda fake qiyin.",
    "Konstruktorda og'ir ish qilish (HTTP, DB) DI foydasini yo'qotadi.",
    "Primitiv parametr uchun bog'lama bo'lmasa `BindingResolutionException`.",
    "Circular dependency (A→B→A): dizaynni qayta ko'ring."
  ]
});
