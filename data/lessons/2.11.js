/* Chuqur dars: 2.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.11", {
  "lesson": [
    "### Request",
    "`Illuminate\\Http\\Request` (Symfony HttpFoundation ustida): kiritma, header, fayl, foydalanuvchi.",
    "- Kiritma: `input('name', 'default')`, `query()`, `post()`, `all()`, `only([...])`, `except([...])`, `has()`, `filled()`, `string()/integer()/boolean()/date()` (tiplangan), `collect()`.",
    "- JSON: `$request->json('key')` yoki `input` (Content-Type: application/json).",
    "- Fayl: `file('rasm')`, `hasFile()`, `store()`.",
    "- Meta: `method()`, `url()`, `path()`, `ip()`, `header()`, `bearerToken()`, `user()`, `expectsJson()`, `wantsJson()`.",
    "",
    "### Response",
    "Qaytarish qiymati javobga aylanadi: string → HTML; massiv/Collection/Model → JSON; `view()`, `redirect()`, `response()->json($data, 201)`, `->noContent()`, `->download()`, `->streamDownload()`, `->stream()`, `response()->file()`.",
    "- Header/cookie: `->header('X', 'y')`, `->cookie(...)`.",
    "- `abort(404)`, `abort_if()`, `abort_unless()`.",
    "- `Responsable` interface: obyekt o'zi javob yasaydi.",
    "",
    "### Content negotiation",
    "`$request->expectsJson()` bo'yicha API (JSON) va web (HTML) javobini tanlash. `Accept: application/json` yuborilsa validatsiya xatosi 422 JSON, redirect emas.",
    "",
    "### Trusted proxies",
    "Load balancer ortida `X-Forwarded-*` uchun `trustProxies` (HTTPS/IP to'g'ri aniqlansin).",
    "",
    "### Qoida",
    "`$request->validated()` ishlating, `all()` ni to'g'ridan saqlashga bermang."
  ],
  "examples": [
    {
      "title": "Request va Response",
      "lang": "php",
      "code": [
        "public function store(Request $r): JsonResponse",
        "{",
        "    $name = $r->string('name')->trim()->toString();",
        "    $age  = $r->integer('age');",
        "    $only = $r->only(['name', 'email']);",
        "    return response()->json(['ok' => true, 'name' => $name], 201);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`$request->all()` ni create/update'ga berish mass assignment xavfi.",
    "Load balancer ortida trusted proxies sozlanmasa `$request->ip()`/`isSecure()` noto'g'ri.",
    "`input()` JSON va forma'ni aralashtiradi: Content-Type'ga e'tibor bering.",
    "`response()->json()` katta Collection'ni to'liq xotiraga oladi: paginatsiya/stream."
  ]
});
