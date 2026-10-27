/* Chuqur dars: 1.39. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.39", {
  "lesson": [
    "### Parol",
    "Parolni **faqat** `password_hash($pw, PASSWORD_ARGON2ID)` (yoki bcrypt `PASSWORD_DEFAULT`) bilan saqlang, tekshirish `password_verify()`, algoritm/cost o'zgarsa `password_needs_rehash()` bilan kirish paytida yangilang. `md5/sha1/sha256` parol uchun yaroqsiz: tez, tuz yo'q, GPU bilan buziladi. Laravel `Hash::make/check`.",
    "",
    "### Tasodifiylik",
    "`random_bytes()` va `random_int()` — kriptografik xavfsiz (tokenlar, reset kodlari, OTP). `rand()`, `mt_rand()`, `uniqid()`, `lcg_value()` bashorat qilinadi: xavfsizlik uchun ishlatmang. Token: `bin2hex(random_bytes(32))`.",
    "",
    "### Solishtirish",
    "Maxfiy qiymatni (token, HMAC) `hash_equals($known, $user)` bilan solishtiring: vaqt hujumidan himoya (constant-time) va tip aralashmasligi. HMAC: `hash_hmac('sha256', $data, $key)`.",
    "",
    "### Shifrlash",
    "Parol va token ma'lumotini o'zingiz sinab bo'lmagan \"shifr\" bilan emas, tayyor kutubxona bilan: `sodium_crypto_secretbox` (libsodium) yoki `openssl_encrypt` AES-256-GCM (IV unikal). Laravel `Crypt`. Kalitni kodda emas, `.env`/secret manager'da saqlang.",
    "",
    "### Kiritma va chiqish",
    "- SQL: faqat **prepared statements** (PDO/Eloquent bindings).",
    "- HTML: `htmlspecialchars` (Blade `{{ }}`).",
    "- Fayl yo'li: `realpath` + prefiks tekshiruvi.",
    "- `eval`, `include $user`, `extract($_POST)`, `unserialize($user)`: xavfli.",
    "- `filter_var`/validator bilan tekshirish.",
    "",
    "### unserialize",
    "Ishonchsiz ma'lumotni `unserialize` qilish **object injection**: `__wakeup/__destruct` zanjirlari (gadget) orqali RCE. JSON ishlating yoki `['allowed_classes' => false]`.",
    "",
    "### Sezgir ma'lumot",
    "`#[\\SensitiveParameter]` (8.2) stack trace'da parolni yashiradi. `error_reporting`/`display_errors` productionda o'chiq. Sessiya: `cookie_httponly`, `cookie_secure`, `cookie_samesite`, `session_regenerate_id()` kirishdan keyin.",
    "",
    "### Boshqa",
    "Cookie va CSRF himoyasi, rate limiting, CORS: framework darajasida (Laravel middleware).",
    "",
    "### OWASP asosiy zaifliklar va PHP echimi",
    "- **Injection (SQL, command, LDAP):** prepared statements; `escapeshellarg`/`Process` massiv bilan; `eval`/backtick yo'q.",
    "- **XSS:** chiqishda kontekstga mos escape (`htmlspecialchars`, JS uchun `json_encode` bayroqlari, URL uchun `rawurlencode`), CSP header.",
    "- **CSRF:** token + SameSite cookie (Laravel `@csrf`).",
    "- **Broken auth:** `password_hash`, rate limiting, 2FA, session fixation (`session_regenerate_id(true)`), parol tiklash tokeni qisqa muddatli va bir martalik.",
    "- **IDOR:** har so'rovda ruxsat tekshiruvi (Policy/Gate), ID taxmin qilinishiga ishonmang.",
    "- **Mass assignment:** Eloquent `$fillable`/`$guarded`, `$request->validated()`.",
    "- **File upload/LFI/RFI/Path traversal:** 1.37.",
    "- **SSRF:** server tomonidan URL ochishda (`file_get_contents($userUrl)`) oq ro'yxat, ichki IP'lar bloklanadi.",
    "- **Deserialization:** `unserialize` ishonchsiz ma'lumotda.",
    "- **Sensitive data exposure:** TLS, `.env` ni web ildizidan tashqarida, debug o'chiq, loglarda parol yo'q.",
    "- **Security misconfiguration:** `expose_php=Off`, `display_errors=Off`, yangilanishlar.",
    "",
    "### Kriptografiya qoidalari",
    "- **Xeshlash:** parol — `password_hash`; yaxlitlik — `hash('sha256')`; kalitli — `hash_hmac`. `md5/sha1` faqat xavfsizlik bo'lmagan maqsadda (kesh kaliti).",
    "- **Shifrlash:** libsodium (`sodium_crypto_secretbox`, `sodium_crypto_box`) yoki `openssl_encrypt('aes-256-gcm')` + noyob IV + tag; o'zingiz algoritm yozmang. Laravel `Crypt` (AES-256-CBC/GCM + HMAC, `APP_KEY`).",
    "- **Kalit boshqaruvi:** `.env`, secret manager, rotatsiya; APP_KEY o'zgarsa eski shifrlangan ma'lumot ochilmaydi.",
    "- **Tasodifiylik:** `random_bytes`, `random_int`; token uzunligi >= 128 bit.",
    "- **Imzo:** `hash_hmac` + `hash_equals`; Laravel signed URL.",
    "",
    "### Parol xeshlash tafsiloti",
    "`PASSWORD_ARGON2ID` (memory-hard, tavsiya), `PASSWORD_BCRYPT` (cost 10–12, 72 bayt cheklov), `PASSWORD_DEFAULT` (PHP versiyasiga qarab o'zgaradi). Opsiyalar: `['memory_cost' => 65536, 'time_cost' => 4, 'threads' => 1]`. Tuz avtomatik xeshda. `password_needs_rehash` algoritm/opsiya o'zgarsa. Pepper (qo'shimcha maxfiy kalit) ixtiyoriy.",
    "",
    "### Sessiya va cookie",
    "`session.use_strict_mode=1`, `cookie_httponly=1`, `cookie_secure=1`, `cookie_samesite=Lax/Strict`, `session.use_only_cookies=1`, `gc_maxlifetime`. Kirishdan keyin `session_regenerate_id(true)`.",
    "",
    "### Header'lar",
    "`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy`.",
    "",
    "### Tekshirish vositalari",
    "PHPStan/Psalm taint analysis, `composer audit`, Dependabot/Renovate, SonarQube, OWASP ZAP, `roave/security-advisories`."
  ],
  "examples": [
    {
      "title": "Parol",
      "lang": "php",
      "code": [
        "$hash = password_hash($password, PASSWORD_ARGON2ID);",
        "",
        "if (password_verify($input, $hash)) {",
        "    if (password_needs_rehash($hash, PASSWORD_ARGON2ID)) {",
        "        $user->password = password_hash($input, PASSWORD_ARGON2ID);",
        "        $user->save();",
        "    }",
        "}"
      ]
    },
    {
      "title": "Token va solishtirish",
      "lang": "php",
      "code": [
        "$token = bin2hex(random_bytes(32));            // 64 belgi, xavfsiz",
        "$stored = hash('sha256', $token);              // bazada faqat xesh",
        "",
        "// keyin",
        "hash_equals($stored, hash('sha256', $given));  // timing-safe",
        "",
        "$sig = hash_hmac('sha256', $payload, $secret);"
      ]
    },
    {
      "title": "Xavfsiz unserialize",
      "lang": "php",
      "code": [
        "$data = unserialize($raw, ['allowed_classes' => false]);   // obyektlar yaratilmaydi",
        "// yaxshiroq:",
        "$data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);"
      ]
    },
    {
      "title": "Prepared statement",
      "lang": "php",
      "code": [
        "$st = $pdo->prepare('SELECT * FROM users WHERE email = :e AND active = 1');",
        "$st->execute(['e' => $email]);        // interpolatsiya emas, bind",
        "$user = $st->fetch(PDO::FETCH_ASSOC);"
      ]
    },
    {
      "title": "AES-GCM shifrlash",
      "lang": "php",
      "code": [
        "$key = random_bytes(32); $iv = random_bytes(12);",
        "$ct = openssl_encrypt($plain, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);",
        "$blob = $iv . $tag . $ct;",
        "// ochish",
        "$iv = substr($blob, 0, 12); $tag = substr($blob, 12, 16); $ct = substr($blob, 28);",
        "$plain = openssl_decrypt($ct, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag) ?: throw new RuntimeException('buzilgan');"
      ]
    }
  ],
  "pitfalls": [
    "`md5($password)` yoki tuzsiz `sha256` parolni soniyalarda buzishga yo'l ochadi; `password_hash`.",
    "`mt_rand`/`uniqid` bilan reset token yaratish bashorat qilinadigan token beradi: `random_bytes`.",
    "`==` bilan token solishtirish timing hujumi va tip aralashmasligiga ochiq: `hash_equals`.",
    "`unserialize` ishonchsiz ma'lumotda RCE; cookie/queue/cache'dagi serialize qilingan ma'lumot ham foydalanuvchi nazoratida bo'lishi mumkin.",
    "IV/nonce ni qayta ishlatish GCM da shifrni butunlay buzadi: har safar `random_bytes`.",
    "Bcrypt 72 baytdan uzun parolni kesadi; Argon2id tavsiya.",
    "Kalitni kod yoki repository'da saqlash: `.env` va secret manager.",
    "`hash('sha256', $parol)` parol xeshi emas: tez va tuzsiz."
  ]
});
