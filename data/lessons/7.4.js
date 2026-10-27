/* Chuqur dars: 7.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.4", {
  "lesson": [
    "### Semantic Versioning (SemVer)",
    "Versiya **MAJOR.MINOR.PATCH** (`2.4.1`):",
    "- **MAJOR** — orqaga mos kelmaydigan (breaking) o'zgarish.",
    "- **MINOR** — orqaga mos yangi funksiya.",
    "- **PATCH** — orqaga mos xato tuzatish.",
    "",
    "### Qo'shimcha",
    "- Pre-release: `1.0.0-alpha.1`, `-beta`, `-RC1`.",
    "- Composer `v` prefiksini qabul qiladi (`v1.2.3`); `dev-main` (branch), `1.x-dev`.",
    "- `0.y.z` — beqaror: har MINOR ham breaking bo'lishi mumkin (SemVer'da `0.x` uchun kafolat yo'q); Composer'ning `^0.3` esa faqat `0.3.x` ni ruxsat beradi.",
    "",
    "### Nima uchun muhim",
    "Versiya cheklovlari (`^`, `~`) SemVer'ga tayanadi: `^1.2` \"1.x ichida yangilashga ishonaman\" demak. Paket muallifi SemVer'ga amal qilmasa, minor yangilash ilovani buzishi mumkin.",
    "",
    "### Public API",
    "SemVer \"public API\" ga nisbatan: `public`/`protected` metodlar, konfiguratsiya, HTTP javob formati. Ichki (`@internal`) o'zgarishlar breaking emas.",
    "",
    "### O'zingiz paket yozsangiz",
    "- Breaking → MAJOR; yangi funksiya → MINOR; fix → PATCH.",
    "- `CHANGELOG`, `UPGRADE.md`.",
    "- Git tag: `v1.4.0` (Packagist tag'lardan versiya oladi).",
    "- Deprecation oldin (MINOR'da ogohlantirish), olib tashlash MAJOR'da.",
    "",
    "### Laravel/PHP",
    "Laravel yiliga bir MAJOR; Symfony — qat'iy SemVer + BC promise; PHP o'zi SemVer emas (minor ham deprecation kiritadi).",
    "",
    "### Xavf",
    "SemVer ishonchsiz: ba'zi paketlar minor'da breaking qiladi; lock + test shu sababli kerak."
  ],
  "examples": [
    {
      "title": "Versiya tag",
      "lang": "bash",
      "code": [
        "git tag -a v1.4.0 -m \"Yangi funksiya: filtr\"",
        "git push origin v1.4.0",
        "composer show vendor/pkg --all | head       # mavjud versiyalar"
      ]
    }
  ],
  "pitfalls": [
    "SemVer'ga amal qilmaydigan paketda minor yangilash ilovani buzishi mumkin: lock va testlar.",
    "`0.x` versiyalarda har minor breaking bo'lishi mumkin: `^0.3` faqat `0.3.x`.",
    "Breaking o'zgarishni minor/patch'da chiqarish foydalanuvchilarni buzadi.",
    "Pre-release (`-beta`) ni production'da ishlatish xavfli."
  ]
});
