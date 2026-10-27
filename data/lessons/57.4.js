/* Chuqur dars: 57.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.4", {
  "lesson": [
    "### Conditional breakpoint",
    "Faqat **shart bajarilganda** to'xtaydigan breakpoint. Katta tsikl yoki ko'p chaqiriladigan funksiyada kerakli holatni topish uchun.",
    "",
    "### Qanday qo'yiladi",
    "Breakpoint'ga o'ng klik (PhpStorm: Condition; VS Code: Edit Breakpoint → Expression) va PHP ifoda yoziladi:",
    "- `$user->id === 42`",
    "- `$i > 1000 && $status === 'failed'`",
    "- `count($items) === 0`",
    "- `str_contains($email, '@test.')`",
    "Ifoda har safar IDE tomonidan **hisoblanadi**, shuning uchun yon ta'sirsiz bo'lsin.",
    "",
    "### Hit count (takror soni)",
    "\"N-marta o'tgandan keyin to'xtash\" (masalan 500-iteratsiyada).",
    "",
    "### Foydali",
    "- Tsiklda faqat muammoli element.",
    "- Ma'lum foydalanuvchi/ID so'rovida.",
    "- Kutilmagan qiymat (`null`) paydo bo'lganda: `$value === null`.",
    "- Exception breakpoint + shart.",
    "",
    "### Logpoint",
    "To'xtamasdan ifodani yozadi: `User: {$user->id}`. Kodni o'zgartirmasdan `dd()`/`log` ning o'rniga.",
    "",
    "### Ehtiyot",
    "- Shart xato bo'lsa (mavjud bo'lmagan o'zgaruvchi) breakpoint hech qachon ishlamaydi yoki IDE ogohlantiradi.",
    "- Murakkab shart sekinlashtiradi (har chaqiruvda hisoblanadi).",
    "- Yon ta'sirli ifoda (`$i++`, funksiya chaqiruvi, DB so'rovi) yozmang: holatni o'zgartiradi.",
    "",
    "### Muqobil",
    "Kod ichida `if ($i === 1000) { xdebug_break(); }` — kodni vaqtincha o'zgartiradi (commit qilmang)."
  ],
  "examples": [
    {
      "title": "Shartli to'xtash va xdebug_break",
      "lang": "php",
      "code": [
        "foreach ($orders as $i => $o) {",
        "    process($o);                       // breakpoint shart: $o->total < 0",
        "}",
        "",
        "// IDE'siz variant (vaqtincha)",
        "if ($o->total < 0) { xdebug_break(); }"
      ]
    }
  ],
  "pitfalls": [
    "Shartda yon ta'sir (`$i++`, DB so'rov) holatni o'zgartiradi.",
    "Mavjud bo'lmagan o'zgaruvchi shartida breakpoint hech qachon to'xtamaydi.",
    "Murakkab shart har chaqiruvda hisoblanib tezlikni tushiradi.",
    "`xdebug_break()` ni commit qilib yuborish productionda muammo tug'dirishi mumkin."
  ]
});
