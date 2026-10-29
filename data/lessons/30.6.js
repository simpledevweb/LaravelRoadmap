/* Chuqur dars: 30.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.6", {
  "lesson": [
    "### TDD'ning ikki darajasi",
    "TDD turli darajalarda qo'llanadi va ular bir-birini to'ldiradi.",
    "",
    "### Unit TDD",
    "Domen sinflari (value object, entity, xizmat) kichik sikllar bilan quriladi. Afzalliklari: juda tez fikr-mulohaza (millisekundlar), dizaynga kuchli ta'sir, aniq xatti-harakat spetsifikatsiyasi. Algoritmlar, hisob-kitoblar, holat mashinalari uchun ayniqsa mos.",
    "",
    "### Feature TDD",
    "Avval HTTP darajasidagi test yoziladi (endpoint xatti-harakati), keyin uni qondiradigan kod. Laravel'da bu juda samarali: feature testlar tez, haqiqiy DB bilan ishlaydi va foydalanuvchi talabini to'g'ridan-to'g'ri ifodalaydi (\"mijoz savatga kupon qo'llay oladi\"). Controller, route, validatsiya va DB birgalikda sinaladi.",
    "",
    "### Kombinatsiya",
    "Amaliy ish tartibi:",
    "1. **Feature testdan boshlang**: tashqi xatti-harakatni yozing. U qizil bo'ladi.",
    "2. Mantiq sodda bo'lsa, to'g'ridan-to'g'ri Green qiling.",
    "3. Murakkab mantiq (chegirma qoidalari, narx hisoblash) paydo bo'lsa, **unit TDD'ga \"tushing\"**: o'sha qismni kichik sikllar bilan quring.",
    "4. Feature testga qayting va yashil ekanini tasdiqlang.",
    "",
    "Feature test qizil qolib turadi va \"qancha ish qolganini\" ko'rsatadi; unit sikllar esa tez ketadi.",
    "",
    "### Piramida bilan bog'liqlik",
    "Ko'p unit, o'rtacha feature, kam E2E. TDD ham shunga mos: ko'p kichik unit sikllar, har xususiyat uchun bir nechta feature test. Faqat feature testlar bilan TDD qilsangiz, tezlik pasayadi va murakkab mantiq uchun xato joyini topish qiyinlashadi.",
    "",
    "### Qaysi birini tanlash",
    "Mantiq murakkab bo'lsa unit, tashqi xatti-harakat va integratsiya muhim bo'lsa feature. Hech biri \"to'g'ri\" emas: vaziyatga qarab aralashtiring."
  ],
  "examples": [
    {
      "title": "Feature darajasida boshlash",
      "lang": "php",
      "code": [
        "it('lets a customer apply a coupon to the cart', function () {",
        "    $cart = Cart::factory()->withItems(150_000)->for($customer)->create();",
        "    Coupon::factory()->percent(10)->create(['code' => 'SALE10']);",
        "",
        "    $this->actingAs($customer->user)",
        "        ->postJson('/api/cart/coupon', ['code' => 'SALE10'])",
        "        ->assertOk()",
        "        ->assertJsonPath('data.discount', 15_000);",
        "});"
      ],
      "note": "Tashqi xatti-harakat qizil turadi, ichki mantiq esa unit TDD bilan quriladi."
    },
    {
      "title": "Murakkab qoida uchun unit TDD",
      "lang": "php",
      "code": [
        "it('caps the percent coupon at the maximum discount', function () {",
        "    $coupon = Coupon::percent(10, maxDiscount: Money::uzs(10_000));",
        "",
        "    expect($coupon->discountFor(Money::uzs(500_000)))->toEqual(Money::uzs(10_000));",
        "});",
        "",
        "it('does not discount below zero total', function () {",
        "    $coupon = Coupon::fixed(Money::uzs(50_000));",
        "",
        "    expect($coupon->discountFor(Money::uzs(30_000)))->toEqual(Money::uzs(30_000));",
        "});"
      ],
      "note": "Chegirma qoidalari tez unit testlar bilan sinaladi."
    }
  ],
  "pitfalls": [
    "Hamma narsani faqat feature testlar bilan TDD qilish: sekin va murakkab mantiqda xato joyini topish qiyin.",
    "Faqat unit TDD qilib, endpoint ulanishini sinamaslik: sinflar to'g'ri, lekin controller ularni noto'g'ri chaqiradi.",
    "Feature test qizil turganda unit sikllarda adashib, asosiy maqsaddan chalg'ish.",
    "Bir darajaga qotib qolish: vaziyatga qarab qatlamlarni almashtirishni o'rganing."
  ]
});
