/* Chuqur dars: 20.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.3", {
  "lesson": [
    "### Qanday ishlaydi",
    "Login'dan (yoki boshqa yo'l bilan) keyin mijoz **token** oladi va uni har so'rovda o'zi yuboradi: `Authorization: Bearer <token>`. Server token'ni tekshirib, foydalanuvchini aniqlaydi. Cookie va session shart emas, shuning uchun mobil ilovalar, CLI vositalar, uchinchi tomon integratsiyalari va boshqa servislar uchun qulay.",
    "",
    "### Ikki turdagi token",
    "**1. Opaque (shaffof bo'lmagan) token.** Tasodifiy satr, o'zida hech qanday ma'lumot yo'q. Server uni DB yoki keshda qidiradi.",
    "- Sanctum personal access token: `12|K8x...` (ID va tasodifiy qism). DB'da SHA-256 hash.",
    "- Afzallik: darhol bekor qilish (DB'dan o'chirish), ichida ma'lumot sizmaydi, kichik hajm.",
    "- Kamchilik: har so'rovda DB yoki kesh murojaati.",
    "",
    "**2. Self-contained (o'zini o'zi tavsiflovchi) token.** Odatda JWT (20.7). Ichida claim'lar (`sub`, `exp`, scope'lar) va imzo. Server imzo va muddatni tekshiradi, DB'ga murojaat shart emas.",
    "- Afzallik: stateless, mikroservislar o'zi tekshira oladi.",
    "- Kamchilik: muddatidan oldin bekor qilish qiyin, payload hammaga o'qiladi, hajmi katta.",
    "",
    "Birinchi tomon ilovalari (o'z SPA, mobil) uchun opaque token odatda sodda va xavfsizroq.",
    "",
    "### Xavfsiz token tizimi talablari",
    "1. **Kriptografik tasodifiy:** `Str::random(40)` yoki `random_bytes()`. Taxmin qilib bo'lmasin.",
    "2. **Hash bilan saqlash:** DB sizib chiqsa ham token'larni ishlatib bo'lmasin. Parol kabi sekin hash shart emas, chunki token yuqori entropiyali. SHA-256 yetarli.",
    "3. **Muddat:** muddatsiz token'lar yo'q (20.14).",
    "4. **Scope'lar:** token faqat kerakli huquqlarga ega (20.16).",
    "5. **Bekor qilish:** logout, parol o'zgarishi, qurilma o'chirilishi.",
    "6. **Faqat HTTPS** va faqat header'da (20.5).",
    "7. **Prefiks:** `myapp_pat_...` — sizib chiqqan token'ni GitHub secret scanning kabi vositalar topishi uchun. Sanctum'da `token_prefix` konfiguratsiyasi.",
    "8. **Log'larga tushmasin:** `Authorization` header'ini log va xato hisobotlaridan filtrlang.",
    "",
    "### Token berish oqimi",
    "- Mobil: login endpoint'i email + parol (+ qurilma nomi) qabul qiladi va token qaytaradi. Har qurilma alohida token.",
    "- Integratsiya: foydalanuvchi profil sahifasida token yaratadi (GitHub PAT kabi), u bir marta ko'rsatiladi.",
    "- Uchinchi tomon ilovasi: OAuth 2.0 (20.6), foydalanuvchi parolini ilovaga bermaydi."
  ],
  "examples": [
    {
      "title": "Mobil login va token",
      "lang": "php",
      "code": [
        "Route::post('auth/token', function (Request $request) {",
        "    $data = $request->validate([",
        "        'email' => ['required', 'email'],",
        "        'password' => ['required'],",
        "        'device_name' => ['required', 'string', 'max:100'],",
        "    ]);",
        "",
        "    $user = User::where('email', $data['email'])->first();",
        "",
        "    if (! $user || ! Hash::check($data['password'], $user->password)) {",
        "        throw ValidationException::withMessages(['email' => __('auth.failed')]);",
        "    }",
        "",
        "    $token = $user->createToken($data['device_name'], ['orders:read', 'orders:write'], now()->addDays(30));",
        "",
        "    return ['token' => $token->plainTextToken];",
        "})->middleware('throttle:login');"
      ]
    },
    {
      "title": "Token'ni log'lardan yashirish",
      "lang": "php",
      "code": [
        "// config/logging.php yoki Sentry before_send",
        "'before_send' => function (\\Sentry\\Event $event): ?\\Sentry\\Event {",
        "    $request = $event->getRequest();",
        "    unset($request['headers']['authorization'], $request['headers']['cookie']);",
        "    $event->setRequest($request);",
        "    return $event;",
        "},",
        "",
        "// Telescope: maxfiy header'lar",
        "Telescope::hideRequestHeaders(['authorization', 'cookie', 'x-api-key']);"
      ]
    }
  ],
  "pitfalls": [
    "Token'ni DB'da ochiq matnda saqlash: DB sizib chiqsa, barcha akkauntlar ochiladi.",
    "`uniqid()` yoki `md5(time())` bilan token yaratish: taxmin qilish mumkin.",
    "Muddatsiz va cheksiz scope'li token'lar.",
    "`Authorization` header'ini log'larda va xato hisobotlarida qoldirish."
  ]
});
