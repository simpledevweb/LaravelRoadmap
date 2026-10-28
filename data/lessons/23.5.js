/* Chuqur dars: 23.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.5", {
  "lesson": [
    "### Ikki darajadagi muddat",
    "1. **Global:** `config/sanctum.php` → `'expiration' => 60 * 24 * 30` (daqiqalarda). Har token uchun `created_at + expiration` dan keyin yaroqsiz. Default **`null`** — muddatsiz. Bu production uchun xavfli default.",
    "2. **Token darajasida:** `createToken($name, $abilities, now()->addDays(7))` → `expires_at` ustuni. Har token o'z muddatiga ega bo'lishi mumkin.",
    "",
    "Ikkalasi ham tekshiriladi: token global muddatdan ham, o'z `expires_at` idan ham o'tgan bo'lmasligi kerak.",
    "",
    "### SPA rejimiga ta'siri",
    "`expiration` faqat **token'larga** ta'sir qiladi. SPA session'larining muddati `SESSION_LIFETIME` bilan boshqariladi.",
    "",
    "### Qanday muddat tanlash",
    "- Mobil ilova: 30–90 kun. Uzoqroq bo'lsa ham, foydalanuvchi faol bo'lganda yangilanadigan mexanizm bilan.",
    "- Integratsiya token'lari: 30–90 kun yoki maksimal 1 yil, rotatsiya eslatmasi bilan.",
    "- Qisqa muddatli vazifalar (CI job, bir martalik eksport): soatlar yoki kunlar.",
    "- Ichki servis token'lari: qisqa va avtomatik yangilanadigan.",
    "",
    "### Sanctum'da refresh yo'q",
    "Sanctum'da refresh token mexanizmi yo'q. Uzoq sessiyali mobil ilova uchun variantlar:",
    "1. **Uzoq muddatli token** (30–90 kun) + muddat tugaganda qayta login. Sodda va ko'p ilovalar uchun yetarli.",
    "2. **Sliding expiration:** har foydalanishda (yoki kuniga bir marta) `expires_at` ni uzaytirish. Faol foydalanuvchi chiqib ketmaydi, harakatsiz qurilma o'zi eskiradi. Absolyut chegara qo'shing.",
    "3. **O'z refresh endpoint'ingiz:** qisqa muddatli access PAT + alohida refresh token (20.15).",
    "4. Passport'ga o'tish (OAuth refresh token).",
    "",
    "### Muddati o'tgan token'larni tozalash",
    "Muddati o'tgan yozuvlar DB'da qoladi. `php artisan sanctum:prune-expired --hours=24` — `expires_at` (va global `expiration`) dan 24 soat oldin muddati tugaganlarni o'chiradi. Scheduler'da kunlik.",
    "",
    "### Mijozga muddatni bildirish",
    "Token berishda `expires_at` ni javobda qaytaring. Mijoz muddat yaqinlashganda foydalanuvchini ogohlantiradi yoki qayta login'ga yo'naltiradi. Muddati o'tgan token bilan so'rov — `401`."
  ],
  "examples": [
    {
      "title": "Global va token muddati",
      "lang": "php",
      "code": [
        "// config/sanctum.php",
        "'expiration' => env('SANCTUM_EXPIRATION', 60 * 24 * 90),   // 90 kun, maksimal chegara",
        "",
        "// Har token o'z muddati bilan",
        "$mobile = $user->createToken('Android — Ali', ['orders:read', 'orders:write'], now()->addDays(30));",
        "$ci = $user->createToken('CI deploy', ['deploy:run'], now()->addHours(2));",
        "",
        "// routes/console.php",
        "Schedule::command('sanctum:prune-expired --hours=24')->daily();"
      ]
    },
    {
      "title": "Sliding expiration middleware",
      "lang": "php",
      "code": [
        "final class SlideTokenExpiration",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        $response = $next($request);",
        "        $token = $request->user()?->currentAccessToken();",
        "",
        "        if ($token instanceof PersonalAccessToken",
        "            && $token->expires_at",
        "            && $token->expires_at->lt(now()->addDays(25))",
        "            && $token->created_at->gt(now()->subDays(180))) {   // absolyut chegara",
        "            $token->forceFill(['expires_at' => now()->addDays(30)])->save();",
        "        }",
        "",
        "        return $response;",
        "    }",
        "}"
      ],
      "note": "Yozuv faqat qolgan muddat 25 kundan kam bo'lganda yangilanadi, shuning uchun har so'rovda DB'ga yozilmaydi."
    }
  ],
  "pitfalls": [
    "`expiration = null` ni production'da qoldirish.",
    "Global muddatni SPA session muddatiga ta'sir qiladi deb o'ylash.",
    "Muddati o'tgan token'larni tozalamaslik: jadval cheksiz o'sadi.",
    "Sliding expiration'ga absolyut chegara qo'ymaslik: token amalda abadiy bo'ladi."
  ]
});
