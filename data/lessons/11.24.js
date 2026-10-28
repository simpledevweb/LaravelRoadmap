/* Chuqur dars: 11.24. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.24", {
  "lesson": [
    "### Tartib: avval so'rov, keyin konfiguratsiya",
    "Performance muammolarining aksariyati yomon so'rov, yetishmayotgan indeks yoki N+1 dan kelib chiqadi. Konfiguratsiya bilan ularni hal qilib bo'lmaydi. To'g'ri jarayon:",
    "1. **O'lchash:** `pg_stat_statements` (11.18) bilan `total_exec_time` bo'yicha top so'rovlar.",
    "2. **Tahlil:** har biriga `EXPLAIN (ANALYZE, BUFFERS)` (11.8).",
    "3. **Tuzatish:** indeks, so'rovni qayta yozish, N+1, keraksiz ustunlar, paginatsiya.",
    "4. **Konfiguratsiya:** server resurslariga mos parametrlar.",
    "5. **Tasdiqlash:** `pgbench` yoki real yuk bilan solishtirish va monitoring.",
    "",
    "### Xotira parametrlari",
    "- `shared_buffers`: RAM'ning ~25%. 40% dan oshirish odatda foyda bermaydi, chunki OS keshi ham ishlaydi. O'zgartirish restart talab qiladi.",
    "- `effective_cache_size`: RAM'ning ~50–75%. Xotira ajratmaydi, planner'ga indeks sahifalari keshda bo'lish ehtimolini aytadi.",
    "- `work_mem`: har bir sort yoki hash **operatsiyasi** uchun. Bir so'rovda bir nechta, parallel worker'larda yana ko'payadi. 200 ulanish × 3 operatsiya × 64 MB = 38 GB. Global qiymatni ehtiyotkorlik bilan (4–32 MB) qo'ying, og'ir hisobot uchun sessiyada oshiring.",
    "- `maintenance_work_mem`: VACUUM, `CREATE INDEX` (512 MB – 2 GB).",
    "",
    "### Disk va planner",
    "- `random_page_cost = 1.1` (SSD/NVMe), `effective_io_concurrency = 200`.",
    "- Parallel so'rovlar: `max_parallel_workers_per_gather` (2–4), `max_worker_processes`.",
    "",
    "### WAL va checkpoint",
    "- `max_wal_size` (masalan 4–16 GB): checkpoint'lar kamroq va silliqroq bo'ladi. Log'da `checkpoints are occurring too frequently` bo'lsa, oshiring.",
    "- `checkpoint_completion_target = 0.9`: yozuvlarni checkpoint oralig'iga yoyadi.",
    "- `wal_compression = on` (yoki PG 15+ da `lz4`) WAL hajmini kamaytiradi.",
    "",
    "### Ulanishlar",
    "`max_connections` ni past (100–300) ushlab, PgBouncer ishlating (11.23). `idle_in_transaction_session_timeout` va `statement_timeout` (rol darajasida) qochib ketgan so'rovlardan himoya qiladi.",
    "",
    "### Monitoring ko'rsatkichlari",
    "- **Cache hit ratio** (> 99% OLTP uchun).",
    "- Dead tuple'lar va bloat, autovacuum chastotasi (11.19).",
    "- Lock kutishlar (`wait_event_type = 'Lock'`).",
    "- Checkpoint chastotasi, `temp_files` (work_mem yetmagan sort'lar).",
    "- Replication lag, ulanishlar soni, disk IOPS va kechikish.",
    "",
    "Vositalar: `postgres_exporter` + Prometheus/Grafana, pganalyze, pgBadger (log tahlili), PgHero.",
    "",
    "### Boshlang'ich nuqta",
    "PGTune (pgtune.leopard.in.ua) server hajmi va yuk turiga qarab dastlabki qiymatlarni beradi. Lekin har bir o'zgarishni bittadan va o'lchab kiriting."
  ],
  "examples": [
    {
      "title": "Sog'liq ko'rsatkichlari",
      "lang": "sql",
      "code": [
        "-- Cache hit ratio",
        "SELECT round(100.0 * sum(blks_hit) / nullif(sum(blks_hit) + sum(blks_read), 0), 2) AS hit_pct",
        "FROM pg_stat_database;",
        "",
        "-- Diskka tushgan sort/hash'lar",
        "SELECT datname, temp_files, pg_size_pretty(temp_bytes) FROM pg_stat_database;",
        "",
        "-- Checkpoint'lar (PG 17+ da pg_stat_checkpointer)",
        "SELECT checkpoints_timed, checkpoints_req FROM pg_stat_bgwriter;",
        "",
        "-- Ishlatilmayotgan indekslar",
        "SELECT relname, indexrelname, pg_size_pretty(pg_relation_size(indexrelid))",
        "FROM pg_stat_user_indexes WHERE idx_scan = 0 ORDER BY pg_relation_size(indexrelid) DESC;"
      ],
      "note": "`checkpoints_req` `checkpoints_timed` dan ko'p bo'lsa, `max_wal_size` kichik."
    },
    {
      "title": "16 GB RAM, 4 vCPU, SSD uchun namuna",
      "lang": "ini",
      "code": [
        "shared_buffers = 4GB",
        "effective_cache_size = 12GB",
        "work_mem = 16MB",
        "maintenance_work_mem = 1GB",
        "random_page_cost = 1.1",
        "effective_io_concurrency = 200",
        "max_wal_size = 8GB",
        "checkpoint_completion_target = 0.9",
        "max_connections = 200",
        "max_parallel_workers_per_gather = 2",
        "idle_in_transaction_session_timeout = '60s'"
      ]
    }
  ],
  "pitfalls": [
    "Sekin so'rovni topmasdan konfiguratsiyani o'zgartirish: indeks yo'qligi parametrlar bilan tuzalmaydi.",
    "Global `work_mem` ni 256 MB qilish: parallel yukda server OOM killer bilan yiqiladi.",
    "Bir vaqtda o'nta parametrni o'zgartirish: qaysi biri yordam bergani yoki zarar qilgani noma'lum qoladi.",
    "`shared_buffers` ni RAM'ning 70% iga ko'tarish: OS keshi va `work_mem` uchun joy qolmaydi, ma'lumot ikki marta keshlanadi."
  ]
});
