/* Chuqur dars: 55.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.8", {
  "lesson": [
    "### B-tree",
    "Eng ko'p ishlatiladigan indeks: **muvozanatlangan daraxt**, barg sahifalari tartiblangan va bog'langan. Qidirish O(log n). MySQL InnoDB, PostgreSQL, ko'p DB'larda default. (MySQL: 10.5.)",
    "",
    "### Tezlashtiradigan amallar",
    "`=`, `<`, `>`, `BETWEEN`, `IN`; `ORDER BY` / `GROUP BY` (tartibda); `MIN/MAX`; prefiks `LIKE 'abc%'`; JOIN.",
    "",
    "### Ishlamaydigan",
    "`LIKE '%abc'`, ustunda funksiya (functional index bo'lmasa), turni o'girish, `OR` turli ustunlarda, past selektivlik.",
    "",
    "### Tuzilma",
    "Ildiz → ichki sahifalar → **barg**lar. Sahifa to'lsa bo'linadi (**page split**): tasodifiy kalit ko'p bo'linish va fragmentation beradi. Fill factor.",
    "",
    "### Yozish narxi",
    "Har `INSERT/UPDATE/DELETE` indeksni yangilaydi: ko'p indeks = sekin yozish.",
    "",
    "### Hajm",
    "Indeks hajmi ustun turi × qatorlar; qisqa ustun — ixcham.",
    "",
    "### Ishlatish",
    "Standart tanlov; boshqa turlar (hash, GIN, GiST, BRIN) maxsus holatlar uchun.",
    "",
    "### Kuzatish",
    "`EXPLAIN` (`type`, `key`), `sys.schema_index_statistics`, `pg_stat_user_indexes`.",
    "",
    "### Laravel",
    "`index()`, `unique()`, `primary()` — hammasi B-tree (default)."
  ],
  "examples": [
    {
      "title": "B-tree",
      "lang": "sql",
      "code": [
        "CREATE INDEX idx_orders_created ON orders (created_at);",
        "SELECT id FROM orders WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31' ORDER BY created_at;   -- diapazon + tartib"
      ]
    }
  ],
  "pitfalls": [
    "Tasodifiy kalitlar sahifa bo'linishi va fragmentation beradi.",
    "`LIKE '%x'` B-tree'dan foydalana olmaydi.",
    "Ko'p indeks yozishni sekinlashtiradi.",
    "Past selektivli ustunda B-tree kam foyda beradi."
  ]
});
