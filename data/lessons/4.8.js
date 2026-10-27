/* Chuqur dars: 4.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.8", {
  "lesson": [
    "### Container va SOLID",
    "Laravel **Service Container** — DI/IoC container: klasslarni va ularning bog'liqliklarini avtomatik yaratadi (**autowiring**) va bog'lamalarni boshqaradi. U SOLID, ayniqsa **DIP** va **OCP** ni amalga oshirishning qulay vositasi.",
    "",
    "### Asosiy imkoniyatlar",
    "- **Autowiring:** konstruktor tiplari bo'yicha avtomatik hal qilish (`Reflection`).",
    "- `bind(Interface, Impl)`: har safar yangi nusxa.",
    "- `singleton`: jarayon uchun bitta.",
    "- `scoped`: bitta so'rov/job uchun bitta (Octane).",
    "- **Kontekstual binding:** `when(A::class)->needs(I::class)->give(X::class)`.",
    "- **Tag'lar:** `tag([...], 'reports')`, `tagged('reports')`.",
    "- **Extend/decorate:** `extend(Service::class, fn ($s) => new Decorated($s))`.",
    "",
    "### SOLID bilan aloqa",
    "- **DIP:** controller/servis interface so'raydi, provider implementatsiyani bog'laydi.",
    "- **OCP:** yangi implementatsiya — provider'da bitta qator; mijoz kodi o'zgarmaydi.",
    "- **ISP:** kichik `Contracts` interface'larini so'rash.",
    "- **SRP:** bog'liqliklar soni klass hajmini ko'rsatadi (7+ — belgi).",
    "",
    "### Service Provider",
    "`register()` — bog'lamalar, `boot()` — boshqa servislarga bog'liq sozlamalar. `$bindings`/`$singletons` xususiyatlari qisqa yo'l.",
    "",
    "### Anti-pattern'lar",
    "- `app(Foo::class)` servis ichida (service locator).",
    "- Singleton'da so'rovga xos holat.",
    "- Container'ni domen qatlamiga uzatish.",
    "",
    "### Test",
    "`$this->app->bind(Gateway::class, FakeGateway::class)` yoki `$this->mock()`/`instance()` — testda almashtirish."
  ],
  "examples": [
    {
      "title": "Bog'lash va kontekstual binding",
      "lang": "php",
      "code": [
        "// AppServiceProvider::register",
        "$this->app->bind(PaymentGateway::class, StripeGateway::class);",
        "$this->app->singleton(Clock::class, fn () => new SystemClock());",
        "$this->app->when(AdminReport::class)->needs(Mailer::class)->give(SmtpMailer::class);",
        "$this->app->extend(PaymentGateway::class, fn ($g, $app) => new LoggedGateway($g, $app->make(LoggerInterface::class)));"
      ]
    }
  ],
  "pitfalls": [
    "Servis ichida `app()` chaqirish yashirin bog'liqlik: konstruktor DI.",
    "Singleton ichida request/foydalanuvchi saqlash Octane'da sizib ketadi: `scoped`.",
    "`bind` va `singleton` farqini bilmaslik kutilmagan umumiy holatga olib keladi.",
    "Provider `boot()` ichida og'ir ish qilish ilova ishga tushishini sekinlashtiradi."
  ]
});
