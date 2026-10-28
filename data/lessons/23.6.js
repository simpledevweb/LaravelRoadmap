/* Chuqur dars: 23.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.6", {
  "lesson": [
    "### Opaque token afzalligi",
    "Sanctum token'i DB yozuvi. Uni o'chirish — darhol bekor qilish: keyingi so'rovda guard yozuvni topmaydi va `401`. JWT'dagi kabi denylist yoki kutish shart emas (22.11).",
    "",
    "### Bekor qilish usullari",
    "- **Joriy token** (logout shu qurilmadan): `$request->user()->currentAccessToken()->delete();`",
    "- **Aniq token** (\"qurilmalar\" ro'yxatidan): `$user->tokens()->whereKey($id)->delete();`",
    "- **Barcha token'lar** (parol o'zgarishi, \"hamma joydan chiqish\", akkaunt bloklash): `$user->tokens()->delete();`",
    "- **Joriydan tashqari hammasi:** `$user->tokens()->whereKeyNot($current->id)->delete();`",
    "- **Nom yoki ability bo'yicha:** `$user->tokens()->where('name', 'CI deploy')->delete();`",
    "",
    "### Qachon bekor qilish kerak",
    "- Logout.",
    "- **Parol o'zgarishi yoki tiklanishi** — barcha token'lar (joriydan tashqari bo'lishi mumkin) va session'lar (20.14).",
    "- Akkaunt bloklanishi yoki o'chirilishi.",
    "- Email o'zgarishi (xavfsizlik siyosatiga qarab).",
    "- 2FA o'chirilishi yoki yoqilishi.",
    "- Token sizib chiqqani ma'lum bo'lsa.",
    "- Xodim ishdan ketganda (servis akkauntlari ham).",
    "- Rol yoki huquqlar kamaytirilganda, agar token abilities ularga bog'liq bo'lsa.",
    "",
    "### SPA session'ida",
    "SPA foydalanuvchisining `currentAccessToken()` — `TransientToken`. Uning `delete()` metodi yo'q va xato beradi. Logout universal bo'lishi uchun:",
    "- token bo'lsa — token'ni o'chirish,",
    "- session bo'lsa — `Auth::guard('web')->logout()` va session invalidatsiya.",
    "",
    "### Kesh bilan ehtiyot",
    "Agar performance uchun token tekshiruvini keshlasangiz (masalan, token → foydalanuvchi), bekor qilishda keshni ham tozalang. Aks holda o'chirilgan token kesh muddati davomida ishlaydi.",
    "",
    "### Audit va xabarnoma",
    "Token bekor qilinishi audit log'ga yozilsin (kim, qaysi token, sabab). \"Barcha qurilmalardan chiqish\" kabi muhim amallar haqida foydalanuvchiga email. Foydalanuvchi o'zi qilmagan bo'lsa, akkaunti xavf ostida ekanini biladi.",
    "",
    "### Kaskad",
    "Foydalanuvchi o'chirilganda uning token'lari ham o'chishi kerak. `personal_access_tokens` polymorphic bo'lgani uchun FK kaskad yo'q. Model `deleting` event'ida `$user->tokens()->delete()` (soft delete'da ham)."
  ],
  "examples": [
    {
      "title": "Universal logout",
      "lang": "php",
      "code": [
        "Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {",
        "    $token = $request->user()->currentAccessToken();",
        "",
        "    if ($token instanceof \\Laravel\\Sanctum\\PersonalAccessToken) {",
        "        $token->delete();                                   // mobil / API token",
        "    } else {",
        "        Auth::guard('web')->logout();                       // SPA session",
        "        $request->session()->invalidate();",
        "        $request->session()->regenerateToken();",
        "    }",
        "",
        "    return response()->noContent();",
        "});"
      ]
    },
    {
      "title": "Parol o'zgarganda va foydalanuvchi o'chirilganda",
      "lang": "php",
      "code": [
        "// Parol o'zgarishi: joriy qurilmadan tashqari hammasi",
        "$current = $request->user()->currentAccessToken();",
        "$request->user()->tokens()",
        "    ->when($current instanceof PersonalAccessToken, fn ($q) => $q->whereKeyNot($current->id))",
        "    ->delete();",
        "Auth::logoutOtherDevices($request->input('current_password'));   // web session'lar",
        "",
        "// User model",
        "protected static function booted(): void",
        "{",
        "    static::deleting(fn (User $user) => $user->tokens()->delete());",
        "}"
      ],
      "note": "`Auth::logoutOtherDevices()` `AuthenticateSession` middleware'i bilan ishlaydi."
    }
  ],
  "pitfalls": [
    "SPA session'ida `currentAccessToken()->delete()` chaqirish: `TransientToken` da metod yo'q.",
    "Parol o'zgarganda boshqa qurilmalardagi token'larni bekor qilmaslik.",
    "Token tekshiruvini keshlab, bekor qilishda keshni tozalamaslik.",
    "Foydalanuvchi o'chirilganda token'lari qolib ketishi."
  ]
});
