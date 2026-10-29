/* Chuqur dars: 29.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.11", {
  "lesson": [
    "### Queue va Event fake'lari",
    "Feature testda odatda \"bu so'rov nima ishga tushirdi\" degan savol muhim: navbatga job qo'yildimi, event yuborildimi. Haqiqiy job'ni bajarish shart emas. Fake bu niyatni tekshirishga imkon beradi.",
    "",
    "### Queue::fake()",
    "`Queue::fake()` job'larni navbatga qo'ymaydi, faqat qayd qiladi:",
    "- `Queue::assertPushed(Job::class, fn ($job) => $job->orderId === 1)`: yuborildi va parametrlari to'g'ri.",
    "- `assertPushedOn('emails', Job::class)`: kerakli navbatda.",
    "- `assertNotPushed(Job::class)`, `assertNothingPushed()`: yuborilmadi.",
    "- `assertPushedTimes(Job::class, 2)`: necha marta.",
    "",
    "### Bus::fake()",
    "Chain va batch'lar uchun: `Bus::assertChained([A::class, B::class])`, `Bus::assertBatched(...)`, `Bus::assertDispatched(...)`.",
    "",
    "### Event::fake()",
    "`Event::fake()` hamma event'larni to'xtatadi, shuning uchun model event'lari (`creating`, `saved`) ham ishlamay qoladi. Odatda aniq ro'yxat beriladi: `Event::fake([OrderPaid::class])`. Faqat shu event'lar ushlanadi, qolganlari odatdagidek ishlaydi. Tekshiruvlar: `assertDispatched`, `assertNotDispatched`, `assertListening(OrderPaid::class, SendReceipt::class)`.",
    "",
    "### Fake'ni qachon chaqirish",
    "`fake()` ni **ish boshlanishidan oldin** chaqiring (ma'lumot tayyorlashdan keyin, so'rovdan oldin). Aks holda ma'lumot yaratish paytida ketgan event/job real ishga tushadi.",
    "",
    "### Ish taqsimoti",
    "Feature testda \"nima navbatga qo'yildi\" tekshiriladi. Job ichidagi mantiq va listener mantiqi esa alohida testlanadi: ularni to'g'ridan-to'g'ri chaqirib. Bu ikki test turi bir-birini to'ldiradi: biri niyatni, biri ishni tekshiradi."
  ],
  "examples": [
    {
      "title": "Queue fake",
      "lang": "php",
      "code": [
        "it('queues the export job for the current user', function () {",
        "    Queue::fake();",
        "",
        "    $this->actingAs($user)->postJson('/api/exports', ['type' => 'orders'])->assertAccepted();",
        "",
        "    Queue::assertPushed(ExportOrders::class, fn ($job) => $job->userId === $user->id);",
        "    Queue::assertPushedOn('exports', ExportOrders::class);",
        "});"
      ],
      "note": "Job parametrlari va navbat nomi tekshiriladi."
    },
    {
      "title": "Aniq event'larni fake qilish",
      "lang": "php",
      "code": [
        "it('dispatches OrderPaid when the webhook confirms payment', function () {",
        "    $order = Order::factory()->pending()->create();",
        "    Event::fake([OrderPaid::class]);   // model event'lari ishlashda qoladi",
        "",
        "    $this->postJson('/webhooks/payme', paymentPayload($order))->assertOk();",
        "",
        "    Event::assertDispatched(OrderPaid::class, fn ($e) => $e->order->is($order));",
        "    expect($order->fresh()->status)->toBe('paid');",
        "});"
      ],
      "note": "Faqat OrderPaid fake, shuning uchun model hodisalari va status yangilanishi haqiqiy."
    }
  ],
  "pitfalls": [
    "`Event::fake()` ni ro'yxatsiz chaqirish: model event'lari ham o'chadi va status yoki slug yaratilmay qoladi.",
    "Fake'ni ma'lumot tayyorlashdan oldin chaqirish: factory yaratgan event'lar ham fake qilinadi yoki noto'g'ri sanaladi.",
    "Faqat \"yuborildi\" ni tekshirish: job ichidagi mantiq alohida test qilinmasa, u hech qachon sinalmaydi.",
    "Parametrsiz `assertPushed` ishlatish: noto'g'ri qiymat bilan yuborilgan job ham o'tadi."
  ]
});
