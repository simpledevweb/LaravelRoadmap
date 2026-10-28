/* Chuqur dars: 16.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.1", {
  "lesson": [
    "### EXPLAIN nima beradi",
    "`EXPLAIN` so'rovni **bajarmasdan** optimizer tanlagan ijro rejasini ko'rsatadi. U xavfsiz va tez, shuning uchun production'da ham ishlatish mumkin. Reja quyidagi savollarga javob beradi:",
    "- Har jadvalga qanday kiriladi: to'liq skan yoki indeks?",
    "- Qaysi indeks tanlangan va qaysilari ko'rib chiqilgan?",
    "- JOIN qanday tartibda bajariladi?",
    "- Nechta qator o'qilishi taxmin qilinadi?",
    "- Qo'shimcha saralash yoki vaqtinchalik jadval kerakmi?",
    "",
    "### MySQL EXPLAIN ustunlari",
    "- `type`: kirish usuli. Yaxshidan yomonga: `system`/`const` (PK yoki unique bo'yicha bitta qator) → `eq_ref` (JOIN'da unique) → `ref` (indeks tengligi) → `range` (diapazon) → `index` (butun indeksni skan) → `ALL` (butun jadval).",
    "- `possible_keys` va `key`: ko'rib chiqilgan va tanlangan indeks. `key = NULL` — indeks ishlatilmagan.",
    "- `key_len`: composite indeksning nechta ustuni ishlatilgani (baytlarda).",
    "- `rows`: o'qiladigan qatorlar taxmini. `filtered`: shartdan o'tadigan foiz.",
    "- `Extra`: `Using index` (covering, yaxshi), `Using where`, `Using filesort` (alohida saralash), `Using temporary` (vaqtinchalik jadval), `Using index condition` (ICP).",
    "",
    "MySQL 8 da `EXPLAIN FORMAT=TREE` PostgreSQL'ga o'xshash daraxt ko'rinishini beradi va o'qish osonroq.",
    "",
    "### PostgreSQL",
    "PostgreSQL'da `EXPLAIN` daraxt ko'rinishida tugunlar va `cost`, `rows`, `width` taxminlarini qaytaradi (batafsil: 11.8).",
    "",
    "### Laravel'dan",
    "- `$query->explain()` (Laravel 8.12+): `EXPLAIN` natijasini Collection sifatida qaytaradi. `->dd()` yoki `->dump()` bilan ko'rish.",
    "- `$query->toRawSql()` (10.15+): binding'lar qo'yilgan SQL. Uni DB klientiga ko'chirib, tahlil qilish mumkin.",
    "",
    "### Odatiy tahlil tartibi",
    "1. Sekin so'rovni toping (slow query log, Telescope, APM).",
    "2. `EXPLAIN` qiling: `type = ALL` va katta `rows` bormi?",
    "3. `key` NULL bo'lsa, nima uchun: indeks yo'qmi, shart sargable emasmi (16.6), tip mos kelmaydimi?",
    "4. `Using filesort` + `LIMIT`: indeks tartibga mos emas (16.14).",
    "5. Tuzatib, `EXPLAIN` ni qayta ko'ring, keyin haqiqiy vaqtni `EXPLAIN ANALYZE` bilan o'lchang (16.2).",
    "",
    "`EXPLAIN` faqat **taxmin**. Statistika eskirgan bo'lsa, `rows` noto'g'ri bo'ladi. Haqiqatni ko'rish uchun `EXPLAIN ANALYZE` kerak."
  ],
  "examples": [
    {
      "title": "Indekssiz va indeksli reja (MySQL)",
      "lang": "sql",
      "code": [
        "EXPLAIN SELECT id, total FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "-- type=ALL  key=NULL  rows=987654  Extra: Using where; Using filesort",
        "",
        "CREATE INDEX orders_customer_created ON orders (customer_id, created_at);",
        "",
        "EXPLAIN SELECT id, total FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "-- type=ref  key=orders_customer_created  rows=1840  Extra: Backward index scan"
      ]
    },
    {
      "title": "Laravel'da",
      "lang": "php",
      "code": [
        "$query = Order::select('id', 'total')",
        "    ->where('customer_id', 42)",
        "    ->latest()",
        "    ->limit(20);",
        "",
        "$query->explain()->dd();",
        "",
        "// DB klienti uchun",
        "logger()->debug($query->toRawSql());"
      ]
    }
  ],
  "pitfalls": [
    "`rows` taxminini haqiqiy son deb qabul qilish: statistika eskirgan bo'lsa, u ko'p marta farq qiladi.",
    "`possible_keys` da indeks borligini \"ishlatilyapti\" deb tushunish: muhim ustun `key`.",
    "Faqat dev bazasida `EXPLAIN` qilish: kichik jadvalda optimizer full scan tanlaydi va bu production'dagi rejaga o'xshamaydi.",
    "`Using index` (covering) va `Using index condition` (ICP) ni adashtirish: birinchisi heap'ga umuman murojaat qilmaydi."
  ]
});
