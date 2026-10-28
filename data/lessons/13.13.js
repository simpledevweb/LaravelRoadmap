/* Chuqur dars: 13.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.13", {
  "lesson": [
    "### Scope nima",
    "Query scope — tez-tez takrorlanadigan so'rov shartini modelga nom bilan joylash. `Order::where('status', 'paid')->where('paid_at', '>=', now()->subMonth())` o'rniga `Order::paid()->recent()`. Natija: kod o'qiladi, shart bir joyda o'zgaradi, biznes tushunchasi nomga ega bo'ladi.",
    "",
    "### Local scope sintaksisi",
    "- Klassik: `public function scopePaid(Builder $query): void` → chaqiruv `Order::paid()`.",
    "- Laravel 12+: `#[Scope]` atributi bilan `protected function paid(Builder $query): void`.",
    "- Parametrli: `scopeOfStatus(Builder $q, OrderStatus $status)` → `Order::ofStatus(OrderStatus::Paid)`.",
    "",
    "Scope builder'ni o'zgartiradi. U `void` qaytarishi yoki builder'ni qaytarishi mumkin.",
    "",
    "### Zanjir va munosabatlar",
    "Scope'lar oddiy builder metodlari kabi zanjirlanadi va munosabat ichida ham ishlaydi:",
    "- `$customer->orders()->paid()->sum('total')`",
    "- `Customer::whereHas('orders', fn ($q) => $q->paid())`",
    "- `->with(['orders' => fn ($q) => $q->paid()->latest()])`",
    "",
    "### OR bilan ehtiyot",
    "Scope ichida `orWhere` yozilsa, tashqi shartlar bilan mantiq buziladi: `Order::forCustomer(5)->urgent()` va `urgent` ichida `where(a)->orWhere(b)` bo'lsa, natija `customer = 5 AND a OR b` bo'ladi. Scope ichidagi OR shartlarni doim guruhlang: `$q->where(fn ($q) => $q->where(...)->orWhere(...))`.",
    "",
    "Scope'larni OR bilan birlashtirish: `Order::paid()->orWhere->refunded()` (higher-order `orWhere`).",
    "",
    "### Dinamik filtrlar",
    "Ro'yxat sahifalari uchun `when()` bilan scope'larni shartli qo'llash qulay: `->when($request->status, fn ($q, $s) => $q->ofStatus($s))`. Ko'p filtrli API'lar uchun `spatie/laravel-query-builder` paketi so'rov parametrlarini scope'larga xavfsiz bog'laydi.",
    "",
    "### Qachon scope emas",
    "- Bir marta ishlatiladigan shart: oddiy `where`.",
    "- Murakkab hisobot so'rovi: alohida query obyekti yoki repository metodi.",
    "- Barcha so'rovlarga avtomatik qo'llanishi kerak bo'lgan shart: global scope (13.14).",
    "",
    "Custom Eloquent Builder klassi (`newEloquentBuilder()` yoki Laravel 11+ da `#[UseEloquentBuilder]`) scope'lar ko'payganda modelni yengillashtiradi va IDE avtoto'ldirishni yaxshilaydi."
  ],
  "examples": [
    {
      "title": "Local scope'lar",
      "lang": "php",
      "code": [
        "class Order extends Model",
        "{",
        "    public function scopePaid(Builder $query): void",
        "    {",
        "        $query->where('status', OrderStatus::Paid);",
        "    }",
        "",
        "    public function scopePlacedBetween(Builder $query, CarbonInterface $from, CarbonInterface $to): void",
        "    {",
        "        $query->whereBetween('created_at', [$from, $to]);",
        "    }",
        "",
        "    public function scopeNeedsAttention(Builder $query): void",
        "    {",
        "        $query->where(fn (Builder $q) => $q",
        "            ->where('status', OrderStatus::Failed)",
        "            ->orWhere('total', '>', 50_000_000));",
        "    }",
        "}",
        "",
        "$revenue = Order::paid()->placedBetween(now()->startOfMonth(), now())->sum('total');"
      ],
      "note": "`scopeNeedsAttention` dagi OR guruhlangan, shuning uchun tashqi shartlar bilan xavfsiz birlashadi."
    },
    {
      "title": "Filtrlarni shartli qo'llash",
      "lang": "php",
      "code": [
        "public function index(Request $request)",
        "{",
        "    return Order::query()",
        "        ->when($request->enum('status', OrderStatus::class), fn ($q, $s) => $q->where('status', $s))",
        "        ->when($request->date('from'), fn ($q, $from) => $q->placedBetween($from, now()))",
        "        ->when($request->boolean('attention'), fn ($q) => $q->needsAttention())",
        "        ->latest()",
        "        ->paginate(20);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Scope ichida guruhlanmagan `orWhere` yozish: tashqi filtrlar (masalan, `customer_id`) chetlab o'tiladi va boshqa mijoz ma'lumoti chiqadi.",
    "Scope chaqirishda `scope` prefiksini yozish (`Order::scopePaid()`): to'g'risi `Order::paid()`.",
    "Scope'dan `get()` yoki natija qaytarish: zanjir uziladi. Scope faqat builder'ni o'zgartirishi kerak.",
    "Har kichik shartga scope yaratib, modelni yuzlab metod bilan to'ldirish."
  ]
});
