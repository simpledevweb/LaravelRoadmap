/* Chuqur dars: 4.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.1", {
  "lesson": [
    "### Tamoyil",
    "**Single Responsibility Principle (SRP):** klassning o'zgarish uchun **bitta sababi** bo'lishi kerak. \"Bitta ish qiladi\" emas, \"bitta aktyor (manfaatdor tomon) uchun o'zgaradi\" ma'nosida: agar buxgalter ham, dasturchi ham, marketing ham bitta klassni o'zgartirishni talab qilsa, u bir nechta mas'uliyatni ko'taryapti.",
    "",
    "### Belgilar",
    "- Klass 300–500+ qator, ko'p `use` va ko'p konstruktor bog'liqligi.",
    "- Nomida `And`, `Manager`, `Helper`, `Util`.",
    "- Bir klassda HTTP, biznes qoida, DB va email aralash.",
    "- Test uchun ko'p mock kerak.",
    "",
    "### Qanday ajratish",
    "1. Mas'uliyatlarni ro'yxat qiling (validatsiya, hisoblash, saqlash, bildirishnoma).",
    "2. Har biri uchun alohida klass (Action/Service/Repository/Notifier).",
    "3. Asl klass ularni **kompozitsiya** bilan birlashtiradi (orkestrator).",
    "",
    "### Laravel'da",
    "Controller faqat HTTP (request → javob), biznes mantiq Action/Service klassida, validatsiya `FormRequest`da, saqlash Eloquent/Repository'da, xabar yuborish Notification/Event'da. \"Fat controller\" va \"fat model\" — SRP buzilishi.",
    "",
    "### Haddan oshirmaslik",
    "Har metodga alohida klass yozish SRP emas. Maqsad: o'zgarish sabablari ajralgan bo'lsin, klass soni emas."
  ],
  "examples": [
    {
      "title": "Buzilgan va to'g'rilangan",
      "lang": "php",
      "code": [
        "// YOMON: validatsiya + hisoblash + saqlash + email",
        "final class OrderService {",
        "    public function place(array $d) { /* validate */ /* total */ /* DB insert */ /* mail */ }",
        "}",
        "",
        "// YAXSHI",
        "final class PlaceOrder",
        "{",
        "    public function __construct(private PriceCalculator $price, private OrderRepository $orders, private Mailer $mailer) {}",
        "    public function __invoke(Cart $cart): Order",
        "    {",
        "        $order = $this->orders->save(Order::from($cart, $this->price->total($cart)));",
        "        $this->mailer->send($cart->email, \"Buyurtma #{$order->id}\");",
        "        return $order;",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "SRP'ni 'klass bitta metodli bo'lsin' deb tushunish xato: gap o'zgarish sabablari haqida.",
    "Haddan tashqari bo'lish (har qator uchun klass) kodni topishni qiyinlashtiradi.",
    "`Manager`/`Helper` nomlari mas'uliyat noaniqligini yashiradi.",
    "Controller ichida biznes qoida va DB so'rovlari — Laravel'dagi eng keng tarqalgan SRP buzilishi."
  ]
});
