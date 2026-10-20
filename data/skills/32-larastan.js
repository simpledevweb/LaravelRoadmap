/* 32 · Larastan
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 32,
  slug: "larastan",
  title: "Larastan",
  group: "testing",
  description: "Larastan — Laravel uchun PHPStan extension'i. U framework'ning \"sehri\"ni — Eloquent magic atributlari, relation'lar, query builder, facade'lar, container — statik tahlilchiga tushuntiradi. Natijada Laravel kodida ham yuqori darajadagi tip xavfsizligiga erishish mumkin. Senior dasturchi Larastan'ni sozlaydi, modellarni to'g'ri annotatsiya qiladi va Laravel'ga xos xatolarni tez tashxis qiladi.",
  subskills: [
    {
      id: "32.1",
      title: "Larastan Configuration",
      description: [
        "O'rnatish: `composer require --dev larastan/larastan`, `phpstan.neon` da `includes: vendor/larastan/larastan/extension.neon`. Asosiy parametrlar: `level`, `paths` (`app`, kerak bo'lsa `database`, `routes`), `excludePaths` (generatsiya qilingan kod), `noEnvCallsOutsideOfConfig` (env() ni config'dan tashqarida taqiqlash), `checkModelProperties` (mavjud bo'lmagan atributlarni topish — migratsiyalarni o'qiydi).",
        "",
        "Larastan ilovani qisman ishga tushiradi (container uchun) — bootstrap xatolari tahlilni to'xtatishi mumkin.",
        "",
        "```neon",
        "includes:",
        "    - vendor/larastan/larastan/extension.neon",
        "parameters:",
        "    level: 7",
        "    paths: [app, config, database, routes]",
        "    noEnvCallsOutsideOfConfig: true",
        "    checkModelProperties: true",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Larastan'ni `checkModelProperties` va `noEnvCallsOutsideOfConfig` bilan sozlab, topilgan xatolarni tuzating.",
      acceptanceCriteria: [
        "Asosiy Larastan parametrlarini biladi",
        "Larastan ilovani bootstrap qilishini tushunadi"
      ],
      prerequisites: [
        "31.14"
      ]
    },
    {
      id: "32.2",
      title: "Laravel-Specific Type Analysis",
      description: [
        "Larastan Laravel funksiyalari va helper'lari uchun aniq tiplar beradi: `auth()->user()` → `User|null`, `request()->input()`, `config('app.name')` (config qiymat tipi), `app(Mailer::class)` → `Mailer`, `collect([...])` generic'lari, `response()`, `redirect()`, route model binding, `Validator`, `Request::validated()`.",
        "",
        "Natija: `auth()->user()->name` kabi null xavfli kod 8-darajada ushlanadi; noto'g'ri helper ishlatilishi topiladi. Larastan `@mixin` va dinamik metodlarni ham tushunadi.",
        "",
        "```php",
        "$user = auth()->user();     // User|null",
        "$user->name;                // ❌ level 8: Cannot access property on User|null",
        "$name = $request->user()?->name ?? 'Mehmon';",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "8-darajada `auth()->user()` va `request()` bilan bog'liq xatolarni toping va xavfsiz shaklga keltiring.",
      acceptanceCriteria: [
        "Larastan qaysi Laravel helper'larini tushunishini biladi",
        "Null xavfli helper chaqiruvlarini tuzatadi"
      ],
      prerequisites: [
        "32.1"
      ]
    },
    {
      id: "32.3",
      title: "Eloquent Model Types",
      description: [
        "Larastan model atributlarini migratsiyalardan (yoki DB sxemasidan) va `casts()` dan o'qiydi: `$order->total` — `int`, `$order->paid_at` — `CarbonImmutable|null`, `$order->status` — `OrderStatus`. Accessor'lar (`Attribute::make`) tiplari qaytish tipidan.",
        "",
        "Aniqlik uchun model'ga `@property` PHPDoc'lar yozish (yoki `barryvdh/laravel-ide-helper` bilan `ide-helper:models --write`) — IDE va tahlilchi uchun yagona manba. Mavjud bo'lmagan atributga murojaat (`$order->totl`) xato sifatida ushlanadi.",
        "",
        "```php",
        "/**",
        " * @property int $id",
        " * @property int $total",
        " * @property OrderStatus $status",
        " * @property-read Customer $customer",
        " */",
        "final class Order extends Model {}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy modellar uchun `@property` annotatsiyalarini generatsiya qilib, Larastan model tiplarini aniqlang.",
      acceptanceCriteria: [
        "Larastan model tiplarini qayerdan olishini biladi",
        "Model annotatsiyalarini izchil saqlaydi"
      ],
      prerequisites: [
        "13.5"
      ]
    },
    {
      id: "32.4",
      title: "Relationship Return Types",
      description: [
        "Relation metodlariga qaytish tipi va generic'lar: `public function items(): HasMany` + `@return HasMany<OrderItem, $this>`. Larastan shu orqali `$order->items` ni `Collection<int, OrderItem>`, `$order->customer` ni `Customer` (yoki `belongsTo` nullable bo'lsa `Customer|null`) deb biladi.",
        "",
        "Natija: `$order->items->sum('qty')`, `$order->customer->email` kabi zanjirlarda tip xatolari va null xavflari topiladi; IDE avtoto'ldirish ishlaydi.",
        "",
        "```php",
        "/** @return HasMany<OrderItem, $this> */",
        "public function items(): HasMany",
        "{",
        "    return $this->hasMany(OrderItem::class);",
        "}",
        "",
        "/** @return BelongsTo<Customer, $this> */",
        "public function customer(): BelongsTo",
        "{",
        "    return $this->belongsTo(Customer::class);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Barcha relation metodlariga qaytish tipi va generic PHPDoc qo'shing.",
      acceptanceCriteria: [
        "Relation generic'larini to'g'ri yozadi",
        "Relation tiplari zanjirdagi xatolarni topishga qanday yordam berishini biladi"
      ],
      prerequisites: [
        "13.9"
      ]
    },
    {
      id: "32.5",
      title: "Builder Types",
      description: [
        "Larastan `Order::query()`, `where()`, scope'lar va custom builder'lar uchun `Builder<Order>` tipini kuzatadi: `->get()` — `Collection<int, Order>`, `->first()` — `Order|null`, `->firstOrFail()` — `Order`, `->paginate()` — `LengthAwarePaginator<int, Order>`. Local scope'lar builder metodlari sifatida tan olinadi.",
        "",
        "Custom Eloquent builder (`newEloquentBuilder` + `@method` yoki generic `@extends Builder<Order>`) — scope'lardan ko'ra aniqroq tiplash beradi.",
        "",
        "```php",
        "/** @extends Builder<Order> */",
        "final class OrderBuilder extends Builder",
        "{",
        "    public function paid(): self { return $this->where('status', OrderStatus::Paid); }",
        "}",
        "",
        "Order::query()->paid()->first(); // Order|null",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ko'p scope'li model uchun custom builder class yaratib, uni generic bilan tiplang.",
      acceptanceCriteria: [
        "Builder qaytish tiplarini biladi",
        "Custom builder'ni generic bilan tiplaydi"
      ],
      prerequisites: [
        "13.13"
      ]
    },
    {
      id: "32.6",
      title: "Collection Types",
      description: [
        "`Illuminate\\Support\\Collection<TKey, TValue>` va Eloquent `Collection` generic: `map`, `filter`, `pluck`, `keyBy`, `groupBy` natija tiplari Larastan tomonidan hisoblanadi. Metod qaytishida aniq tip: `@return Collection<int, OrderDto>`.",
        "",
        "Bu `->map(fn (Order $o) => ...)` dagi parametr tipini tekshiradi va noto'g'ri element turini topadi. Kolleksiyalarni metodlar o'rtasida uzatishda generic'lar hujjat vazifasini ham bajaradi.",
        "",
        "```php",
        "/** @return Collection<int, string> */",
        "public function emails(): Collection",
        "{",
        "    return $this->customers()->get()->map(fn (Customer $c) => $c->email);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kolleksiya qaytaruvchi metodlarga generic tiplar qo'shing va map/filter callback'laridagi xatolarni toping.",
      acceptanceCriteria: [
        "Collection generic'larini to'g'ri yozadi",
        "Callback parametr tiplarini tekshirtiradi"
      ],
      prerequisites: [
        "31.4"
      ]
    },
    {
      id: "32.7",
      title: "Facade Analysis",
      description: [
        "Larastan facade'larni ularning asl class'iga (container'dagi servisga) bog'laydi: `Cache::get()` → `Repository::get()`, `DB::table()` → `Builder`. Shuning uchun facade metodlari, argumentlari va qaytish tiplari tekshiriladi. `@method` PHPDoc'lar facade class'larida (Laravel ularni o'zi yozadi).",
        "",
        "Custom facade'lar uchun ham `getFacadeAccessor()` + `@method static` annotatsiyalari yoki `@see` asl class'ga; real-time facade'lar ham tushuniladi.",
        "",
        "```php",
        "/**",
        " * @method static Money convert(Money $from, string $to)",
        " * @see \\App\\Services\\CurrencyConverter",
        " */",
        "final class Currency extends Facade",
        "{",
        "    protected static function getFacadeAccessor(): string { return CurrencyConverter::class; }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Custom facade uchun to'g'ri `@method` annotatsiyalarini yozing va Larastan uni tekshirayotganini tasdiqlang.",
      acceptanceCriteria: [
        "Larastan facade'larni qanday hal qilishini biladi",
        "Custom facade'larni annotatsiya qiladi"
      ],
      prerequisites: [
        "2.9"
      ]
    },
    {
      id: "32.8",
      title: "Container Resolution Analysis",
      description: [
        "Larastan `app(X::class)`, `resolve()`, `$this->app->make()` va `App::make()` natijasini `X` tipi sifatida biladi — container'dan olingan obyektda metod chaqiruvlari tekshiriladi. String kalitlar (`app('cache')`) uchun Larastan haqiqiy binding'ni ilovadan aniqlaydi.",
        "",
        "Cheklov: dinamik binding'lar (runtime'da qaror qilinadigan) to'liq tushunilmasligi mumkin. Biznes kodda service locator o'rniga constructor injection — tahlilni ham soddalashtiradi.",
        "",
        "```php",
        "$gateway = app(PaymentGateway::class);   // PaymentGateway",
        "$gateway->chrge($money);                 // ❌ Call to an undefined method chrge()",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Kod bazasidagi `app()`/`resolve()` chaqiruvlarini toping va iloji boricha constructor injection'ga o'tkazing.",
      acceptanceCriteria: [
        "Container chaqiruvlari qanday tiplanishini biladi",
        "Service locator'ni DI bilan almashtiradi"
      ],
      prerequisites: [
        "2.27"
      ]
    },
    {
      id: "32.9",
      title: "Dynamic Properties",
      description: [
        "Laravel'da dinamik property'lar ko'p: Eloquent atributlari va relation'lar, `$request->email` (input), `Arr`/`Fluent` obyektlar, PHP 8.2 da dinamik property'lar deprecated (class'larda `#[AllowDynamicProperties]` yoki aniq e'lon). Larastan Eloquent va Request uchun ularni tushunadi; boshqa dinamik property'lar xato beradi.",
        "",
        "Yaxshi amaliyot: `$request->input('email')` yoki `$request->validated('email')` (aniq), model atributlari `@property` bilan, DTO'larda aniq typed property'lar.",
        "",
        "```php",
        "$email = $request->email;                   // ishlaydi, lekin noaniq",
        "$email = $request->validated('email');      // aniq va xavfsiz",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Dinamik property murojaatlarini aniq metod chaqiruvlari yoki typed property'lar bilan almashtiring.",
      acceptanceCriteria: [
        "Laravel'dagi dinamik property manbalarini biladi",
        "PHP 8.2 deprecation'ini hisobga oladi"
      ],
      prerequisites: [
        "32.3"
      ]
    },
    {
      id: "32.10",
      title: "PHPDoc Annotations",
      description: [
        "Laravel kodida asosiy annotatsiyalar: model'larda `@property`, `@property-read` (relation va accessor), `@method static Builder<self> query()`; relation'larda `@return HasMany<X, $this>`; kolleksiyalarda generic'lar; factory'larda `@extends Factory<Order>`; resource'larda `@mixin Order` (`$this->id` uchun); custom builder'larda `@extends Builder<Order>`.",
        "",
        "`barryvdh/laravel-ide-helper` modellar uchun annotatsiyalarni avtomatik generatsiya qiladi — migratsiyalar bilan sinxron saqlash uchun CI'da tekshirish mumkin.",
        "",
        "```php",
        "/** @mixin \\App\\Models\\Order */",
        "final class OrderResource extends JsonResource {}",
        "",
        "/** @extends Factory<Order> */",
        "final class OrderFactory extends Factory {}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Resource, factory va modellarga kerakli annotatsiyalarni qo'shing va ide-helper'ni CI'da sinxron tekshiring.",
      acceptanceCriteria: [
        "Laravel'ga xos annotatsiyalarni biladi",
        "Annotatsiyalarni avtomatik generatsiya va sinxron saqlaydi"
      ],
      prerequisites: [
        "31.5"
      ]
    },
    {
      id: "32.11",
      title: "Baseline Management",
      description: [
        "Laravel loyihasida Larastan baseline: mavjud xatolarni `--generate-baseline` bilan muzlatish, yangi kod toza. Larastan yangilanganda yangi xatolar paydo bo'lishi yoki ba'zilari yo'qolishi mumkin — `reportUnmatchedIgnoredErrors: true` baseline'ni toza saqlaydi.",
        "",
        "Baseline'ni modul bo'yicha kamaytirish (masalan, avval `app/Models` va `app/Actions`), har sprintda maqsadli raqam, Laravel/Larastan upgrade'idan keyin baseline'ni qayta ko'rib chiqish.",
        "",
        "```bash",
        "vendor/bin/phpstan analyse --generate-baseline phpstan-baseline.neon",
        "grep -c \"message:\" phpstan-baseline.neon   # baseline hajmi metrikasi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Larastan baseline hajmini haftalik kuzatib boruvchi CI hisobotini sozlang va bir modulni toza qiling.",
      acceptanceCriteria: [
        "Laravel loyihasida baseline'ni boshqaradi",
        "Upgrade'lardan keyin baseline'ni qayta ko'radi"
      ],
      prerequisites: [
        "31.9"
      ]
    },
    {
      id: "32.12",
      title: "CI Integration",
      description: [
        "Larastan CI'da: Laravel ilovasi bootstrap bo'lishi uchun `.env` (yoki `APP_KEY`) kerak bo'lishi mumkin; kesh (`tmpDir`) saqlash; xotira limiti (`--memory-limit=2G` katta loyihalar uchun); natija formati (`github`, `gitlab`). PR'da faqat yangi xatolar (baseline tufayli).",
        "",
        "Qo'shimcha tekshiruvlar bilan birga: Pint (uslub), Larastan (tiplar), Pest (testlar), Rector `--dry-run` (modernizatsiya). Composer skripti `check` barchasini birlashtiradi.",
        "",
        "```yaml",
        "- run: cp .env.example .env && php artisan key:generate",
        "- run: vendor/bin/phpstan analyse --error-format=github --memory-limit=2G",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "CI'ga Larastan bosqichini ilova bootstrap, kesh va PR annotatsiyalari bilan qo'shing.",
      acceptanceCriteria: [
        "Larastan CI talablarini (bootstrap, xotira) biladi",
        "Statik tekshiruvlarni yagona pipeline'ga birlashtiradi"
      ],
      prerequisites: [
        "31.12"
      ]
    },
    {
      id: "32.13",
      title: "Incremental Strictness",
      description: [
        "Qat'iylikni bosqichma-bosqich oshirish: daraja (5 → 6 → 8 → 9), `checkModelProperties`, `noEnvCallsOutsideOfConfig`, `checkOctaneCompatibility`, strict-rules, `treatPhpDocTypesAsCertain: false`, `checkMissingIterableValueType`, deprecation-rules. Har bosqichda baseline yangilanadi va xatolar kamaytiriladi.",
        "",
        "Modul bo'yicha turli qat'iylik: yangi domen kodi uchun alohida yuqori darajali konfiguratsiya, legacy uchun past. Rector tip deklaratsiyalarini avtomatik qo'shib, keyingi bosqichga o'tishni tezlashtiradi.",
        "",
        "```neon",
        "parameters:",
        "    level: 8",
        "    checkOctaneCompatibility: true",
        "    checkModelProperties: true",
        "    noEnvCallsOutsideOfConfig: true",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Larastan qat'iyligini oshirish yo'l xaritasini tuzing va keyingi bosqichga o'ting.",
      acceptanceCriteria: [
        "Larastan qo'shimcha qat'iylik sozlamalarini biladi",
        "Qat'iylikni bosqichma-bosqich oshiradi"
      ],
      prerequisites: [
        "31.13"
      ]
    },
    {
      id: "32.14",
      title: "Diagnosing Laravel-Specific Errors",
      description: [
        "Tipik Larastan xatolari va yechimlari: \"Access to an undefined property Model::$x\" — migratsiya o'qilmagan yoki `@property` yo'q; \"Call to an undefined method Builder::scopeX()\" — scope nomi yoki custom builder tiplanmagan; \"Relation ... not found\" — relation qaytish tipi yo'q; \"Cannot call method on User|null\" — `auth()->user()` null tekshiruvisiz; macro'lar — IDE helper yoki stub; \"Larastan could not bootstrap\" — `.env`, provider xatosi.",
        "",
        "Diagnostika: `\\PHPStan\\dumpType()`, `--debug -vvv` (qaysi faylda to'xtagan), Larastan GitHub issue'lari, minimal reproduksiya.",
        "",
        "```php",
        "\\PHPStan\\dumpType(Order::query()->with('items')->first());",
        "// Dumped type: App\\Models\\Order|null",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Larastan chiqargan 10 ta xatoni toifalarga ajratib, har biri uchun yechimni hujjatlashtiring.",
      acceptanceCriteria: [
        "Tipik Larastan xatolarini va sabablarini biladi",
        "Diagnostika vositalaridan foydalanadi"
      ],
      prerequisites: [
        "32.3",
        "32.4"
      ]
    }
  ]
});
