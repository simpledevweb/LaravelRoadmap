/* Chuqur dars: 10.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.1", {
  "lesson": [
    "### Qatlamlar",
    "MySQL arxitekturasi uch qatlamdan iborat:",
    "1. **Ulanish qatlami:** mijoz ulanishi, autentifikatsiya, har ulanishga alohida **thread** (thread-per-connection), xavfsizlik.",
    "2. **SQL qatlami:** parser (sintaksis), **optimizer** (reja tanlash), ijrochi, keshlar. Eski **Query Cache 8.0 da olib tashlangan**.",
    "3. **Saqlash dvigatellari (storage engines):** ma'lumotni diskda saqlash va o'qish; **pluggable** (almashtiriladi).",
    "",
    "### Dvigatellar",
    "- **InnoDB** — default, tranzaksiya, FK, row-level lock, MVCC, crash-safe. Deyarli doim shu.",
    "- **MyISAM** — tranzaksiyasiz, jadval qulfi (eskirgan).",
    "- **MEMORY** — xotirada (vaqtinchalik).",
    "- **ARCHIVE**, **CSV** — maxsus.",
    "Jadval dvigateli: `SHOW TABLE STATUS`, `CREATE TABLE ... ENGINE=InnoDB`.",
    "",
    "### So'rov yo'li",
    "Ulanish → parse → optimize (indekslar, join tartibi bo'yicha reja) → dvigatelga so'rov → natija.",
    "",
    "### Muhim komponentlar",
    "**Buffer pool** (InnoDB keshi), **binary log** (replikatsiya va tiklash), **redo/undo log**, **information_schema**, **performance_schema**, **sys** schema (diagnostika).",
    "",
    "### Versiyalar",
    "MySQL 8.0 (LTS-ga o'xshash uzoq qo'llab-quvvatlash), 8.4 LTS, MariaDB — fork (ba'zi farqlar). Versiyani tekshiring: `SELECT VERSION();`.",
    "",
    "### Laravel'da",
    "`config/database.php` → `mysql` ulanishi (`engine`, `charset`, `collation`, `strict`). Migratsiyalar default InnoDB."
  ],
  "examples": [
    {
      "title": "Diagnostika buyruqlari",
      "lang": "sql",
      "code": [
        "SELECT VERSION();",
        "SHOW ENGINES;",
        "SHOW TABLE STATUS WHERE Name = 'orders'\\G",
        "SHOW VARIABLES LIKE 'innodb_buffer_pool_size';",
        "SHOW GLOBAL STATUS LIKE 'Threads_connected';"
      ]
    }
  ],
  "pitfalls": [
    "MyISAM jadvallari tranzaksiya va crash-safety bermaydi: InnoDB ishlating.",
    "Query Cache 8.0 da yo'q: eski maslahatlarga tayanmang.",
    "MySQL va MariaDB funksiyalari farq qiladi (JSON, optimizer): hujjatni versiya bo'yicha o'qing.",
    "Har ulanish thread: ulanishlar soni cheksiz o'sishi xotirani to'ldiradi."
  ]
});
