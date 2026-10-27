/* Chuqur dars: 4.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.3", {
  "lesson": [
    "### Tamoyil",
    "**Liskov Substitution Principle (LSP):** voris klass ota klass o'rniga qo'yilganda dastur to'g'ri ishlashi kerak. Boshqacha: ota tipni kutayotgan kod voris bilan **hech narsani bilmasdan** ishlashi shart.",
    "",
    "### Shartnoma qoidalari",
    "- Precondition'ni **kuchaytirmaydi** (ota qabul qilgan kiritmani rad etmaydi).",
    "- Postcondition'ni **susaytirmaydi** (ota kafolatidan kamini bermaydi).",
    "- Invariantlarni saqlaydi.",
    "- Ota tashlamagan yangi exception turini tashlamaydi.",
    "- Return tipi torayishi (covariance), parametr tipi kengayishi (contravariance) mumkin.",
    "",
    "### Buzilish misollari",
    "- `Square extends Rectangle` (kenglik/balandlik bog'liq).",
    "- Voris metodni bo'sh qoldiradi yoki `throw new LogicException('Qo'llab-quvvatlanmaydi')`.",
    "- `ReadOnlyFile extends File`, `write()` xato tashlaydi.",
    "- `instanceof` tekshiruvi bilan voris turini ajratish.",
    "",
    "### Yechim",
    "Ierarxiyani qayta tuzing: umumiy yagona interface o'rniga kichikroq interface'lar (`Readable`, `Writable`) yoki meros o'rniga kompozitsiya.",
    "",
    "### Tekshirish",
    "Ota klass uchun yozilgan testlar vorislarda ham o'tishi kerak (contract tests)."
  ],
  "examples": [
    {
      "title": "Buzilgan: Bird/Penguin",
      "lang": "php",
      "code": [
        "class Bird { public function fly(): void {} }",
        "class Penguin extends Bird { public function fly(): void { throw new LogicException('Uchmaydi'); } }   // LSP buzildi",
        "",
        "// Yechim: xulq-atvorni ajrating",
        "interface Bird {}",
        "interface FlyingBird extends Bird { public function fly(): void; }",
        "final class Sparrow implements FlyingBird { public function fly(): void {} }",
        "final class Penguin implements Bird {}"
      ]
    }
  ],
  "pitfalls": [
    "Voris metodni bo'sh qoldirish yoki exception tashlash — LSP buzilgani.",
    "`instanceof` bilan voris turini tekshirish LSP ishlamayotganining belgisi.",
    "Faqat imzo mosligi yetarli emas: xatti-harakat shartnomasi ham saqlansin.",
    "Mutable ota klassni voris ichidan boshqacha ishlatish (Square) kutilmagan yon ta'sir beradi."
  ]
});
