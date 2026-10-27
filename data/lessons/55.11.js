/* Chuqur dars: 55.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.11", {
  "lesson": [
    "### Selektivlik",
    "Ustundagi **noyob qiymatlar ulushi**: `COUNT(DISTINCT col) / COUNT(*)` (0..1). Yuqori selektivlik (`email`, `id` ≈ 1) — indeks juda foydali; past (`gender`, `status`, `boolean` ≈ 0.01) — kam foyda.",
    "",
    "### Kardinallik",
    "Noyob qiymatlar **soni** (`SHOW INDEX` → `Cardinality`, statistika). Optimizer shunga qarab reja tanlaydi.",
    "",
    "### Nega muhim",
    "- Yuqori selektivlik: indeks bir necha qatorga olib boradi (tez).",
    "- Past selektivlik: indeks qatorlarning katta qismiga olib boradi; **tasodifiy I/O** to'liq skandan qimmat: optimizer indeksni **tashlab** full scan tanlashi mumkin.",
    "",
    "### Hisoblash",
    "```sql",
    "SELECT COUNT(DISTINCT status)/COUNT(*) AS sel FROM orders;",
    "```",
    "Taqsimot ham muhim: `status='paid'` 95% bo'lsa, `status='failed'` (1%) uchun indeks foydali (histogramma).",
    "",
    "### Composite'da",
    "Past selektivli ustun yolg'iz kam foyda, lekin boshqasi bilan birga foydali (`(status, created_at)`). Ustun tartibi: so'rovga ko'ra; selektivlik ikkinchi omil.",
    "",
    "### MySQL 8.0 histogramma",
    "`ANALYZE TABLE orders UPDATE HISTOGRAM ON status;` — taqsimot ma'lumoti optimizer uchun.",
    "",
    "### Statistika",
    "`ANALYZE TABLE` (MySQL), `ANALYZE` (PostgreSQL) — eskirgan statistika noto'g'ri reja beradi.",
    "",
    "### Amaliyot",
    "Indeks yaratishdan oldin selektivlik/taqsimotni tekshiring; past selektivlini yolg'iz indekslamang."
  ],
  "examples": [
    {
      "title": "Selektivlik",
      "lang": "sql",
      "code": [
        "SELECT COUNT(DISTINCT user_id)/COUNT(*) AS user_sel, COUNT(DISTINCT status)/COUNT(*) AS status_sel FROM orders;",
        "SHOW INDEX FROM orders;                                        -- Cardinality",
        "ANALYZE TABLE orders UPDATE HISTOGRAM ON status;               -- taqsimot (8.0)"
      ]
    }
  ],
  "pitfalls": [
    "Past selektivli ustunni (boolean/status) yolg'iz indekslash kam foyda beradi.",
    "Eskirgan statistika (`ANALYZE`) noto'g'ri reja tanlatadi.",
    "Taqsimot notekis bo'lsa (95% 'paid') kam uchraydigan qiymat uchun indeks foydali.",
    "Selektivlik so'rov shaklidan ustun emas: avval WHERE/ORDER'ga qarang."
  ]
});
