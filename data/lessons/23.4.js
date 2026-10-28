/* Chuqur dars: 23.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.4", {
  "lesson": [
    "### Ability nima",
    "Sanctum'da **ability** — OAuth scope'ining analogi (20.16, 21.7): token nima qila olishini cheklovchi satrlar ro'yxati. `personal_access_tokens.abilities` ustunida JSON massiv sifatida saqlanadi. Maxsus qiymat `*` — barcha abilities.",
    "",
    "### Tekshirish",
    "- `$request->user()->tokenCan('orders:write')` — `bool`.",
    "- `$request->user()->tokenCant('orders:write')`.",
    "- Middleware (Laravel 11+ da `bootstrap/app.php` da alias qilinadi):",
    "  - `abilities:orders:read,orders:write` — **barchasi** kerak (`CheckAbilities`).",
    "  - `ability:orders:read,admin` — **kamida bittasi** yetarli (`CheckForAnyAbility`).",
    "- Rad etilganda `MissingAbilityException` → `403`.",
    "",
    "### Nomlash",
    "`resurs:amal` (`orders:read`, `orders:write`, `payments:refund`, `reports:export`). Izchil va hujjatlangan ro'yxat. Enum'da saqlash qulay: typo'lar oldini oladi.",
    "",
    "### SPA (session) so'rovlarida",
    "Muhim nuance: SPA cookie orqali kirgan foydalanuvchida haqiqiy token yo'q. Sanctum unga `TransientToken` beradi va **`tokenCan()` har doim `true`** qaytaradi. Mantiq: birinchi tomon SPA foydalanuvchining o'zi, unga cheklov token darajasida emas, foydalanuvchi ruxsatlari darajasida.",
    "",
    "Oqibat: abilities'ni **yagona** avtorizatsiya mexanizmi sifatida ishlatsangiz, SPA foydalanuvchisi hamma narsani qila oladi. Shuning uchun abilities har doim **foydalanuvchi ruxsatlari bilan birga** tekshiriladi (23.14).",
    "",
    "### Policy'da birlashtirish",
    "Eng ishonchli joy — policy:",
    "`return $user->can('orders.update') && $user->tokenCan('orders:write') && $order->tenant_id === $user->tenant_id;`",
    "",
    "Policy controller, job, Livewire va Artisan buyruqlaridan qat'iy nazar ishlaydi. Route middleware esa faqat HTTP kirish nuqtasini himoya qiladi.",
    "",
    "### Abilities granulyarligi",
    "- Mobil ilovaning o'z token'i ko'pincha keng (`orders:*` kabi barcha kerakli huquqlar), chunki u foydalanuvchining o'zi.",
    "- Integratsiya token'lari tor: faqat kerakli (`reports:read`).",
    "- Xavfli amallar alohida: `payments:refund`, `users:delete`. Ular hech qachon default'ga kirmasin.",
    "",
    "### Abilities o'zgarmaydi",
    "Token yaratilgandan keyin uning abilities'ini o'zgartirish odatiy amaliyot emas. Huquqlar kerak bo'lsa, yangi token yaratiladi va eskisi bekor qilinadi. Bu audit va tushunarlilik uchun yaxshiroq."
  ],
  "examples": [
    {
      "title": "Enum va middleware",
      "lang": "php",
      "code": [
        "enum TokenAbility: string",
        "{",
        "    case OrdersRead = 'orders:read';",
        "    case OrdersWrite = 'orders:write';",
        "    case PaymentsRefund = 'payments:refund';",
        "}",
        "",
        "// bootstrap/app.php",
        "$middleware->alias([",
        "    'abilities' => \\Laravel\\Sanctum\\Http\\Middleware\\CheckAbilities::class,",
        "    'ability' => \\Laravel\\Sanctum\\Http\\Middleware\\CheckForAnyAbility::class,",
        "]);",
        "",
        "// routes/api.php",
        "Route::middleware('auth:sanctum')->group(function () {",
        "    Route::get('orders', [OrderController::class, 'index'])",
        "        ->middleware('ability:' . TokenAbility::OrdersRead->value);",
        "    Route::post('payments/{payment}/refund', RefundController::class)",
        "        ->middleware('abilities:' . TokenAbility::PaymentsRefund->value);",
        "});"
      ]
    },
    {
      "title": "Policy'da birlashtirish",
      "lang": "php",
      "code": [
        "class PaymentPolicy",
        "{",
        "    public function refund(User $user, Payment $payment): bool",
        "    {",
        "        return $user->can('payments.refund')                       // foydalanuvchi ruxsati",
        "            && $user->tokenCan(TokenAbility::PaymentsRefund->value)  // token ability",
        "            && $payment->tenant_id === $user->tenant_id;           // obyekt doirasi",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Faqat abilities'ga tayanib, SPA session'ida `tokenCan()` doim `true` qaytarishini unutish.",
    "Token'larni `['*']` bilan yaratish.",
    "Ability nomlarini kod bo'ylab satr sifatida tarqatish: typo'lar va nomuvofiqlik.",
    "Middleware alias'larini ro'yxatdan o'tkazmasdan `abilities:` ishlatish: `Target class [abilities] does not exist`."
  ]
});
