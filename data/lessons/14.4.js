/* Chuqur dars: 14.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.4", {
  "lesson": [
    "### Aloqa turlari",
    "**One-to-One (1:1):** bir yozuv ↔ bir yozuv (`users` ↔ `profiles`). FK + `UNIQUE` (yoki umumiy PK). Odatda kamdan-kam ishlatiladigan ma'lumotni ajratish uchun.",
    "",
    "**One-to-Many (1:N):** bir yozuv ↔ ko'p (`users` → `orders`). **FK \"ko'p\" tomonida** (`orders.user_id`). Eng keng tarqalgan.",
    "",
    "**Many-to-Many (N:M):** ko'p ↔ ko'p (`posts` ↔ `tags`). To'g'ridan jadvalda ifodalab bo'lmaydi: **junction (pivot) jadval** (14.7) `post_tag(post_id, tag_id)`.",
    "",
    "### Qaysi tomonda FK",
    "\"Ko'p\" tomonda: kitob (N) → muallif (1): `books.author_id`.",
    "",
    "### Majburiylik",
    "FK `NOT NULL` (majburiy) yoki `NULL` (ixtiyoriy). `ON DELETE` siyosati (RESTRICT/CASCADE/SET NULL).",
    "",
    "### Laravel Eloquent",
    "- 1:1: `hasOne` / `belongsTo`.",
    "- 1:N: `hasMany` / `belongsTo`.",
    "- N:M: `belongsToMany` (pivot: `attach`, `sync`, `withPivot`).",
    "- Polimorf: `morphOne/Many/ToMany` (`commentable_type`, `commentable_id`) — FK constraint yo'q (ehtiyot).",
    "- `hasManyThrough`.",
    "",
    "### Xatolar",
    "- N:M'ni ustunda ro'yxat (`tag_ids = '1,2'`) bilan saqlash.",
    "- 1:N'da FK noto'g'ri tomonda.",
    "- Pivot'ga unikal cheklov qo'ymaslik (dublikat bog'lanish).",
    "",
    "### Tanlash",
    "1:1 ko'pincha bitta jadvalga birlashtiriladi (agar ustunlar kam va doim kerak bo'lsa); ajratish — keng/maxfiy/ixtiyoriy ma'lumot uchun."
  ],
  "examples": [
    {
      "title": "Aloqalar",
      "lang": "php",
      "code": [
        "// 1:N",
        "class User extends Model { public function orders(): HasMany { return $this->hasMany(Order::class); } }",
        "class Order extends Model { public function user(): BelongsTo { return $this->belongsTo(User::class); } }",
        "// N:M",
        "class Post extends Model { public function tags(): BelongsToMany { return $this->belongsToMany(Tag::class)->withTimestamps(); } }"
      ]
    }
  ],
  "pitfalls": [
    "N:M'ni ustunda ro'yxat (`'1,2,3'`) bilan saqlash so'rov va yaxlitlikni buzadi: pivot jadval.",
    "FK noto'g'ri tomonda (1:N'da 'bir' tomonda) bo'lsa model ishlamaydi.",
    "Pivotda `UNIQUE (a_id, b_id)` bo'lmasa dublikat bog'lanishlar paydo bo'ladi.",
    "Polimorf aloqada DB darajasida FK yo'q: yaxlitlikni ilova ta'minlaydi."
  ]
});
