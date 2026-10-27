/* Chuqur dars: 55.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.10", {
  "lesson": [
    "### GIN va GiST (PostgreSQL)",
    "Maxsus ma'lumot turlari uchun **kengaytiriladigan** indeks turlari. (MySQL'da yo'q.)",
    "",
    "### GIN (Generalized Inverted Index)",
    "**Inverted index**: element → qatorlar. **Ko'p qiymatli** ustunlar uchun:",
    "- **JSONB:** `@>`, `?` (`CREATE INDEX ON t USING GIN (data)` yoki `jsonb_path_ops`).",
    "- **Massivlar:** `@>`, `&&`.",
    "- **Full-text:** `tsvector`.",
    "- `pg_trgm`: `LIKE '%x%'`, `ILIKE`, o'xshashlik (typo).",
    "Tez o'qish, **sekinroq yozish** (`fastupdate`), katta hajm.",
    "",
    "### GiST (Generalized Search Tree)",
    "Daraxt asosida, **geometrik/oraliq/yaqinlik**:",
    "- **PostGIS** geometriya, `&&`, `<->` (eng yaqin qo'shni).",
    "- **Range turlari** (`tsrange`, `int4range`), **exclusion constraint** (bron kesishmasin).",
    "- `ltree`, full-text (GIN'dan sekinroq o'qish, tezroq yozish).",
    "",
    "### Boshqalar",
    "**BRIN** (juda katta, tabiiy tartiblangan jadval: vaqt qatori; kichik indeks), **SP-GiST**, **Bloom**.",
    "",
    "### Tanlash",
    "- JSONB/massiv/full-text/trigram → **GIN**.",
    "- Geo/range/yaqinlik/exclusion → **GiST**.",
    "- Tabiiy tartibli ulkan jadval → **BRIN**.",
    "",
    "### Laravel",
    "PostgreSQL xom SQL: `DB::statement('CREATE INDEX ... USING GIN (...)')`; `jsonb` ustun, `whereJsonContains`.",
    "",
    "### Ehtiyot",
    "Yozish narxi, indeks hajmi, operator class (`gin_trgm_ops`, `jsonb_path_ops`) to'g'ri tanlanishi."
  ],
  "examples": [
    {
      "title": "GIN va GiST",
      "lang": "sql",
      "code": [
        "-- JSONB",
        "CREATE INDEX idx_events_data ON events USING GIN (data jsonb_path_ops);",
        "SELECT id FROM events WHERE data @> '{\"type\":\"click\"}';",
        "",
        "-- trigram: LIKE '%x%'",
        "CREATE EXTENSION IF NOT EXISTS pg_trgm;",
        "CREATE INDEX idx_users_name_trgm ON users USING GIN (name gin_trgm_ops);",
        "",
        "-- bron kesishmasin",
        "-- ALTER TABLE bookings ADD EXCLUDE USING GIST (room_id WITH =, period WITH &&);"
      ]
    }
  ],
  "pitfalls": [
    "GIN yozishni sekinlashtiradi va katta: faqat kerak joyda.",
    "Operator class noto'g'ri bo'lsa indeks ishlatilmaydi.",
    "MySQL'da GIN/GiST yo'q: generated column/multi-valued/full-text.",
    "BRIN faqat tabiiy tartiblangan ma'lumotda samarali."
  ]
});
