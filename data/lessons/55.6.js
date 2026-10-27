/* Chuqur dars: 55.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.6", {
  "lesson": [
    "### Functional (expression) index",
    "Ustunning o'zi emas, **ifoda/funksiya natijasi** indekslanadi: `WHERE LOWER(email) = ?` yoki `WHERE DATE(created_at) = ?` uchun.",
    "",
    "### Muammo",
    "Ustunda funksiya oddiy indeksni **ishlatmaydi** (sargable emas). Yechim — shu ifodaga indeks.",
    "",
    "### MySQL 8.0.13+",
    "```sql",
    "CREATE INDEX idx_email_lower ON users ((LOWER(email)));          -- qo'sh qavs",
    "CREATE INDEX idx_created_date ON orders ((DATE(created_at)));",
    "```",
    "So'rov **aynan o'sha ifodani** ishlatsin (`LOWER(email)`). Ichkarida yashirin virtual generated column.",
    "Eskida: **generated (virtual) column** + indeks.",
    "",
    "### PostgreSQL",
    "`CREATE INDEX ON users (LOWER(email));` `CREATE INDEX ON events ((payload->>'type'));` (JSONB maydon).",
    "",
    "### Foydalanish",
    "- Registrga sezgir bo'lmagan qidirish (`LOWER`) — yoki `_ci` collation (MySQL'da odatda shart emas).",
    "- Sana qismi (`DATE(created_at)`).",
    "- JSON maydon (`attrs->>'$.color'`).",
    "- Hisoblangan qiymat.",
    "",
    "### Cheklovlar",
    "- Funksiya **determinist** bo'lishi kerak.",
    "- So'rovdagi ifoda indeksdagi bilan mos (turi/collation).",
    "- Yozishda ifoda hisoblanadi (biroz sekinlashadi).",
    "- Alternativa: so'rovni sargable yozish (diapazon: `created_at >= ... AND < ...`).",
    "",
    "### Laravel",
    "`DB::statement('CREATE INDEX ... ((LOWER(email)))')`; yoki generated column migratsiyada `->virtualAs()`."
  ],
  "examples": [
    {
      "title": "Functional index",
      "lang": "sql",
      "code": [
        "CREATE INDEX idx_users_email_lower ON users ((LOWER(email)));",
        "EXPLAIN SELECT id FROM users WHERE LOWER(email) = 'ali@b.uz';      -- indeks ishlatiladi",
        "",
        "ALTER TABLE products ADD COLUMN color VARCHAR(20) AS (attrs->>'$.color') VIRTUAL, ADD INDEX idx_color (color);"
      ]
    }
  ],
  "pitfalls": [
    "So'rovdagi ifoda indeksdagi ifoda bilan aynan mos kelmasa indeks ishlatilmaydi.",
    "Funksiya determinist bo'lishi shart.",
    "Ko'pincha so'rovni sargable qilib (diapazon) yozish functional indeksdan oddiyroq.",
    "MySQL'da functional index uchun qo'sh qavs `((expr))` kerak."
  ]
});
