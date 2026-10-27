/* Chuqur dars: 5.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.14", {
  "lesson": [
    "### Chain of Responsibility",
    "**Chain of Responsibility** — so'rov **zanjir** bo'ylab ishlov beruvchilar (handler) orasida o'tadi; har biri uni qayta ishlaydi yoki keyingisiga uzatadi. Jo'natuvchi qaysi handler ishlashini bilmaydi.",
    "",
    "### Tuzilma",
    "`Handler`: `handle($request)`; har handler `next` ga havola saqlaydi. Handler: (a) o'zi ishlaydi va to'xtaydi, (b) o'zgartirib uzatadi, yoki (c) rad etadi.",
    "",
    "### Qachon",
    "- Ketma-ket tekshiruvlar/filtrlar (autentifikatsiya → ruxsat → rate limit → validatsiya).",
    "- Bir nechta ishlov beruvchidan qaysi biri javob berishi oldindan ma'lum emas.",
    "- Ishlov beruvchilar ro'yxati dinamik.",
    "",
    "### Laravel'da",
    "- **Middleware pipeline** — klassik misol (`Illuminate\\Pipeline\\Pipeline`).",
    "- `Pipeline::send($obj)->through([A::class, B::class])->then(fn ($o) => ...)`.",
    "- Job middleware, Http client middleware (Guzzle).",
    "- PSR-15 middleware.",
    "",
    "### Foydasi",
    "Bo'shashgan bog'lanish, handler qo'shish/olib tashlash oson (OCP), har biri bitta vazifa (SRP), tartibni konfiguratsiya qilish.",
    "",
    "### Ehtiyot",
    "- Hech kim ishlamasa (zanjir oxiri): default javob/xato.",
    "- Tartib muhim: noto'g'ri tartib xavfsizlikka ta'sir qiladi.",
    "- Debug qiyin: har handler'ni loglang.",
    "- Juda uzun zanjir sekin."
  ],
  "examples": [
    {
      "title": "Pipeline",
      "lang": "php",
      "code": [
        "use Illuminate\\Pipeline\\Pipeline;",
        "",
        "$result = app(Pipeline::class)",
        "    ->send($order)",
        "    ->through([ValidateStock::class, ApplyDiscount::class, CalculateTax::class])",
        "    ->then(fn (Order $o) => $o);",
        "",
        "final class ApplyDiscount { public function handle(Order $o, \\Closure $next) { $o->discount = 10; return $next($o); } }"
      ]
    }
  ],
  "pitfalls": [
    "Zanjir tartibi xavfsizlik uchun muhim: autentifikatsiya ruxsat tekshiruvidan oldin.",
    "Hech bir handler javob bermasa default xatti-harakat bo'lmasa so'rov yo'qoladi.",
    "Uzun zanjirda debug qiyin: har handler'ni loglang.",
    "Handler ichida `$next` ni chaqirishni unutish zanjirni uzadi."
  ]
});
