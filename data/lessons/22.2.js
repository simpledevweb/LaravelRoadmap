/* Chuqur dars: 22.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.2", {
  "lesson": [
    "### Header (JOSE header)",
    "Token qanday qayta ishlanishi haqida metadata:",
    "- **`alg`** (majburiy): imzo algoritmi: `RS256`, `ES256`, `HS256`, `EdDSA`. Tekshiruvchi **unga ko'r-ko'rona ishonmasligi** kerak (22.14).",
    "- **`typ`**: odatda `JWT`. Turli token turlarini (access, ID, logout) chalkashtirmaslik uchun maxsus qiymatlar: `at+jwt` (RFC 9068, OAuth access token).",
    "- **`kid`** (key ID): qaysi kalit bilan imzolangani. Kalit rotatsiyasi uchun muhim (22.9). Tekshiruvchi `kid` bo'yicha JWKS'dan kalitni tanlaydi.",
    "- **`cty`**: ichma-ich JWT uchun.",
    "- Xavfli header'lar: **`jku`** (JWKS URL), **`x5u`** (sertifikat URL), **`jwk`** (kalitning o'zi token ichida). Hujumchi o'z kalitini ko'rsatib, o'zi imzolagan token yasashi mumkin. Tekshiruvchi bularni **e'tiborsiz qoldirishi** va faqat oldindan sozlangan ishonchli kalitlardan foydalanishi kerak.",
    "",
    "### Payload (claims set)",
    "Token ma'lumotlari — **claim'lar** (da'volar): `{\"sub\": \"42\", \"exp\": 1749553200, \"scope\": \"orders:read\"}`. Turlari va ma'nolari 22.3–22.4 da. Payload istalgan JSON obyekt, lekin:",
    "- ochiq o'qiladi (22.13),",
    "- har so'rovda uzatiladi (hajm),",
    "- token muddati davomida o'zgarmaydi (eskirish).",
    "",
    "### Signature",
    "`signature = SIGN(key, ASCII(BASE64URL(header) + \".\" + BASE64URL(payload)))`",
    "",
    "- **HMAC (HS256):** `HMAC-SHA256(secret, input)`. Bir xil sir bilan imzolanadi va tekshiriladi.",
    "- **RSA (RS256):** RSASSA-PKCS1-v1_5 + SHA-256. Shaxsiy kalit bilan imzolash, ochiq kalit bilan tekshirish. **PS256** — RSA-PSS, zamonaviyroq padding.",
    "- **ECDSA (ES256):** P-256 egri chizig'i. Kichikroq kalit va imzo.",
    "- **EdDSA (Ed25519):** tez va xavfsiz, lekin hamma kutubxona qo'llamaydi.",
    "",
    "Tafsilotlar 22.5 da.",
    "",
    "### Kanonik shakl yo'q",
    "JSON'ni turli usullar bilan serializatsiya qilish mumkin (bo'shliqlar, kalitlar tartibi). Shuning uchun imzo **kodlangan satr** ustidan olinadi, JSON ma'nosi ustidan emas. Tekshiruvchi kelgan satrni o'zgartirmasdan imzoni tekshiradi, keyin dekodlaydi. Token'ni dekodlab, qayta kodlab, keyin tekshirish noto'g'ri.",
    "",
    "### Unsecured JWT",
    "`alg: none` — imzosiz JWT (`header.payload.`). Standartda bor, lekin xavfsizlik konteksti uchun **hech qachon** qabul qilinmasligi kerak."
  ],
  "examples": [
    {
      "title": "HS256 imzoni qo'lda hisoblash (tushunish uchun)",
      "lang": "php",
      "code": [
        "$b64 = fn (string $x) => rtrim(strtr(base64_encode($x), '+/', '-_'), '=');",
        "",
        "$header = $b64(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));",
        "$payload = $b64(json_encode(['sub' => '42', 'exp' => time() + 900]));",
        "$signature = $b64(hash_hmac('sha256', \"{$header}.{$payload}\", $secret, true));",
        "",
        "$jwt = \"{$header}.{$payload}.{$signature}\";",
        "",
        "// Tekshirish: satr ustidan qayta hisoblab, vaqt bo'yicha xavfsiz solishtirish",
        "[$h, $p, $s] = explode('.', $jwt);",
        "$valid = hash_equals($b64(hash_hmac('sha256', \"{$h}.{$p}\", $secret, true)), $s);"
      ],
      "note": "Production'da imzolashni o'zingiz yozmang, `firebase/php-jwt` yoki `lcobucci/jwt` ishlating. Bu faqat mexanizmni ko'rsatish uchun."
    },
    {
      "title": "Xavfli header'lar",
      "lang": "json",
      "code": [
        "{",
        "  \"alg\": \"RS256\",",
        "  \"kid\": \"attacker-key\",",
        "  \"jku\": \"https://evil.example/jwks.json\"",
        "}",
        "",
        "// Tekshiruvchi jku/x5u/jwk ni e'tiborsiz qoldirib,",
        "// faqat sozlangan JWKS'dagi kid'larni qabul qilishi kerak."
      ]
    }
  ],
  "pitfalls": [
    "Header'dagi `jku`, `x5u` yoki `jwk` dan kalitni yuklab tekshirish: hujumchi o'z kaliti bilan imzolaydi.",
    "`kid` ni fayl yo'li yoki SQL so'rovida to'g'ridan-to'g'ri ishlatish: path traversal va SQL injection holatlari ma'lum.",
    "Imzoni `==` bilan solishtirish: `hash_equals()` kerak.",
    "Token'ni dekodlab qayta kodlagandan keyin imzoni tekshirish."
  ]
});
