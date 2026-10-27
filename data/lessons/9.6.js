/* Chuqur dars: 9.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.6", {
  "lesson": [
    "### Window funksiyalar",
    "Qatorlarni **guruhlamasdan** (qatorlar saqlanadi) \"oyna\" (window) bo'yicha hisob: `funksiya() OVER (PARTITION BY ... ORDER BY ... frame)`. MySQL 8.0+.",
    "",
    "### Turlari",
    "- **Reyting:** `ROW_NUMBER()`, `RANK()` (bo'shliq bilan), `DENSE_RANK()`, `NTILE(n)`.",
    "- **Siljish:** `LAG(col, n)`, `LEAD(col, n)` (oldingi/keyingi qator), `FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE`.",
    "- **Aggregat:** `SUM() OVER`, `AVG() OVER`, `COUNT() OVER` (yurib boruvchi yig'indi).",
    "",
    "### Sintaksis",
    "```sql",
    "SELECT id, user_id, total,",
    "  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn,",
    "  SUM(total)   OVER (PARTITION BY user_id ORDER BY created_at) AS running_total,",
    "  LAG(total)   OVER (PARTITION BY user_id ORDER BY created_at) AS prev_total",
    "FROM orders;",
    "```",
    "",
    "### Foydalanish",
    "- Har foydalanuvchining **oxirgi** buyurtmasi (`ROW_NUMBER() = 1`).",
    "- Top-N har guruhda.",
    "- Yurib boruvchi yig'indi, oldingi qiymat bilan farq.",
    "- Foiz ulushi: `total / SUM(total) OVER ()`.",
    "",
    "### Frame",
    "`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (siljuvchi o'rtacha). `ORDER BY` bor bo'lsa default frame `RANGE UNBOUNDED PRECEDING..CURRENT ROW`; `LAST_VALUE` uchun frame'ni aniq yozing.",
    "",
    "### Cheklov",
    "Window natijasini `WHERE` da filtrlab bo'lmaydi (subquery/CTE kerak): `WITH r AS (SELECT ..., ROW_NUMBER() ...) SELECT * FROM r WHERE rn = 1`.",
    "",
    "### Samaradorlik",
    "Saralash/partitsiya xotira talab qiladi; mos indeks (`PARTITION BY, ORDER BY` ustunlari) yordam beradi."
  ],
  "examples": [
    {
      "title": "Har guruhdagi oxirgisi",
      "lang": "sql",
      "code": [
        "WITH ranked AS (",
        "  SELECT o.*, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn",
        "  FROM orders o",
        ")",
        "SELECT * FROM ranked WHERE rn = 1;     -- har foydalanuvchining oxirgi buyurtmasi"
      ]
    }
  ],
  "pitfalls": [
    "Window natijasini to'g'ridan `WHERE`da ishlatib bo'lmaydi: CTE/subquery.",
    "`ROW_NUMBER` va `RANK` farqi: RANK teng qiymatlarda bo'shliq qoldiradi.",
    "`LAST_VALUE` default frame'da kutilgan natijani bermaydi: frame'ni aniq yozing.",
    "Katta partitsiyalar xotirani to'ldiradi: indeks va chegara."
  ]
});
