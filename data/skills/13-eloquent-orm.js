/* 13 · Eloquent ORM
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 13,
  slug: "eloquent-orm",
  title: "Eloquent ORM",
  group: "php-laravel",
  description: "Eloquent — Laravel'ning Active Record ORM'i: har bir model jadval qatorini ifodalaydi va o'zini saqlash, o'chirish va bog'liq yozuvlarni yuklashni biladi. Eloquent ishlab chiqishni juda tezlashtiradi, lekin uning \"sehri\" N+1, ortiqcha xotira va yashirin so'rovlarni ham yashiradi. Senior dasturchi Eloquent qanday SQL yaratayotganini ko'radi va qachon query builder yoki raw SQL'ga o'tishni biladi.",
  subskills: [
    {
      id: "13.1",
      title: "Models va Model Configuration",
      description: [
        "Model — `Illuminate\\Database\\Eloquent\\Model` dan meros oluvchi class. Konvensiyalar: `Order` → `orders` jadvali, `id` PK, `created_at`/`updated_at`. Sozlanadigan xususiyatlar: `$table`, `$primaryKey`, `$keyType` + `$incrementing` (UUID/ULID uchun yoki `HasUuids`/`HasUlids` trait'lari), `$timestamps`, `$connection`, `$attributes` (default qiymatlar), `$hidden`/`$visible`, `$with` (har doim eager load — ehtiyot bo'ling).",
        "",
        "Laravel 11+ da `casts()` metodi va atribut asosidagi konfiguratsiya (`#[ObservedBy]`, `#[ScopedBy]`). Development'da `Model::shouldBeStrict()` — lazy loading, yo'q atribut va jim tashlab yuborilgan mass assignment xatolarini ushlaydi.",
        "",
        "```php",
        "final class Order extends Model",
        "{",
        "    use HasUlids, SoftDeletes;",
        "",
        "    protected $attributes = ['status' => 'pending'];",
        "    protected $hidden = ['internal_note'];",
        "}",
        "",
        "// AppServiceProvider::boot()",
        "Model::shouldBeStrict(! app()->isProduction());",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihada `Model::shouldBeStrict()` ni yoqing va chiqqan barcha xatolarni tuzating.",
      acceptanceCriteria: [
        "Model konvensiyalari va ularni qayta yozishni biladi",
        "Strict mode qaysi xatolarni ushlashini tushuntira oladi"
      ],
      prerequisites: [
        "2.2"
      ]
    },
    {
      id: "13.2",
      title: "CRUD Operations",
      description: [
        "Yaratish: `Model::create($data)`, `new` + `save()`, `firstOrCreate`, `updateOrCreate`. O'qish: `find`, `findOrFail`, `first`, `where(...)->get()`, `firstWhere`, `sole` (aniq bitta bo'lishi kerak). Yangilash: `$model->update()`, `$model->fill()->save()`, so'rov orqali ommaviy `Order::where(...)->update()`. O'chirish: `delete()`, `destroy($ids)`, `forceDelete()`.",
        "",
        "Farqni bilish muhim: model orqali amal — event'lar, cast'lar, timestamp'lar ishlaydi; so'rov orqali ommaviy amal — bitta SQL, event'larsiz. `isDirty()`, `wasChanged()`, `getOriginal()` o'zgarishlarni kuzatadi; `save()` faqat o'zgargan ustunlarni yozadi.",
        "",
        "```php",
        "$order = Order::updateOrCreate(",
        "    ['external_id' => $payload['id']],",
        "    ['status' => $payload['status'], 'total' => $payload['amount']],",
        ");",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Tashqi API'dan kelgan ma'lumotni `updateOrCreate` bilan idempotent sinxronlaydigan servis yozing.",
      acceptanceCriteria: [
        "Model va so'rov darajasidagi amallar farqini biladi",
        "`firstOrCreate` ning race condition'ini (unique constraint kerakligini) tushunadi"
      ],
      prerequisites: [
        "13.1"
      ]
    },
    {
      id: "13.3",
      title: "Mass Assignment",
      description: [
        "Mass assignment — massivni bir yo'la modelga berish (`create($request->all())`). Xavf: foydalanuvchi so'rovga `is_admin=1` yoki `balance=999999` qo'shib, ruxsat etilmagan ustunni o'zgartiradi.",
        "",
        "Himoya: modelda `$fillable`/`$guarded`, controller'da faqat `$request->validated()` yoki `$request->safe()->only([...])`. `Model::preventSilentlyDiscardingAttributes()` — fillable bo'lmagan atribut jim tashlab yuborilganda xato beradi (bug'larni erta topadi). `forceFill()` — himoyani chetlab o'tadi, faqat ishonchli ichki ma'lumot uchun.",
        "",
        "```php",
        "// Xavfli",
        "User::create($request->all());",
        "// Xavfsiz",
        "User::create($request->validated());",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihadagi `->all()` bilan yaratish/yangilashlarni topib, `validated()` ga o'tkazing.",
      acceptanceCriteria: [
        "Mass assignment hujumini misol bilan tushuntira oladi",
        "Validatsiya va fillable ikki qatlamli himoya ekanini biladi"
      ],
      prerequisites: [
        "2.12"
      ]
    },
    {
      id: "13.4",
      title: "`$fillable` va `$guarded`",
      description: [
        "`$fillable` — mass assignment orqali to'ldirish **mumkin** bo'lgan ustunlar ro'yxati (whitelist — xavfsizroq). `$guarded` — **taqiqlangan** ustunlar (blacklist); `$guarded = []` hamma narsani ochadi va faqat `validated()` qat'iy ishlatilgan jamoalarda qabul qilinadi.",
        "",
        "Whitelist afzalligi: yangi ustun qo'shilganda u avtomatik himoyalangan bo'ladi. `Model::unguard()` — seeder'larda vaqtincha. Laravel 11+ da `$guarded` ustun nomini DB sxemasi bilan tekshiradi — mavjud bo'lmagan ustun nomi orqali hujumning oldini olish uchun.",
        "",
        "```php",
        "final class Product extends Model",
        "{",
        "    protected $fillable = ['name', 'price', 'description'];",
        "    // 'is_featured', 'approved_at' — faqat aniq metodlar orqali o'zgaradi",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Jamoa uchun `$fillable` yoki `$guarded = []` + validated() siyosatini tanlab, asoslab yozing.",
      acceptanceCriteria: [
        "Whitelist va blacklist yondashuvlari farqini biladi",
        "Sezgir ustunlarni faqat maxsus metodlar orqali o'zgartiradi"
      ],
      prerequisites: [
        "13.3"
      ]
    },
    {
      id: "13.5",
      title: "Attribute Casting",
      description: [
        "Cast — DB qiymatini PHP tipiga va aksincha avtomatik aylantirish: `integer`, `boolean`, `decimal:2`, `datetime`/`immutable_datetime`, `array`/`json`, `AsCollection`, `AsArrayObject`, `encrypted` (DB'da shifrlangan saqlash), `hashed` (parol), enum class'lar, custom cast (`CastsAttributes`) va value object cast'lar.",
        "",
        "Laravel 11+ da `casts()` metodi. Custom cast — `Money`, `Address` kabi value object'larni bir yoki bir nechta ustunga map qilish uchun eng toza yo'l.",
        "",
        "```php",
        "protected function casts(): array",
        "{",
        "    return [",
        "        'status'     => OrderStatus::class,",
        "        'paid_at'    => 'immutable_datetime',",
        "        'meta'       => AsArrayObject::class,",
        "        'card_token' => 'encrypted',",
        "        'total'      => MoneyCast::class,",
        "    ];",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Narx ustunlari uchun `Money` value object qaytaradigan custom cast yozing.",
      acceptanceCriteria: [
        "Asosiy cast turlari va ularning vazifasini biladi",
        "Custom cast'ni value object bilan bog'lay oladi"
      ],
      prerequisites: [
        "1.7",
        "3.9"
      ]
    },
    {
      id: "13.6",
      title: "Accessors va Mutators",
      description: [
        "Accessor — atributni o'qishda o'zgartirish, mutator — yozishda. Laravel 9+ sintaksisi: `Attribute::make(get: ..., set: ...)` qaytaruvchi metod. `$appends` — hisoblangan atributni JSON'ga qo'shish (ehtiyot: har serializatsiyada hisoblanadi, ichida so'rov bo'lsa N+1).",
        "",
        "Qachon ishlatish: formatlash (to'liq ism), normallashtirish (email kichik harf). Murakkab biznes mantiq yoki boshqa so'rovlar accessor ichida bo'lmasligi kerak. `shouldCache()` qimmat hisoblashni bir marta bajaradi.",
        "",
        "```php",
        "protected function email(): Attribute",
        "{",
        "    return Attribute::make(set: fn (string $v) => mb_strtolower(trim($v)));",
        "}",
        "",
        "protected function fullName(): Attribute",
        "{",
        "    return Attribute::make(get: fn () => \"{$this->first_name} {$this->last_name}\");",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Telefon raqamini yozishda normallashtiruvchi mutator va o'qishda formatlovchi accessor yozing.",
      acceptanceCriteria: [
        "Yangi `Attribute` sintaksisini ishlatadi",
        "`$appends` ning performance xavfini biladi"
      ],
      prerequisites: [
        "13.5"
      ]
    },
    {
      id: "13.7",
      title: "Model Events",
      description: [
        "Eloquent hayot davri event'lari: `retrieved`, `creating`/`created`, `updating`/`updated`, `saving`/`saved`, `deleting`/`deleted`, `restoring`/`restored`, `replicating`, `trashed`, `forceDeleting`. \"-ing\" event'dan `false` qaytarish amalni bekor qiladi. `booted()` metodida yoki `$dispatchesEvents` orqali tinglash.",
        "",
        "Muhim cheklovlar: ommaviy so'rovlar (`Order::where()->update()`, `insert()`, `upsert()`) event'larni ishga tushirmaydi; `saveQuietly()`/`withoutEvents()` ataylab o'chiradi. Model event'larida og'ir ish (email, API) — navbatga yuboring.",
        "",
        "```php",
        "protected static function booted(): void",
        "{",
        "    static::creating(function (Order $order) {",
        "        $order->number ??= app(OrderNumberGenerator::class)->next();",
        "    });",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Buyurtma raqamini `creating` event'ida avtomatik generatsiya qiling va ommaviy insert'da nima bo'lishini tekshiring.",
      acceptanceCriteria: [
        "\"-ing\" va \"-ed\" event'lar farqini biladi",
        "Ommaviy so'rovlar event'larni chetlab o'tishini biladi"
      ],
      prerequisites: [
        "13.2"
      ]
    },
    {
      id: "13.8",
      title: "Observers",
      description: [
        "Observer — bitta model event'larini bitta class'da jamlaydi (`OrderObserver::created()`, `updated()`...). Laravel 11+ da `#[ObservedBy(OrderObserver::class)]` atributi bilan ulanadi. `ShouldHandleEventsAfterCommit` — observer metodlari tranzaksiya commit'idan keyin chaqiriladi.",
        "",
        "Observer'lar yashirin yon ta'sirlarni keltirib chiqaradi: kodni o'qiyotgan dasturchi `$order->save()` dan keyin email ketishini ko'rmaydi. Tavsiya: observer'larni texnik vazifalar (cache invalidatsiya, search index, audit) uchun; biznes jarayonlar uchun aniq domen event'lari va action'lar.",
        "",
        "```php",
        "#[ObservedBy(ProductObserver::class)]",
        "final class Product extends Model {}",
        "",
        "final class ProductObserver implements ShouldHandleEventsAfterCommit",
        "{",
        "    public function saved(Product $p): void { Cache::forget(\"product:{$p->id}\"); }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Cache invalidatsiya mantiqini controller'lardan observer'ga ko'chiring va afterCommit bilan himoyalang.",
      acceptanceCriteria: [
        "Observer va domen event o'rtasida asosli tanlov qiladi",
        "`ShouldHandleEventsAfterCommit` maqsadini biladi"
      ],
      prerequisites: [
        "13.7",
        "5.8"
      ]
    },
    {
      id: "13.9",
      title: "Relationships: One-to-One, One-to-Many, Many-to-Many",
      description: [
        "- **One-to-One**: `hasOne` / `belongsTo` (User → Profile).",
        "- **One-to-Many**: `hasMany` / `belongsTo` (Post → Comments).",
        "- **Many-to-Many**: `belongsToMany` pivot jadval orqali (User ↔ Role); `withPivot`, `withTimestamps`, custom pivot model (`using()`), `attach`/`detach`/`sync`/`toggle`.",
        "- Qo'shimcha: `hasOneThrough`, `hasManyThrough`, `hasOne()->latestOfMany()`/`ofMany()`.",
        "",
        "Relation metodlari builder qaytaradi: `$user->posts()->where(...)` (so'rov) va `$user->posts` (yuklangan kolleksiya) farqi muhim. Relation'larga qaytish tipini yozing — Larastan uchun.",
        "",
        "```php",
        "public function latestOrder(): HasOne",
        "{",
        "    return $this->hasOne(Order::class)->latestOfMany();",
        "}",
        "",
        "$user->roles()->sync([1, 3]); // pivotni aniq holatga keltiradi",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "User–Role many-to-many'ni pivot'da `assigned_by` va timestamp bilan modellashtiring.",
      acceptanceCriteria: [
        "`$user->posts()` va `$user->posts` farqini biladi",
        "`sync`, `attach`, `syncWithoutDetaching` farqini tushuntira oladi"
      ],
      prerequisites: [
        "14.4"
      ]
    },
    {
      id: "13.10",
      title: "Polymorphic Relationships",
      description: [
        "Polymorphic relation bitta model bir nechta turdagi modelga tegishli bo'lishiga imkon beradi: `Comment` → `Post` yoki `Video` (`commentable_type`, `commentable_id`). Turlari: `morphOne`/`morphMany`/`morphTo`, `morphToMany`/`morphedByMany` (teglar).",
        "",
        "Muhim: `Relation::enforceMorphMap([...])` — DB'da to'liq class nomi o'rniga qisqa alias saqlaydi (refactoring xavfsiz, ichki tuzilma oshkor bo'lmaydi). Kamchilik: haqiqiy FK constraint yo'q — referensial yaxlitlik ilova zimmasida; `(type, id)` composite indeks shart.",
        "",
        "```php",
        "Relation::enforceMorphMap([",
        "    'post'  => Post::class,",
        "    'video' => Video::class,",
        "]);",
        "",
        "public function comments(): MorphMany { return $this->morphMany(Comment::class, 'commentable'); }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Teg tizimini `morphToMany` bilan yarating va morph map'ni majburiy qiling.",
      acceptanceCriteria: [
        "Morph map'ning ahamiyatini tushuntira oladi",
        "Polymorphic relation'da FK yo'qligi oqibatini biladi"
      ],
      prerequisites: [
        "13.9"
      ]
    },
    {
      id: "13.11",
      title: "Eager Loading va Lazy Loading",
      description: [
        "**Lazy loading** — relation unga birinchi murojaatda yuklanadi (har bir model uchun alohida so'rov). **Eager loading** — `with('relation')` bilan asosiy so'rovdan keyin bitta qo'shimcha `WHERE IN` so'rov orqali hammasi uchun birga.",
        "",
        "Usullar: `with()`, ichma-ich (`with('items.product')`), shartli (`with(['items' => fn ($q) => $q->where(...)])`), allaqachon olingan kolleksiya uchun `load()`/`loadMissing()`, sanash `withCount`, `withSum`, `withExists`. Faqat kerakli ustunlar: `with('author:id,name')` (FK ustunini qo'shishni unutmang).",
        "",
        "```php",
        "$orders = Order::with(['customer:id,name', 'items.product:id,title'])",
        "    ->withCount('items')",
        "    ->latest()",
        "    ->paginate(20);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ro'yxat sahifasidagi barcha relation'larni eager load qiling va so'rovlar sonini oldin/keyin o'lchang.",
      acceptanceCriteria: [
        "`with`, `load`, `loadMissing` farqini biladi",
        "`withCount`/`withSum` bilan agregatlarni yuklay oladi"
      ],
      prerequisites: [
        "13.9"
      ]
    },
    {
      id: "13.12",
      title: "N+1 Query Problem",
      description: [
        "N+1 — ro'yxat uchun 1 ta so'rov va har bir element uchun yana bittadan (N ta) so'rov. 50 ta buyurtmali sahifa 51 so'rov qiladi; ma'lumot ko'paygan sari sahifa sekinlashadi. Odatda Blade sikli, API Resource yoki accessor ichida relation'ga murojaat sabab bo'ladi.",
        "",
        "Aniqlash: Laravel Debugbar, Telescope, `Model::preventLazyLoading()` (dev'da exception), `DB::listen` bilan so'rovlarni sanovchi test. Tuzatish: eager loading, `withCount`, `whenLoaded` (resource'larda).",
        "",
        "```php",
        "// AppServiceProvider",
        "Model::preventLazyLoading(! app()->isProduction());",
        "",
        "// Test",
        "DB::enableQueryLog();",
        "$this->get('/orders')->assertOk();",
        "expect(count(DB::getQueryLog()))->toBeLessThan(6);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "So'rovlar sonini cheklovchi test yozing va N+1 bo'lgan endpoint'ni topib tuzating.",
      acceptanceCriteria: [
        "N+1 ni 3 xil vosita bilan aniqlay oladi",
        "So'rovlar sonini test bilan qotiradi"
      ],
      prerequisites: [
        "13.11"
      ]
    },
    {
      id: "13.13",
      title: "Query Scopes",
      description: [
        "Scope — qayta ishlatiladigan so'rov shartlari. Local scope: `scopeActive(Builder $q)` → `Product::active()`; Laravel 12 da `#[Scope]` atributi bilan oddiy protected metod. Parametrli scope'lar ham mumkin.",
        "",
        "Scope'lar takrorlanuvchi `where` zanjirlarini nomlangan, o'qiladigan biznes tushunchalarga aylantiradi. Juda ko'p scope bo'lsa — custom Eloquent builder class (`newEloquentBuilder`) yaxshiroq tashkil qiladi va IDE qo'llab-quvvatlashi yaxshiroq.",
        "",
        "```php",
        "public function scopeAvailable(Builder $q): void",
        "{",
        "    $q->where('stock', '>', 0)->whereNotNull('published_at');",
        "}",
        "",
        "public function scopePriceBetween(Builder $q, int $min, int $max): void",
        "{",
        "    $q->whereBetween('price', [$min, $max]);",
        "}",
        "",
        "Product::available()->priceBetween(10000, 50000)->get();",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Takrorlanuvchi filtrlarni scope'larga chiqaring yoki custom builder class yarating.",
      acceptanceCriteria: [
        "Local scope va custom builder o'rtasida tanlay oladi",
        "Scope'larni zanjir qilib ishlatadi"
      ],
      prerequisites: [
        "13.2"
      ]
    },
    {
      id: "13.14",
      title: "Local va Global Scopes",
      description: [
        "**Local scope** — aniq chaqirilganda qo'llanadi. **Global scope** — modelning **barcha** so'rovlariga avtomatik qo'shiladi: soft delete, multi-tenancy (`tenant_id`), faqat nashr etilganlar. `Scope` interfeysi yoki closure orqali; `#[ScopedBy]` atributi.",
        "",
        "Global scope'lar kuchli, lekin yashirin: admin panelda yoki job'da kutilmagan natija berishi mumkin. Chetlab o'tish: `withoutGlobalScope(TenantScope::class)`, `withoutGlobalScopes()`. Multi-tenancy uchun global scope + yaratishda tenant_id'ni avtomatik to'ldirish + test (boshqa tenant ma'lumoti ko'rinmasligi).",
        "",
        "```php",
        "final class TenantScope implements Scope",
        "{",
        "    public function apply(Builder $builder, Model $model): void",
        "    {",
        "        $builder->where($model->qualifyColumn('tenant_id'), app(CurrentTenant::class)->id);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Multi-tenant ilova uchun global scope yozing va boshqa tenant ma'lumotiga kirib bo'lmasligini testlang.",
      acceptanceCriteria: [
        "Global scope'ning yashirin ta'sirini biladi",
        "`qualifyColumn` ning JOIN'lardagi ahamiyatini tushunadi"
      ],
      prerequisites: [
        "13.13",
        "14.15"
      ]
    },
    {
      id: "13.15",
      title: "Collections",
      description: [
        "Eloquent `get()` `Illuminate\\Database\\Eloquent\\Collection` qaytaradi — 100 dan ortiq metodli kolleksiya: `map`, `filter`, `reduce`, `groupBy`, `keyBy`, `pluck`, `sum`, `sortBy`, `chunk`, `partition`, `each`. Eloquent kolleksiyasi qo'shimcha: `load`, `modelKeys`, `find`, `fresh`.",
        "",
        "Muhim tamoyil: filtrlash/agregatsiyani imkon qadar **DB'da** qiling — `Order::all()->where('status', 'paid')->sum('total')` butun jadvalni xotiraga yuklaydi; `Order::where('status', 'paid')->sum('total')` bitta SQL. Katta hajm uchun `LazyCollection` (`cursor()`, `lazy()`).",
        "",
        "```php",
        "$byStatus = $orders->groupBy(fn (Order $o) => $o->status->value)",
        "    ->map(fn ($group) => $group->sum('total'));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Xotirada filtrlash qilingan 3 ta joyni DB so'roviga ko'chiring va xotira sarfini solishtiring.",
      acceptanceCriteria: [
        "Kolleksiya va so'rov metodlari farqini biladi",
        "Katta ma'lumot uchun `LazyCollection` ishlatadi"
      ],
      prerequisites: [
        "1.17"
      ]
    },
    {
      id: "13.16",
      title: "API Resources bilan ishlash",
      description: [
        "Eloquent modelni to'g'ridan-to'g'ri JSON'ga qaytarish (`return $order;`) ichki tuzilmani oshkor qiladi va API shartnomasini DB'ga bog'laydi. API Resource — barqaror tashqi format.",
        "",
        "Eloquent bilan ishlash nozikliklari: `whenLoaded()` — relation yuklanmagan bo'lsa maydon chiqmaydi (yashirin N+1 yo'q), `whenCounted()`, `whenPivotLoaded()`; resource collection paginator bilan `meta`/`links` qaytaradi. Controller eager loading'ni boshqaradi, resource faqat formatlaydi.",
        "",
        "```php",
        "return OrderResource::collection(",
        "    Order::with('items')->withCount('items')->paginate()",
        ");",
        "// OrderResource::toArray: 'items_count' => $this->whenCounted('items')",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Model qaytaradigan endpoint'larni Resource'larga o'tkazing va javobga `whenLoaded`/`whenCounted` qo'llang.",
      acceptanceCriteria: [
        "Modelni to'g'ridan-to'g'ri qaytarish xavfini biladi",
        "`when*` metodlari N+1 ni qanday oldini olishini tushuntira oladi"
      ],
      prerequisites: [
        "2.25",
        "13.11"
      ]
    },
    {
      id: "13.17",
      title: "Soft Deletes",
      description: [
        "`SoftDeletes` trait'i yozuvni o'chirish o'rniga `deleted_at` ga vaqt yozadi; global scope ularni so'rovlardan yashiradi. `withTrashed()`, `onlyTrashed()`, `restore()`, `forceDelete()`, `prunable` bilan eskilarini butunlay tozalash.",
        "",
        "Nozikliklar: unique constraint (o'chirilgan email bilan qayta ro'yxatdan o'tish) — composite yoki partial indeks kerak; relation'lar avtomatik soft delete bo'lmaydi; FK `CASCADE` ishlamaydi; jadval o'sib boradi; GDPR \"unutilish huquqi\" haqiqiy o'chirishni talab qilishi mumkin.",
        "",
        "```php",
        "use SoftDeletes, MassPrunable;",
        "",
        "public function prunable(): Builder",
        "{",
        "    return static::onlyTrashed()->where('deleted_at', '<', now()->subMonths(6));",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Soft delete'li model uchun unique email muammosini hal qiling va 6 oydan keyin pruning'ni sozlang.",
      acceptanceCriteria: [
        "Soft delete'ning unique va FK bilan muammolarini biladi",
        "Pruning'ni sozlay oladi"
      ],
      prerequisites: [
        "14.13"
      ]
    },
    {
      id: "13.18",
      title: "Factories va Seeders",
      description: [
        "**Factory** — test va lokal muhit uchun model yaratish: `definition()`, state'lar (`->paid()`), relation'lar (`has()`, `for()`), `sequence()`, `afterCreating`. **Seeder** — DB'ni boshlang'ich yoki demo ma'lumot bilan to'ldirish.",
        "",
        "Yaxshi amaliyot: factory'lar minimal yaroqli modelni yaratadi, holatlar state metodlari orqali; testlarda `make()` (DB'siz) vs `create()`; production seeder'lar (ma'lumotnomalar) va demo seeder'larni ajratish; seeder'lar idempotent (`updateOrCreate`). Katta seeding uchun factory sekin — `insert` bo'laklari.",
        "",
        "```php",
        "final class OrderFactory extends Factory",
        "{",
        "    public function definition(): array",
        "    {",
        "        return ['customer_id' => Customer::factory(), 'status' => OrderStatus::Pending, 'total' => 10000];",
        "    }",
        "    public function paid(): static { return $this->state(['status' => OrderStatus::Paid, 'paid_at' => now()]); }",
        "}",
        "",
        "Order::factory()->paid()->has(OrderItem::factory()->count(3), 'items')->create();",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Asosiy modellar uchun state'li factory'lar va idempotent ma'lumotnoma seeder'larini yozing.",
      acceptanceCriteria: [
        "State, `has`, `for`, `sequence` ni ishlata oladi",
        "Test va production seeder'larni ajratadi"
      ],
      prerequisites: [
        "13.2"
      ]
    },
    {
      id: "13.19",
      title: "Transactions",
      description: [
        "Eloquent operatsiyalarini atomik qilish: `DB::transaction(fn () => ...)` (exception'da rollback, `attempts` bilan deadlock retry), qo'lda `beginTransaction`/`commit`/`rollBack`. Ichma-ich chaqiruvlar savepoint'lar bilan ishlaydi.",
        "",
        "Eloquent'ga xos nozikliklar: model event'lari va observer'lar tranzaksiya ichida ishlaydi — commit'dan keyin bo'lishi kerak bo'lgan ishlar uchun `afterCommit`, `ShouldDispatchAfterCommit`, `ShouldHandleEventsAfterCommit`; queue konfiguratsiyasida `after_commit => true`. Tranzaksiya ichida tashqi API va uzoq ishlar — yo'q.",
        "",
        "```php",
        "$order = DB::transaction(function () use ($cart) {",
        "    $order = Order::create([...]);",
        "    $order->items()->createMany($cart->lines());",
        "    $cart->delete();",
        "    return $order;",
        "});",
        "OrderPlaced::dispatch($order); // commit'dan keyin",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Buyurtma yaratishni tranzaksiyaga o'rang va email job'i faqat commit'dan keyin ketishini testlang.",
      acceptanceCriteria: [
        "`afterCommit` turlarini biladi",
        "Tranzaksiya chegaralarini to'g'ri belgilaydi"
      ],
      prerequisites: [
        "9.16"
      ]
    },
    {
      id: "13.20",
      title: "Optimistic va Pessimistic Locking",
      description: [
        "**Pessimistic**: `lockForUpdate()` (`SELECT ... FOR UPDATE`) yoki `sharedLock()` — qator tranzaksiya oxirigacha bloklanadi; ziddiyat ko'p bo'lgan joylarda (balans, zaxira). **Optimistic**: `version` ustuni; yangilashda `WHERE version = ?` va o'zgargan qatorlar soni 0 bo'lsa — kimdir oldin o'zgartirgan, foydalanuvchiga xabar yoki qayta urinish. Ziddiyat kam, tahrirlash uzoq bo'lgan joylarda (forma).",
        "",
        "Eloquent'da optimistic lock o'rnatilgan emas — so'rov orqali amalga oshiriladi. Atomik yangilash ham yechim: `decrement('stock')` + `where('stock', '>', 0)`.",
        "",
        "```php",
        "$updated = Product::whereKey($id)",
        "    ->where('version', $version)",
        "    ->update(['price' => $price, 'version' => $version + 1]);",
        "",
        "if ($updated === 0) {",
        "    throw new StaleModelException();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Bir mahsulotni ikki admin bir vaqtda tahrirlaganda ma'lumot yo'qolmasligini optimistic lock bilan ta'minlang.",
      acceptanceCriteria: [
        "Ikki yondashuvni ziddiyat darajasiga qarab tanlaydi",
        "Optimistic lock'ni Eloquent'da amalga oshira oladi"
      ],
      prerequisites: [
        "9.18",
        "13.19"
      ]
    },
    {
      id: "13.21",
      title: "Raw Queries",
      description: [
        "Eloquent yetmaganda: `DB::select('...', $bindings)`, `selectRaw`, `whereRaw`, `orderByRaw`, `havingRaw`, `DB::raw()`, `DB::statement()` (DDL), `DB::unprepared()` (bog'lashsiz — ehtiyot!). Murakkab hisobotlar, window funksiyalar, DB'ga xos imkoniyatlar uchun.",
        "",
        "Qoidalar: qiymatlar faqat bog'langan parametr (`?` yoki `:name`) orqali; ustun nomlari whitelist bilan; raw SQL'ni repository/query class'da izolyatsiya qilish; DB'ga bog'liqlikni hujjatlashtirish. `Model::fromQuery()` raw natijani model sifatida qaytaradi.",
        "",
        "```php",
        "$rows = DB::select(<<<'SQL'",
        "    SELECT customer_id, SUM(total) AS revenue,",
        "           RANK() OVER (ORDER BY SUM(total) DESC) AS place",
        "    FROM orders WHERE created_at >= ? GROUP BY customer_id",
        "SQL, [now()->startOfMonth()]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Window funksiyali hisobotni raw SQL bilan alohida query class'da yozing va parametrlarni bog'lang.",
      acceptanceCriteria: [
        "Raw so'rovlarda injection'dan himoyalanadi",
        "`statement`, `select`, `unprepared` farqini biladi"
      ],
      prerequisites: [
        "9.22"
      ]
    },
    {
      id: "13.22",
      title: "Bulk Insert va Update",
      description: [
        "Ko'p qatorni bittalab `create()` qilish — N ta so'rov va N ta event. Bulk usullar: `Model::insert($rows)` (bitta so'rov, timestamp va event'larsiz), `upsert($rows, uniqueBy, update)`, `Model::where(...)->update([...])`, `increment/decrement` ommaviy, `chunkById()` + `update()`.",
        "",
        "Esda tuting: `insert`/`upsert` cast, mutator, event va timestamp'larni chetlab o'tadi — ularni qo'lda tayyorlang. Katta hajmni 500–1000 lik bo'laklarga bo'ling. Ommaviy yangilashda `chunk()` emas, `chunkById()` (aks holda sahifalash siljiydi).",
        "",
        "```php",
        "$now = now();",
        "$rows = collect($items)->map(fn ($i) => [...$i, 'created_at' => $now, 'updated_at' => $now]);",
        "$rows->chunk(1000)->each(fn ($c) => Price::upsert($c->all(), ['sku'], ['amount', 'updated_at']));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "50 000 ta narxni `create()` sikli va `upsert` bo'laklari bilan yangilab, vaqt va so'rovlar sonini solishtiring.",
      acceptanceCriteria: [
        "Bulk metodlar nimani chetlab o'tishini biladi",
        "`chunk` va `chunkById` farqini tushuntira oladi"
      ],
      prerequisites: [
        "9.24"
      ]
    },
    {
      id: "13.23",
      title: "Eloquent Performance Optimization",
      description: [
        "Asosiy usullar: N+1 ni yo'qotish (eager loading, `withCount`), faqat kerakli ustunlar (`select`), katta hajmda `lazy()`/`cursor()`/`chunkById()`, ommaviy amallar, agregatlarni DB'da (`sum`, `count`), subquery select (`addSelect`) orqali \"oxirgi yozuv\", indekslar, `exists()` o'rniga `count() > 0` emas, keshlash.",
        "",
        "Model hydration qimmat — o'n minglab qatorli hisobotlar uchun query builder (`DB::table`) yoki `toBase()` tezroq. Profiling: Telescope, Debugbar, Clockwork, `DB::listen`, APM.",
        "",
        "```php",
        "// Har mijozning oxirgi buyurtma sanasi — bitta so'rov",
        "Customer::addSelect(['last_order_at' => Order::select('created_at')",
        "    ->whereColumn('customer_id', 'customers.id')",
        "    ->latest()->limit(1)])",
        "    ->get();",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Sekin Eloquent sahifasini profiling qilib, kamida 3 ta usul bilan javob vaqtini 50%+ kamaytiring.",
      acceptanceCriteria: [
        "Hydration narxini va undan qochish yo'llarini biladi",
        "Optimallashtirishni o'lchov bilan tasdiqlaydi"
      ],
      prerequisites: [
        "13.12",
        "9.21"
      ]
    },
    {
      id: "13.24",
      title: "Eloquent va Query Builder farqi",
      description: [
        "**Query Builder** (`DB::table('orders')`) — SQL'ga yaqin, `stdClass` qaytaradi, tez, kam xotira; model event, cast, relation, scope yo'q. **Eloquent** — Query Builder ustiga qurilgan: model obyektlari, relation'lar, cast'lar, event'lar, mass assignment himoyasi; qulay, lekin hydration narxi bor.",
        "",
        "Tanlov: odatiy CRUD va biznes mantiq — Eloquent; katta hisobotlar, ETL, ommaviy import, murakkab agregatlar — Query Builder yoki raw SQL. `Model::query()->toBase()` Eloquent so'rovini builder natijasiga aylantiradi.",
        "",
        "```php",
        "// Eloquent: model + cast + relation",
        "$orders = Order::with('customer')->where('status', OrderStatus::Paid)->get();",
        "// Builder: hisobot uchun tez",
        "$stats = DB::table('orders')->selectRaw('DATE(created_at) d, SUM(total) s')->groupBy('d')->get();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bitta hisobotni Eloquent va Query Builder bilan yozib, xotira va vaqtni solishtiring.",
      acceptanceCriteria: [
        "Ikki yondashuvning imkoniyat va narxini biladi",
        "Vazifaga qarab to'g'ri vositani tanlaydi"
      ],
      prerequisites: [
        "13.2",
        "13.23"
      ]
    }
  ]
});
