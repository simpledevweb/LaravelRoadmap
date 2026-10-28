/* Chuqur dars: 20.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.14", {
  "lesson": [
    "### Har token muddatli bo'lishi kerak",
    "Muddatsiz token — bir marta o'g'irlansa, abadiy ishlaydigan kalit. Token qachon sizib chiqishini oldindan bilib bo'lmaydi: eski telefon, log fayl, ochiq qolgan Postman kolleksiyasi, ishdan ketgan xodimning noutbuki. Muddat zararni vaqt bilan cheklaydi.",
    "",
    "Odatiy muddatlar:",
    "- **Access token** (OAuth/JWT): 5–60 daqiqa.",
    "- **Refresh token:** kunlar yoki haftalar, rotatsiya bilan (20.15).",
    "- **Personal access token** (Sanctum, mobil): 30–90 kun, yoki faollik bo'yicha uzaytiriladi.",
    "- **API key** (integratsiya): oylar yoki yil, rotatsiya bilan (20.4).",
    "- **Bir martalik token'lar** (parolni tiklash, email tasdiqlash, magic link): daqiqalar yoki bir soat, bir martalik ishlatish.",
    "",
    "### Bekor qilish holatlari",
    "Muddat tugashini kutmasdan token'ni darhol bekor qilish kerak:",
    "- Foydalanuvchi logout qildi (joriy qurilma).",
    "- **Parol o'zgardi** yoki tiklandi — **barcha** token va sessiyalar.",
    "- Foydalanuvchi \"qurilmalar\" ro'yxatidan birini o'chirdi.",
    "- Akkaunt bloklandi yoki xodim ishdan ketdi.",
    "- Shubhali faollik (boshqa mamlakatdan kirish, refresh token qayta ishlatilishi).",
    "- Rol yoki huquqlar kamaytirildi (huquqlar token ichida saqlansa).",
    "- Token sizib chiqqani ma'lum bo'ldi.",
    "",
    "### Token turiga qarab",
    "**Opaque token (Sanctum, DB'da):** bekor qilish oddiy — yozuvni o'chirish. Keyingi so'rovda darhol `401`. Sanctum `expires_at` va global `expiration` ni har so'rovda tekshiradi.",
    "",
    "**JWT (stateless):** server uni DB'siz tekshiradi, shuning uchun muddati tugaguncha amal qiladi. Variantlar:",
    "1. **Qisqa muddat** (5–15 daqiqa) + refresh token. Bekor qilish refresh token darajasida, access token esa tez o'zi eskiradi.",
    "2. **Denylist:** bekor qilingan `jti` lar Redis'da (TTL = token qolgan muddati). Har so'rovda tekshiriladi. Stateless'ning bir qismi yo'qoladi, lekin Redis tez.",
    "3. **Token versiyasi:** foydalanuvchida `token_version` (yoki `tokens_valid_after`) ustuni. JWT'da `ver` claim. Parol o'zgarganda versiya oshadi va barcha eski token'lar yaroqsiz.",
    "",
    "### Foydalanuvchiga nazorat",
    "\"Faol sessiyalar va qurilmalar\" sahifasi: qurilma nomi, oxirgi faollik (`last_used_at`), IP yoki joylashuv, \"chiqish\" tugmasi va \"barcha qurilmalardan chiqish\". Foydalanuvchi notanish qurilmani ko'rsa, o'zi bekor qiladi.",
    "",
    "### Tozalash",
    "Muddati o'tgan token'lar DB'da to'planadi. Sanctum: `sanctum:prune-expired`, Passport: `passport:purge`, scheduler'da."
  ],
  "examples": [
    {
      "title": "Parol o'zgarganda hammasini bekor qilish",
      "lang": "php",
      "code": [
        "final class ChangePassword",
        "{",
        "    public function handle(User $user, string $newPassword, ?string $keepTokenId = null): void",
        "    {",
        "        DB::transaction(function () use ($user, $newPassword, $keepTokenId) {",
        "            $user->forceFill([",
        "                'password' => Hash::make($newPassword),",
        "                'remember_token' => Str::random(60),",
        "                'token_version' => $user->token_version + 1,",
        "            ])->save();",
        "",
        "            $user->tokens()",
        "                ->when($keepTokenId, fn ($q) => $q->whereKeyNot($keepTokenId))",
        "                ->delete();",
        "        });",
        "",
        "        DB::table('sessions')->where('user_id', $user->id)->delete();",
        "        event(new PasswordChanged($user));",
        "    }",
        "}"
      ],
      "note": "`sessions` jadvali faqat `SESSION_DRIVER=database` bo'lganda. Redis session'larida `Auth::logoutOtherDevices()` va `AuthenticateSession` middleware ishlating."
    },
    {
      "title": "JWT denylist",
      "lang": "php",
      "code": [
        "// Logout",
        "$ttl = max(0, $claims->exp - time());",
        "Cache::store('redis')->put(\"jwt:deny:{$claims->jti}\", true, $ttl);",
        "",
        "// Har so'rovda (middleware)",
        "abort_if(Cache::store('redis')->has(\"jwt:deny:{$claims->jti}\"), 401, 'Token bekor qilingan');",
        "abort_if(($claims->ver ?? 0) < $user->token_version, 401, 'Token eskirgan');"
      ]
    }
  ],
  "pitfalls": [
    "Muddatsiz token'lar berish.",
    "Parol o'zgarganda boshqa qurilmalardagi token va sessiyalarni bekor qilmaslik: hujumchi ichkarida qoladi.",
    "Uzoq muddatli JWT'ni bekor qilish mexanizmisiz ishlatish.",
    "Foydalanuvchiga faol qurilmalarini ko'rish va bekor qilish imkoniyatini bermaslik."
  ]
});
