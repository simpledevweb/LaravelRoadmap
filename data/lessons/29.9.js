/* Chuqur dars: 29.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.9", {
  "lesson": [
    "### Middleware testlari",
    "Middleware so'rov controller'ga yetguncha (yoki javob qaytguncha) uni o'zgartiradi yoki to'xtatadi: autentifikatsiya, locale, tenant aniqlash, rate limit, sarlavha qo'shish. Ularni ikki darajada testlash mumkin.",
    "",
    "### 1. Middleware'ni to'g'ridan-to'g'ri",
    "Middleware klassini yarating va `handle()` ni qo'lda chaqiring: `$middleware->handle($request, fn ($r) => new Response('ok'))`. Bu tez va izolyatsiyalangan: so'rovning o'zgarishini va qaytgan javobni tekshirasiz. Murakkab mantiqli middleware uchun foydali.",
    "",
    "### 2. Route orqali",
    "Middleware route'ga qo'llanganda butun zanjir ishlaydi. Test uchun vaqtinchalik route e'lon qilish mumkin: `Route::middleware(SetLocale::class)->get('/_test', fn () => app()->getLocale())`. Bu middleware'ning haqiqiy ishlashini (sarlavha qo'shildi, locale o'rnatildi, so'rov bloklandi) tekshiradi va uni haqiqiy route'larga bog'lamaydi.",
    "",
    "### Nimani tekshirish kerak",
    "- So'rovga qo'shilgan ma'lumot (atribut, tenant).",
    "- Javobga qo'shilgan sarlavha.",
    "- Shart bajarilmaganda to'xtatish (`abort`, redirect).",
    "- Tartib: middleware boshqasidan oldin yoki keyin ishlashi muhim bo'lsa (masalan, autentifikatsiya locale'dan oldin).",
    "",
    "### withoutMiddleware xavfi",
    "Boshqa testlarda `withoutMiddleware()` ni keng ishlatmang. Xavfsizlik middleware'larini (auth, CSRF, throttle) chetlab o'tgan test yashil bo'ladi, lekin production'da u middleware ishlaydi va xatti-harakat boshqacha. Muayyan middleware'ni o'chirish uchun `withoutMiddleware(ThrottleRequests::class)` kabi aniq belgilang.",
    "",
    "### Global middleware",
    "Global middleware (barcha so'rovlarga) har feature testda ishlaydi, shuning uchun ularni alohida testlash kerak, lekin ularning ta'siri boshqa testlarda ham seziladi."
  ],
  "examples": [
    {
      "title": "Middleware'ni to'g'ridan-to'g'ri",
      "lang": "php",
      "code": [
        "it('adds the request id header', function () {",
        "    $middleware = new AddRequestId();",
        "    $request = Request::create('/anything');",
        "",
        "    $response = $middleware->handle($request, fn ($r) => new Response('ok'));",
        "",
        "    expect($response->headers->get('X-Request-Id'))->not->toBeEmpty();",
        "});"
      ],
      "note": "Izolyatsiyalangan va tez: route va controller kerak emas."
    },
    {
      "title": "Vaqtinchalik route bilan",
      "lang": "php",
      "code": [
        "it('sets the locale from the header', function () {",
        "    Route::middleware(SetLocale::class)->get('/_locale', fn () => app()->getLocale());",
        "",
        "    $this->get('/_locale', ['Accept-Language' => 'ru'])->assertSee('ru');",
        "    $this->get('/_locale', ['Accept-Language' => 'xx'])->assertSee(config('app.locale'));",
        "});"
      ],
      "note": "Noma'lum til bo'lsa, standart locale qaytishi ham tekshiriladi."
    }
  ],
  "pitfalls": [
    "`withoutMiddleware()` ni umumiy ishlatish: xavfsizlik middleware'lari testdan tushib qoladi.",
    "Faqat middleware'ni to'g'ridan-to'g'ri testlash: route'ga ulanishi yoki tartibi noto'g'ri bo'lishi aniqlanmaydi.",
    "Middleware tartibini hisobga olmaslik: tenant aniqlanmasdan oldin ishlagan middleware kutilmagan natija beradi.",
    "Vaqtinchalik test route'ini boshqa testlarda ham qoldirish: `Route::` e'lonlari test jarayoni davomida saqlanadi."
  ]
});
