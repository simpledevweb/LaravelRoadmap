/* Chuqur dars: 27.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.7", {
  "lesson": [
    "### Chegaralar — xatolar uyasi",
    "Xatolarning katta qismi qiymatlar diapazonining **chetida**: `<` va `<=` adashtirish, off-by-one (bitta ortiq yoki kam), yarim ochiq va yopiq oraliqlar, inklyuziv va eksklyuziv sanalar. Boundary value analysis (25.9) — har chegara uchun uning ikki tomonini va o'zini test qilish.",
    "",
    "### Turlari",
    "- **Son chegaralari:** `0`, `1`, `-1`, maksimal (`999`), maksimal+1, `PHP_INT_MAX`. Bepul yetkazib berish 500 000 dan — 499 999, 500 000, 500 001.",
    "- **Uzunlik:** bo'sh satr, 1 belgi, maksimal uzunlik, maksimal+1. Ko'p baytli belgilar (`ʻ`, kirill, emoji) — `strlen` va `mb_strlen` farqi.",
    "- **Kolleksiyalar:** bo'sh massiv, bitta element, ko'p element, maksimal o'lcham.",
    "- **Vaqt:** muddat tugashidan bir soniya oldin va keyin, yarim tun, oy oxiri (31-yanvar + 1 oy = ?), kabisa yili (29-fevral), yoz vaqtiga o'tish (O'zbekistonda yo'q, lekin xalqaro foydalanuvchilar uchun), vaqt zonasi chegarasi (Toshkentda kun boshlangan, UTC'da hali kecha).",
    "- **Pul:** 0 summa, minimal birlik, yaxlitlash chegarasi (`0.5`), bo'lish natijasida qoldiq (100 / 3).",
    "- **Paginatsiya:** birinchi va oxirgi sahifa, bo'sh natija, aynan `per_page` ta element.",
    "",
    "### Spetsifikatsiya aniqligi",
    "Chegara testlari ko'pincha **talabdagi noaniqlikni** ochadi: \"500 000 dan yuqori\" — 500 000 kiradimi? Bunday savollarni biznes bilan aniqlang va javobni test nomiga yozing: `it('gives free shipping from exactly 500 000')`.",
    "",
    "### Carbon tuzog'i",
    "`Carbon::parse('2025-01-31')->addMonth()` — 3-mart (fevralda 31 kun yo'q, overflow). `addMonthNoOverflow()` — 28-fevral. Obuna va to'lov sanalari uchun bunday chegara testlari majburiy."
  ],
  "examples": [
    {
      "title": "Chegara testlari dataset bilan",
      "lang": "php",
      "code": [
        "it('applies free shipping threshold', function (int $total, int $expected) {",
        "    expect((new ShippingCost())->for('tashkent', $total, express: false))->toBe($expected);",
        "})->with([",
        "    'zero' => [0, 15_000],",
        "    'just below' => [499_999, 15_000],",
        "    'exactly threshold' => [500_000, 0],",
        "    'just above' => [500_001, 0],",
        "]);",
        "",
        "it('renews monthly subscription without month overflow', function () {",
        "    $sub = new Subscription(startedAt: CarbonImmutable::parse('2025-01-31'));",
        "",
        "    expect($sub->nextBillingDate()->toDateString())->toBe('2025-02-28');",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Faqat diapazon o'rtasidagi qiymatlarni test qilish.",
    "\"Dan yuqori\" va \"dan boshlab\" farqini aniqlamasdan kod yozish.",
    "`strlen` bilan ko'p baytli matn uzunligini tekshirish.",
    "Oy qo'shishda Carbon overflow'ini hisobga olmaslik."
  ]
});
