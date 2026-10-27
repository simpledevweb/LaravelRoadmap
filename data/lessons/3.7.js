/* Chuqur dars: 3.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.7", {
  "lesson": [
    "### Object composition nima",
    "Object composition — murakkab xatti-harakatni kichik, **bir vazifali** obyektlardan yig'ish. Har obyekt o'z ishini qiladi, katta obyekt ularni birlashtirib, ishni topshiradi (delegation). Bu \"has-a\" munosabati: `Order` ichida `Customer`, `Address`, `OrderLine[]` bor.",
    "",
    "### Ikki yondashuv",
    "- **Domen kompozitsiyasi:** model obyektlari bir-birini o'z ichiga oladi (`Order` — qatorlar, manzil, to'lov).",
    "- **Xulq-atvor kompozitsiyasi:** servislar zanjiri (`Checkout` ichida `PricingService`, `PaymentGateway`, `Mailer`).",
    "",
    "### Qanday yig'iladi",
    "Hamkorlar **konstruktor orqali** beriladi (Dependency Injection), obyekt ularni o'zi yaratmaydi:",
    "```php",
    "new Checkout(new PricingService(), $gateway, $mailer);",
    "```",
    "DI container (Laravel) yig'ishni avtomatik bajaradi (autowiring).",
    "",
    "### Foydalari",
    "- **Sinash oson:** har bir qism alohida va fake bilan.",
    "- **Qayta ishlatish:** kichik obyektlar turli joyda ishlatiladi.",
    "- **Moslashuvchanlik:** bitta qismni almashtirish (boshqa gateway) qolganiga ta'sir qilmaydi.",
    "- **Past coupling:** interface orqali bog'lanish.",
    "",
    "### Yaxshi kompozitsiya belgilari",
    "1. Har obyektning bitta sababi bor o'zgarish uchun (SRP).",
    "2. Obyekt hamkorlarini interface orqali biladi.",
    "3. Kompozitsiya ildizi (composition root) bitta joyda: ilova yig'iladigan joy (service provider).",
    "4. Obyekt grafi tsiklsiz.",
    "",
    "### Xavflar",
    "- **Constructor over-injection:** 6–7 dan ortiq bog'liqlik — klass juda ko'p ish qilayotgan belgisi; ajratish kerak.",
    "- **Delegatsiya kodi:** ko'p oddiy \"o'tkazuvchi\" metodlar; ba'zan decorator/proxy yoki to'g'ridan-to'g'ri hamkorni ochish yaxshiroq.",
    "",
    "### Misol (Laravel)",
    "`CheckoutController` → `CheckoutService` (biznes) → `PaymentGateway` (interface) + `OrderRepository`. Controller yupqa, mantiq servisda."
  ],
  "examples": [
    {
      "title": "Composition root",
      "lang": "php",
      "code": [
        "final class CheckoutService",
        "{",
        "    public function __construct(",
        "        private PricingService $pricing,",
        "        private PaymentGateway $gateway,",
        "        private OrderRepository $orders,",
        "        private Mailer $mailer,",
        "    ) {}",
        "",
        "    public function checkout(Cart $cart): Order",
        "    {",
        "        $total = $this->pricing->total($cart);",
        "        $ref = $this->gateway->charge($total, 'UZS');",
        "        $order = $this->orders->save(Order::paid($cart, $ref));",
        "        $this->mailer->send($cart->email, \"Buyurtma #{$order->id}\");",
        "        return $order;",
        "    }",
        "}",
        "",
        "// AppServiceProvider",
        "$this->app->bind(PaymentGateway::class, StripeGateway::class);"
      ]
    },
    {
      "title": "Domen kompozitsiyasi",
      "lang": "php",
      "code": [
        "final class Order",
        "{",
        "    /** @param list<OrderLine> $lines */",
        "    public function __construct(private Customer $customer, private Address $shipTo, private array $lines) {}",
        "    public function total(): int { return array_sum(array_map(fn (OrderLine $l) => $l->subtotal(), $this->lines)); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Klass ichida `new Gateway()` bilan hamkorni yaratish bog'lanishni qattiq qiladi: konstruktor orqali bering.",
    "Konstruktorda 7+ bog'liqlik klassning ortiqcha mas'uliyatidan darak beradi: ajrating.",
    "Obyekt grafida tsikl (A→B→A) DI container'da `Circular dependency` xatosiga olib keladi.",
    "Ichki obyektning ichki tuzilmasiga zanjir bilan murojaat (`$a->b()->c()->d()`) Demeter qonunini buzadi."
  ]
});
