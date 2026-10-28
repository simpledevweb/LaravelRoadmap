/* Chuqur dars: 18.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.18", {
  "lesson": [
    "### Orqaga moslik nima",
    "API o'zgarishi orqaga mos (backward compatible) bo'lsa, mavjud mijozlar **hech qanday o'zgarishsiz** ishlashda davom etadi. Bu mobil ilovalar (eski versiyalar yillab ishlaydi) va tashqi integratsiyalar bor joyda hayotiy muhim.",
    "",
    "### Buzuvchi bo'lmagan o'zgarishlar",
    "- Yangi endpoint.",
    "- Javobga yangi maydon qo'shish.",
    "- So'rovga yangi **ixtiyoriy** parametr yoki maydon (default xatti-harakat o'zgarmasa).",
    "- Yangi ixtiyoriy header.",
    "- Validatsiyani **yumshatish** (uzunlik chegarasini oshirish).",
    "- Yangi enum qiymati — **faqat** mijozlar noma'lum qiymatni to'g'ri qayta ishlasa. Swift/Kotlin'dagi qat'iy enum'lar yiqilishi mumkin, shuning uchun ehtiyot bo'ling.",
    "",
    "### Buzuvchi o'zgarishlar",
    "- Maydonni o'chirish yoki qayta nomlash.",
    "- Maydon turini o'zgartirish (son → string, obyekt → massiv).",
    "- Maydon ma'nosini o'zgartirish (`total` endi soliqsiz).",
    "- Ixtiyoriy maydonni majburiy qilish yoki yangi majburiy parametr.",
    "- Validatsiyani **qattiqlashtirish**.",
    "- URL, metod yoki status kodni o'zgartirish (200 → 201 ham ba'zi mijozlarni buzadi).",
    "- Default qiymat, saralash yoki paginatsiya xatti-harakatini o'zgartirish.",
    "- Autentifikatsiya talablarini o'zgartirish.",
    "- `null` bo'lmagan maydon endi `null` qaytarishi.",
    "",
    "### Tolerant Reader printsipi",
    "Mijozlar o'zlariga kerakli maydonlarnigina o'qishi va noma'lum maydonlarni e'tiborsiz qoldirishi kerak. Mobil va frontend jamoalariga buni tavsiya qiling: qat'iy sxema bilan parse qiluvchi mijoz yangi maydon qo'shilganda ham yiqilishi mumkin.",
    "",
    "### O'zgarishni xavfsiz kiritish (expand-contract)",
    "1. **Kengaytirish:** yangi maydonni eskisi bilan **birga** qaytaring (`total` va `total_money`).",
    "2. **Deprecation:** eskisini hujjatda eskirgan deb belgilang. Javobga `Deprecation` va `Sunset` header'larini qo'shing.",
    "3. **Kuzatish:** eski maydon yoki endpoint'dan kim foydalanayotganini o'lchang (`User-Agent`, ilova versiyasi, API klient).",
    "4. **Qisqartirish:** foydalanish nolga yaqinlashganda (va e'lon qilingan muddat o'tgach) eskisini o'chiring yoki yangi major versiyaga o'ting (18.12).",
    "",
    "### Avtomatik himoya",
    "- **Kontrakt testlari:** javoblar OpenAPI spetsifikatsiyasiga mosligini testda tekshirish. Spetsifikatsiya diff'i (`oasdiff`, `openapi-diff`) CI'da buzuvchi o'zgarishni avtomatik aniqlaydi.",
    "- Resource'lar uchun snapshot testlar: javob tuzilmasi tasodifan o'zgarsa, test yiqiladi.",
    "- Code review'da API o'zgarishlari uchun alohida e'tibor."
  ],
  "examples": [
    {
      "title": "Expand-contract: maydon formatini o'zgartirish",
      "lang": "php",
      "code": [
        "// 1-bosqich: ikkalasi ham",
        "return [",
        "    'total' => (int) $this->total,                                   // eskirgan",
        "    'total_money' => ['amount' => (int) $this->total, 'currency' => 'UZS'],",
        "];",
        "",
        "// Deprecation header'lari (middleware)",
        "$response->headers->set('Deprecation', 'true');",
        "$response->headers->set('Sunset', 'Wed, 31 Dec 2025 23:59:59 GMT');",
        "$response->headers->set('Link', '<https://docs.example.uz/changelog#total-money>; rel=\"deprecation\"');",
        "",
        "// 2-bosqich (sunset'dan keyin yoki v2 da): faqat yangi maydon"
      ]
    },
    {
      "title": "Javob tuzilmasini testda qotirish",
      "lang": "php",
      "code": [
        "it('keeps order response contract', function () {",
        "    $order = Order::factory()->paid()->create();",
        "    Sanctum::actingAs($order->customer->user, ['orders:read']);",
        "",
        "    $this->getJson(\"/api/v1/orders/{$order->id}\")",
        "        ->assertOk()",
        "        ->assertJsonStructure([",
        "            'data' => ['id', 'status', 'total', 'total_money' => ['amount', 'currency'], 'created_at'],",
        "        ])",
        "        ->assertJsonPath('data.status', 'paid')",
        "        ->assertJsonPath('data.total', fn ($v) => is_int($v));",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Maydonni \"hech kim ishlatmaydi\" deb o'lchamasdan o'chirish: eski mobil versiyalar yiqiladi.",
    "Validatsiyani jimgina qattiqlashtirish: avval ishlagan so'rovlar 422 olib qoladi.",
    "Status kodni (200 → 201) yoki saralash tartibini \"kichik o'zgarish\" deb hisoblash.",
    "Yangi enum qiymatini qo'shganda qat'iy enum'li mijozlarni ogohlantirmaslik."
  ]
});
