/* Chuqur dars: 55.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.3", {
  "lesson": [
    "### Composite indeks",
    "Bir indeksda **bir nechta ustun**: ma'lumot ustunlar tartibida saqlanadi. Ko'p shartli so'rovlarni bitta indeks bilan tezlashtiradi. (Asosiy qoidalar: 10.6.)",
    "",
    "### Leftmost prefix",
    "`(a, b, c)`: `a` / `a,b` / `a,b,c` bo'yicha qidirish ishlaydi; `b` yoki `c` yolg'iz — yo'q.",
    "",
    "### Tartib qoidasi",
    "**Tenglik → diapazon → tartib (ORDER BY)**:",
    "`WHERE user_id = ? AND status = ? AND created_at > ? ORDER BY created_at` → `(user_id, status, created_at)`.",
    "Diapazondan keyingi ustunlar filtrlash uchun ishlatilmaydi.",
    "",
    "### Bitta indeks, ko'p so'rov",
    "`(a, b)` indeksi `a` bo'yicha so'rovlarni ham qoplaydi: alohida `(a)` ortiqcha.",
    "",
    "### PostgreSQL",
    "Ham xuddi shunday; qo'shimcha: `INCLUDE (cols)` (covering uchun kalit bo'lmagan ustunlar).",
    "",
    "### Narxi",
    "Hajm, yozish sekinlashadi, ustun soni 3–4 gacha ko'pincha yetarli.",
    "",
    "### Tekshirish",
    "`EXPLAIN` → `key_len` (nechta ustun ishlatildi), `Extra`.",
    "",
    "### Laravel",
    "`$table->index(['user_id', 'status', 'created_at'], 'idx_orders_user_status_created')`.",
    "",
    "### Xato",
    "Ustun tartibini tasodifiy tanlash; diapazon ustunini oldinga qo'yish; har so'rovga alohida indeks (ortiqcha)."
  ],
  "examples": [
    {
      "title": "Composite",
      "lang": "sql",
      "code": [
        "CREATE INDEX idx_orders_user_status_created ON orders (user_id, status, created_at);",
        "EXPLAIN SELECT id FROM orders WHERE user_id = 5 AND status = 'paid' AND created_at >= '2025-01-01';"
      ]
    }
  ],
  "pitfalls": [
    "Diapazon ustunidan keyingi ustunlar filtrlash uchun ishlatilmaydi.",
    "`(a)` va `(a, b)` ni birga yaratish ortiqcha.",
    "Ustun tartibini selektivlikka qarab emas, so'rov shakliga qarab tanlang.",
    "Juda ko'p ustunli indeks yozishni sekinlashtiradi va hajmini oshiradi."
  ]
});
