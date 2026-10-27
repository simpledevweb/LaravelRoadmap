/* Chuqur dars: 2.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.9", {
  "lesson": [
    "### Facade nima",
    "Facade (`Cache::get()`, `DB::table()`, `Log::info()`) — container'dagi servisga **statik sintaksis** bilan kirish. Aslida statik emas: `Facade::__callStatic()` → `getFacadeAccessor()` nomi bilan servisni container'dan oladi va metodni **instance** da chaqiradi.",
    "",
    "### Qanday ishlaydi",
    "`Illuminate\\Support\\Facades\\Cache` → accessor `'cache'` → container `cache` servisi → `get()` chaqiriladi.",
    "",
    "### Foydasi",
    "Qisqa sintaksis, test uchun `Cache::shouldReceive('get')->andReturn(...)` (Mockery) va `Mail::fake()`, `Queue::fake()`, `Event::fake()`, `Http::fake()`.",
    "",
    "### Kamchiligi",
    "- **Yashirin bog'liqlik:** klass nimaga muhtojligi konstruktordan ko'rinmaydi.",
    "- Statik ko'rinish, lekin global holat emas (container'da).",
    "- IDE tushunishi uchun `ide-helper`/Larastan.",
    "",
    "### Facade vs DI vs helper",
    "Bir xil servisni uch usulda olish mumkin: `Cache::get()`, `cache()->get()`, konstruktorda `Repository $cache`. Servis/domen klasslarida **DI** afzal, controller/route/skriptlarda Facade qulay.",
    "",
    "### Real-time facade",
    "`use Facades\\App\\Services\\Billing;` — istalgan klassni Facade'dek ishlatish (prefiks `Facades\\`).",
    "",
    "### O'z Facade'ingiz",
    "`getFacadeAccessor(): string` qaytaradigan klass; odatda kerak emas.",
    "",
    "### Qoida",
    "Facade'ni to'g'ri ishlating, ortiqcha ishlatmang: ko'p Facade chaqirgan klass — ko'p bog'liqlik belgisi."
  ],
  "examples": [
    {
      "title": "Facade va fake",
      "lang": "php",
      "code": [
        "Cache::put('rates', $rates, 600);",
        "Mail::fake();",
        "(new RegisterUser())->handle($data);",
        "Mail::assertSent(Welcome::class);",
        "",
        "// DI varianti",
        "final class RateService { public function __construct(private \\Illuminate\\Contracts\\Cache\\Repository $cache) {} }"
      ]
    }
  ],
  "pitfalls": [
    "Servis klasslarida ko'p Facade yashirin bog'liqlik: konstruktor DI afzal.",
    "Facade global holat emas, lekin statik ko'rinadi: mock uchun `shouldReceive`/`fake()` ishlating.",
    "Real-time facade'ni haddan ortiq ishlatish bog'liqlikni ko'rinmas qiladi.",
    "`Cache::fake()` yo'q (cache haqiqiy `array` driver bilan sinaladi): har Facade'ning fake'i mavjud emas."
  ]
});
