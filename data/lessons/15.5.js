/* Chuqur dars: 15.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.5", {
  "lesson": [
    "### Composite indeks tartibi",
    "(Asos: 10.6, 55.3, 55.12.) Optimallash nuqtai nazaridan:",
    "",
    "### Qoida",
    "**Tenglik → diapazon → tartib.** `WHERE a = ? AND b = ? AND c > ? ORDER BY c` → `(a, b, c)`.",
    "",
    "### Nega",
    "- B-tree ustunlar tartibida: oldingi ustunlar bo'yicha torayib, keyingisi ichida tartib bor.",
    "- Diapazon ustunidan keyin tartib \"buziladi\" (keyingi ustunlar filtrlash uchun ishlatilmaydi).",
    "",
    "### Bir nechta variant",
    "- Bir nechta tenglik: selektivroq oldin (ko'pincha), yoki ko'proq so'rovlar yolg'iz ishlatadigani oldin.",
    "- `IN (...)` — tenglikka o'xshash (lekin ORDER BY tartibini buzishi mumkin).",
    "- `OR` — alohida indekslar + `UNION ALL`.",
    "",
    "### ORDER BY + LIMIT",
    "Indeks tartibi `ORDER BY` bilan mos bo'lsa **filesort yo'q** va `LIMIT N` birinchi N qatorda to'xtaydi (juda tez). Aralash yo'nalish — descending index (8.0).",
    "",
    "### Tekshirish",
    "`EXPLAIN` → `Using filesort` yo'qmi, `key_len` ustunlar to'liq ishlatilganmi, `rows` kichikmi.",
    "",
    "### Xato",
    "Diapazon ustunini oldinga qo'yish; ORDER BY ustunini indeksdan tashqarida qoldirish; `(a, b)` va `(b, a)` ni adashtirish.",
    "",
    "### Laravel",
    "`index(['user_id', 'status', 'created_at'])`; so'rov: `->where('user_id', 5)->where('status', 'paid')->orderByDesc('created_at')`."
  ],
  "examples": [
    {
      "title": "Tartib va LIMIT",
      "lang": "sql",
      "code": [
        "CREATE INDEX idx_feed ON posts (user_id, published_at);",
        "EXPLAIN SELECT id, title FROM posts WHERE user_id = 5 ORDER BY published_at DESC LIMIT 20;   -- filesort yo'q"
      ]
    }
  ],
  "pitfalls": [
    "Diapazon ustuni oldinda bo'lsa keyingi ustunlar filtr/tartib uchun ishlamaydi.",
    "`ORDER BY` ustuni indeksda bo'lmasa `Using filesort` (katta natijada qimmat).",
    "`IN (...)` bilan ORDER BY indeks tartibini buzishi mumkin.",
    "`OR` turli ustunlarda indeksdan foydalanmaydi: `UNION ALL`."
  ]
});
