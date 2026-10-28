/* Chuqur dars: 27.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.15", {
  "lesson": [
    "### Qaror savoli",
    "\"Bu kodni unit test bilan tekshirish kerakmi yoki integratsiya testi bilanmi?\" Javob kod **nimani** qilishiga bog'liq.",
    "",
    "### Unit test mos keladi",
    "- **Toza mantiq:** hisob-kitob, qoidalar, holat mashinalari, qiymat obyektlari, parserlar va formatlovchilar.",
    "- Ko'p kombinatsiyali kirishlar (dataset'lar bilan o'nlab holat).",
    "- Algoritmlar va chegara holatlari.",
    "- Natija bog'liqliklar orqali emas, qaytarilgan qiymat yoki obyekt holati orqali ko'rinadi.",
    "",
    "### Integratsiya testi mos keladi",
    "- **Kodning asosiy vazifasi — boshqa tizim bilan ishlash:** Eloquent so'rovlari va scope'lar, repository, raw SQL, migratsiyalar (25.12).",
    "- **Framework mexanizmlari:** validatsiya qoidalari, middleware, event-listener zanjirlari, queue job'lari, policy va gate'lar container orqali.",
    "- Tashqi API adapterlari (`Http::fake()` bilan).",
    "- Kesh va lock mantiqi haqiqiy driver bilan.",
    "- Mock'lar bilan unit test qilish uchun ko'p narsani mock qilish kerak bo'lgan oqimlar (27.11).",
    "",
    "### Feature (HTTP) testi",
    "Foydalanuvchi oqimini boshidan oxirigacha: so'rov → validatsiya → avtorizatsiya → biznes mantiq → DB → javob (29.x). Kam, lekin muhim yo'llar uchun.",
    "",
    "### Test piramidasi va \"trofey\"",
    "- **Piramida** (74.1): ko'p unit, kamroq integratsiya, kam E2E.",
    "- **Testing trophy** (Kent C. Dodds): integratsiya testlari asosiy qism, chunki ular eng yaxshi \"ishonch / xarajat\" nisbatini beradi.",
    "",
    "Laravel ilovalarida ko'pincha feature va integratsiya testlari asosiy qism (framework ko'p ishni qiladi), unit testlar esa domen mantiqi qalin bo'lgan joylarda.",
    "",
    "### Qoida",
    "**Qayerda xato bo'lish ehtimoli bor — o'sha darajada test qiling.** Narx hisoblashda xato — unit. Eloquent scope noto'g'ri SQL beradi — integratsiya (mock bilan uni ushlab bo'lmaydi). Ruxsat tekshiruvi endpoint'da unutilgan — feature."
  ],
  "examples": [
    {
      "title": "Bir xil funksionallik, turli darajalar",
      "lang": "php",
      "code": [
        "// Unit: narxlash qoidasi (tez, ko'p holat)",
        "it('applies loyalty discount tiers', function (int $orders, int $percent) {",
        "    expect(LoyaltyDiscount::percentFor($orders))->toBe($percent);",
        "})->with([[0, 0], [9, 0], [10, 5], [49, 5], [50, 10]]);",
        "",
        "// Integratsiya: scope haqiqiy DB'da",
        "it('counts only paid orders for loyalty', function () {",
        "    $c = Customer::factory()->create();",
        "    Order::factory()->count(10)->for($c)->paid()->create();",
        "    Order::factory()->count(5)->for($c)->create(['status' => 'cancelled']);",
        "",
        "    expect(Order::paid()->whereBelongsTo($c)->count())->toBe(10);",
        "});",
        "",
        "// Feature: endpoint chegirmani qo'llaydi va ruxsatni tekshiradi",
        "it('shows loyalty discount in checkout summary', function () {",
        "    $c = Customer::factory()->hasOrders(10, ['status' => 'paid'])->create();",
        "    $this->actingAs($c->user)->getJson('/api/v1/checkout/summary')",
        "        ->assertOk()->assertJsonPath('data.discount_percent', 5);",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Eloquent so'rovlarini mock'lar bilan unit test qilish: haqiqiy SQL xatolari ushlanmaydi.",
    "Murakkab hisob-kitobni faqat sekin feature testlar bilan qamrab, kombinatsiyalarni o'tkazib yuborish.",
    "Test turini odat bo'yicha tanlash, xato ehtimoli qayerdaligiga qaramasdan.",
    "Faqat bitta test turiga tayanish."
  ]
});
