/* Chuqur dars: 19.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.8", {
  "lesson": [
    "### Paginatsiya ham shartnoma",
    "Paginatsiya mexanizmlari 16.11 va 18.11 da ko'rildi. Dizayn bosqichidagi vazifa — ularni **shartnoma** sifatida aniq belgilash va butun API'da bir xil qo'llash. Mijoz bitta paginatsiya komponentini yozadi va u barcha ro'yxatlarda ishlaydi.",
    "",
    "### Shartnomaning elementlari",
    "1. **Tur:** offset (`page`) yoki cursor. Har endpoint uchun bittasi. Ko'p API'lar ikkalasini taklif qiladi: admin ro'yxatlari uchun offset, lenta va eksport uchun cursor.",
    "2. **Parametr nomlari:** `page`, `per_page`, `cursor`. Yoki JSON:API uslubida `page[number]`, `page[size]`, `page[cursor]`. Bir xil nomlar hamma joyda.",
    "3. **Sahifa hajmi:** default (masalan 20) va maksimal (masalan 100). Maksimaldan ortig'i — `422` yoki jim cheklash. Bittasini tanlang va hujjatlang.",
    "4. **Javob metadata'si:**",
    "   - Cursor: `next_cursor`, `prev_cursor`, `per_page`.",
    "   - Offset: `current_page`, `per_page`, ixtiyoriy `total` va `last_page`.",
    "   - `links.next` va `links.prev` to'liq URL sifatida. Mijoz URL yasashi shart emas, shunchaki `next` ni ochadi.",
    "5. **Tartib kafolati:** default tartib qanday va u barqarormi (unikal ikkinchi kalit bilan). Tartib aniq bo'lmasa, sahifalar orasida elementlar takrorlanadi yoki yo'qoladi.",
    "6. **Oxirgi sahifa belgisi:** `next_cursor: null` yoki `links.next: null`.",
    "",
    "### Umumiy son (total) muammosi",
    "`total` foydalanuvchiga qulay (\"271 natija\"), lekin katta jadvalda `COUNT(*)` qimmat (16.13). Variantlar:",
    "- `total` ni umuman bermaslik (cursor API'lar).",
    "- Ixtiyoriy qilish: `?include_total=true` bo'lsa hisoblanadi.",
    "- Taxminiy son va `total_is_estimate: true`.",
    "- Keshlangan son.",
    "",
    "### Filtr va paginatsiya birga",
    "`links.next` URL'i joriy filtr va saralash parametrlarini saqlashi kerak. Laravel'da `->withQueryString()` yoki `->appends($request->query())`. Aks holda ikkinchi sahifa filtrsiz natijani qaytaradi.",
    "",
    "Cursor filtr va saralashga bog'liq: filtr o'zgarsa, eski cursor ma'nosiz. Mijoz filtr o'zgarganda cursor'ni tashlab, birinchi sahifadan boshlashi kerak. Buni hujjatda ayting.",
    "",
    "### Laravel'da",
    "`paginate()`, `simplePaginate()`, `cursorPaginate()` va API Resource collection avtomatik `links` va `meta` beradi. Format barcha endpoint'larda bir xil bo'lishi uchun ulardan foydalaning va qo'lda yasamang."
  ],
  "examples": [
    {
      "title": "Hujjatdagi shartnoma",
      "lang": "text",
      "code": [
        "Paginatsiya (barcha ro'yxat endpoint'lari)",
        "",
        "Parametrlar:",
        "  per_page   integer, default 20, max 100 (ortig'i 422)",
        "  cursor     string, javobdagi meta.next_cursor qiymati",
        "",
        "Tartib: default -created_at, -id (barqaror)",
        "Javob: links.next / links.prev (to'liq URL yoki null), meta.per_page,",
        "       meta.next_cursor / meta.prev_cursor",
        "Filtr yoki saralash o'zgarsa, cursor'siz birinchi sahifadan boshlang."
      ]
    },
    {
      "title": "Ixtiyoriy total bilan offset ro'yxat",
      "lang": "php",
      "code": [
        "public function index(OrderIndexRequest $request)",
        "{",
        "    $query = Order::query()->filter($request->validated('filter', []))",
        "        ->orderByDesc('created_at')->orderByDesc('id');",
        "",
        "    $perPage = $request->integer('per_page', 20);",
        "",
        "    $page = $request->boolean('include_total')",
        "        ? $query->paginate($perPage)",
        "        : $query->simplePaginate($perPage);",
        "",
        "    return OrderResource::collection($page->withQueryString());",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Har endpoint'da boshqacha paginatsiya parametrlari va meta tuzilmasi.",
    "`links.next` filtrlarni saqlamasligi: ikkinchi sahifada filtrsiz natija.",
    "Barqaror bo'lmagan tartib: sahifalar orasida dublikatlar.",
    "Katta jadvallarda har sahifada majburiy `total` hisoblash."
  ]
});
