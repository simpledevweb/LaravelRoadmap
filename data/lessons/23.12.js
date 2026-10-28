/* Chuqur dars: 23.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.12", {
  "lesson": [
    "### Guard nima",
    "Guard — Laravel'da \"so'rovdan foydalanuvchini qanday aniqlash\" strategiyasi (20.1). `config/auth.php` da e'lon qilinadi, har biri **driver** (`session`, `token`, `passport`, `sanctum`, o'zingizniki) va **provider** (foydalanuvchilar qayerdan: `eloquent` model yoki `database` jadval) dan iborat.",
    "",
    "### Sanctum guard'i qanday ishlaydi",
    "Sanctum `sanctum` nomli guard'ni ro'yxatdan o'tkazadi (config'ga yozish shart emas). Uning mantiqi:",
    "1. `config('sanctum.guard')` dagi guard'lar (default `['web']`) orqali foydalanuvchini qidiradi. Ya'ni stateful so'rovda **session**. Topsa — foydalanuvchiga `TransientToken` biriktiradi va qaytaradi.",
    "2. Topmasa — `Authorization: Bearer` token'ni oladi, `personal_access_tokens` dan topadi, tekshiradi (hash, muddat, `tokenable` mavjudligi) va egasini qaytaradi.",
    "3. Ixtiyoriy: `Sanctum::authenticateAccessTokensUsing()` bilan qo'shimcha tekshiruv (masalan, token egasi bloklanmaganmi).",
    "",
    "### Bir nechta foydalanuvchi turi",
    "Alohida `users` va `admins` jadvallari bo'lsa:",
    "- Ikkala model ham `HasApiTokens` ishlatadi. Token'lar polymorphic (`tokenable_type`) bo'lgani uchun bitta jadvalda.",
    "- SPA uchun: `config/auth.php` da `admin` session guard'i va `sanctum.guard => ['web', 'admin']`.",
    "- Route'larda tur bo'yicha cheklash: `auth:sanctum` faqat \"kimdir\" ekanini tasdiqlaydi. Admin route'larda `$request->user() instanceof Admin` yoki maxsus middleware.",
    "",
    "Ko'p hollarda bitta `users` jadvali + rollar soddaroq (20.10).",
    "",
    "### Guard'ni aniq ko'rsatish",
    "- `$request->user()` — joriy (default yoki middleware'da ishlatilgan) guard.",
    "- `$request->user('sanctum')`, `Auth::guard('sanctum')->user()`, `auth('sanctum')->check()` — aniq guard. Masalan, route `auth` middleware'siz (ommaviy), lekin foydalanuvchi bo'lsa, unga moslashtirilgan javob.",
    "- `Auth::shouldUse('sanctum')` — joriy so'rov uchun default guard'ni almashtirish.",
    "",
    "### Default guard",
    "`config/auth.php` → `defaults.guard` (odatda `web`). API'ga yo'naltirilgan ilovada `Auth::user()` kutilmaganda `null` qaytarishi mumkin, chunki default guard `web` va so'rovda session yo'q. Yechim: middleware orqali (`auth:sanctum` ishlagandan keyin `$request->user()` to'g'ri ishlaydi) yoki aniq guard nomi bilan.",
    "",
    "### O'z guard'ingiz",
    "Sanctum yetmasa (API key, tashqi JWT, introspection): `Auth::viaRequest('api-key', fn (Request $r) => ...)` (20.4, 21.10, 22.8) va `config/auth.php` da `'driver' => 'api-key'`."
  ],
  "examples": [
    {
      "title": "config/auth.php: ikki turdagi foydalanuvchi",
      "lang": "php",
      "code": [
        "'defaults' => ['guard' => 'web', 'passwords' => 'users'],",
        "",
        "'guards' => [",
        "    'web' => ['driver' => 'session', 'provider' => 'users'],",
        "    'admin' => ['driver' => 'session', 'provider' => 'admins'],",
        "],",
        "",
        "'providers' => [",
        "    'users' => ['driver' => 'eloquent', 'model' => App\\Models\\User::class],",
        "    'admins' => ['driver' => 'eloquent', 'model' => App\\Models\\Admin::class],",
        "],",
        "",
        "// config/sanctum.php",
        "'guard' => ['web', 'admin'],"
      ]
    },
    {
      "title": "Ixtiyoriy autentifikatsiya va qo'shimcha tekshiruv",
      "lang": "php",
      "code": [
        "// Ommaviy katalog: foydalanuvchi bo'lsa, shaxsiy narxlar",
        "Route::get('products', function (Request $request) {",
        "    $user = $request->user('sanctum');   // null bo'lishi mumkin",
        "    return ProductResource::collection(Product::query()->forViewer($user)->paginate());",
        "});",
        "",
        "// AppServiceProvider::boot(): token egasi bloklangan bo'lsa, rad",
        "Sanctum::authenticateAccessTokensUsing(",
        "    fn (PersonalAccessToken $token, bool $isValid) => $isValid && ! $token->tokenable?->blocked_at",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "API controller'da `Auth::user()` ni default `web` guard bilan chaqirib, `null` olish.",
    "Ikki xil foydalanuvchi turida `auth:sanctum` admin ekanini tasdiqlaydi deb hisoblash.",
    "SPA admin paneli uchun `sanctum.guard` ga `admin` guard'ini qo'shishni unutish.",
    "Ommaviy route'da `$request->user()` (guard ko'rsatmasdan) ishlatish: doim `null`."
  ]
});
