/* Chuqur dars: 13.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.3", {
  "lesson": [
    "### Mass Assignment nima",
    "Mass assignment: massivdan bir vaqtda ko'p maydonni modelga yozish (`User::create($data)`, `$user->update($data)`, `fill()`). Agar `$data` foydalanuvchi so'rovidan to'g'ridan-to'g'ri kelsa, hujumchi qo'shimcha maydon yuborishi mumkin: `is_admin=1`, `role=admin`, `email_verified_at=...`.",
    "",
    "### Himoya: fillable va guarded",
    "- `$fillable` (oq ro'yxat): faqat shu ustunlar mass assignment bilan yoziladi. Tavsiya etiladigan yo'l.",
    "- `$guarded` (qora ro'yxat): shu ustunlar yozilmaydi, qolganlari ruxsat. `$guarded = []` hamma ustunni ochadi, shuning uchun xavfli.",
    "",
    "Eloquent ruxsat etilmagan maydonni **jimgina tashlab yuboradi**. Shu sababli `Model::shouldBeStrict()` yoki `preventSilentlyDiscardingAttributes()` development da exception beradi va xatoni darhol ko'rsatadi.",
    "",
    "### To'g'ri ma'lumot manbai",
    "`$request->all()` o'rniga validatsiyadan o'tgan ma'lumotni uzating: `$request->validated()` (Form Request) yoki `$request->only([...])`. Shunda ikki qatlamli himoya bo'ladi: validatsiya nima kelishi mumkinligini, `$fillable` esa nima yozilishi mumkinligini cheklaydi.",
    "",
    "### Ishonchli kod uchun",
    "Ba'zan modelga cheklovsiz yozish kerak (seeder, admin paneli, ichki jarayon). Buning uchun `forceFill()` ishlatiladi. U faqat **ishonchli** manbadan kelgan ma'lumotga qo'llanadi, hech qachon xom so'rovga emas."
  ],
  "examples": [
    {
      "title": "Zaif va xavfsiz variant",
      "lang": "php",
      "code": [
        "// Zaif: hujumchi is_admin=1 yuboradi",
        "class User extends Model",
        "{",
        "    protected $guarded = [];",
        "}",
        "User::create($request->all());",
        "",
        "// Xavfsiz",
        "class User extends Model",
        "{",
        "    protected $fillable = ['name', 'email', 'password'];",
        "}",
        "User::create($request->validated());"
      ]
    },
    {
      "title": "Form Request bilan",
      "lang": "php",
      "code": [
        "class RegisterRequest extends FormRequest",
        "{",
        "    public function rules(): array",
        "    {",
        "        return [",
        "            'name'     => ['required', 'string', 'max:100'],",
        "            'email'    => ['required', 'email', 'unique:users'],",
        "            'password' => ['required', 'min:8', 'confirmed'],",
        "        ];",
        "    }",
        "}",
        "",
        "public function store(RegisterRequest $request)",
        "{",
        "    return User::create($request->validated());",
        "}"
      ]
    },
    {
      "title": "Strict rejim va forceFill",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot()",
        "Model::shouldBeStrict(! app()->isProduction());",
        "",
        "// Faqat ishonchli joyda (admin paneli, seeder)",
        "$user->forceFill(['is_admin' => true])->save();"
      ]
    }
  ],
  "pitfalls": [
    "`$guarded = []` yozib, `$request->all()` bilan `create()` chaqirish: eng keng tarqalgan zaiflik.",
    "Seeder'da `Model::unguard()` ni chaqirib, uni qaytarib `reguard()` qilmaslik: himoya o'chib qoladi.",
    "`role`, `is_admin`, `balance` kabi nozik ustunlarni `$fillable` ga qo'shib yuborish: ular alohida, ruxsat tekshiriladigan joydan o'zgarishi kerak.",
    "Faqat `$fillable` ga ishonib validatsiyani tashlab ketish: noto'g'ri tip va uzunlikdagi qiymatlar bazaga o'tadi."
  ]
});
