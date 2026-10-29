/* Chuqur dars: 29.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.3", {
  "lesson": [
    "### Route testlari nimani tekshiradi",
    "Route darajasidagi testlar so'rov to'g'ri joyga yetib borishini kafolatlaydi: route mavjud, to'g'ri controller'ga bog'langan, kerakli middleware qo'llangan, parametrlar to'g'ri ishlanadi.",
    "",
    "### Nomlangan route'lar",
    "URL'ni qo'lda yozish o'rniga `route('orders.show', $order)` ishlating. Route yo'li o'zgarsa, testlar sinmaydi. Shuningdek, nomlangan route'ning mavjudligini testda tekshirish ham mumkin: nomi yo'q bo'lsa `route()` exception beradi.",
    "",
    "### Route model binding",
    "- Mavjud bo'lmagan id: avtomatik `404`.",
    "- **Scoped binding**: `/users/{user}/posts/{post}` da post boshqa foydalanuvchiga tegishli bo'lsa, `404`. Bu IDOR'dan himoyalovchi muhim xatti-harakat va uni testlash kerak.",
    "- Soft delete: standart holatda o'chirilgan model topilmaydi (`404`), `withTrashed()` bilan topiladi.",
    "- Maxsus kalit (`getRouteKeyName`, `{post:slug}`): slug bo'yicha topilishi.",
    "",
    "### Parametr cheklovlari",
    "`where('id', '[0-9]+')` yoki `whereUuid` kabi cheklovlar noto'g'ri qiymatga `404` berishini tekshiring.",
    "",
    "### Middleware qo'llanganligi",
    "Route'da kerakli middleware borligini `route:list` yoki testda `$route->gatherMiddleware()` orqali tekshirish mumkin. Eng foydali tekshiruv — **avtomatik**: barcha himoyalangan route'lar autentifikatsiya talab qilishini bitta test bilan tekshirish. Shunda yangi route'ga middleware qo'shishni unutish tezda sezilib qoladi.",
    "",
    "### Eslatma",
    "Route ro'yxatini tekshirish tez va arzon, lekin u xatti-harakatni emas, tuzilmani sinaydi. Uni haqiqiy so'rovli feature testlar bilan to'ldiring."
  ],
  "examples": [
    {
      "title": "Himoyalanmagan route'larni ushlash",
      "lang": "php",
      "code": [
        "it('protects every api route except the public ones', function () {",
        "    $public = ['api/login', 'api/register', 'api/health'];",
        "",
        "    collect(Route::getRoutes()->getRoutes())",
        "        ->filter(fn ($r) => str_starts_with($r->uri(), 'api/') && ! in_array($r->uri(), $public))",
        "        ->each(fn ($r) => expect($r->gatherMiddleware())",
        "            ->toContain('auth:sanctum', \"{$r->uri()} himoyalanmagan\"));",
        "});"
      ],
      "note": "Yangi route'ga middleware qo'yish unutilsa, test darhol yiqiladi."
    },
    {
      "title": "Scoped binding",
      "lang": "php",
      "code": [
        "it('returns 404 for a post of another user', function () {",
        "    $owner = User::factory()->create();",
        "    $other = User::factory()->create();",
        "    $post  = Post::factory()->for($owner)->create();",
        "",
        "    $this->actingAs($owner)",
        "        ->getJson(\"/api/users/{$other->id}/posts/{$post->id}\")",
        "        ->assertNotFound();",
        "});"
      ],
      "note": "Post boshqa foydalanuvchi bilan bog'langan bo'lsa, scoped binding uni topmaydi."
    }
  ],
  "pitfalls": [
    "Route yo'lini testga qo'lda yozish: refaktoringda ko'plab testlar sinadi.",
    "Scoped binding'ni testlamaslik: begona resurs ochilib qolishi IDOR zaifligi bo'lishi mumkin.",
    "Soft delete bilan binding xatti-harakatini bilmaslik: o'chirilgan yozuv ba'zan kutilmaganda topilmaydi.",
    "Route ro'yxatini tekshirishni feature testning o'rniga ishlatish: tuzilma to'g'ri bo'lsa ham mantiq buzuq bo'lishi mumkin."
  ]
});
