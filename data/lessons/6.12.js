/* Chuqur dars: 6.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.12", {
  "lesson": [
    "### Code smell nima",
    "Code smell — kodda **chuqurroq muammo borligidan darak beruvchi belgi**. Bu xato emas (kod ishlaydi), lekin refaktoring kerakligini ko'rsatadi (M. Fowler).",
    "",
    "### Keng tarqalgan hidlar",
    "- **Long Method / Large Class (God class):** juda katta.",
    "- **Long Parameter List:** 4+ parametr → parametr obyekti.",
    "- **Duplicated Code.**",
    "- **Feature Envy:** metod boshqa klass ma'lumotini ko'p ishlatadi → o'sha klassga ko'chiring.",
    "- **Data Clumps:** bir guruh o'zgaruvchilar doim birga yuradi → obyektga o'rang.",
    "- **Primitive Obsession:** pul/email/telefon `string/int` → Value Object.",
    "- **Switch Statements:** takroriy tur tekshiruvi → polimorfizm.",
    "- **Shotgun Surgery:** bir o'zgarish ko'p joyga tegadi.",
    "- **Divergent Change:** bir klass turli sabab bilan o'zgaradi.",
    "- **Speculative Generality:** keraksiz abstraksiya (YAGNI).",
    "- **Dead Code, Comments (izoh niqobi):** o'lik kod; yomon kodni izoh bilan tushuntirish.",
    "- **Message Chains:** `$a->b()->c()->d()`.",
    "- **Magic numbers.**",
    "",
    "### Refaktoring juftliklari",
    "Hid → davo: Long Method → Extract Method; Primitive Obsession → Value Object; Switch → Strategy/State; Feature Envy → Move Method.",
    "",
    "### Vositalar",
    "PHPStan, PHPMD (hid qoidalari), PHPMetrics, Rector, IDE inspeksiyalari, SonarQube.",
    "",
    "### Qanday muomala",
    "Hid ko'rinsa darrov qayta yozmang: yozib qo'ying, o'zgartirishga to'g'ri kelganda (Boy Scout qoidasi) tozalang."
  ],
  "examples": [
    {
      "title": "Primitive Obsession → Value Object",
      "lang": "php",
      "code": [
        "// HID",
        "function charge(int $amount, string $currency, string $email) {}",
        "",
        "// DAVO",
        "final readonly class Money { public function __construct(public int $amount, public string $currency) {} }",
        "final readonly class Email { public function __construct(public string $value) { filter_var($value, FILTER_VALIDATE_EMAIL) or throw new InvalidArgumentException(); } }",
        "function charge(Money $amount, Email $to) {}"
      ]
    }
  ],
  "pitfalls": [
    "Hid xato emas: har bir hidni darrov tuzatish shart emas, kontekstga qarang.",
    "Hidni tuzatishdan oldin test yozing.",
    "Izoh bilan yomon kodni tushuntirish hidni yashiradi, tuzatmaydi.",
    "Hid ro'yxatini mexanik qo'llash: foydasi bo'lmagan joyda 'refaktoring' qilmang."
  ]
});
