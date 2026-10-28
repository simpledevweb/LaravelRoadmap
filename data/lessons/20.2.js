/* Chuqur dars: 20.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.2", {
  "lesson": [
    "### Qanday ishlaydi",
    "1. Foydalanuvchi login va parolni yuboradi.",
    "2. Server ularni tekshiradi va **session** yaratadi: server tomonida (fayl, DB, Redis) saqlanadigan ma'lumot, ichida foydalanuvchi ID'si.",
    "3. Brauzerga tasodifiy **session ID** cookie'si beriladi (`laravel_session`).",
    "4. Keyingi har so'rovda brauzer cookie'ni avtomatik yuboradi va server session'dan foydalanuvchini aniqlaydi.",
    "5. Logout'da session yo'q qilinadi.",
    "",
    "Laravel'ning `web` guard'i shunday ishlaydi. Sanctum SPA rejimi ham aynan shu mexanizmni ishlatadi (20.8).",
    "",
    "### Afzalliklari",
    "- **Darhol bekor qilish:** session'ni o'chirish yetarli.",
    "- **Token JavaScript'ga ko'rinmaydi:** `HttpOnly` cookie XSS orqali o'g'irlanmaydi.",
    "- Sodda va yaxshi sinalgan.",
    "",
    "### Kamchiliklari",
    "- Server tomonida holat. Ko'p serverda umumiy session store kerak (Redis, DB), `file` driver emas.",
    "- Cookie'lar faqat bir domen (va subdomenlar) doirasida. Mobil ilovalar va uchinchi tomon integratsiyalari uchun noqulay.",
    "- **CSRF** himoyasi majburiy.",
    "",
    "### Cookie xavfsizligi",
    "- `HttpOnly`: JavaScript `document.cookie` orqali o'qiy olmaydi.",
    "- `Secure`: faqat HTTPS orqali yuboriladi (`SESSION_SECURE_COOKIE=true`).",
    "- `SameSite=Lax` (Laravel default): boshqa saytdan kelgan POST so'rovlarda cookie yuborilmaydi va CSRF xavfi kamayadi. `Strict` yanada qat'iy, lekin tashqi havoladan kelganda login yo'qolgandek ko'rinadi.",
    "- Domen va yo'l (`SESSION_DOMAIN`) keraksiz keng bo'lmasin.",
    "",
    "### Session hujumlari va himoya",
    "- **Session fixation:** hujumchi o'zi bilgan session ID'ni qurbonga \"yuklaydi\", qurbon login qilgach, shu ID orqali kiradi. Himoya: login'dan keyin `$request->session()->regenerate()`. Laravel starter kit'lari buni qiladi.",
    "- **Session hijacking:** cookie o'g'irlanishi. Himoya: HTTPS, `HttpOnly`, qisqa umr.",
    "- **CSRF:** boshqa sayt foydalanuvchi nomidan so'rov yuboradi. Himoya: `SameSite` va Laravel'ning `VerifyCsrfToken` (`@csrf` token).",
    "- **Logout:** `Auth::logout()`, `$request->session()->invalidate()`, `$request->session()->regenerateToken()`.",
    "",
    "### Muddat",
    "- `SESSION_LIFETIME` (daqiqa, faollik bo'yicha).",
    "- `expire_on_close`: brauzer yopilganda.",
    "- \"Remember me\": alohida uzoq muddatli token cookie'si.",
    "- Muhim amallar (parolni o'zgartirish, to'lov) uchun parolni qayta tasdiqlash: `password.confirm` middleware.",
    "- \"Boshqa qurilmalardan chiqish\": `Auth::logoutOtherDevices($password)` (`AuthenticateSession` middleware bilan)."
  ],
  "examples": [
    {
      "title": "Login va logout",
      "lang": "php",
      "code": [
        "public function store(Request $request)",
        "{",
        "    $credentials = $request->validate(['email' => ['required', 'email'], 'password' => ['required']]);",
        "",
        "    if (! Auth::attempt($credentials, $request->boolean('remember'))) {",
        "        throw ValidationException::withMessages(['email' => __('auth.failed')]);",
        "    }",
        "",
        "    $request->session()->regenerate();   // session fixation'ga qarshi",
        "",
        "    return redirect()->intended('/dashboard');",
        "}",
        "",
        "public function destroy(Request $request)",
        "{",
        "    Auth::guard('web')->logout();",
        "    $request->session()->invalidate();",
        "    $request->session()->regenerateToken();",
        "",
        "    return redirect('/');",
        "}"
      ]
    },
    {
      "title": "Production session sozlamalari",
      "lang": "bash",
      "code": [
        "SESSION_DRIVER=redis",
        "SESSION_LIFETIME=120",
        "SESSION_SECURE_COOKIE=true",
        "SESSION_SAME_SITE=lax",
        "SESSION_DOMAIN=.example.uz",
        "SESSION_ENCRYPT=false"
      ],
      "note": "`SESSION_DOMAIN=.example.uz` cookie'ni barcha subdomenlarga ochadi. Faqat kerak bo'lsa (SPA `app.` va API `api.` subdomenlari)."
    }
  ],
  "pitfalls": [
    "Login'dan keyin session ID'ni yangilamaslik: session fixation.",
    "Production'da `Secure` cookie'siz ishlash: cookie HTTP orqali ochiq uzatilishi mumkin.",
    "Ko'p serverli muhitda `file` session driver: foydalanuvchi har so'rovda tizimdan chiqib ketadi.",
    "API route'lardan CSRF'ni o'chirib, ularni session cookie bilan himoyalash: CSRF hujumiga ochiq."
  ]
});
