/* Chuqur dars: 2.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.15", {
  "lesson": [
    "### Policy",
    "Bitta model uchun avtorizatsiya klassi: `php artisan make:policy PostPolicy --model=Post`. Metodlar: `viewAny`, `view`, `create`, `update`, `delete`, `restore`, `forceDelete`. Birinchi parametr — foydalanuvchi, ikkinchisi — model.",
    "",
    "### Ro'yxatga olish",
    "L8+ **auto-discovery**: `Post` → `App\\Policies\\PostPolicy` avtomatik. Aks holda `Gate::policy(Post::class, PostPolicy::class)`.",
    "",
    "### Ishlatish",
    "`Gate::authorize('update', $post)`, `$user->can('update', $post)`, `->middleware('can:update,post')`, `@can('update', $post)`, `Route::resource` + `authorizeResource` (L11 da `HasMiddleware`).",
    "Model'siz amallar: `Gate::authorize('create', Post::class)`.",
    "",
    "### Qoidalar",
    "- Policy metodi `bool` yoki `Response` (`Response::deny('...')`).",
    "- Mehmon (login qilmagan) uchun `?User $user` (nullable).",
    "- `before(User $u, string $ability)`: super-admin uchun `true`, aks holda `null` (davom ettirish).",
    "- Murakkab qoidalarda DB so'rovlarini ko'paytirmang (N+1).",
    "",
    "### Gate'dan farqi",
    "Gate — oddiy qoida/closure; Policy — model atrofida guruhlangan, aniq nomlangan metodlar.",
    "",
    "### Nested/shared",
    "Bog'liq resurs uchun parent'ni tekshiring (`$comment->post`). Scoped binding bilan birga.",
    "",
    "### Test",
    "`PostPolicy` ni unit test qiling yoki `actingAs()` bilan Feature test."
  ],
  "examples": [
    {
      "title": "PostPolicy",
      "lang": "php",
      "code": [
        "final class PostPolicy",
        "{",
        "    public function before(User $user): ?bool { return $user->isSuperAdmin() ? true : null; }",
        "",
        "    public function update(User $user, Post $post): bool { return $user->id === $post->user_id; }",
        "",
        "    public function delete(User $user, Post $post): Response",
        "    {",
        "        return $user->id === $post->user_id ? Response::allow() : Response::deny('Faqat muallif o\\'chira oladi');",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`before` da `false` qaytarish ruxsatni umuman yopadi: davom ettirish uchun `null`.",
    "Mehmon (guest) uchun `?User` tipini unutish 403/xato beradi.",
    "Policy ichida og'ir so'rovlar N+1 hosil qiladi.",
    "Resource marshrutda authorize qo'ymaslik IDOR zaifligini qoldiradi."
  ]
});
