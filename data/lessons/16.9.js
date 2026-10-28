/* Chuqur dars: 16.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.9", {
  "lesson": [
    "### SELECT * ning narxi",
    "`SELECT *` yozish oson, lekin har so'rovda yashirin xarajat qo'shadi:",
    "1. **Disk va xotira:** keraksiz ustunlar ham o'qiladi. Katta `TEXT`, `BLOB`, `JSON` ustunlar ko'pincha alohida sahifalarda (InnoDB off-page, PostgreSQL TOAST) saqlanadi va ularni o'qish qo'shimcha I/O.",
    "2. **Tarmoq:** DB va PHP o'rtasida ortiqcha baytlar. 20 qatorli ro'yxatda har postning 50 KB `body` ustuni — 1 MB keraksiz trafik.",
    "3. **PHP xotirasi va hydration:** har ustun model atributiga aylanadi, cast'lar qo'llanadi.",
    "4. **Covering indeks imkonsiz:** `SELECT id, title` indeksdan to'liq olinishi mumkin. `SELECT *` jadvalga murojaatni majburiy qiladi.",
    "5. **Barqarorlik:** jadvalga ustun qo'shilsa, natija tuzilmasi o'zgaradi. JOIN'da bir xil nomli ustunlar (`id`, `created_at`) bir-birini bosib ketadi.",
    "",
    "### Laravel'da ustunlarni tanlash",
    "- `select(['id', 'title', 'author_id'])` yoki `get(['id', 'title'])`.",
    "- Eager loading'da: `with('author:id,name')`. **Muhim:** munosabatni bog'lash uchun kalit ustunlar kerak. `belongsTo` uchun ota so'rovida `author_id`, bola so'rovida `id`. `hasMany` uchun bola so'rovida FK (`post_id`).",
    "- `pluck('email')`, `pluck('name', 'id')`: bitta-ikkita ustun, modelsiz.",
    "- `value('email')`: bitta qiymat.",
    "- `exists()` va `count()`: hech qanday ustun o'qilmaydi.",
    "",
    "### Strict mode yordam beradi",
    "`Model::preventAccessingMissingAttributes()` (yoki `shouldBeStrict`) yoqilsa, `select()` da olinmagan atributga murojaat `MissingAttributeException` beradi. Aks holda `$post->body` jim `null` qaytaradi va bu yashirin xato.",
    "",
    "### Qachon SELECT * normal",
    "- Bitta yozuvni ko'rsatish yoki tahrirlash sahifasi: barcha maydonlar kerak.",
    "- Kichik jadvallar (ma'lumotnomalar).",
    "- Prototip bosqichi.",
    "",
    "Ro'yxatlar, API endpoint'lari, eksportlar va issiq so'rovlarda ustunlarni aniq tanlang.",
    "",
    "### Katta ustunlarni ajratish",
    "Agar `posts.body` yoki `products.description` deyarli hech qachon ro'yxatlarda kerak bo'lmasa, uni alohida 1:1 jadvalga (`post_contents`) chiqarish jadvalning asosiy qismini ixcham qiladi va keshga yaxshiroq sig'adi."
  ],
  "examples": [
    {
      "title": "Ro'yxat uchun kerakli ustunlar",
      "lang": "php",
      "code": [
        "$posts = Post::query()",
        "    ->select(['id', 'title', 'slug', 'author_id', 'published_at'])",
        "    ->with([",
        "        'author:id,name',",
        "        'tags:id,name',",
        "    ])",
        "    ->withCount('comments')",
        "    ->latest('published_at')",
        "    ->paginate(20);"
      ],
      "note": "`author_id` ni tanlamasangiz, `author` munosabati har doim `null` bo'ladi."
    },
    {
      "title": "Modelsiz tez olish",
      "lang": "php",
      "code": [
        "$emails = User::where('newsletter', true)->pluck('email');",
        "",
        "$options = Category::orderBy('name')->pluck('name', 'id');",
        "",
        "$lastLogin = User::whereKey($id)->value('last_login_at');",
        "",
        "if (Order::where('customer_id', $id)->where('status', 'unpaid')->exists()) {",
        "    // ...",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`with('author:id,name')` yozib, ota so'rovda `author_id` ni tanlamaslik.",
    "`hasMany` eager load'da bola jadvalining FK ustunini (`post_id`) tanlamaslik: munosabat bo'sh chiqadi.",
    "Strict mode'siz olinmagan atributga murojaat qilish: jim `null` va noto'g'ri mantiq.",
    "JOIN'li so'rovda `select('*')`: ikki jadvalning `id` ustuni to'qnashadi."
  ]
});
