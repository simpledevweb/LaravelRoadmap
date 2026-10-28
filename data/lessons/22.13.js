/* Chuqur dars: 22.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.13", {
  "lesson": [
    "### Payload ochiq",
    "Imzolangan JWT (JWS) payload'i faqat base64url kodlangan (22.1). Token'ni qo'lga kiritgan har kim — foydalanuvchining o'zi, brauzer kengaytmasi, proxy, log tizimi, xato monitoring servisi, support xodimi, hujumchi — uni `jwt.io` yoki bitta buyruq bilan o'qiydi. Imzo faqat **o'zgartirishni** aniqlaydi.",
    "",
    "### Payload'ga qo'ymaslik kerak",
    "- Parollar, hash'lar, PIN, xavfsizlik savollari.",
    "- **Shaxsiy ma'lumotlar (PII):** pasport yoki JSHSHIR (PINFL), to'liq telefon, uy manzili, tug'ilgan sana, tibbiy ma'lumot. Ma'lumotlarni himoya qilish qonunchiligi (O'zbekiston \"Shaxsga doir ma'lumotlar to'g'risida\"gi qonun, GDPR) nuqtai nazaridan token log'larga tushganda ma'lumot oqishi hisoblanadi.",
    "- Moliyaviy ma'lumot: karta raqami, balans, hisob raqami.",
    "- Ichki tizim tafsilotlari: ichki IP, DB ID'lari (biznes hajmini oshkor qiladi), ichki servis nomlari, xato kodlari.",
    "- API kalitlar, boshqa token'lar, maxfiy kalitlar.",
    "- Biznes-sezgir ma'lumot: chegirma darajasi, kredit limiti, ichki reyting (foydalanuvchi o'zi ko'rmasligi kerak bo'lgan).",
    "",
    "### Payload'ga qo'yish mumkin",
    "- Barqaror, ma'nosiz identifikator: `sub` (ULID yoki UUID, ketma-ket ID emas).",
    "- Standart claim'lar: `iss`, `aud`, `exp`, `iat`, `jti`.",
    "- Scope'lar va kerak bo'lsa, umumiy rollar (foydalanuvchi o'z rolini bilishi zararsiz).",
    "- `tenant_id` (ma'nosiz ID shaklida).",
    "- OIDC ID token'da: client'ga **berilishiga rozilik olingan** profil ma'lumotlari (`name`, `email`).",
    "",
    "Asosiy savol: \"Bu ma'lumot token'ni ko'rishi mumkin bo'lgan **har bir** joyda oshkor bo'lsa, muammo bo'ladimi?\"",
    "",
    "### Maxfiy ma'lumot baribir kerak bo'lsa",
    "1. **Server tomonida saqlash:** token'da faqat ID, ma'lumot DB yoki keshda. Eng yaxshi variant.",
    "2. **JWE (shifrlangan JWT, RFC 7516):** payload shifrlanadi va faqat kalit egasi o'qiydi. Murakkab, kam kutubxona qo'llaydi, debug qiyin. Kamdan-kam kerak.",
    "3. **Nested JWT:** avval imzolash, keyin shifrlash (sign-then-encrypt).",
    "4. **Opaque token + introspection** (21.10): token ichida hech narsa yo'q.",
    "",
    "### Hajm bilan bog'liqlik",
    "Ko'p ma'lumot qo'yish nafaqat maxfiylik, balki hajm muammosi (22.1) va eskirish muammosi (22.3). Minimal payload — uchala muammoni ham kamaytiradi."
  ],
  "examples": [
    {
      "title": "Yomon va yaxshi payload",
      "lang": "json",
      "code": [
        "// YOMON",
        "{",
        "  \"sub\": 1042,",
        "  \"email\": \"ali@x.uz\",",
        "  \"phone\": \"+998901234567\",",
        "  \"pinfl\": \"31234567890123\",",
        "  \"balance\": 15400000,",
        "  \"credit_limit\": 50000000,",
        "  \"db_host\": \"10.0.3.17\",",
        "  \"permissions\": [\"orders.view\", \"orders.update\", \"...120 ta...\"]",
        "}",
        "",
        "// YAXSHI",
        "{",
        "  \"iss\": \"https://auth.example.uz\",",
        "  \"sub\": \"01J0ZJ8Q4XK...\",",
        "  \"aud\": \"https://api.example.uz\",",
        "  \"scope\": \"orders:read orders:write\",",
        "  \"tenant_id\": \"t_01J0ZK...\",",
        "  \"exp\": 1749550500, \"iat\": 1749549900, \"jti\": \"7f6a...\"",
        "}"
      ]
    },
    {
      "title": "Ma'lumotni token o'rniga keshdan olish",
      "lang": "php",
      "code": [
        "$claims = app(JwtVerifier::class)->verify($request->bearerToken());",
        "",
        "// Ruxsatlar token'da emas, qisqa keshda",
        "$permissions = Cache::remember(",
        "    \"perms:{$claims->sub}:{$claims->tenant_id}\",",
        "    300,",
        "    fn () => PermissionService::for($claims->sub, $claims->tenant_id),",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Imzolangan JWT'ni maxfiy deb hisoblab, unga shaxsiy ma'lumot qo'yish.",
    "Ketma-ket DB ID'larini `sub` sifatida ishlatish: biznes hajmi va sanash imkoniyati oshkor.",
    "Ruxsatlarning to'liq ro'yxatini token'ga qo'yish: hajm, oshkor bo'lish va eskirish.",
    "JWE'ni kerak bo'lmagan joyda ishlatib, keraksiz murakkablik qo'shish."
  ]
});
