/* Chuqur dars: 1.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.15", {
  "lesson": [
    "### Throwable iyerarxiyasi",
    "`Throwable` interface'idan ikki shox chiqadi:",
    "- `Error` — dastur/til xatolari (`TypeError`, `ValueError`, `ArithmeticError`, `DivisionByZeroError`). PHP 7 dan ularni `catch` qilsa bo'ladi.",
    "- `Exception` — dastur mantiqi (`RuntimeException`, `InvalidArgumentException`, `DomainException`...).",
    "",
    "Eskirgan Warning/Notice'lar `ErrorException` ga aylantirilishi mumkin (`set_error_handler`). Laravel buni o'zi qiladi.",
    "",
    "### try / catch / finally",
    "- Bir nechta catch, `catch (A | B $e)` — bir nechta tip.",
    "- `finally` — har doim bajariladi (xato bo'lsa ham, `return` bo'lsa ham). `finally` ichida `return` istisnoni yutib yuboradi.",
    "- Qayta tashlash: `throw $e;` yoki o'rash `throw new X('...', 0, $e)` (**previous**) — zanjir saqlanadi.",
    "",
    "### Maxsus istisnolar",
    "Domen xatolari uchun alohida klass: `InsufficientFundsException extends DomainException`. Shunda ushlovchi aniq biladi, xabar matniga qarab ajratish shart bo'lmaydi.",
    "",
    "### Qachon ushlash kerak",
    "Faqat nima qilishni **bilgan** joyda: qayta urinish, fallback, foydalanuvchiga mazmunli javob. Qolganini yuqoriga uzating (global handler). Bo'sh `catch` va `catch (Throwable)` + jim yutish — eng yomon amaliyot.",
    "",
    "### Laravel",
    "`app/Exceptions/Handler` yoki `bootstrap/app.php` `withExceptions`: `report()` (log) va `render()` (javob). `abort(404)`, `renderable` istisnolar, `shouldReport` va `dontReport`. HTTP istisnolari: `HttpException`.",
    "",
    "### Log",
    "Xatoni logga yozing (kontekst bilan), foydalanuvchiga ichki tafsilot ko'rsatmang.",
    "",
    "### PHP 8 dagi xatolar tizimi",
    "",
    "**Throwable daraxti**",
    "```",
    "Throwable",
    "├── Error",
    "│   ├── TypeError (ArgumentCountError, ...)",
    "│   ├── ValueError",
    "│   ├── ArithmeticError (DivisionByZeroError)",
    "│   ├── AssertionError",
    "│   ├── UnhandledMatchError",
    "│   └── FiberError, CompileError (ParseError)",
    "└── Exception",
    "    ├── LogicException (BadFunctionCallException, DomainException, InvalidArgumentException, LengthException, OutOfRangeException)",
    "    ├── RuntimeException (OutOfBoundsException, OverflowException, RangeException, UnderflowException, UnexpectedValueException)",
    "    ├── ErrorException, JsonException, PDOException, ...",
    "```",
    "`LogicException` — dasturchi xatosi (to'g'rilanadi), `RuntimeException` — kutilmagan holat (muhit, ma'lumot).",
    "",
    "**Xato metodlari**",
    "`getMessage()`, `getCode()`, `getPrevious()`, `getFile()`, `getLine()`, `getTrace()`, `getTraceAsString()`. Stack trace parol kabi argumentlarni ko'rsatishi mumkin: `zend.exception_ignore_args=On` (production) va `#[\\SensitiveParameter]`.",
    "",
    "**Eski xatolar (Warning/Notice) va ularni boshqarish**",
    "`set_error_handler()` ularni `ErrorException` ga aylantirishi mumkin (Laravel shunday qiladi). `error_reporting(E_ALL)`, `@` operatori, `trigger_error()`, `error_log()`, `assert()`.",
    "",
    "**Dizayn qoidalari**",
    "1. **Exception — istisno holat uchun**, oqim boshqaruvi uchun emas (masalan `try { ... } catch` bilan `if` o'rniga).",
    "2. **Bir darajada ushlang:** xato qayerda bilinsa o'sha yerda tuzatish mumkin bo'lsa; aks holda yuqoriga o'tkazing.",
    "3. **Kontekst bering:** xabarga ID va qiymatlarni qo'shing, `previous` ni saqlang.",
    "4. **Qaytarish qiymati vs exception:** topilmaslik oddiy → `null`; shartnoma buzildi → exception.",
    "5. **Domen xatolari alohida klass**, umumiy `AppException` ota klass; HTTP javobiga map qilish markazlashtirilgan.",
    "6. **Result/Either pattern:** kutiladigan xato uchun exception o'rniga natija obyekti (`Result::fail('...')`).",
    "",
    "**Retry va idempotentlik**",
    "Vaqtinchalik xatolarda (tarmoq, deadlock) qayta urinish: eksponensial kutish + jitter, idempotent amal. Laravel `retry($times, $callback, $sleepMs)`, queue job'larda `$tries`, `backoff()`, `failed()`.",
    "",
    "**Laravel xatolari**",
    "`app/Exceptions` yoki `bootstrap/app.php` → `withExceptions(fn (Exceptions $e) => ...)`. `report()` log/Sentry; `render()` javob; `Responsable`; `ModelNotFoundException` → 404; `ValidationException` → 422; `AuthorizationException` → 403. `abort()`, `abort_if()`, `throw_if()`, `rescue()`.",
    "",
    "**Logging**",
    "Daraja (debug/info/warning/error/critical), kontekst massivi (`Log::error('x', ['id' => $id])`), PII yozmang, correlation ID."
  ],
  "examples": [
    {
      "title": "Domen istisnosi + previous",
      "lang": "php",
      "code": [
        "final class PaymentFailed extends RuntimeException {}",
        "",
        "function charge(int $amount): void",
        "{",
        "    try {",
        "        $this->client->pay($amount);",
        "    } catch (HttpClientException $e) {",
        "        throw new PaymentFailed('To\\'lov amalga oshmadi', 0, $e);   // previous saqlanadi",
        "    }",
        "}"
      ]
    },
    {
      "title": "finally va multi-catch",
      "lang": "php",
      "code": [
        "try {",
        "    $h = fopen($path, 'r');",
        "    process($h);",
        "} catch (JsonException | ValueError $e) {",
        "    report($e);",
        "    throw $e;",
        "} finally {",
        "    if (isset($h)) fclose($h);",
        "}"
      ]
    },
    {
      "title": "Error vs Exception",
      "lang": "php",
      "code": [
        "try {",
        "    intdiv(1, 0);",
        "} catch (DivisionByZeroError $e) {   // Error, Exception emas",
        "    echo 'nolga bo\\'lish';",
        "}",
        "try { strlen(); } catch (ArgumentCountError $e) {}"
      ]
    },
    {
      "title": "Retry + backoff",
      "lang": "php",
      "code": [
        "function withRetry(callable $fn, int $times = 3, int $baseMs = 100): mixed",
        "{",
        "    for ($i = 1; ; $i++) {",
        "        try { return $fn(); }",
        "        catch (TransientException $e) {",
        "            if ($i >= $times) throw $e;",
        "            usleep(($baseMs * 2 ** ($i - 1) + random_int(0, 50)) * 1000);",
        "        }",
        "    }",
        "}"
      ]
    },
    {
      "title": "Error handler -> exception",
      "lang": "php",
      "code": [
        "set_error_handler(function (int $no, string $str, string $file, int $line) {",
        "    if (!(error_reporting() & $no)) return false;",
        "    throw new ErrorException($str, 0, $no, $file, $line);",
        "});",
        "echo $undefined;     // ErrorException: Undefined variable"
      ]
    },
    {
      "title": "Result pattern",
      "lang": "php",
      "code": [
        "final readonly class Result",
        "{",
        "    private function __construct(public bool $ok, public mixed $value = null, public ?string $error = null) {}",
        "    public static function ok(mixed $v): self { return new self(true, $v); }",
        "    public static function fail(string $e): self { return new self(false, error: $e); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`catch (Exception $e)` `Error` larni (TypeError va h.k.) ushlamaydi; `Throwable` kerak bo'lsa, ongli ravishda ishlating.",
    "`finally` ichida `return`/`throw` asl istisnoni yo'qotadi.",
    "Bo'sh `catch` xatoni jim yutadi: kamida log yozing yoki qayta tashlang. Qayta tashlaganda `previous` ni uzating.",
    "Foydalanuvchiga `$e->getMessage()` ni to'g'ridan-to'g'ri ko'rsatish SQL/yo'l kabi ichki ma'lumotni oshkor qiladi.",
    "`catch (Exception)` `TypeError`/`ValueError` ni ushlamaydi: ular `Error` shoxida.",
    "Exception'ni oqim boshqaruvi uchun ishlatish sekin va o'qilishni yomonlashtiradi.",
    "Stack trace parollarni ochishi mumkin: production'da `zend.exception_ignore_args=On`.",
    "Retry'ni idempotent bo'lmagan amalda (to'lov) ishlatish dublikat yaratadi."
  ]
});
