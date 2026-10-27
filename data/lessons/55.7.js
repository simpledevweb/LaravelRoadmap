/* Chuqur dars: 55.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.7", {
  "lesson": [
    "### Full-text indeks",
    "Matn ichida **so'z bo'yicha** qidirish uchun maxsus indeks (inverted index: so'z → hujjatlar). `LIKE '%x%'` ni almashtiradi. (MySQL tafsilotlari: 10.15.)",
    "",
    "### MySQL (InnoDB)",
    "```sql",
    "ALTER TABLE articles ADD FULLTEXT INDEX ft_body (title, body);",
    "SELECT * FROM articles WHERE MATCH(title, body) AGAINST('laravel queue' IN NATURAL LANGUAGE MODE);",
    "```",
    "Rejimlar: NATURAL LANGUAGE, BOOLEAN (`+so'z -so'z \"ibora\" so'z*`), QUERY EXPANSION. `innodb_ft_min_token_size=3`, stopword'lar, ngram parser.",
    "",
    "### PostgreSQL",
    "`tsvector` + `tsquery`, **GIN indeks**: `CREATE INDEX ON articles USING GIN (to_tsvector('simple', title || ' ' || body));` `WHERE to_tsvector(...) @@ plainto_tsquery('laravel queue')`. Til konfiguratsiyasi (stemming), `ts_rank` bilan reyting; `pg_trgm` (typo/LIKE '%x%' uchun).",
    "",
    "### Cheklovlar",
    "Morfologiya/sinonim/typo-tolerance zaif (ayniqsa o'zbek/rus); relevantlik sozlash cheklangan; hajm.",
    "",
    "### Qachon yetarli emas",
    "**Meilisearch / Typesense / Elasticsearch / OpenSearch** (Laravel Scout) — murakkab qidiruv.",
    "",
    "### Laravel",
    "`$table->fullText(['title', 'body'])`, `whereFullText(['title','body'], 'laravel queue')`; Scout.",
    "",
    "### Xavfsizlik",
    "Foydalanuvchi kiritmasini BOOLEAN rejimida tozalang."
  ],
  "examples": [
    {
      "title": "MySQL va PostgreSQL",
      "lang": "sql",
      "code": [
        "-- MySQL",
        "ALTER TABLE articles ADD FULLTEXT INDEX ft_title_body (title, body);",
        "SELECT id FROM articles WHERE MATCH(title, body) AGAINST('+laravel -php' IN BOOLEAN MODE);",
        "",
        "-- PostgreSQL",
        "CREATE INDEX idx_articles_fts ON articles USING GIN (to_tsvector('simple', title || ' ' || body));",
        "SELECT id FROM articles WHERE to_tsvector('simple', title || ' ' || body) @@ plainto_tsquery('simple', 'laravel queue');"
      ]
    }
  ],
  "pitfalls": [
    "Qisqa so'zlar (MySQL: <3 belgi) default indekslanmaydi.",
    "Morfologiya/typo-tolerance zaif: murakkab qidiruvga Meilisearch/Elasticsearch.",
    "Foydalanuvchi kiritmasini BOOLEAN rejimida tozalamaslik sintaksis xatosi beradi.",
    "PostgreSQL'da `to_tsvector` ifodasi indeksdagi bilan mos bo'lishi shart."
  ]
});
