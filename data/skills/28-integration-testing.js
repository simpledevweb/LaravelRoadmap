/* 28 · Integration Testing
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 28,
  slug: "integration-testing",
  title: "Integration Testing",
  group: "testing",
  description: "Integratsion testlar komponentlar haqiqiy infratuzilma bilan qanday ishlashini tekshiradi: DB, Redis, navbat, fayl tizimi, tashqi API'lar. Ular mock'lar yashiradigan xatolarni — SQL sintaksisi, migratsiya nomuvofiqligi, serializatsiya, konfiguratsiya — topadi. Senior dasturchi integratsiya chegaralarini to'g'ri tanlaydi va testlarni izolyatsiyalangan, takrorlanadigan va tez saqlaydi.",
  subskills: [
    {
      id: "28.1",
      title: "Integration Boundaries",
      description: [
        "Integratsiya chegarasi — sizning kodingiz tashqi tizim bilan uchrashgan joy: repository ↔ DB, cache servis ↔ Redis, job ↔ queue, adapter ↔ tashqi API, storage ↔ S3. Integratsion test aynan shu chegarani haqiqiy (yoki haqiqatga juda yaqin) tizim bilan tekshiradi.",
        "",
        "Chegaralarni aniq belgilash — qaysi kod adapter (integratsion test) va qaysi kod sof mantiq (unit test). Hexagonal arxitekturada \"port\"lar orqali bu ajratish tabiiy: domen unit testlanadi, adapter'lar integratsion testlanadi.",
        "",
        "```text",
        "Domen (unit)  ─port─  Adapter (integration)  ─  Tashqi tizim",
        "OrderService        EloquentOrderRepository     MySQL",
        "                    PaymeGateway                Payme sandbox",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilovangizdagi barcha integratsiya chegaralarini ro'yxatlab, har biri qanday testlanishini belgilang.",
      acceptanceCriteria: [
        "Integratsiya chegaralarini aniqlay oladi",
        "Unit va integratsion test mas'uliyatini ajratadi"
      ],
      prerequisites: [
        "27.15"
      ]
    },
    {
      id: "28.2",
      title: "Database Integration",
      description: [
        "DB integratsion testlari: murakkab Eloquent/raw so'rovlar, scope'lar, relation'lar, migratsiyalar, constraint'lar (unique, FK), tranzaksiya va lock xatti-harakati, DB'ga xos funksiyalar (JSON, window, full-text).",
        "",
        "Production bilan **bir xil engine va versiya** muhim — SQLite in-memory tez, lekin MySQL/PostgreSQL bilan farqlar (case sensitivity, JSON operatorlari, `ON CONFLICT`, constraint'lar) haqiqiy xatolarni yashiradi. Docker yoki CI service container orqali haqiqiy DB.",
        "",
        "```php",
        "it('enforces unique email per tenant at DB level', function () {",
        "    User::factory()->create(['tenant_id' => 1, 'email' => 'a@ex.uz']);",
        "    expect(fn () => User::factory()->create(['tenant_id' => 1, 'email' => 'a@ex.uz']))",
        "        ->toThrow(UniqueConstraintViolationException::class);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Repository va constraint'lar uchun production engine'ida ishlaydigan integratsion testlar yozing.",
      acceptanceCriteria: [
        "Production bilan bir xil DB engine'da testlaydi",
        "Constraint va so'rovlarni haqiqiy DB'da tekshiradi"
      ],
      prerequisites: [
        "25.13"
      ]
    },
    {
      id: "28.3",
      title: "Redis Integration",
      description: [
        "Redis bilan ishlovchi kod — cache, lock'lar, rate limiter, navbatlar, Lua skriptlar — `array` driver bilan testda boshqacha ishlaydi (TTL, atomiklik, Lua yo'q). Muhim mantiq haqiqiy Redis bilan sinalishi kerak: lock raqobati, TTL tugashi, `SET NX`, Lua skript natijasi.",
        "",
        "Izolyatsiya: alohida Redis DB raqami yoki prefiks (parallel testlarda jarayon token'i bilan), har testdan oldin/keyin `flushdb` (faqat test DB'si!). CI'da Redis service container.",
        "",
        "```php",
        "it('allows only one holder of the lock', function () {",
        "    $a = Cache::store('redis')->lock('report', 10);",
        "    $b = Cache::store('redis')->lock('report', 10);",
        "",
        "    expect($a->get())->toBeTrue()->and($b->get())->toBeFalse();",
        "    $a->release();",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Distributed lock va rate limiter mantiqini haqiqiy Redis bilan integratsion test qiling.",
      acceptanceCriteria: [
        "`array` driver va Redis farqlarini biladi",
        "Test Redis'ini izolyatsiya qiladi"
      ],
      prerequisites: [
        "12.7"
      ]
    },
    {
      id: "28.4",
      title: "Queue Integration",
      description: [
        "`Queue::fake()` job dispatch qilinganini tekshiradi, lekin job'ning haqiqiy serializatsiyasi, worker'da bajarilishi, retry va failed xatti-harakatini emas. Integratsion testlar: job'ni sinxron bajarish (`QUEUE_CONNECTION=sync` yoki `$job->handle()`), serializatsiya (`SerializesModels` — model qayta yuklanadi, o'chirilgan model bo'lsa nima bo'ladi?), `failed()` metodi, chain/batch oqimi.",
        "",
        "Haqiqiy Redis/DB queue bilan end-to-end: dispatch → `artisan queue:work --once` → natija. `afterCommit` xatti-harakatini ham tekshiring.",
        "",
        "```php",
        "it('processes the export job end-to-end', function () {",
        "    config(['queue.default' => 'database']);",
        "    ExportOrders::dispatch($user->id);",
        "    $this->artisan('queue:work --once --stop-when-empty')->assertSuccessful();",
        "    Storage::disk('exports')->assertExists(\"orders-{$user->id}.csv\");",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Muhim job uchun dispatch → worker → natija oqimini haqiqiy queue driver bilan testlang.",
      acceptanceCriteria: [
        "`Queue::fake` va haqiqiy bajarish testlari farqini biladi",
        "Serializatsiya va failed holatlarini tekshiradi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "28.5",
      title: "External API Integration",
      description: [
        "Tashqi API integratsiyasini testlash qatlamlari: (1) unit/feature testlarda `Http::fake()` — so'rov formati va javob qayta ishlanishi; (2) haqiqiy **sandbox**'ga qarshi kam sonli integratsion testlar (alohida guruh, CI'da rejali, har commit'da emas); (3) contract testlar — provayder javob formati o'zgarmaganini tekshirish; (4) record/replay (VCR) — haqiqiy javoblarni yozib, qayta ijro.",
        "",
        "Xato holatlarini ham fake qiling: timeout, 500, 429, noto'g'ri JSON — adapter ularni to'g'ri qayta ishlashini tekshiring.",
        "",
        "```php",
        "Http::fake([",
        "    'api.provider.uz/*' => Http::sequence()",
        "        ->push(status: 503)",
        "        ->push(['status' => 'ok'], 200),",
        "]);",
        "expect(app(ProviderClient::class)->ping())->toBeTrue(); // retry ishladi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tashqi API adapteri uchun muvaffaqiyat, timeout, 5xx va 429 holatlarini `Http::fake` bilan, alohida sandbox testi bilan qoplang.",
      acceptanceCriteria: [
        "Tashqi API testlash qatlamlarini biladi",
        "Xato holatlarini ham simulyatsiya qiladi"
      ],
      prerequisites: [
        "26.12"
      ]
    },
    {
      id: "28.6",
      title: "Filesystem Integration",
      description: [
        "Fayl bilan ishlovchi kod: yuklash, eksport, import, rasm qayta ishlash. `Storage::fake('s3')` — disk'ni vaqtinchalik lokal papka bilan almashtiradi: `assertExists`, `assertMissing`. `UploadedFile::fake()->image('a.jpg', 600, 400)`, `->create('doc.pdf', 500)` — soxta fayllar.",
        "",
        "Haqiqiy S3 xatti-harakatini (temporary URL, visibility, multipart) tekshirish uchun MinIO yoki LocalStack bilan integratsion test. Vaqtinchalik fayllarni testdan keyin tozalash.",
        "",
        "```php",
        "it('stores the avatar on s3', function () {",
        "    Storage::fake('s3');",
        "    $this->actingAs($user)->postJson('/api/avatar', ['avatar' => UploadedFile::fake()->image('me.jpg')])",
        "        ->assertOk();",
        "    Storage::disk('s3')->assertExists(\"avatars/{$user->id}.jpg\");",
        "});",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Fayl yuklash va CSV eksport funksiyalarini `Storage::fake` bilan, S3 xatti-harakatini MinIO bilan testlang.",
      acceptanceCriteria: [
        "`Storage::fake` va soxta fayllardan foydalanadi",
        "Haqiqiy S3 xatti-harakatini emulyator bilan tekshiradi"
      ],
      prerequisites: [
        "2.22"
      ]
    },
    {
      id: "28.7",
      title: "Test Containers and Isolated Services",
      description: [
        "Testcontainers yondashuvi — har test jarayoni uchun haqiqiy servislarni (MySQL, Postgres, Redis, RabbitMQ, MinIO) Docker konteynerlarida avtomatik ko'tarish va o'chirish. Afzallik: production'ga yaqin muhit, toza holat, ishlab chiquvchi mashinasida o'rnatish shart emas.",
        "",
        "PHP'da: `testcontainers/testcontainers` paketi yoki oddiyroq — `docker compose -f docker-compose.test.yml up` + CI service container'lar. Konteyner ishga tushishi vaqt oladi — test jarayoni bo'yicha bir marta ko'tarish, testlar orasida tranzaksiya/flush bilan tozalash.",
        "",
        "```yaml",
        "# docker-compose.test.yml",
        "services:",
        "  mysql: { image: mysql:8.4, environment: { MYSQL_DATABASE: app_test, MYSQL_ROOT_PASSWORD: secret }, tmpfs: /var/lib/mysql }",
        "  redis: { image: redis:7-alpine }",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Integratsion testlar uchun `docker-compose.test.yml` yarating (tmpfs bilan tez DB) va CI'da ishlating.",
      acceptanceCriteria: [
        "Izolyatsiyalangan servislar bilan test muhitini quradi",
        "Konteyner ishga tushish narxini optimallashtiradi"
      ],
      prerequisites: [
        "37.15"
      ]
    },
    {
      id: "28.8",
      title: "Test Database Management",
      description: [
        "Test DB boshqaruvi: alohida DB nomi (dev DB'ni hech qachon ishlatmaslik), migratsiyalar orqali sxema (yoki `schema:dump` bilan tez yuklash), `RefreshDatabase` (bir marta migratsiya + har test tranzaksiya), parallel testlarda jarayon bo'yicha DB'lar, ma'lumotnoma (reference) ma'lumotlar seed'i.",
        "",
        "Xavfsizlik: `config:cache` qolib ketsa testlar `.env` dagi dev DB'ga ulanishi mumkin — test boshida DB nomini tekshiruvchi himoya (`assert(str_ends_with(DB::getDatabaseName(), '_test'))`) foydali.",
        "",
        "```php",
        "// tests/TestCase.php",
        "protected function setUp(): void",
        "{",
        "    parent::setUp();",
        "    throw_unless(str_contains(DB::connection()->getDatabaseName(), 'test'), RuntimeException::class, 'Test DB emas!');",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Test DB uchun himoya tekshiruvi qo'shing va `schema:dump` bilan migratsiya vaqtini qisqartiring.",
      acceptanceCriteria: [
        "Test va dev DB'larni qat'iy ajratadi",
        "Config cache tuzog'ining oldini oladi"
      ],
      prerequisites: [
        "25.16"
      ]
    },
    {
      id: "28.9",
      title: "Transaction-Based Tests",
      description: [
        "Tranzaksiya asosidagi izolyatsiya: har test tranzaksiya ichida bajariladi va oxirida rollback — DB tez va toza (`RefreshDatabase`, `DatabaseTransactions`). Cheklovlari: testlanayotgan kod o'zi tranzaksiya ochsa — savepoint'lar ishlatiladi; `afterCommit` callback'lari va `ShouldDispatchAfterCommit` hech qachon commit bo'lmagani uchun ishlamasligi mumkin (Laravel testlarda buni boshqaradi, lekin xatti-harakatni bilish kerak); bir nechta ulanish yoki jarayon (queue worker) o'zgarishlarni ko'rmaydi; MySQL'da DDL implicit commit qiladi.",
        "",
        "Bunday holatlarda — `DatabaseTruncation` yoki `DatabaseMigrations` (sekinroq).",
        "",
        "```php",
        "uses(DatabaseTruncation::class); // ko'p ulanishli yoki haqiqiy commit kerak bo'lgan testlar uchun",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`afterCommit` ga tayangan kod uchun tranzaksiya va truncation asosidagi testlar xatti-harakatini solishtiring.",
      acceptanceCriteria: [
        "Tranzaksiya asosidagi izolyatsiya cheklovlarini biladi",
        "Kerak bo'lganda truncation'ga o'tadi"
      ],
      prerequisites: [
        "28.8"
      ]
    },
    {
      id: "28.10",
      title: "Real Dependency vs Mock",
      description: [
        "Haqiqiy dependency yoki mock — murosalar: haqiqiy — ishonchli (haqiqiy xatti-harakat), lekin sekin, sozlash qiyin, beqaror bo'lishi mumkin; mock — tez va nazorat ostida, lekin haqiqatdan farq qilishi va yolg'on ishonch berishi mumkin.",
        "",
        "Qoida: o'zingiz boshqaradigan, tez va deterministik infratuzilma (DB, Redis — konteynerda) — haqiqiy; tashqi, pullik, beqaror yoki sekin servislar (to'lov, SMS, uchinchi tomon API) — fake/mock, lekin ularning adapter'ini kam sonli haqiqiy (sandbox) testlar bilan tasdiqlash. \"Mock qilinadigan narsa — sizga tegishli interfeys\".",
        "",
        "```text",
        "MySQL, Redis          → haqiqiy (Docker)",
        "Payme, Eskiz, Google  → Http::fake + sandbox contract test (rejali)",
        "Vaqt                  → MockClock",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihadagi har bir tashqi bog'liqlik uchun \"haqiqiy yoki double\" qarorini jadvalda asoslang.",
      acceptanceCriteria: [
        "Haqiqiy va mock murosalarini biladi",
        "Faqat o'ziga tegishli interfeyslarni mock qiladi"
      ],
      prerequisites: [
        "27.6"
      ]
    },
    {
      id: "28.11",
      title: "Integration Test Data",
      description: [
        "Integratsion testlar uchun ma'lumot: factory'lar bilan har test o'zi uchun minimal holat; ma'lumotnoma ma'lumotlari (mamlakatlar, valyutalar, ruxsatlar) — seeder bilan bir marta; real hajm kerak bo'lgan testlar (pagination, performance) — maxsus seeder, alohida guruh.",
        "",
        "Qoidalar: testlar umumiy \"katta fixture\" ga tayanmasin (bir testning o'zgarishi boshqasini sindiradi); id'lar va tartibga tayanmaslik; Faker'da unikal qiymatlar (`unique()`) to'qnashuvi; sezgir production ma'lumotini testda ishlatmaslik.",
        "",
        "```php",
        "beforeEach(fn () => $this->seed(CurrencySeeder::class));",
        "",
        "it('converts using the latest rate', function () {",
        "    ExchangeRate::factory()->create(['pair' => 'USD/UZS', 'rate' => 12_700, 'date' => today()]);",
        "    expect(app(Converter::class)->toUzs(Money::usd(10)))->toEqual(Money::uzs(127_000));",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Integratsion testlar uchun ma'lumotnoma seeder'larini ajratib, testlarni o'z ma'lumotlarini yaratadigan qiling.",
      acceptanceCriteria: [
        "Test ma'lumotlarini mustaqil va minimal tayyorlaydi",
        "Ma'lumotnoma va test ma'lumotlarini ajratadi"
      ],
      prerequisites: [
        "13.18"
      ]
    },
    {
      id: "28.12",
      title: "Environment Configuration",
      description: [
        "Test muhiti konfiguratsiyasi: `.env.testing` (Laravel `APP_ENV=testing` da avtomatik o'qiydi), `phpunit.xml` dagi `<env>` qiymatlari (ustunlik qiladi), CI muhit o'zgaruvchilari. Odatiy sozlamalar: test DB va Redis, `CACHE_STORE=array` (yoki integratsion testlarda `redis`), `QUEUE_CONNECTION=sync`, `MAIL_MAILER=array`, `BCRYPT_ROUNDS=4`, haqiqiy API kalitlari o'rniga sandbox/soxta.",
        "",
        "Konfiguratsiyani test ichida o'zgartirish: `config([...])` — faqat shu test uchun. Integratsion testlar uchun alohida konfiguratsiya to'plami (haqiqiy Redis) — guruh yoki suite bo'yicha.",
        "",
        "```env",
        "# .env.testing",
        "APP_ENV=testing",
        "DB_DATABASE=app_test",
        "REDIS_DB=15",
        "QUEUE_CONNECTION=sync",
        "PAYME_BASE_URL=https://checkout.test.paycom.uz",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`.env.testing` ni tayyorlang va integratsion testlar uchun haqiqiy Redis'ni ishlatuvchi alohida suite sozlang.",
      acceptanceCriteria: [
        "Test konfiguratsiyasi manbalari ustuvorligini biladi",
        "Production kalitlarini testlarda ishlatmaydi"
      ],
      prerequisites: [
        "25.16"
      ]
    },
    {
      id: "28.13",
      title: "Cleanup and Isolation",
      description: [
        "Integratsion testlar tashqi holat qoldiradi: DB yozuvlari, Redis kalitlari, fayllar, navbatdagi job'lar, S3 obyektlari, sandbox'dagi yozuvlar. Qolgan holat keyingi testlarni buzadi (flaky) yoki muhitni ifloslantiradi.",
        "",
        "Strategiyalar: tranzaksiya rollback (DB), `flushdb` test Redis DB'sida, `Storage::fake` yoki test bucket + testdan keyin tozalash, unikal prefikslar (parallel jarayonlar uchun `ParallelTesting::token()`), `afterEach`/`tearDown` da tozalash, sandbox'da test yozuvlarini belgilash.",
        "",
        "```php",
        "afterEach(function () {",
        "    Redis::connection('testing')->flushdb();",
        "    Storage::disk('local')->deleteDirectory('tmp-tests');",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Integratsion testlar qoldiradigan barcha tashqi holatlarni aniqlab, ularni tozalashni ta'minlang.",
      acceptanceCriteria: [
        "Testlar qoldiradigan holat turlarini biladi",
        "Parallel ishlashga mos tozalash strategiyasini qo'llaydi"
      ],
      prerequisites: [
        "25.14"
      ]
    },
    {
      id: "28.14",
      title: "Failure Diagnosis",
      description: [
        "Integratsion test yiqilganda sabab ko'p bo'lishi mumkin: kod xatosi, infratuzilma (DB ishga tushmagan), konfiguratsiya, ma'lumot holati, tarmoq, vaqt. Diagnostika: aniq assertion xabarlari, `withoutExceptionHandling()` (asl exception), so'rovlar log'i (`DB::enableQueryLog`), servis log'lari (CI'da konteyner log'larini artefakt sifatida saqlash), `dump()`/`ray()` lokal.",
        "",
        "Muvaffaqiyatsizlikni lokal qayta yaratish — bir xil konteyner versiyalari, bir xil seed va tartib. \"Faqat CI'da yiqiladi\" — ko'pincha muhit farqi yoki parallel izolyatsiya muammosi.",
        "",
        "```php",
        "it('creates invoice', function () {",
        "    $this->withoutExceptionHandling();",
        "    DB::enableQueryLog();",
        "    // ...",
        "    dump(DB::getQueryLog()); // diagnostika uchun vaqtincha",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "CI'da yiqilgan integratsion testni lokal qayta yaratib, sababini tizimli aniqlang va tuzating.",
      acceptanceCriteria: [
        "Yiqilish sababi toifalarini ajrata oladi",
        "CI va lokal muhit farqlarini tekshiradi"
      ],
      prerequisites: [
        "56.1"
      ]
    },
    {
      id: "28.15",
      title: "CI Integration",
      description: [
        "Integratsion testlar CI'da: service container'lar (MySQL, Redis) health check bilan (`--health-cmd`), servislar tayyor bo'lishini kutish, migratsiya, testlar. Unit testlardan alohida bosqich yoki job — tez fikr-mulohaza uchun unit birinchi.",
        "",
        "Sandbox'ga qarshi tashqi API testlari — har commit'da emas, rejali (nightly) yoki qo'lda; maxfiy kalitlar CI secret'larida. Muvaffaqiyatsizlikda servis log'lari artefakt sifatida saqlansin.",
        "",
        "```yaml",
        "services:",
        "  mysql:",
        "    image: mysql:8.4",
        "    env: { MYSQL_DATABASE: app_test, MYSQL_ROOT_PASSWORD: secret }",
        "    options: --health-cmd=\"mysqladmin ping\" --health-interval=5s --health-retries=10",
        "  redis:",
        "    image: redis:7",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "CI'da health check'li DB va Redis servislari bilan integratsion test job'ini sozlang.",
      acceptanceCriteria: [
        "Service container'larni health check bilan sozlaydi",
        "Sandbox testlarini alohida rejalashtiradi"
      ],
      prerequisites: [
        "25.17"
      ]
    }
  ]
});
