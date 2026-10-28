/* Chuqur dars: 13.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.15", {
  "lesson": [
    "### Eloquent Collection",
    "`get()`, `all()` va hasMany munosabatlari `Illuminate\\Database\\Eloquent\\Collection` qaytaradi. U oddiy `Illuminate\\Support\\Collection` ni kengaytiradi. Ikkalasi ham massiv ustidagi o'ram: 100+ zanjirlanadigan metod, `ArrayAccess`, `IteratorAggregate`, `JsonSerializable`.",
    "",
    "### Eng ko'p ishlatiladigan metodlar",
    "- O'zgartirish: `map`, `mapWithKeys`, `flatMap`, `pluck`, `keyBy`, `groupBy`, `chunk`, `sortBy`/`sortByDesc`, `values`.",
    "- Filtrlash: `filter`, `reject`, `where('status', 'paid')`, `whereIn`, `first(fn)`, `unique`, `partition` (shartga mos va mos emas ikki to'plam).",
    "- Agregat: `sum`, `avg`, `min`, `max`, `count`, `countBy`, `reduce`.",
    "- Tekshirish: `contains`, `every`, `isEmpty`, `isNotEmpty`.",
    "- Yordamchi: `each`, `tap`, `pipe`, `when`, `dd`/`dump`.",
    "",
    "### Eloquent'ga xos metodlar",
    "- `load('relation')`, `loadMissing()`, `loadCount()`: to'plam uchun lazy eager loading. N+1 siz.",
    "- `find($id)`, `modelKeys()`, `fresh()`, `except([...])`, `only([...])`.",
    "- `toQuery()`: to'plamdagi modellar bo'yicha builder (`whereIn id`). `$orders->toQuery()->update([...])`.",
    "- `diff`, `intersect`, `unique` model kaliti bo'yicha ishlaydi.",
    "- `makeHidden`, `makeVisible`, `append`.",
    "",
    "### Kolleksiya va DB: qayerda hisoblash",
    "Asosiy qoida: **filtrlash va agregatsiyani iloji boricha DB'da qiling.**",
    "- `Order::all()->where('status', 'paid')->sum('total')` — barcha buyurtmalarni xotiraga yuklaydi.",
    "- `Order::where('status', 'paid')->sum('total')` — bitta SQL, bitta son.",
    "",
    "Kolleksiya metodlari mos keladi: allaqachon yuklangan kichik to'plamni qayta ishlash, bir natijadan bir nechta ko'rinish yasash, DB'da ifodalash noqulay mantiq, tashqi API natijalari.",
    "",
    "### Lazy Collection",
    "`cursor()` va `lazy()` `LazyCollection` qaytaradi. U generator asosida ishlaydi va elementlarni birma-bir oladi. Millionlab qator ustida `map`/`filter` xotirani to'ldirmaydi. Fayl o'qish uchun ham: `LazyCollection::make(fn () => yield from ...)`. Ba'zi metodlar (`sortBy`, `groupBy`) baribir hammasini xotiraga yuklaydi.",
    "",
    "### Higher-order messages",
    "`$users->each->notify(new Welcome)`, `$orders->sum->total`, `$posts->filter->isPublished()`. Qisqa va o'qiladi, oddiy amallar uchun qulay."
  ],
  "examples": [
    {
      "title": "Kolleksiya bilan hisobot",
      "lang": "php",
      "code": [
        "$orders = Order::with('items')",
        "    ->whereMonth('created_at', now()->month)",
        "    ->get();",
        "",
        "[$paid, $unpaid] = $orders->partition(fn (Order $o) => $o->status === OrderStatus::Paid);",
        "",
        "$byDay = $paid",
        "    ->groupBy(fn (Order $o) => $o->created_at->toDateString())",
        "    ->map(fn ($day) => [",
        "        'count' => $day->count(),",
        "        'revenue' => $day->sum('total'),",
        "        'items' => $day->flatMap->items->sum('qty'),",
        "    ])",
        "    ->sortKeys();",
        "",
        "$unpaid->toQuery()->update(['reminded_at' => now()]);"
      ]
    },
    {
      "title": "Xotira va DB tanlovi",
      "lang": "php",
      "code": [
        "// YOMON: hamma qatorlar xotirada",
        "$total = Order::all()->where('status', 'paid')->sum('total');",
        "",
        "// YAXSHI",
        "$total = Order::where('status', 'paid')->sum('total');",
        "",
        "// Katta to'plamni oqim bilan qayta ishlash",
        "Order::where('status', 'paid')",
        "    ->lazyById(1000)",
        "    ->each(fn (Order $o) => $exporter->write($o));"
      ]
    }
  ],
  "pitfalls": [
    "`Model::all()` dan keyin kolleksiyada filtrlash: katta jadvalda xotira tugaydi va so'rov sekin.",
    "Kolleksiya `where()` ni Eloquent `where()` bilan adashtirish: birinchisi PHP'da, ikkinchisi SQL'da ishlaydi.",
    "`filter()` dan keyin kalitlar saqlanishini unutish: JSON'da massiv o'rniga obyekt chiqadi. `->values()` qo'shing.",
    "`each()` ichida har element uchun so'rov yuborish (N+1). Avval `load()` yoki `toQuery()` ishlating."
  ]
});
