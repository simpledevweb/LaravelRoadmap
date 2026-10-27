/* Chuqur dars: 7.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.11", {
  "lesson": [
    "### Packagist",
    "**packagist.org** — Composer'ning **asosiy ochiq paket reestri** (default repository). U kodni saqlamaydi: GitHub/GitLab/Bitbucket repozitoriyga **havola** va metama'lumot (versiyalar, tavsif) saqlaydi.",
    "",
    "### Paket e'lon qilish",
    "1. `composer.json` da `name` (`vendor/paket`), `description`, `license`, `autoload`.",
    "2. Repozitoriyni GitHub'ga yuklang, `git tag v1.0.0`.",
    "3. packagist.org'da hisob, **Submit** (repo URL).",
    "4. **Auto-update**: GitHub webhook (yangi tag/push'da avtomatik).",
    "",
    "### Versiyalar",
    "Git **tag**lar (`v1.2.3`) → stabil versiyalar; branch'lar → `dev-main`/`1.x-dev`.",
    "",
    "### Paketni tanlash mezonlari",
    "Faol qo'llab-quvvatlash (oxirgi release), yuklab olishlar, litsenziya, testlar/CI, hujjat, SemVer, bog'liqliklar soni, xavfsizlik tarixi. \"abandoned\" belgisiga e'tibor.",
    "",
    "### Qidirish va ma'lumot",
    "`composer search`, packagist.org sahifasi (versiyalar, bog'liqlik, statistikalar), `composer show vendor/pkg --all`.",
    "",
    "### Xavfsizlik",
    "- **Typosquatting** (nomga o'xshash zararli paket): nomni diqqat bilan tekshiring.",
    "- Ishonchli vendor (spatie, symfony, laravel).",
    "- Vendor'ni tasdiqlash (verified) belgisi.",
    "- `composer audit` (Packagist security advisories).",
    "",
    "### Mirror",
    "Ichki mirror (Satis/Nexus/Artifactory) tezlik va barqarorlik uchun."
  ],
  "examples": [
    {
      "title": "composer.json paket uchun",
      "lang": "json",
      "code": [
        "{",
        "  \"name\": \"acme/slugify-uz\",",
        "  \"description\": \"O'zbek lotin matni uchun slug yaratuvchi\",",
        "  \"type\": \"library\",",
        "  \"license\": \"MIT\",",
        "  \"autoload\": { \"psr-4\": { \"Acme\\\\SlugifyUz\\\\\": \"src/\" } },",
        "  \"require\": { \"php\": \"^8.2\" }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Typosquatting: nomga o'xshash zararli paketni o'rnatib qo'yish mumkin: nomni tekshiring.",
    "Tashlab ketilgan (abandoned) paketni ishlatish keyin muammo: alternativani toping.",
    "Git tag'siz paket faqat `dev-*` versiya beradi.",
    "Paketni mashhurligiga qarab tanlash yetarli emas: xavfsizlik va qo'llab-quvvatlash."
  ]
});
