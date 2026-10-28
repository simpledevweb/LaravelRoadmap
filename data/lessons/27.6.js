/* Chuqur dars: 27.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.6", {
  "lesson": [
    "### Tashqi bog'liqlik nima",
    "Sizning nazoratingizdan tashqaridagi va unit testni sekin, nodeterministik yoki xavfli qiladigan narsalar: to'lov shlyuzi, SMS provayderi, valyuta kursi API'si, email, fayl saqlash (S3), boshqa mikroservislar, vaqt va tasodifiylik.",
    "",
    "### Adapter (port) naqshi",
    "1. O'z domeningiz tilida **interfeys** (port): `PaymentGateway::charge(Money $amount, string $idempotencyKey): ChargeResult`. Tashqi API tafsilotlari (URL, JSON format, xato kodlari) unda yo'q.",
    "2. **Haqiqiy adapter:** `PaymeGateway implements PaymentGateway` — HTTP so'rov, javobni domen obyektiga aylantirish. Integratsiya testlari bilan `Http::fake()` va haqiqiy javob namunalariga qarshi (25.12).",
    "3. **Unit testlarda:** fake yoki mock implementatsiya.",
    "",
    "\"Don't mock what you don't own\": tashqi SDK klasslarini (`\\Stripe\\StripeClient`) to'g'ridan-to'g'ri mock qilmang. Ularning API'si o'zgarsa, mock'laringiz yolg'on yashil bo'ladi. O'zingizning interfeysingizni mock qiling.",
    "",
    "### Fake, stub yoki mock (25.6)",
    "- **Fake** (`InMemoryPaymentGateway`) — eng ko'p qayta ishlatiladigan: holatni saqlaydi (`$charges` massivi), ko'p testda ishlatiladi, sozlanadigan xatolar (`failNextWith(new PaymentDeclined())`).",
    "- **Stub** — bitta testda belgilangan javob.",
    "- **Mock** — chaqiruv **aynan shunday** bo'lishi muhim bo'lsa (\"idempotency key buyurtma ID'si bilan uzatildi\").",
    "",
    "### Xato holatlarini sinash",
    "Tashqi bog'liqliklarni almashtirishning asosiy foydasi — xato holatlarini oson yaratish: timeout, rad etilgan to'lov, noto'g'ri javob, 503. Haqiqiy servis bilan ularni qaytarish deyarli imkonsiz.",
    "",
    "### Kontrakt",
    "Fake haqiqiy adapter bilan bir xil ishlashi kerak. Ikkalasiga qarshi ishlaydigan **umumiy kontrakt testlari** (abstract test klassi yoki Pest dataset) bu kafolatni beradi."
  ],
  "examples": [
    {
      "title": "Port, fake va xato holati",
      "lang": "php",
      "code": [
        "interface PaymentGateway",
        "{",
        "    /** @throws PaymentDeclined|GatewayUnavailable */",
        "    public function charge(Money $amount, string $idempotencyKey): ChargeResult;",
        "}",
        "",
        "final class FakePaymentGateway implements PaymentGateway",
        "{",
        "    public array $charges = [];",
        "    private ?Throwable $nextError = null;",
        "",
        "    public function failNextWith(Throwable $e): void { $this->nextError = $e; }",
        "",
        "    public function charge(Money $amount, string $idempotencyKey): ChargeResult",
        "    {",
        "        if ($e = $this->nextError) { $this->nextError = null; throw $e; }",
        "        $this->charges[] = [$amount, $idempotencyKey];",
        "        return new ChargeResult('ch_' . count($this->charges), 'succeeded');",
        "    }",
        "}",
        "",
        "it('keeps order pending when payment is declined', function () {",
        "    $gateway = new FakePaymentGateway();",
        "    $gateway->failNextWith(new PaymentDeclined('insufficient_funds'));",
        "    $order = Orders::pending(total: Money::uzs(150_000));",
        "",
        "    expect(fn () => (new PayOrder($gateway))->handle($order))->toThrow(PaymentDeclined::class);",
        "    expect($order->status)->toBe(OrderStatus::Pending)",
        "        ->and($gateway->charges)->toBeEmpty();",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Tashqi SDK klasslarini to'g'ridan-to'g'ri mock qilish.",
    "Faqat muvaffaqiyatli javobni simulyatsiya qilib, xato holatlarini sinamaslik.",
    "Fake va haqiqiy adapter xulq-atvori ajralib ketishi: kontrakt testlari yo'q.",
    "Interfeysda tashqi API tafsilotlarini (JSON maydonlari, xato kodlari) oshkor qilish."
  ]
});
