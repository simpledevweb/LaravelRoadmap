/* Chuqur dars: 13.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.4", {
  "lesson": [
    "### Mass assignment muammosi",
    "Mass assignment — massivdan bir vaqtda ko'p atributni belgilash: `User::create($request->all())`. Xavfi: foydalanuvchi formaga kutilmagan maydon qo'shib yuborishi mumkin (`is_admin=1`, `balance=999999`, `role_id=1`). Agar model hamma maydonni qabul qilsa, bu maydon DB'ga yoziladi. Bu klassik zaiflik (OWASP: Mass Assignment).",
    "",
    "### $fillable — oq ro'yxat",
    "`protected $fillable = ['name', 'email', 'password'];` — faqat shu maydonlar `create()`, `fill()`, `update()` orqali belgilanadi. Qolganlari **jim tashlab yuboriladi** (default). Bu eng xavfsiz yondashuv: yangi ustun qo'shilganda u avtomatik ochilmaydi.",
    "",
    "### $guarded — qora ro'yxat",
    "`protected $guarded = ['id', 'is_admin'];` — shulardan tashqari hammasi ochiq. `$guarded = []` mass assignment himoyasini butunlay o'chiradi. Bu faqat har doim validatsiyadan o'tgan ma'lumot (`$request->validated()`) berilsa xavfsiz.",
    "",
    "Laravel bitta modelda ikkalasini birga ishlatishni tavsiya qilmaydi. Bittasini tanlang.",
    "",
    "### Himoyani chetlab o'tish",
    "- To'g'ridan-to'g'ri belgilash himoyalanmaydi: `$user->is_admin = true; $user->save();`. Bu tizim ichidagi ishonchli kod uchun to'g'ri yo'l.",
    "- `forceFill([...])` va `Model::unguarded(fn () => ...)`: himoyani vaqtincha o'chirish (seeder, import).",
    "- `forceCreate([...])`.",
    "",
    "### Jim tashlab yuborish muammosi",
    "Default'da `$fillable` da yo'q maydon xatosiz tashlab yuboriladi. Dasturchi yangi ustun qo'shib, `$fillable` ga yozishni unutsa, ma'lumot yo'qoladi va xato ko'rinmaydi. `Model::preventSilentlyDiscardingAttributes()` (yoki `shouldBeStrict`) development'da exception beradi.",
    "",
    "### Eng yaxshi amaliyot",
    "Himoya ikki qatlamli bo'lishi kerak:",
    "1. **FormRequest validatsiyasi** va `$request->validated()` yoki `$request->safe()->only([...])`. Hech qachon `$request->all()` ni modelga bermang.",
    "2. Model'da `$fillable`: ikkinchi himoya chizig'i.",
    "",
    "Huquqqa bog'liq maydonlarni (`role`, `status`, `approved_at`) umuman fillable qilmang. Ularni alohida, avtorizatsiya qilingan kod yo'lida belgilang: `$user->role = $request->role` faqat `Gate::authorize('change-role')` dan keyin."
  ],
  "examples": [
    {
      "title": "Zaiflik va uning yechimi",
      "lang": "php",
      "code": [
        "// XAVFLI: $guarded = [] va $request->all()",
        "// POST /profile  name=Ali&is_admin=1",
        "$request->user()->update($request->all());",
        "",
        "// XAVFSIZ",
        "class UpdateProfileRequest extends FormRequest",
        "{",
        "    public function rules(): array",
        "    {",
        "        return ['name' => ['required', 'string', 'max:100'], 'phone' => ['nullable', 'string']];",
        "    }",
        "}",
        "",
        "public function update(UpdateProfileRequest $request)",
        "{",
        "    $request->user()->update($request->validated());",
        "}"
      ]
    },
    {
      "title": "Model va ishonchli kod yo'li",
      "lang": "php",
      "code": [
        "class User extends Authenticatable",
        "{",
        "    protected $fillable = ['name', 'email', 'phone', 'password'];",
        "}",
        "",
        "// Admin rolni o'zgartiradi: aniq va avtorizatsiyalangan",
        "Gate::authorize('manage-roles');",
        "$user->role = $request->validated('role');",
        "$user->save();",
        "",
        "// Seeder",
        "User::unguarded(fn () => User::create(['name' => 'Admin', 'email' => 'a@x.uz', 'is_admin' => true, 'password' => bcrypt('secret')]));"
      ]
    }
  ],
  "pitfalls": [
    "`$guarded = []` bilan `$request->all()` ni birga ishlatish: privilege escalation zaifligi.",
    "Yangi ustunni `$fillable` ga yozishni unutish: ma'lumot xatosiz yo'qoladi. Dev'da `preventSilentlyDiscardingAttributes` yoqing.",
    "`is_admin`, `balance`, `status` kabi maydonlarni qulaylik uchun fillable qilish.",
    "`$fillable` bor deb validatsiyani o'tkazib yuborish: tur, uzunlik va biznes qoidalari tekshirilmaydi."
  ]
});
