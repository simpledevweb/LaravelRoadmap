/* Chuqur dars: 55.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.9", {
  "lesson": [
    "### Hash indeks",
    "Kalitning **xeshi** bo'yicha qidirish: faqat **tenglik** (`=`, `IN`) uchun O(1). Diapazon, `ORDER BY`, prefiks — **yo'q**.",
    "",
    "### MySQL",
    "- **MEMORY** dvigatelida `USING HASH` (default).",
    "- **InnoDB'da** foydalanuvchi hash indeks yarata olmaydi; ichkarida **Adaptive Hash Index** (AHI) avtomatik: tez-tez ishlatiladigan B-tree sahifalari uchun xesh (`innodb_adaptive_hash_index`; ba'zan yuqori parallellikda to'qnashuv sababli o'chiriladi).",
    "- Qo'lda emulyatsiya: **xesh ustun** (`url_hash BINARY(16) = UNHEX(MD5(url))` + B-tree) uzun matn uchun.",
    "",
    "### PostgreSQL",
    "`CREATE INDEX ON t USING HASH (col);` (10+ da WAL-xavfsiz, crash-safe). Faqat `=`; ko'pincha B-tree yetarli va ko'p qirrali.",
    "",
    "### Qachon",
    "- Faqat tenglik qidirish, juda uzun kalit (URL, matn): kichik indeks.",
    "- Keshga o'xshash lookup.",
    "",
    "### Qachon yo'q",
    "Diapazon/tartib/prefiks kerak bo'lsa; unique constraint (PostgreSQL hash unique'ni qo'llamaydi).",
    "",
    "### Xesh to'qnashuvi",
    "Turli kalit bir xesh berishi mumkin: xesh ustun bilan qo'shimcha asl qiymat tekshiruvi (`AND url = ?`).",
    "",
    "### Amaliyot",
    "Odatda B-tree yetarli; hash — maxsus holat va o'lchov asosida."
  ],
  "examples": [
    {
      "title": "Xesh ustun (MySQL)",
      "lang": "sql",
      "code": [
        "ALTER TABLE links",
        "  ADD COLUMN url_hash BINARY(16) GENERATED ALWAYS AS (UNHEX(MD5(url))) STORED,",
        "  ADD INDEX idx_url_hash (url_hash);",
        "",
        "SELECT id FROM links WHERE url_hash = UNHEX(MD5('https://x.uz/a')) AND url = 'https://x.uz/a';   -- to'qnashuvga qarshi"
      ]
    }
  ],
  "pitfalls": [
    "Hash indeks diapazon va `ORDER BY` ni qo'llamaydi.",
    "Xesh to'qnashuvi: asl qiymatni ham tekshiring.",
    "InnoDB'da qo'lda hash indeks yo'q: xesh ustun + B-tree.",
    "Adaptive Hash Index ba'zan yuqori parallellikda to'qnashuv beradi (o'lchang)."
  ]
});
