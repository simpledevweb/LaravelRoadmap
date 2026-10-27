/* Chuqur dars: 8.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.3", {
  "lesson": [
    "### PSR-4: Autoloading",
    "Klass nomidan **fayl yo'lini** aniqlovchi standart: **namespace prefiks** → **bazaviy papka**. Klass kerak bo'lganda avtomatik yuklanadi (`spl_autoload_register`).",
    "",
    "### Qoida",
    "`\\Vendor\\Package\\Sub\\ClassName` → `{baza papka}/Sub/ClassName.php`.",
    "- Namespace boshi (prefiks) bazaviy papkaga mos.",
    "- Qolgan namespace bo'limlari papka bo'ladi.",
    "- Klass nomi + `.php` fayl nomi (**registr** aniq mos).",
    "- Bitta fayl — bitta klass.",
    "",
    "### composer.json",
    "```json",
    "{ \"autoload\": { \"psr-4\": { \"App\\\\\": \"app/\", \"Database\\\\Seeders\\\\\": \"database/seeders/\" } } }",
    "```",
    "Dev uchun `autoload-dev`. `composer dump-autoload` xaritani yangilaydi.",
    "",
    "### PSR-0 bilan farq",
    "PSR-0 (eskirgan) klass nomidagi `_` ni papkaga o'giradi va to'liq namespace yo'lini talab qiladi; PSR-4 sodda.",
    "",
    "### Optimizatsiya",
    "`composer install --optimize-autoloader` (classmap), `--classmap-authoritative`, `--apcu-autoloader`. Production'da albatta.",
    "",
    "### Xatolar",
    "- `Class not found`: namespace/fayl nomi/registr mos emas, `dump-autoload` kerak.",
    "- Windows'da ishlab, Linux'da registr xatosi.",
    "- Bitta faylda ikkita klass autoload qilinmaydi.",
    "",
    "### Laravel",
    "`App\\` → `app/`, `Tests\\` → `tests/`, `Database\\Factories\\` → `database/factories/`."
  ],
  "examples": [
    {
      "title": "Prefiks → papka",
      "lang": "json",
      "code": [
        "{",
        "  \"autoload\": {",
        "    \"psr-4\": { \"App\\\\\": \"app/\", \"Billing\\\\\": \"modules/billing/src/\" }",
        "  }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Fayl nomi va klass nomi registri mos kelmasa Linux'da `Class not found`.",
    "Bitta faylga ikkita klass yozish autoload'ni buzadi.",
    "`autoload` o'zgargach `composer dump-autoload` ni unutish.",
    "Production'da `--optimize-autoloader` ishlatmaslik sekinlashtiradi."
  ]
});
