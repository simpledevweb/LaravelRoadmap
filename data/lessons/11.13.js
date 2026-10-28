/* Chuqur dars: 11.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.13", {
  "lesson": [
    "### CTE nima",
    "`WITH name AS (...)` — so'rov ichida nomlangan vaqtinchalik natija. Murakkab so'rovni o'qiladigan bosqichlarga bo'ladi va bir natijani bir necha marta ishlatishga imkon beradi.",
    "",
    "### Inline va MATERIALIZED",
    "PostgreSQL 12 gacha har bir CTE **har doim alohida hisoblanardi** va optimallashtirish to'sig'i edi: tashqi `WHERE` CTE ichiga kirmasdi. 12+ da yon ta'siri yo'q, rekursiv bo'lmagan va faqat bir marta ishlatilgan CTE asosiy so'rovga **inline** qilinadi, ya'ni oddiy subquery kabi optimallashtiriladi.",
    "",
    "Boshqarish:",
    "- `WITH x AS MATERIALIZED (...)`: bir marta hisoblash majburiy. Og'ir hisob bir necha marta ishlatilsa yoki planner noto'g'ri inline qilsa.",
    "- `WITH x AS NOT MATERIALIZED (...)`: bir necha marta ishlatilsa ham inline.",
    "",
    "### Recursive CTE",
    "Daraxt va graf tuzilmalari uchun: kategoriyalar ierarxiyasi, izohlar zanjiri, tashkilot tuzilmasi, BOM. Tuzilma: boshlang'ich qism `UNION ALL` rekursiv qism. Rekursiv qism CTE'ning o'ziga murojaat qiladi va yangi qator chiqmay qolganda to'xtaydi.",
    "",
    "Xavf: sikl (A → B → A). PG 14+ da `CYCLE id SET is_cycle USING path` siklni aniqlaydi. `SEARCH DEPTH FIRST BY id SET ord` tartibni boshqaradi. Eski versiyalarda yo'lni massivda saqlab, `NOT id = ANY(path)` bilan tekshiring. Har doim chuqurlik chegarasini qo'shish ham foydali.",
    "",
    "### Data-modifying CTE",
    "PostgreSQL'ning kuchli imkoniyati: `INSERT/UPDATE/DELETE ... RETURNING` ni CTE ichida yozish va natijasini keyingi qismda ishlatish. Hammasi **bitta buyruq** va bitta snapshot'da bajariladi, ya'ni atomar.",
    "",
    "Qo'llanishi: eski yozuvlarni arxivga ko'chirish (DELETE + INSERT), upsert natijasini log'ga yozish, navbatdan ishni olish va holatini yangilash.",
    "",
    "Muhim nuance: barcha CTE'lar bir xil snapshot'ni ko'radi. Bir CTE'dagi `UPDATE` natijasini boshqa CTE'dagi `SELECT` jadvaldan o'qib ko'rmaydi. Faqat `RETURNING` orqali oladi.",
    "",
    "### Laravel'da",
    "Query builder'da CTE ichki qo'llanmaydi. `staudenmeir/laravel-cte` paketi `withExpression()` va `withRecursiveExpression()` beradi. Yoki `DB::select()` bilan raw SQL. Daraxtlar uchun `staudenmeir/laravel-adjacency-list` recursive CTE asosida ishlaydi."
  ],
  "examples": [
    {
      "title": "Kategoriya daraxti (recursive)",
      "lang": "sql",
      "code": [
        "WITH RECURSIVE tree AS (",
        "  SELECT id, parent_id, name, 1 AS depth, ARRAY[id] AS path",
        "  FROM categories WHERE id = 10",
        "  UNION ALL",
        "  SELECT c.id, c.parent_id, c.name, t.depth + 1, t.path || c.id",
        "  FROM categories c",
        "  JOIN tree t ON c.parent_id = t.id",
        "  WHERE NOT c.id = ANY(t.path) AND t.depth < 20",
        ")",
        "SELECT id, repeat('  ', depth - 1) || name AS name FROM tree ORDER BY path;"
      ],
      "note": "`path` sikldan himoya qiladi va daraxt tartibida saralashga yordam beradi."
    },
    {
      "title": "Atomar arxivlash va Laravel",
      "lang": "php",
      "code": [
        "$moved = DB::select(<<<'SQL'",
        "    WITH moved AS (",
        "        DELETE FROM sessions",
        "        WHERE last_activity < now() - interval '30 days'",
        "        RETURNING *",
        "    )",
        "    INSERT INTO sessions_archive SELECT * FROM moved",
        "    RETURNING id",
        "SQL);",
        "",
        "Log::info('Arxivlandi', ['count' => count($moved)]);"
      ]
    }
  ],
  "pitfalls": [
    "PG 12+ da CTE'ni hamon optimallashtirish to'sig'i deb hisoblash yoki aksincha, eski versiyada inline bo'ladi deb kutish.",
    "Recursive CTE'da sikl yoki chuqurlik himoyasini qo'ymaslik: noto'g'ri ma'lumotda so'rov cheksiz ishlaydi.",
    "Data-modifying CTE'da bir CTE o'zgartirgan qatorni boshqa CTE jadvaldan o'qib ko'radi deb kutish: hammasi bitta snapshot, faqat `RETURNING` orqali.",
    "Katta to'plamni bitta CTE bilan ko'chirish: uzun tranzaksiya, ko'p WAL va lock. Partiyalarga bo'ling (`LIMIT` bilan sikl)."
  ]
});
