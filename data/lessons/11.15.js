/* Chuqur dars: 11.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.15", {
  "lesson": [
    "### Nega LIKE yetmaydi",
    "`WHERE body ILIKE '%queue%'` har qatorni to'liq skan qiladi, so'z shakllarini (queue/queues) tushunmaydi va natijani relevance bo'yicha tartiblay olmaydi. PostgreSQL'ning ichki full-text search (FTS) tizimi bu muammolarni alohida qidiruv serverisiz hal qiladi.",
    "",
    "### Asosiy tushunchalar",
    "- **tsvector:** hujjatning normallashtirilgan ko'rinishi. Leksemalar va ularning pozitsiyalari: `to_tsvector('english', 'Queues are running')` → `'queue':1 'run':3`. Stop-so'zlar (`are`) tashlab yuboriladi, so'zlar o'zakka keltiriladi (stemming).",
    "- **tsquery:** qidiruv so'rovi. `to_tsquery('queue & run')`, `plainto_tsquery('queue run')`, eng qulayi `websearch_to_tsquery('laravel queue -redis \"job batch\"')`. Bu Google uslubidagi sintaksis (PG 11+).",
    "- **@@:** moslik operatori: `tsvector @@ tsquery`.",
    "- **Konfiguratsiya:** til qoidalari (`english`, `russian`, `simple`). `simple` faqat kichik harfga o'tkazadi, stemming qilmaydi.",
    "",
    "### Relevance",
    "`ts_rank(vector, query)` mos kelish chastotasi bo'yicha, `ts_rank_cd` so'zlar yaqinligini ham hisobga oladi. `setweight(vector, 'A')` bilan sarlavhani matndan muhimroq qilish mumkin (A > B > C > D). `ts_headline()` topilgan so'zlarni ajratib, snippet yasaydi. U og'ir, faqat chiqariladigan sahifadagi natijalarga qo'llang.",
    "",
    "### Tezlik: saqlangan tsvector + GIN",
    "Har so'rovda `to_tsvector(body)` hisoblash qimmat. To'g'ri yo'l: **generated column** (PG 12+) yoki trigger bilan yangilanadigan `tsvector` ustuni va unga GIN indeks. Alternativa — expression indeks `USING gin (to_tsvector('simple', body))`. Lekin so'rovda ifoda aynan bir xil bo'lishi kerak.",
    "",
    "### O'zbek tili va typo'lar",
    "PostgreSQL'da o'zbek tili uchun tayyor stemmer yo'q. `simple` konfiguratsiya aniq so'z moslashuvini beradi. Prefiks qidiruv uchun `to_tsquery('simple', 'kitob:*')`. Imlo xatolariga chidamlilik uchun `pg_trgm` (`similarity()`, `%` operatori, `word_similarity`) bilan birlashtiring.",
    "",
    "### Qachon yetmaydi",
    "Fasetlar, murakkab typo-tolerance, sinonimlar, millionlab hujjatda millisekundli qidiruv va ko'p tilli analiz kerak bo'lsa, Meilisearch, Typesense yoki Elasticsearch yaxshiroq. Laravel Scout ular bilan ishlaydi. Scout'ning `database` driver'i PostgreSQL'da `whereFullText` ishlatishi mumkin.",
    "",
    "### Laravel'da",
    "`$table->fullText(['title', 'body'])->language('simple')` GIN indeks yaratadi. `->whereFullText(['title', 'body'], 'laravel queue')` so'rovi PostgreSQL'da `to_tsvector(...) @@ plainto_tsquery(...)` ga aylanadi (Laravel 8.79+)."
  ],
  "examples": [
    {
      "title": "Og'irlikli qidiruv ustuni",
      "lang": "sql",
      "code": [
        "ALTER TABLE posts ADD COLUMN search tsvector GENERATED ALWAYS AS (",
        "  setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||",
        "  setweight(to_tsvector('simple', coalesce(body, '')), 'B')",
        ") STORED;",
        "CREATE INDEX posts_search ON posts USING gin (search);",
        "",
        "SELECT id, title, ts_rank(search, q) AS rank",
        "FROM posts, websearch_to_tsquery('simple', 'laravel queue -redis') q",
        "WHERE search @@ q",
        "ORDER BY rank DESC LIMIT 20;"
      ],
      "note": "Generated column qo'shish jadvalni qayta yozadi. Katta jadvalda buni texnik oynada bajaring."
    },
    {
      "title": "Laravel: FTS + trigram zaxira",
      "lang": "php",
      "code": [
        "$term = $request->string('q');",
        "",
        "$posts = Post::query()",
        "    ->whereRaw(\"search @@ websearch_to_tsquery('simple', ?)\", [$term])",
        "    ->orderByRaw(\"ts_rank(search, websearch_to_tsquery('simple', ?)) DESC\", [$term])",
        "    ->limit(20)->get();",
        "",
        "if ($posts->isEmpty()) {",
        "    // imlo xatosi bo'lsa: pg_trgm o'xshashligi",
        "    $posts = Post::whereRaw('title % ?', [$term])",
        "        ->orderByRaw('similarity(title, ?) DESC', [$term])",
        "        ->limit(20)->get();",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Indeks va so'rovda har xil konfiguratsiya ishlatish (`english` va `simple`): indeks ishlamaydi va natija boshqacha chiqadi.",
    "`to_tsquery` ga foydalanuvchi matnini to'g'ridan-to'g'ri berish: `&`, `|`, `:` belgilari sintaksis xatosi beradi. `websearch_to_tsquery` yoki `plainto_tsquery` ishlating.",
    "O'zbek matniga `english` stemmer qo'llash: so'zlar noto'g'ri qisqaradi.",
    "`ts_headline` ni barcha topilgan qatorlarga qo'llash: u har hujjatni qayta parse qiladi va juda sekin."
  ]
});
