/* Chuqur dars: 2.27. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.27", {
  "lesson": [
    "### Framework ichkarisi",
    "Laravel'ni \"sehr\" emas, tushunarli mexanizm sifatida bilish: nosozlikni topish, kengaytirish va paket yozish uchun.",
    "",
    "### Asosiy qismlar",
    "- `Illuminate\\Foundation\\Application` — Container'dan meros; provider'lar, muhit, yo'llar.",
    "- **Bootstrap klasslari** (ketma-ket): `LoadEnvironmentVariables`, `LoadConfiguration`, `HandleExceptions`, `RegisterFacades`, `RegisterProviders`, `BootProviders`.",
    "- **HTTP Kernel / pipeline:** so'rov `Illuminate\\Pipeline\\Pipeline` orqali middleware zanjirida o'tadi.",
    "- **Router:** marshrutni topadi (`RouteCollection`), parametrlarni va model binding'ni hal qiladi, middleware'ni yig'adi.",
    "- Container `resolve()`: abstrakt nomga bog'lama bormi → bo'lsa chaqiradi; yo'q bo'lsa `build()`: `ReflectionClass` bilan konstruktor tiplari → bog'liqliklarni rekursiv hal qilish → `newInstanceArgs`.",
    "- **Facade:** `__callStatic` → `getFacadeRoot()` → container.",
    "- **Eloquent:** `Model::__call/__callStatic` → `Builder`; `newQuery()`, global scope'lar.",
    "- **Event dispatcher, Queue manager, Cache manager** — `Manager` pattern (drayver tanlash).",
    "",
    "### Servis hal qilish tartibi",
    "1. `make('X')`.",
    "2. Alias → konkret.",
    "3. Bog'lama (closure/klass) yoki avtomatik `build`.",
    "4. `extend` callback'lar.",
    "5. Singleton bo'lsa saqlanadi.",
    "6. `resolving` callback'lar.",
    "",
    "### Nima uchun foydali",
    "`vendor/laravel/framework/src/Illuminate/...` kodini o'qish; Xdebug bilan qadam-baqadam o'tish; `php artisan about`, `route:list`, `event:list`.",
    "",
    "### Kengaytirish nuqtalari",
    "`macro()` (`Macroable`), `extend`, `Manager::extend`, service provider, middleware, global scope, custom cast."
  ],
  "examples": [
    {
      "title": "Macro va Manager.extend",
      "lang": "php",
      "code": [
        "Collection::macro('toUpper', function () { return $this->map(fn ($v) => mb_strtoupper($v)); });",
        "collect(['a', 'b'])->toUpper();",
        "",
        "Cache::extend('custom', fn ($app) => Cache::repository(new CustomStore));"
      ]
    }
  ],
  "pitfalls": [
    "Framework ichki API'siga (internal) tayanish versiya yangilanishida sinadi.",
    "Macro nomi mavjud metod bilan to'qnashsa kutilmagan natija: nomlarni noyob tanlang.",
    "`vendor/` ichidagi kodni o'zgartirmang: kengaytirish nuqtalaridan foydalaning.",
    "Facade ildizini mock qilishda container'dagi obyekt almashadi: testdan keyin tozalash."
  ]
});
