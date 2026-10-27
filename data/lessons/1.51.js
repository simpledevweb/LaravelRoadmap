/* Chuqur dars: 1.51. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.51", {
  "lesson": [
    "### Faylni ochish va o'qish",
    "Fayl o'qishning ikki yo'li bor: bir martada va qismlab.",
    "",
    "**Bir martada:**",
    "- `file_get_contents($p)` butun faylni satr sifatida.",
    "- `file($p, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)` qatorlar massivi sifatida.",
    "- `readfile($p)` to'g'ridan-to'g'ri chiqishga.",
    "",
    "**Qismlab (stream):** `fopen($p, 'r')` fayl dastagini (handle) qaytaradi, so'ng:",
    "- `fgets($h)` bitta qator",
    "- `fgetc($h)` bitta belgi",
    "- `fread($h, $length)` ko'rsatilgan bayt",
    "- `feof($h)` oxiriga yetdimi",
    "- `fclose($h)` yopish (majburiy)",
    "",
    "### Katta fayllar",
    "`file_get_contents` butun faylni xotiraga yuklaydi: katta faylda `memory_limit` to'ladi. `fgets` bilan qator-qator o'qing yoki generator (`yield`) ishlating.",
    "",
    "### CSV va strukturalangan fayllar",
    "`fgetcsv($h)` CSV qatorini massivga ajratadi; `SplFileObject` qulay OOP shakli.",
    "",
    "### Kodlash",
    "Fayl kodlashi (UTF-8, BOM) muhim: BOM bilan kelgan faylning birinchi belgisi ko'rinmas bo'ladi. `mb_convert_encoding` bilan keltiring.",
    "",
    "### Xatolar",
    "Fayl yo'q bo'lsa `fopen` `false` qaytaradi va Warning beradi. `@fopen` bilan yashirmang: `file_exists` yoki natijani tekshiring.",
    "",
    "### O'qish funksiyalari taqqoslash",
    "| Funksiya | Qaytaradi | Katta faylga |",
    "|---|---|---|",
    "| `file_get_contents` | butun matn | xavfli (xotira) |",
    "| `file()` | qatorlar massivi | xavfli |",
    "| `fgets($h)` | bitta qator | yaxshi |",
    "| `fread($h, N)` | N bayt | yaxshi |",
    "| `fgetc($h)` | bitta belgi | sekin |",
    "| `fgetcsv($h)` | CSV qator massivi | yaxshi |",
    "| `stream_get_contents` | qolgan hammasi | ehtiyot |",
    "",
    "### fgets nuanslari",
    "`fgets` qator oxiridagi `\\n` ni ham qaytaradi: `trim()` yoki `rtrim($l, \"\\r\\n\")`. Windows fayllarida `\\r\\n` bo'ladi. Uzunlik chegarasi: `fgets($h, 1024)`.",
    "",
    "### Oxirini aniqlash",
    "`feof($h)` oxirgi o'qishdan **keyin** `true` bo'ladi. Shu sabab `while (!feof($h)) { echo fgets($h); }` oxirida bo'sh `false` o'qishi mumkin. Aniq usul: `while (($line = fgets($h)) !== false)`.",
    "",
    "### Pozitsiya",
    "`ftell($h)` joriy joy, `fseek($h, 0)` yoki `rewind($h)` boshiga qaytish. `r+` rejimida o'qish va yozish ikkala ham mumkin.",
    "",
    "### Binar fayllar",
    "`fopen($p, 'rb')` va `fread` bilan bo'lak-bo'lak (masalan 8192 bayt). `unpack()` bilan binar ma'lumotni ochish. Windows'da `b` bayrog'i muhim (`\\r\\n` o'zgarmasligi uchun).",
    "",
    "### SplFileObject",
    "OOP variant: `foreach (new SplFileObject($p) as $n => $line)`. CSV uchun `setFlags(SplFileObject::READ_CSV)`.",
    "",
    "### Generator bilan",
    "Katta faylni xotira tejab qayta ishlash:",
    "```php",
    "function lines(string $p): Generator { $h = fopen($p, 'r'); while (($l = fgets($h)) !== false) yield rtrim($l); fclose($h); }",
    "```"
  ],
  "examples": [
    {
      "title": "Qator-qator o'qish",
      "lang": "php",
      "code": [
        "<?php",
        "$h = fopen(__DIR__ . '/names.txt', 'r');",
        "if ($h === false) { exit('Fayl ochilmadi'); }",
        "while (($line = fgets($h)) !== false) {",
        "    echo trim($line), \"\\n\";",
        "}",
        "fclose($h);"
      ]
    },
    {
      "title": "Butun fayl va massiv",
      "lang": "php",
      "code": [
        "<?php",
        "$text  = file_get_contents('names.txt');",
        "$lines = file('names.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);",
        "echo count($lines), \" qator\";"
      ]
    },
    {
      "title": "CSV",
      "lang": "php",
      "code": [
        "<?php",
        "$h = fopen('users.csv', 'r');",
        "$header = fgetcsv($h);",
        "while (($row = fgetcsv($h)) !== false) {",
        "    $user = array_combine($header, $row);",
        "    echo $user['email'], \"\\n\";",
        "}",
        "fclose($h);"
      ]
    },
    {
      "title": "Generator bilan o'qish",
      "lang": "php",
      "code": [
        "<?php",
        "function lines(string $path): Generator",
        "{",
        "    $h = fopen($path, 'r') ?: throw new RuntimeException(\"Ochilmadi: $path\");",
        "    try {",
        "        while (($l = fgets($h)) !== false) { yield rtrim($l, \"\\r\\n\"); }",
        "    } finally { fclose($h); }",
        "}",
        "foreach (lines('big.log') as $i => $l) { if ($i >= 5) break; echo $l, \"\\n\"; }"
      ]
    }
  ],
  "pitfalls": [
    "`while (!feof($h))` oxirgi qatordan keyin bo'sh `false` o'qib qo'yadi: `while (($l = fgets($h)) !== false)` xavfsizroq.",
    "`fclose` qilinmasa resurs yopilmay qoladi (uzun skriptda leak).",
    "Katta faylni `file_get_contents` bilan o'qish OOM beradi: stream.",
    "UTF-8 BOM birinchi belgini buzadi: faylni BOM'siz saqlang yoki uni kesib oling."
  ]
});
