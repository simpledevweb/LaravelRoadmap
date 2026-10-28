/* Chuqur dars: 25.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.13", {
  "lesson": [
    "### Laravel'da DB holatini boshqarish trait'lari",
    "**`RefreshDatabase`** — eng keng ishlatiladigan:",
    "- Birinchi testdan oldin migratsiyalarni bir marta ishga tushiradi (`migrate:fresh`).",
    "- Har testni **tranzaksiyaga** o'raydi va test tugagach rollback qiladi. Natija: har test toza bazadan boshlanadi va tez.",
    "- In-memory SQLite bilan har test uchun migratsiya (tranzaksiya o'rniga).",
    "",
    "**`DatabaseTransactions`** — faqat tranzaksiya, migratsiyasiz. Baza oldindan tayyorlangan bo'lsa.",
    "",
    "**`DatabaseMigrations`** — har test uchun `migrate:fresh`. Juda sekin. Faqat tranzaksiya ishlamaydigan holatlarda.",
    "",
    "**`DatabaseTruncation`** (Laravel 10+) — har test oldidan jadvallarni truncate qiladi. Dusk (brauzer) testlari uchun, chunki ular boshqa jarayonda ishlaydi va tranzaksiya rollback'ini ko'rmaydi.",
    "",
    "### Tranzaksiya bilan bog'liq nozikliklar",
    "- Kod ichidagi `DB::transaction()` test tranzaksiyasi ichida **savepoint** bo'ladi (17.4). Odatda muammo yo'q.",
    "- `afterCommit` job va listener'lar: test tranzaksiyasi hech qachon haqiqiy commit qilinmaydi. Laravel buni maxsus boshqaradi (test darajasidagi tranzaksiyani hisobga olmaydi), shuning uchun ular ishlaydi.",
    "- **Bir nechta ulanish:** model boshqa ulanishda (`$connection = 'reporting'`) bo'lsa, `protected $connectionsToTransact = ['mysql', 'reporting'];`.",
    "- **DDL:** MySQL'da testda `CREATE TABLE` yoki `ALTER TABLE` implicit commit qiladi (17.2) va izolyatsiya buziladi.",
    "",
    "### SQLite yoki production DB",
    "In-memory SQLite tez va sozlash oson, lekin:",
    "- SQL dialekti farq qiladi: JSON funksiyalari, `FULLTEXT`, window funksiyalarning ba'zi qismlari, `DISTINCT ON`, `ON CONFLICT` farqlari, `ALTER TABLE` cheklovlari.",
    "- Tiplar qat'iy emas: SQLite `varchar(10)` ga 100 belgi yozishga ruxsat beradi.",
    "- Foreign key'lar default'da o'chiq (Laravel yoqadi).",
    "- Lock'lar va izolyatsiya darajalari boshqacha.",
    "",
    "Natija: testlar SQLite'da yashil, production MySQL/PostgreSQL'da xato. **Tavsiya:** testlarni production bilan bir xil DB turida ishga tushiring (Docker'da MySQL yoki PostgreSQL, CI'da service container). Tezlik uchun: `tmpfs` (xotiradagi disk), `fsync` o'chiq test konfiguratsiyasi, parallel testlar.",
    "",
    "### Parallel testlar va DB",
    "`php artisan test --parallel` har jarayon uchun alohida test bazasini yaratadi (`app_test_1`, `app_test_2`). `ParallelTesting::setUpTestDatabase()` hook'i bilan har bazani seed qilish.",
    "",
    "### Test bazasi alohida",
    "`phpunit.xml` dagi `DB_DATABASE` (yoki `.env.testing`) **dev bazangizdan farqli** bo'lishi shart. Aks holda `RefreshDatabase` dev ma'lumotlaringizni o'chiradi. Ayniqsa `php artisan config:cache` dan keyin: keshlangan konfiguratsiya `phpunit.xml` dagi env qiymatlarini e'tiborsiz qoldiradi va testlar **dev bazaga** urilishi mumkin. Testlardan oldin `php artisan config:clear`."
  ],
  "examples": [
    {
      "title": "phpunit.xml: alohida test bazasi",
      "lang": "xml",
      "code": [
        "<php>",
        "    <env name=\"APP_ENV\" value=\"testing\"/>",
        "    <env name=\"DB_CONNECTION\" value=\"mysql\"/>",
        "    <env name=\"DB_DATABASE\" value=\"app_testing\"/>",
        "    <env name=\"CACHE_STORE\" value=\"array\"/>",
        "    <env name=\"QUEUE_CONNECTION\" value=\"sync\"/>",
        "    <env name=\"SESSION_DRIVER\" value=\"array\"/>",
        "    <env name=\"MAIL_MAILER\" value=\"array\"/>",
        "</php>"
      ]
    },
    {
      "title": "RefreshDatabase va bir nechta ulanish",
      "lang": "php",
      "code": [
        "abstract class TestCase extends BaseTestCase",
        "{",
        "    use RefreshDatabase;",
        "",
        "    protected array $connectionsToTransact = ['mysql', 'reporting'];",
        "",
        "    protected bool $seed = true;                   // har migratsiyadan keyin DatabaseSeeder",
        "    protected string $seeder = RolesSeeder::class;  // yoki faqat reference ma'lumot",
        "}",
        "",
        "// Xavfsizlik: testlar dev bazaga urilmasligi uchun",
        "protected function setUp(): void",
        "{",
        "    parent::setUp();",
        "    if (! str_contains(DB::connection()->getDatabaseName(), 'test')) {",
        "        $this->fail('Testlar test bo\\'lmagan bazada ishlayapti: ' . DB::connection()->getDatabaseName());",
        "    }",
        "}"
      ],
      "note": "Bu himoya `config:cache` tufayli testlar dev bazaga ulanib qolgan holatlarda ma'lumot yo'qolishini oldini oladi."
    }
  ],
  "pitfalls": [
    "Testlarni SQLite'da, production'ni MySQL/PostgreSQL'da ishlatish: dialekt farqlari yashirinadi.",
    "`config:cache` dan keyin testlarni ishga tushirib, dev bazani tozalab yuborish.",
    "Boshqa ulanishdagi modellar uchun `$connectionsToTransact` ni sozlamaslik: ma'lumot testlar orasida qoladi.",
    "Har test uchun `DatabaseMigrations`: test to'plami juda sekin."
  ]
});
