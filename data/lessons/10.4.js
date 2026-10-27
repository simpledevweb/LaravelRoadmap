/* Chuqur dars: 10.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.4", {
  "lesson": [
    "### Primary Key",
    "Qatorni **yagona aniqlaydi**: unikal va `NOT NULL`. InnoDB'da PK — **clustered index** (jadval ma'lumoti shu tartibda). Har jadvalda PK bo'lsin.",
    "- `BIGINT UNSIGNED AUTO_INCREMENT` (oddiy), UUIDv7/ULID (taqsimlangan tizim; tartiblangan).",
    "- Qisqa va o'zgarmas bo'lsin; composite PK pivot jadvallarda.",
    "- Auto-increment **bo'shliqlar** qoldirishi mumkin (rollback, parallel insert): ketma-ketlik kafolati yo'q.",
    "",
    "### Unique",
    "`UNIQUE KEY` qiymat takrorlanmasligini kafolatlaydi; `NULL` qiymatlar **ko'p** bo'lishi mumkin (har NULL boshqa). Unikal indeks tezlashtiradi ham. Laravel `unique()`; validatsiya `unique` qoidasi **tekshiruv poygasi (race)** ga ega: DB constraint — asosiy himoya.",
    "",
    "### Foreign Key",
    "Boshqa jadval ustuniga **havola** va **referential integrity**: mavjud bo'lmagan yozuvga ishora qila olmaysiz.",
    "```sql",
    "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE RESTRICT",
    "```",
    "- Amallar: `RESTRICT/NO ACTION`, `CASCADE`, `SET NULL`, `SET DEFAULT` (InnoDB'da qo'llanmaydi).",
    "- Faqat **InnoDB**. Ustun turi mos (signed/unsigned, uzunlik). FK ustuniga indeks avtomatik yaratiladi.",
    "- Laravel: `foreignId('user_id')->constrained()->cascadeOnDelete()`.",
    "",
    "### Ehtiyot",
    "- `CASCADE` xavfli: tasodifan ko'p qator o'chadi.",
    "- Katta jadvallarda FK yozishni sekinlashtiradi (tekshiruv); ba'zi tizimlar (sharding) ilova darajasida tekshiradi.",
    "- FK yaratishdan oldin ma'lumot mos bo'lishi shart."
  ],
  "examples": [
    {
      "title": "PK, UNIQUE, FK",
      "lang": "sql",
      "code": [
        "CREATE TABLE orders (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  user_id BIGINT UNSIGNED NOT NULL,",
        "  number VARCHAR(20) NOT NULL,",
        "  UNIQUE KEY uq_number (number),",
        "  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT",
        ") ENGINE=InnoDB;"
      ]
    }
  ],
  "pitfalls": [
    "Laravel `unique` validatsiyasi poyga holatida takror yozuvga yo'l qo'yadi: DB `UNIQUE` constraint shart.",
    "`ON DELETE CASCADE` tasodifan ko'p ma'lumotni o'chirishi mumkin.",
    "FK ustun turi PK bilan mos bo'lmasa (unsigned/signed) xato beradi.",
    "Auto-increment bo'shliqsiz ketma-ket bo'ladi deb o'ylash noto'g'ri."
  ]
});
