/* Chuqur dars: 22.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.15", {
  "lesson": [
    "### Ikki model",
    "- **Session (stateful):** server holatni saqlaydi (Redis, DB). Mijozda faqat ma'nosiz ID (cookie yoki opaque token). Har so'rovda server holatni o'qiydi.",
    "- **JWT (stateless):** holat token ichida, imzolangan. Server faqat imzoni va claim'larni tekshiradi.",
    "",
    "### Taqqoslash",
    "| Jihat | Session / opaque token | JWT |",
    "|---|---|---|",
    "| Bekor qilish | darhol | qiyin (22.11) |",
    "| Har so'rovda holat o'qish | ha (Redis ~ms) | yo'q |",
    "| Masshtab | umumiy store kerak | serverlar mustaqil |",
    "| Mikroservislar | har biri store'ga yoki AS'ga murojaat | har biri lokal tekshiradi |",
    "| Ma'lumot oshkorligi | yo'q | payload ochiq |",
    "| Hajm | kichik (ID) | katta (yuzlab bayt – KB) |",
    "| Huquq o'zgarishi | darhol | token muddatigacha |",
    "| Murakkablik | past | kalitlar, rotatsiya, algoritmlar |",
    "| Xatolar xavfi | past | yuqori (alg confusion, aud, exp) |",
    "",
    "### Afsonalar",
    "- **\"JWT tezroq\".** Redis'dan session o'qish — taxminan millisekund. Ko'p ilovalarda bu sezilmaydi. Har so'rovda baribir foydalanuvchini DB'dan yuklasangiz, farq yo'q.",
    "- **\"JWT xavfsizroq\".** Aksincha: bekor qilish qiyinligi va implementatsiya xatolari xavfni oshiradi.",
    "- **\"Mobil uchun JWT kerak\".** Mobil uchun **token** kerak, lekin u opaque bo'lishi mumkin (Sanctum PAT).",
    "- **\"Stateless — har doim yaxshi\".** Logout, bloklash va \"faol qurilmalar\" kabi talablar holatni qaytaradi.",
    "",
    "### Qachon session (yoki opaque token)",
    "- Monolit yoki kam sonli servis (odatiy Laravel ilovasi).",
    "- Birinchi tomon web va mobil ilovalar.",
    "- Darhol bekor qilish muhim (moliya, admin panel).",
    "- Jamoa JWT'ning nozik jihatlarini chuqur bilmaydi.",
    "",
    "Laravel'da: `web` session guard, Sanctum (SPA cookie yoki opaque PAT).",
    "",
    "### Qachon JWT",
    "- Ko'p mustaqil mikroservislar, markaziy AS bilan va har servisda DB/kesh murojaatini istamaysiz.",
    "- Tashqi IdP (Keycloak, Auth0, OneID) token'larini qabul qilish: ular baribir JWT.",
    "- OIDC ID token'lar.",
    "- Tashkilotlar o'rtasida ishonch (federatsiya): bir tomon imzolaydi, boshqasi ochiq kalit bilan tekshiradi.",
    "- Qisqa muddatli, bir martalik imzolangan havolalar.",
    "",
    "### Gibrid",
    "Ko'p katta tizimlarda: tashqarida opaque token yoki session (darhol bekor qilish, maxfiylik), API gateway ichkariga qisqa muddatli JWT bilan almashtiradi (\"phantom token\"), ichki servislar JWT'ni lokal tekshiradi. Ikkala dunyoning afzalligi."
  ],
  "examples": [
    {
      "title": "Bir xil vazifa: Sanctum va JWT",
      "lang": "php",
      "code": [
        "// Sanctum (opaque): sodda, darhol bekor qilinadi",
        "Route::middleware('auth:sanctum')->get('/me', fn (Request $r) => $r->user());",
        "$request->user()->currentAccessToken()->delete();   // logout: darhol",
        "",
        "// JWT: lokal tekshiruv, lekin logout uchun denylist kerak",
        "Route::middleware('auth:jwt')->get('/me', fn (Request $r) => $r->user());",
        "Redis::setex(\"jwt:deny:{$claims->jti}\", $claims->exp - time(), 1);   // logout"
      ]
    },
    {
      "title": "Phantom token (gateway'da)",
      "lang": "text",
      "code": [
        "Mobil ilova --(opaque token)--> API Gateway",
        "API Gateway --introspect (kesh 30s)--> Authorization Server",
        "API Gateway --(qisqa muddatli JWT, 60s, aud=orders)--> orders-service",
        "orders-service: JWT'ni JWKS bilan lokal tekshiradi",
        "",
        "Natija: tashqarida darhol bekor qilish va maxfiylik,",
        "        ichkarida stateless tez tekshiruv."
      ]
    }
  ],
  "pitfalls": [
    "Oddiy Laravel monoliti uchun \"zamonaviy\" deb JWT tanlash va session'ning afzalliklarini yo'qotish.",
    "JWT tanlab, har so'rovda baribir DB'dan holatni o'qish: ikkalasining kamchiliklari.",
    "Session'ni masshtablanmaydi deb hisoblash: umumiy Redis bilan gorizontal masshtablanadi.",
    "JWT'ni \"bekor qilinmaydigan\" deb bilib turib, uzoq muddat bilan berish."
  ]
});
