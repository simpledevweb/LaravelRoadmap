/* Chuqur dars: 17.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.8", {
  "lesson": [
    "### Phantom read nima",
    "Bir xil **shart** bo'yicha so'rov (`WHERE room_id = 5 AND day = '2025-06-01'`) bir tranzaksiyada ikki marta bajarilganda natija **to'plami** o'zgaradi: yangi qatorlar paydo bo'ladi (\"arvohlar\") yoki yo'qoladi. Sabab — boshqa tranzaksiya shartga mos qator qo'shgan yoki o'chirgan.",
    "",
    "Non-repeatable read (17.7) mavjud qatorning qiymati o'zgarishi haqida. Phantom esa **mavjud bo'lmagan** qatorlar haqida. Shuning uchun uni oddiy qator lock'i bilan oldini olib bo'lmaydi: qulflanadigan qator hali yo'q.",
    "",
    "### Eng xavfli ssenariy: \"tekshir, keyin yarat\"",
    "1. T1: shu xona va kun uchun bron bormi? → 0 ta.",
    "2. T2: xuddi shu tekshiruv → 0 ta.",
    "3. T1: bron yaratadi, commit.",
    "4. T2: bron yaratadi, commit. **Ikki bron!**",
    "",
    "Xuddi shunday: unikal username, kunlik limit (\"kuniga 3 ta so'rov\"), navbatchilik jadvali, bir foydalanuvchiga bitta faol obuna.",
    "",
    "Muhim: bu muammo **REPEATABLE READ'da ham** saqlanadi. Har ikki tranzaksiya o'z snapshot'ida 0 ni ko'radi va ikkalasi ham yozadi. Bu aslida write skew'ning bir turi.",
    "",
    "### DB'lar qanday himoyalaydi",
    "- **MySQL InnoDB REPEATABLE READ:** oddiy `SELECT` snapshot'dan o'qiydi (phantom ko'rinmaydi). `SELECT ... FOR UPDATE` esa **next-key lock** (qator + oldidagi bo'shliq) qo'yadi. Boshqa tranzaksiya shu oraliqqa `INSERT` qila olmaydi. Indeks kerak, aks holda butun jadval bo'shliqlari qulflanadi.",
    "- **PostgreSQL REPEATABLE READ:** snapshot tufayli phantom ko'rinmaydi, lekin gap lock yo'q. \"Tekshir, keyin yarat\" himoyalanmaydi.",
    "- **PostgreSQL SERIALIZABLE:** SSI predicate lock'lar orqali ziddiyatni aniqlaydi va bitta tranzaksiyani `40001` bilan bekor qiladi.",
    "",
    "### Ishonchli yechimlar",
    "1. **Unique constraint:** eng sodda va eng ishonchli. `UNIQUE (room_id, day)`. Ikkinchi `INSERT` DB darajasida rad etiladi. Laravel'da `UniqueConstraintViolationException` (Laravel 10.20+) ni ushlab, foydalanuvchiga tushunarli javob qaytaring.",
    "2. **Exclusion constraint** (PostgreSQL): vaqt oraliqlari kesishmasligi uchun (11.3).",
    "3. **Ota qatorni qulflash:** \"xona\" qatorini `lockForUpdate()` bilan qulflab, keyin tekshirish va yaratish. Barcha yozuvchilar shu lock orqali ketma-ket o'tadi.",
    "4. **Advisory lock / `Cache::lock`:** kalit bo'yicha (`booking:5:2025-06-01`).",
    "5. **SERIALIZABLE + retry.**",
    "",
    "Laravel'ning `firstOrCreate()` va `updateOrCreate()` ham \"tekshir, keyin yarat\" ko'rinishida va unique indekssiz parallel so'rovlarda dublikat yaratadi. Laravel 10.29+ dagi `createOrFirst()` avval yaratishga urinadi va unique xatosida mavjudini o'qiydi. Bu unique indeks bilan race-safe."
  ],
  "examples": [
    {
      "title": "Phantom ssenariysi",
      "lang": "text",
      "code": [
        "T1: SELECT COUNT(*) FROM bookings WHERE room_id = 5 AND day = '2025-06-01';  -> 0",
        "T2: SELECT COUNT(*) FROM bookings WHERE room_id = 5 AND day = '2025-06-01';  -> 0",
        "T1: INSERT INTO bookings (room_id, day) VALUES (5, '2025-06-01'); COMMIT;",
        "T2: INSERT INTO bookings (room_id, day) VALUES (5, '2025-06-01'); COMMIT;",
        "-> ikki bron"
      ]
    },
    {
      "title": "Unique constraint va ota qatorni qulflash",
      "lang": "php",
      "code": [
        "// Migratsiya",
        "$table->unique(['room_id', 'day']);",
        "",
        "// 1) Constraint'ga tayanish",
        "try {",
        "    Booking::create(['room_id' => $roomId, 'day' => $day, 'user_id' => $userId]);",
        "} catch (UniqueConstraintViolationException) {",
        "    throw ValidationException::withMessages(['day' => 'Bu kun band']);",
        "}",
        "",
        "// 2) Murakkab qoida (kuniga 3 tagacha): ota qatorni qulflash",
        "DB::transaction(function () use ($userId) {",
        "    User::whereKey($userId)->lockForUpdate()->first();",
        "",
        "    $today = Request::where('user_id', $userId)->whereDate('created_at', today())->count();",
        "    abort_if($today >= 3, 429, 'Kunlik limit tugadi');",
        "",
        "    Request::create(['user_id' => $userId]);",
        "});"
      ],
      "note": "`UniqueConstraintViolationException` Laravel 10.20+ da mavjud. Eskisida `QueryException` kodini tekshiring (`23000` / `23505`)."
    }
  ],
  "pitfalls": [
    "\"Tekshir, keyin yarat\" ni unique constraint'siz yozish: parallel so'rovlarda dublikatlar.",
    "REPEATABLE READ phantom muammosini to'liq hal qiladi deb o'ylash: \"tekshir, keyin yarat\" baribir buziladi.",
    "MySQL'da `FOR UPDATE` ni indekssiz ustunda ishlatish: gap lock'lar butun jadvalni qamraydi va deadlock'lar ko'payadi.",
    "`firstOrCreate()` ni unique indekssiz yuqori parallellikda ishlatish."
  ]
});
