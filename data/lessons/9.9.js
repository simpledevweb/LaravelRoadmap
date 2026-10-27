/* Chuqur dars: 9.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.9", {
  "lesson": [
    "### UNION",
    "Bir nechta `SELECT` natijasini **qatorlar bo'yicha** birlashtiradi. Shart: ustunlar soni va mos turlari bir xil; ustun nomlari birinchi `SELECT`dan.",
    "",
    "### UNION vs UNION ALL",
    "- `UNION` — **dublikatlarni olib tashlaydi** (qo'shimcha saralash/vaqtinchalik jadval: sekinroq).",
    "- `UNION ALL` — hammasini saqlaydi (**tezroq**). Dublikat ahamiyatsiz yoki yo'q bo'lsa shuni ishlating.",
    "",
    "### Boshqa to'plam operatsiyalari",
    "`INTERSECT`, `EXCEPT` — MySQL 8.0.31+ da bor (eskida yo'q: `JOIN`/`EXISTS`/`NOT EXISTS` bilan).",
    "",
    "### Qoidalar",
    "- `ORDER BY`/`LIMIT` butun natijaga oxirida: `(SELECT ...) UNION ALL (SELECT ...) ORDER BY x LIMIT 10`.",
    "- Har qism uchun `ORDER BY` kerak bo'lsa qavs ichida `LIMIT` bilan.",
    "- Ustun tartibi mos bo'lsin (nom emas, **pozitsiya** bo'yicha).",
    "- Turli manbaini ajratish: `SELECT 'orders' AS src, ...`.",
    "",
    "### Foydalanish",
    "- Turli jadvallardan bir xil formatdagi ma'lumot (arxiv + joriy).",
    "- `OR` o'rniga (turli ustunlarda indeks ishlashi uchun):",
    "`SELECT ... WHERE a = 1 UNION ALL SELECT ... WHERE b = 2 AND a <> 1`.",
    "- Full outer join emulyatsiyasi.",
    "",
    "### Samaradorlik",
    "Har qism alohida indeks bilan; `UNION` (distinct) katta natijada qimmat.",
    "",
    "### Laravel",
    "`$first->unionAll($second)`, `union()`."
  ],
  "examples": [
    {
      "title": "UNION ALL",
      "lang": "sql",
      "code": [
        "(SELECT 'orders' AS src, id, created_at FROM orders WHERE user_id = 5)",
        "UNION ALL",
        "(SELECT 'archive', id, created_at FROM orders_archive WHERE user_id = 5)",
        "ORDER BY created_at DESC",
        "LIMIT 20;"
      ]
    }
  ],
  "pitfalls": [
    "`UNION` dublikatni olib tashlash uchun qo'shimcha saralash qiladi: kerak bo'lmasa `UNION ALL`.",
    "Ustunlar pozitsiya bo'yicha mos keladi: tartib/tur nomuvofiq bo'lsa xato yoki kutilmagan natija.",
    "`INTERSECT`/`EXCEPT` 8.0.31 dan oldin yo'q.",
    "Qismlardagi `ORDER BY` qavsiz yozilsa butun natijaga qo'llanadi."
  ]
});
