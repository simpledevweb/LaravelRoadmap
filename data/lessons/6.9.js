/* Chuqur dars: 6.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.9", {
  "lesson": [
    "### O'qilish",
    "Kod yoziladiganidan ko'ra ko'proq **o'qiladi** (taxminan 10:1). Maqsad: o'qiydigan odam (kelajakdagi siz) kodni tez va xatosiz tushunsin.",
    "",
    "### Omillar",
    "1. **Nomlash** (6.1).",
    "2. **Format:** bir xil uslub (PSR-12), qisqa qatorlar (~120), mantiqiy guruhlar bo'sh qator bilan.",
    "3. **Tuzilma:** ichma-ichlikni kamaytirish (guard clause), kichik funksiyalar.",
    "4. **Izoh:** \"nima uchun\" ni yozing, \"nima\" ni kod aytsin.",
    "5. **Izchillik:** bir muammo — bir yechim uslubi.",
    "6. **Aniq tiplar** va `strict_types`.",
    "7. **Magic number/satr yo'q:** konstanta/enum.",
    "",
    "### Tartib: yuqoridan pastga",
    "Fayl \"gazeta\" kabi: yuqorida yuqori darajali g'oya, pastda tafsilot. Metodlar chaqirish tartibida yaqin joylashsin.",
    "",
    "### Avtomatlashtirish",
    "Laravel Pint / PHP CS Fixer (formatlash), PHPStan (tip xatolari), Rector. Formatlash bahsini avtomatga topshiring.",
    "",
    "### Nuance",
    "\"Aqlli\" qisqa kod ≠ o'qiladigan kod. Oddiy `if` ichma-ich ternary'dan yaxshi.",
    "",
    "### Tekshirish",
    "Kodni 1 oydan keyin o'qib ko'ring yoki hamkasbga ko'rsating: tushunish uchun savol bersa, o'qilishi yetarli emas."
  ],
  "examples": [
    {
      "title": "Guard clause bilan o'qilish",
      "lang": "php",
      "code": [
        "// ICHMA-ICH",
        "function pay(?User $u, int $a) { if ($u) { if ($u->active) { if ($a > 0) { return charge($u, $a); } } } return null; }",
        "",
        "// O'QILADIGAN",
        "function pay(?User $u, int $a): ?string",
        "{",
        "    if ($u === null || !$u->active) { return null; }",
        "    if ($a <= 0) { return null; }",
        "    return charge($u, $a);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Formatlash bahsi vaqtni yeydi: Pint/PHP CS Fixer'ga topshiring.",
    "Aqlli qisqa kod o'qilishni buzadi: aniq va oddiy yozing.",
    "Izohda 'nima' ni takrorlash kodning o'zi tushunarli bo'lmasligining belgisi.",
    "Bir loyihada turli uslublar (nomlash, format) o'qilishni qiyinlashtiradi."
  ]
});
