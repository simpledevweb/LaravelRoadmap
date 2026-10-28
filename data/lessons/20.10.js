/* Chuqur dars: 20.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.10", {
  "lesson": [
    "### RBAC asosi",
    "Role-Based Access Control: foydalanuvchilarga **rollar** (admin, manager, operator, viewer) biriktiriladi, rollarga esa **ruxsatlar** (`orders.view`, `orders.update`, `reports.export`). Foydalanuvchining ruxsatlari — uning barcha rollari ruxsatlarining birlashmasi. Ba'zi tizimlarda foydalanuvchiga to'g'ridan-to'g'ri ruxsat ham beriladi.",
    "",
    "### Asosiy qoida: kod ruxsatni tekshiradi, rolni emas",
    "`if ($user->hasRole('manager'))` o'rniga `if ($user->can('orders.update'))`. Sababi: biznes \"operatorlar ham buyurtmani tahrirlay olsin\" desa, faqat rol-ruxsat bog'lanishi (DB yoki seeder) o'zgaradi va kodga tegilmaydi. Rol nomlari kodga tarqalib ketsa, har o'zgarish o'nlab joyni tahrirlashni talab qiladi.",
    "",
    "Istisno: super-admin, `Gate::before()` orqali bitta joyda.",
    "",
    "### Ruxsatlar dizayni",
    "- **Izchil nomlash:** `resurs.amal`: `orders.view`, `orders.create`, `orders.update`, `orders.delete`, `orders.refund`, `reports.export`.",
    "- **Granulyar, lekin o'lchovli:** har tugma uchun ruxsat ham emas, \"hamma narsa\" uchun bitta ham emas. Biznes amallariga mos.",
    "- **Ruxsatlar ro'yxati kodda** (enum yoki konstantalar) va seeder bilan sinxronlanadi. Rollar va ularning ruxsatlari esa admin panelda boshqarilishi mumkin.",
    "- **Ruxsat matritsasi** hujjati: rol × ruxsat jadvali, biznes bilan kelishilgan (19.15).",
    "",
    "### spatie/laravel-permission",
    "Laravel'da eng keng tarqalgan paket:",
    "- `HasRoles` trait, `$user->assignRole('manager')`, `$role->givePermissionTo('orders.update')`.",
    "- Laravel Gate bilan integratsiya: `$user->can('orders.update')`, `@can`, `can:` middleware ishlaydi.",
    "- `role:`, `permission:`, `role_or_permission:` middleware.",
    "- **Teams** imkoniyati: multi-tenant tizimda rollar tenant doirasida (\"A kompaniyada admin, B kompaniyada viewer\").",
    "- **Kesh:** ruxsatlar keshlanadi. Rol yoki ruxsat o'zgarganda paket keshni avtomatik tozalaydi, lekin to'g'ridan-to'g'ri DB o'zgarishlaridan keyin `permission:cache-reset` kerak.",
    "",
    "### RBAC chegaralari",
    "RBAC \"nima qila oladi\"ni hal qiladi, lekin \"**qaysi** yozuvlar bilan\"ni emas. \"Menejer o'z bo'limidagi buyurtmalarni tahrirlaydi\" — bu rol + atribut (ABAC) yoki policy'dagi egalik tekshiruvi (20.11, 20.13). Rollar soni portlay boshlasa (`manager_tashkent_retail`, `manager_samarkand_wholesale`), bu RBAC'ning noto'g'ri ishlatilayotgani belgisi: atributlar (bo'lim, filial) foydalanuvchi va resursda bo'lishi va policy'da solishtirilishi kerak.",
    "",
    "### Audit",
    "Rol va ruxsat o'zgarishlari (kim, kimga, qachon) audit log'ga yozilsin. Ruxsatlar oshirilishi xavfsizlik hodisasi."
  ],
  "examples": [
    {
      "title": "Ruxsatlar enum'da, rollar seeder'da",
      "lang": "php",
      "code": [
        "enum Permission: string",
        "{",
        "    case OrdersView = 'orders.view';",
        "    case OrdersUpdate = 'orders.update';",
        "    case OrdersRefund = 'orders.refund';",
        "    case ReportsExport = 'reports.export';",
        "}",
        "",
        "class RolesSeeder extends Seeder",
        "{",
        "    public function run(): void",
        "    {",
        "        foreach (Permission::cases() as $p) {",
        "            SpatiePermission::findOrCreate($p->value, 'web');",
        "        }",
        "",
        "        Role::findOrCreate('viewer')->syncPermissions([Permission::OrdersView->value]);",
        "        Role::findOrCreate('manager')->syncPermissions([",
        "            Permission::OrdersView->value, Permission::OrdersUpdate->value, Permission::ReportsExport->value,",
        "        ]);",
        "",
        "        app(PermissionRegistrar::class)->forgetCachedPermissions();",
        "    }",
        "}"
      ]
    },
    {
      "title": "Tekshirish: ruxsat, rol emas",
      "lang": "php",
      "code": [
        "// AppServiceProvider: super-admin",
        "Gate::before(fn (User $user) => $user->hasRole('super-admin') ? true : null);",
        "",
        "// Route",
        "Route::post('orders/{order}/refund', RefundController::class)",
        "    ->middleware('can:' . Permission::OrdersRefund->value);",
        "",
        "// Kod",
        "if ($user->can(Permission::ReportsExport->value)) { ... }",
        "",
        "// YOMON: rol nomi kodga tarqalgan",
        "if ($user->hasRole('manager') || $user->hasRole('admin')) { ... }"
      ]
    }
  ],
  "pitfalls": [
    "Kodda rol nomlarini tekshirish: har tashkiliy o'zgarish kodni o'zgartirishni talab qiladi.",
    "Egalik va doira shartlarini rollar bilan ifodalashga urinish: rollar soni portlaydi.",
    "DB'da ruxsatlarni qo'lda o'zgartirib, keshni tozalamaslik.",
    "Rol va ruxsat o'zgarishlarini audit qilmaslik."
  ]
});
