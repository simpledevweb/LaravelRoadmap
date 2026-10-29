/* Chuqur dars: 29.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.12", {
  "lesson": [
    "### Mail va Notification fake'lari",
    "Feature testlarda haqiqiy xat yoki bildirishnoma yuborilmaydi. Fake yuborish niyatini qayd qiladi va tekshirish imkonini beradi.",
    "",
    "### Mail::fake()",
    "- `Mail::assertSent(Mailable::class, fn ($m) => $m->hasTo($email))`: yuborildi va qabul qiluvchi to'g'ri.",
    "- `Mail::assertQueued(...)`: `ShouldQueue` mailable'lar navbatga qo'yiladi, shuning uchun `assertSent` emas, `assertQueued` ishlatiladi.",
    "- `Mail::assertNothingSent()`, `assertNotSent(...)`, `assertSentCount(n)`.",
    "",
    "### Notification::fake()",
    "- `Notification::assertSentTo($user, InvoicePaid::class, fn ($n, array $channels) => ...)`: foydalanuvchiga yuborildi va kanallar to'g'ri.",
    "- `assertNotSentTo`, `assertNothingSent`, `assertCount(n)`.",
    "- Kanal tanlovi: `via()` foydalanuvchi sozlamalariga qarab to'g'ri kanallarni qaytarishini tekshiring (mail, database, SMS).",
    "",
    "### Mazmunni alohida tekshirish",
    "Fake faqat yuborilganini ko'rsatadi, xat matnini emas. Mazmunni mailable'ning o'zi bilan tekshiring:",
    "- `$mailable->assertSeeInHtml('Buyurtma #12')`, `assertSeeInText`;",
    "- `assertHasSubject('Hisob-faktura')`, `assertHasAttachment(...)`;",
    "- bildirishnoma uchun `(new InvoicePaid($invoice))->toMail($user)` natijasini tekshirish.",
    "",
    "### Til va maxfiy ma'lumot",
    "Foydalanuvchi tiliga mos xat yuborilishini sinang (`locale()`). Xat ichida maxfiy ma'lumot (parol, to'liq karta raqami) bo'lmasligini tekshiring.",
    "",
    "### Ish taqsimoti",
    "Endpoint testi \"xat yuborildi\" ni, mailable testi esa \"xat to'g'ri ko'rinadi\" ni tekshiradi. Ikkalasi ham kerak: birinchisiz xat umuman yuborilmay qolishi, ikkinchisiz noto'g'ri mazmun bilan yuborilishi mumkin."
  ],
  "examples": [
    {
      "title": "Bildirishnoma va kanallar",
      "lang": "php",
      "code": [
        "it('notifies the customer by mail and database when an invoice is paid', function () {",
        "    Notification::fake();",
        "    $invoice = Invoice::factory()->unpaid()->create();",
        "",
        "    $this->actingAs($invoice->customer->user)",
        "        ->postJson(\"/api/invoices/{$invoice->id}/pay\")",
        "        ->assertOk();",
        "",
        "    Notification::assertSentTo(",
        "        $invoice->customer,",
        "        InvoicePaid::class,",
        "        fn ($n, array $channels) => $channels === ['mail', 'database']",
        "    );",
        "});"
      ],
      "note": "Kim va qaysi kanallar bo'yicha olgani tekshiriladi."
    },
    {
      "title": "Mailable mazmuni",
      "lang": "php",
      "code": [
        "it('renders the invoice mail correctly', function () {",
        "    $invoice = Invoice::factory()->create(['number' => 'INV-100', 'total' => 250_000]);",
        "",
        "    $mailable = new InvoiceMail($invoice);",
        "",
        "    $mailable->assertHasSubject('Hisob-faktura INV-100');",
        "    $mailable->assertSeeInHtml('250 000');",
        "    $mailable->assertHasAttachment(Attachment::fromStorageDisk('invoices', 'INV-100.pdf'));",
        "});"
      ],
      "note": "Fake yetmaydi: mazmunni mailable obyektining o'zi bilan tekshiriladi."
    }
  ],
  "pitfalls": [
    "Navbatli mailable uchun `assertSent` ishlatish: u `assertQueued` bo'lishi kerak va test noto'g'ri yiqiladi.",
    "Fake bilan cheklanib, xat mazmunini hech qachon tekshirmaslik: noto'g'ri matn yoki ko'rinmas havola productionga chiqadi.",
    "Kanal tanlovini testlamaslik: foydalanuvchi o'chirib qo'ygan kanalga ham bildirishnoma yuboriladi.",
    "`Mail::fake()` ni unutish: testda haqiqiy xat yuborilishi yoki mailer sozlamasiga bog'liq bo'lib qolish."
  ]
});
