/* Chuqur dars: 17.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.3", {
  "lesson": [
    "### DB::transaction nima qiladi",
    "Tranzaksiya bir nechta SQL amalini **bitta butun** sifatida bajaradi: hammasi muvaffaqiyatli bo'lsa `COMMIT`, birortasi xato bersa `ROLLBACK` va hech narsa o'zgarmaydi. Klassik misol: bir hisobdan pul yechib, boshqasiga qo'shish; ikkalasi ham bo'lishi yoki ikkalasi ham bo'lmasligi kerak.",
    "",
    "`DB::transaction(function () { ... })` shuni avtomatik qiladi:",
    "1. `BEGIN` ni ishga tushiradi.",
    "2. Closure ichidagi kodni bajaradi.",
    "3. Exception bo'lmasa `COMMIT`, bo'lsa `ROLLBACK` qilib exception'ni qayta tashlaydi.",
    "4. Closure qaytargan qiymatni o'zi qaytaradi.",
    "",
    "### Deadlock va qayta urinish",
    "Ikkinchi parametr `attempts` deadlock bo'lsa tranzaksiyani qayta urinish sonini beradi: `DB::transaction(fn () => ..., 3)`. Qayta urinilganda closure **qaytadan** bajariladi, shuning uchun ichida qaytarib bo'lmaydigan amal (email, SMS, to'lov) bo'lmasligi kerak.",
    "",
    "### Tranzaksiya ichida nima qilmaslik kerak",
    "- Sekin tashqi chaqiruv (HTTP API, email): qulflar uzoq ushlanadi va boshqa so'rovlar kutib qoladi.",
    "- Navbatga job yuborish: worker commit dan oldin jobni olib, yozuvni topa olmasligi mumkin.",
    "",
    "Bunday amallarni **commit dan keyin** bajaring: `DB::afterCommit()`, job da `$afterCommit = true` yoki tranzaksiyadan keyingi oddiy chaqiruv.",
    "",
    "### Qo'lda boshqarish",
    "`DB::beginTransaction()`, `DB::commit()`, `DB::rollBack()` murakkab holatlarda kerak, lekin `try/catch` da unutilsa tranzaksiya ochiq qolishi mumkin. Imkon bo'lsa closure shaklini ishlating."
  ],
  "examples": [
    {
      "title": "Pul o'tkazish",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($from, $to, $amount) {",
        "    $from->decrement('balance', $amount);",
        "    $to->increment('balance', $amount);",
        "",
        "    Transfer::create([",
        "        'from_id' => $from->id,",
        "        'to_id'   => $to->id,",
        "        'amount'  => $amount,",
        "    ]);",
        "});"
      ]
    },
    {
      "title": "Deadlock uchun qayta urinish",
      "lang": "php",
      "code": [
        "$order = DB::transaction(function () use ($data) {",
        "    $order = Order::create($data);",
        "    $order->items()->createMany($data['items']);",
        "",
        "    return $order; // closure qiymati qaytariladi",
        "}, attempts: 3);"
      ]
    },
    {
      "title": "Tashqi amalni commit dan keyin bajarish",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($order) {",
        "    $order->update(['status' => 'paid']);",
        "",
        "    DB::afterCommit(function () use ($order) {",
        "        OrderPaid::dispatch($order);",
        "    });",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Tranzaksiya ichida HTTP so'rov yoki email yuborish: qulf uzoq ushlanadi, rollback bo'lsa ham xabar ketib bo'lgan.",
    "`attempts` bilan qayta urinadigan closure ichida qaytarib bo'lmaydigan amal qilish: u har urinishda takrorlanadi.",
    "Exception'ni tranzaksiya ichida `try/catch` bilan yutib yuborish: closure muvaffaqiyatli tugagandek bo'lib, `COMMIT` bo'ladi, rollback esa bo'lmaydi.",
    "Uzoq davom etadigan tranzaksiya (katta import): jadvallar qulflanadi. Katta ishni bo'laklarga bo'ling."
  ]
});
