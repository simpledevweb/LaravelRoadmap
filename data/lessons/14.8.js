/* Chuqur dars: 14.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.8", {
  "lesson": [
    "### Unique constraint",
    "Ustun yoki ustunlar kombinatsiyasi qiymati **takrorlanmasligi**ni DB darajasida kafolatlaydi: `UNIQUE KEY uq_email (email)`.",
    "",
    "### Qachon kerak",
    "- Biznes unikalligi: `email`, `slug`, `sku`, `invoice_number`.",
    "- `(tenant_id, slug)` — tenant ichida unikal.",
    "- `(user_id, post_id)` — bitta like.",
    "",
    "### Muhim nuanslar",
    "- **NULL** qiymatlar bir necha marta ruxsat (MySQL, PostgreSQL ham).",
    "- **Collation:** `_ci` da `'Ali'` va `'ali'` takror.",
    "- **Soft delete:** o'chirilgan qator unikal'likni band qiladi. Yechim: `UNIQUE (email, deleted_at)` (NULL muammosi!), generated column (`IF(deleted_at IS NULL, email, NULL)`), yoki partial index (PostgreSQL).",
    "- **Uzun matn:** indeks cheklovi (3072 bayt): prefiks yoki hash ustun.",
    "- Indeks hajmi va yozish narxi.",
    "",
    "### Ilova validatsiyasi + DB",
    "Laravel `unique` validatsiya UX uchun; **poyga** holatida takror yozuv: DB `UNIQUE` asosiy himoya. `QueryException`'dagi `1062` ni ushlab, foydalanuvchiga xabar bering yoki `upsert`/`firstOrCreate` (poygasiz emas: `ON DUPLICATE KEY`).",
    "",
    "### Ishlatish",
    "`->unique()`, `unique(['tenant_id','slug'])`, `Rule::unique('users')->ignore($id)`.",
    "",
    "### Xatolar",
    "Faqat ilova tekshiruvi, soft delete bilan unikal'lik buzilishi, tenant ichida emas global unikal."
  ],
  "examples": [
    {
      "title": "Unique",
      "lang": "sql",
      "code": [
        "ALTER TABLE users ADD UNIQUE KEY uq_users_email (email);",
        "ALTER TABLE posts ADD UNIQUE KEY uq_posts_tenant_slug (tenant_id, slug);",
        "",
        "-- soft delete bilan: faqat faol qatorlar unikal",
        "ALTER TABLE users ADD COLUMN email_active VARCHAR(255) AS (IF(deleted_at IS NULL, email, NULL)) VIRTUAL,",
        "                  ADD UNIQUE KEY uq_email_active (email_active);"
      ]
    }
  ],
  "pitfalls": [
    "Faqat ilova validatsiyasi: poygada dublikat yozuv, DB `UNIQUE` shart.",
    "Soft delete'da o'chirilgan qator unikal'likni band qiladi.",
    "`UNIQUE` NULL'larni takrorlanishga ruxsat beradi.",
    "`_ci` collation'da unique registrni farqlamaydi."
  ]
});
