/* Chuqur dars: 9.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.21", {
  "lesson": [
    "### Optimallash tartibi",
    "1. **O'lchang:** slow log, `EXPLAIN`, APM.",
    "2. **Eng og'ir shablonlarni** toping (jami vaqt).",
    "3. **Tuzatish:** indeks / so'rov / sxema.",
    "4. **Qayta o'lchang.**",
    "",
    "### Texnikalar",
    "- **Kerakli ustunlar:** `SELECT *` yo'q.",
    "- **Sargable shartlar** va mos indekslar.",
    "- **N+1 ni yo'qoting:** `JOIN`/`IN`/eager loading.",
    "- **Keyset pagination** (katta `OFFSET` o'rniga).",
    "- **Aggregatsiyani bazada** (ilovada tsikl o'rniga).",
    "- **Batch:** ko'p qatorli INSERT, `chunk`.",
    "- `EXISTS` mavjudlik uchun (`COUNT(*) > 0` o'rniga).",
    "- `UNION ALL` `OR` o'rniga (turli ustun).",
    "- `LIMIT` kerakli joyda.",
    "- **Kesh:** tez-tez o'qiladigan, kam o'zgaradigan natija.",
    "- **Denormalizatsiya** (hisoblagich ustunlari) ehtiyot bilan.",
    "- **Statistika:** `ANALYZE TABLE`.",
    "",
    "### Anti-pattern'lar",
    "`ORDER BY RAND()`, tsiklda so'rov, `DISTINCT` bilan join xatosini yashirish, katta `IN (...)` (10k+), `LIKE '%x%'`, `COUNT(*)` har sahifada.",
    "",
    "### Sxema darajasida",
    "To'g'ri ma'lumot turlari, normalizatsiya (yoki ongli denormalizatsiya), partitsiya (juda katta jadval).",
    "",
    "### Arxitektura",
    "Replika (o'qish), kesh (Redis), navbat (og'ir ishni fon'ga), qidiruv dvigateli.",
    "",
    "### Qoida",
    "Eng katta yutuq odatda bitta yetishmayotgan indeks yoki N+1; mikrooptimizatsiyadan oldin ularni tekshiring."
  ],
  "examples": [
    {
      "title": "EXISTS va batch",
      "lang": "sql",
      "code": [
        "SELECT EXISTS (SELECT 1 FROM orders WHERE user_id = 5 AND status = 'paid') AS has_paid;   -- COUNT(*)>0 o'rniga",
        "",
        "INSERT INTO log_entries (user_id, action) VALUES (1,'a'),(2,'b'),(3,'c');                  -- bitta so'rovda"
      ]
    }
  ],
  "pitfalls": [
    "Tsiklda so'rov (N+1) har qanday indeksdan ko'proq zarar beradi.",
    "`COUNT(*) > 0` o'rniga `EXISTS` ishlating.",
    "Juda katta `IN (...)` ro'yxati sekin: vaqtinchalik jadval/JOIN.",
    "Profilsiz taxmin bilan optimizatsiya vaqtni yo'qotadi."
  ]
});
