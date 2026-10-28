/* Chuqur dars: 18.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.1", {
  "lesson": [
    "### REST nima",
    "REST (Representational State Transfer) — Roy Fielding 2000-yilgi dissertatsiyasida ta'riflagan **arxitektura uslubi**. U protokol yoki standart emas, balki tizimga qo'yiladigan cheklovlar to'plami. Ularga rioya qilgan tizim masshtablanadi, keshlanadi va mustaqil rivojlanadi.",
    "",
    "### Olti cheklov",
    "1. **Client-server:** UI va ma'lumot saqlash ajratilgan. Mobil ilova va web bir xil API'dan foydalanadi, backend esa mustaqil o'zgaradi.",
    "2. **Stateless:** har so'rov o'zini tushunish uchun kerakli hamma narsani o'z ichiga oladi (token, parametrlar). Server so'rovlar orasida mijoz sessiya holatini saqlamaydi. Natijada har qanday server instance har qanday so'rovga xizmat qiladi va gorizontal masshtablash oson.",
    "3. **Cacheable:** javob keshlanishi mumkinmi yoki yo'qmi, aniq bildiriladi (`Cache-Control`, `ETag`). Mijoz va oraliq proxy'lar takroriy so'rovlarni kamaytiradi.",
    "4. **Uniform interface:** resurslar URI bilan aniqlanadi, ular **ko'rinishlar** (JSON) orqali boshqariladi, xabarlar o'z-o'zini tavsiflaydi (`Content-Type`, metod, status) va HATEOAS (javobda keyingi amallar uchun havolalar).",
    "5. **Layered system:** mijoz to'g'ridan-to'g'ri serverga ulanganmi yoki load balancer, CDN, API gateway orqalimi, bilmaydi.",
    "6. **Code on demand** (ixtiyoriy): server mijozga bajariladigan kod yuborishi mumkin.",
    "",
    "### Richardson Maturity Model",
    "- **0-daraja:** bitta endpoint, hamma narsa POST (SOAP, JSON-RPC uslubi).",
    "- **1-daraja:** resurslar (`/orders`, `/customers`), lekin metodlar farqlanmaydi.",
    "- **2-daraja:** resurslar + HTTP metodlari (GET, POST, PATCH, DELETE) + to'g'ri status kodlar.",
    "- **3-daraja:** + HATEOAS.",
    "",
    "Amalda \"REST API\" deyilganda deyarli doim **2-daraja** tushuniladi. HATEOAS kam qo'llanadi, chunki mijozlar odatda URL'larni oldindan biladi.",
    "",
    "### Amaliy ahamiyati",
    "REST'ning qiymati nazariy \"to'g'rilikda\" emas, **bashorat qilinuvchanlikda**. HTTP semantikasiga rioya qilsangiz, mijoz dasturchi hujjatni o'qimasdan ham ko'p narsani taxmin qiladi: GET xavfsiz, 404 topilmadi, 422 validatsiya xatosi. Keshlar, proxy'lar, monitoring vositalari va SDK generatorlari ham shu semantikaga tayanadi.",
    "",
    "### Laravel'da",
    "`Route::apiResource()` 2-darajadagi standart REST endpoint'larini yaratadi: `index`, `store`, `show`, `update`, `destroy`. API Resource'lar ko'rinishni, FormRequest esa kirishni boshqaradi. Sanctum stateless token autentifikatsiyasini beradi."
  ],
  "examples": [
    {
      "title": "Resurslar va metodlar",
      "lang": "text",
      "code": [
        "GET    /api/orders            ro'yxat           200",
        "POST   /api/orders            yaratish          201 + Location",
        "GET    /api/orders/42         bitta             200 / 404",
        "PATCH  /api/orders/42         qisman yangilash  200",
        "DELETE /api/orders/42         o'chirish         204",
        "",
        "0-daraja (REST emas):",
        "POST   /api   {\"action\": \"getOrder\", \"id\": 42}"
      ]
    },
    {
      "title": "Laravel'da resurs route'lari",
      "lang": "php",
      "code": [
        "// routes/api.php",
        "Route::middleware('auth:sanctum')->group(function () {",
        "    Route::apiResource('orders', OrderController::class);",
        "});",
        "",
        "// php artisan route:list --path=api/orders",
        "// GET|HEAD  api/orders ............ orders.index",
        "// POST      api/orders ............ orders.store",
        "// GET|HEAD  api/orders/{order} .... orders.show",
        "// PUT|PATCH api/orders/{order} .... orders.update",
        "// DELETE    api/orders/{order} .... orders.destroy"
      ]
    }
  ],
  "pitfalls": [
    "Server sessiyasida holat saqlab, API'ni stateless deb atash: gorizontal masshtablashda so'rovlar boshqa serverga tushib, holat yo'qoladi.",
    "Har bir amal uchun fe'lli URL (`/getOrders`, `/deleteOrder`) yaratish.",
    "Hamma javobga 200 qaytarib, xatoni body ichida bildirish: HTTP semantikasi yo'qoladi.",
    "HATEOAS'ni majburiy deb hisoblab, oddiy API'ni murakkablashtirish."
  ]
});
