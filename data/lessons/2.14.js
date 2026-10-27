/* Chuqur dars: 2.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.14", {
  "lesson": [
    "### Authorization va Authentication",
    "- **Authentication:** siz kimsiz? (login).",
    "- **Authorization:** sizga nima ruxsat? (huquqlar).",
    "",
    "### Ikki vosita",
    "- **Gate:** oddiy closure qoidalar (`Gate::define('admin', fn (User $u) => $u->is_admin)`), model bilan bog'liq bo'lmagan umumiy ruxsatlar.",
    "- **Policy:** model bo'yicha klass (`PostPolicy`), CRUD amallar uchun.",
    "",
    "### Tekshirish usullari",
    "- `Gate::allows('x')`, `Gate::denies()`, `Gate::authorize('x', $model)` (403 tashlaydi).",
    "- Controller: `$this->authorize` (L11+ da `Gate::authorize`).",
    "- Model: `$user->can('update', $post)`, `cannot()`.",
    "- Route: `->middleware('can:update,post')`.",
    "- Blade: `@can('update', $post) ... @endcan`.",
    "",
    "### Ruxsat va rol",
    "Laravel o'zi rol tizimi bermaydi: `spatie/laravel-permission` yoki o'zingizning `role` ustuni + Gate'lar.",
    "",
    "### Qoidalar",
    "1. **Default deny:** ruxsat berilmagan hamma narsa taqiqlangan.",
    "2. Server tomonda doim tekshiring (UI'da yashirish yetarli emas).",
    "3. Resource egaligini tekshiring (IDOR): foydalanuvchi faqat o'zining yozuvini.",
    "4. `Gate::before` super-admin uchun.",
    "",
    "### Javoblar",
    "`Response::deny('sabab')`, `Response::allow()`, `denyAsNotFound()` (403 o'rniga 404).",
    "",
    "### Test",
    "`$this->actingAs($user)->get(...)->assertForbidden()`."
  ],
  "examples": [
    {
      "title": "Gate va tekshirish",
      "lang": "php",
      "code": [
        "Gate::define('manage-users', fn (User $u) => $u->role === 'admin');",
        "",
        "Gate::authorize('manage-users');                 // 403 tashlaydi",
        "if ($request->user()->can('update', $post)) { /* ... */ }",
        "@can('update', $post) <button>Tahrirlash</button> @endcan"
      ]
    }
  ],
  "pitfalls": [
    "UI'da tugmani yashirish xavfsizlik emas: serverda ham tekshiring.",
    "Egalikni tekshirmaslik (IDOR): `/posts/5` ni boshqa foydalanuvchi ochishi mumkin.",
    "Ruxsat qoidalarini controller ichida `if` bilan yozish: Policy/Gate.",
    "Default allow: yangi amal qo'shilganda ruxsat bermay qo'ymang."
  ]
});
