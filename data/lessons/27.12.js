/* Chuqur dars: 27.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.12", {
  "lesson": [
    "### Nom — test yiqilgandagi birinchi xabar",
    "CI'da test yiqilganda, dasturchi avval **nomni** o'qiydi. Yaxshi nom kodni ochmasdan nima buzilganini aytadi: `✗ it refuses refund after 14 days`. Yomon nom hech narsa aytmaydi: `✗ testRefund2`.",
    "",
    "### Shablonlar",
    "1. **Xulq-atvor tavsifi** (Pest `it()` uchun tabiiy): `it('gives free shipping from 500 000 in Tashkent')`, `it('rejects expired coupons')`.",
    "2. **Shart → natija:** `test_returns_404_when_order_belongs_to_another_customer`, `test_refund_is_rejected_after_14_days`.",
    "3. **Given / When / Then:** `given_paid_order_when_cancelled_then_refund_is_created`. Uzun, lekin aniq.",
    "4. **Method_State_Expected** (Roy Osherove): `withdraw_amountAboveBalance_throwsInsufficientBalance`. Implementatsiyaga (metod nomi) bog'langan, metod nomi o'zgarsa nom eskiradi.",
    "",
    "Jamoa bitta shablonni tanlasin. Ko'pchilik uchun 1 yoki 2 eng o'qiladigan.",
    "",
    "### Qoidalar",
    "- **Xulq-atvorni ayting, implementatsiyani emas:** `it('notifies the customer')`, `it('calls NotificationService::send')` emas.",
    "- **Shartni ko'rsating:** `it('allows refund')` emas, `it('allows refund within 14 days')`.",
    "- **Biznes tilida** (ubiquitous language, 63.1): biznes \"buyurtma\" desa — `order`, ichki `tbl_sales` emas.",
    "- **\"should\" so'zini ortiqcha ishlatmang:** `it('should return true')` — `it('returns true')` dan uzun va ma'nosi bir xil.",
    "- **Noyob:** bitta faylda ikki bir xil nom bo'lmasin.",
    "- **Kutilgan natija:** `it('returns empty list for new customer')`.",
    "",
    "### Test fayli va describe",
    "Fayl nomi SUT bilan (`RefundPolicyTest.php`), `describe()` kontekst bilan (`describe('after 14 days')`), `it()` natija bilan. Natijada o'qilishi: `RefundPolicy → after 14 days → it rejects refund`.",
    "",
    "### Testdox",
    "`./vendor/bin/pest --testdox` yoki `phpunit --testdox` testlar nomini spetsifikatsiya ro'yxati sifatida chiqaradi. Uni o'qib, tizim nima qilishini tushunish mumkin bo'lsa — nomlar yaxshi."
  ],
  "examples": [
    {
      "title": "Yomon va yaxshi nomlar",
      "lang": "php",
      "code": [
        "// Yomon",
        "it('works');",
        "it('test refund');",
        "test('testCalculate2');",
        "it('calls repository save method');",
        "",
        "// Yaxshi",
        "describe('RefundPolicy', function () {",
        "    it('allows refund within 14 days of payment');",
        "    it('rejects refund on day 15');",
        "    it('rejects refund for unpaid orders');",
        "    it('allows support staff to override the window');",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Raqamli yoki ma'nosiz nomlar (`test1`, `testRefund2`).",
    "Nomda implementatsiya detallari: refactoring'da nom eskiradi.",
    "Shartsiz nomlar: qaysi holat tekshirilgani noaniq.",
    "Har dasturchi o'z shablonida nomlashi."
  ]
});
