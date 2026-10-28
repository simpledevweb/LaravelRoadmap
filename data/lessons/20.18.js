/* Chuqur dars: 20.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.18", {
  "lesson": [
    "### Hujum turlari",
    "- **Brute-force:** bitta akkaunt uchun ko'p parollarni sinash.",
    "- **Password spraying:** ko'p akkauntlar uchun bir nechta keng tarqalgan parol (`123456`, `Qwerty123`). Har akkauntga 1–2 urinish, shuning uchun akkaunt bo'yicha limit ushlamaydi.",
    "- **Credential stuffing:** boshqa saytlardan sizib chiqqan email+parol juftliklarini sinash. Odamlar parollarni takror ishlatadi va bu eng samarali hujum.",
    "- **OTP brute-force:** 4–6 xonali SMS kodni sinash (10 000 – 1 000 000 variant).",
    "- **Parolni tiklash suiiste'moli:** token'larni taxmin qilish yoki SMS bombing.",
    "",
    "### Himoya qatlamlari",
    "**1. Rate limiting** (18.15, 20.19) — asosiy himoya:",
    "- `email + IP` bo'yicha: 5 urinish / daqiqa.",
    "- Faqat `IP` bo'yicha: spraying'ga qarshi, masalan 30 / daqiqa.",
    "- Faqat `email` bo'yicha (IP'dan qat'iy nazar): taqsimlangan hujumga qarshi, masalan 20 / soat.",
    "- OTP: kod bo'yicha 5 urinish, keyin kod bekor va yangisini so'rash.",
    "",
    "**2. Progressiv kechikish yoki vaqtinchalik bloklash.** Ketma-ket muvaffaqiyatsiz urinishlardan keyin kutish vaqti oshadi. Doimiy bloklashdan ehtiyot bo'ling: hujumchi istalgan foydalanuvchini atayin bloklab, DoS qila oladi. Vaqtinchalik (15 daqiqa) va akkaunt egasiga xabar.",
    "",
    "**3. CAPTCHA** — shubhali holatlarda: bir necha muvaffaqiyatsiz urinishdan keyin yoki yangi IP/mamlakat. Har login'da emas (qulaylik).",
    "",
    "**4. Bir xil javob va vaqt.** \"Bunday foydalanuvchi yo'q\" va \"parol noto'g'ri\" uchun bir xil xabar va taxminan bir xil javob vaqti. Aks holda hujumchi mavjud email'larni aniqlaydi (user enumeration). Parolni tiklashda ham: \"Agar bunday akkaunt bo'lsa, xat yuborildi\".",
    "",
    "**5. Kuchli parollar.** Minimal uzunlik (8+, yaxshisi 12+), sizib chiqqan parollar bazasiga tekshirish. Laravel: `Password::min(12)->uncompromised()` (Have I Been Pwned k-anonymity API orqali). Murakkab qoidalar (katta harf, belgi) o'rniga uzunlik va sizib chiqmaganlik.",
    "",
    "**6. MFA** (20.22) — credential stuffing'ga qarshi eng kuchli himoya: parol to'g'ri bo'lsa ham, ikkinchi faktorsiz kirib bo'lmaydi.",
    "",
    "**7. Monitoring va alert:** muvaffaqiyatsiz login'lar soni, IP va ASN bo'yicha anomaliyalar, bitta IP'dan ko'p akkauntlar. Laravel'da `Failed` va `Lockout` event'lari.",
    "",
    "**8. Tarmoq darajasi:** WAF yoki Cloudflare bot himoyasi ilovaga yetmasdan oldin to'xtatadi."
  ],
  "examples": [
    {
      "title": "Ko'p qatlamli login limiti",
      "lang": "php",
      "code": [
        "RateLimiter::for('login', function (Request $request) {",
        "    $email = Str::lower((string) $request->input('email'));",
        "    $ip = $request->ip();",
        "",
        "    return [",
        "        Limit::perMinute(5)->by(\"login:{$email}|{$ip}\"),",
        "        Limit::perMinute(30)->by(\"login-ip:{$ip}\"),",
        "        Limit::perHour(20)->by(\"login-email:{$email}\"),",
        "    ];",
        "});",
        "",
        "Route::post('login', LoginController::class)->middleware('throttle:login');",
        "",
        "// Parol qoidalari",
        "Password::defaults(fn () => Password::min(12)->uncompromised());"
      ]
    },
    {
      "title": "Enumeration'siz login va monitoring",
      "lang": "php",
      "code": [
        "public function __invoke(LoginRequest $request)",
        "{",
        "    $user = User::where('email', $request->email)->first();",
        "",
        "    // Foydalanuvchi bo'lmasa ham hash tekshiruvi: javob vaqti bir xil",
        "    $valid = Hash::check($request->password, $user?->password ?? '$2y$12$' . str_repeat('a', 53));",
        "",
        "    if (! $user || ! $valid) {",
        "        event(new Failed('web', $user, $request->only('email')));",
        "        throw ValidationException::withMessages(['email' => 'Email yoki parol noto\\'g\\'ri']);",
        "    }",
        "",
        "    // ...",
        "}",
        "",
        "// Listener: Failed event'larini metrikaga yozish va anomaliya alert'i",
        "Event::listen(Failed::class, fn (Failed $e) => Metrics::increment('auth.login.failed'));"
      ],
      "note": "Soxta hash ham real hash bilan bir xil algoritm va `cost` ga ega bo'lishi kerak, aks holda vaqt farqi qoladi."
    }
  ],
  "pitfalls": [
    "Faqat akkaunt bo'yicha limit: password spraying va taqsimlangan hujumlar o'tib ketadi.",
    "Doimiy bloklash: hujumchi istalgan foydalanuvchini bloklab qo'yadi.",
    "\"Bunday foydalanuvchi yo'q\" xabari yoki javob vaqtidagi farq orqali email'larni oshkor qilish.",
    "OTP kodlariga urinishlar sonini cheklamaslik."
  ]
});
