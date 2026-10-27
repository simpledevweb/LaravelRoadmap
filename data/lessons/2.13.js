/* Chuqur dars: 2.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.13", {
  "lesson": [
    "### Form Request",
    "Validatsiya va ruxsat mantig'ini **alohida klassga** chiqaradi: `php artisan make:request StorePostRequest`. Controller yupqa qoladi: `store(StorePostRequest $request)` — validatsiya controller ishga tushishidan **oldin** bajariladi.",
    "",
    "### Metodlar",
    "- `authorize(): bool` — foydalanuvchi bu amalni bajara oladimi (`false` → 403). `Gate::allows`/policy.",
    "- `rules(): array` — qoidalar.",
    "- `messages()`, `attributes()` — xabar va nomlar.",
    "- `prepareForValidation()` — tekshirishdan oldin kiritmani tayyorlash (`merge(['slug' => Str::slug(...)])`).",
    "- `passedValidation()` — tekshiruvdan keyin.",
    "- `after(): array` — qo'shimcha tekshiruvlar (L10+).",
    "",
    "### Natija",
    "`$request->validated()` (faqat tekshirilgan), `$request->safe()->only([...])`.",
    "",
    "### Route parametriga kirish",
    "`$this->route('post')` yoki `$this->post` (model binding), `rules()` ichida `Rule::unique('posts')->ignore($this->post)`.",
    "",
    "### Qayta ishlatish",
    "Create va Update uchun alohida yoki bitta + `$this->isMethod('PUT')` mantiqi.",
    "",
    "### API javobi",
    "Xato 422 JSON; maxsus javob uchun `failedValidation()`.",
    "",
    "### Foydasi",
    "SRP, qayta ishlatish, test (alohida), controller qisqa."
  ],
  "examples": [
    {
      "title": "FormRequest",
      "lang": "php",
      "code": [
        "final class StorePostRequest extends FormRequest",
        "{",
        "    public function authorize(): bool { return $this->user()->can('create', Post::class); }",
        "",
        "    protected function prepareForValidation(): void { $this->merge(['slug' => Str::slug($this->title)]); }",
        "",
        "    public function rules(): array",
        "    {",
        "        return ['title' => ['required', 'string', 'max:200'], 'slug' => ['required', Rule::unique('posts')], 'body' => ['required']];",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`authorize()` ni `true` qoldirib ruxsatni unutish: policy ishlating.",
    "`validated()` o'rniga `all()` ishlatish maqsadni yo'qotadi.",
    "`rules()` ichida DB so'rovlarini ko'p qilish validatsiyani sekinlashtiradi.",
    "Create va Update'da `unique` ignore farqini unutish update'ni buzadi."
  ]
});
