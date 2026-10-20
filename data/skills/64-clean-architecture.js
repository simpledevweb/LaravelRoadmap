/* 64 · Clean Architecture
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 64,
  slug: "clean-architecture",
  title: "Clean Architecture",
  group: "architecture",
  description: "Clean Architecture (Robert C. Martin) — biznes qoidalarini markazga qo'yib, ularni framework, DB, UI va tashqi servislardan mustaqil qiluvchi arxitektura. Asosiy g'oya — bog'liqlik qoidasi: bog'liqliklar faqat ichkariga yo'naladi. Senior dasturchi uning tamoyillarini Laravel'da pragmatik qo'llay oladi va ortiqcha abstraksiyadan saqlanadi.",
  subskills: [
    {
      id: "64.1",
      title: "Dependency Rule",
      description: [
        "Bog'liqlik qoidasi: manba kodi bog'liqliklari faqat **ichkariga** — yuqori darajadagi siyosat tomon — yo'naladi. Ichki doiralar (Entities, Use Cases) tashqi doiralar (Controller, DB, framework) haqida hech narsa bilmaydi: ularning nomlari, class'lari, funksiyalari ichki kodda uchramaydi. Ma'lumot chegaradan oddiy tuzilmalar (DTO) sifatida o'tadi.",
        "",
        "Tashqi qatlam ichki qatlamni chaqirishi kerak bo'lganda — oddiy chaqiruv; ichki qatlam tashqini \"chaqirishi\" kerak bo'lganda (DB'ga saqlash) — ichki qatlamda interfeys, tashqarida implementatsiya (DIP).",
        "",
        "```text",
        "[Frameworks & Drivers: Laravel, MySQL, Redis, Payme]",
        "   → [Interface Adapters: Controllers, Presenters, Repositories]",
        "      → [Use Cases: PlaceOrder, RefundPayment]",
        "         → [Entities: Order, Money, RefundPolicy]",
        "(o'qlar — bog'liqlik yo'nalishi, faqat ichkariga)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangiz kodini doiralarga xaritalab, ichkaridan tashqariga yo'nalgan bog'liqliklarni toping.",
      acceptanceCriteria: [
        "Bog'liqlik qoidasini tushuntira oladi",
        "Qoidani buzuvchi bog'liqliklarni aniqlaydi"
      ],
      prerequisites: [
        "61.6"
      ]
    },
    {
      id: "64.2",
      title: "Entities",
      description: [
        "Clean Architecture'dagi Entities — korxona darajasidagi biznes qoidalari: eng barqaror, eng kam o'zgaradigan kod (tashqi texnologiyalar o'zgarsa ham o'zgarmaydi). Ular framework'siz toza obyektlar: ma'lumot va muhim biznes qoidalar (invariantlar, hisob-kitoblar).",
        "",
        "Laravel kontekstida: framework'dan mustaqil domen class'lari (value object'lar, policy'lar, hisob-kitob class'lari) yoki pragmatik holatda — Eloquent model'larning domen metodlari (lekin u holda Eloquent'ga bog'liqlik qoladi). Qat'iy variantda entity'lar `Illuminate` ni import qilmaydi.",
        "",
        "```php",
        "namespace App\\Domain\\Billing;",
        "",
        "final readonly class InvoiceTotals   // framework'siz entity/qoida",
        "{",
        "    public static function calculate(array $lines, TaxRate $tax): self { /* toza hisob-kitob */ }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta muhim biznes qoidani framework'siz toza PHP entity sifatida ajratib, unit testlang.",
      acceptanceCriteria: [
        "Clean Architecture'dagi entity rolini biladi",
        "Entity'larni framework'dan mustaqil qiladi"
      ],
      prerequisites: [
        "63.2"
      ]
    },
    {
      id: "64.3",
      title: "Use Cases",
      description: [
        "Use case (interactor) — ilovaga xos biznes qoidasi: bitta foydalanuvchi niyatini bajaradi (\"buyurtma berish\", \"pulni qaytarish\"). Kirish modeli (request DTO) oladi, entity'lar bilan ishlaydi, chiquvchi portlar (repository, gateway interfeyslari) orqali tashqi dunyoga murojaat qiladi va chiqish modeli (response DTO) qaytaradi.",
        "",
        "Use case HTTP, JSON, Eloquent yoki Blade haqida bilmaydi — shu sabab u controller'dan, CLI'dan, queue consumer'dan yoki testdan bir xil chaqiriladi. Laravel'da — Action/Handler class'lar.",
        "",
        "```php",
        "final class RefundPayment",
        "{",
        "    public function __construct(private Payments $payments, private PaymentGateway $gateway, private RefundPolicy $policy) {}",
        "",
        "    public function __invoke(RefundPaymentInput $in): RefundPaymentOutput",
        "    {",
        "        $payment = $this->payments->get($in->paymentId);",
        "        $this->policy->assertRefundable($payment, $in->amount);",
        "        $refundId = $this->gateway->refund($payment->externalId, $in->amount);",
        "        $payment->markRefunded($in->amount, $refundId);",
        "        $this->payments->save($payment);",
        "        return new RefundPaymentOutput($refundId);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta use case'ni kirish/chiqish DTO'lari va portlar bilan yozib, framework'siz unit testlang.",
      acceptanceCriteria: [
        "Use case tuzilmasini biladi",
        "Use case'ni kirish mexanizmidan mustaqil qiladi"
      ],
      prerequisites: [
        "61.9"
      ]
    },
    {
      id: "64.4",
      title: "Interface Adapters",
      description: [
        "Interfeys adapterlari qatlami — tashqi format va ichki modellar o'rtasidagi tarjima: controller'lar (HTTP so'rov → use case kirish DTO'si), presenter'lar/Resource'lar (use case natijasi → JSON/view), repository implementatsiyalari (domen obyekti ↔ DB qatori), gateway implementatsiyalari (domen so'rovi ↔ tashqi API).",
        "",
        "Laravel'da bu qatlam — controller'lar, Form Request'lar, API Resource'lar, Eloquent repository'lar, HTTP client adapter'lari. Ular framework'ga bog'liq bo'lishi tabiiy; muhimi — bu bog'liqlik ichkariga sizmasligi.",
        "",
        "```php",
        "final class RefundController   // interface adapter",
        "{",
        "    public function __invoke(RefundRequest $request, RefundPayment $refund): JsonResponse",
        "    {",
        "        $out = $refund(new RefundPaymentInput(PaymentId::from($request->route('payment')), Money::uzs($request->integer('amount'))));",
        "        return response()->json(['refund_id' => $out->refundId], 201);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Controller, Resource va repository'larni adapter sifatida ajratib, ulardagi biznes mantiqni use case'larga ko'chiring.",
      acceptanceCriteria: [
        "Adapter qatlami tarkibini biladi",
        "Adapter'larda biznes mantiq qoldirmaydi"
      ],
      prerequisites: [
        "64.3"
      ]
    },
    {
      id: "64.5",
      title: "Infrastructure",
      description: [
        "Eng tashqi doira — frameworklar va drayverlar: Laravel, DB, Redis, navbatlar, tashqi API'lar, fayl tizimi. Bu yerda \"qanday\" savollari hal qilinadi; ichki doiralar \"nima\" bilan shug'ullanadi. Infratuzilma o'zgarishi (MySQL → PostgreSQL, Payme → Click, Laravel versiyasi) ichki kodni minimal ta'sirlashi kerak.",
        "",
        "Laravel ilovasida framework tashqi doira bo'lsa ham, amalda u \"asosiy\" — shuning uchun pragmatik yondashuv: framework'ni to'liq yashirishga urinmaslik, lekin muhim biznes mantiqni undan mustaqil saqlash.",
        "",
        "```text",
        "Infrastructure: config/, routes/, database/migrations, app/Infrastructure/*, service provider'lar",
        "Bu yerda o'zgarish: Payme → Click → faqat yangi Gateway adapter va binding",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bitta infratuzilma komponentini (masalan, SMS provayderi) almashtirib, ichki koddagi o'zgarishlar sonini o'lchang.",
      acceptanceCriteria: [
        "Infratuzilma qatlamining vazifasini biladi",
        "Infratuzilma almashinuvi ta'sirini minimallashtiradi"
      ],
      prerequisites: [
        "61.11"
      ]
    },
    {
      id: "64.6",
      title: "Dependency Inversion",
      description: [
        "Clean Architecture'da DIP — bog'liqlik qoidasini amalga oshirish vositasi: use case DB'ga saqlashi kerak, lekin DB qatlamini bilmasligi kerak → use case doirasida `OrderRepository` interfeysi (chiquvchi port), infratuzilmada `EloquentOrderRepository` implementatsiyasi; boshqaruv oqimi tashqariga, bog'liqlik ichkariga.",
        "",
        "Laravel container — composition root: service provider'da interfeyslar implementatsiyalarga bog'lanadi. Testlarda — in-memory implementatsiyalar.",
        "",
        "```php",
        "// Use case qatlami (ichki)",
        "interface Payments { public function get(PaymentId $id): Payment; public function save(Payment $p): void; }",
        "// Infratuzilma (tashqi)",
        "final class EloquentPayments implements Payments { /* ... */ }",
        "// Composition root",
        "$this->app->bind(Payments::class, EloquentPayments::class);",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Use case'ning barcha tashqi bog'liqliklarini interfeyslar orqali teskari qilib, testda in-memory implementatsiyalar bilan almashtiring.",
      acceptanceCriteria: [
        "Boshqaruv oqimi va bog'liqlik yo'nalishi farqini biladi",
        "Composition root'ni to'g'ri ishlatadi"
      ],
      prerequisites: [
        "4.5"
      ]
    },
    {
      id: "64.7",
      title: "Ports and Adapters",
      description: [
        "Clean Architecture va Hexagonal bir xil g'oyaning variantlari: **kiruvchi portlar** (use case interfeyslari — yadroni nima chaqira oladi), **chiquvchi portlar** (yadro tashqi dunyodan nima kutadi — repository, gateway, notifier), **adapter'lar** — portlarning texnologik implementatsiyalari (HTTP controller, CLI, Eloquent, Payme client).",
        "",
        "Amalda Laravel'da kiruvchi port uchun alohida interfeys ko'pincha ortiqcha (use case class'ining o'zi yetarli); chiquvchi portlar uchun interfeys — eng ko'p qiymat beradigan joy (almashtirish va testlash).",
        "",
        "```text",
        "Kiruvchi adapterlar:  HttpController, ArtisanCommand, QueueConsumer → RefundPayment (use case)",
        "Chiquvchi portlar:    Payments, PaymentGateway, Notifier",
        "Chiquvchi adapterlar: EloquentPayments, PaymeGateway, TelegramNotifier",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta use case uchun kiruvchi va chiquvchi port/adapter'lar diagrammasini chizib, kodni unga moslang.",
      acceptanceCriteria: [
        "Kiruvchi va chiquvchi portlarni farqlaydi",
        "Interfeyslarni qayerda yaratish foydali ekanini biladi"
      ],
      prerequisites: [
        "61.12"
      ]
    },
    {
      id: "64.8",
      title: "Framework Independence",
      description: [
        "Framework mustaqilligi — biznes qoidalari framework'ni \"plagin\" deb biladi: framework yangilanishi yoki almashtirilishi yadroni o'zgartirmaydi. Amaliy foydasi: domen va use case'lar framework yuklamasdan millisekundlarda testlanadi; Laravel upgrade'lari yadroga tegmaydi; kod uzoq yashaydi.",
        "",
        "Pragmatik chegaralar: Laravel'ni to'liq \"yashirish\" (Collection, Carbon, validatsiyani ham) — ko'p kod va kam foyda. Muvozanat: domen va use case'larda facade'lar, Eloquent so'rovlari, `request()`, `auth()` yo'q; framework'ning yordamchi kutubxonalari (Carbon, Collection) — jamoa qarori bilan.",
        "",
        "```php",
        "arch('use cases are framework independent')",
        "    ->expect('App\\Application')",
        "    ->not->toUse(['Illuminate\\Support\\Facades', 'Illuminate\\Http', 'Illuminate\\Database\\Eloquent\\Model']);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Use case qatlamidan framework bog'liqliklarini olib tashlab, arch testi bilan qotiring.",
      acceptanceCriteria: [
        "Framework mustaqilligining foyda va chegaralarini biladi",
        "Uni avtomatik tekshiradi"
      ],
      prerequisites: [
        "64.1"
      ]
    },
    {
      id: "64.9",
      title: "Database Independence",
      description: [
        "DB mustaqilligi — biznes qoidalari qaysi DB (MySQL, PostgreSQL, hatto in-memory) ishlatilishini bilmaydi: ma'lumot repository port'lari orqali. Foydasi: testlarda in-memory repository (tez, DB'siz), saqlash strategiyasini o'zgartirish (kesh, boshqa DB, event store) yadroga ta'sir qilmaydi.",
        "",
        "Haqiqat: DB almashtirish kamdan-kam bo'ladi, va DB'ning kuchli imkoniyatlari (tranzaksiyalar, constraint'lar, JSON, full-text) ko'pincha qo'llanishi kerak. Maqsad — \"istalgan DB'ga ko'chish\" emas, balki biznes mantiqni SQL va ORM detallaridan ajratish va testlanuvchanlik.",
        "",
        "```php",
        "final class InMemoryPayments implements Payments",
        "{",
        "    private array $items = [];",
        "    public function get(PaymentId $id): Payment { return $this->items[(string) $id] ?? throw PaymentNotFound::id($id); }",
        "    public function save(Payment $p): void { $this->items[(string) $p->id] = $p; }",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Use case testlarini DB'siz in-memory repository'lar bilan qayta yozib, test vaqtini solishtiring.",
      acceptanceCriteria: [
        "DB mustaqilligining real foydasini biladi",
        "DB imkoniyatlaridan voz kechmaslik muvozanatini tushunadi"
      ],
      prerequisites: [
        "64.6"
      ]
    },
    {
      id: "64.10",
      title: "Testable Business Logic",
      description: [
        "Clean Architecture'ning eng amaliy foydasi — biznes mantiqni izolyatsiyada testlash: use case'lar va entity'lar framework, DB va tarmoqsiz, fake portlar bilan, juda tez testlanadi. Testlar biznes qoidalarini hujjatlashtiradi va refactoring'ga ishonch beradi.",
        "",
        "Test strategiyasi: entity va policy'lar — sof unit testlar; use case'lar — fake/in-memory portlar bilan; adapter'lar — integratsion testlar (haqiqiy DB, sandbox API); oz sonli end-to-end/feature testlar butun oqim uchun.",
        "",
        "```php",
        "it('refuses refund above paid amount', function () {",
        "    $payments = new InMemoryPayments([Payment::paid('p1', Money::uzs(100_000))]);",
        "    $refund = new RefundPayment($payments, new FakeGateway(), new RefundPolicy());",
        "",
        "    expect(fn () => $refund(new RefundPaymentInput(PaymentId::from('p1'), Money::uzs(150_000))))",
        "        ->toThrow(RefundExceedsPayment::class);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Muhim use case uchun framework'siz, fake portli test to'plamini yozing va bajarilish vaqtini o'lchang.",
      acceptanceCriteria: [
        "Qatlamlar bo'yicha test strategiyasini biladi",
        "Biznes mantiqni izolyatsiyada testlaydi"
      ],
      prerequisites: [
        "27.4"
      ]
    },
    {
      id: "64.11",
      title: "Application Boundaries",
      description: [
        "Ilova chegarasi — tashqi dunyo va ilova yadrosi o'rtasidagi aniq interfeys: barcha kirish use case'lar orqali, barcha chiqish portlar orqali. Chegaradan faqat oddiy ma'lumot (DTO, primitivlar, value object'lar) o'tadi — Eloquent model'lar, `Request` obyektlari, framework class'lari emas.",
        "",
        "Chegara aniq bo'lsa: yangi kirish kanali (API v2, mobil, CLI, GraphQL) qo'shish oson; xavfsizlik va validatsiya bir joyda; yadroning ommaviy \"API\"si hujjatlashtiriladi va barqaror.",
        "",
        "```text",
        "Tashqi → [HTTP: FormRequest → Input DTO] → Use case → [Output DTO → Resource] → Tashqi",
        "Chegaradan o'tmaydi: Request, Response, Eloquent Model, Collection<Model>",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Use case'larning kirish/chiqishidagi framework obyektlarini DTO'larga almashtiring.",
      acceptanceCriteria: [
        "Chegaradan nima o'tishi kerakligini biladi",
        "Chegarani DTO'lar bilan aniqlaydi"
      ],
      prerequisites: [
        "64.12"
      ]
    },
    {
      id: "64.12",
      title: "DTOs",
      description: [
        "DTO (Data Transfer Object) — qatlamlar o'rtasida ma'lumot tashuvchi oddiy, xatti-harakatsiz (yoki minimal), odatda o'zgarmas obyekt: use case kirishi va chiqishi, servislararo xabarlar, API payload'lari. Massivlar o'rniga DTO — tiplar, IDE avtoto'ldirish, statik tahlil, aniq shartnoma.",
        "",
        "PHP'da: `readonly` class'lar constructor promotion bilan; `spatie/laravel-data` — Request'dan avtomatik yaratish, validatsiya, Resource sifatida qaytarish. DTO va value object farqi: DTO — tashish uchun, value object — domen tushunchasi (qoidalari bilan).",
        "",
        "```php",
        "final readonly class PlaceOrderInput",
        "{",
        "    /** @param list<OrderLineInput> $lines */",
        "    public function __construct(public CustomerId $customerId, public array $lines, public ?string $couponCode = null) {}",
        "",
        "    public static function fromRequest(StoreOrderRequest $r): self",
        "    {",
        "        return new self(CustomerId::from($r->user()->id), array_map(OrderLineInput::fromArray(...), $r->validated('items')), $r->validated('coupon'));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Massivlar bilan ishlayotgan use case'ni readonly DTO'larga o'tkazib, PHPStan tip xatolarini tuzating.",
      acceptanceCriteria: [
        "DTO va value object farqini biladi",
        "Massivlar o'rniga typed DTO'larni qo'llaydi"
      ],
      prerequisites: [
        "3.9"
      ]
    },
    {
      id: "64.13",
      title: "Input and Output Ports",
      description: [
        "Kiruvchi port (input port) — use case'ning interfeysi (`RefundPaymentUseCase`), controller unga bog'lanadi. Chiquvchi port (output port) — use case natijani yuboradigan interfeys (presenter) yoki tashqi resurs interfeysi (repository, gateway). Klassik Clean Architecture'da use case natijani presenter'ga \"push\" qiladi; amalda ko'pincha natija qaytariladi (soddaroq).",
        "",
        "Laravel'da kiruvchi port interfeyslari ko'pincha ortiqcha (use case class'iga to'g'ridan-to'g'ri bog'lanish yetarli); presenter naqshi — bir use case natijasini turli formatlarda (JSON, HTML, CSV) ko'rsatish kerak bo'lganda foydali.",
        "",
        "```php",
        "interface RefundPresenter { public function refunded(RefundId $id): void; public function rejected(string $reason): void; }",
        "// use case natijani presenter'ga uzatadi; JSON va CLI presenter'lar turlicha ko'rsatadi",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Bir use case natijasini JSON va CLI uchun turli presenter'lar bilan ko'rsatib, qaytarish yondashuvi bilan solishtiring.",
      acceptanceCriteria: [
        "Input va output port tushunchalarini biladi",
        "Presenter naqshini qachon qo'llashni biladi"
      ],
      prerequisites: [
        "64.7"
      ]
    },
    {
      id: "64.14",
      title: "Repository Interfaces",
      description: [
        "Repository interfeysi — use case/domen qatlamidagi chiquvchi port: domen tilida nomlangan metodlar (`awaitingPaymentSince()`, `findByEmail()`), domen obyektlarini qabul qiladi va qaytaradi (Eloquent model yoki massiv emas — qat'iy variantda), saqlash detallari (SQL, ustunlar, pagination formatlari) yo'q.",
        "",
        "Interfeys use case'lar nimaga muhtojligidan kelib chiqib loyihalanadi (ISP — kichik, mijozga yo'naltirilgan), \"umumiy CRUD\" interfeysi emas.",
        "",
        "```php",
        "interface Invoices",
        "{",
        "    public function get(InvoiceId $id): Invoice;",
        "    public function nextNumber(CompanyId $company): InvoiceNumber;",
        "    /** @return iterable<Invoice> */",
        "    public function overdueAt(CarbonImmutable $date): iterable;",
        "    public function save(Invoice $invoice): void;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Use case ehtiyojlaridan kelib chiqib repository interfeysini loyihalang (umumiy CRUD emas).",
      acceptanceCriteria: [
        "Repository interfeysini domen tilida loyihalaydi",
        "Saqlash detallarini interfeysga chiqarmaydi"
      ],
      prerequisites: [
        "63.7"
      ]
    },
    {
      id: "64.15",
      title: "Infrastructure Implementations",
      description: [
        "Port implementatsiyalari infratuzilmada: `EloquentInvoices` (domen obyekti ↔ Eloquent model xaritalashi yoki Eloquent model'ning o'zi domen obyekti), `PaymeGateway` (domen so'rovi ↔ HTTP API), `RedisRateLimiter`, `S3DocumentStorage`. Ular framework va texnologiyani to'liq ishlatadi — bu yerda bu to'g'ri.",
        "",
        "Har implementatsiya integratsion testlar bilan (haqiqiy DB, sandbox API) va contract testlar bilan (bir xil test to'plami in-memory va haqiqiy implementatsiya uchun) tekshiriladi.",
        "",
        "```php",
        "final class EloquentInvoices implements Invoices",
        "{",
        "    public function get(InvoiceId $id): Invoice",
        "    {",
        "        $row = InvoiceRecord::with('lines')->findOrFail((string) $id);",
        "        return InvoiceMapper::toDomain($row);",
        "    }",
        "    public function save(Invoice $invoice): void",
        "    {",
        "        DB::transaction(fn () => InvoiceMapper::persist($invoice));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Repository'ning Eloquent implementatsiyasini yozib, in-memory variant bilan umumiy contract test to'plamidan o'tkazing.",
      acceptanceCriteria: [
        "Infratuzilma implementatsiyalarining rolini biladi",
        "Contract testlar bilan implementatsiyalarni tekshiradi"
      ],
      prerequisites: [
        "64.14"
      ]
    },
    {
      id: "64.16",
      title: "Laravel Integration",
      description: [
        "Clean Architecture'ni Laravel'ga integratsiya qilish: papka tuzilmasi (`app/Domain`, `app/Application`, `app/Infrastructure`, `app/Http`), service provider'lar — composition root (port ↔ adapter bog'lanishlari), controller'lar va Form Request'lar — kiruvchi adapterlar, job'lar va listener'lar — kiruvchi adapterlar (use case'ni chaqiradi), Eloquent — infratuzilmada.",
        "",
        "Framework imkoniyatlari (validatsiya, avtorizatsiya, navbat, event'lar) chegarada qoladi. Arch testlari qatlamlar qoidalarini majburlaydi. Hamma joyda emas — murakkab modullarda.",
        "",
        "```text",
        "app/",
        "  Domain/Billing/          Entities, Value Objects, Policies (toza PHP)",
        "  Application/Billing/     Use cases, DTOs, port interfeyslari",
        "  Infrastructure/Billing/  EloquentInvoices, PaymeGateway",
        "  Http/Controllers/Billing Controller'lar (kiruvchi adapterlar)",
        "  Providers/BillingServiceProvider.php   (composition root)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta murakkab modulni Clean Architecture qatlamlariga ajratib, service provider'da bog'lang va arch testlarini qo'shing.",
      acceptanceCriteria: [
        "Clean Architecture'ni Laravel tuzilmasiga xaritalaydi",
        "Uni faqat murakkab modullarda qo'llaydi"
      ],
      prerequisites: [
        "64.8"
      ]
    },
    {
      id: "64.17",
      title: "Avoiding Unnecessary Abstraction",
      description: [
        "Clean Architecture'ning eng katta xavfi — ortiqcha abstraksiya: har model uchun repository + interfeys + mapper + DTO + presenter, bitta implementatsiyali interfeyslar, oddiy CRUD uchun 8 ta fayl. Natija — sekin rivojlanish, ko'p \"pass-through\" kod, yangi dasturchilar uchun murakkablik va foyda yo'q.",
        "",
        "Pragmatik qoidalar: qatlamlar va portlarni murakkablik va o'zgarish ehtimoli bo'lgan joylarda (core domen, tashqi integratsiyalar); oddiy CRUD — oddiy Laravel; interfeys — ikkinchi implementatsiya yoki testlash ehtiyoji paydo bo'lganda; har abstraksiya o'z narxini oqlashi kerak.",
        "",
        "```text",
        "✅ To'lov provayderlari (almashadi, testda fake kerak) → port + adapter",
        "✅ Murakkab narxlash qoidalari → toza domen + use case",
        "❌ \"Tag\" CRUD'i uchun TagRepositoryInterface + EloquentTagRepository + TagMapper + TagDto",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihada o'zini oqlamagan abstraksiyalarni toping va soddalashtiring; har o'zgarish uchun sababni yozing.",
      acceptanceCriteria: [
        "Ortiqcha abstraksiya belgilarini taniydi",
        "Abstraksiyani faqat foyda bo'lganda qo'llaydi"
      ],
      prerequisites: [
        "5.20"
      ]
    },
    {
      id: "64.18",
      title: "Multi-Tenancy Architecture (SaaS)",
      description: [
        "**Multi-Tenancy (Ko'p ijarachilik)** — bitta dastur va infratuzilma orqali minglab turli mijozlarga (kompaniya yoki tashkilotlarga) ularning ma'lumotlarini bir-biridan qat'iy ajratgan holda xizmat ko'rsatish modeli.",
        "",
        "**Asosiy arxitektura modellari**:",
        "1. **Single Database (Shared Schema)**: Barcha jadvallarda `tenant_id` ustuni bo'ladi. Laravel'da `TenantScope` (Global Scope) va Trait'lar orqali har bir so'rovga avtomatik `WHERE tenant_id = ?` qo'shiladi. Arzon va boshqarish oson, lekin qat'iy izolatsiya talab qiladi.",
        "2. **Multi-Database (Separate DB / Schema)**: Har bir tenant uchun alohida DB yoki PostgreSQL schema ochiladi. Middleware so'rov kelishi bilan dinamik DB connection'ni almashtiradi (`DB::purge()` va `config(['database.connections.tenant.database' => ...])`). Xavfsizlik eng yuqori darajada.",
        "",
        "**Tenant Identification & Xavfsizlik**:",
        "Tenant subdomen (`client.crm.uz`), maxsus domen yoki JWT token orqali aniqlanadi. Eng katta xavf — kesh, navbatdagi Job'lar yoki static holat sababli boshqa tenant ma'lumotlarining aralashib ketishi (Data Leakage). Navbatdagi har bir job o'zida `tenant_id` ni saqlashi va worker bajarishidan oldin tenant muhitini yuklashi shart.",
        "",
        "```php",
        "// Global Tenant Scope misoli",
        "class TenantScope implements Scope",
        "{",
        "    public function apply(Builder $builder, Model $model): void",
        "    {",
        "        if ($tenant = app('current_tenant')) {",
        "            $builder->where('tenant_id', $tenant->id);",
        "        }",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "SaaS loyihasi uchun `TenantScope` va subdomen orqali tenantni aniqlovchi middleware yozing; bir tenant boshqasining ma'lumotini o'qiy olmasligini testlang.",
      acceptanceCriteria: [
        "Single DB va Multi DB tenancy arxitekturalarining ijobiy va salbiy tomonlarini tushuntira oladi",
        "Tenant izolyatsiyasi (kesh, DB, storage va queue) qanday ta'minlanishini biladi",
        "SaaS tizimlarda data leakage xavfini bartaraf eta oladi"
      ],
      prerequisites: [
        "64.1",
        "14.1",
        "2.4"
      ]
    }
  ]
});
