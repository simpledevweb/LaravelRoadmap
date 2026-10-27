/* Chuqur dars: 1.37. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.37", {
  "lesson": [
    "### Fayl va stream",
    "`fopen/fgets/fread/fwrite/fclose` — oqim bilan ishlash. `file_get_contents`/`file()` butun faylni xotiraga yuklaydi (kichik fayl uchun mos). Katta fayl uchun **stream**: xotira fayl hajmiga bog'liq emas. `SplFileObject` — OOP shakli (`foreach` bilan qator, `setFlags(READ_CSV)`).",
    "",
    "### Maxsus oqimlar",
    "`php://stdin/stdout/stderr`, `php://memory`, `php://temp[/maxmemory:N]`, `php://input` (raw so'rov tanasi), `php://output`. Wrapper'lar: `file://`, `http://` (`allow_url_fopen`), `phar://`, `data://`, `compress.zlib://`.",
    "",
    "### Bir vaqtda yozish",
    "Ikki jarayon bir faylga yozsa, ma'lumot aralashadi. Yechimlar:",
    "- `flock($h, LOCK_EX)` (kooperativ qulf, NFS'da ishonchsiz).",
    "- **Atomik yozish**: vaqtinchalik faylga yozing, `rename()` bilan almashtiring (bir fayl tizimida rename atomik): o'quvchi hech qachon yarim fayl ko'rmaydi.",
    "- `file_put_contents($f, $d, LOCK_EX | FILE_APPEND)` log uchun.",
    "",
    "### Xavfsizlik",
    "- **Path traversal**: foydalanuvchi bergan nomda `../`. `basename()`, `realpath()` va asosiy papka ichida ekanini tekshirish; faylni `public/` dan tashqarida saqlash.",
    "- Yuklanayotgan faylni MIME/kengaytma va mazmuniga ko'ra tekshiring, nomini o'zingiz yarating.",
    "- `include $userInput` — LFI/RCE.",
    "- Maxfiy ruxsatlar: `0640`, `umask`.",
    "",
    "### Laravel",
    "`Storage` fasadi (Flysystem) local/S3 farqini yashiradi, `Storage::readStream/writeStream`, `response()->streamDownload()`, `LazyCollection::make(function() {...})` fayl satrlari uchun.",
    "",
    "### Xato bilan ishlash",
    "`fopen` muvaffaqiyatsizlikda `false` va Warning beradi: natijani tekshiring; `try/finally` bilan `fclose`.",
    "",
    "### Fayl funksiyalari to'plami",
    "- O'qish/yozish: `file_get_contents`, `file_put_contents($f, $d, FILE_APPEND|LOCK_EX)`, `file($f, FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES)`, `readfile`, `fpassthru`.",
    "- Ochiq oqim: `fopen` rejimlari `r r+ w w+ a a+ x x+ c c+` (+ `b` binary); `fread`, `fgets`, `fgetc`, `fgetcsv/fputcsv`, `fwrite`, `fflush`, `ftruncate`, `fseek/ftell/rewind`, `feof`, `stream_get_contents`, `fclose`.",
    "- Meta: `file_exists`, `is_file/is_dir/is_readable/is_writable`, `filesize`, `filemtime`, `stat`, `touch`, `chmod/chown`, `fileperms`, `realpath`, `pathinfo`, `basename`, `dirname`, `tempnam`, `sys_get_temp_dir`, `tmpfile`.",
    "- Fayl tizimi: `mkdir($d, 0755, true)`, `rmdir`, `unlink`, `rename`, `copy`, `scandir`, `glob`, `symlink`, `disk_free_space`.",
    "- `umask`, `clearstatcache()` (stat natijalari keshlanadi!).",
    "",
    "### Stream konteksti va filtrlar",
    "`stream_context_create` (HTTP header, SSL, timeout), `stream_filter_append($h, 'string.toupper')`, `convert.base64-encode`, `zlib.deflate`; wrapper'lar: `file`, `http(s)`, `ftp`, `php`, `data`, `glob`, `phar`, `zip`, `compress.zlib`, `ssh2`; `stream_wrapper_register` o'zingiznikini qo'shish (Flysystem).",
    "",
    "### Qulflash va parallellik",
    "`flock($h, LOCK_SH|LOCK_EX|LOCK_UN|LOCK_NB)` — advisory (kooperativ); NFS/ba'zi tizimlarda ishonchsiz; processlar orasida qulfni hammasi qo'llashi kerak. Muqobil: DB advisory lock, Redis qulfi (`Cache::lock`), Symfony Lock, atomik `rename`, `O_EXCL` (`fopen($f, 'x')`) bilan fayl yaratib qulf.",
    "",
    "### Katta fayl strategiyalari",
    "- Chunk o'qish: `while (!feof($h)) { $buf = fread($h, 8192); ... }`.",
    "- CSV: `fgetcsv` + generator; bulk insert 500–1000 qator.",
    "- Yuklab olish: `response()->streamDownload`, `X-Accel-Redirect` (Nginx) yoki `X-Sendfile`.",
    "- Yuklash: chunked upload, `UploadedFile::store`, antivirus, MIME tekshirish (`finfo`), hajm limiti (`post_max_size`).",
    "",
    "### Xavfsizlik",
    "Path traversal (`../`, `..\\`, null bayt eskirgan), symlink hujumlari (`realpath` bilan hal qilish), upload'larni web ildizidan tashqarida saqlash, ijro huquqini olib tashlash, noyob nom, kengaytma oq ro'yxati, `Content-Disposition`/`nosniff`, `open_basedir`. Vaqtinchalik fayllarni `tempnam` bilan, mavjud nomga bog'liq bo'lmay yarating (race condition / symlink).",
    "",
    "### Laravel Storage",
    "`Storage::disk('s3')->put/get/exists/delete/temporaryUrl`, `putFileAs`, `readStream`, `writeStream`, `Storage::fake()` test uchun, `FilesystemAdapter`. Local disk `storage/app`, public disk `storage/app/public` + `php artisan storage:link`."
  ],
  "examples": [
    {
      "title": "Katta CSV (O(1) xotira)",
      "lang": "php",
      "code": [
        "$h = fopen($path, 'rb') ?: throw new RuntimeException(\"Ochilmadi: $path\");",
        "try {",
        "    while (($row = fgetcsv($h)) !== false) { process($row); }",
        "} finally {",
        "    fclose($h);",
        "}"
      ]
    },
    {
      "title": "Atomik yozish",
      "lang": "php",
      "code": [
        "function atomicWrite(string $path, string $data): void",
        "{",
        "    $tmp = tempnam(dirname($path), 'tmp');",
        "    file_put_contents($tmp, $data, LOCK_EX);",
        "    chmod($tmp, 0640);",
        "    rename($tmp, $path);       // bir fayl tizimida atomik",
        "}"
      ]
    },
    {
      "title": "Path traversal himoyasi",
      "lang": "php",
      "code": [
        "$base = realpath('/var/app/storage/uploads');",
        "$real = realpath($base . '/' . $name);",
        "if ($real === false || !str_starts_with($real, $base . DIRECTORY_SEPARATOR)) {",
        "    abort(403);",
        "}",
        "readfile($real);"
      ]
    },
    {
      "title": "Stream filtr va context",
      "lang": "php",
      "code": [
        "$ctx = stream_context_create(['http' => ['timeout' => 5, 'header' => \"User-Agent: skillmap\\r\\n\"]]);",
        "$h = fopen('https://example.com/data.csv', 'rb', false, $ctx);",
        "stream_filter_append($h, 'string.toupper');",
        "echo stream_get_contents($h, 100);"
      ]
    },
    {
      "title": "O_EXCL lock fayli",
      "lang": "php",
      "code": [
        "$lock = @fopen('/tmp/job.lock', 'x');       // mavjud bo'lsa false (atomik)",
        "if (!$lock) { exit(\"boshqa jarayon ishlayapti\\n\"); }",
        "register_shutdown_function(fn () => @unlink('/tmp/job.lock'));"
      ]
    }
  ],
  "pitfalls": [
    "`file_get_contents` bilan katta fayl `memory_limit`ni to'ldiradi: stream yoki `SplFileObject`.",
    "`flock` faqat kooperativ va NFS'da ishonchsiz; muhim holatda atomik rename yoki DB.",
    "`rename()` turli fayl tizimlari orasida atomik emas (nusxa+o'chirish): tmp faylni xuddi shu papkada yarating.",
    "Foydalanuvchi bergan nomni to'g'ridan-to'g'ri yo'lga qo'shish path traversal ga olib keladi.",
    "`filemtime`/`filesize` natijasi keshlanadi: o'zgartirgandan keyin `clearstatcache()`.",
    "`flock` advisory: qulfni qo'llamaydigan jarayon baribir yozadi.",
    "Yuklangan faylning kengaytmasi/MIME'iga ishonmang: `finfo` va nomni o'zingiz yarating.",
    "`file()` va `file_get_contents` katta faylda OOM."
  ]
});
