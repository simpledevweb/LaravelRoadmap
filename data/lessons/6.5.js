/* Chuqur dars: 6.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.5", {
  "lesson": [
    "### KISS",
    "**Keep It Simple, Stupid:** eng oddiy ishlaydigan yechimni tanlang. Murakkablik — xatolar, sekin o'zgartirish va qiyin onboarding manbai.",
    "",
    "### Belgilar",
    "- Oddiy vazifa uchun pattern, abstraksiya va konfiguratsiya qatlami.",
    "- \"Aqlli\" bir qatorlilar (nested ternary, yashirin yon ta'sir).",
    "- Standart kutubxona yoki framework imkoniyati bor, lekin o'zingiz yozgansiz.",
    "- Hech kim tushunmaydigan regex yoki rekursiya.",
    "",
    "### Qanday soddalashtirish",
    "1. **Avval oddiy yozing:** `foreach` + `if` ko'pincha yetarli.",
    "2. **Standart vositalardan foydalaning:** `array_*`, Collection, Carbon, `Str::`.",
    "3. **Guard clause** bilan ichma-ichlikni kamaytiring.",
    "4. **Aniq kod** aqlli kodden yaxshi: o'qiydigan odam uchun yozing.",
    "5. **Bir vaqtda bitta muammo.**",
    "",
    "### Soddalik ≠ yengillik",
    "Oddiy yechim ham to'g'ri, test qilingan va xatolarni boshqaradigan bo'lishi kerak. Soddalik — keraksiz qismning yo'qligi.",
    "",
    "### KISS vs boshqalar",
    "YAGNI (keraksizni qo'shmang), DRY (takrorlamang) bilan birga: bir-biriga qarama-qarshi bo'lsa soddalikni afzal ko'ring.",
    "",
    "### Qaror sinovi",
    "\"Yangi jamoa a'zosi buni 5 daqiqada tushunadimi?\" Yo'q bo'lsa, soddalashtiring yoki nom/izoh bilan tushuntiring."
  ],
  "examples": [
    {
      "title": "Aqlli va oddiy",
      "lang": "php",
      "code": [
        "// ARALASH: nested ternary",
        "$label = $a ? ($b ? 'x' : 'y') : ($c ? 'z' : 'w');",
        "",
        "// ODDIY",
        "if (!$a) { $label = $c ? 'z' : 'w'; }",
        "else     { $label = $b ? 'x' : 'y'; }"
      ]
    }
  ],
  "pitfalls": [
    "Oddiy vazifaga pattern va abstraksiya qo'shish murakkablikni oshiradi.",
    "'Aqlli' bir qatorlilar (ichma-ich ternary) o'qilmaydi: aniq `if`.",
    "Standart kutubxonada bor funksiyani o'zingiz yozish xato va ish ko'paytiradi.",
    "Soddalik testsizlik yoki xatolarni e'tiborsiz qoldirish degani emas."
  ]
});
