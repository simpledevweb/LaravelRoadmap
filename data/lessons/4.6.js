/* Chuqur dars: 4.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.6", {
  "lesson": [
    "### Nima uchun aniqlash kerak",
    "SOLID buzilishi darrov xato bermaydi: kod ishlaydi, lekin o'zgartirish qimmat, test og'ir, xatolar ko'payadi. Belgilarni bilish refaktoringni o'z vaqtida boshlashga yordam beradi.",
    "",
    "### Buzilish belgilari jadvali",
    "| Tamoyil | Belgi |",
    "|---|---|",
    "| SRP | katta klass, ko'p sabab bilan o'zgaradi, \"God class\" |",
    "| OCP | yangi tur uchun ko'p joyda `switch`/`if` tahriri |",
    "| LSP | voris `throw`/bo'sh metod, `instanceof` tekshiruvlari |",
    "| ISP | interface'da ishlatilmaydigan metodlar |",
    "| DIP | klass ichida `new Konkret()`, `app()` hamma joyda, statik chaqiruvlar |",
    "",
    "### Vositalar",
    "- **PHPStan/Larastan** (daraja oshirish), **PHPMD** (sikllomatik murakkablik, klass hajmi), **PHPMetrics**, **deptrac** (qatlam bog'lanishlari).",
    "- Kod ko'rib chiqish (review) chek-listi.",
    "- Git tarixi: bir fayl tez-tez va turli sabablar bilan o'zgarsa — SRP muammosi (churn).",
    "",
    "### Tezkor savollar",
    "1. Klassni \"va\" so'zisiz tasvirlay olamanmi?",
    "2. Yangi variant qo'shsam nechta fayl o'zgaradi?",
    "3. Test uchun nechta mock kerak?",
    "4. Interface'ning hamma metodi ishlatiladimi?",
    "",
    "### Ustuvorlik",
    "Hamma buzilish tuzatilmaydi: tez-tez o'zgaradigan va xato ko'p chiqadigan joydan boshlang."
  ],
  "examples": [
    {
      "title": "Kod hidlari bir joyda",
      "lang": "php",
      "code": [
        "final class UserManager                      // SRP: 4 ta sabab",
        "{",
        "    public function register(array $d) { /* validate, DB, mail */ }",
        "    public function exportCsv() {}",
        "    public function render() { return view('users'); }",
        "",
        "    public function discount($type)          // OCP: har yangi tur uchun tahrir",
        "    { switch ($type) { case 'vip': return 20; case 'staff': return 30; default: return 0; } }",
        "",
        "    public function notify() { (new SmtpMailer())->send(...); }   // DIP: konkret klass",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Hamma narsani bir vaqtda tuzatishga urinish xavfli: avval test, keyin kichik qadamlar.",
    "Metrikalar yo'l ko'rsatadi, hukm emas: kontekstsiz raqamga ishonmang.",
    "Hech qachon o'zgarmaydigan eski kodni 'SOLID' uchun qayta yozish foyda bermaydi.",
    "Review'da shaxsiylashtirish emas, belgilarga (coupling, churn) tayaning."
  ]
});
