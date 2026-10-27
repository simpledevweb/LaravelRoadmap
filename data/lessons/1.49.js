/* Chuqur dars: 1.49. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.49", {
  "lesson": [
    "### Include nima",
    "`include` va `require` boshqa PHP faylni joriy faylga kiritadi va bajaradi. Takroriy qismlar (header, footer, menyu, konfiguratsiya) bitta faylda saqlanib, kerak joyda chaqiriladi.",
    "",
    "### To'rt shakl",
    "| | Fayl topilmasa | Takroriy ulash |",
    "|---|---|---|",
    "| `include` | Warning, skript davom etadi | ulanadi |",
    "| `require` | Fatal xato, skript to'xtaydi | ulanadi |",
    "| `include_once` | Warning | bir marta |",
    "| `require_once` | Fatal xato | bir marta |",
    "Muhim bog'liqliklar (konfiguratsiya, klass) uchun `require`, ixtiyoriy shablon bo'laklari uchun `include`.",
    "",
    "### Yo'l masalasi",
    "Nisbiy yo'l joriy ishchi papkaga bog'liq. Ishonchli usul: `__DIR__ . '/header.php'`. Yo'l `include_path` bo'yicha ham qidiriladi.",
    "",
    "### Qaytarish qiymati",
    "Fayl `return` qilsa, `include` shu qiymatni beradi: konfiguratsiya fayllari shunday ishlaydi (`return ['db' => ...];`).",
    "",
    "### Scope",
    "Ulangan fayl `include` chaqirilgan joyning o'zgaruvchi scope'iga kiradi. Funksiya ichida chaqirilsa, o'zgaruvchilar funksiya lokal scope'ida bo'ladi.",
    "",
    "### Zamonaviy usul",
    "Qo'lda `require` o'rniga Composer **autoload** (PSR-4) ishlatiladi: klass kerak bo'lganda avtomatik yuklanadi (mavzu: Namespaces va Autoloading). Qo'lda include asosan shablon va konfiguratsiya uchun qoladi.",
    "",
    "### Xavfsizlik",
    "Foydalanuvchi kiritmasini `include` yo'liga qo'ymang: `include $_GET['page'] . '.php'` — **LFI** zaifligi. Ruxsat etilgan nomlar ro'yxatidan (whitelist) tanlang.",
    "",
    "### Qachon qaysi birini ishlatish",
    "- `require_once`: klass/funksiya e'lonlari, konfiguratsiya: bir marta, xato bo'lsa to'xtash.",
    "- `include`: ixtiyoriy shablon bo'lagi (bo'lmasa sahifa baribir ishlashi mumkin).",
    "- `include_once`/`require_once`: bir faylni takror ulash fatal xato yoki ikki marta e'lon xatosini beradi: `_once` himoya qiladi. Lekin ular ichkarida har safar real yo'lni hal qiladi, ko'p chaqirilsa autoload'dan sekinroq.",
    "",
    "### Ulangan fayl ichida",
    "Ulangan faylda ham `<?php` ochuvchi teg kerak, aks holda uning matni oddiy matn sifatida chiqadi. O'zgaruvchilar ulangan faylga ko'rinadi (bir xil scope), ulangan fayldagi funksiya va klasslar global bo'ladi.",
    "",
    "### Yo'llar",
    "- `__DIR__` — joriy fayl papkasi, `__FILE__` — joriy fayl to'liq yo'li.",
    "- `dirname(__DIR__)` — bir daraja yuqori.",
    "- `$_SERVER['DOCUMENT_ROOT']` — veb-ildiz.",
    "- `set_include_path()` va `include_path` — qo'shimcha qidiruv papkalari.",
    "Nisbiy yo'l (`'header.php'`) ishchi papkaga va `include_path`ga bog'liq, shuning uchun nomuvofiq natija berishi mumkin.",
    "",
    "### Shablon uslubi",
    "```php",
    "<?php include __DIR__ . '/partials/header.php'; ?>",
    "<h1><?= htmlspecialchars($title) ?></h1>",
    "<?php include __DIR__ . '/partials/footer.php'; ?>",
    "```",
    "Zamonaviy loyihada shablon dvigateli (Blade, Twig) bu vazifani yaxshiroq bajaradi.",
    "",
    "### Autoload bilan farq",
    "Klasslar uchun `require` o'rniga Composer autoload (PSR-4) ishlating; `include` shablon va konfiguratsiya uchun.",
    "",
    "### Xavfsizlik xulosasi",
    "Foydalanuvchi kiritmasi yo'lga to'g'ridan-to'g'ri tushmasin; `allow_url_include` o'chiq bo'lsin; ulangan fayl veb-ildizdan tashqarida bo'lishi ma'qul."
  ],
  "examples": [
    {
      "title": "Shablon bo'laklari",
      "lang": "php",
      "code": [
        "<?php",
        "// index.php",
        "require __DIR__ . '/config.php';       // majburiy",
        "include __DIR__ . '/partials/header.php';",
        "echo \"<main>Asosiy kontent</main>\";",
        "include __DIR__ . '/partials/footer.php';"
      ]
    },
    {
      "title": "Qiymat qaytaruvchi fayl",
      "lang": "php",
      "code": [
        "<?php",
        "// config.php",
        "return ['db' => ['host' => 'localhost', 'name' => 'app']];",
        "",
        "// boshqa fayl",
        "$config = require __DIR__ . '/config.php';",
        "echo $config['db']['host'];"
      ]
    },
    {
      "title": "Xavfsiz tanlash",
      "lang": "php",
      "code": [
        "<?php",
        "$allowed = ['home', 'about', 'contact'];",
        "$page = in_array($_GET['page'] ?? '', $allowed, true) ? $_GET['page'] : 'home';",
        "include __DIR__ . \"/pages/{$page}.php\";"
      ]
    },
    {
      "title": "Shartli include va natija",
      "lang": "php",
      "code": [
        "<?php",
        "$ok = @include __DIR__ . '/optional.php';   // topilmasa false",
        "if ($ok === false) { echo 'optional.php yo\\'q, davom etamiz'; }",
        "",
        "$settings = require __DIR__ . '/settings.php';   // majburiy"
      ]
    }
  ],
  "pitfalls": [
    "`include $_GET['page']` — Local File Inclusion zaifligi: faqat oq ro'yxatdagi nomlarni qo'ying.",
    "Nisbiy yo'l ishchi papkaga bog'liq: `__DIR__` ishlating.",
    "`include` topilmagan faylda jim davom etadi: majburiy fayl uchun `require`.",
    "`include` bir faylni takror ulansa funksiya/klass ikki marta e'lon qilinib fatal xato chiqadi: `_once` yoki autoload."
  ]
});
