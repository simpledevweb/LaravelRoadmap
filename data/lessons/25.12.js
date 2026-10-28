/* Chuqur dars: 25.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.12", {
  "lesson": [
    "### PHPUnit'da integratsiya testi",
    "Integratsiya testi bir nechta komponentning **birgalikda** to'g'ri ishlashini tekshiradi: servis + repository + haqiqiy DB, queue job + Eloquent + kesh, sizning HTTP klient adapteringiz + soxta server. Nazariya 28.x da. Bu yerda PHPUnit va Laravel amaliyoti.",
    "",
    "### Unit va integratsiya chegarasi",
    "- Unit (25.11): bitta klass, bog'liqliklar soxta, DB yo'q.",
    "- **Integratsiya:** haqiqiy bog'liqliklar (DB, kesh, fayl tizimi), lekin **tashqi** tizimlar (to'lov shlyuzi, SMS) hali ham soxta.",
    "- Feature (29.x): butun HTTP so'rov-javob sikli.",
    "",
    "Laravel'da integratsiya testlari ko'pincha `tests/Feature` da yoki alohida `tests/Integration` papkasida, `Tests\\TestCase` dan meros olib, `RefreshDatabase` bilan.",
    "",
    "### Nimani integratsiya testi bilan tekshirish",
    "- **Murakkab Eloquent so'rovlari va scope'lar:** haqiqiy DB'da to'g'ri natija beradimi (SQLite va MySQL farqlari, 25.13).",
    "- **Repository'lar** va raw SQL (13.21).",
    "- **Tranzaksiyalar va lock'lar:** rollback haqiqatan ishlaydimi.",
    "- **Queue job'lari:** `handle()` ni to'g'ridan-to'g'ri chaqirib, DB holatini tekshirish.",
    "- **Event va listener zanjirlari:** `Event::fake()` siz, haqiqiy listener'lar bilan.",
    "- **Tashqi API adapterlari:** `Http::fake()` bilan haqiqiy javob namunalari (fixtures) ga qarshi. Adapter so'rovni to'g'ri yasaydimi va javobni to'g'ri parse qiladimi.",
    "- **Kesh mantiqi:** haqiqiy (array yoki Redis) kesh driver bilan.",
    "- **Fayl yuklash va qayta ishlash:** `Storage::fake()` bilan.",
    "",
    "### Tashqi servislar uchun kontrakt",
    "`Http::fake()` bilan adapterni test qilish yaxshi, lekin javob namunalari eskirishi mumkin. Qo'shimcha: kamdan-kam (masalan, kecha) ishga tushadigan \"live\" testlar provayder sandbox'iga qarshi, alohida guruhda (`#[Group('external')]`) va asosiy CI'dan tashqarida.",
    "",
    "### Tezlik",
    "Integratsiya testlari unit'dan sekinroq (DB). Ularni tezlashtirish:",
    "- `RefreshDatabase` (migratsiyalar bir marta, har test tranzaksiyada).",
    "- Parallel ishga tushirish (`php artisan test --parallel`).",
    "- Minimal fixture'lar.",
    "- Faqat kerakli joyda haqiqiy bog'liqlik."
  ],
  "examples": [
    {
      "title": "Scope va so'rov integratsiya testi",
      "lang": "php",
      "code": [
        "final class OrderVisibilityTest extends TestCase",
        "{",
        "    use RefreshDatabase;",
        "",
        "    public function test_manager_sees_only_branch_orders(): void",
        "    {",
        "        $branch = Branch::factory()->create();",
        "        $manager = User::factory()->for($branch)->withPermission('orders.view-branch')->create();",
        "",
        "        $visible = Order::factory()->count(3)->for($branch)->create(['tenant_id' => $manager->tenant_id]);",
        "        Order::factory()->count(2)->create(['tenant_id' => $manager->tenant_id]);   // boshqa filial",
        "        Order::factory()->create();                                                // boshqa tenant",
        "",
        "        $result = Order::visibleTo($manager)->pluck('id');",
        "",
        "        $this->assertEqualsCanonicalizing($visible->pluck('id')->all(), $result->all());",
        "    }",
        "}"
      ]
    },
    {
      "title": "Tashqi API adapteri: Http::fake va fixture",
      "lang": "php",
      "code": [
        "public function test_parses_exchange_rates_response(): void",
        "{",
        "    Http::preventStrayRequests();",
        "    Http::fake([",
        "        'cbu.uz/*' => Http::response(",
        "            json_decode(file_get_contents(base_path('tests/Fixtures/cbu/rates.json')), true)",
        "        ),",
        "    ]);",
        "",
        "    $rates = app(CbuRatesClient::class)->latest();",
        "",
        "    $this->assertSame(12650.85, $rates->for('USD'));",
        "    Http::assertSent(fn ($r) => str_contains($r->url(), '/arkhiv-kursov-valyut/json/'));",
        "}"
      ],
      "note": "URL yo'li va javob formati namunaviy. Haqiqiy provayder hujjatiga va haqiqiy javob namunasiga moslang."
    }
  ],
  "pitfalls": [
    "Integratsiya testlarida ham DB'ni mock qilish: haqiqiy SQL xatolari ushlanmaydi.",
    "Tashqi to'lov yoki SMS servisiga testlardan haqiqiy so'rov yuborish.",
    "`Http::preventStrayRequests()` siz: kutilmagan haqiqiy so'rovlar sezilmaydi.",
    "Faqat integratsiya testlari yozib, mantiqni unit darajasida test qilmaslik: test to'plami sekin."
  ]
});
