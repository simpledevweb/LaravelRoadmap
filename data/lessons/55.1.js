/* Chuqur dars: 55.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.1", {
  "lesson": [
    "### Primary index",
    "**Primary key** indeksi — jadvalning asosiy, unikal, `NOT NULL` indeksi. **InnoDB'da u clustered**: jadval qatorlari shu B-tree'ning barg sahifalarida PK tartibida saqlanadi. PK bo'yicha qidirish eng tez (qo'shimcha lookup yo'q).",
    "",
    "### Natijalari",
    "- **Qisqa PK** — barcha secondary indekslar kichik (har biri PK'ni saqlaydi).",
    "- **O'suvchi (monotonic) PK** — yangi qatorlar oxiriga yoziladi: sahifa bo'linishi kam. Tasodifiy UUIDv4 — fragmentation; UUIDv7/ULID yaxshi.",
    "- PK bo'lmasa InnoDB yashirin 6 baytli ID yaratadi (yoki birinchi `UNIQUE NOT NULL`).",
    "- PK **o'zgartirilmaydi** (qator jismonan ko'chadi).",
    "",
    "### PostgreSQL farqi",
    "PostgreSQL'da PK oddiy (non-clustered) B-tree; jadval \"heap\"da; `CLUSTER` bir martalik.",
    "",
    "### Composite PK",
    "Pivot jadvallarda `(post_id, tag_id)`: ustun tartibi muhim (chap prefiks).",
    "",
    "### Tanlov",
    "`BIGINT UNSIGNED AUTO_INCREMENT` (odatiy); taqsimlangan tizimda UUIDv7/ULID (`BINARY(16)`).",
    "",
    "### Laravel",
    "`$table->id()`, `$table->uuid('id')->primary()`, `ulid()`. Model `$incrementing`, `$keyType`.",
    "",
    "### Xatolar",
    "Uzun matn PK (barcha indekslarni shishiradi), tasodifiy UUID PK, PK'siz jadval (replikatsiya/DDL muammolari)."
  ],
  "examples": [
    {
      "title": "PK",
      "lang": "sql",
      "code": [
        "CREATE TABLE events (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,   -- clustered",
        "  user_id BIGINT UNSIGNED NOT NULL,",
        "  KEY idx_user (user_id)                             -- secondary: (user_id, id)",
        ") ENGINE=InnoDB;"
      ]
    }
  ],
  "pitfalls": [
    "Uzun PK barcha secondary indekslarni kattalashtiradi.",
    "Tasodifiy UUIDv4 PK sahifa bo'linishini ko'paytiradi: UUIDv7/ULID.",
    "PK'ni o'zgartirish qatorni jismonan ko'chiradi (qimmat).",
    "PK'siz jadval replikatsiya va online DDL'da muammo beradi."
  ]
});
