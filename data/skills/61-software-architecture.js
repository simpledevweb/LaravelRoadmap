/* 61 · Software Architecture
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 61,
  slug: "software-architecture",
  title: "Software Architecture",
  group: "architecture",
  description: "Dasturiy arxitektura — tizimning asosiy tuzilmasi va o'zgartirish qimmat bo'lgan qarorlar: komponentlar, ularning mas'uliyati, bog'liqliklar yo'nalishi va sifat atributlari (performance, masshtablanuvchanlik, saqlanuvchanlik). Senior dasturchi arxitekturani murosalar (trade-off) asosida tanlaydi, qarorlarni hujjatlashtiradi va tizim o'sishi bilan uni evolyutsion rivojlantiradi.",
  subskills: [
    {
      id: "61.1",
      title: "Architectural Styles",
      description: [
        "Arxitektura uslublari: **qatlamli** (layered — presentation, application, domain, infrastructure), **modulli monolit**, **mikroservislar**, **event-driven**, **hexagonal/ports-and-adapters**, **clean/onion**, **CQRS** (o'qish va yozish modellarini ajratish), **serverless**, **pipe-and-filter**.",
        "",
        "Har biri muayyan muammolarni hal qiladi va o'z narxiga ega. Ko'p Laravel ilovalari uchun to'g'ri boshlang'ich nuqta — yaxshi tuzilgan modulli monolit; murakkablik real ehtiyoj bilan qo'shiladi. Uslublar aralashishi mumkin (monolit ichida event-driven modullar).",
        "",
        "```text",
        "Kichik CRUD          → MVC + Laravel konvensiyalari",
        "O'rta, murakkab domen → modulli monolit + hexagonal yadro",
        "Katta, ko'p jamoa     → modullar → kerak bo'lsa servislar",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangiz uchun 3 ta arxitektura uslubini sifat atributlari bo'yicha solishtirib, tanlovni asoslang.",
      acceptanceCriteria: [
        "Asosiy arxitektura uslublarini biladi",
        "Uslubni muammo va murosalarga qarab tanlaydi"
      ],
      prerequisites: [
        "6.7"
      ]
    },
    {
      id: "61.2",
      title: "Layered Architecture",
      description: [
        "Qatlamli arxitektura: har qatlam faqat pastki qatlamga bog'liq. Odatiy qatlamlar: **Presentation/HTTP** (controller, request, resource), **Application** (use case'lar, action'lar, orkestratsiya, tranzaksiyalar), **Domain** (biznes qoidalar, entity'lar, value object'lar), **Infrastructure** (DB, tashqi API, navbat, fayllar).",
        "",
        "Afzallik: tushunarli tuzilma, mas'uliyat ajralishi. Xavf: \"teshik qatlamlar\" (controller to'g'ridan-to'g'ri DB'ga — qatlam chetlab o'tiladi), anemik domen (barcha mantiq servislarda), juda ko'p pass-through kod. Laravel'da qat'iy qatlamlash ixtiyoriy — jamoa kelishuvi va arch testlari bilan ta'minlanadi.",
        "",
        "```text",
        "app/Http        → Presentation",
        "app/Actions     → Application",
        "app/Domain      → Domain",
        "app/Infrastructure → DB, API adapterlari",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Loyiha papkalarini qatlamlarga ajratib, qatlamlar bog'liqligini Pest arch testlari bilan majburlang.",
      acceptanceCriteria: [
        "Qatlamlar va ularning mas'uliyatini biladi",
        "Qatlam qoidalarini avtomatik tekshiradi"
      ],
      prerequisites: [
        "61.6"
      ]
    },
    {
      id: "61.3",
      title: "Modular Monolith",
      description: [
        "Modulli monolit — bitta deploy qilinadigan ilova, lekin ichida aniq chegarali modullar (Billing, Catalog, Ordering, Identity): har modulning o'z modellari, servislari, route'lari va ommaviy interfeysi; modullar bir-birining ichki qismlariga to'g'ridan-to'g'ri murojaat qilmaydi — faqat ommaviy API yoki event'lar orqali.",
        "",
        "Afzalliklari: mikroservislarning modullik foydasi, lekin taqsimlangan tizim murakkabligisiz (bitta DB tranzaksiyasi, oddiy deploy va debug). Keyinchalik zarurat bo'lsa, aniq chegarali modulni servisga ajratish oson. Chegaralarni Deptrac yoki Pest arch testlari bilan ta'minlash.",
        "",
        "```php",
        "arch('billing does not touch ordering internals')",
        "    ->expect('App\\Modules\\Billing')",
        "    ->not->toUse('App\\Modules\\Ordering\\Models');",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ilovani 3–4 ta modulga ajratib, modullararo bog'liqliklarni arch testlari bilan cheklang.",
      acceptanceCriteria: [
        "Modulli monolit tamoyillarini biladi",
        "Modul chegaralarini avtomatik ta'minlaydi"
      ],
      prerequisites: [
        "61.14"
      ]
    },
    {
      id: "61.4",
      title: "Microservices",
      description: [
        "Mikroservislar — har biri alohida deploy qilinadigan, o'z ma'lumotiga ega, bitta biznes qobiliyatiga mas'ul kichik servislar. Afzalliklari: mustaqil deploy va masshtablash, jamoalar avtonomiyasi, texnologik moslashuvchanlik, nosozlik izolyatsiyasi.",
        "",
        "Narxi juda yuqori: taqsimlangan tizim muammolari (tarmoq xatolari, eventual consistency, distributed tranzaksiyalar, tracing), infratuzilma va DevOps yetukligi, testlash va debug murakkabligi. Qoida: monolitdan boshlang, mikroservislarga faqat aniq tashkiliy yoki texnik zarurat bilan (Conway qonuni — arxitektura tashkilot tuzilmasini aks ettiradi).",
        "",
        "```text",
        "Mikroservis signallari: ko'p mustaqil jamoa, juda turli masshtablash ehtiyoji,",
        "mustaqil reliz sikllari, aniq domen chegaralari",
        "Qarshi signallar: kichik jamoa, noaniq domen, kuchli izchillik talabi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Monolitdan bitta modulni servisga ajratish uchun foyda/narx tahlilini yozing.",
      acceptanceCriteria: [
        "Mikroservislar afzallik va narxini biladi",
        "Monolit-first yondashuvini asoslay oladi"
      ],
      prerequisites: [
        "microservices"
      ]
    },
    {
      id: "61.5",
      title: "Separation of Concerns",
      description: [
        "Arxitektura darajasida concern'larni ajratish: biznes mantiq framework va infratuzilmadan, o'qish va yozish yo'llari (kerak bo'lsa — CQRS), sinxron va asinxron ishlar, ichki domen modeli va tashqi API shartnomalari (Resource'lar), konfiguratsiya va kod.",
        "",
        "Natija: har qism alohida tushuniladi, o'zgartiriladi va testlanadi; texnologiya (DB, navbat, framework versiyasi) almashtirilganda biznes mantiq kam ta'sirlanadi. Belgilar buzilganda: biznes qoidasi controller'da, Blade'da so'rov, model ichida HTTP chaqiruvi.",
        "",
        "```text",
        "HTTP so'rov → Controller (faqat kirish/chiqish)",
        "           → Action (biznes oqimi, tranzaksiya)",
        "           → Domain (qoidalar)",
        "           → Repository/Adapter (saqlash, tashqi tizim)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta funksiyaning kodini concern'lar bo'yicha qayta tashkil qilib, har qismni alohida testlang.",
      acceptanceCriteria: [
        "Arxitektura darajasida concern'larni ajratadi",
        "Ajratilmaganlik belgilarini taniydi"
      ],
      prerequisites: [
        "6.7"
      ]
    },
    {
      id: "61.6",
      title: "Dependency Direction",
      description: [
        "Bog'liqlik yo'nalishi qoidasi: bog'liqliklar barqarorroq va abstraktroq tomonga qarab yo'naladi — infratuzilma domenga bog'liq, domen esa infratuzilmaga emas (Dependency Inversion). Domen interfeysni belgilaydi (`PaymentGateway`), infratuzilma uni amalga oshiradi (`PaymeGateway`).",
        "",
        "Buzilish belgilari: domen class'larida `Illuminate\\Support\\Facades\\DB`, `Http::`, Eloquent'ga qattiq bog'liqlik, tashqi SDK class'lari domen kodida. Tekshirish: Deptrac, Pest arch testlari — bog'liqlik qoidalarini CI'da majburlash.",
        "",
        "```php",
        "arch('domain does not depend on infrastructure')",
        "    ->expect('App\\Domain')",
        "    ->not->toUse(['App\\Infrastructure', 'Illuminate\\Support\\Facades', 'GuzzleHttp']);",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Domen qatlamidagi infratuzilma bog'liqliklarini topib, interfeyslar orqali teskari yo'naltiring va arch testi qo'shing.",
      acceptanceCriteria: [
        "Bog'liqlik yo'nalishi qoidasini biladi",
        "Uni avtomatik tekshiradi"
      ],
      prerequisites: [
        "4.5"
      ]
    },
    {
      id: "61.7",
      title: "Bounded Contexts",
      description: [
        "Bounded context — muayyan domen modeli va uning tili amal qiladigan aniq chegara. Bir xil so'z turli kontekstlarda turli ma'noga ega: \"Mahsulot\" katalogda (tavsif, rasmlar), omborda (SKU, joylashuv, miqdor), buxgalteriyada (narx, soliq) — har biri o'z modeli bilan. Bitta universal `Product` modeli — hammaning ehtiyojini yomon qondiradigan \"god model\".",
        "",
        "Kontekstlar — modulli monolitdagi modullar yoki servislar chegaralari uchun asos. Kontekstlar o'rtasida aniq integratsiya (API, event'lar, tarjima qatlami).",
        "",
        "```text",
        "Catalog context:   Product(id, title, description, images)",
        "Inventory context: StockItem(sku, warehouse, quantity)",
        "Billing context:   BillableItem(sku, price, tax_rate)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Domeningizdagi bitta umumiy tushuncha uchun turli kontekstlardagi modellarni ajratib, xarita chizing.",
      acceptanceCriteria: [
        "Bounded context tushunchasini biladi",
        "God model muammosini taniydi"
      ],
      prerequisites: [
        "63.11"
      ]
    },
    {
      id: "61.8",
      title: "Domain Modeling",
      description: [
        "Domen modellashtirish — biznes tushunchalari, qoidalari va jarayonlarini kodda aniq ifodalash: entity'lar (identifikatorli), value object'lar (qiymat bo'yicha), agregatlar (izchillik chegarasi), domen servislari, domen event'lari. Model domen ekspertlari bilan birga, ularning tilida quriladi.",
        "",
        "Yaxshi model: invariantlarni o'zi himoya qiladi (noto'g'ri holat yaratib bo'lmaydi), xatti-harakat ma'lumot bilan birga (anemik emas), biznes jarayonlarini nomlar bilan aks ettiradi (`$order->cancel()`, `setStatus('cancelled')` emas). Event Storming — modellashtirish uchun jamoaviy usul.",
        "",
        "```php",
        "final class Order",
        "{",
        "    public function cancel(CancellationReason $reason, CarbonImmutable $at): void",
        "    {",
        "        if ($this->status->isShipped()) {",
        "            throw OrderCannotBeCancelled::alreadyShipped($this->id);",
        "        }",
        "        $this->status = OrderStatus::Cancelled;",
        "        $this->recordEvent(new OrderCancelled($this->id, $reason, $at));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta biznes jarayonni Event Storming bilan modellashtirib, xatti-harakatli domen model sifatida amalga oshiring.",
      acceptanceCriteria: [
        "Domen modelining asosiy elementlarini biladi",
        "Anemik model va boy model farqini tushunadi"
      ],
      prerequisites: [
        "63.2"
      ]
    },
    {
      id: "61.9",
      title: "Application Services",
      description: [
        "Application service (use case, action) — bitta foydalanuvchi niyatini bajaradi: kirishni qabul qiladi, domen obyektlarini yuklaydi, domen mantiqini chaqiradi, tranzaksiyani boshqaradi, natijani saqlaydi, event'larni yuboradi. U biznes qoidalarni o'zida saqlamaydi — orkestratsiya qiladi.",
        "",
        "Laravel'da: Action class'lar (`PlaceOrder`, `RefundPayment`) — controller, artisan buyruq, job va testlardan qayta ishlatiladi. Bitta use case — bitta class; DTO bilan kirish.",
        "",
        "```php",
        "final class PlaceOrder",
        "{",
        "    public function __construct(private OrderRepository $orders, private Inventory $inventory) {}",
        "",
        "    public function handle(PlaceOrderData $data): Order",
        "    {",
        "        return DB::transaction(function () use ($data) {",
        "            $this->inventory->reserve($data->lines);",
        "            $order = Order::place($data->customerId, $data->lines);",
        "            $this->orders->save($order);",
        "            return $order;",
        "        });",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Controller'dagi biznes oqimini Action class'ga ko'chirib, uni controller va artisan buyruqdan qayta ishlating.",
      acceptanceCriteria: [
        "Application service mas'uliyatini biladi",
        "Orkestratsiya va biznes qoidalarni ajratadi"
      ],
      prerequisites: [
        "61.2"
      ]
    },
    {
      id: "61.10",
      title: "Domain Services",
      description: [
        "Domen servisi — biror entity yoki value object'ga tabiiy tegishli bo'lmagan domen mantiqi: bir nechta agregatni o'z ichiga olgan qoida (pul o'tkazmasi — ikki hisob), murakkab hisob-kitob (narx siyosati, soliq), domen tushunchasi bo'lgan jarayon. Holatsiz, domen tilida nomlanadi, infratuzilmaga bog'liq emas.",
        "",
        "Application servisdan farqi: domen servisi — biznes qoida; application servis — use case orkestratsiyasi (tranzaksiya, saqlash, event yuborish). Haddan tashqari ko'p domen servisi — anemik model belgisi.",
        "",
        "```php",
        "final class TransferFunds   // domen servisi",
        "{",
        "    public function transfer(Account $from, Account $to, Money $amount): void",
        "    {",
        "        $from->withdraw($amount);",
        "        $to->deposit($amount);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bir nechta entity'ni o'z ichiga olgan biznes qoidani domen servisi sifatida ajratib, unit testlang.",
      acceptanceCriteria: [
        "Domen va application servis farqini biladi",
        "Domen servisini qachon yaratishni asoslay oladi"
      ],
      prerequisites: [
        "61.9"
      ]
    },
    {
      id: "61.11",
      title: "Infrastructure Layer",
      description: [
        "Infratuzilma qatlami — texnik detallar: DB (Eloquent repository'lar), tashqi API client'lari va adapter'lari, navbat, fayl saqlash, email/SMS yuborish, kesh, log. Domen va application qatlamlari belgilagan interfeyslarni amalga oshiradi.",
        "",
        "Laravel'da infratuzilmaning katta qismi framework tomonidan berilgan (Eloquent, Queue, Mail, Storage) — ularni o'rab olish faqat haqiqiy foyda bo'lganda (tashqi API'lar, almashtirilishi mumkin bo'lgan provayderlar, murakkab so'rovlar). Har Eloquent model uchun repository yozish — ko'pincha ortiqcha.",
        "",
        "```php",
        "final class EskizSmsSender implements SmsSender   // infrastructure",
        "{",
        "    public function send(PhoneNumber $to, string $text): void",
        "    {",
        "        Http::withToken($this->token())->post('https://notify.eskiz.uz/api/message/sms/send', [",
        "            'mobile_phone' => $to->digits(), 'message' => $text,",
        "        ])->throw();",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tashqi servis chaqiruvlarini infratuzilma qatlamidagi adapter'larga ko'chirib, domen interfeysi orqali ulang.",
      acceptanceCriteria: [
        "Infratuzilma qatlami mas'uliyatini biladi",
        "Framework imkoniyatlarini keraksiz o'ramaydi"
      ],
      prerequisites: [
        "5.5"
      ]
    },
    {
      id: "61.12",
      title: "Ports and Adapters",
      description: [
        "Hexagonal arxitektura (Ports and Adapters): ilova yadrosi (domen + use case'lar) tashqi dunyo bilan faqat **port**lar (interfeyslar) orqali gaplashadi; **adapter**lar portlarni aniq texnologiyaga ulaydi. Kiruvchi (driving) adapterlar: HTTP controller, CLI, queue consumer — yadroni chaqiradi. Chiquvchi (driven) adapterlar: DB repository, to'lov gateway, email — yadro chaqiradi.",
        "",
        "Natija: yadro framework va infratuzilmasiz testlanadi (fake adapterlar bilan), texnologiya almashtirilishi oson, bir xil use case turli kirishlardan (API, CLI, job) ishlaydi.",
        "",
        "```text",
        "[HTTP Controller] ─┐                    ┌─▶ [EloquentOrderRepository]",
        "[Artisan Command] ─┼─▶ (Port) PlaceOrder ┼─▶ [PaymeGateway]",
        "[Queue Consumer]  ─┘      [Yadro]        └─▶ [EskizSmsSender]",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta use case'ni ports and adapters uslubida qurib, yadroni fake adapterlar bilan testlang.",
      acceptanceCriteria: [
        "Kiruvchi va chiquvchi port/adapter'larni farqlaydi",
        "Yadroni infratuzilmasiz testlaydi"
      ],
      prerequisites: [
        "64.7"
      ]
    },
    {
      id: "61.13",
      title: "Dependency Inversion",
      description: [
        "Arxitektura darajasida DIP: yuqori darajadagi siyosat (biznes qoidalar) past darajadagi detallarga (DB, framework, tashqi xizmatlar) bog'liq emas; ikkalasi abstraksiyaga bog'liq, abstraksiya esa yuqori qatlamga tegishli. Bu qatlamlararo bog'liqliklarni \"teskari\" qiladi va domenni markazga qo'yadi.",
        "",
        "Laravel'da: interfeys domen/application'da, implementatsiya infratuzilmada, bog'lanish service provider'da (composition root). Bu Clean va Hexagonal arxitekturaning poydevori.",
        "",
        "```php",
        "// Domain/Payments/PaymentGateway.php — abstraksiya (domen egasi)",
        "// Infrastructure/Payments/PaymeGateway.php — detal",
        "// Providers/PaymentServiceProvider.php",
        "$this->app->bind(PaymentGateway::class, PaymeGateway::class);",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Arxitektura bo'ylab bitta tashqi bog'liqlikni DIP bilan teskari qilib, composition root'da ulang.",
      acceptanceCriteria: [
        "Arxitektura darajasidagi DIP'ni tushunadi",
        "Abstraksiya egaligini to'g'ri belgilaydi"
      ],
      prerequisites: [
        "4.5"
      ]
    },
    {
      id: "61.14",
      title: "Module Boundaries",
      description: [
        "Modul chegarasi — modulning ommaviy interfeysi (boshqalar nimadan foydalanishi mumkin) va ichki qismi (yashirin). Yaxshi chegara: yuqori ichki cohesion, past tashqi coupling, aniq shartnoma (ommaviy servislar/fasadlar, DTO'lar, event'lar), boshqa modul jadvallariga to'g'ridan-to'g'ri murojaat yo'q.",
        "",
        "Laravel'da qiyinlik: Eloquent relation'lar modullar orasida \"teshik\" ochadi (`$order->customer->invoices`) — modul chegarasidan o'tadigan relation'larni ID va ommaviy API bilan almashtirish. Ta'minlash: arch testlari, Deptrac, kod review.",
        "",
        "```php",
        "// Ordering moduli Billing ichki modellariga emas, ommaviy API'ga murojaat qiladi",
        "interface BillingApi { public function invoiceFor(int $orderId): ?InvoiceSummary; }",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki modul o'rtasidagi to'g'ridan-to'g'ri model murojaatlarini ommaviy API'ga almashtirib, chegarani arch testi bilan qotiring.",
      acceptanceCriteria: [
        "Modul chegarasi elementlarini biladi",
        "Modullararo Eloquent bog'liqliklarini nazorat qiladi"
      ],
      prerequisites: [
        "61.3"
      ]
    },
    {
      id: "61.15",
      title: "Interface Contracts",
      description: [
        "Interfeys shartnomalari — komponentlar o'rtasidagi kelishuv: metod imzolari, tiplar, xatti-harakat (pre/postcondition'lar, exception'lar), ishlash xususiyatlari (idempotentlik, sinxron/asinxron). Modullararo va servislararo shartnomalar ayniqsa muhim — ularni o'zgartirish ko'p iste'molchiga ta'sir qiladi.",
        "",
        "Shartnomalarni barqaror saqlash: versiyalash, faqat qo'shimcha o'zgarishlar, contract testlari (barcha implementatsiyalar bir xil test to'plamidan o'tadi), hujjatlashtirish (PHPDoc, OpenAPI, AsyncAPI).",
        "",
        "```php",
        "interface ExchangeRates",
        "{",
        "    /**",
        "     * @throws RateUnavailable agar kurs topilmasa yoki provayder javob bermasa",
        "     * @return positive-int 1 birlik valyuta tiyinda",
        "     */",
        "    public function rate(Currency $from, Currency $to, CarbonImmutable $on): int;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Muhim modullararo interfeys uchun to'liq shartnoma va barcha implementatsiyalar uchun contract test yozing.",
      acceptanceCriteria: [
        "Shartnomaning tiplardan tashqari elementlarini biladi",
        "Contract testlar bilan shartnomani himoyalaydi"
      ],
      prerequisites: [
        "3.13"
      ]
    },
    {
      id: "61.16",
      title: "Coupling va Cohesion",
      description: [
        "Arxitektura darajasida: modullar/servislar orasida past coupling (kam va aniq bog'liqliklar, asinxron aloqa imkoni boricha) va har modul ichida yuqori cohesion (birga o'zgaradigan narsalar birga). Coupling turlari: kod (to'g'ridan-to'g'ri chaqiruvlar), ma'lumot (umumiy jadvallar — eng xavfli), vaqt (sinxron chaqiruv — biri ishlamasa ikkinchisi ham), deploy (birga chiqarish kerak).",
        "",
        "O'lchash: modullar orasidagi import/chaqiruvlar soni, birga o'zgaradigan fayllar (git tarixi — \"change coupling\"), Deptrac grafiklari.",
        "",
        "```bash",
        "# Qaysi modullar ko'pincha birga o'zgaradi (change coupling)",
        "git log --name-only --since=\"6 months ago\" --pretty=format: | grep '^app/Modules' | cut -d/ -f3 | sort | uniq -c",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Git tarixidan modullararo change coupling'ni tahlil qilib, chegaralarni qayta ko'rib chiqish nomzodlarini aniqlang.",
      acceptanceCriteria: [
        "Coupling turlarini arxitektura darajasida biladi",
        "Coupling'ni o'lchash usullarini qo'llaydi"
      ],
      prerequisites: [
        "3.11"
      ]
    },
    {
      id: "61.17",
      title: "Architecture Trade-offs",
      description: [
        "Arxitektura — murosalar san'ati: \"eng yaxshi\" arxitektura yo'q, faqat kontekstga mos. Tipik murosalar: izchillik vs mavjudlik, performance vs saqlanuvchanlik, moslashuvchanlik vs soddalik, mustaqillik (mikroservislar) vs operatsion narx, tezkor yetkazish vs uzoq muddatli sifat, normallashtirish vs o'qish tezligi.",
        "",
        "Yaxshi qaror: talablar va cheklovlar aniq, kamida 2–3 variant ko'rib chiqilgan, har birining narxi va foydasi yozilgan, qaytarilish imkoniyati baholangan, qaror va sabablari ADR'da qayd etilgan.",
        "",
        "```text",
        "Variant A: sinxron REST chaqiruv  — sodda, darhol izchil | coupling, kaskad nosozlik",
        "Variant B: event + navbat         — mustaqil, chidamli   | eventual consistency, murakkab debug",
        "Qaror: B, chunki hisobot servisi kechikishga chidamli va asosiy oqim to'xtamasligi muhim",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Yaqinda qilingan arxitektura qarori uchun variantlar va murosalarni yozib, qayta baholang.",
      acceptanceCriteria: [
        "Asosiy arxitektura murosalarini biladi",
        "Qarorni variantlar va narxlar bilan asoslaydi"
      ],
      prerequisites: [
        "82.4"
      ]
    },
    {
      id: "61.18",
      title: "Quality Attributes",
      description: [
        "Sifat atributlari (non-functional requirements) arxitekturani funksiyalardan ko'ra ko'proq belgilaydi: performance (kechikish, throughput), masshtablanuvchanlik, mavjudlik, ishonchlilik, xavfsizlik, saqlanuvchanlik, testlanuvchanlik, kuzatuvchanlik, deploy qilish osonligi, narx.",
        "",
        "Ular o'lchanadigan qilib yoziladi (\"tizim tez ishlashi kerak\" emas, \"checkout p95 < 500 ms, 200 RPS'da\"). Quality attribute stsenariylari: manba, stimul, muhit, javob, o'lchov. Atributlar ko'pincha bir-biriga zid — ustuvorlik kerak.",
        "",
        "```text",
        "Stsenariy: Mavjudlik",
        "Stimul: bitta app server ishdan chiqdi",
        "Muhit: normal yuklama",
        "Javob: trafik qolgan serverlarga o'tadi",
        "O'lchov: < 30 s ichida, xatolar < 1%",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimingiz uchun 4 ta asosiy sifat atributini o'lchanadigan stsenariylar sifatida yozing.",
      acceptanceCriteria: [
        "Sifat atributlarini biladi",
        "Ularni o'lchanadigan stsenariylarga aylantiradi"
      ],
      prerequisites: [
        "66.2"
      ]
    },
    {
      id: "61.19",
      title: "Architecture Decision Records (ADR)",
      description: [
        "ADR — muhim arxitektura qarorini qayd etuvchi qisqa hujjat: **Kontekst** (muammo, cheklovlar), **Qaror**, **Holat** (taklif, qabul qilingan, bekor qilingan, almashtirilgan), **Oqibatlar** (ijobiy va salbiy), ko'rib chiqilgan variantlar. Repozitoriyda (`docs/adr/0007-use-redis-for-queues.md`), raqamlangan, o'zgarmas (qaror o'zgarsa — yangi ADR eskisini almashtiradi).",
        "",
        "Foyda: \"nega bunday qilingan?\" savoliga javob (yangi jamoa a'zolari, kelajakdagi o'zingiz), qarorlarni ongli va muhokama qilingan qiladi, takroriy bahslarni kamaytiradi.",
        "",
        "```markdown",
        "# 0007. Navbatlar uchun Redis + Horizon",
        "Holat: Qabul qilingan (2025-06-01)",
        "## Kontekst",
        "Fon vazifalari kuniga ~200k, monitoring kerak, jamoada RabbitMQ tajribasi yo'q.",
        "## Qaror",
        "Redis queue driver va Laravel Horizon.",
        "## Oqibatlar",
        "+ Oddiy ekspluatatsiya, dashboard. − Servislararo marshrutlash yo'q; kerak bo'lsa RabbitMQ (ADR kerak).",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangizdagi 3 ta muhim o'tgan qaror uchun ADR yozing va `docs/adr` papkasini yarating.",
      acceptanceCriteria: [
        "ADR tuzilmasini biladi",
        "Qarorlarni muntazam hujjatlashtiradi"
      ],
      prerequisites: [
        "80.4"
      ]
    },
    {
      id: "61.20",
      title: "Evolutionary Architecture",
      description: [
        "Evolyutsion arxitektura — oldindan \"mukammal\" dizayn o'rniga o'zgarishga tayyor tuzilma: kichik qadamlar bilan rivojlantirish, qaytariladigan qarorlarni tez, qaytarib bo'lmaydiganlarini puxta qabul qilish, \"fitness function\"lar (arxitektura xususiyatlarini avtomatik tekshirish — arch testlari, performance testlari, bog'liqlik qoidalari), strangler fig (eski qismni bosqichma-bosqich almashtirish).",
        "",
        "Tamoyillar: oxirgi mas'uliyatli lahzada qaror qabul qilish, modullik (o'zgarishni lokalizatsiya qilish), avtomatlashtirilgan testlar va deploy (o'zgarishni arzonlashtirish), kuzatuvchanlik (o'zgarish ta'sirini ko'rish).",
        "",
        "```php",
        "// Fitness function: domen framework'dan mustaqil, javob vaqti chegarasi",
        "arch('domain stays framework-agnostic')->expect('App\\Domain')->not->toUse('Illuminate');",
        "it('keeps checkout under 10 queries', fn () => /* ... */);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Arxitekturangiz uchun 3 ta fitness function (arch, performance, bog'liqlik) yozib, CI'ga qo'shing.",
      acceptanceCriteria: [
        "Evolyutsion arxitektura tamoyillarini biladi",
        "Fitness function'lar bilan arxitekturani himoyalaydi"
      ],
      prerequisites: [
        "61.17"
      ]
    }
  ]
});
