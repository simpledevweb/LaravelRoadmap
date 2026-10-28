/* Chuqur dars: 23.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.2", {
  "lesson": [
    "### Token rejimi qachon",
    "Cookie ishlamaydigan yoki noqulay bo'lgan mijozlar uchun:",
    "- mobil ilovalar (iOS, Android, Flutter, React Native),",
    "- CLI vositalar va skriptlar,",
    "- boshqa domendagi frontend,",
    "- foydalanuvchi o'zi yaratadigan integratsiya token'lari (GitHub PAT kabi),",
    "- oddiy server-server integratsiyalar.",
    "",
    "### Qanday ishlaydi",
    "1. User modeli `Laravel\\Sanctum\\HasApiTokens` trait'ini ishlatadi.",
    "2. Token yaratiladi: `$user->createToken('iPhone 15', ['orders:read'])` (23.3). Natija `NewAccessToken` obyekti, `plainTextToken` — `{id}|{tasodifiy}` ko'rinishidagi satr. **Faqat bir marta** ko'rsatiladi.",
    "3. DB'ga (`personal_access_tokens` jadvali) faqat tasodifiy qismning **SHA-256 hash'i** yoziladi, plus `tokenable_type/id`, `name`, `abilities`, `last_used_at`, `expires_at`.",
    "4. Mijoz har so'rovda: `Authorization: Bearer 12|K8xQ...`.",
    "5. `auth:sanctum` guard: so'rov stateful domendan kelmagan bo'lsa (23.7), Bearer token'ni oladi, `id` bo'yicha yozuvni topadi, hash'ni `hash_equals` bilan solishtiradi, muddatni tekshiradi va foydalanuvchini qaytaradi. `last_used_at` yangilanadi.",
    "",
    "### Opaque token afzalliklari",
    "Sanctum token'lari JWT emas, oddiy tasodifiy satr (20.3):",
    "- darhol bekor qilinadi (yozuvni o'chirish),",
    "- ichida hech narsa yo'q,",
    "- kichik,",
    "- kalitlar, algoritmlar va rotatsiya kabi JWT murakkabliklari yo'q.",
    "",
    "Narxi: har so'rovda bitta DB so'rovi (PK bo'yicha, juda tez). Kerak bo'lsa keshlanadi.",
    "",
    "### Polymorphic egasi",
    "Token `tokenable` morph munosabati orqali istalgan modelga tegishli bo'lishi mumkin: `User`, `Admin`, `ApiClient`, `Device`. Masalan, integratsiya token'larini foydalanuvchiga emas, `Organization` modeliga bog'lash.",
    "",
    "### Joriy token",
    "Controller ichida `$request->user()->currentAccessToken()` — shu so'rovda ishlatilgan token modeli. Undan nomi, abilities va bekor qilish (`->delete()`) uchun foydalaniladi. SPA (session) orqali kirganda bu `TransientToken` bo'ladi va `delete()` yo'q (23.14).",
    "",
    "### Login endpoint'i",
    "Sanctum token berish endpoint'ini o'zi bermaydi. Mobil ilova uchun odatiy: `POST /api/auth/token` (email, parol, qurilma nomi) → token. Rate limit va bir xil xato xabari (20.18) bilan."
  ],
  "examples": [
    {
      "title": "Mobil ilova uchun token endpoint'i",
      "lang": "php",
      "code": [
        "Route::post('/auth/token', function (Request $request) {",
        "    $data = $request->validate([",
        "        'email' => ['required', 'email'],",
        "        'password' => ['required', 'string'],",
        "        'device_name' => ['required', 'string', 'max:100'],",
        "    ]);",
        "",
        "    $user = User::where('email', $data['email'])->first();",
        "",
        "    if (! $user || ! Hash::check($data['password'], $user->password)) {",
        "        throw ValidationException::withMessages(['email' => [__('auth.failed')]]);",
        "    }",
        "",
        "    $token = $user->createToken($data['device_name'], ['orders:read', 'orders:write'], now()->addDays(30));",
        "",
        "    return response()->json(['token' => $token->plainTextToken, 'expires_at' => $token->accessToken->expires_at]);",
        "})->middleware('throttle:login');",
        "",
        "Route::middleware('auth:sanctum')->get('/user', fn (Request $r) => UserResource::make($r->user()));"
      ]
    },
    {
      "title": "So'rov",
      "lang": "bash",
      "code": [
        "curl https://api.example.uz/api/user \\",
        "  -H \"Accept: application/json\" \\",
        "  -H \"Authorization: Bearer 12|K8xQp3...\""
      ]
    }
  ],
  "pitfalls": [
    "`plainTextToken` ni DB'ga yoki log'ga saqlash: Sanctum faqat hash'ni saqlaydi va siz ham shunday qiling.",
    "Token endpoint'ini rate limit'siz qoldirish.",
    "Passport'ning `HasApiTokens` trait'ini Sanctum bilan adashtirish.",
    "`Accept: application/json` header'isiz so'rov: xato javobi JSON o'rniga redirect bo'lishi mumkin (18.8)."
  ]
});
