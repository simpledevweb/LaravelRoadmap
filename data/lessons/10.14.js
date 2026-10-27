/* Chuqur dars: 10.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.14", {
  "lesson": [
    "### JSON ustun",
    "`JSON` tur (ichkarida **binary** formatda): sintaksis tekshiriladi, qismlarga tez kirish. Laravel `$table->json('options')`, model `$casts = ['options' => 'array']`.",
    "",
    "### Operatorlar va funksiyalar",
    "- `col->'$.key'` (JSON qiymat), `col->>'$.key'` (matn, tirnoqsiz) = `JSON_UNQUOTE(JSON_EXTRACT(...))`.",
    "- `JSON_SET`, `JSON_INSERT`, `JSON_REPLACE`, `JSON_REMOVE`, `JSON_ARRAY_APPEND`.",
    "- `JSON_CONTAINS`, `JSON_CONTAINS_PATH`, `JSON_SEARCH`, `JSON_LENGTH`, `JSON_KEYS`.",
    "- `JSON_TABLE` (JSON'ni jadvalga aylantirish), `JSON_ARRAYAGG`, `JSON_OBJECTAGG`.",
    "- Laravel: `where('options->color', 'red')`, `whereJsonContains()`, `whereJsonLength()`.",
    "",
    "### Indekslash",
    "JSON ustunning o'zi indekslanmaydi:",
    "- **Generated (virtual/stored) column** + indeks: `color VARCHAR(20) AS (options->>'$.color'), INDEX (color)`.",
    "- **Functional index** (8.0.13+): `INDEX ((CAST(options->>'$.color' AS CHAR(20))))`.",
    "- **Multi-valued index** (8.0.17+): massiv elementlari uchun `INDEX ((CAST(tags->'$[*]' AS UNSIGNED ARRAY)))`.",
    "",
    "### Qachon ishlatish",
    "Sxemasi o'zgaruvchan, kamdan-kam so'raladigan ma'lumot (sozlamalar, atributlar, webhook payload).",
    "",
    "### Qachon yo'q",
    "Tez-tez filtrlanadigan/join qilinadigan, yaxlitlik (FK, `NOT NULL`, tip) kerak bo'lgan ma'lumot: oddiy ustunlar/jadvallar. JSON'da constraint va FK yo'q; katta JSON UPDATE qimmat.",
    "",
    "### Nuanslar",
    "- Kalit tartibi saqlanmaydi (normallashtiriladi), dublikat kalit oxirgisi.",
    "- Sonlar va katta ID aniqligi (JS bilan).",
    "- Hajm: katta JSON off-page saqlanadi."
  ],
  "examples": [
    {
      "title": "Indekslangan JSON",
      "lang": "sql",
      "code": [
        "ALTER TABLE products",
        "  ADD COLUMN color VARCHAR(20) GENERATED ALWAYS AS (attrs->>'$.color') VIRTUAL,",
        "  ADD INDEX idx_color (color);",
        "",
        "SELECT id FROM products WHERE color = 'red';",
        "SELECT id FROM products WHERE JSON_CONTAINS(attrs->'$.tags', '\"sale\"');"
      ]
    }
  ],
  "pitfalls": [
    "JSON ustuni o'z-o'zidan indekslanmaydi: generated column yoki functional index.",
    "Tez-tez filtrlanadigan maydonni JSON'da saqlash sekin va constraint'siz.",
    "`->` JSON qiymat (tirnoq bilan), `->>` matn: solishtirishda `->>` kerak.",
    "Katta JSON'ni butunlay qayta yozish (UPDATE) qimmat: `JSON_SET` bilan qisman yoki ustunlarga ajrating."
  ]
});
