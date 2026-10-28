/* Chuqur dars: 25.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.6", {
  "lesson": [
    "### Test double nima",
    "Test double — testda haqiqiy bog'liqlik o'rniga ishlatiladigan o'rinbosar (kino'dagi \"dublyor\" kabi). Nega kerak:",
    "- haqiqiy bog'liqlik sekin (tashqi API, katta hisob-kitob),",
    "- nazorat qilib bo'lmaydi (vaqt, tasodifiylik, tarmoq),",
    "- yon ta'siri bor (email yuborish, to'lov),",
    "- hali mavjud emas (boshqa jamoa yozmoqda),",
    "- xato holatlarini yaratish qiyin (\"API 503 qaytarsa nima bo'ladi?\").",
    "",
    "### Turlari (Gerard Meszaros klassifikatsiyasi)",
    "1. **Dummy** — faqat parametrni to'ldirish uchun uzatiladi, hech qachon ishlatilmaydi.",
    "2. **Stub** — oldindan belgilangan javoblarni qaytaradi: \"`getRate()` doim 12 650 qaytarsin\". Testning **kirishini** nazorat qiladi. Tekshirilmaydi.",
    "3. **Spy** — chaqiruvlarni yozib oladi va test keyin \"qanday chaqirilgan?\" deb tekshiradi.",
    "4. **Mock** — oldindan **kutilgan chaqiruvlar** bilan sozlanadi (\"`send()` aynan bir marta shu argument bilan chaqirilishi kerak\") va kutilganlar bajarilmasa, test yiqiladi. Testning **chiqishini** (o'zaro ta'sirni) tekshiradi.",
    "5. **Fake** — soddalashtirilgan, lekin ishlaydigan implementatsiya: xotiradagi repository, SQLite in-memory, Laravel'ning `Mail::fake()`, `Queue::fake()`, `Storage::fake()`, `Http::fake()`.",
    "",
    "### Stub yoki mock",
    "Asosiy farq — **nima tekshiriladi**:",
    "- **State verification (stub):** amalni bajarib, natija holatini tekshirish (qaytgan qiymat, DB). Testlar refactoring'ga chidamli.",
    "- **Behavior verification (mock):** aynan qanday metodlar qanday argumentlar bilan chaqirilganini tekshirish. Implementatsiyaga bog'liq va mo'rtroq.",
    "",
    "Qoida: **so'rovlar (query) uchun stub**, **buyruqlar (command, yon ta'sir) uchun mock yoki spy**. \"Kursni ol\" — stub. \"Email yubor\" — spy yoki fake bilan yuborilganini tekshirish.",
    "",
    "### Faqat chegaralarni almashtiring",
    "O'zingizning har bir klassingizni mock qilish — testlarni implementatsiyaga mixlash. Almashtirish kerak bo'lgan narsalar: **tizim chegaralari** — tashqi API'lar, vaqt, fayl tizimi, navbat, email, tasodifiylik. Domen klasslari va qiymat obyektlari haqiqiy bo'lsin.",
    "",
    "\"Don't mock what you don't own\": tashqi kutubxona klasslarini to'g'ridan-to'g'ri mock qilish o'rniga, ularni o'zingizning interfeysingiz (adapter) ortiga yashiring va shu interfeysni almashtiring.",
    "",
    "### Laravel'da",
    "Laravel fake'larni tayyor beradi va ular ko'pincha mock'dan yaxshiroq: `Http::fake()`, `Mail::fake()`, `Notification::fake()`, `Event::fake()`, `Queue::fake()`, `Bus::fake()`, `Storage::fake()`, `Process::fake()`. Container orqali almashtirish: `$this->instance(PaymentGateway::class, $fake)`, `$this->mock()`, `$this->spy()`."
  ],
  "examples": [
    {
      "title": "Stub (kirish) va fake (yon ta'sir)",
      "lang": "php",
      "code": [
        "public function test_converts_price_to_usd(): void",
        "{",
        "    // Stub: kurs manbai doim bir xil qiymat qaytaradi",
        "    $rates = $this->createStub(ExchangeRates::class);",
        "    $rates->method('usdRate')->willReturn(12_650.0);",
        "",
        "    $converter = new PriceConverter($rates);",
        "",
        "    $this->assertSame(10.0, $converter->toUsd(126_500));",
        "}",
        "",
        "public function test_sends_receipt_email(): void",
        "{",
        "    Mail::fake();   // fake: haqiqiy email yuborilmaydi, lekin yozib olinadi",
        "    $order = Order::factory()->paid()->create();",
        "",
        "    app(SendReceipt::class)->handle($order);",
        "",
        "    Mail::assertSent(ReceiptMail::class, fn ($m) => $m->hasTo($order->customer->email));",
        "}"
      ]
    },
    {
      "title": "Chegarani o'z interfeysingiz bilan o'rash",
      "lang": "php",
      "code": [
        "interface SmsSender",
        "{",
        "    public function send(string $phone, string $text): void;",
        "}",
        "",
        "final class EskizSmsSender implements SmsSender { /* haqiqiy HTTP */ }",
        "",
        "final class FakeSmsSender implements SmsSender",
        "{",
        "    public array $sent = [];",
        "    public function send(string $phone, string $text): void { $this->sent[] = compact('phone', 'text'); }",
        "}",
        "",
        "// Testda",
        "$this->instance(SmsSender::class, $sms = new FakeSmsSender());",
        "// ... amal ...",
        "$this->assertCount(1, $sms->sent);"
      ]
    }
  ],
  "pitfalls": [
    "Har bir bog'liqlikni, jumladan domen klasslarini ham mock qilish: testlar implementatsiyaga mixlanadi.",
    "Tashqi kutubxona klasslarini to'g'ridan-to'g'ri mock qilish: kutubxona yangilanganda testlar yolg'on yashil.",
    "So'rov (query) metodlari uchun ham chaqiruvlar sonini tekshirish.",
    "Laravel tayyor fake'lari bor joyda o'z mock'larini yozish."
  ]
});
