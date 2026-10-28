/* Chuqur dars: 53.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.2", {
  "lesson": [
    "### Response time tahlili",
    "So'rovning **to'liq vaqtini** qismlarga ajratib, qayerda ketayotganini ko'rish.",
    "",
    "### TTFB va tarkibi",
    "**TTFB (Time To First Byte)** = tarmoq + veb-server + PHP (bootstrapping + kod) + DB + tashqi chaqiruvlar. Foydalanuvchi sezadigan umumiy vaqt = TTFB + yuklab olish + brauzer render (LCP).",
    "",
    "### Qismlarga ajratish",
    "- **Veb-server/proxy:** Nginx `$request_time`, `$upstream_response_time` (log format).",
    "- **PHP-FPM:** slowlog, `request_slowlog_timeout`.",
    "- **Ilova:** APM (Datadog/Sentry/NR) transaction trace: controller, DB, HTTP, kesh, view.",
    "- **DB:** so'rovlar jami vaqti.",
    "- **Tashqi API/Redis.**",
    "- **Server-Timing header:** `Server-Timing: db;dur=45, app;dur=120` (DevTools'da ko'rinadi).",
    "",
    "### Nimaga e'tibor",
    "- **Percentile'lar** (p95/p99), o'rtacha emas (53.20).",
    "- **Endpoint bo'yicha** (eng sekin va eng ko'p chaqiriladigan).",
    "- Vaqt bo'yicha trend (deploydan keyin sakrash).",
    "- Xato bilan bog'liq (timeout).",
    "",
    "### Odatiy sabablar",
    "N+1/sekin so'rovlar (eng ko'p), tashqi API'ga sinxron chaqiruv, katta natija/serializatsiya, bootstrapping (config/route kesh yo'q), PHP-FPM worker yetishmasligi (navbat), og'ir view.",
    "",
    "### Nginx log",
    "`log_format timed '$remote_addr \"$request\" $status $request_time $upstream_response_time';` — `request_time − upstream_response_time` = mijoz tarmog'i.",
    "",
    "### Maqsadlar",
    "SLO: masalan p95 < 300 ms API; Core Web Vitals (LCP < 2.5 s).",
    "",
    "### Laravel",
    "Middleware'da `Server-Timing`; Telescope/Pulse (sekin so'rovlar), `Log` bilan vaqt."
  ],
  "examples": [
    {
      "title": "Server-Timing va Nginx log",
      "lang": "php",
      "code": [
        "// middleware",
        "$start = microtime(true);",
        "$response = $next($request);",
        "$response->headers->set('Server-Timing', sprintf('app;dur=%.1f', (microtime(true) - $start) * 1000));",
        "return $response;",
        "// nginx: log_format timed '$request $status rt=$request_time urt=$upstream_response_time';"
      ]
    }
  ],
  "pitfalls": [
    "O'rtacha vaqtga qarash uzun dum (p99) muammolarini yashiradi.",
    "TTFB'ni qismlarga ajratmay (APM/Server-Timing) optimizatsiya noto'g'ri yo'nalishda bo'ladi.",
    "Faqat sekin endpoint'ga emas, eng ko'p chaqiriladiganiga ham qarang (jami vaqt).",
    "PHP-FPM navbatini (worker yetishmasligi) ilova sekinligi deb adashtirish."
  ]
});
