/* Chuqur dars: 10.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.5", {
  "lesson": [
    "### B-tree indeks",
    "Muvozanatlangan daraxt; **barg** sahifalari tartiblangan va bir-biriga bog'langan. Qidirish O(log n). InnoDB'da default.",
    "",
    "### Nimani tezlashtiradi",
    "- `=`, `IN`, `BETWEEN`, `<`, `>` (diapazon).",
    "- `ORDER BY` / `GROUP BY` (indeks tartibida).",
    "- `LIKE 'abc%'` (prefiks); `LIKE '%abc'` — yo'q (oldidan wildcard).",
    "- `MIN/MAX`, JOIN ustunlari.",
    "",
    "### Clustered va secondary",
    "- **Clustered (PK):** barg sahifalarida qatorning o'zi.",
    "- **Secondary:** barg sahifalarida indeks ustunlari + **PK qiymati**; shundan keyin PK bo'yicha qatorni topadi (**back lookup**). Shu sabab PK qisqa bo'lsin.",
    "",
    "### Indeks ishlamaydigan holatlar",
    "- Ustunda funksiya: `WHERE DATE(created_at) = ...` → diapazonga o'giring (`created_at >= ... AND < ...`).",
    "- Turni o'girish: `WHERE phone = 998901234567` (ustun VARCHAR) → implicit cast.",
    "- `OR` turli ustunlarda, `!=`, `NOT IN`.",
    "- Past selektivlik (`status` 2 qiymat): optimizer indeksni tashlab full scan qilishi mumkin.",
    "- `LIKE '%x'`.",
    "",
    "### Hajm va narx",
    "Indeks xotira va disk egallaydi, `INSERT/UPDATE/DELETE` ni sekinlashtiradi (har indeks yangilanadi): faqat kerakli indekslar.",
    "",
    "### Prefiks indeks",
    "`INDEX (title(20))` uzun matn uchun; to'liq tartiblash/covering uchun yetarli emas.",
    "",
    "### Yaratish",
    "`CREATE INDEX idx_email ON users (email);` Laravel `index()`, `unique()`. Katta jadvalda online DDL (`ALGORITHM=INPLACE, LOCK=NONE`)."
  ],
  "examples": [
    {
      "title": "Indeks ishlatish",
      "lang": "sql",
      "code": [
        "-- YOMON: ustunda funksiya, indeks ishlamaydi",
        "SELECT * FROM orders WHERE DATE(created_at) = '2025-06-01';",
        "",
        "-- YAXSHI: diapazon",
        "SELECT * FROM orders WHERE created_at >= '2025-06-01' AND created_at < '2025-06-02';",
        "",
        "CREATE INDEX idx_orders_created ON orders (created_at);"
      ]
    }
  ],
  "pitfalls": [
    "Ustunda funksiya (`DATE(col)`, `LOWER(col)`) indeksni o'chiradi: diapazon yoki functional index.",
    "`LIKE '%abc'` B-tree'dan foydalana olmaydi: full-text/search engine.",
    "Ko'p indeks yozishni sekinlashtiradi: foydalanilmayotganlarini o'chiring.",
    "VARCHAR ustunni son bilan solishtirish implicit cast bilan indeksni ishlatmaydi."
  ]
});
