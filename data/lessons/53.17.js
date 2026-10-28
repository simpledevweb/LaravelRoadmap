/* Chuqur dars: 53.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.17", {
  "lesson": [
    "### Yuk testi (load testing)",
    "Tizimga **sun'iy yuk** berib, qancha so'rovga bardosh berishi va **tiqilinch**ni aniqlash.",
    "",
    "### Test turlari",
    "- **Load test:** kutilgan yuk (normal/pik) — SLO bajariladimi.",
    "- **Stress test:** chegaradan oshirib: qayerda sinadi, qanday tiklanadi.",
    "- **Spike test:** keskin sakrash (reklama, flash sale).",
    "- **Soak (endurance):** uzoq muddat (soatlar): xotira sizishi, ulanish.",
    "- **Breakpoint:** yuk o'sib borib sinish nuqtasi.",
    "",
    "### Vositalar",
    "**k6** (JS skript, CI uchun qulay, threshold), **Locust** (Python), **JMeter**, **Gatling**, **wrk/wrk2**, **ab** (oddiy), **Artillery**, Laravel **Dusk** (brauzer emas).",
    "",
    "### k6 misoli",
    "```js",
    "import http from 'k6/http'; import { check, sleep } from 'k6';",
    "export const options = { stages: [{ duration: '2m', target: 100 }, { duration: '5m', target: 100 }, { duration: '1m', target: 0 }],",
    "  thresholds: { http_req_duration: ['p(95)<300'], http_req_failed: ['rate<0.01'] } };",
    "export default function () { const r = http.get('https://staging.uz/api/posts'); check(r, { '200': (x) => x.status === 200 }); sleep(1); }",
    "```",
    "",
    "### To'g'ri test qoidalari",
    "1. **Production'ga o'xshash muhit** (staging, hajm, ma'lumot, konfiguratsiya). Production'da emas.",
    "2. **Realistik stsenariylar** (foydalanuvchi yo'li, aralash o'qish/yozish, autentifikatsiya), cache/CDN holati.",
    "3. **Ma'lumot:** realistik hajm (million qator).",
    "4. **Isitish.**",
    "5. **Resurslarni kuzating** (CPU, RAM, DB, FPM queue) — tiqilinch qayerda.",
    "6. **Generator tiqilmasin** (yuk beruvchi mashina yetarli).",
    "7. **Metrikalar:** RPS, p50/p95/p99, xatolar.",
    "8. Natijani **hujjatlang**, takrorlang.",
    "",
    "### Xavf",
    "Uchinchi tomon API'ni (to'lov) test qilmang (mock); email yuborilmasin."
  ],
  "examples": [
    {
      "title": "k6",
      "lang": "bash",
      "code": [
        "k6 run --vus 100 --duration 3m script.js",
        "k6 run --out json=result.json script.js"
      ]
    }
  ],
  "pitfalls": [
    "Production'da yuk testi haqiqiy foydalanuvchilarga zarar beradi: staging.",
    "Realistik bo'lmagan stsenariy va kichik ma'lumotda natija aldaydi.",
    "Yuk generatorining o'zi tiqilib qolsa natija noto'g'ri bo'ladi.",
    "Uchinchi tomon xizmatlarini (to'lov/email) test paytida mock qilmaslik."
  ]
});
