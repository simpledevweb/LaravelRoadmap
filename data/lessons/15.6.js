/* Chuqur dars: 15.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.6", {
  "lesson": [
    "### Selektivlik optimallashda",
    "(Asos: 55.11.) Indeks foydasi **filtrlash kuchi**ga bog'liq: shart qancha qatorni chiqarib tashlaydi.",
    "",
    "### Qarorlar",
    "- **Yuqori selektivlik** (`user_id`, `email`, `sku`): yaxshi indeks nomzodi.",
    "- **Past selektivlik** (`status`, `boolean`, `gender`): yolg'iz — kam foyda; **composite**'da boshqa ustun bilan.",
    "- **Taqsimot notekis:** `status='failed'` (0.1%) uchun indeks foydali, `'paid'` (90%) uchun emas. Histogramma (`ANALYZE TABLE ... UPDATE HISTOGRAM`, 8.0) optimizerga yordam beradi.",
    "",
    "### Optimizer",
    "Selektivlik past bo'lsa indeks o'rniga **to'liq skan** tanlaydi (tasodifiy I/O qimmat): `key = NULL` ham to'g'ri qaror bo'lishi mumkin. \"Indeks yaratdim, ishlatilmayapti\" — sababi ko'pincha shu.",
    "",
    "### Ustun tartibi",
    "Composite'da selektivroq ustun ko'pincha oldin (teng huquqli tenglik uchun); lekin so'rov shakli va chap prefiks ustun.",
    "",
    "### Hisoblash",
    "`SELECT COUNT(DISTINCT col)/COUNT(*) FROM t;` va taqsimot: `SELECT col, COUNT(*) FROM t GROUP BY col ORDER BY 2 DESC;`.",
    "",
    "### Alternativlar past selektivlikka",
    "Partial index (PG), alohida jadval/arxiv (faol/nofaol), partitsiya, composite, kesh.",
    "",
    "### Xatolar",
    "Selektivligini o'lchamay indeks qo'shish; `boolean` ustunga yolg'iz indeks; statistikani yangilamaslik."
  ],
  "examples": [
    {
      "title": "Taqsimot",
      "lang": "sql",
      "code": [
        "SELECT status, COUNT(*) c, ROUND(COUNT(*)*100/(SELECT COUNT(*) FROM orders),1) AS pct FROM orders GROUP BY status ORDER BY c DESC;",
        "ANALYZE TABLE orders UPDATE HISTOGRAM ON status;"
      ]
    }
  ],
  "pitfalls": [
    "Boolean/status ustunga yolg'iz indeks kam foyda beradi (past selektivlik).",
    "'Indeks ishlatilmayapti' — optimizer past selektivlikda to'liq skanni afzal ko'rgan bo'lishi mumkin.",
    "Taqsimotni (notekis qiymatlar) hisobga olmaslik noto'g'ri qaror beradi.",
    "Statistika eskirsa selektivlik baholari noto'g'ri bo'ladi."
  ]
});
