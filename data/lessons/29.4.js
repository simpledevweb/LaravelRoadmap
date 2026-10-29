/* Chuqur dars: 29.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.4", {
  "lesson": [
    "### Autentifikatsiya testlari",
    "Autentifikatsiya oqimi har bir ilovaning eng nozik joyi. Uni feature testlar bilan to'liq qoplash kerak, chunki xato bu yerda to'g'ridan-to'g'ri xavfsizlik teshigi.",
    "",
    "### Nimani tekshirish kerak",
    "- **Mehmon**: himoyalangan sahifaga kirsa web'da `/login` ga redirect, API'da `401`.",
    "- **To'g'ri ma'lumot bilan login**: sessiya yoki token beriladi, foydalanuvchi autentifikatsiya qilingan.",
    "- **Noto'g'ri ma'lumot**: xato xabari, foydalanuvchi mehmon bo'lib qoladi, xabar \"email yo'q\" va \"parol noto'g'ri\" ni ajratmaydi (hisob mavjudligini oshkor qilmaslik uchun).",
    "- **Logout**: sessiya/token bekor qilinadi.",
    "- **\"Eslab qolish\"** (remember me), **parol tiklash** va **email tasdiqlash** (`verified` middleware) oqimlari.",
    "- **Rate limit**: ketma-ket xato urinishlardan keyin `429`.",
    "",
    "### Yordamchi metodlar",
    "- `actingAs($user)`: testda foydalanuvchi sifatida kirish (login sahifasisiz). Boshqa testlar uchun odatiy tanlov.",
    "- `Sanctum::actingAs($user, ['orders:read'])`: token ability'lari bilan.",
    "- `assertAuthenticated()`, `assertAuthenticatedAs($user)`, `assertGuest()`: login natijasini tekshirish.",
    "",
    "### Qachon haqiqiy login, qachon actingAs",
    "Login oqimining o'zini testlayotgan bo'lsangiz, haqiqiy `post('/login')` yuboring. Boshqa barcha testlarda `actingAs` tezroq va soddaroq. Parollarni testda xeshlash sekin bo'lgani uchun `BCRYPT_ROUNDS=4` o'rnating.",
    "",
    "### Vaqtga bog'liq holatlar",
    "Token muddati, parol tiklash havolasi muddati, sessiya timeout. Buni `travel()` yoki `Carbon::setTestNow()` bilan vaqtni ilgari surib sinang."
  ],
  "examples": [
    {
      "title": "Login va noto'g'ri parol",
      "lang": "php",
      "code": [
        "it('logs in with valid credentials', function () {",
        "    $user = User::factory()->create(['password' => 'secret-pass']);",
        "",
        "    $this->post('/login', ['email' => $user->email, 'password' => 'secret-pass'])",
        "        ->assertRedirect('/dashboard');",
        "",
        "    $this->assertAuthenticatedAs($user);",
        "});",
        "",
        "it('rejects a wrong password without leaking which part failed', function () {",
        "    $user = User::factory()->create();",
        "",
        "    $this->post('/login', ['email' => $user->email, 'password' => 'wrong'])",
        "        ->assertSessionHasErrors('email');",
        "",
        "    $this->assertGuest();",
        "});"
      ],
      "note": "Xato maydoni bir xil, hisob mavjudligi oshkor bo'lmaydi."
    },
    {
      "title": "Mehmon va login rate limit",
      "lang": "php",
      "code": [
        "it('blocks guests on api', fn () => $this->getJson('/api/orders')->assertUnauthorized());",
        "",
        "it('throttles repeated failed logins', function () {",
        "    $user = User::factory()->create();",
        "",
        "    foreach (range(1, 5) as $_) {",
        "        $this->postJson('/api/login', ['email' => $user->email, 'password' => 'bad']);",
        "    }",
        "",
        "    $this->postJson('/api/login', ['email' => $user->email, 'password' => 'bad'])",
        "        ->assertTooManyRequests();",
        "});"
      ],
      "note": "Limit soni sizning throttle sozlamangizga mos bo'lsin."
    }
  ],
  "pitfalls": [
    "Hamma testda haqiqiy login qilish: sekin va keraksiz. Login oqimidan tashqarida `actingAs` ishlating.",
    "Xato xabarida \"bunday email yo'q\" deb yozish va buni testlamaslik: hisob mavjudligi oshkor bo'ladi.",
    "`actingAs` bilan guard'ni noto'g'ri berish: web'da kirgan foydalanuvchi API guard'da mehmon bo'lib qoladi.",
    "Rate limit va token muddatini testlamaslik: bu xavfsizlik himoyasi ishlamasligi aniqlanmaydi."
  ]
});
