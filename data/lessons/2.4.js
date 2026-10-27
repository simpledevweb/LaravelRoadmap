/* Chuqur dars: 2.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.4", {
  "lesson": [
    "### Middleware nima",
    "So'rov marshrutga yetishidan oldin va javob chiqishidan keyin ishlaydigan **qatlam** (HTTP filtri). Autentifikatsiya, CORS, rate limit, til tanlash, log.",
    "",
    "### Tuzilma",
    "```php",
    "public function handle(Request $request, Closure $next): Response",
    "{",
    "    // OLDIN: so'rovni tekshirish/o'zgartirish",
    "    $response = $next($request);",
    "    // KEYIN: javobni o'zgartirish",
    "    return $response;",
    "}",
    "```",
    "Javob qaytarsangiz (`return redirect()`) zanjir to'xtaydi.",
    "",
    "### Ro'yxatga olish (L11+, `bootstrap/app.php`)",
    "`$middleware->append()/prepend()` (global), `->alias(['admin' => X::class])`, `->group('web', [...])`, `->web(append: [...])`.",
    "",
    "### Marshrutda",
    "`->middleware('auth')`, `->middleware(['auth', 'verified'])`, parametrli: `role:admin,editor` (`handle($r, $next, ...$roles)`), `->withoutMiddleware()`.",
    "",
    "### Terminable",
    "`terminate($request, $response)` javob yuborilgandan keyin ishlaydi (log, analitika). Singleton nuansi: terminate'da yangi nusxa bo'lishi mumkin.",
    "",
    "### Priority/tartib",
    "Global → guruh → marshrut tartibida ishlaydi; javobda teskari. `->priority([...])` tartibni belgilaydi.",
    "",
    "### Controller middleware",
    "`HasMiddleware` interface (L11+): `public static function middleware(): array`.",
    "",
    "### Test",
    "`$this->withoutMiddleware()` kerak bo'lganda; lekin avval real middleware bilan tekshiring."
  ],
  "examples": [
    {
      "title": "Parametrli middleware",
      "lang": "php",
      "code": [
        "final class EnsureRole",
        "{",
        "    public function handle(Request $request, Closure $next, string ...$roles): Response",
        "    {",
        "        abort_unless($request->user()?->hasAnyRole($roles), 403);",
        "        return $next($request);",
        "    }",
        "}",
        "// bootstrap/app.php: $middleware->alias(['role' => EnsureRole::class]);",
        "Route::get('/admin', AdminController::class)->middleware('role:admin,editor');"
      ]
    }
  ],
  "pitfalls": [
    "Middleware ichida og'ir DB so'rovlarini har so'rovda bajarish tezlikni tushiradi.",
    "`$next($request)` chaqirilmasa va javob qaytarilmasa so'rov osilib qoladi.",
    "Tartib: autentifikatsiya ruxsatdan oldin, aks holda `user()` null.",
    "`withoutMiddleware` testlarda real xatti-harakatni yashiradi."
  ]
});
