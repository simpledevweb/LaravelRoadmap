/* Chuqur dars: 25.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.14", {
  "lesson": [
    "### Izolyatsiya nima",
    "Har test **mustaqil**: uning natijasi boshqa testlarga, ularning tartibiga yoki oldingi ishga tushirishlarga bog'liq emas. Testni yolg'iz, boshqalar bilan, teskari tartibda, parallel yoki 100 marta ketma-ket ishga tushirsangiz ham, natija bir xil.",
    "",
    "Izolyatsiya buzilganining belgilari: test yolg'iz o'tadi, lekin to'plam ichida yiqiladi (yoki aksincha); tartib o'zgarganda natija o'zgaradi; parallel rejimda tasodifiy yiqilishlar.",
    "",
    "### Holat qayerda \"oqib\" ketadi",
    "1. **Ma'lumotlar bazasi:** bir test yozgan yozuv keyingisiga ko'rinadi. Yechim: `RefreshDatabase` (25.13).",
    "2. **Statik xususiyatlar va singleton'lar:** `static $cache = []`, o'z registry'lar. Laravel container har test uchun qayta yaratiladi, lekin PHP statiklari yo'q. Yechim: statik holatdan qochish yoki `tearDown` da tiklash.",
    "3. **Global PHP holati:** `date_default_timezone_set`, `setlocale`, `ini_set`, `putenv`, `$_SERVER`, `$_ENV`.",
    "4. **Vaqt:** `Carbon::setTestNow()` qaytarilmasa. Laravel'ning `travel()` / `travelTo()` avtomatik qaytaradi.",
    "5. **Fayl tizimi:** testlar yaratgan fayllar. Yechim: `Storage::fake()`, vaqtinchalik papkalar va tozalash.",
    "6. **Kesh:** `CACHE_STORE=array` (har test uchun yangi), Redis bo'lsa tozalash.",
    "7. **Tashqi servislar:** haqiqiy API'larga yozilgan ma'lumot. Yechim: `Http::fake()`, `preventStrayRequests()`.",
    "8. **Facade fake'lari va mock'lari:** Laravel avtomatik tozalaydi (`Mockery::close()`, facade ildizlari qayta o'rnatiladi).",
    "9. **Laravel'ning statik konfiguratsiyalari:** `Model::preventLazyLoading()`, `Model::unguard()`, `JsonResource::withoutWrapping()`, `Password::defaults()` — testda o'zgartirilsa, boshqa testlarga ta'sir qiladi.",
    "",
    "### Tartibga bog'liqlikni aniqlash",
    "- `phpunit --order-by=random` (yoki `php artisan test --order-by=random`) — har safar tasodifiy tartib. Yiqilish tartibga bog'liqlikni ko'rsatadi. `--random-order-seed=12345` bilan aynan qayta takrorlash.",
    "- `--order-by=reverse`.",
    "- `--parallel` — ko'p izolyatsiya muammolarini fosh qiladi.",
    "",
    "CI'da muntazam tasodifiy tartib bilan ishga tushirish yaxshi amaliyot.",
    "",
    "### #[Depends] dan qoching",
    "PHPUnit `#[Depends('testCreate')]` bilan bir test boshqasining natijasini olishi mumkin. Bu ataylab izolyatsiyani buzish: birinchisi yiqilsa, ikkinchisi o'tkazib yuboriladi va ular tartibga bog'liq. Odatda har testni o'z fixture'i bilan mustaqil yozgan yaxshi.",
    "",
    "### Process isolation",
    "`#[RunInSeparateProcess]` — test alohida PHP jarayonida. Global holatni (konstanta, `define`, header'lar) o'zgartiruvchi kod uchun. Juda sekin, faqat istisno holatlarda."
  ],
  "examples": [
    {
      "title": "Statik holat oqishi va tuzatish",
      "lang": "php",
      "code": [
        "// Muammo: statik kesh testlar orasida saqlanadi",
        "final class FeatureFlags",
        "{",
        "    private static array $overrides = [];",
        "",
        "    public static function enable(string $flag): void { self::$overrides[$flag] = true; }",
        "    public static function enabled(string $flag): bool { return self::$overrides[$flag] ?? config(\"features.{$flag}\", false); }",
        "    public static function reset(): void { self::$overrides = []; }",
        "}",
        "",
        "// Tests\\TestCase",
        "protected function tearDown(): void",
        "{",
        "    FeatureFlags::reset();",
        "    parent::tearDown();",
        "}",
        "",
        "// Yaxshiroq: statik o'rniga container singleton (har test yangi container)",
        "$this->app->singleton(FeatureFlags::class);"
      ]
    },
    {
      "title": "Tartibga bog'liqlikni topish",
      "lang": "bash",
      "code": [
        "php artisan test --order-by=random",
        "# Random Seed: 1749553200 ... 1 failed",
        "",
        "php artisan test --order-by=random --random-order-seed=1749553200   # aynan takrorlash",
        "",
        "php artisan test --parallel --processes=8"
      ]
    }
  ],
  "pitfalls": [
    "Statik xususiyatlarda holat saqlab, testlar orasida tozalamaslik.",
    "`Model::unguard()` yoki `preventLazyLoading(false)` kabi global sozlamalarni testda o'zgartirib, qaytarmaslik.",
    "`#[Depends]` bilan testlar zanjirini qurish.",
    "Testlarni har doim bir xil tartibda ishga tushirib, bog'liqliklarni hech qachon sezmaslik."
  ]
});
