/* Chuqur dars: 13.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.22", {
  "lesson": [
    "### Muammo",
    "10 000 ta qatorni `foreach` ichida `Model::create()` bilan yozish 10 000 ta INSERT, 10 000 ta tarmoq aylanishi va 10 000 marta event, observer, cast ishlaydi. Bir necha daqiqa ketadi. Bulk amallar buni o'nlab yoki yuzlab marta tezlashtiradi.",
    "",
    "### Bulk insert",
    "- `Model::insert($rows)` yoki `DB::table()->insert($rows)`: bitta ko'p qatorli `INSERT ... VALUES (...), (...)`. Model event'lari ishlamaydi, `created_at`/`updated_at` **avtomatik to'ldirilmaydi**, cast'lar qo'llanmaydi. Qiymatlarni o'zingiz tayyorlang (JSON uchun `json_encode`).",
    "- `insertOrIgnore()`: dublikat xatolarini e'tiborsiz qoldiradi (`ON CONFLICT DO NOTHING` / `INSERT IGNORE`). Ehtiyot: MySQL'da boshqa xatolarni ham yutishi mumkin.",
    "- `insertGetId()`: bitta qator uchun.",
    "- `insertUsing($columns, $query)`: `INSERT INTO ... SELECT ...`. Ma'lumot PHP'ga umuman kelmaydi.",
    "",
    "### Upsert",
    "`Model::upsert($rows, uniqueBy: ['sku'], update: ['price', 'stock'])` — bor bo'lsa yangilaydi, yo'q bo'lsa qo'shadi, bitta so'rovda. PostgreSQL'da `ON CONFLICT (sku) DO UPDATE`, MySQL'da `ON DUPLICATE KEY UPDATE`. `uniqueBy` ustunlarida **unique indeks bo'lishi shart** (PostgreSQL buni qat'iy talab qiladi). Eloquent `upsert` `updated_at` va `created_at` ni avtomatik qo'shadi.",
    "",
    "### Bulk update",
    "- Bir xil qiymat: `Order::whereIn('id', $ids)->update(['status' => 'archived'])`.",
    "- Har qatorga har xil qiymat: `upsert` (eng qulay), `CASE WHEN` raw SQL yoki PostgreSQL'da `UPDATE ... FROM (VALUES ...)`.",
    "- Hisoblangan: `update(['total' => DB::raw('price * qty')])`.",
    "",
    "### Partiyalarga bo'lish",
    "Bitta so'rovda juda ko'p qator ham muammo:",
    "- PostgreSQL'da bitta so'rovda 65 535 tadan ortiq binding parametr bo'lmaydi. 10 ustunli qatorlar uchun ~6500 qator chegarasi.",
    "- MySQL'da `max_allowed_packet` chegarasi.",
    "- Juda katta tranzaksiya lock'larni uzoq ushlaydi va replication lag yaratadi.",
    "",
    "Odatiy partiya: 500–2000 qator. `collect($rows)->chunk(1000)->each(fn ($c) => Model::insert($c->all()))`. Katta jadvallarni yangilash uchun: `chunkById(1000, fn ($rows) => ...)` yoki ID diapazonlari bo'yicha sikl.",
    "",
    "### Event'lar yo'qligini kompensatsiya qilish",
    "Bulk amallardan keyin observer qiladigan ishni (cache tozalash, qidiruv indeksi, audit) aniq bajaring: bitta umumiy event (`ProductsImported`) chiqaring yoki tegishli job dispatch qiling.",
    "",
    "### Juda katta import",
    "Millionlab qator uchun PostgreSQL `COPY` (`pgsqlCopyFromArray` PDO metodi) yoki MySQL `LOAD DATA INFILE`. Ular `INSERT` dan ham ancha tez. Importdan keyin `ANALYZE` (11.20)."
  ],
  "examples": [
    {
      "title": "Upsert bilan narx-navo importi",
      "lang": "php",
      "code": [
        "LazyCollection::make(fn () => yield from $csv->rows())",
        "    ->map(fn (array $r) => [",
        "        'sku' => $r['sku'],",
        "        'name' => $r['name'],",
        "        'price' => (int) $r['price'],",
        "        'stock' => (int) $r['stock'],",
        "        'attrs' => json_encode($r['attrs'] ?? []),",
        "    ])",
        "    ->chunk(1000)",
        "    ->each(fn ($chunk) => Product::upsert(",
        "        $chunk->all(),",
        "        uniqueBy: ['sku'],",
        "        update: ['name', 'price', 'stock', 'attrs'],",
        "    ));",
        "",
        "DB::statement('ANALYZE products');",
        "event(new ProductsImported());"
      ],
      "note": "`sku` ustunida unique indeks bo'lishi shart."
    },
    {
      "title": "INSERT ... SELECT va har xil qiymatli update",
      "lang": "php",
      "code": [
        "DB::table('orders_archive')->insertUsing(",
        "    ['id', 'customer_id', 'total', 'created_at'],",
        "    DB::table('orders')",
        "        ->select('id', 'customer_id', 'total', 'created_at')",
        "        ->where('created_at', '<', now()->subYears(2))",
        ");",
        "",
        "// PostgreSQL: har mahsulotga o'z narxi",
        "DB::update(<<<'SQL'",
        "    UPDATE products p SET price = v.price, updated_at = now()",
        "    FROM (VALUES (1, 15000), (2, 23000), (3, 9900)) AS v(id, price)",
        "    WHERE p.id = v.id",
        "SQL);"
      ]
    }
  ],
  "pitfalls": [
    "`insert()` da `created_at`/`updated_at` avtomatik to'ldiriladi deb kutish: ular `NULL` bo'lib qoladi.",
    "Unique indekssiz `upsert` ishlatish: PostgreSQL'da `there is no unique or exclusion constraint matching the ON CONFLICT specification`.",
    "Yuz minglab qatorni bitta `insert()` ga berish: binding chegarasi yoki xotira xatosi.",
    "Bulk amallardan keyin observer'ga tayangan cache yoki qidiruv indeksini yangilashni unutish."
  ]
});
