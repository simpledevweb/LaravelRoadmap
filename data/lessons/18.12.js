/* Chuqur dars: 18.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.12", {
  "lesson": [
    "### Nega versiyalash",
    "API — shartnoma. Web frontend'ni bir deploy bilan yangilash mumkin, lekin mobil ilovaning eski versiyalari foydalanuvchilar telefonida oylab, ba'zan yillab ishlaydi. Tashqi integratorlar o'z kodini sizning jadvalingiz bo'yicha yangilamaydi. **Buzuvchi o'zgarish** (18.18) kiritish kerak bo'lsa, eski mijozlar uchun eski shartnomani saqlab, yangisini parallel taklif qilish kerak.",
    "",
    "### Usullar",
    "**1. URI:** `/api/v1/orders`, `/api/v2/orders`.",
    "- Eng sodda va eng keng tarqalgan.",
    "- Ko'rinadi: log'larda, brauzerda, hujjatda.",
    "- Route'lar, keshlar va gateway qoidalari oson ajratiladi.",
    "- Kamchilik: nazariy jihatdan \"resurs URI'si o'zgarmasligi kerak\" printsipini buzadi. Amalda bu ko'pchilikni bezovta qilmaydi.",
    "",
    "**2. Header:** `Accept: application/vnd.myapp.v2+json` yoki `Api-Version: 2`.",
    "- URL toza, versiya — ko'rinish xususiyati.",
    "- Brauzerda sinash, keshlash (`Vary` kerak) va debug qiyinroq.",
    "",
    "**3. Query:** `?version=2`. Oddiy, lekin keshlash va standartlashtirish nuqtai nazaridan kam tavsiya etiladi.",
    "",
    "**4. Sana bo'yicha (Stripe uslubi):** `Stripe-Version: 2024-06-20`. Har mijoz o'z versiyasiga \"qadaladi\". Server ichida ketma-ket transformatsiyalar. Kuchli, lekin murakkab.",
    "",
    "Ko'p loyihalar uchun **URI versiyalash** eng amaliy tanlov.",
    "",
    "### Qoidalar",
    "- Yangi **major** versiya faqat buzuvchi o'zgarish uchun. Yangi ixtiyoriy maydon, yangi endpoint, yangi ixtiyoriy parametr — mavjud versiyada.",
    "- Versiya raqami butun son: `v1`, `v2`. `v1.3` URL'da kerak emas.",
    "- Eski versiyani **deprecation siyosati** bilan qo'llab-quvvatlang: e'lon qilingan muddat (masalan, 6–12 oy), `Deprecation` va `Sunset` header'lari, hujjatda migratsiya qo'llanmasi.",
    "- Har versiyadan foydalanishni o'lchang (qaysi mijoz va ilova versiyasi). Eski versiyani faqat trafik deyarli nolga tushganda o'chiring.",
    "- Bir vaqtda ikki-uchta versiyadan ko'p saqlamang: har biri test, hujjat va xato tuzatish xarajati.",
    "",
    "### Laravel'da tuzilma",
    "- Alohida route fayllari: `routes/api_v1.php`, `routes/api_v2.php`.",
    "- Controller va Resource namespace'lari: `App\\Http\\Controllers\\Api\\V1`, `App\\Http\\Resources\\V2`.",
    "- **Biznes mantiq umumiy** (action, service, model). Faqat HTTP qatlami (controller, request, resource) versiyalanadi. Aks holda ikki xil biznes qoidasi paydo bo'ladi.",
    "- Ko'pincha v2 controller v1 dan meros oladi yoki faqat Resource farq qiladi."
  ],
  "examples": [
    {
      "title": "Route tuzilmasi (Laravel 11+)",
      "lang": "php",
      "code": [
        "// bootstrap/app.php",
        "->withRouting(",
        "    api: __DIR__.'/../routes/api.php',",
        "    apiPrefix: 'api',",
        ")",
        "",
        "// routes/api.php",
        "Route::prefix('v1')->name('v1.')->group(base_path('routes/api_v1.php'));",
        "Route::prefix('v2')->name('v2.')->group(base_path('routes/api_v2.php'));",
        "",
        "// routes/api_v2.php",
        "Route::apiResource('orders', \\App\\Http\\Controllers\\Api\\V2\\OrderController::class);"
      ]
    },
    {
      "title": "Faqat Resource farq qiladi",
      "lang": "php",
      "code": [
        "namespace App\\Http\\Controllers\\Api\\V2;",
        "",
        "class OrderController extends \\App\\Http\\Controllers\\Api\\V1\\OrderController",
        "{",
        "    protected string $resource = \\App\\Http\\Resources\\V2\\OrderResource::class;",
        "}",
        "",
        "// V1: \"total\": 150000",
        "// V2: \"total\": { \"amount\": 150000, \"currency\": \"UZS\" }   <- buzuvchi o'zgarish",
        "",
        "// V1 javoblariga deprecation header'lari (middleware)",
        "$response->headers->set('Deprecation', 'true');",
        "$response->headers->set('Sunset', 'Wed, 31 Dec 2025 23:59:59 GMT');"
      ]
    }
  ],
  "pitfalls": [
    "Har kichik o'zgarishda yangi versiya chiqarish: versiyalar ko'payib, qo'llab-quvvatlash xarajati portlaydi.",
    "Biznes mantiqni ham versiyalar bo'yicha nusxalash: ikki xil qoidalar va ikki xil xatolar.",
    "Eski versiyani ogohlantirmasdan o'chirish: mobil ilovaning eski versiyalari yiqiladi.",
    "Versiyalashni boshidan rejalashtirmaslik: birinchi buzuvchi o'zgarishda `/api/orders` ni `/api/v1/orders` ga ko'chirish o'zi buzuvchi o'zgarish."
  ]
});
