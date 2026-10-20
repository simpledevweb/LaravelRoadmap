/* 25 · PHPUnit
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 25,
  slug: "phpunit",
  title: "PHPUnit",
  group: "testing",
  description: "PHPUnit — PHP'ning standart test freymvorki va Laravel test infratuzilmasining asosi (Pest ham uning ustiga qurilgan). Senior dasturchi testlarni tez, ishonchli va izolyatsiyalangan qilib yozadi, test doubles'ni to'g'ri ishlatadi, konfiguratsiya va CI'ni sozlaydi hamda beqaror (flaky) testlarni tizimli bartaraf etadi.",
  subskills: [
    {
      id: "25.1",
      title: "Test Structure",
      description: [
        "PHPUnit testi — `TestCase` dan meros oluvchi class, `test` prefiksli yoki `#[Test]` atributli public metodlar. Har bir test mustaqil: o'z ma'lumotini tayyorlaydi, bitta xatti-harakatni tekshiradi. Laravel'da `tests/Unit` (framework'siz, tez) va `tests/Feature` (to'liq ilova bilan).",
        "",
        "Fayl va class nomlari: `OrderTotalCalculatorTest`, metod nomi xatti-harakatni tasvirlaydi: `test_it_applies_discount_for_vip_customers`. Arrange–Act–Assert tuzilmasi o'qishni osonlashtiradi.",
        "",
        "```php",
        "final class OrderTotalCalculatorTest extends TestCase",
        "{",
        "    #[Test]",
        "    public function it_applies_vip_discount(): void",
        "    {",
        "        $calc = new OrderTotalCalculator(vipDiscountPercent: 10);   // Arrange",
        "        $total = $calc->total(subtotal: 100_000, isVip: true);       // Act",
        "        $this->assertSame(90_000, $total);                           // Assert",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud servis uchun AAA tuzilmasidagi va mazmunli nomlangan 5 ta unit test yozing.",
      acceptanceCriteria: [
        "Test class va metod konvensiyalarini biladi",
        "Unit va Feature papkalari farqini tushunadi"
      ],
      prerequisites: []
    },
    {
      id: "25.2",
      title: "Assertions",
      description: [
        "Asosiy assertion'lar: `assertSame` (tip va qiymat — `assertEquals` dan afzal), `assertEquals` (bo'shroq taqqoslash, float uchun delta), `assertTrue/False`, `assertNull`, `assertCount`, `assertContains`, `assertArrayHasKey`, `assertInstanceOf`, `assertStringContainsString`, `assertMatchesRegularExpression`, `assertJsonStringEqualsJsonString`.",
        "",
        "Laravel qo'shimchalari: HTTP (`assertStatus`, `assertJson`, `assertJsonPath`), DB (`assertDatabaseHas`, `assertModelExists`, `assertSoftDeleted`), fake'lar (`Mail::assertSent`). Yaxshi assertion aniq xato xabari beradi — ixtiyoriy `$message` parametri.",
        "",
        "```php",
        "$this->assertSame(OrderStatus::Paid, $order->fresh()->status);",
        "$this->assertEqualsWithDelta(0.3, 0.1 + 0.2, 0.0001);",
        "$this->assertCount(3, $order->items, 'Buyurtmada 3 ta mahsulot bo\\'lishi kerak');",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "`assertEquals` ishlatilgan testlarni ko'rib chiqib, tip muhim joylarda `assertSame` ga o'tkazing.",
      acceptanceCriteria: [
        "`assertSame` va `assertEquals` farqini biladi",
        "Aniq xato xabari beradigan assertion'larni tanlaydi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "25.3",
      title: "Test Fixtures",
      description: [
        "Fixture — test uchun tayyorlangan ma'lum holat: obyektlar, DB yozuvlari, fayllar (JSON namunalar, rasm). Laravel'da asosiy vosita — model factory'lar; tashqi API javoblari uchun `tests/Fixtures/*.json` fayllari; fayllar uchun `UploadedFile::fake()`.",
        "",
        "Qoidalar: har test o'zi uchun minimal fixture yaratadi (umumiy \"katta seed\" testlarni bir-biriga bog'laydi); fixture'lar o'qiladigan (builder/factory state'lar); test faqat o'zi tekshirayotgan maydonlarni aniq belgilaydi, qolgani default.",
        "",
        "```php",
        "$payload = json_decode(file_get_contents(base_path('tests/Fixtures/payme/perform.json')), true);",
        "$order = Order::factory()->for($customer)->pending()->create(['total' => 150_000]);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Tashqi API javoblari uchun fixture fayllar to'plamini yarating va testlarni ularga o'tkazing.",
      acceptanceCriteria: [
        "Har test uchun minimal fixture yaratadi",
        "Factory va fayl fixture'larini to'g'ri ishlatadi"
      ],
      prerequisites: [
        "13.18"
      ]
    },
    {
      id: "25.4",
      title: "Data Providers",
      description: [
        "Data provider — bitta test mantiqini ko'p kirish ma'lumotlari bilan bajarish. Statik metod massiv (yoki generator) qaytaradi, kalitlar — holat nomlari (xato xabarida ko'rinadi). PHPUnit 10+ da `#[DataProvider('name')]` atributi.",
        "",
        "Validatsiya qoidalari, chegaraviy qiymatlar, formatlash, hisob-kitob formulalari uchun ideal. Provider'lar statik — ular test ishga tushishidan oldin baholanadi, shuning uchun ichida DB yoki container'ga murojaat qilmang (factory'ni test ichida chaqiring).",
        "",
        "```php",
        "#[DataProvider('invalidPhones')]",
        "public function test_it_rejects_invalid_phone(string $phone): void",
        "{",
        "    $this->assertFalse(PhoneNumber::isValid($phone));",
        "}",
        "",
        "public static function invalidPhones(): array",
        "{",
        "    return ['too short' => ['99890'], 'letters' => ['+99890abc4567'], 'wrong country' => ['+79991234567']];",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Validatsiya qoidasi uchun chegaraviy qiymatlarni qamrab oluvchi nomlangan data provider yozing.",
      acceptanceCriteria: [
        "Nomlangan provider holatlaridan foydalanadi",
        "Provider'lar statik ekanini va cheklovini biladi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "25.5",
      title: "Setup va Teardown",
      description: [
        "Hayot davri metodlari: `setUp()` — har testdan oldin, `tearDown()` — har testdan keyin, `setUpBeforeClass()`/`tearDownAfterClass()` — class bo'yicha bir marta. Laravel'da `setUp()` da `parent::setUp()` ni chaqirish shart (ilova shu yerda ishga tushadi).",
        "",
        "Ehtiyot: `setUp` da ko'p narsa tayyorlash testni o'qishni qiyinlashtiradi (ma'lumot qayerdan kelgani ko'rinmaydi) — faqat haqiqatan umumiy narsalar. Class darajasidagi umumiy holat testlarni bir-biriga bog'laydi va tartibga sezgir qiladi.",
        "",
        "```php",
        "protected function setUp(): void",
        "{",
        "    parent::setUp();",
        "    $this->clock = new MockClock('2025-06-01 10:00:00');",
        "    $this->app->instance(ClockInterface::class, $this->clock);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Katta `setUp` metodini kichraytiring: umumiy bo'lmagan tayyorgarlikni testlarning o'ziga ko'chiring.",
      acceptanceCriteria: [
        "`parent::setUp()` zarurligini biladi",
        "Umumiy setup va test o'qiluvchanligi muvozanatini saqlaydi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "25.6",
      title: "Test Doubles",
      description: [
        "Test double — haqiqiy dependency o'rnini bosuvchi obyekt. Turlari (Meszaros): **dummy** (faqat parametrni to'ldirish uchun), **stub** (oldindan belgilangan javob qaytaradi), **spy** (chaqiruvlarni yozib oladi, keyin tekshiriladi), **mock** (kutilgan chaqiruvlar oldindan belgilanadi va tekshiriladi), **fake** (soddalashtirilgan ishlaydigan implementatsiya — in-memory repository, `Mail::fake()`).",
        "",
        "Tanlov: holatni tekshirish uchun fake/stub, o'zaro ta'sirni (yuborildimi?) tekshirish uchun spy/mock. Fake'lar ko'pincha eng o'qiladigan va mo'rt bo'lmagan testlarni beradi.",
        "",
        "```php",
        "final class InMemoryOrderRepository implements OrderRepository   // fake",
        "{",
        "    private array $orders = [];",
        "    public function save(Order $o): void { $this->orders[$o->id] = $o; }",
        "    public function find(int $id): ?Order { return $this->orders[$id] ?? null; }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bir xil servis uchun stub, mock va fake bilan test yozib, qaysi biri eng barqaror ekanini tahlil qiling.",
      acceptanceCriteria: [
        "Beshta double turini farqlaydi",
        "Fake'ni mock'dan qachon afzal ko'rishni biladi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "25.7",
      title: "Mocks va Stubs",
      description: [
        "PHPUnit: `createStub(Interface::class)` + `method('x')->willReturn(...)` — stub; `createMock()` + `expects($this->once())->method('x')->with(...)` — mock. Laravel'da Mockery: `$this->mock(Service::class, fn ($m) => $m->shouldReceive('charge')->once()->andReturn($receipt))` — container'ga ham bog'laydi; `$this->spy()`, `$this->partialMock()`.",
        "",
        "Qoidalar: faqat o'zingizga tegishli interfeyslarni mock qiling (tashqi SDK'ni o'z adapter'ingiz orqali), value object va entity'larni mock qilmang, haddan tashqari aniq `with()` testni implementatsiyaga bog'laydi.",
        "",
        "```php",
        "$gateway = $this->mock(PaymentGateway::class);",
        "$gateway->shouldReceive('charge')->once()->with(Mockery::on(fn (Money $m) => $m->amount === 150_000))",
        "    ->andReturn(new Receipt('rcpt_1'));",
        "",
        "app(Checkout::class)->pay($order);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "To'lov servisini Mockery mock bilan testlang va faqat muhim argumentlarni tekshiring.",
      acceptanceCriteria: [
        "Stub va mock farqini kodda ko'rsata oladi",
        "Tashqi SDK'ni to'g'ridan-to'g'ri mock qilmaydi"
      ],
      prerequisites: [
        "25.6"
      ]
    },
    {
      id: "25.8",
      title: "Exceptions Testing",
      description: [
        "Exception'larni tekshirish: `$this->expectException(InsufficientFunds::class)`, `expectExceptionMessage()`, `expectExceptionCode()` — ular exception otadigan koddan **oldin** chaqiriladi. Laravel'da HTTP darajasida: exception status kodga aylanadimi (`assertStatus(422)`), `$this->withoutExceptionHandling()` (asl exception'ni ko'rish uchun), `Exceptions::fake()` + `assertReported()` (Laravel 11+).",
        "",
        "Faqat exception turi emas, holat ham tekshirilsin: exception'dan keyin DB o'zgarmaganmi (rollback).",
        "",
        "```php",
        "public function test_withdraw_more_than_balance_throws(): void",
        "{",
        "    $account = new BankAccount(balance: 100);",
        "    $this->expectException(InsufficientFunds::class);",
        "    $account->withdraw(150);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Domen exception'lari uchun testlar yozing va exception'dan keyin holat o'zgarmaganini ham tekshiring.",
      acceptanceCriteria: [
        "`expectException` ni to'g'ri joyda chaqiradi",
        "`withoutExceptionHandling` ning debug'dagi rolini biladi"
      ],
      prerequisites: [
        "1.15"
      ]
    },
    {
      id: "25.9",
      title: "Data-Driven Tests",
      description: [
        "Data-driven testlar — test mantiqi bir, ma'lumot ko'p: data provider'lar, CSV/JSON fayllardan o'qilgan holatlar jadvali, generator'lar. Biznes qoidalari jadvali (masalan, soliq stavkalari, chegirma shartlari) biznes bilan kelishilgan \"misollar\" sifatida saqlanishi va testlanishi mumkin.",
        "",
        "Yaxshi amaliyot: har holat nomlangan, kutilgan natija aniq, chegaraviy qiymatlar (0, 1, maksimal, maksimal+1), noto'g'ri kirishlar. Juda ko'p holat — test vaqtini oshiradi; property-based testing katta kirish fazosi uchun muqobil.",
        "",
        "```php",
        "public static function shippingCases(): iterable",
        "{",
        "    yield 'Toshkent, < 100k' => ['tashkent', 50_000, 15_000];",
        "    yield 'Toshkent, ≥ 100k (bepul)' => ['tashkent', 100_000, 0];",
        "    yield 'viloyat' => ['samarkand', 50_000, 30_000];",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Biznes qoidalari jadvalini (masalan, yetkazish narxi) data-driven test bilan to'liq qamrang.",
      acceptanceCriteria: [
        "Chegaraviy qiymatlarni tizimli tanlaydi",
        "Holatlarni o'qiladigan nomlar bilan beradi"
      ],
      prerequisites: [
        "25.4"
      ]
    },
    {
      id: "25.10",
      title: "Code Coverage",
      description: [
        "Code coverage — testlar bajargan kod ulushi: line, branch, path coverage. Xdebug yoki PCOV kerak (PCOV tezroq). `php artisan test --coverage --min=80`, HTML hisobot (`--coverage-html`).",
        "",
        "Coverage — yo'q testlarni topish vositasi, sifat o'lchovi emas: 100% coverage assertion'siz testlar bilan ham bo'lishi mumkin. Muhim kod (to'lov, ruxsatlar, hisob-kitob) uchun yuqori branch coverage; trivial getter'lar uchun emas. Mutation testing (Infection) testlar sifatini yaxshiroq o'lchaydi.",
        "",
        "```bash",
        "php artisan test --coverage --min=75",
        "XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html build/coverage",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Coverage hisobotini yarating va muhim modullardagi qoplanmagan branch'lar uchun testlar qo'shing.",
      acceptanceCriteria: [
        "Line va branch coverage farqini biladi",
        "Coverage'ni maqsad emas, vosita sifatida ishlatadi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "25.11",
      title: "Unit Testing",
      description: [
        "PHPUnit'da unit test — bitta class/funksiyani izolyatsiyada tekshirish: framework yuklanmaydi (`PHPUnit\\Framework\\TestCase`), DB va tarmoq yo'q, dependency'lar double bilan. Juda tez (millisekundlar) — yuzlab testni soniyalarda bajarish.",
        "",
        "Laravel'da `tests/Unit` dagi testlar `Tests\\TestCase` emas, `PHPUnit\\Framework\\TestCase` dan meros olishi mumkin — shunda ilova bootstrap qilinmaydi. Domen mantiqi, value object'lar, kalkulyatorlar, parser'lar — unit testlar uchun eng mos joy.",
        "",
        "```php",
        "use PHPUnit\\Framework\\TestCase;",
        "",
        "final class MoneyTest extends TestCase",
        "{",
        "    public function test_it_adds_same_currency(): void",
        "    {",
        "        $this->assertEquals(new Money(300, 'UZS'), (new Money(100, 'UZS'))->add(new Money(200, 'UZS')));",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Domen class'lari uchun framework yuklamaydigan unit testlar yozing va bajarilish vaqtini o'lchang.",
      acceptanceCriteria: [
        "Framework'siz unit test yoza oladi",
        "Unit testga mos kodni ajrata oladi"
      ],
      prerequisites: [
        "unit-testing"
      ]
    },
    {
      id: "25.12",
      title: "Integration Testing",
      description: [
        "Integratsion test — bir nechta komponentning haqiqiy hamkorligini tekshiradi: repository + haqiqiy DB, queue + Redis, servis + fayl tizimi. Laravel'da odatda `Tests\\TestCase` (ilova yuklanadi) va test DB.",
        "",
        "Mock'lar tutib qolmaydigan xatolarni topadi: SQL sintaksisi, migratsiya va model mosligi, tranzaksiya xatti-harakati, serializatsiya. Unit'dan sekinroq — shuning uchun integratsiya chegaralarini tekshirishga e'tibor qarating, biznes mantiqning barcha tarmoqlarini emas.",
        "",
        "```php",
        "final class EloquentOrderRepositoryTest extends TestCase",
        "{",
        "    use RefreshDatabase;",
        "",
        "    public function test_it_finds_pending_orders_older_than(): void",
        "    {",
        "        Order::factory()->pending()->create(['created_at' => now()->subDays(5)]);",
        "        Order::factory()->pending()->create(['created_at' => now()]);",
        "        $this->assertCount(1, app(EloquentOrderRepository::class)->pendingOlderThan(now()->subDays(3)));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Repository'ning murakkab so'rovlari uchun haqiqiy DB bilan integratsion testlar yozing.",
      acceptanceCriteria: [
        "Integratsion test qaysi xatolarni topishini biladi",
        "Integratsiya chegarasiga e'tibor qaratadi"
      ],
      prerequisites: [
        "integration-testing"
      ]
    },
    {
      id: "25.13",
      title: "Database Testing",
      description: [
        "Laravel DB testlari: `RefreshDatabase` (migratsiyani bir marta, har testni tranzaksiyada o'rab rollback — tez), `DatabaseTransactions`, `DatabaseMigrations` (har test uchun qayta — sekin), `LazilyRefreshDatabase`. Assertion'lar: `assertDatabaseHas/Missing`, `assertDatabaseCount`, `assertModelExists`, `assertSoftDeleted`.",
        "",
        "Test DB: production bilan bir xil engine (SQLite in-memory tez, lekin MySQL/PostgreSQL farqlari bug'larni yashiradi — JSON, window funksiyalar, constraint'lar). `.env.testing`, alohida DB nomi va config cache yo'qligi — testlar dev DB'ni tozalab yubormasligi uchun.",
        "",
        "```php",
        "use RefreshDatabase;",
        "",
        "$this->postJson('/api/orders', $payload)->assertCreated();",
        "$this->assertDatabaseHas('orders', ['customer_id' => $customer->id, 'status' => 'pending']);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Test muhitini production bilan bir xil DB engine'ga o'tkazing va SQLite'da yashiringan xatolarni toping.",
      acceptanceCriteria: [
        "`RefreshDatabase` qanday ishlashini biladi",
        "Test DB izolyatsiyasini va engine mosligini ta'minlaydi"
      ],
      prerequisites: [
        "25.12"
      ]
    },
    {
      id: "25.14",
      title: "Test Isolation",
      description: [
        "Har bir test boshqalardan mustaqil: istalgan tartibda, alohida yoki parallel ishlaganda bir xil natija. Izolyatsiyani buzuvchilar: umumiy DB holati (tozalanmagan), statik/global holat (singleton'lar, static property, `Carbon::setTestNow` tiklanmagan), fayl tizimi, kesh, vaqt va tasodifiylik, tashqi servislar.",
        "",
        "Tekshirish: `--order-by=random` bilan ishga tushirish, `--filter` bilan bitta testni alohida. Laravel ko'p narsani avtomatik tiklaydi (container, fake'lar har testda yangi), lekin static holat va tashqi resurslar sizning mas'uliyatingiz.",
        "",
        "```bash",
        "php artisan test --order-by=random",
        "vendor/bin/phpunit --order-by=random --random-order-seed=1717",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Test to'plamini tasodifiy tartibda bir necha marta ishga tushiring va tartibga bog'liq testlarni tuzating.",
      acceptanceCriteria: [
        "Izolyatsiyani buzuvchi manbalarni biladi",
        "Tasodifiy tartib bilan bog'liqliklarni aniqlaydi"
      ],
      prerequisites: [
        "25.13"
      ]
    },
    {
      id: "25.15",
      title: "Test Suites",
      description: [
        "Test suite — testlar guruhi: `phpunit.xml` da `<testsuite name=\"Unit\">`, `Feature`, `Integration`. Alohida ishga tushirish: `--testsuite=Unit`. Guruhlar: `#[Group('slow')]`, `--group`/`--exclude-group` — sekin, tashqi servisli yoki beqaror testlarni ajratish.",
        "",
        "CI strategiyasi: tez unit testlar har commit'da birinchi, sekin integratsion/E2E — parallel yoki keyin; \"smoke\" guruhi deploy'dan keyin. Suite'lar orqali ishlab chiquvchi lokal tez fikr-mulohaza oladi.",
        "",
        "```xml",
        "<testsuites>",
        "    <testsuite name=\"Unit\"><directory>tests/Unit</directory></testsuite>",
        "    <testsuite name=\"Feature\"><directory>tests/Feature</directory></testsuite>",
        "</testsuites>",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Testlarni suite va guruhlarga ajrating, CI'da tez testlarni birinchi bosqichga qo'ying.",
      acceptanceCriteria: [
        "Suite va group'larni sozlay oladi",
        "CI'da testlarni tezlik bo'yicha tartiblaydi"
      ],
      prerequisites: [
        "25.16"
      ]
    },
    {
      id: "25.16",
      title: "PHPUnit Configuration",
      description: [
        "`phpunit.xml`: `bootstrap`, test suite'lar, `<source>` (coverage uchun kod), `<php><env>` (test muhit o'zgaruvchilari: `APP_ENV=testing`, `DB_DATABASE`, `CACHE_STORE=array`, `QUEUE_CONNECTION=sync`, `MAIL_MAILER=array`, `BCRYPT_ROUNDS=4`), `failOnRisky`, `failOnWarning`, `executionOrder`, `cacheDirectory`.",
        "",
        "Muhim tuzoq: `php artisan config:cache` qilingan bo'lsa, testlar `phpunit.xml` env'ini e'tiborsiz qoldirib, dev DB'ga ulanishi va uni tozalab yuborishi mumkin — testlardan oldin `config:clear`.",
        "",
        "```xml",
        "<php>",
        "    <env name=\"APP_ENV\" value=\"testing\"/>",
        "    <env name=\"DB_DATABASE\" value=\"app_test\"/>",
        "    <env name=\"CACHE_STORE\" value=\"array\"/>",
        "    <env name=\"QUEUE_CONNECTION\" value=\"sync\"/>",
        "    <env name=\"BCRYPT_ROUNDS\" value=\"4\"/>",
        "</php>",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`phpunit.xml` ni audit qiling: test DB izolyatsiyasi, tezlik sozlamalari va qat'iy rejimlarni yoqing.",
      acceptanceCriteria: [
        "Asosiy konfiguratsiya bo'limlarini biladi",
        "Config cache tuzog'idan xabardor"
      ],
      prerequisites: [
        "25.13"
      ]
    },
    {
      id: "25.17",
      title: "CI Integration",
      description: [
        "Testlar har PR'da avtomatik ishga tushishi va muvaffaqiyatsiz bo'lsa merge'ni bloklashi kerak. CI qadamlari: kod olish → PHP va kengaytmalar → `composer install` (kesh bilan) → servislar (MySQL/Postgres, Redis — service container'lar) → `.env` tayyorlash → migratsiya → testlar (`--parallel`) → coverage va JUnit hisobot.",
        "",
        "Tezlik: dependency keshlash, parallel testlar, suite'larni bo'lish (matrix), faqat o'zgargan qismga tegishli testlar (ehtiyotkorlik bilan). Natija: JUnit XML (CI'da test natijalari ko'rinishi), coverage artefakti.",
        "",
        "```yaml",
        "- run: composer install --no-interaction --prefer-dist",
        "- run: php artisan test --parallel --log-junit=reports/junit.xml",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "GitHub Actions yoki GitLab CI'da DB va Redis servisli test pipeline'ini sozlang.",
      acceptanceCriteria: [
        "CI test bosqichlarini sozlay oladi",
        "Test natijalari va coverage'ni hisobot sifatida chiqaradi"
      ],
      prerequisites: [
        "ci-cd"
      ]
    },
    {
      id: "25.18",
      title: "Flaky Test Diagnosis",
      description: [
        "Flaky test — kod o'zgarmasa ham ba'zan o'tadi, ba'zan yiqiladi. Ishonchni yo'qotadi (\"yana o'sha test, qayta ishga tushir\"). Tipik sabablar: vaqt (`now()`, sana chegarasi, vaqt zonasi), tasodifiylik (Faker unique to'qnashuvi), tartibga bog'liqlik (umumiy holat), parallel testlarda umumiy resurs, asinxronlik va kutish, tashqi servislar, ID tartibiga tayanish (`first()` tartibsiz).",
        "",
        "Diagnostika: testni ko'p marta takrorlash (`--repeat`), tasodifiy tartib va seed, CI log'larini solishtirish, flaky testlarni karantinga olish va tuzatish uchun tiket. Yechim — sababni tuzatish, `retry` emas.",
        "",
        "```bash",
        "php artisan test --filter=OrderReportTest --repeat=50",
        "```",
        "```php",
        "$this->travelTo(Carbon::parse('2025-06-01 10:00:00', 'Asia/Tashkent')); // vaqtni qotirish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "CI tarixidan flaky testni toping, uni `--repeat` bilan qayta yarating va asl sababini tuzating.",
      acceptanceCriteria: [
        "Flaky testlarning asosiy sabablarini biladi",
        "Retry bilan emas, sababni tuzatib hal qiladi"
      ],
      prerequisites: [
        "25.14"
      ]
    }
  ]
});
