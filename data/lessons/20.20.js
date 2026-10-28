/* Chuqur dars: 20.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.20", {
  "lesson": [
    "### Server tomonida",
    "**Token'lar faqat hash shaklida.** DB sizib chiqsa (SQL injection, backup o'g'irlanishi, noto'g'ri ochilgan dump), hujumchi token'larni ishlata olmasin. Token'lar yuqori entropiyali bo'lgani uchun SHA-256 yetarli (Sanctum shunday qiladi). Parollar esa sekin hash bilan: bcrypt yoki argon2id (`Hash::make`).",
    "",
    "**Maxfiy kalitlar** — `APP_KEY`, JWT/Passport imzo kalitlari, to'lov shlyuzi secret'lari, DB parollari:",
    "- Git'da hech qachon. `.env` `.gitignore` da, `.env.example` da faqat bo'sh qiymatlar.",
    "- Production'da secret manager: AWS Secrets Manager, HashiCorp Vault, Doppler, yoki kamida server'da cheklangan huquqli `.env` (`chmod 600`, egasi deploy foydalanuvchisi).",
    "- Laravel 9+ `php artisan env:encrypt` shifrlangan `.env.production.encrypted` ni repozitoriyda saqlashga imkon beradi (kalit alohida).",
    "- Rotatsiya rejasi: `APP_KEY` almashtirish shifrlangan ma'lumot va session'larni buzadi. Laravel 11+ da `APP_PREVIOUS_KEYS` eski kalitlar bilan dekodlashni davom ettiradi.",
    "",
    "**Log'lar va xato hisobotlari:** `Authorization`, `Cookie`, `X-API-Key` header'lari, `password`, `token`, `secret` maydonlari filtrlanadi (20.3). Laravel validatsiya xatolarida `password` ni flash qilmaydi (`$dontFlash`). Sentry va Telescope'da maxfiy maydonlarni yashiring.",
    "",
    "### Brauzerda",
    "| Joy | XSS'da o'g'irlanadimi | CSRF xavfi |",
    "|---|---|---|",
    "| `localStorage` / `sessionStorage` | **ha** | yo'q |",
    "| JS'dagi o'zgaruvchi (xotira) | ha (sahifa ochiq paytda) | yo'q |",
    "| `HttpOnly` cookie | **yo'q** | bor (SameSite va CSRF token bilan himoya) |",
    "",
    "Tavsiya: birinchi tomon SPA uchun **`HttpOnly` + `Secure` + `SameSite=Lax/Strict` cookie** (Sanctum SPA rejimi, 20.8). XSS bo'lsa ham token o'g'irlanmaydi (lekin hujumchi sahifa ichidan so'rov yubora oladi, shuning uchun XSS'ni baribir oldini olish kerak, CSP bilan). Token'ni `localStorage` da saqlash — eng keng tarqalgan xato.",
    "",
    "### Mobil ilovada",
    "- **iOS:** Keychain (`kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`).",
    "- **Android:** Android Keystore, EncryptedSharedPreferences (Jetpack Security) yoki DataStore + Keystore.",
    "- Oddiy `SharedPreferences`, `UserDefaults` yoki fayllarda emas: root qilingan qurilmada yoki backup orqali o'qiladi.",
    "- Ilova kodiga maxfiy kalit joylashtirmang: dekompilyatsiya qilinadi.",
    "",
    "### Server-server",
    "- Kalitlar secret manager'da yoki CI/CD maxfiy o'zgaruvchilarida (masked, protected).",
    "- Kubernetes'da Secrets (shifrlash bilan) yoki External Secrets Operator.",
    "- Iloji bo'lsa, statik kalitlar o'rniga qisqa muddatli identifikatsiya (AWS IAM roles, workload identity).",
    "",
    "### Sizib chiqishni aniqlash",
    "Git'da secret scanning (GitHub, GitLab), pre-commit hook'lar (`gitleaks`). Token prefikslari (20.4) bu vositalarni samaraliroq qiladi."
  ],
  "examples": [
    {
      "title": "Maxfiy maydonlarni yashirish",
      "lang": "php",
      "code": [
        "// bootstrap/app.php (Laravel 11+)",
        "->withExceptions(function (Exceptions $exceptions) {",
        "    $exceptions->dontFlash(['current_password', 'password', 'password_confirmation', 'token', 'otp']);",
        "})",
        "",
        "// Telescope",
        "Telescope::hideRequestParameters(['password', 'token', 'otp', 'card_number']);",
        "Telescope::hideRequestHeaders(['authorization', 'cookie', 'x-api-key', 'x-xsrf-token']);",
        "",
        "// Shifrlangan .env",
        "// php artisan env:encrypt --env=production",
        "// deploy: php artisan env:decrypt --env=production --key=$LARAVEL_ENV_ENCRYPTION_KEY"
      ]
    },
    {
      "title": "Refresh token uchun xavfsiz cookie",
      "lang": "php",
      "code": [
        "return response()->json(['access_token' => $access, 'expires_in' => 900])",
        "    ->cookie(",
        "        name: 'refresh_token',",
        "        value: $refresh,",
        "        minutes: 60 * 24 * 30,",
        "        path: '/api/auth/refresh',  // faqat shu endpoint'ga yuboriladi",
        "        domain: null,",
        "        secure: true,",
        "        httpOnly: true,",
        "        raw: false,",
        "        sameSite: 'strict',",
        "    );"
      ]
    }
  ],
  "pitfalls": [
    "Token'larni brauzer `localStorage` ida saqlash: har qanday XSS ularni o'g'irlaydi.",
    "`.env` yoki kalit fayllarini Git'ga commit qilish.",
    "Mobil ilovada token'ni oddiy `SharedPreferences` yoki `UserDefaults` da saqlash.",
    "Log va xato hisobotlarida `Authorization` header'ini qoldirish."
  ]
});
