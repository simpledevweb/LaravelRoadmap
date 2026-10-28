/* Chuqur dars: 20.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.22", {
  "lesson": [
    "### Nega parol yetmaydi",
    "Parollar sizib chiqadi (boshqa saytlardan), takror ishlatiladi, phishing orqali o'g'irlanadi. Credential stuffing (20.18) bilan hujumchi to'g'ri parol bilan kiradi va rate limit uni to'xtata olmaydi. **Ikkinchi faktor** (egalik yoki biometriya) parol to'g'ri bo'lsa ham kirishni to'xtatadi.",
    "",
    "### Variantlar (zaifdan kuchliga)",
    "**1. SMS OTP.** Hammaga tanish, lekin zaif: SIM swap (operatorda raqamni boshqa SIM'ga o'tkazish), SS7 zaifliklari, phishing sahifaga kodni kiritish. Xarajat va SMS bombing xavfi (20.19). Boshqa variant bo'lmasa — hech narsadan yaxshi.",
    "",
    "**2. TOTP** (RFC 6238, Google Authenticator, Microsoft Authenticator, Aegis):",
    "- Yoqishda server tasodifiy **maxfiy kalit** (base32) yaratadi va QR kod (`otpauth://totp/...`) ko'rsatadi.",
    "- Ilova va server bir xil formula bilan har 30 soniyada 6 xonali kod hisoblaydi: `HMAC-SHA1(secret, floor(time / 30))`.",
    "- Tekshirishda soat farqi uchun ±1 oyna qabul qilinadi.",
    "- Tarmoqsiz ishlaydi, SMS xarajati yo'q.",
    "- Maxfiy kalit server'da **shifrlangan** saqlanadi (`encrypted` cast). Qayta ishlatilgan kodni (replay) bir oyna ichida rad etish.",
    "- Zaifligi: real-vaqtda phishing (hujumchi sahifasi kodni darhol haqiqiy saytga uzatadi).",
    "",
    "**3. WebAuthn / Passkeys** (FIDO2) — eng kuchli:",
    "- Qurilma (telefon, noutbuk, YubiKey) har sayt uchun alohida **kalit juftligi** yaratadi. Server faqat **ochiq** kalitni saqlaydi.",
    "- Login'da server tasodifiy challenge yuboradi, qurilma uni shaxsiy kalit bilan imzolaydi (barmoq izi, Face ID yoki PIN bilan tasdiqlab).",
    "- **Phishing'ga chidamli:** imzo domenga (origin) bog'langan. Soxta `examp1e.uz` sahifasi uchun haqiqiy saytning kaliti ishlamaydi.",
    "- Server'dan sizib chiqadigan maxfiy narsa yo'q.",
    "- **Passkeys** — sinxronlanadigan WebAuthn credential'lari (iCloud Keychain, Google Password Manager). Parolsiz login uchun ham ishlatiladi.",
    "",
    "### Tiklash kodlari",
    "Telefon yo'qolsa, foydalanuvchi akkauntsiz qolmasligi kerak. Yoqishda 8–10 ta bir martalik **recovery code** beriladi, ular hash bilan saqlanadi va har biri bir marta ishlatiladi. Foydalanuvchiga ularni xavfsiz joyda saqlashni ayting. Support orqali tiklash jarayoni qat'iy shaxsni tasdiqlash bilan bo'lsin, aks holda u eng zaif bo'g'in bo'ladi.",
    "",
    "### Qayerda talab qilish",
    "- Admin va xodim akkauntlari uchun **majburiy**.",
    "- Oddiy foydalanuvchilar uchun ixtiyoriy, lekin rag'batlantiriladigan.",
    "- **Step-up:** muhim amallarda (pul o'tkazish, email yoki parolni o'zgartirish, 2FA'ni o'chirish) qayta tasdiqlash.",
    "- \"Ishonchli qurilma\" (30 kun eslab qolish) — qulaylik va xavfsizlik o'rtasidagi kelishuv.",
    "",
    "### Laravel'da",
    "- **Laravel Fortify:** TOTP 2FA, QR kod, recovery codes, tasdiqlash oqimi (`two_factor_secret`, `two_factor_recovery_codes` shifrlangan ustunlar). Jetstream va starter kit'lar undan foydalanadi.",
    "- `pragmarx/google2fa` — TOTP'ni o'zingiz qurish uchun.",
    "- WebAuthn: `laragear/webauthn`, `spatie/laravel-passkeys`."
  ],
  "examples": [
    {
      "title": "TOTP'ni yoqish va tekshirish (pragmarx/google2fa)",
      "lang": "php",
      "code": [
        "use PragmaRX\\Google2FA\\Google2FA;",
        "",
        "// 1. Yoqish: maxfiy kalit va QR",
        "$g2fa = new Google2FA();",
        "$secret = $g2fa->generateSecretKey();",
        "$user->forceFill(['two_factor_secret' => encrypt($secret)])->save();",
        "$otpauth = $g2fa->getQRCodeUrl('MyApp', $user->email, $secret);",
        "// $otpauth ni QR kodga aylantirib ko'rsatish",
        "",
        "// 2. Tasdiqlash: foydalanuvchi birinchi kodni kiritadi",
        "abort_unless($g2fa->verifyKey($secret, $request->code, 1), 422, 'Kod noto\\'g\\'ri');",
        "$user->forceFill(['two_factor_confirmed_at' => now()])->save();",
        "",
        "// 3. Recovery code'lar",
        "$codes = collect(range(1, 8))->map(fn () => Str::random(10) . '-' . Str::random(10));",
        "$user->forceFill(['two_factor_recovery_codes' => encrypt($codes->map(fn ($c) => hash('sha256', $c))->all())])->save();",
        "// $codes ni foydalanuvchiga bir marta ko'rsatish"
      ],
      "note": "`verifyKey` ning uchinchi argumenti — ±1 oyna (30 soniya) soat farqi uchun. Replay'dan himoya uchun `verifyKeyNewer()` va oxirgi ishlatilgan timestamp'ni saqlang."
    },
    {
      "title": "Fortify bilan",
      "lang": "php",
      "code": [
        "// config/fortify.php",
        "'features' => [",
        "    Features::registration(),",
        "    Features::resetPasswords(),",
        "    Features::twoFactorAuthentication([",
        "        'confirm' => true,",
        "        'confirmPassword' => true,",
        "    ]),",
        "],",
        "",
        "// User model",
        "use Laravel\\Fortify\\TwoFactorAuthenticatable;",
        "class User extends Authenticatable { use TwoFactorAuthenticatable; }",
        "",
        "// Admin panel uchun majburiy 2FA middleware",
        "Route::middleware(['auth', 'ensure.2fa'])->prefix('admin')->group(...);"
      ],
      "note": "`ensure.2fa` loyihada yozilgan middleware deb faraz qilingan: `two_factor_confirmed_at` bo'sh bo'lsa, 2FA sozlash sahifasiga yo'naltiradi."
    }
  ],
  "pitfalls": [
    "TOTP maxfiy kalitini DB'da ochiq saqlash.",
    "Recovery code'larsiz 2FA: telefon yo'qolsa, akkaunt ham yo'qoladi yoki support zaif bo'g'inga aylanadi.",
    "2FA'ni o'chirishni qayta tasdiqlashsiz (parol yoki kod) ruxsat berish.",
    "Admin akkauntlari uchun 2FA'ni ixtiyoriy qoldirish."
  ]
});
