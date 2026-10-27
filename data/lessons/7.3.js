/* Chuqur dars: 7.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.3", {
  "lesson": [
    "### Dependency Management",
    "Loyiha ishlatadigan tashqi kutubxonalarni (**bog'liqliklar**) aniqlash, o'rnatish, yangilash va ularning bir-biriga mosligini ta'minlash. Composer buni **bog'liqlik daraxti** (to'g'ridan va tranzitiv) bilan hal qiladi.",
    "",
    "### Turlari",
    "- **To'g'ridan (direct):** siz `require` qilgan.",
    "- **Tranzitiv (indirect):** ular ishlatadigan bog'liqliklar. Ko'pincha ko'proq va xavf manbai.",
    "- **Platforma:** `php`, `ext-*`, `lib-*`.",
    "",
    "### Solver",
    "Composer **SAT-asosidagi** solver: barcha cheklovlarni (`^1.2`, `>=2.0 <3.0`) qanoatlantiruvchi versiyalar to'plamini topadi; topolmasa xato beradi.",
    "",
    "### Foydali buyruqlar",
    "- `composer show` (o'rnatilganlar), `composer show -t` (daraxt), `composer show vendor/pkg`.",
    "- `composer why vendor/pkg` — nima uchun o'rnatilgan.",
    "- `composer why-not vendor/pkg 3.0` — nega 3.0 o'rnatilmayapti.",
    "- `composer outdated` (`-D` faqat direct), `composer depends`.",
    "- `composer validate`.",
    "",
    "### Amaliyot",
    "- Faqat kerakli paketni qo'shing: har bog'liqlik — xavfsizlik, yangilash va hajm narxi.",
    "- Faol qo'llab-quvvatlanadigan, mashhur paketlarni tanlang (yulduzlar, oxirgi commit, litsenziya).",
    "- Kichik funksiya uchun paket o'rniga o'z kodingiz (YAGNI).",
    "- Direct bog'liqliklar versiyasini ongli diapazonda belgilang.",
    "",
    "### Xavf",
    "Supply chain (zararli paket, typosquatting), tashlab ketilgan paketlar, litsenziya mos kelmasligi (GPL va proprietary)."
  ],
  "examples": [
    {
      "title": "Tahlil buyruqlari",
      "lang": "bash",
      "code": [
        "composer show -t laravel/framework | head",
        "composer why symfony/console",
        "composer why-not doctrine/dbal 4.0",
        "composer outdated --direct"
      ]
    }
  ],
  "pitfalls": [
    "Kichik funksiya uchun og'ir paket qo'shish bog'liqlik va xavfsizlik yukini oshiradi.",
    "Tranzitiv bog'liqliklarni e'tiborsiz qoldirish zaifliklarni yashiradi: `composer audit`.",
    "Tashlab ketilgan (abandoned) paketni ishlatish keyinchalik xavf: `composer outdated` va abandoned ogohlantirishlarini kuzating.",
    "Litsenziyani tekshirmaslik huquqiy muammo tug'dirishi mumkin."
  ]
});
