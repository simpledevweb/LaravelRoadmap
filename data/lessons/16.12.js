/* Chuqur dars: 16.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.12", {
  "lesson": [
    "### Nega batching",
    "Har so'rov yuborish o'z xarajatiga ega: tarmoq aylanishi (bir xil DC'da 0.2–1 ms), parsing, rejalashtirish, tranzaksiya boshlash va tugatish. 1000 ta kichik so'rov × 1 ms = 1 sekund faqat \"yo'lda\". Batching ko'p kichik amalni kamroq va kattaroq so'rovga birlashtiradi.",
    "",
    "### O'qishda batching",
    "- **WHERE IN:** 100 ta ID uchun 100 ta `find()` o'rniga bitta `whereIn('id', $ids)->get()->keyBy('id')`.",
    "- **Eager loading:** Eloquent'ning `with()` aynan shu printsip: barcha ota yozuvlar uchun bitta `WHERE IN` (13.11).",
    "- **DataLoader pattern:** GraphQL va murakkab servislarda so'rovlarni bir \"tick\" davomida yig'ib, bitta `IN` bilan bajarish. Laravel'da Lighthouse `@belongsTo` va `BatchLoader` shunday ishlaydi.",
    "",
    "### Yozishda batching",
    "- Ko'p qatorli `INSERT ... VALUES (...), (...)`: `Model::insert($rows)` (13.22).",
    "- `upsert()`: bir so'rovda ko'p qatorni qo'shish yoki yangilash.",
    "- Har xil qiymatli `UPDATE`: `CASE WHEN id = 1 THEN ... END` yoki PostgreSQL'da `UPDATE ... FROM (VALUES ...)`.",
    "- Bitta tranzaksiya: 1000 ta INSERT'ni bitta `DB::transaction` ichida bajarish ham fsync sonini 1000 dan 1 ga tushiradi.",
    "",
    "### Bo'lak hajmi: muvozanat",
    "Juda katta batch ham zarar:",
    "- 50 000 elementli `IN` ro'yxati: parser yuki, reja sifati pasayadi, MySQL'da `max_allowed_packet`.",
    "- PostgreSQL'da bitta so'rovda 65 535 parametr chegarasi.",
    "- Katta tranzaksiya lock'larni uzoq ushlaydi, undo/WAL hajmi o'sadi va replication lag paydo bo'ladi.",
    "- PHP xotirasi.",
    "",
    "Odatiy bo'lak hajmi: **500–1000** qator yoki ID. Fon jarayonlarida bo'laklar orasida qisqa pauza (`usleep`) DB'ga \"nafas olish\" imkonini beradi.",
    "",
    "### Katta to'plamni qayta ishlash",
    "`chunkById(1000)` — `WHERE id > ? ORDER BY id LIMIT 1000`. Har bo'lak tez va iteratsiya davomida yozuvlarni o'zgartirish xavfsiz. Queue bilan: har bo'lakni alohida job'ga berib, parallel bajarish (`Bus::batch()`).",
    "",
    "### Tashqi API bilan",
    "Batching faqat DB uchun emas. Tashqi servis \"bulk\" endpoint taqdim etsa, undan foydalaning. Masalan, 1000 ta SMS uchun bitta so'rov. Bu ham tarmoq aylanishlari va rate limit muammolarini kamaytiradi."
  ],
  "examples": [
    {
      "title": "O'qishni batch qilish",
      "lang": "php",
      "code": [
        "// YOMON: 1000 ta so'rov",
        "foreach ($rows as $row) {",
        "    $user = User::find($row['user_id']);",
        "    // ...",
        "}",
        "",
        "// YAXSHI: bo'laklab, har bo'lakka bitta so'rov",
        "collect($rows)->chunk(1000)->each(function ($chunk) {",
        "    $users = User::whereIn('id', $chunk->pluck('user_id')->unique())",
        "        ->get(['id', 'email', 'name'])",
        "        ->keyBy('id');",
        "",
        "    foreach ($chunk as $row) {",
        "        $user = $users->get($row['user_id']);",
        "        // ...",
        "    }",
        "});"
      ]
    },
    {
      "title": "Har xil qiymatli bulk update (MySQL)",
      "lang": "php",
      "code": [
        "$prices = [101 => 15000, 102 => 23000, 103 => 9900];",
        "",
        "$cases = collect($prices)->map(fn ($p, $id) => 'WHEN ? THEN ?')->implode(' ');",
        "$bindings = collect($prices)->flatMap(fn ($p, $id) => [$id, $p])->all();",
        "",
        "DB::update(",
        "    \"UPDATE products SET price = CASE id {$cases} END, updated_at = NOW() WHERE id IN (\"",
        "        . implode(',', array_fill(0, count($prices), '?')) . ')',",
        "    [...$bindings, ...array_keys($prices)],",
        ");"
      ],
      "note": "Ko'p hollarda `Product::upsert()` soddaroq. Bu usul faqat upsert mos kelmaganda."
    }
  ],
  "pitfalls": [
    "Sikl ichida `find()` yoki `save()`: N ta so'rov va N ta tranzaksiya.",
    "Butun 100 000 elementli ro'yxatni bitta `whereIn` ga berish.",
    "Juda katta batch'ni bitta tranzaksiyada bajarish: lock'lar va replication lag.",
    "Bo'lak ichidagi xato bilan butun jarayonni qayta boshlash: idempotent qiling va oxirgi muvaffaqiyatli ID'dan davom eting."
  ]
});
