/* Chuqur dars: 9.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.12", {
  "lesson": [
    "### Primary Key",
    "Qatorni **yagona** aniqlaydi: unikal, `NOT NULL`, jadvalda bitta (composite bo'lishi mumkin). InnoDB'da **clustered index**. Tanlov: `BIGINT UNSIGNED AUTO_INCREMENT` (sodda, ixcham, tartibli) yoki UUIDv7/ULID (taqsimlangan); tasodifiy UUIDv4 — fragmentation.",
    "",
    "### Surrogate vs Natural",
    "- **Surrogate** (sun'iy ID): o'zgarmas, qisqa — tavsiya.",
    "- **Natural** (email, INN): biznes ma'nosi bor, lekin o'zgarishi mumkin (FK'lar buziladi).",
    "",
    "### Foreign Key",
    "Ustun boshqa jadval (odatda PK)ga **havola**; mavjud bo'lmagan qiymat kiritilmaydi, bog'liq yozuv o'chirilganda harakat:",
    "```sql",
    "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE RESTRICT",
    "```",
    "Amallar: `RESTRICT`/`NO ACTION`, `CASCADE`, `SET NULL`.",
    "",
    "### Talablar (InnoDB)",
    "Ikkala jadval InnoDB; ustun turi, belgilar to'plami/collation **bir xil** (`BIGINT UNSIGNED` ↔ `BIGINT UNSIGNED`); havola qilinadigan ustunda indeks; FK ustuniga indeks avtomatik.",
    "",
    "### Ehtiyot",
    "- `CASCADE` ommaviy o'chirishga olib kelishi mumkin.",
    "- FK yozishni biroz sekinlashtiradi (tekshiruv); katta tizimlarda ba'zan ilova darajasida.",
    "- Aylanma FK (A→B→A) murakkab; `NULL`able ustun bilan hal qilinadi.",
    "- Migratsiya tartibi: avval ota jadval.",
    "",
    "### Laravel",
    "`id()`, `foreignId('user_id')->constrained()->cascadeOnDelete()`, `foreignUuid()`, `$table->foreignId(...)->nullable()->nullOnDelete()`."
  ],
  "examples": [
    {
      "title": "Jadvallar",
      "lang": "sql",
      "code": [
        "CREATE TABLE users (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE);",
        "CREATE TABLE posts (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  user_id BIGINT UNSIGNED NOT NULL,",
        "  title VARCHAR(200) NOT NULL,",
        "  CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE",
        ") ENGINE=InnoDB;"
      ]
    }
  ],
  "pitfalls": [
    "FK ustun turi PK bilan mos bo'lmasa (signed/unsigned) FK yaratib bo'lmaydi.",
    "`CASCADE` tasodifan ko'p ma'lumotni o'chiradi: `RESTRICT`/soft delete ni ko'rib chiqing.",
    "Natural kalit (email) PK bo'lsa o'zgarganda barcha FK'lar buziladi.",
    "Migratsiya tartibi: ota jadval FK'dan oldin yaratilsin."
  ]
});
