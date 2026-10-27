/* Chuqur dars: 15.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.17", {
  "lesson": [
    "### Partitioning",
    "Katta jadvalni **mantiqiy bitta**, **jismonan bir nechta bo'lak (partition)**ga bo'lish (kalit bo'yicha). MySQL, PostgreSQL qo'llaydi.",
    "",
    "### MySQL turlari",
    "- **RANGE:** diapazon (sana: oy/yil bo'yicha) — eng ko'p.",
    "- **LIST:** aniq qiymatlar ro'yxati (region).",
    "- **HASH / KEY:** bir tekis taqsimlash.",
    "- **COLUMNS** variantlari.",
    "```sql",
    "PARTITION BY RANGE (YEAR(created_at)) (PARTITION p2024 VALUES LESS THAN (2025), PARTITION p2025 VALUES LESS THAN (2026), PARTITION pmax VALUES LESS THAN MAXVALUE)",
    "```",
    "",
    "### Foydasi",
    "- **Partition pruning:** so'rov faqat kerakli bo'laklarni skan qiladi (sana filtri bo'lsa).",
    "- **Eski ma'lumotni tez o'chirish:** `ALTER TABLE ... DROP PARTITION` (DELETE o'rniga, tez va qulfsiz).",
    "- Texnik xizmat bo'laklab (backup, optimize).",
    "- Katta jadvalda boshqaruvchanlik.",
    "",
    "### Cheklovlar (MySQL)",
    "- **Partition kaliti PK va barcha UNIQUE indekslarning bir qismi bo'lishi shart** (`PRIMARY KEY (id, created_at)`).",
    "- **FK qo'llanmaydi** (partitsiyalangan jadvalda).",
    "- Bo'laklar soni chegarasi (8192), ko'p bo'lak sekin.",
    "- So'rov partition kalitisiz bo'lsa **barcha bo'laklar** skanlanadi (foyda yo'q, hatto sekinroq).",
    "",
    "### Qachon foydali",
    "Juda katta (yuzlab mln qator), vaqt qatori/log, eski ma'lumotni muntazam o'chirish, filtrlar kalit bo'yicha.",
    "",
    "### Qachon yo'q",
    "Kichik/o'rta jadval, kalitsiz so'rovlar, FK kerak — to'g'ri indeks va arxiv yaxshiroq.",
    "",
    "### Muqobil",
    "Arxiv jadval, sharding (bir necha server), vaqt qatori DB (TimescaleDB), ClickHouse (analitika).",
    "",
    "### Laravel",
    "Migratsiyada xom SQL (`DB::statement('ALTER TABLE ... PARTITION BY ...')`); PostgreSQL deklarativ partitsiya."
  ],
  "examples": [
    {
      "title": "RANGE partition",
      "lang": "sql",
      "code": [
        "CREATE TABLE logs (",
        "  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,",
        "  created_at DATETIME NOT NULL,",
        "  message TEXT,",
        "  PRIMARY KEY (id, created_at)                      -- partition kaliti PK ichida",
        ") PARTITION BY RANGE (TO_DAYS(created_at)) (",
        "  PARTITION p202506 VALUES LESS THAN (TO_DAYS('2025-07-01')),",
        "  PARTITION p202507 VALUES LESS THAN (TO_DAYS('2025-08-01')),",
        "  PARTITION pmax VALUES LESS THAN MAXVALUE",
        ");",
        "ALTER TABLE logs DROP PARTITION p202506;            -- eski oyni tezkor o'chirish"
      ]
    }
  ],
  "pitfalls": [
    "MySQL'da partition kaliti PK/UNIQUE indekslarning qismi bo'lishi shart.",
    "Partitsiyalangan jadvalda FK ishlamaydi.",
    "Partition kalitisiz so'rov barcha bo'laklarni skanlaydi: foyda yo'q.",
    "Bo'laklarni oldindan yaratishni unutish (`pmax` ga to'planib ketadi): avtomatik boshqaruv."
  ]
});
