/* Chuqur dars: 22.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.5", {
  "lesson": [
    "### Ikki oila",
    "**Simmetrik (HMAC): HS256, HS384, HS512.** Bitta umumiy sir bilan imzolanadi va tekshiriladi.",
    "- Tez va sodda.",
    "- Har tekshiruvchi sirni bilishi kerak, demak har tekshiruvchi token **yasay** ham oladi.",
    "- Mos keladi: token'ni bitta ilova o'zi beradi va o'zi tekshiradi (bitta Laravel monolit).",
    "- Sir kamida 256 bit (32 bayt) kriptografik tasodifiy. `secret`, `password123` yoki `APP_NAME` emas: zaif HMAC sirlari offline brute-force bilan topiladi (hashcat).",
    "",
    "**Asimmetrik: RS256/PS256 (RSA), ES256/ES384 (ECDSA), EdDSA (Ed25519).** Shaxsiy kalit bilan imzolanadi, ochiq kalit bilan tekshiriladi.",
    "- Faqat issuer token yasay oladi. Tekshiruvchilar (mikroservislar, tashqi hamkorlar) faqat ochiq kalitni oladi va u sir emas.",
    "- Ochiq kalitlar **JWKS** endpoint'ida e'lon qilinadi va rotatsiya oson (22.9).",
    "- Mos keladi: alohida AS, ko'p resource server'lar, tashqi tekshiruvchilar, OIDC.",
    "",
    "### Algoritmlarni solishtirish",
    "| Alg | Kalit | Imzo hajmi | Izoh |",
    "|---|---|---|---|",
    "| HS256 | 256+ bit sir | 32 bayt | eng tez, umumiy sir |",
    "| RS256 | RSA 2048+ (3072 tavsiya) | 256+ bayt | eng keng qo'llanadi |",
    "| PS256 | RSA 2048+ | 256+ bayt | RSA-PSS, zamonaviy padding |",
    "| ES256 | P-256 | 64 bayt | kichik, tez imzolash |",
    "| EdDSA | Ed25519 | 64 bayt | tez, xatolarga chidamli, lekin kutubxona qo'llovi kamroq |",
    "",
    "### Tanlov",
    "- Bitta ilova o'zi uchun: **HS256** kuchli sir bilan yoki asimmetrik.",
    "- Bir nechta servis yoki tashqi tekshiruvchi: **RS256** (maksimal moslik) yoki **ES256**/**EdDSA** (zamonaviy).",
    "- FAPI kabi qat'iy profillar: PS256, ES256 yoki EdDSA. RS256 ruxsat etilmaydi.",
    "- `none`: hech qachon.",
    "",
    "### Algoritmni qotirish",
    "Eng muhim qoida: tekshiruvchi qaysi algoritmni kutishini **o'zi biladi** va token header'idagi `alg` ga tayanmaydi. Har kalit o'z algoritmi bilan bog'langan bo'ladi (JWK'dagi `alg` yoki konfiguratsiya). Aks holda algorithm confusion (22.14).",
    "",
    "### Kalit saqlash",
    "- Shaxsiy kalit va HMAC sir: secret manager, KMS yoki HSM. Ideal holda imzolash KMS ichida (kalit hech qachon ilova xotirasiga chiqmaydi): AWS KMS, Google Cloud KMS, Vault Transit.",
    "- Git'da emas, log'larda emas.",
    "- Rotatsiya rejasi (22.9)."
  ],
  "examples": [
    {
      "title": "Kalit generatsiyasi",
      "lang": "bash",
      "code": [
        "# HS256 sir (32 bayt)",
        "openssl rand -base64 32",
        "",
        "# RS256 (3072 bit)",
        "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out jwt-private.pem",
        "openssl pkey -in jwt-private.pem -pubout -out jwt-public.pem",
        "",
        "# ES256 (P-256)",
        "openssl ecparam -name prime256v1 -genkey -noout -out es256-private.pem",
        "openssl ec -in es256-private.pem -pubout -out es256-public.pem"
      ]
    },
    {
      "title": "firebase/php-jwt: algoritm kalitga bog'langan",
      "lang": "php",
      "code": [
        "use Firebase\\JWT\\JWT;",
        "use Firebase\\JWT\\Key;",
        "",
        "// Imzolash",
        "$jwt = JWT::encode($payload, file_get_contents(storage_path('jwt-private.pem')), 'RS256', '2025-06');",
        "",
        "// Tekshirish: Key obyekti algoritmni qotiradi, header'dagi alg'ga ishonilmaydi",
        "$claims = JWT::decode($jwt, new Key(file_get_contents(storage_path('jwt-public.pem')), 'RS256'));"
      ],
      "note": "firebase/php-jwt v6+ da `Key` obyekti majburiy. Bu algorithm confusion hujumini oldini olish uchun qilingan."
    }
  ],
  "pitfalls": [
    "Zaif HMAC sir: token'lar offline buziladi va hujumchi o'zi token yasaydi.",
    "Ko'p servisga HMAC sirini tarqatish: har biri token yasay oladi.",
    "Tekshiruvda header'dagi `alg` ga tayanish.",
    "2048 bitdan kichik RSA kalitlari."
  ]
});
