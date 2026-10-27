/* Chuqur dars: 15.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.19", {
  "lesson": [
    "### Monitoring metrikalari",
    "Bazani **doimiy kuzatish**: muammoni foydalanuvchi sezmasdan oldin topish, trendlarni ko'rish, reja uchun ma'lumot.",
    "",
    "### Asosiy metrikalar",
    "- **Yuklama:** QPS, TPS, `Threads_running`.",
    "- **Latency:** so'rov vaqti p50/p95/p99, sekin so'rovlar soni.",
    "- **Ulanishlar:** `Threads_connected` / `max_connections`, `Aborted_connects`.",
    "- **Resurslar:** CPU, RAM, disk IOPS/latency, disk joyi, tarmoq.",
    "- **InnoDB:** buffer pool hit ratio/foydalanish, redo log, dirty pages, `history list length`, row lock waits.",
    "- **Qulflar:** deadlock soni, lock wait timeout, metadata lock.",
    "- **Replikatsiya:** lag, replika holati, xatolar.",
    "- **So'rov sifati:** `Select_full_join`, `Created_tmp_disk_tables`, `Handler_read_rnd_next` (full scan belgisi).",
    "- **Zaxira:** backup muvaffaqiyati/yoshi.",
    "- **Xatolar:** error log, 1040 (too many connections).",
    "",
    "### Vositalar",
    "**Prometheus + mysqld_exporter/postgres_exporter + Grafana**, **Percona PMM**, Datadog, New Relic, Zabbix, CloudWatch/RDS Performance Insights, Sentry (ilova), Laravel Telescope/Pulse.",
    "",
    "### Alertlar",
    "Aniq va harakatga yaroqli: replica lag > 30 s, ulanishlar > 80%, disk > 85%, deadlock'lar o'sishi, p95 > chegara, backup yo'q. Shovqinli alert — e'tiborsiz qoladi.",
    "",
    "### Dashboard",
    "Umumiy salomatlik (RED/USE usullari): Rate, Errors, Duration; Utilization, Saturation, Errors.",
    "",
    "### Amaliyot",
    "Baseline va trend; capacity planning (disk, ulanish o'sishi); incident'dan keyin metrikalar tahlili; so'rov darajasidagi ko'rinish (pt-query-digest/PMM QAN).",
    "",
    "### Laravel",
    "**Pulse** (sekin so'rovlar, so'rov hajmi), Telescope (dev), `DB::listen` metrikalarga."
  ],
  "examples": [
    {
      "title": "Prometheus alert",
      "lang": "yaml",
      "code": [
        "groups:",
        "- name: mysql",
        "  rules:",
        "  - alert: MySQLReplicaLag",
        "    expr: mysql_slave_status_seconds_behind_master > 30",
        "    for: 2m",
        "    labels: { severity: warning }",
        "  - alert: MySQLConnectionsHigh",
        "    expr: mysql_global_status_threads_connected / mysql_global_variables_max_connections > 0.8",
        "    for: 5m"
      ]
    }
  ],
  "pitfalls": [
    "Shovqinli alertlar e'tiborsiz qolishiga olib keladi: harakatga yaroqli chegaralar.",
    "Baseline va trendsiz metrika qiymati ma'nosiz.",
    "Faqat DB metrikasiga qarash ilova darajasidagi sekinlikni o'tkazib yuboradi.",
    "Backup monitoringi bo'lmasa ishlamayotgan backup bilinmaydi."
  ]
});
