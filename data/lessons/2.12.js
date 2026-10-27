/* Chuqur dars: 2.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.12", {
  "lesson": [
    "### Validatsiya",
    "`$request->validate([...])` yoki `Validator::make($data, $rules)`. Muvaffaqiyatsiz bo'lsa: web'da redirect `back()` + `$errors` va `old()`, API'da (`Accept: json`) **422** JSON.",
    "",
    "### Qoidalar",
    "Satr (`'required|email|max:255'`) yoki massiv (`['required', 'email', Rule::unique('users')->ignore($id)]`).",
    "Mashhurlari: `required`, `nullable`, `sometimes`, `string`, `integer`, `numeric`, `boolean`, `email`, `url`, `min/max/between`, `in`, `unique`, `exists`, `confirmed`, `date`, `after`, `array`, `file`, `image`, `mimes`, `regex`, `bail`.",
    "",
    "### Ichma-ich va massiv",
    "`'items.*.sku' => 'required|string'`, `'address.city'`.",
    "",
    "### Xabarlar",
    "`messages()` va `attributes()` yoki `lang/` fayllari; o'zbek tili uchun `lang/uz`.",
    "",
    "### Maxsus qoida",
    "`php artisan make:rule`: `ValidationRule::validate($attribute, $value, Closure $fail)`; closure qoida.",
    "",
    "### Natija",
    "`$request->validated()` — faqat tekshirilgan maydonlar (xavfsiz); `safe()->only()/except()`.",
    "",
    "### Shartli",
    "`required_if`, `required_with`, `exclude_if`, `Rule::when()`, `sometimes`.",
    "",
    "### `after()` hook",
    "Murakkab bir nechta maydon tekshiruvi: `$validator->after(function ($v) { ... })`.",
    "",
    "### Xavfsizlik",
    "Hech qachon `unique` da ID'ni o'zingiz yig'masdan, `Rule::unique()->ignore()`; `exists` ni ham tekshiring."
  ],
  "examples": [
    {
      "title": "Validatsiya",
      "lang": "php",
      "code": [
        "$data = $request->validate([",
        "    'email'   => ['required', 'email', Rule::unique('users')->ignore($user->id)],",
        "    'role'    => ['required', Rule::in(['admin', 'editor'])],",
        "    'items'   => ['required', 'array', 'min:1'],",
        "    'items.*.sku' => ['required', 'string', 'exists:products,sku'],",
        "]);"
      ]
    }
  ],
  "pitfalls": [
    "`validated()` o'rniga `all()` bilan saqlash tekshirilmagan maydonlarni o'tkazib yuboradi.",
    "`unique` update'da `ignore` bo'lmasa o'z yozuviga ham xato beradi.",
    "`nullable` va `sometimes` farqini aralashtirish kutilmagan natija beradi.",
    "API'da `Accept: application/json` yuborilmasa 422 o'rniga redirect keladi."
  ]
});
