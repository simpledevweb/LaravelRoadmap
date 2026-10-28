/* Chuqur dars: 53.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.18", {
  "lesson": [
    "### Bottleneck (tiqilinch) aniqlash",
    "Tizim tezligini **chegaralovchi eng sekin qism**. Uni tuzatmay boshqa joyni optimallash foyda bermaydi (Amdahl qonuni).",
    "",
    "### Usul: USE",
    "Har resurs uchun: **U**tilization (band foiz), **S**aturation (navbat/kutish), **E**rrors. Va **RED** (servis): Rate, Errors, Duration.",
    "",
    "### Qadamlar",
    "1. **Simptom:** qaysi endpoint/jarayon sekin (APM, p95).",
    "2. **Qatlamni toping:** brauzer → tarmoq → Nginx → PHP-FPM → ilova kodi → DB → tashqi API/Redis → disk.",
    "3. **Resurslarni o'lchang:** CPU, RAM/swap, disk I/O, tarmoq, ulanishlar, worker navbati.",
    "4. **Profil:** kod (Blackfire), so'rovlar (slow log, EXPLAIN).",
    "5. **Gipoteza → bitta o'zgarish → qayta o'lchash.**",
    "",
    "### Odatiy tiqilinchlar",
    "- **DB:** N+1, indeks yo'q, qulflar, ulanishlar.",
    "- **PHP-FPM:** worker yetmaydi (`listen queue`).",
    "- **CPU:** og'ir hisob, serializatsiya.",
    "- **I/O:** disk (log, sessiya fayl), tarmoq.",
    "- **Tashqi API:** sinxron sekin chaqiruv.",
    "- **Xotira:** swap.",
    "- **Qulf/parallellik:** issiq qator, `session` fayl qulfi (parallel so'rovlar bir-birini kutadi).",
    "",
    "### Belgilar",
    "CPU past, javob sekin → kutish (I/O, qulf, tashqi); CPU yuqori → hisob; FPM `max children reached`; DB `Threads_running` yuqori; navbat o'sishi.",
    "",
    "### Vositalar",
    "APM, Blackfire, `htop`, `iostat`, `vmstat`, `ss`, Nginx/FPM status, DB `sys`/`pg_stat`, flamegraph.",
    "",
    "### Tuzatgandan keyin",
    "Tiqilinch ko'chadi (keyingi eng sekin qism): qayta o'lchang; maqsad SLO'ga yetish.",
    "",
    "### Qoida",
    "O'lchamay taxmin qilmang; eng katta hissani toping."
  ],
  "examples": [
    {
      "title": "Tezkor diagnostika",
      "lang": "bash",
      "code": [
        "htop; vmstat 1 5; iostat -x 1 3",
        "curl -s http://127.0.0.1/fpm-status?full | head -30",
        "mysql -e \"SHOW GLOBAL STATUS LIKE 'Threads_running'\""
      ]
    }
  ],
  "pitfalls": [
    "Tiqilinchni topmay boshqa qismni optimallash foyda bermaydi.",
    "CPU past, javob sekin bo'lsa muammo kutish (I/O, qulf, tashqi API): CPU profili foydasiz.",
    "Fayl sessiya qulfi parallel so'rovlarni ketma-ket qiladi: Redis sessiya.",
    "Tuzatishdan keyin tiqilinch ko'chadi: qayta o'lchamasangiz yangisini sezmaysiz."
  ]
});
