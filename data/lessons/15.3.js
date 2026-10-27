/* Chuqur dars: 15.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.3", {
  "lesson": [
    "### Ijro rejalari (execution plans)",
    "Optimizer so'rovni qanday bajarishini: skan turi, indeks, join tartibi va algoritmi, saralash. (MySQL: 10.8; EXPLAIN ANALYZE: 55.18.)",
    "",
    "### O'qish",
    "- **Skan:** MySQL `type` (`const/eq_ref/ref/range/index/ALL`); PG `Seq Scan / Index Scan / Index Only Scan / Bitmap`.",
    "- **Join algoritmi:** Nested Loop (kichik tashqi + indeks), Hash Join (katta, indekssiz), Merge Join (tartiblangan).",
    "- **Join tartibi:** qaysi jadval birinchi (kichik/filtrlanganlar).",
    "- **Qatorlar:** taxmin vs real.",
    "- **Sort/Temp:** `Using filesort`, `Using temporary`.",
    "",
    "### Optimizer qarori",
    "Narx (cost) asosida; statistikaga tayanadi. Kichik jadvalda indeks tashlanishi normal; statistika eskirsa noto'g'ri.",
    "",
    "### Reja o'zgarishi",
    "Ma'lumot hajmi/taqsimoti, statistika, parametr qiymatlari reja o'zgarishiga sabab: \"kecha tez edi\" (reja regressiyasi). Parametrga bog'liq (parameter sniffing — PostgreSQL generic/custom plan).",
    "",
    "### Ta'sir qilish",
    "Indeks qo'shish, so'rovni qayta yozish, statistika (`ANALYZE`, histogramma), **hint** (`USE/FORCE INDEX`, optimizer hints `/*+ ... */`) — oxirgi chora.",
    "",
    "### Tekshirish uchun savollar",
    "Indeks ishlatilmoqdami? Nechta qator o'qilmoqda? Eng qimmat tugun qaysi? Taxmin real bilan mosmi?",
    "",
    "### Laravel",
    "`->toSql()`, `->explain()`, Telescope'dan so'rovni ko'chirib `EXPLAIN` qilish."
  ],
  "examples": [
    {
      "title": "Reja o'qish",
      "lang": "sql",
      "code": [
        "EXPLAIN FORMAT=TREE",
        "SELECT o.id, u.name FROM orders o JOIN users u ON u.id = o.user_id",
        "WHERE o.created_at >= '2025-06-01' ORDER BY o.created_at DESC LIMIT 50;",
        "ANALYZE TABLE orders, users;     -- statistikani yangilash"
      ]
    }
  ],
  "pitfalls": [
    "Reja ma'lumot hajmi o'zgarishi bilan o'zgaradi (regressiya): monitoring.",
    "`FORCE INDEX` ma'lumot o'zgarganda eskirib sekinlashtirishi mumkin.",
    "Kichik jadvalda indeks tashlanishi normal: optimizer to'liq skanni arzon deb biladi.",
    "Taxmin va real qatorlar farqi — statistika muammosi belgisi."
  ]
});
