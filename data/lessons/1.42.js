/* Chuqur dars: 1.42. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.42", {
  "lesson": [
    "### PHP nima",
    "PHP — **server tomonida** ishlaydigan, ochiq manbali skript tili. U veb-sahifalarni dinamik yaratish uchun mo'ljallangan: brauzer sahifani so'raydi, server PHP kodini bajaradi va brauzerga tayyor **HTML** (yoki JSON) qaytaradi. Brauzer PHP kodini hech qachon ko'rmaydi.",
    "",
    "### Qisqa tarix",
    "Rasmus Lerdorf 1994 yilda shaxsiy sahifasidagi tashrifni hisoblash uchun kichik vositalar yozgan va ularni \"Personal Home Page tools\" deb atagan. Keyinchalik til rivojlanib, **PHP: Hypertext Preprocessor** deb nomlandi (o'z nomini ichiga olgan \"rekursiv\" qisqartma). Hozir PHP 8.x seriyasi ishlatiladi.",
    "",
    "### Nima uchun keng tarqalgan",
    "- Bepul va ochiq manbali.",
    "- Deyarli har bir hosting PHP'ni qo'llab-quvvatlaydi.",
    "- Katta ekotizim: Laravel, Symfony, WordPress, Composer paketlari.",
    "- Ma'lumotlar bazalari (MySQL, PostgreSQL, SQLite) bilan qulay ishlaydi.",
    "- Katta jamoa, ko'p hujjat va ish o'rinlari.",
    "",
    "### Qayerda ishlatiladi",
    "Veb-saytlar va veb-ilovalar, REST API'lar, kontent boshqaruv tizimlari (WordPress), internet-do'konlar, ichki korporativ tizimlar, buyruq satri skriptlari (CLI) va navbat ishlovchilari.",
    "",
    "### So'rov qanday yuradi",
    "1. Foydalanuvchi brauzerda `https://sayt.uz/index.php` ni ochadi.",
    "2. Veb-server (Nginx/Apache) `.php` faylni PHP'ga uzatadi.",
    "3. PHP kodni bajaradi (bazaga murojaat qilishi, fayl o'qishi mumkin).",
    "4. Natija (HTML/JSON) brauzerga qaytadi.",
    "Bu model \"har so'rov — yangi bajarilish\" deyiladi: so'rov tugagach xotira tozalanadi (batafsil: PHP runtime mavzusi).",
    "",
    "### PHP fayli",
    "Kengaytma `.php`. Fayl ichida oddiy HTML va PHP bloklari (`<?php ... ?>`) aralash bo'lishi mumkin. Faqat PHP bo'lsa, yopuvchi `?>` yozilmaydi.",
    "",
    "### PHP versiyalari va rivoji",
    "- **PHP 5** (2004): OOP asoslari. **PHP 7** (2015): ikki barobar tezlik, skalyar tiplar, `??`. **PHP 8** (2020): JIT, attributes, `match`, named arguments; **8.1** enum/readonly, **8.4** property hooks, **8.5** pipe operatori.",
    "- Har yil noyabrda yangi minor versiya chiqadi; har versiya ~2 yil to'liq, yana ~2 yil faqat xavfsizlik tuzatishlari bilan qo'llab-quvvatlanadi.",
    "",
    "### Frontend va backend farqi",
    "- **Frontend:** brauzerda ishlaydi (HTML, CSS, JavaScript): foydalanuvchi ko'radi va ishlatadi.",
    "- **Backend:** serverda ishlaydi (PHP): ma'lumotlar bazasi, autentifikatsiya, biznes qoidalar.",
    "Brauzer \"View Source\" da faqat HTML ko'radi, PHP kodi serverdan chiqmaydi.",
    "",
    "### PHP bilan nima qurilgan",
    "WordPress, Drupal, Joomla, Wikipedia (MediaWiki), Facebook'ning dastlabki versiyasi, Laravel va Symfony asosidagi minglab ilovalar. Bu PHP'ni bilish ish bozori uchun foydali ekanini ko'rsatadi.",
    "",
    "### PHP va boshqa tillar",
    "- **JavaScript (Node.js):** ham serverda ishlaydi, lekin PHP'da har so'rov alohida jarayon/holat bilan boshlanadi (shared-nothing).",
    "- **Python/Django, Ruby/Rails:** o'xshash vazifalar; PHP hostingda eng oson tarqatiladi.",
    "- **Java/C#:** kompilyatsiyali, qat'iyroq; PHP tez ishlab chiqish uchun qulay.",
    "Til tanlash vazifa va jamoaga bog'liq: PHP veb-ilova uchun asosiy tanlovlardan biri.",
    "",
    "### Nima kerak boshlash uchun",
    "Matn muharriri yoki IDE (VS Code, PhpStorm), PHP o'rnatilgan muhit (keyingi mavzu), brauzer. Hosting majburiy emas: kompyuteringizda `php -S` yetarli."
  ],
  "examples": [
    {
      "title": "Birinchi PHP fayl",
      "lang": "php",
      "code": [
        "<?php",
        "echo \"Salom, PHP!\";"
      ],
      "note": "Faylni `index.php` deb saqlang va `php index.php` bilan ishga tushiring."
    },
    {
      "title": "HTML ichida PHP",
      "lang": "php",
      "code": [
        "<!DOCTYPE html>",
        "<html>",
        "<body>",
        "  <h1>Bugungi sana</h1>",
        "  <p><?php echo date('Y-m-d'); ?></p>",
        "</body>",
        "</html>"
      ],
      "note": "Brauzer faqat tayyor HTML'ni oladi, PHP kodi serverda qoladi."
    },
    {
      "title": "PHP versiyasini bilish",
      "lang": "php",
      "code": [
        "<?php",
        "echo PHP_VERSION, \"\\n\";          // masalan 8.4.1",
        "echo PHP_MAJOR_VERSION, \"\\n\";    // 8",
        "echo PHP_OS_FAMILY, \"\\n\";        // Linux / Windows / Darwin"
      ]
    }
  ],
  "pitfalls": [
    "PHP kodini brauzerda bevosita (`file://`) ochsangiz, u bajarilmaydi, matn sifatida ko'rinadi: PHP server yoki CLI kerak.",
    "Eski darsliklardagi `mysql_*` funksiyalari PHP 7 da olib tashlangan: zamonaviy kod PDO yoki mysqli ishlatadi.",
    "PHP'ni faqat 'sayt skripti' deb o'ylash noto'g'ri: u CLI, API va navbat ishlovchisi sifatida ham ishlatiladi.",
    "Eski versiyalar (7.x, 8.1) xavfsizlik tuzatishlarini olmaydi: loyihada faol versiyani tanlang."
  ]
});
