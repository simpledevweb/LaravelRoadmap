/* Chuqur dars: 2.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.1", {
  "lesson": [
    "### So'rov yo'li",
    "Har HTTP so'rov bitta kirish nuqtasidan o'tadi: `public/index.php`.",
    "1. Composer autoload (`vendor/autoload.php`).",
    "2. `bootstrap/app.php` ilova obyektini (`Application`, ya'ni Service Container) yaratadi va sozlaydi (`Application::configure()->withRouting()->withMiddleware()->withExceptions()->create()`).",
    "3. So'rov `Illuminate\\Foundation\\Http\\Kernel` (yoki 11+ da ichki handler) ga beriladi.",
    "4. **Bootstrapping:** muhit (`.env`) yuklanadi, config o'qiladi, xatolar boshqaruvi, Facade'lar, **Service Provider'lar** (`register` keyin `boot`).",
    "5. So'rov **global middleware** pipeline'idan, so'ng router orqali marshrutga mos **route middleware**dan o'tadi.",
    "6. **Controller/closure** javob qaytaradi.",
    "7. Javob middleware'lardan teskari tartibda chiqadi va brauzerga yuboriladi.",
    "8. `terminate()`: javobdan keyingi ishlar (terminable middleware, sessiyani yozish).",
    "",
    "### Nima uchun muhim",
    "Xatoni qayerda izlashni (provider'da yoki middleware'da) va nega ayrim narsa (masalan `auth()->user()` provider `register` ichida) hali tayyor emasligini tushuntiradi.",
    "",
    "### Laravel 11+",
    "Slim skelet: `app/Http/Kernel.php` yo'q; middleware, marshrut, istisno sozlamasi `bootstrap/app.php` da; provider'lar `bootstrap/providers.php` da.",
    "",
    "### Foydali",
    "`php artisan route:list`, `about`, `optimize` (config/route/view/event cache), Telescope/Debugbar so'rov oqimini ko'rsatadi."
  ],
  "examples": [
    {
      "title": "bootstrap/app.php",
      "lang": "php",
      "code": [
        "return Application::configure(basePath: dirname(__DIR__))",
        "    ->withRouting(web: __DIR__.'/../routes/web.php', api: __DIR__.'/../routes/api.php', health: '/up')",
        "    ->withMiddleware(function (Middleware $middleware) { $middleware->alias(['admin' => EnsureAdmin::class]); })",
        "    ->withExceptions(function (Exceptions $exceptions) { /* report/render */ })",
        "    ->create();"
      ]
    }
  ],
  "pitfalls": [
    "Provider `register()` ichida boshqa servislarga murojaat qilmang: hali hammasi ro'yxatdan o'tmagan (`boot()` da).",
    "Cache qilingan config/route bilan `.env` o'zgarishi darrov ta'sir qilmaydi: `php artisan optimize:clear`.",
    "Middleware tartibi natijani o'zgartiradi (global → guruh → marshrut).",
    "`terminate` ishi javobdan keyin bajariladi: unda foydalanuvchiga ko'rinadigan chiqish bo'lmasin."
  ]
});
