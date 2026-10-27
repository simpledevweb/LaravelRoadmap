/* Chuqur dars: 2.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.16", {
  "lesson": [
    "### Xatolar boshqaruvi",
    "Istisnolar `bootstrap/app.php` → `withExceptions(function (Exceptions $exceptions) { ... })` (L11+; eskida `Handler`) orqali boshqariladi. Ikki vazifa: **report** (log/monitoring) va **render** (foydalanuvchiga javob).",
    "",
    "### Report",
    "- Standart: log kanaliga yozadi.",
    "- `$exceptions->report(function (PaymentFailed $e) { ... })`.",
    "- `$exceptions->dontReport([ModelNotFoundException::class])`.",
    "- `report($e)` helper — yutilgan istisnoni ham yozish.",
    "- Sentry/Flare integratsiyasi shu yerda.",
    "- `throttle`: bir xil xatoni takror yozmaslik.",
    "",
    "### Render",
    "`$exceptions->render(function (PaymentFailed $e, Request $r) { return response()->json([...], 402); })`. Yoki istisno klassida `render()`/`report()` metodlari.",
    "",
    "### HTTP istisnolar",
    "`abort(404)`, `abort(403, 'xabar')`; view: `resources/views/errors/404.blade.php`, `500.blade.php`. `ModelNotFoundException` → 404, `ValidationException` → 422, `AuthenticationException` → 401/login, `AuthorizationException` → 403.",
    "",
    "### Debug",
    "`APP_DEBUG=true` (dev) — Ignition/xato sahifasi. Productionda `false`.",
    "",
    "### API javoblari",
    "`expectsJson()` bo'lsa JSON: `{\"message\": \"...\"}`; xatolarni bir xil formatda (Problem Details/o'z format).",
    "",
    "### Qoidalar",
    "- Ichki tafsilotni (SQL, yo'l) foydalanuvchiga ko'rsatmang.",
    "- Kutilgan biznes xatolar uchun maxsus istisno klasslar.",
    "- Log + monitoring (Sentry): so'rov/foydalanuvchi konteksti bilan."
  ],
  "examples": [
    {
      "title": "withExceptions",
      "lang": "php",
      "code": [
        "->withExceptions(function (Exceptions $exceptions) {",
        "    $exceptions->dontReport([InvalidCoupon::class]);",
        "    $exceptions->render(function (PaymentFailed $e, Request $request) {",
        "        return $request->expectsJson() ? response()->json(['message' => 'To\\'lov amalga oshmadi'], 402) : null;",
        "    });",
        "    $exceptions->report(fn (PaymentFailed $e) => Log::channel('payments')->error($e->getMessage()));",
        "})"
      ]
    }
  ],
  "pitfalls": [
    "Productionda `APP_DEBUG=true` stack trace va env'ni oshkor qiladi.",
    "Foydalanuvchiga `getMessage()` (SQL xatosi) ko'rsatish ichki ma'lumotni sizdiradi.",
    "Yutilgan istisnoni (catch) log qilmaslik muammoni yashiradi: `report($e)`.",
    "Barcha istisnolarni bir xil 500 qilib qaytarish mijozga foydali emas: to'g'ri HTTP status."
  ]
});
