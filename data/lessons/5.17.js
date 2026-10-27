/* Chuqur dars: 5.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.17", {
  "lesson": [
    "### Facade",
    "**Facade (jabha)** — murakkab quyi tizimga **soddalashtirilgan, yagona interface** beradi. Mijoz ko'p klass bilan emas, bitta kirish nuqtasi bilan ishlaydi.",
    "",
    "### Qachon",
    "- Quyi tizim murakkab (ko'p klass, tartib bilan chaqiriladi).",
    "- Mijoz faqat umumiy imkoniyatlarni ishlatadi.",
    "- Qatlamlarni ajratish (tashqi kutubxona murakkabligini yashirish).",
    "",
    "### Klassik GoF Facade",
    "`OrderFacade::checkout($cart)` ichida `Pricing`, `Payment`, `Inventory`, `Mailer` ni to'g'ri tartibda chaqiradi. Mijoz tafsilotni bilmaydi.",
    "",
    "### Laravel Facade — boshqa narsa",
    "Laravel `Facade`'lari (`Cache::get()`, `DB::table()`) **statik proksi**: statik sintaksis orqali container'dan servisga chaqiruv uzatadi (`__callStatic`). Maqsadi — qisqa sintaksis va test (`Cache::shouldReceive`). GoF Facade'ning g'oyasiga (soddalashtirish) yaqin, lekin amalda service locator.",
    "",
    "### Ehtiyot",
    "- Facade quyi tizimni yopib qo'ymasin: kerak bo'lsa to'g'ridan kirish mumkin bo'lsin.",
    "- \"God facade\": hamma narsani qiladigan klass.",
    "- Laravel Facade servis klass ichida yashirin bog'liqlik (konstruktor DI afzal).",
    "",
    "### Foydasi",
    "Past coupling mijoz va quyi tizim orasida, soddalik, bitta joyda o'zgartirish."
  ],
  "examples": [
    {
      "title": "GoF Facade",
      "lang": "php",
      "code": [
        "final class CheckoutFacade",
        "{",
        "    public function __construct(private Pricing $pricing, private PaymentGateway $payment, private Inventory $stock, private Mailer $mailer) {}",
        "",
        "    public function checkout(Cart $cart): Order",
        "    {",
        "        $total = $this->pricing->total($cart);",
        "        $this->stock->reserve($cart);",
        "        $ref = $this->payment->charge($total, 'UZS');",
        "        $order = Order::paid($cart, $ref);",
        "        $this->mailer->send($cart->email, \"Buyurtma #{$order->id}\");",
        "        return $order;",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Facade 'God class'ga aylanib hamma narsani qilmasin.",
    "Laravel Facade'ni servis ichida ishlatish yashirin bog'liqlik: konstruktor DI.",
    "GoF Facade va Laravel Facade'ni adashtirmang.",
    "Facade quyi tizimga kirishni butunlay yopib qo'ysa moslashuvchanlik yo'qoladi."
  ]
});
