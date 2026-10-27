/* Chuqur dars: 15.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.20", {
  "lesson": [
    "### Zero-downtime migratsiyalar",
    "Production'da sxemani **to'xtatmasdan** (foydalanuvchi sezmasdan) o'zgartirish. Katta jadvalda oddiy `ALTER` uzoq qulf beradi.",
    "",
    "### Qoidalar",
    "1. **Expand → Migrate → Contract** (14.17): avval qo'shing, ikkalasiga yozing, ko'chiring, o'qishni almashtiring, oxirida eskisini o'chiring.",
    "2. **Orqaga mos** (eski va yangi kod bir vaqtda ishlaydi).",
    "3. **Backfill bo'laklab** (alohida job, `chunkById`, uzilmaydigan).",
    "4. **Feature flag** bilan yoqish.",
    "",
    "### Online DDL vositalari",
    "- **MySQL:** `ALGORITHM=INSTANT` (8.0.12+: ustun qo'shish/ba'zi o'zgarishlar, ma'lumotsiz), `INPLACE, LOCK=NONE` (indeks).",
    "- **gh-ost** (GitHub): triggerlarsiz binlog asosida shadow-table ko'chirish, to'xtatish/davom ettirish.",
    "- **pt-online-schema-change** (Percona): trigger asosida.",
    "- **PostgreSQL:** `CREATE INDEX CONCURRENTLY`, `ADD COLUMN` (default bilan 11+ tez), `NOT VALID` constraint + `VALIDATE`.",
    "",
    "### Xavfli",
    "`ADD COLUMN ... NOT NULL` (default'siz), tur o'zgartirish, ustun o'chirish/nomlash, katta jadvalda FK qo'shish, `OPTIMIZE`, metadata lock (uzoq tranzaksiya ostida `ALTER` hammani bloklaydi).",
    "",
    "### Metadata lock tuzog'i",
    "`ALTER` uzoq tranzaksiyani kutadi va **keyingi so'rovlarni bloklaydi**: `lock_wait_timeout` ni qisqa qo'ying, uzoq tranzaksiyalarni oldin tekshiring.",
    "",
    "### Read/Write split bilan",
    "Replika lag'ni kuzating (DDL replikaga ham o'tadi); katta migratsiya lag beradi.",
    "",
    "### Jarayon",
    "Staging (production hajmida) → rejalashtirish (past yuklama) → monitoring → rollback rejasi (forward-fix) → verify.",
    "",
    "### Laravel",
    "Migratsiyada xom `ALTER ... ALGORITHM=INSTANT`; backfill — command/job; `$withinTransaction = false` (PG `CONCURRENTLY`)."
  ],
  "examples": [
    {
      "title": "Online ALTER",
      "lang": "sql",
      "code": [
        "SET SESSION lock_wait_timeout = 5;                                           -- uzoq kutib hammani bloklamaslik",
        "ALTER TABLE orders ADD COLUMN currency CHAR(3) NULL, ALGORITHM=INSTANT;",
        "ALTER TABLE orders ADD INDEX idx_user_created (user_id, created_at), ALGORITHM=INPLACE, LOCK=NONE;",
        "-- katta o'zgarish: gh-ost --alter=\"MODIFY total DECIMAL(14,2)\" --database=shop --table=orders --execute"
      ]
    }
  ],
  "pitfalls": [
    "Uzoq tranzaksiya ostida `ALTER` metadata lock'da osilib keyingi so'rovlarni bloklaydi: `lock_wait_timeout`.",
    "`ADD COLUMN NOT NULL` default'siz katta jadvalda xato/uzoq qulf.",
    "Backfill'ni migratsiya ichida bajarish timeout/qulf beradi: alohida job, bo'laklab.",
    "Katta migratsiya replica lag'ni oshiradi: monitoring qiling."
  ]
});
