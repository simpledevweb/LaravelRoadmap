/* Chuqur dars: 26.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.2", {
  "lesson": [
    "### Ikki funksiya, bitta mexanizm",
    "`test()` va `it()` texnik jihatdan bir xil: ikkalasi ham test ro'yxatdan o'tkazadi. Farq faqat **nomlash uslubida**:",
    "- `test('user can log in', ...)` — tavsif to'liq gap. Natijada: `✓ user can log in`.",
    "- `it('logs the user in', ...)` — Pest tavsifga avtomatik `it` qo'shadi. Natijada: `✓ it logs the user in`. BDD uslubida \"u ... qiladi\" ko'rinishida o'qiladi.",
    "",
    "Jamoa bittasini tanlasin. Ko'pchilik `it()` ni xulq-atvor tavsifi uchun qulay deb biladi.",
    "",
    "### describe() bilan guruhlash",
    "`describe('checkout', function () { it(...); it(...); });` — bog'liq testlarni bitta blokka yig'adi. Natijada tavsiflar ichma-ich chiqadi: `checkout → it applies coupon`. `describe` ichidagi `beforeEach` faqat shu blok uchun ishlaydi (26.5).",
    "",
    "### Test modifikatorlari",
    "Zanjir orqali qo'shiladi:",
    "- `->skip('sabab')`, `->skip(fn () => ! extension_loaded('redis'))` — shartli o'tkazib yuborish.",
    "- `->todo()` — hali yozilmagan test (ro'yxatda ko'rinadi).",
    "- `->only()` — faqat shu testni ishga tushirish (lokal debug uchun, commit qilmang).",
    "- `->group('slow')` — guruh.",
    "- `->with([...])` — dataset (26.4).",
    "- `->throws(InsufficientBalance::class, 'yetarli emas')` — exception kutish.",
    "- `->repeat(50)` — flaky testni tekshirish (25.18).",
    "- `->depends('other test')` — odatda tavsiya etilmaydi (25.14).",
    "- PHPUnit atributlarining ekvivalenti: `->covers(Discount::class)`.",
    "",
    "### Yaxshi tavsif yozish",
    "- Xulq-atvorni ayting, implementatsiyani emas: `it('rejects expired coupons')`, `it('calls validateCoupon')` emas.",
    "- Shartni qo'shing: `it('returns 404 for another tenant order')`.",
    "- Yiqilganda tavsifning o'zi muammoni aytsin.",
    "",
    "### Arrow funksiya",
    "Bitta qatorli testlar uchun: `it('is active by default', fn () => expect(new User)->is_active->toBeTrue());`. Bunda `$this` ham ishlaydi (arrow funksiya kontekstni avtomatik bog'laydi)."
  ],
  "examples": [
    {
      "title": "describe, it va modifikatorlar",
      "lang": "php",
      "code": [
        "describe('coupons', function () {",
        "    beforeEach(fn () => $this->order = Order::factory()->create(['total' => 200_000]));",
        "",
        "    it('applies a valid coupon', function () {",
        "        $coupon = Coupon::factory()->percent(10)->create();",
        "",
        "        expect($this->order->applyCoupon($coupon)->total)->toBe(180_000);",
        "    });",
        "",
        "    it('rejects an expired coupon', function () {",
        "        $coupon = Coupon::factory()->expired()->create();",
        "",
        "        $this->order->applyCoupon($coupon);",
        "    })->throws(CouponExpired::class);",
        "",
        "    it('supports stacking coupons')->todo();",
        "});"
      ]
    },
    {
      "title": "Shartli skip",
      "lang": "php",
      "code": [
        "it('uses redis locks', function () {",
        "    // ...",
        "})->skip(fn () => config('cache.default') !== 'redis', 'Redis kesh kerak');"
      ]
    }
  ],
  "pitfalls": [
    "`->only()` ni commit qilib qo'yish: CI faqat bitta testni ishga tushiradi va qolganlari jim o'tkazib yuboriladi.",
    "`it('test login')` kabi ma'nosiz tavsiflar: chiqishda \"it test login\" bo'ladi.",
    "`describe` ichidagi `beforeEach` boshqa bloklarga ham ta'sir qiladi deb kutish.",
    "`->todo()` testlarini uzoq muddat unutib qo'yish."
  ]
});
