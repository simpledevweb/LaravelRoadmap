/* Chuqur dars: 11.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.1", {
  "lesson": [
    "### PostgreSQL qanday tuzilgan",
    "PostgreSQL **process-per-connection** modelida ishlaydi. Server ishga tushganda bosh jarayon (`postmaster`) ulanishlarni kutadi. Har bir yangi mijoz ulanishi uchun alohida **backend process** fork qilinadi. Bu jarayon shu ulanishning barcha so'rovlarini bajaradi va ulanish yopilganda tugaydi.",
    "",
    "Oqibati: ulanish ochish qimmat (fork, autentifikatsiya, katalog keshini to'ldirish) va har bir ulanish bir necha MB xotira egallaydi. Shu sababli yuzlab PHP-FPM worker'li Laravel ilovalarida **connection pooling** (PgBouncer, 11.23) deyarli majburiy.",
    "",
    "### Umumiy xotira",
    "- **shared_buffers:** jadval va indeks sahifalarining (8 KB) umumiy keshi. Barcha backend'lar shu keshdan o'qiydi. Odatda RAM'ning ~25%.",
    "- **WAL buffers:** WAL yozuvlari diskka tushishidan oldingi bufer.",
    "- **work_mem:** umumiy emas. Har bir sort/hash operatsiyasi uchun alohida ajratiladi.",
    "",
    "PostgreSQL OS page cache'ga ham tayanadi. Shuning uchun `shared_buffers` ni RAM'ning 80% iga ko'tarish foyda bermaydi.",
    "",
    "### Fon jarayonlari",
    "- **checkpointer:** vaqti-vaqti bilan iflos sahifalarni diskka yozadi va WAL'da tiklash nuqtasini belgilaydi.",
    "- **background writer:** backend'lar o'zi yozishga majbur bo'lmasligi uchun sahifalarni oldindan yozadi.",
    "- **WAL writer:** WAL buferini diskka flush qiladi.",
    "- **autovacuum launcher/worker'lar:** o'lik tuple'larni tozalaydi va statistika yig'adi (11.19).",
    "- **WAL sender/receiver:** replikatsiya (11.21).",
    "",
    "### WAL (Write-Ahead Log)",
    "Asosiy qoida: ma'lumot sahifasi diskka yozilishidan **oldin** uning o'zgarishi WAL'ga yozilgan bo'lishi kerak. `COMMIT` paytida faqat WAL ketma-ket yoziladi va fsync qilinadi. Bu tez, chunki jadval fayllariga tasodifiy yozuvlar keyinroq checkpoint'da bajariladi.",
    "",
    "Server qulasa, oxirgi checkpoint'dan boshlab WAL qayta o'ynaladi (crash recovery). Xuddi shu WAL replikatsiya va PITR (11.22) uchun ham asos.",
    "",
    "### Heap va indekslar",
    "Jadval ma'lumoti **heap** faylida tartibsiz saqlanadi. MySQL InnoDB'dagi kabi PK bo'yicha clustered emas. Har bir qatorning manzili **TID** (sahifa raqami, sahifadagi o'rni). Barcha indekslar, jumladan PK, heap'dagi TID'ga ishora qiladi.",
    "",
    "### Laravel uchun ahamiyati",
    "Bu arxitektura bir nechta amaliy qarorni tushuntiradi: nima uchun `pgsql` ulanishlarini pool qilish kerak, nima uchun uzoq tranzaksiyalar zararli (VACUUM'ni bloklaydi), nima uchun `UPDATE` ko'p jadvallar shishadi (MVCC, 11.10)."
  ],
  "examples": [
    {
      "title": "Faol ulanishlar va jarayonlar",
      "lang": "sql",
      "code": [
        "SELECT pid, usename, application_name, state,",
        "       now() - xact_start AS xact_age, left(query, 60) AS query",
        "FROM pg_stat_activity",
        "WHERE backend_type = 'client backend'",
        "ORDER BY xact_age DESC NULLS LAST;"
      ],
      "note": "Har bir qator alohida OS jarayoni. `xact_age` katta bo'lsa, uzoq ochiq tranzaksiyani qidiring."
    },
    {
      "title": "Asosiy sozlamalarni ko'rish",
      "lang": "sql",
      "code": [
        "SHOW shared_buffers;",
        "SHOW max_connections;",
        "SELECT backend_type, count(*) FROM pg_stat_activity GROUP BY 1;"
      ]
    }
  ],
  "pitfalls": [
    "`max_connections` ni 1000+ ga ko'tarib pooling o'rnini bosmoqchi bo'lish: har ulanish jarayon va xotira, server tez bo'g'iladi.",
    "Heap'ni InnoDB kabi PK bo'yicha tartiblangan deb o'ylash: PostgreSQL'da PK diapazoni bo'yicha o'qish qo'shni sahifalarda bo'lishi kafolatlanmagan.",
    "`work_mem` ni umumiy xotira deb hisoblash: u har operatsiya uchun alohida, bir so'rovda bir necha marta ajratilishi mumkin.",
    "`fsync = off` yoki `synchronous_commit = off` ni oqibatini bilmasdan yoqish: crash'da ma'lumot yo'qolishi yoki buzilishi mumkin."
  ]
});
