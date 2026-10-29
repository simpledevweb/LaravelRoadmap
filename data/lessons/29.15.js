/* Chuqur dars: 29.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.15", {
  "lesson": [
    "### Ruxsat chegarasi testlari",
    "Bu testlar xavfsizlik regressiyalariga qarshi himoya. Ularning vazifasi: foydalanuvchi o'ziga tegishli bo'lmagan narsaga kira olmasligini **doimiy** kafolatlash. OWASP API Top 10 dagi eng ko'p uchraydigan zaifliklar aynan shu yerda.",
    "",
    "### Nimani tekshirish kerak",
    "- **IDOR / BOLA** (Broken Object Level Authorization): har bir obyekt endpoint'ida (`/orders/{id}`) boshqa foydalanuvchi yoki boshqa tenant resursiga kirish rad etiladi. Id'ni o'zgartirish bilan begona ma'lumotni ko'rib bo'lmaydi.",
    "- **BFLA** (Broken Function Level Authorization): oddiy foydalanuvchi admin funksiyalariga (`/admin/users`, `DELETE`) kira olmaydi.",
    "- **Mass assignment**: so'rov tanasiga qo'shilgan himoyalangan maydon (`role`, `tenant_id`, `balance`, `is_admin`) e'tiborsiz qoldiriladi.",
    "- **Ro'yxatlarda begona ma'lumot yo'q**: filtr, qidiruv, eksport, pagination.",
    "- **Bog'liq resurslar**: o'z buyurtmasiga boshqa foydalanuvchining mahsulot/manzilini biriktirib bo'lmaydi.",
    "",
    "### Tizimli yondashuv",
    "Har yangi endpoint uchun bu testlarni yozishni **majburiy** qiling: kod ko'rib chiqish ro'yxatiga qo'shing yoki umumiy dataset/shablon yarating. Bir marta yozilgan \"har bir resurs endpoint'iga boshqa tenant bilan murojaat\" shabloni yangi endpoint qo'shilganda ham ishlaydi.",
    "",
    "### Tenant izolyatsiyasi",
    "Multi-tenant ilovada tenant chegarasi eng muhim. Ikki tenant yarating, A tenant foydalanuvchisi bilan B tenant resurslariga barcha metodlar bilan murojaat qiling va har safar rad etilishini tasdiqlang. Global scope ishlatilsa, uni chetlab o'tadigan `withoutGlobalScopes()` joylarini ham tekshiring.",
    "",
    "### Natijani aniq tekshirish",
    "Rad etish statusi (`403`/`404`) bilan birga **ma'lumot o'zgarmaganini** ham tekshiring: so'rov rad etilgan bo'lsa ham yozuv o'zgargan bo'lishi mumkin."
  ],
  "examples": [
    {
      "title": "Mass assignment orqali rolni oshirish",
      "lang": "php",
      "code": [
        "it('cannot escalate role via profile update', function () {",
        "    $user = User::factory()->create(['role' => 'viewer']);",
        "",
        "    $this->actingAs($user)",
        "        ->patchJson('/api/profile', ['name' => 'X', 'role' => 'admin'])",
        "        ->assertOk();",
        "",
        "    expect($user->fresh()->role)->toBe('viewer')",
        "        ->and($user->fresh()->name)->toBe('X');",
        "});"
      ],
      "note": "Ruxsat etilgan maydon o'zgardi, himoyalangani o'zgarmadi."
    },
    {
      "title": "Tenantlar orasida IDOR",
      "lang": "php",
      "code": [
        "it('denies access to another tenant resources', function (string $method, string $uri) {",
        "    $tenantA = User::factory()->forTenant(Tenant::factory()->create())->create();",
        "    $orderB  = Order::factory()->forTenant(Tenant::factory()->create())->create();",
        "",
        "    $this->actingAs($tenantA)",
        "        ->json($method, str_replace('{id}', $orderB->id, $uri))",
        "        ->assertNotFound();",
        "",
        "    expect($orderB->fresh()->updated_at)->toEqual($orderB->updated_at);",
        "})->with([",
        "    ['GET', '/api/orders/{id}'],",
        "    ['PATCH', '/api/orders/{id}'],",
        "    ['DELETE', '/api/orders/{id}'],",
        "]);"
      ],
      "note": "Har metod uchun alohida holat, rad etilgach yozuv o'zgarmagani ham tekshiriladi."
    }
  ],
  "pitfalls": [
    "Faqat GET ni tekshirish: PATCH va DELETE orqali begona resursni o'zgartirish ochiq qoladi.",
    "Ruxsatsiz so'rov statusini tekshirib, ma'lumot o'zgarmaganini tekshirmaslik.",
    "Ro'yxat, qidiruv va eksport endpoint'larini unutish: yakka resurs himoyalangan, jamlanma endpoint hammani ko'rsatadi.",
    "Bu testlarni yangi endpoint uchun majburiy qilmaslik: xavfsizlik testlari birinchi tashlab ketiladigan narsa."
  ]
});
