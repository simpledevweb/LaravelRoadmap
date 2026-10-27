/* Chuqur dars: 5.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.3", {
  "lesson": [
    "### Builder",
    "**Builder** — murakkab obyektni **bosqichma-bosqich** yig'adi; yaratish jarayonini obyektning ko'rinishidan ajratadi. Ko'p ixtiyoriy parametrli obyekt uchun \"teleskopik konstruktor\" muammosini hal qiladi.",
    "",
    "### Belgilar",
    "- Konstruktorda 5+ parametr, ko'pi ixtiyoriy.",
    "- Obyekt bir nechta qadamda quriladi.",
    "- Bir xil jarayon bilan turli ko'rinishlar.",
    "",
    "### Tuzilma",
    "- `Builder`: `setX()`/`withX()` metodlari (fluent interface, `return $this`).",
    "- `build()`: tayyor (ko'pincha immutable) obyektni qaytaradi va validatsiya qiladi.",
    "- **Director** (ixtiyoriy): tayyor qadamlar ketma-ketligi.",
    "",
    "### PHP'da alternativalar",
    "Nomli argumentlar (8.0) va constructor promotion ko'p holatda builder'ga ehtiyojni kamaytiradi: `new Email(to: ..., subject: ..., html: true)`. Murakkab validatsiya/qadamlar bo'lsa builder qoladi.",
    "",
    "### Laravel'da",
    "- **Query Builder** (`DB::table()->where()->orderBy()->get()`) va Eloquent builder.",
    "- `Mailable` metodlari (`->subject()->attach()`).",
    "- `Http::withHeaders()->timeout(5)->post()`.",
    "- Notification `MailMessage`.",
    "",
    "### Immutable builder",
    "Har `withX()` yangi nusxa qaytarsa, builder'ni qayta ishlatish xavfsiz.",
    "",
    "### Ehtiyot",
    "Oddiy obyekt uchun builder ortiqcha. `build()` da to'liqlikni tekshiring (majburiy maydonlar)."
  ],
  "examples": [
    {
      "title": "Fluent builder",
      "lang": "php",
      "code": [
        "final class EmailBuilder",
        "{",
        "    private array $to = []; private string $subject = ''; private string $body = ''; private bool $html = false;",
        "",
        "    public function to(string $a): static { $c = clone $this; $c->to[] = $a; return $c; }",
        "    public function subject(string $s): static { $c = clone $this; $c->subject = $s; return $c; }",
        "    public function body(string $b, bool $html = false): static { $c = clone $this; $c->body = $b; $c->html = $html; return $c; }",
        "",
        "    public function build(): Email",
        "    {",
        "        $this->to !== [] or throw new LogicException('Qabul qiluvchi yo\\'q');",
        "        return new Email($this->to, $this->subject, $this->body, $this->html);",
        "    }",
        "}",
        "$mail = (new EmailBuilder())->to('a@b.uz')->subject('Salom')->body('<b>Hi</b>', true)->build();"
      ]
    }
  ],
  "pitfalls": [
    "Nomli argumentlar yetarli bo'lgan oddiy obyekt uchun builder ortiqcha.",
    "`build()` da majburiy maydonlarni tekshirmasangiz yaroqsiz obyekt yaratiladi.",
    "Mutable builder qayta ishlatilsa oldingi holat qoladi: `clone` yoki yangi builder.",
    "Fluent zanjir ichiga yon ta'sirli mantiq yashirmang."
  ]
});
