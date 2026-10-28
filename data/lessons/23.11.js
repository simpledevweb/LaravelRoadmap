/* Chuqur dars: 23.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.11", {
  "lesson": [
    "### Sanctum bilan bog'liq middleware'lar",
    "**1. `EnsureFrontendRequestsAreStateful`.** So'rov stateful domendan (23.7) kelsa, unga session pipeline'ini qo'shadi: `EncryptCookies`, `AddQueuedCookiesToResponse`, `StartSession`, `ValidateCsrfToken` (CSRF), `AuthenticateSession` (agar yoqilgan bo'lsa). Stateless so'rovlar uchun hech narsa qilmaydi. Laravel 11+ da `$middleware->statefulApi()` uni `api` guruhining boshiga qo'shadi.",
    "",
    "**2. `auth:sanctum`.** Laravel'ning `Authenticate` middleware'i `sanctum` guard bilan. Avval session (`web` guard yoki `sanctum.guard` konfiguratsiyasi), keyin Bearer token. Hech biri bo'lmasa — `AuthenticationException` → JSON so'rovda `401`.",
    "",
    "**3. `abilities:` va `ability:`** (`CheckAbilities`, `CheckForAnyAbility`) — token abilities (23.4). Laravel 11+ da alias'larni qo'lda ro'yxatdan o'tkazish kerak.",
    "",
    "### Tartib muhim",
    "`auth:sanctum` dan oldin stateful middleware ishlashi kerak, aks holda session hali boshlanmagan va SPA foydalanuvchisi `401` oladi. `statefulApi()` buni to'g'ri tartibda qiladi.",
    "",
    "Odatiy zanjir:",
    "`HandleCors` (global) → `EnsureFrontendRequestsAreStateful` → `throttle:api` → `SubstituteBindings` → `auth:sanctum` → `ability:...` → `can:...` → controller.",
    "",
    "Laravel 11+ da `throttle:api` default'da `api` guruhida emas: kerak bo'lsa `$middleware->throttleApi()`.",
    "",
    "### Route guruhlash",
    "Middleware'larni har route'ga alohida yozish o'rniga guruhlar:",
    "- Ommaviy endpoint'lar (login, ro'yxatdan o'tish, ommaviy katalog): `auth` siz, lekin qat'iy `throttle`.",
    "- Autentifikatsiyalangan: `auth:sanctum`.",
    "- Integratsiya API: `auth:sanctum` + `ability:` + alohida throttle.",
    "- Admin: `auth:sanctum` + `can:access-admin`.",
    "",
    "**Deny by default:** asosiy guruh `auth:sanctum` bilan o'ralgan, ommaviy route'lar esa aniq istisno (20.12).",
    "",
    "### O'z middleware'ingiz",
    "Sanctum bilan birga ishlatiladigan odatiy maxsus middleware'lar:",
    "- `EnsureEmailIsVerified` (`verified`) — email tasdiqlanmagan foydalanuvchilarni cheklash.",
    "- 2FA majburiyligi (admin uchun).",
    "- Akkaunt bloklanganini tekshirish (har so'rovda, token hali yaroqli bo'lsa ham).",
    "- Sliding expiration (23.5).",
    "- Tenant kontekstini o'rnatish (13.14)."
  ],
  "examples": [
    {
      "title": "Laravel 11+ sozlash va guruhlar",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "->withMiddleware(function (Middleware $middleware) {",
        "    $middleware->statefulApi();",
        "    $middleware->throttleApi();",
        "    $middleware->alias([",
        "        'abilities' => \\Laravel\\Sanctum\\Http\\Middleware\\CheckAbilities::class,",
        "        'ability' => \\Laravel\\Sanctum\\Http\\Middleware\\CheckForAnyAbility::class,",
        "        'not.blocked' => \\App\\Http\\Middleware\\EnsureUserIsNotBlocked::class,",
        "    ]);",
        "})",
        "",
        "// routes/api.php",
        "Route::post('auth/token', IssueTokenController::class)->middleware('throttle:login');",
        "",
        "Route::middleware(['auth:sanctum', 'not.blocked'])->group(function () {",
        "    Route::get('me', MeController::class);",
        "    Route::apiResource('orders', OrderController::class);",
        "",
        "    Route::middleware('can:access-admin')->prefix('admin')->group(base_path('routes/api_admin.php'));",
        "});"
      ]
    },
    {
      "title": "Bloklangan foydalanuvchini to'xtatish",
      "lang": "php",
      "code": [
        "final class EnsureUserIsNotBlocked",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        $user = $request->user();",
        "",
        "        if ($user?->blocked_at) {",
        "            $token = $user->currentAccessToken();",
        "            if ($token instanceof \\Laravel\\Sanctum\\PersonalAccessToken) {",
        "                $token->delete();",
        "            }",
        "            abort(403, 'Akkaunt bloklangan');",
        "        }",
        "",
        "        return $next($request);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`statefulApi()` siz SPA rejimi: session boshlanmaydi va `auth:sanctum` `401` qaytaradi.",
    "Ability middleware alias'larini ro'yxatdan o'tkazmaslik.",
    "Har route'ga middleware'ni alohida yozib, birini unutish.",
    "Bloklangan foydalanuvchi uchun faqat login'ni to'xtatib, mavjud token'larni ishlashda qoldirish."
  ]
});
