/* Chuqur dars: 17.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.10", {
  "lesson": [
    "### G'oya",
    "Pessimistic locking: \"ziddiyat bo'ladi\" deb hisoblab, ma'lumotni o'zgartirishdan **oldin** qulflash. Lock'ni olgan tranzaksiya ishini tugatmaguncha boshqalar shu qatorlarni o'zgartira olmaydi va lock so'rasa, kutadi. Kritik bo'lim ketma-ket bajariladi.",
    "",
    "### Lock turlari",
    "- `SELECT ... FOR UPDATE` — eksklyuziv. Boshqalar na `UPDATE`/`DELETE`, na `FOR UPDATE`/`FOR SHARE` qila oladi. Oddiy `SELECT` (MVCC) bloklanmaydi va eski versiyani o'qiydi.",
    "- `SELECT ... FOR SHARE` (MySQL 8; eski sintaksis `LOCK IN SHARE MODE`) — umumiy. Boshqalar ham `FOR SHARE` ola oladi, lekin hech kim o'zgartira olmaydi. \"Men o'qiganimni hech kim o'zgartirmasin\" uchun.",
    "- PostgreSQL'da qo'shimcha: `FOR NO KEY UPDATE`, `FOR KEY SHARE` (11.12).",
    "",
    "Laravel: `->lockForUpdate()`, `->sharedLock()`.",
    "",
    "### Qoidalar",
    "1. **Faqat tranzaksiya ichida.** Autocommit'da lock so'rov tugashi bilan bo'shaydi va hech narsani himoya qilmaydi.",
    "2. **Lock tranzaksiya oxirigacha saqlanadi** (`COMMIT` yoki `ROLLBACK`). Uni erta bo'shatib bo'lmaydi. Shuning uchun tranzaksiya qisqa bo'lsin.",
    "3. **Imkon qadar kech oling.** Avval validatsiya, hisob-kitob va tashqi ma'lumotni tayyorlang, keyin tranzaksiya oching, lock oling, yozing va darhol commit qiling.",
    "4. **Barqaror tartib.** Bir nechta qatorni qulflaganda doim bir xil tartibda oling (masalan, ID o'sishi bo'yicha). Aks holda deadlock (17.12).",
    "5. **Indeks.** `FOR UPDATE` `WHERE` sharti bo'yicha topilgan qatorlarni qulflaydi. MySQL'da indeks bo'lmasa, skan qilingan barcha qatorlar (va bo'shliqlar) qulflanadi.",
    "",
    "### Kutishni boshqarish",
    "- `NOWAIT`: lock band bo'lsa, darhol xato. Foydalanuvchiga \"hozir band, keyinroq urinib ko'ring\" deyish uchun.",
    "- `SKIP LOCKED`: band qatorlarni o'tkazib yuborish. Navbat va ish taqsimlash uchun: har worker boshqa qatorni oladi (Laravel `database` queue driver).",
    "- MySQL `innodb_lock_wait_timeout` (default 50s), PostgreSQL `lock_timeout`: maksimal kutish vaqti.",
    "",
    "Laravel 9+: `->lockForUpdate()->skipLocked()`, `->noWait()` (MySQL 8, PostgreSQL).",
    "",
    "### Qachon mos",
    "Ziddiyat ehtimoli yuqori va ziddiyat narxi qimmat bo'lgan joylar: pul o'tkazmalari, ombor zaxirasi, chiptalar, navbatdan ish olish, ketma-ket raqamlar (hisob-faktura raqami). Atomar UPDATE (17.9) yetarli bo'lsa, lock kerak emas.",
    "",
    "### Kamchiliklari",
    "Kutish, deadlock xavfi va masshtablashda tor joy. Bitta \"issiq\" qator (masalan, global hisoblagich) uchun barcha so'rovlar navbatga turadi."
  ],
  "examples": [
    {
      "title": "Balansdan yechish",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($accountId, $amount) {",
        "    $account = Account::whereKey($accountId)->lockForUpdate()->firstOrFail();",
        "",
        "    if ($account->balance < $amount) {",
        "        throw new InsufficientFunds();",
        "    }",
        "",
        "    $account->decrement('balance', $amount);",
        "    $account->entries()->create(['amount' => -$amount, 'type' => 'withdraw']);",
        "}, attempts: 3);"
      ]
    },
    {
      "title": "Navbatdan ish olish va o'tkazma tartibi",
      "lang": "php",
      "code": [
        "// Har worker boshqa ishni oladi, bir-birini kutmaydi",
        "$job = DB::transaction(function () {",
        "    $job = ExportJob::where('status', 'pending')",
        "        ->orderBy('id')",
        "        ->lockForUpdate()->skipLocked()",
        "        ->first();",
        "",
        "    $job?->update(['status' => 'running', 'started_at' => now()]);",
        "    return $job;",
        "});",
        "",
        "// Ikki hisob: doim ID tartibida qulflash",
        "DB::transaction(function () use ($a, $b, $sum) {",
        "    $accounts = Account::whereIn('id', [$a, $b])->orderBy('id')->lockForUpdate()->get()->keyBy('id');",
        "    // ...",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "`lockForUpdate()` ni tranzaksiyasiz chaqirish: lock darhol bo'shaydi.",
    "Lock olgandan keyin tashqi API'ni kutish: boshqa so'rovlar soniyalab navbatda turadi.",
    "Qatorlarni turli kod yo'llarida turli tartibda qulflash: deadlock.",
    "Atomar `decrement()` yetarli bo'lgan joyda keraksiz lock ishlatish."
  ]
});
