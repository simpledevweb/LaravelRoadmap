/* Chuqur dars: 19.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.3", {
  "lesson": [
    "### Semantika — va'da",
    "HTTP metodi faqat \"qaysi amal\" emas, balki mijoz va butun infratuzilmaga beriladigan **va'da** (18.3):",
    "- GET xavfsiz va keshlanadigan: brauzer, CDN va proxy uni keshlaydi, crawler'lar ochadi, prefetch qilinadi.",
    "- PUT va DELETE idempotent: HTTP kutubxonalari (Guzzle retry middleware, mobil SDK'lar) xatoda ularni avtomatik qayta yuborishi mumkin.",
    "- POST idempotent emas: avtomatik retry qilinmaydi (yoki Idempotency-Key bilan, 18.14).",
    "- PATCH: qisman o'zgarish, idempotentligi formatga bog'liq.",
    "",
    "Semantikani buzish bu va'dalarni buzadi va tasodifiy, qayta takrorlash qiyin bo'lgan xatolarga olib keladi.",
    "",
    "### PATCH formatlari",
    "- **JSON Merge Patch** (RFC 7396, `application/merge-patch+json`): yuborilgan maydonlar yangilanadi, `null` maydonni o'chiradi yoki tozalaydi, yuborilmagan maydonlar o'zgarmaydi. Sodda va ko'p API'lar uchun yetarli. Kamchilik: massiv elementini alohida o'zgartirib bo'lmaydi va \"qiymatni null qilish\" bilan \"o'chirish\" farqlanmaydi.",
    "- **JSON Patch** (RFC 6902, `application/json-patch+json`): amallar ro'yxati: `[{\"op\": \"replace\", \"path\": \"/phone\", \"value\": \"...\"}, {\"op\": \"add\", \"path\": \"/tags/-\", \"value\": \"vip\"}]`. Kuchli, lekin murakkab va kam ishlatiladi.",
    "",
    "Ko'p Laravel API'lari amalda oddiy JSON bilan merge patch semantikasini ishlatadi. Muhimi — hujjatda aniq yozish: `null` nima qiladi?",
    "",
    "### Qabul qilinadigan istisnolar",
    "- **Murakkab qidiruv uchun POST:** `POST /orders/search` va body'da filtrlar. GET query juda uzun bo'lsa (URL chegarasi ~8 KB) yoki filtrlar shaxsiy ma'lumotni o'z ichiga olsa (telefon, pasport — URL log'larga tushadi). Natija keshlanmasligini hisobga oling.",
    "- **Amallar uchun POST:** `POST /orders/42/cancellation` (18.2).",
    "- **Ommaviy o'chirish:** `DELETE /notifications?ids=1,2,3` yoki `POST /notifications/bulk-delete`.",
    "",
    "### HEAD va OPTIONS",
    "Laravel GET route uchun HEAD'ni avtomatik qo'llaydi. OPTIONS (CORS preflight) `HandleCors` middleware'i tomonidan javoblanadi. Ularni o'zingiz route qilishingiz shart emas.",
    "",
    "### Metodni override qilish",
    "Ba'zi korporativ proxy'lar PUT, PATCH, DELETE ni bloklaydi. Laravel `X-HTTP-Method-Override` header'ini va `_method` maydonini qo'llaydi. API'da buni faqat zarurat bo'lganda va hujjatda ko'rsatib ishlating."
  ],
  "examples": [
    {
      "title": "Merge patch semantikasi",
      "lang": "http",
      "code": [
        "PATCH /api/v1/customers/7",
        "Content-Type: application/merge-patch+json",
        "",
        "{\"phone\": \"+998901234567\", \"middle_name\": null}",
        "",
        "### phone yangilanadi, middle_name tozalanadi, qolganlar o'zgarmaydi"
      ]
    },
    {
      "title": "Laravel: yuborilgan va null maydonlarni farqlash",
      "lang": "php",
      "code": [
        "public function update(UpdateCustomerRequest $request, Customer $customer)",
        "{",
        "    // Faqat haqiqatan yuborilgan kalitlar (null qiymatlilar ham)",
        "    $changes = Arr::only($request->validated(), array_keys($request->all()));",
        "",
        "    $customer->update($changes);",
        "",
        "    return CustomerResource::make($customer);",
        "}",
        "",
        "// rules: 'middle_name' => ['sometimes', 'nullable', 'string', 'max:100']",
        "",
        "// Murakkab qidiruv: POST, lekin holat o'zgarmaydi",
        "Route::post('orders/search', SearchOrdersController::class);"
      ]
    }
  ],
  "pitfalls": [
    "GET bilan holat o'zgartirish: crawler, prefetch va kesh amalni tasodifan bajaradi.",
    "PATCH'da `null` va \"yuborilmagan\" ni farqlamaslik: maydonlar tasodifan tozalanadi.",
    "POST endpoint'ni idempotent deb hujjatlashtirib, Idempotency-Key'siz qoldirish.",
    "Barcha qidiruvlarni POST bilan qilish: keshlash va havolani ulashish imkoniyati yo'qoladi."
  ]
});
