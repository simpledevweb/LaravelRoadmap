/* Chuqur dars: 14.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.7", {
  "lesson": [
    "### Junction (pivot) jadval",
    "**Many-to-Many** aloqani ifodalovchi oraliq jadval: ikkala jadvalga FK. `post_tag(post_id, tag_id)`.",
    "",
    "### Tuzilma",
    "```sql",
    "CREATE TABLE post_tag (",
    "  post_id BIGINT UNSIGNED NOT NULL,",
    "  tag_id  BIGINT UNSIGNED NOT NULL,",
    "  PRIMARY KEY (post_id, tag_id),",
    "  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,",
    "  FOREIGN KEY (tag_id)  REFERENCES tags(id)  ON DELETE CASCADE",
    ");",
    "```",
    "- **Composite PK** (yoki alohida `id` + `UNIQUE(post_id, tag_id)`): dublikat bog'lanish yo'q.",
    "- Teskari yo'nalish uchun qo'shimcha indeks: `INDEX (tag_id, post_id)`.",
    "",
    "### Nomlash (Laravel)",
    "Ikkala singular model nomi **alifbo tartibida**, `_` bilan: `post_tag`, `role_user`.",
    "",
    "### Qo'shimcha ma'lumotli pivot",
    "Aloqaning o'ziga xos atributlari: `created_at`, `role`, `qty`, `position`. Ma'lumot ko'payib, o'z mantig'iga ega bo'lsa — **to'laqonli entity** (`enrollments`, `order_lines`, o'z `id`).",
    "",
    "### Eloquent",
    "`belongsToMany(Tag::class)->withPivot('position')->withTimestamps()`; `attach()`, `detach()`, `sync([...])`, `syncWithoutDetaching()`, `toggle()`; custom pivot model (`->using(PostTag::class)`).",
    "",
    "### Muhim",
    "- Ikkala FK indeksli.",
    "- `ON DELETE CASCADE` odatda mantiqli (bog'lanish ota'siz ma'nosiz).",
    "- Katta pivotda `sync` ko'p so'rov: `upsert`.",
    "",
    "### Xatolar",
    "Pivotsiz N:M, dublikat bog'lanishga yo'l qo'yish, teskari indeks yo'qligi."
  ],
  "examples": [
    {
      "title": "Pivot",
      "lang": "php",
      "code": [
        "Schema::create('post_tag', function (Blueprint $t) {",
        "    $t->foreignId('post_id')->constrained()->cascadeOnDelete();",
        "    $t->foreignId('tag_id')->constrained()->cascadeOnDelete();",
        "    $t->unsignedSmallInteger('position')->default(0);",
        "    $t->primary(['post_id', 'tag_id']);",
        "    $t->index(['tag_id', 'post_id']);",
        "});",
        "$post->tags()->sync([1, 2, 3]);"
      ]
    }
  ],
  "pitfalls": [
    "Pivotda unikal cheklov bo'lmasa dublikat bog'lanishlar paydo bo'ladi.",
    "Teskari yo'nalish indeksi bo'lmasa (`tag → posts`) so'rov sekin.",
    "Pivot o'z mantig'iga ega bo'lib qolsa uni oddiy pivot emas, entity qiling.",
    "Katta pivotda `sync` ko'p so'rov beradi: `upsert`/bo'laklab."
  ]
});
