/* 56 · Debugging
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 56,
  slug: "debugging",
  title: "Debugging",
  group: "observability",
  description: "Debugging — xatoning ildiz sababini topish va uni ishonchli tuzatish ko'nikmasi. Bu tasodifiy `dd()` lar emas, balki tizimli jarayon: qayta yaratish, gipoteza, dalil, toraytirish, tuzatish va regressiyani oldini olish. Senior dasturchi murakkab, takrorlanishi qiyin va production'dagi xatolarni ham xotirjam va metodik tahlil qiladi.",
  subskills: [
    {
      id: "56.1",
      title: "Reproducing Bugs",
      description: [
        "Qayta yarata olmagan xatoni ishonchli tuzatib bo'lmaydi — tuzatildimi, bilib bo'lmaydi. Ma'lumot yig'ish: aniq qadamlar, kutilgan va haqiqiy natija, vaqt, foydalanuvchi, muhit (brauzer, ilova versiyasi), log'lar, `request_id`, Sentry hodisasi, skrinshot.",
        "",
        "Qayta yaratish muhiti: lokal yoki staging, production'ga o'xshash ma'lumot (anonimlashtirilgan), bir xil versiya va konfiguratsiya. Qayta yaratilgach — uni avtomatik test sifatida yozish (keyingi qadamlar uchun asos va regressiya himoyasi).",
        "",
        "```php",
        "it('reproduces #1342: discount applied twice on retry', function () {",
        "    $order = Order::factory()->create(['total' => 100_000]);",
        "    app(ApplyCoupon::class)->handle($order, 'SALE10');",
        "    app(ApplyCoupon::class)->handle($order, 'SALE10');   // qayta urinish",
        "    expect($order->fresh()->total)->toBe(90_000);         // hozir 81_000 — bug",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Oxirgi bug hisobotini qayta yaratib, uni yiqiladigan test sifatida yozing.",
      acceptanceCriteria: [
        "Qayta yaratish uchun kerakli ma'lumotlarni yig'adi",
        "Bug'ni test bilan qotiradi"
      ],
      prerequisites: [
        "27.2"
      ]
    },
    {
      id: "56.2",
      title: "Minimal Reproduction",
      description: [
        "Minimal reproduksiya — xatoni keltirib chiqaradigan eng kichik kod/ma'lumot/qadamlar to'plami. Keraksiz qismlarni bittalab olib tashlash (ma'lumot, middleware, relation, parametr) — xato yo'qolgan zahoti oxirgi olib tashlangan narsa sababga bog'liq.",
        "",
        "Foydalari: sabab ko'pincha shu jarayonning o'zida topiladi; framework yoki paket bug'i bo'lsa — issue yozish uchun zarur (maintainer'lar minimal reproduksiyasiz ko'rib chiqmaydi); testni kichik va tez qiladi.",
        "",
        "```bash",
        "laravel new repro-1342 && cd repro-1342",
        "# faqat muammoga kerakli model, migratsiya va bitta test",
        "php artisan test --filter=ReproTest",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Murakkab bug uchun toza Laravel loyihasida minimal reproduksiya tayyorlang.",
      acceptanceCriteria: [
        "Keraksiz qismlarni tizimli olib tashlaydi",
        "Minimal reproduksiyaning qiymatini tushunadi"
      ],
      prerequisites: [
        "56.1"
      ]
    },
    {
      id: "56.3",
      title: "Stack Trace Analysis",
      description: [
        "Stack trace — xato yuz bergan paytdagi chaqiruvlar zanjiri: eng yuqorida xato joyi, pastga qarab — kim chaqirgan. O'qish usuli: exception turi va xabarini diqqat bilan o'qish, vendor qatorlarini o'tkazib yuborib birinchi **o'z kodingiz** qatorini topish, `previous` exception'larni ko'rish (asl sabab ko'pincha ichkarida — \"Caused by\").",
        "",
        "Laravel/Ignition sahifasi, Sentry va log'lardagi trace'lar. Framework ichidagi xato ko'pincha noto'g'ri argument yoki konfiguratsiya natijasi — sizning chaqiruvingizdan boshlang.",
        "",
        "```text",
        "TypeError: App\\Services\\Pricing::total(): Argument #1 ($subtotal) must be of type int, string given",
        "  at app/Services/Pricing.php:24",
        "  #0 app/Http/Controllers/CartController.php:41: Pricing->total('15000')   ← sabab shu yerda",
        "  #1 vendor/laravel/framework/...",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "3 ta turli stack trace'ni tahlil qilib, har birida asl sabab qatorini va tuzatishni aniqlang.",
      acceptanceCriteria: [
        "Stack trace'ni to'g'ri yo'nalishda o'qiydi",
        "Asl sababni `previous` exception'lardan topadi"
      ],
      prerequisites: [
        "1.15"
      ]
    },
    {
      id: "56.4",
      title: "Log Analysis",
      description: [
        "Log'lar — production debugging'ning asosiy manbai. Samarali tahlil: vaqt oralig'ini toraytirish, `request_id`/`correlation_id` bo'yicha bitta so'rovning barcha yozuvlarini yig'ish, darajalar bo'yicha filtr, naqshlarni qidirish (`grep`, `jq` JSON log'lar uchun, Kibana/Loki so'rovlari), xatolar chastotasi va vaqt bo'yicha taqsimoti (deploy bilan bog'liqmi?).",
        "",
        "Yaxshi log'lar — tahlilning yarmi: strukturali, kontekstli (ID'lar, holat), to'g'ri darajada, sezgir ma'lumotsiz.",
        "",
        "```bash",
        "grep '\"request_id\":\"c1f2a9\"' storage/logs/laravel-2025-06-01.log | jq -r '\"\\(.datetime) \\(.level_name) \\(.message)\"'",
        "# Loki: {app=\"api\"} |= \"c1f2a9\" | json | level=\"ERROR\"",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Production xatosini request ID orqali log'lardan kuzatib, hodisalar ketma-ketligini tiklang.",
      acceptanceCriteria: [
        "Log'larni ID va vaqt bo'yicha filtrlaydi",
        "Strukturali log'lardan foydalanadi"
      ],
      prerequisites: [
        "58.4"
      ]
    },
    {
      id: "56.5",
      title: "Breakpoints",
      description: [
        "Breakpoint — kod bajarilishini muayyan qatorda to'xtatish (Xdebug + IDE): o'zgaruvchilar, call stack va holatni jonli ko'rish, qadamma-qadam yurish (step over, into, out). `dd()`/`dump()` dan afzalligi: kodni o'zgartirmasdan, ko'p o'zgaruvchilarni birga, ifodalarni hisoblash, bajarishni davom ettirish.",
        "",
        "Turlari: oddiy qator, shartli (`$order->id === 42`), exception breakpoint (har qanday exception otilganda to'xtash), logpoint (to'xtamasdan log yozish). Testlar orqali debug — testni debug rejimida ishga tushirish eng qulay.",
        "",
        "```text",
        "PhpStorm: qator raqami yonida bosish → breakpoint",
        "Shart: $order->total < 0",
        "Run → Debug 'ApplyCouponTest'",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Xdebug va IDE bilan test orqali debug qiling: shartli breakpoint va exception breakpoint'dan foydalaning.",
      acceptanceCriteria: [
        "Breakpoint turlarini biladi",
        "`dd()` o'rniga debugger'dan samarali foydalanadi"
      ],
      prerequisites: [
        "57.2"
      ]
    },
    {
      id: "56.6",
      title: "Variable Inspection",
      description: [
        "O'zgaruvchilarni tekshirish usullari: debugger (eng boy — ichma-ich obyektlar, Eloquent atributlari va relation'lar), `dump()`/`dd()`/`ddd()`, Laravel Ray yoki Telescope dumps (brauzer/oqimni buzmasdan), `->dump()` kolleksiya va query builder zanjirlarida, `Log::debug()` kontekst bilan.",
        "",
        "Eloquent nozikliklari: `$model->toArray()` faqat ko'rinadigan atributlarni, `getAttributes()` — xom DB qiymatlarini, `getOriginal()` — o'zgarishdan oldingini, `getDirty()` — o'zgarganlarni ko'rsatadi. Commit qilingan `dd()` — production'da xavf; Pest arch testi bilan taqiqlang.",
        "",
        "```php",
        "$order->getDirty();                 // nima o'zgargan",
        "Order::where('status', 'paid')->dump()->get();   // SQL'ni ko'rish va davom etish",
        "collect($rows)->dump()->map(...);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Eloquent model holatini `getDirty`, `getOriginal` va debugger bilan tahlil qilib, kutilmagan saqlanish bug'ini toping.",
      acceptanceCriteria: [
        "O'zgaruvchilarni tekshirish usullarini biladi",
        "Debug kodini commit qilishning oldini oladi"
      ],
      prerequisites: [
        "56.5"
      ]
    },
    {
      id: "56.7",
      title: "Request Lifecycle Tracing",
      description: [
        "So'rov hayot davri bo'ylab kuzatish: qaysi middleware'lar ishladi, qaysi route va controller, qaysi so'rovlar, event'lar, job'lar dispatch qilindi, kesh hit/miss, tashqi HTTP chaqiruvlari. Vositalar: Telescope (har so'rov uchun barcha yozuvlar bog'langan), Debugbar, Clockwork, OpenTelemetry trace'lari (servislar bo'ylab).",
        "",
        "\"Nega bu middleware ishlamadi?\", \"qaysi listener email yubordi?\", \"nega so'rov sekin?\" kabi savollarga javob. Production'da — sampling bilan tracing (APM).",
        "",
        "```php",
        "// Vaqtinchalik: middleware tartibini ko'rish",
        "Route::get('/debug/route', fn () => app('router')->getRoutes()->getByName('orders.store')->gatherMiddleware());",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Telescope bilan murakkab so'rovning to'liq hayot davrini (middleware, so'rovlar, event'lar, job'lar) tahlil qiling.",
      acceptanceCriteria: [
        "So'rov hayot davrini kuzatish vositalarini biladi",
        "Middleware va event zanjirlarini tashxislaydi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "56.8",
      title: "Database Query Debugging",
      description: [
        "DB bilan bog'liq xatolar: noto'g'ri natija (shart, JOIN, scope, global scope unutilgan yoki ortiqcha), sekinlik, N+1, deadlock, constraint buzilishi. Vositalar: `->toRawSql()`, `->dump()`, `DB::listen`/`DB::enableQueryLog()`, Telescope queries, `EXPLAIN`, DB log'lari (slow log, deadlock log).",
        "",
        "Usul: Eloquent so'rovining haqiqiy SQL'ini olib, uni to'g'ridan-to'g'ri DB klientida bajarib natijani tekshirish; global scope'larni `withoutGlobalScopes()` bilan solishtirish; tranzaksiya va izolyatsiya xatti-harakatini ikki sessiyada qayta yaratish.",
        "",
        "```php",
        "DB::listen(fn (QueryExecuted $q) => logger()->debug($q->toRawSql(), ['ms' => $q->time]));",
        "echo Order::visibleTo($user)->where('status', 'paid')->toRawSql();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Noto'g'ri natija qaytarayotgan Eloquent so'rovining SQL'ini olib, DB'da tahlil qilib tuzating.",
      acceptanceCriteria: [
        "SQL'ni olish va tahlil qilish usullarini biladi",
        "Global scope ta'sirini tekshiradi"
      ],
      prerequisites: [
        "16.15"
      ]
    },
    {
      id: "56.9",
      title: "Race Conditions",
      description: [
        "Race condition — natija parallel amallar tartibiga bog'liq: ikki so'rov bir vaqtda zaxirani kamaytiradi, ikki job bir hisob-faktura yaratadi, \"tekshir-keyin-yarat\" dublikatlari, kesh va DB nomuvofiqligi. Belgilari: kamdan-kam, yuklamada ko'payadi, lokal qayta yaratib bo'lmaydi.",
        "",
        "Qayta yaratish: parallel so'rovlar (k6, `xargs -P`, `Http::pool`), `sleep()` ni kritik oraliqqa vaqtincha qo'shish (oynani kengaytirish), ikki DB sessiyasida qadamma-qadam. Tuzatish: atomik so'rovlar, lock'lar (DB yoki Redis), unique constraint, idempotentlik, tranzaksiya izolyatsiyasi.",
        "",
        "```bash",
        "seq 20 | xargs -P 20 -I{} curl -s -X POST https://staging.example.uz/api/coupons/SALE10/redeem -H \"Authorization: Bearer $T\"",
        "# Natija: 20 ta muvaffaqiyat (kutilgan: 1) → race",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Kupon yoki zaxira bilan bog'liq race condition'ni parallel so'rovlar bilan qayta yaratib, tuzating va testlang.",
      acceptanceCriteria: [
        "Race condition belgilarini va qayta yaratish usullarini biladi",
        "Atomiklik va lock'lar bilan tuzatadi"
      ],
      prerequisites: [
        "17.9"
      ]
    },
    {
      id: "56.10",
      title: "Memory Leak Investigation",
      description: [
        "Xotira sizib chiqishi — long-running jarayonlarda (queue worker, Octane, daemon, uzun artisan buyruqlar) xotira asta o'sib, oxiri `Allowed memory size exhausted` yoki OOM. Sabablar: static massivlar/keshlar, singleton'larda to'planuvchi holat, event listener'lar ko'payishi, Eloquent model'larida relation to'planishi, query log yoqilgan, katta kolleksiyalarni ushlab turish.",
        "",
        "Tekshirish: `memory_get_usage()` ni iteratsiyalar bo'yicha log qilish (o'sish trendi), xotira profiler (Blackfire, `php-meminfo`), shubhali qismlarni bittalab o'chirish. Yumshatish: `--max-jobs`, `--memory`, `lazy()`, `scoped` binding'lar.",
        "",
        "```php",
        "foreach (Order::lazyById(1000) as $i => $order) {",
        "    $this->process($order);",
        "    if ($i % 1000 === 0) {",
        "        Log::debug('mem', ['i' => $i, 'mb' => round(memory_get_usage(true) / 1048576)]);",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Xotirasi o'sib borayotgan buyruq yoki worker'da leak manbasini o'lchovlar bilan toping va tuzating.",
      acceptanceCriteria: [
        "Leak manbalarini biladi",
        "Xotira o'sishini o'lchab tahlil qiladi"
      ],
      prerequisites: [
        "1.22"
      ]
    },
    {
      id: "56.11",
      title: "Production Debugging",
      description: [
        "Production'da debug cheklovlari: debugger va `dd()` yo'q, foydalanuvchi ma'lumotiga ehtiyot, ta'sir qilmaslik kerak. Vositalar: log'lar va trace'lar (`request_id`), Sentry (stack trace, breadcrumbs, kontekst), APM, metrikalar, feature flag bilan qo'shimcha loglashni vaqtincha yoqish, read-only replika'da so'rovlar, `php artisan tinker` (juda ehtiyotkorlik bilan, faqat o'qish, audit bilan).",
        "",
        "Qoidalar: avval kuzating, keyin o'zgartiring; har o'zgarish qayd qilinadi; ta'sirni cheklash (rollback, feature flag o'chirish) — sababni topishdan oldin; production ma'lumotini lokalga ko'chirish — faqat anonimlashtirilgan holda.",
        "",
        "```php",
        "// Vaqtinchalik batafsil log — faqat bitta tenant uchun, flag bilan",
        "if (Feature::active('debug-billing', $tenant)) {",
        "    Log::info('Billing calc', ['tenant' => $tenant->id, 'lines' => $lines->toArray()]);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Production'dagi xatoni faqat log, Sentry va feature-flag'li loglash bilan tashxislash rejasini tuzing.",
      acceptanceCriteria: [
        "Production debug cheklovlari va vositalarini biladi",
        "Avval ta'sirni cheklab, keyin sababni qidiradi"
      ],
      prerequisites: [
        "59.1"
      ]
    },
    {
      id: "56.12",
      title: "Root Cause Analysis",
      description: [
        "Ildiz sabab — simptom emas, xatoning asl manbai: \"500 xato\" (simptom) ← \"null'ga metod chaqiruvi\" ← \"relation bo'sh\" ← \"import yozuvni FK'siz yaratgan\" ← \"import validatsiyasi yo'q\" (ildiz). Faqat simptomni tuzatish (null tekshiruvi qo'shish) — xato boshqa joyda qaytadi.",
        "",
        "Usullar: **5 Why** (har javobga \"nega?\" — odatda 3–5 qadam), Ishikawa (baliq skeleti — sabab toifalari: kod, ma'lumot, infratuzilma, jarayon, odamlar), vaqt chizig'i (nima qachon o'zgardi). Natija: ildiz sababni tuzatish + himoya qatlamlari (constraint, test, monitoring).",
        "",
        "```text",
        "Nega 500? → $order->customer null",
        "Nega null? → customer_id mavjud bo'lmagan mijozga ishora qiladi",
        "Nega? → CSV importda mijoz o'chirilgan, FK yo'q",
        "Nega FK yo'q? → eski migratsiyada qo'shilmagan",
        "Ildiz: referensial yaxlitlik DB'da ta'minlanmagan → FK + import validatsiyasi + test",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Oxirgi jiddiy incident uchun 5 Why tahlilini yozing va ildiz sababga qarshi choralarni belgilang.",
      acceptanceCriteria: [
        "Simptom va ildiz sababni ajratadi",
        "5 Why va boshqa RCA usullarini qo'llaydi"
      ],
      prerequisites: [
        "81.4"
      ]
    },
    {
      id: "56.13",
      title: "Regression Identification",
      description: [
        "Regressiya — avval ishlagan narsa buzildi. Asosiy savol: \"nima o'zgardi?\" — deploy'lar (vaqt bo'yicha xato boshlanishi bilan solishtirish), dependency yangilanishlari (`composer.lock` diff), konfiguratsiya, ma'lumot, infratuzilma, tashqi servislar.",
        "",
        "Vositalar: `git log --since`, `git diff v2.3.0..v2.4.0`, `git bisect run` (testi bor bo'lsa — avtomatik), Sentry release tracking (\"bu xato qaysi relizda birinchi paydo bo'ldi\"), deploy annotatsiyalari grafiklarda, feature flag'larni o'chirib ko'rish.",
        "",
        "```bash",
        "git log --oneline v2.3.0..v2.4.0 -- app/Domain/Billing",
        "git diff v2.3.0..v2.4.0 -- composer.lock | grep -E '^\\+.*\"version\"'",
        "git bisect start v2.4.0 v2.3.0 && git bisect run php artisan test --filter=InvoiceTotalsTest",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sun'iy regressiyani deploy tarixi, lock fayl diff'i va `git bisect` yordamida aniqlang.",
      acceptanceCriteria: [
        "\"Nima o'zgardi?\" yondashuvini qo'llaydi",
        "Bisect va release tracking'dan foydalanadi"
      ],
      prerequisites: [
        "33.16"
      ]
    },
    {
      id: "56.14",
      title: "Error Classification",
      description: [
        "Xatolarni tasniflash ustuvorlik va yondashuvni belgilaydi: **turi** (kod xatosi, ma'lumot xatosi, konfiguratsiya, infratuzilma, tashqi bog'liqlik, foydalanuvchi xatosi — 4xx), **ta'siri** (nechta foydalanuvchi, biznes oqimi to'xtadimi, ma'lumot buzildimi, xavfsizlikmi), **chastotasi** (bir martalik, vaqti-vaqti bilan, doimiy), **tiklanuvchanligi** (retry yordam beradimi — vaqtinchalik vs doimiy).",
        "",
        "Kod darajasida: domen exception'lari (kutilgan, 4xx), tizim xatolari (kutilmagan, 5xx, report qilinadi), vaqtinchalik (retry). Sentry'da guruhlash va darajalar shu tasnifga mos.",
        "",
        "```php",
        "->withExceptions(function (Exceptions $e) {",
        "    $e->dontReport([InsufficientFunds::class, CouponExpired::class]);   // kutilgan biznes holatlari",
        "    $e->throttle(fn (Throwable $ex) => $ex instanceof GatewayTimeout ? Limit::perMinute(10) : Limit::none());",
        "})",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sentry'dagi top-20 xatoni tur, ta'sir va chastota bo'yicha tasniflab, ustuvorlik ro'yxatini tuzing.",
      acceptanceCriteria: [
        "Xatolarni bir nechta o'lchov bo'yicha tasniflaydi",
        "Kutilgan va kutilmagan xatolarni kodda ajratadi"
      ],
      prerequisites: [
        "2.16"
      ]
    },
    {
      id: "56.15",
      title: "Debugging Without Exposing Secrets",
      description: [
        "Debug paytida sirlar va shaxsiy ma'lumot sizib chiqishi xavfi: `dd($request->all())` parol bilan, log'larda token va karta ma'lumotlari, Sentry'ga yuborilgan kontekst, skrinshotlar va chat'larda ulashilgan log'lar, `APP_DEBUG=true` production'da (env qiymatlari ko'rinadi!), `phpinfo()`.",
        "",
        "Himoya: `#[\\SensitiveParameter]` (stack trace'da qiymat yashiriladi), Log va Sentry'da niqoblash (`before_send`, `send_default_pii => false`), model `$hidden`, debug ma'lumotini faqat ichki kanallarda ulashish, vaqtinchalik debug kodini olib tashlash.",
        "",
        "```php",
        "public function charge(string $cardToken, #[\\SensitiveParameter] string $cvv): Receipt { /* ... */ }",
        "",
        "Log::info('Login attempt', Arr::except($request->all(), ['password', 'password_confirmation', 'token']));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Log va Sentry'ga sezgir ma'lumot tushayotgan joylarni toping va niqoblash/`SensitiveParameter` bilan himoyalang.",
      acceptanceCriteria: [
        "Debug paytidagi sizib chiqish manbalarini biladi",
        "`SensitiveParameter` va niqoblashni qo'llaydi"
      ],
      prerequisites: [
        "58.7"
      ]
    },
    {
      id: "56.16",
      title: "Fix Verification",
      description: [
        "Tuzatishni tasdiqlash: avval yiqilgan reproduksiya testi endi o'tadi; to'liq test to'plami yashil (yon ta'sir yo'q); qo'lda asl stsenariy staging'da; chekka holatlar (tuzatish faqat bitta holatni emas, toifani yopadimi?); production'da monitoring — xato qayta paydo bo'lmadimi (Sentry'da \"resolved in next release\", metrikalar).",
        "",
        "Ma'lumot buzilgan bo'lsa — tuzatish kodi bilan birga ma'lumotni tiklash (backfill buyrug'i) va ta'sirlangan foydalanuvchilarni aniqlash.",
        "",
        "```text",
        "✅ Reproduksiya testi: qizil → yashil",
        "✅ To'liq testlar yashil",
        "✅ Staging'da qo'lda sinov",
        "✅ Buzilgan 37 ta buyurtma `orders:recalculate --ids=...` bilan tuzatildi",
        "✅ Sentry: 48 soat ichida qayta paydo bo'lmadi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Oxirgi tuzatishingiz uchun tasdiqlash checklist'ini to'ldiring, shu jumladan production monitoringi.",
      acceptanceCriteria: [
        "Tuzatishni bir necha qatlamda tasdiqlaydi",
        "Buzilgan ma'lumotni tiklashni rejalashtiradi"
      ],
      prerequisites: [
        "56.1"
      ]
    },
    {
      id: "56.17",
      title: "Regression Tests",
      description: [
        "Har bir tuzatilgan bug uchun regressiya testi — xato hech qachon jim qaytmasligi uchun. Test bug'ni aniq qayta yaratadi (avval qizil), tuzatishdan keyin yashil; nomi yoki izohida bug havolasi (tiket raqami). Test to'g'ri darajada: biznes mantiq — unit, endpoint xatti-harakati — feature.",
        "",
        "Regressiya testlari to'plami vaqt o'tib tizimning eng qimmatli testlariga aylanadi — ular haqiqiy, production'da yuz bergan muammolarni aks ettiradi.",
        "",
        "```php",
        "// Regressiya: #1342 — qayta urinishda kupon ikki marta qo'llanardi",
        "it('does not apply the same coupon twice', function () {",
        "    $order = Order::factory()->create(['total' => 100_000]);",
        "    $apply = app(ApplyCoupon::class);",
        "    $apply->handle($order, 'SALE10');",
        "    $apply->handle($order, 'SALE10');",
        "    expect($order->fresh()->total)->toBe(90_000);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Oxirgi 3 ta tuzatilgan bug uchun tiket havolali regressiya testlarini qo'shing.",
      acceptanceCriteria: [
        "Har bug uchun regressiya testi yozadi",
        "Testni to'g'ri darajada va havolali qiladi"
      ],
      prerequisites: [
        "30.10"
      ]
    }
  ]
});
