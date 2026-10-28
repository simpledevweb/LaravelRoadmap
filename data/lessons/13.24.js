/* Chuqur dars: 13.24. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.24", {
  "lesson": [
    "### Ikki qatlam",
    "- **Query Builder** (`DB::table('orders')`): SQL so'rovini PHP metodlari bilan quradi. Natija `stdClass` obyektlari Collection'i. Ulanish, binding va grammatika (MySQL/PostgreSQL farqi) bilan ishlaydi.",
    "- **Eloquent** (`Order::query()`): query builder ustiga qurilgan ORM. Natija model obyektlari: cast'lar, accessor/mutator, munosabatlar, event'lar, global scope'lar, serializatsiya.",
    "",
    "Eloquent builder ichida oddiy query builder bor: `Order::query()->toBase()` yoki `getQuery()` uni qaytaradi.",
    "",
    "### Farqlar jadvali",
    "| Xususiyat | Eloquent | Query Builder |",
    "|---|---|---|",
    "| Natija | Model obyektlari | `stdClass` |",
    "| Cast, accessor | ha | yo'q |",
    "| Munosabatlar va `with()` | ha | yo'q, qo'lda JOIN |",
    "| Model event'lari, observer | ha (instance amallarida) | yo'q |",
    "| Global scope (tenant, soft delete) | ha | **yo'q** |",
    "| Timestamps | avtomatik | qo'lda |",
    "| `$fillable` himoyasi | ha | yo'q |",
    "| Tezlik va xotira | hydration xarajati | yengilroq |",
    "",
    "### Eloquent qachon",
    "- Oddiy CRUD va biznes mantiq: domen tushunchalari, munosabatlar, validatsiyadan o'tgan yozish.",
    "- Event, observer, audit, cache invalidatsiya kerak bo'lsa.",
    "- Tenant izolyatsiyasi va soft delete global scope'lar orqali ta'minlansa. Query builder ularni chetlab o'tadi va bu xavfsizlik muammosi.",
    "- API Resource bilan serializatsiya.",
    "",
    "### Query Builder qachon",
    "- Katta hisobotlar va eksportlar: o'n minglab qator, model kerak emas.",
    "- Agregat va analitik so'rovlar (`GROUP BY`, murakkab JOIN).",
    "- Model'i yo'q jadvallar: pivot, log, texnik jadvallar.",
    "- Bulk `insert`/`upsert` (Eloquent'da ham bor, lekin ular ham builder darajasida ishlaydi).",
    "",
    "### Raw SQL qachon",
    "Builder bilan ifodalash noqulay yoki imkonsiz bo'lganda: CTE, window, DB'ga xos operatorlar (13.21).",
    "",
    "### Aralash yondashuv",
    "Bitta loyihada uchalasi ham normal. Muhimi — **izchillik va xavfsizlik**: tenant yoki soft delete shartlari global scope'da bo'lsa, query builder ishlatilgan har joyda ularni qo'lda yozish kerak. Buni code review'da tekshiring. Eloquent so'rovni yengillashtirish uchun to'liq builder'ga o'tish shart emas: `toBase()` scope'larni saqlagan holda `stdClass` qaytaradi, `pluck()` va `value()` model yaratmaydi.",
    "",
    "### Performance haqida",
    "Hydration xarajati odatda faqat minglab qatorda sezilarli. Oddiy sahifada (20–50 model) farq mikrosoniyalar. Sekinlikning asosiy sababi deyarli doim N+1, indeks yo'qligi yoki keraksiz ustunlar, Eloquent'ning o'zi emas. Avval o'lchang (13.23)."
  ],
  "examples": [
    {
      "title": "Bir vazifa: uch xil yo'l",
      "lang": "php",
      "code": [
        "// Eloquent: modellar, scope va munosabatlar bilan",
        "$orders = Order::with('customer:id,name')",
        "    ->where('status', OrderStatus::Paid)",
        "    ->latest()->limit(50)->get();",
        "",
        "// Eloquent scope'lari saqlangan holda, model'siz",
        "$rows = Order::where('status', OrderStatus::Paid)",
        "    ->toBase()",
        "    ->selectRaw('date(created_at) as day, sum(total) as revenue')",
        "    ->groupByRaw('date(created_at)')",
        "    ->get();",
        "",
        "// Query builder: scope'larsiz, tenant shartini qo'lda!",
        "$rows = DB::table('orders')",
        "    ->where('tenant_id', $tenantId)",
        "    ->whereNull('deleted_at')",
        "    ->where('status', 'paid')",
        "    ->count();"
      ],
      "note": "`toBase()` global scope'larni (tenant, soft delete) qo'llagan holda builder qaytaradi."
    },
    {
      "title": "Event va timestamp farqi",
      "lang": "php",
      "code": [
        "// Observer ishlaydi, updated_at yangilanadi, cast qo'llanadi",
        "$order->update(['status' => OrderStatus::Shipped]);",
        "",
        "// Observer ishlamaydi, updated_at yangilanmaydi, enum'ni qo'lda string qilish kerak",
        "DB::table('orders')->where('id', $order->id)->update([",
        "    'status' => OrderStatus::Shipped->value,",
        "    'updated_at' => now(),",
        "]);"
      ]
    }
  ],
  "pitfalls": [
    "Query builder global scope'larni (tenant, soft delete) qo'llaydi deb o'ylash: ma'lumot oqishi.",
    "`DB::table()->update()` da `updated_at` va observer'larni unutish.",
    "Kichik sahifalar uchun \"tezroq\" deb Eloquent'dan voz kechish: kod murakkablashadi, foyda deyarli yo'q.",
    "Katta eksportda millionlab Eloquent model yaratish: xotira tugaydi. `toBase()`, `lazyById()` yoki builder ishlating."
  ]
});
