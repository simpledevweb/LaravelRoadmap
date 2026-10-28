/* Chuqur dars: 11.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.21", {
  "lesson": [
    "### Nega replikatsiya",
    "Replikatsiyaning uch maqsadi bor: **yuqori mavjudlik** (primary yiqilsa, standby'ga o'tish), **o'qishni kengaytirish** (hisobotlar va og'ir SELECT'lar replikada) va **migratsiya yoki upgrade** (yangi serverga minimal to'xtash bilan o'tish). Replikatsiya backup emas: xato `DELETE` ham darhol replikaga ko'chadi.",
    "",
    "### Streaming (fizik) replikatsiya",
    "Standby primary'dan **WAL oqimini** oladi va qayta o'ynaydi. Natija — baytma-bayt bir xil nusxa: barcha database'lar, bir xil major versiya va arxitektura. `hot_standby = on` bo'lsa, standby faqat o'qish so'rovlariga xizmat qiladi.",
    "",
    "**Asinxron (default):** primary commit'ni standby'ni kutmasdan tasdiqlaydi. Tez, lekin failover paytida oxirgi bir necha soniya tranzaksiyalari yo'qolishi mumkin (RPO > 0).",
    "",
    "**Sinxron:** `synchronous_standby_names` va `synchronous_commit` (`on`, `remote_write`, `remote_apply`). Commit standby tasdiqlagandan keyin qaytadi. Ma'lumot yo'qolmaydi, lekin har commit tarmoq kechikishini oladi. Standby ishlamasa, yozish to'xtaydi. Shuning uchun odatda kamida 2 ta standby bilan `ANY 1 (s1, s2)`.",
    "",
    "### Replication lag va oqibatlari",
    "Asinxron replika bir oz orqada qoladi. Foydalanuvchi yozib, darhol replikadan o'qisa, o'z o'zgarishini ko'rmaydi. Laravel'da `'sticky' => true` sozlamasi bir so'rov ichida yozuvdan keyingi o'qishlarni primary'ga yo'naltiradi. Lag'ni `pg_stat_replication.replay_lag` (primary'da) yoki `now() - pg_last_xact_replay_timestamp()` (standby'da) bilan kuzating.",
    "",
    "Replikadagi uzoq so'rov WAL o'ynalishiga to'qnashishi mumkin: `canceling statement due to conflict with recovery`. `hot_standby_feedback = on` buni kamaytiradi, lekin primary'da bloat oshadi.",
    "",
    "### Logical replikatsiya",
    "`CREATE PUBLICATION` (manba) va `CREATE SUBSCRIPTION` (qabul qiluvchi). O'zgarishlar SQL qator darajasida uzatiladi. Afzalliklari: tanlangan jadvallar, **turli major versiyalar** o'rtasida (minimal to'xtash bilan upgrade), qabul qiluvchi yozish uchun ochiq. Cheklovlar: DDL replika qilinmaydi (sxemani alohida qo'llash kerak), sequence qiymatlari ko'chmaydi, har jadvalda PK yoki replica identity kerak.",
    "",
    "### Replication slot'lar",
    "Slot primary'ga standby hali qabul qilmagan WAL'ni saqlab turishni aytadi. Uzilgan standby qaytib kelganda davom eta oladi. Xavf: standby butunlay o'chib ketsa, WAL cheksiz yig'iladi va disk to'ladi. PG 13+ da `max_slot_wal_keep_size` chegara qo'yadi.",
    "",
    "### Failover",
    "PostgreSQL o'zi avtomatik failover qilmaydi. Patroni (etcd yoki Consul bilan), repmgr yoki boshqariladigan servislar (RDS Multi-AZ) primary'ni kuzatadi, standby'ni ko'taradi (`pg_promote()`) va split-brain'dan himoya qiladi. Ilova virtual IP, DNS yoki HAProxy orqali ulanadi."
  ],
  "examples": [
    {
      "title": "Replikatsiya holatini kuzatish",
      "lang": "sql",
      "code": [
        "-- Primary'da",
        "SELECT client_addr, state, sync_state,",
        "       write_lag, flush_lag, replay_lag",
        "FROM pg_stat_replication;",
        "",
        "SELECT slot_name, active,",
        "       pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) AS retained_wal",
        "FROM pg_replication_slots;",
        "",
        "-- Standby'da",
        "SELECT pg_is_in_recovery(), now() - pg_last_xact_replay_timestamp() AS lag;"
      ]
    },
    {
      "title": "Laravel: read/write ajratish",
      "lang": "php",
      "code": [
        "// config/database.php",
        "'pgsql' => [",
        "    'driver' => 'pgsql',",
        "    'read' => ['host' => [env('DB_READ_HOST_1'), env('DB_READ_HOST_2')]],",
        "    'write' => ['host' => [env('DB_WRITE_HOST')]],",
        "    'sticky' => true,",
        "    'database' => env('DB_DATABASE'),",
        "    // ...",
        "],",
        "",
        "// Muhim o'qishni majburan primary'dan",
        "$order = Order::useWritePdo()->findOrFail($id);"
      ],
      "note": "`sticky` faqat joriy so'rov (request) ichida ishlaydi. Keyingi HTTP so'rov yana replikadan o'qishi mumkin."
    }
  ],
  "pitfalls": [
    "Replikatsiyani backup deb hisoblash: noto'g'ri `DROP TABLE` bir soniyada barcha standby'larga tarqaladi.",
    "Yozishdan keyin darhol replikadan o'qish: foydalanuvchi o'z o'zgarishini ko'rmaydi. `sticky` yoki `useWritePdo()` ishlating.",
    "Bitta sinxron standby bilan ishlash: u o'chsa, primary'ga yozish to'xtaydi.",
    "Nofaol replication slot'ni monitoring qilmaslik: WAL diskni to'ldirib, primary'ni to'xtatadi."
  ]
});
