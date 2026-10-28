/* Chuqur dars: 19.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.18", {
  "lesson": [
    "### Nega yozma siyosat",
    "Har API eskiradi: endpoint'lar almashtiriladi, maydonlar qayta loyihalanadi, versiyalar yopiladi. Deprecation siyosati bo'lmasa, ikki yomon natija bo'ladi: yoki eski kod abadiy qoladi (qo'llab-quvvatlash xarajati, xavfsizlik riski), yoki ogohlantirishsiz o'chiriladi (mijozlar ishonchini yo'qotish). **Oldindan e'lon qilingan va izchil siyosat** ikkalasining oldini oladi.",
    "",
    "### Siyosat tarkibi",
    "1. **Nima deprecated bo'lishi mumkin:** endpoint, parametr, maydon, versiya, autentifikatsiya usuli.",
    "2. **Minimal muddat:** e'londan o'chirishgacha. Ommaviy API — 6–12+ oy. Ichki — kelishuv bo'yicha. Xavfsizlik zaifligi uchun istisno (tezkor).",
    "3. **E'lon kanallari:**",
    "   - Changelog va hujjatda belgi (OpenAPI'da `deprecated: true`).",
    "   - Javob header'lari: `Deprecation` (qachondan eskirgan), `Sunset` (RFC 8594, qachon o'chiriladi), `Link: <...>; rel=\"deprecation\"` (migratsiya qo'llanmasi).",
    "   - Faol iste'molchilarga email.",
    "   - Developer portal yoki dashboard'da ogohlantirish.",
    "4. **Migratsiya qo'llanmasi:** nima o'rniga nima, kod misollari bilan.",
    "5. **Monitoring:** kim hali eski narsani ishlatyapti (API klient, foydalanuvchi, ilova versiyasi).",
    "6. **Eslatmalar:** sunset'dan 3 oy, 1 oy, 1 hafta oldin.",
    "7. **Brownout (ixtiyoriy):** sunset'dan oldin qisqa muddatlarga (masalan, 1 soat) eski endpoint'ni o'chirib qo'yish. Hali e'tibor bermagan iste'molchilar xatoni ko'rib, harakat qiladi.",
    "8. **O'chirish:** sunset sanasidan keyin `410 Gone` va migratsiya havolasi bilan. Jim `404` emas.",
    "",
    "### Kuzatish muhimroq",
    "Sana yetib kelganda o'chirishdan oldin trafikni tekshiring. Muhim mijoz hali migratsiya qilmagan bo'lsa, u bilan bevosita bog'laning. Kerak bo'lsa, muddatni uzaytiring. Lekin buni ham e'lon qiling.",
    "",
    "### Laravel'da",
    "- `deprecated` middleware: header'larni qo'shadi va har chaqiruvni log qiladi yoki metrikaga yozadi (klient ID bilan).",
    "- OpenAPI hujjatida (Scribe, Scramble, L5-Swagger, 75–77) `deprecated` belgisi.",
    "- Sunset'dan keyin route `410` qaytaruvchi controller'ga almashtiriladi."
  ],
  "examples": [
    {
      "title": "Deprecated middleware",
      "lang": "php",
      "code": [
        "final class Deprecated",
        "{",
        "    public function handle(Request $request, Closure $next, string $sunset, string $docPath): Response",
        "    {",
        "        Log::channel('deprecations')->info('Deprecated endpoint used', [",
        "            'route' => $request->route()?->getName(),",
        "            'client' => $request->user()?->currentAccessToken()?->name ?? $request->ip(),",
        "            'app_version' => $request->header('X-App-Version'),",
        "        ]);",
        "",
        "        $response = $next($request);",
        "",
        "        $response->headers->set('Deprecation', 'true');",
        "        $response->headers->set('Sunset', Carbon::parse($sunset)->toRfc7231String());",
        "        $response->headers->set('Link', '<' . url($docPath) . '>; rel=\"deprecation\"');",
        "",
        "        return $response;",
        "    }",
        "}",
        "",
        "Route::get('v1/orders/{order}/summary', OrderSummaryController::class)",
        "    ->middleware('deprecated:2026-06-30,/docs/migrate-summary');"
      ]
    },
    {
      "title": "Sunset'dan keyin",
      "lang": "php",
      "code": [
        "Route::any('v1/orders/{order}/summary', fn () => response()->json([",
        "    'code' => 'endpoint_removed',",
        "    'message' => 'Bu endpoint 2026-06-30 da olib tashlangan',",
        "    'migration_guide' => url('/docs/migrate-summary'),",
        "], 410));"
      ]
    }
  ],
  "pitfalls": [
    "Deprecation'ni faqat changelog'da e'lon qilish: ko'p iste'molchilar uni o'qimaydi.",
    "Kim ishlatayotganini o'lchamasdan sunset sanasida o'chirish.",
    "O'chirilgan endpoint uchun `404` qaytarish: mijoz xatoni tushunmaydi. `410` va migratsiya havolasi.",
    "Siyosatni har safar o'zgartirish: iste'molchilar e'lonlarga ishonmay qo'yadi."
  ]
});
