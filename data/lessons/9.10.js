/* Chuqur dars: 9.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.10", {
  "lesson": [
    "### NULL nima",
    "`NULL` — \"noma'lum/qiymat yo'q\"; nol ham, bo'sh satr ham emas. SQL **uch qiymatli mantiq** (TRUE, FALSE, UNKNOWN) ishlatadi.",
    "",
    "### Asosiy qoidalar",
    "- `NULL = NULL` → **UNKNOWN** (rost emas!). Tekshirish: `IS NULL`, `IS NOT NULL`.",
    "- `NULL` bilan har qanday arifmetika/solishtirish → `NULL` (`5 + NULL = NULL`, `NULL <> 1` = NULL).",
    "- `WHERE` faqat TRUE qaytarganlarni oladi: `WHERE col <> 'x'` NULL qatorlarni **o'tkazib yuboradi**.",
    "- `NULL-safe` tenglik: `a <=> b` (MySQL).",
    "",
    "### Funksiyalar",
    "`COALESCE(a, b, 0)` (birinchi NULL emas), `IFNULL(a, b)`, `NULLIF(a, b)`, `IS NULL`.",
    "",
    "### Aggregatlar",
    "`COUNT(col)`, `SUM`, `AVG`, `MIN`, `MAX` NULL'larni **e'tiborsiz** qoldiradi; `COUNT(*)` hammasini sanaydi.",
    "",
    "### Saralash va guruhlash",
    "`ORDER BY` da NULL MySQL'da **eng kichik** (ASC da birinchi). `GROUP BY` va `DISTINCT` NULL'larni bitta guruh deb oladi. `UNIQUE` indeksda bir nechta NULL mumkin.",
    "",
    "### `NOT IN` tuzog'i",
    "`x NOT IN (1, 2, NULL)` hech qachon TRUE bo'lmaydi → `NOT EXISTS` ishlating.",
    "",
    "### Dizayn",
    "Kerak bo'lmasa `NOT NULL` + default. NULL ma'noli bo'lsa (noma'lum/qo'llanmaydi) ishlating. Ilovada NULL va `0`/`''` ni aralashtirmang.",
    "",
    "### Laravel",
    "`whereNull()`, `whereNotNull()`, `nullable()` migratsiyada, Eloquent `null` cast."
  ],
  "examples": [
    {
      "title": "NULL tuzoqlari",
      "lang": "sql",
      "code": [
        "SELECT * FROM users WHERE deleted_at IS NULL;               -- = NULL emas",
        "SELECT * FROM users WHERE status <> 'banned';               -- status NULL qatorlar chiqmaydi!",
        "SELECT * FROM users WHERE status <> 'banned' OR status IS NULL;",
        "SELECT COALESCE(discount, 0) FROM orders;",
        "SELECT 1 WHERE 5 NOT IN (1, 2, NULL);                        -- bo'sh natija"
      ]
    }
  ],
  "pitfalls": [
    "`= NULL` hech qachon rost emas: `IS NULL`.",
    "`col <> 'x'` NULL qatorlarni chiqarmaydi: `OR col IS NULL`.",
    "`NOT IN` ro'yxatda NULL bo'lsa natija bo'sh: `NOT EXISTS`.",
    "`SUM` hamma NULL'da NULL qaytaradi: `COALESCE`."
  ]
});
