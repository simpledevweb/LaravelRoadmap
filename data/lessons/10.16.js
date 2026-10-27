/* Chuqur dars: 10.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.16", {
  "lesson": [
    "### Replikatsiya",
    "Ma'lumotni **source** (asosiy, eski nomi master) serverdan **replica** (nusxa, eski slave) serverlarga nusxalash. Maqsadlar: **o'qishni masshtablash**, **zaxira/failover**, hisobotlarni ajratish, backup.",
    "",
    "### Qanday ishlaydi",
    "1. Source barcha o'zgarishlarni **binary log**ga (binlog) yozadi.",
    "2. Replica **I/O thread** binlog'ni oladi → **relay log**.",
    "3. Replica **SQL thread** relay log'ni qo'llaydi.",
    "Binlog formatlari: **ROW** (tavsiya, qator o'zgarishi), STATEMENT, MIXED.",
    "",
    "### Turlari",
    "- **Asinxron (default):** source javobni kutmaydi → **replica lag** (kechikish) bo'lishi mumkin.",
    "- **Semi-sync:** kamida bitta replica olganini kutadi.",
    "- **Group Replication / InnoDB Cluster:** ko'p-source, avtomatik failover.",
    "",
    "### GTID",
    "Global Transaction ID: har tranzaksiya noyob ID'ga ega; failover va replikatsiyani sozlashni soddalashtiradi (`gtid_mode=ON`).",
    "",
    "### Terminologiya (8.0.22+)",
    "`CHANGE REPLICATION SOURCE TO ...`, `START REPLICA`, `SHOW REPLICA STATUS` (`Seconds_Behind_Source`).",
    "",
    "### Laravel'da read/write ajratish",
    "```php",
    "'mysql' => ['read' => ['host' => ['10.0.0.2', '10.0.0.3']], 'write' => ['host' => ['10.0.0.1']], 'sticky' => true, ...]",
    "```",
    "`sticky`: yozgandan keyin shu so'rovda o'qish ham yozish serveridan (lag muammosi oldi).",
    "",
    "### Muammolar",
    "- **Replica lag:** yozgandan keyin o'qiganda eski ma'lumot.",
    "- Failover'da ma'lumot yo'qotish (asinxron).",
    "- Replikada yozish (`read_only=ON`, `super_read_only`).",
    "- Katta tranzaksiya lag'ni oshiradi.",
    "",
    "### Backup/hisobot",
    "Og'ir hisobot va backup'ni replikada bajaring."
  ],
  "examples": [
    {
      "title": "Laravel read/write",
      "lang": "php",
      "code": [
        "// config/database.php",
        "'mysql' => [",
        "    'driver' => 'mysql',",
        "    'read'   => ['host' => [env('DB_READ_1', '10.0.0.2'), env('DB_READ_2', '10.0.0.3')]],",
        "    'write'  => ['host' => [env('DB_HOST', '10.0.0.1')]],",
        "    'sticky' => true,",
        "    'database' => env('DB_DATABASE'), 'username' => env('DB_USERNAME'), 'password' => env('DB_PASSWORD'),",
        "],"
      ]
    }
  ],
  "pitfalls": [
    "Replica lag: yozgandan keyin darrov o'qish eski ma'lumot beradi (`sticky` yoki asosiy serverdan o'qing).",
    "Asinxron replikatsiyada failover ma'lumot yo'qotishi mumkin.",
    "Replikaga yozish: `read_only`/`super_read_only` yoqing.",
    "Katta bir tranzaksiya (million qator) replikani kechiktiradi: bo'laklarga bo'ling."
  ]
});
