/* Chuqur dars: 30.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.11", {
  "lesson": [
    "### Yaxshi test dizayni",
    "Testlar ham kod. Ularni o'qish va saqlash qiyin bo'lsa, jamoa ularni o'chirib tashlaydi yoki e'tiborsiz qoldiradi. Yaxshi test quyidagi xususiyatlarga ega.",
    "",
    "### Xususiyatlar",
    "- **Bitta xatti-harakat**: test bitta narsani tekshiradi. Yiqilganda nima buzilgani darhol aniq.",
    "- **Aniq nom**: xatti-harakatni ifodalaydi (\"applies vip discount\"), metod nomini emas.",
    "- **AAA**: Arrange (tayyorlash), Act (harakat), Assert (tekshirish): uch qism ajralib turadi.",
    "- **Minimal setup**: faqat kerakli ma'lumot. Ortiqcha tayyorgarlik chalg'itadi.",
    "- **Deterministik**: har safar bir xil natija. Vaqt, tasodif, tartibga bog'liq emas.",
    "- **Tez**: sekin test kam ishga tushiriladi.",
    "- **Xatti-harakatga bog'langan, implementatsiyaga emas**: ichki tuzilma o'zgarsa test sinmasligi kerak.",
    "- **O'qiladigan**: testlar hujjat vazifasini ham bajaradi.",
    "",
    "### Test hidlari (test smells)",
    "- Bir testda ko'p turli narsani tekshiradigan **juda ko'p assertion**.",
    "- **Shartli mantiq** (`if`, `foreach`) testda: testning o'zi testlanmagan kodga aylanadi.",
    "- **Sehrli raqamlar**: nima uchun 42 ekani noma'lum.",
    "- **Mock'lar zanjiri**: test implementatsiyani nusxalaydi.",
    "- **Testlar bir-biriga bog'liq**: tartib o'zgarsa yiqiladi.",
    "- **Sekin testlar**: kerak bo'lmasa haqiqiy DB yoki tarmoq.",
    "- **Ishlatilmagan setup**: testga kerak bo'lmagan tayyorgarlik.",
    "",
    "### Test kodini refactor qiling",
    "Builder'lar, factory holatlari, yordamchi funksiyalar va maxsus expectation'lar testni qisqa va ifodali qiladi. Takrorlangan setup'ni umumiy joyga chiqaring, lekin har test o'zining **muhim** qiymatlarini ochiq ko'rsatsin.",
    "",
    "### Dataset'lar",
    "Bir xil xatti-harakatni turli kirish bilan sinash uchun Pest `with()` dataset'laridan foydalaning. Bu testda `foreach` va `if` yozishdan yaxshiroq."
  ],
  "examples": [
    {
      "title": "Testda mantiq o'rniga dataset",
      "lang": "php",
      "code": [
        "// ❌ testda mantiq",
        "it('applies discounts', function () {",
        "    foreach ($cases as $c) {",
        "        if ($c['vip']) { expect(discount($c['subtotal'], vip: true))->toBe($c['expected']); }",
        "    }",
        "});",
        "",
        "// ✅ dataset + bitta xatti-harakat",
        "it('applies the vip discount', function (int $subtotal, int $expected) {",
        "    expect(discount($subtotal, vip: true))->toBe($expected);",
        "})->with([",
        "    'small order' => [50_000, 2_500],",
        "    'big order'   => [200_000, 20_000],",
        "]);"
      ],
      "note": "Har holat nom oladi va alohida yiqiladi."
    },
    {
      "title": "AAA va ochiq qiymatlar",
      "lang": "php",
      "code": [
        "it('rejects an order below the minimum amount', function () {",
        "    // Arrange",
        "    $cart = Cart::factory()->withItems(subtotal: 9_999)->create();   // minimum 10 000",
        "",
        "    // Act",
        "    $result = (new Checkout())->validate($cart);",
        "",
        "    // Assert",
        "    expect($result->isRejected())->toBeTrue()",
        "        ->and($result->reason())->toBe('below_minimum');",
        "});"
      ],
      "note": "Muhim qiymat (9 999, minimum 10 000) testda ko'rinib turadi."
    }
  ],
  "pitfalls": [
    "Testda `if` va tsikl yozish: test o'zi xatolarga moyil bo'lib qoladi. Dataset ishlating.",
    "Bir testda ko'p narsani tekshirish: yiqilganda nima buzilgani tushunarsiz.",
    "Testlarni bir-biriga bog'lash: tartib yoki parallel ishga tushirish bilan yiqiladi.",
    "Sehrli raqamlarni izohsiz qoldirish: test niyatini bilish uchun kodni o'qishga to'g'ri keladi."
  ]
});
