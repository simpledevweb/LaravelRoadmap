/* Chuqur dars: 20.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.5", {
  "lesson": [
    "### \"Bearer\" ma'nosi",
    "RFC 6750 bo'yicha bearer token — **egasi kim bo'lsa, o'sha ishlata oladigan** token. Pul banknotasi kabi: kimning qo'lida bo'lsa, o'sha sarflaydi. Server token kimga berilganini tekshirmaydi, faqat token haqiqiyligini tekshiradi. Sanctum PAT, ko'p OAuth access token'lar va JWT'lar odatda bearer token.",
    "",
    "Shuning uchun bearer token xavfsizligi butunlay uni **o'g'irlanishdan himoya qilishga** bog'liq.",
    "",
    "### Uzatish qoidalari",
    "1. **Faqat TLS (HTTPS).** Ochiq HTTP'da token tarmoqdagi har kimga ko'rinadi. HSTS header'i brauzerni HTTPS'ga majburlaydi.",
    "2. **`Authorization: Bearer <token>` header'ida.**",
    "3. **URL'da hech qachon:** `?access_token=...` quyidagilarga tushadi:",
    "   - web server va proxy access log'lari,",
    "   - brauzer tarixi va xatcho'plar,",
    "   - `Referer` header'i orqali uchinchi tomon saytlariga (sahifadagi tashqi rasm yoki skript),",
    "   - analitika va monitoring vositalari,",
    "   - foydalanuvchi ulashgan skrinshot va havolalar.",
    "4. **Form body'da** (`access_token` parametri) RFC ruxsat beradi, lekin header afzal.",
    "",
    "### Server javoblari",
    "RFC 6750 xato formati:",
    "- Token yo'q: `401` + `WWW-Authenticate: Bearer realm=\"api\"`.",
    "- Token yaroqsiz yoki muddati o'tgan: `401` + `WWW-Authenticate: Bearer error=\"invalid_token\", error_description=\"The access token expired\"`.",
    "- Scope yetarli emas: `403` + `WWW-Authenticate: Bearer error=\"insufficient_scope\", scope=\"orders:write\"`.",
    "",
    "Mijoz kutubxonalari `invalid_token` ni ko'rib, avtomatik refresh qilishi mumkin.",
    "",
    "### Bearer xavfini kamaytirish",
    "- **Qisqa muddat:** access token 15–60 daqiqa (20.14) va refresh token (20.15). O'g'irlangan token tez yaroqsiz bo'ladi.",
    "- **Minimal scope** (20.16).",
    "- **Xavfsiz saqlash** mijozda (20.20).",
    "- **Log'larda yashirish** (20.3).",
    "",
    "### Sender-constrained token'lar",
    "Yuqori xavfsizlik talablari (bank, Open Banking, FAPI) uchun token **egasiga bog'lanadi**:",
    "- **DPoP** (RFC 9449): mijoz har so'rovni o'z shaxsiy kaliti bilan imzolaydi, token esa shu kalitning ochiq qismiga bog'langan. O'g'irlangan token kalitsiz ishlamaydi.",
    "- **mTLS-bound token** (RFC 8705): token mijozning TLS sertifikatiga bog'langan.",
    "",
    "Ko'p Laravel loyihalari uchun bu ortiqcha, lekin ularning mavjudligini bilish muhim.",
    "",
    "### Laravel'da",
    "`$request->bearerToken()` header'dan token'ni oladi. Sanctum va Passport buni avtomatik qiladi. Token'ni query'dan qabul qilishni (ba'zi eski paketlar default'da qiladi) o'chiring."
  ],
  "examples": [
    {
      "title": "To'g'ri va noto'g'ri uzatish",
      "lang": "http",
      "code": [
        "### To'g'ri",
        "GET /api/v1/orders HTTP/1.1",
        "Host: api.example.uz",
        "Authorization: Bearer 12|K8xQ...",
        "",
        "### Noto'g'ri: log'larga va Referer'ga tushadi",
        "GET /api/v1/orders?access_token=12|K8xQ... HTTP/1.1",
        "",
        "### Server xato javobi",
        "HTTP/1.1 401 Unauthorized",
        "WWW-Authenticate: Bearer error=\"invalid_token\", error_description=\"The access token expired\""
      ]
    },
    {
      "title": "Laravel 11: WWW-Authenticate header'i",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "->withExceptions(function (Exceptions $exceptions) {",
        "    $exceptions->render(function (AuthenticationException $e, Request $request) {",
        "        if ($request->expectsJson()) {",
        "            return response()->json(['message' => 'Unauthenticated.'], 401, [",
        "                'WWW-Authenticate' => 'Bearer realm=\"api\", error=\"invalid_token\"',",
        "            ]);",
        "        }",
        "    });",
        "})"
      ]
    }
  ],
  "pitfalls": [
    "Token'ni URL query parametrida yuborish yoki qabul qilish.",
    "HTTP (TLS'siz) endpoint'ni ochiq qoldirish: token ochiq tarmoqda uzatiladi.",
    "Uzoq muddatli bearer token'ni yuqori huquqlar bilan berish.",
    "Bearer token'ni egasiga bog'langan deb hisoblash: o'g'irlangan nusxa xuddi asl kabi ishlaydi."
  ]
});
