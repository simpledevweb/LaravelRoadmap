/* Chuqur dars: 21.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.8", {
  "lesson": [
    "### Rozilik — OAuth mohiyati",
    "OAuth — **delegatsiya**: foydalanuvchi o'z resurslariga kirishni boshqa ilovaga beradi. Rozilik ekrani — foydalanuvchi aynan shu qarorni ongli qabul qiladigan joy. U yaxshi bo'lmasa, OAuth faqat \"ruxsat berish\" tugmasini bosish marosimiga aylanadi.",
    "",
    "### Ekranda nima bo'lishi kerak",
    "1. **Ilova kimligi:** nomi, logotipi, ishlab chiquvchi, sayt havolasi. \"Tasdiqlangan\" belgisi (agar AS ilovalarni tekshirsa).",
    "2. **So'ralayotgan huquqlar:** har scope tushunarli tilda, texnik nom emas. \"`orders:write`\" emas, \"Sizning nomingizdan buyurtma berish\".",
    "3. **Xavfli huquqlar ajratilgan:** to'lov, o'chirish, shaxsiy ma'lumot — alohida ogohlantirish bilan.",
    "4. **Qaysi akkaunt:** \"Ali Valiyev (ali@x.uz) sifatida\" va \"boshqa akkaunt\" havolasi.",
    "5. **Tanlov:** \"Ruxsat berish\" va \"Rad etish\". Iloji bo'lsa, ayrim scope'lardan voz kechish imkoniyati.",
    "6. **Bekor qilish haqida:** \"Ruxsatni istalgan vaqtda Sozlamalar → Ulangan ilovalar bo'limida bekor qilishingiz mumkin.\"",
    "",
    "### Roziliklarni saqlash",
    "Foydalanuvchi bir marta ruxsat bergandan keyin, xuddi shu client va xuddi shu (yoki kamroq) scope'lar uchun ekran qayta ko'rsatilmasligi mumkin. Yangi scope so'ralganda — faqat yangi qism uchun rozilik. `prompt=consent` parametri ekranni majburan ko'rsatadi.",
    "",
    "### Birinchi tomon ilovalari",
    "O'z ilovalaringiz (o'z mobil ilovangiz AS orqali kirsa) uchun rozilik ekrani ortiqcha: foydalanuvchi o'z akkauntiga kirmoqda. Passport'da client'ni \"skip authorization\" deb belgilash mumkin (`skipsAuthorization()` metodi bilan, Passport 11+). Lekin buni faqat haqiqatan sizga tegishli client'larga qo'llang.",
    "",
    "### \"Ulangan ilovalar\" sahifasi",
    "Foydalanuvchi hisob sozlamalarida:",
    "- qaysi ilovalarga ruxsat bergan,",
    "- qaysi huquqlar bilan,",
    "- qachon va oxirgi ishlatilgan vaqt,",
    "- \"Ruxsatni bekor qilish\" tugmasi: shu client uchun barcha access va refresh token'lar bekor qilinadi.",
    "",
    "### Hujumlar",
    "- **Consent phishing (illicit consent grant):** hujumchi o'z ilovasini ro'yxatdan o'tkazadi, ishonarli nom va logo beradi (\"Document Viewer\") va foydalanuvchini keng huquqlarga rozi bo'lishga undaydi. Parol o'g'irlanmaydi, MFA ham yordam bermaydi, lekin hujumchi API orqali ma'lumot oladi. Himoya: ilovalarni tekshirish (verification), tasdiqlanmagan ilovalar uchun ogohlantirish, xavfli scope'larni faqat tasdiqlangan ilovalarga berish, admin tasdig'i (korporativ muhitda).",
    "- **Clickjacking:** rozilik sahifasini `iframe` ga joylab, foydalanuvchini aldab bosdirish. Himoya: `X-Frame-Options: DENY` yoki CSP `frame-ancestors 'none'`."
  ],
  "examples": [
    {
      "title": "Rozilik ekrani matni",
      "lang": "text",
      "code": [
        "[logo] Hisobchi  (hisobchi.uz)  ✓ tasdiqlangan ilova",
        "",
        "Ali Valiyev (ali@x.uz) akkauntingizga kirishni so'ramoqda:",
        "",
        "  ✓ Ismingiz va rasmingizni ko'rish",
        "  ✓ Buyurtmalaringiz tarixini ko'rish",
        "  ⚠ Sizning nomingizdan buyurtma berish",
        "",
        "Ruxsatni istalgan vaqtda Sozlamalar → Ulangan ilovalar bo'limida bekor qilishingiz mumkin.",
        "",
        "        [Rad etish]   [Ruxsat berish]"
      ]
    },
    {
      "title": "Passport: birinchi tomon client va ulangan ilovalarni bekor qilish",
      "lang": "php",
      "code": [
        "// app/Models/Passport/Client.php",
        "class Client extends \\Laravel\\Passport\\Client",
        "{",
        "    public function skipsAuthorization(): bool",
        "    {",
        "        return $this->first_party === true;",
        "    }",
        "}",
        "",
        "// AppServiceProvider::boot()",
        "Passport::useClientModel(\\App\\Models\\Passport\\Client::class);",
        "",
        "// Ulangan ilova ruxsatini bekor qilish",
        "public function destroy(Request $request, string $clientId)",
        "{",
        "    $tokens = $request->user()->tokens()->where('client_id', $clientId)->get();",
        "",
        "    foreach ($tokens as $token) {",
        "        $token->revoke();",
        "        DB::table('oauth_refresh_tokens')->where('access_token_id', $token->id)->update(['revoked' => true]);",
        "    }",
        "",
        "    return back();",
        "}"
      ],
      "note": "`skipsAuthorization()` imzosi Passport versiyalarida farq qiladi (12+ da foydalanuvchi va scope'lar argument sifatida keladi)."
    }
  ],
  "pitfalls": [
    "Rozilik ekranida texnik scope nomlarini ko'rsatish.",
    "Uchinchi tomon ilovalari uchun ham rozilikni o'tkazib yuborish.",
    "Foydalanuvchiga berilgan ruxsatlarni ko'rish va bekor qilish imkoniyatini bermaslik.",
    "Rozilik sahifasini iframe'da ochilishiga ruxsat berish: clickjacking."
  ]
});
