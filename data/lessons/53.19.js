/* Chuqur dars: 53.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.19", {
  "lesson": [
    "### Performance regression testing",
    "Yangi kod **avvalgidan sekinroq** bo'lib qolmasligini avtomatik tekshirish (CI'da). Sekinlashish asta-sekin to'planadi (\"minglab kesishish o'limi\").",
    "",
    "### Usullar",
    "1. **So'rovlar soni testi:** endpoint N+1 qaytarmasligi (`DB::getQueryLog()` yoki `assertQueryCount`).",
    "2. **Vaqt chegarasi (budget):** unit/feature testda ma'lum amal < X ms (barqaror muhitda, qiyin).",
    "3. **Yuk testi CI'da:** k6 **thresholds** (`p(95)<300`) — chegara buzilsa build qizil.",
    "4. **Blackfire assertions:** `.blackfire.yaml` testlari (vaqt, so'rovlar soni, xotira) + taqqoslash (oldingi bilan).",
    "5. **Benchmark taqqoslash:** `phpbench` (PHP mikrobenchmark, regressiya).",
    "6. **Lighthouse CI** (frontend: LCP, bundle hajmi).",
    "7. **Bundle size** nazorati.",
    "8. **Production monitoring:** deploydan keyin p95 sakrashi alert, canary.",
    "",
    "### Amaliyot",
    "- **Baseline** saqlash va solishtirish (shovqin uchun foiz chegara: 10–20%).",
    "- Kritik endpoint'lar ro'yxati.",
    "- Barqaror muhit (CI mashina shovqini): nisbiy o'lchov (so'rovlar soni, instruksiya) vaqtdan ishonchliroq.",
    "- Real ma'lumot hajmi.",
    "- Regressiyada qizil build + sabab (`git bisect`).",
    "",
    "### PHPUnit/Pest misoli",
    "```php",
    "it('postlar ro\\'yxati 5 tadan ko\\'p so\\'rov bermaydi', function () {",
    "    Post::factory()->count(20)->hasComments(3)->create();",
    "    DB::enableQueryLog(); $this->getJson('/api/posts')->assertOk();",
    "    expect(DB::getQueryLog())->toHaveCount(3);",
    "});",
    "```",
    "",
    "### Foydasi",
    "Muammo deploydan oldin topiladi (arzon), \"kim sekinlashtirdi\" aniq."
  ],
  "examples": [
    {
      "title": "k6 threshold va test",
      "lang": "bash",
      "code": [
        "# k6: chegara buzilsa chiqish kodi != 0 (CI qizil)",
        "k6 run --thresholds 'http_req_duration=p(95)<300' load.js",
        "vendor/bin/pest --filter=\"so'rovlar soni\""
      ]
    }
  ],
  "pitfalls": [
    "Vaqt bo'yicha (ms) testlar CI shovqinida beqaror: so'rovlar soni/nisbiy o'lchov.",
    "Baseline'siz solishtirish yo'q: oldingi natijani saqlang.",
    "Kichik ma'lumotli testda regressiya ko'rinmaydi.",
    "Regressiya tekshiruvi bo'lmasa sekinlashish asta-sekin to'planadi."
  ]
});
