/* Chuqur dars: 1.44. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.44", {
  "lesson": [
    "### O'rnatish yo'llari",
    "1. **Tayyor paket (Windows/macOS):** XAMPP, Laragon, MAMP, Laravel Herd: PHP, veb-server va baza birga o'rnatiladi.",
    "2. **Linux paketi:** `sudo apt install php-cli php-mbstring php-xml php-curl php-mysql` (Ubuntu/Debian). Yangi versiya uchun Ondřej Surý PPA yoki Docker.",
    "3. **Docker:** `docker run --rm php:8.4-cli php -v` yoki `php:8.4-fpm`. Loyihaga mos, takrorlanuvchi muhit.",
    "4. **Hosting:** ko'pchilik hostinglarda PHP tayyor, versiyasi panelda tanlanadi.",
    "",
    "### O'rnatishni tekshirish",
    "`php -v` (versiya), `php -m` (kengaytmalar), `php --ini` (konfiguratsiya fayli joyi), `php -i | grep memory_limit`.",
    "",
    "### Tez dev-server",
    "Loyiha papkasida: `php -S localhost:8000 -t public`. U bitta jarayonli, faqat ishlab chiqish uchun, productionda ishlatilmaydi (Nginx + PHP-FPM).",
    "",
    "### Composer",
    "PHP paket menejeri: `composer init`, `composer require paket/nomi`. Laravel o'rnatish ham shu orqali. Tizimingizda `composer -V` bilan tekshiring.",
    "",
    "### Muhit sozlamalari",
    "`php.ini` da xatolarni ko'rsatish (`display_errors=On` faqat dev), `memory_limit`, `date.timezone`. O'zgartirgach veb-server/PHP-FPM'ni qayta ishga tushiring.",
    "",
    "### Tavsiya",
    "Haqiqiy loyiha uchun Docker yoki Laravel Sail/Herd: jamoada hamma bir xil versiya va kengaytmalar bilan ishlaydi.",
    "",
    "### Qadam-baqadam: Windows",
    "1. Laragon yoki XAMPP'ni yuklab o'rnating (yoki Laravel Herd).",
    "2. Terminalda `php -v` bilan tekshiring. Topilmasa, PHP papkasini `PATH`ga qo'shing.",
    "3. Loyiha papkasi yarating, `index.php` yozing, `php -S localhost:8000` ishga tushiring.",
    "",
    "### Qadam-baqadam: Ubuntu/Debian",
    "```bash",
    "sudo apt update",
    "sudo apt install php-cli php-mbstring php-xml php-curl php-zip php-mysql",
    "php -v",
    "```",
    "Yangi versiya kerak bo'lsa `ppa:ondrej/php` ishlatiladi.",
    "",
    "### macOS",
    "`brew install php`, yoki Laravel Herd/MAMP. Versiyani almashtirish uchun `brew link`.",
    "",
    "### Docker (tavsiya)",
    "`php:8.4-cli` (skriptlar), `php:8.4-fpm` (Nginx bilan), `composer` imidji. `docker compose` bilan PHP + Nginx + MySQL birga. Afzalligi: jamoada bir xil muhit, kompyuteringizni \"ifloslantirmaydi\".",
    "",
    "### Kengaytmalar",
    "Odatda kerak: `mbstring` (Unicode), `intl`, `curl`, `pdo_mysql`/`pdo_pgsql`, `zip`, `gd`, `bcmath`, `redis`. Tekshirish: `php -m`. Yetishmasa: `Call to undefined function mb_strlen()`.",
    "",
    "### php.ini",
    "`php --ini` qaysi fayl o'qilganini ko'rsatadi. Dev uchun: `display_errors=On`, `error_reporting=E_ALL`, `date.timezone=Asia/Tashkent`. O'zgartirgach serverni qayta ishga tushiring. CLI va web uchun alohida php.ini bo'lishi mumkin.",
    "",
    "### IDE va vositalar",
    "VS Code (PHP Intelephense), PhpStorm; Xdebug (qadam-baqadam tuzatish); Composer; PHPStan; PHP CS Fixer/Pint.",
    "",
    "### Birinchi tekshiruv",
    "`index.php` ichida `<?php phpinfo();` yozib ochsangiz versiya, kengaytmalar va sozlamalar jadvali chiqadi (productionda qoldirmang)."
  ],
  "examples": [
    {
      "title": "Tekshirish buyruqlari",
      "lang": "bash",
      "code": [
        "php -v",
        "php -m | grep -E 'mbstring|pdo|curl|intl'",
        "php --ini"
      ]
    },
    {
      "title": "Dev-server",
      "lang": "bash",
      "code": [
        "mkdir hello && cd hello",
        "echo '<?php phpinfo();' > index.php",
        "php -S localhost:8000",
        "# brauzerda: http://localhost:8000"
      ],
      "note": "`phpinfo()` sahifasini tekshirgach o'chirib qo'ying: u ichki ma'lumotni ochib beradi."
    },
    {
      "title": "Docker",
      "lang": "bash",
      "code": [
        "docker run --rm -v \"$PWD\":/app -w /app php:8.4-cli php index.php"
      ]
    },
    {
      "title": "php.ini va timezone",
      "lang": "bash",
      "code": [
        "php --ini",
        "php -i | grep -E \"date.timezone|display_errors|memory_limit\"",
        "php -d display_errors=1 -r 'echo $undefined;'"
      ]
    }
  ],
  "pitfalls": [
    "`php -S` productionda ishlatilmaydi: u parallel so'rovlarni boshqarmaydi va xavfsiz emas.",
    "CLI va FPM turli php.ini ishlatadi: o'zgartirishni to'g'ri faylga qiling (`php --ini`).",
    "Kengaytma (mbstring, intl, pdo_mysql) o'rnatilmasa, funksiya topilmaydi: `Call to undefined function`.",
    "`phpinfo()` sahifasini productionda qoldirish xavfsizlik teshigi."
  ]
});
