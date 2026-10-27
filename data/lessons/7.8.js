/* Chuqur dars: 7.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.8", {
  "lesson": [
    "### require va require-dev",
    "- `require` — ilova **ishlashi uchun** kerak bo'lgan bog'liqliklar (production'da ham o'rnatiladi): framework, ORM, SDK.",
    "- `require-dev` — faqat **ishlab chiqish va test** uchun: PHPUnit/Pest, PHPStan, Pint, Faker, Debugbar, IDE helper.",
    "",
    "### Nima uchun ajratiladi",
    "Production'ga `--no-dev` bilan faqat `require` o'rnatiladi: **kichikroq vendor**, **tezroq**, **kam xavf** (dev vositalarda zaiflik/xavfsiz bo'lmagan kod production'da bo'lmaydi).",
    "",
    "### Qaysi biriga",
    "- Kod `app/` ichida `use` qilsa → `require`.",
    "- Faqat `tests/`, artisan dev buyruqlari, CI → `require-dev`.",
    "- Laravel `Faker` seeders/factories'da: ko'pincha dev; lekin production'da seed ishlatilsa `require` kerak.",
    "- `laravel/telescope`, `debugbar`: dev (yoki ongli production'da).",
    "- **Xato:** production kodi `require-dev` paketga bog'liq bo'lsa, `--no-dev` da \"Class not found\".",
    "",
    "### Buyruqlar",
    "`composer require --dev pestphp/pest`, `composer install --no-dev`, `composer remove --dev x`.",
    "",
    "### Autoload",
    "`autoload-dev` — test klasslari (`Tests\\`), production autoload'iga kirmaydi.",
    "",
    "### Tekshirish",
    "`composer install --no-dev` bilan ilova ishga tushadimi? CI'da shunday sinov bosqichi (production simulyatsiyasi).",
    "",
    "### Platforma",
    "`require` ichida `php` va `ext-*`; dev uchun alohida talablar `require-dev` da."
  ],
  "examples": [
    {
      "title": "Ajratish",
      "lang": "json",
      "code": [
        "{",
        "  \"require\": { \"php\": \"^8.2\", \"laravel/framework\": \"^12.0\" },",
        "  \"require-dev\": { \"pestphp/pest\": \"^3.0\", \"laravel/pint\": \"^1.0\", \"fakerphp/faker\": \"^1.23\" }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Production kodi `require-dev` paketga bog'liq bo'lsa `--no-dev` da 'Class not found'.",
    "Dev vositani `require` ga qo'yish production'ga ortiqcha va xavfli kod tushiradi.",
    "`--no-dev` bilan ilovani sinamaslik deploy'da kutilmagan xato beradi.",
    "Seeders production'da ishlasa Faker'ni `require` ga qo'yish kerak."
  ]
});
