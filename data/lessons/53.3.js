/* Chuqur dars: 53.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.3", {
  "lesson": [
    "### Throughput",
    "Vaqt birligida **bajarilgan ish miqdori**: RPS (requests per second), QPS, TPS, job/s. Latency (har so'rov vaqti) bilan birga tizim imkoniyatini belgilaydi.",
    "",
    "### Latency bilan bog'liqligi",
    "Taxminan (Little qonuni): `parallellik = throughput × latency`. Masalan, 100 RPS × 0.2 s = 20 bir vaqtdagi so'rov. PHP-FPM uchun: **worker soni ≈ RPS × o'rtacha javob vaqti**. 50 worker, 0.2 s → ~250 RPS chegarasi.",
    "",
    "### Chegara (saturation)",
    "Throughput ma'lum nuqtagacha o'sadi, keyin **tiqilinch** (CPU, worker, DB ulanish, qulf): latency keskin o'sadi, xatolar. Yuk testi (53.17) bu nuqtani topadi.",
    "",
    "### O'lchash",
    "- Nginx/APM RPS, xatolar, **p95 latency**.",
    "- `pm.status_path`: `active processes`, `listen queue`, `max children reached`.",
    "- DB QPS, ulanishlar.",
    "- Queue: job/s, kutish vaqti.",
    "",
    "### Oshirish yo'llari",
    "1. **Har so'rovni tezlashtirish** (kod, DB, kesh) → ko'proq RPS bir xil worker'da.",
    "2. **Worker/server qo'shish** (gorizontal masshtab), PHP-FPM sozlash (53.5).",
    "3. **Octane** (53.21): bootstrapping'siz.",
    "4. **Keshlash/CDN** (so'rovni ilovaga yetkazmaslik).",
    "5. **Asinxron** (queue): og'ir ishni so'rovdan chiqarish (53.11).",
    "6. **DB masshtabi:** replika, indeks.",
    "",
    "### Tuzoq",
    "Throughput'ni oshirish latency'ni tashlab qo'ysa (to'liq yuklangan tizim) foydalanuvchi uchun yomon: ikkalasini birga kuzating.",
    "",
    "### Hisob misoli",
    "`pm.max_children=40`, o'rtacha 150 ms → ~266 RPS nazariy maksimal (DB/CPU tiqilmasa)."
  ],
  "examples": [
    {
      "title": "Little qonuni hisobi",
      "lang": "text",
      "code": [
        "O'rtacha javob vaqti = 0.15 s",
        "Maqsad = 400 RPS",
        "Kerakli parallellik = 400 x 0.15 = 60 worker",
        "pm.max_children = 60  (har worker ~60 MB -> ~3.6 GB RAM)"
      ]
    }
  ],
  "pitfalls": [
    "Throughput'ni oshirib latency'ni (p95) e'tiborsiz qoldirish foydalanuvchi sekinligiga olib keladi.",
    "Worker sonini RAM hisobsiz oshirish swap/OOM beradi.",
    "Tiqilinch nuqtasini bilmay (yuk testisiz) masshtablash noto'g'ri joyga resurs sarflaydi.",
    "DB ulanish yoki qulf chegarasi worker'lar sonidan oldin tiqilishi mumkin."
  ]
});
