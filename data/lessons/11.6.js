/* Chuqur dars: 11.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.6", {
  "lesson": [
    "### Composite indeks",
    "Bir nechta ustunli B-tree indeks qiymatlarni avval birinchi ustun, keyin ikkinchi ustun bo'yicha tartiblaydi. Shuning uchun **leftmost prefix** qoidasi amal qiladi: `(customer_id, created_at)` indeksi `WHERE customer_id = ?` va `WHERE customer_id = ? AND created_at > ?` uchun ishlaydi, lekin faqat `WHERE created_at > ?` uchun samarasiz.",
    "",
    "### Ustun tartibi",
    "1. **Tenglik** (`=`) bilan filtrlanadigan ustunlar oldinda.",
    "2. Keyin **diapazon** yoki **ORDER BY** ustuni.",
    "3. Diapazon ustunidan keyingi ustunlar indeksda qidiruvni toraytirmaydi, faqat filtr sifatida tekshiriladi.",
    "",
    "Klassik misol: \"mijozning oxirgi 20 ta buyurtmasi\" uchun `(customer_id, created_at DESC)`. Planner indeksni o'qiydi va sort qilmasdan `LIMIT` da to'xtaydi.",
    "",
    "PostgreSQL bir nechta alohida indeksni **BitmapAnd/BitmapOr** bilan birlashtira oladi. Shuning uchun har kombinatsiyaga composite indeks shart emas. Lekin bitmap scan tartibni saqlamaydi va `LIMIT` bilan samarasi kam. Issiq so'rov uchun to'g'ri composite indeks baribir tezroq.",
    "",
    "### Covering indeks (INCLUDE)",
    "PostgreSQL 11+: `CREATE INDEX ... (customer_id) INCLUDE (status, total)`. Qo'shimcha ustunlar faqat barg sahifalarda saqlanadi va **Index Only Scan** ga imkon beradi: heap'ga murojaat qilinmaydi. Bu faqat visibility map yangilangan bo'lsa ishlaydi (VACUUM, 11.19).",
    "",
    "### Partial indeks",
    "`WHERE` shartli indeks faqat shartga mos qatorlarni saqlaydi. Foydalari: indeks kichik va keshga sig'adi, yozishda faqat mos qatorlar yangilanadi, unique'ni qatorlarning bir qismiga qo'llash mumkin.",
    "",
    "Klassik holatlar:",
    "- Navbat: `WHERE status = 'pending'`. Jadvalda millionlab bajarilgan ish, kutayotgani esa bir necha yuzta.",
    "- Soft delete bilan unique: `UNIQUE (email) WHERE deleted_at IS NULL`. O'chirilgan foydalanuvchi email'i qayta ro'yxatdan o'tishga xalaqit bermaydi.",
    "- Kam uchraydigan qiymat: `WHERE is_flagged`.",
    "",
    "### Shart mos kelishi",
    "Planner partial indeksni faqat so'rov sharti indeks shartini **mantiqan kafolatlasa** ishlatadi. `WHERE status = 'pending'` indeksi `status = ?` (parametr) bilan generic plan'da ishlatilmasligi mumkin, chunki planner qiymatni oldindan bilmaydi. Laravel PDO default'da emulated prepare ishlatmaydi. Shuning uchun bunday so'rovlarni `EXPLAIN` bilan real parametrlar bilan tekshiring."
  ],
  "examples": [
    {
      "title": "Composite + partial + covering",
      "lang": "sql",
      "code": [
        "-- Mijozning oxirgi buyurtmalari, sort'siz",
        "CREATE INDEX orders_customer_recent ON orders (customer_id, created_at DESC) INCLUDE (status, total);",
        "",
        "-- Navbatdagi ishlar uchun kichik indeks",
        "CREATE INDEX jobs_pending ON jobs (available_at) WHERE status = 'pending';",
        "",
        "-- Soft delete bilan unique",
        "CREATE UNIQUE INDEX users_email_alive ON users (lower(email)) WHERE deleted_at IS NULL;"
      ]
    },
    {
      "title": "Laravel so'rovi indeksga mos",
      "lang": "php",
      "code": [
        "// orders_customer_recent ishlatiladi",
        "$orders = Order::where('customer_id', $customerId)",
        "    ->latest()",
        "    ->limit(20)",
        "    ->get(['id', 'status', 'total', 'created_at']);",
        "",
        "// jobs_pending ishlatiladi: shart literal bilan",
        "$next = DB::table('jobs')",
        "    ->whereRaw(\"status = 'pending'\")",
        "    ->where('available_at', '<=', now())",
        "    ->orderBy('available_at')",
        "    ->lockForUpdate()->skipLocked()",
        "    ->first();"
      ],
      "note": "`skipLocked()` Laravel 9+ da mavjud."
    }
  ],
  "pitfalls": [
    "Composite indeksda diapazon ustunini birinchi qo'yish: keyingi ustunlar qidiruvni toraytirmaydi.",
    "Partial indeks shartiga mos kelmaydigan so'rov yozish (masalan `status IN ('pending','retry')`): planner indeksni ishlatmaydi.",
    "Har bir filtr kombinatsiyasiga alohida composite indeks qo'shish: yozish sekinlashadi, ko'plari ishlatilmaydi. `pg_stat_user_indexes.idx_scan = 0` ni tekshiring.",
    "`INCLUDE` bilan Index Only Scan kutish, lekin VACUUM sozlanmagan: visibility map eskirgan bo'lsa, baribir heap o'qiladi."
  ]
});
