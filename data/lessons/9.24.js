/* Chuqur dars: 9.24. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.24", {
  "lesson": [
    "### Bulk (ommaviy) operatsiyalar",
    "Ko'p qatorni **bitta so'rov/tranzaksiya**da qayta ishlash: tarmoq, parse va commit yukini kamaytiradi. Tsikldagi yagona `INSERT`lar sekin.",
    "",
    "### Bulk INSERT",
    "```sql",
    "INSERT INTO log_entries (user_id, action) VALUES (1,'a'), (2,'b'), (3,'c');",
    "```",
    "Optimal bo'lak: 500–5000 qator (`max_allowed_packet` chegarasi). Laravel `DB::table()->insert([...])` (ommaviy), `insertOrIgnore`, `upsert($rows, ['unique'], ['update'])`.",
    "`LOAD DATA INFILE` / `LOAD DATA LOCAL INFILE` — eng tez import (CSV), ruxsat va xavfsizlik (`local_infile`).",
    "",
    "### Bulk UPDATE/DELETE",
    "- Bo'laklab: `UPDATE ... WHERE id BETWEEN a AND b`, yoki `LIMIT 1000` tsikli (uzun qulf va replica lag'dan saqlanish).",
    "- `JOIN` bilan UPDATE: `UPDATE a JOIN b ON ... SET a.x = b.y`.",
    "- `CASE` bilan bir so'rovda turli qiymat.",
    "- Katta o'chirish: bo'laklab yoki partitsiya `DROP PARTITION`; butunlay: `TRUNCATE`.",
    "",
    "### Tranzaksiya",
    "Bo'lak = bitta tranzaksiya (commit chastotasini kamaytiradi, lekin juda katta emas: undo/qulf/lag).",
    "",
    "### Tezlashtirish (import uchun)",
    "Vaqtincha: indekslarni keyin yaratish, `unique_checks=0`, `foreign_key_checks=0` (ehtiyot), `autocommit=0`, katta `innodb_buffer_pool`.",
    "",
    "### Ehtiyot",
    "- Bitta ulkan `INSERT` `max_allowed_packet`dan oshadi.",
    "- Katta tranzaksiya replica lag va undo o'sishini beradi.",
    "- Upsert'da `AUTO_INCREMENT` bo'shliqlar.",
    "- Xotira: katta massivni `chunk`/generator bilan.",
    "",
    "### Laravel",
    "`chunkById`, `lazyById`, `insert(array_chunk($rows, 1000))`, `upsert`, Job'larda bo'lak-bo'lak, `Model::withoutEvents()` (tez, lekin hodisalar ishlamaydi)."
  ],
  "examples": [
    {
      "title": "Bo'laklab insert va upsert",
      "lang": "php",
      "code": [
        "foreach (array_chunk($rows, 1000) as $chunk) {",
        "    DB::table('products')->upsert($chunk, ['sku'], ['name', 'price']);   // ommaviy upsert",
        "}",
        "",
        "// katta o'chirishni bo'laklash",
        "do { $n = DB::table('logs')->where('created_at', '<', now()->subDays(90))->limit(5000)->delete(); } while ($n > 0);"
      ]
    }
  ],
  "pitfalls": [
    "Bitta juda katta `INSERT` `max_allowed_packet`dan oshadi: bo'laklang.",
    "Katta bitta tranzaksiya undo, qulf va replica lag'ni oshiradi.",
    "`foreign_key_checks=0` bilan import yaroqsiz ma'lumot kiritishi mumkin.",
    "Tsiklda yagona `INSERT` minglab so'rovga olib keladi: batch."
  ]
});
