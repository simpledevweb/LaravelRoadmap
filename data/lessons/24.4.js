/* Chuqur dars: 24.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.4", {
  "lesson": [
    "### HMAC nima",
    "**HMAC** (Hash-based Message Authentication Code, RFC 2104) — xabar va maxfiy kalitdan hisoblanadigan qisqa \"barmoq izi\". Kalitni bilmasdan to'g'ri HMAC yasab bo'lmaydi va xabarning bitta bayti o'zgarsa, HMAC butunlay boshqacha bo'ladi. U ikki narsani kafolatlaydi: **yaxlitlik** (o'zgartirilmagan) va **haqiqiylik** (kalit egasi yasagan).",
    "",
    "Formula: `HMAC(K, m) = H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ m))`. Amalda: `hash_hmac('sha256', $message, $key)`.",
    "",
    "### Nega oddiy hash emas",
    "`sha256($secret . $body)` kabi o'zingiz yasagan konstruksiya **length extension** hujumiga zaif (SHA-256, SHA-1, MD5 uchun): hujumchi asl xabar oxiriga ma'lumot qo'shib, secret'ni bilmasdan to'g'ri hash hisoblay oladi. HMAC aynan shu muammoni hal qilish uchun yaratilgan. Doim `hash_hmac()` ishlating.",
    "",
    "### Algoritm tanlash",
    "- **HMAC-SHA256** — standart tanlov.",
    "- HMAC-SHA512 — kuchliroq, imzo uzunroq.",
    "- HMAC-SHA1 — eski (GitHub `X-Hub-Signature`), HMAC sifatida hali ham amalda xavfsiz, lekin yangi tizimlarda SHA-256.",
    "- MD5 asosidagi sxemalar (ba'zi mahalliy to'lov tizimlarida `md5(click_trans_id + service_id + secret + ...)`) — HMAC emas va zaif. Provayder talab qilsa, majburan ishlatasiz, lekin qo'shimcha himoya (IP allowlist, API orqali holatni tekshirish) qo'shing.",
    "",
    "### Kodlash",
    "`hash_hmac()` default'da hex satr qaytaradi. `true` (binary) bilan xom baytlar, keyin base64. Provayder qaysi formatda (hex, base64, base64url) yuborishini hujjatdan aniqlang va xuddi shunday hisoblang. Katta-kichik harf ham muhim (hex odatda kichik harf).",
    "",
    "### Secret",
    "- Kamida 32 bayt kriptografik tasodifiy (`random_bytes(32)`, `openssl rand -hex 32`).",
    "- Har integratsiya (va har mijoz, outbound'da) **alohida** secret.",
    "- `.env` yoki secret manager, Git'da emas.",
    "- Rotatsiya: bir vaqtda eski va yangi secret (24.3).",
    "- Ba'zi provayderlar secret'ni base64 kodlangan holda beradi (`whsec_...`): ishlatishdan oldin dekodlash kerakligini hujjatdan tekshiring.",
    "",
    "### Imzolanadigan ma'lumot",
    "Faqat body'ni imzolash yetarli emas: hujumchi eski (haqiqiy) so'rovni aynan takrorlashi mumkin (replay, 24.6). Shuning uchun imzoga **vaqt belgisi** (va ID) qo'shiladi: `{id}.{timestamp}.{body}`. Endi vaqtni o'zgartirsa, imzo buziladi.",
    "",
    "### Konstant vaqtli taqqoslash",
    "`hash_equals()` — ikki satrni har doim bir xil vaqtda solishtiradi. Oddiy `===` birinchi farq qiluvchi baytda to'xtaydi va javob vaqtini o'lchab, imzoni bayt-bayt taxmin qilish nazariy jihatdan mumkin."
  ],
  "examples": [
    {
      "title": "HMAC imzolash va tekshirish",
      "lang": "php",
      "code": [
        "$secret = config('webhooks.partner.secret');",
        "$id = 'evt_01J2K8...';",
        "$timestamp = time();",
        "$body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);",
        "",
        "// Imzolash (yuboruvchi)",
        "$signature = base64_encode(hash_hmac('sha256', \"{$id}.{$timestamp}.{$body}\", $secret, true));",
        "",
        "// Tekshirish (qabul qiluvchi): aynan kelgan xom body ustida",
        "$expected = base64_encode(hash_hmac('sha256', \"{$receivedId}.{$receivedTs}.{$rawBody}\", $secret, true));",
        "$ok = hash_equals($expected, $receivedSignature);"
      ]
    },
    {
      "title": "Zaif konstruksiya va GitHub misoli",
      "lang": "php",
      "code": [
        "// ZAIF: length extension",
        "$sig = hash('sha256', $secret . $body);",
        "",
        "// GitHub: X-Hub-Signature-256: sha256=<hex>",
        "$expected = 'sha256=' . hash_hmac('sha256', $request->getContent(), config('services.github.webhook_secret'));",
        "abort_unless(hash_equals($expected, (string) $request->header('X-Hub-Signature-256')), 401);"
      ]
    }
  ],
  "pitfalls": [
    "`hash($secret . $body)` kabi o'z konstruksiyangizni HMAC o'rniga ishlatish.",
    "Hex va base64 formatlarini adashtirish: imzo hech qachon mos kelmaydi.",
    "Barcha mijozlar yoki integratsiyalar uchun bitta umumiy secret.",
    "Imzoga vaqt belgisini qo'shmaslik: replay hujumiga ochiq."
  ]
});
