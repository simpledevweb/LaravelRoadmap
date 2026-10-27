/* Chuqur dars: 2.24. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.24", {
  "lesson": [
    "### Pagination",
    "Katta ro'yxatni bo'laklarga bo'lish. Eloquent/Query Builder: `User::paginate(15)`.",
    "",
    "### Turlari",
    "- `paginate($n)`: sahifa raqamlari, jami son (qo'shimcha `COUNT` so'rovi).",
    "- `simplePaginate($n)`: faqat Oldingi/Keyingi, `COUNT` yo'q (tezroq).",
    "- `cursorPaginate($n)`: cursor (oxirgi element qiymati) bo'yicha: katta jadvalda eng tez, `OFFSET` yo'q; tartiblangan unikal ustun kerak; sahifa raqami yo'q.",
    "",
    "### Blade",
    "`{{ $users->links() }}` (Tailwind/Bootstrap view), `->withQueryString()` (filtrlar saqlansin), `->appends([...])`, `->fragment('x')`.",
    "",
    "### API",
    "`UserResource::collection(User::paginate())` JSON ga `data`, `links`, `meta` qo'shadi. `?page=2&per_page=20` — `per_page` ni **cheklang** (`min(max($pp, 1), 100)`).",
    "",
    "### Samaradorlik",
    "- `OFFSET` katta bo'lsa sekin: cursor pagination.",
    "- `COUNT(*)` katta jadvalda qimmat: `simplePaginate` yoki taxminiy son.",
    "- Tartib (`orderBy`) majburiy va indeksli bo'lsin, aks holda sahifalar orasida takror/yo'qotish.",
    "- Eager loading (`with()`) bilan N+1'dan saqlaning.",
    "",
    "### Maxsus",
    "Kolleksiyani qo'lda sahifalash: `LengthAwarePaginator`. Sahifa uzunligini konfiguratsiya qiling.",
    "",
    "### Test",
    "`->assertJsonPath('meta.current_page', 2)`."
  ],
  "examples": [
    {
      "title": "Pagination",
      "lang": "php",
      "code": [
        "public function index(Request $r): ResourceCollection",
        "{",
        "    $perPage = min(max($r->integer('per_page', 15), 1), 100);",
        "    return PostResource::collection(",
        "        Post::query()->with('author')->latest('id')->cursorPaginate($perPage)->withQueryString()",
        "    );",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`per_page` ni cheklamaslik: mijoz million qator so'rashi mumkin.",
    "`paginate` katta jadvalda `COUNT` va katta `OFFSET` tufayli sekin: cursor.",
    "Tartibsiz (`orderBy`siz) pagination sahifalar orasida takror/yo'qotishga olib keladi.",
    "Filtr parametrlari `withQueryString()` bo'lmasa keyingi sahifada yo'qoladi."
  ]
});
