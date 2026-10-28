/* Chuqur dars: 19.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.7", {
  "lesson": [
    "### Xato — shartnomaning yarmi",
    "Muvaffaqiyatli javoblar odatda yaxshi hujjatlanadi, xatolar esa e'tibordan chetda qoladi. Lekin mijoz kodining katta qismi aynan xatolarni qayta ishlaydi: foydalanuvchiga nima deyish, qaysi maydonni qizil qilish, qayta urinish kerakmi, support'ga nima yuborish. Xato formati muvaffaqiyat formati kabi barqaror va hujjatlangan bo'lishi kerak.",
    "",
    "### Xato javobi tarkibi",
    "1. **HTTP status** (19.4).",
    "2. **Barqaror mashina kodi:** `\"code\": \"card_declined\"`. Mijoz mantiqi shunga tayanadi.",
    "3. **Inson uchun xabar:** `message`, `Accept-Language` bo'yicha lokalizatsiya qilinadi. Matn o'zgarishi mumkin.",
    "4. **Maydon xatolari:** `errors` obyekti, kalit — maydon yo'li (`items.0.qty`).",
    "5. **`request_id`:** log'larni topish uchun.",
    "6. **Ixtiyoriy:** hujjat havolasi (`type` yoki `doc_url`), kontekst (`retry_after`, `available_balance`).",
    "",
    "### Xato kodlari katalogi",
    "Barcha xato kodlarini bitta joyda hujjatlashtiring: kod, HTTP status, ma'nosi, mijoz nima qilishi kerak. Masalan:",
    "",
    "| code | status | ma'nosi | mijoz harakati |",
    "|---|---|---|---|",
    "| `validation_failed` | 422 | maydonlar noto'g'ri | `errors` ni ko'rsatish |",
    "| `insufficient_balance` | 422 | balans yetarli emas | to'ldirish taklifi |",
    "| `order_not_cancellable` | 409 | holat ruxsat bermaydi | buyurtmani qayta o'qish |",
    "| `rate_limited` | 429 | limit | `Retry-After` dan keyin |",
    "| `internal_error` | 500 | ichki xato | qayta urinish, support |",
    "",
    "**Kodlar o'zgarmaydi.** Ular API shartnomasining qismi: yangi kod qo'shish mumkin, mavjudini qayta nomlash yoki ma'nosini o'zgartirish buzuvchi o'zgarish.",
    "",
    "### Maydon xatolarida kod",
    "Laravel default'da maydon xatolari faqat matn massivi: `{\"email\": [\"The email has already been taken.\"]}`. Mobil ilova o'z tilida xabar ko'rsatishi yoki maxsus mantiq yozishi uchun har maydon xatosiga ham kod bering: `{\"code\": \"unique\", \"message\": \"...\"}`. Buni validatsiya exception'ini render qilishda `$validator->failed()` (qoida nomlari) yordamida yasash mumkin.",
    "",
    "### Xavfsizlik",
    "5xx javobida hech qanday ichki tafsilot (exception klassi, SQL, fayl yo'li) yo'q. Faqat umumiy xabar va `request_id`. Tafsilotlar log va Sentry'da (59.x).",
    "",
    "### Hujjatda",
    "OpenAPI'da har endpoint uchun mumkin bo'lgan xato javoblari (`4XX`, `422`, `409`) va umumiy `Error` sxemasi. Har biri uchun misol."
  ],
  "examples": [
    {
      "title": "Maydon darajasidagi kodlar bilan xato",
      "lang": "json",
      "code": [
        "{",
        "  \"status\": 422,",
        "  \"code\": \"validation_failed\",",
        "  \"message\": \"Ma'lumotlar noto'g'ri\",",
        "  \"errors\": {",
        "    \"email\": [{ \"code\": \"unique\", \"message\": \"Bu email allaqachon ro'yxatdan o'tgan\" }],",
        "    \"items.0.qty\": [{ \"code\": \"between\", \"message\": \"1 dan 999 gacha bo'lishi kerak\" }]",
        "  },",
        "  \"request_id\": \"01J2...\"",
        "}"
      ]
    },
    {
      "title": "Validatsiya xatosini kodli formatga aylantirish",
      "lang": "php",
      "code": [
        "$exceptions->render(function (ValidationException $e, Request $request) {",
        "    if (! $request->is('api/*')) {",
        "        return null;",
        "    }",
        "",
        "    $failed = $e->validator->failed();   // ['email' => ['Unique' => [...]]]",
        "    $errors = [];",
        "",
        "    foreach ($e->errors() as $field => $messages) {",
        "        $rules = array_keys($failed[$field] ?? []);",
        "        foreach ($messages as $i => $message) {",
        "            $errors[$field][] = ['code' => Str::snake($rules[$i] ?? 'invalid'), 'message' => $message];",
        "        }",
        "    }",
        "",
        "    return response()->json([",
        "        'status' => 422,",
        "        'code' => 'validation_failed',",
        "        'message' => __('Ma\\'lumotlar noto\\'g\\'ri'),",
        "        'errors' => $errors,",
        "        'request_id' => $request->header('X-Request-Id'),",
        "    ], 422);",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Mijozlarni xato matniga qarab mantiq yozishga majburlash.",
    "Mavjud xato kodini qayta nomlash yoki ma'nosini o'zgartirish.",
    "Xato kodlarini hujjatlashtirmaslik: mijoz faqat sinov-xato orqali bilib oladi.",
    "5xx javobida exception xabarini to'g'ridan-to'g'ri qaytarish."
  ]
});
