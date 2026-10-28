/* Chuqur dars: 17.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.1", {
  "lesson": [
    "### Tranzaksiya nima",
    "Tranzaksiya — DB uchun bitta mantiqiy ish birligi sifatida bajariladigan amallar to'plami. Klassik misol: hisobdan hisobga pul o'tkazish. Bir hisobdan yechish va boshqasiga qo'shish birga bajarilishi yoki umuman bajarilmasligi kerak. ACID — relyatsion DB'ning tranzaksiyalar uchun beradigan to'rt kafolati.",
    "",
    "### Atomicity — bo'linmaslik",
    "Tranzaksiyadagi barcha o'zgarishlar yoki to'liq qo'llanadi, yoki hech biri. O'rtada xato, server qulashi yoki `ROLLBACK` bo'lsa, DB tranzaksiyadan oldingi holatga qaytadi. Texnik jihatdan: InnoDB undo log, PostgreSQL MVCC (commit qilinmagan tuple'lar ko'rinmaydi).",
    "",
    "### Consistency — izchillik",
    "Tranzaksiya DB'ni bir yaroqli holatdan boshqasiga o'tkazadi. \"Yaroqli\" DB darajasida e'lon qilingan qoidalar bilan belgilanadi: `NOT NULL`, `UNIQUE`, `FOREIGN KEY`, `CHECK`, trigger'lar. Qoida buzilsa, tranzaksiya rad etiladi.",
    "",
    "Muhim: DB faqat **o'ziga aytilgan** qoidalarni kafolatlaydi. \"Balans manfiy bo'lmasin\" qoidasi faqat PHP kodida bo'lsa, DB uni himoya qilmaydi. Muhim invariantlarni `CHECK (balance >= 0)` kabi constraint bilan ham yozing.",
    "",
    "### Isolation — izolyatsiya",
    "Parallel tranzaksiyalar bir-biriga ta'sir qilmagandek ishlashi kerak. Amalda to'liq izolyatsiya (`SERIALIZABLE`) qimmat, shuning uchun DB'lar bir necha **daraja** taklif qiladi va har biri ma'lum anomaliyalarga yo'l qo'yadi (17.5–17.9). Bu ACID'ning eng nozik va eng ko'p xato qilinadigan qismi.",
    "",
    "### Durability — chidamlilik",
    "`COMMIT` muvaffaqiyatli qaytgan bo'lsa, ma'lumot server qulasa yoki elektr o'chsa ham saqlanadi. Mexanizm: o'zgarish avval ketma-ket log'ga (InnoDB redo log, PostgreSQL WAL) yoziladi va diskka `fsync` qilinadi (11.1). Bu kafolatni zaiflashtiruvchi sozlamalar: `innodb_flush_log_at_trx_commit = 2`, `synchronous_commit = off`. Ular tezlik beradi, lekin qulashda oxirgi soniyalar yo'qolishi mumkin.",
    "",
    "### Ilovaning roli",
    "ACID — DB'ning kafolati, lekin uni **to'g'ri chegaralar** bilan ishlatish ilovaning vazifasi. Agar ikki bog'liq yozuvni ikki alohida autocommit so'rovda yozsangiz, atomicity yo'q. Laravel'da `DB::transaction()` (13.19) bu chegarani belgilaydi.",
    "",
    "### Taqsimlangan tizimlarda",
    "Bir nechta servis yoki DB ishtirok etganda umumiy ACID tranzaksiya yo'q. Masalan, DB'ga yozish va RabbitMQ'ga xabar yuborish. U yerda saga, outbox va eventual consistency kerak (17.18, 17.19)."
  ],
  "examples": [
    {
      "title": "Atomicity va DB darajasidagi consistency",
      "lang": "sql",
      "code": [
        "ALTER TABLE accounts ADD CONSTRAINT balance_non_negative CHECK (balance >= 0);",
        "",
        "START TRANSACTION;",
        "UPDATE accounts SET balance = balance - 500 WHERE id = 1;",
        "-- balans 300 edi: CHECK buziladi, xato",
        "UPDATE accounts SET balance = balance + 500 WHERE id = 2;",
        "ROLLBACK;  -- ikkala o'zgarish ham bekor"
      ],
      "note": "MySQL `CHECK` constraint'larni 8.0.16 dan boshlab haqiqatan tekshiradi. Eski versiyalarda ular e'tiborsiz qoldirilardi."
    },
    {
      "title": "Laravel'da o'tkazma",
      "lang": "php",
      "code": [
        "DB::transaction(function () use ($fromId, $toId, $amount) {",
        "    $debited = Account::whereKey($fromId)",
        "        ->where('balance', '>=', $amount)",
        "        ->decrement('balance', $amount);",
        "",
        "    if ($debited === 0) {",
        "        throw new InsufficientFunds();",
        "    }",
        "",
        "    Account::whereKey($toId)->increment('balance', $amount);",
        "",
        "    Transfer::create(['from_id' => $fromId, 'to_id' => $toId, 'amount' => $amount]);",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Bog'liq yozuvlarni tranzaksiyasiz alohida so'rovlarda yozish: o'rtada xato bo'lsa, yarim holat qoladi.",
    "Biznes invariantlarini faqat PHP kodida tekshirish: boshqa yo'l (artisan, SQL, boshqa servis) ularni buzadi.",
    "Tezlik uchun durability sozlamalarini oqibatini tushunmasdan pasaytirish.",
    "Ikki xil DB yoki DB + broker o'rtasida ACID bor deb hisoblash."
  ]
});
