/* Chuqur dars: 5.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.9", {
  "lesson": [
    "### Command",
    "**Command** — so'rovni (amalni) **obyektga aylantiradi**: nima qilish kerakligi, parametrlari va bajaruvchi bitta obyektda. Natijada amalni uzatish, navbatga qo'yish, log qilish, bekor qilish (undo) mumkin.",
    "",
    "### Tuzilma",
    "`Command` interface (`execute()`), `ConcreteCommand` (ma'lumot + receiver), `Invoker` (chaqiradi), `Receiver` (haqiqiy ishni bajaradi).",
    "",
    "### Qachon",
    "- Amalni **kechiktirish/navbatga** qo'yish.",
    "- **Undo/redo**.",
    "- Amallarni log qilish va qayta bajarish.",
    "- UI/HTTP'ni biznes mantiqdan ajratish.",
    "- Makro (bir necha buyruqni zanjirlash).",
    "",
    "### Laravel'da",
    "- **Queue Job:** `ProcessPodcast::dispatch($podcast)` — serializatsiya qilinadigan command.",
    "- **Artisan Command**.",
    "- **Action klasslari** (`__invoke`): bitta amal, qayta ishlatiladigan.",
    "- **Bus / CQRS:** `Bus::dispatch(new CreateOrder(...))`, command handler.",
    "- **Bus::chain/batch.**",
    "",
    "### Command va CQRS",
    "CQRS'da yozish amallari **command** (`PlaceOrder`), o'qish **query** (`GetOrder`). Command niyatni ifodalaydi va natija o'zgarish.",
    "",
    "### Ehtiyot",
    "- Command'larni **immutable DTO** qiling (serializatsiya uchun).",
    "- Idempotentlik (navbatda qayta bajarilishi mumkin).",
    "- Oddiy chaqiruv uchun ortiqcha obyekt YAGNI."
  ],
  "examples": [
    {
      "title": "Command va handler",
      "lang": "php",
      "code": [
        "final readonly class PlaceOrder { public function __construct(public int $userId, public array $items) {} }",
        "",
        "final class PlaceOrderHandler",
        "{",
        "    public function __construct(private OrderRepository $orders, private Mailer $mailer) {}",
        "    public function __invoke(PlaceOrder $c): Order",
        "    {",
        "        $order = $this->orders->save(Order::create($c->userId, $c->items));",
        "        $this->mailer->send($order->email, 'Qabul qilindi');",
        "        return $order;",
        "    }",
        "}",
        "$order = app(PlaceOrderHandler::class)(new PlaceOrder(5, [['sku' => 'A', 'qty' => 1]]));"
      ]
    }
  ],
  "pitfalls": [
    "Command'ni mutable qilish serializatsiya va qayta bajarishda xato beradi: immutable DTO.",
    "Navbatdagi command qayta bajarilishi mumkin: idempotent yozing.",
    "Oddiy bir martalik chaqiruv uchun alohida Command klassi ortiqcha.",
    "Command ichiga HTTP/UI tafsilotini qo'yish qatlamlarni aralashtiradi."
  ]
});
