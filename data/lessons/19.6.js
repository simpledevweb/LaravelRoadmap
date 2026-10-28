/* Chuqur dars: 19.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.6", {
  "lesson": [
    "### Izchillik — dizayn qarori, tasodif emas",
    "18.5 da javob tuzilmasi elementlari ko'rib chiqildi. Dizayn nuqtai nazaridan asosiy vazifa — bu qoidalarni **bir marta hal qilib, butun API'da majburlash**. Har endpoint alohida dasturchi tomonidan alohida vaqtda yoziladi. Umumiy qoida va umumiy kod bo'lmasa, sekin-asta har xil shakllar paydo bo'ladi.",
    "",
    "### Hal qilinadigan savollar ro'yxati",
    "1. **O'ram:** resurs `data` ichidami yoki to'g'ridan-to'g'ri? Kolleksiyada `data` + `meta` + `links`?",
    "2. **Nomlash:** `snake_case` yoki `camelCase`?",
    "3. **ID:** son yoki string? Prefiksli? Har resursda `id` va ixtiyoriy `type`?",
    "4. **Sana:** ISO 8601 UTC (`Z` bilan)? Faqat sana uchun `YYYY-MM-DD`?",
    "5. **Pul:** `{amount, currency}` obyekti? `amount` butun son (minimal birlikda) yoki decimal string?",
    "6. **Enum:** string qiymat? Label ham kerakmi?",
    "7. **Null:** maydon `null` bilan qaytariladimi yoki tushirib qoldiriladimi?",
    "8. **Bo'sh kolleksiya:** `[]` (hech qachon `null` emas).",
    "9. **Munosabatlar:** ichma-ich obyekt, faqat ID yoki `include` bo'yicha?",
    "10. **Meta:** `request_id`, API versiyasi?",
    "",
    "Javoblarni API stil qo'llanmasiga yozing va OpenAPI'da umumiy sxemalar (`Money`, `Timestamp`, `PaginationMeta`) sifatida aniqlang.",
    "",
    "### Kod bilan majburlash",
    "- **Bazaviy Resource klassi:** `money()`, `date()`, `enum()` yordamchilari (18.17). Har Resource undan meros oladi.",
    "- **Barcha javoblar Resource orqali.** Controller'dan `response()->json($model)` yoki massiv qaytarish taqiqlanadi. Buni code review'da va arxitektura testlarida (Pest `arch()`) tekshirish mumkin.",
    "- **Xato formati markazda** (18.13): `bootstrap/app.php` dagi exception render.",
    "- **Kontrakt testlari** (19.19): javob OpenAPI sxemasiga mosmi.",
    "",
    "### Mijoz uchun foydasi",
    "Izchil API'da mijoz bitta umumiy qatlam yozadi: HTTP interceptor (`data` ni ochadi, xatolarni bir xil qayta ishlaydi), umumiy paginatsiya komponenti, sana va pul formatlovchi, SDK generatsiyasi (OpenAPI Generator). Har yangi endpoint qo'shimcha kodsiz ishlaydi.",
    "",
    "### Istisnolar",
    "Fayl yuklab olish, CSV eksport, webhook javoblari va health check o'z formatida bo'lishi mumkin. Lekin ular ham hujjatlangan istisno bo'lsin."
  ],
  "examples": [
    {
      "title": "Arxitektura testi: controller'lar faqat Resource qaytaradi",
      "lang": "php",
      "code": [
        "// tests/Arch/ApiTest.php (Pest 2+)",
        "arch('api controllers do not return raw models')",
        "    ->expect('App\\Http\\Controllers\\Api')",
        "    ->not->toUse(['Illuminate\\Support\\Facades\\Response'])",
        "    ->and('App\\Http\\Resources')",
        "    ->toExtend('App\\Http\\Resources\\ApiResource');"
      ],
      "note": "Bu qisman tekshiruv. Asosiy himoya — code review va kontrakt testlari."
    },
    {
      "title": "OpenAPI umumiy sxemalari",
      "lang": "yaml",
      "code": [
        "components:",
        "  schemas:",
        "    Money:",
        "      type: object",
        "      required: [amount, currency]",
        "      properties:",
        "        amount: { type: integer, example: 150000 }",
        "        currency: { type: string, enum: [UZS, USD], example: UZS }",
        "    Timestamp:",
        "      type: string",
        "      format: date-time",
        "      example: '2025-06-01T09:30:00Z'",
        "    CursorMeta:",
        "      type: object",
        "      properties:",
        "        per_page: { type: integer }",
        "        next_cursor: { type: string, nullable: true }",
        "        prev_cursor: { type: string, nullable: true }"
      ]
    }
  ],
  "pitfalls": [
    "Qoidalarni yozmasdan \"hamma biladi\" deb qoldirish: har jamoa a'zosi o'z formatini yaratadi.",
    "Ba'zi endpoint'larda Resource, ba'zilarida xom massiv qaytarish.",
    "Bir xil tushuncha (pul, sana) uchun turli endpoint'larda turli format.",
    "Bo'sh kolleksiya uchun `null` qaytarish."
  ]
});
