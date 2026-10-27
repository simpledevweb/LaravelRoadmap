/* Chuqur dars: 15.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.13", {
  "lesson": [
    "### Bazaning yuklamasini tahlil qilish",
    "Baza qanchalik band ekanini va **resurs qayerda** tiqilayotganini aniqlash: CPU, xotira, disk I/O, ulanishlar, qulflar.",
    "",
    "### Asosiy ko'rsatkichlar",
    "- **QPS/TPS** (so'rov/tranzaksiya soni), **latency** (p50/p95/p99).",
    "- **CPU, RAM, disk IOPS/latency, tarmoq.**",
    "- **Ulanishlar:** `Threads_connected`, `Threads_running`, `Max_used_connections`.",
    "- **InnoDB:** buffer pool hit ratio (`Innodb_buffer_pool_reads` vs `read_requests`), redo log, dirty pages.",
    "- **Sekin so'rovlar** soni, `Select_full_join`, `Created_tmp_disk_tables`, `Handler_read_rnd_next`.",
    "- **Qulflar/deadlock'lar.**",
    "- **Replika lag.**",
    "- Disk joyi.",
    "",
    "### Top so'rovlar",
    "Jami vaqt bo'yicha: `sys.statement_analysis`, `pt-query-digest`, `pg_stat_statements`; kim/qaysi ilova yuk beryapti (user, host).",
    "",
    "### Yuklama turini aniqlash",
    "O'qish yoki yozish dominant? CPU-bound (hisob/indeks yo'q) yoki I/O-bound (buffer pool kichik/disk)? Pik vaqtlar (cron, hisobot, reklama).",
    "",
    "### Vositalar",
    "**Percona PMM**, Prometheus + `mysqld_exporter` + Grafana, Datadog, New Relic, CloudWatch (RDS), `SHOW GLOBAL STATUS`, `SHOW PROCESSLIST`, `htop`, `iostat`.",
    "",
    "### Xulosadan harakat",
    "- CPU yuqori + full scan → indeks/so'rov.",
    "- I/O yuqori → buffer pool, indeks, qattiq disk.",
    "- Ulanish ko'p → pool.",
    "- O'qish ko'p → replika/kesh.",
    "- Yozish ko'p → batch, indeks kamaytirish, sharding.",
    "",
    "### Baseline",
    "Normal holatni biling: o'zgarish va anomaliyani ko'rish uchun."
  ],
  "examples": [
    {
      "title": "Tezkor tekshiruv",
      "lang": "sql",
      "code": [
        "SHOW GLOBAL STATUS WHERE Variable_name IN ('Threads_connected','Threads_running','Questions','Slow_queries','Created_tmp_disk_tables');",
        "SELECT * FROM sys.statement_analysis ORDER BY total_latency DESC LIMIT 10;",
        "SELECT (1 - Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests) * 100 AS hit_pct",
        "FROM (SELECT VARIABLE_VALUE+0 AS Innodb_buffer_pool_reads FROM performance_schema.global_status WHERE VARIABLE_NAME='Innodb_buffer_pool_reads') a,",
        "     (SELECT VARIABLE_VALUE+0 AS Innodb_buffer_pool_read_requests FROM performance_schema.global_status WHERE VARIABLE_NAME='Innodb_buffer_pool_read_requests') b;"
      ]
    }
  ],
  "pitfalls": [
    "Baseline'siz (normal holatni bilmay) anomaliyani aniqlab bo'lmaydi.",
    "Faqat o'rtacha latency'ga qarash p99 muammolarini yashiradi.",
    "Resurs turini (CPU/I/O) aniqlamay sozlash noto'g'ri yo'nalish beradi.",
    "Pik vaqtlarni (cron, hisobot) hisobga olmaslik."
  ]
});
