/* Chuqur dars: 23.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.15", {
  "lesson": [
    "### Production uchun Sanctum tekshiruv ro'yxati",
    "Bu dars 23.1–23.14 dagi xavfsizlik sozlamalarini bir joyga yig'adi.",
    "",
    "### `config/sanctum.php`",
    "- **`expiration`:** `null` emas. Maksimal token umri, masalan 90 kun (23.5).",
    "- **`token_prefix`:** loyihaga xos prefiks (`myapp_`), secret scanning uchun (23.3).",
    "- **`stateful`:** faqat production frontend domenlari, `localhost` siz (23.7).",
    "- **`guard`:** SPA uchun kerakli session guard'lar.",
    "- **`middleware`:** default qiymatlar (cookie shifrlash, CSRF) o'zgartirilmagan.",
    "",
    "### Session va cookie",
    "- `SESSION_SECURE_COOKIE=true`, `SESSION_SAME_SITE=lax` (yoki `strict`), `http_only` true (23.9).",
    "- `SESSION_DOMAIN` keraksiz keng emas.",
    "- `SESSION_DRIVER=redis` yoki `database` ko'p serverda.",
    "- Mos `SESSION_LIFETIME`.",
    "",
    "### CORS",
    "- Aniq `allowed_origins`, `*` emas, `supports_credentials => true` bilan (23.10).",
    "- `paths` faqat kerakli route'lar.",
    "",
    "### CSRF",
    "- API route'lar CSRF'dan istisno qilinmagan (faqat imzolangan webhook'lar).",
    "",
    "### Token'lar",
    "- Har token aniq abilities bilan, `['*']` emas (yoki ongli qaror bilan faqat birinchi tomon mobil ilova uchun).",
    "- Har token muddatli.",
    "- `sanctum:prune-expired` scheduler'da.",
    "- Token berish endpoint'lariga qat'iy rate limit (20.18).",
    "- Login'da bir xil xato xabari.",
    "- Parol o'zgarishi, bloklash va 2FA o'zgarishida token'lar bekor qilinadi (23.6).",
    "- Foydalanuvchiga token boshqaruvi sahifasi (23.13).",
    "",
    "### Avtorizatsiya",
    "- Policy'lar barcha resurs amallarida, ability'lar qo'shimcha cheklov (23.14).",
    "- Obyekt darajasidagi tekshiruv va ro'yxatlarni filtrlash.",
    "",
    "### Log va monitoring",
    "- `Authorization` header'i va `plainTextToken` log, Telescope va Sentry'da yashirilgan (20.20).",
    "- Muvaffaqiyatsiz login'lar va token yaratish/bekor qilish metrikalari.",
    "",
    "### Umumiy",
    "- Faqat HTTPS, HSTS (`Strict-Transport-Security`).",
    "- `APP_DEBUG=false`.",
    "- `APP_KEY` maxfiy (cookie shifrlash unga bog'liq).",
    "- Sanctum va Laravel yangilangan (`composer audit`).",
    "",
    "### Tez tekshiruv",
    "Deploy'dan keyin: token'siz so'rov `401`, muddati o'tgan token `401`, boshqa origin'dan CORS rad etiladi, CSRF'siz SPA POST `419`, abilities yetmagan token `403`. Bularni smoke testga qo'shing."
  ],
  "examples": [
    {
      "title": "Production config/sanctum.php",
      "lang": "php",
      "code": [
        "return [",
        "    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', '')),",
        "    'guard' => ['web'],",
        "    'expiration' => (int) env('SANCTUM_EXPIRATION', 60 * 24 * 90),",
        "    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', 'myapp_'),",
        "    'middleware' => [",
        "        'authenticate_session' => Laravel\\Sanctum\\Http\\Middleware\\AuthenticateSession::class,",
        "        'encrypt_cookies' => Illuminate\\Cookie\\Middleware\\EncryptCookies::class,",
        "        'validate_csrf_token' => Illuminate\\Foundation\\Http\\Middleware\\ValidateCsrfToken::class,",
        "    ],",
        "];"
      ]
    },
    {
      "title": "Konfiguratsiyani testda qotirish",
      "lang": "php",
      "code": [
        "it('has secure sanctum configuration in production', function () {",
        "    config()->set('app.env', 'production');",
        "",
        "    expect(config('sanctum.expiration'))->not->toBeNull()",
        "        ->and(config('sanctum.token_prefix'))->not->toBeEmpty()",
        "        ->and(config('session.secure'))->toBeTrue()",
        "        ->and(config('cors.allowed_origins'))->not->toContain('*')",
        "        ->and(collect(config('sanctum.stateful'))->contains(fn ($d) => str_contains($d, 'localhost')))->toBeFalse();",
        "})->skip(fn () => ! app()->environment('production'), 'faqat production config bilan');"
      ],
      "note": "Bunday testni CI'da production `.env` namunasi bilan yoki deploy pipeline'ida `php artisan config:show` natijasini tekshiruvchi skript sifatida ishlatish mumkin."
    }
  ],
  "pitfalls": [
    "Default `expiration = null` bilan production'ga chiqish.",
    "Stateful domenlarda `localhost` qoldirish.",
    "CORS'da `*` va credentials.",
    "Xavfsizlik sozlamalarini deploy'dan keyin hech qachon tekshirmaslik."
  ]
});
