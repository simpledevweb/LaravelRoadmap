/* Chuqur dars: 11.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.19", {
  "lesson": [
    "### VACUUM nima uchun kerak",
    "MVCC tufayli (11.10) `UPDATE` va `DELETE` eski tuple'larni o'chirmaydi. VACUUM:",
    "1. Hech bir tranzaksiya ko'rmaydigan **o'lik tuple'lar** joyini qayta foydalanishga belgilaydi (free space map).",
    "2. Indekslardan ularga ishoralarni tozalaydi.",
    "3. **Visibility map**ni yangilaydi. Bu Index Only Scan uchun shart: sahifa \"hamma uchun ko'rinadi\" deb belgilansa, heap o'qilmaydi.",
    "4. Eski tuple'larni **freeze** qiladi va XID wraparound'dan himoya qiladi.",
    "",
    "Oddiy `VACUUM` fayl hajmini kichraytirmaydi (faqat oxiridagi bo'sh sahifalarni qaytaradi). Bo'shatilgan joy yangi qatorlar uchun ishlatiladi. Jadval bilan parallel ishlaydi va yozishni bloklamaydi.",
    "",
    "### VACUUM FULL",
    "Jadvalni yangi faylga to'liq qayta yozadi va diskni OS'ga qaytaradi. Lekin `ACCESS EXCLUSIVE` lock oladi: jadval jarayon davomida o'qib ham bo'lmaydi. Vaqtincha ikki baravar disk kerak. Production'da o'rniga **`pg_repack`** kengaytmasini ishlating. U deyarli lock'siz qayta quradi.",
    "",
    "### Autovacuum",
    "Fon jarayoni jadvallarni kuzatadi va o'lik tuple'lar soni chegaradan oshganda VACUUM ishga tushiradi:",
    "`threshold = autovacuum_vacuum_threshold (50) + autovacuum_vacuum_scale_factor (0.2) × qatorlar soni`",
    "",
    "Muammo: 100 mln qatorli jadvalda autovacuum faqat 20 mln o'lik tuple'dan keyin ishlaydi. Bu juda kech. Katta va ko'p o'zgaradigan jadvallar uchun **jadval darajasida** sozlang: `scale_factor = 0.01..0.02` yoki aniq threshold. PG 13+ da faqat INSERT bo'ladigan jadvallar uchun ham chegaralar bor (`autovacuum_vacuum_insert_scale_factor`).",
    "",
    "Boshqa muhim sozlamalar:",
    "- `autovacuum_max_workers` (3): ko'p katta jadval bo'lsa, oshiring.",
    "- `autovacuum_vacuum_cost_limit`: autovacuum o'zini qanchalik cheklaydi. Zamonaviy SSD'da 1000–2000 ga ko'tarish mumkin.",
    "- `maintenance_work_mem`: indekslarni tozalash tezligi.",
    "",
    "### VACUUM'ni nima bloklaydi",
    "VACUUM eng eski kerakli snapshot'dan yangi tuple'larni o'chira olmaydi. Uni ushlab turuvchilar:",
    "- Uzoq ochiq tranzaksiyalar va `idle in transaction` ulanishlar.",
    "- Replikada `hot_standby_feedback = on` bilan uzoq so'rovlar.",
    "- Unutilgan yoki nofaol **replication slot**lar va tayyorlangan (prepared) tranzaksiyalar.",
    "",
    "### Monitoring",
    "`pg_stat_user_tables`: `n_dead_tup`, `last_autovacuum`, `autovacuum_count`. Ishlayotgan vacuum progressi `pg_stat_progress_vacuum` da. Wraparound uchun `age(datfrozenxid)`. 200 mln dan oshsa, majburiy anti-wraparound vacuum ishga tushadi. Laravel'dan bu ko'rsatkichlarni Prometheus yoki Grafana'ga eksport qiling."
  ],
  "examples": [
    {
      "title": "Diagnostika",
      "lang": "sql",
      "code": [
        "SELECT relname, n_live_tup, n_dead_tup,",
        "       round(100.0 * n_dead_tup / nullif(n_live_tup + n_dead_tup, 0), 1) AS dead_pct,",
        "       last_autovacuum, autovacuum_count",
        "FROM pg_stat_user_tables",
        "ORDER BY n_dead_tup DESC LIMIT 10;",
        "",
        "SELECT datname, age(datfrozenxid) FROM pg_database ORDER BY 2 DESC;",
        "",
        "SELECT slot_name, active, restart_lsn FROM pg_replication_slots WHERE NOT active;"
      ]
    },
    {
      "title": "Katta jadval uchun sozlash",
      "lang": "sql",
      "code": [
        "ALTER TABLE orders SET (",
        "  autovacuum_vacuum_scale_factor = 0.02,",
        "  autovacuum_analyze_scale_factor = 0.01,",
        "  autovacuum_vacuum_cost_limit = 2000",
        ");",
        "",
        "-- Katta tozalashdan keyin qo'lda",
        "VACUUM (VERBOSE, ANALYZE) orders;",
        "",
        "-- Diskni qaytarish kerak bo'lsa, VACUUM FULL o'rniga:",
        "-- pg_repack -d app -t orders"
      ]
    }
  ],
  "pitfalls": [
    "Autovacuum'ni \"yuk beryapti\" deb o'chirish: bloat o'sadi va oxirida wraparound himoyasi bazani to'xtatadi.",
    "Production'da `VACUUM FULL` ishga tushirish: jadval jarayon davomida to'liq bloklanadi.",
    "Nofaol replication slot'ni qoldirish: VACUUM to'xtaydi va WAL diskni to'ldiradi.",
    "Katta jadvallarda default `scale_factor = 0.2` bilan qolish: vacuum juda kam va juda og'ir ishlaydi."
  ]
});
