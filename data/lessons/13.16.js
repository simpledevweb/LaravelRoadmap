/* Chuqur dars: 13.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.16", {
  "lesson": [
    "### Nega API Resource",
    "Modelni to'g'ridan-to'g'ri qaytarish (`return $user;`) barcha ustunlarni JSON'ga chiqaradi. DB tuzilmasi API kontraktiga aylanadi: ustun nomini o'zgartirsangiz, mobil ilova buziladi. Yangi qo'shilgan maxfiy ustun tasodifan oshkor bo'ladi. **API Resource** model va JSON o'rtasidagi transformatsiya qatlami: qaysi maydon, qanday nom va formatda, qaysi holatda chiqishini aniq belgilaydi.",
    "",
    "`php artisan make:resource OrderResource` va `--collection` bilan collection klassi.",
    "",
    "### Asosiy imkoniyatlar",
    "- `toArray($request)`: chiqish tuzilmasi. Model atributlari `$this->` orqali olinadi.",
    "- **Shartli maydonlar:** `$this->when($cond, $value)`, `$this->mergeWhen(...)`, `$this->whenHas('col')`, `$this->whenNotNull()`.",
    "- **Munosabatlar:** `UserResource::make($this->whenLoaded('author'))`. Munosabat yuklanmagan bo'lsa, maydon chiqmaydi va lazy load **bo'lmaydi**. Bu N+1 dan himoyaning asosiy usuli.",
    "- `$this->whenCounted('comments')`, `whenAggregated()` (Laravel 10+), `whenPivotLoaded()`.",
    "- `with()` va `additional()`: `meta` kabi qo'shimcha yuqori darajadagi ma'lumot.",
    "- `OrderResource::collection($orders)`: to'plam. Paginator berilsa, `links` va `meta` avtomatik qo'shiladi.",
    "- `JsonResource::withoutWrapping()`: `data` o'ramini olib tashlash.",
    "",
    "### Avtorizatsiya bo'yicha maydonlar",
    "`'email' => $this->when($request->user()?->can('viewContact', $this->resource), $this->email)`. Faqat ruxsati bor foydalanuvchiga maxfiy maydon chiqadi. Lekin bu ma'lumotni kim **o'zgartira olishini** emas, faqat kim ko'rishini boshqaradi.",
    "",
    "### Formatlash",
    "Sana: `$this->created_at?->toIso8601String()`. Pul: butun son va valyuta (`{\"amount\": 150000, \"currency\": \"UZS\"}`), formatlangan matn emas. Enum: qiymat va kerak bo'lsa label. Resource ichida izchil format API iste'molchilariga bashorat qilinadigan kontrakt beradi.",
    "",
    "### Performance",
    "Resource o'zi so'rov yubormaydi. Lekin `$this->author->name` (whenLoaded'siz) yozilsa, har element uchun lazy load bo'ladi. Controller'da kerakli munosabatlarni `with()` va `withCount()` bilan oldindan yuklang. Resource esa faqat `whenLoaded`/`whenCounted` bilan o'qisin. Dev'da `preventLazyLoading` bu xatoni darhol ko'rsatadi.",
    "",
    "### Versiyalash",
    "API versiyalari uchun alohida namespace: `App\\Http\\Resources\\V1\\OrderResource`, `V2\\OrderResource`. Model bitta, kontrakt har xil."
  ],
  "examples": [
    {
      "title": "Order resource",
      "lang": "php",
      "code": [
        "class OrderResource extends JsonResource",
        "{",
        "    public function toArray(Request $request): array",
        "    {",
        "        return [",
        "            'id' => $this->id,",
        "            'number' => $this->number,",
        "            'status' => ['value' => $this->status->value, 'label' => $this->status->label()],",
        "            'total' => ['amount' => (int) $this->total, 'currency' => 'UZS'],",
        "            'customer' => CustomerResource::make($this->whenLoaded('customer')),",
        "            'items' => OrderItemResource::collection($this->whenLoaded('items')),",
        "            'items_count' => $this->whenCounted('items'),",
        "            'internal_note' => $this->when($request->user()?->isStaff(), $this->internal_note),",
        "            'created_at' => $this->created_at->toIso8601String(),",
        "        ];",
        "    }",
        "}"
      ]
    },
    {
      "title": "Controller'da eager loading va paginatsiya",
      "lang": "php",
      "code": [
        "public function index(Request $request)",
        "{",
        "    $orders = Order::query()",
        "        ->with('customer')",
        "        ->withCount('items')",
        "        ->latest()",
        "        ->paginate(20);",
        "",
        "    return OrderResource::collection($orders)",
        "        ->additional(['meta' => ['currency' => 'UZS']]);",
        "}",
        "",
        "public function show(Order $order)",
        "{",
        "    return OrderResource::make($order->load(['customer', 'items.product']));",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Munosabatni `whenLoaded` siz chiqarish: ro'yxatda har element uchun lazy load (N+1).",
    "Modelni to'g'ridan-to'g'ri qaytarish: yangi ustun (`password_reset_token`) tasodifan API'ga chiqadi.",
    "`when()` ga hisoblangan qiymat berish (`$this->when($c, $this->expensive())`): shart yolg'on bo'lsa ham hisoblanadi. Yopilma bering: `fn () => $this->expensive()`.",
    "Resource ichida yangi so'rov yuborish (`Order::where(...)->count()`): har element uchun takrorlanadi."
  ]
});
