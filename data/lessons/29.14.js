/* Chuqur dars: 29.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.14", {
  "lesson": [
    "### Ro'yxat endpoint'larini testlash",
    "Ro'yxat endpoint'lari (pagination, filtr, saralash) ko'p ishlatiladi va xatoga moyil: o'tkazib yuborilgan yoki takrorlangan elementlar, noto'g'ri tartib, filtr kombinatsiyasidagi xato, juda katta sahifa hajmi. Ular uchun maxsus testlar kerak.",
    "",
    "### Pagination",
    "- Sahifa hajmi to'g'ri va `meta`/`links` (joriy sahifa, jami, keyingi havola) mavjud.",
    "- **Keyingi sahifa** to'g'ri elementlarni qaytaradi: oldingi sahifa bilan kesishmaydi va hech biri tushib qolmaydi.",
    "- `per_page` ning **maksimal chegarasi**: 10 000 so'ralsa, chegaraga tushiriladi yoki rad etiladi (DoS himoyasi).",
    "- Chegaraviy sahifalar: birinchi, oxirgi, mavjud bo'lmagan sahifa (bo'sh natija).",
    "- Cursor pagination: yangi yozuv qo'shilgandan keyin ham barqarorlik.",
    "",
    "### Filtr va saralash",
    "- Har bir ruxsat etilgan filtr alohida tekshiriladi.",
    "- Filtrlar kombinatsiyasi (status + sana oralig'i).",
    "- Noto'g'ri filtr qiymati yoki ruxsat etilmagan saralash maydoni `400`/`422` beradi, jim e'tiborsiz qoldirilmaydi.",
    "- Bo'sh natija xato emas: `200` va bo'sh `data`.",
    "- Saralash yo'nalishi (`asc`/`desc`) va ikkilamchi saralash kaliti.",
    "",
    "### Deterministik tartib",
    "Ro'yxat testlari tasodifiy tartibga bog'liq bo'lib qolmasligi kerak. Ma'lumotni **aniq vaqt va id** bilan yarating, saralashni aniq belgilang. Teng qiymatli elementlar uchun ikkilamchi kalit (masalan, `id`) tartibni barqaror qiladi.",
    "",
    "### Ruxsat",
    "Filtr va pagination xavfsizlikni chetlab o'tmasligi kerak: boshqa foydalanuvchi ma'lumoti sahifa 2 da ham chiqmasin."
  ],
  "examples": [
    {
      "title": "Filtr",
      "lang": "php",
      "code": [
        "it('filters orders by status', function () {",
        "    Order::factory()->count(3)->paid()->for($me)->create();",
        "    Order::factory()->count(2)->pending()->for($me)->create();",
        "",
        "    $this->actingAs($me)->getJson('/api/orders?filter[status]=paid')",
        "        ->assertOk()",
        "        ->assertJsonCount(3, 'data')",
        "        ->assertJsonMissing(['status' => 'pending']);",
        "});"
      ],
      "note": "Boshqa holatdagi buyurtma natijada yo'qligi tekshiriladi."
    },
    {
      "title": "Sahifalar kesishmaydi",
      "lang": "php",
      "code": [
        "it('returns non overlapping pages in a stable order', function () {",
        "    Order::factory()->count(25)->for($me)->sequence(fn ($s) => ['created_at' => now()->subMinutes($s->index)])->create();",
        "",
        "    $first  = $this->actingAs($me)->getJson('/api/orders?per_page=10&page=1')->json('data.*.id');",
        "    $second = $this->actingAs($me)->getJson('/api/orders?per_page=10&page=2')->json('data.*.id');",
        "",
        "    expect($first)->toHaveCount(10)",
        "        ->and($second)->toHaveCount(10)",
        "        ->and(array_intersect($first, $second))->toBeEmpty();",
        "",
        "    $this->actingAs($me)->getJson('/api/orders?per_page=100000')->assertJsonPath('meta.per_page', 100);",
        "});"
      ],
      "note": "Takrorlanish yo'qligi va per_page chegarasi tekshiriladi."
    }
  ],
  "pitfalls": [
    "`per_page` chegarasini testlamaslik: kimdir 100 000 yozuv so'rab, serverni yuklaydi.",
    "Saralashsiz pagination: teng qiymatlarda elementlar sahifalar orasida takrorlanadi yoki tushib qoladi.",
    "Noto'g'ri filtrni jim e'tiborsiz qoldirish: mijoz filtr ishlayapti deb o'ylab, noto'g'ri ma'lumot ko'radi.",
    "Faqat birinchi sahifani tekshirish: o'tkazib yuborish xatolari ikkinchi sahifada chiqadi."
  ]
});
