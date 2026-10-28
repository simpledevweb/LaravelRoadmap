/* Chuqur dars: 21.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.3", {
  "lesson": [
    "### Qaysi hujumdan himoya",
    "**Authorization code interception.** Mobil ilovada `redirect_uri` maxsus sxema bo'lishi mumkin: `uz.hisobchi.app://callback`. Qurilmadagi boshqa (zararli) ilova ham xuddi shu sxemani ro'yxatdan o'tkazib, code'ni ushlab olishi mumkin. Public client'da `client_secret` yo'q, shuning uchun ushlangan code bilan hujumchi bemalol token oladi. Xuddi shunday, code brauzer tarixi, proxy log'lari yoki noto'g'ri sozlangan redirect orqali sizishi mumkin.",
    "",
    "**PKCE** (Proof Key for Code Exchange, RFC 7636, \"piksi\" deb o'qiladi) bu muammoni hal qiladi: code'ni almashtirish uchun faqat flow'ni **boshlagan** client biladigan sir kerak.",
    "",
    "### Mexanizm",
    "1. Client har flow uchun yangi kriptografik tasodifiy **`code_verifier`** yaratadi: 43–128 belgi, `[A-Za-z0-9-._~]`.",
    "2. Undan **`code_challenge`** hisoblaydi: `BASE64URL(SHA256(code_verifier))`.",
    "3. `/authorize` so'roviga `code_challenge` va `code_challenge_method=S256` qo'shiladi. AS ularni code bilan birga eslab qoladi.",
    "4. `/token` so'roviga asl `code_verifier` yuboriladi.",
    "5. AS `SHA256(code_verifier)` ni hisoblab, saqlangan `code_challenge` bilan solishtiradi. Mos kelmasa — rad.",
    "",
    "Hujumchi code'ni ushlasa ham, `code_verifier` ni bilmaydi: u faqat client xotirasida va front channel orqali hech qachon o'tmagan. Hash'dan asl qiymatni tiklab bo'lmaydi.",
    "",
    "### `plain` usuli",
    "RFC `code_challenge_method=plain` ni ham ruxsat beradi (challenge = verifier). U himoya bermaydi, chunki challenge front channel'da ochiq. **Faqat `S256`** ishlating va AS'da `plain` ni o'chiring.",
    "",
    "### Kimga kerak",
    "- Dastlab public client'lar (mobil, SPA) uchun yaratilgan.",
    "- **OAuth 2.1 va Security BCP (RFC 9700):** barcha client'lar, confidential ham, PKCE ishlatishi kerak. U `client_secret` ga qo'shimcha ravishda code injection hujumlaridan ham himoya qiladi.",
    "",
    "### PKCE nima qilmaydi",
    "- `state` ni almashtirmaydi (garchi PKCE CSRF'ning bir qismini ham qamrasa ham). Ikkalasini birga ishlating.",
    "- Zararli ilova butun flow'ni o'zi boshlasa (o'z verifier'i bilan), himoya qilmaydi. Bunga qarshi: claimed HTTPS redirect'lar (iOS Universal Links, Android App Links) maxsus sxemalardan afzal.",
    "",
    "### Laravel'da",
    "- **Passport:** public client'lar uchun PKCE avtomatik talab qilinadi (`passport:client --public`).",
    "- **Socialite:** `Socialite::driver('google')->enablePKCE()->redirect()`."
  ],
  "examples": [
    {
      "title": "Verifier va challenge (PHP)",
      "lang": "php",
      "code": [
        "function base64url(string $bin): string",
        "{",
        "    return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');",
        "}",
        "",
        "$verifier = base64url(random_bytes(32));                 // 43 belgi",
        "$challenge = base64url(hash('sha256', $verifier, true));",
        "",
        "// /authorize: code_challenge=$challenge&code_challenge_method=S256",
        "// /token:     code_verifier=$verifier",
        "",
        "// AS tomonida tekshiruv",
        "$ok = hash_equals($storedChallenge, base64url(hash('sha256', $receivedVerifier, true)));"
      ]
    },
    {
      "title": "Brauzerda (SPA yoki BFF'siz mobil web)",
      "lang": "javascript",
      "code": [
        "const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)))",
        "  .replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');",
        "",
        "const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)));",
        "const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));",
        "",
        "sessionStorage.setItem('pkce_verifier', verifier);",
        "location.href = `https://auth.example.uz/oauth/authorize?response_type=code&client_id=spa`",
        "  + `&redirect_uri=${encodeURIComponent(location.origin + '/callback')}`",
        "  + `&code_challenge=${challenge}&code_challenge_method=S256&state=${crypto.randomUUID()}`;"
      ],
      "note": "`state` ham saqlanishi va callback'da tekshirilishi kerak. Bu namunada qisqalik uchun ko'rsatilmagan."
    }
  ],
  "pitfalls": [
    "`code_challenge_method=plain` ishlatish yoki AS'da unga ruxsat berish.",
    "Bir `code_verifier` ni bir nechta flow uchun qayta ishlatish.",
    "PKCE bor deb `state` tekshiruvidan voz kechish.",
    "Confidential client uchun PKCE kerak emas deb hisoblash: OAuth 2.1 hamma uchun talab qiladi."
  ]
});
