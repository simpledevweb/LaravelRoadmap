/* Chuqur dars: 26.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.8", {
  "lesson": [
    "### Arxitektura testi nima",
    "Arxitektura testlari kod **xulq-atvorini** emas, **tuzilmasini** tekshiradi: qaysi namespace qaysisiga bog'lanishi mumkin, qaysi klasslar qanday nomlanishi, qaysi funksiyalar umuman ishlatilmasligi kerak. Ular kod kelishuvlarini (\"controller'lar to'g'ridan-to'g'ri DB'ga murojaat qilmaydi\", \"domen Laravel'ga bog'liq emas\") avtomatik qoidaga aylantiradi. Code review'da \"buni boshqa joyga ko'chiring\" degan izohlar o'rniga CI qizil bo'ladi.",
    "",
    "### arch() funksiyasi",
    "`arch('description')->expect('App\\Models')->toExtend(Model::class);`",
    "",
    "Asosiy expectation'lar:",
    "- `toUse(...)` / `not->toUse(...)` — klass yoki funksiyadan foydalanish.",
    "- `toBeUsed()` / `not->toBeUsed()`, `toOnlyBeUsedIn('App\\Http')`.",
    "- `toOnlyUse([...])` — faqat shu bog'liqliklar.",
    "- `toExtend()`, `toImplement()`, `toUseTrait()`.",
    "- `toHaveSuffix('Controller')`, `toHavePrefix()`, `toBeFinal()`, `toBeReadonly()`, `toBeAbstract()`, `toBeEnums()`, `toBeInterfaces()`, `toBeInvokable()`.",
    "- `toHaveMethod()`, `toHaveConstructor()`.",
    "- `toUseStrictTypes()`, `toUseStrictEquality()`.",
    "- `ignoring(...)` — istisnolar.",
    "",
    "### Preset'lar (Pest 3)",
    "Tayyor qoidalar to'plami:",
    "- `arch()->preset()->php()` — `die`, `var_dump`, `eval` va boshqa xavfli yoki debug funksiyalarsiz.",
    "- `arch()->preset()->security()` — `md5`, `sha1`, `rand`, `extract`, `unserialize` va boshqalar ishlatilmaydi.",
    "- `arch()->preset()->laravel()` — Laravel konvensiyalari: controller'lar `Controller` suffiksi bilan va faqat `App\\Http` da, model'lar `Model` dan meros, va hokazo.",
    "- `arch()->preset()->strict()` — hamma joyda `declare(strict_types=1)`, final klasslar, `===`.",
    "- `arch()->preset()->relaxed()`.",
    "",
    "### Odatiy qoidalar",
    "- Debug qoldiqlari yo'q: `expect(['dd', 'dump', 'ray', 'var_dump'])->not->toBeUsed()`.",
    "- Domen qatlami framework'ga bog'liq emas: `expect('App\\Domain')->not->toUse('Illuminate')`.",
    "- `env()` faqat `config/` da: `expect('env')->toOnlyBeUsedIn('config')` (chunki `config:cache` dan keyin `env()` null qaytaradi).",
    "- Controller'lar Eloquent'ga to'g'ridan-to'g'ri murojaat qilmaydi (agar jamoa shunday kelishgan bo'lsa).",
    "- Value object'lar `final readonly`.",
    "",
    "### Cheklovlar",
    "Arch testlari statik tahlilga asoslangan va kod mantiqini tushunmaydi. Ular kelishuvlarni himoya qiladi, dizayn sifatini emas."
  ],
  "examples": [
    {
      "title": "tests/Arch/ArchTest.php",
      "lang": "php",
      "code": [
        "arch('no debug functions')",
        "    ->expect(['dd', 'dump', 'ray', 'var_dump', 'die'])",
        "    ->not->toBeUsed();",
        "",
        "arch('env only in config')",
        "    ->expect('env')",
        "    ->toOnlyBeUsedIn('config');",
        "",
        "arch('domain is framework agnostic')",
        "    ->expect('App\\Domain')",
        "    ->not->toUse(['Illuminate', 'App\\Models', 'App\\Http']);",
        "",
        "arch('value objects are immutable')",
        "    ->expect('App\\Domain\\ValueObjects')",
        "    ->toBeFinal()",
        "    ->toBeReadonly();",
        "",
        "arch()->preset()->laravel();",
        "arch()->preset()->security()->ignoring('App\\Legacy');"
      ]
    }
  ],
  "pitfalls": [
    "Yangi loyihada `strict()` preset'ini darhol yoqib, yuzlab xatolar va jamoa noroziligi: bosqichma-bosqich.",
    "Qoidalarni jamoa bilan kelishmasdan qo'shish.",
    "`ignoring()` bilan istisnolarni ko'paytirib, qoidani ma'nosiz qilish.",
    "Arch testlarini sifat kafolati deb hisoblash: ular faqat tuzilma kelishuvlarini tekshiradi."
  ]
});
