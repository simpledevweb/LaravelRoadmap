/* 21 · OAuth 2.0
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 21,
  slug: "oauth-2-0",
  title: "OAuth 2.0",
  group: "auth",
  description: "OAuth 2.0 (RFC 6749) — delegatsiyalangan avtorizatsiya standarti: foydalanuvchi uchinchi tomon ilovaga parolini bermasdan cheklangan ruxsat beradi. \"Google bilan kirish\", ochiq bank API'lari, korporativ SSO — barchasi OAuth/OIDC asosida. Senior dasturchi flow'larni, xavfsizlik nozikliklarini (PKCE, state, redirect URI) va OAuth qachon kerak emasligini biladi.",
  subskills: [
    {
      id: "21.1",
      title: "Roles: Resource Owner, Client, Authorization Server, Resource Server",
      description: [
        "- **Resource owner** — resurs egasi, odatda foydalanuvchi; ruxsat beradi.",
        "- **Client** — resursga kirmoqchi bo'lgan ilova (web, mobil, server). **Confidential** (sirni saqlay oladi — backend) va **public** (saqlay olmaydi — SPA, mobil).",
        "- **Authorization server** — foydalanuvchini autentifikatsiya qiladi, rozilik oladi, token chiqaradi (Passport, Keycloak, Auth0, Google).",
        "- **Resource server** — himoyalangan API; access token'ni tekshiradi.",
        "",
        "Laravel'da Passport authorization server, API esa resource server vazifasini bajaradi; ular bitta ilovada yoki alohida bo'lishi mumkin.",
        "",
        "```text",
        "[Foydalanuvchi] --rozilik--> [Auth server] --token--> [Client] --Bearer--> [Resource server]",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "O'z tizimingizdagi har bir komponentni OAuth rollariga moslab, client turlarini (confidential/public) aniqlang.",
      acceptanceCriteria: [
        "To'rt rolni va ular orasidagi oqimni biladi",
        "Confidential va public client farqini tushuntira oladi"
      ],
      prerequisites: [
        "20.6"
      ]
    },
    {
      id: "21.2",
      title: "Authorization Code Flow",
      description: [
        "Eng keng tarqalgan va xavfsiz flow: (1) client foydalanuvchini `/authorize` ga yo'naltiradi (`client_id`, `redirect_uri`, `scope`, `state`, PKCE `code_challenge`); (2) foydalanuvchi login qilib, rozilik beradi; (3) server `redirect_uri` ga qisqa muddatli bir martalik `code` bilan qaytaradi; (4) client backend kanal orqali `code` ni `/token` da access (va refresh) token'ga almashtiradi.",
        "",
        "Token brauzer URL'ida hech qachon ko'rinmaydi — faqat `code`. Barcha client turlari uchun PKCE bilan tavsiya etiladi (OAuth 2.1).",
        "",
        "```http",
        "GET /oauth/authorize?response_type=code&client_id=7&redirect_uri=https://app.uz/cb",
        "    &scope=orders:read&state=xyz&code_challenge=E9Melhoa...&code_challenge_method=S256",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Authorization code flow'ni Passport bilan qadamma-qadam bajaring va har bir so'rov/javobni hujjatlashtiring.",
      acceptanceCriteria: [
        "Flow bosqichlarini va har bir parametr vazifasini biladi",
        "Nima uchun token emas, code qaytarilishini tushuntira oladi"
      ],
      prerequisites: [
        "21.1"
      ]
    },
    {
      id: "21.3",
      title: "PKCE",
      description: [
        "PKCE (Proof Key for Code Exchange, RFC 7636) — authorization code'ni ushlab qolish hujumidan himoya. Client tasodifiy `code_verifier` yaratadi, uning SHA-256 hash'ini (`code_challenge`) `/authorize` ga yuboradi; `/token` da asl `code_verifier` ni ko'rsatadi. Code'ni o'g'irlagan hujumchi verifier'ni bilmagani uchun token ololmaydi.",
        "",
        "Dastlab public client'lar (mobil, SPA) uchun yaratilgan, endi barcha client'lar uchun majburiy tavsiya (OAuth 2.1). Faqat `S256` metodi (`plain` — yo'q).",
        "",
        "```php",
        "$verifier  = Str::random(64);",
        "$challenge = rtrim(strtr(base64_encode(hash('sha256', $verifier, true)), '+/', '-_'), '=');",
        "session(['pkce_verifier' => $verifier]);",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Mobil client simulyatsiyasi uchun PKCE bilan to'liq authorization code oqimini yozing.",
      acceptanceCriteria: [
        "PKCE qaysi hujumdan himoya qilishini tushuntira oladi",
        "`S256` challenge'ni to'g'ri hisoblay oladi"
      ],
      prerequisites: [
        "21.2"
      ]
    },
    {
      id: "21.4",
      title: "Client Credentials Flow",
      description: [
        "Client credentials — foydalanuvchisiz, server-server (machine-to-machine) kirish: client o'z `client_id` va `client_secret` (yoki mTLS/private key JWT) bilan to'g'ridan-to'g'ri `/token` dan access token oladi. Token client nomidan, foydalanuvchi kontekstisiz.",
        "",
        "Qo'llanishi: mikroservislar, cron/integratsiya jarayonlari, ichki API'lar. Refresh token odatda berilmaydi — muddat tugasa qayta so'raladi. Token'ni keshlash (muddatidan biroz oldin yangilash) har so'rovda token olishdan qochish uchun. Passport: `client` middleware.",
        "",
        "```php",
        "$token = Cache::remember('billing-api-token', 3300, fn () => Http::asForm()",
        "    ->post('https://auth.example.uz/oauth/token', [",
        "        'grant_type' => 'client_credentials', 'client_id' => $id, 'client_secret' => $secret, 'scope' => 'invoices:write',",
        "    ])->json('access_token'));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ichki servis uchun client credentials token'ini keshlab ishlatuvchi HTTP client yozing.",
      acceptanceCriteria: [
        "Client credentials qachon ishlatilishini biladi",
        "Token'ni keshlash va yangilashni to'g'ri qiladi"
      ],
      prerequisites: [
        "21.1"
      ]
    },
    {
      id: "21.5",
      title: "Refresh Tokens",
      description: [
        "OAuth refresh token — access token muddati tugaganda foydalanuvchi ishtirokisiz yangisini olish uchun: `grant_type=refresh_token`. Faqat authorization server'ga yuboriladi, resource server'ga emas; `offline_access` scope bilan so'ralishi mumkin (OIDC).",
        "",
        "Xavfsizlik: public client'lar uchun rotation + reuse detection majburiy (OAuth 2.1), mutlaq muddat (masalan, 30–90 kun), foydalanuvchi parolini o'zgartirganda yoki ruxsatni bekor qilganda barcha refresh token'lar bekor, xavfsiz saqlash.",
        "",
        "```http",
        "POST /oauth/token",
        "grant_type=refresh_token&refresh_token=def502...&client_id=7&scope=orders:read",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Passport'da refresh token muddati va rotation'ni sozlab, eski refresh token qayta ishlatilganda nima bo'lishini testlang.",
      acceptanceCriteria: [
        "Refresh token faqat auth server'ga yuborilishini biladi",
        "Rotation va mutlaq muddatni sozlaydi"
      ],
      prerequisites: [
        "20.15"
      ]
    },
    {
      id: "21.6",
      title: "Access Token Lifetimes",
      description: [
        "Access token muddati — xavfsizlik va qulaylik murosasi: qisqa (5–60 daqiqa) — o'g'irlangan token kam vaqt ishlaydi va JWT'ni bekor qilish muammosi kamayadi; uzoq — kamroq yangilash so'rovi. Refresh token mexanizmi qisqa muddatni foydalanuvchiga sezdirmaydi.",
        "",
        "Omillar: token turi (JWT — qisqaroq, opaque — introspection bilan uzoqroq bo'lishi mumkin), xavf darajasi (moliyaviy — qisqa), client turi. Soatlar sinxronizatsiyasi (clock skew) uchun kichik tolerantlik (`leeway`).",
        "",
        "```php",
        "Passport::tokensExpireIn(now()->addMinutes(15));",
        "Passport::refreshTokensExpireIn(now()->addDays(30));",
        "Passport::personalAccessTokensExpireIn(now()->addMonths(6));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tizimdagi har bir token turi uchun muddatlarni xavf darajasiga qarab asoslab, sozlang.",
      acceptanceCriteria: [
        "Muddat tanlashdagi murosani tushuntira oladi",
        "Clock skew'ni hisobga oladi"
      ],
      prerequisites: [
        "21.5"
      ]
    },
    {
      id: "21.7",
      title: "Scopes",
      description: [
        "OAuth scope'lari — client so'ragan va foydalanuvchi rozilik bergan huquqlar doirasi. Authorization server berilgan scope'larni token'ga yozadi, resource server har endpoint'da tekshiradi. Foydalanuvchi so'ralgandan kamroq scope'ga rozi bo'lishi mumkin — javobdagi `scope` ni tekshiring.",
        "",
        "Dizayn: tushunarli nomlar (rozilik ekranida ko'rinadi), minimal kerakli scope'ni so'rash, o'qish va yozishni ajratish, xavfli scope'lar uchun qo'shimcha tasdiq. Passport: `Passport::tokensCan()`, `scopes`/`scope` middleware.",
        "",
        "```php",
        "Route::get('/orders', ...)->middleware(['auth:api', 'scopes:orders:read']);   // hammasi kerak",
        "Route::get('/profile', ...)->middleware(['auth:api', 'scope:profile,profile:read']); // biri yetarli",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Uchinchi tomon ilovasi uchun scope'lar ro'yxatini loyihalab, rozilik ekranidagi tavsiflarini yozing.",
      acceptanceCriteria: [
        "Scope'larni minimal va tushunarli qilib loyihalaydi",
        "`scopes` va `scope` middleware farqini biladi"
      ],
      prerequisites: [
        "20.16"
      ]
    },
    {
      id: "21.8",
      title: "Consent",
      description: [
        "Rozilik (consent) ekrani foydalanuvchiga qaysi ilova qanday huquqlarni so'rayotganini ko'rsatadi va qaror qabul qilish imkonini beradi. Bu OAuth'ning \"delegatsiya\" mohiyati: foydalanuvchi nazoratda.",
        "",
        "Dizayn: ilova nomi va logotipi, har scope'ning inson tilidagi tavsifi, rad etish imkoniyati, birinchi tomon ilovalar uchun rozilikni o'tkazib yuborish (Passport'da `skipsAuthorization()`), berilgan ruxsatlarni ko'rish va bekor qilish sahifasi (\"Ulangan ilovalar\"). Phishing'ga qarshi: client'larni tekshirish va tasdiqlash jarayoni.",
        "",
        "```php",
        "// Birinchi tomon client uchun rozilik ekranini o'tkazib yuborish",
        "public function skipsAuthorization(): bool",
        "{",
        "    return $this->firstParty();",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Rozilik ekranini va foydalanuvchining \"ulangan ilovalar\" (ruxsatlarni bekor qilish) sahifasini yarating.",
      acceptanceCriteria: [
        "Rozilik ekranining xavfsizlik va UX rolini tushunadi",
        "Foydalanuvchiga ruxsatni bekor qilish imkonini beradi"
      ],
      prerequisites: [
        "21.7"
      ]
    },
    {
      id: "21.9",
      title: "Token Revocation",
      description: [
        "Token bekor qilish (RFC 7009) — client `/revoke` endpoint'iga token yuborib, uni bekor qiladi (logout, ilova o'chirilishi). Refresh token bekor qilinsa — u bilan bog'liq access token'lar ham bekor qilinishi kerak.",
        "",
        "Opaque token'lar darhol bekor bo'ladi (server holatni tekshiradi). JWT access token'lar muddati tugaguncha ishlashi mumkin — qisqa muddat yoki denylist. Foydalanuvchi parolini o'zgartirganda, hisobni bloklaganda yoki ilovaga ruxsatni bekor qilganda — barcha tegishli token'lar bekor qilinadi.",
        "",
        "```php",
        "// Passport: foydalanuvchining client uchun barcha token'larini bekor qilish",
        "$user->tokens()->where('client_id', $clientId)->each(function ($token) {",
        "    $token->revoke();",
        "    $token->refreshToken?->revoke();",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "\"Ilovaga ruxsatni bekor qilish\" funksiyasini barcha access va refresh token'lar bekor bo'ladigan qilib yozing.",
      acceptanceCriteria: [
        "Opaque va JWT bekor qilish farqini biladi",
        "Bekor qilinishi kerak bo'lgan hodisalarni sanay oladi"
      ],
      prerequisites: [
        "20.14"
      ]
    },
    {
      id: "21.10",
      title: "Token Introspection",
      description: [
        "Token introspection (RFC 7662) — resource server opaque token'ning holatini authorization server'dan so'raydi: `POST /introspect` → `{active: true, sub, scope, exp, client_id}`. Bu opaque token'larni alohida resource server'larda tekshirish imkonini beradi va bekor qilish darhol ta'sir qiladi.",
        "",
        "Narxi: har so'rovda tarmoq chaqiruvi — natijani qisqa muddat keshlash (lekin bu bekor qilish kechikishini oshiradi). JWT'da introspection kerak emas (lokal tekshirish), lekin bekor qilish holatini bilish uchun ishlatilishi mumkin. Introspection endpoint'i himoyalangan bo'lishi kerak.",
        "",
        "```http",
        "POST /oauth/introspect",
        "Authorization: Basic base64(resource_server_id:secret)",
        "",
        "token=2YotnFZFEjr1zCsicMWpAA",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Resource server uchun introspection asosidagi token tekshiruvchi middleware'ni qisqa keshlash bilan yozing.",
      acceptanceCriteria: [
        "Introspection qachon kerakligini biladi",
        "Keshlash va bekor qilish kechikishi murosasini tushunadi"
      ],
      prerequisites: [
        "21.9"
      ]
    },
    {
      id: "21.11",
      title: "Redirect URI Validation",
      description: [
        "Authorization server `redirect_uri` ni client uchun oldindan ro'yxatdan o'tkazilgan qiymatga **aniq** (exact match) solishtirishi kerak. Zaif tekshiruv (prefiks, wildcard, subdomen) — hujumchi code yoki token'ni o'z serveriga yo'naltiradi (open redirect + code theft).",
        "",
        "Qoidalar: faqat HTTPS (lokal ishlab chiqish istisno), aniq moslik, parametr manipulyatsiyasiga yo'l qo'ymaslik, mobil uchun claimed HTTPS link'lar yoki maxsus scheme'lar ehtiyotkorlik bilan, `/token` so'rovida ham bir xil `redirect_uri`. Client ro'yxatdan o'tishida URI'larni tekshirish.",
        "",
        "```text",
        "Ro'yxatda: https://app.example.uz/oauth/callback",
        "✅ https://app.example.uz/oauth/callback",
        "❌ https://app.example.uz/oauth/callback/../../evil",
        "❌ https://app.example.uz.evil.com/oauth/callback",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Redirect URI tekshiruvini aldashga urinib ko'ruvchi xavfsizlik testlarini yozing (prefiks, path traversal, subdomen).",
      acceptanceCriteria: [
        "Aniq moslik talabini va sababini tushuntira oladi",
        "Redirect URI hujumlarini biladi"
      ],
      prerequisites: [
        "21.2"
      ]
    },
    {
      id: "21.12",
      title: "State Parameter",
      description: [
        "`state` — client yaratadigan tasodifiy, taxmin qilib bo'lmaydigan qiymat: `/authorize` ga yuboriladi va callback'da qaytariladi; client uni session'dagi qiymat bilan solishtiradi. Maqsad — OAuth oqimidagi **CSRF** hujumlarining oldini olish (hujumchi o'z code'ini qurbonning sessiyasiga \"ulab\" qo'ymasligi uchun).",
        "",
        "Qo'shimcha: `state` orqali login'dan keyin qaytish manzilini xavfsiz uzatish mumkin (lekin URL'ni to'g'ridan-to'g'ri emas, session'dagi kalit sifatida). PKCE ham CSRF'dan qisman himoya qiladi, lekin `state` baribir tavsiya etiladi. OIDC'da `nonce` — ID token replay'iga qarshi.",
        "",
        "```php",
        "$state = Str::random(40);",
        "session(['oauth_state' => $state]);",
        "// callback",
        "abort_unless(hash_equals(session()->pull('oauth_state', ''), (string) $request->state), 403);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "OAuth client callback'ida `state` tekshiruvini yozing va CSRF stsenariysini testda ko'rsating.",
      acceptanceCriteria: [
        "`state` qaysi hujumdan himoya qilishini tushuntira oladi",
        "Doimiy vaqtli taqqoslash (`hash_equals`) ishlatadi"
      ],
      prerequisites: [
        "21.2"
      ]
    },
    {
      id: "21.13",
      title: "OAuth Security Best Practices",
      description: [
        "OAuth 2.0 Security BCP (RFC 9700) va OAuth 2.1 asosiy tavsiyalari: barcha client'lar uchun PKCE; implicit va password grant'lardan voz kechish; redirect URI aniq moslik; refresh token rotation (public client'lar); access token'lar qisqa muddatli va audience bilan cheklangan; token'larni URL'da uzatmaslik; `state`/`nonce`; mix-up hujumlariga qarshi `iss` parametri; sender-constrained token'lar (DPoP, mTLS) yuqori xavf uchun.",
        "",
        "Authorization server tomonida: client autentifikatsiyasi, rate limiting, audit log, maxfiy kalitlarni aylantirish. Tayyor, sinalgan kutubxonalardan foydalaning — OAuth'ni noldan yozmang.",
        "",
        "```text",
        "✅ Authorization Code + PKCE (S256)",
        "✅ Client Credentials (server-server)",
        "❌ Implicit grant",
        "❌ Resource Owner Password Credentials",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "OAuth integratsiyangizni RFC 9700 tavsiyalari bo'yicha checklist asosida audit qiling.",
      acceptanceCriteria: [
        "Eskirgan flow'larni va nima uchun ekanini biladi",
        "Asosiy BCP tavsiyalarini qo'llaydi"
      ],
      prerequisites: [
        "21.3",
        "21.11"
      ]
    },
    {
      id: "21.14",
      title: "OAuth 2.0 va OpenID Connect farqi",
      description: [
        "OAuth 2.0 — **avtorizatsiya** (resursga kirish huquqi), foydalanuvchi kimligi haqida standart ma'lumot bermaydi. **OpenID Connect** (OIDC) — OAuth 2.0 ustiga qurilgan **autentifikatsiya** qatlami: `openid` scope'i bilan qo'shimcha **ID token** (JWT — `sub`, `iss`, `aud`, `exp`, `nonce`, email, ism) va standart `/userinfo` endpoint'i, discovery (`/.well-known/openid-configuration`), JWKS.",
        "",
        "\"Google bilan kirish\" — aslida OIDC. Access token'ni foydalanuvchi identifikatsiyasi uchun ishlatish xato (u client uchun emas, API uchun). Laravel'da Socialite OIDC/OAuth provayderlari bilan ishlaydi.",
        "",
        "```text",
        "OAuth 2.0:  access_token   → API'ga kirish",
        "OIDC:       id_token (JWT) → foydalanuvchi kimligi (client uchun)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Socialite bilan OIDC provayder orqali login qiling va ID token claim'larini tekshiring (iss, aud, nonce).",
      acceptanceCriteria: [
        "OAuth va OIDC maqsadini aniq farqlaydi",
        "ID token va access token rolini biladi"
      ],
      prerequisites: [
        "21.1"
      ]
    },
    {
      id: "21.15",
      title: "Laravel Passport bilan OAuth ishlatish",
      description: [
        "Passport o'rnatish: `php artisan install:api --passport`, kalitlar (`passport:keys`), `HasApiTokens` trait, `api` guard'i `passport` driver bilan. Client'lar: `passport:client` (authorization code), `--public` (PKCE), `--client` (client credentials), personal access client.",
        "",
        "Sozlamalar: token va refresh muddatlari, scope'lar (`tokensCan`), rozilik ekrani view'i, `Passport::hashClientSecrets()`, token'larni tozalash (`passport:purge`). Production'da kalitlarni env/secret manager'dan yuklash, bir nechta server'da bir xil kalitlar.",
        "",
        "```bash",
        "php artisan passport:client --public --name=\"Mobile App\" --redirect_uri=\"uz.example.app://callback\"",
        "php artisan passport:purge --hours=24",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Passport'ni o'rnatib, public (PKCE) va client credentials client'larini yarating va ikkala oqimni sinang.",
      acceptanceCriteria: [
        "Passport client turlarini biladi",
        "Production'da kalitlarni xavfsiz boshqaradi"
      ],
      prerequisites: [
        "20.9"
      ]
    },
    {
      id: "21.16",
      title: "Qachon OAuth kerak, qachon Sanctum yetarli",
      description: [
        "**Sanctum yetarli**: faqat o'z (birinchi tomon) SPA, mobil ilovalaringiz; foydalanuvchilar o'zlari uchun token yaratadi (PAT); oddiy servis token'lari. Sodda, kam infratuzilma, tez.",
        "",
        "**OAuth (Passport yoki tashqi IdP) kerak**: uchinchi tomon ilovalari foydalanuvchi nomidan kirishi (delegatsiya va rozilik); siz identity provider bo'lmoqchisiz (SSO, \"Login with X\"); standart talab qilinadi (ochiq bank, hamkor integratsiyalari); bir nechta ilova/servis uchun markaziy autentifikatsiya. Ko'pincha tashqi IdP (Keycloak, Auth0, Okta) o'z OAuth serveringizni yozishdan afzal.",
        "",
        "```text",
        "Faqat o'z ilovalarim?            → Sanctum",
        "Uchinchi tomon foydalanuvchi nomidan? → OAuth (Passport / IdP)",
        "Korporativ SSO?                  → OIDC/SAML IdP",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangiz uchun Sanctum, Passport va tashqi IdP variantlarini solishtirib, ADR yozing.",
      acceptanceCriteria: [
        "Sanctum va OAuth tanlash mezonlarini biladi",
        "Tashqi IdP'ni muqobil sifatida ko'rib chiqadi"
      ],
      prerequisites: [
        "20.8",
        "20.9"
      ]
    }
  ]
});
