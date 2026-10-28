/* Chuqur dars: 18.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.7", {
  "lesson": [
    "### Header'lar nima uchun",
    "Header — HTTP so'rov yoki javobning metadata qismi: body haqida, mijoz haqida, kesh, autentifikatsiya va boshqaruv ma'lumotlari. Body'ga aralashmagan holda infratuzilma (proxy, CDN, gateway) ham ularni o'qiydi. Nomlar katta-kichik harfga sezgir emas (`content-type` = `Content-Type`). HTTP/2 da ular kichik harfda uzatiladi.",
    "",
    "### Kontent",
    "- `Content-Type`: body formati. `application/json`, `multipart/form-data`, `application/problem+json`.",
    "- `Accept`: mijoz qaysi formatni xohlaydi (18.8).",
    "- `Content-Length`, `Content-Encoding: gzip`, `Accept-Encoding: gzip, br`.",
    "- `Accept-Language: uz, ru;q=0.8`: lokalizatsiya.",
    "",
    "### Autentifikatsiya",
    "- `Authorization: Bearer <token>`: Sanctum, OAuth2, JWT.",
    "- `Authorization: Basic <base64>`: faqat HTTPS orqali va oddiy servis-servis integratsiyalar uchun.",
    "- API key uchun ko'pincha `X-API-Key`.",
    "",
    "Token'ni **hech qachon** URL query'da yubormang: URL'lar web server log'lariga, brauzer tarixiga, `Referer` header'iga va analitikaga tushadi.",
    "",
    "### Keshlash va shartli so'rovlar",
    "- `Cache-Control`: `no-store` (umuman saqlamaslik — shaxsiy ma'lumot), `private, max-age=60` (faqat brauzerda), `public, max-age=300` (CDN ham), `no-cache` (har safar tekshirish).",
    "- `ETag` / `If-None-Match`: kontent versiyasi. Mos kelsa, server `304 Not Modified` qaytaradi va body yuborilmaydi.",
    "- `Last-Modified` / `If-Modified-Since`.",
    "- `If-Match`: optimistic lock (17.11), mos kelmasa `412`.",
    "- `Vary: Accept, Accept-Language`: keshga javob qaysi header'larga bog'liqligini aytadi.",
    "",
    "### Boshqaruv",
    "- `Location`: `201` da yangi resurs, `3xx` da yo'naltirish manzili.",
    "- `Retry-After`: `429` va `503` da qachon qayta urinish.",
    "- `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` (yoki eskiroq `X-RateLimit-*`).",
    "- `Idempotency-Key` (18.14).",
    "- `X-Request-Id` yoki W3C `traceparent`: so'rovni log'lar va servislar bo'ylab kuzatish.",
    "- `Deprecation`, `Sunset`: eskirgan endpoint (18.18).",
    "",
    "### Xavfsizlik header'lari",
    "`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy`, CORS uchun `Access-Control-Allow-*`. API'lar uchun ayniqsa HSTS va `nosniff`.",
    "",
    "### Custom header'lar",
    "`X-` prefiksi RFC 6648 bilan rasman eskirgan deb e'lon qilingan, lekin amalda hamon keng tarqalgan (`X-Request-Id`). Yangi header uchun prefikssiz aniq nom tanlang.",
    "",
    "### Laravel'da",
    "O'qish: `$request->header('X-Request-Id')`, `$request->bearerToken()`. Yozish: `response()->json(...)->header(...)`, `->withHeaders([...])`. Hamma javoblarga bir xil header qo'shish uchun middleware. Laravel'ning `cache.headers` middleware'i (`SetCacheHeaders`) `Cache-Control` va `ETag` ni qisqa yozishga imkon beradi."
  ],
  "examples": [
    {
      "title": "Request ID middleware",
      "lang": "php",
      "code": [
        "final class AssignRequestId",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        $id = $request->header('X-Request-Id') ?: (string) Str::uuid();",
        "",
        "        Log::withContext(['request_id' => $id]);",
        "",
        "        $response = $next($request);",
        "        $response->headers->set('X-Request-Id', $id);",
        "",
        "        return $response;",
        "    }",
        "}"
      ]
    },
    {
      "title": "Kesh header'lari",
      "lang": "php",
      "code": [
        "// Ommaviy ma'lumotnoma: CDN 5 daqiqa keshlasin",
        "Route::get('categories', CategoryIndexController::class)",
        "    ->middleware('cache.headers:public;max_age=300;etag');",
        "",
        "// Shaxsiy ma'lumot: hech qayerda saqlanmasin",
        "return response()->json($profile)",
        "    ->header('Cache-Control', 'no-store');"
      ]
    }
  ],
  "pitfalls": [
    "Token yoki API kalitni URL query'da yuborish: log'larga va `Referer` ga tushadi.",
    "Shaxsiy javoblarga `Cache-Control: public` qo'yish: CDN bir foydalanuvchi ma'lumotini boshqasiga beradi.",
    "Javob `Accept-Language` ga bog'liq bo'lsa-yu, `Vary` header'ini qo'ymaslik: kesh noto'g'ri tilni qaytaradi.",
    "`429` va `503` javoblarida `Retry-After` bermaslik: mijozlar darhol qayta urinib, yukni oshiradi."
  ]
});
