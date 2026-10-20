/* 04 · SOLID Principles
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 4,
  slug: "solid-principles",
  title: "SOLID Principles",
  group: "code-quality",
  description: "SOLID — Robert C. Martin tomonidan ommalashtirilgan beshta dizayn tamoyili. Ular kodni **o'zgarishga chidamli** qilish uchun: yangi talab kelganda mavjud kodni minimal buzib, yangi kod qo'shish. Senior dasturchi tamoyillarni yod biladi emas, balki buzilishlarni kod review'da ko'radi va ularni tuzatish narxini baholay oladi.",
  subskills: [
    {
      id: "4.1",
      title: "Single Responsibility Principle (SRP)",
      description: [
        "\"Class'ning o'zgarishi uchun faqat bitta sabab bo'lishi kerak.\" Sabab — bu odatda bitta manfaatdor tomon (aktor): buxgalteriya, marketing, admin. Agar hisobot formati va hisoblash formulasi bitta class'da bo'lsa, ikki xil jamoa talabi bir faylni o'zgartiradi.",
        "",
        "Laravel'da tipik buzilish — \"semiz\" controller yoki model: validatsiya, biznes qoida, email yuborish va PDF yaratish bir joyda. Yechim: Form Request, Action, Notification, alohida servis.",
        "",
        "```php",
        "// Yomon: InvoiceController@store hammasini qiladi",
        "// Yaxshi:",
        "final class IssueInvoice { public function handle(Order $o): Invoice { /* faqat biznes qoida */ } }",
        "final class InvoicePdfRenderer { public function render(Invoice $i): string { /* faqat PDF */ } }",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta katta controller metodini SRP bo'yicha 3–4 ta class'ga ajrating va har biriga test yozing.",
      acceptanceCriteria: [
        "\"O'zgarish sababi\" orqali SRP'ni tushuntira oladi",
        "SRP'ni \"bitta metod\" deb noto'g'ri talqin qilmaydi"
      ],
      prerequisites: [
        "3.11"
      ]
    },
    {
      id: "4.2",
      title: "Open/Closed Principle (OCP)",
      description: [
        "\"Kod kengaytirish uchun ochiq, o'zgartirish uchun yopiq bo'lishi kerak.\" Yangi xatti-harakat mavjud, testlangan kodni tahrirlamasdan — yangi class qo'shish orqali qo'shiladi.",
        "",
        "Vositalar: polymorphism (strategy), event'lar, plugin/driver tizimi, konfiguratsiya. Laravel o'zi OCP namunasi: `Cache::extend()`, `Auth::extend()`, yangi notification kanali — framework kodini o'zgartirmasdan.",
        "",
        "```php",
        "// Yangi to'lov usuli = yangi class + container'da ro'yxatga olish",
        "$this->app->tag([PaymeGateway::class, ClickGateway::class, UzumGateway::class], 'gateways');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "To'lov usullari uchun `match`/`switch` ni tagged binding'lar orqali kengaytiriladigan tizimga o'tkazing.",
      acceptanceCriteria: [
        "OCP qanday qilib regressiya xavfini kamaytirishini tushuntira oladi",
        "Kelajakda o'zgarmaydigan joyda OCP'ni ortiqcha qo'llamaydi"
      ],
      prerequisites: [
        "3.4"
      ]
    },
    {
      id: "4.3",
      title: "Liskov Substitution Principle (LSP)",
      description: [
        "\"Bola tipi ota tip o'rnida hech narsani buzmasdan ishlatilishi kerak.\" Ya'ni subclass ota shartnomasini zaiflashtirmasligi kerak: preconditionni kuchaytirmaslik, postconditionni zaiflashtirmaslik, kutilmagan exception otmaslik.",
        "",
        "Klassik buzilish: `Square extends Rectangle` yoki `ReadOnlyRepository extends Repository` da `save()` ichida `throw new LogicException`. Belgilari: `instanceof` tekshiruvlari va \"bu implementatsiyada ishlamaydi\" istisnolari.",
        "",
        "```php",
        "interface Cache { public function get(string $k): mixed; }",
        "// NullCache har doim null qaytaradi — shartnomaga mos, LSP saqlangan",
        "// LoggingCache get() ichida exception otsa — LSP buziladi",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Interfeysning barcha implementatsiyalari uchun bitta umumiy contract test to'plamini yozing.",
      acceptanceCriteria: [
        "LSP buzilishini `instanceof` belgisidan taniy oladi",
        "Covariant/contravariant tiplarni LSP bilan bog'lay oladi"
      ],
      prerequisites: [
        "3.13"
      ]
    },
    {
      id: "4.4",
      title: "Interface Segregation Principle (ISP)",
      description: [
        "\"Mijoz o'zi ishlatmaydigan metodlarga bog'liq bo'lmasligi kerak.\" Katta \"semiz\" interfeys o'rniga kichik, rolga yo'naltirilgan interfeyslar.",
        "",
        "Belgilari: implementatsiyalarda bo'sh metodlar yoki `throw new NotImplemented`. Laravel'da yaxshi misol — `Illuminate\\Contracts` dagi kichik shartnomalar: `Arrayable`, `Jsonable`, `Responsable`, `ShouldQueue` (marker interface).",
        "",
        "```php",
        "interface ReadsOrders  { public function find(int $id): ?Order; }",
        "interface WritesOrders { public function save(Order $o): void; }",
        "",
        "final class ReportService { public function __construct(private ReadsOrders $orders) {} }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Katta repository interfeysini o'qish va yozish interfeyslariga ajrating, mijozlarni moslang.",
      acceptanceCriteria: [
        "ISP buzilishini bo'sh implementatsiyalardan aniqlaydi",
        "Marker interfeyslarning (`ShouldQueue`) rolini biladi"
      ],
      prerequisites: [
        "3.6"
      ]
    },
    {
      id: "4.5",
      title: "Dependency Inversion Principle (DIP)",
      description: [
        "\"Yuqori darajadagi modullar quyi darajadagilarga bog'liq bo'lmasligi kerak; ikkalasi ham abstraksiyaga bog'liq bo'lishi kerak.\" Biznes mantiq (yuqori daraja) `PaymeHttpClient` ga emas, `PaymentGateway` interfeysiga tayanadi; interfeysni esa biznes qatlam \"egallaydi\".",
        "",
        "DIP — dizayn tamoyili, DI — uni amalga oshirish texnikasi, container — DI'ni avtomatlashtiruvchi vosita. DIP Clean/Hexagonal arxitekturaning asosi.",
        "",
        "```php",
        "// Domain qatlami",
        "interface PaymentGateway { public function charge(Money $m): PaymentId; }",
        "// Infrastructure qatlami",
        "final class PaymeGateway implements PaymentGateway { /* HTTP */ }",
        "// Provider",
        "$this->app->bind(PaymentGateway::class, PaymeGateway::class);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Domen servisidagi to'g'ridan-to'g'ri `Http::` chaqiruvlarini interfeys ortiga oling va fake bilan testlang.",
      acceptanceCriteria: [
        "DIP, DI va IoC container farqini aniq ayta oladi",
        "Interfeysni kim \"egallashi\" kerakligini tushuntira oladi"
      ],
      prerequisites: [
        "3.12"
      ]
    },
    {
      id: "4.6",
      title: "Violationlarni aniqlash",
      description: [
        "SOLID buzilishlarining amaliy belgilari:",
        "- **SRP**: 300+ qatorli class, nomida \"And\"/\"Manager\", ko'p jamoa bir faylni o'zgartiradi.",
        "- **OCP**: har yangi tur uchun `switch`/`if` ga yangi tarmoq qo'shiladi.",
        "- **LSP**: `instanceof` tekshiruvlari, `NotSupportedException`.",
        "- **ISP**: bo'sh metod implementatsiyalari.",
        "- **DIP**: biznes kod ichida `new`, statik chaqiruvlar, `Http::`, `DB::`.",
        "",
        "Vositalar: PHPStan/Larastan, PHPMD, `phpmetrics`, Deptrac (qatlam qoidalari), git churn tahlili (tez-tez o'zgaradigan fayllar).",
        "",
        "```bash",
        "vendor/bin/deptrac analyse   # Domain → Infrastructure bog'liqligini taqiqlash",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihadagi 5 ta eng ko'p o'zgargan faylni (git log) SOLID buzilishlari bo'yicha tahlil qiling.",
      acceptanceCriteria: [
        "Har bir tamoyil buzilishining 2 ta belgisini ayta oladi",
        "Statik tahlil vositalari bilan buzilishlarni avtomatik aniqlaydi"
      ],
      prerequisites: [
        "4.1",
        "4.2",
        "4.3",
        "4.4",
        "4.5"
      ]
    },
    {
      id: "4.7",
      title: "Refactoring orqali SOLID qo‘llash",
      description: [
        "SOLID'ni mavjud kodga bosqichma-bosqich, xatti-harakatni o'zgartirmasdan qo'llash: avval xarakterizatsiya testlari, keyin kichik qadamlar — Extract Class (SRP), Replace Conditional with Polymorphism (OCP), Extract Interface (ISP/DIP), Introduce Parameter Object.",
        "",
        "Muhim: refactoring'ni funksional o'zgarishlardan alohida commit/PR'da qilish, eng ko'p o'zgaradigan va eng ko'p xato beradigan joydan boshlash. Hech qachon o'zgarmaydigan legacy kodni \"SOLID qilish\" — ko'pincha vaqt isrofi.",
        "",
        "```text",
        "1. Testlar bilan joriy xatti-harakatni qotirish",
        "2. Extract Method → Extract Class",
        "3. Interfeys ajratish, DI orqali ulash",
        "4. Har qadamdan keyin testlar yashil",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Legacy servisni xarakterizatsiya testlari bilan qoplab, 3 ta kichik refactoring PR'ga ajrating.",
      acceptanceCriteria: [
        "Refactoring'ni xatti-harakatni saqlagan holda bosqichma-bosqich bajaradi",
        "Qayerni refactor qilishni churn va xato statistikasi bilan asoslaydi"
      ],
      prerequisites: [
        "4.6",
        "refactoring"
      ]
    },
    {
      id: "4.8",
      title: "SOLID va Laravel Service Container",
      description: [
        "Container SOLID'ni amalda qo'llashni osonlashtiradi: interfeys → implementatsiya binding'i (DIP), contextual binding (bir interfeys, turli kontekst), tagged binding'lar (OCP — yangi implementatsiya ro'yxatga qo'shiladi), decorator'lar (`extend()`) va kichik shartnomalar (ISP).",
        "",
        "Ehtiyot: container'ni service locator sifatida ishlatish (`app(X::class)` biznes kod ichida) DIP'ni buzadi va bog'liqliklarni yashiradi.",
        "",
        "```php",
        "$this->app->bind(OrderRepository::class, EloquentOrderRepository::class);",
        "$this->app->extend(OrderRepository::class, fn ($repo, $app) =>",
        "    new CachedOrderRepository($repo, $app['cache.store']));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Repository'ga container `extend()` orqali cache decorator qo'shing, chaqiruvchi kodni o'zgartirmasdan.",
      acceptanceCriteria: [
        "Container imkoniyatlarini har bir SOLID tamoyiliga moslay oladi",
        "Service locator anti-pattern'idan qochadi"
      ],
      prerequisites: [
        "2.6",
        "4.5"
      ]
    }
  ]
});
