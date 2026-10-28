/* Chuqur dars: 19.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.15", {
  "lesson": [
    "### Avtorizatsiya modellari",
    "- **RBAC (Role-Based):** foydalanuvchi → rollar → ruxsatlar. \"Menejer `orders.update` qila oladi\". Sodda va tushunarli, lekin \"faqat o'z bo'limidagi buyurtmalar\" kabi shartlarni ifodalay olmaydi.",
    "- **ABAC (Attribute-Based):** qaror atributlarga asoslanadi: foydalanuvchi (bo'lim, daraja), resurs (egasi, holati, summasi), muhit (vaqt, IP). \"Summa 10 mln dan kam bo'lsa, menejer tasdiqlay oladi\". Moslashuvchan, lekin murakkab.",
    "- **ReBAC (Relationship-Based):** munosabatlar grafiga asoslanadi. \"Hujjatni loyiha jamoasi a'zolari tahrirlay oladi\". Google Zanzibar, OpenFGA, SpiceDB.",
    "- **Token scope'lari:** **ilova** (token) nimaga ruxsat olgan. Foydalanuvchi admin bo'lsa ham, uchinchi tomon ilovasiga faqat `orders:read` bergan bo'lishi mumkin.",
    "",
    "Amalda ular **birlashtiriladi**: ruxsat = rol ruxsat beradi **va** resurs shu foydalanuvchining doirasida **va** token shu scope'ga ega.",
    "",
    "### Dizayn qoidalari",
    "1. **Deny by default:** aniq ruxsat berilmagan narsa taqiqlangan. Yangi endpoint avtomatik ochilmasin. Masalan, loyiha darajasidagi route → ruxsat xaritasi va xaritada yo'q route uchun `403`.",
    "2. **Har endpoint'da obyekt darajasidagi tekshiruv** (18.16, IDOR).",
    "3. **Ro'yxatlarni filtrlash:** `index` foydalanuvchi ko'ra oladigan yozuvlarnigina qaytarsin. Policy faqat bitta obyektni tekshiradi, ro'yxat uchun so'rov doirasi (scope) kerak.",
    "4. **Markazlashtirish:** ruxsat mantiqi controller'lar bo'ylab `if` lar sifatida tarqalmasin. Policy'lar, Gate'lar va umumiy scope'lar.",
    "5. **Ruxsat matritsasini hujjatlashtirish:** rol × amal jadvali. Biznes bilan kelishiladi va auditda ko'rsatiladi.",
    "6. **Maydon darajasi:** ba'zi maydonlar faqat ba'zi rollarga ko'rinadi yoki tahrirlanadi (`internal_note`, `discount`).",
    "",
    "### Laravel vositalari",
    "- **Policy:** model bo'yicha `view`, `update`, `delete` va maxsus amallar. `before()` metodi super-admin uchun.",
    "- **Gate:** modelga bog'liq bo'lmagan ruxsatlar (`access-admin-panel`).",
    "- **spatie/laravel-permission:** rollar va ruxsatlar DB'da, `$user->can('orders.update')`, `role:` va `permission:` middleware.",
    "- **Sanctum abilities:** `tokenCan()`.",
    "- **Global scope'lar:** tenant izolyatsiyasi (13.14).",
    "",
    "### Testlar",
    "Ruxsat matritsasi bo'yicha data-driven testlar: har rol × har endpoint → kutilgan status. Yangi endpoint qo'shilganda test ham qo'shilsin. Ruxsat xatosi eng qimmat xatolardan biri."
  ],
  "examples": [
    {
      "title": "Rol + egalik + scope",
      "lang": "php",
      "code": [
        "class OrderPolicy",
        "{",
        "    public function before(User $user): ?bool",
        "    {",
        "        return $user->hasRole('super-admin') ? true : null;",
        "    }",
        "",
        "    public function update(User $user, Order $order): bool",
        "    {",
        "        return $user->can('orders.update')                       // RBAC",
        "            && $order->tenant_id === $user->tenant_id            // doira",
        "            && ($user->hasRole('manager') || $order->created_by === $user->id)  // ABAC",
        "            && $order->status->isEditable()                      // resurs holati",
        "            && $user->tokenCan('orders:write');                  // token scope",
        "    }",
        "}",
        "",
        "// Ro'yxat: policy emas, so'rov doirasi",
        "public function index(Request $request)",
        "{",
        "    return OrderResource::collection(Order::visibleTo($request->user())->latest()->paginate());",
        "}"
      ],
      "note": "Session orqali kirgan foydalanuvchida (token yo'q) Sanctum'ning `tokenCan()` `true` qaytaradi."
    },
    {
      "title": "Ruxsat matritsasi testi",
      "lang": "php",
      "code": [
        "dataset('order_permissions', [",
        "    ['viewer',  'patch',  403],",
        "    ['editor',  'patch',  200],",
        "    ['manager', 'delete', 204],",
        "    ['editor',  'delete', 403],",
        "]);",
        "",
        "it('enforces the permission matrix', function (string $role, string $method, int $status) {",
        "    $user = User::factory()->withRole($role)->create();",
        "    $order = Order::factory()->for($user->tenant)->create();",
        "    Sanctum::actingAs($user, ['orders:read', 'orders:write']);",
        "",
        "    $this->json($method, \"/api/v1/orders/{$order->public_id}\", ['note' => 'x'])->assertStatus($status);",
        "})->with('order_permissions');"
      ]
    }
  ],
  "pitfalls": [
    "Yangi endpoint'ni avtorizatsiyasiz qo'shish va u hamma uchun ochiq bo'lib qolishi (allow by default).",
    "Faqat `show` ni policy bilan himoyalab, `index` da barcha yozuvlarni qaytarish.",
    "Ruxsat tekshiruvlarini controller'lar bo'ylab tarqatish: biri unutiladi.",
    "Token scope'larini e'tiborsiz qoldirib, faqat foydalanuvchi rolini tekshirish."
  ]
});
