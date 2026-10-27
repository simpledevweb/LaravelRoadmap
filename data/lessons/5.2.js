/* Chuqur dars: 5.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.2", {
  "lesson": [
    "### Abstract Factory",
    "**Abstract Factory** — bir-biriga **bog'liq obyektlar oilasini** konkret klasslarni ko'rsatmasdan yaratadigan interface. Oila mos kelishi kafolatlanadi: ichki obyektlar bir \"mavzu\"ga tegishli.",
    "",
    "### Misol g'oyasi",
    "UI mavzulari: `LightThemeFactory` → `LightButton`, `LightInput`; `DarkThemeFactory` → `DarkButton`, `DarkInput`. Yoki: to'lov tizimi oilasi (`StripeFactory` → `StripeClient` + `StripeWebhookVerifier`).",
    "",
    "### Tuzilma",
    "- `AbstractFactory` interface: `createButton()`, `createInput()`.",
    "- Konkret factory'lar oila bo'yicha.",
    "- Klient faqat abstract factory va mahsulot interface'lari bilan ishlaydi.",
    "",
    "### Factory Method bilan farq",
    "Factory Method — bitta mahsulot; Abstract Factory — mahsulotlar **oilasi**.",
    "",
    "### Qachon",
    "- Bir nechta bog'liq obyektlar birga almashtirilishi kerak (provayder, platforma, mavzu).",
    "- Mos kelmaydigan obyektlarni aralashtirib yuborish xavfi bor.",
    "",
    "### Laravel'da",
    "Bevosita kam; `Manager` drayverlari va container binding'lari shu g'oya: bitta konfiguratsiya (`MAIL_MAILER`) butun oilani almashtiradi.",
    "",
    "### Narxi",
    "Yangi mahsulot turi qo'shish barcha factory'larni o'zgartiradi. Interfeys soni ko'payadi: faqat haqiqiy oila kerak bo'lganda."
  ],
  "examples": [
    {
      "title": "To'lov provayderi oilasi",
      "lang": "php",
      "code": [
        "interface PaymentFactory { public function client(): PaymentClient; public function webhookVerifier(): WebhookVerifier; }",
        "",
        "final class StripeFactory implements PaymentFactory",
        "{",
        "    public function client(): PaymentClient { return new StripeClient(config('services.stripe.key')); }",
        "    public function webhookVerifier(): WebhookVerifier { return new StripeWebhookVerifier(config('services.stripe.secret')); }",
        "}",
        "final class PaymeFactory implements PaymentFactory { /* ... */ public function client(): PaymentClient { return new PaymeClient(); } public function webhookVerifier(): WebhookVerifier { return new PaymeVerifier(); } }",
        "",
        "$this->app->bind(PaymentFactory::class, fn () => config('pay.driver') === 'stripe' ? new StripeFactory() : new PaymeFactory());"
      ]
    }
  ],
  "pitfalls": [
    "Bitta mahsulot uchun Abstract Factory ortiqcha: Factory Method yoki oddiy factory.",
    "Yangi mahsulot turi barcha konkret factory'larni o'zgartirishni talab qiladi.",
    "Oila mos kelishini kafolatlamasa (klient aralashtirsa) pattern foydasiz.",
    "Ortiqcha interface'lar soni murakkablikni oshiradi."
  ]
});
