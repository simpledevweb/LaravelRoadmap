/* Chuqur dars: 20.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.8", {
  "lesson": [
    "### Sanctum nima",
    "Laravel Sanctum — **birinchi tomon** ilovalaringiz (o'z SPA, mobil ilova, oddiy token'li API) uchun yengil autentifikatsiya paketi. Ikki mustaqil rejimi bor va `auth:sanctum` guard'i ikkalasini ham qabul qiladi.",
    "",
    "### 1. SPA rejimi (stateful)",
    "Bir xil yuqori darajali domendagi frontend (masalan, `app.example.uz` va `api.example.uz`) uchun. Token yo'q, oddiy Laravel **session cookie** ishlatiladi:",
    "1. Frontend avval `GET /sanctum/csrf-cookie` ni chaqiradi va `XSRF-TOKEN` cookie'sini oladi.",
    "2. `POST /login` (credentials bilan), Laravel session yaratadi.",
    "3. Keyingi so'rovlar `withCredentials: true` bilan. Cookie avtomatik ketadi, Axios esa `X-XSRF-TOKEN` header'ini qo'shadi.",
    "",
    "Sozlash:",
    "- `SANCTUM_STATEFUL_DOMAINS`: frontend domenlari (`app.example.uz,localhost:5173`).",
    "- `SESSION_DOMAIN=.example.uz`.",
    "- CORS: `supports_credentials => true` va aniq `allowed_origins` (`*` emas).",
    "- Laravel 11+: `$middleware->statefulApi()` `bootstrap/app.php` da.",
    "",
    "Afzalligi: token JavaScript'da saqlanmaydi va XSS orqali o'g'irlanmaydi.",
    "",
    "### 2. API token rejimi",
    "Mobil ilovalar, CLI, uchinchi tomon skriptlar uchun **personal access token**:",
    "- `$user->createToken($name, $abilities, $expiresAt)` → `plainTextToken` (`12|K8x...`). Faqat bir marta ko'rsatiladi.",
    "- DB'da (`personal_access_tokens`) SHA-256 hash, abilities, `last_used_at`, `expires_at`.",
    "- Mijoz: `Authorization: Bearer 12|K8x...`.",
    "- Tekshirish: `$request->user()->tokenCan('orders:write')` yoki `abilities:` / `ability:` middleware.",
    "- Joriy token: `$request->user()->currentAccessToken()`. Bekor qilish: `->delete()`.",
    "",
    "### Muhim konfiguratsiya (`config/sanctum.php`)",
    "- `expiration` (daqiqa): barcha token'lar uchun global muddat. Default `null` — muddatsiz! Production'da qo'ying yoki har token'ga `expiresAt` bering.",
    "- `token_prefix`: masalan `myapp_`. Sizib chiqqan token'larni secret scanner'lar topishi uchun.",
    "- `guard`: SPA uchun qaysi session guard (`web`).",
    "",
    "Muddati o'tgan token'larni tozalash: `php artisan sanctum:prune-expired --hours=24` scheduler'da.",
    "",
    "### Sanctum nima emas",
    "Sanctum **OAuth server emas**. Uchinchi tomon ilovalari foydalanuvchi nomidan rozilik ekrani orqali kirishi kerak bo'lsa (\"Login with MyApp\"), Passport (20.9) yoki tashqi IdP kerak. Refresh token mexanizmi ham yo'q. Kerak bo'lsa, o'zingiz qurasiz yoki qisqa muddatli token + qayta login."
  ],
  "examples": [
    {
      "title": "SPA (Vue/React) oqimi",
      "lang": "javascript",
      "code": [
        "import axios from 'axios';",
        "",
        "const api = axios.create({",
        "  baseURL: 'https://api.example.uz',",
        "  withCredentials: true,",
        "  withXSRFToken: true,",
        "});",
        "",
        "await api.get('/sanctum/csrf-cookie');",
        "await api.post('/login', { email, password });",
        "const { data } = await api.get('/api/user');"
      ],
      "note": "`withXSRFToken` Axios 1.6+ da kerak: boshqa subdomenga so'rovda XSRF header'ini avtomatik qo'shish uchun."
    },
    {
      "title": "Token: yaratish, tekshirish, bekor qilish",
      "lang": "php",
      "code": [
        "// config/sanctum.php",
        "'expiration' => 60 * 24 * 30,",
        "'token_prefix' => env('SANCTUM_TOKEN_PREFIX', 'myapp_'),",
        "",
        "// Yaratish",
        "$token = $user->createToken('iPhone 15', ['orders:read', 'orders:write'], now()->addDays(30));",
        "",
        "// Route",
        "Route::middleware(['auth:sanctum', 'abilities:orders:write'])->post('orders', StoreOrderController::class);",
        "",
        "// Logout (joriy qurilma)",
        "$request->user()->currentAccessToken()->delete();",
        "",
        "// Parol o'zgarganda: barcha qurilmalar",
        "$user->tokens()->delete();",
        "",
        "// routes/console.php",
        "Schedule::command('sanctum:prune-expired --hours=24')->daily();"
      ]
    }
  ],
  "pitfalls": [
    "`expiration = null` ni production'da qoldirish: token'lar abadiy ishlaydi.",
    "SPA rejimida CORS'da `allowed_origins => ['*']` va `supports_credentials`: brauzer rad etadi yoki xavfsizlik teshigi.",
    "SPA uchun token rejimini tanlab, token'ni `localStorage` da saqlash.",
    "Uchinchi tomon OAuth ekotizimi uchun Sanctum'ni moslashtirishga urinish."
  ]
});
