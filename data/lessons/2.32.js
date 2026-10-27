/* Chuqur dars: 2.32. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.32", {
  "lesson": [
    "### Sessiya",
    "HTTP stateless; sessiya foydalanuvchi holatini so'rovlar orasida saqlaydi. Drayverlar (`SESSION_DRIVER`): `file`, `cookie`, `database` (L11 da default), `redis`, `memcached`, `array` (test). Ko'p serverda `database`/`redis`.",
    "",
    "### Ishlatish",
    "`$request->session()->get('key')`, `put()`, `forget()`, `flush()`; `session('key')` helper. **Flash:** `with('status', 'Saqlandi')` / `flash()` — keyingi so'rovgacha. `old('field')` — validatsiya xatosidan keyin.",
    "",
    "### Autentifikatsiya (web)",
    "`Auth::attempt(['email' => $e, 'password' => $p], $remember)` — tekshiradi va sessiyaga kirgizadi. `Auth::login($user)`, `Auth::logout()`, `Auth::user()`, `Auth::id()`, `Auth::check()`.",
    "- **Xavfsizlik:** kirishdan keyin `$request->session()->regenerate()` (session fixation), chiqishda `invalidate()` + `regenerateToken()`.",
    "- `auth` middleware, `guest`, `verified`, `password.confirm`.",
    "- Guards/providers: `config/auth.php` (`web` guard — sessiya, `api` — token/Sanctum).",
    "",
    "### Starter kitlar",
    "**Breeze** (sodda: Blade/Livewire/Inertia), **Jetstream**, L12 yangi starter kit'lar (React/Vue/Livewire, ixtiyoriy WorkOS AuthKit). Ular login/ro'yxat/parol tiklash/email tasdiqlash tayyor beradi.",
    "",
    "### Parol va CSRF",
    "`Hash::make()` (bcrypt/argon), `Hash::check()`, `needsRehash`. Formada `@csrf`; `VerifyCsrfToken` middleware. `SESSION_LIFETIME`, `SESSION_SECURE_COOKIE`, `SESSION_SAME_SITE`.",
    "",
    "### Throttle",
    "Login urinishlarini cheklash (`RateLimiter`/`throttle`, Fortify/Breeze o'zi qiladi).",
    "",
    "### Sanctum",
    "SPA (cookie) va mobil/API (token) uchun: Sanctum (alohida mavzu).",
    "",
    "### Qoidalar",
    "Parolni oddiy matnda saqlamang; logout'da to'liq tozalang; httpOnly/secure cookie; 2FA ni o'ylab ko'ring."
  ],
  "examples": [
    {
      "title": "Login va logout",
      "lang": "php",
      "code": [
        "public function login(Request $r): RedirectResponse",
        "{",
        "    $cred = $r->validate(['email' => ['required', 'email'], 'password' => ['required']]);",
        "    if (! Auth::attempt($cred, $r->boolean('remember'))) {",
        "        return back()->withErrors(['email' => 'Maʼlumotlar noto\\'g\\'ri'])->onlyInput('email');",
        "    }",
        "    $r->session()->regenerate();          // session fixation himoyasi",
        "    return redirect()->intended('/dashboard');",
        "}",
        "",
        "public function logout(Request $r): RedirectResponse",
        "{",
        "    Auth::logout(); $r->session()->invalidate(); $r->session()->regenerateToken();",
        "    return redirect('/');",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Kirishdan keyin `session()->regenerate()` qilmaslik session fixation zaifligi.",
    "Chiqishda `invalidate()` va `regenerateToken()` unutilsa eski sessiya/CSRF qoladi.",
    "Ko'p serverda `file` sessiya ishlamaydi: `database`/`redis`.",
    "Login urinishlarini cheklamaslik brute-force hujumiga ochiq."
  ]
});
