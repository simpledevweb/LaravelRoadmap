/* Chuqur dars: 22.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.6", {
  "lesson": [
    "### Nega `exp` eng muhim claim'lardan biri",
    "JWT self-contained: tekshiruvchi uni DB'siz qabul qiladi. Agar token'da muddat bo'lmasa yoki u juda uzoq bo'lsa, sizib chiqqan token **abadiy** yoki juda uzoq ishlaydi va uni bekor qilishning oddiy yo'li yo'q (22.11). Shuning uchun JWT xavfsizligining asosiy vositasi — **qisqa muddat**.",
    "",
    "### Vaqt claim'lari",
    "- `exp`: shu vaqtdan keyin rad etiladi. **Majburiy** deb hisoblang: `exp` siz token'ni ham rad eting.",
    "- `nbf`: shu vaqtdan oldin rad etiladi. Kelajakdagi muddat uchun yoki soat farqi muammolarini aniqlash uchun.",
    "- `iat`: berilgan vaqt. Tekshiruvchi \"juda eski\" token'larni (masalan, `iat` 24 soatdan eski) yoki kelajakdan kelgan token'larni rad etishi mumkin. `iat` va foydalanuvchining `tokens_valid_after` ustunini solishtirib, parol o'zgarishidan oldingi token'larni bekor qilish mumkin.",
    "",
    "### Soat farqi (clock skew) va leeway",
    "Issuer va tekshiruvchi serverlarining soatlari bir necha soniya farq qilishi mumkin. Kichik **leeway** (30–60 soniya) qabul qilinadi: `now - leeway < exp`. Katta leeway (minutlar) muddatni amalda uzaytiradi. Serverlarda NTP (chrony) majburiy.",
    "",
    "### Odatiy muddatlar",
    "- Access token: 5–15 daqiqa (yuqori xavf), 15–60 daqiqa (oddiy).",
    "- ID token: daqiqalar, faqat login paytida ishlatiladi.",
    "- Servislar o'rtasidagi ichki token: 1–5 daqiqa.",
    "- Bir martalik havola (email tasdiqlash, parolni tiklash): 15–60 daqiqa + `jti` bir martalik.",
    "- \"Uzoq muddatli JWT\" (kunlar, oylar) — anti-pattern. Uzoq sessiya uchun refresh token (22.10).",
    "",
    "### Muddat va UX",
    "Qisqa access token foydalanuvchini tez-tez chiqarib yubormasligi kerak: client muddati tugashidan oldin refresh qiladi (21.6). Foydalanuvchi uchun sessiya refresh token muddatiga teng, access token esa ichki detal.",
    "",
    "### Tekshiruv joyi",
    "Yaxshi kutubxonalar `exp`, `nbf`, `iat` ni avtomatik tekshiradi (`firebase/php-jwt` `ExpiredException`, `BeforeValidException`). `lcobucci/jwt` da esa ularni **o'zingiz constraint sifatida qo'shishingiz** kerak (`LooseValidAt` yoki `StrictValidAt`), aks holda muddati o'tgan token ham o'tadi. Kutubxonangiz nimani avtomatik tekshirishini aniq biling.",
    "",
    "### Javob",
    "Muddati o'tgan token → `401` + `WWW-Authenticate: Bearer error=\"invalid_token\", error_description=\"The token expired\"`. Client bunga qarab refresh qiladi."
  ],
  "examples": [
    {
      "title": "lcobucci/jwt: muddatni aniq tekshirish",
      "lang": "php",
      "code": [
        "use Lcobucci\\Clock\\SystemClock;",
        "use Lcobucci\\JWT\\Validation\\Constraint\\StrictValidAt;",
        "use Lcobucci\\JWT\\Validation\\Constraint\\SignedWith;",
        "use Lcobucci\\JWT\\Validation\\Constraint\\IssuedBy;",
        "use Lcobucci\\JWT\\Validation\\Constraint\\PermittedFor;",
        "",
        "$token = $config->parser()->parse($jwt);",
        "",
        "$config->validator()->assert($token,",
        "    new SignedWith($config->signer(), $config->verificationKey()),",
        "    new IssuedBy('https://auth.example.uz'),",
        "    new PermittedFor('https://api.example.uz'),",
        "    new StrictValidAt(SystemClock::fromUTC(), new DateInterval('PT30S')),   // exp, nbf, iat + 30s leeway",
        ");"
      ],
      "note": "`StrictValidAt` `exp` claim'i bo'lishini ham talab qiladi. `LooseValidAt` esa `exp` bo'lmasa o'tkazib yuboradi."
    },
    {
      "title": "Parol o'zgarishidan oldingi token'larni rad etish",
      "lang": "php",
      "code": [
        "$user = User::where('public_id', $claims->sub)->firstOrFail();",
        "",
        "if ($user->tokens_valid_after && $claims->iat < $user->tokens_valid_after->getTimestamp()) {",
        "    abort(401, 'Token bekor qilingan');",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`exp` siz yoki bir necha oylik JWT berish.",
    "`lcobucci/jwt` da `ValidAt` constraint'ini qo'shishni unutish: muddat tekshirilmaydi.",
    "Katta leeway (5–10 daqiqa) bilan muddatni amalda uzaytirish.",
    "Serverlarda NTP sozlanmagan: token'lar tasodifiy rad etiladi yoki muddatdan keyin qabul qilinadi."
  ]
});
