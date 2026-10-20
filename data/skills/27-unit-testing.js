/* 27 · Unit Testing
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 27,
  slug: "unit-testing",
  title: "Unit Testing",
  group: "testing",
  description: "Unit testing — eng kichik kod birliklarini izolyatsiyada, tez va deterministik tekshirish. Yaxshi unit testlar xatolarni darhol ko'rsatadi, refactoring'ga ishonch beradi va kod dizaynini yaxshilaydi: testlash qiyin kod — odatda yomon dizayn belgisi. Senior dasturchi nimani unit test qilish, nimani qilmaslik va qanday qilib testlarni mo'rt bo'lmagan qilishni biladi.",
  subskills: [
    {
      id: "27.1",
      title: "Unit Under Test",
      description: [
        "Unit — testlanayotgan xatti-harakat birligi: odatda bitta class yoki funksiya, ba'zan bir nechta yaqin class (masalan, aggregate va uning value object'lari). \"Klassik\" (Detroit) maktab — unit xatti-harakat, haqiqiy hamkorlar ishlatiladi; \"mockist\" (London) maktab — unit bitta class, barcha hamkorlar mock.",
        "",
        "Amaliy tavsiya: public API orqali xatti-harakatni tekshiring, private metodlarni emas; haqiqiy, tez va deterministik hamkorlarni (value object, sof funksiyalar) mock qilmang; faqat sekin yoki tashqi chegaralarni (DB, HTTP, vaqt) almashtiring.",
        "",
        "```php",
        "// Unit: Cart + LineItem + Money birga — xatti-harakat \"savat jami\"",
        "$cart = new Cart();",
        "$cart->add(new LineItem(sku: 'A1', price: Money::uzs(50_000), qty: 2));",
        "expect($cart->total())->toEqual(Money::uzs(100_000));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta modul uchun \"unit\" chegarasini belgilang va qaysi hamkorlar haqiqiy, qaysilari double bo'lishini asoslang.",
      acceptanceCriteria: [
        "Klassik va mockist yondashuvlar farqini biladi",
        "Private metodlarni emas, public xatti-harakatni testlaydi"
      ],
      prerequisites: [
        "25.11"
      ]
    },
    {
      id: "27.2",
      title: "Arrange–Act–Assert",
      description: [
        "AAA — test tuzilmasi: **Arrange** (holat va dependency'larni tayyorlash), **Act** (bitta amal), **Assert** (natijani tekshirish). Bo'limlar bo'sh qator bilan ajratiladi; Act odatda bitta qator. BDD'dagi Given–When–Then bilan bir xil g'oya.",
        "",
        "Belgilari buzilganda: bir testda bir nechta Act (aslida bir nechta test), Assert'lar Arrange bilan aralashgan, juda katta Arrange (dizayn muammosi yoki builder kerak).",
        "",
        "```php",
        "it('expires pending orders older than 3 days', function () {",
        "    $old = Order::factory()->pending()->create(['created_at' => now()->subDays(4)]);",
        "    $fresh = Order::factory()->pending()->create();",
        "",
        "    app(ExpireOrders::class)->handle();",
        "",
        "    expect($old->fresh()->status)->toBe(OrderStatus::Expired)",
        "        ->and($fresh->fresh()->status)->toBe(OrderStatus::Pending);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "5 ta mavjud testni AAA tuzilmasiga keltiring va bir nechta Act'li testlarni bo'ling.",
      acceptanceCriteria: [
        "AAA bo'limlarini aniq ajratadi",
        "Bir testda bitta xatti-harakatni tekshiradi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "27.3",
      title: "Testing Business Logic",
      description: [
        "Unit testlarning eng katta qiymati — biznes qoidalarini tekshirish: hisob-kitob (narx, soliq, chegirma), holat o'tishlari, validatsiya qoidalari, ruxsat mantiqi, sana hisoblari. Bu kod ko'p o'zgaradi va xatolari qimmat.",
        "",
        "Biznes mantiqni framework'dan ajratish (domen class'lari, action'lar, value object'lar) uni oson unit testlanadigan qiladi. Testlar biznes tilida yozilsa (`it('gives free shipping above 100k')`), ular tirik hujjat vazifasini ham bajaradi.",
        "",
        "```php",
        "it('charges no shipping for orders above 100 000', function () {",
        "    $policy = new ShippingPolicy(freeFrom: Money::uzs(100_000), flat: Money::uzs(15_000));",
        "    expect($policy->costFor(Money::uzs(120_000)))->toEqual(Money::uzs(0));",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Controller ichidagi biznes qoidani alohida class'ga ajratib, uni unit testlar bilan to'liq qamrang.",
      acceptanceCriteria: [
        "Biznes mantiqni framework'dan ajratib testlaydi",
        "Testlarni biznes tilida nomlaydi"
      ],
      prerequisites: [
        "27.1"
      ]
    },
    {
      id: "27.4",
      title: "Isolated Tests",
      description: [
        "Izolyatsiyalangan unit test: DB, tarmoq, fayl tizimi, tizim vaqti va global holatga bog'liq emas; boshqa testlarga bog'liq emas; istalgan tartibda va parallel ishlaydi. Natija: millisekundlarda bajariladi va faqat kod xatosi sabab yiqiladi.",
        "",
        "Izolyatsiya usullari: dependency'larni constructor orqali olish (DI), tashqi chegaralarni interfeys ortiga yashirish, vaqt uchun `ClockInterface`, tasodifiylik uchun inject qilinadigan generator. Laravel facade'lari va `now()` unit testda izolyatsiyani buzadi — ularni chegarada qoldiring.",
        "",
        "```php",
        "final class TokenGenerator",
        "{",
        "    public function __construct(private RandomSource $random, private ClockInterface $clock) {}",
        "}",
        "// Testda: new TokenGenerator(new FixedRandom('abc'), new MockClock('2025-06-01'))",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ichida `now()` va `Str::random()` ishlatilgan class'ni izolyatsiyada testlanadigan qilib qayta loyihalang.",
      acceptanceCriteria: [
        "Izolyatsiyani buzuvchi bog'liqliklarni aniqlaydi",
        "DI orqali testlanadigan dizayn yaratadi"
      ],
      prerequisites: [
        "25.14"
      ]
    },
    {
      id: "27.5",
      title: "Dependency Injection for Testability",
      description: [
        "DI — testlanuvchanlikning asosi: class dependency'larini constructor orqali olsa, testda ularni double bilan almashtirish oson. Aksincha, `new` ichkarida, statik chaqiruvlar, singleton'lar va service locator testni majburan integratsion qiladi.",
        "",
        "\"Testlash qiyin\" — dizayn signali: juda ko'p dependency (SRP buzilishi), yashirin global holat, konkret class'larga bog'liqlik. Laravel container'da binding'larni testda almashtirish: `$this->app->instance()`, `$this->swap()`.",
        "",
        "```php",
        "// ❌ testlash qiyin",
        "public function notify(User $u) { (new TwilioClient(config('...')))->send(...); }",
        "// ✅",
        "public function __construct(private SmsSender $sms) {}",
        "public function notify(User $u) { $this->sms->send($u->phone, '...'); }",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Testlash qiyin bo'lgan class'ni DI bilan qayta yozib, unga double asosidagi unit test qo'shing.",
      acceptanceCriteria: [
        "Testlash qiyinligini dizayn signali sifatida taniydi",
        "Dependency'larni DI orqali almashtiriladigan qiladi"
      ],
      prerequisites: [
        "2.8"
      ]
    },
    {
      id: "27.6",
      title: "Mocking External Dependencies",
      description: [
        "Tashqi bog'liqliklar (to'lov, SMS, email, tashqi API, fayl saqlash) unit testda almashtiriladi: ular sekin, beqaror, pullik va yon ta'sirli. Eng toza yo'l — o'z interfeysingiz (adapter) + testda fake yoki mock; Laravel'da `Http::fake()`, `Storage::fake()`, `Mail::fake()`.",
        "",
        "Tashqi SDK class'larini to'g'ridan-to'g'ri mock qilmang — ular o'zgaradi va testlar yolg'on xavfsizlik beradi; adapter'ning o'zini esa integratsion (yoki contract) test bilan haqiqiy yoki sandbox API'ga qarshi tekshiring.",
        "",
        "```php",
        "$sms = new FakeSmsSender();",
        "$service = new OtpService($sms, new MockClock());",
        "",
        "$service->send(PhoneNumber::of('+998901234567'));",
        "",
        "expect($sms->sent)->toHaveCount(1)",
        "    ->and($sms->sent[0]->text)->toMatch('/^\\d{6}/');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tashqi SMS provayderi uchun adapter interfeysi va test fake'ini yarating, servisni unit testlang.",
      acceptanceCriteria: [
        "Tashqi chegaralarni o'z interfeysi orqali almashtiradi",
        "Adapter'ni alohida integratsion test bilan qoplaydi"
      ],
      prerequisites: [
        "25.7",
        "5.5"
      ]
    },
    {
      id: "27.7",
      title: "Boundary Conditions",
      description: [
        "Xatolar ko'pincha chegaralarda: 0, 1, maksimal, maksimal+1, bo'sh qator/massiv, manfiy son, sana chegarasi (oy oxiri, yil, kabisa yili, soat o'zgarishi), \"dan katta\" va \"dan katta yoki teng\" farqi (off-by-one).",
        "",
        "Usul: **boundary value analysis** — har bir chegaraning ikki tomonini va o'zini tekshirish; **equivalence partitioning** — kirishlarni guruhlarga bo'lib, har biridan bittadan namuna. Data provider/dataset bunga juda mos.",
        "",
        "```php",
        "it('applies discount from exactly 100 000', function (int $subtotal, int $expected) {",
        "    expect((new DiscountPolicy())->discountFor($subtotal))->toBe($expected);",
        "})->with([",
        "    'just below' => [99_999, 0],",
        "    'exactly'    => [100_000, 10_000],",
        "    'above'      => [100_001, 10_000],",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bitta biznes qoidaning barcha chegaralarini aniqlab, ularni dataset bilan testlang.",
      acceptanceCriteria: [
        "Boundary value analysis'ni qo'llaydi",
        "Off-by-one xatolarni testlar bilan ushlaydi"
      ],
      prerequisites: [
        "25.9"
      ]
    },
    {
      id: "27.8",
      title: "Edge Cases",
      description: [
        "Chekka holatlar — kam uchraydigan, lekin real: `null` va bo'sh qiymatlar, Unicode (kirill, o'zbek `ʻ`, emoji), juda katta kirish, dublikatlar, bir vaqtda ikki so'rov, vaqt zonalari, valyuta yaxlitlash, o'chirilgan yoki mavjud bo'lmagan bog'liq yozuvlar, tartib o'zgarishi.",
        "",
        "Manbalar: production xatolari (har bug — regressiya testi), domen ekspertlari bilan suhbat (\"qachon bu ishlamaydi?\"), statik tahlil (nullable tiplar). Property-based testing ko'p chekka holatlarni avtomatik topadi.",
        "",
        "```php",
        "it('handles uzbek apostrophes in names', function () {",
        "    expect(Slug::from(\"Oʻzbekiston gʻalabasi\"))->toBe('ozbekiston-galabasi');",
        "});",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Oxirgi 5 ta production bug uchun regressiya testlari yozing va ularni chekka holatlar ro'yxatiga qo'shing.",
      acceptanceCriteria: [
        "Chekka holatlarning asosiy toifalarini biladi",
        "Har bir bug uchun regressiya testi yozadi"
      ],
      prerequisites: [
        "27.7"
      ]
    },
    {
      id: "27.9",
      title: "Exception Testing",
      description: [
        "Exception'lar ham xatti-harakat — ular testlanadi: noto'g'ri kirishda to'g'ri tipdagi exception, mazmunli xabar, kontekst (`previous`), va exception'dan keyin holat o'zgarmagani (atomiklik).",
        "",
        "Pest: `->throws(InsufficientFunds::class, 'Balans yetarli emas')` yoki `expect(fn () => ...)->toThrow(...)`. \"Exception otilmasligi\" ham ba'zan tekshiriladi (`->not->toThrow()`). Exception tipini tekshiring, faqat `Exception` emas — aks holda noto'g'ri sababdan yiqilgan test ham o'tadi.",
        "",
        "```php",
        "it('does not change balance on failed withdrawal', function () {",
        "    $account = new BankAccount(balance: 100);",
        "    expect(fn () => $account->withdraw(150))->toThrow(InsufficientFunds::class);",
        "    expect($account->balance())->toBe(100);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Domen exception'lari uchun testlar yozing: tip, xabar va exception'dan keyingi holat.",
      acceptanceCriteria: [
        "Aniq exception tipini tekshiradi",
        "Exception'dan keyin holat izchilligini tekshiradi"
      ],
      prerequisites: [
        "25.8"
      ]
    },
    {
      id: "27.10",
      title: "Deterministic Tests",
      description: [
        "Deterministik test har safar bir xil natija beradi. Determinizm dushmanlari: tizim vaqti (`now()`), tasodifiylik (`rand`, `Str::random`, Faker), tartibsiz kolleksiyalar (hash tartibi, `ORDER BY` siz so'rov), parallel jarayonlar, tashqi servislar, locale va vaqt zonasi.",
        "",
        "Yechimlar: vaqtni qotirish (`travelTo`, `Carbon::setTestNow`, `ClockInterface`), Faker seed yoki aniq qiymatlar, `Str::createRandomStringsUsing()`, aniq tartiblash, tashqi servislarni fake qilish, test muhitida qat'iy vaqt zonasi.",
        "",
        "```php",
        "beforeEach(function () {",
        "    $this->travelTo(CarbonImmutable::parse('2025-06-01 09:00', 'Asia/Tashkent'));",
        "    Str::createUuidsUsing(fn () => Uuid::fromString('00000000-0000-0000-0000-000000000001'));",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Vaqt va tasodifiylikka bog'liq testlarni topib, ularni deterministik qiling.",
      acceptanceCriteria: [
        "Determinizmni buzuvchi omillarni biladi",
        "Vaqt va tasodifiylikni testda nazorat qiladi"
      ],
      prerequisites: [
        "27.4"
      ]
    },
    {
      id: "27.11",
      title: "Avoiding Over-Mocking",
      description: [
        "Haddan tashqari mock — testlar implementatsiyaga bog'lanadi: har refactoring testlarni sindiradi (xatti-harakat o'zgarmasa ham), testlar \"kod qanday yozilgan\"ni takrorlaydi, mock'lar haqiqiy xatti-harakatdan farq qilib yolg'on ishonch beradi.",
        "",
        "Belgilari: testda mock sozlash test mantiqidan uzun; har metod chaqiruvi `shouldReceive()->once()` bilan; value object va entity'lar mock qilingan; mock mock qaytaradi. Davo: fake'lar (in-memory), haqiqiy hamkorlar, holatni (natijani) tekshirish, o'zaro ta'sirni faqat chegarada.",
        "",
        "```php",
        "// ❌ implementatsiyani takrorlovchi",
        "$repo->shouldReceive('find')->once()->andReturn($order);",
        "$order->shouldReceive('markPaid')->once();",
        "$repo->shouldReceive('save')->once();",
        "// ✅ natijani tekshiruvchi",
        "$repo = new InMemoryOrderRepository([$order]);",
        "(new PayOrder($repo))->handle($order->id);",
        "expect($repo->find($order->id)->isPaid())->toBeTrue();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Eng ko'p mock ishlatilgan testni fake va natija tekshiruviga qayta yozing.",
      acceptanceCriteria: [
        "Over-mocking belgilarini taniydi",
        "Holat tekshiruvini o'zaro ta'sir tekshiruvidan afzal ko'radi"
      ],
      prerequisites: [
        "25.6"
      ]
    },
    {
      id: "27.12",
      title: "Test Naming",
      description: [
        "Test nomi — muvaffaqiyatsiz bo'lganda birinchi o'qiladigan narsa. Yaxshi nom: nima tekshirilayotganini, qaysi sharoitda va kutilgan natijani biznes tilida aytadi. Uslublar: `it('rejects refund for unpaid orders')`, `test_refund_is_rejected_when_order_is_unpaid`, `Given_When_Then`.",
        "",
        "Yomon nomlar: `test1`, `testRefund`, `it('works')`, implementatsiya detallari (`it('calls repository save')`). Nom va test mazmuni mos bo'lishi kerak — nomni o'zgartirmasdan testni o'zgartirish chalg'itadi.",
        "",
        "```php",
        "❌ it('works correctly')",
        "❌ test('refund')",
        "✅ it('rejects a refund when the order has not been paid')",
        "✅ it('refunds only the remaining amount after a partial refund')",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bir test faylidagi barcha nomlarni xatti-harakat va sharoitni aniq ifodalaydigan qilib qayta nomlang.",
      acceptanceCriteria: [
        "Xatti-harakatni ifodalovchi nomlar yozadi",
        "Implementatsiya detallarini nomga qo'ymaydi"
      ],
      prerequisites: [
        "27.2"
      ]
    },
    {
      id: "27.13",
      title: "Fast Test Suites",
      description: [
        "Tez test to'plami — tez-tez ishga tushiriladi va xatolarni darhol topadi; sekin to'plam esa \"keyin ishga tushiraman\"ga aylanadi. Maqsad: unit testlar soniyalarda, butun to'plam CI'da bir necha daqiqada.",
        "",
        "Tezlashtirish: unit testlarda framework yuklamaslik, `BCRYPT_ROUNDS=4`, `CACHE_STORE=array`, `QUEUE_CONNECTION=sync`, `RefreshDatabase` (har test migratsiyasi emas), parallel ishga tushirish, keraksiz `sleep` va haqiqiy HTTP yo'q, sekin testlarni profiling (`--profile`) va optimallashtirish, og'ir seed'lardan qochish.",
        "",
        "```bash",
        "php artisan test --profile        # eng sekin 10 ta test",
        "./vendor/bin/pest --parallel --processes=8",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Eng sekin 10 ta testni profiling bilan topib, to'plam vaqtini kamida 30% qisqartiring.",
      acceptanceCriteria: [
        "Test sekinligi manbalarini biladi",
        "Profiling bilan tor joylarni topadi"
      ],
      prerequisites: [
        "26.13"
      ]
    },
    {
      id: "27.14",
      title: "Code Coverage Interpretation",
      description: [
        "Coverage raqamini to'g'ri talqin qilish: past coverage — yo'q testlar aniq signali; yuqori coverage — sifat kafolati emas (assertion'siz yoki zaif assertion'li testlar). Qayerda qoplanmagan — raqamdan muhimroq: to'lov, ruxsat, hisob-kitob kodidagi qoplanmagan branch'lar xavfli; DTO va konfiguratsiya — kam muhim.",
        "",
        "Coverage trendini kuzating (PR yangi kod uchun coverage tushirmasin), mutation testing (Infection, `pest --mutate`) bilan testlar haqiqatan xatoni ushlay olishini tekshiring. 100% maqsad sifatida — ko'pincha keraksiz testlarga olib keladi.",
        "",
        "```bash",
        "./vendor/bin/pest --coverage --min=80",
        "./vendor/bin/pest --mutate --covered-only",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Muhim modul uchun mutation testing ishga tushiring va tirik qolgan mutantlarni o'ldiruvchi testlar qo'shing.",
      acceptanceCriteria: [
        "Coverage raqamining cheklovlarini tushunadi",
        "Mutation testing bilan test sifatini baholaydi"
      ],
      prerequisites: [
        "25.10"
      ]
    },
    {
      id: "27.15",
      title: "Unit vs Integration Test Selection",
      description: [
        "Tanlov mezoni — nimani tekshirmoqchisiz: **sof mantiq** (hisob, qoida, holat o'tishi) — unit test; **komponentlar hamkorligi** (SQL so'rov, migratsiya, queue serializatsiyasi, konfiguratsiya) — integratsion; **foydalanuvchi oqimi** (HTTP so'rov → javob, ruxsatlar) — feature test.",
        "",
        "Laravel ilovalarida ko'p qiymat feature testlarda (Laravel ularni tez qiladi), murakkab domen mantiqi esa unit testlarda. Testlar piramidasi qat'iy qoida emas — \"testing trophy\" yondashuvi integratsion testlarga ko'proq og'irlik beradi. Har test o'zining eng arzon darajasida.",
        "",
        "```text",
        "Narx hisoblash formulasi         → Unit",
        "Repository'ning murakkab so'rovi → Integration (haqiqiy DB)",
        "POST /api/orders oqimi           → Feature",
        "To'lov provayderi adapteri       → Integration (sandbox) / contract",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir modul uchun mavjud testlarni darajalari bo'yicha tasniflab, noto'g'ri darajadagilarni ko'chiring.",
      acceptanceCriteria: [
        "Test darajasini maqsadga qarab tanlaydi",
        "Test piramidasi va trophy yondashuvlarini biladi"
      ],
      prerequisites: [
        "74.1"
      ]
    }
  ]
});
