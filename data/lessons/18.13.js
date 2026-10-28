/* Chuqur dars: 18.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.13", {
  "lesson": [
    "### Nega standart xato formati",
    "Mijoz har bir xatoni bir xil kod bilan qayta ishlashi kerak: foydalanuvchiga xabar ko'rsatish, maydon yonida xatoni chiqarish, qayta urinish yoki support'ga murojaat. Har endpoint o'z formatida xato qaytarsa (`{\"error\": ...}`, `{\"message\": ...}`, `{\"errors\": [...]}`), mijozda o'nlab maxsus holatlar paydo bo'ladi.",
    "",
    "### RFC 9457 Problem Details",
    "HTTP xatolari uchun standart (avvalgi RFC 7807). `Content-Type: application/problem+json`. Maydonlar:",
    "- `type`: xato turini aniqlaydigan URI (hujjat sahifasi). Default `about:blank`.",
    "- `title`: qisqa, inson o'qiy oladigan xulosa. Bir tur uchun o'zgarmas.",
    "- `status`: HTTP status kod.",
    "- `detail`: aynan shu holat uchun tushuntirish.",
    "- `instance`: shu holatning URI'si.",
    "- **Kengaytmalar:** istalgan qo'shimcha maydon (`code`, `errors`, `request_id`, `balance`).",
    "",
    "### Laravel'ning default formati",
    "Validatsiya xatosi: `422` va `{\"message\": \"The email field is required.\", \"errors\": {\"email\": [\"...\"]}}`. Boshqa xatolar: `{\"message\": \"...\"}`. Bu RFC 9457 emas, lekin keng tanilgan va ko'p frontend kutubxonalari uni tushunadi. Ikkala yo'l ham to'g'ri: muhimi — **butun API bo'yicha bitta format**.",
    "",
    "### Yaxshi xato javobining tarkibi",
    "1. **Mashina o'qiy oladigan kod:** `\"code\": \"insufficient_balance\"`. Mijoz `message` matniga emas, kodga qarab mantiq yozadi. Matn tarjima yoki tahrir qilinishi mumkin, kod esa barqaror.",
    "2. **Inson uchun xabar:** lokalizatsiya qilingan (`Accept-Language`).",
    "3. **Maydon darajasidagi xatolar:** formalar uchun. `errors.email`, ichma-ich `errors.items.0.qty`.",
    "4. **`request_id`:** foydalanuvchi support'ga yuboradi va siz log'dan topasiz.",
    "5. **Kontekst:** kerak bo'lsa (`retry_after`, `available_balance`).",
    "",
    "### Xavfsizlik",
    "- Production'da **stack trace, SQL so'rov, fayl yo'llari, ichki xato matni** hech qachon javobga chiqmasin. `APP_DEBUG=false`.",
    "- 5xx javoblarida umumiy xabar (\"Ichki xato, request_id: ...\") va tafsilotlar faqat log'da.",
    "- Autentifikatsiya xatolarida ortiqcha ma'lumot bermang: \"Bunday email yo'q\" emas, \"Email yoki parol noto'g'ri\" (foydalanuvchilarni sanab chiqishdan himoya).",
    "",
    "### Laravel'da markazlashtirish",
    "Laravel 11+ da `bootstrap/app.php` dagi `withExceptions()`: `$exceptions->render(...)` bilan har exception turi uchun formatni bir joyda belgilang. Domen exception'larida `render()` metodi. Shunda controller'lar xato formatlash bilan shug'ullanmaydi."
  ],
  "examples": [
    {
      "title": "Problem Details javobi",
      "lang": "json",
      "code": [
        "HTTP/1.1 422 Unprocessable Content",
        "Content-Type: application/problem+json",
        "",
        "{",
        "  \"type\": \"https://api.example.uz/errors/insufficient-balance\",",
        "  \"title\": \"Balans yetarli emas\",",
        "  \"status\": 422,",
        "  \"detail\": \"Hisobingizda 50 000 so'm yetishmaydi\",",
        "  \"code\": \"insufficient_balance\",",
        "  \"available_balance\": 100000,",
        "  \"request_id\": \"c1f2a9e0-...\"",
        "}"
      ]
    },
    {
      "title": "Laravel 11: markaziy xato formati",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "->withExceptions(function (Exceptions $exceptions) {",
        "    $problem = fn (int $status, string $code, string $title, array $extra = []) => response()->json([",
        "        'type' => \"https://api.example.uz/errors/{$code}\",",
        "        'title' => $title,",
        "        'status' => $status,",
        "        'code' => $code,",
        "        'request_id' => request()->header('X-Request-Id'),",
        "        ...$extra,",
        "    ], $status, ['Content-Type' => 'application/problem+json']);",
        "",
        "    $exceptions->render(fn (ValidationException $e, Request $r) => $r->is('api/*')",
        "        ? $problem(422, 'validation_failed', 'Ma\\'lumotlar noto\\'g\\'ri', ['errors' => $e->errors()])",
        "        : null);",
        "",
        "    $exceptions->render(fn (ModelNotFoundException|NotFoundHttpException $e, Request $r) => $r->is('api/*')",
        "        ? $problem(404, 'not_found', 'Resurs topilmadi')",
        "        : null);",
        "})"
      ],
      "note": "`null` qaytarilsa, Laravel default render'ga o'tadi."
    }
  ],
  "pitfalls": [
    "Har endpoint'da boshqacha xato formati.",
    "Mijozni `message` matniga qarab mantiq yozishga majburlash: matn o'zgarsa, ilova buziladi. Barqaror `code` bering.",
    "Production'da `APP_DEBUG=true`: stack trace, SQL va `.env` qiymatlari oshkor bo'ladi.",
    "Login xatosida \"bunday foydalanuvchi yo'q\" deyish: hujumchi mavjud email'larni aniqlaydi."
  ]
});
