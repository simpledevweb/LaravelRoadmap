/* Chuqur dars: 1.50. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.50", {
  "lesson": [
    "### Fayl bilan ishlash tushunchasi",
    "PHP serverda fayllarni o'qish, yaratish, yangilash va o'chirish imkonini beradi: loglar, konfiguratsiya, yuklangan hujjatlar, eksport fayllari.",
    "",
    "### Asosiy funksiyalar",
    "- `file_exists($p)`, `is_file`, `is_dir`, `is_readable`, `is_writable`",
    "- `filesize`, `filemtime`, `pathinfo`, `basename`, `dirname`, `realpath`",
    "- `readfile($p)` faylni to'g'ridan-to'g'ri chiqishga uzatadi",
    "- `copy`, `rename`, `unlink` (o'chirish), `mkdir`, `rmdir`, `scandir`, `glob`",
    "",
    "### Ikki yondashuv",
    "1. **Oddiy:** `file_get_contents`, `file_put_contents`: kichik fayllar uchun qulay.",
    "2. **Oqim (stream):** `fopen` → `fgets/fread/fwrite` → `fclose`: katta fayllar uchun xotirani tejaydi.",
    "",
    "### fopen rejimlari",
    "`r` (o'qish), `r+` (o'qish+yozish), `w` (yozish, mavjudni **bo'shatadi**), `w+`, `a` (oxiriga qo'shish), `a+`, `x` (yangi fayl, mavjud bo'lsa xato), `c`. `b` bayrog'i (`rb`) binar fayl uchun.",
    "",
    "### Ruxsatlar",
    "Veb-server foydalanuvchisi (www-data) fayl yoki papkaga yozishi uchun ruxsat bo'lishi kerak. Yozish papkasini veb-ildizdan tashqarida saqlang. Odatiy ruxsatlar: fayl `0644`, papka `0755`.",
    "",
    "### Xavfsizlik",
    "Foydalanuvchi bergan fayl nomi `../../etc/passwd` bo'lishi mumkin (path traversal): `basename()` va `realpath()` bilan tekshiring. Yuklangan fayllarni PHP sifatida bajarilmaydigan joyda saqlang.",
    "",
    "### Xatolarni boshqarish",
    "`fopen` muvaffaqiyatsiz bo'lsa `false` qaytaradi va Warning chiqaradi: natijani tekshiring.",
    "",
    "### Papka (katalog) bilan ishlash",
    "- `scandir($d)` fayllar ro'yxati (`.` va `..` ham keladi), `glob('*.txt')` andoza bo'yicha.",
    "- `mkdir($d, 0755, true)` ichma-ich yaratadi, `rmdir` bo'sh papkani o'chiradi.",
    "- `is_dir`, `opendir`/`readdir`/`closedir`, `DirectoryIterator`, `RecursiveDirectoryIterator` (daraxt).",
    "",
    "### Fayl nusxalash va o'chirish",
    "`copy($a, $b)`, `rename($a, $b)` (siljitish ham), `unlink($f)` (o'chirish), `touch($f)` (vaqtni yangilaydi/yaratadi). `unlink` mavjud bo'lmagan faylda Warning beradi: avval `file_exists`.",
    "",
    "### Yo'l funksiyalari",
    "`pathinfo('/a/b/rasm.final.png')` → `dirname`, `basename`, `extension` (`png`), `filename` (`rasm.final`). `realpath()` haqiqiy mutlaq yo'lni beradi va `..` ni hal qiladi (fayl yo'q bo'lsa `false`).",
    "",
    "### Ruxsatlar",
    "`chmod($f, 0644)`, `fileperms`, `is_writable`. Linux'da egasi/guruh/boshqalar uchun o'qish/yozish/bajarish bitlari. Veb-server foydalanuvchisi (`www-data`) kerakli papkaga yozishi shart, lekin ortiqcha ruxsat bermang.",
    "",
    "### Vaqt va hajm",
    "`filesize()` bayt, `filemtime()` o'zgartirilgan vaqt (timestamp). Natijalar kesh qilinadi: o'zgartirgach `clearstatcache()`.",
    "",
    "### Joriy papka",
    "`getcwd()` (ishchi papka), `__DIR__` (fayl papkasi). Ular farq qilishi mumkin: CLI'da `cwd` skript yo'lidan boshqa.",
    "",
    "### Xavfsizlik va barqarorlik",
    "- Foydalanuvchi kiritgan nomni `basename`/`realpath` bilan tekshiring.",
    "- `unlink` va `rename` xatosini tekshiring.",
    "- Parallel so'rovlar uchun qulf yoki atomik amal."
  ],
  "examples": [
    {
      "title": "Fayl ma'lumoti",
      "lang": "php",
      "code": [
        "<?php",
        "$p = __DIR__ . '/data.txt';",
        "if (file_exists($p) && is_readable($p)) {",
        "    echo filesize($p), \" bayt\\n\";",
        "    echo date('Y-m-d H:i', filemtime($p));",
        "}",
        "print_r(pathinfo('/var/www/rasm.final.png'));"
      ]
    },
    {
      "title": "Xavfsiz yo'l",
      "lang": "php",
      "code": [
        "<?php",
        "$base = realpath(__DIR__ . '/storage');",
        "$file = realpath($base . '/' . basename($_GET['f'] ?? ''));",
        "if ($file === false || !str_starts_with($file, $base . DIRECTORY_SEPARATOR)) {",
        "    http_response_code(403); exit;",
        "}",
        "readfile($file);"
      ]
    },
    {
      "title": "Papka ro'yxati",
      "lang": "php",
      "code": [
        "<?php",
        "$dir = __DIR__ . '/uploads';",
        "foreach (array_diff(scandir($dir), ['.', '..']) as $name) {",
        "    $p = \"$dir/$name\";",
        "    printf(\"%s  %d bayt  %s\\n\", $name, filesize($p), date('Y-m-d', filemtime($p)));",
        "}",
        "print_r(glob($dir . '/*.{jpg,png}', GLOB_BRACE));"
      ]
    }
  ],
  "pitfalls": [
    "`fopen($p, 'w')` mavjud faylni darhol bo'shatadi: ma'lumotni yo'qotmaslik uchun `a` yoki `x` ni o'ylab tanlang.",
    "Foydalanuvchi bergan nom bilan fayl ochish path traversal: `basename` va `realpath`.",
    "`fopen` xatoda `false` qaytaradi: tekshirmasdan `fwrite` chaqirish xato beradi.",
    "Yozish papkasiga 0777 berish xavfli: faqat kerakli foydalanuvchiga ruxsat bering."
  ]
});
