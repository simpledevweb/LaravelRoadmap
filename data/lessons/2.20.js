/* Chuqur dars: 2.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.20", {
  "lesson": [
    "### Events va Listeners",
    "**Observer pattern:** hodisa (`OrderPaid`) yuz berganda mustaqil **listener**lar ishlaydi. Hodisani yuboruvchi listener'larni bilmaydi.",
    "",
    "### Yaratish",
    "`php artisan make:event OrderPaid`, `make:listener SendReceipt --event=OrderPaid`. Event — oddiy ma'lumot obyekti (`public Order $order`).",
    "",
    "### Ro'yxatga olish",
    "L11+: **auto-discovery** (`handle(OrderPaid $e)` tipi bo'yicha). Aniq: `Event::listen(OrderPaid::class, SendReceipt::class)`. Closure listener.",
    "",
    "### Yuborish",
    "`OrderPaid::dispatch($order)` (`Dispatchable` trait) yoki `event(new OrderPaid($order))`.",
    "",
    "### Queue",
    "Listener `implements ShouldQueue` — fon'da ishlaydi (`$queue`, `$tries`, `$backoff`). Ko'p listener — har biri alohida job.",
    "",
    "### Tranzaksiya",
    "`ShouldDispatchAfterCommit` yoki `$afterCommit = true`: DB commitdan **keyin** ishga tushadi (rollback bo'lgan ma'lumotga reaksiya yo'q).",
    "",
    "### Subscriber va Model Events",
    "`Subscriber` bir klassda ko'p hodisa. Eloquent `creating/created/updating/deleted` hodisalari va `Observer` (`php artisan make:observer`).",
    "",
    "### Test",
    "`Event::fake([OrderPaid::class])`, `Event::assertDispatched(OrderPaid::class)`.",
    "",
    "### Ehtiyot",
    "- \"Yashirin oqim\": nima chaqirishini topish qiyin: hodisa nomlari aniq bo'lsin.",
    "- Listener tartibiga tayanmang.",
    "- Cheksiz tsikl (listener yangi hodisa yuboradi).",
    "- Oddiy chaqiruv yetarli bo'lsa hodisa ortiqcha."
  ],
  "examples": [
    {
      "title": "Event + queued listener",
      "lang": "php",
      "code": [
        "final class OrderPaid { use Dispatchable; public function __construct(public Order $order) {} }",
        "",
        "final class SendReceipt implements ShouldQueue",
        "{",
        "    public int $tries = 3;",
        "    public function handle(OrderPaid $event): void { Mail::to($event->order->email)->send(new Receipt($event->order)); }",
        "}",
        "DB::transaction(fn () => $order->markPaid());",
        "OrderPaid::dispatch($order);     // commit'dan keyin"
      ]
    }
  ],
  "pitfalls": [
    "Tranzaksiya ichida hodisa yuborish: rollback bo'lsa ham listener ishlab ketadi (`afterCommit`).",
    "Listener tartibiga tayanish xatoga olib keladi.",
    "Listener ichida yangi hodisa yuborib cheksiz tsikl hosil qilish xavfi.",
    "Auto-discovery bilan listener ikki marta (qo'lda + avtomatik) ro'yxatdan o'tmasin."
  ]
});
