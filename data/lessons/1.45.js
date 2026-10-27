/* Chuqur dars: 1.45. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.45", {
  "lesson": [
    "### Asosiy sintaksis",
    "PHP skripti `<?php` bilan boshlanadi va `?>` bilan tugaydi (faqat PHP fayllarida yopuvchi teg tashlab ketiladi). Har bir ifoda **nuqtali vergul** `;` bilan tugaydi. Kod bloklari `{ ... }` ichida.",
    "",
    "```php",
    "<?php",
    "echo \"Salom\";",
    "```",
    "",
    "### Case sensitivity",
    "- **O'zgaruvchi nomlari harfga sezgir:** `$ism` va `$Ism` boshqa-boshqa.",
    "- **Kalit so'zlar, funksiya va klass nomlari sezgir emas:** `ECHO`, `Echo`, `echo` bir xil. Lekin kod uslubi uchun bir xil yozing.",
    "",
    "### Chiqarish",
    "`echo` va `print` matn chiqaradi, `var_dump()` tipni ham ko'rsatadi.",
    "",
    "### HTML bilan aralashma",
    "PHP bloklaridan tashqaridagi hamma narsa chiqishga o'tadi. `<?= $x ?>` — qisqa `echo`.",
    "",
    "### O'zgaruvchilar",
    "`$` bilan boshlanadi, raqam bilan emas harf yoki `_` bilan boshlanishi kerak: `$yosh`, `$_tmp`. E'lon qilish kalit so'zi yo'q: birinchi qiymat berilganda yaratiladi.",
    "",
    "### Bo'shliq va qatorlar",
    "Bo'shliq va yangi qatorlar ma'noga ta'sir qilmaydi, lekin o'qilish uchun formatlang (PSR-12: 4 ta bo'shliq indent).",
    "",
    "### Xatolar",
    "Nuqtali vergul unutilsa: `Parse error: syntax error, unexpected ...`. Xato xabaridagi **qator raqamiga** qarang: ko'pincha muammo oldingi qatorda.",
    "",
    "### Ifoda va statement",
    "`echo 5 + 3;` — bitta statement, ichida `5 + 3` ifoda. Bir qatorda bir nechta statement yozish mumkin (`$a = 1; $b = 2;`), lekin o'qilish uchun har birini alohida qatorga yozing.",
    "",
    "### Nomlash qoidalari",
    "- O'zgaruvchi `$` bilan boshlanadi, keyin harf yoki `_`, so'ng harf/raqam/`_`: `$user_name`, `$userName`.",
    "- Raqam bilan boshlanmaydi (`$1x` xato) va bo'shliq/`-` bo'lmaydi.",
    "- Zaxiralangan so'zlar (`class`, `function`, `if`) funksiya nomi emas, lekin o'zgaruvchi nomi bo'la oladi (`$class`); `$this` maxsus.",
    "- Uslub: o'zgaruvchi va funksiya `camelCase` yoki `snake_case` (loyihada bittasini tanlang), klass `PascalCase`, konstanta `UPPER_SNAKE`.",
    "",
    "### Chiqarish usullari",
    "`echo \"a\", \"b\";` (bir nechta argument), `print \"a\";`, `printf(\"%s-%d\", \"x\", 5);`, `var_dump($x)` (debug), `print_r($arr)` (massiv). Qo'sh tirnoqda o'zgaruvchi qiymati o'rniga qo'yiladi: `\"Salom $ism\"`; bittada esa aynan yoziladi.",
    "",
    "### Qisqa teg",
    "`<?= $x ?>` ≡ `<?php echo $x; ?>`. `<? ... ?>` (short_open_tag) o'chirilgan bo'lishi mumkin, ishlatmang.",
    "",
    "### Xato xabarlarini o'qish",
    "`Parse error: syntax error, unexpected token \";\", expecting \"]\" in /var/www/index.php on line 7` — fayl va **qator raqami** ko'rsatilgan; ko'pincha oldingi qatorda yopilmagan qavs/tirnoq/nuqtali vergul bor.",
    "",
    "### Kod uslubi",
    "PSR-12 standarti: 4 ta bo'shliq indent, `{` yangi qatorda (klass/funksiya), `strict_types=1`, fayl oxirida bo'sh qator. Pint yoki PHP CS Fixer avtomatik formatlaydi."
  ],
  "examples": [
    {
      "title": "Case sensitivity",
      "lang": "php",
      "code": [
        "<?php",
        "$ism = \"Ali\";",
        "ECHO \"Salom, $ism\\n\";     // kalit so'z harfga sezgir emas",
        "echo $Ism ?? 'yo\\'q';       // boshqa o'zgaruvchi: 'yo'q'"
      ]
    },
    {
      "title": "HTML bilan",
      "lang": "php",
      "code": [
        "<?php $items = ['olma', 'nok']; ?>",
        "<ul>",
        "<?php foreach ($items as $i): ?>",
        "  <li><?= htmlspecialchars($i) ?></li>",
        "<?php endforeach; ?>",
        "</ul>"
      ]
    },
    {
      "title": "Chiqarish usullari",
      "lang": "php",
      "code": [
        "<?php",
        "$ism = \"Ali\"; $yosh = 25;",
        "echo \"Salom, $ism!\", \" Yosh: \", $yosh, \"\\n\";",
        "print \"print bitta qiymat\\n\";",
        "printf(\"%s %d yosh\\n\", $ism, $yosh);",
        "var_dump($yosh);        // int(25)"
      ]
    }
  ],
  "pitfalls": [
    "`;` unutilsa parse error: xato ko'rsatgan qatordan oldingi qatorni ham tekshiring.",
    "`$ism` va `$Ism` boshqa o'zgaruvchi: katta-kichik harf xatosi 'Undefined variable' beradi.",
    "`?>` dan keyingi bo'sh qator chiqishga o'tib, 'headers already sent' xatosiga olib kelishi mumkin.",
    "Kalit so'zlar harfga sezgir emas deb har xil yozish kod o'qilishini buzadi: bir xil uslub saqlang.",
    "`'Salom $ism'` bitta tirnoqda o'zgaruvchi qiymati chiqmaydi: qo'sh tirnoq ishlating."
  ]
});
