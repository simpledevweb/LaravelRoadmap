/* Chuqur dars: 26.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("26.13", {
  "lesson": [
    "### Parallel ishga tushirish",
    "`./vendor/bin/pest --parallel` yoki `php artisan test --parallel` testlarni bir nechta PHP jarayoniga taqsimlaydi (ParaTest asosida). Yadrolar soniga qarab test to'plami 3–8 baravar tezlashishi mumkin. `--processes=8` bilan jarayonlar sonini belgilash.",
    "",
    "### Laravel DB bilan",
    "Har jarayon **alohida test bazasi** oladi: `app_testing_test_1`, `app_testing_test_2`... Laravel ularni avtomatik yaratadi va migratsiya qiladi. `--recreate-databases` — bazalarni majburan qayta yaratish (migratsiyalar o'zgarganda).",
    "",
    "Har jarayon bazasini tayyorlash uchun hook (`AppServiceProvider` yoki maxsus provider):",
    "`ParallelTesting::setUpTestDatabase(function (string $database, int $token) { Artisan::call('db:seed', ['--class' => RolesSeeder::class]); });`",
    "",
    "Boshqa hook'lar: `setUpProcess`, `setUpTestCase`, `tearDownTestCase`, `tearDownProcess`.",
    "",
    "### Umumiy resurslar — asosiy muammo",
    "Parallel testlar izolyatsiya muammolarini fosh qiladi (25.14, 25.18):",
    "- **Fayllar:** bir xil yo'lga yozuvchi testlar. Yechim: `Storage::fake()` yoki `ParallelTesting::token()` bilan noyob nom.",
    "- **Redis va kesh:** bir xil kalitlar. Yechim: testlarda `CACHE_STORE=array` yoki prefiks `config(['cache.prefix' => 'test_' . ParallelTesting::token()])`.",
    "- **Portlar va tashqi servislar:** `Http::fake()` va `preventStrayRequests()`.",
    "- **Statik holat** — har jarayon alohida, lekin jarayon ichida testlar ketma-ket bo'lgani uchun eski muammolar saqlanadi.",
    "- **Vaqtga bog'liq** testlar.",
    "",
    "### Qachon foydali",
    "Ko'p DB'li feature testlar (yuzlab yoki minglab) — eng katta foyda. Kichik to'plamda jarayonlarni yaratish va bazalarni tayyorlash xarajati foydadan katta bo'lishi mumkin.",
    "",
    "### Coverage bilan",
    "`--parallel --coverage` ishlaydi, natijalar birlashtiriladi. PCOV tavsiya etiladi.",
    "",
    "### CI'da",
    "CI runner'ining yadrolari soni bilan `--processes`. Bundan ham katta to'plam uchun testlarni bir nechta CI job'larga bo'lish (sharding): Pest 3 `--shard=1/4`."
  ],
  "examples": [
    {
      "title": "Parallel uchun sozlash",
      "lang": "php",
      "code": [
        "// app/Providers/AppServiceProvider.php (yoki TestServiceProvider)",
        "use Illuminate\\Support\\Facades\\ParallelTesting;",
        "",
        "public function boot(): void",
        "{",
        "    ParallelTesting::setUpTestDatabase(function (string $database, int $token) {",
        "        Artisan::call('db:seed', ['--class' => RolesSeeder::class]);",
        "    });",
        "",
        "    ParallelTesting::setUpTestCase(function (int $token) {",
        "        config(['cache.prefix' => \"test_{$token}_\"]);",
        "    });",
        "}"
      ]
    },
    {
      "title": "Ishga tushirish",
      "lang": "bash",
      "code": [
        "php artisan test --parallel --processes=8",
        "php artisan test --parallel --recreate-databases",
        "./vendor/bin/pest --parallel --shard=2/4   # CI'da 4 ta job'dan ikkinchisi"
      ]
    }
  ],
  "pitfalls": [
    "Testlar umumiy fayl yoki Redis kalitlariga yozadi: parallel rejimda tasodifiy yiqilishlar.",
    "Migratsiyalar o'zgargandan keyin `--recreate-databases` siz: eski sxemali bazalar.",
    "Kichik to'plamni parallel ishga tushirib, sekinlashuvdan hayron bo'lish.",
    "Test DB foydalanuvchisiga baza yaratish huquqini bermaslik: parallel bazalar yaratilmaydi."
  ]
});
