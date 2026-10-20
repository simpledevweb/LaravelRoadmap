/* 62 · MVC Architecture
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 62,
  slug: "mvc-architecture",
  title: "MVC Architecture",
  group: "architecture",
  description: "MVC (Model–View–Controller) — Laravel'ning asosiy arxitektura naqshi: ma'lumot va biznes mantiq (Model), taqdimot (View) va so'rovni boshqarish (Controller) ajratiladi. Senior dasturchi MVC'ning har qismi mas'uliyatini aniq biladi, \"semiz controller\" va \"semiz model\" muammolarini taniydi va kerak bo'lganda MVC'ni servis/action qatlamlari bilan kengaytiradi.",
  subskills: [
    {
      id: "62.1",
      title: "Model",
      description: [
        "Laravel'da Model — Eloquent class: DB jadvalini ifodalaydi, atributlar, cast'lar, relation'lar, scope'lar va domen xatti-harakatini (holat o'tishlari, hisob-kitoblar) o'z ichiga oladi. Active Record naqshi — model o'zini saqlaydi va yuklaydi.",
        "",
        "Model nima qilmasligi kerak: HTTP bilan ishlash (`request()`), view render qilish, email yuborish va tashqi API chaqirish (bular — servis/listener), juda ko'p mas'uliyat (2000 qatorli \"god model\"). Murakkab domenlarda — model ichidagi biznes qoidalar yoki alohida domen obyektlari.",
        "",
        "```php",
        "final class Order extends Model",
        "{",
        "    protected function casts(): array { return ['status' => OrderStatus::class, 'paid_at' => 'immutable_datetime']; }",
        "    public function items(): HasMany { return $this->hasMany(OrderItem::class); }",
        "    public function isPayable(): bool { return $this->status === OrderStatus::Pending && $this->total > 0; }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Eng katta modelingizni ko'rib chiqib, unga tegishli bo'lmagan mas'uliyatlarni (HTTP, email, API) ajrating.",
      acceptanceCriteria: [
        "Model mas'uliyatini biladi",
        "God model belgilarini taniydi"
      ],
      prerequisites: [
        "13.1"
      ]
    },
    {
      id: "62.2",
      title: "View",
      description: [
        "View — taqdimot qatlami: Blade shablonlar, komponentlar (`<x-alert>`), layout'lar; API'da — JSON Resource'lar view vazifasini bajaradi. View faqat berilgan ma'lumotni ko'rsatadi: so'rovlar, biznes mantiq va murakkab hisob-kitoblar view'da bo'lmasligi kerak (N+1 va testlash qiyinligi manbai).",
        "",
        "Murakkab taqdimot mantiqi uchun: Blade komponent class'lari, view model'lar (presenter), View Composer'lar (umumiy ma'lumot). Xavfsizlik: `{{ }}` escaping, `{!! !!}` dan qochish.",
        "",
        "```blade",
        "{{-- ❌ view ichida so'rov --}}",
        "@foreach (\\App\\Models\\Order::where('user_id', auth()->id())->get() as $order)",
        "{{-- ✅ controller ma'lumotni beradi --}}",
        "@foreach ($orders as $order)",
        "    <x-order-row :order=\"$order\" />",
        "@endforeach",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Blade shablonlardagi so'rov va biznes mantiqni controller yoki view model'ga ko'chiring.",
      acceptanceCriteria: [
        "View mas'uliyatini biladi",
        "View'da so'rov va mantiqning zararini tushunadi"
      ],
      prerequisites: [
        "51.4"
      ]
    },
    {
      id: "62.3",
      title: "Controller",
      description: [
        "Controller — HTTP so'rov va ilova o'rtasidagi vositachi: kirishni qabul qiladi (Form Request validatsiya va avtorizatsiya qiladi), ishni servis/action'ga topshiradi, javobni (view, Resource, redirect) qaytaradi. Yaxshi controller metodi — bir necha qator.",
        "",
        "Turlari: resource controller (CRUD), single action (`__invoke` — bitta murakkab amal uchun), API controller'lar. Controller biznes qoidalar, so'rov tuzish va tashqi chaqiruvlarni o'zida saqlamaydi.",
        "",
        "```php",
        "final class OrderController",
        "{",
        "    public function store(StoreOrderRequest $request, PlaceOrder $placeOrder): JsonResponse",
        "    {",
        "        $order = $placeOrder->handle(PlaceOrderData::fromRequest($request));",
        "        return (new OrderResource($order))->response()->setStatusCode(201);",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta controller'ni \"yupqa\" holatga keltiring: validatsiya Form Request'ga, mantiq Action'ga.",
      acceptanceCriteria: [
        "Controller mas'uliyatini biladi",
        "Controller'ni yupqa saqlaydi"
      ],
      prerequisites: [
        "2.5"
      ]
    },
    {
      id: "62.4",
      title: "Request Lifecycle",
      description: [
        "MVC kontekstida so'rov oqimi: so'rov → kernel va middleware → router (URL → controller metodi, route model binding) → controller (Form Request avtomatik validatsiya va avtorizatsiya) → model/servislar → view yoki Resource → javob middleware orqali qaytadi.",
        "",
        "Bu oqimni bilish: qayerga qaysi kod tegishli ekanini aniqlash (umumiy cross-cutting — middleware, kirish — Form Request, biznes — servis, chiqish — Resource), xatolarni tez lokalizatsiya qilish.",
        "",
        "```text",
        "GET /orders/42",
        " → middleware: auth, throttle",
        " → Route::get('/orders/{order}') → binding: Order #42",
        " → OrderController@show → $this->authorize('view', $order)",
        " → OrderResource → JSON → middleware (after) → javob",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta endpoint uchun MVC so'rov oqimini bosqichma-bosqich diagramma qiling.",
      acceptanceCriteria: [
        "MVC so'rov oqimini biladi",
        "Har bosqichga tegishli kodni aniqlaydi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "62.5",
      title: "Routing",
      description: [
        "Routing — URL va HTTP metodini controller amaliga bog'lash: `routes/web.php`, `routes/api.php`; resource route'lar, nomlangan route'lar, guruhlar (prefix, middleware, name), route model binding, cheklovlar (`whereNumber`), fallback route'lar.",
        "",
        "Yaxshi amaliyot: closure o'rniga controller'lar (route cache uchun), nomlangan route'lar (URL'ni qattiq kodlamaslik — `route('orders.show', $order)`), modul bo'yicha route fayllari, `route:list` bilan tekshirish, production'da `route:cache`.",
        "",
        "```php",
        "Route::middleware(['auth'])->prefix('account')->name('account.')->group(function () {",
        "    Route::resource('orders', OrderController::class)->only(['index', 'show']);",
        "    Route::post('orders/{order}/cancel', CancelOrderController::class)->name('orders.cancel');",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Route fayllarini modul bo'yicha tashkil qilib, barcha route'larni nomlang va closure'larni controller'ga o'tkazing.",
      acceptanceCriteria: [
        "Routing imkoniyatlarini biladi",
        "Route'larni tartibli va keshlanadigan saqlaydi"
      ],
      prerequisites: [
        "2.3"
      ]
    },
    {
      id: "62.6",
      title: "Controller Responsibilities",
      description: [
        "Controller'ning aniq mas'uliyatlari: (1) HTTP kirishni qabul qilish (Form Request orqali validatsiya); (2) avtorizatsiya (policy — yoki Form Request'da); (3) kirishni ilova tushunchalariga aylantirish (DTO); (4) application servis/action'ni chaqirish; (5) natijani HTTP javobga aylantirish (Resource, redirect, status kod). Shuncha.",
        "",
        "Controller'da bo'lmasligi kerak: biznes qoidalar, murakkab so'rovlar, tranzaksiya mantiqi, tashqi API chaqiruvlari, email yuborish, fayl qayta ishlash. Bu mas'uliyatlar aniq bo'lsa, controller'lar bir xil va oldindan bashorat qilinadigan bo'ladi.",
        "",
        "```php",
        "public function update(UpdateProfileRequest $request, UpdateProfile $action): RedirectResponse",
        "{",
        "    $action->handle($request->user(), ProfileData::from($request->validated()));",
        "    return back()->with('status', 'Profil yangilandi');",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Jamoa uchun \"controller nima qiladi / qilmaydi\" qoidalar ro'yxatini yozing va review checklist'iga qo'shing.",
      acceptanceCriteria: [
        "Controller mas'uliyatlarini aniq sanaydi",
        "Ularni jamoa standartiga aylantiradi"
      ],
      prerequisites: [
        "62.3"
      ]
    },
    {
      id: "62.7",
      title: "Business Logic Placement",
      description: [
        "Biznes mantiq qayerda bo'lishi kerak: oddiy, bitta modelga tegishli qoidalar — model metodlarida (`$order->isPayable()`); bir nechta modelni o'z ichiga olgan jarayonlar — Action/Service class'larda; murakkab domen — alohida domen qatlami (entity, value object, domen servislari). Hech qachon — controller, view, migratsiya, Blade yoki route closure'da.",
        "",
        "Mezon: mantiqni HTTP'siz (artisan buyruq, job, test) qayta ishlatish mumkinmi? Agar u controller'da bo'lsa — yo'q. Bitta qoida bitta joyda (DRY bilim darajasida).",
        "",
        "```text",
        "\"Buyurtma to'lanishi mumkinmi?\"        → Order::isPayable()",
        "\"Buyurtma berish\" (zaxira, to'lov, email) → PlaceOrder action",
        "\"Narx siyosati\" (chegirma, soliq, kupon)  → PricingPolicy domen servisi",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Controller va view'larda tarqalgan biznes qoidalarni topib, to'g'ri joyga ko'chiring.",
      acceptanceCriteria: [
        "Biznes mantiq joylashuvi mezonlarini biladi",
        "Qayta ishlatish imkoniyatini tekshiradi"
      ],
      prerequisites: [
        "61.9"
      ]
    },
    {
      id: "62.8",
      title: "Validation Layer",
      description: [
        "Validatsiya qatlami — biznes mantiqqa faqat to'g'ri formatdagi ma'lumot yetishini ta'minlaydi: Form Request'lar (HTTP kirish), Validator (boshqa manbalar — import, API javoblari), DTO konstruktorlari (tiplar), domen invariantlari (biznes qoidalar — domen obyektida, exception bilan).",
        "",
        "Ikki daraja: **kirish validatsiyasi** (format, tip, majburiylik — Form Request) va **biznes validatsiyasi** (kontekstga bog'liq qoidalar — \"zaxira yetarlimi\", \"kupon amal qiladimi\" — domen/servisda). Ikkalasini aralashtirmaslik.",
        "",
        "```php",
        "// Kirish: Form Request",
        "'quantity' => ['required', 'integer', 'min:1'],",
        "// Biznes: domen",
        "if ($product->stock < $quantity) {",
        "    throw new InsufficientStock($product->id, $quantity);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Validatsiyalarni kirish va biznes darajalariga ajrating va har birini to'g'ri qatlamga joylashtiring.",
      acceptanceCriteria: [
        "Kirish va biznes validatsiyasini farqlaydi",
        "Validatsiyani to'g'ri qatlamga joylashtiradi"
      ],
      prerequisites: [
        "2.13"
      ]
    },
    {
      id: "62.9",
      title: "Service Layer",
      description: [
        "Servis qatlami — MVC'ga qo'shimcha qatlam: biznes jarayonlari controller va model o'rtasida. Laravel'da odatiy shakllar: **Action** class'lar (bitta use case — `CreateInvoice`), **Service** class'lar (bog'liq amallar to'plami — `BillingService`; ehtiyot — \"god service\"ga aylanmasin).",
        "",
        "Foydasi: controller yupqa, mantiq qayta ishlatiladi (HTTP, CLI, job, test), testlash oson, tranzaksiya chegaralari aniq. Har CRUD uchun servis — ortiqcha; murakkab jarayonlar uchun.",
        "",
        "```php",
        "final class IssueInvoice",
        "{",
        "    public function __construct(private InvoiceNumberGenerator $numbers) {}",
        "",
        "    public function handle(Order $order): Invoice",
        "    {",
        "        return DB::transaction(fn () => $order->invoice()->create([",
        "            'number' => $this->numbers->next(),",
        "            'total'  => $order->total,",
        "        ]));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Murakkab jarayonni Action class'ga ajratib, uni controller, artisan buyruq va testdan chaqiring.",
      acceptanceCriteria: [
        "Servis qatlamining maqsadini biladi",
        "Action va Service class'larni o'rinli tanlaydi"
      ],
      prerequisites: [
        "61.9"
      ]
    },
    {
      id: "62.10",
      title: "Data Access Layer",
      description: [
        "Ma'lumotlarga kirish qatlami: Laravel'da asosan Eloquent (Active Record) — model'lar o'zlari ma'lumotga kiradi. Murakkab so'rovlar uchun: scope'lar, custom builder'lar, query object'lar (`OverdueInvoicesQuery`), repository'lar (domenni ORM'dan ajratish yoki bir nechta manba bo'lganda).",
        "",
        "Qoida: murakkab so'rovlar bir joyda jamlanadi (controller va view'larda tarqalmaydi), qayta ishlatiladi va testlanadi. Har model uchun \"yupqa\" repository (`find`, `all`, `create` ni takrorlovchi) — Laravel'da odatda ortiqcha qatlam.",
        "",
        "```php",
        "final class OverdueInvoicesQuery",
        "{",
        "    public function __invoke(CarbonImmutable $asOf): Builder",
        "    {",
        "        return Invoice::query()->where('status', 'unpaid')->where('due_date', '<', $asOf)->with('customer:id,name');",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Controller'larda takrorlanayotgan murakkab so'rovlarni query object yoki scope'larga jamlang.",
      acceptanceCriteria: [
        "Eloquent bilan ma'lumotga kirish naqshlarini biladi",
        "Keraksiz repository qatlamidan qochadi"
      ],
      prerequisites: [
        "5.11"
      ]
    },
    {
      id: "62.11",
      title: "View Rendering",
      description: [
        "Server tomonida render: Blade (`view('orders.index', compact('orders'))`), Blade komponentlari va slotlar, Livewire (server holatli reaktiv komponentlar), Inertia (Laravel controller + Vue/React sahifalar, API'siz). Render performance: `view:cache`, komponentlarda so'rovlar yo'q, katta ro'yxatlar pagination bilan, qisman yangilanishlar (Livewire, Turbo).",
        "",
        "Har bir yondashuv — MVC'ning \"V\" qismini turlicha amalga oshiradi; controller va model qatlamlari bir xil qoladi.",
        "",
        "```php",
        "// Inertia",
        "return Inertia::render('Orders/Index', [",
        "    'orders' => OrderResource::collection(Order::with('customer')->latest()->paginate()),",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bitta sahifani Blade va Inertia (yoki Livewire) bilan amalga oshirib, farqlarini solishtiring.",
      acceptanceCriteria: [
        "Laravel'dagi view rendering variantlarini biladi",
        "Render performance omillarini tushunadi"
      ],
      prerequisites: [
        "62.2"
      ]
    },
    {
      id: "62.12",
      title: "API Controllers",
      description: [
        "API controller'lar — HTML emas, JSON qaytaradi: `--api` resource controller'lar (create/edit yo'q), Resource'lar orqali javob, to'g'ri status kodlar (`201`, `204`, `422`), validatsiya xatolari avtomatik JSON, versiyalangan namespace'lar (`Api\\V1\\OrderController`), autentifikatsiya (Sanctum), rate limiting.",
        "",
        "Web va API controller'larni ajratish (bitta controller ikkalasiga xizmat qilishi — chalkashlik). Umumiy mantiq Action'larda — ikkala controller ularni chaqiradi.",
        "",
        "```php",
        "namespace App\\Http\\Controllers\\Api\\V1;",
        "",
        "final class OrderController",
        "{",
        "    public function index(Request $request): AnonymousResourceCollection",
        "    {",
        "        return OrderResource::collection($request->user()->orders()->latest()->cursorPaginate(20));",
        "    }",
        "    public function destroy(Order $order): Response",
        "    {",
        "        $this->authorize('delete', $order);",
        "        $order->delete();",
        "        return response()->noContent();",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Web va API uchun umumiy Action'dan foydalanuvchi alohida controller'lar yozing.",
      acceptanceCriteria: [
        "API controller xususiyatlarini biladi",
        "Web va API controller'larni ajratadi"
      ],
      prerequisites: [
        "18.17"
      ]
    },
    {
      id: "62.13",
      title: "Resource Transformation",
      description: [
        "Resource transformatsiya — model va tashqi javob o'rtasidagi qatlam (MVC'da API uchun \"View\"): API Resource'lar ichki tuzilmani yashiradi, maydonlarni nomlash va formatlashni boshqaradi, shartli maydonlar (ruxsat, yuklangan relation'lar), barqaror shartnoma.",
        "",
        "Model'ni to'g'ridan-to'g'ri qaytarish (`return $order`) — DB ustunlari API shartnomasiga aylanadi va sezgir maydonlar sizib chiqishi mumkin. Resource'lar — API versiyalash va orqaga moslik uchun asos.",
        "",
        "```php",
        "final class OrderResource extends JsonResource",
        "{",
        "    public function toArray(Request $request): array",
        "    {",
        "        return [",
        "            'id' => $this->id,",
        "            'status' => $this->status->value,",
        "            'total' => ['amount' => $this->total, 'currency' => 'UZS'],",
        "            'customer' => CustomerResource::make($this->whenLoaded('customer')),",
        "            'can_cancel' => $request->user()?->can('cancel', $this->resource),",
        "        ];",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Model qaytarayotgan endpoint'larni Resource'larga o'tkazib, sezgir maydonlar chiqmasligini testlang.",
      acceptanceCriteria: [
        "Resource'ning MVC'dagi rolini biladi",
        "Model'ni to'g'ridan-to'g'ri qaytarish xavfini tushunadi"
      ],
      prerequisites: [
        "2.25"
      ]
    },
    {
      id: "62.14",
      title: "Fat Controller Problems",
      description: [
        "\"Semiz controller\" — validatsiya, biznes mantiq, so'rovlar, tranzaksiyalar, email, tashqi API, fayl qayta ishlash bitta metodda (100+ qator). Muammolar: qayta ishlatib bo'lmaydi (CLI, job, API'da takrorlanadi), testlash qiyin (faqat HTTP orqali), o'qish va o'zgartirish xavfli, ko'p dasturchi bir faylni o'zgartiradi (konfliktlar).",
        "",
        "Belgilari: uzun metodlar, ko'p `use` importlari, controller'da `DB::`, `Http::`, `Mail::`, `if` zanjirlari, controller'lararo copy-paste. Davo: Form Request, Action/Service, Resource, Event/Listener, Policy.",
        "",
        "```text",
        "❌ OrderController@store — 140 qator: validatsiya, narx hisoblash, zaxira, to'lov, PDF, email",
        "✅ StoreOrderRequest → PlaceOrder action → OrderPlaced event (listener'lar: PDF, email) → OrderResource",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Eng semiz controller metodini bosqichma-bosqich refactor qilib, har qadamni testlar bilan himoyalang.",
      acceptanceCriteria: [
        "Semiz controller belgilari va zararini biladi",
        "Uni Laravel vositalari bilan refactor qiladi"
      ],
      prerequisites: [
        "62.6"
      ]
    },
    {
      id: "62.15",
      title: "Thin Controller Design",
      description: [
        "Yupqa controller dizayni: har metod 5–15 qator; Form Request (validatsiya + avtorizatsiya), DTO yaratish, bitta Action chaqiruvi, Resource yoki redirect qaytarish. Murakkab amallar uchun single action controller'lar (`__invoke`) — har biri bitta use case.",
        "",
        "Natija: controller'lar bir xil va oldindan bashorat qilinadigan, barcha mantiq testlanadigan qatlamlarda, yangi kirish nuqtalari (API, CLI) qo'shish oson. Haddan oshirmaslik: oddiy CRUD uchun Eloquent'ni controller'da to'g'ridan-to'g'ri ishlatish ham normal.",
        "",
        "```php",
        "final class CancelOrderController",
        "{",
        "    public function __invoke(CancelOrderRequest $request, Order $order, CancelOrder $cancel): OrderResource",
        "    {",
        "        return new OrderResource($cancel->handle($order, $request->reason()));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Murakkab amallar uchun single action controller'lar yarating va resource controller'larni yupqa saqlang.",
      acceptanceCriteria: [
        "Yupqa controller naqshlarini biladi",
        "Oddiy CRUD'da ortiqcha qatlam qo'shmaydi"
      ],
      prerequisites: [
        "62.14"
      ]
    },
    {
      id: "62.16",
      title: "MVC Limitations",
      description: [
        "MVC cheklovlari: biznes mantiq uchun aniq joy yo'q (model va controller o'rtasida \"tortishuv\" — semiz model yoki semiz controller); murakkab domenlar uchun yetarli tuzilma bermaydi; Active Record (Eloquent) ma'lumot va domen mantiqini birlashtiradi — katta domenlarda bog'liqlik ortadi; asinxron jarayonlar, integratsiyalar va ko'p kirish nuqtalari MVC'dan tashqarida.",
        "",
        "Shuning uchun Laravel ilovalari o'sgan sari MVC servis/action qatlami, domen qatlami, event'lar va modullar bilan kengaytiriladi. MVC — taqdimot qatlami naqshi, butun ilova arxitekturasi emas.",
        "",
        "```text",
        "Kichik ilova:  Route → Controller → Model → View  ✅",
        "O'sgan ilova:  Route → Controller → Action → Domain/Model → Repository/Adapter",
        "                                      ↘ Event → Listener/Job",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilovangizda MVC yetishmay qolgan joylarni aniqlab, qaysi qo'shimcha qatlamlar kerakligini asoslang.",
      acceptanceCriteria: [
        "MVC cheklovlarini biladi",
        "MVC'ni qachon kengaytirish kerakligini asoslaydi"
      ],
      prerequisites: [
        "61.2"
      ]
    },
    {
      id: "62.17",
      title: "MVC vs Layered Architecture",
      description: [
        "MVC — taqdimot qatlamini tashkil qilish naqshi (UI va so'rov boshqaruvi); qatlamli arxitektura — butun ilovani tashkil qilish (presentation, application, domain, infrastructure). Ular raqobatchi emas: MVC qatlamli arxitekturaning presentation qatlamida yashaydi; Laravel'dagi \"Model\" esa Eloquent sifatida ham domen, ham infratuzilma qatlamiga tegishli bo'lib qoladi.",
        "",
        "Amaliy natija: kichik loyihalarda MVC yetarli; o'sgan loyihalarda Controller → Application (Action) → Domain → Infrastructure qatlamlari; Eloquent model'larni domen va persistensiya o'rtasida qanday tutish — ongli qaror (pragmatik: Eloquent'ni domen modeli sifatida ishlatish; qat'iy: alohida domen obyektlari + repository).",
        "",
        "```text",
        "Presentation:   Controller, FormRequest, Resource, Blade   ← MVC shu yerda",
        "Application:    Actions / Use cases, DTO",
        "Domain:         Entities, Value Objects, Policies (biznes)",
        "Infrastructure: Eloquent, API adapter'lar, Queue, Mail",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyiha tuzilmasini qatlamlar va MVC elementlari bo'yicha xaritalab, Eloquent'ning o'rni haqida jamoa qarorini yozing.",
      acceptanceCriteria: [
        "MVC va qatlamli arxitektura munosabatini biladi",
        "Eloquent'ning qatlamlardagi o'rni haqida ongli qaror qabul qiladi"
      ],
      prerequisites: [
        "61.2"
      ]
    }
  ]
});
