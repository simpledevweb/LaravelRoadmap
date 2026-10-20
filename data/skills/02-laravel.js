/* 02 · Laravel
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 2,
  slug: "laravel",
  title: "Laravel",
  group: "php-laravel",
  description: "Laravel — PHP ekotizimidagi eng mashhur full-stack framework. Senior dasturchi undan nafaqat foydalanadi, balki **ichki mexanizmlarini** — so'rov hayotiy sikli, service container, provider'lar, facade'lar va event tizimini — chuqur tushunadi. Navbat va asinxron fon vazifalari (Queues & Background Jobs) esa alohida keng qamrovli mavzu bo'lgani sababli [Queues & Background Jobs](#/s/queues-and-background-jobs) hamda [Laravel Horizon](#/s/laravel-horizon) bo'limlarida maxsus yoritilgan.",
  subskills: [
    {
      id: "2.1",
      title: "Laravel Request Lifecycle",
      description: [
        "So'rov `public/index.php` ga keladi → Composer autoloader yuklanadi → `bootstrap/app.php` da `Application` (service container) yaratiladi → HTTP Kernel bootstrapper'larni ishga tushiradi (env, config, exception handler, facade'lar, provider'larni **register**, keyin **boot**) → global middleware → router route'ni topadi → route middleware → controller → javob middleware orqali qaytadi → `terminate()` (terminable middleware).",
        "",
        "Bu zanjirni bilish \"nega config'im o'qilmayapti\", \"middleware nega ishlamayapti\" kabi savollarga tez javob beradi.",
        "",
        "```php",
        "// bootstrap/app.php (Laravel 11+)",
        "return Application::configure(basePath: dirname(__DIR__))",
        "    ->withRouting(web: __DIR__.'/../routes/web.php', api: __DIR__.'/../routes/api.php')",
        "    ->withMiddleware(fn (Middleware $m) => $m->append(TrustProxies::class))",
        "    ->withExceptions(fn (Exceptions $e) => null)",
        "    ->create();",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "So'rov hayotiy siklining har bosqichiga log qo'shib, tartibni amalda kuzating va diagramma chizing.",
      acceptanceCriteria: [
        "register va boot bosqichlari farqini tushuntira oladi",
        "Terminable middleware qachon ishlashini biladi"
      ],
      prerequisites: [
        "2.6",
        "2.7"
      ]
    },
    {
      id: "2.2",
      title: "Application Structure",
      description: [
        "Standart tuzilma: `app/` (Models, Http, Providers), `bootstrap/`, `config/`, `database/` (migrations, factories, seeders), `public/` (yagona web root), `resources/` (views, lang, assets), `routes/`, `storage/` (logs, cache, uploads), `tests/`, `vendor/`.",
        "",
        "Laravel 11+ da struktura soddalashtirilgan: kernel class'lari yo'q, middleware va exception sozlamalari `bootstrap/app.php` da. Katta loyihalarda `app/` ichini domen bo'yicha (masalan `app/Domain/Billing`) yoki modullarga ajratish odatiy — muhimi, jamoa bitta konvensiyaga amal qilishi.",
        "",
        "```text",
        "app/",
        "  Actions/        Billing/CreateInvoice.php",
        "  Http/Controllers/",
        "  Models/",
        "  Services/",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyiha uchun papka konvensiyasini (Actions, Services, DTO) belgilab, README'da hujjatlashtiring.",
      acceptanceCriteria: [
        "Faqat `public/` web root bo'lishi kerakligini biladi",
        "`storage/` va `bootstrap/cache` yozish ruxsatlarini tushuntira oladi"
      ],
      prerequisites: []
    },
    {
      id: "2.3",
      title: "Routing va Route Model Binding",
      description: [
        "Route'lar `routes/web.php` (session, CSRF) va `routes/api.php` (stateless, `/api` prefiks) da. Imkoniyatlar: nomlangan route'lar, guruhlar (`prefix`, `middleware`, `name`), parametr cheklovlari, `Route::resource()`.",
        "",
        "**Route model binding**: `{post}` parametri `Post` modeliga avtomatik aylanadi; topilmasa 404. Boshqa ustun bo'yicha: `{post:slug}`. Scoped binding (`->scopeBindings()`) bola resursni ota resurs doirasida qidiradi — IDOR xatolarining oldini oladi.",
        "",
        "```php",
        "Route::middleware('auth')->prefix('users/{user}')->scopeBindings()->group(function () {",
        "    Route::get('posts/{post:slug}', [PostController::class, 'show'])->name('users.posts.show');",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ichma-ich resurs uchun scoped binding ishlatib, boshqa foydalanuvchi postiga kirish 404 qaytarishini testda isbotlang.",
      acceptanceCriteria: [
        "Implicit va explicit binding farqini biladi",
        "`php artisan route:cache` cheklovlarini (closure route'lar) biladi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "2.4",
      title: "Middleware",
      description: [
        "Middleware — so'rov controller'ga yetguncha va javob qaytayotganda bajariladigan qatlam (autentifikatsiya, CORS, rate limit, locale). Har biri `handle($request, Closure $next)` metodiga ega; `$next($request)` dan oldingi kod — \"before\", keyingi — \"after\".",
        "",
        "Turlari: global, guruh (`web`, `api`), route middleware, parametrli middleware (`role:admin`) va terminable. Tartib muhim — `priority` ro'yxati bilan boshqariladi.",
        "",
        "```php",
        "final class SetLocale",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        app()->setLocale($request->header('Accept-Language', 'uz'));",
        "        return $next($request);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "So'rov davomiyligini o'lchab `X-Response-Time` header qo'shadigan middleware yozing va testlang.",
      acceptanceCriteria: [
        "Before/after middleware farqini kod bilan ko'rsata oladi",
        "Middleware tartibining ahamiyatini tushuntira oladi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "2.5",
      title: "Controllers va Resource Controllers",
      description: [
        "Controller — HTTP so'rovni qabul qilib, ishni service/action'ga topshiradigan va javob qaytaradigan yupqa qatlam. `php artisan make:controller PostController --resource` 7 ta standart metod (`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`) yaratadi; `--api` create/edit'siz.",
        "",
        "Bitta vazifali controller'lar uchun `__invoke`. Controller'da biznes mantiq, so'rov tuzish va tashqi API chaqiruvlari bo'lmasligi kerak — ular Action/Service class'larga ko'chiriladi.",
        "",
        "```php",
        "public function store(StorePostRequest $request, CreatePost $action): RedirectResponse",
        "{",
        "    $post = $action->handle($request->user(), $request->validated());",
        "    return to_route('posts.show', $post);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "\"Semiz\" controller metodini Form Request + Action class'ga ajrating.",
      acceptanceCriteria: [
        "Resource route'lar va metodlar mosligini biladi",
        "Controller'ni yupqa saqlash tamoyilini amalda qo'llaydi"
      ],
      prerequisites: [
        "2.3",
        "mvc-architecture"
      ]
    },
    {
      id: "2.6",
      title: "Service Container",
      description: [
        "Service container — Laravel'ning yuragi: class'larni yaratadi, dependency'larni inject qiladi va bog'lanishlarni (binding) saqlaydi. `bind` — har safar yangi obyekt, `singleton` — bitta nusxa, `scoped` — so'rov/job doirasida bitta, `instance` — tayyor obyekt.",
        "",
        "Interfeysni implementatsiyaga bog'lash orqali kod abstraksiyaga tayanadi; contextual binding bir interfeysni turli class'larga turlicha berish imkonini beradi. Konkret class'lar uchun binding shart emas — container Reflection bilan autowiring qiladi.",
        "",
        "```php",
        "$this->app->singleton(PaymentGateway::class, fn ($app) =>",
        "    new PaymeGateway(config('services.payme.key')));",
        "",
        "$this->app->when(ReportExporter::class)",
        "    ->needs(Filesystem::class)",
        "    ->give(fn () => Storage::disk('s3'));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Interfeys + ikki implementatsiya yozing va config orqali qaysi biri ishlatilishini container'da tanlang.",
      acceptanceCriteria: [
        "`bind`, `singleton` va `scoped` farqini (Octane kontekstida ham) biladi",
        "Contextual binding'ni ishlata oladi"
      ],
      prerequisites: [
        "1.18",
        "2.8"
      ]
    },
    {
      id: "2.7",
      title: "Service Providers",
      description: [
        "Service provider — ilovani \"yig'ish\" markazi. `register()` da faqat container binding'lari (boshqa servislarga murojaat qilmaslik kerak), `boot()` da esa barcha provider'lar ro'yxatdan o'tgandan keyingi ishlar: event listener'lar, route'lar, view composer'lar, macro'lar, `Gate` qoidalari.",
        "",
        "**Deferred provider** (`DeferrableProvider`) faqat uning servisi so'ralganda yuklanadi — bootstrapping vaqtini kamaytiradi. Laravel 11+ da provider'lar `bootstrap/providers.php` da ro'yxatga olinadi.",
        "",
        "```php",
        "final class BillingServiceProvider extends ServiceProvider implements DeferrableProvider",
        "{",
        "    public function register(): void",
        "    {",
        "        $this->app->singleton(InvoiceNumberGenerator::class);",
        "    }",
        "    public function provides(): array { return [InvoiceNumberGenerator::class]; }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Modul uchun alohida service provider yarating: binding, config merge va route yuklash bilan.",
      acceptanceCriteria: [
        "`register()` da boshqa servisni resolve qilish nega xavfli ekanini tushuntira oladi",
        "Deferred provider qachon foydali ekanini biladi"
      ],
      prerequisites: [
        "2.6"
      ]
    },
    {
      id: "2.8",
      title: "Dependency Injection",
      description: [
        "DI — obyekt o'z dependency'larini o'zi yaratmaydi, ular tashqaridan (odatda constructor orqali) beriladi. Laravel'da controller, job, listener, command `handle()` va middleware'lar container orqali avtomatik inject qilinadi.",
        "",
        "Foyda: testda dependency'ni fake bilan almashtirish oson, bog'liqliklar aniq ko'rinadi, class'lar qayta ishlatiladi. Constructor'da 5–6 dan ortiq dependency — class juda ko'p ish qilayotgani belgisi. `app()`/`resolve()` ni biznes kod ichida chaqirish (service locator) bog'liqlikni yashiradi.",
        "",
        "```php",
        "final class SendInvoice",
        "{",
        "    public function __construct(",
        "        private readonly InvoiceRepository $invoices,",
        "        private readonly Mailer $mailer,",
        "    ) {}",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ichida `new` va `app()` ishlatilgan class'ni constructor injection'ga o'tkazib, unit test yozing.",
      acceptanceCriteria: [
        "Constructor va method injection farqini biladi",
        "Service locator anti-pattern'ini tushuntira oladi"
      ],
      prerequisites: [
        "2.6",
        "4.5"
      ]
    },
    {
      id: "2.9",
      title: "Facades",
      description: [
        "Facade — container'dagi servisga statik ko'rinishdagi proxy: `Cache::get()` aslida `app('cache')->get()`. Ichkarida `getFacadeAccessor()` va `__callStatic` ishlaydi. Real-time facade (`Facades\\App\\Services\\X`) istalgan class'ni facade qiladi.",
        "",
        "Facade'lar testlanadi: `Cache::shouldReceive()`, `Mail::fake()`, `Queue::fake()`. Lekin ular dependency'ni yashiradi — domen va servis qatlamida constructor injection, controller/route kabi \"chegaraviy\" kodda facade ishlatish keng tarqalgan muvozanat.",
        "",
        "```php",
        "Mail::fake();",
        "// ... action",
        "Mail::assertSent(InvoiceMail::class, fn ($m) => $m->hasTo('a@b.uz'));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "O'zingizning servisingiz uchun facade yarating va testda `shouldReceive` bilan mock qiling.",
      acceptanceCriteria: [
        "Facade qanday qilib container'dan obyekt olishini tushuntira oladi",
        "Facade va DI o'rtasida asosli tanlov qiladi"
      ],
      prerequisites: [
        "1.20",
        "2.6"
      ]
    },
    {
      id: "2.10",
      title: "Configuration va Environment Variables",
      description: [
        "`.env` — muhitga xos qiymatlar (DB parol, API kalitlari); `config/*.php` — ilova sozlamalari, `.env` ni `env()` orqali o'qiydi. **Qoida:** `env()` ni faqat config fayllarida chaqiring — `php artisan config:cache` dan keyin `.env` umuman o'qilmaydi va kod ichidagi `env()` `null` qaytaradi.",
        "",
        "`.env` git'ga qo'shilmaydi, `.env.example` esa qo'shiladi. Production'da secret'larni secret manager'dan olish va `php artisan env:encrypt` imkoniyatlari bor.",
        "",
        "```php",
        "// config/services.php",
        "'payme' => ['key' => env('PAYME_KEY'), 'timeout' => (int) env('PAYME_TIMEOUT', 10)],",
        "",
        "// kodda",
        "$key = config('services.payme.key');",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Kod ichidagi barcha `env()` chaqiruvlarini config'ga ko'chiring va `config:cache` bilan tekshiring.",
      acceptanceCriteria: [
        "`config:cache` dan keyin `env()` nega `null` qaytarishini tushuntira oladi",
        "Secret'larni repozitoriyga tushirmaslik amaliyotini biladi"
      ],
      prerequisites: [
        "2.2"
      ]
    },
    {
      id: "2.11",
      title: "Request va Response Lifecycle",
      description: [
        "`Illuminate\\Http\\Request` (Symfony Request ustiga qurilgan) kiruvchi ma'lumotlarga yagona interfeys: `input()`, `query()`, `file()`, `header()`, `user()`, `ip()`, `validated()`. Javob turlari: `response()`, `json()`, `redirect()`, `download()`, `streamDownload()`, view, `Responsable` obyektlar.",
        "",
        "Javob middleware zanjiri orqali qaytadi (header qo'shish, cookie shifrlash, session saqlash), so'ng yuboriladi va `terminate` bosqichi ishlaydi. `TrustProxies` noto'g'ri sozlansa `ip()` va `isSecure()` yolg'on qiymat beradi.",
        "",
        "```php",
        "return response()->json(['data' => $order], 201)",
        "    ->header('Location', route('orders.show', $order));",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Katta CSV hisobotni `streamDownload` bilan xotiraga yuklamasdan qaytaring.",
      acceptanceCriteria: [
        "`input()`, `query()` va `validated()` farqini biladi",
        "Load balancer ortida `TrustProxies` ni to'g'ri sozlaydi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "2.12",
      title: "Validation",
      description: [
        "Validatsiya kiruvchi ma'lumotni biznes mantiqqa yetishidan oldin tekshiradi. `$request->validate([...])`, `Validator::make()`, `Rule::unique()->ignore()`, `Rule::enum()`, `Rule::exists()`, shartli qoidalar (`sometimes`, `required_if`, `exclude_if`), massiv qoidalari (`items.*.qty`) va custom rule class'lar.",
        "",
        "Muhim: faqat `validated()` dagi ma'lumotni ishlating; `bail` birinchi xatoda to'xtatadi; DB'ga murojaat qiluvchi qoidalar (`unique`, `exists`) so'rov soniga ta'sir qiladi.",
        "",
        "```php",
        "$data = $request->validate([",
        "    'email' => ['required', 'email:rfc', Rule::unique('users')->ignore($user)],",
        "    'items' => ['required', 'array', 'min:1'],",
        "    'items.*.qty' => ['required', 'integer', 'between:1,100'],",
        "    'status' => [Rule::enum(OrderStatus::class)],",
        "]);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Murakkab buyurtma formasi uchun validatsiya yozing va har bir qoida uchun feature test qo'shing.",
      acceptanceCriteria: [
        "`validated()` va `all()` farqi (mass assignment xavfi)ni tushuntira oladi",
        "Custom rule class yoza oladi"
      ],
      prerequisites: [
        "2.11"
      ]
    },
    {
      id: "2.13",
      title: "Form Requests",
      description: [
        "Form Request — validatsiya va avtorizatsiyani controller'dan alohida class'ga chiqaradi: `rules()`, `authorize()`, `messages()`, `attributes()`, `prepareForValidation()` (normallashtirish), `after()` (qo'shimcha tekshiruvlar).",
        "",
        "Controller metodiga type-hint qilinganda avtomatik ishlaydi; xato bo'lsa web'da redirect, API'da 422 JSON qaytadi. `authorize()` da policy chaqirish — avtorizatsiyani ham markazlashtiradi.",
        "",
        "```php",
        "final class StoreOrderRequest extends FormRequest",
        "{",
        "    public function authorize(): bool { return $this->user()->can('create', Order::class); }",
        "    protected function prepareForValidation(): void { $this->merge(['phone' => preg_replace('/\\D/', '', $this->phone)]); }",
        "    public function rules(): array { return ['phone' => ['required', 'digits:12']]; }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Controller ichidagi `validate()` chaqiruvlarini Form Request'larga ko'chiring.",
      acceptanceCriteria: [
        "`prepareForValidation` va `passedValidation` dan to'g'ri foydalanadi",
        "API so'rovlarida 422 javob formatini biladi"
      ],
      prerequisites: [
        "2.12"
      ]
    },
    {
      id: "2.14",
      title: "Authorization",
      description: [
        "Autentifikatsiya \"kimsiz?\", avtorizatsiya \"bunga ruxsatingiz bormi?\" savoliga javob beradi. Laravel'da avtorizatsiya Gate va Policy orqali: `$user->can()`, `$this->authorize()`, `Gate::authorize()`, `can` middleware, Blade'da `@can`.",
        "",
        "Asosiy tamoyil: **har bir** resursga kirish server tomonida tekshiriladi (faqat UI'da tugmani yashirish yetarli emas), standart holat — rad etish (deny by default). Ro'yxatlarda ham query darajasida filtrlash kerak, aks holda ma'lumot sizib chiqadi.",
        "",
        "```php",
        "Route::put('/posts/{post}', [PostController::class, 'update'])->can('update', 'post');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Barcha yozish endpoint'larida avtorizatsiya borligini tekshiradigan feature test to'plamini yozing.",
      acceptanceCriteria: [
        "401 va 403 farqini biladi",
        "Ro'yxat endpoint'larida ham ma'lumot filtrlashni unutmaydi"
      ],
      prerequisites: [
        "2.15",
        "20.1"
      ]
    },
    {
      id: "2.15",
      title: "Policies va Gates",
      description: [
        "**Gate** — closure asosidagi umumiy qoidalar (`Gate::define('view-admin', ...)`). **Policy** — bitta model uchun qoidalar class'i (`viewAny`, `view`, `create`, `update`, `delete`), avtomatik topiladi (`App\\Policies\\PostPolicy`).",
        "",
        "`before()` metodi superadmin uchun hammasiga ruxsat beradi; `Response::deny('sabab')` va `denyAsNotFound()` (resurs mavjudligini yashirish) mavjud. Policy'lar sof va tez bo'lishi kerak — ularda og'ir so'rovlar N+1 ga olib keladi.",
        "",
        "```php",
        "final class PostPolicy",
        "{",
        "    public function update(User $user, Post $post): Response",
        "    {",
        "        return $user->id === $post->user_id",
        "            ? Response::allow()",
        "            : Response::denyAsNotFound();",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ko'p rolli (owner, editor, admin) model uchun policy yozing va har bir holat uchun unit test qo'shing.",
      acceptanceCriteria: [
        "Gate va Policy'ni qachon tanlashni biladi",
        "`denyAsNotFound` ning xavfsizlik ma'nosini tushuntira oladi"
      ],
      prerequisites: [
        "2.14"
      ]
    },
    {
      id: "2.16",
      title: "Error Handling va Exception Reporting",
      description: [
        "Laravel'da exception'lar markaziy handler'da qayta ishlanadi (11+ da `bootstrap/app.php` → `withExceptions`). Ikki vazifa: **report** (log, Sentry'ga yuborish) va **render** (foydalanuvchiga javob). `dontReport`, `throttle`, `context()` va exception ichidagi `report()`/`render()` metodlari mavjud.",
        "",
        "Production'da `APP_DEBUG=false` — stack trace foydalanuvchiga ko'rinmasligi shart. API uchun barcha xatolar yagona JSON formatida qaytishi kerak.",
        "",
        "```php",
        "->withExceptions(function (Exceptions $e) {",
        "    $e->dontReport(InsufficientBalance::class);",
        "    $e->render(fn (InsufficientBalance $ex, Request $r) =>",
        "        response()->json(['message' => $ex->getMessage()], 422));",
        "})",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API uchun yagona xato formatini (message, code, errors) handler orqali joriy qiling.",
      acceptanceCriteria: [
        "report va render bosqichlarini ajrata oladi",
        "`APP_DEBUG` ning production'dagi xavfini biladi"
      ],
      prerequisites: [
        "1.15"
      ]
    },
    {
      id: "2.17",
      title: "Laravel Logging",
      description: [
        "Logging Monolog asosida, `config/logging.php` da kanallar: `single`, `daily`, `stack`, `slack`, `stderr`, `syslog`. Darajalar PSR-3: `debug` → `emergency`.",
        "",
        "Yaxshi amaliyot: kontekst bilan strukturali log (`Log::info('Order paid', ['order_id' => $id])`), `Log::withContext()` bilan request ID qo'shish, maxfiy ma'lumotlarni log'ga yozmaslik, konteynerlarda `stderr` + JSON formatter va markaziy yig'ish (ELK, Loki).",
        "",
        "```php",
        "Log::withContext(['request_id' => $request->header('X-Request-Id')]);",
        "Log::channel('payments')->warning('Gateway timeout', ['order_id' => $order->id, 'ms' => $elapsed]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Har bir log yozuviga request ID qo'shadigan middleware va JSON formatlangan kanal sozlang.",
      acceptanceCriteria: [
        "Log darajalarini to'g'ri tanlaydi",
        "Parol, token kabi ma'lumotlar log'ga tushmasligini ta'minlaydi"
      ],
      prerequisites: [
        "8.2",
        "logging-and-monitoring"
      ]
    },
    {
      id: "2.18",
      title: "Artisan Commands",
      description: [
        "Artisan — Laravel CLI. Custom buyruq: `make:command`, `$signature` (argument, option), `handle()` (DI qo'llab-quvvatlanadi), chiqish yordamchilari (`info`, `table`, `withProgressBar`), interaktiv so'rovlar (Laravel Prompts).",
        "",
        "Buyruqlar idempotent, qayta ishga tushirilsa xavfsiz bo'lishi va to'g'ri exit kod (`Command::SUCCESS`/`FAILURE`) qaytarishi kerak. Katta ma'lumot uchun `chunkById`/`lazy` va `--dry-run` opsiyasi foydali.",
        "",
        "```php",
        "protected $signature = 'orders:expire {--days=3} {--dry-run}';",
        "",
        "public function handle(OrderRepository $orders): int",
        "{",
        "    $count = $orders->expireOlderThan((int) $this->option('days'), $this->option('dry-run'));",
        "    $this->info(\"{$count} ta buyurtma bekor qilindi\");",
        "    return self::SUCCESS;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "`--dry-run` opsiyali, progress bar'li ma'lumot tozalash buyrug'i yozing va testlang.",
      acceptanceCriteria: [
        "Exit kodlarning CI/cron uchun ahamiyatini biladi",
        "Buyruqni `Artisan::call` / `$this->artisan()` bilan testlay oladi"
      ],
      prerequisites: [
        "2.8"
      ]
    },
    {
      id: "2.19",
      title: "Task Scheduling",
      description: [
        "Laravel scheduler bitta cron yozuvi (`* * * * * php artisan schedule:run`) orqali barcha rejali vazifalarni boshqaradi. 11+ da `routes/console.php` da yoziladi: `Schedule::command(...)->dailyAt('02:00')`.",
        "",
        "Muhim opsiyalar: `withoutOverlapping()` (oldingi ishga tushish tugamaguncha yangisini boshlamaslik), `onOneServer()` (bir nechta serverda faqat bittasida — cache lock kerak), `runInBackground()`, `timezone()`, `onFailure()`, `pingOnSuccess()` (monitoring).",
        "",
        "```php",
        "Schedule::command('reports:daily')",
        "    ->dailyAt('02:00')",
        "    ->timezone('Asia/Tashkent')",
        "    ->withoutOverlapping()",
        "    ->onOneServer()",
        "    ->pingOnSuccess(config('services.healthchecks.daily'));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ko'p serverli muhitda faqat bir marta ishlaydigan va monitoring ping yuboradigan kunlik vazifa sozlang.",
      acceptanceCriteria: [
        "`withoutOverlapping` va `onOneServer` farqini biladi",
        "Scheduler ishlamay qolganini aniqlash usulini (heartbeat) biladi"
      ],
      prerequisites: [
        "2.18"
      ]
    },
    {
      id: "2.20",
      title: "Events va Listeners",
      description: [
        "Event — tizimda biror narsa sodir bo'lganini bildiradi (`OrderPaid`), listener esa unga reaksiya qiladi. Bu komponentlarni bir-biridan ajratadi. Listener `ShouldQueue` ni amalga oshirsa, navbatda asinxron bajariladi. Laravel 11+ da event discovery avtomatik.",
        "",
        "Muhim nozikliklar: tranzaksiya ichida dispatch qilingan event commit'dan oldin ishlashi mumkin — `ShouldDispatchAfterCommit` yoki `afterCommit` ishlating. Event'lar zanjiri haddan oshsa, oqimni kuzatish qiyinlashadi.",
        "",
        "```php",
        "final class OrderPaid implements ShouldDispatchAfterCommit",
        "{",
        "    use Dispatchable, SerializesModels;",
        "    public function __construct(public readonly Order $order) {}",
        "}",
        "",
        "final class SendReceipt implements ShouldQueue",
        "{",
        "    public function handle(OrderPaid $event): void { /* ... */ }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Buyurtma to'langanda chek yuborish va statistika yangilashni event + queued listener'lar bilan ajrating.",
      acceptanceCriteria: [
        "`afterCommit` muammosini real misol bilan tushuntira oladi",
        "`Event::fake()` bilan testlay oladi"
      ],
      prerequisites: [
        "2.6",
        "46.3"
      ]
    },
    {
      id: "2.21",
      title: "Notifications va Mail",
      description: [
        "**Mailable** — bitta email (envelope, content, attachments). **Notification** — bitta xabarni bir nechta kanal orqali yuborish: `mail`, `database`, `broadcast`, `vonage`, Slack yoki custom (Telegram, SMS). `via()` foydalanuvchi sozlamalariga qarab kanal tanlaydi.",
        "",
        "Tashqi yuborish sekin va beqaror — `ShouldQueue` va retry ishlating. Testlarda `Mail::fake()` / `Notification::fake()`; dev'da Mailpit. Marketing va tranzaksion email'larni alohida yuboruvchilar orqali yuborish deliverability'ni yaxshilaydi.",
        "",
        "```php",
        "final class InvoicePaid extends Notification implements ShouldQueue",
        "{",
        "    use Queueable;",
        "    public function via(User $user): array { return $user->prefers_sms ? ['sms'] : ['mail', 'database']; }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Telegram uchun custom notification kanali yozing va uni navbat orqali yuboring.",
      acceptanceCriteria: [
        "Mailable va Notification'ni qachon tanlashni biladi",
        "Custom kanal yozish mexanizmini tushuntira oladi"
      ],
      prerequisites: [
        "2.20"
      ]
    },
    {
      id: "2.22",
      title: "Filesystem va Storage",
      description: [
        "Laravel Filesystem (Flysystem) lokal disk, S3, SFTP va boshqalar uchun yagona API beradi: `Storage::disk('s3')->put()`, `get()`, `url()`, `temporaryUrl()`, `readStream()`. `public` disk `php artisan storage:link` orqali web'ga ochiladi.",
        "",
        "Xavfsizlik: foydalanuvchi faylini doim server tomonida generatsiya qilingan nom bilan saqlang, MIME va hajmni validatsiya qiling, maxfiy fayllarni public diskka qo'ymang (temporary URL bering). Katta fayllar uchun stream va to'g'ridan-to'g'ri S3'ga yuklash (presigned URL).",
        "",
        "```php",
        "$path = $request->file('avatar')->store(\"avatars/{$user->id}\", 's3');",
        "$url  = Storage::disk('s3')->temporaryUrl($path, now()->addMinutes(10));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Maxfiy hujjatlarni S3'da saqlab, faqat egasiga 5 daqiqalik temporary URL beradigan endpoint yozing.",
      acceptanceCriteria: [
        "Public va private disk farqini biladi",
        "`Storage::fake()` bilan fayl yuklashni testlay oladi"
      ],
      prerequisites: [
        "51.12"
      ]
    },
    {
      id: "2.23",
      title: "Localization",
      description: [
        "Tarjimalar `lang/{locale}/*.php` (kalit asosida) yoki `lang/{locale}.json` (matn asosida) fayllarida. `__('messages.welcome', ['name' => $n])`, `trans_choice()` (ko'plik), `App::setLocale()`, validatsiya xabarlari tarjimasi.",
        "",
        "Locale'ni URL prefiks, foydalanuvchi sozlamasi yoki `Accept-Language` dan aniqlash odatda middleware'da bajariladi. Sana/raqam formatlash uchun Carbon locale va PHP `intl` (`NumberFormatter`). Model ma'lumotlarini tarjima qilish uchun `spatie/laravel-translatable`.",
        "",
        "```php",
        "// lang/uz/orders.php",
        "return ['created' => ':count ta buyurtma yaratildi'];",
        "__('orders.created', ['count' => 3]);",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Ilovaga uz/ru/en tillarini qo'shing: middleware, tarjima fayllari va til almashtirgich.",
      acceptanceCriteria: [
        "Kalit va JSON tarjima farqini biladi",
        "Queue job'larda locale saqlanishini (`HasLocalePreference`) tushunadi"
      ],
      prerequisites: [
        "2.4"
      ]
    },
    {
      id: "2.24",
      title: "Pagination",
      description: [
        "Uch xil paginator: `paginate()` (umumiy son bilan, `COUNT(*)` so'rovi), `simplePaginate()` (faqat oldingi/keyingi) va `cursorPaginate()` (cursor asosida, `OFFSET` siz — katta jadvallarda barqaror tez).",
        "",
        "Katta jadvallarda `OFFSET 100000` sekin, chunki DB shuncha qatorni o'qib tashlaydi. API'da cursor pagination, admin panellarda `paginate()` odatiy tanlov. `withQueryString()` filtr parametrlarini saqlaydi.",
        "",
        "```php",
        "$orders = Order::query()",
        "    ->where('status', 'paid')",
        "    ->orderByDesc('id')",
        "    ->cursorPaginate(50);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "1 mln qatorli jadvalda `paginate` va `cursorPaginate` ni EXPLAIN va vaqt bo'yicha solishtiring.",
      acceptanceCriteria: [
        "Offset pagination'ning katta sahifalardagi muammosini tushuntira oladi",
        "Cursor pagination uchun unikal tartiblash ustuni kerakligini biladi"
      ],
      prerequisites: [
        "16.11"
      ]
    },
    {
      id: "2.25",
      title: "API Resources",
      description: [
        "API Resource — model va JSON javob o'rtasidagi transformatsiya qatlami. U ichki DB strukturasini tashqi shartnomadan ajratadi: ustun nomi o'zgarsa ham API o'zgarmaydi. `whenLoaded()` (N+1 siz relation), `when()` (shartli maydon), `mergeWhen()`, `additional()` va `ResourceCollection`.",
        "",
        "Resource ichida so'rov yubormang — relation'larni controller'da eager load qiling. Maxfiy maydonlar (parol hash, ichki flag'lar) hech qachon `toArray()` ga tushmasligi kerak.",
        "",
        "```php",
        "final class OrderResource extends JsonResource",
        "{",
        "    public function toArray(Request $request): array",
        "    {",
        "        return [",
        "            'id'     => $this->id,",
        "            'total'  => $this->total_in_tiyin / 100,",
        "            'status' => $this->status->value,",
        "            'items'  => OrderItemResource::collection($this->whenLoaded('items')),",
        "        ];",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mavjud endpoint'ni `$model->toArray()` dan API Resource'ga o'tkazing va javob shartnomasini test bilan qotiring.",
      acceptanceCriteria: [
        "`whenLoaded` N+1 ni qanday oldini olishini biladi",
        "Resource'ni API versiyalash bilan bog'lay oladi"
      ],
      prerequisites: [
        "13.11",
        "18.17"
      ]
    },
    {
      id: "2.26",
      title: "Laravel Package Development",
      description: [
        "Paket — qayta ishlatiladigan funksionallik: o'z `composer.json`, PSR-4 autoload, service provider (`extra.laravel.providers` orqali auto-discovery), config (`mergeConfigFrom`, `publishes`), migratsiya, route, view va command'lar.",
        "",
        "Sifatli paket: semver, aniq Laravel/PHP versiya cheklovlari, Orchestra Testbench bilan testlar, CI matrix, CHANGELOG. `spatie/laravel-package-tools` boilerplate'ni qisqartiradi. Ichki (private) paketlar uchun Satis/Private Packagist yoki VCS repository.",
        "",
        "```json",
        "\"extra\": {",
        "    \"laravel\": { \"providers\": [\"Acme\\\\Payme\\\\PaymeServiceProvider\"] }",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Kichik to'lov integratsiyasini alohida paketga ajrating, Testbench testlari va publish qilinadigan config bilan.",
      acceptanceCriteria: [
        "Auto-discovery va publishable resurslar mexanizmini biladi",
        "Paketni Testbench bilan izolyatsiyada testlay oladi"
      ],
      prerequisites: [
        "2.7",
        "composer"
      ]
    },
    {
      id: "2.27",
      title: "Framework Internals va Service Resolution",
      description: [
        "`make()` chaqirilganda container: alias'larni hal qiladi → kontekstual binding'ni tekshiradi → binding bo'lsa closure'ni chaqiradi, bo'lmasa Reflection bilan constructor parametrlarini rekursiv resolve qiladi → `resolving`/`afterResolving` callback'larini ishga tushiradi → singleton bo'lsa `instances` ga saqlaydi.",
        "",
        "Bu bilim aylanma bog'liqliklarni (circular dependency), \"Target is not instantiable\" xatolarini va Octane'dagi holat oqishini tushunish uchun kerak. Laravel manba kodini o'qish (`Illuminate\\Container\\Container`) — eng yaxshi o'qituvchi.",
        "",
        "```php",
        "$this->app->afterResolving(Mailer::class, function (Mailer $m) {",
        "    $m->alwaysReplyTo('support@example.uz');",
        "});",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "`Container::make()` ning soddalashtirilgan nusxasini yozing: binding, singleton va autowiring bilan.",
      acceptanceCriteria: [
        "\"Target [X] is not instantiable\" xatosining sababini aniqlay oladi",
        "Resolving callback'lar qachon chaqirilishini biladi"
      ],
      prerequisites: [
        "2.6",
        "1.18"
      ]
    },
    {
      id: "2.28",
      title: "Laravel Version Upgrades",
      description: [
        "Laravel har yili major versiya chiqaradi; har birining bug-fix va security support muddati bor. Upgrade jarayoni: rasmiy upgrade guide → `composer.json` cheklovlarini yangilash → paketlar mosligini tekshirish (`composer why-not laravel/framework 12.0`) → Laravel Shift yoki Rector → test to'plami → staging.",
        "",
        "Yaxshi amaliyot: bir versiyadan sakramaslik, deprecation'larni oldindan tuzatish, upgrade'ni alohida PR'da funksional o'zgarishlarsiz qilish, kuchli test qamrovi. Eskirgan versiyada qolish — xavfsizlik va texnik qarz xavfi.",
        "",
        "```bash",
        "composer why-not laravel/framework \"^12.0\"",
        "composer require laravel/framework:^12.0 -W",
        "php artisan test",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihani keyingi Laravel versiyasiga upgrade qilish rejasini (risklar, paketlar, testlar) tuzing.",
      acceptanceCriteria: [
        "Laravel support siyosatini biladi",
        "Upgrade'ni funksional o'zgarishlardan ajratish zarurligini tushunadi"
      ],
      prerequisites: [
        "7.16",
        "1.26"
      ]
    },
    {
      id: "2.29",
      title: "Broadcasting, WebSockets va Laravel Reverb",
      description: [
        "WebSockets an'anaviy HTTP polling o'rniga ikki tomonlama doimiy aloqa (full-duplex) yaratadi. Laravel'da hodisalarni real-time tarqatish uchun event'ga `ShouldBroadcast` yoki `ShouldBroadcastNow` interfeysi qo'shiladi.",
        "",
        "**Kanallar turlari**:",
        "- `Channel`: hamma uchun ochiq ommaviy kanal (masalan, yangiliklar tasmasi).",
        "- `PrivateChannel`: faqat avtorizatsiyadan o'tgan foydalanuvchilar (`routes/channels.php` da huquq tekshiriladi).",
        "- `PresenceChannel`: xonada hozir kimlar borligini ko'rsatish va \"foydalanuvchi yozmoqda...\" kabi holatlarni uzatish.",
        "",
        "**Laravel Reverb**: Laravel 11 da chiqarilgan, PHP asosidagi juda tez, birinchi partiyaviy WebSocket server. Pusher yoki Soketi kabi tashqi xizmatlarsiz, millionlab ulanishlarni o'z serveringizda bepul boshqarish imkonini beradi. Frontendda esa `laravel-echo` va `pusher-js` orqali tinglanadi.",
        "",
        "```php",
        "// Event e'loni",
        "final class OrderStatusUpdated implements ShouldBroadcast",
        "{",
        "    use Dispatchable, InteractsWithSockets, SerializesModels;",
        "    public function __construct(public Order $order) {}",
        "    public function broadcastOn(): array",
        "    {",
        "        return [new PrivateChannel(\"orders.{$this->order->user_id}\")];",
        "    }",
        "}",
        "",
        "// routes/channels.php da avtorizatsiya",
        "Broadcast::channel('orders.{userId}', function (User $user, int $userId): bool {",
        "    return (int) $user->id === $userId;",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel Reverb orqali buyurtma holati o'zgarganda faqat buyurtma egasining brauzeriga real-time xabar yuboruvchi Private Channel yozing va testlang.",
      acceptanceCriteria: [
        "Public, Private va Presence channel farqlarini hamda `routes/channels.php` dagi avtorizatsiyani tushuntira oladi",
        "`ShouldBroadcast` (queue orqali) va `ShouldBroadcastNow` ning navbatga bog'liqligini biladi",
        "Laravel Reverb serverini ishga tushirish va Echo bilan ulash amaliyotiga ega"
      ],
      prerequisites: [
        "2.20",
        "46.3"
      ]
    },
    {
      id: "2.30",
      title: "Laravel HTTP Client (Http Facade)",
      description: [
        "Laravel HTTP Client (`Illuminate\\Support\\Facades\\Http`) — Guzzle ustiga qurilgan, o'ta ifodali va testlash oson bo'lgan HTTP mijozi. Tashqi to'lov tizimlari (Payme, Click, Stripe) va uchinchi tomon API'lari bilan ishlashning asosiy vositasi.",
        "",
        "**Asosiy imkoniyatlar**:",
        "- **Timeout va Retry**: `Http::timeout(5)->retry(3, 100, throw: false)` — tarmoqdagi qisqa uzilishlarda avtomatik qayta urinish.",
        "- **Xatolarni tutish**: `Http::throw()` (4xx/5xx javobda avtomatik `RequestException` otadi).",
        "- **Parallel so'rovlar (`Http::pool`)**: bir vaqtning o'zida bir nechta mustaqil tashqi API'ga asinxron so'rov yuborib, kutish vaqtini 2-3 barobarga qisqartiradi.",
        "- **Testlash**: `Http::fake([...])` orqali tashqi tarmoqqa chiqmasdan aniq mock javoblarni qaytarish va so'rov yuborilganini `Http::assertSent()` bilan tasdiqlash.",
        "",
        "```php",
        "// Parallel so'rovlar (Pool)",
        "$responses = Http::pool(fn (Pool $pool) => [",
        "    $pool->as('currency')->timeout(3)->get('https://cbu.uz/oz/arkhiv-kursov-valyut/json/'),",
        "    $pool->as('weather')->timeout(3)->get('https://api.weather.com/v1/tashkent'),",
        "]);",
        "$rate = $responses['currency']->json()[0]['Rate'];",
        "",
        "// Testda mock qilish",
        "Http::fake(['cbu.uz/*' => Http::response([['Rate' => '12800']], 200)]);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Tashqi to'lov API client'ini yozing: retry, timeout, custom header'lar bilan boyiting va uni `Http::fake()` yordamida to'liq Feature test bilan qoplang.",
      acceptanceCriteria: [
        "Nima uchun tashqi so'rovlarda `timeout()` va `retry()` shart ekanini biladi",
        "`Http::pool()` orqali parallel asinxron so'rovlar yuborishni biladi",
        "Feature testlarda `Http::fake()` bilan tashqi API'larni mock qila oladi"
      ],
      prerequisites: [
        "2.9",
        "18.1"
      ]
    },
    {
      id: "2.31",
      title: "Concurrency va Application Context (Laravel 11+)",
      description: [
        "Zamonaviy yuqori yuklamali ilovalarda bitta so'rov ichida parallel hisoblash va taqsimlangan log yuritish zarurati paydo bo'ladi.",
        "",
        "**Concurrency (`Illuminate\\Support\\Facades\\Concurrency`)**:",
        "Laravel 11 da kiritilgan imkoniyat bo'lib, bitta HTTP so'rov yoki artisan buyruq ichida bir nechta vazifani parallel fonda bajaradi (`Concurrency::run([fn() => ..., fn() => ...])`). Fork (CLI) yoki Process drayverlari orqali bir necha mustaqil hisob-kitobni bir vaqtda bajarib, umumiy javob vaqtini minimallashtiradi.",
        "",
        "**Application Context (`Illuminate\\Support\\Facades\\Context`)**:",
        "So'rov boshlanganda yozilgan metadata ma'lumotlarini (masalan, `trace_id`, `user_id`, `tenant_id`) butun so'rov hayotiy siklida saqlaydi va eng muhimi — ularni **navbatdagi Job'larga avtomatik o'tkazadi** hamda barcha loglarga biriktiradi. Bu tarqoq xatolarni (distributed tracing) qidirishda bebahodir.",
        "",
        "```php",
        "// Context o'rnatish (masalan, middleware'da)",
        "Context::add('trace_id', (string) Str::uuid());",
        "Log::info('Buyurtma yaratilmoqda'); // log faylda trace_id avtomatik chiqadi",
        "",
        "// Concurrency — parallel hisoblash",
        "[$ordersCount, $totalRevenue] = Concurrency::run([",
        "    fn () => Order::where('status', 'paid')->count(),",
        "    fn () => Order::where('status', 'paid')->sum('total'),",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Dashboard sahifasidagi 2 ta og'ir mustaqil statistikani `Concurrency::run()` bilan parallel hisoblang va kiruvchi `X-Trace-Id` ni `Context` orqali barcha loglarga ulab chiqing.",
      acceptanceCriteria: [
        "Concurrency qachon Queue o'rnini bosa olmasligini (faqat bitta request doirasida ishlashini) tushuntira oladi",
        "`Context` ma'lumotlari qanday qilib Queue joblariga avtomatik o'tishini biladi",
        "Loglarda `trace_id` orqali tarqoq nosozliklarni tezkor qidirish mexanizmini tushunadi"
      ],
      prerequisites: [
        "2.1",
        "2.17",
        "46.1"
      ]
    },
    {
      id: "2.32",
      title: "Laravel Session Management va Web Authentication",
      description: [
        "Laravel'da an'anaviy web-ilovalar holati (state) **Session** va **Web Guard** orqali boshqariladi.",
        "",
        "**Session Drayverlari va Konfiguratsiya (`config/session.php`)**:",
        "- `file`: standart lokal drayver (ko'p serverli yuklamada mos emas).",
        "- `database`: sessiyalarni jadvalda saqlash (foydalanuvchi faolligini kuzatish uchun qulay).",
        "- `redis`: yuqori yuklamali production ilovalar uchun eng tez va tavsiya etiladigan drayver.",
        "- `cookie`: sessiyani shifrlangan cookie ichida saqlash (hajm 4KB bilan cheklangan).",
        "",
        "**Session amallari va Flash Data**:",
        "- `session()->put('key', $value)`, `session()->get('key', $default)`.",
        "- **Flash ma'lumotlar**: faqat bitta keyingi HTTP so'rov uchun yashaydigan ma'lumotlar (`session()->flash('status', 'Saqlandi!')`, `reflash()`, `keep()`) — redirect'lardan keyin xabarlar ko'rsatish asosi.",
        "",
        "**Web Authentication va Guards (`config/auth.php`)**:",
        "- `Auth::attempt($credentials, $remember)`: parolni bcrypt/Argon2 bilan tekshirib, sessiya ID'ni yangilaydi (`session()->regenerate()`).",
        "- `Remember Me`: xavfsiz tasodifiy token (`remember_token`) orqali sessiya muddati tugasa ham foydalanuvchini avtomatik tizimga kiritish.",
        "- **AuthenticateSession Middleware**: xavfsizlik uchun eng muhim vosita — `Auth::logoutOtherDevices($password)` chaqirilganda, foydalanuvchining boshqa barcha kompyuter va telefonlardagi sessiyalarini bekor qiladi.",
        "",
        "```php",
        "// Login va xavfsiz sessiya boshqaruvi",
        "if (Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {",
        "    $request->session()->regenerate(); // session fixation oldini oladi",
        "    return redirect()->intended('/dashboard');",
        "}",
        "",
        "// Boshqa qurilmalardan chiqarish",
        "Auth::logoutOtherDevices($request->input('password'));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Redis drayverida ishlovchi, flash xabarlar bilan boyitilgan login/logout tizimi yozing; `logoutOtherDevices` orqali boshqa sessiyalarni o'chirishni testlang.",
      acceptanceCriteria: [
        "Session drayverlari (file, database, redis) farqini va klaster serverlarda nima uchun redis kerakligini tushuntira oladi",
        "Flash data va doimiy sessiya ma'lumotlari farqini biladi",
        "`session()->regenerate()` ning Session Fixation hujumidan himoyadagi rolini tushunadi",
        "`AuthenticateSession` middleware qanday ishlashini biladi"
      ],
      prerequisites: [
        "2.4",
        "20.2",
        "51.14"
      ]
    }
  ]
});
