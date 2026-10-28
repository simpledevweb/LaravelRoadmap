/* Chuqur dars: 13.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.14", {
  "lesson": [
    "### Local va global scope farqi",
    "- **Local scope** (13.13) faqat aniq chaqirilganda qo'llanadi: `Order::paid()`.",
    "- **Global scope** modelning **barcha** so'rovlariga avtomatik qo'shiladi: `Order::all()`, `find()`, munosabatlar, `count()`, route model binding.",
    "",
    "Eng mashhur misol — `SoftDeletes` (13.17). U `SoftDeletingScope` global scope'i orqali `whereNull('deleted_at')` qo'shadi.",
    "",
    "### E'lon qilish",
    "1. **Klass:** `Scope` interfeysini amalga oshiradi: `apply(Builder $builder, Model $model)`. Qayta ishlatiladi va test qilinadi.",
    "2. **Atribut** (Laravel 10.20+): `#[ScopedBy([TenantScope::class])]` model ustida.",
    "3. **Yopilma:** `booted()` ichida `static::addGlobalScope('active', fn (Builder $q) => $q->where('active', true))`.",
    "",
    "Trait ichida `bootTraitName()` statik metodi orqali ham global scope qo'shish mumkin. Masalan, `BelongsToTenant` trait'i modelga ulanganda scope'ni o'zi qo'shadi.",
    "",
    "### O'chirish",
    "- `Order::withoutGlobalScope(TenantScope::class)->get()`",
    "- `Order::withoutGlobalScopes()->get()` yoki ma'lum ro'yxat.",
    "- Laravel 11+: `withoutGlobalScopesExcept([...])`.",
    "",
    "### Multi-tenancy",
    "Global scope'ning eng muhim qo'llanishi: har so'rovga `where('tenant_id', current_tenant_id)`. Uch qismdan iborat:",
    "1. Global scope o'qishni filtrlaydi.",
    "2. `creating` event `tenant_id` ni avtomatik to'ldiradi.",
    "3. Test: boshqa tenant ma'lumoti hech bir yo'l bilan ko'rinmasligini tekshiradi.",
    "",
    "**Xavf nuqtalari:**",
    "- Query builder (`DB::table('orders')`) va raw so'rovlar global scope'ni **chetlab o'tadi**.",
    "- Queue job'larda va artisan buyruqlarida \"joriy tenant\" yo'q. Kontekstni job ichida aniq tiklash kerak.",
    "- Scope tenant topilmasa, jim o'tib ketmasligi kerak: exception tashlasin yoki `whereRaw('1 = 0')` qo'shsin. Aks holda barcha tenant'lar ma'lumoti ochiladi.",
    "- Unique indekslar ham `tenant_id` ni o'z ichiga olishi kerak.",
    "",
    "### Global scope'ning salbiy tomonlari",
    "Yashirin shart kodni o'qishni qiyinlashtiradi: dasturchi `Order::count()` yozib, nima uchun natija kam ekanini tushunmaydi. Shuning uchun global scope'ni faqat **haqiqatan universal** qoidalar uchun ishlating: tenant, soft delete, nashr qilinmagan kontentni yashirish. \"Faqat faol mahsulotlar\" kabi shartlar ko'pincha local scope sifatida aniqroq. Admin panelida esa doim `withoutGlobalScope` yozishga to'g'ri keladi."
  ],
  "examples": [
    {
      "title": "Tenant global scope va trait",
      "lang": "php",
      "code": [
        "final class TenantScope implements Scope",
        "{",
        "    public function apply(Builder $builder, Model $model): void",
        "    {",
        "        $tenantId = app(TenantContext::class)->id()",
        "            ?? throw new LogicException('Tenant context is not set');",
        "",
        "        $builder->where($model->qualifyColumn('tenant_id'), $tenantId);",
        "    }",
        "}",
        "",
        "trait BelongsToTenant",
        "{",
        "    protected static function bootBelongsToTenant(): void",
        "    {",
        "        static::addGlobalScope(new TenantScope());",
        "        static::creating(function (Model $model) {",
        "            $model->tenant_id ??= app(TenantContext::class)->id();",
        "        });",
        "    }",
        "}",
        "",
        "class Invoice extends Model { use BelongsToTenant; }"
      ],
      "note": "`qualifyColumn()` JOIN'li so'rovlarda ustun nomini `invoices.tenant_id` qiladi va ambiguity'dan himoya qiladi."
    },
    {
      "title": "Izolyatsiya testi",
      "lang": "php",
      "code": [
        "it('does not leak invoices between tenants', function () {",
        "    $a = Tenant::factory()->create();",
        "    $b = Tenant::factory()->create();",
        "",
        "    tenancy()->run($a, fn () => Invoice::factory()->count(3)->create());",
        "    tenancy()->run($b, fn () => Invoice::factory()->create());",
        "",
        "    tenancy()->run($b, function () {",
        "        expect(Invoice::count())->toBe(1);",
        "        expect(Invoice::withoutGlobalScope(TenantScope::class)->count())->toBe(4);",
        "    });",
        "});"
      ],
      "note": "`tenancy()->run()` bu yerda loyihadagi tenant kontekstini o'rnatuvchi helper deb faraz qilingan."
    }
  ],
  "pitfalls": [
    "Tenant scope'ni `DB::table()` yoki raw SQL ham qo'llaydi deb o'ylash: ma'lumot boshqa tenant'ga oqib chiqadi.",
    "Tenant topilmaganda scope shartsiz o'tib ketishi: barcha tenant'lar ma'lumoti ochiladi.",
    "JOIN'li so'rovda ustunni `qualifyColumn` siz yozish: `column reference \"tenant_id\" is ambiguous`.",
    "Universal bo'lmagan shartni global scope qilish: har yerda `withoutGlobalScope` yozishga to'g'ri keladi va xatolar ko'payadi."
  ]
});
