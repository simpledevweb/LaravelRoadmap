/* Chuqur dars: 16.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.18", {
  "lesson": [
    "### Optimizatsiya — gipoteza",
    "\"Bu indeks so'rovni tezlashtiradi\" — taxmin. Uni faqat o'lchov tasdiqlaydi. O'lchovsiz o'zgarishlar kodni murakkablashtiradi, ba'zan sekinlashtiradi va haqiqiy tor joy tegilmay qoladi.",
    "",
    "### Jarayon",
    "1. **Bazaviy o'lchov:** o'zgarishdan oldin raqamlarni yozing.",
    "   - Endpoint darajasida: p50, p95, p99 javob vaqti, so'rovlar soni.",
    "   - So'rov darajasida: `EXPLAIN ANALYZE` vaqti, o'qilgan qatorlar va bufferlar.",
    "   - Resurslar: DB CPU, I/O, xotira.",
    "2. **Bitta o'zgarish:** bir vaqtda faqat bitta narsani o'zgartiring. Aks holda qaysi biri ta'sir qilgani noma'lum.",
    "3. **Bir xil sharoitda qayta o'lchash:** bir xil ma'lumot hajmi, kesh holati va yuk.",
    "4. **Hujjatlashtirish:** PR tavsifida \"oldin/keyin\" raqamlari va `EXPLAIN` parchalari.",
    "5. **Production'da tasdiqlash:** deploy'dan keyin APM yoki monitoring dashboard'ida p95 haqiqatan tushdimi?",
    "",
    "### Nimani o'lchash kerak",
    "- **O'rtacha emas, percentil.** O'rtacha 100 ms bo'lishi mumkin, p99 esa 3 sekund. Foydalanuvchilar dumni his qiladi.",
    "- **So'rovlar soni.** 60 dan 6 ga tushish ko'pincha har bir so'rovni tezlashtirishdan muhimroq.",
    "- **Buffers / o'qilgan qatorlar.** Vaqtdan barqarorroq: keshga va server yukiga kamroq bog'liq.",
    "",
    "### Tuzoqlar",
    "- **Kesh isishi:** birinchi ishga tushirish sekin (disk), keyingilari tez (xotira). Bir nechta o'lchov, birinchisini tashlab yuboring yoki ikkala holatni alohida yozing.",
    "- **Kichik dev ma'lumot:** 1000 qatorda hamma narsa tez. Production hajmiga yaqin ma'lumot bilan (anonimlashtirilgan dump yoki factory bilan generatsiya) o'lchang.",
    "- **Bir martalik o'lchov:** shovqin katta. Kamida 5–10 marta yoki benchmark vositasi.",
    "- **Yon ta'sirlar:** yangi indeks o'qishni tezlashtiradi, lekin yozishni sekinlashtiradi va disk egallaydi. Keshlash xotira oladi. Ularni ham o'lchang.",
    "- **Parallel yuk:** bitta so'rov tez, lekin 100 parallel so'rovda lock yoki ulanishlar tor joy. Yuk testi: k6, Gatling, `ab`, `wrk`, DB uchun `pgbench` yoki `sysbench`.",
    "",
    "### Vositalar",
    "- Laravel: Debugbar, Telescope, `DB::listen`, `Benchmark::measure()` (Laravel 9.32+).",
    "- DB: `EXPLAIN ANALYZE`, `pg_stat_statements`, MySQL `performance_schema` va slow log.",
    "- Production: Sentry Performance, New Relic, Datadog, Grafana + Prometheus.",
    "",
    "### Natijani yozib qo'yish",
    "Raqamlar keyingi jamoa a'zosiga nima uchun bu indeks yoki murakkab so'rov borligini tushuntiradi va regressiyani aniqlashga yordam beradi."
  ],
  "examples": [
    {
      "title": "Benchmark bilan solishtirish",
      "lang": "php",
      "code": [
        "use Illuminate\\Support\\Benchmark;",
        "",
        "Benchmark::dd([",
        "    'whereHas' => fn () => Customer::whereHas('orders', fn ($q) => $q->where('total', '>', 1_000_000))->count(),",
        "    'whereIn'  => fn () => Customer::whereIn('id', Order::select('customer_id')->where('total', '>', 1_000_000))->count(),",
        "], iterations: 10);",
        "",
        "// array:2 [",
        "//   \"whereHas\" => \"184.21ms\"",
        "//   \"whereIn\" => \"23.67ms\"",
        "// ]"
      ],
      "note": "Natija ma'lumot taqsimotiga bog'liq. Production'ga yaqin hajmdagi bazada o'lchang."
    },
    {
      "title": "PR tavsifi namunasi",
      "lang": "text",
      "code": [
        "## /admin/orders sahifasini tezlashtirish",
        "",
        "O'zgarishlar:",
        "- items va customer uchun eager loading",
        "- (status, created_at DESC) composite indeks",
        "",
        "O'lchov (staging, 2.1 mln buyurtma, 10 ta o'lchov):",
        "| Ko'rsatkich | Oldin | Keyin |",
        "|---|---|---|",
        "| p95 javob   | 1840 ms | 210 ms |",
        "| So'rovlar   | 63      | 6      |",
        "| Asosiy so'rov buffers | 12 500 | 24 |",
        "",
        "Yon ta'sir: orders INSERT p95 1.9 ms -> 2.1 ms (qabul qilinadi)."
      ]
    }
  ],
  "pitfalls": [
    "O'rtacha vaqtga qarab, p95/p99 dumni ko'rmaslik.",
    "Bir vaqtda bir nechta o'zgarish kiritib, qaysi biri yordam berganini bilmaslik.",
    "Dev bazasida 1000 qatorda o'lchab, production uchun xulosa qilish.",
    "Indeksning yozish tezligiga ta'sirini o'lchamaslik."
  ]
});
