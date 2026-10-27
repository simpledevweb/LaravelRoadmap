/* Chuqur dars: 3.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.11", {
  "lesson": [
    "### Coupling (bog'lanish)",
    "Coupling — modul/klasslarning bir-biriga qanchalik **bog'liqligi**. Kam bo'lishi kerak: bir qism o'zgarsa boshqasi kam ta'sirlansin.",
    "",
    "### Cohesion (jipslik)",
    "Cohesion — bitta modul ichidagi elementlarning o'zaro qanchalik **bir maqsadga** xizmat qilishi. Yuqori bo'lishi kerak: klass bitta narsa haqida bo'lsin.",
    "",
    "**Maqsad: low coupling, high cohesion.**",
    "",
    "### Coupling darajalari (yomondan yaxshiga)",
    "1. **Content/Global:** boshqa modulning ichki holatiga yoki global o'zgaruvchiga bog'lanish (`global`, static holat).",
    "2. **Konkret klassga bog'lanish:** `new StripeClient()` ichkarida.",
    "3. **Interface'ga bog'lanish:** abstraksiya orqali.",
    "4. **Ma'lumot orqali (data coupling):** faqat kerakli qiymatlarni parametr sifatida olish.",
    "5. **Hodisa (event) orqali:** bir-birini bilmaydi.",
    "",
    "### Cohesion belgilari",
    "- **Yuqori:** `PriceCalculator` faqat narx hisoblaydi.",
    "- **Past:** `Utils`, `Helper`, `Manager` — turli narsalarni yig'indisi; \"nima uchun bu yerda?\" savoli paydo bo'ladi.",
    "Test: klass vazifasini bitta gap bilan \"va\" so'zisiz ayta olasizmi?",
    "",
    "### Qanday kamaytirish/oshirish",
    "- **Coupling:** DI + interface, hodisalar, Law of Demeter, statik holatdan qochish.",
    "- **Cohesion:** SRP bo'yicha klassni bo'lish, bir mavzuga oid metodlarni birlashtirish, feature envy (boshqa klass ma'lumotini ko'p ishlatuvchi metodni o'sha klassga ko'chirish).",
    "",
    "### Kod hidlari",
    "- **God class:** past cohesion.",
    "- **Shotgun surgery:** bitta o'zgarish ko'p joyga tegadi (yuqori coupling).",
    "- **Feature envy**, **Inappropriate intimacy** (klass boshqa klass ichiga haddan tashqari kiradi).",
    "",
    "### O'lchash",
    "Statik tahlil: PHPMetrics, PHPStan qoidalari (bog'liqlik soni, sikllomatik murakkablik), `deptrac` (qatlamlar orasidagi bog'lanishlarni cheklash).",
    "",
    "### Muvozanat",
    "Past coupling uchun ortiqcha abstraksiya qo'shish ham murakkablik: ehtiyoj bo'lganda."
  ],
  "examples": [
    {
      "title": "Yuqori va past coupling",
      "lang": "php",
      "code": [
        "// YUQORI: konkret klass va global holat",
        "final class Report { public function send() { (new SmtpMailer('smtp.x.uz'))->send(Auth::user()->email, $this->build()); } }",
        "",
        "// PASTROQ: DI + kerakli ma'lumot parametr sifatida",
        "final class Report",
        "{",
        "    public function __construct(private Mailer $mailer) {}",
        "    public function send(string $to): void { $this->mailer->send($to, $this->build()); }",
        "}"
      ]
    },
    {
      "title": "Feature envy",
      "lang": "php",
      "code": [
        "// YOMON: OrderPrinter Order ichini ko'p biladi",
        "final class OrderPrinter { public function total(Order $o): int { $t = 0; foreach ($o->lines as $l) { $t += $l->qty * $l->price; } return $t; } }",
        "",
        "// YAXSHI: mantiq ma'lumot egasida",
        "final class Order { public function total(): int { return array_sum(array_map(fn ($l) => $l->subtotal(), $this->lines)); } }"
      ]
    }
  ],
  "pitfalls": [
    "`Utils`/`Helper` klasslari past cohesion belgisi: mas'uliyatga mos nom va klass bering.",
    "Statik holat va global (`Auth::user()` ichkarida) yashirin bog'lanish hosil qiladi.",
    "Faqat 'past coupling' uchun har joyga interface qo'shish ortiqcha murakkablik: ehtiyojga qarab.",
    "Shotgun surgery (bitta o'zgarish ko'p fayl) — coupling yuqori ekanining belgisi."
  ]
});
