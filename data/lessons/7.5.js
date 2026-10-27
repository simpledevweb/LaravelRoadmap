/* Chuqur dars: 7.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.5", {
  "lesson": [
    "### Version Constraints",
    "`require` da versiya diapazoni belgilash: Composer shu diapazondagi eng yangi mos versiyani tanlaydi.",
    "",
    "### Operatorlar",
    "| Cheklov | Ma'nosi | Misol |",
    "|---|---|---|",
    "| `1.2.3` | aniq | faqat 1.2.3 |",
    "| `>=1.2 <2.0` | oraliq | |",
    "| `1.2.*` | wildcard | `>=1.2.0 <1.3.0` |",
    "| `~1.2` | tilda | `>=1.2.0 <2.0.0` |",
    "| `~1.2.3` | tilda (3 raqam) | `>=1.2.3 <1.3.0` |",
    "| `^1.2.3` | caret | `>=1.2.3 <2.0.0` |",
    "| `^0.3.4` | caret 0.x | `>=0.3.4 <0.4.0` |",
    "| `1.2 \\|\\| 2.0` | yoki | `^1.2 \\|\\| ^2.0` |",
    "| `dev-main` | branch | |",
    "",
    "### Eng ko'p: caret `^`",
    "SemVer'ga tayanadi: MAJOR o'zgarmaguncha yangilash mumkin. Odatiy tanlov.",
    "",
    "### Tilda `~`",
    "Oxirgi ko'rsatilgan raqamni ko'taradi: `~1.2` → `1.x` (>=1.2), `~1.2.3` → `1.2.x`. Qattiqroq (patch).",
    "",
    "### Minimum stability",
    "`stable` default; `@dev`, `@beta` yoki `minimum-stability` + `prefer-stable: true`.",
    "",
    "### Tanlash qoidasi",
    "- Ilova: `^` bilan diapazon + lock.",
    "- Kutubxona: keng diapazon (`^8.0 || ^9.0`) — foydalanuvchilar bilan moslik.",
    "- Aniq versiyani faqat zarurat bo'lganda (noma'lum xato).",
    "- `*` yoki `dev-master` — xavfli.",
    "",
    "### Buyruqlar",
    "`composer require vendor/pkg:^2.1`, `composer update`, `composer outdated`, `composer why-not`."
  ],
  "examples": [
    {
      "title": "Diapazonlar",
      "lang": "json",
      "code": [
        "{",
        "  \"require\": {",
        "    \"php\": \"^8.2\",",
        "    \"monolog/monolog\": \"^3.0\",",
        "    \"symfony/console\": \"^6.4 || ^7.0\",",
        "    \"vendor/lib\": \"~2.3.0\"",
        "  }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`*` yoki `dev-master` kutilmagan buzuvchi yangilanishlarga yo'l ochadi.",
    "Kutubxonada juda tor diapazon foydalanuvchi ilovasi bilan konflikt beradi.",
    "`^0.x` caret `0.y` ni qulflaydi: `^0.3` `0.4` ni olmaydi.",
    "Tilda va caret farqini adashtirish: `~1.2` va `^1.2` bir xil, `~1.2.3` va `^1.2.3` farq qiladi."
  ]
});
