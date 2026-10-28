/* Chuqur dars: 21.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.9", {
  "lesson": [
    "### Revocation endpoint (RFC 7009)",
    "Client token'ni endi kerak emasligini AS'ga bildirishi uchun standart endpoint:",
    "`POST /oauth/revoke` + `token=...&token_type_hint=refresh_token` + client autentifikatsiyasi.",
    "",
    "Xususiyatlari:",
    "- Javob **doim `200`**, token mavjud bo'lmasa yoki allaqachon bekor qilingan bo'lsa ham. Bu hujumchiga token'lar haqida ma'lumot bermaydi va idempotent.",
    "- `token_type_hint` (`access_token` yoki `refresh_token`) AS'ga qidiruvni tezlashtirishga yordam beradi, lekin majburiy emas.",
    "- Client faqat **o'ziga** berilgan token'larni bekor qila oladi.",
    "",
    "### Nima bekor qilinadi",
    "- **Refresh token** bekor qilinsa, AS odatda shu grant bilan bog'liq **access token'larni ham** bekor qiladi (RFC tavsiya qiladi).",
    "- **Access token** bekor qilinsa, refresh token'ni bekor qilish ixtiyoriy.",
    "",
    "Logout'da **refresh token**ni bekor qilish muhimroq: u uzoq yashaydi.",
    "",
    "### Bekor qilish qachon kerak",
    "- Foydalanuvchi client ilovasidan chiqdi (logout).",
    "- Foydalanuvchi ilovani o'chirdi yoki akkauntni uzdi.",
    "- Client token sizganini aniqladi.",
    "- AS tomonda: foydalanuvchi \"Ulangan ilovalar\" dan ruxsatni olib tashladi (21.8), parol o'zgardi, akkaunt bloklandi, admin client'ni o'chirdi.",
    "",
    "### Resource server bekor qilishni qanday biladi",
    "Bu muhim nuqta:",
    "- **Opaque token + introspection** (21.10): RS har safar AS'dan so'raydi va bekor qilingan token darhol `active: false`.",
    "- **JWT (self-contained):** RS token'ni lokal tekshiradi va AS'dagi bekor qilishni **bilmaydi**. Token `exp` gacha ishlayveradi. Shuning uchun JWT access token'lar qisqa muddatli bo'lishi kerak (21.6). Kerak bo'lsa: denylist (`jti`), AS'dan bekor qilish event'larini push qilish yoki muhim endpoint'larda introspection.",
    "- **Passport:** access token'lar JWT, lekin Passport'ning `auth:api` guard'i har so'rovda `oauth_access_tokens` jadvalidagi `revoked` ustunini ham tekshiradi. Shuning uchun Passport'ning o'zida bekor qilish darhol ta'sir qiladi. Boshqa servis Passport JWT'larini faqat ochiq kalit bilan tekshirsa, bekor qilishni ko'rmaydi.",
    "",
    "### Client tomonida logout tartibi",
    "1. Refresh token'ni (va access token'ni) `/revoke` ga yuborish.",
    "2. Lokal saqlangan token'larni o'chirish.",
    "3. Lokal session'ni yopish.",
    "4. OIDC bo'lsa, ixtiyoriy RP-initiated logout (`end_session_endpoint`) bilan AS session'ini ham yopish."
  ],
  "examples": [
    {
      "title": "Revoke so'rovi",
      "lang": "http",
      "code": [
        "POST /oauth/revoke HTTP/1.1",
        "Host: auth.example.uz",
        "Content-Type: application/x-www-form-urlencoded",
        "Authorization: Basic aGlzb2JjaGk6c2VjcmV0",
        "",
        "token=def5020...&token_type_hint=refresh_token",
        "",
        "HTTP/1.1 200 OK"
      ]
    },
    {
      "title": "Passport'da bekor qilish",
      "lang": "php",
      "code": [
        "use Laravel\\Passport\\RefreshTokenRepository;",
        "use Laravel\\Passport\\TokenRepository;",
        "",
        "// Joriy access token va unga bog'liq refresh token'larni bekor qilish (logout)",
        "public function logout(Request $request, TokenRepository $tokens, RefreshTokenRepository $refresh)",
        "{",
        "    $tokenId = $request->user()->token()->id;",
        "",
        "    $tokens->revokeAccessToken($tokenId);",
        "    $refresh->revokeRefreshTokensByAccessTokenId($tokenId);",
        "",
        "    return response()->noContent();",
        "}",
        "",
        "// Parol o'zgarganda: foydalanuvchining barcha token'lari",
        "$user->tokens->each(function ($token) use ($refresh) {",
        "    $token->revoke();",
        "    $refresh->revokeRefreshTokensByAccessTokenId($token->id);",
        "});"
      ],
      "note": "Passport standart RFC 7009 `/oauth/revoke` endpoint'ini default'da bermaydi. Uchinchi tomon client'lari uchun uni o'zingiz qo'shishingiz kerak bo'lishi mumkin."
    }
  ],
  "pitfalls": [
    "Logout'da faqat access token'ni bekor qilib, refresh token'ni qoldirish.",
    "JWT access token bekor qilinganda RS'lar ham darhol bilib oladi deb hisoblash.",
    "Revoke endpoint'ida token yo'qligi uchun `404` qaytarish: token haqida ma'lumot oshkor bo'ladi.",
    "Client boshqa client'larning token'larini bekor qila olishi."
  ]
});
