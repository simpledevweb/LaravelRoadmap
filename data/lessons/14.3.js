/* Chuqur dars: 14.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.3", {
  "lesson": [
    "### Primary Key tanlash",
    "Qatorni **yagona** aniqlaydi: unikal, `NOT NULL`, **o'zgarmas**. Tanlov:",
    "- **Surrogate (sun'iy):** `BIGINT UNSIGNED AUTO_INCREMENT` — sodda, ixcham, indeks uchun yaxshi.",
    "- **UUID/ULID:** taqsimlangan tizim, ID oldindan bilish, yashirish. UUIDv4 tasodifiy — InnoDB'da fragmentation; **UUIDv7/ULID** tartibli (yaxshiroq). `BINARY(16)` saqlash.",
    "- **Natural:** biznes qiymati (INN, email) — o'zgarishi mumkin, FK'larni buzadi: odatda UNIQUE, PK emas.",
    "- **Composite:** pivot jadvallarda (`(post_id, tag_id)`).",
    "",
    "### Foreign Key",
    "Boshqa jadval PK'siga **havola**: `FOREIGN KEY (user_id) REFERENCES users(id)`. Aloqani va **referential integrity**ni DB darajasida kafolatlaydi (14.9).",
    "- Turi/signedness mos.",
    "- FK ustuniga indeks (InnoDB avtomatik).",
    "- `ON DELETE`/`ON UPDATE`: `RESTRICT`, `CASCADE`, `SET NULL`.",
    "",
    "### Nomlash",
    "`user_id` (`{singular}_id`), PK `id`.",
    "",
    "### Muhim",
    "- Hamma jadvalda PK.",
    "- PK'ni biznes ma'nodan ajrating.",
    "- FK tashlab ketish (tezlik uchun) faqat ongli, ilovada tekshiruv bilan.",
    "",
    "### Laravel",
    "`id()`, `foreignId('user_id')->constrained()`, `uuid('id')->primary()`, `ulid()`.",
    "",
    "### Auto-increment",
    "Ketma-ketlik kafolati yo'q (bo'shliqlar), ID'ni foydalanuvchiga ochish (enumeration/IDOR): ommaviy URL'da UUID/ULID/`hashids`."
  ],
  "examples": [
    {
      "title": "PK va FK",
      "lang": "sql",
      "code": [
        "CREATE TABLE posts (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  user_id BIGINT UNSIGNED NOT NULL,",
        "  slug VARCHAR(160) NOT NULL,",
        "  UNIQUE KEY uq_slug (slug),",
        "  CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Natural kalit (email) PK bo'lsa o'zgarganda barcha FK'lar buziladi.",
    "Tasodifiy UUIDv4 PK InnoDB'da sahifa bo'linishini ko'paytiradi: UUIDv7/ULID.",
    "Ketma-ket ID'ni ochiq URL'da ko'rsatish enumeration/IDOR xavfi.",
    "FK turi PK bilan mos bo'lmasa (signed/unsigned) FK yaratilmaydi."
  ]
});
