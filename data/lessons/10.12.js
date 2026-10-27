/* Chuqur dars: 10.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.12", {
  "lesson": [
    "### Deadlock nima",
    "Ikki (yoki ko'p) tranzaksiya bir-birining qulfini kutib qolishi: A 1-qatorni ushlab 2-qatorni kutadi, B 2-qatorni ushlab 1-qatorni kutadi.",
    "",
    "### InnoDB'ning reaksiyasi",
    "Deadlock'ni **avtomatik aniqlaydi** (wait-for graph) va bitta tranzaksiyani **qurbon (victim)** qilib rollback qiladi: xato **1213** (`SQLSTATE 40001`, \"Deadlock found when trying to get lock; try restarting transaction\"). Qolgani davom etadi.",
    "",
    "### Diagnostika",
    "- `SHOW ENGINE INNODB STATUS\\G` → **LATEST DETECTED DEADLOCK** (ikkala tranzaksiya, qulflar).",
    "- `innodb_print_all_deadlocks=ON` — hammasi error logga.",
    "- `performance_schema.data_locks`, `data_lock_waits`.",
    "",
    "### Sabablari",
    "Qatorlarni **turli tartibda** yangilash, katta/uzun tranzaksiyalar, indeks yo'qligi (ko'p qator qulf), gap lock, bir jadvalda parallel `INSERT ... ON DUPLICATE KEY`.",
    "",
    "### Oldini olish",
    "1. **Bir xil tartibda** qulflash (masalan ID o'sish tartibida).",
    "2. **Qisqa** tranzaksiyalar.",
    "3. Mos **indekslar** (kam qulf).",
    "4. Kerakli narsani bitta bayonotda (`UPDATE ... WHERE`) bajarish.",
    "5. READ COMMITTED (gap lock kam).",
    "6. Qayta urinish mantig'i.",
    "",
    "### Laravel",
    "`DB::transaction($callback, 3)` — deadlock'da avtomatik qayta urinadi (3 marta). Job'larda `$tries`. Qayta urinish **idempotent** bo'lsin.",
    "",
    "### Eslatma",
    "Deadlock — xato emas, normal hodisa; ilova qayta urinishga tayyor bo'lishi kerak."
  ],
  "examples": [
    {
      "title": "Qayta urinish",
      "lang": "php",
      "code": [
        "// Laravel: deadlock'da 3 marta qayta urinadi",
        "DB::transaction(function () use ($from, $to, $amount) {",
        "    $ids = [$from, $to]; sort($ids);                       // bir xil tartibda qulflash",
        "    $accounts = Account::whereIn('id', $ids)->orderBy('id')->lockForUpdate()->get()->keyBy('id');",
        "    $accounts[$from]->decrement('balance', $amount);",
        "    $accounts[$to]->increment('balance', $amount);",
        "}, 3);"
      ]
    }
  ],
  "pitfalls": [
    "Qatorlarni turli tartibda yangilash deadlock'ning eng keng tarqalgan sababi.",
    "Qayta urinish idempotent bo'lmasa (email, to'lov) dublikat bo'ladi.",
    "Uzun tranzaksiyalar deadlock ehtimolini oshiradi.",
    "Deadlock xatosini (1213) ushlamaslik foydalanuvchiga 500 ko'rsatadi: qayta urining."
  ]
});
