/* Chuqur dars: 55.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.16", {
  "lesson": [
    "### Indeks foydalanishini tahlil qilish",
    "Qaysi indeks **ishlatilayotgani**, qaysi biri **foydasiz** ekanini bilish.",
    "",
    "### MySQL",
    "- `EXPLAIN` — aniq so'rov uchun `key`.",
    "- **sys schema:** `sys.schema_index_statistics` (o'qish/yozish soni, kutish), `sys.schema_unused_indexes` (ishlatilmaganlar), `sys.schema_redundant_indexes`.",
    "- **performance_schema:** `table_io_waits_summary_by_index_usage`.",
    "- `information_schema.STATISTICS` (indeks tarkibi, kardinallik).",
    "- Eslatma: statistika server qayta ishga tushganda nollanadi: kamida bir to'liq biznes tsikl (hafta/oy) kuzating.",
    "",
    "### PostgreSQL",
    "`pg_stat_user_indexes` (`idx_scan`, `idx_tup_read`), `pg_stat_user_tables` (seq_scan vs idx_scan), `pg_statio_user_indexes`, `pg_relation_size`; `pg_stat_statements` (og'ir so'rovlar). Kengaytma: `hypopg` (gipotetik indeks), `pganalyze`.",
    "",
    "### Jarayon",
    "1. Sekin so'rovlar (slow log, `pg_stat_statements`).",
    "2. `EXPLAIN (ANALYZE)` — indeks ishlatilyaptimi.",
    "3. Kerakli indeks qo'shing.",
    "4. Ishlatilmaydiganlarini aniqlang (55.17).",
    "5. Qayta o'lchang.",
    "",
    "### Vositalar",
    "Percona PMM, pt-index-usage, MySQL Workbench, Laravel Telescope (so'rovlar), Debugbar.",
    "",
    "### Ehtiyot",
    "- Ishlatilmaydi — ba'zan kamdan-kam (oylik hisobot) so'rov uchun kerak.",
    "- Unique/PK/FK indekslari \"ishlatilmaydi\" deb ko'rinsa ham constraint uchun kerak: o'chirmang.",
    "- Replika'da ham tekshiring (o'qish u yerda bo'lishi mumkin)."
  ],
  "examples": [
    {
      "title": "Foydalanish statistikasi",
      "lang": "sql",
      "code": [
        "SELECT * FROM sys.schema_unused_indexes WHERE object_schema = 'shop';",
        "SELECT * FROM sys.schema_index_statistics WHERE table_name = 'orders' ORDER BY rows_selected DESC;",
        "-- PostgreSQL",
        "-- SELECT relname, indexrelname, idx_scan FROM pg_stat_user_indexes ORDER BY idx_scan ASC LIMIT 20;"
      ]
    }
  ],
  "pitfalls": [
    "Statistika qayta ishga tushganda nollanadi: kamida bir biznes tsikl kuzating.",
    "Unique/FK indekslari 'ishlatilmagan' ko'rinsa ham constraint uchun kerak: o'chirmang.",
    "Kamdan-kam (oylik hisobot) so'rov uchun indeks 'foydasiz' ko'rinishi mumkin.",
    "Faqat asosiy serverga qarash: replikada o'qish ko'p bo'lishi mumkin."
  ]
});
