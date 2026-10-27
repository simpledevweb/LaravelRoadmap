/* Chuqur dars: 2.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.3", {
  "lesson": [
    "### Marshrutlar",
    "`routes/web.php` (session, CSRF, cookie), `routes/api.php` (`/api` prefiksi, stateless). `Route::get/post/put/patch/delete/any/match($uri, $action)`.",
    "",
    "### Action turlari",
    "Closure, `[Controller::class, 'method']`, single-action `Controller::class` (`__invoke`).",
    "",
    "### Parametrlar va cheklov",
    "`/users/{id}`, ixtiyoriy `{id?}`, `->where('id', '[0-9]+')`, `whereNumber`, `whereUuid`.",
    "",
    "### Nomlash va guruhlash",
    "`->name('users.show')` va `route('users.show', $user)`. `Route::prefix('admin')->middleware('auth')->group(...)`, `->controller(X::class)->group()`.",
    "",
    "### Resource",
    "`Route::resource('posts', PostController::class)` (7 marshrut), `apiResource` (create/edit yo'q), `->only()`/`->except()`.",
    "",
    "### Route Model Binding",
    "- **Implicit:** `function show(User $user)` — `{user}` ID bo'yicha avtomatik topiladi, topilmasa 404.",
    "- **Custom kalit:** `{post:slug}` yoki modelda `getRouteKeyName()`.",
    "- **Scoped:** `/users/{user}/posts/{post:slug}` — post shu user'ga tegishli.",
    "- **Explicit:** `Route::model('user', User::class)`.",
    "- `->withTrashed()` soft-deleted uchun.",
    "",
    "### Boshqa",
    "`Route::fallback()`, rate limiting (`throttle:60,1`), `route:cache` (closure marshrutlarni keshlab bo'lmaydi), `route:list`."
  ],
  "examples": [
    {
      "title": "Marshrutlar",
      "lang": "php",
      "code": [
        "Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {",
        "    Route::resource('posts', PostController::class);",
        "    Route::get('/users/{user}/posts/{post:slug}', [PostController::class, 'show'])->scopeBindings()->name('posts.show');",
        "});",
        "",
        "public function show(User $user, Post $post): View { return view('posts.show', compact('post')); }"
      ]
    }
  ],
  "pitfalls": [
    "Closure marshrutlar bilan `route:cache` ishlamaydi: controller ishlating.",
    "Implicit binding'da ID tartibini sanab o'tish xavfi (IDOR): policy bilan ruxsat tekshiring.",
    "Resource marshrutlar tartibi: `posts/create` `posts/{post}` dan oldin turishi kerak (resource buni o'zi hal qiladi, qo'lda yozsangiz ehtiyot).",
    "`web` va `api` guruhlari middleware'i farq qiladi (CSRF/sessiya): noto'g'ri faylga yozish xatoga olib keladi."
  ]
});
