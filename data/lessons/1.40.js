/* Chuqur dars: 1.40. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.40", {
  "lesson": [
    "### Fiber nima",
    "PHP 8.1 `Fiber` — to'xtatib (`Fiber::suspend()`) va qayta davom ettirish (`$fiber->resume()`) mumkin bo'lgan **stackful** korutin. Generator esa **stackless**: faqat o'z funksiyasida `yield` qiladi; Fiber istalgan chuqurlikdagi chaqiruvdan to'xtay oladi, shuning uchun oddiy funksiyalar ichida ham kutish mumkin (\"funksiya ranglari\" muammosi yo'q).",
    "",
    "### API",
    "`new Fiber(callable)`, `start(...$args)`, `resume($v)`, `throw($e)`, `getReturn()`, `isStarted/isSuspended/isRunning/isTerminated`, `Fiber::getCurrent()`. `suspend($v)` qiymati `start/resume` natijasi bo'ladi, `resume($x)` esa `suspend()` ning qaytishi.",
    "",
    "### Muhim: parallelizm emas",
    "Fiber bitta oqimda **kooperativ** almashinuv beradi, ya'ni ikkita Fiber bir vaqtda ishlamaydi. Foyda faqat I/O kutayotgan paytda boshqasiga o'tishdan (non-blocking I/O). Buning uchun **event loop** kerak: **Revolt**, Amp v3, ReactPHP 3.",
    "",
    "### Haqiqiy parallellik",
    "- Bir nechta jarayon: queue worker'lar, `pcntl_fork`, Symfony Process, `Concurrency::run` (Laravel).",
    "- Swoole/OpenSwoole coroutine'lari (o'z runtime).",
    "- `ext-parallel` (ZTS PHP kerak).",
    "- `Http::pool()`: Guzzle async orqali parallel HTTP.",
    "",
    "### Qayerda ishlatiladi",
    "Kutubxona/framework darajasida (Amp, Revolt, Octane ichki). Oddiy web ilovada Fiber'ni to'g'ridan-to'g'ri yozish kamdan-kam kerak: queue va `Http::pool` yetarli.",
    "",
    "### Cheklovlar",
    "Fiber ichidagi chuqur stack xotira oladi; exception Fiber chegarasidan o'tadi (`resume` dan chiqadi); `Fiber` ichida `exit` butun jarayonni to'xtatadi; generator bilan aralashtirmang.",
    "",
    "### Fiber API tafsiloti",
    "- `new Fiber(callable $fn)`; `start(mixed ...$args): mixed` birinchi `suspend` qiymatini (yoki tugasa `null`) qaytaradi.",
    "- `Fiber::suspend(mixed $v = null): mixed` — joriy Fiber'ni to'xtatadi; `resume($x)` shu chaqiruvning natijasi sifatida `$x` ni beradi.",
    "- `resume`, `throw(Throwable)`, `getReturn()`, `isStarted/isSuspended/isRunning/isTerminated`, `Fiber::getCurrent()`.",
    "- Fiber ichida istalgan chuqurlikdagi funksiyadan `Fiber::suspend()` chaqirish mumkin.",
    "- `FiberError`: tugagan Fiber'ni resume qilish, ishga tushmagan Fiber'ni suspend qilish va h.k.",
    "",
    "### Event loop va asinxron kutubxonalar",
    "- Revolt (`revolt/event-loop`): Fiber-asosli standart event loop; `EventLoop::delay`, `EventLoop::onReadable`, `defer`, `suspension` (`$s = EventLoop::getSuspension(); $s->suspend()`).",
    "- **Amp v3:** Revolt ustida async I/O (`async()`, `await()`, HTTP, MySQL klientlari).",
    "- **ReactPHP:** promise va Fiber qo'llab-quvvatlashi.",
    "- **Swoole/OpenSwoole:** o'z korutinlari (`Co\\run`, `go`).",
    "- Laravel Octane (Swoole, RoadRunner, FrankenPHP): so'rovlarni concurrency bilan; `Octane::concurrently([...])` (Swoole).",
    "",
    "### Fiber vs Generator vs Thread",
    "| | Generator | Fiber | Thread/jarayon |",
    "|---|---|---|---|",
    "| To'xtash | faqat o'z funksiyasida | istalgan chuqurlik | OS rejalashtiradi |",
    "| Parallel | yo'q | yo'q | ha |",
    "| Stack | yo'q (stackless) | alohida stack | alohida |",
    "| Xotira | kichik | ko'proq (stack) | eng ko'p |",
    "| Almashinuv | kooperativ | kooperativ | preemptiv |",
    "",
    "### Jarayon asosli parallellik (PHP)",
    "- `pcntl_fork` (CLI, POSIX), signal'lar, `posix_*`.",
    "- Symfony Process (`Process::start()`, `wait()`).",
    "- Laravel: `Concurrency::run/defer` (alohida jarayonlar), `Http::pool`, `Bus::batch`, `queue`.",
    "- Spatie `async`, parallel (`ext-parallel`, ZTS, thread bilan, kam ishlatiladi).",
    "",
    "### Qachon Fiber",
    "Kutubxona/framework mualliflari uchun (async I/O), custom scheduler, \"sinxron ko'rinishdagi\" async kod. Oddiy CRUD ilovada kerak emas: queue yoki `Http::pool` yetarli.",
    "",
    "### Xavflar",
    "- Blocking funksiya butun loop'ni to'xtatadi.",
    "- Fiber ichida exception tashqariga `resume`/`start` dan chiqadi.",
    "- Tugallanmagan Fiber'lar xotirani ushlab turadi (destruct paytida `finally` bajariladi).",
    "- Global holat (static) fiber'lar orasida umumiy: race kabi muammolar mantiqiy.",
    "- Xdebug va profilerlar fiber stack'larida cheklangan bo'lishi mumkin."
  ],
  "examples": [
    {
      "title": "Asosiy oqim",
      "lang": "php",
      "code": [
        "$fiber = new Fiber(function (string $name): string {",
        "    $x = Fiber::suspend(\"salom, $name\");",
        "    echo \"olindi: $x\\n\";",
        "    return 'tugadi';",
        "});",
        "",
        "echo $fiber->start('Ali'), \"\\n\";      // salom, Ali",
        "$fiber->resume('ma\\'lumot');          // olindi: ma'lumot",
        "echo $fiber->getReturn();             // tugadi"
      ]
    },
    {
      "title": "Oddiy scheduler",
      "lang": "php",
      "code": [
        "function task(string $n, int $steps): Fiber",
        "{",
        "    return new Fiber(function () use ($n, $steps) {",
        "        for ($i = 1; $i <= $steps; $i++) { echo \"$n:$i\\n\"; Fiber::suspend(); }",
        "    });",
        "}",
        "$fibers = [task('A', 2), task('B', 3)];",
        "foreach ($fibers as $f) $f->start();",
        "while ($fibers = array_filter($fibers, fn($f) => !$f->isTerminated())) {",
        "    foreach ($fibers as $f) $f->resume();",
        "}"
      ]
    },
    {
      "title": "Laravel parallel",
      "lang": "php",
      "code": [
        "use Illuminate\\Support\\Facades\\{Concurrency, Http};",
        "",
        "[$users, $orders] = Concurrency::run([",
        "    fn () => User::count(),",
        "    fn () => Order::count(),",
        "]);                                  // alohida jarayonlarda",
        "$responses = Http::pool(fn ($p) => [$p->get($a), $p->get($b)]);"
      ]
    },
    {
      "title": "Revolt bilan kutish",
      "lang": "php",
      "code": [
        "use Revolt\\EventLoop;",
        "",
        "$s = EventLoop::getSuspension();",
        "EventLoop::delay(1.0, fn () => $s->resume('tayyor'));",
        "echo $s->suspend();          // 1 soniya kutadi (boshqa callback'lar ishlaydi)"
      ]
    },
    {
      "title": "Fiber exception",
      "lang": "php",
      "code": [
        "$f = new Fiber(function () { try { Fiber::suspend(1); } catch (Exception $e) { echo \"ushlandi: \", $e->getMessage(); } });",
        "$f->start();",
        "$f->throw(new Exception('bekor'));     // suspend nuqtasida exception ko'tariladi"
      ]
    }
  ],
  "pitfalls": [
    "Fiber parallellik bermaydi: ikki `sleep(1)` baribir 2 soniya. Faqat non-blocking I/O + event loop bilan foyda.",
    "Fiber ichida blocking funksiya (`file_get_contents`, `PDO`) butun loop'ni to'xtatadi.",
    "Generator va Fiber aralashmasi xato qilish oson: bitta model tanlang.",
    "Uzoq yashovchi Fiber xotirani ushlab turadi (stack); tugallanmagan Fiber'larni tozalang.",
    "Fiber ichida blocking I/O butun event loop'ni ushlab turadi.",
    "`resume()` tugagan Fiber'ga `FiberError` beradi.",
    "Static/global holat fiber'lar orasida umumiy: mantiqiy race.",
    "Haqiqiy parallelizm kerak bo'lsa jarayonlar/queue."
  ]
});
