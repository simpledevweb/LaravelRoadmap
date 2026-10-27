/* Chuqur dars: 6.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.16", {
  "lesson": [
    "### Muvozanat masalasi",
    "Toza kod ko'pincha kichik funksiya, abstraksiya va obyektlarni ko'paytiradi; bu **bir oz** ish vaqtini oshirishi mumkin. Lekin ko'p hollarda bu farq sezilmaydi. Asosiy qoida: **avval to'g'ri va o'qiladigan yozing, keyin o'lchang, keyin optimallang**.",
    "",
    "### Donald Knuth",
    "\"Erta optimizatsiya — barcha yomonlikning ildizi\": taxmin bilan murakkablashtirmang, profil asosida qaror qiling.",
    "",
    "### Real darmoqlar",
    "Veb-ilovada sekinlik odatda **I/O** da: N+1 so'rovlar, indeks yo'qligi, kesh yo'qligi, katta natijalar, tarmoq chaqiruvlari; funksiya chaqiruvi yoki kichik klasslar emas. Birinchi navbatda DB va kesh.",
    "",
    "### O'lchash",
    "Xdebug/Blackfire/Tideways profil, `microtime`/`hrtime`, Laravel Telescope/Debugbar (so'rovlar soni), `EXPLAIN`, APM (Sentry/Datadog). Maqsad: haqiqiy hotspot.",
    "",
    "### Qachon performance ustuvor",
    "Issiq yo'l (hot path: har so'rovda ko'p marta chaqiriladigan kod), katta ma'lumot hajmi, real-time talablar, CPU-bound hisob. Bu yerda toza, lekin tezroq usul tanlanadi va **sababi izohlanadi**.",
    "",
    "### Texnikalar",
    "- Generator/stream/chunk bilan xotira tejash.",
    "- `isset` + lug'at `in_array` o'rniga.",
    "- Keshlash (natijani saqlash), eager loading.",
    "- Tsikl ichida DB/HTTP chaqiruvlarsiz.",
    "- OPcache/JIT (infrastruktura).",
    "",
    "### Qoida",
    "Tezlik uchun o'qilishni buzsangiz — buni o'lchov bilan asoslang, izoh yozing va testlar bilan himoyalang."
  ],
  "examples": [
    {
      "title": "Avval o'lchash",
      "lang": "php",
      "code": [
        "$t = hrtime(true);",
        "$result = $service->heavy();",
        "$ms = (hrtime(true) - $t) / 1e6;",
        "logger()->info('heavy', ['ms' => round($ms, 1)]);",
        "",
        "// N+1 ni tuzatish: kod tuzilishi emas, so'rovlar soni muhim",
        "$posts = Post::with('author')->get();   // 1+1 so'rov, 1+N emas"
      ]
    }
  ],
  "pitfalls": [
    "Taxmin bilan optimizatsiya (profilsiz) murakkablik qo'shadi va foyda bermasligi mumkin.",
    "Haqiqiy sekinlik odatda DB va tarmoqda: kichik klasslarni emas, N+1 ni qidiring.",
    "Tezlik uchun o'qilishni buzgan joyni izohlamasangiz keyingi dasturchi uni 'tuzatib' yuboradi.",
    "Mikrooptimizatsiyalar (`'` vs `\"`) deyarli ahamiyatsiz: arxitektura va I/O'ga e'tibor bering."
  ]
});
