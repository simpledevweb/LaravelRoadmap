/* Chuqur dars: 28.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.6", {
  "lesson": [
    "### Fayl bilan ishlovchi kod",
    "Yuklash, eksport, import, rasm qayta ishlash, PDF generatsiya va arxivlash kabi funksiyalar fayl tizimiga yoki bulutli saqlashga (S3) tayanadi. Testda haqiqiy diskka yozish sekin, joyni ifloslantiradi va parallel testlarni to'qnashtiradi.",
    "",
    "### Storage::fake()",
    "`Storage::fake('s3')` tanlangan diskni vaqtinchalik lokal papka bilan almashtiradi. Shundan keyin `Storage::disk('s3')->assertExists($path)` va `assertMissing($path)` bilan natijani tekshirasiz. Fake diskni test boshida chaqirish muhim: ilova kodi `Storage::disk('s3')` ga murojaat qilganda soxta diskni topadi.",
    "",
    "### Soxta fayl yuklash",
    "`UploadedFile::fake()` bilan haqiqiy faylsiz yuklash testi yoziladi:",
    "- `UploadedFile::fake()->image('a.jpg', 600, 400)`: rasm (GD kengaytmasi kerak).",
    "- `UploadedFile::fake()->create('doc.pdf', 500)`: berilgan hajmdagi fayl (kilobaytlarda).",
    "- `->mimeType('application/pdf')`: MIME turini aniq belgilash.",
    "",
    "Validatsiyani ham sinang: juda katta fayl, ruxsat etilmagan tur, bo'sh fayl. Bu xavfsizlik uchun muhim.",
    "",
    "### Fake nima qila olmaydi",
    "Lokal fake S3'ga xos xatti-harakatni to'liq takrorlamaydi: vaqtinchalik URL imzolari, ob'ekt visibility, multipart yuklash, versiyalash, region. Bunday mantiq uchun MinIO yoki LocalStack bilan alohida integratsion test yoziladi: ular S3 API'sini lokal taqlid qiladi.",
    "",
    "### Tozalash",
    "Haqiqiy fayllar bilan ishlaydigan testlarda (masalan, arxiv yaratish) vaqtinchalik fayllar testdan keyin o'chirilsin. Fake disk avtomatik tozalanadi, lekin sizning `sys_get_temp_dir()` dagi fayllaringiz tozalanmaydi.",
    "",
    "### Katta fayllar",
    "Katta faylni xotiraga to'liq o'qiyotgan kod bir paytlar kichik testda sezilmaydi. Oqim (stream) bilan ishlashni (`readStream`, `writeStream`) alohida tekshiring: test uchun nisbatan katta fayl yarating va xotira ishlatilishini kuzating."
  ],
  "examples": [
    {
      "title": "Avatar yuklash",
      "lang": "php",
      "code": [
        "it('stores the avatar on s3', function () {",
        "    Storage::fake('s3');",
        "",
        "    $this->actingAs($user)",
        "        ->postJson('/api/avatar', ['avatar' => UploadedFile::fake()->image('me.jpg', 400, 400)])",
        "        ->assertOk();",
        "",
        "    Storage::disk('s3')->assertExists(\"avatars/{$user->id}.jpg\");",
        "});",
        "",
        "it('rejects a pdf as avatar', function () {",
        "    Storage::fake('s3');",
        "",
        "    $this->actingAs($user)",
        "        ->postJson('/api/avatar', ['avatar' => UploadedFile::fake()->create('cv.pdf', 100)])",
        "        ->assertUnprocessable();",
        "",
        "    Storage::disk('s3')->assertDirectoryEmpty('avatars');",
        "});"
      ],
      "note": "Ruxsat etilmagan turda hech narsa saqlanmaganini ham tekshiring."
    },
    {
      "title": "Eksport fayli mazmuni",
      "lang": "php",
      "code": [
        "it('writes a csv with a header and one row per order', function () {",
        "    Storage::fake('exports');",
        "    Order::factory()->count(2)->for($user)->create();",
        "",
        "    app(OrderExporter::class)->export($user);",
        "",
        "    $csv = Storage::disk('exports')->get(\"orders-{$user->id}.csv\");",
        "    $lines = array_filter(explode(\"\\n\", trim($csv)));",
        "",
        "    expect($lines)->toHaveCount(3)",
        "        ->and($lines[0])->toBe('id,total,created_at');",
        "});"
      ],
      "note": "Faylning mavjudligi emas, mazmuni ham tekshiriladi."
    }
  ],
  "pitfalls": [
    "Testda haqiqiy diskka yoki haqiqiy S3'ga yozish: sekin, ifloslantiradi, xarajat keltiradi.",
    "`Storage::fake()` ni chaqirishni unutib, dev diskiga fayl yozib yuborish.",
    "Faqat \"fayl mavjud\" ni tekshirish: bo'sh yoki buzuq fayl ham mavjud bo'ladi.",
    "Fake S3 temporary URL va visibility ni to'g'ri taqlid qiladi deb o'ylash: bu xatti-harakat uchun MinIO yoki LocalStack kerak."
  ]
});
