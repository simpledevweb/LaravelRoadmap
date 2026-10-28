/* Chuqur dars: 11.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.10", {
  "lesson": [
    "### MVCC g'oyasi",
    "**Multi-Version Concurrency Control**: o'quvchilar yozuvchilarni, yozuvchilar o'quvchilarni bloklamaydi. Har bir tranzaksiya ma'lumotning o'ziga mos **snapshot**ini ko'radi. Buning uchun PostgreSQL qatorning bir nechta versiyasini (tuple) bir vaqtda saqlaydi.",
    "",
    "### Qanday ishlaydi",
    "Har bir tuple sarlavhasida:",
    "- `xmin`: tuple'ni yaratgan tranzaksiya ID'si.",
    "- `xmax`: uni o'chirgan yoki yangilagan tranzaksiya ID'si (0 bo'lsa, tirik).",
    "",
    "Operatsiyalar:",
    "- `INSERT`: yangi tuple, `xmin = joriy XID`.",
    "- `DELETE`: tuple o'chirilmaydi, faqat `xmax` belgilanadi.",
    "- `UPDATE` = `DELETE` + `INSERT`: eski tuple'ga `xmax`, yangi versiya boshqa joyga yoziladi.",
    "",
    "Snapshot qaysi XID'lar commit bo'lganini biladi. Tuple ko'rinadi, agar `xmin` commit bo'lgan va snapshot'dan oldin bo'lsa, `xmax` esa yo'q yoki hali ko'rinmaydigan bo'lsa.",
    "",
    "### Oqibat: o'lik tuple'lar va bloat",
    "Hech bir tranzaksiya ko'rmaydigan eski versiyalar **dead tuple** bo'ladi. Ular joy egallaydi. Jadval va indekslar shishadi (bloat) va Seq Scan ko'proq sahifa o'qiydi. Ularni **VACUUM** tozalaydi (11.19). VACUUM faqat **eng eski ochiq snapshot**dan oldingi versiyalarni o'chira oladi. Shuning uchun bir soatlik ochiq tranzaksiya (yoki `idle in transaction` ulanish) butun bazada tozalashni to'xtatadi.",
    "",
    "### HOT update",
    "**Heap-Only Tuple**: agar `UPDATE` hech qaysi indekslangan ustunni o'zgartirmasa va yangi versiya **shu sahifaga sig'sa**, indekslar yangilanmaydi. Bu yozishni ancha arzonlashtiradi. Ko'p yangilanadigan jadvallarda `fillfactor = 80..90` sahifada bo'sh joy qoldiradi va HOT ulushini oshiradi. Keraksiz indeks HOT'ni buzadi: `updated_at` ga indeks qo'ysangiz, har update indekslarni yangilaydi.",
    "",
    "### Transaction ID wraparound",
    "XID 32 bitli (~4 mlrd), aylanma hisoblanadi. Eski tuple'lar VACUUM tomonidan \"muzlatilmasa\" (freeze), ular kelajakdagi tranzaksiya kabi ko'rinib qolishi mumkin. Buni oldini olish uchun PostgreSQL ogohlantiradi. Oxirida yangi XID berishni to'xtatadi va baza faqat o'qish rejimiga o'tadi. `age(datfrozenxid)` ni monitoring qiling.",
    "",
    "### Laravel uchun xulosa",
    "Queue worker yoki uzun artisan buyrug'ini katta `DB::transaction` ichida ushlab turmang. Counter'larni (`views`) har so'rovda `UPDATE` qilish dead tuple ko'paytiradi. Redis'da yig'ib, partiya bilan yozing."
  ],
  "examples": [
    {
      "title": "Versiyalarni ko'rish",
      "lang": "sql",
      "code": [
        "CREATE TABLE t (id int PRIMARY KEY, v text);",
        "INSERT INTO t VALUES (1, 'a');",
        "SELECT xmin, xmax, ctid, * FROM t;   -- ctid=(0,1)",
        "UPDATE t SET v = 'b' WHERE id = 1;",
        "SELECT xmin, xmax, ctid, * FROM t;   -- ctid=(0,2): yangi tuple",
        "",
        "SELECT relname, n_live_tup, n_dead_tup, n_tup_hot_upd, n_tup_upd",
        "FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;"
      ],
      "note": "`n_tup_hot_upd / n_tup_upd` HOT update ulushini ko'rsatadi."
    },
    {
      "title": "VACUUM'ni bloklayotgan tranzaksiyalar",
      "lang": "sql",
      "code": [
        "SELECT pid, state, now() - xact_start AS age, left(query, 60)",
        "FROM pg_stat_activity",
        "WHERE xact_start IS NOT NULL",
        "ORDER BY xact_start LIMIT 5;",
        "",
        "ALTER DATABASE app SET idle_in_transaction_session_timeout = '60s';",
        "ALTER TABLE counters SET (fillfactor = 85);"
      ]
    }
  ],
  "pitfalls": [
    "`UPDATE` ni joyida o'zgartirish deb o'ylash: har update yangi tuple yozadi va ko'p update'li jadval shishadi.",
    "`idle in transaction` ulanishlarni e'tiborsiz qoldirish: VACUUM eski versiyalarni tozalay olmaydi.",
    "Tez-tez o'zgaradigan ustunga (`last_seen_at`) indeks qo'yish: HOT update imkonsiz bo'ladi.",
    "Wraparound ogohlantirishlarini (`must be vacuumed within N transactions`) e'tiborsiz qoldirish: baza yozishni to'xtatadi."
  ]
});
