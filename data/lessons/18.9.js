/* Chuqur dars: 18.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.9", {
  "lesson": [
    "### Ikki turdagi parametr",
    "- **Route (path) parametri:** URL yo'lining bir qismi, **qaysi resurs** ekanini aniqlaydi. `/customers/7/orders/42` dagi `7` va `42`. Majburiy va ierarxik.",
    "- **Query parametri:** `?` dan keyingi kalit-qiymat juftliklari, **qanday ko'rinish** kerakligini o'zgartiradi: filtr, saralash, sahifa, tanlangan maydonlar. Ixtiyoriy.",
    "",
    "Oddiy qoida: parametrni olib tashlasangiz va URL boshqa resursga ishora qilsa — bu path. Shu resursning boshqa ko'rinishi bo'lsa — bu query.",
    "",
    "### Path parametrlari",
    "- Resurs identifikatori: ID, UUID, slug.",
    "- Laravel **route model binding**: `Route::get('orders/{order}', ...)` va `show(Order $order)`. Model avtomatik topiladi, topilmasa 404.",
    "- Boshqa ustun bo'yicha: `{post:slug}` yoki modelda `getRouteKeyName()`.",
    "- Format cheklovlari: `->whereNumber('id')`, `->whereUuid('order')`, `->whereUlid()`, `->where('slug', '[a-z0-9-]+')`. Noto'g'ri formatda route umuman mos kelmaydi va 404.",
    "- Ichma-ich route'da `scopeBindings()` (18.2).",
    "",
    "### Query parametrlari",
    "- **Filtr:** `?status=paid` yoki strukturali `?filter[status]=paid&filter[created_after]=2025-01-01`.",
    "- **Saralash:** `?sort=-created_at,name` (minus — kamayish).",
    "- **Sahifa:** `?page=2&per_page=20` yoki `?cursor=...`.",
    "- **Maydonlar:** `?fields[orders]=id,total`.",
    "- **Bog'liq resurslar:** `?include=customer,items`.",
    "",
    "Massivlar uchun izchil sintaksis tanlang: `?ids[]=1&ids[]=2` (PHP tabiiy), `?ids=1,2` (vergul bilan) yoki `?filter[status][]=paid`. JSON:API standarti `filter[...]`, `sort`, `page[...]`, `include`, `fields[...]` ni taklif qiladi.",
    "",
    "### Validatsiya",
    "Query parametrlari ham foydalanuvchi kiritishi. Ularni path kabi qat'iy tekshiring:",
    "- Tur va format: `per_page` integer, `from` sana.",
    "- Chegaralar: `per_page` max 100. Aks holda `?per_page=1000000` serverni yiqitadi.",
    "- Oq ro'yxat: saralash va filtr ustunlari (13.21, 16.14).",
    "",
    "Laravel'da FormRequest GET so'rovlar uchun ham ishlaydi. `$request->integer()`, `->date()`, `->enum()`, `->boolean()` turini xavfsiz o'giradi.",
    "",
    "### Maxfiy ma'lumot URL'da emas",
    "Na path, na query'da token, parol, shaxsiy ma'lumot (pasport raqami, telefon) bo'lmasin. URL'lar web server access log'lariga, proxy'larga, brauzer tarixiga, analitikaga va `Referer` orqali uchinchi tomon saytlariga tushadi. Qidiruv shartida shaxsiy ma'lumot bo'lsa (telefon bo'yicha qidiruv), `POST /customers/search` va body."
  ],
  "examples": [
    {
      "title": "Route'lar va binding",
      "lang": "php",
      "code": [
        "Route::get('customers/{customer}/orders', [CustomerOrderController::class, 'index'])",
        "    ->whereUlid('customer');",
        "",
        "Route::get('posts/{post:slug}', [PostController::class, 'show'])",
        "    ->where('post', '[a-z0-9-]+');",
        "",
        "// GET /api/customers/01J0ZJ.../orders?filter[status]=paid&sort=-created_at&per_page=50"
      ]
    },
    {
      "title": "Query parametrlarini validatsiya qilish",
      "lang": "php",
      "code": [
        "class OrderIndexRequest extends FormRequest",
        "{",
        "    public function rules(): array",
        "    {",
        "        return [",
        "            'filter.status' => ['sometimes', Rule::enum(OrderStatus::class)],",
        "            'filter.created_after' => ['sometimes', 'date'],",
        "            'sort' => ['sometimes', Rule::in(['created_at', '-created_at', 'total', '-total'])],",
        "            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],",
        "        ];",
        "    }",
        "}",
        "",
        "public function index(Customer $customer, OrderIndexRequest $request)",
        "{",
        "    $sort = $request->input('sort', '-created_at');",
        "",
        "    return OrderResource::collection(",
        "        $customer->orders()",
        "            ->when($request->input('filter.status'), fn ($q, $s) => $q->where('status', $s))",
        "            ->when($request->date('filter.created_after'), fn ($q, $d) => $q->where('created_at', '>=', $d))",
        "            ->orderBy(ltrim($sort, '-'), str_starts_with($sort, '-') ? 'desc' : 'asc')",
        "            ->paginate($request->integer('per_page', 20))",
        "    );",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Telefon, pasport yoki token'ni URL'da yuborish: log va `Referer` orqali oshkor bo'ladi.",
    "`per_page` ga maksimal chegara qo'ymaslik: bitta so'rov millionlab qatorni yuklaydi.",
    "Saralash ustunini oq ro'yxatsiz `orderBy` ga berish.",
    "Majburiy identifikatorni query'ga (`/orders?id=42`) qo'yish: resurs semantikasi va keshlash buziladi."
  ]
});
