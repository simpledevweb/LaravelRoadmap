/* Chuqur dars: 23.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.9", {
  "lesson": [
    "### Session cookie'si",
    "SPA rejimida autentifikatsiya oddiy Laravel session'i orqali (20.2). Brauzerda ikkita muhim cookie:",
    "- **`laravel_session`** (nomi `SESSION_COOKIE` bilan): session ID, shifrlangan, `HttpOnly`. JavaScript ko'rmaydi.",
    "- **`XSRF-TOKEN`:** CSRF token, `HttpOnly` emas (23.8).",
    "",
    "Laravel barcha cookie'larni `APP_KEY` bilan shifrlaydi va imzolaydi (`EncryptCookies` middleware). Ular o'zgartirilsa, rad etiladi.",
    "",
    "### Cookie atributlari (`config/session.php`)",
    "- **`domain`** (`SESSION_DOMAIN`): `.example.uz` — barcha subdomenlarga. `null` — faqat cookie o'rnatgan host. SPA `app.example.uz` va API `api.example.uz` bo'lsa, umumiy ota domen kerak.",
    "- **`secure`** (`SESSION_SECURE_COOKIE=true`): faqat HTTPS orqali. Production'da majburiy.",
    "- **`http_only`** (`true`): JavaScript o'qiy olmaydi.",
    "- **`same_site`** (`lax` default): CSRF'ga qarshi asosiy himoya. `strict` — tashqi saytdan havola orqali kelganda ham cookie yuborilmaydi (foydalanuvchi \"chiqib ketgandek\" ko'rinadi). `none` — har qanday kontekstda yuboriladi va `secure` talab qiladi. Butunlay boshqa domendagi frontend uchun kerak bo'lishi mumkin, lekin CSRF xavfi oshadi va brauzerlar uchinchi tomon cookie'larini tobora bloklaydi. Bunday holatda token rejimi yaxshiroq.",
    "- **`lifetime`** (`SESSION_LIFETIME`, daqiqa) va **`expire_on_close`**.",
    "- **`partitioned`** (CHIPS, Laravel 10.x+): uchinchi tomon kontekstidagi cookie'lar uchun.",
    "",
    "### Session driver",
    "- `file` — bitta server uchun. Ko'p serverda foydalanuvchilar \"chiqib ketadi\".",
    "- `database` yoki `redis` — ko'p server uchun. Redis tez va TTL avtomatik.",
    "- `cookie` — session ma'lumotining o'zi cookie'da (shifrlangan). Server holatsiz, lekin 4 KB chegara va server tomondan bekor qilib bo'lmaydi.",
    "",
    "### Afzalliklar va kamchiliklar",
    "Afzalliklar: token JavaScript'da yo'q, XSS uni olib keta olmaydi; server tomonda darhol bekor qilish; tanish va sinalgan mexanizm.",
    "",
    "Kamchiliklar: CSRF himoyasi kerak; bir xil ota domen talabi; CORS bilan credentials sozlamalari (23.10); mobil ilovalar uchun noqulay.",
    "",
    "### Sessiya xavfsizligi",
    "- Login'dan keyin `session()->regenerate()` (session fixation).",
    "- Logout'da `invalidate()` va `regenerateToken()`.",
    "- Muhim amallar uchun `password.confirm` middleware.",
    "- `AuthenticateSession` middleware: parol o'zgarganda boshqa qurilmalardagi session'larni bekor qiladi (`Auth::logoutOtherDevices()`)."
  ],
  "examples": [
    {
      "title": "Production session sozlamalari",
      "lang": "bash",
      "code": [
        "SESSION_DRIVER=redis",
        "SESSION_LIFETIME=120",
        "SESSION_DOMAIN=.example.uz",
        "SESSION_SECURE_COOKIE=true",
        "SESSION_SAME_SITE=lax",
        "SESSION_COOKIE=exampleuz_session"
      ]
    },
    {
      "title": "Brauzer DevTools'da tekshirish",
      "lang": "text",
      "code": [
        "Application -> Cookies -> https://app.example.uz",
        "",
        "Name               Domain        HttpOnly  Secure  SameSite",
        "exampleuz_session  .example.uz   ✓         ✓       Lax",
        "XSRF-TOKEN         .example.uz             ✓       Lax",
        "",
        "Agar Domain = api.example.uz bo'lsa: SESSION_DOMAIN noto'g'ri,",
        "app.example.uz dagi JavaScript XSRF-TOKEN ni o'qiy olmaydi."
      ]
    }
  ],
  "pitfalls": [
    "`SESSION_DOMAIN` ni sozlamaslik: cookie faqat API hostida, SPA uni ko'rmaydi.",
    "Production'da `SESSION_SECURE_COOKIE=false`.",
    "Butunlay boshqa domendagi frontend uchun `SameSite=None` bilan cookie rejimini majburlash.",
    "Ko'p serverli muhitda `file` session driver."
  ]
});
