/* Chuqur dars: 20.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.13", {
  "lesson": [
    "### BOLA / IDOR",
    "Obyekt darajasidagi avtorizatsiya har bir **aniq yozuv** uchun ruxsatni tekshiradi: \"foydalanuvchi **aynan shu** buyurtmani ko'ra oladimi?\". U yo'q bo'lsa — **BOLA** (Broken Object Level Authorization), eski nomi **IDOR** (Insecure Direct Object Reference). OWASP API Security Top 10 da 1-o'rinda.",
    "",
    "Hujum juda oddiy: foydalanuvchi `/api/orders/1001` ni ochadi, keyin `1002` ga o'zgartiradi va boshqa mijozning buyurtmasini (manzil, telefon, summa) ko'radi. Avtomatlashtirilgan skript bir kechada barcha buyurtmalarni yig'ib oladi. Ma'lumot oqishining eng keng tarqalgan sabablaridan biri.",
    "",
    "### Qayerda yashiringan bo'ladi",
    "- `show`, `update`, `destroy` endpoint'larida policy yo'q.",
    "- **Bog'liq resurslar:** `/orders/42/invoice.pdf`, `/attachments/77/download` — asosiy resurs himoyalangan, faylniki esa yo'q.",
    "- **Body ichidagi ID'lar:** `POST /payments {\"order_id\": 1002}` — buyurtma begona.",
    "- **Ichma-ich route'lar:** `/customers/7/addresses/99` — 99-manzil 7-mijozga tegishlimi?",
    "- **Ommaviy amallar:** `ids=[1,2,3,1002]`.",
    "- **GraphQL va filtrlar:** `filter[customer_id]=other`.",
    "- **Eksport va hisobotlar.**",
    "",
    "### Himoya usullari",
    "1. **Har endpoint'da policy** (20.11): `$this->authorize('view', $order)`.",
    "2. **So'rovni foydalanuvchi doirasidan boshlash:** `$request->user()->orders()->findOrFail($id)`. Begona yozuv shunchaki topilmaydi → 404. Oson va xato qilish qiyin.",
    "3. **Scoped route binding:** `Route::get('customers/{customer}/addresses/{address}')->scopeBindings()`. Laravel `$customer->addresses()->findOrFail($address)` qiladi.",
    "4. **Body'dagi ID'lar validatsiyasi doira bilan:** `Rule::exists('orders', 'id')->where('customer_id', $user->customer_id)` (19.5).",
    "5. **Global scope'lar** tenant izolyatsiyasi uchun (13.14).",
    "6. **Tasodifiy ID'lar** (ULID, UUID): sanab chiqishni qiyinlashtiradi. Lekin ular **avtorizatsiya o'rnini bosmaydi**: ID log'larda, havolalarda, emaillarda ko'rinadi.",
    "",
    "### 403 yoki 404",
    "Begona resurs uchun `404` (`Response::denyAsNotFound()`) uning mavjudligini oshkor qilmaydi. Foydalanuvchi resursni ko'ra oladi, lekin amal qila olmasa (o'qiy oladi, o'chira olmaydi) — `403`.",
    "",
    "### Test — majburiy",
    "Har resurs endpoint'i uchun \"boshqa foydalanuvchi\" testi: ikkinchi foydalanuvchi va tenant yaratiladi, birinchisining resursiga murojaat qilinadi va 403/404 kutiladi. Bu testlar yozilmasa, BOLA kech yoki hech qachon topilmaydi."
  ],
  "examples": [
    {
      "title": "Zaif va himoyalangan",
      "lang": "php",
      "code": [
        "// ZAIF",
        "public function show(Order $order) { return OrderResource::make($order); }",
        "public function invoice(Order $order) { return Storage::download($order->invoice_path); }",
        "",
        "// HIMOYALANGAN: so'rov foydalanuvchi doirasida",
        "public function show(Request $request, string $orderId)",
        "{",
        "    $order = $request->user()->orders()->where('public_id', $orderId)->firstOrFail();",
        "    return OrderResource::make($order);",
        "}",
        "",
        "// HIMOYALANGAN: policy",
        "public function invoice(Order $order)",
        "{",
        "    $this->authorize('view', $order);",
        "    return Storage::download($order->invoice_path);",
        "}",
        "",
        "// Ichma-ich: bola otaga tegishli",
        "Route::get('customers/{customer}/addresses/{address}', [AddressController::class, 'show'])",
        "    ->scopeBindings()",
        "    ->can('view', 'customer');"
      ]
    },
    {
      "title": "BOLA testi",
      "lang": "php",
      "code": [
        "dataset('order_endpoints', [",
        "    ['get', '/api/v1/orders/%s'],",
        "    ['patch', '/api/v1/orders/%s'],",
        "    ['get', '/api/v1/orders/%s/invoice'],",
        "    ['delete', '/api/v1/orders/%s'],",
        "]);",
        "",
        "it('does not expose other customers orders', function (string $method, string $uri) {",
        "    $victim = Order::factory()->create();",
        "    $attacker = User::factory()->create();",
        "    Sanctum::actingAs($attacker, ['*']);",
        "",
        "    $this->json($method, sprintf($uri, $victim->public_id))",
        "        ->assertNotFound();",
        "})->with('order_endpoints');"
      ],
      "note": "Policy begona resurs uchun `denyAsNotFound()` qaytaradi deb faraz qilingan. 403 qaytarsangiz, `assertForbidden()` yozing."
    }
  ],
  "pitfalls": [
    "Faqat `auth` middleware bilan himoyalash: har kirgan foydalanuvchi har yozuvni oladi.",
    "Asosiy resursni himoyalab, fayl va bog'liq endpoint'larni unutish.",
    "Body'dagi `order_id` kabi havolalarni doirasiz validatsiya qilish.",
    "UUID'larni avtorizatsiya deb hisoblash."
  ]
});
