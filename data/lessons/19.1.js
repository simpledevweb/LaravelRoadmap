/* Chuqur dars: 19.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.1", {
  "lesson": [
    "### Nom — shartnomaning eng ko'rinadigan qismi",
    "Resurs nomi hujjatda, kodda, log'larda va mijoz SDK'sida yillar davomida yashaydi. Uni o'zgartirish buzuvchi o'zgarish (18.18). Shuning uchun nomni boshidan diqqat bilan tanlang.",
    "",
    "### Texnik qoidalar",
    "- **Otlar, fe'llar emas:** `/orders`, `/getOrders` emas. Amal HTTP metodi orqali (18.2, 18.3).",
    "- **Ko'plik kolleksiya uchun:** `/orders`, `/orders/42`. Birlik faqat yagona resurs uchun: `/me`, `/settings`.",
    "- **Kichik harf va defis:** `/order-items`, `/payment-methods`. URL'da `camelCase` yoki `snake_case` kam uchraydi va ba'zi tizimlar katta-kichik harfni farqlaydi.",
    "- **Kengaytmasiz:** `/orders.json` emas. Format `Accept` orqali (18.8).",
    "- **Texnik detallar yo'q:** `/tbl_orders`, `/api/v1/OrderController/list`, `/orders_view`. API ichki tuzilmani oshkor qilmasin.",
    "- **Qisqartmalar ehtiyotkorlik bilan:** `/cust`, `/inv` emas. Umum qabul qilinganlar (`/api`, `/id`) normal.",
    "",
    "### Domen tili",
    "Nom **biznes** nimani nazarda tutsa, shuni ifodalasin. \"Invoice\" yoki \"bill\"? \"Customer\", \"client\" yoki \"user\"? Biznes bilan kelishilgan **yagona lug'at** (DDD'dagi ubiquitous language, 63.x) API, kod, UI va hujjatda bir xil bo'lsin. Agar ichki jadval `clients` deb nomlangan, biznes esa \"mijoz\" (customer) desa, API'da `customers` bo'lsin.",
    "",
    "**Bitta tushuncha — bitta nom.** Bir endpoint'da `customer_id`, boshqasida `client_id`, uchinchisida `buyer_id` bo'lsa, mijoz dasturchi ular bir narsami yoki yo'qmi, bilmaydi.",
    "",
    "### Maydon nomlari",
    "- Bitta konvensiya: Laravel uchun `snake_case` tabiiy.",
    "- Boolean'lar savol shaklida: `is_active`, `has_discount`, `can_edit`.",
    "- Vaqtlar `_at` bilan (`created_at`, `paid_at`), sanalar `_on` yoki `_date` bilan (`due_date`).",
    "- Birliklar aniq: `duration_seconds`, `weight_grams`, yoki obyekt (`{amount, currency}`).",
    "- Havolalar: `customer_id` yoki ichma-ich `customer: {id, ...}`. Ikkalasini aralashtirmang.",
    "",
    "### Lug'atni yozib qo'ying",
    "API stil qo'llanmasida (style guide) nomlash qoidalari va asosiy atamalar ro'yxati. Code review'da unga havola qilinadi. Spectral kabi linter OpenAPI faylini avtomatik tekshirishi mumkin."
  ],
  "examples": [
    {
      "title": "Yaxshi va yomon nomlar",
      "lang": "text",
      "code": [
        "Yaxshi:",
        "GET  /api/v1/customers/7/invoices",
        "GET  /api/v1/payment-methods",
        "POST /api/v1/orders/42/cancellation",
        "",
        "Yomon:",
        "GET  /api/v1/getCustomerInvoiceList?custId=7",
        "GET  /api/v1/PaymentMethods.json",
        "POST /api/v1/cancelOrder?id=42",
        "GET  /api/v1/tbl_client_inv"
      ]
    },
    {
      "title": "Maydonlar konvensiyasi",
      "lang": "json",
      "code": [
        "{",
        "  \"id\": \"01J0ZK...\",",
        "  \"customer_id\": \"01J0ZJ...\",",
        "  \"is_paid\": true,",
        "  \"due_date\": \"2025-07-01\",",
        "  \"paid_at\": \"2025-06-20T10:15:00Z\",",
        "  \"total\": { \"amount\": 150000, \"currency\": \"UZS\" },",
        "  \"delivery_weight_grams\": 1200",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Bir tushuncha uchun turli nomlar (`customer_id`, `client_id`).",
    "DB jadval nomlarini (`tbl_`, `_view`) API'ga ko'chirish.",
    "Birliksiz son maydonlari (`duration: 30` — soniya yoki daqiqa?).",
    "Nomlash qoidalarini yozmasdan, har dasturchi o'z uslubida yozishi."
  ]
});
