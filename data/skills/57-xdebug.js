/* 57 · Xdebug
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 57,
  slug: "xdebug",
  title: "Xdebug",
  group: "observability",
  description: "Xdebug — PHP uchun debugger va profiler kengaytmasi: step debugging (breakpoint'lar, o'zgaruvchilar, call stack), code coverage, profiling va tracing. U `dd()` asosidagi \"ko'r-ko'rona\" debug'ni professional vositaga almashtiradi. Senior dasturchi Xdebug'ni lokal, Docker va CLI muhitlarida sozlay oladi va uni production'da ishlatmaslikni biladi.",
  subskills: [
    {
      id: "57.1",
      title: "Installation va Configuration",
      description: [
        "O'rnatish: `pecl install xdebug` yoki paket (`php8.3-xdebug`), Docker'da `pecl install xdebug && docker-php-ext-enable xdebug` (faqat dev image/stage'da!). Xdebug 3 konfiguratsiyasi `xdebug.mode` orqali: `off`, `develop` (yaxshilangan xato xabarlari, `var_dump`), `debug` (step debugging), `coverage`, `profile`, `trace` — vergul bilan birlashtirish mumkin.",
        "",
        "Asosiy sozlamalar: `xdebug.client_host`, `xdebug.client_port` (default 9003), `xdebug.start_with_request` (`yes`, `trigger`), `xdebug.idekey`. Tekshirish: `php -v` (Xdebug ko'rinadi), `xdebug_info()`.",
        "",
        "```ini",
        "; /usr/local/etc/php/conf.d/xdebug.ini (faqat dev)",
        "zend_extension=xdebug",
        "xdebug.mode=debug,develop",
        "xdebug.start_with_request=trigger",
        "xdebug.client_host=host.docker.internal",
        "xdebug.client_port=9003",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Lokal muhitga Xdebug 3 o'rnatib, `xdebug_info()` bilan konfiguratsiyani tekshiring.",
      acceptanceCriteria: [
        "Xdebug 3 rejimlarini biladi",
        "Asosiy konfiguratsiya parametrlarini sozlaydi"
      ],
      prerequisites: [
        "36.2"
      ]
    },
    {
      id: "57.2",
      title: "Step Debugging",
      description: [
        "Step debugging — kodni qatorma-qator bajarish: Xdebug IDE (PhpStorm, VS Code + PHP Debug) bilan DBGp protokoli orqali ulanadi; IDE \"tinglash\" rejimida, so'rov kelganda breakpoint'da to'xtaydi. Boshqaruv: **step over** (keyingi qator), **step into** (funksiya ichiga), **step out** (funksiyadan chiqish), **resume**, **run to cursor**.",
        "",
        "Trigger: brauzer kengaytmasi (Xdebug Helper — `XDEBUG_TRIGGER` cookie), `?XDEBUG_TRIGGER=1`, CLI'da `XDEBUG_TRIGGER=1 php artisan ...` yoki `XDEBUG_SESSION`. `start_with_request=trigger` — faqat kerak bo'lganda yoqiladi (performance uchun).",
        "",
        "```bash",
        "XDEBUG_TRIGGER=1 php artisan app:recalculate-invoices --id=42",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "IDE'da Xdebug'ni sozlab, web so'rov va artisan buyruqni step debugging bilan kuzating.",
      acceptanceCriteria: [
        "Step debugging boshqaruvlarini biladi",
        "Trigger usullarini ishlatadi"
      ],
      prerequisites: [
        "57.1"
      ]
    },
    {
      id: "57.3",
      title: "Breakpoints",
      description: [
        "Breakpoint turlari IDE'da: qator breakpoint'i, method breakpoint (metod chaqirilganda), exception breakpoint (muayyan yoki har qanday exception otilganda — \"qayerdan kelyapti?\" savoliga eng tez javob), logpoint (to'xtamasdan xabar yozish), vaqtincha o'chirilgan breakpoint'lar.",
        "",
        "Kodda: `xdebug_break()` — dasturiy breakpoint (masalan, vendor kodi ichida yoki dinamik holatda). Ko'p breakpoint — sekin va chalkash; maqsadli joylarga qo'ying va keyin tozalang.",
        "",
        "```php",
        "if ($invoice->total < 0) {",
        "    xdebug_break();   // faqat shu holatda to'xtash (commit qilmang)",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Exception breakpoint bilan noma'lum joydan otilayotgan exception manbasini toping.",
      acceptanceCriteria: [
        "Breakpoint turlarini biladi",
        "Exception breakpoint'dan samarali foydalanadi"
      ],
      prerequisites: [
        "57.2"
      ]
    },
    {
      id: "57.4",
      title: "Conditional Breakpoints",
      description: [
        "Shartli breakpoint — faqat ifoda `true` bo'lganda to'xtaydi: sikl ichida muayyan element (`$order->id === 1342`), noto'g'ri holat (`$total < 0`), muayyan foydalanuvchi. Yuzlab iteratsiyali sikllarda va tez-tez chaqiriladigan kodda — oddiy breakpoint amalda yaroqsiz.",
        "",
        "Hit count — N-marta o'tganda to'xtash. Shart ifodasi PHP'da baholanadi — yon ta'sirli ifodalardan qoching. Shartli breakpoint'lar biroz sekinroq (har o'tishda baholanadi).",
        "",
        "```text",
        "Breakpoint: app/Services/Pricing.php:58",
        "Condition:  $line->qty > 100 && $line->product->is_promo",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "10 000 qatorli import ichida faqat muammoli qatorda to'xtaydigan shartli breakpoint qo'ying.",
      acceptanceCriteria: [
        "Shartli breakpoint va hit count'ni ishlatadi",
        "Shartlarda yon ta'sirdan qochadi"
      ],
      prerequisites: [
        "57.3"
      ]
    },
    {
      id: "57.5",
      title: "Variable Inspection",
      description: [
        "Debugger'da to'xtaganda: lokal va global o'zgaruvchilar, `$this`, ichma-ich obyektlar (Eloquent model atributlari, relation'lar, kolleksiya elementlari), superglobal'lar (`$_SERVER`, `$_REQUEST`). Qiymatni o'zgartirish (holatni sinash uchun), \"Evaluate expression\" — joriy kontekstda istalgan ifodani bajarish (`$order->items->sum('qty')`).",
        "",
        "Sozlamalar: `xdebug.var_display_max_depth`, `max_children`, `max_data` — katta obyektlarni ko'rish uchun. Eloquent'da `attributes`, `original`, `relations` xususiyatlariga qarang.",
        "",
        "```text",
        "Evaluate: $order->getDirty()",
        "Evaluate: $order->items->pluck('sku')->all()",
        "Evaluate: DB::getQueryLog()",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Debugger'da Eloquent modelining atributlari, o'zgargan maydonlari va relation'larini tekshirib, bug sababini toping.",
      acceptanceCriteria: [
        "Debugger'da o'zgaruvchilarni chuqur tekshiradi",
        "Evaluate expression'dan foydalanadi"
      ],
      prerequisites: [
        "57.2"
      ]
    },
    {
      id: "57.6",
      title: "Call Stack",
      description: [
        "Call stack paneli — joriy nuqtaga qanday kelinganini ko'rsatadi: har kadr (frame) — funksiya, fayl va qator; kadrni tanlab, o'sha darajadagi o'zgaruvchilarni ko'rish. Laravel'da stack chuqur (middleware pipeline, container, event dispatcher) — vendor kadrlarini yashirish/qisqartirish (IDE sozlamasi) o'z kodingizni ko'rishni osonlashtiradi.",
        "",
        "Qo'llanishi: \"bu metod kim tomonidan chaqirildi?\", \"qaysi listener bu event'ga reaksiya qildi?\", \"qaysi middleware so'rovni o'zgartirdi?\".",
        "",
        "```text",
        "#0 App\\Services\\InvoiceService->issue()        app/Services/InvoiceService.php:41",
        "#1 App\\Listeners\\IssueInvoice->handle()         app/Listeners/IssueInvoice.php:22",
        "#2 Illuminate\\Events\\Dispatcher->...            (vendor)",
        "#3 App\\Http\\Controllers\\PaymentController->...  app/Http/Controllers/PaymentController.php:57",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Event orqali chaqirilayotgan kodni call stack bilan kuzatib, chaqiruv zanjirini diagramma qiling.",
      acceptanceCriteria: [
        "Call stack'ni o'qib, kadrlar orasida harakatlanadi",
        "Vendor kadrlarini filtrlaydi"
      ],
      prerequisites: [
        "56.3"
      ]
    },
    {
      id: "57.7",
      title: "Watches",
      description: [
        "Watch — debug sessiyasi davomida doimiy kuzatiladigan ifoda: har qadamdan keyin qiymati yangilanadi (`$total`, `$cart->items->count()`, `count($errors)`). Qiymat qachon va qayerda o'zgarishini ko'rish uchun qulay — ayniqsa uzun funksiyalar va sikllarda.",
        "",
        "Watch ifodalari yon ta'sirsiz bo'lishi kerak (har qadamda baholanadi — masalan, `$iterator->next()` ni watch'ga qo'ymang).",
        "",
        "```text",
        "Watches:",
        "  $runningTotal",
        "  $line->discount?->percent",
        "  $this->appliedCoupons",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Murakkab hisob-kitob funksiyasida watch'lar bilan oraliq qiymatlarni kuzatib, noto'g'ri qadamni toping.",
      acceptanceCriteria: [
        "Watch'lardan foydalanadi",
        "Yon ta'sirli ifodalardan qochadi"
      ],
      prerequisites: [
        "57.5"
      ]
    },
    {
      id: "57.8",
      title: "Remote Debugging",
      description: [
        "Remote debugging — PHP boshqa mashinada (Docker konteyner, VM, staging server) ishlaydi, IDE esa lokal. Xdebug IDE'ga ulanadi (`client_host`, port 9003); IDE'da **path mapping** — server yo'li (`/var/www/html`) ↔ lokal yo'l (`/home/user/project`) — aks holda breakpoint'lar ishlamaydi.",
        "",
        "Tarmoq: konteynerdan host'ga — `host.docker.internal` (Linux'da `extra_hosts: host-gateway`), masofaviy serverdan — SSH tunnel (`ssh -R 9003:localhost:9003 server`). Xdebug log (`xdebug.log`) ulanish muammolarini tashxislaydi.",
        "",
        "```bash",
        "ssh -R 9003:127.0.0.1:9003 deploy@staging.example.uz   # staging'dan lokal IDE'ga",
        "```",
        "```ini",
        "xdebug.log=/tmp/xdebug.log",
        "xdebug.log_level=7",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Docker konteyneridagi ilovani lokal IDE'dan debug qiling: path mapping va ulanishni sozlang.",
      acceptanceCriteria: [
        "Path mapping zaruratini biladi",
        "Ulanish muammolarini Xdebug log bilan tashxislaydi"
      ],
      prerequisites: [
        "57.2"
      ]
    },
    {
      id: "57.9",
      title: "IDE Integration",
      description: [
        "PhpStorm: Settings → PHP → Debug (port 9003), Servers (path mapping, nom `PHP_IDE_CONFIG=serverName=app` bilan), \"Start listening for PHP Debug Connections\" tugmasi, \"Break at first line\" (ulanish ishlayotganini tekshirish). Zero-configuration debugging. Pest/PHPUnit testlarini to'g'ridan-to'g'ri debug qilish.",
        "",
        "VS Code: \"PHP Debug\" kengaytmasi, `launch.json` da `pathMappings`, `port: 9003`. Ikkala IDE'da ham Docker interpretatorlari va test runner integratsiyasi.",
        "",
        "```json",
        "{",
        "  \"name\": \"Listen for Xdebug (Docker)\",",
        "  \"type\": \"php\",",
        "  \"request\": \"launch\",",
        "  \"port\": 9003,",
        "  \"pathMappings\": { \"/var/www/html\": \"${workspaceFolder}\" }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "IDE'ingizda Xdebug integratsiyasini sozlab, Pest testini to'g'ridan-to'g'ri debug rejimida ishga tushiring.",
      acceptanceCriteria: [
        "IDE sozlamalarini biladi",
        "Testlarni IDE orqali debug qiladi"
      ],
      prerequisites: [
        "57.8"
      ]
    },
    {
      id: "57.10",
      title: "Code Coverage",
      description: [
        "Xdebug `coverage` rejimi — testlar qaysi qatorlarni bajarganini o'lchaydi (line, branch va path coverage — Xdebug path/branch'ni qo'llab-quvvatlaydi). `XDEBUG_MODE=coverage php artisan test --coverage`. PCOV — faqat line coverage, lekin ancha tez; CI uchun ko'pincha PCOV afzal.",
        "",
        "Coverage ishga tushirish sekin (Xdebug bilan 2–5x) — har lokal test uchun emas, CI yoki maxsus buyruq. HTML hisobot qoplanmagan qismlarni vizual ko'rsatadi.",
        "",
        "```bash",
        "XDEBUG_MODE=coverage vendor/bin/pest --coverage --min=75",
        "XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html build/coverage --path-coverage",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Xdebug va PCOV bilan coverage vaqtini solishtiring va branch coverage hisobotini tahlil qiling.",
      acceptanceCriteria: [
        "Xdebug va PCOV coverage farqini biladi",
        "Branch/path coverage'ni ishlatadi"
      ],
      prerequisites: [
        "25.10"
      ]
    },
    {
      id: "57.11",
      title: "Profiling",
      description: [
        "Xdebug `profile` rejimi — har funksiya chaqiruvlari soni va vaqtini cachegrind fayliga yozadi; tahlil: KCachegrind/QCachegrind, PhpStorm profiler ko'ruvchisi, Webgrind. \"Inclusive\" (bolalari bilan) va \"self\" (o'zi) vaqt — tor joyni topish uchun.",
        "",
        "Xdebug profiler o'zi sezilarli overhead beradi (vaqtlar buziladi, nisbatlar ko'proq ma'noli); muqobillar: SPX (yengil, web UI), Blackfire, Tideways — production'ga yaqinroq natijalar. Faqat trigger bilan yoqing.",
        "",
        "```ini",
        "xdebug.mode=profile",
        "xdebug.start_with_request=trigger",
        "xdebug.output_dir=/tmp/xdebug",
        "xdebug.profiler_output_name=cachegrind.out.%R.%t",
        "```",
        "```bash",
        "curl -b \"XDEBUG_TRIGGER=1\" https://app.test/api/orders && qcachegrind /tmp/xdebug/cachegrind.out.*",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Sekin endpoint'ni Xdebug profiler bilan profiling qilib, eng ko'p \"self\" vaqt olgan 3 ta funksiyani aniqlang.",
      acceptanceCriteria: [
        "Inclusive va self vaqtni farqlaydi",
        "Profiler overhead'ini hisobga oladi"
      ],
      prerequisites: [
        "53.4"
      ]
    },
    {
      id: "57.12",
      title: "Trace Files",
      description: [
        "Xdebug `trace` rejimi — har bir funksiya chaqiruvini (argumentlar, qaytgan qiymatlar, vaqt va xotira bilan) faylga yozadi: kodning to'liq bajarilish yo'li. Qo'llanishi: noma'lum kod oqimini tushunish (\"bu so'rovda nimalar chaqirildi?\"), sehrli xatti-harakatni tahlil qilish (magic method'lar, container), xotira o'sishini funksiyalar bo'yicha kuzatish.",
        "",
        "Trace fayllari juda katta bo'lishi mumkin — qisqa stsenariylar uchun, `xdebug.trace_format` (inson o'qiydigan yoki mashina), `xdebug_start_trace()`/`xdebug_stop_trace()` bilan faqat kerakli qismni.",
        "",
        "```php",
        "xdebug_start_trace('/tmp/trace-checkout');",
        "app(Checkout::class)->place($cart);",
        "xdebug_stop_trace();",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Checkout jarayonining faqat bir qismi uchun trace olib, chaqiruvlar oqimini tahlil qiling.",
      acceptanceCriteria: [
        "Trace rejimi va uning qo'llanishini biladi",
        "Trace hajmini cheklaydi"
      ],
      prerequisites: [
        "57.1"
      ]
    },
    {
      id: "57.13",
      title: "CLI Debugging",
      description: [
        "CLI skriptlar, artisan buyruqlar, queue job'lar va testlarni debug qilish: `XDEBUG_TRIGGER=1 php artisan ...` (yoki `XDEBUG_SESSION=1`), `PHP_IDE_CONFIG=\"serverName=app\"` (PhpStorm path mapping uchun), queue job uchun `php artisan queue:work --once` yoki job'ni `dispatchSync`/test orqali.",
        "",
        "Testlarni debug qilish — eng qulay usul: muammoni testda qayta yaratib, IDE'dan debug rejimida ishga tushirish. Long-running worker'larni debug qilganda timeout'lar (`--timeout=0`) ni o'chirish.",
        "",
        "```bash",
        "XDEBUG_TRIGGER=1 PHP_IDE_CONFIG=\"serverName=app\" php artisan queue:work --once --timeout=0",
        "XDEBUG_TRIGGER=1 vendor/bin/pest --filter=ApplyCouponTest",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Muammoli queue job'ini `--once` rejimida Xdebug bilan debug qiling.",
      acceptanceCriteria: [
        "CLI va worker'larni debug qilish usullarini biladi",
        "Debug paytida timeout'larni boshqaradi"
      ],
      prerequisites: [
        "57.2"
      ]
    },
    {
      id: "57.14",
      title: "PHP-FPM Debugging",
      description: [
        "PHP-FPM orqali web so'rovlarni debug qilish: Xdebug FPM uchun yuklangan bo'lishi (CLI va FPM — alohida ini fayllar!), `xdebug.mode=debug`, trigger (brauzer kengaytmasi yoki cookie). Breakpoint'da to'xtagan so'rov FPM worker'ini band qiladi va Nginx `fastcgi_read_timeout` tugashi mumkin — dev'da timeout'larni oshiring.",
        "",
        "Bir nechta parallel so'rov (SPA, AJAX) — har biri alohida debug sessiyasi; IDE'da \"max simultaneous connections\" sozlamasi. `php-fpm -m` va `phpinfo()` (FPM orqali) bilan Xdebug yuklanganini tekshiring.",
        "",
        "```nginx",
        "# dev muhitida",
        "fastcgi_read_timeout 600s;",
        "```",
        "```bash",
        "php-fpm8.3 -m | grep -i xdebug",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "FPM orqali web so'rovni debug qiling va timeout muammosini dev sozlamalari bilan hal qiling.",
      acceptanceCriteria: [
        "CLI va FPM konfiguratsiyasi farqini biladi",
        "Debug paytidagi timeout'larni boshqaradi"
      ],
      prerequisites: [
        "42.1"
      ]
    },
    {
      id: "57.15",
      title: "Docker Networking",
      description: [
        "Docker'da Xdebug: konteyner IDE'ga (host'ga) ulanadi — `xdebug.client_host=host.docker.internal` (Docker Desktop'da avtomatik; Linux'da Compose'da `extra_hosts: [\"host.docker.internal:host-gateway\"]`). Port 9003 host'da IDE tinglayapti. Firewall host'da 9003 ga kiruvchi ulanishni bloklamasligi kerak. WSL2'da — IDE Windows'da bo'lsa, WSL tarmoq rejimiga qarab manzil farq qiladi.",
        "",
        "Xdebug'ni faqat dev image/target'da o'rnatish (production image'ga tushmasligi — performance va xavfsizlik).",
        "",
        "```yaml",
        "services:",
        "  app:",
        "    build: { context: ., target: dev }",
        "    environment:",
        "      XDEBUG_MODE: debug",
        "      XDEBUG_CONFIG: client_host=host.docker.internal",
        "      PHP_IDE_CONFIG: serverName=app",
        "    extra_hosts: [\"host.docker.internal:host-gateway\"]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Docker Compose muhitida Xdebug'ni Linux/WSL host bilan ishlaydigan qilib sozlang.",
      acceptanceCriteria: [
        "Konteynerdan host'ga ulanish yo'llarini biladi",
        "Xdebug'ni faqat dev image'da saqlaydi"
      ],
      prerequisites: [
        "37.10"
      ]
    },
    {
      id: "57.16",
      title: "Performance Overhead",
      description: [
        "Xdebug yoqilganda (hatto `debug` rejimida, sessiya bo'lmasa ham) PHP sezilarli sekinlashadi — 2–3x va undan ko'p; `coverage`/`profile`/`trace` rejimlarida yanada ko'proq. Shuning uchun: `xdebug.mode=off` default, faqat kerak bo'lganda (`XDEBUG_MODE` env bilan), `start_with_request=trigger`, test to'plamini Xdebug'siz ishga tushirish (coverage uchun PCOV).",
        "",
        "Lokal muhitda \"ilova sekin\" shikoyatlarining tez-tez uchraydigan sababi — doim yoqilgan Xdebug.",
        "",
        "```bash",
        "XDEBUG_MODE=off php artisan test          # tez",
        "XDEBUG_MODE=debug php artisan test --filter=OneTest   # faqat debug kerak bo'lganda",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Test to'plamini Xdebug off va debug rejimlarida ishga tushirib, vaqt farqini o'lchang.",
      acceptanceCriteria: [
        "Xdebug overhead'ini biladi",
        "Uni faqat kerak bo'lganda yoqadi"
      ],
      prerequisites: [
        "57.1"
      ]
    },
    {
      id: "57.17",
      title: "Production-Safe Configuration",
      description: [
        "Xdebug production'da **o'rnatilmasligi** kerak: performance (sezilarli sekinlashuv), xavfsizlik (step debugging porti orqali masofadan kod bajarish va ma'lumot o'qish xavfi, batafsil xato xabarlari), barqarorlik. Production image'da Xdebug yo'qligini CI'da tekshiring.",
        "",
        "Production'da muqobillar: APM (Sentry Performance, New Relic, Datadog), sampling profiler'lar (Blackfire, Tideways — production uchun mo'ljallangan, past overhead), log'lar va trace'lar. Staging'da debug kerak bo'lsa — faqat trigger, faqat ichki tarmoq/SSH tunnel, vaqtincha.",
        "",
        "```dockerfile",
        "FROM php:8.3-fpm-alpine AS base",
        "# ...",
        "FROM base AS dev",
        "RUN pecl install xdebug && docker-php-ext-enable xdebug",
        "FROM base AS production      # Xdebug yo'q",
        "```",
        "```bash",
        "docker run --rm registry/app:sha php -m | grep -qi xdebug && echo \"XATO: Xdebug production image'da!\" && exit 1 || true",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production image'da Xdebug yo'qligini CI'da tekshiruvchi qadam qo'shing va production profiling uchun muqobil vositani tanlang.",
      acceptanceCriteria: [
        "Xdebug'ning production xavflarini biladi",
        "Production uchun muqobil profiling vositalarini biladi"
      ],
      prerequisites: [
        "57.16"
      ]
    }
  ]
});
