/* Chuqur dars: 7.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.2", {
  "lesson": [
    "### composer.lock",
    "`composer install`/`update` natijasida paketlarning **aniq versiyalari** (commit hash, manba URL, bog'liqliklar) shu faylga yoziladi. `composer.json` — \"nima xohlayman\" (diapazonlar), `composer.lock` — \"aynan nima o'rnatildi\".",
    "",
    "### Nima uchun",
    "**Reproducible builds:** jamoa a'zolari, CI va production **bir xil** versiyalarni oladi. Usiz `^1.2` diapazoni vaqt o'tishi bilan turli versiya beradi.",
    "",
    "### install vs update",
    "- `composer install` — `composer.lock` bo'yicha aniq o'rnatadi (lock bo'lmasa `update` qiladi). Deploy va CI'da shu.",
    "- `composer update` — diapazon ichida eng yangi versiyalarni topib, `lock`ni **yangilaydi**. Ongli, alohida commit.",
    "- `composer update vendor/paket` — faqat bittasini.",
    "- `composer require x` ham lock'ni yangilaydi.",
    "",
    "### Hash",
    "`content-hash` `composer.json` bog'liqlik qismidan olinadi: json lock bilan mos bo'lmasa ogohlantirish (\"lock file is not up to date\").",
    "",
    "### Git",
    "Ilova (project): `composer.lock` **Git'ga kiritiladi**. Kutubxona (library): ko'pincha lock Git'ga kiritilmaydi yoki ixtiyoriy (foydalanuvchilar o'z lock'ini yaratadi), lekin CI uchun matritsa sinovi.",
    "",
    "### Merge konfliktlar",
    "`composer.lock` konfliktida qo'lda tahrirlamang: `composer.json` ni tuzating, keyin `composer update --lock` yoki `composer install` va qayta yaratish.",
    "",
    "### Xavfsizlik",
    "Lock'dagi paket hash'lari yaxlitlikni ta'minlaydi; `composer audit` lock bo'yicha zaifliklarni tekshiradi."
  ],
  "examples": [
    {
      "title": "install va update",
      "lang": "bash",
      "code": [
        "composer install --no-interaction --prefer-dist       # lock bo'yicha (deploy/CI)",
        "composer update monolog/monolog                        # faqat bitta paketni yangilash",
        "composer update --lock                                 # json o'zgardi, versiyalar o'zgarmasin"
      ]
    }
  ],
  "pitfalls": [
    "`composer.lock` ni Git'ga kiritmaslik jamoada turli versiyalarga olib keladi.",
    "Deploy'da `composer update` ishlatish production'da kutilmagan versiyalarni o'rnatadi: `install`.",
    "Lock merge konfliktini qo'lda tahrirlash buzuq fayl beradi.",
    "`update` ni katta jamoada keraksiz tez-tez qilish ko'p regressiyaga olib keladi."
  ]
});
