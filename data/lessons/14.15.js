/* Chuqur dars: 14.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.15", {
  "lesson": [
    "### Multi-tenant",
    "Bitta ilova **ko'p mijozga (tenant)** xizmat qiladi, ularning ma'lumotlari **izolyatsiya** qilingan (SaaS).",
    "",
    "### Yondashuvlar",
    "1. **Alohida baza (database per tenant):** eng kuchli izolyatsiya, tenant bo'yicha backup/ko'chirish oson; **kamchilik:** ko'p baza (migratsiya har birida), ulanish/boshqarish murakkab, ko'p tenantda qimmat.",
    "2. **Alohida schema (PostgreSQL schema per tenant):** o'rtacha izolyatsiya.",
    "3. Umumiy baza, `tenant_id` ustuni (shared schema): eng arzon va oddiy, minglab tenant; **kamchilik:** izolyatsiya ilova darajasida (xato = ma'lumot sizishi), \"shovqinli qo'shni\" (noisy neighbor).",
    "",
    "### tenant_id yondashuvi",
    "- Har jadvalda `tenant_id` + **indeks** (ko'pincha composite birinchi ustun: `(tenant_id, created_at)`).",
    "- **Unique** — tenant ichida: `UNIQUE (tenant_id, slug)`.",
    "- **Global scope** (Eloquent): barcha so'rovga `where tenant_id = ...` avtomatik; `creating` da `tenant_id` o'rnatish.",
    "- FK'larda tenant mosligi (composite FK `(tenant_id, id)`).",
    "- Raw SQL, queue job, keshlar, fayl yo'llari — tenant kontekstini unutmaslik (Context!).",
    "",
    "### Paketlar",
    "**stancl/tenancy**, **spatie/laravel-multitenancy**, Tenancy for Laravel.",
    "",
    "### Xavfsizlik",
    "Tenant aniqlash (subdomen, header, token) ishonchli; admin so'rovlar; testlarda tenant sizishi (cross-tenant) testi; PostgreSQL **Row Level Security**.",
    "",
    "### Tanlash",
    "Kam, katta mijoz (enterprise) → baza/tenant; ko'p kichik mijoz → `tenant_id`. Gibrid ham mumkin.",
    "",
    "### Boshqa",
    "Tenant bo'yicha migratsiya, backup, hajm limitlari, ma'lumotni olib chiqish (export), o'chirish (GDPR)."
  ],
  "examples": [
    {
      "title": "Tenant global scope",
      "lang": "php",
      "code": [
        "trait BelongsToTenant",
        "{",
        "    protected static function bootBelongsToTenant(): void",
        "    {",
        "        static::addGlobalScope('tenant', fn (Builder $q) => $q->where($q->getModel()->getTable().'.tenant_id', app('tenant')->id));",
        "        static::creating(fn ($m) => $m->tenant_id ??= app('tenant')->id);",
        "    }",
        "}",
        "// migratsiya: $t->foreignId('tenant_id')->constrained(); $t->unique(['tenant_id', 'slug']);"
      ]
    }
  ],
  "pitfalls": [
    "Raw SQL, queue job va keshda tenant kontekstini unutish ma'lumot sizishiga (cross-tenant) olib keladi.",
    "`unique` global bo'lsa tenantlar bir-biriga xalaqit beradi: `(tenant_id, slug)`.",
    "`tenant_id` indekssiz yoki composite'da birinchi emas — sekin so'rovlar.",
    "Global scope'ni `withoutGlobalScopes()` bilan tasodifan o'chirib qo'yish xavfi."
  ]
});
