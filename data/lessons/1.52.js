/* Chuqur dars: 1.52. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.52", {
  "lesson": [
    "### Faylga yozish",
    "**Bir martada:** `file_put_contents($p, $data, $flags)`.",
    "- `FILE_APPEND` oxiriga qo'shadi (aks holda faylni ustiga yozadi).",
    "- `LOCK_EX` yozish vaqtida qulf qo'yadi (parallel yozishdan himoya).",
    "",
    "**Oqim bilan:** `fopen` → `fwrite($h, $str)` (yoki `fputs`) → `fclose($h)`.",
    "",
    "### Rejimlar",
    "| Rejim | Ma'nosi |",
    "|---|---|",
    "| `w` | yozish; fayl bo'lsa **bo'shatadi**, bo'lmasa yaratadi |",
    "| `a` | oxiriga qo'shish; bo'lmasa yaratadi |",
    "| `x` | faqat yangi fayl yaratadi; bo'lsa xato |",
    "| `c` | yaratadi yoki ochadi, bo'shatmaydi |",
    "| `+` | o'qish ham mumkin (`w+`, `a+`, `r+`) |",
    "",
    "### Yangi qator",
    "`\"\\n\"` (Linux), `PHP_EOL` platformaga mos. Qo'sh tirnoqli satrda `\\n` ishlaydi, bittada ishlamaydi.",
    "",
    "### Ishonchli yozish",
    "Bir vaqtda ikki jarayon bir faylga yozsa ma'lumot aralashadi: `LOCK_EX`/`flock` yoki **atomik yozish** (vaqtinchalik faylga yozib, `rename` bilan almashtirish).",
    "",
    "### Katalog va ruxsat",
    "`mkdir($d, 0755, true)` ichma-ich papka yaratadi. Yozish uchun veb-serverda ruxsat bo'lishi kerak.",
    "",
    "### Log yozish",
    "Oddiy log: `file_put_contents('app.log', date('c') . \" xabar\\n\", FILE_APPEND | LOCK_EX)`. Jiddiy loyihada `error_log()` yoki Monolog/Laravel Log.",
    "",
    "### Xatolar",
    "`file_put_contents` xatoda `false` qaytaradi; yozilgan bayt sonini qaytaradi. Natijani tekshiring.",
    "",
    "### Yozish funksiyalari",
    "- `fwrite($h, $str)` yozilgan bayt sonini qaytaradi (xatoda `false`); `fputs` — sinonim.",
    "- `file_put_contents($p, $data, $flags)` — ochish, yozish, yopishni bir chaqiruvda bajaradi. `$data` satr, massiv (birlashtiriladi) yoki stream bo'lishi mumkin.",
    "- `fputcsv($h, $arr)` — CSV qatori yozadi (tirnoq va vergulni o'zi to'g'rilaydi).",
    "- `fflush($h)` buferni majburan yozadi, `ftruncate($h, 0)` faylni bo'shatadi.",
    "",
    "### Rejim tanlash",
    "- Yangi fayl, mavjud bo'lsa xato → `x`.",
    "- Log (oxiriga qo'shish) → `a` yoki `FILE_APPEND`.",
    "- To'liq qayta yozish → `w`, lekin atomik yozishni o'ylang.",
    "- Mavjud ma'lumotni saqlab, ichida o'zgartirish → `c` yoki `r+`.",
    "",
    "### CSV yozish",
    "```php",
    "$h = fopen('export.csv', 'w');",
    "fwrite($h, \"\\xEF\\xBB\\xBF\");               // Excel uchun UTF-8 BOM",
    "fputcsv($h, ['ism', 'email']);",
    "fputcsv($h, ['Ali', 'ali@mail.uz']);",
    "fclose($h);",
    "```",
    "",
    "### Parallellik",
    "Ikki so'rov bir vaqtda yozsa:",
    "1. `flock($h, LOCK_EX)` — yozishdan oldin qulf, keyin `LOCK_UN`.",
    "2. `file_put_contents(..., LOCK_EX)`.",
    "3. Atomik: vaqtinchalik faylga yozib `rename`.",
    "Qulf kooperativ (barcha jarayonlar uni ishlatishi kerak).",
    "",
    "### Xatolar va diskning to'lishi",
    "`fwrite` qisman yozishi mumkin (disk to'lgan): qaytgan bayt sonini kutilgan uzunlik bilan solishtiring. `file_put_contents` ham yozilgan bayt sonini qaytaradi.",
    "",
    "### Ruxsat",
    "Yangi fayl ruxsati `umask` ga bog'liq; kerak bo'lsa `chmod($p, 0640)`. Maxfiy fayllarni veb-ildizdan tashqarida saqlang."
  ],
  "examples": [
    {
      "title": "Log yozish",
      "lang": "php",
      "code": [
        "<?php",
        "$line = date('c') . \" | kirish | \" . ($_SERVER['REMOTE_ADDR'] ?? 'cli') . PHP_EOL;",
        "if (file_put_contents(__DIR__ . '/app.log', $line, FILE_APPEND | LOCK_EX) === false) {",
        "    error_log('Log yozilmadi');",
        "}"
      ]
    },
    {
      "title": "fopen bilan",
      "lang": "php",
      "code": [
        "<?php",
        "$h = fopen('out.txt', 'w') or exit('Ochilmadi');",
        "fwrite($h, \"Birinchi qator\\n\");",
        "fwrite($h, \"Ikkinchi qator\\n\");",
        "fclose($h);"
      ]
    },
    {
      "title": "Atomik yozish",
      "lang": "php",
      "code": [
        "<?php",
        "$tmp = tempnam(__DIR__, 'cfg');",
        "file_put_contents($tmp, json_encode($config));",
        "rename($tmp, __DIR__ . '/config.json');   // o'quvchi yarim fayl ko'rmaydi"
      ]
    },
    {
      "title": "flock bilan hisoblagich",
      "lang": "php",
      "code": [
        "<?php",
        "$h = fopen('counter.txt', 'c+');",
        "if (flock($h, LOCK_EX)) {",
        "    $n = (int) stream_get_contents($h);",
        "    ftruncate($h, 0); rewind($h);",
        "    fwrite($h, (string) ($n + 1));",
        "    fflush($h);",
        "    flock($h, LOCK_UN);",
        "}",
        "fclose($h);"
      ]
    }
  ],
  "pitfalls": [
    "`file_put_contents` `FILE_APPEND` siz fayl ustiga yozadi va eski mazmunni yo'qotadi.",
    "`w` rejimi faylni ochilgan zahoti bo'shatadi: yozishda xato bo'lsa ma'lumot yo'qoladi; atomik yozish.",
    "Parallel yozishda `LOCK_EX` ishlatmasangiz qatorlar aralashadi.",
    "Yozish natijasini (`false`) tekshirmaslik disk to'lganini yoki ruxsat yo'qligini yashiradi."
  ]
});
