/* Chuqur dars: 21.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.7", {
  "lesson": [
    "### OAuth'da scope",
    "Scope — client so'ragan va foydalanuvchi rozilik bergan huquqlar ro'yxati. Bo'sh joy bilan ajratilgan satr: `scope=orders:read profile email`. Umumiy tushuncha 20.16 da. OAuth'ga xos jihatlar:",
    "",
    "### Hayot sikli",
    "1. **So'rov:** client `/authorize` da kerakli scope'larni so'raydi.",
    "2. **Siyosat:** AS client'ga ruxsat etilgan scope'lar bilan kesishmani oladi. Client ro'yxatda yo'q scope so'rasa — rad yoki jim olib tashlash.",
    "3. **Rozilik:** foydalanuvchiga scope'lar tushunarli tavsif bilan ko'rsatiladi (21.8). Ba'zi AS'lar foydalanuvchiga ayrim scope'lardan voz kechishga imkon beradi.",
    "4. **Token:** berilgan scope'lar token'ga yoziladi (JWT'da `scope` claim) va token javobida `scope` maydonida qaytariladi. **Client javobdagi `scope` ni tekshirishi kerak:** u so'ralganidan kam bo'lishi mumkin.",
    "5. **Tekshirish:** resource server har endpoint'da kerakli scope'ni tekshiradi.",
    "",
    "### Incremental authorization",
    "Ilova birinchi kirishda faqat minimal scope'larni (`profile`) so'raydi. Foydalanuvchi qo'shimcha funksiyani (\"buyurtmalarni import qilish\") yoqqanda, `orders:read` uchun alohida rozilik so'raladi. Natija: birinchi rozilik ekrani qo'rqitmaydi, foydalanuvchi har huquq nima uchun kerakligini tushunadi. Google buni `include_granted_scopes` bilan qo'llaydi.",
    "",
    "### Scope dizayni",
    "- `resurs:amal`: `orders:read`, `orders:write`, `payments:refund`.",
    "- **OIDC standart scope'lari:** `openid` (OIDC'ni yoqadi), `profile`, `email`, `phone`, `address`, `offline_access` (refresh token).",
    "- Juda keng scope'lardan qoching (`full_access`, `admin`). Ular foydalanuvchini cho'chitadi va eng kam huquq tamoyiliga zid.",
    "- Juda mayda scope'lar rozilik ekranini uzun va tushunarsiz qiladi. Biznes ma'nosiga ko'ra guruhlang.",
    "- Scope **ilova huquqi**, foydalanuvchi huquqi emas: yakuniy ruxsat = foydalanuvchi ruxsati ∩ scope (20.16).",
    "",
    "### Resource server tomonda",
    "- Kerakli scope yo'q → `403` + `WWW-Authenticate: Bearer error=\"insufficient_scope\", scope=\"orders:write\"`.",
    "- Scope tekshiruvini route middleware'da va (ishonchlilik uchun) policy'da.",
    "",
    "### Passport'da",
    "- `Passport::tokensCan([...])` — ruxsat etilgan scope'lar va tavsiflari.",
    "- `Passport::setDefaultScope([...])` — scope so'ralmasa.",
    "- Middleware: `scopes:a,b` (hammasi), `scope:a,b` (biri).",
    "- `$request->user()->tokenCan('orders:write')`."
  ],
  "examples": [
    {
      "title": "So'ralgan va berilgan scope'lar",
      "lang": "text",
      "code": [
        "So'rov:   scope=profile orders:read orders:write",
        "Client siyosati: profile, orders:read",
        "Foydalanuvchi:  hammasiga rozi",
        "",
        "Token javobi:",
        "{ \"access_token\": \"...\", \"scope\": \"profile orders:read\" }",
        "",
        "-> client orders:write olmaganini bilib, yozish funksiyasini o'chirishi kerak"
      ]
    },
    {
      "title": "Passport'da scope'lar",
      "lang": "php",
      "code": [
        "Passport::tokensCan([",
        "    'profile' => 'Ismingiz va rasmingizni ko\\'rish',",
        "    'orders:read' => 'Buyurtmalaringizni ko\\'rish',",
        "    'orders:write' => 'Sizning nomingizdan buyurtma berish',",
        "]);",
        "Passport::setDefaultScope(['profile']);",
        "",
        "Route::middleware(['auth:api', 'scopes:orders:read'])->get('orders', [OrderController::class, 'index']);",
        "Route::middleware(['auth:api', 'scopes:orders:write'])->post('orders', [OrderController::class, 'store']);"
      ]
    }
  ],
  "pitfalls": [
    "Client token javobidagi `scope` ni tekshirmasdan barcha so'ralganlar berilgan deb hisoblash.",
    "Birinchi kirishda barcha mumkin bo'lgan scope'larni so'rash: foydalanuvchilar rad etadi.",
    "Client'ga ruxsat etilgan scope'larni AS'da cheklamaslik.",
    "Scope'ni foydalanuvchi huquqi o'rniga ishlatish: scope bor, lekin foydalanuvchida huquq yo'q holatni tekshirmaslik."
  ]
});
