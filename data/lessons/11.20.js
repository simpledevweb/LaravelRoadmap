/* Chuqur dars: 11.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.20", {
  "lesson": [
    "### ANALYZE nima qiladi",
    "`ANALYZE` jadvaldan tasodifiy namuna oladi (default `300 × default_statistics_target` = 30 000 qator) va har ustun uchun statistikani `pg_statistic` katalogiga yozadi. Planner (11.9) faqat shu statistikaga qarab nechta qator qaytishini taxmin qiladi. Jadvalni skan qilmaydi.",
    "",
    "### Qanday statistika yig'iladi",
    "`pg_stats` view'da ko'rinadi:",
    "- `null_frac`: NULL ulushi.",
    "- `n_distinct`: noyob qiymatlar soni. Manfiy bo'lsa, qatorlar soniga nisbat (`-1` = hammasi noyob).",
    "- `most_common_vals` / `most_common_freqs` (MCV): eng ko'p uchraydigan qiymatlar va chastotasi.",
    "- `histogram_bounds`: qolgan qiymatlar uchun teng bo'laklarga bo'lingan chegaralar. Diapazon sharti uchun.",
    "- `correlation`: qiymat tartibi va fizik joylashuv o'xshashligi (-1..1). Index Scan xarajatiga ta'sir qiladi.",
    "",
    "Jadval darajasida `pg_class.reltuples` va `relpages` saqlanadi.",
    "",
    "### Qachon ishga tushadi",
    "**Autovacuum** avtomatik `ANALYZE` qiladi: `autovacuum_analyze_threshold (50) + autovacuum_analyze_scale_factor (0.1) × qatorlar` o'zgargandan keyin. Lekin u kechikishi mumkin. Qo'lda bajarish kerak bo'lgan holatlar:",
    "1. Katta import yoki `COPY` dan keyin.",
    "2. Bulk `DELETE`/`UPDATE` taqsimotni keskin o'zgartirganda.",
    "3. Yangi jadval to'ldirilib, darhol og'ir so'rovlar ishlatilganda.",
    "4. Yangi expression indeks yaratilgandan keyin (uning ifodasi bo'yicha statistika).",
    "5. `pg_upgrade` dan keyin: statistika ko'chirilmaydi! `vacuumdb --analyze-in-stages` ishlating.",
    "",
    "### Aniqlikni oshirish",
    "`default_statistics_target` (100) MCV ro'yxati va histogramma bo'laklari sonini belgilaydi. Notekis taqsimlangan ustunlarda (masalan, 1% mijoz buyurtmalarning 50% ini beradi) aniqlik yetmasligi mumkin:",
    "`ALTER TABLE orders ALTER COLUMN customer_id SET STATISTICS 1000;` va keyin `ANALYZE`. Kattaroq target namunani va rejalashtirish vaqtini oshiradi. Faqat muammoli ustunlarga qo'llang.",
    "",
    "Ustunlar o'rtasidagi bog'liqlik uchun extended statistics: `CREATE STATISTICS` (11.9).",
    "",
    "### Belgilar",
    "`EXPLAIN ANALYZE` da `rows=` taxmini va `actual rows=` o'rtasida 10x va undan katta farq bo'lsa, statistikani tekshiring. `pg_stat_user_tables.last_analyze` va `last_autoanalyze` qachon yig'ilganini, `n_mod_since_analyze` esa oxirgi analyze'dan keyin nechta qator o'zgarganini ko'rsatadi.",
    "",
    "### Laravel'da",
    "Katta import (seeder, `LazyCollection` bilan CSV yuklash) oxirida `DB::statement('ANALYZE table')` qo'shing. Testlarda katta fixture yuklangandan keyin ham shu tavsiya etiladi."
  ],
  "examples": [
    {
      "title": "Statistikani ko'rish va aniqlashtirish",
      "lang": "sql",
      "code": [
        "SELECT attname, null_frac, n_distinct,",
        "       most_common_vals, most_common_freqs, correlation",
        "FROM pg_stats",
        "WHERE tablename = 'orders' AND attname IN ('status', 'customer_id');",
        "",
        "SELECT relname, last_analyze, last_autoanalyze, n_mod_since_analyze",
        "FROM pg_stat_user_tables WHERE relname = 'orders';",
        "",
        "ALTER TABLE orders ALTER COLUMN customer_id SET STATISTICS 1000;",
        "ANALYZE VERBOSE orders;"
      ]
    },
    {
      "title": "Importdan keyin ANALYZE",
      "lang": "php",
      "code": [
        "LazyCollection::make(fn () => yield from $reader->rows())",
        "    ->chunk(1000)",
        "    ->each(fn ($rows) => DB::table('products')->insert($rows->all()));",
        "",
        "DB::statement('ANALYZE products');"
      ],
      "note": "ANALYZE'siz import tugashi bilan kelgan so'rovlar planner'ning bo'sh jadval haqidagi eski taxminidan foydalanadi."
    }
  ],
  "pitfalls": [
    "Major versiya `pg_upgrade` dan keyin ANALYZE qilmaslik: barcha so'rovlar statistikasiz rejalashtiriladi va sayt sekinlashadi.",
    "`default_statistics_target` ni global 10000 ga ko'tarish: ANALYZE va rejalashtirish hamma joyda sekinlashadi.",
    "ANALYZE'ni VACUUM bilan adashtirish: ANALYZE o'lik tuple'larni tozalamaydi, faqat statistika yig'adi.",
    "Vaqtinchalik (temporary) jadvallar autovacuum tomonidan analyze qilinmasligini unutish: ularni qo'lda `ANALYZE` qiling."
  ]
});
