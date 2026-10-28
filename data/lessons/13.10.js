/* Chuqur dars: 13.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.10", {
  "lesson": [
    "### Polimorfik munosabat",
    "Bitta model bir nechta turdagi modelga tegishli bo'la oladi. Masalan, `Comment` ham `Post`, ham `Video`, ham `Product` ga yoziladi. Har tur uchun alohida `post_id`, `video_id` ustunlari o'rniga ikki ustun ishlatiladi:",
    "- `commentable_id`: ota yozuv ID'si.",
    "- `commentable_type`: ota model turi (`App\\Models\\Post` yoki morph map'dagi qisqa nom).",
    "",
    "Migratsiyada: `$table->morphs('commentable')` ikkala ustun va composite indeks yaratadi. `nullableMorphs`, `uuidMorphs`, `ulidMorphs` ham bor.",
    "",
    "### Turlari",
    "- **morphOne / morphMany:** `Post::comments()` → `$this->morphMany(Comment::class, 'commentable')`. Teskarisi: `Comment::commentable()` → `$this->morphTo()`.",
    "- **morphToMany / morphedByMany:** polimorfik many-to-many. `Tag` ↔ `Post`, `Video`. Pivot `taggables (tag_id, taggable_id, taggable_type)`.",
    "- `morphOne` + `latestOfMany()` ham ishlaydi.",
    "",
    "### Morph map — majburiy amaliyot",
    "Default'da `_type` ustuniga to'liq klass nomi yoziladi. Muammolar: namespace yoki klass nomini o'zgartirsangiz, eski yozuvlar buziladi; DB ichki kod tuzilmasini oshkor qiladi; uzun satrlar joy egallaydi.",
    "",
    "`Relation::enforceMorphMap(['post' => Post::class, 'video' => Video::class])` (`AppServiceProvider::boot()` da). `enforce` versiyasi xaritada yo'q model uchun exception beradi va unutishning oldini oladi.",
    "",
    "### So'rov qilish",
    "- Eager load: `Comment::with('commentable')->get()` har tur uchun alohida so'rov yuboradi.",
    "- Turli turlar uchun turli ichki munosabat: `->with(['commentable' => fn (MorphTo $m) => $m->morphWith([Post::class => ['author'], Video::class => ['channel']])])`.",
    "- Filtr: `whereHasMorph('commentable', [Post::class], fn ($q) => $q->where('published', true))`.",
    "",
    "### Kamchiliklar",
    "- **FK constraint qo'yib bo'lmaydi:** `commentable_id` bir nechta jadvalga ishora qiladi. Ota yozuv o'chirilsa, yetim izohlar qoladi. Tozalashni `deleting` event yoki observer'da qilish kerak.",
    "- JOIN murakkablashadi, hisobotlar uchun noqulay.",
    "- `_type` + `_id` composite indeksi zarur. `morphs()` uni avtomatik qo'shadi.",
    "",
    "### Qachon ishlatish kerak",
    "Ko'p turdagi modellarga bir xil xususiyat qo'shilganda: izohlar, teglar, fayllar va rasmlar, like'lar, audit log, bildirishnomalar (Laravel `notifications` jadvali ham `notifiable` morph ishlatadi). Faqat 2 ta tur va qat'iy yaxlitlik kerak bo'lsa, ikkita nullable FK ustun + CHECK constraint ishonchliroq bo'lishi mumkin."
  ],
  "examples": [
    {
      "title": "Polimorfik izohlar va morph map",
      "lang": "php",
      "code": [
        "Schema::create('comments', function (Blueprint $table) {",
        "    $table->id();",
        "    $table->morphs('commentable');",
        "    $table->foreignId('user_id')->constrained();",
        "    $table->text('body');",
        "    $table->timestamps();",
        "});",
        "",
        "class Post extends Model",
        "{",
        "    public function comments(): MorphMany { return $this->morphMany(Comment::class, 'commentable'); }",
        "}",
        "",
        "class Comment extends Model",
        "{",
        "    public function commentable(): MorphTo { return $this->morphTo(); }",
        "}",
        "",
        "// AppServiceProvider::boot()",
        "Relation::enforceMorphMap([",
        "    'post' => Post::class,",
        "    'video' => Video::class,",
        "]);"
      ]
    },
    {
      "title": "So'rovlar va yetimlarni oldini olish",
      "lang": "php",
      "code": [
        "$recent = Comment::latest()->limit(50)",
        "    ->with(['commentable' => fn (MorphTo $m) => $m->morphWith([",
        "        Post::class => ['author'],",
        "        Video::class => ['channel'],",
        "    ])])",
        "    ->get();",
        "",
        "$onPublished = Comment::whereHasMorph('commentable', [Post::class],",
        "    fn ($q) => $q->whereNotNull('published_at'))->count();",
        "",
        "// Post o'chirilganda izohlarini ham o'chirish",
        "static::deleting(fn (Post $post) => $post->comments()->delete());"
      ]
    }
  ],
  "pitfalls": [
    "Morph map ishlatmaslik: model nomini yoki namespace'ni o'zgartirganda eski yozuvlar `Class not found` beradi.",
    "Ota yozuv o'chirilganda polimorfik bolalarni tozalamaslik: FK yo'qligi sababli yetim yozuvlar to'planadi.",
    "Morph map'ni loyiha o'rtasida qo'shib, mavjud `_type` qiymatlarini migratsiya qilmaslik.",
    "Ikki tur uchun ham polimorfik munosabat tanlash: yaxlitlik kafolati yo'qoladi va so'rovlar murakkablashadi."
  ]
});
