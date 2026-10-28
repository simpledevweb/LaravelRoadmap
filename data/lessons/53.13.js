/* Chuqur dars: 53.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.13", {
  "lesson": [
    "### Pagination optimallash",
    "(Asos: 9.23, 15.11.) Katta jadvalda sahifalash tezlikka katta ta'sir qiladi.",
    "",
    "### Muammolar",
    "- Katta `OFFSET`: o'tkazib yuboriladigan qatorlarni ham o'qiydi.",
    "- Har sahifada `COUNT(*)`: katta jadvalda qimmat (`paginate`).",
    "- **Noaniq tartib:** sahifalarda takror/yo'qotish.",
    "- Sahifa uchun ortiqcha ma'lumot (`SELECT *`, munosabatlar).",
    "",
    "### Yechimlar (Laravel)",
    "| Usul | COUNT | OFFSET | Qachon |",
    "|---|---|---|---|",
    "| `paginate()` | bor | bor | sahifa raqami kerak, kichik/o'rta jadval |",
    "| `simplePaginate()` | yo'q | bor | \"Oldingi/Keyingi\" yetarli |",
    "| `cursorPaginate()` | yo'q | yo'q | feed, API, katta jadval |",
    "- **Deferred join** (faqat ID'lar bilan sahifalab, keyin to'liq qator).",
    "- **COUNT keshlash/taxminiy.**",
    "- **Sahifa chuqurligini cheklash.**",
    "- `per_page` ni cheklash (`min(100, ...)`).",
    "",
    "### Indeks",
    "Tartib ustunlariga composite indeks `(filtr, order, id)`.",
    "",
    "### Eager loading",
    "Sahifadagi 20 element uchun `with()` (N+1 yo'q), kerakli ustunlar.",
    "",
    "### Keshlash",
    "Birinchi sahifalar (eng ko'p so'raladigan) keshlanishi mumkin (kalit: filtr + sahifa).",
    "",
    "### API",
    "`links`/`meta` (cursor: `next_cursor`), `Link` header.",
    "",
    "### Qoida",
    "Katta/cheksiz ro'yxat → `cursorPaginate`; sahifa raqamli kichik jadval → `paginate` + indeks."
  ],
  "examples": [
    {
      "title": "cursorPaginate",
      "lang": "php",
      "code": [
        "public function index(Request $r)",
        "{",
        "    $perPage = min(max($r->integer('per_page', 20), 1), 100);",
        "    return PostResource::collection(",
        "        Post::query()->select('id', 'title', 'user_id', 'created_at')->with('author:id,name')",
        "            ->orderByDesc('id')->cursorPaginate($perPage)",
        "    );",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Katta `OFFSET` chuqur sahifalarni sekinlashtiradi: cursor.",
    "`paginate()` har sahifada `COUNT(*)` qiladi: `simplePaginate`/kesh.",
    "`per_page` cheklanmasa mijoz millionlab qator so'rashi mumkin.",
    "Unikal bo'lmagan tartib sahifalarda takror/yo'qotish beradi (`id` qo'shing)."
  ]
});
