/* Chuqur dars: 7.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.12", {
  "lesson": [
    "### Konflikt nima",
    "Ikki paket bitta bog'liqlikning **mos kelmaydigan** versiyalarini talab qilsa, yoki PHP/kengaytma talabi mos kelmasa — Composer o'rnata olmaydi va xato beradi.",
    "",
    "### Xato ko'rinishi",
    "\"Your requirements could not be resolved to an installable set of packages... Problem 1: - a/b requires x ^2.0 -> found x[2.0] but the package is fixed to 1.9 (lock file)...\"",
    "",
    "### Tashxis",
    "- `composer why vendor/pkg` — nima uchun o'rnatilgan.",
    "- `composer why-not vendor/pkg 2.0` — nima uchun 2.0 o'rnatilmayapti (bloklovchilarni ko'rsatadi).",
    "- `composer update -W` / `--with-all-dependencies` — tranzitiv ham yangilash.",
    "- `composer update vendor/a vendor/b --with-dependencies`.",
    "- `composer diagnose`, `composer validate`.",
    "- `-vvv` batafsil.",
    "",
    "### Yechimlar",
    "1. **Bloklovchi paketni yangilang** (yangi major yangi bog'liqlikni qo'llaydi).",
    "2. Diapazonni kengaytiring (`^1.0 || ^2.0`) agar mos bo'lsa.",
    "3. **Alternativ paket** tanlang.",
    "4. `replace`/`provide` (maxsus holat): virtual paket.",
    "5. **Fork** + `repositories` (vaqtinchalik).",
    "6. Platforma: `config.platform` yoki PHP/ext versiyasini yangilang.",
    "7. Lock'ni qayta yaratish: `rm composer.lock && composer update` (ehtiyot!).",
    "",
    "### Nima qilmaslik",
    "- `--ignore-platform-reqs` bilan \"tuzatish\": ishlamaydigan kodga olib keladi.",
    "- `\"conflict\"`ni noto'g'ri ishlatish.",
    "- Tranzitiv paketni qo'lda `require`ga aniq versiya bilan qotirib qo'yish.",
    "",
    "### Oldini olish",
    "Muntazam kichik yangilanishlar (katta sakramasdan), keng diapazonlar kutubxonalarda, CI'da `composer update --dry-run`."
  ],
  "examples": [
    {
      "title": "Tashxis",
      "lang": "bash",
      "code": [
        "composer why-not laravel/framework 12.0",
        "composer why symfony/http-foundation",
        "composer update vendor/a vendor/b --with-all-dependencies",
        "composer update --dry-run -vvv"
      ]
    }
  ],
  "pitfalls": [
    "`--ignore-platform-reqs` bilan konfliktni yashirish ishlamaydigan kodga olib keladi.",
    "Lock'ni o'chirib qayta yaratish hamma versiyani o'zgartiradi: ehtiyotkorlik va testlar.",
    "Tranzitiv paketga aniq versiya qo'yib qotirish keyingi yangilanishlarni bloklaydi.",
    "Eski paket yangi major'ni qo'llamasa yangilash bloklanadi: alternativa yoki fork."
  ]
});
