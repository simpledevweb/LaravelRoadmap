/* Chuqur dars: 2.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.22", {
  "lesson": [
    "### Filesystem",
    "Flysystem ustida yagona API: `Storage` Facade. Disklar `config/filesystems.php`: `local` (`storage/app/private`), `public` (`storage/app/public`), `s3`, `sftp`, `ftp`.",
    "",
    "### Asosiy amallar",
    "`Storage::put('a.txt', $data)`, `get()`, `exists()`, `delete()`, `copy()`, `move()`, `size()`, `files()`, `directories()`, `makeDirectory()`, `download()`, `url()`, `temporaryUrl($path, now()->addMinutes(5))` (S3), `readStream()/writeStream()`.",
    "Boshqa disk: `Storage::disk('s3')->put(...)`.",
    "",
    "### Yuklangan fayl",
    "`$request->file('rasm')->store('rasmlar')` (noyob nom), `storeAs`, `Storage::putFile`. Natijada yo'l qaytadi — bazada saqlang.",
    "",
    "### Public disk",
    "`php artisan storage:link` (`public/storage` → `storage/app/public`). `Storage::url($path)`. Maxfiy fayllar uchun `local` disk + controller orqali berish yoki `temporaryUrl`.",
    "",
    "### Visibility",
    "`public`/`private` (S3 ACL); `Storage::setVisibility`.",
    "",
    "### Katta fayllar",
    "`readStream`/`writeStream`/`response()->streamDownload()` — xotirani tejaydi.",
    "",
    "### Test",
    "`Storage::fake('public')`, `UploadedFile::fake()->image('a.jpg')`, `Storage::disk('public')->assertExists(...)`.",
    "",
    "### Xavfsizlik",
    "Foydalanuvchi bergan nomga ishonmang, yo'lni tekshiring, MIME/hajmni validatsiya qiling (`mimes`, `max`), PHP bajariladigan papkaga yozmang."
  ],
  "examples": [
    {
      "title": "Yuklash va saqlash",
      "lang": "php",
      "code": [
        "public function store(Request $r): JsonResponse",
        "{",
        "    $r->validate(['file' => ['required', 'file', 'mimes:pdf,jpg,png', 'max:5120']]);",
        "    $path = $r->file('file')->store('documents', 's3');",
        "    return response()->json(['url' => Storage::disk('s3')->temporaryUrl($path, now()->addMinutes(10))]);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Foydalanuvchi bergan nomni to'g'ridan-to'g'ri yo'lga qo'yish path traversal.",
    "`storage:link` qilinmasa public disk fayllari ko'rinmaydi.",
    "Katta faylni `Storage::get()` bilan to'liq xotiraga olish OOM: stream.",
    "Maxfiy fayllarni `public` diskda saqlash hammaga ochiq bo'ladi."
  ]
});
