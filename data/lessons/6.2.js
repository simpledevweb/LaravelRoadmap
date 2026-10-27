/* Chuqur dars: 6.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.2", {
  "lesson": [
    "### Qoida",
    "Funksiya **kichik** bo'lsin va **bitta ishni** qilsin. Uzunlikka qat'iy chegara yo'q, lekin odatda 5–20 qator; ekranga sig'sa va nomi bilan tasvirlansa yaxshi.",
    "",
    "### Belgilar",
    "- Ichma-ich `if/foreach` 3+ daraja.",
    "- Bir funksiyada bir nechta abstraksiya darajasi (yuqori darajali oqim + past darajali detal).",
    "- Izoh bilan bo'laklarga ajratilgan (`// 1. validatsiya`, `// 2. saqlash`): har bo'lak alohida funksiya.",
    "- Ko'p parametr (4+).",
    "",
    "### Texnikalar",
    "1. **Extract Method:** izoh o'rniga nomli metod.",
    "2. **Guard clause:** erta `return`/`throw` bilan ichma-ichlikni kamaytiring.",
    "3. **Parametr obyekti:** 3+ parametrni DTO ga o'rang.",
    "4. **Bir abstraksiya darajasi:** funksiya ichidagi hamma qator bir xil darajada bo'lsin.",
    "5. **Flag argument yo'q:** `render(true)` o'rniga ikki metod (`renderPreview()`, `renderFinal()`).",
    "6. **Yon ta'sirsiz (pure) funksiyalar** test uchun yaxshiroq.",
    "",
    "### Command-Query Separation",
    "Metod yoki holatni o'zgartiradi (command), yoki qiymat qaytaradi (query), ikkalasi emas: `isValid()` ichida bazaga yozmang.",
    "",
    "### Muvozanat",
    "Juda maydalash (har qator uchun funksiya) ham o'qilishni buzadi. Nom orqali tushuntiriladigan mantiqiy bo'laklarga ajrating."
  ],
  "examples": [
    {
      "title": "Bo'laklarga ajratish",
      "lang": "php",
      "code": [
        "// OLDIN: bitta uzun funksiya",
        "function register(array $d) { /* validate */ /* hash */ /* insert */ /* welcome mail */ }",
        "",
        "// KEYIN",
        "function register(array $d): User",
        "{",
        "    $data = $this->validated($d);",
        "    $user = $this->users->create($data['email'], password_hash($data['password'], PASSWORD_ARGON2ID));",
        "    $this->mailer->sendWelcome($user);",
        "    return $user;",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Flag argument (`save($user, true)`) funksiya ikki ish qilishini yashiradi: ikki metodga bo'ling.",
    "Bir funksiyada ham yuqori darajali oqim, ham past darajali detal aralash bo'lsa o'qish og'ir.",
    "Ortiqcha maydalash (bir qatorli o'tkazuvchi metodlar) navigatsiyani qiyinlashtiradi.",
    "Metod ham holatni o'zgartirib ham qiymat qaytarsa (CQS buzilishi) kutilmagan yon ta'sir beradi."
  ]
});
