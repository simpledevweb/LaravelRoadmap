/* Chuqur dars: 2.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.21", {
  "lesson": [
    "### Mail",
    "`php artisan make:mail OrderShipped`. **Mailable** (L9+ sintaksis): `envelope()` (mavzu, from), `content()` (view/markdown), `attachments()`.",
    "Yuborish: `Mail::to($user)->send(new OrderShipped($order))`, `->queue()`, `->later(now()->addMinutes(5), ...)`, `cc/bcc`.",
    "",
    "### Drayverlar",
    "`MAIL_MAILER`: `smtp`, `ses`, `mailgun`, `postmark`, `resend`, `sendmail`, `log` (dev: faylga yozadi), `array` (test). Dev uchun Mailtrap/Mailpit/Mailhog.",
    "",
    "### Notification",
    "Bir xabarni **bir necha kanal** orqali: `mail`, `database`, `broadcast`, `slack`, `vonage` (SMS), `telegram` (paket).",
    "`php artisan make:notification InvoicePaid`: `via($notifiable)` kanallar ro'yxati, `toMail()`, `toArray()`/`toDatabase()`, `toSlack()`.",
    "Yuborish: `$user->notify(new InvoicePaid($invoice))` (`Notifiable` trait), `Notification::send($users, ...)`.",
    "",
    "### Queue",
    "`implements ShouldQueue` — fon'da, ko'p foydalanuvchiga ommaviy yuborishda majburiy deyarli. `afterCommit`.",
    "",
    "### Database notification",
    "`notifications` jadvali (`php artisan notifications:table`), `$user->unreadNotifications`, `markAsRead()`.",
    "",
    "### Til va shablon",
    "`lang/` bilan lokalizatsiya, `Mail::to($u)->locale('uz')`, Markdown mail (`@component`), `vendor:publish --tag=laravel-mail`.",
    "",
    "### Test",
    "`Mail::fake()`, `Notification::fake()`, `assertSent`, `assertQueued`, `assertSentTo`.",
    "",
    "### Qoidalar",
    "- Email yuborishni queue'ga bering (HTTP so'rovni sekinlashtirmasin).",
    "- Unsubscribe/spam talablari (SPF, DKIM, DMARC) — domen sozlamasi."
  ],
  "examples": [
    {
      "title": "Mailable va Notification",
      "lang": "php",
      "code": [
        "final class OrderShipped extends Mailable implements ShouldQueue",
        "{",
        "    use Queueable;",
        "    public function __construct(public Order $order) {}",
        "    public function envelope(): Envelope { return new Envelope(subject: \"Buyurtma #{$this->order->id} yo'lda\"); }",
        "    public function content(): Content { return new Content(markdown: 'mail.order-shipped'); }",
        "}",
        "Mail::to($order->email)->send(new OrderShipped($order));",
        "",
        "final class InvoicePaid extends Notification implements ShouldQueue",
        "{",
        "    public function via($n): array { return ['mail', 'database']; }",
        "    public function toMail($n): MailMessage { return (new MailMessage)->subject('To\\'landi')->line('Rahmat!'); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Email'ni so'rov ichida sinxron yuborish javobni sekinlashtiradi: queue.",
    "SPF/DKIM/DMARC sozlanmasa xatlar spamga tushadi.",
    "Dev muhitida haqiqiy foydalanuvchilarga xat ketib qolmasin: `log`/Mailpit driver.",
    "Notification `via()` ichida og'ir mantiq: kanalni oddiy tanlang."
  ]
});
