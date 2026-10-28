/* Chuqur dars: 18.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.2", {
  "lesson": [
    "### Resurs nima",
    "Resurs — API orqali ochiladigan biznes tushunchasi: buyurtma, mijoz, mahsulot, to'lov. U **ot** bilan nomlanadi, chunki amal HTTP metodi bilan ifodalanadi. `POST /orders` (buyurtma yaratish), `POST /createOrder` emas.",
    "",
    "Resurs DB jadvali bilan bir xil bo'lishi shart emas. Bir jadval bir nechta resurs bo'lishi mumkin (`/users` va `/me`), bir resurs bir nechta jadvaldan yig'ilishi mumkin (`/dashboard`).",
    "",
    "### URI qoidalari",
    "- Kolleksiya ko'plikda: `/orders`, `/customers`.",
    "- Element ID bilan: `/orders/42`. Ichki ID o'rniga UUID yoki ULID ID'larni ketma-ket sanab chiqishdan (enumeration) himoya qiladi.",
    "- Kichik harf va defis: `/order-items`, `/payment-methods`.",
    "- Fayl kengaytmasisiz: format `Accept` orqali (18.8).",
    "- Oxirida `/` yo'q.",
    "",
    "### Ichma-ich resurslar",
    "Egalik munosabatini ko'rsatadi: `/customers/7/addresses`, `/orders/42/items`. **1–2 darajadan chuqur qilmang.** `/customers/7/orders/42/items/3` mo'rt va keraksiz: `item 3` o'z ID'si bilan yagona bo'lsa, `/order-items/3` yetarli.",
    "",
    "Laravel'da `->shallow()`: kolleksiya amallari (`index`, `store`) ichma-ich (`/orders/42/items`), element amallari (`show`, `update`, `destroy`) esa yassi (`/items/3`).",
    "",
    "### CRUD'ga sig'maydigan amallar",
    "Har bir biznes amal ham yaratish yoki yangilash emas: buyurtmani bekor qilish, to'lovni qaytarish, hujjatni nashr qilish, parolni tiklash. Uch yondashuv:",
    "1. **Amalni resurs sifatida modellashtirish:** `POST /orders/42/cancellation` (bekor qilish yozuvini yaratish), `POST /refunds`. Eng REST'ga mos, amal tarixi tabiiy saqlanadi.",
    "2. **Holat atributini yangilash:** `PATCH /orders/42 {\"status\": \"cancelled\"}`. Sodda, lekin murakkab biznes qoidalari (sabab, qaytarish summasi) va ruxsatlarni bir endpoint'da aralashtiradi.",
    "3. **Controller uslubidagi sub-resurs:** `POST /orders/42/cancel`. Pragmatik va keng tarqalgan (GitHub, Stripe ham ishlatadi).",
    "",
    "Muhimi — **loyiha bo'yicha izchillik**: bittasini tanlab, hamma joyda shunday qiling.",
    "",
    "### Laravel'da",
    "Bitta amal uchun bitta metodli **invokable controller** (`__invoke`) toza va kichik bo'ladi: `CancelOrderController`. `apiResource` + `->only([...])` yoki `->except([...])` faqat kerakli amallarni ochadi. `scopeBindings()` ichma-ich route'da bola haqiqatan otaga tegishliligini tekshiradi: `/customers/7/addresses/99` da 99-manzil 7-mijozniki bo'lmasa, 404."
  ],
  "examples": [
    {
      "title": "Route'lar",
      "lang": "php",
      "code": [
        "Route::apiResource('orders', OrderController::class);",
        "",
        "// Kolleksiya ichma-ich, elementlar yassi",
        "Route::apiResource('orders.items', OrderItemController::class)->shallow();",
        "// GET  /orders/{order}/items     POST /orders/{order}/items",
        "// GET  /items/{item}             PATCH /items/{item}   DELETE /items/{item}",
        "",
        "// Bola otaga tegishli bo'lishi kerak",
        "Route::get('customers/{customer}/addresses/{address}', [AddressController::class, 'show'])",
        "    ->scopeBindings();",
        "",
        "// CRUD bo'lmagan amal",
        "Route::post('orders/{order}/cancellation', CancelOrderController::class);"
      ]
    },
    {
      "title": "Invokable controller",
      "lang": "php",
      "code": [
        "final class CancelOrderController",
        "{",
        "    public function __invoke(CancelOrderRequest $request, Order $order, CancelOrder $action)",
        "    {",
        "        $this->authorize('cancel', $order);",
        "",
        "        $cancellation = $action->handle($order, $request->validated('reason'));",
        "",
        "        return CancellationResource::make($cancellation)",
        "            ->response()",
        "            ->setStatusCode(201);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "URL'da fe'llar (`/getOrder`, `/updateStatus`): metodlar semantikasi yo'qoladi.",
    "3–4 darajali ichma-ich URL'lar: mo'rt, uzun va mijoz uchun noqulay.",
    "Ichma-ich route'da `scopeBindings` siz ishlash: boshqa mijozning manzili ochiladi (IDOR).",
    "CRUD bo'lmagan amallar uchun loyihada uch xil uslubni aralashtirish."
  ]
});
