/* Chuqur dars: 14.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.9", {
  "lesson": [
    "### Referential integrity",
    "Aloqador jadvallar orasida **havolalar to'g'riligi**: FK qiymati har doim mavjud ota yozuvga ishora qiladi (\"yetim\" (orphan) yozuvlar yo'q). DB darajasida FK constraint bilan majburlanadi.",
    "",
    "### Amallar (ON DELETE / ON UPDATE)",
    "- `RESTRICT`/`NO ACTION`: bog'liq yozuv bo'lsa o'chirishni/yangilashni rad etadi.",
    "- `CASCADE`: bog'liq yozuvlar ham o'chadi/yangilanadi.",
    "- `SET NULL`: FK `NULL` bo'ladi (ustun `NULL`able bo'lsa).",
    "- (`SET DEFAULT` — InnoDB'da yo'q.)",
    "",
    "### Siyosat tanlash",
    "- Mulk/qismlar (`order → order_lines`): `CASCADE`.",
    "- Muhim tarixiy ma'lumot (`user → orders`): `RESTRICT` yoki soft delete.",
    "- Ixtiyoriy havola (`post → category`): `SET NULL`.",
    "",
    "### FK'siz holatlar",
    "Sharding, mikroservislar orasida, juda yuqori yozish yuklamasi, polimorf aloqa: yaxlitlikni ilova/job tekshiradi (orphan tozalash).",
    "",
    "### Ehtiyot",
    "- `CASCADE` zanjiri ko'p ma'lumotni o'chirishi mumkin.",
    "- FK yozishni biroz sekinlashtiradi.",
    "- Migratsiyada tartib (ota jadval avval), mavjud noto'g'ri ma'lumotni tozalash.",
    "- `foreign_key_checks=0` faqat import uchun, keyin tekshiring.",
    "",
    "### Laravel",
    "`constrained()->cascadeOnDelete()`, `restrictOnDelete()`, `nullOnDelete()`; Eloquent `deleting` observer (mantiqiy cascade), soft deletes.",
    "",
    "### Tekshirish",
    "Orphan topish: `SELECT c.id FROM child c LEFT JOIN parent p ON p.id = c.parent_id WHERE p.id IS NULL;`"
  ],
  "examples": [
    {
      "title": "Siyosatlar",
      "lang": "sql",
      "code": [
        "ALTER TABLE order_lines ADD CONSTRAINT fk_ol_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;",
        "ALTER TABLE orders      ADD CONSTRAINT fk_o_user  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE RESTRICT;",
        "ALTER TABLE posts       ADD CONSTRAINT fk_p_cat   FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;"
      ]
    }
  ],
  "pitfalls": [
    "`CASCADE` zanjiri tasodifan ko'p ma'lumotni o'chiradi: muhim ma'lumotga `RESTRICT`/soft delete.",
    "FK'siz tizimda orphan yozuvlar to'planadi: tozalash jobi.",
    "`SET NULL` uchun ustun `NULL`able bo'lishi shart.",
    "`foreign_key_checks=0` bilan import yaroqsiz havolalar qoldirishi mumkin."
  ]
});
