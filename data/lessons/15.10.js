/* Chuqur dars: 15.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.10", {
  "lesson": [
    "### So'rovlar sonini kamaytirish",
    "Har so'rov = tarmoq + parse + ijro. **Ko'p kichik so'rov** ko'pincha **bitta katta so'rov**dan sekinroq.",
    "",
    "### Usullar",
    "1. **N+1 ni yo'qoting:** eager loading (15.8).",
    "2. `IN` / `JOIN` bilan bitta so'rovda: `WHERE id IN (...)`.",
    "3. **Ommaviy (bulk) amallar:** ko'p qatorli `INSERT`, `upsert`, `UPDATE ... WHERE id IN`.",
    "4. **Aggregatsiyani DB'da:** `withCount`, `SUM` (ilovada tsikl o'rniga).",
    "5. **Kesh:** takroriy so'rovlar natijasini saqlash (`Cache::remember`), request-darajasidagi kesh (`once()`, static memo).",
    "6. **Keraksiz so'rovlarni olib tashlang:** takroriy `User::find()`, `Auth::user()` ni qayta o'qish; middleware'dagi ortiqcha so'rovlar.",
    "7. `exists()` `count() > 0` o'rniga; `value()`, `pluck()` kerakli ustun.",
    "8. **Denormalizatsiya** (hisoblagich ustunlari).",
    "9. **Lazy collection/chunk** — katta ma'lumotni bo'lak-bo'lak.",
    "10. **Config/route/view kesh** (so'rovga aloqasiz, lekin ishga tushishni tezlashtiradi).",
    "",
    "### O'lchash",
    "Telescope/Debugbar: so'rovlar soni sahifa uchun; maqsad: sahifa uchun ≤ 10–20 so'rov; takroriy so'rovlarni (bir xil SQL) toping.",
    "",
    "### Muvozanat",
    "Bitta ulkan so'rov (10 join) ham yomon; maqsad — ma'qul oraliq. Kesh eskirishi (invalidatsiya) murakkabligi.",
    "",
    "### Laravel",
    "`once(fn () => ...)`, `Cache::remember`, `->select()`, `->exists()`, `upsert`, `withCount`."
  ],
  "examples": [
    {
      "title": "Bitta so'rov va kesh",
      "lang": "php",
      "code": [
        "// yomon: har user uchun so'rov",
        "foreach ($ids as $id) { $users[] = User::find($id); }",
        "// yaxshi",
        "$users = User::whereIn('id', $ids)->get();",
        "",
        "$rates = Cache::remember('rates', 600, fn () => Rate::pluck('value', 'code'));",
        "$hasPaid = Order::where('user_id', $id)->where('status', 'paid')->exists();"
      ]
    }
  ],
  "pitfalls": [
    "Tsiklda `find()` — N so'rov; `whereIn` bilan bittaga.",
    "`count() > 0` o'rniga `exists()`.",
    "Kesh invalidatsiyasiz eskirgan ma'lumot beradi.",
    "Bitta juda katta (10 join) so'rov ham yomon: muvozanat."
  ]
});
