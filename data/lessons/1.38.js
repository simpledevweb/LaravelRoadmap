/* Chuqur dars: 1.38. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.38", {
  "lesson": [
    "### SAPI",
    "Server API — PHP'ni tashqi dunyo bilan bog'laydigan qatlam: **CLI**, **PHP-FPM** (FastCGI), **Apache mod_php**, **embed**, shuningdek Swoole/RoadRunner/FrankenPHP (Laravel Octane). SAPI har birining o'z `php.ini` va xatti-harakati bor (`PHP_SAPI`, `php_sapi_name()`).",
    "",
    "### Klassik so'rov hayoti (shared-nothing)",
    "1. Worker so'rovni oladi, **request startup**: superglobal'lar to'ldiriladi.",
    "2. Skript bajariladi (opcode OPcache'dan).",
    "3. **Request shutdown**: `register_shutdown_function`, destructor'lar, xotira tozalanadi.",
    "Global o'zgaruvchilar, static'lar, ochiq ulanishlar (persistent bo'lmasa) keyingi so'rovga o'tmaydi. Shu sabab xatolar lokal bo'ladi va xotira sizishi yashirinadi.",
    "",
    "### Uzoq yashovchi jarayonlar",
    "Octane (Swoole, RoadRunner, FrankenPHP), `queue:work`, `schedule:work`, daemon'lar: ilova bir marta yuklanadi va so'rovlar **bitta jarayon ichida** ishlaydi. Natijada:",
    "- static property va singleton so'rovlar orasida qoladi (foydalanuvchi ma'lumoti aralashishi).",
    "- Container'dagi servis eski holatni ushlab turadi (config, auth, request).",
    "- Xotira to'planadi.",
    "- DB/Redis ulanishlari uzilishi mumkin.",
    "- Kod o'zgarsa qayta ishga tushirish kerak (`queue:restart`, `octane:reload`).",
    "",
    "### Qoida",
    "Servislarni stateless qiling, so'rovga xos holatni request/scoped bog'lamaga bering (`scoped()` binding), static kesh va listener'larni tozalang, Octane `flush`/`tick` hodisalari va `--max-requests`dan foydalaning.",
    "",
    "### Javob va shutdown",
    "`fastcgi_finish_request()` (FPM) javobni yuborib, qolgan ishni fonda bajaradi; Laravel'da `dispatch()->afterResponse()`. Og'ir ish uchun queue.",
    "",
    "### CLI xususiyatlari",
    "`max_execution_time=0`, alohida php.ini, `STDIN/STDOUT`, `$argv`, signal'lar (`pcntl`).",
    "",
    "### SAPI turlari tafsiloti",
    "- **CLI:** terminal; `$argv/$argc`, `STDIN/STDOUT/STDERR`, `php://stdin`; alohida ini; `max_execution_time=0`.",
    "- **PHP-FPM:** FastCGI jarayon menejeri; Nginx/Apache bilan ishlaydi; pool'lar; graceful reload.",
    "- **mod_php (Apache):** PHP Apache jarayoni ichida; thread-safe emas (prefork).",
    "- **CGI/FastCGI:** eskirgan.",
    "- **embed**, **phpdbg**.",
    "- **FrankenPHP, Swoole/OpenSwoole, RoadRunner:** ilovani xotirada ushlab turuvchi serverlar (Laravel Octane).",
    "`php_sapi_name()`/`PHP_SAPI`: kodda muhitga qarab xatti-harakat.",
    "",
    "### Request lifecycle bosqichlari",
    "1. **MINIT** (modul init, jarayon boshlanishida bir marta).",
    "2. **RINIT** (har so'rovda): superglobal'lar, session, output buffer.",
    "3. Skript bajariladi: autoload, framework boot, routing, middleware, controller.",
    "4. **RSHUTDOWN**: shutdown funksiyalar, destructor'lar, buferni tozalash, sessiya yozish.",
    "5. **MSHUTDOWN** (jarayon tugaganda).",
    "Laravel so'rovi: `public/index.php` → autoload → `bootstrap/app.php` → Kernel → providers (register/boot) → middleware → controller → response → `terminate`.",
    "",
    "### Shared-nothing afzalliklari va narxi",
    "Afzallik: xotira so'rov bilan tozalanadi, holat so'rovlar orasida aralashmaydi, deploy oson. Narx: har so'rovda framework boot (Laravel ~ 10–40 ms), ulanishlar qayta ochiladi (DB), kesh holati yo'q → Octane/Swoole bu narxni kamaytiradi, lekin xavfsizlik mas'uliyatini dasturchiga beradi.",
    "",
    "### Octane xavfsiz kodlash qoidalari",
    "1. Singleton ichiga `Request`, `Auth`, `Session`, `config` snapshot'ini yozmang; `Container::getInstance()` o'rniga closure/resolve.",
    "2. Static property va global state'dan qoching; `static` o'zgaruvchilar saqlanib qoladi.",
    "3. Request-specific servislar uchun `scoped()` binding.",
    "4. Memory leak'lar to'planadi: `--max-requests`, `Octane::tick`, `flush` hodisalari.",
    "5. Fayl handle va DB ulanishlari: qayta ulanish mantig'i.",
    "6. Kod o'zgarsa worker qayta ishga tushishi kerak (`octane:reload`, `--watch`).",
    "7. `exit`/`die` worker'ni o'ldiradi.",
    "",
    "### Queue worker va daemon",
    "`queue:work` kodni bir marta yuklaydi: deployda `queue:restart`; xotira limiti; job ichida static holat; exception'dan keyin ulanishlarni tiklash (`DB::reconnect`); `Queue::after/failing`. `schedule:work` har daqiqada.",
    "",
    "### Shutdown va tozalash",
    "`register_shutdown_function`, `ignore_user_abort`, `connection_status`, `fastcgi_finish_request()`, Laravel `defer()`, `dispatch()->afterResponse()`, `terminate` middleware: javobdan keyin ish."
  ],
  "examples": [
    {
      "title": "Static holat tuzog'i",
      "lang": "php",
      "code": [
        "final class CurrentTenant",
        "{",
        "    private static ?int $id = null;               // FPM da xavfsiz, Octane da xavfli",
        "    public static function set(int $id): void { self::$id = $id; }",
        "    public static function id(): ?int { return self::$id; }",
        "}",
        "// 1-so'rov tenant=5; 2-so'rov set() chaqirilmasa ham id() 5 qaytaradi!"
      ]
    },
    {
      "title": "Scoped binding (Laravel)",
      "lang": "php",
      "code": [
        "// AppServiceProvider",
        "$this->app->scoped(TenantContext::class, fn () => new TenantContext());",
        "// scoped: har so'rovda yangi nusxa, singleton: butun jarayon uchun bitta"
      ]
    },
    {
      "title": "Shutdown va javobdan keyin",
      "lang": "php",
      "code": [
        "register_shutdown_function(function () {",
        "    $e = error_get_last();",
        "    if ($e && in_array($e['type'], [E_ERROR, E_PARSE], true)) { error_log($e['message']); }",
        "});",
        "",
        "if (function_exists('fastcgi_finish_request')) {",
        "    echo json_encode(['ok' => true]);",
        "    fastcgi_finish_request();",
        "    sendAnalytics();                // foydalanuvchi kutmaydi",
        "}"
      ]
    },
    {
      "title": "Octane tick va flush",
      "lang": "php",
      "code": [
        "// Octane (Swoole): har 60 soniyada fon vazifasi",
        "Octane::tick('refresh-cache', fn () => Cache::forget('heavy'))->seconds(60);",
        "",
        "// request-specific servis: har so'rovda yangi nusxa",
        "$this->app->scoped(TenantContext::class);"
      ]
    },
    {
      "title": "Tekshirish",
      "lang": "bash",
      "code": [
        "php artisan octane:start --workers=4 --max-requests=500 --watch",
        "php artisan queue:work --max-jobs=500 --memory=128",
        "php artisan queue:restart       # deploydan keyin"
      ]
    }
  ],
  "pitfalls": [
    "Octane/worker'da `static` va singleton'ga foydalanuvchi yoki tenant ma'lumotini yozish ma'lumot sizishiga olib keladi.",
    "Singleton ichiga `Request` yoki `Auth` ni konstruktor orqali olish eski so'rovni ushlab qoladi.",
    "Worker kodni bir marta yuklaydi: deploydan keyin `queue:restart` / `octane:reload` qilmasangiz eski kod ishlayveradi.",
    "Persistent ulanishlar uzilishi mumkin: uzoq jarayonda qayta ulanish mantig'i kerak.",
    "Octane'da `static` va singleton'da request ma'lumoti saqlash — foydalanuvchilar o'rtasida sizish.",
    "Worker xotirasi to'planadi: `--max-requests` va monitoring.",
    "`exit/die` Octane worker'ni to'xtatadi.",
    "Deploydan keyin worker restart qilinmasa eski kod ishlaydi."
  ]
});
