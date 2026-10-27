/* Chuqur dars: 2.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.7", {
  "lesson": [
    "### Service Provider",
    "Ilovani ishga tushirishning markaziy joyi: servislarni container'ga **ro'yxatdan o'tkazadi** va ilovani **sozlaydi**. Laravel'ning o'zi ham provider'lar to'plami.",
    "",
    "### Ikki metod",
    "- `register()`: faqat container bog'lamalari (`bind`, `singleton`). Boshqa servislarga murojaat **qilmang** (hali yuklanmagan bo'lishi mumkin).",
    "- `boot()`: barcha provider'lar ro'yxatdan o'tgach; event listener, route, view composer, `Gate::define`, Blade direktivalari. Container orqali bog'liqlik kiritish mumkin.",
    "",
    "### Ro'yxatga olish",
    "L11+: `bootstrap/providers.php` massivi. Eskida `config/app.php` → `providers`. Paketlar `composer.json` `extra.laravel.providers` bilan avtomatik (package discovery).",
    "",
    "### Qisqa yo'l",
    "`public array $bindings = [...]`, `public array $singletons = [...]`.",
    "",
    "### Deferred provider",
    "`DeferrableProvider` + `provides()`: faqat servis kerak bo'lganda yuklanadi (tezlik).",
    "",
    "### Qoidalar",
    "- Provider yupqa: bog'lash va sozlash, biznes mantiq emas.",
    "- `boot()` da og'ir ish (HTTP, katta DB so'rovlar) ishga tushishni sekinlashtiradi.",
    "- Bitta provider — bitta mavzu (`RouteServiceProvider`, `EventServiceProvider`...): `AppServiceProvider`ga hamma narsani yig'mang.",
    "",
    "### Yaratish",
    "`php artisan make:provider PaymentServiceProvider`."
  ],
  "examples": [
    {
      "title": "Provider",
      "lang": "php",
      "code": [
        "final class PaymentServiceProvider extends ServiceProvider",
        "{",
        "    public function register(): void",
        "    {",
        "        $this->app->singleton(PaymentGateway::class, fn () => new StripeGateway(config('services.stripe.secret')));",
        "    }",
        "",
        "    public function boot(): void",
        "    {",
        "        Gate::define('refund', fn (User $u) => $u->isAdmin());",
        "        Blade::directive('money', fn ($e) => \"<?php echo number_format($e, 0, '', ' '); ?>\");",
        "    }",
        "}",
        "// bootstrap/providers.php: App\\Providers\\PaymentServiceProvider::class"
      ]
    }
  ],
  "pitfalls": [
    "`register()` ichida boshqa servis chaqirish: hali yuklanmagan bo'lishi mumkin (`boot()`).",
    "`boot()` da og'ir ish ilovani har so'rovda sekinlashtiradi.",
    "Hamma narsani `AppServiceProvider`ga yig'ish uni 'God provider'ga aylantiradi.",
    "Yangi provider'ni `bootstrap/providers.php`ga qo'shishni unutish."
  ]
});
