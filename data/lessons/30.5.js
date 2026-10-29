/* Chuqur dars: 30.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.5", {
  "lesson": [
    "### TDD va arxitektura",
    "TDD faqat test yozish usuli emas, **dizayn fikr-mulohazasi**. Agar test yozish qiyin bo'lsa, bu odatda dizayn muammosi: sinf juda ko'p narsaga bog'liq, global holatdan foydalanadi, biznes mantiq framework'ga yopishgan. Test qiyinligi dizayn haqida signal beradi.",
    "",
    "### Testlanadigan dizayn belgilari",
    "- **Kichik sinflar**, bitta mas'uliyat.",
    "- **Aniq dependency'lar** (konstruktor orqali), yashirin `new` yoki `app()` chaqiruvlari yo'q.",
    "- **Sof funksiyalar**: bir xil kirish, bir xil chiqish, yon ta'sirsiz.",
    "- **Tashqi chegaralar interfeys ortida**: DB, HTTP, vaqt, fayl.",
    "- **Biznes mantiq framework'dan ajratilgan**: Eloquent yoki request obyektlariga bog'lanmagan.",
    "- **Global holat yo'q**: statik o'zgaruvchilar va singleton'lar izolyatsiyani buzadi.",
    "",
    "### Laravel'da amaliyot",
    "- Controller yupqa: validatsiyadan keyin bitta Action/Service'ni chaqiradi.",
    "- Biznes qoidasi Action, Service yoki Domain sinflarida.",
    "- `now()`, `Str::uuid()`, `rand()` kabi nodeterministik chaqiruvlar chegarada (Clock, IdGenerator interfeyslari).",
    "- Tashqi servislar adapter orqali (`PaymentGateway`).",
    "",
    "Natijada **domen** tez unit testlar bilan, **chegaralar** (adapter, controller) esa feature va integratsion testlar bilan qoplanadi.",
    "",
    "### Facade va static chaqiruvlar",
    "Laravel facade'lari testlanadi (`Cache::shouldReceive`, `Mail::fake`), lekin ularni domen ichiga yoyib yuborish domenni framework'ga bog'laydi. Facade'larni chegarada (controller, adapter) saqlab, domen sinflariga kerakli narsani konstruktor orqali bering.",
    "",
    "### Ortiqcha ketmaslik",
    "Har sinf uchun interfeys yaratish shart emas. Interfeysni haqiqiy ehtiyoj (tashqi chegara, almashtirish) talab qilganda kiriting."
  ],
  "examples": [
    {
      "title": "Aniq dependency'lar",
      "lang": "php",
      "code": [
        "final class PlaceOrder",
        "{",
        "    public function __construct(",
        "        private OrderRepository $orders,",
        "        private Inventory $inventory,",
        "        private Clock $clock,",
        "    ) {}",
        "",
        "    public function handle(Customer $customer, array $lines): Order",
        "    {",
        "        $order = Order::place($customer, $lines, $this->clock->now());",
        "        $this->inventory->reserve($order);",
        "        $this->orders->save($order);",
        "",
        "        return $order;",
        "    }",
        "}"
      ],
      "note": "Hamma hamkorlar konstruktorda ko'rinadi, testda fake bilan almashtiriladi."
    },
    {
      "title": "Testda fake'lar bilan",
      "lang": "php",
      "code": [
        "it('reserves stock and saves the order', function () {",
        "    $orders = new InMemoryOrderRepository();",
        "    $inventory = new FakeInventory(stock: ['A1' => 10]);",
        "    $action = new PlaceOrder($orders, $inventory, new FrozenClock('2026-01-10'));",
        "",
        "    $order = $action->handle($customer, [Line::of('A1', 2)]);",
        "",
        "    expect($orders->find($order->id()))->not->toBeNull()",
        "        ->and($inventory->reserved('A1'))->toBe(2);",
        "});"
      ],
      "note": "Framework yoki DB'siz, tez unit test."
    }
  ],
  "pitfalls": [
    "Test yozish qiyin bo'lganda testni emas, dizaynni ayblash o'rniga mocklarni ko'paytirish: asosiy muammo yechilmaydi.",
    "Biznes mantiqni controller yoki Eloquent model ichiga yig'ish: faqat sekin feature testlar bilan tekshiriladi.",
    "`now()` va `rand()` ni domen ichida to'g'ridan-to'g'ri ishlatish: testlar nodeterministik bo'ladi.",
    "Har sinf uchun ortiqcha interfeys: testlash uchun emas, haqiqiy chegara uchun abstraksiya yarating."
  ]
});
