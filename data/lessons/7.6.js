/* Chuqur dars: 7.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.6", {
  "lesson": [
    "### PSR-4 Autoloading (Composer)",
    "Composer klasslarni `spl_autoload_register` orqali kerak bo'lganda yuklaydi. `composer.json`:",
    "```json",
    "\"autoload\": { \"psr-4\": { \"App\\\\\": \"app/\" } }",
    "```",
    "`App\\Models\\User` → `app/Models/User.php`.",
    "",
    "### Boshqa turlar",
    "- **classmap:** papka skanerlanadi, klass → fayl xaritasi (namespace shart emas; eski kod uchun).",
    "- **files:** har so'rovda yuklanadigan fayllar (helper funksiyalar).",
    "- **exclude-from-classmap**.",
    "- `autoload-dev` — faqat test.",
    "",
    "### Yangilash",
    "Yangi klass/namespace qo'shilsa va classmap rejimida: `composer dump-autoload`. PSR-4 odatda avtomatik topiladi.",
    "",
    "### Optimizatsiya (production)",
    "- `composer install --optimize-autoloader` (`-o`): PSR-4 klasslarni classmap'ga aylantiradi.",
    "- `--classmap-authoritative` (`-a`): classmap'dan boshqa joyga qaramaydi (eng tez; runtime'da yaratilgan klass topilmaydi).",
    "- `--apcu-autoloader`: topilganlarni APCu'da keshlaydi.",
    "`composer dump-autoload -o` ham.",
    "",
    "### Xatolar",
    "`Class not found`: namespace/fayl nomi/registr, `dump-autoload`, `autoload` bo'limida prefiks yo'q.",
    "",
    "### Laravel",
    "`App\\` → `app/`, `Database\\Factories\\` → `database/factories/`, `Database\\Seeders\\`; `helpers.php` — `files` orqali.",
    "",
    "### Qoidalar",
    "Fayl nomi = klass nomi (registr bilan), bitta fayl — bitta klass; `files` ni kam ishlating (har so'rovda)."
  ],
  "examples": [
    {
      "title": "autoload sozlash",
      "lang": "json",
      "code": [
        "{",
        "  \"autoload\": {",
        "    \"psr-4\": { \"App\\\\\": \"app/\", \"Database\\\\Seeders\\\\\": \"database/seeders/\" },",
        "    \"files\": [\"app/helpers.php\"]",
        "  },",
        "  \"autoload-dev\": { \"psr-4\": { \"Tests\\\\\": \"tests/\" } }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`--classmap-authoritative` bilan runtime'da yaratilgan klasslar topilmaydi.",
    "Fayl nomi klass nomiga registr bilan mos bo'lmasa Linux'da `Class not found`.",
    "`files` autoload har so'rovda yuklanadi: ko'p fayl qo'shmang.",
    "`autoload` o'zgargach `dump-autoload` ni unutish."
  ]
});
