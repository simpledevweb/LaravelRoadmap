/* Chuqur dars: 2.31. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.31", {
  "lesson": [
    "### Concurrency (L11.23+)",
    "Bir nechta vazifani **bir vaqtda** bajarish: `Concurrency::run([...])` closure'larni **alohida jarayonlarda** parallel ishga tushiradi va natijalarni tartib bilan qaytaradi.",
    "```php",
    "[$users, $orders] = Concurrency::run([fn () => User::count(), fn () => Order::count()]);",
    "```",
    "- Driver: `process` (default), `fork` (PCNTL), `sync` (test).",
    "- `Concurrency::defer([...])` — javob yuborilgandan **keyin** fon'da bajaradi.",
    "- Closure'lar serializatsiya qilinadi: ichida katta obyekt/resurs (DB ulanishi) uzatmang; har jarayon o'z ulanishini ochadi.",
    "- Foydasi: bir nechta mustaqil og'ir so'rov/API chaqiruvini qisqartirish.",
    "",
    "### Cheklovlar",
    "Jarayon yaratish narxi bor (kichik vazifada foyda yo'q); tranzaksiya/holat jarayonlar orasida umumiy emas; xatolar birinchisida to'xtatadi.",
    "",
    "### Application Context (L11+)",
    "**Context** — so'rov/job davomida **ma'lumot bo'lishish** vositasi: `Context::add('trace_id', $id)`, `Context::get()`, `Context::has()`, `Context::push()`, `Context::hidden()` (logga tushmaydi).",
    "- Context **log yozuvlariga avtomatik** qo'shiladi.",
    "- Queue'ga yuborilgan job'larga **avtomatik uzatiladi** (serializatsiya bilan): tracing uchun ideal.",
    "- Odatda middleware'da `request_id`, `user_id`, `tenant_id` qo'shiladi.",
    "",
    "### Context vs boshqalar",
    "Global holat/session emas; so'rovga bog'langan, Octane xavfsiz (har so'rovda tozalanadi).",
    "",
    "### Qoidalar",
    "- Context'ga katta ma'lumot qo'ymang.",
    "- Maxfiy qiymat uchun `hidden`.",
    "- Concurrency'ni haqiqiy parallel bo'lishi mumkin bo'lgan, mustaqil vazifalar uchun ishlating."
  ],
  "examples": [
    {
      "title": "Concurrency va Context",
      "lang": "php",
      "code": [
        "[$stats, $rates] = Concurrency::run([",
        "    fn () => DB::table('orders')->whereDate('created_at', today())->count(),",
        "    fn () => Http::get('https://api.example.com/rates')->json(),",
        "]);",
        "",
        "// Middleware'da",
        "Context::add('request_id', (string) Str::uuid());",
        "Context::addHidden('api_token', $token);      // loglarga tushmaydi",
        "Log::info('Buyurtma');                         // request_id avtomatik qo'shiladi"
      ]
    }
  ],
  "pitfalls": [
    "Closure ichida katta obyekt yoki DB resursini uzatish serializatsiyada xato beradi.",
    "Kichik vazifada parallel jarayon yaratish narxi foydadan ko'p.",
    "Context'ga maxfiy qiymatni oddiy `add` bilan qo'yish loglarga tushadi: `hidden`.",
    "`Concurrency::run` xatosi butun natijani to'xtatadi: xatolarni boshqaring."
  ]
});
