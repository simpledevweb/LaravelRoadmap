/* Chuqur dars: 22.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.1", {
  "lesson": [
    "### JWT oilasi",
    "\"JWT\" deganda ko'pincha bir nechta standart birga tushuniladi (JOSE — JSON Object Signing and Encryption):",
    "- **JWT** (RFC 7519): claim'lar to'plami formati va qoidalari.",
    "- **JWS** (RFC 7515): imzolangan ma'lumot. Amalda JWT'larning deyarli hammasi JWS.",
    "- **JWE** (RFC 7516): shifrlangan ma'lumot.",
    "- **JWK** (RFC 7517): kalitlarni JSON'da ifodalash, **JWKS** — kalitlar to'plami.",
    "- **JWA** (RFC 7518): algoritmlar ro'yxati (`HS256`, `RS256`, `ES256`, `EdDSA`).",
    "",
    "### Compact serialization",
    "Imzolangan JWT uch qismdan iborat va har biri **base64url** (URL'ga xavfsiz base64: `+` → `-`, `/` → `_`, `=` padding'siz) bilan kodlangan, nuqta bilan ajratilgan:",
    "",
    "`BASE64URL(header) . BASE64URL(payload) . BASE64URL(signature)`",
    "",
    "- Imzo `BASE64URL(header) + \".\" + BASE64URL(payload)` satri ustidan hisoblanadi. Ya'ni header ham imzolanadi va algoritmni o'zgartirib bo'lmaydi.",
    "- JWE beshta qismdan iborat: header, shifrlangan kalit, IV, shifrmatn, autentifikatsiya tegi.",
    "",
    "### Muhim tushuncha: kodlash ≠ shifrlash",
    "Base64url — faqat kodlash. Har kim `jwt.io` yoki `base64 -d` bilan header va payload'ni o'qiy oladi. Imzo **yaxlitlikni** (o'zgartirilmaganini) va **haqiqiylikni** (kalit egasi bergan) kafolatlaydi, **maxfiylikni** emas (22.13).",
    "",
    "### Self-contained",
    "JWT o'z-o'zini tavsiflaydi: tekshiruvchi DB'ga murojaat qilmasdan imzo va claim'lardan barcha kerakli ma'lumotni oladi. Bu uning asosiy afzalligi (masshtab, mikroservislar) va asosiy muammosi (bekor qilish, 22.11) manbai.",
    "",
    "### Hajm",
    "JWT odatda 500 baytdan bir necha KB gacha. Har so'rovda yuboriladi. Cookie'da 4 KB chegara bor. Ko'p claim (rollar, ruxsatlar ro'yxati) qo'shish uni tez kattalashtiradi.",
    "",
    "### Qayerda ishlatiladi",
    "- OAuth access token'lar (Passport, Keycloak, Auth0).",
    "- OIDC ID token'lar (21.14).",
    "- Servislar o'rtasida qisqa muddatli \"ichki\" token'lar.",
    "- Bir martalik havolalar (email tasdiqlash, parolni tiklash): imzolangan va muddatli.",
    "- `private_key_jwt` client autentifikatsiyasi (21.4)."
  ],
  "examples": [
    {
      "title": "Qismlarga ajratish",
      "lang": "text",
      "code": [
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjUtMDYifQ",
        ".",
        "eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS51eiIsInN1YiI6IjQyIiwiZXhwIjoxNzQ5NTUzMjAwfQ",
        ".",
        "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk...",
        "",
        "header  = {\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"2025-06\"}",
        "payload = {\"iss\":\"https://auth.example.uz\",\"sub\":\"42\",\"exp\":1749553200}"
      ]
    },
    {
      "title": "PHP'da dekodlash (tekshiruvsiz — faqat debug)",
      "lang": "php",
      "code": [
        "[$h, $p, $s] = explode('.', $jwt);",
        "",
        "$b64url = fn (string $x) => base64_decode(strtr($x, '-_', '+/') . str_repeat('=', (4 - strlen($x) % 4) % 4));",
        "",
        "$header = json_decode($b64url($h), true, flags: JSON_THROW_ON_ERROR);",
        "$payload = json_decode($b64url($p), true, flags: JSON_THROW_ON_ERROR);",
        "",
        "// DIQQAT: bu imzoni TEKSHIRMAYDI. Avtorizatsiya qarori uchun ishlatmang.",
        "dump($header, $payload);"
      ]
    }
  ],
  "pitfalls": [
    "Base64url kodlashni shifrlash deb hisoblash.",
    "Imzoni tekshirmasdan payload'ni dekodlab, undagi ma'lumotga ishonish.",
    "JWT ichiga ko'p ma'lumot qo'yib, cookie 4 KB chegarasidan oshirish.",
    "JWS va JWE'ni adashtirish: oddiy JWT shifrlanmagan."
  ]
});
