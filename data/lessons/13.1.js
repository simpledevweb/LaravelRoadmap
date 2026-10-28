/* Chuqur dars: 13.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.1", {
  "lesson": [
    "### Model nima",
    "Eloquent — Laravel'ning **Active Record** uslubidagi ORM'i. Har bir model klassi bitta jadvalni, har bir obyekt esa bitta qatorni ifodalaydi. Obyekt o'zini o'zi saqlay oladi (`$user->save()`), so'rov quruvchi esa statik chaqiruvlar orqali ishlaydi (`User::where(...)`).",
    "",
    "`php artisan make:model Order -mfsc` model bilan birga migratsiya, factory, seeder va controller yaratadi.",
    "",
    "### Konvensiyalar",
    "Eloquent ko'p narsani nomdan taxmin qiladi:",
    "- Jadval: klass nomining snake_case ko'plik shakli. `OrderItem` → `order_items`.",
    "- PK: `id`, auto-increment, `int`.",
    "- Vaqt belgilari: `created_at`, `updated_at` avtomatik to'ldiriladi.",
    "- Ulanish: `config/database.php` dagi default.",
    "",
    "Konvensiyaga mos kelmasa, xususiyatlar bilan sozlanadi.",
    "",
    "### Asosiy konfiguratsiya xususiyatlari",
    "- `protected $table = 'legacy_orders';`",
    "- `protected $primaryKey = 'order_id';`",
    "- `public $incrementing = false;` va `protected $keyType = 'string';` (UUID/ULID PK uchun). Laravel 9+ da `HasUuids` yoki `HasUlids` trait'lari buni avtomatik qiladi.",
    "- `public $timestamps = false;` yoki `const CREATED_AT = 'created';` kabi nomlarni o'zgartirish.",
    "- `protected $connection = 'reporting';`",
    "- `protected $attributes = ['status' => 'draft'];`: yangi obyekt uchun default qiymatlar.",
    "- `protected $fillable` / `$guarded` (13.4), `$casts` yoki `casts()` metodi (13.5), `$hidden`/`$visible` (JSON'ga chiqmaydigan maydonlar), `$appends`, `$with` (har doim eager load).",
    "",
    "### Strict mode",
    "Laravel 9.35+ da `AppServiceProvider::boot()` ichida `Model::shouldBeStrict(! app()->isProduction())` uchta himoyani yoqadi:",
    "- `preventLazyLoading`: N+1 ni exception bilan ushlaydi (13.12).",
    "- `preventSilentlyDiscardingAttributes`: `$fillable` da yo'q maydon jim tashlab yuborilmaydi.",
    "- `preventAccessingMissingAttributes`: `select()` da olinmagan ustunga murojaat xato beradi.",
    "",
    "### Model qayerda turadi",
    "Model ma'lumotlarga kirish, munosabatlar, cast'lar va kichik domen metodlarini (`$order->isPaid()`) saqlaydi. Murakkab biznes jarayonlari (to'lov, hisob-kitob, tashqi API) service yoki action klasslariga chiqariladi. Aks holda \"fat model\" minglab qatorga yetadi."
  ],
  "examples": [
    {
      "title": "Konvensiyadan farq qiluvchi model",
      "lang": "php",
      "code": [
        "use Illuminate\\Database\\Eloquent\\Concerns\\HasUlids;",
        "",
        "class Invoice extends Model",
        "{",
        "    use HasUlids;",
        "",
        "    protected $table = 'billing_invoices';",
        "    protected $connection = 'billing';",
        "    protected $attributes = ['status' => 'draft'];",
        "    protected $hidden = ['internal_note'];",
        "",
        "    protected function casts(): array",
        "    {",
        "        return ['issued_at' => 'immutable_datetime', 'total' => 'decimal:2'];",
        "    }",
        "",
        "    public function isPaid(): bool",
        "    {",
        "        return $this->status === 'paid';",
        "    }",
        "}"
      ],
      "note": "`casts()` metodi Laravel 11+ da. Eski versiyalarda `protected $casts = [...]` xususiyati ishlatiladi."
    },
    {
      "title": "Strict mode",
      "lang": "php",
      "code": [
        "// app/Providers/AppServiceProvider.php",
        "public function boot(): void",
        "{",
        "    Model::shouldBeStrict(! $this->app->isProduction());",
        "}",
        "",
        "// Dev'da endi exception:",
        "$user = User::select('id')->first();",
        "$user->email;  // MissingAttributeException"
      ]
    }
  ],
  "pitfalls": [
    "UUID PK'li modelda `$incrementing = false` va `$keyType = 'string'` ni unutish: `find()` va munosabatlar noto'g'ri ishlaydi. `HasUuids` trait'idan foydalaning.",
    "`$with` ga ko'p munosabat qo'yish: har bir so'rov, hatto `count` uchun ham keraksiz JOIN yoki so'rovlar bajariladi.",
    "Barcha biznes mantiqni modelga yozish: test qilish va qayta ishlatish qiyinlashadi.",
    "Strict mode'ni production'da yoqish: lazy loading exception foydalanuvchiga 500 bo'lib chiqadi. Production'da log qilish yetarli."
  ]
});
