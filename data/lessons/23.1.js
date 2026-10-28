/* Chuqur dars: 23.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.1", {
  "lesson": [
    "### SPA rejimi g'oyasi",
    "Birinchi tomon SPA (Vue, React, Nuxt yoki Inertia'siz alohida frontend) uchun Sanctum **token ishlatmaydi**. U oddiy Laravel **session cookie** bilan ishlaydi, faqat uni boshqa subdomendagi frontend'dan keladigan AJAX so'rovlari uchun moslaydi. Natija: token JavaScript'da saqlanmaydi va XSS orqali o'g'irlanmaydi (20.20, 22.12).",
    "",
    "### Talab: bir xil yuqori darajali domen",
    "Frontend va API bitta registrlangan domen ostida bo'lishi kerak: `app.example.uz` va `api.example.uz` (yoki ikkalasi ham `example.uz`). Brauzer `SameSite=Lax` cookie'ni faqat \"same-site\" so'rovlarda yuboradi. Butunlay boshqa domen (`myapp.com` → `api.other.uz`) uchun SPA rejimi ishlamaydi va token rejimi kerak.",
    "",
    "### Oqim",
    "1. **CSRF cookie:** `GET /sanctum/csrf-cookie`. Laravel `XSRF-TOKEN` cookie'sini o'rnatadi (JavaScript o'qiy oladi).",
    "2. **Login:** `POST /login` email va parol bilan. Axios `XSRF-TOKEN` ni avtomatik `X-XSRF-TOKEN` header'iga qo'yadi. Laravel session yaratadi va `laravel_session` cookie'sini (`HttpOnly`) o'rnatadi.",
    "3. **API so'rovlar:** `GET /api/user` va boshqalar `withCredentials: true` bilan. `auth:sanctum` guard so'rov stateful domendan kelganini ko'rib, session orqali foydalanuvchini aniqlaydi.",
    "4. **Logout:** `POST /logout` → `Auth::guard('web')->logout()`, session invalidatsiya.",
    "",
    "### Sozlash qismlari",
    "- **Stateful domenlar** (23.7): `SANCTUM_STATEFUL_DOMAINS=app.example.uz,localhost:5173`.",
    "- **Session domeni:** `SESSION_DOMAIN=.example.uz` (subdomenlar o'rtasida cookie).",
    "- **Middleware:** Laravel 11+ da `bootstrap/app.php` ichida `$middleware->statefulApi()`. U `api` guruhiga `EnsureFrontendRequestsAreStateful` ni qo'shadi.",
    "- **CORS** (23.10): `supports_credentials => true`, aniq `allowed_origins`.",
    "- **CSRF** (23.8): avtomatik, `/sanctum/csrf-cookie` orqali.",
    "",
    "### Login endpoint'i",
    "Sanctum o'zi login route bermaydi. Fortify, Breeze API stack yoki o'zingiz yozgan controller (`Auth::attempt()` + `session()->regenerate()`, 20.2). Bu oddiy web login, faqat JSON javob bilan.",
    "",
    "### Inertia va Livewire",
    "Laravel ichida render qilinadigan frontend (Inertia, Livewire, Blade) uchun Sanctum shart emas: oddiy `web` guard va session yetarli. SPA rejimi alohida joylashgan frontend uchun."
  ],
  "examples": [
    {
      "title": "Backend sozlamalari",
      "lang": "php",
      "code": [
        "// bootstrap/app.php (Laravel 11+)",
        "->withMiddleware(function (Middleware $middleware) {",
        "    $middleware->statefulApi();",
        "})",
        "",
        "// .env",
        "// SANCTUM_STATEFUL_DOMAINS=app.example.uz,localhost:5173",
        "// SESSION_DOMAIN=.example.uz",
        "// SESSION_SECURE_COOKIE=true",
        "",
        "// routes/web.php yoki api.php: login",
        "Route::post('/login', function (Request $request) {",
        "    $credentials = $request->validate(['email' => 'required|email', 'password' => 'required']);",
        "    abort_unless(Auth::attempt($credentials), 422, __('auth.failed'));",
        "    $request->session()->regenerate();",
        "    return response()->noContent();",
        "})->middleware('throttle:login');",
        "",
        "Route::middleware('auth:sanctum')->get('/api/user', fn (Request $r) => $r->user());"
      ]
    },
    {
      "title": "Frontend (Axios)",
      "lang": "javascript",
      "code": [
        "import axios from 'axios';",
        "",
        "export const http = axios.create({",
        "  baseURL: 'https://api.example.uz',",
        "  withCredentials: true,",
        "  withXSRFToken: true,",
        "  headers: { Accept: 'application/json' },",
        "});",
        "",
        "export async function login(email, password) {",
        "  await http.get('/sanctum/csrf-cookie');",
        "  await http.post('/login', { email, password });",
        "  return (await http.get('/api/user')).data;",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Frontend va API butunlay boshqa domenlarda bo'lganda SPA rejimini ishlatishga urinish.",
    "`/sanctum/csrf-cookie` ni chaqirmasdan login: `419 CSRF token mismatch`.",
    "`withCredentials` ni unutish: cookie'lar yuborilmaydi va foydalanuvchi har doim `401`.",
    "Login'dan keyin session'ni `regenerate()` qilmaslik."
  ]
});
