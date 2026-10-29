/* Chuqur dars: 29.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.2", {
  "lesson": [
    "### Javob assertion'lari",
    "`TestResponse` ko'plab tayyor tekshiruvlar beradi. Ularni toifalarga bo'lib bilish testni qisqa va o'qiladigan qiladi.",
    "",
    "### Status",
    "`assertOk` (200), `assertCreated` (201), `assertAccepted` (202), `assertNoContent` (204), `assertUnauthorized` (401), `assertForbidden` (403), `assertNotFound` (404), `assertUnprocessable` (422), `assertStatus($code)`. Aniq nomli metod `assertStatus(403)` dan o'qishga qulayroq.",
    "",
    "### Redirect",
    "`assertRedirect($url)`, `assertRedirectToRoute($name, $params)`, `assertRedirectBack`. Redirect testida avval `from()` bilan manbani bering.",
    "",
    "### Sarlavha va cookie",
    "`assertHeader('X-Request-Id')`, `assertHeaderMissing('X-Powered-By')`, `assertCookie('name')`. Xavfsizlik sarlavhalarini (masalan, `Cache-Control`, `Content-Security-Policy`) ham shu bilan sinash mumkin.",
    "",
    "### View va sessiya",
    "`assertViewIs('orders.show')`, `assertViewHas('order')`, `assertSee('matn')` (HTML ichida, escape qilingan holda), `assertSeeText` (teglarsiz matn), `assertSessionHas('status', 'qiymat')`, `assertSessionHasErrors(['email'])`.",
    "",
    "### Fayl",
    "`assertDownload('hisobot.csv')` yuklab olinadigan javobni tekshiradi.",
    "",
    "### Eng muhim qoida: status yetarli emas",
    "`assertOk()` faqat \"xato bo'lmadi\" degani. Endpoint noto'g'ri ma'lumot, bo'sh ro'yxat yoki boshqa foydalanuvchi ma'lumotini qaytarsa ham `200` bo'ladi. Shuning uchun status bilan birga **mazmunni** tekshiring: JSON yo'li, view ma'lumoti, DB holati. Tekshiruv nechta bo'lsa shuncha ishonch, lekin har assertion muhim narsani tekshirsin, shunchaki \"ko'proq\" uchun emas."
  ],
  "examples": [
    {
      "title": "Redirect va sessiya",
      "lang": "php",
      "code": [
        "it('redirects to the new order with a flash message', function () {",
        "    $this->actingAs($user)",
        "        ->post('/orders', $data)",
        "        ->assertRedirectToRoute('orders.show', Order::first())",
        "        ->assertSessionHas('status', 'Buyurtma yaratildi');",
        "});"
      ],
      "note": "Redirect manzili va flash xabari birgalikda tekshiriladi."
    },
    {
      "title": "Status va mazmun birga",
      "lang": "php",
      "code": [
        "it('lists only my orders', function () {",
        "    $mine = Order::factory()->for($me)->create();",
        "    Order::factory()->create(); // boshqa foydalanuvchiniki",
        "",
        "    $this->actingAs($me)",
        "        ->getJson('/api/orders')",
        "        ->assertOk()",
        "        ->assertJsonCount(1, 'data')",
        "        ->assertJsonPath('data.0.id', $mine->id)",
        "        ->assertHeader('Cache-Control', 'no-store, private');",
        "});"
      ],
      "note": "Faqat 200 emas, qaysi ma'lumot qaytgani ham tekshiriladi."
    }
  ],
  "pitfalls": [
    "Faqat `assertOk()` bilan cheklanish: noto'g'ri yoki bo'sh javob ham o'tib ketadi.",
    "`assertSee` bilan HTML ichidagi matnni izlashda escape'ni unutish: `&amp;` va `'` o'zgargan bo'ladi, `assertSeeText` yoki `e()` ishlating.",
    "Redirect testida `from()` bermaslik: `back()` kutilmagan joyga qaytaradi.",
    "Juda ko'p assertion bir testda: yiqilganda nima buzilgani noaniq bo'ladi. Bitta test bitta xatti-harakatni tekshirsin."
  ]
});
