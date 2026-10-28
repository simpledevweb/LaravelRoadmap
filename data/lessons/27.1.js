/* Chuqur dars: 27.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.1", {
  "lesson": [
    "### \"Unit\" nima",
    "**Unit under test** (SUT — System Under Test) — test aynan tekshirayotgan birlik. Ko'pincha bitta klass yoki funksiya, lekin muhimi o'lcham emas, **xulq-atvor**: bitta tushunarli vazifa, uning kirishi va kutilgan natijasi.",
    "",
    "Ikki maktab:",
    "- **Klassik (Detroit) maktab:** unit — xulq-atvor birligi. Bir nechta haqiqiy hamkor klasslar bilan birga test qilish mumkin, faqat tashqi chegaralar (DB, tarmoq, vaqt) almashtiriladi. Testlar refactoring'ga chidamli.",
    "- **London (mockist) maktabi:** unit — bitta klass, uning barcha hamkorlari mock bilan almashtiriladi. Izolyatsiya maksimal, lekin testlar implementatsiyaga bog'lanadi.",
    "",
    "Amalda ko'p jamoalar klassik yondashuvni afzal ko'radi va mock'ni faqat chegaralar uchun ishlatadi (27.11).",
    "",
    "### SUT'ni aniq belgilash",
    "Har testda bitta asosiy obyekt tekshiriladi. Uni aniq nomlang (`$calculator`, `$policy`, yoki `$sut`) va testdagi boshqa obyektlar — tayyorgarlik (fixture) yoki hamkorlar ekanini ko'rsating.",
    "",
    "### Public API orqali",
    "SUT faqat **public** interfeysi orqali test qilinadi. Private metodlar — implementatsiya detali. Ular public metodlar orqali bilvosita tekshiriladi. Private metodni alohida test qilish zarurati tug'ilsa, ehtimol u alohida klassga ajratilishi kerak (o'z vazifasi bor).",
    "",
    "### Laravel loyihasida unit nomzodlari",
    "Qiymat obyektlari, domen servislari, hisob-kitob va narxlash, holat mashinalari, policy mantiqi (ruxsat qoidalari), formatlovchi va parserlar, enum metodlari. Controller va Eloquent CRUD odatda feature yoki integratsiya testlari bilan (27.15)."
  ],
  "examples": [
    {
      "title": "SUT aniq ko'rinadigan test",
      "lang": "php",
      "code": [
        "it('allows refund within 14 days for paid orders', function () {",
        "    $policy = new RefundPolicy(windowDays: 14);           // SUT",
        "    $order = Orders::paid(paidAt: '2025-06-01 10:00');     // fixture",
        "",
        "    $allowed = $policy->allows($order, now: new DateTimeImmutable('2025-06-14 09:59'));",
        "",
        "    expect($allowed)->toBeTrue();",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Bitta testda bir nechta SUT'ni birga tekshirish: nima buzilgani noaniq.",
    "Private metodlarni reflection bilan test qilish.",
    "Har klass uchun barcha hamkorlarni mock qilib, testlarni implementatsiyaga mixlash.",
    "Controller'larni unit test qilishga urinish: ular feature testlar uchun."
  ]
});
