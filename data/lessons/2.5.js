/* Chuqur dars: 2.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.5", {
  "lesson": [
    "### Controller vazifasi",
    "HTTP so'rovni qabul qilib, ilova mantig'iga (Action/Service) uzatadi va javob qaytaradi. **Yupqa** bo'lishi kerak: validatsiya (FormRequest), biznes mantiq (Action), taqdimot (Resource/View).",
    "",
    "### Turlari",
    "- **Oddiy:** `class UserController extends Controller`.",
    "- **Single action:** `__invoke` (bitta vazifa).",
    "- **Resource:** `index`, `create`, `store`, `show`, `edit`, `update`, `destroy` (`make:controller --resource`).",
    "- **API resource:** `create`/`edit`siz (`--api`).",
    "- Nested: `Route::resource('posts.comments', ...)`, `->shallow()`.",
    "",
    "### Dependency injection",
    "Konstruktor (butun controller uchun) va **metod parametrlari** (`store(StorePostRequest $r, CreatePost $action)`). Container avtomatik beradi.",
    "",
    "### Qaytariladigan javoblar",
    "`view()`, `response()->json()`, `redirect()`, `JsonResource`, `abort()`. Massiv/Eloquent model avtomatik JSON.",
    "",
    "### Qoidalar",
    "1. Controller ichida biznes mantiq va query'lar yo'q (fat controller — anti-pattern).",
    "2. Validatsiya `FormRequest`da, ruxsat `Policy`da.",
    "3. Bir metod — bir vazifa.",
    "4. API'da `JsonResource`.",
    "5. Middleware controller'da `HasMiddleware` (L11+).",
    "",
    "### Laravel 11+",
    "Bazaviy `Controller` bo'sh abstract klass; middleware/`authorize` trait'lari yo'q (aniq chaqiring: `Gate::authorize()`)."
  ],
  "examples": [
    {
      "title": "Yupqa controller",
      "lang": "php",
      "code": [
        "final class PostController extends Controller",
        "{",
        "    public function store(StorePostRequest $request, CreatePost $create): PostResource",
        "    {",
        "        $post = $create($request->user(), $request->validated());",
        "        return new PostResource($post);",
        "    }",
        "",
        "    public function destroy(Post $post): Response",
        "    {",
        "        Gate::authorize('delete', $post);",
        "        $post->delete();",
        "        return response()->noContent();",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Controller ichida murakkab mantiq va ko'p query — fat controller: Action/Service klassga chiqaring.",
    "`$request->all()` ni to'g'ridan `create()` ga berish mass assignment xavfi: `validated()`.",
    "Resource marshrutlarda ruxsat tekshirishni unutish (IDOR).",
    "Konstruktorda ko'p servis kiritish controller ko'p ish qilayotganini ko'rsatadi."
  ]
});
