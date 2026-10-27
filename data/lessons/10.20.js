/* Chuqur dars: 10.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.20", {
  "lesson": [
    "### Charset va Collation",
    "- **Charset (kodlash):** belgilar qanday baytlarga aylanadi.",
    "- **Collation:** belgilarni **solishtirish va tartiblash** qoidalari (registrga sezgirlik, aksent).",
    "",
    "### utf8mb4",
    "MySQL'da `utf8mb4` — haqiqiy UTF-8 (4 bayt gacha, emoji ham). `utf8` aslida `utf8mb3` (3 bayt, emoji yo'q) va eskirgan: doim `utf8mb4`.",
    "",
    "### Collation",
    "- 8.0 default: `utf8mb4_0900_ai_ci` (Unicode 9.0, accent-insensitive, case-insensitive).",
    "- Laravel default (`config/database.php`): `utf8mb4_unicode_ci`.",
    "- `_ci` registrga sezgir emas, `_cs`/`_bin` sezgir, `_ai` aksentga sezgir emas.",
    "- `'a' = 'A'` (ci) → rost. Unique indeks ham registrga sezgir emas (ci).",
    "",
    "### Daraja",
    "Server → baza → jadval → ustun. Ulanish charseti (`SET NAMES utf8mb4`; Laravel `charset`/`collation` config).",
    "",
    "### Muammolar",
    "- **\"Illegal mix of collations\"** — turli collation'li ustunlarni solishtirish/JOIN.",
    "- **Indeks hajmi:** `utf8mb4` ustunda `VARCHAR(255)` = 1020 bayt; eski cheklov (767 bayt) bilan \"Specified key was too long\" (5.7+ DYNAMIC'da 3072).",
    "- Tartiblash tilga bog'liq (o'zbek lotin uchun mos collation yo'q: `utf8mb4_unicode_ci` taxminiy).",
    "- Emoji `utf8` (mb3) da `?` bo'lib saqlanadi/xato.",
    "",
    "### O'zgartirish",
    "`ALTER TABLE t CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;` (katta jadvalda qulf/vaqt; zaxira va sinov).",
    "",
    "### Qoidalar",
    "Loyihada bitta charset/collation; ulanish bilan jadval mos; `utf8mb4` bilan boshlang."
  ],
  "examples": [
    {
      "title": "Tekshirish va o'zgartirish",
      "lang": "sql",
      "code": [
        "SHOW VARIABLES LIKE 'character_set%';",
        "SHOW VARIABLES LIKE 'collation%';",
        "SELECT table_name, table_collation FROM information_schema.TABLES WHERE table_schema = 'shop';",
        "ALTER TABLE posts CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
      ]
    }
  ],
  "pitfalls": [
    "`utf8` (mb3) emoji'ni saqlay olmaydi: `utf8mb4`.",
    "Turli collation'li ustunlarni JOIN qilish 'Illegal mix of collations' xatosi.",
    "`_ci` collation'da `unique` 'a' va 'A' ni bir xil deb hisoblaydi.",
    "Katta jadvalni `CONVERT TO` qilish uzoq qulf beradi: rejalashtiring va zaxiralang."
  ]
});
