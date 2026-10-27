/* Chuqur dars: 15.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.16", {
  "lesson": [
    "### Replikalar",
    "Ma'lumotning **nusxasi** bo'lgan qo'shimcha serverlar (10.16). Vazifalari:",
    "- **O'qishni masshtablash** (read replicas, 15.15).",
    "- **Hisobot/analitika** (asosiy serverga yuk bermaslik).",
    "- **Backup** (replikada).",
    "- **Failover** (primary ishdan chiqsa replikani ko'tarish).",
    "- Geografik yaqinlik (region replikalari).",
    "",
    "### Turlari",
    "- **Asinxron:** primary kutmaydi (tez, lag va yo'qotish xavfi).",
    "- **Semi-sync:** kamida bitta replika tasdiqlaydi.",
    "- **Sinxron/Group Replication/Galera:** kuchli izchillik, sekinroq.",
    "- **Delayed replica:** ataylab kechiktirilgan (tasodifiy `DROP`dan tiklash).",
    "",
    "### Monitoring",
    "`Seconds_Behind_Source` (MySQL), `pg_stat_replication`/`replay_lag` (PG), replikatsiya xatolari, binlog pozitsiyasi/GTID. Lag alert'i.",
    "",
    "### Muammolar",
    "- **Lag:** katta tranzaksiya, yozish yuklamasi, sekin replika, bitta SQL thread (parallel replication: `replica_parallel_workers`).",
    "- **Xatolar:** replikada boshqa yozuv (drift).",
    "- **Failover:** to'g'ri replikani tanlash (eng yangi), split-brain.",
    "- Ko'p replika = primary'ga binlog yuki.",
    "",
    "### Amaliyot",
    "- `read_only=ON`.",
    "- Replika quvvati primary'ga yaqin.",
    "- Replika xotirasi/indekslari bir xil.",
    "- Failover rejasini sinang (Orchestrator, MHA, cloud managed).",
    "- Hisobotni alohida replikada.",
    "",
    "### Laravel",
    "`read`/`write` konfiguratsiya, `sticky`, replikaga yo'naltirish, queue/hisobot uchun alohida connection.",
    "",
    "### Cloud",
    "RDS Read Replicas, Aurora (shared storage), Cloud SQL replikalari."
  ],
  "examples": [
    {
      "title": "Replika holati",
      "lang": "sql",
      "code": [
        "SHOW REPLICA STATUS\\G          -- Seconds_Behind_Source, Replica_IO_Running, Replica_SQL_Running",
        "SHOW VARIABLES LIKE 'read_only';",
        "-- PostgreSQL: SELECT client_addr, state, replay_lag FROM pg_stat_replication;"
      ]
    }
  ],
  "pitfalls": [
    "Replika lag'ini kuzatmaslik eski ma'lumot va hisobotlarda xatoga olib keladi.",
    "Replikaga yozish (drift): `read_only`/`super_read_only`.",
    "Failover rejasi sinalmagan bo'lsa muhim lahzada ishlamasligi mumkin.",
    "Bitta SQL thread katta yuklamada lag beradi: parallel replication."
  ]
});
