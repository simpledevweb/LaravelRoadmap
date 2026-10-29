/* Chuqur dars: 28.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.10", {
  "lesson": [
    "### Murosa nimada",
    "Dependency'ni haqiqiy ishlatish yoki mock qilish — har biri o'z narxiga ega. **Haqiqiy** dependency ishonchli: u haqiqiy xatti-harakatni ko'rsatadi, lekin sekin, sozlash qiyin va ba'zan beqaror. **Mock** tez va nazorat ostida, lekin haqiqatdan farq qilishi va **yolg'on ishonch** berishi mumkin: test yashil, production qizil.",
    "",
    "### Qaror qoidasi",
    "Quyidagi savollarni bering:",
    "- U **o'zimning nazoratimdami**? Ha: DB, Redis, fayl tizimi. Konteynerda tez va deterministik ko'tariladi, **haqiqiysini ishlating**.",
    "- U **pullik, sekin yoki beqarormi**? To'lov shlyuzi, SMS provayder, uchinchi tomon API. **Fake/mock** ishlating, lekin adapter'ni sandbox bilan kam sonli testda tasdiqlang.",
    "- U **tasodifiy yoki vaqtga bog'liqmi**? Soat, tasodifiy sonlar, UUID. Nazorat ostidagi qiymat bering (`Carbon::setTestNow`, fake generator).",
    "- **Test qilinayotgan narsaning o'zimi**? Hech qachon mock qilmang.",
    "",
    "### \"Sizga tegishli bo'lmagan narsani mock qilmang\"",
    "Mock qilish uchun eng yaxshi chegara — sizning **o'zingiz belgilagan interfeys**. Uchinchi tomon kutubxona klassini to'g'ridan-to'g'ri mock qilsangiz, uning ichki xatti-harakati haqidagi taxminingiz kodga qotadi va kutubxona yangilanganda test ma'nosiz bo'ladi. Buning o'rniga ingichka adapter yozing (`PaymentGateway`), uni mock qiling, adapter'ning o'zini esa haqiqiy yoki sandbox bilan tekshiring.",
    "",
    "### Mock nimani yashiradi",
    "Mock'ni siz yozasiz, demak u sizning taxminingizni takrorlaydi. Agar taxmin noto'g'ri bo'lsa (masalan, API xato holatida boshqa format qaytaradi), mock bu xatoni tuzatmaydi. Shuning uchun mock bilan yozilgan har bir muhim kelishuv bir marta haqiqiy tizim bilan tasdiqlanishi kerak.",
    "",
    "### Fake va mock farqi",
    "Fake — soddalashtirilgan lekin ishlaydigan amalga oshirish (in-memory repository). Mock — chaqiruvlarni kutish va tekshirish. Fake ko'pincha yaxshiroq: u xatti-harakatga qaraydi, ichki chaqiruvlar tartibiga emas, refactoring paytida testni kamroq buzadi."
  ],
  "examples": [
    {
      "title": "Nima haqiqiy, nima fake",
      "lang": "text",
      "code": [
        "MySQL, Redis, fayl tizimi  -> haqiqiy (Docker / service container)",
        "Payme, Eskiz, Google Maps  -> Http::fake + kam sonli sandbox contract test",
        "Vaqt                       -> Carbon::setTestNow(...)",
        "Tasodifiy/UUID             -> nazorat ostidagi generator",
        "O'zingiz yozgan adapter    -> haqiqiy tizim bilan tekshiriladi, domen uni fake bilan ishlatadi"
      ],
      "note": "Qaror infratuzilma egaligiga va tezligiga qarab olinadi."
    },
    {
      "title": "O'z interfeysingizni fake qilish",
      "lang": "php",
      "code": [
        "interface Clock { public function now(): CarbonImmutable; }",
        "",
        "final class FrozenClock implements Clock",
        "{",
        "    public function __construct(private CarbonImmutable $now) {}",
        "    public function now(): CarbonImmutable { return $this->now; }",
        "}",
        "",
        "it('expires a coupon after its end date', function () {",
        "    $clock = new FrozenClock(CarbonImmutable::parse('2026-01-10'));",
        "    $coupon = new Coupon(endsAt: CarbonImmutable::parse('2026-01-09'));",
        "",
        "    expect($coupon->isActive($clock))->toBeFalse();",
        "});"
      ],
      "note": "Vaqt interfeysi orqali beriladi, shuning uchun soatni qotirish oson."
    }
  ],
  "pitfalls": [
    "Hamma narsani mock qilish: test faqat sizning taxminingizni tasdiqlaydi, haqiqiy xatti-harakatni emas.",
    "Uchinchi tomon klassini to'g'ridan-to'g'ri mock qilish: kutubxona yangilanganda test ma'nosiz bo'lib qoladi.",
    "Mock'larni hech qachon haqiqiy tizim bilan tasdiqlamaslik: noto'g'ri taxmin ko'p vaqtgacha sezilmaydi.",
    "Tez ishlaydigan DB va Redis'ni mock qilish: ular konteynerda arzon, mock esa ularning haqiqiy xatolarini yashiradi."
  ]
});
