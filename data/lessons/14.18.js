/* Chuqur dars: 14.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.18", {
  "lesson": [
    "### Data integrity",
    "Ma'lumotning **to'g'riligi, izchilligi va ishonchliligi**. Buzilish: noto'g'ri, yetim, takroriy, ziddiyatli ma'lumot.",
    "",
    "### Qatlamlar (defense in depth)",
    "1. **DB constraint'lar (asosiy):** `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, to'g'ri turlar, `DEFAULT`.",
    "2. **Tranzaksiyalar:** atomar o'zgarish (ACID).",
    "3. **Ilova validatsiyasi:** foydalanuvchi uchun tushunarli xabar, biznes qoidalar.",
    "4. **Domen mantiqi:** invariantlar (Value Object, entity).",
    "5. **Monitoring/tekshiruvlar:** davriy integrity tekshiruv.",
    "",
    "### Turlari",
    "- **Entity integrity:** har qator noyob PK.",
    "- **Referential:** FK to'g'ri (14.9).",
    "- **Domain:** qiymat ruxsat etilgan diapazonda (`CHECK`, `ENUM`, tur).",
    "- **Biznes qoida:** (balans ≥ 0, davr kesishmasligi).",
    "",
    "### Poyga holatlari",
    "\"Avval tekshir, keyin yoz\" xavfli: **unique constraint**, `SELECT ... FOR UPDATE`, atomar `UPDATE ... WHERE balance >= x`, optimistik qulf (`version`).",
    "",
    "### Hisoblagich/denormalizatsiya",
    "Davriy qayta hisoblash va solishtirish jobi.",
    "",
    "### Orphan va dublikat topish",
    "LEFT JOIN anti-join, `GROUP BY ... HAVING COUNT(*) > 1`.",
    "",
    "### Laravel",
    "`DB::transaction`, `unique`/`exists` validatsiya + DB constraint, Eloquent `lockForUpdate`, `unique` migratsiya.",
    "",
    "### Qoida",
    "Bazada majburlash mumkin bo'lgan qoidani bazada majburlang: ilova xatosi/skript/boshqa klient ham ushlanadi."
  ],
  "examples": [
    {
      "title": "Atomar va tekshiruv",
      "lang": "sql",
      "code": [
        "-- atomar yechish (poygasiz)",
        "UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;   -- ROW_COUNT() = 0 -> mablag' yetmaydi",
        "",
        "-- dublikat va yetim topish",
        "SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;",
        "SELECT c.id FROM comments c LEFT JOIN posts p ON p.id = c.post_id WHERE p.id IS NULL;"
      ]
    }
  ],
  "pitfalls": [
    "Faqat ilova validatsiyasi: boshqa klient/skript/poyga buzadi, DB constraint shart.",
    "'Avval tekshir, keyin yoz' poygada buzadi: atomar `UPDATE ... WHERE` yoki qulf.",
    "Denormalizatsiya qilingan ma'lumot sinxronsiz bo'lishi mumkin: davriy tekshiruv.",
    "`CHECK` MySQL 8.0.16 dan oldin e'tiborsiz qoldiriladi."
  ]
});
