/* Chuqur dars: 1.55. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.55", {
  "lesson": [
    "### Sessiya nima",
    "Cookie ma'lumotni brauzerda saqlaydi, **sessiya** esa serverda. Brauzerga faqat sessiya identifikatori (`PHPSESSID` cookie) beriladi, haqiqiy ma'lumot serverda (odatda faylda) turadi. Shuning uchun parol, foydalanuvchi ID, savat kabi narsalar uchun sessiya xavfsizroq.",
    "",
    "### Asosiy ishlatish",
    "- `session_start()` — sessiyani boshlaydi yoki davom ettiradi; **chiqishdan oldin** chaqiriladi.",
    "- `$_SESSION['user_id'] = 5;` — yozish, `$_SESSION['user_id']` — o'qish.",
    "- `unset($_SESSION['x'])` — bitta kalitni o'chirish.",
    "- `session_unset()` — hamma o'zgaruvchilarni tozalash; `session_destroy()` — sessiyani yo'q qilish (chiqish/logout).",
    "",
    "### Qanday ishlaydi",
    "1. Birinchi so'rovda PHP noyob ID yaratadi va cookie yuboradi.",
    "2. Keyingi so'rovlarda brauzer shu cookie'ni qaytaradi, PHP shu ID'ga mos ma'lumotni yuklaydi.",
    "Ma'lumot `session.save_path` papkasida (yoki Redis/DB'da) saqlanadi.",
    "",
    "### Xavfsizlik",
    "- Kirishdan keyin `session_regenerate_id(true)` (session fixation himoyasi).",
    "- Cookie: `session.cookie_httponly=1`, `session.cookie_secure=1`, `session.cookie_samesite=Lax`.",
    "- `session.use_strict_mode=1`.",
    "- Logout'da sessiyani va cookie'ni o'chiring.",
    "- Sessiya \"umri\": `session.gc_maxlifetime`.",
    "",
    "### Parallel so'rovlar",
    "Standart fayl sessiyada so'rov sessiyani **qulflaydi**: parallel so'rovlar navbatlashadi. Yozish tugagach `session_write_close()` bilan qulfni oching.",
    "",
    "### Laravel",
    "Laravel o'z sessiya tizimiga ega (`session()` helper, Redis/DB drayverlari), lekin ostidagi g'oya bir xil.",
    "",
    "### Sessiya sozlamalari (php.ini)",
    "`session.save_handler` (files/redis), `session.save_path`, `session.name` (default PHPSESSID), `session.gc_maxlifetime` (soniya), `session.cookie_lifetime`, `session.use_strict_mode`, `session.use_only_cookies`, `session.cookie_httponly/secure/samesite`. Ko'p serverda sessiyalarni **Redis** yoki DB'da saqlash kerak (fayl sessiya bitta serverga bog'langan).",
    "",
    "### Sessiya hayot tsikli",
    "1. `session_start()` — ID bo'lmasa yaratadi, bo'lsa ma'lumotni yuklaydi, faylni qulflaydi.",
    "2. `$_SESSION` bilan ishlash.",
    "3. So'rov oxirida (yoki `session_write_close()`) ma'lumot saqlanadi, qulf ochiladi.",
    "4. GC eski sessiyalarni o'chiradi.",
    "",
    "### Foydali funksiyalar",
    "`session_id()`, `session_name()`, `session_status()` (`PHP_SESSION_ACTIVE`), `session_regenerate_id(true)`, `session_set_cookie_params()` (start'dan oldin), `session_write_close()`, `session_unset()`, `session_destroy()`.",
    "",
    "### Flash xabarlar",
    "Redirectdan keyin bir marta ko'rsatiladigan xabar: `$_SESSION['flash'] = 'Saqlandi'` → keyingi sahifada o'qib `unset` qilish. Laravel `->with('success', ...)` shunday ishlaydi.",
    "",
    "### Xavfsizlik ro'yxati",
    "- Kirishdan keyin ID'ni yangilang.",
    "- `httponly`, `secure`, `samesite` bayroqlari.",
    "- URL'da sessiya ID'si bo'lmasin (`use_only_cookies=1`).",
    "- Sezgir amallar uchun parolni qayta so'rang.",
    "- Faoliyatsizlikdan keyin sessiyani tugating (`$_SESSION['last']` bilan).",
    "- CSRF tokenini sessiyada saqlang.",
    "",
    "### Sessiya va masshtab",
    "Sticky session yoki umumiy saqlash (Redis) kerak; JWT/stateless variant boshqa kompromisslarga ega."
  ],
  "examples": [
    {
      "title": "Login oqimi",
      "lang": "php",
      "code": [
        "<?php",
        "session_start();",
        "",
        "if (login_ok($_POST['email'], $_POST['password'])) {",
        "    session_regenerate_id(true);",
        "    $_SESSION['user_id'] = 5;",
        "    header('Location: /panel.php'); exit;",
        "}"
      ]
    },
    {
      "title": "Himoyalangan sahifa va logout",
      "lang": "php",
      "code": [
        "<?php",
        "session_start();",
        "if (empty($_SESSION['user_id'])) { header('Location: /login.php'); exit; }",
        "echo \"Salom, foydalanuvchi #{$_SESSION['user_id']}\";",
        "",
        "// logout.php",
        "session_start();",
        "$_SESSION = [];",
        "session_destroy();",
        "setcookie(session_name(), '', time() - 3600, '/');"
      ]
    },
    {
      "title": "Faoliyatsizlik taymeri",
      "lang": "php",
      "code": [
        "<?php",
        "session_start();",
        "$limit = 1800; // 30 daqiqa",
        "if (isset($_SESSION['last']) && time() - $_SESSION['last'] > $limit) {",
        "    session_unset(); session_destroy();",
        "    header('Location: /login.php?expired=1'); exit;",
        "}",
        "$_SESSION['last'] = time();"
      ]
    },
    {
      "title": "Flash xabar",
      "lang": "php",
      "code": [
        "<?php",
        "session_start();",
        "$_SESSION['flash'] = 'Saqlandi';",
        "header('Location: /list.php'); exit;",
        "",
        "// list.php",
        "session_start();",
        "if (!empty($_SESSION['flash'])) { echo htmlspecialchars($_SESSION['flash']); unset($_SESSION['flash']); }"
      ]
    }
  ],
  "pitfalls": [
    "`session_start()` chiqishdan keyin chaqirilsa 'headers already sent'.",
    "Kirishdan keyin `session_regenerate_id(true)` chaqirmaslik session fixation zaifligi.",
    "Fayl sessiyada parallel so'rovlar bir-birini kutadi: `session_write_close()` bilan qulfni erta oching.",
    "`session_destroy()` `$_SESSION` ni joriy so'rovda tozalamaydi: avval `$_SESSION = []`."
  ]
});
