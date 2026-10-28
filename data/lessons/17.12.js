/* Chuqur dars: 17.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.12", {
  "lesson": [
    "### Deadlock nima",
    "Ikki (yoki undan ko'p) tranzaksiya bir-birining lock'ini kutadi va hech biri davom eta olmaydi:",
    "- T1 A qatorni qulfladi, B ni kutyapti.",
    "- T2 B qatorni qulfladi, A ni kutyapti.",
    "",
    "Hech qanday tashqi aralashuvsiz bu abadiy davom etadi.",
    "",
    "### DB qanday aniqlaydi",
    "DB \"kim kimni kutyapti\" grafini quradi. Unda sikl topilsa, bitta tranzaksiyani **qurbon** sifatida tanlab bekor qiladi. Qolganlari davom etadi.",
    "- **MySQL InnoDB:** darhol aniqlaydi (`innodb_deadlock_detect = ON`). Odatda kamroq ish qilgan (kam undo) tranzaksiya bekor qilinadi. Xato: `1213 Deadlock found when trying to get lock; try restarting transaction`, SQLSTATE `40001`.",
    "- **PostgreSQL:** `deadlock_timeout` (default 1s) kutgandan keyin tekshiradi. Xato: `ERROR: deadlock detected`, SQLSTATE `40P01`.",
    "",
    "Bekor qilingan tranzaksiya to'liq rollback bo'ladi. Ilova uni **boshidan qayta** bajarishi kerak (17.13). Laravel `DB::transaction(..., attempts: 3)` deadlock'ni aniqlab, avtomatik qayta urinadi.",
    "",
    "### Lock wait timeout bilan farqi",
    "Deadlock — sikl, DB aniqlaydi. **Lock wait timeout** — oddiy uzoq kutish (bloklovchi tranzaksiya sekin ishlayapti), sikl yo'q. MySQL `1205 Lock wait timeout exceeded`. Sabablar va yechimlar boshqacha: uzoq tranzaksiyani topish va qisqartirish (17.15).",
    "",
    "### Tahlil",
    "- **MySQL:** `SHOW ENGINE INNODB STATUS` → `LATEST DETECTED DEADLOCK` bo'limi. Ikkala tranzaksiyaning so'rovlari, ushlab turgan va kutayotgan lock'lari ko'rinadi. Faqat oxirgi deadlock saqlanadi. Hammasini log'ga yozish uchun `innodb_print_all_deadlocks = ON`.",
    "- **PostgreSQL:** server log'ida `deadlock detected` va `Process X waits for ShareLock on transaction Y; blocked by process Z` tafsilotlari. `log_lock_waits = on` uzoq kutishlarni ham log qiladi.",
    "",
    "### Odatiy sabablar",
    "1. **Turli tartibda lock olish:** bir kod A→B, boshqasi B→A. Eng keng tarqalgan sabab.",
    "2. **Indekssiz `UPDATE`/`DELETE`:** MySQL skan qilingan ko'p qatorni qulflaydi va to'qnashuv ehtimoli keskin oshadi.",
    "3. **Gap va next-key lock'lar** (MySQL REPEATABLE READ): bir xil oraliqqa parallel `INSERT`.",
    "4. **FK tekshiruvlari:** bola qator yaratish ota qatorga shared lock qo'yadi. Keyin otani yangilash ziddiyat beradi.",
    "5. **Lock darajasini oshirish:** avval `FOR SHARE`, keyin shu qatorni `UPDATE`. Ikki tranzaksiya ikkalasi ham shared lock oladi va ikkalasi ham eksklyuzivni kutadi.",
    "",
    "### Oldini olish",
    "- Lock'larni doim bir xil tartibda olish (ID bo'yicha saralash).",
    "- Kerakli lock'ni darhol eksklyuziv olish (`FOR UPDATE`), keyinchalik oshirmaslik.",
    "- Tranzaksiyalarni qisqa tutish.",
    "- `WHERE` shartlarini indekslash.",
    "- Katta batch'larni kichik bo'laklarga bo'lish.",
    "",
    "Deadlock'larni butunlay yo'qotib bo'lmaydi. Ular vaqti-vaqti bilan bo'lishi normal. Muhimi — retry va **chastotani metrika** sifatida kuzatish: keskin o'sish yangi muammoli kodni bildiradi."
  ],
  "examples": [
    {
      "title": "Deadlock ssenariysi va tahlil",
      "lang": "sql",
      "code": [
        "-- T1                                    -- T2",
        "START TRANSACTION;                        START TRANSACTION;",
        "UPDATE accounts SET ... WHERE id = 1;",
        "                                          UPDATE accounts SET ... WHERE id = 2;",
        "UPDATE accounts SET ... WHERE id = 2;  -- kutadi",
        "                                          UPDATE accounts SET ... WHERE id = 1;",
        "                                          -- ERROR 1213: Deadlock found",
        "",
        "-- Tahlil",
        "SHOW ENGINE INNODB STATUS\\G",
        "SET GLOBAL innodb_print_all_deadlocks = ON;"
      ]
    },
    {
      "title": "Tartib bilan oldini olish va retry",
      "lang": "php",
      "code": [
        "public function transfer(int $from, int $to, int $amount): void",
        "{",
        "    DB::transaction(function () use ($from, $to, $amount) {",
        "        // Doim kichik ID birinchi qulflanadi",
        "        $ids = [$from, $to];",
        "        sort($ids);",
        "        $accounts = Account::whereIn('id', $ids)->orderBy('id')->lockForUpdate()->get()->keyBy('id');",
        "",
        "        $accounts[$from]->decrement('balance', $amount);",
        "        $accounts[$to]->increment('balance', $amount);",
        "    }, attempts: 3);",
        "}"
      ],
      "note": "`attempts: 3` dan keyin ham deadlock bo'lsa, exception chiqadi. Uni `report()` qiling va tahlil qiling."
    }
  ],
  "pitfalls": [
    "Deadlock xatosini foydalanuvchiga 500 sifatida qaytarish: oddiy retry ko'p hollarda yetarli.",
    "Retry'ni faqat oxirgi so'rovga qo'llash: butun tranzaksiya qayta bajarilishi kerak.",
    "Lock'larni turli joylarda turli tartibda olish.",
    "Deadlock chastotasini monitoring qilmaslik: yangi kod muammosi kech aniqlanadi."
  ]
});
