/* Chuqur dars: 9.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.22", {
  "lesson": [
    "### SQL Injection",
    "Foydalanuvchi kiritmasi SQL kodiga **aralashib**, so'rov ma'nosini o'zgartiradi:",
    "`\"SELECT * FROM users WHERE email = '$email'\"` ga `' OR '1'='1` yuborilsa — hamma foydalanuvchi qaytadi; `'; DROP TABLE users; --` — jadval o'chadi. OWASP Top 10 doimiy a'zosi.",
    "",
    "### Asosiy himoya: prepared statement",
    "Kiritma SQL'dan **alohida** (parametr) yuboriladi: DB uni kod emas, **ma'lumot** deb oladi.",
    "```php",
    "$st = $pdo->prepare('SELECT * FROM users WHERE email = :e'); $st->execute(['e' => $email]);",
    "```",
    "Laravel: Query Builder/Eloquent **avtomatik** binding qiladi: `User::where('email', $email)`.",
    "",
    "### Xavfli joylar (Laravel'da ham)",
    "- `DB::raw()`, `whereRaw()`, `selectRaw()`, `orderByRaw()` ichiga kiritmani **to'g'ridan** qo'yish: `whereRaw(\"name = '$name'\")`. To'g'ri: `whereRaw('name = ?', [$name])`.",
    "- **Jadval/ustun nomi** va `ORDER BY` yo'nalishi foydalanuvchidan: binding ishlamaydi → **oq ro'yxat** (`in_array($col, ['name', 'created_at'], true)`).",
    "- `LIKE` dagi `%`/`_` (injection emas, lekin ehtiyot: `addcslashes`).",
    "- Xom SQL migratsiya/seeder'da foydalanuvchi ma'lumoti.",
    "",
    "### Qo'shimcha qatlamlar",
    "1. **Eng kam huquq:** ilova DB foydalanuvchisiga `DROP`, `FILE` huquqi yo'q.",
    "2. Kiritmani **validatsiya** (tur, uzunlik, oq ro'yxat).",
    "3. Xato xabarlarini foydalanuvchiga ko'rsatmang (SQL tafsiloti).",
    "4. WAF, monitoring.",
    "5. ORM'ni to'g'ri ishlatish; kod review'da `Raw` qidiring.",
    "",
    "### Escape (`addslashes`, `mysqli_real_escape_string`)",
    "Yetarli emas va xatoga moyil: faqat prepared statement.",
    "",
    "### Test",
    "Statik tahlil (PHPStan taint, Psalm taint, Semgrep), penetratsion test (sqlmap)."
  ],
  "examples": [
    {
      "title": "Xavfli va xavfsiz",
      "lang": "php",
      "code": [
        "// XAVFLI",
        "DB::select(\"SELECT * FROM users WHERE email = '$email'\");",
        "User::whereRaw(\"name = '$name'\")->get();",
        "",
        "// XAVFSIZ",
        "DB::select('SELECT * FROM users WHERE email = ?', [$email]);",
        "User::whereRaw('name = ?', [$name])->get();",
        "",
        "// ustun nomi: oq ro'yxat",
        "$col = in_array($request->sort, ['name', 'created_at'], true) ? $request->sort : 'id';",
        "User::orderBy($col)->get();"
      ]
    }
  ],
  "pitfalls": [
    "`whereRaw`/`orderByRaw` ichiga kiritmani qo'shish Laravel'da ham SQL injection.",
    "Ustun/jadval nomi va `ORDER BY` yo'nalishini binding bilan himoyalab bo'lmaydi: oq ro'yxat.",
    "Escape funksiyalari prepared statement o'rnini bosmaydi.",
    "DB foydalanuvchisiga ortiqcha huquq (`DROP`, `FILE`) injection oqibatini kuchaytiradi."
  ]
});
