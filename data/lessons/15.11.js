/* Chuqur dars: 15.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.11", {
  "lesson": [
    "### Pagination optimallash",
    "(Asos: 9.23.) Katta jadvalda sahifalash tezlikka sezilarli ta'sir qiladi.",
    "",
    "### Muammolar",
    "- Katta `OFFSET`: `OFFSET 100000` o'tkazib yuboriladigan qatorlarni ham o'qiydi (sekin, chuqur sahifalar).",
    "- `COUNT(*)` har sahifada (katta jadvalda qimmat).",
    "- **Noaniq tartib** → sahifalarda takror/yo'qotish.",
    "",
    "### Yechimlar",
    "1. **Keyset (cursor) pagination:** `WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT 20` — `OFFSET`siz, indeksdan; chuqur sahifa ham tez. Laravel `cursorPaginate()`.",
    "2. `simplePaginate()` — `COUNT` yo'q (\"keyingi bor mi\" uchun `LIMIT n+1`).",
    "3. **Deferred join:** avval faqat ID'lar (covering indeks: `SELECT id ... ORDER BY ... LIMIT ... OFFSET`), so'ng `JOIN` bilan to'liq qatorlar.",
    "4. **COUNT'ni keshlash/taxminiy** (`information_schema` yoki alohida hisoblagich).",
    "5. **Sahifa chuqurligini cheklash** (1000-sahifadan keyin yo'q) va qidiruv/filtrga yo'naltirish.",
    "",
    "### Indeks",
    "Tartib ustunlariga composite indeks `(filtr, order_col, id)`; `ORDER BY` + `LIMIT` indeks tartibida bo'lsa tez.",
    "",
    "### API",
    "`per_page` ni cheklang (`≤ 100`); cursor tokenini kodlash (opaque).",
    "",
    "### Tanlash",
    "Admin/kichik jadval — `paginate`; feed/API/katta — `cursorPaginate`.",
    "",
    "### Laravel",
    "```php",
    "Post::query()->where('user_id', $id)->orderByDesc('id')->cursorPaginate(20);",
    "```"
  ],
  "examples": [
    {
      "title": "Deferred join",
      "lang": "sql",
      "code": [
        "-- OFFSET katta bo'lsa ham faqat indeks (id) skanlanadi",
        "SELECT p.* FROM posts p",
        "JOIN (SELECT id FROM posts WHERE user_id = 5 ORDER BY id DESC LIMIT 20 OFFSET 100000) t ON t.id = p.id",
        "ORDER BY p.id DESC;"
      ]
    }
  ],
  "pitfalls": [
    "Katta `OFFSET` chuqur sahifalarni juda sekinlashtiradi: keyset/deferred join.",
    "Har sahifada `COUNT(*)` katta jadvalda qimmat: `simplePaginate`/kesh.",
    "Unikal bo'lmagan tartib sahifalarda takror/yo'qotish: `id` qo'shing.",
    "`per_page` cheklanmasa mijoz millionlab qator so'rashi mumkin."
  ]
});
