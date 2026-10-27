/* Chuqur dars: 10.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.19", {
  "lesson": [
    "### Backup turlari",
    "- **Logical:** SQL buyruqlar (`mysqldump`, MySQL Shell `util.dumpInstance`) — kichik/o'rta baza, ko'chirish oson, sekinroq tiklanadi.",
    "- **Physical:** fayllarni nusxalash (Percona XtraBackup, MySQL Enterprise Backup, snapshot) — katta baza, tez tiklanadi.",
    "- **Point-in-time recovery (PITR):** to'liq backup + **binlog** orqali istalgan lahzaga.",
    "",
    "### mysqldump",
    "```bash",
    "mysqldump --single-transaction --routines --triggers --events --set-gtid-purged=OFF -u backup -p mydb | gzip > mydb.sql.gz",
    "```",
    "`--single-transaction` (InnoDB uchun qulfsiz konsistent snapshot), `--quick`, `--source-data=2` (binlog pozitsiyasi; 8.0.26+, eskida `--master-data`).",
    "",
    "### Tiklash",
    "`gunzip < mydb.sql.gz | mysql -u root -p mydb`; PITR: `mysqlbinlog --start-datetime ... | mysql`.",
    "",
    "### Strategiya",
    "- **3-2-1 qoidasi:** 3 nusxa, 2 xil muhit, 1 ta tashqarida (offsite).",
    "- **RPO/RTO:** qancha ma'lumot yo'qotish mumkin / qancha vaqtda tiklash.",
    "- Muntazam (kunlik to'liq + binlog), **shifrlash**, saqlash muddati.",
    "- **Tiklashni sinash** (backup'ning haqiqiy qiymati) — muntazam restore test.",
    "- Replikada backup (asosiy serverga yuk bermaslik).",
    "- Cloud: RDS/Cloud SQL avtomatik snapshot + PITR.",
    "",
    "### Laravel",
    "`spatie/laravel-backup` (DB va fayl backup, S3, monitoring), `schedule` bilan.",
    "",
    "### Xavfsizlik",
    "Backup fayllarida maxfiy ma'lumot: shifrlang, ruxsatlarni cheklang, o'chirish tartibi."
  ],
  "examples": [
    {
      "title": "Backup va tiklash",
      "lang": "bash",
      "code": [
        "mysqldump --single-transaction --routines --triggers -u backup -p\"$PASS\" shop | gzip > shop-$(date +%F).sql.gz",
        "gunzip < shop-2025-06-01.sql.gz | mysql -u root -p shop_restore    # tiklashni sinash"
      ]
    }
  ],
  "pitfalls": [
    "Tiklash sinalmagan backup — ishlamasligi mumkin: muntazam restore test.",
    "`--single-transaction` siz InnoDB dump jadvallarni qulflashi mumkin (yoki nomuvofiq).",
    "Backup'ni shu serverning o'zida saqlash: server yo'qolsa hammasi yo'qoladi (offsite).",
    "Shifrlanmagan backup maxfiy ma'lumotni oshkor qilishi mumkin."
  ]
});
