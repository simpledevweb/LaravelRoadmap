/* Chuqur dars: 22.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.9", {
  "lesson": [
    "### Nega rotatsiya",
    "Imzo kaliti — butun autentifikatsiya tizimining \"bosh kaliti\". U sizib chiqsa, hujumchi istalgan foydalanuvchi, istalgan scope va istalgan muddat bilan token yasaydi. Rotatsiya:",
    "- sizish oqibatini vaqt bilan cheklaydi,",
    "- kompromat gumon qilinganda tez almashtirish imkonini beradi (rejalashtirilgan jarayon bor bo'lsa, favqulodda holat oson),",
    "- ko'p standartlar va auditlar (PCI DSS, ISO 27001) talab qiladi.",
    "",
    "Odatiy davr: har 3–12 oyda rejali, kompromatda darhol.",
    "",
    "### Muammo: uzluksizlik",
    "Kalitni shunchaki almashtirsangiz, eski kalit bilan imzolangan, hali muddati o'tmagan token'lar darhol yaroqsiz bo'ladi va barcha foydalanuvchilar chiqib ketadi. Yechim — bir vaqtda **bir nechta** kalit va `kid`.",
    "",
    "### Asimmetrik kalitlar bilan jarayon (JWKS)",
    "1. **Tayyorlash:** yangi kalit juftligi yaratiladi (`kid: 2025-09`). Uning **ochiq** qismi JWKS'ga qo'shiladi, lekin hali imzolash uchun ishlatilmaydi. JWKS endi ikki kalitni o'z ichiga oladi.",
    "2. **Tarqalishni kutish:** tekshiruvchilar JWKS'ni keshlaydi (masalan, 1 soat). Kesh muddati o'tguncha kuting, shunda hamma yangi kalitni biladi.",
    "3. **Almashtirish:** issuer yangi kalit bilan imzolashni boshlaydi (header'da `kid: 2025-09`).",
    "4. **Eski kalitni saqlash:** eski ochiq kalit JWKS'da kamida **eng uzoq token muddati** (access token, ID token) davomida qoladi.",
    "5. **Olib tashlash:** eski ochiq kalit JWKS'dan olib tashlanadi, shaxsiy qismi xavfsiz yo'q qilinadi.",
    "",
    "### Tekshiruvchi tomoni",
    "- JWKS'ni keshlash (masalan, 1 soat, yoki HTTP `Cache-Control` bo'yicha).",
    "- Token'dagi `kid` keshda yo'q bo'lsa: JWKS'ni **bir marta** majburan yangilash va qayta qidirish. Bu kesh muddati tugashini kutmasdan yangi kalitni qabul qilishga imkon beradi.",
    "- Yangilashlar chastotasini cheklash: hujumchi tasodifiy `kid` lar bilan JWKS endpoint'ini \"bombardimon\" qilmasligi uchun (masalan, daqiqasiga bir martadan ko'p emas).",
    "",
    "### HMAC sirlari bilan",
    "JWKS yo'q, lekin xuddi shu g'oya: konfiguratsiyada bir nechta sir, har biri `kid` bilan. Yangisi bilan imzolash, eski va yangi ikkalasi bilan tekshirish, keyin eskisini olib tashlash. Hamma tekshiruvchilarga yangi sirni tarqatish kerak, bu asimmetrik variantdan noqulayroq.",
    "",
    "### Favqulodda rotatsiya",
    "Shaxsiy kalit sizib chiqsa: eski kalitni JWKS'dan **darhol** olib tashlang (barcha eski token'lar yaroqsiz, foydalanuvchilar qayta kiradi), yangi kalit bilan imzolashni boshlang, refresh token'larni ham bekor qilishni ko'rib chiqing va hodisani tekshiring. Bu jarayonni oldindan mashq qiling.",
    "",
    "### Passport",
    "`passport:keys --force` kalitlarni almashtiradi, lekin Passport bir nechta kalitni bir vaqtda qo'llamaydi: eski access token'lar yaroqsiz bo'ladi. Rejali rotatsiyani kam yuk paytida va qisqa access token muddati bilan qiling."
  ],
  "examples": [
    {
      "title": "Rotatsiya davridagi JWKS",
      "lang": "json",
      "code": [
        "GET /.well-known/jwks.json",
        "Cache-Control: public, max-age=3600",
        "",
        "{",
        "  \"keys\": [",
        "    { \"kty\": \"RSA\", \"kid\": \"2025-09\", \"use\": \"sig\", \"alg\": \"RS256\", \"n\": \"0vx7ago...\", \"e\": \"AQAB\" },",
        "    { \"kty\": \"RSA\", \"kid\": \"2025-06\", \"use\": \"sig\", \"alg\": \"RS256\", \"n\": \"xjlCRBq...\", \"e\": \"AQAB\" }",
        "  ]",
        "}"
      ]
    },
    {
      "title": "Tekshiruvchida JWKS keshi va noma'lum kid",
      "lang": "php",
      "code": [
        "final class JwksProvider",
        "{",
        "    public function keySet(?string $kid = null): array",
        "    {",
        "        $jwks = Cache::remember('jwks', 3600, fn () => $this->fetch());",
        "",
        "        $known = collect($jwks['keys'])->pluck('kid');",
        "        if ($kid && ! $known->contains($kid) && Cache::add('jwks:refresh-lock', 1, 60)) {",
        "            $jwks = $this->fetch();",
        "            Cache::put('jwks', $jwks, 3600);",
        "        }",
        "",
        "        return JWK::parseKeySet($jwks, 'RS256');",
        "    }",
        "",
        "    private function fetch(): array",
        "    {",
        "        return Http::timeout(3)->retry(2, 200)->get(config('jwt.jwks_url'))->throw()->json();",
        "    }",
        "}"
      ],
      "note": "`Cache::add` lock'i noma'lum `kid` bilan kelgan so'rovlar JWKS'ni daqiqasiga bir martadan ko'p yuklamasligini ta'minlaydi."
    }
  ],
  "pitfalls": [
    "Yangi kalitni JWKS'ga qo'shish bilan bir vaqtda u bilan imzolashni boshlash: keshlangan JWKS'li tekshiruvchilar rad etadi.",
    "Eski ochiq kalitni token'lar muddati tugashidan oldin olib tashlash.",
    "Noma'lum `kid` da JWKS'ni cheksiz qayta yuklash: DoS vektori.",
    "Rotatsiya jarayonini hech qachon mashq qilmaslik: favqulodda holatda xatolar."
  ]
});
