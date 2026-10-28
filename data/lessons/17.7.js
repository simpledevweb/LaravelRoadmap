/* Chuqur dars: 17.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.7", {
  "lesson": [
    "### Non-repeatable read nima",
    "Bir tranzaksiya ichida **bir xil qatorni** ikki marta o'qiganda turli qiymat olinadi, chunki oraliqda boshqa tranzaksiya uni o'zgartirib, **commit qilgan**. Har bir o'qish o'z-o'zidan to'g'ri (commit qilingan ma'lumot), lekin ular bir-biri bilan izchil emas.",
    "",
    "### Qayerda yuz beradi",
    "**READ COMMITTED** darajasida, bu PostgreSQL'ning default'i. Bu darajada har bir buyruq **o'z snapshot**ini oladi. MySQL InnoDB'ning default'i (REPEATABLE READ) oddiy `SELECT` lar uchun bunga yo'l qo'ymaydi.",
    "",
    "### Qachon muammo",
    "Ko'p hollarda zararsiz. Har so'rov eng yangi ma'lumotni ko'rishi hatto yaxshi. Muammo quyidagi holatlarda:",
    "1. **Hisobot ichida bir nechta so'rov:** \"jami buyurtmalar\" va \"to'langan + to'lanmagan\" alohida o'qiladi va oraliqda yangi to'lov bo'lsa, yig'indi mos kelmaydi.",
    "2. **O'qib, tekshirib, keyin yana o'qish:** narxni o'qib, chegirmani hisoblash, keyin narxni yana o'qib, saqlash. Ikki marta o'qilgan narx har xil.",
    "3. **O'qilgan qiymatga asoslanib yozish:** bu lost update'ga (17.9) olib keladi. Non-repeatable read uning sababi bo'lishi mumkin.",
    "",
    "### Yechimlar",
    "- **Bir marta o'qib, o'zgaruvchida saqlash.** Ko'pincha eng sodda: kod bir xil qiymatni qayta-qayta so'ramasin.",
    "- **REPEATABLE READ:** butun tranzaksiya bitta snapshot'ni ko'radi. Hisobotlar va eksportlar uchun ideal.",
    "- **Lock:** `FOR SHARE` (o'qiganingizni hech kim o'zgartirmasin) yoki `FOR UPDATE` (siz o'zgartirasiz). Lock tranzaksiya oxirigacha saqlanadi va qiymat barqaror bo'ladi.",
    "- **Bitta so'rovda hisoblash:** bir nechta agregatni bitta `SELECT` da olish: `COUNT(*) FILTER (WHERE ...)` yoki `SUM(CASE ...)`. Bitta buyruq doim bitta snapshot.",
    "",
    "### MySQL nuance",
    "InnoDB REPEATABLE READ'da oddiy `SELECT` takrorlanuvchi, lekin `SELECT ... FOR UPDATE` va `UPDATE` **so'nggi commit qilingan** versiyani ishlatadi. Ya'ni bir tranzaksiyada oddiy `SELECT` 100 qaytarishi, keyin `UPDATE ... WHERE price = 100` hech narsa topmasligi mumkin, chunki haqiqiy qiymat allaqachon 120. Bu MySQL'ning \"semi-consistent\" xatti-harakati va kutilmagan natijalarga olib keladi."
  ],
  "examples": [
    {
      "title": "Ssenariy (PostgreSQL, READ COMMITTED)",
      "lang": "text",
      "code": [
        "T1: BEGIN;",
        "T1: SELECT price FROM products WHERE id = 1;   -> 100",
        "T2: UPDATE products SET price = 120 WHERE id = 1; COMMIT;",
        "T1: SELECT price FROM products WHERE id = 1;   -> 120   <- non-repeatable read",
        "T1: COMMIT;",
        "",
        "REPEATABLE READ'da T1 ikkinchi marta ham 100 ni ko'radi."
      ]
    },
    {
      "title": "Izchil hisobot: bitta so'rov yoki bitta snapshot",
      "lang": "php",
      "code": [
        "// 1) Bitta so'rov: doim izchil",
        "$stats = Order::toBase()",
        "    ->selectRaw(\"count(*) as total\")",
        "    ->selectRaw(\"count(*) filter (where status = 'paid') as paid\")",
        "    ->selectRaw(\"count(*) filter (where status = 'pending') as pending\")",
        "    ->first();",
        "",
        "// 2) Bir nechta so'rov: REPEATABLE READ (PostgreSQL)",
        "$report = DB::transaction(function () {",
        "    DB::statement('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');",
        "    return [",
        "        'orders' => Order::count(),",
        "        'revenue' => Order::where('status', 'paid')->sum('total'),",
        "    ];",
        "});"
      ],
      "note": "`FILTER (WHERE ...)` PostgreSQL sintaksisi. MySQL'da `SUM(status = 'paid')` yoki `SUM(CASE WHEN ... THEN 1 ELSE 0 END)`."
    }
  ],
  "pitfalls": [
    "Hisobotning bir nechta raqamini alohida so'rovlarda olib, ular mos kelmasligiga hayron bo'lish.",
    "Bir tranzaksiyada bir qiymatni qayta-qayta o'qib, har safar bir xil bo'ladi deb kutish.",
    "MySQL'da REPEATABLE READ'da `UPDATE` ham snapshot'ni ko'radi deb o'ylash.",
    "Non-repeatable read'ni har doim xato deb hisoblash: ko'p hollarda eng yangi ma'lumot aynan kerak."
  ]
});
