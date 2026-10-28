/* Chuqur dars: 21.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.16", {
  "lesson": [
    "### Qaror uchun asosiy savol",
    "**API'ngizga kim kiradi va kimning nomidan?** Javob texnologiyani belgilaydi, \"qaysi biri zamonaviyroq\" emas.",
    "",
    "### Sanctum yetarli",
    "- **Faqat o'z (birinchi tomon) ilovalaringiz:** SPA (cookie session rejimi), o'z mobil ilovangiz (personal access token).",
    "- Foydalanuvchilar o'zlari uchun token yaratadi (GitHub PAT kabi): skriptlar, CLI.",
    "- Oddiy servis token'lari yoki API key'lar.",
    "- Refresh token, rozilik ekrani va uchinchi tomon client'lari kerak emas.",
    "",
    "Afzalliklari: sodda, kam infratuzilma (kalitlar, client'lar yo'q), tez sozlanadi, kam xato nuqtasi, token'lar opaque va darhol bekor qilinadi.",
    "",
    "### OAuth (Passport yoki tashqi IdP) kerak",
    "- **Uchinchi tomon ilovalari** foydalanuvchilaringiz nomidan API'ga kiradi va rozilik ekrani kerak: ochiq platforma, hamkorlar ekotizimi, integratsiyalar marketplace'i.",
    "- Siz **identity provider** bo'lmoqchisiz: \"MyApp bilan kirish\", bir nechta ilova uchun **SSO**.",
    "- Hamkor yoki regulyator **standart OAuth/OIDC** talab qiladi (bank, Open Banking, davlat integratsiyalari).",
    "- Ko'p mikroservislar markazlashgan token beruvchiga va standart JWT tekshiruviga muhtoj.",
    "- Standart Client Credentials bilan M2M integratsiyalar ko'p.",
    "",
    "### Uchinchi variant: tashqi IdP",
    "Keycloak, Auth0, Okta, Azure Entra ID, AWS Cognito yoki davlat OneID. Ular OAuth/OIDC, MFA, SSO, ijtimoiy login, foydalanuvchilarni boshqarish, audit va xavfsizlik yangilanishlarini o'z zimmasiga oladi. Laravel faqat resource server (JWT'ni JWKS bilan tekshiradi) va OIDC client (Socialite). Mos keladi: korporativ muhit, ko'p ilova, kuchli MFA va audit talablari. Kamchiliklar: tashqi bog'liqlik, narx (SaaS), o'z-o'zini xostlashda operatsion yuk (Keycloak).",
    "",
    "### Aralash arxitektura",
    "Ko'p loyihalar birlashtiradi:",
    "- O'z SPA va mobil ilova uchun **Sanctum**.",
    "- Hamkorlar API'si uchun **Passport** (alohida guard, alohida route prefiksi).",
    "",
    "Laravel guard'lari buni qo'llaydi, lekin ikki tizimni saqlash murakkablik qo'shadi. Faqat haqiqiy ehtiyoj bo'lganda.",
    "",
    "### Keyinroq o'tish",
    "Sanctum bilan boshlab, keyin OAuth'ga o'tish mumkin. Buni osonlashtirish uchun avtorizatsiya mantiqini token turidan ajrating: policy'lar `$user->tokenCan()` orqali ishlaydi va bu ikkala paketda ham bir xil interfeys. Scope nomlarini boshidan OAuth uslubida (`orders:read`) tanlang.",
    "",
    "### Qisqa qoida",
    "\"Biz OAuth ishlatamiz\" — o'z mobil ilovangiz uchun password grant bilan Passport o'rnatish — ko'pincha Sanctum'dan **kam** xavfsiz va ancha murakkab. Uchinchi tomon bo'lmasa, Sanctum."
  ],
  "examples": [
    {
      "title": "Qaror jadvali",
      "lang": "text",
      "code": [
        "Holat                                              Tanlov",
        "O'z SPA (bir domen)                                Sanctum (cookie)",
        "O'z mobil ilova                                    Sanctum (PAT) yoki tashqi IdP + PKCE",
        "Foydalanuvchi skriptlari uchun shaxsiy token'lar   Sanctum (PAT)",
        "Hamkorlar foydalanuvchi nomidan kiradi             Passport yoki tashqi IdP",
        "SSO, 'MyApp bilan kirish', ko'p ilova               Tashqi IdP (Keycloak va h.k.) yoki Passport + OIDC",
        "Server-server, standart talab qilinadi             Client Credentials (Passport/IdP)",
        "Oddiy B2B integratsiya                             API key yoki Sanctum token"
      ]
    },
    {
      "title": "Ikki guard yonma-yon",
      "lang": "php",
      "code": [
        "// config/auth.php",
        "'guards' => [",
        "    'web' => ['driver' => 'session', 'provider' => 'users'],",
        "    'api' => ['driver' => 'passport', 'provider' => 'users'],",
        "],",
        "",
        "// O'z ilovalarimiz: Sanctum",
        "Route::middleware('auth:sanctum')->prefix('app/v1')->group(base_path('routes/app_api.php'));",
        "",
        "// Hamkorlar: Passport OAuth",
        "Route::middleware('auth:api')->prefix('partner/v1')->group(base_path('routes/partner_api.php'));"
      ],
      "note": "Sanctum va Passport'ning `HasApiTokens` trait'lari to'qnashadi. Ikkalasini bitta User modelida ishlatish uchun maxsus yechim kerak, shuning uchun bu arxitekturani ehtiyotkorlik bilan tanlang."
    }
  ],
  "pitfalls": [
    "Faqat o'z ilovalaringiz uchun Passport o'rnatish: ortiqcha murakkablik.",
    "Uchinchi tomon integratsiyalarini Sanctum PAT bilan, foydalanuvchidan token nusxalashni so'rab qurish: rozilik, scope tanlash va bekor qilish noqulay.",
    "Avtorizatsiya mantiqini token turiga bog'lab, keyingi o'tishni qiyinlashtirish.",
    "Tashqi IdP imkoniyatini ko'rib chiqmasdan, SSO va MFA'ni o'zingiz qurish."
  ]
});
