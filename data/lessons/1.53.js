/* Chuqur dars: 1.53. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.53", {
  "lesson": [
    "### Fayl yuklash oqimi",
    "1. HTML formada `method=\"post\"` va `enctype=\"multipart/form-data\"` bo'lishi shart; `<input type=\"file\" name=\"rasm\">`.",
    "2. PHP faylni vaqtinchalik papkaga yozadi va `$_FILES['rasm']` massivini to'ldiradi.",
    "3. Siz faylni tekshirib, `move_uploaded_file()` bilan doimiy joyga ko'chirasiz (aks holda vaqtinchalik fayl so'rov oxirida o'chadi).",
    "",
    "### $_FILES tuzilishi",
    "`name` (asl nom), `type` (brauzer aytgan MIME, **ishonchsiz**), `tmp_name` (vaqtinchalik yo'l), `error` (xato kodi), `size` (bayt).",
    "",
    "### Xato kodlari",
    "`UPLOAD_ERR_OK` (0), `UPLOAD_ERR_INI_SIZE` (php.ini limiti), `UPLOAD_ERR_FORM_SIZE`, `UPLOAD_ERR_PARTIAL`, `UPLOAD_ERR_NO_FILE`, `UPLOAD_ERR_NO_TMP_DIR`, `UPLOAD_ERR_CANT_WRITE`.",
    "",
    "### php.ini sozlamalari",
    "`file_uploads=On`, `upload_max_filesize`, `post_max_size` (undan kichik emas bo'lsin, aks holda butun `$_POST` bo'shab qoladi), `max_file_uploads`, `upload_tmp_dir`. Nginx'da `client_max_body_size` ham.",
    "",
    "### Tekshiruv (majburiy)",
    "- `error === UPLOAD_ERR_OK` va `is_uploaded_file($tmp)`.",
    "- Hajm limiti.",
    "- Haqiqiy MIME: `finfo` (`finfo_file`), `$_FILES['type']` ga ishonmang.",
    "- Kengaytma oq ro'yxati (`jpg`, `png`, `pdf`).",
    "- Rasm uchun `getimagesize()`.",
    "- Yangi noyob nom yarating (`bin2hex(random_bytes(16))`), foydalanuvchi nomini ishlatmang.",
    "- Faylni veb-ildizdan tashqarida saqlang yoki ijroni o'chiring.",
    "",
    "### Laravel",
    "`$request->file('rasm')->store('rasmlar')`, `Storage`, validatsiya `mimes:jpg,png|max:2048`.",
    "",
    "### Qadamlar batafsil",
    "1. **Forma:** `enctype=\"multipart/form-data\"` bo'lmasa fayl yuborilmaydi, faqat nomi keladi.",
    "2. **Server:** PHP vaqtinchalik faylni `upload_tmp_dir` ga yozadi.",
    "3. **Skript:** `$_FILES['rasm']` massivini tekshiradi va `move_uploaded_file($tmp, $dest)` bilan ko'chiradi. Funksiya faqat haqiqatan HTTP orqali yuklangan faylni ko'chiradi (xavfsizlik).",
    "4. Skript tugagach, ko'chirilmagan vaqtinchalik fayl o'chadi.",
    "",
    "### Bir nechta fayl",
    "`<input type=\"file\" name=\"rasmlar[]\" multiple>` bo'lsa `$_FILES['rasmlar']['name']` massiv bo'ladi (har kalit uchun alohida massiv): indeks bo'yicha aylaning. `max_file_uploads` limiti (default 20).",
    "",
    "### Xato kodlari ma'nosi",
    "| Kod | Sabab |",
    "|---|---|",
    "| `UPLOAD_ERR_INI_SIZE` | `upload_max_filesize` dan katta |",
    "| `UPLOAD_ERR_FORM_SIZE` | formadagi `MAX_FILE_SIZE` dan katta |",
    "| `UPLOAD_ERR_PARTIAL` | qisman yuklandi |",
    "| `UPLOAD_ERR_NO_FILE` | fayl tanlanmagan |",
    "| `UPLOAD_ERR_NO_TMP_DIR` | vaqtinchalik papka yo'q |",
    "| `UPLOAD_ERR_CANT_WRITE` | diskka yozib bo'lmadi |",
    "",
    "### Rasm tekshiruvi",
    "`getimagesize($tmp)` rasm bo'lmasa `false` qaytaradi va o'lchamlarni beradi. Qo'shimcha: rasmni GD/Imagick bilan qayta saqlash ichiga yashirilgan kodni olib tashlaydi.",
    "",
    "### Saqlash joyi va ko'rsatish",
    "Fayllarni veb-ildizdan tashqarida (`storage/`) saqlab, PHP orqali berish (autentifikatsiya bilan) xavfsizroq. Ommaviy rasmlar uchun alohida papka va Nginx'da PHP ijrosini taqiqlash:",
    "`location /uploads { location ~ \\.php$ { return 403; } }`.",
    "",
    "### Katta fayllar",
    "Brauzer va server limitlari (Nginx `client_max_body_size`, PHP `post_max_size`, `max_execution_time`). Juda katta fayllar uchun bo'lakli yuklash (chunked/TUS) yoki to'g'ridan S3 presigned URL.",
    "",
    "### Laravel",
    "`$request->validate(['rasm' => 'required|image|max:2048'])`, `$request->file('rasm')->store('rasmlar', 'public')`, `Storage::url()`."
  ],
  "examples": [
    {
      "title": "Forma",
      "lang": "html",
      "code": [
        "<form method=\"post\" enctype=\"multipart/form-data\">",
        "  <input type=\"file\" name=\"rasm\" accept=\"image/png,image/jpeg\">",
        "  <button>Yuklash</button>",
        "</form>"
      ]
    },
    {
      "title": "Xavfsiz qabul qilish",
      "lang": "php",
      "code": [
        "<?php",
        "$f = $_FILES['rasm'] ?? null;",
        "if (!$f || $f['error'] !== UPLOAD_ERR_OK) { exit('Yuklashda xato'); }",
        "if ($f['size'] > 2 * 1024 * 1024) { exit('Fayl katta'); }",
        "",
        "$mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);",
        "$ext = ['image/jpeg' => 'jpg', 'image/png' => 'png'][$mime] ?? null;",
        "if (!$ext) { exit('Faqat JPG/PNG'); }",
        "",
        "$name = bin2hex(random_bytes(16)) . '.' . $ext;",
        "move_uploaded_file($f['tmp_name'], __DIR__ . \"/../storage/uploads/$name\");",
        "echo 'OK';"
      ]
    },
    {
      "title": "Ko'p fayl",
      "lang": "php",
      "code": [
        "<?php",
        "$f = $_FILES['rasmlar'];",
        "foreach ($f['name'] as $i => $name) {",
        "    if ($f['error'][$i] !== UPLOAD_ERR_OK) { continue; }",
        "    if (getimagesize($f['tmp_name'][$i]) === false) { continue; }",
        "    move_uploaded_file($f['tmp_name'][$i], __DIR__ . '/up/' . bin2hex(random_bytes(8)) . '.jpg');",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`$_FILES['type']` brauzer yuboradi va soxtalashtirilishi mumkin: `finfo` bilan haqiqiy MIME tekshiring.",
    "Foydalanuvchi fayl nomini o'zgartirmasdan saqlash path traversal va `.php` fayl yuklashga yo'l ochadi.",
    "`post_max_size` `upload_max_filesize` dan kichik bo'lsa katta faylda butun `$_POST` bo'sh qoladi.",
    "Yuklangan faylni PHP bajariladigan papkada saqlash RCE xavfi: ijroni taqiqlang."
  ]
});
