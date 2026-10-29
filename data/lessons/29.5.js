/* Chuqur dars: 29.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.5", {
  "lesson": [
    "### Avtorizatsiya testlari",
    "Avtorizatsiya \"kim nima qila oladi\" savoliga javob beradi. Uni testlashda har bir **rol va egalik kombinatsiyasi** uchun kutilgan natija aniq yoziladi.",
    "",
    "### Matritsa yondashuvi",
    "Odatiy kombinatsiyalar:",
    "- **Egasi**: o'z resursiga ruxsat.",
    "- **Boshqa foydalanuvchi**: `403` yoki `404` (ba'zan resurs mavjudligini yashirish uchun `404` ma'qul).",
    "- **Admin/menejer**: roliga ko'ra ruxsat.",
    "- **Ruxsati yo'q rol** (viewer): `403`.",
    "- **Mehmon**: `401`.",
    "",
    "Pest'ning `with()` dataset'lari bunday matritsa uchun juda qulay: rol va kutilgan status juftliklari ro'yxati bitta testni takrorlaydi.",
    "",
    "### Ikki qatlamli test",
    "1. **Policy unit testi**: `Gate::forUser($user)->allows('update', $order)` yoki policy metodini to'g'ridan-to'g'ri chaqirish. Qoidaning o'zini tez tekshiradi.",
    "2. **Endpoint feature testi**: policy haqiqatan ham **qo'llanganini** tekshiradi. Policy to'g'ri yozilgan, lekin controller'da `authorize()` unutilgan bo'lishi mumkin. Faqat shu test buni ushlaydi.",
    "",
    "### Ro'yxat endpoint'lari",
    "Yakka resurs endpoint'ida ruxsat tekshirilsa, ro'yxatda tekshirish ko'pincha unutiladi. Ro'yxat boshqa foydalanuvchi yoki boshqa tenant ma'lumotini qaytarmasligini alohida testlang.",
    "",
    "### Aniq status tanlovi",
    "`403` \"mavjud, lekin ruxsat yo'q\", `404` \"mavjud emas yoki ko'rishga haqqingiz yo'q\". Qaysi birini tanlagan bo'lsangiz, testda izchil bo'lsin va xavfsizlik siyosatiga mos kelsin."
  ],
  "examples": [
    {
      "title": "Rol bo'yicha matritsa",
      "lang": "php",
      "code": [
        "it('authorizes order update by role', function (string $role, int $status) {",
        "    $order = Order::factory()->create();",
        "",
        "    $this->actingAs(User::factory()->role($role)->create())",
        "        ->patchJson(\"/api/orders/{$order->id}\", ['note' => 'x'])",
        "        ->assertStatus($status);",
        "})->with([",
        "    'admin'   => ['admin', 200],",
        "    'manager' => ['manager', 200],",
        "    'viewer'  => ['viewer', 403],",
        "]);"
      ],
      "note": "Har rol uchun alohida holat, bitta test tanasi."
    },
    {
      "title": "Ro'yxatda begona ma'lumot yo'q",
      "lang": "php",
      "code": [
        "it('does not leak other users orders in the list', function () {",
        "    $me = User::factory()->create();",
        "    $mine = Order::factory()->for($me)->create();",
        "    Order::factory()->count(3)->create(); // boshqalarniki",
        "",
        "    $this->actingAs($me)->getJson('/api/orders')",
        "        ->assertOk()",
        "        ->assertJsonCount(1, 'data')",
        "        ->assertJsonPath('data.0.id', $mine->id);",
        "});"
      ],
      "note": "Ro'yxat endpoint'i ko'pincha unutiladigan joy."
    }
  ],
  "pitfalls": [
    "Faqat policy unit testiga tayanish: controller'da `authorize()` unutilganini u sezmaydi.",
    "Faqat \"egasi\" holatini tekshirish: boshqa foydalanuvchi va ruxsatsiz rol holatlari testlanmay qoladi.",
    "Ro'yxat endpoint'ini tekshirmaslik: yakka resurs himoyalangan, ro'yxat esa hammaning ma'lumotini qaytaradi.",
    "`403` va `404` o'rtasida izchil bo'lmaslik: ba'zi endpoint'lar resurs mavjudligini oshkor qiladi."
  ]
});
