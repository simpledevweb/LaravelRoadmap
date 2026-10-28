/* Chuqur dars: 17.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.2", {
  "lesson": [
    "### Asosiy buyruqlar",
    "- `BEGIN` yoki `START TRANSACTION`: tranzaksiyani ochadi. MySQL'da `START TRANSACTION READ ONLY` yoki `WITH CONSISTENT SNAPSHOT` opsiyalari bor.",
    "- `COMMIT`: barcha o'zgarishlarni doimiy qiladi va lock'larni bo'shatadi.",
    "- `ROLLBACK`: barcha o'zgarishlarni bekor qiladi.",
    "- `SAVEPOINT name`, `ROLLBACK TO SAVEPOINT name`, `RELEASE SAVEPOINT name` (17.4).",
    "",
    "### Autocommit",
    "Default'da MySQL va PostgreSQL **autocommit** rejimida: aniq `BEGIN` bo'lmasa, har bir so'rov o'z tranzaksiyasida bajariladi va darhol commit qilinadi. Shuning uchun tranzaksiyasiz `UPDATE` darhol doimiy bo'ladi.",
    "",
    "MySQL'da `SET autocommit = 0` qilinsa, birinchi so'rov tranzaksiyani yashirin ochadi va `COMMIT` gacha davom etadi. Bu unutilgan ochiq tranzaksiyalarning keng tarqalgan sababi.",
    "",
    "### DDL va implicit commit",
    "**MySQL:** `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` va boshqa ko'p buyruqlar **implicit commit** qiladi: ochiq tranzaksiya avval commit bo'ladi, keyin DDL bajariladi. Natija: migratsiya yarmida yiqilsa, avvalgi qadamlar qaytmaydi. Laravel MySQL'da migratsiyani tranzaksiyaga o'raydi deb kutmang. Har bir migratsiyani kichik va qayta ishga tushirsa bo'ladigan qilib yozing.",
    "",
    "**PostgreSQL:** DDL tranzaksiyaviy. `BEGIN; ALTER TABLE ...; CREATE INDEX ...; ROLLBACK;` hammasini qaytaradi. Laravel PostgreSQL'da har migratsiyani tranzaksiyaga o'raydi (`$withinTransaction = true` default). Istisno: `CREATE INDEX CONCURRENTLY`, `VACUUM` va `ALTER TYPE ... ADD VALUE` (eski versiyalarda) tranzaksiya ichida ishlamaydi.",
    "",
    "### PostgreSQL'dagi xato holati",
    "PostgreSQL'da tranzaksiya ichidagi har qanday xatodan keyin tranzaksiya **aborted** holatga o'tadi. `ROLLBACK` (yoki savepoint'ga qaytish) bo'lmaguncha keyingi barcha buyruqlar `ERROR: current transaction is aborted, commands ignored until end of transaction block` beradi. MySQL'da esa xato bergan buyruq bekor bo'ladi, tranzaksiya davom etadi. Bu farq PHP'da exception'ni ushlab, davom etmoqchi bo'lganda muhim.",
    "",
    "### Ochiq qolgan tranzaksiya",
    "Commit yoki rollback qilinmagan tranzaksiya:",
    "- Olingan barcha lock'larni ushlab turadi.",
    "- MVCC tozalashni bloklaydi (PostgreSQL VACUUM, InnoDB purge).",
    "- PHP-FPM'da so'rov tugaganda ulanish yopiladi va tranzaksiya rollback bo'ladi. Lekin doimiy ulanishlar (queue worker, Octane) da u ochiq qolishi mumkin.",
    "",
    "Laravel'ning `DB::transaction()` yopilmasi `finally` mantiqi bilan bu xatoni oldini oladi. Qo'lda `beginTransaction()` ishlatsangiz, har yo'lda `commit()` yoki `rollBack()` bo'lishini ta'minlang."
  ],
  "examples": [
    {
      "title": "SQL darajasida",
      "lang": "sql",
      "code": [
        "START TRANSACTION;",
        "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
        "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
        "COMMIT;",
        "",
        "-- PostgreSQL: DDL ham qaytadi",
        "BEGIN;",
        "ALTER TABLE orders ADD COLUMN note text;",
        "CREATE INDEX orders_note ON orders (note);",
        "ROLLBACK;   -- ustun ham, indeks ham yo'q"
      ]
    },
    {
      "title": "Laravel: qo'lda boshqarish",
      "lang": "php",
      "code": [
        "DB::beginTransaction();",
        "",
        "try {",
        "    $order = Order::create($data);",
        "    $order->items()->createMany($items);",
        "    DB::commit();",
        "} catch (Throwable $e) {",
        "    DB::rollBack();",
        "    throw $e;",
        "}",
        "",
        "// Odatda soddaroq va xavfsizroq:",
        "$order = DB::transaction(function () use ($data, $items) {",
        "    $order = Order::create($data);",
        "    $order->items()->createMany($items);",
        "    return $order;",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "MySQL'da DDL'li migratsiya tranzaksiya bilan himoyalangan deb o'ylash: implicit commit tufayli yarim migratsiya qoladi.",
    "PostgreSQL'da tranzaksiya ichida exception'ni ushlab, keyingi so'rovlarni yuborish: `current transaction is aborted`.",
    "Qo'lda `beginTransaction()` dan keyin xato yo'lida `rollBack()` ni unutish: queue worker'da tranzaksiya ochiq qoladi.",
    "MySQL'da `autocommit = 0` ni yoqib, commit qilishni unutish."
  ]
});
