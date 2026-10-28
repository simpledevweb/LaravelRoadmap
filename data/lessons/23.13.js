/* Chuqur dars: 23.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.13", {
  "lesson": [
    "### Foydalanuvchi o'z token'larini boshqaradi",
    "Xavfsizlikning muhim qismi — foydalanuvchiga nazorat berish. \"Sozlamalar → Qurilmalar va API token'lar\" sahifasi:",
    "- **Ro'yxat:** nom (qurilma yoki maqsad), yaratilgan sana, **oxirgi ishlatilgan** vaqt (`last_used_at`), muddati (`expires_at`), abilities. Ixtiyoriy: oxirgi IP va taxminiy joylashuv (alohida ustunlarda saqlash kerak, Sanctum default'da saqlamaydi).",
    "- **Joriy qurilma belgisi:** \"Bu qurilma\".",
    "- **Bekor qilish** har biri uchun va \"Barcha boshqa qurilmalardan chiqish\".",
    "- **Yangi token yaratish** (integratsiyalar uchun, 23.3): nom, abilities, muddat. Token bir marta ko'rsatiladi.",
    "",
    "Foydalanuvchi notanish qurilmani ko'rsa, o'zi bekor qiladi. Bu support'ga murojaat va kech aniqlanishdan yaxshiroq.",
    "",
    "### API endpoint'lari",
    "- `GET /api/tokens` — ro'yxat (hash'siz! faqat metadata).",
    "- `POST /api/tokens` — yaratish (parolni qayta tasdiqlash bilan).",
    "- `DELETE /api/tokens/{id}` — bekor qilish. **Faqat o'z** token'lari: `$request->user()->tokens()->findOrFail($id)`, global `PersonalAccessToken::find()` emas (IDOR, 20.13).",
    "- `DELETE /api/tokens` — joriydan tashqari hammasi.",
    "",
    "### last_used_at",
    "Sanctum har muvaffaqiyatli autentifikatsiyada `last_used_at` ni yangilaydi. Yuqori yukda bu har so'rovga bitta `UPDATE` qo'shadi. Agar muammo bo'lsa: yangilashni o'chirib, keshda yig'ib, vaqti-vaqti bilan yozish (yoki faqat har N daqiqada yangilash). Sanctum 4 da `Sanctum::$lastUsedAtUpdates` kabi sozlamalar yo'q, shuning uchun bu maxsus `PersonalAccessToken` modelini va `Sanctum::usePersonalAccessTokenModel()` ni talab qiladi.",
    "",
    "### Admin tomonidan boshqarish",
    "Support va xavfsizlik jamoasi uchun: foydalanuvchining token'larini ko'rish va bekor qilish (audit bilan). Shubhali faollikda (hisob egallab olinishi) — barcha token va session'larni bekor qilish va parolni majburiy tiklash.",
    "",
    "### Xabarnomalar",
    "- Yangi qurilmadan login — email yoki push (\"Agar bu siz bo'lmasangiz...\" havolasi bilan).",
    "- Yangi API token yaratildi.",
    "- Token'lar ommaviy bekor qilindi.",
    "",
    "### Tozalash",
    "Uzoq ishlatilmagan token'larni (masalan, 90 kun `last_used_at` yo'q) avtomatik bekor qilish va foydalanuvchiga xabar. Muddati o'tganlarni `sanctum:prune-expired` (23.5)."
  ],
  "examples": [
    {
      "title": "Token boshqaruvi controller'i",
      "lang": "php",
      "code": [
        "final class TokenController",
        "{",
        "    public function index(Request $request)",
        "    {",
        "        $current = $request->user()->currentAccessToken();",
        "",
        "        return $request->user()->tokens()",
        "            ->latest('last_used_at')",
        "            ->get(['id', 'name', 'abilities', 'last_used_at', 'expires_at', 'created_at'])",
        "            ->map(fn ($t) => [...$t->toArray(), 'is_current' => $current instanceof PersonalAccessToken && $current->id === $t->id]);",
        "    }",
        "",
        "    public function destroy(Request $request, int $id)",
        "    {",
        "        $request->user()->tokens()->findOrFail($id)->delete();   // faqat o'z token'i",
        "        return response()->noContent();",
        "    }",
        "",
        "    public function destroyOthers(Request $request)",
        "    {",
        "        $current = $request->user()->currentAccessToken();",
        "",
        "        $request->user()->tokens()",
        "            ->when($current instanceof PersonalAccessToken, fn ($q) => $q->whereKeyNot($current->id))",
        "            ->delete();",
        "",
        "        return response()->noContent();",
        "    }",
        "}"
      ]
    },
    {
      "title": "Uzoq ishlatilmagan token'larni bekor qilish",
      "lang": "php",
      "code": [
        "// routes/console.php",
        "Schedule::call(function () {",
        "    PersonalAccessToken::query()",
        "        ->where(fn ($q) => $q->where('last_used_at', '<', now()->subDays(90))",
        "            ->orWhere(fn ($q) => $q->whereNull('last_used_at')->where('created_at', '<', now()->subDays(90))))",
        "        ->chunkById(500, function ($tokens) {",
        "            $tokens->each(function ($t) {",
        "                $t->tokenable?->notify(new TokenAutoRevoked($t->name));",
        "                $t->delete();",
        "            });",
        "        });",
        "})->daily();"
      ]
    }
  ],
  "pitfalls": [
    "`PersonalAccessToken::find($id)->delete()` bilan bekor qilish: boshqa foydalanuvchining token'ini o'chirish mumkin (IDOR).",
    "Ro'yxat API'sida token hash'ini qaytarish.",
    "Foydalanuvchiga faol qurilmalarni ko'rish imkoniyatini bermaslik.",
    "Yuqori yukda `last_used_at` yangilanishining DB'ga ta'sirini hisobga olmaslik."
  ]
});
