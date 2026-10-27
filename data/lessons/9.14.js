/* Chuqur dars: 9.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.14", {
  "lesson": [
    "### View",
    "Saqlangan **nomlangan SELECT**; jadvaldek so'raladi. Ma'lumotni o'zi saqlamaydi (oddiy view): har safar so'rov bajariladi.",
    "```sql",
    "CREATE VIEW active_users AS SELECT id, name, email FROM users WHERE deleted_at IS NULL;",
    "SELECT * FROM active_users WHERE email LIKE 'a%';",
    "```",
    "",
    "### Foydasi",
    "- **Murakkab so'rovni soddalashtirish** va qayta ishlatish.",
    "- **Xavfsizlik:** ustun/qatorni yashirish (`GRANT` faqat view'ga).",
    "- **Abstraksiya:** jadval tuzilmasi o'zgarsa view bir xil qoladi.",
    "",
    "### Yangilanadigan view",
    "Oddiy view (bitta jadval, aggregat/`DISTINCT`/`UNION`/`GROUP BY`siz) orqali `INSERT/UPDATE/DELETE` mumkin. `WITH CHECK OPTION` — view shartiga zid yozishni taqiqlaydi.",
    "",
    "### Cheklovlar",
    "- MySQL'da **materialized view yo'q** (qo'lda jadval + yangilash/event).",
    "- View ustida indeks yo'q: asosiy jadval indekslari ishlatiladi.",
    "- Ichma-ich view'lar tezlikka zarar (optimizer `MERGE` yoki `TEMPTABLE` algoritmi).",
    "- `SELECT *` view yaratilganda ustunlar qotadi (jadvalga keyin qo'shilgan ustun ko'rinmaydi).",
    "",
    "### Algoritm",
    "`MERGE` (so'rovga qo'shiladi, tez), `TEMPTABLE` (vaqtinchalik jadval), `UNDEFINED`.",
    "",
    "### Qachon yaxshi",
    "Hisobotlar, xavfsizlik qatlami, legacy sxemani yashirish. Eloquent'da ko'pincha model + scope yetarli.",
    "",
    "### Laravel",
    "`DB::statement('CREATE VIEW ...')` migratsiyada; model `protected $table = 'active_users'` (faqat o'qish uchun)."
  ],
  "examples": [
    {
      "title": "View",
      "lang": "sql",
      "code": [
        "CREATE OR REPLACE VIEW order_totals AS",
        "SELECT o.id, o.user_id, SUM(l.qty * l.price) AS total",
        "FROM orders o JOIN order_lines l ON l.order_id = o.id",
        "GROUP BY o.id, o.user_id;",
        "",
        "SELECT * FROM order_totals WHERE user_id = 5;"
      ]
    }
  ],
  "pitfalls": [
    "View ma'lumotni saqlamaydi: har safar so'rov bajariladi (materialized emas).",
    "Ichma-ich view'lar tezlikni tushirishi mumkin.",
    "`SELECT *` bilan yaratilgan view'ga jadvalga keyin qo'shilgan ustunlar ko'rinmaydi.",
    "Murakkab view orqali yozish (UPDATE) ko'pincha mumkin emas."
  ]
});
