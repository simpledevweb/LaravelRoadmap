/* Chuqur dars: 26.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.10", {
  "lesson": [
    "### Pest'da HTTP testlari",
    "Laravel HTTP testlari (29.x) Pest'da xuddi shunday ishlaydi, faqat sintaksis qisqaroq. Laravel so'rovni haqiqiy tarmoq orqali emas, ilova ichida **simulyatsiya** qiladi: middleware, routing, controller, validatsiya, javob — hammasi haqiqiy, lekin tez.",
    "",
    "### So'rov metodlari",
    "- `get`, `post`, `put`, `patch`, `delete` — HTML/form so'rovlar.",
    "- `getJson`, `postJson`, `putJson`, `patchJson`, `deleteJson` — `Accept: application/json` bilan. API testlari uchun doim shular (aks holda validatsiya xatosi `302` redirect bo'ladi, 18.8).",
    "- `withHeaders([...])`, `withToken($token)`, `withCookie()`, `withoutMiddleware()`, `from('/previous')`.",
    "- Fayl: `postJson('/upload', ['file' => UploadedFile::fake()->image('a.jpg')])`.",
    "",
    "### Javob tekshiruvlari",
    "- Status: `assertOk()`, `assertCreated()`, `assertNoContent()`, `assertNotFound()`, `assertForbidden()`, `assertUnauthorized()`, `assertUnprocessable()`, `assertRedirect('/login')`.",
    "- JSON: `assertJson([...])` (qisman), `assertExactJson()`, `assertJsonPath('data.status', 'paid')`, `assertJsonCount(3, 'data')`, `assertJsonStructure()`, `assertJsonMissingPath()`, `assertJsonValidationErrors(['email'])`.",
    "- Fluent: `->assertJson(fn (AssertableJson $json) => $json->has('data', 3)->where('meta.per_page', 20)->etc())`.",
    "- HTML: `assertSee('Buyurtma')`, `assertSeeText()`, `assertViewIs()`, `assertViewHas('orders')`.",
    "- Header va cookie: `assertHeader('Location')`, `assertCookie()`.",
    "",
    "### Pest bilan birlashtirish",
    "Laravel assertion'lari va Pest `expect()` birga: `$response = getJson('/api/v1/me')->assertOk();` va `expect($response->json('data'))->toHaveKeys(['id', 'email'])->email->toBe($user->email)`.",
    "",
    "### Har endpoint uchun to'plam",
    "Muvaffaqiyat, validatsiya, autentifikatsiya, avtorizatsiya va boshqa foydalanuvchi resursi (IDOR) holatlari (18.20). Pest dataset'lari (26.4) bilan ruxsatlar matritsasi qisqa yoziladi.",
    "",
    "### Debug",
    "Kutilmagan 500 bo'lsa, `$response->dump()`, `->dumpHeaders()` yoki `withoutExceptionHandling()` bilan haqiqiy exception'ni ko'rish (25.8)."
  ],
  "examples": [
    {
      "title": "API endpoint test to'plami",
      "lang": "php",
      "code": [
        "use Laravel\\Sanctum\\Sanctum;",
        "use Illuminate\\Testing\\Fluent\\AssertableJson;",
        "",
        "it('lists only own orders', function () {",
        "    $user = User::factory()->hasOrders(3)->create();",
        "    Order::factory()->count(2)->create();",
        "    Sanctum::actingAs($user, ['orders:read']);",
        "",
        "    $this->getJson('/api/v1/orders')",
        "        ->assertOk()",
        "        ->assertJson(fn (AssertableJson $json) => $json",
        "            ->has('data', 3)",
        "            ->has('data.0', fn ($o) => $o->hasAll(['id', 'status', 'total'])->etc())",
        "            ->etc());",
        "});",
        "",
        "it('validates required fields', function () {",
        "    Sanctum::actingAs(User::factory()->create(), ['orders:write']);",
        "",
        "    $this->postJson('/api/v1/orders', [])",
        "        ->assertUnprocessable()",
        "        ->assertJsonValidationErrors(['items']);",
        "});",
        "",
        "it('requires authentication')",
        "    ->getJson('/api/v1/orders')",
        "    ->assertUnauthorized();"
      ],
      "note": "Oxirgi test — Pest'ning \"higher order\" uslubi: yopilmasiz, metodlar to'g'ridan-to'g'ri test obyektida chaqiriladi."
    }
  ],
  "pitfalls": [
    "API testlarida `get()` va `post()` ishlatish: validatsiya xatosi `302` va noto'g'ri tekshiruv.",
    "Faqat status kodni tekshirib, javob tuzilmasi va DB holatini tekshirmaslik.",
    "Boshqa foydalanuvchi resursi uchun testlarsiz endpoint'lar.",
    "`assertExactJson` ni keraksiz ishlatish: har yangi maydon testlarni sindiradi."
  ]
});
