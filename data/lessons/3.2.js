/* Chuqur dars: 3.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.2", {
  "lesson": [
    "### Abstraction nima",
    "Abstraction — murakkablikni yashirib, faqat **muhim** narsani ko'rsatish. Chaqiruvchi kod \"**nima** qilinadi\"ni biladi, \"**qanday** qilinadi\"ni bilmaydi. Masalan, `PaymentGateway::charge()` ni chaqiruvchi Stripe yoki Payme ishlatilayotganini bilmaydi.",
    "",
    "### Encapsulation bilan farqi",
    "- **Encapsulation:** ichki holatni yashiradi (ma'lumotni himoya qiladi).",
    "- **Abstraction:** tafsilotni yashiradi va soddalashtirilgan model beradi (murakkablikni boshqaradi).",
    "Ikkalasi birga ishlaydi: abstraksiya interfeys beradi, encapsulation uning ortidagi holatni himoya qiladi.",
    "",
    "### PHP vositalari",
    "- **Interface** — sof abstraksiya (shartnoma).",
    "- **Abstract class** — qisman implementatsiya + abstract metodlar.",
    "- **Klass nomlash:** yaxshi nom abstraksiya darajasini belgilaydi (`Mailer`, `Cache`, `Clock`).",
    "- **Facade / Service klass:** bir necha qadamni bitta metodga yig'adi (`checkout()`).",
    "",
    "### Yaxshi abstraksiya xossalari",
    "1. **Kichik va aniq:** bitta tushuncha (`Mailer::send`), ortiqcha metodlar yo'q.",
    "2. **Domen tilida:** `charge`, `refund`, `markPaid` — texnik detal (`curlPost`) emas.",
    "3. **Sizib chiqmaydi (leaky emas):** abstraksiya tafsilotini oshkor qilsa (masalan, `PdoMailer::getPdo()`), foyda yo'qoladi.",
    "4. **Barqaror:** implementatsiya o'zgarsa interfeys o'zgarmasin.",
    "",
    "### Ortiqcha abstraksiya",
    "Bitta implementatsiyasi bor va hech qachon almashtirilmaydigan interface ko'pincha ortiqcha. Qoida: kamida ikkinchi implementatsiya yoki test (fake) kerak bo'lsa abstraksiya yarating; aks holda oddiy klass yetarli (YAGNI).",
    "",
    "### Laravel'da",
    "`Illuminate\\Contracts\\*` (Cache, Mail, Queue), Facade'lar, Storage drayverlari: bir xil API ostida turli implementatsiyalar.",
    "",
    "### Qatlamlar",
    "Abstraksiya darajalari: yuqori darajali biznes mantiq → xizmatlar → infratuzilma (HTTP, DB). Yuqori daraja pastkining tafsilotini bilmasin."
  ],
  "examples": [
    {
      "title": "Interface orqali abstraksiya",
      "lang": "php",
      "code": [
        "interface PaymentGateway",
        "{",
        "    public function charge(int $amountTiyin, string $currency): string;   // tranzaksiya ID",
        "}",
        "",
        "final class StripeGateway implements PaymentGateway { /* HTTP, kalitlar ichkarida */ public function charge(int $a, string $c): string { return 'ch_123'; } }",
        "final class FakeGateway implements PaymentGateway { public function charge(int $a, string $c): string { return 'fake'; } }",
        "",
        "final class Checkout",
        "{",
        "    public function __construct(private PaymentGateway $gateway) {}",
        "    public function pay(int $amount): string { return $this->gateway->charge($amount, 'UZS'); }",
        "}"
      ]
    },
    {
      "title": "Leaky abstraction",
      "lang": "php",
      "code": [
        "// YOMON: tafsilot sizib chiqdi",
        "interface Mailer { public function send(string $to, string $body): void; public function getSmtpHost(): string; }",
        "",
        "// YAXSHI: faqat kerakli xatti-harakat",
        "interface Mailer { public function send(string $to, string $body): void; }"
      ]
    }
  ],
  "pitfalls": [
    "Har klass uchun avtomatik interface yaratish ortiqcha abstraksiya: kamida ikkinchi implementatsiya yoki test ehtiyoji bo'lsin.",
    "Abstraksiya implementatsiya tafsilotini (SMTP host, SQL) oshkor qilsa, almashtirish imkoni yo'qoladi (leaky abstraction).",
    "Juda keng interface (20 ta metod) implementatorlarni majbur qiladi: kichik interface'larga bo'ling (ISP).",
    "Nom abstraksiyani ifodalamasa (`Manager`, `Helper`, `Util`) mas'uliyat noaniq bo'lib qoladi."
  ]
});
