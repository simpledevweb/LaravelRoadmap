/* Chuqur dars: 23.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("23.16", {
  "lesson": [
    "### `Sanctum::actingAs`",
    "Feature testlarda haqiqiy token yaratish va header qo'yish shart emas:",
    "`Sanctum::actingAs($user, ['orders:read'])` — keyingi so'rovlar `$user` sifatida, berilgan abilities bilan autentifikatsiyalangan. Abilities berilmasa, token hech qanday abilities'siz (`tokenCan()` → `false`). Hammasi uchun `['*']`.",
    "",
    "Bu tez va aniq, lekin token **tekshiruv mexanizmini** (hash, muddat, bekor qilish) chetlab o'tadi. Shuning uchun ikki turdagi test kerak.",
    "",
    "### 1. Biznes mantiq testlari",
    "`Sanctum::actingAs` bilan: endpoint to'g'ri ishlaydimi, ability yetmasa `403`, boshqa foydalanuvchi resursi `403/404` (20.21, 23.14).",
    "",
    "### 2. Autentifikatsiya mexanizmi testlari",
    "Haqiqiy token bilan, `withToken()` (yoki `withHeader('Authorization', 'Bearer ...')`):",
    "- Token yaratish endpoint'i: to'g'ri ma'lumot → token, noto'g'ri → `422`, rate limit → `429`.",
    "- Yaratilgan token bilan `GET /user` → `200`.",
    "- Token'siz → `401`.",
    "- Noto'g'ri yoki buzilgan token → `401`.",
    "- Muddati o'tgan token (`$this->travel(31)->days()`) → `401`.",
    "- Logout'dan keyin xuddi shu token → `401`.",
    "- Parol o'zgargandan keyin eski token → `401`.",
    "",
    "### Guard keshi tuzog'i",
    "Laravel test ichida birinchi so'rovdagi autentifikatsiyalangan foydalanuvchini guard'da keshlaydi. Logout yoki token bekor qilingandan keyingi ikkinchi so'rov ham **autentifikatsiyalangan** ko'rinishi mumkin va test yolg'on muvaffaqiyatsiz bo'ladi. Yechim: so'rovlar orasida `$this->app['auth']->forgetGuards();` (yoki `Auth::forgetGuards()`).",
    "",
    "### SPA oqimi testi",
    "Cookie asosidagi oqimni ham sinash mumkin:",
    "- `$this->withHeader('Origin', 'http://localhost:5173')` (stateful domen) va `$this->get('/sanctum/csrf-cookie')`.",
    "- Laravel testlarida CSRF default'da o'chiq (`runningUnitTests`), shuning uchun CSRF xatti-harakatini alohida sinash uchun middleware'ni qo'lda yoqish kerak bo'ladi.",
    "",
    "Ko'pincha SPA oqimining to'liq tekshiruvi E2E testlarda (Playwright, Cypress, Laravel Dusk) qulayroq: haqiqiy brauzer cookie, CORS va CSRF'ni haqiqiy qo'llaydi.",
    "",
    "### Test ma'lumotlari",
    "Har test o'z foydalanuvchisi va token'i bilan. Token'larni factory'da yaratish uchun `$user->createToken('test', [...])` yordamchisi."
  ],
  "examples": [
    {
      "title": "Biznes mantiq testlari (Pest)",
      "lang": "php",
      "code": [
        "use Laravel\\Sanctum\\Sanctum;",
        "",
        "it('lists own orders with read ability', function () {",
        "    $user = User::factory()->hasOrders(3)->create();",
        "    Order::factory()->count(2)->create();   // begona",
        "    Sanctum::actingAs($user, ['orders:read']);",
        "",
        "    $this->getJson('/api/v1/orders')->assertOk()->assertJsonCount(3, 'data');",
        "});",
        "",
        "it('forbids creating orders without write ability', function () {",
        "    Sanctum::actingAs(User::factory()->create(), ['orders:read']);",
        "    $this->postJson('/api/v1/orders', ['items' => []])->assertForbidden();",
        "});"
      ]
    },
    {
      "title": "Mexanizm testlari: haqiqiy token",
      "lang": "php",
      "code": [
        "it('issues a working token and revokes it on logout', function () {",
        "    $user = User::factory()->create(['password' => Hash::make('secret-password')]);",
        "",
        "    $token = $this->postJson('/api/auth/token', [",
        "        'email' => $user->email, 'password' => 'secret-password', 'device_name' => 'test',",
        "    ])->assertOk()->json('token');",
        "",
        "    $this->withToken($token)->getJson('/api/user')->assertOk()->assertJsonPath('data.id', $user->public_id);",
        "",
        "    $this->withToken($token)->postJson('/api/logout')->assertNoContent();",
        "    $this->app['auth']->forgetGuards();",
        "",
        "    $this->withToken($token)->getJson('/api/user')->assertUnauthorized();",
        "});",
        "",
        "it('rejects expired tokens', function () {",
        "    $user = User::factory()->create();",
        "    $token = $user->createToken('test', ['*'], now()->addDay())->plainTextToken;",
        "",
        "    $this->travel(2)->days();",
        "",
        "    $this->withToken($token)->getJson('/api/user')->assertUnauthorized();",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Faqat `Sanctum::actingAs` bilan test qilib, token muddati va bekor qilish mexanizmini hech qachon sinamaslik.",
    "Logout'dan keyin `forgetGuards()` siz ikkinchi so'rov: yolg'on natija.",
    "`Sanctum::actingAs($user)` abilities'siz chaqirib, `tokenCan()` `true` qaytaradi deb kutish.",
    "Testda CSRF o'chiq ekanini bilmasdan, SPA CSRF himoyasi ishlayapti deb hisoblash."
  ]
});
