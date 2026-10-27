/* Chuqur dars: 10.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.8", {
  "lesson": [
    "### EXPLAIN",
    "So'rovning **ijro rejasi**ni ko'rsatadi (so'rovni bajarmasdan): `EXPLAIN SELECT ...`. Formatlar: jadval, `FORMAT=JSON` (batafsil, narx), `FORMAT=TREE` (8.0.16+).",
    "",
    "### Muhim ustunlar",
    "- `type` (yaxshidan yomonga): `system`, `const`, `eq_ref`, `ref`, `range`, `index` (indeksni to'liq skan), `ALL` (jadvalni to'liq skan).",
    "- `possible_keys` / `key`: mumkin / tanlangan indeks. `key = NULL` — indeks ishlatilmagan.",
    "- `key_len`: indeksning qancha qismi ishlatildi (composite uchun).",
    "- `rows`: o'qiladigan taxminiy qatorlar.",
    "- `filtered`: WHERE'dan o'tadigan foiz.",
    "- `Extra`: `Using index` (covering), `Using where`, `Using filesort` (indeks tartibisiz saralash), `Using temporary` (vaqtinchalik jadval), `Using index condition`.",
    "",
    "### EXPLAIN ANALYZE (8.0.18+)",
    "So'rovni **haqiqatan bajaradi** va **haqiqiy** vaqt, qator sonini ko'rsatadi (daraxt shaklida): taxmin va real farqini topish uchun.",
    "`EXPLAIN ANALYZE SELECT ...` — natija: `actual time=0.05..1.2 rows=100 loops=1`.",
    "Ehtiyot: so'rov ishlaydi (og'ir/yozuvchi bo'lsa xavfli).",
    "",
    "### Qanday o'qish",
    "1. `type=ALL` va katta `rows` — indeks kerak.",
    "2. `Using filesort`/`Using temporary` — indeks yoki so'rovni qayta yozing.",
    "3. Taxminiy `rows` va real o'rtasida katta farq — statistika eskirgan (`ANALYZE TABLE`).",
    "",
    "### Optimizer'ga ishonch",
    "Optimizer narx asosida tanlaydi; ba'zan indeksni tashlaydi (kichik jadval, past selektivlik) — bu normal."
  ],
  "examples": [
    {
      "title": "EXPLAIN",
      "lang": "sql",
      "code": [
        "EXPLAIN SELECT * FROM orders WHERE user_id = 5 ORDER BY created_at DESC LIMIT 20;",
        "EXPLAIN FORMAT=TREE SELECT ...;",
        "EXPLAIN ANALYZE SELECT o.id FROM orders o JOIN users u ON u.id = o.user_id WHERE u.email = 'a@b.uz';",
        "ANALYZE TABLE orders;     -- statistikani yangilash"
      ]
    }
  ],
  "pitfalls": [
    "`EXPLAIN ANALYZE` so'rovni haqiqatan bajaradi: og'ir/yozuvchi so'rovlarda ehtiyot bo'ling.",
    "`rows` taxmin: eskirgan statistika (`ANALYZE TABLE`) noto'g'ri reja beradi.",
    "`Using filesort` har doim yomon emas (kichik natijada), lekin katta natijada qimmat.",
    "Kichik jadvalda indeks ishlatilmasligi normal: optimizer to'liq skan arzonroq deb hisoblaydi."
  ]
});
