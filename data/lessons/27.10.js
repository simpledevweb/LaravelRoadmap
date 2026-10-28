/* Chuqur dars: 27.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.10", {
  "lesson": [
    "### Deterministik test",
    "Bir xil kod bilan har safar, har mashinada, har vaqtda bir xil natija. Nodeterministik test (flaky, 25.18) ishonchni yo'qotadi va haqiqiy xatolarni yashiradi.",
    "",
    "### Nodeterminizm manbalari va yechimlar",
    "| Manba | Yechim |",
    "|---|---|",
    "| Joriy vaqt (`now()`, `time()`) | `Clock` injection (27.4) yoki `travelTo()` |",
    "| Tasodifiy sonlar, UUID, `Str::random()` | generator injection, `Str::createUuidsUsing()`, `Str::createRandomStringsUsing()` |",
    "| Faker qiymatlari | testga muhim qiymatlarni aniq berish, `fake()->seed()` |",
    "| Vaqt zonasi va locale | testda aniq timezone (`Asia/Tashkent` yoki UTC), locale |",
    "| Tartiblanmagan to'plamlar (hash, `array_unique` kalitlari, DB natijasi) | saralash yoki `toEqualCanonicalizing` |",
    "| Float aniqligi | butun sonlar (tiyin), `toEqualWithDelta` |",
    "| Tarmoq va tashqi servislar | fake'lar (27.6) |",
    "| Fayl tizimi va muhit | xotiradagi kontent, `Storage::fake()` |",
    "| Global va statik holat | undan qochish yoki tiklash (25.14) |",
    "| Parallel bajarish va `sleep` | sinxron fake'lar, vaqtni boshqarish |",
    "",
    "### Laravel yordamchilari",
    "- `$this->travelTo('2025-06-10 12:00')`, `freezeTime()`, `freezeSecond()`.",
    "- `Str::freezeUuids()`, `Str::createUuidsUsing(fn () => ...)`, `Str::createRandomStringsUsing()` va test oxirida `Str::createUuidsNormally()`.",
    "- `Sleep::fake()` (Laravel 10+) — `Sleep::for(5)->seconds()` haqiqatan kutmaydi va `Sleep::assertSlept()`.",
    "- `Http::fake()`, `Queue::fake()`.",
    "",
    "### Tekshirish",
    "Shubhali testni ko'p marta ishga tushiring: `--repeat=100`, tasodifiy tartib, parallel (25.18). Yiqilsa — yuqoridagi jadvaldan sababni qidiring.",
    "",
    "### Tasodifiylik foydali bo'lganda",
    "Property-based testing (25.9) ataylab tasodifiy kirishlar ishlatadi, lekin **seed** bilan: yiqilish xuddi shu seed bilan aniq qaytariladi."
  ],
  "examples": [
    {
      "title": "Vaqt, UUID va sleep'ni qotirish",
      "lang": "php",
      "code": [
        "use Illuminate\\Support\\Sleep;",
        "use Illuminate\\Support\\Str;",
        "",
        "it('creates a deterministic retry schedule', function () {",
        "    $this->travelTo('2025-06-10 12:00:00');",
        "    Str::createUuidsUsing(fn () => Ramsey\\Uuid\\Uuid::fromString('00000000-0000-0000-0000-000000000001'));",
        "    Sleep::fake();",
        "",
        "    $job = app(RetryingSender::class)->sendWithRetries('payload');",
        "",
        "    expect($job->id)->toBe('00000000-0000-0000-0000-000000000001')",
        "        ->and($job->nextAttemptAt->toDateTimeString())->toBe('2025-06-10 12:00:30');",
        "    Sleep::assertSleptTimes(2);",
        "",
        "    Str::createUuidsNormally();",
        "});"
      ],
      "note": "`Sleep` fasadi Laravel 10.x da qo'shilgan. Kod `sleep()` o'rniga `Sleep::for()` ishlatsa, testda kutish bo'lmaydi."
    }
  ],
  "pitfalls": [
    "Kodda to'g'ridan-to'g'ri `sleep()` ishlatib, testlarni sekin va beqaror qilish.",
    "Faker qiymatiga bog'liq kutilgan natija.",
    "`Str::createUuidsUsing()` dan keyin normal holatga qaytarmaslik: keyingi testlarga ta'sir.",
    "DB natijalarini tartibsiz solishtirish."
  ]
});
