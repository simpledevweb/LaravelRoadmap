/* Chuqur dars: 23.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.3", {
  "lesson": [
    "### createToken imzosi",
    "`$tokenable->createToken(string $name, array $abilities = ['*'], ?DateTimeInterface $expiresAt = null): NewAccessToken`",
    "",
    "- **`$name`:** inson o'qiy oladigan nom. Qurilma (`iPhone 15 — Ali`), maqsad (`CI deploy`, `Hisobot skripti`). \"Faol qurilmalar\" va \"token'lar\" sahifasida ko'rsatiladi.",
    "- **`$abilities`:** token huquqlari (23.4). Default `['*']` — **hamma narsa**. Doim aniq ro'yxat bering.",
    "- **`$expiresAt`:** muddat (23.5). Berilmasa, global `sanctum.expiration` amal qiladi. U ham `null` bo'lsa — muddatsiz.",
    "",
    "### Qaytgan qiymat",
    "`NewAccessToken`:",
    "- `->plainTextToken` — mijozga beriladigan satr: `{id}|{prefix}{40 belgi}`. Masalan `12|myapp_K8xQ...`.",
    "- `->accessToken` — `PersonalAccessToken` modeli (DB yozuvi).",
    "",
    "`plainTextToken` faqat shu paytda mavjud: DB'da faqat hash. Uni yo'qotgan foydalanuvchi yangi token yaratadi, eskisini \"tiklab\" bo'lmaydi.",
    "",
    "### Token prefiksi",
    "`config/sanctum.php` dagi `token_prefix` (masalan, `myapp_`). Sizib chiqqan token'larni GitHub secret scanning yoki gitleaks naqsh bo'yicha topishi uchun (20.4). Prefiks hash'lanmaydi, lekin token'ni kuchsizlantirmaydi: entropiya tasodifiy qismda.",
    "",
    "### Qachon token yaratiladi",
    "1. **Login'da** (mobil): har qurilma alohida token (23.2).",
    "2. **Foydalanuvchi o'zi** profil sahifasida (integratsiyalar uchun): nom, abilities va muddatni tanlaydi. Token bir marta ko'rsatiladi va \"nusxalash\" tugmasi bilan.",
    "3. **Tizim** tomonidan: servis akkauntlari, test muhiti.",
    "",
    "### Foydalanuvchi o'zi yaratganda xavfsizlik",
    "- Foydalanuvchi faqat **o'zida bor** huquqlarni token'ga bera olsin. `abilities` validatsiyasi foydalanuvchi ruxsatlari bilan cheklangan (20.16).",
    "- Muddat majburiy va cheklangan (7, 30, 90 kun).",
    "- Bir foydalanuvchidagi faol token'lar soniga chegara.",
    "- Token yaratish audit log'ga yoziladi va foydalanuvchiga email yuboriladi (\"Yangi API token yaratildi\").",
    "- Parolni qayta tasdiqlash (`password.confirm`).",
    "",
    "### Login'da eski token'lar",
    "Qurilma qayta login qilsa, ko'p eski token'lar to'planadi. Variantlar: shu `device_name` li eski token'ni o'chirish, yoki \"bir qurilma — bir token\" siyosati, yoki muddat va prune bilan tabiiy tozalanish."
  ],
  "examples": [
    {
      "title": "Foydalanuvchi integratsiya token'ini yaratadi",
      "lang": "php",
      "code": [
        "Route::middleware(['auth', 'password.confirm'])->post('/settings/tokens', function (Request $request) {",
        "    $user = $request->user();",
        "",
        "    $data = $request->validate([",
        "        'name' => ['required', 'string', 'max:100'],",
        "        'abilities' => ['required', 'array', 'min:1'],",
        "        'abilities.*' => [Rule::in($user->assignableAbilities())],",
        "        'days' => ['required', Rule::in([7, 30, 90])],",
        "    ]);",
        "",
        "    abort_if($user->tokens()->count() >= 20, 422, 'Token\\'lar soni chegarasiga yetildi');",
        "",
        "    $token = $user->createToken($data['name'], $data['abilities'], now()->addDays((int) $data['days']));",
        "",
        "    activity()->causedBy($user)->log(\"API token yaratildi: {$data['name']}\");",
        "    $user->notify(new ApiTokenCreated($data['name']));",
        "",
        "    return back()->with('plain_token', $token->plainTextToken);   // faqat bir marta ko'rsatiladi",
        "});"
      ],
      "note": "`activity()` — `spatie/laravel-activitylog` paketi. `assignableAbilities()` foydalanuvchi ruxsatlaridan kelib chiquvchi loyiha metodi deb faraz qilingan."
    },
    {
      "title": "Qurilma bo'yicha bitta token",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($user, $deviceName, &$token) {",
        "    $user->tokens()->where('name', $deviceName)->delete();",
        "    $token = $user->createToken($deviceName, ['orders:read', 'orders:write'], now()->addDays(30));",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "`createToken('name')` ni abilities'siz chaqirish: default `['*']`.",
    "Muddatsiz token'lar yaratish.",
    "Foydalanuvchiga o'zida yo'q abilities'li token yaratishga ruxsat berish.",
    "`plainTextToken` ni keyinroq ko'rsatish uchun saqlab qo'yish."
  ]
});
