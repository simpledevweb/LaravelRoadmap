/* Chuqur dars: 57.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.7", {
  "lesson": [
    "### Watches",
    "**Watch (kuzatuv)** — ifodani doimiy kuzatib, **har qadamda** uning qiymatini ko'rsatish. Variables panelidan farqli, o'zingiz tanlagan ifodalar ro'yxati.",
    "",
    "### Nima qo'shish mumkin",
    "- O'zgaruvchi: `$total`.",
    "- Property: `$this->status`.",
    "- Ifoda: `count($items)`, `$a + $b`, `$order->total() - $order->paid`.",
    "- Massiv elementi: `$config['db']['host']`.",
    "",
    "### Qachon foydali",
    "- Tsiklda qiymat qanday o'zgarishini kuzatish (`$sum`, `$i`).",
    "- Uzoq funksiyada bir nechta o'zgaruvchi orasidagi bog'liqlik.",
    "- Ichki holat (obyekt property) o'zgarishi.",
    "- Kutilgan invariant (`$balance >= 0`) buzilgan lahzani topish.",
    "",
    "### PhpStorm/VS Code",
    "PhpStorm: Watches paneli → \"+\" → ifoda. VS Code: WATCH bo'limi → \"+\" . Debug sessiyalar orasida saqlanadi.",
    "",
    "### Ehtiyot",
    "- Ifoda har qadamda **hisoblanadi**: og'ir yoki yon ta'sirli ifodalar (DB so'rov, `$i++`, fayl yozish) holatni o'zgartiradi yoki sekinlashtiradi.",
    "- Ifoda joriy scope'da aniqlanmagan bo'lsa xato/`undefined` ko'rsatiladi (normal).",
    "- Lazy obyektni kuzatish initsializatsiya qilishi mumkin.",
    "",
    "### Data breakpoint (watchpoint)",
    "Ba'zi IDE'lar o'zgaruvchi qiymati o'zgarganda to'xtashni qo'llaydi; Xdebug/PHP uchun cheklangan (conditional breakpoint bilan almashtiring).",
    "",
    "### Maslahat",
    "Watch'ga kichik, toza ifodalar qo'ying; murakkab hisob uchun Evaluate Expression ishlating."
  ],
  "examples": [
    {
      "title": "Foydali watch ifodalari",
      "lang": "php",
      "code": [
        "// Watches:",
        "$sum",
        "$i % 100",
        "count($queue)",
        "$order->total() - $order->paid",
        "$this->state->value"
      ]
    }
  ],
  "pitfalls": [
    "Watch ifodasida yon ta'sir (DB so'rovi, yozish) har qadamda ishlaydi va holatni buzadi.",
    "Og'ir ifoda (katta massiv `array_sum`) qadamlarni sekinlashtiradi.",
    "Ifoda boshqa scope'da 'undefined' ko'rsatishi normal: joriy kontekstga qarang.",
    "Lazy obyekt watch orqali kutilmagan initsializatsiya qilinishi mumkin."
  ]
});
