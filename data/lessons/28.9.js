/* Chuqur dars: 28.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.9", {
  "lesson": [
    "### Tranzaksiya bilan izolyatsiya",
    "Har test boshlanganda tranzaksiya ochiladi, tugaganda `rollback` qilinadi. Natijada DB har testdan keyin avvalgi holatiga qaytadi, qo'shimcha tozalash va qayta migratsiya kerak emas. Laravel'da bu `RefreshDatabase` (migratsiyani bir marta bajaradi, keyin har testni tranzaksiyada ishga tushiradi) va `DatabaseTransactions` (sxema tayyor deb hisoblab, faqat tranzaksiya ochadi) trait'lari orqali ishlaydi.",
    "",
    "### Nima uchun tez",
    "Ma'lumotni o'chirish va qayta yaratish o'rniga bitta `ROLLBACK`. Minglab testli loyihada bu daqiqalar farqini beradi.",
    "",
    "### Cheklovlari",
    "Tranzaksiya yondashuvi hamma narsani yashirin holda qamrab oladi, lekin ba'zi holatlarda xatti-harakat production'dan farq qiladi:",
    "- **Ichki tranzaksiya**: testlanayotgan kod o'zi `DB::transaction()` ochsa, Laravel savepoint ishlatadi. Bu ishlaydi, lekin commit hech qachon haqiqatda bo'lmaydi.",
    "- **afterCommit callback'lar**: commit'dan keyin ishlashi kerak bo'lgan kod (event, job) test tranzaksiyasi ichida hech qachon \"commit\" ko'rmaydi. Laravel testlarda buni moslashtiradi, lekin shu xatti-harakatni bilish va alohida testlash kerak.",
    "- **Boshqa ulanish yoki jarayon**: queue worker, alohida DB ulanishi yoki `artisan` jarayoni test tranzaksiyasidagi commit qilinmagan o'zgarishni ko'rmaydi.",
    "- **DDL**: MySQL'da `CREATE TABLE`, `ALTER TABLE` implicit commit qiladi va tranzaksiyani yakunlaydi, rollback endi ishlamaydi.",
    "- **Lock'lar**: `lockForUpdate` ning haqiqiy blokirovkasini bitta ulanishda sinab bo'lmaydi.",
    "",
    "### Muqobillar",
    "- `DatabaseTruncation`: har testdan keyin jadvallarni tozalaydi. Sekinroq, lekin haqiqiy commit'lar ishlaydi.",
    "- `DatabaseMigrations`: har test uchun migratsiyani qayta bajaradi. Eng sekin, eng toza.",
    "",
    "### Aralash yondashuv",
    "Ko'pchilik testlar tranzaksiyada, kam sonli maxsus testlar (commit, queue, ko'p ulanish) truncation bilan alohida fayl yoki guruhda yuradi. Shunda tezlik va aniqlik birgalikda saqlanadi."
  ],
  "examples": [
    {
      "title": "Odatiy tranzaksiyali test",
      "lang": "php",
      "code": [
        "uses(RefreshDatabase::class);",
        "",
        "it('creates an order and its lines', function () {",
        "    $order = app(PlaceOrder::class)->handle($user, cart: [['sku' => 'a', 'qty' => 2]]);",
        "",
        "    expect(Order::count())->toBe(1)",
        "        ->and($order->lines)->toHaveCount(1);",
        "});",
        "// test tugagach DB avvalgi holatiga qaytadi (rollback)"
      ],
      "note": "RefreshDatabase migratsiyani bir marta bajaradi, keyin har testni tranzaksiyada ishlatadi."
    },
    {
      "title": "Haqiqiy commit kerak bo'lgan test",
      "lang": "php",
      "code": [
        "uses(DatabaseTruncation::class);",
        "",
        "it('lets the queue worker see committed orders', function () {",
        "    $order = Order::factory()->create();",
        "",
        "    // alohida jarayon commit qilingan ma'lumotni ko'rishi kerak",
        "    $this->artisan('orders:process', ['--id' => $order->id])->assertSuccessful();",
        "",
        "    expect($order->fresh()->status)->toBe('processed');",
        "});"
      ],
      "note": "Tranzaksiyada bo'lganda boshqa ulanish ma'lumotni ko'rmasdi. Truncation haqiqiy commit beradi."
    }
  ],
  "pitfalls": [
    "Testlanayotgan kod `afterCommit` ga tayansa, tranzaksiyali testda uning ishlashini kutish: xatti-harakatni alohida tekshiring.",
    "Boshqa ulanish yoki worker jarayoni commit qilinmagan ma'lumotni ko'rmaydi: kutilmagan \"topilmadi\" xatolari paydo bo'ladi.",
    "Testda DDL (jadval o'zgartirish) bajarish: MySQL'da implicit commit rollback'ni buzadi va ma'lumot qolib ketadi.",
    "Hamma testni `DatabaseMigrations` bilan yurgizish: to'plam keraksiz sekinlashadi."
  ]
});
