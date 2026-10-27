/* Chuqur dars: 3.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.12", {
  "lesson": [
    "### Dependency Injection nima",
    "DI (bog'liqlikni kiritish) — obyekt o'z hamkorlarini **o'zi yaratmaydi**, ularni **tashqaridan qabul qiladi**. Bu **Dependency Inversion** tamoyilini amalga oshirish usuli: yuqori darajali kod konkret klassga emas, abstraksiyaga bog'lanadi.",
    "",
    "### Uch usul",
    "1. **Constructor injection (asosiy):** majburiy bog'liqlik konstruktor orqali; obyekt yaratilgach to'liq tayyor.",
    "2. **Setter injection:** ixtiyoriy bog'liqlik (kamdan-kam; obyekt yaroqsiz holatda bo'lib qolishi mumkin).",
    "3. **Method injection:** bog'liqlik faqat bitta metodga kerak (Laravel controller metodi parametrlari).",
    "",
    "### Nima uchun",
    "- **Test:** fake/mock berish oson.",
    "- **Almashtirish:** implementatsiyani o'zgartirish bitta joyda (konfiguratsiya).",
    "- **Aniq bog'liqliklar:** konstruktor imzosi \"bu klass nimaga muhtoj\" ni ko'rsatadi.",
    "",
    "### Container (IoC)",
    "Murakkab grafni qo'lda yig'ish o'rniga **DI container** avtomatik hal qiladi (autowiring): konstruktor tiplarini Reflection bilan o'qib, kerakli obyektlarni yaratadi. Laravel `app()->make()`, `bind`, `singleton`, `scoped`, kontekstual binding (`when()->needs()->give()`).",
    "",
    "### Service Locator — anti-pattern",
    "Klass ichida `app(Mailer::class)` yoki `Container::get()` bilan hamkorni so'rash bog'liqlikni yashiradi va testni qiyinlashtiradi. Faqat composition root (provider, controller) da qabul qilinadi.",
    "",
    "### Facade",
    "Laravel Facade (`Cache::get()`) statik ko'rinadi, lekin container'dan resolve qiladi va mock qilinadi (`Cache::shouldReceive`). Qulay, lekin yashirin bog'liqlik: servis klasslarida konstruktor DI afzal.",
    "",
    "### Qoidalar",
    "1. Hamkorni `new` qilmang, kiriting.",
    "2. Interface'ga bog'laning (kerak bo'lganda).",
    "3. Konstruktorga 5–6 dan ko'p bog'liqlik — klass ko'p ish qilmoqda.",
    "4. Konstruktorda ish qilmang (faqat saqlash).",
    "5. Singleton'da so'rovga xos holat bo'lmasin.",
    "",
    "### Circular dependency",
    "A→B→A bo'lsa container xato beradi: dizaynni qayta ko'ring (hodisa yoki umumiy qism ajratish)."
  ],
  "examples": [
    {
      "title": "Constructor injection va Laravel binding",
      "lang": "php",
      "code": [
        "final class InvoiceService",
        "{",
        "    public function __construct(private PaymentGateway $gateway, private Mailer $mailer) {}",
        "    public function pay(Invoice $i): void { $this->gateway->charge($i->total, 'UZS'); $this->mailer->send($i->email, 'To\\'landi'); }",
        "}",
        "",
        "// AppServiceProvider",
        "$this->app->bind(PaymentGateway::class, StripeGateway::class);",
        "$this->app->when(ReportService::class)->needs(Mailer::class)->give(SmtpMailer::class);",
        "",
        "// controller: method injection",
        "public function store(Request $r, InvoiceService $svc) { $svc->pay(Invoice::find($r->id)); }"
      ]
    },
    {
      "title": "Service Locator (yomon) va test",
      "lang": "php",
      "code": [
        "// YOMON: yashirin bog'liqlik",
        "final class Report { public function send() { app(Mailer::class)->send('a@b.uz', 'x'); } }",
        "",
        "// Testda fake bilan",
        "$svc = new InvoiceService(new FakeGateway(), new FakeMailer());",
        "$svc->pay($invoice);"
      ]
    }
  ],
  "pitfalls": [
    "Servis klass ichida `app()`/Facade ishlatish yashirin bog'liqlik: konstruktor injection afzal.",
    "Konstruktorda ish qilish (HTTP, DB) va faqat saqlash o'rniga mantiq yozish testni qiyinlashtiradi.",
    "Circular dependency (A→B→A) container'da xato beradi: hodisa yoki umumiy qismni ajrating.",
    "Singleton'ga `Request`/foydalanuvchi kiritish Octane'da ma'lumot sizishiga olib keladi: `scoped`."
  ]
});
