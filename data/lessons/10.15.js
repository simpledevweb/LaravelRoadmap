/* Chuqur dars: 10.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.15", {
  "lesson": [
    "### Full-text indeks",
    "Matn ichida **so'z bo'yicha qidirish**: `LIKE '%x%'` (indeks ishlatmaydi) o'rniga `FULLTEXT` indeks (InnoDB'da 5.6+).",
    "```sql",
    "ALTER TABLE articles ADD FULLTEXT INDEX ft_title_body (title, body);",
    "SELECT id, MATCH(title, body) AGAINST('laravel queue') AS score",
    "FROM articles WHERE MATCH(title, body) AGAINST('laravel queue' IN NATURAL LANGUAGE MODE);",
    "```",
    "",
    "### Rejimlar",
    "- **NATURAL LANGUAGE MODE** (default): relevantlik bo'yicha, `score`.",
    "- **BOOLEAN MODE:** operatorlar: `+so'z` (majburiy), `-so'z` (taqiq), `\"aniq ibora\"`, `so'z*` (prefiks), `>`/`<` (vazn).",
    "- **WITH QUERY EXPANSION:** topilgan natijalardagi so'zlar bilan kengaytiradi.",
    "",
    "### Cheklovlar va sozlamalar",
    "- Faqat `CHAR/VARCHAR/TEXT` ustunlar.",
    "- **Minimal so'z uzunligi:** `innodb_ft_min_token_size` (default 3): qisqa so'zlar indekslanmaydi.",
    "- **Stopword'lar** (the, and...): ro'yxat sozlanadi (`innodb_ft_enable_stopword`).",
    "- \"50% qoidasi\" faqat MyISAM'da; InnoDB'da yo'q.",
    "- **ngram parser** — CJK tillar uchun (`WITH PARSER ngram`).",
    "- Morfologiya/stemming yo'q: o'zbek/rus tillarida \"so'z shakllari\" bo'yicha qidirish zaif.",
    "- Indeks yangilanishi kechikishi, katta jadvalda hajm.",
    "",
    "### Laravel",
    "`$table->fullText(['title', 'body'])`, `->whereFullText(['title', 'body'], 'laravel queue')`.",
    "",
    "### Qachon yetarli emas",
    "Sinonimlar, typo-tolerance, rangli natijalar, katta hajm — **Meilisearch/Elasticsearch/Typesense** (Laravel Scout).",
    "",
    "### Qoida",
    "Foydalanuvchi kiritmasini BOOLEAN MODE'da to'g'ridan bermang (operatorlar sintaksis xatosi beradi): tozalang."
  ],
  "examples": [
    {
      "title": "Qidirish",
      "lang": "sql",
      "code": [
        "ALTER TABLE articles ADD FULLTEXT INDEX ft_title_body (title, body);",
        "",
        "SELECT id, title FROM articles",
        "WHERE MATCH(title, body) AGAINST('+laravel -php \"service container\"' IN BOOLEAN MODE)",
        "LIMIT 20;"
      ]
    }
  ],
  "pitfalls": [
    "Qisqa (<3 belgi) so'zlar default indekslanmaydi: `innodb_ft_min_token_size`.",
    "Foydalanuvchi kiritmasini BOOLEAN MODE'ga tozalamasdan berish sintaksis xatosi/tasodifiy natija.",
    "Stemming/typo-tolerance yo'q: murakkab qidiruv uchun Meilisearch/Elasticsearch.",
    "Full-text indeks o'zgartirish katta jadvalda qimmat va sekin."
  ]
});
