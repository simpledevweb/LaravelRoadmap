/* Chuqur dars: 15.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.18", {
  "lesson": [
    "### Benchmarking",
    "O'zgarish (indeks, sozlama, so'rov, apparat) **foydasini** yoki tizim **imkoniyatini** o'lchash. Taxmin emas — raqam.",
    "",
    "### Vositalar",
    "- **sysbench** (OLTP yuklama), **mysqlslap**, **pgbench**.",
    "- **HTTP darajasida:** k6, wrk, ab, Locust, JMeter, Gatling (butun ilova).",
    "- **Laravel:** `Benchmark::measure()`, `Benchmark::dd()` (kod qismi).",
    "- Ilova profilerlar (Blackfire).",
    "",
    "### To'g'ri benchmark qoidalari",
    "1. **Realistik ma'lumot:** production hajmi va taqsimoti (kichik ma'lumotda reja boshqacha).",
    "2. **Realistik yuklama:** haqiqiy so'rovlar aralashmasi (o'qish/yozish nisbati, parallellik).",
    "3. **Isitish (warm-up):** kesh to'lishini kuting; sovuq va issiq kesh natijalarini alohida o'lchang.",
    "4. **Bir o'zgarish — bir o'lchov** (baseline bilan solishtirish).",
    "5. **Takrorlang** (bir necha marta), o'rtacha va **p95/p99** (o'rtacha aldaydi).",
    "6. **Izolyatsiya:** boshqa yuklamasiz, alohida muhit (production emas).",
    "7. **Resurslarni kuzating:** CPU, I/O, xotira (tiqilish qayerda).",
    "8. Natijani **hujjatlang** (versiya, konfiguratsiya, ma'lumot hajmi).",
    "",
    "### Metrikalar",
    "**Throughput** (QPS/TPS), **latency** (p50/p95/p99), xatolar, resurs sarfi.",
    "",
    "### Xatolar",
    "- Kichik/sintetik ma'lumot.",
    "- Kesh effekti (ikkinchi ishga tushirish tez).",
    "- Bitta so'rovni takrorlash (real aralashma emas).",
    "- Mijoz tomoni tiqilinchi (benchmark vositasi o'zi sekin).",
    "- Bir marta o'lchash.",
    "",
    "### Misol",
    "`sysbench oltp_read_write --tables=10 --table-size=1000000 --threads=32 --time=120 run`."
  ],
  "examples": [
    {
      "title": "sysbench va Laravel Benchmark",
      "lang": "bash",
      "code": [
        "sysbench oltp_read_write --mysql-db=bench --tables=10 --table-size=1000000 prepare",
        "sysbench oltp_read_write --mysql-db=bench --tables=10 --table-size=1000000 --threads=32 --time=120 run",
        "# Laravel kodi: Benchmark::dd(['A' => fn () => User::count(), 'B' => fn () => User::query()->toBase()->count()], 50);"
      ]
    }
  ],
  "pitfalls": [
    "Kichik/sintetik ma'lumotda o'lchash production'dagi reja va tezlikni aks ettirmaydi.",
    "Sovuq va issiq kesh natijalarini aralashtirish aldaydi.",
    "O'rtacha qiymatga qarash p95/p99 muammolarini yashiradi.",
    "Production'da benchmark qilish yuklama va xavf beradi: alohida muhit."
  ]
});
