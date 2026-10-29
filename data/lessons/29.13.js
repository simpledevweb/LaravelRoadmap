/* Chuqur dars: 29.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("29.13", {
  "lesson": [
    "### Xato holatlarini ham testlang",
    "Ko'p testlar faqat baxtli yo'lni qamraydi. Lekin foydalanuvchi ko'proq xato bilan uchrashadi: topilmagan resurs, ruxsatsiz amal, noto'g'ri biznes holat, tashqi servis yiqilishi, kutilmagan exception. Xato javoblarining **formati va xavfsizligi** ham ilovaning bir qismi.",
    "",
    "### Nimani tekshirish kerak",
    "- **404**: mavjud bo'lmagan resurs standart xato formatida (JSON uchun izchil tuzilma).",
    "- **Domen exception**: biznes qoidasi buzilsa (masalan, `InsufficientStock`), to'g'ri status (`422`, `409`) va tushunarli xabar/kod.",
    "- **Kutilmagan xato (500)**: mijozga ichki tafsilot (stack trace, SQL) chiqmaydi. Production rejimida `APP_DEBUG=false`.",
    "- **Tashqi servis yiqilsa**: `Http::fake` bilan `500` yoki timeout, ilova graceful javob beradi (`503`, qayta urinish) va ichki xatoni oshkor qilmaydi.",
    "- **Report qilish**: muhim xatolar log/Sentry'ga yuboriladi.",
    "",
    "### Exceptions::fake()",
    "Laravel 11+ da `Exceptions::fake()` exception'larni ushlab turadi va `Exceptions::assertReported(GatewayUnavailable::class)` bilan report qilinganini tekshiradi. Bu xatolar to'g'ri kuzatuvga tushishini kafolatlaydi.",
    "",
    "### withoutExceptionHandling",
    "Bu debug uchun qulay: asl exception ko'rinadi. Lekin xato **formatini** testlayotganda handler **yoqiq** bo'lishi shart, aks holda exception to'g'ridan-to'g'ri otiladi va siz javob formatini ko'rmaysiz.",
    "",
    "### Izchil format",
    "Barcha xatolar bir xil tuzilmada (masalan, `code`, `message`, `errors`) qaytishini testlang. Frontend va API iste'molchilari shu shartnomaga tayanadi. RFC 7807 (problem details) kabi standartdan foydalansangiz, `Content-Type` va maydonlarni ham tekshiring."
  ],
  "examples": [
    {
      "title": "Tashqi servis yiqildi",
      "lang": "php",
      "code": [
        "it('returns a graceful 503 and reports the failure when the gateway is down', function () {",
        "    Http::fake(['api.payme.uz/*' => Http::response(status: 503)]);",
        "    Exceptions::fake();",
        "",
        "    $this->actingAs($user)->postJson('/api/payments', $payload)",
        "        ->assertStatus(503)",
        "        ->assertJsonPath('code', 'gateway_unavailable')",
        "        ->assertJsonMissingPath('trace');",
        "",
        "    Exceptions::assertReported(GatewayUnavailable::class);",
        "});"
      ],
      "note": "Javob formati, ichki ma'lumot chiqmasligi va report qilinishi birga tekshiriladi."
    },
    {
      "title": "Domen xatosi va 404",
      "lang": "php",
      "code": [
        "it('maps insufficient stock to 422 with a code', function () {",
        "    $product = Product::factory()->create(['stock' => 1]);",
        "",
        "    $this->actingAs($user)",
        "        ->postJson('/api/orders', ['items' => [['product_id' => $product->id, 'qty' => 5]]])",
        "        ->assertUnprocessable()",
        "        ->assertJsonPath('code', 'insufficient_stock');",
        "});",
        "",
        "it('returns a consistent 404 body', function () {",
        "    $this->actingAs($user)->getJson('/api/orders/999999')",
        "        ->assertNotFound()",
        "        ->assertJsonStructure(['code', 'message']);",
        "});"
      ],
      "note": "Xato kodlari klientlar tayanadigan shartnomaning bir qismi."
    }
  ],
  "pitfalls": [
    "Faqat baxtli yo'lni testlash: xato holatlari productionda birinchi marta ko'rinadi.",
    "Xato formati testida `withoutExceptionHandling()` qoldirish: javob formati umuman tekshirilmaydi.",
    "Production xatosida stack trace yoki SQL ko'rinishini tekshirmaslik: ichki ma'lumot sizib chiqadi.",
    "Exception report qilinishini testlamaslik: xato jim yutiladi va hech kim bilmaydi."
  ]
});
