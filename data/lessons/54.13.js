/* Chuqur dars: 54.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.13", {
  "lesson": [
    "### Local vs shared",
    "- **Local (in-process) kesh:** ilova jarayoni xotirasi (PHP: `static` massiv, **APCu**, Octane Swoole table). **Juda tez** (tarmoqsiz), lekin har server/jarayon uchun **alohida** (nomuvofiq), hajm cheklangan, jarayon restartda yo'qoladi.",
    "- **Shared (distributed) kesh:** Redis/Memcached. Barcha instansiya uchun **umumiy**, izchil, lekin **tarmoq kechikishi** bor.",
    "",
    "### Taqqoslash",
    "| | Local | Shared |",
    "|---|---|---|",
    "| Tezlik | ~mikrosek | ~0.2–1 ms |",
    "| Izchillik | server bo'yicha farq | umumiy |",
    "| Hajm | kichik | katta |",
    "| Invalidatsiya | qiyin (har serverda) | oson (bitta joy) |",
    "",
    "### Ko'p qatlamli (L1/L2)",
    "Eng issiq, kam o'zgaradigan kalitlar L1 (lokal, qisqa TTL 1–10 s) → L2 (Redis) → DB. Redis'ga yuk va kechikish kamayadi.",
    "",
    "### PHP'ning o'ziga xosligi",
    "Klassik FPM'da so'rovlar orasida holat yo'q: faqat **APCu** (shared memory, jarayonlar orasida, serverga xos) yoki **OPcache**. So'rov ichida `static`/`once()`/Laravel `Cache::store('array')` (so'rov davomidagi kesh).",
    "**Octane:** jarayon yashaydi → `static`/Swoole Table/`Cache::store('octane')` juda tez, lekin so'rovga xos holat sizish xavfi.",
    "",
    "### Qachon qaysi",
    "- Konfiguratsiya, kam o'zgaradigan (soatlar), juda issiq → local (+ qisqa TTL).",
    "- Foydalanuvchi/izchil bo'lishi kerak → shared.",
    "- Ko'p serverda local invalidatsiyasi qiyin: qisqa TTL yoki pub/sub signal.",
    "",
    "### Laravel",
    "`Cache::store('array')`, `apc` driver (APCu), `octane` store, `once()`."
  ],
  "examples": [
    {
      "title": "Qatlamlar",
      "lang": "php",
      "code": [
        "$user = Cache::store('apc')->remember(\"user:{$id}\", 5, fn () =>                 // L1: lokal, 5 s",
        "    Cache::store('redis')->remember(\"user:{$id}\", 600, fn () => User::find($id)) // L2: umumiy",
        ");",
        "$cfg = once(fn () => Settings::all());      // so'rov davomida bir marta"
      ]
    }
  ],
  "pitfalls": [
    "Lokal keshni ko'p serverda uzun TTL bilan ishlatish serverlar orasida nomuvofiqlik beradi.",
    "Octane'da `static` ichida so'rovga xos ma'lumot saqlash foydalanuvchilar o'rtasida sizadi.",
    "Lokal keshda invalidatsiya har serverga yetib bormaydi: qisqa TTL/signal.",
    "APCu FPM jarayonlari orasida umumiy, lekin CLI bilan alohida (queue worker ko'rmaydi)."
  ]
});
