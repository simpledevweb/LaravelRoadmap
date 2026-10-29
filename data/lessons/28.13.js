/* Chuqur dars: 28.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.13", {
  "lesson": [
    "### Integratsion testlar izsiz bo'lishi kerak",
    "Integratsion testlar tashqi holatni o'zgartiradi: DB yozuvlari, Redis kalitlari, fayllar, navbatdagi job'lar, S3 obyektlari, sandbox'dagi yozuvlar. Agar bu holat tozalanmasa, keyingi test uni ko'radi va yiqiladi yoki, yomoni, tasodifan o'tib ketadi. Bunday testlar **flaky** deyiladi.",
    "",
    "### Tozalash strategiyalari",
    "- **DB**: tranzaksiya rollback (`RefreshDatabase`) yoki truncation. Eng tez va ishonchli.",
    "- **Redis**: faqat test DB'sini `flushdb` bilan tozalash. Alohida DB raqami yoki prefiks, aks holda boshqa ma'lumotga tegib ketasiz.",
    "- **Fayllar**: `Storage::fake()` avtomatik izolyatsiya beradi. Haqiqiy vaqtinchalik fayllarni `afterEach` da o'chiring.",
    "- **Navbat**: testdan keyin qolgan job'lar yoki failed yozuvlar tozalansin.",
    "- **Tashqi sandbox**: test yaratgan yozuvlarni teg yoki nom prefiksi bilan belgilang va testdan keyin yoki rejali ravishda o'chiring.",
    "",
    "### Izolyatsiya: parallel testlar",
    "Testlar parallel ishlasa, umumiy resurs (bitta Redis kaliti, bitta fayl nomi) to'qnashuvga olib keladi. Yechim: har jarayon uchun **alohida prefiks yoki nom**. Laravel'da `ParallelTesting::token()` jarayon identifikatorini beradi va undan kalit prefiksi, bucket nomi yoki papka nomini yasash mumkin. DB uchun Laravel har jarayonga alohida baza yaratadi.",
    "",
    "### Tozalashni qayerda qilish",
    "- `beforeEach`: test boshlanishidan oldin holatni kafolatlaydi. Oldingi test yiqilib tozalamay ketgan bo'lsa ham xavfsiz.",
    "- `afterEach`: o'zingiz yaratgan narsani qaytaradi. Test yiqilsa ham ishlashi uchun `finally` mantig'i yoki Pest'ning `afterEach` i kerak.",
    "",
    "Eng ishonchli yondashuv — **ikkalasi**: boshlanishda kafolat, oxirida odob.",
    "",
    "### Test tartibiga bog'liqlikni topish",
    "Testlar tasodifiy tartibda ishlaganda yiqilsa, demak ular bir-biriga bog'liq. `phpunit --order-by=random` (yoki Pest `--order-by=random`) shunday bog'liqlikni ochib beradi. Buni vaqti-vaqti bilan CI'da yurgizing."
  ],
  "examples": [
    {
      "title": "Tozalash qoidalari",
      "lang": "php",
      "code": [
        "beforeEach(function () {",
        "    Redis::connection('testing')->flushdb();   // faqat test DB'si",
        "});",
        "",
        "afterEach(function () {",
        "    Storage::disk('local')->deleteDirectory('tmp-tests');",
        "});",
        "",
        "it('keeps scratch files out of the repo', function () {",
        "    Storage::disk('local')->put('tmp-tests/a.txt', 'x');",
        "    expect(Storage::disk('local')->exists('tmp-tests/a.txt'))->toBeTrue();",
        "});"
      ],
      "note": "Boshlanishda kafolat, tugaganda tozalash."
    },
    {
      "title": "Parallel jarayonlar uchun prefiks",
      "lang": "php",
      "code": [
        "// AppServiceProvider yoki TestCase ichida",
        "ParallelTesting::setUpProcess(function (int $token) {",
        "    config(['cache.prefix' => \"test{$token}_\"]);",
        "    config(['filesystems.disks.exports.root' => storage_path(\"framework/testing/exports-{$token}\")]);",
        "});"
      ],
      "note": "Har jarayon o'z kalit prefiksi va papkasi bilan ishlaydi, to'qnashuv yo'q."
    }
  ],
  "pitfalls": [
    "Testdan keyin tozalamaslik: keyingi test oldingi holatni ko'radi va tasodifan yiqiladi yoki o'tadi.",
    "`flushall` yoki umumiy Redis DB'ni tozalash: boshqa ma'lumot va parallel testlar buziladi.",
    "Parallel testlarda umumiy nomlar (bir xil kalit, fayl, bucket): jarayonlar bir-birining ma'lumotini o'zgartiradi.",
    "Tozalashni faqat `afterEach` ga tayanish: test yiqilib yoki jarayon to'xtab qolsa, qoldiq saqlanadi. `beforeEach` da kafolat bering."
  ]
});
