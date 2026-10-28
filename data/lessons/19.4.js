/* Chuqur dars: 19.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.4", {
  "lesson": [
    "### Asosiy savol: mijoz nima qilishi kerak",
    "Status kod tanlashda \"nima bo'ldi\" emas, **\"mijoz endi nima qilishi kerak\"** degan savoldan boshlang:",
    "- **2xx** — davom eting, hammasi joyida.",
    "- **4xx** — so'rovni o'zgartiring. Xuddi shu so'rovni qayta yuborish foyda bermaydi (`429` va `409` ba'zan istisno).",
    "- **5xx** — sizda muammo yo'q. Keyinroq qayta urinib ko'ring.",
    "",
    "Retry mexanizmlari, monitoring alert'lari va foydalanuvchiga ko'rsatiladigan xabar aynan shu tasnifga tayanadi.",
    "",
    "### Kichik va izchil to'plam",
    "HTTP'da 60 dan ortiq kod bor, lekin API uchun 12–15 tasi yetarli. Ularni loyiha stil qo'llanmasida qayd eting (18.4 dagi ro'yxat):",
    "",
    "| Holat | Kod |",
    "|---|---|",
    "| O'qish muvaffaqiyatli | 200 |",
    "| Yaratildi | 201 + `Location` |",
    "| Asinxron qabul qilindi | 202 + holat URL'i |",
    "| Body'siz muvaffaqiyat | 204 |",
    "| Buzilgan so'rov | 400 |",
    "| Autentifikatsiya yo'q | 401 |",
    "| Ruxsat yo'q | 403 |",
    "| Topilmadi yoki yashirilgan | 404 |",
    "| Holat ziddiyati | 409 |",
    "| Validatsiya yoki biznes qoidasi | 422 |",
    "| Rate limit | 429 + `Retry-After` |",
    "| Server xatosi | 500 |",
    "| Vaqtincha mavjud emas | 503 + `Retry-After` |",
    "",
    "### Qiyin tanlovlar",
    "- **409 yoki 422?** `409` — resursning **joriy holati** amalga zid (buyurtma allaqachon jo'natilgan, versiya mos emas, dublikat). Mijoz holatni yangilab (qayta o'qib) urinishi mumkin. `422` — **so'rov mazmuni** qoidalarga mos emas (maydon xato, balans yetarli emas).",
    "- **403 yoki 404?** Resurs mavjudligini oshkor qilish xavfli bo'lsa (boshqa foydalanuvchining buyurtmasi) — `404`. Foydalanuvchi resursni ko'ra oladi, lekin amal qila olmasa (o'qiy oladi, o'chira olmaydi) — `403`.",
    "- **400 yoki 422?** `400` — so'rovni umuman tushunib bo'lmaydi (buzilgan JSON, noto'g'ri `Content-Type`). `422` — tushunildi, lekin qiymatlar noto'g'ri.",
    "- **200 yoki 204 DELETE'da?** Body kerak bo'lmasa `204`. O'chirilgan resurs yoki natija qaytarilsa `200`.",
    "- **Allaqachon o'chirilganni DELETE:** `204` (idempotent natija) yoki `404`. Izchil bo'ling.",
    "",
    "### Status va body mosligi",
    "Status kod body bilan zid kelmasin: `200` va `{\"error\": \"...\"}` yoki `500` va `{\"success\": true}`. Har bir 4xx/5xx standart xato formatida (18.13, 19.7)."
  ],
  "examples": [
    {
      "title": "Endpoint'lar bo'yicha kodlar",
      "lang": "text",
      "code": [
        "POST   /orders                 201 Created + Location: /orders/01J...",
        "POST   /reports                202 Accepted + Location: /report-jobs/91",
        "GET    /orders/01J...          200 | 404",
        "PATCH  /orders/01J...          200 | 409 (version mismatch) | 422",
        "DELETE /orders/01J...          204 | 409 (allaqachon jo'natilgan)",
        "POST   /orders/01J.../cancel   200 | 409 (holat ruxsat bermaydi)",
        "POST   /payments               201 | 422 (insufficient_balance) | 429"
      ]
    },
    {
      "title": "409 va 422 farqi kodda",
      "lang": "php",
      "code": [
        "public function __invoke(CancelOrderRequest $request, Order $order)",
        "{",
        "    $this->authorize('cancel', $order);",
        "",
        "    if (! $order->status->canTransitionTo(OrderStatus::Cancelled)) {",
        "        abort(409, \"Buyurtma '{$order->status->value}' holatida bekor qilinmaydi\");",
        "    }",
        "",
        "    // reason validatsiyasi FormRequest'da: noto'g'ri bo'lsa 422",
        "    $order->cancel($request->validated('reason'));",
        "",
        "    return OrderResource::make($order);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Har endpoint uchun \"eng aniq\" ekzotik kodni (`418`, `423`, `451`) qidirish: mijozlar ularni bilmaydi.",
    "Biznes xatosiga `400` yoki `500` qaytarish.",
    "`409` va `422` ni tasodifiy ishlatish: mijoz qayta o'qishi kerakmi yoki ma'lumotni tuzatishi kerakmi, bilmaydi.",
    "Status kodlar to'plamini hujjatlashtirmaslik."
  ]
});
