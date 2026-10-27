/* Chuqur dars: 15.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.12", {
  "lesson": [
    "### Bulk operatsiyalar",
    "(Asos: 9.24.) Ko'p qatorni **bitta so'rov/tranzaksiya**da: tarmoq/parse/commit yukini kamaytiradi. Tsiklda bittalab yozish — eng keng tarqalgan sekinlik sababi.",
    "",
    "### Usullar",
    "- **Ko'p qatorli INSERT** (500–5000 qator bo'lak): `DB::table()->insert($rows)`.",
    "- `upsert` (`INSERT ... ON DUPLICATE KEY UPDATE`): mavjudni yangilash, yo'qni qo'shish.",
    "- `UPDATE ... WHERE id IN (...)`, `JOIN` bilan UPDATE, `CASE` bilan turli qiymat.",
    "- `LOAD DATA INFILE` (import, eng tez).",
    "- **Bo'laklab DELETE:** `LIMIT 5000` tsikli (qulf va replica lag).",
    "- `chunkById`/`lazyById` — o'qish va qayta ishlash.",
    "",
    "### Tranzaksiya",
    "Bo'lak = bitta tranzaksiya (commit kam). Juda katta emas: undo/qulf/replica lag.",
    "",
    "### Import tezlashtirish",
    "Indekslarni keyin yaratish, `autocommit=0`, `unique_checks=0`/`foreign_key_checks=0` (ehtiyot bilan), kattaroq buffer pool.",
    "",
    "### Eloquent",
    "Model hodisalari va `create()` tsikli sekin: `insert()`/`upsert()` hodisalarsiz (`created_at`ni qo'lda). `Model::withoutEvents()`.",
    "",
    "### Navbat",
    "Juda katta ish — queue job'larga bo'lib (har biri bo'lak), idempotent.",
    "",
    "### Xavflar",
    "`max_allowed_packet`, katta tranzaksiya → replica lag, xotira (`chunk`), qisman muvaffaqiyat (xatoda qaytarish/idempotentlik)."
  ],
  "examples": [
    {
      "title": "Bo'laklab upsert",
      "lang": "php",
      "code": [
        "collect($rows)->chunk(1000)->each(fn ($c) =>",
        "    DB::table('products')->upsert($c->all(), ['sku'], ['name', 'price', 'updated_at'])",
        ");",
        "User::query()->whereIn('id', $ids)->update(['active' => false]);       // bitta UPDATE"
      ]
    }
  ],
  "pitfalls": [
    "Tsiklda `create()` har qator uchun so'rov + hodisalar: `insert()`/`upsert()`.",
    "Katta bitta tranzaksiya undo va replica lag'ni oshiradi: bo'laklang.",
    "`upsert`da `created_at` va hodisalar avtomatik emas.",
    "`foreign_key_checks=0` bilan import yaroqsiz havolalar qoldirishi mumkin."
  ]
});
