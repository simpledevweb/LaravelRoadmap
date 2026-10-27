/* Chuqur dars: 2.30. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.30", {
  "lesson": [
    "### Http Facade",
    "Guzzle ustida qulay HTTP klient: `Http::get/post/put/patch/delete($url, $data)`.",
    "",
    "### So'rovni sozlash",
    "`withHeaders([...])`, `withToken($t)`, `withBasicAuth()`, `acceptJson()`, `asJson()` (default), `asForm()`, `attach('file', $contents, 'a.pdf')`, `baseUrl()`, `timeout(5)`, `connectTimeout(2)`, `withQueryParameters()`, `withOptions([...])`.",
    "",
    "### Javobni o'qish",
    "`->json('key')`, `->body()`, `->status()`, `->ok()`, `->successful()`, `->failed()`, `->clientError()`, `->serverError()`, `->header()`, `->collect()`.",
    "",
    "### Xatolar",
    "Standart: 4xx/5xx istisno **tashlamaydi**. `->throw()` (yoki `throwIf`) `RequestException` tashlaydi. Tarmoq xatosi `ConnectionException`.",
    "",
    "### Retry",
    "`->retry(3, 200)` (3 urinish, 200 ms), `retry(3, fn ($attempt) => $attempt * 100, when: fn ($e) => $e->response?->serverError())`. Idempotent so'rovlargina (GET); to'lov POST'larini ehtiyot qiling.",
    "",
    "### Parallel",
    "`Http::pool(fn (Pool $p) => [$p->get($a), $p->get($b)])` — bir vaqtda.",
    "",
    "### Test",
    "`Http::fake(['api.x.com/*' => Http::response(['ok' => true], 200)])`, `Http::assertSent(...)`, `Http::preventStrayRequests()` (haqiqiy so'rovga yo'l qo'ymaslik), `Http::sequence()`.",
    "",
    "### Makro va middleware",
    "`Http::macro('github', fn () => Http::baseUrl(...)->withToken(...))`; global request/response middleware (`Http::globalMiddleware`).",
    "",
    "### Qoidalar",
    "Doim `timeout`, xatoni boshqaring (`throw`/status tekshiruv), sirlarni logga yozmang, tashqi API chaqiruvini queue'ga bering."
  ],
  "examples": [
    {
      "title": "Mijoz",
      "lang": "php",
      "code": [
        "$response = Http::baseUrl('https://api.example.com')",
        "    ->withToken(config('services.example.key'))",
        "    ->timeout(5)",
        "    ->retry(3, 200, throw: false)",
        "    ->post('/orders', ['sku' => 'A1', 'qty' => 2]);",
        "",
        "if ($response->failed()) { throw new ApiError($response->status()); }",
        "$id = $response->json('data.id');",
        "",
        "Http::fake(['api.example.com/*' => Http::response(['data' => ['id' => 1]], 201)]);"
      ]
    }
  ],
  "pitfalls": [
    "`timeout` bermasa so'rov uzoq osilib qoladi.",
    "`retry` idempotent bo'lmagan POST'da (to'lov) dublikat yaratishi mumkin.",
    "4xx/5xx `throw()` siz istisno bermaydi: status tekshiring.",
    "Testda `Http::fake` bo'lmasa haqiqiy tashqi API chaqiriladi: `preventStrayRequests()`."
  ]
});
