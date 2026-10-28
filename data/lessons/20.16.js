/* Chuqur dars: 20.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.16", {
  "lesson": [
    "### Scope nima",
    "Scope (Sanctum'da **ability**) — **token**ga berilgan huquqlar doirasi: `orders:read`, `orders:write`, `profile:read`. Foydalanuvchi o'zi admin bo'lishi mumkin, lekin u yaratgan token (yoki uchinchi tomon ilovasiga bergan ruxsati) faqat buyurtmalarni o'qishga ruxsat bersa, token bilan o'chirish rad etiladi.",
    "",
    "### Yakuniy ruxsat formulasi",
    "**Ruxsat = foydalanuvchi ruxsati ∩ token scope'i ∩ obyekt doirasi.**",
    "- Foydalanuvchi ruxsati: rol va policy (20.10, 20.11).",
    "- Token scope'i: bu ilova yoki integratsiya nimaga ruxsat olgan.",
    "- Obyekt: aynan shu yozuv (20.13).",
    "",
    "Scope foydalanuvchi huquqini **kengaytirmaydi**, faqat **toraytiradi**. Viewer foydalanuvchi `orders:write` scope'li token olsa ham, yoza olmaydi.",
    "",
    "### Nega kerak",
    "- **Eng kam huquq** (20.17): hisobot skripti faqat `reports:read` bilan. Uning tokeni sizib chiqsa, hujumchi hech narsani o'zgartira olmaydi.",
    "- **Uchinchi tomon ilovalari:** foydalanuvchi rozilik ekranida aynan nimaga ruxsat berayotganini ko'radi va tanlaydi (OAuth, 20.6).",
    "- **Integratsiyalar:** har integratsiya o'z vazifasiga mos kalit.",
    "",
    "### Dizayn",
    "- **Nomlash:** `resurs:amal` (`orders:read`, `orders:write`) yoki `resurs.amal`. Izchil.",
    "- **Granulyarlik:** juda mayda (har endpoint uchun) — boshqarib bo'lmaydi. Juda yirik (`admin`) — foydasiz. Resurs × (read, write) ko'pincha yaxshi boshlang'ich nuqta. Xavfli amallar alohida: `payments:refund`, `users:delete`.",
    "- **Tushunarli tavsif:** OAuth rozilik ekranida \"orders:write\" emas, \"Buyurtma yaratish va o'zgartirish\".",
    "- **Default scope:** token yaratishda scope berilmasa, minimal (masalan, faqat `profile:read`), `*` emas.",
    "- **Ierarxiya** ehtiyotkorlik bilan: `orders:write` avtomatik `orders:read` ni o'z ichiga oladimi? Hujjatda aniq yozing.",
    "",
    "### Laravel'da",
    "**Sanctum:**",
    "- `$user->createToken('reporting', ['reports:read'])`.",
    "- `$user->tokenCan('reports:read')`. Session (SPA) orqali kirganda `tokenCan()` har doim `true` qaytaradi, chunki u \"transient token\".",
    "- Middleware: `abilities:a,b` (hammasi kerak), `ability:a,b` (biri yetarli).",
    "",
    "**Passport:**",
    "- `Passport::tokensCan([...])`.",
    "- Middleware: `scopes:a,b` (hammasi), `scope:a,b` (biri).",
    "- `$request->user()->tokenCan('orders:write')`.",
    "",
    "Policy ichida ham `tokenCan()` ni tekshirish route middleware'idan ko'ra ishonchliroq, chunki policy har kirish nuqtasida (controller, job, Livewire) ishlaydi."
  ],
  "examples": [
    {
      "title": "Scope'lar route va policy'da",
      "lang": "php",
      "code": [
        "// Token berish: minimal huquqlar",
        "$token = $user->createToken('Hisobot skripti', ['reports:read'], now()->addDays(90));",
        "",
        "// Route darajasi",
        "Route::middleware(['auth:sanctum', 'abilities:orders:read'])->get('orders', [OrderController::class, 'index']);",
        "Route::middleware(['auth:sanctum', 'abilities:orders:write'])->post('orders', [OrderController::class, 'store']);",
        "Route::middleware(['auth:sanctum', 'abilities:payments:refund'])->post('payments/{payment}/refund', RefundController::class);",
        "",
        "// Policy: foydalanuvchi ruxsati ∩ token scope",
        "public function update(User $user, Order $order): bool",
        "{",
        "    return $user->can('orders.update')",
        "        && $user->tokenCan('orders:write')",
        "        && $order->tenant_id === $user->tenant_id;",
        "}"
      ]
    },
    {
      "title": "Foydalanuvchi o'zi token yaratadi (UI)",
      "lang": "php",
      "code": [
        "public function store(Request $request)",
        "{",
        "    $data = $request->validate([",
        "        'name' => ['required', 'string', 'max:100'],",
        "        'abilities' => ['required', 'array', 'min:1'],",
        "        'abilities.*' => [Rule::in(TokenAbility::assignableBy($request->user()))],",
        "        'expires_in_days' => ['required', 'integer', Rule::in([7, 30, 90])],",
        "    ]);",
        "",
        "    $token = $request->user()->createToken($data['name'], $data['abilities'], now()->addDays($data['expires_in_days']));",
        "",
        "    return response()->json(['token' => $token->plainTextToken], 201);",
        "}"
      ],
      "note": "`TokenAbility::assignableBy()` foydalanuvchi o'zida bo'lmagan huquqli token yarata olmasligini ta'minlaydi."
    }
  ],
  "pitfalls": [
    "Barcha token'larga `['*']` berish: scope'lar ma'nosiz bo'ladi.",
    "Faqat scope'ni tekshirib, foydalanuvchi ruxsati va obyekt doirasini unutish.",
    "SPA session'ida `tokenCan()` har doim `true` qaytarishini bilmaslik va unga tayanib cheklash qurish.",
    "Rozilik ekranida texnik scope nomlarini ko'rsatish."
  ]
});
