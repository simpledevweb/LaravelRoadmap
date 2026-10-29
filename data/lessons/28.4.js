/* Chuqur dars: 28.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.4", {
  "lesson": [
    "### Queue::fake() nimani tekshirmaydi",
    "`Queue::fake()` faqat \"job dispatch qilindi\" degan faktni tekshiradi. U job'ning haqiqiy bajarilishini, payload serializatsiyasini, retry va `failed()` xatti-harakatini, chain va batch oqimini sinamaydi. Dispatch to'g'ri bo'lib, job ichi qulab tushishi mumkin.",
    "",
    "### Uch qatlamli yondashuv",
    "1. **Dispatch testi**: `Queue::fake()` bilan to'g'ri job, to'g'ri parametrlar bilan, kerakli navbatda yuborilganini tekshiring.",
    "2. **Job ichki testi**: job'ni to'g'ridan-to'g'ri ishga tushiring: `(new ExportOrders($id))->handle(...)` yoki `dispatchSync()`. Bu job mantig'ini haqiqiy DB bilan tekshiradi.",
    "3. **End-to-end**: haqiqiy `database` yoki `redis` navbat bilan dispatch qiling va `artisan queue:work --once --stop-when-empty` ni ishga tushiring. Bu butun zanjirni (serializatsiya, worker, natija) tekshiradi.",
    "",
    "### Serializatsiya tuzoqlari",
    "`SerializesModels` trait'i modelni job'ga to'liq saqlamaydi, faqat id'sini yozadi va worker modelni qayta yuklaydi. Bundan ikki xulosa:",
    "- Dispatch va bajarilish orasida model o'zgarsa, job **yangi** holatni ko'radi.",
    "- Model o'chirilgan bo'lsa, `ModelNotFoundException` chiqadi va job muvaffaqiyatsiz bo'ladi. Agar bu kutilgan holat bo'lsa, job'da `$deleteWhenMissingModels = true` qo'yiladi. Buni testlang.",
    "",
    "### afterCommit",
    "Tranzaksiya ichida dispatch qilingan job commit'dan oldin worker'ga yetib, hali mavjud bo'lmagan yozuvni o'qishi mumkin. Buning yechimi `afterCommit` (yoki `ShouldQueueAfterCommit`). Testlarda DB tranzaksiya bilan izolyatsiya qilinganida bu xatti-harakat farq qilishi mumkin, shuning uchun bu stsenariyni alohida tekshiring.",
    "",
    "### failed() va retry",
    "`failed(Throwable $e)` metodi, `tries`, `backoff` va `retryUntil` ni testlang: job ketma-ket xato bersa, `failed()` chaqirilib, kerakli xabar yoki holat yozilishini tekshiring. Chain va batch uchun `Bus::fake()` dispatch tartibini, haqiqiy bajarish esa zanjir ishlashini ko'rsatadi."
  ],
  "examples": [
    {
      "title": "Dispatch va job ichi alohida",
      "lang": "php",
      "code": [
        "it('dispatches the export job on the exports queue', function () {",
        "    Queue::fake();",
        "",
        "    $this->actingAs($user)->postJson('/api/exports')->assertAccepted();",
        "",
        "    Queue::assertPushedOn('exports', ExportOrders::class, fn ($job) => $job->userId === $user->id);",
        "});",
        "",
        "it('writes the csv when the job runs', function () {",
        "    Storage::fake('exports');",
        "    Order::factory()->count(3)->for($user)->create();",
        "",
        "    ExportOrders::dispatchSync($user->id);",
        "",
        "    Storage::disk('exports')->assertExists(\"orders-{$user->id}.csv\");",
        "});"
      ],
      "note": "Birinchi test faqat yuborishni, ikkinchisi job mantig'ini tekshiradi."
    },
    {
      "title": "End-to-end worker bilan",
      "lang": "php",
      "code": [
        "it('processes the job through a real queue', function () {",
        "    config(['queue.default' => 'database']);",
        "",
        "    ExportOrders::dispatch($user->id);",
        "    expect(DB::table('jobs')->count())->toBe(1);",
        "",
        "    $this->artisan('queue:work --once --stop-when-empty')->assertSuccessful();",
        "",
        "    expect(DB::table('jobs')->count())->toBe(0);",
        "    Storage::disk('exports')->assertExists(\"orders-{$user->id}.csv\");",
        "});"
      ],
      "note": "Haqiqiy navbat driver'i serializatsiya va worker oqimini ham tekshiradi."
    }
  ],
  "pitfalls": [
    "Faqat `Queue::fake()` bilan cheklanish: job ichidagi xato production'da birinchi marta ishlaganda chiqadi.",
    "Dispatch'dan keyin model o'zgarishini hisobga olmaslik: job eski emas, yangi holatni ko'radi.",
    "O'chirilgan model uchun xatti-harakatni sinamaslik: kutilmagan `ModelNotFoundException` job'larni failed jadvaliga to'ldiradi.",
    "Tranzaksiya ichida `afterCommit`siz dispatch qilish: worker hali commit bo'lmagan ma'lumotni topa olmaydi."
  ]
});
