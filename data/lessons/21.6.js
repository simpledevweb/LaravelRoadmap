/* Chuqur dars: 21.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.6", {
  "lesson": [
    "### Murosa",
    "Access token muddati — xavfsizlik va qulaylik (hamda yuk) o'rtasidagi tanlov:",
    "- **Qisqa** (5–15 daqiqa): o'g'irlangan token tez yaroqsiz bo'ladi. JWT'ni bekor qilish muammosi (20.14) deyarli yo'qoladi: bekor qilingan foydalanuvchi ko'pi bilan bir necha daqiqa kira oladi. Huquq o'zgarishlari tez ta'sir qiladi. Lekin ko'proq refresh so'rovlari.",
    "- **Uzoq** (soatlar, kunlar): kam refresh, lekin sizgan token uzoq ishlaydi va huquqlar eskiradi.",
    "",
    "### Odatiy qiymatlar",
    "| Token | Muddat |",
    "|---|---|",
    "| Access token (foydalanuvchi, yuqori xavf: bank, admin) | 5–15 daqiqa |",
    "| Access token (oddiy ilova) | 15–60 daqiqa |",
    "| Access token (M2M, client credentials) | 15–60 daqiqa |",
    "| Authorization code | 1–10 daqiqa, bir martalik |",
    "| Refresh token | kunlar–haftalar, rotatsiya + absolyut chegara |",
    "| ID token (OIDC) | daqiqalar, faqat login paytida tekshiriladi |",
    "",
    "### Muddatni nima belgilaydi",
    "1. **Token turi.** Self-contained JWT (bekor qilish qiyin) — qisqaroq. Opaque + introspection (21.10) — uzoqroq bo'lishi mumkin, chunki har tekshiruvda holat so'raladi.",
    "2. **Ma'lumot sezgirligi.** Moliya va sog'liq — qisqa. Ommaviy kontent — uzoqroq.",
    "3. **Client turi.** Public client — qisqaroq.",
    "4. **Huquqlar tez o'zgarishi.** Rollar token ichida bo'lsa, muddat — huquq o'zgarishining maksimal kechikishi.",
    "",
    "### `expires_in` va soat farqi",
    "AS javobida `expires_in` (soniya). Client undan mutlaq muddatni hisoblaydi va **biroz oldinroq** yangilaydi (30–60 soniya zaxira), chunki tarmoq kechikishi va serverlar soati farq qiladi. Resource server JWT'ni tekshirganda kichik `leeway` (30–60 soniya) qabul qiladi (20.7).",
    "",
    "### Faollik bo'yicha uzaytirish",
    "Ba'zi tizimlar \"sliding\" sessiyalar ishlatadi: faol foydalanuvchi uchun refresh token muddati har refresh'da uzayadi, lekin **absolyut chegara** (masalan, 30 kun) bor. Undan keyin qayta login majburiy.",
    "",
    "### Passport'da",
    "- `Passport::tokensExpireIn(now()->addMinutes(30))` — access token.",
    "- `Passport::refreshTokensExpireIn(now()->addDays(14))`.",
    "- `Passport::personalAccessTokensExpireIn(now()->addMonths(3))`.",
    "",
    "Passport default'da access token'larga juda uzoq muddat (1 yil) beradi. Production'da albatta o'zgartiring."
  ],
  "examples": [
    {
      "title": "Passport muddatlari",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot()",
        "Passport::tokensExpireIn(now()->addMinutes(30));",
        "Passport::refreshTokensExpireIn(now()->addDays(14));",
        "Passport::personalAccessTokensExpireIn(now()->addMonths(3));"
      ]
    },
    {
      "title": "Client: zaxira bilan yangilash",
      "lang": "javascript",
      "code": [
        "function saveTokens(res) {",
        "  const skewMs = 60_000;   // 1 daqiqa oldin yangilash",
        "  state.accessToken = res.access_token;",
        "  state.expiresAt = Date.now() + res.expires_in * 1000 - skewMs;",
        "}",
        "",
        "async function getAccessToken() {",
        "  if (Date.now() < state.expiresAt) return state.accessToken;",
        "  await refresh();   // 20.15 dagi bitta umumiy refresh",
        "  return state.accessToken;",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Passport'ning default 1 yillik access token muddatini production'da qoldirish.",
    "Uzoq muddatli JWT ichiga rollar qo'yish: huquq olib tashlangandan keyin ham amal qiladi.",
    "Client token'ni aynan `expires_in` tugaganda yangilashi: soat farqi va kechikish tufayli 401'lar.",
    "Refresh token'ga absolyut muddat qo'ymaslik: rotatsiya bilan sessiya abadiy davom etadi."
  ]
});
