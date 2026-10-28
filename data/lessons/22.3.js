/* Chuqur dars: 22.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("22.3", {
  "lesson": [
    "### Claim nima",
    "Claim — token beruvchi (issuer) tomonidan sub'ekt haqida qilingan **da'vo**: \"bu token 42-foydalanuvchi uchun\", \"u `orders:read` huquqiga ega\", \"15:30 gacha amal qiladi\". Imzo shu da'volarni kim qilganini va ular o'zgartirilmaganini kafolatlaydi. Lekin da'vo **qachon** qilingani muhim: u token berilgan paytdagi holat.",
    "",
    "### Uch toifa",
    "1. **Registered (ro'yxatdan o'tgan):** RFC 7519 dagi standart nomlar: `iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`. Qisqa (uch harf) va hamma kutubxona tushunadi.",
    "2. **Public:** IANA \"JSON Web Token Claims\" registridagi yoki to'qnashuvga chidamli nomlar (URI ko'rinishida). OIDC claim'lari (`name`, `email`, `email_verified`, `nonce`, `auth_time`, `acr`, `amr`), OAuth (`scope`, `client_id`, `cnf`).",
    "3. **Private:** tomonlar kelishgan maxsus nomlar: `tenant_id`, `roles`, `plan`.",
    "",
    "Batafsil: 22.4.",
    "",
    "### Vaqt claim'lari",
    "`exp`, `nbf`, `iat` — **NumericDate**: Unix epoch'dan beri soniyalar (millisekund emas!). `1749553200`, `1749553200000` emas. JavaScript'da `Date.now()` millisekund qaytaradi, shuning uchun `Math.floor(Date.now() / 1000)`.",
    "",
    "### Claim'lar va avtorizatsiya qarori",
    "Resource server avtorizatsiya qarorini claim'larga asoslaydi: `sub` → kim, `scope` → nima qila oladi, `tenant_id` → qaysi doirada. Bunda:",
    "- Claim'lar faqat **imzo va standart claim'lar** (`iss`, `aud`, `exp`) tekshirilgandan keyin ishonchli.",
    "- Token ichidagi rollar **eskirishi** mumkin: foydalanuvchidan admin huquqi olib tashlansa, eski token hali `roles: [\"admin\"]` ni ko'rsatadi. Muhim qarorlar uchun DB'dagi joriy holatni tekshiring yoki token muddatini qisqa qiling.",
    "- Obyekt darajasidagi ruxsatni (20.13) token claim'lari hal qilmaydi: \"42-foydalanuvchi 1002-buyurtmani ko'ra oladimi\" baribir DB va policy.",
    "",
    "### Minimalizm",
    "Token'ga faqat **har so'rovda kerak bo'ladigan** narsalarni qo'ying: identifikator, scope, tenant. Profil ma'lumotlari, ruxsatlarning to'liq ro'yxati, sozlamalar — kerak bo'lganda API yoki keshdan. Kichik token: kam trafik, kam oshkor bo'lish, kam eskirish muammosi."
  ],
  "examples": [
    {
      "title": "Access token claim'lari (RFC 9068 uslubida)",
      "lang": "json",
      "code": [
        "{",
        "  \"iss\": \"https://auth.example.uz\",",
        "  \"sub\": \"01J0ZJ8Q...\",",
        "  \"aud\": \"https://api.example.uz\",",
        "  \"client_id\": \"hisobchi\",",
        "  \"scope\": \"orders:read profile\",",
        "  \"iat\": 1749549600,",
        "  \"exp\": 1749550500,",
        "  \"jti\": \"7f6a3c2e-...\",",
        "  \"tenant_id\": \"t_acme\"",
        "}"
      ]
    },
    {
      "title": "Claim'larni tekshirgandan keyin ishlatish",
      "lang": "php",
      "code": [
        "$claims = $this->jwt->verify($token);   // imzo + iss + aud + exp (22.8)",
        "",
        "$user = User::where('public_id', $claims->sub)->firstOrFail();",
        "",
        "// Muhim amal: token'dagi rolga emas, joriy holatga ishonish",
        "abort_unless($user->can('payments.refund'), 403);",
        "abort_unless(in_array('payments:refund', explode(' ', $claims->scope), true), 403);"
      ]
    }
  ],
  "pitfalls": [
    "Vaqt claim'larini millisekundda yozish: token 50 000 yil amal qiladi yoki darhol eskiradi.",
    "Token'dagi rollarga uzoq muddat davomida tayanish: huquq olib tashlangani ta'sir qilmaydi.",
    "Imzo va `iss`/`aud` tekshirilmasdan claim'larga ishonish.",
    "Token'ga keraksiz ma'lumot qo'yib, uni kattalashtirish."
  ]
});
