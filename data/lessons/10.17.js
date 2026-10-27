/* Chuqur dars: 10.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.17", {
  "lesson": [
    "### Slow Query Log",
    "Belgilangan vaqtdan **sekin** bajarilgan so'rovlarni faylga (yoki jadvalga) yozadi: optimallash uchun asosiy manba.",
    "",
    "### Yoqish",
    "```ini",
    "slow_query_log = 1",
    "slow_query_log_file = /var/log/mysql/slow.log",
    "long_query_time = 1                 ; soniya (default 10: juda katta)",
    "log_queries_not_using_indexes = 1   ; ehtiyot: shovqin",
    "min_examined_row_limit = 100",
    "```",
    "Runtime: `SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 1;` (qayta ishga tushirishda yo'qoladi).",
    "",
    "### Yozuv mazmuni",
    "Vaqt, foydalanuvchi, `Query_time`, `Lock_time`, `Rows_sent`, `Rows_examined`, SQL. `Rows_examined >> Rows_sent` — indeks yetishmasligi belgisi.",
    "",
    "### Tahlil vositalari",
    "- `mysqldumpslow` (standart): `mysqldumpslow -s t -t 10 slow.log`.",
    "- `pt-query-digest` (Percona Toolkit): shablon bo'yicha guruhlash, eng ko'p vaqt oluvchilar.",
    "- `performance_schema.events_statements_summary_by_digest` va `sys.statement_analysis`.",
    "- APM (Datadog, New Relic), Laravel Telescope/`DB::listen`.",
    "",
    "### Jarayon",
    "1. `long_query_time` ni pasaytirib (0.5–1 s) yig'ing.",
    "2. Eng og'ir shablonlarni toping (jami vaqt = tezlik × soni).",
    "3. `EXPLAIN`, indeks/so'rovni tuzating.",
    "4. Qayta o'lchang.",
    "",
    "### Ehtiyot",
    "`long_query_time=0` hamma so'rovni yozadi (diskka yuk); log rotatsiyasi; parol/shaxsiy ma'lumot SQL'da bo'lishi mumkin (loglarga ruxsat cheklangan).",
    "",
    "### Laravel",
    "`DB::whenQueryingForLongerThan(500, function ($conn, $query) { Log::warning(...); })`."
  ],
  "examples": [
    {
      "title": "Yoqish va tahlil",
      "lang": "bash",
      "code": [
        "mysql -e \"SET GLOBAL slow_query_log='ON'; SET GLOBAL long_query_time=1;\"",
        "mysqldumpslow -s t -t 10 /var/log/mysql/slow.log",
        "pt-query-digest /var/log/mysql/slow.log | head -60"
      ]
    }
  ],
  "pitfalls": [
    "Default `long_query_time=10` juda katta: ko'p sekin so'rovlar sezilmaydi.",
    "`log_queries_not_using_indexes` shovqin beradi (kichik jadvallar): ehtiyotkorlik.",
    "Log rotatsiyasi bo'lmasa fayl diskni to'ldiradi.",
    "Bitta so'rov tez, lekin minglab marta chaqirilsa umumiy vaqt katta: shablon bo'yicha jami vaqtga qarang."
  ]
});
