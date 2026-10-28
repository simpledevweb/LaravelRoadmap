/* Chuqur dars: 20.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.1", {
  "lesson": [
    "### Ikki savol, ikki bosqich",
    "- **Autentifikatsiya (AuthN):** \"Siz kimsiz?\" So'rov yuboruvchining shaxsini tasdiqlash: parol, token, sertifikat, biometriya, ikkinchi faktor.",
    "- **Avtorizatsiya (AuthZ):** \"Sizga bunga ruxsat bormi?\" Tasdiqlangan shaxs aynan shu amalni shu resursda bajara oladimi.",
    "",
    "Tartib doim: avval autentifikatsiya, keyin avtorizatsiya. Kimligini bilmasdan ruxsatni tekshirib bo'lmaydi. Lekin ular **alohida** mexanizmlar va alohida xatolar bilan ifodalanadi.",
    "",
    "### HTTP'dagi ifodasi",
    "- **401 Unauthorized** — aslida \"unauthenticated\": token yo'q, noto'g'ri yoki muddati o'tgan. Javobda `WWW-Authenticate: Bearer` header'i bo'lishi kerak. Mijoz harakati: qayta login yoki token yangilash.",
    "- **403 Forbidden** — kimligingiz ma'lum, lekin ruxsat yo'q. Mijoz harakati: qayta login yordam bermaydi. Foydalanuvchiga \"ruxsat yo'q\" deyish.",
    "- **404 Not Found** — ba'zan 403 o'rniga: resurs mavjudligini oshkor qilmaslik uchun (boshqa foydalanuvchining buyurtmasi).",
    "",
    "### Faktorlar",
    "Autentifikatsiya \"faktorlari\":",
    "- **Bilish:** parol, PIN.",
    "- **Egalik:** telefon (SMS, TOTP ilova), apparat kalit, sertifikat.",
    "- **O'zlik:** barmoq izi, yuz.",
    "",
    "MFA turli **toifalardagi** kamida ikki faktorni talab qiladi (20.22). Parol + xavfsizlik savoli — ikkalasi ham \"bilish\", shuning uchun MFA emas.",
    "",
    "### Laravel'dagi qatlamlar",
    "**Autentifikatsiya:**",
    "- **Guard'lar** (`config/auth.php`): so'rovdan foydalanuvchini qanday aniqlash. `web` (session), `sanctum` (cookie yoki token), `api` (Passport).",
    "- **Provider'lar:** foydalanuvchi qayerdan olinadi (Eloquent model, DB jadval).",
    "- `auth` middleware, `Auth::user()`, `$request->user()`.",
    "- Starter kit'lar va Fortify: login, ro'yxatdan o'tish, parolni tiklash, 2FA.",
    "",
    "**Avtorizatsiya:**",
    "- **Gate'lar va Policy'lar** (20.11).",
    "- `can` middleware, `$this->authorize()`, `Gate::allows()`, `@can`.",
    "- Token abilities (20.16).",
    "- Rol va ruxsat paketlari (20.10).",
    "",
    "### Tez-tez uchraydigan chalkashlik",
    "\"Login qilgan foydalanuvchi\" ≠ \"ruxsatli foydalanuvchi\". Eng keng tarqalgan API zaifligi (IDOR, 20.13) aynan shu: endpoint faqat `auth` middleware bilan himoyalangan va har qanday tizimga kirgan foydalanuvchi har qanday resursni oladi."
  ],
  "examples": [
    {
      "title": "Ikki qatlam route'da",
      "lang": "php",
      "code": [
        "Route::middleware('auth:sanctum')                 // autentifikatsiya: 401",
        "    ->group(function () {",
        "        Route::get('orders/{order}', [OrderController::class, 'show'])",
        "            ->can('view', 'order');                // avtorizatsiya: 403",
        "",
        "        Route::get('admin/reports', ReportController::class)",
        "            ->can('view-reports');                 // Gate",
        "    });"
      ]
    },
    {
      "title": "401 va 403 javoblari",
      "lang": "http",
      "code": [
        "GET /api/v1/orders/42",
        "",
        "HTTP/1.1 401 Unauthorized",
        "WWW-Authenticate: Bearer error=\"invalid_token\"",
        "{\"message\": \"Unauthenticated.\"}",
        "",
        "GET /api/v1/orders/42",
        "Authorization: Bearer 12|valid...",
        "",
        "HTTP/1.1 403 Forbidden",
        "{\"message\": \"This action is unauthorized.\"}"
      ]
    }
  ],
  "pitfalls": [
    "Faqat `auth` middleware bilan cheklanib, avtorizatsiyani unutish.",
    "Ruxsat yo'qligiga `401` qaytarish: mijoz token'ni yangilab, cheksiz qayta urinadi.",
    "Parol va xavfsizlik savolini MFA deb hisoblash.",
    "Avtorizatsiya mantiqini UI'da yashirish bilan cheklash (tugmani ko'rsatmaslik), serverda tekshirmaslik."
  ]
});
