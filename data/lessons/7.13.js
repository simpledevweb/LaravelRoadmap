/* Chuqur dars: 7.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.13", {
  "lesson": [
    "### composer audit",
    "`composer audit` — `composer.lock` dagi paketlarni **ma'lum zaifliklar** (security advisories, Packagist/GitHub ma'lumotlar bazasi) va **abandoned** (tashlab ketilgan) paketlar bo'yicha tekshiradi. Composer 2.4+.",
    "",
    "### Ishlatish",
    "```bash",
    "composer audit",
    "composer audit --format=json",
    "composer audit --locked      # lock bo'yicha (CI uchun)",
    "composer audit --no-dev",
    "```",
    "Chiqish kodi: zaiflik bo'lsa noldan farqli — CI'da build'ni to'xtatadi. `composer install` ham advisory'ni ko'rsatadi.",
    "",
    "### Nima ko'rsatadi",
    "Paket, versiya, CVE/Advisory ID, jiddiylik, tuzatilgan versiya, havola.",
    "",
    "### Sozlash",
    "`config.audit`: `ignore` (ma'lum va qabul qilingan advisory'lar, sabab bilan), `abandoned` (`report`/`fail`/`ignore`).",
    "",
    "### Qo'shimcha vositalar",
    "- `roave/security-advisories` (conflict paketi): zaif versiyani o'rnatishga ruxsat bermaydi.",
    "- **GitHub Dependabot / Renovate** — avtomatik yangilash PR'lari.",
    "- **Snyk, Sonatype, OSV** skanerlari.",
    "- `local-php-security-checker`.",
    "",
    "### Jarayon",
    "1. CI'da `composer audit` (har PR va jadval bo'yicha).",
    "2. Zaiflik topilsa: yangilash → mumkin bo'lmasa baholash/yumshatish → vaqtinchalik `ignore` (muddat bilan).",
    "3. Production versiyalarini ham muntazam skanerlang.",
    "",
    "### Chegara",
    "Audit faqat **ma'lum** zaifliklarni topadi; o'z kodingiz, konfiguratsiya va noma'lum (0-day) uchun emas. Tranzitiv bog'liqliklar ham tekshiriladi."
  ],
  "examples": [
    {
      "title": "CI qadam",
      "lang": "yaml",
      "code": [
        "# .gitlab-ci.yml",
        "security:audit:",
        "  stage: test",
        "  script:",
        "    - composer install --no-interaction --prefer-dist",
        "    - composer audit --locked",
        "  allow_failure: false"
      ]
    }
  ],
  "pitfalls": [
    "Audit faqat ma'lum zaifliklarni topadi: o'z kodingiz va konfiguratsiyani alohida tekshiring.",
    "`ignore` ro'yxatini sababsiz va muddatsiz qoldirish xavfni unutdiradi.",
    "Audit'ni faqat bir marta emas, doimiy (jadval bo'yicha) yurgizing: yangi advisory'lar chiqib turadi.",
    "Abandoned paketlarni e'tiborsiz qoldirish keyin xavfsizlik tuzatishsiz qolish demak."
  ]
});
