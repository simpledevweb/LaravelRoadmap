/* 30 · Test-Driven Development (TDD)
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 30,
  slug: "test-driven-development-tdd",
  title: "Test-Driven Development (TDD)",
  group: "testing",
  description: "Test-Driven Development — avval muvaffaqiyatsiz test yozish, keyin uni o'tkazadigan minimal kod, so'ng refactoring. TDD faqat testlash usuli emas, balki dizayn texnikasi: u kichik qadamlar, aniq talablar va testlanadigan arxitekturani majburlaydi. Senior dasturchi TDD'ni qachon qo'llash foydali ekanini va uni dogmaga aylantirmaslikni biladi.",
  subskills: [
    {
      id: "30.1",
      title: "Red–Green–Refactor Cycle",
      description: [
        "TDD sikli: **Red** — kutilgan xatti-harakatni ifodalovchi va hozir muvaffaqiyatsiz bo'lgan test; **Green** — testni o'tkazadigan eng sodda kod (hatto \"aldov\" bo'lsa ham); **Refactor** — testlar yashil holda kodni (va testni) tozalash: takrorlanish, nomlar, tuzilma.",
        "",
        "Sikl qisqa (daqiqalar) bo'lishi kerak. Har bir qadamning maqsadi bor: Red — talabni aniqlashtiradi va test haqiqatan xatoni ushlay olishini isbotlaydi; Green — tez fikr-mulohaza; Refactor — dizayn sifati. Refactor bosqichini o'tkazib yuborish — TDD'ning eng ko'p uchraydigan xatosi.",
        "",
        "```text",
        "🔴 it('charges 15 000 shipping under 100 000') → yiqildi (class yo'q)",
        "🟢 return Money::uzs(15_000);                    → o'tdi",
        "🔵 konstanta, nom, tuzilma                       → yashil",
        "🔴 it('is free from 100 000')                    → keyingi sikl",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kichik funksiyani (masalan, yetkazish narxi) qat'iy Red–Green–Refactor sikllari bilan yozing va har bosqichni commit qiling.",
      acceptanceCriteria: [
        "Har bir bosqichning maqsadini tushuntira oladi",
        "Refactor bosqichini tashlab ketmaydi"
      ],
      prerequisites: [
        "27.2"
      ]
    },
    {
      id: "30.2",
      title: "Writing Failing Tests First",
      description: [
        "Avval yiqiladigan test yozish: testni kod yo'qligida yozish talabni aniq ifodalashga majbur qiladi (\"aynan nima kutilyapti?\") va API'ni iste'molchi nuqtai nazaridan loyihalashga yordam beradi. Testning yiqilishini ko'rish — test haqiqatan ishlashini isbotlaydi (hech qachon yiqilmagan test hech narsani tekshirmasligi mumkin).",
        "",
        "To'g'ri sabab bilan yiqilishi kerak: sintaksis xatosi yoki noto'g'ri setup emas, balki kutilgan xatti-harakat yo'qligi. Bitta testda bitta yangi xatti-harakat.",
        "",
        "```php",
        "it('rejects coupon after expiration date', function () {",
        "    $coupon = new Coupon('SALE10', expiresAt: new DateTimeImmutable('2025-05-31'));",
        "    expect($coupon->isValidAt(new DateTimeImmutable('2025-06-01')))->toBeFalse();",
        "});",
        "// Birinchi ishga tushirish: \"Class Coupon not found\" → keyin \"expected false, got true\" — to'g'ri qizil",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yangi biznes qoida uchun avval testni yozing va u to'g'ri sabab bilan yiqilganini tasdiqlang.",
      acceptanceCriteria: [
        "Testni kodsiz yozib, talabni aniqlashtiradi",
        "\"To'g'ri sabab bilan qizil\" tushunchasini biladi"
      ],
      prerequisites: [
        "30.1"
      ]
    },
    {
      id: "30.3",
      title: "Minimal Implementation",
      description: [
        "Green bosqichida — testni o'tkazadigan **eng sodda** kod: kelajakdagi talablar uchun umumlashtirmaslik, \"fake it till you make it\" (avval qattiq kodlangan qiymat), keyingi testlar umumlashtirishga majbur qiladi (**triangulation**). Bu YAGNI'ni amalda qo'llaydi va ortiqcha kodning oldini oladi.",
        "",
        "Minimal ≠ yomon: refactor bosqichida kod tozalanadi. Muhim — har bir qator kod biror test tomonidan talab qilingan bo'lsin.",
        "",
        "```php",
        "// 1-test: 50 000 → 15 000",
        "public function costFor(Money $subtotal): Money { return Money::uzs(15_000); }",
        "",
        "// 2-test: 120 000 → 0 (triangulation majburlaydi)",
        "public function costFor(Money $subtotal): Money",
        "{",
        "    return $subtotal->gte(Money::uzs(100_000)) ? Money::uzs(0) : Money::uzs(15_000);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Triangulation usuli bilan funksiyani bir nechta test orqali bosqichma-bosqich umumlashtiring.",
      acceptanceCriteria: [
        "\"Fake it\" va triangulation usullarini biladi",
        "Test talab qilmagan kodni yozmaydi"
      ],
      prerequisites: [
        "30.2"
      ]
    },
    {
      id: "30.4",
      title: "Refactoring Safely",
      description: [
        "TDD'da refactoring testlar yashil bo'lganda va faqat yashil holatda qilinadi: kichik qadam → testlar → keyingi qadam. Testlar xatti-harakatni qotirgan, shuning uchun tuzilmani dadil o'zgartirish mumkin.",
        "",
        "Nimani refactor qilish: takrorlanish (kod va test o'rtasida ham — qattiq kodlangan qiymatlar), nomlar, uzun metodlar, ma'lumot tuzilmasi, testlarning o'zi (o'qiluvchanlik). Refactoring paytida yangi xatti-harakat qo'shilmaydi — buning uchun yangi Red kerak.",
        "",
        "```text",
        "🟢 yashil → Extract Method → testlar 🟢 → Rename → 🟢 → Introduce Value Object → 🟢 → commit",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "TDD bilan yozilgan modulda 3 ta refactoring qadamini har biridan keyin testlar bilan bajaring.",
      acceptanceCriteria: [
        "Refactoring'ni faqat yashil holatda qiladi",
        "Refactoring va yangi xatti-harakatni aralashtirmaydi"
      ],
      prerequisites: [
        "6.15"
      ]
    },
    {
      id: "30.5",
      title: "Testable Architecture",
      description: [
        "TDD testlanadigan arxitekturaga majburlaydi: kichik class'lar, aniq dependency'lar (DI), sof funksiyalar, tashqi chegaralar interfeys ortida, biznes mantiq framework'dan ajratilgan, global holat yo'q. Agar test yozish qiyin bo'lsa — bu dizaynning fikr-mulohazasi.",
        "",
        "Laravel'da: biznes mantiq Action/Service/Domain class'larida, controller yupqa, facade'lar va `now()` chegarada, tashqi servislar adapter orqali. Shunda domen tez unit testlar bilan, chegaralar esa feature/integratsion testlar bilan qoplanadi.",
        "",
        "```php",
        "// Testlanadigan: barcha dependency'lar aniq",
        "final class PlaceOrder",
        "{",
        "    public function __construct(",
        "        private OrderRepository $orders,",
        "        private Inventory $inventory,",
        "        private ClockInterface $clock,",
        "    ) {}",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Testlash qiyin bo'lgan modulni TDD yordamida testlanadigan arxitekturaga qayta loyihalang.",
      acceptanceCriteria: [
        "Testlash qiyinligini dizayn signali sifatida o'qiydi",
        "Testlanadigan tuzilmani loyihalaydi"
      ],
      prerequisites: [
        "27.5"
      ]
    },
    {
      id: "30.6",
      title: "Unit vs Feature TDD",
      description: [
        "TDD turli darajalarda: **unit TDD** — domen class'larini kichik sikllar bilan qurish (tez fikr-mulohaza, dizaynga kuchli ta'sir); **feature TDD** — avval HTTP darajasidagi test (endpoint xatti-harakati), keyin uni qondiradigan kod. Laravel'da feature TDD juda samarali: testlar tez va foydalanuvchi talabini to'g'ridan-to'g'ri ifodalaydi.",
        "",
        "Amaliy kombinatsiya: feature test bilan boshlash (tashqi xatti-harakat), murakkab mantiq paydo bo'lganda unit TDD'ga \"tushish\", so'ng feature testga qaytish.",
        "",
        "```php",
        "// Feature darajasida boshlash",
        "it('lets a customer apply a coupon to cart', function () {",
        "    $this->actingAs($customer)->postJson('/api/cart/coupon', ['code' => 'SALE10'])",
        "        ->assertOk()->assertJsonPath('data.discount', 10_000);",
        "});",
        "// → murakkab chegirma qoidalari uchun CouponPolicy unit TDD",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Yangi endpoint'ni feature test bilan boshlab, murakkab qismi uchun unit TDD'ga o'ting.",
      acceptanceCriteria: [
        "Unit va feature TDD'ning afzalliklarini biladi",
        "Darajalar o'rtasida o'tishni qo'llaydi"
      ],
      prerequisites: [
        "30.1"
      ]
    },
    {
      id: "30.7",
      title: "Outside-In TDD",
      description: [
        "Outside-In (London maktabi, \"mockist\") — tashqi qatlamdan (acceptance/feature test) boshlab ichkariga qarab borish: har qatlamda hali mavjud bo'lmagan hamkorlar mock qilinadi va ularning interfeysi \"kashf qilinadi\"; keyin har bir hamkor o'z navbatida TDD bilan amalga oshiriladi.",
        "",
        "Afzalliklari: faqat kerakli kod yoziladi, interfeyslar iste'molchi ehtiyojidan kelib chiqadi. Xavflari: ko'p mock va implementatsiyaga bog'langan testlar. Double loop TDD: tashqi acceptance test qizil turadi, ichki unit sikllar uni yashilga olib boradi.",
        "",
        "```text",
        "Acceptance test (qizil) → Controller (mock: PlaceOrder) → PlaceOrder (mock: Inventory)",
        "→ Inventory implementatsiyasi → ... → Acceptance test yashil",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Bitta funksiyani outside-in usulida, double loop bilan amalga oshiring va mock'lar sonini tahlil qiling.",
      acceptanceCriteria: [
        "Outside-in va double loop'ni tushuntira oladi",
        "Mock'lar orqali interfeys kashf qilishni biladi"
      ],
      prerequisites: [
        "30.6"
      ]
    },
    {
      id: "30.8",
      title: "Inside-Out TDD",
      description: [
        "Inside-Out (Detroit/klassik maktab) — eng ichki, mustaqil domen bloklaridan (value object, entity, sof mantiq) boshlab, ularni birlashtirib tashqariga chiqish. Haqiqiy hamkorlar ishlatiladi, mock kam.",
        "",
        "Afzalliklari: barqaror testlar (implementatsiyaga kam bog'liq), domen modeli puxta. Xavflari: kerak bo'lmagan kodni yozish (tashqi talab hali aniq emas), integratsiya kech sinaladi. Ko'p tajribali dasturchilar ikkala yondashuvni vaziyatga qarab aralashtiradi: noaniq domen — outside-in, murakkab algoritm — inside-out.",
        "",
        "```text",
        "Money → LineItem → Cart (haqiqiy hamkorlar bilan) → CheckoutService → Controller",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Bir funksiyani inside-out va outside-in bilan yozib, testlar barqarorligi va kod hajmini solishtiring.",
      acceptanceCriteria: [
        "Ikki maktab farqini va murosalarini biladi",
        "Vaziyatga qarab yondashuv tanlaydi"
      ],
      prerequisites: [
        "30.7"
      ]
    },
    {
      id: "30.9",
      title: "Acceptance Criteria",
      description: [
        "Qabul mezonlari — user story \"tayyor\" hisoblanishi uchun aniq, tekshiriladigan shartlar. Yaxshi mezonlar Given–When–Then shaklida yozilishi mumkin va to'g'ridan-to'g'ri testlarga aylanadi (ATDD/BDD). Ular biznes, QA va dasturchi o'rtasida umumiy tushunchani shakllantiradi.",
        "",
        "Mezonlar: kuzatiladigan natija, chekka holatlar, xato holatlari, ruxsatlar. Noaniq mezonlar (\"tez ishlashi kerak\") — o'lchanadigan qilib aniqlashtiriladi (\"p95 < 300 ms\").",
        "",
        "```gherkin",
        "Given foydalanuvchi savatida 120 000 so'mlik mahsulot bor",
        "When u yetkazib berishni tanlaydi",
        "Then yetkazish narxi 0 so'm bo'ladi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bitta user story uchun Given–When–Then qabul mezonlarini yozing va ularni feature testlarga aylantiring.",
      acceptanceCriteria: [
        "Tekshiriladigan qabul mezonlarini yoza oladi",
        "Mezonlardan testlarni chiqaradi"
      ],
      prerequisites: [
        "78.6"
      ]
    },
    {
      id: "30.10",
      title: "Regression Prevention",
      description: [
        "Regressiya — avval ishlagan narsaning yangi o'zgarishdan keyin buzilishi. TDD va testlar to'plami regressiyaga qarshi xavfsizlik to'ri: har o'zgarishdan keyin barcha testlar.",
        "",
        "Qoida: har bir topilgan bug uchun avval uni qayta yaratuvchi yiqiladigan test, keyin tuzatish — shunda bug qaytmaydi. CI'da testlar majburiy (merge'dan oldin), muhim oqimlar uchun smoke testlar deploy'dan keyin.",
        "",
        "```php",
        "// Bug #1287: kabisa yilida obuna muddati noto'g'ri hisoblangan",
        "it('extends yearly subscription correctly from Feb 29', function () {",
        "    $sub = Subscription::startingAt('2024-02-29', period: 'yearly');",
        "    expect($sub->endsAt()->toDateString())->toBe('2025-02-28');",
        "});",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Oxirgi 3 ta bug uchun avval yiqiladigan regressiya testlarini yozing, keyin tuzating.",
      acceptanceCriteria: [
        "Bug tuzatishni testdan boshlaydi",
        "Regressiya testlarini CI'da majburiy qiladi"
      ],
      prerequisites: [
        "30.2"
      ]
    },
    {
      id: "30.11",
      title: "Test Design",
      description: [
        "Yaxshi test dizayni: bitta xatti-harakat; aniq nom; AAA; minimal setup; deterministik; tez; implementatsiyaga emas, xatti-harakatga bog'langan; o'qiladigan (testlar — hujjat). Test kodi ham refactoring talab qiladi — builder'lar, yordamchilar, custom expectation'lar.",
        "",
        "Test \"hidlari\": juda ko'p assertion turli narsalarni tekshiradi, shartli mantiq (`if`) testda, sehrli raqamlar, mock'lar zanjiri, testlar bir-biriga bog'liq, sekin testlar, ishlatilmagan setup.",
        "",
        "```php",
        "// ❌ testda mantiq",
        "foreach ($cases as $c) { if ($c['vip']) { ... } }",
        "// ✅ dataset + bitta xatti-harakat",
        "it('applies vip discount', fn ($subtotal, $expected) => ...)->with('vip cases');",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir test faylini test \"hidlari\" bo'yicha review qilib, eng muhim 3 tasini tuzating.",
      acceptanceCriteria: [
        "Test dizayni tamoyillarini biladi",
        "Test hidlarini taniydi"
      ],
      prerequisites: [
        "27.12"
      ]
    },
    {
      id: "30.12",
      title: "Avoiding Test-Driven Overengineering",
      description: [
        "TDD'ni noto'g'ri qo'llash ham zarar beradi: har bir class uchun interfeys va mock (testlash uchun keraksiz abstraksiya), private metodlarni test qilish uchun public qilish, trivial kodga (getter, konfiguratsiya) test, coverage uchun testlar, mock'larga bog'langan va har refactoring'da sinadigan testlar.",
        "",
        "Muvozanat: TDD — vosita, dogma emas. Murakkab biznes mantiq, algoritmlar, bug tuzatish — TDD juda foydali; prototip, UI tajribalari, trivial CRUD — keyin test yozish yoki feature test yetarli. Abstraksiyani test emas, real o'zgarish o'qi talab qilsin.",
        "",
        "```text",
        "TDD foydali: hisob-kitob, holat mashinasi, parser, bug tuzatish",
        "TDD ortiqcha: prototip, oddiy CRUD, konfiguratsiya, getter/setter",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihada faqat testlash uchun yaratilgan keraksiz interfeys yoki mock'larni toping va soddalashtiring.",
      acceptanceCriteria: [
        "TDD'ni qachon qo'llash va qachon qo'llamaslikni biladi",
        "Testlash uchun keraksiz abstraksiya yaratmaydi"
      ],
      prerequisites: [
        "5.20",
        "27.11"
      ]
    }
  ]
});
