/* Chuqur dars: 10.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.2", {
  "lesson": [
    "### InnoDB nima",
    "MySQL'ning default saqlash dvigateli: **ACID tranzaksiyalar**, **row-level locking**, **MVCC**, **foreign key**, **crash recovery**.",
    "",
    "### Asosiy mexanizmlar",
    "- **Clustered index:** jadval ma'lumoti **primary key** bo'yicha tartiblangan B-tree'da saqlanadi. PK bo'lmasa — yashirin ID.",
    "- **Buffer pool:** sahifalar (16 KB) xotirada keshlanadi: `innodb_buffer_pool_size`.",
    "- **Redo log (WAL):** o'zgarish avval logga yoziladi (tezkor, ketma-ket), keyin sahifalar diskka: crash'dan keyin qayta tiklash.",
    "- **Undo log:** o'zgarishdan oldingi holat (rollback va MVCC uchun).",
    "- **Doublewrite buffer:** yarim yozilgan sahifalardan himoya.",
    "- **Change buffer:** secondary index o'zgarishlarini kechiktirib yozadi.",
    "",
    "### Xavfsizlik va tezlik sozlamasi",
    "`innodb_flush_log_at_trx_commit=1` (default: har commit'da diskka, to'liq ACID), `2` yoki `0` — tezroq, lekin ma'lumot yo'qotish xavfi. `innodb_flush_method=O_DIRECT`.",
    "",
    "### Sahifa va qator",
    "Ma'lumot 16 KB sahifalarda; qator hajmi katta bo'lsa (BLOB/TEXT) off-page saqlanadi. Qator formati `DYNAMIC`.",
    "",
    "### PK muhimligi",
    "Qisqa, o'smaydigan emas — **o'suvchi (monotonic)** PK yaxshi (auto-increment/UUIDv7); tasodifiy UUIDv4 sahifalarni bo'lib (fragmentation) yozishni sekinlashtiradi. Secondary indexlar PK'ni ham saqlaydi: uzun PK barcha indekslarni kattalashtiradi.",
    "",
    "### Diagnostika",
    "`SHOW ENGINE INNODB STATUS\\G`, `information_schema.INNODB_TRX`, `INNODB_LOCKS`/`performance_schema.data_locks`."
  ],
  "examples": [
    {
      "title": "InnoDB holati",
      "lang": "sql",
      "code": [
        "SHOW VARIABLES LIKE 'innodb_buffer_pool_size';",
        "SHOW VARIABLES LIKE 'innodb_flush_log_at_trx_commit';",
        "SHOW ENGINE INNODB STATUS\\G",
        "SELECT * FROM information_schema.INNODB_TRX\\G"
      ]
    }
  ],
  "pitfalls": [
    "`innodb_flush_log_at_trx_commit` ni 2/0 qilish tezlashtiradi, lekin crash'da ma'lumot yo'qotishi mumkin.",
    "Tasodifiy UUIDv4 PK sahifa bo'linishi (fragmentation) va sekin yozish beradi.",
    "Uzun PK barcha secondary indexlarni kattalashtiradi.",
    "Buffer pool kichik bo'lsa disk I/O ko'payadi: ishchi ma'lumotga mos o'lchang."
  ]
});
