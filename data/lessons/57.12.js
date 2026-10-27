/* Chuqur dars: 57.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.12", {
  "lesson": [
    "### Trace Files",
    "**Function trace** — dastur bajarilishida har bir **funksiya chaqiruvini** (argument, qaytish qiymati, vaqt, xotira) fayl ga yozadi. Profildan farqi: statistika emas, **to'liq xronologik yozuv**.",
    "",
    "### Yoqish",
    "```ini",
    "xdebug.mode=trace",
    "xdebug.start_with_request=trigger          ; XDEBUG_TRACE",
    "xdebug.output_dir=/tmp/xdebug",
    "xdebug.trace_format=0                       ; 0 odam o'qiydigan, 1 kompyuter, 2 HTML",
    "xdebug.collect_return=1                     ; qaytish qiymatlari",
    "```",
    "Fayl: `trace.<id>.xt`.",
    "",
    "### Qachon foydali",
    "- \"Bu qiymat qayerdan keldi?\" (chaqiruvlar xronologiyasi).",
    "- Noaniq (heisenbug) yoki bir martalik xatolar: qayta ishlab chiqarib, trace bilan tahlil.",
    "- Framework oqimini to'liq ko'rish (middleware tartibi).",
    "- Test/regressiya: ikki trace'ni solishtirish.",
    "",
    "### Cheklovlar",
    "- **Katta fayllar** (soniyalarda yuzlab MB), sekinlashtiradi.",
    "- Maxfiy ma'lumot (parol, token) argument sifatida faylga tushadi: xavfsizlik.",
    "- Faqat qisqa, aniq stsenariy uchun yoqing.",
    "",
    "### Cheklash usullari",
    "`xdebug_start_trace()` / `xdebug_stop_trace()` bilan faqat kerakli kod qismida; `trigger` bilan faqat bitta so'rovda.",
    "",
    "### Xavfsizlik",
    "Trace va profil fayllarini web-ildizdan tashqarida saqlang, ishlatgach o'chiring, versiyaga (Git) qo'shmang.",
    "",
    "### Muqobil",
    "Mantiqiy xato uchun conditional breakpoint yoki logpoint odatda tezroq; trace — oxirgi chora."
  ],
  "examples": [
    {
      "title": "Qisman trace",
      "lang": "php",
      "code": [
        "xdebug_start_trace('/tmp/xdebug/checkout');   // faqat shu qism",
        "$order = $service->checkout($cart);",
        "xdebug_stop_trace();",
        "// natija: /tmp/xdebug/checkout.xt"
      ]
    }
  ],
  "pitfalls": [
    "Trace fayllari juda katta: faqat qisqa stsenariyda yoqing.",
    "Argument va qaytish qiymatlarida parol/token fayllarga tushadi: o'chirib tashlang.",
    "Trace/profil fayllarini web-ildizda yoki Git'da qoldirmang.",
    "`trace_format` mos kelmasa tahlil vositasi o'qiy olmaydi."
  ]
});
