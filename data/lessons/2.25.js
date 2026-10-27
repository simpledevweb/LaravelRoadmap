/* Chuqur dars: 2.25. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.25", {
  "lesson": [
    "### API Resources",
    "Eloquent modelni JSON'ga aylantirishning **transformatsiya qatlami**: ichki DB tuzilmasi va API javobi ajratiladi. `php artisan make:resource UserResource`.",
    "",
    "### JsonResource",
    "```php",
    "public function toArray(Request $request): array",
    "{",
    "    return ['id' => $this->id, 'name' => $this->name, 'posts' => PostResource::collection($this->whenLoaded('posts'))];",
    "}",
    "```",
    "Qaytarish: `return new UserResource($user);`. Wrapper: `{\"data\": {...}}` (o'chirish: `JsonResource::withoutWrapping()`).",
    "",
    "### Kolleksiya",
    "`UserResource::collection($users)` yoki `make:resource UserCollection` (qo'shimcha meta). Pagination bilan `links` va `meta` avtomatik.",
    "",
    "### Shartli maydonlar",
    "`$this->when($cond, value)`, `whenLoaded('relation')` (N+1'siz), `whenCounted`, `whenPivotLoaded`, `mergeWhen()`.",
    "",
    "### Qo'shimcha",
    "`->additional(['meta' => ...])`, `->response()->setStatusCode(201)`, header qo'shish.",
    "",
    "### Nega kerak",
    "- Parol/ichki maydon tasodifan chiqmaydi.",
    "- API shartnomasi barqaror (DB o'zgarsa javob o'zgarmaydi).",
    "- Versiyalash (`V1\\UserResource`).",
    "- Format bir joyda.",
    "",
    "### Eager loading",
    "Resource'da `whenLoaded` ishlating, controller'da `with()` bilan yuklang: aks holda N+1.",
    "",
    "### Test",
    "`assertJson(['data' => ['id' => 1]])`, `assertJsonStructure`."
  ],
  "examples": [
    {
      "title": "Resource",
      "lang": "php",
      "code": [
        "final class PostResource extends JsonResource",
        "{",
        "    public function toArray(Request $request): array",
        "    {",
        "        return [",
        "            'id' => $this->id, 'title' => $this->title,",
        "            'author' => new UserResource($this->whenLoaded('author')),",
        "            'comments_count' => $this->whenCounted('comments'),",
        "            'draft' => $this->when($request->user()?->isEditor(), $this->is_draft),",
        "            'created_at' => $this->created_at->toIso8601String(),",
        "        ];",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Munosabatni `whenLoaded`siz chaqirish har element uchun N+1 so'rov beradi.",
    "Modelni to'g'ridan JSON qaytarish parol/ichki maydonlarni oshkor qilishi mumkin.",
    "`data` wrapper'ni o'zgartirish mijoz kodini buzadi: versiyalang.",
    "Resource ichida og'ir hisob/so'rov kolleksiyada ko'p marta takrorlanadi."
  ]
});
