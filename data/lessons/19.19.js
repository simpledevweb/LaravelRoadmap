/* Chuqur dars: 19.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.19", {
  "lesson": [
    "### Kontrakt testi nima",
    "Oddiy feature test (18.20) \"endpoint to'g'ri ishlaydimi\" ni tekshiradi. **Kontrakt testi** esa \"endpoint **hujjatlangan shartnomaga** mos ishlaydimi\" ni tekshiradi. Odatda shartnoma — OpenAPI spetsifikatsiyasi. Hujjat va kod vaqt o'tishi bilan ajralib ketadi: kimdir maydon qo'shadi, turini o'zgartiradi yoki xato kodini boshqasiga almashtiradi, hujjat esa eski holatda qoladi. Kontrakt testi buni CI'da ushlaydi.",
    "",
    "### Ikki yondashuv",
    "**1. Provider (server) kontrakt testlari.** Server javoblari OpenAPI sxemasiga mosmi:",
    "- Har feature testda so'rov va javob spetsifikatsiyaga qarshi validatsiya qilinadi: majburiy maydonlar, turlar, enum qiymatlari, status kodlar, `nullable`.",
    "- Laravel uchun: `hotmeteor/spectator`, `league/openapi-psr7-validator`, `osteel/openapi-httpfoundation-testing`.",
    "",
    "**2. Consumer-driven contract (CDC) testlari.** Har **iste'molchi** (frontend, mobil, boshqa servis) o'ziga kerakli so'rov va javoblarni \"kontrakt\" (pact) sifatida yozadi. Provider CI'da barcha iste'molchilar kontraktlarini tekshiradi. Vosita: **Pact** (Pact Broker bilan). Afzalligi: provider aniq qaysi maydonlar haqiqatan ishlatilishini biladi va ularni buzmaydi. Mikroservislar arxitekturasida ayniqsa foydali.",
    "",
    "### Spetsifikatsiyaning o'zini tekshirish",
    "- **Lint:** Spectral bilan stil qoidalari (19.1 nomlash, har endpoint'da xato javoblari, misollar mavjudligi).",
    "- **Breaking change detektori:** `oasdiff breaking` har PR'da spetsifikatsiyani `main` bilan solishtiradi va buzuvchi o'zgarishda CI'ni to'xtatadi (19.11).",
    "",
    "### Spetsifikatsiya qayerdan keladi",
    "- **Design-first:** avval OpenAPI yoziladi, kelishiladi, keyin kod. Kontrakt testlari kodni spetsifikatsiyaga moslaydi.",
    "- **Code-first:** spetsifikatsiya koddan generatsiya qilinadi (Scramble, Scribe, L5-Swagger, 75–77). Bu holatda kontrakt testi generatorning to'g'ri ishlashini va qo'lda qo'shilgan izohlar mosligini tekshiradi. Breaking change detektori esa ayniqsa muhim, chunki kod o'zgarishi spetsifikatsiyani jim o'zgartiradi.",
    "",
    "### Nimani qamrash kerak",
    "- Har endpoint'ning muvaffaqiyatli javobi.",
    "- Asosiy xato javoblari (401, 403, 404, 422, 409).",
    "- Paginatsiya meta va links.",
    "- Enum qiymatlari va nullable maydonlar.",
    "",
    "Mavjud feature testlarga validatsiya qo'shish ko'pincha eng arzon yo'l: har `getJson()` dan keyin `->assertValidResponse()`."
  ],
  "examples": [
    {
      "title": "Spectator bilan provider testi",
      "lang": "php",
      "code": [
        "use Spectator\\Spectator;",
        "",
        "beforeEach(fn () => Spectator::using('openapi.yaml'));",
        "",
        "it('matches contract for order show', function () {",
        "    $order = Order::factory()->paid()->create();",
        "    Sanctum::actingAs($order->customer->user, ['orders:read']);",
        "",
        "    $this->getJson(\"/api/v1/orders/{$order->public_id}\")",
        "        ->assertValidRequest()",
        "        ->assertValidResponse(200);",
        "});",
        "",
        "it('matches contract for validation error', function () {",
        "    Sanctum::actingAs(User::factory()->create(), ['orders:write']);",
        "",
        "    $this->postJson('/api/v1/orders', ['items' => []])",
        "        ->assertValidResponse(422);",
        "});"
      ],
      "note": "Spectator spetsifikatsiya faylini `config/spectator.php` dagi manba yo'lidan qidiradi."
    },
    {
      "title": "CI qadamlari",
      "lang": "yaml",
      "code": [
        "# .gitlab-ci.yml (parcha)",
        "api-contract:",
        "  stage: test",
        "  script:",
        "    - npx @stoplight/spectral-cli lint docs/openapi.yaml",
        "    - git fetch origin main",
        "    - git show origin/main:docs/openapi.yaml > /tmp/base.yaml",
        "    - oasdiff breaking /tmp/base.yaml docs/openapi.yaml --fail-on ERR",
        "    - php artisan test --group=contract"
      ]
    }
  ],
  "pitfalls": [
    "OpenAPI hujjatini qo'lda yozib, kod bilan sinxronligini hech qachon tekshirmaslik.",
    "Faqat muvaffaqiyatli javoblarni kontrakt bilan tekshirish: xato formati ajralib ketadi.",
    "Code-first yondashuvda breaking change detektorisiz ishlash: kod o'zgarishi shartnomani jim buzadi.",
    "Spetsifikatsiyada `nullable` va majburiy maydonlarni noto'g'ri belgilash: testlar yolg'on muvaffaqiyat beradi."
  ]
});
