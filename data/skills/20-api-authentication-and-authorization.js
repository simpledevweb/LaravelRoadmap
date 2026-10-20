/* 20 · API Authentication & Authorization
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 20,
  slug: "api-authentication-and-authorization",
  title: "API Authentication & Authorization",
  group: "auth",
  description: "API autentifikatsiyasi va avtorizatsiyasi — tizim xavfsizligining eng muhim chegarasi. OWASP API Security Top 10 ro'yxatining birinchi o'rinlari aynan shu sohaga tegishli (BOLA, broken authentication). Senior dasturchi to'g'ri mexanizmni tanlaydi (session, token, OAuth, JWT), token hayot davrini boshqaradi va har bir obyektga kirishni tekshiradi.",
  subskills: [
    {
      id: "20.1",
      title: "Authentication vs Authorization",
      description: [
        "**Autentifikatsiya** (AuthN) — \"Siz kimsiz?\": shaxsni tasdiqlash (parol, token, sertifikat, MFA). **Avtorizatsiya** (AuthZ) — \"Sizga bunga ruxsat bormi?\": tasdiqlangan shaxsning amal va resursga huquqini tekshirish.",
        "",
        "HTTP'da: autentifikatsiya muvaffaqiyatsiz — `401 Unauthorized` (aslida \"unauthenticated\") + `WWW-Authenticate`; autentifikatsiya bor, ruxsat yo'q — `403 Forbidden` (yoki mavjudlikni yashirish uchun `404`). Laravel'da: guard'lar (`auth:sanctum`) — AuthN; Gate/Policy — AuthZ.",
        "",
        "```php",
        "Route::middleware('auth:sanctum')                // AuthN → 401",
        "    ->put('/posts/{post}', UpdatePost::class)",
        "    ->can('update', 'post');                     // AuthZ → 403",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API'dagi 401 va 403 javoblarini qaytaradigan joylarni ko'rib chiqib, noto'g'ri ishlatilganlarini tuzating.",
      acceptanceCriteria: [
        "AuthN va AuthZ farqini aniq tushuntira oladi",
        "401 va 403 ni to'g'ri qo'llaydi"
      ],
      prerequisites: []
    },
    {
      id: "20.2",
      title: "Session-Based Authentication",
      description: [
        "Session autentifikatsiyasi: login'dan keyin server session yaratadi, brauzerga session ID cookie'si beriladi, har so'rovda server session'dan foydalanuvchini aniqlaydi. Laravel web guard'i shunday ishlaydi.",
        "",
        "Xavfsizlik: cookie `HttpOnly`, `Secure`, `SameSite=Lax/Strict`; login'dan keyin session ID'ni yangilash (`$request->session()->regenerate()` — session fixation'ga qarshi); logout'da `invalidate()`; CSRF himoyasi; session muddati. Ko'p serverli muhitda umumiy session saqlash (Redis). Birinchi tomon web ilovalar uchun eng xavfsiz va sodda variant.",
        "",
        "```php",
        "if (Auth::attempt($credentials, $request->boolean('remember'))) {",
        "    $request->session()->regenerate();",
        "    return redirect()->intended('/dashboard');",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Login/logout oqimini session fixation va CSRF himoyasi bilan yozing va testlang.",
      acceptanceCriteria: [
        "Cookie xavfsizlik atributlarini biladi",
        "Session regenerate zarurligini tushuntira oladi"
      ],
      prerequisites: [
        "51.14"
      ]
    },
    {
      id: "20.3",
      title: "Token-Based Authentication",
      description: [
        "Token autentifikatsiyasi: mijoz har so'rovda token yuboradi (`Authorization: Bearer <token>`), server uni tekshiradi. Turlari: **opaque token** (tasodifiy satr, server DB/kesh'da tekshiradi — Sanctum PAT; bekor qilish oson) va **self-contained** (JWT — imzo bilan tekshiriladi, DB'siz; bekor qilish qiyin).",
        "",
        "Mobil ilovalar, uchinchi tomon integratsiyalari va servislar uchun mos. Muhim: token'ni DB'da hash shaklida saqlash (Sanctum SHA-256), muddat, scope'lar, bekor qilish, faqat HTTPS.",
        "",
        "```php",
        "$token = $user->createToken('ios-app', ['orders:read'], now()->addDays(30))->plainTextToken;",
        "// Mijoz: Authorization: Bearer 12|xYz...",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mobil ilova uchun muddatli va scope'li token chiqaruvchi login endpoint'ini yozing.",
      acceptanceCriteria: [
        "Opaque token va JWT farqini biladi",
        "Token'ni hash'lab saqlash zarurligini tushunadi"
      ],
      prerequisites: [
        "20.1"
      ]
    },
    {
      id: "20.4",
      title: "API Keys",
      description: [
        "API key — ilova yoki integratsiyani (foydalanuvchini emas) identifikatsiya qiluvchi uzoq muddatli maxfiy kalit. Server-server integratsiyalari, webhook'lar va oddiy ommaviy API'lar uchun.",
        "",
        "Xavfsiz dizayn: kalitni faqat yaratilganda bir marta ko'rsatish, DB'da hash saqlash, prefiks bilan (`sk_live_...` — sizib chiqqan kalitni skanerlar topishi va turini aniqlash uchun), scope va IP cheklovlari, aylantirish (rotation) imkoniyati — bir vaqtda ikki faol kalit, oxirgi ishlatilgan vaqtni kuzatish, URL'da emas, header'da yuborish.",
        "",
        "```php",
        "$plain = 'sk_live_'.Str::random(40);",
        "ApiKey::create(['name' => $name, 'prefix' => substr($plain, 0, 12), 'hash' => hash('sha256', $plain)]);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "API key tizimini yarating: prefiks, hash'lab saqlash, oxirgi ishlatilgan vaqt va rotation.",
      acceptanceCriteria: [
        "API key va foydalanuvchi token'i farqini biladi",
        "Kalitni xavfsiz saqlash va aylantirishni biladi"
      ],
      prerequisites: [
        "20.3"
      ]
    },
    {
      id: "20.5",
      title: "Bearer Tokens",
      description: [
        "Bearer token — \"egasi kim bo'lsa, o'sha ishlatadi\": tokenni olgan har kim uni ishlata oladi (pul banknotasi kabi). Shuning uchun: faqat TLS orqali, `Authorization: Bearer` header'da (URL'da emas — log, Referer, brauzer tarixi), qisqa muddat, minimal scope.",
        "",
        "Server javobi: token yo'q yoki noto'g'ri — `401` + `WWW-Authenticate: Bearer error=\"invalid_token\"`. Sender-constrained token'lar (DPoP, mTLS) bearer xavfini kamaytiradi — yuqori xavfsizlik talablari uchun.",
        "",
        "```http",
        "GET /api/v1/me HTTP/1.1",
        "Authorization: Bearer 12|xYzAbC...",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Token URL query'da yuborilayotgan joylarni topib, header'ga ko'chiring va log'larda tokenlar yo'qligini tekshiring.",
      acceptanceCriteria: [
        "Bearer token xavfini tushuntira oladi",
        "Token'ni log va URL'larga tushirmaydi"
      ],
      prerequisites: [
        "20.3"
      ]
    },
    {
      id: "20.6",
      title: "OAuth 2.0 Fundamentals",
      description: [
        "OAuth 2.0 — **delegatsiyalangan avtorizatsiya** freymvorki: foydalanuvchi uchinchi tomon ilovaga o'z parolini bermasdan, cheklangan huquqlar (scope) bilan resurslariga kirish ruxsatini beradi. Rollar: resource owner, client, authorization server, resource server.",
        "",
        "Asosiy flow'lar: authorization code + PKCE (web, mobil, SPA), client credentials (server-server), refresh token. Eskirgan va tavsiya etilmaydigan: implicit va password grant. OAuth autentifikatsiya protokoli emas — identifikatsiya uchun OpenID Connect.",
        "",
        "```text",
        "Client → /authorize (scope, PKCE) → foydalanuvchi rozilik beradi → code",
        "Client → /token (code + verifier) → access_token (+ refresh_token)",
        "Client → API (Bearer access_token)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "OAuth 2.0 rollari va authorization code flow'ini ketma-ketlik diagrammasida chizing.",
      acceptanceCriteria: [
        "OAuth rollarini va asosiy flow'larni biladi",
        "OAuth va autentifikatsiya farqini tushunadi"
      ],
      prerequisites: [
        "oauth-2-0"
      ]
    },
    {
      id: "20.7",
      title: "JWT Fundamentals",
      description: [
        "JWT (JSON Web Token) — imzolangan (JWS) yoki shifrlangan (JWE) token: `header.payload.signature` (base64url). Payload'da claim'lar: `sub`, `iss`, `aud`, `exp`, `iat`, `nbf`, `jti` va maxsus. Server imzoni tekshirib, DB'ga murojaat qilmasdan foydalanuvchini aniqlaydi.",
        "",
        "Afzallik: stateless, servislar o'rtasida tekshirish oson. Kamchilik: muddatidan oldin bekor qilish qiyin, payload shifrlanmagan (faqat imzolangan — maxfiy ma'lumot qo'ymang), token hajmi katta. Laravel'da birinchi tomon ilovalar uchun ko'pincha Sanctum opaque token'lari soddaroq.",
        "",
        "```text",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsImV4cCI6MTcxNzI0MDAwMH0.<imzo>",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "JWT'ni dekodlab claim'larini o'qing va nega payload'ga maxfiy ma'lumot qo'yib bo'lmasligini ko'rsating.",
      acceptanceCriteria: [
        "JWT tuzilmasini biladi",
        "JWT va opaque token o'rtasida asosli tanlaydi"
      ],
      prerequisites: [
        "jwt"
      ]
    },
    {
      id: "20.8",
      title: "Laravel Sanctum",
      description: [
        "Sanctum — Laravel'ning yengil autentifikatsiya paketi, ikki rejim: (1) **SPA** — birinchi tomon frontend uchun cookie session asosida (CSRF bilan), (2) **API token** — personal access token'lar (DB'da hash, abilities, muddat). Mobil ilovalar va oddiy token API'lar uchun ideal.",
        "",
        "Sanctum OAuth server emas — uchinchi tomon ilovalariga ruxsat berish kerak bo'lsa Passport. Konfiguratsiya: `stateful` domenlar, `expiration`, `token_prefix` (sizib chiqqan token'larni skanerlash uchun).",
        "",
        "```php",
        "Route::middleware('auth:sanctum')->get('/user', fn (Request $r) => $r->user());",
        "",
        "$request->user()->currentAccessToken()->delete(); // logout (token)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sanctum'ni SPA va mobil ilova uchun bir vaqtda sozlang va ikkala oqimni testlang.",
      acceptanceCriteria: [
        "Sanctum'ning ikki rejimini farqlaydi",
        "Sanctum va Passport o'rtasida tanlay oladi"
      ],
      prerequisites: [
        "laravel-sanctum"
      ]
    },
    {
      id: "20.9",
      title: "Laravel Passport",
      description: [
        "Passport — Laravel uchun to'liq OAuth 2.0 server (league/oauth2-server asosida): authorization code (+PKCE), client credentials, refresh token, scope'lar, client boshqaruvi, token bekor qilish. JWT formatidagi access token'lar.",
        "",
        "Qachon kerak: uchinchi tomon ilovalari sizning API'ngizga foydalanuvchi nomidan kirishi kerak (\"Login with ...\" provayderi bo'lish), ko'p mijozli ekotizim, standart OAuth talab qilinganda. Faqat o'z SPA va mobil ilovangiz bo'lsa — Sanctum soddaroq. Kalitlarni (`oauth-private.key`) xavfsiz saqlash va aylantirish.",
        "",
        "```php",
        "Passport::tokensCan(['orders:read' => 'Buyurtmalarni ko\\'rish', 'orders:write' => 'Buyurtma yaratish']);",
        "Passport::tokensExpireIn(now()->addMinutes(30));",
        "Passport::refreshTokensExpireIn(now()->addDays(30));",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Passport bilan authorization code + PKCE oqimini sozlab, test client ilova orqali token oling.",
      acceptanceCriteria: [
        "Passport qachon kerakligini asoslay oladi",
        "Passport scope va muddat sozlamalarini biladi"
      ],
      prerequisites: [
        "21.15"
      ]
    },
    {
      id: "20.10",
      title: "Roles va Permissions",
      description: [
        "RBAC: foydalanuvchilarga rollar (admin, manager, operator), rollarga ruxsatlar (`orders.update`, `reports.view`) biriktiriladi; kod rollarni emas, **ruxsatlarni** tekshiradi — rollarni o'zgartirish kodni o'zgartirmaydi. `spatie/laravel-permission` — Laravel'da standart paket (guard'lar, kesh, team'lar).",
        "",
        "Dizayn: ruxsatlar granulyar va nomlash izchil (`resurs.amal`), super-admin `Gate::before` orqali, ruxsatlar keshini invalidatsiya qilish, multi-tenant'da rollar tenant doirasida (teams). Rol ierarxiyasi murakkablashsa — ABAC elementlari qo'shiladi.",
        "",
        "```php",
        "$user->givePermissionTo('orders.update');",
        "$role->syncPermissions(['orders.view', 'orders.update']);",
        "Gate::before(fn (User $u) => $u->hasRole('super-admin') ? true : null);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Uch rolli tizim uchun ruxsatlar matritsasini tuzib, spatie/laravel-permission bilan amalga oshiring.",
      acceptanceCriteria: [
        "Kodda rollarni emas, ruxsatlarni tekshiradi",
        "Ruxsatlar keshini boshqaradi"
      ],
      prerequisites: [
        "2.15"
      ]
    },
    {
      id: "20.11",
      title: "Policies va Gates",
      description: [
        "API kontekstida policy'lar har bir resurs amalini tekshiradi: `viewAny`, `view`, `create`, `update`, `delete` va maxsus amallar (`refund`, `approve`). Controller'da `$this->authorize()`/`Gate::authorize()`, route'da `->can()`, Form Request'da `authorize()`.",
        "",
        "API'ga xos jihatlar: token abilities bilan birlashtirish (`$user->tokenCan('orders:write') && $user->can('update', $order)`), `Response::denyAsNotFound()` bilan resurs mavjudligini yashirish, policy natijalarini resource'larda (`can_edit` flag'lari) frontend'ga qaytarish.",
        "",
        "```php",
        "public function update(User $user, Order $order): Response",
        "{",
        "    if ($order->tenant_id !== $user->tenant_id) {",
        "        return Response::denyAsNotFound();",
        "    }",
        "    return $user->can('orders.update') ? Response::allow() : Response::deny('Ruxsat yo\\'q');",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Resource javobiga foydalanuvchi uchun mavjud amallarni (`abilities`) qaytaring va policy bilan sinxron saqlang.",
      acceptanceCriteria: [
        "Policy'ni token abilities bilan birlashtiradi",
        "`denyAsNotFound` ni o'rinli ishlatadi"
      ],
      prerequisites: [
        "2.15"
      ]
    },
    {
      id: "20.12",
      title: "Resource-Level Authorization",
      description: [
        "Resurs darajasidagi avtorizatsiya — foydalanuvchi resurs **turi** bilan ishlay oladimi: \"buyurtmalarni ko'ra oladimi?\", \"hisobot yarata oladimi?\". Bu RBAC ruxsatlari va `viewAny`/`create` policy metodlari bilan tekshiriladi.",
        "",
        "Muhim nozik joy: `viewAny` ruxsati bo'lishi foydalanuvchi **barcha** yozuvlarni ko'ra oladi degani emas — ro'yxat so'rovi ham foydalanuvchi doirasi bilan filtrlanishi kerak (tenant, bo'lim, egalik). Funksiya darajasidagi tekshiruvlarning yo'qligi (BFLA — Broken Function Level Authorization) — OWASP API Top 10 da.",
        "",
        "```php",
        "public function index(Request $request)",
        "{",
        "    $this->authorize('viewAny', Order::class);",
        "    return OrderResource::collection(",
        "        Order::visibleTo($request->user())->paginate()   // doira bo'yicha filtr",
        "    );",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Admin funksiyalariga oddiy foydalanuvchi token'i bilan kirib bo'lmasligini tekshiruvchi testlar yozing.",
      acceptanceCriteria: [
        "Resurs va obyekt darajasidagi avtorizatsiyani farqlaydi",
        "Ro'yxatlarni doira bo'yicha filtrlaydi"
      ],
      prerequisites: [
        "20.11"
      ]
    },
    {
      id: "20.13",
      title: "Object-Level Authorization",
      description: [
        "Obyekt darajasidagi avtorizatsiya — har bir aniq yozuvga kirishni tekshirish: \"foydalanuvchi **aynan shu** buyurtmani ko'ra oladimi?\". Yo'qligi — **BOLA/IDOR** (OWASP API #1): `/orders/1001` ni `/orders/1002` ga o'zgartirib, boshqaning ma'lumotini olish.",
        "",
        "Himoya: har bir endpoint'da policy (`view`, `update`), scoped route binding (`/users/{user}/orders/{order}` — bola ota doirasida), so'rovlarni foydalanuvchi doirasidan boshlash (`$user->orders()->findOrFail($id)`), tasodifiy bo'lmagan id'lar himoya EMAS (faqat qo'shimcha qatlam). Har endpoint uchun \"boshqa foydalanuvchi resursi\" testi.",
        "",
        "```php",
        "// ❌ IDOR",
        "$order = Order::findOrFail($id);",
        "// ✅ doira bilan",
        "$order = $request->user()->orders()->findOrFail($id);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "API'dagi barcha `{id}` li endpoint'lar uchun boshqa foydalanuvchi resursiga kirishni rad etuvchi testlar yozing.",
      acceptanceCriteria: [
        "IDOR/BOLA'ni tushuntira oladi va kodda taniydi",
        "UUID'ni avtorizatsiya o'rnini bosuvchi deb hisoblamaydi"
      ],
      prerequisites: [
        "51.10"
      ]
    },
    {
      id: "20.14",
      title: "Token Expiration va Revocation",
      description: [
        "Har bir token muddatli bo'lishi kerak: access token — qisqa (daqiqalar–soatlar), refresh/PAT — uzoqroq. Bekor qilish holatlari: logout, parol o'zgarishi (barcha token'lar), qurilmani o'chirish, shubhali faollik, xodim ishdan ketishi.",
        "",
        "Opaque token'lar (Sanctum) — DB'dan o'chirish bilan darhol bekor. JWT — muddat tugaguncha amal qiladi; bekor qilish uchun qisqa muddat + denylist (`jti`) yoki token versiyasi. Foydalanuvchiga faol sessiyalar/qurilmalar ro'yxati va \"hammasidan chiqish\" imkoniyati.",
        "",
        "```php",
        "// config/sanctum.php",
        "'expiration' => 60 * 24 * 30,",
        "",
        "// Parol o'zgarganda",
        "$user->tokens()->delete();",
        "// Muddati o'tganlarni tozalash",
        "Schedule::command('sanctum:prune-expired --hours=24')->daily();",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "\"Faol qurilmalar\" sahifasi va parol o'zgarganda barcha token'larni bekor qilishni amalga oshiring.",
      acceptanceCriteria: [
        "Token muddatlarini turiga qarab belgilaydi",
        "JWT bekor qilish usullarini biladi"
      ],
      prerequisites: [
        "20.3"
      ]
    },
    {
      id: "20.15",
      title: "Refresh Tokens",
      description: [
        "Refresh token — qisqa muddatli access token'ni foydalanuvchi qayta login qilmasdan yangilash uchun uzoq muddatli token. Faqat authorization server'ga yuboriladi, API'ga emas.",
        "",
        "Xavfsizlik: **rotation** — har yangilashda yangi refresh token beriladi, eskisi bekor; eski token qayta ishlatilsa (o'g'irlik belgisi) — butun token oilasi bekor qilinadi (reuse detection). Xavfsiz saqlash (mobil — Keychain/Keystore, brauzer — HttpOnly cookie), qurilmaga bog'lash, mutlaq muddat.",
        "",
        "```text",
        "POST /oauth/token  grant_type=refresh_token&refresh_token=R1",
        "→ access_token=A2, refresh_token=R2   (R1 endi yaroqsiz)",
        "R1 qayta kelsa → R2 ham bekor, foydalanuvchi qayta login qiladi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Refresh token rotation va reuse detection'ni amalga oshiring va o'g'irlik stsenariysini testlang.",
      acceptanceCriteria: [
        "Refresh token rotation maqsadini tushuntira oladi",
        "Reuse detection'ni biladi"
      ],
      prerequisites: [
        "20.14"
      ]
    },
    {
      id: "20.16",
      title: "Scopes",
      description: [
        "Scope (Sanctum'da \"ability\") — token'ga berilgan huquqlar doirasi: `orders:read`, `orders:write`. Foydalanuvchi ruxsati bo'lsa ham, token scope'ida bo'lmagan amal rad etiladi — bu \"eng kam huquq\" tamoyilini token darajasida qo'llaydi (masalan, faqat o'qish uchun integratsiya token'i).",
        "",
        "Yakuniy ruxsat = foydalanuvchi ruxsati ∩ token scope'i. Scope'lar granulyar, lekin juda mayda emas; nomlash izchil (`resurs:amal`); OAuth'da foydalanuvchiga rozilik ekranida tushunarli tavsif.",
        "",
        "```php",
        "$token = $user->createToken('reporting', ['reports:read']);",
        "",
        "Route::get('/reports', ...)->middleware(['auth:sanctum', 'ability:reports:read']);",
        "if (! $request->user()->tokenCan('orders:write')) abort(403);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Faqat o'qish huquqli integratsiya token'ini yarating va yozish endpoint'lari uni rad etishini testlang.",
      acceptanceCriteria: [
        "Scope va foydalanuvchi ruxsatining kesishmasini tushunadi",
        "Scope nomlashni izchil loyihalaydi"
      ],
      prerequisites: [
        "20.8"
      ]
    },
    {
      id: "20.17",
      title: "Least Privilege",
      description: [
        "Eng kam huquq tamoyili — har bir foydalanuvchi, token, servis va jarayon faqat o'z vazifasi uchun zarur minimal huquqqa ega. Buzilish oqibati cheklanadi: o'g'irlangan token yoki buzilgan servis ozgina zarar yetkazadi.",
        "",
        "Qo'llanishi: token scope'lari, rollar granulyar, DB foydalanuvchisiga faqat kerakli huquqlar (ilova DDL qilmasin — migratsiya uchun alohida foydalanuvchi), bulut IAM policy'lari, vaqtinchalik yuqori huquq (just-in-time admin), muntazam huquqlar auditi va keraksizlarini olib tashlash.",
        "",
        "```sql",
        "CREATE USER 'app'@'%' IDENTIFIED BY '...';",
        "GRANT SELECT, INSERT, UPDATE, DELETE ON app.* TO 'app'@'%';   -- DDL yo'q",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilova DB foydalanuvchisi, bulut IAM va API token'lari huquqlarini audit qilib, ortiqchalarini olib tashlang.",
      acceptanceCriteria: [
        "Least privilege'ni turli qatlamlarda qo'llaydi",
        "Huquqlarni muntazam audit qiladi"
      ],
      prerequisites: [
        "51.2"
      ]
    },
    {
      id: "20.18",
      title: "Brute-Force Protection",
      description: [
        "Brute-force va credential stuffing'ga qarshi: login va parol tiklash endpoint'larida rate limiting (email+IP va faqat IP bo'yicha), muvaffaqiyatsiz urinishlardan keyin kechikish yoki vaqtincha bloklash, CAPTCHA (shubhali faollikda), MFA, sizib chiqqan parollarni tekshirish (`Password::uncompromised()`), xato xabarlari bir xil (\"email yoki parol noto'g'ri\" — foydalanuvchi mavjudligini oshkor qilmaslik).",
        "",
        "Laravel: `RateLimiter`, Fortify'da `login` limiter, `throttle` middleware. Monitoring: muvaffaqiyatsiz login'lar soni, IP'lar bo'yicha anomaliyalar.",
        "",
        "```php",
        "'password' => ['required', Password::min(10)->uncompromised()],",
        "",
        "RateLimiter::for('login', fn (Request $r) => [",
        "    Limit::perMinute(5)->by(Str::lower($r->input('email')).'|'.$r->ip()),",
        "    Limit::perHour(100)->by($r->ip()),",
        "]);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Login endpoint'iga ko'p darajali himoya qo'shing va avtomatlashtirilgan hujum stsenariysini testlang.",
      acceptanceCriteria: [
        "Brute-force va credential stuffing farqini biladi",
        "Foydalanuvchi mavjudligini oshkor qilmaydi"
      ],
      prerequisites: [
        "12.13"
      ]
    },
    {
      id: "20.19",
      title: "Rate Limiting",
      description: [
        "Autentifikatsiya kontekstida rate limiting: autentifikatsiya endpoint'lari (login, OTP, parol tiklash — eng qat'iy), autentifikatsiyalangan foydalanuvchi bo'yicha (adolatli taqsimot), API key/client bo'yicha (tarif rejasi), anonim so'rovlar IP bo'yicha.",
        "",
        "OTP/SMS endpoint'lari alohida e'tibor talab qiladi — SMS bombing va xarajat hujumlari: telefon raqam bo'yicha, IP bo'yicha va global limitlar. Limitlar Redis'da (klasterda umumiy), `429` + `Retry-After`.",
        "",
        "```php",
        "RateLimiter::for('otp', fn (Request $r) => [",
        "    Limit::perMinutes(10, 3)->by('phone:'.$r->input('phone')),",
        "    Limit::perHour(20)->by('ip:'.$r->ip()),",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "SMS OTP endpoint'iga telefon, IP va global darajadagi limitlarni qo'shing.",
      acceptanceCriteria: [
        "Autentifikatsiya endpoint'lari uchun maxsus limitlarni qo'llaydi",
        "SMS xarajat hujumlaridan himoyalanadi"
      ],
      prerequisites: [
        "18.15"
      ]
    },
    {
      id: "20.20",
      title: "Secure Token Storage",
      description: [
        "Server tomonida: token'larni faqat hash shaklida saqlash (DB sizib chiqsa ham ishlatib bo'lmaydi), maxfiy kalitlar (JWT imzo kaliti, APP_KEY) secret manager'da, log'larga token tushmasligi.",
        "",
        "Mijoz tomonida: brauzer — `HttpOnly` + `Secure` + `SameSite` cookie (XSS token'ni o'g'irlay olmaydi); `localStorage` XSS'ga zaif. Mobil — iOS Keychain, Android Keystore/EncryptedSharedPreferences. Server-server — secret manager yoki muhit o'zgaruvchilari (git'da emas). Sizib chiqqan token'larni aniqlash uchun prefiks (GitHub secret scanning).",
        "",
        "```php",
        "// Sanctum token'ni SHA-256 hash sifatida saqlaydi:",
        "// personal_access_tokens.token = hash('sha256', $plainTextToken)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilovadagi token va kalitlar saqlanish joylarini audit qiling va xavflilarini (localStorage, log, git) bartaraf eting.",
      acceptanceCriteria: [
        "Mijoz turiga mos saqlash joyini tanlaydi",
        "`localStorage` va HttpOnly cookie xavfini solishtiradi"
      ],
      prerequisites: [
        "51.16"
      ]
    },
    {
      id: "20.21",
      title: "Authentication Testing",
      description: [
        "Autentifikatsiya testlari: muvaffaqiyatli va muvaffaqiyatsiz login, token'siz/noto'g'ri/muddati o'tgan token bilan so'rov (`401`), bekor qilingan token, scope yetishmasligi (`403`), boshqa foydalanuvchi resursi (`403/404`), rate limit (`429`), parol tiklash oqimi, session regenerate.",
        "",
        "Laravel yordamchilari: `actingAs($user)`, `Sanctum::actingAs($user, ['orders:read'])`, `Passport::actingAs()`, `$this->travel()` (muddatni sinash), `assertAuthenticated()`/`assertGuest()`. Har bir himoyalangan route uchun avtomatik \"autentifikatsiyasiz 401\" testi.",
        "",
        "```php",
        "it('rejects expired tokens', function () {",
        "    $token = User::factory()->create()->createToken('t', ['*'], now()->addMinute())->plainTextToken;",
        "    $this->travel(2)->minutes();",
        "    $this->withToken($token)->getJson('/api/v1/me')->assertUnauthorized();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Barcha himoyalangan route'larni avtomatik aylanib, autentifikatsiyasiz 401 qaytarishini tekshiruvchi test yozing.",
      acceptanceCriteria: [
        "Autentifikatsiyaning salbiy holatlarini testlaydi",
        "Laravel auth test yordamchilarini ishlatadi"
      ],
      prerequisites: [
        "29.4"
      ]
    },
    {
      id: "20.22",
      title: "Two-Factor Authentication (2FA), TOTP va WebAuthn / Passkeys",
      description: [
        "Faqat login/parolga tayanish xavfli (parol sizishi, phishing). Ikki faktorli autentifikatsiya (2FA) hisob xavfsizligini keskin oshiradi.",
        "",
        "**TOTP (Time-based One-Time Password)**:",
        "SMS orqali kod yuborish SIM-swap hujumlariga zaif va qimmat. TOTP (RFC 6238 — Google Authenticator, 1Password) server va ilova o'rtasidagi umumiy maxfiy kalit (secret) va joriy vaqt (30 soniyalik oyna) asosida 6 xonali kod yaratadi. Serverda zaxira tiklash kodlari (recovery codes) faqat hash shaklida saqlanadi.",
        "",
        "**WebAuthn va Passkeys (Parolsiz kirish)**:",
        "Zamonaviy standart bo'lib, qurilmaning biometrik vositalari (FaceID, TouchID, Windows Hello) orqali ishlaydi. Ommaviy kalitli kriptografiyaga (public/private key) asoslangan: xususiy kalit foydalanuvchi qurilmasining xavfsiz chipida qoladi, serverga faqat ommaviy kalit uzatiladi. Bu phishing hujumlarini texnik jihatdan imkonsiz qiladi.",
        "",
        "```php",
        "// TOTP tekshirish misoli (pragmarx/google2fa)",
        "$google2fa = new \\PragmaRX\\Google2FA\\Google2FA();",
        "$valid = $google2fa->verifyKey($user->two_factor_secret, $request->input('code'));",
        "",
        "if (!$valid) {",
        "    return response()->json(['error' => 'Noto\\'g\\'ri 2FA kod'], 422);",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Foydalanuvchi hisobiga Google Authenticator orqali 2FA ulash (QR-kod chiqarish, tasdiqlash, recovery kodlar) oqimini to'liq yozing.",
      acceptanceCriteria: [
        "SMS OTP va TOTP xavfsizlik darajasini solishtira oladi",
        "WebAuthn / Passkeys qanday qilib phishingdan 100% himoya qilishini tushuntira oladi",
        "2FA tiklash kodlarini xavfsiz saqlash va bir martalik ishlatish mantiqini biladi"
      ],
      prerequisites: [
        "20.1",
        "51.1"
      ]
    }
  ]
});
