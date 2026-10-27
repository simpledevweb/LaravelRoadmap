/* Chuqur dars: 7.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.16", {
  "lesson": [
    "### Yangilash strategiyasi",
    "Bog'liqliklarni **muntazam va kichik qadamlar** bilan yangilash katta, xavfli sakrashdan afzal. Yangilanmagan paketlar zaiflik va texnik qarz to'playdi.",
    "",
    "### Tamoyillar",
    "1. **Rejali:** haftalik/ikki haftalik yangilash oynasi (yoki avtomatik PR).",
    "2. **Kichik partiyalar:** bitta paket yoki bitta guruh (laravel/*, symfony/*) — xato topish oson.",
    "3. **Testlar:** yaxshi test qamrovi va statik tahlil bo'lmasa yangilash xavfli.",
    "4. **Patch/minor tez, major rejali:** patch/minor odatda xavfsiz; major — upgrade guide va vaqt.",
    "5. **Xavfsizlik darrov:** `composer audit` zaifligi — ustuvor.",
    "6. **Lock'ni commit qiling** va yangilashni alohida PR/commit'da.",
    "",
    "### Vositalar",
    "- **Dependabot/Renovate:** avtomatik PR (guruhlash, jadval, auto-merge patch).",
    "- `composer outdated` (`--direct`, `--minor-only`, `--major-only`).",
    "- `composer bump` (`composer.json` dagi minimumni lock versiyasiga ko'taradi).",
    "- **Rector/PHPStan** — deprecation'larni topish va avtomatik tuzatish.",
    "- **Laravel Shift** — framework major yangilash.",
    "",
    "### Jarayon",
    "1. `composer outdated --direct`.",
    "2. Bitta paket: `composer update vendor/pkg --with-dependencies`.",
    "3. Testlar, PHPStan, deprecation log.",
    "4. Changelog/UPGRADE o'qing (breaking?).",
    "5. Staging → production (canary).",
    "6. Muammo bo'lsa lock'ni qaytaring (`git revert`).",
    "",
    "### Versiya diapazonlari",
    "Ilova: `^` + lock. Kutubxona: keng diapazon. Qotirish — faqat sababli.",
    "",
    "### Xavflar",
    "Yangilamaslik (texnik qarz, EOL), hammasini bir marta yangilash (sabab topish qiyin), testsiz yangilash, SemVer'ga ishonib changelog o'qimaslik.",
    "",
    "### Metrika",
    "Eskirgan direct paketlar soni, zaifliklar soni, o'rtacha yangilash kechikishi."
  ],
  "examples": [
    {
      "title": "Renovate sozlamasi",
      "lang": "json",
      "code": [
        "{",
        "  \"extends\": [\"config:recommended\"],",
        "  \"schedule\": [\"before 6am on monday\"],",
        "  \"packageRules\": [",
        "    { \"matchPackagePatterns\": [\"^laravel/\", \"^illuminate/\"], \"groupName\": \"laravel\" },",
        "    { \"matchUpdateTypes\": [\"patch\"], \"automerge\": true }",
        "  ]",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Yangilashni yillarga qoldirish katta sakrash va ko'p breaking change beradi.",
    "Testlarsiz avtomatik merge regressiyani sezdirmaydi.",
    "Hamma paketni birdan yangilash xatoning sababini topishni qiyinlashtiradi.",
    "Changelog/UPGRADE o'qimay SemVer'ga ishonish: ba'zi paketlar minor'da breaking qiladi."
  ]
});
