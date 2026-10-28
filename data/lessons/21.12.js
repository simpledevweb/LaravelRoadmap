/* Chuqur dars: 21.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("21.12", {
  "lesson": [
    "### `state` nima",
    "`state` — client har avtorizatsiya so'rovi uchun yaratadigan **tasodifiy, taxmin qilib bo'lmaydigan** qiymat. Client uni `/authorize` ga yuboradi va foydalanuvchi session'ida saqlaydi. AS callback'da uni o'zgarishsiz qaytaradi. Client callback'dagi `state` ni session'dagi bilan solishtiradi va mos kelmasa, so'rovni rad etadi.",
    "",
    "### Qaysi hujumdan himoya: login CSRF",
    "1. Hujumchi o'z akkaunti bilan OAuth flow'ni boshlaydi va callback URL'ini **o'z** code'i bilan oladi, lekin ishlatmaydi: `https://client.uz/callback?code=ATTACKER_CODE`.",
    "2. Bu havolani qurbonga yuboradi yoki sahifaga yashirin `<img>` sifatida joylaydi.",
    "3. Qurbonning brauzeri callback'ni ochadi va client code'ni almashtirib, qurbonni **hujumchining akkauntiga** kiritadi.",
    "4. Qurbon bilmasdan hujumchi akkauntida ishlaydi: karta ma'lumotlarini kiritadi, hujjat yuklaydi, qidiruvlar qiladi. Hujumchi bularni keyin o'z akkauntida ko'radi.",
    "",
    "Yoki: qurbonning ilovadagi akkauntiga hujumchining tashqi akkaunti **ulanadi** (\"Google bilan bog'lash\"), keyin hujumchi o'z Google akkaunti orqali qurbon akkauntiga kiradi.",
    "",
    "`state` bilan: qurbon session'ida bunday `state` yo'q, shuning uchun client rad etadi.",
    "",
    "### To'g'ri ishlatish",
    "- Har flow uchun **yangi** qiymat (kamida 128 bit entropiya): `Str::random(40)` yoki `bin2hex(random_bytes(16))`.",
    "- **Foydalanuvchi session'iga** bog'langan (yoki imzolangan cookie). Global yoki umumiy keshda emas.",
    "- Callback'da **bir martalik**: tekshirilgandan keyin session'dan o'chiriladi (`pull`).",
    "- Taqqoslash `hash_equals()` bilan.",
    "- Callback'da `state` yo'q yoki bo'sh bo'lsa — rad.",
    "",
    "### Qo'shimcha ma'lumot tashish",
    "`state` ichida flow'dan keyin kerak bo'ladigan ma'lumot (qaytish manzili) tashilishi mumkin, lekin faqat **imzolangan yoki shifrlangan** holda yoki session'da `state` kaliti bilan bog'lab. Ochiq JSON'ni `state` ga qo'yish uni taxmin qilinadigan va o'zgartiriladigan qiladi.",
    "",
    "### PKCE va nonce bilan munosabat",
    "- **PKCE** (21.3) ham CSRF'ning bir qismini oldini oladi: hujumchining code'i qurbonning `code_verifier` i bilan almashtirilmaydi. OAuth 2.1 PKCE bo'lsa, `state` ni CSRF uchun majburiy emas deydi, lekin amalda ikkalasini birga ishlatish tavsiya etiladi: `state` boshqa maqsadlar uchun ham kerak va eski AS'lar PKCE'ni to'liq tekshirmasligi mumkin.",
    "- **OIDC `nonce`:** ID token'ga bog'langan, token replay va injection'dan himoya. `state` o'rnini bosmaydi.",
    "",
    "### Laravel Socialite",
    "Socialite `state` ni avtomatik yaratadi, session'da saqlaydi va callback'da tekshiradi (mos kelmasa `InvalidStateException`). `->stateless()` bu himoyani **o'chiradi**. Uni faqat session yo'q API kontekstida va boshqa himoya (PKCE, o'zingizning imzolangan state) bilan ishlating."
  ],
  "examples": [
    {
      "title": "Login CSRF ssenariysi",
      "lang": "text",
      "code": [
        "Hujumchi:  /oauth/redirect -> AS login (hujumchi akkaunti) -> callback?code=XYZ (to'xtatadi)",
        "",
        "Qurbon sahifasida:",
        "  <img src=\"https://client.uz/oauth/callback?code=XYZ\">",
        "",
        "state'siz:  client XYZ ni almashtiradi -> qurbon hujumchi akkauntiga kiradi",
        "state bilan: qurbon session'ida state yo'q -> 403"
      ]
    },
    {
      "title": "Socialite: default himoya va stateless xavfi",
      "lang": "php",
      "code": [
        "// To'g'ri: state avtomatik",
        "Route::get('auth/github', fn () => Socialite::driver('github')->redirect());",
        "",
        "Route::get('auth/github/callback', function () {",
        "    try {",
        "        $gh = Socialite::driver('github')->user();",
        "    } catch (\\Laravel\\Socialite\\Two\\InvalidStateException) {",
        "        return redirect('/login')->withErrors(['oauth' => 'Sessiya muddati tugadi, qayta urining']);",
        "    }",
        "    // ...",
        "});",
        "",
        "// XAVFLI: CSRF himoyasi yo'q",
        "Socialite::driver('github')->stateless()->user();"
      ]
    }
  ],
  "pitfalls": [
    "`state` ni umuman ishlatmaslik yoki callback'da tekshirmaslik.",
    "Doimiy yoki taxmin qilinadigan `state` (`state=1`, foydalanuvchi ID).",
    "Socialite'da `stateless()` ni oddiy web login'da ishlatish.",
    "`state` ni tekshirgandan keyin session'dan o'chirmaslik: qayta ishlatish mumkin bo'ladi."
  ]
});
