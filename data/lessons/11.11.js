/* Chuqur dars: 11.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.11", {
  "lesson": [
    "### Izolyatsiya darajalari PostgreSQL'da",
    "SQL standarti 4 ta darajani belgilaydi. PostgreSQL ularni MVCC snapshot'lari orqali amalga oshiradi.",
    "",
    "| Daraja | Snapshot | Nimani oldini oladi |",
    "|---|---|---|",
    "| READ UNCOMMITTED | READ COMMITTED kabi ishlaydi | dirty read hech qachon yo'q |",
    "| READ COMMITTED (default) | har **buyruq** yangi snapshot | dirty read |",
    "| REPEATABLE READ | **tranzaksiya** boshidagi snapshot | non-repeatable read, phantom |",
    "| SERIALIZABLE | snapshot + SSI kuzatuv | barcha anomaliyalar, write skew ham |",
    "",
    "### READ COMMITTED",
    "Har bir `SELECT` o'sha paytgacha commit bo'lgan ma'lumotni ko'radi. Bir tranzaksiyada ikki marta o'qilgan qiymat har xil bo'lishi mumkin. `UPDATE` boshqa tranzaksiya qulflagan qatorga duch kelsa, kutadi. U commit bo'lgach, qatorning **yangi versiyasida** `WHERE` shartini qayta tekshiradi va davom etadi. Shuning uchun `UPDATE accounts SET balance = balance - 100` xavfsiz, lekin \"o'qib, PHP'da hisoblab, yozish\" xavfli (lost update).",
    "",
    "### REPEATABLE READ",
    "Butun tranzaksiya bitta snapshot ko'radi. Hisobotlar va izchil eksport uchun qulay. Agar siz yangilamoqchi bo'lgan qatorni boshqa tranzaksiya snapshot'ingizdan keyin o'zgartirgan bo'lsa, `ERROR: could not serialize access due to concurrent update` (SQLSTATE `40001`) chiqadi. Tranzaksiyani **boshidan qayta** bajarish kerak.",
    "",
    "### SERIALIZABLE (SSI)",
    "REPEATABLE READ ustiga o'qish-yozish bog'liqliklarini kuzatadi. Natija biror ketma-ket bajarish tartibiga teng bo'lmasa, tranzaksiyalardan birini `40001` bilan bekor qiladi. Write skew'ni ham ushlaydi. Klassik misol: ikki shifokor bir vaqtda \"navbatchida boshqa odam bor\" deb tekshiradi va ikkalasi ham chiqib ketadi. Narxi: qo'shimcha xotira va retry'lar. Qisqa tranzaksiyalar bilan yaxshi ishlaydi.",
    "",
    "### PostgreSQL'ning boshqa afzalliklari",
    "- **Transactional DDL:** `CREATE TABLE`, `ALTER TABLE` tranzaksiya ichida rollback bo'ladi. Laravel migratsiyasi yarmida yiqilsa, sxema toza qoladi (`CREATE INDEX CONCURRENTLY` bundan mustasno).",
    "- **Savepoint'lar:** ichma-ich `DB::transaction()` avtomatik `SAVEPOINT trans2` ishlatadi.",
    "- Tranzaksiya ichida xato bo'lsa, keyingi barcha buyruqlar `current transaction is aborted` beradi. Rollback yoki savepoint'ga qaytish shart.",
    "",
    "### Laravel'da",
    "`DB::transaction(fn () => ..., attempts: 3)` deadlock va serialization xatolarida (`40001`, `40P01`) yopilmani avtomatik qayta bajaradi. Izolyatsiyani o'zgartirish uchun tranzaksiya boshida `DB::statement('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE')` yozing."
  ],
  "examples": [
    {
      "title": "Lost update va uning yechimlari",
      "lang": "php",
      "code": [
        "// XATO: ikki parallel so'rov bir-birining o'zgarishini yo'qotadi",
        "$acc = Account::find($id);",
        "$acc->balance -= 100;",
        "$acc->save();",
        "",
        "// 1) Atomar UPDATE",
        "Account::whereKey($id)->where('balance', '>=', 100)->decrement('balance', 100);",
        "",
        "// 2) Pessimistik lock",
        "DB::transaction(function () use ($id) {",
        "    $acc = Account::whereKey($id)->lockForUpdate()->firstOrFail();",
        "    $acc->balance -= 100;",
        "    $acc->save();",
        "}, attempts: 3);"
      ]
    },
    {
      "title": "SERIALIZABLE va retry",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($shiftId, $doctorId) {",
        "    DB::statement('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');",
        "",
        "    $onCall = DB::table('shifts')->where('shift_id', $shiftId)",
        "        ->where('on_call', true)->count();",
        "",
        "    if ($onCall < 2) {",
        "        throw new DomainException('Kamida bitta shifokor qolishi kerak');",
        "    }",
        "",
        "    DB::table('shifts')->where('shift_id', $shiftId)",
        "        ->where('doctor_id', $doctorId)->update(['on_call' => false]);",
        "}, attempts: 5);"
      ],
      "note": "`SET TRANSACTION` tranzaksiyaning birinchi buyrug'i bo'lishi kerak."
    }
  ],
  "pitfalls": [
    "REPEATABLE READ yoki SERIALIZABLE ishlatib, `40001` xatosiga retry yozmaslik: foydalanuvchi tasodifiy 500 xatolarini oladi.",
    "Retry ichida tashqi side effect (email, HTTP chaqiruv) qilish: tranzaksiya qayta bajarilganda ular takrorlanadi.",
    "READ COMMITTED'da \"o'qib, hisoblab, yozish\" lost update beradi. Atomar UPDATE yoki `FOR UPDATE` ishlating.",
    "Tranzaksiya ichidagi xatoni `try/catch` bilan yutib, davom etish: PostgreSQL keyingi har buyruqqa `current transaction is aborted` beradi."
  ]
});
