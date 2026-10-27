/* Chuqur dars: 2.23. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.23", {
  "lesson": [
    "### Lokalizatsiya",
    "Matnlarni tillar bo'yicha boshqarish. Fayllar `lang/` papkasida (L11+ da `php artisan lang:publish` bilan chiqariladi).",
    "",
    "### Ikki formati",
    "- **PHP fayl:** `lang/uz/messages.php` → `__('messages.welcome')`.",
    "- **JSON:** `lang/uz.json`: kalit — inglizcha matn: `__('Welcome')` (kichik loyihada qulay).",
    "",
    "### Funksiyalar",
    "`__('key')`, `trans('key')`, `@lang('key')` (Blade), `trans_choice('messages.apples', $n)` (ko'plik), `Lang::get()`.",
    "Placeholder: `'welcome' => 'Salom, :name!'` → `__('messages.welcome', ['name' => $u->name])`.",
    "",
    "### Ko'plik",
    "`'apples' => '{0} olma yo\\'q|{1} bitta olma|[2,*] :count ta olma'`.",
    "",
    "### Tilni o'rnatish",
    "`App::setLocale('uz')`, `config('app.locale')`, `fallback_locale`. Middleware: URL prefiksi (`/uz/...`), foydalanuvchi sozlamasi yoki `Accept-Language` bo'yicha tanlash.",
    "",
    "### Carbon va validatsiya",
    "`Carbon::setLocale('uz')` (sana nomlari), validatsiya xabarlari `lang/uz/validation.php`. Laravel Lang paketi (`laravel-lang/lang`) tayyor tarjimalar beradi.",
    "",
    "### Qoidalar",
    "- Hardcoded matn o'rniga kalit.",
    "- Ko'plik va jins qoidalariga e'tibor (o'zbek ko'pligi: sondan keyin birlik).",
    "- `app.locale` ni so'rov oxirida tiklash (Octane: `scoped` locale).",
    "- Sana/pul formatini `NumberFormatter`/Carbon bilan.",
    "",
    "### Test",
    "Tilga bog'liq javoblarni `App::setLocale()` bilan tekshiring."
  ],
  "examples": [
    {
      "title": "Lokalizatsiya",
      "lang": "php",
      "code": [
        "// lang/uz/messages.php",
        "return ['welcome' => 'Salom, :name!', 'apples' => '{0} olma yo\\'q|{1} bitta olma|[2,*] :count ta olma'];",
        "",
        "App::setLocale('uz');",
        "echo __('messages.welcome', ['name' => 'Ali']);",
        "echo trans_choice('messages.apples', 5);"
      ]
    }
  ],
  "pitfalls": [
    "Matnni kodga yozib qo'yish (hardcode) keyin tarjima qilishni qiyinlashtiradi.",
    "`setLocale` Octane'da keyingi so'rovga o'tib ketishi mumkin: har so'rovda o'rnating.",
    "Tarjima kaliti topilmasa kalitning o'zi ko'rinadi: `fallback_locale` va testlar.",
    "Ko'plik qoidalari tilga qarab farq qiladi: `trans_choice` ni ishlating."
  ]
});
