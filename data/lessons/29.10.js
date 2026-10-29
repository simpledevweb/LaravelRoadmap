/* Chuqur dars: 29.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.10", {
  "lesson": [
    "### Fayl yuklashni testlash",
    "Fayl yuklash ham funksional, ham xavfsizlik nuqtai nazaridan nozik joy. Laravel haqiqiy faylsiz test qilish vositalarini beradi.",
    "",
    "### Asboblar",
    "- `Storage::fake('public')`: tanlangan diskni vaqtinchalik papka bilan almashtiradi.",
    "- `UploadedFile::fake()->image('a.jpg', 800, 600)`: soxta rasm (GD kerak). `->size(500)` hajmni kilobaytlarda belgilaydi.",
    "- `UploadedFile::fake()->create('doc.pdf', 2048, 'application/pdf')`: berilgan hajm va MIME bilan fayl.",
    "",
    "### Funksional tekshiruvlar",
    "- Fayl to'g'ri diskda va to'g'ri yo'lda saqlandi (`Storage::disk('public')->assertExists($path)`).",
    "- Fayl nomi yaratilishi (tasodifiy nom, asl nomni to'g'ridan-to'g'ri ishlatmaslik).",
    "- DB'dagi yo'l yoki metadata (hajm, MIME, asl nom).",
    "- **Almashtirish**: yangi fayl yuklanganda eski fayl o'chirildi.",
    "- Validatsiya: ruxsat etilmagan tur, juda katta hajm, o'lcham (rasm) bo'lsa `422`.",
    "",
    "### Xavfsizlik tekshiruvlari",
    "Fayl yuklash klassik hujum vektori, shuning uchun quyidagilarni testlang:",
    "- ruxsat etilmagan kengaytma (`.php`, `.phtml`, `.html`);",
    "- soxta MIME: `.jpg` kengaytmali, lekin mazmuni boshqa fayl;",
    "- juda katta fayl;",
    "- zararli nom: `../../x.php` (path traversal);",
    "- ikki kengaytma: `shell.php.jpg`.",
    "",
    "### Eslatma",
    "Laravel `mimes` va `mimetypes` qoidalari fayl **mazmuni**ga qarab MIME aniqlaydi, shuning uchun faqat kengaytmaga tayanmaydi. Testda `create(..., 'application/x-php')` kabi MIME bilan buni tasdiqlang. Fake fayllar haqiqiy mazmunga ega emas, shuning uchun MIME aniqlash haqiqiy fayllar bilan qo'shimcha tekshirilishi mumkin."
  ],
  "examples": [
    {
      "title": "Yuklash va almashtirish",
      "lang": "php",
      "code": [
        "it('replaces the old avatar with the new one', function () {",
        "    Storage::fake('public');",
        "    $this->actingAs($user);",
        "",
        "    $this->postJson('/api/avatar', ['avatar' => UploadedFile::fake()->image('one.jpg', 400, 400)])->assertOk();",
        "    $first = $user->fresh()->avatar_path;",
        "    Storage::disk('public')->assertExists($first);",
        "",
        "    $this->postJson('/api/avatar', ['avatar' => UploadedFile::fake()->image('two.jpg', 400, 400)])->assertOk();",
        "",
        "    Storage::disk('public')->assertMissing($first);",
        "    Storage::disk('public')->assertExists($user->fresh()->avatar_path);",
        "});"
      ],
      "note": "Eski fayl o'chirilgani ham tekshiriladi."
    },
    {
      "title": "Yashirin PHP fayl",
      "lang": "php",
      "code": [
        "it('rejects php files disguised as images', function () {",
        "    Storage::fake('public');",
        "",
        "    $this->actingAs($user)->postJson('/api/avatar', [",
        "        'avatar' => UploadedFile::fake()->create('shell.php.jpg', 10, 'application/x-php'),",
        "    ])->assertJsonValidationErrors('avatar');",
        "",
        "    Storage::disk('public')->assertDirectoryEmpty('avatars');",
        "});"
      ],
      "note": "Rad etilgan faylning hech qayerga saqlanmaganligi tasdiqlanadi."
    }
  ],
  "pitfalls": [
    "`Storage::fake()` ni chaqirmay testni haqiqiy diskka yozdirish.",
    "Faqat \"muvaffaqiyatli yuklash\" ni testlash: xavfsizlik holatlari (zararli kengaytma, MIME, path traversal) tekshirilmaydi.",
    "Asl fayl nomini to'g'ridan-to'g'ri saqlash: zararli nom bilan yozib yuborish xavfi. Tasodifiy nom ishlating va testlang.",
    "Almashtirishda eski faylni o'chirmaslik: disk ortiqcha fayllar bilan to'lib ketadi va test buni ko'rsatmaydi."
  ]
});
