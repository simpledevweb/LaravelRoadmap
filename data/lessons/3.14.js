/* Chuqur dars: 3.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.14", {
  "lesson": [
    "### SOLID va OOP",
    "SOLID — OOP tamoyillarini amaliy qoidalarga aylantirgan besh tamoyil to'plami (R. Martin). Har biri OOP asoslariga tayanadi:",
    "",
    "| SOLID | Tayanadigan OOP g'oyasi |",
    "|---|---|",
    "| **S** — Single Responsibility | encapsulation, cohesion |",
    "| **O** — Open/Closed | polymorphism, abstraction |",
    "| **L** — Liskov Substitution | inheritance, object contracts |",
    "| **I** — Interface Segregation | abstraction, kichik interface |",
    "| **D** — Dependency Inversion | DI, abstraction, low coupling |",
    "",
    "### Har biri qisqacha",
    "- **SRP:** klassning o'zgarish uchun bitta sababi bo'lsin. Yuqori cohesion = SRP.",
    "- **OCP:** kengayishga ochiq, o'zgarishga yopiq: yangi xulq-atvor yangi klass (polimorfizm) bilan qo'shiladi, eski kod tegilmaydi.",
    "- **LSP:** voris ota o'rnini bosa oladi: shartnoma (pre/postcondition) saqlanadi.",
    "- **ISP:** keng interface o'rniga kichik interface'lar; klass keraksiz metodga majbur emas.",
    "- **DIP:** yuqori daraja pastga emas, ikkalasi abstraksiyaga bog'lanadi; DI bilan amalga oshadi.",
    "",
    "### OOP asoslari ↔ SOLID xaritasi",
    "1. Encapsulation + Cohesion → **SRP**",
    "2. Polymorphism + Abstraction → **OCP**",
    "3. Inheritance + contract → **LSP**",
    "4. Interface → **ISP**",
    "5. Composition + DI + low coupling → **DIP**",
    "",
    "### Tamoyillar qo'llanishi",
    "Tamoyillar **qoidalar emas, yo'nalish**: ortiqcha qo'llash (har klassga interface, har bittadan metodga klass) ham yomon. Maqsad: o'zgartirish oson, test oson, tushunish oson kod.",
    "",
    "### Amaliy belgilar",
    "- SRP buzilgan: klass 500+ qator, ko'p sabab bilan o'zgaradi.",
    "- OCP buzilgan: yangi tur uchun `switch`/`if` ni hamma joyda o'zgartirasiz.",
    "- LSP buzilgan: voris metodlari exception tashlaydi yoki bo'sh.",
    "- ISP buzilgan: interface'da ishlatilmaydigan metodlar.",
    "- DIP buzilgan: yuqori daraja klass ichida `new` bilan konkret klass.",
    "",
    "### Keyingi qadam",
    "SOLID skili har tamoyilni batafsil va Laravel misollari bilan ko'radi; bu mavzu OOP'dan SOLID'ga ko'prik."
  ],
  "examples": [
    {
      "title": "OCP: yangi tur eski kodni o'zgartirmaydi",
      "lang": "php",
      "code": [
        "interface Notifier { public function send(string $to, string $msg): void; }",
        "final class EmailNotifier implements Notifier { public function send(string $to, string $msg): void { /* ... */ } }",
        "final class SmsNotifier implements Notifier { public function send(string $to, string $msg): void { /* ... */ } }",
        "",
        "final class Alert",
        "{",
        "    /** @param iterable<Notifier> $channels */",
        "    public function __construct(private iterable $channels) {}",
        "    public function fire(string $to, string $m): void { foreach ($this->channels as $c) { $c->send($to, $m); } }",
        "}",
        "// TelegramNotifier qo'shilsa Alert o'zgarmaydi"
      ]
    },
    {
      "title": "Buzilishlarni aniqlash",
      "lang": "php",
      "code": [
        "// DIP buzilgan: konkret klass ichkarida",
        "final class Billing { public function pay() { (new StripeClient())->charge(100); } }",
        "",
        "// SRP buzilgan: bitta klass ko'p ish qiladi",
        "final class UserManager { public function register() {} public function sendEmail() {} public function renderHtml() {} public function exportCsv() {} }"
      ]
    }
  ],
  "pitfalls": [
    "SOLID'ni qat'iy qoida deb ortiqcha qo'llash (har klassga interface) murakkablikni oshiradi: maqsad o'zgartirish osonligi.",
    "SRP'ni \"klass bitta metodli bo'lsin\" deb tushunish xato: bitta **o'zgarish sababi** haqida.",
    "OCP uchun bashorat qilinmagan kengayish nuqtalari yaratish ortiqcha: haqiqiy takrorlanish ko'ringach abstraksiyalang.",
    "LSP'ni faqat metod imzosiga qarab tekshirish yetarli emas: xatti-harakat shartnomasi ham saqlansin."
  ]
});
