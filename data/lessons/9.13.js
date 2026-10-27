/* Chuqur dars: 9.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.13", {
  "lesson": [
    "### UNIQUE",
    "Ustun (yoki ustunlar kombinatsiyasi) qiymatlari **takrorlanmasligi**ni kafolatlaydi va unikal indeks yaratadi.",
    "- `UNIQUE KEY uq_email (email)`; composite: `UNIQUE (tenant_id, slug)`.",
    "- **NULL** qiymatlar bir necha marta bo'lishi mumkin (MySQL).",
    "- Collation'ga bog'liq: `_ci` da `'A'` va `'a'` takror hisoblanadi.",
    "- Prefiks: `UNIQUE (title(50))` — faqat prefiks unikal (ehtiyot).",
    "- Soft delete: `deleted_at` bilan unikal'lik muammosi (o'chirilgan qator ham bandligi): `UNIQUE (email, deleted_at)` yoki generated column.",
    "",
    "### Poyga holati",
    "Ilovada \"mavjudmi?\" tekshirib keyin `INSERT` — poyga. To'g'ri yo'l: `UNIQUE` constraint + `INSERT` + xatoni (`1062 Duplicate entry`) ushlash yoki `INSERT ... ON DUPLICATE KEY UPDATE`.",
    "",
    "### CHECK (MySQL 8.0.16+)",
    "Shart bajarilmasa yozuv rad etiladi:",
    "`CONSTRAINT chk_age CHECK (age BETWEEN 0 AND 150)`, `CHECK (end_date >= start_date)`.",
    "- **8.0.16 dan oldin** `CHECK` yozilsa ham **e'tiborsiz qoldirilardi**! Versiyani tekshiring.",
    "- Ifodada determinist funksiyalar; boshqa jadvalga subquery yo'q.",
    "- `NOT ENFORCED` (shartni o'chirib turish).",
    "- NULL: shart `UNKNOWN` bo'lsa o'tadi (`CHECK (x > 0)` NULL'ni rad etmaydi).",
    "",
    "### Laravel",
    "`->unique()`, `unique(['tenant_id', 'slug'])`; `unique` validatsiya qoidasi + DB constraint; `DB::statement` bilan CHECK."
  ],
  "examples": [
    {
      "title": "UNIQUE va CHECK",
      "lang": "sql",
      "code": [
        "ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);",
        "ALTER TABLE bookings ADD CONSTRAINT chk_dates CHECK (end_date >= start_date);",
        "",
        "INSERT INTO users (email) VALUES ('a@b.uz')",
        "ON DUPLICATE KEY UPDATE updated_at = NOW();       -- poygasiz upsert"
      ]
    }
  ],
  "pitfalls": [
    "MySQL 8.0.16 dan oldin `CHECK` e'tiborsiz qoldiriladi.",
    "`_ci` collation'da unique registrni farqlamaydi.",
    "'Avval tekshir, keyin qo'sh' poygaga ochiq: UNIQUE + xatoni ushlash.",
    "`CHECK (x > 0)` NULL'ni rad etmaydi: kerak bo'lsa `NOT NULL` ham."
  ]
});
