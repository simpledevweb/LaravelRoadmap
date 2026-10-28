/* Chuqur dars: 22.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.12", {
  "lesson": [
    "### JWT bearer token",
    "JWT odatda bearer token (20.5): kim qo'lida bo'lsa, o'sha ishlatadi. Imzo uni o'zgartirishdan himoya qiladi, lekin **o'g'irlashdan** emas. Saqlash joyi — xavfsizlikning hal qiluvchi qismi. Umumiy qoidalar 20.20 da. JWT'ga xos jihatlar:",
    "",
    "### Brauzer variantlari",
    "**1. `localStorage` / `sessionStorage`.** Eng ko'p uchraydigan va eng xavfli. Saytdagi har qanday XSS (zaif npm paket, uchinchi tomon skripti, foydalanuvchi kontenti) token'ni o'qib, hujumchi serveriga yuboradi. Hujumchi keyin uni o'z kompyuteridan muddati tugaguncha ishlatadi.",
    "",
    "**2. JavaScript xotirasi (o'zgaruvchi).** XSS'da ham o'qilishi mumkin, lekin faqat sahifa ochiq paytda va yashirinroq. Sahifa yangilanganda yo'qoladi va refresh orqali qayta olinadi (refresh token `HttpOnly` cookie'da). Brauzerda to'g'ridan-to'g'ri JWT kerak bo'lsa, eng yaxshi kompromiss.",
    "",
    "**3. `HttpOnly` cookie.** JavaScript o'qiy olmaydi va XSS token'ni **chiqarib ololmaydi** (lekin sahifa ichidan so'rovlar yubora oladi). Brauzer avtomatik yuboradi, shuning uchun **CSRF** himoyasi kerak: `SameSite=Lax/Strict` + CSRF token yoki maxsus header tekshiruvi. Cookie 4 KB chegarasi — katta JWT sig'masligi mumkin.",
    "",
    "**4. BFF (21.2).** Brauzer JWT'ni umuman ko'rmaydi: u server tomonida, brauzer bilan oddiy session cookie. Hozirgi eng tavsiya etilgan arxitektura.",
    "",
    "Xulosa: \"JWT'ni `localStorage` ga qo'yish\" — ko'p tutorial'larda bor, lekin xavfsizlik nuqtai nazaridan eng zaif variant.",
    "",
    "### Mobil",
    "- iOS Keychain, Android Keystore yoki EncryptedSharedPreferences.",
    "- Access token xotirada, refresh token xavfsiz saqlovda.",
    "- Root yoki jailbreak qilingan qurilmalarni aniqlash (ixtiyoriy, yuqori xavfli ilovalar uchun).",
    "",
    "### Server-server",
    "Servis olgan JWT'ni xotirada, muddati bilan keshlaydi (21.4). Diskka yoki DB'ga yozmaydi. Boshqa servisga uzatishda (token propagation) faqat kerakli auditoriya uchun alohida token olish (token exchange, RFC 8693) afzal.",
    "",
    "### Hamma joyda",
    "- **Log'larga tushmasin:** `Authorization` header'i, URL'lar (token query'da bo'lmasin), xato hisobotlari, analitika.",
    "- **URL'da emas.** WebSocket ulanishi uchun ham: token'ni ulanishdan keyingi birinchi xabarda yoki qisqa muddatli bir martalik \"ticket\" orqali yuboring, `?token=` query'da emas.",
    "- **Ulashilmasin:** skrinshot, Postman kolleksiyasi, support chat.",
    "",
    "### XSS — asosiy dushman",
    "Qayerda saqlamang, XSS bo'lsa, hujumchi foydalanuvchi nomidan amal qila oladi. Saqlash joyi faqat token'ni **olib ketish**ni qiyinlashtiradi. Asosiy himoya: chiqishni escape qilish (Blade `{{ }}`), `Content-Security-Policy`, uchinchi tomon skriptlarini cheklash, bog'liqliklarni yangilab borish."
  ],
  "examples": [
    {
      "title": "Brauzer: access xotirada, refresh cookie'da",
      "lang": "javascript",
      "code": [
        "let accessToken = null;   // localStorage EMAS",
        "",
        "async function ensureToken() {",
        "  if (accessToken && !isExpiringSoon(accessToken)) return accessToken;",
        "  const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });",
        "  if (!res.ok) { location.href = '/login'; return null; }",
        "  ({ access_token: accessToken } = await res.json());",
        "  return accessToken;",
        "}",
        "",
        "export async function api(url, opts = {}) {",
        "  const token = await ensureToken();",
        "  return fetch(url, { ...opts, headers: { ...opts.headers, Authorization: `Bearer ${token}` } });",
        "}"
      ]
    },
    {
      "title": "WebSocket uchun bir martalik ticket",
      "lang": "php",
      "code": [
        "// Client avval oddiy API orqali ticket so'raydi",
        "Route::middleware('auth:jwt')->post('ws/ticket', function (Request $request) {",
        "    $ticket = Str::random(32);",
        "    Cache::put(\"ws:ticket:{$ticket}\", $request->user()->id, 30);   // 30 soniya, bir martalik",
        "    return ['ticket' => $ticket];",
        "});",
        "",
        "// WebSocket server: wss://ws.example.uz?ticket=... -> Cache::pull bilan tekshiradi",
        "// Uzoq muddatli JWT URL'ga va log'larga tushmaydi."
      ]
    }
  ],
  "pitfalls": [
    "JWT'ni `localStorage` da saqlash.",
    "`HttpOnly` cookie'ga o'tib, CSRF himoyasini unutish.",
    "WebSocket yoki fayl yuklab olish uchun token'ni URL query'ga qo'yish.",
    "Saqlash joyini o'zgartirib, XSS'ning o'zini oldini olishni e'tiborsiz qoldirish."
  ]
});
