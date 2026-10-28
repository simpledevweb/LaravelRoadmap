/* Chuqur dars: 22.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.14", {
  "lesson": [
    "### Muammo: header'dagi `alg` ga ishonish",
    "JWT header'idagi `alg` token **ichida**, ya'ni hujumchi uni xohlagancha yozishi mumkin (imzo tekshirilishidan oldin u hali ishonchsiz). Agar tekshiruvchi \"token qaysi algoritmni aytsa, shu bilan tekshiraman\" desa, hujumchi algoritmni tanlaydi. Bir nechta mashhur kutubxonalarda (2015 va undan keyin) shunday zaifliklar topilgan.",
    "",
    "### Hujum 1: `alg: none`",
    "Hujumchi header'ni `{\"alg\": \"none\"}` qiladi, payload'ni xohlagancha o'zgartiradi (`\"sub\": \"admin\"`) va imzo qismini bo'sh qoldiradi: `header.payload.`. Zaif kutubxona \"`none` — imzo kerak emas\" deb qabul qiladi. Ba'zan `None`, `NONE`, `nOnE` variantlari filtrlarni aylanib o'tgan.",
    "",
    "### Hujum 2: RS256 → HS256 (key confusion)",
    "Server RS256 ishlatadi va tekshirish uchun ochiq kalitni biladi. Ochiq kalit — **ochiq**: JWKS endpoint'ida yoki sertifikatda.",
    "1. Hujumchi header'ni `{\"alg\": \"HS256\"}` qiladi.",
    "2. Payload'ni o'zgartiradi.",
    "3. Imzoni **HMAC-SHA256** bilan hisoblaydi va sir sifatida serverning **ochiq kalitini** (PEM satri) ishlatadi.",
    "4. Zaif tekshiruvchi `verify($token, $publicKey)` ni chaqiradi. Header HS256 degani uchun HMAC bilan, sir sifatida esa unga berilgan kalit (ochiq kalit satri) bilan tekshiradi. Imzo mos keladi!",
    "",
    "Natija: hujumchi faqat ochiq ma'lumot bilan istalgan token yasaydi.",
    "",
    "### Boshqa variantlar",
    "- **`kid` injection:** `kid` fayl yo'li (`../../dev/null`, bo'sh kalit) yoki SQL so'rovi sifatida ishlatilsa.",
    "- **`jku`/`x5u`/`jwk` header'lari:** hujumchi o'z kaliti manzilini yoki kalitning o'zini ko'rsatadi (22.2).",
    "- **ECDSA \"psychic signatures\"** (CVE-2022-21449, Java 15–18): `r = s = 0` imzo har qanday xabar uchun to'g'ri deb qabul qilingan. Kutubxonalarni yangilab borish muhimligi misoli.",
    "",
    "### Himoya",
    "1. **Algoritmni server tomonda qotiring.** Tekshiruvchi kutilgan algoritmni (yoki qisqa ruxsat etilgan ro'yxatni) biladi va header'dagi `alg` mos kelmasa — rad.",
    "2. **Har kalit faqat bitta algoritm bilan bog'langan.** RSA ochiq kaliti hech qachon HMAC siri sifatida ishlatilmaydi. `firebase/php-jwt` v6+ dagi `new Key($key, 'RS256')` aynan shu. JWKS'dagi `alg` maydoni yoki `parseKeySet($jwks, 'RS256')` default'i.",
    "3. **`none` ni hech qachon qabul qilmang.**",
    "4. **`kid` ni faqat oldindan ma'lum kalitlar ro'yxatidan qidirish** uchun ishlating, fayl yo'li yoki so'rov sifatida emas.",
    "5. `jku`, `x5u`, `jwk` header'larini e'tiborsiz qoldiring.",
    "6. **Yaxshi saqlanadigan kutubxona**, yangilangan versiya.",
    "7. **Salbiy testlar:** `alg: none`, HS256 + ochiq kalit, noma'lum `kid` — hammasi rad etilishi kerak."
  ],
  "examples": [
    {
      "title": "Zaif va xavfsiz tekshiruv",
      "lang": "php",
      "code": [
        "// ZAIF (tushunish uchun soxta API): algoritmni token'dan oladi",
        "$header = json_decode(base64url_decode(explode('.', $jwt)[0]));",
        "$ok = MyJwt::verify($jwt, $publicKeyPem, $header->alg);   // alg=HS256 bo'lsa, PEM HMAC siriga aylanadi",
        "",
        "// XAVFSIZ: algoritm kalitga bog'langan",
        "use Firebase\\JWT\\JWT;",
        "use Firebase\\JWT\\Key;",
        "",
        "$claims = JWT::decode($jwt, new Key($publicKeyPem, 'RS256'));",
        "// header'da HS256 yoki none bo'lsa: UnexpectedValueException"
      ]
    },
    {
      "title": "Salbiy testlar",
      "lang": "php",
      "code": [
        "it('rejects alg none', function () {",
        "    $b64 = fn ($x) => rtrim(strtr(base64_encode(json_encode($x)), '+/', '-_'), '=');",
        "    $forged = $b64(['alg' => 'none', 'typ' => 'JWT']) . '.' . $b64(['sub' => 'admin', 'exp' => time() + 600]) . '.';",
        "",
        "    $this->withToken($forged)->getJson('/api/v1/me')->assertUnauthorized();",
        "});",
        "",
        "it('rejects HS256 signed with public key', function () {",
        "    $public = file_get_contents(storage_path('jwt-public.pem'));",
        "    $forged = \\Firebase\\JWT\\JWT::encode(",
        "        ['iss' => config('jwt.issuer'), 'aud' => config('jwt.audience'), 'sub' => 'admin', 'exp' => time() + 600],",
        "        $public, 'HS256'",
        "    );",
        "",
        "    $this->withToken($forged)->getJson('/api/v1/me')->assertUnauthorized();",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Tekshiruvda header'dagi `alg` ni ishlatish.",
    "Bir kalit obyektini turli algoritmlar bilan ishlatishga ruxsat beruvchi kutubxona yoki o'z kodingiz.",
    "`kid` ni fayl tizimi yoki DB so'rovida filtrsiz ishlatish.",
    "JWT kutubxonasini yillab yangilamaslik."
  ]
});
