/* Chuqur dars: 57.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.6", {
  "lesson": [
    "### Call Stack",
    "**Call stack (chaqiruvlar steki)** — joriy nuqtaga qaysi funksiyalar zanjiri orqali kelinganini ko'rsatadi: eng yuqorida joriy funksiya, pastda uni chaqirgan funksiyalar (frame'lar).",
    "",
    "### Nima uchun foydali",
    "- **\"Bu funksiyani kim va nima bilan chaqirdi?\"** savoliga javob.",
    "- Noto'g'ri qiymat qayerdan kelganini topish (zanjir bo'ylab orqaga).",
    "- Framework ichki oqimini tushunish (Laravel: Kernel → Middleware → Controller → Service).",
    "- Exception stack trace'i bilan bir xil g'oya, lekin interaktiv.",
    "",
    "### Qanday ishlatish",
    "Debug panelida frame'ni tanlasangiz, IDE o'sha frame'ning o'zgaruvchilari va qatorini ko'rsatadi: yuqori darajali kontekstga \"orqaga\" qaraysiz (kod bajarilishi o'zgarmaydi).",
    "",
    "### Frame ma'lumoti",
    "Funksiya/metod nomi, fayl, qator, argumentlar. Framework frame'lari (`vendor/`) ko'p bo'ladi: IDE ularni yashirish (filter \"only project frames\") imkonini beradi.",
    "",
    "### Rekursiya",
    "Chuqur rekursiyada stack uzun; `xdebug.max_nesting_level` (default 256) oshsa xato beradi: `Maximum function nesting level reached`.",
    "",
    "### Exception trace",
    "`$e->getTraceAsString()` va Laravel xato sahifasi (Ignition/Whoops) shu stack'ni ko'rsatadi. Xdebug `develop` mode bu sahifani boyitadi.",
    "",
    "### Eslatma",
    "`zend.exception_ignore_args` productionda argumentlarni yashiradi (maxfiylik); developmentda o'chiq qoldiring."
  ],
  "examples": [
    {
      "title": "Stack'ni dasturiy olish",
      "lang": "php",
      "code": [
        "function whoCalled(): string",
        "{",
        "    $t = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 3);",
        "    return ($t[1]['class'] ?? '') . '::' . $t[1]['function'] . ' (' . ($t[0]['file'] ?? '') . ':' . ($t[0]['line'] ?? 0) . ')';",
        "}",
        "// debugger: Frames panelida frame'ni tanlab, o'sha joydagi o'zgaruvchilarni ko'ring"
      ]
    }
  ],
  "pitfalls": [
    "`vendor/` frame'lari stack'ni uzun qiladi: IDE filtri bilan faqat loyiha frame'larini ko'ring.",
    "Rekursiyada `max_nesting_level` oshsa 'Maximum function nesting level' xatosi.",
    "Productionda `zend.exception_ignore_args` argumentlarni yashiradi: devda o'chiq.",
    "Frame tanlash bajarilishni o'zgartirmaydi, faqat ko'rinishni."
  ]
});
