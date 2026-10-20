/* 26 · Pest
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 26,
  slug: "pest",
  title: "Pest",
  group: "testing",
  description: "Pest — PHPUnit ustiga qurilgan, sodda va ifodali sintaksisli test freymvorki; Laravel jamoasi tomonidan faol qo'llab-quvvatlanadi va yangi Laravel loyihalarida default tanlov. Pest testlarni qisqa va o'qiladigan qiladi, expectation API, dataset'lar, arxitektura testlari va plaginlar beradi — shu bilan birga PHPUnit bilan to'liq mos.",
  subskills: [
    {
      id: "26.1",
      title: "Pest Syntax",
      description: [
        "Pest testlari closure'lar: `test('...', function () { ... })` yoki `it('...', fn () => ...)`. Class yozish shart emas — fayl darajasida funksiyalar. `$this` orqali Laravel TestCase metodlariga kirish (`$this->getJson()`), `uses()` yoki `pest()->extend()` bilan bazaviy class va trait'lar (`Pest.php` da).",
        "",
        "Expectation zanjiri: `expect($value)->toBe(5)->not->toBeNull()`. Hamma narsa PHPUnit'ga kompilyatsiya qilinadi — PHPUnit konfiguratsiyasi, coverage va CI integratsiyasi o'zgarishsiz ishlaydi.",
        "",
        "```php",
        "// tests/Pest.php",
        "pest()->extend(Tests\\TestCase::class)->use(RefreshDatabase::class)->in('Feature');",
        "",
        "// tests/Feature/OrderTest.php",
        "it('creates an order', function () {",
        "    $this->postJson('/api/orders', validOrderPayload())->assertCreated();",
        "    expect(Order::count())->toBe(1);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Uchta PHPUnit testini Pest sintaksisiga o'tkazib, o'qilishini solishtiring.",
      acceptanceCriteria: [
        "Pest test sintaksisini va `Pest.php` konfiguratsiyasini biladi",
        "Pest PHPUnit ustida ishlashini tushunadi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "26.2",
      title: "`it()` va `test()`",
      description: [
        "`test('description')` — erkin tavsif; `it('does something')` — tavsif avtomatik \"it \" bilan boshlanadi va gapday o'qiladi: `it('rejects expired tokens')`. Funksional farq yo'q — uslub masalasi; jamoada bittasini izchil ishlating (BDD uslubi uchun `it`).",
        "",
        "Qo'shimcha: `describe('Checkout', fn () => ...)` — testlarni guruhlash va umumiy `beforeEach`; `->skip()`, `->todo()`, `->only()` (lokal debug — commit qilmang), `->group('slow')`, `->throws(Exception::class)`.",
        "",
        "```php",
        "describe('refunds', function () {",
        "    beforeEach(fn () => $this->order = Order::factory()->paid()->create());",
        "",
        "    it('refunds a paid order', fn () => /* ... */);",
        "    it('rejects refund twice', fn () => /* ... */)->throws(AlreadyRefunded::class);",
        "    test('partial refund')->todo();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bir modul testlarini `describe` bloklari va izchil `it()` tavsiflari bilan qayta tashkil qiling.",
      acceptanceCriteria: [
        "`it` va `test` farqini (faqat uslub) biladi",
        "`describe`, `todo`, `skip` ni to'g'ri ishlatadi"
      ],
      prerequisites: [
        "26.1"
      ]
    },
    {
      id: "26.3",
      title: "Expectations",
      description: [
        "Expectation API: `expect($x)->toBe()` (===), `toEqual()` (==), `toBeTrue()`, `toBeNull()`, `toBeInstanceOf()`, `toHaveCount()`, `toContain()`, `toHaveKey()`, `toMatchArray()`, `toBeBetween()`, `toThrow()`, `toMatch()` (regex), `toBeJson()`. Inkor — `->not->`. Zanjir — bitta qiymat bo'yicha bir nechta tekshiruv; `->and($other)` — boshqa qiymatga o'tish.",
        "",
        "Kolleksiyalar uchun `->each->toBeInt()`, `->sequence(fn ($e) => ..., ...)`. Laravel modellari uchun `toBeModel` kabi plagin expectation'lar.",
        "",
        "```php",
        "expect($order->fresh())",
        "    ->status->toBe(OrderStatus::Paid)",
        "    ->total->toBe(150_000)",
        "    ->items->toHaveCount(3)",
        "    ->and($customer->fresh()->orders_count)->toBe(1);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Assertion'lari ko'p bo'lgan testni expectation zanjiri bilan qayta yozing.",
      acceptanceCriteria: [
        "Asosiy expectation'larni biladi",
        "Zanjir va `and()` dan o'qiladigan foydalanadi"
      ],
      prerequisites: [
        "26.1"
      ]
    },
    {
      id: "26.4",
      title: "Datasets",
      description: [
        "Dataset — Pest'ning data provider'i: `->with([...])` inline yoki `dataset('name', [...])` nomlangan va qayta ishlatiladigan (`tests/Datasets/`). Kalitli massivlar holat nomini beradi; closure'lar lazy baholanadi (factory'ni dataset ichida xavfsiz ishlatish uchun). Bir nechta dataset kombinatsiyasi — dekart ko'paytma.",
        "",
        "```php",
        "dataset('invalid emails', [",
        "    'no at'     => 'ali.example.uz',",
        "    'no domain' => 'ali@',",
        "    'spaces'    => 'ali @ex.uz',",
        "]);",
        "",
        "it('rejects invalid email', function (string $email) {",
        "    $this->postJson('/api/register', ['email' => $email] + validUser())",
        "        ->assertJsonValidationErrorFor('email');",
        "})->with('invalid emails');",
        "",
        "it('works for every role', fn (User $u) => /* ... */)",
        "    ->with(fn () => [User::factory()->admin()->create(), User::factory()->manager()->create()]);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Validatsiya testlari uchun nomlangan dataset'lar yarating va ularni bir nechta testda qayta ishlating.",
      acceptanceCriteria: [
        "Inline va nomlangan dataset'larni ishlatadi",
        "Lazy closure'lar zarurligini biladi"
      ],
      prerequisites: [
        "25.4"
      ]
    },
    {
      id: "26.5",
      title: "Hooks",
      description: [
        "Hook'lar: `beforeEach()` / `afterEach()` — har testdan oldin/keyin; `beforeAll()` / `afterAll()` — fayl bo'yicha bir marta (ilova hali yuklanmagan bo'lishi mumkin — Laravel funksiyalarini ehtiyotkorlik bilan). `describe` ichidagi hook'lar faqat shu guruhga tegishli.",
        "",
        "`Pest.php` da global hook'lar: `pest()->beforeEach(...)->in('Feature')`. `$this->` orqali hook va test o'rtasida ma'lumot uzatish. Ko'p setup — testni o'qishni qiyinlashtiradi; test o'zi uchun muhim narsani o'zida ko'rsatsin.",
        "",
        "```php",
        "beforeEach(function () {",
        "    $this->user = User::factory()->create();",
        "    $this->actingAs($this->user);",
        "});",
        "",
        "afterEach(fn () => Carbon::setTestNow());",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Global va `describe` darajasidagi hook'lar bilan takrorlanuvchi setup'ni kamaytiring.",
      acceptanceCriteria: [
        "Hook turlarining bajarilish vaqtini biladi",
        "`beforeAll` dagi cheklovlarni tushunadi"
      ],
      prerequisites: [
        "26.2"
      ]
    },
    {
      id: "26.6",
      title: "Custom Expectations",
      description: [
        "O'z expectation'laringiz — domen tilida tekshiruvlar: `expect()->extend('toBeValidPhone', function () { ... return $this; })`. Takrorlanuvchi murakkab assertion'larni bir joyga jamlaydi va testlarni o'qiladigan qiladi: `expect($order)->toBePaid()`.",
        "",
        "`Pest.php` yoki alohida faylda e'lon qilinadi; `$this->value` — tekshirilayotgan qiymat; ichida boshqa expectation'larni chaqirish mumkin. `expect()->intercept()`/`pipe()` mavjud expectation xatti-harakatini o'zgartiradi.",
        "",
        "```php",
        "expect()->extend('toBePaid', function () {",
        "    expect($this->value)",
        "        ->status->toBe(OrderStatus::Paid)",
        "        ->paid_at->not->toBeNull();",
        "    return $this;",
        "});",
        "",
        "expect($order->fresh())->toBePaid();",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Domeningiz uchun 3 ta custom expectation yozing va testlarni ularga o'tkazing.",
      acceptanceCriteria: [
        "Custom expectation yarata oladi",
        "Domen tilida o'qiladigan testlar yozadi"
      ],
      prerequisites: [
        "26.3"
      ]
    },
    {
      id: "26.7",
      title: "Plugins",
      description: [
        "Pest plaginlari funksionallikni kengaytiradi: `pest-plugin-laravel` (Laravel yordamchilari, `artisan` buyruqlari), `pest-plugin-arch` (arxitektura testlari — v3 da o'rnatilgan), `pest-plugin-faker`, `pest-plugin-livewire`, `pest-plugin-type-coverage` (tip deklaratsiyalari qamrovi), `pest-plugin-mutate` (mutation testing), `pest-plugin-watch`, `pest-plugin-stressless` (load test).",
        "",
        "O'z plaginingizni yozish ham mumkin (custom expectation va funksiyalar to'plami). Plaginlar versiyasi Pest versiyasiga mos bo'lishi kerak.",
        "",
        "```bash",
        "composer require pestphp/pest-plugin-type-coverage --dev",
        "./vendor/bin/pest --type-coverage --min=95",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Type coverage plaginini qo'shib, tip qamrovi past bo'lgan fayllarni yaxshilang.",
      acceptanceCriteria: [
        "Asosiy Pest plaginlarini va vazifasini biladi",
        "Plagin versiyalari mosligini kuzatadi"
      ],
      prerequisites: [
        "26.1"
      ]
    },
    {
      id: "26.8",
      title: "Architecture Testing",
      description: [
        "Arxitektura testlari kod tuzilmasi qoidalarini avtomatik tekshiradi: `arch()->expect('App\\Models')->toExtend(Model::class)`, `->not->toUse('Illuminate\\Support\\Facades\\DB')` (domen qatlami DB'ga bog'liq emas), `->toBeFinal()`, `->toHaveSuffix('Controller')`, `->not->toBeUsed()` (debug funksiyalari — `dd`, `dump`, `ray`). Preset'lar: `arch()->preset()->php()`, `->security()`, `->laravel()`, `->strict()`.",
        "",
        "Bu jamoa kelishuvlarini code review o'rniga CI'da ta'minlaydi va arxitektura eroziyasining oldini oladi.",
        "",
        "```php",
        "arch('domain is framework-agnostic')",
        "    ->expect('App\\Domain')",
        "    ->not->toUse(['Illuminate\\Support\\Facades', 'Illuminate\\Http']);",
        "",
        "arch('no debugging leftovers')->expect(['dd', 'dump', 'ray', 'var_dump'])->not->toBeUsed();",
        "arch()->preset()->laravel();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyiha uchun 5 ta arxitektura qoidasini Pest arch testlari sifatida yozing va CI'ga qo'shing.",
      acceptanceCriteria: [
        "Arxitektura qoidalarini kod bilan ifodalaydi",
        "Preset'lardan foydalanadi"
      ],
      prerequisites: [
        "61.6"
      ]
    },
    {
      id: "26.9",
      title: "Laravel Plugin",
      description: [
        "`pestphp/pest-plugin-laravel` Laravel yordamchilarini funksiya sifatida beradi: `actingAs()`, `get()`, `postJson()`, `assertDatabaseHas()`, `travelTo()`, `mock()` — `$this->` siz. Artisan buyruqlari: `php artisan pest:test OrderTest`, `pest:dataset`.",
        "",
        "Funksional uslub testlarni yanada qisqartiradi, lekin jamoada `$this->` yoki funksiya uslubini izchil tanlash kerak.",
        "",
        "```php",
        "use function Pest\\Laravel\\{actingAs, postJson, assertDatabaseHas};",
        "",
        "it('stores an order', function () {",
        "    actingAs(User::factory()->create());",
        "    postJson('/api/orders', validOrderPayload())->assertCreated();",
        "    assertDatabaseHas('orders', ['status' => 'pending']);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel plagini funksiyalari bilan bir feature test faylini qayta yozing va uslubni jamoa bilan kelishing.",
      acceptanceCriteria: [
        "Laravel plagin funksiyalarini ishlatadi",
        "Uslubni izchil tanlaydi"
      ],
      prerequisites: [
        "26.1"
      ]
    },
    {
      id: "26.10",
      title: "HTTP Tests",
      description: [
        "Pest'da HTTP testlari Laravel'ning test client'idan foydalanadi: `$this->getJson()`, `postJson()`, `putJson()`, `deleteJson()`, `withHeaders()`, `withToken()`, `actingAs()`. Javob tekshiruvlari: `assertOk()`, `assertCreated()`, `assertUnprocessable()`, `assertJsonPath()`, `assertJsonStructure()`, `assertJsonValidationErrors()`, `assertJsonCount()`; Pest'da `expect($response->json('data.status'))->toBe('paid')`.",
        "",
        "Har endpoint uchun: muvaffaqiyat, validatsiya, autentifikatsiya, avtorizatsiya, chekka holatlar.",
        "",
        "```php",
        "it('lists only own orders', function () {",
        "    $me = User::factory()->has(Order::factory()->count(2))->create();",
        "    Order::factory()->count(3)->create();",
        "",
        "    $this->actingAs($me)->getJson('/api/orders')",
        "        ->assertOk()",
        "        ->assertJsonCount(2, 'data');",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta resurs endpoint'lari uchun Pest HTTP testlari to'plamini yozing.",
      acceptanceCriteria: [
        "HTTP so'rov va javob tekshiruvlarini biladi",
        "Har endpoint uchun asosiy holatlarni qamraydi"
      ],
      prerequisites: [
        "18.20"
      ]
    },
    {
      id: "26.11",
      title: "Database Tests",
      description: [
        "Pest'da DB testlari: `uses(RefreshDatabase::class)` (yoki `Pest.php` da global), factory'lar, `assertDatabaseHas`, `expect(Model::count())->toBe(n)`, `expect($model->fresh())->...` (DB'dan qayta o'qish — keshlangan obyektga ishonmaslik).",
        "",
        "Laravel 11+ da `LazilyRefreshDatabase` — faqat DB ishlatadigan testlar uchun migratsiya. Parallel testlarda har jarayon o'z DB'siga ega (`app_test_1`, `app_test_2`) — avtomatik.",
        "",
        "```php",
        "uses(RefreshDatabase::class);",
        "",
        "it('soft deletes a product', function () {",
        "    $product = Product::factory()->create();",
        "    $this->actingAs(admin())->deleteJson(\"/api/products/{$product->id}\")->assertNoContent();",
        "    expect($product->fresh()->trashed())->toBeTrue();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "DB bilan ishlovchi testlarni `fresh()` va DB assertion'lari bilan ishonchli qiling.",
      acceptanceCriteria: [
        "DB trait'larini to'g'ri tanlaydi",
        "`fresh()` zarurligini tushunadi"
      ],
      prerequisites: [
        "25.13"
      ]
    },
    {
      id: "26.12",
      title: "Mocking",
      description: [
        "Pest'da mock: Mockery orqali `mock(Service::class)->expect(charge: fn ($m) => new Receipt('r1'))` (Pest uslubi), yoki Laravel `$this->mock()`, `$this->spy()`. Laravel fake'lari: `Http::fake()`, `Queue::fake()`, `Event::fake()`, `Mail::fake()`, `Notification::fake()`, `Storage::fake()`, `Bus::fake()`.",
        "",
        "Qoida: tashqi chegaralarni (HTTP, to'lov, SMS) fake/mock qiling, ichki domen mantiqni emas. `Http::preventStrayRequests()` — fake qilinmagan haqiqiy so'rovni taqiqlaydi (testlar tasodifan tashqi API'ga murojaat qilmasligi uchun).",
        "",
        "```php",
        "beforeEach(fn () => Http::preventStrayRequests());",
        "",
        "it('charges via gateway', function () {",
        "    Http::fake(['api.payme.uz/*' => Http::response(['result' => ['state' => 2]])]);",
        "    app(PaymeGateway::class)->charge(Money::uzs(150_000));",
        "    Http::assertSent(fn ($r) => $r['params']['amount'] === 15_000_000);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tashqi API chaqiruvlarini `Http::fake` bilan qoplab, `preventStrayRequests` ni global yoqing.",
      acceptanceCriteria: [
        "Laravel fake'lari va Mockery'ni o'rinli ishlatadi",
        "Tasodifiy tashqi so'rovlarning oldini oladi"
      ],
      prerequisites: [
        "25.7"
      ]
    },
    {
      id: "26.13",
      title: "Parallel Testing",
      description: [
        "`./vendor/bin/pest --parallel` yoki `php artisan test --parallel --processes=8` — testlar bir nechta jarayonda (ParaTest asosida). Katta to'plamlar uchun vaqtni bir necha baravar qisqartiradi.",
        "",
        "Talablar: testlar izolyatsiyalangan (umumiy fayl, kesh kaliti, port, tashqi resurs yo'q); Laravel har jarayonga alohida test DB yaratadi (`ParallelTesting::setUpProcess()` hook'lari bilan qo'shimcha resurslar); `ParallelTesting::token()` — jarayon identifikatori (masalan, alohida Redis prefiks yoki storage papka uchun).",
        "",
        "```php",
        "ParallelTesting::setUpTestDatabase(function (string $database, int $token) {",
        "    Artisan::call('db:seed', ['--class' => ReferenceDataSeeder::class]);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Test to'plamini parallel rejimga o'tkazing, umumiy resurs muammolarini tuzating va vaqtni solishtiring.",
      acceptanceCriteria: [
        "Parallel testlar talablarini biladi",
        "Jarayon token'i bilan resurslarni ajratadi"
      ],
      prerequisites: [
        "25.14"
      ]
    },
    {
      id: "26.14",
      title: "Pest va PHPUnit interoperability",
      description: [
        "Pest PHPUnit ustida ishlaydi: bir loyihada PHPUnit class testlari va Pest funksional testlari birga yashaydi; `phpunit.xml` umumiy; PHPUnit assertion'lari Pest testlarida `$this->assert...` orqali ishlaydi; `--filter`, coverage, JUnit hisobotlari bir xil.",
        "",
        "Migratsiya: `pestphp/pest-plugin-drift` PHPUnit testlarini avtomatik Pest'ga o'giradi; bosqichma-bosqich — yangi testlar Pest'da, eskilar o'tganda konvertatsiya. Base TestCase'dagi yordamchi metodlar ikkalasida ishlaydi.",
        "",
        "```bash",
        "composer require pestphp/pest-plugin-drift --dev",
        "./vendor/bin/pest --drift tests/Unit",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Bitta test papkasini drift bilan Pest'ga o'tkazib, natijani qo'lda tozalang.",
      acceptanceCriteria: [
        "Ikkala freymvork bir loyihada ishlashini biladi",
        "Bosqichma-bosqich migratsiya strategiyasini qo'llaydi"
      ],
      prerequisites: [
        "26.1"
      ]
    },
    {
      id: "26.15",
      title: "Test Organization",
      description: [
        "Testlarni tashkil qilish: papka tuzilmasi ilova tuzilmasini aks ettiradi (`tests/Feature/Api/Orders/`, `tests/Unit/Domain/Billing/`), fayl bo'yicha bitta mavzu, `describe` bilan guruhlash, umumiy yordamchilar (`tests/Helpers.php` — `validOrderPayload()`, `admin()`), dataset'lar `tests/Datasets/`, fixture'lar `tests/Fixtures/`.",
        "",
        "Nomlash: test tavsifi xatti-harakatni biznes tilida ifodalaydi — muvaffaqiyatsiz bo'lganda nima buzilgani darhol tushunarli. Testlar ham kod — refactoring, takrorlanishni kamaytirish va review talab qiladi.",
        "",
        "```text",
        "tests/",
        "  Feature/Api/Orders/CreateOrderTest.php",
        "  Unit/Domain/Billing/InvoiceNumberTest.php",
        "  Datasets/Emails.php",
        "  Fixtures/payme/perform.json",
        "  Helpers.php",
        "  Pest.php",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Test papkalarini ilova tuzilmasiga moslab qayta tashkil qiling va umumiy yordamchilarni ajrating.",
      acceptanceCriteria: [
        "Test tuzilmasini ilovaga moslaydi",
        "Testlarni ham kod sifatida saqlaydi"
      ],
      prerequisites: [
        "26.2"
      ]
    },
    {
      id: "26.16",
      title: "CI Integration",
      description: [
        "Pest CI'da: `./vendor/bin/pest --ci` (`only()` qolib ketgan bo'lsa xato beradi), `--parallel`, `--coverage --min=80`, `--type-coverage --min=90`, `--log-junit`, sharding (`--shard=1/4` — katta to'plamni bir nechta CI job'iga bo'lish). Arch testlari ham shu pipeline'da.",
        "",
        "Fikr-mulohaza tezligi: tez testlar birinchi, `--bail` (birinchi xatoda to'xtash — lokal uchun), `--dirty` (faqat o'zgargan fayllar testlari — lokal).",
        "",
        "```yaml",
        "strategy:",
        "  matrix: { shard: [1, 2, 3, 4] }",
        "steps:",
        "  - run: ./vendor/bin/pest --ci --parallel --shard=${{ matrix.shard }}/4",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "CI'da Pest testlarini 4 ta shard'ga bo'lib, umumiy vaqtni kamaytiring.",
      acceptanceCriteria: [
        "`--ci`, `--shard`, `--parallel` opsiyalarini biladi",
        "Coverage va type coverage chegaralarini CI'da qo'llaydi"
      ],
      prerequisites: [
        "25.17"
      ]
    },
    {
      id: "26.17",
      title: "Pest Architecture Testing va Mutation Testing",
      description: [
        "**Pest Architecture Testing (`arch()`)** — jamoa a'zolari belgilangan arxitektura va kodlash qoidalarini buzmasligini CI'da qat'iy tekshiruvchi ajoyib vosita. Manual code review o'rniga qoidalarni avtomatlashtiradi.",
        "",
        "**Asosiy qoidalar**:",
        "- Model'lar, DTO yoki Enum'lar qat'iy tiplangan bo'lishi: `arch()->expect('App\\Models')->toExtend(Model::class);`",
        "- Controller ichida xom DB so'rovlar bo'lmasligi: `arch()->expect('App\\Http\\Controllers')->not->toUse('Illuminate\\Support\\Facades\\DB');`",
        "- Maxfiy debug funksiyalar (dd, dump, ray) kodda qolib ketmasligi: `arch()->expect(['dd', 'dump', 'ray'])->not->toBeUsed();`",
        "- Standart Laravel presetlari: `arch()->preset()->laravel();`",
        "",
        "**Mutation Testing (Infection PHP)**:",
        "Oddiy Code Coverage faqat qator bajarilganini bildiradi, lekin test sifatini kafolatlamaydi. Infection PHP kodni ataylab o'zgartiradi (masalan: `>` ni `<`, `true` ni `false` qiladi) va testlar bu xatolikni tuta olishini (Kill Mutant) tekshiradi. MSI (Mutation Score Indicator) orqali haqiqiy test mustahkamligi o'lchanadi.",
        "",
        "```php",
        "// tests/Feature/ArchitectureTest.php",
        "test('controllers do not access database directly') {",
        "    expect('App\\Http\\Controllers')",
        "        ->not->toUse('Illuminate\\Support\\Facades\\DB')",
        "        ->ignoring('App\\Http\\Controllers\\HealthCheckController');",
        "};",
        "",
        "test('debugging functions are not used in production code') {",
        "    expect(['dd', 'dump', 'ray', 'die', 'var_dump'])",
        "        ->not->toBeUsed();",
        "};",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangizga Pest Architecture testlarini qo'shing: debug funksiyalarini taqiqlang va controller'lar uchun qat'iy arxitektura shartlarini o'rnating.",
      acceptanceCriteria: [
        "Pest Arch testing vositalari va preset'larini ishlata oladi",
        "Code coverage va Mutation testing (MSI) farqini tushuntira oladi",
        "Arxitektura buzilishlarini CI jarayonida bloklashni biladi"
      ],
      prerequisites: [
        "26.1",
        "64.1"
      ]
    }
  ]
});
