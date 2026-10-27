/* Chuqur dars: 3.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.3", {
  "lesson": [
    "### Meros nima",
    "Meros (inheritance) — \"**is-a**\" munosabati: `AdminUser extends User`. Bola klass ota klassning public/protected a'zolarini oladi, ularni o'zgartirishi (override) va yangilarini qo'shishi mumkin. PHP **bitta** ota klassni qo'llaydi.",
    "",
    "### Qachon to'g'ri",
    "Meros faqat haqiqiy \"is-a\" va **Liskov Substitution** bajarilganda to'g'ri: bola ota o'rniga qo'yilganda dastur to'g'ri ishlasa. Masalan `Square extends Rectangle` — klassik xato: kvadrat to'rtburchakning \"kenglik va balandlik alohida\" shartini buzadi.",
    "",
    "### Override va parent",
    "`parent::method()` ota implementatsiyani chaqiradi; konstruktorda `parent::__construct()` ni unutmang. Ko'rinishni toraytirib bo'lmaydi (public → protected xato). `#[\\Override]` (8.3) mavjud bo'lmagan metodni override qilishdan saqlaydi. `final` meros va override'ni taqiqlaydi.",
    "",
    "### Abstract va konkret",
    "Abstract klass umumiy kod va qisman shartnoma beradi (**Template Method**). Voris abstract metodlarni to'ldiradi.",
    "",
    "### Meros muammolari",
    "1. **Fragile base class:** ota klassni o'zgartirish vorislarni buzadi.",
    "2. **Qattiq bog'lanish:** bola ota ichki tuzilmasiga bog'lanadi.",
    "3. **Chuqur ierarxiya:** nima qayerda override qilinganini topish qiyin.",
    "4. **Ko'p merosning yo'qligi:** bir nechta xulq-atvorni birlashtirish uchun interface/trait/kompozitsiya kerak.",
    "Qoida: \"kodni qayta ishlatish uchun meros emas, kompozitsiya\" (keyingi mavzu).",
    "",
    "### Laravel'da",
    "`Model`, `Controller`, `FormRequest`, `Command` — freymvork bazaviy klasslaridan meros olish odatiy; o'zingizning ierarxiyangizni 2–3 darajadan oshirmang.",
    "",
    "### Test",
    "Ota klassning shartnoma testlari vorislarda ham o'tishi kerak (contract tests)."
  ],
  "examples": [
    {
      "title": "Template Method",
      "lang": "php",
      "code": [
        "abstract class ReportExporter",
        "{",
        "    final public function export(array $rows): string",
        "    {",
        "        return $this->header() . implode(\"\\n\", array_map([$this, 'row'], $rows)) . $this->footer();",
        "    }",
        "    abstract protected function row(array $r): string;",
        "    protected function header(): string { return ''; }",
        "    protected function footer(): string { return ''; }",
        "}",
        "",
        "final class CsvExporter extends ReportExporter",
        "{",
        "    #[\\Override]",
        "    protected function row(array $r): string { return implode(',', $r); }",
        "}"
      ]
    },
    {
      "title": "LSP buzilishi (Square/Rectangle)",
      "lang": "php",
      "code": [
        "class Rectangle { public function __construct(protected int $w, protected int $h) {} ",
        "  public function setW(int $w): void { $this->w = $w; } public function area(): int { return $this->w * $this->h; } }",
        "class Square extends Rectangle { public function setW(int $w): void { $this->w = $w; $this->h = $w; } }  // kutilmagan yon ta'sir",
        "",
        "$r = new Square(2, 2); $r->setW(5);",
        "echo $r->area();   // 25: Rectangle uchun 10 kutilgan edi"
      ]
    }
  ],
  "pitfalls": [
    "`parent::__construct()` chaqirilmasa ota klass holati initsializatsiya qilinmaydi.",
    "Ota klassni o'zgartirish barcha vorislarni buzishi mumkin (fragile base class): ierarxiyani kichik va barqaror saqlang.",
    "Voris ota kutmagan exception tashlasa yoki metodni bo'sh qoldirsa, LSP buzilgan.",
    "Faqat kodni qayta ishlatish uchun meros qilish noto'g'ri \"is-a\" munosabatini yaratadi: kompozitsiya ishlating."
  ]
});
