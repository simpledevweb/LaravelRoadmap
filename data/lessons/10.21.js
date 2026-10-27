/* Chuqur dars: 10.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.21", {
  "lesson": [
    "### Tamoyil",
    "Tuning — **o'lchash** va **kerakli joyni** sozlash. Ko'pincha so'rovlar va indekslar server parametrlaridan muhimroq. Konfiguratsiyani ko'r-ko'rona nusxalamang.",
    "",
    "### Eng muhim InnoDB sozlamalari",
    "- `innodb_buffer_pool_size`: eng muhimi; ishchi ma'lumot sig'adigan, ajratilgan DB serverda RAM'ning ~50–75%.",
    "- `innodb_buffer_pool_instances` (katta pool uchun).",
    "- `innodb_redo_log_capacity` (8.0.30+; eskida `innodb_log_file_size`): yozish yuklamasi uchun yetarli katta.",
    "- `innodb_flush_log_at_trx_commit`: 1 (xavfsiz), 2 (tezroq, xavfliroq).",
    "- `innodb_flush_method=O_DIRECT`, `innodb_io_capacity` (SSD uchun yuqori).",
    "- `innodb_file_per_table=ON`.",
    "",
    "### Boshqa",
    "- `max_connections` va per-connection buffer'lar (`sort_buffer_size`, `join_buffer_size`, `read_buffer_size`): ularni haddan katta qilmang (har ulanishga).",
    "- `tmp_table_size`/`max_heap_table_size` (disk'ga tushadigan vaqtinchalik jadvallar).",
    "- `table_open_cache`, `thread_cache_size`.",
    "- Query Cache — 8.0 da yo'q.",
    "",
    "### O'lchash",
    "- `SHOW GLOBAL STATUS` (`Innodb_buffer_pool_reads` vs `read_requests` → hit ratio ≥ ~99%), `Created_tmp_disk_tables`, `Handler_read_rnd_next`.",
    "- **performance_schema**, **sys** schema.",
    "- Slow log (10.17), `EXPLAIN`.",
    "- **MySQLTuner**, Percona PMM, Grafana + exporter.",
    "",
    "### Tartib",
    "1. So'rovlar/indekslar.",
    "2. Sxema (to'g'ri turlar).",
    "3. Buffer pool va redo log.",
    "4. Ulanishlar.",
    "5. OS/disk (SSD, NVMe), CPU.",
    "6. Masshtab: replika, kesh, sharding.",
    "",
    "### Xavf",
    "Bir vaqtda ko'p parametrni o'zgartirish natija sababini yashiradi: bittadan o'zgartiring va o'lchang; o'zgarishlarni hujjatlang."
  ],
  "examples": [
    {
      "title": "Konfiguratsiya namunasi",
      "lang": "ini",
      "code": [
        "[mysqld]",
        "innodb_buffer_pool_size = 8G          ; 16 GB serverda",
        "innodb_redo_log_capacity = 2G",
        "innodb_flush_log_at_trx_commit = 1",
        "innodb_flush_method = O_DIRECT",
        "max_connections = 300",
        "slow_query_log = 1",
        "long_query_time = 1"
      ]
    }
  ],
  "pitfalls": [
    "Per-connection buffer'larni (`sort_buffer_size`) katta qilish ko'p ulanishda xotirani to'ldiradi.",
    "Bir vaqtda ko'p parametrni o'zgartirish natija sababini yashiradi.",
    "Internetdagi tayyor `my.cnf`ni o'z yuklamangizsiz nusxalash zarar berishi mumkin.",
    "Parametrlarga e'tibor berib, sekin so'rov va indeks muammosini unutish: avval ularni tuzating."
  ]
});
