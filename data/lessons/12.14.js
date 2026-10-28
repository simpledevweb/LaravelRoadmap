/* Chuqur dars: 12.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.14", {
  "lesson": [
    "### Persistence",
    "Redis xotirada ishlaydi; **diskka saqlash** restart/crash'dan keyin ma'lumotni tiklaydi.",
    "",
    "### RDB (snapshot)",
    "Davriy **nusxa** (`dump.rdb`): `save 900 1`, `save 300 10`, `save 60 10000` (vaqt/o'zgarish soni) yoki `BGSAVE`. Fork qilib fon'da yozadi.",
    "- ✓ Ixcham, tez tiklanadi, backup uchun qulay.",
    "- ✗ Oxirgi snapshotdan keyingi ma'lumot yo'qoladi (daqiqalar).",
    "- Fork vaqtida katta xotirada **latency sakrashi**, copy-on-write xotira o'sishi.",
    "",
    "### AOF (Append Only File)",
    "Har **yozish buyrug'i** logga yoziladi, tiklashda qayta bajariladi: `appendonly yes`.",
    "- `appendfsync always` (har buyruq: sekin, eng xavfsiz), `everysec` (**default tavsiya**: ≤1 s yo'qotish), `no` (OS'ga).",
    "- ✓ Kam ma'lumot yo'qotish.",
    "- ✗ Fayl katta, sekinroq tiklanadi; **AOF rewrite** (`BGREWRITEAOF`) ixchamlaydi. Redis 7: multi-part AOF.",
    "",
    "### RDB + AOF",
    "Ikkalasi: AOF tiklash uchun (to'liqroq), RDB backup uchun.",
    "",
    "### Tanlov",
    "- **Kesh:** persistence shart emas (yo'qolsa qayta to'ladi) — o'chirib (tezroq, fork yo'q).",
    "- **Sessiya/navbat/hisoblagich:** AOF `everysec`.",
    "- **Asosiy ma'lumot ombori:** AOF + replikatsiya + backup.",
    "",
    "### Backup",
    "`dump.rdb` nusxalash (BGSAVE'dan keyin), AOF nusxa, offsite; tiklashni sinash.",
    "",
    "### Ehtiyot",
    "Disk joyi, fork xotirasi (maxmemory'ga zaxira: ~2×), I/O sekin disk. Persistence ≠ backup."
  ],
  "examples": [
    {
      "title": "redis.conf",
      "lang": "ini",
      "code": [
        "appendonly yes",
        "appendfsync everysec",
        "save 900 1",
        "save 300 10",
        "dir /var/lib/redis",
        "# faqat kesh bo'lsa:  save \"\"   va   appendonly no"
      ]
    }
  ],
  "pitfalls": [
    "Persistence backup o'rnini bosmaydi: nusxa va offsite saqlang.",
    "Fork paytida xotira ~2× o'sishi mumkin: `maxmemory`ga zaxira qoldiring.",
    "Kesh uchun persistence keraksiz yuk beradi (fork/I-O).",
    "`appendfsync always` juda sekin: odatda `everysec`."
  ]
});
