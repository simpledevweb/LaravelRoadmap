/* Chuqur dars: 18.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.10", {
  "lesson": [
    "### Ro'yxat endpoint'i — shartnoma",
    "Deyarli har API'da ro'yxatlar bor: buyurtmalar, mijozlar, mahsulotlar. Ularning filtrlash, saralash va sahifalash qoidalari **barcha endpoint'larda bir xil** bo'lsa, mijoz uchun bitta umumiy komponent yetarli. Bu qoidalarni bir marta loyihalang va hujjatlashtiring.",
    "",
    "### Filtrlash",
    "- Aniq moslik: `filter[status]=paid`, `filter[customer_id]=7`.",
    "- Bir nechta qiymat: `filter[status]=paid,shipped` (IN).",
    "- Diapazon: `filter[created_after]=2025-01-01`, `filter[total_min]=100000`.",
    "- Qidiruv: `filter[search]=ali` (nom, email bo'yicha).",
    "- Mantiqiy: `filter[has_discount]=true`.",
    "",
    "Har filtr nomi biznes tushunchasi bo'lsin, DB ustuni bo'lishi shart emas. `filter[overdue]=true` ichida murakkab shart bo'lishi mumkin. Bu DB tuzilmasini API'dan ajratadi.",
    "",
    "### Saralash",
    "`sort=-created_at,name`: vergul bilan bir nechta kalit, minus kamayish. Default tartibni hujjatlang va barqaror qiling (`id` ni ikkinchi kalit sifatida qo'shing, 16.14).",
    "",
    "### Sahifalash",
    "- **Offset:** `page=3&per_page=20`. `meta` da `current_page`, `last_page`, `total`. Admin panellar uchun qulay, katta to'plamda sekin (16.11).",
    "- **Cursor:** `cursor=eyJ...` (18.11). Lentalar va katta to'plamlar uchun.",
    "",
    "`per_page` default (20) va maksimal (100) chegarasi majburiy.",
    "",
    "### Maydon tanlash va include",
    "- `fields[orders]=id,total,status`: javob hajmini kamaytiradi (mobil tarmoqlar uchun).",
    "- `include=customer,items`: bog'liq resurslarni bir so'rovda olish. Server tomonida bu `with()` ga aylanadi va N+1'siz bo'lishi kerak.",
    "",
    "### Xavfsizlik va tezlik",
    "Foydalanuvchiga istalgan ustun bo'yicha filtr yoki saralashga ruxsat berish ikki xavf tug'diradi:",
    "1. **Ma'lumot oshkor bo'lishi:** `sort=password_hash` yoki `filter[is_admin]=1` orqali yashirin ma'lumot haqida xulosa chiqarish.",
    "2. **Sekin so'rovlar:** indekssiz ustunlar bo'yicha har so'rov to'liq skan.",
    "",
    "Shuning uchun **oq ro'yxat**: faqat ruxsat etilgan va indekslangan filtrlar, saralashlar va include'lar. Ruxsat etilmagan parametr — `400` xato, jim e'tiborsiz qoldirish emas. Shunda mijoz xatosini tez topadi.",
    "",
    "### spatie/laravel-query-builder",
    "Bu shartnomani tayyor beradi: `allowedFilters()`, `allowedSorts()`, `allowedIncludes()`, `allowedFields()`. Ruxsat etilmagan parametr `InvalidFilterQuery` exception va `400` beradi. Custom filtrlar (`AllowedFilter::scope('overdue')`, `AllowedFilter::callback()`) biznes tushunchalarini scope'larga bog'laydi."
  ],
  "examples": [
    {
      "title": "spatie/laravel-query-builder bilan",
      "lang": "php",
      "code": [
        "use Spatie\\QueryBuilder\\AllowedFilter;",
        "use Spatie\\QueryBuilder\\QueryBuilder;",
        "",
        "public function index(Request $request)",
        "{",
        "    $orders = QueryBuilder::for(Order::class)",
        "        ->allowedFilters([",
        "            AllowedFilter::exact('status'),",
        "            AllowedFilter::exact('customer_id'),",
        "            AllowedFilter::scope('created_after'),",
        "            AllowedFilter::scope('overdue'),",
        "        ])",
        "        ->allowedSorts(['created_at', 'total'])",
        "        ->defaultSort('-created_at')",
        "        ->allowedIncludes(['customer', 'items'])",
        "        ->paginate(min($request->integer('per_page', 20), 100))",
        "        ->appends($request->query());",
        "",
        "    return OrderResource::collection($orders);",
        "}"
      ],
      "note": "`AllowedFilter::scope('created_after')` modelda `scopeCreatedAfter()` bo'lishini talab qiladi."
    },
    {
      "title": "So'rov namunasi va javob meta",
      "lang": "text",
      "code": [
        "GET /api/orders?filter[status]=paid,shipped&filter[created_after]=2025-06-01",
        "              &sort=-total&include=customer&per_page=20&page=2",
        "",
        "meta: { current_page: 2, per_page: 20, last_page: 14, total: 271 }",
        "links: { first, last, prev, next }",
        "",
        "GET /api/orders?sort=password",
        "-> 400 Requested sort(s) `password` is not allowed. Allowed sort(s) are `created_at, total`."
      ]
    }
  ],
  "pitfalls": [
    "Istalgan ustun bo'yicha filtr yoki saralashga ruxsat berish: ma'lumot oshkor bo'lishi va sekin so'rovlar.",
    "Ruxsat etilmagan parametrlarni jim e'tiborsiz qoldirish: mijoz noto'g'ri natijani to'g'ri deb o'ylaydi.",
    "Har endpoint'da boshqacha filtr sintaksisi (`?status=`, `?filter_status=`, `?filter[status]=`).",
    "`include` ni eager loading'siz amalga oshirish: N+1."
  ]
});
