/* Chuqur dars: 2.26. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.26", {
  "lesson": [
    "### Package",
    "Qayta ishlatiladigan Laravel kodi (Composer paketi): o'zingiz yoki jamoa uchun. Struktura: `src/`, `config/`, `database/migrations`, `resources/views`, `routes/`, `tests/`, `composer.json`.",
    "",
    "### Service Provider",
    "Paket kirish nuqtasi: `register()` (bog'lamalar, `mergeConfigFrom`), `boot()` (`loadRoutesFrom`, `loadMigrationsFrom`, `loadViewsFrom`, `loadTranslationsFrom`, `publishes([...], 'tag')`, buyruqlar).",
    "",
    "### Auto-discovery",
    "`composer.json`:",
    "```json",
    "\"extra\": { \"laravel\": { \"providers\": [\"Vendor\\\\Pkg\\\\PkgServiceProvider\"], \"aliases\": { \"Pkg\": \"Vendor\\\\Pkg\\\\Facades\\\\Pkg\" } } }",
    "```",
    "Foydalanuvchi qo'lda ro'yxatga olmaydi.",
    "",
    "### Config va publish",
    "`mergeConfigFrom(__DIR__.'/../config/pkg.php', 'pkg')` + `publishes([...config => config_path('pkg.php')], 'pkg-config')`. Foydalanuvchi `php artisan vendor:publish --tag=pkg-config`.",
    "",
    "### Testlash",
    "**Orchestra Testbench** (`orchestra/testbench`): Laravel ilovasisiz paket testi. Versiya matritsasi (CI): PHP × Laravel.",
    "",
    "### Versiyalash",
    "SemVer, `CHANGELOG`, `composer.json` `require` da `laravel/framework`/`illuminate/*` diapazoni (`^11.0||^12.0`), PHP minimal versiyasi.",
    "",
    "### Yaxshi amaliyot",
    "- Minimal bog'liqlik, `illuminate/support` ni afzal ko'ring (butun framework emas).",
    "- Facade ixtiyoriy.",
    "- Config orqali sozlanadigan, standart qiymatlar.",
    "- Migratsiyalarni publish qilinadigan qiling.",
    "- README, PSR-12, PHPStan, testlar.",
    "",
    "### Tarqatish",
    "Packagist, GitHub tag, yoki private (Satis/GitLab Package Registry)."
  ],
  "examples": [
    {
      "title": "Package provider",
      "lang": "php",
      "code": [
        "final class PkgServiceProvider extends ServiceProvider",
        "{",
        "    public function register(): void { $this->mergeConfigFrom(__DIR__.'/../config/pkg.php', 'pkg'); $this->app->singleton(Client::class, fn ($a) => new Client(config('pkg.key'))); }",
        "    public function boot(): void",
        "    {",
        "        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');",
        "        $this->publishes([__DIR__.'/../config/pkg.php' => config_path('pkg.php')], 'pkg-config');",
        "        if ($this->app->runningInConsole()) { $this->commands([SyncCommand::class]); }",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`laravel/framework` ga qattiq bog'lanish paketni moslashtirib bo'lmas qiladi: `illuminate/*` va diapazon.",
    "Auto-discovery `extra.laravel` bo'lmasa foydalanuvchi qo'lda provider qo'shishga majbur.",
    "Config'ni `publishes` siz berish foydalanuvchi sozlay olmasligiga olib keladi.",
    "Faqat bitta Laravel versiyasida sinash: CI matritsasi."
  ]
});
