/* Chuqur dars: 22.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.4", {
  "lesson": [
    "### Registered claim'lar (RFC 7519)",
    "| Claim | Ma'nosi | Tekshirish |",
    "|---|---|---|",
    "| `iss` | Issuer: token'ni kim bergan (URL) | kutilgan qiymatga **aniq** teng (22.7) |",
    "| `sub` | Subject: kim haqida (foydalanuvchi yoki client ID) | issuer doirasida noyob va barqaror |",
    "| `aud` | Audience: kimga mo'ljallangan (string yoki massiv) | o'z identifikatoringiz **ichida** bo'lishi (22.7) |",
    "| `exp` | Expiration: shu vaqtdan keyin yaroqsiz | `now < exp` (+ kichik leeway) |",
    "| `nbf` | Not Before: shu vaqtdan oldin yaroqsiz | `now >= nbf` (- leeway) |",
    "| `iat` | Issued At: berilgan vaqt | ixtiyoriy: juda eski yoki kelajakdagi token'ni rad etish |",
    "| `jti` | JWT ID: noyob identifikator | replay himoyasi, denylist (22.11) |",
    "",
    "Standart hech birini majburiy demaydi. Lekin xavfsizlik nuqtai nazaridan **`iss`, `aud`, `exp`** doim bo'lishi va tekshirilishi kerak. Qolganlari kontekstga qarab. `sub` — `iss` doirasidagi identifikator: turli issuer'larda bir xil `sub` turli odamlar bo'lishi mumkin, shuning uchun foydalanuvchini `iss + sub` juftligi bilan aniqlang.",
    "",
    "### Public claim'lar",
    "Keng tarqalganlari:",
    "- OAuth: `scope` (bo'shliq bilan ajratilgan satr), `client_id`, `cnf` (sender-constrained token kaliti), `act` (token exchange'da kim nomidan).",
    "- OIDC: `name`, `given_name`, `email`, `email_verified`, `phone_number`, `nonce`, `auth_time`, `acr`, `amr`, `azp`, `sid`.",
    "",
    "Agar mavjud standart claim mos kelsa, o'zingiz yangi nom o'ylab topmang: `user_email` emas, `email`.",
    "",
    "### Private (custom) claim'lar",
    "Loyihaga xos: `tenant_id`, `plan`, `roles`, `perms`, `ver` (token versiyasi, 20.14).",
    "",
    "Qoidalar:",
    "- **To'qnashuvdan qoching:** ro'yxatdan o'tgan nomlarni (`iss`, `scope`) boshqa ma'noda ishlatmang. Agar token'lar tashqi tizimlar bilan almashinsa, nomlarni namespace qiling: `https://example.uz/claims/tenant_id` yoki prefiks bilan.",
    "- **Minimal:** faqat har so'rovda kerak bo'ladigan (22.3).",
    "- **Maxfiy emas:** payload ochiq (22.13). Telefon, pasport, manzil, ichki IP'lar emas.",
    "- **Tur barqaror:** `roles` doim massiv bo'lsin, ba'zan satr emas.",
    "- **Hujjatlashtirilgan:** qaysi servis qaysi claim'ga tayanadi.",
    "",
    "### Turni farqlash",
    "Bir issuer turli maqsadlar uchun JWT bersa (access token, ID token, email tasdiqlash token'i), birini boshqasi o'rnida ishlatib bo'lmasligi kerak. Usullar: `typ` header'i (`at+jwt`), `aud` farqi yoki maxsus `token_use`/`purpose` claim. Aks holda \"parolni tiklash\" token'i API'ga access token sifatida o'tib ketishi mumkin."
  ],
  "examples": [
    {
      "title": "lcobucci/jwt bilan token yaratish",
      "lang": "php",
      "code": [
        "use Lcobucci\\JWT\\Configuration;",
        "use Lcobucci\\JWT\\Signer\\Rsa\\Sha256;",
        "use Lcobucci\\JWT\\Signer\\Key\\InMemory;",
        "",
        "$config = Configuration::forAsymmetricSigner(",
        "    new Sha256(),",
        "    InMemory::plainText(config('jwt.private_key')),",
        "    InMemory::plainText(config('jwt.public_key')),",
        ");",
        "",
        "$now = new DateTimeImmutable();",
        "",
        "$token = $config->builder()",
        "    ->issuedBy('https://auth.example.uz')",
        "    ->permittedFor('https://api.example.uz')",
        "    ->relatedTo($user->public_id)",
        "    ->identifiedBy((string) Str::uuid())",
        "    ->issuedAt($now)",
        "    ->canOnlyBeUsedAfter($now)",
        "    ->expiresAt($now->modify('+15 minutes'))",
        "    ->withHeader('kid', '2025-06')",
        "    ->withClaim('scope', 'orders:read')",
        "    ->withClaim('tenant_id', $user->tenant->public_id)",
        "    ->getToken($config->signer(), $config->signingKey());",
        "",
        "echo $token->toString();"
      ]
    },
    {
      "title": "Turli maqsadli token'larni ajratish",
      "lang": "json",
      "code": [
        "// Access token",
        "{ \"typ\": \"at+jwt\" }  .  { \"aud\": \"https://api.example.uz\", \"scope\": \"orders:read\", ... }",
        "",
        "// Parolni tiklash token'i",
        "{ \"typ\": \"JWT\" }     .  { \"aud\": \"password-reset\", \"purpose\": \"reset\", \"exp\": ..., ... }",
        "",
        "// API faqat typ=at+jwt va aud=https://api.example.uz ni qabul qiladi"
      ]
    }
  ],
  "pitfalls": [
    "`iss`, `aud`, `exp` siz token berish.",
    "Foydalanuvchini faqat `sub` bo'yicha aniqlash, bir nechta issuer bo'lganda.",
    "Standart claim nomlarini boshqa ma'noda ishlatish.",
    "Turli maqsadli token'larni farqlamaslik: biri boshqasi o'rnida qabul qilinadi."
  ]
});
