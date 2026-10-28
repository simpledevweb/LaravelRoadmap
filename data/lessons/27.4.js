/* Chuqur dars: 27.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.4", {
  "lesson": [
    "### Izolyatsiyaning ikki ma'nosi",
    "1. **Testlar bir-biridan izolyatsiyalangan** (25.14): tartib, parallel ishga tushirish va takrorlash natijani o'zgartirmaydi.",
    "2. **Unit tashqi dunyodan izolyatsiyalangan:** DB, fayl tizimi, tarmoq, vaqt, tasodifiylik, global holat va framework'dan.",
    "",
    "Unit test ikkalasini ham bajarishi kerak.",
    "",
    "### Tashqi dunyodan izolyatsiya qilish",
    "- **DB:** domen mantiqini Eloquent'dan ajratish yoki repository interfeysi + xotiradagi fake (`InMemoryOrderRepository`).",
    "- **Vaqt:** `Clock` interfeysi yoki vaqtni parametr sifatida berish (25.11). Laravel'da `now()` ni ishlatsangiz — `Carbon::setTestNow()`, lekin bu framework'ga bog'liqlik.",
    "- **Tasodifiylik:** `RandomGenerator` interfeysi yoki seed bilan generator.",
    "- **Tarmoq:** interfeys ortidagi adapter (27.6).",
    "- **Konfiguratsiya:** `config()` o'rniga qiymatlarni konstruktor orqali.",
    "- **Fayl tizimi:** fayl yo'li o'rniga kontent yoki stream.",
    "",
    "### Global holat",
    "Statik xususiyatlar, singleton'lar, `$_SERVER`, `date_default_timezone_set` — ular testlar orasida oqadi. Kodda ulardan qochish eng yaxshi himoya.",
    "",
    "### Framework'siz test",
    "Laravel loyihasida unit test `PHPUnit\\Framework\\TestCase` (Pest'da `Tests\\TestCase` ga ulanmagan `tests/Unit`) dan meros. Natija: framework yuklanmaydi, test millisekundlarda. Agar test container yoki facade talab qilsa — bu signal: yoki u feature test, yoki kod bog'liqliklarini aniq qabul qilishi kerak (27.5).",
    "",
    "### Izolyatsiya darajasi — muvozanat",
    "Hamma narsani izolyatsiya qilish (har hamkorni mock) — London maktabi va ortiqcha mock xavfi (27.11). Domen ichidagi hamkor klasslar haqiqiy bo'lishi mumkin: ular tez va deterministik. Faqat **sekin, nodeterministik yoki yon ta'sirli** narsalar izolyatsiya qilinadi."
  ],
  "examples": [
    {
      "title": "Clock interfeysi bilan izolyatsiya",
      "lang": "php",
      "code": [
        "interface Clock { public function now(): DateTimeImmutable; }",
        "",
        "final class SystemClock implements Clock",
        "{",
        "    public function now(): DateTimeImmutable { return new DateTimeImmutable(); }",
        "}",
        "",
        "final class FixedClock implements Clock",
        "{",
        "    public function __construct(private DateTimeImmutable $at) {}",
        "    public function now(): DateTimeImmutable { return $this->at; }",
        "}",
        "",
        "final class CouponValidator",
        "{",
        "    public function __construct(private Clock $clock) {}",
        "",
        "    public function isValid(Coupon $c): bool",
        "    {",
        "        return $c->expiresAt > $this->clock->now();",
        "    }",
        "}",
        "",
        "it('rejects coupon one second after expiry', function () {",
        "    $validator = new CouponValidator(new FixedClock(new DateTimeImmutable('2025-07-01 00:00:01')));",
        "",
        "    expect($validator->isValid(new Coupon(expiresAt: new DateTimeImmutable('2025-07-01 00:00:00'))))->toBeFalse();",
        "});"
      ],
      "note": "Laravel'da `$this->app->bind(Clock::class, SystemClock::class)` bilan production implementatsiyasi ulanadi. Symfony'ning `symfony/clock` (PSR-20 `ClockInterface`) tayyor variant."
    }
  ],
  "pitfalls": [
    "Unit testda `now()`, `rand()` yoki `config()` ga to'g'ridan-to'g'ri tayanish.",
    "Domen ichidagi har hamkorni ham mock qilish.",
    "Unit testni framework'ga ulab, keraksiz yuklash bilan sekinlashtirish.",
    "Statik holatni kodda saqlab, testlar orasida oqishiga yo'l qo'yish."
  ]
});
