/* Chuqur dars: 26.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.6", {
  "lesson": [
    "### Nega custom expectation",
    "Testlarda bir xil tekshiruv qayta-qayta takrorlansa (\"bu Money obyekti va summasi X\", \"bu O'zbekiston telefon raqami\", \"bu buyurtma to'langan\"), uni nomlangan expectation'ga aylantirish testlarni qisqa va domen tilida o'qiladigan qiladi: `expect($order)->toBePaid()`.",
    "",
    "### expect()->extend()",
    "`tests/Pest.php` da:",
    "`expect()->extend('toBePaid', function () { return $this->status->toBe(OrderStatus::Paid); });`",
    "",
    "- Yopilma ichida `$this` — `Expectation` obyekti, `$this->value` — tekshirilayotgan qiymat.",
    "- Ichkarida boshqa expectation'larni chaqirish mumkin (`$this->toBeInstanceOf(...)`), shunda yiqilish xabarlari ham tushunarli.",
    "- Yopilma `$this` (Expectation) ni qaytarishi kerak, shunda zanjir davom etadi: `expect($order)->toBePaid()->total->toBe(150000)`.",
    "- Parametrlar: `extend('toCost', function (int $amount, string $currency = 'UZS') { ... })`.",
    "",
    "### Assertion'lar bilan",
    "Murakkab tekshiruvda PHPUnit assertion'idan foydalanish mumkin: `test()->assertTrue(...)` yoki `expect(...)` chaqiruvlari. Muhimi — yiqilganda nima noto'g'riligi aniq ko'rinsin.",
    "",
    "### pipe va intercept",
    "Pest mavjud expectation'larni ma'lum turlar uchun o'zgartirish imkonini beradi:",
    "- `expect()->intercept('toBe', Money::class, fn (Money $expected) => ...)` — `Money` obyektlari uchun `toBe` qiymat bo'yicha solishtirsin.",
    "- `expect()->pipe('toBe', function (Closure $next, mixed $expected) { ... })` — umumiy middleware.",
    "",
    "Ular kamdan-kam kerak, lekin qiymat obyektlari bilan ko'p ishlaydigan loyihada foydali.",
    "",
    "### Tashkil qilish",
    "Ko'p custom expectation bo'lsa, `tests/Expectations.php` kabi alohida faylga ko'chiring va `Pest.php` da `require`. Har biri qisqa, bitta tushunchani tekshiradi va hujjatlashtirilgan.",
    "",
    "### Ehtiyot",
    "Ortiqcha abstraktsiya: faqat bir marta ishlatiladigan tekshiruvni expectation'ga aylantirmang. Test o'qigan odam `toBeValidInvoice()` ichida aslida nima tekshirilishini bilishi uchun nomlar aniq bo'lsin."
  ],
  "examples": [
    {
      "title": "Domen expectation'lari",
      "lang": "php",
      "code": [
        "// tests/Pest.php",
        "expect()->extend('toBePaid', function () {",
        "    return $this->toBeInstanceOf(Order::class)",
        "        ->status->toBe(OrderStatus::Paid)",
        "        ->paid_at->not->toBeNull();",
        "});",
        "",
        "expect()->extend('toCost', function (int $amount, string $currency = 'UZS') {",
        "    expect($this->value)->toBeInstanceOf(Money::class)",
        "        ->amount->toBe($amount)",
        "        ->currency->toBe($currency);",
        "",
        "    return $this;",
        "});",
        "",
        "expect()->extend('toBeUzbekPhone', fn () => $this->toMatch('/^\\+998\\d{9}$/'));",
        "",
        "// Testda",
        "expect($order->fresh())->toBePaid();",
        "expect($order->total())->toCost(150_000);",
        "expect($customer->phone)->toBeUzbekPhone();"
      ]
    }
  ],
  "pitfalls": [
    "Yopilmadan `$this` ni qaytarmaslik: zanjir uziladi.",
    "Custom expectation ichida `if` bilan jim o'tib ketish: yiqilmasligi kerak bo'lgan joyda yiqilmaydi.",
    "Bir marta ishlatiladigan tekshiruvlar uchun expectation yaratish.",
    "Noaniq nomlar (`toBeOk`, `toBeValid`): nima tekshirilishi noma'lum."
  ]
});
