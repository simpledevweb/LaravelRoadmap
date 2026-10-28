/* Chuqur dars: 19.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.20", {
  "lesson": [
    "### Developer Experience nima",
    "API'ning iste'molchisi — boshqa dasturchi. DX — u API bilan qanchalik tez, oson va xatosiz ishlay olishi. Yomon DX qimmatga tushadi: integratsiya haftalab cho'ziladi, support so'rovlari ko'payadi, hamkorlar raqobatchiga ketadi. Ichki API'lar uchun ham amal qiladi: frontend va mobil jamoa vaqti ham pul.",
    "",
    "### DX elementlari",
    "**1. Hujjat**",
    "- OpenAPI asosidagi reference: har endpoint, parametr, javob va xato misollari bilan (75–77).",
    "- **Quickstart:** \"5 daqiqada birinchi muvaffaqiyatli so'rov\". Kalit olish → bitta `curl` → natija.",
    "- Qo'llanmalar (guides): autentifikatsiya, paginatsiya, webhook'lar, xatolarni qayta ishlash, idempotentlik.",
    "- Changelog va deprecation e'lonlari (19.18).",
    "",
    "**2. Sinov muhiti**",
    "- **Sandbox:** production'dan ajratilgan, test kalitlari bilan (`sk_test_...`). Haqiqiy pul yechilmaydi.",
    "- Test kartalari yoki stsenariylar: \"bu karta raqami doim rad etiladi\".",
    "- Postman, Bruno yoki Insomnia kolleksiyasi va \"Run in Postman\" tugmasi.",
    "",
    "**3. Tushunarli xatolar**",
    "Xato xabari nima noto'g'ri, qayerda va qanday tuzatishni aytsin (19.7). \"Invalid request\" emas, \"`items.0.qty` 1 dan 999 gacha bo'lishi kerak (berilgan: 1500)\". Xato kodi hujjatdagi sahifaga havola qilsin.",
    "",
    "**4. Izchillik**",
    "Bitta endpoint'ni o'rgangan dasturchi qolganlarini taxmin qila olsin: nomlash, paginatsiya, xatolar, filtrlar (19.6).",
    "",
    "**5. SDK va kod misollari**",
    "OpenAPI'dan generatsiya qilingan klientlar (OpenAPI Generator, Kiota) yoki qo'lda yozilgan rasmiy SDK'lar. Hujjatda har endpoint uchun bir nechta tilda misol (curl, PHP, JavaScript).",
    "",
    "**6. Kuzatish vositalari**",
    "Dasturchi o'z so'rovlarini ko'ra olsin: developer dashboard'da so'nggi so'rovlar, javoblar va xatolar log'i, webhook yetkazish tarixi va qayta yuborish tugmasi. Javobda `request_id` (18.7).",
    "",
    "### DX'ni o'lchash",
    "- **Time to First Call (TTFC):** ro'yxatdan o'tishdan birinchi muvaffaqiyatli so'rovgacha vaqt.",
    "- Support so'rovlarining eng ko'p mavzulari: ular hujjat yoki dizayndagi kamchiliklarni ko'rsatadi.",
    "- Hujjatdagi qidiruvlar (nima topilmayapti).",
    "- Eng ko'p uchraydigan xato kodlari: ko'p `422` ma'lum maydonda bo'lsa, ehtimol hujjat noaniq.",
    "",
    "### Ichki \"dogfooding\"",
    "O'z frontend va mobil ilovangiz ommaviy API'dan foydalansin. Jamoa kamchiliklarni birinchi bo'lib his qiladi va tuzatadi."
  ],
  "examples": [
    {
      "title": "Quickstart namunasi",
      "lang": "bash",
      "code": [
        "# 1. Dashboard'dan test kalitini oling: sk_test_...",
        "",
        "# 2. Birinchi so'rov",
        "curl https://sandbox.api.example.uz/v1/orders \\",
        "  -H \"Authorization: Bearer sk_test_51H...\" \\",
        "  -H \"Accept: application/json\"",
        "",
        "# 3. Buyurtma yaratish",
        "curl -X POST https://sandbox.api.example.uz/v1/orders \\",
        "  -H \"Authorization: Bearer sk_test_51H...\" \\",
        "  -H \"Content-Type: application/json\" \\",
        "  -H \"Idempotency-Key: $(uuidgen)\" \\",
        "  -d '{\"items\": [{\"product_id\": \"prod_01J...\", \"qty\": 2}]}'"
      ]
    },
    {
      "title": "Yaxshi va yomon xato xabarlari",
      "lang": "json",
      "code": [
        "// Yomon",
        "{ \"error\": \"Invalid request\" }",
        "",
        "// Yaxshi",
        "{",
        "  \"status\": 422,",
        "  \"code\": \"validation_failed\",",
        "  \"message\": \"Ma'lumotlar noto'g'ri\",",
        "  \"errors\": {",
        "    \"items.0.qty\": [{ \"code\": \"between\", \"message\": \"1 dan 999 gacha bo'lishi kerak (berilgan: 1500)\" }]",
        "  },",
        "  \"doc_url\": \"https://docs.example.uz/errors/validation_failed\",",
        "  \"request_id\": \"req_01J2...\"",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Hujjatni faqat avtomatik generatsiya qilingan reference bilan cheklash: quickstart va qo'llanmalarsiz dasturchi qayerdan boshlashni bilmaydi.",
    "Sandbox muhitini bermaslik: integratorlar production'da sinashga majbur bo'ladi.",
    "Umumiy, tushuntirishsiz xato xabarlari.",
    "Hujjatdagi misollar eskirgan va ishlamaydi."
  ]
});
