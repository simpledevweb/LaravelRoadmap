/* Chuqur dars: 17.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.6", {
  "lesson": [
    "### Dirty read nima",
    "Dirty read — tranzaksiya boshqa tranzaksiyaning **hali commit qilinmagan** o'zgarishini o'qishi. Agar o'sha tranzaksiya keyin rollback qilsa, o'qilgan qiymat hech qachon haqiqatda mavjud bo'lmagan bo'ladi. Unga asoslangan har qanday qaror (hisobot, to'lov, bildirishnoma) noto'g'ri ma'lumotga tayanadi.",
    "",
    "### Qachon yuz beradi",
    "Faqat **READ UNCOMMITTED** darajasida.",
    "- **MySQL InnoDB:** READ UNCOMMITTED'da oddiy `SELECT` snapshot ishlatmaydi va qatorlarning eng so'nggi versiyasini, jumladan commit qilinmaganlarini ham o'qiydi.",
    "- **PostgreSQL:** READ UNCOMMITTED so'ralsa ham, u READ COMMITTED kabi ishlaydi. PostgreSQL'da dirty read **umuman mumkin emas**.",
    "- SQL Server: `WITH (NOLOCK)` hint'i shu darajaga teng va u yerda keng (va ko'pincha noto'g'ri) ishlatiladi.",
    "",
    "### Nega kimdir buni ishlatadi",
    "Lock'li DB'larda (eski SQL Server, MyISAM davri) o'qish yozuvchi lock'larni kutardi. READ UNCOMMITTED kutishni olib tashlardi. MVCC'li zamonaviy DB'larda (InnoDB, PostgreSQL) oddiy o'qish allaqachon yozuvchilarni kutmaydi. Shuning uchun READ UNCOMMITTED tezlik foydasini deyarli bermaydi, lekin noto'g'ri ma'lumot xavfini qo'shadi.",
    "",
    "Yagona qabul qilinadigan holat: juda taxminiy monitoring so'rovlari (\"jadvalda taxminan nechta qator\"), noto'g'ri bo'lishi hech kimga zarar qilmasa.",
    "",
    "### Dirty read'dan farqli holatlar",
    "Ba'zan dasturchilar boshqa muammolarni dirty read deb o'ylaydi:",
    "- **Replication lag:** replikadan o'qilgan eski ma'lumot. Bu dirty emas, **stale** read (11.21).",
    "- **Kesh:** Redis'dagi eskirgan qiymat.",
    "- **Tranzaksiya ichida dispatch qilingan job:** worker yozuvni topmaydi, chunki u **hali commit qilinmagan** va worker uni ko'rmaydi. Bu aksincha, dirty read **yo'qligining** natijasi (13.19).",
    "",
    "### Anomaliyalar ierarxiyasi",
    "Dirty read — eng birinchi va eng og'ir anomaliya. READ COMMITTED va undan yuqori har qanday daraja uni to'liq bartaraf etadi. Keyingi pog'onalar: non-repeatable read (17.7), phantom read (17.8), lost update (17.9), write skew. Ularni tushunish izolyatsiya darajasini ongli tanlash uchun zarur."
  ],
  "examples": [
    {
      "title": "Dirty read ssenariysi (MySQL)",
      "lang": "sql",
      "code": [
        "-- Sessiya A",
        "START TRANSACTION;",
        "UPDATE accounts SET balance = 0 WHERE id = 1;   -- commit qilinmagan",
        "",
        "-- Sessiya B",
        "SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;",
        "SELECT balance FROM accounts WHERE id = 1;      -- 0  <- dirty read",
        "",
        "-- Sessiya A",
        "ROLLBACK;                                       -- haqiqiy balans 1000 edi",
        "",
        "-- Sessiya B READ COMMITTED bo'lsa, 1000 ni ko'rardi"
      ]
    },
    {
      "title": "Laravel: dirty read emas, commit qilinmagan yozuv",
      "lang": "php",
      "code": [
        "DB::transaction(function () {",
        "    $order = Order::create([...]);",
        "",
        "    // Worker boshqa ulanishda: yozuv hali commit qilinmagan, ko'rinmaydi",
        "    ProcessOrder::dispatch($order);              // ModelNotFoundException xavfi",
        "",
        "    ProcessOrder::dispatch($order)->afterCommit(); // to'g'ri",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Tezlik uchun READ UNCOMMITTED ishlatish: MVCC'li DB'da foyda deyarli yo'q, xavf esa haqiqiy.",
    "Replikadagi eski ma'lumotni dirty read deb noto'g'ri tashxis qilish va izolyatsiya darajasini o'zgartirish.",
    "PostgreSQL'da READ UNCOMMITTED dirty read beradi deb kutish: u READ COMMITTED kabi ishlaydi.",
    "SQL Server odati bilan `NOLOCK` analogini MySQL'da qidirish."
  ]
});
