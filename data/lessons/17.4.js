/* Chuqur dars: 17.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.4", {
  "lesson": [
    "### Haqiqiy nested tranzaksiya yo'q",
    "MySQL va PostgreSQL ichma-ich `BEGIN` ni qo'llab-quvvatlamaydi. MySQL'da ochiq tranzaksiya ichida `START TRANSACTION` avvalgisini **commit qiladi**. PostgreSQL ogohlantirish beradi va e'tiborsiz qoldiradi. O'rniga **savepoint** mexanizmi bor.",
    "",
    "### Savepoint",
    "- `SAVEPOINT sp1`: tranzaksiya ichida nuqta belgilaydi.",
    "- `ROLLBACK TO SAVEPOINT sp1`: faqat shu nuqtadan keyingi o'zgarishlarni bekor qiladi. Tranzaksiya davom etadi.",
    "- `RELEASE SAVEPOINT sp1`: nuqtani olib tashlaydi (o'zgarishlar tranzaksiyada qoladi).",
    "",
    "PostgreSQL'da xatodan keyin aborted holatdan chiqishning yagona yo'li — `ROLLBACK TO SAVEPOINT`. Bu \"xatoga chidamli\" qismlar uchun foydali.",
    "",
    "### Laravel qanday ishlatadi",
    "Laravel tranzaksiya darajasini sanaydi (`DB::transactionLevel()`):",
    "- Birinchi `DB::transaction()` → `BEGIN`, daraja 1.",
    "- Ichkaridagi `DB::transaction()` → `SAVEPOINT trans2`, daraja 2.",
    "- Ichki yopilma muvaffaqiyatli tugasa → hech narsa (yoki release), daraja 1 ga qaytadi.",
    "- Ichki yopilmada exception → `ROLLBACK TO SAVEPOINT trans2`, exception tashqariga uzatiladi.",
    "- Faqat eng tashqi daraja tugaganda → haqiqiy `COMMIT`.",
    "",
    "### Muhim oqibatlar",
    "1. **Faqat tashqi commit haqiqiy.** Ichki `DB::transaction` muvaffaqiyatli tugadi deb ma'lumot saqlandi deb hisoblamang. Tashqi tranzaksiya keyin rollback bo'lsa, hammasi yo'qoladi.",
    "2. **Exception yutilsa:** ichki qism savepoint'gacha bekor qilinadi, tashqi tranzaksiya davom etadi. Bu atayin qilingan bo'lsa (ixtiyoriy qadam), to'g'ri. Tasodifan bo'lsa, yashirin ma'lumot yo'qolishi.",
    "3. **`afterCommit` callback'lari** (job, event, `DB::afterCommit`) ichki savepoint emas, **eng tashqi** commit'dan keyin ishlaydi. Ichki savepoint rollback bo'lsa, unga tegishli callback'lar ham bekor qilinadi (Laravel 8.x+ da).",
    "4. **Qayta urinish:** `attempts` faqat eng tashqi tranzaksiyada ma'noli. Deadlock ichki darajada bo'lsa ham, butun tranzaksiya bekor bo'ladi va uni tashqi daraja qayta bajarishi kerak.",
    "",
    "### Qachon foydali",
    "- Ixtiyoriy qadamlar: bonus qo'llash, qo'shimcha log, xatosi asosiy amalni to'xtatmasligi kerak bo'lgan ishlar.",
    "- Ko'p qatorli import: har qator savepoint ichida, xatolilari o'tkazib yuboriladi va hisobotga yoziladi.",
    "- Qayta ishlatiladigan action'lar: ular o'z `DB::transaction` ini ochadi va boshqa action ichida chaqirilganda avtomatik savepoint bo'ladi."
  ],
  "examples": [
    {
      "title": "Ixtiyoriy qadam savepoint ichida",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($order) {",
        "    $order->save();                                   // BEGIN",
        "",
        "    try {",
        "        DB::transaction(fn () => $this->applyBonus($order));  // SAVEPOINT trans2",
        "    } catch (BonusUnavailable $e) {",
        "        // ROLLBACK TO SAVEPOINT trans2: faqat bonus bekor",
        "        Log::info('Bonus qo\\'llanmadi', ['order' => $order->id]);",
        "    }",
        "",
        "    $order->items()->createMany($this->items);",
        "});                                                    // COMMIT"
      ]
    },
    {
      "title": "Importda har qator alohida savepoint",
      "lang": "php",
      "code": [
        "$failed = [];",
        "",
        "DB::transaction(function () use ($rows, &$failed) {",
        "    foreach ($rows as $i => $row) {",
        "        try {",
        "            DB::transaction(fn () => Product::create($row));",
        "        } catch (QueryException $e) {",
        "            $failed[] = ['row' => $i + 1, 'error' => $e->getMessage()];",
        "        }",
        "    }",
        "});",
        "",
        "// PostgreSQL'da savepoint'siz birinchi xatodan keyin barcha qatorlar",
        "// \"current transaction is aborted\" bilan yiqilardi."
      ],
      "note": "Juda ko'p qatorda har biriga savepoint qimmat. Katta importda bo'laklab, alohida tranzaksiyalarda bajaring."
    }
  ],
  "pitfalls": [
    "Ichki `DB::transaction` tugagach ma'lumot commit bo'ldi deb, tashqi tizimga xabar yuborish.",
    "Ichki xatoni tasodifan yutib, tashqi tranzaksiya qisman ma'lumot bilan commit bo'lishi.",
    "MySQL'da raw `START TRANSACTION` ni ochiq tranzaksiya ichida yozish: avvalgisi jim commit bo'ladi.",
    "Ichki darajada `attempts` bilan deadlock'ni qayta urinish mumkin deb kutish."
  ]
});
