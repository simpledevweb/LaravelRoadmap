/* Chuqur dars: 55.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.17", {
  "lesson": [
    "### Dublikat indekslar",
    "Bir xil ustunlar bir xil tartibda (yoki boshqasining chap prefiksi): `INDEX (a)` va `INDEX (a, b)` — `(a)` **ortiqcha** (`(a, b)` uni qoplaydi). `INDEX (a)` va `UNIQUE (a)` — `INDEX` ortiqcha.",
    "",
    "### Ishlatilmaydigan indekslar",
    "Hech qaysi so'rov foydalanmaydi: faqat yozishni sekinlashtiradi va joy egallaydi.",
    "",
    "### Topish",
    "- **MySQL:** `sys.schema_redundant_indexes`, `sys.schema_unused_indexes`; `pt-duplicate-key-checker`.",
    "- **PostgreSQL:** `pg_stat_user_indexes` (`idx_scan = 0`), dublikat uchun `pg_index` so'rovlari/`pgstattuple`.",
    "- Laravel migratsiyalari tarixida takror `index()` qo'shilishi.",
    "",
    "### O'chirishdan oldin",
    "1. Kuzating (kamida to'liq biznes tsikl, replika bilan).",
    "2. **Unique/PK/FK**ni o'chirmang.",
    "3. FK uchun indeks kerak (MySQL FK ustuniga indeks talab qiladi): ikkinchisi bor bo'lsa birinchisini o'chirish mumkin.",
    "4. Avval **ko'rinmas qiling** (MySQL 8.0: `ALTER TABLE t ALTER INDEX idx INVISIBLE;` — optimizer ko'rmaydi, o'chirmay sinash; keyin `DROP`).",
    "5. Staging'da sinang, monitoring bilan, qaytarish rejasi.",
    "",
    "### Foydasi",
    "Yozish tezlashadi, xotira/disk tejaladi, texnik xizmat osonlashadi.",
    "",
    "### Oldini olish",
    "Indeks qo'shishdan oldin mavjudini tekshiring; code review; muntazam audit (chorak).",
    "",
    "### Laravel",
    "`Schema::table(..., fn ($t) => $t->dropIndex('idx_name'))` yoki `dropIndex(['col'])`."
  ],
  "examples": [
    {
      "title": "Invisible va drop",
      "lang": "sql",
      "code": [
        "ALTER TABLE orders ALTER INDEX idx_user INVISIBLE;     -- optimizer ko'rmaydi: xavfsiz sinov (MySQL 8.0)",
        "-- kuzating; muammo bo'lmasa",
        "ALTER TABLE orders DROP INDEX idx_user;",
        "-- muammo bo'lsa: ALTER TABLE orders ALTER INDEX idx_user VISIBLE;"
      ]
    }
  ],
  "pitfalls": [
    "FK/unique/PK indekslarini 'ishlatilmaydi' deb o'chirib qo'ymang.",
    "Kuzatuvsiz (qisqa muddat) o'chirish kamdan-kam so'rovni sekinlashtiradi: invisible bilan sinang.",
    "`(a)` va `(a, b)` ni birga saqlash ortiqcha: chap prefiks.",
    "Replikada o'qish bo'lsa faqat asosiy server statistikasiga tayanmang."
  ]
});
