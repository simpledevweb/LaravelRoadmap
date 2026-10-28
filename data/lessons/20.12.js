/* Chuqur dars: 20.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.12", {
  "lesson": [
    "### Resurs darajasi nima",
    "Resurs darajasidagi avtorizatsiya **resurs turi** bilan ishlash huquqini tekshiradi: \"bu foydalanuvchi buyurtmalar bo'limiga umuman kira oladimi?\", \"hisobot yarata oladimi?\", \"yangi mahsulot qo'sha oladimi?\". Bu aniq bir yozuv haqida emas. Aniq yozuv — obyekt darajasi (20.13).",
    "",
    "Odatda RBAC ruxsatlari (20.10) va policy'ning `viewAny` va `create` metodlari bilan tekshiriladi.",
    "",
    "### OWASP API5: Broken Function Level Authorization",
    "Klassik xato: admin funksiyalari oddiy foydalanuvchiga ochiq qoladi.",
    "- `/api/admin/users` faqat admin panelida ko'rsatilgan, lekin API'da himoyalanmagan.",
    "- `DELETE /api/users/{id}` mavjud, oddiy foydalanuvchi esa uni chaqirsa, ishlaydi.",
    "- Frontend tugmani yashirgan, server esa tekshirmagan.",
    "",
    "Hujumchi API'ni o'rganadi (mobil ilovani dekompilyatsiya, JS bundle, hujjat) va yashirin endpoint'larni topadi.",
    "",
    "### Himoya",
    "1. **Deny by default.** Har yangi route avtomatik himoyalangan bo'lsin. Masalan, admin route guruhi butunlay `can:access-admin` bilan o'ralgan. Yoki loyiha darajasida \"route → ruxsat\" xaritasi va xaritada yo'q route uchun 403.",
    "2. **Admin va oddiy API'larni ajratish:** alohida prefiks (`/api/admin`), alohida middleware guruhi, hatto alohida guard yoki subdomen.",
    "3. **Har amal uchun tekshiruv:** o'qish ruxsati yozish ruxsatini anglatmaydi. `GET` ochiq bo'lsa, `DELETE` ham ochiq deb hisoblanmasin.",
    "4. **Testlar:** har himoyalangan endpoint uchun ruxsatsiz foydalanuvchi bilan 403 testi.",
    "",
    "### viewAny ≠ hammasini ko'rish",
    "Muhim nuance: foydalanuvchida `orders.view` ruxsati (va `viewAny` policy `true`) bo'lishi uning **barcha** buyurtmalarni ko'ra olishini anglatmaydi. Ro'yxat so'rovi doim foydalanuvchi **doirasi** bilan filtrlanadi:",
    "- tenant (13.14),",
    "- bo'lim yoki filial,",
    "- egalik (faqat o'z buyurtmalari),",
    "- rolga qarab kengroq doira (menejer — bo'lim, admin — tenant).",
    "",
    "Buni har controller'da qayta yozmaslik uchun modelda `visibleTo(User $user)` scope'i. Ro'yxat, eksport, qidiruv, statistika — hammasi shu scope orqali.",
    "",
    "### Laravel'da",
    "- `Route::middleware('can:access-admin')->prefix('admin')->group(...)`.",
    "- `$this->authorize('viewAny', Order::class)`, `$this->authorize('create', Order::class)` — model klassi bilan (obyektsiz).",
    "- Route'larni ro'yxatlab, himoyalanmaganlarini topadigan test (har route'da `auth` va `can` middleware bormi)."
  ],
  "examples": [
    {
      "title": "Ro'yxat: ruxsat + doira",
      "lang": "php",
      "code": [
        "// Order model",
        "public function scopeVisibleTo(Builder $q, User $user): void",
        "{",
        "    $q->where('tenant_id', $user->tenant_id);",
        "",
        "    match (true) {",
        "        $user->can('orders.view-all') => null,",
        "        $user->can('orders.view-branch') => $q->where('branch_id', $user->branch_id),",
        "        default => $q->where('created_by', $user->id),",
        "    };",
        "}",
        "",
        "// Controller",
        "public function index(Request $request)",
        "{",
        "    $this->authorize('viewAny', Order::class);",
        "",
        "    return OrderResource::collection(",
        "        Order::visibleTo($request->user())->latest()->paginate()",
        "    );",
        "}"
      ]
    },
    {
      "title": "Himoyalanmagan route'larni topuvchi test",
      "lang": "php",
      "code": [
        "it('protects every admin api route', function () {",
        "    $routes = collect(Route::getRoutes())",
        "        ->filter(fn ($r) => str_starts_with($r->uri(), 'api/admin'));",
        "",
        "    foreach ($routes as $route) {",
        "        $mw = $route->gatherMiddleware();",
        "        expect($mw)->toContain('auth:sanctum')",
        "            ->and(collect($mw)->contains(fn ($m) => str_starts_with($m, 'can:')))",
        "            ->toBeTrue(\"{$route->uri()} da can: middleware yo'q\");",
        "    }",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Admin endpoint'larini faqat UI'da yashirish bilan himoyalash.",
    "`viewAny` ruxsati bor foydalanuvchiga filtrsiz barcha yozuvlarni qaytarish.",
    "O'qish ruxsati bilan yozish endpoint'larini ham ochib qo'yish.",
    "Yangi endpoint'ni himoya middleware'isiz qo'shish (allow by default)."
  ]
});
