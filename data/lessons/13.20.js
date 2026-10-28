/* Chuqur dars: 13.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.20", {
  "lesson": [
    "### Muammo: parallel yangilash",
    "Ikki so'rov bir vaqtda bir yozuvni o'qiydi, PHP'da o'zgartiradi va saqlaydi. Ikkinchisi birinchisining o'zgarishini ustidan yozadi (**lost update**). Misollar: oxirgi mahsulotni ikki kishi sotib oladi, ikki menejer bir hujjatni tahrirlaydi, balansdan ikki marta yechiladi.",
    "",
    "Eng oddiy yechim — **atomar UPDATE**: `decrement('stock')` va `where('stock', '>', 0)`. Mantiq bitta SQL'ga sig'sa, lock kerak emas. Sig'masa, ikki strategiya bor.",
    "",
    "### Pessimistic locking",
    "\"Ziddiyat bo'ladi deb hisobla va oldindan qulfla.\" Qatorni o'qishda lock olinadi, boshqalar tranzaksiya tugaguncha kutadi.",
    "- `lockForUpdate()` → `SELECT ... FOR UPDATE`: eksklyuziv. Boshqalar na yangilay, na `FOR UPDATE` bilan o'qiy oladi.",
    "- `sharedLock()` → `FOR SHARE` (MySQL'da `LOCK IN SHARE MODE`): boshqalar o'qiy oladi, lekin o'zgartira olmaydi.",
    "- Laravel 9+: `->skipLocked()`, `->noWait()` (driver qo'llasa).",
    "",
    "**Faqat tranzaksiya ichida ma'noga ega.** Autocommit rejimida lock darhol qo'yib yuboriladi.",
    "",
    "Mos keladi: ziddiyat ehtimoli yuqori, qisqa kritik bo'lim (pul, ombor qoldig'i, navbatdan ish olish). Kamchiligi: kutish, deadlock xavfi (13.19 va 11.12), masshtablashda tor joy.",
    "",
    "### Optimistic locking",
    "\"Ziddiyat kam bo'ladi deb hisobla, saqlashda tekshir.\" Jadvalda `version` (int) ustuni bo'ladi:",
    "1. O'qishda versiya olinadi (masalan, 7).",
    "2. Saqlashda: `UPDATE ... SET ..., version = 8 WHERE id = ? AND version = 7`.",
    "3. Ta'sirlangan qatorlar soni 0 bo'lsa, kimdir oldinroq o'zgartirgan. Foydalanuvchiga ziddiyatni ko'rsatish yoki qayta urinish.",
    "",
    "Eloquent'da ichki qo'llanmaydi, lekin oddiy amalga oshiriladi. `updated_at` ni versiya sifatida ishlatish ham mumkin, lekin soniya aniqligi muammo bo'lishi mumkin.",
    "",
    "Mos keladi: uzoq \"o'qish → o'ylash → saqlash\" sikli (forma tahriri, admin panel), ziddiyat kam, lock ushlab turish imkonsiz (HTTP so'rovlar orasida). Web'da tahrir formasi uchun ko'pincha yagona to'g'ri yo'l: formaga yashirin `version` maydoni qo'shiladi.",
    "",
    "### Taqsimlangan lock",
    "Bir nechta DB yozuvi yoki tashqi resurs (fayl, API) uchun: `Cache::lock('report:42', 10)->block(5, fn () => ...)`. Redis yoki DB asosida ishlaydi. DB qatoriga bog'liq bo'lmagan kritik bo'limlar uchun. Advisory lock'lar (`pg_advisory_xact_lock`) PostgreSQL'da yana bir variant.",
    "",
    "### Tanlash",
    "| Holat | Yechim |",
    "|---|---|",
    "| Bitta SQL bilan ifodalanadi | atomar UPDATE |",
    "| Qisqa, ziddiyat ko'p | pessimistic |",
    "| Uzoq, foydalanuvchi tahriri | optimistic |",
    "| Bir nechta resurs yoki tashqi tizim | distributed lock |"
  ],
  "examples": [
    {
      "title": "Pessimistic: balansdan yechish",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($walletId, $amount) {",
        "    $wallet = Wallet::whereKey($walletId)->lockForUpdate()->firstOrFail();",
        "",
        "    if ($wallet->balance < $amount) {",
        "        throw new InsufficientFunds();",
        "    }",
        "",
        "    $wallet->decrement('balance', $amount);",
        "    $wallet->transactions()->create(['amount' => -$amount, 'type' => 'withdraw']);",
        "}, attempts: 3);"
      ]
    },
    {
      "title": "Optimistic: hujjat tahriri",
      "lang": "php",
      "code": [
        "public function update(UpdateDocumentRequest $request, Document $document)",
        "{",
        "    $affected = Document::whereKey($document->id)",
        "        ->where('version', $request->integer('version'))",
        "        ->update([",
        "            ...$request->safe()->only(['title', 'body']),",
        "            'version' => DB::raw('version + 1'),",
        "            'updated_at' => now(),",
        "        ]);",
        "",
        "    if ($affected === 0) {",
        "        return back()->withErrors(['conflict' => 'Hujjatni boshqa foydalanuvchi o\\'zgartirdi. Sahifani yangilang.']);",
        "    }",
        "",
        "    return redirect()->route('documents.show', $document);",
        "}"
      ],
      "note": "Bu mass update, shuning uchun observer'lar ishlamaydi. Kerak bo'lsa, event'ni qo'lda chiqaring."
    }
  ],
  "pitfalls": [
    "`lockForUpdate()` ni `DB::transaction` siz ishlatish: lock darhol yechiladi va himoya yo'q.",
    "Pessimistic lock bilan tashqi API'ni kutish: boshqa so'rovlar soniyalab navbatda turadi.",
    "Optimistic lockda ta'sirlangan qatorlar sonini tekshirmaslik: ziddiyat jim o'tib ketadi.",
    "Turli kod yo'llarida qatorlarni turli tartibda qulflash: deadlock'lar. Doim bir xil tartib (masalan, ID bo'yicha)."
  ]
});
