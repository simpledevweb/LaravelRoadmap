/* Chuqur dars: 13.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.2", {
  "lesson": [
    "### Create",
    "- `new Model` + xususiyatlar + `save()`: maydonlarni bittadan belgilash, `$fillable` tekshirilmaydi.",
    "- `Model::create([...])`: mass assignment, `$fillable` bo'yicha. Yangi obyektni qaytaradi.",
    "- `firstOrCreate($search, $extra)`: topadi yoki yaratadi (saqlaydi).",
    "- `firstOrNew()`: topadi yoki yangi obyekt qaytaradi, lekin **saqlamaydi**.",
    "- `updateOrCreate($search, $values)`: bor bo'lsa yangilaydi, yo'q bo'lsa yaratadi.",
    "",
    "### Read",
    "- `find($id)` → model yoki `null`. `findOrFail($id)` → topilmasa `ModelNotFoundException` (HTTP'da 404).",
    "- `first()`, `firstOrFail()`, `sole()` (aynan bitta bo'lmasa xato).",
    "- `get()` → `Collection`. `pluck('name', 'id')`, `value('email')`, `exists()`, `count()`.",
    "- Katta to'plamlar: `chunkById(1000, fn)`, `lazy()`, `cursor()` (13.23).",
    "",
    "Route model binding: `Route::get('/orders/{order}', ...)` va `function show(Order $order)`. Laravel o'zi `findOrFail` qiladi.",
    "",
    "### Update",
    "- `$model->fill([...])->save()` yoki `$model->update([...])`. Ikkalasi ham model event'larini ishga tushiradi va faqat **o'zgargan** (dirty) ustunlarni yozadi. Hech narsa o'zgarmasa, so'rov yuborilmaydi.",
    "- `Model::where(...)->update([...])`: **mass update**. Bitta SQL, modellarni yuklamaydi, event'lar va mutator'lar **ishlamaydi**, `updated_at` esa yangilanadi.",
    "- `increment('views')`, `decrement('stock', 2)`: atomar `SET col = col + n`.",
    "- `isDirty()`, `getChanges()`, `wasChanged()`, `getOriginal()`: o'zgarishlarni kuzatish.",
    "",
    "### Delete",
    "- `$model->delete()`: event'lar ishlaydi, `SoftDeletes` bo'lsa `deleted_at` belgilanadi (13.17).",
    "- `Model::destroy([1, 2, 3])`: har birini yuklab, event'lar bilan o'chiradi.",
    "- `Model::where(...)->delete()`: mass delete, event'larsiz.",
    "- `forceDelete()`: soft delete'ni chetlab, haqiqatan o'chiradi.",
    "",
    "### Instance va query farqi",
    "Muhim qoida: **instance metodlari** (`$order->update()`) event, observer, mutator va cast'larni ishlatadi. **Query metodlari** (`Order::where()->update()`) esa to'g'ridan-to'g'ri SQL. Ikkinchisi tez, lekin audit, cache tozalash va observer'larga tayanadigan mantiq ishlamay qoladi."
  ],
  "examples": [
    {
      "title": "CRUD asosiy usullari",
      "lang": "php",
      "code": [
        "$order = Order::create([",
        "    'customer_id' => $customer->id,",
        "    'total' => 150000,",
        "]);",
        "",
        "$order = Order::findOrFail($id);",
        "$order->update(['status' => 'paid']);",
        "",
        "$setting = Setting::updateOrCreate(",
        "    ['user_id' => $user->id, 'key' => 'theme'],",
        "    ['value' => 'dark'],",
        ");",
        "",
        "Product::whereKey($productId)->decrement('stock', $qty);",
        "",
        "$order->delete();"
      ]
    },
    {
      "title": "Instance va mass update farqi",
      "lang": "php",
      "code": [
        "// OrderObserver::updated() ishlaydi, audit yoziladi",
        "Order::where('status', 'pending')->each(fn (Order $o) => $o->update(['status' => 'expired']));",
        "",
        "// Tez, bitta SQL, lekin observer ishlamaydi",
        "Order::where('status', 'pending')",
        "    ->where('created_at', '<', now()->subDay())",
        "    ->update(['status' => 'expired']);",
        "",
        "if ($order->wasChanged('status')) {",
        "    event(new OrderStatusChanged($order, $order->getOriginal('status')));",
        "}"
      ],
      "note": "Ko'p qatorda `each()` har qator uchun alohida UPDATE yuboradi. Hajm katta bo'lsa, mass update + alohida event tanlang."
    }
  ],
  "pitfalls": [
    "Mass `update()`/`delete()` observer va event'larni ishga tushiradi deb kutish: audit log va cache invalidatsiya o'tkazib yuboriladi.",
    "`firstOrNew()` saqlaydi deb o'ylash: `save()` chaqirilmaguncha DB'da yozuv yo'q.",
    "`find()` natijasini `null` ga tekshirmasdan ishlatish: `Attempt to read property on null`. `findOrFail()` ishlating.",
    "`updateOrCreate()` ni unique indekssiz parallel so'rovlarda ishlatish: ikki bir xil yozuv paydo bo'lishi mumkin (race condition)."
  ]
});
