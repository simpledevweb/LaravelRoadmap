/* Chuqur dars: 20.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.9", {
  "lesson": [
    "### Passport nima",
    "Laravel Passport — `league/oauth2-server` asosidagi to'liq **OAuth 2.0 authorization server**. U sizning Laravel ilovangizni \"Google kabi\" provayderga aylantiradi: boshqa ilovalar sizning foydalanuvchilaringiz nomidan, ularning roziligi bilan, cheklangan huquqlar bilan API'ga kira oladi.",
    "",
    "### Imkoniyatlari",
    "- **Grant'lar:** Authorization Code (+PKCE), Client Credentials, Refresh Token, Device Authorization (Passport 12+). Eskirgan Password va Implicit grant'lar default'da o'chirilgan.",
    "- **Client boshqaruvi:** `php artisan passport:client` (va `--public` PKCE uchun, `--client` server-server uchun). Client ID, secret, redirect URI'lar.",
    "- **Scope'lar:** `Passport::tokensCan(['orders:read' => 'Buyurtmalarni ko\\'rish', ...])`. Tavsiflar rozilik ekranida chiqadi.",
    "- **Rozilik ekrani:** `/oauth/authorize` (o'zingizning view bilan sozlanadi).",
    "- **Token'lar:** access token'lar **JWT** formatida (RS256, `storage/oauth-*.key` kalitlari bilan imzolangan), DB'da ham qayd etiladi va bekor qilinadi. Refresh token'lar shifrlangan.",
    "- **Muddat:** `Passport::tokensExpireIn()`, `refreshTokensExpireIn()`, `personalAccessTokensExpireIn()`.",
    "- Personal access token'lar ham bor (Sanctum'ga o'xshash).",
    "",
    "### Qachon kerak",
    "- Uchinchi tomon ilovalari ekotizimi: hamkorlar sizning API'ngizga foydalanuvchi nomidan ulanadi.",
    "- Siz \"Login with MyApp\" provayderi bo'lmoqchisiz (OIDC qo'shimcha paket yoki o'z kengaytmangiz bilan).",
    "- Server-server integratsiyalar uchun standart Client Credentials.",
    "- Mijoz yoki regulyator standart OAuth 2.0 talab qilsa.",
    "",
    "### Qachon kerak emas",
    "Faqat o'z SPA va mobil ilovangiz bo'lsa — **Sanctum** (20.8). Passport murakkabroq: kalitlar boshqaruvi, client'lar, ko'proq jadvallar, OAuth tushunchalari. Ortiqcha murakkablik — ortiqcha xatolar.",
    "",
    "### Tashqi IdP muqobili",
    "Keycloak, Auth0, Okta, Azure AD yoki davlat OneID kabi tayyor identity provider'lar OAuth/OIDC, MFA, SSO va foydalanuvchilarni boshqarishni o'z zimmasiga oladi. Laravel API faqat resource server bo'lib, JWT'larni JWKS orqali tekshiradi (20.7). Ko'p ilovali korporativ muhitda bu Passport'dan ko'ra qulayroq bo'lishi mumkin.",
    "",
    "### Production'da",
    "- Shifrlash kalitlari (`oauth-private.key`, `oauth-public.key`) Git'da emas. `PASSPORT_PRIVATE_KEY` va `PASSPORT_PUBLIC_KEY` env yoki secret manager orqali.",
    "- Kalit rotatsiyasi rejasi.",
    "- `passport:purge` buyrug'i bekor qilingan va muddati o'tgan token'larni tozalaydi.",
    "- Client secret'lar hash bilan saqlanadi (Passport 11+ default)."
  ],
  "examples": [
    {
      "title": "Sozlash (Passport 12, Laravel 11+)",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot()",
        "Passport::tokensCan([",
        "    'orders:read' => 'Buyurtmalaringizni ko\\'rish',",
        "    'orders:write' => 'Buyurtma yaratish va o\\'zgartirish',",
        "]);",
        "Passport::setDefaultScope(['orders:read']);",
        "",
        "Passport::tokensExpireIn(now()->addHour());",
        "Passport::refreshTokensExpireIn(now()->addDays(30));",
        "Passport::authorizationView('auth.oauth.authorize');",
        "",
        "// config/auth.php",
        "'guards' => [",
        "    'api' => ['driver' => 'passport', 'provider' => 'users'],",
        "],",
        "",
        "// routes/api.php",
        "Route::middleware(['auth:api', 'scopes:orders:write'])->post('orders', StoreOrderController::class);"
      ]
    },
    {
      "title": "Client'lar yaratish va server-server",
      "lang": "bash",
      "code": [
        "php artisan install:api --passport",
        "",
        "# Hamkorning web ilovasi (PKCE bilan public client)",
        "php artisan passport:client --public --name=\"Hisobchi\" --redirect_uri=\"https://hisobchi.uz/callback\"",
        "",
        "# Server-server integratsiya",
        "php artisan passport:client --client --name=\"Inventory sync\"",
        "",
        "# Token olish (client credentials)",
        "curl -X POST https://api.example.uz/oauth/token \\",
        "  -d grant_type=client_credentials -d client_id=9c1... -d client_secret=... -d scope=\"inventory:write\""
      ],
      "note": "Passport buyruq opsiyalari versiyaga qarab farq qiladi. O'rnatilgan versiya uchun `php artisan passport:client --help` ni tekshiring."
    }
  ],
  "pitfalls": [
    "Faqat birinchi tomon ilovalari uchun Passport o'rnatish: ortiqcha murakkablik.",
    "OAuth kalitlarini Git'ga commit qilish.",
    "Password grant'ni qayta yoqib, uchinchi tomonlarga foydalanuvchi parolini so'rashga ruxsat berish.",
    "Scope tavsiflarini texnik qoldirish: foydalanuvchi rozilik ekranida nimaga rozi bo'layotganini tushunmaydi."
  ]
});
