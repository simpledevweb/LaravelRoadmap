/* Chuqur dars: 23.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.10", {
  "lesson": [
    "### CORS nima",
    "Brauzer **same-origin policy** bo'yicha bir origin'dagi (`https://app.example.uz`) JavaScript boshqa origin'ga (`https://api.example.uz`) yuborgan so'rov javobini o'qishga default'da ruxsat bermaydi. **CORS** (Cross-Origin Resource Sharing) — server header'lar orqali \"bu origin'larga ruxsat beraman\" deyishi. Origin = protokol + host + port: `http://localhost:5173` va `http://localhost:8000` — har xil.",
    "",
    "CORS **brauzer** mexanizmi. Mobil ilova, curl va server-server so'rovlarga ta'sir qilmaydi. U xavfsizlik devori emas: serverni himoya qilmaydi, faqat brauzerdagi foydalanuvchini begona saytlardan himoya qiladi.",
    "",
    "### Preflight",
    "\"Oddiy\" bo'lmagan so'rovlar (PUT, PATCH, DELETE, `Content-Type: application/json`, maxsus header'lar `Authorization`, `X-XSRF-TOKEN`) oldidan brauzer `OPTIONS` so'rovi yuboradi. Server ruxsat beruvchi header'lar bilan javob bersagina asosiy so'rov ketadi. Laravel'ning `HandleCors` middleware'i (default'da global) buni avtomatik qiladi.",
    "",
    "### Laravel'da sozlash (`config/cors.php`)",
    "Laravel 11+ da fayl default'da yo'q: `php artisan config:publish cors`.",
    "- `paths`: `['api/*', 'sanctum/csrf-cookie', 'login', 'logout']`. SPA ishlatadigan barcha route'lar.",
    "- `allowed_origins`: aniq ro'yxat. `['https://app.example.uz']`.",
    "- `allowed_origins_patterns`: regex (`'#^https://[a-z0-9-]+\\.example\\.uz$#'`). Ehtiyotkorlik bilan.",
    "- `allowed_methods`, `allowed_headers`: odatda `['*']`.",
    "- `exposed_headers`: JavaScript o'qishi kerak bo'lgan javob header'lari (`X-RateLimit-Remaining`, `Content-Disposition`).",
    "- `max_age`: preflight natijasini brauzer qancha keshlaydi (soniya).",
    "- **`supports_credentials`**: cookie'lar bilan so'rovlar uchun `true`.",
    "",
    "### Credentials qoidasi",
    "`supports_credentials = true` bo'lsa (SPA rejimi uchun shart), brauzer `Access-Control-Allow-Origin: *` ni **qabul qilmaydi**. Javobda aniq origin bo'lishi kerak. Shuning uchun `allowed_origins => ['*']` va credentials birga ishlamaydi (Laravel `*` bo'lsa, so'rovdagi origin'ni aks ettiradi, bu esa **har qanday** saytga credentials bilan ruxsat berish degani va xavfli).",
    "",
    "### Token rejimi uchun",
    "Bearer token bilan (cookie'siz) `supports_credentials = false` bo'lishi mumkin va origin'lar kengroq. Lekin baribir faqat ma'lum frontend'larni ruxsat etish yaxshi amaliyot.",
    "",
    "### Tez-tez uchraydigan xatolar",
    "- \"No 'Access-Control-Allow-Origin' header\": origin ro'yxatda yo'q yoki route `paths` da yo'q. Yoki **server xatosi (500)**: Laravel xatoda ham CORS header'larini qo'shadi, lekin web server (Nginx) darajasidagi xato yoki PHP fatal error'da qo'shilmasligi mumkin. Brauzer buni CORS xatosi sifatida ko'rsatadi.",
    "- Credentials bilan `*`.",
    "- Nginx va Laravel ikkalasi ham CORS header'larini qo'shib, takrorlanishi (`multiple values`)."
  ],
  "examples": [
    {
      "title": "SPA uchun config/cors.php",
      "lang": "php",
      "code": [
        "return [",
        "    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],",
        "    'allowed_methods' => ['*'],",
        "    'allowed_origins' => array_filter(explode(',', env('CORS_ALLOWED_ORIGINS', ''))),",
        "    'allowed_origins_patterns' => [],",
        "    'allowed_headers' => ['*'],",
        "    'exposed_headers' => ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'Content-Disposition'],",
        "    'max_age' => 3600,",
        "    'supports_credentials' => true,",
        "];",
        "",
        "// .env",
        "// CORS_ALLOWED_ORIGINS=https://app.example.uz,https://admin.example.uz"
      ]
    },
    {
      "title": "Preflight'ni tekshirish",
      "lang": "bash",
      "code": [
        "curl -i -X OPTIONS https://api.example.uz/api/orders \\",
        "  -H \"Origin: https://app.example.uz\" \\",
        "  -H \"Access-Control-Request-Method: POST\" \\",
        "  -H \"Access-Control-Request-Headers: content-type,x-xsrf-token\"",
        "",
        "# Kutilgan javob:",
        "# HTTP/1.1 204 No Content",
        "# Access-Control-Allow-Origin: https://app.example.uz",
        "# Access-Control-Allow-Credentials: true",
        "# Access-Control-Allow-Methods: POST",
        "# Access-Control-Allow-Headers: content-type,x-xsrf-token"
      ]
    }
  ],
  "pitfalls": [
    "`allowed_origins => ['*']` va `supports_credentials => true`: har qanday sayt foydalanuvchi nomidan so'rov yuborib, javobni o'qiydi.",
    "`sanctum/csrf-cookie` va `login` ni `paths` ga qo'shmaslik.",
    "Server xatosini CORS muammosi deb noto'g'ri tashxis qilish.",
    "CORS'ni server himoyasi deb hisoblash: curl va mobil klientlar uni e'tiborsiz qoldiradi."
  ]
});
