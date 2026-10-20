/* 05 · Design Patterns
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 5,
  slug: "design-patterns",
  title: "Design Patterns",
  group: "code-quality",
  description: "Design pattern'lar — takrorlanuvchi dizayn muammolariga sinalgan yechimlar va jamoa uchun umumiy lug'at. Laravel'ning o'zi pattern'larga boy: Facade, Observer, Strategy (driver'lar), Pipeline, Builder (query builder). Senior dasturchi pattern'ni **muammodan kelib chiqib** tanlaydi va keraksiz joyda ishlatmaydi.",
  subskills: [
    {
      id: "5.1",
      title: "Factory",
      description: [
        "Factory — obyekt yaratish mantiqini alohida joyga chiqaradi. Chaqiruvchi kod qaysi konkret class yaratilishini bilmaydi. Turlari: simple factory (bitta metod), factory method (subclass qaror qiladi), static named constructor (`Money::fromString()`).",
        "",
        "Laravel'da: Eloquent model factory'lari (test ma'lumotlari), `Manager` class'lari (`Cache::driver('redis')`), `Validator::make()`.",
        "",
        "```php",
        "final class NotifierFactory",
        "{",
        "    public function __construct(private Container $c) {}",
        "",
        "    public function for(Channel $channel): Notifier",
        "    {",
        "        return match ($channel) {",
        "            Channel::Sms      => $this->c->make(SmsNotifier::class),",
        "            Channel::Telegram => $this->c->make(TelegramNotifier::class),",
        "        };",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kanalga qarab notifier yaratadigan factory yozing va unit test bilan qoplang.",
      acceptanceCriteria: [
        "Simple factory va factory method farqini biladi",
        "Laravel Manager class'larini factory sifatida tushuntira oladi"
      ],
      prerequisites: [
        "3.4"
      ]
    },
    {
      id: "5.2",
      title: "Abstract Factory",
      description: [
        "Abstract Factory — bir-biriga mos obyektlar **oilasini** yaratuvchi interfeys. Har bir konkret factory bir xil \"uslubdagi\" mahsulotlarni beradi (masalan, `AwsFactory` → S3 storage + SQS queue + SES mailer; `LocalFactory` → disk + sync + log).",
        "",
        "Kamdan-kam kerak bo'ladi: faqat bir nechta o'zaro bog'liq obyekt birgalikda almashtirilishi shart bo'lganda. Aks holda oddiy factory yoki container konfiguratsiyasi yetarli.",
        "",
        "```php",
        "interface CloudFactory",
        "{",
        "    public function storage(): FileStorage;",
        "    public function queue(): MessageQueue;",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Ikki muhit (lokal va bulut) uchun mos servislar oilasini yaratuvchi abstract factory loyihalang.",
      acceptanceCriteria: [
        "Abstract factory va factory method farqini aniq ayta oladi",
        "Qachon ortiqcha ekanini asoslay oladi"
      ],
      prerequisites: [
        "5.1"
      ]
    },
    {
      id: "5.3",
      title: "Builder",
      description: [
        "Builder — murakkab obyektni bosqichma-bosqich, o'qiladigan zanjir orqali yig'ish. Ko'p ixtiyoriy parametrli constructor'lar (\"telescoping constructor\") o'rniga ishlatiladi.",
        "",
        "Laravel'da eng mashhur builder — query builder va Eloquent builder; `Http::withToken()->timeout(5)->retry(3)->post()`, `Mail` envelope'lari ham shu uslubda. Testlarda test data builder'lar fixture'larni o'qiladigan qiladi.",
        "",
        "```php",
        "$report = ReportBuilder::new()",
        "    ->forPeriod($from, $to)",
        "    ->groupBy('region')",
        "    ->includeRefunds()",
        "    ->build();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ko'p parametrli hisobot so'rovini fluent builder bilan qayta yozing; `build()` da validatsiya qiling.",
      acceptanceCriteria: [
        "Builder'ning immutable va mutable variantlarini biladi",
        "Query builder'ni builder pattern misoli sifatida tushuntira oladi"
      ],
      prerequisites: [
        "3.9"
      ]
    },
    {
      id: "5.4",
      title: "Singleton",
      description: [
        "Singleton — class'ning faqat bitta nusxasi bo'lishini ta'minlaydi. Klassik implementatsiya (`private __construct` + `static getInstance()`) global holat yaratadi, testlashni qiyinlashtiradi va yashirin bog'liqlik hosil qiladi — shuning uchun ko'pincha anti-pattern hisoblanadi.",
        "",
        "Laravel'da to'g'ri yo'l — `$this->app->singleton()`: nusxa soni container tomonidan boshqariladi, class esa oddiy va testlanadigan bo'lib qoladi. Octane/queue worker'da singleton ichida so'rovga xos holat saqlamaslik kerak.",
        "",
        "```php",
        "$this->app->singleton(ExchangeRateCache::class);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Klassik `getInstance()` singleton'ni container singleton'ga refactor qiling va testlang.",
      acceptanceCriteria: [
        "Klassik singleton'ning kamchiliklarini ayta oladi",
        "Container singleton va long-running jarayon xavfini biladi"
      ],
      prerequisites: [
        "2.6",
        "1.14"
      ]
    },
    {
      id: "5.5",
      title: "Adapter",
      description: [
        "Adapter — mos kelmaydigan interfeysni kutilgan interfeysga moslashtiradi. Tashqi SDK yoki legacy kodni o'z domen interfeysingiz ortiga yashirish uchun asosiy vosita (Hexagonal arxitekturadagi \"adapter\").",
        "",
        "Foyda: provayder almashtirilganda faqat adapter o'zgaradi; testda adapter fake bilan almashtiriladi. Laravel'ning Flysystem drayverlari — adapter'lar to'plami.",
        "",
        "```php",
        "final class EskizSmsAdapter implements SmsSender",
        "{",
        "    public function __construct(private EskizClient $client) {}",
        "",
        "    public function send(PhoneNumber $to, string $text): void",
        "    {",
        "        $this->client->sendMessage(['mobile_phone' => $to->digits(), 'message' => $text]);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Uchinchi tomon SDK'sini o'z interfeysingizga adapter orqali ulang va provayderni almashtirib ko'ring.",
      acceptanceCriteria: [
        "Adapter va Facade pattern farqini biladi",
        "Adapter'ni anti-corruption layer bilan bog'lay oladi"
      ],
      prerequisites: [
        "4.5"
      ]
    },
    {
      id: "5.6",
      title: "Decorator",
      description: [
        "Decorator — obyektni bir xil interfeysni amalga oshiruvchi boshqa obyekt bilan \"o'rab\", unga xatti-harakat qo'shadi (cache, log, retry, metrics), asl class'ni o'zgartirmasdan. Bir nechta decorator'ni ketma-ket ulash mumkin.",
        "",
        "Laravel'da: middleware (so'rov decorator'i), container `extend()`, cache `remember` o'rami. Decorator meros o'rniga composition'ning klassik namunasi.",
        "",
        "```php",
        "final class RetryingGateway implements PaymentGateway",
        "{",
        "    public function __construct(private PaymentGateway $inner) {}",
        "    public function charge(Money $m): PaymentId",
        "    {",
        "        return retry(3, fn () => $this->inner->charge($m), 200);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Repository uchun logging va caching decorator'larini yozib, container'da zanjir qiling.",
      acceptanceCriteria: [
        "Decorator va meros farqini tushuntira oladi",
        "Decorator tartibining ahamiyatini biladi"
      ],
      prerequisites: [
        "3.5"
      ]
    },
    {
      id: "5.7",
      title: "Strategy",
      description: [
        "Strategy — bir vazifaning almashtiriladigan algoritmlarini alohida class'larga ajratadi; mijoz kerakli strategiyani runtime'da tanlaydi. `if/switch` zanjirlarining eng keng tarqalgan o'rnini bosuvchisi.",
        "",
        "Misollar: yetkazib berish narxi hisoblash, chegirma qoidalari, eksport formatlari. Laravel driver tizimi (cache, queue, mail) — strategy'ning framework darajasidagi qo'llanishi.",
        "",
        "```php",
        "interface ShippingCost { public function for(Order $o): Money; }",
        "",
        "final class Checkout",
        "{",
        "    public function __construct(private ShippingCost $shipping) {}",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Yetkazib berish narxi uchun 3 ta strategiya yozing va foydalanuvchi tanloviga qarab container orqali ulang.",
      acceptanceCriteria: [
        "Strategy va State farqini biladi",
        "Strategy tanlash mantiqini factory'ga chiqaradi"
      ],
      prerequisites: [
        "3.4"
      ]
    },
    {
      id: "5.8",
      title: "Observer",
      description: [
        "Observer — obyekt holati o'zgarganda unga obuna bo'lganlarni xabardor qiladi. Ishlab chiqaruvchi obunachilarni bilmaydi — bog'liqlik pasayadi.",
        "",
        "Laravel'da: Event/Listener tizimi, Eloquent model observer'lari (`created`, `updated`, `deleted`) va model event'lari. Ehtiyot: observer'lardagi \"yashirin\" yon ta'sirlar (masalan, `saved` da email yuborish) kod oqimini tushunishni qiyinlashtiradi va bulk operatsiyalarda (`update()` query orqali) ishlamaydi.",
        "",
        "```php",
        "#[ObservedBy(OrderObserver::class)]",
        "final class Order extends Model {}",
        "",
        "final class OrderObserver",
        "{",
        "    public function created(Order $order): void { OrderCreated::dispatch($order); }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Model observer va domen event'ini solishtiring; bitta yon ta'sirni observer'dan aniq event'ga ko'chiring.",
      acceptanceCriteria: [
        "Mass update'da model event'lari ishlamasligini biladi",
        "Observer'ning \"yashirin mantiq\" xavfini tushuntira oladi"
      ],
      prerequisites: [
        "2.20"
      ]
    },
    {
      id: "5.9",
      title: "Command",
      description: [
        "Command — so'rovni (amalni) obyekt sifatida ifodalaydi: uni navbatga qo'yish, log qilish, qayta ishga tushirish yoki bekor qilish mumkin. Command obyekti ma'lumotni, handler esa bajarishni o'z ichiga oladi.",
        "",
        "Laravel'da: queue job'lari (serializatsiya qilinadigan command), `Bus::dispatch()`, Artisan command'lari, Action class'lari. CQRS'da yozish operatsiyalari command sifatida modellashtiriladi.",
        "",
        "```php",
        "final class GenerateMonthlyReport implements ShouldQueue",
        "{",
        "    use Dispatchable, Queueable;",
        "    public function __construct(public readonly int $companyId, public readonly string $month) {}",
        "    public function handle(ReportService $s): void { $s->generate($this->companyId, $this->month); }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Controller ichidagi og'ir operatsiyani command (job) obyektiga aylantirib navbatga qo'ying.",
      acceptanceCriteria: [
        "Command va Event farqini (buyruq vs fakt) tushuntira oladi",
        "Job'lar command pattern ekanini biladi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "5.10",
      title: "Template Method",
      description: [
        "Template Method — algoritm skeletini ota class'da belgilaydi, ayrim qadamlarni esa subclass'larga qoldiradi. Skelet metodi odatda `final`, o'zgaradigan qadamlar `abstract` yoki \"hook\" metodlar.",
        "",
        "Laravel'da: `Seeder::run()`, `Command::handle()` atrofidagi hayot davri, `Migration::up/down`, `FormRequest` (`authorize` → `prepareForValidation` → `rules` → `after`). Meros talab qilgani uchun moslashuvchanligi strategy'dan past.",
        "",
        "```php",
        "abstract class Importer",
        "{",
        "    final public function import(string $path): int",
        "    {",
        "        $rows = $this->parse($path);",
        "        return $this->persist($this->transform($rows));",
        "    }",
        "    abstract protected function parse(string $path): iterable;",
        "    protected function transform(iterable $rows): iterable { return $rows; } // hook",
        "    abstract protected function persist(iterable $rows): int;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "CSV va JSON import uchun template method'li umumiy importer yozing.",
      acceptanceCriteria: [
        "Hook va abstract qadam farqini biladi",
        "Template method o'rniga strategy qachon yaxshiroq ekanini ayta oladi"
      ],
      prerequisites: [
        "3.6"
      ]
    },
    {
      id: "5.11",
      title: "Repository",
      description: [
        "Repository — domen obyektlarini saqlash va olishni kolleksiyaga o'xshash interfeys ortiga yashiradi. Biznes kod \"qanday saqlanadi\"ni bilmaydi.",
        "",
        "Laravel'da munozarali: Eloquent o'zi Active Record, va har bir model uchun `find/all/create` ni takrorlovchi \"yupqa\" repository foydasiz qatlam bo'ladi. Repository haqiqatan foyda beradigan holatlar: murakkab so'rovlarni bir joyda jamlash, domen qatlamini ORM'dan ajratish (DDD/Clean Architecture), bir nechta manba (DB + API).",
        "",
        "```php",
        "interface OrderRepository",
        "{",
        "    public function findPendingOlderThan(CarbonImmutable $time): Collection;",
        "    public function save(Order $order): void;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Takrorlanuvchi murakkab Eloquent so'rovlarini mazmunli nomli repository metodlariga yig'ing.",
      acceptanceCriteria: [
        "\"Yupqa\" repository anti-pattern'ini tushuntira oladi",
        "Active Record va Repository/Data Mapper farqini biladi"
      ],
      prerequisites: [
        "13.1",
        "4.5"
      ]
    },
    {
      id: "5.12",
      title: "Unit of Work",
      description: [
        "Unit of Work — biznes tranzaksiya davomida o'zgargan obyektlarni kuzatib boradi va oxirida barcha o'zgarishlarni bitta tranzaksiyada saqlaydi (Doctrine `EntityManager::flush()`).",
        "",
        "Eloquent'da UoW yo'q — har bir `save()` darhol so'rov yuboradi. O'xshash natija uchun `DB::transaction()` ishlatiladi. UoW'ni tushunish Doctrine bilan ishlash, Active Record va Data Mapper farqini anglash va \"nega o'zgarishlarim saqlanmadi/ikki marta saqlandi\" xatolarini tahlil qilish uchun foydali.",
        "",
        "```php",
        "DB::transaction(function () use ($order, $stock) {",
        "    $order->save();",
        "    $stock->decrement('qty', $order->qty);",
        "});",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Oddiy UoW yozing: `register()`, `commit()` — barcha o'zgarishlarni bitta tranzaksiyada saqlasin.",
      acceptanceCriteria: [
        "UoW va oddiy tranzaksiya farqini biladi",
        "Doctrine va Eloquent yondashuvlarini solishtira oladi"
      ],
      prerequisites: [
        "17.3",
        "5.11"
      ]
    },
    {
      id: "5.13",
      title: "Specification",
      description: [
        "Specification — biznes qoidani alohida, birlashtiriladigan obyektga aylantiradi: `isSatisfiedBy($candidate)`. Qoidalarni `and`, `or`, `not` bilan birlashtirish va ham xotirada tekshirish, ham so'rovga aylantirish mumkin.",
        "",
        "Laravel'da yengil analoglari — query scope'lar va custom Eloquent builder metodlari. To'liq specification murakkab, o'zgaruvchan qoidalar (masalan, kredit berish shartlari) bo'lganda o'zini oqlaydi.",
        "",
        "```php",
        "$eligible = (new HasVerifiedPhone())",
        "    ->and(new OlderThan(18))",
        "    ->and((new HasOverdueLoan())->not());",
        "",
        "$eligible->isSatisfiedBy($customer);",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Mijozga chegirma berish qoidalarini birlashtiriladigan specification'lar bilan modellashtiring.",
      acceptanceCriteria: [
        "Specification va query scope farqini tushuntira oladi",
        "Qoidalarni birlashtirish (composite) mexanizmini yoza oladi"
      ],
      prerequisites: [
        "13.13"
      ]
    },
    {
      id: "5.14",
      title: "Chain of Responsibility",
      description: [
        "Chain of Responsibility — so'rovni handler'lar zanjiri bo'ylab uzatadi; har bir handler uni qayta ishlaydi yoki keyingisiga beradi. Jo'natuvchi qaysi handler ishlashini bilmaydi.",
        "",
        "Laravel'da eng yorqin misol — HTTP middleware va `Pipeline`. Validatsiya qadamlari, chegirma qoidalari, webhook qayta ishlash bosqichlari uchun ham qulay.",
        "",
        "```php",
        "$response = app(Pipeline::class)",
        "    ->send($webhook)",
        "    ->through([VerifySignature::class, RejectDuplicates::class, StoreEvent::class])",
        "    ->then(fn ($w) => ProcessWebhook::dispatch($w));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Webhook qayta ishlashni pipeline bosqichlariga ajrating; har bir bosqichni alohida testlang.",
      acceptanceCriteria: [
        "Middleware'ni chain of responsibility sifatida tushuntira oladi",
        "Zanjirni to'xtatish va davom ettirish holatlarini boshqaradi"
      ],
      prerequisites: [
        "2.4"
      ]
    },
    {
      id: "5.15",
      title: "State",
      description: [
        "State — obyekt xatti-harakati ichki holatiga qarab o'zgaradi; har bir holat alohida class. Ruxsat etilgan o'tishlar (state machine) aniq bo'ladi va noto'g'ri o'tish xato beradi.",
        "",
        "Buyurtma, to'lov, hujjat oqimi kabi holatli jarayonlarda `if ($status === ...)` lar tarqalib ketishining oldini oladi. Laravel'da `spatie/laravel-model-states` yoki enum + o'tish jadvali bilan amalga oshiriladi.",
        "",
        "```php",
        "enum OrderStatus: string",
        "{",
        "    case Pending = 'pending'; case Paid = 'paid'; case Shipped = 'shipped';",
        "",
        "    public function canTransitionTo(self $to): bool",
        "    {",
        "        return in_array($to, match ($this) {",
        "            self::Pending => [self::Paid],",
        "            self::Paid    => [self::Shipped],",
        "            self::Shipped => [],",
        "        }, true);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Buyurtma uchun state machine yozing: noto'g'ri o'tish exception bersin, har bir o'tish test bilan qoplansin.",
      acceptanceCriteria: [
        "State va Strategy farqini biladi",
        "Holat o'tishlarini markazlashtirish foydasini tushuntira oladi"
      ],
      prerequisites: [
        "1.7"
      ]
    },
    {
      id: "5.16",
      title: "Proxy",
      description: [
        "Proxy — haqiqiy obyekt o'rnida turuvchi va unga kirishni boshqaruvchi o'rinbosar: lazy loading (og'ir obyektni kerak bo'lgandagina yaratish), access control, remote proxy, caching proxy.",
        "",
        "Laravel'da: Eloquent relation'larning lazy loading'i, Facade'lar (container'dagi obyektga proxy), PHP 8.4 native lazy objects (`ReflectionClass::newLazyProxy`). Decorator'dan farqi — maqsadda: proxy kirishni boshqaradi, decorator xatti-harakat qo'shadi.",
        "",
        "```php",
        "$this->app->singleton(HeavyReportEngine::class, fn () => new LazyReportEngine(",
        "    fn () => new ReportEngine(/* og'ir init */)",
        "));",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Og'ir initsializatsiyali servis uchun lazy proxy yozib, bootstrap vaqtiga ta'sirini o'lchang.",
      acceptanceCriteria: [
        "Proxy va Decorator farqini maqsad bo'yicha tushuntira oladi",
        "Eloquent lazy loading'ni proxy sifatida tushuntira oladi"
      ],
      prerequisites: [
        "5.6"
      ]
    },
    {
      id: "5.17",
      title: "Facade",
      description: [
        "GoF Facade — murakkab quyi tizim uchun soddalashtirilgan yagona kirish nuqtasi. Masalan, `CheckoutFacade::placeOrder()` ichida inventar, to'lov, yetkazish va bildirishnoma servislarini muvofiqlashtiradi.",
        "",
        "Laravel \"Facade\"lari nomi bir xil bo'lsa-da, boshqa narsa — container servislariga statik proxy. Ikkalasini farqlash muhim: GoF Facade — dizayn qatlami, Laravel Facade — qulay sintaksis.",
        "",
        "```php",
        "final class Checkout",
        "{",
        "    public function __construct(private Inventory $inv, private PaymentGateway $pay, private Shipping $ship) {}",
        "",
        "    public function place(Cart $cart): Order { /* 3 ta quyi tizimni muvofiqlashtiradi */ }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bir nechta servisni chaqiradigan controller mantiqini GoF Facade (application service) ga ko'chiring.",
      acceptanceCriteria: [
        "GoF Facade va Laravel Facade farqini aniq tushuntira oladi",
        "Facade'ning \"god object\"ga aylanish xavfini biladi"
      ],
      prerequisites: [
        "2.9"
      ]
    },
    {
      id: "5.18",
      title: "Dependency Injection",
      description: [
        "Pattern sifatida DI — obyektga dependency'larni tashqaridan berish (constructor, setter, method). Inversion of Control'ning eng keng tarqalgan shakli: obyekt hamkorlarini o'zi qidirmaydi (service locator), ular unga beriladi.",
        "",
        "Laravel container DI'ni avtomatlashtiradi: controller, job, listener, command, middleware va `app()->call()` orqali chaqirilgan metodlarga dependency'lar avtomatik inject qilinadi.",
        "",
        "```php",
        "Route::get('/report', function (ReportService $reports, Request $request) {",
        "    return $reports->for($request->user());",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Service locator (`app()`, `resolve()`) ishlatilgan 3 ta joyni constructor injection'ga o'tkazing.",
      acceptanceCriteria: [
        "DI va service locator farqini kod bilan ko'rsata oladi",
        "`app()->call()` method injection'ni biladi"
      ],
      prerequisites: [
        "2.8"
      ]
    },
    {
      id: "5.19",
      title: "Pattern tanlash mezonlari",
      description: [
        "Pattern'ni tanlashdan oldin savollar: qaysi **aniq muammo** bor? Qaysi yo'nalishda o'zgarish kutilmoqda? Pattern kodni o'qishni osonlashtiradimi yoki qiyinlashtiradimi? Jamoa uni tanimaydimi?",
        "",
        "Amaliy yo'riqnoma: yaratish murakkab → Factory/Builder; algoritmlar almashinadi → Strategy; holatga bog'liq xatti-harakat → State; qo'shimcha cross-cutting xatti-harakat → Decorator/Middleware; tashqi tizim interfeysi mos emas → Adapter; reaksiya kerak, bog'liqlik emas → Observer/Event. Pattern muammo paydo bo'lganda refactoring orqali kiritiladi, oldindan emas.",
        "",
        "```text",
        "Muammo → O'zgarish o'qi → Eng sodda yechim → (kerak bo'lsa) Pattern",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihadagi 3 ta pattern qo'llanishini tahlil qiling: qaysi muammoni hal qiladi, soddaroq muqobil bormi?",
      acceptanceCriteria: [
        "Har bir asosiy pattern uchun \"qachon kerak\" mezonini ayta oladi",
        "Pattern'ni muammodan emas, \"chiroyli\" bo'lgani uchun tanlamaydi"
      ],
      prerequisites: [
        "5.1",
        "5.6",
        "5.7"
      ]
    },
    {
      id: "5.20",
      title: "Overengineering va ortiqcha abstraksiyadan qochish",
      description: [
        "Overengineering — hozir yo'q muammoni hal qilish: bitta implementatsiyali interfeyslar, har bir model uchun repository + service + DTO + interface, \"kelajakda kerak bo'ladi\" konfiguratsiyalari. Natija — sekin rivojlanish, ko'p fayl, qiyin onboarding.",
        "",
        "Tamoyillar: YAGNI, \"rule of three\" (uch marta takrorlanganda abstraksiya qiling), o'zgarish narxi arzon bo'lgan joyda sodda kod, abstraksiyani faqat haqiqiy o'zgarish o'qida qo'shish. Laravel'ning o'z imkoniyatlari (Eloquent, Facade, Event) ko'p hollarda yetarli.",
        "",
        "```text",
        "Savol: bu abstraksiyani olib tashlasam nima yo'qotaman?",
        "Javob \"hech narsa\" bo'lsa — olib tashlang.",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihadan bitta keraksiz abstraksiya qatlamini toping va olib tashlang; diff hajmi va o'qilishni solishtiring.",
      acceptanceCriteria: [
        "Ortiqcha abstraksiya belgilarini kod review'da ko'rsata oladi",
        "Soddalik va moslashuvchanlik o'rtasida asosli tanlov qiladi"
      ],
      prerequisites: [
        "6.6",
        "5.19"
      ]
    }
  ]
});
