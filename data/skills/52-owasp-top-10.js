/* 52 · OWASP Top 10
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 52,
  slug: "owasp-top-10",
  title: "OWASP Top 10",
  group: "security",
  description: "OWASP Top 10 — web ilovalardagi eng muhim xavfsizlik xavflari ro'yxati, sanoat standarti va xavfsizlik bo'yicha umumiy til. 2025 yilgi tahrirda Broken Access Control yetakchilik qiladi, Software Supply Chain Failures va Mishandling of Exceptional Conditions kabi yangi toifalar qo'shilgan. Senior dasturchi har bir toifani Laravel kontekstida tushunadi va jarayonga (dizayn, review, test) kiritadi.",
  subskills: [
    {
      id: "52.1",
      title: "Broken Access Control",
      description: [
        "Foydalanuvchilar o'z huquqlaridan tashqariga chiqa olishi: IDOR/BOLA, funksiya darajasidagi tekshiruv yo'qligi, rol o'zgartirish (mass assignment, JWT manipulyatsiyasi), CORS noto'g'ri sozlanishi, ro'yxatlarda begona ma'lumot, majburiy browsing (`/admin` ga to'g'ridan-to'g'ri), SSRF ham 2025'da shu toifaga kiritilgan.",
        "",
        "Laravel'da himoya: har endpoint'da policy (`authorize`, `can` middleware), so'rovlarni foydalanuvchi/tenant doirasidan boshlash, scoped binding, `$fillable` + `validated()`, deny by default, avtorizatsiya testlari, 403 hodisalarini loglash va kuzatish.",
        "",
        "```php",
        "Route::middleware('auth')->scopeBindings()->group(function () {",
        "    Route::get('/teams/{team}/projects/{project}', [ProjectController::class, 'show'])->can('view', 'project');",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilovani Broken Access Control bo'yicha audit qiling: barcha endpoint'lar uchun \"begona foydalanuvchi\" testlari yozing.",
      acceptanceCriteria: [
        "Toifaning barcha ko'rinishlarini biladi",
        "Laravel vositalari bilan tizimli himoya qiladi"
      ],
      prerequisites: [
        "51.9"
      ]
    },
    {
      id: "52.2",
      title: "Security Misconfiguration",
      description: [
        "Noto'g'ri konfiguratsiya: `APP_DEBUG=true` production'da, default parollar, keraksiz yoqilgan funksiyalar va portlar (ochiq Redis, phpMyAdmin, Telescope/Horizon himoyasiz), noto'g'ri fayl ruxsatlari (`.env` web orqali ochiq — root `public/` emas), xavfsizlik header'lari yo'q, batafsil xato xabarlari, eskirgan dasturlar, noto'g'ri CORS, ochiq S3 bucket'lar, XML parser'larda XXE.",
        "",
        "Himoya: takrorlanadigan qattiqlashtirilgan konfiguratsiya (IaC, Docker image), muhitlarni avtomatik tekshirish (`php artisan about`, CI'dagi konfiguratsiya testlari), minimal o'rnatish, muntazam audit va skanerlash.",
        "",
        "```php",
        "it('has safe production configuration', function () {",
        "    config(['app.env' => 'production']);",
        "    expect(config('app.debug'))->toBeFalse()",
        "        ->and(config('session.secure'))->toBeTrue();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production konfiguratsiyasi uchun avtomatik tekshiruvlar (debug, cookie, header'lar, ochiq portlar) yozing.",
      acceptanceCriteria: [
        "Tipik konfiguratsiya xatolarini biladi",
        "Konfiguratsiyani avtomatik tekshiradi"
      ],
      prerequisites: [
        "39.10"
      ]
    },
    {
      id: "52.3",
      title: "Software Supply Chain Failures",
      description: [
        "Yetkazib berish zanjiri xavflari (2025'da kengaytirilgan toifa): zaif yoki eskirgan dependency'lar, buzilgan/zararli paketlar (typosquatting, egasi o'zgargan paket, zararli versiya), CI/CD pipeline'ining buzilishi, imzolanmagan artefaktlar, ishonchsiz Docker image'lar, build muhitiga hujum.",
        "",
        "Himoya: lock fayllar va `composer install`, `composer audit`/Dependabot, yangi paketlarni baholash, GitHub Actions'ni SHA bilan qotirish, minimal CI ruxsatlari, image skanerlash va imzolash (cosign), SBOM (Software Bill of Materials — `cyclonedx`), reproducible build'lar, kodni review qilish (shu jumladan CI konfiguratsiyasi).",
        "",
        "```bash",
        "composer audit --locked",
        "composer require --dev cyclonedx/cyclonedx-php-composer && composer CycloneDX:make-sbom --output-file=sbom.json",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyiha uchun SBOM yarating, dependency auditini CI'ga qo'shing va Actions/image'larni qotiring.",
      acceptanceCriteria: [
        "Supply chain hujum vektorlarini biladi",
        "SBOM va pinning bilan himoyalanadi"
      ],
      prerequisites: [
        "43.16",
        "51.20"
      ]
    },
    {
      id: "52.4",
      title: "Cryptographic Failures",
      description: [
        "Kriptografik xatolar — sezgir ma'lumotning himoyasizligi: HTTP orqali uzatish, ochiq matnda saqlash (parollar, karta ma'lumotlari, shaxsiy ma'lumotlar), zaif algoritmlar (MD5, SHA-1, DES, ECB rejimi), zaif yoki kodda qattiq yozilgan kalitlar, tasodifiy bo'lmagan qiymatlar (`rand()` token uchun), sertifikat tekshiruvini o'chirish (`verify => false`).",
        "",
        "Laravel'da: HTTPS hamma joyda, `Hash` (bcrypt/argon2), `Crypt`/`encrypted` cast (AES-256-GCM/CBC + MAC), `Str::random()`/`random_bytes()` (kriptografik tasodifiylik), kalitlar secret manager'da, tashqi HTTP'da sertifikat tekshiruvi yoqiq.",
        "",
        "```php",
        "$token = Str::random(64);                         // ✅ CSPRNG",
        "$code = random_int(100000, 999999);               // ✅ OTP",
        "// ❌ md5(uniqid()), rand(), Http::withoutVerifying()",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Kod bazasida zaif hash, `rand()` asosidagi tokenlar va o'chirilgan TLS tekshiruvlarini toping va tuzating.",
      acceptanceCriteria: [
        "Kriptografik xatolar turlarini biladi",
        "Laravel'ning xavfsiz kriptografik vositalarini ishlatadi"
      ],
      prerequisites: [
        "51.17"
      ]
    },
    {
      id: "52.5",
      title: "Injection",
      description: [
        "Injection — ishonchsiz ma'lumot buyruq yoki so'rov sifatida talqin qilinishi: SQL, NoSQL, OS command (`exec`, `shell_exec`), LDAP, XPath, template injection (Blade'da foydalanuvchi shabloni), header injection (CRLF), XSS ham shu toifada (2021'dan).",
        "",
        "Himoya: parametrlangan API'lar (Eloquent, prepared statements), foydalanuvchi kirishini buyruqqa qo'shmaslik (zarur bo'lsa `escapeshellarg` va `Process` massiv argumentlari), kontekstga mos output encoding, whitelist validatsiya, statik tahlil (taint analysis — Psalm), SAST.",
        "",
        "```php",
        "// ❌ command injection",
        "shell_exec(\"convert {$request->file} out.png\");",
        "// ✅ argumentlar massivi — shell orqali emas",
        "Process::run(['convert', $path, $outPath])->throw();",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Kod bazasida `exec`, `shell_exec`, `system`, raw SQL va `{!! !!}` ishlatilishini topib, injection xavfini bartaraf eting.",
      acceptanceCriteria: [
        "Injection turlarini biladi",
        "Har bir tur uchun to'g'ri himoyani qo'llaydi"
      ],
      prerequisites: [
        "51.5"
      ]
    },
    {
      id: "52.6",
      title: "Insecure Design",
      description: [
        "Xavfsiz bo'lmagan dizayn — kod to'g'ri yozilgan bo'lsa ham, dizaynning o'zida xavfsizlik nazorati yo'q: biznes mantiqdagi teshiklar (kupon cheksiz qo'llanadi, manfiy miqdor bilan \"pul qaytarish\", parolni tiklash savollari), rate limit'siz og'ir funksiyalar, ishonch chegaralari aniqlanmagan, tahdidlar ko'rib chiqilmagan.",
        "",
        "Himoya: tahdid modellashtirish, xavfsiz dizayn pattern'lari, \"abuse case\"lar (foydalanuvchi qanday suiiste'mol qilishi mumkin?), biznes invariantlarini kodda va DB'da majburlash, xavfsizlik talablari user story qabul mezonlarida.",
        "",
        "```php",
        "// Biznes invariant: kupon bir foydalanuvchi uchun bir marta",
        "Schema::table('coupon_redemptions', fn (Blueprint $t) => $t->unique(['coupon_id', 'user_id']));",
        "'quantity' => ['required', 'integer', 'min:1', 'max:100'],   // manfiy miqdor yo'q",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta biznes jarayon (kupon, qaytarish, bonus) uchun abuse case'lar ro'yxatini tuzib, himoyalarni qo'shing.",
      acceptanceCriteria: [
        "Dizayn darajasidagi xavfsizlik xatolarini taniydi",
        "Abuse case va invariantlar bilan dizayn qiladi"
      ],
      prerequisites: [
        "51.21"
      ]
    },
    {
      id: "52.7",
      title: "Authentication Failures",
      description: [
        "Autentifikatsiya xatolari: brute-force va credential stuffing'ga himoya yo'q, zaif parollarga ruxsat, MFA yo'q, xavfsiz bo'lmagan parol tiklash (taxmin qilinadigan token, muddatsiz), session ID URL'da, login'dan keyin session yangilanmaydi, logout'da sessiya bekor qilinmaydi, foydalanuvchi mavjudligini oshkor qiluvchi xabarlar.",
        "",
        "Laravel'da: Fortify/Breeze (sinalgan oqimlar), rate limiting, `Password::uncompromised()`, MFA (Fortify 2FA), parol tiklash token'lari muddatli va bir martalik (default), `session()->regenerate()`, bir xil xato xabarlari.",
        "",
        "```php",
        "Password::defaults(fn () => Password::min(12)->uncompromised());",
        "// config/auth.php → 'passwords.users.expire' => 30, 'throttle' => 60",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Autentifikatsiya oqimlarini (login, ro'yxatdan o'tish, tiklash, MFA) checklist bo'yicha audit qiling.",
      acceptanceCriteria: [
        "Autentifikatsiya zaifliklarini biladi",
        "Laravel'ning sinalgan oqimlaridan foydalanadi"
      ],
      prerequisites: [
        "51.14"
      ]
    },
    {
      id: "52.8",
      title: "Software and Data Integrity Failures",
      description: [
        "Yaxlitlik xatolari — kod va ma'lumot yaxlitligini tekshirmaslik: imzolanmagan yangilanishlar/plaginlar, ishonchsiz manbadan kod yuklash, xavfsiz bo'lmagan deserializatsiya (`unserialize()` foydalanuvchi ma'lumotida — object injection, RCE), webhook'larda imzo tekshirilmasligi, CDN'dan skriptlar SRI'siz, CI/CD orqali o'zgartirilgan artefaktlar.",
        "",
        "Himoya: `unserialize` o'rniga JSON (yoki `allowed_classes => false`), Laravel signed URL'lar (`URL::signedRoute`), webhook HMAC tekshiruvi, Subresource Integrity, artefakt imzolari, qayta deserializatsiya qilinadigan cookie va queue payload'lari Laravel tomonidan shifrlangan/imzolangan.",
        "",
        "```php",
        "$data = json_decode($payload, true, flags: JSON_THROW_ON_ERROR);   // ✅",
        "unserialize($payload, ['allowed_classes' => false]);              // agar zarur bo'lsa",
        "$url = URL::temporarySignedRoute('invoices.download', now()->addMinutes(10), ['invoice' => $id]);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Kod bazasida `unserialize` va imzosiz tashqi ma'lumot qabul qilinadigan joylarni topib himoyalang.",
      acceptanceCriteria: [
        "Deserializatsiya xavfini biladi",
        "Imzolangan URL va SRI'dan foydalanadi"
      ],
      prerequisites: [
        "24.3"
      ]
    },
    {
      id: "52.9",
      title: "Security Logging and Alerting Failures",
      description: [
        "Loglash va ogohlantirish yetishmasligi — hujum sodir bo'ladi, lekin hech kim bilmaydi yoki juda kech biladi (o'rtacha aniqlash vaqti oylar). Muammolar: login, ruxsat rad etilishi, yuqori qiymatli tranzaksiyalar loglanmaydi; log'lar faqat lokal; alert'lar yo'q yoki shovqinli; log'larda sezgir ma'lumot; log'larni o'zgartirish mumkin.",
        "",
        "Himoya: xavfsizlik hodisalari uchun strukturali log, markaziy saqlash (o'zgartirib bo'lmaydigan), alert'lar (ko'p muvaffaqiyatsiz login, 403 portlashi, admin amallari), insident javob rejasi, muntazam log tahlili.",
        "",
        "```php",
        "Log::channel('security')->info('Admin role granted', [",
        "    'actor_id' => $admin->id, 'target_id' => $user->id, 'ip' => request()->ip(),",
        "]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy xavfsizlik hodisalari uchun loglash va 3 ta alert sozlab, hujum simulyatsiyasi bilan sinang.",
      acceptanceCriteria: [
        "Loglash va alert yetishmasligi oqibatlarini biladi",
        "Muhim hodisalar uchun alert sozlaydi"
      ],
      prerequisites: [
        "51.22"
      ]
    },
    {
      id: "52.10",
      title: "Mishandling of Exceptional Conditions",
      description: [
        "2025'da yangi toifa: kutilmagan holatlarni noto'g'ri qayta ishlash — xatolarni yutib yuborish, \"fail open\" (xato bo'lsa ruxsat berish), qisman bajarilgan amallar (tranzaksiyasiz), resurs tugashi holatlari (timeout, xotira), xato xabarlarida ma'lumot sizib chiqishi, mantiqiy xatolar natijasida noto'g'ri holat.",
        "",
        "Himoya: \"fail secure/closed\" (xatoda rad etish), tranzaksiyalar va kompensatsiya, aniq exception turlari va to'g'ri qatlamda ushlash, bo'sh `catch` yo'q, timeout va resurs limitlari, xato holatlarini testlash, umumiy xato javoblari.",
        "",
        "```php",
        "// ❌ fail open",
        "try { $allowed = $this->policyService->check($user, $doc); } catch (Throwable) { $allowed = true; }",
        "// ✅ fail closed",
        "try { $allowed = $this->policyService->check($user, $doc); } catch (Throwable $e) { report($e); $allowed = false; }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kod bazasidagi bo'sh `catch` va \"fail open\" holatlarini topib, xavfsiz qayta ishlashga o'tkazing.",
      acceptanceCriteria: [
        "Fail open va fail closed farqini biladi",
        "Kutilmagan holatlarni xavfsiz qayta ishlaydi"
      ],
      prerequisites: [
        "51.23"
      ]
    },
    {
      id: "52.11",
      title: "OWASP ASVS asoslari",
      description: [
        "ASVS (Application Security Verification Standard) — ilova xavfsizligini tekshirish uchun batafsil talablar to'plami (Top 10 — xavflar ro'yxati, ASVS esa — tekshiriladigan talablar). Uch daraja: **L1** (barcha ilovalar uchun minimal — avtomatik tekshirsa bo'ladi), **L2** (sezgir ma'lumotli ko'p ilovalar uchun tavsiya etiladi), **L3** (kritik ilovalar — moliya, sog'liq).",
        "",
        "Bo'limlar: arxitektura, autentifikatsiya, sessiya, kirish nazorati, validatsiya, kriptografiya, xatolar va loglash, ma'lumotlarni himoya qilish, API, konfiguratsiya va h.k. Talablarni xavfsizlik checklist'i, qabul mezonlari va audit asosi sifatida ishlatish.",
        "",
        "```text",
        "V2.1.1 — Parol kamida 12 belgi (L1)",
        "V3.3.1 — Logout'da sessiya serverda bekor qilinadi (L1)",
        "V4.2.1 — IDOR'ga qarshi himoya (L1)",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Ilovangizni ASVS L1 talablari bo'yicha qisqa audit qilib, mos kelmaganlar ro'yxatini tuzing.",
      acceptanceCriteria: [
        "ASVS va Top 10 farqini biladi",
        "ASVS darajalarini va qo'llanishini tushunadi"
      ],
      prerequisites: [
        "52.1"
      ]
    },
    {
      id: "52.12",
      title: "Risk Assessment",
      description: [
        "Xavfni baholash — topilgan zaifliklar va tahdidlarni ustuvorlashtirish: **ehtimollik** (hujumchi uchun qanchalik oson, ochiq yoki ichki, autentifikatsiya kerakmi) × **ta'sir** (maxfiylik, yaxlitlik, mavjudlik; moliyaviy, huquqiy, obro'). Usullar: OWASP Risk Rating, CVSS (zaifliklar uchun standart ball), oddiy Yuqori/O'rta/Past matritsa.",
        "",
        "Natija — qaysi muammoni avval tuzatish, qaysi xavfni qabul qilish (hujjatlashtirib), qaysi biri uchun vaqtinchalik chora. Xavfsizlik ishlarini biznes tiliga o'girish vositasi.",
        "",
        "```text",
        "Zaiflik: IDOR /api/invoices/{id}",
        "Ehtimollik: Yuqori (autentifikatsiyalangan har kim, oddiy)",
        "Ta'sir: Yuqori (barcha mijozlarning moliyaviy ma'lumoti)",
        "Xavf: KRITIK → 24 soat ichida tuzatish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ilovadagi 5 ta ma'lum xavfsizlik muammosini xavf matritsasi bilan baholab, tuzatish tartibini belgilang.",
      acceptanceCriteria: [
        "Ehtimollik × ta'sir modelini qo'llaydi",
        "CVSS va risk rating'ni biladi"
      ],
      prerequisites: [
        "51.21"
      ]
    },
    {
      id: "52.13",
      title: "Threat Modeling",
      description: [
        "Top 10 kontekstida tahdid modellashtirish — har yangi funksiya yoki arxitektura o'zgarishida: ma'lumot oqimi diagrammasi (DFD — kim, qaysi ma'lumot, qayerdan qayerga), ishonch chegaralari (internet ↔ ilova, ilova ↔ DB, ilova ↔ tashqi API), har chegarada STRIDE va Top 10 toifalari bo'yicha savollar, choralar.",
        "",
        "Yengil format: \"Nima qurayapmiz? Nima noto'g'ri ketishi mumkin? Nima qilamiz? Yaxshi qildikmi?\" (Shostack'ning 4 savoli). Natijalar — xavfsizlik talablari va testlar.",
        "",
        "```text",
        "[Mijoz] --HTTPS--> [API] --SQL--> [DB]",
        "                     |--HTTPS--> [To'lov provayderi]",
        "Chegara: Mijoz↔API — Broken Access Control, Injection, Auth failures",
        "Chegara: API↔Provayder — Supply chain, SSRF, imzo tekshiruvi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "To'lov integratsiyasi uchun DFD chizib, Top 10 bo'yicha tahdidlar va choralarni yozing.",
      acceptanceCriteria: [
        "Ishonch chegaralarini aniqlaydi",
        "Tahdid modelini Top 10 bilan bog'laydi"
      ],
      prerequisites: [
        "51.21"
      ]
    },
    {
      id: "52.14",
      title: "Security Testing",
      description: [
        "Xavfsizlik testlash qatlamlari: **SAST** (statik kod tahlili — Psalm taint, Semgrep, SonarQube), **SCA** (dependency zaifliklari — `composer audit`), **DAST** (ishlayotgan ilovaga hujum — OWASP ZAP, Burp), **secret scanning**, **xavfsizlik unit/feature testlari** (avtorizatsiya, validatsiya, rate limit), **penetratsion test** (mutaxassislar tomonidan, davriy), bug bounty.",
        "",
        "CI'da avtomatik (SAST, SCA, secret scanning, avtorizatsiya testlari) + rejali (DAST staging'ga) + davriy (pentest).",
        "",
        "```yaml",
        "security:",
        "  script:",
        "    - composer audit --locked",
        "    - semgrep --config p/php --config p/owasp-top-ten --error",
        "    - gitleaks detect --redact",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "CI'ga SAST (Semgrep), SCA va secret scanning'ni qo'shing; staging'ga OWASP ZAP baseline skanini rejalashtiring.",
      acceptanceCriteria: [
        "Xavfsizlik testlash turlarini biladi",
        "Ularni CI va jarayonga kiritadi"
      ],
      prerequisites: [
        "43.6"
      ]
    },
    {
      id: "52.15",
      title: "Secure Development Lifecycle",
      description: [
        "SDL — xavfsizlikni dasturiy ta'minot hayot davrining har bosqichiga kiritish (\"shift left\"): **talablar** (xavfsizlik va maxfiylik talablari), **dizayn** (tahdid modellashtirish), **implementatsiya** (xavfsiz kodlash standartlari, review checklist'i), **tekshirish** (SAST/DAST/testlar), **reliz** (konfiguratsiya auditi, sirlar), **ekspluatatsiya** (monitoring, patch'lar, insident javobi).",
        "",
        "Madaniyat: xavfsizlik — hammaning mas'uliyati, jamoada \"security champion\", muntazam o'qitish (OWASP, ichki hodisalar tahlili), aybsiz post-mortem'lar. OWASP SAMM — yetuklikni baholash modeli.",
        "",
        "```text",
        "Talab → Dizayn (threat model) → Kod (review + SAST) → Test (DAST, authz testlar)",
        "     → Reliz (config audit) → Ekspluatatsiya (monitoring, patching, IR)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Jamoangiz jarayoniga SDL elementlarini (threat model, review checklist, xavfsizlik testlari) qo'shish rejasini tuzing.",
      acceptanceCriteria: [
        "SDL bosqichlarini biladi",
        "Xavfsizlikni jarayonning har bosqichiga kiritadi"
      ],
      prerequisites: [
        "52.14",
        "72.5"
      ]
    }
  ]
});
