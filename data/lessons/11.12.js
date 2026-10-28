/* Chuqur dars: 11.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.12", {
  "lesson": [
    "### Qator lock'lari",
    "MVCC tufayli oddiy `SELECT` hech narsani qulflamaydi. Qator lock'lari faqat yozish yoki aniq so'ralganda olinadi. Kuchsizdan kuchliga:",
    "- `FOR KEY SHARE`: qatorni o'chirish va PK/unique kalitni o'zgartirishni taqiqlaydi. FK tekshiruvi avtomatik oladi.",
    "- `FOR SHARE`: boshqalar o'qiy oladi, lekin o'zgartira olmaydi.",
    "- `FOR NO KEY UPDATE`: kalit bo'lmagan ustunlarni `UPDATE` qilish bilan olinadi.",
    "- `FOR UPDATE`: to'liq eksklyuziv. `DELETE` va kalit `UPDATE` oladi.",
    "",
    "Modifikatorlar: `NOWAIT` (band bo'lsa darhol xato), `SKIP LOCKED` (band qatorlarni o'tkazib yuborish). `SKIP LOCKED` navbat jadvallari uchun ideal: bir nechta worker bir-birini kutmasdan turli ishlarni oladi. Laravel `database` queue driver PostgreSQL'da shuni ishlatadi.",
    "",
    "### Jadval lock'lari",
    "8 ta rejim bor. Eng muhimlari:",
    "- `ACCESS SHARE`: har `SELECT` oladi.",
    "- `ROW EXCLUSIVE`: `INSERT/UPDATE/DELETE`.",
    "- `SHARE`: oddiy `CREATE INDEX`. Yozishni bloklaydi.",
    "- `SHARE UPDATE EXCLUSIVE`: `VACUUM`, `CREATE INDEX CONCURRENTLY`, `ANALYZE`. Yozishni bloklamaydi.",
    "- `ACCESS EXCLUSIVE`: ko'p `ALTER TABLE`, `DROP`, `TRUNCATE`, `VACUUM FULL`. **Hamma narsani, hatto `SELECT` ni ham bloklaydi.**",
    "",
    "### Lock navbati xavfi",
    "Eng xavfli holat: migratsiya `ALTER TABLE` uchun `ACCESS EXCLUSIVE` kutyapti, chunki uzoq `SELECT` ishlab turibdi. Navbatda turgan bu lock **keyingi barcha** so'rovlarni, hatto oddiy `SELECT` larni ham bloklaydi. Bir necha soniyada FPM worker'lari tugaydi va sayt to'xtaydi. Himoya: migratsiyadan oldin `SET lock_timeout = '3s'` va retry.",
    "",
    "### Xavfsiz migratsiya usullari",
    "- Indeks: `CREATE INDEX CONCURRENTLY` (tranzaksiyadan tashqarida).",
    "- `NOT NULL` qo'shish: avval `ADD CONSTRAINT ... CHECK (col IS NOT NULL) NOT VALID`, keyin `VALIDATE CONSTRAINT` (yozishni bloklamaydi). PG 12+ da shundan keyin `SET NOT NULL` skan qilmaydi.",
    "- FK: `NOT VALID` + `VALIDATE` xuddi shunday.",
    "- PG 11+ da `ADD COLUMN ... DEFAULT const` jadvalni qayta yozmaydi.",
    "",
    "### Deadlock",
    "Ikki tranzaksiya bir-birining lock'ini kutadi. PostgreSQL `deadlock_timeout` (1s) dan keyin graf tekshiradi va bittasini `ERROR: deadlock detected` (SQLSTATE `40P01`) bilan bekor qiladi. Oldini olish: qatorlarni doim bir xil tartibda qulflash (masalan, ID bo'yicha), tranzaksiyalarni qisqa tutish, kerakli lock'ni boshida olish. Laravel `DB::transaction(..., attempts: 3)` deadlock'da qayta urinadi."
  ],
  "examples": [
    {
      "title": "Kim kimni bloklayapti",
      "lang": "sql",
      "code": [
        "SELECT a.pid, pg_blocking_pids(a.pid) AS blocked_by,",
        "       a.wait_event_type, now() - a.query_start AS waiting, left(a.query, 60)",
        "FROM pg_stat_activity a",
        "WHERE cardinality(pg_blocking_pids(a.pid)) > 0;",
        "",
        "-- Kerak bo'lsa bloklovchini to'xtatish",
        "SELECT pg_cancel_backend(12345);     -- so'rovni bekor qiladi",
        "SELECT pg_terminate_backend(12345);  -- ulanishni uzadi"
      ]
    },
    {
      "title": "Xavfsiz Laravel migratsiyasi",
      "lang": "php",
      "code": [
        "public $withinTransaction = false;",
        "",
        "public function up(): void",
        "{",
        "    DB::statement(\"SET lock_timeout = '3s'\");",
        "    DB::statement('CREATE INDEX CONCURRENTLY IF NOT EXISTS orders_status ON orders (status)');",
        "    DB::statement('ALTER TABLE orders ADD CONSTRAINT orders_customer_nn CHECK (customer_id IS NOT NULL) NOT VALID');",
        "    DB::statement('ALTER TABLE orders VALIDATE CONSTRAINT orders_customer_nn');",
        "}",
        "",
        "// Transfer: lock'larni doim bir xil tartibda olish",
        "DB::transaction(function () use ($a, $b) {",
        "    Account::whereIn('id', [$a, $b])->orderBy('id')->lockForUpdate()->get();",
        "    // ...",
        "}, attempts: 3);"
      ],
      "note": "`CONCURRENTLY` yiqilsa, `INVALID` indeks qoladi. Uni `DROP INDEX CONCURRENTLY` bilan o'chirib, qayta yarating."
    }
  ],
  "pitfalls": [
    "Katta jadvalda `lock_timeout` siz `ALTER TABLE` qilish: lock navbati butun saytni to'xtatadi.",
    "Oddiy `CREATE INDEX` ni production'da ishlatish: indeks qurilguncha jadvalga yozish bloklanadi.",
    "Qatorlarni turli joylarda turli tartibda qulflash: deadlock'lar muntazam paydo bo'ladi.",
    "`lockForUpdate()` ni tranzaksiyasiz chaqirish: lock darhol (autocommit'da) qo'yib yuboriladi va hech narsani himoya qilmaydi."
  ]
});
