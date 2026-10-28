/* Chuqur dars: 21.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.1", {
  "lesson": [
    "### To'rt rol",
    "OAuth 2.0 (RFC 6749) har bir ishtirokchining vazifasini aniq ajratadi. Rollarni tushunish butun protokolni tushunishning kaliti: har bir xavfsizlik qoidasi \"kim nimani biladi va kimga ishonadi\" degan savoldan kelib chiqadi.",
    "",
    "**1. Resource Owner (resurs egasi).** Odatda oxirgi foydalanuvchi. Ma'lumot (buyurtmalar, fayllar, kontaktlar) uniki va u ruxsat beradi yoki rad etadi. Parolini faqat authorization server'ga kiritadi, client'ga hech qachon.",
    "",
    "**2. Client.** Foydalanuvchi nomidan resursga kirmoqchi bo'lgan ilova: web ilova, SPA, mobil ilova, CLI, boshqa servis. \"Client\" — brauzer emas, **ilova**. Ikki turi bor:",
    "- **Confidential client:** sirni (`client_secret`) xavfsiz saqlay oladi. Server tomonida ishlaydigan web ilova (Laravel backend), server-server servis.",
    "- **Public client:** sirni saqlay olmaydi, chunki kodi foydalanuvchi qurilmasida: SPA (JS bundle o'qiladi), mobil ilova (dekompilyatsiya qilinadi), desktop ilova. Ular uchun `client_secret` ma'nosiz. Himoya **PKCE** (21.3) orqali.",
    "",
    "**3. Authorization Server (AS).** Foydalanuvchini autentifikatsiya qiladi, rozilik so'raydi va token beradi. Endpoint'lari: `/authorize` (brauzer orqali, foydalanuvchi bilan), `/token` (backend orqali, client bilan), ixtiyoriy `/revoke`, `/introspect`, `/.well-known/openid-configuration`, JWKS. Misollar: Laravel Passport, Keycloak, Auth0, Okta, Google, OneID.",
    "",
    "**4. Resource Server (RS).** Himoyalangan API. Access token'ni qabul qiladi, uni tekshiradi (imzo yoki introspection, 21.10), scope va foydalanuvchini aniqlaydi va javob beradi. Sizning Laravel API'ngiz.",
    "",
    "### AS va RS birga yoki alohida",
    "Kichik tizimda AS va RS bitta Laravel ilovasida (Passport). Katta tizimda AS alohida (Keycloak), RS'lar esa ko'p mikroservislar va har biri token'ni mustaqil tekshiradi. Bu holatda RS'lar AS'ning ochiq kalitlarini (JWKS) biladi va `aud` claim orqali token aynan o'zi uchun ekanini tekshiradi (20.7).",
    "",
    "### Ishonch chegaralari",
    "- Foydalanuvchi parolini faqat AS ko'radi.",
    "- Client faqat token'ni ko'radi (va uni RS'ga beradi).",
    "- RS faqat token'ni ko'radi va AS'ga ishonadi.",
    "- **Front channel** (brauzer redirect'lari, URL) ishonchsiz: ushlanishi mumkin. Shuning uchun u yerda faqat qisqa muddatli `code` o'tadi.",
    "- **Back channel** (client backend → AS `/token`, TLS) ishonchliroq: u yerda token'lar beriladi."
  ],
  "examples": [
    {
      "title": "Rollar misolda",
      "lang": "text",
      "code": [
        "Resource Owner     Ali (foydalanuvchi)",
        "Client             'Hisobchi' web ilovasi (confidential) yoki uning mobil versiyasi (public)",
        "Authorization Srv  auth.bank.uz (Passport yoki Keycloak)",
        "Resource Server    api.bank.uz/v1/transactions",
        "",
        "Ali  --(login + rozilik)-->  auth.bank.uz",
        "auth.bank.uz  --(code, front channel)-->  Hisobchi",
        "Hisobchi backend  --(code + secret/PKCE, back channel)-->  auth.bank.uz/token",
        "Hisobchi  --(Bearer access_token)-->  api.bank.uz"
      ]
    },
    {
      "title": "Passport'da client turlari",
      "lang": "bash",
      "code": [
        "# Confidential: server tomonidagi web ilova (secret bilan)",
        "php artisan passport:client --name=\"Hisobchi web\" --redirect_uri=\"https://hisobchi.uz/callback\"",
        "",
        "# Public: SPA yoki mobil (secret yo'q, PKCE majburiy)",
        "php artisan passport:client --public --name=\"Hisobchi mobile\" --redirect_uri=\"uz.hisobchi.app://callback\""
      ],
      "note": "Opsiyalar Passport versiyasiga qarab farq qilishi mumkin: `php artisan passport:client --help`."
    }
  ],
  "pitfalls": [
    "SPA yoki mobil ilovaga `client_secret` joylashtirish: u sir bo'lib qolmaydi.",
    "Foydalanuvchi parolini client'ga kiritishga majburlash (password grant): OAuth maqsadiga zid.",
    "Front channel (URL, redirect) orqali token uzatish: log va tarixda qoladi.",
    "Bir nechta RS bo'lganda `aud` ni tekshirmaslik: bir API uchun berilgan token boshqasida ham ishlaydi."
  ]
});
