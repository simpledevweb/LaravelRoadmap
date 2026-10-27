/* Chuqur dars: 14.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.14", {
  "lesson": [
    "### Audit maydonlari",
    "Yozuv **kim, qachon** yaratgan/o'zgartirgan/o'chirganini saqlovchi ustunlar:",
    "- `created_at`, `updated_at` (Laravel `timestamps()`).",
    "- `created_by`, `updated_by`, `deleted_by` (FK `users`).",
    "- `deleted_at` (soft delete).",
    "- Ixtiyoriy: `ip`, `user_agent`, `version`.",
    "",
    "### Laravel",
    "`timestamps()` avtomatik. `created_by/updated_by` — observer yoki trait:",
    "`static::creating(fn ($m) => $m->created_by = auth()->id())`; `wasChanged()`, `getOriginal()`.",
    "",
    "### To'liq audit (o'zgarish tarixi)",
    "Alohida **audit log** jadvali: `auditable_type/id`, `user_id`, `event` (created/updated/deleted), `old_values` JSON, `new_values` JSON, `created_at`. Paketlar: **owen-it/laravel-auditing**, **spatie/laravel-activitylog**.",
    "",
    "### Boshqa yondashuvlar",
    "- **Temporal jadvallar / versiyalash** (har o'zgarish yangi qator `valid_from/valid_to`).",
    "- **Event sourcing**.",
    "- DB trigger'lari (mustaqil, lekin yashirin).",
    "- Binlog/CDC (Debezium).",
    "",
    "### Qoidalar",
    "- Audit jadvali **o'zgarmas** (faqat INSERT), alohida huquq.",
    "- Maxfiy ma'lumotni (parol, karta) auditga yozmang yoki maskalang.",
    "- Hajm: eski audit'ni arxivlash/partitsiyalash.",
    "- Kim = tizim/job bo'lsa ham belgilang (`null` aniq).",
    "- Vaqt UTC.",
    "",
    "### Foydasi",
    "Javobgarlik, nosozlik tahlili, qonuniy talablar (moliya, tibbiyot), \"kim o'zgartirdi?\" savoliga javob."
  ],
  "examples": [
    {
      "title": "Audit trait",
      "lang": "php",
      "code": [
        "trait Auditable",
        "{",
        "    public static function bootAuditable(): void",
        "    {",
        "        static::creating(fn ($m) => $m->created_by = auth()->id());",
        "        static::updating(fn ($m) => $m->updated_by = auth()->id());",
        "        static::updated(fn ($m) => AuditLog::create([",
        "            'auditable_type' => $m::class, 'auditable_id' => $m->id, 'user_id' => auth()->id(),",
        "            'old_values' => $m->getOriginal(), 'new_values' => $m->getChanges(),",
        "        ]));",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Audit'ga parol/karta kabi maxfiy ma'lumotni yozish xavfsizlik buzilishi.",
    "Audit jadvali o'zgartirilishi mumkin bo'lsa ishonchsiz: faqat INSERT.",
    "Audit hajmi tez o'sadi: arxivlash/partitsiya.",
    "`Model::withoutEvents()` yoki ommaviy `update()` observer'ni chetlab o'tadi."
  ]
});
