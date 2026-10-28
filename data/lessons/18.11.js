/* Chuqur dars: 18.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.11", {
  "lesson": [
    "### API'da cursor pagination",
    "DB darajasidagi keyset paginatsiya (16.11) API'da **cursor** sifatida ochiladi. Server har sahifa javobida `next_cursor` qaytaradi: oxirgi elementning tartib kalitlari (masalan, `created_at` va `id`) kodlangan satr. Mijoz keyingi sahifa uchun shu cursor'ni yuboradi va ichini tushunishi shart emas.",
    "",
    "### Afzalliklari",
    "- **Doimiy tezlik:** 1-sahifa ham, 10 000-sahifa ham bir xil tez. Server indeks bo'yicha to'g'ridan-to'g'ri kerakli joyga o'tadi.",
    "- **Barqarorlik:** foydalanuvchi lentani o'qiyotganda yangi yozuvlar qo'shilsa yoki o'chirilsa, dublikat yoki tushib qolgan elementlar bo'lmaydi. Offset'da bu tez-tez uchraydigan xato.",
    "- **COUNT(*) yo'q:** katta jadvalda og'ir `COUNT` so'rovi bajarilmaydi.",
    "",
    "Shuning uchun ijtimoiy lentalar, bildirishnomalar, chat tarixi, voqealar logi, sinxronizatsiya API'lari va mobil cheksiz scroll uchun ideal.",
    "",
    "### Kamchiliklari",
    "- Sahifa raqami yo'q: \"57-sahifaga o'tish\" imkonsiz.",
    "- Umumiy son (`total`) yo'q. Kerak bo'lsa, alohida endpoint yoki taxminiy son.",
    "- Tartib kaliti unikal va indekslangan bo'lishi kerak. Ixtiyoriy saralash (foydalanuvchi har qanday ustunni tanlaydi) qiyinlashadi: har saralash varianti uchun mos indeks kerak.",
    "",
    "### Cursor'ni shaffof bo'lmagan qiling",
    "Cursor ichida nima borligini mijoz bilmasligi va unga tayanmasligi kerak. Base64 bilan kodlang. Laravel aynan shunday qiladi. Sabablar: ichki tuzilmani keyin o'zgartirish imkoni (boshqa kalitlar qo'shish) va mijoz cursor'ni qo'lda yasab, kutilmagan so'rov yubormasligi. Juda qat'iy holatlarda cursor'ni imzolash (HMAC) yoki shifrlash mumkin.",
    "",
    "Cursor ichidagi qiymatlar baribir foydalanuvchi kiritishi: server ularni dekodlab, validatsiya qilishi kerak. Noto'g'ri cursor — `400`.",
    "",
    "### Laravel cursorPaginate",
    "`->cursorPaginate(50)`:",
    "- `orderBy` dagi barcha ustunlar asosida `WHERE (created_at, id) < (?, ?)` yaratadi.",
    "- Javob `meta` sida `next_cursor`, `prev_cursor`, `per_page`, `path`, `links` da `next`, `prev` URL'lari.",
    "- Mijoz `?cursor=...` parametrini yuboradi.",
    "- Ikki yo'nalishda ishlaydi.",
    "- Cheklov: tartib ustunlari natijada bo'lishi va null bo'lmasligi kerak. Hisoblangan ifoda yoki munosabat ustuni bo'yicha saralash qo'llanmaydi.",
    "",
    "### Sinxronizatsiya API'lari",
    "\"Oxirgi sinxronizatsiyadan beri nima o'zgardi\" uchun `updated_at` + `id` bo'yicha cursor. Mijoz oxirgi cursor'ni saqlaydi va keyingi safar shundan davom etadi. O'chirilgan yozuvlar uchun soft delete yoki alohida \"tombstone\" ro'yxati kerak."
  ],
  "examples": [
    {
      "title": "Laravel endpoint va javob",
      "lang": "php",
      "code": [
        "public function index(Request $request)",
        "{",
        "    $notifications = $request->user()->notifications()",
        "        ->select(['id', 'type', 'data', 'read_at', 'created_at'])",
        "        ->orderByDesc('created_at')",
        "        ->orderByDesc('id')",
        "        ->cursorPaginate(min($request->integer('per_page', 30), 100));",
        "",
        "    return NotificationResource::collection($notifications);",
        "}",
        "",
        "// Migratsiya: mos indeks",
        "$table->index(['notifiable_type', 'notifiable_id', 'created_at', 'id']);"
      ]
    },
    {
      "title": "Javob tuzilmasi",
      "lang": "json",
      "code": [
        "{",
        "  \"data\": [ { \"id\": \"9b1...\", \"type\": \"order.shipped\", \"created_at\": \"2025-06-10T08:12:00Z\" } ],",
        "  \"links\": {",
        "    \"first\": null, \"last\": null,",
        "    \"prev\": null,",
        "    \"next\": \"https://api.example.uz/v1/notifications?cursor=eyJjcmVhdGVkX2F0Ijoi...\"",
        "  },",
        "  \"meta\": {",
        "    \"path\": \"https://api.example.uz/v1/notifications\",",
        "    \"per_page\": 30,",
        "    \"next_cursor\": \"eyJjcmVhdGVkX2F0Ijoi...\",",
        "    \"prev_cursor\": null",
        "  }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Faqat takrorlanuvchi ustun (`created_at`) bo'yicha cursor: bir xil vaqtli elementlar yo'qoladi yoki takrorlanadi.",
    "Tartibga mos composite indeks yaratmaslik: cursor ham sekin ishlaydi.",
    "Mijozlarga cursor ichini dekodlab ishlatishga ruxsat berish: ichki tuzilmani o'zgartirib bo'lmaydi.",
    "Admin jadvalidagi sahifa raqamlari kerak bo'lgan joyda cursor ishlatish: foydalanuvchi tajribasi yomonlashadi."
  ]
});
