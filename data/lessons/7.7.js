/* Chuqur dars: 7.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.7", {
  "lesson": [
    "### O'rnatish",
    "- `composer require vendor/pkg` — paketni `composer.json` ga qo'shadi, o'rnatadi, lock'ni yangilaydi (eng mos diapazon `^x.y`).",
    "- `composer require vendor/pkg:^2.0`, `--dev` (`require-dev`ga).",
    "- `composer install` — lock bo'yicha hammasini o'rnatadi.",
    "- `composer create-project laravel/laravel app` — yangi loyiha.",
    "- `composer global require ...` (global vositalar, ehtiyot bilan).",
    "",
    "### O'chirish",
    "`composer remove vendor/pkg` — `composer.json`dan chiqaradi, `vendor/` va lock'ni yangilaydi. Bog'liq (tranzitiv) paketlar ham kerak bo'lmasa o'chadi.",
    "",
    "### Yangilash",
    "`composer update vendor/pkg` (bitta), `composer update` (hammasi). `--with-dependencies` / `-w` tranzitiv ham.",
    "",
    "### Ma'lumot",
    "`composer show`, `composer show vendor/pkg`, `composer outdated`, `composer search`, `composer home vendor/pkg`.",
    "",
    "### Optsiyalar",
    "- `--prefer-dist` (zip, tez), `--prefer-source` (git clone).",
    "- `--no-scripts` (hook'siz), `--no-dev`, `--ignore-platform-reqs` (xavfli: faqat istisno).",
    "- `--dry-run` nima o'zgarishini ko'rish.",
    "- `--no-interaction` (CI).",
    "",
    "### Plagin va scripts",
    "Paket o'rnatilganda plagin/skript ishga tushishi mumkin: `allow-plugins` ni ongli bering; ishonchsiz paketni o'rnatmang.",
    "",
    "### Qoidalar",
    "- Kerak bo'lmagan paketni o'chiring.",
    "- Dev vositalarini `--dev` bilan.",
    "- O'rnatishdan oldin paketni tekshiring (faol, litsenziya, xavfsizlik)."
  ],
  "examples": [
    {
      "title": "Buyruqlar",
      "lang": "bash",
      "code": [
        "composer require spatie/laravel-permission",
        "composer require --dev pestphp/pest",
        "composer remove vendor/unused",
        "composer update vendor/pkg --with-dependencies --dry-run"
      ]
    }
  ],
  "pitfalls": [
    "`--ignore-platform-reqs` bilan o'rnatish ishlamaydigan muhitga paket tushiradi: istisno holatda.",
    "`require` o'rniga `composer.json` ni qo'lda o'zgartirib lock'ni yangilamaslik.",
    "Ishonchsiz paketning plugin/scripts'iga `allow-plugins` bermang.",
    "Dev vositani oddiy `require` ga qo'shish production'ga ortiqcha paket tushiradi."
  ]
});
