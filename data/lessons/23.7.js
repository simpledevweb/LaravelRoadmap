/* Chuqur dars: 23.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.7", {
  "lesson": [
    "### Stateful domen nima",
    "`auth:sanctum` guard har so'rov uchun qaror qabul qiladi: **session (cookie) bo'yicha** autentifikatsiya qilish kerakmi yoki **Bearer token** bo'yichami? Qaror so'rov qayerdan kelganiga bog'liq. Sanctum so'rovning `Origin` yoki `Referer` header'ini `stateful` ro'yxati bilan solishtiradi:",
    "- Mos kelsa — so'rov **stateful**: session middleware'lari (cookie shifrlash, session boshlash, CSRF tekshiruvi) qo'llanadi va foydalanuvchi session'dan olinadi.",
    "- Mos kelmasa — so'rov **stateless**: faqat Bearer token tekshiriladi, cookie'lar e'tiborsiz.",
    "",
    "Bu mexanizm bitta API'ga ham SPA (cookie), ham mobil ilova (token) xizmat qilishiga imkon beradi.",
    "",
    "### Sozlash",
    "`config/sanctum.php` → `stateful`, odatda env orqali:",
    "`SANCTUM_STATEFUL_DOMAINS=app.example.uz,admin.example.uz,localhost:5173,127.0.0.1:8000`",
    "",
    "Qoidalar:",
    "- Faqat **host va port**, protokol va yo'lsiz: `app.example.uz`, `localhost:5173`. `https://app.example.uz/` emas.",
    "- Port standart bo'lmasa, albatta ko'rsatiladi: `localhost:3000` va `localhost:5173` — har xil.",
    "- Wildcard'lar qo'llanadi (`*.example.uz`), lekin ehtiyotkorlik bilan.",
    "- Laravel default konfiguratsiyasi `localhost`, `127.0.0.1` va `APP_URL` hostini qo'shadi (`Sanctum::currentApplicationUrlWithPort()`).",
    "- Production env'ida dev domenlari (`localhost`) bo'lmasin.",
    "",
    "### Tez-tez uchraydigan muammolar",
    "1. **Login ishlaydi, keyingi so'rov `401`.** Frontend domeni ro'yxatda yo'q yoki porti noto'g'ri: so'rov stateless deb qaraladi va cookie e'tiborsiz qoldiriladi.",
    "2. **`419 CSRF token mismatch`.** Stateful so'rov, lekin `X-XSRF-TOKEN` header'i yo'q yoki `/sanctum/csrf-cookie` chaqirilmagan (23.8).",
    "3. **Cookie umuman o'rnatilmaydi.** `SESSION_DOMAIN` noto'g'ri yoki CORS'da `supports_credentials` yo'q (23.10).",
    "4. **Mobil ilova `419` oladi.** Mobil HTTP klienti `Origin` yoki `Referer` header'ini stateful domen bilan yuborgan. Odatda kamdan-kam, lekin WebView ichida bo'lishi mumkin.",
    "",
    "### Xavfsizlik jihati",
    "Stateful domenlar ro'yxati — ishonch ro'yxati. Unga faqat **o'zingiz nazorat qiladigan** frontend'larni qo'shing. Ro'yxatdagi domen egallab olinsa (subdomain takeover) yoki unda XSS bo'lsa, u foydalanuvchi session'i bilan API'ga so'rov yubora oladi.",
    "",
    "### Laravel 11+",
    "`bootstrap/app.php` → `$middleware->statefulApi()`. Bu `api` middleware guruhiga `EnsureFrontendRequestsAreStateful` ni qo'shadi. Usiz SPA rejimi ishlamaydi."
  ],
  "examples": [
    {
      "title": "Muhitlar bo'yicha sozlash",
      "lang": "bash",
      "code": [
        "# .env (local)",
        "APP_URL=http://localhost:8000",
        "SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:8000",
        "SESSION_DOMAIN=localhost",
        "",
        "# .env (production)",
        "APP_URL=https://api.example.uz",
        "SANCTUM_STATEFUL_DOMAINS=app.example.uz,admin.example.uz",
        "SESSION_DOMAIN=.example.uz",
        "SESSION_SECURE_COOKIE=true"
      ]
    },
    {
      "title": "Stateful ekanini debug qilish",
      "lang": "php",
      "code": [
        "Route::get('/debug/sanctum', function (Request $request) {",
        "    return [",
        "        'origin' => $request->headers->get('origin'),",
        "        'referer' => $request->headers->get('referer'),",
        "        'stateful' => \\Laravel\\Sanctum\\Http\\Middleware\\EnsureFrontendRequestsAreStateful::fromFrontend($request),",
        "        'stateful_domains' => config('sanctum.stateful'),",
        "        'user' => $request->user('sanctum')?->id,",
        "    ];",
        "})->middleware('api');"
      ],
      "note": "Faqat lokal debug uchun. Production'da bunday route qoldirmang."
    }
  ],
  "pitfalls": [
    "Stateful domenlarga protokol yoki yo'l qo'shish (`https://app.example.uz/`): moslik bo'lmaydi.",
    "Frontend dev server portini ko'rsatmaslik (`localhost` o'rniga `localhost:5173`).",
    "Production'da `localhost` ni stateful ro'yxatda qoldirish.",
    "Laravel 11 da `statefulApi()` ni yoqmasdan SPA rejimini kutish."
  ]
});
