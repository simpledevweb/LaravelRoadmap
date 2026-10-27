/* Chuqur dars: 2.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.6", {
  "lesson": [
    "### Service Container",
    "Laravel'ning yuragi: klasslarni **yaratadi** va **bog'liqliklarini avtomatik hal qiladi** (autowiring). `Application` o'zi container.",
    "",
    "### Autowiring",
    "Konstruktor tiplarini Reflection bilan o'qiydi va rekursiv yaratadi. Interface bo'lsa **bog'lama** kerak.",
    "",
    "### Bog'lamalar",
    "- `bind(Interface::class, Impl::class)` — har safar yangi nusxa.",
    "- `singleton(...)` — jarayon uchun bitta.",
    "- `scoped(...)` — bitta so'rov/job uchun bitta (Octane xavfsiz).",
    "- `instance($abstract, $obj)` — tayyor obyekt.",
    "- `bindIf`, `extend` (dekorator), `alias`.",
    "- Kontekstual: `when(A::class)->needs(I::class)->give(X::class)`.",
    "- Tag: `tag([...], 'reports')` + `tagged('reports')`.",
    "",
    "### Hal qilish",
    "`app(Foo::class)`, `app()->make()`, `makeWith($class, ['arg' => 1])`, `resolve()`. Hodisalar: `resolving()`, `afterResolving()`.",
    "",
    "### Qoidalar",
    "- Servis ichida `app()` chaqirmang (service locator): konstruktor DI.",
    "- Singleton'da so'rovga xos holat saqlamang.",
    "- Bog'lamalar `register()` da, `boot()` da emas.",
    "",
    "### Test",
    "`$this->app->bind(Gateway::class, FakeGateway::class)`, `$this->mock()`, `instance()`."
  ],
  "examples": [
    {
      "title": "Bog'lamalar",
      "lang": "php",
      "code": [
        "// AppServiceProvider::register",
        "$this->app->bind(PaymentGateway::class, StripeGateway::class);",
        "$this->app->singleton(Clock::class, fn () => new SystemClock());",
        "$this->app->scoped(TenantContext::class);",
        "$this->app->when(ReportService::class)->needs(Mailer::class)->give(SmtpMailer::class);",
        "$this->app->extend(PaymentGateway::class, fn ($g, $app) => new LoggedGateway($g));"
      ]
    }
  ],
  "pitfalls": [
    "Singleton ichida `Request`/foydalanuvchi saqlash Octane'da ma'lumot sizishiga olib keladi: `scoped`.",
    "`app()` ni servis ichida ishlatish yashirin bog'liqlik.",
    "Primitiv parametrli klass (`__construct(string $key)`) uchun bog'lama yoki `when()->give()` kerak.",
    "Circular dependency container'da xato beradi."
  ]
});
