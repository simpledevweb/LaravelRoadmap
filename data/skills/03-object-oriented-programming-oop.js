/* 03 · Object-Oriented Programming (OOP)
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 3,
  slug: "object-oriented-programming-oop",
  title: "Object-Oriented Programming (OOP)",
  group: "code-quality",
  description: "Obyektga yo'naltirilgan dasturlash — Laravel va zamonaviy PHP kodining asosiy paradigmasi. Senior darajada OOP sintaksis emas, balki **dizayn qarorlari**: mas'uliyatni qayerga qo'yish, bog'liqliklarni qanday kamaytirish, qachon meros va qachon composition ishlatish. Yaxshi OOP kod o'zgarishga oson moslashadi va oson testlanadi.",
  subskills: [
    {
      id: "3.1",
      title: "Encapsulation",
      description: [
        "Encapsulation — obyektning ichki holatini yashirish va unga faqat aniq metodlar orqali kirish. Maqsad: **invariantlarni himoya qilish** — obyekt hech qachon noto'g'ri holatga tushmasligi kerak.",
        "",
        "Getter/setter'ni har bir property'ga avtomatik yozish encapsulation emas. To'g'ri yondashuv — xatti-harakat metodlari: `$order->setStatus('paid')` o'rniga `$order->markAsPaid($payment)`, u ichida barcha qoidalarni tekshiradi.",
        "",
        "```php",
        "final class BankAccount",
        "{",
        "    private int $balance = 0;",
        "",
        "    public function withdraw(int $amount): void",
        "    {",
        "        if ($amount > $this->balance) {",
        "            throw new InsufficientFunds();",
        "        }",
        "        $this->balance -= $amount;",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Public property'lar orqali o'zgartirilayotgan modelni xatti-harakat metodlariga o'tkazing.",
      acceptanceCriteria: [
        "\"Tell, don't ask\" tamoyilini tushuntira oladi",
        "Invariant tushunchasini misol bilan ko'rsata oladi"
      ],
      prerequisites: [
        "1.11"
      ]
    },
    {
      id: "3.2",
      title: "Abstraction",
      description: [
        "Abstraction — murakkablikni yashirib, faqat muhim narsani ko'rsatish. Chaqiruvchi kod \"nima qilinadi\"ni biladi, \"qanday\"ni emas: `$storage->put($file)` — fayl S3'gami yoki diskkami, ahamiyati yo'q.",
        "",
        "Abstraksiya interfeys yoki abstract class orqali ifodalanadi. Muhim — to'g'ri darajani tanlash: juda erta yoki \"har ehtimolga qarshi\" yaratilgan abstraksiya keraksiz murakkablik qo'shadi (YAGNI). Ikkinchi implementatsiya paydo bo'lganda abstraksiya qilish ko'pincha to'g'ri vaqt.",
        "",
        "```php",
        "interface SmsSender { public function send(PhoneNumber $to, string $text): void; }",
        "// Eskiz, PlayMobile, LogSender — barchasi bir xil abstraksiya ortida",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Tashqi SMS provayderiga to'g'ridan-to'g'ri bog'langan kodni abstraksiya ortiga yashiring.",
      acceptanceCriteria: [
        "Abstraksiya va encapsulation farqini tushuntira oladi",
        "\"Leaky abstraction\" misolini keltira oladi"
      ],
      prerequisites: [
        "3.1"
      ]
    },
    {
      id: "3.3",
      title: "Inheritance",
      description: [
        "Meros — \"is-a\" munosabati: `AdminUser extends User`. Bola class ota class kodini qayta ishlatadi va kengaytiradi. PHP faqat yagona merosni qo'llab-quvvatlaydi.",
        "",
        "Muammolar: chuqur ierarxiya, ota class'dagi o'zgarish barcha bolalarni buzishi (fragile base class), bolaga keraksiz metodlarning meros qolishi. Shu sabab ko'p zamonaviy kod bazalarida class'lar default `final` va meros faqat haqiqiy \"is-a\" va barqaror abstraksiya bo'lganda ishlatiladi. Laravel'da `Model`, `Controller`, `Command` merosi — framework kengaytirish nuqtalari.",
        "",
        "```php",
        "abstract class Notification { abstract public function via(): array; }",
        "final class OrderShipped extends Notification { public function via(): array { return ['mail']; } }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "3 darajali meros ierarxiyasini composition'ga refactor qiling va farqni tahlil qiling.",
      acceptanceCriteria: [
        "Fragile base class muammosini tushuntira oladi",
        "`final` class'ni default qilish sababini asoslay oladi"
      ],
      prerequisites: [
        "3.1"
      ]
    },
    {
      id: "3.4",
      title: "Polymorphism",
      description: [
        "Polymorphism — bir xil interfeys orqali turli xatti-harakat. Subtype polymorphism (interfeys/meros) PHP'da asosiy; chaqiruvchi kod konkret tipni bilmaydi.",
        "",
        "Amaliy foyda: `switch ($type)` zanjirlarini yo'q qiladi va yangi tur qo'shish mavjud kodni o'zgartirmasdan amalga oshadi (Open/Closed). Laravel'dagi misollar: turli cache driver'lar, queue connection'lar, notification kanallari, polymorphic Eloquent relation'lar.",
        "",
        "```php",
        "interface DiscountRule { public function apply(Money $price): Money; }",
        "",
        "$final = array_reduce($rules, fn (Money $p, DiscountRule $r) => $r->apply($p), $price);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Chegirma turlari bo'yicha `switch` ni polymorphic strategiyalarga almashtiring va yangi tur qo'shib ko'ring.",
      acceptanceCriteria: [
        "Polymorphism Open/Closed tamoyilini qanday qo'llab-quvvatlashini tushuntira oladi",
        "Laravel driver tizimini polymorphism misoli sifatida ko'rsata oladi"
      ],
      prerequisites: [
        "3.2"
      ]
    },
    {
      id: "3.5",
      title: "Composition over Inheritance",
      description: [
        "Tamoyil: kodni qayta ishlatish uchun meros o'rniga obyektlarni birlashtiring (\"has-a\"). Composition moslashuvchan — xatti-harakatni runtime'da almashtirish, alohida testlash va kombinatsiya qilish mumkin.",
        "",
        "Masalan, `CachedUserRepository extends UserRepository` o'rniga decorator: `new CachedUserRepository(new EloquentUserRepository(), $cache)`. Bu bir nechta \"qo'shimcha\"ni (cache, log, metrics) istalgan tartibda birlashtirish imkonini beradi.",
        "",
        "```php",
        "final class CachedRates implements ExchangeRates",
        "{",
        "    public function __construct(private ExchangeRates $inner, private CacheRepository $cache) {}",
        "",
        "    public function rate(string $pair): float",
        "    {",
        "        return $this->cache->remember(\"rate:$pair\", 300, fn () => $this->inner->rate($pair));",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Meros bilan qo'shilgan cache funksiyasini decorator composition'ga o'tkazing va container'da ulang.",
      acceptanceCriteria: [
        "Composition'ning testlash va moslashuvchanlikdagi afzalligini tushuntira oladi",
        "Merosni qachon baribir to'g'ri tanlov ekanini ayta oladi"
      ],
      prerequisites: [
        "3.3",
        "5.6"
      ]
    },
    {
      id: "3.6",
      title: "Interfaces va Abstract Classes",
      description: [
        "Interface — faqat shartnoma (holat yo'q), bir class ko'p interfeysni amalga oshiradi. Abstract class — umumiy holat va qisman implementatsiya, \"template\" sifatida. ",
        "",
        "Tanlov qoidasi: tip sifatida (parametr, qaytish, DI binding) doim **interfeys**; umumiy kodni ulashish kerak bo'lsa, interfeysni amalga oshiruvchi abstract base class qo'shish mumkin. Interfeyslar kichik va mijozga yo'naltirilgan bo'lishi kerak (ISP).",
        "",
        "```php",
        "interface Exporter { public function export(iterable $rows): string; }",
        "",
        "abstract class FileExporter implements Exporter",
        "{",
        "    final public function export(iterable $rows): string { return $this->write($this->header(), $rows); }",
        "    abstract protected function header(): array;",
        "    abstract protected function write(array $header, iterable $rows): string;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "CSV va XLSX eksport uchun interfeys + abstract base class dizaynini yozing.",
      acceptanceCriteria: [
        "Interfeys va abstract class'ni aniq mezon bilan tanlay oladi",
        "Laravel `Contracts` papkasining maqsadini tushuntira oladi"
      ],
      prerequisites: [
        "1.12"
      ]
    },
    {
      id: "3.7",
      title: "Object Composition",
      description: [
        "Object composition — murakkab xatti-harakatni kichik, bir vazifali obyektlardan yig'ish. Har bir obyekt o'z ishini qiladi, umumiy natija ularning hamkorligidan kelib chiqadi.",
        "",
        "Laravel'da misollar: pipeline (`Pipeline::send()->through([...])`), middleware zanjiri, query builder, notification kanallari. Composition dizaynida obyektlar bir-birini interfeys orqali bilishi va dependency'lar constructor'dan kelishi kerak.",
        "",
        "```php",
        "$order = Pipeline::send($order)",
        "    ->through([ApplyCoupon::class, CalculateTax::class, ReserveStock::class])",
        "    ->thenReturn();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Buyurtma narxini hisoblash jarayonini kichik pipeline bosqichlariga ajrating.",
      acceptanceCriteria: [
        "Pipeline pattern'ni Laravel misolida tushuntira oladi",
        "Har bir komponentni alohida testlay oladi"
      ],
      prerequisites: [
        "3.5"
      ]
    },
    {
      id: "3.8",
      title: "Association, Aggregation va Composition",
      description: [
        "Obyektlar orasidagi uch xil munosabat:",
        "- **Association** — umumiy \"biladi\" aloqasi (`Teacher` ↔ `Student`), hayot davrlari mustaqil.",
        "- **Aggregation** — \"butun–qism\", lekin qism mustaqil yashay oladi (`Team` va `Player`).",
        "- **Composition** — kuchli egalik: qism butunsiz mavjud emas (`Order` va `OrderLine`) — butun o'chsa, qism ham o'chadi.",
        "",
        "Bu farq DB dizaynida ham aks etadi: composition uchun `ON DELETE CASCADE` va bitta aggregate ichida saqlash, aggregation uchun `SET NULL` yoki pivot jadval.",
        "",
        "```php",
        "// Composition: OrderLine faqat Order orqali yaratiladi",
        "$order->addLine($product, qty: 2);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Domen modelingizdagi 5 ta munosabatni turini aniqlang va DB'dagi delete xatti-harakati bilan moslang.",
      acceptanceCriteria: [
        "Uch munosabatni hayot davri nuqtai nazaridan farqlay oladi",
        "Composition'ni DDD aggregate bilan bog'lay oladi"
      ],
      prerequisites: [
        "3.7",
        "14.4"
      ]
    },
    {
      id: "3.9",
      title: "Immutability",
      description: [
        "Immutable obyekt yaratilgandan keyin o'zgarmaydi; \"o'zgartirish\" yangi obyekt qaytaradi (`withX()` metodlari). PHP'da `readonly` property/class bunga yordam beradi. `DateTimeImmutable` va `CarbonImmutable` — klassik misol.",
        "",
        "Foydasi: yon ta'sirlar yo'q, obyektni xavfsiz ulashish mumkin, value object'lar uchun tabiiy. Mutable `Carbon` bilan `$start->addDay()` asl obyektni o'zgartirib, kutilmagan bug'lar beradi — Laravel'da `Date::use(CarbonImmutable::class)` bilan default'ni o'zgartirish mumkin.",
        "",
        "```php",
        "final readonly class Money",
        "{",
        "    public function __construct(public int $amount, public string $currency) {}",
        "    public function add(Money $o): self { return new self($this->amount + $o->amount, $this->currency); }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Mutable `Carbon` sabab bo'lgan bug'ni qayta yarating va `CarbonImmutable` bilan tuzating.",
      acceptanceCriteria: [
        "`readonly` va haqiqiy immutability farqini (ichki obyektlar) biladi",
        "Value object'lar nega immutable bo'lishi kerakligini tushuntira oladi"
      ],
      prerequisites: [
        "3.1"
      ]
    },
    {
      id: "3.10",
      title: "Object Lifecycle",
      description: [
        "Obyekt hayot davri: yaratish (`new`, factory, container) → ishlatish → havolalar yo'qolganda yo'q qilinish (`__destruct`). PHP-FPM'da so'rov tugashi bilan hamma narsa tozalanadi; long-running jarayonlarda esa obyektlar uzoq yashaydi.",
        "",
        "Laravel container'da hayot davri binding turiga bog'liq: `bind` — har safar yangi, `singleton` — jarayon davomida bitta, `scoped` — so'rov/job doirasida. Octane va queue worker'da singleton ichida foydalanuvchi holatini saqlash — so'rovlar orasida ma'lumot oqishiga olib keladi.",
        "",
        "```php",
        "$this->app->scoped(CurrentTenant::class); // har so'rovda qayta yaratiladi",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Singleton'da so'rov holati saqlangan servisni topib, `scoped` binding'ga o'tkazing va Octane'da test qiling.",
      acceptanceCriteria: [
        "Container binding turlarini hayot davri nuqtai nazaridan tushuntira oladi",
        "Destructor'ga tayanishning xavfini biladi"
      ],
      prerequisites: [
        "2.6",
        "1.22"
      ]
    },
    {
      id: "3.11",
      title: "Coupling va Cohesion",
      description: [
        "**Coupling** — modullarning bir-biriga bog'liqlik darajasi (past bo'lishi kerak). **Cohesion** — modul ichidagi elementlarning bitta maqsadga xizmat qilish darajasi (yuqori bo'lishi kerak).",
        "",
        "Yuqori coupling belgilari: bir joydagi o'zgarish ko'p faylni o'zgartirishni talab qiladi, class'ni alohida testlab bo'lmaydi. Past cohesion belgilari: `Helper`, `Utils`, `Manager` kabi \"hamma narsa\" class'lari. Coupling'ni kamaytirish: interfeyslar, event'lar, DI; cohesion'ni oshirish: mas'uliyat bo'yicha ajratish.",
        "",
        "```php",
        "// Past cohesion: UserService { register(), exportCsv(), sendBirthdayEmails(), resizeAvatar() }",
        "// Yuqori cohesion: RegisterUser, UserCsvExporter, BirthdayMailer, AvatarResizer",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Loyihadagi eng katta \"Service\" class'ini cohesion bo'yicha bir nechta class'ga ajrating.",
      acceptanceCriteria: [
        "Coupling va cohesion'ni kod misolida o'lchab ko'rsata oladi",
        "Afferent/efferent coupling tushunchasini biladi"
      ],
      prerequisites: [
        "3.7"
      ]
    },
    {
      id: "3.12",
      title: "Dependency Injection",
      description: [
        "OOP nuqtai nazaridan DI — obyekt o'z hamkorlarini yaratmaydi, balki ularni qabul qiladi. Bu Dependency Inversion tamoyilini amalga oshirish usuli: yuqori darajadagi kod abstraksiyaga bog'lanadi, konkret implementatsiyani esa tashqi \"kompozitsiya ildizi\" (Laravel'da service provider/container) tanlaydi.",
        "",
        "DI turlari: constructor (afzal), setter (ixtiyoriy dependency), method injection. Dependency'lar aniq ko'rinadi, obyektni testda fake bilan yaratish oson.",
        "",
        "```php",
        "final class CheckoutService",
        "{",
        "    public function __construct(",
        "        private PaymentGateway $gateway,",
        "        private OrderRepository $orders,",
        "        private ClockInterface $clock,",
        "    ) {}",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Vaqtga bog'liq kodni `ClockInterface` inject qilib deterministik testlanadigan qiling.",
      acceptanceCriteria: [
        "DI va DIP farqini tushuntira oladi",
        "Composition root tushunchasini biladi"
      ],
      prerequisites: [
        "2.8",
        "4.5"
      ]
    },
    {
      id: "3.13",
      title: "Object Contracts",
      description: [
        "Obyekt shartnomasi — uning va'dalari: qaysi kirishni qabul qiladi (preconditions), nimani kafolatlaydi (postconditions) va qaysi shartlar doim to'g'ri (invariants). Shartnoma tiplar, interfeys, docblock (`@throws`, generics) va guard clause'lar bilan ifodalanadi.",
        "",
        "Aniq shartnoma — chaqiruvchi kodni himoya qiladi va Liskov tamoyilini ta'minlaydi: implementatsiya shartnomani zaiflashtirmasligi kerak. Laravel `Illuminate\\Contracts` — framework servislarining rasmiy shartnomalari.",
        "",
        "```php",
        "interface Inventory",
        "{",
        "    /** @throws OutOfStock agar zaxira yetarli bo'lmasa */",
        "    public function reserve(Sku $sku, int $qty): Reservation; // $qty > 0",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Muhim interfeys uchun pre/postcondition'larni hujjatlashtiring va har biri uchun contract test yozing.",
      acceptanceCriteria: [
        "Precondition, postcondition va invariant'ni farqlay oladi",
        "Contract test (bir test to'plami barcha implementatsiyalar uchun) yoza oladi"
      ],
      prerequisites: [
        "3.6",
        "4.3"
      ]
    },
    {
      id: "3.14",
      title: "SOLID bilan bog‘liqligi",
      description: [
        "SOLID — OOP tamoyillarini amaliy qoidalarga aylantirgan to'plam: encapsulation va cohesion → **SRP**; polymorphism va abstraksiya → **OCP**; to'g'ri meros va shartnomalar → **LSP**; kichik interfeyslar → **ISP**; DI va abstraksiyaga tayanish → **DIP**.",
        "",
        "SOLID maqsad emas, vosita: u o'zgarishlarni arzonlashtirish uchun. Har bir qoidani mexanik qo'llash ortiqcha abstraksiya va keraksiz class'lar portlashiga olib keladi. Kodni qachon va qaysi yo'nalishda o'zgarishi kutilishini tahlil qilish — to'g'ri qo'llashning kaliti.",
        "",
        "```text",
        "Encapsulation + Cohesion  → SRP",
        "Polymorphism              → OCP",
        "Inheritance + Contracts   → LSP",
        "Abstraction               → ISP, DIP",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bitta modulni SOLID bo'yicha audit qiling: har bir buzilish uchun foyda/narx tahlili bilan.",
      acceptanceCriteria: [
        "Har bir SOLID tamoyilini OOP asosiga bog'lab tushuntira oladi",
        "SOLID'ni ortiqcha qo'llash xavfini biladi"
      ],
      prerequisites: [
        "solid-principles"
      ]
    }
  ]
});
