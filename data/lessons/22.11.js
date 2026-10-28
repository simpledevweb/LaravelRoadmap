/* Chuqur dars: 22.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.11", {
  "lesson": [
    "### Muammoning ildizi",
    "JWT'ning afzalligi — tekshiruvchi uni DB yoki AS'ga murojaatsiz qabul qiladi. Aynan shu sababli tekshiruvchi token **berilgandan keyin** nima bo'lganini bilmaydi: foydalanuvchi chiqdi, paroli o'zgardi, akkaunti bloklandi, token o'g'irlandi. Imzo hali to'g'ri, `exp` hali kelmagan va token qabul qilinadi.",
    "",
    "Bu \"stateless\" ning muqarrar narxi. Har yechim ma'lum darajada holatni qaytaradi.",
    "",
    "### Yechimlar (sodda → murakkab)",
    "**1. Qisqa muddat.** Eng asosiy va eng keng tarqalgan. 5–10 daqiqalik access token — bekor qilish ko'pi bilan 10 daqiqa kechikadi. Refresh token stateful va darhol bekor qilinadi (22.10). Ko'p ilovalar uchun yetarli.",
    "",
    "**2. Token versiyasi yoki `tokens_valid_after`.** Foydalanuvchi yozuvida butun son `token_version` yoki vaqt belgisi. JWT'da `ver` claim yoki `iat`. Tekshiruvda: `claims.ver < user.token_version` → rad. Parol o'zgarganda, \"hamma qurilmadan chiqish\" da, bloklashda versiya oshadi va foydalanuvchining **barcha** token'lari bekor. Kamchilik: foydalanuvchi yozuvini o'qish kerak (lekin keshlash mumkin) va bitta token'ni alohida bekor qilib bo'lmaydi.",
    "",
    "**3. Denylist (`jti` bo'yicha).** Bekor qilingan token'lar `jti` lari Redis'da, TTL = token qolgan muddati. Har so'rovda `EXISTS`. Kichik ro'yxat (faqat muddati o'tmagan bekor qilinganlar), tez. Alohida token'ni bekor qilish mumkin. Kamchilik: har so'rovda Redis murojaati va Redis ishlamasa nima qilish (fail-open yoki fail-closed).",
    "",
    "**4. Introspection** (21.10): har so'rovda yoki muhim endpoint'larda AS'dan holatni so'rash (kesh bilan). Eng aniq, lekin JWT'ning afzalligini yo'qotadi.",
    "",
    "**5. Push asosidagi bekor qilish.** AS bekor qilish hodisasini (`token.revoked`, `user.logged_out`) message bus orqali barcha RS'larga yuboradi va ular lokal denylist'ni yangilaydi. OIDC Back-Channel Logout, Shared Signals (CAEP) standartlari. Murakkab, lekin katta tizimlarda kechikishsiz.",
    "",
    "### Kombinatsiya",
    "Amaliy yondashuv:",
    "- barcha endpoint'lar uchun qisqa muddat + `ver` tekshiruvi (foydalanuvchi keshdan),",
    "- logout uchun `jti` denylist,",
    "- moliyaviy yoki admin endpoint'lar uchun qo'shimcha DB tekshiruvi.",
    "",
    "### Halol savol",
    "Agar har so'rovda baribir DB yoki Redis'ga murojaat qilsangiz (denylist, foydalanuvchini yuklash), JWT'ning \"stateless\" afzalligi qolmaydi. Bunday holatda opaque token (Sanctum) + kesh soddaroq va xavfsizroq bo'lishi mumkin (22.15). JWT asosan haqiqatan ko'p mustaqil servislar uchun foydali."
  ],
  "examples": [
    {
      "title": "ver va jti tekshiruvi",
      "lang": "php",
      "code": [
        "public function check(stdClass $claims): User",
        "{",
        "    $user = Cache::remember(\"auth:user:{$claims->sub}\", 60, fn () => User::where('public_id', $claims->sub)->first());",
        "",
        "    abort_unless($user && ! $user->blocked_at, 401);",
        "    abort_if(($claims->ver ?? 0) < $user->token_version, 401, 'Token eskirgan');",
        "    abort_if(Redis::exists(\"jwt:deny:{$claims->jti}\"), 401, 'Token bekor qilingan');",
        "",
        "    return $user;",
        "}",
        "",
        "// Logout: faqat shu token",
        "Redis::setex(\"jwt:deny:{$claims->jti}\", max(1, $claims->exp - time()), 1);",
        "",
        "// Hamma qurilmadan chiqish yoki parol o'zgarishi",
        "$user->increment('token_version');",
        "Cache::forget(\"auth:user:{$user->public_id}\");",
        "$user->refreshTokens()->delete();"
      ],
      "note": "Foydalanuvchi keshi (60 soniya) `ver` o'zgarishining tarqalish kechikishini belgilaydi. Shuning uchun versiyani oshirgandan keyin keshni tozalang."
    }
  ],
  "pitfalls": [
    "Uzoq muddatli JWT ishlatib, logout token'ni \"bekor qiladi\" deb hisoblash: faqat client'dan o'chiriladi.",
    "Denylist'ga muddatsiz yozish: Redis cheksiz o'sadi.",
    "Redis ishlamay qolganda denylist tekshiruvi jim o'tib ketishini (fail-open) hisobga olmaslik.",
    "Har so'rovda DB tekshiruvi bilan JWT ishlatib, uning afzalligini yo'qotib, murakkabligini qoldirish."
  ]
});
