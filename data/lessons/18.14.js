/* Chuqur dars: 18.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.14", {
  "lesson": [
    "### Muammo: noma'lum natija",
    "Mijoz `POST /payments` yuboradi va 30 soniyadan keyin timeout oladi. Uch holat bo'lishi mumkin: so'rov serverga yetmadi; yetdi va bajarildi, lekin javob yo'qoldi; hali bajarilmoqda. Mijoz qaysi biri ekanini bilmaydi. Qayta yuborsa, ikki marta to'lov xavfi. Yubormasa, to'lov umuman bo'lmagan bo'lishi mumkin.",
    "",
    "### Metodlar bo'yicha",
    "- **GET, HEAD, PUT, DELETE** tabiatan idempotent (18.3). Qayta yuborish xavfsiz.",
    "- **POST** va ba'zan **PATCH** — idempotent emas. Ular uchun maxsus mexanizm kerak.",
    "",
    "### Idempotency-Key header",
    "IETF draft standarti va Stripe, Adyen, PayPal, Payme kabi to'lov API'larida qo'llanadigan amaliyot:",
    "1. Mijoz har **mantiqiy amal** uchun noyob kalit (UUID v4) yaratadi va `Idempotency-Key` header'ida yuboradi. Qayta urinishda **xuddi shu** kalit ishlatiladi.",
    "2. Server birinchi so'rovda amalni bajaradi va natijani (status + body) kalit bilan saqlaydi.",
    "3. Xuddi shu kalit bilan qayta so'rov kelsa, server amalni **qayta bajarmaydi** va saqlangan javobni qaytaradi.",
    "",
    "### Implementatsiya tafsilotlari",
    "- **Doira (scope):** kalit foydalanuvchi yoki API klient bilan birga saqlanadi. Bir foydalanuvchining kaliti boshqasinikiga to'qnashmasin.",
    "- **So'rov hash'i:** kalit bilan body hash'i ham saqlanadi. Bir xil kalit, boshqa body — `422 Unprocessable` (kalit noto'g'ri qayta ishlatilgan).",
    "- **Parallel so'rovlar:** birinchisi hali bajarilayotganda ikkinchisi keldi. Lock (Redis `Cache::lock` yoki DB unique qatori). Ikkinchisi `409 Conflict` oladi yoki birinchisi tugashini kutadi.",
    "- **Atomiklik:** natija va amal bitta DB tranzaksiyasida saqlansin. Aks holda amal bajarilgan, kalit esa saqlanmagan holat bo'ladi.",
    "- **Qaysi javoblar saqlanadi:** muvaffaqiyatli va mijoz xatolari (4xx). 5xx va lock ziddiyatlari saqlanmaydi, shunda mijoz qayta urina oladi.",
    "- **TTL:** 24 soat yoki undan ko'p. Muddati o'tgan kalitlar tozalanadi.",
    "",
    "### Qaysi endpoint'larga",
    "Pul bilan bog'liq hamma narsa (to'lov, o'tkazma, qaytarish), buyurtma yaratish, xabar yuborish, resurs yaratuvchi har qanday muhim POST. Mobil ilovalar uchun ayniqsa muhim: tarmoq tez-tez uziladi va avtomatik retry odatiy.",
    "",
    "### Boshqa idempotentlik vositalari",
    "Kalit — umumiy yechim. Tabiiy unique kalitlar ham ishlaydi (17.17): mijozning `client_order_id` maydoni + unique constraint. Natija bir xil: dublikat DB darajasida rad etiladi."
  ],
  "examples": [
    {
      "title": "Mijoz tomonida",
      "lang": "http",
      "code": [
        "POST /api/v1/payments",
        "Authorization: Bearer 12|xYz...",
        "Idempotency-Key: 6f1c2a4e-9b3d-4e8a-a1f0-3c2d1e0b9a87",
        "Content-Type: application/json",
        "",
        "{\"order_id\": \"01J0ZK...\", \"amount\": 150000}",
        "",
        "### timeout -> xuddi shu kalit bilan qayta yuborish",
        "### server: saqlangan 201 javobni qaytaradi, ikkinchi to'lov yo'q"
      ]
    },
    {
      "title": "DB asosidagi middleware",
      "lang": "php",
      "code": [
        "public function handle(Request $request, Closure $next): Response",
        "{",
        "    $key = $request->header('Idempotency-Key');",
        "    abort_unless($key && Str::isUuid($key), 400, 'Idempotency-Key (UUID) kerak');",
        "",
        "    $scope = $request->user()->id . ':' . $key;",
        "    $hash = hash('sha256', $request->method() . $request->path() . $request->getContent());",
        "",
        "    $lock = Cache::lock(\"idem:{$scope}\", 60);",
        "    abort_unless($lock->get(), 409, 'Shu kalitli so\\'rov hozir bajarilmoqda');",
        "",
        "    try {",
        "        if ($saved = IdempotencyRecord::where('scope', $scope)->first()) {",
        "            abort_if($saved->request_hash !== $hash, 422, 'Kalit boshqa so\\'rov uchun ishlatilgan');",
        "            return response($saved->body, $saved->status, ['Content-Type' => 'application/json', 'Idempotent-Replayed' => 'true']);",
        "        }",
        "",
        "        $response = $next($request);",
        "",
        "        if ($response->getStatusCode() < 500) {",
        "            IdempotencyRecord::create([",
        "                'scope' => $scope, 'request_hash' => $hash,",
        "                'status' => $response->getStatusCode(), 'body' => $response->getContent(),",
        "                'expires_at' => now()->addDay(),",
        "            ]);",
        "        }",
        "",
        "        return $response;",
        "    } finally {",
        "        $lock->release();",
        "    }",
        "}"
      ],
      "note": "To'liq atomiklik uchun yozuvni controller'dagi amal bilan bitta tranzaksiyada saqlash kerak. Bu middleware soddalashtirilgan."
    }
  ],
  "pitfalls": [
    "Mijoz har retry'da yangi kalit yaratishi: himoya ishlamaydi.",
    "Kalitni foydalanuvchiga bog'lamasdan global saqlash: boshqa foydalanuvchining javobi qaytib qolishi mumkin.",
    "5xx javoblarini ham saqlash: vaqtinchalik xatodan keyin mijoz hech qachon muvaffaqiyatga erisha olmaydi.",
    "Parallel bir xil kalitli so'rovlar uchun lock qo'ymaslik: ikkalasi ham bajariladi."
  ]
});
