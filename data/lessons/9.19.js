/* Chuqur dars: 9.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.19", {
  "lesson": [
    "### Ijro rejasi",
    "Optimizer so'rovni **qanday** bajarishini ko'rsatadi: qaysi indeks, join tartibi, qatorlar soni. MySQL: `EXPLAIN`, `EXPLAIN ANALYZE` (8.0.18+). PostgreSQL: `EXPLAIN (ANALYZE, BUFFERS)`.",
    "",
    "### MySQL EXPLAIN ustunlari",
    "`type` (`const/eq_ref/ref/range/index/ALL`), `key`, `key_len`, `rows`, `filtered`, `Extra` (`Using index`, `Using filesort`, `Using temporary`). (Batafsil: 10.8.)",
    "",
    "### Qanday o'qish",
    "1. **Skan turi:** `ALL` (to'liq) — katta jadvalda yomon; `ref/range` yaxshi.",
    "2. `rows` qancha o'qiladi.",
    "3. **Join tartibi:** qaysi jadval birinchi.",
    "4. **Indeks ishlatilmoqdami** (`key` NULL emasmi).",
    "5. **Filesort/temporary** — qimmat bosqichlar.",
    "6. (`EXPLAIN ANALYZE`) **taxmin vs real**: katta farq — statistika eskirgan.",
    "",
    "### Optimizer",
    "Narx asosida (cost-based) tanlaydi; statistikaga (`ANALYZE TABLE`) tayanadi. Kichik jadvalda indeks ishlatmasligi normal.",
    "",
    "### Reja barqarorligi",
    "Ma'lumot hajmi o'zgarsa reja ham o'zgaradi: \"kechagi tez so'rov bugun sekin\". Production hajmidagi ma'lumotda sinang.",
    "",
    "### Vositalar",
    "`EXPLAIN FORMAT=JSON/TREE`, MySQL Workbench Visual Explain, `pt-visual-explain`, PostgreSQL `explain.dalibo.com`.",
    "",
    "### Laravel",
    "`->toSql()`, `->explain()` (Query Builder): `User::where(...)->explain()`; Telescope so'rovlari.",
    "",
    "### Qoida",
    "Taxmin qilmang: `EXPLAIN` bilan tasdiqlang, o'zgartirishdan keyin qayta tekshiring."
  ],
  "examples": [
    {
      "title": "Laravel'da explain",
      "lang": "php",
      "code": [
        "DB::table('orders')->where('user_id', 5)->orderByDesc('created_at')->limit(20)->explain()->dd();",
        "// yoki SQL: DB::table('orders')->where(...)->toSql();"
      ]
    }
  ],
  "pitfalls": [
    "Kichik test ma'lumotida tez bo'lgan reja production hajmida boshqacha bo'lishi mumkin.",
    "`rows` taxmin: eskirgan statistika uchun `ANALYZE TABLE`.",
    "`EXPLAIN ANALYZE` so'rovni haqiqatan bajaradi: og'ir so'rovda ehtiyot.",
    "Indeks ishlatilmagani har doim xato emas: optimizer to'liq skanni arzon deb hisoblashi mumkin."
  ]
});
