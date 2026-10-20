/* 23 · Laravel Sanctum
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 23,
  slug: "laravel-sanctum",
  title: "Laravel Sanctum",
  group: "auth",
  description: "Laravel Sanctum — birinchi tomon SPA'lar, mobil ilovalar va oddiy token API'lari uchun yengil autentifikatsiya tizimi. U ikki mexanizmni birlashtiradi: cookie asosidagi session (SPA) va personal access token'lar (mobil/integratsiya). Ko'p Laravel loyihalari uchun Sanctum OAuth'dan ancha sodda va yetarli yechim.",
  subskills: [
    {
      id: "23.1",
      title: "SPA Authentication",
      description: [
        "SPA autentifikatsiyasi — token emas, Laravel'ning odatiy cookie session'i: SPA avval `/sanctum/csrf-cookie` ga so'rov yuborib CSRF cookie oladi, keyin `/login` ga, so'ng API so'rovlari session cookie bilan avtomatik autentifikatsiya qilinadi. Token'ni JavaScript'da saqlash kerak emas — XSS orqali o'g'irlash xavfi yo'q.",
        "",
        "Talablar: SPA va API bir xil yuqori darajadagi domenda (`app.example.uz` va `api.example.uz`), `stateful` domenlar ro'yxati, CORS `supports_credentials`, `SESSION_DOMAIN=.example.uz`, frontend'da `withCredentials: true`.",
        "",
        "```js",
        "await axios.get('/sanctum/csrf-cookie');",
        "await axios.post('/login', { email, password });",
        "const { data } = await axios.get('/api/user');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Vue/React SPA'ni alohida subdomenda Sanctum SPA autentifikatsiyasi bilan ulang.",
      acceptanceCriteria: [
        "SPA autentifikatsiya oqimini qadamma-qadam biladi",
        "Cookie, CORS va domen talablarini sozlay oladi"
      ],
      prerequisites: [
        "20.2"
      ]
    },
    {
      id: "23.2",
      title: "API Token Authentication",
      description: [
        "Personal access token'lar — mobil ilovalar, CLI, uchinchi tomon integratsiyalari uchun. `HasApiTokens` trait'i, `createToken($name, $abilities, $expiresAt)` — `plainTextToken` faqat bir marta qaytariladi; DB'da SHA-256 hash saqlanadi. So'rovlarda `Authorization: Bearer {token}`.",
        "",
        "Token format: `{id}|{random}`; `token_prefix` konfiguratsiyasi (masalan, `myapp_`) sizib chiqqan token'larni GitHub secret scanning kabi vositalar aniqlashiga yordam beradi. Har bir qurilma yoki integratsiya uchun alohida nomlangan token.",
        "",
        "```php",
        "$token = $user->createToken(",
        "    name: $request->device_name,",
        "    abilities: ['orders:read', 'orders:write'],",
        "    expiresAt: now()->addDays(60),",
        ");",
        "return ['token' => $token->plainTextToken];",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mobil ilova uchun login endpoint'ini qurilma nomi, abilities va muddat bilan yozing.",
      acceptanceCriteria: [
        "Token yaratish va qaytarish oqimini biladi",
        "Token DB'da hash sifatida saqlanishini tushunadi"
      ],
      prerequisites: [
        "20.3"
      ]
    },
    {
      id: "23.3",
      title: "Token Creation",
      description: [
        "Token yaratishda qarorlar: nom (qurilma/integratsiya — foydalanuvchi \"faol sessiyalar\"da ko'radi), abilities (minimal), muddat (`expiresAt` yoki global `expiration`), bir foydalanuvchi uchun token'lar sonini cheklash, yaratish hodisasini audit log'ga yozish.",
        "",
        "Login endpoint'i: ma'lumotlarni tekshirish (`Hash::check`, rate limit), muvaffaqiyatsizlikda bir xil xabar, ixtiyoriy MFA, kerak bo'lsa eski token'ni (shu qurilma nomi bilan) o'chirish. Token faqat javobda bir marta — keyin uni tiklab bo'lmaydi.",
        "",
        "```php",
        "public function store(LoginRequest $request): array",
        "{",
        "    $user = User::where('email', $request->email)->first();",
        "    if (! $user || ! Hash::check($request->password, $user->password)) {",
        "        throw ValidationException::withMessages(['email' => __('auth.failed')]);",
        "    }",
        "    $user->tokens()->where('name', $request->device_name)->delete();",
        "    return ['token' => $user->createToken($request->device_name)->plainTextToken];",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Login endpoint'ini rate limit, bir xil xato xabari va qurilma bo'yicha token almashtirish bilan yozing.",
      acceptanceCriteria: [
        "Token yaratishdagi xavfsizlik qarorlarini biladi",
        "Foydalanuvchi mavjudligini oshkor qilmaydi"
      ],
      prerequisites: [
        "23.2"
      ]
    },
    {
      id: "23.4",
      title: "Token Abilities",
      description: [
        "Abilities — token'ga berilgan ruxsatlar (OAuth scope analogi): `createToken('ci', ['deploy:run'])`. Tekshirish: `$request->user()->tokenCan('orders:write')`, middleware `abilities:a,b` (hammasi kerak) va `ability:a,b` (biri yetarli). `['*']` — barcha ruxsatlar (default).",
        "",
        "SPA (cookie) autentifikatsiyasida `tokenCan()` doim `true` qaytaradi — shuning uchun ability tekshiruvi foydalanuvchi ruxsatlarini (policy) almashtirmaydi, faqat qo'shimcha cheklov.",
        "",
        "```php",
        "Route::middleware(['auth:sanctum', 'abilities:orders:read,orders:write'])",
        "    ->post('/orders', StoreOrderController::class);",
        "",
        "Route::middleware(['auth:sanctum', 'ability:reports:read,admin'])",
        "    ->get('/reports', ReportController::class);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Integratsiya token'lari uchun abilities to'plamini loyihalab, middleware bilan himoyalang va testlang.",
      acceptanceCriteria: [
        "`abilities` va `ability` middleware farqini biladi",
        "SPA rejimida `tokenCan` xatti-harakatini tushunadi"
      ],
      prerequisites: [
        "23.2"
      ]
    },
    {
      id: "23.5",
      title: "Token Expiration",
      description: [
        "Muddatlar: global `config('sanctum.expiration')` (daqiqalarda, barcha token'lar uchun) yoki har token uchun `expiresAt`. Default — muddatsiz, bu xavfsizlik nuqtai nazaridan zaif: sizib chiqqan token abadiy ishlaydi.",
        "",
        "Muddati o'tgan token'lar `401` beradi, lekin DB'da qoladi — `sanctum:prune-expired` buyrug'ini scheduler'ga qo'shing. Mobil ilova uchun uzoqroq muddat + qayta login, yoki qisqa muddat + yangilash endpoint'i. `last_used_at` orqali uzoq ishlatilmagan token'larni ham bekor qilish mumkin.",
        "",
        "```php",
        "// config/sanctum.php",
        "'expiration' => 60 * 24 * 30,   // 30 kun",
        "",
        "Schedule::command('sanctum:prune-expired --hours=24')->daily();",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Global va token darajasidagi muddatlarni sozlang, eskilarini tozalash rejasini qo'shing va testlang.",
      acceptanceCriteria: [
        "Muddatsiz token xavfini biladi",
        "Muddati o'tgan token'larni tozalaydi"
      ],
      prerequisites: [
        "20.14"
      ]
    },
    {
      id: "23.6",
      title: "Token Revocation",
      description: [
        "Bekor qilish: joriy token — `$request->user()->currentAccessToken()->delete()` (logout), barcha token'lar — `$user->tokens()->delete()` (parol o'zgarganda, \"hammasidan chiqish\"), muayyan token — `$user->tokens()->where('id', $id)->delete()` (\"faol qurilmalar\" ro'yxatidan).",
        "",
        "Opaque token bo'lgani uchun bekor qilish darhol amal qiladi. Hisob bloklanganda, parol tiklanganda, xavfsizlik hodisasida barcha token'lar bekor qilinishi kerak — buni event listener bilan avtomatlashtiring.",
        "",
        "```php",
        "Event::listen(PasswordReset::class, fn ($e) => $e->user->tokens()->delete());",
        "",
        "public function destroy(Request $request): Response",
        "{",
        "    $request->user()->currentAccessToken()->delete();",
        "    return response()->noContent();",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Logout, \"barcha qurilmalardan chiqish\" va parol tiklanganda avtomatik bekor qilishni amalga oshiring.",
      acceptanceCriteria: [
        "Turli bekor qilish stsenariylarini biladi",
        "Xavfsizlik hodisalarida bekor qilishni avtomatlashtiradi"
      ],
      prerequisites: [
        "23.2"
      ]
    },
    {
      id: "23.7",
      title: "Stateful Domains",
      description: [
        "`config('sanctum.stateful')` — qaysi domenlardan kelgan so'rovlar cookie session bilan (\"stateful\") autentifikatsiya qilinishini belgilaydi. Sanctum `Origin`/`Referer` header'ni ro'yxat bilan solishtiradi: mos kelsa — session + CSRF; aks holda — faqat Bearer token.",
        "",
        "Ro'yxatga aniq domen va portlar (`localhost:5173`, `app.example.uz`) yoziladi, `SANCTUM_STATEFUL_DOMAINS` env orqali. Noto'g'ri sozlash — \"401 Unauthenticated\" yoki \"CSRF token mismatch\"ning eng ko'p sababi.",
        "",
        "```env",
        "SANCTUM_STATEFUL_DOMAINS=app.example.uz,localhost:5173",
        "SESSION_DOMAIN=.example.uz",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Dev (localhost) va production domenlari uchun stateful sozlamalarni to'g'ri yozing va ikkala muhitda sinang.",
      acceptanceCriteria: [
        "Stateful va stateless so'rov farqini tushunadi",
        "Tipik konfiguratsiya xatolarini tuzata oladi"
      ],
      prerequisites: [
        "23.1"
      ]
    },
    {
      id: "23.8",
      title: "CSRF Protection",
      description: [
        "Cookie asosidagi autentifikatsiyada CSRF xavfi bor: boshqa sayt foydalanuvchi brauzeri orqali so'rov yuborsa, cookie avtomatik qo'shiladi. Sanctum SPA uchun: `/sanctum/csrf-cookie` `XSRF-TOKEN` cookie'sini o'rnatadi, axios uni avtomatik `X-XSRF-TOKEN` header'ga qo'yadi, Laravel tekshiradi.",
        "",
        "`SameSite=Lax` cookie qo'shimcha himoya beradi. Bearer token autentifikatsiyasida CSRF yo'q (token avtomatik yuborilmaydi). Holat o'zgartiruvchi so'rovlar hech qachon GET bo'lmasligi kerak.",
        "",
        "```js",
        "axios.defaults.withCredentials = true;",
        "axios.defaults.withXSRFToken = true;",
        "await axios.get('/sanctum/csrf-cookie');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "SPA'da CSRF himoyasini sozlang va token'siz POST so'rov 419 qaytarishini tekshiring.",
      acceptanceCriteria: [
        "CSRF hujumi mexanizmini tushuntira oladi",
        "Sanctum CSRF oqimini sozlay oladi"
      ],
      prerequisites: [
        "51.7"
      ]
    },
    {
      id: "23.9",
      title: "Cookie-Based Authentication",
      description: [
        "Sanctum SPA rejimida autentifikatsiya Laravel session cookie'si orqali. Cookie sozlamalari (`config/session.php`): `secure` (faqat HTTPS), `http_only` (JS o'qiy olmaydi), `same_site` (`lax` — subdomenlar uchun odatda yetarli; turli saytlar orasida `none` + `secure`), `domain` (subdomenlar o'rtasida ulashish uchun `.example.uz`), `lifetime`.",
        "",
        "Afzallik: token JS'da emas — XSS token'ni o'g'irlay olmaydi (lekin XSS baribir foydalanuvchi nomidan so'rov yuborishi mumkin). Kamchilik: CSRF himoyasi va domen cheklovlari kerak.",
        "",
        "```php",
        "// config/session.php",
        "'secure' => env('SESSION_SECURE_COOKIE', true),",
        "'http_only' => true,",
        "'same_site' => 'lax',",
        "'domain' => env('SESSION_DOMAIN', '.example.uz'),",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Session cookie sozlamalarini production uchun audit qiling va har bir atributni asoslang.",
      acceptanceCriteria: [
        "Cookie atributlarining xavfsizlikka ta'sirini biladi",
        "Cookie va token yondashuvining murosasini tushunadi"
      ],
      prerequisites: [
        "23.1"
      ]
    },
    {
      id: "23.10",
      title: "CORS Configuration",
      description: [
        "SPA va API turli origin'da bo'lsa CORS kerak. `config/cors.php`: `paths` (`api/*`, `sanctum/csrf-cookie`, `login`, `logout`), `allowed_origins` (aniq domenlar — cookie bilan `*` ishlamaydi), `supports_credentials => true` (cookie uchun majburiy), `allowed_headers`, `exposed_headers`, `max_age` (preflight keshlash).",
        "",
        "Xato sozlash belgilari: brauzer konsolida CORS xatosi, preflight `OPTIONS` 404/405, cookie yuborilmaydi. CORS xavfsizlik vositasi emas (server tomonida avtorizatsiya baribir kerak) — u faqat brauzerga qaysi origin javobni o'qiy olishini bildiradi.",
        "",
        "```php",
        "return [",
        "    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],",
        "    'allowed_origins' => [env('FRONTEND_URL', 'https://app.example.uz')],",
        "    'supports_credentials' => true,",
        "];",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "SPA uchun CORS'ni minimal ruxsatlar bilan sozlang va preflight so'rovlarini tekshiring.",
      acceptanceCriteria: [
        "Credentials bilan `*` ishlamasligini biladi",
        "CORS himoya vositasi emasligini tushunadi"
      ],
      prerequisites: [
        "50.14"
      ]
    },
    {
      id: "23.11",
      title: "Middleware",
      description: [
        "Sanctum asosiy middleware'lari: `auth:sanctum` (guard — avval session, keyin Bearer token'ni tekshiradi), `EnsureFrontendRequestsAreStateful` (stateful domenlardan kelgan so'rovlarga session va CSRF middleware'larini qo'shadi — Laravel 11+ da `$middleware->statefulApi()`), `abilities`/`ability` (token ruxsatlari).",
        "",
        "Tartib muhim: stateful middleware `api` guruhining boshida bo'lishi kerak. Qo'shimcha: `verified` (email tasdiqlangan), `throttle`, `can` bilan zanjir.",
        "",
        "```php",
        "// bootstrap/app.php",
        "->withMiddleware(function (Middleware $middleware) {",
        "    $middleware->statefulApi();",
        "})",
        "",
        "Route::middleware(['auth:sanctum', 'verified', 'throttle:api'])->group(...);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "API route guruhlarini Sanctum middleware'lari bilan to'g'ri tartibda tashkil qiling.",
      acceptanceCriteria: [
        "Sanctum middleware'larining vazifasini biladi",
        "`statefulApi()` nima qilishini tushunadi"
      ],
      prerequisites: [
        "2.4"
      ]
    },
    {
      id: "23.12",
      title: "Authentication Guards",
      description: [
        "`sanctum` guard'i bir vaqtda ikki manbani tekshiradi: avval `config('sanctum.guard')` (default `web`) orqali session, topilmasa — Bearer token. Shuning uchun bitta route ham SPA, ham mobil ilovaga xizmat qiladi.",
        "",
        "Ko'p foydalanuvchi turlari (admin va mijoz alohida jadvallarda) uchun alohida provider'lar va guard'lar, `HasApiTokens` har bir modelda; token'lar polymorphic (`tokenable`). Guard'ni aniq ko'rsatish: `auth:sanctum` va `Auth::guard('admin')`.",
        "",
        "```php",
        "// config/sanctum.php",
        "'guard' => ['web', 'admin'],",
        "",
        "// Token egasi turi",
        "$request->user() instanceof Admin;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Admin va mijoz modellari uchun alohida guard'lar bilan Sanctum token autentifikatsiyasini sozlang.",
      acceptanceCriteria: [
        "Sanctum guard'ining ikki bosqichli tekshiruvini biladi",
        "Ko'p model uchun token'larni boshqaradi"
      ],
      prerequisites: [
        "23.11"
      ]
    },
    {
      id: "23.13",
      title: "User Token Management",
      description: [
        "Foydalanuvchiga o'z token'larini boshqarish imkoniyati: faol token/qurilmalar ro'yxati (nom, yaratilgan, `last_used_at`, ixtiyoriy IP/qurilma), muayyan token'ni bekor qilish, yangi integratsiya token'i yaratish (abilities tanlash bilan, token faqat bir marta ko'rsatiladi), \"hammasidan chiqish\".",
        "",
        "Admin uchun: foydalanuvchi token'larini ko'rish va bekor qilish, shubhali faollik monitoringi. `PersonalAccessToken` modelini kengaytirish (`Sanctum::usePersonalAccessTokenModel()`) qo'shimcha maydonlar uchun.",
        "",
        "```php",
        "return $request->user()->tokens()",
        "    ->latest('last_used_at')",
        "    ->get(['id', 'name', 'abilities', 'last_used_at', 'created_at']);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "\"Faol qurilmalar\" va \"API token'lar\" sahifalarini (ro'yxat, yaratish, bekor qilish) amalga oshiring.",
      acceptanceCriteria: [
        "Foydalanuvchiga token nazoratini beradi",
        "Token modelini kengaytira oladi"
      ],
      prerequisites: [
        "23.6"
      ]
    },
    {
      id: "23.14",
      title: "Token Abilities va Authorization farqi",
      description: [
        "Token ability — **token** nimaga ruxsat olgan (masalan, integratsiya faqat o'qiy oladi). Avtorizatsiya (policy/gate) — **foydalanuvchi** nimaga haqli. Yakuniy ruxsat ikkalasining kesishmasi: admin foydalanuvchining `orders:read` token'i bilan buyurtmani o'chirib bo'lmaydi; oddiy foydalanuvchining `*` token'i bilan boshqa foydalanuvchi buyurtmasini o'chirib bo'lmaydi.",
        "",
        "Xato: faqat ability'ni tekshirib, policy'ni unutish (IDOR) yoki aksincha. SPA rejimida `tokenCan()` doim true — policy asosiy himoya.",
        "",
        "```php",
        "public function destroy(Request $request, Order $order)",
        "{",
        "    abort_unless($request->user()->tokenCan('orders:delete'), 403);  // token",
        "    $this->authorize('delete', $order);                               // foydalanuvchi",
        "    $order->delete();",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ability va policy tekshiruvlari birga ishlashini tasdiqlovchi 4 ta test yozing (to'rt kombinatsiya).",
      acceptanceCriteria: [
        "Token va foydalanuvchi ruxsatini farqlaydi",
        "Ikkalasini birga tekshiradi"
      ],
      prerequisites: [
        "23.4",
        "2.15"
      ]
    },
    {
      id: "23.15",
      title: "Sanctum Security Configuration",
      description: [
        "Xavfsiz Sanctum checklist: `expiration` o'rnatilgan; `token_prefix` (secret scanning uchun); `stateful` domenlar aniq va minimal; session cookie `secure`, `http_only`, `same_site`; CORS faqat ishonchli origin'lar; login va token endpoint'larida rate limit; token'lar log'larga tushmaydi; parol o'zgarganda token'lar bekor; muddati o'tganlar tozalanadi; abilities minimal.",
        "",
        "Production'da HTTPS majburiy (token'lar ochiq matnda yuboriladi). Sanctum paketini yangilab borish.",
        "",
        "```php",
        "// config/sanctum.php",
        "'expiration' => 60 * 24 * 30,",
        "'token_prefix' => env('SANCTUM_TOKEN_PREFIX', 'myapp_'),",
        "'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'app.example.uz')),",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sanctum konfiguratsiyasini checklist bo'yicha audit qiling va topilgan kamchiliklarni tuzating.",
      acceptanceCriteria: [
        "Sanctum xavfsizlik sozlamalarini biladi",
        "Konfiguratsiyani muntazam audit qiladi"
      ],
      prerequisites: [
        "23.5",
        "23.7"
      ]
    },
    {
      id: "23.16",
      title: "Feature Testing",
      description: [
        "Sanctum testlash yordamchilari: `Sanctum::actingAs($user, ['orders:read'])` — haqiqiy token yaratmasdan autentifikatsiya va abilities; haqiqiy token oqimini sinash uchun `createToken()->plainTextToken` + `withToken()`; SPA oqimi uchun `actingAs($user, 'web')`.",
        "",
        "Test qilinadigan holatlar: autentifikatsiyasiz `401`, ability yetishmasa `403`, muddati o'tgan token, bekor qilingan token, logout, boshqa foydalanuvchi resursi, login rate limit.",
        "",
        "```php",
        "it('forbids writing with a read-only token', function () {",
        "    Sanctum::actingAs(User::factory()->create(), ['orders:read']);",
        "    $this->postJson('/api/orders', [...])->assertForbidden();",
        "});",
        "",
        "it('revokes token on logout', function () {",
        "    $token = User::factory()->create()->createToken('t')->plainTextToken;",
        "    $this->withToken($token)->postJson('/api/logout')->assertNoContent();",
        "    $this->withToken($token)->getJson('/api/user')->assertUnauthorized();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sanctum autentifikatsiyasining barcha asosiy holatlarini qamrab oluvchi test to'plamini yozing.",
      acceptanceCriteria: [
        "`Sanctum::actingAs` va haqiqiy token testlarini farqlaydi",
        "Salbiy holatlarni testlaydi"
      ],
      prerequisites: [
        "20.21"
      ]
    }
  ]
});
