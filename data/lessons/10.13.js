/* Chuqur dars: 10.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.13", {
  "lesson": [
    "### MVCC",
    "**Multi-Version Concurrency Control** — har bir qatorning bir nechta **versiyasi** saqlanadi; o'quvchilar yozuvchilarni **bloklamaydi**, yozuvchilar o'quvchilarni bloklamaydi.",
    "",
    "### Qanday ishlaydi (InnoDB)",
    "- Har qatorda yashirin maydonlar: `DB_TRX_ID` (oxirgi o'zgartirgan tranzaksiya), `DB_ROLL_PTR` (undo log'dagi eski versiyaga ko'rsatkich).",
    "- Yangilanganda eski qiymat **undo log**ga o'tadi.",
    "- O'qish **read view** (snapshot) bilan: ko'rinadigan versiyani tanlaydi (tranzaksiya ID bo'yicha), kerak bo'lsa undo zanjiri orqali eski versiyani tiklaydi.",
    "",
    "### Izolyatsiya bilan aloqasi",
    "- **READ COMMITTED:** har **bayonotda** yangi read view.",
    "- **REPEATABLE READ:** tranzaksiya **birinchi o'qishda** read view oladi va tugaguncha ushlaydi.",
    "- Oddiy `SELECT` (consistent read) qulfsiz; `FOR UPDATE/SHARE` esa **oxirgi** versiyani o'qiydi va qulflaydi.",
    "",
    "### Purge",
    "Hech bir tranzaksiyaga kerak bo'lmagan eski versiyalar (undo) fon jarayoni (**purge**) bilan tozalanadi.",
    "",
    "### Muammo: uzoq tranzaksiya",
    "Ochiq uzoq tranzaksiya eski versiyalarni ushlab turadi: undo o'sadi (**history list length**), jadval/indeks \"shishadi\", qidirish sekinlashadi. `SHOW ENGINE INNODB STATUS` → \"History list length\".",
    "",
    "### Foydasi",
    "Yuqori parallellik: o'qishlar kutmaydi; qaytarish (rollback) undo orqali.",
    "",
    "### Amaliyot",
    "Tranzaksiyalarni qisqa tuting; hisobot/uzun o'qishni replika'da yuriting; `information_schema.INNODB_TRX` da eski tranzaksiyalarni toping."
  ],
  "examples": [
    {
      "title": "Uzun tranzaksiyalarni topish",
      "lang": "sql",
      "code": [
        "SELECT trx_id, trx_started, TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS sec, trx_query",
        "FROM information_schema.INNODB_TRX",
        "ORDER BY trx_started LIMIT 10;",
        "SHOW ENGINE INNODB STATUS\\G   -- History list length"
      ]
    }
  ],
  "pitfalls": [
    "Uzoq ochiq tranzaksiya undo'ni to'plab 'history list length'ni oshiradi va sekinlashtiradi.",
    "Consistent read va `FOR UPDATE` turli versiyani ko'radi: biri snapshot, ikkinchisi oxirgisi.",
    "Tranzaksiyani commit/rollback qilmay qoldirish (ulanish ochiq) muammo manbai.",
    "Hisobotlarni asosiy bazada uzoq tranzaksiya bilan yuritish o'rniga replikada."
  ]
});
