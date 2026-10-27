/* Chuqur dars: 6.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.13", {
  "lesson": [
    "### Technical Debt",
    "**Texnik qarz** — hozir tez yetkazish uchun tanlangan ideal bo'lmagan yechim, u keyinchalik **\"foiz\"** bilan to'lanadi (har o'zgarish qimmatroq bo'ladi) va qaytarilishi kerak (W. Cunningham metaforasi).",
    "",
    "### Turlari",
    "- **Ongli, mas'uliyatli:** \"Hozir chiqaramiz, keyin tuzatamiz\" (rejalashtirilgan).",
    "- **Ongli, mas'uliyatsiz:** \"Dizaynga vaqt yo'q.\"",
    "- **Tasodifiy:** keyinroq bilib olingan yaxshiroq yo'l (\"endi tushundik\").",
    "- **Bit rot:** vaqt o'tishi bilan eskirgan bog'liqliklar, versiyalar.",
    "",
    "### Qarz manbalari",
    "Tezkor deadline, testlarning yo'qligi, hujjatsiz kod, eskirgan kutubxona (EOL PHP), nusxa-ko'chirish, bilimlar yo'qolishi (xodim ketdi).",
    "",
    "### Oqibatlari",
    "Sekin yangi funksiya, ko'p bug, qiyin onboarding, xodimlarning charchashi, xavfsizlik zaifliklari.",
    "",
    "### Boshqarish",
    "1. **Ko'rinadigan qiling:** qarz ro'yxati (backlog, `TODO(ticket)`), tavsif va narx.",
    "2. **Ustuvorlang:** tez-tez o'zgaradigan va xavfli joy.",
    "3. **Muntazam to'lash:** har sprintda vaqt ajrating (15–20%) yoki Boy Scout qoidasi.",
    "4. **Yangi qarzni oldini oling:** Definition of Done'da test, review, statik tahlil.",
    "5. **Avtomatlashtirish:** PHPStan, CI, Dependabot/Renovate, Rector.",
    "6. **Biznesga tushuntiring:** \"qarz — kelajakdagi tezlik yo'qotish\" xavf va pul tilida.",
    "",
    "### Qarz olish mantiqiy bo'lganda",
    "Bozorga chiqish muhim va keyin to'lash rejasi bor bo'lsa. Rejasiz qarz — \"bankrotlik\"."
  ],
  "examples": [
    {
      "title": "Ticket bilan belgilash",
      "lang": "php",
      "code": [
        "// TODO(PAY-412): to'lov provayderi 429 qaytarsa retry yo'q; 2025-Q3 gacha qo'shish",
        "// DEBT: eski API versiyasi (v1) 2025-12-31 da o'chadi",
        "$response = $this->client->post('/v1/charge', $payload);"
      ]
    }
  ],
  "pitfalls": [
    "Qarzni ro'yxatsiz va narxsiz qoldirish uni ko'rinmas qiladi va to'planib ketadi.",
    "Hamma qarzni birdan to'lashga urinish ishlamaydi: ustuvorlang.",
    "Biznesga 'kod xunuk' deb emas, tezlik va xavf tilida tushuntiring.",
    "EOL versiya (PHP, framework) — katta yashirin qarz: yangilash rejasini tuzing."
  ]
});
