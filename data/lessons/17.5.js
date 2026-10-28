/* Chuqur dars: 17.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.5", {
  "lesson": [
    "### Nega darajalar kerak",
    "To'liq izolyatsiya — har tranzaksiya go'yo yolg'iz ishlagandek — eng xavfsiz, lekin eng qimmat: ko'p lock yoki ko'p bekor qilingan tranzaksiya. SQL standarti to'rt daraja belgilaydi. Har biri xavfsizlik va parallellik o'rtasidagi kelishuv.",
    "",
    "### Anomaliyalar",
    "- **Dirty read** (17.6): commit qilinmagan o'zgarishni o'qish.",
    "- **Non-repeatable read** (17.7): bir qatorni ikki marta o'qib, har xil qiymat olish.",
    "- **Phantom read** (17.8): bir shart bo'yicha so'rov ikki marta har xil to'plam qaytaradi.",
    "- **Lost update** (17.9): ikki tranzaksiya bir-birining yozuvini bosib ketadi.",
    "- **Write skew:** ikki tranzaksiya har xil qatorlarni o'zgartiradi, lekin ikkalasi ham bir xil o'qishga asoslangan va birgalikda invariantni buzadi (\"navbatchida kamida bitta shifokor\").",
    "",
    "### Darajalar",
    "| Daraja | Dirty | Non-repeatable | Phantom |",
    "|---|---|---|---|",
    "| READ UNCOMMITTED | mumkin | mumkin | mumkin |",
    "| READ COMMITTED | yo'q | mumkin | mumkin |",
    "| REPEATABLE READ | yo'q | yo'q | standartda mumkin |",
    "| SERIALIZABLE | yo'q | yo'q | yo'q |",
    "",
    "Standart faqat **minimal** kafolatni belgilaydi. Haqiqiy DB'lar ko'pincha ko'proq beradi.",
    "",
    "### MySQL InnoDB",
    "- Default: **REPEATABLE READ**.",
    "- Oddiy `SELECT` tranzaksiya boshidagi snapshot'ni ko'radi (consistent read). Phantom ko'rinmaydi.",
    "- **Locking read** (`FOR UPDATE`, `UPDATE`, `DELETE`) esa snapshot'ni emas, **eng so'nggi commit qilingan** versiyani o'qiydi va next-key/gap lock qo'yadi. Shuning uchun bitta tranzaksiyada oddiy `SELECT` va `UPDATE` har xil ma'lumotni ko'rishi mumkin.",
    "- Gap lock'lar phantom'larni oldini oladi, lekin deadlock ehtimolini oshiradi.",
    "",
    "### PostgreSQL",
    "- Default: **READ COMMITTED**.",
    "- `READ UNCOMMITTED` amalda READ COMMITTED.",
    "- REPEATABLE READ snapshot isolation: phantom ham yo'q, parallel o'zgarishda `40001` xato (11.11).",
    "- SERIALIZABLE (SSI) write skew'ni ham ushlaydi.",
    "",
    "### Amaliy yondashuv",
    "Ko'p ilovalar uchun eng yaxshi strategiya: **default darajani qoldirish** va xavfli joylarda aniq vositalarni ishlatish:",
    "- Atomar `UPDATE ... SET x = x - 1 WHERE x > 0` (17.9).",
    "- `lockForUpdate()` (17.10) yoki optimistic lock (17.11).",
    "- Unique constraint'lar (dublikatni DB taqiqlaydi).",
    "- Hisobotlar uchun `REPEATABLE READ` (izchil snapshot).",
    "- Murakkab invariantlar uchun `SERIALIZABLE` + retry (17.13).",
    "",
    "Darajani global o'zgartirish butun ilova xatti-harakatini o'zgartiradi. Uni faqat kerakli tranzaksiya uchun o'rnating."
  ],
  "examples": [
    {
      "title": "Darajani o'rnatish va tekshirish",
      "lang": "sql",
      "code": [
        "-- MySQL",
        "SELECT @@transaction_isolation;           -- REPEATABLE-READ",
        "SET TRANSACTION ISOLATION LEVEL READ COMMITTED;  -- keyingi tranzaksiya uchun",
        "START TRANSACTION;",
        "-- ...",
        "COMMIT;",
        "",
        "-- PostgreSQL",
        "SHOW default_transaction_isolation;       -- read committed",
        "BEGIN ISOLATION LEVEL REPEATABLE READ;",
        "-- ...",
        "COMMIT;"
      ]
    },
    {
      "title": "Laravel: faqat kerakli tranzaksiyada",
      "lang": "php",
      "code": [
        "// Izchil hisobot: barcha so'rovlar bitta snapshot'dan",
        "$report = DB::transaction(function () {",
        "    DB::statement('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');",
        "",
        "    return [",
        "        'orders' => Order::where('status', 'paid')->count(),",
        "        'revenue' => Order::where('status', 'paid')->sum('total'),",
        "        'items' => OrderItem::whereHas('order', fn ($q) => $q->where('status', 'paid'))->sum('qty'),",
        "    ];",
        "});"
      ],
      "note": "PostgreSQL'da `SET TRANSACTION` tranzaksiyaning birinchi buyrug'i bo'lishi kerak. MySQL'da esa u tranzaksiyadan **oldin** bajarilishi kerak, aks holda `Transaction characteristics can't be changed while a transaction is in progress`. MySQL uchun `DB::statement(...)` ni `DB::transaction` dan oldin chaqiring."
    }
  ],
  "pitfalls": [
    "Default darajani har DB'da bir xil deb o'ylash: MySQL REPEATABLE READ, PostgreSQL READ COMMITTED.",
    "MySQL'da oddiy `SELECT` va `SELECT ... FOR UPDATE` bir xil ma'lumotni ko'radi deb hisoblash.",
    "SERIALIZABLE yoqib, `40001` xatolari uchun retry yozmaslik.",
    "Izolyatsiyani global oshirib, barcha muammolarni hal qilishga urinish: lock va xatolar ko'payadi."
  ]
});
