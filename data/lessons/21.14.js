/* Chuqur dars: 21.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.14", {
  "lesson": [
    "### Asosiy farq",
    "- **OAuth 2.0** — **avtorizatsiya** freymvorki. U client'ga access token beradi: \"bu token bilan shu resurslarga kirish mumkin\". Token kim uchun berilgani, foydalanuvchi qachon va qanday kirgani haqida **standart** ma'lumot yo'q. Access token resource server uchun mo'ljallangan, client uchun emas.",
    "- **OpenID Connect (OIDC)** — OAuth 2.0 ustiga qurilgan **autentifikatsiya** qatlami. U client'ga \"foydalanuvchi kim va u qanday kirdi\" degan savolga standart javob beradi.",
    "",
    "### Nega OAuth'ni autentifikatsiya uchun ishlatish xato",
    "Ko'p ilovalar \"Facebook bilan kirish\" ni shunday qilgan: access token olib, `/me` endpoint'ini chaqirib, qaytgan ID bo'yicha foydalanuvchini kiritgan. Muammo: access token **auditoriyasi** client emas. Boshqa ilova uchun berilgan (hujumchi o'z ilovasida yig'gan) access token sizning ilovangizga berilsa, `/me` qurbonning ID'sini qaytaradi va hujumchi qurbon sifatida kiradi (token substitution). OIDC'ning `id_token` i esa aynan **sizning client'ingiz uchun** (`aud = client_id`) imzolangan.",
    "",
    "### OIDC nima qo'shadi",
    "1. **`openid` scope:** so'rovga qo'shilsa, flow OIDC bo'ladi.",
    "2. **ID Token** — client uchun JWT:",
    "   - `iss` (kim bergan), `sub` (foydalanuvchining **barqaror** ID'si, email emas), `aud` (sizning `client_id`), `exp`, `iat`,",
    "   - `nonce` (replay'dan himoya: client yuborgan qiymat qaytadi),",
    "   - `auth_time`, `acr`/`amr` (qanday autentifikatsiya: parol, MFA),",
    "   - ixtiyoriy profil claim'lari (`name`, `email`, `email_verified`).",
    "3. **UserInfo endpoint:** access token bilan foydalanuvchi profilini olish.",
    "4. **Standart scope'lar:** `profile`, `email`, `phone`, `address`, `offline_access`.",
    "5. **Discovery:** `/.well-known/openid-configuration` — barcha endpoint'lar, JWKS va qo'llanadigan imkoniyatlar.",
    "6. **Session boshqaruvi:** RP-initiated logout, back-channel va front-channel logout.",
    "",
    "### ID token tekshiruvi",
    "Client ID token'ni olganda: imzo (JWKS orqali), `iss`, `aud` = o'z `client_id`, `exp`, `nonce` = yuborilgani. Foydalanuvchini **`iss` + `sub`** juftligi bo'yicha aniqlang. Email bo'yicha emas: email o'zgarishi mumkin, ba'zi provayderlarda tasdiqlanmagan bo'lishi mumkin (`email_verified: false`) va mavjud akkauntni egallash uchun ishlatilishi mumkin.",
    "",
    "### Qaysi token nima uchun",
    "| Token | Kimga | Nima uchun |",
    "|---|---|---|",
    "| ID token | client | foydalanuvchi kimligi, login |",
    "| Access token | resource server | API'ga kirish |",
    "| Refresh token | AS | yangi token'lar |",
    "",
    "ID token'ni API'ga Bearer sifatida yubormang, access token'ni esa foydalanuvchi identifikatsiyasi uchun tahlil qilmang.",
    "",
    "### Laravel'da",
    "- **Client (RP):** Socialite (Google, Microsoft OIDC'ni qo'llaydi), `socialiteproviders/*` (Keycloak, OneID va boshqalar), yoki `jumbojett/openid-connect-php`.",
    "- **Provider (OP):** Passport o'zi OIDC'ni to'liq bermaydi. Kengaytmalar (`ronvanderheijden/openid-connect`) yoki Keycloak kabi tayyor IdP."
  ],
  "examples": [
    {
      "title": "OIDC so'rovi va ID token",
      "lang": "text",
      "code": [
        "GET /authorize?response_type=code&client_id=myapp",
        "    &scope=openid%20profile%20email&nonce=n-0S6_WzA2Mj&state=...&code_challenge=...",
        "",
        "/token javobi:",
        "{",
        "  \"access_token\": \"...\",",
        "  \"id_token\": \"eyJhbGciOiJSUzI1NiIs...\",",
        "  \"token_type\": \"Bearer\", \"expires_in\": 3600",
        "}",
        "",
        "id_token payload:",
        "{ \"iss\": \"https://accounts.google.com\", \"sub\": \"10769150350006150715113082367\",",
        "  \"aud\": \"myapp\", \"exp\": 1749553200, \"nonce\": \"n-0S6_WzA2Mj\",",
        "  \"email\": \"ali@gmail.com\", \"email_verified\": true }"
      ]
    },
    {
      "title": "Foydalanuvchini iss + sub bo'yicha bog'lash",
      "lang": "php",
      "code": [
        "$oidc = Socialite::driver('google')->user();",
        "",
        "$identity = SocialIdentity::firstOrNew([",
        "    'provider' => 'google',             // iss ga mos",
        "    'provider_user_id' => $oidc->getId(),  // sub",
        "]);",
        "",
        "if (! $identity->exists) {",
        "    // Email bo'yicha mavjud akkauntga avtomatik ulash xavfli:",
        "    // faqat email_verified va foydalanuvchi o'z akkauntiga kirib tasdiqlagandan keyin",
        "    $user = User::create(['name' => $oidc->getName(), 'email' => $oidc->getEmail()]);",
        "    $identity->user()->associate($user)->save();",
        "}",
        "",
        "Auth::login($identity->user);",
        "request()->session()->regenerate();"
      ]
    }
  ],
  "pitfalls": [
    "OAuth access token va `/me` chaqiruvi bilan login qilish: token substitution hujumi.",
    "Foydalanuvchini `sub` o'rniga email bo'yicha aniqlash.",
    "ID token'ni API'ga Bearer token sifatida yuborish.",
    "ID token'da `aud` va `nonce` ni tekshirmaslik."
  ]
});
