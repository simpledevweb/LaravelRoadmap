/* 51 · Web Application Security
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 51,
  slug: "web-application-security",
  title: "Web Application Security",
  group: "security",
  description: "Web ilovalar xavfsizligi — har bir backend dasturchining mas'uliyati, faqat xavfsizlik jamoasiniki emas. Laravel ko'p himoyani tayyor beradi (CSRF, XSS escaping, prepared statements, parol hash'lash), lekin noto'g'ri ishlatilsa yoki chetlab o'tilsa, zaifliklar paydo bo'ladi. Senior dasturchi asosiy hujum turlarini, ularning oldini olish usullarini biladi va xavfsizlikni dizayn bosqichidan o'ylaydi.",
  subskills: [
    {
      id: "51.1",
      title: "Authentication va Authorization",
      description: [
        "Xavfsizlikning asosiy savollari: kim (autentifikatsiya) va nimaga ruxsat (avtorizatsiya). Autentifikatsiya: kuchli parollar va hash, MFA, brute-force himoyasi, xavfsiz sessiya/token, parolni tiklash oqimi (bir martalik, muddatli token, foydalanuvchi mavjudligini oshkor qilmaslik). Avtorizatsiya: har so'rovda server tomonida, obyekt darajasida, deny by default.",
        "",
        "Laravel: Fortify/Breeze/Jetstream (tayyor autentifikatsiya), Sanctum, policy va gate'lar. Statistikaga ko'ra eng ko'p zaifliklar aynan avtorizatsiya xatolari (Broken Access Control — OWASP #1).",
        "",
        "```php",
        "Route::middleware(['auth:sanctum', 'verified'])->group(function () {",
        "    Route::apiResource('orders', OrderController::class)->middleware('can:viewAny,App\\Models\\Order');",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ilovaning autentifikatsiya va avtorizatsiya oqimlarini audit qilib, eng zaif joylarni aniqlang.",
      acceptanceCriteria: [
        "AuthN va AuthZ xavfsizlik talablarini biladi",
        "Avtorizatsiyani har so'rovda server tomonida tekshiradi"
      ],
      prerequisites: [
        "20.1"
      ]
    },
    {
      id: "51.2",
      title: "Principle of Least Privilege",
      description: [
        "Har bir foydalanuvchi, jarayon, servis va kalit faqat o'z vazifasi uchun zarur minimal huquqqa ega bo'lishi kerak. Buzilish yoki xato yuz berganda zarar cheklanadi.",
        "",
        "Qo'llanish nuqtalari: foydalanuvchi rollari (admin huquqi faqat kerakli odamlarga), API token scope'lari, DB foydalanuvchisi (ilovaga DDL yo'q), fayl tizimi (faqat `storage/` ga yozish), bulut IAM (aniq resurslar va amallar), CI token'lari, servislar o'rtasida (har servis faqat o'z DB'siga). Huquqlarni muntazam qayta ko'rib chiqish va vaqtinchalik yuqori huquqlar (just-in-time).",
        "",
        "```sql",
        "CREATE USER 'app_ro'@'%' IDENTIFIED BY '...';",
        "GRANT SELECT ON app.* TO 'app_ro'@'%';       -- hisobot servisi uchun faqat o'qish",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ilova, DB, bulut va CI darajasidagi huquqlarni least privilege bo'yicha audit qiling.",
      acceptanceCriteria: [
        "Least privilege'ni turli qatlamlarda qo'llaydi",
        "Huquqlarni muntazam qayta ko'rib chiqadi"
      ],
      prerequisites: [
        "20.17"
      ]
    },
    {
      id: "51.3",
      title: "Input Validation",
      description: [
        "Barcha tashqi kirish — ishonchsiz: so'rov parametrlari, header'lar, cookie'lar, fayllar, webhook'lar, hatto ichki servislardan kelgan ma'lumot. Validatsiya: tip, format, uzunlik, diapazon, ruxsat etilgan qiymatlar (whitelist — blacklist'dan ishonchli), biznes qoidalar.",
        "",
        "Laravel: Form Request'lar, `validated()` — faqat tekshirilgan ma'lumot bilan ishlash. Validatsiya injection'ga qarshi asosiy himoya **emas** (u — parametrlash va escaping), lekin hujum yuzasini keskin kamaytiradi. Server tomonidagi validatsiya majburiy — mijoz validatsiyasi faqat UX uchun.",
        "",
        "```php",
        "'sort'   => ['nullable', Rule::in(['name', 'price', 'created_at'])],",
        "'email'  => ['required', 'email:rfc,dns', 'max:255'],",
        "'amount' => ['required', 'integer', 'between:1000,100000000'],",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Barcha endpoint'larda validatsiyasiz qabul qilinayotgan parametrlarni toping va whitelist qoidalar qo'shing.",
      acceptanceCriteria: [
        "Whitelist validatsiyasini qo'llaydi",
        "Validatsiya va injection himoyasi farqini biladi"
      ],
      prerequisites: [
        "2.12"
      ]
    },
    {
      id: "51.4",
      title: "Output Encoding",
      description: [
        "Output encoding — ma'lumotni chiqarish kontekstiga mos ravishda kodlash, shunda u kod sifatida talqin qilinmaydi: HTML (`<` → `&lt;`), HTML atribut, JavaScript, URL, CSS, SQL (parametrlash), shell (`escapeshellarg`). Kontekst muhim — HTML escaping JavaScript ichida yetarli emas.",
        "",
        "Laravel Blade `{{ }}` HTML escaping qiladi; `{!! !!}` — escaping'siz (faqat ishonchli HTML uchun, sanitize qilingan). JS'ga ma'lumot uzatish — `@json` / `Js::from()`. API javoblari JSON — `Content-Type: application/json` bilan.",
        "",
        "```blade",
        "<p>{{ $comment->body }}</p>                    {{-- ✅ escaped --}}",
        "<div>{!! $comment->body !!}</div>              {{-- ❌ XSS --}}",
        "<script>const user = {{ Js::from($user->only('id', 'name')) }};</script>",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Blade shablonlardagi barcha `{!! !!}` va JS kontekstidagi chiqishlarni audit qilib, xavflilarini tuzating.",
      acceptanceCriteria: [
        "Kontekstga mos encoding'ni biladi",
        "Blade escaping va uning istisnolarini tushunadi"
      ],
      prerequisites: [
        "51.6"
      ]
    },
    {
      id: "51.5",
      title: "SQL Injection",
      description: [
        "SQL injection — foydalanuvchi kiritgan ma'lumot SQL kodi sifatida bajarilishi: ma'lumotlarni o'g'irlash, o'zgartirish, autentifikatsiyani chetlab o'tish, hatto server buyruqlari. Himoya: parametrlangan so'rovlar (prepared statements) — Eloquent va query builder buni avtomatik qiladi.",
        "",
        "Xavfli joylar Laravel'da: `whereRaw`/`selectRaw`/`orderByRaw`/`DB::raw` ga string birlashtirish, `DB::statement`/`unprepared`, foydalanuvchi tanlagan ustun yoki jadval nomlari (bog'lab bo'lmaydi — whitelist), JSON path'lari. Qo'shimcha qatlam — DB foydalanuvchisiga minimal huquqlar.",
        "",
        "```php",
        "// ❌",
        "DB::select(\"SELECT * FROM users WHERE email = '{$request->email}'\");",
        "// ✅",
        "DB::select('SELECT * FROM users WHERE email = ?', [$request->email]);",
        "$column = in_array($request->sort, ['name', 'created_at'], true) ? $request->sort : 'id';",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Kod bazasidagi barcha raw SQL'larni grep bilan topib, injection xavfi borlarini tuzating.",
      acceptanceCriteria: [
        "SQL injection mexanizmini tushuntira oladi",
        "Laravel'dagi xavfli raw joylarni biladi"
      ],
      prerequisites: [
        "9.22"
      ]
    },
    {
      id: "51.6",
      title: "Cross-Site Scripting (XSS)",
      description: [
        "XSS — hujumchi skripti boshqa foydalanuvchi brauzerida sizning sayt kontekstida bajariladi: sessiya o'g'irlash, foydalanuvchi nomidan amallar, fishing. Turlari: **stored** (DB'da saqlangan — izoh, profil), **reflected** (URL parametri), **DOM-based** (frontend JS).",
        "",
        "Himoya: output encoding (Blade `{{ }}`), foydalanuvchi HTML'ini sanitize qilish (HTMLPurifier — rich text uchun), `{!! !!}` dan qochish, Content-Security-Policy (qo'shimcha qatlam), `HttpOnly` cookie (sessiyani o'g'irlashni qiyinlashtiradi), frontend framework'larda `v-html`/`dangerouslySetInnerHTML` ehtiyotkorlik bilan.",
        "",
        "```php",
        "// Rich text: faqat ruxsat etilgan teglar",
        "$clean = Purifier::clean($request->input('body'), ['HTML.Allowed' => 'p,b,i,a[href],ul,ol,li']);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Foydalanuvchi kontenti ko'rsatiladigan joylarda stored XSS'ni sinab ko'ring va topilganlarini tuzating.",
      acceptanceCriteria: [
        "XSS turlarini biladi",
        "Escaping, sanitize va CSP qatlamlarini qo'llaydi"
      ],
      prerequisites: [
        "51.4"
      ]
    },
    {
      id: "51.7",
      title: "Cross-Site Request Forgery (CSRF)",
      description: [
        "CSRF — hujumchi sayti foydalanuvchi brauzerini sizning saytingizga (u autentifikatsiyalangan holda) so'rov yuborishga majburlaydi; cookie'lar avtomatik qo'shiladi, server so'rovni haqiqiy deb biladi (pul o'tkazish, email o'zgartirish).",
        "",
        "Himoya: CSRF token (Laravel `VerifyCsrfToken` — barcha holat o'zgartiruvchi web so'rovlarda, Blade `@csrf`), `SameSite=Lax/Strict` cookie, holat o'zgartiruvchi amallar GET bilan emas, muhim amallarda qayta autentifikatsiya. Token asosidagi API'lar (Bearer) CSRF'ga moyil emas; cookie asosidagi SPA (Sanctum) — moyil, XSRF token bilan himoyalanadi.",
        "",
        "```blade",
        "<form method=\"POST\" action=\"/profile/email\">",
        "    @csrf",
        "    @method('PATCH')",
        "    <input name=\"email\">",
        "</form>",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "CSRF istisnolari ro'yxatini (`except`) audit qiling va har bir istisno asosli ekanini tekshiring.",
      acceptanceCriteria: [
        "CSRF hujumi mexanizmini biladi",
        "Token va SameSite himoyasini qo'llaydi"
      ],
      prerequisites: [
        "50.5"
      ]
    },
    {
      id: "51.8",
      title: "Server-Side Request Forgery (SSRF)",
      description: [
        "SSRF — hujumchi serverni o'zi tanlagan manzilga so'rov yuborishga majburlaydi: ichki servislar (`localhost:6379`, admin panellar), bulut metadata (`169.254.169.254` — IAM kalitlari!), ichki tarmoq skanerlash. Manbalar: URL'dan rasm yuklash, webhook URL'lari, PDF generatsiya (HTML'dagi resurslar), URL preview, import funksiyalari.",
        "",
        "Himoya: URL'ni hal qilib IP'ni tekshirish (ichki/rezervlangan diapazonlarni rad etish), DNS rebinding'ga qarshi tekshirilgan IP'ga ulanish, faqat `https`, redirect'larga ergashmaslik, allowlist (iloji bo'lsa), egress firewall/proxy, bulutda IMDSv2.",
        "",
        "```php",
        "$host = parse_url($url, PHP_URL_HOST);",
        "$ip = gethostbyname($host);",
        "abort_if(! filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE), 422);",
        "Http::withOptions(['allow_redirects' => false])->timeout(5)->get($url);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "URL'dan fayl yuklash funksiyasini SSRF'ga qarshi himoyalang va metadata manzili bilan sinang.",
      acceptanceCriteria: [
        "SSRF manbalari va oqibatlarini biladi",
        "Ko'p qatlamli SSRF himoyasini qo'llaydi"
      ],
      prerequisites: [
        "24.19"
      ]
    },
    {
      id: "51.9",
      title: "Broken Access Control",
      description: [
        "Broken Access Control — OWASP #1: foydalanuvchi ruxsatsiz ma'lumot yoki funksiyaga kira oladi. Ko'rinishlari: IDOR (boshqa foydalanuvchi resursi), funksiya darajasida tekshiruv yo'q (oddiy foydalanuvchi admin endpoint'iga), mass assignment orqali rol o'zgartirish, faqat UI'da yashirish, JWT/cookie manipulyatsiyasi, CORS noto'g'ri sozlanishi, ro'yxatlarda filtrsiz ma'lumot.",
        "",
        "Himoya: deny by default, har endpoint'da policy, obyekt darajasida tekshiruv, so'rovlarni foydalanuvchi doirasidan boshlash, avtorizatsiya testlari (har endpoint uchun \"begona foydalanuvchi\" testi), log va monitoring (ko'p 403 — hujum belgisi).",
        "",
        "```php",
        "public function show(Request $request, Invoice $invoice)",
        "{",
        "    $this->authorize('view', $invoice);   // har endpoint'da",
        "    return new InvoiceResource($invoice);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Barcha endpoint'lar uchun avtorizatsiya matritsasini tuzing va yetishmayotgan tekshiruvlarni testlar bilan toping.",
      acceptanceCriteria: [
        "Broken Access Control ko'rinishlarini biladi",
        "Avtorizatsiyani tizimli ta'minlaydi va testlaydi"
      ],
      prerequisites: [
        "2.14"
      ]
    },
    {
      id: "51.10",
      title: "Insecure Direct Object References (IDOR)",
      description: [
        "IDOR — foydalanuvchi identifikatorni o'zgartirib (`/invoices/1001` → `/invoices/1002`) boshqaning resursiga kiradi, chunki server faqat ID bo'yicha qidiradi, egalikni tekshirmaydi. API'larda eng keng tarqalgan zaiflik (BOLA).",
        "",
        "Himoya: so'rovni foydalanuvchi doirasidan boshlash (`$user->invoices()->findOrFail($id)`), policy (`view`), scoped route binding, multi-tenant global scope. UUID/ULID — taxmin qilishni qiyinlashtiradi, lekin **avtorizatsiya o'rnini bosmaydi** (ID'lar log, URL va ulashilgan havolalarda sizib chiqadi).",
        "",
        "```php",
        "// ❌",
        "$invoice = Invoice::findOrFail($id);",
        "// ✅",
        "$invoice = $request->user()->invoices()->findOrFail($id);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API'dagi barcha ID parametrli endpoint'larni IDOR'ga qarshi test qiling va topilganlarini tuzating.",
      acceptanceCriteria: [
        "IDOR'ni kodda va so'rovda taniydi",
        "UUID avtorizatsiya emasligini tushunadi"
      ],
      prerequisites: [
        "20.13"
      ]
    },
    {
      id: "51.11",
      title: "Mass Assignment",
      description: [
        "Mass assignment — foydalanuvchi so'rovga qo'shimcha maydon (`is_admin`, `role`, `balance`, `tenant_id`, `email_verified_at`) qo'shib, ruxsatsiz ustunni o'zgartiradi, chunki kod butun so'rovni modelga beradi (`User::create($request->all())`).",
        "",
        "Himoya: `$request->validated()` / `safe()->only()` (faqat tekshirilgan maydonlar), modelda `$fillable` (whitelist), sezgir maydonlar faqat aniq metodlar orqali (`$user->promoteTo(Role::Admin)`), `Model::preventSilentlyDiscardingAttributes()` (dev'da). Testlar: qo'shimcha maydon yuborilganda o'zgarmasligi.",
        "",
        "```php",
        "// ❌",
        "$user->update($request->all());",
        "// ✅",
        "$user->update($request->safe()->only(['name', 'phone']));",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Barcha `create`/`update`/`fill` chaqiruvlarini audit qilib, mass assignment xavflilarini tuzating va test qo'shing.",
      acceptanceCriteria: [
        "Mass assignment hujumini tushuntira oladi",
        "Ikki qatlamli himoyani qo'llaydi"
      ],
      prerequisites: [
        "13.3"
      ]
    },
    {
      id: "51.12",
      title: "File Upload Security",
      description: [
        "Fayl yuklash xavflari: zararli kod (`.php` yuklab bajarish — RCE), MIME soxtalashtirish, katta fayllar (DoS), path traversal nomi (`../../.env`), zip bomb, XSS SVG'da, zararli PDF/Office, ommaviy kirish (maxfiy hujjat ochiq URL'da).",
        "",
        "Himoya: kengaytma va MIME'ni mazmun bo'yicha whitelist (`mimes:`, `mimetypes:`), hajm limiti, fayl nomini server generatsiya qiladi (`store()` tasodifiy nom), web root'dan tashqarida yoki S3'da saqlash, yuklash papkasida PHP bajarilmasligi (Nginx), maxfiy fayllar uchun temporary URL, rasmlarni qayta kodlash (metadata va yashirin payload'ni tozalash), antivirus (ClamAV) muhim tizimlarda.",
        "",
        "```php",
        "$request->validate(['document' => ['required', 'file', 'mimes:pdf,jpg,png', 'max:10240']]);",
        "$path = $request->file('document')->store(\"documents/{$user->id}\", 's3');   // tasodifiy nom, private",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Fayl yuklash funksiyasini checklist bo'yicha himoyalang va `.php`, soxta MIME va katta fayl bilan sinang.",
      acceptanceCriteria: [
        "Fayl yuklash xavflarini biladi",
        "Ko'p qatlamli himoyani qo'llaydi"
      ],
      prerequisites: [
        "2.22"
      ]
    },
    {
      id: "51.13",
      title: "Path Traversal",
      description: [
        "Path traversal — foydalanuvchi kiritgan yo'l (`../../etc/passwd`, `..%2F..%2F.env`) orqali ruxsat etilgan papkadan tashqaridagi fayllarni o'qish yoki yozish. Manbalar: fayl yuklab olish endpoint'lari (`?file=`), shablon nomlari, arxivdan chiqarish (Zip Slip), fayl nomi bilan saqlash.",
        "",
        "Himoya: foydalanuvchiga yo'l emas, ID bering (DB'dagi yozuv orqali faylni toping); agar nom kerak bo'lsa — `basename()`, whitelist belgilar, `realpath()` bilan natija ruxsat etilgan papka ichida ekanini tekshirish; Laravel Storage disk'lari (root bilan cheklangan).",
        "",
        "```php",
        "$base = realpath(storage_path('app/reports'));",
        "$path = realpath($base.'/'.basename($request->input('file')));",
        "abort_unless($path !== false && str_starts_with($path, $base.DIRECTORY_SEPARATOR), 404);",
        "return response()->download($path);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Fayl yuklab olish endpoint'ini path traversal'ga qarshi himoyalab, `../` va URL-kodlangan variantlar bilan sinang.",
      acceptanceCriteria: [
        "Path traversal hujumini biladi",
        "Yo'l o'rniga ID ishlatish va realpath tekshiruvini qo'llaydi"
      ],
      prerequisites: [
        "51.3"
      ]
    },
    {
      id: "51.14",
      title: "Session Security",
      description: [
        "Sessiya xavfsizligi: session ID tasodifiy va uzun (Laravel ta'minlaydi), cookie `Secure`, `HttpOnly`, `SameSite`; login'dan keyin `regenerate()` (session fixation'ga qarshi), logout'da `invalidate()` + `regenerateToken()`, mutlaq va harakatsizlik muddati, parol o'zgarganda boshqa sessiyalarni bekor qilish (`Auth::logoutOtherDevices()`), session ma'lumotida sezgir narsalar yo'q, ko'p serverda xavfsiz umumiy saqlash.",
        "",
        "Qo'shimcha: muhim amallar uchun qayta parol so'rash (`password.confirm` middleware), shubhali faollikda (IP/qurilma keskin o'zgarishi) qayta autentifikatsiya.",
        "",
        "```php",
        "Route::post('/settings/security', ...)->middleware(['auth', 'password.confirm']);",
        "Auth::logoutOtherDevices($request->input('password'));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Session sozlamalarini audit qiling va parol o'zgarganda boshqa qurilmalardan chiqarishni qo'shing.",
      acceptanceCriteria: [
        "Sessiya xavfsizligi choralarini biladi",
        "Muhim amallar uchun qayta tasdiqlashni qo'llaydi"
      ],
      prerequisites: [
        "50.6"
      ]
    },
    {
      id: "51.15",
      title: "Password Hashing",
      description: [
        "Parollar hech qachon ochiq yoki qaytariladigan shifrda saqlanmaydi — faqat sekin, tuzli (salt) hash: **bcrypt** (Laravel default, `rounds` sozlanadi) yoki **Argon2id** (zamonaviy, xotiraga og'ir — GPU hujumlariga chidamli). MD5, SHA-1, SHA-256 (tuzsiz/tez) — parol uchun yaroqsiz.",
        "",
        "Laravel: `Hash::make()`, `Hash::check()`, `Hash::needsRehash()` (algoritm/parametrlar yangilanganda login paytida qayta hash), model cast `'password' => 'hashed'`. Parol siyosati: minimal uzunlik (10+), sizib chiqqan parollarni tekshirish (`Password::uncompromised()`), murakkablik qoidalaridan ko'ra uzunlik muhimroq.",
        "",
        "```php",
        "protected function casts(): array { return ['password' => 'hashed']; }",
        "",
        "'password' => ['required', 'confirmed', Password::min(10)->uncompromised()],",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Parol hash'lash va parol siyosatini audit qiling; `needsRehash` bilan algoritmni yangilash oqimini qo'shing.",
      acceptanceCriteria: [
        "Parol hash'lash talablarini biladi",
        "Nega tez hash'lar yaroqsiz ekanini tushunadi"
      ],
      prerequisites: [
        "20.18"
      ]
    },
    {
      id: "51.16",
      title: "Secret Management",
      description: [
        "Sirlar: DB parollari, API kalitlari, `APP_KEY`, JWT kalitlari, webhook sirlari, bulut kalitlari. Qoidalar: hech qachon kodda yoki git'da (`.env` ignore; tarixda topilsa — darhol almashtirish), log va xato xabarlarida yo'q, minimal ko'rinish (faqat kerakli servislar), muntazam aylantirish, sizib chiqqanini aniqlash (secret scanning — gitleaks, GitHub push protection).",
        "",
        "Saqlash: secret manager (AWS Secrets Manager, Vault, Doppler), CI secret'lari, Laravel `env:encrypt`, K8s secret'lari (shifrlangan etcd bilan). `APP_KEY` o'zgarsa — shifrlangan ma'lumotlar o'qilmay qoladi (`APP_PREVIOUS_KEYS` bilan aylantirish).",
        "",
        "```bash",
        "gitleaks detect --source . --redact",
        "php artisan env:encrypt --env=production",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Repozitoriy va tarixni gitleaks bilan skanerlang, topilgan sirlarni almashtiring va pre-commit himoyasini qo'shing.",
      acceptanceCriteria: [
        "Sirlarni saqlash va aylantirish usullarini biladi",
        "Sizib chiqqan sirga to'g'ri munosabat bildiradi"
      ],
      prerequisites: [
        "43.9"
      ]
    },
    {
      id: "51.17",
      title: "Encryption at Rest va in Transit",
      description: [
        "**In transit** — tarmoq orqali uzatishda: HTTPS hamma joyda, DB/Redis ulanishlari TLS bilan (ayniqsa tarmoqlar o'rtasida), ichki servislar o'rtasida ham (mTLS — zero trust). **At rest** — saqlashda: disk/DB shifrlash (bulut KMS), backup'lar shifrlangan, S3 server-side encryption, ilova darajasida sezgir maydonlarni shifrlash (Laravel `encrypted` cast — pasport, karta tokeni).",
        "",
        "Ilova darajasidagi shifrlash kalitlari (`APP_KEY`) alohida saqlanishi kerak — DB sizib chiqsa ham ma'lumot himoyalangan qoladi. Shifrlangan ustunlar bo'yicha qidirib bo'lmaydi — kerak bo'lsa blind index (hash).",
        "",
        "```php",
        "protected function casts(): array",
        "{",
        "    return ['passport_number' => 'encrypted', 'medical_notes' => 'encrypted:array'];",
        "}",
        "// qidiruv uchun blind index",
        "$this->passport_hash = hash_hmac('sha256', $passport, config('app.blind_index_key'));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Shaxsiy sezgir maydonlarni `encrypted` cast bilan shifrlang va ular bo'yicha qidiruv uchun blind index qo'shing.",
      acceptanceCriteria: [
        "In transit va at rest shifrlash farqini biladi",
        "Ilova darajasidagi shifrlash cheklovlarini tushunadi"
      ],
      prerequisites: [
        "51.16"
      ]
    },
    {
      id: "51.18",
      title: "Security Headers",
      description: [
        "Xavfsizlik header'lari brauzerga qo'shimcha himoya ko'rsatmalari beradi: HSTS (faqat HTTPS), `Content-Security-Policy` (qaysi manbalardan skript/stil yuklash mumkin — XSS ta'sirini cheklaydi), `X-Content-Type-Options: nosniff`, `X-Frame-Options`/CSP `frame-ancestors` (clickjacking), `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`.",
        "",
        "Laravel'da middleware yoki Nginx orqali; CSP uchun nonce (`Vite::useCspNonce()`) inline skriptlar bilan. CSP'ni avval `Report-Only` rejimida joriy qilib, buzilishlarni yig'ish, keyin majburiy qilish.",
        "",
        "```php",
        "final class SecurityHeaders",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        $response = $next($request);",
        "        $response->headers->set('X-Content-Type-Options', 'nosniff');",
        "        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');",
        "        $response->headers->set('Content-Security-Policy', \"default-src 'self'; script-src 'self' 'nonce-\".Vite::cspNonce().\"'\");",
        "        return $response;",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Xavfsizlik header'lari middleware'ini yozib, CSP'ni Report-Only bilan boshlang va securityheaders.com'da tekshiring.",
      acceptanceCriteria: [
        "Asosiy xavfsizlik header'larini biladi",
        "CSP'ni bosqichma-bosqich joriy qiladi"
      ],
      prerequisites: [
        "41.18"
      ]
    },
    {
      id: "51.19",
      title: "Rate Limiting",
      description: [
        "Xavfsizlik kontekstida rate limiting: brute-force (login, OTP, parol tiklash), credential stuffing, enumeration (foydalanuvchi mavjudligini tekshirish), scraping, resurs tugatish (og'ir endpoint'lar — eksport, qidiruv), SMS/email bombing (xarajat hujumi). Qatlamlar: CDN/WAF, Nginx, Laravel `RateLimiter` (foydalanuvchi, IP, email, telefon kalitlari bilan).",
        "",
        "Limitlardan tashqari: CAPTCHA (shubhali faollikda), progressiv kechikish, hisobni vaqtincha bloklash (ehtiyotkorlik — DoS'ga aylanmasin), anomaliya monitoringi.",
        "",
        "```php",
        "RateLimiter::for('password-reset', fn (Request $r) => [",
        "    Limit::perHour(3)->by('email:'.Str::lower($r->input('email'))),",
        "    Limit::perHour(20)->by('ip:'.$r->ip()),",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Autentifikatsiya va og'ir endpoint'lar uchun ko'p qatlamli rate limit'larni sozlang va hujum stsenariysi bilan sinang.",
      acceptanceCriteria: [
        "Xavfsizlik uchun rate limiting stsenariylarini biladi",
        "Limitlarni qatlamlar bo'yicha qo'llaydi"
      ],
      prerequisites: [
        "20.18"
      ]
    },
    {
      id: "51.20",
      title: "Dependency Vulnerabilities",
      description: [
        "Uchinchi tomon paketlari — kodingizning katta qismi va hujum yo'li (zaif versiyalar, buzilgan paketlar — supply chain). Himoya: `composer audit` va `npm audit` CI'da (kritik zaiflikda build'ni to'xtatish), Dependabot/Renovate avtomatik yangilanishlari, `roave/security-advisories`, lock fayllar, yangi paket qo'shishdan oldin baholash, ishlatilmagan paketlarni olib tashlash, PHP va Laravel versiyalari qo'llab-quvvatlanadigan.",
        "",
        "Zaiflik e'lon qilinganda: ta'sir tahlili (zaif funksiya ishlatiladimi?), SLA bo'yicha yangilash, vaqtinchalik choralar (WAF qoidasi).",
        "",
        "```bash",
        "composer audit --locked --format=summary",
        "npm audit --omit=dev --audit-level=high",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "CI'ga composer va npm auditini qo'shing, kritik zaifliklar uchun SLA va jarayonni hujjatlashtiring.",
      acceptanceCriteria: [
        "Dependency zaifliklarini aniqlash vositalarini biladi",
        "Zaiflik topilganda jarayonni boshqaradi"
      ],
      prerequisites: [
        "7.13"
      ]
    },
    {
      id: "51.21",
      title: "Threat Modeling",
      description: [
        "Tahdid modellashtirish — dizayn bosqichida \"nima noto'g'ri ketishi mumkin?\" savoliga tizimli javob: tizim diagrammasi (ma'lumot oqimlari, ishonch chegaralari), tahdidlarni aniqlash (STRIDE: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege), xavfni baholash (ehtimollik × ta'sir), choralar va qolgan xavfni qabul qilish.",
        "",
        "Yangi funksiyalar (to'lov, fayl yuklash, integratsiya, admin funksiyalari) uchun qisqa tahdid modeli — xavfsizlik muammolarini kod yozilmasdan oldin topadi va eng arzon tuzatiladi.",
        "",
        "```text",
        "Funksiya: webhook qabul qilish",
        "S — soxta provayder        → HMAC imzo",
        "T — payload o'zgartirish   → imzo + timestamp",
        "R — \"biz yubormadik\"       → log va event_id",
        "I — log'da karta ma'lumoti → niqoblash",
        "D — webhook bombardimoni   → rate limit, navbat",
        "E — admin amali chaqirish  → faqat ruxsat etilgan event turlari",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Yangi funksiya uchun STRIDE asosida tahdid modeli tuzing va choralarni backlog'ga qo'shing.",
      acceptanceCriteria: [
        "STRIDE toifalarini biladi",
        "Tahdid modellashtirishni dizayn jarayoniga kiritadi"
      ],
      prerequisites: [
        "52.12"
      ]
    },
    {
      id: "51.22",
      title: "Security Logging",
      description: [
        "Xavfsizlik hodisalarini loglash: muvaffaqiyatli va muvaffaqiyatsiz login'lar, parol/email/MFA o'zgarishlari, ruxsat rad etilishi (403 — ko'p bo'lsa hujum belgisi), admin amallari, token yaratish/bekor qilish, rate limit oshishi, validatsiya anomaliyalari, eksport va ommaviy yuklab olishlar.",
        "",
        "Qoidalar: kim, nima, qachon, qayerdan (IP, user agent), natija; sezgir ma'lumot (parol, token, karta) log'da yo'q; log'lar o'zgartirib bo'lmaydigan joyda (markaziy, append-only), saqlash muddati, alert'lar (masalan, bir IP'dan 50 ta muvaffaqiyatsiz login). Audit log — alohida, biznes uchun ham kerak.",
        "",
        "```php",
        "Event::listen(Failed::class, fn (Failed $e) => Log::channel('security')->warning('Login failed', [",
        "    'email_hash' => hash('sha256', Str::lower($e->credentials['email'] ?? '')),",
        "    'ip' => request()->ip(),",
        "]));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Xavfsizlik hodisalari uchun alohida log kanali, asosiy hodisalar loglanishi va alert'larni sozlang.",
      acceptanceCriteria: [
        "Qaysi hodisalar loglanishi kerakligini biladi",
        "Log'larda sezgir ma'lumot bo'lmasligini ta'minlaydi"
      ],
      prerequisites: [
        "58.7"
      ]
    },
    {
      id: "51.23",
      title: "Secure Error Handling",
      description: [
        "Xato xabarlari hujumchiga ma'lumot bermasligi kerak: production'da `APP_DEBUG=false` (stack trace, `.env` qiymatlari, SQL so'rovlari ko'rinmasin — Ignition debug sahifasi juda xavfli), umumiy xabar + `request_id` foydalanuvchiga, batafsil — faqat log'ga. Autentifikatsiyada bir xil xabar (\"email yoki parol noto'g'ri\") — enumeration'ga qarshi.",
        "",
        "Xatolar \"fail secure\" bo'lishi kerak: avtorizatsiya tekshiruvida exception — rad etish, ruxsat berish emas. Exception'larni yutib yubormaslik (jim xatolar xavfsizlik muammolarini yashiradi).",
        "",
        "```php",
        "// .env (production)",
        "APP_DEBUG=false",
        "APP_ENV=production",
        "",
        "->withExceptions(function (Exceptions $e) {",
        "    $e->render(fn (Throwable $ex, Request $r) => $r->expectsJson() && ! config('app.debug')",
        "        ? response()->json(['message' => 'Serverda xatolik', 'request_id' => $r->header('X-Request-Id')], 500)",
        "        : null);",
        "})",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production konfiguratsiyasida debug ma'lumotlari sizib chiqmasligini tekshiring va xato javoblarini standartlashtiring.",
      acceptanceCriteria: [
        "`APP_DEBUG` xavfini va fail secure tamoyilini biladi",
        "Enumeration'ga qarshi bir xil xabarlarni qo'llaydi"
      ],
      prerequisites: [
        "2.16"
      ]
    }
  ]
});
