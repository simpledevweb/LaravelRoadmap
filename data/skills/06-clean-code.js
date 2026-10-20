/* 06 · Clean Code
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 6,
  slug: "clean-code",
  title: "Clean Code",
  group: "code-quality",
  description: "Clean Code — kodni nafaqat kompyuter, balki **odamlar** uchun yozish san'ati. Kod bir marta yoziladi, lekin o'nlab marta o'qiladi. Senior dasturchi o'qiladigan, sodda va xavfsiz o'zgartiriladigan kod yozadi, jamoa uchun standartlar o'rnatadi va texnik qarzni ongli boshqaradi.",
  subskills: [
    {
      id: "6.1",
      title: "Meaningful Naming",
      description: [
        "Nom — eng arzon hujjat. Yaxshi nom maqsadni ochib beradi: `$d` o'rniga `$daysSinceLastLogin`, `process()` o'rniga `chargeOverdueInvoices()`. Boolean'lar savol shaklida: `isActive`, `hasPaid`, `canRefund`.",
        "",
        "Qoidalar: domen tilidan foydalaning (ubiquitous language), qisqartma va \"noise\" so'zlardan qoching (`Data`, `Info`, `Manager`), bir tushuncha uchun bitta so'z (`fetch`/`get`/`retrieve` aralashmasin). Laravel konvensiyalari: model — birlik (`Order`), jadval — ko'plik (`orders`), controller — `OrderController`.",
        "",
        "```php",
        "// Yomon",
        "$list = $this->get($u, true);",
        "// Yaxshi",
        "$unpaidInvoices = $this->invoices->unpaidFor($customer, includeOverdue: true);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta modulda 10 ta noaniq nomni toping va qayta nomlang (IDE rename refactoring bilan).",
      acceptanceCriteria: [
        "Nom orqali maqsadni ifodalay oladi",
        "Laravel nomlash konvensiyalariga amal qiladi"
      ],
      prerequisites: []
    },
    {
      id: "6.2",
      title: "Small and Focused Functions",
      description: [
        "Funksiya bitta ishni qilishi va uni yaxshi qilishi kerak. Kichik funksiya oson nomlanadi, o'qiladi va testlanadi. Belgi: funksiyani \"va\" so'zisiz tasvirlab bo'lmasa — u bir nechta ish qilyapti.",
        "",
        "Amaliy yo'riqnoma: bir abstraksiya darajasida qolish (yuqori darajadagi qadamlar va past darajadagi detallar aralashmasin), 3 tadan ko'p parametr bo'lsa — parametr obyekti, boolean flag parametrlar — ko'pincha ikki xil funksiya kerakligi belgisi.",
        "",
        "```php",
        "public function checkout(Cart $cart): Order",
        "{",
        "    $this->ensureCartIsNotEmpty($cart);",
        "    $order = $this->createOrderFrom($cart);",
        "    $this->reserveStock($order);",
        "    $this->notifyCustomer($order);",
        "    return $order;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "80+ qatorli metodni Extract Method bilan bir abstraksiya darajasidagi kichik metodlarga bo'ling.",
      acceptanceCriteria: [
        "Abstraksiya darajalarini aralashtirmaydi",
        "Boolean flag parametr muammosini tushuntira oladi"
      ],
      prerequisites: [
        "6.1"
      ]
    },
    {
      id: "6.3",
      title: "Single Responsibility",
      description: [
        "Clean Code kontekstida bitta mas'uliyat funksiya, class va modul darajasida qo'llanadi: har bir birlik bitta sababga ko'ra o'zgaradi. Bu o'zgarishlar ta'sir doirasini cheklaydi va konfliktlarni kamaytiradi.",
        "",
        "Belgilari: class nomi umumiy (`UserService`), ko'p dependency, testlar uchun ko'p setup, turli jamoalar bir faylni tahrirlaydi. Yechim — mas'uliyat bo'yicha ajratish: Action class'lar, alohida query obyektlari, formatter'lar.",
        "",
        "```php",
        "// Bir class — bir sabab",
        "final class CalculateCartTotal {}",
        "final class CartTotalFormatter {}",
        "final class PersistCart {}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta \"UserService\" ichidagi mas'uliyatlarni ro'yxatlang va har birini alohida class'ga ajrating.",
      acceptanceCriteria: [
        "SRP'ni funksiya va class darajasida qo'llaydi",
        "Mas'uliyatni o'zgarish sababi bilan aniqlaydi"
      ],
      prerequisites: [
        "4.1"
      ]
    },
    {
      id: "6.4",
      title: "DRY",
      description: [
        "DRY (Don't Repeat Yourself) — \"har bir bilim tizimda yagona, aniq ifodaga ega bo'lishi kerak\". Gap **bilim** (biznes qoida) takrorlanmasligi haqida, shunchaki bir xil ko'rinadigan kod haqida emas.",
        "",
        "Xato talqin: tasodifan o'xshash ikki kodni birlashtirish — ular keyin turli sabablarga ko'ra o'zgarganda, umumiy funksiya flag'lar va `if`lar bilan to'lib ketadi (\"wrong abstraction\"). Sandi Metz: \"Takrorlanish noto'g'ri abstraksiyadan arzonroq.\"",
        "",
        "```php",
        "// Biznes qoida bir joyda",
        "final class VatCalculator { public const RATE = 12; /* ... */ }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihada takrorlangan biznes qoidani (masalan, soliq hisoblash) toping va yagona joyga jamlang.",
      acceptanceCriteria: [
        "Bilim takrorlanishi va tasodifiy o'xshashlikni farqlay oladi",
        "\"Wrong abstraction\" xavfini tushuntira oladi"
      ],
      prerequisites: [
        "6.3"
      ]
    },
    {
      id: "6.5",
      title: "KISS",
      description: [
        "KISS (Keep It Simple, Stupid) — ishlaydigan eng sodda yechimni tanlang. Murakkablik — xatolar, sekin onboarding va qimmat o'zgarishlar manbai. Aqlli \"bir qatorli\" kod, keraksiz meta-programming va murakkab generics o'qishni qiyinlashtiradi.",
        "",
        "Sodda ≠ oson: sodda yechim ko'pincha chuqur tushunishni talab qiladi. Laravel'da birinchi navbatda framework'ning standart imkoniyatlaridan foydalaning, maxsus infratuzilmani faqat zarurat bo'lganda yozing.",
        "",
        "```php",
        "// Murakkab",
        "$r = array_reduce(array_filter($u, fn($x) => $x['a'] && !$x['b']), fn($c, $x) => $c + $x['p'], 0);",
        "// Sodda",
        "$total = collect($users)->where('active', true)->where('banned', false)->sum('points');",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Murakkab kod bo'lagini jamoadoshingizga tushuntiring; tushuntirish qiyin bo'lsa, soddalashtiring.",
      acceptanceCriteria: [
        "Soddalik va qisqalik farqini biladi",
        "Framework imkoniyatlarini maxsus yechimdan afzal ko'radi"
      ],
      prerequisites: []
    },
    {
      id: "6.6",
      title: "YAGNI",
      description: [
        "YAGNI (You Aren't Gonna Need It) — funksionallikni faqat haqiqatan kerak bo'lganda qo'shing. \"Kelajakda kerak bo'lishi mumkin\" kod — yozish, testlash, saqlash va tushunish narxiga ega, lekin hech qachon ishlatilmasligi mumkin.",
        "",
        "YAGNI yaxshi dizaynni rad etmaydi: kodni toza va o'zgartirishga oson saqlash — kelajakdagi talablarga eng yaxshi tayyorgarlik. Istisno — o'zgartirish juda qimmat bo'lgan qarorlar (DB sxemasi, ommaviy API shartnomasi), ularni oldindan o'ylash kerak.",
        "",
        "```text",
        "\"Keyinroq bir nechta valyuta bo'ladi\" → hozir bitta valyuta, lekin Money value object",
        "(arzon, keyin kengaytirish oson)",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihadagi ishlatilmayotgan konfiguratsiya, parametr yoki kod tarmog'ini toping va olib tashlang.",
      acceptanceCriteria: [
        "YAGNI va puxta dizayn o'rtasidagi muvozanatni tushuntira oladi",
        "Qaytarib bo'lmaydigan qarorlarni oldindan o'ylash kerakligini biladi"
      ],
      prerequisites: [
        "6.5"
      ]
    },
    {
      id: "6.7",
      title: "Separation of Concerns",
      description: [
        "Turli vazifalarni turli joyga ajratish: HTTP (controller, request), biznes mantiq (action, domain service), ma'lumotlarga kirish (model, repository), taqdimot (view, resource), infratuzilma (queue, mail, storage).",
        "",
        "Laravel'da tipik buzilishlar: Blade ichida so'rov va biznes mantiq, model ichida HTTP chaqiruvlar, controller'da SQL. Ajratish har qatlamni alohida o'zgartirish va testlash imkonini beradi.",
        "",
        "```text",
        "Request → FormRequest (validatsiya) → Controller (orkestratsiya)",
        "        → Action (biznes) → Model/Repository (ma'lumot) → Resource (javob)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Blade shablonidagi so'rov va hisoblashlarni view model yoki controller qatlamiga ko'chiring.",
      acceptanceCriteria: [
        "Qatlamlar va ularning mas'uliyatini aniq ayta oladi",
        "Concern'lar aralashgan kodni review'da aniqlaydi"
      ],
      prerequisites: [
        "mvc-architecture"
      ]
    },
    {
      id: "6.8",
      title: "Avoiding Code Duplication",
      description: [
        "Takroriy kodni kamaytirish usullari: Extract Method/Class, trait (ehtiyotkorlik bilan), Blade komponentlari, Eloquent scope'lar, Form Request'lar, macro'lar, base test case yordamchilari.",
        "",
        "Qachon birlashtirish kerak: kod bir xil **sabab** bilan o'zgaradi va kamida uch marta takrorlangan (rule of three). Qachon kerak emas: o'xshashlik tasodifiy yoki ikki kontekst mustaqil rivojlanadi. Copy-paste detektorlari (`phpcpd`) yordam beradi, lekin har bir topilma refactoring talab qilmaydi.",
        "",
        "```php",
        "// Takrorlangan where'lar o'rniga scope",
        "public function scopeActive(Builder $q): void { $q->where('status', 'active')->whereNull('banned_at'); }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Uch joyda takrorlangan so'rov shartini Eloquent scope'ga chiqaring.",
      acceptanceCriteria: [
        "Rule of three'ni qo'llaydi",
        "Takrorlanishni yo'qotish usullarining narx/foydasini biladi"
      ],
      prerequisites: [
        "6.4"
      ]
    },
    {
      id: "6.9",
      title: "Readability",
      description: [
        "O'qiladigan kod — yangi jamoadosh izohsiz tushunadigan kod. Omillar: aniq nomlar, izchil formatlash (PSR-12, Pint), qisqa funksiyalar, kam ichma-ichlik, \"sehrli raqamlar\" o'rniga konstanta, izohlar \"nima\" emas \"nega\"ni tushuntiradi.",
        "",
        "Laravel Pint, PHP-CS-Fixer va IDE'ning avtomatik formatlashi uslub bahslarini tugatadi — review'da mazmunga e'tibor qaratiladi.",
        "",
        "```php",
        "// Nega: bank API'si 30 soniyadan keyin sessiyani yopadi",
        "private const BANK_TIMEOUT_SECONDS = 25;",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Pint'ni loyihaga qo'shing, CI'da tekshiruvni yoqing va bitta faylni o'qilishi bo'yicha yaxshilang.",
      acceptanceCriteria: [
        "\"Nega\" izohlarini \"nima\" izohlaridan farqlaydi",
        "Avtomatik formatlashni jamoa jarayoniga kiritadi"
      ],
      prerequisites: [
        "8.6"
      ]
    },
    {
      id: "6.10",
      title: "Explicit Dependencies",
      description: [
        "Class o'ziga kerak bo'lgan hamma narsani constructor orqali e'lon qilishi kerak — shunda uning nimaga bog'liqligi bir qarashda ko'rinadi. Yashirin bog'liqliklar: global funksiyalar (`auth()`, `request()`, `now()`), statik chaqiruvlar, facade'lar, `app()` ichkarida.",
        "",
        "Yashirin bog'liqlik testda kutilmagan holat talab qiladi va qayta ishlatishni qiyinlashtiradi (masalan, `auth()->user()` queue job ichida `null`). Kerakli qiymatni parametr sifatida bering.",
        "",
        "```php",
        "// Yashirin: ichkarida auth()->user() va now()",
        "// Aniq:",
        "public function handle(User $actor, CarbonImmutable $at): void {}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ichida `auth()`, `request()` va `now()` ishlatilgan servis metodini aniq parametrlarga o'tkazing.",
      acceptanceCriteria: [
        "Yashirin bog'liqliklarni kodda aniqlaydi",
        "Queue kontekstida global holatning xavfini biladi"
      ],
      prerequisites: [
        "2.8"
      ]
    },
    {
      id: "6.11",
      title: "Guard Clauses",
      description: [
        "Guard clause — noto'g'ri yoki maxsus holatlarni funksiya boshida tekshirib, darhol qaytish yoki exception otish. Bu ichma-ich `if`lar \"o'qi\"ni (arrow anti-pattern) yo'q qiladi va asosiy oqimni chap chegarada saqlaydi.",
        "",
        "```php",
        "public function refund(Order $order): void",
        "{",
        "    if (! $order->isPaid()) {",
        "        throw new CannotRefund('To\\'lanmagan buyurtma');",
        "    }",
        "    if ($order->refunded_at !== null) {",
        "        return; // idempotent",
        "    }",
        "",
        "    $this->gateway->refund($order->payment_id);",
        "    $order->markRefunded();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "3 darajadan chuqur ichma-ich `if`li metodni guard clause'lar bilan tekislang.",
      acceptanceCriteria: [
        "Arrow anti-pattern'ini taniydi",
        "Guard clause'larni idempotentlik bilan birga qo'llay oladi"
      ],
      prerequisites: [
        "6.2"
      ]
    },
    {
      id: "6.12",
      title: "Code Smells",
      description: [
        "Code smell — chuqurroq muammo belgisi. Asosiylari: Long Method, Large Class, Long Parameter List, Feature Envy (boshqa class ma'lumotlari bilan ko'p ishlash), Data Clumps (doim birga yuradigan parametrlar), Primitive Obsession (value object o'rniga string/int), Shotgun Surgery (bir o'zgarish ko'p faylni talab qiladi), Divergent Change, Dead Code, Speculative Generality.",
        "",
        "Smell avtomatik xato emas — kontekstni baholash kerak. Har birining standart refactoring yechimi bor (Fowler katalogi).",
        "",
        "```php",
        "// Primitive Obsession + Data Clumps",
        "function ship(string $city, string $street, string $zip) {}",
        "// Yechim",
        "function ship(Address $address) {}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Kod bazasidan 5 xil smell topib, har biriga mos refactoring nomini yozing va bittasini bajaring.",
      acceptanceCriteria: [
        "Kamida 8 ta smell'ni nomi va belgisi bilan ayta oladi",
        "Smell'ni mos refactoring bilan bog'laydi"
      ],
      prerequisites: [
        "refactoring"
      ]
    },
    {
      id: "6.13",
      title: "Technical Debt",
      description: [
        "Texnik qarz — tezlik uchun qilingan murosaning kelajakdagi \"foizi\": har bir o'zgarish sekinlashadi va xavfliroq bo'ladi. Qarz ongli (deadline uchun) yoki ongsiz (bilim yetishmasligi), ehtiyotkor yoki beparvo bo'lishi mumkin (Fowler kvadranti).",
        "",
        "Boshqaruv: qarzni ko'rinadigan qilish (backlog, ADR), ta'sirni baholash (o'zgarish chastotasi × og'riq), har sprintda vaqt ajratish, \"boy scout rule\" (kodni topganingizdan toza qoldiring). Biznesga qarzni texnik emas, risk va tezlik tilida tushuntirish.",
        "",
        "```text",
        "Prioritet = O'zgarish chastotasi × Har o'zgarishdagi qo'shimcha vaqt × Risk",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihadagi 5 ta texnik qarzni ro'yxatlab, prioritet formulasi bilan baholang va backlog'ga qo'shing.",
      acceptanceCriteria: [
        "Texnik qarz kvadrantini tushuntira oladi",
        "Qarzni biznes tilida asoslay oladi"
      ],
      prerequisites: [
        "6.12"
      ]
    },
    {
      id: "6.14",
      title: "Maintainability",
      description: [
        "Saqlanuvchanlik — kodni tushunish, o'zgartirish, testlash va kengaytirish qanchalik oson. Ko'rsatkichlari: cyclomatic complexity, class/metod hajmi, coupling, test qamrovi, o'zgarish chastotasi va xato zichligi.",
        "",
        "Amaliyot: kichik modullar, aniq chegaralar, avtomatik testlar, statik tahlil (PHPStan), izchil konvensiyalar, yangilangan dependency'lar, hujjatlashtirilgan arxitektura qarorlari. Saqlanuvchanlik — tezlik va ishonchlilikka sarmoya.",
        "",
        "```bash",
        "vendor/bin/phpstan analyse --level=8",
        "vendor/bin/phpmetrics --report-html=build/metrics app/",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyiha uchun phpmetrics hisobotini yarating va eng murakkab 3 ta class bo'yicha yaxshilash rejasini tuzing.",
      acceptanceCriteria: [
        "Saqlanuvchanlik metrikalarini o'qiy oladi",
        "Metrikani maqsad emas, signal sifatida ishlatadi"
      ],
      prerequisites: [
        "6.12"
      ]
    },
    {
      id: "6.15",
      title: "Refactoring Safety",
      description: [
        "Xavfsiz refactoring — xatti-harakatni o'zgartirmasdan tuzilmani yaxshilash. Shartlar: avval testlar (yo'q bo'lsa — characterization test), kichik qadamlar, har qadamdan keyin testlar, IDE'ning avtomatik refactoring'lari (rename, extract), refactoring va funksional o'zgarishni alohida commit'larda.",
        "",
        "Qo'shimcha xavfsizlik: statik tahlil, feature flag'lar, bosqichma-bosqich deploy, \"strangler fig\" yondashuvi katta qismlar uchun.",
        "",
        "```text",
        "Yashil testlar → kichik o'zgarish → testlar → commit → takrorlash",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Testsiz legacy metodga characterization test yozing va keyin uni xavfsiz refactor qiling.",
      acceptanceCriteria: [
        "Refactoring va qayta yozish farqini biladi",
        "Characterization test yoza oladi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "6.16",
      title: "Clean Code va performance o‘rtasidagi muvozanat",
      description: [
        "Ko'p hollarda toza kod va tezlik ziddiyatda emas — haqiqiy muammolar algoritm, N+1, I/O va keshlashda bo'ladi, kichik abstraksiyalarda emas. \"Premature optimization is the root of all evil\" — avval o'lchang (profiling), keyin optimallashtiring.",
        "",
        "Ziddiyat bo'lganda (hot path, million qatorli batch, real-time) — optimallashtirilgan kodni izolyatsiya qiling, \"nega\"ni izohlang va benchmark bilan himoyalang. Qolgan kod o'qiladigan bo'lib qolsin.",
        "",
        "```php",
        "// Hot path: Eloquent o'rniga raw insert — izoh va benchmark bilan",
        "// Nega: 500k qator importida model hydration 40x sekinroq (benchmark: tests/Bench/ImportBench.php)",
        "DB::table('events')->insert($chunk);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta sekin endpoint'ni profiling qiling, toza kodni saqlagan holda tor joyni optimallashtiring.",
      acceptanceCriteria: [
        "Optimallashtirishdan oldin o'lchaydi",
        "Optimallashtirilgan kodni izolyatsiya qilib hujjatlashtiradi"
      ],
      prerequisites: [
        "53.1"
      ]
    }
  ]
});
