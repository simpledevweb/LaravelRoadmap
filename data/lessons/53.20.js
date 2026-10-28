/* Chuqur dars: 53.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.20", {
  "lesson": [
    "### Latency percentile'lari",
    "Javob vaqtlarini **tartiblab**, ma'lum foizdagi qiymatni ko'rish:",
    "- **p50 (median):** so'rovlarning 50% shundan tez (odatiy holat).",
    "- **p95:** 95% shundan tez (5% sekinroq).",
    "- **p99:** 99% shundan tez (1% sekinroq): \"uzun dum\" (tail).",
    "- **p99.9**, max.",
    "",
    "### Nega o'rtacha yetarli emas",
    "O'rtacha bir necha juda sekin so'rovni **yashiradi**: 99 so'rov 100 ms, 1 ta 10 s → o'rtacha ~200 ms (\"yaxshi\"), lekin 1% foydalanuvchi 10 s kutdi. Foydalanuvchi tajribasi **uzun dum**ga bog'liq (ayniqsa ko'p so'rovli sahifada: bitta sekin so'rov butun sahifani sekin qiladi).",
    "",
    "### Tail latency sabablari",
    "GC/xotira, qulf kutish, sovuq kesh/stampede, sekin DB so'rovi (indeks yo'q ba'zi parametrlarda), tashqi API sekinligi, FPM navbati, tarmoq, noisy neighbor, retry.",
    "",
    "### O'lchash",
    "- **Histogramma**/percentile APM'dan (Datadog, NR, Prometheus `histogram_quantile`).",
    "- `wrk2`/`k6` natijasida p95/p99.",
    "- **O'rtacha percentile'lar emas** (p95'larning o'rtachasi noto'g'ri); histogramma bilan agregatsiya.",
    "",
    "### SLO",
    "\"API so'rovlarining 99% i 500 ms dan tez\" (p99 < 500 ms) + xato <0.1%. Error budget.",
    "",
    "### Yaxshilash",
    "Eng sekin 1% so'rovlarni toping (trace, slow log): odatda alohida parametr/foydalanuvchi/endpoint; timeout va retry (jitter), hedging, kesh, indeks.",
    "",
    "### Coordinated omission",
    "Yuk testida sekin javob keyingi so'rovlarni kechiktirsa, latency kam ko'rinadi (`wrk2`/k6 arrival-rate executor to'g'rilaydi).",
    "",
    "### Ko'rsatish",
    "p50/p95/p99 birga grafikda; deploy chiziqlari."
  ],
  "examples": [
    {
      "title": "PromQL percentile",
      "lang": "text",
      "code": [
        "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{route=\"/api/posts\"}[5m])) by (le))",
        "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket{route=\"/api/posts\"}[5m])) by (le))"
      ]
    }
  ],
  "pitfalls": [
    "O'rtacha vaqt uzun dumni (p99) yashiradi.",
    "Percentile'larning o'rtachasi noto'g'ri: histogramma bilan agregatsiya qiling.",
    "Coordinated omission yuk testida latency'ni kam ko'rsatadi.",
    "Bitta sekin so'rov ko'p so'rovli sahifani to'liq sekinlashtiradi."
  ]
});
