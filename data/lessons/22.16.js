/* Chuqur dars: 22.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.16", {
  "lesson": [
    "### Yakuniy tekshiruv ro'yxati",
    "Bu dars 22.1–22.15 dagi qoidalarni bitta amaliy ro'yxatga yig'adi. RFC 8725 (JWT Best Current Practices) va OWASP JWT Cheat Sheet asosida.",
    "",
    "### Token berish (issuer)",
    "- [ ] Asimmetrik algoritm (RS256/PS256/ES256/EdDSA) ko'p tekshiruvchi bo'lsa. HS256 faqat bitta ilova uchun va 256+ bitli tasodifiy sir bilan.",
    "- [ ] Shaxsiy kalit secret manager, KMS yoki HSM'da, Git va log'larda emas.",
    "- [ ] `kid` header'i va rotatsiya rejasi (22.9). JWKS endpoint'i `Cache-Control` bilan.",
    "- [ ] Har token'da `iss`, `sub`, `aud`, `exp`, `iat`, `jti`.",
    "- [ ] Qisqa muddat: access 5–15 daqiqa (22.6).",
    "- [ ] Minimal payload: maxfiy va shaxsiy ma'lumot yo'q (22.13).",
    "- [ ] Turli maqsadli token'lar `typ` yoki `aud` bilan ajratilgan (22.4).",
    "- [ ] Refresh token opaque, stateful, rotatsiya va reuse detection bilan (22.10).",
    "",
    "### Tekshirish (verifier)",
    "- [ ] Yaxshi saqlanadigan kutubxona, yangilangan versiya. O'zingiz yozilgan kriptografiya yo'q.",
    "- [ ] Algoritm server tomonda qotirilgan, kalitga bog'langan. `none` rad (22.14).",
    "- [ ] Kalit faqat ishonchli JWKS yoki konfiguratsiyadan, `kid` bo'yicha. `jku`/`x5u`/`jwk` e'tiborsiz.",
    "- [ ] Imzo, `exp` (majburiy), `nbf`, `iat` — kichik leeway bilan.",
    "- [ ] `iss` aniq teng, `aud` o'z identifikatorini o'z ichiga oladi (22.7).",
    "- [ ] Token hajmi chegarasi.",
    "- [ ] Bekor qilish strategiyasi: `ver`/`tokens_valid_after`, kerak bo'lsa `jti` denylist (22.11).",
    "- [ ] Tekshiruv bitta markaziy guard yoki middleware'da.",
    "- [ ] Xato javobi umumiy `401`, sababi faqat log'da.",
    "",
    "### Uzatish va saqlash",
    "- [ ] Faqat HTTPS, HSTS.",
    "- [ ] `Authorization: Bearer` header'ida, URL'da emas.",
    "- [ ] Brauzerda `localStorage` yo'q: xotira + `HttpOnly` refresh cookie yoki BFF (22.12).",
    "- [ ] Mobil'da Keychain va Keystore.",
    "- [ ] Log, Sentry, Telescope va analitikada `Authorization` filtrlangan.",
    "",
    "### Jarayon",
    "- [ ] Salbiy testlar: `alg: none`, HS256 + ochiq kalit, muddati o'tgan, boshqa `aud`/`iss`, noma'lum `kid`, buzilgan imzo, `exp` siz.",
    "- [ ] Kalit kompromatida favqulodda rotatsiya jarayoni yozilgan va mashq qilingan.",
    "- [ ] Bog'liqliklar zaifliklarini skanerlash (`composer audit`).",
    "",
    "### Eng muhim savol",
    "\"Bizga haqiqatan JWT kerakmi?\" (22.15). Ko'p Laravel ilovalari uchun Sanctum yoki session soddaroq va xavfsizroq. JWT'ni ongli tanlang va yuqoridagi ro'yxatni to'liq bajaring."
  ],
  "examples": [
    {
      "title": "Konfiguratsiya namunasi",
      "lang": "php",
      "code": [
        "// config/jwt.php",
        "return [",
        "    'issuer' => env('JWT_ISSUER', 'https://auth.example.uz'),",
        "    'audience' => env('JWT_AUDIENCE', 'https://api.example.uz'),",
        "    'algorithm' => 'RS256',                 // qotirilgan",
        "    'jwks_url' => env('JWT_JWKS_URL'),",
        "    'jwks_cache_ttl' => 3600,",
        "    'leeway' => 30,",
        "    'access_ttl' => 600,                    // 10 daqiqa",
        "    'max_token_bytes' => 8192,",
        "    'require_claims' => ['iss', 'sub', 'aud', 'exp', 'iat', 'jti'],",
        "];"
      ]
    },
    {
      "title": "Salbiy testlar to'plami (Pest dataset)",
      "lang": "php",
      "code": [
        "dataset('bad_tokens', [",
        "    'alg none' => fn () => JwtFactory::unsigned(['sub' => 'admin']),",
        "    'hs256 with public key' => fn () => JwtFactory::hs256WithPublicKey(),",
        "    'expired' => fn () => JwtFactory::valid(['exp' => time() - 120]),",
        "    'wrong audience' => fn () => JwtFactory::valid(['aud' => 'https://other.example.uz']),",
        "    'wrong issuer' => fn () => JwtFactory::valid(['iss' => 'https://evil.example']),",
        "    'unknown kid' => fn () => JwtFactory::valid([], kid: 'nope'),",
        "    'no exp' => fn () => JwtFactory::valid(['exp' => null]),",
        "    'tampered payload' => fn () => JwtFactory::tampered(),",
        "]);",
        "",
        "it('rejects invalid tokens', function (Closure $make) {",
        "    $this->withToken($make())->getJson('/api/v1/me')->assertUnauthorized();",
        "})->with('bad_tokens');"
      ],
      "note": "`JwtFactory` — testlar uchun yozilgan yordamchi klass deb faraz qilingan."
    }
  ],
  "pitfalls": [
    "Ro'yxatning bir qismini bajarib, JWT'ni xavfsiz deb hisoblash: bitta tushib qolgan tekshiruv (`aud`, `alg`) butun himoyani buzadi.",
    "Salbiy testlarsiz ishlash.",
    "Favqulodda kalit rotatsiyasi rejasiz.",
    "Ehtiyoj bo'lmasa ham JWT tanlash."
  ]
});
