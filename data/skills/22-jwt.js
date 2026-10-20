/* 22 · JWT
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 22,
  slug: "jwt",
  title: "JWT",
  group: "auth",
  description: "JWT (JSON Web Token, RFC 7519) — imzolangan, o'z-o'zini tasvirlovchi token formati. U OAuth access token'lari, OIDC ID token'lari va servislar o'rtasidagi autentifikatsiyada keng ishlatiladi. JWT kuchli, lekin xavfli tuzoqlarga boy (algoritm chalkashligi, bekor qilish qiyinligi, payload oshkoraligi) — Senior dasturchi ularni biladi va JWT'ni faqat o'rinli joyda ishlatadi.",
  subskills: [
    {
      id: "22.1",
      title: "JWT Structure",
      description: [
        "JWT uch qismdan iborat, nuqta bilan ajratilgan: `header.payload.signature`, har biri base64url kodlangan. Header — algoritm va tur (`{\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"2025-06\"}`), payload — claim'lar, signature — header va payload'ning imzosi.",
        "",
        "Muhim: base64url — shifrlash emas, kodlash; payload'ni har kim o'qiy oladi. Imzo faqat yaxlitlik va manbani kafolatlaydi. Shifrlangan variant — JWE (5 qism). Token hajmi har so'rovda header'da yuboriladi — ko'p claim qo'shmang.",
        "",
        "```php",
        "[$h, $p, $s] = explode('.', $jwt);",
        "$payload = json_decode(base64_decode(strtr($p, '-_', '+/')), true); // imzo tekshirilmadi!",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "JWT'ni qo'lda dekodlang va imzo tekshirilmagan payload'ga ishonish nega xavfli ekanini ko'rsating.",
      acceptanceCriteria: [
        "Uch qism va base64url kodlashni biladi",
        "Kodlash va shifrlash farqini tushunadi"
      ],
      prerequisites: [
        "20.7"
      ]
    },
    {
      id: "22.2",
      title: "Header, Payload va Signature",
      description: [
        "**Header**: `alg` (imzo algoritmi), `typ`, `kid` (kalit identifikatori — kalit aylantirishda qaysi kalit ishlatilganini bildiradi). **Payload**: claim'lar to'plami. **Signature**: `HMACSHA256(base64url(header) + \".\" + base64url(payload), secret)` yoki RSA/ECDSA imzo.",
        "",
        "Tekshirish tartibi: header'dan `kid` bo'yicha kalitni tanlash (lekin `alg` ni header'dan emas, server konfiguratsiyasidan olish!), imzoni tekshirish, keyin claim'larni (`exp`, `iss`, `aud`) tekshirish. Imzo tekshirilmaguncha payload'ga ishonilmaydi.",
        "",
        "```php",
        "use Firebase\\JWT\\JWT;",
        "use Firebase\\JWT\\Key;",
        "",
        "$decoded = JWT::decode($jwt, new Key($publicKey, 'RS256')); // alg server tomonidan belgilangan",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`firebase/php-jwt` bilan token yaratib tekshiring, `kid` orqali kalit tanlashni qo'shing.",
      acceptanceCriteria: [
        "Har bir qismning vazifasini biladi",
        "`alg` ni token'dan emas, konfiguratsiyadan oladi"
      ],
      prerequisites: [
        "22.1"
      ]
    },
    {
      id: "22.3",
      title: "Claims",
      description: [
        "Claim — payload'dagi kalit-qiymat juftligi, token egasi va kontekst haqida da'vo. Uch tur: registered (standart, 22.4), public (IANA ro'yxatidagi yoki to'qnashuvsiz URI nomlar), private (tomonlar kelishgan maxsus: `tenant_id`, `roles`).",
        "",
        "Qoidalar: minimal claim'lar (hajm va oshkoralik), maxfiy ma'lumot yo'q, tez o'zgaradigan ma'lumot (rollar) token'da bo'lsa — token muddati davomida eskirgan bo'ladi. Avtorizatsiya qarorlari uchun token'dagi claim'larga ehtiyotkorlik bilan tayaning.",
        "",
        "```json",
        "{ \"iss\": \"https://auth.example.uz\", \"sub\": \"42\", \"aud\": \"orders-api\", \"exp\": 1717243200, \"iat\": 1717242300, \"tenant_id\": 7, \"scope\": \"orders:read\" }",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Servislararo token uchun minimal claim'lar to'plamini loyihalab, har birining zaruratini asoslang.",
      acceptanceCriteria: [
        "Claim turlarini biladi",
        "Token'dagi eskirgan ma'lumot xavfini tushunadi"
      ],
      prerequisites: [
        "22.1"
      ]
    },
    {
      id: "22.4",
      title: "Registered va Custom Claims",
      description: [
        "Registered claim'lar (RFC 7519): `iss` (chiqaruvchi), `sub` (subyekt — foydalanuvchi id), `aud` (qabul qiluvchi), `exp` (muddat tugashi), `nbf` (shu vaqtdan oldin yaroqsiz), `iat` (chiqarilgan vaqt), `jti` (unikal id — replay va bekor qilish uchun). Vaqtlar — Unix soniyalarda.",
        "",
        "Custom claim'lar: nomlar to'qnashmasligi uchun aniq (`https://example.uz/tenant` yoki kelishilgan qisqa nom), tiplari hujjatlashtirilgan. `sub` — barqaror va o'zgarmas identifikator (email emas).",
        "",
        "```php",
        "$payload = [",
        "    'iss' => config('app.url'), 'sub' => (string) $user->id, 'aud' => 'mobile-api',",
        "    'iat' => time(), 'nbf' => time(), 'exp' => time() + 900, 'jti' => (string) Str::uuid(),",
        "    'tenant_id' => $user->tenant_id,",
        "];",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Token yaratish va tekshirishda barcha registered claim'lardan to'g'ri foydalaning va testlar yozing.",
      acceptanceCriteria: [
        "Har bir registered claim vazifasini biladi",
        "`sub` uchun barqaror identifikator tanlaydi"
      ],
      prerequisites: [
        "22.3"
      ]
    },
    {
      id: "22.5",
      title: "Signing Algorithms",
      description: [
        "**Simmetrik** (HS256/384/512 — HMAC): bitta maxfiy kalit imzolaydi va tekshiradi — barcha tekshiruvchilar imzolay ham oladi; faqat bitta servis ichida. **Asimmetrik** (RS256 — RSA, ES256 — ECDSA, EdDSA): private kalit bilan imzolash, public kalit bilan tekshirish — ko'p servisli tizimlar va tashqi tekshiruvchilar uchun. ES256/EdDSA — kichik kalit va imzo.",
        "",
        "Qoidalar: `none` algoritmini hech qachon qabul qilmang; ruxsat etilgan algoritmlar ro'yxati qat'iy; HMAC kaliti kamida 256 bit tasodifiy; RSA kamida 2048 bit.",
        "",
        "```php",
        "JWT::encode($payload, $privateKey, 'RS256', keyId: '2025-06');",
        "JWT::decode($jwt, new Key($publicKey, 'RS256'));",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Bir xil tizimni HS256 va RS256 bilan amalga oshirib, kalit tarqatish nuqtai nazaridan solishtiring.",
      acceptanceCriteria: [
        "Simmetrik va asimmetrik imzo farqini biladi",
        "Ko'p servisli tizim uchun to'g'ri algoritmni tanlaydi"
      ],
      prerequisites: [
        "22.2"
      ]
    },
    {
      id: "22.6",
      title: "Token Expiration",
      description: [
        "`exp` claim majburiy: JWT'ni bekor qilish qiyin bo'lgani uchun qisqa muddat asosiy himoya. Access JWT — odatda 5–15 daqiqa; uzoq sessiya refresh token orqali. `nbf` va `iat` bilan birga kichik `leeway` (30–60 soniya) serverlar soati farqi uchun.",
        "",
        "Tekshirish kutubxona tomonidan avtomatik, lekin konfiguratsiyani tekshiring (ba'zi kutubxonalarda `exp` tekshiruvini o'chirish mumkin). Muddati tugagan token — `401` + `error=\"invalid_token\"`, mijoz refresh qiladi.",
        "",
        "```php",
        "JWT::$leeway = 60; // soniya",
        "try {",
        "    $claims = JWT::decode($jwt, new Key($key, 'RS256'));",
        "} catch (ExpiredException) {",
        "    abort(401, 'Token muddati tugagan');",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Muddati tugagan, hali yaroqsiz (`nbf`) va normal token'lar uchun testlar yozing, leeway'ni sozlang.",
      acceptanceCriteria: [
        "Qisqa muddatning JWT uchun ahamiyatini tushunadi",
        "Clock skew'ni leeway bilan boshqaradi"
      ],
      prerequisites: [
        "22.4"
      ]
    },
    {
      id: "22.7",
      title: "Issuer va Audience Validation",
      description: [
        "`iss` tekshiruvi — token kutilgan authorization server tomonidan chiqarilganmi. `aud` tekshiruvi — token aynan **shu** servis uchun mo'ljallanganmi. `aud` tekshirilmasa, bir servis uchun chiqarilgan token boshqasida ishlatilishi mumkin (token substitution) — ayniqsa umumiy IdP'li mikroservislarda.",
        "",
        "Tekshiruvlar imzodan keyin, qat'iy tenglik bilan; `aud` massiv bo'lishi mumkin — servis o'z identifikatori ro'yxatda borligini tekshiradi. Ko'p tenant'li IdP'larda `iss` tenant'ga bog'liq bo'lishi mumkin.",
        "",
        "```php",
        "$claims = JWT::decode($jwt, $keys);",
        "abort_unless($claims->iss === 'https://auth.example.uz', 401);",
        "abort_unless(in_array('orders-api', (array) $claims->aud, true), 401);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ikki servisli muhitda `aud` tekshiruvisiz token substitution hujumini ko'rsating va tuzating.",
      acceptanceCriteria: [
        "`iss` va `aud` tekshiruvlarining maqsadini biladi",
        "Token substitution xavfini tushuntira oladi"
      ],
      prerequisites: [
        "22.4"
      ]
    },
    {
      id: "22.8",
      title: "Signature Verification",
      description: [
        "Imzo tekshiruvi — JWT xavfsizligining asosi: token chiqaruvchi tomonidan yaratilgan va o'zgartirilmagan. Tekshirish har doim, har bir so'rovda, ishonchli kutubxona bilan (`firebase/php-jwt`, `lcobucci/jwt`, `web-token/jwt-framework`), o'zingiz yozgan kod bilan emas.",
        "",
        "Tuzoqlar: `decode` o'rniga imzosiz \"parse\" funksiyasini ishlatish; `alg: none` qabul qilish; header'dagi `jku`/`x5u` URL'dan kalit yuklash (hujumchi o'z kalitini ko'rsatadi); HMAC imzolarini oddiy `==` bilan solishtirish (timing attack — `hash_equals`).",
        "",
        "```php",
        "// lcobucci/jwt",
        "$constraints = [new SignedWith(new Sha256(), InMemory::plainText($publicKey)), new StrictValidAt($clock)];",
        "$config->validator()->assert($token, ...$constraints);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "JWT tekshiruvi kodini audit qilib, imzosiz parse, `none` va tashqi kalit URL'lari ishlatilmasligini ta'minlang.",
      acceptanceCriteria: [
        "Imzo tekshiruvi tuzoqlarini biladi",
        "Faqat sinalgan kutubxonalardan foydalanadi"
      ],
      prerequisites: [
        "22.5"
      ]
    },
    {
      id: "22.9",
      title: "Key Rotation",
      description: [
        "Imzo kalitlarini muntazam (va buzilganda zudlik bilan) almashtirish. Jarayon: yangi kalit juftligi yaratiladi va `kid` bilan JWKS'ga (`/.well-known/jwks.json`) qo'shiladi → yangi token'lar yangi kalit bilan imzolanadi → eski kalit eski token'lar muddati tugaguncha JWKS'da qoladi → keyin olib tashlanadi.",
        "",
        "Tekshiruvchilar JWKS'ni keshlaydi va noma'lum `kid` kelganda yangilaydi (lekin cheklangan chastotada — DoS'ga qarshi). HMAC kalitlarida ham bir vaqtda ikki kalit qo'llab-quvvatlanadi.",
        "",
        "```json",
        "{ \"keys\": [",
        "  { \"kid\": \"2025-06\", \"kty\": \"RSA\", \"alg\": \"RS256\", \"use\": \"sig\", \"n\": \"...\", \"e\": \"AQAB\" },",
        "  { \"kid\": \"2025-03\", \"kty\": \"RSA\", \"alg\": \"RS256\", \"use\": \"sig\", \"n\": \"...\", \"e\": \"AQAB\" }",
        "]}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "JWKS endpoint'i va `kid` asosidagi kalit tanlash bilan zero-downtime kalit aylantirishni amalga oshiring.",
      acceptanceCriteria: [
        "Kalit aylantirish bosqichlarini biladi",
        "JWKS keshlash va yangilash qoidalarini tushunadi"
      ],
      prerequisites: [
        "22.5"
      ]
    },
    {
      id: "22.10",
      title: "Refresh Token Strategy",
      description: [
        "JWT access token qisqa muddatli bo'lgani uchun uzoq sessiyalar refresh token bilan: odatda refresh token **opaque** va DB'da (bekor qilish mumkin), access token esa JWT. Rotation: har yangilashda yangi refresh token, eskisi bekor; reuse detection — eski token qayta kelsa, butun oila bekor.",
        "",
        "Saqlash: web — refresh token `HttpOnly` cookie'da (faqat `/auth/refresh` path'iga), access token xotirada; mobil — xavfsiz saqlash. Refresh endpoint'i rate limit va qurilma bog'lanishi bilan himoyalanadi.",
        "",
        "```text",
        "Login → access JWT (15 daq) + refresh (opaque, 30 kun, DB'da hash)",
        "Refresh → yangi access JWT + yangi refresh, eski refresh bekor",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "JWT access + opaque refresh token sxemasini rotation va reuse detection bilan amalga oshiring.",
      acceptanceCriteria: [
        "Refresh token nega opaque bo'lishi foydaliligini tushuntira oladi",
        "Rotation va reuse detection'ni qo'llaydi"
      ],
      prerequisites: [
        "20.15"
      ]
    },
    {
      id: "22.11",
      title: "Revocation Challenges",
      description: [
        "JWT stateless — server uni muddati tugaguncha qabul qiladi, hatto foydalanuvchi logout qilsa, paroli o'zgarsa yoki bloklansa ham. Yechimlar (har biri statelessness'ni qisman qurbon qiladi): qisqa muddat (eng sodda), denylist (`jti` Redis'da `exp` gacha TTL bilan), foydalanuvchi \"token versiyasi\" (`token_version` claim, DB/keshdagi qiymat bilan solishtirish), introspection.",
        "",
        "Agar har so'rovda DB/kesh tekshiruvi baribir kerak bo'lsa — opaque token (Sanctum) soddaroq va xavfsizroq bo'lishi mumkin. Bu JWT tanlashdan oldin beriladigan asosiy savol.",
        "",
        "```php",
        "if (Redis::exists(\"jwt:revoked:{$claims->jti}\")) {",
        "    abort(401);",
        "}",
        "// logout:",
        "Redis::setex(\"jwt:revoked:{$claims->jti}\", $claims->exp - time(), 1);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Logout uchun Redis denylist'ni amalga oshiring va uning statelessness'ga ta'sirini hujjatlashtiring.",
      acceptanceCriteria: [
        "JWT bekor qilish usullari va narxini biladi",
        "Opaque token muqobilini ko'rib chiqadi"
      ],
      prerequisites: [
        "22.6"
      ]
    },
    {
      id: "22.12",
      title: "Token Storage",
      description: [
        "Brauzerda: `localStorage`/`sessionStorage` — har qanday XSS token'ni o'g'irlaydi; `HttpOnly` + `Secure` + `SameSite` cookie — JavaScript o'qiy olmaydi, lekin CSRF himoyasi kerak; xotirada (JS o'zgaruvchi) — sahifa yangilanganda yo'qoladi, refresh cookie bilan birga yaxshi kombinatsiya. Birinchi tomon SPA uchun ko'pincha eng yaxshisi — token emas, session cookie (Sanctum SPA).",
        "",
        "Mobil: Keychain/Keystore. Server: token'ni log'ga yozmaslik, DB'da faqat hash (refresh), maxfiy kalitlar secret manager'da.",
        "",
        "```text",
        "SPA (o'z domeningiz)    → Sanctum cookie session",
        "SPA (tashqi API)        → access JWT xotirada + refresh HttpOnly cookie",
        "Mobil                    → Keychain / Keystore",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Frontend'dagi token saqlash usulini XSS va CSRF nuqtai nazaridan baholab, xavfsizroq sxemaga o'tkazing.",
      acceptanceCriteria: [
        "Har bir saqlash joyining xavflarini biladi",
        "Birinchi tomon SPA uchun session'ni afzal ko'radi"
      ],
      prerequisites: [
        "20.20"
      ]
    },
    {
      id: "22.13",
      title: "Sensitive Data in Payload",
      description: [
        "JWT payload faqat base64url kodlangan — token'ni ko'rgan har kim (brauzer, proxy log'lari, monitoring, mijoz) uni o'qiydi. Payload'ga qo'ymang: parol, shaxsiy ma'lumot (pasport, telefon, manzil), ichki tizim detallari, moliyaviy ma'lumot, maxfiy kalitlar.",
        "",
        "Kerak bo'lsa: faqat identifikator (`sub`) qo'yib, qolganini server tomonda olish, yoki JWE (shifrlangan JWT) — lekin u murakkablik qo'shadi. GDPR nuqtai nazaridan ham token'dagi shaxsiy ma'lumot muammo.",
        "",
        "```json",
        "❌ { \"sub\": \"42\", \"email\": \"ali@ex.uz\", \"phone\": \"+998901234567\", \"passport\": \"AA1234567\" }",
        "✅ { \"sub\": \"42\", \"scope\": \"orders:read\", \"exp\": 1717243200 }",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ishlatilayotgan JWT'lardagi claim'larni audit qilib, sezgir ma'lumotlarni olib tashlang.",
      acceptanceCriteria: [
        "Payload oshkoraligini tushunadi",
        "Token'ga faqat minimal identifikatorlarni qo'yadi"
      ],
      prerequisites: [
        "22.3"
      ]
    },
    {
      id: "22.14",
      title: "Algorithm Confusion Risks",
      description: [
        "Algoritm chalkashligi hujumlari: (1) **`alg: none`** — imzosiz token'ni qabul qiluvchi kutubxonalar; (2) **RS256 → HS256** — server public kalitni kutadi, hujumchi `alg: HS256` bilan public kalitni HMAC siri sifatida ishlatib imzolaydi; agar server `alg` ni header'dan olsa, soxta token tekshiruvdan o'tadi.",
        "",
        "Himoya: ruxsat etilgan algoritmni server konfiguratsiyasida qat'iy belgilash (header'dagi `alg` ga ishonmaslik), kalitni algoritm bilan bog'lash (`new Key($key, 'RS256')`), kutubxonani yangilab borish, `kid` dan kalit yo'lini/URL'ini qurmaslik (injection).",
        "",
        "```php",
        "// ✅ algoritm kalit bilan qat'iy bog'langan",
        "JWT::decode($jwt, new Key($publicKey, 'RS256'));",
        "// ❌ header'dagi alg'ga qarab tekshirish — xavfli",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Test muhitida RS256→HS256 chalkashlik hujumini sinab, kodingiz unga chidamli ekanini isbotlang.",
      acceptanceCriteria: [
        "`none` va algoritm almashtirish hujumlarini tushuntira oladi",
        "Algoritmni server tomonida qat'iy belgilaydi"
      ],
      prerequisites: [
        "22.8"
      ]
    },
    {
      id: "22.15",
      title: "JWT va Session Authentication taqqoslash",
      description: [
        "**Session**: holat serverda, cookie'da faqat ID; bekor qilish oson, hajm kichik, brauzer uchun ideal; masshtablash uchun umumiy session saqlash kerak. **JWT**: holat token'da, server stateless tekshiradi; servislar o'rtasida qulay; bekor qilish qiyin, hajm katta, payload oshkor.",
        "",
        "\"JWT masshtablanadi, session yo'q\" — ko'pincha mif: Redis session'lar oson masshtablanadi, JWT esa bekor qilish uchun baribir holat talab qiladi. Tanlov: birinchi tomon web — session; taqsimlangan mikroservislar va uchinchi tomon token'lari — JWT; mobil — opaque token yoki JWT.",
        "",
        "```text",
        "                Session        JWT",
        "Bekor qilish    oson           qiyin",
        "Holat           server         token",
        "Hajm            kichik         katta",
        "Servislararo    qiyin          oson",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihangiz uchun session va JWT variantlarini taqqoslash jadvali bilan ADR yozing.",
      acceptanceCriteria: [
        "Ikki yondashuvning haqiqiy murosalarini biladi",
        "\"JWT doim yaxshiroq\" mifini rad eta oladi"
      ],
      prerequisites: [
        "20.2",
        "22.11"
      ]
    },
    {
      id: "22.16",
      title: "Secure JWT Implementation",
      description: [
        "Xavfsiz JWT checklist: sinalgan kutubxona; asimmetrik algoritm (servislararo); algoritm qat'iy belgilangan; `exp` qisqa, `iss`/`aud`/`nbf` tekshiriladi; `kid` + JWKS bilan kalit aylantirish; kalitlar secret manager'da; payload minimal va sezgir ma'lumotsiz; bekor qilish strategiyasi (denylist/versiya); refresh token opaque va rotation bilan; token faqat HTTPS va header'da; log'larda token yo'q; testlar — noto'g'ri imzo, muddati o'tgan, noto'g'ri `aud`, `none`.",
        "",
        "Laravel'da tayyor yechimlar (Passport, `php-open-source-saver/jwt-auth`) bu qoidalarning ko'pini qamraydi, lekin konfiguratsiyani tekshiring.",
        "",
        "```php",
        "it('rejects tokens for another audience', function () {",
        "    $jwt = issueToken(['aud' => 'billing-api']);",
        "    $this->withToken($jwt)->getJson('/api/orders')->assertUnauthorized();",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Mavjud JWT implementatsiyasini checklist bo'yicha audit qiling va har bir band uchun test qo'shing.",
      acceptanceCriteria: [
        "Xavfsiz JWT checklist'ini biladi",
        "Salbiy holatlar uchun testlar yozadi"
      ],
      prerequisites: [
        "22.14",
        "22.9"
      ]
    }
  ]
});
