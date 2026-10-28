/* Chuqur dars: 21.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.11", {
  "lesson": [
    "### Nega bu eng muhim tekshiruvlardan biri",
    "Authorization code `redirect_uri` ga yuboriladi. Agar hujumchi `redirect_uri` ni o'z serveriga o'zgartira olsa, code (yoki eskirgan implicit flow'da to'g'ridan-to'g'ri token) hujumchiga ketadi. Ko'plab real OAuth zaifliklari (Facebook, GitHub, Microsoft va boshqalarda topilgan) aynan shu yerda bo'lgan.",
    "",
    "### Qoida: aniq moslik",
    "AS `/authorize` va `/token` so'rovlaridagi `redirect_uri` ni client uchun **oldindan ro'yxatdan o'tkazilgan** qiymatlarga **aniq, belgima-belgi** (exact string match) solishtirishi kerak. RFC 9700 va OAuth 2.1 shuni talab qiladi.",
    "",
    "### Zaif tekshiruvlar va ularning aylanib o'tilishi",
    "- **Prefiks:** `https://client.uz/` bilan boshlanishi → `https://client.uz/../evil` yoki `https://client.uz.evil.com/` (agar oxirida `/` bo'lmasa), yoki client saytidagi **open redirect** sahifasi: `https://client.uz/redirect?to=https://evil.com`.",
    "- **Subdomen wildcard:** `*.client.uz` → hujumchi biror subdomenni egallab olsa (subdomain takeover, eskirgan DNS yozuvi) yoki foydalanuvchi kontenti joylashadigan subdomen (`users.client.uz/~attacker`).",
    "- **Domen bo'yicha:** `client.uz` ichidagi istalgan yo'l → saytdagi XSS yoki open redirect'li sahifa.",
    "- **Parser farqlari:** `https://client.uz@evil.com`, `https://evil.com\\@client.uz`, URL kodlash hiylalari. AS va brauzer URL'ni har xil tushunadi.",
    "",
    "### Qo'shimcha qoidalar",
    "- `/token` so'rovidagi `redirect_uri` `/authorize` dagisi bilan bir xil bo'lishi kerak.",
    "- Production'da faqat **HTTPS**. `http://localhost` faqat native va dev ilovalar uchun.",
    "- Mobil uchun maxsus sxema (`uz.hisobchi.app:/callback`) yoki yaxshirog'i **claimed HTTPS** (Universal Links, App Links). Native ilovalar uchun loopback `http://127.0.0.1:{ixtiyoriy port}/callback` (RFC 8252) — bu yagona holatda port moslashuvchan bo'lishi mumkin.",
    "- Ro'yxatdan o'tkazishda ham URL'larni tekshiring: fragment (`#`) yo'q, HTTPS, aniq yo'l.",
    "- Bitta client uchun bir nechta URI mumkin (production, staging), lekin har biri to'liq.",
    "",
    "### Client tomonida",
    "- Callback sahifasida open redirect bo'lmasin. Login'dan keyingi \"qaytish\" manzili (`intended`) faqat o'z saytingizdagi nisbiy yo'llar bo'lsin.",
    "- Callback sahifasi tashqi resurslarni (analitika skriptlari, tashqi rasmlar) yuklamasin: `code` URL'da va `Referer` orqali sizishi mumkin. `Referrer-Policy: no-referrer` header'i.",
    "- Code'ni darhol almashtiring va URL'dan olib tashlang (`history.replaceState`).",
    "",
    "### Passport'da",
    "Passport `oauth_clients.redirect` (Passport 12+ da `redirect_uris`) ustunidagi qiymatlar bilan solishtiradi. Client yaratishda to'liq URL'larni kiriting va ruxsatsiz o'zgartirishdan himoya qiling."
  ],
  "examples": [
    {
      "title": "Zaif va to'g'ri tekshiruv",
      "lang": "php",
      "code": [
        "// ZAIF: prefiks",
        "if (str_starts_with($requested, 'https://client.uz')) { ... }",
        "// https://client.uz.evil.com/cb -> o'tib ketadi",
        "",
        "// ZAIF: domen",
        "if (parse_url($requested, PHP_URL_HOST) === 'client.uz') { ... }",
        "// https://client.uz/redirect?to=https://evil.com -> open redirect orqali",
        "",
        "// TO'G'RI: aniq moslik",
        "$allowed = $client->redirect_uris;   // ['https://client.uz/oauth/callback']",
        "abort_unless(in_array($requested, $allowed, true), 400, 'invalid redirect_uri');"
      ]
    },
    {
      "title": "Client callback'da open redirect'ni oldini olish",
      "lang": "php",
      "code": [
        "// Login'dan keyin qaytish manzili",
        "$next = $request->query('next', '/dashboard');",
        "",
        "// Faqat ichki nisbiy yo'l: '/...' bilan boshlanadi, '//' yoki '/\\\\' emas",
        "if (! preg_match('#^/(?![/\\\\\\\\])#', $next)) {",
        "    $next = '/dashboard';",
        "}",
        "",
        "return redirect($next)->header('Referrer-Policy', 'no-referrer');"
      ],
      "note": "`//evil.com` protokolga nisbiy URL va brauzer uni tashqi saytga yo'naltiradi. Shuning uchun `/` dan keyin yana `/` yoki `\\` bo'lmasligi tekshiriladi."
    }
  ],
  "pitfalls": [
    "`redirect_uri` ni prefiks, domen yoki wildcard bo'yicha tekshirish.",
    "Client saytida open redirect qoldirish: aniq moslik ham aylanib o'tiladi.",
    "Production'da `http://` redirect URI'larga ruxsat berish.",
    "Callback sahifasida tashqi skriptlar: code `Referer` orqali sizadi."
  ]
});
