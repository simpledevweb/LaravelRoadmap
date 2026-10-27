/* Chuqur dars: 9.23. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.23", {
  "lesson": [
    "### Pagination strategiyalari",
    "- **OFFSET/LIMIT:** `LIMIT 20 OFFSET 40`. Sodda, sahifa raqami bor. **Kamchilik:** `OFFSET` katta bo'lsa o'tkazib yuborilgan qatorlarni ham o'qiydi (sekin); ma'lumot o'zgarsa takror/yo'qotish.",
    "- **Keyset (cursor, seek):** oxirgi ko'rilgan qiymatdan davom: `WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT 20`. `OFFSET`siz: sahifa raqamidan qat'i nazar tez (indeksdan); barqaror. **Kamchilik:** ixtiyoriy sahifaga sakrash yo'q, unikal tartib kerak.",
    "- **Deferred join:** avval faqat ID'lar (covering indeks), keyin qolgan ustunlar.",
    "- **COUNT:** jami son qimmat: kesh, taxmin yoki \"keyingi sahifa bormi\" (`LIMIT n+1`).",
    "",
    "### Tartib muhim",
    "Pagination uchun **barqaror, unikal** `ORDER BY` (`created_at` + `id`), aks holda sahifalar orasida takror/yo'qotish. Tartib ustuniga indeks.",
    "",
    "### Qachon qaysi biri",
    "- Admin panel, kichik/o'rta jadval: OFFSET.",
    "- Cheksiz scroll, feed, API, katta jadval: keyset.",
    "",
    "### Laravel",
    "- `paginate()` (OFFSET + COUNT), `simplePaginate()` (COUNT yo'q), `cursorPaginate()` (keyset).",
    "- API'da `per_page` cheklovi.",
    "",
    "### Muammolar",
    "Katta `OFFSET`, har sahifada `COUNT(*)`, noaniq tartib, filtr o'zgarganda sahifa raqami.",
    "",
    "### Keyset misoli",
    "Birinchi sahifa: `ORDER BY id DESC LIMIT 20`; keyingi: `WHERE id < :lastId ORDER BY id DESC LIMIT 20`."
  ],
  "examples": [
    {
      "title": "Keyset",
      "lang": "sql",
      "code": [
        "-- birinchi sahifa",
        "SELECT id, title, created_at FROM posts ORDER BY created_at DESC, id DESC LIMIT 20;",
        "-- keyingi (oxirgi qator: created_at='2025-06-01 10:00:00', id=500)",
        "SELECT id, title, created_at FROM posts",
        "WHERE (created_at, id) < ('2025-06-01 10:00:00', 500)",
        "ORDER BY created_at DESC, id DESC LIMIT 20;"
      ]
    }
  ],
  "pitfalls": [
    "Katta `OFFSET` o'tkazilgan qatorlarni ham o'qiydi: keyset.",
    "Unikal bo'lmagan tartib (`created_at` yolg'iz) sahifalar orasida takror/yo'qotish: `id` qo'shing.",
    "Har sahifada `COUNT(*)` katta jadvalda sekin: `simplePaginate`/kesh.",
    "Keyset bilan ixtiyoriy sahifaga sakrash mumkin emas."
  ]
});
