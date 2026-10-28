/* Chuqur dars: 27.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.9", {
  "lesson": [
    "### Rad etish ham xulq-atvor",
    "Kod nima qilishi kabi, nimani **qilmasligi** ham muhim: noto'g'ri holatlarda aniq exception tashlashi va holatni buzmasligi kerak. Exception testlari mexanikasi 25.8 da. Unit testlardagi asosiy qoidalar:",
    "",
    "### Uch narsani tekshiring",
    "1. **To'g'ri exception turi** — aniq domen exception'i (`CouponExpired`, `InsufficientBalance`), umumiy `Exception` emas.",
    "2. **Ma'noli xabar yoki ma'lumot** — xabar matni yoki exception xususiyatlari (`$e->shortfall`, `$e->orderId`). Ular log, Sentry va foydalanuvchi xabari uchun kerak.",
    "3. **Holat o'zgarmagan** — exception'dan keyin obyekt avvalgi holatda: balans kamaymagan, kupon ishlatilgan deb belgilanmagan, element qo'shilmagan. Bu ko'pincha unutiladi va eng muhim qism.",
    "",
    "### Pest va PHPUnit",
    "- Pest: `expect(fn () => $wallet->withdraw(150))->toThrow(InsufficientBalance::class, 'yetarli emas');` yoki `->throws()` modifikatori.",
    "- PHPUnit: `$this->expectException()` Act'dan oldin. Holatni keyin tekshirish uchun `try/catch` + `$this->fail()` (25.8).",
    "",
    "### Domen exception'larini loyihalash",
    "- Har biznes rad etish sababi uchun aniq klass yoki bitta klass + kod (`DomainRuleViolation::code === 'coupon_expired'`).",
    "- Exception ichida kontekst (ID'lar, qiymatlar), lekin maxfiy ma'lumot emas.",
    "- Ular HTTP qatlamida aniq javobga aylantiriladi (18.13, `render()` metodi). Unit testda esa HTTP haqida o'ylamaysiz.",
    "",
    "### Validatsiya va invariantlar",
    "Qiymat obyektlari konstruktorda o'z invariantlarini tekshiradi: `new Money(-5)` → `InvalidArgumentException`, `new Email('abc')` → `InvalidEmail`. Bunday testlar \"noto'g'ri obyekt mavjud bo'la olmaydi\" degan kafolatni beradi va keyingi kodda tekshiruvlarni kamaytiradi."
  ],
  "examples": [
    {
      "title": "Turi, ma'lumoti va holat",
      "lang": "php",
      "code": [
        "it('refuses to apply an expired coupon and keeps the order intact', function () {",
        "    $order = Orders::pending(total: Money::uzs(200_000));",
        "    $coupon = Coupons::percent(10, expiresAt: '2025-06-01');",
        "",
        "    try {",
        "        $order->applyCoupon($coupon, now: new DateTimeImmutable('2025-06-02'));",
        "        $this->fail('CouponExpired kutilgan edi');",
        "    } catch (CouponExpired $e) {",
        "        expect($e->couponCode)->toBe($coupon->code);",
        "    }",
        "",
        "    expect($order->total())->toEqual(Money::uzs(200_000))",
        "        ->and($order->appliedCoupons())->toBeEmpty();",
        "});",
        "",
        "it('cannot create negative money', fn () =>",
        "    expect(fn () => Money::uzs(-1))->toThrow(InvalidArgumentException::class));"
      ]
    }
  ],
  "pitfalls": [
    "Faqat exception tashlanganini tekshirib, holat o'zgarmaganini tekshirmaslik.",
    "Umumiy `Exception::class` ni kutish: kutilmagan xatolar ham testni o'tkazadi.",
    "Xabar matniga to'liq bog'lanish: kichik tahrir testni sindiradi. Kalit qism yoki exception xususiyati yaxshiroq.",
    "Qiymat obyektlarida invariantlarni tekshirmaslik: noto'g'ri obyektlar tizim bo'ylab tarqaladi."
  ]
});
