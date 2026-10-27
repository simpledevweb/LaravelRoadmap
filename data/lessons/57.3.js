/* Chuqur dars: 57.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.3", {
  "lesson": [
    "### Breakpoint",
    "**Breakpoint** — kod bajarilishi to'xtaydigan belgilangan qator. IDE'da qator raqami yoniga bosib qo'yiladi (qizil nuqta).",
    "",
    "### Turlari",
    "- **Line breakpoint:** aniq qatorda.",
    "- **Conditional breakpoint:** shart `true` bo'lganda (keyingi mavzu).",
    "- **Exception breakpoint:** istisno tashlanganda to'xtaydi (PhpStorm: \"Any exception\").",
    "- **Logpoint / Evaluate and log:** to'xtamasdan xabar yozadi (VS Code logpoint, PhpStorm \"Log evaluated expression\").",
    "- **Temporary breakpoint:** bir marta ishlab o'chadi.",
    "- **Function/method breakpoint:** funksiya chaqirilganda.",
    "",
    "### Qayerga qo'yish",
    "- Xato chiqayotgan joydan **bir oz oldin**.",
    "- Ma'lumot aylanib o'tadigan chegara nuqtalari: controller kirishi, servis chaqiruvi, DB so'rovidan keyin.",
    "- Shart tarmoqlari (`if`) ichida: qaysi yo'l tanlanganini bilish uchun.",
    "",
    "### Muhim",
    "- Breakpoint **bajariladigan** qatorda bo'lishi kerak (izoh yoki `{` da emas).",
    "- Opcache/kod o'zgargan bo'lsa eski kod ishlab turishi mumkin.",
    "- IDE faylni server fayli bilan moslashtirishi (path mapping) shart.",
    "- Breakpoint'lar ko'p bo'lsa sekinlashadi: keraksizlarini o'chiring (mute).",
    "",
    "### \"Break at first line\"",
    "Skript birinchi qatordan to'xtaydi (ishga tushishni tekshirish uchun).",
    "",
    "### Muammo",
    "Breakpoint to'xtamasa: (1) tinglash yoqilganmi, (2) trigger (cookie/env) bormi, (3) path mapping, (4) kod shu qatorga yetadimi (cache/route), (5) `xdebug.mode` ichida `debug` bormi."
  ],
  "examples": [
    {
      "title": "Qaysi yo'l tanlangani",
      "lang": "php",
      "code": [
        "public function discount(Order $o): int",
        "{",
        "    if ($o->user->isVip()) {          // ← breakpoint: qaysi tarmoq ishladi?",
        "        return $this->vipDiscount($o);",
        "    }",
        "    return 0;                          // ← yoki shu yerda",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Izoh yoki bajarilmaydigan qatorga breakpoint qo'yish ishlamaydi.",
    "Eski kod keshda (OPcache) qolgan bo'lsa breakpoint kutilgan joyda to'xtamaydi.",
    "Path mapping noto'g'ri bo'lsa IDE faylni topa olmaydi (Docker/SSH).",
    "Ortiqcha breakpoint'lar sessiyani sekinlashtiradi: keraksizlarini o'chiring."
  ]
});
