/* Chuqur dars: 55.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.2", {
  "lesson": [
    "### Unique index",
    "Ustun(lar) qiymatlari **takrorlanmasligini** majburlaydi va qidirishni tezlashtiradi. `UNIQUE KEY uq_email (email)`.",
    "",
    "### PK va unique farqi",
    "PK — bitta, `NOT NULL`, clustered (InnoDB). Unique — bir nechta bo'lishi mumkin, **NULL** ruxsat (bir necha marta).",
    "",
    "### Nuanslar",
    "- Composite unique: `(tenant_id, slug)` — kombinatsiya unikal.",
    "- **Collation:** `_ci` da `Ali` = `ali`.",
    "- **Soft delete** bilan to'qnashuv (14.8).",
    "- Uzun matn: prefiks (`email(100)`) yoki hash ustun; 3072 bayt chegarasi (utf8mb4 da 768 belgi).",
    "- Qo'shish/yangilashda tekshiruv (yozishni biroz sekinlashtiradi).",
    "- Unikal indeks optimizer'ga \"bitta qator\" kafolati beradi (`const`/`eq_ref`).",
    "",
    "### Poyga",
    "Ilovada \"mavjudmi?\" tekshiruvi poygaga ochiq: unique constraint + xatoni (`1062`) ushlash yoki `ON DUPLICATE KEY UPDATE`/`upsert`.",
    "",
    "### Qo'shish",
    "`ALTER TABLE users ADD UNIQUE KEY uq_email (email);` — mavjud takrorlar bo'lsa xato: avval tozalang (`GROUP BY ... HAVING COUNT(*) > 1`).",
    "",
    "### Laravel",
    "`->unique()`, `unique(['tenant_id', 'slug'])`, validatsiya `Rule::unique(...)->ignore($id)`.",
    "",
    "### Dizayn",
    "Biznes unikalligi (`email`, `sku`, `slug`) har doim unique indeks bilan; faqat validatsiya yetarli emas."
  ],
  "examples": [
    {
      "title": "Unique",
      "lang": "sql",
      "code": [
        "ALTER TABLE users ADD UNIQUE KEY uq_users_email (email);",
        "-- takrorlarni topish (qo'shishdan oldin)",
        "SELECT email, COUNT(*) c FROM users GROUP BY email HAVING c > 1;"
      ]
    }
  ],
  "pitfalls": [
    "Mavjud takrorlar bilan unique indeks qo'shish xato beradi: avval tozalang.",
    "Faqat validatsiya (indekssiz) poygada dublikat beradi.",
    "`_ci` collation'da unique registrni farqlamaydi.",
    "Uzun matn ustunda unique indeks uzunlik chegarasiga uriladi: prefiks/hash."
  ]
});
