/* Chuqur dars: 8.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.10", {
  "lesson": [
    "### PSR-20: Clock",
    "Vaqtni olish uchun interface: `Psr\\Clock\\ClockInterface::now(): \\DateTimeImmutable`. Kod `new DateTime()`/`time()`/`now()` ni to'g'ridan chaqirmaydi, balki Clock'dan oladi.",
    "",
    "### Nima uchun",
    "- **Testlanuvchanlik:** vaqtga bog'liq mantiq (muddat tugashi, kutish) deterministik testlanadi: `FrozenClock`.",
    "- **Yashirin bog'liqlik yo'q:** vaqt aniq kiritiladi (explicit dependency).",
    "- **Vaqt zonasi va manba:** bitta joyda boshqariladi.",
    "",
    "### Implementatsiyalar",
    "`symfony/clock` (`NativeClock`, `MockClock`), `lcobucci/clock` (`SystemClock`, `FrozenClock`), `stella-maris/clock`. O'zingiz ham yozish mumkin:",
    "```php",
    "final class SystemClock implements ClockInterface { public function now(): DateTimeImmutable { return new DateTimeImmutable(); } }",
    "```",
    "",
    "### Qoida",
    "`DateTimeImmutable` qaytadi (mutable emas). Bazaga yozishda UTC, ko'rsatishda lokal zona.",
    "",
    "### Laravel'da",
    "Laravel/Carbon: `now()`, `Carbon::setTestNow()`, `$this->travelTo()`, `freezeTime()`. Bu ham vaqtni muzlatadi, lekin global holat (statik). PSR-20 `ClockInterface` ni container'ga bog'lab (`Clock` → Carbon/Symfony Clock), domen kodini Laravel'dan mustaqil qilish mumkin.",
    "",
    "### Ehtiyot",
    "Statik `now()` ichkarida — yashirin bog'liqlik. `Carbon::setTestNow` testdan keyin tozalang (`Carbon::setTestNow()`), aks holda boshqa testlarga ta'sir qiladi."
  ],
  "examples": [
    {
      "title": "Clock bilan muddat tekshiruvi",
      "lang": "php",
      "code": [
        "use Psr\\Clock\\ClockInterface;",
        "",
        "final class Subscription",
        "{",
        "    public function __construct(private DateTimeImmutable $expiresAt) {}",
        "    public function isActive(ClockInterface $clock): bool { return $clock->now() < $this->expiresAt; }",
        "}",
        "",
        "// test",
        "$clock = new \\Symfony\\Component\\Clock\\MockClock('2025-06-01 12:00:00');",
        "$sub = new Subscription(new DateTimeImmutable('2025-06-02'));",
        "assert($sub->isActive($clock) === true);",
        "$clock->sleep(86400 * 2);",
        "assert($sub->isActive($clock) === false);"
      ]
    }
  ],
  "pitfalls": [
    "`now()`/`new DateTime()` ichkarida chaqirish testni deterministik emas qiladi.",
    "`Carbon::setTestNow()` tozalanmasa boshqa testlarga ta'sir qiladi.",
    "`DateTime` (mutable) qaytarish yon ta'sir beradi: `DateTimeImmutable`.",
    "Timezone'ni aralashtirish: saqlashda UTC, ko'rsatishda lokal."
  ]
});
