/* Chuqur dars: 16.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.10", {
  "lesson": [
    "### Muammo",
    "B-tree indeks ustunning xom qiymatlari bo'yicha tartiblangan. `WHERE LOWER(email) = 'ali@x.uz'` sharti `LOWER(email)` natijalari bo'yicha qidiradi, ular esa indeksda yo'q. DB har qatorda funksiyani hisoblab, natijani taqqoslaydi. Bu full scan. Xuddi shu holat `DATE(created_at)`, `SUBSTRING(phone, 1, 5)`, `TRIM(code)`, `CONCAT(first, ' ', last)`, `JSON_EXTRACT(meta, '$.sku')` uchun ham amal qiladi.",
    "",
    "Bu sargable bo'lmagan shartlarning (16.6) eng keng tarqalgan turi.",
    "",
    "### Yechim 1: ma'lumotni normallashtirib saqlash",
    "Agar har doim kichik harf bilan qidirsangiz, kichik harfda saqlang. Laravel mutator (13.6): `set: fn ($v) => mb_strtolower(trim($v))`. Oddiy indeks va oddiy `where('email', $email)` ishlaydi. Eng sodda va tez yo'l. Mavjud ma'lumotni bir marta migratsiya bilan normallashtiring.",
    "",
    "### Yechim 2: shartni qayta yozish",
    "`DATE(created_at) = '2025-06-10'` → `created_at >= '2025-06-10' AND created_at < '2025-06-11'`. `SUBSTRING(phone, 1, 5) = '99890'` → `phone LIKE '99890%'` (prefiks sargable).",
    "",
    "### Yechim 3: funksional (expression) indeks",
    "- PostgreSQL: `CREATE INDEX ON users (lower(email))` (11.7).",
    "- MySQL 8.0.13+: `CREATE INDEX users_email_lower ON users ((LOWER(email)))`. Ikki qavs majburiy. MySQL ichida yashirin virtual ustun yaratadi.",
    "",
    "So'rovdagi ifoda indeks ifodasi bilan **aynan bir xil** bo'lishi kerak.",
    "",
    "### Yechim 4: generated column + indeks",
    "MySQL 5.7+ va PostgreSQL 12+: `email_lower VARCHAR(255) GENERATED ALWAYS AS (LOWER(email)) STORED` va unga oddiy indeks. Afzalligi: ustun nomi bilan so'rov yoziladi (`where('email_lower', ...)`), ifodani takrorlash shart emas. JSON maydonlari uchun ayniqsa qulay: `sku VARCHAR(64) AS (meta->>'$.sku')`. Laravel: `$table->string('email_lower')->storedAs('LOWER(email)')`.",
    "",
    "### Yechim 5: collation",
    "MySQL'da `utf8mb4_unicode_ci` va `utf8mb4_0900_ai_ci` collation'lari allaqachon **case-insensitive**: `WHERE email = 'ALI@X.UZ'` indeks bilan `ali@x.uz` ni topadi. Ko'p MySQL loyihalarida `LOWER()` umuman kerak emas. PostgreSQL'da `citext` tipi yoki nondeterministic collation (12+).",
    "",
    "### Qaysi birini tanlash",
    "Normallashtirish → qayta yozish → collation/citext → generated column → expression indeks. Birinchi ikkitasi qo'shimcha indeks talab qilmaydi."
  ],
  "examples": [
    {
      "title": "MySQL: funksional indeks va generated column",
      "lang": "sql",
      "code": [
        "-- Funksional indeks (MySQL 8.0.13+)",
        "CREATE INDEX users_email_lower ON users ((LOWER(email)));",
        "SELECT id FROM users WHERE LOWER(email) = 'ali@x.uz';",
        "",
        "-- JSON maydon uchun generated column",
        "ALTER TABLE products",
        "  ADD COLUMN sku VARCHAR(64) GENERATED ALWAYS AS (meta->>'$.sku') STORED,",
        "  ADD INDEX products_sku (sku);",
        "SELECT id FROM products WHERE sku = 'ABC-123';"
      ]
    },
    {
      "title": "Laravel: normallashtirish va storedAs",
      "lang": "php",
      "code": [
        "// Model mutator",
        "protected function email(): Attribute",
        "{",
        "    return Attribute::make(set: fn (string $v) => mb_strtolower(trim($v)));",
        "}",
        "",
        "// Qidiruv ham normallashtirilgan qiymat bilan",
        "User::where('email', mb_strtolower(trim($request->email)))->first();",
        "",
        "// Migratsiya: generated column",
        "Schema::table('products', function (Blueprint $table) {",
        "    $table->string('sku', 64)->storedAs(\"meta->>'$.sku'\")->index();",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "MySQL funksional indeksida bitta qavs yozish (`INDEX ((LOWER(email)))` shart): sintaksis xatosi.",
    "So'rovda indeksdan farqli ifoda yozish (`LOWER(TRIM(email))`): indeks ishlatilmaydi.",
    "Case-insensitive collation'li MySQL'da `LOWER()` qo'shib, mavjud indeksni o'zingiz buzish.",
    "Mutator qo'shib, eski ma'lumotni normallashtirmaslik: eski yozuvlar topilmaydi."
  ]
});
