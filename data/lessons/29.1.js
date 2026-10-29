/* Chuqur dars: 29.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.1", {
  "lesson": [
    "### Laravel HTTP testlari nima",
    "Laravel test client'i haqiqiy HTTP serversiz ishlaydi: so'rov to'g'ridan-to'g'ri ilova kernel'iga beriladi va u route, middleware, controller, DB va javob zanjirini to'liq bajaradi. Shuning uchun feature testlar tez va aniq, lekin butun stekni sinaydi.",
    "",
    "### So'rov yuborish metodlari",
    "- `get`, `post`, `put`, `patch`, `delete`: oddiy so'rovlar.",
    "- `getJson`, `postJson`, `putJson`, `patchJson`, `deleteJson`: `Accept: application/json` va JSON tanasi bilan. API testlari uchun asosiy tanlov.",
    "- `json($method, $uri, $data)`: istalgan metod uchun.",
    "",
    "### So'rovni sozlash",
    "- `actingAs($user)`: foydalanuvchi sifatida kirish (guard'ni `actingAs($user, 'api')` bilan berish mumkin).",
    "- `withHeaders([...])`, `withToken($token)`: sarlavhalar va Bearer token.",
    "- `withCookies([...])`, `withSession([...])`: cookie va sessiya.",
    "- `from($url)`: redirect uchun manba (back() ishlashi uchun).",
    "- `withoutMiddleware()`: middleware'ni o'chirish. Faqat aniq sabab bilan ishlating.",
    "",
    "### Javob obyekti",
    "Natija `TestResponse`: ko'plab `assert...` metodlari, shuningdek `json('data.id')` (qiymatni olish), `dump()` va `dd()` (debug) bor. Zanjir uslubi o'qishni osonlashtiradi: so'rov, status, mazmun.",
    "",
    "### Yaxshi test tuzilishi",
    "Arrange, Act, Assert: avval ma'lumot tayyorlang (factory), keyin so'rov yuboring, oxirida natijani tekshiring. Test nomi xatti-harakatni ifodalasin (\"egasiga buyurtmani ko'rsatadi\"), metod nomini emas. URL'larni qo'lda yozmasdan `route('orders.show', $order)` ishlating: route o'zgarganda testlar sinmaydi."
  ],
  "examples": [
    {
      "title": "Egasi buyurtmani ko'radi",
      "lang": "php",
      "code": [
        "it('shows an order to its owner', function () {",
        "    $order = Order::factory()->create();",
        "",
        "    $this->actingAs($order->customer->user)",
        "        ->getJson(route('api.orders.show', $order))",
        "        ->assertOk()",
        "        ->assertJsonPath('data.id', $order->id);",
        "});"
      ],
      "note": "Route nomi orqali URL, JSON yo'li orqali mazmun tekshiriladi."
    },
    {
      "title": "Token va sarlavha bilan",
      "lang": "php",
      "code": [
        "it('accepts a bearer token and a locale header', function () {",
        "    $token = $user->createToken('tests')->plainTextToken;",
        "",
        "    $this->withToken($token)",
        "        ->withHeaders(['Accept-Language' => 'uz'])",
        "        ->getJson('/api/me')",
        "        ->assertOk()",
        "        ->assertJsonPath('data.locale', 'uz');",
        "});"
      ],
      "note": "withToken va withHeaders so'rovdan oldin zanjirda chaqiriladi."
    }
  ],
  "pitfalls": [
    "URL'larni qo'lda yozish: route o'zgarsa ko'plab testlar bir vaqtda sinadi. `route()` ishlating.",
    "`withoutMiddleware()` ni keng ishlatish: xavfsizlik va autentifikatsiya tekshiruvlari testdan tushib qoladi.",
    "API testida `get` o'rniga `getJson` ishlatmaslik: validatsiya xatosi JSON emas, redirect bo'lib qaytadi.",
    "Faqat statusni tekshirish: noto'g'ri ma'lumot qaytsa ham `200` yashil bo'ladi."
  ]
});
