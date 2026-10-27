/* Chuqur dars: 14.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.13", {
  "lesson": [
    "### Soft delete",
    "Yozuvni jismonan o'chirmasdan **belgilash**: `deleted_at TIMESTAMP NULL` (yoki `is_deleted`). So'rovlarda `WHERE deleted_at IS NULL`.",
    "",
    "### Laravel",
    "`use SoftDeletes;` + `$table->softDeletes();`. `delete()` → `deleted_at` o'rnatadi; `restore()`, `forceDelete()`, `withTrashed()`, `onlyTrashed()`, `trashed()`. Global scope avtomatik filtrlaydi.",
    "",
    "### Foydasi",
    "- Tiklash (restore), tasodifiy o'chirishdan himoya.",
    "- Tarix/audit, huquqiy talab (saqlash muddati).",
    "- FK yaxlitligi (bog'liq yozuvlar yetim bo'lmaydi).",
    "",
    "### Kamchiliklari / tuzoqlar",
    "- **Unikal'lik:** o'chirilgan qator `UNIQUE` ni band qiladi (14.8).",
    "- Har so'rovga `deleted_at IS NULL` (unutilsa o'chirilganlar chiqadi; raw SQL, JOIN'larda scope yo'q).",
    "- **Jadval o'sadi**, indekslar kattalashadi, sekinlashadi: `(deleted_at)` + asosiy ustun composite indeks.",
    "- **Cascade** mantiq: ota soft-delete → bolalar? (observer bilan).",
    "- **GDPR \"o'chirish huquqi\":** soft delete haqiqiy o'chirish emas → muddat bo'yicha `forceDelete`/anonimlashtirish.",
    "",
    "### Muqobillar",
    "- **Arxiv jadval** (`orders_archive`): asosiy jadval kichik.",
    "- **Status** ustuni (`active/archived`).",
    "- **Hodisa log** (event sourcing).",
    "- Haqiqiy o'chirish + backup.",
    "",
    "### Qoida",
    "Soft delete'ni **kerak bo'lganda** (tiklash/audit talabi) ishlating, hamma jadvalga avtomatik emas."
  ],
  "examples": [
    {
      "title": "SoftDeletes",
      "lang": "php",
      "code": [
        "class Post extends Model { use SoftDeletes; }",
        "Schema::table('posts', fn (Blueprint $t) => $t->softDeletes());",
        "",
        "$post->delete();                    // deleted_at o'rnatiladi",
        "Post::withTrashed()->find($id)->restore();",
        "Post::onlyTrashed()->where('deleted_at', '<', now()->subYear())->forceDelete();   // muddat bo'yicha tozalash"
      ]
    }
  ],
  "pitfalls": [
    "Raw SQL va JOIN'larda global scope yo'q: `deleted_at IS NULL` ni unutish o'chirilganlarni ko'rsatadi.",
    "Soft delete GDPR'da haqiqiy o'chirish emas: muddat bo'yicha `forceDelete`/anonimlashtirish.",
    "Unikal indeks o'chirilgan qator tufayli band bo'ladi.",
    "Jadval o'sishi sekinlashtiradi: composite indeks va arxivlash."
  ]
});
