/* Chuqur dars: 13.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.9", {
  "lesson": [
    "### Munosabatlar metod sifatida",
    "Eloquent munosabati — model ichidagi metod. U relation obyektini qaytaradi va bu obyekt ham query builder. Ikki xil murojaat bor:",
    "- `$user->posts` (xususiyat): munosabatni yuklaydi va natijani keshlaydi (Collection yoki model).",
    "- `$user->posts()` (metod): so'rov quruvchi. Qo'shimcha shart va metodlar uchun: `$user->posts()->where('published', true)->count()`.",
    "",
    "### One-to-One",
    "- `hasOne`: `User` → `Profile`. FK (`user_id`) `profiles` jadvalida.",
    "- `belongsTo`: `Profile` → `User`. FK shu modelning o'zida.",
    "",
    "Qoida: **FK qaysi jadvalda bo'lsa, o'sha model `belongsTo` ishlatadi.**",
    "",
    "### One-to-Many",
    "- `hasMany`: `Customer` → `orders`.",
    "- Teskarisi `belongsTo`: `Order` → `customer`.",
    "- `hasOne` + `latestOfMany()` / `oldestOfMany()` / `ofMany('total', 'max')` (Laravel 8.42+): ko'pdan bittasini munosabat sifatida olish (`latestOrder`).",
    "",
    "### Many-to-Many",
    "`belongsToMany`: `User` ↔ `Role`, pivot jadval `role_user` (alifbo tartibida, birlik shaklda). Pivot bilan ishlash:",
    "- `->withPivot('expires_at')`, `->withTimestamps()`, `->as('membership')`.",
    "- `attach($id, [...])`, `detach()`, `sync([...])` (faqat berilganlar qoladi), `syncWithoutDetaching()`, `toggle()`, `updateExistingPivot()`.",
    "- Pivot'ning o'z mantiqi bo'lsa, `->using(RoleUser::class)` bilan custom Pivot modeli.",
    "",
    "### Uzoq munosabatlar",
    "- `hasManyThrough`: `Country` → `User` → `Post`: mamlakatning barcha postlari.",
    "- `hasOneThrough`.",
    "",
    "### Saqlash",
    "- `$customer->orders()->create([...])`: FK avtomatik to'ldiriladi.",
    "- `$order->customer()->associate($customer)`, `dissociate()`.",
    "- `saveMany()`, `createMany()`.",
    "",
    "### Mavjudlik bo'yicha so'rov",
    "- `has('orders')`, `whereHas('orders', fn ($q) => $q->where('total', '>', 100))`, `doesntHave()`, `whereRelation('orders', 'status', 'paid')`.",
    "- `withCount('orders')`, `withSum('orders', 'total')`, `withExists('subscription')`: qo'shimcha so'rovsiz agregatlar.",
    "",
    "### Konvensiyalar va DB",
    "FK nomi default'da `{model}_id`. Boshqacha bo'lsa, ikkinchi va uchinchi argumentlar bilan bering. Migratsiyada `$table->foreignId('customer_id')->constrained()->cascadeOnDelete()` — FK constraint va indeks birga. Munosabatlarni yuklashda N+1 ga e'tibor bering: `with()` (13.11, 13.12)."
  ],
  "examples": [
    {
      "title": "Uch asosiy munosabat",
      "lang": "php",
      "code": [
        "class Customer extends Model",
        "{",
        "    public function profile(): HasOne { return $this->hasOne(Profile::class); }",
        "    public function orders(): HasMany { return $this->hasMany(Order::class); }",
        "    public function latestOrder(): HasOne { return $this->hasOne(Order::class)->latestOfMany(); }",
        "}",
        "",
        "class Order extends Model",
        "{",
        "    public function customer(): BelongsTo { return $this->belongsTo(Customer::class); }",
        "    public function products(): BelongsToMany",
        "    {",
        "        return $this->belongsToMany(Product::class)",
        "            ->withPivot(['qty', 'price'])",
        "            ->withTimestamps();",
        "    }",
        "}"
      ]
    },
    {
      "title": "Ishlatish",
      "lang": "php",
      "code": [
        "$order = $customer->orders()->create(['total' => 0]);",
        "",
        "$order->products()->attach($productId, ['qty' => 2, 'price' => 50000]);",
        "$user->roles()->sync([1, 3]);",
        "",
        "$vip = Customer::whereHas('orders', fn ($q) => $q->where('total', '>', 10_000_000))",
        "    ->withCount('orders')",
        "    ->withSum('orders', 'total')",
        "    ->with('latestOrder')",
        "    ->get();",
        "",
        "foreach ($vip as $c) {",
        "    echo \"{$c->name}: {$c->orders_count} ta, {$c->orders_sum_total}\";",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`hasOne` va `belongsTo` ni adashtirish: FK noto'g'ri jadvalda qidiriladi va `null` qaytadi.",
    "`$user->posts->count()` yozish: barcha postlar yuklanadi. `$user->posts()->count()` yoki `withCount` ishlating.",
    "`sync()` berilmagan barcha bog'lanishlarni o'chirishini unutish: qo'shish uchun `syncWithoutDetaching()` yoki `attach()`.",
    "FK ustunlariga indeks va constraint qo'ymaslik: JOIN va `whereHas` sekin, yetim yozuvlar paydo bo'ladi."
  ]
});
