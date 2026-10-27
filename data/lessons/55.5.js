/* Chuqur dars: 55.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.5", {
  "lesson": [
    "### Partial index",
    "Indeks **faqat shartga mos qatorlarni** qamraydi: kichik, tez. **PostgreSQL**: `CREATE INDEX idx_active ON users (email) WHERE deleted_at IS NULL;`. **MySQL'da yo'q** (to'g'ridan-to'g'ri).",
    "",
    "### Foydasi",
    "- Kichik indeks (faqat kerakli qatorlar).",
    "- Tez yozish (shart tashqarisidagi qatorlar indekslanmaydi).",
    "- **Partial UNIQUE:** faqat faol qatorlar unikal (soft delete muammosini hal qiladi).",
    "",
    "### Misollar (PostgreSQL)",
    "- `WHERE status = 'pending'` (ish navbati: ko'pi tugagan).",
    "- `UNIQUE (email) WHERE deleted_at IS NULL`.",
    "- `WHERE active` kam qiymatli bayroq.",
    "",
    "### Optimizer shartlari",
    "So'rov sharti indeks sharti bilan **mos kelishi** kerak (indeks `WHERE status='pending'` bo'lsa so'rov ham shuni o'z ichiga olsin).",
    "",
    "### MySQL'da emulatsiya",
    "- **Generated column** + indeks: `active_email VARCHAR(255) AS (IF(deleted_at IS NULL, email, NULL)), UNIQUE (active_email)` (NULL'lar takror ruxsat).",
    "- Kam uchraydigan holat uchun alohida jadval.",
    "- Functional index (55.6).",
    "",
    "### Laravel",
    "PostgreSQL: `DB::statement('CREATE INDEX ... WHERE ...')`; Laravel schema builder to'g'ridan-to'g'ri partial index yaratmaydi (xom SQL).",
    "",
    "### Ehtiyot",
    "Shart o'zgarsa (yangi status) indeks yaroqsiz; migratsiya va hujjat."
  ],
  "examples": [
    {
      "title": "PostgreSQL va MySQL emulyatsiya",
      "lang": "sql",
      "code": [
        "-- PostgreSQL",
        "CREATE UNIQUE INDEX uq_users_email_active ON users (email) WHERE deleted_at IS NULL;",
        "CREATE INDEX idx_jobs_pending ON jobs (created_at) WHERE status = 'pending';",
        "",
        "-- MySQL: generated column bilan",
        "ALTER TABLE users ADD COLUMN email_active VARCHAR(255) AS (IF(deleted_at IS NULL, email, NULL)) VIRTUAL,",
        "                  ADD UNIQUE KEY uq_email_active (email_active);"
      ]
    }
  ],
  "pitfalls": [
    "MySQL'da partial index yo'q: generated column/functional index bilan emulyatsiya.",
    "So'rov sharti indeks sharti bilan mos kelmasa indeks ishlatilmaydi.",
    "Partial indeks shartini keyin o'zgartirish migratsiya talab qiladi.",
    "Laravel schema builder partial indeksni to'g'ridan-to'g'ri bermaydi: xom SQL."
  ]
});
