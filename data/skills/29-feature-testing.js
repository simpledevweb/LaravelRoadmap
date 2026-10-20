/* 29 · Feature Testing
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 29,
  slug: "feature-testing",
  title: "Feature Testing",
  group: "testing",
  description: "Feature testlar ilovani tashqaridan, foydalanuvchi yoki API iste'molchisi nuqtai nazaridan tekshiradi: HTTP so'rov → middleware → controller → DB → javob. Laravel'da ular tez, ifodali va eng ko'p qiymat beradigan testlar hisoblanadi. Senior dasturchi har bir endpoint'ning muvaffaqiyat, validatsiya, autentifikatsiya, avtorizatsiya va chekka holatlarini feature testlar bilan qoplaydi.",
  subskills: [
    {
      id: "29.1",
      title: "Laravel HTTP Tests",
      description: [
        "Laravel test client'i haqiqiy HTTP serversiz so'rovni ilova kernel'i orqali o'tkazadi: `get`, `post`, `put`, `patch`, `delete` va JSON variantlari (`getJson` — `Accept: application/json`). Sozlash: `withHeaders()`, `withToken()`, `withCookies()`, `actingAs()`, `from()` (redirect manbasi), `withoutMiddleware()` (ehtiyotkorlik bilan).",
        "",
        "Javob obyekti (`TestResponse`) ko'plab assertion'larga ega; `$response->json('data.id')`, `->dump()`, `->dd()` debug uchun.",
        "",
        "```php",
        "it('shows an order to its owner', function () {",
        "    $order = Order::factory()->create();",
        "",
        "    $this->actingAs($order->customer->user)",
        "        ->getJson(\"/api/orders/{$order->id}\")",
        "        ->assertOk()",
        "        ->assertJsonPath('data.id', $order->id);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta controller'ning barcha metodlari uchun HTTP feature testlar yozing.",
      acceptanceCriteria: [
        "HTTP test client'ining asosiy metodlarini biladi",
        "JSON va web so'rovlar farqini tushunadi"
      ],
      prerequisites: [
        "25.1"
      ]
    },
    {
      id: "29.2",
      title: "Request/Response Assertions",
      description: [
        "Asosiy javob assertion'lari: status (`assertOk`, `assertCreated`, `assertNoContent`, `assertNotFound`, `assertForbidden`, `assertUnauthorized`, `assertUnprocessable`, `assertStatus`), redirect (`assertRedirect`, `assertRedirectToRoute`), header (`assertHeader`, `assertHeaderMissing`), view (`assertViewIs`, `assertViewHas`, `assertSee`, `assertSeeText`), session (`assertSessionHas`, `assertSessionHasErrors`), cookie (`assertCookie`), fayl (`assertDownload`).",
        "",
        "Status bilan birga mazmunni ham tekshiring — faqat `assertOk()` noto'g'ri ma'lumot qaytarishni ushlamaydi.",
        "",
        "```php",
        "$this->post('/orders', $data)",
        "    ->assertRedirectToRoute('orders.show', Order::first())",
        "    ->assertSessionHas('status', 'Buyurtma yaratildi');",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Faqat status kodni tekshirayotgan testlarni mazmun assertion'lari bilan kuchaytiring.",
      acceptanceCriteria: [
        "Status, header, redirect va session assertion'larini biladi",
        "Status bilan birga mazmunni tekshiradi"
      ],
      prerequisites: [
        "29.1"
      ]
    },
    {
      id: "29.3",
      title: "Route Testing",
      description: [
        "Route darajasidagi testlar: route mavjud va to'g'ri controller'ga bog'langan, nomlangan route'lar (`route('orders.show', $o)` — URL'ni qo'lda yozmaslik), route model binding (mavjud bo'lmagan id — 404, scoped binding — boshqa ota resursi bolasi — 404), parametr cheklovlari, middleware qo'llanganligi.",
        "",
        "`php artisan route:list` bilan solishtirish; barcha himoyalangan route'lar autentifikatsiya talab qilishini avtomatik tekshiruvchi test foydali.",
        "",
        "```php",
        "it('requires auth for all api routes except login', function () {",
        "    collect(Route::getRoutes())",
        "        ->filter(fn ($r) => str_starts_with($r->uri(), 'api/') && ! in_array($r->uri(), ['api/login']))",
        "        ->each(fn ($r) => expect($r->gatherMiddleware())->toContain('auth:sanctum'));",
        "});",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Barcha API route'lari autentifikatsiya middleware'iga ega ekanini tekshiruvchi test yozing.",
      acceptanceCriteria: [
        "Nomlangan route'lar bilan testlaydi",
        "Route binding va middleware qo'llanishini tekshiradi"
      ],
      prerequisites: [
        "2.3"
      ]
    },
    {
      id: "29.4",
      title: "Authentication Testing",
      description: [
        "Autentifikatsiya feature testlari: mehmon himoyalangan sahifaga kirsa — redirect `/login` (web) yoki `401` (API); to'g'ri ma'lumotlar bilan login — sessiya/token; noto'g'ri — xato va autentifikatsiya yo'q; logout; \"eslab qolish\"; parol tiklash oqimi; email tasdiqlash talabi (`verified` middleware); login rate limit.",
        "",
        "Yordamchilar: `actingAs($user)`, `assertAuthenticated()`, `assertAuthenticatedAs($user)`, `assertGuest()`, `Sanctum::actingAs()`.",
        "",
        "```php",
        "it('logs in with valid credentials', function () {",
        "    $user = User::factory()->create(['password' => 'secret-pass']);",
        "    $this->post('/login', ['email' => $user->email, 'password' => 'secret-pass'])",
        "        ->assertRedirect('/dashboard');",
        "    $this->assertAuthenticatedAs($user);",
        "});",
        "",
        "it('blocks guests', fn () => $this->getJson('/api/orders')->assertUnauthorized());",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Login, logout, parol tiklash va mehmon cheklovlari uchun to'liq autentifikatsiya testlarini yozing.",
      acceptanceCriteria: [
        "Autentifikatsiyaning ijobiy va salbiy holatlarini testlaydi",
        "Auth assertion'larini ishlatadi"
      ],
      prerequisites: [
        "20.21"
      ]
    },
    {
      id: "29.5",
      title: "Authorization Testing",
      description: [
        "Avtorizatsiya testlari har bir rol/egalik kombinatsiyasi uchun: egasi — ruxsat, boshqa foydalanuvchi — `403`/`404`, admin — ruxsat, ruxsati yo'q rol — `403`. Policy unit testlari + endpoint feature testlari (policy haqiqatan qo'llanganini tekshirish uchun).",
        "",
        "Dataset'lar matritsa testlari uchun juda mos. Ro'yxat endpoint'larida boshqa foydalanuvchi ma'lumoti chiqmasligini ham tekshiring.",
        "",
        "```php",
        "it('authorizes order update by role', function (string $role, int $status) {",
        "    $order = Order::factory()->create();",
        "    $this->actingAs(User::factory()->role($role)->create())",
        "        ->patchJson(\"/api/orders/{$order->id}\", ['note' => 'x'])",
        "        ->assertStatus($status);",
        "})->with([['admin', 200], ['manager', 200], ['viewer', 403]]);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Resurs uchun rol × amal matritsasini dataset'li avtorizatsiya testlari bilan qoplang.",
      acceptanceCriteria: [
        "Har bir rol va egalik holatini testlaydi",
        "Policy'ning endpoint'da qo'llanganini tekshiradi"
      ],
      prerequisites: [
        "2.15"
      ]
    },
    {
      id: "29.6",
      title: "Validation Testing",
      description: [
        "Validatsiya testlari: har bir qoida uchun noto'g'ri qiymat → `422` va aniq maydon xatosi (`assertJsonValidationErrors(['email'])`, web'da `assertSessionHasErrors`), to'g'ri chegaraviy qiymatlar o'tadi, majburiy maydonlar, shartli qoidalar, massiv elementlari (`items.0.qty`).",
        "",
        "Dataset'lar bilan \"har qoida — bitta holat\" yondashuvi; to'g'ri asosiy payload'ni yordamchi funksiyada saqlab, bitta maydonni buzish.",
        "",
        "```php",
        "it('validates order payload', function (array $override, string $field) {",
        "    $this->actingAs($user)->postJson('/api/orders', array_merge(validOrderPayload(), $override))",
        "        ->assertUnprocessable()",
        "        ->assertJsonValidationErrors($field);",
        "})->with([",
        "    'no items'      => [['items' => []], 'items'],",
        "    'zero qty'      => [['items' => [['product_id' => 1, 'qty' => 0]]], 'items.0.qty'],",
        "    'bad phone'     => [['phone' => '123'], 'phone'],",
        "]);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Form Request'ning har bir qoidasi uchun dataset asosidagi validatsiya testlarini yozing.",
      acceptanceCriteria: [
        "Har bir qoida uchun salbiy holatni testlaydi",
        "\"To'g'ri payload'ni bittalab buzish\" yondashuvini qo'llaydi"
      ],
      prerequisites: [
        "2.13"
      ]
    },
    {
      id: "29.7",
      title: "Database Assertions",
      description: [
        "Feature testdan keyin DB holatini tekshirish: `assertDatabaseHas('orders', [...])`, `assertDatabaseMissing`, `assertDatabaseCount`, `assertModelExists($m)`, `assertModelMissing`, `assertSoftDeleted`, `assertNotSoftDeleted`; yoki `expect($model->fresh())->...`.",
        "",
        "Javob to'g'ri bo'lsa ham, DB'ga noto'g'ri yozilgan bo'lishi mumkin — yozuvchi endpoint'lar uchun DB tekshiruvi majburiy. Cast qilingan qiymatlar (enum, JSON) bilan `assertDatabaseHas` da xom qiymatni bering yoki model orqali tekshiring.",
        "",
        "```php",
        "$this->postJson('/api/orders', $payload)->assertCreated();",
        "",
        "$this->assertDatabaseHas('orders', ['customer_id' => $customer->id, 'status' => 'pending']);",
        "$this->assertDatabaseCount('order_items', 2);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Barcha yozuvchi endpoint testlariga DB holati tekshiruvini qo'shing.",
      acceptanceCriteria: [
        "DB assertion'larini biladi",
        "Javob va DB holatini birga tekshiradi"
      ],
      prerequisites: [
        "25.13"
      ]
    },
    {
      id: "29.8",
      title: "JSON Response Assertions",
      description: [
        "JSON javob tekshiruvlari: `assertJson([...])` (qisman moslik), `assertExactJson` (to'liq), `assertJsonPath('data.items.0.qty', 2)`, `assertJsonStructure(['data' => ['id', 'status', 'items' => ['*' => ['sku', 'qty']]]])`, `assertJsonCount(3, 'data')`, `assertJsonMissing`, `assertJsonMissingPath` (sezgir maydon chiqmasligi!). Fluent API: `->assertJson(fn (AssertableJson $json) => $json->where('data.status', 'paid')->missing('data.password')->etc())`.",
        "",
        "API shartnomasini (tuzilma) va muhim qiymatlarni tekshiring; sezgir maydonlar (parol hash, ichki flag'lar) yo'qligini alohida assert qiling.",
        "",
        "```php",
        "$response->assertJson(fn (AssertableJson $json) => $json",
        "    ->has('data', fn ($d) => $d->where('id', $order->id)->where('status', 'paid')->missing('internal_note')->etc())",
        "    ->has('meta'));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API javoblari uchun tuzilma va sezgir maydon yo'qligini tekshiruvchi testlar yozing.",
      acceptanceCriteria: [
        "Qisman va to'liq JSON moslik farqini biladi",
        "Sezgir maydonlar chiqmasligini tekshiradi"
      ],
      prerequisites: [
        "29.2"
      ]
    },
    {
      id: "29.9",
      title: "Middleware Testing",
      description: [
        "Middleware testlari ikki darajada: (1) middleware class'ini to'g'ridan-to'g'ri — `$middleware->handle($request, fn ($r) => new Response())` bilan, so'rov/javobga ta'sirini tekshirish; (2) route orqali — middleware qo'llanganda xatti-harakat (header qo'shildi, locale o'rnatildi, bloklandi).",
        "",
        "Test uchun vaqtinchalik route: `Route::middleware(SetLocale::class)->get('/_test', fn () => app()->getLocale())`. `withoutMiddleware()` boshqa testlarda faqat aniq sabab bilan — xavfsizlik middleware'larini chetlab o'tish yolg'on ishonch beradi.",
        "",
        "```php",
        "it('sets locale from header', function () {",
        "    Route::middleware(SetLocale::class)->get('/_locale', fn () => app()->getLocale());",
        "    $this->get('/_locale', ['Accept-Language' => 'ru'])->assertSee('ru');",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Custom middleware uchun to'g'ridan-to'g'ri va route orqali testlar yozing.",
      acceptanceCriteria: [
        "Middleware'ni ikki usulda testlay oladi",
        "`withoutMiddleware` ni asossiz ishlatmaydi"
      ],
      prerequisites: [
        "2.4"
      ]
    },
    {
      id: "29.10",
      title: "File Upload Testing",
      description: [
        "Fayl yuklash testlari: `Storage::fake('disk')`, `UploadedFile::fake()->image('a.jpg', 800, 600)->size(500)`, `->create('doc.pdf', 2048, 'application/pdf')`. Tekshiruvlar: fayl saqlandi (`assertExists`), to'g'ri yo'l va nom, validatsiya (MIME, hajm, o'lcham — noto'g'ri fayl `422`), DB'dagi yo'l, eski fayl o'chirildi (almashtirishda).",
        "",
        "Xavfsizlik testlari: ruxsat etilmagan kengaytma (`.php`), soxta MIME, juda katta fayl, path traversal nomi.",
        "",
        "```php",
        "it('rejects php files disguised as images', function () {",
        "    Storage::fake('public');",
        "    $this->actingAs($user)->postJson('/api/avatar', [",
        "        'avatar' => UploadedFile::fake()->create('shell.php.jpg', 10, 'application/x-php'),",
        "    ])->assertJsonValidationErrors('avatar');",
        "});",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Fayl yuklash endpoint'i uchun muvaffaqiyat, validatsiya va xavfsizlik testlarini yozing.",
      acceptanceCriteria: [
        "Soxta fayllar va `Storage::fake` dan foydalanadi",
        "Xavfli fayl holatlarini testlaydi"
      ],
      prerequisites: [
        "28.6"
      ]
    },
    {
      id: "29.11",
      title: "Queue and Event Fakes",
      description: [
        "`Queue::fake()` — job'lar navbatga qo'yilmaydi, tekshiriladi: `assertPushed(Job::class, fn ($j) => $j->orderId === 1)`, `assertPushedOn('emails', ...)`, `assertNotPushed`, `assertNothingPushed`. `Bus::fake()` — chain va batch'lar: `assertChained`, `assertBatched`. `Event::fake([OrderPaid::class])` — faqat ko'rsatilgan event'larni ushlash (boshqalari ishlaydi): `assertDispatched`, `assertListening`.",
        "",
        "Feature testda \"nima navbatga qo'yildi\" tekshiriladi; job/listener mantiqi esa alohida testlanadi.",
        "",
        "```php",
        "Queue::fake();",
        "$this->postJson('/api/exports', ['type' => 'orders'])->assertAccepted();",
        "Queue::assertPushed(ExportOrders::class, fn ($job) => $job->userId === $user->id);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Asinxron jarayonlarni boshlovchi endpoint'lar uchun Queue va Event fake'lari bilan testlar yozing.",
      acceptanceCriteria: [
        "Fake'lar bilan dispatch'ni tekshiradi",
        "Job mantiqini alohida testlaydi"
      ],
      prerequisites: [
        "26.12"
      ]
    },
    {
      id: "29.12",
      title: "Notification and Mail Fakes",
      description: [
        "`Mail::fake()`: `assertSent(Mailable::class, fn ($m) => $m->hasTo($email))`, `assertQueued` (ShouldQueue mailable'lar uchun), `assertNothingSent`. `Notification::fake()`: `assertSentTo($user, InvoicePaid::class, fn ($n, $channels) => in_array('mail', $channels))`, `assertNotSentTo`, `assertCount`.",
        "",
        "Mailable mazmunini alohida test qilish: `$mailable->assertSeeInHtml('...')`, `assertHasSubject()`, `assertHasAttachment()`. Bildirishnoma kanallari (`via()`) foydalanuvchi sozlamalariga qarab to'g'ri tanlanishini tekshiring.",
        "",
        "```php",
        "Notification::fake();",
        "$this->postJson(\"/api/invoices/{$invoice->id}/pay\")->assertOk();",
        "Notification::assertSentTo($invoice->customer, InvoicePaid::class,",
        "    fn ($n, array $channels) => $channels === ['mail', 'database']);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "To'lov oqimidagi barcha email va bildirishnomalarni fake'lar bilan tekshiruvchi testlar yozing.",
      acceptanceCriteria: [
        "Mail va Notification fake'larini ishlatadi",
        "Mailable mazmunini alohida tekshiradi"
      ],
      prerequisites: [
        "2.21"
      ]
    },
    {
      id: "29.13",
      title: "Error Handling",
      description: [
        "Xato holatlari ham testlanadi: mavjud bo'lmagan resurs — `404` va standart xato formati; domen exception'i to'g'ri status va xabarga aylanadi (`422`, `409`); kutilmagan xato — `500`, stack trace yo'q (production rejimida); tashqi servis yiqilganda (`Http::fake` 500) — graceful xatti-harakat; `report()` qilingan exception'lar (`Exceptions::fake()` + `assertReported`).",
        "",
        "`withoutExceptionHandling()` debug uchun, lekin xato formati testlarida handler yoqiq bo'lishi kerak.",
        "",
        "```php",
        "it('returns problem json when gateway is down', function () {",
        "    Http::fake(['api.payme.uz/*' => Http::response(status: 503)]);",
        "    Exceptions::fake();",
        "",
        "    $this->postJson('/api/payments', $payload)",
        "        ->assertStatus(503)",
        "        ->assertJsonPath('code', 'gateway_unavailable');",
        "",
        "    Exceptions::assertReported(GatewayUnavailable::class);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy xato stsenariylari (404, domen xatosi, tashqi servis xatosi) uchun javob formatini testlang.",
      acceptanceCriteria: [
        "Xato javoblarini format bilan testlaydi",
        "Exception reporting'ni tekshiradi"
      ],
      prerequisites: [
        "2.16"
      ]
    },
    {
      id: "29.14",
      title: "Pagination and Filtering Tests",
      description: [
        "Ro'yxat endpoint'lari testlari: sahifa hajmi va `meta`/`links`, keyingi sahifa to'g'ri elementlarni qaytaradi (dublikat va o'tkazib yuborish yo'q), `per_page` maksimal chegarasi, har bir ruxsat etilgan filtr va saralash, noto'g'ri filtr — `400`/`422`, filtrlar kombinatsiyasi, bo'sh natija.",
        "",
        "Tartib deterministik bo'lishi uchun aniq vaqt va id'lar bilan ma'lumot yarating; cursor pagination'da yangi yozuv qo'shilgandan keyin ham barqarorlikni tekshiring.",
        "",
        "```php",
        "it('filters orders by status', function () {",
        "    Order::factory()->count(3)->paid()->for($me)->create();",
        "    Order::factory()->count(2)->pending()->for($me)->create();",
        "",
        "    $this->actingAs($me->user)->getJson('/api/orders?filter[status]=paid')",
        "        ->assertOk()->assertJsonCount(3, 'data')",
        "        ->assertJsonPath('data.*.status', fn ($s) => collect($s)->every(fn ($v) => $v === 'paid'));",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ro'yxat endpoint'ining har bir filtr, saralash va pagination xatti-harakati uchun testlar yozing.",
      acceptanceCriteria: [
        "Pagination meta va sahifalararo izchillikni tekshiradi",
        "Har bir filtr va saralashni testlaydi"
      ],
      prerequisites: [
        "18.10"
      ]
    },
    {
      id: "29.15",
      title: "Permission Boundary Tests",
      description: [
        "Ruxsat chegarasi testlari — xavfsizlik regressiyalariga qarshi himoya: har bir obyekt endpoint'ida boshqa foydalanuvchi/tenant resursiga kirish rad etiladi (IDOR), oddiy foydalanuvchi admin funksiyalariga kira olmaydi (BFLA), mass assignment orqali himoyalangan maydonni (`role`, `tenant_id`, `balance`) o'zgartirib bo'lmaydi, ro'yxatlarda begona ma'lumot yo'q.",
        "",
        "Bu testlarni har bir yangi endpoint uchun majburiy qilish (shablon yoki umumiy dataset) — eng ko'p uchraydigan API zaifliklarining oldini oladi.",
        "",
        "```php",
        "it('cannot escalate role via profile update', function () {",
        "    $user = User::factory()->create(['role' => 'viewer']);",
        "    $this->actingAs($user)->patchJson('/api/profile', ['name' => 'X', 'role' => 'admin'])->assertOk();",
        "    expect($user->fresh()->role)->toBe('viewer');",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Barcha `{id}` li endpoint'lar uchun tenant izolyatsiyasi va mass assignment chegaralarini tekshiruvchi testlar to'plamini yozing.",
      acceptanceCriteria: [
        "IDOR, BFLA va mass assignment chegaralarini testlaydi",
        "Ruxsat testlarini yangi endpoint'lar uchun majburiy qiladi"
      ],
      prerequisites: [
        "20.13",
        "29.5"
      ]
    },
    {
      id: "29.16",
      title: "End-to-End Business Scenarios",
      description: [
        "Biznes stsenariy testi — bir nechta endpoint va jarayonni birlashtirgan to'liq oqim: ro'yxatdan o'tish → savatga qo'shish → buyurtma → to'lov webhook'i → hisob-faktura → email. U alohida testlar ko'rmaydigan integratsiya xatolarini topadi va biznes uchun eng muhim yo'llarning ishlashini kafolatlaydi.",
        "",
        "Bunday testlar kam sonli (eng muhim \"happy path\"lar va asosiy muvaffaqiyatsizlik yo'llari), o'qiladigan (biznes tilidagi yordamchi qadamlar) va barqaror bo'lishi kerak. Brauzer darajasidagi E2E uchun Laravel Dusk yoki Playwright.",
        "",
        "```php",
        "it('completes the purchase flow', function () {",
        "    $customer = registerCustomer();",
        "    $order = placeOrder($customer, items: [['sku' => 'A1', 'qty' => 2]]);",
        "    receivePaymentWebhook($order, amount: $order->total);",
        "",
        "    expect($order->fresh()->status)->toBe(OrderStatus::Paid);",
        "    Mail::assertQueued(InvoiceMail::class, fn ($m) => $m->hasTo($customer->email));",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Biznesingizning eng muhim oqimi uchun yordamchi qadamlar bilan o'qiladigan stsenariy testini yozing.",
      acceptanceCriteria: [
        "Biznes stsenariylarini oqim sifatida testlaydi",
        "Bunday testlarni kam sonli va barqaror saqlaydi"
      ],
      prerequisites: [
        "29.11"
      ]
    }
  ]
});
