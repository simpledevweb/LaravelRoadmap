/* Chuqur dars: 23.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.8", {
  "lesson": [
    "### Nega SPA rejimida CSRF kerak",
    "Cookie asosidagi autentifikatsiyada brauzer session cookie'sini **avtomatik** yuboradi. Boshqa sayt (`evil.example`) foydalanuvchi brauzerida `api.example.uz` ga so'rov yuborsa, cookie ham ketadi va so'rov foydalanuvchi nomidan bajariladi. Bu **CSRF** (Cross-Site Request Forgery). Bearer token rejimida bu muammo yo'q: token'ni brauzer avtomatik qo'shmaydi.",
    "",
    "### Himoya qatlamlari",
    "1. **`SameSite=Lax`** cookie (Laravel default): boshqa saytdan kelgan POST, PUT, DELETE so'rovlarida cookie yuborilmaydi. Asosiy himoya, lekin yagona emas: eski brauzerlar, \"same-site\" ammo boshqa subdomen (masalan, foydalanuvchi kontenti joylashgan `files.example.uz`) va GET orqali holat o'zgartirish holatlari.",
    "2. **CSRF token:** Laravel'ning `VerifyCsrfToken` (Laravel 11+ da `ValidateCsrfToken`) middleware'i har holat o'zgartiruvchi so'rovda token kutadi.",
    "",
    "### Sanctum'dagi oqim",
    "1. SPA `GET /sanctum/csrf-cookie` ni chaqiradi.",
    "2. Laravel `XSRF-TOKEN` cookie'sini o'rnatadi: shifrlangan CSRF token, `HttpOnly` **emas** (JavaScript o'qishi kerak).",
    "3. Axios (yoki boshqa klient) har so'rovda `XSRF-TOKEN` cookie qiymatini `X-XSRF-TOKEN` header'iga qo'yadi.",
    "4. Laravel header'dagi qiymatni dekodlab, session'dagi token bilan solishtiradi.",
    "",
    "Boshqa sayt `XSRF-TOKEN` cookie'sini o'qiy olmaydi (same-origin policy) va to'g'ri header'ni yasay olmaydi.",
    "",
    "### Axios va fetch",
    "- **Axios** `XSRF-TOKEN` → `X-XSRF-TOKEN` ni avtomatik qiladi, lekin 1.x versiyalarida faqat **bir xil origin**ga. Boshqa subdomenga (`api.example.uz`) so'rovda `withXSRFToken: true` kerak.",
    "- **fetch** buni qilmaydi: cookie'dan o'qib, header'ni qo'lda qo'shing va `credentials: 'include'`.",
    "",
    "### Login va CSRF",
    "Login endpoint'i ham CSRF bilan himoyalanadi (login CSRF — 21.12 ga o'xshash hujum: foydalanuvchini hujumchi akkauntiga kiritish). Shuning uchun `/sanctum/csrf-cookie` login'dan **oldin** chaqiriladi.",
    "",
    "### Token mismatch (419)",
    "Sabablari:",
    "- `/sanctum/csrf-cookie` chaqirilmagan yoki cookie boshqa domenga o'rnatilgan (`SESSION_DOMAIN`).",
    "- `X-XSRF-TOKEN` header'i yuborilmagan (fetch, Axios cross-origin).",
    "- Session muddati tugagan yoki login'dan keyin session yangilangan, lekin SPA eski token'ni ishlatmoqda. `/sanctum/csrf-cookie` ni qayta chaqirish.",
    "- Session driver ishlamayapti (cookie hajmi, Redis ulanishi).",
    "",
    "### CSRF'dan chiqarib qo'yish",
    "Webhook'lar kabi tashqi so'rovlar uchun route'larni CSRF'dan istisno qilish mumkin (Laravel 11+: `$middleware->validateCsrfTokens(except: ['webhooks/*'])`). Lekin ularni imzo bilan himoyalang (24.x) va **hech qachon** session bilan autentifikatsiya qilinadigan API route'larni istisno qilmang."
  ],
  "examples": [
    {
      "title": "fetch bilan CSRF",
      "lang": "javascript",
      "code": [
        "const xsrf = () => decodeURIComponent(",
        "  document.cookie.split('; ').find((c) => c.startsWith('XSRF-TOKEN='))?.split('=')[1] ?? ''",
        ");",
        "",
        "await fetch('https://api.example.uz/sanctum/csrf-cookie', { credentials: 'include' });",
        "",
        "await fetch('https://api.example.uz/login', {",
        "  method: 'POST',",
        "  credentials: 'include',",
        "  headers: {",
        "    'Content-Type': 'application/json',",
        "    Accept: 'application/json',",
        "    'X-XSRF-TOKEN': xsrf(),",
        "  },",
        "  body: JSON.stringify({ email, password }),",
        "});"
      ],
      "note": "`XSRF-TOKEN` cookie `.example.uz` domenida bo'lsa, `app.example.uz` dagi JavaScript uni o'qiy oladi."
    },
    {
      "title": "Laravel 11: istisnolar",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "->withMiddleware(function (Middleware $middleware) {",
        "    $middleware->statefulApi();",
        "    $middleware->validateCsrfTokens(except: [",
        "        'webhooks/payme',     // imzo bilan himoyalangan",
        "        'webhooks/click',",
        "    ]);",
        "})"
      ]
    }
  ],
  "pitfalls": [
    "`419` dan qutulish uchun API route'larni CSRF'dan butunlay istisno qilish.",
    "Axios 1.x da cross-subdomain so'rovlar uchun `withXSRFToken` ni yoqmaslik.",
    "Login'dan oldin `/sanctum/csrf-cookie` ni chaqirmaslik.",
    "GET so'rovlar orqali holat o'zgartirish: CSRF token GET'da tekshirilmaydi."
  ]
});
