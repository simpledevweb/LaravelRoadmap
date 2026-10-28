/* Chuqur dars: 11.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.7", {
  "lesson": [
    "### Expression indeks nima",
    "Oddiy indeks ustun qiymatini saqlaydi. Expression (funksional) indeks esa **ifoda natijasini** saqlaydi: `lower(email)`, `date_trunc('day', created_at)`, `(meta->>'sku')`, `coalesce(nickname, name)`. Natija yozish paytida hisoblanadi va indeksga qo'yiladi.",
    "",
    "### Nega kerak",
    "So'rovda ustunga funksiya qo'llansa, oddiy indeks ishlamaydi. `WHERE lower(email) = 'ali@x.uz'` sharti `email` ustunidagi B-tree'dan foydalana olmaydi, chunki indeks `lower()` natijalari bo'yicha tartiblanmagan. Natijada Seq Scan bo'ladi.",
    "",
    "Yechimlar:",
    "1. Expression indeks: `CREATE INDEX ON users (lower(email))`.",
    "2. Ma'lumotni normallashtirib saqlash (yozishda `lower` qilish).",
    "3. `citext` tipi: taqqoslash avtomatik case-insensitive.",
    "4. Generated column (12+): `email_lower text GENERATED ALWAYS AS (lower(email)) STORED` va unga oddiy indeks.",
    "",
    "### Qoidalar",
    "- **So'rov ifodasi indeks ifodasi bilan bir xil bo'lishi shart.** `lower(email)` indeksi `upper(email)` yoki `lower(trim(email))` uchun ishlamaydi.",
    "- Funksiya **IMMUTABLE** bo'lishi kerak: bir xil kirishga doim bir xil natija. `now()`, `random()` yoki sessiya `TimeZone` ga bog'liq funksiyalar mumkin emas.",
    "- Shu sababli `date(created_at)` `timestamptz` ustunida indekslanmaydi: natija zonaga bog'liq. `(created_at AT TIME ZONE 'UTC')::date` IMMUTABLE va ishlaydi.",
    "- Expression indeks uchun planner alohida statistika yig'adi (`ANALYZE` dan keyin). Bu ifoda bo'yicha taxminlarni aniqroq qiladi.",
    "",
    "### Xarajat",
    "Har `INSERT` va ifoda ustunini o'zgartiruvchi `UPDATE` ifodani qayta hisoblaydi. Oddiy funksiyalarda bu sezilmaydi. Og'ir funksiyada (murakkab PL/pgSQL) yozish sekinlashadi.",
    "",
    "### Laravel'da",
    "Schema builder expression indeksni to'g'ridan-to'g'ri qo'llamaydi. Migratsiyada `DB::statement` ishlating. So'rovda ifodani aynan bir xil yozish uchun `whereRaw('lower(email) = ?', [strtolower($email)])`. Uni scope yoki repository ichiga yashirib, takrorlanishni oldini oling."
  ],
  "examples": [
    {
      "title": "Case-insensitive login",
      "lang": "sql",
      "code": [
        "CREATE UNIQUE INDEX users_email_lower ON users (lower(email));",
        "",
        "-- Index Scan",
        "EXPLAIN SELECT id FROM users WHERE lower(email) = lower('Ali@Example.uz');",
        "",
        "-- Seq Scan: ifoda boshqacha",
        "EXPLAIN SELECT id FROM users WHERE email ILIKE 'ali@example.uz';"
      ]
    },
    {
      "title": "Migratsiya va scope",
      "lang": "php",
      "code": [
        "public function up(): void",
        "{",
        "    DB::statement('CREATE UNIQUE INDEX users_email_lower ON users (lower(email))');",
        "    DB::statement(\"CREATE INDEX orders_day_utc ON orders (((created_at AT TIME ZONE 'UTC')::date))\");",
        "}",
        "",
        "// User model",
        "public function scopeWhereEmail(Builder $q, string $email): Builder",
        "{",
        "    return $q->whereRaw('lower(email) = ?', [mb_strtolower($email)]);",
        "}",
        "",
        "User::whereEmail($request->email)->first();"
      ]
    }
  ],
  "pitfalls": [
    "So'rovda ifodani biroz boshqacha yozish (`lower(trim(email))`): indeks ishlatilmaydi.",
    "`timestamptz` ustunida `date(created_at)` indeksini yaratishga urinish: `functions in index expression must be marked IMMUTABLE` xatosi.",
    "Unique expression indeks qo'shishdan oldin mavjud dublikatlarni (`Ali@x.uz` va `ali@x.uz`) tekshirmaslik: migratsiya yiqiladi.",
    "Eloquent'da `where('email', $email)` yozib, `lower()` indeks ishlaydi deb kutish."
  ]
});
