/* Chuqur dars: 5.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.8", {
  "lesson": [
    "### Observer",
    "**Observer** — bir obyekt (subject) holati o'zgarganda unga **obuna bo'lgan** boshqa obyektlar (observer) avtomatik xabardor qilinadi. Subject observer'larning aniq turini bilmaydi: bo'shashgan bog'lanish (loose coupling).",
    "",
    "### Tuzilma",
    "`Subject`: `attach()`, `detach()`, `notify()`. `Observer`: `update($event)`. PHP'da SPL: `SplSubject`/`SplObserver` (kam ishlatiladi); zamonaviy usul — **event dispatcher**.",
    "",
    "### Qachon",
    "Bir hodisaga ko'p mustaqil reaksiya (buyurtma to'landi → email, hisob-faktura, analitika, ombor). Yangi reaksiya qo'shilganda asosiy kod o'zgarmasin (OCP).",
    "",
    "### Laravel'da",
    "- **Events/Listeners:** `OrderPaid::dispatch($order)` → listener'lar.",
    "- **Eloquent Observers:** `created`, `updated`, `deleting` model hodisalari.",
    "- Queued listener'lar (`ShouldQueue`).",
    "- `Event::fake()` testda.",
    "",
    "### Ehtiyot",
    "- **Yashirin oqim:** kod \"sehrli\" ishlaydi, nima nima chaqirishini topish qiyin: hodisa nomlari aniq, hujjatlangan bo'lsin.",
    "- **Tartib:** listener'lar tartibiga tayanmang.",
    "- **Xatolar:** bitta listener xatosi boshqalarga ta'sir qilmasligi kerak (queue).",
    "- **Tsikl:** listener yangi hodisa chiqarib, cheksiz tsikl.",
    "- Tranzaksiya: hodisani commitdan keyin yuboring (`afterCommit`).",
    "",
    "### Alternativa",
    "Aniq chaqiruv (servis boshqa servisni chaqiradi) soddaroq: faqat haqiqatan ajratilishi kerak bo'lsa hodisa."
  ],
  "examples": [
    {
      "title": "Laravel event/listener",
      "lang": "php",
      "code": [
        "final class OrderPaid { public function __construct(public Order $order) {} }",
        "",
        "final class SendReceipt implements ShouldQueue",
        "{",
        "    public function handle(OrderPaid $e): void { Mail::to($e->order->email)->send(new Receipt($e->order)); }",
        "}",
        "// EventServiceProvider / auto-discovery",
        "// chaqirish",
        "DB::transaction(fn () => $order->markPaid());",
        "OrderPaid::dispatch($order);       // commit'dan keyin"
      ]
    }
  ],
  "pitfalls": [
    "Hodisa tizimi 'sehr'ga aylanadi: oqimni kuzatish qiyin, nomlar aniq bo'lsin.",
    "Listener'lar tartibiga tayanish xatoga olib keladi.",
    "Tranzaksiya ichida hodisa yuborish: rollback bo'lsa ham listener ishlab ketishi mumkin (`afterCommit`).",
    "Listener ichida yangi hodisa chiqarib cheksiz tsikl hosil qilish xavfi."
  ]
});
