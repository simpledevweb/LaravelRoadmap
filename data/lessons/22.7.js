/* Chuqur dars: 22.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.7", {
  "lesson": [
    "### Imzo yetmaydi",
    "Imzo \"bu token'ni kalit egasi bergan va u o'zgartirilmagan\" deydi. Lekin u ikkita muhim savolga javob bermaydi:",
    "1. **Kim bergan?** Siz ishonadigan issuer'mi?",
    "2. **Kimga berilgan?** Aynan sizning servisingizga mo'ljallanganmi?",
    "",
    "### `iss` tekshiruvi",
    "`iss` kutilgan issuer identifikatoriga **aniq** teng bo'lishi kerak: `https://auth.example.uz`. Oxiridagi `/` ham farq qiladi.",
    "",
    "Muhimligi: bir nechta issuer'ni qabul qiluvchi tizimda (masalan, Google va Microsoft login) har issuer'ning **o'z** kalitlari bor. Tekshiruvchi `iss` ga qarab tegishli JWKS'ni tanlashi va boshqa issuer kalitlarini qabul qilmasligi kerak. Multi-tenant IdP'larda (Azure AD, Auth0) issuer tenant'ni ham o'z ichiga oladi: `https://login.microsoftonline.com/{tenant}/v2.0`. Faqat o'z tenant'ingiz issuer'ini qabul qiling, aks holda **boshqa tashkilot** foydalanuvchilari ham kiradi.",
    "",
    "### `aud` tekshiruvi",
    "`aud` — token kimga mo'ljallangan. String yoki massiv bo'lishi mumkin. Tekshiruvchi o'z identifikatori (`https://api.example.uz` yoki `orders-api`) **ichida** borligini tekshiradi.",
    "",
    "Nega shart: bitta AS ko'p servislarga token beradi va hammasi bir xil kalit bilan imzolanadi.",
    "- `reports-api` uchun berilgan token `payments-api` ga yuborilsa, imzo to'g'ri, `iss` to'g'ri. Faqat `aud` uni to'xtatadi.",
    "- Zararli yoki buzilgan servis o'ziga kelgan token'lar bilan boshqa servislarga murojaat qila olmasligi kerak (token replay).",
    "- OIDC'da: ID token `aud` = client_id. Boshqa ilova uchun berilgan ID token sizning ilovangizga login uchun berilsa (21.14), `aud` uni rad etadi.",
    "",
    "### `azp`",
    "OIDC'da `aud` bir nechta qiymatli bo'lsa, `azp` (authorized party) token'ni olgan client'ni bildiradi va u ham tekshirilishi kerak.",
    "",
    "### Resurs indikatorlari",
    "OAuth client token so'raganda `resource=https://api.example.uz` parametri (RFC 8707) bilan qaysi API uchun token kerakligini aytadi. AS shunga mos `aud` yozadi. Har API uchun alohida, tor auditoriyali token'lar — eng kam huquq tamoyili.",
    "",
    "### Kutubxonalarda",
    "- `firebase/php-jwt`: `iss` va `aud` ni **avtomatik tekshirmaydi**. Dekodlangandan keyin o'zingiz tekshirasiz.",
    "- `lcobucci/jwt`: `IssuedBy` va `PermittedFor` constraint'larini qo'shasiz.",
    "- `web-token/jwt-framework`: claim checker'lar.",
    "",
    "Har holda: tekshiruvni bitta markaziy servis yoki guard'da yozing, har controller'da emas."
  ],
  "examples": [
    {
      "title": "firebase/php-jwt bilan to'liq tekshiruv",
      "lang": "php",
      "code": [
        "$claims = JWT::decode($jwt, JWK::parseKeySet($jwks, 'RS256'));   // imzo, exp, nbf, iat",
        "",
        "if (($claims->iss ?? null) !== 'https://auth.example.uz') {",
        "    throw new AuthenticationException('Noto\\'g\\'ri issuer');",
        "}",
        "",
        "$aud = (array) ($claims->aud ?? []);",
        "if (! in_array('https://api.example.uz', $aud, true)) {",
        "    throw new AuthenticationException('Token bu API uchun emas');",
        "}",
        "",
        "if (count($aud) > 1 && ($claims->azp ?? null) !== config('services.auth.client_id')) {",
        "    throw new AuthenticationException('azp mos emas');",
        "}"
      ]
    },
    {
      "title": "Bir nechta issuer: har biriga o'z kalitlari",
      "lang": "php",
      "code": [
        "$issuers = [",
        "    'https://accounts.google.com' => 'https://www.googleapis.com/oauth2/v3/certs',",
        "    'https://login.microsoftonline.com/' . config('services.azure.tenant') . '/v2.0'",
        "        => 'https://login.microsoftonline.com/' . config('services.azure.tenant') . '/discovery/v2.0/keys',",
        "];",
        "",
        "// iss'ni imzosiz o'qib, faqat kalit TANLASH uchun ishlatamiz",
        "$unverifiedIss = json_decode(base64_decode(strtr(explode('.', $jwt)[1], '-_', '+/')))->iss ?? null;",
        "abort_unless(isset($issuers[$unverifiedIss]), 401);",
        "",
        "$jwks = Cache::remember('jwks:' . md5($unverifiedIss), 3600, fn () => Http::get($issuers[$unverifiedIss])->json());",
        "$claims = JWT::decode($jwt, JWK::parseKeySet($jwks, 'RS256'));",
        "",
        "abort_unless($claims->iss === $unverifiedIss, 401);   // imzolangan qiymat bilan qayta tekshirish"
      ]
    }
  ],
  "pitfalls": [
    "`firebase/php-jwt` `iss` va `aud` ni o'zi tekshiradi deb o'ylash.",
    "Bir AS'ning barcha servislar uchun token'larini `aud` siz qabul qilish: token replay.",
    "Multi-tenant IdP'da istalgan tenant issuer'ini qabul qilish.",
    "`iss` ni prefiks yoki `str_contains` bilan tekshirish."
  ]
});
