/* Chuqur dars: 1.43. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.43", {
  "lesson": [
    "### PHP nimalar qila oladi",
    "- **Dinamik sahifa:** har foydalanuvchi uchun turlicha kontent yaratadi.",
    "- **Fayllar:** yaratish, ochish, o'qish, yozish, o'chirish.",
    "- **Forma ma'lumotlari:** `$_GET` va `$_POST` orqali qabul qiladi.",
    "- **Cookie va sessiya:** foydalanuvchini eslab qoladi.",
    "- **Ma'lumotlar bazasi:** qo'shish, o'zgartirish, o'chirish, qidirish.",
    "- **Kirish nazorati:** kim nimani ko'rishini boshqaradi.",
    "- **Shifrlash va xeshlash:** parollarni himoyalaydi.",
    "- **Chiqish:** HTML, JSON, XML, rasm, PDF, fayl yuklab olish.",
    "",
    "### Qayerda ishlaydi",
    "Windows, Linux, macOS. Veb-serverlar: Apache, Nginx, Caddy, FrankenPHP. Ma'lumotlar bazalari: MySQL, PostgreSQL, SQLite va boshqalar.",
    "",
    "### PHP boshqa tillardan nimasi bilan farq qiladi",
    "- Kodni HTML bilan aralashtirish mumkin (shablon sifatida).",
    "- Funksiyalarning boy standart kutubxonasi (string, massiv, fayl, vaqt).",
    "- Dinamik tiplash, lekin zamonaviy PHP'da tiplar e'lon qilinadi.",
    "- Veb uchun \"tayyor\" maxsus o'zgaruvchilar: `$_GET`, `$_POST`, `$_SERVER`, `$_COOKIE`, `$_SESSION`.",
    "",
    "### Zamonaviy PHP",
    "Bugun PHP ko'pincha framework (Laravel, Symfony) bilan ishlatiladi: marshrutlash, ORM, autentifikatsiya, navbat tizimi tayyor. Lekin framework ostidagi mexanikani — so'rov, sessiya, fayl, forma — bilish zarur.",
    "",
    "### CLI rejimi",
    "Terminalda `php skript.php` yoki `php -r 'echo 2+2;'` bilan ishlatish mumkin: cron vazifalari, import skriptlari, artisan buyruqlari shu rejimda.",
    "",
    "### Har bir imkoniyat batafsil",
    "- **Dinamik kontent:** sahifa vaqtga, foydalanuvchiga, bazadagi ma'lumotga qarab o'zgaradi. Statik HTML esa hamma uchun bir xil.",
    "- **Fayl tizimi:** hujjat yuklash/yuklab olish, eksport (CSV, PDF), konfiguratsiya o'qish, log yozish.",
    "- **Forma:** `GET` URL orqali (qidiruv, filtr), `POST` tanada (parol, katta ma'lumot). Ikkalasini ham tekshirish shart.",
    "- **Cookie va sessiya:** \"Meni eslab qol\", savat, kirgan foydalanuvchi holati.",
    "- **Ma'lumotlar bazasi:** PDO/mysqli orqali `INSERT`, `SELECT`, `UPDATE`, `DELETE`.",
    "- **Kirish nazorati:** rol va ruxsatlarga qarab sahifani ko'rsatish yoki taqiqlash.",
    "- **Xeshlash va shifrlash:** `password_hash`, `openssl`, `sodium`.",
    "- **Email yuborish, HTTP so'rovlar (cURL), API chaqirish.**",
    "",
    "### PHP chiqara oladigan formatlar",
    "HTML, JSON (API), XML, oddiy matn, CSV, rasm (GD/Imagick), PDF (kutubxonalar), WebSocket/stream (maxsus serverlar bilan).",
    "",
    "### Qanday ishga tushadi",
    "1. **Web SAPI:** Nginx/Apache + PHP-FPM, har so'rovga javob.",
    "2. **CLI:** `php skript.php`: cron, import, artisan.",
    "3. **Embedded/server:** FrankenPHP, Swoole (uzoq yashovchi jarayon).",
    "",
    "### Tuzilma misoli (oddiy sayt)",
    "`index.php` (kirish nuqtasi) → `header.php` (include) → asosiy mantiq → `footer.php`. Katta loyihada bu o'rnini framework marshrutlash va kontrollerlar oladi.",
    "",
    "### Hosting tanlash",
    "PHP versiyasini tanlash imkoni (8.2+), `php.ini` sozlamalari, SSH, Composer, SSL, baza (MySQL/PostgreSQL). Arzon umumiy hostingda ko'p narsa cheklangan bo'lishi mumkin."
  ],
  "examples": [
    {
      "title": "Forma ma'lumoti va javob",
      "lang": "php",
      "code": [
        "<?php",
        "$name = $_POST['name'] ?? 'mehmon';",
        "echo \"Salom, \" . htmlspecialchars($name) . \"!\";"
      ]
    },
    {
      "title": "Fayl va sana",
      "lang": "php",
      "code": [
        "<?php",
        "file_put_contents('log.txt', date('c') . \" kirish\\n\", FILE_APPEND);",
        "echo \"Yozildi\";"
      ]
    },
    {
      "title": "JSON javob",
      "lang": "php",
      "code": [
        "<?php",
        "header('Content-Type: application/json');",
        "echo json_encode(['ok' => true, 'vaqt' => time()]);"
      ]
    },
    {
      "title": "Oddiy qidiruv (GET)",
      "lang": "php",
      "code": [
        "<?php",
        "$q = trim($_GET['q'] ?? '');",
        "if ($q === '') { echo 'Qidiruv so\\'zini kiriting'; exit; }",
        "echo 'Natija: ', htmlspecialchars($q);"
      ],
      "note": "Brauzerda `?q=php` qo'shib ochib ko'ring."
    }
  ],
  "pitfalls": [
    "Foydalanuvchi kiritmasini tozalamasdan chiqarish XSS ga olib keladi: `htmlspecialchars`.",
    "Parolni oddiy `md5` bilan saqlash xavfli: `password_hash`.",
    "Cookie/sessiya funksiyalarini chiqishdan (echo) keyin chaqirsangiz 'headers already sent' xatosi chiqadi.",
    "CLI va web uchun php.ini boshqa bo'lishi mumkin: bir joyda ishlagan skript boshqa joyda ishlamasligi mumkin."
  ]
});
