/* Chuqur dars: 5.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.1", {
  "lesson": [
    "### Factory nima",
    "**Factory** — obyekt yaratish mantiqini alohida joyga chiqaradi: chaqiruvchi `new Konkret()` yozmaydi, factory'dan so'raydi. Yaratish murakkab yoki turli variantli bo'lganda foydali.",
    "",
    "### Variantlar",
    "- **Simple Factory / Static factory method:** `Notifier::for('sms')`, `Money::fromTiyin()` (named constructor).",
    "- **Factory Method:** ota klass `create()` ni e'lon qiladi, vorislar qaysi obyektni yaratishni hal qiladi.",
    "- **Abstract Factory:** bog'liq obyektlar oilasi (5.2).",
    "",
    "### Qachon kerak",
    "- Yaratish mantiqi murakkab (bog'liqliklar, sozlama).",
    "- Konkret tur runtime'da tanlanadi (konfiguratsiya, kiritma).",
    "- Yaratishni testda almashtirish kerak.",
    "- Konstruktor ma'nosi noaniq (nomli konstruktor aniqroq).",
    "",
    "### Laravel'da",
    "- **Container:** `app()->make()` aslida factory.",
    "- **Model factories:** `User::factory()->count(10)->create()` (test ma'lumotlari).",
    "- `Manager` klasslari (`Cache::driver('redis')`, `Mail::mailer('smtp')`) — drayver factory'si.",
    "- `Notification` kanallari, `Storage::disk()`.",
    "",
    "### Foydasi",
    "Chaqiruvchi konkret klassga bog'lanmaydi (DIP), yaratish bitta joyda o'zgaradi (OCP), test uchun fake qaytarish oson.",
    "",
    "### Ehtiyot",
    "Oddiy `new` yetarli bo'lsa factory ortiqcha (YAGNI). Factory ichida katta `switch` — OCP buzilishi: registry/konfiguratsiya bilan kengaytiring."
  ],
  "examples": [
    {
      "title": "Simple factory",
      "lang": "php",
      "code": [
        "interface Notifier { public function send(string $to, string $m): void; }",
        "final class EmailNotifier implements Notifier { public function send(string $to, string $m): void {} }",
        "final class SmsNotifier implements Notifier { public function send(string $to, string $m): void {} }",
        "",
        "final class NotifierFactory",
        "{",
        "    public static function make(string $channel): Notifier",
        "    {",
        "        return match ($channel) {",
        "            'email' => new EmailNotifier(),",
        "            'sms'   => new SmsNotifier(),",
        "            default => throw new InvalidArgumentException(\"Noma'lum kanal: $channel\"),",
        "        };",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Oddiy `new` yetarli joyda factory ortiqcha murakkablik (YAGNI).",
    "Factory ichida o'sib boruvchi `match`/`switch` OCP'ni buzadi: registry yoki container binding.",
    "Statik factory testda almashtirishni qiyinlashtiradi: instance factory va DI ishlating.",
    "Factory yashirin bog'liqlik (`app()`) olib kirmasin."
  ]
});
