/* Chuqur dars: 29.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.6", {
  "lesson": [
    "### Validatsiya testlari",
    "Validatsiya foydalanuvchi kiritgan ma'lumotni ilovaga kiritishdan oldin tekshiradi. Uni testlash har qoida uchun \"noto'g'ri qiymat rad etiladi, to'g'ri qiymat o'tadi\" juftligini bildiradi.",
    "",
    "### Nimani tekshirish kerak",
    "- Noto'g'ri qiymat: `422` va **aniq maydon** xatosi (`assertJsonValidationErrors('email')`, web'da `assertSessionHasErrors('email')`).",
    "- Majburiy maydon yo'q.",
    "- Chegaraviy qiymatlar: eng kichik va eng katta ruxsat etilgan qiymat o'tadi, bir qadam tashqarisi rad etiladi.",
    "- Shartli qoidalar (`required_if`, `required_with`): shart bajarilganda va bajarilmaganda.",
    "- Massiv elementlari: `items.0.qty` kabi xato kalitlari.",
    "- Unikal qoidalar: mavjud qiymat rad etiladi, o'z yozuvini yangilashda `ignore` ishlaydi.",
    "",
    "### Dataset bilan tuzilma",
    "Bitta testni bir nechta noto'g'ri holat bilan takrorlash eng qulay yo'l. To'g'ri asosiy payload'ni yordamchi funksiyada saqlang va har safar faqat **bitta maydonni** buzing. Shunda xato aynan shu maydonga tegishli ekani aniq bo'ladi.",
    "",
    "### Xato xabari",
    "Xabar matnini testlash muhim bo'lsa, `assertJsonValidationErrors(['email' => 'To\\'g\\'ri email kiriting'])` kabi tekshiring. Tarjima fayllarida o'zgarish testlarni sindirmasligi uchun ko'pincha faqat maydon nomi tekshiriladi.",
    "",
    "### Form Request va qoida klasslari",
    "Murakkab qoidalarni (`Rule` obyektlari, maxsus qoida klasslari) alohida unit testlash mumkin. Feature test esa ularning endpoint'ga to'g'ri ulanganini kafolatlaydi."
  ],
  "examples": [
    {
      "title": "Har qoida uchun bitta holat",
      "lang": "php",
      "code": [
        "function validOrderPayload(array $override = []): array",
        "{",
        "    return array_merge([",
        "        'phone' => '+998901234567',",
        "        'items' => [['product_id' => 1, 'qty' => 2]],",
        "    ], $override);",
        "}",
        "",
        "it('validates the order payload', function (array $override, string $field) {",
        "    $this->actingAs($user)",
        "        ->postJson('/api/orders', validOrderPayload($override))",
        "        ->assertUnprocessable()",
        "        ->assertJsonValidationErrors($field);",
        "})->with([",
        "    'no items'  => [['items' => []], 'items'],",
        "    'zero qty'  => [['items' => [['product_id' => 1, 'qty' => 0]]], 'items.0.qty'],",
        "    'bad phone' => [['phone' => '123'], 'phone'],",
        "]);"
      ],
      "note": "Har holatda faqat bitta maydon buziladi."
    },
    {
      "title": "Chegaraviy qiymat",
      "lang": "php",
      "code": [
        "it('accepts the maximum allowed quantity but not one more', function () {",
        "    $this->actingAs($user)",
        "        ->postJson('/api/orders', validOrderPayload(['items' => [['product_id' => 1, 'qty' => 100]]]))",
        "        ->assertCreated();",
        "",
        "    $this->actingAs($user)",
        "        ->postJson('/api/orders', validOrderPayload(['items' => [['product_id' => 1, 'qty' => 101]]]))",
        "        ->assertJsonValidationErrors('items.0.qty');",
        "});"
      ],
      "note": "Chegaradagi qiymat o'tadi, undan keyingisi rad etiladi."
    }
  ],
  "pitfalls": [
    "Bir testda bir nechta maydonni birdan buzish: qaysi qoida ishlagani noaniq qoladi.",
    "Faqat `422` ni tekshirish: boshqa maydon xatosi ham `422` beradi, `assertJsonValidationErrors` bilan aniq maydonni tasdiqlang.",
    "Chegaraviy qiymatlarni sinamaslik: `max:100` va `lt:100` farqi (off-by-one) productionda chiqadi.",
    "Xabar matniga qattiq bog'lanish: tarjima o'zgarishi bilan ko'plab testlar sinadi."
  ]
});
