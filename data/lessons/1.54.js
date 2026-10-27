/* Chuqur dars: 1.54. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.54", {
  "lesson": [
    "### Cookie nima",
    "Cookie — server brauzerga yuborib, brauzer saqlab, har keyingi so'rovda qaytarib yuboradigan kichik ma'lumot. Foydalanuvchini tanish, sozlamalarni eslab qolish uchun.",
    "",
    "### O'rnatish",
    "`setcookie($name, $value, $options)`. Zamonaviy shakl massiv bilan:",
    "```php",
    "setcookie('til', 'uz', [",
    "  'expires'  => time() + 86400 * 30,",
    "  'path'     => '/',",
    "  'secure'   => true,",
    "  'httponly' => true,",
    "  'samesite' => 'Lax',",
    "]);",
    "```",
    "`setcookie` **HTML chiqishidan oldin** chaqirilishi kerak (header sifatida yuboriladi).",
    "",
    "### O'qish",
    "`$_COOKIE['til']`. Muhim: yangi o'rnatilgan cookie **keyingi so'rovdan** boshlab `$_COOKIE`da ko'rinadi, joriy so'rovda emas.",
    "",
    "### O'chirish",
    "Muddatni o'tmishga qo'ying: `setcookie('til', '', time() - 3600, '/')` (xuddi shu path/domain bilan).",
    "",
    "### Atributlar",
    "- `expires`/`max-age`: muddat (yo'q bo'lsa sessiya cookie, brauzer yopilganda o'chadi).",
    "- `path`, `domain`: qayerda yuboriladi.",
    "- `secure`: faqat HTTPS.",
    "- `httponly`: JavaScript o'qiy olmaydi (XSS ta'sirini kamaytiradi).",
    "- `samesite`: `Lax`/`Strict`/`None`: CSRF himoyasi.",
    "",
    "### Cheklovlar",
    "~4 KB, har domen uchun ~50 ta. Cookie foydalanuvchi qo'lida: **o'zgartirilishi mumkin**, shuning uchun parol yoki rolni cookie'ga yozmang. Sessiya ID cookie'da, ma'lumot serverda saqlanadi (keyingi mavzu).",
    "",
    "### Maxfiylik",
    "GDPR/cookie rozilik talablari: analitika/reklama cookie'lari uchun foydalanuvchi roziligi.",
    "",
    "### setcookie parametrlari",
    "- `name`, `value` (satr; maxsus belgilar URL-kodlanadi).",
    "- `expires` — timestamp (`time() + 3600`); `0` yoki berilmasa sessiya cookie.",
    "- `path` — `/` butun sayt, aks holda joriy papka.",
    "- `domain` — `.sayt.uz` subdomenlar bilan ham.",
    "- `secure`, `httponly`, `samesite`.",
    "",
    "### SameSite qiymatlari",
    "- `Strict`: faqat shu sayt ichidan so'rovda yuboriladi (eng qat'iy).",
    "- `Lax`: yuqori darajali navigatsiya (havolani bosish)da yuboriladi; odatiy tanlov.",
    "- `None`: har doim (faqat `Secure` bilan), uchinchi tomon kontekstida.",
    "",
    "### Tekshirish",
    "`isset($_COOKIE['nom'])`; qiymat — foydalanuvchi qo'lida, shuning uchun uni **ishonchsiz kiritma** deb qarang (tekshiring, tozalang).",
    "",
    "### Brauzerda ko'rish",
    "DevTools → Application → Cookies: nom, qiymat, muddat, flaglar. Tekshirish uchun `curl -i` bilan `Set-Cookie` headerini ko'rish mumkin.",
    "",
    "### Cookie'lar va sessiya",
    "Sessiya ID cookie'si (`PHPSESSID`) ham oddiy cookie. Haqiqiy foydalanuvchi ma'lumoti sessiyada (serverda) saqlanadi. \"Meni eslab qol\" uchun uzoq muddatli tasodifiy token cookie'da va uning xeshi bazada saqlanadi.",
    "",
    "### Maxfiylik va qonun",
    "Majburiy bo'lmagan cookie'lar (analitika, reklama) uchun foydalanuvchi roziligi (GDPR/ePrivacy) kerak. Cookie banner'ni o'ylab qo'ying.",
    "",
    "### Cheklovlar",
    "Hajm ~4096 bayt (nom+qiymat), domen uchun ~50 ta, har so'rovda hammasi yuboriladi: katta cookie sahifani sekinlashtiradi. Katta ma'lumot uchun `localStorage` yoki server.",
    "",
    "### Laravel",
    "`cookie()`, `Cookie::queue()`, shifrlangan cookie'lar (`EncryptCookies` middleware) — qiymat avtomatik shifrlanadi."
  ],
  "examples": [
    {
      "title": "Cookie o'rnatish va o'qish",
      "lang": "php",
      "code": [
        "<?php",
        "if (!isset($_COOKIE['til'])) {",
        "    setcookie('til', 'uz', ['expires' => time() + 2592000, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);",
        "    $til = 'uz';          // $_COOKIE hozircha bo'sh: qiymatni o'zimiz olamiz",
        "} else {",
        "    $til = $_COOKIE['til'];",
        "}",
        "echo \"Til: $til\";"
      ]
    },
    {
      "title": "O'chirish",
      "lang": "php",
      "code": [
        "<?php",
        "setcookie('til', '', ['expires' => time() - 3600, 'path' => '/']);"
      ]
    },
    {
      "title": "Meni eslab qol (token)",
      "lang": "php",
      "code": [
        "<?php",
        "// kirishdan keyin",
        "$token = bin2hex(random_bytes(32));",
        "save_remember_hash($userId, hash('sha256', $token));",
        "setcookie('remember', $token, ['expires' => time() + 60*60*24*30, 'path' => '/', 'secure' => true, 'httponly' => true, 'samesite' => 'Lax']);",
        "",
        "// keyingi tashrifda",
        "$t = $_COOKIE['remember'] ?? '';",
        "$user = $t ? find_user_by_hash(hash('sha256', $t)) : null;"
      ]
    }
  ],
  "pitfalls": [
    "`setcookie` chiqishdan keyin chaqirilsa 'headers already sent': birinchi `echo` dan oldin chaqiring.",
    "Yangi cookie joriy so'rovda `$_COOKIE`da ko'rinmaydi: keyingi so'rovda paydo bo'ladi.",
    "Cookie'ga parol/rol yozish xavfli: foydalanuvchi uni o'zgartira oladi.",
    "`secure`, `httponly`, `samesite` ni qo'ymaslik XSS/CSRF ta'sirini kuchaytiradi."
  ]
});
